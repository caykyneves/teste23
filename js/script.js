// js/script.js

// Array de exemplo com dados dos voos
// Em um projeto real, esses dados viriam de uma API ou backend.
const voosDisponiveis = [
    {
        id: 1,
        companhia: "Latam Airlines",
        logo: "assets/img/logo-latam.png", // Certifique-se de ter essa imagem
        horaPartida: "10:00",
        horaChegada: "13:30",
        duracao: "3h 30m",
        paradas: "Direto",
        origem: "São Paulo (GRU)",
        destino: "Rio de Janeiro (SDU)",
        preco: 450,
        numParadas: 0
    },
    {
        id: 2,
        companhia: "GOL Linhas Aéreas",
        logo: "assets/img/logo-gol.png", // Certifique-se de ter essa imagem
        horaPartida: "11:15",
        horaChegada: "15:00",
        duracao: "3h 45m",
        paradas: "1 Parada",
        origem: "São Paulo (GRU)",
        destino: "Rio de Janeiro (SDU)",
        preco: 380,
        numParadas: 1
    },
    {
        id: 3,
        companhia: "Azul Linhas Aéreas",
        logo: "assets/img/logo-azul.png", // Certifique-se de ter essa imagem
        horaPartida: "09:30",
        horaChegada: "12:45",
        duracao: "3h 15m",
        paradas: "Direto",
        origem: "São Paulo (GRU)",
        destino: "Rio de Janeiro (SDU)",
        preco: 510,
        numParadas: 0
    },
    {
        id: 4,
        companhia: "Latam Airlines",
        logo: "assets/img/logo-latam.png",
        horaPartida: "14:00",
        horaChegada: "18:00",
        duracao: "4h 00m",
        paradas: "1 Parada",
        origem: "Rio de Janeiro (SDU)",
        destino: "São Paulo (GRU)",
        preco: 1200, // Preço mais alto para teste
        numParadas: 1
    },
    {
        id: 5,
        companhia: "GOL Linhas Aéreas",
        logo: "assets/img/logo-gol.png",
        horaPartida: "16:00",
        horaChegada: "20:00",
        duracao: "4h 00m",
        paradas: "2 Paradas",
        origem: "São Paulo (GRU)",
        destino: "Brasília (BSB)",
        preco: 2500, // Preço mais alto para teste
        numParadas: 2
    },
    {
        id: 6,
        companhia: "Azul Linhas Aéreas",
        logo: "assets/img/logo-azul.png",
        horaPartida: "07:00",
        horaChegada: "08:30",
        duracao: "1h 30m",
        paradas: "Direto",
        origem: "Belo Horizonte (CNF)",
        destino: "Rio de Janeiro (SDU)",
        preco: 320,
        numParadas: 0
    },
    {
        id: 7,
        companhia: "TAP Air Portugal", // Adicionado para teste de preço alto
        logo: "assets/img/logo-tap.png", // Criar esta imagem ou usar uma genérica
        horaPartida: "22:00",
        horaChegada: "10:00 (+1)",
        duracao: "12h 00m",
        paradas: "1 Parada",
        origem: "São Paulo (GRU)",
        destino: "Lisboa (LIS)",
        preco: 4800,
        numParadas: 1
    },
];

// Lista de exemplo de cidades/aeroportos para autocomplete
const aeroportos = [
    { nome: "Rio de Janeiro (GIG)", cidade: "Rio de Janeiro", sigla: "GIG" },
    { nome: "Rio de Janeiro (SDU)", cidade: "Rio de Janeiro", sigla: "SDU" },
    { nome: "São Paulo (GRU)", cidade: "São Paulo", sigla: "GRU" },
    { nome: "São Paulo (CGH)", cidade: "São Paulo", sigla: "CGH" },
    { nome: "Brasília (BSB)", cidade: "Brasília", sigla: "BSB" },
    { nome: "Salvador (SSA)", cidade: "Salvador", sigla: "SSA" },
    { nome: "Fortaleza (FOR)", cidade: "Fortaleza", sigla: "FOR" },
    { nome: "Belo Horizonte (CNF)", cidade: "Belo Horizonte", sigla: "CNF" },
    { nome: "Recife (REC)", cidade: "Recife", sigla: "REC" },
    { nome: "Porto Alegre (POA)", cidade: "Porto Alegre", sigla: "POA" },
    { nome: "Manaus (MAO)", cidade: "Manaus", sigla: "MAO" },
    { nome: "Curitiba (CWB)", cidade: "Curitiba", sigla: "CWB" },
    { nome: "Lisboa (LIS)", cidade: "Lisboa", sigla: "LIS" }, // Adicionado para teste
    // Adicione mais cidades/aeroportos conforme necessário
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para a página inicial (index.html) ---
    const formPesquisa = document.getElementById('form-pesquisa');
    const inputOrigem = document.getElementById('origem');
    const inputDestino = document.getElementById('destino');
    const tipoViagemSelect = document.getElementById('tipo-viagem');
    const divDataVolta = document.getElementById('div-data-volta');
    const inputDataVolta = document.getElementById('data-volta');
    const mensagemErroContainer = document.getElementById('mensagem-erro-formulario'); // Referência ao container do alerta
    const mensagemErroParagrafo = mensagemErroContainer ? mensagemErroContainer.querySelector('p') : null; // Referência ao parágrafo dentro do alerta


    if (formPesquisa) {
        // Setup do autocomplete para Origem e Destino
        setupAutocomplete(inputOrigem, 'origem-suggestions');
        setupAutocomplete(inputDestino, 'destino-suggestions');

        // Função para controlar a visibilidade e o atributo 'required' da Data de Volta
        function toggleDataVoltaVisibility() {
            if (tipoViagemSelect.value === 'one-way') {
                divDataVolta.style.display = 'none';
                inputDataVolta.removeAttribute('required'); // Remove o atributo required
            } else {
                divDataVolta.style.display = 'block'; // ou 'grid', 'flex' dependendo do seu CSS original
                inputDataVolta.setAttribute('required', 'true'); // Adiciona o atributo required
            }
        }

        // Event Listener para o campo Tipo de Viagem
        tipoViagemSelect.addEventListener('change', toggleDataVoltaVisibility);

        // Chamar a função uma vez ao carregar a página para definir o estado inicial
        toggleDataVoltaVisibility();


        formPesquisa.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Validação do formulário
            if (!formPesquisa.checkValidity()) {
                if (mensagemErroParagrafo) { // Verifica se o parágrafo existe
                    mensagemErroParagrafo.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                    mensagemErroContainer.classList.remove('hidden'); // Mostra o alerta
                }
                // Opcional: rolar para o primeiro campo inválido
                const primeiroInvalido = formPesquisa.querySelector(':invalid');
                if (primeiroInvalido) {
                    primeiroInvalido.focus();
                    primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return; // Impede a continuação do envio do formulário
            } else {
                if (mensagemErroContainer) { // Verifica se o container existe
                    mensagemErroContainer.classList.add('hidden'); // Esconde o alerta
                }
            }

            // Se a validação passou, captura os valores e redireciona
            const origem = inputOrigem.value;
            const destino = inputDestino.value;
            const dataIda = document.getElementById('data-ida').value;
            let dataVolta = ''; // Inicializa como vazio
            if (tipoViagemSelect.value !== 'one-way') { // Só captura se não for "Só Ida"
                dataVolta = document.getElementById('data-volta').value;
            }
            const tipoViagem = tipoViagemSelect.value;

            // Exemplo de como passar os dados para a próxima página via localStorage
            localStorage.setItem('dadosBusca', JSON.stringify({
                origem,
                destino,
                dataIda,
                dataVolta,
                tipoViagem
            }));

            // Redireciona para a página de resultados
            window.location.href = 'resultados.html';
        });
    }

    // Função genérica de setup para autocomplete
    function setupAutocomplete(inputElement, suggestionsUniqueId) {
        let suggestionsContainer = document.getElementById(suggestionsUniqueId);
        // Cria o container de sugestões se ele não existir
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement('div');
            suggestionsContainer.id = suggestionsUniqueId;
            // Posição absoluta para sobrepor outros elementos
            suggestionsContainer.className = 'absolute z-30 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1 w-full';
            inputElement.parentNode.insertBefore(suggestionsContainer, inputElement.nextSibling);
        }

        inputElement.addEventListener('input', () => {
            const searchTerm = inputElement.value.toLowerCase();
            suggestionsContainer.innerHTML = ''; // Limpa sugestões anteriores

            if (searchTerm.length < 2) { // Começa a sugerir após 2 caracteres
                suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredAeroportos = aeroportos.filter(aeroporto =>
                aeroporto.nome.toLowerCase().includes(searchTerm) ||
                aeroporto.cidade.toLowerCase().includes(searchTerm) ||
                aeroporto.sigla.toLowerCase().includes(searchTerm)
            );

            if (filteredAeroportos.length > 0) {
                suggestionsContainer.style.display = 'block';
                filteredAeroportos.forEach(aeroporto => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'p-2 cursor-pointer hover:bg-blue-100 text-gray-800';
                    suggestionItem.textContent = `${aeroporto.nome} - ${aeroporto.cidade} (${aeroporto.sigla})`;
                    suggestionItem.addEventListener('click', () => {
                        inputElement.value = aeroporto.nome;
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        // Esconder sugestões quando o input perde o foco
        inputElement.addEventListener('blur', () => {
            // Pequeno atraso para permitir que o clique na sugestão seja processado
            setTimeout(() => {
                suggestionsContainer.style.display = 'none';
            }, 100);
        });
    }


    // --- Lógica para a página de resultados (resultados.html) ---
    const listaPassagens = document.getElementById('lista-passagens');
    const filtroPrecoInput = document.getElementById('filtro-preco');
    const valorPrecoSpan = document.getElementById('valor-preco');
    const filtroCompanhiaSelect = document.getElementById('filtro-companhia');
    const filtroParadasSelect = document.getElementById('filtro-paradas');
    const aplicarFiltrosBtn = document.getElementById('aplicar-filtros-btn');
    const limparFiltrosBtn = document.getElementById('limpar-filtros-btn');


    if (listaPassagens) { // Só executa se estiver na página de resultados
        // Função para renderizar os voos
        function renderizarVoos(voosParaExibir) {
            listaPassagens.innerHTML = ''; // Limpa os voos existentes
            if (voosParaExibir.length === 0) {
                listaPassagens.innerHTML = '<p class="text-center text-gray-600 text-lg py-8">Nenhum voo encontrado com os filtros selecionados.</p>';
                return;
            }

            voosParaExibir.forEach(voo => {
                const vooCard = `
                    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                        <div class="flex-grow">
                            <div class="flex items-center mb-2">
                                <img src="${voo.logo}" alt="Logo ${voo.companhia}" class="h-8 w-auto mr-3">
                                <span class="text-lg font-semibold">${voo.companhia}</span>
                            </div>
                            <div class="flex items-center text-gray-600 text-sm mb-1">
                                <span class="font-medium">${voo.horaPartida} - ${voo.horaChegada}</span> &bull; Duração: ${voo.duracao} &bull; ${voo.paradas}
                            </div>
                            <p class="text-gray-700">${voo.origem} → ${voo.destino}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-3xl font-bold text-green-600">R$ ${voo.preco}</span>
                            <button class="block w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Selecionar</button>
                        </div>
                    </div>
                `;
                listaPassagens.insertAdjacentHTML('beforeend', vooCard);
            });
        }

        // Função para aplicar os filtros
        function aplicarFiltros() {
            const precoMaximo = parseInt(filtroPrecoInput.value);
            const companhiaSelecionada = filtroCompanhiaSelect.value;
            const paradasSelecionadas = filtroParadasSelect.value;

            let voosFiltrados = voosDisponiveis.filter(voo => {
                // Filtro por preço
                if (voo.preco > precoMaximo) {
                    return false;
                }
                // Filtro por companhia aérea
                if (companhiaSelecionada !== 'Todas' && voo.companhia !== companhiaSelecionada) {
                    return false;
                }
                // Filtro por paradas
                // Se for "Qualquer", não filtra por paradas
                if (paradasSelecionadas === 'Direto' && voo.numParadas !== 0) {
                    return false;
                }
                if (paradasSelecionadas === '1 Parada' && voo.numParadas !== 1) {
                    return false;
                }
                // Ajustado para 2 ou mais paradas
                if (paradasSelecionadas === '2+ Paradas' && voo.numParadas < 2) {
                    return false;
                }
                // Se chegou até aqui, o voo passa por todos os filtros
                return true;
            });

            renderizarVoos(voosFiltrados);
        }

        // Event Listeners para os filtros
        if (filtroPrecoInput && valorPrecoSpan) {
            filtroPrecoInput.addEventListener('input', () => {
                valorPrecoSpan.textContent = `R$ ${filtroPrecoInput.value}`;
            });
        }

        if (aplicarFiltrosBtn) {
            aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
        }
        if (limparFiltrosBtn) {
            limparFiltrosBtn.addEventListener('click', () => {
                // Reseta os valores dos filtros para os padrões
                if (filtroPrecoInput && valorPrecoSpan) {
                    filtroPrecoInput.value = filtroPrecoInput.max; // Volta ao valor máximo
                    valorPrecoSpan.textContent = `R$ ${filtroPrecoInput.max}`;
                }
                if (filtroCompanhiaSelect) {
                    filtroCompanhiaSelect.value = 'Todas';
                }
                if (filtroParadasSelect) {
                    filtroParadasSelect.value = 'Qualquer';
                }
                renderizarVoos(voosDisponiveis); // Mostra todos os voos novamente
            });
        }

        // Renderiza os voos iniciais ao carregar a página
        renderizarVoos(voosDisponiveis);
        // Garante que o valor inicial do slider seja exibido corretamente ao carregar a página
        if (filtroPrecoInput && valorPrecoSpan) {
            valorPrecoSpan.textContent = `R$ ${filtroPrecoInput.value}`;
        }
    }
});