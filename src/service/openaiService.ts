"use server";
import OpenAI from 'openai';

const GPT_MODEL = 'gpt-3.5-turbo';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMessage(systemMessage: string, message: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {role: 'system', content: systemMessage},
      {role: 'user', content: message},
    ],
    model: GPT_MODEL,
  });

  if (completion.choices.length <= 0 || completion.choices.at(0) === undefined) {
    return 'Please try that again;.'
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}

const CREATE_GOAL_PROMPT = 'You are a financial advisor and you should create an investment goal for a client. The client is a 30 years old man' +
  ' who really doesnt like risk. Create a goal and divide investments into groups based on his risk managementDo it in json like this:' +
  ' {     goalTimeframe: data.goalTimeframe,\n' +
  '      userId: email,\n' +
  '      riskLevel: data.riskLevel,\n' +
  '      goalValue: data.goalValue,\n' +
  '      investmentAmount: data.investmentAmount,\n' +
  '      investmentValue: data.investmentValue,\n' +
  '      investmentDuration: data.investmentDuration,\n' +
  '      investmentGoal: data.investmentGoal, // enum - retirement, savings, education\n' +
  '      investmentStyle: data.investmentStyle, // style - aggressive, moderate, conservative\n' +
  '      investmentStrategy: data.investmentStrategy, // strategy - growth, income, index\n' +
  '      investmentAdvice: data.investmentAdvice,\n' +
  '      investmentRecommendation: data.investmentRecommendation,\n' +
  '      investmentAllocation: {type: string (stocks, cash, bonds), percentage: number, assetName: string}[] // json value\n';

export async function createGoal(text: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {role: 'system', content: CREATE_GOAL_PROMPT},
      {role: 'user', content: text},
    ],
    model: GPT_MODEL,
  });

  if (completion.choices.length <= 0 || completion.choices.at(0) === undefined) {
    return 'Please try that again;.'
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}
