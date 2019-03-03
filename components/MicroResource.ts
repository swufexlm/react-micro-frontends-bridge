import MicroCommonModule from './MicroCommonModule';

declare global {
    interface Window {
        MicroResource: MicroResource;
    }
}

const ENTRY = 'index.js';

export default class MicroResource {
    private modules = {};
    private components: {
        [name: string]: (element: HTMLElement) => void;
    } = {};

    public inited = true;

    public define = (module: MicroCommonModule) => {
        const { name, context, entry } = module;
        const keys = context.keys();
        for (const key of keys) {
            const parts = (name + key.slice(1)).split('/');
            let dir = this.modules;
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!dir.hasOwnProperty(part)) {
                    dir[part] = {};
                }
                dir = dir[part];
            }
            dir[parts[parts.length - 1]] = context.bind(context, key);
        }
        if (entry != null) {
            this.modules[name][ENTRY] = this.modules[name][entry];
        }
    };

    public require = (name: string) => {
        return this.modules[name][ENTRY]();
    };

    public containsComponent = (name: string) => {
        return name in this.components;
    };

    public registerComponent = (
        name: string,
        render: (element: HTMLElement) => void,
    ) => {
        if (!this.components[name]) {
            this.components[name] = render;
        }
    };

    public render = (name: string, element: HTMLElement) => {
        if (this.components[name]) {
            this.components[name](element);
        }
    };
}
