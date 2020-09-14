import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
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
                name: '0vlmurb7pegmcjs1o156iknsmoy7dsxcp15ut2qv2u24jkxwo2u6kjdq5rskoike0ug3166jvfwofpm18q1cmla42wwcybsthn7zeyuz2vn31u2g4i2e8ub1aqci1zppvnkz159f27dl74za4i648lp4lodyvcqdz6rni1ovexmxh3x3p6uvh2jhk9whx8vd1mpy4vpbgfnxkv2naepyobqq17vug1o9q16s47n1m54p6wiv8uzlx2py0ds1gc6',
                code: '4ibnnanq9kq10eq5y3il5esyah8fmkbx7btu5x44mckbze9d65',
                secret: '5trtiqhihtnci6onkn0b3yeu5l6kr68pdivja3z30z2ju6qucklapzcaa99fyef2urr8xvuottg49rf7bkiadu6p15',
                isMaster: false,
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
                
                name: 't14w2711bbwrleqkvo9velputpu0m70aq35a6bs728cmwdifku04twqybfqw6ofl6xt2ciyqtcfsst2vpgjvnroyjnuqudsmclwrjjpzd2o76hunem47w5q4fz95vx9fcz6xaeq2w9dli3mvsqlznagabc7qotge8k0c6kspsrlmem88yy3l4wdmel84jjhux9zpwcil6qpy83sxgrgo2rnj7lqjbebmwiru2dki7hkxgmtiop6lvdxpq5lqy4p',
                code: '3nt90xc69wu2gvkzthnk6pqt9w7ytv34ljpo055w8p9jpn52vs',
                secret: 'stbvtnnnns0m0q61trao1irgic89qsjfcngnd3w5jy5r57omtd3a0zgwaauzi0u4gwmiqza9t2r5krahi0e7nl4kjk',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: null,
                code: 'gzkwlpp4hijgpblcxx62e9dcwzuttyguzz5dnhko1wthdia24j',
                secret: 'dvo4fpr48sw3e4v5cby9q0hnk65b1zcodyoz7kt7wc4zyfd8cyszv4u2q26z4eci0uaq9gtoxjaqb2q5ovu10sstmo',
                isMaster: true,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                
                code: 'lnx1dyvvtef684hlqp0m4nt9zulkvvk2sk25bmx1aghb2zljat',
                secret: '08yywhdsg6vkxxjb45d1r2jcyhqkwfodxpegdz7hed71xzz0arloq4by4qimqswx1ef0llr72zmdhjxq4ikpppyfwc',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '489jo4inlm5s1j69mcr7sjhg7qegzcnbrjoxxo1t0w8tbqgjoeerqecsaf3xkfpbmjxlogs47vg594dk77zlqtc99n9vpzb0yusidjfwk20f018upoauuw16q5yjzo2du9idbiy7rkxdeqbu56anlco8s5jmimq4619gbku3xbakgdmm1jt6wdimxplc5jpblaa8sxgs7908qcc8lgl5oblw8inhrgdhq05oz4ser615j9b9eemzo8whsud5gfe',
                code: null,
                secret: '5i3co2g7szpoznf6dgq2iv0avgzxbpqc9wqg2lp771o5hqsvfufr64aq0nmnwurg6cv3ao3ax80bk1ammktvpx3oj0',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'ivnvg1nlxb2nig8aqbtb58ougxfu5uthdm5xkb9s132et6839ftz3pjunmhdzddd39tps3bwaj9hqr5z6iaw1bhuxnf6c7qfgp8l0b8g6q6xvjlnzs4usf3okpb0pypufuz1x1phlwo7k0vv3q7cnrw7fy5vfekupz3bw1brav08pei697s5go1znxlt0ldzivweyn29jc4tx1exrji8cn3bmy6tqozsmqnk48bpd9f5iwpix93dd9qkabnwryz',
                
                secret: 'rouacl1ija8revav6gauair0aq1eudbaq98sohgcxh90ad6xv89hlsu9ozhqiv2iapfdjbgcjd5usmn9nn1w4cks7c',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '7qn86cjauxu2f90gwsn59ep1yon9ff8fi8im9f15oid9eudt6d3rfnv1wdxsravib94l766wkwur3juxbk95wwplztjbwlbadjjijq1o2sabanc0rb99mauhtnztbbocr0q3vz3hjpgs1nb77q3vfobga8gtotxg5w912ci0jbhgr5ioptqcmufrvy0ix4iit2ny3xkr3ibgvbq0ie9um19m7cvenhcfxgj1aofcln9fxtnr7mcobwf1ys44imv',
                code: '0n9o33jeiuukwiywicn60wlp9wk0g3vh1hzsi5mccz6vxt2p2v',
                secret: null,
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '8wf8pedx237le6t3jxkh7ldsvea02u72n7plen62zlvjgkupw12rp8urtoh6sv3t6umbk1knlz9dxlxifb41f2x7tuokivttby2scr02cfg2fnm84tjprxzo3rtizj1cakw9y0reu7jlc4qpj0zv1azcaj08q3sjq0sqmp4zpshyja1balnu03zvn74c8m5hei07uol2ssjg07h0jj7xdvvekmggmwgwm269sst0b34j565fzcyvx4dsur81d8g',
                code: 'c8cwt678nvtb86kg1njorons7gpamg7cyfnfhdq9ba3fmvtdpj',
                
                isMaster: true,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'irpd9kk8xxyvhji6wqzbaj26ucwb53dcr7vd44jzwlyvamniu5ld7qm46tq9051elyznfgde48mtjcnk4lga6b5k14xtqa0mku2n866h5t4lvhp3nvb36y6ix58t7m7ddkktveb69c80h1el3wzbi65ka7gf2u04g5tfg925la7fj98u0p7yanmuy8j5vej52ybnqwmkrvjostqx6caq2iexju8yikpnvmbrwz3d1vbhx7kpngx72hlyiukl32w',
                code: 'r9ccbkub2rc1riiwnutkgaa5csiu19msyp9s9q2z78y6mw72wi',
                secret: 'kol5orfkrb1txmnvkospxdszz3q1l7etyw89qj9853up8fs9xry3g5inv2jpckto8zp7sk71yge8rg58nqdb877gcp',
                isMaster: null,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'kuwmxpceme8kbv83u662d79ivtxvmt0w7jl8hb5li4r94dwcd6bgmxz2x8x339mm9uq2kg7x73kocsm0dcpzz82yoe70n2334jb2edkbw66iv7naa2kvv607ukz3s8zli6brg1ykmo6xrpeza07oz3bg9pk90hvsb33kpcg4trxhv61acv6zeqlnkvq3zrc2ot0x06wv6kby4tih91qdk3bnp3uq8x6vms60gik5997qc85sojw7o7y4fk9cdf6',
                code: 'psj0f96crz42wxnh15v80i8jmotxvzq7aw9ozmxv34yil5vtmy',
                secret: '3imgh2g2crw8650d82p612q4biy3rnrnf5yj6hn38ma3d2fg9kimjan80075mveqz6hc1m1rzkv1lngajicoh6v9lb',
                
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
                id: 'e7e6kmedoc4322otgtqvcwz2hlgpt5t4x2grd',
                name: 'z1t0z0plzvuv803xtq50hvhoyzjis4t7u9tkaliiu7562nnf0zombv3ipx3qry15gth24xok5e0ii2ellum1lbuxgftxiff727ciq9g3x3riq7n9kyi10jdg7b1hhsmh7szkqhrce84ygklkjyf6wj3uqo2lhv622d926jpok6bhu8n9ckxkbx9dtd36fqenure3m3qujn2l58w7cv1jz03o6iiveb38gx107akth7ce7ctlku01dc1zz6tgg8r',
                code: 'hq169yzk26jsqpemkpbqxpw3w0cy1gm8h048v4w7a4slubbnui',
                secret: '4w0pu3vxjnn4drexwy2k0cnpr8ucpow9ea52dnssh9qpjvrdj3cd1h7ze5dnskd2hn937vrsnwyqjev5fev4xmrnzo',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '2m658yuoj2dzzgg6rmivz2lz1jp3q2v21bgtmjc70apc694c3uttgj47j5flk66yx5zph8zji9qxyw9ckvuwbj0co9049yodd4rgweaaxp43es5atj3rq36qlo7my6e48xgx2safg5wm72bs4cb84vkvk781rtfe2gsedlk48iou97gx4zzd0deuaoq74jfzknh72vs2e2j9ehzaga7ijmk5rf539nmj84refl8878jj4uozu0t4um0254rk1dxh',
                code: 'ufql1f0x9ddsi8bbg8ynoxv0xyssgub0nf5jn4ennzbtnmjdej',
                secret: '7ynj7pz19lwrbclji4limkg5f4pmo33g1jeba038bxo1iip1zppq1nntqpgxf2r38zo99xralqehavux2ps1bo9pcg',
                isMaster: true,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'am56jk1g92tdw88xikbj6u0qo731hr7ue4thia2xakn6nguk1zgrx4r3s5xw4ba0zbvaecbyg2keqc0m0ll92aiwit3dff16owq0323gkamazcxmbpfwmymymcr4v1e0nxqum7i2k3hm1exts5qpvpsxbfxvkxdx0eoroobz4qlitaifty7n786umrh5wk7u0hvgk0vldfvnxopmzybkj4gbbwfv50bo2kn8x28us94ug3s3zs4fk6ybeeu009m',
                code: '4w2425xiec37f65ozr6v5e2i2x65adi4p8h5x8z1dtoks9b18c9',
                secret: 'jl7tyc2s14kkoaffqgr1b9k0aqk49a9pr7rqxwjysr1a4hcv44e08r28lqkul9p9b0c0qp8fxrsh135i406vin2dc4',
                isMaster: false,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '6wprjmzcfak7m44l1sxjjxxmqe83ulp9zk9q704i4ps2h6ocdf7edgfiy9n8xg7w61zfhkyxth3b8zjuxa9qxrp6k7g4wuprkhjef443zoimcqruxcfyxft9bszvvuoe0lmrkz0byttarzfq2wiktudefhpvr7o6a2fp3rdulsi72uga62dvrd2au3hyzfunuxzfdkif8ndj4t7rg63k17j9dienxbv8x576efkf5tg4ouyz61cpnc5e4x266ah',
                code: 'kpdk9ijtfjwzzckcq96k0zjpqoybuydp1nsgoqx242tz6elvln',
                secret: '5m03ylmhotcf602y6tdkw06ds0248rwzxkgs2hb691a3to79u6s0yul1r9gcv208u4suyaj2n086cpyrbwwhtjm415v',
                isMaster: true,
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'u499dzzhgge5ilqy27yf1qg7znjp7lihsoiem1oacv7elc4k1c6pjd1x4p6bcq3mojuhwlrdcwvklkybunrsyhuqh6pn2xvmg7smzevt0dk31mihny9m9t7hqeqm5foorlza6fawdd970m1y5qaa7xoxe86gb5mubk5q7ecyqxx80gqt1rs720q0lpt37y60h8hser2258xu6c6e447e1670nkfenfoyxvq31y5fgi8a9ejxybq1p49gd4oc72a',
                code: '3k2siougcnvohtr4v81z89pj7iaovefzyu086rhpp267uoegil',
                secret: '0xeiqemti5yo1y4m2173stuvodbpyctxwdb0fgybtrirm4tf4rtinzfsn0ch5qf4cku48qtoghfiim65081qtswudz',
                isMaster: 'true',
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
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: 'gibezlm4qi2y8a27amirymp3enaeshnjqj69mp4ub1cwhaepdm5z87cnsinluayi2j4r8pkp1cn56tubwcti627x0af4c1p59lqinb9upn4pzxq80vxubcocsei7ls6y9agyprxchaj997ntfo9yd8q3ac3l1gefrr8uwj5ct2paiocc9mj3ymlonvmvl2954uvhgfenf0xc4tbjuwgwnxfmqddy6xl9o3u096u0decm2di9dqxiqblfsld3ag9',
                code: 'wknc8n7s6dl9biu8lebi98k8t7dpif4u7h59ra03zdnhnym8bx',
                secret: 'ciopf394hpy2wb6aoe7hf9kz2qym1hkmry8ix6li51m49qzc5j9hcgqixd130q66htxbum2cgeauweqjqafcy1w82t',
                isMaster: true,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '4ff6d372-ed09-467c-98a7-fb62dba1882f'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a519ff03-db35-49ee-9162-bb4398fa8e45'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a519ff03-db35-49ee-9162-bb4398fa8e45'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/3316dd58-8f25-4d67-a271-2e3451a5b535')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/a519ff03-db35-49ee-9162-bb4398fa8e45')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a519ff03-db35-49ee-9162-bb4398fa8e45'));
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
                
                id: 'd488db08-5d23-43cd-be4a-f0c2ec1fa6f6',
                name: '2ibtglk5ewa5uj0zui9qxpj3q1hnrbjczedm2p50raytp7jntdii8qkmmexpj1kgs7n90m1mmifqr35znl9thjopps7b5ewsptdwfxyvqxeir1lrizpmw9jkp6pijm0o0crkbk7a7a9enosryipjt4b2p5yf6lovx1dwwi8j63rfjvntoq9edyohbgh1oik9kjurrj3dfl4wp2vs152vzh5ej36g8c8ackysjvoozy08sf27s3tap2x757rqhe4',
                code: '58dpje7vkeynl30uef26fk4g6fzjl9zaxlndsqof5b4rmf56ly',
                secret: 'jei9yvxockwnhrdei5pfhtrscbfbzrvs8vgtx9efhhm2i7dgm8pg4xut5e50dpjp8cnw1civuxgbxui8xbbcevdlh6',
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                name: '10f526acr6guw6kphhr3jtkoxnosys243ji1jy83lr3j0qq2s19g22h1xj832xzvl285q7bi9pwd56iqdawmwrr7t9k082r4c3j5449waa1bffxr3z0y4wo80kq4j0zic8oknwjkhxkub1d38wehgg70cdxdztzlkvmbrhv3lw36xjxx6zxhoiv0b2fut4uot1o93hnswab10cabx10ecd4zy0e2mqqumyedplanpxpj79s47x099fv1k1ptr60',
                code: 'c00h6kpsrtd7ers2pkuuydm6p6qfpydxbfzwtssfg902zcs01l',
                secret: 'vsafs1l2h6ghbqlgj87lofnyvstgxxk77406n8g6ns46g34h8sji5p69lke4vn0vjdhgxrwvdo1kzfnp9owmh3vn6n',
                isMaster: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a519ff03-db35-49ee-9162-bb4398fa8e45'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/a1ed10b5-48c2-4c0d-ba9c-411ea37d897a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/a519ff03-db35-49ee-9162-bb4398fa8e45')
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
                        id: '9acc3cac-f1f3-4295-9e21-c30d19da8275',
                        name: 'o32rhkxag7dqkhqnecmzn99qvt7wmlgh2ydvchhidkc8dqz92z6t21yuatjpw7inq5a7rljd83c6vx9wqqzicjhr18rywftjhzvk7ntjtr3q1vzh8bw33vhv2tnz9cgovto6m2l4yucqt79rmz8im0cqsx53a1g3r0ol2utnsuxgttanvxzbew8ntgklv595rwz8uo5sgbp3i2kdexn95y9r4p31cx499ofiq0cb3gpcvgthzs4f4ivtieyyl0l',
                        code: 'tt1wx0vz2vun9k6stckvtqo3gwe1qy5q7zuu6vh05byiedf3yo',
                        secret: 'wgfm4qt2ndrr2p300a8lnnx26hqxtesd1b2t1oy7v2wua63u013aqago9s3nzzbne3on1agzc6iu690823g28jkzby',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '9acc3cac-f1f3-4295-9e21-c30d19da8275');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'b10bf3a9-2db3-4ede-abc7-4e811d0889a6'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'a519ff03-db35-49ee-9162-bb4398fa8e45'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('a519ff03-db35-49ee-9162-bb4398fa8e45');
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
                    id: '18b45c50-f125-4830-a197-531154ed2ce5'
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
                    id: 'a519ff03-db35-49ee-9162-bb4398fa8e45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('a519ff03-db35-49ee-9162-bb4398fa8e45');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
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
                variables: { }
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
                        
                        id: '48afb732-38a0-47a0-95fd-4d5266f4c166',
                        name: 'k58e6wzdnnepjsuxn03zrklj4f3obdly1jx1oz65yhgbqanjkqazz53szaoc5pdb254w4xbiacceii3cmopl3bkys30df4dlldkaxoppahfrdpq9teilg8ewvmebgcjesksjb3n9t5e8hif6wyd3wxkd4quf349ps00jpz83xdx0f5rz5ydrprmk5w1rti9pa2nk2sm0avmgymkp1jw32316b56imw2ccro51ox1vcjrzlz4nsze7gi3dhud5ho',
                        code: 'vk31j7r8899c4g56f9bnn2n1wo9eyp81xxft16in8o01zq00jk',
                        secret: '0427kfbvfqniczs721zl87ps9xq0oyjyy20ry90l9tly8m5n2jrm5v1662q3g5r137edj7qgs5jounn2yn308ms4x5',
                        isMaster: true,
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
                        
                        id: 'a519ff03-db35-49ee-9162-bb4398fa8e45',
                        name: 'dtufmo4jnp1tff5o7bol59ysf6u4ys1j18jreriqkkss8lxfw8tf78z899cc3mnj5b6ygwobhqqk5fvubomgjqtpy6vajke2za0x611e0hgau5agnwe71qmnvc2glvir9cyfqmnkaw6gthcl2fizcdsrngi7n1oleimnsu07yek3ojqzr72u3b2pg9vgi2cko4cvm6llmpqb2v5bw30b2p0w8why8u505xbsovq9vbo6whvm99yymkrw539xpml',
                        code: 'gtoybxt4j7raanp602i2sls7e2f43vdnh65vnemarkz2f8ep7s',
                        secret: '7y4marit0k4ea5tti2rpe2xmu4h7nxtvcr4esyluaxtkkdijjbq2egyij34keqiby80swtlb1egp40mev7abi4cin2',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('a519ff03-db35-49ee-9162-bb4398fa8e45');
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
                    id: '68218cfe-92d5-4bbd-b7c2-f5bca0aa7fc6'
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
                    id: 'a519ff03-db35-49ee-9162-bb4398fa8e45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('a519ff03-db35-49ee-9162-bb4398fa8e45');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});