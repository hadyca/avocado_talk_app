import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { ReactNativeFile } from "apollo-upload-client";
import DismissKeyboard from "../components/DismissKeyBoard";

const UPLOAD_USER_POST_MUTATION = gql`
  mutation uploadUserPost(
    $fileUrl: [Upload]
    $title: String!
    $content: String!
  ) {
    uploadUserPost(fileUrl: $fileUrl, title: $title, content: $content) {
      id
      user {
        username
        avatar
      }
      title
      content
      totalUserPostLikes
      createdAt
      isMine
      file {
        fileUrl
      }
    }
  }
`;

export default function UserPostUploadForm() {
  const navigation = useNavigation();

  const updateUploadUserPost = (cache, result) => {
    const {
      data: { uploadUserPost },
    } = result;
    if (uploadUserPost.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeAllUserPosts(prev) {
            return [uploadUserPost, ...prev];
          },
        },
      });
    }
    navigation.navigate("UserPostList");
  };

  const [uploadUserPostMutation, { loading }] = useMutation(
    UPLOAD_USER_POST_MUTATION,
    {
      update: updateUploadUserPost,
    }
  );

  const { control, handleSubmit } = useForm();

  const contentRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = ({ title, content }) => {
    const fileUrl = new ReactNativeFile({
      uri: "https://images.unsplash.com/photo-1632766984155-d42dd9affe85?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (!loading) {
      uploadUserPostMutation({
        variables: {
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
              value={value}
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
