import { Shakte, ChatBox } from "../features";
import { useState } from "react";

const Dashboard = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [pendingVoiceInput, setPendingVoiceInput] = useState("");

  return (
    <div className="flex flex-col bg-gray-950 text-white h-screen">
      <main className="flex-1 flex flex-col h-full relative">
        <section className="flex-1 h-full">
          <ChatBox
            onMicClick={() => setShowAnimation(true)}
            inputValue={pendingVoiceInput}
            setInputValue={setPendingVoiceInput}
          />
        </section>
        {showAnimation && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
            <div className="relative pointer-events-auto shadow-2xl rounded-full">
              <Shakte
                playOnMount
                onClose={() => setShowAnimation(false)}
                onDone={(text) => {
                  setShowAnimation(false);
                  setPendingVoiceInput(text);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
