import { useRef, useEffect, useState } from "react";

const Shakte = ({ playOnMount = false, onClose, onDone }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (playOnMount) {
            handlePlay();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playOnMount]);

    useEffect(() => {
        if (recognizing) {
            startRecognition();
        } else {
            stopRecognition();
        }
        // Cleanup on unmount
        return () => stopRecognition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recognizing]);

    const handlePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        video.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        setIsPlaying(false);
    };

    const handleToggle = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const startRecognition = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            setTranscript("Speech recognition not supported in this browser.");
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setTranscript(text);
        };
        recognition.onerror = (event) => {
            setTranscript("Error: " + event.error);
        };
        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
    };

    const handleDone = () => {
        setRecognizing(false);
        stopRecognition();
        if (onDone) onDone(transcript);
        if (onClose) onClose();
    };

    useEffect(() => {
        setRecognizing(true);
    }, []);

    return (
        <div className="text-white ">
            <div className="bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-10 space-y-6">
                <div
                    className="relative w-90 h-90 rounded-full overflow-hidden shadow-xl bg-gray-950 animate-zoomSlow group mt-5 cursor-pointer transition outline-none"
                    tabIndex={0}
                    title={isPlaying ? "Pause animation" : "Play animation"}
                    role="button"
                    aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    onClick={handleToggle}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
                >
                    <video
                        ref={videoRef}
                        src="/animation.mp4"
                        className="w-full h-full object-cover rounded-full"
                        loop
                        muted
                        playsInline
                        onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 rounded-full bg-gray-950 mix-blend-overlay opacity-80 pointer-events-none" />
                    <div className="absolute inset-0 rounded-full ring ring-gray-950 animate-pulse-slow pointer-events-none" />
                    <div className="absolute -inset-[50%] bg-radial-light opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                </div>
                <div className="mt-4 text-lg min-h-[2em] text-center">{transcript || (recognizing ? "Listening..." : "")}</div>
                <button
                    onClick={handleDone}
                    className="mt-8 px-6 py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default Shakte;