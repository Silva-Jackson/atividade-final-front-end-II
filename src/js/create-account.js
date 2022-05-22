"use strict";
const formUser = document.querySelector("#accountForm");
const getUsersLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users;
};
const refreshLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
const createUser = (event) => {
    event.preventDefault();
    const email = formUser === null || formUser === void 0 ? void 0 : formUser.email.value;
    const username = formUser === null || formUser === void 0 ? void 0 : formUser.username.value;
    const password = formUser === null || formUser === void 0 ? void 0 : formUser.inputPassword.value;
    const users = getUsersLocalStorage();
    const userData = {
        email,
        username,
        password,
    };
    console.log(users.some((user) => user.email === userData.email));
    console.log(users.some((user) => user.username === userData.username));
    for (const user of users) {
        if (user.email === userData.email || user.username === userData.username) {
            alert("Usuário já existe!");
            return;
        }
    }
    users.push({
        email,
        username,
        password,
    });
    refreshLocalStorage(users);
    alert("Usuário criado com sucesso!");
    window.location.assign("../src/index.html");
};
const inputsCreateAcc = document.getElementsByClassName("inputForm");
for (let input of inputsCreateAcc) {
    input.addEventListener("blur", () => {
        if (input.value.trim() !== "") {
            input.classList.add("has-val");
        }
        else {
            input.classList.remove("has-val");
        }
    });
}
formUser === null || formUser === void 0 ? void 0 : formUser.addEventListener("submit", createUser);
