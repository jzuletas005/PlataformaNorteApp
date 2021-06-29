import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements'

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
//Components
import { Icon} from '../components/';

//support
import image from '../assets/image.png';
import FQueries from '../database/querys';

function DetailsDocument ({route, navigation}) {

    //get Data
    const data = route.params.user;
    const data2 = route.params.source;
    //console.log(data.map(x => x.dnifront));

    //variables
    const [isLoading, setIsLoading] = useState(false);

    //variables
    const uid = data.map(x => x.id);
    const [dniFront, setDniFront] = useState("");
    const [dniReverse, setDniReverse] = useState("");

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

    if(data2 === 1){
        useEffect(() => {
            FQueries.getDocURL(uid, "DNIFront").then((url) => {
                setDniFront(url);
                setIsLoading(false);
            }).catch(err => {
                console.log("Error: " +err);
                setIsLoading(false);
            })
        }, []);
        useEffect(() => {
            FQueries.getDocURL(uid, "DNIBack").then((url) => {
                setDniReverse(url);
                setIsLoading(false);
            }).catch(err => {
                console.log("Error: " +err);
                setIsLoading(false);
            })
        }, []);
    }

    const ImageConvert = (data) => {
        return new Promise (async(resolve) => {
            const response = await fetch(data);
            const blob = await response.blob();
            resolve(blob);
        }).catch(err => {
            console.log("Error: " +err);
            setIsLoading(false);
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
            base64: true
            
        });
        if(!result.cancelled){
            setIsLoading(true);
            
            const file = await ImageConvert(result.uri);
            
            FQueries.createDocUser(uid, "DNIFront", file, {contentType: "image/png"}).then(() => {
                FQueries.getDocURL(uid, "DNIFront").then((url) => {
                    setDniFront(url);
                    setIsLoading(false);
                }).catch(err => {
                    console.log("Error: " +err);
                    setIsLoading(false);
                })
            }).catch(err => {
                console.log("Error: " +err);
                setIsLoading(false);
            })
        }
    }
    const pickImageBack = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
            base64: true
            
        });
        if(!result.cancelled){
            setIsLoading(true);
            const file = await ImageConvert(result.uri);
            
            FQueries.createDocUser(uid, "DNIBack", file, {contentType: "image/png"}).then(() => {
                FQueries.getDocURL(uid, "DNIBack").then((url) => {
                    setDniReverse(url);
                    setIsLoading(false);
                }).catch(err => {
                    console.log("Error: " +err);
                    setIsLoading(false);
                })
            }).catch(err => {
                console.log("Error: " +err);
                setIsLoading(false);
            })
        }
    }

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    if(data2 === 1) {
        return(
            <Block style={{flexDirection: 'column'}}>
                <Block center>
                    <TouchableOpacity onPress={pickImage}>
                        <Avatar source={dniFront != "" ? {uri: dniFront} : image} size={210} avatarStyle={{borderRadius: 20}} containerStyle={styles.image}/>
                        <Block center style={{flexDirection: 'row', marginBottom: 10}} >
                            <Text size={20} >Imagen Frontal </Text>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImageBack}>
                        <Avatar source={dniReverse != "" ? {uri: dniReverse} : image} size={210} avatarStyle={{borderRadius: 20}} containerStyle={styles.image}/>
                        <Block center style={{flexDirection: 'row', marginBottom: 10}} >
                            <Text size={20} >Imagen Trasera </Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
            </Block>
        )
    }

    if(data2 === 2){
        return(
            <Block>
                <Text>Otro</Text>
            </Block>
        )
    }

}

export default DetailsDocument;

const styles = StyleSheet.create({
    
    image: {
        margin: 15,
        backgroundColor: nowTheme.COLORS.WHITE,
        color: nowTheme.COLORS.WHITE,
        tintColor: nowTheme.COLORS.WHITE,
        borderRadius: 70
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
})