const form = document.querySelector("#messages") as HTMLFormElement;

const table = document.querySelector("#tableBody") as HTMLTableElement;

const modal = document.querySelector("#editMessage") as HTMLFormElement;

interface Message {
  user: string;
  id: number;
  description: string;
  details: string;
}

const getMessageLocalStorage = (): Array<Message> => {
  const currentUser: string = checkCurrentUser();

  const message: Array<Message> = JSON.parse(localStorage.getItem(currentUser) || "[]");

  return message;
};

const refreshMessageLocalStorage = (message: Array<Message>): void => {
  const currentUser: string = checkCurrentUser();

  localStorage.setItem(currentUser, JSON.stringify(message));
};

const checkCurrentUser = (): string => {
  const currentUser: string = localStorage.getItem("currentUser") || "[]";

  return currentUser;
};

const saveMessage = (event: Event): void => {
  event.preventDefault();

  const user: string = checkCurrentUser();

  if (user === "[]") {
    messageAlert("Você precisa estar logado para salvar um recado", "danger");
    // alert("Faça login para continuar");
    setTimeout(() => {
      location.href = "pglogin.html";
    }, 2000);
    return;
  }
  const description: string = form?.description.value;

  const details: string = form?.details.value;

  const message: Array<Message> = getMessageLocalStorage();

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
  // alert("Recado adicionado com sucesso!");
  refreshMessageLocalStorage(message);

  fillTable();

  form.reset();
};

const fillTable = (): void => {
  const message: Array<Message> = getMessageLocalStorage();

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

const deleteMessage = (id: number) => {
  const messages: Message[] = getMessageLocalStorage();

  const indexMessage: number = messages.findIndex((message) => message.id === id);

  if (indexMessage < 0) return;

  messages.splice(indexMessage, 1);

  refreshMessageLocalStorage(messages);
  //alerta do bootstrap
  // alert("Recado removido com Sucesso");
  messageAlert("Recado removido com Sucesso", "success");

  fillTable();
};

const definirID = (): number => {
  let maxId = 0;

  const messages = getMessageLocalStorage();

  messages.forEach((message) => {
    if (message.id > maxId) {
      maxId = message.id;
    }
  });
  return maxId;
};

const createEdit = (id: number) => {
  const messages: Message[] = getMessageLocalStorage();

  const indexMessage: number = messages.findIndex((message) => message.id === id);

  if (indexMessage < 0) return;

  const closeModal = document.getElementById("modal") as HTMLElement;

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

const editMessage = (id: number) => {
  const message = getMessageLocalStorage();

  const user = checkCurrentUser();

  const indexMessage = JSON.parse(localStorage.getItem("editedMessage") || "") as number;

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

const closeModal = (): void => {
  const closeModal = document.getElementById("modal") as HTMLDivElement;

  closeModal.style.display = "none";

  localStorage.removeItem("editedMessage");
};

const userLogout = (): void => {
  localStorage.removeItem("currentUser");

  location.href = "pglogin.html";
};

const messageAlert = (message: string, type: string) => {
  const alert = document.getElementById("messageAlert") as HTMLDivElement;

  alert.classList.remove("d-none");

  alert.classList.add(`alert-${type}`);

  alert.innerText = message;

  const wrapper: HTMLDivElement = document.getElementById("wrapper") as HTMLDivElement;
  wrapper.classList.remove("d-none");
  wrapper.classList.add("wrapper");

  setTimeout(() => {
    alert.innerText = "";

    alert.classList.remove(`alert-${type}`);

    alert.classList.add("d-none");
  }, 2000);
};

const messageForms = document.getElementsByClassName("form-validation");

Array.from(messageForms).forEach((messageForm: any) => {
  messageForm.addEventListener("submit", (event: any) => {
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
