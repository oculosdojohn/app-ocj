import { Component, OnInit } from '@angular/core';
import { ServicesApisService } from 'src/app/services/services-apis.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

   // Dados do clima
   weatherDescription: string = 'Carregando...';
   temperature: string = '';
   iconUrl: string = '';
 
  // Lista de frases motivacionais
  motivationalMessages: string[] = [
    '“O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.” – Winston Churchill',
    '“Acredite em si mesmo e em tudo o que você é. Saiba que há algo dentro de você que é maior que qualquer obstáculo.” – Christian D. Larson',
    '“Você não pode mudar o vento, mas pode ajustar as velas para alcançar seu destino.” – Aristóteles',
    '“A única maneira de fazer um grande trabalho é amar o que você faz.” – Steve Jobs',
    '“Tudo o que você sempre quis está do outro lado do medo.” – George Addair',
    '“Você é mais forte do que pensa, mais corajoso do que parece e mais inteligente do que acredita.” – A. A. Milne',
    '“A disciplina é a ponte entre objetivos e realizações.” – Jim Rohn',
    '“É sempre impossível até que seja feito.” - Nelson Mandela',
    '“A qualidade da sua vida depende da qualidade dos seus pensamentos.” – Marco Aurélio',
    '“Coragem é saber que pode não ganhar, e mesmo assim tentar quando você sabe que pode perder.” – Barack Obama',
    '“Você perde 100% dos tiros que não dá.” - Michael Jordan',
    '“O único limite para o nosso sucesso de amanhã são as nossas dúvidas de hoje.” – Franklin D. Roosevelt',
    '“Transforme suas feridas em sabedoria.” – Oprah Winfrey',
    '“A excelência não é um ato, mas um hábito.” – Aristóteles',
    '“A vida é o que fazemos dela, sempre foi, sempre será.” – Eleanor Roosevelt',
    '“Seja a mudança que você deseja ver no mundo.” – Mahatma Gandhi',
    '“O maior prazer na vida é fazer o que as pessoas dizem que você não pode fazer.” – Walter Bagehot',
    '“As pessoas costumam dizer que a motivação não dura. Bem, nem o banho — e é por isso que o recomendamos diariamente.” – Zig Ziglar',
    '“Faça o que você pode, com o que você tem, onde você está.” – Theodore Roosevelt',
    '“Não é o que acontece com você, mas como você reage a isso que importa.” – Epicteto',
    '“Fique longe de pessoas que tentam diminuir suas ambições. Pessoas pequenas sempre fazem isso, mas as verdadeiramente grandes fazem você sentir que também pode se tornar grande.” – Mark Twain',
    '“A diferença entre uma pessoa de sucesso e outras não é a falta de força ou conhecimento, mas a falta de vontade.” – Vince Lombardi',
    '“Grandes coisas nunca vêm de zonas de conforto.” – Anônimo',
    '“O segredo para seguir em frente é começar.” – Mark Twain',
    '“Não deixe que o medo de perder seja maior que a emoção de vencer.” – Robert Kiyosaki',
    '“Acredite que você pode e você já está no meio do caminho.” – Theodore Roosevelt',
    '“A melhor maneira de prever o futuro é criá-lo.” – Peter Drucker',
    '“Sua única limitação é você mesmo.” – Anônimo',
    '“Os desafios são o que tornam a vida interessante, e superá-los é o que dá significado à vida.” – Joshua J. Marine',
    '“Persistência é o caminho para o sucesso.” – Charlie Chaplin',
  ];

  // Mensagem atual exibida
  motivationalMessage: string = this.motivationalMessages[0];

  constructor(private apiService: ServicesApisService) {}

  ngOnInit(): void {
    this.getWeatherForRussas();
  }

   /**
   * Obtém o clima de Russas/CE.
   */
   getWeatherForRussas(): void {
    this.apiService.fetchWeatherForRussas().subscribe(
      (response) => {
        this.weatherDescription = response.weather[0].description;
        this.temperature = response.main.temp;
        this.iconUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}.png`;
      },
      (error) => {
        console.error(error);
        this.weatherDescription = 'Não foi possível carregar o clima.';
      }
    );
  }


  // Método para atualizar a mensagem motivacional
  updateMotivationalMessage(): void {
    const randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
    this.motivationalMessage = this.motivationalMessages[randomIndex];
  }
}
