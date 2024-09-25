import OpenAI from "openai";

const openai = new OpenAI();

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return res.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

export async function writePost(prompt: string) {
  try {
    const res = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are writing a blog entry for a music news blog.",
        },
        {
          role: "user",
          content: `Write a blog post based on the following news article: ${prompt}`,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 1000,
    });
    return res.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
