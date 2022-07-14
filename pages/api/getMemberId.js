import { query } from "../../lib/db";

export default async function handler(req, res) {
  const id = req.body.id;
  const loinWay = req.body.loinWay;
  try {
    const querySql = 'SELECT `member`.`memberNo`,`member`.`firebaseId` from `member` WHERE `firebaseId`="' + id + '"';

    const data = await query({ query: querySql });
    if (data.length !== 0) {
    // 如果已經有註冊，那就返回資料讓前臺儲存token
      res.status(200).json({ memberID:data,textData:"SELECT OK"});
    }else{
      // 如果還沒註冊，就先INSERT
      const querySql = "INSERT INTO `member`( `loginWay`, `firebaseId`) VALUES ('"+loinWay+"','"+id+"')";
      const data = await query({ query: querySql});
      const querySql1 = 'SELECT `member`.`memberNo` from `member` WHERE `firebaseId`="' + id + '"';
      const newData = await query({ query: querySql1 });
      res.status(200).json({ memberID:newData,textData:"INSERT OK"});
    }
    // res.status(200).json({ memberId: data });
    dbconnection.end();
  } catch (error) {
  }
}