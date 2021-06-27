/* eslint-disable react-native/no-inline-styles */

import {ScrollView} from 'react-native';

import React from 'react';

import SamplePreview from './SamplePreview';
import Samples from './Samples';

export default function AnimatedStyleUpdateExample(props) {
  return (
    <ScrollView style={{paddingTop: 100}}>
      {Samples.map((sample) => {
        return (
          <SamplePreview
            key={sample.name}
            name={sample.name}
            filled={sample.className === 'filled'}
            path1={sample.a}
            path2={sample.b}
            interpolatePathArgs={{excludeSegment: sample.excludeSegment}}
          />
        );
      })}
    </ScrollView>
  );
}
