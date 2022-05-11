import JWT from 'jsonwebtoken';

export const signToken = ({ sub, email }, expiresIn = '15m') => {
  const payload = {
    sub,
    email,
  };

  return JWT.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes('jwt expired') };
  }
};
