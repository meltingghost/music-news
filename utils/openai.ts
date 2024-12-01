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
    const contentReq = openai.chat.completions.create({
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
    });

    const titleReq = contentReq.then((contentRes) => {
      const blogContent = contentRes.choices[0].message.content;
      return openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a creative assistant in a Music News Blog.",
          },
          {
            role: "user",
            content: `Generate a catchy title for a blog post based on the following content (You should avoid putting the title in quotation marks): ${blogContent}`,
          },
        ],
        model: "gpt-4o-mini",
        max_tokens: 60,
      });
    });

    const excerptReq = contentReq.then((contentRes) => {
      const blogContent = contentRes.choices[0].message.content;
      return openai.chat.completions.create({
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
        max_tokens: 80,
      });
    });

    const categoryReq = contentReq.then((contentRes) => {
      const blogContent = contentRes.choices[0].message.content;
      return openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a creative assistant in a Music News Blog.",
          },
          {
            role: "user",
            content: `Categorize the following blog entry into one of the following categories, each one has an id: "News": 1, "Reviews": 2, "New Releases": 3, "Features": 4, "Lists": 5, "Video": 6, "Miscelaneous": 7 (You should respond with just the id number): ${blogContent}`,
          },
        ],
        model: "gpt-4o-mini",
        max_tokens: 1,
      });
    });

    const [contentRes, titleRes, excerptRes, categoryRes] = await Promise.all([
      contentReq,
      titleReq,
      excerptReq,
      categoryReq,
    ]);

    const blogContent = contentRes.choices[0].message.content;
    const blogTitle = titleRes.choices[0].message.content;
    const blogExcerpt = excerptRes.choices[0].message.content;
    const blogCategory = categoryRes.choices[0].message.content;

    const spanishTitleReq = openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a translator assistant in a Music News Blog.",
        },
        {
          role: "user",
          content: `Generate a translation into Spanish for the following title of a blog post (You should not adapt it literally and should make sure it keeps making sense and it's understandable for spanish readers. Also should not translate names, brands or entities): ${blogTitle}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const spanishContentReq = openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a translator assistant in a Music News Blog.",
        },
        {
          role: "user",
          content: `Generate a translation into Spanish for the following content of a blog post (You should not adapt it literally and should make sure it keeps making sense and it's understandable for spanish readers. Also should not translate names, brands or entities): ${blogContent}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const spanishExcerptReq = openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a translator assistant in a Music News Blog.",
        },
        {
          role: "user",
          content: `Generate a translation into Spanish for the following excerpt of a blog post (You should not adapt it literally and should make sure it keeps making sense and it's understandable for spanish readers. Also should not translate names, brands or entities): ${blogExcerpt}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    const [spanishTitleRes, spanishContentRes, spanishExcerptRes] =
      await Promise.all([
        spanishTitleReq,
        spanishContentReq,
        spanishExcerptReq,
      ]);

    const blogSpanishTitle = spanishTitleRes.choices[0].message.content;
    const blogSpanishContent = spanishContentRes.choices[0].message.content;
    const blogSpanishExcerpt = spanishExcerptRes.choices[0].message.content;

    return {
      blogContent,
      blogTitle,
      blogExcerpt,
      blogSpanishTitle,
      blogSpanishContent,
      blogSpanishExcerpt,
      blogCategory,
    };
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
