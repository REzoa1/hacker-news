import { Link, RouteComponentProps } from "react-router-dom";
import { FC, useEffect } from "react";
import s from "./StoryPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchNewsById, selectNewsData } from "../../store/slices/news";
import { Comments } from "../../components/Comments/Comments";
import { getData } from "../../utils/helpers";
import { PageHeader, Button, Divider, Spin } from "antd";
import { ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";

interface MatchParams {
  newsId: string;
}

export const StoryPage: FC<RouteComponentProps<MatchParams>> = (props) => {
  const { newsId } = props.match.params;

  const dispatch = useAppDispatch();
  const { newsByIdData, isLoading } = useAppSelector(selectNewsData);

  useEffect(() => {
    if (!newsId.length) return;
    dispatch(fetchNewsById(newsId));
  }, [dispatch, newsId]);

  const handleRefreshComments = () => {
    dispatch(fetchNewsById(newsId));
  };

  return (
    <>
      <PageHeader className={s.header} title="Hacker News" />
      <div className={s.list}>
        <Spin spinning={isLoading}>
          <div className={s.container}>
            <Link className={s.btn} to="/">
              <Button
                type="primary"
                shape="round"
                size="large"
                icon={<ArrowLeftOutlined />}
              />
            </Link>
            <Button
              type="link"
              href={newsByIdData.url}
              size="large"
              target="_blank"
              rel="noreferrer"
            >
              {newsByIdData?.url?.length > 50
                ? newsByIdData.url.slice(0, 50) + "..."
                : newsByIdData.url}
            </Button>
          </div>

          <h1>{newsByIdData.title}</h1>
          <div className={s.container}>
            <div>
              by: <u>{newsByIdData.by}</u>
            </div>
            <div>date: {getData(newsByIdData.time)}</div>
          </div>

          <div className={s.container}>
            <div>
              {newsByIdData?.kids?.length ? newsByIdData.kids.length : 0}{" "}
              comments
            </div>
            <Button
              key="1"
              onClick={() => handleRefreshComments()}
              icon={<ReloadOutlined />}
              type="dashed"
              shape="round"
              loading={isLoading}
            >
              Refresh Comments
            </Button>
          </div>
        </Spin>

        <Divider />
        {newsByIdData.kids ? (
          <Comments kids={newsByIdData.kids} />
        ) : (
          <div className={s.empty}>No comments</div>
        )}
      </div>
    </>
  );
};
