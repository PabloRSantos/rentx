import React from 'react';
import * as S from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props extends BorderlessButtonProps {
  color?: string
}

export const BackButton: React.FC<Props> = ({ color, ...rest }) => {
  const theme = useTheme()

  return (
    <S.Container {...rest}>
        <MaterialIcons name="chevron-left" size={24} color={color || theme.colors.text} />
    </S.Container>
  );
};

