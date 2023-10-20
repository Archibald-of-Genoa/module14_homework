document.addEventListener("DOMContentLoaded", function () {
  const numberInput = document.getElementById("numberInput");
  const submitButton = document.getElementById("submitBtn");
  const imageContainer = document.querySelector(".imageContainer");
  const errorMessage = document.querySelector(".errorMessage");

  submitButton.addEventListener("click", function () {

    const value = parseInt(numberInput.value);

    if (value >= 1 && value <= 10) {
      errorMessage.textContent = "";

      const xhr = new XMLHttpRequest();

      xhr.open("GET", `https://picsum.photos/v2/list?limit=${value}`, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          imageContainer.innerHTML = "";

          data.forEach((image) => {
            const imgElement = document.createElement("img");
            imgElement.src = image.download_url;
            imgElement.alt = "Случайное изображение";
            imageContainer.appendChild(imgElement);
          });
        } else {
          console.error("Ошибка", xhr.status, xhr.statusText);
        }
      };

      xhr.onerror = function () {
        console.error("Ошибка");
      };

      xhr.send();
    } else {
      errorMessage.textContent = "Не хитри, товарищ! Число вне диапазона!";
      imageContainer.innerHTML = "";
    }
  });
  
});


