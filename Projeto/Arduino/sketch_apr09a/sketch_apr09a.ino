#include "DHT.h"
#define dht_type DHT11

int dht_pin = A0;
DHT dht_1 = DHT(dht_pin, dht_type);

void setup() {
  Serial.begin(9600);// ligaçao de bits entre o microprocessador e o IDE, Propriedade dos loops, Clock
  dht_1.begin();// Iniciando a captura de dados 
}

void loop() {
  float umidade = dht_1.readHumidity();
  float temperatura = dht_1.readTemperature() - 12;
  if(isnan(temperatura) or isnan(umidade)){
    Serial.println("Erro ao ler"); 
  } else {
    Serial.print(umidade);
    Serial.print(";");
    Serial.println(temperatura);
  }
  delay(2000);// intervalo 
}
