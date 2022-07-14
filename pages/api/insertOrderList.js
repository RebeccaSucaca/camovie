import { query } from "../../lib/db";

export default async function handler(req, res) {
  const memberNo = req.body.memberNo;
  const movieNo = req.body.movieNo;
  const cinemaNo = req.body.cinemaNo;
  const showingNo = req.body.showingNo;
  const orderQuantity = req.body.orderQuantity;
  const orderAmount = req.body.orderAmount;

  try {
    const querySql0 = "INSERT INTO `orderList` (`orderNo`, `memberNo`, `movieNo`, `cinemaNo`, `showingNo`, `orderQuantity`, `orderAmount`, `payWay`, `orderStatus`, `orderCreateDate`) VALUES (NULL, '"+memberNo+"', '"+movieNo+"', '"+cinemaNo+"', '"+showingNo+"', '"+orderQuantity+"', '"+orderAmount+"', '0', '1', current_timestamp());"
    
    const data0 = await query({ query: querySql0 });
    const querySql1 = 'SELECT MAX(`orderList`.`orderNo`) AS orderNo FROM `orderList` WHERE `orderList`.`memberNo`='+memberNo;
    const newData = await query({ query: querySql1 });
    res.status(200).json({ newData:newData,textData:"INSERT OK"});
    dbconnection.end();
  } catch (error) {
  }
}
