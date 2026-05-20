import { Review } from '../../types/review';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src="img/avatar-max.jpg"
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>

        <span className="reviews__user-name">
          {review.user}
        </span>
      </div>

      <div className="reviews__info">
        <p className="reviews__text">
          {review.comment}
        </p>

        <time className="reviews__time">
          {review.date}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
