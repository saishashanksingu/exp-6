import { useState } from "react";
import "./UserValidation.css";

function UserValidation() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!checkEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!checkPassword(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars with upper, lower, number & special char";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted Successfully");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>User Login</h2>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserValidation;