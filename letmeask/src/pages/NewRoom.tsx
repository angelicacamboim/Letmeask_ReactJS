import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { FormEvent } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom() {
	//usa o contexto AuthContext
	const { user } = useAuth()
	const [newRoom, setNewRoom] = useState('')
	const history = useHistory()

	//Criação de sala
	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault()

		//tirar os espaços da string
		if (newRoom.trim() === '') {
			return
		}

		//criar uma referencia no firebase
		const roomRef = database.ref('rooms')

		//vai salvar as info dentro da referencia chamada rooms
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		})

		//direciona o user na sala especifica
		history.push(`/rooms/${firebaseRoom.key}`)
	}

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask" />
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
						Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	)
}
