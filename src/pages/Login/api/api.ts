import { LoginResponse } from "@shared/types";
import { publicApi } from "@shared/api";

interface LoginDataInterface { username: string; password: string; }

export const fetcherLogin = (user: LoginDataInterface) => publicApi.post<LoginResponse>("/login/", user).then(r => r.data)