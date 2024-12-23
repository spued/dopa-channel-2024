import ReactPlayer from "react-player";
import React, { useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import mutedImage from "../images/mute.png";
import unMutedImage from "../images/volume.png";

const VIDEO_PATH = "http://dopa-channel.dopa-commu.com:9000/hls/dopa_4k_01.m3u8";
function VideoPlayer() {
  const playerRef = useRef(null);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 1,
    played: 0,
    seeking: false,
    Buffer: true,
    fullscreen: false,
  });
  //Destructuring the properties from the videoState
  const { playing, muted } = videoState;

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    //console.log(props.isPlaying);
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const muteHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const fullScreenHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, fullscreen: !videoState.fullscreen });
    const el = playerRef.current;
    console.log(el);
    screenfull.request(findDOMNode(playerRef.current));
  };

  const Pause = () => {
    // return (
    //   <svg viewBox='0 0 60 60' onClick={playPauseHandler}>
    //     <polygon points='13,15 28,15 28,50 13,50' />
    //     <polygon points='33,15 48,15 48,50 33,50' />
    //   </svg>
    // );
  };
  const Play = () => {
    // return (
    //   <svg viewBox='0 0 60 60' onClick={playPauseHandler}>
    //     <polygon points='13,13 55,33 13,53' />
    //   </svg>
    // );
  };
  const Muted = () => {
    return <img src={unMutedImage} alt="ปิดเสียง" onClick={muteHandler} />;
  };
  const Unmuted = () => {
    return <img src={mutedImage} alt="เปิดเสียง" onClick={muteHandler} />;
  };
  const FullScreen = () => {
    return (
      <svg viewBox="0 0 60 60" onClick={fullScreenHandler}>
        <polygon points="10,10 25,10 25,15 15,15 15,25 10,25" />
        <polygon points="35,10 50,10 50,25 45,25 45,15 35,15" />
        <polygon points="50,35 50,50 35,50 35,45 45,45 45,35" />
        <polygon points="10,50 10,35 15,35 15,45 25,45 25,50" />
      </svg>
    );
  };
  return (
    <div>
      <ReactPlayer className="live__video" ref={playerRef} url={VIDEO_PATH} controls={true} playing={playing} muted={muted} />
      <div className={videoState.playing ? "live__control" : "live__control_pause"}>
        <div className="video_button">{videoState.playing ? Pause() : Play()}</div>
      </div>
    </div>
  );
}
export default VideoPlayer;
