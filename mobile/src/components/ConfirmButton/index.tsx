import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import * as S from './styles';

interface Props extends RectButtonProps {
  title: string
}

export const ConfirmButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

