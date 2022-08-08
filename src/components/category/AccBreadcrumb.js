import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from 'next/link'

import styles from '../../../styles/componentStyles/CategoryBreadcrumb.module.css';
import { Container } from '@material-ui/core';




export default function ActiveLastBreadcrumb(props) {
  return (
    <div className={styles.breadcrumb_container}>
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href={props.href} >
            <a>
              {props.label}
            </a>
          </Link>
        </Breadcrumbs>
      </Container>
    </div>
  );
}