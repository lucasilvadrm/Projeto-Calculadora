import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = { // estado inicial da calculadora
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this) //setando o this para o objeto em questão
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState})
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        }else {
            const equals = operation === '='
            const currentOperation = this.state.operation //capturando a operação atual

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')){ //evitar dois . na calculadora
            return
        }
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay //limpar o 0 sempre que algum digito for inserido
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false})

        if(n !== '.') {
            const i = this.state.current //saber qual indice está sendo mexido
            const newValue = parseFloat(displayValue) //convertendo string em numero
            const values = [...this.state.values] //clonando o array
            values[i] = newValue
            this.setState({ values })
        }
    }
    render(){
        // const addDigit = n => this.addDigit(n)
        // const setOperation = op => this.setOperation(op)

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}