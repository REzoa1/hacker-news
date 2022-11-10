import { useState } from "react";
import { CommentData } from "../../models";
import { Comments } from "../Comments/Comments";
import { Comment, Divider } from "antd";
import s from "./SingleComment.module.css";

type Props = {
  comment: CommentData;
};
export const SingleComment = ({ comment }: Props) => {
  const [withNested, setWithNested] = useState<boolean>();
  const toggle = () => {
    setWithNested(!withNested);
  };

  return !comment?.deleted && !comment?.dead ? (
    <Comment
      author={comment.by}
      content={
        comment.kids?.length ? (
          <button className={s.btn} onClick={toggle}>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            <div className={s.next} onClick={toggle}>
              {!withNested ? "Open" : "Hide"}
            </div>
          </button>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />
        )
      }
    >
      {withNested && comment.kids && <Comments kids={comment.kids} />}
    </Comment>
  ) : (
    <i className={s.delete}>
      <Divider />
      Comment has been deleted
    </i>
  );
};
