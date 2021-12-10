import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import * as S from "./styles";

export const SignUpSecondStep: React.FC = () => {
  const navigation = useNavigation();
  const theme = useTheme()

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />
            <S.Steps>
              <Bullet active />
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{`\n`}conta</S.Title>
          <S.SubTitle>
            Faça seu cadastro de{`\n`}forma rápida e fácil
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>
            <Input iconName="lock" placeholder="Senha" secureTextEntry />
            <Input iconName="lock" placeholder="Repetir senha" secureTextEntry />
          </S.Form>
          <Button title="Cadastrar" color={theme.colors.success} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
