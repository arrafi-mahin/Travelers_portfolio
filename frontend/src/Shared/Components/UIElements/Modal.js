import React, { Fragment } from "react";

import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./Modal.css";

function ModalOverLay(props) {
  const content = (
    <div className={`modal ${props.classname}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook"));
}

function Modal(props) {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverLay {...props} />
      </CSSTransition>
    </Fragment>
  );
}

export default Modal;
