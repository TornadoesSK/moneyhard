"use client";
import {createGoal} from "@/service/openaiService";

export default function Intro() {

  const clickHandler = () => {
    console.log("Clicked")
    createGoal('I want to save about 200000 euros for a house within 5 years.')
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
