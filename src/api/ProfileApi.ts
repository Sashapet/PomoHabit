import ImageResizer from 'react-native-image-resizer';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

const uploadImage = async (uri: string, userId: string) => {
  const resizeImage = await ImageResizer.createResizedImage(
    uri,
    700,
    700,
    'JPEG',
    90,
    0,
  );
  const storageRef = await storage().ref('avatars/' + userId);
  const path = resizeImage.uri;

  await storageRef.putFile(path);

  const url = await storageRef.getDownloadURL();

  return url;
};

const setProfilePhoto = async (url: string, userId: string) => {
  const userRef = await database().ref('users/' + userId);
  return userRef.update({
    avatar: url,
  });
};
const updateUserName = async (
  firstname: string,
  lastname: string,
  userId: string,
  currentFirstName: string,
  currentLastName: string,
) => {
  const newSortName =
    firstname.toLowerCase() +
    ' ' +
    lastname.toLowerCase() +
    '_' +
    userId.toLowerCase();
  const userRef = await database().ref('users/' + userId);
  if (currentFirstName === firstname && currentLastName !== lastname) {
    return userRef.update({
      lastname,
      sort_name: newSortName,
    });
  } else if (currentFirstName !== firstname && currentLastName === lastname) {
    return userRef.update({
      firstname,
      sort_name: newSortName,
    });
  } else if (currentFirstName !== firstname && currentLastName !== lastname) {
    return userRef.update({
      firstname,
      lastname,
      sort_name: newSortName,
    });
  } else if (currentFirstName == firstname && currentLastName == lastname) {
    return null;
  }
};

export const profileApi = {
  uploadImage,
  setProfilePhoto,
  updateUserName,
};
