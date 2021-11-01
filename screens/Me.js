import React, { useEffect } from "react";
import { Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
  const { data } = useMe();

  useEffect(() => {
    if (data?.me?.username) {
      navigation.setOptions({
        title: data?.me?.username,
      });
    }
  }, [data]);

  return (
    <ScreenLayout>
      <Text>Me화면</Text>
    </ScreenLayout>
  );
}
