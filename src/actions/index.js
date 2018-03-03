import * as actionTypes from "../constants/actionTypes";

export const generatePlayList = (playList) => {
  return{
    type: actionTypes.GENERATE_PLAY_LIST,
    payload: { playList }
  }
}
export const playMusic = () => {
  return {
    type: actionTypes.PLAY_MUSIC
  };
};

export const stopMusic = () => {
  return {
    type: actionTypes.STOP_MUSIC
  };
};

export const nextSong = (theNextSong) => {
  return {
    type: actionTypes.NEXT_SONG,
    payload: { theNextSong }
  };
};

export const prevSong = (thePrevSong) => {
  return {
    type: actionTypes.PREV_SONG,
    payload: { thePrevSong }
  };
};

export const adjustVolume = (newVolume) => {
  return {
    type: actionTypes.ADJUST_VOLUME,
    payload: { newVolume }
  };
};

export const changeCurrTime = (currentTime) => {
  return {
    type: actionTypes.CHANGE_CURRENT_TIME,
    payload: { currentTime }
  };
};

export const setNewSong = (newSong) => {
  return {
    type: actionTypes.SET_NEW_SONG,
    payload: { newSong }
  };
}

export const searchSong = (playlist) => {
  return {
    type: actionTypes.SEARCH_SONG,
    payload: { playlist }
  }
}