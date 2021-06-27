/* eslint-disable react-native/no-inline-styles */

import * as Svg from 'react-native-svg';

import {Text, View} from 'react-native';

import React, {useState, useEffect} from 'react';
import AnimatedPath from './AnimatedPath';
import PropTypes from 'prop-types';

export default function SamplePreview(props) {
  const {name, path1, path2, showNonAnimated} = props;

  const [path, setPath] = useState(path1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPath((_path) => (_path === path1 ? path2 : path1));
    }, 1000);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{textAlign: 'center'}}>{name}</Text>

      <Svg.Svg height={300} width={400}>
        <AnimatedPath
          path={path}
          strokeWidth={1}
          fill={'rgba(0, 187, 187, 0.2)'}
          stroke={'rgba(0, 187, 187, 1)'}
          duration={1000}
        />
      </Svg.Svg>

      {showNonAnimated && (
        <Svg.Svg height={300} width={400}>
          <Svg.Path
            d={path}
            strokeWidth={1}
            fill={'rgba(188, 179, 139, 0.2)'}
            stroke={'rgba(188, 179, 139, 1)'}
          />
        </Svg.Svg>
      )}
    </View>
  );
}

SamplePreview.propTypes = {
  path1: PropTypes.string.isRequired,
  path2: PropTypes.string.isRequired,

  showNonAnimated: PropTypes.bool,
};
