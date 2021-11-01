import React from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { logUserIn } from "../apollo";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";
import { Alert } from "react-native";
import { Subtitle } from "../components/auth/Subtitle";

const REQUEST_SECRET_MUTATION = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      ok
      error
    }
  }
`;

const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret) {
      ok
      error
      token
    }
  }
`;

export default function ConfirmSecret({ route: { params } }) {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(10);
  const [finish, setFinish] = useState(false);
  const [sendNum, setSendNum] = useState(0);
  const [waitingMail, setWaitingMail] = useState(true);
  const [focus1, setFocus1] = useState(false);

  const { handleSubmit, formState, control, setError, clearErrors } = useForm({
    mode: "onChange",
  });

  const onCompleted = async (data) => {
    const {
      confirmSecret: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      await logUserIn(token);
    }
  };

  const [requestSecretMutation, { loading }] = useMutation(
    REQUEST_SECRET_MUTATION
  );

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    onCompleted,
  });

  const onValid = (data) => {
    if (!loading) {
      confirmSecretMutation({
        variables: {
          email: params.email,
          secret: data.secret,
        },
      });
    }
  };

  const reSend = () => {
    if (waitingMail === true) {
      setTimeout(() => {
        setWaitingMail(true);
      }, 20000);
      setSendNum(sendNum + 1);
      setFinish(false);
      if (!loading) {
        requestSecretMutation({
          variables: {
            email: params.email,
          },
        });
        Alert.alert("이메일이 발송 되었습니다.");
        setWaitingMail(false);
      }
    } else {
      Alert.alert("20초가 지난 후에 재발송이 가능합니다.");
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          setFinish(true);
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const clearSecretError = () => {
    clearErrors("result");
    clearErrors("secret");
  };

  return (
    <AuthLayout>
      <Subtitle>Please check in your email 💌</Subtitle>
      <Controller
        name="secret"
        rules={{
          required: "인증번호를 입력해 주세요.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="인증번호"
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="done"
            onChange={clearSecretError}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
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
      <FormError message={formState.errors?.result?.message} />
      <FormError
        message={
          sendNum === 0
            ? finish === true
              ? "시간이 만료 되었습니다. 인증메일 다시 받기 버튼을 눌러주세요. (5회 제한)"
              : minutes === 0 && seconds <= 59
              ? `남은 시간 ${seconds}초`
              : minutes > 0
              ? `남은 시간 ${minutes}분 ${seconds}초`
              : null
            : null
        }
      />

      <FormError
        message={
          sendNum === 1
            ? "메일을 확인해 보세요! 메일 재발송 4회 남았습니다."
            : null
        }
      />
      <FormError
        message={
          sendNum === 2
            ? "메일을 확인해 보세요! 메일 재발송 3회 남았습니다."
            : null
        }
      />
      <FormError
        message={
          sendNum === 3
            ? "메일을 확인해 보세요! 메일 재발송 2회 남았습니다."
            : null
        }
      />
      <FormError
        message={
          sendNum === 4
            ? "메일을 확인해 보세요! 메일 재발송 1회 남았습니다."
            : null
        }
      />
      <FormError
        message={sendNum === 5 ? "메일 재발송 5회를 넘길 수 없습니다." : null}
      />
      <AuthButton
        text="인증번호 확인"
        disabled={finish}
        onPress={handleSubmit(onValid)}
        loading={false}
      />
      <AuthButton
        text="인증메일 다시 받기"
        disabled={sendNum === 5}
        onPress={reSend}
        loading={false}
        lastOne={true}
      />
    </AuthLayout>
  );
}
