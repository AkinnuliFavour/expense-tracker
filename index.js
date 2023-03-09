let balanceAmount = document.getElementById("balance-amount");
const incomeAmount = document.getElementById("income-amount");
const expensesAmount = document.getElementById("expenses-amount");
const historyList = document.getElementById("history-list");
const transactionLists = document.getElementsByTagName("li");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const submit = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createTransaction(text, amount) {
  const history = document.createElement("li");
  const historySpan = document.createElement("span");
  history.textContent = text;
  history.setAttribute("id", Math.random() * 10);
  historySpan.textContent = amount;
  if (historySpan.textContent.startsWith("-")) {
    history.style.borderRightColor = "brown";
  } else {
    history.style.borderRightColor = "green";
  }
  history.appendChild(historySpan);
  historyList.appendChild(history);

  //   show delete button
  history.addEventListener("mouseover", () => {
    deleteButton.textContent = "X";
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.style.opacity = 1;
    history.appendChild(deleteButton);
  });

  //   remove delete button
  history.addEventListener("mouseout", () => {
    const button = history.lastChild;
    button.style.opacity = 0;
  });
}

function changeBalanceAmount(amount) {
  if (balanceAmount.textContent === 0) {
    return (balanceAmount.textContent = balanceAmount.textContent + amount);
  } else {
    return (balanceAmount.textContent =
      Number(balanceAmount.textContent) + amount);
  }
}

function changeIncomeAmount(amount) {
  if (amount.startsWith("-")) {
    return (expensesAmount.textContent =
      Number(expensesAmount.textContent) + Number(amount));
  } else {
    return (incomeAmount.textContent =
      Number(incomeAmount.textContent) + Number(amount));
  }
}

function inputCheck(text, amount, history, number) {
  if (amount === "" && text === "") {
    alert("Input values needed!");
  } else if (amount === "" || text === "") {
    alert("One of the input fields is still empty!");
    return (history.innerHTML = "");
  } else if (amount !== "" || text !== "") {
    createTransaction(text, amount);
    changeBalanceAmount(number);
    changeIncomeAmount(amount);
  }
}

function deleteTransaction() {
  for (let transactionList of transactionLists) {
    if (transactionList.getAttribute("id") === deleteButton.parentElement.id) {
      historyList.removeChild(transactionList);
      balanceAmount.textContent =
        Number(balanceAmount.textContent) -
        Number(deleteButton.previousSibling.textContent);
      if (deleteButton.previousSibling.textContent.startsWith("-")) {
        expensesAmount.textContent =
          Number(expensesAmount.textContent) -
          Number(deleteButton.previousSibling.textContent);
      } else {
        incomeAmount.textContent =
          Number(incomeAmount.textContent) -
          Number(deleteButton.previousSibling.textContent);
      }
    } else if (!transactionList.hasAttribute("id")) {
      historyList.removeChild(transactionList);
      balanceAmount.textContent =
        Number(balanceAmount.textContent) -
        Number(deleteButton.previousSibling.textContent);
      if (deleteButton.previousSibling.textContent.startsWith("-")) {
        expensesAmount.textContent =
          Number(expensesAmount.textContent) -
          Number(deleteButton.previousSibling.textContent);
      } else {
        incomeAmount.textContent =
          Number(incomeAmount.textContent) -
          Number(deleteButton.previousSibling.textContent);
      }
    }
  }
}

function requestParameter(e) {
  const textValue = text.value;
  const amountValue = amount.value;
  const history = historyList.childNodes;
  let number = Number(amountValue);
  inputCheck(textValue, amountValue, history, number);
  e.preventDefault();
}

deleteButton.addEventListener("click", deleteTransaction);
submit.addEventListener("click", requestParameter);
