import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
    
    // Este método substitui o 'criptografarSenha'
    async hash(senha: string): Promise<string> {
        let saltos: number = 10;
        return await bcrypt.hash(senha, saltos);
    }

    // Este método substitui o 'compararSenhas' e resolve o erro do AuthService
    async compare(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
    }
}