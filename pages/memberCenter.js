import CustomHeader from './component/CustomHeader'
import CustomFooter from './component/CustomFooter'
import { useEffect, useState, useCallback } from "react";
import { getAuthToken, removeAuthToken } from "../lib/utils";
import { useRouter } from 'next/router';

export default function MemberCenter() {
  const router = useRouter();


  const [allOrderList, setAllOrderList] = useState([]);

  const getmemberOrderList = useCallback(() => {
    async function getmemberOrderListing() {
      const apiUrlEndpoint = `http://localhost:3000/api/getMemberOrderList`;
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: getAuthToken()
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      setAllOrderList(res.list);
    }
    getmemberOrderListing();
  }, []);

  async function updateOrderState(orderNo) {
    const apiUrlEndpoint = `http://localhost:3000/api/updateOrderState`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNo: orderNo,
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    await response.json();
  }
  console.log(allOrderList.length)
  const handleCancer = async (orderNo) => {
    await updateOrderState(orderNo);
    alert("訂單取消成功");
    getmemberOrderList();
  };

  const handleLogout = () => {
    removeAuthToken();
    alert("登出成功");
    router.push("/")
  };
  const checkOrderState = function (state, orderNo) {
    switch (state) {
      case 0:
        return (<>未付款&nbsp;<span className="text-indigo-400 underline decoration-1 cursor-pointer" onClick={() => { handleCancer(orderNo) }} >(取消訂單)</span></>);
      case 1:
        return (<>已付款&nbsp;<span className="text-indigo-400 underline decoration-1 cursor-pointer" onClick={() => { handleCancer(orderNo) }} >(取消訂單)</span></>);
      case 2:
        return "已完成";
      case 3:
        return "已取消";
      default:
        return "";
    }
  }

  useEffect(() => {
    if (!getAuthToken()) {
      router.push("/login")
    }
    getmemberOrderList();
  }, [getmemberOrderList, router]);

  return (
    <div className="p-0 w-full ">
      <CustomHeader>
      </CustomHeader>
      <main className="w-full px-0">
        <section className="py-4 w-full	">
          <h1 className="mt-14 mb-6 leading-5 text-5xl text-center  text-indigo-900 relative">
            Hi,&nbsp;Member<span className="m-0 flex items-center justify-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 absolute text-sm right-28 top-0 cursor-pointer" onClick={() => handleLogout()}>登出 &rarr; </span>
          </h1>
        </section>
        <section className="w-full py-4 px-28 text-zinc-500">
          <p className="mb-6 pb-2  text-xl text-indigo-800"> &rarr; 訂單查詢</p>
          <li className="mb-4 p-2 flex flex-row justify-between text-indigo-600 bg-indigo-100 ">
            <span className="w-1/12">訂單編號</span>
            <span className="w-3/12">訂單日期</span>
            <span className="w-3/12">電影名稱</span>
            <span className="w-1/12">購買張數</span>
            <span className="w-1/12">訂單金額</span>
            <span className="w-2/12">訂單狀態</span>
          </li>
          {allOrderList ? (allOrderList.map((e) => {
            const checkOrderStateTxt = checkOrderState(e.orderStatus, e.orderNo);
            return (
              <li key={e.orderNo} className="mb-4 p-2 border-b border-zinc-300  flex flex-row justify-between ">
                <span className="w-1/12">{e.orderNo}</span>
                <span className="w-3/12">{e.orderCreateDate}</span>
                <span className="w-3/12">{e.movieNameT}</span>
                <span className="w-1/12">{e.orderQuantity}</span>
                <span className="w-1/12">$ {e.orderAmount}</span>
                <span className="w-2/12">{checkOrderStateTxt}</span>
              </li>
            )
          })) : <li><p className="w-full mt-2 text-center text-zinc-400">(尚無任何訂單)</p></li>}
          {allOrderList.length? "":<li className="mb-4 p-2 border-b border-zinc-300  flex flex-row justify-between "><p className="w-full mt-2 text-center text-zinc-400">(尚無任何訂單)</p></li>}
        </section>
      </main>
      <CustomFooter>
      </CustomFooter>
    </div>
  )
}
