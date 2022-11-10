import { useEffect } from "react";
import s from "./MainPage.module.css";
import {
  fetchNews,
  fetchNewsId,
  selectNewsData,
} from "../../store/slices/news";
import { useAppDispatch, useAppSelector } from "../../store";
import { Story } from "../../components/Story/Story";
import { List, PageHeader, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { newsIds, newsData, isLoading } = useAppSelector(selectNewsData);

  useEffect(() => {
    dispatch(fetchNewsId());
    const timer = setInterval(() => dispatch(fetchNewsId()), 1000 * 60);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!newsIds.length) return;
    dispatch(fetchNews(newsIds));
  }, [dispatch, newsIds]);

  const sortedNews = [...newsData].sort((a, b) => b.id - a.id);

  const handleRefreshPage = () => {
    dispatch(fetchNewsId());
  };

  return (
    <div>
      <PageHeader
        className={s.header}
        extra={[
          <Button
            key="1"
            onClick={() => handleRefreshPage()}
            icon={<ReloadOutlined />}
            shape="round"
            size="large"
            loading={isLoading}
          >
            Refresh Page
          </Button>,
        ]}
        title="Hacker News"
      />
      <div className={s.list}>
        <List
          dataSource={sortedNews}
          renderItem={(item) => <Story news={item} />}
        />
      </div>
    </div>
  );
};
