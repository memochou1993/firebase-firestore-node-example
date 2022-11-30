import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = initializeApp({
  credential: cert(serviceAccount),
});

class Storage {
  constructor(collection) {
    const db = getFirestore(app);
    this.collection = db.collection(collection);
  }

  async getCount() {
    return (await this.collection.count().get()).data().count;
  }

  async setItem(key, value) {
    await this.collection.doc(key).set(value);
  }

  async getItems() {
    const items = {};
    const snapshot = await this.collection.get();
    snapshot.forEach((item) => {
      items[item.id] = item.data();
    });
    return items;
  }

  async removeItem(key) {
    await this.collection.doc(key).delete();
  }
}

const storage = new Storage('links');

(async () => {
  console.log(await storage.getCount());
  await storage.setItem('0', { foo: 'bar' });
  console.log(await storage.fetchItems());
  await storage.removeItem('0');
})();
