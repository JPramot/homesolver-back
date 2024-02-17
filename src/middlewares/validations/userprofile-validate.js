exports.userProfileData = (data) => {
  if (!data.firstName) data.firstName = null;
  if (!data.lastName) data.lastName = null;
  if (!data.alias) data.alias = null;
  if (!data.birthDate) data.birthDate = null;
  if (!data.introduction) data.introduction = null;
  if (!data.gender) data.gender = null;
  return data;
};
