import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfile = ({users}) => {
  const {name, photoUrl, email, phone} = users;
  const [field, setField] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const usersUpdatedData = (event) => {
    event.preventDefault();
    const field = event.target;
    const name = field.name.value;
    const email = field.email.value;
    const phone = field.phone.value;
    const updateProfileInfo = {name, email, phone, photoUrl: previewImage};
    console.log(updateProfileInfo);
    fetch('http://localhost:5000/usersData', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateProfileInfo)
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
        toast.success(
          `Updated Your Profile`
        );
      }
      console.log(data);
    })
  }

  useEffect(() => {
    const photo = field?.target?.files[0];
    const imageKey = "88610f1b26ed57a276b228b81522cce8";
    const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;
    const formData = new FormData();
    formData.append("image", photo);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(data => {
        const img = data?.data?.url;
        setPreviewImage(img);
      })

  }, [field?.target?.files])
  
  
  return (
    <>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8 shadow-md pb-24 px-5 rounded-md">
          <div className="mb-8  flex justify-between items-center  py-2 px-3">
            <p className="text-2xl font-bold">Update Profile</p>
            <p className="hover:cursor-pointer py-3 px-4 rounded-full hover:bg-orange-500 hover:text-white transition ease-in-out delay-150 border">
              Edit
            </p>
          </div>
          <form onSubmit={usersUpdatedData}>
            <div className="md:flex md:items-center md:space-x-14">
              <div className="relative flex-shrink-0 w-48 h-48">
                <div className="absolute w-48 h-48 bg-gray-300 rounded-full -bottom-2 -right-1"></div>
                {previewImage ?
                
                <img
                    className="relative object-cover w-48 h-48 rounded-full"
                  src={previewImage}
                  alt=""
                />
                : 
                <img
                  className="relative object-cover w-48 h-48 rounded-full"
                  src={photoUrl}
                  alt=""
                />
              }
              <label htmlFor="img-btn" className="border py-[8px] px-[15px] block text-center w-max cursor-pointer mx-auto rounded-lg mt-5">Edit Profile</label>
                <input type='file' id="img-btn" name='fileUpload' onChange={setField} className="d-none" />
              </div>

              <div className="mt-10 md:mt-0">
                <label className="font-bold text-slate-900" htmlFor="Name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="rounded-full my-2.5 w-full py-1.5 pl-3.5  pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-orange-600 caret-orange-600"
                  defaultValue={name}
                  required
                />
                <label className="font-bold text-slate-900" htmlFor="Name">
                  Email Address {`(Email is not editable)`}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="rounded-full my-2.5 w-full py-1.5 pl-3.5  pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-orange-600 caret-orange-600"
                  defaultValue={`${email}`}
                  disabled
                />
                <label className="font-bold text-slate-900" htmlFor="Name">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter your number"
                  className="block rounded-full my-2.5 w-full py-1.5 pl-3.5  pr-1 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-orange-600 caret-orange-600"
                  defaultValue={phone}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">

            <button type="submit" className="border py-[8px] px-[15px] block rounded-lg mt-5">Save</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;
