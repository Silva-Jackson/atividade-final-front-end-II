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
  messages?: [];
}
// interface UserLogin extends User, Login {}

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

  //   console.log(users.some((user) => user.email === userData.email));
  //   console.log(users.some((user) => user.username === userData.username));
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
    messages: [],
  });

  refreshLocalStorage(users);

  alert("Usuário criado com sucesso!");

  location.href = "../src/index.html";
  //   formUser.reset();
};

//fazer login
// se for usar manter logado ideal seria salvar na local.storage o usuário
// caso sim na parte dos recados verificar o checkbox e buscar do local
const getLoggedUser = (): Array<Login> => {
  const loggedUser = JSON.parse(localStorage.getItem("current") || "[]") as Array<Login>;
  return loggedUser;
};

const logIn = (event: Event) => {
  event.preventDefault();

  const createdUser: Array<User> = getUsersLocalStorage();
  //  JSON.parse(localStorage.getItem("users") || "[]");

  const username = loginForm?.inputUsername.value;
  const password = loginForm?.inputPassword.value;
  // const remainLogged = loginForm.remainLoggedIn.checked;
  // const email = formUser?.inputEmail.value;

  // const users = getUsersLocalStorage();
  const foundUser = createdUser.find((user) => user.username === username && user.password === password);
  console.log(foundUser);

  if (foundUser === undefined) {
    alert("Usuário ou senha inválida");
    return;
  }
  const loggedUser = getLoggedUser();

  // checar se o usuario já está logado pra nao entrar 2x na local storage
  // const userExists = loggedUser.find(({username}) => username === foundUser.username);
  // // for (const user of createdUser) {
  // //   console.log(loggedUser);
  // //   console.log(foundUser);
  // // }

  // if (userExists === undefined) {
  //   return; // loggedUser.push({
  //   //   id,
  //   //   username,
  //   //   password,
  //   // });
  // }
  const currentUser = foundUser.id;
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  // podemos usar isso para asignar um recado a um user?
  // sessionStorage.setItem("currentUser", JSON.stringify(foundUser.id));
  location.href = "../src/seus-recados.html";

  // const email: string = formUser?.email.value;
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
//mudar aparencia campos quando != vazio
const inputsAccount: any = document.getElementsByClassName("inputForm");
for (let input of inputsAccount) {
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      input.classList.add("has-val");
      // console.log(inputsAccount);
      // console.log(input);
    } else {
      input.classList.remove("has-val");
    }
  });
}

formUser?.addEventListener("submit", createUser);
loginForm?.addEventListener("submit", logIn);
