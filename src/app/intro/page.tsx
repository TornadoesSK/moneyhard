'use client';
import { createGoal } from '@/service/openaiService';
import SingleRow from '@/components/SingleRow';
import {createInvestmentGoal} from "@/service/mongoService";

export default function Intro() {
  const clickHandler = () => {
    console.log('Clicked');
    createGoal(
      'I want to save about 200000 euros for a house within 5 years.',
    ).then(r => {
      console.log('Received message');
      console.log(r);
      if (typeof r === "string") {
        const data = JSON.parse(r)

        createInvestmentGoal(data).then(r => {
          console.log(r);
        })
      }
    });
  };

  return (
    <>
      <h1>Hello</h1>
      <button onClick={() => clickHandler()}>Click me</button>
      <SingleRow
        leftText="Bonds"
        rightText="10 %"
        imagePath="landing-page-banner.svg"
        navigateTo="/other-page"
      />
    </>
  );
}
