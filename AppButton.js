import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const Combustivel = Object.freeze({
    Etanol: 0,
    Gasolina: 1,
    Diesel: 2
}),
typen = Object.freeze([
    'Etanol',
    'Gasolina',
    'Diesel'
]);

function AppButton(props)
{
    const [t, setT] = useState(-1);
    const [txt, setTXT] = useState("");

    const calcT = (up = false, set1, set2) => {
        let mn = 10000, r = -1, r2 = -1, tarr = [];
        props.price.forEach((e, i) => {
            if (e <= mn)
                r2 = i;
            if (e < mn)
            {
                mn = Math.min(mn, e);
                r = i;
            }

            if (up)
                tarr.push("Preço de " + typen[i] + ": R$" + e.toFixed(2));
        });

        if (r !== r2)
            r = -2;

        props.set(r);
        setT(r);
        if (up)
            setTXT(tarr.join('\n'));
    }

    return (
        <>
            <Pressable onPress={calcT} style={[styles.but, props.style]}>
                {props.children}
                <Text style={styles.lowtext}>{txt}</Text>
            </Pressable>
        </>
    );
}

function ResultCard(props)
{
    if (props.type == -1)
    {
        return (
            <View style={styles.rcard}>
                <Text>Pressione o botão para calcular.</Text>
            </View>
        );
    }

    const b = [];
    if (props.type != -1)
    {
        typen.forEach((e, i) => {
            if (i == props.type)
                return;
            if (props.type == -2)
                b.push(typen[i] + " está à R$" + props.price[i]);
            else
                b.push(typen[props.type] + " está à " + ((props.price[props.type] / props.price[i]) * 100).toFixed(2) + "% de " + typen[i]);
        });
    }

    let text = (<Text>Mais barato: {typen[props.type]}</Text>);
    if (props.type == -2)
        text = (<Text>Uma ou mais opções são igualmente boas.</Text>);
	if (props.type == Combustivel.Etanol && (props.price[Combustivel.Etanol] >= props.price[Combustivel.Gasolina] * 0.7))
		text = (<Text>Apesar de Etanol ser mais barato, Gasolina é o mais benéfico.</Text>);

    return (
        <View style={[styles.rcard, props.style]}>
            {text}
            <Text style={styles.lowtext}>{b.join('\n')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
	rcard: {
		backgroundColor: '#fcc',
		alignItems: 'center',
		justifyContent: 'center',
        borderRadius: 8,
        padding: 12
	},
    but: {
		backgroundColor: '#8f8',
		alignItems: 'center',
		justifyContent: 'center',
        borderRadius: 8,
        padding: 12,
        margin: 12
    },
    lowtext: {
        color: '#0006'
    }
});

module.exports = { AppButton, ResultCard, Combustivel };