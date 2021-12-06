import React from 'react';
import * as S from './styles';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { Button, Dimensions, StyleSheet } from 'react-native';

const WIDTH = Dimensions.get('window').width

export const Splash: React.FC = () => {
  const animation = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(animation.value, { duration: 500, easing: Easing.ease }) }
    ]
  }))

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100)
  }

  return (
    <S.Container>
      <Animated.View style={[styles.box, animatedStyles]} />
        <Button title="Mover" onPress={handleAnimationPosition} />
    </S.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
})
