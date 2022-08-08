import React from "react";
import styles from "../../styles/Download.module.css";
import { useRouter } from "next/dist/client/router";

//Material Ui Imports
import { Container, Grid, Button, Typography } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

//Components Imports
import AllData from "../../src/data/allData.json";
import AccBreadcrumbs from "../../src/components/common/breadcrumbs/AccBreadcrumbs";

const Downloads = (props) => {
  const router = useRouter();
  return (
    <div>
      <AccBreadcrumbs
        breadcrumbs={[
          { routeName: "Home", route: "/" },
          { routeName: "Download", route: "/download" },
        ]}
      />

      <Container className={styles.downloads_outer} maxWidth="lg">
        {AllData.downloads.map((post) => {
          if (post.downloads_section_id == 1)
            return (
              <Grid
                container
                className="container"
                key={post.downloads_section_id.toString()}
              >
                {post.downloadsitem.map((post) => {
                  return (
                    <div className={styles.cards}>
                      <div>
                        <Typography variant="h4" className={styles.card_title}>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ marginTop: "1rem" }}
                        >
                          {post.subtitle}
                        </Typography>
                      </div>

                      <div>
                        <Button
                          variant="outlined"
                          className={styles.button}
                          color="secondary"
                          component="a"
                          onClick={() => router.push(`${post.href}`)}
                        >
                          <CloudDownloadIcon className={styles.icon} /> Download
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </Grid>
            );
        })}
      </Container>
    </div>
  );
};

export default Downloads;
