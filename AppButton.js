import { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const Combustivel = Object.freeze({
    Etanol: 0,
    Gasolina: 1
}),
typen = Object.freeze([
    'Etanol',
    'Gasolina'
]);

function AppButton(props)
{
    const [t, setT] = useState(-1);
    const [txt, setTXT] = useState("");

    const calcT = (up = false, set1, set2) => {
        let mx = 0, r = -1, tarr = [];
        props.price.forEach((e, i) => {
            if (e > mx)
            {
                mx = Math.max(mx, e);
                r = i;
            }

            if (up)
                tarr.push("Preço de " + typen[i] + ": R$" + e);
        });

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
    if (props.type == -1 || props.type == undefined)
    {
        return (
            <View style={styles.rcard}>
                <Text>Abasteça com qualquer coisa.</Text>
            </View>
        );
    }

    const b = [];
    typen.forEach((e, i) => {
        if (i == props.type)
            return;
        b.push(typen[props.type] + " está à " + ((props.price[i] / props.price[props.type]) * 100).toFixed(2) + "% de " + typen[i])
    });

    return (
        <View style={[styles.rcard, props.style]}>
            <Text>Abasteça com: {typen[props.type]}</Text>
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