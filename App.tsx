import React, { useState } from 'react';
import { data } from './src/data';
import Snackbar from 'react-native-snackbar';
import CurrencyButton from './src/components/CurrencyButton';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue:Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
    return;
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>₹</Text>
            <TextInput
              style={styles.inputField}
              value={inputValue}
              placeholder="Enter amount in rupee"
              keyboardType="number-pad"
              onChangeText={(amount) => setInputValue(amount)}
              maxLength={14}
            />
          </View>
          {resultValue && <Text style={styles.resultText}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={data}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '90%',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  bottomContainer: {
    flex: 3,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  button: {
    flex: 1,
    margin: 10,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selected: {
    backgroundColor: '#D6EAF8',
  },
});

export default App;
