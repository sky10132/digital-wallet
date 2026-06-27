
# Multi-Service Digital Wallet & Transaction Hub
Console-Based Transaction System

# TECH STACK
Language: JAVASCRIPT
Environment: Browser Console / Node.js (Standard Console Environment)

# Short Description
A digital wallet system that supports multiple transaction types and simulates real-world financial operations


# System Design

## Features
1. Load / Top-up balance
    - Adds funds to the user's wallet balance.
    - Requires a valid Philippine mobile number registration format.

2. Send Money (Peer Transfer Simulation)
    - Allows instant balance transfers to a recipient profile.
    - Includes safety guards to prevent self-transfers.

3. Pay Bills
    - Supports payment processing for three fixed utility providers: Internet, Water, and Electricity.
    - Automatically applies a flat ₱15.00 service fee per billing action.

4. Transaction History Tracking
    - Maintains a real-time tracking ledger of all successful operations.
    - Automatically stamps each entry with a system-generated live date and time.

## Validation Rules
1. Mobile Formatting: All phone number entries must be captured as strings and must strictly begin with the prefix 09.
2. Sanitization: Financial input prompts must reject negative values, zero, or completely empty/blank string submissions.
3. Transfer Protection: Peer transfers must fail immediately if the receiver's phone number string perfectly matches the sender's own active phone number.
4. Overdraft Prevention: Bill payment operations must verify that the current wallet balance can fully cover the combined cost of the bill statement plus the mandatory ₱15 processing fee. If total funds are insufficient, the entire transaction is rejected.
5. Currency Formatting: All monetary values are restricted to Philippine Pesos (PHP).

## Getting Started / How to Run
1. Copy the source code file
2. Open your web browser (e.g., Chrome, Edge, Safari).
3. Right-click anywhere on the page, select Inspect, and navigate to the Console tab.
4. Paste the code into the console window and press Enter to initialize the interface