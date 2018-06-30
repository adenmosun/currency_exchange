
function processFile() {

    
let dbPromise = idb.open('currency_exchange_db', 1, upgradeDb => {
    
    switch(upgradeDb.oldVersion) {
    case 0:
      let keyValStore = upgradeDb.createObjectStore('currencies',  {keyPath: 'id', autoIncrement: true});
    case 1:
      let keyValstore = upgradeDb.createObjectStore('conversion', {keyPath: 'id', autoIncrement: true});
  }
  
  });
      

   //add currencies to db

	dbPromise.then(db => {
  		let tx = db.transaction('currencies', 'readwrite');
  		let currencies = tx.objectStore('currencies');
  		currencies.add({currencyName, currencyId});
  		return tx.complete;
	}).then(() => {
  		console.log('added item to currencies!');

	});

    //add rates to db

	dbPromise.then(db => {
  		let tx = db.transaction('conversion', 'readwrite');
  		let conversion = tx.objectStore('conversion');
  		conversion.add({rate, convert_from, convert_to});
  return tx.complete;
}).then(() => {
  console.log('added rate to conversion!');

});

}