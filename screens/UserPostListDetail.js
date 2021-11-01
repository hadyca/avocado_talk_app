import React, { useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import ImageSlider from "../components/post/ImageSlider";
import UserAvatar from "../components/UserAvatar";
import { Ionicons } from "@expo/vector-icons";
import Separator from "../components/Separator";
import { colors } from "../colors";
import ActionSheet from "react-native-actionsheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const POST_DETAIL_QUERY = gql`
  query seeUserPost($userPostId: Int!) {
    seeUserPost(userPostId: $userPostId) {
      id
      user {
        username
        avatar
      }
      title
      content
      file {
        fileUrl
      }
      userPostComments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
        deleted
      }
      isMine
      isLiked
      totalUserPostLikes
    }
  }
`;

const TOGGLE_USERPOST_LIKE_MUTATION = gql`
  mutation toggleUserPostLike($userPostId: Int!) {
    toggleUserPostLike(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  margin: 10px;
`;
const Header = styled.View``;

const Contents = styled.View``;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 900;
`;
const Content = styled.Text`
  margin-top: 10px;
  font-size: 14px;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Comments = styled.View`
  margin-top: 10px;
`;
const Comment = styled.View`
  margin-top: 2px;
  margin-left: 35px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentPayLoad = styled.Text`
  font-size: 14px;
`;

const IconView = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const CommentContainer = styled.View`
  margin-bottom: 20px;
`;
const NoCommentView = styled.View``;

const NoComment = styled.Text`
  margin: auto;
  font-size: 14px;
  color: ${colors.greyText};
`;

const CommentInput = styled.TextInput`
  position: absolute;
  top: 500px;
  width: 80%;
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  border: 1px solid red;
`;

export default function UserPostListDetail({ route: { params } }) {
  const { data, loading, fetchMore } = useQuery(POST_DETAIL_QUERY, {
    variables: {
      userPostId: parseInt(params.id),
    },
  });

  let actionsheet = useRef();
  let optionArray = ["Edit", "Delete", "Cancel"];

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleUserPostLike: { ok },
      },
    } = result;

    if (ok) {
      const UserPostId = `UserPost:${params.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          totalUserPostLikes(prev) {
            if (data.seeUserPost.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleUserPostLike, { loading: likeLoading }] = useMutation(
    TOGGLE_USERPOST_LIKE_MUTATION,
    {
      variables: {
        userPostId: parseInt(params.id),
      },
      update: updateToggleLike,
    }
  );

  const showActionSheet = () => {
    actionsheet.current.show();
  };

  const goToEditForm = () => {
    navigation.navigate("EditUserPostForm", {
      id,
      title,
      content,
      file,
    });
  };

  const handleIndex = (index) => {
    if (index === 0) {
      Alert.alert("Edit", "Do you want edit comment?", [
        { text: "Cancel" },
        { text: "Ok", onPress: () => goToEditForm() },
      ]);
    } else if (index === 1) {
      Alert.alert("Delete", "Do you want delete comment?", [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: () => goToDeletePost(),
        },
      ]);
    } else {
      return;
    }
  };

  return (
    <ScreenLayout loading={loading}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <CommentInput />
        </KeyboardAvoidingView>
        {data?.seeUserPost?.file.length !== 0 ? (
          <ImageSlider data={data} />
        ) : null}
        <Container>
          <Header>
            <UserAvatar username={params.username} uri={params.avatar} />
          </Header>
          <Separator />
          <Contents>
            <Title>{data?.seeUserPost?.title}</Title>
            <Content>{data?.seeUserPost?.content}</Content>
          </Contents>
          <Actions>
            {likeLoading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Action onPress={toggleUserPostLike}>
                <Ionicons
                  name={data?.seeUserPost?.isLiked ? "heart" : "heart-outline"}
                  color={data?.seeUserPost?.isLiked ? "tomato" : "black"}
                  size={22}
                />
              </Action>
            )}
          </Actions>
          <Separator />
          <Comments>
            {data?.seeUserPost?.userPostComments[0] ? (
              data.seeUserPost.userPostComments.map((item, index) => {
                return (
                  <CommentContainer key={index}>
                    <UserAvatar
                      username={item.user.username}
                      uri={item.user.avatar}
                    />
                    <Comment key={index}>
                      <CommentPayLoad>{item.payload}</CommentPayLoad>
                      {item.isMine ? (
                        <IconView onPress={showActionSheet}>
                          <Ionicons
                            name="ellipsis-vertical"
                            color="grey"
                            size={14}
                          />
                        </IconView>
                      ) : null}
                    </Comment>
                  </CommentContainer>
                );
              })
            ) : (
              <NoCommentView>
                <NoComment>
                  There is no comment. Please write a comment.
                </NoComment>
              </NoCommentView>
            )}
          </Comments>
        </Container>
        <ActionSheet
          ref={actionsheet}
          options={optionArray}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => handleIndex(index)}
        />
      </KeyboardAwareScrollView>
    </ScreenLayout>
  );
}
