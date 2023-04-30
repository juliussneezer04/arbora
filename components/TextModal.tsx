import React, { useMemo, useState } from "react";
import { animated, useTransition } from "react-spring";
const DialogBox = ({ messages, parentSetOpen }: { messages: string[]; parentSetOpen: (val: boolean) => void; }) => {
  //highlight-start
  const [currentMessage, setCurrentMessage] = useState(0);
  const handleClick = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      setCurrentMessage(0);
      parentSetOpen(false);
    }
  };
  //highlight-end
  return (
    <div className="bg-green-600 border-solid p-4">
      <div className="text-lg font-semibold mb-4">Continue Caring 🌳</div>
      <Message message={messages[currentMessage]} key={currentMessage} />
      <div onClick={handleClick} className="dialogFooter">
        {currentMessage < 1 ? "Next" : "Close"}
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
    <div className="bg-green-600 border-solid p-4">
      {transitions((style, item) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
    </div>
  );
}
export default DialogBox;
