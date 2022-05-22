//criar usuário

//fazer login

// para manter placeholder pequeno quando inserir nome e sair do campo
const inputs: any = document.getElementsByClassName("inputForm");
for (let input of inputs) {
  input.addEventListener("blur", () => {
    if (input.value.trim() != "") {
      input.classList.add("has-val");
      console.log(inputs);
      console.log(input);
    } else {
      input.classList.remove("has-val");
    }
  });
}
