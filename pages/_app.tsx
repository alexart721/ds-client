import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice, userSlice, UserState } from '../lib/redux/reducers';
import 'antd/dist/antd.css';
import { getUserApi, checkToken, BASE_AUTH_URL, BASE_URL } from '../services';

function MyApp({ Component, pageProps }: AppProps) {

  const [state, setState] = useState('');

  // sockets.init();
  const refreshGuard = async (accessToken: string) => {
    const response = await checkToken(accessToken, 'User', BASE_AUTH_URL).then(res => res.json());
    const user = await getUserApi(accessToken, response.id, BASE_URL).then(res => res.json());
    const setUserState: UserState = {
      id: user._id || '',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      license: user.license,
      state: user.state,
    }
    if (user) {
      store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
      store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));
      store.dispatch(userSlice.actions.addUser(setUserState));
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