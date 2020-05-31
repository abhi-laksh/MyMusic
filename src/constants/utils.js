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



const extensions = "mp3|wav|pcm|aiff|aac|ogg|wma";
const exclusions = /(\.temp)|(whatsapp)/g;
export async function loadTracks(pathOfDirToScan = RNFS.ExternalStorageDirectoryPath, data = { musicLocations: [], musicList: [] }) {
    try {
        const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);
        for (let i = 0; i < readedFilesAndDir.length; i++) {
            if (readedFilesAndDir[i].isDirectory()) {
                const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/${readedFilesAndDir[i].name}`;
                if (!exclusions.test(directoryPath.toLowerCase())) {
                    data = await loadTracks(readedFilesAndDir[i].path, data);
                }
            }
            else {
                const name = readedFilesAndDir[i].name.concat();
                const ext = name.split(".").pop();

                if (extensions.includes(ext) && ((readedFilesAndDir[i].size) / 1048576) >= 2) {
                    const path = readedFilesAndDir[i].path.concat();
                    const dir = path.substring(0, (path.lastIndexOf("/") + 1));
                    const { artist, album, cover, duration, title } = await GetMusicDetails.getMetadata(path);
                    const fileDetails = {
                        title,
                        url: `file://${path}`,
                        size: readedFilesAndDir[i].size,
                        mtime: readedFilesAndDir[i].mtime,
                        dirPath: dir,
                        album,
                        artist,
                        duration,
                    }

                    data.musicList.push(fileDetails);
                }
            }
        }
        return data;
    } catch (error) {
        console.log(`********************ERRR*******************\n\n${readedFilesAndDir[i].path}\n\n********************ERRR*******************`);

    }
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