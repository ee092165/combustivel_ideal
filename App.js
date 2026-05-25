import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import { AppButton, ResultCard, Combustivel } from './AppButton'

export default function App()
{
	const [prices, setPrices] = useState([]);

	const estado = 'br';
	const getPrice = async () => {
		try
		{
			const response = await fetch('https://combustivelapi.com.br/api/precos/');
			const json = await response.json();
	
			prices[Combustivel.Etanol] = 3.49; // Fixo, mas pode ser ajustado
			prices[Combustivel.Gasolina] = Number(json.precos.gasolina.br.replace(',', '.'));
			prices[Combustivel.Diesel] = Number(json.precos.diesel.br.replace(',', '.'));
			setPrices(prices);
		}
		catch (error)
		{
			prices[Combustivel.Etanol] = 3.49;
			prices[Combustivel.Gasolina] = 5.59;
			prices[Combustivel.Diesel] = 7.29;
			setPrices(prices);
			console.error(error);
		}
	};

	useEffect(() => {
		getPrice();
	}, []);

	//prices[Combustivel.Etanol] = PriceAPI.gasolina.preco;
	//prices[Combustivel.Gasolina] = PriceAPI.etanol.preco;

	const [t, setT] = useState(-1);

	return (
		<View style={styles.container}>
			<Image
				source={require('./assets/car-gas-icon.png')}
				style={styles.logo}
			/>
			<Text>Calculadora de preço de combustível ideal</Text>
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
