import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPosts() {
  try {
    return await prisma.post.findMany();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

const TablePosts = async () => {
  const posts = await getPosts();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Entradas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Título
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Autor
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Descripción
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {post.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {post.author}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {post.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePosts;
