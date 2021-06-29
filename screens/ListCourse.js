import React, {Component, useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';

//firebase
import FQueries from '../database/querys';

function ListCourse ({route, navigation}) {

    //isLoading
    const [isLoading, setIsLoading] = useState(true);

    //get data
    const data = route.params.id;
    const data2 = route.params.project;
    //console.log(data2);

    //variables
    const [courseWorker, setCourseWorker] = useState([]);

    //refresh
    const [refresh, setRefresh] = useState(false);

    //useEffect
    useEffect(() => {
        const find = FQueries.getCourseWorker(data[0], data2[0]).onSnapshot(getCWorker);
        return () => find ();
    }, [])

    const wait = (timeout) => {
        return new Promise (resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, [])


    const getCWorker = (items) => {
        let arr = [];
        items.forEach(element => {
            arr.push(element.data());
        });
        setCourseWorker(arr);
        setIsLoading(false);
    }

    const renderCourses = courseWorker.map((a, index) =>(
        <Block key={index} style={{flexDirection: 'column'}}>
            <Block style={styles.listCourses}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsCourse', {item: a} )}>
                    <Text key={index} style={styles.textCourses}>{a.coursename}</Text>
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

    if(courseWorker.length === 0){
        return(
            <Block flex center style={{justifyContent: 'center'}}>
                <Text size={20}>No tiene cursos designados</Text>
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
                {renderCourses}
            </ScrollView>
        </Block>
    )
}

export default ListCourse;

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
    listCourses: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textCourses: {
        color: nowTheme.COLORPLATNRT.COURSE,
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