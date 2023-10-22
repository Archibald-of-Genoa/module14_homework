document.addEventListener("DOMContentLoaded", function () {
    const widthInput = document.getElementById("widthInput");
    const heightInput = document.getElementById("heightInput");
    const submitButton = document.getElementById("submitBtn");
    const imageContainer = document.querySelector(".imageContainer");
    const errorMessage = document.querySelector(".errorMessage");

    errorMessage.style.backgroundColor = "transparent";

    submitButton.addEventListener("click", function () {
        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);

        if (
            isNaN(width) ||
            isNaN(height) ||
            width < 100 ||
            width > 300 ||
            height < 100 ||
            height > 300
        ) {
            errorMessage.textContent =
                "Не хитри, товарищ! Одно из чисел вне диапазона от 100 до 300!";
            errorMessage.style.backgroundColor = "white";
            imageContainer.innerHTML = "";
        } else {
            errorMessage.textContent = "";
            imageContainer.innerHTML = "";

            const url = `https://picsum.photos/${width}/${height}`;

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.url;
                    } else {
                        throw new Error("Ошибка HTTP: " + response.status);
                    }
                })
                .then((imageUrl) => {
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = "Случайное изображение";
                    imageContainer.appendChild(imgElement);
                })
                .catch((error) => {
                    console.error("Ошибка:", error);
                });
        }
    });
});
