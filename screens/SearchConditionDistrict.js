import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SearchSmallDistrict from "../components/search/SearchSmallDistrict";
import { bigDistrict } from "../districtList";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.backgraound};
`;

const FirstScrollView = styled.ScrollView`
  flex: 0.3;
`;

const SecondScrollView = styled.ScrollView`
  flex: 0.7;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.focus ? colors.backgraound : colors.greyBackround};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.focus ? colors.black : colors.greyText)};
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  padding: 15px 2px 15px 2px;
`;

export default function SearchConditionDistrict() {
  const [districtCode, setDistrictCode] = useState(0);

  const changeDistrictCode = (index) => {
    setDistrictCode(index);
  };

  return (
    <Container>
      <FirstScrollView showsVerticalScrollIndicator={false}>
        {bigDistrict.map((value, index) => (
          <Button
            focus={districtCode === index ? true : false}
            onPress={() => changeDistrictCode(index)}
            key={index}
          >
            <ButtonText focus={districtCode === index ? true : false}>
              {value}
            </ButtonText>
          </Button>
        ))}
      </FirstScrollView>
      <SecondScrollView showsVerticalScrollIndicator={false}>
        <SearchSmallDistrict districtCode={districtCode} />
      </SecondScrollView>
    </Container>
  );
}
