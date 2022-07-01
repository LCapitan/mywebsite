import { useRef, useState, useEffect } from "react";
import classnames from "classnames";
import Image from "next/image";

import { PlayButton, PlayTriangle, PauseButton, Forward, Backwards, Fullscreen } from "../Icons/index";

import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  vidSrc?: string,
  vidCover?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  vidSrc,
  vidCover
}) => {

  const vidRef = useRef<HTMLVideoElement>(null);
  const [isWork, setIsWork] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoHandler = (control: any) => {
    if (control === "play") {
      vidRef?.current?.play();
      setPlaying(true);
      const vidElem = document.getElementById("video");
      setVideoTime((vidElem as HTMLVideoElement)?.duration);
    } else if (control === "pause") {
      vidRef?.current?.pause();
      setPlaying(false);
    }
  };

  const videoToggle = () => {
    if (playing) {
      vidRef.current!.pause();
      setPlaying(false);
      const vidElem = document.getElementById("video");
      vidRef?.current?.pause()!;
      setVideoTime((vidElem as HTMLVideoElement)?.duration);
    } else {
      vidRef?.current?.play();
      setPlaying(true);
    }
  };

  const fullscreen = () => {
    vidRef.current?.requestFullscreen();
  }

  const fastForward = () => {
    vidRef.current!.currentTime += 5;
  };

  const revert = () => {
    vidRef.current!.currentTime -= 5;
  };

  useEffect(() => {
    const vid = document.getElementById("video");

    window.addEventListener("scroll", () => { }, { capture: true, passive: true });
    window.addEventListener("ontouch", () => { }, { capture: true, passive: true });
    window.addEventListener("touchstart", () => { }, { capture: true, passive: true });
    window.addEventListener("touchmove", () => { }, { capture: true, passive: true });
    window.addEventListener("wheel", () => { }, { capture: true, passive: true });

    window.setInterval(function () {
      const vidElem = document.getElementById("video");

      setCurrentTime(vidRef?.current?.currentTime!);
      setProgress((vidRef?.current?.currentTime! / videoTime) * 100);

      if (vidElem && (vidElem as HTMLVideoElement)?.ended) {
        vidRef.current!.currentTime = 0;
        setPlaying(false);
      }
    }, 1000);
  })

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoPlayer}>
        {/* Video */}
        <video id="video" ref={vidRef} className={styles.videoElem} onClick={videoToggle}>
          {/* <Image className={classnames(styles.videoCover, playing && styles.playing)} src={vidCover} alt="" width="1200" height="662" /> */}

          <source src={vidSrc} />
        </video>
        {/* Video Controls */}
        <div className={classnames(styles.controlsContainer, playing && styles.playing)}>
          <div className={styles.controls}>
            <span className={styles.arrowButton} onClick={revert}>
              <span className="srOnly">Rewind 5 seconds</span>
              <Backwards />
            </span>
            {playing ? (
              <span className={styles.pauseButton} onClick={() => videoHandler("pause")}><span className="srOnly">Pause Video</span><PauseButton /></span>
            ) : (
              <span className={styles.playButton} onClick={() => videoHandler("play")}><span className="srOnly">Play Video</span><PlayTriangle /></span>
            )}
            <span className={styles.arrowButton} onClick={fastForward}>
              <span className="srOnly">Fast Forward 5 Seconds</span>
              <Forward />
            </span>
          </div>

          {/* Video Progress Bar */}
          <div className={styles.timeControls}>
            {/* <p className={styles.controlsTime}>
              {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
            </p> */}
            <div className={styles.time_progressbarContainer}>
              <div className={styles.time_progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <p className={styles.controlsTime}>
              {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
            </p>
            <span className={styles.fullscreen} onClick={fullscreen}>
              <span className="srOnly">Make Video Full Screen</span>
              <Fullscreen />
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}

export default VideoPlayer;
