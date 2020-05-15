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

    var data = {
        store: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        inputBtn: '.add__btn'
    }

    return {
        addingInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMStrings;
        }

    }

})();

//GLOBAL APP CONTROLLER
let controller = (function (budgetctlr, UICtrl) {
    var DOM = UICtrl.getDOMstrings()
    var setupEventListInit = function () {

        document.querySelector(DOM.inputBtn).addEventListener("click", addCtrlItem)

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                addCtrlItem()
            }
        })
    }

    function addCtrlItem() {

        //1. get the field input data
        var addedInput = UICtrl.addingInput()

        //2.Add item to the budget controller
        var newInput = budgetctlr.addItem(addedInput.type, addedInput.description, addedInput.value)
        //3.add item to UI

        //4. Calculate the budget

        //5.Display the budget on the UI


    };
    return {
        init: function () {
            console.log("the app started.")
            setupEventListInit()

        }
    };

})(budgetController, UIController);
controller.init()