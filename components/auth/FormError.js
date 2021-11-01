import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";

const SFormError = styled.Text`
  color: ${colors.error}
  font-weight: 600;
  font-size: 12px;
  margin: 3px 0px 15px 0px;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
