const onSelectFile = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  fetch("/api/image", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
};

const addListener = () => {
  const input = document.getElementById("uploadFile");
  input.addEventListener("change", onSelectFile, false);
};

window.addEventListener("load", function () {
  addListener();
});
