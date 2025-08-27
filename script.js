function addTarefa() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("task").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    form.reset();
}