import Collection from './collection.js';

const collection = new Collection('customers');

(async () => {
  console.log('addItem', await collection.addItem({ name: 'Alice' }));
  console.log('updateItem', await collection.updateItem('HdSVo6LxuBlizdgY3jTd', { name: 'Bob' }));
  console.log('getItem', await collection.getItem('0vBJGiONCUaU9JZpShAA'));
  console.log('getItems', await collection.getItems());
  console.log('removeItem', await collection.removeItem('0vBJGiONCUaU9JZpShAA'));
  console.log('getCount:', await collection.getCount());
})();
