import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { checkToken, getUserApi } from '../services';
import { User } from '../types';
import { store } from '../lib/redux/store';
import { myChannelsSlice, myIssuesSlice, userSlice, UserState } from '../lib/redux/reducers';

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
      user = await getUserApi(accessToken, response.id).then(res => {
        console.log(res.status);
        return res.json();
      });

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
      router.push('/');
    }

    if (user) {
      const setUserState: UserState = {
        id: user._id || '',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        license: user.license,
        state: user.state,
      }
      store.dispatch(myChannelsSlice.actions.addChannel(user.channels));
      store.dispatch(myIssuesSlice.actions.addIssue(user.issueMeta));
      store.dispatch(userSlice.actions.addUser(setUserState));
      router.push('/');
    }
  }, []);

  return (
    <div style={{display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          height:"100vh",
          backgroundColor:"#D0E4F7",
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
