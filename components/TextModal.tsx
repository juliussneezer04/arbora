import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { animated, useTransition } from "react-spring";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const DialogBox = ({
  messages,
  parentSetMessages,
  parentSetOpen,
}: {
  messages: string[];
  parentSetMessages: (val: string[]) => void;
  parentSetOpen: (val: boolean) => void;
}) => {
  //highlight-start
  const [currentMessage, setCurrentMessage] = useState(0);
  const handleClick = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      setCurrentMessage(0);
      parentSetMessages([]);
      parentSetOpen(false);
    }
  };
  //highlight-end
  return (
    <div className="bg-green-600 border-solid p-4">
      <div className="text-lg font-semibold mb-4">Continue Caring 🌳</div>
      <Message message={messages[currentMessage]} key={currentMessage} />
      <div onClick={handleClick} className="r">
        {currentMessage < messages.length ? "Next" : "Close"}
      </div>
    </div>
  );
};
function Message({ message }: { message?: string }) {
  const items = useMemo(() => {
    const msgs = message?.split("\n");
    msgs?.push(`Thank you for your support!
    You've contributed to the planting of 0.732 trees!`);
    return msgs;
  }, [message]);
  const transitions = useTransition(items, {
    trail: 35,
    from: { display: "none" },
    enter: { display: "" },
  });
  return (
    <div className="bg-green-600 border-solid p-4 flex flex-col space-y-6">
      {transitions((style, item) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
      <ReactPlayer
        controls
        width="100%"
        url={"https://www.youtube.com/watch?v=RiswriKP9c8"}
      />
    </div>
  );
}
export default DialogBox;
