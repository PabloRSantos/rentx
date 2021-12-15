import React, { createContext, useContext, useEffect, useState } from 'react'
import { database } from '../database'
import { api } from '../services/api'
import { User as ModelUser } from '../database/model/User'
interface User {
    id: string
    user_id: string
    email: string
    name: string
    driver_license: string
    avatar: string
    token: string
}

interface SignInCredentials {
    email: string
    password: string
}

interface AuthContextData {
    user: User
    signIn: (credentials: SignInCredentials) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)


const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<User>({} as User)

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<ModelUser>('users')
            const response = await userCollection.query().fetch()

            if(response.length) {
                const userData = response[0]._raw as unknown as User
                api.defaults.headers.common.authorization = `Bearer ${userData.token}`
                setData(userData)
            }
        }
        loadUserData()
    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('/sessions', { email, password })
            const { token, user } = response.data
            database
            setData({ ...user, token })
            api.defaults.headers.common.authorization = `Bearer ${token}`

            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                await userCollection.create(newUser => {
                    newUser.user_id = user.id
                    newUser.name = user.name
                    newUser.email = user.email
                    newUser.driver_license = user.driver_license
                    newUser.avatar = user.avatar
                    newUser.token = token
                })
            })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user: data, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)

    return context
}

export { useAuth, AuthProvider }