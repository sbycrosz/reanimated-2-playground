import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

import * as Svg from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const AnimatedSvgPath = Animated.createAnimatedComponent(Svg.Path);

function interpolatePath(path1, path2) {
  'worklet';

  // 0 - 1
  return (t) => {
    'worklet';

    return `M0,300 L100,${150 - 50 * t} L200,${100 + 100 * t} L300,${
      200 - 100 * t
    } L400,${240 - 100 * t}L400,300Z`;
  };
}

export default function AnimatedPath({path, ...svgPathProps}) {
  const previousPath = useRef(path);
  const interpolator = useRef();
  const progress = useSharedValue(0);

  useEffect(() => {
    // TODO: Animate initial path. from a straight line?
    if (previousPath.current === path) {
      return;
    }

    interpolator.current = interpolatePath(previousPath.current, path);

    progress.value = withTiming(progress.value ? 0 : 1, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [path]);

  const animatedProps = useAnimatedProps(() => {
    const animatedPath = interpolator.current?.(progress.value);
    return {d: animatedPath};
  });

  return <AnimatedSvgPath animatedProps={animatedProps} {...svgPathProps} />;
}

AnimatedPath.propTypes = {};
