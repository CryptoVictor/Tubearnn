import React from "react";
import Link from "next/link";
import { abbreviateNumber, calculateSol } from "../utils";

const Body = (props: {
  query: string;
  videos: Array<[]>;
  loading: Boolean;
  isAuthenticated: boolean;
  authenticate: Function;
}) => {
  console.log(props.videos[0]);

  return (
    <>
      {!props.isAuthenticated ? (
        <div className="h-full relative p-8 text-center border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-medium">No connected wallet</h2>

          <p className="mt-4 text-sm text-gray-500">
            Connect your solana wallet to access the platform
          </p>

          <button
            onClick={() =>
              props.authenticate({ type: "sol" }).catch(function (error: any) {
                console.log(error);
              })
            }
            disabled={props.loading}
            className="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            {props.loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                Connect Wallet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 w-4 h-4 ml-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      ) : props.videos ? (
        <div className="grid grid-cols-3 gap-6 pt-16 px-32 place-content-center">
          {props.videos.map((video: any) => (
            <Link href={`/${video.id.videoId}`}>
              </Link>
              <div key={video.etag}>
                <div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
                  <img
                    className="w-full"
                    src={video.snippet.thumbnails.medium.url}
                    alt=""
                  />
                  <div className="badge absolute top-0 right-0 bg-indigo-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
                    {`${calculateSol(video)} $SOL`}
                  </div>
                  <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
                    <span className="mr-1 p-1 px-2 font-bold">
                      {video.snippet.liveBroadcastContent == "live"
                        ? "🔴 Live"
                        : video.duration.string}
                    </span>
                    <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                      {`${abbreviateNumber(
                        Number(video.stats.viewCount)
                      )} Views`}
                    </span>
                    <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                      {`${abbreviateNumber(
                        Number(video.stats.likeCount)
                      )} Likes`}
                    </span>
                  </div>
                  <div className="desc p-4 text-gray-800">
                    <a
                      href="#"
                      target="_new"
                      className="title truncate  font-bold block cursor-pointer hover:underline"
                    >
                      {video.snippet.title}
                    </a>
                    <a
                      href="#"
                      target="_new"
                      className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer"
                    >
                      {`@${video.snippet.channelTitle}`}
                    </a>
                    <span className="description truncate text-sm block py-2 border-gray-400 mb-2">
                      {video.snippet.description}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <h1>No Video</h1>
      )}
    </>
  );
};

export default Body;
