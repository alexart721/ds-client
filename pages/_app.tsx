import React, { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice } from '../lib/redux/reducers';
import 'antd/dist/antd.css';
import { getUserApi, checkToken } from '../services';

function MyApp({ Component, pageProps }: AppProps) {
  const refreshGuard = async (accessToken: string) => {
    const response = await checkToken(accessToken, 'User').then(res => res.json());
    const user = await getUserApi(accessToken, response.id).then(res => res.json());
    if (user) {
      store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
      store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) refreshGuard(accessToken);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;