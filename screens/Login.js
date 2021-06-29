import React, {Component, useEffect, useState} from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Alert } from 'react-native';
import { Block, Button, Text, theme,  } from 'galio-framework';
import Loader from 'react-native-modal-loader';

//Firebase
import FQueries from '../database/querys';

import {Input, Icon} from '../components/';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

function Login ({navigation}){

    //ValidaRUT
    const { validate, clean, format, getCheckDigit } = require('rut.js')
    
    const [username, setUsername ] = useState("");
    const [rutValidate, setRutValidate] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState([]);
    const [worker, setWorker] = useState([]);

    const Submit = () =>{
        if(username != "" && password !="" ){
            setIsLoading(true);
            var user = username + "@plataformanorte.com";
            //console.log(user, password);
            FQueries.loginUser(user, password).then((response)=>{
                //console.log(response.user.uid);
                setIsLoading(false);
                navigation.navigate('Inicio', {screen: "Inicio", params: {uid: response.user.uid}});
            }).catch(err =>{
                showAlert();
                console.log("Error: " +err);
            });
        }else{
            console.log("Ingrese sus credenciales");
        }
    }

    //Format And Validate RUT
    function formatAndValidate(params) {
        
        if(validate(clean(params))){
            return format(params);
        }else{
            return 0;
        }
    }

    const showAlert = () =>{
        Alert.alert(
            "Error al Ingresar",
            "Credenciales no válidas, vuelva a intentar",
            [
                {
                    text: "OK", onPress: () => setIsLoading(false)
                }
            ]
        );
        //setIsLoading(false);
    }

    return(
        <Block flex middle style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex middle>
                <Loader loading={isLoading} color="#ff66be"/>
                <Block middle space="between" style={styles.paddedlog}>
                    <Image 
                        source={require('../assets/icon.png')}
                        style={{
                            height: 100,
                            width: 100,
                            marginLeft: theme.SIZES.BASE,
                            marginRight: theme.SIZES.BASE,
                            marginBottom: 20
                        }}
                    />
                    <Block>
                        <Text style={styles.tittle}>
                            ¡Bienvenido!
                        </Text>
                    </Block>
                    <Block
                        style={{
                        marginTop: theme.SIZES.BASE * 2.5,    
                        }}
                        middle
                    >
                        <Input
                            placeholder="Ingrese Rut"
                            type='default'
                            rounded
                            label="Usuario"
                            onChangeText = {username => setUsername(clean(username))}
                            iconContent={
                            <Icon
                                size={20}
                                color="#ADB5BD"
                                name="user"
                                family="AntDesign"
                                style={styles.inputIcons}
                            />
                            }
                            />
                    </Block>
                    <Block 
                        middle
                    >
                        <Input
                            placeholder="Ingrese Contraseña"
                            type= 'default'
                            password={true}
                            rounded
                            label="Contraseña"
                            onChangeText = {password => setPassword(password)}
                            iconContent={
                            <Icon
                                size={20}
                                color="#ADB5BD"
                                name="lock"
                                family="Entypo"
                                style={styles.inputIcons}
                            />
                            }
                            />
                    </Block>
                    <Block
                        row
                        middle
                        style={{
                        marginTop: theme.SIZES.BASE ,
                        marginBottom: theme.SIZES.BASE * 2,
                        }}
                    >
                        <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.INFO}
                        onPress= {() => Submit()}
                        >
                        <Text
                            style={{ fontSize: 20 }}
                            color={theme.COLORS.WHITE}
                        >
                            Ingresar
                        </Text>
                        </Button>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.WHITE,
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },
    paddedlog: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'absolute'
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
    },

    tittle: {
        fontSize: 45
    }
});