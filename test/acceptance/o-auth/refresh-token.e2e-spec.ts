import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '@hades/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '@hades/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
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
                            validateOnly: true,
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
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Velit mollitia voluptatibus distinctio ut eius et. Quidem architecto inventore. A et totam enim deleniti omnis. Laboriosam amet magnam corrupti nulla ut voluptatem quia.',
                isRevoked: true,
                expiresAt: '2020-11-05 01:35:19',
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
                
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Totam porro dolores assumenda ipsum nesciunt. Velit repudiandae eligendi. Aut fuga molestiae magnam tenetur doloribus quasi sit aut. Vel qui dicta rerum quis. Officia nisi consequuntur id architecto nemo dolorem.',
                isRevoked: false,
                expiresAt: '2020-11-04 21:41:15',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: null,
                token: 'Qui ratione ipsa vitae eligendi et atque in. Eius vel porro incidunt quod. Rerum illum voluptatem consequatur sit ea sequi. Nihil error omnis unde quas optio a rerum.',
                isRevoked: false,
                expiresAt: '2020-11-04 20:40:43',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                
                token: 'Enim pariatur debitis non omnis voluptatum laborum nemo. Voluptatum maiores at sit velit. Doloribus voluptas est. Quia fuga voluptatem. Quasi odit perferendis sed iste.',
                isRevoked: false,
                expiresAt: '2020-11-05 08:15:24',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: null,
                isRevoked: true,
                expiresAt: '2020-11-05 11:54:24',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                
                isRevoked: true,
                expiresAt: '2020-11-04 19:32:35',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Nemo accusamus iste veniam excepturi blanditiis nobis voluptas. Voluptatum adipisci omnis nemo similique fugiat et praesentium. Explicabo id laborum non et quis doloribus. Eaque dignissimos voluptatem aut eius voluptas animi eveniet quae officiis.',
                isRevoked: null,
                expiresAt: '2020-11-05 11:35:17',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Laudantium temporibus voluptatem dolorem in reiciendis harum. Reiciendis quia ducimus ut dolorem debitis. Optio esse occaecati quidem quasi dolores.',
                
                expiresAt: '2020-11-05 00:03:37',
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
                id: 'yw454ibih0u2hq6w8phxb7jluywkgm8omh8kx',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Aut recusandae nostrum mollitia sit autem sed quia quod voluptates. Ipsam odit ab et quisquam dolorem ducimus. Exercitationem et qui aut illo qui rerum ut.',
                isRevoked: true,
                expiresAt: '2020-11-05 03:19:19',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: 'bw98vpx6lizumuf5l0tpdl6o50evja16ajybv',
                token: 'Amet consequatur provident voluptates sunt ut. Tempore non qui asperiores excepturi aliquid magnam dolorum a. Voluptas tempore enim iusto commodi. Laboriosam ipsam dolores facilis ad commodi.',
                isRevoked: true,
                expiresAt: '2020-11-05 01:38:39',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Sint excepturi dolorem praesentium qui nostrum reiciendis qui sint quibusdam. Sit officia et rerum impedit quae incidunt. Dolor omnis a culpa autem est distinctio saepe voluptatem rerum. Pariatur quae dolorem id ratione est tempora rerum. Earum ipsum ratione rerum dignissimos quia et est praesentium. Possimus eum non incidunt laudantium odio natus enim.',
                isRevoked: 'true',
                expiresAt: '2020-11-04 17:59:28',
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'A laborum occaecati tenetur recusandae optio sit quia. Debitis accusamus ut in quo explicabo. Voluptate nihil molestiae qui est consequatur.',
                isRevoked: false,
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
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Magni deserunt et. Exercitationem libero sunt est. Consequuntur consequuntur blanditiis ipsum a reprehenderit inventore ipsa eius et. Debitis rerum perferendis et ad mollitia fugiat amet deserunt. Odio ut et laudantium quae blanditiis omnis dolores. Blanditiis sed aut suscipit sit enim rem atque sapiente.',
                isRevoked: true,
                expiresAt: '2020-11-04 21:20:18',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/refresh-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET o-auth/refresh-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a7538f7d-7092-4f14-adf9-102c39336ba9'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd2101798-6ef7-467e-a1db-f3025d56e54e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd2101798-6ef7-467e-a1db-f3025d56e54e'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/4f8681cb-9d08-4b64-87ef-ffa115bec4a2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/d2101798-6ef7-467e-a1db-f3025d56e54e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2101798-6ef7-467e-a1db-f3025d56e54e'));
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
                
                id: 'b2617f28-91c7-4d6b-bea8-0de71af84988',
                accessTokenId: '9e2954eb-7342-416a-ab81-14bd0728cc9c',
                token: 'Inventore mollitia ut et omnis nulla nihil vitae ea. Ullam architecto impedit veniam tempore non. Velit aut quis ea nemo eveniet incidunt. Nihil esse perferendis dolores nemo illo. Quibusdam repudiandae sit sint sunt minus. In quaerat ut voluptatum unde voluptatibus sequi laborum ut commodi.',
                isRevoked: true,
                expiresAt: '2020-11-05 06:17:31',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                token: 'Repellat et non sed sed aut. Itaque ex illo enim. Sunt ipsam ut quos aut nihil. Atque tempore accusantium sit. Qui nihil eius sequi quibusdam natus beatae iure.',
                isRevoked: true,
                expiresAt: '2020-11-05 04:17:13',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2101798-6ef7-467e-a1db-f3025d56e54e'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/58547951-8330-4fb9-a853-fe2d03f96676')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/d2101798-6ef7-467e-a1db-f3025d56e54e')
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
                variables: 
                {
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
                        id: '1f97d004-d557-4c64-b99c-15b7b060c72c',
                        accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                        token: 'Expedita corrupti quo dignissimos. Suscipit eveniet exercitationem adipisci molestiae. Voluptates eius ut qui maxime molestiae beatae consequuntur. Saepe occaecati et dolorem animi quidem eaque.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 02:24:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '1f97d004-d557-4c64-b99c-15b7b060c72c');
            });
    });

    test(`/GraphQL oAuthPaginateRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthPaginateRefreshTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindRefreshToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '92cf1118-c4dd-4e62-a9f1-6efb39e3d59e'
                        }
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

    test(`/GraphQL oAuthFindRefreshToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'd2101798-6ef7-467e-a1db-f3025d56e54e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('d2101798-6ef7-467e-a1db-f3025d56e54e');
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
                    id: '98432fd0-3d7d-4998-a253-30d44625502e'
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
                    id: 'd2101798-6ef7-467e-a1db-f3025d56e54e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('d2101798-6ef7-467e-a1db-f3025d56e54e');
            });
    });

    test(`/GraphQL oAuthGetRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
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
                variables: {}
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
                        
                        id: '700d92ba-b4ad-4f63-ae49-9c990bb902ee',
                        accessTokenId: 'c25a731e-1ce6-4c97-bb97-168311169ed6',
                        token: 'Iure autem dignissimos exercitationem aperiam quo. Suscipit quo tempore. Magni rerum et ducimus dicta quam expedita optio fuga.',
                        isRevoked: true,
                        expiresAt: '2020-11-05 13:20:39',
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
                        
                        id: 'd2101798-6ef7-467e-a1db-f3025d56e54e',
                        accessTokenId: '8351b9d7-53aa-41b9-ad12-40834d5b95bd',
                        token: 'Inventore aut non sit aut est error corporis. Nihil non facere. In amet reiciendis ducimus ipsa. Est in commodi nam et commodi.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 14:31:45',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('d2101798-6ef7-467e-a1db-f3025d56e54e');
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
                    id: 'e72d82c4-9d69-4949-9594-1100519795be'
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
                    id: 'd2101798-6ef7-467e-a1db-f3025d56e54e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('d2101798-6ef7-467e-a1db-f3025d56e54e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});