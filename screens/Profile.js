import React, { useEffect } from "react";
import { Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

export default function Profile({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  return (
    <ScreenLayout>
      <Text>프로필 화면</Text>
    </ScreenLayout>
  );
}
