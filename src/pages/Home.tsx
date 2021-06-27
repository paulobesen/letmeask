import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { useTheme } from '../hooks/useTheme';

type FormFields = {
    roomCode: string;
}

const schemaValidation = Yup.object().shape({
    roomCode: Yup.string().required('Código obrigatório').min(6, '6 caracteres no mínimo')
})

export function Home() {
    const history = useHistory();
    const { theme, toggleTheme } = useTheme();
    const { user, signInWithGoogle } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaValidation)
    });

    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');    
    }

    async function handleJoinRoom(data: FormFields) {
        const roomRef = await database.ref(`rooms/${data.roomCode}`).get();

        if (!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${data.roomCode}`);
    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="Ilustração troca de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h1>{theme}</h1>
                    <button onClick={toggleTheme}>Toggle</button>
                    <img src={logoImg} alt="LetMeAsk" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleSubmit(handleJoinRoom)}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            {...register('roomCode')}
                        />
                        <div className="yup-validation">{errors.roomCode?.message}</div>

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}