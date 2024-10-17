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

    return !dataLoaded ? (
        <div>
            <p>loading...</p>
            {//<button onClick={getData}><i>Load-Test</i></button>
            }
        </div>
    ) : (
        <div>
            <PinnedNote />
        </div>
    );
}

export default MainMenu;
