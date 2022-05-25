const form = document.querySelector("#seusRecados") as HTMLFormElement;

const corpoTabela = document.querySelector("#corpoTabela") as HTMLTableElement;

const modal = document.querySelector("#editarRecado") as HTMLFormElement;

interface Recado {
  user: string;
  id: number;
  descricao: string;
  detalhe: string;
}
// interface Login {
//   id: number;
//   username: string;
//   password: string;
//   messages?: [];
// }

const recuperarLocalStorage = (): Array<Recado> => {
  const currentUser = checkCurrentUser();

  const user = JSON.parse(localStorage.getItem(currentUser) || "[]") as Array<Recado>;

  return user;
};

const atualizarLocalStorage = (user: Array<Recado>) => {
  const userMessage: string = checkCurrentUser();

  localStorage.setItem(userMessage, JSON.stringify(user));
};

const salvarRecado = (event: Event) => {
  event.preventDefault();

  const user = checkCurrentUser();

  const descricao: string = form?.descRecado.value;

  const detalhe: string = form?.detalheRecado.value;

  const userMessage = recuperarLocalStorage();

  userMessage.push({
    user,
    id: definirID() + 1,
    descricao,
    detalhe,
  });

  atualizarLocalStorage(userMessage);

  alert("Recado adicionado com sucesso!");

  preencherTabela();

  form.reset();
};

const preencherTabela = () => {
  const userMessage = recuperarLocalStorage();

  corpoTabela.innerHTML = "";

  for (const messages of userMessage) {
    corpoTabela.innerHTML += `
        <tr>
            <td class=tableId>${messages.id}</td>
            <td class="descricao">${messages.descricao}</td>
            <td class="detalhamento">${messages.detalhe}</td>
            <td class="tableActions"><input type="button" class="apagaRecado" value="Apagar" onclick="apagarRecado(${messages.id})">
            <input type="button" class="editaRecado" value="Editar" onclick="criarEdicao(${messages.id}),
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
  const currentUser = recuperarLocalStorage();

  const user = checkCurrentUser();

  const indiceRecado = JSON.parse(localStorage.getItem("recadoEditado") || "") as number;

  if (indiceRecado < 0) return;

  const novoRecado = [
    {
      user,
      id: indiceRecado + 1,
      descricao: modal.newDesc.value,
      detalhe: modal.newDetail.value,
    },
  ];

  for (let iRecados = 0, iEditado = currentUser.length; iRecados < iEditado; iRecados++) {
    for (let i = 0, index = novoRecado.length; i < index; i++) {
      if (currentUser[iRecados].id === novoRecado[i].id) {
        currentUser.splice(iRecados, 1, novoRecado[i]);
      }
    }
  }

  const popup = document.getElementById("id01") as HTMLElement;

  popup.style.display = "none";

  atualizarLocalStorage(currentUser);

  preencherTabela();

  localStorage.removeItem("recadoEditado");
};

const userLogout = () => {
  localStorage.removeItem("currentUser");

  sessionStorage.removeItem("currentUser");

  location.href = "../src/index.html";
};

const checkCurrentUser = () => {
  const currentUser: string = JSON.parse(localStorage.getItem("currentUser") || "[]");

  return currentUser;
};

form?.addEventListener("submit", salvarRecado);

document.addEventListener("DOMContentLoaded", preencherTabela);
