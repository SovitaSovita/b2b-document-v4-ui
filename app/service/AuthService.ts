import ihttp from "../utils/xhttp";


export const SendOtpService = async (credentials: any) => {
    try {
        const response = await ihttp.post(`/api/v1/auth/send-otp`, credentials);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}
