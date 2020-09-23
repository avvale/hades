import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/iam/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/iam/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST iam/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '3vqzprawmwghlg16x4ros7426neww0hh0wp52yd2hxpr08mauub1862nphxhacbnnygpcdw26ugzfqz4n47yecevcck44o970sgcqv9q8irnbw1gvc6hqknro6lcy9tml3tl30tixig9wdvugp55k0tn1kb6emeght6hr0ns9uq4hm4bprqm87xdvldiunz94kljnnhkpwvjy7z0dvene7zkjbpkbuto6h05pfdve2buy0ywxepa5xkkqzwhi1h',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                name: 'u9o2a4pa5364koks9us6fswb1g3co2rej7xwtrrq0qacis1tyz6xv88ipbsixwcj9jh6hg2uc8rg5l6p0ukbuehbwf6j9m2j3fja860iozobieaec3ujpb46v6ifv891luuuodmgaoeemuftkn59oub76k53f6e5kd9px4y3ond57li09xo3cb42wn08umvqvcsplapfrsn6zi4kqx1seorf9n4mvmiflgwnmi9o1pzk0mqf37ep3izjchblyg9',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: null,
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'i6g73l2o8ybs2bdof61n2derr15eeery74xiy9wqckeonyjr3frkays4qlild21y800hgc0dl3s4fid0eaaq0rhgusxf55ho9vktgp3o8l7m3q7wrojez26voeuzg68imqv2ltmfxyu2rer7gez1g542ki4nz0gp0lt1v0m6dszj1fj4709jhv529dzga0a1traksmuske2aypyclcee2odff274flg9rq6ikdslwjf08nfcqz1bx82eivbzb80',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'fek2cnkf1630ta6qdoz4bcqviamiw25c1bwpojah3xbu12xlmw1k06e6c2edbnogyivrvgkunllgmvv3dtgn9k8n6y1872c6qruft3hay55h9u9wq76xn78f34p2b76gxr13brg51frqvsdv1t6ubxd58v9dwthp5i98sal5mrtsd53vdkzxtb5xsxuqxf0xsp4k30bdllfedbs2tvfhljpwaiev77z8t44gkl40cjcbr0hytfdpvyouusztfnr',
                
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '389gz4po1b7lpur8w7nrnun0kifb1oed3qgv5',
                name: 'gef7ckd8m0nbeq48ffjf6pgam6twvydpn6ja6xu23fqxrjy19n0ksngein4kh30xmuisf0ch4wpv4iasmnqxw4szu5k9c65mo4q1ecki696mi8zwau3ilb86d78jf01e8uw36tj3tkyokhdwfoe2dseez1fmfnhqmxdd7gyy1wgfsg7iqktrkqtr44spkh9sbasyg4tyny5lvgjoboyzw3ez842x8ohmedpz9err9wk9atzq3q8te2sjhyobtdf',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'vfg81nxs21y1qjo7y6t7stzks9bs6datqvynvs1qcvjwlyzjzs5xc99r0g3pcfmpzni3n5u1gptfhj3qe8ixjcz3kn44tytgwbxx3qtpial2yvndsupm5g0m777e80zsap68fwfshtsxji29rd1f9rvbcv2vqv0y3wmk8bhe0zo4codgge1s64eglrcdkxl87nqljfngryg7xv2ew2ywfdx61rsjtlsahdhmeybvz40217z0didzwvwghjd12ez',
                boundedContextId: 'uq14bhm8o56at88hylludvjspsretfgo8lrac',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'v2b49gt6d9ja5xi79vtdhpyk0w8jfckvrse84gczbiuw44yzbbpey29ck0zfrv0yo0h6770c1st5a1se4l999d1d4u7pxjxand7s7kc9kqkmmasyoopwq8wvyr0jr6q7cvj8hm07vvqpyfvnuwrej4a5agaoleufokro9p1pszn483c8yr0cgepsgnfzpzqzj6qrt701br30323qqh7w05xtp7e54x3t1f791fk99f8rur53hpyr5uxl4a3hk8j8',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'fso5obmfchy110zvf6cufc37j8uhb1tyawdtnaeo6ni63nt9de8yx3curs8z6alsnc321b9e6lhv8kq9lpreno0y44w6dpesao4327j72zknstkn7vdkgz1xh6sfbli9wyzqqt3rs7da6on268vb1tun0zcdgx2tiyc0csi4qsqhh169j2nk5auxljc80hcwk6pbibon88rz2pz3gkf6144bftjebvd6dtkp157c2435mfirkbe7fbdacvcdfck',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions/paginate')
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

    test(`/REST:GET iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7c49d14d-aa5e-4d26-91d4-e4cdddadd7d7'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7b405718-cd71-43f1-8611-2ae0120c241a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7b405718-cd71-43f1-8611-2ae0120c241a'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/ece97d55-7276-4393-8d9a-de7308426cfe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/7b405718-cd71-43f1-8611-2ae0120c241a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b405718-cd71-43f1-8611-2ae0120c241a'));
    });

    test(`/REST:GET iam/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '14c70045-85c6-487f-b812-ee490133e596',
                name: 'ac9mf29cg8nsncll3fz42ixuxedumarjpzk6e0766zmyxtkyzb8oiqso02x0ctj4tv0jqvgo8gfg5cwicku2ug9yimhtnh2f555ocaaedc93o4o9dde0n5h5zuzpx774nn4f3b6qg037ipac6qbqrtwqsdg496x521797gg77k1dauhvjz0risazx2u4dog7ptpl3t9s2fis9hgzekek6bpxal1boi38r969s7s7efnwf2toal27crftby37gad',
                boundedContextId: '763fd52a-b948-4094-a318-b000a27eef59',
                roleIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                name: 'g3e9f58r2jx6q4qg2s9w11d2wgdsimvijxvnivz6is41uhnmocimd2jphomyo7n0su2rvxeb1965089g7silpnipc0vdofz1kyiubzka897fjc2wsczi0ii2xozhy7uxop2pn9pfhnj9rqhamxgsco8kpfciomo1m9z4wipk9gg3irn8ghzkb9hfbnjwplcpnbbe4zu7t07fwdo6tnqqcl98ihmuu045lvx3hqgehzcq7mrxifua7u8ed32huq8',
                boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b405718-cd71-43f1-8611-2ae0120c241a'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/d5564856-711d-4a41-a9d7-3398433d45b4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/7b405718-cd71-43f1-8611-2ae0120c241a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
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

    test(`/GraphQL iamCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7fc428eb-5949-409f-b255-2a7c11d2c206',
                        name: 'op6nz4w14x6doxnsvwdxyfpfj11503l42wjg1z1iescrkpecqsu4tuaqlnrhnq2b2josya9bv59mis20dcvcuyv7ntd5g62i6mzk1xg8lbco5bbdqvlo60al1rn6r06tjoof8lgeiyg7jixddzblsbj3hbhp9dv4tkse5bpcuaxaxsftezwc1hqzk6v3qmpibj2chyxvk13khwp0kmwdyx4ts2nfa0uoko5lhtvvp9axieydptvcs78kobneej4',
                        boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '7fc428eb-5949-409f-b255-2a7c11d2c206');
            });
    });

    test(`/GraphQL iamPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
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
                            id: '9208f816-c837-4e68-a8b4-fbb5a6508c37'
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

    test(`/GraphQL iamFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
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
                            id: '7b405718-cd71-43f1-8611-2ae0120c241a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('7b405718-cd71-43f1-8611-2ae0120c241a');
            });
    });

    test(`/GraphQL iamFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '139843b9-a57e-4045-bd07-3c9e06d4f822'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7b405718-cd71-43f1-8611-2ae0120c241a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('7b405718-cd71-43f1-8611-2ae0120c241a');
            });
    });

    test(`/GraphQL iamGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '04f88270-a592-40e5-9cf2-978eefc1c0aa',
                        name: 'lbrkuyfxajj09xh88wn2h2m00xe7teaagceb25lbjhidxgy0hznfozebe9kav1loaiitvtlshvva95x2b039k5mn5abkee9z6bebrthx5lvqvvoczgc5hj41eb069l5iok2mhji1ztmokgd3im20dty9svuj7q8jp0j8w8o8k900c8z0jha8t1etoq8q8rjj0zlkpe56fyi4ss5j3qg6hb0zxiga7qoam98uxea04j1onvdvf5tv5jlhzlrfjqa',
                        boundedContextId: '4f0356ea-bf85-48a3-ad93-03fa79036db6',
                        roleIds: [],
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

    test(`/GraphQL iamUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7b405718-cd71-43f1-8611-2ae0120c241a',
                        name: '4yyt1v9zh2kyds4kj2wphqoddbzw41lfl48yt86clsi5tyftypvcp4a072i53l4mmbzah8qv664snn6fdmh5frlkcqj3r0abbh6rvvxoy5ipl0ee7u8dv0xaidv546dplv9q1uh5v60dzzgwflywmslxpj70nw2o42ld045dqn69a3w2xietdkjq3y86acxr6u1xkjxsr6zj3isc9clf2xlztzfaf092j9bilktom1k82kvcju32yfy1kypi4jn',
                        boundedContextId: 'c0b489a6-e83b-4664-b5b8-845049630726',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('7b405718-cd71-43f1-8611-2ae0120c241a');
            });
    });

    test(`/GraphQL iamDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ed85e6dd-2636-46b2-bc6f-20b60bc76140'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7b405718-cd71-43f1-8611-2ae0120c241a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('7b405718-cd71-43f1-8611-2ae0120c241a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});