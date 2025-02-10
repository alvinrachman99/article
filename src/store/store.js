import { configureStore } from "@reduxjs/toolkit"
import ArticleSlice from "../features/ArticleSlice"

export const store = configureStore({
    reducer: {
        article: ArticleSlice
    }
})