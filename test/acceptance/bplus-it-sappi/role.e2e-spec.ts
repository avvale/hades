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
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '06oh5njgrvzuiv15auvnhbt9h3hl7tukvd7364g62gox8jp6i9',
                name: 'fd13ljx28r556u3wriuwzsjyqs9ggx38f5yfu79lq3c2wycoxc1vd3bbfl22ddizwxz076i2cnbolxgu8pcnnqii1mrmdvwwfxbd9y30mz3geo1xdug0zp5sh03av9n0ptthpu72d0u4sp4gro3jsqsl2gofzrvfv4s1vp5kucjuizhke2iqvk5mrbhva2b257zv7qqbga1g81wpum2wklvnxoy53apgunx9ayeobl5rewq00gwckrq1kd3628n',
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
                
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '6elize6j4lpmvpdzckyon7r7yhs7tos9lkqma80xh1eyriz6ia',
                name: 'cwxgx4yu7up72ng48jfgpmrqk2rh39zdekxd9xkbcote7042sxm83keb2x7p7ex6qn2op4hqsrwu0rz2tqz8lqj7iq9fbeoz0odf3fxc2fdioa173in1q8qqzv0zox0tcps1mfkywchwxwuu86o284llijkts3ors2hdrxkpjtalmpq2bm8raxzhfmdvzznppoc9fshrmmj3vlu7ygz38e7lj9tqmlvgzmxfnvmctqpd8eqwdcfg17j8129l2vf',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: null,
                tenantCode: 'lx9igz4wspio11pz8dslgjk93x4sduqidez3g56gx653abesti',
                name: 'phyj40wpin1paya2sgmzct9q8ln53zclvo1rymf67grsq1ef3ijrhn3w6ew4yif2r9qgj9phk4eiion3b6ulvg6eby03e4p9qhgqint0w96wx44m8a1q91w8gik6cranohqqv7axibomhlbv71xcr8yzbirp86m82ll2z1di154wno6r0dsl5lm97sxt8kqvjtt773ukhkn3tef5en5891kt0we2cgrn2nm77gaof8rtd3rp69z4d2lhu3mzhqm',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                
                tenantCode: 'zvlj1pr8y6kogvpge1wd77vvzf0uijk0b174zrnb73nmjgktc1',
                name: 'ww9jb7wgtkiv9c76yc9nfv75bo05is9c5dik7qxd8jviw61x9pwglbprrmvzr8baexvddtg22o0flxjdmfxifregnda4yj1gst0e5q8r4j09ih3eqqufpbgi4lrt0h9caue4btucajd9o5gi3y1o43a2bpcrc6v8xzfibjtx56wy25gkki1uo3vuir4ansy1gdjdw4grgvcugeh9nnjwklu7q2tjehkxlngj2jymsjmadvcs0on7gmsi9su7nbb',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: null,
                name: 'mlsk0wz1qxdpdoy3aodyr1ofo9lgtr0l1wrdy0qmirxccwzg1zd100digpy32kof6nxx9znxjsc9x2bztukg258x9cesdbshcr1hsl5r4z137f19t3o7nn3s2bqkvr4tvnrzo1kolxuxhkfqek5xkuc9rnl2ig85crkvlswagkuczbq4znqtokt2hq0f0t04swssg7poztl5tbx1dtz0u3gox5u0hy8uxc8ueqqio1xq1dpc2eraf1uckm9hyq7',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                
                name: '0zyqn93cg2ctryybmyq7m5cqgo580jtpsl538qc4nqwt3zpqp47ml76dqsik5bajo3ldsmf4e7mm29pcc0pfzubdpah90c5unjhtneal9i6dvxzwvf2xg11pntjarxani69cuzljv24wt78w67dk878nzkxthin29jl7groe6jpzndxs46aaptafg8usp59uuwr2asb13lhxep7gtqx3xnexm5ysfk7i47ker8pv9cjazfkjtbr6m7vfddjfw4m',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: 'let9zk6ztu86jnzm7silabin1sgy20in7abm03fil8garmds3f',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: 'ytzhabhb7wreywztspa6c96h7qqkipahqaqwuyqlrn1ztfkfca',
                
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
                id: 'btdnrmi2jf0nccaz8791pdsr40525nzxfm9q8',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '0mwn38rzpjd8zdhyfnhgy3b8w8di99giuu8zdwkryoev0ln7vl',
                name: 'a6dygtsfk0aik8wysbvci5ldoqltzb52bicnshwkfwhkgsy6mjb6xikqwermb5x5vswdt0rbyg1d7gvllu7u451vjf0co5vzcl68f585x2z6u9rc9qun43hhcl870i7awipbxl3nhyun3rxsqdhfbuvlsjqv39keyvf1hk7dcp0syxcimi9xgku0fpy64q1kccnnfldmasjnjyfk82z6944crjcqq5ly0x5zcthxe7hih7qccvjn3q8vn24axb1',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: 'rcsb1ar62yfo56dnx5yb8xre81ducq06m6tvk',
                tenantCode: 'zax4jsi2sh69wi9kn6z4l6r4tjr4pop8pvkv9k8s7mms4jvpdr',
                name: 'sagquwu1lhmqz18zfgn0tz1a7wjfexflhk3r4m3kwj4cm90l8jnuyb0ye31f5vwh0xedgc3q116loctujlnixvxlxkodkvus9dv36huok6fwces6gmtx015a03c2qcz0fj01xo5eklac5xf3pv7694gv2k4k1hirjl3pue3w1xdsbiw5id976z27fqk6zoyv026mbjbgzz7gglzvrmzns1c7gd9l0phh1k70x660us3lyhxkefjsgnabibs7497',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '29utz7gxdzdsxuvnmc03dfvrpzvv21v50ptxtfkqqjvubzqnki9',
                name: '4ifn8kcinmihzfo7yz1bcwn8ci9iyf77nsfb9wtplnpxxrtf76sq8qd9088ya41hxss57h9mkm88l2b2fposdgk36tcshkrfmog4gae542zkit0xtmlgzocwhggokpvxw0e2xzpk513n88frweh157w8e4p4h7jd5j655if8vvixmpu70mbpp7r1aan5i5ff7y9qqy9sd0tbol6fwx34stn1slp0glw5f29eob7y5gd08duazfajl23391qaipy',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '8x6a1mmmk7sb3jkd7h0nnc36xq2axhfujtze909nqcdakes8nt',
                name: 'pgm3uwl8weoziwjwjxmd5ek58zd8wanpfq02bps57kbqzez09cfydhnvuncxpt1hg1n4bzgznnqpf6v9oopnax6yrzlmhq2zp52iwhbxm223r6s6t9b3jvyfy3h3eloq6myt8hj8cmoa2h5iofba1endh48dgkes8ehwb9ci6d899inf07pwvrwq71c1tfdvn18f4a9rvp0nj5bnzmg0eobwzbzccje4rir7diuhfq35g0lzmfvy8rsj45f9zrh4',
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
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: '6dln9mv5bcxma3z9ilnc0iuakw88j1u4apgctjkkcxl5vfcmf4',
                name: '7ff7b0q40w53z6lo6e42ghf6al4tqrmollbo92350wdwilgvf2mwoe4egvjn5ms5vc0inivb2hj1g385etw86hp4keownt70rwgwr82w5trpq5951tyfwt0omgdsjvoiwb0dm94hldb62a117jvin09nijfg9z9e8iu8ivcc5zzo4kz4oakbjjq2l3lvnjbbfe3x052z5sbpahvsslth5kzw4rdywqpocifs9t90xnqh00mqjo1c77h9fi9gu6p',
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
                        value   : 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eefb8178-ba66-429a-a32a-c30a1c1fea44'));
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
            .get('/bplus-it-sappi/role/eefb8178-ba66-429a-a32a-c30a1c1fea44')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eefb8178-ba66-429a-a32a-c30a1c1fea44'));
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
                
                id: 'e3fd2dfe-67bc-4eaf-9a31-5c560a3252af',
                tenantId: 'bac1802a-afa0-4c93-9d8e-cf7a651fdac7',
                tenantCode: 'ji3xqrd43jr157ep6l5xmuy39y3m954dc2c0zbe52qszphthj6',
                name: '1yej4a5b9vhb90aj6kb0lzj80e5dhrg2m1e8gtbm73v1t433cephvw159qk2v2520pqr46e2a4pzkm73oy2zer1wluqcvir14jgf20529op1qp5b70bj66ag9qx59v9wd7hin8zuavoihh222glnwz8v7t6fy04ajjl0aitv7md61918pz69uj8lhjw8b2syt92xdwyd7qrpih4b6npd0vgoam1agk7p6uxgy8r7kvneiz6btq9e1o4sdpmaw3i',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                tenantCode: 'ixd0axvi6f8m66760myq4nj0g23hzahtmglw3n1pr8vmmzv064',
                name: '7wl75u4az7g7snzupxax3d3ly5qw4b5ddeha7u2b02atztbaythzgrh221nd5f79nmj8p7916hg6bx7zof3f34zqonndwafhn8mmss5un3rzuyajzfu5jkvl24r0ux1bhiak7tvep4cs0ghlmzoxb6qjaxds3eh8mbcjsw3jn4w2xbyfvpmxa1f32cc86raccwt0z968xsv6gp6hmg8xlcnqx1bnc3sc6h82e3zarke2aud7a5lpp2x41zqg684',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eefb8178-ba66-429a-a32a-c30a1c1fea44'));
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
            .delete('/bplus-it-sappi/role/eefb8178-ba66-429a-a32a-c30a1c1fea44')
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
                        id: '01ee7053-5df6-449b-bf47-01ebf05c2dfd',
                        tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                        tenantCode: 'jdp67ocji8dnxo2n87uag6a9voyhtldr8mhip1qme4u3gc0xg8',
                        name: '0f5s5r9g3vgcsu7mwus4aqy6s2s0p2pemnxb2tnnfw6zxqbhhek4y7bzm197aorm5seu7imqjvlg5dtcgodb14dqvv2mtk9ntu44jf4a47if8r61o8lb3yqkkcosihvo5de2n66fs9bb5kn84v7l37zoxfgi6ict8h42fikr8p31c1gejvdj6an963jduwkksilwkr3ty2ylfub1gm1yo5tg0xc7lk9m0na8px07plftxxx84llc9abes3he46g',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '01ee7053-5df6-449b-bf47-01ebf05c2dfd');
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
                            value   : 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('eefb8178-ba66-429a-a32a-c30a1c1fea44');
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
                    id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('eefb8178-ba66-429a-a32a-c30a1c1fea44');
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
                        
                        id: '52451e8e-8733-4ca4-9bf1-ffdd31d493b1',
                        tenantId: 'c6b3c253-547c-4308-a96e-694a36007a44',
                        tenantCode: 'jyj2zmxj3gukm77ymquzowpiat7sw9eenzywdvx1bbj3421oet',
                        name: '0v05fottt9mmu11miv960ey2rc51uhg0erczf69s1wip5a3ogt22h8kjyzcoossl3gwjrgqkw7fqcvku9ytv9ynhakf1pu8vmog9lkvo6nd1l3ya00wfhopiqmfi2eqxsb2yl7xee6w7vgyhl4qwxfv7n8730r9dt4t7m2zfwxia0tshja49c7dt89xrkmkesc5d574peqaxlrhb3u2m3q7al5fi9sxzadqsi1oh7xvhm6corlqwkj45xdonkyf',
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
                        
                        id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44',
                        tenantId: '83bc9cd1-f4f5-471b-ad36-614e22528735',
                        tenantCode: 'hu6uojm2yfeu6d47m75n454w5f9o31ni5v5u339aceqbc1ssyw',
                        name: 'ltm2ebamoiw3xhedsq4sbdluwbe48w94dppyjhhjojn9j7i305oilql7gdszly4cgowlq7oyhes66ql6dpbegwo46r17pzosaj7ybyo1fl0rkfaf064w86v93iy6t0gp9hsxe6b9wxlx3m60jvi98ac9x8fgew93geqk9p3onto86ji5696j27oe67mf7jadhlxb9i4636havg5rzu6lee41fze6v9arqivxcw1msbqnptgtsqei8vgsxh1p0na',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('eefb8178-ba66-429a-a32a-c30a1c1fea44');
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
                    id: 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('eefb8178-ba66-429a-a32a-c30a1c1fea44');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});