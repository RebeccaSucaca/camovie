import { query } from "../../lib/db";

export default async function handler(req, res) {
  const movieNo = req.body.movieNo;
  const showingNo = req.body.showingNo;
  try {
    const querySql = "SELECT `showing`.`showingNo`,`showing`.`cinemaNo`,`showing`.`showingDtae`,`showing`.`showingTime`,`showing`.`movieNo`,`showing`.`cinemaNo`,`movie`.`movieNameT`,`movie`.`movieNameE`,`movie`.`movieRating`,`movie`.`movieRunTime` FROM `movie`  LEFT JOIN `showing` ON `movie`.`movieNo`=`showing`.`movieNo`  WHERE `movie`.`movieNo`="+movieNo+" AND`showing`.`showingNo`="+showingNo
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    res.status(200).json({ details: data });
    dbconnection.end();
  } catch (error) {
  }
}