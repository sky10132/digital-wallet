
const account = { // user wallet
    name: "",
    phone: "",
    wallet: {
        currency: "PHP",
        credits: 0,
    }
};

let transactions = []; // store all completed transactions

// Helper - Reusable phone number validation (FUNCTION)
const isValidPhone = (validNum) => {
    if(validNum === null) return false;
    
    const cleanPhoneNum = validNum.trim();
    // is not empty, should be 11 digits, and should start with 09
    return cleanPhoneNum !== "" && cleanPhoneNum.length === 11 && cleanPhoneNum.startsWith("09");
}

// Feature (FUNCTIONS)
const load = () => { // LOAD/TOP UP
    
    while(true) {
    if(account.phone === "") { // if account has no number add the number entered
    // Load Number Input
    const phoneNumInput = prompt("Enter mobile number to load (must start with 09 and should be 11 digits): ")
    if(phoneNumInput === null) return; // return to menu

    const phoneNum = phoneNumInput.trim()

    if(!isValidPhone(phoneNum)) { // Validate Phone Num
        alert("Invalid phone format! Must start with 09 and must be 11 digits");
        continue;
    }
    
    account.phone = phoneNum; // add the number to account
    alert(`Successfully registered ${account.phone} to your account!`)
    break;
    }
    }

    // Load Amount Input
    while(true) {
    const loadAmountInput = Number(prompt("Enter the amount to load (PHP): "))
    if(loadAmountInput === null) return; // return to menu

    const isConfirmed = confirm(`Are you sure you want to load the amount of : ${account.wallet.currency} ${loadAmountInput}? `)
    if(!isConfirmed) continue;

    if(isNaN(loadAmountInput) || loadAmountInput <= 0) { // Validate amount
        alert("Invalid amount! Please enter a number or a valid positive number.")
        continue;
    }

    account.wallet.credits += loadAmountInput; // process load/top up

    const loadAmount = (Math.floor(loadAmountInput * 100) / 100).toFixed(2)
    const credits = (Math.floor(account.wallet.credits * 100) / 100).toFixed(2)

    transactions.push({ // record transation history
        type: `Loaded to ${account.phone}`,
        amount: loadAmountInput,
        timestamp: new Date().toString()
    })

    // toFixed(2) - adds .00 to the number
    alert
    (`
        Successfully loaded: ${account.wallet.currency} ${loadAmount} to ${account.phone}
        Your current credits: ${account.wallet.currency} ${credits}
    `)
    break;
    }
}

const sendMoney = () => { // Send Money
    
    if(account.phone === "") { // check if user has account/number registered
        alert("Please load money into your wallet to register your account before transferring funds.");
        return;
    }
    
    // for while loop block to be detected
    let recipient = ""
    let recipientInput = ""

    while(true) {
        const recipientInput = prompt("Enter recepient's mobile number (11 digits starting with 09): ")
        if(recipientInput === null) return;
        
        recipient = recipientInput.trim()
        
        if(!isValidPhone(recipient)) {
            alert("Invalid phone format! Must start with 09 and must be 11 digits");
            continue;
        }
        
        if(recipient === account.phone) { // validation for not being able to send money to self
            alert("Transaction Denied: You cannot send money to your own phone number!");
            continue;
        }
        break;
    }
    
    while(true) {
    const amountInput = Number(prompt(`Enter amount to send to ${recipient}: `))
    if(amountInput === null) return;

    const isConfirmed = confirm(`Are you sure you want to send ${account.wallet.currency} ${amountInput} to ${recipient}?`);
    if(!isConfirmed) continue

    if(isNaN(amountInput) || amountInput <= 0) { // validation
        alert("Invalid amount! Please enter a number or a valid positive number.")
        continue;
    }

    if(amountInput > account.wallet.credits) { // check if wallet has enough cash
        alert
        (`
            Insufficient Funds! 
            Current balance: ${account.wallet.currency} ${account.wallet.credits} 
            Amount trying to send ${account.wallet.currency} ${amountInput}
        `)
        continue;
    }

    account.wallet.credits -= amountInput; // transaction process

    const amount = (Math.floor(amountInput * 100) / 100).toFixed(2)
    const credits = (Math.floor(account.wallet.credits * 100) / 100).toFixed(2)

    transactions.push({
        type: `Sent Money to ${recipient}`,
        amount: amountInput,
        timestamp: new Date().toString()
    });

    alert
    (`
        Successfully sent ${account.wallet.currency} ${amount} to ${recipientInput}!
        Remaining balance: ${account.wallet.currency} ${credits}
        `)
        break;
    }
}

alert("Welcome to Multi-Service Digital Wallet & Transaction Hub!");

let isSystemRunning = true;

if(account.name === "") {

    while(true) {
    const addName = prompt("Please enter your Full Name: ")
    account.name = addName

    if(addName === null) { // Exit 
        alert("Thank you for using Multi-Service Digital Wallet & Transaction Hub. Goodbye!")
        isSystemRunning = false
        break;
    }

    if(addName.trim() === "" || !isNaN(addName)){
        alert("Invalid Name, Please try again.")
        continue; // skip others and repeat while
    }
    break;
    }
}

while(isSystemRunning) {
    const mainMenu = prompt // Main menu for feature selection
    (`
        Account Name: ${account.name || "Not Registered"}
        Account Credits: ${account.wallet.currency} ${account.wallet.credits}
        Registered Phone Number: ${account.phone || "Not Registered"}

        Select an action (1, 2, 3, 4, or 5):
        1. Load/Top up Credits
        2. Send Money
        3. Pay Bills
        4. View Transaction History
        5. Exit
    `);
    if(mainMenu === null || mainMenu.trim() === "5") { // validation for system exit
        alert("Thank you for using Multi-Service Digital Wallet & Transaction Hub. Goodbye!")
        isSystemRunning = false;
        break;
    }

    // Switch case for feature selection
    switch(mainMenu) {
        case "1":
            load();
            break;
        case "2":
            sendMoney();
            break;
        default:
            alert("Invalid selection! Please enter a number from 1 to 5: ")
            break;
    }
}

