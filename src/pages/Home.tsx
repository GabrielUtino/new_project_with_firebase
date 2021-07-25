import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState(""); 

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.")
    }

    history.push(`/rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="部屋番号を入力"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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