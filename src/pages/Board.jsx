import { useEffect, useState } from "react";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";
import useAxiosAPI from "../axiosAPI";
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import jsonData from "../data/data.json"
import { capitalize } from "../HelperFunctions";
import "./Board.css";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [notesData, setNotesData] = useState([]);
    const [draggedNote, setDraggedNote] = useState(null);
    const [dropzoneInfo, setDropzoneInfo] = useState(null);
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

        const [getNodesResult, getUsernamesResult] = await Promise.all([getNotes(token), getUsernames(token)]);

        {
            const { success, data, statusCode } = getNodesResult;
            if (success) {
                setNotesData(data);
            }
            else {
                setDataLoaded(true);
                navigate(("/error/" + statusCode));
                return;
            }
        }

        {
            const { success, data, statusCode } = getUsernamesResult;
            if (success) {
                setUsersData(data);
            }
            else {
                setDataLoaded(true);
                navigate(("/error/" + statusCode));
                return;
            }
        }
        setDataLoaded(true);
    }

    async function patchData(entry) {
        const token = getToken();
        const changedData = { _id: entry._id };
        if (entry.status !== dropzoneInfo.status) {
            console.log("status:", entry.status, " --> ", dropzoneInfo.status);
            changedData.status = dropzoneInfo.status;
        }
        if (entry.author !== dropzoneInfo.user_id) {
            console.log("author:", entry.author, " --> ", dropzoneInfo.user_id);
            changedData.author = dropzoneInfo.user_id;
        }
        const requestBody = { data: changedData };

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
                setDraggedNote(entry);
                break;
            case "onDragEnd":
                if (dropzoneInfo) {
                    patchData(entry);
                }
                setDraggedNote(null);
                setDropzoneInfo(null);
                break;
            default:
                return;
        }
    }

    return !dataLoaded ? (
        <main id="Board" className="loading">
            <p>loading...</p>
        </main>
    ) : (
        <main id="Board">
            <table>
                <tbody>
                    <tr>
                        <th key={"author"}>
                            <h3>Authors</h3>
                        </th>
                        {statusTypes &&
                            statusTypes.map((status) => {
                                return (
                                    <th key={status}>
                                        <h3>{status == "todo" ? "To Do" : capitalize(status)}</h3>
                                    </th>
                                );
                            })
                        }
                    </tr>
                    {usersData &&
                        usersData
                            .map((user) => {
                                return (
                                    <tr key={user.username}>
                                        <td key={`${user.username}_author}`}>
                                            <h3>{user.username}</h3>
                                        </td>
                                        {statusTypes &&
                                            statusTypes.map((status) => {
                                                return (
                                                    <td key={`${user.username}_${status}`}>
                                                        <DropZone hide={!draggedNote || (draggedNote.status == status && draggedNote.author == user._id)} info={{ status, user_id: user._id }} setInfo={setDropzoneInfo} key={`${user.username}_${status}_dropZone`} />
                                                        {notesData &&
                                                            notesData
                                                                .filter((entry) => entry.author === user._id && entry.status === status)
                                                                .map((entry) => {
                                                                    return (
                                                                        <PinnedNote hide={draggedNote && draggedNote?._id !== entry._id} entry={entry} handleDrag={handleDrag} key={`${user.username}_${status}_${entry.title}`} />
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