
const categoriesContainer = document.getElementById('categoriesContainer')
const plantsContainer = document.getElementById('plantsContainer')
const allPlantsBtn = document.getElementById("all-trees")


    

        
const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
        const allPlants = data.plants 
        plantsContainer.innerHTML = ""
            allPlants.forEach(plant => {
                plantsContainer.innerHTML += `
                            <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
                                <div class="w-full h-48 overflow-hidden rounded-xl">
                                    <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover">
                                </div>
                                <h2 class="font-semibold py-2">${plant.name}</h2>
                                <p class="text-sm text-gray-600 pb-2">${plant.description}</p>
                                <div class="flex justify-between items-center mb-3">
                                    <span class="text-[12px] bg-green-200 text-green-800 px-2 py-1 rounded-lg">${plant.category}</span>
                                    <span class="font-semibold">৳${plant.price}</span>
                                </div>
                                <button class="bg-[#15803d] hover:bg-green-800 rounded-3xl text-white px-5 py-2 w-full">
                                    Add to Cart
                                </button>
                            </div>
                        `;
                });
        })
    .catch((err) => {
        console.log(err);
    });
};
window.onload = () => {
    loadAllPlants();
};



const loadCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
     .then((res) => res.json())
     .then((data) => {
        const categories = data.categories
        // console.log(categories)

        showCategories(categories)
    })
    .catch((err) => {
        console.log(err);
    });
};

const showCategories = (categories) => {
    categories.forEach(cat => {
            categoriesContainer.innerHTML += `<li id="${cat.id}"  class="w-full rounded-sm hover:bg-[#15803d] hover:text-white cursor-pointer my-1 p-2">${cat.category_name}</li>
            `  
        });
        categoriesContainer.addEventListener('click', (e) => {
            const allli = document.querySelectorAll('li')
            allli.forEach(li =>{
                li.classList.remove('bg-[#15803d]')
            })
            if(e.target.localName === 'li') {
                // console.log(e.target.id)
                e.target.classList.add('bg-[#15803d]')
                loadPlantsByCategory(e.target.id)
            }
                
        })                   
}
const loadPlantsByCategory =(categoryId) =>{
    console.log(categoryId)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res  => res.json())
    .then(data => {
        // console.log(data.plants)
        showPlantsByCategory(data.plants)
    })

    .catch(err => {
        console.log(err)
    })
}
const showPlantsByCategory = (plants) => {
    // console.log(plants)
    plantsContainer.innerHTML = ""
    plants.forEach(plant => {
        plantsContainer.innerHTML += `
        <div class="bg-white p-4 rounded-lg">
                        <div class="w-full h-48 overflow-hidden rounded-xl">
                        <img src="${plant.image}" alt="" class="w-full h-full object-cover mt-1">
                        </div>
                        <div><h2 class="font-semibold py-1">${plant.name}</h2> </div>
                        <p class="text-sm text-gray-600 pb-2">${plant.description}</p>
                        <div class="flex justify-between">
                            <span class="  text-[12px] bg-green-200 text-green-800 px-2 py-1 rounded-lg">${plant.category}</span>
                            <span class="font-semibold">৳${plant.price}</span>
                        </div>
                        <button class=" bg-[#15803d] rounded-3xl  text-white px-5 py-2 w-full my-5 ">Add to Cart</button>

                    
                    </div>

        `

    })
    
}

loadCategory()
allPlantsBtn.addEventListener("click", () => {
    loadAllPlants();
});
