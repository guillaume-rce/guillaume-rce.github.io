import { createContext, useContext } from 'react';
import Prize from '../resources/prizes.json';

const PrizeContext = createContext();

export function usePrizes() {
    return useContext(PrizeContext);
}

export const PrizeProvider = ({ children }) => {
    const { prizes } = Prize;

    const getPrizes = () => {
        return prizes;
    };

    const getPrize = (id) => {
        return prizes.find((prize) => parseInt(prize.id) === parseInt(id));
    };

    const value = {
        getPrizes,
        getPrize,
    };

    return <PrizeContext.Provider value={value}>{children}</PrizeContext.Provider>;
};