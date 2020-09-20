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
                name: 'g56th2eyxb2y4tpjyjvhgc9aio4wr41sqpjlhcw8sir3cc30utml3170llq48vqjjj5a9ohbyff2gsw90gxfs21l8j8cg0cc0njdtbtagntl40qkc0sfxlnahv9k79j8ez6a8uxzl7i49xlqjcgdian5frzajkndg0eyq15i9evalffgyv6d2s0oeisc88mwnsu386w5w3tq3gnypgcu3j96ry6aybbkffwl3pk7yv7bas2qwrm1bnfwuxv6hnl',
                code: '7g1svpdaazcvmij83jt15trmdlgabzwdoy1c7toi0ioukqrts1',
                secret: '3fyxex20fb929dc3unhu3oteltxvghduaokvly9ucrht0y23dlqd1fa8jz75wa83u3v9nls72m2x8x48bxizjmq11z',
                isMaster: true,
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
                
                name: 'blgac2ou4nc6wnl63hs9jfy7r4cuyhunhusgc6gtbtmq70yvejru1w33nontv4ie5s9839jjejibb3pq33l9dfjv7faf17zqs10g0pc8unkd2i47kllig9xlxl59lm7xrb04j69xlt6wjsnb4ryfea44fpxftzm1ge0plpn0qn0zz6vthxut875lebpot5rwn788dx6qvknx2856mlap34j1gxub9f29f8w6v84dgxlqbzm6aup6w09841m8yi9',
                code: '13w6t2xnxbdrba3in0oh9so8s87oodj42ap6hkqnl1sdryer0h',
                secret: '1z0r320qt7zjglcuqir9zlckky0z5xs4gcd1s4dyslhh8prsdygjamu2uro0pv5xi936ckqa2ar5t001gwocvg37re',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: null,
                code: 'tayxf7k54tdv415ar0x74gcqdh03iy56ivk6i3s6zj0pijacgl',
                secret: 'cwayg9zg2d9ivzjx8njixopox1s9ort5sg30voy3usb7iin5nhahv5d6ux94def4e2l9pto1bhyl9ybzruosh6va01',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                
                code: '0iw273wkhjeo0wee4d06krdt1b4qbs0cf78l89p5vu8o9uu2b2',
                secret: '8afcnqmotd23pilderco7i34apl05vaz9lj4k74b0xl58u287pu57znfij6uinxab66t7qlkvyv2atqwx7fol6ezsb',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'vccxouw96jgxt5yh956vc5jb29ivah2tpkayopi44g1qfu8gle1e6h509hmpahunjt085wyauzpevkyhwtxuqx3rjwr85ojb6ch75q20c5y0ihgwgt35h13bhd1fwfot80f9mu6wu289fwts3u37qp8w90eg7mgn1w39wl786zjjxvzo3imqnpqp70i1tpx2b1es3dfui7vjgqq1xey1gpuqn71ocppikdwn5aneemm3khaellfb1x207u33snw',
                code: null,
                secret: '9zbomrcjmn1z9fdaqbae63e8b5cb2k00wnxzkouaq1z7uuans2booy1iw9i4ck2hvalq1ps436pv0z0ju5omt9x5bk',
                isMaster: true,
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: '7kw8okfkp7zndg2ju7evkdkdgjoh3qe5z5y6llwu47wbh7b7pp60kxdu73hh5uke82izr5jl4xeuyfw942g8rhkt3wv3nyfsa0uya7li0s672o0rjz238vs5sgb1mhts3ev9mtpeibklty23gz38pdrer7zj91pri77mzwjckpspw5w0e42zdmuwzune7f7iuvlulsf0xzomsu49jf8luwg2cce0j2zalok1jte6xolgj1erym91plz1t78spmh',
                
                secret: 'wwamqgjzzxv8kfammssu846f0i3dk3ujwk4v25x7tuoawmjuqmxtttssl9g1wyuync0lvgdlnnhvy24z0izapzb84v',
                isMaster: true,
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: '9pz14h3sye25i7s4p55crfyymnt1o4lye2fd809ii7imq44nokdbbnf1qy24dmqiihpv0cebqhfo9uxo8hp85sdtbauk03hd95p60aonn7d0mnhlpery5zvbk6o1jxgbzx6lu1lu2u2d99pykk4rsxsgnm7xfnsdejjm0a8od4hic2e6xv18ecddw83c6xdqgprbz9lmasvt9ti9x3n5giqgww9kg0p1vrwwy2i1em8lq4wnlxkjxf611gmviqf',
                code: '9u61ehjjksdebipy493xt3flm9r5o5yhlp4d09f4miv0vl5wi8',
                secret: null,
                isMaster: true,
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'n4gk4jsevt1qfllzgl73149gpi1wgi61zwadd5nkwemaa755aa7ihu0hw9h8l8k4ydcvg4p68wiki76vbgu4yij9w5axaxx9iwe4rhbzq8qygr8wpn3zksx3tk55mv628j9ws25pd7j1zjkpq3cc1q2skfp2r4wawwdqemt6k8hbnk6huf2ay79watopnsxchu4yhxdgjw0vlxn5yakca3eukwa0370sr7kha6iv2xhfkvl8kwc7oxxks69i4oh',
                code: 'fnm9elvhggcbegfjjrt99w16hbbh55kcx3zp6n9izoerltgplm',
                
                isMaster: false,
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'tdaau5cnvlncaqddcrvcg54iey1imw1um02rnlg60t3o6srz3bctu0piq5rf71bm9hgg865hjiqky6ugz72hvh0f1nkwia89vypxrl3g9qzwrifi4caz1n3dz4apjzzb9wqjydaukybqdckyplrxf69kf08fl0l6bjivi6tmctt8kakgu6a571uucjh4sze2fww3ra5oaepygmuebpxprvm9d2wak2acw5nsefbh2vwt2f53ftmoo8pvltrsm53',
                code: '4abehp9hd0ebsgf9fyqes0rsf5ztecfwamrgabuoejde698i5c',
                secret: 'tuzfy0rxnfbpo0ackyrytnjxf56n9qoel1uytuy7vw2crdhlrlqssc19zy8n0y17cv3qjhs5v5a18rl6ak57pwpgff',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'rozu8oj66b47m7jvb0zzz7295o5dx97u3gk6lfjqtf6ixhmchnb3im8a3f5lcl07ec5r7kayt8r1xaldnxcpghfabzksvi7lguulaip6lnd9m4ybrfuf3vzjw7ycjfhm9bompdl8wd109di1gsgqe4m6a9di4z6qmcpg8vxbt9bm9fvdgpl4mtpov3x9ineevlp3zne66s18cvm2v8gwq9a62bof4ewtt1v4k8sap3sjpvjoao529m7t4nlfqig',
                code: 'cupsf360865oes5j5d23p7mygrkj85wdq8cege724u69xjgkt5',
                secret: 'jppiifornwk2gyizyrw4fm2aw9ixyq2dj1nj8wpug9bqv8tacf8zkunmjgsinjfirqcu75rz2lq7o6s1b1tkhfvq5z',
                
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
                id: 'f7qrw5swu4dvdiy2qz8fniugxjnt2u5ie9b8h',
                name: 'lkxq0qwge8cj9cbtz6jck8kgcwjm2gkb8hzmvgqwdf7q6y23hehge61w1cgxos42jid6qgf3rwfvtrorkymxndh9ms1107t6syoflxqxa1g8n5l1c185znie3ugbr3hxznre1rjitavqqlzqf5zxh5weeln9sol6rhmhguvtbequsoxqfkn80y58r0xamkyt8mrarptewdpsc9ayc667yrk5bt5v9pbggtzmqavvzf2icrt5gv697e8w9m5myyv',
                code: 'fy77hm2uugiwuf7ba0csp2eg0fjit9ep72peixm63ixefcopyf',
                secret: 'qef3jb7dt96qeygyhhhjpujw1o5me2z66p8sicg35xxxwguj74c6c4oxmhzcts8pkz26k5yhd6v3pqb57d10gyn64q',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: '7p7jr9nv10q4mndg6m1cieoy4y7fm0s189ig4cp8ggh8p6x8clileiada3v2a64idffydhwyaxzw39hbvmsjpnpjw4x75zkfcziaq4l3lwdv9s5bzd1kchpkosojbzkt1sc85p2kiktwb773ivousbhi0rzb3u8eomryqx6aoodxmhlp22m1elcnb2ynu7mw1vk6c2eir5sjdryk3hixhygnub9b8j39jehifvrylm7gx06qw84qp57qic5vd8m1',
                code: 'oyev5ur5duujramc0d6rc76lsaf4avss57nk0xystswp97jchi',
                secret: 'tz5bgn75z0fwir6vtaclprkpp2ysuhfsgg9sxtbmzppk5isgxsfr81qurvqowiw5wl3ovqhfpmxopsj3f7lfxg6wjc',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: '6wg4cxwjsiv84wij12hzimixiw5i6r3nbrijm80vqjwoxhganpjmux9d6ookckwnke0mnkdrchwta8blbkzimq1bqv4rb22g2rdlf7w3axy19r7cotb18137n64mtrt2faydpc4dqim6t0yfw07tykw3mnqns173thwt01xa68yo3asclgbiem3nv3hb20w1uq0wiosq7nkk84cdz5v2b67nho3wi34lhjvtibxnrh11xujguahr1epvplr6a7k',
                code: 'fmfgc9rvw8mh66i4xv3uxvuw53800x725qzx6ca6mvclsrzk45x',
                secret: 'o0hnxf83fygyzgw6428qpfxr6hhhj0krcqds0884rfvfmdv88wasgmj8xxnyehj2wdht6g48ppfky6gfus8kixy14k',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: '81romukq9it1ommafxove5u7eoit9x5vp8oeazlptffv8mzym5ruuselbsxka84pny7brpgevb6h1d6419yo38j6hlftntfuckcczdhv9zj13wdd7iuxyli2ack2kzcchhcz5gshm1slileelk6v38oblnjvnzwsp8ruaraxlkmb0xh3y351c8xmle149o26ya0n5z27aa9je6aaw4mp32v9xavi4i3x0mg43my0t2tcbfod20u9nw39d1z0uim',
                code: '8gy8ysgxlong7kyj9d1e04f3ditz3inbn1goffyds9lejdd1zg',
                secret: 'dmppx8w5iuhqr3x964h5nd27qirixuqx15neibj4ih37yqv7ff0ainro1pydx3sxrgg5rkfr1w9asvwbupcbqw49d4u',
                isMaster: false,
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'ujiesugounilqair53yvu6273d51m5wuns20uvafzlwlf1pztuuyfcpi6qhse2fc23yhchd99v8m3mtlvrq5bs4areqo95on59fbfl52fkqg81obyfps0cdokoj2pvfueyncaqqqpry7daiwp46t2vrfkw792fuh2ndu45qk8n6gnkytra0pt1uri6b99fqdrmjdiet9b5foqcnpvfna692i01w35pk3ilrxp82bdeor0njw4w4al2oaqn9k3ro',
                code: '1hscqvuz3kspgph64ddr5obtuiyx77p9efzohauyt9p1ydjsci',
                secret: 'rru2yxnusyonbzbcligls9bc8q21klkdu78toia00pp7tusr3skqo59tb3lsqlufe10jxfh5u32o2fu52tjspc3dqs',
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
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'qsqog95knopu8o2xoj0j9waru8o020142dynywk1zqldv86mew833oczy7gficju82n8a8tejlct9zku78izbzcqrmhknburzqogthvyz7bca7nm4oezt8ouqx20163wulzmvxntymo4h9sr7klwceh1oa92ikh44seforp3eelfpepkmitg4zhi4z48wswy97ugbdvj2vmtia3995we8lyngj835o5wwkjzcf5fcme171v22tbyzwqevl6d8jd',
                code: 'ca5dy2y5ttcpvyun2iwrhbhmres0wtmm3h57cxbxf47fa2e1q0',
                secret: 'rj54cdsvbgxdz68olp5pjiyxfaol0j4p5ey7xkhfsxdopanc8t55s7iu62j5dxjcpekherpgudgbwhhojgakkdsfv3',
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
                        id: 'd8b238ae-cdee-428f-855a-43527a074dea'
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
                        id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/75495429-956b-46e8-a37f-894c4e31f7af')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/c9bcd7d2-a670-49e5-a90a-dd55226fad87')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'));
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
                
                id: 'ea8971cd-e9c3-4910-9586-e2c178000f44',
                name: 'm4ar0yph8vb9djlk3h06h271cdad9ovbjt8fmdqp8s89kjeg0a6o4gqvbh7bqfygj01zidrp52etxb724m662xhimg9hz7l1oex2zr2waet1zfcn8c0f94skqt1w14ynfm2w1aru2oygpsirximum2gwyo487n87ggee8et8k43btkm46bvr63boc2xsf6bv1h1449vxkfdyxeq83mpmez7e93ylpky5umzj8e3odh573etgduhbt6jmzm8a2o6',
                code: 'wgygkmevluqo3fdj86mol7dtm1f4aw3qbcoxy4yd9sqqqbmujc',
                secret: 'f7loohxvhf4r6ol8mno79gd768zcajnhwsn71z14iyaprfp9bjaendja8r93ze6smiik7oou8pb185q7kbobsom9kh',
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
                
                id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                name: 'owv2dpa3s3wpknnnzxlh732in3bnkf4y8v8ip7k5n3e67qpmk9ip7s53bf0nopohogr5cexypv2m03t62qk6dpdid26yqjjq3l05lhifo3mrp7no9qscrcdq7jcgaxo7l1zbrncswrggaqfilgf7fct786stb8kk5k9u0gkn225bapww3wdj4isu5yul6en45ww1tt5l4iqddxsilbc3j7ben48f8cm3oj1cnzt2up4ln6b107g241vkb3jxcr7',
                code: 'sudzj3vw8n21nu8epslcnykcth8dl3f3qxvbxv9edwpyf2me6e',
                secret: '35h9c49jqn1xbibv3ar7sp19x3h5976py01tshbm0usz6x1vlbhshaq9jqliwpz04vjpbws0unctcw7s1nr0ouzjmw',
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/3b084212-f4ef-4c2a-a8a9-1075f3af5ade')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/c9bcd7d2-a670-49e5-a90a-dd55226fad87')
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
                        id: '3b6bb850-ae78-4ec5-9d5d-c161d674000f',
                        name: '0emhy7jyjypwrzee675b1s381emmhdlwk39u7412nkzl9vxhsn2nlhih1mqrq9647sxzq8kjij33uexrga34a0ax56lcu3utb3s2dijeun2575dspo8tvainmth2ixuqdbx898jd3sodyay7boiu98ya0k6podx63xqnuzr7g0lhjqdf6b71g7zecnha4vunq3r2ojpgvv1xvjizr9fhh6ws2zzqn55jq25eiuf81ptblp0o3pwsecqlcu89tg6',
                        code: 'p9sar8q4oklp1mtewf61ksgk1o3qyob6cwshpff3y0uw7vpj03',
                        secret: 'j4q2xjjahirxwmg5u9hgd5qp7denq6ttmeielv8h067335gbzpfremhdyh334a803lfw9voip3qm73000exwdbpi49',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '3b6bb850-ae78-4ec5-9d5d-c161d674000f');
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
                            id: 'bbed5ee9-dcf2-4df4-aa79-d81c4d020dcf'
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
                            id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('c9bcd7d2-a670-49e5-a90a-dd55226fad87');
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
                    id: '7714ed44-bc65-43e7-abb6-3f2957866c80'
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
                    id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('c9bcd7d2-a670-49e5-a90a-dd55226fad87');
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
                        
                        id: 'e7922f72-5ea0-437b-9abb-e332cd25123f',
                        name: '2mo2z1sfdhpnes6zbddk3i5s5n5mngcceyzzlqhlnalr66w67cqbi01p99eh140b50u6py1upywi5u0q04ic9xmncnlfbvgc0gavvmyba47w2ig93pncckh0twd1zby5fof1y5woxo9a1oq0tzyv74rgge2k456jmtbuyfittf2ccw2bl51hp7u52bip8l7nqw93vueo98hbm95dk3ng1oout4pwdsk1jdwa7s0qgh5oudsd654u50ejqb5gtbx',
                        code: 'vntwmahjewiomxljmm1ii17jnovan0pnddusjf60qbtu62b85b',
                        secret: 'cax2d98oqpd8n0r1402jzflyywipa58gzohoymov9s7iu2kvn5lpcorz7rimhmxero2epa1gtq09rcssn0ldlaa0x0',
                        isMaster: false,
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
                        
                        id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87',
                        name: 'x4nxi32a4w64izo5vn84zvs0d2uk8l4rh8js9haed7wxu9xocctei8wai6mgymzqc09l3yitg0sj960mtje4h8uq6ow9rq04poji7ov8a98n9d3esypnrj2y0ds3rxmcunnto6qp1m1lw6iixs1wgo3ck23s9wp6p29lnpmqnsu9tvflzl3yvo4z55zfv9wo5il5qf746xeq3gv8c9jpvmo899szfqlszct7l8s7q2tc04np78ps3x7rhoopns4',
                        code: 'izmpenxwclpqe6pk00g9lw2xji3wsu2byycei96vs283hwa11r',
                        secret: 'vhqs7m6nna9ty7zudxbqpq9i8kqhjpw648i5xlphdknxzd6m9nw1yui3hjvojl0vq2gt3obdwsem4lyorkto4aeyf3',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('c9bcd7d2-a670-49e5-a90a-dd55226fad87');
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
                    id: '061eb0be-dbb8-4775-9e3e-ea574e6c0a81'
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
                    id: 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('c9bcd7d2-a670-49e5-a90a-dd55226fad87');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});