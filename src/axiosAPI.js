import axios from "axios"
import { getStatusMeaning } from "./HelperFunctions";

const API_URI = "http://localhost:3000";

async function postAccount(uriPath, requestBody, setResponseMessage) {
    const what = uriPath.substring(1).toUpperCase();
    if (typeof (requestBody) !== "object" || Object.values(requestBody).some((value) => !value || value == "")) {
        console.log(what, "Reqest Body has empty values");
        return false;
    }
    console.log("POST", "account", requestBody);
    const { storeToken } = useUserContext();

    return await axios.post(API_URI + uriPath, requestBody)
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

async function getAccount(uriPath, token, handleResponseData) {
    const what = uriPath.substring(1).toUpperCase();
    console.log("GET", "account");
    const requestBody = addTokenHeader(token);

    return await axios.get(API_URI + uriPath, requestBody)
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

async function getNotes(token) {
    console.log("GET", "notes");
    const requestBody = addTokenHeader(token);

    return await axios.get(API_URI + "/mongo", requestBody)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("MONGO", responseMessage);

            return response.data;
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.error("MONGO", responseMessage);
            navigate(("/error/" + error.status));
        });
}

async function patchNote(requestBody, token) {
    console.log("PATCH", "note");
    requestBody = addTokenHeader(token, requestBody);

    return await axios.patch(API_URI + "/mongo/" + entry.id, requestBody)
        .then((response) => {
            const responseMessage = getStatusMeaning(response.status)[0];
            console.log("PATCH", responseMessage);

            return true;
        })
        .catch((error) => {
            const responseMessage = getStatusMeaning(error.status)[0];
            console.error("PATCH", responseMessage);
            navigate(("/error/" + error.status));

            return false;
        });
}

function addTokenHeader(token, requestBody = {}) {
    return { ...requestBody, headers: { Authorization: `Bearer ${token}` } };
}

function useAxiosAPI() {
    return {
        postAccount,
        getAccount,
        getNotes,
        patchNote,
    };
}

export default useAxiosAPI;