import React from "react";
import { Text } from "react-native";
import ScreenLayout from "../components/ScreenLayout";

export default function CompanyPostList({ route }) {
  return (
    <ScreenLayout>
      {route?.params?.smallDistrictName ? (
        <Text>{`${route?.params?.smallDistrictName} 지역 모든 채용 글 리스트`}</Text>
      ) : route?.params?.sectorName ? (
        <Text>{`${route?.params?.sectorName} 업종 모든 채용 글 리스트`}</Text>
      ) : null}
    </ScreenLayout>
  );
}
