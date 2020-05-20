var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function (type) { //type is either income or expense
        var sum = 0;
        data.store[type].forEach((current) => { //current refers to either the income or expense
            sum += current.value
        });
        data.totals[type] = sum
    }
    //we are store everything insie our data
    var data = {
        store: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return {
        addItem: function (type, des, val) {
            var newItem, ID

            if (data.store[type].length > 0) {
                ID = data.store[type][data.store[type].length - 1].id + 1;
            } else {
                ID = 0
            }
            if (type === "exp") {
                newItem = new Expense(ID, des, val) //from function contructors new to create new properties for the object
            } else if (type === "inc") {
                newItem = new Income(ID, des, val)
            }
            //from data object
            data.store[type].push(newItem)
            return newItem;
        },
        deleteItem: function (type, id) {
            var ids = data.store[type].map((current) => {
                return current.id;
            })
            var index = ids.indexOf(id)

            if (index !== -1) {
                data.store[type].splice(index, 1)
            }
        },
        calculateBudget: function () {
            //calculate total income and expenses
            calculateTotal('exp')
            calculateTotal('inc')
            //calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp
            //calculte the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1
            }

        },
        calculatePercentages: function () {

        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data)
        }
    }

})();

let UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: ".budget__expenses--percentage",
        container: '.container'

    }

    return {
        addingInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function (obj, type) {
            var html, newHtml, element
            //create HTML string with a placeholder text
            if (type === "inc") {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === "exp") {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert HTML in the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },
        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el)
        },
        //to clear the input fields
        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDesc + ' , ' + DOMStrings.inputValue)
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach((current, index, array) => {
                //current value of the array
                current.value = '';

            });
            fieldsArr[0].focus()
        },
        displayBudget: function (obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + " %"

            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = "--"

            }
        },
        getDOMstrings: function () {
            return DOMStrings;
        }
    }

})();

//GLOBAL APP CONTROLLER
let controller = (function (budgetCtlr, UICtrl) {
    var DOM = UICtrl.getDOMstrings()
    var setupEventListInit = function () {

        document.querySelector(DOM.inputBtn).addEventListener("click", addCtrlItem)

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                addCtrlItem()
            }
        });

        document.querySelector(DOM.container).addEventListener('click', controlDeleteItem)
    }
    var updateBudget = function () {
        //1. Calculate the budget
        budgetCtlr.calculateBudget();
        // 2.return the budget
        var budget = budgetController.getBudget();
        //3.Display the budget on the UI
        UICtrl.displayBudget(budget);

    };
    var updatePercentage = function () {
        // 1. calculate percentages

        //2. read percentages from budget controller

        //3.Updating UI with new percentages

    }
    var addCtrlItem = function () {

        //1. get the field input data
        var addedInput = UICtrl.addingInput()

        if (addedInput.description !== "" && !isNaN(addedInput.value) && addedInput.value > 0) {
            //2.Add item to the budget controller
            var newInput = budgetCtlr.addItem(addedInput.type, addedInput.description, addedInput.value)
            //3.add item to UI
            UICtrl.addListItem(newInput, addedInput.type)
            //For cler the fields
            UICtrl.clearFields()
            //Calculate and update budget
            updateBudget();
            //6. calculate and update percentages
            updatePercentage();
        }

    };

    var controlDeleteItem = function (event) {
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            var splitID = itemID.split('-')
            var type = splitID[0];
            var ID = parseInt(splitID[1]);
            // 1. delete item from data structure
            budgetCtlr.deleteItem(type, ID)
            //2. delete from UI
            UICtrl.deleteListItem(itemID);
            //3. update and show the new budget
            updateBudget();
            //4. calculate and update percentages
            updatePercentage();
        }
    };
    return {
        init: function () {
            console.log("the app started.")
            UICtrl.displayBudget({

                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1

            });
            setupEventListInit()

        }
    };


})(budgetController, UIController);
controller.init()