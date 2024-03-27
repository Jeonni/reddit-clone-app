import "@/styles/globals.css";
import Axios from "axios";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // Axios 로 요청 보낼 때 최상단 URL 세팅
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  return <Component {...pageProps} />;
}

export default MyApp;