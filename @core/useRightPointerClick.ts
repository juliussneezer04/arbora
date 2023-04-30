import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import useGame from './useGame';

export default function useRightPointerClick(clickCallback: (event: MouseEvent) => void) {
    const {
        gl: { domElement },
    } = useThree();
    const { paused } = useGame();

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (paused) return false;
            clickCallback(event);
        }
        domElement.addEventListener('contextmenu', handleClick);
        return () => {
            domElement.removeEventListener('contextmenu', handleClick);
        };
    }, [paused, clickCallback, domElement]);
}
