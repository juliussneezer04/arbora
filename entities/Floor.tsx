import GameObject, { GameObjectProps } from "@/@core/GameObject";
import Interactable, { InteractionEvent } from "@/@core/Interactable";
import Sprite, { SpriteRef } from "@/@core/Sprite";
import useGameObject from "@/@core/useGameObject";
import useRightPointerClick from "@/@core/useRightPointerClick";
import waitForMs from "@/@core/utils/waitForMs";
import spriteData from "@/components/spriteData";
import { useRef } from "react";

function FloorScript() {
  const { getComponent, plantSeed } = useGameObject();
  const floorSeedState = useRef(false);

  useRightPointerClick((event) => {
    if (event.button === 2 && !floorSeedState.current && plantSeed()) {
      console.log("Planting seeds");
      floorSeedState.current = true;
      getComponent<SpriteRef>("Sprite").setState("plant-2");
    }

    return waitForMs(400);
  });

  return null;
}

export default function Floor(props: GameObjectProps) {
  const key = `${props.x}-${props.y}`;
  return (
    <GameObject key={key} {...props} layer="ground">
      <Sprite {...spriteData.objects} state="floor" />
      <Interactable />
      <FloorScript />
    </GameObject>
  );
}
