import axios from "axios"
const API_URI = "http://localhost:3000";

async function postData(urlPath, responseBody) {
    if (typeof (responseBody) !== "object" || Object.values(responseBody).some((value) => !value || value == "")) {
        return false;
    }
    console.log("POST", responseBody);
    const what = urlPath.substring(1).toUpperCase();
    
    return await axios.post(API_URI + urlPath, responseBody)
        .then((response) => {
            console.log(what, response.statusText);
            return true;
        })
        .catch((error) => {
            console.log(what, error.response.data.message);
            return false;
        })
}

function useAxiosAPI() {
    return {
        postData,
    };
}

export default useAxiosAPI;