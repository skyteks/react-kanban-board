import { useEffect, useState } from "react";
import axios from "axios";
import data from "../json/data.json"
import PinnedNote from "../components/PinnedNote";
function MainMenu() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const url = "../json/";

    useEffect(getData, []);

    function onClick(id) {
        console.log(id);

    }

    function getData() {
        if (true) {
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
    }

    const textArray = [
        "Grab a letter of a random color.",
        "Grab a red pin.",
        "Go to the pin-board and pin the letter on the wall."
    ];

    return !dataLoaded ? (
        <div>
            <p>loading...</p>
            {//<button onClick={getData}><i>Load-Test</i></button>
            }
        </div>
    ) : (
        <div>
            <PinnedNote noteTextArray={textArray} key={textArray.join()} />
        </div>
    );
}

export default MainMenu;
