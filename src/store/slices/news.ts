import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CommentData, NewsData } from "../../models";
import { NEWS_URL } from "../../utils/constants";

export const STATE_KEY = "news";

export type NewsState = {
  newsIds: number[];
  newsData: NewsData[];
  newsByIdData: any;
  comments: CommentData[];
  isLoading: boolean;
  status: "idle" | "loading" | "failed" | "success";
};
export const initialState: NewsState = {
  newsIds: [],
  newsData: [],
  newsByIdData: [],
  comments: [],
  isLoading: false,
  status: "idle",
};
export const fetchNewsId = createAsyncThunk("news/fetchNewsId", async () => {
  try {
    const res = await fetch(`${NEWS_URL}newstories.json`);

    if (res.ok) {
      const data = await res.json();
      return data.slice(1, 101);
    }
    throw new Error("Something went wrong");
  } catch (error) {
    console.log(error);
  }
});

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (newsIds: number[]) => {
    try {
      const data = await Promise.all(
        newsIds.map(async (i) => {
          const res = await fetch(`${NEWS_URL}item/${i}.json`);
          if (res.ok) {
            return await res.json();
          }
          throw new Error("Something went wrong");
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (id: string) => {
    try {
      const res = await fetch(`${NEWS_URL}item/${id}.json`);

      if (res.ok) {
        const data = await res.json();
        return data;
      }

      throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const fetchComments = createAsyncThunk(
  "news/fetchComments",
  async (id: number[]) => {
    try {
      const data = await Promise.all(
        id.map(async (i) => {
          const res = await fetch(`${NEWS_URL}item/${i}.json`);
          if (res.ok) {
            const data = await res.json();
            return data;
          }
          throw new Error("Something went wrong");
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const newsSlice = createSlice({
  name: STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchNewsId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsId.fulfilled, (state, action) => {
        state.newsIds = action.payload;
        state.status = "success";
      })
      .addCase(fetchNewsId.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsData = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      })

      .addCase(fetchNewsById.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.newsByIdData = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(fetchNewsById.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      })

      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "success";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectNewsData = (state: RootState) => state[STATE_KEY];

export default newsSlice.reducer;
