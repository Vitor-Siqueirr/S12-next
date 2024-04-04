import { Header } from "@/ui/components/Header";
import Head from "next/head";
import "@/ui/styles/globals.scss";
import cx from "@/ui/styles/App.module.scss";
import { useState } from "react";
import { Router } from "next/router";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <>
      <Head>
        <title>Rooms</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {loading ? <div className={cx.mask} /> : null}
      <Component {...pageProps} />;
    </>
  );
}
