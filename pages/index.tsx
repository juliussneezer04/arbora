import React from "react";
import AssetLoader from "../@core/AssetLoader";
import Game from "../@core/Game";
import Scene from "../@core/Scene";
import SceneManager from "../@core/SceneManager";
import OfficeScene from "../scenes/OfficeScene";
import OtherScene from "../scenes/OtherScene";
import soundData from "../components/soundData";
import spriteData from "../components/spriteData";
import DialogBox from "@/components/TextModal";

const urls = [
  ...Object.values(spriteData).map((data) => data.src),
  ...Object.values(soundData).map((data) => data.src),
  // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function App() {
  const [openMessageModal, setOpenMessageModal] = React.useState(false);
  const [messages, _setMessages] = React.useState<string[]>([]);
  const setMessage = (message: string) => {
    _setMessages([...messages, message]);
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        {openMessageModal && (
          <div className="absolute z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50">
            <DialogBox messages={messages} parentSetOpen={setOpenMessageModal} />
          </div>
        )}
        <Game cameraZoom={60}>
          <AssetLoader urls={urls} placeholder="Loading assets ...">
            <SceneManager defaultScene="office">
              <Scene id="office">
                <OfficeScene
                  setOpenModal={setOpenMessageModal}
                  setMessage={setMessage}
                />
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
