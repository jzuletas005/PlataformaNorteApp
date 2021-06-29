import firebase from "./firebase";

//Collection
const dbUser =  firebase.db.collection('/users');
const dbWorker = firebase.db.collection('/workers');
const dbFilesE = firebase.db.collection('/fileenterprise');
const dbFiles = firebase.db.collection('/files');
const dbCallsUser =  firebase.db.collection('/callsuser');
const dbCalls = firebase.db.collection('/calls');
const dbNews = firebase.db.collection('/articles');
const dbNewsPublish = firebase.db.collection('/newspublish');
const dbCourseWorker = firebase.db.collection('/courseworkers');

/**
 * Queries
 */

//Session
const session = () =>{
    return firebase.firebase.auth();
}
//Login
const loginUser = (username, password) =>{
    return firebase.firebase.auth().signInWithEmailAndPassword(username, password);
};

//Users
//get user
const getUser = (id) =>{
    return dbUser.doc(id);
};
//check if exists
const checkUser = (username, password) =>{
    return dbUser.where('rut', '==', username).where('pass', '==', password);
};
//update profile avatar
const updateProfile = (uid,params) =>{
    return dbUser.doc(uid).update(params);
};


//Workers
const findWorker = (params) => {
    return dbWorker.where('idDocUser', '==', params);
};

//Files Enterprise
const getAllFilesE = (id) =>{
    return dbFilesE.where("idDocEnterprise", "==", id);
};

//Files
const getFile = (id) =>{
    return dbFiles.doc(id);
};

//Calls
const getCalls = (id) => {
    return dbCalls.doc(id);
};

//Calls User
const getCallsUser = (id) => {
    return dbCallsUser.where("idDocEnterprise", "==", id);
};

//News
const getNews = (id) => {
    return dbNews.doc(id);
}
//News Publish
const getNewsPublish = (data) => {
    return dbNewsPublish.where("idDocEnterprise", "==", data);
}

//Course Workers
const getCourseWorker = (data, project) =>{
    return dbCourseWorker.where("idDocEnterprise" , "==", data).where("idDocProject", "==", project);
}

/**
 * Storage
 */

//Profle User
const createProfileUser = (user, data) => {
    return firebase.st.ref(`users/${user}/profileAvatar`).put(data, {contentType: "image/png"});
}
// get URL
const getProfileUserURL = (user) => {
    return firebase.st.ref(`users/${user}/profileAvatar`).getDownloadURL();
}

//DocUser 
const createDocUser = (user, docName, data, type) =>{
    return firebase.st.ref(`users/${user}/${docName}`).put(data, type);
}

//get URL
const getDocURL = (user, docName) =>{
    return firebase.st.ref(`users/${user}/${docName}`).getDownloadURL();
}

const FQueries = {
    //login
    loginUser,

    //session
    session,

    //users
    getUser,
    checkUser,
    updateProfile,

    //worker
    findWorker,

    //filesE
    getAllFilesE,

    //files
    getFile,

    //calls
    getCalls,

    //calls user
    getCallsUser,

    //news
    getNews,

    //news
    getNewsPublish,

    //course worker
    getCourseWorker,

    //Files
    createProfileUser,
    getProfileUserURL,
    createDocUser,
    getDocURL,
};

export default FQueries;
