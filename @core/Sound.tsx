/* eslint-disable react/no-unused-prop-types */
import { useEffect, useMemo, useCallback } from 'react';
import useAsset from './useAsset';

export interface SoundProps {
    src: string | string[];
    loop?: boolean;
    volume?: number;
    onStop?: () => void;
}

// handle "DOMException: play() failed because the user didn't interact with the document first."
// see: https://stackoverflow.com/questions/49930680
let canPlayAudio = true;

const pickSrc = (src: string | string[]) => {
    const sources = Array.isArray(src) ? src : [src];
    return sources[Math.floor(sources.length * Math.random())];
};

export function useSound({ src, loop = false, volume = 1, onStop }: SoundProps) {
    const source = useMemo(() => pickSrc(src), [src]);
    const audio = useAsset(source) as HTMLAudioElement;
   
    const instance = audio; // .cloneNode() as HTMLAudioElement;
    instance.currentTime = 0;
    instance.loop = loop;
    instance.volume = volume;

    useEffect(() => {
        onStop && instance.addEventListener('ended', onStop);
        return () => {
            onStop && instance.removeEventListener('ended', onStop);
            if (instance.loop) {
                // TODO: fade out
                instance.pause();
            }
        };
    }, [instance, onStop]);

    const play = useCallback(() => {
        if (canPlayAudio) {
            // catch possible abort error.
            // see: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
            instance.play().catch(() => {});
        }
    }, [instance]);

    return play;
}

export default function Sound(props: SoundProps) {
    const play = useSound(props);
    useEffect(() => {
        // fix for playing sound on disabled GOs
        const timeout = setTimeout(play, 10);
        return () => clearTimeout(timeout);
    }, [play]);
    return null;
}
