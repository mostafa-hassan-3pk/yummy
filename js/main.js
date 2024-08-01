let rowData = document.querySelector('.row-data')
let rowDetails = document.querySelector('.row-details')
let x = $(".nav-body").outerWidth()
let list = $('.nav li')
let searchByNameBtn = $('#search-name')
let searchByLetterBtn = $('#search-letter')
let rowLoading = $('.loading')
console.log(list);
$(".nav").animate({ left: `-${x}` })
$(".toggel").click(function () {
    if ($(".nav").css("left") == "0px") {
        cloaseNav()
    }
    else {
        openNav()
    }
})
start()
//! ====================== all function ======================
async function start() {
    rowData.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()
    displayMeal(response.meals.slice(0, 20))
    $(document).ready(function () {
        rowLoading.fadeOut(1000, function () {
        $('body').removeClass("overflow")
        rowLoading.removeClass("reload")
    })
    })
}
function cloaseNav() {
    $(".nav").animate({ left: `-${x}` })
    for (let i = 0; i < list.length; i++) {
        list.eq(i).animate({ top: "200px" })
    }
    $(".toggel i").removeClass('fa-solid open-close-icon fa-2x fa-x');
    $(".toggel i").addClass('fa-solid open-close-icon fa-2x fa-align-justify');
    
}
function openNav() {
    $(".nav").animate({ left: `0px` })
    for (let i = 0; i < list.length; i++) {
        list.eq(i).animate({ top: "0px" }, 600 + i * 100)
    }
    $(".toggel i").removeClass('fa-solid open-close-icon fa-2x fa-align-justify');
    $(".toggel i").addClass('fa-solid open-close-icon fa-2x fa-x');
}
function toggelLi() {
    $('.search-bar').fadeOut(100)
    $('.contact-us').fadeOut(100)
    $('.data').fadeIn(100)   
    $('.details').fadeOut(1)
}
// عرض الكاتيجورى 
async function getCategories() {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    rowLoading.fadeOut(100)
}
function displayCategories(x) {
    let col = ''
    for (let i = 0; i < x.length; i++) {
        col += `
         <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="meal position-relative overflow-hidden cursor-poiter rounded-2" categorie="${x[i].strCategory}">
                    <img class="w-100" src="${x[i].strCategoryThumb}" alt="asdasas">
                    <div class="layer position-absolute text-center text-black p-2 rounded-2">
                        <h2>${x[i].strCategory}</h2>
                        <p>${x[i].strCategoryDescription.split(" ").splice(0, 20).join(' ')}</p>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = col
    document.querySelectorAll(`.meal`).forEach(element => {
        element.addEventListener('click', function (e) {
            cloaseNav()
            getCategoryMeals(element.getAttribute('categorie'))
        })
    });
}
async function getCategoryMeals(categorie) {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
    response = await response.json()
    displayMeal(response.meals.slice(0, 20));
    rowLoading.fadeOut(100)
}
//عرض المنطقه
async function getAreas() {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayAreas(response.meals)
    rowLoading.fadeOut(100)
}
function displayAreas(x) {
    let col = ''
    for (let i = 0; i < x.length; i++) {
        col += `
         <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="meal  cursor-poiter text-center rounded-2" area="${x[i].strArea}">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h2>${x[i].strArea}</h2>
                </div>
            </div>`
    }
    rowData.innerHTML = col
    document.querySelectorAll(`.meal`).forEach(element => {
        element.addEventListener('click', function (e) {
            cloaseNav()
            getAreasMeals(element.getAttribute('area'))
        })
    });
}
async function getAreasMeals(area) {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeal(response.meals.slice(0, 20));
    rowLoading.fadeOut(100)
}
//عرض مكونات
async function getIngredients() {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.splice(0, 20))
    rowLoading.fadeOut(100)
}
function displayIngredients(x) {
    let col = ''
    for (let i = 0; i < x.length; i++) {
        col += `
         <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="meal  cursor-poiter text-center rounded-2" ingredient="${x[i].strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${x[i].strIngredient}</h3>
                        <P>${x[i].strDescription.split(" ").splice(0, 20).join("  ")}</P>
                </div>
            </div>`
    }
    rowData.innerHTML = col
    document.querySelectorAll(`.meal`).forEach(element => {
        element.addEventListener('click', function (e) {
            cloaseNav()
            getIngredientsMeals(element.getAttribute('ingredient'))
        })
    });
}
async function getIngredientsMeals(ingredient) {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await response.json()
    displayMeal(response.meals.slice(0, 20));
    rowLoading.fadeOut(100)
}
//السيرش 
async function searchByName(x) {
    rowData.innerHTML = ''
    rowLoading.fadeIn(100)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
    response = await response.json()
    displayMeal(response?.meals)
    rowLoading.fadeOut(100)
}
async function searchByLetter(x) {
    rowData.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
    response = await response.json()
    displayMeal(response?.meals)
}
//عرض الاكله
function displayMeal(x) {
    let col = ''
    for (let i = 0; i < x.length; i++) {
        col += `
         <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="meal position-relative overflow-hidden rounded-2" id="${x[i].idMeal}">
                    <img class="w-100" src="${x[i].strMealThumb}" alt="asdasas">
                    <div class="layer position-absolute d-flex align-items-center justify-content-between cursor-poiter text-center text-black p-2 rounded-2">
                        <h2>${x[i].strMeal}</h2>
                    </div>
                </div>
            </div>`
    }
    rowData.innerHTML = col
    document.querySelectorAll(`.meal`).forEach(element => {
        element.addEventListener('click', function (e) {
            cloaseNav()
            getMealById(element.getAttribute('id'))
        })
    });
}
async function getMealById(id) {
    $('.data').fadeOut(10, function () {
        rowLoading.fadeIn(10)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayMealDetails(response.meals[0])
    rowLoading.fadeOut(100, function () {
        $('.details').fadeIn(100)
    })
}
function displayMealDetails(meal) {
    rowDetails.innerHTML = ''
    let cartona = ''
    let cartona2 = ''
    for (let i = 1; i < 20; i++) {
        if (meal[`strIngredient${i}`])
            cartona += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}</li>`
    }
    let tags = meal.strTags?.split(" ")
    if (
        tags != undefined
    ) {
        for (let i = 0; i < tags.length; i++) {
            cartona2 += ` 
                        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
            `
        }
    }
    else {
        cartona2 = '<li class="alert alert-danger m-2 p-1">no tags</li>'
    }
    console.log(tags);
    rowDetails.innerHTML = `<div class="icon-x d-flex justify-content-end g-0 pe-3 "><i class="fa-solid fa-x cursor-poiter"></i></div>
                <div class="col-md-4">
                    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
                    <h2>Corba</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3>
                        <span class="fw-bold">Area : </span>
                        ${meal.strArea}
                    </h3>
                    <h3>
                        <span class="fw-bold">Category : </span>
                        ${meal.strCategory}
                    </h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${cartona}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${cartona2}
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    document.querySelector(".icon-x").addEventListener('click', function () {
        cloaseNav()
        $('.details').fadeOut(100, function () {
            $('.data').fadeIn(100)
        })
    })
}
//& ====================== all Events ======================
list.eq(0).click(function () {
    $('.search-bar').fadeIn(500)
    $('.contact-us').fadeOut(100)
    $('.data').fadeIn(100)
    $('.details').fadeOut(1)
    cloaseNav()
    rowData.innerHTML = ''
})
list.eq(1).click(function () {
    cloaseNav()
    toggelLi()
    getCategories()
})
list.eq(2).click(function () {
    toggelLi()
    cloaseNav()
    getAreas()
})
list.eq(3).click(function () {
    toggelLi()
    cloaseNav()
    getIngredients()
})
list.eq(4).click(function () {
    $('.search-bar').fadeOut(100)
    $('.contact-us').fadeIn(500)
    $('.data').fadeOut(10)
    $('.details').fadeOut(1)
    cloaseNav()
})
searchByNameBtn.on('input', function () {
    searchByName(searchByNameBtn.val())
})
searchByLetterBtn.on('input', function () {
    searchByLetter(searchByLetterBtn.val())
})
//* ====================== Validation ======================
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;
$("#nameInput").on('input', function name() {
    nameInputTouched=nameValidation()
    if(!nameInputTouched){
        $("#nameAlert").removeClass("d-none")
    }
    else{
        $("#nameAlert").addClass("d-none")
    }
    inputValidation()
})
$("#emailInput").on('input', function name() {
    emailInputTouched=emailValidation()
    if(!emailInputTouched){
        $("#emailAlert").removeClass("d-none")
    }
    else{
        $("#emailAlert").addClass("d-none")
    }
    inputValidation()
})
$("#phoneInput").on('input', function name() {
    phoneInputTouched=phoneValidation()
    if(!phoneInputTouched){
        $("#phoneAlert").removeClass("d-none")
    }
    else{
        $("#phoneAlert").addClass("d-none")
    }
    inputValidation()
})
$("#ageInput").on('input', function name() {
    ageInputTouched=ageValidation()
    if(!ageInputTouched){
        $("#ageAlert").removeClass("d-none")
    }
    else{
        $("#ageAlert").addClass("d-none")
    }
    inputValidation()
})
$("#passwordInput").on('input', function name() {
    passwordInputTouched=passwordValidation()
    if(!passwordInputTouched){
        $("#passwordAlert").removeClass("d-none")
    }
    else{
        $("#passwordAlert").addClass("d-none")
    }
    inputValidation()
})
$("#repasswordInput").on('input', function name() {
    repasswordInputTouched=repasswordValidation()
    if(!repasswordInputTouched){
        $("#repasswordAlert").removeClass("d-none")
    }
    else{
        $("#repasswordAlert").addClass("d-none")
    }
    inputValidation()
})
function inputValidation() {
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
