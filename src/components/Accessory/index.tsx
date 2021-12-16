import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import * as S from './styles';

interface Props {
  name: string
  icon: React.FC<SvgProps>
}

export const Accessory: React.FC<Props> = ({ icon: Icon, name }) => {
  const theme = useTheme()

  return (
    <S.Container>
      <Icon fill={theme.colors.header} width={32} height={32} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
};
