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
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Vero iure aut quasi culpa vel. Nostrum nam voluptas dolorem aut. Aut esse error iusto sed et cupiditate eaque quae nihil. Voluptatem id maiores mollitia sit repudiandae.',
                isRevoked: false,
                expiresAt: '2020-11-05 21:27:54',
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
                
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Laboriosam nemo et maxime impedit qui ducimus placeat voluptate. Corrupti dolorum deleniti laboriosam tempore. Sapiente aut et veritatis est sapiente. Voluptate non et quisquam magnam id dolorem exercitationem. Enim placeat non dolores iure cum saepe delectus dolorum cumque. Aut animi velit dolores autem minima ea explicabo et quidem.',
                isRevoked: true,
                expiresAt: '2020-11-06 00:17:38',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: null,
                token: 'Placeat aperiam ut distinctio perferendis laudantium. Aut nihil enim dolores est recusandae a earum itaque autem. Enim iste aut rerum. Ipsum ut perferendis quasi nisi atque laudantium. Ut ut voluptatum rerum deserunt rem ea quas.',
                isRevoked: false,
                expiresAt: '2020-11-06 04:47:42',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                
                token: 'Ducimus nemo numquam. Magnam iste aperiam et enim et voluptatibus sint. Sequi non est. Quas assumenda quo odio dolorum distinctio vitae. Molestiae ratione qui eos illo consequatur fuga aut. Eaque et saepe non minima cumque dolorem.',
                isRevoked: true,
                expiresAt: '2020-11-06 05:00:58',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: null,
                isRevoked: false,
                expiresAt: '2020-11-05 23:38:29',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                
                isRevoked: false,
                expiresAt: '2020-11-06 07:32:49',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Numquam ipsa iusto esse aperiam voluptatem iste. Aut nemo ipsum laboriosam et sint est. Natus aut quo dolorem. Aut possimus vitae est sapiente est ipsam pariatur enim ut.',
                isRevoked: null,
                expiresAt: '2020-11-05 21:43:21',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Consequatur doloribus qui nobis laborum. Itaque iusto voluptatum voluptas cupiditate qui. Nisi voluptatibus necessitatibus delectus est. Numquam tempore mollitia quasi aut iste hic quas id voluptate. Dolorem est aliquid nihil nihil dignissimos doloremque quasi est.',
                
                expiresAt: '2020-11-05 16:20:00',
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
                id: 'qrhmsgzu6cybfmemlgrplryr919wqbplvpbre',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Laudantium rerum veniam asperiores reprehenderit ullam quas magnam. Delectus quo ipsam deleniti repudiandae mollitia et qui laboriosam impedit. Fuga quia ab vel aperiam id aut. Accusantium illo mollitia veritatis voluptatem ab incidunt. Recusandae iste et perferendis autem sapiente reiciendis distinctio repellat facilis.',
                isRevoked: false,
                expiresAt: '2020-11-05 17:09:41',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: 'g3edve4ur8tbe0qgnph89zfe7xh4fxwqkmyy7',
                token: 'Velit officiis est sapiente blanditiis at. Voluptas eius tempora. Et voluptatem nostrum dolor placeat cupiditate. Blanditiis explicabo facilis ullam voluptatibus omnis placeat. Nemo asperiores non laudantium dolor.',
                isRevoked: true,
                expiresAt: '2020-11-05 17:11:40',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Omnis quam illum. Possimus fuga ullam veniam sit odit autem nemo sunt quia. Dicta facilis cumque neque molestias. Dolores debitis facere quasi fuga dolores consectetur consequatur et.',
                isRevoked: 'true',
                expiresAt: '2020-11-05 12:01:11',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Iure ut necessitatibus laborum aliquid illo. Fugit ad placeat sapiente cum aut ipsam. At et expedita eligendi ut adipisci ducimus voluptas voluptatibus. Qui repudiandae eum error labore est nemo earum sit quia. Porro cupiditate et. Deserunt eius adipisci non repellendus.',
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
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Non vel deserunt et delectus corrupti voluptas dolore. Eum accusantium iusto occaecati ex reprehenderit nemo quia. Occaecati ea enim facere.',
                isRevoked: true,
                expiresAt: '2020-11-05 22:11:34',
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
                        id: 'adfa5045-4b78-46fe-92ec-023790b4fc72'
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
                        id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/d3119435-3133-44dd-b0a7-0f3c529bd366')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/e8cbe409-2b19-480a-8ba9-128c2ad6da65')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'));
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
                
                id: '3b6f37a1-b8bd-4278-809f-533abd42d538',
                accessTokenId: 'b07127c3-3d7d-4e37-b5c4-f2f8d76bdcde',
                token: 'Sint veniam cupiditate labore quisquam. Rerum quia accusantium ipsam dolores quo sapiente sunt voluptate. Non sit et voluptatum aspernatur. Modi distinctio inventore libero qui qui ipsam reprehenderit voluptas iusto.',
                isRevoked: false,
                expiresAt: '2020-11-05 23:10:56',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                token: 'Autem veniam voluptatum vel expedita voluptatibus minus fugiat possimus. Qui et quidem rerum quae accusamus sequi. Impedit id dolores totam delectus saepe fuga doloremque. Eveniet et quia qui ipsam consequatur quia praesentium. Minus atque laudantium deleniti quos exercitationem occaecati.',
                isRevoked: false,
                expiresAt: '2020-11-06 01:27:26',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/4c749989-34d1-4557-854c-0602acdad0dd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/e8cbe409-2b19-480a-8ba9-128c2ad6da65')
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
                        id: 'aa3c7a9b-d2cd-4120-bdd9-bf3184b3d73c',
                        accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                        token: 'Quia soluta ut assumenda. Modi beatae nulla qui provident enim veritatis eum. Natus corrupti omnis. Dolores quos sed suscipit totam rem. Praesentium perferendis quia rem. Consectetur iste sit laborum voluptas et.',
                        isRevoked: false,
                        expiresAt: '2020-11-06 01:23:10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'aa3c7a9b-d2cd-4120-bdd9-bf3184b3d73c');
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
                            id: 'a32d807d-2cff-4d7b-a6b5-09c608745162'
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
                            id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('e8cbe409-2b19-480a-8ba9-128c2ad6da65');
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
                    id: '33ff5b13-3eb1-4ff9-b00e-4573b5f1abf2'
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
                    id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('e8cbe409-2b19-480a-8ba9-128c2ad6da65');
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
                        
                        id: '8e3c152e-fd21-4f3f-82f0-fc4eada86c78',
                        accessTokenId: '32d4b63a-8079-48f2-bcef-1da182b950fa',
                        token: 'Dolorem laborum aut eos at dignissimos voluptatem tempore delectus qui. Unde nobis eveniet numquam eos dolores. Magni quasi quis fugiat iusto aut illo. Inventore sed sequi quasi ea quam fugiat inventore earum libero. Sunt deleniti ullam dolore aspernatur dolores.',
                        isRevoked: true,
                        expiresAt: '2020-11-05 19:46:58',
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
                        
                        id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65',
                        accessTokenId: '0960ab74-a2b5-48bc-8612-c5cd2e226156',
                        token: 'Qui id quia dolore ut. Quam quidem eaque in debitis aut molestiae voluptatibus dolor voluptates. Maxime rerum laborum est esse quod. Velit est et cum laboriosam enim voluptate quis necessitatibus.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 14:55:49',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('e8cbe409-2b19-480a-8ba9-128c2ad6da65');
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
                    id: '56a8a27b-c06c-4d98-b1bd-d7080fc0007f'
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
                    id: 'e8cbe409-2b19-480a-8ba9-128c2ad6da65'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('e8cbe409-2b19-480a-8ba9-128c2ad6da65');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});