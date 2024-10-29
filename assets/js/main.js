const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};

const displayCategories = async () => {

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getCategories();
        const result = data.map((category) => {
            return `
         <div class="category">
         <h2>${category}</h2>
         <a href='categoryDetails.html?category=${category}'>Details</a>
        </div>`;
        }).join(' ');
        document.querySelector(".Categories .row").innerHTML = result;

    }
    catch (error) {
        document.querySelector(".Categories .row").innerHTML = "<p>error loading categories</p>";
    }
    finally {
        loader.classList.remove("active");
    }


}

const getProducts = async () => {
    const { data } = await axios('https://dummyjson.com/products');
    return data;

}

const displayProduct = async () => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getProducts();
        const result = data.products.map((product) => {
            return `
<div class="product">
<h3>${product.title}</h3>
<img src="${product.thumbnail}" alt="product.description"/>
</div>`

        }).join('');
        document.querySelector(".product .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".product .row").innerHTML = "<p>erro loading products</p>"

    }
    finally {
        loader.classList.remove("active");
    }
}

displayCategories();
displayProduct();

window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".Categories");

    if (window.scrollY > categories.offsetTop) {
        document.querySelector(".header").classList.add("navbarScroll");
    }
    else {
        document.querySelector(".header").classList.remove("navbarScroll");
    }


}
const countdown = () => {


    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.querySelector("#days").textContent = days;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.querySelector("#hours").textContent = hours;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.querySelector("#minutes").textContent = minutes;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector("#seconds").textContent = seconds;
}

setInterval(() => {
    countdown();
}, 1000
)