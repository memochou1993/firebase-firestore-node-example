import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: cert('./credentials.json'),
});

const db = getFirestore(app);

(async () => {
  const docRef = db.collection('users').doc('memochou1993');
  await docRef.set({
    name: 'Memo Chou',
    age: 18,
  });
})();

(async () => {
  const snapshot = await db.collection('users').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
})();

(async () => {
  const res = await db.collection('users').doc('memochou1993').delete();
  console.log(res);
})();
