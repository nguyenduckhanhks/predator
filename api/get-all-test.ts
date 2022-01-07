import axios from "axios";

export default async function getAllTests() {
  let rs = await axios({
    method: "GET",
    url: `${process.env.PREDATOR_HOST}/v1/tests`,
  });
  return rs.data;
}
