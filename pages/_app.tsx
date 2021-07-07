import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice } from '../lib/redux/reducers';
import 'antd/dist/antd.css';
import { getUserApi, checkToken } from '../services';
import sockets from '../sockets';

function MyApp({ Component, pageProps }: AppProps) {

  const [state, setState] = useState('')

  // sockets.init();
  const refreshGuard = async (accessToken: string) => {
    const response = await checkToken(accessToken, 'User').then(res => res.json());
    const user = await getUserApi(accessToken, response.id).then(res => res.json());
    if (user) {
      store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
      store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));
      setState(user.firstName);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) refreshGuard(accessToken);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} userName={state} />
    </Provider>
  );
}
export default MyApp;