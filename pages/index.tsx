import React from 'react';
import Link from 'next/link'
import { Button } from 'antd';
import ChannelsBar from '../components/ChannelsBar/ChannelsBar';
import NavBar from '../components/NavBar/NavBar';
import { GetServerSideProps } from 'next';
import { checkToken, getUserApi } from '../services';
import { User } from '../types';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice } from '../lib/redux/reducers';

const Home: React.FC<{ user: User, accessToken: string }> = ({ user, accessToken }) => {
  localStorage.setItem('accessToken', accessToken);
  store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
  store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <ChannelsBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <NavBar />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height:"100%"}}>
          <h1 style={{marginBottom: "2rem", fontSize:"xxx-large"}}>Welcome to DoctorSource!</h1>
          <p style={{fontSize:"large"}}>Please select a channel or <Link href="/subscribechannel"><Button type="link" style={{fontSize:"large", padding:"0"}}>subscribe</Button></Link> new channels!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.query;

  const roles = 'User';
  let user: User;

  function isString(accessToken: string | string[]): accessToken is string {
    return (accessToken as string).trim !== undefined;
  }

  if (!accessToken) {
    return {
      notFound: true,
    };
  }

  if (isString(accessToken)) {
    const response = await checkToken(accessToken, roles).then(res => res.json());
    if (response.message === 'Approved') {
      user = await getUserApi(accessToken, response.id).then(res => res.json());

      return {
        props: { user, accessToken },
      };
    }
  }

  return {
    notFound: true,
  };
}