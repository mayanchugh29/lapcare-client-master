import React from "react";
import Image from "next/image";

const dhamakaluckydraw = () => {
  return (
    <div style={{ minHeight: "40vh", marginBottom: "28px" }}>
      <Image
        src="https://lapcare-static.s3.ap-south-1.amazonaws.com/3-10-%20New%20%2818-May-2022%29.jpg"
        height={840}
        width={1920}
        alt="banner"
        layout="responsive"
      ></Image>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe
          width="720"
          height="315"
          src="https://www.youtube.com/embed/O_NQ_l37Mek"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default dhamakaluckydraw;
