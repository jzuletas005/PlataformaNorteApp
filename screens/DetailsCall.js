import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SliderBox } from 'react-native-image-slider-box';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import FQueries from '../database/querys';

function DetailsCalls ({navigation, route}) {
    //Get data
    const data = route.params.item;
    //console.log(data.idDocCall);

    //isLoading
    const [isLoading, setIsLoading] = useState(true);

    //variable
    const [call, setCall] = useState([]);


    //useEffect
    useEffect(() => {
        const find = FQueries.getCalls(data.idDocCall).onSnapshot(getCall);
        return () => find();
    }, [])

    const getCall = (items) => {
        let arr = [];
        arr.push(
            items.data().calltitle,
            items.data().calldetail,
            items.data().callimage
        )
        setCall(arr);
        setIsLoading(false);
    }



    const images = [require('../assets/icon.png')];

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
                        images={[call[2]]} 
                        autoplay circleLoop 
                        resizeMethod={'resize'} resizeMode={'cover'}
                        paginationBoxVerticalPadding={20}
                        ImageComponentStyle={styles.imageStyle}
                        disableOnPress
                    />
                </Block>
                <Divider style={styles.divider}/>
                <Block style={styles.containerText}>
                    <Text h3 style={styles.textTitle}>{call[0]}</Text>
                        <Block fluid>
                            <Text style={styles.textbody}>{call[1]}</Text>
                        </Block>
                        <Button style={styles.button}>
                            Postular
                        </Button>
                </Block>
            </ScrollView>
        </Block>
    );
    
}

export default DetailsCalls;

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
        color: nowTheme.COLORPLATNRT.CALL
    },
    textbody:{
        marginHorizontal: 20,
        marginVertical:15,
        color: nowTheme.COLORPLATNRT.BODYTEXT_SUBTITLE
    },  
    divider: {
        width: width,
        backgroundColor: nowTheme.COLORS.BLACK
    },
    button:{
        alignSelf: 'center',
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        marginBottom: 20,
        borderRadius: 15,
        bottom: -20
    }
});