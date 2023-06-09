import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../components/spriteData';

export default function Player(props: GameObjectProps & {
  setOpenModal: (val: boolean) => void; 
  setMessage: (msg: string) => void;
}) {
  const { setOpenModal, setMessage, ...gameProps } = props;
    return (
        <GameObject name="player" displayName="Player" layer="character" {...gameProps}>
            <Moveable />
            <Interactable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteData.player} />
            </CharacterScript>
            <CameraFollowScript />
            <PlayerScript setMessage={setMessage} setOpenModal={setOpenModal} />
        </GameObject>
    );
}
