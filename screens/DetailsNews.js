import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from 'react-native-image-slider-box';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import FQueries from '../database/querys';

function DetailsNews ({navigation, route}) {
    //Get data
    const data = route.params.item;
    //console.log(data);

    //variables
    const [news, setNews] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const find = FQueries.getNews(data.idDocNews).onSnapshot(getNews);
        return () => find ();
    }, [])

    const getNews = (items) => {
        let arr = [];
        arr.push(
            items.data().title,
            items.data().subtitle,
            items.data().body,
            items.data().image1,
            items.data().image2,
            items.data().image3,
        )
        setNews(arr);
        setIsLoading(false);
    }


    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }
    return(
        <Block style={styles.container}>
            <ScrollView>
                <Block >
                    <SliderBox 
                        images={[news[3], news[4], news[5]]} 
                        autoplay circleLoop 
                        resizeMethod={'resize'} resizeMode={'cover'}
                        paginationBoxVerticalPadding={20}
                        ImageComponentStyle={styles.imageStyle}
                    />
                </Block>
                <Divider style={styles.divider}/>
                <Block style={styles.containerText}>
                    <Text h3 style={styles.textTitle}>{news[0]}</Text>
                    <Text h5 style={styles.textsubtitle}>{news[1]}</Text>
                    <Text style={styles.textbody}>{news[2]}</Text>
                </Block>
            </ScrollView>
        </Block>
    );
    
}

export default DetailsNews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageStyle: {
        borderRadius: 15,
        width: '97%',
        marginTop:5
    },
    containerText:{
        marginTop: 5
    },
    textTitle:{
        marginHorizontal: 15,
        color: nowTheme.COLORPLATNRT.NEWS
    },
    textsubtitle:{
        marginHorizontal: 10,
        marginVertical: 5,
        color:nowTheme.COLORPLATNRT.BODYTEXT_SUBTITLE
    },
    textbody:{
        marginHorizontal: 10,
        marginVertical:10,
        color: nowTheme.COLORPLATNRT.BODYTEXT_SUBTITLE
    },  
    divider: {
        width: width,
        backgroundColor: nowTheme.COLORS.BLACK
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