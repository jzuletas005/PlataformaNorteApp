import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Divider } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements'

//Components
import { Icon} from '../components/';

//Utils
const { height, width } = Dimensions.get('screen');
import { HeaderHeight, StatusHeight } from '../constants/utils';
import { nowTheme } from '../constants';

//support
import profile from '../assets/user.png';
import FQueries from '../database/querys';
import { resolveUri } from 'expo-asset/build/AssetSources';

function Profile ({route, navigation}) {

    //get data
    const data = route.params.user;

    //isLoading
    const [isLoading, setIsLoading] = useState(false);

    //variables
    const uid = data.map(x => x.id);
    const name = data.map(x => x.name);
    const rut = data.map(x => x.rut);
    const age = data.map(x => x.age);
    const email = data.map(x => x.email);
    const phone = data.map(x => x.phone);
    const profesion = [data.map(x => x.profesion1),
        data.map(x => x.profesion2),
        data.map(x => x.profesion3)];
    const [url, setURL] = useState("");

    const renderProf = profesion.map((p, index) =>{
        if(p != ""){
            return(
                <Block key={index} style={styles.profileData}>
                    <Text size={15}>Profesión u Oficio</Text>
                    <Text style={styles.textProfile}>{p}</Text>
                </Block>
            )
        }
    });

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

    useEffect(() => {
        FQueries.getProfileUserURL(uid).then((url) => {
            setURL(url);
            setIsLoading(false);
        }).catch(err => {
            console.log("Error: " +err);
            setIsLoading(false);
        })
    }, []);

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
            aspect: [1,1],
            quality: 1,
            //base64: true
            
        });
        if(!result.cancelled){
            setIsLoading(true);

            const file = await ImageConvert(result.uri);
            
            FQueries.createProfileUser(uid, file).then(()=> {
                FQueries.getProfileUserURL(uid).then((url) => {
                    setURL(url);
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
    return(
        <Block flex top style={styles.home}>
            <ScrollView>
                <Block style={{flexDirection: 'column'}}>
                    <Block center>
                        <TouchableOpacity onPress={pickImage}>
                            <Avatar source={url != "" ? {uri: url} : profile} size={180} rounded containerStyle={styles.image}/>
                            <Block center style={{flexDirection: 'row', marginBottom: 10}} >
                                <Text size={20} >Cambiar Foto </Text>
                                <Icon size={25} name ="edit-2" family="Feather" color={theme.COLORS.BLACK}/>
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Divider style={styles.divider}/>
                    <Block style={styles.profileData}>
                        <Text size={15}>Nombre</Text>
                        <Text style={styles.textProfile}>{name[0]}</Text>
                    </Block>
                    <Divider style={styles.divider}/>
                    <Block style={styles.profileData}>
                        <Text size={15}>Edad</Text>
                        <Text style={styles.textProfile}>{age + " años"}</Text>
                    </Block>
                    <Divider style={styles.divider}/>
                    <Block style={styles.profileData}>
                        <Text size={15}>Celular</Text>
                        <Text style={styles.textProfile}>{"+56 " +phone}</Text>
                    </Block>
                    <Divider style={styles.divider}/>
                    <Block style={styles.profileData}>
                        <Text size={15}>Correo Electrónico</Text>
                        <Text style={styles.textProfile}>{email}</Text>
                    </Block>
                    <Divider style={styles.divider}/>
                    {renderProf}
                    <Divider style={styles.divider}/>
                </Block>
            </ScrollView>
        </Block>
    );
}

export default Profile;

const styles = StyleSheet.create({
    home:{
        width: width,
        marginTop: Platform.OS === 'android' ? HeaderHeight - 80  : 0 
    },
    divider: {
        width: width,
        backgroundColor: nowTheme.COLORS.BLACK
    },
    profileData: {
        flexDirection: 'column',
        marginLeft: 20,
        marginVertical: 10
    },
    textProfile: {
        color: nowTheme.COLORPLATNRT.PROFILE,
        fontWeight: 'bold',
        fontSize: 25        
    },
    image: {
        margin: 15,
        backgroundColor: nowTheme.COLORS.WHITE,
        color: nowTheme.COLORS.WHITE,
        tintColor: nowTheme.COLORS.WHITE,
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