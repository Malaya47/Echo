import React from "react";

const UserProfileCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
  return (
    <div>
      <div className="card bg-base-200 w-80 shadow-sm mt-5">
        <figure>
          <img
            // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            src={photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {age}, {gender}
          </p>
          <p>{about}</p>
          <p>{skills}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
