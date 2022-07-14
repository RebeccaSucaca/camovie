import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  try {
    const querySql = "SELECT `showing`.`showingNo`,`showing`.`cinemaNo`,`showing`.`showingDtae`,`showing`.`showingTime`,`showing`.`movieNo`,`movie`.`movieNameT`,`movie`.`movieNameE`,`movie`.`movieRating`,`movie`.`movieRunTime` FROM `movie`  LEFT JOIN `showing` ON `movie`.`movieNo`=`showing`.`movieNo`  WHERE `movie`.`movieNO`="+id+" GROUP BY `showing`.`showingNo` ASC"; 
    const data = await query({ query: querySql });
    res.status(200).json({ movies: data });
    dbconnection.end();
  } catch (error) {
  }
}