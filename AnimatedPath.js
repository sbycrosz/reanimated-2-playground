import PropTypes from 'prop-types';
import React, {useRef, useEffect, useMemo} from 'react';

import * as Svg from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import interpolatePath from './interpolatePath/interpolatePath';

const AnimatedSvgPath = Animated.createAnimatedComponent(Svg.Path);

export default function AnimatedPath({path, ...svgPathProps}) {
  const previousPath = useRef();
  const progress = useSharedValue(0);

  const interpolator = useMemo(() => {
    // TODO: Handle animating to/from null-ish path

    if (!previousPath.current) {
      // TODO: Handle initial animation
      // Copy initial path but set the y to max-y ???
      previousPath.current = '';
    }

    let _interpolator = interpolatePath(previousPath.current, path);

    previousPath.current = path;

    return _interpolator;
  }, [path]);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      // Move these to props
      easing: Easing.inOut(Easing.cubic),
      duration: 400,
      delay: 100,
    });
  }, [path, progress]);

  const animatedProps = useAnimatedProps(() => {
    const animatedPath = interpolator(progress.value);
    return {d: animatedPath};
  });

  return <AnimatedSvgPath animatedProps={animatedProps} {...svgPathProps} />;
}

AnimatedPath.propTypes = {};
