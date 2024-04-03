import { Header } from "@/ui/components/Header";
import Head from "next/head";
import "@/ui/styles/globals.scss";
import { ViewStateProvider } from "@/application/providers/ViewStateProvider";

export default function App({ Component, pageProps }) {
  return (
    <ViewStateProvider>
      <Head>
        <title>Rooms</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />;
    </ViewStateProvider>
  );
}
