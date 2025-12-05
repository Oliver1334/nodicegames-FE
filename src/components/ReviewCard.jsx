import React from "react";
import { Link } from "react-router-dom";

export const ReviewCard = ({ review }) => {
  const previewReview = review.review_body.substring(0, 100) + "...";
  const previewShortReview = review.review_body.substring(0, 50) + "...";

  const createdAtDate = new Date(review.created_at);
  const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const {
    category,
    comment_count,
    designer,
    owner,
    review_img_url,
    title,
    votes,
    review_id,
  } = review;

  return (
    <article className="bg-brandLightSecondary dark:bg-brandSecondary shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <img
        src={review_img_url}
        alt={title}
        className="w-full h-48 object-cover "
      />

      {/* Top content grows to push the button to bottom */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-brandLightText dark:text-brandPrimary text-xl font-semibold mb-2">{title}</h3>

        <p className="text-brandLightText dark:text-brandText mb-2 flex-1">
          {title.length < 48 ? previewReview : previewShortReview}
        </p>

        <div className="text-sm text-brandLightText dark:text-brandText mb-2">
          <p>Review by: {owner}</p>
          <p>Designer: {designer}</p>
          <p>Category: {category}</p>
          <p>Posted on: {formattedDate}</p>
        </div>

        <div className="flex justify-between text-sm text-brandLightText dark:text-brandText mb-4">
          <p>Votes: {votes}</p>
          <p>Comments: {comment_count}</p>
        </div>

        {/* Button stays at bottom because flex-1 above grows */}
        <Link to={`/reviews/${review_id}`} className="mt-auto">
          <button className="w-full bg-brandPrimary hover:bg-brandPrimaryDarker text-brandLightText  py-2 px-4 rounded-md transition-colors duration-250 cursor-pointer">
            Read Review
          </button>
        </Link>
      </div>
    </article>
  );
};
