import React, { useRef, useState } from "react";
import { withdrawRewards, walletAddress } from '../backend/index.js';

// components

import Header from "../components/Header";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

// layout for page

// import Admin from "layouts/Admin.js";

export default function Dashboard() {
  
  const playerRef = useRef();
  const { authenticate, isAuthenticated, user, account, isWeb3EnableLoading } =
    useMoralis();
  const router = useRouter();
  return (
    <>
      <Header
        handleSubmit={() => {}}
        authenticate={authenticate}
        loading={isWeb3EnableLoading}
        isVideo
        isAuthenticated={isAuthenticated}
        user={user}
        account={account}
      />
      <div className="container items-center px-4 py-8 m-auto mt">
        <div className="max-w-screen-xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
              Withdraw Earnings
            </h1>
            <form
              action=""
              className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
            >
              <div className="text-3xl font-bold py-2 text-center">
                <Balance/>
              </div>
              <button
                type="submit"
                className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
              >
                Withdraw All
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
