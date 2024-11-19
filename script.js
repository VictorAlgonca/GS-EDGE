// Channel ID e chave de leitura da API do ThingSpeak
const channelID = 2704711; // Substitua pelo seu ID, se necessário
const readAPIKey = 'QQ8V0SR0HGWHZF6M'; // Nova API Key para o projeto

// URL para buscar os dados do canal
const url = `https://api.thingspeak.com/channels/2704711/fields/1.json?results=2`;

// Função para buscar e atualizar os dados de energia
async function updateEnergy() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Acessa o valor mais recente do campo 1
        const latestEntry = data.feeds[0].field1;
        const energyElement = document.getElementById('energy');
        
        // Atualiza o conteúdo da div
        energyElement.textContent = `Energia Gerada: ${latestEntry} J`;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        const energyElement = document.getElementById('energy');
        energyElement.textContent = 'Erro ao carregar dados.';
    }
}

// Atualiza a cada 15 segundos
updateEnergy(); // Primeira chamada imediata
setInterval(updateEnergy, 15000); // Intervalo de 15 segundos

