import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  try {
    const querySql =  "SELECT `orderList`.`orderNo`, `orderList`.`memberNo`, `orderList`.`movieNo`, `orderList`.`cinemaNo`, `orderList`.`showingNo`, `orderList`.`orderQuantity`, `orderList`.`orderAmount`, `orderList`.`payWay`, `orderList`.`orderStatus`, `orderList`.`orderCreateDate` ,`movie`.`movieNameT` FROM `orderList` LEFT JOIN `movie` ON `orderList`.`movieNo`=`movie`.`movieNo` WHERE `orderList`.`memberNo`="+id ; 
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    res.status(200).json({ list: data });
    dbconnection.end();
  } catch (error) {
  }
}