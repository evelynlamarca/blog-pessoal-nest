import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(usuario: string, senha: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(usuario);
    
    if (buscaUsuario && (await this.bcrypt.compare(senha, buscaUsuario.senha))) {
      const { senha, ...result } = buscaUsuario;
      return result;
    }
    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { username: usuarioLogin.usuario, sub: usuarioLogin.id };
    
    return {
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}