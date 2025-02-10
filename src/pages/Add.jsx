import { useActionState, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createArticle, getArticleById, updateArticle } from "../features/ArticleSlice";

function Add() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const [form, setForm] = useState("add")
  const { data } = useSelector((state)=> state.article)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  useEffect(()=> {
    if(data) {
      setTitle(data?.payload?.title)
      setContent(data?.payload?.content)
      setCategory(data?.payload?.category)
    }
  }, [data])

  useEffect(()=> {
    if(id){
      setForm("edit")
      dispatch(getArticleById(id))
    }
  }, [id, dispatch])

  const publishArticle = async (prevState, formData) => {
    const title = formData.get('title')
    if(!title && !title?.trim()) return "Kolom title tidak boleh kosong"
    if(title.length < 20) return "Kolom title minimal mempunyai 20 karakter"
    const content = formData.get('content')
    if(!content && !content?.trim()) return "Kolom content tidak boleh kosong"
    if(content.length < 200) return "Kolom content minimal mempunyai 200 karakter"
    const category = formData.get('category')
    if(!category && !category?.trim()) return "Kolom category tidak boleh kosong"
    if(category.length < 3) return "Kolom category minimal mempunyai 3 karakter"

    const newPublish = {
      title,
      content,
      category,
      status: "publish"
    }

    await dispatch(form === "add" ? createArticle(newPublish) : updateArticle({id:id, form:newPublish}))
    navigate("/")
  }

  const [message, handlePublish, isPending] = useActionState(publishArticle, null)

  const draftArticle = async (prevState, formData) => {
    const title = formData.get('title')
    if(!title && !title?.trim()) return "Kolom title tidak boleh kosong"
    if(title.length < 20) return "Kolom title minimal mempunyai 20 karakter"
    const content = formData.get('content')
    if(!content && !content?.trim()) return "Kolom content tidak boleh kosong"
    if(content.length < 200) return "Kolom content minimal mempunyai 200 karakter"
    const category = formData.get('category')
    if(!category && !category?.trim()) return "Kolom category tidak boleh kosong"
    if(category.length < 3) return "Kolom category minimal mempunyai 3 karakter"

    const newDraft = {
      title,
      content,
      category,
      status: "draft"
    }

    await dispatch(form === "add" ? createArticle(newDraft) : updateArticle({id:id, form:newDraft}))
    navigate("/")
  }

  const [messageDraft, handleDraft, isPendingDraft] = useActionState(draftArticle, null)

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      <SideBar />

      <div className="flex-1 p-6 relative z-0">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {/* Add New Article Form */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">{form === "add" ? "Add New" : "Edit"} Article</h2>
            <form action={handlePublish}>
              <input
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Content"
                className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <input
                type="text"
                name="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-all">
                Publish
              </button>
              <button formAction={handleDraft} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all">
                Save as Draft
              </button>
            </form>
            {message && <div>{message}</div>}
            {messageDraft && <div>{messageDraft}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
