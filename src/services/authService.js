import { 
  signInAnonymously, 
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from './firebaseConfig';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID || 'your-web-client-id.apps.googleusercontent.com',
});

export const signInAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Anonymous sign-in error:', error);
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
    const userCredential = await signInWithCredential(auth, googleCredential);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
    return { success: true };
  } catch (error) {
    console.error('Sign-out error:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
