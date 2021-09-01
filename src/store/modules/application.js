function initialApplicationState() {
  return {
    isLogin: true,
    accessToken: undefined,
    refreshToken: undefined
  }
}

const application = {
  namespaced: true,
  state: initialApplicationState,
  mutations: {
    resetApplicationStore(state) {
      const initState = initialApplicationState();
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      })
    },
    isLogin(state, visible) {
      state.isLogin = visible;
    },
    setAccessToken(state, token) {
      state.accessToken = `Bearer ${token}`;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    }
  }
};
  
export default application;
  