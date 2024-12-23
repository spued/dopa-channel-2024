import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const VideoList = () => {
  const YOUTUBE_API_KEY = "AIzaSyBwcO8vOQjUIquupteiZaoTFfx7Wi6_nq4";
  const CHANNEL_ID = "UCLcQPIx04ZPW9zkmU2mozpg";
  const [playList, setPlayList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [pl, setPL] = useState();
  const active_button = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [pl_title, setPL_title] = useState("เลือกช่องรายการ");

  useEffect(() => {
    if (playList.length === 0) getPlaylist();
  }, [playList]);

  useEffect(() => {
    getVideolist(pl);
  }, [pl]);

  const getPlaylist = async () => {
    try {
      // Retrieve the Playlist
      const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${CHANNEL_ID}&maxResults=25&key=${YOUTUBE_API_KEY}`;
      const response = await axios.get(url);
      //console.log(response.data.items);
      setPlayList(response.data.items);
      setPL(response.data.items[0].id);
    } catch (error) {
      console.error(error);
    }
  };
  const getVideolist = (pl_id) => {
    if (pl_id !== undefined) {
      try {
        // Retrieve the Playlist
        const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${pl_id}&maxResults=25&key=${YOUTUBE_API_KEY}`;
        return axios.get(url).then((response) => {
          //console.log(response.data.items);
          setVideoList(response.data.items.toReversed());
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handlePLChange = (evt) => {
    //console.log(evt.target.attributes.pl_id.value);
    setPL_title(evt.target.attributes.pl_title.value);
    return setPL(evt.target.attributes.pl_id.value);
  };

  const onYoutubeReady = (event) => {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
    //console.log(event.target.getVideoUrl());
  };

  const onYoutubeError = (event) => {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
    //console.log("Youtube error");
    setCurrentVideo(videoList[0].snippet.resourceId.videoId);
  };
  const onYoutubePlay = (event) => {
    // access to player in all event handlers via event.target
    setPlaying(true);
  };

  const onYoutubePause = (event) => {
    // access to player in all event handlers via event.target
    //console.log(event.target);
    setPlaying(false);
  };

  const YouTubeProps = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      enablejsapi: 1,
      origin: "http://localhost:3000",
    },
  };
  const renderVideoPlayers = () => {
    return (
      <div className="content">
        <div className="playback__header">
          <h3>ชมรายการย้อนหลัง โดยเลือกหมวดหมู่ตามช่องรายการ</h3>
        </div>
        <h3> {pl_title} </h3>
        <div className="playback__video">
          <YouTube videoId={currentVideo} opts={YouTubeProps} onReady={onYoutubeReady} onPlay={onYoutubePlay} onPause={onYoutubePause} onError={onYoutubeError} />
          <div className="playback__channel">
            {playList.map((list, index) => (
              <div key={index}>
                <button
                  className={index === active_button.current ? "pl_button_pressed" : "pl_button"}
                  pl_id={list.id}
                  pl_title={list.snippet.title}
                  onClick={handlePLChange}
                  onMouseDown={() => {
                    active_button.current = index;
                  }}
                >
                  {list.snippet.title}
                </button>
              </div>
            ))}
          </div>
          <div className="playback__video__list">
            {videoList.map((list, index) => {
              //console.log(list.snippet);
              if (list.snippet.thumbnails.default !== undefined) {
                return (
                  <div key={index} className="video__thumb">
                    <img
                      src={list.snippet.thumbnails.medium.url}
                      alt={"Video playback"}
                      onClick={() => {
                        //console.log(list.snippet);
                        setCurrentVideo(list.snippet.resourceId.videoId);
                        setPL_title(list.snippet.title);
                      }}
                    />
                    <div className="video__title">{list.snippet.title}</div>
                  </div>
                );
              } else
                return (
                  <div key={index} className="video__thumb">
                    {}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
  };

  return renderVideoPlayers();
};
export { VideoList as default };
