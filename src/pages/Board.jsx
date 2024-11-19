import { useEffect, useState } from "react";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";
import useAxiosAPI from "../axiosAPI";
import { useNavigate } from "react-router-dom";
import jsonData from "../data/data.json"
import { capitalize } from "../HelperFunctions";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [notesData, setNotesData] = useState([]);
    const [draggedNote, setDraggedNote] = useState(null);
    const [dropzoneInfo, setDropzoneInfo] = useState(null);
    const { getNotes, patchNote } = useAxiosAPI();
    const navigate = useNavigate();
    const { statusTypes } = jsonData;

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setDataLoaded(false);

        const { success, data, statusCode } = await getNotes();
        if (success) {
            setNotesData(data);
        }
        else {
            setDataLoaded(true);
            navigate(("/error/" + statusCode));
            return;
        }
        setDataLoaded(true);
    }

    async function patchData(entry) {
        const changedData = { id: entry.id };
        if (entry.status !== dropzoneInfo) {
            console.log("status:", entry.status, " --> ", dropzoneInfo);
            changedData.status = dropzoneInfo;
        }

        const { success, statusCode } = await patchNote(changedData);
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
        <main>
            <p>loading...</p>
        </main>
    ) : (
        <main>
            <table>
                <tbody>
                    <tr>
                        {statusTypes &&
                            statusTypes.map((status) => {
                                return (
                                    <th>
                                        <h3>{status == "todo" ? "To Do" : capitalize(status)}</h3>
                                    </th>
                                );
                            })
                        }
                    </tr>
                    <tr>
                        {statusTypes &&
                            statusTypes.map((status) => {
                                return (
                                    <td key={`_${status}`}>
                                        <DropZone visible={draggedNote && draggedNote.status != status} info={status} setInfo={setDropzoneInfo} key={`_${status}_dropZone`} />
                                        {notesData &&
                                            notesData
                                                .filter((entry) => entry.status === status)
                                                .map((entry) => {
                                                    return (
                                                        <PinnedNote visible={!draggedNote || draggedNote?.id === entry.id} entry={entry} handleDrag={handleDrag} key={`_${status}_${entry.title}`} />
                                                    );
                                                })
                                        }
                                    </td>
                                );
                            })
                        }

                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default Board;