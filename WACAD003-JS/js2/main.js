const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const img_filenames = [1,2,3,4,5].map(i => `images/pic${i}.jpg`);



/* Declaring the alternative text for each image file */

/* Looping through images */


// Como não pude mexer no html nem no css, teve que ser na gambiarra...

displayedImage.style.width = "100%";
displayedImage.style.height = "100%";

const handleImageSelection = (src) => {
    displayedImage.src = src
};

img_filenames.forEach((img_src) => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', img_src);
    newImage.setAttribute('alt', img_src);
    newImage.height = 80;
    thumbBar.appendChild(newImage);

    newImage.addEventListener("click", () => handleImageSelection(img_src));

})

/* Wiring up the Darken/Lighten button */

const handleDarkenButton = () => {
    if(btn.getAttribute("class") === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
}

btn.addEventListener("click", handleDarkenButton);