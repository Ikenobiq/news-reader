import Link from "next/link";
import { StoriesProps } from "../../pages/index";
import { FC } from "react";
import s from './NewsItem.module.css'
interface NewsItemProps {
  story: StoriesProps;
}
const NewsItem: FC<NewsItemProps> = ({story}) => {
  const { objectID, title, author, points } = story;
  return (
    <Link href={objectID}>
      <li className={s.item} key={objectID}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.infoWrapper}>

        <p className={s.author}>{author}</p>
        <p className={s.points}>{points} likes</p>
        </div>
      </li>
    </Link>
  );
};
export default NewsItem;
