import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

import * as Svg from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import interpolatePath from './interpolatePath';

const AnimatedSvgPath = Animated.createAnimatedComponent(Svg.Path);

export default function AnimatedPath({path, ...svgPathProps}) {
  const previousPath = useRef();
  const interpolator = useRef();
  const progress = useSharedValue(0);

  useEffect(() => {
    // TODO: Handle animating to/from null-ish path

    if (!previousPath.current) {
      // TODO: Handle initial animation
      previousPath.current = 'M0,300 M0,300 M0,300 M0,300 M0,300';
    }

    console.log('animating\n', previousPath.current, '\n', path);

    interpolator.current = interpolatePath(previousPath.current, path);

    progress.value = 1;
    progress.value = withTiming(0, {
      duration: 1000, // Move this to prop
      easing: Easing.inOut(Easing.cubic),
    });

    previousPath.current = path;
  }, [path, progress]);

  const animatedProps = useAnimatedProps(() => {
    const animatedPath = interpolator.current?.(progress.value);
    return {d: animatedPath};
  });

  return <AnimatedSvgPath animatedProps={animatedProps} {...svgPathProps} />;
}

AnimatedPath.propTypes = {};
