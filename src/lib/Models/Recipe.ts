export interface Recipe {
  id?: string;
  name: string;
  pgVgRatio: string;
  nicotinRatio: number;
  aromas: {
    aromaId?: string | undefined;
    aromaName: string;
    aromaBrand: string;
    aromaProportion: number;
    aromaQuantity: number;
  }[];
}

export function getRecipeFromFormEntries(formDataObject: {
  [key: string]: FormDataEntryValue;
}): Recipe {
  const aromaSet = new Set<string>();
  let aromas: Recipe["aromas"] = [];

  const nonAromaFields = {
    name: formDataObject.recipeName as string,
    pgVgRatio: formDataObject.pgVgRatio as string,
    nicotinRatio: Number(formDataObject.nicotinRatio),
  };

  for (const key in formDataObject) {
    key.includes("aroma") && key.length < 8 && aromaSet.add(key);
  }
  for (const aroma of aromaSet) {
    aromas = [
      ...aromas,
      {
        aromaName: formDataObject[aroma] as string,
        aromaBrand: formDataObject[aroma + "_brand"] as string,
        aromaProportion: Number(formDataObject[aroma + "_proportion"]),
        aromaQuantity: Number(formDataObject[aroma + "_quantity"]),
      },
    ];
  }
  return { ...nonAromaFields, aromas };
}
