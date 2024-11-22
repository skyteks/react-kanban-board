import "./AboutPage.css";

function AboutPage() {

    return (
        <main id="about-page">
            <h2>Introduction</h2>
            <p>This is a little kanban-board web-app made with React.js, to be used for planning.</p>

            <h2>Setup</h2>
            <ul>
                <li>Fork the repo</li>
                <li>Clone the repo</li>
            </ul>
            <div className="code-block">
                <pre><code>
                    <p>cd react-kanban-board</p>
                    <p>npm install</p>
                    <p>npm run dev</p>
                </code></pre>
            </div>

            <h2>Source</h2>
            <p>
                <span>React App Repo: </span>
                <a href="https://github.com/skyteks/react-kanban-board" target="_blank">https://github.com/skyteks/react-kanban-board</a>
            </p>
            <p>
                <span>Express Server Backend Repo: </span>
                <a href="https://github.com/skyteks/express-server" target="_blank">https://github.com/skyteks/express-server</a>
            </p>

            <h2>Credits</h2>
            <ul>
                <li>IRONHACK</li>
                <li>Daniel Emig</li>
            </ul>
        </main>
    );
}

export default AboutPage;