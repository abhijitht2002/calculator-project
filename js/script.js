const buttons = document.querySelectorAll("button")
const display = document.querySelector("input")

let curnum = ""
let lastnum = null
let lastop = null
let lastInput = null

for(let button of buttons){

    button.addEventListener("click", function(){

        const value = button.textContent;

        if("0123456789".includes(value)){

            curnum += value
            display.value = curnum

        }else if(value === "."){

            if(!curnum.includes(".")){
                curnum += "."
                display.value = curnum
            }

        }else if("+-×÷".includes(value)){

            if(curnum === "" && lastnum === null){
                return;
            }

            if(lastnum === null){
                lastnum = parseFloat(curnum)
                display.value = ""
            }else if(curnum !== ""){
                lastnum = operate(lastnum, parseFloat(curnum), lastop)
                display.value = lastnum
            }else{
                display.value = ""
            }
            
            curnum = ""
            lastop = value

        }
        else if(value === "C"){
            lastnum = null
            curnum = ""
            lastop = null
            display.value = ""
        }
        else if(value === "+/-"){
            if(curnum !== ""){
                curnum = (parseFloat(curnum) * -1).toString()
                display.value = curnum
            }else if(lastnum !== null){
                lastnum = -lastnum
                display.value = lastnum
            }
        }
        else if(value === "x²"){
            if(display.value !== ""){
                let num = parseFloat(display.value)
                let sq = Math.pow(num, 2)
                display.value = sq
                curnum = ""
                lastnum = sq
                // lastop = null
            }
        }
        else if(value === "x³"){
            if(display.value !== ""){
                let num = parseFloat(display.value)
                let cu = Math.pow(num, 3)
                display.value = cu
                curnum = ""
                lastnum = cu
                // lastop = null
            }
        }
        else if(value === "="){

            if (lastnum !== null) {
                if (curnum !== "") {
                    lastInput = parseFloat(curnum);
                }
                if (lastop && lastInput !== null) {
                    lastnum = operate(lastnum, lastInput, lastop);
                    display.value = lastnum;
                    curnum = "";
                }
            }

        }

    })

}

function operate(a, b ,op){

    switch(op){

        case "+" : return a+b
        case "-" : return a-b
        case "×" : return a*b
        case "÷" : return b===0 ? "error" : a/b
    }
}