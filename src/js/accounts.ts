const formUser = document.querySelector("#accountForm") as HTMLFormElement;
const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
interface User {
  email: string;
  username: string;
  password: string;
}
interface Login {
  username: string;
  password: string;
}
interface UserLogin extends User, Login {}

const getUsersLocalStorage = (): Array<UserLogin> => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<UserLogin>;
  return users;
};

const refreshLocalStorage = (users: Array<UserLogin>) => {
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
    email,
    username,
    password,
  });

  refreshLocalStorage(users);

  alert("Usuário criado com sucesso!");

  location.href = "../src/index.html";
  //   formUser.reset();
};

//fazer login criar

const logIn = (event: Event) => {
  event.preventDefault();

  const createdUser: Array<UserLogin> = getUsersLocalStorage();
  //  JSON.parse(localStorage.getItem("users") || "[]");

  const username = loginForm?.inputUsername.value;
  const password = loginForm?.inputPassword.value;
  // const users = getUsersLocalStorage();
  const foundUser = createdUser.find((user) => user.username === username && user.password === password);

  if (foundUser === undefined) {
    alert("Usuário ou senha inválida");
    return;
  }

  location.href = "../src/seus-recados.html";
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
