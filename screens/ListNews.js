import React, {Component, useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import { Card } from '../components/';

//firebase
import FQueries from '../database/querys';


function ListNews ({route, navigation}) {

    //get Data
    const data = route.params.id;
    //console.log(data[0]);

    //variables
    const [isLoading, setIsLoading] = useState(true);
    const [newsList, setNewsList] = useState([]);

    //refresh
    const [refresh, setRefresh] = useState(false);

    //useEffect
    useEffect(()=> {
        const find = FQueries.getNewsPublish(data[0]).onSnapshot(getCollection);
        return () => find();
    }, [])

    const wait = (timeout) => {
        return new Promise (resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, [])
    
    const getCollection = (querySnapshot) =>{
        const newsList = [];
        querySnapshot.forEach((res) =>{
            //console.log(res.data());
            newsList.push(res.data());
        });
        setNewsList(newsList);
        setIsLoading(false);
    }
    
    const  renderNews = newsList.map( (a, index) => (
        <Block key={index} style={{flexDirection: 'column'}}>
            <Block style={styles.listNews}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsNews', {item: a} )}>
                    <Text key={index} style={styles.textNews}>{a.news}</Text>
                    <Text>Ver más</Text>
                </TouchableOpacity>
            </Block>
            <Divider style={styles.divider}/>
        </Block>
    ));

    const renderCard = newsList.map( (a, index) => (
        <Block key={index} style={styles.home}>
            <Card item={a} horizontal/>
        </Block>
    ));
    
    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    if(newsList.length === 0){
        return(
            <Block flex center style={{justifyContent: 'center'}}>
                <Text size={20}>No tiene noticias designadas</Text>
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
                {renderNews}
            </ScrollView>
        </Block>
    );
}

export default ListNews;

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
    listNews: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textNews: {
        color: nowTheme.COLORPLATNRT.NEWS,
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