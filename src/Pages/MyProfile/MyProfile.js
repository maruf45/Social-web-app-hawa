import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const MyProfile = () => {
  const { user } = useContext(AuthProvider);
  const [edit, setEdit] = useState(true);
  const [users, setUsers] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/usersData?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, [user?.email]);
  return (
    <>
      {edit ? (
        <section className="pt-10 bg-white sm:py-16 lg:py-24">
          <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 shadow-md pb-24 px-5 shadow-orange-100 rounded-md">
            <div className="flex justify-between items-center px-3">
              <p className="text-2xl font-bold">My Profile</p>
              <p
                onClick={() => setEdit(false)}
                className="hover:cursor-pointer  mr-4 py-2 px-4
                rounded-full border-0
                text-sm font-semibold
                bg-orange-50 text-orange-700
                hover:bg-orange-100"
              >
                Edit
              </p>
            </div>
            <hr className="mt-2 mb-6 border border-orange-200 px-3"></hr>
            <div className=" md:flex md:items-center md:space-x-14">
              <div className="relative max-[768px]:mx-auto flex-shrink-0 w-48 h-48">
                <div className="absolute  w-48 h-48 shadow-orange-300 rounded-full -bottom-1 -right-2 shadow-xl scale-90"></div>
                <img
                  className="relative object-cover w-48 h-48 rounded-full"
                  src={users?.photoUrl}
                  alt=""
                />
              </div>

              <div className="mt-[75px] md:mt-10">
                <label className="font-bold  w-full  text-slate-900" htmlFor="Name">
                  Full Name
                </label>
                <p className="text-lg  w-full  text-black mb-2.5 text-slate-800">
                  {users?.name}
                </p>
                <label className="font-bold w-full  text-slate-900" htmlFor="Name">
                  Email Address
                </label>
                <p className="mt-1 text-base  w-full text-black text-slate-800 mb-2.5">
                  {users?.email}
                </p>
                <label className="font-bold  w-full text-slate-900" htmlFor="Name">
                  Phone Number
                </label>
                <p className="mt-1 text-base  w-full text-black text-slate-800">
                  {users?.phone}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <UpdateProfile setEdit={setEdit} users={users} />
      )}
    </>
  );
};

export default MyProfile;
