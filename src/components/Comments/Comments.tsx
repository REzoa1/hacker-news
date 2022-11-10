import { useEffect, useState } from "react";
import { CommentData } from "../../models";
import { useAppDispatch } from "../../store";
import { fetchComments } from "../../store/slices/news";
import { SingleComment } from "../SingleComment/SingleComment";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  kids: number[];
};
export const Comments = ({ kids }: Props) => {
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    if (!kids) return;
    dispatch(fetchComments(kids))
      .unwrap()
      .then((payload) => setComments(payload));
  }, [dispatch, kids]);

  return (
    <Spin spinning={!comments.length} indicator={<LoadingOutlined />}>
      {comments.map((comment, i) => {
        return <SingleComment key={i} comment={comment} />;
      })}
    </Spin>
  );
};
