import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: 'a2fat9299q7t9baq283vbmf4ucj7xwv7nyotvcd0ii98aiqqny',
                name: 'maq1s45etc5scgj2e17sc2yfinr4d4zcnzp17887tm6rq6misx5ne4pztgt3af5yrgkr8teg31p9mytcsv1k6pqyl77fm7rcgpwwhsmiv9bfcx8azftw37n1mlh7dyfuoop0v8jf10rm5dg0oyy8rn7w9qzk7uku4zu1zm9x9mudhul628l5hhwprdfppxlrd1a1ulriiw8bz11g5cqq57ocuwuito799prk9sx9fhvtxi0fc92dwr6l1w448pu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: '68hpsap35kizj9kjt1ww2rhi2cviv1lo5m0ms0yydsxbutdby0',
                name: 'i26y89jkirhfl9ohnh0xfi3gccvx99laqpt920r8w7ot2h7qbhh1uvk8kn4e33pdigl0q7oeayzpl6khyzcy5s45q0zzetw0awwtuotnb1tdd34ve7jzsd6aje69gy8zmcry8hzwhv3t98320fu7rsq9sgp9mguc5o646zmnte7jc1lnwp3qif0hgifr774dkqid71m60ucn2a8uwwb9wdjd0bzt3ugiz278ac3qg4y02vomusae5048d06ltjp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: null,
                tenantCode: 'wb21cpqiamn4nt4mlx4vo8x3j6ib8brkqwcrpi49qqh29ft635',
                name: '1yilepr877egiblxr8e06elqip94mbz625yuo5t48n23cgll6sm125bds9a6yfkjnlkk5vj45c8qd7sosht87u4bhdv5zfnfw9kogkf1kzn3anw0tzfarvmh5m622kvv3ths3v0qrol3s6crfw44r78o2hi1hmwhemj5noyhf68991akee6mky8ojorfj3vnvbkek2ojvesyruuel9fy3ngulg16nbgciw0j77qandg4vl2n7fy2naix0zgyydq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                
                tenantCode: 'spsm4nkvtpft215ohrsum5rzopxgnn0uf20ce0rhq7a42abdvb',
                name: 'rtjme2gmmjtzjjsk7c1ln07u8lzc5puh7cs01nahoavahj0lz2ei5k5qowpa0k9yviaygsdtv2vrbfw62c6zwyfa10xtrc1ukuobkx3djgo4xcx9ofklnvc0m4615y13rxrx6iqmyhogm17m3tb0uafghiw2lwy71md42g32hoh4aqy9s48if921ax9h5vw76t82bmjcfly63z1mjeo22qpgaw15osx2hfsclbgiruvnnk66wfjjlrarnfphw1z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: null,
                name: 'zq5p1itp2i6qnx7wbsu4kxewyngs3796ghor0su55flg08hru0czl50tkxxkjovoewerv9su5ig0ttdhjwv8teqierb2ed4ypyuuirdhcvaep7p9kjhi3i9o6dsgoophryu95rve2f6t39vnco079hbswycwtm0pzvxru965hupjoyhsivbymmjgfimmu35c3licuu3e875q65q9y7v2ps1h6h5xiz9d29lqjz10qh8mfx45yr4jxu3bbncrccz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                
                name: 'dueidm802aelkieqab7c71482tximc4isq1avgemr02nvhg1khq1r9bx49leonendaore55v5ct3gxq11e6jitia5lkklr2e50lfhiac77sawg8twp3c38m76hwvmss44lpfukyw2zr5y8hjt0l2q9fbvs1218e7yxf2bil4npfp4uu0n608s2qe22tzs8qdgupm8z2iejk1ccuys03m7aluu0sy62yk50zgmtuedoz8wfktirqulxlg7nhzpqk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: '1zxjd0e05oj042r38xe4m1a7hr821kx5qqy83eyyvk9patr6hx',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: '5urp541ugxkpbppwga34ni87q29lo7x0j9t2nazqtyf6h62r2m',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'oi19ae9utzsu17fl7oa08biw6wn56rps3hfzr',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: 'fbsgt5t9vcndd0rxd6w3wp7wmxkvv5djcvodj29gguonuxf984',
                name: 'j6agtc58cd9w3jgm240g31wl0ow8cgwvlz8ivj90hy7ou3odenywmg7konzogv79jszlsebss3h7nzhvkt7p7y5g7vdnm4a5smxf5acloniuon2z6ax4j57fexsknbc4a3dsv4avayzn70v0f6bxysdnjtvrxat2n6q07y3la75ac1tw0490lhzj1rslldt1whzqbu9jw5xtbs6acpjid12dwxu6bs9m2c273n00c6rycb6yghha7lwn7nhxqzp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: 'do17fklvjfkk18r8kvd1u1xe0t36b8x3vb5vt',
                tenantCode: 'pkl5xy48agytizdualo0pv19swx0get08xa9w62oqsiw4bc67f',
                name: 'd0pny0i9vpigawasuxawk2gw6oxq7gg136dqmtwbotg93zt9q7911msd2y55gef5q6g7qph44k79itssumy9g6gt0khhg4wod7b3i4q989nfi9n1q4mr4c0qzxleqf69oa9npbapk89abeyza6e69n3iy30o6dm7xcoyr4s4grgqo2yr2wbno0j53wjj1b62vmt6pmy54v3b9ce7cpynun6nrzl51fpfyna59i3mpe81epav16g9d4pvufglini',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: '5leq60j8wtdsiysgns918ah02nxfw6clt31x91ytkygwnmtmafv',
                name: 'ji6zhkgjejrp2uwl2an9rpe6156xi2lleg7k7k1c8hl5aol5l6ghdu260y5275deabbu0ghra9h2f0dhzx1hy1h9k438pkgog0sk7tq17gp5oqiy9w5i766ss2itz9b5oqzon4mkynpfmkv7ksmhwez11vstpa4zujdqzr1ynof776kjwx0hl2k5932byk6ptbymc9v6752c7yvk1semia18au9kepxg3ochago1in8okdhan8cneggzr4r91ww',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: 'f90fs5rmdbfl9mq0b0xblufidg6h3vl5bwtic4pqty4slpl2e6',
                name: 'fjq5sy67px8uo9q4xcf6k0zt4g3zupmayjqyu5s60kqv6uq91m0vhxo0tt6y8bgmg0lxb2u8ewya5u5fqmdig3ub19maihzx5kd8a73y2u0wxfzke34b6phyud4687gkg71hmp8cld7eecqhkn2ssdew95yzcwbsmvkqpvfxhpwzr7adxodt0qmih1b76amx8y4fkl12wp871u2cvzz0j12xz5ezhtt8mkpjvo5gc6eprf08vizgelsy3crau3ck',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: 'r19b8r4ewyncn5erwki8wvc6po5xafwcmwl4feo2svpvpmqhhi',
                name: '1ubgxgiglb4jsw2ejsci9sxug2hjhtd9t3kzrvyb7b7ltfocbzw6riq333qaksy63vv17adhsfn1sr9cispype801w80m52jk6u5llopp0k4upfyled2v25venlkudzasvfc1oz2qj50hvm5opy0ggkp2kg975c2dxejey7hfp3b7c04dy6faeugu5am111cvesuywkva4j85qx8vi9ogu9gxpdrw81id69mfgze5ei7gp210kw8op4jtrbjy8c',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
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

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '30f9311a-d2f3-4945-bb50-6ae06af101b3'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/83adc055-77d6-44a4-8639-7b2b9e0e0c8f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '2b7c1fc3-6ac9-41ef-ae76-d0e26ae1f4a1',
                tenantId: '1bbba5c2-bb19-429c-9081-f7485c7964dd',
                tenantCode: 'kjih1hsszqzydn6x13m7avdasj3o2txtd7du8xt8umu69ngjqd',
                name: '95cubr6m10ocobn85d9wyp89b5ipf4kney64chz9iam9aifv3r297rxgid0u7mq0nsidhzqlpvw4bjfrtip7o41pw9pnvc0or6hhnlapeu4s3drxsyp0c137wekjgc596pvk3tua19o225nh32scu1s04b2xdoym22ravxzjpyehlc0qu6pbzztczqb3xog5sqyhqacx4jffmu4ej88rchfwm45wxntxxy8iocz296vqrstfbq6eeo2zt8hto0c',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                tenantCode: 'e60w3by92tc6b6o51y2geuuq3gnz6wgbwmkisws0dx5s8t09f7',
                name: 'l9ctvon6zonjeny4xlvd2uxli2sykpbg9wkyvz4ahb4r7o9g4ufr0wg6kl1eca41h5o2dklcjzrpq1dubbzk8glhtdrl3av2ytn4vl87x1ugg149tue5aars0w6ysaw5c67gzoxrzxy27w8ptmhpjkmq1xvo4l3qrrhqi8kz51wt09viwq9eqfkb8p7ty147sgh7aiplni9931ksmr8dckl5rog4il17iy7nrj1lslvy8hr5w22xlaey45depih',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/e06798bc-9a5f-41ba-a6cf-a427e4d71d64')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dc262c47-3200-4104-b42b-12aa44c362d9',
                        tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                        tenantCode: '42l53tzuj57oowp8qfa0pjyvbrh2ok9ncxhs4gd5fkj74t5fbx',
                        name: '0kdijora3r69eyhuwjdiy0ioz5cmhixsdmk5wb73rttt3klewq6gut38my3n14uxfi592vdomvqyftoze28oj3vldwk6iv6xl7m2kxhwej76iedtcxwie8bivhln3j8sh0yl6vn1nmakmdcus4ov2k8whgnql6pqqibwdumzombj5s3lvopylhyuek9zadnkm7q4ruqt5qrwlyxge5m6pdgq20vra2gu8wh12u83if898t486bhc5su6wwrpv5f',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'dc262c47-3200-4104-b42b-12aa44c362d9');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                            value   : 'a4743e82-8a55-4db6-8455-3ac894606b2b'
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

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                            value   : 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c093e275-075c-47bc-bca8-03765bda1eee'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
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
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '97de9cbc-261d-4e65-951e-3a1119e0ffa4',
                        tenantId: '031dd1ca-ab9d-46b7-bf62-c7cd5749f17a',
                        tenantCode: '4akjw54yjdkfy9ukf53nnp5j98yw9s3pltdrtdncxacqhtmgwd',
                        name: '38yr35j4r5shiox1sceo5273mmqfxv33mwwoegkaty2up1bwu9eobh0ca3btrikfy6of1ufpf45w5niw6zs87rfcqxzyvk787vp3g6h6u587u4isime4vgakpax7ifkqczfcecjg1n3wy4i4jrtv4ky36lic00snexgirfdrrvfkc3h4cco75ggl5znr7h1bgcseaqcqe6ozd008ik9u17mmx5hgb537ao32hy9m5t9fhhtc7s28tl89ggdx0fx',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c',
                        tenantId: '64a2c4b7-7233-43dc-aaa8-5e7554b9b380',
                        tenantCode: 'o785c2gtfarkylx1g8y7c3fpxjmsfxj9jxy9qh7zwd1x0o4qos',
                        name: 'cc12qrva08d8rrm7uxajncjar1s98i52486796t91huhw3ho4swt2351s77ry2zk3zxuv0htyz5vpcgi7u33djbyx9j005kra3gv8keayjgjherniyxxse324bik1f1ln4mhjotlau9dwgwbxue4kpqq02ch17at900kp1aak2fivg8vnit529cbfv5rbcvt53y39jlkjxwspk033icohbs4n47etv1333z65thhkduqcml2gxsuprhtlmrvlqs',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4984fded-4474-4962-8145-a9d11148c4a3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});