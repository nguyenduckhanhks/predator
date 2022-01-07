import axios from "axios";

export default async function getAllDsl(
  groupName: string,
) {
  let rs = await axios({
    method: "GET",
    url: `${process.env.PREDATOR_HOST}/v1/dsl/${groupName}/definitions`,
  });
  return rs.data;
}
