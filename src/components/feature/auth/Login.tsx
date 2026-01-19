export const Login = () => {

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.OAUTH2_BASE_URL;
    }

    return (
        <button onClick={handleGoogleLogin}>Login with Google</button>
    )
}