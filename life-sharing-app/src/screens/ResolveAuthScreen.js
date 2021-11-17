import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({navigation}) => {
  // console.log(2,navigation.navigate);
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin(navigation);
  }, []);

  return null;
};

export default ResolveAuthScreen;
