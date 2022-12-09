import splitTranslation from "./splitTranslation";

const records = [
  "punkt (w grze), miejsce (np.: konkretne miejsce, gdzie kończy się ścieżka)",
  "głównie, przede wszystkim",
  "model (np.: edukacji), model/modelka, model (np.: maszyny)",
];
const results = [
  [
    {
      translation: "punkt",
      description: "(w grze)",
    },
    {
      translation: "miejsce",
      description: "(np.: konkretne, gdzie kończy się ścieżka)",
    },
  ],
  [
    {
      translation: "głównie",
      description: "",
    },
    {
      translation: "przede wszystkim",
      description: "",
    },
  ],
  [
    {
      translation: "model",
      description: "(np.: edukacji) (np.: maszyny)",
    },
  ],
];

test("split translation", () => {
  for (let i = 0; i < records.length; i += 1) {
    const isEqual =
      JSON.stringify(results[i]) ===
      JSON.stringify(splitTranslation(records[i]));
    !isEqual && console.log(splitTranslation(records[i]));
    expect(isEqual).toBeTruthy();
  }
});
