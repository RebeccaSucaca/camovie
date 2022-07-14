import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  // const id = 1;
  try {
    const querySql = "SELECT `showing`.`showingNo`,`showing`.`cinemaNo`,`showing`.`showingDtae`,`showing`.`showingTime`,`showing`.`movieNo` FROM `movie`  LEFT JOIN `showing` ON `movie`.`movieNo`=`showing`.`movieNo`  WHERE `movie`.`movieNo`="+id+" GROUP BY `showing`.`showingNo` ASC"; 
    const valueParams = [];
    const data = await query({ query: querySql, values: [valueParams] });
    res.status(200).json({ movies: data });
    dbconnection.end();
  } catch (error) {
  }
}

// SELECT 
// `movie`.`movieNo`,
// `movie`.`movieNameT`,
// `movie`.`movieNameE`,
// `movie`.`movieRating`,
// `movie`.`movieRunTime`,
// `showing`.`showingNo`,
// `showing`.`cinemaNo`,
// `showing`.`showingDtae`,
// `showing`.`showingTime`,
// `showing`.`movieNo`
// FROM `movie` 
// LEFT JOIN `showing` ON `showing`.`movieNo`=`movie`.`movieNo` 
// WHERE `movie`.`movieNo`=1
// GROUP BY `movie`.`movieNo` DESC

// SELECT 
// `orderList`.`orderNo`,
// `orderList`.`orderAmount`,
// `orderList`.`discountedAmount`,
// `orderList`.`orderLevel`,
// `orderList`.`orderAddress`,
// `orderList`.`orderStatus`,
// `orderList`.`createDate`,
// `orderDetail`.`orderListNo`,
// `orderDetail`.`productNo`,
// `orderDetail`.`quantity`,
// `product`.`productName`,
// `product`.`productPrice`,
// `product`.`productSale`,
// `productDetail`.`productColor`

// FROM `member` 
// LEFT JOIN `orderList` ON `member`.`memberNo`=`orderList`.`memberNo` 
// LEFT JOIN `orderDetail` ON `orderList`.`orderNo`=`orderDetail`.`orderNo`
// LEFT JOIN `product` ON `orderDetail`.`productNo`=`product`.`productNo`
// LEFT JOIN `productDetail` ON `product`.`productNo`=`productDetail`.`productNo`
// WHERE `member`.`memberNO`='{$_SESSION["loginMember"]}'
// GROUP BY `orderList`.`orderNo` DESC

// SELECT 
// `showing`.`showingNo`,
// `showing`.`cinemaNo`,
// `showing`.`showingDtae`,
// `showing`.`showingTime`,
// `showing`.`movieNo`


// FROM `movie` 
// LEFT JOIN `showing` ON `movie`.`movieNo`=`showing`.`movieNo` 
// WHERE `movie`.`movieNO`=1
// GROUP BY `showing`.`showingNo` DESC