// firebase-backend.js
// Firebase + Firestore backend for PolyU Hunt (browser, no bundler)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1️⃣ PASTE YOUR OWN FIREBASE CONFIG HERE
// Get this from Firebase console: Project Settings → General → Your apps → Web app
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // optional, ok to remove if not used
};

// 2️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3️⃣ Expose simple helpers for your app code
// Attach to window so index.html can call window.dbUtil.*
window.dbUtil = {
  // Create or overwrite a user document, keyed by email
  async saveUser(userData) {
    const now = Timestamp.fromDate(new Date());
    const ref = doc(db, "users", userData.email);

    await setDoc(
      ref,
      {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        version: userData.version,
        programme: userData.programme || null,
        gradYear: userData.gradYear || null,
        stamps: userData.stamps || [],
        createdAt: now,
        updatedAt: now
      },
      { merge: true }
    );

    return { success: true };
  },

  // Update only the stamps array for a user
  async updateStamps(email, stamps) {
    const ref = doc(db, "users", email);
    await updateDoc(ref, {
      stamps,
      updatedAt: Timestamp.fromDate(new Date())
    });
    return { success: true };
  },

  // Log a quiz attempt in a separate collection
  async logQuizAnswer(email, locationId, correct) {
    const quizzesRef = collection(db, "quizzes");
    await addDoc(quizzesRef, {
      email,
      locationId,
      correct: !!correct,
      timestamp: Timestamp.fromDate(new Date())
    });
    return { success: true };
  },

  // Fetch a single user by email
  async getUser(email) {
    const ref = doc(db, "users", email);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  },

  // Fetch all users (for admin/stats)
  async getAllUsers() {
    const usersRef = collection(db, "users");
    const snap = await getDocs(usersRef);
    const users = [];
    snap.forEach(docSnap => {
      users.push({ id: docSnap.id, ...docSnap.data() });
    });
    return users;
  },

  // Basic stats example
  async getStats() {
    const users = await this.getAllUsers();
    const totalUsers = users.length;
    let totalStamps = 0;
    const userAnswers = {};

    users.forEach(u => {
      const count = (u.stamps || []).length;
      totalStamps += count;
      userAnswers[u.email] = count;
    });

    return { totalUsers, totalStamps, userAnswers };
  }
};

// Optional: expose app/db for debugging in console
window.firebaseApp = app;
window.firestoreDb = db;

console.log("✅ Firebase backend initialised");
