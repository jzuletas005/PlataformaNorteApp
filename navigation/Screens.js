import React from 'react';
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// screens
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import ListNews from '../screens/ListNews';
import DetailsNews from '../screens/DetailsNews';
import ListCalls from '../screens/ListCalls'; 
import DetailsCalls from '../screens/DetailsCall';
import ListFiles from '../screens/ListFiles';
import DetailsFile from '../screens/DetailsFile';
import ListCourse from '../screens/ListCourse';
import DetailsCourse from '../screens/DetailsCourse';
import ShowCourse from '../screens/ShowCourse';
import ListDocuments from '../screens/ListDocuments';
import DetailsDocument from '../screens/DetailsDocument';
// header for screens
import { nowTheme } from "../constants";


const { height, width } = Dimensions.get("screen");

const Stack = createStackNavigator();

function DocumentStack () {
  return(
    <Stack.Navigator mode= 'card' headerMode='screen'>
      <Stack.Screen 
      name="Documentos" 
      component={ListDocuments}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.DOC
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Documentos',
      }}
      />
      <Stack.Screen 
      name="DetailsDocument" 
      component={DetailsDocument}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.DOC
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Documentos',
      }}
      />
    </Stack.Navigator>
  );
}

function CourseStack (){
  return(
    <Stack.Navigator mode= 'card' headerMode='screen'>
      <Stack.Screen 
      name="Cursos" 
      component={ListCourse}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.COURSE
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Cursos',
      }}
      />
      <Stack.Screen 
      name="DetailsCourse" 
      component={DetailsCourse}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.COURSE
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Cursos',
      }}
      />
      <Stack.Screen 
      name="ShowCourse" 
      component={ShowCourse}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.COURSE
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Cursos',
      }}
      />
    </Stack.Navigator>
  );
}

function FileStack (){
  return(
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen 
      name="Archivos" 
      component={ListFiles}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.INFOTECN
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Información Técnica',
      }}
      />
      <Stack.Screen 
      name="DetailsFile" 
      component={DetailsFile}
      options={{
        headerStyle:{
          backgroundColor: nowTheme.COLORPLATNRT.INFOTECN
        },
        headerTintColor: nowTheme.COLORS.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: nowTheme.COLORS.WHITE
        },
        title: 'Información Técnica',
      }}
      />
    </Stack.Navigator>
  );
}

function CallStack (){
  return(
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen 
        name="Convocatorias"
        component={ListCalls}
        options={{
          headerStyle:{
            backgroundColor: nowTheme.COLORPLATNRT.CALL
          },
          headerTintColor: nowTheme.COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: nowTheme.COLORS.WHITE
          },
          title: 'Convocatorias',
        }}
      />
      <Stack.Screen 
      name="DetailsCalls" 
      component={DetailsCalls}  
      options={{
          headerStyle:{
            backgroundColor: nowTheme.COLORPLATNRT.CALL
          },
          headerTintColor: nowTheme.COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: nowTheme.COLORS.WHITE
          },
          title: 'Convocatorias',
        }}/>
    </Stack.Navigator>
  );
}

function ListNewsStack (props){
  return(
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen 
        name="Noticias"
        component={ListNews}
        options={{
          headerStyle:{
            backgroundColor: nowTheme.COLORPLATNRT.NEWS
          },
          headerTintColor: nowTheme.COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: nowTheme.COLORS.WHITE
          },
          title: 'Noticias',
        }}
      />
      <Stack.Screen 
      name="DetailsNews" 
      component={DetailsNews}  
      options={{
          headerStyle:{
            backgroundColor: nowTheme.COLORPLATNRT.NEWS
          },
          headerTintColor: nowTheme.COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: nowTheme.COLORS.WHITE
          },
          title: 'Noticias',
        }}/>
    </Stack.Navigator>
  );
}

function ProfileStack (props){
  return(
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen 
        name="Perfil"
        component={Profile}
        options={{
          headerStyle:{
            backgroundColor: nowTheme.COLORPLATNRT.PROFILE
          },
          headerTintColor: nowTheme.COLORS.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: nowTheme.COLORS.WHITE
          },
          title: 'Mi Perfil',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack (props){
  return(
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen 
        name="Inicio"
        component={Home}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Perfil" component={ProfileStack}/>
      <Stack.Screen name="Noticias" component={ListNewsStack}/>
      <Stack.Screen name="Convocatorias" component={CallStack}/>
      <Stack.Screen name="Archivos" component={FileStack}/>
      <Stack.Screen name="Cursos" component={CourseStack}/>
      <Stack.Screen name="Documentos" component={DocumentStack}/>
    </Stack.Navigator>
  );
}

function LoginStack (props){
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Inicio" component={HomeStack} />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="none">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          option={{
            headerTransparent: true
          }}
        />
        <Stack.Screen name="Login" component={LoginStack} />
      </Stack.Navigator>
    );
}