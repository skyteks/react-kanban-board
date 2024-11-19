import axios from "axios"
import { getStatusMeaning } from "./HelperFunctions";

const apiUri = "https://kanban-board-rest-api.up.railway.app/posts";

async function getNotes() {
    console.log("GET", apiUri);
    return await axios.get(apiUri)
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

async function patchNote(requestBody) {
    console.log("PATCH", apiUri + "/" + requestBody.id, requestBody);
    return await axios.patch(apiUri + "/" + requestBody.id, requestBody)
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

async function postNote(requestBody) {
    console.log("POST", apiUri, requestBody);
    return await axios.post(apiUri, requestBody)
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

function useAxiosAPI() {
    return {
        getNotes,
        patchNote,
        postNote,
    };
}

export default useAxiosAPI;