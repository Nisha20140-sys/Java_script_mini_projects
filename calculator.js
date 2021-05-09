class Calculator{
    constructor(){
        this.numArr = []
        this.currentNum = ""
        this.result = ""
        this.prevResult = ""
        this.operation = []
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
            this.numOne =  this.numOne.substring(0,(this.numOne.length-1))
            return;
        }
        this.numTwo =  this.numTwo.substring(0,(this.numTwo.length-1))

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

const updateSecondaryDisplay = () =>{
    const secondary = document.getElementById("secondary-display")
    const newNumArr = [...calculator.numArr]
    const newOperation = [...calculator.operation]
    let innerHTML = ""
    while(newNumArr.length !== 0){
        const num = newNumArr.shift()
        const operation1 = newOperation.shift()
        innerHTML += `${num} <span class="operand">${SignObject[operation1] ? SignObject[operation1] : ""}</span>`
    }
    secondary.innerHTML = innerHTML
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
        calculator.prevResult+='*'
    }else if (operation ==='DIVIDE'){
        calculator.prevResult+='/'
    }else if (operation ==='MODULO'){
        calculator.prevResult+='%'
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
    let result=eval(calculator.prevResult)
    if (Number(result) === result && result % 1 === 0){
        main.innerHTML = result
    }else{
        main.innerHTML = result.toFixed(2);
    }
    // calculator.numArr=[]
    // calculator.operation=[]
}

const actionKeyClickHandler = (action) => {
    switch (action) {
        case "CLEAR_ALL":
            calculator.clearCalculator()
            break;
        case "CHANGE_SIGN":
            calculator.changeSign(calculator.operation ? false : true)
            break;
        default:
            break;
    }
    updateMainDisplay()
    updateSecondaryDisplay()
}

const undoClickHandler = () =>{
    calculator.undo(calculator.operation ? false : true)
    updateMainDisplay()
    updateSecondaryDisplay()
}