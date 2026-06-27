// BUG AT LOAD FUNCTION WHEN YOU ENTER OTHER NUMBER NOT YOUR ACCOUNT YOU STILL GET THE LOAD TO YOUR ACCOUNT EVEN IF DIFFERENT NUM
// possible solution line 45 enclosed in 'if' equal to userPhone condition

const digitalWallet = { // user wallet
    userPhone: "",
    balance: 0,
};

let transactionHistory = []; // store all completed transactioins

// Helper - Reusable phone number validation (FUNCTION)
const isValidPhone = (phoneNum) => {
    if(phoneNum === null) return false;
    
    const cleanPhoneNum = phoneNum.trim();
    // is not empty, should be 11 digits, and should start with 09
    return cleanPhoneNum !== "" && cleanPhoneNum.length === 11 && cleanPhoneNum.startsWith("09");
}

// Feature (FUNCTIONS)
const load = () => { // LOAD/TOP UP

    // Load Number Input
    const phoneNumInput = prompt("Enter mobile number to load (must start with 09 and should be 11 digits): ")

    const cleanNumInput = phoneNumInput.trim()

    if(phoneNumInput === null) return; // returns if cancel button is clicked

    if(!isValidPhone) { // Validate Phone Num
        alert("Invalid phone format! Must start with 09 and must be 11 digits");
        return;
    }

    // Load Amount Input
    const loadAmountInput = Number(prompt("Enter the amount to load (PHP): "))

    if(loadAmountInput === null) return; // returns if cancel button is clicked

    if(isNaN(loadAmountInput) || loadAmountInput <= 0) { // Validate amount
        alert("Invalid amount! Please enter a number or a valid positive number.")
        return;
    }

    digitalWallet.balance += loadAmountInput; // process load/top up

    if(digitalWallet.userPhone === "") { // connects number to digital wallet, if there is no number registered
        digitalWallet.userPhone = cleanNumInput;
    }

    transactionHistory.push({ // record transation history
        type: `Loaded to ${cleanNumInput}`,
        amount: loadAmountInput,
        timestamp: new Date().toLocaleDateString()
    })
    // toFixed(2) - adds .00 to the number
    alert
    (`
        Successfully loaded ₱${loadAmountInput.toFixed(2)} to ${cleanNumInput}
        Your new balance is ₱${digitalWallet.balance.toFixed(2)}
    `)
}

alert("Welcome to Multi-Service Digital Wallet & Transaction Hub!");

let isSystemRunning = true;

while(isSystemRunning) {
    const mainMenu = prompt // Main menu for feature selection
    (`
        Account Balance: ₱${digitalWallet.balance}
        Registered Phone Number: ${digitalWallet.userPhone || "Not Registered"}

        Select an action (1, 2, 3, 4, or 5):
        1. Load/Top up Balance
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

