let generateBtn = document.querySelector('.generateBtn');
let cardDetailContainer = document.querySelector('.cardDetail-container');

let utilObj = new Util();
let brandArr = [
    "PRIVATE LABEL", "VISA", "JCB", "ENROUTE", "DISCOVER", "AMERICAN EXPRESS", "DINERS CLUB", "ATM", "MAESTRO", "DANKORT", "ELO", "MASTERCARD", "BANKCARD", "UNIONPAY", "CHINA UNION PAY", "LASER", "GE CAPITAL", "PPT", "SOLO", "PLATIMA", "UK FUEL CARD", "CHJONES FUEL CARD", "RED FUEL CARD", "LOYALTY CARD", "PHH FUEL CARD", "RBS GIFT CARD"
];

let dataGlobalLength;
let dataMMLength;

initApp();

async function initApp() {
    await utilObj.fetchAll()[0].mm.then(value => dataMM = value);
    await utilObj.fetchAll()[1].global.then(value => dataGlobal = value);
    // let binDetailObj = await getBinDetail();
    dataGlobalLength = dataGlobal.length;
    dataMMLength = dataMM.length;
    await setData();
    document.querySelector('.zLoader').style.display = "none";
    document.querySelector('.mainContainer').style.display = "flex";
}

generateBtn.addEventListener("click", function () {
    if(document.body.clientHeight >= window.innerHeight){
        window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    }
    let rawItemList = [];
    let brand = decodeURI(document.querySelector('#brand').value);
    let totalItem = 0;
    for(let i=0; i<dataGlobalLength; i++){
        const speed = Math.trunc((Math.random() * 100) + 10);

        if(brand == dataGlobal[i].brand){
            rawItemList.push(dataGlobal[i]);
            totalItem++;
            if(totalItem == document.querySelector("#quantity").value){
                i = dataGlobalLength;
            }
        }
        i += speed;
    }
    addItem(rawItemList)
})


function setData() {
    brandArr.map((elt) => {
        const encodedElt = encodeURI(elt)
        document.querySelector("#brand").innerHTML += `
            <option value="${encodedElt}">${elt}</option>
        `
    })
}

function addItem(rawItemList) {
    cardDetailContainer.innerHTML = '';
    let length = 16;
    if(rawItemList[0].brand === 'VISA') {
        const max = 16;
        const min = 13;
        length = Math.random() * (max - min) + min;
    }else if(rawItemList[0].brand === 'JCB' || rawItemList[0].brand === 'DISCOVER'|| rawItemList[0].brand === 'LASER') {
        const max = 19;
        const min = 16;
        length = Math.random() * (max - min) + min;
    }else if(rawItemList[0].brand === 'DINERS CLUB') {
        const max = 14;
        const min = 19;
        length = Math.random() * (max - min) + min;
    }else if(rawItemList[0].brand === 'MAESTRO') {
        const max = 13;
        const min = 19;
        length = Math.random() * (max - min) + min;
    }else if(rawItemList[0].brand === 'AMERICAN EXPRESS' ||
        rawItemList[0].brand === 'ENROUTE') {
        length = 15;
    }
    rawItemList.map((rawItem)=>{
        let creditCard = generateCC(length, String (rawItem.bin));
        cardDetailContainer.innerHTML += `
                <div class="detailItem">
                    <div class="classX">
                        <span>BRAND :</span>
                        <span class="result rBrand">${rawItem.brand}</span>
                    </div>
                    <div class="classX">
                        <span>NUMBER :</span>
                        <span class="result rNumber">${creditCard}</span>
                    </div>
                    <div class="classX">
                        <span>BANK :</span>
                        <span class="result rBank">${rawItem.issuer}</span>
                    </div>
                    <div class="classX">
                        <span>NAME :</span>
                        <span class="result rName">xxxxxxxx</span>
                    </div>
                    <div class="classX">
                        <span>ADDRESS :</span>
                        <span class="result rAddress">xxxxxxxxxxxxxxxxxxxxxxxxx</span>
                    </div>
                    <div class="classX">
                        <span>Country :</span>
                        <span class="result rCountry">${rawItem.country}</span>
                    </div>
                    <div class="classX">
                        <span>Money :</span>
                        <span class="result rMoney">$3000 - $4500</span>
                    </div>
<!--                    <div class="classX">-->
<!--                        <span>CVV/CVV2 :</span>-->
<!--                        <span class="result rCVV">1234</span>-->
<!--                    </div>-->
                    <div class="classX">
                        <span>EXPIRY :</span>
                        <span class="result rExpiry">${generateDate()}</span>
                    </div>
                    <div class="classX">
                        <span>PIN :</span>
                        <span class="result rPin">${Math.trunc(Math.random() * (9999 - 1000) + 1000)}</span>
                    </div>
                </div>
    `;
    })
}
function generateCC(length, bin) {
    let luhnObj = new Luhn();
    let requiredLength = length - bin.length;
    let from = Math.pow(10, requiredLength - 1);
    let to = (Math.pow(10, requiredLength) - 1);
    let flag = true;
    while(flag){
        let fillerNum = Math.trunc( Math.random() * (to - from) + from );
        let tempCC = Number( bin + String(fillerNum));
        if (luhnObj.validate(String(tempCC))){
            return tempCC;
        }
    }
}
function generateDate() {
    let month = Math.trunc((Math.random() * 11) + 1)
    let year = Math.trunc(new Date().getFullYear() + (Math.random() * 5));
    let formattedDate = month + "/" + year;
    return formattedDate;

}

