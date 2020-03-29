const values = {
  0: 'id',
  1: 'Curso',
  2: 'Professor',
  3: 'Local'
};

async function makeRequistion() {

  const response = await fetch('https://tarcisio-dev.com.br/servico-curso/cursos');
  const respParsed = await response.json();

  const cursosValores = document.getElementById('cursoLista')
  cursosValores.innerHTML = '';

  const myNodeTitle = document.createElement("h2");
  myNodeTitle.innerHTML = 'Cursos';
  document.getElementById("cursoLista").appendChild(myNodeTitle);

  for (i = 0; i < respParsed.length; i++) {

    var node = document.createElement("p");
    node.setAttribute('class', 'valueCurso');

    var textnode = document.createTextNode(respParsed[i].nome);
    node.appendChild(textnode);
    const obj = { id: respParsed[i].id };

    node.addEventListener("click", async function () {
      const id = obj.id;
      const response = await fetch('https://tarcisio-dev.com.br/servico-curso/cursos/' + id);
      const respParsed = await response.json();

      const myNode = document.getElementById("professoresLista");

      var nodeAlunoButton = document.createElement("p");
      var textAlunoButton = document.createTextNode("alunos");

      nodeAlunoButton.appendChild(textAlunoButton);

      document.getElementById("professoresLista").appendChild(nodeAlunoButton);

      myNode.innerHTML = '<button type="button" onClick=(bringAlunos(' + id + '))> Alunos</button > <h2>Curso ' + obj.id + '</h>';

      const curso = respParsed[0];

      Object.keys(curso).forEach((value, index) => {
        var nodeProf = document.createElement("p");
        var textnode = document.createTextNode(values[index] + ' : ' + curso[value]);

        nodeProf.appendChild(textnode);
        document.getElementById("professoresLista").appendChild(nodeProf);

      })


    }.bind(obj), false);

    document.getElementById("cursoLista").appendChild(node);

  }

}

function bringAlunos(id) {
  fetch('https://tarcisio-dev.com.br/servico-curso/cursos/' + id + '/alunos-inscritos').then(success => {
    success.json().then(parsed => {
      const result = parsed;

      const alunosLista = document.getElementById('alunosLista')
      alunosLista.innerHTML = '';

      const myNodeTitle = document.createElement("h2");
      myNodeTitle.innerHTML = 'Alunos';
      document.getElementById("alunosLista").appendChild(myNodeTitle);

      for (i = 0; i < result.length; i++) {

        var node = document.createElement("p");
        var textnode = document.createTextNode(result[i].nome);
        node.appendChild(textnode);

        document.getElementById("alunosLista").appendChild(node);
      }

    }).catch(errorParsed => {
      alert(`Erro ${errorParsed}`);
    });
  }).catch(errorRe => {
    alert(`Erro na requisição ${errorRe}`);
  });
}





