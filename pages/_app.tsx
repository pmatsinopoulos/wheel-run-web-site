import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import "../styles.css";
import TinaProvider from "../.tina/components/TinaDynamicProvider";

const App = ({ Component, pageProps }) => {
  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <TinaProvider>
        <Component {...pageProps} />
      </TinaProvider>
    </>
  );
};


export default App;
