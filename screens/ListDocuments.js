import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';

function ListDocuments ({route, navigation}) {

    //get Data
    const data = route.params.user;
    //console.log(data[0].id);

    //variables
    const [isLoading, setIsLoading] = useState(true);

    return(
        <Block flex top style={styles.home}>
            <Block style={{flexDirection: 'column'}}>
                <Block style={styles.listDocuments}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailsDocument',{user: data, source: 1} )}>
                        <Text style={styles.textDocuments}>Cedula de Identidad (DNI)</Text>
                        <Text>Ver más</Text>
                    </TouchableOpacity>
                </Block>
                <Divider style={styles.divider}/>
            </Block>
        </Block>
    );

}

export default ListDocuments;

const styles = StyleSheet.create({
    home:{
        width: width,
        marginTop: Platform.OS === 'android' ? HeaderHeight - 80  : 0 
    },
    container: {
        paddingHorizontal: theme.SIZES.BASE
    },
    divider: {
        width: width,
        backgroundColor: nowTheme.COLORS.BLACK
    },
    listDocuments: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textDocuments: {
        color: nowTheme.COLORPLATNRT.DOC,
        fontWeight: 'bold',
        fontSize: 25 
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});