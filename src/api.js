import axios from "axios";
import {useAuthStore} from "@/stores/auth.js";

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  let params = new URLSearchParams();
  params.append('auth', authStore.authInfo.token);
  config.params = params;

  return config;
});
