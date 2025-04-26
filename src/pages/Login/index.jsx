import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
export default function Login() {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
        navigate('/'); // Agar token bo'lsa, admin panelga o'tadi
    }
}, [navigate]);
  const LoginSubmit = (event) => {
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
      .then((response) => response.json())
      .then((item) => {
        console.log(item)
        if (item?.success) {
          toast.success(item?.data?.message)
          localStorage.setItem("accesstoken", item?.data?.access_token)
          localStorage.setItem("refreshtoken", item?.data?.refresh_token)
          navigate("/")
        } else {
          toast.error(item?.message?.message)
        }
      })
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-15 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-950">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={LoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm/6 font-medium text-gray-950">
                Login
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setLogin(e.target.value)}
                  id="login"
                  name="login"
                  type="text"
                  required
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-950">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-950 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
