const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement("div");
        phoneDiv.classList = `card bgx-[#CFCFCF] shadow-xl`;
        phoneDiv.innerHTML = `
        <figure class="px-10 py-10 mx-6 bg-[#0D6EFD0D]">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center text-[#403F3F] ">
            <h2 class="card-title font-bold text-[25px]"> ${phone.phone_name} </h2>
            <p class="font-normal text-[18px] mt-2"> lorem20 </p>
            <h2 class="font-bold text-[25px]">$999</h2>
            <div class="card-actions">
                <button class="btn btn-primary bg-[#0D6EFD] text-white border-none font-semibold text-[16px]">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
}

const searchHandle = () =>{
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadData(searchText);
    console.log(searchText)
    // console.log("search find")
    searchField.value = '';
}
const searchOnEnter = (event) =>{
    if(event.key === 'Enter'){
        searchHandle();
    };
}

loadData()