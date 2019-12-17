App = {
    web3Provider: null,
    contracts: {},
    account: null,
    contract: null,

    init: async function () {
        return await App.initweb3();
    },

    initweb3: async function () {
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            web3 = new Web3(App.web3Provider);
            console.log('ganache provider');
        }
        return App.initContract();
    },

    initContract: async function () {
        $.getJSON('SecureTransfer.json', function (st) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.SecureTransfer = TruffleContract(st);
            // Connect provider to interact with contract
            App.contracts.SecureTransfer.setProvider(App.web3Provider);

            return App.render();
        });
    },

    setPrice: async function (form) {
        const priceInput = form.find('input[name=price]');
        const price = priceInput.val();
        const re = /\d+/;
        if (!re.test(price)) {
            if (!form.next().is('font')) {
                form.after('<font color="red">Please input a number</font>');
            }
        } else {
            if (form.next().is('font')) {
                form.next().remove();
            }
            try {
                let ret = await App.contract.setPrice(price, { from: App.account });
                console.log(ret);
            } catch (error) {
                if (error.code == 4001) {
                    console.log('user refused transaction');
                } else {
                    console.log(error);
                }
            }
        }
        priceInput.val('');
        return App.render();
    },

    makeOffer: async function(form, price) {
        if (price == 0)
            return;
        const offerInput = form.find('input[name=price]');
        let offer = offerInput.val();
        const re = /\d+/;
        if (!re.test(offer)) {
            if (!form.next().is('font')) {
                form.after('<font color="red">Please input a number</font>');
            }
        } else {
            offer = parseInt(offer);
            if (form.next().is('font')) {
                form.next().remove();
            }
            if (offer < price) {
                form.after('<font color="red">Your offer should be equal to or larger than starting price.</font>');
            } else {
                try {
                    let ret = await App.contract.makeDeposit(offer, { from: App.account });
                    console.log(ret);
                } catch (error) {
                    if (error.code == 4001) {
                        console.log('user refused transaction');
                    } else {
                        console.log(error);
                    }
                }
            }
        }
        offerInput.val('');
        return App.render();
    },

    render: async function () {
        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $('#acntAddr').html('Your Account: ' + account);
                web3.eth.getBalance(account, function (err, balance) {
                    $('#acntBalance').html('Blance: ' + web3.fromWei(balance, "ether") + " ETH");
                });
            }
        });

        // Load contract data
        try {
            App.contract = await App.contracts.SecureTransfer.deployed();
            const seller = await App.contract.seller();
            const buyer = await App.contract.buyer();
            const price = await App.contract.price();
            const offer = await App.contract.offer();
            const isActive = await App.contract.isActive();
            const isSeller = seller === App.account;
            const isBuyer = buyer === App.account;
            const hasOffer = offer > 0;
            const hasPrice = price > 0;

            let sellerTxt = isSeller ? 'You' : seller.toString();
            let buyerTxt = isBuyer ? 'You' : buyer.toString();
            let offerTxt = offer.toNumber();
            if (!hasOffer) {
                offerTxt = 'No offer';
                buyerTxt = 'No offer';
            }

            let transTemplate = $('div.transaction div');
            transTemplate.find('#seller span').text(sellerTxt);
            transTemplate.find('#buyer span').text(buyerTxt);
            transTemplate.find('#price span').text(price.toNumber());
            transTemplate.find('#offer span').text(offerTxt);

            const priceForm = transTemplate.find('form[name=settingPrice]');
            priceForm.find('input[name=submit]').unbind().click(e => App.setPrice(priceForm));
            const offerForm = transTemplate.find('form[name=makingOffer]');
            offerForm.find('input[name=submit]').unbind().click(e => App.makeOffer(offerForm, price.toNumber()));
            const acceptForm = transTemplate.find('form[name=acceptingOffer]');

            if (!isSeller) {
                priceForm.hide();
            }
            if (hasOffer) {
                priceForm.hide();
            }
            if (!hasOffer) {
                transTemplate.find('#buyer').hide();
            }
            if (isSeller || !hasPrice) {
                transTemplate.find('form[name=makingOffer]').hide();
            }
            if (!isSeller || !hasOffer) {
                acceptForm.hide();
            }
            if (!isActive) {
                transTemplate.find('#accepted label').show();
            }
            // $('#price').text('Starting price: ' + price.toNumber());
            // $('#offer').text('Current offer: ' + offer.toString());
            // $('#accepted').text('Accepted: ' + isActive.toString());


            // $('div.transaction').children().last().after(template.html());
            //   const goal = web3.fromWei((await App.contract.getGoal()).toNumber() || 0, "ether");
            //   const sum = web3.fromWei((await App.contract.getSum()).toNumber() || 0, "ether");
            //   $('#goal').text(goal + ' ETH');
            //   $('#sum').text(sum + ' ETH');
            //   $('#percent').attr('data-percent', Math.round(sum/goal * 100))
        } catch (e) {
            console.log(e);
        }
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});

// const priceForm = $('form[name=settingPrice]');
// priceForm.find("input[name=submit]").click(e => App.setPrice(priceForm));