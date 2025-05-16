import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Permissao } from 'src/app/login/permissao';
import { Usuario } from 'src/app/login/usuario';
import { AuthService } from 'src/app/services/configs/auth.service';
import { MotivationalMessagesService } from 'src/app/services/motivational-messages.service';
import { ServicesApisService } from 'src/app/services/services-apis.service';

@Component({
  selector: 'app-painel-rh',
  templateUrl: './painel-rh.component.html',
  styleUrls: ['./painel-rh.component.css']
})
export class PainelRhComponent implements OnInit {

   usuario: Usuario | null = null;
     weatherDescription: string = 'Carregando...';
     temperature: number = 0;
     iconUrl: string = '';
     windSpeed: number = 0;
     weatherData: any = {};
     motivationalMessage: { quote: string, author: string } = { quote: '', author: '' };
   
     public Permissao = Permissao; 
     cargoUsuario!: Permissao;     
   
     constructor(
       private apiService: ServicesApisService,
       private motivationalMessagesService: MotivationalMessagesService,
       private cdr: ChangeDetectorRef,
       private usuarioService: AuthService   // já existia, só renomeei pra ficar claro
     ) {}
   
     ngOnInit(): void {
       this.getWeatherForCurrentLocation();
       this.motivationalMessage = this.motivationalMessagesService.getRandomMessage();
       this.usuarioService.obterPerfilUsuario().subscribe(
         usuario => {
           this.usuario = usuario;
           this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
           console.log('Perfil do usuário:', usuario);
         },
         error => console.error('Erro ao obter perfil do usuário:', error)
       );
     }
   
     getWeatherForRussas(): void {
       this.apiService.fetchWeatherForRussas().subscribe(data => {
         this.weatherData = data;
         console.log(this.weatherData);
         this.updateWeatherInfo();
       });
     }
   
     getWeatherForCurrentLocation(): void {
       this.apiService.fetchWeatherForCurrentLocation().subscribe(data => {
         this.weatherData = data;
         console.log(this.weatherData);
         this.updateWeatherInfo();
       }, error => {
         console.error('Error getting location', error);
         this.getWeatherForRussas();
       });
     }
   
     getWeatherForLocation(lat: number, lon: number): void {
       this.apiService.fetchWeather(lat, lon).subscribe(data => {
         this.weatherData = data;
         console.log(this.weatherData);
         this.updateWeatherInfo();
       });
     }
   
     updateWeatherInfo(): void {
       if (this.weatherData) {
         this.weatherDescription = this.weatherData.weather[0].description;
         this.temperature = Math.round(this.weatherData.main.temp);
         this.iconUrl = `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
         this.windSpeed = this.weatherData.wind.speed;
         this.cdr.detectChanges();
       }
     }

}
