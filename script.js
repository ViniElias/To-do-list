// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seletores dos elementos do formulário
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('name');
    const taskCategoryInput = document.getElementById('category');
    const taskDateInput = document.getElementById('date');
    const taskList = document.getElementById('task-list');

    // Função de adicionar nova tarefa
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        // Coleta dos valores do formulário
        const name = taskNameInput.value.trim();
        const category = taskCategoryInput.value.trim();
        const priority = document.querySelector('input[name="priority"]:checked')?.value;
        const dueDate = taskDateInput.value;

        // Validação dos campos
        if (!name || !category || !priority || !dueDate) {
            alert('Por favor, preencha todos os campos para adicionar a tarefa.');
            return;
        }

        // Cria o elemento da tarefa e o adiciona na lista
        const taskElement = createTaskElement(name, category, priority, dueDate);
        taskList.appendChild(taskElement);

        // Limpa o formulário após adicionar a tarefa
        taskForm.reset();
    });

    // Função para criar o card da tarefa
    function createTaskElement(name, category, priority, dueDate) {
        const card = document.createElement('li');
        card.className = 'task-card';
        card.dataset.category = category;
        card.dataset.priority = priority;
        card.dataset.dueDate = dueDate;

        // Define a cor de destaque com base na prioridade
        let priorityColorClass = '';
        if (priority === 'Alta') {
            priorityColorClass = 'priority-high';
        } else if (priority === 'Média') {
            priorityColorClass = 'priority-medium';
        } else {
            priorityColorClass = 'priority-low';
        }
        card.classList.add(priorityColorClass);

        // Formata a data para o padrão brasileiro
        const formattedDate = new Date(dueDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR');

        // Estrutura interna do card
        card.innerHTML = `
            <div class="task-info">
                <h3>${name}</h3>
                <p><strong>Categoria:</strong> ${category}</p>
                <p><strong>Prioridade:</strong> ${priority}</p>
                <p><strong>Data Limite:</strong> ${formattedDate}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;

        // Funcionalidades dos botões do card
        const completeButton = card.querySelector('.complete-btn');
        const deleteButton = card.querySelector('.delete-btn');

        // Marcar como concluída
        completeButton.addEventListener('click', () => {
            card.classList.toggle('completed');
        });

        // Excluir tarefa
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(card);
        });

        return card;
    }
});