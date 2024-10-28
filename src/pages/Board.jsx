import { useEffect, useState } from "react";
import axios from "axios";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";
import getStatusMeaning from "../HelperFunctions"
import { useNavigate } from "react-router-dom";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const url = "https://kanban-board-rest-api.up.railway.app/posts";//"https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";
    const [isDragging, setIsDragging] = useState(false);
    const [draggedKey, setDraggedKey] = useState(null);
    const [dropzoneKey, setDropzoneKey] = useState(null);
    const navigate = useNavigate();
    useEffect(getData, []);

    function getData() {
        axios.get(url)
            .then((result) => {
                console.log("GET", getStatusMeaning(result.status));
                setProductsData(result.data);
                setDataLoaded(true);
            })
            .catch((error) => {
                console.error("GET", getStatusMeaning(error.status));
                navigate(("/error/" + error.status));
            })
    }

    function patchData(entry) {
        const changes = { status: dropzoneKey };
        console.log(entry.status, " --> ", changes.status);
        axios.patch(url + "/" + entry.id, changes)
            .then((result) => {
                console.log("PATCH", getStatusMeaning(result.status));
                setTimeout(() => {
                    getData();
                }, 1);
            })
            .catch((error) => {
                console.error("PATCH", getStatusMeaning(error.status));
                navigate(("/error/" + error.status));
            })
    }

    function handleDrag(type, entry) {
        switch (type) {
            case "onDragStart":
                setIsDragging(true);
                setDraggedKey(entry.status);
                break;
            case "onDragEnd":
                if (dropzoneKey) {
                    patchData(entry);
                }
                setIsDragging(false);
                setDropzoneKey(null);
                setDraggedKey(null);
                break;
            default:
                return;
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
                                <DropZone visible={isDragging && draggedKey != "backlog"} keyName="backlog" setDropzoneKey={setDropzoneKey} />
                                {productsData &&
                                    productsData
                                        .filter((entry) => entry.status === "backlog")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} handleDrag={handleDrag} />
                                            );
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "todo"} keyName="todo" setDropzoneKey={setDropzoneKey} />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "todo")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} handleDrag={handleDrag} />
                                            );
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "doing"} keyName="doing" setDropzoneKey={setDropzoneKey} />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "doing")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} handleDrag={handleDrag} />
                                            );
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "test"} keyName="test" setDropzoneKey={setDropzoneKey} />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "test")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} handleDrag={handleDrag} />
                                            );
                                        })
                                }
                            </td>
                            <td>
                                <DropZone visible={isDragging && draggedKey != "done"} keyName="done" setDropzoneKey={setDropzoneKey} />
                                {
                                    productsData
                                        .filter((entry) => entry.status === "done")
                                        .map((entry) => {
                                            return (
                                                <PinnedNote entry={entry} key={entry.id} handleDrag={handleDrag} />
                                            );
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