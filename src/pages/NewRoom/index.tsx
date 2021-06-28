import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { useTheme } from "../../hooks/useTheme";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import "./styles.scss";

export function NewRoom() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleLogout() {
    await signOut();
    history.push("/");
  }

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração troca de perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="header">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <button onClick={toggleTheme}>Toggle</button>
            <Button onClick={handleLogout}>Sair</Button>
          </div>
        </div>
        <div className="main-content">
          <div>
            <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Nome da sala"
                onChange={(event) => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">Criar sala</Button>
            </form>
            <p>
              Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
