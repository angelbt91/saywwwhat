import Head from "next/head";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleRecord = async () => {
    if (transcript === "") return;

    setProcessing(true);
    try {
      SpeechRecognition.stopListening();
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: transcript }),
      });
      const json = await response.json();
      setCode(json.code);
    } catch (e) {
      console.log(e);
    }
    setProcessing(false);
  };

  return (
    <>
      <Head>
        <title>Saywwwhat</title>
        <meta
          name="description"
          content="Saywwwhat: Speech-to-landing generator, powered by ChatGPT"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={() => SpeechRecognition.startListening()}>Start</button>
          <button onClick={handleRecord}>Stop</button>
          <button onClick={() => resetTranscript()}>Reset</button>
          <p>{transcript}</p>
        </div>
        <p>{processing && "Creating landing..."}</p>
        <iframe srcDoc={code} width="900" height="1200"></iframe>
      </main>
    </>
  );
}
