/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
'use strict';

import {
  Dimensions,
  I18nManager,
  PixelRatio,
} from 'react-native';

var buildStyleInterpolator = require('./buildStyleInterpolator');

var IS_RTL = I18nManager.isRTL;

var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var PIXEL_RATIO = PixelRatio.get();

function ToTheLeftIOS(width, height) {
  return {
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: -width * 0.3, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    opacity: {
      value: 1.0,
      type: 'constant',
    },
  }
};

function ToTheRightIOS(width, height) {
  return {
    ...ToTheLeftIOS(width, height),
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: width * 0.3, y: 0, z: 0},
    },
  }
};

function FadeToTheLeft(width, height) {
  return {
    // Rotate *requires* you to break out each individual component of
    // rotation (x, y, z, w)
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: -Math.round(width * 0.3), y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    // Uncomment to try rotation:
    // Quick guide to reasoning about rotations:
    // http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-17-quaternions/#Quaternions
    // transformRotateRadians: {
    //   from: {x: 0, y: 0, z: 0, w: 1},
    //   to: {x: 0, y: 0, z: -0.47, w: 0.87},
    //   min: 0,
    //   max: 1,
    //   type: 'linear',
    //   extrapolate: true
    // },
    transformScale: {
      from: {x: 1, y: 1, z: 1},
      to: {x: 0.95, y: 0.95, z: 1},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
    opacity: {
      from: 1,
      to: 0.3,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: false,
      round: 100,
    },
    translateX: {
      from: 0,
      to: -Math.round(width * 0.3),
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    scaleX: {
      from: 1,
      to: 0.95,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
    scaleY: {
      from: 1,
      to: 0.95,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
  }
};

function FadeToTheRight(width, height) {
  return {
    ...FadeToTheLeft(width, height),
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: Math.round(width * 0.3), y: 0, z: 0},
    },
    translateX: {
      from: 0,
      to: Math.round(width * 0.3),
    },
  }
};

function FadeIn(width, height) {
  return {
    opacity: {
      from: 0,
      to: 1,
      min: 0.5,
      max: 1,
      type: 'linear',
      extrapolate: false,
      round: 100,
    },
  }
};

function FadeOut(width, height) {
  return {
    opacity: {
      from: 1,
      to: 0,
      min: 0,
      max: 0.5,
      type: 'linear',
      extrapolate: false,
      round: 100,
    },
  }
};

function ToTheLeft(width, height) {
  return {
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: -width, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    opacity: {
      value: 1.0,
      type: 'constant',
    },

    translateX: {
      from: 0,
      to: -width,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function ToTheRight(width, height) {
  return {
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: width, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    opacity: {
      value: 1.0,
      type: 'constant',
    },

    translateX: {
      from: 0,
      to: width,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function ToTheUp(width, height) {
  return {
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: 0, y: -height, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    opacity: {
      value: 1.0,
      type: 'constant',
    },
    translateY: {
      from: 0,
      to: -height,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function ToTheDown(width, height) {
  return {
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: 0, y: height, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    opacity: {
      value: 1.0,
      type: 'constant',
    },
    translateY: {
      from: 0,
      to: height,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function FromTheRight(width, height) {
  return {
    opacity: {
      value: 1.0,
      type: 'constant',
    },

    transformTranslate: {
      from: {x: width, y: 0, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },

    translateX: {
      from: width,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },

    scaleX: {
      value: 1,
      type: 'constant',
    },
    scaleY: {
      value: 1,
      type: 'constant',
    },
  }
};

function FromTheLeft(width, height) {
  return {
    ...FromTheRight(width, height),
    transformTranslate: {
      from: {x: -width, y: 0, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    translateX: {
      from: -width,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function FromTheDown(width, height) {
  return {
    ...FromTheRight(width, height),
    transformTranslate: {
      from: {y: height, x: 0, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    translateY: {
      from: height,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function FromTheTop(width, height) {
  return {
    ...FromTheRight(width, height),
    transformTranslate: {
      from: {y: -height, x: 0, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    translateY: {
      from: -height,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

function ToTheBack(width, height) {
  return {
    // Rotate *requires* you to break out each individual component of
    // rotation (x, y, z, w)
    transformTranslate: {
      from: {x: 0, y: 0, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    transformScale: {
      from: {x: 1, y: 1, z: 1},
      to: {x: 0.95, y: 0.95, z: 1},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
    opacity: {
      from: 1,
      to: 0.3,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: false,
      round: 100,
    },
    scaleX: {
      from: 1,
      to: 0.95,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
    scaleY: {
      from: 1,
      to: 0.95,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true
    },
  }
};

function FromTheFront(width, height) {
  return {
    opacity: {
      value: 1.0,
      type: 'constant',
    },

    transformTranslate: {
      from: {x: 0, y: height, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    translateY: {
      from: height,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    scaleX: {
      value: 1,
      type: 'constant',
    },
    scaleY: {
      value: 1,
      type: 'constant',
    },
  }
};

function ToTheBackAndroid(width, height) {
  return {
    opacity: {
      value: 1,
      type: 'constant',
    },
  }
};

function FromTheFrontAndroid(width, height) {
  return {
    opacity: {
      from: 0,
      to: 1,
      min: 0.5,
      max: 1,
      type: 'linear',
      extrapolate: false,
      round: 100,
    },
    transformTranslate: {
      from: {x: 0, y: 100, z: 0},
      to: {x: 0, y: 0, z: 0},
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
    translateY: {
      from: 100,
      to: 0,
      min: 0,
      max: 1,
      type: 'linear',
      extrapolate: true,
      round: PIXEL_RATIO,
    },
  }
};

var BaseOverswipeConfig = {
  frictionConstant: 1,
  frictionByDistance: 1.5,
};

function BaseLeftToRightGesture(width, height) {
  return {

    // If the gesture can end and restart during one continuous touch
    isDetachable: false,

    // How far the swipe must drag to start transitioning
    gestureDetectMovement: 2,

    // Amplitude of release velocity that is considered still
    notMoving: 0.3,

    // Fraction of directional move required.
    directionRatio: 0.66,

    // Velocity to transition with when the gesture release was "not moving"
    snapVelocity: 2,

    // Region that can trigger swipe. iOS default is 30px from the left edge
    edgeHitWidth: 30,

    // Ratio of gesture completion when non-velocity release will cause action
    stillCompletionRatio: 3 / 5,

    fullDistance: width,

    direction: 'left-to-right',
  }
};

function BaseRightToLeftGesture(width, height) {
  return {
    ...BaseLeftToRightGesture(width, height),
    direction: 'right-to-left',
  }
};

function BaseDownUpGesture(width, height) {
  return {
    ...BaseLeftToRightGesture(width, height),
    fullDistance: height,
    direction: 'bottom-to-top',
  }
};

function BaseUpDownGesture(width, height) {
  return {
    ...BaseLeftToRightGesture(width, height),
    fullDistance: height,
    direction: 'top-to-bottom',
  }
};

// For RTL experiment, we need to swap all the Left and Right gesture and animation.
// So we create a direction mapping for both LTR and RTL, and change left/right to start/end.
let directionMapping = {
  ToTheStartIOS: ToTheLeftIOS,
  ToTheEndIOS: ToTheRightIOS,
  FadeToTheStart: FadeToTheLeft,
  FadeToTheEnd: FadeToTheRight,
  ToTheStart: ToTheLeft,
  ToTheEnd: ToTheRight,
  FromTheStart: FromTheLeft,
  FromTheEnd: FromTheRight,
  BaseStartToEndGesture: BaseLeftToRightGesture,
  BaseEndToStartGesture: BaseRightToLeftGesture,
};

if (IS_RTL) {
  directionMapping = {
    ToTheStartIOS: ToTheRightIOS,
    ToTheEndIOS: ToTheLeftIOS,
    FadeToTheStart: FadeToTheRight,
    FadeToTheEnd: FadeToTheLeft,
    ToTheStart: ToTheRight,
    ToTheEnd: ToTheLeft,
    FromTheStart: FromTheRight,
    FromTheEnd: FromTheLeft,
    BaseStartToEndGesture: BaseRightToLeftGesture,
    BaseEndToStartGesture: BaseLeftToRightGesture,
  };
}

function BaseConfig(width, height) {
  return {
    // A list of all gestures that are enabled on this scene
    gestures: {
      pop: directionMapping.BaseStartToEndGesture(width, height),
    },

    // Rebound spring parameters when transitioning FROM this scene
    springFriction: 26,
    springTension: 200,

    // Velocity to start at when transitioning without gesture
    defaultTransitionVelocity: 1.5,

    // Animation interpolators for horizontal transitioning:
    animationInterpolators: {
      into: buildStyleInterpolator(directionMapping.FromTheEnd(width, height)),
      out: buildStyleInterpolator(directionMapping.FadeToTheStart(width, height)),
    },
  }
};

var NavigatorSceneConfigs = {
  PushFromRight: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheEnd(width, height)),
        out: buildStyleInterpolator(directionMapping.ToTheStartIOS(width, height)),
      },
    }
  },
  PushFromLeft: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheStart(width, height)),
        out: buildStyleInterpolator(directionMapping.ToTheEndIOS(width, height)),
      },
    }
  },
  FloatFromRight: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      // We will want to customize this soon
    }
  },
  FloatFromLeft: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        pop: directionMapping.BaseEndToStartGesture(width, height),
      },
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheStart(width, height)),
        out: buildStyleInterpolator(directionMapping.FadeToTheEnd(width, height)),
      }
    }
  },
  FloatFromBottom: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        pop: {
          ...directionMapping.BaseStartToEndGesture(width, height),
          edgeHitWidth: 150,
          direction: 'top-to-bottom',
          fullDistance: height,
        }
      },
      animationInterpolators: {
        into: buildStyleInterpolator(FromTheFront(width, height)),
        out: buildStyleInterpolator(ToTheBack(width, height)),
      },
    }
  },
  FloatFromBottomAndroid: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: null,
      defaultTransitionVelocity: 3,
      springFriction: 20,
      animationInterpolators: {
        into: buildStyleInterpolator(FromTheFrontAndroid(width, height)),
        out: buildStyleInterpolator(ToTheBackAndroid(width, height)),
      },
    }
  },
  FadeAndroid: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: null,
      animationInterpolators: {
        into: buildStyleInterpolator(FadeIn(width, height)),
        out: buildStyleInterpolator(FadeOut(width, height)),
      },
    }
  },
  SwipeFromLeft: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...directionMapping.BaseEndToStartGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...directionMapping.BaseStartToEndGesture(width, height),
          overswipe: BaseOverswipeConfig(width, height),
          edgeHitWidth: null,
          isDetachable: true,
        },
      },
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheStart(width, height)),
        out: buildStyleInterpolator(directionMapping.ToTheEnd(width, height)),
      },
    }
  },
  HorizontalSwipeJump: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...directionMapping.BaseStartToEndGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...directionMapping.BaseEndToStartGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
      },
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheEnd(width, height)),
        out: buildStyleInterpolator(directionMapping.ToTheStart(width, height)),
      },
    }
  },
  HorizontalSwipeJumpFromRight: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...directionMapping.BaseEndToStartGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...directionMapping.BaseStartToEndGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        pop: directionMapping.BaseEndToStartGesture(width, height),
      },
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheStart(width, height)),
        out: buildStyleInterpolator(directionMapping.FadeToTheEnd(width, height)),
      },
    }
  },
  HorizontalSwipeJumpFromLeft: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...directionMapping.BaseEndToStartGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...directionMapping.BaseStartToEndGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        pop: directionMapping.BaseEndToStartGesture(width, height),
      },
      animationInterpolators: {
        into: buildStyleInterpolator(directionMapping.FromTheStart(width, height)),
        out: buildStyleInterpolator(directionMapping.ToTheEnd(width, height)),
      },
    }
  },
  VerticalUpSwipeJump: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...BaseUpDownGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...BaseDownUpGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
      },
      animationInterpolators: {
        into: buildStyleInterpolator(FromTheDown(width, height)),
        out: buildStyleInterpolator(ToTheUp(width, height)),
      },
    }
  },
  VerticalDownSwipeJump: function() {
    let {width, height} = Dimensions.get('window');
    return {
      ...BaseConfig(width, height),
      gestures: {
        jumpBack: {
          ...BaseDownUpGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
        jumpForward: {
          ...BaseUpDownGesture(width, height),
          overswipe: BaseOverswipeConfig,
          edgeHitWidth: null,
          isDetachable: true,
        },
      },
      animationInterpolators: {
        into: buildStyleInterpolator(FromTheTop(width, height)),
        out: buildStyleInterpolator(ToTheDown(width, height)),
      },
    }
  },
};

module.exports = NavigatorSceneConfigs;
