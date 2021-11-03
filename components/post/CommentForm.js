import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../colors";
import AuthButton from "../auth/AuthButton";

const CREATE_COMMENT_MUTATION = gql`
  mutation createUserPostComment($userPostId: Int!, $payload: String!) {
    createUserPostComment(userPostId: $userPostId, payload: $payload) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  border-top-width: 1px;
  border-top-color: red;
  border-style: solid;
`;

const TextInput = styled.TextInput`
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid ${colors.borderThick};
`;

export default function CommentForm({ userPostId }) {
  const { handleSubmit, control, reset } = useForm();

  const updateComment = (cache, result) => {
    const {
      data: { createUserPostComment },
    } = result;
    console.log(createUserPostComment.ok);
    if (createUserPostComment.ok) {
      const UserPostId = `UserPost:${userPostId}`;
      cache.modify({
        id: UserPostId,
        fields: {
          userPostComments(prev) {
            return [createUserPostComment, ...prev];
          },
        },
      });
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: updateComment,
    }
  );

  const onValid = ({ payload }) => {
    if (!loading) {
      createCommentMutation({
        variables: {
          userPostId,
          payload,
        },
      });
      reset();
    }
  };

  return (
    <Container>
      <Controller
        name="payload"
        rules={{
          required: "코멘트를 입력해주세요.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Please Write Comment"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
          />
        )}
      />
      <AuthButton
        text="send"
        // loading={loading}
        // disabled={!watch("email") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </Container>
  );
}
