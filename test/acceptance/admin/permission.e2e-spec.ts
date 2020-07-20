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

    it(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'lp0jl7jsqj48jyfier2a5ir04ii8ua2xhrczygnpytm20jej7qkcb0o9fbk0s6p819m5r8yga2q2vehr9fefqji8qipji8wx64q0witkr4p42895bj5llknmirt01cpf0gfgu7c6joxwe338732tv09n0joyue9c1qwxesy9rzqw5a6v3epqdxp5qhdxn1gonw5fkfjoua429yqsp4e9gqa7g3mctrdogp3u74xnflw0ioj3w7fradrft7r0byz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'e5fniqy7thu05ntoynnjw213304tj4a4xxjr4nqjl2nmt5eyk25k4wsc2wqmk0z13p6iqkyxrat5no3alya8gvsg95hvrk8aioppxx8gd9cdy4z8klwaa8ytzohpy0sm0ijnb3ba5sb6pm4zh8vlggbp5fijozs3i0u8bi351pprfk030qtnq42zfu8y5t7jxu2yqd34v2t33l4c5h6kktg9t2yuvvq9991gyzudacsv78s385gtf8jf9nri9ym',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: null,
                name: 'csoue7q1xhteji7v9txkpmx00tfq18it5ckk3zjkl4zvht1i3l9h3u8aefs51jmz1sea0zazzhmgjvwzc9sdkv11rbr67gjhhpdbm4p4pxwd4zdg15638ffys4yuigadwdx02q7rvczmt2sl2q7lv66g3vbsvgcdc75e8qc63msf1ja3ktxc54snuoklvrdzwbgeh9d1kolqcagaowk726hyl6dzsy6gfskqzghhdrxsb39c5hw4sebsrttxwb6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                
                name: 'd7efiqoyhhkodoa34g3mz4k97j085ui1912bvzphr872q48p7w18j15tp89x8ahhjtxojja7m2qhtcla1cxsy1s5o2uogy38w3fak87elanq0j6zysim66p56llj4qozisk405tawl90oh81tagtdpwogcfb11t5xh8fr8v7ut2tehaqbfycrtmt3bo7zppkkbicfdr5n2z62v1mhownl83tinjmh4vbs8y8hnxg98jktcjf8az1dn0bekxy7k9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 's914dis1ilbs6xvnjli9udqe71m53s80t7twl',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'pfo8kg8fh1203p3vwnga1e1juhkl3zf8vd1dvlnj88ui87qd1a6w7fxupgqfuwa9a0bc3qzz978ae57w2v9iclg37j6o64zooo0pc1y7w0pophsg2ay74jq16yk7d91ac50vk2uzgr37hownhncr0gizv0rada0ietb3vhoa0nbulph1zs8ldkjak5rooeo48qzkw3vbnv2iiw4e7m9sko2uf8qndk3uq62xjwldelx3dd1nrw0wgyikvcages4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: 'uvbi2ysa58m1bnaeo4pf95wnz2xkhalu41kcv',
                name: 'atj2yb0lljnhjxp5zrjwqy0zhq44rskljws6okrlcnqho5xcchfi1rln5auy9yt3m7n3doh6jr8t49844do4084qhxm85adc8wgm83nsr49l4mhcz196a9msm2masv6mcvvsfb0f6x0wycuhugcy657s4aawaaitq0m8ssrbm68j3pbw450rh103rlltfiia4i1mikxxeql8jts1pbjsa8kdov9e1ysw9v5j05pbktl320kuliq6glpnc63jj1e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'km50p7ix6trmwv0i1ojrw01kd1lvcrtzfht8frr63t4am1r0w22tjiab60kdghnuil6mj4l2y41ynqludzqw5629id9h9o4han1cq54cnnxatll9hz9yduqjkx07zciwjg65qmtn8uuw2zmb1jqtcfsxtbsy8ogsg9ykm8wspzy8b0lq8a2wp7goy91ykahjepd2stq7miq0uw2yjgslyo57z6fj5ue6ibkzwpmgsut3lhalb8yw1d3ypp7b0zi4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    it(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'rr2ex2kt2t1jb9pmepunq5h4lu1jq2x24hcc3za1v9fpwvjuqdz2isxwoyr1uz3uaqyo90hrlihvgznlwsw576j3tcm9pu5j0nxh4ncyl5n6vwo8ynr978w8n104ulp8a117oircag6trasbfvwqj5ga80m74zh0eocat9mdo4fz1o5o1ypnb1uok7u1v1b746h4eq6ss2d8073a6b0fxdaupf24r2iz0lge125ynb948kir7vsuonki915ic8z',
            })
            .expect(201);
    });

    it(`/REST:GET admin/permissions/paginate`, () => 
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

    it(`/REST:GET admin/permission - Got 404 Not Found`, () => 
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

    it(`/REST:GET admin/permission`, () => 
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
                        value   : 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ef1363e9-19a6-4d9b-8197-64c4357f1038'));
    });

    it(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/ef1363e9-19a6-4d9b-8197-64c4357f1038')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef1363e9-19a6-4d9b-8197-64c4357f1038'));
    });

    it(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b22f41a2-ca18-4caa-bbac-daf0ed9421fa',
                boundedContextId: 'ecefcee2-02c4-42a0-8be0-3dbff8048f5f',
                name: 'cg7hu57fd6uarn7clkt92yz3k1j7py5gye4uocmabopyuwpn44t3r4k0khcot59uify15ib1l8yed2da0oxbu2ef98qb5ozy29wip9zlmwj9admmwl9e4ubtft5ch8t59171htl2hwqy42lqvo95chzp7b1r493m4tdq1w842xnngpx9bcnx3yzroc3m96j4eikfht14kv1onu6lc0qwc7edg6g23bzcmnwfen8xkrtqd0yr5xnluonkz99dop5',
            })
            .expect(404);
    });

    it(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                name: 'lzk967ley2e5b22ix7bhbddw9lkmksv69jaham8xvyzzx5ozmgjk7xicoyvqmfdxdpgewca3f4i67hyxmjzrcveocf77mgzzkwp7y0u2g5itt04wc3mbvi6lcek8vzg4d03jjdabgun93aez5sb4jl1se8ne4gw0rokn533zh2rcaf530hyzvwvb016x1omc5w0vae5800rre5ih9foyqko0x1bqe6v2uo2n6igs2hczxea3ynne3tdmv4je2pi',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef1363e9-19a6-4d9b-8197-64c4357f1038'));
    });

    it(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/ef1363e9-19a6-4d9b-8197-64c4357f1038')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreatePermission`, () => 
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
                        id: 'a20ab048-d624-4b62-993f-cff163d3c62c',
                        boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                        name: 'qqrg8vu3wcgugl6t3kuughsh371ixlyjdut3c2se6m46lyc02s9uqzx37x7k72t12frm42cnesi2op4adxdl19vi9z2zhkx42yat6hxukr1ofngg2hwej2mkjcscjujfkmesewzj94cyaido60kzy2dbvvlq6936mk5k37n4zyry1wojzt322miavwtmdm3gpheg45l7k4xe3qqbdf5ej328zpc58sq7mvefmlvszpx64hiko8zk42cbcriwu2k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', 'a20ab048-d624-4b62-993f-cff163d3c62c');
            });
    });

    it(`/GraphQL adminPaginatePermissions`, () => 
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

    it(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindPermission`, () => 
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
                            value   : 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('ef1363e9-19a6-4d9b-8197-64c4357f1038');
            });
    });

    it(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindPermissionById`, () => 
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
                    id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('ef1363e9-19a6-4d9b-8197-64c4357f1038');
            });
    });

    it(`/GraphQL adminGetPermissions`, () => 
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

    it(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
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
                        
                        id: '1cbb50fd-cc23-451b-9947-0713cb717dc4',
                        boundedContextId: '89af271d-83c8-427b-b2dd-829fdd1532fb',
                        name: 'bqiwa88obbavc9pqpn38b03vnwglmnh2zy4ceh3a8vnj6tf1tompf75z3h967lozjmyhdrggyrl21s1l6w7hgpdwxyshfku2xjdzurs9096um4vjdr8qk097lk65t8iophjl4po4o8sgkbhq211fk4rw3ryfkz5ng14xjd502hdrzveamklh3mnqqkvndpqhgk65kkd8yaj34md4qj9ghntv8ijxd0aptqvq2yqyixrm1pfw2cak87lzok5xjjw',
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

    it(`/GraphQL adminUpdatePermission`, () => 
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
                        
                        id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038',
                        boundedContextId: '57bf6214-4089-48bc-a72b-a84cd60d6b71',
                        name: '89mrr6o92efnu1w04jjty0nbu6m5ffj4k0bwkv75inrheje4dmej1l8znyaggc6uxvkvbwdln1r9pl993i2e9vrwjkhaw8v46wyldgcoak90lz1dj7cupz8ae0fvnyxc5hy67yq7rdeu9ncdmh6gwcahgv0k2y4bvzbowayvgr1fxpvu5ry8st69lp3x1tlf43c8npm3mprqr1kc2881mtop3y7bfbmv1qnzsvx3a0i024xsobo4bj10vgwa8xk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('ef1363e9-19a6-4d9b-8197-64c4357f1038');
            });
    });

    it(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeletePermissionById`, () => 
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
                    id: 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('ef1363e9-19a6-4d9b-8197-64c4357f1038');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});