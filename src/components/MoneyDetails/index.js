// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <li className="balance-details-container">
      <div className="your-balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="balance"
          className="image-size-in-card"
        />
        <div>
          <p className="type-amount-description">Your Balanace</p>
          <p className="type-amount-description" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>

      <div className="your-income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
          className="image-size-in-card"
        />
        <div>
          <p className="type-amount-description">Your Income</p>
          <p className="type-amount-description" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>

      <div className="your-expenses-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="expenses"
          className="image-size-in-card"
        />
        <div>
          <p className="type-amount-description">Your Expenses</p>
          <p className="type-amount-description" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </li>
  )
}
export default MoneyDetails
