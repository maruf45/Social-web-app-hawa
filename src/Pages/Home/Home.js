import React, { useContext, useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import { UserInfo } from "../../Context/UserInfoContext/UserInfoContext";
import { toast } from "react-toastify";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [field, setField] = useState([]);
  const [postData, setPostData] = useState([]);
  const { user } = useContext(AuthProvider);
  const { users } = useContext(UserInfo);
  const cancelButtonRef = useRef(null);
  const { name, photoUrl } = users;
  const parseName = name?.split(" ", 2)?.join(" ");
  const handleChange = (event) => {
    setDisabled(event.target.value);
  };
  useEffect(() => {
    if (field?.target?.files) {
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
        .then((data) => {
          const img = data?.data?.url;
          setPreviewImage(img);
        });
    }
  }, [field?.target?.files]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const filed = event.target;
    const postText = filed.postText.value;
    const image = previewImage;
    const postInfo = { email: user?.email, postText, image };
    fetch("http://localhost:5000/usersPost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(`Post Added`);
           setPreviewImage(null)
          filed.reset();
          console.log(data);
        }
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/usersPost`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data)
      });
  }, [postData]);

  return (
    <section className="mx-auto container mt-20 max-[560px]:px-4 container mx-auto rounded-md">

      {user ? (
        <div className=" py-4 px-3">
          <button
            onClick={() => setOpen(true)}
            className="py-4 pl-4 pr-4 text-black placeholder-gray-500 w-[55%] text-left transition-all duration-200 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-orange-600 caret-orange-600"
          >
            What's on your mind
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer">
                          <img
                            className="h-12 w-12 rounded-full shadow-md shadow-orange-400"
                            src={photoUrl}
                            alt=""
                          />
                          <p>{parseName}</p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 "
                          onClick={() => {
                            setOpen(false);
                            setPreviewImage(null);
                          }}
                          ref={cancelButtonRef}
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
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        className="mt-3 text-center"
                      >
                        <div className="mt-2">
                          <textarea
                            className="text-gray-500 w-full h-[250px] py-2 resize-none pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white outline-none  caret-orange-600"
                            placeholder="Whats's on your mind"
                            name="postText"
                            value={disabled}
                            onChange={handleChange}
                            required
                          ></textarea>
                          {previewImage ? (
                            <img
                              src={previewImage}
                              className={`w-full h-[300px] object-cover`}
                              alt=""
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                            <div className="pt-2 pb-3 ">
                            <input
                                type="file"
                                className="d-none"
                                onChange={setField}
                                name=""
                                id="post-img"
                            />
                            <label
                                htmlFor="post-img"
                                className="w-full mb-2 text-center block cursor-pointer disabled:opacity-75 rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                            >
                                Add Photo
                            </label>
                            <button
                                type="submit"
                                disabled={!disabled}
                                className="w-full cursor-pointer disabled:opacity-75 rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                                onClick={() => {setOpen(false)}}
                            >
                                Post
                            </button>
                            </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <main>
        <div className="post">
            {postData.map(post => <>
                <div className="px-4 py-4 border mt-10">
                <div className="mt-10 flex items-center gap-2 cursor-pointer">
                          <img
                            className="h-12 w-12 rounded-full shadow-md shadow-orange-400"
                            src={photoUrl}
                            alt=""
                          />
                          <p>{parseName}</p>
                        </div>
                    <p className="mb-3 mt-5">{`${post.postText.slice(0, 200)}...`}</p>
                    <img className="object-cover rounded-md" src={post.image} alt="" />
                </div>
            </>)}
        </div>
      </main>
    </section>

  );
};

export default Home;
