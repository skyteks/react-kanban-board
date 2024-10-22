import { useEffect, useState } from "react";
import axios from "axios";
import PinnedNote from "../components/PinnedNote";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const url = "https://kanban-board-rest-api.up.railway.app/posts";//"https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";

    useEffect(getData, []);

    function getData() {
        if (true) {
            axios.get(url)
                .then((result) => {
                    setProductsData(result.data);
                    setDataLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                });
        }
        else {
            fetch(url)
                .then((result) => {
                    console.log(result);
                    return result.json();
                })
                .then((result) => {
                    setProductsData(result);
                    setDataLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                });
            
        }
    }

    return (
        <main>
            {!dataLoaded ? (
                <div>
                    <p>loading...</p>
                </div>
            ) : (
                <table>
                    <tbody>
                        <tr>
                            <th style={{ width: "20%" }}>Backlog</th>
                            <th style={{ width: "20%" }}>To Do</th>
                            <th style={{ width: "20%" }}>Doing</th>
                            <th style={{ width: "20%" }}>Test</th>
                            <th style={{ width: "20%" }}>Done</th>
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
        </main>
    );
}

export default Board;
