import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: cert('./credentials.json'),
});
const db = getFirestore(app);
const collection = db.collection('users');

const setItem = async (key, value) => {
  await collection.doc(key).set(value);
};

const fetchItems = async () => {
  const items = {};
  const snapshot = await collection.get();
  snapshot.forEach((item) => {
    items[item.id] = item.data();
  });
  return items;
};

const removeItem = async (key) => {
  await collection.doc(key).delete();
};

(async () => {
  await setItem('memochou1993', {
    name: 'Memo Chou',
    age: 18,
  });

  console.table(await fetchItems());
  
  await removeItem('memochou1993');

  console.table(await fetchItems());
})();
