import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push("/rooms/new");
  }

  return (
    <div id="page-auth" >
      <aside>
        <img src={illustrationImg} alt="チャットイラスト" />
        <strong>Q&amp;Aの部屋を作る</strong>
        <p>質疑応答</p>
      </aside>
      <main>
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