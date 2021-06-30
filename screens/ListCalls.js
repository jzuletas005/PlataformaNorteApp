import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import { Card } from '../components/';
import FQueries from '../database/querys';

function ListCalls ({route, navigation}){

    //get Data
    const data = route.params.id;
    const uid = route.params.uid;
    //console.log(data[0]);

    //refresh
    const [refresh, setRefresh] = useState(false);

    //render
    const [isLoading, setIsLoading] = useState(true);

    //variable
    const [callsU, setCallsU] = useState([]);

    //useEfeect
    useEffect(() => {
        const find  = FQueries.getCallsUser(data[0]).onSnapshot(getUser);
        return () => find();
    }, [])

    const wait = (timeout) => {
        return new Promise (resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, [])

    const getUser = (items) => {
        let arr = [];
        items.docs.forEach(element => {
            let data = element.data();
            arr.push(data);
        })
        //console.log(arr);
        setCallsU(arr);
        setIsLoading(false);
    }

    const  renderCalls = callsU.map( (a, index) => (
        <Block key={index} style={{flexDirection: 'column'}}>
            <Block style={styles.listCalls}>
                <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailsCalls' , {item: a, uid: uid})}>
                    <Text key={index} style={styles.textCalls}>{a.calltitle}</Text>
                    <Text>Ver más</Text>
                </TouchableOpacity>
            </Block>
            <Divider style={styles.divider}/>
        </Block>
    ));

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    if(callsU.length === 0){
        return(
            <Block flex center style={{justifyContent: 'center'}}>
                <Text size={20}>No tiene convocatorias designadas</Text>
            </Block>
        )
    } 

    return(
        <Block flex top style={styles.home}>
            <ScrollView refreshControl ={
                <RefreshControl 
                    refreshing={refresh}
                    onRefresh={onRefresh}
                />
            }>
                {renderCalls}
            </ScrollView>
        </Block>
    );
    
}

export default ListCalls;

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
    listCalls: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textCalls: {
        color: nowTheme.COLORPLATNRT.CALL,
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