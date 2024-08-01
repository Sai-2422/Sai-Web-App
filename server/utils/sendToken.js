export const sendToken = async (user, res, statusCode) => {
  const token = user.getJWTToken();
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // 'None' for cross-site, 'Lax' for same-site
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token });
};
