import React, { useContext } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import { UserInfo } from "../../Context/UserInfoContext/UserInfoContext";
const Home = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthProvider);
  const { users } = useContext(UserInfo);
  const {name, photoUrl} = users;
  const parseName = name.split(' ', 2).join(' ');
  const cancelButtonRef = useRef(null);
  return (
    <section className="mx-auto container mt-20 max-[560px]:px-4 container mx-auto rounded-md">
      {user ? (
        <div className="shadow-md shadow-orange-100 py-4 px-3">
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
                            <img className="h-12 w-12 rounded-full shadow-md shadow-orange-400" src={photoUrl} alt="" />
                            <p>{parseName}</p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 "
                          onClick={() => setOpen(false)}
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
                      <form className="mt-3 text-center">
                        <div className="mt-2">
                          <textarea
                            className="text-gray-500 w-full h-[250px] py-2 resize-none pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white outline-none  caret-orange-600"
                            placeholder="Whats's on your mind"
                            required
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="px-4 pb-3 ">
                      <button
                        type="button"
                        className="w-full rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        Post
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </section>
  );
};

export default Home;
