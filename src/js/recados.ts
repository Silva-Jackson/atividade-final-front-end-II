const form = document.querySelector("#seusRecados") as HTMLFormElement;
const corpoTabela = document.querySelector("#corpoTabela") as HTMLElement;
const modal = document.querySelector("#editarRecado") as HTMLFormElement;

interface Recado {
  id: number;
  descricao: string;
  detalhe: string;
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

  const descricao = form?.descRecado.value;
  const detalhe = form?.detalheRecado.value;

  const recados = recuperarLocalStorage();

  recados.push({
    id: definirID() + 1,
    descricao,
    detalhe,
  });

  atualizarLocalStorage(recados);

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
    if (cliqueFora.target == popup) {
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

form?.addEventListener("submit", salvarRecado);

document.addEventListener("DOMContentLoaded", preencherTabela);
