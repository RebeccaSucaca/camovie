import { query } from "../../lib/db";

export default async function handler(req, res) {
  const orderNo = req.body.orderNo;
  try {
    const querySql0 = "UPDATE `orderList` SET `orderStatus`='3' WHERE `orderNo`="+orderNo
    await query({ query: querySql0 });
    res.status(200).json({ state:"OK"});
    dbconnection.end();
  } catch (error) {
  }
}
