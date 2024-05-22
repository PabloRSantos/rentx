import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import * as S from "./styles";
import * as Yup from 'yup'

export const SignUpFirstStep: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        name: Yup.string(). required('Nome é obrigatório')
      })

      const data = { name, email, driverLicense }
      await schema.validate(data)
      
      navigation.navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      }
    }
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
            <S.FormTitle>1. Dados</S.FormTitle>
            <Input iconName="user" placeholder="Nome" onChangeText={setName} value={name} />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </S.Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
