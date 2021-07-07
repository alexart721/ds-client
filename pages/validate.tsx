import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { checkToken, getUserApi } from '../services';
import { User } from '../types';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice } from '../lib/redux/reducers';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.query;

  const roles = 'User';
  let user: User;

  function isString(accessToken: string | string[]): accessToken is string {
    return (accessToken as string).trim !== undefined;
  }

  if (!accessToken) {
    return {
      props: { accessToken: 'not found' },
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

const Validate: React.FC<{ user: User, accessToken: string }> = ({ user, accessToken }) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);

    if (accessToken === 'not found') {
      alert('Credentials invalid');
      router.push('http://localhost:3001');
    }

    if (user) {
      store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
      store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));
      router.push('/');
    }
  }, []);

  return (
    <div style={{display:"flex", 
          flexDirection:"row", 
          justifyContent:"center",
          alignItems:"center",
          height:"100vh", 
          backgroundColor:"rgba(228, 253, 248, 0.75)",
          fontFamily:"'Libre Caslon Text', serif"}}>
      <Spin 
        tip="Validating Credentials..."
        size="large"
        >
      </Spin>
      
    </div>
  );
}

export default Validate;
