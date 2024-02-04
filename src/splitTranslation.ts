
abstract class ITranslationRecord {
  translation:string = '';
  description:string = '';
  descriptions?:string[];
}

export default function splitTranslation(translationWithDescription = "") {
  const createTranslationObject = () => {
    const translationObject:ITranslationRecord = {
      translation: "",
      description: "",
    };
    return translationObject;
  };

  const result = [];
  let i = 0;
  let isOpenedBracer = false;
  let currentTranslation = createTranslationObject();
  do {
    const sign = translationWithDescription[i];
    if (sign === "(") {
      isOpenedBracer = true;
    }
    if (isOpenedBracer) {
      currentTranslation.description += sign;
      if (sign === ")") {
        isOpenedBracer = false;
        result.push(currentTranslation);
        currentTranslation = createTranslationObject();
      }
    } else {
      if (sign !== ",") {
        currentTranslation.translation += sign;
      } else {
        if (currentTranslation.translation !== "") {
          result.push(currentTranslation);
          currentTranslation = createTranslationObject();
        }
      }
    }
    i += 1;
  } while (i < translationWithDescription.length);
  if (currentTranslation.translation !== "") {
    result.push(currentTranslation);
  }
  result.forEach((record) => {
    record.translation = record.translation.trim();
    record.description = record.description
      .split(record.translation)
      .join("")
      .split("  ")
      .join("")
      .split(" ,")
      .join(",");
  });
  groupTranslations(result);
  return result;
}

function groupTranslations(translations:Array<ITranslationRecord> = []) :void{
  if(translations.length === 0) return;
  const group = new Map<string,ITranslationRecord>();
  let record = translations[0];
  group.set(record.translation, record);
  record.descriptions = [record.description];
  for (let i = 1; i < translations.length; i += 1) {
    record = translations[i];
    const existingKey = getExistingKey(record.translation, group);
    if (existingKey) {
      group.get(existingKey)?.descriptions?.push(record.description);
      continue;
    }
    group.set(record.translation, record);
    record.descriptions = [record.description];
  }
  translations.length = 0;
  for (const {translation, descriptions} of group.values()){
    translations.push({
      translation,
      description: descriptions?.filter(Boolean).join(" ")|| "",
    });
  }
}

function getExistingKey(key = "", group = new Map<string, ITranslationRecord>()) {
  const keys = group.keys()
  for (const k of keys) {
    if (k.includes(key) || key.includes(k)) {
      return k;
    }
  }
  return "";
}
