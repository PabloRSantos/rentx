import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import * as S from "./styles";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export const SignIn: React.FC = () => {
  const theme = useTheme();
  const { signIn } = useAuth()
  const navigation = useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });
      
      await signIn({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }

      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, verifique as credenciais"
      );
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <S.Header>
            <S.Title>Estamos{`\n`}quase lá.</S.Title>
            <S.SubTitle>
              Faça seu login para começar{`\n`}uma experiência incrível.
            </S.SubTitle>
          </S.Header>

          <S.Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
