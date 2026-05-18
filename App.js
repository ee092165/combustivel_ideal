import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton, ResultCard, ResultPanel, Combustivel } from './AppButton'

export default function App()
{
	const prices = [];
	prices[Combustivel.Etanol] = 3.49;
	prices[Combustivel.Gasolina] = 5.59;

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<ResultCard type={0} price={prices}>Botão</ResultCard>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
