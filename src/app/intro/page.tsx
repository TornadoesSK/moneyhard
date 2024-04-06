"use client";
import {sendMessage} from "@/service/openaiService";

export default function Intro() {

  const clickHandler = () => {
    console.log("Clicked")
    sendMessage('You should respond by writing everything in rhymes', 'What is a safe investment strategy')
      .then(r => {
        console.log("Received message")
        console.log(r)
      });
  };

  return <>
    <h1>Hello</h1>
    <button onClick={() => clickHandler()}>Click me</button>
  </>;
}
