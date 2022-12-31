import React, { useContext } from "react";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthProvider);
  return (
    <>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 shadow-md pb-24 px-5 rounded-md">
          <div className="mb-8  flex justify-between items-center  py-2 px-3">
            <p className="text-2xl font-bold">My Profile</p>
            <p className="hover:cursor-pointer py-3 px-4 rounded-full hover:bg-orange-500 hover:text-white transition ease-in-out delay-150 border">
              Edit
            </p>
          </div>
          <div className="md:flex md:items-center md:space-x-14">
            <div className="relative flex-shrink-0 w-48 h-48">
              <div className="absolute w-48 h-48 bg-gray-300 rounded-full -bottom-2 -right-1"></div>
              <img
                className="relative object-cover w-48 h-48 rounded-full"
                src={user?.photoURL}
                alt=""
              />
            </div>

            <div className="mt-10 md:mt-0">
              <label className="font-bold text-slate-900" htmlFor="Name">
                Full Name
              </label>
              <p className="text-lg  text-black mb-2.5 text-slate-800">
                {user?.displayName}
              </p>
              <label className="font-bold text-slate-900" htmlFor="Name">
                Email Address
              </label>
              <p className="mt-1 text-base text-black text-slate-800 mb-2.5">{user?.email}</p>
              <label className="font-bold text-slate-900" htmlFor="Name">
                Phone Number
              </label>
              <p className="mt-1 text-base text-black text-slate-800">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
