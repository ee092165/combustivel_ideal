import { UseState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const Combustivel = Object.freeze({
    Etanol: 0,
    Gasolina: 1
}),
typen = Object.freeze([
    'Etanol',
    'Gasolina'
]);

function ResultPanel(props)
{
    const [t, setT] = useState(-1);
    const [txt, setTXT] = useState("");

    const calcT = (up = false) => {
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

        setT(r);
        if (up)
            setTXT(tarr);
    }

    calcT(true);

    return (
        <>
            <Text>{txt.join('\n')}</Text>
            <AppButton onPress={calcT}>{props.children}</AppButton>
            <ResultCard type={t} price={props.price}/>
        </>
    );
}

function AppButton(props)
{
    return (
        <Pressable onPress={props.onPress}>
            {props.children}
        </Pressable>
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
        b.push(typen[props.type] + " está à " + ((props.price[props.type] / props.price[i]) * 100).toFixed(2) + "% de " + typen[i])
    });

    return (
        <View style={[styles.rcard, props.style]}>
            <Text>Abasteça com: {typen[props.type]}</Text>
            <Text>{b.join('\n')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
	rcard: {
		flex: 1,
		backgroundColor: '#fcc',
		alignItems: 'center',
		justifyContent: 'center',
        borderRadius: 8,
        padding: 12
	},
});

module.exports = { AppButton, ResultCard, Combustivel };