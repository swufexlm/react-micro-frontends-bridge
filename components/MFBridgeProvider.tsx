import * as React from 'react';
import MicroCommonModule from './MicroCommonModule';
import MicroComponents from './MicroComponents';
import MicroComponentContext from './MicroComponentContext';

export interface MFBridgeProviderProps {
    getMicroResources: () => MicroComponents | Promise<MicroComponents>;
    commonModules?: MicroCommonModule[];
}

interface MFBridgeProviderState {
    components: MicroComponents;
}

export default class MFBridgeProvider extends React.PureComponent<
    MFBridgeProviderProps,
    MFBridgeProviderState
> {
    constructor(props: MFBridgeProviderProps) {
        super(props);
        this.state = {
            components: {},
        };
    }

    async componentDidMount() {
        const { getMicroResources, commonModules } = this.props;
        if (commonModules) {
            commonModules.forEach(module =>
                window.MicroResource.define(module),
            );
        }
        const components = await getMicroResources();
        this.setState({ components });
    }

    render() {
        return (
            <MicroComponentContext.Provider
                value={{ MicroComponents: this.state.components }}
            >
                {this.props.children}
            </MicroComponentContext.Provider>
        );
    }
}
