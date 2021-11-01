# KYC-chain
A blockchain based KYC registry prototype
# Project description
Know your customer (KYC) checks are currently an extremely time consuming and costly affair. Banks have to spend millions of dollars every year to keep up with KYC regulations or risk being fined heavily. Through KYC chain we aim to simplify this process to a great extent.

KYC-chain eliminates the redundant KYC checks that banks currently perform by maintaining a common secure database in a block-chain. The nature of a block-chain ensures that unauthorized changes to the data are automatically invalidated. The proof-of-reputation concept makes the verification process more robust.

Currently we have built this registry over a local test-net that we hosted our personal laptops. So, there are a few limitations regarding scalability such as the maximum number of banks that can be registered which is currently capped at 10 and so on. Going ahead we plan to deploy this registry over the Ethereum network to increase its scalability.

# Requirements
1. Nodejs - v10.15.3
2. npm - v6.9.0
3. solc - v0.4.26 `npm install solc@0.4.26`
4. web3 - v0.20.1 `npm install web3@0.20.1`
5. ganache-cli - v6.4.3

# Instructions to run
1. Open a terminal window and execute the command line `ganache-cli`.
2. Open another terminal and go to the `root` directory.
3. Execute the `init.js` file using the command line `node init.js`.
4. After about 10-15 seconds, we obtain a 20 byte address. This is the address of the compiled smart contract.
5. Go to the file `root\js\contractDetails.js` and open it using a text editor.
6. Edit the first line denoting the contract instance address given by the variable `contractAddress` to the 20 byte address obtained in step `4`.
7. Now the application is ready for use. Make sure the terminal with `ganache-cli` is up and running. It acts as the local ethereum test network.  

