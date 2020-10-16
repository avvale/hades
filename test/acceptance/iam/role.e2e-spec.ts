import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'fp6dtdose2wc534af7ghsny3xqx2bmf20o4nughh3zoij7gltntcsmbe1ry0no0qblcafonct1i7os5ddd4bqyb7r83pgqoahvm9t33gzovnbmljnp7c6tt9s5r78e3xn3ifxvuu7gzve6ts4y25wgzsuagxkmpdie0s2oks13qofo6p5xmsds3ojvzoppw2xhyik87ln27cddp8iyhjxz8htbzm4z75d8mvkpp1nu4s9gagwmd4ueak41msjop',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                name: '359yrn6vehdgf1bd72oxnkwz40h6xatspseyedua3ka5zvaqesvbwbv9b5k5iwyoexwlrkfvzw0cpdekfen7ngk6u0soraz9sm8twc54as9c7t2zyswe2rtg828tbx7i7dns9t36imlu85hdmy7e860umsym9plgi8gp72vsut06dg57pqpfm9816exvb7i5s7dh6fbkofi09szc63hvymwzimrp9xonsnz5l1w2fc10xp33f8wqgfh6s6yszy6',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: null,
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: 'nub0djf6126qenvou1xnzkgv35dodga7af0hdnchxb33g8du9jym4fscex2ytwzt7ofenroep5p7ytt6sa1fostq7ib184f66nyaidecrqjzib87n4m1f9zxmogoqkzy52qq9v4rxap5k64c2fzz3r24sls3k2vfyidr1mbruhdio163g8h8fot7plw9lz9lvrmo4fmgjj3cb6v1fzphlzml2po77180d850e2uql42gcbgmcihl57pk2uyjv2h',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: 'yejjl43zy20h51lknkvc810se2wmkkbfuxreopgvnhbfob52uo0jl3bs13i9eb496mxnk1j41s15f1furltodo96cka2o71bpzmmbybkpe9gvyr62brgqksovbyzlbg03feqmgei946g0hw93cy1wiwry67cswuwgoi34nxowro9bofuhkzoxg4v7dzm4z2cu7ewxmz990kbphuk78p48hnmvtdxlxojdqth0q4iurfbdo3nh4umfznrmp0e1u7',
                
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'e2wlg2a9gwts64l45cv4it92wukbo2qxcjyfj',
                name: 'ho66zccc1anyr0ls19mkdk6q9cujapaij17k2nhblcax68rkml2fv0gb8sprknuj2hgk63m4ji344tchxspt4pynhqdd6i9jlfpue3f3h29u4xyao9a5nhjm0vmgjkzcmvewnjtasv1ob8trhkzh4b3l35jxsqlla95lzjrwgc88c5j8wp8czulphs6n2316pzlsld212xg1uciphxsqnwcy5enaivfkeuisbrh8v4w92obcwqbam912wejr2zb',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: 'tyxahesfzyxgyi43ox6npg5pzj0ilvywm06gpbwf8khxsj508aru9utupp5n6ze4l3kglh5priop3thf12nh06cbk5op3my0cfvejqosara7il282bdrgy7fdglhlkt1c2v5xtv1t69ur9s0na3p26yd4he3v9sbnpuegdj7g7sjzcldmxnc1c31ow1dguyvj4xbtlattpunaah7ndavehakfv39029nov4vyuhq1732bazdmxa8juv6ivdqt1db',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: 'r525m3m20bs7a1r11xu7o1hkh4vv94b93zsxfyqd2x430q92kvepahke1v0qg8uqckrmjzw0wo3e3hmd7dx8ew83gf9zn0dswbwbvk5wsraeoiiazqr3wc3bupcs4udup5x7414bagzcd3lmz1nfwtxzl9lo0xq1z21b7m5ujae8h0cbyarcljfxpciw2yb652hcg19wkdhv2q8vppy395u2cfnxxavfz3vpjxr7vr5q0k06e9krw4wxsi7ism7',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: '3bucorl830q1i7d6pp0swzhcajpvmy4lm5v7jk3eb9q00hq12mf3ktt3sufduced8vhxae8b4lvzxuf4odkuw1zjpoykx287qoqqmsc8zda8zxfrkrihwufvuavswfrjpzdzpql6eddyqh1sgs28i236rxbd9feme0d93wh56vrs3pvehpr5p67gc0b7fsf6frud6q1r0q3ixkztc4oag6t5ewmna34k5bchds8fdt9lhd5eldxefbhsciro7zg',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles/paginate')
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'db38e08a-35b5-49e9-8c60-95daaba4fcda'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/f5582ad3-c968-4c91-8da2-c6629853ad87')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'));
    });

    test(`/REST:GET iam/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '3d08ad19-f61a-47e9-9165-8f1c545e4cfc',
                name: 'c1rbmw5sahjwrvrp1cpa1ehb728op8t4cqcfn7dfyluio7mw9u6vkfvvbvqb6tove4w2w4g6hd5ts1gevq13c0ax9jnxp5vstx3g0pheqmskfqz2xekglhmsaiwgkiutrs4kkqwfm22rur48a7m0hdaet7zw04q6r1013y00aol07kxyqglz6a6neb33tp4mjiq11ckemz0wxdtry2ee0ayrcl3ui30chgnueax5u3862durkoz64rnjg6rk7ac',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                name: '6ymltot1z1azisrdbkaypuicsbnls4lzj5dlzg1kava6jkx90wdctdxknuld2jnzt8z83osqa2l149xjqb6wu4f07z79zbpm4mledc3j2mjbb32qwpdu63ny5uiqii52k18p15x3s5n7x8yxxbbxd3yi4qk38cw58r91alkgpc9vt5mcf2201ok3ul1ipsmebqc1n2wswwy4ixl7k4hf5xgyry8rb8vlha83fbxmov6s6nfpdcjavan81emohvy',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/94da7d42-dba8-4fae-8c78-6c22928e01a8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
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

    test(`/GraphQL iamCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1d52ad81-fbf4-472c-bdaa-21abaca97ec9',
                        name: '6895xyg2dxyiuw44m1co8sfyem12c0bzu365idftctkpbtet7q0anm344dbaozul8vlnvdtu220yrobsacgaeppep2k28w94pvcm1nd49uuhrfjppx65jpa6xqz52izuve50jpddrs1w5m6txus4lajjqywapriy1c2aypzqdfk0eu84w9ro9yv4rk7v11xp2whpvzylxcgaevq91fartp5jx6inoyxf87zyh5qpmcwsaa0fy4vofpqccnm3js5',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '1d52ad81-fbf4-472c-bdaa-21abaca97ec9');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: '137c408f-ab2c-47c9-a968-4a76b8aebbbe'
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

    test(`/GraphQL iamFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d0fd4d5-e8d1-42e1-8b7d-ec9909743287'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16');
            });
    });

    test(`/GraphQL iamGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f2d58e65-3391-4548-81f6-8db4bcacdb75',
                        name: '8cjxfuhqd492vccn06pxx05xu99p3ac0oohzsb26yp5kgg2gim4chaeh6yg5iap0qjniu1l4vy6vd6w2ez8fajvcn1113ahg7hyip1z4ztb950vvf96ojvwrbt2nknmwsqgqhjd7s9pou5gnzaun5ahnjl59ro07l46zm4aesqw96jyffv9izu6n7bn8z4foyw3x7t22tyrxtq9h577f9v58n2mgfxpm9n8pfjsq3toc06n9cdnw21hx9l6o2jk',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
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

    test(`/GraphQL iamUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16',
                        name: 'ibmd6pskeqli3x32gtw1pow19c0rlq1zf84ysq56z7i7u9emdp0xnyoqpwu8lx564rq11luwpzk2ni4nijzmtvnrrr9katiye1fd99g4rp9tfxevdl5gy9iltlo47yiucdbk0oi6aasi9a13o0jmx11akrvkfdcl4g7coixfiidk85ay6ko868y6i1ujjix69lwfvp5lwqjwfng1bbaygjmzaxebltq5q8htzn2h521bqqy772h19kvsmhk1p7v',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '75b85811-0bf9-4352-bc7d-e6e3bbb6decd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});