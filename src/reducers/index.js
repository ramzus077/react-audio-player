import * as actionTypes from "../constants/actionTypes";

const initialState = {
  playList: null,
  play: false,
  volume: 100,
  currSong: "playlist/Aura-Distorter_Sleep-Scape-320.mp3",
  currentTime: 0,
  keyword: null
};

export default (state = initialState, action) => {
  const myPayload = action.payload;
  switch (action.type) {
    case actionTypes.GENERATE_PLAY_LIST:
      return { ...state, playList: myPayload.playList };
    case actionTypes.PLAY_MUSIC:
      return { ...state, play: true };
    case actionTypes.STOP_MUSIC:
      return { ...state, play: false };
    case actionTypes.NEXT_SONG:
      return { ...state, currSong: myPayload.theNextSong };
    case actionTypes.PREV_SONG:
      return { ...state, currSong: myPayload.thePrevSong };
    case actionTypes.ADJUST_VOLUME:
      return { ...state, volume: myPayload.newVolume };
    case actionTypes.CHANGE_CURRENT_TIME:
      return { ...state, currentTime: myPayload.currentTime };
    case actionTypes.SET_NEW_SONG:
      return { ...state, currSong: myPayload.newSong };
    default:
      return state;
  }
};
