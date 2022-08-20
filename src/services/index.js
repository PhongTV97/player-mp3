import axios from "axios";
const header = {
    'Content-Type': 'application/json',
    "Authorization": "eyJraWQiOiJzdnlJWDFEN0tHVVhnRjh2XC9ZcTBoSDZNK1wvZTQ5Q1pPamtNc3graUNBaTg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIyNjczZDM4OS1hM2IxLTRlYTEtYTU4OC1mZjU3MWU1ZTk5ZWIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX0FWZk50OW5lQiIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InN0YWZmMDEiLCJhdWQiOiIyMWc5M2Nrazl2ZDMwMGpsMGNla3MxaDU4ZSIsImV2ZW50X2lkIjoiZDVhNzVlYjQtNTI2MC00ZWViLThmOWItMzcyM2EzMzIxMzk5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTEyMjM4OTEsInBob25lX251bWJlciI6Iis4NDk2Nzc4MTUzNiIsImV4cCI6MTYxMTIyNzQ5MSwiaWF0IjoxNjExMjIzODkxLCJlbWFpbCI6InN0YWZmMDFAcmlra2Vpc29mdC5jb20ifQ.OiP3PzpX4KBmFSBCtUgkTQb3AlfFNArBC9kqRkeKKDkhyhylqgKvJ7JuNfUh64q56zsF-4xbb_DUn8wcvLEsKZXJwE5OMBa0xTIeNED5WRrmSEE0mlZrGlVhcqxkCsPfdWdMMco5yKeIerqz7zTT89ATa8tnEBdBB9WKvQtqwWtyLSYODc6eSW9Vm4eNvT89oFfvkFeZITZwBaIqix-9oAnKx-QmUydbW3V9xJj_TIrHc4QfoF-7dPpw0CvVpJrv0tmvg_8egi_iV2weRDo2FvXlT5NSz1mT9pMysLDg5FxmKzimSyeKzPupu0sa64i-TAmpGaVq0ZeYCD3rsZA_Hw"
}

const check = true;

axios.interceptors.request.use(function (config) {
    if(check) window.location.href = "login";
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (!response.data.success) {
        window.location.href = ('/abc');
        return null;
    }
    return response;
}, function (error) {
    console.log('11111');
    console.log("error", error);
});


export const test = async () => {
    const body = {
        MANAGE_ID: "manage_ID",
        CUSTOMER_NAME: "Jame",
        APARTMENT_ADD: "h1"
    }
    const URL = "https://td45a55nxb.execute-api.ap-northeast-1.amazonaws.com/test";
    return await axios.post(URL + "/DET_DATA", body, header)
}