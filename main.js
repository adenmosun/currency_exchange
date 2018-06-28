



//list of currencies from api

let select = document.getElementById('currency_list');
let select_to = document.getElementById('currency_list_to');


const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Error ' + 
          response.status);  
        return;  
      }

      
        
          return response.json();
        })

        .then(function(results) {
          for (const result in results) {
            for (const id in results[result]) {
             
              option = document.createElement('option');
              // option.text = results[result][id]["currencyName"];
              // option.value = results[result][id]["id"];
              const currencyId = results[result][id]["id"];
        	  const currencyName = results[result][id]["currencyName"];
        	  option.setAttribute("value", currencyId);
        	  option.text = `${currencyId} (${currencyName})`;
             
                  console.log(results[result][id]["currencyName"]);
                  select.add(option);
            }
          }
          for (const result in results) {
            for (const id in results[result]) {
             
              option = document.createElement('option');
              const currencyId = results[result][id]["id"];
        	  const currencyName = results[result][id]["currencyName"];
        	  option.setAttribute("value", currencyId);
        	  option.text = `${currencyId} (${currencyName})`;
             
                  console.log(results[result][id]["currencyName"]);
                  select_to.add(option);
            }
          }

      });  





    //Get rate and and calculate conversion

		let input = document.getElementById('currency_amount');
		let output =  document.getElementById('output');

function convertCurrency(){
    var convert_from = select.options[select.selectedIndex].value;
    var convert_to = select_to.options[select_to.selectedIndex].value;
    let convert = `${convert_from}_${convert_to}`;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${convert}&compact=ultra`

    fetch(url).then(
        response => response.json()
    ).then(results => {
        let rate = results[convert];
        let result = rate * input.value;
        result = Math.round(result * 100) / 100;
        output.innerHTML = result;
        console.log(result);
    });
}



    //currencies   https://free.currencyconverterapi.com/api/v5/currencies

// const apiURL = `https://free.currencyconverterapi.com/api/v5/countries`;   
// let countriesCurrencies;
// const dbPromise = idb.open('countries-currencies', 0, upgradeDB => {
//   // Note: we don't use 'break' in this switch statement,
//   // the fall-through behaviour is what we want.
//   switch (upgradeDB.oldVersion) {
//     case 0:
//       upgradeDB.createObjectStore('objs', {keyPath: 'id'});
//   }
// });
// fetch(apiURL)
//   .then(function(response) {
//   return response.json();
// })
//   .then(function(currencies) {
//   dbPromise.then(db => {
//     if(!db) return;
//     countriesCurrencies = [currencies.results];
//     const tx = db.transaction('objs', 'readwrite');
//     const store = tx.objectStore('objs');
//     let i = 0;
//     countriesCurrencies.forEach(function(currency) {
//       for (let value in currency) {
//         store.put(currency[value]);
//       }
//     });
//     return tx.complete;
//   });
// });