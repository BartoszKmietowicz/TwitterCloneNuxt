export default () => {
  const useAuthToken = () => {
    return useState('auth_token');
  };
  const useAuthUser = () => {
    return useState('auth_user');
  };

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password,
          },
        });

        setToken(data.access_token);
        setUser(data.user);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh');
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const initializeAuthentication = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    login,
    useAuthUser,
    initializeAuthentication,
  };
};
