import LikeBoard from "@/components/LikeBoard/LikeBoard";
import { StoriesProps } from "./index";
import s from '../styles/id.module.css'

interface StoryProps
  extends Pick<
    StoriesProps,
    | "author"
    | "objectID"
    | "created_at"
    | "created_at_i"
    | "parent_id"
    | "points"
    | "story_id"
    | "title"
    | "url"
  > {
  children: [];
  id: number;
  options: [];
  text: null | string;
  type: string;
  url: string;
}
type ChildrenType = {
  author: string;
  text: string;
};

export const getServerSideProps = async (context: {
  params: { id: string };
}) => {
  const { id } = context.params;
  const res = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
  const data: StoriesProps[] = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

const Story = ({ data }: { data: StoryProps }) => {
  const { id, title, author, points, children } = data;

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>{title}</h3>
      <p className={s.author}>{author}</p>
      <LikeBoard points={points} id={id} />
      <ul className={s.list}>
        {children &&
          children.map(({ author, text }: ChildrenType, index) => {
            function createMarkup() {
              return { __html: text };
            }
            return (
              <li className={s.item} key={index}>
                <h3 className={s.itemAuthor}>{author}</h3>
                <div className={s.comment} dangerouslySetInnerHTML={createMarkup()} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Story;
