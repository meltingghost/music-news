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
    const contentRes = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that converts news into articles in a Music News Blog, in markdown format. The article must remain true to the original news but be rewritten with different words and structure, omitting any direct mention of the specific source and excluding any 'call to action' such as following social media accounts or subscribing to newsletters. Do not include a title at the beginning of the article.",
        },
        {
          role: "user",
          content: `Write a blog post based on the following news article: ${prompt}`,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 1000,
    });

    const blogContent = contentRes.choices[0].message.content;

    const titleRes = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative assistant in a Music News Blog.",
        },
        {
          role: "user",
          content: `Generate a catchy title for a blog post based on the following content: ${blogContent}`,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 60,
    });

    const blogTitle = titleRes.choices[0].message.content;

    const excerptRes = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative assistant in a Music News Blog.",
        },
        {
          role: "user",
          content: `Generate a short excerpt for a blog post based on the following content: ${blogContent}`,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 100,
    });

    const blogExcerpt = excerptRes.choices[0].message.content;

    return { blogContent, blogTitle, blogExcerpt };
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
