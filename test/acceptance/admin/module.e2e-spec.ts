import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IModuleRepository } from '@hades/admin/module/domain/module.repository';
import { MockModuleRepository } from '@hades/admin/module/infrastructure/mock/mock-module.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
            })
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    it(`/REST:POST admin/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '3s1errakr67ihgfxdm7mzcjzvzjwhofny27iknen2s5popcghkbvy0eghzpfy4gredgato0gmrfsgwtqy5ibgcctzg0vz20jp4larb3o1t1w4r3sf63y9uevxbakjrsq5tf3nw48agum3jx51gacrwhpvhafxpa7dvvpw3umfdhqtyhqarjatyn0k2t6hwqpn67vk7xki1k99405urqgysdpgpe2dffilu9y6jzz5lk0byg4haxqvylruqev7ln',
                root: 'bxaum4m9o6ljjymz7z1v',
                sort: 272921,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                
                name: '6bbi7cd4v2dq8i8a1ahsilplypl1szmv3tn5el75f3sqf75iq9qbg386diu141708xtmg3ucr82idjztc6iwgmra4tsc4ssm9dl6ppoewzkckuwt71gvqpr2e4cfgz1otubxdsxz2pg25omjf68xzy4b8cbs785a4rqugv7l8xa7vmsz8ghb5rkkh5xc6ih67xo3k22bae0qcxouy9zreilqxh6wa72eaoksc5koh13jei78p9lg63ugsrxt9m0',
                root: 'tjnaqhzs4y22gzx7asq3',
                sort: 792141,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: null,
                root: '9z064evno1zkhhaorb6c',
                sort: 432522,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/module - Got 400 Conflict, ModuleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                
                root: 'jbohkoipvtgheaex73cn',
                sort: 830976,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'goou2uw7ojcq98qlf11rly5b99euvlbk0mdsxty96ytbua5tjku2c18h18pgw9jt4mrplqcsswm0p6ljeq448i748f74qp7yokxodfxcg5or5ugq1z48qzm2bekmi5un6yd04ca1ebgprmm1o1l5hb190gs4h6vhu9kylfxuj0q8kukb1vpyjjx4raila4hwh7i95b2oj55ijea3d9yic6qsbghtbp087qd3eu58kg9ut7ozw48wx90qkaa2h9a',
                root: null,
                sort: 723315,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleRoot must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/module - Got 400 Conflict, ModuleRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'ovwiboery5lrlruqumkbaja65ztdcepywq7u5dk710fj4xdrf6gkhfql8d6ykyy1witgrvoimhhf9gcq0rhxvp098yvbi9ulzjrwgarof06be00pmizudyf4ouvezft6e0u0g86jmf7q1pduorfzinnvok8kg9d5azwv0o5a8ugqbb6ant7qz6s19x05f8gv8fmgbjo160hs3hb1pi62mkajjazwr12hm3flhid13715y285lcl5wsqqfydt82h',
                
                sort: 607825,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleRoot must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: '4yfxib947ki588s0s1lq6x1zk6jc7ztbrxwjpg3ukjvm7urcsnv5b2tcivzzfj6z0gikzcd0roxjk0yxpi9s5yutn8uau7tms9ta8m3iv0q3qaoq7qtonfnv9t9b2q1un9xnb5m6ax6cg1yi8dbjiy7c95pmfztiypyk9zyep3rtb8p5uu2ncd6siyfcepvsuouy6mpqhij6dxeijklod8kdbp3dt2hjye5ovndriu5hbupqxdrqpcif71389gf',
                root: 'cm64t9x55v86w5z7rmru',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSort must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/module - Got 400 Conflict, ModuleSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'u882ykbp730y809xdru1h726bszvfredeb6ax5xr29z8ldbnyo8iu6e0cgjvcygag4qfdp3x4mt9z9ci86lbqndf5rosyb3eyfxa6ovwvb0v1rcu2t80cl75hqiye58mbzyh4rb1vhng9von5iwok5442zcfnmwhwihpw4093kx53kwwtr58qxsfrlyocsxh2tj80wk3bt7eyd8no7yitf9fgc9a2sci9k26mesd7usbob25zfzzd1455u1gvti',
                root: 'jmebbzth3tqg9wgdgllv',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSort must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'ivt9cw2mr4muvj5pw8cj0yow2wi697nbnzdiogvqejqm3c54yfcea69syr39sjmupj4fktowjv7mrmmsd7ob5gwhiitr5roapdbw0slkier8l3m8xundpolnksdpc4ykcj746yavu76z6qrqae240lk3bo8ejlkqxo5hisl87lncsebth9orn5lk82pjtskv05b7hmy2jd3e6nghtk7exelvjw85mnsk37akt5p8nc6ilw0u0mcarlfc5tr0s66',
                root: '2o9f90wej3f05h3d8lrx',
                sort: 252815,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/module - Got 400 Conflict, ModuleIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'qxdryketd4p4t33owzn0g288dvx7xeu54zauq2p8h2ef5mxxmmghrp3x5yc6gytmfeh6a8q3r0mjcxcthm4dp0si0i26hjojtjfeuee7eknxura61o97otun8mmuntcd65oi56mp6igzypoh533irt8ycbujbdhwko26ymki4oj41vljwi2hgiweiam85wmmregf1a52dpufn2qg9agw01masykxjok20dddraz0owl2b4chyj94rqiuyohu3j7',
                root: '1ywxaaswutjj6zyk7a95',
                sort: 368754,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: 'v8h4gixeoa5r0729usegidh2jfmkkk94lc44q',
                name: 'agcpqsmom7qfaufcast58sf66zuq8gqbv2mf6ei911dmprvm83uukv7x034hpsrbdcio98fwplkjsy06itjzt8do8jv0ezpygu2duaj1q0yk2mkg4rmuokso1h29ssolu25icta57m0pud7gz3o31dotef2ctwduxcdqdhe562zjz65lwg345mk54z9hdjj8k2lyr0tvby0r24wy5m6ao4i2vs342nq2dxxvaxoqfe8pggr1x6zmlltpdhqxt8i',
                root: 'ntxtso7lfjfcrrjzvh38',
                sort: 829382,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: '9mg7c07puu4mf0dd68im6uzizhbkjz6tehtdlkmb8q8mdhskmqgs8zw2kjildxgxoezbcmfty2p7qn3nloxavls3s2ldegdb9ls30biuv2koejf8t6j9ysc3g7g6qm64f0uwps8qmgit30raeokxp43adrmwuq628dm2qobymxan853fyd8u3c7tp8lv6t3zntqkpg1ubcuxswuanvyfo1eyzdt45vsom9w0h8xpkbtcnaf0suzsu1jh4jqwbcan',
                root: 'ram0e7koo8nuly2pvmq5',
                sort: 175129,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'jmgyhd1hu2n0vnlbd8zhxoxrka653saie3eiym4vexlfzbgils2c0hflc9auaq0zmmawm5v81hpgcwukh8bdmcz3fj1nvdz94n435os8gzpiqdekni95fglsssi14pmvbdkhquhn64bu5nbca2pciy1t8u7e1tpzw15p25plbihvyuuk5byr4yjujda4xs499ironxt8gzkzthfiiy6w147zqmi2birtlgb6xektm56zrvq1w64von5gjt9s5h2',
                root: 'tjfp77604gmdejlin66ep',
                sort: 602860,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleRoot is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'y9iaacs0hzja5npbt90j1wleudhd167c8n77vytqh8r9jew0hx2ukcl47gy4kwqdl226aw5vmirmddzw6min7ottcknaon28zy11yt7tj52th9oqo2q905kgatb8i12zlkoycegexx0fv3dwuinl9etqe1tmhjy5pyokjj8svikvtfvz29pu4qcgy0exti1ed4ttfpqlf4kbj66kildkms19dkt5geex69etiupp4cy2i8hesf3nbxgebe35md5',
                root: 's4ki9plxuak5rzm0wk9e',
                sort: 6952160,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    
    it(`/REST:POST admin/module - Got 400 Conflict, ModuleIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'mhq3xzbot7rqpt8p1q06zs7rxp0lb123ao81lqpok1pto2t4s9qy3emhxhhotiy07zd6se38b2v4az5mvwl8fxawa4dq5c3022wp3b4kwikbfsxew903hz1oh3foyul0bvfz1qga3f7z16qhgo7xtaji4c2nhbgchklkfcv6bcvhpbxozqy43f4ghft76fu6ouxnq6fz669k1pvjl00crrffgnneo632pem0lmgekpl4fq1hxhgjbbtyeg0so8z',
                root: '61suz8gg8puws4zuujrp',
                sort: 845822,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleIsActive has to be a boolean value');
            });
    });
    

    

    it(`/REST:POST admin/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/module')
            .set('Accept', 'application/json')
            .send({
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'npw23xh2p08w1fyse0l74k411a48is0sxhdrayxormf7e2h7r3hh26cehd1vxnnp53w75gr8jhuee6le94v6r5uitpogsq05dyrfpi5fcbwr9mi9wb9crixa4fw97kuwfaxlyuu24xvntmgiem1ez8roimhx5pmeui9e96qlv9uz3hz5jm7kii7g6up15dubwfoe35vdazq54k5v72f4dma85paogbp1qvqmp9msxzf7pjlwrlmkg31pr9e2tps',
                root: 'zeff11j3u9kf89kxltna',
                sort: 416435,
                isActive: true,
            })
            .expect(201);
    });

    it(`/REST:GET admin/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/modules/paginate')
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

    it(`/REST:GET admin/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/module')
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

    it(`/REST:GET admin/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '92442675-0203-4d7b-a251-1c3657038203'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '92442675-0203-4d7b-a251-1c3657038203'));
    });

    it(`/REST:GET admin/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/module/92442675-0203-4d7b-a251-1c3657038203')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '92442675-0203-4d7b-a251-1c3657038203'));
    });

    it(`/REST:GET admin/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '666760e3-638d-4efc-913d-907237d97fbe',
                name: 'ypqr9la76kecshq04los2gjke03d7od9pih59asrpckk8qq9c5u8c6pyoqy4ustd2jf7z5roc7sp5o0i7zzi0ppzcvkqpp8nj7kiigctmfn2q3olx5fear2hgdpe0g97vjw4kwkzmhf6ar29hxpkzkcoj10x71zyoc97vxxk8rfwdjcptyvcu6pkf64fs80roenj1uvuil6ausrw8dji97cjp9nmmyx28md64dnjxinb2l79xuq1sttjon22mui',
                root: 'ksmyf71o9pi4subpoazb',
                sort: 447780,
                isActive: true,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '92442675-0203-4d7b-a251-1c3657038203',
                name: 'adbcuxbtl1at16g8tmbtu86tvtiltfndphc0bz717gnk0bnvrzrcct0uezoq79q87mz350zs6i8y2sisijkglulayv850lfg4rntaw3305xkblb8zvk0z1asm8uimkad1blxn8aofziuqo8ts9nx9a9wh1vxvvgbgvqurz07jqzv5pjbv9f7awtry0dtmhnmr0dcdofjx966xe6q37tux9pe7e2ddro5sroh9l330ovj4ahbm1vz1v37lxu5xsc',
                root: 'rtf7xugji5y38au7sviq',
                sort: 908615,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '92442675-0203-4d7b-a251-1c3657038203'));
    });

    it(`/REST:DELETE admin/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/module/92442675-0203-4d7b-a251-1c3657038203')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateModuleInput!)
                    {
                        adminCreateModule (payload:$payload)
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

    it(`/GraphQL adminCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateModuleInput!)
                    {
                        adminCreateModule (payload:$payload)
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
                        id: 'b9d381d5-1089-4002-9fc5-585c76169c51',
                        name: 'h849gos27o9y7vwdvkhghidtwojmzsaglz5nql88d6m0f76egpabkb0gk2f2kj0g7flyoztdwh006wsvblafxcxy0k02q3jbpmjgc6ixrxfpi391w1zynwbajr87m1h6itoqqxwnqjrpg46vvm18wta6ri9jcu32wgoiohguvvww1wvz1acr8t9an05k7biklkld4autnh7jjroglc9e6be4ne6fy8bubeokkk9nhf304eiwgab6jpa58vgqdua',
                        root: 'xvfe3w4p5c5llzn2silm',
                        sort: 323658,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateModule).toHaveProperty('id', 'b9d381d5-1089-4002-9fc5-585c76169c51');
            });
    });

    it(`/GraphQL adminPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindModule (query:$query)
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

    it(`/GraphQL adminFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindModule (query:$query)
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
                            value   : '92442675-0203-4d7b-a251-1c3657038203'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindModule.id).toStrictEqual('92442675-0203-4d7b-a251-1c3657038203');
            });
    });

    it(`/GraphQL adminFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindModuleById (id:$id)
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

    it(`/GraphQL adminFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindModuleById (id:$id)
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
                    id: '92442675-0203-4d7b-a251-1c3657038203'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindModuleById.id).toStrictEqual('92442675-0203-4d7b-a251-1c3657038203');
            });
    });

    it(`/GraphQL adminGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetModules (query:$query)
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
                for (const [index, value] of res.body.data.adminGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateModuleInput!)
                    {
                        adminUpdateModule (payload:$payload)
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
                        
                        id: '40f526b3-2d72-47ec-a7cd-09cead53d748',
                        name: '8h15opk1drr3dskg7yabgbmis1jwldb5qxiyrr79nvob5na1vdv3m9zjl6gsq8egd0y0dddcjpwv31a6dgwpi1enab3o337yqdwbglp4b412ah03nfurmqgsi2wup5j88n9xoqphkdcxk2yqj9xu634k6d6tho02twg0lkj9heno6x1e6aodgyvquxsl3iy08jfx580n6fyqbxpweoluyoqdk55rwanrvyx4jm3nd5g50lcym32s23mgqnw6ada',
                        root: '4gqw71m1giw5jnvb2r8h',
                        sort: 558316,
                        isActive: true,
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

    it(`/GraphQL adminUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateModuleInput!)
                    {
                        adminUpdateModule (payload:$payload)
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
                        
                        id: '92442675-0203-4d7b-a251-1c3657038203',
                        name: '43ufkddr8rg8hwcl2qka2cwngrw9fe4jtfksxzg117k41dhe6jk5l2ek260i4tw5xlxp9s64v362672j08zqspa3mcwx8prl4pmliwo7er8jd00tx5e32am4pycyjen2prdke8bw26651zu56hxdkdepyfog98jx39m4uemto2jq5md1qcnn4ij5aq3jx8a49gxmz7j9jdppho70cybcd63tdkphbnazuzns0exhp4xoq8sp69fnwj6a8466tbm',
                        root: '3845r86yx209h6tv50rg',
                        sort: 407594,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateModule.id).toStrictEqual('92442675-0203-4d7b-a251-1c3657038203');
            });
    });

    it(`/GraphQL adminDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteModuleById (id:$id)
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

    it(`/GraphQL adminDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteModuleById (id:$id)
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
                    id: '92442675-0203-4d7b-a251-1c3657038203'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteModuleById.id).toStrictEqual('92442675-0203-4d7b-a251-1c3657038203');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});