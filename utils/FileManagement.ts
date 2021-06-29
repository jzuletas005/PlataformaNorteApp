import * as FileSystem from 'expo-file-system';

const fileDir = FileSystem.documentDirectory + 'file/';
const fileUri = (filename: string) => fileDir + `${filename}`;

async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(fileDir);
    if(!dirInfo.exists){
        console.log("Directorio temporal no existe, creando .....");
        await FileSystem.makeDirectoryAsync(fileDir, {intermediates: true});
    }
}
export async function getFile(filename: string, fileurl: string) {
    await ensureDirExists();

    const fUri = fileUri(filename);
    const fInfo = await FileSystem.getInfoAsync(fUri);

    if(!fInfo.exists){
        console.log("Archivo no está en el caché, descargando.....");
        await FileSystem.downloadAsync(fileurl, fUri);
    }
    console.log(fUri);
    return fUri;
}