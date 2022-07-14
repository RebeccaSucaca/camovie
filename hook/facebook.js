import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
const useFB = () => {
  const handleLoginFB = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async result => {
        const user = result.user;
        console.log(user);
        // 在這邊把user資料寫入locaStorage或是進行後端寫入資料庫等等的操作
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(accessToken);
        alert("FB登入成功")


      })
      .catch(error => {
        console.log(error);
        console.log("noonon");
        alert("FB登入失敗")

      });
  };
  return { handleLoginFB };
};
export default useFB;