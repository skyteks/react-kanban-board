import axios from "axios";
import { getStatusMeaning } from "./HelperFunctions";

const backendUri = (import.meta.env.VITE_BACKEND_URI || "http://localhost:3000");

async function axiosGet(uriPath, token = null, username = null) {
    const header = createHeader(token, username);
    const uri = backendUri + uriPath;
    console.log("GET", uriPath);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(">GET", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(">GET", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function axiosPost(uriPath, requestBody, token = null, username = null) {
    if (!requestBody || Object.values(requestBody).some((value) => !value)) {
        console.error("POST", "Reqest Body has empty values", requestBody);
        return false;
    }
    const header = createHeader(token, username);
    const uri = backendUri + uriPath;
    console.log("POST", uriPath, requestBody);

    return await axios.post(uri, requestBody, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(">POST", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            console.log(error);

            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(">POST", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function axiosPatch(uriPath, requestBody, token, username) {
    if (!requestBody || Object.values(requestBody).some((value) => !value)) {
        console.error("PATCH", "Reqest Body has empty values", requestBody);
        return false;
    }
    const header = createHeader(token, username);
    const uri = backendUri + uriPath + requestBody.data._id;
    console.log("PATCH", uriPath, requestBody);

    return await axios.patch(uri, requestBody, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(">PATCH", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(">PATCH", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

function createHeader(token, username) {
    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log("Header", headers == true);
    }

    return { headers };
}

function useAxiosAPI() {
    return {
        axiosGet,
        axiosPatch,
        axiosPost,
    };
}

export default useAxiosAPI;