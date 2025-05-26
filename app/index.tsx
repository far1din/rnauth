import { useAuth } from "@/context/auth-context";
import { ActivityIndicator, Text, View } from "react-native";

import LoginForm from "@/components/login-form";

export default function Index() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center px-4">
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className="text-center text-lg mt-2">Loading...</Text>
            </View>
        );
    }

    if (!user) {
        return <LoginForm />;
    }

    return (
        <View className="flex-1 items-center justify-center px-4">
            <Text className="text-3xl font-bold text-center text-blue-500">Welcome to{"\n"} rnauth! 👋</Text>

            <View className="mt-8">
                <Text className="bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-full text-center overflow-hidden">
                    Get Started
                </Text>
            </View>
        </View>
    );
}
