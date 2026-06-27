
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
const isValidPhone = (phoneNum) => {
    if(phoneNum === null) return false;
    
    const cleanPhoneNum = phoneNum.trim();
    // is not empty, should be 11 digits, and should start with 09
    return cleanPhoneNum !== "" && cleanPhoneNum.length === 11 && cleanPhoneNum.startsWith("09");
}

// Feature (FUNCTIONS)
const load = () => { // LOAD/TOP UP

    if(account.phone === "") { // if account has no number add the number entered
    // Load Number Input
    const phoneNumInput = prompt("Enter mobile number to load (must start with 09 and should be 11 digits): ")

    if(phoneNumInput === null) return; // return to menu

    const cleanNum = phoneNumInput.trim()

    if(!isValidPhone(cleanNum)) { // Validate Phone Num
        alert("Invalid phone format! Must start with 09 and must be 11 digits");
        return;
    }

    account.phone = cleanNum; // add the number to account

    }

    // Load Amount Input
    const loadAmountInput = Number(prompt("Enter the amount to load (PHP): "))

    if(loadAmountInput === null) return; // return to menu

    if(isNaN(loadAmountInput) || loadAmountInput <= 0) { // Validate amount
        alert("Invalid amount! Please enter a number or a valid positive number.")
        return;
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
        Successfully loaded: ₱${loadAmount} to ${account.phone}
        Your current credits: ₱${credits}
    `)
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

    if(addName.trim() === ""){
        alert("Name cannot be empty! Please try again.")
        continue; // skip others and repeat while
    }
    break;
    }
}

while(isSystemRunning) {
    const mainMenu = prompt // Main menu for feature selection
    (`
        Account Name: ${account.name || "Not Registered"}
        Account Credits: ₱${account.wallet.credits}
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
    }
}

