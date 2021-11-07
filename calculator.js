///source: https://www.youtube.com/watch?v=j59qQ7YWLxw (didn't copy his code word to word but followed his instruction and incorporated his idea)

class Calculator {
    constructor(prevText, currText) {
        this.prevText = prevText;
        this.currText = currText;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //add to screen when button-clicked
    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseInt(this.previousOperand)
        const curr = parseInt(this.currentOperand)

        if(isNaN(prev) || isNaN(curr)) return
        
        else if (this.operation === "+") {
            computation = prev + curr
        }
        else if (this.operation === "-") {
            computation = prev - curr
        }
        else if (this.operation === "*") {
            computation = prev * curr
        }
        else if (this.operation === "÷") {
            computation = parseInt(prev / curr)
        }
        else {
            return
        }
        
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //update the values of the output
    update() {
        this.prevText.innerText = this.previousOperand
        if (this.operation != null) {
            this.prevText.innerText = this.previousOperand + this.operation
        }
        this.currText.innerText = this.currentOperand
    }
}

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const eqButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const prevText = document.querySelector('[data-previous]')
const currText = document.querySelector('[data-current]')

const calculator = new Calculator(prevText, currText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

eqButton.addEventListener('click', button => {
    calculator.compute()
    calculator.update()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.update()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.update()
})