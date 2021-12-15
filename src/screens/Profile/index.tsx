import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";

export const Profile: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {}

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              <S.Photo source={{ uri: "" }} />
              <S.PhotoButton onPress={() => {}}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option
                onPress={() => setOption("dataEdit")}
                active={option === "dataEdit"}
              >
                <S.OptionTitle active={option === "dataEdit"}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option
                onPress={() => setOption("passwordEdit")}
                active={option === "passwordEdit"}
              >
                <S.OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            {option === "dataEdit" ? (
              <S.Section>
                <Input
                  defaultValue={user.name}
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </S.Section>
            ) : (
              <S.Section>
                <Input
                  iconName="lock"
                  secureTextEntry
                  placeholder="Senha atual"
                  autoCorrect={false}
                />
                <Input
                  iconName="lock"
                  secureTextEntry
                  placeholder="Nova senha"
                  autoCorrect={false}
                />
                <Input
                  iconName="lock"
                  secureTextEntry
                  placeholder="Repetir senha"
                  autoCorrect={false}
                />
              </S.Section>
            )}
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
