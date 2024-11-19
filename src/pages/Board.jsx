import { useEffect, useState } from "react";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";
import useAxiosAPI from "../axiosAPI";
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import jsonData from "../data/data.json"

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [notesData, setNotesData] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedKey, setDraggedKey] = useState(null);
    const [dropzoneKey, setDropzoneKey] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const { getNotes, patchNote, getUsernames } = useAxiosAPI();
    const { getToken } = useUserContext();
    const navigate = useNavigate();
    const { statusTypes } = jsonData;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setDataLoaded(false);
        const token = getToken();
        {
            const { success, data, statusCode } = await getNotes(token);
            if (success) {
                setNotesData(data);
            }
            else {
                setDataLoaded(true);
                navigate(("/error/" + statusCode));
            }
        }
        {
            const { success, data, statusCode } = await getUsernames(token);
            if (success) {
                setUsersData(data);
            }
            else {
                setDataLoaded(true);
                navigate(("/error/" + statusCode));
            }
        }


        setDataLoaded(true);
    }

    async function patchData(entry) {
        const token = getToken();
        const newStatus = dropzoneKey;
        const requestBody = { data: { _id: entry._id, status: newStatus } };
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
                    {usersData &&
                        usersData
                            .map((user) => {
                                return (
                                    <tr key={user.username}>
                                        <td key={user.username + "_author"}>
                                            <h3>{user.username}</h3>
                                        </td>
                                        {statusTypes &&
                                            statusTypes.map((status) => {
                                                return (
                                                    <td key={user.username + "_" + status}>
                                                        <DropZone visible={!isDragging && draggedKey != status} keyName={status} setDropzoneKey={setDropzoneKey} key={status + "_" + user.username + "_dropZone"}/>
                                                        {notesData &&
                                                            notesData
                                                                .filter((entry) => entry.author === user._id)
                                                                .filter((entry) => entry.status === status)
                                                                .map((entry) => {
                                                                    return (
                                                                        <PinnedNote visible={!isDragging} entry={entry} key={status + "_" + user.username + "_" + entry.title} handleDrag={handleDrag} />
                                                                    );
                                                                })
                                                        }
                                                    </td>
                                                );
                                            })
                                        }

                                    </tr>
                                );
                            })
                    }
                </tbody>
            </table>
        </main>
    );
}

export default Board;