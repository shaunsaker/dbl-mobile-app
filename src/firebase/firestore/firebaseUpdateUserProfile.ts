import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserProfileData } from '../../store/userProfile/models';

export const firebaseUpdateUserProfile = (
  userProfileData: Partial<UserProfileData>,
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const uid = auth().currentUser?.uid;

      if (!uid) {
        reject(new Error('No user is currently signed in.'));
      }

      await firestore()
        .collection('users')
        .doc(uid)
        .set(userProfileData, { merge: true }); // use set because the document may not have been created yet

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
