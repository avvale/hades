import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'cvn2hv60t8una4kd1edlxrmcbki218zht3zb8whz6vo1253v114nvddpmvigxbpmtq6as087sazxqyrsfrvt2rv3qi0wxzrz3mff88068yccgpjxe74idu9hm7or7xslv2lywaiaia1azoz3dragvlq1333atxvi0o65kfdv3iqxa2etff51t48vg8g9u8kmeqijxyt0v5f3v8s7toreh9o8lf6cgj86tark50mh4u9g3oijmgz77tun9hnpo28',
                root: 'rz3uykx664w5u9ds0rt2',
                sort: 387090,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'v0zncupry7yngh2breyzp4u3mjjsdvcn2ml5p3m4do2mbz43dymff4i2xdknwffle1rchj7nmb5rt08bwnpz69lryh0bhd88czbdso69gsyja5nphckrtpbemrasniemljp0yby0mwx85j2gm6fgnxnhf2vg3299xg5tl3p5ngyjzdj0hnorgtov5ua7hhpv86rdridy2ojldr03am0mc4p5pwja41y35g5jvi58uhkysuntjftf17i1fccoc1x',
                root: '07ky97sw5wlornbsj3gt',
                sort: 145690,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: null,
                root: 'fkmrn2t4e14r8e4ayk26',
                sort: 475367,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                
                root: 'jnreajo3x9j8iveepxch',
                sort: 845906,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'v0y2xxkbjmrprbrzhyoxmixh87iiw0ttldybsj6pq1yef6mw0md8tsk615uyub25p7cque0a1hhf7rdkpsh2l0cmpy1kfkysah2tvtv6n5qopgtjreschvlanyfs8m0gp7tel9m4yuoegxu8f4k34nqpj0jr4hjfpb3md9b6ttfe52gbfrvuqv9rqipmg2rpshg6y1f51srmfgqb9ee5mbssjne946jld4lp9673nzfiiks2jtqac019ph0rzdo',
                root: null,
                sort: 937986,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: '7cjm4vr3fhpkbzi61fexewdrycyr3jlpc8tifc7vbdwd7sqe1i6ysk0rluyf3nwv0hrw8gzdm5s6omzanvmh0x92fr2egqo5utso35r9xxc6qkw046zma3jeu5uvo48j0wqxdwi60i7zkmyjb2c5g1blmu6t2p70uwmubckqlndijmxm2m5sxjy0zw1cn22uwbfai2adi045tfgw3sbxxdkscw579xnvm5a5yfoua6nsq1knlf0473toi10p3ee',
                
                sort: 396158,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 's80rh7aix9hmg5ovfx5szga312gzxt32gar5cqhw6kk79gglhlpv866gkjsvgpolav22fx3y8x0jfoajfvuo3zy5krffxpyp53yl3ji02x6ktyui3ymh5agpf7hn85rojjg0ubbr76jnl1q5by3wgas5b9yvs55kttv1gfi6xmm929dd2u5aj7550j4egddqunz8xkq8296xnh78xrjlgvlrdciqdb9annfqzopiug0vlkmcqvfbaldnnekhsny',
                root: 'pu0w79ar95m8jb6tuko4',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'kqqcxb7790m8g3j50651cmgy9lxkd8q2wjot3qapzm4gvugx55qfmc5fxou1fiisj5bn14vvrvsijivjnnksq8hi2k55xm1gqlzit3pd9uaosa0ovk8chyiiuh8z4hxofiy5pt208lx3a1jhektrbxbq76naudl2drtx84jb2s4b1l0b3z51oxgtcuxa5mglzsq1e00zf3mbuyjqks9s6ecpvuae8ufqwnnfbaup6l1i1vd2ww8b3qyw4s3dvsi',
                root: 'lmotnjhc0udn54t74nmj',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'u8a6qkk7x653986mn557gsc4qjeyv7iauqel09mn7kd0ine4bhopwk2k5s2nqb8iknja6facer5yi5fea6py4u3epdmw1qxd87uo5as3nl6auensvnd8pk7agdxl2ymyczhblbxqvzwovkvstcfei5414hxowuz23o3sfq0cl0fu75k0jesk3efcln61u4xuoraaxw9jxqoykscbtejdo5gjigo9l4azj89a5lkun0dnkvpgnu6z3odofdpzr16',
                root: '3com1zmk367qd846bzj2',
                sort: 666721,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'sjgt34h2c5uyu6cb25d0ki9qapx33su1wgnwhkdx6bic7pp5nkqtgruok4k3yb4fr6j0865m9k15znu1sdcdd0pyvlg3zxpmlg5ap5xjropi8sumdha5lqiz56og458a7v7lrsc53lncjtb0107lmsztd8zqm2hp4j5kqs7n8qkf59wqraxd0brjrnpatyyveboz4y78darj7os9i6e6myrongjjggwvrcwb87pq0slnbbg65fscezjkhehd060',
                root: 'kg14z57lb3i52r96c53d',
                sort: 784898,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'njh9jf09zvocgmqdy0rdftxj905dxddbkc1ca',
                name: '3l783335u4w4itez60aa4oi60vn1pby4c1m25xdzk5plo6jfcvqed49kkc9g7scn2ojs7cyrn6cme37eef0j78mx3qy0im3y8oi0gcbrgfjt6yiygr8pjpb2j9u32mnriipg0814fp2aqjr2j8lykqiqvey9ejyzkb4m5cm89kggrg3h7pzsshc6tqxpo1po9ue56stpgqb9q3vhzwiwln6s7ijrny01um1xt2hoq68k1mrglm42ut8oqsh93af',
                root: 'eqrb5ub4qtisuz1m4d2u',
                sort: 733935,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'kibvlpg5up8z068e9fl7y2fxrhz88h1kxhtyjumxe2isqx074te0xjh6rfe3jfyxc2d1ogozlhiqk4m9j6gpmgc2bu8ilhefy39bpel0h7m3kyy99rzdumqhwrx8ziksfoq933aduvw3ma7mlt4x719be83hgww1696up2dqzb78vg8bmp28a6ze3jhsd0yisl9neu302ef8oyydmnbhl2fk3hpye5mh8e1js3uhiyt47lw435hropx45hkdc13x',
                root: '25ifo831ksi16scl87jz',
                sort: 802538,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'sbslc0sn3pd46reeu7bzkcywsboy0e4xer8wx7scgig8tucidv9g7qlz4curltl285n47kpupv4wv0t2afgue4dnq6yzsw6r9hanxhf9m3ipc16rs1fqn0299h2mg2raof4aqiypt2hqre9gti6gwzqcctrfj7rezvgcbu448sf81gyhhq4241yysb73qg0yxcyxauz823wmuy6g5b5u075707o8j35lofd1jie4kud24jtsfmta0s8lnxql85c',
                root: '9m5plicr0qqli05edon17',
                sort: 716898,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: '9qarpg115rk0pl4d9v2whvgr48105no1s5qld04mbi0h8yoqa93xje7itbexnjj06lu2s2np68um91xy71hrocclb5mne6nfjk93okmgnxovo1p3ohiio9nnhmeymfydf1c7sd9t3al0gz4xi1q7tydztfqpoiwjm3qto5rmecotx2dax8xn3rkkuxsvd1jy0mkuofllxci8sfg6tv4pv80ur6r0729grlia3miatq02rinzlylre0skmqhk4bm',
                root: '0p2x3k7c8u9bwecuhmoo',
                sort: 5293346,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: '93iep7a05m6f1qa7so7o9scl7vegxfwkiofkh65m6jglmh39ys061fil4085ekxkdz8k8ox9aok4dlf7217sxi4s5nv9migm40y5tmrbjfgg569arr4h96plwt178puc6v9f0a9wte82nfzstv4psbsckxv0xkbg77pjuo0tf3jux2pdk5yb96o73n1dimziq39o3fxtbijf5uiyw4dhqjd5bqaqx1tdf4jo6of10c1jl3h41kap2btu4ro4g64',
                root: '9p4wawigvshfop7a2hvp',
                sort: 354357,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: 'gx4hlw6bmvnmiiraq9wkd71zpl91mvz7nqt7txhod5yzeke6dh639wibohe1g9tlk6adw4lxdn01k644f9wtfstpzjw4eg22mg9dqk3vfpk5ahxdya72exnazio3kuffmf7w9ar0n1le7n7c5i1f95tjggs7dk4rogjplt1c9jx2uao6vgielpnhz268rw6qli9sqyjc0z2nuikycoql6d631zwe35pqfxbaht363k4gfzxyolx1kvbcm7deelc',
                root: 'xasy0x0v15anhlq994u5',
                sort: 529026,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '434370fe-2e03-439e-ac46-19a2420eeb19'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/f6a57a52-2fc8-4208-8441-7e15eb15c096')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/a01743a3-0f42-4d25-a1e4-6c13257c99a9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '64d207fa-252d-4eee-a843-9f08e793f4b4',
                name: 'wbzcdkwk7do8kx0htpzfgyw2k5915pjq2qzqdc3kcbn1c6uobwm0xjy0vfwrjjswud2objmswo2tmdxy0y83dzhk1gg9i5wccofvksx2yfl29h57dwftq8xn0ayuhlbgv2faik5kaogxokonej97q03rw625v08v50ts5y851533snje56lthnitie6k33o1yw7yn274s8r62w3omm3uqye595fdmfeolhm1bszzp7r2uqos1e3wc1mw7p5p328',
                root: '6inthwjocbj71l2schin',
                sort: 852269,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                name: '5z0tqdqb94763xvzpa3lb79mshmzee0st2gj3xkxagejuot4j22t8wrglhtijwzow3mffeabrhkyh278poc7xiutilowqf0ju7u8nhf0m61m5nm4wu3m6wo7bycgkbku2br2foao07t21f08ybg7oyg4duqm7gwzrua4okxvr047245gaeq3bf25pqd7q8ylxgfu2harm24nv0zdsnyuwdcpyiq1chq3fatpswrhrwsbd9afq8piuy9vwfkxzd2',
                root: 'l0mza6c0gxlxltksewbm',
                sort: 979882,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/f6307089-fd4c-4567-9fd5-e65f4367cd6c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/a01743a3-0f42-4d25-a1e4-6c13257c99a9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dbf2ab2e-9d38-4720-ac0a-85273b3411ae',
                        name: 'j7obl8wztm13stu5089ee3dosm4avjhgbgoq0bh04bt05ilnqd49pze9ddtkiyaiif7zbll26hg0vyr09w8ku3sux9j4hph4wf0z8u52j76ldr4455woalnqiqrvut0uc5sncyq28kdubc4o7s8k9sy63k4gyqr9egvya6qb2hotk89xfepj83yq670opu04jyh5a57qtrsx62e4b9lojijotidk7wyznxakb1urfw3juac1sdxueg2mhcsh1yy',
                        root: 'bxjsfe3txsaiofemc6qx',
                        sort: 208060,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', 'dbf2ab2e-9d38-4720-ac0a-85273b3411ae');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : 'd7478e28-e718-418b-b463-39fc2c728648'
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('a01743a3-0f42-4d25-a1e4-6c13257c99a9');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ce2d324c-a748-48f2-b151-563218601d91'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('a01743a3-0f42-4d25-a1e4-6c13257c99a9');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '23e42358-69c8-4cd1-a689-79a4042ce57b',
                        name: 't7mvf2x56e0idz42lyavp1x8xntdcor7raav55s63pohwgmyvxb5y0hysq4d759ux6wqk0rsnzl4rzdbimcn9zfxfqqa868hdobwgvru91eeszsxjmp4qalwot1ho54zhsuyu1yy8s86l05sfdjw0tyd6x4kzc9eh5lr29so1ligt95qddf0q85ze649nzon1s1zxiegzb4xc139syuuzjl81z6tqm8k6377o6ufmyxwra2huhzyb4xnv5zl8m2',
                        root: '608qfodr9gq9tmfft6mx',
                        sort: 386342,
                        isActive: false,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9',
                        name: 'j63tdgyigdbjsk6hmbvfyakrrwh7lelucvvq1xexf4736wlke6mxpcf3be3ngemln9rft3tlwpgc42dmn9plvdmniq5u3gkv8ieipuju46bm0mphctgk9hqnpaha91zgdo4qs2gftfvphjv7wc6k2mogd5gahspab04ned8i9llsu311aueuek1dxjw131bnbni0aotp6pz5n18hdhri730jjhouiz6mysb3mumh0xucqki3wp03l4xmkrd683u',
                        root: 'wqw24egdxxl8l5xq6d92',
                        sort: 405255,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('a01743a3-0f42-4d25-a1e4-6c13257c99a9');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4ecb969a-8844-4ee9-8dbf-2d671c083189'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a01743a3-0f42-4d25-a1e4-6c13257c99a9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('a01743a3-0f42-4d25-a1e4-6c13257c99a9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});