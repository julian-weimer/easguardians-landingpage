import PropTypes from "prop-types";
import "../common/globals.css";
import typography from "../common/typography.js";
import "normalize.css/normalize.css";

typography.injectStyles();

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
