import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from 'next/link'

import styles from '../../../../styles/componentStyles/Breadcrumb.module.css';
import { Container } from '@material-ui/core';


export default function ActiveLastBreadcrumb(props) {
  return (
    <div className={styles.breadcrumb_container}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          {props.breadcrumbs.map(data => (
            <Link href={data.route} className={styles.breadcrumbs} key={data.route}><a className={styles.breadcrumbs}>{data.routeName}</a>
            </Link>
          ))}
        </Breadcrumbs>
      </Container>
    </div>
  );
}