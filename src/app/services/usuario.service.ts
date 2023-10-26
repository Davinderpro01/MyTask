import { Injectable } from '@angular/core';

interface Role {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  perfilData: any = null;

  setPerfilData(data: any) {
    this.perfilData = data;
  }
}
