import React, { useRef } from "react";
import { View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import DismissKeyboard from "../components/DismissKeyBoard";

const EDIT_USERPOST_MUTATION = gql`
  mutation editUserPost(
    $userPostId: Int!
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    editUserPost(
      userPostId: $userPostId
      fileUrl: $fileUrl
      title: $title
      content: $content
    ) {
      ok
      error
    }
  }
`;

export default function EditUserPostForm({ route: { params } }) {
  const navigation = useNavigation();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: params.title,
      content: params.content,
    },
  });
  const updateEditUserPost = (cache, result) => {
    const { title, content } = getValues();
    const {
      data: {
        editUserPost: { ok },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          title() {
            return title;
          },
          content() {
            return content;
          },
        },
      });
    }
    navigation.navigate("UserPostList");
  };

  const [editUserPostMutation, { loading }] = useMutation(
    EDIT_USERPOST_MUTATION,
    {
      update: updateEditUserPost,
    }
  );

  const contentRef = useRef();

  const onValid = ({ title, content }) => {
    let fileUrl = null;
    // const fileUrl = new ReactNativeFile({
    //   uri: "https://images.unsplash.com/photo-1632766984155-d42dd9affe85?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    //   name: `1.jpg`,
    //   type: "image/jpeg",
    // });
    if (!loading) {
      editUserPostMutation({
        variables: {
          userPostId: parseInt(params.id),
          fileUrl,
          title,
          content,
        },
      });
    }
  };

  return (
    <DismissKeyboard>
      <View>
        <Controller
          name="title"
          rules={{
            required: "title is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Title"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => onNext(contentRef)}
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
        <Controller
          name="content"
          rules={{
            required: "content is required",
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              ref={contentRef}
              multiline={true}
              numberOfLines={4}
              placeholder="Content"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
            />
          )}
        />
        <AuthButton
          text="완료"
          loading={loading}
          onPress={handleSubmit(onValid)}
        />
      </View>
    </DismissKeyboard>
  );
}
