export const protectQuery = (user) => {
  if (!user.payload) throw new Error('Not Authorized!');
};
