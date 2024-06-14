import xhttpClient from "../utils/xhttpClient";

export const getEmpFromPopupCallback = async (request: object) => {
    try {
        const response = await xhttpClient.post(`emplinfo-dev.appplay.co.kr/com_empl_02.act`, request);
        return response;
    } catch (error) {
        return error;
    }
}