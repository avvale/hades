import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('lang', () => 
{
    let app: INestApplication;
    let repository: MockLangRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);

        await app.init();
    });

    test(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'w',
                image: 'd',
                iso6392: 'tf',
                iso6393: '9iu',
                ietf: 'ddtkm',
                sort: 359084,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                name: 'l',
                image: 'f',
                iso6392: '21',
                iso6393: '55y',
                ietf: 'y14i1',
                sort: 515741,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: null,
                image: 'w',
                iso6392: 'zw',
                iso6393: '50q',
                ietf: '65yro',
                sort: 696558,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                
                image: 'o',
                iso6392: '4p',
                iso6393: 'xpr',
                ietf: '547n9',
                sort: 548006,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'v',
                image: 'l',
                iso6392: null,
                iso6393: 'ptz',
                ietf: 'h878l',
                sort: 513164,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'c',
                image: 'n',
                
                iso6393: 'bs1',
                ietf: 'l09js',
                sort: 915645,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: '8',
                image: 'r',
                iso6392: 'yi',
                iso6393: null,
                ietf: 'hilex',
                sort: 213391,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'f',
                image: 'y',
                iso6392: 'wg',
                
                ietf: 'hbz6f',
                sort: 746042,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'j',
                image: 'v',
                iso6392: 'or',
                iso6393: 'cfa',
                ietf: null,
                sort: 253641,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'v',
                image: 'l',
                iso6392: 'd0',
                iso6393: '9ke',
                
                sort: 728183,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'r',
                image: 'a',
                iso6392: '8o',
                iso6393: 'rmi',
                ietf: 'xxlw6',
                sort: 308590,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: '1',
                image: '8',
                iso6392: 'c5',
                iso6393: 'eox',
                ietf: 'mymm3',
                sort: 300834,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'a819l3btw7sfcr1judq856m3lxnnndlfc3g22',
                name: 'h',
                image: '8',
                iso6392: '2a',
                iso6393: 'kjs',
                ietf: '5rc8f',
                sort: 668636,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: '5',
                image: 'f',
                iso6392: 'vz1',
                iso6393: 'puo',
                ietf: 'o5dn7',
                sort: 914234,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'h',
                image: 'w',
                iso6392: 'xd',
                iso6393: 'iwmi',
                ietf: 'flzje',
                sort: 886450,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'v',
                image: '3',
                iso6392: '44',
                iso6393: 'co4',
                ietf: 'hm3arp',
                sort: 863163,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'c',
                image: 'a',
                iso6392: 'yv',
                iso6393: 'bhr',
                ietf: '3bws9',
                sort: 6079412,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'v',
                image: 'j',
                iso6392: 'h2',
                iso6393: '648',
                ietf: 'tmprc',
                sort: 753050,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: '9',
                image: 'm',
                iso6392: 'vu',
                iso6393: 'd3r',
                ietf: 'pwkev',
                sort: 779802,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/langs/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs/paginate')
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

    test(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c01e7424-0685-4606-9e18-fa9bc587120c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/88a2e049-ea69-4e4a-9abe-0da2daa4e7a4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/da6602b8-05e1-40a0-8ec3-44a2eddec81b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'));
    });

    test(`/REST:GET admin/langs`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f3741bbf-efd6-4e9b-9d25-1631ffd06720',
                name: '2',
                image: 'w',
                iso6392: 'lr',
                iso6393: 'cvh',
                ietf: '01gq8',
                sort: 103647,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                name: 'b',
                image: 'k',
                iso6392: 'ra',
                iso6393: 'uzb',
                ietf: 'm9cj2',
                sort: 616524,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/f432022d-67db-4b1e-a828-1ccbeec97f71')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/da6602b8-05e1-40a0-8ec3-44a2eddec81b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateLang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
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

    test(`/GraphQL adminCreateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dd99f95b-4c82-49c6-bd22-f14c1be0cb55',
                        name: '5',
                        image: 'w',
                        iso6392: 'zi',
                        iso6393: 'mek',
                        ietf: 'ap40m',
                        sort: 613532,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', 'dd99f95b-4c82-49c6-bd22-f14c1be0cb55');
            });
    });

    test(`/GraphQL adminPaginateLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateLangs (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateLangs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
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
                            id: '7838bfb6-964a-4915-b6da-5cb2c367c1ca'
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

    test(`/GraphQL adminFindLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
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
                            id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('da6602b8-05e1-40a0-8ec3-44a2eddec81b');
            });
    });

    test(`/GraphQL adminFindLangById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f3e6ba7d-dce8-4400-8cdd-5c927154afbd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('da6602b8-05e1-40a0-8ec3-44a2eddec81b');
            });
    });

    test(`/GraphQL adminGetLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetLangs (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetLangs.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b2f20375-98ce-4659-8295-e77a001e4c81',
                        name: '5',
                        image: 't',
                        iso6392: 'o0',
                        iso6393: 'n9l',
                        ietf: 'x8b95',
                        sort: 256836,
                        isActive: true,
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

    test(`/GraphQL adminUpdateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b',
                        name: 'g',
                        image: '4',
                        iso6392: 'di',
                        iso6393: '1lz',
                        ietf: 'w4v7l',
                        sort: 363865,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('da6602b8-05e1-40a0-8ec3-44a2eddec81b');
            });
    });

    test(`/GraphQL adminDeleteLangById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ecb3491c-9a2f-4d4e-a8db-43f2c205bf64'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'da6602b8-05e1-40a0-8ec3-44a2eddec81b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('da6602b8-05e1-40a0-8ec3-44a2eddec81b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});