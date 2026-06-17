import { RegisterResponse } from "@shared/types";
import { publicApi } from "@shared/api";

interface dataInterface { username: string; password: string; }

export const fetcherRegister = (user: dataInterface) => publicApi.post<RegisterResponse>("/register/", user).then(r => r.data)