import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";
import { AuthService } from "../../auth/services/auth.service"; // <--- 1. IMPORTAR O AUTH SERVICE

@Controller("/usuarios")
export class UsuarioController {
    // 2. ADICIONAR O AUTH SERVICE NO CONSTRUTOR
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly authService: AuthService // <--- AGORA O CONTROLLER SABE LOGAR
    ) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<Usuario> {
        return this.usuarioService.findById(id);
    }

    @Post('/logar')
    @HttpCode(HttpStatus.OK)
    async login(@Body() usuarioLogin: any): Promise<any> {
        // 3. MUDAR DE usuarioService PARA authService
        return await this.authService.login(usuarioLogin); 
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async atualizar(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(usuario);
    }
}