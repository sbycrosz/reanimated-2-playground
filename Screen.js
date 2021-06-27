/* eslint-disable react-native/no-inline-styles */

import {ScrollView} from 'react-native';

import React from 'react';

import * as PATHS from './SamplePaths';
import SamplePreview from './SamplePreview';

export default function AnimatedStyleUpdateExample(props) {
  return (
    <ScrollView>
      <SamplePreview
        path1={PATHS.AREA_BASIC_1}
        path2={PATHS.AREA_BASIC_LONGER}
      />
      <SamplePreview path1={PATHS.AREA_BASIC_1} path2={PATHS.AREA_BASIC_2} />
      <SamplePreview
        path1={PATHS.AREA_BASIC_1}
        path2={PATHS.AREA_BASIC_LONGER}
      />
    </ScrollView>
  );
}
