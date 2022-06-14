const userForm = document.querySelector("#userForm") as HTMLFormElement;

interface User {
  email: string;
  username: string;
  password: string;
}

const getUsersFromLocalStorage = (): Array<User> => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<User>;

  return users;
};

const refreshUserLocalStorage = (users: Array<User>) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const createUser = (event: Event) => {
  event.preventDefault();

  const email: string = userForm?.email.value;

  if (email.length < 5) {
    userAlert("Digite um email válido!", "danger");

    return;
  }

  const username: string = userForm?.username.value;

  if (username.length < 5) {
    userAlert("Digite um nome de usuário válido!", "danger");

    return;
  }
  const password: string = userForm?.password.value;

  if (password.length < 4) {
    userAlert("Digite uma senha válida!", "danger");

    return;
  }
  const verifyPsw: string = userForm?.repeatPassword.value;

  if (verifyPsw !== password) {
    userAlert("As senhas não conferem!", "danger");

    return;
  }

  const users = getUsersFromLocalStorage();

  const userData: User = {
    email,
    username,
    password,
  };

  const userExists = users.some(
    (user) => user.username === userData.username || user.email === userData.email
  );
  if (userExists) {
    userAlert("Usuário ou email já cadastrado!", "danger");

    return;
  }

  users.push(userData);

  refreshUserLocalStorage(users);

  userAlert("Usuário cadastrado com sucesso!", "success");

  setTimeout(() => {
    location.href = "index.html";
  }, 2000);
};

const userAlert = (message: string, type: string) => {
  const alert = document.getElementById("userAlert") as HTMLDivElement;

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

const userForms = document.getElementsByClassName("form-validation");

Array.from(userForms).forEach((userForm: any) => {
  userForm.addEventListener("submit", (event: any) => {
    if (!userForm.checkValidity()) {
      event.preventDefault();
    }
    userForm.classList.add("was-validated");
    setTimeout(() => {
      userForm.classList.remove("was-validated");
    }, 4000);
  });
});

userForm?.addEventListener("submit", createUser);
