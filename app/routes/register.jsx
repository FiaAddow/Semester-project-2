import { useNavigate } from "react-router";
import { useState } from "react";

export function meta({ }) {
  return [
    { title: "New React Router Apps" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Register() {
  const [error, setError] = useState("")

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make an api call to authenticate the user
    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
          venueManager: true,
        }),
      });

      const res = await response.json();

      if (response.status === 201) {
        localStorage.setItem("token", res.data.accessToken);

        // Remove accessToken from user data before storing
        delete res.data.accessToken
        localStorage.setItem("user", JSON.stringify(res.data));


        // Redirect to listings page after successful login
        navigate("/listings");
      } else {
        console.log("Error res", res);
        setError(res.errors[0].message);
        throw new Error(res.errors[0].message);
      }

    } catch (error) {
      console.log("Error during login:", error);
    }
  }

  return (
    <div className="h-100vh">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-fairy-5">Register your account</h2>
        </div>

        <div className="mt-10 bg-white p-8 rounded-2xl sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="text" className="block text-sm/6 font-medium text-fairy-5">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder=""
                  className="block w-full rounded-md bg-fairy-3/10 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-fairy-3 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-fairy-5">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@stud.noroff.com"
                  className="block w-full rounded-md bg-fairy-3/10 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-fairy-3 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-fairy-3/10 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-fairy-3 sm:text-sm/6"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-fairy-3 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-fairy-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
