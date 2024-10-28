import { useEffect, useState } from "react";
import axios from "axios";
import PinnedNote from "../components/PinnedNote";
import DropZone from "../components/DropZone";

function Board() {
    const [dataLoaded, setDataLoaded] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const url = "https://kanban-board-rest-api.up.railway.app/posts";//"https://my-json-server.typicode.com/skyteks/fake-json-rest-api/posts";
    const [isDragging, setIsDragging] = useState(false);
    const [draggedKey, setDraggedKey] = useState(null);
    const [dropzoneKey, setDropzoneKey] = useState(null);
    useEffect(getData, []);

    function getData() {
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

    function patchData(entry) {
        const changes = { status: dropzoneKey };
        console.log(entry.status, " --> ", changes.status);
        axios.patch(url + "/" + entry.id, changes)
            .then((result) => {
                console.log("PATCH", getStatusMeaning(result.status));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                //productsData.at(entry.id).status = dropzoneKey;
                //setProductsData(productsData);
                getData();
            });
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

function getStatusMeaning(statusCode) {
    switch (statusCode) {
        // Informational responses
        case 100: return "Continue";
        case 101: return "Switching Protocols";
        case 102: return "Processing";

        // Successful responses
        case 200: return "OK";
        case 201: return "Created";
        case 202: return "Accepted";
        case 203: return "Non-Authoritative Information";
        case 204: return "No Content";
        case 205: return "Reset Content";
        case 206: return "Partial Content";
        case 207: return "Multi-Status";
        case 208: return "Already Reported";
        case 226: return "IM Used";

        // Redirection messages
        case 300: return "Multiple Choices";
        case 301: return "Moved Permanently";
        case 302: return "Found";
        case 303: return "See Other";
        case 304: return "Not Modified";
        case 305: return "Use Proxy";
        case 306: return "Switch Proxy"; // No longer used
        case 307: return "Temporary Redirect";
        case 308: return "Permanent Redirect";

        // Client error responses
        case 400: return "Bad Request";
        case 401: return "Unauthorized";
        case 402: return "Payment Required";
        case 403: return "Forbidden";
        case 404: return "Not Found";
        case 405: return "Method Not Allowed";
        case 406: return "Not Acceptable";
        case 407: return "Proxy Authentication Required";
        case 408: return "Request Timeout";
        case 409: return "Conflict";
        case 410: return "Gone";
        case 411: return "Length Required";
        case 412: return "Precondition Failed";
        case 413: return "Payload Too Large";
        case 414: return "URI Too Long";
        case 415: return "Unsupported Media Type";
        case 416: return "Range Not Satisfiable";
        case 417: return "Expectation Failed";
        case 418: return "I'm a teapot"; // April Fools' joke in RFC 2324
        case 421: return "Misdirected Request";
        case 422: return "Unprocessable Entity";
        case 423: return "Locked";
        case 424: return "Failed Dependency";
        case 426: return "Upgrade Required";
        case 428: return "Precondition Required";
        case 429: return "Too Many Requests";
        case 431: return "Request Header Fields Too Large";
        case 451: return "Unavailable For Legal Reasons";

        // Server error responses
        case 500: return "Internal Server Error";
        case 501: return "Not Implemented";
        case 502: return "Bad Gateway";
        case 503: return "Service Unavailable";
        case 504: return "Gateway Timeout";
        case 505: return "HTTP Version Not Supported";
        case 506: return "Variant Also Negotiates";
        case 507: return "Insufficient Storage";
        case 508: return "Loop Detected";
        case 510: return "Not Extended";

        default: return "Unknown Status Code";
    }
}