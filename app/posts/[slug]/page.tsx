// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { getAllPosts, getPostBySlug } from "@/app/hooks/posts";
// import { CMS_NAME } from "@/lib/constants";
// import markdownToHtml from "@/lib/markdownToHtml";
// import Alert from "@/app/posts/[slug]/components/alert";
// import Container from "@/app/components/container";
// import Header from "@/app/posts/[slug]/components/header";
// import { PostBody } from "@/app/posts/[slug]/components/post-body";
// import { PostHeader } from "@/app/posts/[slug]/components/post-header";

// export default async function Post({ params }: Params) {
//   const post = getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   const content = await markdownToHtml(post.content || "");

//   return (
//     <main>
//       {/* <Alert preview={post.preview} /> */}
//       <Container>
//         <Header />
//         <article className="mb-32">
//           <PostHeader
//             title={post.title}
//             coverImage={post.coverImage}
//             date={post.publishedAt}
//             // author={post.author}
//           />
//           <PostBody content={content} />
//         </article>
//       </Container>
//     </main>
//   );
// }

// type Params = {
//   params: {
//     slug: string;
//   };
// };

// export function generateMetadata({ params }: Params): Metadata {
//   const post = getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [post.coverImage],
//     },
//   };
// }

// export async function generateStaticParams() {
//   const posts = getAllPosts();

//   return (await posts).map((post) => ({
//     slug: post.slug,
//   }));
// }
