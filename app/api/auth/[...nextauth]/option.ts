import { Session, getServerSession, type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const API_BASE_URL = process.env.API_BASE_URL as string;

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
                const res = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                })
                const user = await res.json();

                console.log(":::::::::::::::::", user)
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
            console.log("params", params)
            const { user, account, ...rest } = params;

            console.log(" >>>>>> ", rest.credentials)

            if (account?.provider === 'credentials') {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: rest.credentials?.userId, otpCode: rest.credentials?.otpCode })
                    })
                    const data = await res.json();

                    console.log("data", data)
                    if (res.ok) {
                        return data;
                    }
                    return null;

                } catch (error) {
                    console.error('[Error] -> ', error);
                }
            }
        },

    },
    pages: {
        signIn: "/auth/signin"
    }
}