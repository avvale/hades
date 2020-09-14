import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '@hades/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '@hades/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('refresh-token', () => 
{
    let app: INestApplication;
    let repository: MockRefreshTokenRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IRefreshTokenRepository)
            .useClass(MockRefreshTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/refresh-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Sequi ducimus est nisi molestias totam minima sunt. Magnam nisi illo tempora. Aut mollitia enim amet. Accusamus provident quia quas rerum ut excepturi similique numquam veritatis. Temporibus quia nihil id dolorem.',
                isRevoked: false,
                expiresAt: '2020-09-14 23:57:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Cupiditate adipisci quos nesciunt quasi est iure. Sit assumenda nulla aut. Exercitationem ut beatae ab aut quos quis voluptatem et doloremque. Facilis autem omnis unde in cupiditate officia quidem consequuntur. Sequi adipisci rem. Quaerat aut cupiditate.',
                isRevoked: true,
                expiresAt: '2020-09-14 07:14:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: null,
                token: 'Fugit omnis fugit rem atque aperiam voluptates. Voluptatum dolorem ex eaque qui perferendis quis veniam labore modi. Consequatur in repellat doloribus quia.',
                isRevoked: false,
                expiresAt: '2020-09-14 01:03:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                
                token: 'Molestiae vel qui iure. Itaque alias quam. Blanditiis cumque et dolor ea aspernatur explicabo minima. Illum cum amet eos et.',
                isRevoked: false,
                expiresAt: '2020-09-14 21:17:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: null,
                isRevoked: false,
                expiresAt: '2020-09-14 17:15:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                
                isRevoked: false,
                expiresAt: '2020-09-14 15:32:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Eum sed unde dolorum eos sint libero exercitationem inventore tempora. Quam quia ut deleniti in occaecati. Voluptatem quis dignissimos delectus qui. Corporis doloribus rem.',
                isRevoked: null,
                expiresAt: '2020-09-14 13:54:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Est officiis enim fuga itaque quis excepturi animi impedit. Architecto modi eum quidem debitis qui eligendi voluptas consequatur sequi. Et odit maxime. Impedit atque ea architecto ut praesentium enim laudantium magni. Ipsam quod voluptatem ullam veniam enim laudantium cumque rerum. Sit deserunt deleniti a ratione.',
                
                expiresAt: '2020-09-14 14:56:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '6rokdsx1hxutg3hn1pvewe88filr6b91bw55u',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Exercitationem quia voluptatibus. Temporibus et neque quia vero. Quas aut ut facere eius. Est quia ullam et.',
                isRevoked: false,
                expiresAt: '2020-09-14 15:27:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '2wifq99c28au1v82v5e7swk9wh1g4j3b6tef4',
                token: 'Ipsam dolores amet porro corrupti libero delectus placeat. Et nesciunt dolor accusamus atque unde ut aut. Aut exercitationem est corrupti cumque ipsum et nam. Placeat occaecati sit nemo ut neque molestias perspiciatis perferendis.',
                isRevoked: false,
                expiresAt: '2020-09-14 03:21:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId is not allowed, must be a length of 36');
            });
    });
    

    

    

    
    
    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Et voluptatum reprehenderit sint maiores placeat quo. Ratione natus et odio saepe sit. Ad maxime quasi amet perferendis voluptatibus numquam. Necessitatibus et dolorem vero saepe voluptas.',
                isRevoked: 'true',
                expiresAt: '2020-09-14 13:34:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenExpiresAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Earum laboriosam aut corporis necessitatibus laborum eligendi quia est. Molestiae quisquam magni aut similique rerum. Autem laudantium voluptatibus voluptas sunt eum placeat commodi vel. Quod quia natus. Iste odio unde quisquam fuga consequatur quia.',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenExpiresAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Vitae autem non reiciendis rerum ut illo. Odio quas repudiandae est. Rerum odio aut voluptas fugiat expedita et eveniet error. Rerum sit voluptatem dicta atque officiis ut ut perferendis ipsa.',
                isRevoked: false,
                expiresAt: '2020-09-14 13:19:33',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/refresh-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET o-auth/refresh-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '404ee0da-4ec0-4b2f-bb1d-cf6c10f63a75'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3795df05-dcf1-4ab3-a3a8-02049c431235'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3795df05-dcf1-4ab3-a3a8-02049c431235'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/6809a365-6a4d-4c7f-b70e-d60e765c794d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/3795df05-dcf1-4ab3-a3a8-02049c431235')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3795df05-dcf1-4ab3-a3a8-02049c431235'));
    });

    test(`/REST:GET o-auth/refresh-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/refresh-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ed69a9f0-a7e5-4958-a229-c57de1c48c75',
                accessTokenId: '868e192e-61ca-45d4-b74c-83bdd154f62a',
                token: 'Dolor est in. Cumque occaecati culpa quo commodi repellat aut quia maxime. Sit et minus mollitia ullam voluptate est facere dolorum qui. Itaque corrupti hic beatae repellat dolorem.',
                isRevoked: false,
                expiresAt: '2020-09-14 02:16:29',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                token: 'Alias et dicta accusamus quis nisi eos. Consequuntur reprehenderit delectus dolorem consequatur rerum est. Dolores rem vel veniam velit nemo similique expedita.',
                isRevoked: false,
                expiresAt: '2020-09-14 14:34:13',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3795df05-dcf1-4ab3-a3a8-02049c431235'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/8a18a11b-e831-4bec-a739-e5cefca2f9ed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/3795df05-dcf1-4ab3-a3a8-02049c431235')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL oAuthCreateRefreshToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '828f5c3a-3117-4d1d-b5b2-cf107bd6d484',
                        accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                        token: 'Repellendus sint molestiae quos expedita voluptate non vel nisi. Nisi omnis ab itaque ducimus sit molestiae tempora rerum rerum. Sit sed voluptatem distinctio. Quia maxime nihil incidunt reiciendis molestias veritatis. Explicabo molestiae dicta.',
                        isRevoked: true,
                        expiresAt: '2020-09-14 10:39:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '828f5c3a-3117-4d1d-b5b2-cf107bd6d484');
            });
    });

    test(`/GraphQL oAuthPaginateRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthPaginateRefreshTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL oAuthFindRefreshToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindRefreshToken (query:$query)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'd03345a6-f349-4ad8-824e-f9e9d23db762'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindRefreshToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthFindRefreshToken (query:$query)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '3795df05-dcf1-4ab3-a3a8-02049c431235'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('3795df05-dcf1-4ab3-a3a8-02049c431235');
            });
    });

    test(`/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be314c2a-0b5a-45e8-843c-2ddc3da4e199'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindRefreshTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3795df05-dcf1-4ab3-a3a8-02049c431235'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('3795df05-dcf1-4ab3-a3a8-02049c431235');
            });
    });

    test(`/GraphQL oAuthGetRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        oAuthGetRefreshTokens (query:$query)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetRefreshTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateRefreshToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '826f70b0-55b0-46a1-8689-8edd269fd63a',
                        accessTokenId: '072b68b4-373f-4ec2-a89d-2ce5ea4e870c',
                        token: 'Itaque quia voluptatibus. Omnis sint eos et molestiae ipsum cupiditate odio. Id rem alias distinctio quia maiores amet magnam sit nihil. Voluptatem id enim ullam odit. Ea quia in pariatur quo ducimus. Sit quae deserunt.',
                        isRevoked: true,
                        expiresAt: '2020-09-14 15:34:07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthUpdateRefreshToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3795df05-dcf1-4ab3-a3a8-02049c431235',
                        accessTokenId: '13a96aea-93c4-492b-989f-0a1632200516',
                        token: 'Et aut dolores magnam delectus repellat quia et est. Suscipit assumenda sed dolor. Aliquam minus id est similique accusantium non earum. Tempora recusandae ut reiciendis consequuntur et repellendus. Qui veniam ipsam esse. Nemo iure veritatis veritatis quia non non.',
                        isRevoked: false,
                        expiresAt: '2020-09-14 22:46:15',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('3795df05-dcf1-4ab3-a3a8-02049c431235');
            });
    });

    test(`/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5320e1bc-89b8-468c-91dc-fb8dc2570671'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteRefreshTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {   
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3795df05-dcf1-4ab3-a3a8-02049c431235'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('3795df05-dcf1-4ab3-a3a8-02049c431235');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});