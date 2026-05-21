import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../store';
import { postReviewAction } from '../../store/api-actions';


function ReviewForm(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReview({
      ...review,
      rating: Number(evt.target.value),
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      comment: evt.target.value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!id) {
      return;
    }

    dispatch(postReviewAction({
      offerId: id,
      comment: review.comment,
      rating: review.rating,
    }))
      .unwrap()
      .then(() => {
        setReview({
          rating: 0,
          comment: '',
        });
      });
  };

  const isSubmitDisabled =
    review.comment.length < 50 ||
    review.comment.length > 300 ||
    review.rating === 0;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <React.Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={review.rating === rating}
              onChange={handleRatingChange}
            />
            <label htmlFor={`${rating}-stars`}>
              {rating} stars
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleCommentChange}
      />

      <button
        className="reviews__submit form__submit button"
        type="submit"
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
