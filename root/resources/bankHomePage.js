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
var currentEth = localStorage.bank_eth_account;

//  function to fill Bank details

function fillDetails() {

    //  call for getting bank name
    document.getElementById("bank_name").innerHTML = contractInstance.getBankName.call(currentEth, {
        from: currentEth,
        gas: 4700000
    });

    //  call for getting bank registration number
    document.getElementById("reg_no").innerHTML = contractInstance.getBankReg.call(currentEth, {
        from: currentEth,
        gas: 4700000
    });

    //  call for getting number of KYC verifications by the bank
    document.getElementById("kyc_no").innerHTML = contractInstance.getBankKYC.call(currentEth, {
        from: currentEth,
        gas: 4700000
    });

    //  call for getting Bank rating
    document.getElementById("bank_rating").innerHTML = (contractInstance.getBankRating.call(currentEth, {
        from: currentEth,
        gas: 4700000
    })) / 100;
}

//  function to view a KYC profile

function clickViewKYC() {
    var user_name_v = document.getElementById("user_name_v").value;
    if (contractInstance.viewCustomer.call(user_name_v) == "Customer not found in database!") {
        alert("Customer not found in database!");
        return;
    }
    if (contractInstance.ifAllowed.call(user_name_v, currentEth) == false) {
        var l = confirm('Access denied! Take permission from the customer to proceed');
        if (l == true) {
            contractInstance.addRequest.sendTransaction(user_name_v, currentEth, { from: currentEth, gas: 4700000 });
        }
        return;
    }
    localStorage.user_name_v = user_name_v;
    window.location = './form/viewForm.html';
}

//  function to modify an existing KYC profile

function clickModifyKYC() {
    var user_name_m = document.getElementById("user_name_m").value;
    if (contractInstance.viewCustomer.call(user_name_m) == "Customer not found in database!") {
        alert("Customer not found in database!");
        return;
    }
    if (contractInstance.ifAllowed.call(user_name_m, currentEth) == false) {
        var l = confirm('Access denied! Take permission from the customer to proceed');
        if (l == true) {
            contractInstance.addRequest.sendTransaction(user_name_m, currentEth, { from: currentEth, gas: 4700000 });
        }
        return;
    }
    localStorage.user_name_m = user_name_m;
    //redirect to modifyForm.html
    window.location = './form/modifyForm.html';
}

//  fill the bank details

fillDetails();

//  function to increase customer rating

function increaseRating() {
    var user_name_mr = document.getElementById("user_name_mr").value;
    if (contractInstance.updateRatingCustomer.call(user_name_mr, true, {
            from: currentEth,
            gas: 4700000
        }) == 1) {
        alert("Customer not in database !");
        return;
    }
    if (confirm("Increase customer rating?") == false) {
        return;
    }
    contractInstance.updateRatingCustomer.sendTransaction(user_name_mr, true, {
        from: currentEth,
        gas: 4700000
    });
}

//  function to decrease customer rating

function decreaseRating() {
    var user_name_mr = document.getElementById("user_name_mr").value;
    if (contractInstance.updateRatingCustomer.call(user_name_mr, false, {
            from: currentEth,
            gas: 4700000
        }) == 1) {
        alert("Customer not in database !");
        return;
    }
    if (confirm("Decrease customer rating?") == false) {
        return;
    }
    contractInstance.updateRatingCustomer.sendTransaction(user_name_mr, false, {
        from: currentEth,
        gas: 4700000
    });
}
