import { useParams } from "react-router-dom";
import { getStatusMeaning } from "../HelperFunctions"

function ErrorPage() {
    const { errorId } = useParams();
    const code = Number(errorId);
    const [status, meaning] = getStatusMeaning(code);

    return (
        <main style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div>
                <h1>ERROR {code}</h1>
                <h2>{status}</h2>
                <h3>{meaning}</h3>
            </div>
        </main>
    );
}

export default ErrorPage;