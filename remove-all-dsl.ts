import path from "path";
import { getAllDsl, removeDsl } from "./api";
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

async function removeAllDsl() {
  const allDsl = await getAllDsl("monsterra");
  await Promise.all(allDsl.map((dsl: any) => removeDsl('monsterra', dsl.name)));
}

removeAllDsl();
