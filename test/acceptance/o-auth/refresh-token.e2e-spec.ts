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
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Sed dicta reiciendis. Eveniet aut officiis vel quaerat magni. Iusto et corrupti.',
                isRevoked: false,
                expiresAt: '2020-10-16 19:28:07',
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
                
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Fugiat quia voluptatem doloribus perferendis enim unde optio. Ipsa qui voluptatem rerum odio ut excepturi recusandae. At atque voluptas voluptate eius mollitia velit veritatis. Delectus eius non. Corrupti et eius. Quam ullam quo fugit atque iusto quibusdam.',
                isRevoked: false,
                expiresAt: '2020-10-15 23:36:43',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: null,
                token: 'Consequatur adipisci tempora possimus veritatis odio quibusdam modi aperiam. Commodi soluta quia est quo sit sit numquam vero tempora. Aut inventore nulla nisi reprehenderit et id ipsum quae. Et tenetur consequuntur vel eos optio.',
                isRevoked: false,
                expiresAt: '2020-10-16 11:28:29',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                
                token: 'Blanditiis eos necessitatibus omnis aut facilis rem aut. Tempora saepe iusto magni ipsam aperiam quas ut. Laborum nostrum magni et mollitia quas dolorem mollitia vel. Nesciunt aut placeat natus illum. Asperiores vel voluptas est ex aut dignissimos et.',
                isRevoked: false,
                expiresAt: '2020-10-16 02:22:44',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: null,
                isRevoked: false,
                expiresAt: '2020-10-16 21:24:17',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                
                isRevoked: false,
                expiresAt: '2020-10-16 14:16:24',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Est qui voluptatem quo cum mollitia possimus nobis qui velit. Dignissimos asperiores exercitationem labore aliquam qui soluta odit. Error deleniti unde pariatur illo. Aspernatur sed odio nemo placeat doloribus sed. Deserunt rem voluptate inventore. Ipsam quia voluptatum ipsam occaecati voluptatum molestiae in quasi eius.',
                isRevoked: null,
                expiresAt: '2020-10-16 20:05:40',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Ut cupiditate fugiat nesciunt deserunt sapiente consequuntur minima. Vitae distinctio praesentium fugiat nostrum. Suscipit natus eveniet magnam voluptatem nulla explicabo officia et quam.',
                
                expiresAt: '2020-10-16 18:24:16',
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
                id: 'lkmykl8g1i8h13mlv4zmgnxjnp91f2e6gymet',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Nemo unde consequatur ut asperiores quibusdam culpa. Quia placeat nihil iure est velit aut fugit. Ut cum inventore sed quia nesciunt. Beatae ratione facere et aut. Tempora ut consequatur. Quia debitis est modi ullam ad sit delectus.',
                isRevoked: false,
                expiresAt: '2020-10-16 16:24:47',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '57cjihhceuec5gnsyn50q8zxb3u9m0w3p3cj4',
                token: 'Impedit minima ut et enim porro. Pariatur exercitationem sunt beatae. Similique quisquam tempora cupiditate vitae cum. Repellat sed et aspernatur expedita dolorem reprehenderit assumenda natus. Iste assumenda enim maiores eum sed. Sed fugit ut.',
                isRevoked: false,
                expiresAt: '2020-10-16 13:40:35',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Aliquam amet reprehenderit fugit. Eum nesciunt aliquam quia velit hic ut. Id voluptates et voluptas et tempore. Sapiente doloribus dicta eos et deleniti nihil. Quis eaque distinctio assumenda provident aut.',
                isRevoked: 'true',
                expiresAt: '2020-10-16 00:46:35',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Voluptatem est sed consequatur. Harum vel magni est laudantium quia illum. Enim reprehenderit et voluptatem quis cum.',
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
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Qui aut temporibus amet impedit alias omnis non totam. Ipsa quia magnam odit. Distinctio qui dicta atque. Neque ab et minus est voluptate expedita.',
                isRevoked: false,
                expiresAt: '2020-10-16 20:05:22',
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
                        id: '543f59bd-5cd7-49ad-8559-0ff039be4e15'
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
                        id: 'b30c4db4-532f-4c64-9261-0c5eadedd580'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b30c4db4-532f-4c64-9261-0c5eadedd580'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/92610ce3-6d7e-4dc7-a184-9866a4897fc4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/b30c4db4-532f-4c64-9261-0c5eadedd580')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b30c4db4-532f-4c64-9261-0c5eadedd580'));
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
                
                id: '1bc4d217-8d79-4a1b-96b5-a8770bdae73b',
                accessTokenId: '809ed2a4-8cf3-47f4-bc49-ccf6279a5fb6',
                token: 'Rem perspiciatis distinctio ea quas et nobis sunt. Molestiae voluptatibus aut omnis beatae aut quia. Tempora distinctio possimus expedita nihil odit est laboriosam. Quia dolor velit dolores eveniet fugit.',
                isRevoked: true,
                expiresAt: '2020-10-16 21:08:13',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                token: 'Numquam amet illo possimus blanditiis eos at incidunt tempore. Consequuntur repellendus quo saepe excepturi dicta quia labore omnis. Consequatur neque suscipit consequatur temporibus repudiandae ut. Quos similique id. Tempora quos labore molestiae et et amet saepe optio.',
                isRevoked: true,
                expiresAt: '2020-10-16 22:16:13',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b30c4db4-532f-4c64-9261-0c5eadedd580'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/7ff10f9a-62f7-4df2-980d-1e6ed4daae2b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/b30c4db4-532f-4c64-9261-0c5eadedd580')
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
                        id: 'db30356a-44ec-4008-a9e5-18c936718653',
                        accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                        token: 'Veritatis architecto dolore sint quia. Quo iusto quia sint accusantium consequatur. Est sapiente quos blanditiis et libero. Illum quia perspiciatis asperiores est voluptate pariatur voluptatem. Accusamus aut iste quia neque est maiores aliquid deserunt repudiandae.',
                        isRevoked: false,
                        expiresAt: '2020-10-16 13:26:09',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'db30356a-44ec-4008-a9e5-18c936718653');
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
                            id: '6b4a33d7-1de8-4fa2-8528-cbc803fb1d8c'
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
                            id: 'b30c4db4-532f-4c64-9261-0c5eadedd580'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('b30c4db4-532f-4c64-9261-0c5eadedd580');
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
                    id: '1626770b-10c1-465f-9148-7edc962a65b0'
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
                    id: 'b30c4db4-532f-4c64-9261-0c5eadedd580'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('b30c4db4-532f-4c64-9261-0c5eadedd580');
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
                        
                        id: '9b0988b6-4580-41af-9369-6571ef94570f',
                        accessTokenId: '21bffd92-b0db-44de-9fe6-39f92bfc83e7',
                        token: 'Sed vero ut. Hic illo odio error autem ipsum dolorem. Distinctio iste mollitia molestiae ut ipsam dolore quia et commodi. Corrupti deleniti aut.',
                        isRevoked: false,
                        expiresAt: '2020-10-16 03:12:43',
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
                        
                        id: 'b30c4db4-532f-4c64-9261-0c5eadedd580',
                        accessTokenId: '2d7d3e5f-fc24-41be-8ee0-f07b5f6a1294',
                        token: 'Dolores repellendus officiis. Ut nihil occaecati hic. Debitis ab quo aut. Sint nulla repellat necessitatibus vel. Est neque quam dolore odio.',
                        isRevoked: true,
                        expiresAt: '2020-10-16 16:05:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('b30c4db4-532f-4c64-9261-0c5eadedd580');
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
                    id: '4958aca6-d86f-4923-804b-a8cf38913723'
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
                    id: 'b30c4db4-532f-4c64-9261-0c5eadedd580'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('b30c4db4-532f-4c64-9261-0c5eadedd580');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});