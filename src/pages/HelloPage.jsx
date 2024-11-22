import { useEffect, useState } from "react";
import useAxiosAPI from "../axiosAPI";
import { useNavigate } from "react-router-dom";

function HelloPage() {
    const { axiosGet } = useAxiosAPI();
    const [stuff, setStuff] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const { success, data, statusCode } = axiosGet("/hello");
        if (success) {
            setStuff(data);
            return data;
        }
        navigate(("/error/" + statusCode));
    }

    return (
        stuff
    );
}

export default HelloPage;