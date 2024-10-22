import { useEffect, useState } from "react";
//import axios from "axios";
import PinnedNote from "../components/PinnedNote";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const url = "https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";

    useEffect(getData, []);

    function getData() {
        if (true) {
            fetch(url)
                .then((result) => {
                    console.log(result);
                    return result.json();
                })
                .then((result) => {
                    console.log(result);
                    setProductsData(result);
                    setDataLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
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

    return (
        <div>
            {!dataLoaded ? (
                <div>
                    <p>loading...</p>
                </div>
            ) : (
                <table>
                    <tbody>
                        <tr>
                            <th style={{ width: "400px" }}>Backlog</th>
                            <th style={{ width: "400px" }}>To Do</th>
                            <th style={{ width: "400px" }}>Doing</th>
                            <th style={{ width: "400px" }}>Test</th>
                            <th style={{ width: "400px" }}>Done</th>
                        </tr>
                        <tr>
                            <td>
                                {productsData &&
                                    productsData
                                        .filter((entry) => entry.status === undefined || entry.status === "backlog")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                {
                                    productsData
                                        .filter((entry) => entry.status === "todo")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                {
                                    productsData
                                        .filter((entry) => entry.status === "doing")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                {
                                    productsData
                                        .filter((entry) => entry.status === "test")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                {
                                    productsData
                                        .filter((entry) => entry.status === "done")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} />
                                            )
                                        })
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
            }
        </div>
    );
}

export default Board;
