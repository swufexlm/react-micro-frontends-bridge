import MicroResource from './MicroResource';
if (!window.MicroResource || !window.MicroResource.inited) {
    window.MicroResource = new MicroResource();
}

export { default as MFBridgeProvider } from './MFBridgeProvider';
export { default as MFBridgeConsumer } from './MFBridgeConsumer';
export { default as register } from './MFBridgeRegister';
