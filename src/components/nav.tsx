"use client"

import React from "react";
import Container from "./container";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const router = useRouter()
  return (
    <header className="w-full h-20 bg-white border border-gray-200">
      <Container>
        <div className="flex justify-center items-center px-10 py-5 w-full h-20">
          <div className="flex justify-between items-center w-full">
            <button
              className="flex gap-0.5 items-center cursor-pointer "
              onClick={() => router.push("/chat")}
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[23.627px] h-[23.627px]"
                >
                  <path
                    d="M14.6705 15.1082L12.7097 19.2282C12.6726 19.3061 12.6171 19.3738 12.548 19.4255C12.4789 19.4772 12.3983 19.5112 12.313 19.5247C12.2278 19.5383 12.1406 19.5308 12.0589 19.5031C11.9772 19.4754 11.9035 19.4282 11.8441 19.3656L8.70576 16.0527C8.62192 15.9643 8.51026 15.9074 8.38945 15.8915L3.86452 15.2996C3.77903 15.2883 3.69756 15.2564 3.62714 15.2067C3.55672 15.1569 3.49946 15.0908 3.46031 15.0139C3.42115 14.9371 3.40128 14.8519 3.40239 14.7657C3.4035 14.6795 3.42557 14.5948 3.46669 14.519L5.64809 10.5106C5.70608 10.4034 5.72547 10.2796 5.70302 10.1598L4.8675 5.67381C4.85163 5.5889 4.8567 5.50141 4.88225 5.41889C4.90781 5.33638 4.95308 5.26134 5.01416 5.20026C5.07524 5.13918 5.15028 5.0939 5.2328 5.06835C5.31531 5.04279 5.40281 5.03773 5.48772 5.05359L9.97367 5.88912C10.0935 5.91157 10.2173 5.89217 10.3245 5.83418L14.3329 3.65279C14.4088 3.61165 14.4935 3.5896 14.5798 3.58854C14.6661 3.58747 14.7513 3.60743 14.8282 3.64668C14.905 3.68593 14.9711 3.7433 15.0209 3.81383C15.0706 3.88436 15.1024 3.96593 15.1135 4.0515L15.7054 8.57555C15.7213 8.69635 15.7782 8.80802 15.8666 8.89186L19.1795 12.0302C19.2421 12.0896 19.2893 12.1633 19.317 12.245C19.3447 12.3267 19.3522 12.4139 19.3386 12.4991C19.3251 12.5844 19.2911 12.665 19.2394 12.7341C19.1877 12.8032 19.12 12.8587 19.0421 12.8958L14.9221 14.8566C14.8118 14.9091 14.723 14.9979 14.6705 15.1082ZM15.3767 16.8156L16.6295 15.5628L20.3889 19.3213L19.1352 20.575L15.3767 16.8156Z"
                    fill="#3B3B3B"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-medium leading-4 text-neutral-700">
                KeyMap
              </h1>
            </button>
            {/* {project?.data?.title && ( */}
            <div className="w-[466px] text-center justify-center text-[#0d0d0d] text-base font-normal  leading-7">
              {/* {project?.data?.title} */} Generate database Schema
            </div>
            {/* )} */}
            <div className="flex gap-0.5 items-center">
              <Link href={"/dashboard"} className="p-1 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g id="SVG">
                    <path
                      id="Vector"
                      d="M2.5 4.16667H15.8333"
                      stroke="#5D5D5D"
                      strokeWidth="1.66667"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M2.5 10H5.83333"
                      stroke="#5D5D5D"
                      strokeWidth="1.66667"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_3"
                      d="M13.3333 15.8333C15.1743 15.8333 16.6667 14.341 16.6667 12.5C16.6667 10.6591 15.1743 9.16667 13.3333 9.16667C11.4924 9.16667 10 10.6591 10 12.5C10 14.341 11.4924 15.8333 13.3333 15.8333Z"
                      stroke="#5D5D5D"
                      strokeWidth="1.66667"
                    />
                    <path
                      id="Vector_4"
                      d="M15.8335 15L17.5002 16.6667"
                      stroke="#5D5D5D"
                      strokeWidth="1.66667"
                      strokeLinecap="square"
                    />
                    <path
                      id="Vector_5"
                      d="M2.5 15.8333H5.83333"
                      stroke="#5D5D5D"
                      strokeWidth="1.66667"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </Link>
              <div className="flex justify-center items-center p-1 w-10 h-10 rounded-full">
                <div className="flex justify-center items-center p-px w-8 h-8 rounded-full border border-neutral-200">
                  <div className="flex justify-center items-center bg-violet-300 h-[30px] rounded-[788.684px] w-[30px]">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/55add6962fe76ef289b100235d92ffd9586e9f5f"
                      alt="User profile"
                      className="w-[30px] h-[30px] rounded-[749.25px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Nav;
