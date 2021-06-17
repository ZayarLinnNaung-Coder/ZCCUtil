let validateBtn = document.querySelector(".validateBtn");
let cardNumberInput = document.querySelector("#cardNumberInput");
let cardNumberResult = document.querySelector("#cardNumberResult");
let cardBrandResult = document.querySelector("#cardBrandResult");
let luhnResult = document.querySelector("#luhnResult");
let checksumResult = document.querySelector("#checksumResult");
let binCodeResult = document.querySelector("#binCodeResult");
let issuerResult = document.querySelector("#issuerResult");
let countryResult = document.querySelector("#countryResult");
let cardTypeResult = document.querySelector("#cardTypeResult");

let dataMM = [];
let dataGlobal = [];
let luhnObj = new Luhn();
let utilObj = new Util();

initApp();

async function initApp() {
    await utilObj.fetchAll()[0].mm.then(value => dataMM = value);
    await utilObj.fetchAll()[1].global.then(value => dataGlobal = value);
    document.querySelector('.zLoader').style.display = "none";
    document.querySelector('.main-container').style.display = "flex";
    // let binDetailObj = await getBinDetail();
}

validateBtn.addEventListener("click", function () {
    const cardNumber = cardNumberInput.value;
    if(document.body.clientHeight >= window.innerHeight){
        window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    cardNumberResult.innerHTML = cardNumber;
    if(cardNumber.length >= 12 && luhnObj.validate(cardNumber)){
        changeClass('false', 'true');
        getBinDetail(String(cardNumber).slice(0,6)).then(value => {
            cardBrandResult.innerHTML = value.brand;
            binCodeResult.innerHTML = value.code;
            issuerResult.innerHTML = value.issuer;
            countryResult.innerHTML = value.country;
            cardTypeResult.innerHTML = value.type;
        });
    }else{
        changeClass('true', 'false');
        cardBrandResult.innerHTML = "";
        binCodeResult.innerHTML = "";
        issuerResult.innerHTML = "";
        countryResult.innerHTML = "";
        cardTypeResult.innerHTML = "";
    }

    function changeClass(removeClass, addClass) {
        [luhnResult, checksumResult].map((result) => {
            if(result.classList[1] == 'result-bool-' + removeClass){
                result.classList.remove('result-bool-' + removeClass);
                result.classList.add('result-bool-' + addClass);
                result.innerHTML = addClass;
            }else if(result.classList[1] == 'result-bool-' + addClass){
                result.innerHTML = addClass;
            }
        })
    }
})

async function getBinDetail(bin) {
    let tempBin = await utilObj.retriveDetail(bin, dataMM);

    if (!tempBin) {
        tempBin = await utilObj.retriveDetail(bin, dataGlobal);
    }

    return {
        "brand": tempBin.brand,
        "code": tempBin.bin,
        "issuer": tempBin.issuer,
        "type": tempBin.type,
        "country": tempBin.country
    }
}