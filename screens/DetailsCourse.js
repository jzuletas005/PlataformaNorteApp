import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import { Divider } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { List, Checkbox } from 'react-native-paper';

const { height, width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight, StatusHeight } from '../constants/utils';
import FQueries from '../database/querys';

function DetailsCourse ({route, navigation}) {


    const data = route.params.item;
    //console.log(data);

    //isLoading
    const [isLoading, setIsLoading] = useState(true);
    //modal
    const [showModal, setShowModal] = useState(false);
    const [check, setCheck] = useState([]);

    //isDone
    const [isDone, setIsDone] = useState(false);
    const [resultado, setResultado] = useState(0);
    const [progress, setProgress] = useState(0);

    //variables
    const [alternatives, setAlternatives] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [course, setCourse] = useState("");
    const [project, setProject] = useState("");
    const [file, setFile] = useState("");
    const [filetype, setFileType] = useState("");

    //checked
    const [isSelect, setIsSelect] = useState([]);


    //useEffect
    useEffect(() =>{
        gettingCourse();
    }, [])

    const gettingCourse =  async () => {
        setCourse(data.coursename);
        setProject(data.project);
        setAlternatives(data.course.alternatives);
        setQuestions(data.course.questions);
        setAnswers(data.course.answers);
        setFile(data.course.fileB64);
        setFileType(data.course.filetype);
        //await refillCheck();
        setIsLoading(false);
    }

    const refillCheck = () =>{
        return new Promise((resolve) =>{
            let arr = [];
            for (let index = 0; index < questions.length; index++) {
                arr.push("undefined")
            }
            setCheck(arr);
            resolve();
        }).catch(err => {
            console.log("Error: " +err)
        })
    } 

    function getAlternatives (props) {
        let arr = [];
        //console.log(props)
        for (let index = 0; index < alternatives.length; index++) {
            const element = alternatives[index];
            if(props == element.pregunta){
                var split = element.alternativas.split(",");
                arr.push(split[0],split[1],split[2],split[3]);
            }
        }
        //console.log(arr);
        return arr;
    }


    const handleChoice = (index, answer) => {

        const arr = [...check];

        if(index > 0){
            arr[index -1] = answer;
        }

       //check.splice(index -1, 1, answer);
       //console.log(arr);
       setCheck(arr);
    }

    const goResult = async() =>{
        //console.log(questions.length);
        setIsLoading(true);
        var data = await checkAnswers();
        if(data === -1) {
            setIsLoading(false);
            console.log("no hay alternativas");
            showAlert();
        }else{
            setResultado(data);
            var p = (data * 100)/ (questions.length)
            setProgress(p);
            setIsLoading(false);
            setIsDone(true);
        }
        //console.log(resultado);
    }

    const showAlert = () =>{
        Alert.alert(
            "No hay alternativas seleccionadas",
            "Escoja al menos una",
            [
                {
                    text: "OK", onPress: () => console.log("OK"),
                    style: 'default'
                },
            ]
        );
    }

    const checkAnswers = () => {
        return new Promise ((resolve) => {
            var count = 0;
            if(check.length === 0){
                resolve(-1); 
            }else{
                for (let index = 0; index < check.length; index++) {
                    const element = check[index].toLowerCase();

                    answers.map((a, ondex) => {
                        if(a.Pregunta == (index +1) && a.Respuesta == element){
                            count ++;
                        }
                    })
                    
                }
                resolve(count);
            }
        }).catch(err => {
            console.log("Error: " +err)
        })
    }

    const Item = ({index, title, alternatives}) => (
        <List.AccordionGroup>
            <List.Accordion titleStyle={{fontSize: 20}} title={index+".- " + title} id={index}>
                <Checkbox.Item style={styles.checkbox} label ={alternatives[0]}  status={check[index -1] === "A" ? "checked" : "unchecked"} onPress={() => handleChoice(index, "A")}/>
                <Checkbox.Item style={styles.checkbox} label ={alternatives[1]}  status={check[index -1] === "B" ? "checked" : "unchecked"} onPress={() => handleChoice(index, "B")}/>
                <Checkbox.Item style={styles.checkbox} label ={alternatives[2]}  status={check[index -1] === "C" ? "checked" : "unchecked"} onPress={() => handleChoice(index, "C")}/>
                <Checkbox.Item style={styles.checkbox} label ={alternatives[3]}  status={check[index -1] === "D" ? "checked" : "unchecked"} onPress={() => handleChoice(index, "D")}/>
            </List.Accordion>
        </List.AccordionGroup>
    )

    const renderQ = ({item}) => (
        <Item 
        index={item.numero}
        title={item.pregunta}
        alternatives={getAlternatives(item.numero)}
        />
    );
    

    if(isLoading){
        return(
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
    }

    if(isDone){
        return(
            <Block style={styles.containerResult}>
                <Block style={styles.containerText}>
                    <Text h3 style={styles.textTitleResult}>Resultado</Text>
                </Block>
                <Block center>
                    <Text h3 style={styles.textTitleResult}>{resultado} / {questions.length}</Text>
                </Block>
                <Block center style={{marginTop: 20}}>
                    <AnimatedCircularProgress 
                        size={200} 
                        width={15} 
                        fill={progress}
                        tintColor={nowTheme.COLORPLATNRT.COURSE}
                        backgroundColor={nowTheme.COLORS.TWITTER}
                    >
                        {
                            (fill) => (
                                <Text style={{fontSize: 50}}>
                                    {progress}%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </Block>
                <Block style={styles.containerText}>
                    <Text h3 style={styles.textTitleResult}>{resultado === questions.length ? "Felicitaciones !!" : "Puede volver a intentarlo"}</Text>
                </Block>
            </Block>
        )
    }

    return(
        <Block style={styles.container}>
            <Block style={styles.containerText}>
                <Text h3 style={styles.textTitle}>Recurso</Text>
            </Block>
            <Divider style={styles.divider}/>
            <Block style={styles.containerText}>
            <TouchableOpacity onPress={() => navigation.navigate('ShowCourse', {item: data.course})}>
                <Text h5 style={styles.textTitle}>{course}</Text>
                <Text style={styles.textsubtitle}>Ver recurso</Text>
            </TouchableOpacity>
            </Block>
            <Divider style={styles.divider}/>
            <FlatList 
                data={questions}
                renderItem={renderQ}
                keyExtractor={item => item.numero}
            />
            <Divider style={styles.divider}/>
            <Button style={styles.button} onPress={() => goResult()}>Guardar</Button>
        </Block>
    )
}

export default DetailsCourse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    containerResult: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
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
        marginLeft: 15,
        color: nowTheme.COLORPLATNRT.COURSE
    },
    textTitleResult:{
        alignSelf: 'center',
        color: nowTheme.COLORPLATNRT.COURSE
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    checkboxContainer:{
        flexDirection: "row",
        alignContent: 'space-between',
        marginBottom: 20
    },
    checkbox: {
        alignSelf: 'flex-start',
        fontSize: 20
    },  
    button: {
       alignSelf: 'center'
    }
});