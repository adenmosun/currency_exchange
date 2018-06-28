
   import idb from 'idb';

 const dbPromise = idb.open('currency_exchange', 1, upgradeDB => {
  upgradeDB.createObjectStore('currency_exchange');
});


const dbPromise = idb.open('currency_exchange', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('currency_exchange');
      break;
    default:
      console.error('Incomplete');
      break;
  }
});