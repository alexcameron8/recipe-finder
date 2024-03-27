import { useState } from "react";
import { Divider } from "@nextui-org/react";
import "../index.css";
export function Demo() {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div className="relative flex flex-col items-center justify-center bg-orange-50 pb-7">
      <Divider className="" />
      <div
        id="demo"
        className="flex max-w-screen-xl flex-col items-center justify-center pb-40 pt-7"
      >
        <h2 className="mb-12 flex justify-center text-3xl font-bold max-sm:text-xl">
          <span className="font-bold text-yellow-400">— &nbsp;</span>Demo Video
        </h2>
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="video/mp4"
          className="px-20 max-sm:px-4"
          src="/assets/temp_demo_video.mp4"
          muted
          loop
          controls={isHovering}
        />
      </div>
      <div className="demo-section-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
