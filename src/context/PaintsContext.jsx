import { createContext, useContext } from 'react';
import Projects from '../resources/paints.json';

const PaintsContext = createContext();

export function usePaints() {
    return useContext(PaintsContext);
}

export const PaintsProvider = ({ children }) => {
    const { types, paints } = Projects;

    const getTypes = () => {
        return types;
    };

    const getType = (id) => {
        return types[id - 1];
    }

    const getTypeByName = (name) => {
        return types.find((type) => type.name['en'] === name || type.name['fr'] === name);
    }

    const getPaints = () => {
        return paints;
    };

    const getPaint = (id) => {
        return paints.find((paint) => parseInt(paint.id) === parseInt(id));
    };

    const getPaintsByType = (typeId) => {
        return paints.filter((paint) => paint.types.includes(typeId));
    };

    const value = {
        getTypes,
        getType,
        getTypeByName,
        getPaints,
        getPaint,
        getPaintsByType,
    };

    return <PaintsContext.Provider value={value}>{children}</PaintsContext.Provider>;
};