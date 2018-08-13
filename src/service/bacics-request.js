import axiosUtils from './axiosUtils'

export const login = (data) => {
    const url="/login";
    return axiosUtils.post(url,data)
};