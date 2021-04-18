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
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Autem nam tenetur eligendi itaque dolores voluptas. Dolores eum voluptates non veniam consequatur quis dolore doloribus doloribus. Doloribus et error. Fuga nihil voluptas ex necessitatibus nihil velit.',
                isRevoked: false,
                expiresAt: '2021-04-18 15:37:49',
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
                
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Numquam dolor aut ut quia et. Veniam labore omnis fugit laudantium maiores. Dolor occaecati tempore delectus aut totam hic qui tenetur. Quo accusamus ratione. Fugit tempore iusto nulla maiores. Quisquam aspernatur recusandae.',
                isRevoked: false,
                expiresAt: '2021-04-18 09:29:58',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: null,
                token: 'Deserunt voluptatum ut veritatis accusamus aut voluptates. Et quae quia et a recusandae cupiditate eligendi veritatis molestias. Adipisci hic accusamus voluptas quo et id minus commodi veritatis. Et dicta autem nemo eligendi quia ipsa.',
                isRevoked: false,
                expiresAt: '2021-04-18 05:59:08',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                
                token: 'Ipsam eius cum. Et fugit recusandae quibusdam aperiam error dolorum. Assumenda ut voluptatem ducimus. Rerum qui fuga.',
                isRevoked: false,
                expiresAt: '2021-04-18 16:03:53',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: null,
                isRevoked: false,
                expiresAt: '2021-04-18 04:52:14',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                
                isRevoked: false,
                expiresAt: '2021-04-18 11:59:00',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Rerum iure non. In sit rem dolores illum et sequi vel. Harum consequatur ullam impedit quod nihil asperiores quo rerum. Laudantium qui ex magni eum voluptas expedita id. Enim fugit occaecati. Cumque rerum aut aut atque dicta exercitationem voluptatem et quos.',
                isRevoked: null,
                expiresAt: '2021-04-18 01:12:00',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Quaerat distinctio blanditiis sit reiciendis. Deleniti molestiae qui sed exercitationem placeat ullam corrupti voluptates et. Enim est ipsum. Eos consequatur beatae corrupti. Odit id molestiae repudiandae.',
                
                expiresAt: '2021-04-18 23:44:27',
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
                id: 'wxx8q7zlv34fa1a80hgm0ydsel9canpzfs8hi',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Laudantium possimus provident et odio eligendi. Voluptate rerum nobis pariatur est nemo sed suscipit. Ea rem perspiciatis fugiat voluptates culpa.',
                isRevoked: false,
                expiresAt: '2021-04-18 12:09:37',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 's06ugejfs82afehayxbre6ltm5oedsfm2fd85',
                token: 'Libero quisquam optio libero nostrum cupiditate. Adipisci voluptatibus sed et voluptas quo ullam. Autem impedit harum iure. Consequatur earum natus libero velit enim velit. Nemo quam dolor ab tenetur aut.',
                isRevoked: true,
                expiresAt: '2021-04-18 09:28:31',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Aut in sequi non iusto beatae placeat corporis dolorem inventore. Dolores rerum dolores tempora sint consectetur. Temporibus ipsa suscipit. Harum fugiat ea ad aliquid. Totam dolores in ratione exercitationem laudantium incidunt. Possimus assumenda enim voluptas.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 19:11:47',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Non fugit sed consequatur labore vel. Occaecati adipisci adipisci numquam autem. Iure atque architecto unde ea nostrum veniam enim sed numquam. Soluta nemo vel rerum est. Et quibusdam saepe nostrum. Dolore id id omnis cum doloribus ipsam.',
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
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Enim qui enim atque. Ea aut laborum deleniti corrupti odit nostrum quas. Consequatur cum eos delectus officia facere dolore est deserunt eum. Ipsum dolorum dolor.',
                isRevoked: false,
                expiresAt: '2021-04-18 10:37:39',
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
                        id: 'dfd8f6e6-acc9-4237-90ee-e196957a7206'
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
                        id: '23175b24-76a5-456d-9364-2100cd5e2d80'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '23175b24-76a5-456d-9364-2100cd5e2d80'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/bcaafaed-bf2e-4f64-88c5-89aaa86c4256')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/23175b24-76a5-456d-9364-2100cd5e2d80')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '23175b24-76a5-456d-9364-2100cd5e2d80'));
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
                
                id: '0200bb7a-714b-42e1-8b73-9e9dab28acff',
                accessTokenId: '273435ba-b167-44a3-88d0-603faf3233db',
                token: 'Inventore fuga autem. Et similique repudiandae assumenda alias. Voluptatem qui harum autem fugit ut eos omnis omnis. Maiores perferendis omnis tempora eos est enim. Sed earum deleniti eveniet. Quibusdam nisi nobis quia ut nulla nesciunt ipsa.',
                isRevoked: false,
                expiresAt: '2021-04-18 15:39:21',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                token: 'Quam quia sunt voluptas ex similique officiis. Magni qui qui amet. Facilis molestiae ea. Nobis ut incidunt odio dolor qui inventore enim voluptatem ratione. Et repellat suscipit esse facilis alias rerum cum id ut.',
                isRevoked: false,
                expiresAt: '2021-04-18 03:38:03',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '23175b24-76a5-456d-9364-2100cd5e2d80'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/4361ba11-102c-43cf-9b07-94af33eb9a33')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/23175b24-76a5-456d-9364-2100cd5e2d80')
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
                        id: '5d5473b9-7f46-44bd-a5e5-3d7225edecf2',
                        accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                        token: 'Aut enim deserunt asperiores deserunt dolorem eaque facilis aut. Odio itaque mollitia. Odit facere maxime aut magnam natus ut sunt. Reprehenderit vitae eius sunt corrupti sed sint consectetur ea aperiam. Enim non voluptatem adipisci. Iure quia earum dolorem recusandae.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 22:29:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '5d5473b9-7f46-44bd-a5e5-3d7225edecf2');
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
                            id: '6e355a15-ecfb-4118-b945-944c4e0d9be1'
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
                            id: '23175b24-76a5-456d-9364-2100cd5e2d80'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('23175b24-76a5-456d-9364-2100cd5e2d80');
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
                    id: 'aa9febdc-a06b-43d0-a286-882fc55eb1fe'
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
                    id: '23175b24-76a5-456d-9364-2100cd5e2d80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('23175b24-76a5-456d-9364-2100cd5e2d80');
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
                        
                        id: '8153b3a7-34ab-4f1b-a360-70b08d45295e',
                        accessTokenId: '0b578749-01fd-40ac-9d8c-87df2493b57d',
                        token: 'Enim ducimus debitis eligendi aut nemo et fugit fuga. Corrupti qui autem ipsum ea rem mollitia sed. Id voluptatum eligendi fugiat expedita molestiae sunt doloribus. Voluptatum enim aut est quas porro sunt itaque deserunt. Alias molestias voluptas voluptatem officiis voluptatum fuga. Eos facere laboriosam deserunt dolorem non.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 23:37:25',
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
                        
                        id: '23175b24-76a5-456d-9364-2100cd5e2d80',
                        accessTokenId: 'c9f54322-0304-4732-b961-52ce2674c6c5',
                        token: 'Asperiores hic sint. Minima et unde id animi rerum. Voluptatem voluptatem aut. Optio et doloremque deleniti qui non modi.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 13:42:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('23175b24-76a5-456d-9364-2100cd5e2d80');
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
                    id: '6180b154-5c62-472a-a27d-4a1d27dabfeb'
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
                    id: '23175b24-76a5-456d-9364-2100cd5e2d80'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('23175b24-76a5-456d-9364-2100cd5e2d80');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});