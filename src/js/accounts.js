"use strict";
const formUser = document.querySelector("#accountForm");
const loginForm = document.querySelector("#loginForm");
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
    const verifyPsw = formUser === null || formUser === void 0 ? void 0 : formUser.repeatPassword.value;
    if (verifyPsw !== password) {
        return alert("As senhas precisam ser iguais!");
    }
    const users = getUsersLocalStorage();
    const userData = {
        id: defineUserId() + 1,
        email,
        username,
        password,
    };
    for (const user of users) {
        if (user.email === userData.email || user.username === userData.username) {
            alert("Usuário já existe!");
            return;
        }
    }
    users.push({
        id: defineUserId() + 1,
        email,
        username,
        password,
    });
    refreshLocalStorage(users);
    alert("Usuário criado com sucesso!");
    location.href = "../src/index.html";
};
const getLoggedUser = () => {
    const loggedUser = JSON.parse(localStorage.getItem("current") || "[]");
    return loggedUser;
};
const logIn = (event) => {
    event.preventDefault();
    const createdUser = getUsersLocalStorage();
    const username = loginForm === null || loginForm === void 0 ? void 0 : loginForm.inputUsername.value;
    const password = loginForm === null || loginForm === void 0 ? void 0 : loginForm.inputPassword.value;
    const foundUser = createdUser.find((user) => user.username === username && user.password === password);
    if (foundUser === undefined) {
        alert("Usuário ou senha inválida");
        return;
    }
    const currentUser = foundUser.username;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    location.href = "../src/seus-recados.html";
};
const defineUserId = () => {
    let max = 0;
    const currentUser = getUsersLocalStorage();
    currentUser.forEach((user) => {
        if (user.id > max) {
            max = user.id;
        }
    });
    return max;
};
const inputsAccount = document.getElementsByClassName("inputForm");
for (let input of inputsAccount) {
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
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", logIn);
