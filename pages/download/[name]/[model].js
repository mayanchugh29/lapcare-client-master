import { Container, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

const Driver = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(
      "https://lapcare-static.s3.ap-south-1.amazonaws.com/Lapcare.%5B20220520%5D%20%281%29.exe"
    );
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h4" align="center">
        Your Driver is getting downloaded !
      </Typography>
      <br />
      <Typography variant="h6" align="center">
        Please check your Downloads
      </Typography>
    </Container>
  );
};

export default Driver;
