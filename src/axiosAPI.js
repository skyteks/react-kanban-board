import axios from "axios"
import { getStatusMeaning } from "./HelperFunctions";

const API_URI = "http://localhost:3000";

async function postUser(uriPath, requestBody, setResponseMessage, storeToken) {
    const what = uriPath.substring(1).toUpperCase();
    if (typeof (requestBody) !== "object" || Object.values(requestBody).some((value) => !value || value == "")) {
        console.log(what, "Reqest Body has empty values");
        return false;
    }
    const uri = API_URI + uriPath;
    console.log("POST", uri, requestBody);

    return await axios.post(uri, requestBody)
        .then((response) => {
            const responseMessage = response.statusText;
            console.log(what, responseMessage);
            setResponseMessage(responseMessage);

            if (storeToken && response.data.authToken) {
                storeToken(response.data.authToken);
            }
            return true;
        })
        .catch((error) => {
            const responseMessage = error.response.data.message;
            console.log(what, responseMessage);
            setResponseMessage(responseMessage);

            return false;
        });
}

async function getUser(uriPath, token, handleResponseData) {
    const what = uriPath.substring(1).toUpperCase();
    const header = getTokenHeader(token);
    const uri = API_URI + uriPath;
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.statusText;
            console.log(what, responseMessage);
            handleResponseData(response.data);

            return true;
        })
        .catch((error) => {
            const responseMessage = error.message;
            console.log(what, responseMessage);

            return false;
        });
}

async function getUsernames(token) {
    const header = getTokenHeader(token);
    const uri = API_URI + "/mongo/users";
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("MONGO", responseMessage);

            return { data: response.data, statusCode: response.status, success: true };
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.log("MONGO", responseMessage, error);

            return { statusCode: error.status, success: false };
        });
}

async function getNotes(token) {
    const header = getTokenHeader(token);
    const uri = API_URI + "/mongo/notes";
    console.log("GET", uri);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("MONGO", responseMessage);

            return { data: response.data, statusCode: response.status, success: true };
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.log("MONGO", responseMessage, error);

            return { statusCode: error.status, success: false };
        });
}

async function patchNote(requestBody, token) {
    const header = getTokenHeader(token);
    const uri = API_URI + "/mongo/notes/" + requestBody.data._id;
    console.log("PATCH", uri, requestBody);

    return await axios.patch(uri, requestBody, header)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("PATCH", responseMessage);

            return { data: response.data, statusCode: response.status, success: true };
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.log("PATCH", responseMessage, error);

            return { statusCode: error.status, success: false };
        });
}

async function postNote(requestBody, token) {
    const header = getTokenHeader(token);
    const uri = API_URI + "/mongo/notes";
    console.log("POST", uri, requestBody);

    return await axios.post(uri, requestBody, header)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("PATCH", responseMessage);
            return { data: response.data, statusCode: response.status, success: true };
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.log("PATCH", responseMessage, error);
            return { statusCode: error.status, success: false };
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