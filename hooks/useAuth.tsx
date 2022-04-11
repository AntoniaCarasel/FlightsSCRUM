import React from 'react'

import { UserType } from '../interfaces'

type AuthProviderProps = {
    children: React.ReactNode
}

type RegisterDetailsType = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
}

type AuthContextProps = {
    user: UserType | undefined
    isLoading: boolean
    signUp: (registerDetails: RegisterDetailsType) => Promise<void>
    signInWithEmailAndPassword: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
    user: undefined,
    isLoading: true,
    signUp: async (_: RegisterDetailsType) => {},
    signInWithEmailAndPassword: async (_1: string, _2: string) => {},
    signOut: async () => {}
})

class SignInError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<UserType | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(true)

    const signInWithEmailAndPassword = React.useCallback(async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch('/api/auth', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (response.ok) {
                const body = await response.json()
                const user = body.payload.user as UserType
                user.isAdmin = !!body.payload.isAdmin;
                console.log({ user })
                setUser(user)
                return
            }

            throw new SignInError(response.statusText, response.status)
        } catch (error) {
            if (error instanceof SignInError) {
                throw error
            }

            throw new SignInError('', 500)
        }
    }, [])

    const signUp = React.useCallback(async (registerDetails: RegisterDetailsType) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerDetails)
            })

            if (response.ok) {
                return
            }

            return
        } catch (error) {
            console.log(error);
        }
    }, [])

    const signOut = React.useCallback(async () => {
        setUser(undefined)
    }, [])

    const context = React.useMemo(
        () => ({
            user,
            isLoading,
            signUp,
            signInWithEmailAndPassword,
            signOut
        }),
        [user, isLoading, signInWithEmailAndPassword, signOut]
    )

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

const useAuth = () => React.useContext(AuthContext)

export default useAuth
export {AuthProvider, SignInError}