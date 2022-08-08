import { Container } from '@material-ui/core';
import React from 'react';
import styles from '../../../styles/componentStyles/ProductHighlight.module.css';





const ProductHighlight = (props) => {
  return (
    <Container maxWidth="lg">
      <div className={styles.parent_container}>
      {props.highlights.map((highlight,i)=>(
        <div className={styles.child_container} key={i}>
          <div className={styles.highlight_icon_outer}>
          <img src={highlight.image} alt="highlight-image" className={styles.highlight_icon} />
          </div>
        <p className={styles.highlight_text}>{highlight.label}</p>
        </div>
      ))}
      </div>
      
    </Container>
  )
}

export default ProductHighlight

