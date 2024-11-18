# GS-EdgeComputing

- Pedro Henrique Martins Alves dos Santos RM: 558107

- Victor de Almeida Gonçalves RM: 558799

- Felipe Cerboncini Cordeiro RM: 554909

# Descrição:

Este projeto utiliza um ESP32 e três potenciômetros para simular a geração de energia em placas de vibração. Os potenciômetros representam os valores de força, pressão e tensão aplicados ao sistema. Com base nesses valores, o ESP32 calcula a energia gerada e envia os dados para o ThingSpeak a cada 15 segundos.

# Funcionalidades:

- Simulação de força, pressão e tensão através de potenciômetros;

- Cálculo da energia gerada em joules utilizando os valores simulados;

- Envio dos dados calculados para o ThingSpeak via conexão Wi-Fi.

# Itens Utilizados:

- ESP32;

- 3 potenciômetros;

- Jumpers;

- Protoboard.

# Biblioteca:

- WiFi;

- HTTPClient.

# Montagem:

- ESP32: Conecte o ESP32 à protoboard.

- Potenciômetros (Força, Pressão e Tensão):

- Conecte uma extremidade de cada potenciômetro ao 3.3V do ESP32;

- Conecte a outra extremidade ao GND do ESP32;

- Conecte os pinos centrais dos potenciômetros aos pinos analógicos A0, A1 e A2 do ESP32, respectivamente.

# Instruções de Uso:

- Monte o circuito conforme descrito na seção Montagem;

- Configure o código fornecido com as credenciais da rede Wi-Fi e a chave de API do ThingSpeak;

- Faça o upload do código para o ESP32 utilizando a IDE do Arduino;

- Ajuste os potenciômetros para simular os valores de força, pressão e tensão;

- O ESP32 calculará a energia gerada com base nos valores e enviará os resultados para o ThingSpeak a cada 15 segundos.
