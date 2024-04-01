const DEV_URL = "https://192.168.1.19";
const PROD_URL = "rtc.classtalkedu.com/wss/";
export const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
