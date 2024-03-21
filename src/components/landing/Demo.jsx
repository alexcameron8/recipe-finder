import { useState } from "react";
import { Divider } from "@nextui-org/react";

export function Demo() {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-orange-50 pb-7">
      <Divider className="" />
      <div
        id="demo"
        className="flex max-w-screen-xl flex-col items-center justify-center pt-7"
      >
        <h2 className="mb-12 flex justify-center text-3xl font-bold">
          <span className="font-bold text-yellow-400">— &nbsp;</span>Demo Video
        </h2>
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="video/mp4"
          className="px-20"
          src="/assets/temp_demo_video.mp4"
          muted
          loop
          controls={isHovering}
        />
      </div>
    </div>
  );
}
