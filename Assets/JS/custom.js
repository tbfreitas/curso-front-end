
makeRequistion = async () => {

  const response = await fetch('https://tarcisio-dev.com.br/servico-curso/cursos');
  const respParsed = await response.json();

  for (i = 0; i < respParsed.length; i++) {

    var node = document.createElement("p");
    var textnode = document.createTextNode(respParsed[i].nome);
    node.appendChild(textnode);
    const obj = { id: respParsed[i].id };

    node.addEventListener("click", async function () {

      const response = await fetch('https://tarcisio-dev.com.br/servico-curso/cursos/' + obj.id);
      const respParsed = await response.json();

      const myNode = document.getElementById("professoresLista");
      myNode.innerHTML = '<h2>Curso ' + obj.id + '</h>';

      const curso = respParsed[0];

      Object.keys(curso).forEach(value => {
        var nodeProf = document.createElement("p");
        var textnode = document.createTextNode(curso[value]);

        nodeProf.appendChild(textnode);
        document.getElementById("professoresLista").appendChild(nodeProf);

      })


    }.bind(obj), false);

    document.getElementById("cursoLista").appendChild(node);

  }

}





