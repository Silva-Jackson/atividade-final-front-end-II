"use strict";
const form = document.querySelector("#seusRecados");
const corpoTabela = document.querySelector("#corpoTabela");
const modal = document.querySelector("#editarRecado");
const recuperarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem("recados") || "[]");
    return recados;
};
const atualizarLocalStorage = (recados) => {
    localStorage.setItem("recados", JSON.stringify(recados));
};
const salvarRecado = (event) => {
    event.preventDefault();
    const userId = checkCurrentUser();
    const descricao = form === null || form === void 0 ? void 0 : form.descRecado.value;
    const detalhe = form === null || form === void 0 ? void 0 : form.detalheRecado.value;
    const message = `${userId}${descricao}${detalhe}`;
    const recadosUser = JSON.parse("`${recados}_${currentUser}`");
    console.log(recadosUser);
    recadosUser.push({
        userId,
        id: definirID() + 1,
        descricao,
        detalhe,
    });
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
const apagarRecado = (id) => {
    const recados = recuperarLocalStorage();
    const indiceRecado = recados.findIndex((recado) => recado.id === id);
    if (indiceRecado < 0)
        return;
    recados.splice(indiceRecado, 1);
    atualizarLocalStorage(recados);
    alert("Recado removido com Sucesso");
    preencherTabela();
};
const definirID = () => {
    let max = 0;
    const recados = recuperarLocalStorage();
    recados.forEach((recado) => {
        if (recado.id > max) {
            max = recado.id;
        }
    });
    return max;
};
const criarEdicao = (id) => {
    const recados = recuperarLocalStorage();
    const indiceRecado = recados.findIndex((recado) => recado.id === id);
    if (indiceRecado < 0)
        return;
    const popup = document.getElementById("id01");
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
const recebeEdicao = (id) => {
    const recados = recuperarLocalStorage();
    const indiceRecado = JSON.parse(localStorage.getItem("recadoEditado") || "");
    if (indiceRecado < 0)
        return;
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
    const popup = document.getElementById("id01");
    popup.style.display = "none";
    atualizarLocalStorage(recados);
    preencherTabela();
    localStorage.removeItem("recadoEditado");
};
const userLogout = () => {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    location.href = "../src/index.html";
};
const checkCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
    return currentUser;
};
form === null || form === void 0 ? void 0 : form.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);
