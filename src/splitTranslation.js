export default function splitTranslation(translationWithDescription = "") {
  const createTranslationObject = () => {
    return {
      translation: "",
      description: "",
    };
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

function groupTranslations(translations = []) {
  const group = {};
  let record = translations[0];
  group[record.translation] = record;
  record.descriptions = [record.description];
  for (let i = 1; i < translations.length; i += 1) {
    record = translations[i];
    const existingKey = getExistingKey(record.translation, group);
    if (existingKey) {
      group[existingKey].descriptions.push(record.description);
      continue;
    }
    group[record.translation] = record;
    record.descriptions = [record.description];
  }
  translations.length = 0;
  Object.values(group).forEach(({ translation, descriptions }) => {
    translations.push({
      translation,
      description: descriptions.filter(Boolean).join(" "),
    });
  });
}

function getExistingKey(key = "", group = {}) {
  const keys = Object.keys(group);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i].includes(key) || key.includes(keys[i])) {
      return keys[i];
    }
  }
  return "";
}
