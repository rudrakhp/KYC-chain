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

var current_account = web3.eth.accounts[0];
var user_name = localStorage.username_c;

//  function to fill customer data in form

function fillForm() {
    //  alert(user_name);
    var oldData = contractInstance.viewCustomer.call(user_name, {
        from: current_account,
        gas: 4700000
    });
    //  alert(oldData);
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
var arr = [];

function what() {
    var cnt = 0;
    var add = "not";
    for (var i = 0; add != "0x14e041521a40e32ed88b22c0f32469f5406d757a"; ++i) {
        add = contractInstance.getBankRequests.call(user_name, i);
        if (add == "0x14e041521a40e32ed88b22c0f32469f5406d757a")
            break;
        document.write("<div class=\"form-group\"><label class=\"col-md-4 control-label\" id = \"bank_name_l\">" + contractInstance.getBankName.call(add) + "</label><div class=\"col-md-4 inputGroupContainer\"><div class=\"input-group\"><button type=\"submit\" class=\"btn btn-success\" id = \"addKYCSend\" onclick = \"return allow(" + i.toString() + ")\">Allow </button>                                          <button type=\"submit\" class=\"btn btn-danger\" id = \"addKYCSend1\" onclick = \"return deny(" + i + ")\">Deny </button>                         </div></div></div><br>");
        arr.push(add);
        cnt++;
    }
    //alert(arr[0]);
}

function allow(num) {
    //alert(num);
    alert("Allow " + arr[num] + " ?");
    contractInstance.allowBank.sendTransaction(user_name, arr[num], true, { from: web3.eth.accounts[0], gas: 4700000 });
    return false;
}

function deny(num) {
    alert("Deny " + arr[num] + " ?");
    contractInstance.allowBank.sendTransaction(user_name, arr[num], false, { from: web3.eth.accounts[0], gas: 4700000 });
    return false;
}