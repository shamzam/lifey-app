import axios, {AxiosHeaders, AxiosInstance, Method, RawAxiosRequestHeaders} from "axios";

import { ApiError } from "./error";
import { ApiAuthResponse, ApiRes } from "./types";
import {
    ERROR_AUTH_FAIL,
    ERROR_BAD_REQUEST, ERROR_CODE_AUTH_FAIL,
    ERROR_CODE_BAD_REQUEST,
    ERROR_CODE_NO_RESPONSE, ERROR_CODE_UNKNOWN,
    ERROR_NO_RESPONSE, ERROR_UNKNOWN
} from "./const";


export class ApiManager {

    token: string;
    client: AxiosInstance;
    header: (RawAxiosRequestHeaders & Partial<{
        [Key in Method as Lowercase<Key>]: AxiosHeaders;
    } & {common: AxiosHeaders}>) | AxiosHeaders;

    constructor() {
        this.token = "";
        this.client = axios.create({
            baseURL: process.env.API_BASE_URL,
            timeout: 1000,
        });
        this.header = {
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer"
        }
        this.client.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            if (!error.response) {
                throw new ApiError(ERROR_NO_RESPONSE, ERROR_CODE_NO_RESPONSE);
            } else if (error.response.status === 422) {
                throw new ApiError(ERROR_BAD_REQUEST, ERROR_CODE_BAD_REQUEST);
            } else if (error.response.status === 401) {
                throw new ApiError(ERROR_AUTH_FAIL, ERROR_CODE_AUTH_FAIL);
            } else {
                throw new ApiError(ERROR_UNKNOWN, ERROR_CODE_UNKNOWN);
            }
        })
    }

    setToken(token: string) {
        this.header.Authorization = "Bearer " + token;
    }

    async login<T>(username: string, password: string, url: string) {
        const res: ApiRes<T> = { data: undefined, error: 0, error_detail: "" };
        try {
            const result: ApiAuthResponse<T> = await this.client.post(url, { username: username, password: password }, {
                headers: {
                    ...this.header,
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            res.data = result.data;
        } catch (error) {
            if (error instanceof ApiError) {
                res.error = error.errorCode;
                res.error_detail = error.message;
            } else {
                res.error = ERROR_CODE_UNKNOWN;
                res.error_detail = ERROR_UNKNOWN;
            }
        }
        return res;
    }

}