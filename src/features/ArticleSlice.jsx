import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/config";

export const createArticle = createAsyncThunk(
  "article/create",
  async (form) => {
    try {
      const response = await axiosInstance.post("/article/", form);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getArticle = createAsyncThunk(
  "article/get",
  async (limit, offset) => {
    try {
      const response = await axiosInstance.get(`/article/${limit}/${offset}/`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getArticleById = createAsyncThunk(
  "article/getById",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/article/${id}/`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/update",
  async ({ id, form }) => {
    try {
      const response = await axiosInstance.put(`/article/${id}/`, form);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateTrash = createAsyncThunk("article/updateTrash", async (id) => {
  try {
    const response = await axiosInstance.patch(`/article/${id}/`);
    return response.data;
  } catch (error) {
    return error;
  }
});

const ArticleSlice = createSlice({
  name: "article",
  initialState: {
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createArticle
      .addCase(createArticle.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // getArticle
      .addCase(getArticle.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // getArticleById
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // updateArticle
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // updateTrash
      .addCase(updateTrash.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default ArticleSlice.reducer;
