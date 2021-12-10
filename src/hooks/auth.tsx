import React, { createContext, useContext, useState } from 'react'
import { api } from '../services/api'

interface User {
    id: string
    email: string
    name: string
    driver_license: string
    avatar: string
}

interface AuthState {
    token: string
    user: User
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
    const [data, setData] = useState<AuthState>({} as AuthState)

    async function signIn({ email, password }: SignInCredentials) {
        const response = await api.post('/sessions', { email, password })

        const { token, user } = response.data
        setData({ token, user })
        api.defaults.headers.common.authorization = `Bearer ${token}`
    }

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)

    return context
}

export { useAuth, AuthProvider }