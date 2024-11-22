import axios from "axios";
import { getStatusMeaning } from "./HelperFunctions";

const backendUri = (import.meta.env.VITE_BACKEND_URI || "http://localhost") + (":" + import.meta.env.VITE_BACKEND_PORT ||":3000");
console.log(backendUri);


async function postUser(uriPath, requestBody) {
    const what = uriPath.substring(1).toUpperCase();
    if (typeof (requestBody) !== "object" || Object.values(requestBody).some((value) => !value || value == "")) {
        console.log(what, "Reqest Body has empty values");
        return false;
    }
    const uri = backendUri + uriPath;
    console.log("POST", uri, requestBody);

    return await axios.post(uri, requestBody)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(what, responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            console.log(error);
            
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(what, responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function getUser(uriPath, token) {
    const what = uriPath.substring(1).toUpperCase();
    const header = getTokenHeader(token);
    const uri = backendUri + uriPath;
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(what, responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(what, responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function getUsernames(token) {
    const header = getTokenHeader(token);
    const uri = backendUri + "/mongo/users";
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log("MONGO", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log("MONGO", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function getNotes(token) {
    const header = getTokenHeader(token);
    const uri = backendUri + "/mongo/notes";
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log("MONGO", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log("MONGO", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function patchNote(requestBody, token) {
    const header = getTokenHeader(token);
    const uri = backendUri + "/mongo/notes/" + requestBody.data._id;
    console.log("PATCH", uri, requestBody);

    return await axios.patch(uri, requestBody, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log("PATCH", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log("PATCH", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function postNote(requestBody, token) {
    const header = getTokenHeader(token);
    const uri = backendUri + "/mongo/notes";
    console.log("POST", uri, requestBody);

    return await axios.post(uri, requestBody, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log("PATCH", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log("PATCH", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        })
}

function getTokenHeader(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function useAxiosAPI() {
    return {
        postUser,
        getUser,
        getUsernames,
        getNotes,
        patchNote,
        postNote,
    };
}

export default useAxiosAPI;