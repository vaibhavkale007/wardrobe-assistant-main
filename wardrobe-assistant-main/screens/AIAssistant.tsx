import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AIAssistant = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you with your outfit today? 😊",
      sender: "ai",
    },
  ]);
  const suggestions = [
    "Suggest a casual outfit for a coffee date ☕",
    "Recommend a formal look for an interview 👔",
    "Best party outfit for tonight 🎉",
    "Summer dress ideas for a beach trip 🌴",
  ];
 

  const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";
  // Expo public env var name; if not set, we'll fall back to a local response
  // On web, process.env.EXPO_PUBLIC_* values are inlined at build time
  const OPENAI_API_KEY = (process as any)?.env?.EXPO_PUBLIC_OPENAI_API_KEY || "";

  const getLocalFashionResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("casual") || lowerQuery.includes("coffee")) {
      return "For a casual coffee date ☕: Try a white linen shirt with dark jeans and loafers. Add a light cardigan and minimal jewelry for a relaxed yet put-together look! 😎";
    }
    if (lowerQuery.includes("formal") || lowerQuery.includes("interview")) {
      return "For a formal interview 👔: Go with a navy blazer, white button-down shirt, and tailored trousers. Add polished dress shoes and a leather briefcase for a professional appearance! 💼";
    }
    if (lowerQuery.includes("party") || lowerQuery.includes("night")) {
      return "For a party night 🎉: Try a little black dress with statement heels and a clutch. Add bold earrings and a red lip for a glamorous evening look! ✨";
    }
    if (lowerQuery.includes("beach") || lowerQuery.includes("summer")) {
      return "For a beach day 🏖️: Wear a flowy sundress in a bright color, sandals, and a wide-brimmed hat. Don't forget sunscreen and a cute beach bag! 🌴";
    }
    if (lowerQuery.includes("date") || lowerQuery.includes("dinner")) {
      return "For a dinner date 🍽️: Choose a midi dress in a solid color with elegant heels. Add a delicate necklace and a small handbag for a sophisticated look! 💕";
    }
    
    return "Here's a versatile outfit idea 💡: Start with a classic white tee, add high-waisted jeans, white sneakers, and a denim jacket. Accessorize with a crossbody bag and simple jewelry for a timeless look! ✨";
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { id: Date.now(), text: query, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      if (!OPENAI_API_KEY) {
        // No key configured: use local fashion responses
        const aiResponse = getLocalFashionResponse(query);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: aiResponse, sender: "ai" },
        ]);
        return;
      }
      
      const response = await fetch(OPEN_AI_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a fashion assistant. Provide outfit suggestions with emojis and include links to relevant products or places where applicable.",
            },
            { role: "user", content: query },
          ],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      if (
        !data.choices ||
        !data.choices[0] ||
        !data.choices[0].message ||
        !data.choices[0].message.content
      ) {
        throw new Error("Invalid response from OPENAI");
      }

      const aiResponse = data.choices[0].message.content;

      const enhancedResponse = aiResponse
        .replace("dress", "dress 👗")
        .replace("suit", "suit 🕴️")
        .replace("casual", "casual 😎")
        .replace("party", "party 🎉")
        .replace("http", " [Link](")
        .replace(" ", ") ");

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: enhancedResponse, sender: "ai" },
      ]);
    } catch (error) {
      console.log("Open ai error", error);
      // Fallback to local response on any error
      const aiResponse = getLocalFashionResponse(query);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: aiResponse, sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    handleSend();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">
          AI Fashion Assistant
        </Text>
        <View className="w-6" />
      </View>
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages?.map((message) => (
          <View
            key={message.id}
            className={`mb-4 p-3 rounded-lg max-w-[80%] ${
              message.sender == "user"
                ? "bg-cyan-200 self-end"
                : "bg-cyan-100 self-start"
            }`}
          >
            <Text className="text-base text-gray-800">{message.text}</Text>
            {message.sender === "ai" &&
              message.text.includes("[Link]") &&
              message.text
                .split("[Link](")
                .slice(1)
                .map((part, index) => {
                  const [url, rest] = part.split(") ");
                  if (url) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(url)}
                        className="mt-2"
                      >
                        <Text className="text-blue-600 text-sm">
                          🌐 Visit {url}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                  return null;
                })}
          </View>
        ))}

        {isLoading && (
          <View className="flex items-center mt-4">
            <ActivityIndicator size={"large"} color="#1e90ff" />
            <Text className="text-gray-600 mt-2">Fetching Suggestions</Text>
          </View>
        )}
      </ScrollView>

      <View className="p-4 bg-white border-t border-gray-200">
        <Text className="text-lg font-bold text-gray-800 mb-2">
          Quick Suggestions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestions?.map((sugg, index) => (
            <TouchableOpacity
              onPress={() => handleSuggestion(sugg)}
              key={index}
              className="bg-gray-200 px-4 py-2 rounded-full mr-2"
            >
              <Text>{sugg}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="flex-row items-center p-4 bg-white border-t border-gray-200">
        <TextInput
          className="flex-1 h-10 bg-gray-100 rounded-full px-4 text-base text-gray-800"
          value={query}
          onChangeText={setQuery}
          placeholder="Ask me anything about fashion..."
          placeholderTextColor={"#999"}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading}
          className={`ml-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center`}
        >
          <Ionicons name="send" size={20} color={isLoading ? "#ccc" : "#fff"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AIAssistant;

const styles = StyleSheet.create({});
