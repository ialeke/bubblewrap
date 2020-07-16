/*
 * Copyright 2020 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {GradleWrapper} from '../../lib/GradleWrapper';
import {Config} from '../../lib/Config';
import {JdkHelper} from '../../lib/jdk/JdkHelper';
import {AndroidSdkTools} from '../../lib/androidSdk/AndroidSdkTools';
import * as util from '../../lib/util';
import * as fs from 'fs';

describe('GradleWrapper', () => {
  let gradleWrapper: GradleWrapper;

  beforeEach(() => {
    spyOn(fs, 'existsSync').and.returnValue(true);
    const config = new Config('/home/user/jdk8', '/home/user/sdktools');
    const process = {
      platform: 'linux',
      env: {
        'PATH': '',
      },
      cwd: () => '/path/to/twa-project/'
    } as unknown as NodeJS.Process;
    const jdkHelper = new JdkHelper(process, config);
    const androidSdkTools = new AndroidSdkTools(process, config, jdkHelper);
    gradleWrapper = new GradleWrapper(process, androidSdkTools);
  });

  describe('#bundleRelease', () => {
    it('Calls "gradle bundleRelease --stacktracke"', async () => {
      spyOn(util, 'executeFile').and.stub();
      await gradleWrapper.bundleRelease();
      expect(util.executeFile).toHaveBeenCalled();
    });
  });

  describe('#assembleRelease', async () => {
    it('Calls "gradle assembleRelease --stacktrace"', async () => {
      spyOn(util, 'executeFile').and.stub();
      await gradleWrapper.assembleRelease();
      expect(util.executeFile).toHaveBeenCalled();
    });
  });
});
