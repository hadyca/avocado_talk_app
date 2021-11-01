import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { colors } from "../colors";

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const TitleImg = styled.ImageBackground``;

const Title = styled.Text`
  color: ${colors.black};
  font-weight: 500;
  margin: 0px auto;
  margin-top: 30px;
  font-size: 30px;
`;

const Content = styled.Text`
  font-weight: 500;
  margin: 0px auto;
  color: ${colors.homeText};
  font-size: 20px;
  margin-top: 5px;
`;

const Contents = styled.View``;

const SubTitle = styled.Text`
  color: ${colors.black};
  font-weight: 400;
  margin: 0px auto;
  margin-top: 30px;
  font-size: 25px;
`;

const SubContent = styled.Text`
  font-weight: 400;
  margin: 0px auto;
  color: ${colors.homeText};
  font-size: 20px;
  margin-top: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${colors.buttonBackground};
  padding: 15px 7px;
  border-radius: 3px;
  width: 50%;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function Home() {
  const { height } = useWindowDimensions();

  return (
    <ScreenLayout>
      <ScrollView
        style={{
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <TitleImg
            resizeMode="cover"
            style={{
              width: "100%",
              height: height * 0.75,
            }}
            source={{
              uri: "https://post-phinf.pstatic.net/MjAxOTAyMjFfMjYy/MDAxNTUwNzA4OTA3MTUz.HLf2PEUJP6Ig9AIhG_UEJdRAchrrlKE2qC54fLYWRdkg.RuVJkkbgoeu4NKNXwU8rCYXGCzMILXVBMxy0al3lyBMg.PNG/mug_obj_201902210928277808.png?type=w1080",
            }}
          >
            <Title></Title>
          </TitleImg>
          <Contents>
            <SubTitle>아보카도 소개</SubTitle>
            <SubContent>내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>제공 하는 서비스</SubTitle>
            <SubContent>내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>제공 하는 서비스</SubTitle>
            <SubContent>내용</SubContent>
          </Contents>
          <Contents>
            <SubTitle>Footer</SubTitle>
            <SubContent>내용</SubContent>
          </Contents>
        </Container>
      </ScrollView>
    </ScreenLayout>
  );
}
