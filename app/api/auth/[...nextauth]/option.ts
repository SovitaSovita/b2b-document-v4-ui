import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch("http://192.168.178.239:9001/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                })
                const user = await res.json();
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
        async session({ session, token }) {
            session.user = token;
            return session;
        },
        async jwt({ token, user }) {
            return token;
        },
        async signIn(params) {
            const { user, account } = params;
            // if (account?.provider === 'github') {
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
                console.log("account", account)
                console.log("user", user)

                const logData = await response.json()



                if (response?.status === 200) {
                    console.log("log :: ", logData)
                    return logData;
                }
            } catch (error) {
                console.error('Error exchanging GitHub credentials for token:', error);
            }
            // }
            return true;
        },
    },
    pages: {
        signIn: "/auth/signin"
    }
}