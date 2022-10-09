const adicionarTarefa = document.querySelector(".adicionar-tarefa");
const btnAdicionar = document.querySelector(".btn-adicionar");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
    const li = document.createElement('li')
    return li;
}

adicionarTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if(!adicionarTarefa.value) return;
        criaTarefa(adicionarTarefa.value);
    }
})

function limpaInput() {
    adicionarTarefa.value = '';
    adicionarTarefa.focus();
}

function criaBotaoApagar (li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto;
    tarefas.appendChild(li);
    criaBotaoApagar (li)
    limpaInput();
    salvarTarefas();
}

btnAdicionar.addEventListener('click', function () {
    if(!adicionarTarefa.value) return;
    criaTarefa(adicionarTarefa.value);
    
})

document.addEventListener('click', function (e) {
    const el = e.target;
    
    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
    
}

function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa) 
    };
}
adicionarTarefasSalvas()