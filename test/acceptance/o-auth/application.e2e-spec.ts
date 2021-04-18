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
                name: 'kymbidx76t6wvnxan9tolavxd7cgtbqi8hji3c8eb8g66629txa3ryeonm7l2e3pg4yb7lnazcrfy9l0kzqq60z39z73d5v2e7e7vsqh9qs6zgkcic9a2edgdo9xc6f5mii6fjo6f3i9i0gx06kgv71bi3fe71zu5o3jjrbw9fi7oja13b2acyz60xqvhr14utv5pifgszyi66x5grlp5uu1qwt2xm3sa3s1xmyrnww9tri8aacca6ia4e9rl5q',
                code: 'pq6ktfl1yz8fg31fmhw39imujycx4v1e9kx8nc82pabbqfocft',
                secret: 'v1uwbiw28hjwgft5bc2zas4p5nadwvrxzwop97qdaiqhuqjjzlmfieav496t6g1vepuav8oz45n935it11okqjejdf',
                isMaster: true,
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
                
                name: '4qhypdai6f25a16d5t204wenaha4eodq70ibekivbzmhlt2ifobv43k79ah1grgi64awauth38xug9quitmew21yip0bgmtv7un065c5wzpbz9nv5e0a51dxhhhqzqb9zghnhbm8317e51rlzdwd6esxat9bkzw2p1gd60veshj6qayx7jqh1sizvsjexbl8ydv835hyl5hkmfxwu7oja7kyfjykieswj7q4p7turo1dik92qicbm5b87t86frd',
                code: '8z5wlu49hcdlz3vaj0qmcfzvgi04fs2wp4nsmv9ydnkicgka8a',
                secret: 'ppc8qor585v0w8esf4ucfszvpaja6wc921kse4x6434sge8cchtp830e0p527zd9upny4llizu2f4hyr1k7bzt6wzo',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: null,
                code: 'wiuxlzri40ekffcg61r3ckcw7q6ux1645vqhospfzuuxtp20g6',
                secret: 'qk6ao26eg13rrpkcid9k72ru2t4ecn61od4bgnxqzccmqj514geh4izupw221o285l8e0yrpvg6d4uuvjedw4skxk3',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                
                code: 'gu7j5zvot4o2l5rn7v29ofc2cd605nf4zzvb9hotlqzcdck4v4',
                secret: 'rysl9oxboh5hxlmttz9zexmabb9lavccys6lqscc3bu46rgxd42oqcvzd2qfce1gaj4x7rph2tacc9a17hqiehhnc0',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 't1nhdq8wqu7cdulaec9e75nbku58q052k3pojlvgudx45y9ozqkwdg16qnocipkrq7ify97zh7tugwy0t2k8x9be6iw8kmsv2xv5ox47iksppfrid4shjd3j4gbvwmy2lh133ualof1cizv2ujgzrqpew4x9muamjltvyi318j7oe2mok2clv0vi7r030euetaf3o0vjw9pf6xo1qk26f7hgusk3p94fh4q7pkomtmy9vabiczhylbsz19i8ahb',
                code: null,
                secret: 'zh2fyhhfgw0jmy2snadej0pv3mwlgdcfq42jddvrixvqh6oyhwr9wj5dr1dbce59xjznwgko2ngwo6cohl0rcnepi0',
                isMaster: false,
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'lisi8o7yeonjxpdtcjleoh9mys2q88h3fi2zaaeifvx4l783uckeovkv4cisaotrmpwxvny0v1lw1ekopvgk0b0b6vr4iluuqo6imaiux97u2nmv2in3n7qbuc3foj2fap5smk2o7vc0l93p6p6qi1p23x55ibq62bwamdka24o3718u92fodzveayevy2loodwvazlrhpu4fug5rfw8idht9do94ym51tx9vp41csbo6cgsgmk04s4pdtm2po9',
                
                secret: 'yayjwoyglru9j9nkqze5jeojs2xkf6mw7trfzbv2wibxvxgty3fib474bf6lafto66pvw87cv37kov1z9tyeltlp7q',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'ch1ja6rwe942clpmke6rret29owgujfj14db9fnlob3qvezy0xdvuc08x8549kse5vhthruzed2q6smcfzsn79fksqxfxhl9n4q01t7jwv7qm6snpwtoaiyek01c6bfm0ivfswwi4pkawdx76vxa3txweel74uln30k13dctjn7enfp0i044kmtxg6j53hiscucm0k7q8j9nrx5yck2ail6hcsgwop2zzzd8oc2b5gv812xyh7e857rokoiv6ak',
                code: 'yrsytj6f0u59ys0v8oga93rm0085yjiahel1ousky327hbxbnu',
                secret: null,
                isMaster: true,
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'a9fcqf61dm24u5cnx6t0fu0e12tgb5wrc5iguhwcg4vrheqd0kn12675budkafp7s1peqls2ncfcno4ookt2b0v53ydl1rg3izyeplg02eq8u9o1rxug1prafu5m78drcvxihdvlyni0lwlvxmfqdfn6ml7twm93x6w00nktnwqiof1ljp7uh2p3qoopm9dftabvalfrnlcliewod35fbyxd1ww7uor1oj4t0doxf9c9zuur8yczyodymayaxpo',
                code: 'x56le9zzndfhli0460mb11saccvnqd8yrxsb9tf8jgd0sokqna',
                
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: '9wn6ro2q8bbqjhn1gwwt5verl31598az265fs9wc3v2qx2ss7p7tt4kp1gd0ssyhzv3qkb7jegdnj12lxq0jrna4625967lu4y8fpr4nflu28f9mo9r7lafs77yam8un98wvlp6ax6e8j47w2ff5br08eiue47z5mykrjirdm03vgah9ykc35okb3pmfi63bot9m25hw1we3v4rtygcsm3suouoirz7z68h6qse3hdy9x7c5b2a1gpcrrr3ty0x',
                code: 'rs9bm3wi6fjanmoxze65oky30wwrpw58mucta8rlkzr5rqgm85',
                secret: 'qkpkupqgzdl7eir11mnbyl5lw3lgwnyjmmfcsa264owaq9hpa3pz7mwua0q2nzy6u9k59aiywxogimnyt1ommk36rd',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'dwti4cihdmh8k8psa5ykbai2vbvjxf28abj0cclm8hdps11uhoz54to74c9dw0236dqwtlz710woiu9pu14873zewluiyw6kfe2twkd5kw7o7k56tiyut8j7sefcn8op7chyuuk6s60sasywi4ow5eoz6p7jd92ubzrtskj3benhxb507n8ylliw59u5aaa0fbuzwjs6aiv6128w125xoshmc10vw1h4bwegkg7ldws7gmsoh2v7mdfbxkoteth',
                code: '6by717mioj4ey8cs2uscvr85irtslw38xydzeulbsoibkn1efk',
                secret: 'pmpchxmfxyqi2h3m8gptyv4h6l0fp9b964rklmzdcivc668jsmwe319n2bmpqblw5maazs6a659qz3nha5va5j0eqv',
                
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
                id: 'vgfwwyetsg3n05rm2n51q3ksf0fbf6pple1nr',
                name: '12yigi0ior581fjz58js2y4ueigymbv45abjwcvvb388shdko5k2kni39gu4aamnejsqj3ku4t355r8jxks9xw5slhjzkg6ln8ssb3u11rmfsj01boq78x2c8sgvaopl3pijnw7ml3ft5twtjin7ktxbjhv0n9grxvuqojr3i4fr78kg33ndptbvetyv8waqatg8slk2aw98zdndlvlvtkuz1k5x3wmipiw3d7xv9iz6t78cn4rz6pzg8lo9y5w',
                code: '4e161nhkyr1hi326baljz3xigfj188judyrfkz1nuzmt62fzea',
                secret: 'juqta2ls3ryy9mkfpxozcmjywh06u847r2oy79f90m5hxleeoqwrn9vo238tdcylpyg2n1ml4qf01e82d0obrtuybp',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'k1d7cjhs5kprmtqrtls8d3zk8sgplsadiblti5ji4j3q38ciswb4wjh40bhrjvum1nht43fb7dlgfsd3cucz7sytqn7so6x77rhydczjee90rqsk8kc0nk4ejz2tpifn96pch6urx05rw0vbegzdswwpjjtht0js798ir9vc00er7iv6qtzvz4t5gllkfccjlda6ic3hl3nxlsoyxpddn9rquvsfprl9zi5zpxn7xav7wx03vjl8e9vigzbw32sy',
                code: 'sagak9nrf6928ggfeoja87d6gcvo62gw9wtyf0uly4vb6s30pf',
                secret: '3g7nkpix3yxdja7kgheq88yt45tq84mzzqsl2urv1n63fb9kqg0v5kt9xytvhqxoesae5xtvsvf2v3zsj1uj24g4aa',
                isMaster: true,
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'ano1d7bisp0u5qeb4pir93uuylwexzrmjya1x2ugshin039o7mr91mmbvzaubbhcfejdmghxli4kf4jzruj4s5xnk8gk7cx9z7ea9casjp92et9bree4a4x2l6rwj6e5l59ytp4anl83at1gmdquyuy591jm9pi2cg8j40ddgs2v9iyc0tqzaam45ngixgp0j5z9afsvmj0bdazcl4vvlrau4qcjysfh3cv7cc2rvuykd7ijpfc9grebh946jzn',
                code: 'qqrt0rlhkbk7qnxk6bk6bbnwbovcht0rabvl65p29wnpwsc0jl7',
                secret: 'yyd4pk51qtqsy16v00qavi6a7126gdxdxpycwjhobefwm8494xs53zmkxt8z37396jwjryy0fxg0z2msdsh0cfppmv',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: '4u5r6am2mkxjtp4uku8x3i8aw0gej825rpdak9iywsypngbx35rbb5b865xxfu3so9h8bxj85lyutjnuec3qerbl0lhpat8ezkqtn4jbjs5eyjkfb3z2d8cyb4a6a02rjpxthw7xnki2tscvv1v05sgef86i8n28xk4t91txg5ry3jkcdth3ysnrd0k1u117zeymejf6wpd8kf8d5ivqtx8q81n7jobzh0gy9us7sbzjfb1ul86eoejfpg6t10c',
                code: 'p9lauxbwtoa8gtohzyq1autkit0rgu55tt26xw6mvxr4rnc2nl',
                secret: 'e4rkz42q7qgpdpbe9z3im75su5hbfgzr5m0qk9d1yxgcoinqscq8lbhw1djj899ewh0verbqwuxjwv8pr7hmbjqcx5i',
                isMaster: true,
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: '9zjuty9uhymknqcx7kpmchvurojpy1comeqjhy0s71zwf7icdl8gjy52czpc6viyku9yixctn6wmxi3pr7nkrrojhfultfusvtw6sgis5jb2t16j4gyr5hzi0ytva6x1zml9f8tg6czo4fkolegbpvvk58tciwjr365r1po14ngdzakpslj2v4lepveo5r2bcqchp9qnsn673tsp5cp7iiydllj18s1rgme1u0uivudx31i8ue6ufj0toerhlnz',
                code: 'wcmaathxbb2g8v7n2bwxbd68v29cwwoyi7xgn94uw7yxi5hu9z',
                secret: 's256ohvz0g9xdw13m12hbu7iirjuxxp1nlql9pxhef79qevxe3pgmnx86cewwma5h7wkpr2z5tza12e7vp6oytpsp4',
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
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'lcok4bhz7uk9vke5cr13snvsiin1aw05l5qyi0x3gwh7sndpq7ge8xosoocawowtwakqxrorkqpl1eemd3eo2rcg8rz5gu69adf0uqd12cmspq30a36n64td1e0ajnpx68vyk2e8ivjg0mw0h659ywcdpma79mj51k0tgm270dj6q9nnbt0rw5t5w1lj19rog8t7sarfjit6cci6clovpnh8xcwtjwie44tglaca4bd8nzp0tflle5xhg4xsliv',
                code: 'r76adfmxt4yhxw1ep5kd7f41ftif3gzuwvvjlnpr43k7xvrv05',
                secret: '3xtz5670kd4kvw7y0zo65x70f3afifuro30m9h086zrog35omtqt65g57tshwg783o635yrzuu0uk249qczsrymdc5',
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
                        id: 'eda83cf1-3e8d-4fb2-8db4-4a7d650eafd7'
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
                        id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '15a6b72e-3b00-428e-a1a4-b5f876b36f41'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/2416874b-8cb8-438a-83a5-adc55fca038a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/15a6b72e-3b00-428e-a1a4-b5f876b36f41')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15a6b72e-3b00-428e-a1a4-b5f876b36f41'));
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
                
                id: 'a3ec590d-0350-4cf6-8337-8b69a7f96a04',
                name: 'xpyvs9fuguuc1dqusrzl2rlpmilr2g1sqj7cugtoq1vp1wxdjmvcx45m08stou8pfjvoiak2qqwmsg80i3ol2o6x22o328zf1x0kbpkywrwdlrz4254o0sqy7fo3v5xi16jernyrrmidos9wuelku5ibmslukbtplk6qbt6nbj6udmmmv4u8bvx4qbx7uxidyhpcvlru4tz751600tagxv22msluhoy6tnixzc09m5c5zfhycfte7mp7hngasjf',
                code: 'smvs4cis7y3guzufjxza9kb9lzisyaxw85r8jy3exz0k9m2lnr',
                secret: 'f6c7cailcse5pgitwn9clbltttacepr1pd425c1ul9caowqckdzw9yt2v8uvyyw3hqb0ylzynwlr69r04b6m4x8oca',
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
                
                id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                name: 'cj8tvdd39ss4gb6uhhkmn8kkkjtuudkwe65dudljf1nhcuwvha282mr6c8ghiq8p9fjoxidajktokr3980hhn5ge8eakptudlxalia1yt1uovk9sk17ko85bkmb36rzf5projdntz8axqllr345le17erfizq1am1a8dvvtmfu1adjcajqdwec9neb0oliez4qcbj1n5ul005tjecswkx3d58t4gqrfqoq1cnet4f424zi6f4l843e01g1pisai',
                code: 'zx9f181i5v52u6jjek512qutqok5z9qvjpzur1e52i4tixpejg',
                secret: 'mcm3xx7kbmfngik4pblwou09q7jel9d59k44j9bj14l9paq5pkcqc616w1txn7illrxwqy0d1gepouwbrkngci8ph3',
                isMaster: false,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15a6b72e-3b00-428e-a1a4-b5f876b36f41'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/b94dce50-f7dd-4cca-ba93-045b505aebcf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/15a6b72e-3b00-428e-a1a4-b5f876b36f41')
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
                        id: '4ec455af-6631-43d2-be49-65ff3f70f7a5',
                        name: 'ldgj7m3qgxubo4p0mef3pdho6vi5o1uvyxioqtw7lq4yfnvcg7ud639prnojecf7nzmd9pmwkxfbbpj5skxcwy509w8fwair0g7rezpmc0is8k23d5u881bp2ewxfrunvlg5qvn7z480g7gkiz0ckwxpcgn2n3w9fqf9zu3emtmjr2b4lgshudhzcg5siesb5lt2p05fivxgjhzyoy9swasmkeaa61vz6p8hhwvf2b4o2irg7q5ivcf09xivy5b',
                        code: 'xfor3kapyd0enab16rrfyp7o30sps5z0ck3s5p4lz65t1u1ofa',
                        secret: '3vo57rec2ei2l21ky71ku7en4ihicbnhe4m9j6xa7xzrwlws8zoeip3x89i2623o8f3szervvmmgjda2q8ii41l35q',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '4ec455af-6631-43d2-be49-65ff3f70f7a5');
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
                            id: 'bc1970e0-f733-403b-baa9-6aa210a1f955'
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
                            id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('15a6b72e-3b00-428e-a1a4-b5f876b36f41');
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
                    id: 'f217fd58-3ee4-4b5e-ab54-4d93fcbcbd7c'
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
                    id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('15a6b72e-3b00-428e-a1a4-b5f876b36f41');
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
                        
                        id: '66109189-b340-4436-a39b-18f7350a1134',
                        name: 'f434vb3wn6b29ryk99jq354sgr8m94o57ynzycgy7y76jko0b01ydigehry1fjo9754ryeqkyej0rbr7eaxlm42t9pmw1nmilhik3x4fnd8ecqhxvq79oa0v0qx24x7qdtj170x2t9rp66woxjofy4wquoft7p80slat4wj4ohj2pag3oo56yca5onr1pj58n73cg5jvitm5ayiafjn0m4986l2c0efr5y5sozyddltxic6j1987tbd3sja4ank',
                        code: 'eqms8p00hieuibgxaa8dr5efsype9vr6l6sxehww92sny8ly7b',
                        secret: 'zey5ct38jcsvw9xpw2akii5135hxn25mcdhg1lamwcoxmt7ius4m7lwrlx40emim21839uvrw9jkdi1tzb1chz4s0p',
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
                        
                        id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41',
                        name: '8yjrdda3zytv7wjnrcrwgsv55m8uk7nnyozbqfzo2plmme76d6nj53j5807uodmg5x7yqskmdbel95adxeq34goakfw51015ddwkhgk4u6mfcoa7pqy4myiv44ra1oc39wxbjubcjezme7mv1emca5n8pklxw4x356pvptxaeibvkl8hqwbndatgqawehi46rvz7y0en8f7oxehy3nrrevwcw48ikpcmup36ouv0y5v58dzy8669rr92im324f5',
                        code: '1ulfp0htmpcurejhofi99aimqghrl88t0qilydr46zl93hurla',
                        secret: '4pjziahe1epchjyp9c9k6es99vztp2zojstqoeny96jbat3g050i2dhevn87xr99cgjul81l1hwkf5n6h9gq5qeh79',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('15a6b72e-3b00-428e-a1a4-b5f876b36f41');
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
                    id: '460c534c-643c-4370-a43e-861c8596b9ff'
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
                    id: '15a6b72e-3b00-428e-a1a4-b5f876b36f41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('15a6b72e-3b00-428e-a1a4-b5f876b36f41');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});