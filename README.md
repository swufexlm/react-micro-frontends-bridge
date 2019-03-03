# react-micro-frontends-bridge

[![npm package](https://img.shields.io/npm/v/react-micro-frontends-bridge.svg?style=flat-square)](https://www.npmjs.org/package/react-micro-frontends-bridge)

## Introduction

A simple react-micro-frontends implement of [MeiTuan's solution](https://tech.meituan.com/2018/09/06/fe-tiny-spa.html)

## Install & Usage

You need to install `react-micro-frontends-bridge` in **both** `portal project` and `micro-application project`.

```
$ npm install react-micro-frontends-bridge --save
```

or

```
$ yarn add react-micro-frontends-bridge
```

### In your portal project

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MicroComponents from 'react-micro-frontends-bridge/lib/MicroComponents';
import {
    MFBridgeConsumer,
    MFBridgeProvider,
} from 'react-micro-frontends-bridge';

interface APPState {
    app: string;
}

export default class APP extends React.Component<any, APPState> {
    constructor(props: any) {
        super(props);
        this.state = {
            app: 'Application1',
        };
    }

    getMicroResources = async () => {
        return await new Promise<MicroComponents>(resolve => {
            window.setTimeout(() => {
                resolve({
                    Application1: 'http://localhost:62000/app1.js',
                    Application2: 'http://localhost:62000/app2.js',
                });
            }, 1000);
        });
    };

    render() {
        return (
            <MFBridgeProvider
                getMicroResources={this.getMicroResources}
                commonModules={[
                    {
                        name: 'react',
                        context: require.context(
                            'react',
                            true,
                            /^.\/(lib\/)?[^\/]+\.js$/,
                        ),
                    },
                    {
                        name: 'react-dom',
                        context: require.context(
                            'react-dom',
                            true,
                            /^.\/index\.js$/,
                        ),
                    },
                ]}
            >
                <div>
                    <button
                        onClick={() => this.setState({ app: 'Application1' })}
                    >
                        Goto Application1
                    </button>
                    <button
                        onClick={() => this.setState({ app: 'Application2' })}
                        style={{
                            marginLeft: 30,
                        }}
                    >
                        Goto Application2
                    </button>
                    <div
                        style={{
                            margin: 100,
                            padding: 100,
                            border: '1px solid #ddd',
                        }}
                    >
                        <MFBridgeConsumer name={this.state.app} />
                    </div>
                </div>
            </MFBridgeProvider>
        );
    }
}

ReactDOM.render(<APP />, document.getElementById('root'));
```

### In your micro-application project

Application1:

```tsx
import * as React from 'react';
import { register } from 'react-micro-frontends-bridge';

class Application1 extends React.Component {
    render() {
        return <div>Application 1</div>;
    }
}

register('Application1', <Application1 />);
```

Application1:

```tsx
import * as React from 'react';
import { register } from 'react-micro-frontends-bridge';

class Application2 extends React.Component {
    render() {
        return <div>Application 2</div>;
    }
}

register('Application2', <Application2 />);
```
