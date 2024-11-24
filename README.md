# Automated Music News Blog with Next.js and OpenAI

This project is an automated tech news blog built with Next.js. It fetches news articles from the web, parses them using Mozilla's Readability, classifies them using OpenAI's embeddings model, and publishes them on the blog.

## Features

- News Article Fetching: Uses Brave Search API to find and extract relevant news articles.
- Content Parsing: Utilizes Mozilla's Readability to parse and clean up news content.
- Content Classification: Classifies news articles using OpenAI's embeddings model.
- Automated Publishing: Automatically publishes classified news articles on the Next.js blog.

## Technologies Used

- **Next.js:** Framework for building the blog.
- **Brave Search API:** For fetching relevant news articles and images. We have 2,000 monthly requests and 1 per second in the free tier. So we can pull news every 30 minutes for free
- **Mozilla Readability:** For parsing and cleaning up news content.
- **OpenAI Embeddings Model:** For classifying the news articles.

### Installation

1. Clone the repository:
```
git clone https://github.com/meltingghost/music-news
cd music-news
```
2. Install dependencies:
```
pnpm install
```
3. Configure environment variables in a .env file:
```
BRAVE_API_TOKEN=
OPENAI_API_KEY=
API_TOKEN=

DATABASE_URL=
DATABASE_URL_UNPOOLED=
CLOUDINARY_URL=
```
## Migrations

To generate migrations in case you want to make any changes to the database, whether creating, editing or deleting columns or tables, you must modify the schema.prisma file that is at the root of the project, here you must create the model of the new table if you want to create a new table in the database, if you want to modify the existing tables you can make the necessary modifications to the models that you can find in this file, we remind you that this project uses Prisma to interact with the database so the changes must be in accordance with this framework.

After making the changes, you must save them and execute the following command by opening a terminal in the root folder of the project:
```
npx prisma migrate dev --name name_of_migration
```

Be sure to replace "name_of_migration" with the name you want to give your migration, this way the changes will be generated immediately in the database.

If you have a database that is in production and someone else made changes to said database, you must make those changes effective in your local directory, but you must use the following command:
```
npx prisma generate
```
# Usage

Start the development server:

npm run dev
Access the blog in your browser at http://localhost:3000.
