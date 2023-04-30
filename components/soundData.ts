import { SoundProps } from "../@core/Sound";

const soundData: { [index: string]: SoundProps } = {
  eating: {
    // "Chewing" by InspectorJ - freesound.org
    src: "/sfx/eating.wav",
  },
  drinking: {
    // "Drinking" by dersuperanton - freesound.org"
    src: "/sfx/drinking.wav",
  },
  footstep: {
    src: "/sfx/footstep.wav",
    volume: 0.75,
  },
  background: {
    src: "/sfx/bgmusic.mp3",
    volume: 0.75,
  },
};

export default soundData;
