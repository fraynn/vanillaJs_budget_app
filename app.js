"use strict"


function displayDate() {
    const date = new Date();
    const monthList = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentMonth = monthList[date.getMonth()];
    const currentYear = date.getFullYear();

    const displayElement = document.querySelector('.budget__title--month');
    displayElement.textContent = `${currentMonth} ${currentYear}`;
}

displayDate();


let budgetData = {
    income: [
        {
            id: 0,
            amount: 345,
            desc: 'aze'
        },
        {
            id: 1,
            amount: 15,
            desc: 'qsd'
        },
        {
            id: 2,
            amount: 78,
            desc: 'wxc'
        },
    ],
    expense: []
};

const submitButton = document.querySelector('.add__btn');
const incomeList = document.querySelector('.income__list');
const expenseList = document.querySelector('.expenses__list');

submitButton.addEventListener('click', () => saveInputValuesAndClear());
document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        saveInputValuesAndClear();
    };
})
displayIncomeList(incomeList);


incomeList.addEventListener('click', evt => deleteElement(evt) );
expenseList.addEventListener('click', e => console.log(e));

function deleteElement(evt) {
    const parentElement = evt.target.closest('.item');
    const parentId = parentElement.id.split('-')[1];
    parentElement.remove();
    removeElementFromList(+parentId, budgetData.income);
}

function displayIncomeList(incomeList) {
    clearNode(incomeList);
    budgetData.income.forEach(item => {
        let newElement = makeNewDisplayItem(item, 'inc');
        incomeList.appendChild(newElement);
    })
}
function displayExpenseList(expenseList) {
    clearNode(expenseList);
    budgetData.expense.forEach(item => {
        let newElement = makeNewDisplayItem(item, 'exp');
        expenseList.appendChild(newElement);
    })
}

function clearNode(node) {
    while (node.lastChild) {
        node.removeChild(node.lastChild);
    };
}


function saveInputValuesAndClear() {
    let dataType = document.querySelector('.add__type').value;
    let descriptionInput = document.querySelector('.add__description');
    let description = descriptionInput.value;
    let amountInput = document.querySelector('.add__value');
    let amount = + amountInput.value;
    if (!amount || !description) {
        return;
    }
    addNewDataToList(dataType, description, amount);
    clearFields(descriptionInput, amountInput);
    displayIncomeList(incomeList);
    displayExpenseList(expenseList);
}

function clearFields(descriptionElement, amountElement) {
    descriptionElement.value = '';
    amountElement.value = '';
    descriptionElement.focus();
}

function addNewDataToList(dataType, description, amount) {
    let targetList = dataType === 'inc' ? budgetData.income : budgetData.expense;

    let newElement = {
        id: targetList.length,
        desc: description,
        amount: amount,
    };
    targetList.push(newElement);
    console.log(budgetData);
    makeNewDisplayItem(newElement, 'inc');
}

function removeElementFromList(id, list) {
    list = list.filter(item => item.id !== id);
    budgetData.income = list;
}

function makeNewDisplayItem(data, type) {
    const typeSign = type === 'inc' ? '+' : '-';
    const wraper = makeDiv({
        id: data.id,
        type: type,
        className: 'item clearfix',
    });
    const description = makeDiv({
        className: 'item__description',
        content: data.desc,
    });
    const innerRightWraper = makeDiv({
        className: 'right clearfix'
    });
    const amountValue = makeDiv({
        className: 'item__value',
        content: typeSign + data.amount.toFixed(2),
    });
    const deleteWraper = makeWrapedDeleteButton();
    innerRightWraper.appendChild(amountValue);
    innerRightWraper.appendChild(deleteWraper);
    wraper.appendChild(description);
    wraper.appendChild(innerRightWraper);
    return wraper;
}

function makeWraper(id, type) {
    const wraper = document.createElement('div');
    wraper.id = type + '-' + id;
}

function makeDiv( { id, type, className, content } ) {
    const div = document.createElement('div');
    div.className = className;
    if (type && id !== null) {
        div.id = type + '-' + id;
    }
    div.innerText = content ? content : null;
    return div;
}

function makeWrapedDeleteButton() {
    const deleteWraper = makeDiv({
        className: 'item__delete'
    });
    const button = document.createElement('button');
    button.className = 'item__delete--btn';

    const buttonIcon = document.createElement('i');
    buttonIcon.className = 'ion-ios-close-outline';

    button.appendChild(buttonIcon);
    deleteWraper.appendChild(button);

    return deleteWraper;
}