var pizzaMenu = [
    { name: "Margherita", ingredients: "Tomatensauce, Mozzarella, Olivenöl Extra Vergine", price: "7.50" },
    { name: "Laurin", ingredients: "frische Tomaten, Rucola, Parmesan, Olivenöl Extra Vergine", price: "9.00" },
    { name: "Deggendorf", ingredients: "scharfe Salami, Rucola, Rohschinken", price: "9.50" },
    { name: "Pizza Pane", ingredients: "Pizzabrot", price: "6.50" }
];

var delPick = "Great choice! Would you like your pizza delivered or for pickup?";
var fallEror = "I'm sorry, I didn't catch that. Could you please repHrase or ask another pizza-related question?";
var startOrdering = "Type 'yes' to start ordering your pizza.";
var thank = "Thank you for being our valuble customer.";

function makeMenu() {
    var menuText = "";
    for (var i = 0; i < pizzaMenu.length; i++) {
        menuText += (i + 1) + ". " + pizzaMenu[i].name + " - " + pizzaMenu[i].ingredients + " - " + pizzaMenu[i].price + " EUR\n";
    }
    return menuText;
}

function clearSession(session) {
    session.currentState = 'waitingToStart';
    session.orderInfo = {};
}

function chatLogic(socket, userSessions, usrMes) {
    var currentSession = userSessions[socket.id];

    switch (currentSession.currentState) {
        case 'waitingToStart':
            if (usrMes.toLowerCase() === 'yes') {
                socket.emit('botmes', "Here is Today's MENU\n" + makeMenu());
                currentSession.currentState = 'choosingPizza';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'choosingPizza':
            var pizzeChoice = parseInt(usrMes) - 1;
            if (pizzeChoice >= 0 && pizzeChoice < pizzaMenu.length) {
                currentSession.orderInfo.pizza = pizzaMenu[pizzeChoice];
                socket.emit('botmes', `You have selected: ${pizzaMenu[pizzeChoice].name}\nWhat size would you like? (small, medium, large)`);
                currentSession.currentState = 'choosingSize';
            } else {
                socket.emit('botmes', "Please select a valid pizza number from the menu.");
            }
            break;
        case 'choosingSize':
            if (['small', 'medium', 'large'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.pizza.size = usrMes.toLowerCase();
                socket.emit('botmes', `You have chosen a ${usrMes.toLowerCase()} pizza. What type of crust would you like? (thin, thick, stuffed)`);
                currentSession.currentState = 'choosingCrust';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'choosingCrust':
            if (['thin', 'thick', 'stuffed'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.pizza.crust = usrMes.toLowerCase();
                socket.emit('botmes', `You have chosen a ${usrMes.toLowerCase()} crust. What toppings would you like? (pepperoni, mushrooms, onions, olives)`);
                currentSession.currentState = 'choosingToppings';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'choosingToppings':
            if (['pepperoni', 'moshrooms', 'onions', 'olives'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.pizza.toppings = usrMes.toLowerCase();
                socket.emit('botmes', "Would you like to add on drinks? (yes or no)");
                currentSession.currentState = 'decideDrinks';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'decideDrinks':
            if (usrMes.toLowerCase() === 'yes') {
                socket.emit('botmes', "What drink would you like? (coke, lemon-drink, beer)");
                currentSession.currentState = 'choosingDrink';
            } else if (usrMes.toLowerCase() === 'no') {
                currentSession.orderInfo.drinks = "No Drinks";
                socket.emit('botmes', delPick);
                currentSession.currentState = 'delivryMethod';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'choosingDrink':
            if (['coke', 'lemon-drink', 'beer'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.drinks = usrMes.toLowerCase();
                socket.emit('botmes', delPick);
                currentSession.currentState = 'delivryMethod';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'delivryMethod':
            if (['delivered', 'pickup'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.deliveryMethod = usrMes.toLowerCase();
                var billAmount = currentSession.orderInfo.pizza.price; // Assuming price is a string like "9.50"
                socket.emit('botmes', `Your total bill is ${billAmount} EUR. Christmas Offer: All drinks are Free. Type "okay" to continue.`);
                currentSession.currentState = 'confirmingOrder';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'confirmingOrder':
            if (usrMes.toLowerCase() === 'okay') {
                socket.emit('botmes', "Please provide your name.");
                currentSession.currentState = 'getName';
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'getName':
            currentSession.orderInfo.name = usrMes;
            socket.emit('botmes', "Please provide your mobile number.");
            currentSession.currentState = 'getPhone';
            break;
        case 'getPhone':
            currentSession.orderInfo.mobileNumber = usrMes;
            socket.emit('botmes', "Please provide your email ID.");
            currentSession.currentState = 'getMail';
            break;
        case 'getMail':
            currentSession.orderInfo.email = usrMes;
            socket.emit('botmes', "Please provide your home address.");
            currentSession.currentState = 'getAdd';
            break;
        case 'getAdd':
            currentSession.orderInfo.address = usrMes;
            socket.emit('botmes', "Please choose your payment method: Online or Cash");
            currentSession.currentState = 'payMethod';
            break;
        case 'payMethod':
            if (['online', 'cash'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.paymentMethod = usrMes.toLowerCase();
                if (usrMes.toLowerCase() === 'online') {
                    socket.emit('botmes', "Would you like to use PayPal or Card for your payment?");
                    currentSession.currentState = 'payOption';
                } else if (usrMes.toLowerCase() === 'cash') {
                    var finalReceipt = makeReceipt(currentSession.orderInfo);
                    socket.emit('botmes', finalReceipt);
                    socket.emit('botmes', "Would you like to order again? Yes or No?");
                    currentSession.currentState = 'newOrder';
                }
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        case 'payOption':
            if (['paypal', 'card'].includes(usrMes.toLowerCase())) {
                currentSession.orderInfo.onlinePayment = usrMes.toLowerCase();
                var receipt = makeReceipt(currentSession.orderInfo);
                socket.emit('botmes', receipt);
                socket.emit('botmes', "Would you like to order again? Yes or No?");
                currentSession.currentState = 'newOrder';
            } else {
                socket.emit('botmes', "Please select a valid online payment method: PayPal or Card.");
            }
            break;
        case 'newOrder':
            if (usrMes.toLowerCase() === 'yes') {
                clearSession(currentSession);
                socket.emit('botmes', startOrdering);
            } else if (usrMes.toLowerCase() === 'no') {
                socket.emit('botmes', thank);
                delete userSessions[socket.id];
            } else {
                socket.emit('botmes', fallEror);
            }
            break;
        default:
            socket.emit('botmes', fallEror);
            break;
    }
}

function randomNumber() {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
}

function makeReceipt(orderInfo) {
    var orderNum = randomNumber();
    var receiptText = "Thank you for your order at Laurin Pizza!\nOrder Number: " + orderNum + "\n";
    receiptText += "obile Number: " + orderInfo.mobileNumber + "\n";
    receiptText += "email ID: " + orderInfo.email + "\n";
    receiptText += "Home Address: " + orderInfo.address + "\n";
    receiptText += "Pizza: " + orderInfo.pizza.name + " (" + orderInfo.pizza.size + ", " + orderInfo.pizza.crust + ")\n";
    receiptText += "Toppinggs: " + orderInfo.pizza.toppings + "\n";
    receiptText += "drinks: " + orderInfo.drinks + "\n";
    receiptText += "delivery Method: " + orderInfo.deliveryMethod + "\n";
    if (orderInfo.paymentMethod === 'online') {
        receiptText += "Payment Method: Online (" + orderInfo.onlinePayment + ")\n";
    } else {
        receiptText += "Payment Method: Cash\n";
    }
    receiptText += "Total Bill: " + orderInfo.pizza.price + " EUR\n";
    return receiptText;
}

module.exports = { chatLogic };
