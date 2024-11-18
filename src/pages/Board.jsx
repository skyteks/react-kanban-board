import { useEffect, useState } from "react";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";
import useAxiosAPI from "../axiosAPI";
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [notesData, setNotesData] = useState([]);
    const url = "http://localhost:3000/mongo";//"https://kanban-board-rest-api.up.railway.app/posts";//"https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";
    const [isDragging, setIsDragging] = useState(false);
    const [draggedKey, setDraggedKey] = useState(null);
    const [dropzoneKey, setDropzoneKey] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const { getNotes, patchNote } = useAxiosAPI();
    const { getToken } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setDataLoaded(false);
        const token = getToken();
        const { success, data, statusCode } = await getNotes(token);
        if (success) {
            setNotesData(data);
            setDataLoaded(true);
        }
        else {
            setDataLoaded(true);
            navigate(("/error/" + statusCode));
        }
    }

    async function patchData(entry) {
        const token = getToken();
        const newStatus = dropzoneKey;
        const requestBody = { data: { status: newStatus } };
        console.log("status:", entry.status, " --> ", newStatus);
        const { success, statusCode } = await patchNote(requestBody, token);
        if (success) {
            getData();
        }
        else {
            navigate(("/error/" + statusCode));
        }
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

    return !dataLoaded ? (
        <main>
            <div>
                <p>loading...</p>
            </div>
        </main>
    ) : (
        <main>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <h3>Authors</h3>
                        </th>
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
                            {usersData &&
                                usersData
                                    .map((entry) => {
                                        return (
                                            <h3 key={entry.username}>{entry.username}</h3>
                                        );
                                    })
                            }
                        </td>
                        <td>
                            <DropZone visible={isDragging && draggedKey != "backlog"} keyName="backlog" setDropzoneKey={setDropzoneKey} />
                            {notesData &&
                                notesData
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
                                notesData
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
                                notesData
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
                                notesData
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
                                notesData
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
        </main>
    );
}

export default Board;