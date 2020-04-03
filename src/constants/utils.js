



export async function loadTracks(pathOfDirToScan, data = { musicLocations: [], musicList: [] }) {
    const readedFilesAndDir = await RNFS.readDir(pathOfDirToScan);
    const extensions = "mp3|wav|pcm|aiff|aac|ogg|wma";
    for (let i = 0; i < readedFilesAndDir.length; i++) {
        if (readedFilesAndDir[i].isDirectory()) {
            const directoryPath = pathOfDirToScan + '/' + readedFilesAndDir[i].name;
            // data.directory.push(directoryPath);
            data = await loadTracks(directoryPath, data);
        } else {
            const name = readedFilesAndDir[i].name;
            const ext = name.split(".").pop();
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
                    id: String(count),
                    title: title,
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

export function formatTime(seconds) {

    function formatTwoDigits(n) {
        return n < 10 ? '0' + n : n;
    }

    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if (hh > 0) {
        return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } else {
        return mm + ':' + formatTwoDigits(ss);
    }
}