import { useAuth } from "@/context/auth-context";
import { Pressable, Text, View } from "react-native";

export default function LoginForm() {
    const { signIn } = useAuth();

    return (
        <View className="flex-1 items-center justify-center px-4">
            <Text className="text-3xl font-bold text-center text-blue-500">Welcome to{"\n"} rnauth! 👋</Text>

            <View className="mt-8">
                <Pressable onPress={signIn} className="bg-red-500 px-7 py-2.5 rounded-full text-center overflow-hidden">
                    <Text className="text-white font-semibold text-center text-lg">Sign in with Google</Text>
                </Pressable>
            </View>
        </View>
    );
}
