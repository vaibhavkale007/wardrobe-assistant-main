import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { mpants, mshirts, pants, shoes, skirts, tops } from "../images";
import { Ionicons } from "@expo/vector-icons";

const AddOutfitScreen = () => {
  const route = useRoute();
  const { date, savedOutfits } = route?.params;
  const navigation = useNavigation();
  const popularClothes = [
    ...pants,
    ...mpants,
    ...shoes,
    ...tops,
    ...mshirts,
    ...skirts,
  ]
    .map((item, idx) => ({
      ...item,
      id: idx + 1,
    }))
    .filter((item) => item.image);
  const [selected, setSelected] = useState<number[]>([]);
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleNext = () => {
    const selectedItems = popularClothes.filter((item) =>
      selected.includes(item?.id)
    );
    navigation.navigate("DesignRoom", {
      selectedItems,
      date,
      savedOutfits,
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Add outfit</Text>
        <Text className="text-gray-500">{date}</Text>
      </View>

      <View className="flex-row justify-around mt-4 px-4">
        <TouchableOpacity className="bg-gray-100 w-[30%] py-3 rounded-lg items-center">
          <Ionicons name="camera-outline" size={22} color="black" />
          <Text className="font-medium mt-1">Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 w-[30%] py-3 rounded-lg items-center">
          <Ionicons name="sparkles-outline" size={22} color="black" />
          <Text className="font-medium mt-1">Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-100 w-[30%] py-3 rounded-lg items-center">
          <Ionicons name="shirt-outline" size={22} color="black" />
          <Text className="font-medium mt-1">Saved Outfits</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 mt-4">
        <Text className="text-lg font-semibold px-4 mt-4">Popular Clothes</Text>
        <View className="flex-row flex-wrap px-4 mt-2 mb-20">
          {popularClothes?.map((item) => (
            <TouchableOpacity
              onPress={() => toggleSelect(item?.id)}
              className="w-1/3 p-1 relative"
            >
              <Image
                className="w-full h-32 rounded-md"
                source={{ uri: item?.image }}
                resizeMode="contain"
              />
              <View className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 items-center justify-center">
                <Text className="text-xs">
                  {item.gender === "m" ? "♂" : item.gender === "f" ? "♀" : "⚪"}
                </Text>
              </View>
              <View
                className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 ${
                  selected.includes(item.id) ? "bg-black" : "border-gray-400"
                } items-center justify-center`}
              >
                {selected.includes(item?.id) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selected.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=""
          >
            {selected?.map((id) => {
              const item = popularClothes.find((c) => c.id === id);

              return (
                <Image
                  key={id}
                  source={{ uri: item?.image }}
                  className="w-16 h-16 mr-3 rounded-md"
                />
              );
            })}
          </ScrollView>
          <TouchableOpacity
            onPress={handleNext}
            className="bg-black py-3 rounded-lg mt-3 mb-3 items-center self-end w-24"
          >
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddOutfitScreen;

const styles = StyleSheet.create({});
