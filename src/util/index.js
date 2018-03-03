export const getNextSong = (myPlayList, currentSong) => {
  for (let i = 0; i < myPlayList.length; i++) {
    if (myPlayList[i] !== undefined) {
      if (myPlayList[i].filename === currentSong) {
        if (i === (myPlayList.length - 1)) {
          return {'file': myPlayList[0].filename, 'keySong':myPlayList[0].key};
        }
        return {'file':myPlayList[i + 1].filename, 'keySong':myPlayList[i + 1].key};
      }
    }
  }
};

export const getPrevtSong = (myPlayList, currentSong) => {
  for (let i = 0; i < myPlayList.length; i++) {
    if (myPlayList[i] !== undefined) {
      if (myPlayList[i].filename === currentSong) {
        if (i === 0) {
          return {'file':myPlayList[myPlayList.length - 1].filename, 'keySong':myPlayList[myPlayList.length - 1].key};;
        }
        return {'file':myPlayList[i - 1].filename ,'keySong':myPlayList[i - 1].key};;
      }
    }
  }
};

export const getSelectedSong = (myPlayList, id) => {
  for (let i = 0; i < myPlayList.length; i++) {
    if (myPlayList[i] !== undefined) {
      if (myPlayList[i].key == id) {
        return myPlayList[i].filename
      }
    }
  }
};
