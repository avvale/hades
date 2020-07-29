import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('permission', () => 
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    test(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: '4cx64218uyc0exrwsklczwfwfoqz0aaxpfn57e87pb6bn17x4gre13ao4j4il7jqxdncdny4i6zncsgtghvs5wrlkj8sykvhccj096eyyei7cxq51jospenns0wb6a5bknf588hnicjcvqk0g4ja7fbhnxwx9qzlecljgf6fno4dw0mqxy4nciwt7v7t5f3g2ff5t1p6o1urxdls2l6win2qe8r23li8c82s4vh39xk241ql09rzv3yd5rphzod',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: '7pl4ekrhisah1zu4flt1c2u6tk3k8pz5mdpgufpq52sl487bgpwhheg010xduchk32dxc0uvuu0990bu7jo6jth0d4112dy4qhij6aex0c7pc9e1t3kyttrvcp5it2vk789e3878mot6qsa99zhh9gq4tysa1995fw0c9wpuvvswcaj2e5ry1x6sssijr55jii956aymzaix468aebq9noevmxvoxwarabsqp5gj0cgt884rxqaiefg5eauqqh4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: null,
                name: '6ie5wv0617ziclfzvzir6apxb0znp3il2jio0ud3oa6owjdivkylzvl7o0iwjprth0izqzl3wd8vzqdoj2m3kx16km781al5peahl8h03mg5lbqfil9ps2t43mqhy1ountr7d8g5xlosbys9apt8yyqmmoc1gk06ejyl1asyxvlzdp9dvo26gkxithhnst6t9pdha4nx2duszp26uz6yd9re5r9godlqd75t2mil96w3igi9v715q7vesjm6w0n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                
                name: 'cbfecyxnh88nhuvxsrr5i08ykzi7j6c9vralcsucg8nlekqtgqbr14zcp480b0fqyd3z84aktud07a4ew9d09yixvj93bu2p5tvm8m0318uspdzn30lct2zaqxgx9lgm8g6g8qpsjrsm5e2xep9qy0bsf7s35rz0nf729zpu30xyebh0hnxit40supabi5ubajfptdlkafztcpry8pat5ztf3o35c97r88dx2gp8z041nsgdd6arek5d061g4lc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'y3vs4516wnm6ny2zoiy9e2g0uvacw4y61rqkv',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: '0fyt6xsyb6yd22vcoed5n8xnw7zmkjugbel43tnjm6vnmq544jcm0xyehrb5v8q0f04uadjjhwp3xjhl4xlize8wmbq9mtr38j5pecz8sbyde6yo0bil0776cmidwbuzba2epoifjlm04yb74d22yjjbdtjpn6brwfao7z0ofdw9gwsj0ab0eb5txjyw9a0996nqsfylzs89oht3e0mf4by7mnziq6q69f128ie2hy48glhz08kqyksps8l9xl9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: 'ixq38gav4kpc3n83v8rusezp4n42kynoim2ms',
                name: 'qkdk0e2p1nlibnxiq90hrapvgv1fnt24q60ibz444lef00cff5rewd1d7n8gtyo48krqidgtnvq07e0lt6mzm9vxqpcotf2bzb5v6fmqpzcgz3blwbxcb0xla2jh76tysqwzu2v37h18ogbfaa2c8orrvzziy1o9yd1ddwm8tk0613tgh93iq8kxtrwikv1a0vkol7fmsjnh1dxac9i0877xvj21fxqgcz3j52yhzmkgsa5r6c77dyz3xao1dwo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: '557v8hgwl7xaw892rgvcrgxmyw1mhcjnpei7hbvbyvk18jk3owgmaxgz3py9ywj24a5jquexy4ll7zvt1zh7xe9cn4srua23g5iau2nqlntli9kzvf9n33iqvjrsig2vnie079syq6a16sow4oh5v11ld5k0shwxhvzbyvhh5qltktcamoutz2amx6dqkvb18m1v613nw60jkvfvqkz4i6rfwt5pwh6ahyult57ch95tp0ts90xf40ewq4il2gut',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: 'pw3o0d92m2v4qajkd22ndfxpkpivt7hgk0snc9hy8tsarglgfq3wbyhb6n0xqvs7sgirns84reg3v2ypw15p7o9dx5psamsfopvawlj3il38u03bwxx7pulrm7je0tixkqkxb95ihf4twugpkhnbvrspd8g6zxu9ptplefkhp8d3qxowkqi92swmk5h22mve6xajnxqetu5q510757b3ozai9s40y5ojicdzieejt4mf1uvu5mazc2q3zrfd7tv',
            })
            .expect(201);
    });

    test(`/REST:GET admin/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions/paginate')
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

    test(`/REST:GET admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'dc694634-ad9b-4f35-9087-284a376220eb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dc694634-ad9b-4f35-9087-284a376220eb'));
    });

    test(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/dc694634-ad9b-4f35-9087-284a376220eb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dc694634-ad9b-4f35-9087-284a376220eb'));
    });

    test(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd690f093-bba4-41e6-aaf7-691c9db9efd8',
                boundedContextId: 'bfa7c30e-e6ed-433e-90d8-0fbc49ca6502',
                name: 'vgdi28teiqfq8oc1bzt5hzkxbcmgkj4jhmqzatca416axbyyu255qaye3pzyssjsp6sffwvm4ipkvdx9n7zbclzan0sd9qu196mumz7r9osko6fx7n2tjfkya01ti7ym5g5ttlg7z7f4tksviv2ghbe09ocgnfb4w0fckd0c6n33wljrizg9k7m7wybgid36rbn082kt3751r7wcyz7kjlpzxh1fhkj6vgncb4gsdbxbd6ih9j92sllqfef7sh1',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                name: '4m4j5shnvb2rg1ddzfjk8qg7zteb88ptzlw0be7rbyzbmeozkga8kibyrp1ubxe3qv5l1dfmun91kcssm556a17zn7ji6lt2748bzd1td3urcq7vmfdz2xtqizc5bxdpwp8kyoksg06jpsitrhrilxbt3wcm9n2vihff89f4jmfbs93v9l6y9ucdtwwez3nfmqebnv0xagkceogba8nni4mq722ztsvxax7b8urzxucqb3m93w8xtu1gouqif30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dc694634-ad9b-4f35-9087-284a376220eb'));
    });

    test(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/dc694634-ad9b-4f35-9087-284a376220eb')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
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

    test(`/GraphQL adminCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5cd0bd4c-2da0-4d70-b8bb-1f56c20d0b32',
                        boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                        name: 'jpvvgu4u0h6dzlr7byjaevcf78qkm5ubjhcqw9v940bgwblmeyesk0w5fdvaypd6ujwxawcx5qe49u18fd66ccqx74krvs86ujjgdhd9ii1ryz0htrx651no75nsprnzvnwkezsrc4h8f6zgmpy7aynqozojqhh153dvl2216er6eg1qdgqfaqss5uwxqtsv40m5a7mc5wu4qywe0bvutouq1u01n0g9obd8jvmdz32mq5rnrnjc2ykeffm5vc7',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '5cd0bd4c-2da0-4d70-b8bb-1f56c20d0b32');
            });
    });

    test(`/GraphQL adminPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
                            name
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
                            value   : '00000000-0000-0000-0000-000000000000'
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

    test(`/GraphQL adminFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
                            name
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
                            value   : 'dc694634-ad9b-4f35-9087-284a376220eb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('dc694634-ad9b-4f35-9087-284a376220eb');
            });
    });

    test(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dc694634-ad9b-4f35-9087-284a376220eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('dc694634-ad9b-4f35-9087-284a376220eb');
            });
    });

    test(`/GraphQL adminGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetPermissions (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3f933835-61b7-4373-a783-697db0af7792',
                        boundedContextId: 'd1071bb3-1893-451d-af92-eed566473e75',
                        name: 'r1l8l1yl4ekk1xdq4oiyeqnevdvl7wak94n5sdugsrdc4nmytwtr6duvlalm8oac0vv5pxzjer168zrvkrzuqo0wznm9u3lgphzufcn7r56vb3prdghy44r7yj1vbath1zl4703728qcqzl98671gv8217wrx34qir6f0f6enax2woptgqaxk3mpwngtybxwjq9odc1990x7qnn4mkmfeeh1u5r2xkzc133ly6q23wyhwaa440evuwz2zcuvy8m',
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

    test(`/GraphQL adminUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'dc694634-ad9b-4f35-9087-284a376220eb',
                        boundedContextId: '2ccdda47-9886-451e-9dc2-928db63e43cd',
                        name: 'ytle1ik1hhdetjuuljd1rzndfpvkv7d48728riqnngqbsen6nrxpqrwdmiv08ntrl2gxghtd1c4menif4xgjpig8xthn7dqnw1ius05co16h114tslejpzv2nq9vkorlfhib0p1p3aiypr4nq3zbe869s076bwghrsoa6z3gyk9ffmcym55e47673igudu09c6nblkvi05t0xc1tbojm5pdmmjoeist9rq51di7jq6pxflgc03lrbpj2c5j714b',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('dc694634-ad9b-4f35-9087-284a376220eb');
            });
    });

    test(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dc694634-ad9b-4f35-9087-284a376220eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('dc694634-ad9b-4f35-9087-284a376220eb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});