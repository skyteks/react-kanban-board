import axios from "axios"

const API_URI = "http://localhost:3000";

async function postData(urlPath, requestBody, setResponseMessage, storeToken) {
    if (typeof (requestBody) !== "object" || Object.values(requestBody).some((value) => !value || value == "")) {
        return false;
    }
    console.log("POST", requestBody);
    const what = urlPath.substring(1).toUpperCase();

    return await axios.post(API_URI + urlPath, requestBody)
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
        })
}

async function getData(urlPath, storedToken, handleResponseData) {
    console.log("GET", storedToken ? "with token" : "without token");
    const what = urlPath.substring(1).toUpperCase();
    const requestBody = { headers: { Authorization: `Bearer ${storedToken}`} };
    return await axios.get(API_URI + urlPath, requestBody)
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

function useAxiosAPI() {
    return {
        postData,
        getData,
    };
}

export default useAxiosAPI;