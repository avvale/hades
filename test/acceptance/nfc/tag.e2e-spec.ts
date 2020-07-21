import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('tag', () => 
{
    let app: INestApplication;
    let repository: MockTagRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    NfcModule,
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
            .overrideProvider(ITagRepository)
            .useClass(MockTagRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTagRepository>module.get<ITagRepository>(ITagRepository);

        await app.init();
    });

    test(`/REST:POST nfc/tag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: null,
                code: 8435416767,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'tj7q8lftni9akezx7f2nrq8htggt446ttc4p4jj0293ea47v3e',
                urlBase: 'agzhkwpnib8tpdhmr3lvd8k6oybspq97qx8uoj7hxg9d4wsicqn1eawu011lac764zskfs01nusllpx14zkq3pjfcgfn3jdemc0jwb43e2za65k7pzzl6pxhd41cpjwwnxup6r0foccp2qeanqtjc62t3iikap4awlyekncg0es5nry9z8rdyo6vxevqsp555bgrag5w56ii9ug05lltugrbtgpopwff7kfx4sabl1ancoug4jnqjp6dzqsxe1o',
                params: { "foo" : "bar" },
                offset: 805794,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                code: 9132639037,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'g51bxm2di60c8lqncmzdi8704vhjf93v9pfnj6hbieob4de1ju',
                urlBase: 'f3fkx8jwn27o19zx5zk2deqztdktm1qux7grhr3akq9f085llxfmx4ec23vfzqeyhz0g79l7bf9cbw19x90anj5qvvm9dxc6pnz4i6i8a4ns5ne627hxgit7suor7bw0ekurt2q2y0c4qf1lv0ynrne0nr305u1y97rz1v5sm9v1d3k4461vxjwlg0hehogaei2vr4kscoxeb6klvpltbv3asugb91owd716qvagp4c932wk7jvzxvith1rv3f7',
                params: { "foo" : "bar" },
                offset: 933397,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: null,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'ocd990z8uq45ak2cqcnjkxv29z36vskmjyk9tj0vs4ttr0g80e',
                urlBase: 'zxwmrswcjomnwatjj6780bzgzuyluq2e2v5c65vyw67efmikmo9coi6d2t9qofj2nilzegyre47ufo59nt1oqlt7x68u84y8vve2mlaj4vh1hzdkirqudnqxjkr5gug6vqh8tf8tmlfeee4c6adin9d552wvsczaie2nyzopf7jvon3zk1l04z6gz1upjoilrqq5c655aafqhmy8b0ichvk2yu3xr1qkbcggeh1ffexq971wkrxqtcsndxiavq4',
                params: { "foo" : "bar" },
                offset: 347310,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: '7u2s81xxclsynnxyin1iag037e7gfhyiuwcv8o10ndsdqtageg',
                urlBase: '6pjag5w3o78uto3suvdhlnwmhxcv2t3nv0dj7vyj79hl5cox55axcnqg39bwjl9futf1oobth9uhocoeq7eur759qppcjcou87c9b4yg4mwrqdryfa6nzjotnu9qkf1ek99w1z31vkhhovxua2f129yfen5rgxq631lk5oyi6rtm4zkddu6wf3r6wyrxw4vnffofq2nwpthvqbt962i560sqa5ka2gcnnwxr6tc9g8fm71rbibdq463tc4aa5l6',
                params: { "foo" : "bar" },
                offset: 657926,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 6524890596,
                tenantId: null,
                tenantCode: 'x44js8wwmxu8bovgn4p561ja4q3aqagalr6qhy1s232yglvuzw',
                urlBase: 'o1sn2p0h41uwzqhqsnnkr6whqd192wdevcq8ik4mhb3m2vj7dr96ffejho9cwhi126dzch76rvm6vopsjb0s9kjy6xum5tc012dippbev1v52x55k2ck5tkmgf1mxrrnj8l3d5dlfhccm3dz729h8c0hrwgo811ofwuw8yqxiwq84dzh3t73az2dggts8zv0jaibt0s7dvbq994coyd7l1c3hde2268cemxj8wdq20qvjnad83vl817qn9djvui',
                params: { "foo" : "bar" },
                offset: 219545,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 1127903536,
                
                tenantCode: 'p9ywroaqtonwtrdrmpzq0d91cb49hdol2hxqcwgv20e969hupo',
                urlBase: 'ua53fctk5ghxvzase3wms6kjpghjroznf5db079qf1qbhzd46omujpakpy6gig8dgxgpke43xgwd8yo7britm7q7hvfcodhk52tysuqfqvinfwan2izs1ssow5f0kelwknkv05iol2oqhbdpaow2wub2cne4k0uy9y97jrq9g5tndy6nfi8y95mxtpuuwdno542hfdehyz972phmd9nhi6vpcdc7jqh7d7a991sk3k9e3b3n51pr20tbc7zxj72',
                params: { "foo" : "bar" },
                offset: 820083,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 8225418341,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: null,
                urlBase: '3nzmezu8zctgww8qe2bz4aclalam5mtpzxoknkzr7c7zhqyba4y41wk4gwpv1iaxfoptyhzlz0ayw0ar8vey7z64s4ufgjnr5d6a1uvstad1segv0wn103gi7t12bosqrdff2jzp0v8u1xjwd7e02425wpqqf65isobmh2ph2xyqb5siy2xeobvpnaw0l0kuh5y5qpuoj43mmuksrt5lrkbnuzyydqo0etluzc9mnayft8rthgxaop5gcpymbmc',
                params: { "foo" : "bar" },
                offset: 610757,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 4080694127,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                
                urlBase: 'ihy4eafo0y2gzqy7bkc3ehlsaols956azt5c348fvjo4dk3h54cwb1o2bq43tvwhuxtjibyghzuwhjr8cnbqsvfaejkpq9bwosn7ukkbpqlz5xkr5wnmqitw04tct0rbnit0fwkwtbaoc3be5o4j6k0v3dy44mhkz92mb1mz32l6eyonfuoq9ryiptjxw7zik94399b9eqhed0g0a6al7u92b0186dhkhv43ip9ulhf9z2zfyf0k2qsx5ffme7i',
                params: { "foo" : "bar" },
                offset: 485809,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 7061254416,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: '9lrtsvsvpedpeopkr0njgkfr8f7srq1snvmx1m1xyisblkqgbh',
                urlBase: null,
                params: { "foo" : "bar" },
                offset: 583965,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 3645543680,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: '6hfze4lhnc1vr4rfubynyv38jj1ndh2f79jzntdxfoxvw14rm2',
                
                params: { "foo" : "bar" },
                offset: 821699,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'ty3zzp0g07o3r5b5zwd4iqa6julpy6g5mwfgd',
                code: 1991985609,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'yv5mm2vru4vz8oihniw1vrgov46e25crilapr6uzlyvogkixdn',
                urlBase: '8s551qyai5rh3hp5ey3kw7470yfuhu0kwn7qb1755qycmjxolaw1oprw1ilvs934wp0ljcdl3u1bhhwdxr4j9tn9cejn0wv0is9tqjvd5u40ljr5i0poyi5lkt7mj9dkq5jcceagwh1wr0jamf17bl4qld5mn4m065glubt92rexpixba7f58ujqxhvgsyezj38ev5j42d2wnml9mfgz2p517oan0gb1753etcefxg8t2pc3esvhq3sizhva3h7',
                params: { "foo" : "bar" },
                offset: 267792,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 4720976373,
                tenantId: '3wusj0sop87jicbpq85dwt2y8hgz9nxneyqzd',
                tenantCode: 'fddk2cte6849ieubhtxjoam5tpmpcbci0vxnxkbr3dd2lxsula',
                urlBase: 'vuthp1kmymrwrij3qo8vj4u3rdp8p7tszgho49xxs91u7fz95re6fwexvszckb1qv8m944oojp3k3d2ecdw519ap8m8v31nil6brwd1667enc4m046numbiog7exddy4n45re9u5rvy0as6brd5z047rfcmsb2bcsdirs2gx6agai6ekyv5hkebjvsxgwoyhoo26n89yuorhfsv23m8tcdldx4q96chrtea42fywr9tku0d61iskq8wv2uzv1kp',
                params: { "foo" : "bar" },
                offset: 137753,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 83942716396,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'kqtlhqy09p510nfhfxl7i27vf3skhte1uwojh87eq4bw6bqvwq',
                urlBase: 'owmai97ife47fj3wfrtt3cb1ovsyzzwu7d7fsr7dfs1fu8jebckajc35p52mfmmjfnbb4lwu41lwkii0peh7wmwpwl8g5clwxpte4uf6dxapzk1sbgd88ya4erdwrnhhrmqukafeq9k8low2qotks8flbxwlecu4j7qpycva5nunhuwgbu4y1esgvk3y578gco95aulf7u3m3zycu28ef8rrq566gya685emtxbny7yzh8arkg0z6fkxrcg3iwz',
                params: { "foo" : "bar" },
                offset: 195372,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 6876942501,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'mnnjlnum0dcwbnjeil1ujzmb1e3pe69t5qn7gp7t1sc53ozyafe',
                urlBase: 'zt0no46lrw4pzl6zwb1qsh9dx0b8ucqqdbgeyjow3gwpn3zk6q4ut002r8nfutu54zs6d3i9wak875xek8hisvjwkaooancd6awl5xu9k9k7fuh32r7gijajfwkf21js9obgn4thjn2mfdp2etorwmkzys00k9s77dwuswlr1ipzei35gxthoxhjtt34p8vcx10d96o6vsuwwknhl15q5g52w7foogg736nqcmsc2pfjolotr0g34u83s93dp0i',
                params: { "foo" : "bar" },
                offset: 815878,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 2635683217,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: '7cp44464yg6dk5wf63b29pemnzeaknhdj10pe5jvx2xe5zqhp3',
                urlBase: 'ki1vatx80x8llg28bt9dfhitvqz2oc85wls7w8xxs442r7mg0pajp1hoi87kvmk8hj8iw82bapfne8851bjl7nf4qhec2jvt28maklanr5b2ixw0qn6p5wxd4stp0rn6yye1e6sa8f2mmrobskbvmu7913lh5m68enbyzc0r1tacdkkd4yuszboemfg5siufh4kdfb4wv2mx3a7xpikny6rlo5lend3efztvjbr5s28tgr2rbdbi8feh34010sjb',
                params: { "foo" : "bar" },
                offset: 672233,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagOffset is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 7345755934,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'vc7r9e4o36z5p1q8gtk57vbedignw51u789g68trcnyr6gapzk',
                urlBase: '9ctlgn3enfniv4p80k90h22a6a0pa93t24ffuugo2k5l0im727srkmzanrld4arp86eac7qbqfdc6utczplur9m1g1vwzjqfgxrv7lilnv1ke5sya9x6ioxxqq4zmkpcn2g716oughfszuhl6vpg30oqtlstur7ogajfgbow0j0xxw6uhhjgzme3i1ozvomz1z9hh1b2ag1e05oory29piqw847pt4mez5q221fqvy4xcm577uvy7n7252ityev',
                params: { "foo" : "bar" },
                offset: 9180752,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagOffset is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: -9,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'm0xbpq2pjpnl0v8ycm806uj6uaizrgdtp2jfccc3dep882nd4f',
                urlBase: 'dgv6f1xjw6mich43vvwn59xpjzazww6pzaalnqxxbdtl5qsafi2yu9p90b1148nlyzsqt5spvto9inzbakcioni5g6rwzjzli1h44cinsu37rc0x5q8gwzuqxzklsur3j1diayrq12fs05a5jvce61ricgfbn35uc7zi9fixlkerh67i1974zg82hin7dqkin94qzuwamavfzdh8h2hh5gpkcnrpuncicxwekczrnbh49j7hscwza574jusolvl',
                params: { "foo" : "bar" },
                offset: 891438,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for TagCode must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagIsSessionRequired has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 9513449411,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'x8julkcvz9lys7laxinm45uj91soyrezv0kcx9zrrzxurke291',
                urlBase: '0n567a7cl1q8108slh0sjf8u9u6oxqoqxk5lypqy3a1iag8xmxcfqejd4c0e1gimdyqqi5fqkuiccobwojvmapdfg35727wi8p2mtstk0np41epqsiu6aa8mf2utj4p19jm0dud9b52627dpmgyka6j62u03jvk2mgviyodbayrte7gf7966hbxxl0k6kuxbxwxxs7hk3jfa1xvb9ahqpoej6u4el0j8z21t3ucxvi2vuval2aaaoaz8ifmdc69',
                params: { "foo" : "bar" },
                offset: 870387,
                isSessionRequired: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagIsSessionRequired has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 4190009602,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'upshzyzwue2f119awy1rnlqyspm2u3j08w1jn6ve2kf65s276a',
                urlBase: 'kwkjnpgrqcegq8yqdzyjdqrxhewexa6nh30ytmwcfv10cl2gwz3uqvagvffba7rsnvjvq1ngchctuf4016ox5q3n1396qu6xwctyfu4vb7lu50l4i27xiwk0i22geh1ns6s8tuin4yx09hq0mpfdgj7hfe4m16v7d2eppr2md18px32bg7c1tiveoryjiozibw156kbc443bwz8aesotmuwnfdrrfb4tev9at8x20xobhx5zpyf2clvfn6b3rwa',
                params: { "foo" : "bar" },
                offset: 959278,
                isSessionRequired: true,
            })
            .expect(201);
    });

    test(`/REST:GET nfc/tags/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags/paginate')
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

    test(`/REST:GET nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
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

    test(`/REST:GET nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'));
    });

    test(`/REST:GET nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/b14beb99-e0e8-4e6f-9505-a59263cd6eed')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'));
    });

    test(`/REST:GET nfc/tags`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: '94e92f30-08f5-4618-8097-5574fadf8216',
                code: 7888663153,
                tenantId: 'e1640f4a-c35e-4d6e-b966-164c9aedfe87',
                tenantCode: 'bkck3yfd9gtzgxgs39b0w64lilntytxc1ktkrihuahdckgzk01',
                urlBase: 'hykwxuyppxlribqdypxcc9bb4q372dlmi6g6jujc1bbcb1sd1a1a0ivct882mob72d4hi60iexyl1c2xq1qjvecq21zbyteuby043zrsjqw7fssm3t2dho4t4axd0ibpo5evbjpr1nn5wswqmqguvrjfym8zohtor546t8foulm7blhnnk8bp6hsszcd5bizw08mw8twbh8aqnjhphuybar1ln2vl2rrr54u8otq2clldgadlcmyorz063965t3',
                params: { "foo" : "bar" },
                offset: 335731,
                isSessionRequired: true,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                code: 8310569140,
                tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                tenantCode: 'oirgqnsb1154pd52f5slqedydaesp9dd6c81r3k5lw6iprhxa7',
                urlBase: '5ztqrf17ykin35kko2tznn7ffusj834gh22tipc6dk3utl178v49qg9mfrkeeksyt306epxpkcorpuq9zy9wgkwrh4i54r9hye25711etcvohdme0sm1z3mdn98sblq4d9cfmzl6qh0jm49czclu9lcbs7e02nja9ifquijfmg9qu0ivgi8kkgkv0j7uugj6pjspxz81gmymuiogya5luzwh3b0ajxqylnujo9i39q9rr0kuud7g79vp8x8gcik',
                params: { "foo" : "bar" },
                offset: 324571,
                isSessionRequired: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'));
    });

    test(`/REST:DELETE nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/b14beb99-e0e8-4e6f-9505-a59263cd6eed')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL nfcCreateTag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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

    test(`/GraphQL nfcCreateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '664f8a4b-d548-4994-9dce-d293e0d646c4',
                        code: 4159135457,
                        tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                        tenantCode: 'evetxg037eb0v0ovu2tkoqxpokews84s6cdop8wfsvv5jnke8q',
                        urlBase: 'dyggmdgjxr7azt0bkglg1etfdwz2g0o5kqjv65v1yiqzgsrp2eignxqqkn9rw4485zth43kdsdsnnrwonzhyizekjv5j9ss2xm90gdlyozg4y067bewda9xxkwucon7ylljyyk5f473rc2oscn4uu8pfuwcv9ghvrahu3utzi1t39pbs5fmoprj0mjfsjayyq63kvpkzri335b3xqo8fugu0w4o7xjx88qcsyvmihcb08jodv1nqsk2251hp28y',
                        params: { "foo" : "bar" },
                        offset: 331717,
                        isSessionRequired: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateTag).toHaveProperty('id', '664f8a4b-d548-4994-9dce-d293e0d646c4');
            });
    });

    test(`/GraphQL nfcPaginateTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateTags (query:$query constraint:$constraint)
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
                expect(res.body.data.nfcPaginateTags.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL nfcFindTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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

    test(`/GraphQL nfcFindTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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
                            value   : 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTag.id).toStrictEqual('b14beb99-e0e8-4e6f-9505-a59263cd6eed');
            });
    });

    test(`/GraphQL nfcFindTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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

    test(`/GraphQL nfcFindTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTagById.id).toStrictEqual('b14beb99-e0e8-4e6f-9505-a59263cd6eed');
            });
    });

    test(`/GraphQL nfcGetTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetTags (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetTags.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL nfcUpdateTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '73c4343a-093c-44ec-92d5-c592e4e5d1d4',
                        code: 3335423371,
                        tenantId: '62455bda-3795-4426-959d-02f1bb0f9f62',
                        tenantCode: 'zuj1yqhhpm9dg13r8wl90dn6j3vl4wcktit5ph8dp1ci9i4gls',
                        urlBase: 'ne7gzkl5q1pe9mqu8g0fjd4scexn3afqxj71i8xuc2s2ov8fcj24hq7reb0or07hv7ai7a9cmzv7wfo0klno8uk3ith8n19tg2pwdb3g96cx3aadqi7yr271d303y59wx93ac2iw7w4lrtwzyn5571au1e7atrvq5ih31gwhap4psfznw822qejwlh9o9slgts7jpgd3neb8ytka0opieyyd1ftkhmj9wpmomiqw34lbumurf3g4h53gh9kkosa',
                        params: { "foo" : "bar" },
                        offset: 515892,
                        isSessionRequired: false,
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

    test(`/GraphQL nfcUpdateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed',
                        code: 6104985809,
                        tenantId: '0d7ba885-0f6d-4149-8d2b-8e15081fa80c',
                        tenantCode: '82uex9r6n1ezzclgomyhqi4k4q2715h11u4e2pbrxworqg8gn6',
                        urlBase: 'dkaqktth9ux9d58xrxen2a0yexxwbdvava3zgb6amm1gcqc96yswxmo3srsjc6n5q19o72innm5v0y50bkkkny4zp4wv1gpy4zehih1x5vfn0nuoiej7vcds44nqzcg4cuwg2wz1nsq435zfx0yurxkvqm7rd2nbl9tsrhiodqdwguixmc0o33w65hvyrydghsv1fh2u2b7srvadlu85q4p7j45j9a0tyfvl4e55ebdlmox1adp45pd8nor4fkt',
                        params: { "foo" : "bar" },
                        offset: 366562,
                        isSessionRequired: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateTag.id).toStrictEqual('b14beb99-e0e8-4e6f-9505-a59263cd6eed');
            });
    });

    test(`/GraphQL nfcDeleteTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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

    test(`/GraphQL nfcDeleteTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteTagById.id).toStrictEqual('b14beb99-e0e8-4e6f-9505-a59263cd6eed');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});