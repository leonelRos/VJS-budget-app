var budgetController = (function () {

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
                addValue: document.querySelector(DOMStrings.inputValue).value
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

    function addCtrlItem() {

        //1. get the field input data
        var addedInput = UICtrl.addingInput()
        console.log(addedInput)

        //2.Add item to the budget controller

        //3.add item to UI

        //4. Calculate the budget

        //5.Display the budget on the UI


    }

    document.querySelector(DOM.inputBtn).addEventListener("click", addCtrlItem)

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            addCtrlItem()
        }
    })

})(budgetController, UIController);