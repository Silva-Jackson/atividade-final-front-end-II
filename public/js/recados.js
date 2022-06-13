"use strict";
const form = document.querySelector("#messages");
const table = document.querySelector("#tableBody");
const modal = document.querySelector("#editMessage");
const getMessageLocalStorage = () => {
    const currentUser = checkCurrentUser();
    const message = JSON.parse(localStorage.getItem(currentUser) || "[]");
    return message;
};
const refreshMessageLocalStorage = (message) => {
    const currentUser = checkCurrentUser();
    localStorage.setItem(currentUser, JSON.stringify(message));
};
const checkCurrentUser = () => {
    const currentUser = localStorage.getItem("currentUser") || "[]";
    return currentUser;
};
const saveMessage = (event) => {
    event.preventDefault();
    const user = checkCurrentUser();
    if (user === "[]") {
        messageAlert("Você precisa estar logado para salvar um recado", "danger");
        setTimeout(() => {
            location.href = "pglogin.html";
        }, 2000);
        return;
    }
    const description = form?.description.value;
    const details = form?.details.value;
    const message = getMessageLocalStorage();
    if (description.length < 1) {
        messageAlert("Por favor, insira uma descrição para o recado.", "danger");
        return;
    }
    if (details.length < 1) {
        messageAlert("Por favor, insira detalhes para o recado.", "danger");
        return;
    }
    message.push({
        user,
        id: definirID() + 1,
        description,
        details,
    });
    messageAlert("Recado salvo com Sucesso", "success");
    refreshMessageLocalStorage(message);
    fillTable();
    form.reset();
};
const fillTable = () => {
    const message = getMessageLocalStorage();
    table.innerHTML = "";
    for (const messages of message) {
        table.innerHTML += `<tr class="row">
    <td class="col-2">${messages.id}</td>
    <td class="col-3 col-xl-2">${messages.description}</td>
    <td class="col-4 col-xl-5">${messages.details}</td>
    <td class="col-3">
      <button
        class="btn btn-success bi-pencil-fill text-light p-1 px-sm-2 px-lg-3 ms-sm-3 me-lg-3" onclick="createEdit(${messages.id}),
        document.getElementById('modal').style.display='block'
        "
      ></button>
      <button
        class="btn btn-danger bi-trash3-fill text-light p-1 px-sm-2 px-lg-3 ms-sm-3 mg-lg-3" onclick="deleteMessage(${messages.id})"
      ></button>
    </td>
  </tr>`;
    }
};
const deleteMessage = (id) => {
    const messages = getMessageLocalStorage();
    const indexMessage = messages.findIndex((message) => message.id === id);
    if (indexMessage < 0)
        return;
    messages.splice(indexMessage, 1);
    refreshMessageLocalStorage(messages);
    messageAlert("Recado removido com Sucesso", "success");
    fillTable();
};
const definirID = () => {
    let maxId = 0;
    const messages = getMessageLocalStorage();
    messages.forEach((message) => {
        if (message.id > maxId) {
            maxId = message.id;
        }
    });
    return maxId;
};
const createEdit = (id) => {
    const messages = getMessageLocalStorage();
    const indexMessage = messages.findIndex((message) => message.id === id);
    if (indexMessage < 0)
        return;
    const closeModal = document.getElementById("modal");
    window.onclick = (click) => {
        if (click.target === closeModal) {
            closeModal.style.display = "none";
            localStorage.removeItem("editedMessage");
        }
    };
    const newDescription = messages[indexMessage];
    modal.newDescription.value = newDescription.description;
    modal.newDetail.value = newDescription.details;
    localStorage.setItem("editedMessage", JSON.stringify(indexMessage));
};
const editMessage = (id) => {
    const message = getMessageLocalStorage();
    const user = checkCurrentUser();
    const indexMessage = JSON.parse(localStorage.getItem("editedMessage") || "");
    if (indexMessage < 0) {
        return;
    }
    if (modal.newDescription.value.length < 1) {
        messageAlert("Por favor, insira uma descrição para o recado.", "danger");
        return;
    }
    if (modal.newDetail.value.length < 1) {
        messageAlert("Por favor, insira detalhes para o recado.", "danger");
        return;
    }
    const newMessage = [
        {
            user,
            id: indexMessage + 1,
            description: modal.newDescription.value,
            details: modal.newDetail.value,
        },
    ];
    message.splice(indexMessage, 1, newMessage[0]);
    localStorage.removeItem("editedMessage");
    refreshMessageLocalStorage(message);
    fillTable();
};
const closeModal = () => {
    const closeModal = document.getElementById("modal");
    closeModal.style.display = "none";
    localStorage.removeItem("editedMessage");
};
const userLogout = () => {
    localStorage.removeItem("currentUser");
    location.href = "pglogin.html";
};
const messageAlert = (message, type) => {
    const alert = document.getElementById("messageAlert");
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
const messageForms = document.getElementsByClassName("form-validation");
Array.from(messageForms).forEach((messageForm) => {
    messageForm.addEventListener("submit", (event) => {
        if (!messageForm.checkValidity()) {
            event.preventDefault();
        }
        messageForm.classList.add("was-validated");
        setTimeout(() => {
            messageForm.classList.remove("was-validated");
        }, 3000);
    });
});
form?.addEventListener("submit", saveMessage);
document.addEventListener("DOMContentLoaded", fillTable);
