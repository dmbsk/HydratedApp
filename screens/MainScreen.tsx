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
import { useGetData, useStoreData } from '../hooks/useStorage';

const countPercentage = (value: number) => 100 / value;

export default function MainScreen(props) {
  const [missingCupsPercentage, setMissingCupsPercentage] = React.useState(100);
  const [cupsGoal, setCupsGoal] = React.useState<null | number>(null);
  const [setMissingCupsStoragePercentage] = useStoreData('TODAY_CUPS_PERCENTAGE');

  const onLeftSwipe = (state: PanResponderGestureState) => {
    if (!cupsGoal) {
      return;
    }
    const cupsAmountPercentage =  Math.max(0, missingCupsPercentage - countPercentage(cupsGoal))
    setMissingCupsStoragePercentage(String(cupsAmountPercentage));
    setMissingCupsPercentage(cupsAmountPercentage);
  };

  const onRightSwipe = (state: PanResponderGestureState) => {
    if (!cupsGoal) {
      return;
    }
    const cupsAmountPercentage = Math.min(100, missingCupsPercentage + countPercentage(cupsGoal))
    setMissingCupsStoragePercentage(String(cupsAmountPercentage));
    setMissingCupsPercentage(cupsAmountPercentage);
  };

  const [getCupsValue] = useGetData('CUPS_GOAL');
  const [getTodayCupsPercentage] = useGetData('TODAY_CUPS_PERCENTAGE');

  const fetchData = () => Promise.all([getTodayCupsPercentage(), getCupsValue()]).then(([percentage, goal]: string[]) => {
    const updatedGoal = Number(goal)
    setCupsGoal(updatedGoal)
    setMissingCupsPercentage(Number(percentage) ? Number(percentage) : 100)
  });
  
  React.useEffect(() => {
    props.navigation.addListener(
      'focus',
      (e) => {
        console.log(e)
        fetchData()
      }
    )
  }, [cupsGoal]);

  const goToOptions = () => props.navigation.navigate('Options');

  if (!cupsGoal) {
    return null;
  }
  return (
    <GestureRecognizer
      onSwipeLeft={onLeftSwipe}
      onSwipeRight={onRightSwipe}
      style={styles.container}
    >
      {missingCupsPercentage >= 0 ? (
        <>
          <HydratedSVG opacity={missingCupsPercentage} />
          <View style={styles.textContainer}>
            <StyledText
              style={{
                color: '#0094FF',
                fontSize: 90,
                opacity: Math.min(
                  (125 - missingCupsPercentage) / 100,
                  100
                ),
              }}
            >{`${Math.floor(missingCupsPercentage)}%`}</StyledText>
          </View>
        </>
      ): null}
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
