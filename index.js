class Calculator {
        constructor(prevTextValue,currentTextValue){
            this.prevTextValue = prevTextValue;
            this.currentTextValue= currentTextValue;
            this.clear();
        }



        clear(){
            this.currentOperand= ''
            this.previousOperand= ''
            this.operation= '';
        }

        delete(){
            this.currentOperand = this.currentOperand.toString().slice(0,-1)
        }

        appendNumber(number){
            if(number==='.' && this.currentOperand.includes('.')){
                return
            }
            this.currentOperand=this.currentOperand.toString()+ number.toString(); 
        }

        chooseOperation(operation){
                if(this.currentOperand=== ''){
                    return
                }
                if(this.previousOperand !== ''){
                    this.compute()
                }
                this.operation = operation;
                this.previousOperand= this.currentOperand;
                this.currentOperand = '';

        }

        compute(){
            let result;
            let prev = parseFloat(this.previousOperand);
            let current= parseFloat(this.currentOperand);
            if(isNaN(prev) || isNaN(current)) {
                    return
            }

            switch(this.operation){
                case '+':   
                result = prev + current
                break

                case '-':   
                result = prev - current
                break

                case '*':   
                result = prev * current
                break

                case '÷':   
                result = prev / current
                break
                default:
                return
            }
            this.currentOperand = result;
            this.operation - undefined;
            this.previousOperand= '';
                
        }
        getDisplayNumber(number) {
           const stringNumber = number.toString()
           const integerDigits = parseFloat(stringNumber.split('.'[0]))
           const decimalDigits = stringNumber.split('.')[1]
           let integerDisplay 

           if(isNaN(integerDigits)){
            integerDisplay = ''
           } else{
               integerDisplay= integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
           } 
           if(decimalDigits != null) {
               return `${integerDisplay}. ${decimalDigits}`
           } else {
               return integerDisplay
           }
        }

        updateDisplay() {
            this.currentTextValue.innerText= this.getDisplayNumber( this.currentOperand)
            if(this.operation !== null){
                this.prevTextValue.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.prevTextValue.innerText= '';
            }
            

        }







}












const numberButtons = document.querySelectorAll('[data-numbers]');
const operatinButtons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equal]');
const deleteButtons = document.querySelector('[data-delete]');
const clearButtons = document.querySelector('[data-clear-all]');
const prevTextValue = document.querySelector('[data-prev-value]');
const currentTextValue = document.querySelector('[data-current-value]');




let calculator = new Calculator(prevTextValue,currentTextValue);

numberButtons.forEach( button =>{
    button.addEventListener('click', e =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operatinButtons.forEach( button =>{
    button.addEventListener('click', e =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});


equalButtons.addEventListener('click', button=>{
    calculator.compute();
    calculator.updateDisplay()
})

clearButtons.addEventListener('click', button=>{
    calculator.clear();
    calculator.updateDisplay()
})
deleteButtons.addEventListener('click', button=>{
    calculator.delete();
    calculator.updateDisplay()  
})



