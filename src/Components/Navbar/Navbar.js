import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, SignOut } = useContext(AuthProvider);
  const [navClose, setNavClose] = useState(true);
  const signOut = () => {
    SignOut().then(() => {});
  };
  const pathName = [{id: '649846', name: "Home", path: "/" }];

  if (user?.uid) {
    const elements = [
      { id: '64675754',name: "My Post", path: "/my-post" },
      { id: '654654654',name: "My Profile", path: "my-profile" },
    ];
    
    pathName.push(...elements);
  }
  const LoginPath = [
    {id: '64562165', name: "Sign In", path: "/sign-in" },
    {id: '324541021', name: "Sign Up", path: "/sign-up" },
  ];
  return (
    <>
      <header>
        {/* <!-- lg+ --> */}
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                {pathName.map((name) => (
                  <React.Fragment key={name.id}>
                    <Link to={name.path} >
                      {name.name}
                    </Link>
                  </React.Fragment>
                ))}
              </div>

              <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                <div className="flex-shrink-0">
                  <Link to="/" className="text-3xl bold">
                    Hawa
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNavClose(false)}
                className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              {user?.uid ? (
                <button onClick={signOut}>Sign Out</button>
              ) : (
                <div className="hidden lg:flex lg:items-center lg:space-x-10">
                  {LoginPath.map((loginPath) => (
                    <React.Fragment key={loginPath.id}>
                      <Link to={loginPath.path}>
                        {loginPath.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* <!-- xs to lg --> */}
        <nav className={`${navClose ? `d-none` : ''} py-4 bg-white lg:hidden`}>
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Menu
              </p>

              <button
                type="button"
                onClick={() => setNavClose(true)}
                className={`inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              <div className="flex flex-col space-y-2">
                {pathName.map((name) => (
                  <React.Fragment key={name.id}>
                    <Link to={name.path}> {name.name}</Link>
                  </React.Fragment>
                ))}{" "}
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex flex-col space-y-2">
                {LoginPath.map((loginPath) => (
                  <>
                    <Link to={loginPath.path} key={loginPath.id}>
                      {loginPath.name}
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
