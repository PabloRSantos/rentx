import React from 'react';
import * as S from './styles';

interface Props {
  active?: boolean
}

export const Bullet: React.FC<Props> = ({ active = false }) => {
  return (
    <S.Container active={active} />
  );
};

