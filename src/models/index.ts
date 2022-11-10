export type newsType = "job" | "story" | "comment" | "poll" | "pollopt";

export type NewsData = {
  by: string;
  descendants?: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type CommentData = {
  by?: string;
  deleted?: boolean;
  dead?: boolean;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: newsType;
};
