function ErrorRedirect({code}) {
    const url = "/error/" + code;
    return <Navigate replace to={url} />;
}

export default ErrorRedirect;