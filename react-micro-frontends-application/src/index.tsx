import * as React from "react";
import * as ReactDOM from "react-dom";
// import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
// registerServiceWorker();

class Module extends React.Component {
  render() {
    return <div>Module 2</div>;
  }
}

const render = (node: HTMLElement) => {
  ReactDOM.render(<Module />, node);
};

const app = (window["app"] = window["app"] || {});
app.module2 = render;
