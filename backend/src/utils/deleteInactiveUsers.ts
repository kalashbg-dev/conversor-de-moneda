import  User from '../models/User';

export const deleteInactiveUsers = async () => {
  const inactiveUsers = await User.find({ isConfirmed: false });
  inactiveUsers.forEach((user) => {
    User.deleteOne({ _id: user._id });
  });
};