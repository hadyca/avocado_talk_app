import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import FormError from "../components/auth/FormError";
import { Subtitle } from "../components/auth/Subtitle";
import { TextInput } from "../components/auth/AuthShared";
import { useState } from "react";
import { emailRule, passwordRule, usernameRule } from "../regExp";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { email } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      return navigation.reset({
        routes: [{ name: "ConfirmSecret", params: { email } }],
      });
    }
  };

  // **개발용 화면 넘어가기
  // return navigation.navigate("ConfirmSecret", {
  //   email,
  // });

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [focus4, setFocus4] = useState(false);

  return (
    <AuthLayout>
      <Subtitle>Welcome to Avocado Talk! 🙌</Subtitle>

      {/* email form */}
      <Controller
        name="email"
        rules={{
          required: "이메일은 필수 항목 입니다.",
          pattern: emailRule,
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
            hasError={Boolean(formState?.errors?.email)}
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

      {/* {username form} */}
      <Controller
        name="username"
        rules={{
          required: "사용자 이름은 필수 항목 입니다.",
          pattern: {
            value: usernameRule,
            message: "숫자와 영문만 사용 가능하며, 20자를 넘을 수 없습니다.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={usernameRef}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            hasError={Boolean(formState?.errors?.username?.message)}
            onChange={clearLoginError}
            onFocus={() => {
              setFocus2(true);
            }}
            onBlur={() => {
              setFocus2(false);
            }}
            focus={focus2}
          />
        )}
      />
      <FormError message={formState?.errors?.username?.message} />

      {/* password form */}
      <Controller
        name="password"
        rules={{
          required: "비밀번호는 필수 항목 입니다.",
          pattern: {
            value: passwordRule,
            message:
              "숫자, 영문, 특수문자 각 1자리 이상이면서 최소 8자리를 넣어주세요.",
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={() => onNext(password2Ref)}
            hasError={Boolean(formState?.errors?.password?.message)}
            onFocus={() => {
              setFocus3(true);
            }}
            onBlur={() => {
              setFocus3(false);
            }}
            focus={focus3}
          />
        )}
      />
      <FormError message={formState?.errors?.password?.message} />

      {/* password2 form */}
      <Controller
        name="password2"
        rules={{
          required: "비밀번호는 필수 항목 입니다.",
          validate: {
            checkAgain: () => {
              const { password, password2 } = getValues();
              return password === password2 || "비밀번호 불일치";
            },
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={password2Ref}
            placeholder="Password 재 입력"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={handleSubmit(onValid)}
            hasError={Boolean(formState?.errors?.password2?.message)}
            onFocus={() => {
              setFocus4(true);
            }}
            onBlur={() => {
              setFocus4(false);
            }}
            focus={focus4}
          />
        )}
      />
      <FormError message={formState?.errors?.password2?.message} />

      <AuthButton
        text="다음"
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
      <FormError message={formState?.errors?.result?.message} />
    </AuthLayout>
  );
}
