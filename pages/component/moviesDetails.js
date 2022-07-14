import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/router';
import { getAuthToken } from "../../lib/utils";

function CinemashowingTime(props) {
  const router = useRouter();

  const hamdleGoOrder = (routerLink) => {

    if (!getAuthToken()) {
      router.push("/login")
    } else {
      router.push(routerLink)
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
  const showingTimeTxt = checkTime(props.showingTime);
  const routerLink = "/orderSeats?movieNo=" + props.movieNo + "&showingNo=" + props.showingNo;
  return (
    <li >
      <button type="button" onClick={()=>{hamdleGoOrder(routerLink)}} className="mr-8 py-1 px-4 tracking-widest text-zinc-500 rounded border-2 border-zinc-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500 ">
        {showingTimeTxt}
      </button>
    </li>
  )
}
function CinemaDayItem(props) {
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
  const showingDateTxt = checkdate(props.showingDtae)
  const CinemaDayItemArrary = props.movieDetail.filter(function (item, index, array) {
    return item.showingDtae == props.showingDtae;
  })
  let CinemaDayItemTxt = CinemaDayItemArrary.map((e) =>
    <CinemashowingTime key={e.showingNo} showingTime={e.showingTime} showingNo={e.showingNo} movieNo={e.movieNo} />
  );
  return (
    <div className="border-b border-slate-100 last:border-0">
      <p className="font-bold text-zinc-500 tracking-wider mt-3">{showingDateTxt}</p>
      <ul className="m-0 pt-3 pb-7 flex justify-start items-center">
        {CinemaDayItemTxt}
      </ul>
    </div>
  )
}
function CinemaDayList(props) {
  const cinemaDayMax = props.movieDetail.reduce(function (accumulator, currentValue) {
    return Math.max(accumulator, currentValue.showingDtae);
  }, 0);
  const a = Array.from(Array(cinemaDayMax + 1), (value, index) => index);
  const b = a.map((o) => {
    return (props.movieDetail.find(function (item, index, array) {
      return item.showingDtae == o;
    }))
  })
  let cinemaDayArraryTxt = b.map((e) =>
    <CinemaDayItem key={e.showingNo} movieNameT={e.movieNameT} showingDtae={e.showingDtae} showingNo={e.showingNo} showingTime={e.showingTime} movieDetail={props.movieDetail} movieNo={e.movieNo} />
  );
  return (<>{cinemaDayArraryTxt}</>)
}

export default function MovieDetails(props) {
  const [movieDetail, setMovieDetail] = useState(null);
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
  const getMovieDetail = useCallback((id) => {
    const getMovieDetailing = async function (id) {
      const apiUrlEndpoint1 = `http://localhost:3000/api/getMovieDetailShowingList`;
      const postData1 = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response1 = await fetch(apiUrlEndpoint1, postData1);
      const res1 = await response1.json();
      const rating = checkRating(res1.movies[0].movieRating)
      setMovieDetail({ movieDetail: res1.movies, movieRating: rating.movieRating, bgColor: rating.bgColor })
    }
    getMovieDetailing(id);
  }, []);

  useEffect(() => {
    getMovieDetail(props.idNum)
  }, [getMovieDetail, props.idNum]);

  return (
    <>
      {movieDetail ? (
        <><section className="py-4 px-28">
          <p className=" mt-6 mb-2 flex">
            {/* {console.log(movieDetail)} */}
            <span className="text-3xl font-medium text-slate-900">{movieDetail.movieDetail[0].movieNameT}</span>
            <span className="text-xl ml-2 py-1 px-2 rounded-sm text-white" style={{ backgroundColor: movieDetail.bgColor }}>{movieDetail.movieRating}</span>
          </p>
          <p className="m-0 text-xl text-slate-600">{movieDetail.movieDetail[0].movieNameE}</p>
          <p className="my-5 mx-0 text-slate-900">片長：{movieDetail.movieDetail[0].movieRunTime}</p>
        </section>
          <section className="py-4 px-28 border-t-2 border-slate-100 ">
            <CinemaDayList movieDetail={movieDetail.movieDetail} />
          </section></>
      ) : (<></>)}
    </>
  )
}
