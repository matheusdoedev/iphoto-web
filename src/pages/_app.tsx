import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

import AppProvider from '~/contexts';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '~/styles/index.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AppProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
