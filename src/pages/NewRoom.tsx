import { useContext } from "react";
import { Link } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../componets/Button";
import { TestContext } from "../App";

import "../styles/auth.scss";

export function NewRoom() {
  const { value, setValue } = useContext(TestContext);

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
          <h2>新たな部屋を作る</h2>
          <form>
            <input 
              type="text" 
              placeholder="部屋の名前"
            />
            <Button type="submit">
              部屋に作る
            </Button>
          </form>
          <p>
            すでに作られた部屋に入りますか？ <Link to="/">こちら</Link>
          </p>
        </div>
      </main>
    </div>
  )
}