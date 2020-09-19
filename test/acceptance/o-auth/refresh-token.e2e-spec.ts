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
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Similique ut ut labore odio omnis quae. Molestias dolorem adipisci soluta culpa aut voluptates. Quo velit placeat eum fugiat et sunt.',
                isRevoked: false,
                expiresAt: '2020-09-19 09:59:26',
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
                
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Suscipit culpa asperiores nihil qui delectus voluptate. Officia autem unde qui. Facilis repudiandae ut autem possimus velit. Non est eum. Recusandae quos deleniti animi non itaque expedita et quos autem. Exercitationem quis possimus.',
                isRevoked: false,
                expiresAt: '2020-09-19 07:14:33',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: null,
                token: 'Et aspernatur a laudantium quas veniam sint dolores. Est repellendus sit commodi. Ad rerum iusto amet illum ea ea aspernatur optio animi. Possimus inventore officiis eveniet id qui. Officia ut velit est eligendi aliquid nulla autem atque. Quis aspernatur eum.',
                isRevoked: false,
                expiresAt: '2020-09-19 12:38:51',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                
                token: 'Recusandae repudiandae praesentium doloremque veritatis ipsum non est blanditiis. Maiores unde accusantium non necessitatibus labore aliquam ullam. Eaque eos quia necessitatibus qui qui saepe rem. Nesciunt fuga dicta et fugiat aperiam culpa fugiat minus nemo. Sunt similique rem. Exercitationem qui optio saepe.',
                isRevoked: false,
                expiresAt: '2020-09-19 12:05:15',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: null,
                isRevoked: true,
                expiresAt: '2020-09-19 02:15:51',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                
                isRevoked: false,
                expiresAt: '2020-09-20 00:23:24',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Accusantium sed dolor inventore quam. Asperiores odio accusantium. Accusamus illum eum doloremque dolores alias sapiente omnis assumenda ullam.',
                isRevoked: null,
                expiresAt: '2020-09-19 14:58:02',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Reiciendis cupiditate porro. Autem ullam deserunt atque enim magni deserunt rem. Voluptates ut voluptas est eius distinctio facilis dolores. Soluta aut autem eaque optio.',
                
                expiresAt: '2020-09-19 04:22:17',
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
                id: 'fyq9ozogm16d3my6jhhke9lv94dvsvdmis0wi',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Doloribus minus laudantium qui illum earum est consequuntur vel et. Ea incidunt suscipit nostrum fugit. Id iure architecto aut nam facere perspiciatis. Alias nostrum veritatis nisi ullam nulla velit. Hic quis quia non ex at rem fugiat.',
                isRevoked: true,
                expiresAt: '2020-09-19 15:36:31',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: 'pex9amda6np6dfgdjum3dzcm88mt5qgy6i8fn',
                token: 'Culpa ea laudantium quis possimus soluta repellat quas in veniam. A quaerat voluptatem illum quaerat pariatur sunt sint aliquid nam. Quo est natus. Laudantium excepturi in eius dicta eligendi quis ea autem saepe.',
                isRevoked: false,
                expiresAt: '2020-09-19 20:40:55',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Eum sit iste veniam. Harum consequatur illo delectus similique officiis incidunt et laboriosam. Voluptas et recusandae ullam. Quam expedita commodi molestias minima ab. Rem ullam veritatis ad.',
                isRevoked: 'true',
                expiresAt: '2020-09-19 21:30:45',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Sed iusto unde et est sed ut. Porro non ut repellat soluta inventore cum. Autem nostrum neque voluptatum illo fuga qui nihil reprehenderit. Voluptas dignissimos rem est aliquam. Labore repudiandae occaecati ipsa minima saepe eligendi.',
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
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Provident consequatur natus eum et eaque sit officiis omnis voluptatem. Unde a explicabo quia dolor. Quia est necessitatibus. Esse omnis dolore similique nesciunt repudiandae quis repellendus. Suscipit eaque voluptatibus aut eos illo. Quisquam ratione et odio ipsam voluptatem.',
                isRevoked: true,
                expiresAt: '2020-09-19 04:43:31',
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
                        id: '44418c8c-1109-4305-8515-d819445db90c'
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
                        id: 'fa882740-a5d9-439d-a307-836b703a53cb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fa882740-a5d9-439d-a307-836b703a53cb'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/ce2674ba-b354-4563-ab2c-461d5c2e6e6e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/fa882740-a5d9-439d-a307-836b703a53cb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fa882740-a5d9-439d-a307-836b703a53cb'));
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
                
                id: 'ef2ad805-e018-45ae-a7b3-e8ac5fab3628',
                accessTokenId: '722b7983-46c4-42d6-9de4-6d09ce56952e',
                token: 'In in eligendi tempora natus quis sit non nostrum unde. Itaque voluptas et blanditiis cupiditate qui. Quis sed tempora assumenda et ex quia. Explicabo voluptate qui dolorum incidunt. Et quae aperiam officiis excepturi sequi sed ullam.',
                isRevoked: true,
                expiresAt: '2020-09-20 00:54:29',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                token: 'Autem impedit itaque quia quia harum enim quidem. Eum quam sed cumque dolorum sapiente expedita at. Nemo aut distinctio. Aut voluptate enim dolorem iusto autem et magni ex adipisci.',
                isRevoked: true,
                expiresAt: '2020-09-19 07:28:34',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fa882740-a5d9-439d-a307-836b703a53cb'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/d1a93377-7cb5-470a-98ce-866d78613260')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/fa882740-a5d9-439d-a307-836b703a53cb')
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
                        id: 'efbd0d37-9b75-4635-892c-9b4ba0d42e09',
                        accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                        token: 'Maiores sunt ratione ut aspernatur eum. Consequatur aspernatur itaque veritatis. Voluptatem quisquam a atque accusantium sit cupiditate aut sint. Sapiente ad impedit vero consequatur voluptatem numquam.',
                        isRevoked: false,
                        expiresAt: '2020-09-19 17:13:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'efbd0d37-9b75-4635-892c-9b4ba0d42e09');
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
                            id: '21d11e91-3d1b-4c06-a2e7-63b4c25f3a39'
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
                            id: 'fa882740-a5d9-439d-a307-836b703a53cb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('fa882740-a5d9-439d-a307-836b703a53cb');
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7953a41d-9673-471f-a823-6b6e154fd27f'
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fa882740-a5d9-439d-a307-836b703a53cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('fa882740-a5d9-439d-a307-836b703a53cb');
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
                        
                        id: '8aa946fb-a837-4cc2-a12b-fe124ea5d73b',
                        accessTokenId: '76a7bfe0-6a53-4e8a-873a-2b3e9d5e4726',
                        token: 'Pariatur mollitia voluptatibus ducimus sit aspernatur deleniti nulla eum illum. Numquam eligendi cum sit magnam. Dolores praesentium modi ducimus animi eos. Minima recusandae qui mollitia blanditiis dolorem distinctio voluptates est et. Sunt asperiores aperiam. Facilis voluptatem explicabo rerum fugit quos qui quis suscipit.',
                        isRevoked: true,
                        expiresAt: '2020-09-19 21:13:18',
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
                        
                        id: 'fa882740-a5d9-439d-a307-836b703a53cb',
                        accessTokenId: '32dbc1e8-5603-41b3-b61a-0c15a65f827d',
                        token: 'Ea est repellat ex officia magni. Perferendis ut ex voluptas quod aliquam quod et quia. Assumenda iste recusandae dicta voluptatem sint. Quo qui commodi eveniet enim itaque culpa nihil est esse. Voluptatem esse corrupti fugit rerum soluta nemo repellendus.',
                        isRevoked: true,
                        expiresAt: '2020-09-19 14:20:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('fa882740-a5d9-439d-a307-836b703a53cb');
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3fda2a16-cb6f-4104-b33e-fd8aa84d58dc'
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fa882740-a5d9-439d-a307-836b703a53cb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('fa882740-a5d9-439d-a307-836b703a53cb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});