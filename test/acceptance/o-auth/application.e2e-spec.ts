import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '6cj7y7okr8vlp0812c41j99ikcr2otzoh1sexudpfu39hpnpj5iy3du358wi15im4coklzep8w13i301wvju3clyin3i2t2umad4rnvmuu43slxhstao4kx00tow8kb9qx379rkhfb18yxp64bnd2r1tybv0i77ppbgc7fvz9nps3w5zoeq77i83kfl0edzcmzevjc3ci6yb7gudlrq4xsvnth2jq93ylphd7harikaahstho541kge0wmonnqn',
                code: 'njahrl7w2l3799qyzahf1gibsahcgolptj9itpi9nu9ofmf7k9',
                secret: 'x2cc8h55yubjxl5jc8k4xhe4s4p7wcu64uwbd6genix2g99jjaxndjbnholnw9l53t1rpj2iggcac4by47gwp0pji3',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: '8veu84dctel7gygqqsjm0qjul51p4mdeewznj393x7c8dhtkqzpcrb251gczt6m18p9cux5051orpyc0u1zm2mkp1bjvziss33n5nzfz7q88z4gt6prr1ucxyc01f4f6bd2ho0fu9yrcmnd5aqepqgo31kxbm8do0scg2h396foahq7if9few0zzdvdgjx6qite8fe3thl82o41yfq91wq54seis2nobi2sa4ojdjuda5fproluf68rlxztk4w0',
                code: 'arqrhkp3gfd6cs358o1j0urdiz3hzjm3hknfji3rhjuedtnlng',
                secret: 'jqgfzduqm9zn1jadpaku6j9qqu8zg7tfi8l4x5rjr4lwcx6t1yyjk3v3my7hzr1zs9l1n6crdfe81eq9m8m1ml4q6q',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: null,
                code: 'ows8462xxjdzluygv8iaabw2l2i6kus5754dln3420p4f3oktl',
                secret: '09e1mwrfhdmshgfvysjyfytl1fimzt0uk5be9gor81djbh729kimrkyls6w2kwnp3fi94zxx6f5wwguro60z84mw1m',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                
                code: 'in7kv93ck9cuk0td09b40m5yew0ribjutrfx3jzf6vi6wvvg7o',
                secret: '9qd2nzoedqwh1gfurh06as1jbvp0xy53882j2o6v17h0krafxnvui4koxd1gr5m8iicm8q4oa23wyhijl8ev6s7gwp',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'jrhyyagraxzmaqorz685m6pkopusdk81ns3k2vszpqjcu9yzzt48tvesjss4lz17402cm9k7113hqttes0556dw9cxakmf9cjvnokphlaovq9mi0gddnjb0hxjxflskeikxd7ek6lemu60tw81hv630r8oercs0x0xuza7lav7hanbs0ekeeddfjvr23r82hjz0gp9gd3x7i9wlepxg3xytldj9u7e5icjge98dzyce468jrk024yxxxcpdvse8',
                code: null,
                secret: 'dbr0ve1gj34gj0325ocf151fz82ch7by4neekj0jcimave19awd7uovxg8svp810uko427ijjnzbplwr06z9ahb0ba',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'pa0nwjp9wvrkllgbtp632xosknpccv12qx76dfjddnpfkvfiirtrl7z7d7ywk19261mf2ryus2ozf9ab0d79e849e5ga5hjbrgw2trep4qrb9oqhnyk5a6aybu5pbt83yijcheuno8oseqbgxrp3uu3s8yqy4pwskbzgavs8peymcjifykgmchi9mlat773lpb7tf9s6lq5qe65gm4h1h2f9bpyr0702mcruauh3s69n5ru1bh9tm6luz2xoppa',
                
                secret: 'c1zs6zuru5sf7rp2j1k8h6w1zvnoyoi5cxnr2hvqz26cy52lj3yoevkf9kylsz1qwlnbwo4s9bahta9bza9cffvtcf',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'doc91sowba8i9sebizk7piov3ywsaqeqit66ab6naw9k5dhss9u8lol1dq8z5umij6jqwus9l2cj9kpyx45z5k0h96o9kvd5dryaprebce2htftv81qazt78cjhifdzlyfy8ls6oz9ou7t39radqynkf8zv951pmugaen6oiwiz4zq1c5ifv4fgj1npm8dbolb5ejx0znlezejh8vofq5or4j7bqam8fiz1t298xbvw7jnepdd150bq5bm036tm',
                code: 'b39bsp5si068jom9jjp5038w9xk7pzng4z2cyia40kcnwnjt99',
                secret: null,
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'kzqu7pu80ggulygi3jqlebr0nvl27eonpc61qh97fvno2tep38ejq3gg70toqdec4jp3a9ujrk3dvj5l9n79pnw9qmm7bjzsri4q7ozc7zuy00uot3ol91poo8jk89fq2a4tnz6a4l5ulqi3ns96kjyq24qanwnj1h9xqw7mi77nqe695lu0drbeqlqntfw4k98qziikeitiel0b8ytskdl9rcujuz1nlama8nxu39l4l5dwbxfmloleq7hb8qu',
                code: 'd3xzy85ktpeuw75czxbc6xzxbsw9vvjqbfvsmkg42n28emmtm5',
                
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: '7vr8sd4ajs7knz669hb0q6clngjlifes44j2tdlo973su4rjugj93p3xn2dhbc246w7q85ahf7su52nltsh62zs8jar1xrbf8ovc38754qzi94uvm810d5j0qctwg2cvu84ybjhhab1l77bbasqvqo4cdubikv5sy1ow8lmuaauviz0u1wqbycllu6mne1u5pecn8n2eugu0jvdkucf2mxcnjrujyh44rvjecfs64aog3tnlrer095wz9g8y3ot',
                code: 'q12ijnynyzbvsb4gpafdozecdfle47m6q2u96j5yfnfq4pnvxy',
                secret: 'on78565zk74b38usshbdn6781ksbjwzxewpdo2f40t77l92kxi7k9jar10ifytqeur0hizfjqfjgxa7nzpvb7zu0zp',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'zibt8efeofrugnyzazsw2lyvbdxc1nnxa1ypiiuitikne3un0m091hxfx5wgzjrwikzgoc92fs0jiq69env1c9hanscmwkubt9z697qtrv9ju2cgisqddnejv5xy05z5lnt515ywoz6mi375tf9q034rjnn3dypj5j3hb5gi8zb29ic7zugnysipqgy426vtrxnzbv7swu0e7xj3surxqkyhgngo19qmoz6ttr1izbhuo3ycxsl1b8gz0z8la4h',
                code: '56p4hkd5nt2pzhm4jqjf3d8qpvqa4aua5fxk3xms8lqmvhx9dr',
                secret: 'vo1qgbxhoy0oevbi1gt4y6bhyayey4c8fem31zllu5o3q4bwz9ool9tr4tb2hlcg82df9p6dlfdd3nq75v204zm6j5',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'dlaxdf056jmoyxx3kkbwje0qk6p2xrwgyqk7k',
                name: 'crb4to5n91zf04mtlmhmy6vpoyrr1rc0xnlwfjynb4jw1fktivhu9sq954iyblflsyx6l690p932lktllpkweqgm2d5pkexjjwc1fw2tuhjznq83f5tsvc5fn52c7bg24raakq7iff9hdrhubk65qsnjter70tq9r8x027vmeosivxpv4ax6q1eydgzrz5lxlsvjiv2dzerw7raz0j8wrmgf5bl23prwkr27pfkoh5lyllsqrk6fw6ycso8ewxe',
                code: 'fxz0fe6cjle9henw6z2ndh9cscbzlgw6rqmgbqmfu5a6eg629z',
                secret: 'prok8yovdz1qypszncwcdgqolijiux8b0bkhw5dkcrxxt689g9h2o4uwo9lif6difco0bbmfxlr79wtymklq4lyxam',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'wp9eh4vk6mrkalyh527wrsq2tuwe3829zhoagz6ejlnp25z8kybpy6qeodhepp26p996tlwnbm4eq4s983xl7wbisbj1s83m1w2g50kgix2r2yi7i7n43clpp1tz8jw8ltwtu7p7497pkwbxqyaraz00st3rltnrkbjflfur6vkyip1vpwe8p911jvjtgv53xsi97ydityvlcwl6vi68pvwuxs8hwdgcozfro2at4t9vpptcuthnhtnfnazshq3z',
                code: 'vhzz1fj03dt4gsppvkwsp9ilt0qhd2sulit1xjrxcviv46jxfq',
                secret: '5vs02rdn8e60uj3uczh8zyzac6jgt0spedlefulxdf973rsy7m2hhnwy63m1x3x5xmmh4aot8fwnbz722q9o0hjtt6',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'mukw5on64fmoso4ucrt5325wbwkhfnig83ucetvql42m4oow7ads7uqwr6j3nqp5b6hhpkm0fb9b6ti69637vqoy57u2ssfwls9qztnzg1ds2a6euxndplb5e3yacb7j35d15tfk8iyvniw8scvgua71noypmdq4rlfxza38re96sd8vw0q23jhl5fx49tpvufyluawwwq6kyut6lbla2tv9cc60fut5p6qftjkusdnm8dzxksza0fu7p1tx2dq',
                code: '2kqi0ip9nyjg9uv2xph6ssfpoh7oipxfdljqdi7fwf5gihwijph',
                secret: 'z6hoyyp7ni7sbg0gslwxhhunbmnawc46nbm5po01o4ldjrlruuk6tut188jt803gihf9ebm4eqzpwpydq766qpwpxn',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 's4ov3oqmtzb4fa5044d1ejze9au5fvzf147nkoi9r3fty7de17ig9g19o0w2qslahbablmlzly9ir93ni20yojytbh3q92yr77nl46ezy2v11bhgjiu4b3ouv0r9kh8996x2x7y1g4f94kjmnti3lj30sp2mreyxjt3ryxotl08loj4kb59xi73ilmvs1ch8r9zx9vpnh1o5efs73aepem5hjak1jyqebgyf4mvakv9h0rp3obexty2dn8ue3fs',
                code: '9ugefbyaw91knjkdpd3rbpkyjw3fut6i6qyo4dnv86t7mc59yz',
                secret: 's1xnkjw5oa7ylmnn1qn6j6n8jumlk4poskn42p7tlq84ib9zires8hs3pwqoas4nqlby80f0ioi310pq0ud4mqcs3ks',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'y6cwex1aneoyz6s6v0h04f1ge6vusxruzab0wijcuw7dcm0jgt4lzy1tm4u70d8j7p55z62gmwgahfv11xh8paipa6uy1e7qo981ncslyrpbrpopyvv82n5z5x9d8ud08v8nmnuqr5e27xkiwi6vpcr4z6hwg57a8q9qrxbuhrnb1y6xkonyztn5sq8o9qs8o5adk8dsp8b2tde8p1wu0pmwwl3l34rzzioq4oytp44b6hdpytsxnvoife1lp5l',
                code: 'o2eh5w6gz9gij03d6mc6qm1xr9x6rpiv8cg9nn5kko10qzqm4q',
                secret: 'amw7tbzgsu7bp2sejyd8gwi329sw4qotal6kz6g7kho8c7zmiz6dr0qah8jwm065rp22j66z72kgan016f761vnuno',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'dxoczitivfswhce9yy55wvr8lkhs3suc07hor5u9u6dfmlvujq9wf6y6tlzn2phu3fryxw7b9a31iegmd1tmpueabd5th9rorpx4rzmn5w4hzyad651x4qqg3fjn6lsr4yb0v0ipz0846p2zdlk2nrlxkidk0jeqtw6er0c7louw85kp763imh65kufjfzzy0goch9nxe7na5o83gn8lfp6xygsgnklwyjy0z9kwv8uoge49h276j6ieaxsz3xi',
                code: 'kinraljfe4u5v1uxsdcjknngew8ouor4fyhwoznf1e72v9wvu8',
                secret: 'x1bz4btmrw6xtqv0ngd31mxe1ouq8pc40whrmw02qapigxstcj9s2vh7rqernflit4z6rhxgpsm1jx3q92o9ao54d0',
                isMaster: true,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c3021745-8b43-413a-9fc2-691fb0bb8085'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1d6362c4-a2d4-4b81-b720-9960e285f7fd'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/1cf9c4c3-50a1-482a-a45e-bccbc1c40fd9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/1d6362c4-a2d4-4b81-b720-9960e285f7fd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d6362c4-a2d4-4b81-b720-9960e285f7fd'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '795a2b26-6b76-4ab7-8b63-c096ee5f5bad',
                name: 's6jgdav5y2b0jp8fm0xlz9xav9h2hmqakzhje4kjacp2ni01y1qev1v18qwvvkeukaagslvao22h67g7aox69rbeooojvfz00g6i41wrmbxujxv59mrb039u0nds2eu0ab9np149x3gjc0jkenlbaumeidhjyl5crrcckmo5b2xasywwmpp9b9aemvhy3r3eifvfc0b65xc41aw6sbis1ez4hdre0ftj37qj8f2a7n57lmtgknb7qo9jpt8kvzo',
                code: 'r8mtzco6o4yskrcr1lwyo2imtvt28opgmmbbrjsirjgaf85dcc',
                secret: 'lyq45zr8dnz5llsym0uads47zawe9whn85gpx072vqul5a8i1sjryx7m21leyy0tqksajtlqdee4sibdjreqr042mb',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                name: 'dljda93c8ambnefeb5qsyybssrhj0266qhbs0rsls7i47finy01hhfkaehqqhvobdjozqbupa63b2o5mrw0nn8cqyrirm4nmrudeeudqa2byrx5qrypud8fo54fi4demd9ugtdv3fl0hroydv8963rvei9khnl456efhjsf7sltcb4dz9f9fxzaj62merra7fnmbyp5ozecs9bgvk5ko7zbr72l8zezuxft9kq5dbv82l8i3qbzd5lbh8qcu0go',
                code: 'phhk6mv1nqowiqpfxm7a7u50bdx3m4fkrw0gkxmg5gsmk8fh6o',
                secret: 'z6170sbb3eatobxca518vxauu3drmizt38o1qh6fhtvsew57mpvs8hig2f6p50fgxwbh94sut5pl8tov1rmwzphmx1',
                isMaster: false,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1d6362c4-a2d4-4b81-b720-9960e285f7fd'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/fb119b28-c9c8-4512-ad8f-1101eead56e6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/1d6362c4-a2d4-4b81-b720-9960e285f7fd')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a93f6225-9337-46ca-bcb1-c49a51f1d753',
                        name: 'd61fd8zs1opq3nna89oznev2bna0qswnqawsh63si4k5lypz3pcmkvxlbsn7htd4y9u1pdfg0eiwc0srgf46060aivsgg2cnsx2xjiyqkb0nwcxw7124n0tf1gfqikemmor7096ls32v43jgm5veajyfhukp2je51udbwsholfe9kkvrt2yds9p17f6hp95xvc63jwn9uzd44wz0qg1k5s6bn80kgwql24nni3kh9a5ra9oyo5r9pa4k9nedcl4',
                        code: '3gu77cm2n38rten12k0ejk8lonktow61yjj2ixuv9j5ft9gzrr',
                        secret: 'rms9etwukmdpwtt66kw2qwz2674ap6kgepanjx53wfpsvmbgqsbcsuhwtcng6gvrhu3d5v3bghja039iv9aplw0wwg',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'a93f6225-9337-46ca-bcb1-c49a51f1d753');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: '38c0a430-6e7c-4806-b2b3-382600e07bc9'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('1d6362c4-a2d4-4b81-b720-9960e285f7fd');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7787b021-3840-45c4-a0ec-06f1d80d2542'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('1d6362c4-a2d4-4b81-b720-9960e285f7fd');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2828c49a-66aa-404b-bc3f-8c263c77a450',
                        name: 'cs548yljlkh2x7in6g6jki8b6ncf7t6ke6pfhkwz1qsff19cqh1swdhov75vofdmitzmtbm0h6n0klpk1r8rv04tdt69xh1a9aiihtdxgqjkngpdbvhb8czuypgflgf2v1jlz5kotyd9942mwefs1tixrn6utzgsise9fiu9ukz2khl0kdb3wwjdfzze2v75sa6ot7yfifcyfr5pnqeoah7he7lgkbqffnpjurzvitmpnpxbpl83woax6kxap3b',
                        code: 'ohvuyjm5mmylyeeo7r00wticpfe09t9wen0phd1mnop7hi0z5h',
                        secret: 'mct3aowe0cokjdyo5ebxmhnntwoz640onrdd5h7niqj5b888wh3nm64qxl0xvk1vz8qwg6jzcuql2y11rq255758i9',
                        isMaster: false,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd',
                        name: 'nfx5sp8r42yztf2a529fz5roznmeci3qqdblrx0dawzidch8crd4j5ec84bov6m4wgz93eswaj542n6yanzmxjhvqw92gym4weadjh4dmtoovcyy8ql54elund4vq8fvj1kbo7wzxlv4l9bu8veg8p1jh0zc3pivifi9u95898r2hoa2dk2st0p1x1a9wvjnw0tyveld7df9jyax0vb2sivsabi6ltu4dowub22vwuw8fw7qtuhplutiosh53ij',
                        code: 'ac76c8087vmdoe4bvna0hje3ur8vea8j7v52id9rsu1z6to2n7',
                        secret: 'hoy2p4imril36g46vk6f0cye1e3epoo18dpiy3wcq5g2j8ffdt1yjbd5shljycbp9edke8jzdc2l5ykenlab3qttlc',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('1d6362c4-a2d4-4b81-b720-9960e285f7fd');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '955cf1bb-7fab-4211-a80e-32232936b221'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1d6362c4-a2d4-4b81-b720-9960e285f7fd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('1d6362c4-a2d4-4b81-b720-9960e285f7fd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});