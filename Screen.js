/* eslint-disable react-native/no-inline-styles */

import * as Svg from 'react-native-svg';

import {Button, View} from 'react-native';

import React, {useState} from 'react';
import AnimatedPath from './AnimatedPath';

import {
  PATH_BASIC_1,
  PATH_BASIC_2,
  AREA_BASIC_1,
  AREA_BASIC_2,
  PATH_1M,
  PATH_3M,
  AREA_1M,
  AREA_3M,
} from './SamplePaths';

export default function AnimatedStyleUpdateExample(props) {
  const PATH1 = PATH_BASIC_1;
  const PATH2 = PATH_BASIC_2;

  const [path, setPath] = useState(PATH1);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Svg.Svg style={{borderWidth: 1}} height={300} width={400}>
        <AnimatedPath path={path} strokeWidth={1} stroke={'#000'} />
      </Svg.Svg>

      <Svg.Svg style={{borderWidth: 1}} height={300} width={400}>
        <Svg.Path d={path} strokeWidth={1} stroke={'#000'} />
      </Svg.Svg>

      <Button
        title="toggle-path"
        onPress={() => {
          setPath(path === PATH1 ? PATH2 : PATH1);
        }}
      />
    </View>
  );
}
//
