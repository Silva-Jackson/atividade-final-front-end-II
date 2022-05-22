const formUser = document.querySelector("#accountForm") as HTMLFormElement;
interface User {
  email: string;
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

  const users = getUsersLocalStorage();
  const userData: User = {
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
  //   formUser.reset();
};
/*primeira forma nao deu boa, valida os 2 campos, se um diferente ele loga
  // se os campos estiverem completos verifica se já tem o usuário

  if (!email || !username || !password) {
    // console.log("vazio");

    return;
  }
  const userData = {
    email,
    username,
    password,
  };
  const userDataString = JSON.stringify(userData);
  console.log(userData);
  console.log(userDataString);
  const users = getUsersLS();
  //   const usersString = JSON.stringify(users);
  console.log(users);
  //   console.log(usersString);

  //   verifica se existe o usuário
  const userExists = users.find((user) => JSON.stringify(user) === userDataString);

  if (userExists) {
    return alert("Usuário já existe");
  }
  users.push({
    email,
    username,
    password,
  });
  //   if (users.includes(userData)) {
  //   } else {
  //   }

  refreshLS(users);
  alert("Usuário criado com sucesso!");
  //   formUser.reset();
}*/

//mudar aparencia campos quando != vazio
const inputsCreateAcc: any = document.getElementsByClassName("inputForm");
for (let input of inputsCreateAcc) {
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      input.classList.add("has-val");
      // console.log(inputsCreateAcc);
      // console.log(input);
    } else {
      input.classList.remove("has-val");
    }
  });
}

formUser?.addEventListener("submit", createUser);
