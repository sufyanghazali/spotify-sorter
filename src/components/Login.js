import "../index.css";

const Login = () => {
  return (
    <div className="login w-full p-4">
      <main class="flex flex-col h-screen items-center justify-center text-white">
        <h1 className="inline-block text-9xl font-bold mb-8">Sortify</h1>

        <div>
          <a
            className="inline-block py-2 px-4 rounded-full bg-spotify text-xl"
            href="https://10v703cbx8.execute-api.ap-southeast-2.amazonaws.com/test/auth"
          >
            Login with Spotify
          </a>
        </div>
      </main>
    </div>
  );
};

export default Login;
