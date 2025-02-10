import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../features/ArticleSlice";
import { format } from "date-fns"
import { useEffect, useMemo } from "react";

function Preview() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getArticle(10, 0));
  }, [dispatch]);

  const publish = useMemo(
    () => data?.payload?.filter((item) => item.status === "publish") || [],
    [data]
  );

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      <SideBar />

      <div className="flex-1 p-6 relative z-0">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Preview Articles</h2>
          <div className="space-y-6">
            {publish.map((article, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-gray-50"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Category: {article.category} | Date: {format(new Date(article.created_at), "dd MM yyyy, hh a")}
                </p>
                <p className="text-gray-700 break-words">{article.content}</p>
              </div>
            ))}
          </div>
          {/* <div className="mt-6 flex justify-center space-x-2">
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Preview;
