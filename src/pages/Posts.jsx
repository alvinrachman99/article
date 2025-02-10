import { useEffect, useMemo, useState } from "react";
import SideBar from "../components/SideBar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getArticle, updateTrash } from "../features/ArticleSlice";
import { Link } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getArticle(10, 0));
  }, [dispatch]);

  const publish = useMemo(
    () => data?.payload?.filter((item) => item.status === "publish") || [],
    [data]
  );
  const draft = useMemo(
    () => data?.payload?.filter((item) => item.status === "draft") || [],
    [data]
  );
  const trash = useMemo(
    () => data?.payload?.filter((item) => item.status === "trash") || [],
    [data]
  );

  const [activeTab, setActiveTab] = useState("publish");

  const handleTrash = async (id) => {
    await dispatch(updateTrash(id))
    dispatch(getArticle(10, 0));
  }

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      <SideBar />

      <div className="flex-1 p-6 relative z-0">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {/* Tabs */}
          <div className="flex border-b mb-4 space-x-4">
            {[
              { id: "publish", label: "Published" },
              { id: "draft", label: "Drafts" },
              { id: "trash", label: "Trashed" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-gray-600 rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* publish */}
                {activeTab === "publish" &&
                  publish.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 flex justify-center space-x-4">
                        <Link to={`/article/${item.id}`} className="text-blue-500 hover:text-blue-700 transition-all flex items-center space-x-1">
                          <FaEdit /> <span>Edit</span>
                        </Link>
                        <button onClick={() => handleTrash(item.id)} className="text-red-500 hover:text-red-700 transition-all flex items-center space-x-1">
                          <FaTrash /> <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* draft */}
                {activeTab === "draft" &&
                  draft.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 flex justify-center space-x-4">
                        <Link to={`/article/${item.id}`} className="text-blue-500 hover:text-blue-700 transition-all flex items-center space-x-1">
                          <FaEdit /> <span>Edit</span>
                        </Link>
                        <button onClick={() => handleTrash(item.id)} className="text-red-500 hover:text-red-700 transition-all flex items-center space-x-1">
                          <FaTrash /> <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                {/* trash */}
                {activeTab === "trash" &&
                  trash.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 flex justify-center space-x-4">
                        <Link to={`/article/${item.id}`} className="text-blue-500 hover:text-blue-700 transition-all flex items-center space-x-1">
                          <FaEdit /> <span>Edit</span>
                        </Link>
                        {/* <button className="text-red-500 hover:text-red-700 transition-all flex items-center space-x-1">
                          <FaTrash /> <span>Delete</span>
                        </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
