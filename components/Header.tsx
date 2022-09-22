import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import {
  useMoralis,
  useMoralisSolanaApi,
  useMoralisSolanaCall,
} from "react-moralis";

export default function Header(props: {
  handleSubmit: Function;
  authenticate: Function;
  loading: Boolean;
  isAuthenticated: Boolean;
  user: any;
  account: any;
  isVideo?: Boolean;
}) {
  const [query, setQuery] = useState("");

  console.log(props.account, props.user?.get("solAddress"));

  const truncateRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const truncateEthAddress = (address: string) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex">
            {!props.isVideo && (
              <form className=" ">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={props.handleSubmit}
                    placeholder="Search"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                  />
                </div>
              </form>
            )}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              type="button"
              href="/earnings"
              className="text-gray-900 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 -ml-1 w-6 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Earnings
            </a>
            {props.isAuthenticated ? (
              <span className="bg-blue-100 text-blue-800 text-md font-medium inline-flex items-center px-4 py-1 rounded-2xl dark:bg-blue-200 dark:text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {` ${truncateEthAddress(props.user?.get("solAddress"))}`}
              </span>
            ) : (
              <button
                type="button"
                onClick={() =>
                  props
                    .authenticate({ type: "sol" })
                    .catch(function (error: any) {
                      console.log(error);
                    })
                }
                disabled={props.loading}
                className="text-gray-50 bg-blue-600 hover:bg-blue-500 border border-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-full text-md px-5 py-2.5 text-center inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
                {props.loading ? "Loading..." : "Connect wallet"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-8 w-full">
                <a
                  href="/earnings"
                  className="text-base  text-gray-900 hover:text-gray-700 bg-white hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 -ml-1 w-6 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Earnings
                </a>
              </div>
              {!props.isVideo && (
                <form className=" px-2">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                  </div>
                </form>
              )}
              {!props.isAuthenticated ? (
                <div>
                  <button
                    onClick={() =>
                      props
                        .authenticate({ type: "sol" })
                        .catch(function (error: any) {
                          console.log(error);
                        })
                    }
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-md font-medium inline-flex items-center px-4 py-1 rounded-2xl dark:bg-blue-200 dark:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  {` ${truncateEthAddress(props.user?.get("solAddress"))}`}
                </span>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
