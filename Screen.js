/* eslint-disable react-native/no-inline-styles */

import * as Svg from 'react-native-svg';

import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Button, View} from 'react-native';

import React from 'react';
import {interpolatePath} from 'd3-interpolate-path';

const PATH1 = 'M0,300 L100,100 L200,200 L300,100 L400,140';
const PATH2 = 'M0,300 L100,150 L200,100 L300,200 L400,240';

const interpolator = interpolatePath(PATH1, PATH2);

const AnimatedSvgPath = Animated.createAnimatedComponent(Svg.Path);

export default function AnimatedStyleUpdateExample(props) {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    // I think this will be run on RN thread, not sure how to move it to UI thread
    const path = interpolator(progress.value);
    return {d: path};
  });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Svg.Svg style={{borderWidth: 1}} height={300} width={400}>
        <AnimatedSvgPath
          animatedProps={animatedProps}
          strokeWidth={1}
          stroke={'#000'}
        />
      </Svg.Svg>

      <Button
        title="toggle-animated"
        onPress={() => {
          progress.value = withTiming(progress.value ? 0 : 1, {
            duration: 1000,
            easing: Easing.inOut(Easing.cubic),
          });
        }}
      />
    </View>
  );
}
