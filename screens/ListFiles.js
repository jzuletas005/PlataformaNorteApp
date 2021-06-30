import React, {Component, useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';

//firebase
import FQueries from '../database/querys';

function ListFiles ({route, navigation}) {

    //recive data
    const data = route.params.id[0];
    const project = route.params.project[0];
    //console.log(data, project);

    //variables
    const[newsList, setNewsList] = useState([]);

    //refresh
    const [refresh, setRefresh] = useState(false);

    //states
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const findfiles = FQueries.getAllFilesE(data, project).onSnapshot(getCollection);
        return () => findfiles();
    }, []);

    const wait = (timeout) => {
        return new Promise (resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, [])

    const getCollection = (items) =>{
        const newsLi = [];
        items.docs.forEach(element => {
            newsLi.push(element.data())
        });
        setNewsList(newsLi);
        setIsLoading(false);
        //console.log(newsLi);
    }

    const  renderFiles = newsList.map( (a, index) => (
        <Block key={index} style={{flexDirection: 'column'}}>
            <Block key={index} style={styles.listFiles}>
                <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailsFile', {item: a} )}>
                    <Text key={index} style={styles.textFiles}>{a.nameFile}</Text>
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
    if(newsList.length === 0){
        return(
            <Block flex center style={{justifyContent: 'center'}}>
                <Text size={20}>No tiene archivos designados</Text>
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
                {renderFiles}
            </ScrollView>
        </Block>
    )
    
}

export default ListFiles;

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
    listFiles: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textFiles: {
        color: nowTheme.COLORPLATNRT.INFOTECN,
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