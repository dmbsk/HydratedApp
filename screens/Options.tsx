import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { StyledText } from '../components/StyledText';

export default function Options(props) {
  const [cups, onChangeCups] = React.useState('');

  const goToOptions = () => props.navigation.navigate('Main');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight onPress={goToOptions} style={styles.optionsTouchable}>
        <StyledText style={styles.options}>GO BACK & SAVE</StyledText>
      </TouchableHighlight>
      <Text style={styles.input}>Daily water cups goal</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCups}
        value={cups}
        placeholder={'4'}
        keyboardType={'numeric'}
      />
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
