import { useParams } from "react-router-dom";

function ErrorPage() {

    const { errorId } = useParams();

    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>ERROR {errorId}</h1>
        </main>
    );
}

export default ErrorPage;
