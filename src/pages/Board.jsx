import { useEffect, useState } from "react";
//import axios from "axios";
import data from "../json/data.json"
import PinnedNote from "../components/PinnedNote";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState(data);//useState([]);
    const url = "../json/";

    useEffect(getData, []);

    function getData() {
        if (false) {
            fetch(url)
                //.then((result) => {
                //    return result.json();
                //})
                .then((result) => {
                    console.log(result);
                    setProductsData(result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setDataLoaded(true);
                });
        }
        /*
        else {
            axios.get(url)
                .then((result) => {
                    console.log(result.data);
                    setProductsData(result.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setDataLoaded(true);
                });
        }
        */
    }

    const textArray = [
        "Grab a letter of a random color.",
        "Grab a red pin.",
        "Go to the pin-board and pin the letter on the wall."
    ];

    return (
        <div>
            {!dataLoaded ? (
                <div>
                    <p>loading...</p>
                </div>
            ) : (
                <div>
                    <PinnedNote noteTextArray={textArray} key={textArray.join()} />
                </div>
            )}
        </div>
    );
}

export default Board;
