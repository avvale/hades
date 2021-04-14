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
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Fugiat odit ut doloremque voluptatem porro ab fuga ea mollitia. Eum voluptatem quia tempora perferendis sed incidunt harum ut. Voluptas dicta explicabo dolores modi et voluptatem ea. Molestiae voluptas consequuntur odio voluptates excepturi quo quaerat id ratione. Molestias unde autem minus dolor temporibus rerum quo quibusdam perferendis.',
                isRevoked: false,
                expiresAt: '2021-04-14 15:56:15',
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
                
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Deleniti aut deserunt deleniti sed omnis dolorum placeat aspernatur voluptates. Repudiandae ea minima vel optio et itaque neque voluptatibus. Autem dicta rerum rem molestiae. Ut quas deserunt minima. Et ullam rerum maxime eos corporis quia eos dolores officiis.',
                isRevoked: false,
                expiresAt: '2021-04-14 19:48:52',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: null,
                token: 'Suscipit voluptatem omnis consequuntur consequatur accusamus quas non. Necessitatibus nam dolorem consequatur cumque alias temporibus voluptas iure ut. Libero voluptas cumque asperiores vel temporibus ad ut mollitia labore. Consequatur qui repudiandae ullam rerum illo minus.',
                isRevoked: false,
                expiresAt: '2021-04-14 17:13:18',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                
                token: 'Magnam id voluptatem nesciunt odio cupiditate beatae. Quis consequatur perspiciatis impedit. Dolorem amet eum placeat eveniet reiciendis at delectus modi. Ea delectus harum.',
                isRevoked: true,
                expiresAt: '2021-04-14 16:31:20',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-14 16:17:05',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                
                isRevoked: true,
                expiresAt: '2021-04-14 07:42:54',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Aspernatur corrupti nulla. Minus dolorem minus amet aspernatur sit dolores. Rerum quos rem sint est voluptate aperiam rem sunt.',
                isRevoked: null,
                expiresAt: '2021-04-14 21:56:35',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Tenetur consequatur sequi veritatis quo culpa et voluptate dolorum aut. Quia consectetur dolor dolorem et facilis. Animi velit assumenda. Et qui quidem qui in aut et consequatur voluptas dignissimos. Et qui quaerat saepe id. Incidunt beatae est esse odio repellendus est molestiae.',
                
                expiresAt: '2021-04-14 19:26:30',
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
                id: 'rmwaoatisfwudfayr0idox01eq0gfhyiqct25',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Praesentium velit a in natus. Velit inventore sapiente eum explicabo nam voluptatum. Iusto aut perspiciatis harum nisi id.',
                isRevoked: false,
                expiresAt: '2021-04-14 08:32:11',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: 'y3nybhi1lwtrzezknae4qa3jxn7x76r5q6lj3',
                token: 'Autem sapiente cum praesentium et quisquam occaecati. In illum explicabo qui sed. Labore animi eum odio est magni provident. Error magni dicta rem. Qui sit labore quis explicabo.',
                isRevoked: true,
                expiresAt: '2021-04-14 09:07:23',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Aut animi doloribus inventore id est. Ducimus a aut. Aut dolores soluta nobis qui ut. Quo consequuntur dolores dolorum fugiat eligendi incidunt. Et aut porro iste fugiat neque est et omnis. Qui voluptatem nobis iste fugit.',
                isRevoked: 'true',
                expiresAt: '2021-04-14 19:57:00',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Dolor vitae ipsa. Veritatis amet molestiae vel vel vel. Neque aut quo ullam architecto a esse quasi tenetur. Maiores consectetur odit reiciendis provident enim est quasi recusandae non.',
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
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Vel non consequatur et. Cumque et illo fugiat. Sed labore odio et.',
                isRevoked: true,
                expiresAt: '2021-04-15 00:29:45',
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
                        id: '404b8c95-af8a-47e8-887b-e5117ec26a40'
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
                        id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/5bf0d51a-dc00-497e-898c-37687882fcc2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'));
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
                
                id: 'cdfdc063-07cd-413d-9704-d9a5a7e4dd01',
                accessTokenId: '8a2a41f3-b8c2-4add-bcfb-e766d10a0eb6',
                token: 'Iusto sit sit nesciunt sed culpa sit quis eum. Provident molestiae qui eum quibusdam sit. Alias sit quae ab temporibus. Id dolores repellat est vitae eligendi. Voluptatum eum ipsam nemo adipisci quam.',
                isRevoked: false,
                expiresAt: '2021-04-14 11:51:59',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                token: 'Rerum nihil quisquam aspernatur mollitia. Recusandae est non. Veritatis minima soluta fugit. Sequi autem voluptatibus.',
                isRevoked: false,
                expiresAt: '2021-04-14 19:10:36',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/3263fa3e-edb1-4c44-ac0e-aa3d362a560a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e')
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
                        id: 'c837be61-2109-4e2f-94cf-b5c8d8d0b003',
                        accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                        token: 'Hic repellendus fugiat aut voluptatem. Consequatur fugit distinctio voluptatem sint a et voluptas ab. Laborum consequatur est porro.',
                        isRevoked: false,
                        expiresAt: '2021-04-15 00:17:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'c837be61-2109-4e2f-94cf-b5c8d8d0b003');
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
                            id: '0149db39-8dd9-4624-8d46-d6adda3df5a8'
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
                            id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e');
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
                    id: '5d8d16b4-fdfb-445a-9701-0f4245d85dfc'
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
                    id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e');
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
                        
                        id: 'bca69bd2-b122-4ddb-8941-fb960bb28bb6',
                        accessTokenId: '560c67f2-10a6-430e-8203-9bb5117c700c',
                        token: 'Sed nostrum voluptatum. Vel quam ex sunt animi quia maiores excepturi voluptatum eveniet. Quia eum labore nostrum a aliquid necessitatibus error inventore nostrum.',
                        isRevoked: false,
                        expiresAt: '2021-04-14 06:17:17',
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
                        
                        id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e',
                        accessTokenId: '4dc2df2a-c3d8-4aea-be7f-51b04be8dfad',
                        token: 'Facilis ut autem doloremque sed. Aut qui provident eligendi velit. Quia natus sit iusto itaque repellat. Quod nihil sit culpa nisi. Delectus non dolorem.',
                        isRevoked: false,
                        expiresAt: '2021-04-14 17:33:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e');
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
                    id: '61e78d71-2a7e-41f9-8747-6e0e3ca6c2b7'
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
                    id: 'c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('c5b2c3f5-8c2e-4352-a176-8ba27a8c7f9e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});