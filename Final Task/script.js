document.addEventListener("DOMContentLoaded", function () {
    const pageInput = document.getElementById("pageInput");
    const limitInput = document.getElementById("limitInput");
    const submitButton = document.getElementById("submitBtn");
    const imageContainer = document.querySelector(".imageContainer");
    const errorMessage = document.querySelector(".errorMessage");

    const lastPage = localStorage.getItem("lastPage");
    const lastLimit = localStorage.getItem("lastLimit");

    if (lastPage && lastLimit) {
        pageInput.value = lastPage;
        limitInput.value = lastLimit;
        fetchData(lastPage, lastLimit);
    }

    errorMessage.style.backgroundColor = "transparent";

    submitButton.addEventListener("click", function () {
        const page = parseInt(pageInput.value);
        const limit = parseInt(limitInput.value);

        const pageOutOfRange = page < 1 || page > 10;
        const limitOutOfRange = limit < 1 || limit > 10;

        if (isNaN(page) || pageOutOfRange) {
            errorMessage.textContent = pageOutOfRange ? "Товарищ! Не хитри! Номер страницы вне диапазона от 1 до 10" : "Товарищ! Не хитри! Номер страницы должен быть числом";
            errorMessage.style.backgroundColor = "white";
            imageContainer.innerHTML = "";
        } else if (isNaN(limit) || limitOutOfRange) {
            errorMessage.textContent = limitOutOfRange ? "Товарищ! Не хитри! Лимит вне диапазона от 1 до 10" : "Товарищ! Не хитри! Лимит должен быть числом";
            errorMessage.style.backgroundColor = "white";
            imageContainer.innerHTML = "";
        } else {
            errorMessage.textContent = "";
            errorMessage.style.backgroundColor = "transparent";
            imageContainer.innerHTML = "";

            fetchData(page, limit);

            localStorage.setItem("lastPage", page);
            localStorage.setItem("lastLimit", limit);
        }
    });

    function fetchData(page, limit) {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Ошибка HTTP: " + response.status);
                }
            })
            .then((data) => {
                data.forEach((item) => {
                    const imgElement = document.createElement("img");
                    imgElement.src = item.download_url;
                    imgElement.alt = "Случайное изображение";
                    imageContainer.appendChild(imgElement);
                });
            })
            .catch((error) => {
                console.error("Ошибка:", error);
            });
    }
});
