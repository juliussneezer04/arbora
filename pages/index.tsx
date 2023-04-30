import React from "react";
import AssetLoader from "../@core/AssetLoader";
import Game from "../@core/Game";
import Scene from "../@core/Scene";
import SceneManager from "../@core/SceneManager";
import OfficeScene from "../scenes/OfficeScene";
import OtherScene from "../scenes/OtherScene";
import soundData from "../components/soundData";
import spriteData from "../components/spriteData";

const urls = [
  ...Object.values(spriteData).map((data) => data.src),
  ...Object.values(soundData).map((data) => data.src),
  // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function App() {

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <Game cameraZoom={60}>
          <AssetLoader urls={urls} placeholder="Loading assets ...">
            <SceneManager defaultScene="office">
              <Scene id="office">
                <OfficeScene />
              </Scene>
              <Scene id="other">
                <OtherScene />
              </Scene>
            </SceneManager>
          </AssetLoader>
        </Game>
      </div>
    </>
  );
}
