import React, { useEffect } from "react";
import "../styles/globals.css";
import Head from "next/head";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import * as gtag from '../src/helpers/gtag'

//Material Ui Imports
import createEmotionCache from "../src/helpers/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../styles/theme";

//Redux Imports
import { Provider } from "react-redux";
import { useStore } from "../src/store/store";

//Components
import Header from "../src/components/header/Header.jsx";
import DownloadButton from "../src/components/header/download/download";
import AuthFunction from "../src/middlewares/Auth/Auth";
import CustomizedSnackbars from "../src/components/Toastify/Snackbar";
import Footer from "../src/components/footer/footer";
import TagManager from 'react-gtm-module'

const clientSideEmotionCache = createEmotionCache();

const tagManagerArgs = {
    gtmId: 'GTM-PQR8CZM'
}

function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


	useEffect(() => {
		TagManager.initialize(tagManagerArgs)
	},[]);

	const router = useRouter();
	const showHeader =
		router.pathname === "/checkout/address" || router.pathname === "/checkout/payment" ? null : <Header />;
	const showFooter =
		router.pathname === "/checkout/address" || router.pathname === "/checkout/payment" ? null : <Footer />;
	const wrapAuthComponent = router.pathname !== "/login" ? true : false;
	const store = useStore(pageProps.initialReduxState);


  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

	
	return (
		<React.Fragment>
			<CacheProvider value={emotionCache}>
				<Head>
					<title>Lapcare</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
					<script async src="https://www.googletagmanager.com/gtag/js?id=UA-187798636-2"></script>
					<script
      crossorigin="use-credentials" src="https://businessmessages.google.com/widget/v2/js">
    </script>

					</Head>
					

				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Provider store={store}>
						{wrapAuthComponent ? (
							<AuthFunction>
								{showHeader}
								<DownloadButton />
								<CustomizedSnackbars />
								<Component {...pageProps} />
								{showFooter}
							</AuthFunction>
						) : (
							<div>
								{showHeader}
								<CustomizedSnackbars />
								<Component {...pageProps} />
								{showFooter}
							</div>
						)}
					</Provider>
				</ThemeProvider>
			</CacheProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
