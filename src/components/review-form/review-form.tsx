import { ChangeEvent, useState } from 'react';

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState({
    rating: '',
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReview({
      ...review,
      rating: evt.target.value,
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      comment: evt.target.value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleRatingChange}
        />
        <label htmlFor="5-stars">5 stars</label>
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleCommentChange}
      />

      <button className="reviews__submit form__submit button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
