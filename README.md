rajasthan-pyq/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProtectedRoute.jsx     // लॉगिन चेक
│   │   │   └── AdminRoute.jsx         // एडमिन चेक
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── ExamCategories.jsx
│   │   │   ├── PremiumBundles.jsx
│   │   │   └── FreePapers.jsx
│   │   ├── exam/
│   │   │   ├── ExamList.jsx
│   │   │   └── ExamTable.jsx
│   │   ├── payment/
│   │   │   └── RazorpayButton.jsx
│   │   ├── dashboard/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── PurchasedPapers.jsx
│   │   │   └── PaymentHistory.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── PaperManager.jsx
│   │       ├── UserList.jsx
│   │       └── RevenueOverview.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ExamPage.jsx          // /exams/:examId
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFound.jsx
│   ├── firebase/
│   │   ├── config.js             // Firebase init
│   │   ├── auth.js               // signIn, signUp, logOut
│   │   ├── firestore.js          // CRUD functions
│   │   └── storage.js            // file upload/download
│   ├── context/
│   │   └── AuthContext.jsx       // user state
│   ├── utils/
│   │   ├── razorpay.js           // Razorpay checkout handler
│   │   └── seo.js                // meta tags
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css                 // Tailwind CSS import
├── tailwind.config.js
├── package.json
├── .gitignore
└── README.md