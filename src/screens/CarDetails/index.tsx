import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import * as S from './styles';

export const CarDetails: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

    <S.CarImages>
        <ImageSlider imagesUrl={['https://pngimg.com/uploads/audi/audi_PNG99491.png']} />
    </S.CarImages>

    </S.Container>
  );
};

