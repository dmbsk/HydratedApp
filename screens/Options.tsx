import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  Button,
} from 'react-native';
import { StyledText } from '../components/StyledText';
import { useGetData, useStoreData } from '../hooks/useStorage';

export default function Options(props) {
  
  const [cups, setCupsGoal] = React.useState('');

  const [setCupsStorage] = useStoreData('CUPS_GOAL');
  const [setMissingCupsStoragePercentage] = useStoreData(
    'TODAY_CUPS_PERCENTAGE'
  );
  const [getTodayCupsPercentage] = useGetData('TODAY_CUPS_PERCENTAGE');

  const handleChangeCups = (newCupsGoal: string) => {
    setCupsGoal(newCupsGoal);
  };

  const [getCupsValue] = useGetData('CUPS_GOAL');

  React.useEffect(() => {
    getCupsValue().then((v: string) => setCupsGoal(v));
  }, []);

  const goToOptions = () => {
    props.navigation.navigate('Main');
  };

  const saveData = () => {
    Promise.all([getTodayCupsPercentage(), getCupsValue()]).then(
      ([percentage, oldCups]: string[]) => {
        const cupsDifference = Number(oldCups) / Number(cups);
        const numberPercentage = Number(percentage);
        if (numberPercentage >= 100) {
          setMissingCupsStoragePercentage('100');
          return;
        }
        const updatedValue = Math.min(100, Number(percentage) * cupsDifference);
        setMissingCupsStoragePercentage(String(updatedValue));
        setCupsStorage(cups);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight onPress={goToOptions} style={styles.optionsTouchable}>
        <StyledText style={styles.options}>GO BACK & SAVE</StyledText>
      </TouchableHighlight>
      <Text style={styles.input}>Daily water cups goal</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeCups}
        value={cups}
        placeholder={'4'}
        keyboardType={'numeric'}
      />
      <Button onPress={saveData} title={'Save'} />
    </SafeAreaView>
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    fontSize: 30,
    color: '#0094FF',
  },
  optionsTouchable: {
    position: 'absolute',
    top: 40,
    left: 25,
  },
  options: {
    fontSize: 12,
    color: '#0094FF',
  },
});
