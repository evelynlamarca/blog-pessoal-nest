import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { describe, it } from 'node:test';

describe('Testes dos Modulos Usuario e Auth (e2e)', () => {
  let token: string;
  let usuarioId: number;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01- Deve cadastrar um novo usuario', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it('02- Não deve cadastrar um usuario ja existente', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);
  });

  it('03- Deve autenticar um usuario cadastrado', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com.br',
        senha: 'rootroot',
      })
      .expect(200);
    
    token = `Bearer ${resposta.body.token}`;
  });

  it('04- Deve listar todos os usuarios', async () => {
    await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', token)
      .expect(200);
  });

  it('05- Deve atualizar os dados de um usuario que ja existe', async () => {
    await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', token)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(200);
  });

  it('06- Deve procurar um usuario pelo id', async () => {
    await request(app.getHttpServer())
      .get(`/usuarios/${usuarioId}`)
      .set('Authorization', token)
      .expect(200);
  });
});

function beforeAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
function afterAll(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

