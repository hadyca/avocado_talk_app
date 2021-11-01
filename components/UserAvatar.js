import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;

export default function UserAvatar({ username, uri }) {
  return (
    <Container>
      {uri ? (
        <Avatar resizeMode="cover" source={{ uri: uri }} />
      ) : (
        <Avatar
          resizeMode="cover"
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
          }}
        />
      )}
      <Username>{username}</Username>
    </Container>
  );
}
