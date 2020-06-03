import React from 'react';
import Draggable from "react-draggable";

export default function DivComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <div {...props} />
      </Draggable>
    );
}