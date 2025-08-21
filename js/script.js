const buttons = document.querySelectorAll("button")
const display = document.querySelector("input")

let curnum = ""
let lastnum = null
let lastop = null

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
        else if(value === "CE"){
            if(curnum !== ""){
                curnum = ""
                display.value = ""
            }
        }
        else if(value === "x²"){
            if(display.value !== ""){
                let num = parseFloat(display.value)
                let sq = Math.pow(num, 2)
                display.value = sq
                curnum = sq
            }
        }
        else if(value === "x³"){
            if(display.value !== ""){
                let num = parseFloat(display.value)
                let cu = Math.pow(num, 3)
                display.value = cu
                curnum = cu
            }
        }
        else if(value === "="){

            if(lastnum !== null && curnum !== ""){
                lastnum = operate(lastnum, parseFloat(curnum), lastop)
                display.value = lastnum
                curnum = ""
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

function print(){
    console.log("lastnum: " + lastnum)
    console.log("curnum: " + curnum)
    console.log("lastop: " + lastop)
}