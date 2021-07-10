import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("")

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      autherId: user?.id,
    });

    history.push(`./rooms/${firebaseRoom.key}`)
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
          <h2>新たな部屋を作る</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="部屋の名前"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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