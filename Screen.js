/* eslint-disable react-native/no-inline-styles */

import * as Svg from 'react-native-svg';

import {Button, View} from 'react-native';

import React, {useState} from 'react';
import AnimatedPath from './AnimatedPath';

import * as PATHS from './SamplePaths';

export default function AnimatedStyleUpdateExample(props) {
  const PATH1 = PATHS.AREA_BASIC_1;
  const PATH2 = PATHS.AREA_BASIC_LONGER;
  // const PATH1 = AREA_1M;
  // const PATH2 = AREA_3M;

  const [path, setPath] = useState(PATH1);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Svg.Svg style={{borderWidth: 1}} height={300} width={400}>
        <AnimatedPath path={path} strokeWidth={1} fill="red" stroke={'#000'} />
      </Svg.Svg>

      <Svg.Svg style={{borderWidth: 1}} height={300} width={400}>
        <Svg.Path d={path} strokeWidth={1} fill="red" stroke={'#000'} />
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
