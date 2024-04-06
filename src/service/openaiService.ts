"use server";
import OpenAI from 'openai';

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
    model: 'gpt-3.5-turbo',
  });

  if (completion.choices.length <= 0 || completion.choices.at(0) === undefined) {
    return 'Please try that again;.'
  }

  // @ts-ignore
  console.log(completion.choices.at(0).message.content);
  // @ts-ignore
  return completion.choices.at(0).message.content;
}
