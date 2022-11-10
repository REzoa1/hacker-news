import { List, Skeleton } from "antd";
import s from "./Story.module.css";
import { Link } from "react-router-dom";
import { NewsData } from "../../models";
import { useAppSelector } from "../../store";
import { selectNewsData } from "../../store/slices/news";
import { getData } from "../../utils/helpers";

type Props = {
  news: NewsData;
};
export const Story = ({ news }: Props) => {
  const { isLoading } = useAppSelector(selectNewsData);
  return (
    <Link to={`${news.id}`}>
      <List.Item className={s.item} key={news.id}>
        <Skeleton title={false} loading={isLoading} active>
          <List.Item.Meta title={news.title} description={<u>{news.by}</u>} />
          <div className={s.container}>
            <div>{getData(news.time)}</div>
            <div className={s.score}>Rating: {news.score}</div>
          </div>
        </Skeleton>
      </List.Item>
    </Link>
  );
};
