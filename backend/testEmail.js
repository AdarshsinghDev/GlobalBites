import { sendOTP, sendWelcome } from "./utils/email.js";

async function runTest() {
    await sendOTP("adarshsingh10803@gmail.com", "123456");
    await sendWelcome("adarshsingh10803@gmail.com", "Adarsh");
}

runTest();