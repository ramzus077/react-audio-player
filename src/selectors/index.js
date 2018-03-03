
export const getMediaPlayerStatus = (state) => {
    return state.play ;
};

export const getCurrentSong = (state) => {
    return state.currSong ;
};

export const getVolume = (state) => {
    return state.volume ;
};

export const getCurrentTime = (state) => {
    return state.currentTime ;
};

export const getMyPlayList = (state) => {
    return state.playList;
};