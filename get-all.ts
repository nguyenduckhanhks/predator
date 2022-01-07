import path from "path";
import { getAllDsl, getAllTests } from "./api";
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

async function allDsls() {
  const allDsl = await getAllDsl("monsterra");
  const allTests = await getAllTests();
  console.log({ allDsl: JSON.stringify(allDsl), allTests });
}

allDsls();
