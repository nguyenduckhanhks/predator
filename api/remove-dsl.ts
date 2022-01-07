import axios from "axios";

export default async function removeDsl(
  groupName: string,
  dslName: string
) {
  let rs = await axios({
    method: "DELETE",
    url: `${process.env.PREDATOR_HOST}/v1/dsl/${groupName}/definitions/${dslName}`,
  });
  console.log(rs.data);
  return rs.data;
}
