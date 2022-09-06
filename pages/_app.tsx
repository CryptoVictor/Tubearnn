import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={"JngasAJeHetlFT7s82hG1IZz3RZvre0qyfUNM8MD"}
      serverUrl={"https://l4dxyh2yg9mh.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
