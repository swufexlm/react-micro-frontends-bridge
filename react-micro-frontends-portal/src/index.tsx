import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

const module1Address = 'http://localhost:62000/module1.js';
const module2Address = 'http://localhost:62000/module2.js';

const app = (window['app'] = window['app'] || {});

app.modules = {} as any;
app.define = (name: any, context: any, index: any) => {
    const keys = context.keys();
    for (const key of keys) {
        const parts = (name + key.slice(1)).split('/');
        let dir = app.modules;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!dir.hasOwnProperty(part)) {
                dir[part] = {};
            }
            dir = dir[part];
        }
        dir[parts[parts.length - 1]] = context.bind(context, key);
    }
    if (index != null) {
        app.modules[name]['index.js'] = app.modules[name][index];
    }
};

app.require = (request: any) => {
    return app.modules[request]['index.js']();
};

app.define(
    'react',
    require['context']('react', true, /^.\/(lib\/)?[^\/]+\.js$/)
);
app.define(
    'react-dom',
    require['context']('react-dom', true, /^.\/index\.js$/)
);

const loadModule = (address: string, callback: () => void) => {
    const script = document.createElement('script');
    script.src = address;
    script.onload = callback;
    document.body.appendChild(script);
};

class Portal extends React.Component<any, any> {
    private root: HTMLDivElement;
    private module?: string;

    private loadModule1 = () => {
        if (!app.module1) {
            loadModule(module1Address, () => {
                app.module1(this.root);
                this.module = 'module1';
            });
        } else {
            app.module1(this.root);
            this.module = 'module1';
        }
    };

    private loadModule2 = () => {
        if (!app.module2) {
            loadModule(module2Address, () => {
                app.module2(this.root);
                this.module = 'module2';
            });
        } else {
            app.module2(this.root);
            this.module = 'module2';
        }
    };

    private handleSwitch = () => {
        if (this.module === 'module1') {
            this.loadModule2();
        } else if (this.module === 'module2') {
            this.loadModule1();
        } else {
            this.loadModule1();
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.handleSwitch}>切换</button>
                <div ref={node => (this.root = node as any)} />
            </div>
        );
    }
}

ReactDOM.render(<Portal />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
