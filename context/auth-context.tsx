import { BASE_URL } from "@/constants";
import { AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export type AuthUser = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    givenName?: string;
    familyName?: string;
    emailVerified?: boolean;
    provider?: string;
    exp?: number;
    cookieExpiration?: number;
};

const AuthContext = React.createContext({
    user: null as AuthUser | null,
    signIn: () => {},
    signOut: () => {},
    fetchWithAuth: async (url: string, options?: RequestInit) => Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
});

const googleConfig: AuthRequestConfig = {
    clientId: "google",
    scopes: ["openid", "profile", "email"],
    redirectUri: makeRedirectUri(),
};

const googleDiscovery: DiscoveryDocument = {
    authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
    tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AuthError | null>(null);

    const [googleRequest, googleResponse, googlePromptAsync] = useAuthRequest(googleConfig, googleDiscovery);

    const signIn = async () => {
        console.log(googleConfig);
        try {
            if (!googleRequest) {
                console.log("no request");
                return;
            }
            await googlePromptAsync();
        } catch (error) {
            console.error(error);
        }
    };

    const signOut = async () => {};

    const fetchWithAuth = async (url: string, options?: RequestInit) => {
        return fetch(url, {
            ...options,
            headers: {
                ...options?.headers,
            },
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                fetchWithAuth,
                isLoading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
