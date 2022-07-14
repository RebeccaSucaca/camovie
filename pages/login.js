import { useState,useEffect } from "react";
import CustomHeader from './component/CustomHeader'
import CustomFooter from './component/CustomFooter'
import { auth } from "../servers/firebase";
import { getAuthToken,setAuthToken } from "../lib/utils";
import { useRouter } from 'next/router';

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getMemberId(id,loinWay) {
    const apiUrlEndpoint = `http://localhost:3000/api/getMemberId`;
    const postData = {
      method: "Post",
      headers: {
        "Content-Type": "application/json", 'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        loinWay:loinWay,
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const res = await response.json();
    console.log(res);
    setAuthToken(res.memberID[0].memberNo);
    router.back();
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("註冊成功");
        let loinWay=0;
        getMemberId(auth.currentUser.uid,loinWay)
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('信箱已存在');
            break;
          case 'auth/invalid-email':
            setErrorMessage('信箱格式不正確');
            break;
          case 'auth/weak-password':
            setErrorMessage('密碼強度不足');
            break;
          default:
        }
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("登入成功");
        getMemberId(auth.currentUser.uid,loinWay)
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMessage('信箱格式不正確');
            break;
          case 'auth/user-not-found':
            setErrorMessage('信箱不存在');
            break;
          case 'auth/wrong-password':
            setErrorMessage('密碼錯誤');
            break;
          default:
        }
      });
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      alert("google登入成功")
      let loinWay=1;
      getMemberId(auth.currentUser.uid,loinWay)
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFBSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      alert("facebook登入成功")
      let loinWay=2;
      getMemberId(auth.currentUser.uid,loinWay)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (getAuthToken()) {
      router.push("/memberCenter")
    }
  }, [router]);
  return (
    <div className="p-0">
      <CustomHeader>
      </CustomHeader>
      <main className="px-0 py-32 flex flex-col justify-center  items-center">
        <p className="mb-10 leading-5 text-3xl text-center text-indigo-900">會員註冊/登入</p>
        <div className="flex flex-col">
          <input
            type="text"
            name="email"
            className="w-60 my-1 py-2 px-4 tracking-widest text-zinc-500 rounded border-2 border-zinc-300 hover:border-indigo-200 rounded-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入信箱"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="w-60 my-1 py-2 px-4 tracking-widest text-zinc-500 rounded border-2 border-zinc-300  hover:border-indigo-200 rounded-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼"
            autoComplete="off"

          />
          {errorMessage ? <button type="button" className="w-60 h-10 my-1 py-1 px-4 tracking-widest text-red-600 rounded bg-red-100 border border-red-300 rounded-xs">!!!&nbsp;{errorMessage}&nbsp;!!!</button> : <button type="button" className="w-60 h-10 my-1 py-1 px-4 tracking-widest text-zinc-500 rounded rounded-xs opacity-0 -z-10">{errorMessage}</button>}
          <button type="button" className="my-1 w-60 flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded text-indigo-600  bg-indigo-100 hover:bg-indigo-200"
            onClick={handleRegister}
          >註冊</button>
          <button type="button" className="my-1 w-60 flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded text-white bg-indigo-500 hover:bg-indigo-700"
            onClick={handleLogin}
          >登入</button>
          <button type="button" className="my-1 w-60 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded text-sm px-5 py-3 text-center flex items-center justify-center" onClick={handleGoogleSignIn}>
            <svg className="w-4 h-4 mr-2 -ml-1" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
          </button>

          <button type="button" className="my-1 w-60 text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded text-sm px-5 py-3 text-center flex items-center justify-center" onClick={handleFBSignIn}>
            <svg className="w-4 h-4 mr-2 -ml-1" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
            Sign in with Facebook
          </button>
        </div>
      </main>
      <CustomFooter>
      </CustomFooter>
    </div>
  )
}
