const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;
// display 20 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 20){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

        const noPhone = document.getElementById('no-phone-message');
        if(phones.length === 0){
            noPhone.classList.remove('d-none');
        }
        else{
            noPhone.classList.add('d-none');
        }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
         <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                       
                    </div>
                    </div>
        
        
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // togglespinner stop:
    toggleSpinner(false);
}


const processSearch = (dataLimit) => {
toggleSpinner(true)

const searchField = document.getElementById('search-field');
const searchText = searchField.value;

searchField.value = ``;

loadPhone(searchText, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function(){

processSearch(10);
})

// search input field enter key handler

document.getElementById('search-field').addEventListener('keypress', function(e){
    
    if(e.key === 'Enter'){

        processSearch();
    }
})




const toggleSpinner = isloading => {
    const loaderSection = document.getElementById('loader');
    if(isloading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('Phone-Modal-lable');
    modalTitle.innerText = phone.name;

    const phnDetail = document.getElementById('phone-details');
    phnDetail.innerHTML = `
    <img class="" src="${phone.image}" >
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</p>
    <p>others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <span>Sensors: ${phone.mainFeatures ? phone.mainFeatures.sensors : 'No sensor had in this device'}</span>
    `;
}


document.getElementById('btn-show-all').addEventListener('click', function(){
 processSearch();
})
loadPhone('apple');