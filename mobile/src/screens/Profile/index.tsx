import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useAuth } from "../../hooks/auth";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../components/Button";
import * as Yup from "yup";
import { useNetInfo } from "@react-native-community/netinfo";

export const Profile: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo()
  const { user, signOut, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  function handleBack() {
    navigation.goBack();
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é OBrigatório"),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        ...user,
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert("Perfil atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      }

      Alert.alert("Não foi possivel atualizar o perfil");
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair, irá precisar de internet para conectar-se novamente",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    if(netInfo.isConnected === false && option === 'passwordEdit') {
      return Alert.alert('Você está Offline', 'Para mudar a senha, conecte-se a Internet')
    }

    setOption(option)
  }

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
              {!!avatar && <S.Photo source={{ uri: avatar }} />}
              <S.PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <S.Options>
              <S.Option
                onPress={() => handleOptionChange("dataEdit")}
                active={option === "dataEdit"}
              >
                <S.OptionTitle active={option === "dataEdit"}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option
                onPress={() => handleOptionChange("passwordEdit")}
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
                  onChangeText={setName}
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  onChangeText={setEmail}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  onChangeText={setDriverLicense}
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
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
