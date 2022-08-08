import React from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function CollipsibleAcc(props) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === `panel${props.num}`}
        onChange={handleChange(`panel${props.num}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="expand_icon" />}
          aria-controls={`panel${props.num}d-content`}
          id={`panel${props.num}d-header`}
        >
          <Typography className="acc_heading">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.description}</Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
