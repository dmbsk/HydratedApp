import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import {
  PanResponderGestureState,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';

import { HydratedSVG } from '../components/HydratedSVG';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StyledText } from '../components/StyledText';
export default function MainScreen(props) {
  const [opacity, setOpacity] = React.useState(100);

  const onLeftSwipe = (state: PanResponderGestureState) => {
    setOpacity(Math.max(0, opacity - 25));
  };

  const onRightSwipe = (state: PanResponderGestureState) => {
    setOpacity(Math.min(100, opacity + 25));
  };

  const goToOptions = () => props.navigation.navigate('Options');

  return (
    <GestureRecognizer
      onSwipeLeft={onLeftSwipe}
      onSwipeRight={onRightSwipe}
      style={styles.container}
    >
      <HydratedSVG opacity={opacity} />
      <View style={styles.textContainer}>
        <StyledText
          style={{ color: '#0094FF', fontSize: 90 }}
        >{`${opacity}%`}</StyledText>
      </View>
      <TouchableHighlight onPress={goToOptions} style={styles.optionsTouchable}>
        <StyledText style={styles.options}>OPTIONS</StyledText>
      </TouchableHighlight>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#000636',
    paddingBottom: 30,
  },
  textContainer: {
    position: 'absolute',
    bottom: -20,
  },
  optionsTouchable: {
    position: 'absolute',
    top: 40,
    right: 25,
  },
  options: {
    fontSize: 12,
    color: '#0094FF',
  },
});
