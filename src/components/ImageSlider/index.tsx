import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";
import * as S from "./styles";

interface Props {
  imagesUrl: { id: string; photo: string }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!);
  });

  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={item.id} active={index === imageIndex} />
        ))}
      </S.ImageIndexes>

      <FlatList
        data={imagesUrl}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(key) => key.id}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </S.CarImageWrapper>
        )}
      />
    </S.Container>
  );
};
