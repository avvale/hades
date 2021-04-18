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
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Expedita aspernatur sed et facilis sit repellendus quia id. Perspiciatis et fugiat alias et aut vel aliquam. Nobis enim est nisi odit autem dolor voluptate.',
                isRevoked: true,
                expiresAt: '2021-04-18 02:16:04',
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
                
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'A non nemo ut iure officiis id dolor quo. Corporis corporis quas sit. Explicabo est aspernatur fugit excepturi.',
                isRevoked: false,
                expiresAt: '2021-04-18 09:31:35',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: null,
                token: 'Vitae dolores id deserunt est atque. Et et est perspiciatis quas ad nulla voluptatem excepturi amet. Quia distinctio voluptate ab voluptatum laborum praesentium non. Omnis error modi tempora laboriosam maxime est ut amet. Quia hic nisi minima aliquam culpa atque est.',
                isRevoked: true,
                expiresAt: '2021-04-18 01:44:20',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                
                token: 'Dolor magnam non similique occaecati facilis ut delectus. Quaerat rem dolore sint iste dolores voluptatem velit qui eos. Quibusdam fugiat est non hic ut. Ducimus qui qui temporibus eum.',
                isRevoked: false,
                expiresAt: '2021-04-18 08:07:53',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-18 04:07:09',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                
                isRevoked: true,
                expiresAt: '2021-04-18 17:20:32',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Rerum ut quaerat dicta ea nemo vel facilis dolor. Et veniam quam quia quam voluptatem enim voluptatem voluptatum. Accusamus porro quo recusandae et ut asperiores dicta velit. Doloremque in et.',
                isRevoked: null,
                expiresAt: '2021-04-18 11:43:46',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Quaerat perferendis dolorem maxime quod qui doloribus. In non excepturi sed a. Id natus cupiditate iure reiciendis ut numquam molestiae. Quasi ab et iure. Eos aliquid qui enim delectus rerum corporis autem alias. Aut amet et omnis quaerat similique iure eum non consequatur.',
                
                expiresAt: '2021-04-17 20:18:19',
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
                id: 'd35av9hqmrkk3plv334qfoeg35jfepechnvkq',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Tempora iusto laborum possimus magni. Dolorem voluptatem eaque molestias. Illo dolor voluptate inventore magni.',
                isRevoked: true,
                expiresAt: '2021-04-18 13:47:51',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: 'ymw2szmp5cahdbwgy6uoa37sq61vo0pedrkxa',
                token: 'Illo ducimus repellat vitae. In atque recusandae. Et quis pariatur. Mollitia reiciendis illum qui quia maxime voluptate praesentium ratione.',
                isRevoked: false,
                expiresAt: '2021-04-17 19:23:14',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Sunt dolor sapiente et rem quae. Harum omnis alias blanditiis veritatis et officia est assumenda. Maxime recusandae ut aspernatur omnis expedita. Eum unde rerum nisi odit velit ducimus molestiae qui velit. Ut beatae iusto. Est deleniti cum repellendus modi minus ullam sunt.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 12:27:41',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Aut dolorem illum id alias illo aliquam libero doloribus et. Adipisci quidem commodi eaque amet. Hic alias reprehenderit cumque accusamus facilis. Rerum quaerat illo et. Eum architecto cupiditate eos natus ut sed et corrupti omnis.',
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
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Omnis dolor vel perferendis qui officia delectus saepe laboriosam delectus. Aut ducimus voluptatibus non et dolores autem culpa molestiae excepturi. Quia animi totam deleniti quia eos. Nostrum fuga debitis et. Id deserunt minima ipsum numquam.',
                isRevoked: true,
                expiresAt: '2021-04-18 16:09:15',
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
                        id: '06192b9f-c46b-4da3-9a2c-19e1469afa01'
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
                        id: '9159fc87-470b-40af-a3e2-2fe81cc78936'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9159fc87-470b-40af-a3e2-2fe81cc78936'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/c54364ff-c63f-4ded-a336-32ac19858a36')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/9159fc87-470b-40af-a3e2-2fe81cc78936')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9159fc87-470b-40af-a3e2-2fe81cc78936'));
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
                
                id: '51c6d2b3-4137-4564-973c-5406c7573b60',
                accessTokenId: 'e36bdeda-08c9-4b7f-8aad-2badbb9c2731',
                token: 'Facere quas est quod enim. Nam dolorum ipsa aspernatur. Magnam minima sed maiores illum aspernatur consequatur facere.',
                isRevoked: true,
                expiresAt: '2021-04-18 13:49:09',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                token: 'Facilis aut ipsa possimus omnis ipsa quae fuga. Pariatur asperiores necessitatibus aliquam. Consequatur et natus at omnis ullam. Tempora voluptatibus voluptas et eveniet soluta. Culpa facilis dicta qui excepturi. Quo omnis molestiae consectetur laboriosam et harum optio.',
                isRevoked: false,
                expiresAt: '2021-04-18 02:37:02',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9159fc87-470b-40af-a3e2-2fe81cc78936'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/721abc15-2686-495c-8b51-63e78de9009e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/9159fc87-470b-40af-a3e2-2fe81cc78936')
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
                        id: 'd80d9227-49fc-4a98-90cb-39a1d4542f5e',
                        accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                        token: 'Nemo qui eligendi est rerum. Voluptatibus aperiam quisquam rerum sunt ullam ut et. Fuga labore aliquid. Accusamus numquam dolor totam rerum. Voluptatem autem ex suscipit dolor ut.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 03:07:58',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'd80d9227-49fc-4a98-90cb-39a1d4542f5e');
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
                            id: '0a2dbbfc-39bf-4d05-97bc-831476bc7f93'
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
                            id: '9159fc87-470b-40af-a3e2-2fe81cc78936'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('9159fc87-470b-40af-a3e2-2fe81cc78936');
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
                    id: 'a3265b30-5326-48e1-ba35-e469dc9be7fe'
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
                    id: '9159fc87-470b-40af-a3e2-2fe81cc78936'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('9159fc87-470b-40af-a3e2-2fe81cc78936');
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
                        
                        id: '9f03c643-cad6-4161-b571-0aa9702d48d1',
                        accessTokenId: '0a7efc90-f867-490a-a33a-d7796fe78352',
                        token: 'Rerum quia impedit fuga ratione doloremque sed et dolorem. Odit magnam quo nobis consectetur sunt nesciunt nihil. Ut fuga quia assumenda aut veniam voluptate aut totam deserunt.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 09:00:04',
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
                        
                        id: '9159fc87-470b-40af-a3e2-2fe81cc78936',
                        accessTokenId: '2d257e2f-c5e4-44c0-b8af-d97692904fca',
                        token: 'Ipsum sed beatae mollitia qui et. Quis et quo quia error et quam. Molestiae dolor distinctio iusto nisi. Voluptatem voluptate et ullam.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 14:07:39',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('9159fc87-470b-40af-a3e2-2fe81cc78936');
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
                    id: '958c8876-9898-4a07-ba3d-d6b5f3da2a90'
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
                    id: '9159fc87-470b-40af-a3e2-2fe81cc78936'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('9159fc87-470b-40af-a3e2-2fe81cc78936');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});