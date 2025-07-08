import React, { useState } from "react";
import UserProfileCard from "./UserProfileCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const updatedUserData = {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
        skills,
      };

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        updatedUserData,
        {
          withCredentials: true,
        }
      );

      dispatch(login(response.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="flex gap-5 justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Profile details</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <select
            defaultValue="Pick a color"
            className="select"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label className="label">Profile Picture URL</label>
          <input
            type="text"
            className="input"
            placeholder="your profile picture URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          <label className="skills">Skills</label>
          <textarea
            className="textarea"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          ></textarea>

          <button
            onClick={submitHandler}
            className="btn btn-sm btn-primary mt-3"
          >
            Save Profile
          </button>
        </fieldset>

        <UserProfileCard
          user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
        />
      </div>
    </>
  );
};

export default EditProfile;
