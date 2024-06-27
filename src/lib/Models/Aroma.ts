import { Recipe } from "./Recipe";

export interface Aroma {
  id?: string | undefined;
  name?: string;
  brand?: string;
  recipes?: Recipe["id"][];
}
