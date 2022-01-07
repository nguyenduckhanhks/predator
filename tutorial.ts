import path from "path";
import { createDsl, createTest, getAllDsl } from "./api";
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

async function createTutorialTest() {
  const groupName = "monsterra";
  const allDsl = await getAllDsl(groupName);
  const dslNames = allDsl.map((dsl: any) => dsl.name);
  // create customer
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "create-customer",
    endpoint: "cheat/create-customer",
    capture: [
      {
        json: "$.token",
        as: "token",
      },
      {
        json: "$.customerInfo.id",
        as: "customer_id",
      },
    ],
  });
  // get config
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "get-config",
    endpoint: "config/get-config",
  });
  // get daily quests status
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "get-daily-quests-status",
    endpoint: "quests/get-daily-quests-status",
  });
  // get items
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "get-items",
    endpoint: "customer/get-items",
    capture: [
      {
        json: "$.mongenInfos",
        as: "mongen_info",
      },
    ],
  });
  // update customer profile
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "update-customer-profile",
    endpoint: "customer/update-customer-profile",
    json: {
      name: "{{customer_id}}{{customer_id}}",
    },
  });
  //increase progress
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "increase-progress",
    endpoint: "customer/increase-progress",
  });
  // start hatching
  await createDsl({
    dslNames: dslNames,
    groupName: groupName,
    dslName: "start-hatching",
    endpoint: "plot/start-hatching",
    json: {
      mongen_id: "{{mongen_info[0].id}}",
    },
  });

  const testData = {
    name: "test-monsterra",
    description: "test-monsterra",
    type: "dsl",
    scenarios: [
      {
        scenario_name: "test-tutorial",
        steps: [
          {
            action: `${groupName}.create-customer`,
          },
          {
            action: `${groupName}.get-config`,
          },
          {
            action: `${groupName}.get-daily-quests-status`,
          },
          {
            action: `${groupName}.get-items`,
          },
        ],
      },
    ],
  };
  await createTest(testData);
}

createTutorialTest();
