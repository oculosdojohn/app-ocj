import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MotivationalMessagesService {
  private motivationalMessages: { quote: string, author: string }[] = [
    { quote: 'O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.', author: 'Winston Churchill' },
    { quote: 'Acredite em si mesmo e em tudo o que você é. Saiba que há algo dentro de você que é maior que qualquer obstáculo.', author: 'Christian D. Larson' },
    { quote: 'Você não pode mudar o vento, mas pode ajustar as velas para alcançar seu destino.', author: 'Aristóteles' },
    { quote: 'A única maneira de fazer um grande trabalho é amar o que você faz.', author: 'Steve Jobs' },
    { quote: 'Tudo o que você sempre quis está do outro lado do medo.', author: 'George Addair' },
    { quote: 'Você é mais forte do que pensa, mais corajoso do que parece e mais inteligente do que acredita.', author: 'A. A. Milne' },
    { quote: 'A disciplina é a ponte entre objetivos e realizações.', author: 'Jim Rohn' },
    { quote: 'É sempre impossível até que seja feito.', author: 'Nelson Mandela' },
    { quote: 'A qualidade da sua vida depende da qualidade dos seus pensamentos.', author: 'Marco Aurélio' },
    { quote: 'Coragem é saber que pode não ganhar, e mesmo assim tentar quando você sabe que pode perder.', author: 'Barack Obama' },
    { quote: 'Você perde 100% dos tiros que não dá.', author: 'Michael Jordan' },
    { quote: 'O único limite para o nosso sucesso de amanhã são as nossas dúvidas de hoje.', author: 'Franklin D. Roosevelt' },
    { quote: 'Transforme suas feridas em sabedoria.', author: 'Oprah Winfrey' },
    { quote: 'A excelência não é um ato, mas um hábito.', author: 'Aristóteles' },
    { quote: 'A vida é o que fazemos dela, sempre foi, sempre será.', author: 'Eleanor Roosevelt' },
    { quote: 'Seja a mudança que você deseja ver no mundo.', author: 'Mahatma Gandhi' },
    { quote: 'O maior prazer na vida é fazer o que as pessoas dizem que você não pode fazer.', author: 'Walter Bagehot' },
    { quote: 'As pessoas costumam dizer que a motivação não dura. Bem, nem o banho — e é por isso que o recomendamos diariamente.', author: 'Zig Ziglar' },
    { quote: 'Faça o que você pode, com o que você tem, onde você está.', author: 'Theodore Roosevelt' },
    { quote: 'Não é o que acontece com você, mas como você reage a isso que importa.', author: 'Epicteto' },
    { quote: 'Fique longe de pessoas que tentam diminuir suas ambições. Pessoas pequenas sempre fazem isso, mas as verdadeiramente grandes fazem você sentir que também pode se tornar grande.', author: 'Mark Twain' },
    { quote: 'A diferença entre uma pessoa de sucesso e outras não é a falta de força ou conhecimento, mas a falta de vontade.', author: 'Vince Lombardi' },
    { quote: 'Grandes coisas nunca vêm de zonas de conforto.', author: 'Anônimo' },
    { quote: 'O segredo para seguir em frente é começar.', author: 'Mark Twain' },
    { quote: 'Não deixe que o medo de perder seja maior que a emoção de vencer.', author: 'Robert Kiyosaki' },
    { quote: 'Acredite que você pode e você já está no meio do caminho.', author: 'Theodore Roosevelt' },
    { quote: 'A melhor maneira de prever o futuro é criá-lo.', author: 'Peter Drucker' },
    { quote: 'Sua única limitação é você mesmo.', author: 'Anônimo' },
    { quote: 'Os desafios são o que tornam a vida interessante, e superá-los é o que dá significado à vida.', author: 'Joshua J. Marine' },
    { quote: 'Persistência é o caminho para o sucesso.', author: 'Charlie Chaplin' },
  ];

  constructor() {}

  getRandomMessage(): { quote: string, author: string } {
    const randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
    return this.motivationalMessages[randomIndex];
  }

  getAllMessages(): { quote: string, author: string }[] {
    return this.motivationalMessages;
  }
}