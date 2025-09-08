
const categoriesContainer = document.getElementById('categoriesContainer')
const plantsContainer = document.getElementById('plantsContainer')


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
    console.log(plants)
    // plantsContainer.innerHTML = ""
    plants.forEach(plant => {
        plantsContainer.innerHTML += `
        <div class="bg-white p-2 gap-y-2">
                        <div><img src="${plant.image}" alt=""></div>
                        <div><h2 class="font-bold">${plant.name}</h2> </div>
                        <div><p>${plant.description}</p></div>
                        <div>
                            <div><span>${plant.category}</span></div>
                            <div>৳<span>${plant.price}</span></div>
                        </div>
                        <button><a class=" bg-[#15803d] rounded-3xl  text-white px-5 py-2 ">Add to Cart</a></button>

                    
                    </div>

        `

    })
    
}

loadCategory()