import { useThemeContext } from "../context/ThemeContextProvider";
import "./AboutPage.css";

function AboutPage() {
    const { theme } = useThemeContext();

    return (
        <main className={theme}>
            <h2>Introduction</h2>
            <p>This is a little kanban-board web-app made with React.js, to be used for planning.</p>

            <h2>Setup</h2>
            <ul>
                <li>Fork the repo</li>
                <li>Clone the repo</li>
            </ul>
            <div className="code-block">
                <pre><code>
                    <p>
                        cd react-kanban-board
                    </p>
                    <p>
                        npm install
                    </p>
                    <p>
                        npm run dev
                    </p>
                </code></pre>
            </div>

            <h2>Source</h2>
            <p>React App Repo: <a href="https://github.com/skyteks/react-kanban-board" target="_blank">https://github.com/skyteks/react-kanban-board</a></p>
            <p>JSON Server Backend Repo: <a href="https://github.com/skyteks/json-server-backend" target="_blank">https://github.com/skyteks/json-server-backend</a></p>
            <p>Railway Backend Server: <a href="https://kanban-board-rest-api.up.railway.app/" target="_blank">https://kanban-board-rest-api.up.railway.app/posts</a></p>

            <h2>Credits</h2>
            <ul>
                <li>IRONHACK</li>
                <li>Daniel Emig</li>
            </ul>
        </main>
    );
}

export default AboutPage;