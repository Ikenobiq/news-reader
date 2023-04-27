import { useEffect, useState } from "react";
import s from "./LikeBoard.module.css";

const LikeBoard = ({ points, id }: { points: number; id: number }) => {
  const [like, setLike] = useState(points);
  const storageId = id.toString();
  const storageLike = like.toString();

  useEffect(() => {
    const localPoints = localStorage.getItem(storageId);
    if (!localPoints) {
      localStorage.setItem(storageId, storageLike);
    } else {
      setLike(+localPoints);
    }
  }, []);

  useEffect(() => {
    if (like !== points) {
      localStorage.setItem(storageId, storageLike);
    }
  }, [like]);

  return (
    <div className={s.wrapper}>
      <div className={s.count}>{like}</div>
      <button
        className={s.like}
        onClick={() => {
          setLike(like + 1);
        }}
        disabled={false}
      >
        Like
      </button>
      <button
        className={s.dislike}
        onClick={() => {
          setLike(like - 1);
        }}
        disabled={false}
      >
        Dislike
      </button>
    </div>
  );
};
export default LikeBoard;
