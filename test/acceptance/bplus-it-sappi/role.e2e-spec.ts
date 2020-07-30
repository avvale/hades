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
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'htcrt2lhm18kwqg23rmxmlni7cis173e9qpibir9sso89g6820',
                name: 'mj8m1mz13x6d5xdx25v3xx61h4x94u2qzxl7qxd9tpylck49wab2g3yj4jx3816hob3wutrlsqbpi9trkmqrywp2y8r4n5eaf2r976mw3k2uheiv8ngw2txlul2wlmxh58lfhtccbzp4h8im11r45jftfet0923xgaiu1u8ud39njjeoiqm02wmde3h23imsxc1nflaidebezrsaxbia68cpnhywn4r62ynhjlnadlxrh4i1sh9z4xysx5hkd9s',
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
                
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'o1otclde8a2ockfodujqe7xz5k2e5nhkbwg3aj346y068k1433',
                name: 'rg9mclsg3t6arjb4b4u93v1g1f0rmufzlsc41ypsjj6mnnp0bffp445innf7r6lgk5skl2j07y1q6wmj43qiv93jbqv0yw9vs2scbnqgnlh5uhkhbvlim7tiswaeo9w3jgivt752f2ullxls8natquta53rv5ly1jlqbjoxi720dt0j4cublyyispp6biwng0g4s6dm2xgkxehibrusgmveblzvnjvhbdmo86pw9yrrgata4931s7573ld0ojm3',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: null,
                tenantCode: '5ytlbjqfpuu4dxlql7f5aoz0hymxxh6cvgn79exl6ds5hztz8b',
                name: 'kimvle36h0uxsy8vac3a6gbpz7r4tkegj9rw1zjxk6y8zukmbkrsjcqpeiionzlt6av6jugg3dhrujd6z7dwbojyn6npzbtqkt2tw0hzoqhkq3mnvjk58lo25hw2uxzg4rd2axn9yzmrglzamqrciixz6as2kj2b6ex2qatk1p5vk6bcdzs520mwvkxrptmdvmw38bumfnukcfqocnnl4jw8kb4cfzxxjgmumrxzq98hkc5yza4g250s7u9t35b',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                
                tenantCode: '7z1id1mac4ck9yff9pzqbxeej6naecx83h04enjnsklkmuo495',
                name: '8yiq3ci2fy7685hf7o8bd56m2c9q6tjv2om4qvd6n77fcpanhoe8mu347rlutxjdlb60s7abnekxtytye8j5nco0b9sheic4dnpmf3ybpyfavs2r1fpfyu5ijlwyxxgeawbwa5n3tjnbjsxw4u76pnqfvhtr9xbiquu9rl09ncofhm95pchqh8jmidfet9m5n1za82vbzocjb90kvsyq3zi0l35eqbzyn4veiie19hi9cq89eq60m8sem41ot0v',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: null,
                name: '9mwhklukehxvcsber7g9cfpjrze5t80cnzyvjx50gnxbxnt6tk5jowz3n0mwxai85aabkqsqgaqfrbc2yjugiyhpzuqcg15m9vf7j0053gqorvnzmzmtfoakw6hu3nse8km9705vhmbl497nxwnnjmnadebz7qgyu4q21xzqebr93wvtak7kqn2abiy6m9palf0iau67nj2j6jtk8xx83t9784dgrs9q9xqsuug1ff5fri8wxolxvtcln5evtrt',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                
                name: 'ioz8vc6cv6lag8rjz4x6amycildu9s8shfpkaip0kjdws28ujwzjkcb1cr8o9ftqepin1mepndfhnoh4yxtcs35cy9nd7g87zq6aqmy1rl6u7ux5l3ucqfizdvikvprm47687jrr3dix1dcbu1sszjrxqb40va58tv1vhlx6m3lurdja3xczp96unm3vq84g7zcdtqfucfumkhqdmzww3skjijxhif99nm90wkpwpvo2osdotbcw7tc3jbglnti',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'w7ezehacv5w86k58cphkhsb6016x5k4p9wqezhv3hquhtozztn',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'vua2ua9ikyoe1bvvh03wn0w4a1x1spa6fpgn2v2rliim3zojyq',
                
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
                id: 'emodfo68aq4kdqhi30vse1mkdfs23ucmvm9e4',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'o2yal85zjmfzbwuq6gcqpw4n5g6moo95fqyyvg3mr4e42xi1ef',
                name: '5genv37mxik6ym56jxqv3hp4hqvlywruvdw854sbs1qeileeejg8fwd7kvcfdxqlp4k2ywd08dbp0a2rkpzx367pb51rwlwxhwgbrnr8z42krutrxwq49he1ztm02stc7zjzmgyjhrzmryqjfrcnptonijpw22ieu0xq5bia32l3o6ro0x8wqpt4kozglkbvh7hj5cfp9pcrrmc502kb9vqvceznfdx6g28dtp6hfxpr6apr9cc8x0mfh0577oq',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '3uvy38vs2aubdvehg4vpkws3umpiegjwer7gv',
                tenantCode: 'wbx54lzwicike6r9vuc0ta06byoud8y6lemxy9u7lcb5a70wdf',
                name: 'ne7vuttdywddz08egvvjwwjlzsc9rd7rlj6rgxuc4b9f8nou9eeh51j0watr9xn7lama4g8bei3entmoscyoegy90dul9dfokp59tnnl1nm36sy0c2cpe5nn3d98mxxlw8uat1gwzj2wcvimaeiv02yjj7l2gnj8kdcu9jwcq4fav3t5l8719qaonlmqfd7nn6heio3vk1fwiprues2inb6u1ueb7xndvpn9z5p7vqffam7if9dz3qbtxpvcz4a',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'aow0v9rpto32gwz0hm9r44vhxbdvrrpq7jv18zl4k6hn3fjh8fb',
                name: 'uv5yafy65mepi5w02l66vvw8h6eu8g74hqg64w96cn7ko5fgk1l3sd4nf96xsrvdrkba4a8wotyiqf33wp7h6s3m74luimtbzfurvnkgdmgfgvqhruczs07yffuc4332yhqpgjtxbx92x3nheay650fm83grtc7ghdr14z9kxpluskbn1e4u2xhq54ryh5w47d1ma5nc75uvzewqks85hcanes14dmm78a8x02squq8crjm268r5imc6yyk2s38',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: '52y607pul509br2amqb0rfskq7300h58n93vvil8s1gzce2w5c',
                name: 'wml194fpp4s540jalai0wacl82b3lowilpvy5q3afd6kywrylt31kianzxg9u5oimf3lwh67933vycwmx0bsu8y08g9y50ty9pthl4uqf505mn423nnlh7r992v89fuskth30rocwb92e9h70o2zhx9h76busot0rf02168641gxqgxu8g57kigr4sjndmyml2tdot4yoax6dch5xgsfeyjdhp04o6kpll11tc3rarr8c3r8f3vvdn8w4njap6v0',
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
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: '1yc1r4upuw3tpud6nbw6gy7cz5qmwrev3n3vw25mfgx6wqugnh',
                name: 'hpqtghhiucegqig8b8vslpt4vhwr87qjzoux6k63cuvauj5fffr2dkxcd0m4zhnl53826n1f8052rm80thlfpvkfu12auo2118tlop93y8pvdupeq78wxw2i3lqr2so4rme8ucuc4vyb3y1sglowrkqwo4f26ucezzxj0bb561i6ysdp7gzl3o51f8lekq4b24dxae3c1yrelj5ds7w86po9qj8m1git73l16dqegjcuwgbtq00ar7j6gur4qen',
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
                        value   : '9a2d36c5-f5ce-411f-9978-894c26a1a8db'
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
                        value   : 'ff79b338-0f61-439b-b2bf-7384600e5d98'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ff79b338-0f61-439b-b2bf-7384600e5d98'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/0b8b93fe-dbee-44a7-ad98-f648b07d68b8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/ff79b338-0f61-439b-b2bf-7384600e5d98')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff79b338-0f61-439b-b2bf-7384600e5d98'));
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
                
                id: '19d6aec1-10c6-43b3-93bc-ae6257fc1345',
                tenantId: '87f8b239-09b9-46ca-960a-ea186c73e285',
                tenantCode: 'ik9ycufxkwoh4ylq2nxjjgndtoof24fh7amyjkd8ytyegi7kem',
                name: '3j31u82fsfsarvooa0ljulgkj6y1juebn7guber14fbu30ej19pqhczg66swmd25d9nnxtsew6iqh85k9cbjpdmog0yd9y6bhill7bc2l9eyo9cequlqscta3tfwd8mzmnyq5r0f49s5ukbu2kibif0jeqxn8e6wjo5el64wqfi5d6qxvtmpamvb7ugnkonwzkqg77a0ib3v6wycvlos2et3z46oqhnfjxfyudejsz0cq5wzcoanan5lnbfz8pg',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                tenantCode: 'w1w4ou9jwpfsmvdlnjtiuq1phmjm6emie7hg8g2kemnd2wc370',
                name: '3gghnfor2wd222uynw00hk5se4lc2eh9etda3etp8c42xm7fs6dg68kw1srbxz6rytw1nhexgh098j88z1ncfcj6ratzya64cpzhxtolo1e8jb9nmo0rwjs3rv1xk6x31pk2ul648w3hiiyulnbqz8r6vb9seg1co567jisyfgllcy6l9q8m7x0wepa5p6d68jn979wc8h3yfpi4orjhnj82906dhvqr5fx0jdmyfgq7oe2vld20ip5aty0v8pv',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff79b338-0f61-439b-b2bf-7384600e5d98'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/279ad45b-9321-4e79-9804-9ab61fd96bc9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/ff79b338-0f61-439b-b2bf-7384600e5d98')
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
                        id: '00fae6dc-4b07-464f-a0d1-e81e5a883b32',
                        tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                        tenantCode: 'h742i35jl9p4ulrgchxonwa25gj7cxbvkiqzwmvyhqd91cacvi',
                        name: 'xr77caw4r58eob3pbl405hl1b9hbg3u6ok29xjqrm5bj5iiuvidnwvlfqq1wtwl4oy4tfqosy66v8iy1wlpqlrnoxxhmgcrcj5dekfk328eysoorqsktse9njlbk4qf98836kdkd35vyecgo2qyngnck9e1torghi0s6s2pc7asy8fiszm3hgbypz9n3g45ns0f7x48gk46gdolba69psxqcq6ravc4p309s07otar43z0e0c2ntfn5eh62akig',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '00fae6dc-4b07-464f-a0d1-e81e5a883b32');
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
                            value   : 'e9313a89-b58b-47d9-8854-49cf7346119e'
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
                            value   : 'ff79b338-0f61-439b-b2bf-7384600e5d98'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('ff79b338-0f61-439b-b2bf-7384600e5d98');
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
                    id: '6c141cc7-f2bc-4da4-bfd3-7a5ea8975342'
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
                    id: 'ff79b338-0f61-439b-b2bf-7384600e5d98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('ff79b338-0f61-439b-b2bf-7384600e5d98');
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
                        
                        id: 'ef35b696-4971-4383-9d2d-cfa053e851ac',
                        tenantId: 'ee4c2d4c-0bd1-4738-bdf3-bcbce58059cc',
                        tenantCode: 'fg120j8nkgs49q8imcvbhhsitwqoz0o63tur4mmjh799yx8eb3',
                        name: 'nesf2wnwbbkw44h4l6bexrvwc15pc80jzelrfak2f3119hmjiajt2w96a7idqttlro96jk92via1yab0q6on2dgdjiaryjvaknb08yfb0kc5wexdb8tf9avcskxaxjriawsqma5zphq2w2v1mhx3he01b6gc5ge40zsvutuxoylpe1xeuqpsgt7xcfdw3za0ufbxdic40m3225y00yik4npzs243d840rhegrksitfvsfa8kdar45mlw4jqxhjr',
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
                        
                        id: 'ff79b338-0f61-439b-b2bf-7384600e5d98',
                        tenantId: '89a17434-83c3-4525-9bdc-7dfd41edf243',
                        tenantCode: 'eommk62b7m1zxy1rr3f3wvy8x5p56syhc85qfq2merm4eqalcd',
                        name: '0tbl6reau2eroo5lvqfjsywi5bth8z7og7fs9g2xhsd6mlsg1q3p6mrdundi7dpamucvzgweqld1wz8ly32mobx644fsmdaj8dwldaserwclq0vc74ef9podmj8qfixhunb3lrdjcbd9p7npio9upys2oo54l95fcnyibdmg1e4nvppsxnxmjehyp8yyt3a9pw3rewl1emeeu3voz1s9kh0zlgf3d70q4ywzdoocrmx2y8q4du1hw4g0db07woo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('ff79b338-0f61-439b-b2bf-7384600e5d98');
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
                    id: '56cd3e3e-1ad5-41ed-a18a-e2377bcea2ec'
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
                    id: 'ff79b338-0f61-439b-b2bf-7384600e5d98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('ff79b338-0f61-439b-b2bf-7384600e5d98');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});