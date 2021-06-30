import React, {Component, useEffect, useState} from 'react';
import { TouchableOpacity, View, StyleSheet, StatusBar, Dimensions, Platform, ActivityIndicator, Modal, Alert } from 'react-native';
import { Block, Button, Text, theme, Card,  } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

import { Icon} from '../components/';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import FQueries from '../database/querys';


export default function Home ({navigation, route}) {

    //isLoading
    const [isLoading, setIsLoading] = useState(true);
    //modal
    const [showModal, setShowModal] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [check, setCheck] = useState(-1)


    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);

    //variables
    const [name, setName] = useState("");
    const [enterprise, setEnterprise] = useState("");
    const [idEnterprise, setIDEnterprise] = useState("");
    const [idProject, setIdProject] = useState("");

    //onChange variables
    const [enterprisePrev, setEnterprisePrev] = useState(""); 
    const [idEnterprisePrev, setIDEnterprisePrev] = useState("");
    const [idProjectPrev, setIdProjectPrev] = useState("");

    var uid = route.params.uid;

    useEffect(() =>{
        const unsuscribe = FQueries.getUser(uid).onSnapshot(getUser);
        return () => unsuscribe();
    }, [])

    useEffect(() =>{
        const find = FQueries.findWorker(uid).onSnapshot(getWorker);
        return () => find();
    }, [])

    const getUser = (items) => {
        let us = [];
        us.push({
            id: uid,
            name: items.data().name,
            email: items.data().email,
            age: items.data().age,
            pass: items.data().pass,
            phone: items.data().phone,
            profesion1: items.data().profesion1,
            profesion2: items.data().profesion2,
            profesion3: items.data().profesion3,
            profileimage: items.data().profileimage,
            rut: items.data().rut
        });
        setUser(us);
        setName(us.map(x => x.name));
    };

    const getWorker = (items) => {
        let work = [];
        //console.log(items);
        items.docs.forEach(function (item, keyX) {
            let id = item.id;
            let data = item.data();
            work.push([{
                id: id,
                name: data.name,
                rut: data.rut,
                status: data.status,
                enterprise: data.enterprise,
                project: data.project,
                idDocEnterprise: data.idDocEnterprise,
                idDocProject: data.idDocProject
            }]);
        });
        setData(work);
        setEnterprise(work[0].map(x => x.enterprise));
        setIDEnterprise(work[0].map(x => x.idDocEnterprise));
        setIdProject(work[0].map(x => x.idDocProject));
        setEnterprisePrev(work[0].map(x => x.enterprise));
        setIDEnterprisePrev(work[0].map(x => x.idDocEnterprise));
        setIdProjectPrev(work[0].map(x => x.idDocProject));
        setIsLoading(false);
    };

    const renderWorker = data.map((d, index) =>{
        //console.log(d);
        var identerprise = d.map(x => x.idDocEnterprise);
        var enterprise = d.map(x => x.enterprise);
        var idproject = d.map(x => x.idDocProject);
        
        if(idEnterprise[0] != identerprise[0]){
            return(
                <Block key={index}>
                    <Block style={styles.checkboxContainer}>
                        <CheckBox 
                            key={index}
                            title={enterprise}
                            checked={check === index ? true : false}
                            onPress={() => prevWorker(identerprise, enterprise, idproject, index)}
                        />
                    </Block>
                </Block>
            )
        }
        
    });

    const prevWorker = (idEnterpriseNew, EnterpriseNew, idProjectNew, index) =>{
        setCheck(index);
        setEnterprisePrev(EnterpriseNew != "" ? EnterpriseNew : enterprise);
        setIDEnterprisePrev(idEnterpriseNew != "" ? idEnterpriseNew : idEnterprise);
        setIdProjectPrev(idProjectNew != "" ? idProjectNew : idProject);
    }

    const changeWorker = () =>{
        setIDEnterprise(idEnterprisePrev);
        setEnterprise(enterprisePrev);
        setIdProject(idProjectPrev);
        setShowModal(!showModal);
    }

    const Logout = async() => {
        try{
            FQueries.session().signOut();
            navigation.navigate('Login');
        }catch(e){
            console.log(e);
        }
    }

    const showAlert = () =>{
        Alert.alert(
            "Cerrar Sesión",
            "¿Está seguro que desea salir de la sesión?",
            [
                {
                    text: "Si", onPress: () => Logout(),
                    style: "destructive"
                },
                {
                    text: "No", onPress: () => navigation.navigate("Home", {uid: uid}),
                    style: "cancel"
                }
            ]
        );
    }

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }
    return(
        <Block safe flex center  style={styles.home} >
            <Block top row style={styles.header}>
                <Block>
                    <Text style={{fontSize: 25}}>Hola</Text>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Text style={{fontSize: 24}}>{name}</Text>
                        <Text style={{fontSize: 15}}>{enterprise}</Text>
                    </TouchableOpacity>
                </Block>
                <Block style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        <Block style={styles.centeredView}>
                            <Block style={styles.modalView}>
                                {renderWorker}
                                <Button onPress={() => changeWorker()}>
                                    <Text>Guardar</Text>
                                </Button>
                            </Block>
                        </Block>
                    </Modal>
                </Block>
                <Block>
                    <Button style={styles.buttonSession} iconSize={35} icon= "logout" iconFamily = "AntDesign" onlyIcon onPress={() => showAlert()}/>
                </Block>
            </Block>
            <Block fluid >
                <Block row>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Perfil', {screen: 'Perfil', params: {user: user}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.PROFILE, nowTheme.COLORPLATNRT.BUTTON_PROFILE]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80} name="user" family="AntDesign" color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Mi Perfil</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Documentos', {screen: 'Documentos', params: {user: user}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.DOC, nowTheme.COLORPLATNRT.BUTTON_DOC]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80} name="folder1" family="AntDesign" color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Documentos</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                </Block>
                <Block row>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Convocatorias', {screen: 'Convocatorias', params: {id: idEnterprise, uid: uid}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.CALL, nowTheme.COLORPLATNRT.BUTTON_CALL]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80} name="megaphone" family="Entypo" color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Convocatorias</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Archivos', {screen: 'Archivos', params: {id: idEnterprise, project: idProject}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.INFOTECN, nowTheme.COLORPLATNRT.BUTTON_INFOTECN]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80} name="infocirlceo" family="AntDesign" color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Información Técnica</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                </Block>
                <Block row>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Noticias', {screen: 'Noticias', params: {id: idEnterprise}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.NEWS, nowTheme.COLORPLATNRT.BUTTON_NEWS]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80}  name='paperclip' family='AntDesign' color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Noticias</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('Cursos', {screen: 'Cursos', params: {id: idEnterprise, project: idProject}})}>
                        <LinearGradient
                            colors={[nowTheme.COLORPLATNRT.COURSE, nowTheme.COLORPLATNRT.BUTTON_COURSE]}
                            start={[0.0, 0.0]}
                            end={[1.0, 1.0]}
                            style={styles.cardButton}
                        >
                            <Block style={styles.iconCard}>
                                <Icon size={80} name="checkcircleo" family="AntDesign" color={theme.COLORS.WHITE}/>
                            </Block>
                            <Block style={styles.textCardFooter}>
                                <Text style={styles.textCard} bold>Cursos</Text>
                            </Block>
                        </LinearGradient>
                    </TouchableOpacity>
                </Block>
            </Block>
        </Block>
    );
    
}

const styles = StyleSheet.create({
    home:{
        width: width,
        marginTop: Platform.OS === 'android' ? StatusHeight : 0 
    },
    cardButton:{
        width: width / 2.3,
        height: width / 2.4,
        marginHorizontal: 15,
        marginBottom: 30,
        borderRadius: 20,
        shadowRadius: 50,
        shadowOpacity: 100,
        shadowColor: theme.COLORS.BLACK
    },
    iconCard:{
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 100
    },
    textCardFooter: {
        bottom: - width/20,
        marginLeft: 10,
        marginBottom : 10,
        alignItems: 'flex-start'
    },
    textCard:{
        fontSize: 18,
        fontStyle: 'normal',
        color: theme.COLORS.WHITE,
    },    
    header:{
        paddingHorizontal: 25,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 1,
        justifyContent: "center",
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    },
    paddedlog: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'absolute'
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },
    circleButton:{
        width: 50,
        height: 50,
        borderRadius: 100,
        left: 30
    },
    gradient: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 66
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    tittle: {
        fontSize: 45
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonSession: {
        borderRadius: 100,
        width: 55,
        height: 55,
        padding: 10,
        elevation: 2
    },
    checkboxContainer:{
        flexDirection: "row",
        alignContent: 'space-between',
        marginBottom: 20
    },
    checkbox: {
        alignSelf: 'flex-start'
    },  
});