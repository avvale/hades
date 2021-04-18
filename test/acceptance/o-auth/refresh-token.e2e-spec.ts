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
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Et exercitationem dolorem. Ipsa aut et eius et quam consectetur aut. Repellendus voluptatibus possimus voluptatem ut qui id placeat fuga.',
                isRevoked: true,
                expiresAt: '2021-04-18 23:27:30',
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
                
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Sint rem voluptas veniam officia consectetur eum. In vel et et odio. Et asperiores aut recusandae necessitatibus dolor ut quo occaecati. Esse sit aliquid qui fugit.',
                isRevoked: false,
                expiresAt: '2021-04-18 18:02:55',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: null,
                token: 'Rerum quia dicta quisquam enim provident eaque. Id sit perferendis. Sed consequatur impedit et maiores sapiente magni in quia. Harum distinctio molestiae et consequatur explicabo.',
                isRevoked: true,
                expiresAt: '2021-04-18 10:14:35',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                
                token: 'Ratione quae est est eius. Officia illum ea. Officia consectetur et.',
                isRevoked: false,
                expiresAt: '2021-04-18 17:09:44',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-18 09:05:18',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                
                isRevoked: true,
                expiresAt: '2021-04-18 14:57:58',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Consequuntur eveniet necessitatibus. Totam ea harum corrupti iusto maxime nisi. Laboriosam rem nihil recusandae minus. Dolor quisquam facere.',
                isRevoked: null,
                expiresAt: '2021-04-18 16:05:40',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Nam sed voluptate quasi nemo. Et vitae sed nesciunt est corporis. Omnis veniam incidunt esse voluptatem corrupti et. Quia quibusdam quia eveniet. Perspiciatis ut aut.',
                
                expiresAt: '2021-04-18 11:37:28',
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
                id: 'yc4o2jkzpuen0ct64sjmn7gra99km043vpeju',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Explicabo vel est vel recusandae. Voluptatem quis ratione. Ea explicabo deleniti debitis ut repudiandae culpa. Est soluta rem quo quis. Provident itaque iste sed perferendis tempora veniam hic facere eum. Sit amet tempora doloremque doloremque ea perspiciatis.',
                isRevoked: true,
                expiresAt: '2021-04-18 16:19:40',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: 'cvznwtj2d4oqt0kztdq2j9vusf1hudjtoqkju',
                token: 'Vel qui velit ea quis. Sed non dicta corporis ab inventore quaerat eos autem ducimus. Rem ducimus modi animi eos id. Animi eligendi fugit tempora. Maxime officia sit.',
                isRevoked: true,
                expiresAt: '2021-04-18 21:23:05',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Deserunt nostrum eveniet. Id ad dolores est qui eum aut et rem sed. Unde facilis odit consequatur quibusdam repellat. Sit possimus voluptatem quis qui sed. Blanditiis voluptate perferendis eum quas. Nulla eos nisi corporis eos velit non at ab.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 02:14:00',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Eos ea necessitatibus vero expedita ex quas. Praesentium nostrum officiis saepe omnis quae assumenda aut. Rerum repellendus deserunt. Dolorem sunt necessitatibus quia aliquid iste animi veritatis.',
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
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Similique numquam porro. Et necessitatibus eum unde animi. Facilis ut consectetur. Aut nihil harum facilis animi ratione. Qui eligendi eligendi perspiciatis ab. Neque reiciendis quae rerum.',
                isRevoked: true,
                expiresAt: '2021-04-18 11:44:12',
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
                        id: '709f2c24-4806-42bc-bd3a-7c05519c35af'
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
                        id: '1cdd8715-26fe-4ca1-815c-26cb47730b68'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1cdd8715-26fe-4ca1-815c-26cb47730b68'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/ae222897-2a53-43c3-a3ac-209b8c687604')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/1cdd8715-26fe-4ca1-815c-26cb47730b68')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1cdd8715-26fe-4ca1-815c-26cb47730b68'));
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
                
                id: '095eb6f7-def2-4746-80a7-9b7e3e891a44',
                accessTokenId: '46d3b49e-8577-4a70-b0ee-9d2d0a6fd1fe',
                token: 'Sit harum nam aut. Voluptas nemo dolores ut quis impedit veritatis eius quam omnis. Fugit illum nobis rerum molestias earum maiores sit et alias. Nihil et occaecati ea pariatur blanditiis nobis veritatis. Aut voluptates assumenda consequatur sit inventore ullam quidem. Ipsum nihil nihil recusandae eum incidunt ut accusantium.',
                isRevoked: true,
                expiresAt: '2021-04-18 23:08:18',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                token: 'Similique ad odio dolorum esse illum culpa molestiae et ab. Ea suscipit delectus voluptatum ab sequi expedita et non. Iusto deserunt ea explicabo. Non voluptatem sit voluptas. Quos consequatur est eum. Odit ut porro.',
                isRevoked: false,
                expiresAt: '2021-04-18 23:58:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1cdd8715-26fe-4ca1-815c-26cb47730b68'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/d809ccb4-a0be-47d2-848b-91e731e9dc1c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/1cdd8715-26fe-4ca1-815c-26cb47730b68')
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
                        id: 'ba310c0c-1d39-4003-a9b8-5df42dd04c85',
                        accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                        token: 'Nobis consectetur dolores ratione accusantium saepe. Fuga quia similique ut. Sed dolores reprehenderit aut quod est eius aspernatur nesciunt voluptates.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 16:44:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'ba310c0c-1d39-4003-a9b8-5df42dd04c85');
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
                            id: 'b203a8ac-fe58-4154-8fa5-30cdaf0cc5dc'
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
                            id: '1cdd8715-26fe-4ca1-815c-26cb47730b68'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('1cdd8715-26fe-4ca1-815c-26cb47730b68');
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
                    id: 'beaa3671-b6e9-4b46-a2fe-2545fda8a6b7'
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
                    id: '1cdd8715-26fe-4ca1-815c-26cb47730b68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('1cdd8715-26fe-4ca1-815c-26cb47730b68');
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
                        
                        id: 'a732df7a-fe6e-4cd2-9081-28e7129a9526',
                        accessTokenId: '60b05135-6a42-4074-b38c-ed79b659e92e',
                        token: 'Qui iure possimus libero dolorem. Ratione et est dolores voluptatum expedita necessitatibus voluptatibus voluptas. Rerum distinctio esse et expedita. Quos voluptatibus quibusdam sint.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 18:34:51',
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
                        
                        id: '1cdd8715-26fe-4ca1-815c-26cb47730b68',
                        accessTokenId: '4e113e85-032f-4da5-866e-3ecf752983cb',
                        token: 'Aspernatur odio consequuntur dolor eveniet. Nihil tempore sunt commodi hic reiciendis rem inventore. Harum ullam voluptas iure sunt totam sapiente aut doloribus pariatur. Voluptate soluta et quidem.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 11:27:21',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('1cdd8715-26fe-4ca1-815c-26cb47730b68');
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
                    id: '9202ebc2-c89b-458a-a6eb-a522858e0695'
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
                    id: '1cdd8715-26fe-4ca1-815c-26cb47730b68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('1cdd8715-26fe-4ca1-815c-26cb47730b68');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});