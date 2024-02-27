import { defineStore } from 'pinia'
import axios from "axios";
import router from "@/router/index.js";
import ROUTES_SERVICE from "@/services/RoutesService.js";
import {ref} from "vue";


export const useAuthStore = defineStore('auth', () => {
  let _refreshTokenInterval;

  const isLoading = ref(false);
  const authInfo = ref({
    token: '',
    refreshToken: ''
  })
  const formErrors = ref({
    default: ''
  });
  const _resetAuthInfo = () => {
    authInfo.value = {
      token: '',
      refreshToken: ''
    }
    localStorage.setItem('authInfoStorage', JSON.stringify(authInfo.value));
  }

  const _resetRefreshTokenInterval = () => {
    clearInterval(_refreshTokenInterval);
  }

  const _setAuthInfo = (token, refreshToken) => {
    authInfo.value = {
      token: token,
      refreshToken: refreshToken
    }

    localStorage.setItem('authInfoStorage', JSON.stringify(authInfo.value));
  }

  const _refreshToken = async () => {
    if (authInfo.value.refreshToken) {
      try {
        const result = await axios.post('https://poker.evenbetpoker.com/api/web/auth/token?clientId=default', {
          clientId: 'default',
          refreshToken: authInfo.value.refreshToken
        });

        _setAuthInfo(result.data.token, result.data['refresh-token']);
      } catch(err) {
          _resetRefreshTokenInterval();
          _resetAuthInfo();
          await router.push(ROUTES_SERVICE.signIn.path)
      }
    }
  }

  const _startRefreshTokenInterval = async () => {
    _refreshTokenInterval = setInterval(() => {
      _refreshToken();
    }, 800000)
  }

  const resetFormErrors = () => {
    formErrors.value = {
      default: ''
    }
  }

  const signIn = async (payload) => {
    try {
      isLoading.value = true;
      const result = await axios.post('https://poker.evenbetpoker.com/api/web/v2/login?clientId=default', {
        clientId: 'default',
        ...payload
      });

      const attributes =  result?.data?.data[0]?.attributes;

      if (!attributes) {
        return;
      }

      _setAuthInfo(attributes.token, attributes['refresh-token']);

      await _startRefreshTokenInterval();
      await router.push(ROUTES_SERVICE.index.path);
    } catch (err) {
      const errors = err?.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        formErrors.value.default = errors[0].detail;
      }

      _resetRefreshTokenInterval();
      _resetAuthInfo();
    } finally {
      isLoading.value = false;
    }
  }

  const checkAuth = async () => {
    const authInfoStorage = JSON.parse(localStorage.getItem('authInfoStorage'));

    if (authInfoStorage) {
      authInfo.value.token = authInfoStorage.token;
      authInfo.value.refreshToken = authInfoStorage.refreshToken;

      await _refreshToken();
      await _startRefreshTokenInterval();
    }
  }

  const logout = async () => {
    _resetAuthInfo();
    _resetRefreshTokenInterval();
    await router.push(ROUTES_SERVICE.signIn.path);
  }

  return { signIn, authInfo, checkAuth, logout, isLoading, formErrors, resetFormErrors }
})
