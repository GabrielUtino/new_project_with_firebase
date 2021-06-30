import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { auth, firebase } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../componets/Button";

import { TestContext } from "../App";

export function Home() {
  const history = useHistory();
  const { value, setValue } = useContext(TestContext);

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      console.log(result);

      history.push("/rooms/new");
    })
  }

  return (
    <div id="page-auth" >
      <aside>
        <img src={illustrationImg} alt="チャットイラスト" />
        <strong>Q&amp;Aの部屋を作る</strong>
        <p>質疑応答</p>
      </aside>
      <main>
        <h1>{value}</h1>
        <div className="main-content">
          <img src={logoImg} alt="ロゴイラスト" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="グーグルアイコン" />
            Googleアカウントで部屋を作る
          </button>
          <div className="separator">すでに作られた部屋に入る</div>
          <form>
            <input 
              type="text" 
              placeholder="部屋番号を入力"
            />
            <Button type="submit">
              部屋に入る
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}