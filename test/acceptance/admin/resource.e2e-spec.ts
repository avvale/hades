import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('resource', () => 
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: '8i7n9c9ronpvcvughwzamtesjo2ttb97084n6p3f979dsepifz2kvwtjx9r374xuiedx7kzx4epnn389cfntmq9efknctf8yd9s13xrh8nwwuxw2etwg3gff53pwww9i050sb4ktugv0gjv9xi7lp17v1jed3p4h5e3upo6pi4vlviy89ojyt3pwpxdyv82lia8r7mae0xeynu57xiugtft9mzeecdfrormgxnf71qpkhal102b2u0otsyxe7n6',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'owi23ovuuj20z3h33zv135uux0egntcp6t9ecq8qglrptqi56lim8bqk8iul5lb0v52nw1b68gv9lswt5yew4262exu4qoa6mraumgl2si4keb1hlmnz0y73zikvaeeh28avgknq1iegpx88jhf3x990vzek9lvao2212xqhenzzjaycvw609gc39j4vy6e3wzr4v4y6apu2rfd8nnxd5g5s9f16b315p7uf1q8paotexbcoe7h6dnamc8q9nkp',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: null,
                name: 'ooutl7fjtfibw43l1avoxtg48p9wztgeca9886q9v53v7ztqvzb6o4xfbef9zv5z02kneir3lo3outnp6hmsuiqfrl04ekxnjlrpq2s28uw41cx2cvfg1bnk0rwaix4ijbbk0bumz2ua6xucp3qr6el449f5dutylr9wr8bfqlt6lev1wyakkcym1zoprg1ja3vr4eedv1k62fjsavdwck4e8td51h0zibvcs2nxr0hq7f4pg803ysktyqbp6p7',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                
                name: '2uvq91q7c9zew10e7tzebz1kwo70frd0hfpc11533ulmdqeucbd1jhtg0v9iw2k3ogwqncgf2pty2wg8j8wn9uykjcg1k0vdn8ant2iwm80uw62ieqy6cfxcingaggcwafxx5wut9z0scwws0ifwpxrmnxj4gs4n2v96q3vqrmuxgi8artnz7s2sq6enm8bd1pjdy70h1ku8d83u2s0cvicrk2oftqltkqixqga8z0bgdatdnkn0t1zxbd8zbbq',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'jmy1iowqjrb3k3m2bkw8c2i8tynplf3l4s2tq6d4pn81cby27ometmqqpugdoqkfdh1aostuuxrijej3lloutfdmhe38ethbl3a3kqf9jfvy33pvtu6nnnds8em2rmexut29f3l8g9651z3ap7iilznzmkb8gkbaqno8g93sujdwouxwofvg4esthc776txwvhunzh11z8q9shqm9aik2f8jnrc0c9wnc5gl0kkcnsw8d9c6dtzwmjm9k05bm2e',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'jznmteswxh9zduvadvcr89i489hh5e1bgp3w8agk6ts51zv3ybp6j44f4n0e8zud4jfki2ckvxq8i4po0cmdsvgcinyeirunut0izji226kkkx2h2u6z7vxrpq1h829wjjbn0g8agwyq706himnsi4l9hjbaspdjyh2k9gsorao8xjviivdlj87arqo9mdpv9ny0cb4lp5w4qra2v2nw8yidk1uo2j1pcul502uxwjfdsliiaphr6tjto0wq7co',
                
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'j57bahx36qsu4x39kwca0jnv7likq4t6xz3eksw2fvh7woz1iloddodv1z94crwq9xlcy2jmav470bzp6anf1nicqpyavwfuhzougxjgjslmvsy6b03y6aldqp9wqy2gmnnzdj0epl3i1upmrl8iw5s4ckt0s6wbvra6v9vzt6zti7es8f98vofl997mtttwlfs0qhobi7dz30cs396ysgfca2jt6y7njrqhsgs8cj1hyi3fwz83b46dsn5yyu7',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'gkwc7ep9yalo7d253srlz8hzari0apg2uhv6yji5snkcvoibupb0gyglnidmc5f6c1iol7prn289qc2fr33jcqswwsopzh0q73tj9a9pw6krysw1mzk8ykfphtnnf9ysxhhsppwyv9ap9x88byu0gwe99q2eulkf4756a4gxh49bf8qnvtijjr4byvlaqxy2c486uevcz3hk7nhkhgq53spdidy4c9463y74ce3wd6j4ac55kah4kjxu0zn475l',
                hasCustomFields: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'rto4tadyohxqw8p03ho4k8o95cvnr185jexe0',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'z4tns2x2t7dy62716fg4gc9f8xyjb026x7fmn3ogujzi4z24d5wutkd8j1ntyjcvwytp0x03xl3dubt44aym3n7k99hqug7annvk5hmlcbpikaf7bujri4zgdzsgu5y8mly8vxxjd8vqea3rrqkp8rr8azsgvb3uj23xrxizr0xvtznrw3kymnvnkwog32ghyyxfhd15h07tinfj578xxky5g752kuueu62ixt6nqulnms420dsjj7al9ctwuc3',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'x5zk3lue79u1ksub65v0iixjkgei61v2ixfm5',
                name: '1prro3efw2p8uq152a0x29boxbbyz8gl84axpp37fyhmicflndrbz8yp862s50nxbdccfoz08e00g4lo5g7af1a6zlvm9zi2utd3binsemyh57kuzcvx8rsiisvtj2hobm866ouu1olwcifrvly6m7rfi2cdfujzlhnbz3vp2r54js2evsdx7o5tggazd42khkblrjjrtf7ie1y65h7otwzo0dk6p2ou2xfyrxles69np8z440bifcvhhlx0q42',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: '1mj1quj6n6hyk9nln4xo2abxmiuo13guhe1p8smx8eb9w6nl1qpx2kd7sceol5b0mu7asoyfkwv633flxmootwlhrtmqi8fpfsp68bg9p4y1e9fk1i3wmla7tzanolcrkyb1dhv7g9ppihgbwkb0ysl8maqn5e6ssbykxyo9ne2jdawezc7th9rxxt8l69n67lszsfnphc3yrejzt1jq5q2i225h33choip9n4n6c8g5jju69t7ugyfxmemssrjz',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'eq94hmsmlriaau0u0sbtnrzh7yrzn629tivffzkix4ur5v9449uo0uy7le9gzuli992brver2v87xyjki1uzc0ari6u33n45bsy2zprikpugkuoaikf5eg4f2c7hydl6n3asywz9ba219owikx9kws5tsf4zbamo0fgm1oeb112r8r4d60bdkqmxvl7vw0m6u5xs0xrevvdir6wpczq9co8d3jl88nhytkihjx0ka2av719cvd8xn2kvm21sgzo',
                hasCustomFields: 'true',
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'jbktvjc7gy5k2o9xz5x7ckfe93q0r3nnmn406drjwqeee6bi686lyzy1blw4f5ocj02hesanbdqiactl2bi0e9loy07etuipzf74rk58wqr2i5fd1y89lywifmqf23rxfigoapoqk8ym7n8jmqimhrgprdnkcz5571puu8wfa69skrlyhuykw0ys634asiu6pu5pfgpwq71wqdgxv676f87begcon86gxs2nrvfiy61evvbbbm8tjw018nvci1k',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'e2bd5mb37obt1gc0xv1w541a230lw3mme5j50il7ibmevxjedwkbcpm67mv79a5decskpnvy01r0sbqupqopryq1qes8gqpwamt7mng5zko9co4xkrfng9qtdd397ipa0qor61jn5xgann25ioubsb5sn1nbelq4smmonisfi0usagtbil284pgrx6mo49v8zpc9vlbhc1w85676h5ex8iqtvxmsr90aqfcnof54ng6v6jhsjw3ow7v04mmv9b7',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
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

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '577bec9c-af19-4a48-a5e3-0355abfb6dbf'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/577bec9c-af19-4a48-a5e3-0355abfb6dbf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '577bec9c-af19-4a48-a5e3-0355abfb6dbf'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '0a54cdf0-4514-4e47-a6e3-fac07f7d6d4e',
                boundedContextId: '53714062-c189-4c6f-8a07-4210aa5a0afb',
                name: 'sbu1cb1luwfu5v845jw2jt2i5nhdry0z96bsn2w5zymzyw7gofdn3gyrk10b0rdl7egfe1hzmgfdk7fcdmmq8eg46g2lvtf7b5acx0jdo15dgvqwxskdppn3byihukdzqtkbbzj4umlaw1ccuuazgnawprwtepi4eb9tj0qzb9ic2wnzr9xb24wohkucb4ba86l6hlw0cy0bb7n74eyyjzmcos0fu4g95l1cgeo547i5m797uvnwm5jiuhl988m',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                name: 'ygvcu8eytpjd6h603hltitpjrmsxhmcv96tdhn76c0vae6dfvyniswtmcmgzjzsodc7me5elytvy79cs9f373vijbb82gtdt2w9xiialpzl2vbj2gth2hduhcfa9owe46s5s7ozoxvee0933e9b8axgynaqz2bvnt8sz3d6egke2mrfj5vle0hbpjsi4p61v8lwn3q16ygc3u1v1j2ic14bro23n3tg1me93iuzaa55ggr62oyj74n0o2fc7su6',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '577bec9c-af19-4a48-a5e3-0355abfb6dbf'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/577bec9c-af19-4a48-a5e3-0355abfb6dbf')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '617345dc-6a63-4c1d-b327-23b5400dee49',
                        boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                        name: 'zdv3nyiarwrdem9cg67kpqb9z11qa04glxttcwadlw5a4r4ktcaitl57v4cclftr7czjtpkdwp65punrtv3jmnw5vq8iwfdxa8j3sih47h20pymt3lxyz6xqw0qufjweitvc8ub7izoa5m0t9xewx2uvwor2txqdi442ekcekc7cxmbeesg5jueu2ci1vi1omjakgwqqn7y7vsx1773osuhic9uysskm8tm2o0ig1x5ttc74u4sn0fwxbx615sd',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '617345dc-6a63-4c1d-b327-23b5400dee49');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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
                            value   : '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('577bec9c-af19-4a48-a5e3-0355abfb6dbf');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('577bec9c-af19-4a48-a5e3-0355abfb6dbf');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd089ffa6-e531-4dc8-b28f-04fcac6ce92e',
                        boundedContextId: '703765e5-a6e4-4433-8b90-6dca5d24a3c4',
                        name: 'njtilua7yla1q6r5ts334kqxjp389rmbatz0l6r82t1rcr7zgmh1a274az5abtts6460l639f672pefe0mttpk7xsmjolyfv5kio7lr45cu0c5kfkhily1xj3725bhzaabzggkbvj37odm3vieqltppvwu5r1qh4p67vjw851l1b5f43dud3e33tvozbyiyf09v4x67vpelhypnor99ehg1f1ukonxnmfssruejfh4lecdlg4bnv5aob7d8xtex',
                        hasCustomFields: false,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf',
                        boundedContextId: 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62',
                        name: 'c8a90oe6ehm49sg2iupr9ohrktyyfght78q3eye03w7sn5hsfveeh6tqdxyp0731epy1el35sr9yvq73xzr5rbvuq7mt91nsvpn7bsa56j8ihf2slf9zfjul9h3tlujdv7cks3hp7mr82uqhrwmw02y3l1ljvzgl6xn56n22fdb1enu2bk8frs3zyjku32tw2gh4iorizl83kb9qtm3t2p2z5jhzv8fw3wwp2kzsymdgz42xu5ecpkymvs30on9',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('577bec9c-af19-4a48-a5e3-0355abfb6dbf');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('577bec9c-af19-4a48-a5e3-0355abfb6dbf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});