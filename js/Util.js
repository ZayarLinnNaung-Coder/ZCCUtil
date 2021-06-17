class Util{
    fetchAll(){
        async function fetchMM(){
            let objArr = [];
            const response = await fetch('https://github.com/ZayarLinnNaung-Coder/ZCCUtil/mm-binList-data.csv');
            const responseText = await response.text();
            const headerTable = responseText.split('\n').slice(0,1)[0].split(',');
            const dataTable = responseText.split('\n').slice(1);

            dataTable.forEach((dataRow)=>{
                const columns = dataRow.split(",");
                let obj = {};
                for(let i=0; i<headerTable.length; i++){
                    const type = headerTable[i];
                    obj[type] = columns[i];
                }
                objArr.push(obj)
            })
            return objArr;
        }
        async function fetchGlobal(){
            let objArr = [];
            const response = await fetch('https://github.com/ZayarLinnNaung-Coder/ZCCUtil/binList-data.csv');
            const responseText = await response.text();
            const headerTable = responseText.split('\n').slice(0,1)[0].split(',');
            const dataTable = responseText.split('\n').slice(1);

            dataTable.forEach((dataRow)=>{
                const columns = dataRow.split(",");
                let obj = {};
                for(let i=0; i<headerTable.length; i++){
                    const type = headerTable[i];
                    obj[type] = columns[i];
                }
                objArr.push(obj)
            })
            return objArr;
        }
        return [{"mm": fetchMM()},{"global": fetchGlobal()}];
    }

    retriveDetail(bin, from){
        const lengthOfBin = bin.length;
        let targetData;
        from.map((elt) => {
            const dBin = String(elt.bin);
            const lengthOfDBin = String(elt.bin).length;

            if(lengthOfDBin > lengthOfBin){
                const slicedDBin = dBin.substr(0, lengthOfBin);
                if(slicedDBin === bin){
                    targetData = elt;
                }
            }else{
                const slicedBin = bin.substr(0, lengthOfDBin);
                if(slicedBin === dBin){
                    targetData = elt;
                }
            }
        });
        return targetData;
    }
}
