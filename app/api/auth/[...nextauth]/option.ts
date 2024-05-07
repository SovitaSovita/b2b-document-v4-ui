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
        id?: string;
        userId?: string;
        token?: string;
        clph_NO?: string;
        dvsn_CD?: string;
        dvsn_NM?: string;
        jbcl_NM?: string;
        eml?: string;
        flnm?: string;
        prfl_PHTG?: string;
        iat?: number;
        jti?: string;
    }
}

export const jwt = async ({ token, user }: { token: JWT; user: any }) => {
    if (user) {
        token.id = user.id;
        token.userId = user.userId;
        token.token = user.token;
        token.clph_NO = user.clph_NO;
        token.dvsn_CD = user.dvsn_CD;
        token.dvsn_NM = user.dvsn_NM;
        token.jbcl_NM = user.jbcl_NM;
        token.eml = user.eml;
        token.flnm = user.flnm;
        token.prfl_PHTG = user.prfl_PHTG;
    }
    return token;
};

export const session = ({ session, token }: {
    session: any;
    token: JWT
    user: any
}): Promise<Session> => {
    if (token) {
        session.user.id = token.id;
        session.user.userId = token.userId;
        session.token = token.token;
        session.user.clph_NO = token.clph_NO;
        session.user.dvsn_CD = token.dvsn_CD;
        session.user.dvsn_NM = token.dvsn_NM;
        session.user.jbcl_NM = token.jbcl_NM;
        session.user.eml = token.eml;
        session.user.flnm = token.flnm;
        session.user.prfl_PHTG = token.prfl_PHTG;
    }
    return Promise.resolve(session);
};

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile) {

                // console.log("profile ?>>>>>", profile);

                const result = await fetch(`${API_BASE_URL}/api/v1/auth/social`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        gmail: profile?.email,
                        appId: "2"
                    })
                })
                const data = await result.json();
                const token = data.payload;
                return {
                    id: token.id,
                    userId: token.userId,
                    token: token.token,
                    clph_NO: token.clph_NO,
                    dvsn_CD: token.dvsn_CD,
                    dvsn_NM: token.dvsn_NM,
                    jbcl_NM: token.jbcl_NM,
                    eml: token.eml,
                    flnm: token.flnm,
                    prfl_PHTG: token.prfl_PHTG,
                };
            },

        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                userId: { label: "Username", type: "text" },
                optCode: { label: "optCode", type: "text" },
                appId: { label: "appId", type: "text" },
            },
            async authorize(credentials) {

                console.log(
                    credentials
                );
                const result = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                })
                const data = await result.json();

                // console.log("data >> ", data);


                if (result.ok) {
                    return data?.payload;
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
    },
    pages: {
        signIn: "/auth/signin"
    }
}