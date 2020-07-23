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
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: 'lzady9z7si0605kgzu6o2egr3q58gzrcjmz8zbm4pqif4o787fvk6nos31emab0tx7x0pls2q9fhzcdiq95jll4fujgaqujnyztwedl20iipq1bk9cfnmwpmnsikv6rxwnqgxzjzopyrsa6y30rolysc8tcqps0udrlzi8jvthxkfaurt62rtxk55nvaej71ogtwygp3aonbxuvilf5wknc6zcq9tzomrmgx71i0xhu074liukflf4zricx1ib2',
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
                
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: 'v7bquprd4vhu18l9z4dic3ivtu2c4i37bh1qr6moscqghtsugvripq04kde2a51i2qqwi68mu4hyh0yf94klihdhxu20pxqe9d1xfcgdokvaql90taperofeor3riu1cneomy3qmix2yz7bgat17bk61dabyhbh7yhtssqzw2rkepuz1eojhtbzgbw19irw9mxbnmkv4kwb52srlm35dwq3zdj1jt6sph32mf4kvc858qu11eykcmpsz8ylpwu6',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: null,
                name: 's4fh57tk2ktfzybedvr3mvvwfdxc8t9c0r0i4v1dcm4lj06f5o2ewpf90y3b63rv2fhrzuc089jmgbz2j563ahucoa6oywbm64fkfy9y1064fawlppafalhotpkp6osms7xegp4169ixme9jnemsaaohfbm3vs7ffwx0ry5lph450m0x5o87i6n5838a4pe1y5a2ihj4e2acnt86o49bnkzat4caxyz2pontckm487jnpm0p1cwtve8fni0jpdc',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                
                name: 'ts16lhjkv74lgb7q16nfocj72l36i1wvqvfgf4x6lmtuwfnlfchp84vury2qobfflmk6msr0sbvulewr9n3nf5nmvz67ahyprf1htdxh1abjj7gjzum1w8ico34j2al4t7ca0zj2ojs0jx5bk615yg1nfj1exg02dcy7h6eodxqyledrciqkfkm0udmf6fa0ymohv8u1siwvg8ei6m5j4q1rgz83doyf7p30sc718mtp3q2p8hmg9jhcmg8vw75',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                
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
                id: 'obg44gulpvi4jc6azqxni5y1aza9kidv3unl0',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: '96btx3w58y9v7eqp4g488dl51a1e1ffw1iyhseeny9p0jb21ont28s59rla42tdmi2wn4rejt790plgygfue8mn2o7dtl3qkfhze6s89q4cvrqhwxp8fph9ky17axnxtdgd3mrszli2bvjfjr17bso86ar9oo4ai2fn03f3qc76zcmqdxcxrp03zn1v759ekv6fjcsbqje3nhpdis6cg69dyoz5xl7dwj2o2dtf9qrb4csnm6b8p67b3y3tqa2o',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '2cduyboxjgbm2bjn4mwar5c4n813uk84qilng',
                name: 'zhox03mbwbko3ys5a2wgv742onob5v9czlje3jo83ib9xp4wfnykjfo5x4i3kkqa3karlg0r8i0qezpajx35xuhzpgzdkkq7vpb4luy4aznhds301w0gz29tw6lg5n7zgiiv9jvf0pl4hxxv317zh5imcfbiqgx6ktrwtuw3ivdhdihynzpkfsiggc1jvkmxx6gd4hob014y0z5rwxgpocf0cqz9sqsqehdq5l2lt3e6bxv01851q4k22yumqxb',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: 'n8fm69whixanshgb95xwzabxpqbzucqmfflhadcddswk0fmlgu1b4409xesx4duq2pajsaqlawv2s0141vp6xy0lyp5jsc6e6qx9y8suas8e40s97x9rgdszlca1r991g871u79xzokc1ha7w85c6dekneij2bx4gltdhcpmoyf9omba7j0jxg6o3srx9r1o5pro7cdakjbh7mepdrvubcv8wcyyhb2orv31cn360nxqsxg44ligutnjbmnit287',
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
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: 'eo7hakhi6mdwngy82cglhpr0rmacs4z0mavc10sctkd43peoq0zdh1od6sa3o7kigtguiejqsytach7zy7umszn83v1221fzwz3qgy6xeh1nm2jyrhza5oksi5ew9wkmdevs7bkntu3jisujdcockrojbtz2g6pehi9508ts2wod9v6vhe29q3v41iuv0bm87m3k5m5hjkvoimez2bxuzbiuv8k1r39l01imhnic86gqq40zciheivdef94pr9l',
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
                        value   : 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'));
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
            .get('/admin/permission/fd846731-17e0-41fd-91d3-ef3d4dc1003e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'));
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
                
                id: '2174d246-f383-43cf-bd17-eb65214079eb',
                boundedContextId: 'cd7c290e-2346-470a-b4b8-04053ddb39f6',
                name: '2two4jqtiw1ocbd6eazu0l19r4bv68egg6fq77qk17mat1g4h4cvmzjdy0d1pqu3xx783rt8ksikiyoc082l5uwvcbglkz07fzkpln7ge122qvt87erg5qha5tyc8ib83jzrfj8i6p7fmbeaf5n8rs8b2cyd1ysyiedxgwwydmjfmdfcdhz2ljn6kczv5vrmy1rxivxqb2tycm4e26c4ozg5zubblwi3jai3221hifz3x3jkq1eovvkarchrgnu',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                name: 't4aauptmmnacfh5wiq4paeznq1yqgzgo1s5b08vx245fvo56p8cshfyr9dsdtybbir1fkvyvec3evknwymku9folvtmu0yzzihfmui2625w1c7bjhubxuy0tu8u066bhrgnuc4cd5zylvmc3tzk8l9f3mk83fbnc2nb08ixde5irrk7pbp4vt07g7qtl0wrhtxibbvo7qvpm6e5yi5lwtlcw885q85bevnyut74ook1tudmlmf0gk7yivbtjzr7',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'));
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
            .delete('/admin/permission/fd846731-17e0-41fd-91d3-ef3d4dc1003e')
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
                        id: '93b2627a-eedf-4508-8e8e-0712b61be183',
                        boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                        name: 'l2xdujccc1j2ssim21gcsa5rf7h0i9dwb8842twzq1p6pn3rdpvdf57xhakxuxf406bxlyuft5u3baawfc8954phk89fas6h8gn29n5mb2gxwvt0czl6mvenu25vvk6yvo4ls2loaomdix5tzfw3j7b0n04flh4p0kxie7wwehjkhrrcq5smc97w62nfmyryo2eh2aofcs815zbg8hdi41yqrtm4evs7php6103sng5kjld7g1omh7mtmt6sdba',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '93b2627a-eedf-4508-8e8e-0712b61be183');
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
                            value   : 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('fd846731-17e0-41fd-91d3-ef3d4dc1003e');
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
                    id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('fd846731-17e0-41fd-91d3-ef3d4dc1003e');
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
                        
                        id: 'bd9b56d0-98bf-4dfc-9bb8-a2e812d3be8d',
                        boundedContextId: 'a2678501-02a6-4508-9378-668de4b580ab',
                        name: '3rzu507pusgckobflhg0w9467so1nfzbjq6aka4d3e8qicbh6htn9h8l6javkzy5h896l4vrjm5vxckvu9l7db36r4q6g8lznnjieyflze245oqihmfu5vn80khcui2t5f3eew4s1igjaarnre6wh4dk74e65gf8f3rdpulbio1ddcsj3meoma14iqtuhbehw5o7301papgqmumgz13v7h76uhj8ft6nuawcvacifqwyv2rpl0m8udan7zbxzy6',
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
                        
                        id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e',
                        boundedContextId: '54c076d7-bfae-4a64-820c-2e916b9061c4',
                        name: 'nchaqp1egmzogtzxb0ik5z87xvs5ceyrwlbe7rxsew4fv5g5acov97ms9qdaiflo6lb0ycd62slexhn9l2gtffs4s6qz6n1lqcpkbuqesgimwo84e7k64iq1wrzwfna187383vt1dijjiswbxja6rjezgjnmdhsyxjkw9679m0lgnrv3uxiuy7i6q00zvlmxoha88dgr4ouajsdkjezqmhc494ycfxegft01sg37q4wccwboqjak992d3krfgza',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('fd846731-17e0-41fd-91d3-ef3d4dc1003e');
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
                    id: 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('fd846731-17e0-41fd-91d3-ef3d4dc1003e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});