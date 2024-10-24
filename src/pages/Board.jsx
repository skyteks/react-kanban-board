import { useEffect, useState } from "react";
import axios from "axios";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const url = "https://kanban-board-rest-api.up.railway.app/posts";//"https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";
    const [isDragging, setIsDragging] = useState(true);
    const [draggedKey, setDraggedKey] = useState(null);
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
                            <th>
                                <h3>Backlog</h3>
                            </th>
                            <th>
                                <h3>To Do</h3>
                            </th>
                            <th>
                                <h3>Doing</h3>
                            </th>
                            <th>
                                <h3>Test</h3>
                            </th>
                            <th>
                                <h3>Done</h3>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "backlog"} keyName="backlog" />
                                {productsData &&
                                    productsData
                                        .filter((entry) => entry.status === undefined || entry.status === "backlog")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} isDragging={isDragging} setIsDragging={setIsDragging} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "todo"} keyName="todo" />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "todo")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} isDragging={isDragging} setIsDragging={setIsDragging} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "doing"} keyName="doing" />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "doing")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} isDragging={isDragging} setIsDragging={setIsDragging} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "test"} keyName="test" />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "test")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} isDragging={isDragging} setIsDragging={setIsDragging} />
                                            )
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "done"} keyName="done" />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "done")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} isDragging={isDragging} setIsDragging={setIsDragging} />
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
