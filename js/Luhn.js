class Luhn{
    validate(cardNumber){
        let total = 0;
        for(let i=0; i<cardNumber.length; i++){
            let x = parseInt(cardNumber[i]);
            if(i%2 == 0){
                x = x * 2;
                if(x > 9) x -= 9;
            }
            total += x;
        }
        return total%10 == 0;
    }
}