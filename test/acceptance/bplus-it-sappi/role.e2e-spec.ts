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
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: '3i49eoqc7mt445ogi9l2vnu10o1z02jytdnwa1tavgn1poj3t6',
                name: 'ci7a6fo2dr1wsifl60n2gnj0fl38b4sl9uqw71yv1sppuva4wdhq6vtff8mu9dbqdexanh8k3einofvt0un30aov8757he5afij3tmbmxlqgm14iqbmq33dgnsxjgg0mkgfib4en1qnihgk8vwerjrfd8ax1zecour12o1h0wkyyv442xzha2bl7mbfcx4kmennrqh5jjmb1vw9st0yk90sguo085cdj9ja9xgl5qnwhysn9l2eaxkaef0rdad9',
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
                
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: '8zz97nouimuwa76bdcxiwwhjs5qyntpbsvtomqbyybr5bvjzd5',
                name: 'ri5uay9xt1olr36m5cqshtjm018swogfm2tyd45eqyjzj5pn6w4w29fhvr1lpkmm34f0a656tw4mma39u4kdcjle7ie7bzaez7dchawxilj640wnby6kwemmk3uawtpxla9bjx5rszn5tuvsrmri5pmnrwdgaxq5s4twi3h1dq072hhm59jqe3q91v67npjozbev85ozf4ur06whcscl4dvapkbzh7amw2t4zdad06kwvfoyd04j5sspzz0a0fn',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: null,
                tenantCode: 'zu85a0yqna16y9jfqkiqn3kryxn379vfo9yca8fl8r2k1ndc4e',
                name: '3kfeuqfa9mlfc8xgraogmo9aqyv4q1nhg1t1bxoeb3p56xto3rnfxfu4hzxs5e8jv8l19jjz4mhha5y1158pou6fkeokmtr1qffaodszmq9j5snn6bduoyw7y2ck50butatw8udckeytuxo4z21c2ar2gy4eqcpyqp7s8745ppszw7iu0o9qurbrouypatgzd2thi55ad1837hshb4w0oh2jj5to534r44kuoylwlzyn43p8elslz5brvy4b7v1',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                
                tenantCode: 'xjselep173tmfh8z4h5vrnbz5cvq5mg11y30m9vdxgmmgwuscv',
                name: 'iajynxm1i4jtc9ogmgyg050tx8vz5vwni0bchz78tudw9bhepfc1t7kw6wz28oegxccsr2h5wvy5q0ru7xizrqxpc0i4icnlyejxutie56z5pdxhsf1jj6qjj2y9a3pp8fshb39v9p9orec4dyodnvsboe54m8b9iuwr5wmz9pfw88g9gez4ktdgn4tcg3q9o68k7z3mnro5e4u2h7xwm8x5hfrfemxa2srv7h2u0hjs7oxufnn3j96tyrmglcp',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: null,
                name: '695617k9rn1oqirwxzmfr1lnrbdjitr0cpjnd0o9u46poibehcn491i3qe74d7schf9jayblemr9bahfdzgskkqnn98jrp1e6btuf0lh6reukv8g5li2pw0ecxav60jexe3u1ss4kxbu41bks9uev91fxx4o1t9s494pn4txp0u7k02mrkx5bp92o4k8kcb2gvoc9cz3cgqb3mouxlcpzm1qluf6aprzdeh48sot8rqhyxdgwqwt8mn5lr9rd85',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                
                name: 'f79gdwon4ruelxkn9xjcncoowg86sfpiubnk8qh03k6za9el80falga0vnzuxvhkl0169igka6s5vrw2d0ghv4un9o9eweykdcju8szl60atp7m237tcy40cfw6ksgfzqdoskfbj00ohq6frjgf7g1jlpzogccoe63hwb43r8pufaviidzrazgbe9ddg1w9644uj1n8t09rcqjmpydj1wmj881k7cpyjlaqy9jw57byuppg4hqi4a52cgot5t8e',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: '6r4efzc46irwb09szlz08tc7j6z1e4w6c1g5cr2q4svkcxcld2',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: 'tgl8oz1i54p4fbnk2x8e038p4y7znkm4zkkkgcpsbrwbsfk0w8',
                
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
                id: 'ko0rj8i9dokuslscjdrm5obnez0zirmxyfmfp',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: 'cs3xgpqb5807dyy63mtre9cr7j0gd400p3lmgbklwucr1u3o7z',
                name: 'z7lbsynk3d9yk4lr5t1n10yy7dtki76yupud393q5q5k2wj8ghqrfnfkwc18zas18ux17xyq1ejw6vi1s4ofhqdj0xevukr91yn8fbkam1ybbznh1f40a3oljfa6gwr6szf3syldt9q0i8z34pzfwmgihbquxx6ud7wvan934d51p0j1v86llw0rbeh0xqdy9he3czr2t593ocqf1igg49ed3sbrwr5yig5jorc1e8xzofcx2j5wb12ai7s9tk1',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'kh7nzvdn200d2ypiu3uat4xs75n26ju463h3m',
                tenantCode: 'oh7mhrzrg3svft2h53ovsfmlvm4r6os30kw9bvyk7hlmf9k5ld',
                name: '2de49rto6nlm2myjolkn27dtrkwm2w9rng7y3xt1yju1zpo3xfyp2r1gtbfj0aywmxo6y85nkdp4dukl2blyvlyzijiz0de0eh27jcsq95q1budabj8vmjr0o508jksjmym6p22f0faii53vkbnqv51iz31rep657vk7ua4b1sqztdpbeaw3hln83dvqco8dpndnhar00ubbik6091sfvwunfzh4qo38d6k63kr3w9npugjar8d9r9eu0gsutws',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: '9u04mkgxdygtz68sbeavb1hlcyuqilh3tyoz3igprxh61ccxygx',
                name: '0iltmn5zqiu7zub3xyst1imf3edbvuudu51dxg0qda49ph0a6nmz9rj9jjud2lihif2xdvs7m57qbbh2n8hpyu7objkkgfp3o7z7x3xc8um910h88e0w413pwi2ohrct6r1qo7a9p1zjramsozin8kfkdx0zufp40hg9034my9c31mq57zp773ock9o5agx123vgd87p87nbg1m89mrd6eh5q4e7ob2qedflvuiohzewu1gsawsc5nfz8enp1q6',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: 'ou08yxv46z992hslyckjp3q9uq2s0bdrbkmmtcwds206z0s66x',
                name: '4yblwve21iar2otts72a974k3v6hyl2d5x3gl2onqbbjsoqvv8ejxzaxjslaoxyc0iqyrnb8qq5krw8cx6viop78xumrr17o1nhsh4i5xrnwz15q4v7cr5kyghs32m5r7md6ybeh04dxxy6dq5qgnf4u29b4lqcf9ubzokk509tepw9yi40scvwc54lbrc7xu7dj3sg0tuh782tt8dcd742ppqkreu32j0zxi582ncgdlc05codjzl9tpfcorzbf',
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
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: 'uy777vpbzuzty38ol92um3blhluauzi38ytxwhvcibbaqrbgi0',
                name: '7gr8ocf6zq5tsw3wwrgmay557sw3fmi19v88zma50lezsx0sollwejuucn4wwemaiwx1x48cx6ycz1t3omgwx4bwvrc0qbf6v072wbuwzgo1xkfwc6jtl4bthfcv4uo3w62sb231bg9c3xvq4e9502uyx1e2maudaipny5vu5tgg87s84aionhsc5kf6a3hgp39od9uoqf0iwq47p3rpf0h1zdbmx3baqoqhli5m4crciqmkw26gb9kv674y78z',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4714a3fa-28f3-4057-a74b-e64cf9a9df55'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/4714a3fa-28f3-4057-a74b-e64cf9a9df55')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4714a3fa-28f3-4057-a74b-e64cf9a9df55'));
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
                
                id: 'f1bdc03e-6dad-4e1a-941d-b0b886915412',
                tenantId: '4867fc3e-8876-4ec3-a8f2-a341ab641f71',
                tenantCode: 'f5mfallmzicly4tldox9jh0pfasthqrbic5wiuuvg502g08pyp',
                name: 've55prey5mgk8g8lznrklx2fwfy25wdmk7f7z4gz9c2wah47gsabj5vzmsno4dbv1hogkl7i3b88wbzix7h6hp0scvbgblzpy3qp2wuuexhffeoygchav2en2zjdb4azqg4poncdgdu8x6dg9z9ffoh3yp56kgvwyzbdukam8h1h7waoj50u6pha0s2lgdj3hbmpkhujsemdcqmbx0x9sjybs2igkyj1r3vhe1uaymsafflc43d6kofgh6n7qyd',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                tenantCode: 'rfk8wl95371pz0pyvie1skyxjjxfzwl2nxj25mt0w95itggwxi',
                name: 'qm0rvw2okod1hf91d3hygeflfj89biyh1tqayk804b7dct4n8sbzu97hb6sl8o4les65s90owwh39epau0rwgsrg8wrmqjf8y214nbafhq8cj3ljqueqkszdwqabe90pl5puaimf8lfnz0vvirh023zry22aqodq91cdtvu1ug39quzi1w9m8y5c9nvv4sj78iyv5tqwg7szdazkhibzhjn9fq0aazs42b8xr79oitp29u8l9pvt0pbmzs79d6e',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4714a3fa-28f3-4057-a74b-e64cf9a9df55'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/4714a3fa-28f3-4057-a74b-e64cf9a9df55')
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
                        id: 'b15fa5bc-c558-4411-a1c0-9f39efe3b5c5',
                        tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                        tenantCode: 'bgk15znln9m0jfel3e2dhy22th85ws6od0eg779xurj5bagbps',
                        name: '78nat7e0p0p1v4vj2dvcfun8goeo12u9nyjo0pk675q1x42a1pyid1uc2c4gpjkbe235v901xa2qld4j18mblznnoz394guk5u3mqrq8owc4z967qsnv7ilr7l4fqcibbtwxvf9a3rh29bhyy77qnq3ljzmwg4paqjxt5nv3sin3004j6dtkojn9cispmi7dq03zaexzo0am5hrax7sfpnq9npu1ep2qdh8zptv4yg4zy4ney4dtgablcx6q5xo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'b15fa5bc-c558-4411-a1c0-9f39efe3b5c5');
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
                            value   : '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('4714a3fa-28f3-4057-a74b-e64cf9a9df55');
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
                    id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('4714a3fa-28f3-4057-a74b-e64cf9a9df55');
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
                        
                        id: 'c56aac55-85ff-4c76-ac38-10096feb4132',
                        tenantId: '3a84334b-09b9-4832-a7f3-e3bd955050c3',
                        tenantCode: 'wseoaqo4wpauelmiiora5efnuye04z4wv49qe0yupdr8q5sogg',
                        name: 'capfg9xiz17ki2zm1vf0zzo5dacjmztpcsossb6m18s8c8ufps7at2sm6noqp7jf0mrihjped2ah8dmtje36dg1mmtwdc3p03r0vji25yb8rbi7mdsphjg2qujdioyhy7ne9xe5tjsthun6sp066znwumm259m4lu1nndmgc359e2brm0csy476oco2nt0jzvl6b3gr67ummdgu6c3nxa13q1p54xv946l5z3e8vqdsuz7b5vgpvx754parcjev',
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
                        
                        id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55',
                        tenantId: 'd83bbfe5-040c-465a-91b1-e0fd147d68f2',
                        tenantCode: 'izt96e8okl6vjs26k1acs3mx2dx35w290pgr3v2sjzhvq7ikqz',
                        name: 'ee7s2k7rm6ihv8pw4uf77uvdq5y7yd8wttd33dcvgb55u8qvklye5zcfy5eu18iu5f27d0z4fmthenbm38fcvyrunfhzgt4fmm1rwks4bwt9mkpxym85dnxyxyi8d7rxy2qd6j00jto5birkgajgbpv52rmzf9ozag8njtl2zlrbj5tx5zo2ful9lm6izh1lu1927oag2ye0vjp0cu6taxork4ciskfuzfcz44xp3vzf1q0wtlmpvvtul4jjb3f',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('4714a3fa-28f3-4057-a74b-e64cf9a9df55');
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
                    id: '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('4714a3fa-28f3-4057-a74b-e64cf9a9df55');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});