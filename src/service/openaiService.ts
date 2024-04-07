'use server';
import { MessageUI } from '@/components/ChatUI';
import OpenAI from 'openai';
import { UserContextFromRegFormsDTO } from '@/dbDTOs/user';
import addUserInvestment from '@/db-operations/addUserInvestment';
import { floor } from '@floating-ui/utils';
import { InvestmentDTO } from '@/dbDTOs/investment';

export interface NewInvestmentGoalFormData {
  goalName: string;
  valueGoal: number;
  months: number;
  userId: string;
}

const GPT_MODEL = 'gpt-3.5-turbo';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMessage(systemMessage: string, message: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: message },
    ],
    model: GPT_MODEL,
  });

  if (
    completion.choices.length <= 0 ||
    completion.choices.at(0) === undefined
  ) {
    return 'Please try that again;.';
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}

const CREATE_GOAL_PROMPT =
  'You are a financial advisor and you should create an investment goal for a client. The client is a {{age}} years old {{gender}}' +
  ' who really doesnt like risk. Monthly income of this client is {{income}} with fixed monthly expenses of {{hardExpenses}}. ' +
  "Client is working as {{occupation}} and is in {{relationship}} relationship. Client's investment goal is {{valueGoal}} and he would like to achieve it in {{months}} months. " +
  'Create a goal and divide investments into groups based on his risk managementDo it in json like this:' +
  ' {     "goalTimeframe": string(data.goalTimeframe),\n' +
  '      "riskLevel": string(data.riskLevel),\n' +
  '      "goalValue": string(data.goalValue),\n' +
  '      "investmentAmount": string(data.investmentAmount),\n' +
  '      "investmentValue": string(data.investmentValue),\n' +
  '      "investmentDuration": string.(data.investmentDuration),\n' +
  '      "investmentGoal": data.investmentGoal, // enum - retirement, savings, education\n' +
  '      "investmentStyle": data.investmentStyle, // style - aggressive, moderate, conservative\n' +
  '      "investmentStrategy": data.investmentStrategy, // strategy - growth, income, index\n' +
  '      "investmentAdvice": data.investmentAdvice,\n' +
  '      "investmentRecommendation": data.investmentRecommendation,\n' +
  '      "investmentAllocation": {"type": string (stocks, cash, bonds), "percentage": number, "assetName": string}[] // json value\n';

const CREATE_GOAL_PROMPT_CHAT_ONLY =
  'You are a financial advisor and you should create an investment goal for a client. The client is a {{age}} years old {{gender}}' +
  ' who really doesnt like risk. Monthly income of this client is {{income}} with fixed monthly expenses of {{hardExpenses}}. ' +
  'Client is working as {{occupation}} and is in {{relationship}} relationship.' +
  'Create a goal and divide investments into groups based on his risk managementDo it in json like this:' +
  ' {     "goalTimeframe": string(data.goalTimeframe),\n' +
  '      "riskLevel": string(data.riskLevel),\n' +
  '      "goalValue": string(data.goalValue),\n' +
  '      "investmentAmount": string(data.investmentAmount),\n' +
  '      "investmentValue": string(data.investmentValue),\n' +
  '      "investmentDuration": string.(data.investmentDuration),\n' +
  '      "investmentGoal": data.investmentGoal, // enum - retirement, savings, education\n' +
  '      "investmentStyle": data.investmentStyle, // style - aggressive, moderate, conservative\n' +
  '      "investmentStrategy": data.investmentStrategy, // strategy - growth, income, index\n' +
  '      "investmentAdvice": data.investmentAdvice,\n' +
  '      "goalName": nameOfGoal,\n' +
  '      "months": intOfMonthsItTakesToInvest,\n' +
  '      "investmentRecommendation": data.investmentRecommendation,\n' +
  '      "investmentAllocation": {"type": string (stocks, cash, bonds), "percentage": number, "assetName": string}[] // json value\n';

export async function createGoal(
  text: string,
  contextDto: UserContextFromRegFormsDTO,
  investmentGoalFormData: NewInvestmentGoalFormData,
) {
  const filled_goal_prompt = CREATE_GOAL_PROMPT.replace(
    '{{age}}',
    contextDto.age.toString(),
  )
    .replace('{{gender}}', contextDto.gender)
    .replace('{{income}}', contextDto.income.toString())
    .replace('{{hardExpenses}}', contextDto.hardExpenses.toString())
    .replace('{{occupation}}', contextDto.occupation)
    .replace('{{relationship}}', contextDto.relationshipStatus)
    .replace('{{valueGoal}}', investmentGoalFormData.valueGoal.toString())
    .replace('{{months}}', investmentGoalFormData.months.toString());
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: filled_goal_prompt }],
    model: GPT_MODEL,
  });

  if (
    completion.choices.length <= 0 ||
    completion.choices.at(0) === undefined
  ) {
    return 'Please try that again;.';
  }

  console.log(filled_goal_prompt);

  let jsonObj = {};
  try {
    // @ts-ignore
    jsonObj = JSON.parse(completion.choices.at(0).message.content);
    console.log(jsonObj); // This will log the object to the console.
    await addUserInvestment({
      ...jsonObj,
      goalName: investmentGoalFormData.goalName.toString(),
      goalValue: investmentGoalFormData.valueGoal.toString(),
      acquiredValue: floor(
        Math.random() * (investmentGoalFormData.valueGoal - 1 + 1) + 1,
      ).toString(),
      months: investmentGoalFormData.months.toString(),
      investmentType: 'monthly',
      userId: investmentGoalFormData.userId,
    } as InvestmentDTO);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}

export async function createAssetTypeHint(assetType: string) {
  const assetTypePrompt = `You are financial advisor which tries to explain investment terms to non-experienced client who wants to start investing. Explain in one sentence what is ${assetType}`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: assetTypePrompt }],
    model: GPT_MODEL,
  });

  if (
    completion.choices.length <= 0 ||
    completion.choices.at(0) === undefined
  ) {
    return '';
  }

  // @ts-ignore
  return completion.choices.at(0).message.content;
}

export async function createGoalChatOnly(
  text: string,
  contextDto: UserContextFromRegFormsDTO,
  email: String,
) {
  let filled_goal_prompt = CREATE_GOAL_PROMPT_CHAT_ONLY.replace(
    '{{age}}',
    contextDto.age.toString(),
  )
    .replace('{{gender}}', contextDto.gender)
    .replace('{{income}}', contextDto.income.toString())
    .replace('{{hardExpenses}}', contextDto.hardExpenses.toString())
    .replace('{{occupation}}', contextDto.occupation)
    .replace('{{relationship}}', contextDto.relationshipStatus);
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: filled_goal_prompt },
      { role: 'user', content: text },
    ],
    model: GPT_MODEL,
  });

  if (
    completion.choices.length <= 0 ||
    completion.choices.at(0) === undefined
  ) {
    return 'Please try that again;.';
  }

  console.log(filled_goal_prompt);

  let jsonObj: any;
  try {
    // @ts-ignore
    jsonObj = JSON.parse(completion.choices.at(0).message.content);
    jsonObj.months = String(jsonObj.months);
    console.log(jsonObj); // This will log the object to the console.
    await addUserInvestment({
      ...jsonObj,
      acquiredValue: floor(
        Math.random() * (Number(jsonObj.goalValue) - 1 + 1) + 1,
      ).toString(),
      investmentType: 'monthly',
      userId: email,
    } as InvestmentDTO);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}

const CREATE_SETUP_PROMPT =
  'You are a financial advisor and you should create an investment goal for a client. The client is a 30 years old man. Try to find out what the client wants to achieve with his investments and what his risk tolerance is. Ask a lot of questions to get a good understanding of the client. Keep your questions open-ended and try to get as much information as possible. Also make responses Short to maximalize user engagement.';

const FINAL_SETUP_PROMPT = '';

export async function createSetup(
  messages: MessageUI[],
  newMessage: MessageUI,
) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: CREATE_SETUP_PROMPT },
      ...messages,
      newMessage,
    ],
    model: GPT_MODEL,
  });

  if (
    completion.choices.length <= 0 ||
    completion.choices.at(0) === undefined
  ) {
    const message: MessageUI = {
      content: 'Please try that again.',
      role: 'assistant',
    };
    return message;
  }

  const text =
    completion.choices.at(0)?.message.content ?? 'Please try that again.';

  const message: MessageUI = { content: text, role: 'assistant' };
  return message;
  //  return MessageUI({content: completion.choices.at(0).message.content , role: 'assistant'});
}
