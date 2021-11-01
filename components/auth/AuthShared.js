import styled from "styled-components/native";
import { colors } from "../../colors";

export const TextInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? colors.error
        : props.focus
        ? colors.focus
        : colors.borderThick};
  margin-bottom: ${(props) => (props.lastOne ? 25 : 8)}px;
`;
