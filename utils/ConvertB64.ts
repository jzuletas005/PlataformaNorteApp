import base64 from 'base64-js';
import * as FileSystem from 'expo-file-system';

function stringToUnit8Array (str: string){
    const length = str.length
    const array = new Uint8Array(new ArrayBuffer(length))
    for(let i = 0; i< length; i++) array[i] = str.charCodeAt(i)
    return array
}

export async function fileToBase64(uri: string) {
    try{
        const content = await FileSystem.readAsStringAsync(uri)
        return base64.fromByteArray(stringToUnit8Array(content))
    }catch(e){
        console.warn('fileToBase64()', e.mesage)
        return ''
    }
}
export function fileToBase64Helper(rawFile: any, uri: string){
    return fileToBase64(rawFile ? rawFile : uri)
}