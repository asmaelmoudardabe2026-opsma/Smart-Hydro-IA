// middleware/validateCity.js

const validateCity = (req, res, next) => {
  const { city } = req.params;

  // 1. check empty
  if (!city) {
    return res.status(400).json({
      message: "City is required"
    });
  }

  // 2. trim spaces
  const cleanCity = city.trim();

  // 3. length check
  if (cleanCity.length < 2 || cleanCity.length > 50) {
    return res.status(400).json({
      message: "City name must be between 2 and 50 characters"
    });
  }

  // 4. regex (letters + spaces only)
  const isValid = /^[a-zA-Z\s]+$/.test(cleanCity);

  if (!isValid) {
    return res.status(400).json({
      message: "City must contain only letters"
    });
  }

  // 5. normalize (important)
  req.params.city = cleanCity;

  next(); // continue
};

module.exports = validateCity;