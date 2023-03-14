import { json } from "@sveltejs/kit";

import { OPEN_AI_API, EXTRACTOR_API } from "$env/static/private";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { url } = await request.json();
  console.log(url);

  const data = await fetch(
    `https://extractorapi.com/api/v1/extractor/?apikey=${EXTRACTOR_API}&url=${url}&fields=title`
  );

  const { title, text } = await data.json();

  const context = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_API}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `${text} \n\n Write 100 words based on the context on ${title}`,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  });

  const response = await context.json();

  const finalData = {
    context: response.choices[0].text,
    title: title,
  };

  console.log(finalData.context);

  return json(finalData);
}
