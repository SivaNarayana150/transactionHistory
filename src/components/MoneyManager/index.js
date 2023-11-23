import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionHistoryList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionHistoryList} = this.state
    const updatedTransactionHistoryList = transactionHistoryList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({transactionHistoryList: updatedTransactionHistoryList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {optionId, titleInput, amountInput} = this.state

    const optionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = optionType

    const newTransactionHistory = {
      id: uuidv4(),
      type: displayText,
      title: titleInput,
      amount: parseInt(amountInput),
    }

    this.setState(prev => ({
      transactionHistoryList: [
        ...prev.transactionHistoryList,
        newTransactionHistory,
      ],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChnageTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getTotalIncome = () => {
    const {transactionHistoryList} = this.state

    let incomeAmount = 0

    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getTotalExpenses = () => {
    const {transactionHistoryList} = this.state

    let expensesAmount = 0

    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getTotolBalance = () => {
    const {transactionHistoryList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0

    let expensesAmount = 0

    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, transactionHistoryList} = this.state

    const balanceAmount = this.getTotolBalance()
    const incomeAmount = this.getTotalIncome()
    const expensesAmount = this.getTotalExpenses()

    return (
      <div className="bg-container">
        <div className="money-user-card-container">
          <h1 className="user-heading">Hi, Richard</h1>
          <p className="welcone-description">
            Welcome back to your{' '}
            <span className="money-manager-span">Money Manager</span>
          </p>
        </div>

        <ul>
          <MoneyDetails
            expensesAmount={expensesAmount}
            incomeAmount={incomeAmount}
            balanceAmount={balanceAmount}
          />
        </ul>

        <div className="transaction-history-container">
          <div className="form-container">
            <h1 className="transaction-heading">Add Transaction</h1>

            <forn className="form-element" onSubmit={this.onAddTransaction}>
              <div className="title-input-container">
                <label htmlFor="title" className="title-label">
                  TITLE
                </label>

                <input
                  type="text"
                  id="title"
                  placeholder="TITLE"
                  className="title-input-element"
                  onChange={this.onChnageTitleInput}
                  value={titleInput}
                />
              </div>

              <div className="title-input-container">
                <label htmlFor="amount" className="title-label">
                  AMOUNT
                </label>

                <input
                  type="text"
                  id="amount"
                  placeholder="AMOUNT"
                  className="title-input-element"
                  onChange={this.onChangeAmountInput}
                  value={amountInput}
                />
              </div>

              <div className="title-input-container">
                <label htmlFor="select" className="title-label">
                  TYPE
                </label>

                <select
                  id="select"
                  className="title-input-element"
                  onChange={this.onChangeOptionId}
                >
                  <option
                    key={transactionTypeOptions[0].optionId}
                    value={transactionTypeOptions[0].optionId}
                  >
                    {transactionTypeOptions[0].displayText}
                  </option>

                  <option
                    key={transactionTypeOptions[1].optionId}
                    value={transactionTypeOptions[1].optionId}
                  >
                    {transactionTypeOptions[1].displayText}
                  </option>
                </select>
              </div>

              <button type="submit" className="add-button">
                Add
              </button>
            </forn>
          </div>

          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <ul>
              <li className="list-headings">
                <p className="headings">Title</p>
                <p className="headings">Amount</p>
                <p className="headings">Type</p>

                {transactionHistoryList.map(eachItem => (
                  <TransactionItem
                    key={eachItem.id}
                    transactionDetails={eachItem}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

// Write your code here
