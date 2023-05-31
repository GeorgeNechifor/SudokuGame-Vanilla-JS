

class Second {
    constructor(div) {
        this.div = div;
    }
    checkRepetitivePosition = (value) => {
        let positions = [] , elements = [];
        let check = false;
        let cn = 0 , nr = 0;
        for (let i = 0; i < 81;++i) {
           
           if (cn % 9 == 0) cn = 0;
            if (this.div[i].textContent == value) {
                positions.push(cn);
                nr++;
                
            }
            cn++;
        }
        
        positions.sort();
        let last = [];
        for (let i = 0; i < nr - 1;++i) {
            if (positions[i] == positions[i + 1]) last.push(positions[i]);
        }
        let result = [];
        last.forEach(number => { 
            let cnt = 0 , main = 0;
            for (let i = 0; i < 81;++i) {
                if (cn % 9 == 0) cn = 0;

                if (cn == number) {
                    if (this.div[main].textContent == value) result.push(this.div[main]) , check = true;
                }
            

                main++;
                cn++;
            }
        })

        if (check) return result;

        return false;

        
    }  
    
    higlithBack = (number) => {
        this.div.forEach(element => {
            element.textContent == number ? element.style.background =  'rgb(144, 105, 244)' : element.style.background = 'transparent'
        })
    }

    selectFill = () => {
        let cn = 0;
        let lst = [];
        for (let i = 0; i < 81;++i) {
            
            if (this.div[i].textContent == '') lst.push(this.div[i]);
        }

        return lst;
    }

    setMissNumber = (boolList) => {
        let ck = false;
        boolList.forEach(boolVal => {if (boolVal == true)
        {
            ck = boolVal;
        }})

        return ck;

    }

    

}


export {Second};

