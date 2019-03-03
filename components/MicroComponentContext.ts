import { createContext } from 'react';
import MicroComponents from './MicroComponents';

export default createContext<{ MicroComponents: MicroComponents }>({
    MicroComponents: {},
});
