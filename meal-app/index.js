// Les pointages des élements HTML
const result = document.getElementById('result');
const form = document.querySelector('form');
const input = document.querySelector('input');
let mealData = [];


console.log(result);

// fonction pour fetcher
const fetchMeal = async (search) => {
   await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (mealData = data.meals));

    // displayMeal();

    console.log(mealData);
}

// fonction pour afficher

const displayMeal = () => {
    mealData.length = 12;

    result.innerHTML = mealData.map((meal) =>
        `
        <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
            <ul></ul>
        </li>
        `
    ).join("");

}

// les events listener

input.addEventListener('input', (e) => {
    fetchMeal(e.target.value)
    .then(() => displayMeal());
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    displayMeal();
});
