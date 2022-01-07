import axios from "axios";

export default async function createCustomer({
  dslNames,
  groupName,
  dslName,
  endpoint,
  headers = {
    "Content-Type": "application/json",
  },
  json = {},
  capture = [],
}: any) {
  if (dslNames.indexOf(dslName) !== -1) return;
  const data = {
    name: dslName,
    request: {
      post: {
        url: `${process.env.BACKEND_HOST + endpoint}`,
        headers,
        json,
        capture,
      },
    },
  };
  let rs = await axios({
    method: "POST",
    url: `${process.env.PREDATOR_HOST}/v1/dsl/${groupName}/definitions`,
    headers,
    data: JSON.stringify(data),
  });
  return rs.data;
}
