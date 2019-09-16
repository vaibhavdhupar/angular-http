import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName = this.serverService.getAppName();

  constructor(private serverService: ServerService){

  }

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSave(){
    this.serverService.storeServers(this.servers).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onGet(){
    this.serverService.getServers().subscribe(
      (servers: any[]) => {
        for(const server of servers){
          server.name = "FETCHED_" + server.name;
        } 
        this.servers = servers;
        console.log(servers);
	  },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        //A client-side or network error occurred.
        console.log('An error occurred:', err.error.message);
      } else {
        //Backend returns unsuccessful response codes such as 404, 500 etc.
        console.log('Backend returned status code: ', err.status);
        console.log('Response body:', err.error);
      }
    }
  );
  }


}
