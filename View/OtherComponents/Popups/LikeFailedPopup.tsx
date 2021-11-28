import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, POPUP_H, POPUP_W} from '../../../Config/Dimensions';

const {Value, spring} = Animated;
const SNAP_BOTTOM = heightDp('7');
const SNAP_TOP = -heightDp('10');

const AnimationConfig = {
  bounciness: 10,
  useNativeDriver: true,
};

interface PopupProps {
  visible: boolean;
  setVisible: Function;
}

const LikeFailedPopup: React.FC<PopupProps> = props => {
  const {setVisible, visible} = props;
  const translationY = useRef(new Value(SNAP_TOP)).current;

  const showAnimation = spring(translationY, {
    ...AnimationConfig,
    toValue: SNAP_BOTTOM,
  });
  const closePopup = spring(translationY, {
    ...AnimationConfig,
    toValue: SNAP_TOP,
  });

  const alreadyLikedTimer = () =>
    setTimeout(() => {
      setVisible(false);
    }, 3000);

  useEffect(() => {
    if (visible) {
      showAnimation.start();
      alreadyLikedTimer();
    } else {
      closePopup.start();
    }

    return () => clearTimeout(alreadyLikedTimer());
  }, [visible]);

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: translationY}]}]}>
      <View style={styles.popup}>
        <Text style={styles.text}>Wine added to favorites</Text>
      </View>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: POPUP_H,
    width: POPUP_W,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  popup: {
    backgroundColor: '#141E61',
    width: '90%',
    height: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30rem',
  },
  text: {
    color: '#fff',
    fontSize: '14rem',
  },
});

export {LikeFailedPopup};
