import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { getDuration, calculateSol, timeToSecs, round } from "../utils";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import YouTube, { YouTubeProps } from "react-youtube";
import styles from "./id.module.css";

let tokensUnc;

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  // Here we got the "page" query parameter from Context
  // Default value is "1"
  const durationDetails = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "contentDetails",
        id: id,
        key: "AIzaSyCLQPptlC_V96C_w3qIiDL2YyLeHkD0okY",
      },
    }
  );

  if (durationDetails.data.items.length == 0) {
    return {
      props: {
        duration: null,
        id: id,
      },
    };
  }
  return {
    props: {
      duration: getDuration(
        durationDetails.data.items[0].contentDetails.duration
      ),
      id: id,
    },
  };
  // will be passed to the page component as props
}

const VideoComponenet = (props) => {
  const [elapsed, setElapsed] = useState({ percent: "0%", sol: "0" });
  const playerRef = useRef();
  const { authenticate, isAuthenticated, user, account, isWeb3EnableLoading } =
    useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (props.duration == null) {
      router.push("/");
    }
    const interval = setInterval(async () => {
      console.log(playerRef);
      const elapsed_sec =
        await playerRef.current.internalPlayer.getCurrentTime(); // this is a promise. dont forget to await

      // calculations
      const elapsed_ms = Math.floor(elapsed_sec * 1000);
      const ms = elapsed_ms % 1000;
      const min = Math.floor(elapsed_ms / 60000);
      const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
      const hours = Math.floor(min / 60);

      const currentTimeSecs = timeToSecs(
        hours.toString().padStart(2, "0") +
          ":" +
          min.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(3, "0")
      );
      const totalDurationTimeSecs = timeToSecs(props.duration.string);
      console.log(props.duration);
      console.log(
        min.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0") +
          ":" +
          ms.toString().padStart(3, "0")
      );
      console.log(totalDurationTimeSecs, currentTimeSecs);
      tokensUnc = calculateSol({ duration: currentTimeSecs });
      console.log(tokensUnc);
      tokens_unc: {tokensUnc};

      setElapsed({
        percent:
          Math.round(
            (currentTimeSecs / totalDurationTimeSecs) * 100
          ).toString() + "%",
        sol: round(
          calculateSol({
            duration: { hours: hours, minutes: min, seconds: seconds },
          }),
          3
        ).toString(),
      });
    }, 1000); // 100 ms refresh. increase it if you don't require millisecond precision

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (_e: any) => {
    //
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    console.log(event);
  };

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      cc_load_policy: 0,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="">
      <Header
        handleSubmit={handleSubmit}
        authenticate={authenticate}
        loading={isWeb3EnableLoading}
        isVideo
        isAuthenticated={isAuthenticated}
        user={user}
        account={account}
      />
      <div className="w-8/12 h-full mt-8 px-auto mx-auto">
        <YouTube
          // onTimeUpdate={onPlaying}
          className={styles.youtubeContainer}
          onReady={onPlayerReady}
          ref={playerRef}
          opts={opts}
          videoId={props.id}
        />
        <div className="w-full h-12 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 h-12 text-md font-medium mt-6 pt-4 text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: elapsed.percent }}
          >
            {" "}
            {Number(elapsed.percent.slice(0, -1)) > 10
              ? `${elapsed.sol} $SOL`
              : `${elapsed.sol}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponenet;
