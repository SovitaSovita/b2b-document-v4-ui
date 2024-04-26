import { Session, getServerSession, type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export function auth() {
    return getServerSession(options);
}

export type Token = {
    expired: string;
    token: string;
    username: string;
    dateTime: string;
};
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
        token?: Token;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        token?: string;
        dateTime?: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}

export const jwt = async ({ token, user }: { token: JWT; user: any }) => {
    if (user) {
        token.user = user?.username
        token.expired = user?.expired
        token.token = user?.token
        token.dateTime = user?.dateTime
    }
    return token;
};

export const session = ({ session, token }: {
    session: any;
    token: JWT
}): Promise<Session> => {
    if (token) {
        session.user = token.user;
        session.token = token.token;
        session.dateTime = token.dateTime;
        session.expired = token.expired;
    }
    return Promise.resolve(session);
};

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                userId: { label: "Username", type: "text" },
            },
            async authorize(credentials) {
                const res = await fetch("http://192.168.178.72:8000/api/v1/auth/send-otp", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                })
                const user = await res.json();

                console.log("user :::::::::::::::::", user)
                if (res.ok) {
                    return user;
                }
                else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        session,
        jwt,
        async signIn(params) {
            const { user, account } = params;
            if (account?.provider === 'google') {
                try {
                    const response = await fetch("http://192.168.178.239:9001/api/v1/auth/login", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: "root",
                            password: "root123",
                            githubToken: account?.accessToken,
                        })
                    })
                    // console.log("account", account)
                    // console.log("user", user)

                    const logData = await response.json()



                    if (response?.status === 200) {
                        console.log("log :: ", logData)
                        return logData;
                    }
                } catch (error) {
                    console.error('Error exchanging GitHub credentials for token:', error);
                }
            }
            return true;
        },
    },
    pages: {
        signIn: "/auth/signin"
    }
}