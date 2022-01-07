import axios from "axios";

export default async function createTest(data: any) {
  let rs = await axios({
    method: "POST",
    url: `${process.env.PREDATOR_HOST}/v1/tests`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  });
  return rs.data;
}
