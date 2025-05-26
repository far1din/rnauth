import { Stack } from "expo-router";

import { AuthProvider } from "@/context/auth-context";

import "./globals.css";

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </AuthProvider>
    );
}
