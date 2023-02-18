// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ code?: string; error?: string }>
) {
  if (!process.env.CHATGPT_API_KEY)
    return res.status(500).json({ error: "No ChatGPT API key found" });

  const { prompt } = req.body;
  const api = new ChatGPTAPI({ apiKey: process.env.CHATGPT_API_KEY });

  const instructions = `
  I want to have the HTML, CSS and JS code for the landing page described in the paragraph below.
  No explanation, don't say anything, just send me a single codeblock with all the code. Don't split the code in different blocks, instead inline all needed CSS and JS in the HTML. 
  Make sure the website has at least 4 sections with relevant content.
  The CSS has to make sure the page is responsive.
  If no color palette is specified in the paragraph below, use some modern, vibrant colors or even gradients. Don't use boring colors.
  If possible, add modern CSS features to buttons and other components on hover to make them look fancy.
  Add modern animations to the elements when they are shown in the page.
  This is the paragraph that describes the landing page:
  
  
  `;

  const response = await api.sendMessage(instructions + prompt, {
    onProgress: (partialResponse) => console.log(partialResponse.text),
  });
  res.status(200).json({ code: response.text });
}
