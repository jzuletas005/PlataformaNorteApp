import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator, Platform } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import * as ScreenOrientation from 'expo-screen-orientation';
import PDFReader from 'rn-pdf-reader-js';
import { Video, AVPlaybackStatus } from 'expo-av';

//utils
import {getFile} from '../utils/FileManagement';
import FQueries from '../database/querys';
import { nowTheme } from '../constants';

const { height, width } = Dimensions.get('screen');

function ShowCourse ({route, navigation}) {

    //variable
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState("");
    const [type, setType] = useState("");
    const [fileName, setFileName] = useState("");

    //getting data
    const data = route.params.item;
    //console.log(data);

    //video
    const video = useRef(null);
    const [status, setStatus] = useState([]);

    useEffect(() =>{
        gettinData();
    }, [])


    const gettinData = () =>{
        setFile(data.fileURL);
        setType(data.filetype);
        setFileName(data.fileName);
        setIsLoading(false);
    }

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }
    
    if(type.toLowerCase() === 'pdf'){
        return(
            <PDFReader source={{uri: file}}/>
        )
    }

    if(type.toLowerCase() === 'mp4'){
        return(
            <Block style={styles.containerVideo}>
                <Video 
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: file
                    }}
                    useNativeControls
                    resizeMode= "contain"
                    isLoopin
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </Block>
        )
    }
}

export default ShowCourse;

const styles = StyleSheet.create({
    image: {
        width: 'auto',
        height: width * 1.5,
        marginHorizontal: theme.SIZES.BASE,
        marginVertical: 15,
        alignItems: 'center',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video:{
        alignSelf: 'center',
        width: 320,
        height: 200
    },
    containerVideo: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: nowTheme.COLORPLATNRT.COURSE
    }
});