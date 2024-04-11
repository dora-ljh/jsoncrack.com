import React from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import { ThemeProvider } from "styled-components";
// import ReactGA from "react-ga4";
import GlobalStyle from "src/constants/globalStyle";
import { lightTheme } from "src/constants/theme";

const Toaster = dynamic(() => import("react-hot-toast").then(c => c.Toaster));

const mantineTheme = createTheme({
  primaryShade: 8,
});

// const isDevelopment = process.env.NODE_ENV === "development";
// const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// ReactGA.initialize(GA_TRACKING_ID, { testMode: isDevelopment });


function JsonCrack({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (page: string) => {
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>JSON Crack | More Than a JSON Editor</title>
      </Head>

      <MantineProvider theme={mantineTheme}>
        <ThemeProvider theme={lightTheme}>
          <Toaster
            position="bottom-right"
            containerStyle={{
              bottom: 34,
              right: 8,
              fontSize: 14,
            }}
            toastOptions={{
              style: {
                background: "#4D4D4D",
                color: "#B9BBBE",
                borderRadius: 4,
              },
            }}
          />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </MantineProvider>
    </>
  );
}

export default JsonCrack;
