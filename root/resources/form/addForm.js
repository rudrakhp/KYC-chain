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

//  account to make all transactions

var current_account = localStorage.bank_eth_account.toString();

//  function to create a new KYC profile

function onClickAdd() {
    var Data = getInfo();
    var usnm = document.getElementById("username").value;
    if (Data == undefined || usnm == "") {
        alert("Valid details required!");
        window.location = '../bankHomePage.html';
        return;
    }
    //  Data = performEncryption(Data);
    alert("Current bank accout: " + current_account);
    var check = contractInstance.addCustomer.call(usnm.toString(), Data.toString(), {
        from: current_account.toString(),
        gas: 4700000
    });
    if (check == 7) {
        alert("Access denied!");
        window.location = '../bankHomePage.html';
        return false;

    } else if (check == 1) {
        alert("Service limit reached! Try after some time...");
        window.location = '../bankHomePage.html';
        return false;
    } else if (check == 2) {
        alert("Customer already in database! Go to the modify form if you wish to change customer details. Thank you!");
        window.location = '../bankHomePage.html';
        return false;
    } else {
        contractInstance.addCustomer.sendTransaction(usnm, Data, {
            from: current_account.toString(),
            gas: 4700000
        });
        alert("Customer profile successfully created! Check the customer details from the view form tab. Thank you!");
        window.location = '../bankHomePage.html';
        return false;
    }
}

//  function to extract data from the form

function getInfo() {
    var data = document.getElementById("username").value + "!@#" + document.getElementById("first_name").value + "!@#" + document.getElementById("middle_name").value + "!@#" + document.getElementById("last_name").value + "!@#" + document.getElementById("occupation").value + "!@#" + document.getElementById("income_range").value + "!@#" + document.getElementById("DOB").value + "!@#";
    if (document.getElementById("gender_m").checked)
        data = data + "Male";
    else
        data = data + "Female";
    data = data + "!@#" + document.getElementById("address").value + "!@#" + document.getElementById("phone_1").value + "!@#" + document.getElementById("phone_2").value + "!@#" + document.getElementById("email").value + "!@#" + document.getElementById("country_res").value + "!@#";

    return data;
}