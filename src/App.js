import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import { connect } from "react-redux";
import {
  getMediaPlayerStatus,
  getCurrentSong,
  getVolume,
  getCurrentTime,
  getMyPlayList
} from "./selectors";

import {
  playMusic,
  stopMusic,
  nextSong,
  prevSong,
  adjustVolume,
  changeCurrTime,
  setNewSong,
  generatePlayList
} from "./actions";

import { myPlayList } from "./audiolist/playlist";

import { getNextSong, getPrevtSong, getSelectedSong } from "./util";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      searchKeyWord: "",
      tmpPlayList: myPlayList,
      keySong: "1"
    };
  }

  componentWillMount = () => {
    this.store.dispatch(generatePlayList(myPlayList));
  };

  componentDidMount = () => {
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    myMediaPlayer.addEventListener("timeupdate", this.updateProgress);
    myMediaPlayer.addEventListener("ended", this.end);
    myMediaPlayer.addEventListener("error", this.next);
  };

  updateProgress = () => {
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    let duration = myMediaPlayer.duration;
    let currentTime = myMediaPlayer.currentTime;
    let progress = currentTime * 100 / duration;
    this.store.dispatch(changeCurrTime(progress));
  };

  startMusic() {
    if (this.props.playStatus) {
      this.store.dispatch(stopMusic());
    } else {
      this.store.dispatch(playMusic());
    }
  }

  getTheNextSong() {
    let nextTrack = getNextSong(myPlayList, this.props.currSong.toString());
    this.store.dispatch(changeCurrTime(0));
    this.store.dispatch(nextSong(nextTrack.file.toString()));
    this.setState({ keySong: nextTrack.keySong.toString() });
  }

  getThePrevSong() {
    let prevTrack = getPrevtSong(myPlayList, this.props.currSong.toString());
    this.store.dispatch(changeCurrTime(0));
    this.store.dispatch(prevSong(prevTrack.file.toString()));
    this.setState({ keySong: prevTrack.keySong.toString() });
  }

  setProgress = e => {
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    let target = e.target.nodeName === "SPAN" ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = myMediaPlayer.duration;
    let currentTime = duration * offsetX / width;
    let progress = currentTime * 100 / duration;
    myMediaPlayer.currentTime = currentTime;
    this.setState({ progress: progress });
    myMediaPlayer.play();
  };

  setVolume = e => {
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    let target = e.target.nodeName === "SPAN" ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = 10;
    let currentTime = duration * offsetX / width;
    let volume = currentTime * 100 / duration;
    myMediaPlayer.volume = volume / 100;
    this.store.dispatch(adjustVolume(volume));
  };

  mute = () => {
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    if (myMediaPlayer.volume === 0) {
      myMediaPlayer.volume = 1;
      this.store.dispatch(adjustVolume(100));
    } else {
      myMediaPlayer.volume = 0;
      this.store.dispatch(adjustVolume(0));
    }
  };

  selectSong = e => {
    let selectedSong = "";
    let idSong = "";
    //debugger;
    if (e.target.id !== undefined && e.target.id !== "") {
      idSong = e.target.id;
    } else {
      idSong = e.target.parentNode.id;
    }
    this.setState({ keySong: idSong });
    selectedSong = getSelectedSong(myPlayList, idSong);
    if (selectedSong !== undefined) {
      this.store.dispatch(changeCurrTime(0));
      this.store.dispatch(setNewSong(selectedSong));

      if (!this.props.playStatus) {
        this.startMusic();
      }
    }
  };

  generateMyPlaylist = playList => {
    const content = playList.map(list => (
      <div
        style={
          list.key === this.state.keySong ? (
            { backgroundColor: "#adadad" }
          ) : (
            { backgroundColor: "#e2e2e2" }
          )
        }
        id={list.key}
        key={list.key}
        className="songInfo"
        onClick={this.selectSong}
      >
        <span className="artist">{list.artist}</span>
        <span>{" - "}</span>
        <span>{list.track}</span>
        <span className="duration"> {list.duration}</span>
      </div>
    ));
    return <div>{content}</div>;
  };

  filter = (keyWord) => {
    let researchResult = [];
    let researchKeyWord = keyWord.target.value;
    if (researchKeyWord.length >= 2) {
      this.store.dispatch(
        generatePlayList(
          myPlayList.filter(p =>
            p.artist.toUpperCase().startsWith(researchKeyWord.toUpperCase())
          )
        )
      );
    } else {
      this.store.dispatch(generatePlayList(myPlayList));
    }
    this.setState({ tmpPlayList: this.props.playList });
  };

  render() {
    this.generateMyPlaylist(myPlayList);
    let myMediaPlayer = document.getElementById("myMediaPlayer");
    if (myMediaPlayer !== null) {
      if (this.props.playStatus) {
        myMediaPlayer.play();
      } else {
        myMediaPlayer.pause();
      }
    }

    return (
      <div className="mediaPlyer">
        <div className="Controls">
          <div className="controlIcon" onClick={this.getThePrevSong.bind(this)}>
            <MaterialIcon icon="skip_previous" />
          </div>
          <div className="controlIcon" onClick={this.startMusic.bind(this)}>
            {this.props.playStatus ? (
              <MaterialIcon icon="pause" />
            ) : (
              <MaterialIcon icon="play_arrow" />
            )}
          </div>
          <div className="controlIcon" onClick={this.getTheNextSong.bind(this)}>
            <MaterialIcon icon="skip_next" />
          </div>

          <div className="player-progress-container" onClick={this.setProgress}>
            <span
              className="player-progress-value"
              style={{ width: this.props.currentTime + "%" }}
            />
          </div>
          <div className="controlIcon" onClick={this.mute.bind(this)}>
            {this.props.volumeLevel === 0 ? (
              <MaterialIcon icon="volume_off" />
            ) : (
              <MaterialIcon icon="volume_up" />
            )}
          </div>
          <div className="volume-progress-container" onClick={this.setVolume}>
            <span
              className="volume-progress-value"
              style={{ width: this.props.volumeLevel + "%" }}
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Search by artist"
            className="searchInput"
            onChange={this.filter.bind(this)}
          />
        </div>
        <div>{this.generateMyPlaylist(this.state.tmpPlayList)}</div>
        <div>
          <audio
            id="myMediaPlayer"
            src={this.props.currSong}
            autoPlay={false}
            onEnded={this.startMusic.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playStatus: getMediaPlayerStatus(state),
    currSong: getCurrentSong(state),
    volumeLevel: getVolume(state),
    currentTime: getCurrentTime(state),
    playList: getMyPlayList(state)
  };
}
export default connect(mapStateToProps, {
  playMusic,
  stopMusic,
  nextSong,
  prevSong,
  adjustVolume,
  changeCurrTime,
  setNewSong,
  generatePlayList
})(App);
