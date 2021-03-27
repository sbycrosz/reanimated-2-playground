/* eslint-disable react-native/no-inline-styles */

import * as Svg from 'react-native-svg';

import {Button, View} from 'react-native';

import React, {useState} from 'react';
import AnimatedPath from './AnimatedPath';

export default function AnimatedStyleUpdateExample(props) {
  const PATH1 = 'M0,300 L100,100 L200,200 L300,100 L400,140';
  const PATH2 = 'M0,300 L100,150 L200,100 L300,200 L400,240';

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
