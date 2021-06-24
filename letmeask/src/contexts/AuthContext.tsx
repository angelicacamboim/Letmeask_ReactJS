import { createContext, ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { firebase, auth } from '../services/firebase'

type User = {
	id: string
	name: string
	avatar: string
	//state User
}

type AuthContextType = {
	user: User | undefined
	signInWithGoogle: () => Promise<void>
	//AuthContext.Provider value={{ user, signInWithGoogle }}
}

type AuthContextProviderProps = {
	children: ReactNode
	// component Home, Path: /
	// component NewRoom, Path: /rooms/new
}

//criar o contexto usando o type AuthContextType ( como values )
export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
	const [user, setUser] = useState<User>()

	useEffect(() => {
		//verifica se a pessoa esta autenticada
		const unsubscribe = auth.onAuthStateChanged((user) => {
			//se a pessoa estiver autenticada ....
			if (user) {
				const { displayName, photoURL, uid } = user

				if (!displayName || !photoURL) {
					throw new Error('Missing information from google account')
				}

				//seta o user no estado
				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL,
				})
			}
		})

		//cancela a promise
		return () => {
			unsubscribe()
		}
	}, [user])

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider()
		auth.signInWithPopup(provider)
	}

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle }}>
			{props.children}
		</AuthContext.Provider>
	)
}
