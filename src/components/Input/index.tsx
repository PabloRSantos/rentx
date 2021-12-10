import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import * as S from "./styles";
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export const Input: React.FC<Props> = ({
  iconName,
  value,
  secureTextEntry,
  ...rest
}) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <S.Container >
      <S.IconContainer 
         isFocused={isFocused}
      >
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconContainer>

      <S.InputText
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        value={value}
        isFocused={isFocused}
      />

      {secureTextEntry && (
        <BorderlessButton onPress={handlePasswordVisibility}>
          <S.IconContainer isFocused={isFocused}>
            <Feather
              color={theme.colors.text_detail}
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
            />
          </S.IconContainer>
        </BorderlessButton>
      )}
    </S.Container>
  );
};
