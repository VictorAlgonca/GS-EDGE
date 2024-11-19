# Integrantes:

- Victor de Almeida Gonçalves RM: 558799

- Pedro Henrique Martins Alves dos Santos RM: 558107

- Felipe Cerboncini Cordeiro RM: 554909

# Projeto: Placas Piezoelétricas

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

![Sem título](https://github.com/user-attachments/assets/d8d93874-d522-4e92-827f-cfb53a732fd9)

# Link Wokwi:

[https://wokwi.com/projects/414553799604737025]

# Link ThingSpeak:

[https://thingspeak.mathworks.com/channels/2704711]

# Código Fonte: 

```C++
#include <WiFi.h>
#include <HTTPClient.h>

// Credenciais 
const char* ssid = "Wokwi-GUEST"; // Rede Wi-Fi
const char* password = ""; // Senha Wi-Fi
const char* apiKey = "YZK8118H552B627Q"; // API KEY do ThingSpeak
const char* server = "http://api.thingspeak.com"; // Servidor ThingSpeak

// Definir pinos dos potenciômetros
const int pinForca = 34; // Potenciômetro para força
const int pinPressao = 35; // Potenciômetro para pressão
const int pinTensao = 32; // Potenciômetro para tensão

void setup() {
  Serial.begin(115200);

  // Inicializar o Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wifi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Conectado!");
  
  // Definir pinos dos potenciômetros como entrada
  pinMode(pinForca, INPUT);
  pinMode(pinPressao, INPUT);
  pinMode(pinTensao, INPUT);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Ler os valores dos potenciômetros
    int leituraForca = analogRead(pinForca); // Leitura do potenciômetro de força
    int leituraPressao = analogRead(pinPressao); // Leitura do potenciômetro de pressão
    int leituraTensao = analogRead(pinTensao); // Leitura do potenciômetro de tensão

    // Normalizar os valores dos potenciômetros (0-1023 para 0-5V)
    float forca = map(leituraForca, 0, 1023, 0, 5); // Normaliza para tensão de 0-5V
    float pressao = map(leituraPressao, 0, 1023, 0, 5); // Normaliza para tensão de 0-5V
    float tensao = map(leituraTensao, 0, 1023, 0, 5); // Normaliza para tensão de 0-5V

    // Calcular a energia (simplificado)
    // Energia = Força * Deslocamento 
    float energia = forca * (pressao * tensao); // Energia em Joules (simplificado)

    // Exibir os dados no monitor serial
    Serial.print("Força (simulada): ");
    Serial.println(forca);
    Serial.print("Pressão (simulada): ");
    Serial.println(pressao);
    Serial.print("Tensão (simulada): ");
    Serial.println(tensao);
    Serial.print("Energia Gerada (em Joules): ");
    Serial.println(energia);

    // Enviar os dados para o ThingSpeak
    HTTPClient http;
    String url = String(server) + "/update?api_key=" + apiKey + "&field1=" + String(energia);
    http.begin(url);

    // Verificação de envio de dados ao ThingSpeak
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString(); // Resposta da requisição HTTP
      Serial.println("Dados enviados ao ThingSpeak.");
      Serial.print("Código HTTP: ");
      Serial.println(httpCode);
      Serial.println("Resposta: ");
      Serial.print(payload);
    } else {
      Serial.print("Erro ao enviar dados. Código HTTP: ");
      Serial.println(httpCode);
    }

    http.end();
  } else {
    Serial.println("Wifi não conectado. Tente novamente.");
  }

  // Intervalo de 15 segundos entre as leituras
  delay(15000); // Aguarda 15 segundos
}
```

