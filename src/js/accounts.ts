const formUser = document.querySelector("#accountForm") as HTMLFormElement;
const loginForm = document.querySelector("#loginForm") as HTMLFormElement;

interface User {
  id: number;
  email?: string;
  username: string;
  password: string;
  messages?: [];
}

interface Login {
  id: number;
  username: string;
  password: string;
}

const getUsersLocalStorage = (): Array<User> => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<User>;

  return users;
};

const refreshLocalStorage = (users: Array<User>) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const createUser = (event: Event) => {
  event.preventDefault();

  const email: string = formUser?.email.value;

  const username: string = formUser?.username.value;

  const password: string = formUser?.inputPassword.value;

  const verifyPsw: string = formUser?.repeatPassword.value;

  if (verifyPsw !== password) {
    return alert("As senhas precisam ser iguais!");
  }

  const users = getUsersLocalStorage();

  const userData: User = {
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
  // formUser.reset();
};

const getLoggedUser = (): Array<Login> => {
  const loggedUser = JSON.parse(localStorage.getItem("current") || "[]") as Array<Login>;

  return loggedUser;
};

const logIn = (event: Event) => {
  event.preventDefault();

  const createdUser: Array<User> = getUsersLocalStorage();

  const username = loginForm?.inputUsername.value;

  const password = loginForm?.inputPassword.value;

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

const defineUserId = (): number => {
  let max = 0;

  const currentUser = getUsersLocalStorage();

  currentUser.forEach((user) => {
    if (user.id > max) {
      max = user.id;
    }
  });
  return max;
};

const inputsAccount: any = document.getElementsByClassName("inputForm");

for (let input of inputsAccount) {
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      input.classList.add("has-val");
    } else {
      input.classList.remove("has-val");
    }
  });
}

formUser?.addEventListener("submit", createUser);

loginForm?.addEventListener("submit", logIn);
