import React, {Component, useEffect, useState} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme,  } from 'galio-framework';

import {Input, Icon} from '../components/';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

import FQueries from '../database/querys';

function Onboarding ({navigation}) {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        NavigateToAuthOrHomeScreen()
    }, [])

    function NavigateToAuthOrHomeScreen(){
        setTimeout(function (){
            FQueries.session().onAuthStateChanged((user) => {
                if(user != null){
                    navigation.navigate('Login', {screen: 'Inicio', params: {screen: "Inicio", params: {uid: user.uid}}});
                }else{
                    navigation.navigate('Login');
                }
            })
        }, 1000)
    }

    return(
        <Block flex safe style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex center  style={styles.centerLoading}>
                <Block >
                    <Text>Cargando ...</Text>
                </Block>
            </Block>
        </Block>
    );
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.WHITE,
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    centerLoading:{
        justifyContent: 'center'
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },

    gradient: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 66
    }
});