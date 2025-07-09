// Firebase configuration
// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (e.g., "buildfit-app")
// 3. Enable Authentication > Sign-in method > Google
// 4. Register your web app in Project Settings
// 5. Copy your config from Firebase and replace demoFirebaseConfig below
// 6. Rename demoFirebaseConfig to firebaseConfig
// 7. Update the import in AuthContext.jsx

// Your actual Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD7KywFeQkUcdAXWpBsEHJainAHaGLf8SQ",
  authDomain: "buildfit-bda90.firebaseapp.com",
  projectId: "buildfit-bda90",
  storageBucket: "buildfit-bda90.firebasestorage.app",
  messagingSenderId: "755269577701",
  appId: "1:755269577701:web:c92ad911df218617975d0c",
  measurementId: "G-WF624THN1G"
};

// EXAMPLE - Replace with your actual config:
// export const firebaseConfig = {
//   apiKey: "AIzaSyC_your_actual_api_key_here",
//   authDomain: "your-project-id.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project-id.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:your_actual_app_id"
// };
