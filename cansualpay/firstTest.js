import { expect } from 'chai';
import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

fixture`Test structure`
    .page`https://www.saucedemo.com/`;

test('fail login and get error', async t => {
        await t
        .typeText('#user-name', 'standard_user')
        .typeText('#password', 'asd')
        .click('#login-button')
        .expect(Selector('.error-message-container').find('h3').innerText).eql('Epic sadface: Username and password do not match any user in this service');
});

test('successful login', async t => {

    const getLocation = ClientFunction(() => document.location.href);
       await t
    .typeText('#user-name', 'standard_user')
    .typeText('#password', 'secret_sauce')
    .click('#login-button')
    .expect(getLocation()).contains('https://www.saucedemo.com/inventory.html');
});

test('successful 2 item added', async t => {
    
       await t
       .typeText('#user-name', 'standard_user')
       .typeText('#password', 'secret_sauce')
       .click('#login-button')
       .click('#add-to-cart-sauce-labs-backpack')
       .click('#add-to-cart-sauce-labs-bike-light')
       .expect(Selector('.shopping_cart_badge').innerText).eql("2");
      });

test('check your basket', async t => {
    const getLocation = ClientFunction(() => document.location.href);
        await t
     .typeText('#user-name', 'standard_user')
     .typeText('#password', 'secret_sauce')
     .click('#login-button')
     .click('#add-to-cart-sauce-labs-backpack')
     .click('#add-to-cart-sauce-labs-bike-light')
     .click('.shopping_cart_link')
     .expect(getLocation()).contains('https://www.saucedemo.com/cart.html');
    
});

test('checkout your information', async t => {
    const getLocation = ClientFunction(() => document.location.href);
        await t
     .typeText('#user-name', 'standard_user')
     .typeText('#password', 'secret_sauce')
     .click('#login-button')
     .click('#add-to-cart-sauce-labs-backpack')
     .click('#add-to-cart-sauce-labs-bike-light')
     .click('.shopping_cart_link')
     .click('#checkout')
     .expect(getLocation()).contains('https://www.saucedemo.com/checkout-step-one.html');     
});

test('checkout overview', async t => {
    const getLocation = ClientFunction(() => document.location.href);
        await t
     .typeText('#user-name', 'standard_user')
     .typeText('#password', 'secret_sauce')
     .click('#login-button')
     .click('#add-to-cart-sauce-labs-backpack')
     .click('#add-to-cart-sauce-labs-bike-light')
     .click('.shopping_cart_link')
     .click('#checkout')
     .typeText('#first-name', 'cansu')
     .typeText('#last-name', 'alpay')
     .typeText('#postal-code', '06687')
     .click('#continue')
     .expect(getLocation()).contains('https://www.saucedemo.com/checkout-step-two.html');
});

test('check ıtems total price', async t => {

        await t
     .typeText('#user-name', 'standard_user')
     .typeText('#password', 'secret_sauce')
     .click('#login-button')
     .click('#add-to-cart-sauce-labs-backpack')
     .click('#add-to-cart-sauce-labs-bike-light')
     .click('.shopping_cart_link')
     .click('#checkout')
     .typeText('#first-name', 'cansu')
     .typeText('#last-name', 'alpay')
     .typeText('#postal-code', '06687')
     .click('#continue');

    
    
    const getPrices = ClientFunction(() => {
      return new Promise(resolve => {
        let prices = document.getElementsByClassName('inventory_item_price');
      let sum=0;
      prices.forEach(element => {
        let price=parseFloat(element.innerText.substr(1));
        sum=sum + price;
      });
      console.log(sum)
      return sum;
     
      });
    })

  
    .expect(getPrices().eql(parseFloat(Selector('.summary_subtotal_label').innerText)));

functionabc(){
  let prices = document.getElementsByClassName('inventory_item_price');
  let sum=0;
  prices.forEach(element => {
    let price=parseFloat(element.innerText.substr(1));
    sum=sum + price;
  });
  console.log(sum)
  return sum;
};

});