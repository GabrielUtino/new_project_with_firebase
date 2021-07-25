import { useParams } from "react-router";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
// import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss"
import { database } from "../services/firebase";
import { useHistory } from "react-router-dom";

// type FirebaseQuestions = Record<string, {
//   author: {
//     name: string;
//     avatar: string;
//   }
//   content: string;
//   isAnswered: boolean;
//   isHighlighted: boolean;
// }>

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push(`/`);
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("コメントが削除されますが、よろしいですか？")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlighQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })    
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="質疑応答" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>閉鎖</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>タイトル：{title}</h1>
          { questions.length > 0 && <span>質問数：{questions.length}</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="回答済"></img>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlighQuestion(question.id)}
                    >
                      <img src={answerImg} alt="ハイライト"></img>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="削除"></img>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
}