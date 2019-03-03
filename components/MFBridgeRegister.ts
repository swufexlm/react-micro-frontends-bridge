import * as ReactDOM from 'react-dom';

export default function register(
    name: string,
    component: React.ReactElement<any>,
) {
    window.MicroResource.registerComponent(name, element =>
        ReactDOM.render(component, element),
    );
}
