import React from 'react';
import {
    View,
    Text,
    StatusBar,
    NativeModules,
} from 'react-native';
import { Provider } from 'react-redux';

import * as RNFS from 'react-native-fs';
import GetMusicDetails from '../components/commons/GetMusicDetails';


var count = 0;
// console.log("count--------------", count) 
export async function loadTracks(pathOfDirToScan = RNFS.ExternalStorageDirectoryPath, data = { musicLocations: [], musicList: [] }) {

    const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);

    const extensions = "mp3|wav|pcm|aiff|aac|ogg|wma";

    for (let i = 0; i < readedFilesAndDir.length; i++) {

        if (readedFilesAndDir[i].isDirectory()) {

            const directoryPath = pathOfDirToScan + '/' + readedFilesAndDir[i].name;

            // data.directory.push(directoryPath);
            data = await loadTracks(directoryPath, data);
        } else {

            let name = readedFilesAndDir[i].name.split(".");

            const ext = name.pop();
            name = name.join(" ").replace(/[\*\-_\(\)\[\]\{\}\&\,\ ]/g," ");
            if (extensions.includes(ext) && ((readedFilesAndDir[i].size) / 1048576) >= 2) {

                const path = readedFilesAndDir[i].path

                const dir = path.substring(0, (path.lastIndexOf("/") + 1))

                if (data.musicLocations.indexOf(dir) === -1) {
                    // const allFiles = await RNFS.readdir(path.substring(0, (path.lastIndexOf("/") + 1)));
                    data.musicLocations.push(dir);
                    // console.log(data.musicLocations)
                }
                const { artist, album, cover, duration, title } = await GetMusicDetails.getMetadata(path)
                count += 1;
                const fileDetails = {
                    id: String(path),
                    title: name,
                    url: String(`file://${path}`),
                    size: readedFilesAndDir[i].size,
                    mtime: readedFilesAndDir[i].mtime,
                    dirPath: dir,
                    album: album,
                    artist: artist,
                    duration: duration,
                    // cover: cover,
                }
                data.musicList.push(fileDetails)
            }

        }
    }
    return data;
}

export function sortMusicList(data) {
    console.log("Sorting....")
    return data.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    })
}

export function formatTime(seconds) {

    function formatTwoDigits(n) {
        return n < 10 ? '0' + String(n) : (n);
    }

    const ms = Math.floor(seconds) / 1000;
    const ss = Math.floor(ms) % 60;
    const mm = Math.floor(ms / 60) % 60;
    const hh = Math.floor(ms / 3600);

    if (hh > 0) {
        return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } else {
        return mm + ':' + formatTwoDigits(ss);
    }
}