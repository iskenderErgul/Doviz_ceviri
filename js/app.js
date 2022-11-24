const api_key="<api_key>";
const url = "https://v6.exchangerate-api.com/v6/"+api_key;

// elements 

const dovizKuru1 = document.querySelector("#dovizKuru1");
const dovizKuru2 = document.querySelector("#dovizKuru2");
const list_one = document.querySelector("#list_one");
const list_two = document.querySelector("#list_two");
const miktar = document.querySelector("#miktar");
const hesapla= document.querySelector("#calculate");
const sonuc = document.querySelector("#sonuc");


fetch(url+"/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options ;
        for (let item of items) {
            options+=`<option value=${item[0]}>${item[1]}</option>`;
        }
        list_one.innerHTML=options;
        list_two.innerHTML=options;
    });

hesapla.addEventListener("click", function(){
    const döviz1=dovizKuru1.value;
    const döviz2=dovizKuru2.value;
    const inputMiktarı= miktar.value;

    fetch(url + "/latest/"+döviz1)
        .then(res => res.json())
        .then(data => {
            const hesaplananSonuc= (data.conversion_rates[döviz2]*inputMiktarı).toFixed(3);
            sonuc.innerHTML=`
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size: 30px;">
                    ${inputMiktarı} ${döviz1}=${hesaplananSonuc} ${döviz2}
                    </div>  
                </div>
            `;

        })


});