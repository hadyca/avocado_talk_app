import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { useWindowDimensions, ScrollView, View, Text } from "react-native";

const Container = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Img = styled.Image``;

const DotView = styled.View`
  flex-direction: row;
  position: absolute;
  align-self: center;
  bottom: 0;
`;

const Dot = styled.Text`
  color: ${(props) => (props.active ? "white" : "#888")};
  margin: 3px;
  font-size: ${(props) => props.size / 40}px;
`;

export default function ImageSlider({ data }) {
  const [active, setActive] = useState(0);
  const { width } = useWindowDimensions();

  const height = Math.ceil(width * 0.6);

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <Container width={width} height={height}>
      <ScrollView
        horizontal
        scrollEventThrottle="16"
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {data?.seeUserPost?.file.map((item, index) => (
          <Img
            key={index}
            source={{ uri: item.fileUrl }}
            style={{ width, height, resizeMode: "cover" }}
          />
        ))}
      </ScrollView>
      <DotView>
        {data?.seeUserPost?.file.map((item, index) => (
          <Dot active={index === active} key={index} size={width}>
            ⬤
          </Dot>
        ))}
      </DotView>
    </Container>
  );
}
