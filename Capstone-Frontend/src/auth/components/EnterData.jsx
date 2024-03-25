"use client";
import React, { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function EnterData() {
  const router = useRouter();

  const [duplicate, setDuplicate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    weight: "",
    age: "",
    feet: "",
    inches: "",
    height: "",
    gender: "Male",
    unit: "metric",
  });

  // Convert metric to imperial or vice versa when unit changes
  useEffect(() => {
    if (formData.unit === "imperial") {
      // Convert weight from kg to lbs
      const weightInPounds = Math.round(parseFloat(formData.weight) * 2.20462);
      // Convert height from cm to feet and inches
      const totalInches = parseInt(formData.height) / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      setFormData((prevFormData) => ({
        ...prevFormData,
        weight: weightInPounds.toString(),
        feet: feet.toString(),
        inches: inches.toString(),
      }));
    } else {
      // Convert weight from lbs to kg
      const weightInKg = Math.round(parseFloat(formData.weight) / 2.20462);
      // Convert height from feet and inches to cm
      const heightInCm = Math.round(
        (parseInt(formData.feet) * 12 + parseInt(formData.inches)) * 2.54
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        weight: weightInKg.toString(),
        height: heightInCm.toString(),
      }));
    }
  }, [formData.unit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert feet and inches to centimeters for submission
    let heightInCm =
      formData.unit === "metric"
        ? parseInt(formData.height)
        : (parseInt(formData.feet) || 0) * 30.48 +
          (parseInt(formData.inches) || 0) * 2.54;

    const dataToSubmit = {
      ...formData,
      weight: parseInt(formData.weight), // Ensure weight is in kg and an integer
      height: heightInCm, // Ensure height is in cm and an integer
    };

    console.log(dataToSubmit);
    // Submit dataToSubmit to the server or API

    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    const email = idToken.payload.email;

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

    console.log(dataToSubmit);

    let data = {};
    data.email = email;
    data.data = dataToSubmit;
    data.data.feet = undefined;
    data.data.inches = undefined;
    data.data.unit = undefined;

    const response = await fetch(`${apiUrl}api/user/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      console.log("Data submitted successfully");
      setDuplicate(false);
      setSubmitted(true);

      // Refresh page after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setDuplicate(true);
    }
  };

  // Render input for height based on the selected unit
  const renderHeightInput = () => {
    return formData.unit === "metric" ? (
      <input
        id="height"
        name="height"
        type="number"
        autoComplete="height"
        required
        className="w-3/4 appearance-none rounded-md relative block w-full py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={handleChange}
        min="0"
      />
    ) : (
      <div className="w-full flex justify-between space-x-4">
        <input
          id="feet"
          name="feet"
          type="number"
          autoComplete="feet"
          required
          className="w-full appearance-none rounded-md relative block px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Feet"
          value={formData.feet}
          onChange={handleChange}
          min="0"
        />
        <input
          id="inches"
          name="inches"
          type="number"
          autoComplete="inches"
          required
          className="w-full appearance-none rounded-md relative block px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
          placeholder="Inches"
          value={formData.inches}
          onChange={handleChange}
          min="0"
        />
      </div>
    );
  };

  return (
    <div
      className={`${
        !submitted ? "min-h-screen" : ""
      } flex flex-col items-center  py-6 px-3 profile-form`}
    >
      <h1
        className={`text-7xl font-bold text-green-700 mb-10 ${
          submitted ? "hidden" : ""
        }`}
      >
        Welcome to Agility
      </h1>
      <text
        className={`w-1/3 text-2xl font-bold mb-2 text-center ${
          submitted ? "hidden" : ""
        }`}
      >
        Please enter your details to get started.
      </text>
      <text
        className={`w-2/3 text-2xl font-bold mb-16 text-center ${
          submitted ? "hidden" : ""
        }`}
      >
        Our system will automatically calculate calorie loss based on your
        details.
      </text>
      <h1
        className={`text-4xl font-bold text-green-700 mb-6 ${
          submitted ? "hidden" : ""
        }`}
      >
        Profile Setup
      </h1>
      {submitted && (
        <>
          <h2 className="mt-32 text-4xl font-bold text-green-700">
            Thank you for setting up your profile, you will be redirected
            shortly.
          </h2>
          <div
            class="mt-16 inline-block h-16 w-16 animate-spin rounded-full border-4 border-green-800 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </>
      )}
      <div className={`max-w-md w-full space-y-6 ${submitted ? "hidden" : ""}`}>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {["username", "weight", "age"].map((field, idx) => (
              <div key={idx} className="flex items-center ">
                <label
                  htmlFor={field}
                  className="w-2/4 block text-xl font-medium text-gray-700"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type={["weight", "age"].includes(field) ? "number" : "text"}
                  autoComplete={field}
                  required
                  className="w-2/4 appearance-none rounded-md relative block w-full py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder={`${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } ${
                    field === "weight"
                      ? `(${formData.unit === "metric" ? "kg" : "lbs"})`
                      : ""
                  }${
                    field === "height"
                      ? `(${formData.unit === "metric" ? "cm" : "in"})`
                      : ""
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            ))}
            <div className="flex items-center">
              <label
                htmlFor="height"
                className="w-2/4 text-xl font-medium text-gray-700"
              >
                Height
              </label>
              {renderHeightInput()}
            </div>
            <div className="justify-between flex items-center ">
              <label
                htmlFor="gender"
                className="w-2/4 block text-xl font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                className=" w-3/4  appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md shadow-sm px-4 py-3 ${
                formData.unit === "metric"
                  ? "bg-green-800 text-white" // Selected state
                  : "bg-zinc-500 text-white" // Not selected state
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-xl`}
              onClick={() => setFormData({ ...formData, unit: "metric" })}
            >
              Metric
            </button>
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md shadow-sm px-4 py-3 ${
                formData.unit === "imperial"
                  ? "bg-green-800 text-white" // Selected state
                  : "bg-zinc-500 text-white" // Not selected state
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-xl`}
              onClick={() => setFormData({ ...formData, unit: "imperial" })}
            >
              Imperial
            </button>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>

        {duplicate && (
          <div className="text-center">
            <text className="text-red-600 text-xl">
              Duplicate username found, please choose another.
            </text>
          </div>
        )}
      </div>
    </div>
  );
}
