import { useParams } from "react-router-dom";

function ErrorPage() {

    const { errorId } = useParams();

    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>ERROR {errorId}</h1>
        </div>
    );
}

export default ErrorPage;
