import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";

const SPostFormButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props) => props.bottom / 20}px;
  right: ${(props) => props.right / 15}px;
`;
const ButtonImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export default function PostFormButton({ onPress }) {
  const { width, height } = useWindowDimensions();
  return (
    <SPostFormButton onPress={onPress} bottom={height} right={width}>
      <ButtonImage
        resizeMode="contain"
        source={require("../../assets/pen.png")}
      />
    </SPostFormButton>
  );
}
