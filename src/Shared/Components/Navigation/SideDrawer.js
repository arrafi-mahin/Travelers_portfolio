import React from "react";
// import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
function SideDrawer(props) {
  // const content = "props.children";
  return (
    <aside onClick={props.onClick} className="side-drawer">
      {props.children}
    </aside>
    // <CSSTransition
    //   in={props.whow}
    //   timeout={200}
    //   classNames="slide-in-left"
    //   mountOnEnter
    //   unmountOnExit
    // >
    //   <aside className="side-drawer">{content}</aside>;
    // </CSSTransition>
  );
}

export default SideDrawer;
