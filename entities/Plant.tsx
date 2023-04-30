import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../components/spriteData';

export default function Plant(props: GameObjectProps) {
    return (
        <GameObject {...props}>
            <Collider />
            <Sprite {...spriteData.objects} state="plant-1" offset={{ x: 0, y: 0.25 }} />
        </GameObject>
    );
}
