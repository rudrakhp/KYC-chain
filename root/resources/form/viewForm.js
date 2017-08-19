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

var current_account = localStorage.bank_eth_account;
var user_name = localStorage.user_name_v;

//  function to fill customer data in form

function fillForm() {
    var oldData = contractInstance.viewCustomer.call(user_name, {
        from: current_account,
        gas: 4700000
    });
    document.getElementById("customer_rating").innerHTML = contractInstance.getCustomerRating.call(user_name, {
        from: current_account,
        gas: 4700000
    }) / 100;
    var toFill = "";
    for (var i = 0, j = 0; i < (oldData.length - 2); ++i) {
        if (oldData[i] == '!' && oldData[i + 1] == '@' && oldData[i + 2] == '#') {
            if (j == 7) {
                document.getElementById("gender_m").innerHTML = toFill;
                j += 2;
                i += 2;
                toFill = "";
                continue;
            }
            if (toFill == "")
                toFill = "Null";
            document.getElementById(allIds[j]).innerHTML = toFill;
            toFill = "";
            j++;
            i += 2;
            continue;
        }
        toFill = toFill + oldData[i];
    }

    document.getElementById("bank_name").innerHTML = contractInstance.getCustomerBankName.call(user_name, {
        from: current_account,
        gas: 4700000
    });
    document.getElementById("bank_rating").innerHTML = (contractInstance.getCustomerBankRating.call(user_name, {
        from: current_account,
        gas: 4700000
    })) / 100;
}

//  fill the KYC form

fillForm();