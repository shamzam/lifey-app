export type ApiBase = {
    url: string;
    header: { [name: string]: string };
    request: {}
    response: {}
}

export type ApiAuthResponse<T> = {
    access_token: string;
    token_type: string;
    data: T;
}

export type ApiRes<T> = {
    data?: T;
    error: number;
    error_detail: string;
}