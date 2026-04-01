import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'usuario', // Diz ao Nest para ler o campo 'usuario' do Insomnia
      passwordField: 'senha',   // Diz ao Nest para ler o campo 'senha' do Insomnia
    });
  }

  async validate(usuario: string, senha: string): Promise<any> {
    const validaUsuario = await this.authService.validateUser(usuario, senha);
    if (!validaUsuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    return validaUsuario;
  }
}