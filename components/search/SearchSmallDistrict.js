import React from "react";
import { View } from "react-native";
import { smallDistrict } from "../../districtList";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  margin-left: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  text-align: center;
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;
export default function SearchSmallDistrict({ districtCode }) {
  const navigation = useNavigation();
  const goToCompanyPostList = (name) => {
    navigation.navigate("CompanyPostList", {
      smallDistrictName: name,
    });
  };
  return (
    <View>
      {smallDistrict[districtCode].map((value, index) => (
        <Button key={index} onPress={() => goToCompanyPostList(value)}>
          <ButtonText key={index}>{value}</ButtonText>
          <Ionicons
            name="chevron-forward"
            color="black"
            size={17}
            style={{ marginRight: 35 }}
          />
        </Button>
      ))}
    </View>
  );
}
