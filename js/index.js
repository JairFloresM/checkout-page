const d = document;
const $form = d.getElementById('form');
let cantArt1 = 0, cantArt2 = 0;

const regexx = {
    name: '[a-zA-Z][a-zA-Z0-9-_]{3,32}',
    phone: '^[0-9]{3,4}-[0-9]{3,4}$',
    email: '^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$',
    zip: '[0-9]{5}(-[0-9]{4})?',
    city: '^[A-Za-z]+(\s[A-Za-z]+)?\s*,*\s*[A-Za-z]+(\s[A-Za-z]+)?\s*$',
    address: '.'
};

const buyProducts = e => {
    let total = 0;
    const add1 = d.querySelector('#add1');
    const remove1 = d.querySelector('#remove1');
    const add2 = d.querySelector('#add2');
    const remove2 = d.querySelector('#remove2');
    const cant1 = d.querySelector('#cant1');
    const cant2 = d.querySelector('#cant2');
    const $total = d.querySelector('#total');

    if(e.target == add1) cantArt1++;
    if(e.target == add2) cantArt2++;
    if(e.target == remove1) cantArt1--;
    if(e.target == remove2) cantArt2--;

    if(cantArt1 < 0) cantArt1 = 0;
    if(cantArt2 < 0) cantArt2 = 0;

    if(cantArt2 != 0 || cantArt1 != 0) {
        total = 19 + (cantArt1*54.99) + (cantArt2*74.99);
        total = Math.round(total * 100) /100;
    }

    cant1.innerHTML = cantArt1;
    cant2.innerHTML = cantArt2;
    $total.innerHTML = total;
}

const confirmationMsg = value => {
    const $msg = d.querySelector('.confirmationMsg');
    if(value){
        $msg.classList.remove('activeMsg');
        setTimeout(() => {
            $msg.classList.add('activeMsg');
            console.log('ya se quito')
        }, 3000);
        console.log('ya se envio esta vaina');
    }
}


const validateForm = e => {
    e.preventDefault();
    const $inputs = d.querySelectorAll('form .group-input input');
    const $country = d.querySelector('[name="country"]');
    let count = 0;

    $inputs.forEach(el => {
        let reg = new RegExp(regexx[el.name])
        if(reg.test(el.value)) {
            el.parentElement.classList.remove('error-form');
        }else {
            el.parentElement.classList.add('error-form');
            count++;
        }
    });

    if($country.value == 0) {
        $country.parentElement.classList.add('error-form');
        count++;
    } else {
        $country.parentElement.classList.remove('error-form');
    }
    
    (count == 0) ? confirmationMsg(true) : confirmationMsg(false) ;
}


d.addEventListener('click', buyProducts);
d.addEventListener('DOMContentLoaded', buyProducts);
$form.addEventListener('submit', validateForm);