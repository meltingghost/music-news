import prisma from "@/lib/prisma";

async function getNews() {
  try {
    return await prisma.newsArticle.findMany();
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

const TableNews = async () => {
  const news = await getNews();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Entradas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Age
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">
                  {article.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {article.age}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {article.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableNews;
