import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqoKB2NLTN8qAdranp6D42d9eh4gBLc0E",
  authDomain: "olx-clone-97145.firebaseapp.com",
  projectId: "olx-clone-97145",
  storageBucket: "olx-clone-97145.appspot.com",
  messagingSenderId: "215816098438",
  appId: "1:215816098438:web:6c81687c9c15571a757707",
  measurementId: "G-W6QJGL1KF8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);

const fetchFromFireStore = async () => {
  try {
    const productsCollection = collection(fireStore, 'Products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched products from Firestore', productList);
    return productList;
  } catch (error) {
    console.error('Error fetching products from Firestore', error);
    return [];
  }
};

export { auth, provider, storage, fireStore, fetchFromFireStore };