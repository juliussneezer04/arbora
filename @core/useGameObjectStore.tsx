import React, { useCallback, useContext, useRef } from 'react';
import { SceneExitEvent, SceneInitEvent } from './Scene';
import useGame from './useGame';
import useGameEvent from './useGameEvent';
import useGameObject from './useGameObject';
import useSceneManager from './useSceneManager';
import { PubSubEvent } from './utils/createPubSub';
import waitForMs from './utils/waitForMs';

export type PreSaveGameEvent = PubSubEvent<'pre-save-game', void>;
export type SaveGameEvent = PubSubEvent<'save-game', void>;

export interface StoreContextValue {
    getState: (key: string) => any;
    setState: (key: string, data: any) => void;
}

export const StoreContext = React.createContext<StoreContextValue | null>(null);

export default function useGameObjectStore<T = any>(
    key: string,
    write: () => T,
    read?: (storedData: T) => void
): T {
    const { name, forceUpdate } = useGameObject();
    const contextValue = useContext(StoreContext);
    const { getState, setState } = contextValue || {};

    const writeCallback = useRef<any>(null);
    writeCallback.current = write;

    const readCallback = useRef<any>(null);
    readCallback.current = read;

    useGameEvent<SceneInitEvent>(
        'scene-init',
        () => {
            if (!readCallback.current) {
                return;
            }
            if (!name) {
                // eslint-disable-next-line no-console
                console.error('Attempting to use GameObject store without a name.');
                return;
            }

            if (getState) {
              const stored = getState(`${name}.${key}`);
              if (stored != null) {
                  readCallback.current(stored);
                  waitForMs(0).then(forceUpdate);
              }
            }
        },
        [key, name]
    );

    const save = useCallback(async () => {
        if (!name) return;
        if (!setState) return;
        setState(`${name}.${key}`, writeCallback.current());
    }, [key, name, setState]);

    useGameEvent<SceneExitEvent>('scene-exit', save, [save]);
    useGameEvent<SaveGameEvent>('save-game', save, [save]);

    if (!getState) return {} as any;
    return getState(`${name}.${key}`);
}

export function useGameObjectStoreValue<T = any>(key: string): T {
    const { name } = useGameObject();
    const storeContext = useContext(StoreContext);
    const { getState } = storeContext || {};

    if (!name) {
        // eslint-disable-next-line no-console
        console.error('Attempting to use GameObject store without a name.');
        return {} as any;
    }

    if (!getState) {
        // eslint-disable-next-line no-console
        console.error('Attempting to use GameObject store without a state.');
        return {} as any;
    }
    const stored = getState(`${name}.${key}`);
    return stored;
}

interface ProviderProps {
    children: React.ReactNode;
}

export function GameStoreProvider({ children }: ProviderProps) {
    const { getGameState, setGameState } = useGame();

    const contextValue: StoreContextValue = {
        getState: getGameState,
        setState: setGameState,
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}

export function SceneStoreProvider({ children }: ProviderProps) {
    const { getSceneState, setSceneState } = useSceneManager();

    const contextValue: StoreContextValue = {
        getState: getSceneState,
        setState: setSceneState,
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}
