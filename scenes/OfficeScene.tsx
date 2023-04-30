/* eslint-disable react/display-name */
import React, { Dispatch, Fragment, SetStateAction } from "react";
import Collider from "../@core/Collider";
import GameObject from "../@core/GameObject";
import Interactable from "../@core/Interactable";
import ScenePortal from "../@core/ScenePortal";
import Sprite from "../@core/Sprite";
import TileMap, { TileMapDataValue, TileMapResolver } from "../@core/TileMap";
import { mapDataString } from "../@core/utils/mapUtils";
import CoffeeMachine from "../entities/CoffeeMachine";
import PizzaPickup from "../entities/PizzaPickup";
import Plant from "../entities/Plant";
import Plant2 from "../entities/Plant2";
import Player from "../entities/Player";
import Workstation from "../entities/Workstation";
import spriteData from "../components/spriteData";
import Floor from "@/entities/Floor";

const mapData = mapDataString(`
# # # # # # # # # # #
# P · · · · · · · P #
# · · · · · · · · · ·
# · · · · p · · · · #
# · · · · p · · · · #
# · · · · · · · · · #
# P · · · · · · · P #
# # # # # # # # # # #
`);

const resolveMapTile: (setModals: {
  setOpenModal: (val: boolean) => void;
  setMessage: (msg: string) => void;
}) => TileMapResolver =
  (setModals: {
    setOpenModal: (val: boolean) => void;
    setMessage: (msg: string) => void;
  }) => (type: TileMapDataValue, x: number, y: number) => {
    const { setOpenModal, setMessage } = setModals;
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = <Floor key={key} {...position} />;

    switch (type) {
      case "·":
        return floor;
      case "o":
        return (
          <Fragment key={key}>
            {floor}
            <PizzaPickup {...position} />
          </Fragment>
        );
      case "p":
        return (
          <Fragment key={key}>
            {floor}
            <Plant {...position} />
          </Fragment>
        );
      case "P":
        return (
          <Fragment key={key}>
            {floor}
            <Plant2 {...position} setMessage={setMessage} setOpenModal={setOpenModal} />
          </Fragment>
        );
      case "#":
        return (
          <GameObject key={key} {...position} layer="wall">
            <Collider />
            <Sprite {...spriteData.objects} state="wall" />
          </GameObject>
        );
      case "W":
        return (
          <Fragment key={key}>
            {floor}
            <Workstation {...position} />
          </Fragment>
        );
      case "C":
        return (
          <Fragment key={key}>
            {floor}
            <CoffeeMachine {...position} />
          </Fragment>
        );
      case "T":
        return (
          <Fragment key={key}>
            {floor}
            <Plant {...position} />
          </Fragment>
        );
      default:
        return <></>;
    }
  };

interface OfficeSceneProps {
  setOpenModal: (val: boolean) => void;
  setMessage: (msg: string) => void;
}

export default function OfficeScene(props: OfficeSceneProps) {
  return (
    <>
      <GameObject name="map">
        <ambientLight />
        <TileMap
          data={mapData}
          resolver={resolveMapTile({
            setOpenModal: props.setOpenModal,
            setMessage: props.setMessage,
          })}
          definesMapSize
        />
      </GameObject>
      <GameObject x={10} y={5}>
        <Collider />
        <Interactable />

        <ScenePortal
          name="exit"
          enterDirection={[-1, 0]}
          target="other/start"
        />
      </GameObject>
      <Player x={6} y={3} {...props} />
    </>
  );
}
