import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View``;

const Row = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const Contents = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px;
`;

const WorkLogo = styled.Image`
  height: 80px;
  width: 50px;
`;

export default function SearchConditionIndustry() {
  const navigation = useNavigation();

  const sendData = (name) => {
    navigation.navigate("CompanyPostList", {
      sectorName: name,
    });
  };

  return (
    <Container>
      <Row>
        <Contents onPress={() => sendData("서비스")}>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>서비스</Text>
        </Contents>
        <Contents onPress={() => sendData("공장/제조")}>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>공장/제조</Text>
        </Contents>
        <Contents onPress={() => sendData("배달")}>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>배달</Text>
        </Contents>
      </Row>
      <Row>
        <Contents>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>서비스업</Text>
        </Contents>
        <Contents>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>서비스업</Text>
        </Contents>
        <Contents>
          <WorkLogo
            source={require("../assets/coffee.png")}
            resizeMode="contain"
          />
          <Text>서비스업</Text>
        </Contents>
      </Row>
    </Container>
  );
}
