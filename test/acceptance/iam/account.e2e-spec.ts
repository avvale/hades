import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('account', () => 
{
    let app: INestApplication;
    let repository: MockAccountRepository;
    
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
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: null,
                type: 'SERVICE',
                name: 'icg90zbmdirdi9evgjgfd0b5ujx9ec8so60y1y01v2chhn7zwnrnaz6rk6vb1bb0v1klxunz6c7ib4db7e121we8f6qs0x78is1lkhae23hjv5luf2akfiy1kp33b1dp41t4r36eucb8s1ah6zcruywn21re71czv7abu6lfthx64f7neap0xrqzkaoc5b9ue94p91izebotnycuv62j80y2txltu6r0qdcov00jo141w2szl51yzs1rdqyhjqm',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                type: 'USER',
                name: 'tfc9m97u43rsd92qoyaokxo6beiksckh3fbnzid5ztconcxfx8ozkzn72736xotq05ehf6sshfhr5jtubmhksqo5j54zi9pj1rgwimv84i00txs6wwki38zznecdak6oofd6ok4n0xx9yppat9s3mp5zw5q4rc6u2ze2i9uoskeeg3tcq17dejk1sv48ezg95fdl6or0zjsc1qod1cjgxau3jb2jzikq8ak7pmzyy3noowhvtjzultsj2op1t9h',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: null,
                name: 'o42u7fserpm4smivwnxu7gptxo29o4ycsthjv922totkz20ccuir8c0f22yqn7gto5bsmefqoa7srr7hwjaaynzngehl6wgcojzeyl3jhx7finsnaegga5qexp56fn5wxvqodeeg3s91wajmje9wxyiig013s3aiwdk9ku5hqidh9jot0ctfwwwsxg2wpfu9re8jj8586jhiwrvfeolcon7er5n9i8iui6de4d6xt3j9l2zuftpr0u8xriqudqy',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                
                name: '1cgavwebkejuyiziqe2o106ggbpx983448cx1gh9lx7czjs1a03h7w1y9ekn76m5v2cd6hui7psn2ql1p9x6gm9sqyzr66mdbq82c5jdqdavuwwepqaahv3jgrvyfer7vzbpgzc08ykg6nxwa7femiqfkqn43yg5zlf072uqdxrghtb21r3wulhuljx5w1pfwz14hvyo0golqyvrbvcemkvnlcmrs88ppe0cq6pr2zt8gy2be8vix485yrg6mk2',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: null,
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'SERVICE',
                
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: '183c9kyyj0vxaocjsywlwnezt30dfjg08dve9pwgw8uvuubvwt9ogfmakex5aauxmwagtte671qz0jlf4n8kn06mto8sy454xwpxt8ur89nvsasyxi2d1djgepgf57nrjr7wxb8t7zy5iyoewwkb5fj7pzx2va4ssax3fyyp6d6min048jlq3mm9qsle8hbwh3z46t8bfqv6ukkxw8anqp2dk0rubqvo5l2m9ermcljvb8g21ul0mr6e16n6933',
                isActive: null,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'gisb0xeepexp0vy536pubz0htoap2252s7mwn8i6enivhntpddgu94wqruthpvk1xvtx09fduvtpw4dojg2bw0y1iyo7jfyz6er68fyqx8sypbatl3faa0hlvzs2vefvnwpbyu5rkf3alf087uh7czp98ovkxz0tt7olzm3b3fe3djj5t6bxed2qlaw5jjbjxkj0hmnscqcc5n79tlor0rm3ncoyxswdimmvbxluelprxy1mt57i2skt9ih5sj8',
                
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'uv7ym93d5kmjljlk3cg8wudyxwrf7we12sgep4pvx8t12svvhl9f51mzyu01hqq9yj391kf6p9jbh82203jtt83dea427uikmyvrn3ku816nbzu3e27u2780kglksww4k3lb2zu7r5skmr1e3e8aylbr0ngwgv26pdjrjem070lcqo48vqm3o41cu1ckao4uoj5ebhs5d7gx18byzbus4kgoh3zbchzskg2j58awj0oc5yo7ilrzsh0nqlwderl',
                isActive: false,
                clientId: null,
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'SERVICE',
                name: '8n5ljw8dep7ccwkjf9jgryyym7yt6v6yusf6d6ssz81136kjz8jtobvr6it380q5n3c6va9yzzmympa8xllbmo8zxm4kgiv0itanadefy5diy1uj4r701pgesn1739s5fmc6c0ihetbnrrbo07tduavvgc8rq84m62o5a6bz2ao2f8xhwqhsbzi4t5blefqx3df98czriwheo4wzrf8t8ou4hrb01hvlt9k434rclm1c5t6egv0y27tnhqqmh4x',
                isActive: true,
                
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'pftghise3zpn81nfdgsz658g2sk4hasqj7xie10tbtp3s9rn25th5wj3wbqecxzzo73hoer6hcfg4fjo59s1wyaw8logxwdv3b35mq6o41m6r8tpi9671cvrs0fabalhafkfzujf7tz6v42eqz00upxg61jii8ipk519ktmwta37ki06rt1v2jrm0zcj01lgtmcpspkrpptg23ow76ntcdjkoodd01dmrxfsmjco6axhbi090phi372s62pv5wm',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: null,
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: '1iqijc4btn7ki2yojuzybavj4gaajse2elw1ytxuoff1oq2g184brxlnoxkizuxd7oloascipf95fu73ns03kihfp42odgjh83vm5krp96qb4t5xalfhfzwf805eas16yxd3vej56hndn4ayfmaph0ytoy8vbqzvh0lhzew6so5v1egk27fur177j1endnut1wgba82jwww7qz0zywfonbhropg1n3hdi6fwv3ithqv5z0xeq6mkzs3pzl8nlps',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'jx7dtttc08mo39b2ykri3olg54uyzyyzpkgb2sgmv2vweq6knxm2yhf3x0ak5dc7ie8cca9xl6yek94e74h9m6d8839wvpqqhqk98ji4tpjmne1772w1hx4pos0kn6aem2tc0hkf6zzhrwzmgjg1unf2bu9skntgbnzmckk78y162w4rn6nwd0nzxlsbsvdlwexss0va577dqxovos8khssua8ga4mqh3gg5j1olafby28c9men7w7hs3is8i8e',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: '237yz3khddvpj007dx95rp4r0149rsvui5wc7qlall5ygczkl07a4ng7y0yfo1vdor0shc7e7wvk61yn3m70ehqyocokutcyr1twwe0r931hoiqqwawy2yc4cbfa5yl09uoqqzwtbm625ngqdd4fa5b0uv262i6mbyz693p773uqxpuydjigg56aibw7bsqdhl0ww9xmw6i896ars8dkb3vs985nxors5pxeo3evsx0qe3h6hkeqt52jupxo64j',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'iadcjn43m4xh7ustyfxwsklnbg2c4klv01lp9',
                type: 'USER',
                name: 'vhi0m26atn67ocvqc8nxitsy00590e7rbq65ueq1dkn5e5vwsr9l8tvi7j37r2103jkhne6f3qfgy8brd9ucsq7s22ogjz1e69mietawxjczllddi7tam8w2pk9xqo7c257uvhs72k99z9usexvhrhvtyu2pccct68fu438sjypprzch76hgue6vfuh6jex84g58f5n27fv9yat1mn0bwc6rdmfnptml1gckc4djzlloiuqrdji9q4k2lfoj8oc',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'sy5rr44ujewh052gkvrhi8smr7ut09qjvjfd98xmjq1h983eu0c6oengfnjpoqbookmlfpsmixyzz2jozq1ntlro1hkxgp9s4nqubasux0youkvetox8olzoal2lmc2c7fta6mi0rysn1zst69yw8ritcxqrfaf221jx3c1dcstcl3y1h84zf7bso6fs86r9t4fe0z0027g7f7y0ti7lqh38yw7gngu9fqlatfjinz6kh12ytnl45ti89inlv2d',
                isActive: false,
                clientId: 'om80ybnalbq5m1vxxkbte5tx9rkyqgul7ckpg',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'y4g2fr5ipx5uag0oq717mes48hpgb4ouzzyse243157ub9twwgzs11z3bxrstts30teeilb7nokosqw7e8sw8j7qs1gi5e8db3o4plf82mzojvykp5053pyxjsl8h4rlp7zhbcfipqvgd6x00tea7mke1ki887cyon7xfg1wbdirqstwnh0hlk0il6f9l1wvzhqaywwzlixwzy5ihfq19a8wrweophqyd8j88acjfty3ui2jma3y71kj86kp3op8',
                isActive: true,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: '9nt3aokgyellxwz0xyk8o6ijtl73mgpbbpymn00b368i8s32ick6el2vl8qc9clpuq26bk391p2ooisjqg755kh86vp3jj0bbwzz7km284lonekfle4h8azjmk2sy8v045c1b2gy5xxrca8hoab9zhrxxxaw1sqdudbstskiyxgea50mpt3zyzy7bk4vu8ugc0utsvswee9vi20htx23gy78n36ce3hd1fffjo9xkeweblrpw12hle2gtm1fx1n',
                isActive: 'true',
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'XXXX',
                name: 'kkdcozvuc28njuj83ohjh20ntoh8xso43emw9o8hc7kjtvd6cuiwrb9gjkcayu4p8zoogkgrzawulo8qq2ee2ubaswhai70spbpjlw5uwdar1ldwcpasb4qw49s46uw9x62e4obkq91h5g63zpfi96ukr1jz9vdndm1xbckmwtghje4kj6mzctkbkipi0k4dxzprlb9q8fzus07z79ud24a7tq0yn0p4ucqjpnqdrinbkget08wla9oi074436b',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });
    

    

    test(`/REST:POST iam/account`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'eqip3ykaqald6egpqn6p7hkxaqy8d91p5dbd0bnbo6h4vlnfy9npgkeym2vvzbx5lpneevuxoy6i7o6ip82zghvmjsw4ft7uqvsip7meyuklwrt8spj9a6en526c1i1romhkf48uj0brrtt17l6jkb1n6cgkdu5josi8i1n2qladt7aats6lgwbztbpaodq9swoj8twr0eggrfio8scfy6h1cp9vrmul77xs6nbmkot8uwd4sm3m6ku54xujery',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
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

    test(`/REST:GET iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '86c7e6cb-55b7-4a98-a4ff-e115ab77b6fc'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '39a835ee-32a8-41ef-a186-bb67e7d429df'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '39a835ee-32a8-41ef-a186-bb67e7d429df'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/15a0bf2c-50ab-4e9b-8497-d65fdaf0eb85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/39a835ee-32a8-41ef-a186-bb67e7d429df')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '39a835ee-32a8-41ef-a186-bb67e7d429df'));
    });

    test(`/REST:GET iam/accounts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '2e5c169e-ccfd-4fa5-bd63-f13747a22480',
                type: 'USER',
                name: '67f62d2u9kmdzzum4nv49mvmt0j1rkhtxp9uworzqjkqhxpav0dpoc76hwoghjak4itv4w95tythu3tw4rpfi4od9giu5dolce5w4n87ywknof39qn41e97rrna90g5azupwda7wb8c2h5phh4aw04jhkgtymqn76v6d053jlzn21bqhfl0tmgr8idzwkzlztdjtyw2mqro2mm8ro2iw3a7drrn9do62kfosrts1k9x3oajo63ve8r37tobjmk0',
                isActive: false,
                clientId: '3bf71bd9-86ac-4f2d-93bc-30aa3e8b29bd',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                type: 'USER',
                name: 'jhu2q2s7slstc5wq6va67jrh0w2djuv0xfabpj0utk2zz70n7whjplva7n1zs8gk4qs5o29uc99vy4z2asc6b5ncfc79virdph52bqw807opm7ozf81k2c2akn8ki40ibft48e1grh1j8po23d2pslupx68k106elllzlk27tbdppkxn2mxvszaxbh1pexi0zodnjgc56jggoituuwxk4in62iw6lfnmid1a9xz0t9fd5tpk0rytt8mylva1zu2',
                isActive: false,
                clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '39a835ee-32a8-41ef-a186-bb67e7d429df'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/eae3bc08-5b5a-4826-88f7-2ea32bce995d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/39a835ee-32a8-41ef-a186-bb67e7d429df')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
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

    test(`/GraphQL iamCreateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fd2caf30-d1cc-4dc7-a321-850a02fb166d',
                        type: 'SERVICE',
                        name: '4z83v24jo2snjsat5nfxgo7c4qap0pdxssnbufhqt0js67gci9601689dvxepmvcwc77tu9m9xjv8898df3z0wdoo8g4oklbpamlcvalebfupzunwl656am686ou4atpl4sx5a4swop0vca77h0qxcy2lihnwfowhhuum49fqy4jtqyyf8q7ver10umcobvhp8fls7n9uadw31n5pw6e4eyfjtnsocv1cgtgqdl0mg1g7rnr0vsufzad4gt6oup',
                        isActive: true,
                        clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'fd2caf30-d1cc-4dc7-a321-850a02fb166d');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
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
                            id: 'b96142ea-af39-4cce-9acc-6c4deb5ea2c2'
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

    test(`/GraphQL iamFindAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
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
                            id: '39a835ee-32a8-41ef-a186-bb67e7d429df'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('39a835ee-32a8-41ef-a186-bb67e7d429df');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '260cef26-6458-4c77-a582-c0d1d33deddb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39a835ee-32a8-41ef-a186-bb67e7d429df'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('39a835ee-32a8-41ef-a186-bb67e7d429df');
            });
    });

    test(`/GraphQL iamGetAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '76b10b62-2312-4b3a-a381-c63ecb18d862',
                        type: 'USER',
                        name: 't1gfkekqr538w02jepsryqy53k184x19a0g5abjs2d9lotqdnmdwrnodu7w2mquomx9k21wd8dzn0dx713rf0fuorzdkh84own5k1p4wzabffqgezan404l0b35ixm9j1fcv3zyti10wpr2luvo7ryktw8dl3fhen4bxvu4tz7kwfg7qu8hkxt51go5i8pjrm5wp4b0ew4dkzfmiuw2lglaj0y0yt6aofygddygkdv29dovur4wlxvq287pxy73',
                        isActive: false,
                        clientId: '6f39b1ef-5528-4b9b-90ac-b7bd4630d307',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '39a835ee-32a8-41ef-a186-bb67e7d429df',
                        type: 'USER',
                        name: 'z2d1mgl3ycbtsi32dv278s5tdxolsopm47x7nj22y2tz3kc4k4wquot1l3m99tqsyxygmjkl954k165phg9lgagkxie2l29vxiaxkld2jkyn9div40fzj8rwz5o55cimi1asytzxcfhum2fhu9znut7iqj7ptgwbcfy3kp5v528hujrh11rg2nfg30o31k6a802ldsp1kx1yw0rbl2c6s9t4nt9tp3v0oxvbi5t02fta0us24qrph9wjf1pi5bt',
                        isActive: false,
                        clientId: 'fda397b2-2dc1-4f94-88fa-92a08076df97',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('39a835ee-32a8-41ef-a186-bb67e7d429df');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0ff446aa-dc00-48d4-8b98-13a4e9371e37'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39a835ee-32a8-41ef-a186-bb67e7d429df'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('39a835ee-32a8-41ef-a186-bb67e7d429df');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});