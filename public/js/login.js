"use strict";
const loginForm = document.querySelector("#loginForm");
const getUsersLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users;
};
const refreshLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
const login = (event) => {
    event.preventDefault();
    const createdUser = getUsersLocalStorage();
    const username = loginForm?.username.value;
    const password = loginForm?.password.value;
    const foundUser = createdUser.find((user) => user.username === username && user.password === password);
    if (!foundUser) {
        loginAlert("Usuário e/ou senha inválidos!", "danger");
        return;
    }
    const currentUser = foundUser.username;
    localStorage.setItem("currentUser", currentUser);
    location.href = "recados.html";
};
const loginAlert = (message, type) => {
    const alert = document.getElementById("loginAlert");
    alert.classList.remove("d-none");
    alert.classList.add(`alert-${type}`);
    alert.innerText = message;
    const wrapper = document.getElementById("wrapper");
    wrapper.classList.remove("d-none");
    wrapper.classList.add("wrapper");
    setTimeout(() => {
        alert.innerText = "";
        alert.classList.remove(`alert-${type}`);
        alert.classList.add("d-none");
    }, 2000);
};
const forms = document.getElementsByClassName("form-validation");
Array.from(forms).forEach((loginForm) => {
    loginForm.addEventListener("submit", (event) => {
        if (!loginForm.checkValidity()) {
            event.preventDefault();
        }
        loginForm.classList.add("was-validated");
        setTimeout(() => {
            loginForm.classList.remove("was-validated");
        }, 4000);
    });
});
loginForm?.addEventListener("submit", login);
