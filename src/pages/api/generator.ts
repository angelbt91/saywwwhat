// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ code?: string; error?: string }>
) {
  if (!process.env.CHATGPT_API_KEY)
    return res.status(500).json({ error: "No ChatGPT API key found" });

  const { prompt, language } = req.body;
  const api = new ChatGPTAPI({ apiKey: process.env.CHATGPT_API_KEY });

  console.log("Received prompt:", prompt);

  const englishInstructions = `
  I want to have the HTML, CSS and JS code for the landing page described in the paragraph below.
  No explanation, don't say anything, just send me a single codeblock with all the code. Don't split the code in different blocks, instead inline all needed CSS and JS in the HTML. 
  Make sure the website has at least 4 sections with relevant content. If no content is provided in the paragraph below, please make up the content yourself based on the topic of the website, but don't use Lorem Ipsum (filler text).
  The CSS has to make sure the page is responsive.
  If no color palette is specified in the paragraph below, use some modern, vibrant colors or even gradients. Don't use boring colors.
  Add modern CSS features to buttons and other components on hover to make them look fancy.
  Add modern animations to the elements when they are shown in the page.
  This is the paragraph that describes the landing page:
  `;

  const spanishInstructions = `
  Quiero el código HTML, CSS y JS de la página de aterrizaje descrita en el párrafo de abajo.
  Sin explicaciones, no digas nada, sólo envíame un único bloque de código con todo el código. No dividas el código en diferentes bloques, en lugar de eso pon todo el CSS y JS necesario en el mismo HTML. 
  Asegúrate de que el sitio web tiene al menos 4 secciones con contenido relevante. Si no se proporciona ningún contenido en el párrafo siguiente, inventa tú mismo el contenido basándote en el tema de la página web, pero no uses Lorem Ipsum (texto de relleno).
  El CSS tiene que asegurarse de que la página es responsive.
  Si no se especifica ninguna paleta de colores en el párrafo siguiente, utiliza colores modernos y vivos, e incluso degradados. No utilices colores planos.
  Añade funciones CSS modernas a los botones y otros componentes al pasar el ratón por encima para que parezcan elegantes.
  Añade animaciones modernas a los elementos cuando se muestren en la página.
  Este es el párrafo que describe la página de aterrizaje:
  `;

  // TODO refactor
  const instructions = language === "en-EN" ? englishInstructions : spanishInstructions;

  const response = await api.sendMessage(instructions + "\n\n" + prompt, {
    onProgress: () => {}, // needed to keep alive connection
  });
  res.status(200).json({ code: response.text });
}
