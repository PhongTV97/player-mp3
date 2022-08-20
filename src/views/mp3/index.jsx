import React, { useEffect, useState } from "react";
import "./styles.css";
import data from "./songs.json";
import moment from "moment";

let currentIndexSong = 0;
let isRepeat = false;
let isRandom = false;
let idSongPlayed = [];
const $ = document.querySelector.bind(document);
let cdThum;

const Mp3 = () => {
  const getSong = (index) => {
    return {
      image: data[index].links.images[0].url,
      name: data[index].name,
      author: data[index].author,
      path: data[index].url,
      id: data[index].id,
    };
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(getSong(0));

  const formatSenconds = (seconds) => {
    seconds = parseInt(seconds); //because moment js dont know to handle number in string format
    let format =
      moment
        .duration(seconds, "seconds")
        .minutes()
        .toString()
        .padStart(2, "0") +
      ":" +
      moment.duration(seconds, "seconds").seconds().toString().padStart(2, "0");
    return format;
  };

  useEffect(() => {
    const audio = $("audio");
    const progress = $("#progress");
    const currentTimeSpan = $(".current-time");
    const durationTimeSpan = $(".duration-time");
    audio.src = song.path;
    startAnimation();
    audio.ontimeupdate = () => {
      durationTimeSpan.textContent = formatSenconds(audio.duration || 300);
      if (!isNaN(audio.duration)) {
        if (audio.currentTime >= audio.duration) {
          console.log("isRepeat", isRepeat);
          if (!isRepeat) {
            onNextSong(isRandom);
            progress.value = 0;
            currentTimeSpan.textContent = "00:00";
          } else {
            audio.play();
          }
        } else {
          progress.value = (audio.currentTime / audio.duration) * 100;
          currentTimeSpan.textContent = formatSenconds(audio.currentTime);
        }
      } else {
        progress.value = 0;
        currentTimeSpan.textContent = "00:00";
      }
    };
  }, []);

  const startAnimation = (check) => {
    if (check === undefined) {
      let dashboardCD = $(".dashboard-cd");
      cdThum = dashboardCD.animate([{ transform: "rotate(360deg)" }], {
        duration: 10000,
        iterations: Infinity,
      });
    }
    if (!check) cdThum.pause();
    else cdThum.play();
  };

  const onTogglePlayAndPause = () => {
    const audio = $("audio");
    if (!isNaN(audio.duration)) {
      if (!isPlaying) {
        audio.play();
        startAnimation(true);
      } else {
        audio.pause();
        startAnimation(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onNextSong = (isRandom) => {
    if (idSongPlayed.length === data.length) idSongPlayed = [];
    if (isRandom) {
      // idSongPlayed
      do {
        currentIndexSong = Math.floor(Math.random() * 85);
      } while (idSongPlayed.includes(currentIndexSong));
    } else {
      currentIndexSong++;
    }
    const audio = $("audio");
    if (currentIndexSong >= data.length) currentIndexSong = 0;
    idSongPlayed.push(getSong(currentIndexSong).id);
    audio.setAttribute("src", getSong(currentIndexSong).path);
    audio.play();
    setSong(getSong(currentIndexSong));
    setIsPlaying(true);
  };

  const onPrevSong = () => {
    const audio = $("audio");
    currentIndexSong--;
    if (currentIndexSong < 0) currentIndexSong = data.length - 1;
    audio.setAttribute("src", getSong(currentIndexSong).path);
    audio.play();
    setSong(getSong(currentIndexSong));
    setIsPlaying(true);
  };

  const onSelectSong = (index) => {
    const audio = $("audio");
    let songSelected = getSong(index);
    if (songSelected.id !== song.id) {
      audio.setAttribute("src", songSelected.path);
      audio.play();
      setSong(songSelected);
      setIsPlaying(true);
      startAnimation(true);
      currentIndexSong = index;
    }
  };

  const onChageData = (event) => {
    const audio = $("audio");
    if (!isNaN(audio.duration)) {
      const tempTime = (audio.duration * event.target.value) / 100;
      audio.currentTime = tempTime;
      if (isPlaying) {
        audio.play();
      }
    }
  };

  const onRandomSong = () => {
    isRandom = !isRandom;
    const btnRandom = $(".btn-random");
    if (isRandom) {
      btnRandom.classList.add("active");
    } else {
      btnRandom.classList.remove("active");
    }
  };

  const onRepeatSong = () => {
    isRepeat = !isRepeat;
    const btnRepeat = $(".btn-repeat");
    if (isRepeat) {
      btnRepeat.classList.add("active");
    } else {
      btnRepeat.classList.remove("active");
    }
  };

  return (
    <div className="player-container">
      <div className="dashboard">
        {/* dashboard-header */}
        <div className="dashboard-header">
          <h4>Created by Van Phong Tran and Now playing:</h4>
          <h2>
            {song.name.length > 40 ? song.name.slice(0, 40) + "..." : song.name}
          </h2>
        </div>
        {/* dashboard-image */}
        <div className="dashboard-cd">
          <img src={song.image} alt="" />
        </div>
        {/* dashboard-control */}
        <div className="control">
          <div className="btn btn-repeat" onClick={onRepeatSong}>
            <i className="fas fa-redo"></i>
          </div>
          <div className="btn btn-prev" onClick={onPrevSong}>
            <i className="fas fa-step-backward"></i>
          </div>
          <div className="btn btn-toggle-play" onClick={onTogglePlayAndPause}>
            {isPlaying ? (
              <i className="fas fa-pause icon-pause" />
            ) : (
              <i className="fas fa-play icon-play"></i>
            )}
          </div>
          <div className="btn btn-next" onClick={() => onNextSong(isRandom)}>
            <i className="fas fa-step-forward"></i>
          </div>
          <div className="btn btn-random" onClick={onRandomSong}>
            <i className="fas fa-random"></i>
          </div>
        </div>
        {/* input progress */}
        <input
          id="progress"
          className="progress"
          type="range"
          step="1"
          min="0"
          max="100"
          onChange={onChageData}
        />
        <div className="time">
          <span className="current-time">00:00</span>
          <span className="duration-time">05:12</span>
        </div>
        {/* input audio */}
        <audio id="audio" src="" />
      </div>
      {/* list-songs */}
      <div className="list-songs">
        {data.map((itemSong, index) => {
          return (
            <div
              onClick={() => onSelectSong(index)}
              className={`item-song ${song.id === itemSong.id ? "active" : ""}`}
              key={itemSong.id}
            >
              <div className="item-song-image">
                <img src={itemSong.links.images[0].url} alt="" />
              </div>
              <div className="item-song-content">
                <h3 className="title">
                  {itemSong.name.length > 35
                    ? itemSong.name.slice(0, 30) + "..."
                    : itemSong.name}{" "}
                  - {itemSong.id + 1}
                </h3>
                <p className="author">{itemSong.author}</p>
              </div>
              <div className="item-song-action">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mp3;
