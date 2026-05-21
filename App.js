import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AppButton, ResultCard, Combustivel } from './AppButton'

export default function App()
{
	const prices = [];
	prices[Combustivel.Etanol] = 3.49;
	prices[Combustivel.Gasolina] = 5.59;

	const [t, setT] = useState(-1);

	return (
		<View style={styles.container}>
			<Image
				source={require('./assets/car-gas-icon.png')}
				style={styles.logo}
			/>
			<Text>Uhhhh</Text>
			<AppButton price={prices} set={setT}>
				<Text>Calcular</Text>
			</AppButton>
			<ResultCard type={Number(t)} price={prices}>Botão</ResultCard>
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
	logo: {
		width: 66,
		height: 58,
	},
});
