import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const { SignIn, googlePopUp } = useContext(AuthProvider);
  const navigate = useNavigate();
  const locations = useLocation();
  const form = locations?.state?.form.pathName || '/';
  const formSubmit = (event) => {
    event.preventDefault();
    const formName = event.target;
    const email = formName.email.value;
    const password = formName.password.value;
    SignIn(email, password)
      .then((userinfo) => {
        const user = userinfo.user;
        toast.success(`Welcome Back ${user.displayName}`);
        formName.reset();
        navigate(form, {replace: true});
      })
      .catch((error) => {
        toast.error(`Oops!! Something went wrong`);
        console.log(error.message);
      });
  };
  const SignInWithGoogle = () => {
    googlePopUp()
      .then((userinfo) => {
        const user = userinfo.user;
        toast.success(`Welcome Back ${user.displayName}`);
        navigate(form, {replace: true});
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Welcome Back!
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Sign In to your account
            </p>
          </div>

          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <form onSubmit={formSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>

                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter email to get started"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-orange-600 caret-orange-600"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>

                        <Link
                          to="#"
                          title=""
                          className="text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline"
                        >
                          {" "}
                          Forgot password?{" "}
                        </Link>
                      </div>
                      <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            />
                          </svg>
                        </div>

                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-orange-600 caret-orange-600"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-700"
                      >
                        Sign In to your account
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-base text-gray-600">
                        Don???t have an account?{" "}
                        <Link
                          to="/sign-up"
                          title=""
                          className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                        >
                          Create a free account
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
                <div className="mt-3 space-y-3">
                  <button
                    onClick={SignInWithGoogle}
                    type="button"
                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                  >
                    <div className="absolute inset-y-0 left-0 p-4">
                      <svg
                        className="w-6 h-6 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </div>
                    Sign In with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
