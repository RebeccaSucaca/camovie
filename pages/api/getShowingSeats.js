import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  try {
    const querySql =  "SELECT `seat`.`seatNo`,`seat`.`seatName`,`seat`.`seatState`,`seat`.`showingNo`,`showing`.`showingNo`,`showing`.`movieNo`,`movie`.`movieNameT`,`movie`.`movieNameE`,`movie`.`movieRating`,`movie`.`movieRunTime`FROM `seat` LEFT JOIN `showing` ON `seat`.`showingNo`=`showing`.`showingNo`LEFT JOIN `movie` ON `showing`.`movieNo`=`movie`.`movieNo` WHERE `seat`.`showingNo`="+id ; 
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    res.status(200).json({ seats: data });
    dbconnection.end();
  } catch (error) {
  }
}