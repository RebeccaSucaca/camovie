import { query } from "../../lib/db";

export default async function handler(req, res) {
  let orderNo = req.body.orderNo;
  let orderSeat = req.body.orderSeat;
  try {
      const queryInsert = "INSERT INTO `orderDetail` (`orderDetailNo`, `orderNo`, `seatNo`, `productPrice`) VALUES (NULL, '"+orderNo+"', '"+orderSeat+"', '300');"
      const queryUpdate = "UPDATE `seat` SET `seatState`='2' WHERE `seat`.`seatNo`="+orderSeat;
      await query({ query: queryInsert});
      await query({ query: queryUpdate});
      res.status(200).json({insertState:"ok"});
    // dbconnection.end();
  } catch (error) {
  }
}
