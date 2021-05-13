class Calculator{
    constructor(){
        this.numArr = []
        this.currentNum = ""
        this.result = ""
        this.prevResult = ""
        this.operation = []
        this.exc=""
        this.store =[]
    }
    // add(numOne,numTwo){
    //     return Number(numOne) + Number(numTwo)
    // }
    // subtract(numOne,numTwo){
    //     return Number(numOne) -  Number(numTwo)
    // }
    // multiply(numOne,numTwo){
    //     return (Number(numOne) *  Number(numTwo)).toFixed(2);
    // }
    // divide(numOne,numTwo){
    //     return (Number(numOne) /  Number(numTwo)).toFixed(2);
    // }
    setCurrentNum(value){
        this.currentNum += value
    }
    clearCurrentNum(){
        this.numArr.push(this.currentNum) 
        this.currentNum = ""
    }
    setOperation(operation){
        this.operation.push(operation)
        this.numArr.push(this.currentNum)
        this.currentNum = ""
    }
    clearCalculator(){
        this.numArr = []
        this.currentNum = ""
        this.result = ""
        this.prevResult = ""
        this.operation = []
        this.exc=""
        this.store =[]
    }
    changeSign(forNumOne){
        if(forNumOne){
            this.numOne = String(Number(this.numOne) * -1)
            return
        }
        this.numTwo =  String(Number(this.numTwo) * -1)
    }
    undo(forNumOne){
        if(forNumOne){
            this.prevResult =  this.prevResult.substring(0,(this.prevResult.length-1))
            this.clearCurrentNum()
            return;
        }
        this.prevResult =  this.prevResult.substring(0,(this.prevResult.length-1))
        this.clearCurrentNum()

    }
}

const SignObject = {
    ADD:"+",
    SUBTRACT:"-",
    MULTIPLY:"x",
    DIVIDE:"÷",
    MODULO:"%"
}




const calculator = new Calculator()



const updateMainDisplay = () =>{
    const main = document.getElementById("main-display")
    main.innerText =  calculator.currentNum || 0
   
}
var nu;
const updateSecondaryDisplay = () =>{
    const secondary = document.getElementById("secondary-display")
    const newNumArr = [...calculator.prevResult]
    // const newOperation = [...calculator.operation]
    nu=newNumArr.join("")
    let innerHTML = ""
    while(newNumArr.length !== 0){
        const num = newNumArr.shift()
        // const operation1 = newOperation.shift()
        innerHTML += `${num} <span></span>`
        // console.log(num)
    }

    secondary.innerHTML = innerHTML
} 
const originalDisplay=()=>{
    calculator.prevResult=""
    const realArr= [...nu]
    nu=""
    while(realArr.length!==0){
        const num =realArr.shift()
        if (num ==='+'){
            calculator.prevResult+='+'
        }
        else if (num ==='-'){
            calculator.prevResult+='-'
        }else if (num  ==='x'){
            calculator.prevResult+='*'
        }else if (num ==='÷'){
            calculator.prevResult+='/'
        }else if (num ==='%'){
            calculator.prevResult=String(eval(calculator.prevResult+'*0.01'))
        }else if (num ==='^'){
            calculator.prevResult+='**'

        }else{
            calculator.prevResult+=num
        }
        nu+=num
}
}

const numKeyClickHandler = (num) =>{
    calculator.prevResult+=num
    calculator.setCurrentNum(num)
    updateMainDisplay()
    updateSecondaryDisplay()
}

const operandKeyClickHandler = (operation) =>{
    if (operation ==='ADD'){
        calculator.prevResult+='+'
    }
    else if (operation ==='SUBTRACT'){
        calculator.prevResult+='-'
    }else if (operation ==='MULTIPLY'){
        calculator.prevResult+='x'
    }else if (operation ==='DIVIDE'){
        calculator.prevResult+='÷'
    }else if (operation ==='MODULO'){
        calculator.prevResult+='%'
    }
    else if (operation==="CHANGE_SIGN"){
        calculator.prevResult+='^'
    }
    calculator.setOperation(operation)
    updateMainDisplay()
    updateSecondaryDisplay()
}

const resultClickHandler = () =>{
    calculator.clearCurrentNum()
    // const newNumArr = [...calculator.numArr]
    // const newOperation = [...calculator.operation]
    // // TODO: Move logic to class as result method
    // while(newNumArr.length !== 1){
    //     const numOne = newNumArr.shift()
    //     const numTwo = newNumArr.shift()
    //     const operation = newOperation.shift()

        // switch (operation) {
        //     case "ADD":
        //         newNumArr.unshift(calculator.add(numOne,numTwo))
        //         break;
        //     case "SUBTRACT":
        //         newNumArr.unshift(calculator.subtract(numOne,numTwo))
        //         break;
        //     case "MULTIPLY":
        //         newNumArr.unshift(calculator.multiply(numOne,numTwo))
        //             break;
        //     case "DIVIDE":
        //         newNumArr.unshift(calculator.divide(numOne,numTwo))
        //             break;
        //     default:
        //         break;
        // }
    // }
    updateSecondaryDisplay()
    const main = document.getElementById("main-display")
    // console.log(newNumArr)
    // console.log(calculator.prevResult)
    console.log(typeof nu)
    originalDisplay()
    console.log(calculator.prevResult)
    try {
        let result=eval(calculator.prevResult)
        calculator.currentNum=result
    if (String(result).length>7 && Number(result) === result && result % 1 === 0){
        main.innerHTML = `= ${result.toExponential(2)}`
        calculator.currentNum=""
    }
    else if (Number(result) === result && result % 1 === 0){
        main.innerHTML = `= ${result}`
        calculator.currentNum=""
    }else{
        main.innerHTML = `= ${result.toFixed(2)}`;
        calculator.currentNum=""
    }
      }
      catch(err) {
        main.innerHTML = `math error :(`;
      }
      calculator.prevResult=[...nu].join("")
    // calculator.numArr=[]
    // calculator.operation=[]
}

const actionKeyClickHandler = (action) => {
    switch (action) {
        case "CLEAR_ALL":
            calculator.clearCalculator()
            break;
        default:
            break;
    }
    updateMainDisplay()
    updateSecondaryDisplay()
}

const undoClickHandler = () =>{
    calculator.undo(calculator.prevResult)
    updateMainDisplay()
    updateSecondaryDisplay()
}