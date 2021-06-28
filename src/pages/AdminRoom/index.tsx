import { Fragment } from "react";
import Modal from "react-modal";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import { useState } from "react";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";

import "./styles.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>();

  async function handleLogout() {
    await signOut();
    history.push("/");
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string | undefined) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    setQuestionIdModalOpen(undefined);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
            <Button onClick={handleLogout}>Sair</Button>
          </div>          
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            debugger;
            return (
              <Fragment key={question.id}>
                <Question
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    //onClick={() => handleDeleteQuestion(question.id)}
                    onClick={() => setQuestionIdModalOpen(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              </Fragment>
            );
          })}
        </div>
      </main>

      <Modal
        isOpen={questionIdModalOpen !== undefined}
        onRequestClose={() => setQuestionIdModalOpen(undefined)}
        //className="modal"
        //overlayClassName="modalOverlay"
      >
        {questionIdModalOpen}
        <button
          type="button"
          onClick={() => handleDeleteQuestion(questionIdModalOpen)}
        >
          Deletar
        </button>
        <button onClick={() => setQuestionIdModalOpen(undefined)}>
          Fechar
        </button>
      </Modal>
    </div>
  );
}
