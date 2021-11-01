import React from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";

const Container = styled.View``;

export default function CommentForm() {
  const { handleSubmit } = useForm();

  return (
    <Container>
      <Controller
        name="comment"
        rules={{
          required: "코멘트를 입력해주세요.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
            hasError={Boolean(formState.errors?.email?.message)}
            onFocus={() => {
              setFocus1(true);
            }}
            onBlur={() => {
              setFocus1(false);
            }}
            focus={focus1}
          />
        )}
      />
    </Container>
  );
}
