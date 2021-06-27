import { ThemeContext } from './../contexts/ThemeContext';
import { useContext } from 'react';

export function useTheme() {
    const value = useContext(ThemeContext)

    return value;
}