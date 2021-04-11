import * as React from 'react';


import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { StyleProp, Text, TextStyle } from 'react-native';

export const StyledText: React.FC<{  style?: StyleProp<TextStyle>  }> = (props) => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'Roboto_400Regular' }]}
    />
  );
};
