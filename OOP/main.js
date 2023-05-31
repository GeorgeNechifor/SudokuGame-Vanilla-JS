
import {Second} from './btndel.js';

let divs = [];
let conts = [];
let count = 0;
const sc = new Second(divs);


class Sudoku {
    constructor(div , container , bigList , btn , options , targe , color , bb) {
        this.div = div;
        this.container = container;
        this.bigList = bigList;
        this.btn = btn;
        this.options = options;
        this.targe = targe;
        this.color = 'rgb(144, 105, 244)';
        this.bb = bb;
    }

    createMatrixThree = () => {
        this.container = document.createElement('div');
        conts.push(this.container);
        this.container.className = "container";
        for (let i = 1; i <= 9;++i) {
            this.div = document.createElement('div');
            this.div.className = "box";
            divs.push(this.div);
            this.container.appendChild(this.div);
            
        }

        return this.container;

    }


    positionsHover = (y , x) => {
        divs.forEach(element => {
            let pos = element.getBoundingClientRect();
            if (pos.top == y || pos.left == x) {
               element.style.background = this.color;
               element.style.opacity = '0.8'
               
            }
            else element.style.background = 'transparent';
        })
    }

    checkMistake = (x , y , val) => {
        let cn = [] , nr = 0;
        for (let i = 0; i < 81;++i) {
            let pos = divs[i].getBoundingClientRect();
            if (pos.left == x || pos.top == y) {
                if (divs[i].textContent == val) {
                    nr++;
                    cn.push(divs[i]);
                }

            }
        }

        if (nr > 1) return cn;
        return false;

    }
    setBack = () => {
        divs.forEach(element => {
            if (element.textContent != '') element.style.background = 'gray';

        })
    }

    checkRepeat = (x , y , value) => {
        let cn = 0;
        for (let i = 0; i < 81;++i) {
            let pos = divs[i].getBoundingClientRect();
            if (x == pos.left || y == pos.top) {
                if (divs[i].textContent == value) cn++;
            }
        }
        return cn == 0;
    }
    

    resetBoard = () => {
        divs.forEach(element => {
            element.style.background = 'transparent'
        })
    }

     eventBoxes = () => {

        document.querySelector(".bigger").addEventListener("mouseover" , (event) => {
            let targ = event.target;
            if (targ.classList.contains('box')) {
                let pos = targ.getBoundingClientRect();
                this.positionsHover(pos.top , pos.left);
            }
        
        })

        window.addEventListener('mouseover' , (event) => {
            let targ = event.target;
            if (targ.classList.contains('mm')) this.resetBoard()
        })
    }

    createBigMatrix = () => {
        this.bigList = document.createElement('div');
        this.bigList.className = "bigger";
        for (let i = 1; i <= 9;++i) {
            this.bigList.appendChild(this.createMatrixThree());
        }
        return this.bigList;
    }

    getTransparentBackground = (el) => {
        for (let i = 1; i <= 9;++i) {
            if (i != el) {
                document.getElementById(i).style.background = "transparent";
                document.getElementById(i).style.color = 'white'
                document.getElementById(i).className = 'but'
            }
            else {
                document.getElementById(i).className = 'clicked';
            }
            
        }
    }
    eventNumbers = () => {
        this.options.addEventListener("click" , (event) => {
            event.target.style.background = 'white';
            event.target.style.color = '#333'
            event.target.style.border = '2px solid white'

            let id = event.target.id;
            this.getTransparentBackground(id);
            this.eventBoxes();

            this.options.className = 'active';
            this.color = 'rgb(144, 105, 244)'
            document.querySelector(".bigger").removeEventListener('click' , this.biggerDel)
            document.querySelector(".del").style.background = 'white';
            sc.higlithBack(id);
            
        })    
    }

    eraseMistake = () => {
       divs.forEach(element => {
            element.className = 'box';
       })
       this.targe.innerHTML = '';
    }

    getValue = (bool) => {

        if (!bool) {
            for (let i = 1; i <= 9;++i) {
                let val = document.getElementById(i);
                if (val.classList.contains('clicked')) return i;
            }
        }
        return " ";
       
    }
    checkSame = (value) => {
       for (let i = 0; i <= 72;i += 8) {
            let cn = 0;
            let nr = [];
            for (let j = i; j <= i + 8;++j) {
                if (divs[j].textContent == value) {
                    cn++;
                    nr.push(divs[j]);
                }
            }
            if (cn > 1) return nr;
            i++;
       }
       return false;
    }
    randomNumber = (list) => {
        let rand = Math.floor(Math.random() * list.length);
        return list[rand];
    }
    randomPosition = (number) => {
        let bool = [];
        let i = 0;
        for (i; i < number;++i) {
            bool[i] = true;
        }
        for (let j = i + 1; j <= 5;++j) bool[j] = false;
        let r = Math.floor(Math.random() * bool.length);
        return bool[r];
        
        
    }

    completeBoard = (number) => {
        let cn = 0;
        for (let i = 0; i < 72;i += 8) {
            let list = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];
            for (let j = i; j <= i + 8;++j) {
                if (this.randomPosition(number)) {
                    let pos = divs[j].getBoundingClientRect();
                    let nr = this.randomNumber(list);
                    if (this.checkRepeat(pos.left , pos.top , nr)) {
                            divs[j].innerHTML = nr;
                           if (sc.checkRepetitivePosition(nr) == false) {
                                let ind = list.indexOf(nr);
                                list.splice(ind , 1);
                           } else divs[j].innerHTML = '';
                        
                    }
                }
                
            }
            i++;
        }
    }
    repetitive = () => {
        document.querySelector(".start").style.display = 'none';
        document.querySelector(".mm").style.display = 'grid';
    }

    eventsDif = () => {
        document.querySelector(".difi").addEventListener('click' , (event) => {
            let tt = event.target;

            if (tt.classList.contains('easy')) {
                this.repetitive()
                this.completeBoard(4);
            }
            else if (tt.classList.contains('medium')) {
                this.repetitive();
                this.completeBoard(3);

            }
            else if (tt.classList.contains('hard')) {
                this.repetitive();
                this.completeBoard(2);

            }
            else if (tt.classList.contains('insane')) {
                this.repetitive();
                this.completeBoard(1);

            }
        })
    }

    losingTime = () => {
        document.querySelector(".play").style.display = 'grid';
        document.querySelector(".mm").style.opacity = '0.4';
        this.playAgainEvent();
    }

    playAgainEvent = () => {
        document.querySelector(".playAg").addEventListener('click' , () => {
            window.location.reload();
        })
    }

    createBtn = () => {
       this.bb = document.createElement("button");
       this.bb.classList.add('del');
       this.bb.innerHTML = 'Delete';
       document.querySelector(".mm").appendChild(this.bb);

    }

    biggerDel = (event) => {
        if (event.target.classList.contains('box')){
                event.target.innerHTML = '';
            }
    }

    eventNewBtn = () => {
        document.querySelector('.del').addEventListener('click' , (event) => {
            this.color = 'rgb(249, 76, 76)';
            this.options.className = 'options';
            event.target.style.background = 'gray';
            event.target.style.border = 'none'
            this.getTransparentBackground(20);
            document.querySelector(".bigger").addEventListener('click' , this.biggerDel);
            
        })
    }

    biggerEvent = () => {
        let check = false;
        let mis = 0;
        this.createBtn();
        this.eventNewBtn()
        const nn = document.querySelector(".number");
        document.querySelector(".bigger").addEventListener('click' , (event) => {
            this.targe = event.target;
            let boolValues = [];
            if (this.options.classList.contains("active")) {
                if (this.targe.classList.contains('box')) {
                    if (this.targe.textContent == '') {
                        if (this.getValue(false) != undefined) {
                            this.targe.innerHTML = this.getValue(false);
                            count++;
                            let pos = this.targe.getBoundingClientRect();
                            if (this.checkMistake(pos.left , pos.top , this.getValue(false)) != false) {
                                this.checkMistake(pos.left , pos.top , this.getValue(false)).forEach(element => {element.className = 'error'})
                                setTimeout(this.eraseMistake , 2000);
                                check = true;
                                boolValues.push(check);
        
                            }
                            else check = false,boolValues.push(check);
                            if (this.checkSame(this.getValue(false)) != false) {
                               
                                this.checkSame(this.getValue(false)).forEach(element => {element.className = 'error'});

                                check = true;
                                boolValues.push(check);
                                setTimeout(this.eraseMistake , 2000);
                                
                            }
                            else check = false,boolValues.push(check);
                            if (sc.checkRepetitivePosition(this.targe.textContent) != false) {
                                sc.checkRepetitivePosition(this.targe.textContent).forEach(element => {element.className = 'error'});
                                check = true;
                                boolValues.push(check);
                                setTimeout(this.eraseMistake , 2000);
                                
                            } else check = false,boolValues.push(check);
                            
                            if (sc.setMissNumber(boolValues))
                            {
                                mis++;
                                nn.innerHTML = mis;

                                if (mis >= 4)
                                {
                                    setTimeout(this.losingTime , 1000);
                                }
                            }
                           
                        }
                    }
                    
                }
             
        
            }
            
        })
    }
    
    createOptions = () => {
       for (let i = 1; i <= 9;++i) {
            this.btn = `<div class="but" id=${i}>${i}</div>`;
            this.options.innerHTML += this.btn;
            
       }

    }

   
    
}
let dv , cont;
let big;
let bt , target;
let options = document.querySelector(".options");
let main = new Sudoku(dv , cont , big , bt , options , target);
const doc = document.querySelector(".mm");


doc.appendChild(main.createBigMatrix())
main.createOptions();
main.eventNumbers();
main.biggerEvent();
main.eventsDif();

