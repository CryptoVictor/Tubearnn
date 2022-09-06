import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import youtube from "../apis/youtube";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { getDuration } from "../utils";
import { useMoralis } from "react-moralis";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    isWeb3EnableLoading,
    logout,
  } = useMoralis();

  const handleSubmit = async (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setQuery(e.target.value);
      let response = await youtube.get("/search", {
        params: {
          q: e.target.value,
        },
      });
      let output = [...response.data.items];
      console.log(output);
      for (const [index, vid] of output.entries()) {
        const stats = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "statistics",
              id: vid.id.videoId,
              key: "AIzaSyCLQPptlC_V96C_w3qIiDL2YyLeHkD0okY",
            },
          }
        );
        const durationDetails = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails",
              id: vid.id.videoId,
              key: "AIzaSyCLQPptlC_V96C_w3qIiDL2YyLeHkD0okY",
            },
          }
        );
        console.log(durationDetails);
        console.log(output[index]);
        output[index]["duration"] = getDuration(
          durationDetails.data.items[0].contentDetails.duration
        );
        output[index]["stats"] = stats.data.items[0].statistics;
      }
      setVideos(output);
      console.log(output);
    }
  };
  return (
    <div>
      <Header
        handleSubmit={handleSubmit}
        authenticate={authenticate}
        loading={isWeb3EnableLoading}
        isAuthenticated={isAuthenticated}
        user={user}
        account={account}
      />
      <Body
        query={query}
        videos={videos}
        loading={isWeb3EnableLoading}
        isAuthenticated={isAuthenticated}
        authenticate={authenticate}
      />
    </div>
  );
};

export default Home;
