import * as React from 'react';
import MicroComponents from './MicroComponents';
import MicroComponentContext from './MicroComponentContext';

interface MFComponentProps extends MFBridgeConsumerProps {
    components: MicroComponents;
}

class MFComponent extends React.PureComponent<MFComponentProps> {
    private node: HTMLDivElement;

    private loadModule = (url: string, callback: () => void) => {
        if (url) {
            const script = document.createElement('script');
            script.src = url;
            script.onload = callback;
            document.body.appendChild(script);
        }
    };

    componentDidMount() {
        const { name, components } = this.props;
        const { MicroResource } = window;
        if (MicroResource.containsComponent(name)) {
            MicroResource.render(name, this.node);
        } else {
            this.loadModule(components[name], () => {
                if (MicroResource.containsComponent(name)) {
                    MicroResource.render(name, this.node);
                }
            });
        }
    }

    render() {
        const { className, style, loading } = this.props;
        return (
            <div
                ref={node => (this.node = node as any)}
                className={className}
                style={style}
            >
                {loading}
            </div>
        );
    }
}

export interface MFBridgeConsumerProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: React.ReactNode;
}

export default class MFBridgeConsumer extends React.PureComponent<
    MFBridgeConsumerProps
> {
    static contextTypes: {
        MicroComponents: MicroComponents[];
    };

    render() {
        return (
            <MicroComponentContext.Consumer>
                {value => (
                    <MFComponent
                        key={
                            this.props.name +
                            '@' +
                            value.MicroComponents[this.props.name]
                        }
                        {...this.props}
                        components={value.MicroComponents}
                    />
                )}
            </MicroComponentContext.Consumer>
        );
    }
}
