import * as React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, View, ActivityIndicator, Button } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import ImageView from 'react-native-image-viewing';
import PDFReader from 'rn-pdf-reader-js';
import { Video, AVPlaybackStatus } from 'expo-av';


//utils
import FQueries from '../database/querys';
import { nowTheme } from '../constants';

const { height, width } = Dimensions.get('screen');

function DetailsFile ({navigation, route}){

    //variable
    const [isLoading, setIsLoading] = React.useState(true);
    const [visible, setVisible] = React.useState(true);

    const [f, setF] = React.useState([]);

    //Get data
    const data = route.params.item;
    //console.log(data.idfile);

    //video
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    
    React.useEffect(() =>{
        const find = FQueries.getFile(data.idfile).onSnapshot(getF);
        return () => find();
    }, [])

    const getF = (items) => {
        let arr = [];
        arr.push(
            items.data().name,
            items.data().url,
            items.data().type,
            items.data().b64
            );
        //console.log(arr);
        setF(arr);
        setIsLoading(false);
    }
    /*
    const handleUri = async (name, url, type) => {
        const N = name + "." + type.toLowerCase();
        //console.log(N, url);
        try{
            setFile(await getFile(N, url));
           // handleB64(file);
        }catch (e) {
            console.log("Error: " +e);
        }
        console.log(file);
    };

    handleUri(data.name, data.url, data.type);
    */

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    if(f[2].toLowerCase() === 'pdf'){
        return(
            <PDFReader source={{uri: f[1]}}/>
        )
    }
    //Imagen solo pdfs
    if(f[2].toLowerCase() === 'mp4'){
        return(
            <Block style={styles.containerVideo}>
                <Video 
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: f[1]
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

export default DetailsFile;

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
        backgroundColor: nowTheme.COLORS.TWITTER
    }
});
