//  Web3 intializer
//  ABI definition, Binary Data and contract Address in contractDetails.js

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var kycContract = web3.eth.contract(abi);
var deployedContract = kycContract.new({
    data: binaryData,
    from: web3.eth.accounts[0],
    gas: 4700000
});
var contractInstance = kycContract.at(contractAddress);

//  check if web storage is supported

if (typeof(Storage) == "undefined") {
    alert("Sorry, your browser does not support web storage. Upgrade to IE9 or contemporary platforms. Thank You for showing interest in us!");
}

//  function to execute on Sign up

function onSignUp() {
    var bank_name1 = document.getElementById("username").value;

    //  validate input

    if (bank_name1 == "") {
        alert("Enter a valid username!");
        return;
    }
    var pass = document.getElementById("password").value;
    if (pass == "") {
        alert("Enter a valid password!");
        return;
    }
    var reg = document.getElementById("reg_no").value;
    if (reg == "") {
        alert("Enter a valid registration number!");
        return;
    }
    if (confirm("I accept that the details provided are correct.") == false) {
        window.location = './index.html';
    }

    //  add Bank to the network

    contractInstance.addBank.sendTransaction(bank_name1, pass, reg, {
        from: web3.eth.accounts[0],
        gas: 4700000
    });
    alert(bank_name1 + " has been successfully added to the network!");
    alert("Login from the \"Login\" Tab on the top-right side of the webpage. \n Thank you for choosing KYC chain!");
}

// this function is called on clicking log in button in the pop up that appears while logging in 

function onLogin() {
    var bank_name_l = document.getElementById("username_l").value;
    var pass_l = document.getElementById("password_l").value;

    //  validate input

    if (bank_name_l == "") {
        alert("Enter a valid bank name!");
        return;
    }
    if (pass_l == "") {
        alert("Enter a valid password!");
        return;
    }
    if (contractInstance.checkBank.call(bank_name_l, pass_l, {
            from: pass_l,
            gas: 4700000
        }) == "null") {
        alert("Bank not in network. Sign up before proceeding further. Thank You!");
        return;
    }

    //  open bank page if login successful

    alert("Welcome " + bank_name_l + " !");
    localStorage.bank_eth_account = pass_l;
    window.location = './resources/bankHomePage.html';
}