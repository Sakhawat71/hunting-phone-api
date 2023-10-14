// load Data form API
const loadData = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

// display data 
const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';

    const showAll = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove("hidden");
    }
    else {
        showAll.classList.add("hidden");
    }

    console.log("is show all ", isShowAll)

    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }

    phones.forEach(phone => {

        const phoneDiv = document.createElement("div");
        phoneDiv.classList = `card bgx-[#CFCFCF] shadow-xl`;
        phoneDiv.innerHTML = `
        <figure class="px-10 py-10 mx-6 bg-[#0D6EFD0D]">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center text-[#403F3F] ">
            <h2 class="card-title font-bold text-[25px]"> ${phone.phone_name} </h2>
            <p class="font-normal text-[18px] mt-2"> ${phone.slug} </p>
            <h2 class="font-bold text-[25px]">${phone.brand}</h2>
            <div class="card-actions">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary bg-[#0D6EFD] text-white border-none font-semibold text-[16px]">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });

    toggleLoading(false);
}

// show details

const showDetails = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    show_details_modal.showModal()

    // const {name,image,mainFeatures,brand,slug,releaseDate,others} = phone;
    // const {storage,displaySize,memory,chipSet,} = mainFeatures;
    // const {GPS,WLAN} = others;


    console.log(phone)
    const showDetailsDiv = document.getElementById("show-phone-details");
    showDetailsDiv.innerHTML = `
    <figure class="px-10 py-10 bg-[#0D6EFD0D]">
        <img src="${phone.image}" alt="phone" class="rounded-xl" />
    </figure>
    <div class="card-body ">
        <h2 class="card-title">${phone.name}</h2>
        <p> <span>Storage:</spna> ${phone.mainFeatures?.storage}</p>
        <p> <span>Display:</spna> ${phone.mainFeatures?.displaySize}</p>
        <p> <span>ChipSet:</spna> ${phone.mainFeatures?.chipSet}</p>
        <p> <span>Memory:</spna> ${phone.mainFeatures?.memory}</p>
        <p> <span>Release data:</spna> ${phone?.releaseDate}</p>
        <p> <span>Brand:</spna> ${phone?.brand}</p>
        <p> <span>GPS:</spna> ${phone?.others?.GPS || "not found"}</p>
    </div>
    `;


}


// search data
const searchHandle = (isShowAll) => {
    toggleLoading(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // searchField.value = '';
    loadData(searchText, isShowAll);

}

// 'Enter' button search 
const searchOnEnter = (event) => {
    if (event.key === 'Enter') {
        searchHandle();
    };
}

//  show loader 
const toggleLoading = (isLoading) => {
    const loadingDiv = document.getElementById("loading-infinity-div");
    if (isLoading) {
        loadingDiv.classList.remove("hidden");
    }
    else {
        loadingDiv.classList.add("hidden")
    }
}

// shaw all products
const handleShowAll = () => {

    searchHandle(true);
}

loadData()