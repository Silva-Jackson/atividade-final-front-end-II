const form = document.querySelector("#seusRecados") as HTMLFormElement;
const corpoTabela = document.querySelector("#corpoTabela") as HTMLTableElement;
const modal = document.querySelector("#editarRecado") as HTMLFormElement;

interface Recado {
  userId: number;
  id: number;
  descricao: string;
  detalhe: string;
}
interface Login {
  id: number;
  username: string;
  password: string;
  messages?: [];
}

const recuperarLocalStorage = (): Array<Recado> => {
  const recados = JSON.parse(localStorage.getItem("recados") || "[]") as Array<Recado>;

  return recados;
};

const atualizarLocalStorage = (recados: Array<Recado>) => {
  localStorage.setItem("recados", JSON.stringify(recados));
};

const salvarRecado = (event: Event) => {
  event.preventDefault();
  const userId: number = checkCurrentUser();
  const descricao: string = form?.descRecado.value;
  const detalhe: string = form?.detalheRecado.value;
  // const recados = recuperarLocalStorage();
  // console.log(recados);
  const message = `${userId}${descricao}${detalhe}`;
  // localStorage.setItem(`${recados}_${currentUser}`, JSON.stringify(recados));
  const recadosUser = JSON.parse("`${recados}_${currentUser}`");
  console.log(recadosUser);

  recadosUser.push({
    userId,
    id: definirID() + 1,
    descricao,
    detalhe,
  });

  // atualizarLocalStorage(recados);

  alert("Recado adicionado com sucesso!");

  preencherTabela();

  form.reset();
};

const preencherTabela = () => {
  const recados = recuperarLocalStorage();

  corpoTabela.innerHTML = "";

  for (const recado of recados) {
    corpoTabela.innerHTML += `
        <tr>
            <td class=tableId>${recado.id}</td>
            <td class="descricao">${recado.descricao}</td>
            <td class="detalhamento">${recado.detalhe}</td>
            <td class="tableActions"><input type="button" class="apagaRecado" value="Apagar" onclick="apagarRecado(${recado.id})">
            <input type="button" class="editaRecado" value="Editar" onclick="criarEdicao(${recado.id}),
            document.getElementById('id01').style.display='block'"></td>
        </tr>`;
  }
};

const apagarRecado = (id: number) => {
  const recados = recuperarLocalStorage();

  const indiceRecado = recados.findIndex((recado) => recado.id === id);

  if (indiceRecado < 0) return;

  recados.splice(indiceRecado, 1);

  atualizarLocalStorage(recados);

  alert("Recado removido com Sucesso");

  preencherTabela();
};

const definirID = (): number => {
  let max = 0;

  const recados = recuperarLocalStorage();

  recados.forEach((recado) => {
    if (recado.id > max) {
      max = recado.id;
    }
  });
  return max;
};

const criarEdicao = (id: number) => {
  const recados = recuperarLocalStorage();

  const indiceRecado = recados.findIndex((recado) => recado.id === id);

  if (indiceRecado < 0) return;

  const popup = document.getElementById("id01") as HTMLElement;

  window.onclick = (cliqueFora) => {
    if (cliqueFora.target === popup) {
      popup.style.display = "none";
    }
  };

  let newDesc = recados[indiceRecado];

  modal.newDesc.value = newDesc.descricao;

  modal.newDetail.value = newDesc.detalhe;

  localStorage.setItem("recadoEditado", JSON.stringify(indiceRecado));
};

const recebeEdicao = (id: number) => {
  const recados = recuperarLocalStorage();
  const indiceRecado = JSON.parse(localStorage.getItem("recadoEditado") || "") as number;

  if (indiceRecado < 0) return;

  const novoRecado = [
    {
      userId: checkCurrentUser(),
      id: indiceRecado + 1,
      descricao: modal.newDesc.value,
      detalhe: modal.newDetail.value,
    },
  ];

  for (let iRecados = 0, iEditado = recados.length; iRecados < iEditado; iRecados++) {
    for (let i = 0, index = novoRecado.length; i < index; i++) {
      if (recados[iRecados].id === novoRecado[i].id) {
        recados.splice(iRecados, 1, novoRecado[i]);
      }
    }
  }
  const popup = document.getElementById("id01") as HTMLElement;
  popup.style.display = "none";
  atualizarLocalStorage(recados);
  preencherTabela();
  localStorage.removeItem("recadoEditado");
};
const userLogout = () => {
  // const currentUser = sessionStorage.getItem("currentUser");
  // localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  location.href = "../src/index.html";
  // const users: User[] = JSON.parse(localStorage.getItem("users") || "[]") as Array<User>;
  // if (currentUser === null) {
  //   return;
  // }
  // const currentUser = JSON.parse(loggedUser);
  // const id = currentUser.id;
  // const username = currentUser.username;
  // const password = currentUser.password;
  // const remainLogged = currentUser.remainLogged;

  // if (!currentUser[0].remainLogged) {
  //   const indexUser = users.findIndex((index) => index.id === currentUser[0].id);
  //   users.splice(indexUser, 1);
  // }
  // currentUser.push({
  //   id,
  //   username,
  //   password,
  //   remainLogged,
  // });
};

const checkCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");

  // const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<User>;
  // // const user = currentUser.id
  // const userId: number = currentUser[0].id;
  // console.log(userId);

  // // esperar o Id do usuário para
  // const indexUser = users.findIndex((index) => index.id === users[userId].id);

  return currentUser;
};
form?.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);
