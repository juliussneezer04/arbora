import React, { useRef } from "react";
import Collider from "../@core/Collider";
import GameObject, { GameObjectProps } from "../@core/GameObject";
import Sprite, { SpriteRef } from "../@core/Sprite";
import spriteData from "../components/spriteData";
import Interactable, { InteractionEvent } from "@/@core/Interactable";
import useGameObject from "@/@core/useGameObject";
import useGameObjectEvent from "@/@core/useGameObjectEvent";
import waitForMs from "@/@core/utils/waitForMs";

function PlantScript(props: {
  setMessage: (message: string) => void;
  setOpenModal: (open: boolean) => void;
}) {
  const { getComponent } = useGameObject();
  const workState = useRef(false);

  useGameObjectEvent<InteractionEvent>("interaction", () => {
    workState.current = !workState.current;

    if (workState.current) {
      waitForMs(2000).then((val) =>
        getComponent<SpriteRef>("Sprite").setState("plant-1")
      );
    } else {
      waitForMs(3000).then((val) =>
        {getComponent<SpriteRef>("Sprite").setState("plant-3");
        props.setOpenModal(true);
        props.setMessage(`You have watered your plant to the full!`);
        props.setMessage(`Please Continue by watching this message from our sponsors.`);
      }
      );
    }

    return waitForMs(400);
  });

  return null;
}
export default function Plant2(props: GameObjectProps & {
  setMessage: (message: string) => void;
  setOpenModal: (open: boolean) => void;
}) {
  const { setMessage, setOpenModal, ...gameProps } = props;
  return (
    <GameObject {...gameProps}>
      <Collider />
      <Interactable />
      <PlantScript setMessage={setMessage} setOpenModal={setOpenModal} />
      <Sprite
        {...spriteData.objects}
        state="plant-2"
        offset={{ x: 0, y: 0.25 }}
      />
    </GameObject>
  );
}
