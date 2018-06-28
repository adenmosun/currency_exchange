
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
    let convert = `${select.options[select.selectedIndex].value}_
                    ${select_to.options[select_to.selectedIndex].value}`;
    let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${convert}&compact=ultra`

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
    .then(results => {
        let rate = results[convert];
        let result = rate * input.value;
        result = Math.round(result * 100) / 100;
        output.innerHTML = result;
        console.log(result);
    });
}


