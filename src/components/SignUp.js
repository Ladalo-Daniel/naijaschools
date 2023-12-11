"use client"

import React, { useState } from "react";

export default function SignUpForm() {
  // states for registration
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    joinedNewsLetter: false,
  });

  // states for errors, form submission, and password match
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // handling input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }

    if (formData.password === formData.confirmPassword) {
      setPasswordMatch(true);
    } else if (formData.confirmPassword === "") {
      setError(true);
    } else {
      setPasswordMatch(false);
      setSubmitted(false);
    }
  };

  // show success message
  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? "" : "none" }}>
        <h1>Successfully signed up!!!</h1>
      </div>
    );
  };

  return (
    <div className="form-container">
      {/* show success message */}
      <div className="successMessage">{successMessage()}</div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Your name"
          className="input"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        {error && !formData.name && (
          <span className="error">*Please enter your name</span>
        )}

        <input
          type="email"
          placeholder="Email address"
          className="input"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {error && !formData.email && (
          <span className="error">*Please enter your email</span>
        )}

        <input
          type="password"
          placeholder="Password"
          className="input"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        {error && !formData.password && (
          <span className="error">*Please enter your password</span>
        )}

        <input
          type="password"
          placeholder="Confirm password"
          className="input"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        {error && !formData.confirmPassword && (
          <span className="error">*Please confirm your password</span>
        )}
        {!passwordMatch && (
          <span className="error">Passwords do not match!</span>
        )}

        <div className="marketing">
          <input
            id="allowEmail"
            type="checkbox"
            name="joinedNewsletter"
            onChange={handleChange}
            checked={formData.joinedNewsletter}
          />
          <label htmlFor="allowEmail">I want to join the newsletter</label>
        </div>

        <button className="submit">Sign Up</button>
      </form>
    </div>
  );
}
