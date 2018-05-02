import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const PageShell = Page => {
  console.log('animation called');
  return props => (
    <div>
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        // transitionName={props.match.path === '/users/profile' ? "SlideOut" : "SlideIn"}
        transitionName='SlideIn'
      >
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>
  );
};

export default PageShell;
