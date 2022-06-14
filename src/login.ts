const loginForm = document.querySelector("#loginForm") as HTMLFormElement;

const getUsersLocalStorage = (): Array<User> => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<User>;

  return users;
};

const refreshLocalStorage = (users: Array<User>) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const login = (event: Event) => {
  event.preventDefault();

  const createdUser: Array<User> = getUsersLocalStorage();

  const username: string = loginForm?.username.value;

  const password: string = loginForm?.password.value;

  const foundUser = createdUser.find(
    (user) => user.username === username && user.password === password
  );

  if (!foundUser) {
    loginAlert("Usuário e/ou senha inválidos!", "danger");
    return;
  }

  const currentUser = foundUser.username;

  localStorage.setItem("currentUser", currentUser);

  location.href = "recados.html";
};

const loginAlert = (message: string, type: string) => {
  const alert = document.getElementById("loginAlert") as HTMLDivElement;

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

const forms = document.getElementsByClassName("form-validation");

Array.from(forms).forEach((loginForm: any) => {
  loginForm.addEventListener("submit", (event: any) => {
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
