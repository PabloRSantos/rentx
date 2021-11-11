import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import * as S from './styles';

interface Props extends RectButtonProps {
  title: string
  color?: string
  loading?: boolean
}

export const Button: React.FC<Props> = ({ title, color, loading, enabled = true, ...rest }) => {
  const theme = useTheme()
  return (
    <S.Container {...rest} color={color} enabled={enabled} style={{ opacity: (!enabled || loading) ? .5 : 1 }}>
      {loading ? <ActivityIndicator color={theme.colors.shape} /> : <S.Title>{title}</S.Title>}
    </S.Container>
  );
};

