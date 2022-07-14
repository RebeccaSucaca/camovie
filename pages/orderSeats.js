import CustomHeader from './component/CustomHeader'
import CustomFooter from './component/CustomFooter'
import { useEffect, useState, useCallback } from "react";
import { getAuthToken } from "../lib/utils";
import { useRouter } from 'next/router'

function CinemaSeatItem(props) {

  const { setMovieDatas } = props;
  const [seatSelectState, setSeatSelectState] = useState(false);
  let seatArrary = props.moviedata.orderSeatdata;

  const handleOrderSeat = (seatNo, seatName) => {
    if (!seatSelectState) {
      seatArrary.push({ "seatNo": seatNo, "seatName": seatName });
      let newSeatArrary = seatArrary
      setMovieDatas({ movieDetail: props.moviedata.movieDetail, seatDatas: props.moviedata.seatDatas, movieRating: props.moviedata.movieRating, bgColor: props.moviedata.bgColor, showingDateTxt: props.moviedata.showingDateTxt, showingTimeTxt: props.moviedata.showingTimeTxt, orderSeatdata: newSeatArrary, price: props.moviedata.price + 300 });
    } else {
      let newSeatArrary = seatArrary.filter(function (item) {
        return item.seatNo !== seatNo
      });
      setMovieDatas({ movieDetail: props.moviedata.movieDetail, seatDatas: props.moviedata.seatDatas, movieRating: props.moviedata.movieRating, bgColor: props.moviedata.bgColor, showingDateTxt: props.moviedata.showingDateTxt, showingTimeTxt: props.moviedata.showingTimeTxt, orderSeatdata: newSeatArrary, price: props.moviedata.price - 300 });
    }
    setSeatSelectState(!seatSelectState)
  }

  const checkSeatName = function (seatName) {
    switch (seatName) {
      case 0:
        return "A1";
      case 1:
        return "A2";
      case 2:
        return "A3";
      default:
        return "";
    }
  }
  const checkSeatNameTxt = checkSeatName(props.seatName);
  if (props.seatState == 2) {
    return (
      <><li
        className="mr-8 py-1 px-4 w-fit cursor-no-drop  tracking-widest text-zinc-500 rounded border-2 border-zinc-300 bg-zinc-200 opacity-50 last:mr-0"
      >{checkSeatNameTxt}</li>
      </>
    )
  } else {
    return (
      <>{seatSelectState ? <li
        onClick={() => { handleOrderSeat(props.seatNo, checkSeatNameTxt) }}
        className="mr-8 py-1 px-4 w-fit cursor-pointer  tracking-widest text-white rounded border-2 border-indigo-500 bg-indigo-500 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 last:mr-0"
      >{checkSeatNameTxt}</li> : <li
        onClick={() => { handleOrderSeat(props.seatNo, checkSeatNameTxt) }}
        className="mr-8 py-1 px-4 w-fit cursor-pointer tracking-widest text-zinc-500 rounded border-2 border-zinc-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 last:mr-0"
      >{checkSeatNameTxt}</li>}
      </>
    )
  }
}


export default function OrderSeats() {
  const router = useRouter()

  const [movieDatas, setMovieDatas] = useState(null);
  const checkRating = function (movieRating) {
    switch (movieRating) {
      case 0:
        return { movieRating: "普", bgColor: "rgb(5 150 105)" }
      case 1:
        return { movieRating: "護", bgColor: "rgb(59 130 246)" }
      case 2:
        return { movieRating: "輔", bgColor: "rgb(249 115 22)" }
      case 3:
        return { movieRating: "限", bgColor: "rgb(220 38 38)" }
      default:
        return { movieRating: "", bgColor: "" }
    }
  }
  const checkdate = function (movieRating) {
    switch (movieRating) {
      case 0:
        return "2022/08/01(一)";
      case 1:
        return "2022/08/02(二)";
      case 2:
        return "2022/08/03(三)";
      case 3:
        return "2022/08/04(四)";
      case 4:
        return "2022/08/05(五)";
      default:
        return "";
    }
  }
  const checkTime = function (movieRating) {
    switch (movieRating) {
      case 0:
        return "9:00";
      case 1:
        return "14:00";
      case 2:
        return "20:00";
      default:
        return "";
    }
  }
  const getShowingSeats = useCallback((movieNo, showingNo) => {
    const getShowingSeatsing = async function (movieNo, showingNo) {
      const apiUrlEndpoint = `http://localhost:3000/api/getMovieDetailShowingItem`;
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieNo: movieNo,
          showingNo: showingNo
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      const apiUrlEndpoint1 = `http://localhost:3000/api/getShowingSeats`;
      const postData1 = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: showingNo,
        }),
      };
      const response1 = await fetch(apiUrlEndpoint1, postData1);
      const res1 = await response1.json();
      const rating = checkRating(res.details[0].movieRating)
      const showingDateTxt = checkdate(res.details[0].showingDtae)
      const showingTimeTxt = checkTime(res.details[0].showingTime)
      setMovieDatas({ movieDetail: res.details[0], seatDatas: res1.seats, movieRating: rating.movieRating, bgColor: rating.bgColor, showingDateTxt: showingDateTxt, showingTimeTxt: showingTimeTxt, orderSeatdata: [], price: 0 });
    }
    getShowingSeatsing(movieNo, showingNo);
  }, []);

  useEffect(() => {
    const href = location.href;
    if (href.indexOf("?") != -1) {
      let showingNo = href.split('showingNo=')[1];
      let movieNo = href.split('movieNo=')[1].split('&')[0];
      if (showingNo && movieNo) {
        getShowingSeats(movieNo, showingNo);
      }
    } else {
      router.push("/movies")
    }
  }, [getShowingSeats, router]);


  async function insertOrderDetail(orderNo, orderSeat) {
    console.log(orderSeat)
    const apiUrlEndpoint = `http://localhost:3000/api/insertOrderDetail`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNo: orderNo,
        orderSeat: orderSeat,
      }),
    };

    const response = await fetch(apiUrlEndpoint, postData);
    const res = await response.json();
    // console.log(res);
    // if (res.insertState === "ok") {
    //   console.log("成功")
    // } else {
    //   console.log("失敗捏");
    // }
  }
  async function insertOrderList(memberNo, movieNo, cinemaNo, showingNo, orderQuantity, orderAmount, orderSeats) {
    const apiUrlEndpoint = `http://localhost:3000/api/insertOrderList`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberNo: memberNo,
        movieNo: movieNo,
        cinemaNo: cinemaNo,
        showingNo: showingNo,
        orderQuantity: orderQuantity,
        orderAmount: orderAmount,
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    console.log("gogo2")
    const res = await response.json();
    orderSeats.forEach(e => {
      insertOrderDetail(res.newData[0].orderNo, e.seatNo);
    });

  }

  const handleOrderPay = async () => {

    await insertOrderList(
      getAuthToken(),
      movieDatas.movieDetail.movieNo,
      movieDatas.movieDetail.cinemaNo,
      movieDatas.movieDetail.showingNo,
      movieDatas.orderSeatdata.length,
      movieDatas.price,
      movieDatas.orderSeatdata
    )
    alert("訂票成功！");
    // 這裡放彈跳視窗之後打開下面註解
    router.push("/memberCenter")

  }
  return (
    <div className="p-0 w-full ">
      <CustomHeader>
      </CustomHeader>
      <main className="w-full px-0 flex flex-row flex-wrap justify-start  items-start">
        {movieDatas ?
          (
            <>
              <section className="w-full py-4 px-28 ">
                <p className="mt-6 mb-2 flex">
                  <span className="text-3xl font-medium text-slate-900">{movieDatas.movieDetail.movieNameT}</span>
                  <span className="text-xl ml-2 py-1 px-2 rounded-sm text-white" style={{ backgroundColor: movieDatas.bgColor }}>{movieDatas.movieRating}</span>
                </p>
                <p className="m-0 text-xl text-slate-600">{movieDatas.movieDetail.movieNameE}</p>
                <p className="my-5 mx-0 text-slate-700">片長：{movieDatas.movieDetail.movieRunTime}</p>
                <p className="my-5 mx-0 text-xl text-indigo-600 tracking-wider font-semibold">{movieDatas.showingDateTxt + " " + movieDatas.showingTimeTxt}&nbsp;&nbsp;&nbsp;第{movieDatas.movieDetail.cinemaNo}廳</p>
              </section>
              <section className="py-4 px-28 pr-14 w-6/12	">
                <div className="min-h-table mr-4  px-4 pt-2 pb-4 tracking-widest text-zinc-500 rounded border-2 border-zinc-300 flex flex-col justify-end">
                  <p className="mb-6 pb-2 border-b-2 border-zinc-300 text-xl text-indigo-700">請選擇座位</p>
                  <div className="m-0 mb-14 px-1 py-1  tracking-widest text-zinc-500 rounded border-2 border-zinc-300 text-center">Screen</div>
                  <ul className="p-0 mb-6 flex justify-center">

                    {movieDatas.seatDatas.map((e) => {
                      return (
                        <CinemaSeatItem key={e.seatNo} seatNo={e.seatNo} seatName={e.seatName} seatState={e.seatState} moviedata={movieDatas} setMovieDatas={setMovieDatas} />)
                    })}
                  </ul>
                </div>
              </section>
              <section className="py-4 px-28 pl-14 w-6/12	">
                <div className="min-h-table mr-4  px-4 pt-2 pb-4 tracking-widest text-zinc-500 rounded border-2 border-zinc-300 flex flex-col justify-end">
                  <p className="mb-2 pb-2 border-b-2 border-zinc-300 text-xl text-indigo-700">訂票資訊</p>
                  <ul className="p-0">
                    {
                      movieDatas.orderSeatdata.map((e) => {
                        return <li key={e.seatNo} className="mb-4 border-b border-zinc-300  flex flex-row justify-between">
                          <span>{e.seatName}座位</span>
                          <span>一般票</span>
                          <span>1張</span>
                          <span>300元</span>
                        </li>
                      })
                    }
                  </ul>
                  <p className="mb-4 text-end">小計：{movieDatas.price}</p>

                  {movieDatas.orderSeatdata.length ? <button type="button" onClick={() => { handleOrderPay() }} className="m-4 my-6 mb-0 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white tracking-widest bg-indigo-600 hover:bg-indigo-500 ">
                    確認付款
                  </button> : <button type="button" className="m-4 my-6 mb-0 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white tracking-widest bg-indigo-200  cursor-no-drop">確認付款</button>}
                </div>
              </section>
            </>
          ) : (<></>)}
      </main>
      <CustomFooter>
      </CustomFooter>
    </div>
  )
}
