import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '48jsczb641y0tw1qnvb07gsnyppn4q5j850hf4xy2b64h9awnw',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'bm2t9wyx0mclhxj7hjyd',
                channelHash: 'jkfre6bn94tj7mtke36a7dzzzavuy0h1tlk12jlh',
                channelParty: 'aase4za259ti9636c8xcmk2px7urdqowsbnhxda5web64u2bvt6n91rws8gdq9rldb9r01owdj8re8u4a1kmzrgmmtdv1iuawp4lu78ig0qv7c1ls8weuwzye4ttwaof5d47xqt9u9tb3eubnkb0ggrkuw5yfhr1',
                channelComponent: 'wkqboq4qj3trb9zonc8izj4qg1jkow58onfhqsdfe0eaixhpp4xbqh5trhik9akrax3e4gtpdj328b3wu7eggy5w2kpzyynueel6irg3epch16spstufipkv7x5h6yflr6mjnrtyizxje993t3n50i54xzyj1vk7',
                channelName: 'w8e110j9q6hfky0s5r8ifx0uea8ucck0x8ahew1698ldev7ls2a0kh5g0waeaj5rwtvc1erziwizj801bxa772mhpyx5telg5zwysj0e9gohi1084ziiiclpi15iylrlv6tw211s3vimk0hszzrvuo8ulz30p8nn',
                flowHash: '789rczlcut2221uq1seo2fivquon897mg1j89ckh',
                flowParty: 'a0lba0xswy6cnop4ohuaw3iw5ta0zm9w2ytzlwcqjp59sg9iwgvfs7fqot15rz658vkzxvxq5pa1dztt2dmxjyohpq9qeyk6hsvxmft9khovuhd9xlayx8xlr7rgq5vcoduat79b8krocvzw2vkpc154d8fxy466',
                flowComponent: 'mrxe2sh6f3r7h8w9cnq2b3k99415z4pqkg7blswjhcv2vlqgp5d7uwkmfizclrdoen0pszzv5dq7dftmrb6z0pm5ypsi0ah318k1n0nlic6jzsyjkx5p06wun8n2iv45os25aqw5agtg6litqd1dkc45fyd43vzb',
                flowInterfaceName: 'h0uflgjug4vley7fsz9d34euddlrgsv687ax2w7cm54d0q54z5y82ljy0a8yq62togh3xo4g3oisqse07iudjdpevrbxt880oi85gn6gagf1oihw3gjcx882ook3qpok077h51moq5a43969uosrt2avaqjhfkoh',
                flowInterfaceNamespace: 'r2qm24ixm2cn251qs6na10jde8kv2ql46xafs9m3c89j7m1qo8noemdbyrxj53pe7v6bi0qayxrxwijszw9p3yo4uii5uunl7ifzab1pnoryk8beghikgr3scmgtrl2edhkzv0b9jwfmg45ball3c59rf89uvjxe',
                version: 'wyb33svjtri5eqkbpdrw',
                parameterGroup: '7gi2if0ymuji33zwnm8tj4uhgx6xchv9egzl8omkldl1zcbabm0f1qjpc1u860d8l3qnbogrvyq7yzv2o201hyigb8c3zi4fv3ystlbydasxpif7qm9q6xzqche4xy1dlafijn3f5crhaqna0qxrbo7ec5nwik66go1pnxap2wrq0q1adynle1m7nldqyyr1wdlluwkkn5bic7vhcjr3ri7tuptvbchtv9snyxx2fh43wpcs4sgxb4ea37gvxck',
                name: 'ayp7yurmgplzvnsjaw3cd6z3jamlskmbo7m5d6klimlwc6twm3b2f5ont402e6j33yuonpsf0b66jf70fkclgzhf03jyr21kgpazo0kcdv0gkpbhu8bovod9u12a77626h7r2exlybrkpr1td8p8xwhnsr5jxoyzc553d69x9pw8b8q9fiduem5s3th0s6lcygdiv7mqbaemf1vwf4117anwpyoeus7fxo1pss7okutfd5u9t9j68pu5yr9dgtc2omllpgyndkjiqt4yb1izfqej03zne2yjg49tzaalrhisxzucueani35m8vy7hd9a',
                parameterName: 'jtsrow1zs8jxzliwuglxjgl6tgwtb12pt48bef377nopaak7f6aczq6cpt6re5w6gldltis9ovgnvrjk4235zgxc5flcdp05gglbjvjjdvis38pqdncnd9rrjf5uy3a43s80niueio8xgvsce8vfrjvwu9q3rkf8uxxndxikg4fyv8t0jjwh3im345fjmxbdza58jmy0cckbf5ky8sw1ps8dh0somz4mqh44rtyqczgt8xolua2d2xd8r6so1eje1famm1ugv9giy3tpfa2xnqj8qgpt3qh0f440zmh7z0ut92zy1h1ocj4qfw7ghopf',
                parameterValue: 'j170qay18gbf1qgievm4mppix4p7d73zf7itvm8de8i8z8012adzzylteac08ttiztwpnpf8k67ajj0o769thyfmcodq080mhhc781x0xu6g7clcvgh1s3uzgscyvi8jsl65aj9m65mnx7kb40pj408ihgpiji8seniky5pi7r9xdmt45j7fteicx3mv1kwk3x1d2ejh2ookmn4wc1rutrna2x93h70b4pogr6mrfwt27p0qi1x8nddu00cx1dj3tf1b9ukf738kmuxehu8mjhd61ub7rprqbu870swb1f76rdn6f603a6pacs2scfkglla6yvlyywrbtoi8zsiwi5sfd5g0nihxwzpgeosjrli0fqhu4737emyt4a25pyvsptk92cawwhsg6x6q1c5e1pzz6lkfracahn57q5qyzyqszwkyus5ypy66krle6z2o29kyj368qn5cmxjne1bb97jxivxhc0fxrridk21bnrh1o5jp3rmnquoln7wduxyabtm61mw59ngyo5g67myndb0pmr0o6w7msx6wndknz6jbrq28f7uwrd8357n0o5qjdf7dcw4g915q7iogqwaofar9g5un7xicvpcmqrudmd4zwe1xvlwxneeetyuxrbls8p01h1qor4j38rfb46s52iakw5pbkz3sbxzzs9m8jsraekf3t1ka8biixdepzta8myqe80wbvggm38fe6ydy5vgxipt1lrpey9y9ohr8hqhdv2o5xpgs0gucg5muqi3ob3vsc5m4i15jeqv44vgig01hpwbzrtpl0xsvjfzhf3wnu1nqdf1ltci4hch7616ufgq0zmwcramy0vw532kbvfw3sp9fy16ojvyz2lzx143z0wsndzpy8wuj8zxsiw6u85ygv6ur60lw9yxlwblxfyhvegjnkfpgy3rexw3e3ku26rwo2e70v0aba8a48c5tbmztw2yfs21uhyvjd5bwnzlhcwaxv9i9np4gy7idxrzdfa1hxcgdd8d4kyyb1jef',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'g1hagi1r423ollk9dejgcqmoq6fmjcg4xkfcw3gs1avyhc138e',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'rq7p7899bp13e8tf14ps',
                channelHash: 'kmdvmhpwip4vpag6dcjdnlha5ls5kiziktqjty3x',
                channelParty: 'biycymirividrxribaj4xw2bry7bcvi445s6hh7cvm4d48j38mm17tsmo0rau1h6g7fdnu404dtkxh7ffmqacbr7o2kjg4gfpqgc6xwfzqg6o8wpbjxihapvub26ko578cbfmrf8cj3sf88bnhgzamg9dc3xyjhg',
                channelComponent: 'ln7hy1v5aotyjxpggy7vjtxbscar75mgkzlfb8nogdxggfc28jbymzo7qk65n5xpv7y5wq0pb7m9c69zixrwyipojr038zi6jrvq1mvcy55nffvonuo6komlf5k7gcukrlby7ftddvhth2lb49d1yswsu88uioss',
                channelName: 'qfc65fxkjdhcpdpqe38jf0ubjrxeirwv2k23o93wnd96vjbp3m7mwgt8djdhe32lib7dkhl1jzitalczbuedi48e0shxfiqg298dv16tm8uo26ntxepdmoxfzi3h1q0791bplta1r8bnd06ap76j41n3tslo0baw',
                flowHash: 'pd0gvwulrz43i2p5ev6t9jm8wf6cln4utpkkwjs7',
                flowParty: 'ipmho847ewme7ktd0lzt5ur8kvgqqho6o6jdsnscm4gelmcr3tb8ijmjfk6t1yac8yfkv50xzu1dafgrycsttg8rjth989hmotou6ees3nc2sdnu8or6zz778wv6b8h3usfm77zrlblmy16n7gd6jyuu292zu1f6',
                flowComponent: '9a7qs2p08kc8gv3djnszs8hocgpjejk902ji2szz84k3viqubdttrti64wsis77ezkgg86gsrjwqnwatrhnc14qwf80ixnt3x3xzbvrv224ve27d1iuf0iepuctdo86ld4302prvl6qej2vqmm7gc0aehl3c8t1z',
                flowInterfaceName: 'kjz5sapucb9nv9onyj4kyb7a4ln8yv491468uxsaqn2bfkr34q6qow60jlvunzt02jb19i3egwgaqy087s0h4t44htjkm2tjvkrg094toxn7sn9l5qttplil2wbxeetcbl4jhqlvxrb845htv1x8zg1dn658jt7j',
                flowInterfaceNamespace: 'prowryxve20iap66n2eekpx50ahoxqodxm38gfm4c1uvn5isznhdpx6xt54pbm9pfawv6lt5rcr5yhi0ebt7h3lgg2hfch0lrjrlxl4mwvl8e9jj0mfrpba8jb0whj299au7xjtswm4t694tduv9d69aj5eynz3h',
                version: 'oh6ulr045s6rslll16k1',
                parameterGroup: 'bq5bc1080nd5214jiikhxv9n100wexn0sas4wqy6behw5oozlctcqw5o888b0i0ph6p8ar4w6zsdrk089hhcmdkqao47idrwtib3hktrny49mguprufaw6j4viz97xn1nq8cd7qlokr7uxbddci3cxxp89wp7rk24qyvp6a06wv3of1mxuncab6hrf0d1wh2s7oek5zmbijd4v1fonmdhpsszojzgh68flubrb04xjjiu6ah0jk7uyx8m9frjii',
                name: '9v9ikwtpik79bnnb2mmu5yeyb24he3gbm47ztx7hf71b0590k5mfszraxhjvzdfvn6bxm95o8nfy1iitlh6yjt1tvix4oa8ytehsixgxz8hqrm8rvkeoq7ibvzedrrshdtql3te3dizac5g9jgojp9bchpdsu2j7d3i5vgprzxvnez2t5q02y4tcuwdxghyn6uz4z7k4qvnqic7o2cl2ybfw2og4cfqnl4eawowsfkm24ii9nw4aebo1rpj69m81yffl3eq0h31v3xmcwyu4zv3yxenvon9d8ngwl50rhkd1605xl6e19xbf5c98v4fu',
                parameterName: 'c4vcp90yywghmqhcmoob489aph3n1ftx48v7y0lh5qszxuysas0dskpegq9g2g63vbi7zf2ebj7rxfoqjiq9egv92rppl7p26hqppl3h9kkdm3ku8rs4b953rgdr2pejvnnfxxnl25frer67c5rc9n1b9ss4xykx9kn9rs81m0qm6rvfmec9ygydnjsapct9r433sgwo2qb7asat41h113bth3u7fxk099b4fjet85ky8hwmpl4ztvc7acn573tt9eaani6in9j3gst81106u2bnqkxono9dt2bfh1oe6btpya8ad5g01z1ullxeexf4',
                parameterValue: 'db1id9o9jm5iq0j6ipi6baz35mbmmfqymxnmigkyxood9tnrpm3pk94l8knrlfw44ye3x049bur3kvuvtzv711m5xu3x7e7woik9jiusgbah0jcvkc44gib43295s2azsxj4mex2wkgh85atne8kivnxp386e0m1oa0htaul1iezt1987ysfjx2l0g6skvfw0i4f7bghizq1bknw9wbhv381xidhn3pp97az0h5qidacsm79osfbrn5vm8c0ph1g50cufuiux0k76khr6tyz2jm0sxypvko2dx3fw8id9y1hd7ltwek9yghgzwx0w3yspcla8jg41jrywzohv7n7lumlw7s8u2h5vw03pmm5itlficr37kg98y3gh1qhdroc6u6phobd5hlqf4ao576qvpij6pd4ogtgpd1ztzlkfsi6mu3ewfu3stalfkddoi2311bqu0s1sjnyhj9ms62otmu9iwbqj5aye4t37j4zvr27t4c10p4p46pknfybmuprk14sjzkq62mvkulyv7sdvzn4dsqkjyy2tad74r2s6ir7sazi3dne1y3bf3vyniby8ngdkwympz8gzjhz8vube1ni3bm4xu8xqjsekvdextv4o50th2fu8l5azkvh3i5oimy3nt77pcr4ujlyga2cs6ibxeu31wy5b2xdzhx29wbbrm7ejlxtuyqki6zr2g7zw1vu4znxyp1wacbzggzh6qnuzp3pn5y90slo59t6z89d2jcugcepok7itqhx1l0tyvn3w9hqghc61obv9he4eelxest6xvwacs7dveo00jjkgq29qogpw6hdxmyf6m7c1fvhgg8z0wanq17jtuecjfximr1et7unpep5iuimjcmfpuflot93wqz7c22jp2iudgwphrl5szy0mnd5enx7d4xzvcjkin6j3vd24mrr3bc2q4b6biinl7xwcyw1b8qvqxuy1n077vvuxxeg43muwww9bumv2lq1llqwqc73gxsjv8b76ispf5pcapwlfreu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: null,
                tenantCode: '20awz1epysnmcpnsj6isy1lem15nzgiypozgaho4nbxt55h7du',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'joudt8yjb8lxrg31nisf',
                channelHash: 'rww6fosncljv4wcgu4k5btz1lyfd21j58v3udcc9',
                channelParty: 'na8t8gs5vdl5whgs3gevaal3cfvdfrtg0yifd0pzkggf72w5cjwnnobvtlfcquals4rl0h94z4js5erz8jvgeqqxe5ojkkl1916vpp8vg68hqzlsnro5v1izsk3c4kyuzzzmq3zsmkrxv6gp5dwmd8kkkm4r31er',
                channelComponent: 'jya0d4d8gblmfsh7aoo7boh1hwlvw8jygdm80d2sbx11xmokx4rhw2dgifxmcbal294qf0ve80lz4y3ydo4tirbtm32qs7higkx4dsa7s7den0ndcryi0rx4pbeuy6di38kpemd4wkftpw1s9g6he749pwj3lyxs',
                channelName: 'aypbbcctnexkwnk4d8blyq8gywn6j31sdjgrg2xmikjg585gn66ny906kr38lnx4y9hpf65sc815zh4vgckzpxgzyu5kvtmtam4wkkax4usmcwjgnjwb69xyl8bw11dkx2gq3laeiwlaluq86l31ku1o3wficxrr',
                flowHash: '31rryljs6vx8rlno3bh92x4mroyvylnjji718x9h',
                flowParty: '04kplq2bhz9l78j2ye1dkb02dlmubrihvpskzaladb5iu4eninzn9xrfb726pwndefx9zp1hiqiq5a1jnlhjpa89or2dco09gcbgbmwavho5zbgnorv1luy27ku4itpafjtm4aol7nq638yrkw9tschjez6b7m24',
                flowComponent: 'pglj0aewu42bf14eykjacqybke2a7y8b6dj322xfrj1ez0sutug99k4fvs5qn5dl31hiqx3a94iq0lltrkqtcypg268gs07wz4d1zwhxs6lnahovdkariyn4t5jxb3ovusxt3b7dijygzzwlilv6t49us11j83ko',
                flowInterfaceName: '232xp9uorx8ynpu72p8jfs7nqbz3o51gyixv1rzaozec3u0jsagr3u9yqbhsks005ol48ve666uviu7231ggf343xotyi623x28wexaet6ofuxxsx0vymn47t96e8ug44t91lf1b44881biprv0mdz8ezpnjz1j9',
                flowInterfaceNamespace: 'b846el5hz28ocqwbhxx5v5wa07wjvedz7xw4ipusxw0c6o5zkahktf0xhlq5q3vfdmam82p0xgpjkq0so79f17djqmdi0ld17sqcyt6bw8qy60sewq18w8jhnilmauj6fh7xyia7adico3gjfq3kaaeazuas5zg5',
                version: 'gx3me3w9s7nito2i6r19',
                parameterGroup: '1q9qejcszubb3n01rjdph409l0d0jc8rk8ynf6gakl5e7rga7si982699cknzdxqpugz3jmy704nheg796ewdl3urtprll0b3gzcelxq8d902a18xxkedeegyvi7plwaksx4mzv5v7gttp1riegul0oq8gs4tuet2fdx8xzlgt3l2s2dw6b9i6smk5hk4ijhz3yz2czvyu40tbnwjjikz1r1mlrsyk33zvrr30ro7o9hcv1xzal3cm2prwhf0vy',
                name: 'haoq582bxzexf7afqw6p2j2h5ruvsavif6wgz440iqim5uvccbtj4h0dop8z8d9wt2exbk77m0ggm0fqmbqdorfbc8fadnz63zmsv6ux3x3brktm8nb33e6yvy77cldzbl5yydj0bdc1eqrof6uwvd4kr2asgzdkzv9jvrfcn9v655kb1wxh6eptcj468q1ebvjw1j76kcmmlkj77ybk20238zfb2t3mrq61x7fb9lprceca9mr8ujcvutoaqecx245cwiivai4fbevohz40ng4igjnc3rcmfx3hco976wq5sg350ecq83bixycmlugg',
                parameterName: '5gs6odjzizrvldsaf9eu2mdwmq30ep7phmi0hrp1buuwp91m8uwy2kzmiotxp6zzyifijsvntrui92lua7f89b8u8ycclo7ev50hi7ra3udxiap1z4hold6aiyn74prruxetjbhsakwrirgeloz9h8apjqgr3ottsj56phhdk05af2nrbbcowoivofcppw39qfna6ukrr0hduu6wgiqb0nbv01sanqn13ug3najjo9jky90xvtgxofg6j9o8o7jfvb5jnao2aq083v7trnwx3s2teqn2za9cp5scrn2fjpnctegppbfisr91fn0kms7p',
                parameterValue: 'fh6zct8vwt52irie49tv7ipb75q2gtz5m09kcf8mdo35lp7q6dbpsx36hhej8rs819skgpo7ftv6pjg8zj55budoce8acnkzuxi3ey06amx8ujmyo1smsoj09hs4yr4ctiddfcewfvqxqn5msnrk49z46yvyeij317cnoonq9i4fyo8ekwww51zug3vjsvm0xqk5lz1kgjuwixsitrz73mm8ku729r8cdubrf8noxmsuzsjmux5mbtjmlf31spfeefw5rhuyop09zebxbrez6ucv9rt6geaed11qm7g3c8yq3wor5vgk3u3fukq74qu35lb1nn7ykar7scd7yd6mev718z58o1ts2epvh2ac993yffz9zwgu66jvw7txqdn6n5n5jnrs58alzg1ay8vzrdaq7g0tibuiecxzjq49mluvqhow1xy2srshnqcf4bpzju1adrukyn36wwuso6cl2efqibcbsnaqwu7g6h71bmjvybabk9ic8e4lwaobyoa95kflppj7001wx96pn5pzc5eysqnndcxi47vjdgh7ktfzgpbesl96yuvg1akxjkc2x9or0r6cjs9jt5a3yd81ir8rri1wb47lwxp9lxutd45f59v15wkckrgdpu0xo308iu9565sdlwq467hbezskq2v7vdwmyrhhsj5v419rpkzsenjobd6ntqgiubw92en3xa7kwerc848gfmxhpyjvnbh7sj1k3d3zutrpg9tzdgf5x2y4cn7dx35poyhm5lnqs5xi7sbhfk845dg2l83lae5hrhojwskf3v229q3vkyh9bpemb0xb3thb9w97nu8uswwy0xopy7ycbr5nq6yqlyi4acbaim5jydjpckd0pbqymmnyo2v4nuqml8dl43siuh2y1ldygbvr56j4m3p2tqrw8djn3fvxieip7vqod88ll0x6oiz9m0ddiyqenhcgxazcczbc0bm9vvi23wpxqy2dypkx359oaivehyblhjqpzhddjlfcq7ze4vppqo4y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                
                tenantCode: 'ehb4in2oa4ndnd17ntg0jf7dz11a0c6zcuhxedz21wf45mdnf9',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'r4k520ndvd2yew2yfx21',
                channelHash: '1hers0f7gxhwghj6oorgxga40s1avol45fzl8e2u',
                channelParty: '2gr6ry7nt3b2tbp7qr49p7ki6jzhovho15p8ua0ldd2pcvtovw7ma4rp07oiq8qn3kwxtg2axq54rcztufpg03yayov8oekj18jkykh7z2ftbae0ltlvmsxwv71533evmi6agp60arxj2xb0i4y2ixakl683jn0x',
                channelComponent: '4ev9vu4xud6r71oyrfx2kz8loq9u9cb3qq5qhf49gqm6xrm1ozi1hguyclp3lgb3tjpb9e6typtacb1we0znohx4wgw3zbx29rm6tvu59cllwikybyhgdp1baysnqg7xab38plfqfiyuv7o08vele6hlx5skg97v',
                channelName: 's6daitdkt4ovlckpwjksgcorexyuew8ukfbb5jr9gz61zhf1m25tdfbi0i3lnn03to2xozbxj9m1szg6odtpw65v9wbknsxse5b6qpslgz8zn3oake80ueqqwo03gq41m74b72i8epvnbzeox2yuv0e60ba9nnrn',
                flowHash: '1wuyfhtutyialct1blnb0uc9ymqsuvdhfj7r9xwq',
                flowParty: '1w03nsclykz7eytoy65kdyekp79czzyp6dsmi9nua05f437d5tm4voqqe1bvldzc1wwh2xr5a1e03zm4t91hfqzewchl0fb601epy1vpre21uuyak6vn40lhch5z8pb2akjgw7l4bfj2w0uaac4por2bq4ibk1zw',
                flowComponent: 'fgd0sg4qc6g5bkm821u4zjw3bvym4rirersz45e2ozk7fj2a9sxeco3a0gtqh98cmnu0s2vs0n8vov0oujz9vycx6khgf220k46s246yn41d2dus58tp2j53840vz2ntz02jw3b5d6c2n64n5hgbd6w9ayn8wn9j',
                flowInterfaceName: 'q994yqvc27a6o0n0vmmzcxxli44kfb75uzque8vxrqu4f6o80f6h20xlogq53qh4tzit1anpwaw0jt6iq1lrwkkp7o0nfa4p4o5yl2p8gg9xg1aa267cknmp4o8qpblbpsur5ho5fnaa0v4gqw2buyfu5ii624i7',
                flowInterfaceNamespace: '0wfazb237qfyploxo2z60oojterxdwrtddo0j923hlv3bsw7514jrj6h88kf4cm3sv3a020uv6m4v3la5d1mkrjp8v3tz0hxhndf4l2anck3y1cwc5qvpg94kirrm565iivbxce5ghsteybekv6k42asc8wcr4mo',
                version: '7rn0znipt8836iclyimx',
                parameterGroup: 'y8gp3melhralnk40jhm5637yxdpn4ujkiijezl1c6grptat9w0fjbludc99z1cfybr154d57gcubxvvwbhwpxe85rp55u5r8q0n85l5evnsyvw0yopzm8sx3tjxpdaw75l6xiwjhnb6h5t1mlsewxwegnpus4e9gtriyrl3pja7ocwq54j5k3sfysb1rlbls4kz19a9tnk1xwjgr99bkrutug6arn5sb1yohcdeiic24rl61uiat6952k35x1qo',
                name: 'g96np0586zbd1rmviu8h78bbk47fvp29w3mf60nvdbq43vmyv583mq3arcgrdra1pedre7323h2cm1px8kwjc1ghr4svj7nhntcho462hryfqd9kq39kggog2f0b6s991kpyetgengwh01566dbgkyivlx0ex7ss4zab0ixscifcl2zg9xlzdfzvu3xprekeffzn2m32nw8dw0t7fdhshzycxocvydidtke82mm6yy1xgo8gvs8a4seydwzvsqysvokdtu8aza6oj11qgztcikhbzmc6weaoif4nfbzfz1r3goivubsw88rf4aqqnjqa',
                parameterName: 'pyjq1yfzfl3zs3mh7ji9g72d4bkzc133jgyukkfwuakuiymdaz1v3qrc40zhhjgu66ytwufdf239pknm3i47xpaqn3aa6mkdqqajmra30475sxsf39hsrw1689jkgevwahuc8vfqfzm993on295d3jcwyf279mft1wolsofe8wmdggxbb7lv65401tlxcwcb5l2ldw4cg4x8fz8kkovniav5vh4yqr3zjax2yof8gh3cn9jbs6h0kvu8cu75orwjzjkun6d5tn2f1zzmgygfea1criur1deaepo4onane7jzbc71w0lg5x8edvmmz7xb',
                parameterValue: '3fpvqrqxv9io7ha9ytp2v3j7f4qxklpw3688urr74r5w0a9yotilj7y78sgal14y8marfuh27k1hd1k94fvtyn2w6vsbfbqqy3e1wg1hk8n9g1qjzsz7vxj3a2qfx5u5x5udulax6bxocjwqb02ccajf12edy7o2qajyjynxhvn7ra7u4ekccv4npapstz3tk9lia5uxjaxvc7zsp1nbis5h1jdqsvb6ixvm2tpemxzka9inq65bzdaryer1f3867w3ahmfsd0udna3vgl3w1jq1oyu53lfaxm100h87xzxu7792cxvjzb72u6cqyl34thza2j8r1c7ncxbo71zeno9drungvitm1w6qbnwfezwxuqxl3ul8t1r0uwon5n8d0wgxedvbmys3xnz7bp680gam94m46lt5p23w8m229px87hwqqu0xaa6hfmq37jp72sbtgvhncwgxg5c6gunbhcfrvx0ecesqib4jk743b0mo2drxrhtgflkk2z2hunhrq56xetf0cfn093ejq8bhqj1prsvaji3w3mew3227x6stcqlrhpd2wp7rsn6eu8j0y9dz133b0huqedh94fzb6schn1lgzuyvejn73tnr9szo5s7y8drtom85byidiw3za6w3yazy2dkooui3b4l8zbgll5wpeaoepk7w8ug7nb1u61fekcqqww67v16vzqyc86cv3i33nxkc4gkln0oabwkrqrlr9smqxr74elkoy3df427jbb085g73qnh843v1x6jwl1744lai81k6zmaen69mdpcwre5xe1r398zukzl8kr9lb2i71yrbwi8h83cigx7id1gmeppnpntqsheuqisgfthocl9dlmnxrb635li0li5ndpyftxndo73izavbd7n7o7k8mp8avb0gemufdxidyh7bn24ouxoa5wevnqf4fitt6qmv6vgbmh1sy7zrq0otkdxevkcljeab6g8ywv1rl6ghmfz8kzqyklajlpajweldr9c28rx8t8d93wyl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: null,
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'rpjbm3zxr5uy9dl7a54f',
                channelHash: 'fq12l2gj98ykv7nqqpyrxk8ueszrfjiop6rodsku',
                channelParty: '2kwfx14mc31gfaba7wlfiib4e28a5k6dou11lz2z2idgrxr336tqqumlctwje2dpmohtstybsd4522pi7kg9hd7nzsx76agycrlqegoowud7b6muilwpf3m5hrdcudbxlsovazdj0pbscehpz0de1erec63a9vbe',
                channelComponent: '7hbrv5am4d2qvaxo0byuias583a30p50l4io7ocbht36qo77gbntlqbvq2fqhn31ruvs0tro0zvag6heukwx49kt1lp8drlmhfepxr0122i59q7rh9yi7prims9uej10h892m1azvv3pgdmege3usho033zj9qid',
                channelName: 'fm2fwoityhg01hd450bmywqv34z2jksenh4dz43aqxvp0s38c12rxcbiulg54z2222obbauw7aeau6c7ud1hz47nkl7heokjq40si0pkdmir0i9h27ro1daf8s9jr0hgaka7v8gmtge6g8nwkohbzqk54m5ui8qi',
                flowHash: 'mh9yr50frx2c4ofu6yg6vw7ki59f0nwfo1bvr1g3',
                flowParty: 'phrvl2bkzb1co4eyu1vtw1qxf4uvsj87xj1799fvv02xq39t4g6ytjcdsq004wrzp3xmgzt9h7adsppd45ilea5oe7ynkbezdp6wyufy249a1ezgn89us1ks5v2mhy1g86s00r0k96mlzkxuq4xx6lf8r6ymc80t',
                flowComponent: 'mkyb4ks5nspxjg87867jixd2tzyo93g0zyu1z186gknyyzv2dbhd40ohov0uyda7f32us2vrv54h0rd0hrgcu344svsnbxqfcoy4tb59yefpangqpmpn9wtyajl7xnz3vdrhen6il7jqwamd22r7ia4orruzgqsz',
                flowInterfaceName: 'mh862x5jr0au4vli65gymqlo9cscg4opgksve32ieybvxddrnx9d8vv60fi43kz306quvc1xzkfgcjdrfh6lpyvra1gx1q8398kj95k18fltwngxj6hpqwa8xbzxs8mdspu21xq2574yqenjbyiloflk029htz0e',
                flowInterfaceNamespace: 'eo9pu84nmmddg9pve7gx3elyqwju35fs0jjdngvvemmyjdu62eedcl8mer10wecm70prvahn1izw6jvdmo8q98qhrsgc1txnjzvtjp6fopcp1ouani4lv7o60zk256x3lyl8kasgexoq45ssvls0dcimp736ddid',
                version: 'qafl69bwlghzu0l9baq3',
                parameterGroup: 'wruto5klp4ci0u913dxmojgdcoujlfyuirj0r3z66ji6iccrvs49jclnvx8tnatb5aqwdcdi2sxtsloay0oh2pu8awo0y2vrqjtd68fis4rn6bknmx6vu9r57bj1rvsbtdm0sv8p6uooesuby41sbho8hrjscoz8jw8duzx7jwvzewtmzpzs63r7oqyl2mdf1b7756kuhrst1hrccvk4ialhdvydijgnf0ln5nu3dhqd80sn7c03nc574yh8la7',
                name: '72cb92bev60blh53ji86kvujppxcv8pcw8t9l0mi203gixrvu5uo7uojbu71z9431x4brlo8epih34gjghg1qjku01cof92kz7c2vixvanij7v6h5v411j2wmoz40qdd4amttcsb4nltzaybrs23spc9dg53g7oxks58rdr4yytzkqdwdbjasaiitc3xth4dn5t47h7pxac74a43lrifoftrdc9hkdzl6387emi73d6ogbefxl8zpdk5tlbte0866xsih6hzkvqvl9in9vmnwmwp8upac9jshjcaw55eq1r1im6sk1vt7lxytielsm3o',
                parameterName: 'evgzsakmhblp8yod9y4chhyaekvq4901xaybsjknyqcf2qukcy9v6jhnopsscpkzyopiomekym1mwknjjfd5vzegjp2v1b5i0fm24kc3woxu0yv9c58iijm4w6oea0wm709kbfmqqpd2xkqnin5avicwc4uaiif54y34wr07lqjfmhs1l6plrif6ua9qkzaf1d9s2osxb81p4cic0zzl1aihh5wgvyccsspu5dfvua67292hnjnn7msnahu9cchtfq78t9y2d7r3dlhqa77hhi8qg4vwy9tmn7zmjmm8968b7vjoz089j7o6wq05a1pf',
                parameterValue: 'ofe76okmorsilocys3gup4a18iz85j6ttuhwnnysahohrvujf4fct7w75ehpad3j2gou7hxxfabkkmgjjgaigp7vmhzb1rr5oewhi6momjaov1mhojz4goxlinzara1iy24hmyt7jjxa49073vvllas6ou275bhv57n3zdqigz3jiev5ybz9bansswmqhuq12m41262m2xvnn4x05prwakxi2ozn35h3yy3jciw59x2ss0piw6g4pnry7tavyuae0kmf05lds50qxd9bgjeta5sxhbadzzdrnvilb299wt75o10xwyvtrlx3pfuxroer3q3ng9aqnohydft1bf0znq1c9b67q5m3455npjn0cgunyn33quwtbt7o68mcsoiqr84m75atiw35v46pwpeg1v95qvi2za9ppoioka4fqqnjvvxxm0ik04jhfnpy0apatwsj1s8q9ory85q98k9iavq0izvzv5uhz6k0nv3649aq1b55nq3o32wou89mpnp4wcy4ki1ctvx6nggjexaa305wc0uznlp07bo3jot2po9gfxi6hg3xiz8b6q47vb6xiqtl9xwlscv8dph9qa3qzeavx7ai3ogy1nssl27fy3xwwdxqz8336oixqzerx10has9afdabzv4f8noox5gnqsva5ch7u19rbhei4p6hoflpiqk2bzswk59zb8rlwim2ixcnq3zvi77uwc0yewed4ko11yq3i47tc1s5muw8efawhpnwpqi5j2tv4oojx0tl3ki2wfmo3qavz30a2cbrer68lsrzzoszdk97b03gypxfjsqcvzplpedh873uiyh6n6fqkjffpotnuz4dtunr0ochohoateu7u49e40gt6wos28ghq6bahsqk3y9tocih6okhuniankn0gbvztparsya11oohalmxbsyr3khlikopdw0q8kn2y9v97gqzwpg2vz41a9w9vw4damxr95dvyackcehw5op724qbbsj2hw7e6k19xs5rb9eqlftfs7ds',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'zp1frha9m9mf3yw3o42g',
                channelHash: 'o1he3zw3vip5wpzwsn8tlrdqmevfxrbxd1fzwvse',
                channelParty: 'uqyo4eqe4zsi9xz510xwf8xaehevbjbd2naplkcl9h5yhqakvclx9sdns6d7hce5f3lbl3a9z2gtwgd17cfi655x92kzp6appxzkn25ut6o9plantcfge932rzngrorepnanfsens409k5xe677jbwvtix4imptz',
                channelComponent: 'borc8cnbof2d22rf1p16df3ubyi8wr08uwvbxeclh1vk1x6uk080dx188wm3m765r3cnn83hrkdf3fcb98mbrnx6l52ow78gfgqjbpubuvdqay2h0kl8fzrnm3bs5rfs8xaqhcj8avf9fmi1f0itopranroyga9i',
                channelName: 'b54yx2qa0bgkvocf40z89ioeflwaty4hfylfycbkd5b8m58jb7h3ygvx68uftbomq1efiyn8m3c1wp2nb3sepaya0c8ylejkbiol1ry30x8xlib0u8dlhnxb1zwzszs4nevvcs10r2vhgnhd7uxruvoxs4ylnb89',
                flowHash: 's7i2g6s6xg9kpdub5olb0st5kzhjz1toxsnynhxk',
                flowParty: 'hqjdralfj1n96tfuauyb4vd81el7873jq8deqj1z7tt65qgxqe0fuop9r4894j2jqksbukocy82p3wb8g5mzljhlz1y4edsbefgida9p3yxq1lxcaldlhd2b7an3yba7npgwreacbqlzxbyg4uum2s1cnxo79q6f',
                flowComponent: 'wq4nk01o1n8gdmz1la3qu6yc0gjcb98srukjnma1u1wnygi01o44qw8od79xs2asdeysjjczr3kl8qist9g37ekt9qc9blfshwafiqazs4hmjxgasvw20bdrzk7c0a2epigopg22p8ht67h0uhdt6sspum6ws2ts',
                flowInterfaceName: 'u24cwg10hfsywk7tive4tugr9ikdofb9vt8dbsq8jli3huwzs3506q1sl4dphplg65avqy5ymrpm1epf1oe06afomox3c2dax73w78ppkq97nm75om2ja106u3907bm6f6vjfdla75pwynks6o1c1b0zk35z37b5',
                flowInterfaceNamespace: 'camcjggf72qv5299v0ari261xkr0eju8jr5ua8i0w8aezjdk8evwyj3k1rc7uq80ldyms2belikisi2vnwc38auuu53ier6w6xez9n8qfq25i36zwlyez1za63futf35bo2h7zz8k9fk2rgwz1831ksxhd6omb8r',
                version: 'b1ag84zin6kk65bfhvf1',
                parameterGroup: 'xn5qmmg7adhghz9fiais0baaeir1wus3gndszvhejox8rda2kwm91eiqcwav3h5fz1mdrs9vkmzks3pf8vlazz5nhgfe425bvumw0vguassurgc10w2ue8is4035yfxwrrplu8buzbqlm4o0pj5f1mauk0xsthjoynzxzo58qjhyydmq3yghz8onjxodivr68n7zdoq2pip3sbapmue932s2h9kxviy6zmyoh71vduvxeibje67ltu6hqgsg85h',
                name: 'mplm5lqieuhecy093irf8ewzikhvcyv5m1jq0dxjcr2egezx5jd3coqss4tphw2p5cr5bw5w3v4f03x6xv8rf0n2etl3vrxk5xptb0pvpoajchrqen1aacx1mo7rlk4knc3t4kz47e4yhhrqohbjgkf6tr8ct13acb21q3jexh85cec7q5bdiqhyo9qhgu8zi7006vuuhl0w0gc231ipyr9cfo4343ln4yiqsxc2xapzh29dzp6mgpzgcl8vozxetkxrzsfgykgv803f5xkovy8op2htkxev0gavfgf2btvm8fed5krz84n82lh2ptb8',
                parameterName: 'rje1mzjcl3dbh7qn6jhzb15k91zq2mw46nr8bkh75zu6llleaydslpnd74a8k93w9a3asqekvd9ji8lk1ogyjw22nj01cd3xwegybvzw4842xj4xgso6fich58ip7mg2d4du602kqu7jq8s5s2eb60o5grqiai3i5otn0ubq0vh4zd8kuslxzfgovcu17dnwrwlpbru28y8cyeomuv49a9zuwddood0nj0eo99jvnl78hh7yt7u2519uvnjvd5an4taz5k4iu6iun9cod6o93l3x6jzq1895ulgil5xhztjfd0kbgyof9416jv6oy7ii',
                parameterValue: '5cio2yx04n498qfp8yf9sqqdlov7ti8xt1vt8ou8dgdcufi33dg35qq0xr5jjz4yp2erukoj9q09yalmb4dvf8avmsifmpdco5mt6nolllirn8mwrcg32zlzc0h3j9g40yws4lnuhnbi9zpylg90y3nt9w8hlrwrd3q736n2t1zwbletx2ux9ysvwg1xdy3no3wkleb1trlg1o9pbz9yp0fal0725pqpaea0nye71irgsjajid30gvc3kpzqmngbb5w11jrh4eoph57iyqx2v3z3lq08nfz3x0kzlx44tfx6t8y9zlsvd3fras5hqula341v6wit8wlwhthzbottix0vop9kbz613986j47e1v2d46y265lyir0ucqpakpb0w8901c9ip1qm3ldrtq530171bg4ayot8en8c2qcrhgbflfite79a0238sgm4emy5xa22nccfgt1metb9g0vmuk3lwfvj4qaw6jk0dgtgma536e1inf06v4sdgp0tk1jf9tv81ae8qp4zgfqa7z04c1fpjq8eojsqyzulcubqhe4596rri7llwpwlbv5nf4sm8xl4lxdxchngtqhzu4a2bs96pkuhzfuo7daavmi3naiitxx6iz5o797q5bpog2ffdsre6iquxfl49fums2htzktzpl81sguvjk5nt2ez23a4xuc97vqnzw5q9zq6m0hyy46ekydj9pd6i4oro2zgk7zowavgghu8q4zr9wvnmro8ytibol9zjqppfpju7ogv8ffa4nt4nfecyxufi5ppkqd14y9fublsvk9vqsjqhkfnpjxrtlzepn7tth49r0rxtzgw7lbhmbqr2nvmqq9qrkzwp1dh8dlztfjp8acel3u9ope02fxdpgtd0sueddrk699o0tjvmy0jjis8cxqo6feiz19vq25g6gz5qsopa5ruegl0zkdidfit84cyg59sn6d387xkdwc9ab6xwv72omqhpver2ptajuo74b9sq8l0vl1kynp00wpeau2o7zm2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'zmgwsjr0hmfcjydyauv8pgssxbo53f3auiqnegzhiuohbs9yc9',
                systemId: null,
                systemName: 'n5aarm79kyasy6bby6in',
                channelHash: 'beveho89j5gcc0wsnkr7tvuoj1omnfgfj2unieqk',
                channelParty: 'guuu915gnymzz34kax61dnx0fkctyr1sj11z42rz5bftrmmkokwfiejd4pq9w93sw4j8pl1fybmaxg6iuigjikcg7offkv50xmhkfa0wvu96lzhfj7t1lss54zy8qk8yodm8i9bt9e8ro3ir8x6dm6xz8ztd59tg',
                channelComponent: 'eapi51n6uvf0o6wxw1cszi483e32bfb2aavgt4z3tvvpbkksyz9dt3ucriszu7le2mcgo83lhltt02q0pieetf6g9g9h1l1q2oqavu8ngoppimzcyr6lxs1muz32nyylw0jh3p350dmir94m0w6w8pu2ftuq4m71',
                channelName: '65y6b0i9ne758dtmixqptyol2n7g5ziqjois10em4tjrue7sjil59lknzjhueyex8653burvfan7t7onpgg5044s87rqz1wqkj3u8z5y01uixrhwd80jxn7la14qf56il51nth530folfuon734ihmys1qg55tbi',
                flowHash: '5b8x8t414znnpszo0h9ejaqcid9pgzytbg89cwvh',
                flowParty: 's93o2dvh3gm2tk2a3neh9bn8cgt6wfgmcy6kw05qsjr3ll5olgxbtrpm4ssqvloywxhz7hez7jsi5h16hsuraa9dwd8pb0s1bnmxtirvm8ub1sy89awnq3o702bun7mzdb88fwpa8b2vz3zehhs4ij3xqnm22efp',
                flowComponent: 'h768h3zqfnofahq9kbia12aaaoyn8odd4wjgmqonwq21z90ak0xyg4cu8vj6a7ttcnro37gtmte01q4ersuiazvaphzo3tu2qylxdax84mzk4ndw8csnbpftppuzq0acenkzwl1g9mfsfpcscx29v3vmo2ki6y3d',
                flowInterfaceName: 'oyrh1ernhph6wlqxs661aoxh8276ekn5i1qbhonorq7jolo8a9d98fkm1elsmitzmk91yf6uw5asliluioi9n1ku916pdtqhucqyncgu4w4z203jshvs2e0hadua2hqv1r8ammoa5u5pus0me63d7hfomt7n3upx',
                flowInterfaceNamespace: '6j2o42zktiu0t5619d545h5jjxaksswuhoskl0v28ndq4gdh6kfdywsos8daxi3yab0w25qep8g1f6rmdw4xmm8bklv4pvrbaph3v3nprg4r88xhwbrfifhciepm7jkkmn1kr5kp5hrtvhz4jsqrs1lpqf1x2p4h',
                version: 'o3dpvdzzrk3ceepeijeq',
                parameterGroup: '1meww3sbzv697xods6ib7wcv4rg0sa1duc5nft9d26vap4kubub6i299dqgbndhty6qtm18q3g1m7bz6nkjeh2fj8pvg3r8r5u4bhj7mgi1cigioo2usi56ek29u1u2du9c0u5uf1u3jko39vxmiqzwe0nzwiptwvh55njsyz6fuaqjbtu6m21010mc2bmtvp1wfltblugh1yab35ydsp509fzq1w81100knwl6r8ne7x2fuhz796bw08uqk377',
                name: 'efhcahcrw4ayjf9a70gbatehk9unef3xc5m029nqjiajjrv369um7j0nciiy3z5npe2iswnf1hfhp04xvqxda5nigwdjapzozhi0i31pawgbddvi3rpvabce3n1c9e1q1lisg0xfbj49uce0r0lfg63idy175q0fiucjlql9bwgd7nk2nsd9mhravymapfomj0mi6lb61bzsp9inqr6f0td9h8ue0jjcpnp3ugv4j6obpeki2gx82xxok9767b6lhm475evl8nqrmnznzkytk3lnqcmij73rq1n56hjbb7i04cv29xy87d2ttugcjgqu',
                parameterName: 'l9sn82qtgh1at10njo31egv5iyr4vex64entxbbxq3j67ur1fmw73l3jun0j2xqs6ndsee7u1u9j583n9q6j7q9tve0njpbkto7tp0396rdj9pkhrfs56a8uz4pdt6v8fcuy3gx6ocqz7niat0darv43mul1dy59kefvnoqvzdse479pqseod1o35c2iqpxamswslmf0yoh3v7rm2qt54ztcs85eu47jz9keq9q658qtmeyqh48g01sak4wvbtnzg2o2mma5s6ec73bk27nssvgec4xz3r9c1lcxdayfcgsd0928ddn8rl0y104lfak7',
                parameterValue: '8t2muxbvj6q01zu81xtdl4i963mg6r1eiobfrkccc1mbfedqkvoljiqq14gw7ye7z4ubnni4ewu7ozpn4r5sjzj6gfodysxpvt77dlyrhqlxiy6nu7uqzdm2gnw5drdn2qf01y9vasbkpfzawrv4wkx9yu3ft3jz5zqatif98r1x1lyi8r3g45g25sa8y89pr6hrb8r2racoise4upy0sn4flea978a277zn93m48mf7zbvkqg22s0hmj63wmzz5ajm2psu875kvg2hhzg3aqjwc1mx287o6j14w88kmr19mg405l7i1kbx410yblge8daw5ss4w1zaxy33gtzua6cpaktntnyeg29wwnyqad8gtk2oqc19q6y786bs0o9k7lniegu6rv823uscrok4i3j9igr8n8u38nyb3thqqxdxrczlyfw2n7zoch7sn1xocyn64m6y6igfwsrod1a9ka3lvjyxh1stdvgj8ubcggkj2tqsc4s6q652ailb2sfd9xyg34j34m7q9lsjng2e7nmuxh2ydmixv4dnenjn2pvdyyab2plxwym5j5071z925nbn47ftixpf4qjjhs2abylji5zeie6gxatnkrmu0ihligwqp6qbafr1ltjrp67hs48087s9dxg1u25gab23nka4nqmuw3z1lzlflnse8rqecgyebm242kbgygqc7kzd5cc2ee3kw9ukbdsi94can78m13mqz2256u3jznl47s0ct5y22m6jvzokm2lj4o9982hcv4cswcu5pegyx3qmf5c7q5lbnq1kz0fo14wsyup7ktjgzi88k7utg7pt6i4t2xors9byuggq9du1cxfdzcipulfaaqa8nyvqyc7jvz4eu16qklegozl2rs97etdkp9t364d95lk01zror1g781kp8tongbi3q834a65mz0grhlsvfxr7tgeoleyz9j4vii382o79bsypfll4x0vjo930fgt7oc7m0mf963lcqhi4713nkh180wrm6kt2om8v9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'x2r0ivwczo6ofw6o5fq3t1vvv4n5mq0qo5vxi6by2gtrm7wc7o',
                
                systemName: 'rowsuuor6jalonk51nar',
                channelHash: 'g9bkmfgoqhk9n749xgr4k6m4mbo9uhzxqclvlh1p',
                channelParty: '4gp4mx0oexl0pzygow8st9pn1uijdb9d4pr9zv76g1wx0f2fq7cckkvrm1c45zkt7pwrkmq8xy4vojpoqk4jeybr3kze61zzfmkjfw5l59cca1cz1pe6n5kvpivybcq3arpv6kza1ech0drj1v4la0xpi69bugeb',
                channelComponent: '7x090qrgwzvwz0sji8z2c9cw3jgpqnko08ob1kmgk6e92mar50nk5b1bruxgknj0j97regq21jqedhos6cwvu6scyszqdnlgnq7zttscty39expsa8wabdrwy98s7gmngfrf6ftjhxei2qdyf3lil3od7ry8ojq3',
                channelName: 'wos13um1np2ioiteh4hzmtd8js12yzyeuioxyvo7kkf99q3d2nwek5l00eojcnz6cx1zm8ec46xt31tphrfykdpxi0rmtfb350dk5guaryxafno5mzlnhcyrpmq6bs1xo8m9ed2kn4ai8tniq9v8z8m2takze0o7',
                flowHash: 'pqc05u21c5x7zfja43mff71j8wrjhmoqtfr7z8sq',
                flowParty: '9odzaz731u6lzc7wy4mfwzm1079xr4gpbgcq8sp18klpp3mf2s725046nb932w2pwik8zq3jqj717r3658djuag9bbuvoo8q6giztxhe6r2bada0q6mtsx2cx37jfpau9uvui109u1ezzqbqirfml4ft41serkfg',
                flowComponent: 'n9o9akppttgi8n4oilvejtxrcqg90kvlmdzqd1dpcjfggk3ityqiprj29n9sho8iujl62bfln70nblwme3ei03e2fjd5ylpisp52l5sgp6k6os0rjlb75erx1cr8yduqdiaacjhni3ldkfea14wn42ixh9o4j7bl',
                flowInterfaceName: 'pc2uhz58u3h1qyfz9uwbd8ot4lpvuk6goesca5hkwv96mxq9mpdpknfgnzgcijm9imtmn4zx4g053uqtcu1bkxphqngrafkgkta7y0y7h58rvtvs16yghil93n4znezwtngks3weljkphfhavnbap4wudhhwvwhb',
                flowInterfaceNamespace: 'xbioey9m3vkggijlza7vjnm37z2qogh0sxt57nasvlzdlzg3gmwum7cizeca4xu48hrcm7hbqqdv2chtnohsf0baxc5v61msao46zd5c7yiv05fsqo46ri6bcomn7mk0gdl625psiw75tmgo4h9p0jnwh3brbuq7',
                version: 'sutkjmnsegej8rx5na5i',
                parameterGroup: '8w175ai75yxdrd48ex0pfnbrjgfejvnjmtrp0nfh668ka728qf3o3uiyju8kc02q0lzwuxl48sdj92w2gyh9vkjszudrcgsln1iehx64mrufcge2lrgpd5egoh9ukvejmaf0qqczipr91c1qwfl418ewjerofh81b2dmcirxqonthqknsljvvfmeqijxxkov29rjt041uzv5s3yobyirc1glrstan3ix80l57qoryw1up0zh7jngjjbwcwjsde2',
                name: '4yc7mvggueiz8ulbc7p5anihsh547ulwkau58p58xb8u33iuntg0dh3ei9gj395bw7n6l1hazahqzou3woih69m2gqugcl7rvbxytxwws2en3qe2bmoke7e8bbln0gnftfre57lgs06e1plcg7j9i4vqs3hc7ww9lfuqpiue5267a8qzcf43ctk33bs0b93fqq45aaa1ju9z18rqhelyz3skzyuedhzux5athact94mhdcd4vjnmwpi1q55xvnn845osvtavw6hjuj423at2du8kxvezh7rsdzphdjz6uyqvoopqtv79godbefgdb5l1',
                parameterName: 'a5a8z0cd8betsnma6mesy5tyw6p1dabr5mti2rg7f79unp2wj659u58ngq6qj4ntppjl30i4m0nrevtfq78z8vkomodbj9d1hwoo08bo9215rhoern42q6kra5bzp8lkeb12xy370t85o81apfin9g6aoo5ei1s7efpn2uob1gcp4s5v66mfw300p5x44d8o0jqveyzlonbotz7gr71i9nly4zsev37wfu5dtjvfr8toontnpl5h1flmg3ne9odjo3s4henkfxzeb4tajigd64h3k6lnc5zwqfoodfds4bufg17q626o0w8x24sn2rj0',
                parameterValue: 'h4umytgcuhld52jjnrxo1xf1xqrvzv8odf97kob03qkv19sq7zgemffvb66sbfmg0b3frnh405n7fgja458v2cpph86ydk5vsmfock965i7w6wvrk0anzew1k9dinz399jmw4z3npsh6aj4tme1496osduulwlkuy2irl43jaj5x1edfnm21y2w8rxnnxf6vnjxp37zcn4lkrmxpykd3udjb6se39cn10ieucp25vzpxyrgiydgvkd6veonta4vvnrtgmdpa4nmehq4ja7h3sghmlz2js7r947l3fgjz876ja0i7uzrj2vjp7apmtecjpeusbub5qmi0ihump80mk2hmwkzes6srt8gd0l5976ewymemtnpjs8dohi5axscmuw6ho3x7p2ue9hb3wyuqb4wm8w79vge44tb9rft03u6alkwhkm1cx5o5i1yvda5dimbujnctzi6x2jg1sogy8l1ksfi0q7y7j1t51ud0lbcoheaclz3uzeih5kjq03294nwctbfss8p5zhv7u3txned6nil0bk0l5fa3xos1hj0emaewzbc347f4cfqabf8o26jaktinequ8ml15hgsef05food29j0uvv402j3hocqomdnworqbe2duyovbjoibmy2ccip0lg9qwk0kvh29r2j87b05p44m4om48k6vfgy94vciwbjs3iljwrvaok6em9xxu48dkbxehw81pg6wk9mu08qpr3g2zdt7r8iwoj7xq0alfxjozmbdfk1020bjqslzdzcijapu4uxtfh2j5j3qby7yhzgyq0seon2jhq9rcmg2p9wbckka47o16izxv1npjkswnvn7gcmgbjzkhqxv89f5xlnbm7ls09eit3h2u6w4zq7p1p297v6dz8hs7n4wkglt9vomtpw4yw7oxpn0opd7m8mcytuh5j77d4mmmezcjmbeivayctsfg4dvy7nvnn0ft42g2m3c4kptntbyqj8lhpztfsu7sb30qiur1r46aukuxuz02z5pfwaw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'mspxc73jktpk2bgmmgh6m1wa0c0oids0rhxvqs2gbnwkjznnze',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: null,
                channelHash: 'cfor1wih0cxwxmvytroet7atuzub48ryixajsqj3',
                channelParty: '6vm0rnllztmdmvyjpzyav5p10hbn047dp3pa36alfnbctj45g3wlwsw9d46rmqjalpm5dc9h635ujsi1y45550x8iv1nedn23qqsuw0eml0vcpvhbt6jzwc0he6vgj369miihnrgxr6d0hxppymn4cc39vk4cxug',
                channelComponent: 'rk1hwa3gyb5li5ahby2gq0j7y48vrxo191u0cdt4jd0lzb4wcqu4l1ltwj9ff4u4jad8wlt5oi6ypnpaq71rsh1vzst4weavat0baitp0qif948t88kt606x450xdsna2p93o0sr4u37dqjn32wva7ydrtje3wp4',
                channelName: '4qa32b1dzu0dn20d6km8nyobt7qc17mkz3jsecthohvh2s4bw27ajqndgdonw35rzrihjm67or7yn4n1de7qv2swq4rdwcraq3ymn2hfhdcuq2gpc5pd2hopvyt7pf2aion039tjksnq2b2n0z2mztebu5u4jnln',
                flowHash: 'qkemgvdm63aq7cmozb0kkv2osmp5pifmwrawp6wb',
                flowParty: '3ghf1pnsi9io2501qkdog2boxacwlvr7uxpgwvm3jg50skp84he98wugn3ptl1igvw0nuq8bhtr6uni5abi1jwbownzdw35bbux7h0c7i3qgap06v3s0jmt14dkzr14z7jjdz5n22s5sg19vlq6dfowu6sfjm49o',
                flowComponent: '4f8h2swfeki3yvr4l1u96hxpe139oa0a6ebhyt1y549lm9fdzvvvkodw900h0ebzk1d3n5fvbmajlstwnar93colotrx8t4nbtwb9qbdvtt2a8fzr5xxvk3v0ku19r69oqql8fhbvee2jj1k3tm66x3noqflin4o',
                flowInterfaceName: 't70skimmut2uoriz5cnsl3xi18xd064pgshl5bmd8gawua5081nh8en6rzng1v563kegauu2uwtng48n43q8sdbecddpr1koosjazwnc5u0t7oravr9kb6yrlnz0xwkt3d9pexhtcvl2106zg2qk970l954hzp6c',
                flowInterfaceNamespace: 'iuho3n9348c2s5oes4dd48zyyfabt5oagfehkmcdcig139c07wlhpz6u299b4q6qo52hb3zfpcokxk22dtg8n4vz8en217adeo1s4evbraeq7g0ntiid0hipw8kqefi2eelno6oihvx96fqzp424zwseq7n7it9b',
                version: '1xexl54bsdaeq6csxtsf',
                parameterGroup: 'jm1zqz6dtxv3x85ieladoyobywc2k7udygl86rfbkgeq9ffumylaa397sfkzwrd42ypulzre9ecz4610fbjojnso8ms31rcc7hvvtivji97z5z9o4cwirpywylz7e6rvbgsaoobthqh5q83ue2aoocs6tawv5o3bp2hf2kng9kaonbbfg2zuva1li1a6dhcof65ox0fjkja0tu9grr0m309410x4278uec4ouif1ejh7qsayoyco2g4d34azf2f',
                name: 'vrg181h0qj0v70wyllluu2vudbg0ubu4bcddb9wwitnldsqqalxyvxq7eknu9z78p5h1xtgecowe9q8x3pvsm93mi0gxr9bn25lht6jutjec7rncc78iyj2ewdzt27ayg4gq0wtu64i0cmglgjbk0coi6bwlguveh65vnynm2ffbqxtle6zak6i0pw01hc3nedeicqyhxxwv7xwjzoyebiw8lbbcmvrm0n2nad7f3zzqkc379mrt1bamplvvnpn4d929uj2va8k6q5i0c4b8cerxhs88zu06m000qdrs28dj3jdscifr2f7p73mbhixu',
                parameterName: 'gljkf1fjjbskq5djmxyt7l6t8myenaitabo2s5o31xoe9cgh97xyxsuilo13my9lfvlz3v14ze5sw964sfxcwdi474p2t6dgnmzaekg8nlzaq9k7ot46w1s0lqlqeoeph9synspfkgugpquwndy4j3nt27wvytcsd3zi0xb0hhnmpyhuth9fn9jaccddnxsbw9b9qb28x689zm6d0fdpjg2g7554x3ftzy0vd0vuz2i2tedv5hukfdt9g4zzuohbv6m2y92lghdz1sa3bt46s50a4w1ms7fs7nx8xy5rz30221zvmkntatc2uofcifpj',
                parameterValue: 'kz4s1tgzeasu7w0k1t1box28ftycdmv6rs9ov77miw7i2un1djwqdzh57pr0f7ooyr3vvggpe7w4ginxk3auoahgx5tj9453n3wwfsk94l1rywxt82h3dz35t6mq8iao64k8kslttbziwvcpjga49ku7udcoy1ogk58uzf7xst8mfxpdbzsuhctefu7l9lwu1o0843ixhlkc8d0slj9xhra928jwh8d5hwbl248v8o4yg0mwu70153ag5v8934f4noxw1nu32yt0c9s7kvdt0q18cvaharm32dy1pdq9evvqjn05spli9uoc2h3cz8x4pm7a51gvhflytl6t3gxzdqiwgo3aaa2d18a6phmv9yntiitcyamh5e21vpeeyp417zmzu2xwfc3ieljrxx1ukuurt4kn9v9nw4dmhbrx70t1n61mbmnbpshe2ks7quttzi53ndmx9ub1vsd3d6l76jl6j94ssnaeyeqtshb9o1f9f65q2dzdg680pal6a3slvh19ndqtopvkdbm0afba829jy02f3jh1d6cz82ac0ycxetb7e4mg4g8p1zbzohpd32twaef5davawg5uzkryo1a3g2b1yoxw8qqvwe6va7quvp1vpefvng6c2pacp2io7ef0rem3ikpmjuvbcbahca9109yg2epqyj3gk4qb941swfesrryxsx1qg0nswob6c04me2ku2t1s1jqg0dygzk9jcpz57lwy668mxoh6p27u65dqhvfg7vjqeegpu53atsv47m9s7qlo60d1nbrbrhrv31u6q6x9nd2ig34bu4689mlni3gq5j0d2wvwt44jiki2ux9a733rt7gnje3fum0o0texksivdi1de3582vg7sqdu0ky7c7r4q48qkabjz1kfo2tme7u0bydkentzcbnll5bq1xaexumtgc4wmadxv0loiegmg2cn2vs7k0r8f37vmltulnhisyc80yrlehfcjue7qeq4gabz9kvbcinmgiq4a6c3u7o9hez0x1qe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'ajynbogrsiijj5tpx3szvyd55v1o1manjnjw1z3f11hryysz45',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                
                channelHash: 'uhb7gfq6n3uc5wlihzvy98capvtt29kmfhq21kr8',
                channelParty: '8xft5o75nt1r4bx8wp7fzpzhh8x0febikuubn3n2lkzyk16b8x7jtor5nvleeqa2zs09048wtwzshxj4g881j26blof2ivfed13ovc2kvi8uimt4tl4t2k11vyzkhz4zs70dbzw4bshwa8h4orfi5tezf79s1dlq',
                channelComponent: 'fpbfbel2msmxv6bgemmzqdw8e89o27zl35372ie7xa407ezzyoig31m8pe1wsn6s58tlnztvi356fbvmzj9bnb9o8wymwxsp1s31gwq75ml5d8v6qeo8mf3rn498c0nx9164cprce3zqu865diib1jj70cbipmuv',
                channelName: 'q8embwwszrdc6s3qp2dk8053q1z4ljp5nsdiy5w1j3isjylw5pi3on1dxgk7ixkrt8l003tgnp96v4r5u9or33uxny6658qw7meo6yufjf87yafim1sfu5dxmfj9tdp6n81swlzuegg4lyxzfehcwpmvq3l234ml',
                flowHash: 'xagwxqksui7a8v7g3pxv2omyfajdxewknnmapy5q',
                flowParty: 'ldzytrwtjcbv7zjm7jg9bdva4u47wdkvqx3qwdykl60xrpmut0hysrbuqqhgvcjov0tic63v8sfgsz5o0if99ewey8304t941o0dvwhelts7c866thhjrj349pkk4djmek6rqmyal6xnwthv5z6qw80c9jdhi2al',
                flowComponent: 'qrcg4a96cr0wu40zmm479qzxqb1bppv5q3s8bfm3podyhppka91inapnscqvha17a94hiu7ph84tr8rj0cpvyq5mof805ta3ezih33ygygno7qicbwcaw7u7dsv4t1ciac6622y19371fu670q51qzevnnijqkl4',
                flowInterfaceName: 'mmhgtk3mypfqlyzmma5bghvpjhwbbx4dyb7o2u3xg2gbbumnpb7cy16zrquis3ljwzbrvk9ug8j7hpzkpnku7x0l39pvndm9j4ksk2mik1myhel91r8ut3jjn9hndx5k4sodg4i6ehmadkoxgto6gug46vy3li9i',
                flowInterfaceNamespace: 'f2743r19ea4x4asm113r2i17qummi1rknovgu71e0qptqyn6hnma46zo90e8l6tywl3xvw2gae8lr77syfdcc58jin2uo26d2s9q3h62z5jvc48ixju1p4s1y551l41sgm62xyjav0w54bieibsd4vl1l9jj4kke',
                version: 'u4q7emtav4j0tn3mu2l2',
                parameterGroup: '1juqi4aajbsyw649boaa6yq4pm4emjx4ct4myi9crbs6is3asphzduscfq82gu32kvzf1xptxyhmgq8ha8mzwew5doneg78q8ctwqxxb51bcgo32fbdytnnp54ja8b2gd7po716qd0ymdqvzlat9j2aieqb7ma2ehvcm0kgr6jbwjokbiujlrh91yfwd9l7s2li8i32l3yqk331hh8dxjpafbcaoxgawg3vbhmb12x4jvlu60olq1gy9j9gb76g',
                name: 'eysm19229i0bot668bhjigt80d895onbyf53n3npho6ni03codv9c94esnu5nav6x1mwu064x7i1lunwte2wqr5u19r9i55xb4ff5y5u0514k6mt1vrme7xmghqn0boxfpxnutontvxmp893qtp0oqfcw9969jgzovth0h0430dx8s3nz1grgnn880jf486dq04l5muur0ke3u2qbn8um9rdk3sibmsg6qd1c0sh3vncckzsl8ayy8qbi8n6zztu88jsi5toytzh4jjvsrcuuqjbvakk0owowgdbl9mnfp6vcrdzx8wes5icdo90d6xs',
                parameterName: '9upb89wxvo3apb5t3dttn5hhb4nb4deia5xb0ji5ms7g7w3b1ue4qxgnswl8trvlicp27tcvmfm3lbl2kwzrubf0gh4ls71l3qx9xoxg170mayqnggdwxhcrx2gpkgr7vxf6my49cu4btvt8yers1aqkqz81zsvjfyz8yqzab30tcq2x6s1f4n4upfusezugsl4tglp92hljkedbv0ofkgpolpd6ydm3gf07chca47wz7ybjlfct05ieoe0kl7hydkaphoj9hwlqx2uj1ovm6v77jzlimpdwtfcuol0ww6rhivy27rcuzheuxl4hpbwq',
                parameterValue: 'h5jn0z325uebbv6mkjxv8a8ud0qmuz2o8dz6db7ntjvgekf4fas9pq4za3d9a98ccbkygb4d50s8m591gy2e4v2iaoy11oer4rz4665ylpu868x7kmofyct8udr4p834z2fy3knzui6pxbtlx6twa2qn9h1ox3vcmfjr4bilmytad037m44c58m5bj4tvch40fujcaaunjvy4yq1rr3nu72biwyi94uwwfg1k39p2pkki1e29esy4od0rv1jf9brquh6vglon2vwvdkreukvyfz356yo59y030eayast5eiuxw6vxh38uad6h2y3a61qrsumdqpm7mzpying1o4maklxjxm8rgy0nlkw3ypqbx4t3kldy5ngojurozbcgo67zc32v06p5qe9361r6ohnevsseju6491bfflinu5fi5j89xfcrzas9m948l3yz7g13pswqp97urrlose03gskf0b95xzbjye1u4xdze17fi8phki68nzkgjit8ogebwecy7pgtcxskxhn0inbd281aohuq7f9p5d9441r8cc5dvpsci0v8i52z1cwan5xesloqjhyicn2tsjhsoxzwr8tf2yazsz7q7fam1gegfv2604b8hngvuvno6zqume0hjdbces4289y3q83rvsnoa6a67u3s6l8u9aozt6deyy27vwip2gozukn98u2t4b7cybv2j7bud547q1z02sipgca3x1aok08nr7itc4lrn6vkt2tw2eml74qsmrif09mzgl55v32twowmzbkunxcy8c7fdu9l7kyt8jk1q4ctiftqi2sq3wbm601vx1lh9rj2wl7c67n8ouxfhkvkirlxcopznid9w6u3zp5x688c0xkmttd7fmnr0dnx2j6t151zyj1kng1kbzayj61fgum5walsnc1n404qnmkd05pjfpg8fv3s1g8p0wljg2thdnvzvioc5a9hwccm9k0zq3wu0mofqiu8vx6skgyv9ontdvhp7enn2l9qv10wcf8j42yytvn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '2jwdzzu5ef2kc4ks4nh2i72d23cglwv3zrm92z6wl2ir8y89i1',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'adunnjpxur2n06187c54',
                channelHash: null,
                channelParty: 'x925naxe04bto5zchmanuscxx738ed3aq594c0suj0fqrkibfybkenxr0u1wg9jepmvefz7b1kanixj4c9lsbk7orj95sl1w7u027zlzkvyydr17mvoil4a583gjvykou7tkui6cibh5y25sxppe4shhas5dn8ap',
                channelComponent: 'qvd0q0nh6vgjxnc6mn0eel2ft1hthhxjs8pls9kuhyptwlwmqdhrrpljc4ldb96gxyk9il0hybt76a5436j2aypqt4oouo5m6f3bf5mlmnpbcmam8tvojllwwie3zotmsx6xyrss1lgjr1h0bfhk4aei65wn44p3',
                channelName: 'y7ylr05lxwan6muo12o55uo576n6v40vge17catwxnha03ovwgrubdtdxqfkghxt9f2kmxqnervm0vzc7fzx7j7gd9q2oiu9ip6i6khzm2preh595j5jm9teiq8dhhknegadi90heqqyrnu0l8b532t3aqkwxpyd',
                flowHash: '734sqqokj70tuj8ct7nmk0a2fs8yf1alq1cj0528',
                flowParty: 'us01fty5oqtweayrdf0tu6ig7lmxod0ppkt00gk1an0idzohsoe0avhd46ifbqmqj61fm14nt4s0eqcawi7exerjxkziq11wjaxiexvlkpedrhxrlcjvubb07zg0ka6437sttw8n6hsoieiclcrqsseqpi03dvqq',
                flowComponent: '2e54wjl9ed5t6f6ga3b5vn87iitky5o0k92t1l6sqozdzpuy9ka31r3ut4gly0aq6l5ofd0hraezdwf3za07pm866tr37sakyftd163fn6hjhbficavry2lwz4xwxubju7gyzmh9xsrcs1mrgexbw1dgg75teowj',
                flowInterfaceName: '66ns8cgaip0lnwdtgsoco8fisr4uwo5woyb0bl9845tciv7cd5iazw1tn792dlai7vae6ny9e3y9y3ue65ughdamxi9ln3em42fta4gea105k5sy7u6v4gjdrbedbihgjvpbf646sgelfnfc6ub9wm8i5ftnurca',
                flowInterfaceNamespace: 'fw6gure0vb147qptnwfb18pdbsui6strfzefienlnm1krrfq0y8vhw6cf2oc9ubzvmroimxr2m18l1szq4l1pn5n1d58qg8fz9k183ysuw0prjep7w3d6qrwi1rfbsab3m5tbwgpq9bbbig2ov9e86g9vj2cvva2',
                version: 'orwk7c6cdlcllu9s5hd2',
                parameterGroup: 'by2glflmo5cctlvcm91xyxzp9ex2vb1xviuf0nwgvqt6uozkwwyy56bg4nwq660o8uac97do641s3olfa0q2vb1myc7yq3axtubq15xhyljs4z4y1l8kpddxvscwcrllupjzr5iolaxj7gqulcg6ire01mhfd23ij3ggu4iuts0a21e0t2gv5osvk2zzdxzw4fj2r8vcd09uj9vmtc5avddghq50dfiz5g98kjwxgiap2h8qeh11ci0ybejlbly',
                name: 'ffdz91lz45imrp1sb5yexp6o3hyp7qmmz96x7fn1iw66w7ldfatw9tnbfaoq5xs5d6y7pwf1u943t3s5knegevk096gh8xsn097jno9ljs0shghj2lohaui7tykrh4jnc9mou1slizqrcrvda5bnku2uv0u82tkus1ohr1dkndchrha6093q2h8plcfrn8o3x17mbf2h5t3glrjhfxqbyhgcvirojy4so4afs1gd9u45mg6fq0c5gal9eae9py8ts9y0x2p38tytm6cfndm8utjyswojdmp2w8jobkpecp8v167j2oe9avk3ub0hwbbq',
                parameterName: 'wzncxlxg6aa7av4phagjv3siuz73joqqqh9nqmckexsntezx2zizk4n1qprqcszfau3hslohb64j87vylum151qajx24mza387finoju9tz2xmibs2aytsbx5arj5khqcc9ogujnxbghtst271jw461uazc1alt3mof0ca7lxp5sbjk93vhsqt3f0yhdb9mqk24bpvcr3a6yg1f2efn4smpxtj90pm1jdzvzjmmj8tlq5p880otn3mhl59rb0c3fpsx4021delpn1zmavu8yjwy35qqj2xd6seh7k4w6mg6lhhu1a1u4lt5c5fk9c6aw',
                parameterValue: 'k95l8xo1mwur0mak70bkz6tudiyqseswez3lsjjpkufk1uhc06g1d9kpz9062lb1m354xu8bapy4kpzca92leievufoat683suqb9jy4k2z7is3iju9emf7dvw8covs0f3y7rlmkhxeo3mmtpui7e25zeglnbc9zvm3tv955d088wyeb6nprivejtiw4d11h0lfyg526aji1r2agz9ze44uj7n5bjhpc9f9lr9jnnhyv6sbq9civzkixdz63y1ep6fj0nslxmjsxaadxv1kfswdfx2pe3rw8v4ck7svez4ayjrtl0tdj67iny7fe3bx3zh3v86j6mdr2pdmbmprg9wm9vmln5gmvt70dojhqk7i2jl9z2haksvl3e9pxhu3myswyqup74x9v20kxqvvwi485xm7g6elz0xnh14fhes9l9cbma5pugw0xm1y3jy75hrjiuswgcv4h4yr3lkd38a8ljrc1bs1p6m7rd3ah7onk7w9gfgam7yfmgtxrdz9acgwv0za5tnu7p48cya4mvtxklw5uwam6kqes5j3rumf458f9427l1hh8tjbo3oi3li7oilr5t2gtjlmfe9vlvt5xfr67ob6l7z8flo5n8uks2x1vbniu2wyt6kua67swj2j9n2p729ti0d4llozfpivx2ln3k3n8jlw4qy203v643524622f9qhhr407hscauo16og853hmaz8a3j2sm0yp4oki3rw9wvtfp2jx76ytjz4csp2ikb4z3lf70i8w9xsy35xpskpqc30yooky03gjo3jztr1wmsk63xp5z6szdn612n6u6mgg3nox61uv0t1f6h48axwmvzuv0hi9yi5nk75srebgmfouttlcg7ibjgm5m6lmvi1m7l1xro8sbr8n2npfnv4n6fhh94jztnl0m79yuew8eeryb3x3m6ufobmhkhbg8q0cejc8gj72fmaruys04dyr3p5ahk9dkbigh4anxna1akf4oo2q2d1uiycoov0qyuewm0kven3kh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'ps2jnif44dkvd7zrbi3wwk0sj8vs9b4ae914gujb26xouwsxnt',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'xjkkmn3hgg93dwds4ixh',
                
                channelParty: '5e00a1pxpxgwz9mmewxzlmgng4xxhysudn4tisve29zzu7ntrq0ocl4eb95izaf2tcrjyjysyf6a7h1oabb82crv6kg5311dbh2ml3xl7m1vts601t8rmt5ns8iyxhj4i0noczic9fvvvgg5esci7rse7bcwtklq',
                channelComponent: 'ouj563lcmna29go5w8bmfmnw5g727gd5aprkyzcyjhhe7r3e06ch9jf7sla1k63bj5zmegv9m9b9pu4t2un3es6c3dfl1aoai0h0g7ssxp2vyym27k6yl9b0lbwl7ig5f5bu4sp45bmlgta36lds2sdiaj6l37ib',
                channelName: 'cj2be7teqp2nhhgrmeqds70q6b4fa9qmijzp24jyiafv1q00ttgzfhzp4akhpze225ky825d14zbqtczhrt6v3os1zsfb1dxzh4v53llolyc9f06zgoow8pj6ss2s6dxvjk46pbydunyqx425ma2om6rdwjhwje1',
                flowHash: 'tcticy8kpva3869pc91nrokmgjn86ahm9val14ij',
                flowParty: '8nlxtmzj5irfvs48c7msv7n90wc088anqj1xwghzup5cogydy15hsjztq7zt9karxqup9swshcb3u888kd7h7rz6528zgpr3dtidqfxcr502odj485ssbr3yodas81x6t0ost3b8wlnxtofahqg8pw0e1wr23rr3',
                flowComponent: 'rspxtgoemfyyc7b73adfskhbc99kh9jftpimcltv1tdrwhy8pf5swd8uh7xbiqa2hcdfh808wy6m1johefurtypqs1yndkkes27lbfi9wsu3m5hc11nha9u3ezu0dd82dqad6w7w0zlk9uxc4npw473vr6j6e3tt',
                flowInterfaceName: '96ymfrssn309qnhe8ltpg7xb96doa4nlpeqqbqvre93op3zt50i658lli22ppfmu5rkfianytrxlax0bgblyn74ukpol22m0hx8rmac7k7tahmp9q0jdb9hry2uw32q6x9mcmvla7umub9c724kh83lo91p7euaq',
                flowInterfaceNamespace: 'bfa4udp4b4x3zbkfm1ns0pd0p59td8heub56yotd7gkhxdd9zt14vclucpr1xkm7jtxy9d8ntkec5gm77svb2swi918i390mcxn52ixeh0n97pevqwmv82fncihtlnudjizyyvurbxg0zaxgac2z3pwp0vk0y4a8',
                version: 'nh238s8m54jr4j5k9zre',
                parameterGroup: '68eg1z5c8uwa2yixkaug3g2717r3mjcpziz2pw8tlbc9za8845qa5zcslb5eny3ochk34qi7e2bc4bh222h4ai443qux2iamfma9qnm03x6tragxmm4bwygu46cbrnfg1bw9cvauqwbzrtslio9wumekphwyphzg2mbfer1s3nqjsikttz5eu7mxayjrkgftu5o5sxgyv6yv7hb0y5aug9sgm46sn4781dizltpkzlhaza7t7ulopewez8oypk0',
                name: 's6wipuen8cpwilwax3uflxjgl1x4dovvj565114ranx1keyr5nyzwturf5051de3x9vpeut7zotw98eewg3ae2hti9zil6b9kf7uwuh8ga004ldcuqtol0kh5ztrh5bcf2aofnkigd6fsjwrzchtlxzzbpabzf60m4odr4wg484j5ksw9usfvk0aazcwegq7hh44crcnqkyvnihtajwpi5qp3wj8f52txpch4nyfiw9d4t62g1dfbfao0d93ku2ymhej40rv0xx2kxbmtuxp6yuxzpjrvm4gjopnkh203i1mll8e9a2rvjumz3t4q8kp',
                parameterName: 'edm8yt759mwlhe02u02v47rrgu94bblvlk5etbl8zhkmypfvp8x9ybumop27hm7f67lk1t5ap70x730ukcsx74ks9kj3k5vh6go2a4mn73tmolzz7tb35ox8jcjmvd6yoivfp31qcjej9zc7jcwbkf0pye19ywqa2ichx646o7h0c4nsfimm7bac9n3jurwrmaqdahoo09cyn77swelgpoedqkstml0t05x7ijcul6rwmtkdmcc5ewxk403nrkglttfr3ookafehc3ipgymcuzpgu3elwm7ypmg4cdrzcuqve7rdlcblqar54lqbq7pq',
                parameterValue: 'i8axfuw7uy6gwkbj6nrmhurzz98bo4iegnpxz9w4b8ayksdka48vo59kco1z9jbfzzgdwycau9mq7k36l22i2h56qirjdc6ppf7rdtd3krn4attsmgu3siqhiymh9l2epz8gwl4crjpfweuigqpsunewb5a8c5vm20e7s1dx4rz34ecg1t5j6t3wvd3y8hania4c4dkj4y50sfij43i4obydrog07um4bidw2pqq1pryzjfhwgqjjsdeto27rof2onuagvd0chxaxmggx569j544cbp50r1ttkhn8vbq3wj1mgzsmpncr9furou53fyurcbuh4kgpd8jq1c8rlfqhs2sjvvb93y67etkwtwx54mcbffkwzlzd9qd1uil5adyexr6u1cef8hehcm56r0ksyeajnqsupdkwlxr0ck8g4yf148325ihal1nb83bwa87kg8vifqa3cu391reoy6n2k8elcrzctj570owmd5mybqyvw4o74daswzuvs339qi4nn696xxf46wwibtl22qrzatpgtro5thh4uk7tj75k8dxow5lebdx8kz2lhxofhfyi3nkhi27kxcp8h7t0eu3h8k38a20dzoke79873vbw1qnoemf8bma9ixwtne9cjr9jwevl6ozdhknhpwhycfhs7o82f797pjiqj61eyvu9ubd0yvcvro98q4qg1wx2np0k8bzw1hrww6jk4uzz18qvybtv58jfmixftrrakkji4543t65s76co6filnpvjqschwuvvet9pdzkk22csnhqxbtca3jo59g696td5wuowvwo8myofd34zask8k4piz4byodbeei6m9501tgyiv62os7w3lgomlunyr9fru5p0ybqd9mu2lko281752qiohhvboov4f3cbzcrwiyj9zaf3meghz5yan7oliktt29ttsz92tmmb3aifgm77kug94as55kpc40opuguqita4p1mv01yvo7cravwtiz9cujyjijvwccyij23e1ha064r2nvr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'gu7psxdb7q3b5l2b9o2gkp64yjylaxdptfh68x3not2dwmssgi',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'ghnw64y7yw6nyyvmejy3',
                channelHash: 'cwch34vzvxelyjvfkyq729thhh3a65a0ibtlwc6v',
                channelParty: 'ly0ugs24finqxmo3ine1oyoyi7p2zy3h3uexc5ydsg4rjaap65hyhh89b18kiq4q2tt6vd3rjjih0m5oziz1agmpbr0lk5fi636snkyt12v6wqq6iad8d4vv3ub48wgk9bp7wo9pfe2uaprl429nmwjcd3fzrgur',
                channelComponent: null,
                channelName: 'k7vqp52owxglsxqonuquzuj1v8ny1nzqp39s947g3c18gs3o19otagp3ben75ktbfera6d4t18uiqpxuocd5ljqt2neiuc8ftpo85uy5mlpac4preazm2yph37b9dftl3kd1vg62kyurjgc3jk0rsloi6xjhdjcx',
                flowHash: '73wokv8y8loaimi4fl41f8cp1atde5609f2uetue',
                flowParty: 'v8irhw9ahqdh5eiporw812hv85yof0srh9kg8ococd6mqvu07p0z8eejl32tcuhne2uatkl5zrh6b5wu0ejua45mogmoqss25hz734e2bmw5xi7z1g2azogs3qflv1imf2f5fha7uhdfqjstn57pa9dq4d9vp10e',
                flowComponent: '3vwwnu6ct8p9of8mov1q2tbaph5u2ovg1zfyz7xqnf2do5hzmqp4yt42giiczu54yoatlfzxbuh7ssyfxfomygnng3rgwb3ryzy7pni2gbqh0ml9w6ncejfk3cvpdsgqwto5mu3ukod37o1jyiv0qux58gujj9ji',
                flowInterfaceName: 'vi7svlw4bw00nkmx757bsv45hwazcbk67ff6s51okwrlfkkboup3t9gp4w1dljle8uh2cl70kyfs4b410wiym3n4rqte7v8px0v2zeww6k7t5apwxly1ugo8khhcffl4rwq0qi9jbyokdpkh6gvvvn2kofma0k3e',
                flowInterfaceNamespace: '7hiizd2df3nm3fxvtb3z54nwuoezt5g4itgtg36vpkgvnqixzq5hy2vpagtwj9z03o20t0w85r16ys5cd1tv72wu6fawy7m7bd660pv6etyjxynysb18v1wke5s210y6lsz0q1wsn3ga6o7mcefxbbpnekb0aip7',
                version: '3wub58zkp7o1ymn7r9ai',
                parameterGroup: 'aa0js6z0fofk10e8n26s3njqjzwj5zeg0du6xeo0hbji77642xqobsmtyy4u9lbnyg252tlmxyud5p7vxiz7h9c767p665g1ob2g1l6arhbiyr8xs58n1p4xctdv7rh4bayeq79p000ws8mqk9vwgv7l063u5ntcid3aa2dd9ey6b0wcvapvuulqsncgj18pbee9v15hnbph3bwhj093l2gem85h32yr5y9dpd4echpkdwa4tspkudqhzfrxrnr',
                name: 'ayc368r3iwe935egv6w1clcv2e1o20qv4expskp0l3y7scqr7f7kwmv018q6j22e2skjflt8jmw3buti2ho7w7g4no6y8kpfeyb2r2y0s6iv34wc3dach2cuyq8dnebviddydarpgnww2s08pbj40waepglx8e194av9z3jhy89m4ot5w268dr95puqcucyse8atuaejjnx6bkhguci4tv7kbhg14pbtpxm9j2wg0xa6u8h98osuco5782abu23y1wgrq9cpcj7v9h6lzlgof8jczwk7fkf35nlaov7ol2x1srg7qyxy3aa479hzmj2k',
                parameterName: '6l9efmshnjcqxwb8vowgukybe9er9fp5vhw980eydtb2he8mozzm9913btrtdvbwuxg019z8kqldbkai0kuk3ghl23kziprz48zeocl70blb0d6ct2quvuo8vfii3a91rz2vt6j3kmx01l1w814u7caqzdxeyiij9wq6nd2fuafjffeagvt81hohifllqd004vritss64pxgzi972uaazej17giznrodja1vb81j3h1ygkirs1kf8r9z5a08jz3lr7fqzgtjh83cea5bfzxkq5ga0rz9beoctt98xehqya3aiy0u5z5pb226zf9ey9fk',
                parameterValue: 'wxsvaf6x2qtuoibiv2scoyrv296k8q3cqqoo3ancz4x8cl9a6whozz7upv69opz67j6redqomhsimzjdz4onlkl3k1bu8mn9w4jcceh3w2l64dk8vbt9p31rhts85scei9uyvizghymri7iihti72bt5s5kregdzjnqigm4hjkm6gmv3qd4rt6id93ishbpnum1l1yl54872enpfgv9ynqeveqs9l0fxtxi7exvkiz1y58713jpcbxiuzxmy58f1znt9lefnbx110q4a1umsdypx3um7kosz0vlukackm6bcsxcobou00u9evmwguc929rkya7s6tp1zvv5nx2n3lnmo85fy7v0iyxt805rrm2eee7zc10co4n1pnopmyjmmhmowyeu33uyd77nyfdb29ifwnz7utbieabnjeb11fz439t0i4hmloaeqjuuuedjlu9qk67hlekfn3a5eutx8wazpmcm9q7p3a1knkych7wafk3ytx5qo93ojr2fjmwsq4q0ln64xd0jh8ouvy61qgbea0kfaptduohlpk6l57gos7w87t99zihiyrvjzdmu73c91xjk5tn0hu2y9g5rqt4uwn21njob7f1zm3xnptaqn4603eeq7d1szlcwln0uewrm5gxecmwxjk47bzdr27qot748ppd8kxmbcisrc57nh4iosmvascs6ppf9v0vnma33qkg9g3061hcatm3h18t2k5c7rzgeyqor51rdv74wto4b5vbocy00zwoofsrbm1m1a6ihalb8xai2a33eftnrxxd4w39xbkwlieiqudzmhh77i7s6hc78ud20k8z64yxca7fz85br5m1przigsj4lw96kmw9nnz8t1vna7pmat8lbcatwp54raj0ank6n6451x8w88tghbv9qan4y461clgq4tvd8avi6wfo5l6qq0ul6ai5cc7lj9wjs4sj15bllg39nedkz36tm2r6y9540qdpncon5otcwkp8n1grnou9marvoxl0q455vd80ou',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'xsf0jwk9x4ja1z6lskkvlgcrylasmutoc303mjm6xzfkzftu65',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'zoa42hly9vs82u7acwuk',
                channelHash: 'n4ygr7a1g5tkbd9t2xe0rgeb7v3cnwnoy80kcvnl',
                channelParty: '99yr4ex37k88lci97l5oe52mzsst47x4b890en7z15e0sh5rdiess1o11eijo09jyz07l3an3tc9hgl0an230w8j6zlh5ki9bb2r3adxioomw2srmd8ot3z2j8ycwl1q1kzc0ukcb1q5cr5xbvmsrf2o87r225pk',
                
                channelName: 'jikue7951hw51ve90lvcme6cmji3w9finnlkt4ijokgzvn3cc23e1xl68znyk5huc42pbfmpmifm7mosh58aa7om3snsohicmboxiovfk7v6u52tgpon6hny7kegdv7cnetynhoq015iae9tr6r7sho6ezotozis',
                flowHash: 'x47624toidt2x4tf5vrou8633s80mjs3b8if9qtx',
                flowParty: '7tweyuqabvtchqcx4x2saqripx4vfvuv5qc75ycc3e9xm398k403bqojpos6jg29g62ausmnb1nwt1a2zgpvl92j2sux4kwns157pvuicwoc1d9gh7rfd1gvrdka4zsyxddpswyukskvqghrba6pidnsmfipyg93',
                flowComponent: '802gfcam11xqxlfra4ku6j6n54b9s34jfoq5ep3j2pv42zvs9lorjpzc2hp2y1l466u64g6zjtk96794nna8tcsscxc8pozlxl09kl9f9r1qedfl8loyd3sqd9fvw9eklxrrbttjbwt7rgu4txnzxs9f328qx2r4',
                flowInterfaceName: '01d70dwqjnjegm206kgq9v7pftv2ylv3e80uho87cb67iupjk8iosbcuek3k08dfi7dxefyhkm5ky7hj6x87tbym8wboyka9nlop6rw3rnb52sx18cigo18kdufpa0v5s67im1fatyd2bfq17qr21tindxujejh4',
                flowInterfaceNamespace: '6omshpwg8uh1y60cfq4s81i3hannrfx4te8fz04m8qrg8va4ua73vkuy66gxv10fzhjz1lkrtyd9j5dx0o7rhyd197vexmd0nfh8o225guua78667intoh6habvaze8rq27a0jam3m4aenzalgq397hc0ul5itg0',
                version: '6vjcxokzmngxzen6lqkz',
                parameterGroup: '02qaeirzw2xqdaw5fieq41j68xr2d5c3xov07ysaibvflgldxww9hor71y467qsxlh3gv0ku44912p93l5nm931qrfugo65yfp2961zcjszly4yhfmne1ovmdiwzc6qmnmk5jfqnjcww4fwmvo3yiznayt0l2z52qa9bdg57okgkjlsm0htxt9ha4sbd01techjqs2iqzghsy6rj3yyfodkri00tzrofuffub2jr52sjutxh6z1ies03rj23e82',
                name: 'vczs9qhy6x6oddz915km9qd7id7ssh4jtiqswq4cd1ornv73o3rqysg78o0qp12ib9i93mmprb4pzzbes4e9vs3x4zaw6fbo3povfued5zxjblgdesjb54726u05ao5vrrhk2wqs19nifs333cm1ghf0f3117ow6j9erkeej6quz207506ok83n8nc7jvn6wjokeojuuhib8xuyy5t79ehp5mizbs6efsx00zggtmu53u1dgtbzjq2nskd0c86ms9pnq2ncq061faggkgw1zep1anbil50plul1d5ojddcslxq6wapep9pr7flkf4ptm',
                parameterName: 'pr9p925s8w6o94a3y02g36keqt1bfed0s308ou6makwdfjrzejyjuzbz09usjqrcboxefmud2ytdpb56tljaqcitd8y3agzwl4t6ejttvtv3626vq0adoqh7x7cr6pqzxoqfj72qqg1l8njev8hv3vsj1u6aiusg7ffdxym1akm5climf9ihlif79xa82hgwx94dp67lyl8twbv8ke0smbf4dsf2n8ntp31ao7fmhdgotq7tlga9bkce5guv3ifb0lisrld1880civ77hu75uuirz5daljsh63cn0nardsctxjpwefn3clnblsz670ik',
                parameterValue: 'soq9ifc661rr3rwhlu3bix94q5ahsvp0hrliss1tipwyvf76tdsvpn0rhj5t8wtv5nwgxjqys9yph2w6g1iv4qkr64umdtaleguohjz61iadkqwcftu19563hb9zufxvwwq4umr8svcf0i3oikasjsk5x5eb114h6jsjtihv524pymhw51i5bqxjnofxmw23id9z78l5q4lhzjzrr6ro5xp1sgpfcdi3ynfs22a24mbg2ehvxhp479ezif5nwqe8176adozlka8thtgtt078dt17zmxhpo3y0rwk8lbr668yt87v220fkz38gc7ghs7t4ojwxz7ddm5luwgawcq0q20lb1jgh8bwhxiespl8bq4gz2yad1uqynt2r2dg52k3zk4zsi29zgai1vst4dpgto1sqjb0pw9timiy31p4megodhazjw62u7a25fze2dcr4um3t7hktqpmvwy5rktzz8f2soo0hdcauce13hvfp8w8lxhnc9a0jqls0f0p3ju6u1qghpop7rlapjuhwuke3zhdasyv1zawsovdr6tcw4zwyu9pefoyjr7x807v8ud7idgknuoutnct6l1bgubmt3ox7sq9v78yamv1gycrec55yjlb3ja13n9bbz6u2wcn5xmmmcjmo0qv5bvoscid06yrk8ius9xl8rz3x6gjex8qd0doscnco19kr0qmr3ajf13874e1zehwkb4lmxeknu6o0d67fhcbzmsvw5syifvbdgk2o3rbalpy305rifeolo60rqduepxiczdal9211g8nce45wi5mfqzbk0lsxky055bq960f16yz16yujlp8rxxtrpsy2omb321b9mhdf463dp0nivwzq0cuc8iwf3gt4qaz9i7r1crew1rwtzzznzkv39z4f17caxgyiejjyj4n02ncor5tkmtaesq9fyausd64xtf5fyf2tiz2scxbqben5xebxci9lnwssdtqp39ck548za3zpf56rm0u80hwkgo0go4qz1suts4qkuit',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'zzojsi6o5kci2q78h7w8xc82iq5vd2586n8ods8rk1reudlov7',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'carxwzgn3m10dednlbuv',
                channelHash: '2y0nv0rfva9sw1x305prg5836sikcoyhm67u9j1m',
                channelParty: 'k3hvmmuvuuiew3zmduu24lljakko1z2ck8dbryqgrrba9jilysidis5sprrckrr3z4959w3owufwe5v6b641uglvwokwuq3dhcrs2ou3pyuln02fu5zi2yjkx9oxyy2nipkooc56zyhcwkgbtd1v4w7xhpngnvsz',
                channelComponent: 'ecxo0132337vnstwgoeb2vopthdulhkyy86qm2b2lexl0ie1mhdms3ly757d49by2taocnuea9qspsk2ff23zdow8xg8pm11egoek4f5oddv0wyss24uu8vu4imussl5whzg6hzgiuxmsln5phmeevojt3uhwrhu',
                channelName: null,
                flowHash: 'e5k8eqtuar6ko7d3o4c2duj174cp098xzzoi5o93',
                flowParty: 'voscdh1j9srgxaldgm2drcttjf6xoeis9wp4iq6mjy2i1xdnaa6zji48n7al7hamx00f1xdwspn6vr7q2lg29k267xswncwan7csht7p2mlbtnigmky9lysxv0x9ogjamigcant886qoalh4e923j6hbrt8ygscv',
                flowComponent: 'e61xoql6srvy55q51d0imvs57hwygho0dm1fb6ls4wxrtkgumupaqw1ddw0t1ic7ek3zl00ax8p2ss2wy9dqy7tfmkqx9oqnos2j0b5e95xjqjzv0wnpmlqrtv0wbrj068pjftvh87azzgzcu24mjqkncd943c3r',
                flowInterfaceName: '8pkijbryage10svc42fm6uwwy9v51v28rja0kmoc7xuvtb2myca9bi6clftlc7237h89qk2mjpx7bmb0ielapx4rx0fl56xfqr1lddahbns9g5pccbgvpqsio5imxlpq5xqanxgujng2b12wlfok1h5s1dhw54vz',
                flowInterfaceNamespace: 'exadxk1dfzsq0dyq4ljuohbqq4tx8zbefba03vg211p1nkibt3tiq5iy0mtnsdcnx5u441fjxz8un89eh052yw7lh84wjmaq40me88y6a18mgxb2htuznaqxxau2f12ae620kpob27k6ok0r253ka2qj1cp0f2zi',
                version: 'cm0jixgmcdc7lx9bkd8t',
                parameterGroup: 'zfu4of0mfwi31s7qz7o2ji8tci2rw0lzbizax80fo7hxhh9td3t7dio0zesjo1i3v49ubal0ihbagg3i6j2w54kh1nn0pj2lb4xjq8oiz9mw9cfu53nnm4b3w6szjwunnp2xz1pbozqvjs000rle2p9jx8z9yc3xltpoo4yiwvxb8925bdl9qgdnuv8fbbnr61g1i7r1cpk45oqvl65cpofpz73jjv0373j2mk3zi06e239563hoir1ygzpl9zs',
                name: 'pb0ndaigx9t9sqksxjjatyx3k3oumxyguucqohzn3st6ovmld7e8xnxx76zoq8y8qdzwjqf288trcve1mq41vec98l8ti2u6rjkq7lvmsl39bzrvgqbdzqrzrsh5kybgi37vlca0oluui6r0q14pzaah3hrifaioy00mo9005p0gh6d3juqdxb9eiqatj6f4fojvjd4ti2j6az3tpp28upia0bouyujfj293cwba2vara2dzkw6x7w0hrekry5axddourbhl9zyxm5gj51z1pf920chjy0do0jhxfthwdnd0g6nfeqobr9swxnwnr73t',
                parameterName: 'zs7mpsmjwbkdks9mcn819vslp8bpo5wjhjqum1qmn76q5dswsk2ca8iy7kf7hq8mcq8akedxfyt045bxdv9a43jff37pwxdr03zkxe75upi66uz3y9sthdkpnf7oa6v30v7rdbpw63xmxmi9p2844orfdjbekcl57jqwkiwwienwzpoxi32g89elim9fjdodcclv5d2aojx3qzc4y67z4v579hi60qqeoj2s64slihy0nqv0ot45h2pd6snpz2h0wvasx2aoojefd0pkewvku7syaxwlsabk9shvralvgq1nhvrhim5gbeejqeczprwb',
                parameterValue: 'ewpsgm7l33sfp4pl9n8mul49jf2ggybgjd98lquvsy95yisek8787qg68mjkgap0e22mtzrbx5rqx5tm85a0vjlk7tpmjfwkejsaw3ktgi95pm7g5syrodtx6js6jyi4crlhd7hguar5c089qdq9t2tl66vabdks04782pyhtn0cbsahakfnuh1t0tdt24l23uqwrzh57t1tm7phcnrpuu16ladeec6ftuxzj6015maa9ztu3diyuca9scaza661l5b947x0dnn4zx5g8kurcbsy2pa9sq3xvk3sg1bhv6iqrq1so0s5uc3j80maoauoy2uqz5ah6p1t0xf2na3su5lquuwcrysldmh3mo7i5gxop3wdn7sxp3kjo5o18xz5ggvaxf8aeceq8llyq349bpgan74mry9qofj2zbxjk0v7g67bvos005drhigw6e6yll3ceqoy8kus4zjsiijn65dc58uchzyxknqlyu46dumvm1cvxh5ehabcz0i5caqi692ci65pplk0alje5w9g644gv5ivc2oref1yj8z48hps89n81ddtr4mkcpgu3r3n870h4ycdhfi8565omslx56d4lle1b6i6kvb7pl4kwt8mk6ylcqb4nvg55di5oa0f7l3zmcmz8q07nyzhi0myvtivtza7n6vw6bqj3qcffyuutf4o3pjbu3jwn01pgckud0bhodzp2h9c0wdp8n20lozlqn1dxjlodpltbxdw0nhf4sj0ddwcn1orkibkifx183yndji8te3w4fyqc5dj2pjtrewnphnul0xztyhri8uumocowpflfofwmoda3s8g7gd1zb0ibjwtop2szaj0z6n4hmmybv1tif4ie86d0i2t235lpmvn4mnqay70i59ot78d93avn2o34gcnnjf7xxzz5vcw04rzf022gxztbnitwun6j3exudcot26r1jcgtipwt164sy43k8366ekrndjxbkbw1to023aaz75nq7d1ygoyehesfekrmukbtldt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'a8d3ol5t1qe4ndj8gt3ckeyjuze5k615jxal9oyetzointtbv7',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'mrxulz17w2ksdxak2103',
                channelHash: 'chtt8ngqep0uxaof0qoj93w5iygvygc02xhz7zm2',
                channelParty: 'oj48hbft0roul6e8m45qfrtic5gsen0yki1zjcalgs34gzyjojb9c1g9awrx379nlmi9arlaatihbsbju6xu7z3vg22gly6y0hqdaytax5s2u8nzy0r2xyvppgfosa82tmid0vmng4e3aemgtj84mibucbgm4smc',
                channelComponent: 'rm8e0kbvk4jh09r0vlx9ds4ejsh44q09kwyqu27j8vv99e083yrjzyrl01y2f9ovjgoeyi6x7g8rdr3s4ilixingwrtkw3qq0rnuj95cjgvnfib2otmzhor6oa83a77oquaovdscbqvxat2b5mkpqtzlrekv32d3',
                
                flowHash: 'bsxz4kar8zflt405avzquyuxgxrvgvhm2kz1lm9j',
                flowParty: '1t35rhpzk26ev9xoypiv3mng2jdxou88b5kxlz6mr1yu2ds7r8kr4b04zpw3bpk7wkd68zuhglmagnve64lb42dpnszx5fegtqjqbs2smtxufv3lvxgsv26mgvvpvnnk5qwnd5zqqcg2czuyuhl00g3u785skggz',
                flowComponent: 'pi7nakjzscnuvhob98fty31m1qtyqsonp502pre9d5v2temm1qdhexr6veeg495gqvvqt0rtgfurttapp3hikkunzi2z1pb1e692wiff493m0r6cpgb2hj3k7qg5hpc3442cg7b1e6k53jps3it0b5oocz2zs7zg',
                flowInterfaceName: 'ta8c59l3m84vud21b8mw4niubtd64o8rc54tonjm7rl0ujdjlqm4utz8pgu6kiylukxp5g2w0vna4243okly153wb3hdwc7y5ijq5bbk1n1739bk6a1daww11a01610fqcgs6lxfrzzbywicsqteyagrhbemwr51',
                flowInterfaceNamespace: '95aa93odg8mhywlbu39dmpbe19yn8e9zfcg7m0elchcmfaw5c0c7v2dldmdltjjwts4ec8qeyrju4uw1bfkl6x5assdt59rrls6n3m3teu9cejhfgpjn303hhh7aqnaidjda4vneq6t7t9y43agf8103fo5muz9t',
                version: '46otiqit6xku2yp8kpiy',
                parameterGroup: '0ux2xnpkp9jzb3al7l09ndyyx1gc7txhoyj76k40b7t0tjraxj5z5ijlu5veykaok7p7s4ba9usbmkkqnci56gxsqvh9kogzdy3vz5q7u25t0lvd64kdzzshkg0watav2fxxt3z3glbvndsnxy2gxs1w6xs46arbrnv2303u0sbo2cxx1tvo7kkvpv5andzwz9jzcz0mibtx8lcpiislpljoi3iks6arew0180u83qsg8hggh6hfknldrm3jtm4',
                name: 'h3iva69gunltn291mx38x9pechoijql2nzbm0bxd7bc13d9lcumeroghlc2ez7pij2s8s1g8bfwk9j8akzh66gia022mlsd1d0169agdm1mk7muhsmmn5neyzzohnk9pyn3fli2q09gn096jfg4smab8clgkvs9pswv2yly3qwwtkjfeiu0g7gcnqyk91ey2n5f8pqnf2oqa0nm8oar6cjrdztxtwibja9qcfxnk7ialc40qfn8o6gmhrllbg9e2ixhx8g4sb17ppxqnxnfz0dh7e882gz00ckw3ps5gejagr2y7akxqbbpgjxfpijym',
                parameterName: 'mh0x8jql57r50ltjl5aallxweup8ymkq3jzn3picz8s2zx94tqk7pikdjci8iev35tulpgd63bzy87halt7zgx37u129yehvftlhrpnlfha8bsccxd1qzl20io4e5coak4plhur3iuqjocdoxy0l0e8ywms84irh7vybkimmi8djka220e8t3ieu69so69lnhtj3kprfjmn85woj7ea42bmvm7roh0vcn5hk2nwvuc9g2clh7vs6anhsnerd9l5ldknmmpq01rpb6ymjv8jzny2b83p91dn5sxw2aopzwkmqil92yh5a2qkmvu6nhkyo',
                parameterValue: 'qchiw9st62ti0xgshupqd4h3l52ks09xhxrvjfqd8jwy5ea7evjstmjdkq2ydohytflng5aopunmydonauopey6d3lry7tc3l0iczece9ye8ui9zozkdse76588x10bn3ffxzpk5re9tcklc2qc2q1vj41dq5r9esxk1btzmjhqedkiplhd2w3wg1zxixe8vavyh6q86fu8emjwtne3rix66zruzk1vj21405xbqrbgwxy2rrpt9ddqnwk188p5e08a2knhvbm0ojg0nzlo88qc9vywubccjpbpbj3tt1obrhnoquagnt3ebl9tl39xanj4vawr5bcdu9c1d6kbckf4qy315xqmcrj8a6bqpvwm6ne2lfadfcbqkziwmt69djsojiqbv69fegb1ix1a4dhhffgafxopb03lzr65zgp3lbi672mt38vgekbafzdrslkif4szjtgm8fp799ho5as2u4p5mr2yw89945t9h8jjv2hpthevqtfcfhjt7thgag48oh7l2ikq2b5ykp7a0g6280p0irxayj9pupq55qav2g11106phrt3s1lw9z4krcm9kib5pog9hfv1v7brhjtgtv2so07n31relyl57lspu6ms6edqeroiqgnaqw75ml1pm7emc1764w71ieg24om77erx1y1xq6sd4q3ps2yvozt1s8orzyi78rt0q3k8uc5vvmh9hb8gcjrq4cmftd1a6nl5a8cntvpjwbwwuyvzr9bjx02dj82ww9lijj8va2be3pcvdl8wd4qpg8wxyww0zm4ybhmecpz9qh4ilfotokgq4z9cqkw4gizlhjv8bvu07racju7pd0diqhpydtdlelyzby77hwsxzdy5w6f112gshev60qjrfyry823upkttlkmrtmusq6nu2t5n83t6wh5euhxgpt1n9jxn1zdfnmjb2ax1dpot0uvbz26tewa1yn7xda81rvlmmwv3g8uvqgwtabht45ffopao4ckleb589mibq06jdu805gnc4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '435iljn15pqzw426yjbluk7eh2qgvmcfnx1avmyu62h6lopwq7',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'e9g114seupvoosxt00p9',
                channelHash: 'k65ss036ripu0zpgfaj0e7t9jfqy8g2ckt5ok5ys',
                channelParty: 'sldfmpxw773qj9nqteuv8n2tj1h4mpqksun4d71y1ert4tfgg8rbpw4yja1zbm6zduolee0d5v3jw6hgbufqfjyofuhm6nuexwiwi53ybtpgcyhk1j62fgmmoeceur0nxyixnkwpnej2bgjv47m238wzcp0nt931',
                channelComponent: 'q9nocf2e06dym0cg1fs2zfwo8rmorgoku9o84w2ntbzr3h6bbjmafndzewc2txbnozsu8p6ht8siypdkiu7swogla9s1qqxvwpf8cn6ka9cr87fz7mot9f46517q8ok5pazmcg0k386yuda4eghr43bl07ue33la',
                channelName: 'o4q84b0ceuersz8l3r5z0ue5a9jyfvni1plw0pnuqbja5lk030arm1h6r8k5h02mvledb46b3x5ftfxwf3ed50k2r5oqgkfwf3wpa0z3j7h8vf475jbpbqrf2z4iuw59qbei49fe9372zaj5jtbpegv2u97ukai6',
                flowHash: 'y0fpmc272crlvoo04331byfzec71e3z3hmc5s1wb',
                flowParty: 'm4ryig50z5wekns8z3o9o6ttyg67sq9vfd1pmyrnge9gr2n718buqxo3hhbqagbtvnp16yq36ardutk5jjlrg2jtdy3abx26sk2ity6blpgod1k9xkwax0rg2xiq2zz7r3nefar9c0nf9s4c2dvoqmk1svdwd4j7',
                flowComponent: 'n52s6ghus65wj4lribmh14foeh6r7ukhas14v8h1jwgghzoyxbi7sb0ga3omyeaofc0177jfgsc6owa3eky523lfk0ek2sp4su93o0ryyzfhn6fih7uv1sjg3uyfgmfdh2hu94tuck0h6f9xt0rkd1hlpe3jpqyn',
                flowInterfaceName: '0iw13yj7xujhq849tnowjj0cbbk3c26rvk5gvgpte4vn8plpf0chvoa32naixi5eoisz7us7qslmh7ivyf9hrew6w1w6bemm2lxmyzapa5ngkwq4xs4atm9qzfbm2mg16gl2dcok2qb4m5p21eb9dztzoyulseff',
                flowInterfaceNamespace: 'ib0mpcdgr3clstgt5utpoi26fchkzr3fipp2q8cxi2hfhjpaxnv4sny6za4bo8629vxtzipm33d5msl2a9kcy9n7wz7w0zd2n3gic9muijqlo08wcx8lakt80ml4obdk8i6kq67ug9tqizizz4wavuiobhpyslo7',
                version: null,
                parameterGroup: '6fcwtcen4598a5xqdd96n3zg9spirjj0amrmqdj5jr0mi1w9ff1bhud7m64g5jk7pesce4quljixnmb5a23c00zd7otbhlj5cuo2q2c9p5wl49un83fgdxcz9icca4epmal87rv3m0l3poq3roh079qwczvzrob6u9w7cf831r05rwlujaq21su33xufoecepcldcpivfwa123kuqne374qqhu9tix3vwjqoxnx6pj3xo35nst2v4jnrm5707k0',
                name: 'tgswhk9d3i5517unv7mpbhfwolcanrahiodax5c6b1y2s5wtbmr7f8jtgimqeyawpr33aejn16lm23tw5whx38so2cy6d1fttrn5mryumatkt1knxl6spljq7kkckvgmif60521sg60y1yqwkckytnpaxibz0rc84p9kks2sltqvkrbik0d55mcnnmnynady1jk1zuo24e9snapoc7qhrh1lx1hyml31we4rhbwgmtgkynko13uqm6akfwtmwh9w5wsnp02am6dera4ga0oqay9l5jl5794nzxygoz2d2yitikrzztd5073o62g0uuab',
                parameterName: '5jij9ezi1uv50u3potc0w7hu410zad4rxvyvhobkc8qt9lmaruwbtinhiih5cgv4z9zkqda36xud5nqcg12bdea6aw3z7ouqhmtx4ubcnat6cuurk2gfmzrc0a61hbh4y4pdyz8ihdofqbsocr9ol9eihrecikuut8tsgojo083zli7tlrkozr9yg5gc7wwfw8p7v35iaeeca4u0zd8pkkm5x388dqr2v19ycct65elmaa168ggmbd8y353783e1c2mtl88lhv2ioic82ubshfyga49vre5xkj7j7hxtyahnicyd4rtva2xoonku3n6v',
                parameterValue: 'b6y97ps0mrvsmxl01ni4nd3brbdqw19owy0wklvajm0iml9rxifbma54eai3jr5hy1ra357h4c15v4p2s98asugmgxn5xealnmyvcmzjkg3r0nlwoplpsxexm8vj9sofeuolj7g11x2oacz5g2m4mpg54y7woj5ig4mhpx5sc90y83l508lrat2jlunm3d5gsoweha6fxkdj6at3jne5bet7xu39gdu2l2ikcp15v2sgy0ftztdzqtgolil0dfydbjfcs3uxpk3ovdyrff7c8kj9l2jgruvlbu35gojfdci3ranxnbj4yriqlxm9o7rhymjt0l3lxcilbkxv1vt4th3k4ut5jxvwg9uquxsdgvoyljpzhbzkz80xum47bt83vn8ynyablyep3bwqb7pjle5pgsangn1feqw7reuxjybtmpwfttv9q428zpdhjqufc7o1rqqpemrqbaqzj86c9z204tw3q70s62enbk4yqfklujyrb7i7otreqdzupdj3wc6nx2mznd9tleqvkuc6q4jirnmyhsp835go9swowsoa49p6jqy9tu79ykr2aah6ruewb7ac4umug574y4mem5g5ailcfxmvrsnne19b9yoy8xyjvf1lbmbewpvn5thlfw6sltyihrl2dl0p5wf46n2fu2b6oo62bvjk0ohd69d6dsl0yix2rbgjp5xnb9xyts3mcw8mnbbz44611e0mioytaq71tg2hlbf46qish0b9t0yw350y54fzgixp0ngrtjfu7dekilzujb267thdmjbt55davs5tt3tqyqmnhu47wh5bwas0b67it94r3d0xuc88jm8676oowwqba8qcd6y6ps4bamcppniz4avuuhajaeo36gc06u037rw7o7bdjw1krj1bs8808271vj3f30ajo99vl1dyt5xlo86a0mzl8yvygbaj68izs2rhf94kho7n8yivf4suopifdl8f07yax2iwrxpfcm4zdd8303az4686i365l4qiu2i3nu41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'cd2qnaqnkhmhnep30ve016qgzjrrhbhi0p8sfg0bp6qvbl0q5k',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: '38dqbu5cnbl3y1ya7jc4',
                channelHash: 'yxzoeaf5z7vw1cmmss2hfe0wls9vwxl5zw8fjblr',
                channelParty: 'hkdhnnct74f73cepb2oimm2sttc9vv5uhyak3qa2vtsqhytormikw8naqxi3swgzh36ve39ql4nxbp16c3sqb3e7oboxhe1im6rr87s8eb4pt5ti4dl8av86nodb9lpogiqiwu2meuzx6h3ghh4u6rk911f4v3yi',
                channelComponent: 'msx65acj2amsikkxdz650mtvm279efdjk7i3jr32s75j6m5fovhhej4felrj7j6b0dxkaqpfgiz54hgrzlbzlbwlpzckdrpco6smn7unl8rwi9vn3prgytac3plf44pzpwd03osc0a80tdtunuy4pr37c1c0xrw9',
                channelName: 'yofqyzr52cgxrlht4pct2pnm85l68fphvplr4s9exhfxeoxxgedb2zotcr98iegwfe5omb8zs91zmpemakamz9b7mgt495mm3e7pz3zspmg5ri5neiy1nrjqyhpvhj5ebd11k9e8myr3mluykw8tj9wycdetbhz3',
                flowHash: 'vtw6wlpocs8tf0x6bzep7sj39wd9g376z0rvit9k',
                flowParty: 'ej454iolp1ku49zj6u8lrhpz1fqqt7bn5hnnse870t4cch8sgu2730o4300ouzkz02l3042isyr7qyhkcj545zxx0oh4rx32ek5hra3a0w4g587pdtm6cjjs1eurky1nmn2dhjh4etuz8dho9q0tsf27f1agacsz',
                flowComponent: 'm625xpdayywts9e0bx2fbmuwnvm6v96rjwin8rd1hsvwqn26zlhx1pqkk79cdogn7wqoy5tkgw6i8xr0ni8cnycyysywad31vujauwe1xwec9qwvbzcnldie8dkj3q8i5kge6znxy7bvij924m1339cce3kxbsqh',
                flowInterfaceName: '46i72jnd3efw5h31xrk8lqiucwki5p9gzn9z51bk6otimt1h2cl016quwkvavoa1cfnp4fedh4qf7l5jl3ogtuwusqt0c4cmpqd8fwqhnz345fw577d7bmparrs243rxm786bcgqb88dl02wkdo7as6mfnqzsyhv',
                flowInterfaceNamespace: 'cdvgb87kojxthctqhhdsqq8bjt9811u0ee5mxfav7topg7k65b305wdqqsc555i8281jyfgrle1sknc0u2sbdaolpmmyxw0kjvoz6yd8de733f93wk4soe18wv14jj5ckqwt83x9gjhntpo1nln2cfc55zjfmc07',
                
                parameterGroup: 'gixzseubs75o8e9kdm952ss0fwn71nv70thfu2ryztj90csbhxirmzonyo49u617qf10g0f9zr5xokg9z076m1lyp98j74tsw16lu97zph3n8d19c97yole2cxulz2dl5tp8wojddx5vi9s3s9xiog4lvlujg0szdy5nxv2d48x8m8c2f6963phjc445ajtmld3yngiw3w2piwrlt2ljq7mj8aokc4trj98gnw71ej0xj9dlz6okybmw9ma3bgr',
                name: '6q03dueytz3wymwszwcsfs8cl76abn7i5k5svao4o5u589n3hltm7tjauim2fzovr4291ahctzooogufum80u5ccy3clk1jmkxuxpl57l1r3ep1jx6vk5vdd26rsdsttrdnj7m54r9av9i70hcv5yw2pzpwfb3j3kb1e39x98oil4k6iculmsvlluqf9o5ah9cwg4lmpybvmd0fd83x3vae0in11drny3d4fzro98c9pm0cjx9pgu6g15a5cz2yc69ow3w835amv642ec8ps0erhtagxq61kaq7fikp21z3lp35k039qmrv3uurtiph0',
                parameterName: '6rgnu29yep44geidklxh9zcfpyyx5mp41qdxen9kf7av4xx293kwgwwlh2ovge28g3d9fu3sbvfpg219kj8ndqqa8wr82dh9352rem9y19xue4gwiom4yfwl9zd0p6vcu3jsbzdch2vykrsjuqrj36o5uiupm8llkh0muwv5rgr8qzddz1klv8ah6s1nwrvwe0je9143sn6oa3bc10nkqfn22z29ri2k8jws39mghev3dsv2v833mq57iz6wrtnzywsqvrbezgu1bicfr10r5mreiw0oa7e7z3poxhgei1qtq37on9uekowisnyksfgs',
                parameterValue: 'c6i65xatxsoehjwjdaqzc4bkbmzyfp09i89hbae8nd4337mpmuh7hctpqs8rjguwcgw4i8ti7o95luv3rkl9jp76hrh2x38u22v3p03eu52gksksf06pjcb7sq7plxc1ieldefefukcyinhixsbenyjst3u1g8e0srxv4rvtupjpudypi6hc5o3e5b3thnvqtaj3esbp8vzfp076tydr0n7bxbi54qq1z99g6jojw50a6uq17g9ku3dpecpyitwbpo6fphbvj7kfwonx4mgis60l4iccy9fiy9im7885tj6b43q7ymxkuxrtiuyvaq1fae24a1oro9o5kn3ryl1hqm0kl07osgo6imw9jv35f0c841y04pwescqh1asztzz6o51sdz36e3cu7e28mvav1o703l2b0fmnl7axzm260uhfvzypfwxyvl4jy0o8c2unnjek6h0t1rva043xfojmax5111lotfx0glu69cnb9x7u4yonoa9m5mal8z4ex8al7bycr1fdt4cf8f6p0njz41nsfja6zo7ohzzh70h99ps1g4mpu91m2k5lcnlb51ln26xk96golmgy9ct1jpgrtx7la8igbb9viytfgfy7ligx9c8lhhjxlk8ixqfpywcyobkp7y0jhgrf884jpao66qq9fnbwod82k8g15vgj32l0nhqadc3iugv1r7o34dm61h5whv10ooxu2588asrf9ldzoulh0bpkbojyx6a76z20i1jdvqx4etlpwc1p4ut30kjfg16lfgkrayp0k880yqkn88a73ifofwaql22qed7v4ykrkueeh5pugwyylce7wu2pi6t4s72x6ddkt7kpl1q380xqind0svxdr8ftk6btdc1tqgjldz79l5uuoqi17c3a1gpzrhn63vinte2j75ylfysvce84cr2w0vyjtswcugq3a1vvd6sivz997axxckdght4fkykuvlk9kg3cmecn677gkud05dmil9jmjk2yh3f2dk8onuj55jbqpaky',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'weuge4q06pqq3vvx834ig631gwg79y7hoe3px',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'p2xh51m2vspwtfd1pstkpq8ex7ei3scic3p85lk6aprqdnxpam',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'whgzce8c7ykp5fv0ayon',
                channelHash: 'zosveo88q0mvru14t7ggacjotgify1wliwlo6k12',
                channelParty: 'fwgi743lqkdd3xoag69k2yie5rfdnlzognzt9x9q3nksaarflwcqjxg8h9uf7zj9lwk8vjppmipffaku2pxli9m6jwdltrh36mnybyd3d8om6jogb0xat17cjbuwzsc51lnopa95jpslu7xqxf3tpcbh1ju5becc',
                channelComponent: 'oebxymhrdlt2smwp38ekvaq7wipolzsd4l8ihtui7cy6i829o31vepfwbae1xxis9ddpudsl244n31e6t14yw9t211js1l7pu4usnlj0bg7dswvp6vn6cezsrour6jgl2dqjnl0hfyvpxq2z06rstrfzyrltyipj',
                channelName: 'j6w9de22dli9or3gzy1dtkl98uzxbtp71yltn05420ui2511eb3b2rx0qe56h65pdmqumxkwnc9odn6b5jhgbr6vl72lwt5ndf9sw7h07l0qsnpixj1mr22nem6layxnhznmpjhi1s0fsqvx6uc2e0v84y812q8b',
                flowHash: 'ks5lknb4541np8u1mobrwjwz79cy8s4wo6flcccx',
                flowParty: 'evlwojrn45ho5irbanmf1uze8k09euhcstyfc4kcmwc6yx2pnoqq4oh04i1c7lub27upihfjmyy1aa3jlq3qqsz1uj09na2o8pde9r5lwxrdp7nnj8j07fbuymvy3chynci5lwuen8vowczyhex8rniu1o1bdjqv',
                flowComponent: 'r1kp66q9yqqnukusgylde31mtca9iqz3wj9pptqj7qa7jrzjat1uu8iqh0uzjla3v2mkqksd82abwhitwoarcbnqwbl21y3ohqz6vzermym7e3mj90vjvgh1b0y3ig57chzufie04x7ldm6zfi8m4k6qogrr0yry',
                flowInterfaceName: '32n3ib6yrwols38il4okw5ahcyyg02wplrgxov9l12b9hfbjevanzpu6tcx0zptrkimpv85bj7u2ooonyvxsh14uhg88igzmnpc5e65me24j7fcogf7ebfwfhclfa6b7572okevi3zumx6bhocvwl9pywcqtnigv',
                flowInterfaceNamespace: 'edil3yll6cloujzr3atssb43pvmiy5wj59i0l0enl6eljv0asewfkdxmw4uno7vf7dkga6opnrtxc18e6anvk10h9ue9oh4za4dn59th7y4mup2s7jivlkc9tb7s3gug7z5qiw6ejy6b7wn1ht07z72bmzwuenlr',
                version: 'cyt25ghqbqyy8ok85iua',
                parameterGroup: '8q4aehs5fc99b9rsmsl6b2wji5h7ivys6mmgn7whic4q8elr0zwm1j1xkkgou5lx7sd719zuue0nsnqz5ozxjsbxqwjve8n12fhq85mu7kaebomsruvmfh6igav6kshigb84j0cvxgcwztkqqixjqxeclvbnq5111aeokgn2yuwlo1wk1kql9zkmltmqq2yvh2gt9h56kwseud92s092vfdzaulbbbz7ptn6ifda690zoncum9u23ww6ycsw7hy',
                name: 'h83h62shcdoj1406djt9abrx476j8n7qwepyyi3gsiibf2hvrog6vvcke7t2privyrcpgy4idabbktiteesklq0yvlw17vj0lvrnoyywj35kadsyxxprijemu4f82alw1t1ye2t403hjuujyw0hscqtqphnsemuoy88nglhkh4i1q8flbrbxzrv816beayukjcsleg2kkvt7n6coaejjdhrg42s95fdbnef2h4hd8p09pug6tiwqriq8wxnrbeaj9mt38c91xpqsz5n3phryueiapmwtnjlwt0961boon60h8gclcosyv0srvwy3z268',
                parameterName: 'ahvravbncgsusr25xykhp2q1zneswh9z4co22ouxeao6z7xazejv9ro6wbzemo4aubi02ta0gpdzw46hqztvhebgumns0t4e84m43ew8zbbet6aygl9mnh8q27ohqv1qbp9b1xyjn1ss70054lcfao3tc3v94k5fwuk5zash3wistahip0i9eoe7umij7pvbhxmu2nxktfy3ljev5yjn5fipvhzpb1khzc7zxe321xwbcog1wz2xxwtmpxe2bi4569hc9n7n8m9ixlheb0c1fqmid72tpoo1ktaaga027gedp80lb7x2wag5791idujh',
                parameterValue: 'mdadf5jqcwa818t9lafoorvti9defzp8v0mfwojoangfycxl0yb32kkm5rpc7r2f3pcd1iw009kkitw4rkfdl4rxeh5ylos26iemscfapexrsac0ygry741gc8sthcrnh0q7xetubk0tbrrwbxqa4hcmmpxlx82off9160h7n29t678ftakxnxowk93lzmec4ny6pgvdatbtphw45yoee1zbi9l2dv6e8dozkl4c5mqah9bpib2anvuptgbocuxgab4pljdkc92yzpc3u8m2ct0lyutj7eg83xl7y4izw7en2a0l6ci9nwsimqrwm0rgpdmd0xcmjpb02q9lstc9hy9rlmjrvo0cml40dzjcw516cf0pihhbvncjk5px18jr1wz2ajwsi8dypzm5qvkm1j0i3pnfrizl4ltvgexmp5ez9dphrkmlhhj7g47v8bfbwbryg8jteagv3opens2wyhm875g5qp8oftd3pen7ayh7pbo8zckvqsvbj6v8fjbd19ie4y8mdzdw4yks7025ek14as104bd8a6q1zdz91xnjtj3dk1h9csyox7jyk3o5t70lrb35p6lw9xgv1eha46xx7i9s9p6930k5ahs1u325eo02y2gi0w321tsvp7wkyce1tyic4gzls2fad6i76zafpc6cykvh6f4qf59yxob7j2aubwkxvli8ze83d47r7amh1ava3bsz18wchhz1d9h8g37zcj16qzbht93glakwoh3r4h2oglro26cf3rakexlyk46hv25xzsdjiggmp6x4tgcba46npt2b7qpxjerno7d1k1ura6pwz330bsmux3wfi6h0w6aszjznmpgbu267hxjg6tfis53m20znehlg9wt0a4xwagx2fj1h6jpwhjc4uoy1umwpvxwqfd3kbfcwfp0s16a0j5h40fv8b1h6dgne5tf2478qwu2403zwht9w1m4ygc9iki48msbztmx4v95e7twhel31834578g24e6fzjg4blmc5c4mvjpu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '08wncnqqc1bvzakx75gqsbg3u8dfrvop7mr4m',
                tenantCode: '7shi0ni1lhs0cg3qb63um6fxdy1dh1o8jwlbexqhfi8dyc3q53',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: '0g5grj9tq9k9j752ec5q',
                channelHash: 't8l4e1fxey6sfqakq9nkthvadeh60mozixkxlzx4',
                channelParty: 'scxw22wz3mg6ggylpob7utjciqh1xkck9mvdx99l3eywpu751kygr28yvmedenur7a9tl6x9d47a2xy05c2c8gr0tbvvfkk9ybvslnz6vwci779zp9bvt0ynf00v9yqbgzxpgzhd31nxem98b2oe0aay8lg2vcmi',
                channelComponent: '54vow14joa8a0whso86qmdjlur0x747lv9ekfkbua32nmjz8d4mddcgv6yk4e4bk6i75jk8e4y8d1bsf3njyukmno8wmu3awdt5s15shshdafb2qmwmuce8kzr3hyyrw00gtuarsbh8me3i4rgrqd9zklhs78v2d',
                channelName: '14d5yel34dxn5od6jvsb2ge64igjol1lbrx3os8ghc957lc14tx1b3e3flw6blp24ahhvhr7wpciaqgpbuksqc3g7kklk84sa7cgdatncx7xguud9qw94wsczjsam6kppil33bd3ykfvffgj3lp5j1yy77ava3pc',
                flowHash: '5xyvy0uqf7i5jlapee7dz3terh9vuygs5xpyssy7',
                flowParty: 'ey4nhp70bw3s7f9p41m5348u9znpi5nr1x5pztpnf7qh85h02z7b112j2c10r49na9ty5kn421r3o05dmby6zqbg5f5qbo3tynujoz804a39urswa7pyn0rsoe9gbzscu2y35txuy0qgt6si6zd8tbxgl1rp3o46',
                flowComponent: 'b3a8a5mq96ela2999whfox0olj604zx7xeyvvszcdbcqpqljx17hz4ga4cj9jgcty02jixore8124bdd9tvzhihlnk75x8y2u6octoi9fi7f64ityfctri2behhvms0bs0cwbr1iwanpaw9q8ukj1whwtd1en0kg',
                flowInterfaceName: 'kxpxgbfxo9aujtdd9rxwjxm361abzfvgrus66it2isbfzez9tzo5aibddjok781wwfv6l12cqvxmxszecmxbztm4w4r9dynldksrgodccq2bsvshvcbea0yhft3ovx7l0pxzkf301rl048bwq47vgc21k7rgfoks',
                flowInterfaceNamespace: 'br8boeosuhdyh2jetru18et3px5mte7q0chxb25x728i6ma8xrvgc5160l6l51vbvyyyu8x0p7omz4tatx1y1zrt461auv2gwkwcspi7pq7ibbiylkvka8bubtv4g0yegiqkls5vf45tct48fth4ekbvogjn1v0c',
                version: 'xpjenubrcd1uxi0fzsmm',
                parameterGroup: '2pez8lkdt62fup3atd4v66679ngjp0rt1c11kwjoiaznf2aqm7rp8jpp677q93z6ziz2kx73cg9m60eq3nhqekbefk21wxcjt8dqfchgdl816ufpfgvjhnvm24vfnac8mesqhgireib2jvgib1mv0p93tv6aj1s6wv1auit9sybpr50qluu1nsgj8ivnyuufl1wq454s0wei6ls6ee6v2bu84ximbh87inc536vco4ljhs5cm5ifypq2l84g77l',
                name: 'deulr4dzlu5liskjjj3mkrj3h4hf98h0d2yzxbxrupac9kjh7him8kgw1zqxpu9j1j6n0b3v7ldgj6h6yxgilxko7y2k7w1ix8qa56qkr7s8nkuz8ym2qdnkmhjuvh4jrf2roq7pm52lsikb0ttvj8gmujbtpvglsy6elrsrlg2e1lf2g0bgd8gtb6wv67fi22uc3zmd29ime7hcrat7lum3cko7r55ezyqxloh9j1f9ytme6rjtcfcfvlzq3wqzgdchhblt06xart7i73wtvrikn12uj122p06oaabrvp7rdwqxx78z7segu8bkzldz',
                parameterName: '8qivqq2vha6p4m054jfhwdssv657gto3pba6fdyuxlmq967t8rn7pzt8rp0vo41fgi0tjaybqqc7j1idy14rs1oy95ees0o6et21976l3qfe81dxw08bkdecqlxuepkm8pk7eqysksxbgq1rjui8j27ooiawcmnd75cojmpp5q55esfgz7fruocpsmuu2q01rvc3h6mmmrhyydkwnn9uld0k7io77nwmd6mxoq9sd05qkbf0tbg9lh3gdwwu0k6e5se1m63kweguxpem1tx90tcy0xpy4x5o0vqx65qogd8qww76xnzj2c41w3korlso',
                parameterValue: 'sajm0tedikfpfxymb32xwsg240nved0ei3jlzm596m6rzprxrchw53xxxo092nwaj99mxvaqaeqki6ustd6rfioyb9iuylx2p0uhh0fpbbe8b0c6oz9iuj26zg5kgjmttc3disgnfbkxsjnkhzpidevcbut29mt6lugl838qx9ko3y6qk6i6356mizl06e0sx1q5jj079fq72xgh8ydry1wpvt81uucs55925p9hnqqdzhrov8s62v7g0v8t2sbhcuy5rtcdymwlpo0oc9jx5kc2yp84g8vn3s9x3inbxw0hcqnzzds51z02u5c194dwo386enyokq4elsl0egfmuug6cbyu3vgbwgk3kccd3ibfcwqiey1zfdn6dgyiu6qcwpgkudkmvhm6omy2xsk3iwrb9ffn41lrl9j2tsulygx2xjh1x0gockai97kazolrr8t3l0bx2ulmdcaexpdmzdir61ec1x6dshltkm56tx7muz9legdpmzwp9t31qbndulm77bl1ijdlysc6kaesqaidtay0q6vd3yio8uh4n6ra5b92kkl0hsy9jhkt6ndry6ha5ywwn5zdiftkgioj4zporb3s5c2st2kjxpofyx77304s4gcwpd9yr5oogrhwnauip6axb99flzxrjbmag9y34me0gayhra1fx7erl4fby53uk0q3jd7mrqdz3951ked0pr31ppctgyfbd7iuz8l7xpgrhm17xvybyi41366kg0p2jfm7u6rr6z57lvd3f34jyzy0un8ktfi23x0920xwqggp5hq8bezf1iy60ci0fcyngk0odwmhm4nhijai5vcpquvbgeg6y9skt86xi0v1ntehqi7irer7ol999meizuoqvid9aenzrh6iymcfhqvdciowbxo6lv35h34l7n40ci7br8wpk3q35hbm92t56kaqp8jxbwftzxh99rsr6mttsxeehiz379qqfm5ib9o45zhy94vnumlhjetnzah52lferv6as8apfc2h0qdr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'd8m2za18g23j6ba2psrc3cc3vd1dc1j2avlwzgagyrqjcu86ec',
                systemId: '8p7jpawljphf15t4isueoo7vycdwsblq61xij',
                systemName: 'tqro12aarql9aps55qvp',
                channelHash: 's7npi4uyg57q233wp4n6bmt8syfxkcwtfdj25j3z',
                channelParty: 'o7c7vorg3521k334qqk1p262cvezc729oljuwq01xgv65m7bzezmp1jbu74x9yc08s2c4eri0tm8zz40wi219x1g7dvr3lfupcouar7w8aunmbqt5x1d4sxkqmp73q2g8vz8lkd0j31emjd2gpki8a9wvzlnw9iq',
                channelComponent: 'kqkpkjm7ozp3ezqd4lampeyayutq698k569nm8czpl3i3cpnutzweesk7bisp0cxr9b1cveit05jh4pwsw0md93thaj066ulf8frstjrtn1vfrzaki8i9ovmfaufsiq3r4phy7xe8zz6f9h38rafaylox6d9zpg5',
                channelName: 'xuiqylrtf33zy70qoqsnqvhmkqb0q81212dvb08y1te1o77wvbe51gsh40c6lpwvi8e8klfyfx6rcder2ng79uk83op108e2gwbm4edv0tc01nw7h1hd1bfcwjnhadx17jbu6i4t01filw5stz63ll9mf8gs6vjf',
                flowHash: 'k7uakeeolv0kmtpxbjakvi2tk232v162qjwbw9g2',
                flowParty: 'pvmdi09iz3mg374jua6yp0gnjubxxowdz3tgjumu25imey5llf72id5sqgfb7awancqw9djom5v6yyiwyz0p0hobii06iivjkw5u5jpb2br9x3wasfuvl0krz7217m52wyi8k79iw12mxpibgvpf5ryv2qd17gwy',
                flowComponent: '8n3a85jufvdt94izfxb06oxgg7u92vxpg427af5fh6q7yc14ye4w7yauvix1l55eemryaemplrq9wh8nn6w1ir93gbrhmbubo6bjjcs6krl6eo9tpfeap1wenow53j7mgc9ypwya2cl2kxu45if8cz3ketdzghpo',
                flowInterfaceName: 'c2o35etequvk8lc8vv7fee29l13sb9zt4hsmlkyz7umcdizf0q9c0m1khf82gmjb6jr6o99qveens52ig0eg5xqyt8ftveimhx19hqia838268lalrokh2if3ivojja4p6we4jd61ik7ua625gwl2n4sywg3chyo',
                flowInterfaceNamespace: 's5gs61mj1luwxi1squrz5qbcqoswvacac43m0cb2mxe6md499plu48urepvbm0lrnjyc4ublexe0dah5cgnebgqot35upwp5vb8feqnvnd0vyt1uzspd7wdn0ilzf80mmh3gj67xapuztb4mw490rcc1o2pvdq0c',
                version: 'froj97ozxlapsdzh68y9',
                parameterGroup: 'm6so6t6i2ljjy7uc6rl5i494deyi9tqvu53r6xkntth1sziqk1b5se6qqr9f03r17vld7v9d666xxt2b6e6ddjb16pwlbqimabyybda76i0u4gfg57mqesrj71z0fs3f9v79ip5ca94g58tlrbx94wyvtnssms3b58zdfw7847nggkkel70j75adb1k1xogo9utahhg2fqpva5cr791hquvg5yvhmnuqilkcleguwu30kxqf6fkipnilsi0i5ig',
                name: '5ll360lw3z4vvv40yuj8jwkn48179p6c2x1su5lbtb1u85qo8esqhpk1gvbojq3yyoe4dcf3l7ct7cpssla80mtsutnxdfygngj5kpracwykgb9vcnmnt32f4axix9v6dxu5zmu4iepasy04wc0zoi4kpzopyztpruw8vaw37cwws2nahm3stvp3b8imh1n6ua9lq1d0ffbrpp1mslhh8tjcovjg0avxyg0w5z9jtaj77bcc8620ryfsn3v57s4pso9m7wl36gkswjttrnfffhp3gigq7hmijbtibt3ud8l0zt9vv3sp2yxx994b4hqc',
                parameterName: 'wcpkp483bftavfj5ilvw436r01hqqkiyrsoacwjpk6mcmsp0kbg5b3zudncter982s8l4dcd8g2whgbgh5iuyygod5cdito4zz4cxxho63xeggk6w0j03t1x7otib51eeaplwzp2ym3wyw1m5ayqzlzme6klt91ht53kmuqvvaej9nngxirntkbtvn293mp0g6af16kn7oopu8b4e8m1pzgaeuj1pxtlc0bdxoipzxkqjhwi5tiwsbdy2u07shrhkol2qzaay9wglbu7svl0ljjq7hw23e8ovmvncp80h9mxp9nj59jmnbcvfrd9iyi8',
                parameterValue: 'frf2w4rjhhxc7xijhw0tj5xq3x8mwx0bzbdox1vloi95dw702974w1g0qin7y86ozegxn3w26c4toaft3bta90knifm1emmp3gwzny984o8agzhhdgaif5vfnbuhhhjb31j7u48btier7i22frr2oaz2fjhufy3p7esludxcvrf1jsxd0ij0ty7gxzqgby9sah3n8pz1rm9r7l1haogyrrivcn5mualp9m38qrbfrdoq1b5xlfj7ylbtb9cz503iiih6xcurdy7fk0fx345xi2e3tye9ycbrfz2ot35qelo6nr61zfyoq7c68q9aqatqc9gyp1f49s8oq214edt34uw1vdvbnrso59k5qy9hyfqrvi02kalx25o1i0qy8xtlwzprslw3qotjjgd7srsfz6mdrtsk31ex9dnk5ok61fkzod5wed86xd6h5nwqsko9b689q5vzcx2bnw7nuc5cub1ncq467gttohwftuu5dujuzfwxxq8268l5oxsytbwl91qp5k6r3u4a7jkar322og1i6u8nncbnxfsokmtp4ngrrl3z78dctuet5cy5xsgs8wjhfxrf2vhintz2neozq2eskqxj85yjh9iojrnrteu1a1uembsma1i6qarfkuop9dsnrciew7ewhveeh0b20y40gb72l559r8kffn86wxnjmrh9444ipeuhpofl0k3tzyy9pjhjc32ft275q3flhspojr1yz6g8bctsjbaelbbbxed3hos3ew1c9brwmewq1h0d0mb24d6aocmcfawcfmqpfap3mcg1ma463f45yegunt2vwkgky2z6qd8vz2ni3xtxzacjc2tf22f7ocbctbp9k3rxani9ny87eag6w6q3qsk3do7q17dzzwhazug95cmz1r93rdswag0brm6w62mwt1cslsghfhm7omrm0pzpi9s248patpuxoqjln60v1x3qa3xjnb7lru77ysy96f47wy19g6ebwduhq7lt9ynf5rvgx6bfkrdvquhai7wb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '2ecdogmm66g6so7aqtxl233tv2uv1re970ucv1h0t9wzfizjdl',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'e3dj92vm0jx9rqt4f0na',
                channelHash: 'mmhn5aawiz624w6a7cqamrbhyzb4vsbh9g3fbi8x3',
                channelParty: 'qhonbbgqtfv9pkfbrilr6ly2fwqpp0k5p9ui6xfi8cycw7wjcs1lyi0pxlo3swcrw7u8kz6csnzg8mz807jgkw7mdtv36m29n948fb2vvp2wuq66ietxyvcvgqvhkvtszd8vn41dva6r6iol5tz943tbwt5tk2gu',
                channelComponent: 'awvf5opvxxjxaz56q6w1nn0dbhzxnpeqctl2j0z94nh7htgtxb3nimdevt5ufd489dcthmhz9xdfl5r30ax832r5movq9m8zcq3bmv188jpxmjiqsehvhiugbjuogdy7hasr8yaycem9lphw8q8m5qujbqoawubd',
                channelName: '1boqr72b07tj2hehpph0eba82jqhfm171t2g8t3d7s2nuqtkq2i53kni6zluftud9mvlc619zhtieaz65asnodbjgio71x15sz22q6em3gkl8esh7iu8gl4l5ynuwaw7ns80i6slbzxgazm1t2177sj9zzzzkv9f',
                flowHash: '7ew4qr0bl2kep4421vn0sctspq60t9ry4jj47nof',
                flowParty: '649cb5ckfhlz2fzbuzs13zdlmhj3ieqummbf5g8f6tgbntrki2zb631l06aqsn7wwekni5edi7klo34seyztwex0zrv1erh0v0cngrilj4yoywlrnjdxorv1sdy3cxj43kjh1vm6gaa27lzvic3l621fmnnna184',
                flowComponent: '8o3csktjlkse2ymp9cknz5zuywkx53ml4isivkxy1yw10jlno5ho9igyu442ut6347oi3dltr6b9rtcrlxzhsivmq4rpl6c2t1bbcycar8myvrs2tscngcu14i0k7j4yuyr4ya0ti4pj16amxzyxdvm1etxnoyqt',
                flowInterfaceName: '0a0xgadmfzhf6n21tzoxxc670v8yuf6hfrs00p80n1dfxelns25idl2e5k0hy19en9jc0it7zlvzmx3udk64ynxk486wxlihlqdnggqlbjyh0y0vey4ibd5rzsi9zquyd4dgeo32m1e1f3ysp0xpxvsbeov67wd6',
                flowInterfaceNamespace: 'awv7j67jrmdra9lf3lnww8o8s2we1h63kbmdd8qa42m2rreq9y9bsodoasvpd2b5fcgl4vf689be484kp1aixpyk8x6zcr8oxu3p8a2qiq504eas658o1bsndbwgsaaljia624m3ukhqf05osqef023qbbj0k5j1',
                version: 'bdkrmcapn6307x6e8p2s',
                parameterGroup: 'srsmfms83vei4fk7abarhcamem9kte6w0imncqh4j3sn7cmrsreaobpwr45107io66ejsjzaxpisbfs8rnxlga54qwrtig44qgzanrx9qmhdbmkcvrhj3kgudo25rgnhkrcc2dq8zidkq823p8ifi8gnqxb3kst82fury4np3g4uor4w6tc6whkv9llt71vd7gvrceau39ax2tp4e0byc143gg4alk8w9tb5qgdrdyz34sqpjx6u4ywlr2vopo2',
                name: 'oj1l8l0dvdufo9qpajofc48ec0so8w42coylzivmoqzoxitpy6bi107mx52qykp222nu9gjr2sdfvyb0uqcocv5unqpv3a9qt1s0b0flkrehwxbvtnr84f8vinevgx78dl80qf3plll1kh43q6xg09jyetil5nu99raoc5yfapi29h0n2u5zpyteyp4sofz0y8v41n8nc2psesm685otqeitkw7zuy36mxs798u6dljh9nvxc5tfyb9j4xxj1fdr697h86vfzs9bprdy5hjzyt030bb0g3xfzeasdjy50le4wc46loutvhly8tcb316h',
                parameterName: 'faljvmyu12qrqyelpb6vumqsojlll1l0fmpm6a9k8h7d3jjn49wgixae95cq8xgxu4g6czqjnemzi3c5mf1o36yv2bxveoc0yw3xo1ztuh087xy2ax0tkjf9vo8kthm351nfx7vfcikonzs20hww77rm80bezetuxxvcq49nrql8yi2emls4dr7if72fqi9dqn35m4k22iptdojcza5utmdmvt7jpgxqpajhjf89v5sq1kmgv1372dlpm4ioobno7on0spx4aimwqmi3vn17vlc3070j11ask0jr2h7g1nekcoddqwdah6o56857wrtz',
                parameterValue: '4f5c3rdu9v8ppt2k2832eoz1hh7q6f92dcyvvvvee4l8my9c6l61z18ax1j3qju69rxqkvxw3ldd5uu1um7deoku15jffsrpyfdbgnsa1rrq0km32w9yphh5ob9iohb5nq5zl3ra2osmepdq1mcpl3ktgn402nt3jh4m0d44b6fjdh0br9b9qct2kwiu4m9vx72lidoudtnkko76eovb4p2ac2rifdp8s5t2u9d4sfj7xjfy3beuyqf56l7411h9ha892q8tcz6fj3nfid5ka7azn3sgi6snub8jupq7j5h2t35k58j9bhpo07bp1du6ri7q88gnqhmjkk316bmj2wlkz9s62b40xnhv4b87hc49o5xxpxnhkma0u43e7x3bqkxj22k0b1pbsf2uhdbnil0a5x0usaloie4ggf71nj5efbez2vosz55i9sobvfzyh8u9c5zopdl6kfsgwes0oaa8xmtqk5fid3pqgzful9wgrj9b1yfkurymldwo5xon8cyty7tpt0v30nk38teb6ctid971iuqhf3piyakgjvgvvvej9c3ssket47055uy6t5ncg88qid7cyg00c1osll0i7o8c5t8cshdg82bp6fqmdw1l3i4zsud1l3vr3ul0wiuu2jcgn3guhoieea2slaohvm4dswy2vbiuz7u2hqre6mgjnhqn731gm88i5s654wmbid7vsw15z6qdf1457g0jhiam1dn6dlpi7ww4ca6gtaeelxc4mzu1ls52nqkkffsnkkw0j2n30odtimh8xk50dm4zpgmmamng1qro13deu40prw5j13jh2r9gdunxow15mftd7wt381gqwoa24bjl46cac7z1oogzoawh0bt430xw3dwvmlll7ljt45rwl490t8k91wqtnfomyk3urji8q7v6pkay5wnx37xermpqv1e9kpt0knci25dh5e8xgtd7xpsmpiwznkel38b5jjnrl8j10abs6qyovionha24d6ua9bpd9s8q7rhd0mnv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'c900ryfv0kya81uwbjanuo8anga1lmvdjywjim6kmky8aekdkd',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'mzt6ovqdg4srzaz20ib1',
                channelHash: 'mbghan8tmjsla6czbkrkovqc2iw88tvuf23px0he',
                channelParty: 'vhg74e6rx5tut6uyrbh2fr6vpq892hy6jnfokcbhxbxq8nntx0hu8unnmtv8teevbvlv5pa7uhdtxpe227kx8idsp9dufuj0ozx9xma07tb90m50789j7yv44bniza6vld97wvfagy34sa1c1stn23nwubdc90fk',
                channelComponent: 'l0ey6z0xzun0qj4xt4qw1a5sis6hbwxh11lorrllsco4cyb1prw5he9eokg4nov54wpy1a5gbsw08uucgg93yz0vci95chd90wo4fa8svfk0top91gzqhnztarmhcp03qk2scj097ujq8aud3y7yoru1t5jsv8eo',
                channelName: '7vcf434n7pikqsof920g1lo30naxayw1bryhol14t2hqejzazjp7v582qjtbxgb55abru25jsugv85yfyehbs333yq7ddrtdzcefguyqklr9etm8txklasp1ub6jgb900z806yv95ma0nnbf0f1yqdxqo1wruw7x',
                flowHash: 'r3fybwc2qmi9v1vtrm1yde79rav4dvrgxcm7f8det',
                flowParty: 'eaydi7zzezh9txoviy91fx3q5jwkpi2m9vkb2n10al5odas36grb6q4obg4kb0gddkajammyvgp3t0rpezwhqcgajp3zd03h2zzhzabwx4ez78rmixf7g6sw9rvuos974yrxu109ur8tkoc5mbvwj3m8dilgc46m',
                flowComponent: 'g7qjnler2rtkkstzoq0wzpupufufksuh3qjtuenvim1f6qx59eyi0b7pz53acwjdv2s9l4g5gw4h9h0a3lts60jdaoaeugjp2rvf9rn2xyon8usfd7laze5x3pt7ykuikxupr088rs7d9r4h9ulrltr960rvpml2',
                flowInterfaceName: '7pyby5x2k6714wam1orcvqkcd1r02yvyx7rgjwtnav4jlo5fmkrjmwpy8m4bdtcir1cigkyue9jawya2tlh2k6sxu41bw5j9sbuowrsnk1s0xbuejklfmxnsl3izwitq75yok9f6o6antrojlrqotj404b8kaljl',
                flowInterfaceNamespace: 'rgjwfrcrvx2dz97rwfdres1o1z853b5caneya0ssmk3b2xeakz2p1iw7zwm2msewvcp17c3i4sye9dn98cd9wtprwutzqv018u9uep456y7xjrgvc2bm03m88asz0bmn3i8qzeq1xgrhbx28ce3cjjw8n48rh98h',
                version: 'r9snky1gdexdrx9j5vr3',
                parameterGroup: 'pkeik0nfhh3hi6x11yj809f2977336mbpno6xm7rlo5pz73355zhfcd6jlyki55avw0yvcbfpw5j1gih5u0amn40jlzc4ci0nf8dh22mgxg6e544apu13zb1k8eoe2gne9pqpyxzvye1yyltyur09ay1p7my35kgyjx3vqbyzfim037wv8c9h8478cjrnceq8ho94hm0yx81d7c4xrc4fq4veaa0ligyesmutj11tdmzyap7528pgzwc44rycox',
                name: 'o2ngay677ibaohorugu4il8iy8lvs0a9urqwot3088vlhru457yuxlcbksy10ep1a1eq1ssucflf4l6mbpqe68xp0vdmbu6caisvgeu91bfhz9ehc2hevbfxuh2qa8sszr4fkzf6kw8q499kqgfvfh0p15polc6bpyu5whvkwynu9py7dogzb959sveiypn69ho29vtz6qyec66nvii6aja5lqnl3u04vlhio0q29egoy70stk235a24p8u31gemtqbyav0orwlioqn1mrdu93eox4hp2k5j56d6gdnb2a9dgb28ybud270zctqwyn7h',
                parameterName: 'ol305lw4jr132ei61c6bsc0msu3lruwfxlyqomqpj2kj1dyh9hmd7095na8kzruk29h4aceqnubz99msseveo5ijn7g1401puvgd3run1sp1d2e98kabrkvzyvsosfmxakjz6p6yq61uctixaf7wtvy66oadcur0ar7raqnxj18pc7j2cz0hfxt866030gu2cyiafyv4u5xmtibc21sf8an4smo4k5sq62dcjpsyxmgfzxlkpfy77vu7yuwd2zpzp5zu9e6svm6dg7aeksqwrp3h942a5frzg48uf59lbd6ka1zsxgr47s7ubj2xb7ig',
                parameterValue: 'ipaomisz0uhpls020xtf2y4xtc8q3a5xii8l1lkfavb5n6lgoxagf7yt9r48ywbj35jnl2drdlmzuthj6r4pvj3xhgze22c8bys2u2ukzjquy47x4fwfq42xih6amhk1x038te6nv1wrfmqtqkrxlba6m2ggvubdrjkwjjbllg2h02jlzb2hyyy2qe64wll3ada5qy2i6ot3tl06bhvozynrpwvdkxwhkwpouh5asmia5me3dkd98lh0krmqfr8xq0yfv2b4e9lhl1tywu2zaasnz0ss9kvj6wa2rvpmexzzoga2o27gicdhf60zt6svymus6g5t7a1cbk0te6jpzf3yh3ng7c3hjo3k8p8zv01fny9nlpnbxyibxsfebnu4yrh9divfzto5e82mkmgkd5gtbz0d21vwusr6ukjltxw13cd4jvy54d8406z2oi10z2ucrge1m8ybztr60ihvo3zxk1rflwa17cy0v2ylvwp939mjrxdennj0v9i0vv4kb3ey2sybpcjmvp613qcdrpey1y8upg3aril1rcv5vbxpv2gi7xsm790mp9pjv0l5nl0x8naybwg7etqskq3ncqilqqu4dozttoivhldhqbs0vi5ch4uix4ymcdv8wskh6zsnjcu79cu18t99noo13lxrwg8ehp063bdz0f3y5100tyb39hefqrtj5vkm8ieehbj83r0h6gfe8qda3cj41e3rxz58vu0swanm8e0n1zb930iffcwbwghg4hen1a9s1ha3y48hjd03am30c58coxm4w5cvjajokumkd5rgzkv9q735sqers05mj3nj6fa0l97h40cmjx3vf50osarxe5k5879ysz2z29v48ip9mqhnzoovhv5mj859i1e706802e678m0w89ll2g1xvnjb7169e5uemwnes2og8ehkih5cndz2mu69nr9qvmzxjtlt57ajq9pj7e9ub22mlxj0pi8d21t82r8cc113ytatzwmev32zdgxsdqfssokw3b77',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'dn9hqdvp2g60p9i7g9hv6xnhzn707i6l0ywhn5yraugekilfzic',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'ymf0o119z8v5eaif38u9',
                channelHash: 'l08uaalg7quf50ezzh2wnykdykwnmz7e91xwk9yh',
                channelParty: '25sfba0tfua7arwulki8ks7cfa6xaocqaffjrnd7xmay0q8n2a8hp1c26o3ee8invemhxz7w4m184kgy8y1c2ctjdx5czreadyw7qj6rssls5b9xkgfdf166wpfv4nq0qdful3hckzgvmk7tucmw65h24i0e8po6',
                channelComponent: '437e47gzii2k5p62nwo977lb3xpam17f3vii4rcqrwa357jthlkf3dvtj1rmlkabrrmi5q2ukx1b5d8ihdauqj1n32ofcuu97xsf7lzvkn06nqby4wwqy32mlnc1u3432g1b4jwpm1dfpy8fqb4otwhi6cd7gahb',
                channelName: 'isvo3k2rau1sr62s5enj3empjbof37w2dnm4vk03v27tmknobnxqmaqhgy9mc5n8vkxyinyff5xq1ovqs8ytpisyvm0csn8hvm4wbp11uimhu1t7kdkueo6vwlh57196fcidwhgxa91mxi6rpfq6lrh8z3rksj5o',
                flowHash: 'm29qv98rjk0n6uy3bgkz9z87az9jlmn3wbjcwjfs',
                flowParty: 'xl8n215zwi236bc1wk8ihw8muv07joucjqakl6wjxahem1plor9ngb18hykxl7bljinnshwknssr7ifxse0eiefclttpd2iyls6agnlq84595smztbvy2c4t0hgpjbc5vjddv28hbbi93z05i6w9atgifk90gkcc',
                flowComponent: 'ydroqtt1q7gq1xjl6v3y9behjluybeq5gbjajy1jltmf7swcp7j0c7djztynbrnrleo62siyqsjbvvmjy1seqkop5qkm11b3mxp4ngr8q5n0gjh9brcy0r8wskpxawdxbt3iujkm4ii97q00sk76m4vmzv0q0dt9',
                flowInterfaceName: '2e0mx9sglul1a7ly73p7v69xhdrhnd91hnfxd4v0551h88qfmaibbxm5vzaonc0206j9fnty7us9c3mfb9fsj578kaensmogfumgp29g5ullmn35hvpl5vercprgukiv57tehbfmqxd71hmuam5nuv54rrkqybdj',
                flowInterfaceNamespace: 'j99qugzx5cji0q3khv95u65ulb3jydzenj1ebgdewuwg3wgq8oa92yzefnca8w6el8v8q80rbz0nnf7ne49qdeydy8uzjic9qt06h4l70e6ozcdhoprx0h9prs3zkg7hogaz1e4hyejsjwokul940kmn6b31vdac',
                version: '3hann9qp8fiwuxxhu4gs',
                parameterGroup: '90lqh85hgw4ewr6q6tejqy6o0q5fxtijwg961vhsxe4uzcjsda9jko3j9y5jhl5v1rv3j36m0l2yxffdimzkoirkr9qj0j1dxs8ipk6txmn76lfdhzspcgjn60my2sloizys6uteb2loxovfoqsly7iadr1dtc6c2cd56ncw6tq7sl1ons0vmoeajc58tdza8iw6c3d2a0mnls9xbex5u6xkrk3v2fc9n77it6p9u8xp7iro5ahuii19j318fa6',
                name: '72gl0yksw19qzlqmyhxeafodj28wpws22m4wo7et29jxualvg96vmdmhco2g89v2y2cn4m6s202m1u5a92ps0gbk3s0de9mp0490ozxjneook4ufool7qdo8vsdeipatqam3jgty2gdv6ju789rvug9qsu6881nt1lqjvhwb9qxb7sposyl8uujnti1wlv2we6udqd0giji5obxrzvromlujtjztwvz2x9w3hhcfyln0nqrngekjhhk6w1zeenfvoa3q5svuchebds6g37lpqinqftcy8u8w9gwqtxju55094o1aqe3gdyzihrux05bh',
                parameterName: 'js34basrfrmo5lnbqbep9v824prsa0pus9c987ffi9v67ab2c8zk36u2zyh7kmwtieigaixyfgh5j3smxo1dbvsa5j7vg7pm4k680zcdwwplv1pfquyzb7uqvkmgep94ejbh1l0pref221sb2k836dmhkfq6obmh5fhv35ommjrbgoi3cvamf8r3f1tcvcc47vc49rz69mbxch4jfiroxvorrj38cz1uvxgsrrsmbwtlkmp4s3rf6n1ta98zf4zd8195i29lgh7w9tm4yaak8bypt82u986ydxqet2ed1szgmlre6tr38mwltvnwuxyr',
                parameterValue: '8950yw6eqhoilxcc1l0bo6kezkcqpdizklm93oo3futxt31xongaatczgrxv8trfshlzfqyv7tq6erytgge7jgnx618h6rlj9fy8nropj3xvoohdx5gvq3j64uxrgl4rambtc7kb6fec235009urt13eebmyr8s5cld7gl9l3a9903hc7l5p0n6704hkmzzbunfrwcnq759z18iqttsinpwfr5qm24id0eeojopr133q61z1h2qmy1i7j1kouln71dqcfrcuz3g1lv6uwapvajzft2lsf0tltj60ga3764xir2xxzgphg5m9ndi3hsdcg1q6w1ook9ez1io2rp89eejfzjtdpmmuvesc66di99gfvw6myor9bk0bz3687td9itacuix7cbw2t9ulayqx18fyt8vrwcdx6qvvavezpxl6vsbjchx57stz389o5qoesapfutbu8by5ttymehzaaad3ht3ksqtwijid4hfmzzvyq2atkcr987zzyo2xksa64pk9f39itvbkjpy4dowf3dofdzomlc1j41ybeem0gyeq6c90k498zpy6jw9sq3ju0adueu664wp62w7w0cj1atks9ze91qqntrxqp8xqrnxtd0g4sn6i2a3vguhi1h8fjxpfy5zz0ky45z5n3wtfzq07tsft35urohzbdo40khyvbudxpllvr66ba2ne73iwq68afpt5540vst8v0wmei80qbzcs1zsb806z3izu25xw1xxltjwn5o662rnz8hqe9ygzhxgunej48wyvyecylnglqe0axwdkwu6qev0zj78l01fe109z747xy6e8i8exmp739b8zviyztpmz9zjneyhp3ktbtkyk3hulw0yez0tx37gi2s8spla61yr46en4kf6ju9211g2nsh9zpvz9bcocvddbe5gfhzv0d614k8d7ie2tljh3545s6vooaxldyyxhpnuwjsqdk0u9g1dhltkjfa2plqcbijcu7xhtw63wae8wwf40tdtyzys0le5m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '94jfdaraifiqn6qmiqiccxxcwcp14lequk99abduyo5wt28iin',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'z2t4s7e40h29bs5et2exd',
                channelHash: 'k0ik3n66n0qf0vptkvwnmrwz92ybav7hj1ob8b3e',
                channelParty: 'pgcilzk14ipkw9tz2qnnqzlw3b22iwz3hwsmxkdlwijb16xbdy92meihaiqdz4t8drwykn3ktfhly7zef6gxhhfprv5lddtepchjjql3xhu5qaguai7hzgsrg9z7b4xxxft6z1k5tk6t5n14t055pzxmpnoq245a',
                channelComponent: 'winigv0ne2xeqg2gow090yyx3znmjfx82ftky0s29gicx3gxiv8jtqxrd82c50kadcr7llz7zh1j3fzdohb9mb6muozhs1vtk72k0gty2pw5mj42aedf34p9vqvrqytp6r9b30v9sz92p9ixj9dc6zdd3ppmutho',
                channelName: 'wxp4miq9grmajrt8takyo2luctqr1wemzcq9e5ctj23g4wysyc0jvpk0m94m1ex8tcts3zam9f8dn4vesjarn7y7o5ia05mtunetaluz10oba1n5kipq23zl0p3rmgnvhwlz6us0j4k2f5guxpc5ep8757tguwn4',
                flowHash: '2wrgqzjbf0xtsixcadjaqnzya66kfbyv16nejk7a',
                flowParty: 'tvzc0tk2z8qzqwst3g8nmyvz3ec1cmh90iqcvp31zjeszqesgnx1oxp6rgdgkibtaplg06nmxs3pqm7i2wo8yh3vv1esffckzttpko0tiw5dbzvjxsjevn3ff2nzqov23nz1c4m2l75d9qiac1blwwlpkytm67pu',
                flowComponent: '7748s4e47lxceahi2ddu83ckgy2i66x4ez40v1f5y1cb8fji8yg932sdzonfax3sodts4su0i9o8lu0sg5ld6aec9ki9hcq02fob3d92f2f8ee6xghdros5ny0uzxocscvmayta1jmikpqjx4266uw937ca53zpy',
                flowInterfaceName: 'ebasv92e1nwc5x0mlza6z8nhj29nyg9aku6mc29jimghi1mr0abtbhcjf7t658f4ljfg8xqqj97rhcxmpzlfx9md33v2vqiniyicpx0ppqz0hg2xmvdyrx359s3y3ra0r1p2sqiifybr0fpc174cdfawqf5y7da8',
                flowInterfaceNamespace: 'm5eukaza1qd7ymboij0vj1adpab7yu30ttnycg0l0fxfu0io3goxo3wevx04782in3f5d5owymduht0fw1k875n0xjfmrhe2mj4z53fj3drjsk7jjxus97rv0zbhp749kxas46wt8upzbma59wogth9tkb3zan6y',
                version: '4dn3l8fxaf6un98urqx5',
                parameterGroup: 'mgpv1e79pddyurjh1089g3dupxq3zdipjwt3rzb5lml1gzk8jpvipv35c7ik6h8upfxz9psm3hgcujsh44qg2w2zxokn0e8nzz4xtb4qdo2hv8txywxr2lwtxr9k1ulgh9f6pbb7dv5cqootz8qyfbpawcdep11dt89oevau9ongnqlz1izwsbzwab2pq42qfislqryld2ctu48wstd9034vzfc7ffjhlt4og7c7oyi4hla5icpf6fak261cbh1',
                name: 'rch8o6wpd5osht199zd5ip34pwgb5a4hggogi53c6glzf8pbfziiq3bqh4cnqltf1vqip334zk19mayk6d1ygbi8h8p952bhxunhloz30c531e6td4sls7fw43tx5jtspu9cavsq1nq5uo12v0jhml76yf1ag7ktf423dyb7h5a39nr5agw9hhj1grdyuoh8l2ac162fulbporu6zdmukpnn4u3pgngdz0n8jeuot1w1uwnayvmfeupg0yl7unrdxolt9cvycm0ru4piap3y2jkd4mqu7q8su0usyhzpqwvhoqwy6yafnl1qv6sz0l5o',
                parameterName: 'avcr2l4wyim9qdlxjmgbnroykar3rc3nmtaqlm7h8b1vnvwrl3qn5elcypbmd19gediit9vlcjqqclopp9yg2h16qfmf0qniozc9dh58q6g0abw2wb9w839moe9zxuuam9p3wl1rnkyyzo32oa5lszlxt8trrkk2ynqw8fyu6178gnvohgc8338e6d4l1e8t5jq0z53d8oeapxl48oj24o60d2xghdpbvro7h81sqgsnkhk4shfagiu0yowkd7ksq9806yepdxep1kdlkhvpkuwdtsiuk8n2nshuxtzq41gfno6fzaj7j5nqr7pqcusy',
                parameterValue: 'n8jjakapwto11hj8m3ybtcxfkd9z91609he70eyl780d9sg88gubwpvhezjlk86j7off157fk6qz63y9f7ec0ra085m1v7kcpmfj24eor1fqftqfbrgm8kgucsg2n4qrgjgutadck2y60rhno4c35u70cxss4w8duys8wrw0zy9xkijrkkvy4pf7k86msi5ncsvrn2mtqcnue4bebwir8rh86yar0qdfv8iqowugn7etzoox139i73wdtrz2hs2fohcv4n1wqpp0bgjhrplhaoxmo5lxis6b0s4m1gt3bh8sd13w9t5klloqpaziu1ltgi22o0f54mkjjcao0ramki5ts7ooqs1lhm2y74ag0ezf8qmzkg3lhi3f0qpo15tjpv9io3wliamvs5mtb1axi9kuezrnvx3wico1gyroliufl7xtihho85le0ntwxec0brb93v2b0bwwiwo5g6xq7jr5qo1xtrlzz12roe4h9gval57udtsd29w2un2o6osk8awmomisdfk0ljsu57ji0pcdj6zq3jvcnnoczs01px0vsvpps7odkdwby1dhgga5nmwkmzlpys5x3qvzp9psjm8j8lp5dax7c09e6pehg8alx4vk0m2tf8bko72nsnflial36mjoxdvwpm1cly2jlwl142lxiih817a98d5f58xe2ki7kkgjzp9225glwukagnodbh0dqkydaltjb3t6irfuj54jixnvmcysgs0dtujfkohz82rfqgvnno0c71fu0d4h7j6uod8ccb76oergtvos8vwpvl4pc6ytqmjy6a25uw7go7ofa8w8i6hs3x4m6oi92wq4g1lhspnt0lbo20au8s9p2fndynfmqmbg56d7owvf5hl9ary0v0bj4bi8v51a566nw4qd7yt2gnk84tgh95dg83ioocphd45gpbdk24e8r4pdi6481stea6pvme1d3luedwuu3w9f4m68ro2ezyprjufnrfh33kmy2rjcmgjj5yku8fnd7pgehxi0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'ypjuqoxnh46ojvrdlbool0rvit1iydcsquiimpzp6dxz8hn4ql',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'iuycroi1vvu29r2iqc6o',
                channelHash: 'lu8abd3ayltownik5chvt9gspt3ipdkztqv6kg47',
                channelParty: 'y51sv75anisvdxqmqo8o0druz5jwnalksc1ckmcgho9yuutsnv3hj1636d19qu26xorvpgvbchez8rk4pjptpljgukgohk683ofyt14l872gccwt15fuf6h1s6horu1v0ug860fg0q3ax39d6xrlayiflbcle5wrs',
                channelComponent: '5yn4waoi2d3d33spcyk75xxmeb3ddw8kqe46ftaj6atnaumaysr6g1b08cx88fkakb16tbe8p3zx0ka6jgoothgsoleu5wrh5s0qfsi3w6k1uv07903ejavmfh97l314rl4ao1fhdkc7ras6d4wem0oq9uf79ago',
                channelName: '2eo7iclwmpof06br3wakutwsugis1b4qtu5aets0ym7djwicoksztsxqofe7dzxktd56ht30bjzry1j8yt3vhin5cpr3o2m8zwiwym9gwjchyf5yjrecg9bbyidq0jxih0kbttfwa8x9n9z0gcoqhhmsahrhf4ba',
                flowHash: 'ffeisuu4jw2ac7c9lwub1r341dsrxn0n9akmhcv5',
                flowParty: 'qph41xidz73l3cvz70z79n3r3za0yga46yapmhlqapig8pg4n63wbu53qq3x7qrbbhxs7dfoj7ckco8w26ad2oa4v64b1xfqyturikkggcpr1ppnaz0mmwwkejblh80yp5iqtew43dn7ylsfdjc43786pb2wmrj6',
                flowComponent: 'lqe63wf57ljhm7ntdl036iu3ba9tc7hi0cqzie33hpfzwil783qkahojw2my7s9ierlx9wjehdwagqmk0ddv7w9gne4q6qh0oavwgfhhb34cvneh9dbxlgmf1de0rwdiipvnr1bfi8224ndz30l2fb58agi6a4yr',
                flowInterfaceName: 'w3edluwzv14kar1er7exdhmcdrq6thhj36829dfzk5s1cbyjrhq7q5v1um6uxvhfgzp4q73j3d8t3cuz15z3jmj9qcs1ran6lgvwtm7jfs4r8yfaorrszwy2zgctooirsktlx84tf4zv5ho4axu5r7m9u9nao92v',
                flowInterfaceNamespace: 'z48hawevwag6vxwfpiltg2afdvl6rknnav416qh4fm6mfr9p20tyer7mftmiknyf9l504j1f42j70a41soq1pefkxwk1p28ogmvzhggg8pegwhxik45grsdhqleuiq0wnyu6wlvj73iuk1xe4sm091txa6yn763g',
                version: 'wkxz7721ibunfkoi8796',
                parameterGroup: 'lk0wwmkhjpgqd0np0xbw3gonviiq3w14tf104cfef3pawao23j87v4t4l4mwlviv1i0ijqdkzfk6domo0k00e7l1abp6jj2mzr0js1ugc5q73g30y75859tv0720v4jmuuwd80ppw39cqse9zgafrys1z2c3i80y9g3a5jtdoe0p56k4udqc6gqyc74pkrvxg589uj2nkk4uif3y2v7d8j1ont9jdpf4ndg9vwbq0n0iwwog29rk7ivmvtxd2uf',
                name: 'gssy1j40g3uphh1fdjjlzzh3dk7zen1yf5zixofq5wxwpf81q2zhk1lei0rqwz1fiv9oappy5qd1ll3pnoyj68fvlffx1szrjv45mz22pityijlm041x3cjb306blovpap56udjdhshazg92xtvth8q1f7uknki7ankuj0vmrxzsol0pd0qd3ua0ravctwfc3zqtwy99e3yx4mt48k58mq4mkk65ma76ctqj1wvwoy0g8frt8mjleym5w5oh89on8bsnxsigbx3imi0bu4sbqirbrwhje8e7xgz9d6kxvdrytpd2aczfs04u7mgf287h',
                parameterName: '8nol6kl17wgobqr2jon49ahqx2cdpr6gkzuncpscxzhk5xgh2yjvg93flfocaraq8q628d8253phw85n85lhnj3ofiusczyii9uh11i8wf0nsra2j3oot9ld98jxfij9tue9uuhdofwcztf8os7w5tbqst4v94zdm3g7ewchj8mnbjhx4y4fztxlquud8wow02rf3dmbaaljhbswq0bg53kcubzcbhdcu90ggzmktxnfqi3bovguvs3l6edzasa7g6mlu64pffosw623frgpaoc3jvxofivs8da4zb5wckmllar2gwx3m7iteeap2az7',
                parameterValue: 'a0r70u3o9zh4ojlrzg8fqyv7c7uroysaqxt607budh3gc8icmmntf20saswhl9rfh6z1dzi2txguejpvzpgfzu17fef0a4zt1vrfq14rd88jdvnhls4gp1j6hy8keabig9dapk49hwnwr53qvavdooxfukdutnxfqw7j6nosxj9rxl7nxak2unl5lizlda1rkt9vr68i3ibd15mab25n4557yq967vnpre87w07dgmqbz7lv3tc0ei6n1pscfe0zmu4t1aek2etyosx8tliignkruenvndo980vm67wn2nwxxs291xwi9deyq1jedw3sjyic0m9g1y9jd7ufio7n89i3gzrqdkvrzgt88wg70yhnxx07rqkk9cx464bfj9qo5jpubzsg0vnw6saesbftwgdew28rv5kkhtu3wtzd31b4fklmpxeeqoqcvrclv9sdn521gdeta5zbuh9cxwe2uxoqlv0ii5c9n5hmoni7adcbmgv3q78flq94dwjznksbxv3nk52gsrtflr7u5zpanxcoxfbszprzx393iv3wum4hupttqqvk3kiwe9bcjnnbp7bxfj8jbrjj21db82avkbe6khlyd57w5uurzf2bzhdn93x8x60tum8hiis9i6n29gfa9ui3arz24d1lpcl56f64bui7br7br2ilf2klmegq9okaox2npp83nxc419fepeaj978xw1b5p972kmqzgiy6xafqzu34oslaob46mhjpvukbx1rr5uo186scbx7pehpzgu9r4jdfv5hiwcwhejcgs8fnv5us1868f95t3nx98jt874ry02hgw9up93cwjiafd5m2uax24qknzuem1mict0ncjzaoekubjhwzg89ry3rhzz4h2rxvird6r434i51ek70qvfdu8b4vt1qs5brwuc4t5ywgm2l646qpu1b8q2fwnxnrgpode59crk0w3zicpxjeec5suqvd5aoa9dux9m7ri3pvd693wcx96uozv4kijqyo7nbfd4xc2i4x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'thidvzsyrxxnmuthypdrl0dxg4ia3kfc4gpqre23qappe0ozny',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'k5s4f0htqq1s59gqj63u',
                channelHash: 'fjnmx0zh39mbjm0ydfpaq5b3xnwzj482srw4hooj',
                channelParty: '154oe8nbndl4lqqjm7rfrxr1gzasez716vp093fkztsjnxolyt1f7i6kqxxixqwuhhzygbt12z3q8lf82skjmrddr3l5mwkax14eiqtukbswfm01e3dsmno818u7a5ds2g6qk3yukx4kn4th4g1v3sd4t4waox6x',
                channelComponent: '9qho2xxwxz0zg4l41wkxwghff3vb86qgajevj59ou7rg97wsr66i51e9tsr12xqnt44e57fwu3map1yi52arbr4kp7rdpswh14a4cgmspki47eyge74trcje2hp88vfjvp5xumw3thp2q0qo6h840hqhffsm1sakj',
                channelName: 'y46d109sxl5xpkvcb4urig7tmqt3ejqkb8o9e9t1thgkxri76o7echjrp6keppry3kyy6dhe5ave1dvr5vykf7tjy46vpkknv6nodntcov36wsa4b2ipznj7v0ehb0p42rfzyxke5wwmknfmqj9vyijyx87gcosl',
                flowHash: '1fbg52bh81b5o98gjpl8r7s0n7daxtu1nggkeias',
                flowParty: 'ow792qqm9tk95j05py6r9gztiijmk4qcxrpxh8yfn0zkmyumj7n70ivsxwkj6rd7sx682qi6372tfdwqv04vdg71aalexxhxchnfzajgm6cfe2kcty3hgkgpbsynm6xhmnlrnf1qb9chi7as5gkndoaojv58kc4i',
                flowComponent: '1lc5dd3ko4scps752r7b8p14d1w0r06uq6f44d0wooet4a73fris2yqu9nklngol26vb5j71k4yjjtzrb8bkbsgu2otec8e3gbq1lyuxnsvf857xeila9ss0hpqaraiocxg2p2l1ju8rnwb5i9cu734xsux3l7d5',
                flowInterfaceName: 'k7m5224zdn8df1lymdhud5y0ire80nxvg5k9ohbc2d6cqb8rkm3jey5izuhv9711pd7hi9wcn9bti6eeonwk00jp95qt0hh9sucpjrdyo0xtfziv63aeoxzh5hoiag41apsupir8k6uv563fvonaj14ypjzaapxi',
                flowInterfaceNamespace: 'xuejmt06jx8kc4082pi4nejc56ncaucml7aadaqjxxkcopen3vkfye4bm9j5w6vyno6fprf39mywe5wjjc83y9s0gmruvg0w1quy4jcgb2da0wdq74wguv2ghjuiyasxh1brtisez04ns2edy6lwgukzsqy5ppz3',
                version: 't5xviiuy71towpwkq370',
                parameterGroup: 'iafblrk76xiqvav88a9xlgfw2e0gz4x19hgxizl584asioa5yxelfcko0ig1r2e3tyawh4r72a56soi3h0mi0w8yizfyovdsk1jczjhjf4tlvi7mke3ewfge76606bux26w2l830juonqjgxnvx4vwosqxbcnur4nhov75jmqi7acsfqu4z579wu9nhz99izrxvm6ghg5tywwgi1oiujac6s73n4v6zpjlm1kgawgfgpeavgpf88vff6qdabsvx',
                name: 'hvfyn4jdoka6c2ysgu92876t65ic1vaxs5hk9vuukhdgc4yjd204s69zqw6ps0kayh0u0bkbtiw58c7ydb8jpxbfk5yy6yc0urhf79as1ff89fqg6bdhbzu6412ek4r9fakrqrxbyk2uvyc3bvaxw1ye48vmeme2y925k90t86kvci5oek1i9jufatu9h65znyt1yhr2anqng3jtez28mkf2xg6cfnsquwmoplcfyuh5h1lbubfmwhgyejwepqn3w6ly0guhzhnag4n0qzlu9xg2d0ilzvfjvfa3dqvkh682tqi8rers8sj7m3znoze1',
                parameterName: 'prh2fpwelmqou8wz3hjddbjr7lsnxk22m7j0gf0q0cxmdlq8ac8pvgu2ej70xajk0hj4ijago2agpzma4i0x6v7azyw2pbzcjsf892v23zu19t1bu7zbasq0caplbiosnpaohvyayz8hwr12p3eu40h0zsbe8jncbthygnbkshpib2cwlp7pc7511z2m0yfgf5bshv2076rpyqbjh6ptdfusxkz1j6erowmy6x88616b7n6zq96tkwfuiikf2ziv5w78qdlr0ufype8gfhpdlmeojzxgsi6z7oeix03a0bg7igpw1pwi0z05z6iypeid',
                parameterValue: 'cz3rlsgwub30vazt1g1samwlopjx9cq4nlwglzildjgcb0x61xdpvryvq1or3lame2bdwrcntxp8s6ezqvryllnymvatgv6qdopt13f0jfjo2mb07m8vp3m7eqymyfzf6ghn1ys05820qr5iil2r5gp82m2vhufrcj288ndb8vj8n6tki7gztrl6nlapwu0xknbbgluhc84ehvxtuek0dtyezym8fb1z0ul3bqaidxqb1ql93y82yifkfxfae4krmcaxzkuicghghpfij1p8huo5u9h1s9s7t7qxcy8e22o2q5qm0a5nm6vrf1adv5n0fbr8yp9d4c9p6gt47tf5u5wekzafq0pq6z5i8pdeia8pjzqf6sfa8sc193k77p6vahx3h9vfjfrau8nkcfjwg4vblrvay14hoya76j5tm257pcf2pfy9qd7ffgw6aj2if2yw4du1m0ysaiczcuun4qy0x54u5lodfeehmrgoi1iqfqqwlgju6ec7a6i8x16lkxbmjps41ga31gbxe6pmronwdocmeltelqqjm70qx25dvqz4kapimg1eooghklxqy6yjl63jvi5wbp4mwffex0yj1odq7pe5ujldvjjw6edegpi4p7urjna6ukia8ygx19b0cycoh08jpe8wyk6y7q87845d12yelsgkx6o4gos1xdlyhvz93ewenxm4vipcornt8i87ktbl0kitoybsiz21ezzb29dh2p6l2f3qobvg557zu5z34mbn377py6v0sekzsrbrewwmuu365s9lhi6bqlrjl1cgb5i875np3g7in13oc13k1rislfyfvrvj9u9odfrbd7d9cr343mgaprr77wua7z92umtesnadear1h2n6us0h1b8jz0d7cw4gzqpz7tchzml6s5nopfzo6eik6hv0s2jjhkkf5ev73yiwigai9f3vafo85i18g33iavtc908rgs2y8hf4ulgn4mdve9xevd3lv4lzhb9oymjc3577xs8q6aobrqtnfs51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '8o6qsspx9vzmuorgbfam169b7rxpdbbujdwrfziqh4nysscc18',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: '4gyyhum91h1lddbdc31v',
                channelHash: 'bvjkwrztd4uc3zc06b0qkz2qhwzqtmw0di3hppx4',
                channelParty: 'e567oeau27m8vniswx7nrafxxq3gty90kfn0544kz5utyrc54ikk69evrghuyvjicshr6w3cqgbtarl29bma3xbiah9k9wh1p8t2l007lsv64cuj6872vtzf6nojt6hg9k64i0ta9pztuk3uofhwj1oo4gazxoj3',
                channelComponent: 'bhcbdpombsfl3jcshq5pj47xp0bxavc98e5p24dpdzerdinr5rkwi3kf75ah8ovz9xevfchlh5fg2x5ta40wqqql2q1mpti2omaltx56pkg2k654i5m8l189tgzuijn82dsz3msxyo2vl2idkdm19wt7dlvwnxun',
                channelName: 'ly89bsgvra5qdb223k20de16dmm8cj4of0lqagnfuwyu9dulw1e2pnhtm6m9qqnmci6qzafpq4wiqe4topjo5g1k54jpod34s46csovbw2lho04ik29yj79fm90n3lvom40hso7ourw0tp5jlrh7pup4qmq76njwa',
                flowHash: '6yoni3b33pl7rjx6h0a2tgbuoj8ab3rt4shk5sa1',
                flowParty: 'trfyz1a79tp7yv0j65zunmhx4til128hz72bmgksv655mdc3oamfvi318f0ofcyi8873ksdd5q86b30wlpwz2bydux9vsjeef033qg03yc74zqevkczh8yafqqimhgjmch6w85jun5zhn0d83cfaie44h0e6cjq8',
                flowComponent: 'week4zqmlazib03p4dvg50rsmhf9nhz5mzqtesc3zd3149luh5z9l4lll8gfcao0tcxvoj617j5grqqyhxuz40p8qy52kub32881zkbwfhyamtjz15go2hx25f1hjuaeth104qpqgzyk0kgg7zyz9r4ry4gnma1m',
                flowInterfaceName: 'qkbnq2aaf5b3eo6ru5f1gmra7nd0wjsiscyxjkusb4clijp2i528o4c2w05xdouhwpt0658ou0itljloyzxl1d14z0lyzwyojr11tt8o45quteahc97zf71b8g3ujldyxfbuoa7z5cecyr3ikfvs8ti7ho6s0r37',
                flowInterfaceNamespace: '61smn1ln1ci0c7hxwf61h3hlbhqcguctm4hj7976votkq0om4md6eklog3lupqj45qicsap6x5t49oxt7cy96p78fwkbu6ybml5obgbf0w28utk5vu68vbgnoegunmeoha8ycdhqs7rg08ryuab34x7ene6x9865',
                version: 'asyxe8qpjpt93yu17f2o',
                parameterGroup: 'h6hz8cx9d9sc2lkq6qx4s7pqkkf8ltsbq5j97qkuj4wyup56o6hcs8xyhhg1pm8dtq01q3y1sm057xu8w02z6jrawhubbrfr632y0zspzcgauzwo8x2527xficuh95a6eqdlp87v0i8u0delyxc17y48omqyhe9toegnnem3g0nc1v76qvvh2fwu5050m3sur93w0cqzouuay2pcl8csvbo2au6batohbrndbcvr98tixhf366dct8u0hif8ss3',
                name: 'wf7yd3w9fdze9ya46gbjgsedvlfd1dpxo4u0cn2l3j3egh76wlw474k5w7kvjj72n7cj9swx8ltfmfq2qo0dotd9amf4g2nq8zd07ycoxpdewmmx2nn9keshuo48q7y8k349roawtcqa35wtt4m1pb1gjvvpz6nfp3r6sza4yxvsysmh0zg37e2fpfx23n50i9wzvdevuesrv52oorxse3moq1agu117affw7judcq20tr1zfwk32p98tp8hlx8xhzhr78bhiwr5unlrkugriagq05esngwvlq3giqf0tb7ghpf85e2jx6exyxa0gxah',
                parameterName: 'v9vvrys0kqm006ctyjwj1deehig3xeeenn4fzz6rtl3fy60ax8ej97k1dohjfhc4jtsgmqdccpytkxh3veztcfggu70gqb1n8ny2lsdss9f4t588vp7a3mtkjmqo90bjd2zaa3bczn1iz0ubpwour8aw4y7viou3qadttd33ekbf7raddgwzde40t33ajzhu2y491khs4eryrc62xd8eo25g71oaumi2ufmmjyy2y678ujehssc3r0um88q8hjq5fleg7opwpu5ifmvqhnfsp2n1fcbt5ez7g1knps9yckkyvlfkfkyezipfq10r05vz',
                parameterValue: 'twgr76ag0g0y96g76n0gngbajkny7p8e94yntkjsi9j6f2i0n8nsbxtindxyfuicckigwusktxc9xu7cgmg95wjts87zulaq7kizajdut36trk25vb2cq785q5dtxsxrd74yhxyhx9artgowhi65h6jjviin3k6ixc6jwazc32ebtif7aqt2cywln6mbw7m5klsutc2ytyik6q7w51cggzlwtkkbdrdi6561bqqcbsrj4jg3jczuo5j1hkcb5owqykgjc909am679oyaj904jq7mxf8qgegm8tv56p61fsi2xso4x51xyhdyxlznl9ypyzenluacxjqyebq3koq52xatf9wr0w44befs5fi9h4bg4s6d8ccxpd0s1j84dnwub9j83ap0xgrgtetlf45s5mq30ux7j3xj2nmokoxhuiyx0atrlym3g2ly6ucb57jgia4zu7po7p3g2dvwdrx41essovt0j85yo7kvyc3adyxwya0bw4fht3g694ftzgjxkjwr4tokx94k9w8103z2p219la5kdwfrg147hwilxkf43w23v9t88nvmrl6z9jc1ne0xomwak7071jav15x8r9nbovhyjadj06w3226qdljvvsg3f9d0xi0c51ey2oqjgyb25fh98i0y2fngvakamk2c4odcxw0amsmy5n47kaq4rwea5l3vl01kcseslk9p20sxyrlois3hwft5tey7egsdj28lyv3b5siz3fpg510cqzodxspjornn7gdooq05b9yn21i05znyk8bqltc6v493intims7ftu4evr9j3yy8jp7n8tz3095gszv3gqgw5jisf7kyykcokmr9rlkg8r6l4h8f9p07zup83arrdd73ptwc5pxxdburru4zmx19u5vom6hdgfhyd04mr352oumgzmq8mzm9m8dn7xeyxuf5kh6c5o1pzuunq3upfrkq7yo8nwn1noiy7jg1brvis1jpbfuutjed0ksqc16rozqp9rtjxvuhx4jgmgsoylog',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'wr4u0zdilh6dnzmaa6eaizcnl6r0vt74opwg5gixqpy5cqrl71',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'j5bbiuif5oe9oe2m54an',
                channelHash: 'ocvshng1mv3b0gyrqx0dy2h1dsh3ewiiwpc6ivhh',
                channelParty: 'rrju0rq4sk22ey41dxpe4k3tj5j7e9p365b97y8ndlp8hshv54tyrcuc3p24h415wow6eu8pw4c76q3yar3ka6xsee1nehxqkt3vndqj2rfh6zlhuu4rzv7frzclo8s7mnptkz1cgphilqdpvsvap66dsmxouhmc',
                channelComponent: 'z3xc2lenlcifsdrafmfc2xbsefwosuu8civcbllut95lnkit3a1wt3zs827pz9w1khsmx77yjhvjq4w9t1dj3g4jwv8lk6nujf75fg77yfe0ho2pdsst3gtjzcp5nrh9r4bg990x51bkj7h8bdike5qb2srzicsa',
                channelName: 'tidn0t4s11kh3jcc9t7fze5e6awtlmi7idnc7fkbvpqujcnq7f5ykvl1gax1brof882otap6j2eopo5ry3l03wv464lmmmguw570s06atygmn53oludjhtwo3n1f16mlbukpxnwvhlk2s5id13303h85owrqphra',
                flowHash: 'hofjdenu5yxfdv4ju6xas779pbcpu13ucklblzbv',
                flowParty: 'ovnfd3807pmj8razc778gmiht89waypnewi5xgklenqttvoob1tzfonjffp0wzi9hbsclmhao803ixuz74ofw4z9ncn5v78f20hw34oqpekmns22t6wv0j6s7oontgvv7cwd4vr5g5axp3lckulguqiqrpezxic3o',
                flowComponent: 'c4vaxwkdbz21w62kif1cx4davhop9mmw63oc978jv48y3tkinidhp4ndtjkvys5ax95sbvf7r2dmkzc50f8kmkh3r57hi7a5apecdxa3g5bpninhmz3bg2hu2m17ba28h2o3l4yan1e136c9kgvb6mc4po42n88u',
                flowInterfaceName: 's8uqcsni2n7l5xyprt9niln5d20ipe6vq6rceyjug2gwsk628gqbpwn7voqslvo1g08ybhbyh611t9qs1egjo84c17ejzn6or8vu8edgga6lydiox5rr49ig7mwkosizutcipobyu44den0f6hzxo5bt3k83ez3a',
                flowInterfaceNamespace: 'ietxogw4f1mo5xfaxdse06vky1yxy1slqg5go752hfx8pgpe04iq6id3vils5s2lr61lqq44qbg1mjr6i65v61t79p1725yndrm8vw2khzar3dfoccc2yu8hf83xuqsxlx2rdtcu8vaaz6abax1g5rfiapir87h4',
                version: 'x5vjc82y1ixh8hcdcr20',
                parameterGroup: '8bdzfc59hvzzl4dm1z8b1fjrxqgx9x155rdugmiy8g9r0rvhv11ea16vswlswa4yyjvfp6p2pkbvdmgwkj7wq0l41jx4xb0n8jkifapo8qb5swjwzdm9lrg71aa3mpp8vvh827t8g4zkfh0ybnrpl7aaroycicmh851lren08b8p5du4kn7ceqzi65s5fep9g7fu9so96r0qsbg1niaha2l0jp6bypakkzrmorix2ewzn2exfpqhcsn0u3wziwh',
                name: 'c36adkcu9y816qfmlr501opz4zizwut4dxl0kmtjatqfcvepjqiiiy63v9gxtcqaob6zirt68eh3gk2dlai8cey3igjv0n1wbzhynif309n44u4tfci7j6dv2y6rvpnmebfg47w1ssxje380sblkevkl7zjt0cmulf2is720zib3ptuumdqm294651epbkdfo7dxpod96n5mcqmraqn56d4hfcmsykjathhwho54fdc2kv48oocy5qbsh9pgsd2ozn1y0os0hebyzykk47dl3edfwq8gexjew8volbt3j733wvw5uftdbngltvrgkd76',
                parameterName: '9gk4hnp1vlgxa5gx10zc1qw4cdno60w3zdy0trqdbrcjx9gpxmdb5jv1f3y0f623m3oiyyne7yqguaajg8i7k05d53es2aiuy2l2cgqu0nyeeka405aj292wblu9urxadyru1hbojy2cjz8idkprnni57w3314mm3du9atixkgkuo6p9jnjwf0ap0fogswyk3h4u4lavc17uqgo0vb199jd9c5yhhymplp6mnxwtft3xkzphpvbrpc2n6s6ad1ptdgly5pldn4unw6njirz3xxxzjhewyvwaowdma5e28wb7dwua7czyc5a28ti14orj',
                parameterValue: '57d818u9jeu4rqx1a5519wpezxmoi7vcucuiwnk1wukv8kwiptwfmy6wzgqpw3pdozcel390xzr2jpg59jh4it8k1qnmouywxd2s6fg3fkrbf2dclus3uvjosek0zna5jsmbcswlp2x7vex8obo6lajpxleyzml1mx3sldrd5mxdyktl90378j3h6e2zf89im4oloojhk7ks3tgk1aealceygvujy4at32ix7peij106gd4k79ksv8ckt3w9cefwhyvzubmbiwmkenryp89tugn04lbz37bbmzcrdx4x105sy73ythxpcle5ldlmbdf2xqzytckd3nuz9n6d6dzi2yao1njg5fbf1sjohcw7t6mm44bd1ee8qthy7kmf87pkor2tgdkljxtspwmgks6ixwknz60i5ccxb79higwk12kw87hx0tb55shsuahqgfmzxo7syrl1z2d83n1t6ptzpq8sv2k9wxnsc78ds8rfmzso3u5y5d9u10uxuj08w6xghjg8j69exy4v1rzqwxerfx375geb1yjex3z0sza1zyfj31eaija9v8akck5nt05z3r7c2f1f8wepbkt3jg3wfvdwgnlit1hjflbnn9qaj4y9pdq9v1roff2wux9zoxangneunf4lzxoq421o4xgpn5jujxg82316x0gwplhc4pyyhg14ylbypeg28q4tfn0wt2n3ssf7rdmas82vhegob8ydxqd6xv5jlufca5fhorujmf2erv2wz4k9ocnyz0qw42u4ybfn75xsgekcp7yv9qat4gb5eqrad02jufxaqwhmc5al7wrei550ci9hnvti9d5qel2nr9qklbz3irx8phwx83olugjh1i6d0myhi183v3rlwrehpl7hw0nbi2tda1tcbyy8j3xqaxzt888et5mglqts0wexo01y3c3e6p2xgh6lfc45gmwmqjfn37n8ebpuxhstou8z51wumqvuq1t01o7thchxksowhetgl40zxrcc2lbokb28mpiq16dv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'iqeaj0vgg5bzvb4qpsxjegjhqnr0t7puef7du7xqjlllxwf0vx',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'q04nrdcishjsw2ojb8p8',
                channelHash: '8unjm5y9ev18y8zd700vogrva7dxra86y1gzzj0g',
                channelParty: '01pqtoomfp635h0o8i5n6gep30oatxprj6qpym6ifdtrjj5m3ksv0wyy7x0968c4put6qmghqjl5la2a2nglqsftuzg2jn62xq7f5l2xua3c0zjzxu72ixynnuig7rbbvc8ttr2pyd8svee22gbpw3y3b13ilrfc',
                channelComponent: 'yvxrgc6bcsjxxuywj44mtmfactgkhg03l8ya1d376uc8q6volcys157ev1xppg1wor3d2ewcdbiivtsuoh4qloavbde8rf58hbmipt1lvfm4v52bymmtiehzwsq1w52inqy4eoxjf32w8khvq50xy05s8dznrbkd',
                channelName: '1691dn0rvkt2sntqmaythyib8oxu7mbylg3qojnoczrwq90q5s5tpunk3m9yg6xujullg05s186w5bwmcme2lbosyfdbmz1h9732rphfsie125amx92x867e03qff5til1jz8i7hgcwst55tkkzkg9zyaslc2ucj',
                flowHash: '1vl25atvc7n0f78f82vii2saup8jnm9dfsujpjuh',
                flowParty: 'kjqs8fmo80a9lx8qpufkcuhpbep1aw8p6ul0vmog0cyrf6mxwdzzv8697dzei1fmjw1scin5dviwt6x3fn930lufgco4ri0at0oa99djsjt3m9tejtuqm3bdjpfa7exar56yvvpm12ailmcdvupvxekh290m7u5v',
                flowComponent: 'dzd6zt2plabgsxytyomudawzclvibi90p5bwnt5yeiwnuiy12erj6yudcri66uadif81dx6vgy8ly2bv97zsqmfcft2q36kczlyvm07j00xwcom1hq16nnh1ohld15co34ema3lmzibngvgpwonjtspt68am37tax',
                flowInterfaceName: 'jbb1w6y0z9dpdz4jbxf06b4qqhk1ym84z8icsetja2q99x6slqvjcjuzdxbe19dhs3aqi1qb4scweoqnmkik0b7vmyet6jddvx0t2u1eiyra9t5helh2q2391h2vo59sb17nuz8v6yd99g4f75tkrjrwg756abl8',
                flowInterfaceNamespace: 'ukmos6prh3v75kh6ym0wuhsiotjrjmu7620is6kovz2oimpm48iujd0n1e49ell7rhj2xgyyaenh2fmcqt3fjcsqjgv8sp1mixklec93mr1jpv6g2sh6tvikfxaillp0ntk5cgquqboxz1udi07knpi3dk23x2xb',
                version: 'dvd0lut3w4hg7vm3axwc',
                parameterGroup: 'kj6qhn471leniz1hheedldkvx79i3clzyor990tzypoh9f9leycxjrzbl9wpmbrwrsjyv0wbwe7wzvx07vp4a2j1y1fh6ktppdw71631rnj9jdokiwlha3d1c1z3hl2awzsd01op693szno29o6911cr1ux31vj1nzx5q5qmcc8nvzw7g44vyxwwwxjpsovqcpix2t99z9bb2lv9e43ru0w42lfkk4wndpa1k0g86xibaug5ft8iom4je9b5sgc',
                name: 's72lclgcn3lqqzihir257ize68ife6oj6g3kazbc4vd03qv6ph92tp6bdmiligi34y6oyrrcau108w4wktr6ccllx27534vhhed66cpuezaitrsn2kwq9zfvo2lsv5712wuu7fs5adij0paownya96qfelkh9mp4m2so6jfk7lagb52evh5sns1julmu02on7z1poxxyn5afp1gqbr443ybybiolg970eynrc5toiangnhkwz9kkgtqdnep25300wmx6mpvev7y7mlrdivxjua5ls68at3ah0camymbup7a1kpovdb7hpnwgbpzpfjte',
                parameterName: 'ps0gpqyqp8aoxw3tam0o9b2trakq8gz5ci9exhmluqf63zwglexity5zkv5fw4z01n04nd8sfea1b4v9jt3q0ssayhee696tbz99bbboxkrfxv6z6p7t1r5ov4ly6nnvomf8y72iyy2xnxdobuem4fspa9pksv1l9epqjsicgteesk4bt36jocq4zgjyoj2k8ocl7u0ep6djb9nvv55cvupbmvltvukfi03c4d98h6m49kpo3ayaw8w6kjjgo74c4xfqoi8r1fdr6j4h66aaqblr5ho8n0zrjp9w685xcg4qs17jtv2t1dwne4k6m473',
                parameterValue: 'egvf3nn7pjrlctksm5951i73kjqvq7towx2ys8wfjr3ho185m9rnt14a2t250x1bcdg2qnv6aexe6gh28ziv37jx1x01t3k6ibgadup9qmnj0qjpxik9b3wlqx8qggxddztwucduqlp8mkkbmu9l521ybklz3oljvhy9j379koso21tpwidc4uo023z98eqhme9rqesss2hmuxbzalrlv9p18hkh8x9t06pthqlbt0bl6kuebuex10131ad27e8onxpq69umy7edrzez6rtyajexweky4kt84yg8639aa3bw2qg8mgmv6urtcd46v56grbfl8r8wh36p5u0ullbq1vxxboctdpnaefw3fna162bkxovt7y4jwfzgkklncpitdb0cceek7jhk8db6zhu0y8bnstrylqwrt4kvvck3ejy9ygc6anht1v4vtyy4ln9k5982l8dvzd4yien5x7qg4lf5z4nydpuxqfhki0km4mpuwfzhcv4sew9mfhw0ueh3zczrkq1xbxv7qvfhzhpg64lpaqjj9f0mgpjzwao8kcx6l09n45cnnez9xp8z6qsgs96a6vtsscinx12306anwdhls6t8sab3sl4w2ov02uorlpm5biub2ym7gowbqwfgcnthuxlc8mn3v7vd5l2g7de7c9pldncbn5wb5fl2gpq7v2n979xc7gd5tu5mljmbw59mgb4tgtluq3nllzyovomn4a6s218307jwch10t42n5uew6z8f1h5dsiy3391cahh4ojo6j0yggzi5zmuans017k8a2c0g23lsbndoh7uoro1i7r2c8bvvskn10cb8lsf4k1gjzfhwbiyns2xzpy56ciwmwl3uosp26scz3ex2a1g8ktbqo1b26l1ke825h29ypeirnz6t6vwnb82gz6ifvwypy79lnh2y3fh90ys6f3ctym8xi96b2m8gkw4crxeis9oy79zh0pzcfgo6u37x29z0grtit2c04uwp9mh1hrdwl3p56qi8wgta5s99',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'o8znc0j9xnaoeqzn6ipy0vwgt8pzf3bmepofm62j6upy2u8m5y',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'jh5ka86pzyohx0b0xhta',
                channelHash: 'xjd7jtoobrdcfft7c8bhp50v77ppa6f9gjvvgkc9',
                channelParty: 'o454x56ptb801oe5j08uk09x9s44tlbxvpkil3c3xtx13zmm5ebcb91vjekosk81o8fduwzf27qcjl0qvmtyu022l0tkfo2tw8yzc9c4mld8k26szuga4vqlvvqp5ps7l9rnk1yt393cd29lqnabfqtux31tryy9',
                channelComponent: 'pfx1j11uv7d4djlyxwbf79dzxgcik1plkrl7dthqnmxs6yrf6hjyayo8p269kkn99ql1phrqe5n495wls7ffoe2qvs8geo4n1lzawe94y0y73cu83rwdvkiu0bvtf0gm963mvwn12ozadpbca4qtngy3e1ls1jz9',
                channelName: '6h6ph1a1t9tidejnie0pdidbdyqa6hjnkh6iqqj0ho0i5m8x4xy1e4ex9c2p1c93y83h70lyepdk6qp2awias070wmiytlbsfs00137u5ak1h1jwde2z2ammzwgaufic0cvv80jxwzrxn5tl736tfub4nknh37qo',
                flowHash: 'm5ip1t6tfgvbsds5z2s2hgiwnkidw553cl4wl0tc',
                flowParty: 'xnzl8dxh1ze9kuecku7p0afr6pyvodac41y32017ocvsdlqvzzpcxfy1w6zc8g3a91a8rmljxj9j9gm1h1vpime5n1o9zynjbr7hpjsh6q3hdvixy8xp9y9vy4d1q0vm1bf9i9zjmykmpid3bxp5294bkdy84rdz',
                flowComponent: 'gsf7dpmuzlzp4w5kenev7v4wfi9hs1brqx89q7lvdc8jfmv822eolo8dj0jrrtznakcpfsmwx26dsyxcq2on6crtigwtm33t07cv7sbak1bnulvr8u46oka5vo1yhpmy0untxhdt35tn8ph6xhga2s1xe9czsxqo',
                flowInterfaceName: 'oabc5td5035andvvnhbeaqszqpjjflhzj844fqhysl6k7aum8to00cjmc0qynpkb10menj01mn17fgicwbt1lblmiticq72s97h1fdz33514ex8lxo0479otprg44cu5xjp2e6jbmuxey79nrx61xdm18p7sau7h5',
                flowInterfaceNamespace: 'lnoenyuu5bxxnatqlcfg9eova6fbkwlgwy6eak90ag2gqv2292wbv5374q0l708jqhaq1hd0inr4p8dbl7xs4gxrptfcnjhqzvczuf1e19rqb9jfx7mn3h6dmdalcb5f5khzgfcpnp8uhiqkt7q7ggqjuc9nqa5r',
                version: 'hp3ks31hap220u16al6v',
                parameterGroup: 'nzrj8wzl27jq7b1lejp7hl8ck1atkfyj0f1be52l3ipfrjdo0li5x8fp17174mouywcmvvho9vf6m2jy0apxilp8npsrh93xjc0iyzjm183zs3hj3fnsfuhriu7yivrfbs1f3p5wwbuuy18oiol8l0w4nrn2o2wl31pt3xqcibmnxqhmgwe100i1jozsgus1o8j88bphcru4j8dnaymrc1yrjptqjo87abj0gcwwzq6vt3c3a8hgv7ou9agp1pf',
                name: '4cyexnupzu5y4r3qm2iwogit3f3ftthutxbrtjf7f3bcr5fyhydbs2n894em56feim1wrwfm6j8vsnbawkgaok2t5kijf4jqns5wjwvmbede2lqlbetcs1sx10qzrutbhh36s7ky32zjizfv1g3v93vu5e2m0xsukifmqssthjhwxqfmhozku9lhvittzbytu62zqsec2c20xxru48a43iip4rwjfucgiauti3wpbqy5gn2vi5g6kzjk5ovj6ud9ukjuuucb1c71lzlsyxjlv6e09yrg9ibyr5rry2f2i3rx9t9rznudz7gjyztoy1rr',
                parameterName: 'gb7j92r8nv6erlm5dyt22wa11642thwp3a29p1elrqn2slxib2d5ej4nmmqq57mp9oe4u44f91rmmihr0mc8ay6fk1esshymmdwcmvj7r3jxqrfehlx7nkfe3nfi2lotygc9jmxanwtsyc8aiiiowt10j6giz7y9xirtpbqjyio5xskprkgwseq21ev95kqxmsy80kx35cgqix92p1fq6eh2e1pxn4htmc8rrhigpsa0hdo96co3i9w7z8h6ifvmy2k37zpyqsbg89tx9q9lloadcjh1ppurap8xuq064qus3s4zteeu01xhac7zxiqp',
                parameterValue: 'j9fbg2dbsosvtm585qmpc1jallzuigkdgwrorem44ml4g36x4g6d7mz8xv4k4ecnqbvgd486pcljfhrfenda1acetf8xe7lviumj4pno8u0sbnpdct0b8uthohsv8i000lou6zk1u53oq1dptq6u0pecfb3ojl97jwcs5pn3ao1jk4t6mkb39es8p99v44d6tf5zqtx0gvwax43u8czjdy1pyx4vfnuu2ueumcbir4hscu0g7xvk3zp9u2r6iexep72av471w9vu9p2bmhtiz06td4xeukh4w0n1tyve3ikjoywfmqg3v0wwldvj67ot03tu0aa9l6g93lhj1hu2ffbbkv4wpn1mmd2v7g5ih4cxat2n2mn1338yzi5mvaj31wnlbtj5kb4d4qp9fb3kc7x7eb49mji0n5fz9k9g38e513zdwlnezufeopdsqo29f7ij9vl38a72gq0y7v79dgupypdcjl9rzsm2x1rllo9r1f01z3s3lfm5bfhwfusn5jjaidc35qgpoo3nrsuu6o4733grgbnplk8r79ng3hy086chnl78ow8n0c26x61k6nqo8dgnzwhn7gqyy6dn8o0ke9r48yvx9g8td3zn7e0vdlq5b0d48fzp55e7oa0u7suo98860t3720xgygz8k2hgdqeuwo7ejb103r5dr93tlr7yjl1eirzrlqfupegzlie2c5djpugwsk8u0vk1m9fge0oaypv0jxuf3qqky3u8a98x9bzarqg0aj6o4vdkit92pipxxk783jl5mmm7veyyicd11tdj3sc8ic877cp3mioztg2oxdwg0fwww46aa0lohawqeltnz2nb0kdrug8q6xc8dnkp2pj3r6619r0pgva9ykqqp4v9jyfhy4jyfusqhh9tt6o3bzjb8qhey2wwz03fvj8ilc3g28dw1uxf9g151io2aevfjgzxf18ul1kjb8hjyp2i9gbwdaqn3bpwrumjd7t9gd48532chp373fl31d0li6doafnzuiaz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'ufujs7rc4dceumw6b8c1susroz1x1ektw11mrbyp7ywjt78dvv',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'xbtm5j37rwb7jjrhl7vj',
                channelHash: 'b8nkant8dcgadsgy0u6ckzyzo66pdngpvmhpbkh2',
                channelParty: '5mdc214n1m9ix44x3zk77j1v9irq7dsgookmbfunkkcihr5scecsevjnlubxty9pshyfvgl0i8xl6gxhiv17nznktjo93l16c2ck8ud9xehps0yuxn38jp6mlpm00ftcou51cb2k63m0azi4hjp2cvcqv0zfknzy',
                channelComponent: 'e4p36c48bddsyc3wv442sp0iolyqckgkomkp1feeerqa5qdnt5n1mhxl4ryp2wh6bf260cdi0vw7oxh0sbhtwhotybgbyxpk17zlyvmiqczv86o90ofqpx0sdajso910ns8q42bxxpp9hvd46vaev2ow1dy8riqf',
                channelName: 'kpjieuruqke0edh8ww4jxje8gfvzoo664r7ppnj80f2mc7hn6etcznggdc4b9vmiqgpknkjdvw5jx96mzawb4swbi3q76o108hgctch6fm0c6rd97q7p780bo2pk9q47fose1rzmg7esl3bixk2snustowu8ygxt',
                flowHash: 's1ielykk17qp9sw7vkzv8q6ejax0z1rca5ym5y5o',
                flowParty: 'f897sqbjpszgiar4159n0mp9l3etrhtqz75ait7vq1wi3e10hgxgox29xqezjw7fy98rhnudy2me1da0alek9ly7v2cud37zanad0lhdgfohnkr90fn7zqewja3ksv33id8bdkxdqj0zotl63tvdjog03olr9yue',
                flowComponent: '1rt64bnymkcdc4g87gm6ae8oalwwfb9rw7i9hlvu210exlkxgns0ev72bc4fyfwlmjzfa8818awyi1xkd6ko02kes7h04lxnlemyvo8qdegt5jgqn8x1vizhpjzrg9wzytesa8kzr9b2o3k2j3jp55fafhmswn81',
                flowInterfaceName: 'r5p5z6jmeajz9eusha2h8ozbqya0hv63ubbphk7dv8wnlr59hk1mi6q4ybees4jihb3cd15q1t2tq89g56us4m42z402idsc0k67j3b27f5iaa9sws4qa2ybbehb2bid00ddj38eliig27qtaq91sa0zr7m0lhdn',
                flowInterfaceNamespace: '4csjqzpypoki3nvhelqb93w0po3obh7vgjkghcdbw2o51b395qscxsjvt2ehibp8yk2dhkc5aphztj66rbhq1uqiul3qg9k6dgzxq4yqmhxf25dnwip93h8h0tx2zx4w03ex5e9nsjw2p45ogg87vhr48xbgqg04d',
                version: '1coythwnvo8u0x6vsqmh',
                parameterGroup: 'uofgrueggxri64ahir0k0pxu9ev6k95kljd1ejgnkfiepaksygz9bzxakytxnbxmfkfg87t9vc26piw5wek067uqs3y23e4k2kazogw6pebajqefzos5ztp1ggyec2o58qk7mwal8pl5mxi2i1ewb5a77241pqsg57jdw9w7n92t6gxf8umn508jgisbxstusouzo4rfwu6oicwi7grbxxszqdtl9w8f5t7j0ouvpp24f1br5cbayi8gi0drayw',
                name: 'ju9lps8zde8328t0g6c5k92as51pqydxtb74h2cesovc02p53n7pr07adr5kw3pi0ohbczszrdbjbp5symhgyiak24yahzhb0jem7f8jcy3jpbqs9y70iowukwm64ne0c6wt5k5mxmvlnktzr261p85slwkuw45b3eo2rg9n1o0nbgzqhksca4l872jdpg8vvhlkd167vxwei0jp35l2pfqujpu3e12ae4jlxuhbrljszq4gxwvco1ch5pem718nheyzeqvlgy7ee5awzwpuenwa5t6ya6vz1mrfu78v5gkpkfulj9bkfgndbk7antj5',
                parameterName: 'llzcrskjzk8f148or51u66slhdw9p559uhlii7bd7w144hfbhs9bmepsnb1fmsmhh886qpdm2nsjr4bcftzwdleel2i5g9a1a5jajg9zonwdfjk92p87k1o0fa3i5ra2hz3rez8le1ujuf7eoy5tddg0dznvafzu57j986xtec32orhjor820zsk61t1214og43n3lz5y0vnkaqsut830lopnyid3e274pl6xxb2u1ofba4y39759oju22knn7kon8kwxu6aodrfrjp5dejxf5nylpdhuzszmvo5jwmthqllxba9jichjqi1x4jae0ok',
                parameterValue: 'w6y60d2wk9nrt5psaa82yhze8cce5tna9orhizq5nnii0vippvj7q68st4x57zskjl9ozx3nf7fuswyrtjr7e9rcmw1vojsyiw2a4umcks119kafgbej3l2yy186kmz8gn82n96rhwgwbmc864etauvrvn8l3l8uj64sp3fne5wfy0nl0jmz4maiz338o58mpn2dte562b66b5028a7czre0o7rctea5ybz8hroae2yifzcnc2xtx2b221h3slnjabad9y2j9fetdxd53qa9mknf7b1fqs82822ip27h11wyh4bweyhqcubo0tw8rka7n9mek7lkho87ulwh4i6khu40rw0mrbceq7vuu2p58oj4c3u3hts3mg7634diypg4xazrkiqehx3iihlz5sndfmzw179q0dsh7sfunry56eq1gk26edcjfc9qc7qq9ra579moewgzw5englhqlcrmqug5r6dqnokxqnluk8s4xaqj66ilq3m8g6ugaeqf4anf8fkboaiwm2lwnu38z4wr3403zwf3gae4hxdspdpltkwtnutotws6wrewh4qxzqbva6eyfxmdwj6u5me7qqetnuoikcb6x9130p2jh5x89s48ul4e9dbmfvi5dazou0m6kykzwhhk7furx6nxg1qkgqh7efr07foj2wgca99dbqpcci2xqt3esgar82fsfjyw2iw59fz9b8hnii3zqeb5izx4xspwvs9yugsrcifxtqc9zrofw79yu94xfo5pznuwc4cjlrpr58s9wgn6qk42gkfqv6hob3cc4u3tzogvq35pmzj7ohxgs24zuxw7xd5e58y3ork5ocdgni2z27qmcbasc9oc5yjndi1ppod5w41m8e0hb1cwnx1ccqiw3lao86b4f0zmidl5oac3h6qj78nxaggqubw52z9i8z6vu15tqr1ed6en84ex6v9c2ulzlgxqf8xnf9rjsamtmdxj1p931dogcjeuov06o1oh40ivdcc2r0jaoxbaxv1ycqmp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'qyubob8j0jbrsrbr9gegbs364mddlzhh9k1ctw9eycqrfb77d7',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 't4hhhc0bf658xsmfmur8',
                channelHash: '9k50i5rcbahuo72pxagr2qdj26p5632h37j2r4um',
                channelParty: 'nwb5tjn8fegadkmdq41srz4zkyntrrsbc5ytag193d78ygj2bfw9puwcf4sidbncqmawv3r7h8rj1wsrebsgf9j69ia16j45vgjhviucmx642gulxqideblr6ksncj8jryttinpinwfdt61j1n6bs5akh1jrsidj',
                channelComponent: '8aw0tz4ka3kbk9br3kl7ats06r90qt5ivaz3f1468rfga502i62w2lvyklpzkd7jobe34it2cv9sowenwdp46oayx241x4jckix1xrbl3bqbawcecbevc23q47iz262q8tj7zf2u1zccvs15gqk40yxbkfpfx8bh',
                channelName: 'mp11cbhcenkn21swowopti6ge18k6lm4d6i3q00arkd0c4zjv8i6djgb5clnfg6q9bxai9xebsqw3u01but7685yj7yck08iqhbluotaeixh2lr45sjlmiuux60ymb1pektortzkdtt7vxsb9ny6y2g4qrc72qxm',
                flowHash: 'bhiotflwriyr0zhp8mncrejyjc3mycc6402g2a50',
                flowParty: 'htbps6bgkr16n372f12oryxo556jb7rzcn2ao8ow7zwrb89abvx1dsviknnno88wzortszhiuq2ut108rm2ufxs3n9abyssfcgdn4ye3h0a1h4e40752mir2b87zuvfprqee2as442pc726qaylr0vcn2l25slbp',
                flowComponent: 'mnd0bhbh3pyzvyj9pdd4bku4ornjytncequbnx9fubqojxcsrko8v6jqv89v74hyu3izow7f8wwdc6dkpj9vudplkt5aepbkh6euksex958i0akug3g9hd5xvpjni7pheypgwjuc7405cex71h5u4sbdix4hp844',
                flowInterfaceName: 'cbycaxeexaywi1lo58za8eidotp22eord06a45qv58nnmv774x77846vs3pzyndjllz3olpkiicgwzpy3z1bpm202kfsigtfqc3ka3q233z8ch0eaybmswo817fci7j1j8jpkmedftngxlsmnbrjv07l3n0t0dp9',
                flowInterfaceNamespace: 'uaq3sj67ejuzvixqe8rjo1cf3bgy4dx83ab9a20p84c3n9q37gjw1oahs6wn61ket708vstd5iix6vnhxzyd861xobd1pllhok2bv5t1bu56sp4qk054vxqgnez3g8vwbmf6mtaf7nnikipyjwtq4gkj8ocxred7',
                version: 'wurn21tulj4tnzjl11ruf',
                parameterGroup: '53ved30uqdzh6d64rp5zrhnr2ki8qb7gt6ipefe9mf3f3sg2pfg800pd63s3sf14hdefyi20qqyqjdmzmlguw8iwmzz7g19n8sw30vgm14aalwzibofgsfhvxcfcadgpkakx0k7w6y2mjkgb7euc91ho9voffqn73yvowpq8xdu875vcw8mwnzmdpj6bsbua82htgc3rhj0nrw870ftrkj8mrki7x1m3o82f7fpt9c40k7levp3rujzmkeqqyuf',
                name: 'enewznc6eh27qgi5f2x7jof9diphox2fyema7nyy0pb49qxvvg3wzddi6rg9d5pkqz45m4flsq3z5yqxrhkqr1c4nb3tresuu1otizhmu0187um6nyuwagdn3rbq6ycpagxpa0uzpbqsboawv9udi5l8rlohh1wgs3ljrj9xsb6ingiy5m6l72azll2q0ooz0a1jv9d62izp2mionmvzmgm546bky6on3lwimmcr6egitp6b2qrcbfx3igc8b2f768cs76qwnrazw9odvghz1okpkdamtuma40ympyfztxfjhhiud0s9z5ukz0uirkkh',
                parameterName: 's2av8w9b5lyisoru55xhjsvf51jtw5ljoxhk0z14axv73psbiw42lzyhcqk277p89c1fc2oaoqk7ylvx25y67l8u6pkss69qaxaak0o7vci0me8q5by4gxtupo3vcoywdqxhpienf72z26oqvyspo4cvow92tqqhi1bvs2w6lb57hilmtlpa08pcpnrelxhlhf16uu0de27sasvwhqr3ko5x86x40zi5aptudjjywg4cc5dw2jibt3r450wtmduhbyxss5w1vr2s056ibvidk1on1v301l5a4we06nu6deuo4cmqi26siq3cls9g3ycb',
                parameterValue: 'nj6uowdf1jyjg39c922kphe8xgkrnqlpwyozqhlvtn4kdiu14tvq66a7wz2w1nmtnm9r6qyhf2bmh3plc4jgh68phekz5uowre8bumq8grr9nan2fy4lptc7wjhnhuy1r7stgaomhw3g7kdpa9j5hmhx207ny4mz3qurc47fq2kdpgx9xmt3id40mnj9yn7z4m8moa9id9exow7oek18v2ffyx974qrwscz2xgrdau20ncfab8b3x5f14ixlsawqme2m5xxxjqtoi3csacr957aprmgpmsx5hsjzeoabm1cchrw0uctgwkuz2py1mpffif2adkai9weh12pspoquqyyjcuymnlsymjtr8jrd7974566fvxvchl491twkazbfdmtkz0e48b9z0gcpd7ujsufn5xe8fxieukbyciugx5vrq2hhnam65daplubt7r84p34q6671bw0iyjvgd4jcegs8algextbuajiati4r9srguylyr1vadi51i6hwwdcc0yvfrd8rh4nw5iapamtnv9fl8s9w3dfgm08vvojkt07f8u19icudrdf4isb781xlf5841azq595oo3wu07urzvksj536fkt34e6x32sujkpbag4u6q5n4xlatev57xufpq8i4w8w8bwqrxxb4q5izdbxt81pfq8ujkfvg9rsho65c1eife2zx6s5y92yll0h7becp1y5igwa555j6i1v5m8a25k16h5yot7el8b5unkhtl0qdywxuwop7qh25dbecu9k2uyaseteggqyabyf2gk03ti4k8qiup8l34or2vvlrtonhl7tr21kummkqmzmp2aq1rwm6oencr7mvp729iz4cblqklyfm8odwrdvclokrk4w7mn2oci3esaivj9cwmixy0hq4pxuyu8nmjm0heftl187vvadufg84wbfbs37xgqwb6l28iqcsyqhasf9hhodk5ge4h8fw3ag8dt7eiuq9dl91sxpr3qnukmd7mf393t288qy4c51ge6uz4x5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '60jyewr1u63c4cvlqjncyx371lsp2qf07i2121g1yd4ytbwqwp',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'kqqp5gm09ddxm5va4234',
                channelHash: 'tj1njqnnia8x91mvcxzzuaura9maxapijzs1wo7t',
                channelParty: 'dadlwlpl8o03izgsxy6gwvmd9jvf6yreiq570jp9u7ulatyd8k39j536fwjclwi3e80hdvy2ohsj0m41iy2bk1jxvtvpxzt6wlr0y5c1rxpr00pu7vvuc9rz2tnw9c3s2uusdynce1ntq8eogq6o8m1xgucuda16',
                channelComponent: '4zhfccz3v92u0yadffecyhzj1n3adz6zpjdeth2kud5dalzehladepssy8qhoe6eadnd49jeabp09h6o2939r1wzmw2noy12hutaulv1f833brdhjyesfiur4o3itdob21m9k0j4gh6nz31r1quhbj1hqmzhs78t',
                channelName: 'rdaped7l3rlkw8anqxgzy7qiawefxzznj67c5eq2jt985k15j4nnplsddt0ck3bns8uxvi2h38wb7qn720t1hsvihl8mpws6beet1dqvpximx1pvbl5sloybvcu3pol986ws9nw34nz4kfwqmon5bsi041avxew3',
                flowHash: 'ma2s9jykiisk8wkld9x5pfik666884b8qsvdk36r',
                flowParty: 'tdik4cs03qynsh1cn3pnpeoi2t5kzun5j7x6p0l3vllg0ca4rvrt2bb0fy3a577j1bqe2h63cvokbr93xmusdcxdd106ropmg49pj9tqbio84f90zv3rr4qg9pwfr89ltvkvpl6bq7wbg5899qcw733jxppws3tq',
                flowComponent: 'm3mdtzdkrkh1odpj21zznsql4w5tuiiqtmylwhguxyctyfv4uxrekfolnybe4wf2wa3v6w619q09slobkoau6qk9oa3j8clfhhvhsebvfw39mmr2br9sltngr6dpvm9cww7kbblefpz5pfj8sn8ifi2hs8ywmwka',
                flowInterfaceName: 'prkvq2w1n0exbcve68z71fcsoaxyfwyq45mdexpxsk26c7wtcs5kj6wughrdvfffjv1xtlqsvz3zlrjel4hc2luy0klipty7dsne14vs6e56kiawadvvlpoulvqp3uuawgomdmavx9uuazfx2mjpyi4201ffagm5',
                flowInterfaceNamespace: '9evqrk9vxhz7fzhtmb8h0beav5knxry55o1i6856wypwe1i3nws8gehs49uirwjo0ppxl6qk2ehiqgmobplngp4l2gfukhznyq6973xa6jkvwgq55cao7tik446vwjzspigfjr6r2bd5nw1x55oiulcbo9zt3ki7',
                version: 'vpk9hh0jh3sqovb4abh4',
                parameterGroup: '4zy5ie5f2q0xwha7c5ifzkmbvlcuk6npwgiooe16itzn1y3s23is5xwvqoq5oj9ckb7j7ibfwln75a3krbsndyq1mlkq13tcosc6qdvyc71wzkthxxhlsvokj3zhwohz35bierh77hu577j2sa62yu1p4k60x2j7zin63xcz0rpu8f8oehb9clx7mscm4z5syrm114ynhsssvpmw58ds95rfy8r9qxprayxpjj9t5vp72y1mrpj49913wdhf87mn',
                name: 'zyljzwz5pa3wdpbw4hkwwrfhvqlibwmnpv0lewgze2oa5n21pya0t5gehww1hk6oxnoc2bv942d5tiple5xszbq7rcdi9hs5cadiyvqbfir6b1ovjbi9arwt8zpkl1cu52m5qjz3ijz0r1ol0dz3m0hsk123yhk4qle748gdr7lqrsyxhsu8cj7zpqn2klgursqfpw4saexqhhku6jfjr5e6unezvu6xbua3ste0y0hizb1hl5olky0w7ybv9ti87dw9pk009sycqtz3ommjq15ijd0ebl7tik1n3fqwxzn867mijc007al3i0625x94',
                parameterName: 'xf2dmq0j46c0y8byq1ccvr5zqlyg6tl49w77vxxwdz8dgiwtwtxz2c82i4r9yrlfc3otc9bymzzs2gtxe35kb7gqlq9fnbgtj97gaeg2cayjg3zmu6qw63xotvu0h3uc40c9ize4w9az5rei4w3kz2kdvdpd5zm2sjk6w1y08z6blsotr2c2ieslztz5ddsa5dp4z12rquk5o8zel2594wr1tppm9kowhm84cg3xei18s99aj8e75c10xubhvdcohu544zd8kopb77u1kfivtle8uqdqyiyvqy93ez1rxovjdk1mdzucga13ya4qp5yg',
                parameterValue: 'h91fv3hv1273z6p72xa0ya3f02cc85y4zwx0snirbc0fiu6knz2tnsnkw0zvbaix1di4lssfb1z2edhir252j7sboedugjrhw1tltoqx9evkiw6pxie06neswo92ewujg54x342mgks8x9sj4o9kmng5mg4bmj8ozgc4112fyfe7blmilqho9i1yo9z81v1ikfpsf2h48zroa36qrrztgqbiqaa930bov3usz2riq0kqeivsz43fb6ywsruejkitqj0f4q6wm5wcaxhufpywk7op1zyaayuz8l9depefd17qo8328gtkoilyxswf0e5fqw54q63rd7svb1rfgyx65et2y2hvs80jz1c70y07es7n74e7jefl5kepih1t7gbot4rix8fplgvvv4ej5qspt46fjhqch3d4mldm7b29htzq0d1xa0yowf5a0cucl5w6uzn7hak9mjzdplmhpdc8dnxlcxkvsqt8w1gojme1wgrmznbh3wow8yaomz7qw3n1971g2yphza4gzjnp7v0ajrz1a0m9fo87ichkyc96otypa6vit8ek1iix7y2b1nxexhhgrrcud2dflx21cadap0kh6vq9hvpzwwyjuamz3pqajlt78ru8lbnhfzkwsuv1u1j42py37m42jacnxsvrgg8ar47tk713m1ypihiv9mksxt8vrchuoeeot6tj3kfijv8qpmj3gmfbyycd70skd7yzoyr02iela1kcf7qmieovhg4b3hc6i10i8p8oa3ch74yac6i8p30dyiesfggouszq56tge440x7hsb0izntfhmdeji26grg7g2lvcvj0rah2frzbzf97knj20nk3qdl0dc9jbdhznzx22zx09hehfq9n6j50myw233n84fpjbjctnkb3459433rtgedbakg1detyzsyem7o2d114k3hpe01zqypk1klu3rg08libdv08p9ts0p6c9o1j7d1h970fdoteb5564a482zf7e89hkn2dsek692dly26kr0hl0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'r20xx553ovn5nxtn94ma4iu77je1xridy1il6st62jrtaex9j3',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'zg8o5ksnb558v0m8696m',
                channelHash: 'p8euz2tzebsn9gtjs6mmxr5pqbx64ryrwv2qiax3',
                channelParty: 'mwdhexxld6essevxi48frk18bpz6hwt2yuhk0aeoe9htiyc9nmeb6xkosc26shzuno4j855uos6cx96u16na623rk4ioykhhy3pktz6cixqd8zm2xi3nk1khs61jnncsvp3grijgw33a4pykpcmfmx9i68kxjm2p',
                channelComponent: 'rqos8fatuosjlotbz043zkz12jr250iu50a2fm411e4m7pkz20qi8zxp6hkg9il8qcyewbywfexwm93q9xmncr2fzxfbvg2165kbj4jz9t83c4k00l1jwxh2p4rp69tuyg8ebxfz4c97m1he1a2wtr0zww7r39c5',
                channelName: 'xs3q3oxn8u839jqybafrjsfci0wtjnezr8qtvgy0rvqeo2s3ztcwtfnt5rmqqe7insfre7bnr0tfs3s2wcvgycunes5s0n24frrz2vk6tamxe9t7c1xemj1prkwxb3uywk1l17q6dmbqp5ijmfwrkk09g65ohlrd',
                flowHash: 'otgcbls20k1uzdzi6y831xsb70t943eauakcsowj',
                flowParty: '9j6sndbbs0a6w3sva0rl0v9vgnxaatadk7bamrqqmu4czayrvva44splq8rfig15upmgl59yn4j6tjw9u3moqt0l4yr9hz4u9cfmfe1qyzhcaswilswy0aexr2y8dqmzw3oap218zfy92su3f4na8jen24dzcyzj',
                flowComponent: 'vb7kvhzkp5u3mghvmxq2nykwjaspr328i0pgta1x5mwtlz833iej3iyruyzq6gbr4rk0kh6qkw07kud8lg5axu9o45wh6psnhnpu5nedn7n3yhy94mngrcdbhy3g3rvackohz5pd77hzcis1129by496drrkp0bh',
                flowInterfaceName: 'nphi57qzzdljpcd61hnr0m1y5464rd18mr9dnoaziijoyhnwjbq7otoqnr4jff41bhrtq5tlatulj51r8wlblczz8mgys314w2s6m5aa0y9nolvsldkk80c7ok39qodwhjl5rcbevb738e5yvk6rema1z1o4iboa',
                flowInterfaceNamespace: '8v2j3o4mnxk241z3w2t1u1tfn65dohitjj82vfykjmou10hci8g7bxttf1gdbklq7z1llxhgvpfja74g6lsh4gls0kfmhpr9qrfe1vhywl2ogs1m3wdylxcoknfqrrxq6oyrh3l5swbjn8hzw4rur7mc9duvm86a',
                version: 'i7hn4ivm4ts3cunes3u9',
                parameterGroup: 'qmdu373szhgtbiint0xkngm6b8xijwuwsfm2p206o7tdnzigj5aon42ierowyr1pi41mgsm8y6u2wslii3bj4d3d55av9xzg5demvfl631pt9tx8bcq54cb8o1nqs4n9ai8fcuckrbyoddnn50c4ynnp128zpxg2f43tyqwdjxluw0rrpgits8ptguy8kbo7eoy3ftaveoec6wxmnba3yder64diz0y6ki4b40sygn1n95nisjktnkpxne6vprt',
                name: 'bgber4xx39nkbzogvkl2y9vqbpghclfm09n5km6duteo015wjipwt9pyoie9sdczfr062wpk36o42m4hqfjrjnyqa72kaj8km8hopi2331b72wpk1nlbvrpfkd8xmy05xmqs8s2gsneah2p8idugxbrz5is5u64a6k205u42a8i80a63pu9i8t95kvegxwpbfiefjrnphqqmweb6jiwj7kng9t42j9que0l1zqre58x4wd1014g0f5fviyiftc463r2alc4pclrc6mq4j99qqh1taeflfp7ia64rc8r2ty5j6sdbtjfrqb4jiejkk6x9m',
                parameterName: '2prr23xxfce3q73bqxojzwx89ib6z5xp8kod8d22l5bdh3vhza1t3di84x2qxo4qd32090fgbj7b9wc9fop45plu7ty8jtcdw0tvp9uxrdfx5wl75ixq2ba7d6wbsy52mlf26n87h2psvccjbzjmytmc82qsh65set8ftakcks2us09q0ldiidyspf1xvp20tzcrpcu3bv8a76f564dirq4q55tg6zao4qfjm24830k7vw3lug2z192xojzcbkdi19mag4gpsbaeptpy9vgpum2paluqvqz1uacjkub3iebxzruuudmcxt8oodp6b6da',
                parameterValue: 'q4ccxz5bfzvi0cf7gahmg4vkjkgw7g56m5nsniqwztsz13t1gxb7xz0d213iji59deb0rgnpvhuclrjh8b83574rzbefp8tn9xa4888viz97bw76zfesycvcebmqvjgyuexobzp7y7j1mshytkhxamg6nlm74vl0ifx1ldq4src48b5hvqwaa2ow9h71qtqg9meirzufj5w1h0oqkli9cqi9iau78i5h5uvvf9c3idls19u5sphw7kqed89fhyxpjfy1fe3rv85t3gv2ubw97hl77oncwd5nd547mu79ocp3htspz8j8ah75yvh0ajau5w512a8us27ngl7ha54mrjd1hkx8rurzm6tfp0qvrmg4byseby3mgceks4rzasndl5r0ms9pmhg3ufy4v9s9q6sjxz8slo8b789qogr0nuvwd4zr3uvqdatimjiah8svdbrc7ddd2xzxrafl7wheizzhwgwpo9dtmax9ubgalzxlokfg3ipv1rmvnra9ferdm1ztfcqr6cz70oqqdc3hsrokmqtuuwg9euls4ubsu4ote3ip1scp7wom2b1u1i80hzozhwa8sb6oy8r18fijtns0c56g2e6rwm554rcxhyqrf71cyjzf1qs90u9q1l5zd4gty2vm4zvdej5r76ulh669ia4ouk80t4976pi07vvdj82yoheb6sh9o25ob47h9ckjydwssxvm3go78ms9z0pfx1m30lfwjyv6s8g5572vrx6a31ar7oa8biazn2qqpkyjpdv9hugpn71w386u1y39zj9ve4nu2054ygaxhiona9jqme1qgej4p7lry1kcq91xb2c5ao7xlvzxtcnrc9nmf4cav8nf53xskr2j75zpb8wkf3xhgv2j924x6usbkxmez13a63w1itnyzimfidyep92md5ttw37tqc8asnvqosnvps0p67om8h44of5nz2sc3ch72csjscm1aruzn03ua8c0hscficu598doidn6ecpekxugr6w5qke4ulu7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: '3zwgge19v6ehxuowx6kr0d9r09e8esdpq22co4i6r5hfh6urst',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'ezu18wa4pxuc2vukuji9',
                channelHash: 'pw3hzalbgqr6yw3z2cbjjir8095rtb4j53dyd3wx',
                channelParty: 'ibi67e08ci572lohu9vdd8xh873uv1jy083sot6gvxyp41omvjseegp4pswo60hm0suwqduuvur8ja1o50cgz2akjfbxixi7bilnm9np8c879uqbd8x76wiwblvkq31evn75ihfcd45wr4hsoze1ebxgcwlpwjr2',
                channelComponent: 'pt523yisqp9lcd41stwkhmbdtdkn6q6ltmjlb7yhi6mi6q91uhv61kyl7irbcp3xz6ccwroemgi0nt6ietesar31rlk368gqvfh48xhwc4qalenlg64czfh2xjz57cmdf2mpp0icp77ep576nbgcxfvod444bmui',
                channelName: 'xs7tingklw8vswcl9of6jo0hnrkua81lh0wx5wbv9kfnz8ilgiu4trqbi1qlyo9c7whd2ozhuqe92zlmxxoq6udyq4h0l66qvfvuqjx816ew9yehzhbenemephsrwd4vxplbrjxu90q5504acb0je0t5zorp4lxm',
                flowHash: 'z1jdo85lx81cs3ykmrccftyjqjm6wbk2s8sfcf8d',
                flowParty: 'p5j2mroh46hvpqt1p9xliduyt6v0sueyjkc3pi4y77sypa6m6gkwvzi1wq4psrhftwervf9qtmzocpg1ql17iiey0mdws7t9btafva7hd6gqo3ea3kc6xl3gst33ydbf6zezsyozju89101jm0vwkwojd477hscr',
                flowComponent: 'sithe9fppl0ginsbhlkscfqmmrawt2t3fo0kvkz879nekdor3dfre5dyq8uohbkwf6jm3bqwsfbqbqiyw33xaqwyothwx4wvtha02gaoy09sav9cqif0xqi3dhkt05iqdqftbczfkx3ux8qxowzwjew353egkxjy',
                flowInterfaceName: 'enagtm4iu307c2yyk64h8qwg6kbmqz19093f9lj2eubf05r4hz54ih0cj5khwg2e7hjbqf5ve5xqdn3vfajfc4k7p10sx3xnzacgkio1et9qlxmaabcj1xrbt38jn4g5vo50548x8fmtys7wo78mm2bnronhr1u6',
                flowInterfaceNamespace: 'ivq80zhzbv5iy7fipi39u8ok9iuk64boww3yuwd72ntr1aztnpj7zbvhhtesi12jeh2b342gtmacdqbnmxxy9yqctubp8a4s3d7kva362igyz1i8eff8fz6ppeni20kz3tv2b2yso5ukgqw5o4d2ryjc8wew0nxf',
                version: 'rik4o9ycdr31st6amipn',
                parameterGroup: '3hehm6gqoa4thiwrpbo6iueyt1cd3d2hlaelr0xa6g9jg6g5jtl24pqseb56d7779v775lc8fyeyvg03m8xzmpv3dosqe59c9nmi4rbjwph4qk7g4lhnbpjbe5xcq3fgavxufehjmurn3xvs95l7hs8zxi2p5xun7lyusjhc9g4gwlmrwzykcao77jxc6qzjeqpz0lxsons4gorr59vxedij89l4fi7ckyigyy051mkxh2pzivkg6ofpmb73rjl',
                name: 'isuea55pqgvnkc3bekvefyz1kmp5zryx84dyltisot4130qrzc567g6pb2qn2mzfunkiz063k92f22zdneihh8ez0lte7mml8h028xqk54uyzd9wjuk9q8koxryxj5i2g2amoupq0fffmw67j7u648jzy8rotqwyuep0f60h9cv7ver4xrhihrnojiicfsomqs0g8f0xjrtxo863nasx08mutej9fvhjbkb3a6tui5rzntnphao6h6wrgxr71c02y16ymoflpyggfr3qytrcns1au8zwnvi8aic646iz6f3vyhfrfhqkau7j5k140zhd',
                parameterName: 'yd96jew60md98nnxubsmwm3y51m2skbrdfym1ty4jv36al4wdkdl0z0cuiqd7tl6bo7g0ffw7ml4q8mw78qacwtwr3bq0km6kh5yele1yo39uwdzijr1plkiws1ulug3argqna8wu57lofc01ajzbmg2rpkxcjbanwnl97kudi3s2aub9svwe24ynjgmv8smx9wjc6495tyeb2k5e33o9v6p2vqbo137om3jckdt2gfye99vvkt2305sv4pbm6h1zg2i665l76v836q30a773akmj017bfqmqsr9x0gfdi1citr490vzyoawh03hdblw4',
                parameterValue: 'nsjrrzn6lvy4qtzdkszmxdswo41f9vkfsb3b3xb38zphbb8ehkkozpl6d2s7osz0l74mdqasq1cwe9p9ecie91o0zzcq9xi1a0h5mfsdjaaq7mna34et6jko190drgvwjt5de46xidnsdv4u3pmb0hvsy77tegasz03px22alyb7bss7ym3dld9b0lhufb1i141uj3qb63f8kssymps1gf6a8acssty70ltjo8flc9ypo03o6mwf4izc88foq78m188kwik6kmn9b0ds475wdgo3hl2ba91ypdoto4uorikysb4s660noou6rxmqgzpeahte3ap2ilk79ml38jls36l7vf9xzyzx5wcippg5erb4mo5i6xslrk9xwipm0rdx1ow52vy2eheh0b7l450j8r0pjtc3h5i98achid4vmh4xska5jx64tp6dorsqlljgo00yuknxz5ns1h8sjfvwh76050kcnv9g115pwx5xbykxz32cujzypptq14d4e18m2ptdbsqhxqxnf28vmf4untwlolqy6q6vv688gko171m1i540i5abjk6uz9jkdxxks8fxlfl5ggv7jaa620t49eo2h6cy1pcp2v9vliknt8qvs4j199fymkyc41226ply11q27ow2ehc4ocz2wg9r2y3drdjvkow3f8h6lrvpso2ebism5vnlqfj0ufkuop64z2mchiohn9g3tw8l2clcv5jyz7b4vt8a6m6xkgx0kll942mhnpmdmjec2j3f61nc5yk7cgfhvsihhewp102ewkp35uvhkeifsx14jfr8fa1vitrhh3n17wguy0g7fdkus0i8ihvmlrmeg540sh1ynfk7e1zwijsx5wnte07onjak1d5rftxhnd0m8pzsp62z6dcq2kml3z5cbe8zgexpwh5ckr3sbscjk48k0knhbwijelas49j8j99n4yic7nismahut4iwz55up54kh8rjzi0v9jehtid6dvbkd2od69efh9ae6iucb2m3hznq7cgz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'o665i7ygbd11ljt2fgfwihd7ydgjx3prhuavqi8yuwscenv3zh',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: '9sl9swh516eta2kvh2e1',
                channelHash: 'pi4sfxvulgpjutes4nlpkv4p3cjunw6xtk9x0e4f',
                channelParty: 'c36p9sldrnike02l0nlg7zg8q1mg4pbl0z180uy6qdp428nv6ncu9vxk1kjta04r3mife522v0mntbg1j86lw5nkdfc1gbkattcljdcsgiqw24bs236k9i7ozf1tvdsyjgn041ib3jxo5tphe4ilbsnrv2ee2dx7',
                channelComponent: 'cimr98bmwkpwlvgt8xi390ikpa44375dn0xh953ruezbb6kk4ryx4x6xkb7zjnwe9phormvt4vpepvk0sw93ipvigkkwp6d1vpyhrebopqxl63706rfq30lypzh17g60b1jl3ge0pg7kw50vv96pkauwt5vw44ed',
                channelName: '7xgalx5zoy0uqto6zk8im14uqb8273juxn7p6o6flgg9obam8c2h6earb3gv2n6jtszcb8tshvaq838r6wcf2k8q7topj6cj9y6a08ks6tsz7vmflw3nqa73hfmeqv13i5rslpqpc7fiqy5v114ozfdgpisip2is',
                flowHash: 'sk8i2j9xjdkpis2m9m52rohzgbctc9mym5bzmsac',
                flowParty: '4tta0pheubi5cjn6jsjj5d0ta7pjatjk9qokmynuvjb9bhw5bdnoth7gp96qk8s613qfgozxpni75483uttjw697eywq6f6q0d15q200ooe5xzoxto4h533jhbq2akqe10zz95p3g7rvhq2q6mm79fbk0zi54til',
                flowComponent: '8rr5fx6sincgo2ra71845mjoet6g9o9scxquxi55mryszcilnzpr9tey1d24v3ua6f7y703rut6mrs8mqf68iczl2p20g47bupesalfg5zx9nhn0tavatoskllmbe2regtiiosyt3o419st0gjy2yv1lg108a179',
                flowInterfaceName: '5fmik9728u3hs38ibksq8asxunazkqgeftf05rt7zth1jtbmkeuhvssgcwhl9befhyibpd9ljv5tf1ickafatpwx10m610apjxwmegdtw6f0ptt2adpi8p0dj4leqc61tffvucey493pteen83ig5kt99v8rvsrf',
                flowInterfaceNamespace: 'bjw3q83s0jwdnhcav6muzlu7k0m8l30lo444jc4km9foff6dk3t40oluui2gzt2wkal0a79tij4kinxiooks2r9h8ism3gq7lnqnj4xq97nptg9j1d8malaraw03lmqy9y7b8qa61eqqma411fzi7zibl86pqnsi',
                version: 'b04anzmyh0c8etszzmgt',
                parameterGroup: 'pyktk4pp0nnvowerdjgwdpxeyoe6qh7e9zg5i15215dit8skzp9kqc31nznyhg2dnew7t5ecautdhcldr0x7shwtje0t1fx2zloni2vprf9aup3njgmdm1zt8u2329s445hi7aa8gdcx6c73utkz11s0d4xz2gs96ae5dtsof7hf0brdz60125v8b117md032li276tbn474ismowdl9beimiksz7t9eo58f8fmfoo4uojpopalcbdh8k5kh75j',
                name: 'w8oqi63ew5qx6dlv8z16qkju35ary5w6s8omafyywvr9qlb244if8mpegz6h42j6f3hlcv0e0s5p4er0zhjrmdtx0eutd3jugj5aofql0dkuf227nrg9igkwh9iyd26oe6rkd1r6917rq2myigix7dkvc2ak38srl8f6vic9loz1a5reabaxdk44diy0sr7ssg4r8utbve1lber7xqxpasdpf344gjmghpa8b4apojnl6jb154afta2mg4sdj5o0khegmwr3sbb5iqtgdxj31tp8qd9zhyf0voh3my4auor3iwmth9z3zgy8akr07hfm',
                parameterName: '14qkai3easregm755b11h0wgo8m9m7d10jxb05ui9qra7fmyxjjnrjx4bz0b7nz56vpkd93bt51wv2p45n2c9dis6dcjpwlo38nu2amfsoplfeffom43q3l76vksb8onry18sktzwbqau0t0b6ei3fzhm8hj2dgfu2awxh3qas0melppa4k4laud1wqx63jfq5keyjmmpni5kku2ot2mnkmulndis08ofefhrwd1qp4io2yc9utbwg9krbcqfashwlo37aufwn76mmj85xzm6jl3t4hxdqz3effibvhe6nl1nl84uqkzhd0opeobiyig',
                parameterValue: '65cguv7wpnrwz8gbc3rrfx7ir74ccyygt1qxy6wdijmd0oj967talhfdm0kqd0brqt02tiq1hhe6erxjavh1kvbnq32pdkmvyz22qrdztfducz2sqo0r8hq0omw98viuxpn8mopvg3n9n11pnndwzeu24yvieftszdlnskocmtehjgvdvqsvffqf6itizhxmj3a9t4vqy5rw932miy10madwzyc83bgkofnkjbpg2anzlqn53vnlq0yhtvoxb7uh92zkf9abppl72nczduq8oiworkl1734ditvmz1asu7njje8j78165yh63w6ndb1y0p6kush4mw774i9qrkaj5j69v54ibz9he97gfcacaiobshl5n1dw2vim3o76vgqy7tnvg7op4xf2zlre9wpn6e11wmqsa5v62znzpix2u8y380sxgqeg91coqjwuhrqo20dv9x1rq011yjhbcgucci1w2jizak23msz3dxwqn06yikttxigx365im82vvlksijcsoyv7ewl6phojqejjn0rpfolrxxg30lqez8qo61c3kapi7bm520s4u4lvbrt6j0nm45zr3x6lmyh1sz8cabyhaj3oi4rsmzgiq82906nkmjv5fylzeahc2z4h1m9r0w5gbg7fnownjmvcbnipf7etbwktui0olbjvvmmjhubkjy2vg84kkak95g2c3cnh9qke2afa4r4zbf4543mvilg8slifw433u7zbl3b2ku8dvgcqh5cu9j17cly2sp2rwqh8fyuqs5ju54dq96izd22dndreo8fai4tnvm15z8ijsfsb59z0t8dimv1s99an3jy3bb9anctwrseavsksamafapciea39b0c7axp6nzatv7maewcwtvfdqaf1a7iuikk576ko1ngee9q6egx24mpmfcl9p7qlm8swt9qccw71sfkv40o5l6a2n2wwspd31x3q6fteuy48a19j7ug3opmwjgy202ye1u7idqsoiu7ss1e5fiv18waopmmyuekaw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'rgh7ii1eus3s0yx136zb951sj84b4zium1jxm2hs96ec3ipfnf',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: '3sm12ja221zquu84ibt6',
                channelHash: 'c0ckezti4w9hj22eoa3e1aek7xtzxh0qreyk6q3s',
                channelParty: 'oot3ed6asyghaiod7wyz9v7j1yz90rm33pqsznl2f6bwkzi6vcg97s2pa8u1oi1uat89xaf33kxnznhguh7cuz19s6gtuqvjstnt5zz003n1mat6b4dmug6x8jvri86zad3o8zb93vfzsx8o4bzai7ea31zm48h0',
                channelComponent: 'q8wob7groggpe6i2ni361deu1i1aklq4oocktxrah37bqwccx5jlz926yn4nlb03t0vvvhdrhibgak3169ylhz42fpud267kxid0bfxb27wn0b78y6wqitgey1xr7lp0wyw5gpn8mci3fqsh8o19c3c1lvia3aq8',
                channelName: '719najpr2i1wyiyozll6q3sopszsgtha5hbx2q5lf6xnkl4dw9hwmyci533il0x5jzym35hq53xejrjz122xqx62qml2nclhcwbffq4hg05qrzso7tsda0k1eprtiy2nhontmcc6k4emchlg0koii9ib0ganbqbe',
                flowHash: 'isv6qpg1enqt3gdd5kwjm5c3wnm8njq97z06ctd0',
                flowParty: 'i911xx7gxo6x9tbw6t8nx1ouueb547hqpsnye012s3i7v8jpljjeugy94tglsld9wt43vffrnkdiawn0gnjw4xg4at0a8eyljmunw5dyq1a73pmkxib532ktrskv9ra0bg4jq1y9kamd0wlubtje4ml8mc0djvej',
                flowComponent: '4dty9ohnfzq24sdawjf2zfe58wek3evkwo12ie4dldhvhn2yhwht8reew7p2rsouww4bqopqejfm9vbc1otmqtgnqclz8x93sk9635zos0tt26pa5fcdxz2ncug75xrw80dnty5y49c76j203sqfi82db71vcmho',
                flowInterfaceName: 'kpf62ve06kqp9sewzb6h1n4zygvp5qrfjeipkgndix8bhxrj9p2mk8nmtbryaemay2u1h3ecjvsro2egnmxcxw702bf0po56vx6nrsnqtls7mdid65mb856ryg68zsxilqnwfyw56prp1raced0ay31csusklnau',
                flowInterfaceNamespace: 'ml4bm8yv2tsg38o1fgu944fc3raplya8ja6kdugipyxpw4401v2pvqxppvbyq4eb4rax9m7oxl1clmzftpomdnbtvvqmrq7hulnswiilgbcwzt3zm908392iaewry0l7t2vqscu69al1hgxqc3wq532x38nmk4wb',
                version: 'hudlcopimp920it5r8q7',
                parameterGroup: '4h1n2nrv4zszt0nsnq5txfsg3rufe0wibbz5futy5q806pk2pnpsgeyhpsh8yb1q97dyq1qco1hrgd8k9jlyd2s06xffuz2d3j6z1pyuyi6mbwzqe21q7ci94dijh19d5c2wevrpxav1mcta9bdvuza66aztmg372b27ub82tsxqjwsb14y2z4x4vxyg30mfxrclpgzoyer30yaeb82lz1wv9b7v1mv14hq1ssm96x1q5d7f7cldmi1tuezapvy',
                name: 'qrhcpbn1hukvh9xcvkepp4e79lzjlzjylcr6xxdrrjt9c52brokx5tig17iffnfpevwr8klldmlfa3wql3loiw43ykjfnoqkqbpwemynneh0367z8eq71dmdh3ztpr3rjjc3z2b06njjxq93t6nz0y5xqrkz2lcv76puj1zpqrpyzb6o78s7v4k9pwsp5qt2i1i9oin810s6iankh8sg27z8heopwkbvutwiy9mvw2hedcx17pbhvq3d0xpjiqigzye779haiwavm83jjt9n30n6er3d32c7u2ox7f6u7tkfe70rnjarj07cjy6n5jmr',
                parameterName: 'xr8s0tf086gei8ngtncixrk8ij62n4v0api4qfni61mrtct76xr70a6qjv0witaaalwyilnnojtxmtj2wuc2jqnw8157gpebfbsf0d6yd0y58lpz522uyw5s60g9digc0mgmfag8tad6k3pjiv8eqgofrqg6p1akkep5eyio3b7nci6vzgvrx0bir0z3kjcgnemu1a0x2820zn7smcqkxzucdwladlm0l5d29fq9u6cxj4uzoa5lerj50415yo9cucim1vyx8jbili13z8hg9qijpt0len9br2vvq1y1bbzeogw25o28bnvksv1b8sva',
                parameterValue: '21rqexo6v6mor18qu28um0m0bm152s4idijtljhzejf97g3nz2r9wuwhrdjc0a546qumcu5xa324rju4ycmy3ctmrxcx6z5jl99zi64ahe10b0uk1zbnb3apk3to94pu86p7je0a2loh059i6y1k6kuc4en6n6hqsgppyecbly6pkap6bh9ygllfdpdrp1o0z92tct8bpij70nxed2bg76h4id4frcscsrtx5i12txs588dogecgr25gyysncs0vj95t4g0vlh6cdw4bkq9wryaz15s1dv6z5wssi3egew7r0x6icxj2elqxyt040clep0t5qrcrity4flyl6hdacd0zafpin7a4gapfrqlzp85ssd0acrt18ll8208x86it06es8xbsloyh98x56f26bimih0zpl64zf0wco2orjohgp6kc47jmq8ip70qctnug8j3fhvfcciipsztvw42yhyucsjvpdkzaghp0pf83nosw84258k0j12v7m8n5ykqimx1w2o18u15s4fayrxcz2yq2q8y4iyfuxhhaoookgaq5h7g42vmjy8hqeex8466xethd7jtb143bq92xjw9dfqqywwziy3afwrqzlzyrpcju5a2l5n7gipmbbkjhnl7k8lgdj9houq9g8amet146fjeb0v3dv6whbnb0cuzuusp0nhvw49k5p9poczefc7xh4hjlp2o52m7lbfpoemls7d11yh09tozbxrcbpx2ko3d114qq2qls32af4j64mbfcqxcpmb32xw2nbp6c11cgp06mn0h1obipit1xgebhq8j45opmcq3696lm3av0kow36474muzb69lf5pq5hr5p7mqapvi0qoera0dlpowf6xp2xr1vsedz8nrm402abg28oa9d515upd0z4rfxwlqca8o7ljrtv8g9kakjbqqfznnz4us28kktsg639dwc2njx7dct9zwsum4d3pkp1dhqyi52053djjmxhctoy112m1799dwj8cx7a6fvg8n8ummz',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9810ea1d-6cc5-45f3-b728-5c31b8187a80'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '99ac10e3-5712-4ac9-bae0-5a299ba548c7'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/5c96f1b4-ea91-4382-844f-1c55498033d6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/99ac10e3-5712-4ac9-bae0-5a299ba548c7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '99ac10e3-5712-4ac9-bae0-5a299ba548c7'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'faaabb50-0820-4d4a-891d-11d9b1609104',
                tenantId: 'd8dd3f30-487f-41af-978f-08e9fafbf607',
                tenantCode: 'v3nu6dm7m9uexi3wqs8xtyumi0i0wjw52t87jdbpweljn2ezbj',
                systemId: '73e2e39c-8c33-4309-ba26-3aada1e9c974',
                systemName: '87mp9xtlw5qqojpjem3y',
                channelHash: '84gm7vamer5olco4y1n9ffiqnfmixeq64a0up0u6',
                channelParty: 'tu4va3jv8sqiy62htwy0ecztmmmyf4qx8dvimtqu7gmfo9j1bmtp5nnb8kt5uxor1f5o8vuadpyinb3bfh1z67iq69zbicjypkhfjxj5f6d7zd8b9q2nvhvy3i8t8ykswti3iaf15pt6d0wg38md0qc1xp4i0ryx',
                channelComponent: 'imdvlpstlhq4gmdoe16tx5fublx888c3mo32midkguegfxolbp3776o0m95on29rq3ko0jmcoddgo9t9g6p84dq8pcrzbn5c9tkn5fnz28d31oy9tslv0pbwcj2j5tz5kyl0bf7lsv3sgvqh9d2t3ieenmxuhsfx',
                channelName: '16ojdqu7mt4167bwfm3cdtxrayzdd23hk3fd9tab1ieago35d6txofd5mu7wne9tv6fn3urdiux4uwappou407ba8wxmbc5il4ufmnbxccgj6ykgsvk41nedoku3rgumsgvbhacihtstdfk9xfs868x55f130keh',
                flowHash: 'cm049f7inyifv6iq2k35hz9p439h2gvjapncj4i9',
                flowParty: 'qle588uel6e3u369l4lyi0qwqz7o4kruus95k9nyis1asoerbx9bmfdb44f60cf3nje1vrd3fjxnkckm3rnsui3fo5077buy1qverx7tcr28ed44eu4g6q1awria4t6ersvfqppblh5ufb2a0436i3yfuwg85xle',
                flowComponent: '8nsgud40gkko4ezlzok6x4lmaopd8v81dk8bdfiuqv5en6r5nqzc5gddf390t3ylbdykvizyedjx6e3rkd2r4dy5p7y6o040caa27tea3qpo6h5tvfx544eijr1d6j8dpyxfimbx77ix56mekqh62rgvatqwi407',
                flowInterfaceName: 'xwu9t3wg9yzvupy3wzmdwx3qhfdwate9dgd47zid8k5ecrubm54rqnwvwix6h0rv9gfqat5inycpjwxm09la42529u1unx9s64v3am6n3zok6e2u46jtv2inpg8wjnm0jf1otsowbjaugjqehucz07b10edu8aet',
                flowInterfaceNamespace: 'rklaek7kouzcl1wqrgqve13p9wk9c9t5hkjkln8mmpsbkgj8hd0zltg33w9iya5ikhfk87rmb24ltnn5exiaiza51izu9j5xfegzz9j1oa80x9ooh6gj12i896qlcbtgwxab487wzdxevh2hqpwtqxrl5g8kffo7',
                version: '2fuoyg1gm8dlp3y0810u',
                parameterGroup: 'cn2dww0mogvuiwgtt1tkwpv5v9s2uufj57fff30fquda01vrearup2h3q9l9m2e830vtwuen5ju292bfkk87cneoi1p90bwcn7pwgkhcu11ztaof4gtqct7ty1686lsg4sg38flt0pteu9x3qc1rvlrd8cubkirkdok02vafldvjtgcat29rj96l7giomeykgt02numnpdn2rsx3k7htnjrhqfi6w6qhr8f7lea9ckqowcgfva1xgxdb7kckkg0',
                name: 'dxmkoyp8a65ulesdcwtd0imepfvy1caib8o7ik8ialcafzp0m3dd3p2qamtcayr2rc72oknasdpe9t2rc4fch46fwgthyfsrhewzgjkd0d6ebzu580rcrfvd6azfokzzx0xn16mypn26qgprzn119sbhyodta1xmcxqgcwo1dwqhml9u50kod5bdree1cr031dzov2doezo6gd6h5aqbuldbwvt70gkx33walzw8cbnwwz78cnaiofiymxcssijz0y0tr60jxyo89k86oap0fbvbmqq1w9590h2abobqy7nz5bhi379ac1h98sf1q39z',
                parameterName: '8owq8jn1y6inhumir6hgy92mt9qmb5lb4fwll3ie9nrgbbyjsswblagpvh4s7xglqhcr0s02wzx05l8y1stwdvglj01dtk33qxh0qnbo3av7ytkpai8d1mwj2cr8tk8tkxbocbfqrdqlm4581eo9zwoqd1j5jo5sb49rz0xmjf2p2x9ho39gfcyqgo9bqy1kgke41c9r3xbzqmnqb7hpg020t5l6m2g17ktu9hx0ugeqqbhf24rtd25p3n15jq0clhsi5olg95vq08mvy7es5te8o8euq33gv4uq1cf3k42yot592l4ma0n25qka4t21',
                parameterValue: 'tylsuuq6gf03n28m1l9h48t9aajhzaq0ds489nlailq6xrvn8ta1ngz1zsrad53nbcm2c1zrvace36j3u9cd512ul06g2t46ox6nzycaz7jivzw27or903dzjjoq3l9zlpsy6p9iza6slgzqssq2etzv8rzok3d7j7o4372e951emx8cu8ozgr5itcxyg6u4ijruwin4xl9996fpn3lv5z29g2zghox4lc9nyy3yqh01hpanpt8u8ak55gg5068hkc6zvofnvmqjdtl3sbamotgn9vgxf2qwkafuvoz95solwa9fij3c4ujoda5ipl4r86qysnvdnql3i0oowe536l1fgdpqnbi3k9uo0dt46omajsyzyy03ofwi2kzs120ypfypi3hkfinidwja2ml2niydu0tixmexy0sleh7ieyldfpsdldrp4zr0oihp8no9agx4g92fcp83n6t1mt81zzdp6j1fglfekywzvnq2e55rypwgwqxdt7h07q77qcpd1uyjn65mce7kqjzqby2pjowzvw38g15ojwfq8pkt70ao2au693mxlh4vbgxi26pqdgs2rcg79i4hh6uawkz6dvqnt3tz6ris7cs8z0j8nueapnwg091tlxs23res9pwcfsgpb643vo6jf0ii6641cyvduz41j8t34pe5sff0mfajna7kaaa4f2suif03fhgqn2e7q4ueei9i3yrvi3prji3aysi55y2ng8nzpdztge37ehriktcml7cs3p0e4ovk1hept74yt9poai4l9750nyykqf6xcn6xujxqu9a9bpjx99rhtb7z1yofhtpq1tl2r0ywdpp25etsndyri4vxwc2oo3aeumn7lh8xxz91x9ow5vlua9i6pc643rwi315r4v0ypfcjbumtxmp8wysg7qul7u08ir8futaw88p39gxiog5qaoj0t8ousg87gd3e8gxola5l5fd4qtf08415rtid1ikwzi3cdy75qq76n2tvu4keype15kv8pbcswhkn',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                tenantCode: 'h89eotysv4qgoimxw9814eusirsgcsmeau7otamkhlfhk72fhf',
                systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                systemName: 'kdar8r6igld7dn3u5hy6',
                channelHash: '8uvhjtdubgn6j4bbul49pit1li7di9oanio18y04',
                channelParty: 'ppq2l2smt511v72239klxqhtmsf232xjuk2zp13wumr2xvitmiwizzm7p0u5f59hn3ifb9m1kgvsfxb23nz3vnnbql0cif4i3d7p90cq2vq5s4mmxf353gtsn1mklf0ad0mfdxnlo036pigd4iwyasia46cys37c',
                channelComponent: 'kn1v4iu427zsjjk7iayasy05st4x9jiv4snbappxwubk3g7kx3nu28bfa3q48bte76mlc7k73d7bsxwarzjgjfwqy2klibtzx2vdrnk8idkf4m2crn0q7e48t5s3t9f8xv07pcm8xa8v6fptaydhplcvhsr49mii',
                channelName: 'issuyz6p6yqv5bfxcnjgbd1kv0z46hzx0o151mbnw4ivktre9cy4wkemhfskw0s3xekmcmpdx6wqsjatnkz3fy1ftutlb4ykhwt13hy346faa8upyds6q06zdjo7vodertodoy3drmkyhe81qv7k5h4rtndyekq9',
                flowHash: 'caph3r9qa8gvpexrjo1j40y60e46ixkw745o4stw',
                flowParty: 'drozl5bbnc7fufnelibiylcyz4qfaiso57whtot6un12buxu1i2zyvaeiz70pe3nsafctxznzx0qlcw8qj3cadmd288f5rxfiajcszkmil8a8wnzq09cnsdcyblpi0pt0i35hugm4vt11sefwpdl4ym6hgfe7cbq',
                flowComponent: 'ku8qyb1az7o9c5u2wb1mqr9egt5djjnqihx3x6csbve8l4qvni84fh013zldakof9qbi3itlf4wc5y9lghqcu7li2ubaft02th9xfch49f7uag8ic1qykrqla6eqndn9z1sbm6g3pxo0scwvtlazzv6dzp07s8w7',
                flowInterfaceName: 'ze3kbdtgabgzkc69lfaxjvwc69yy0hab7nyp159p98rnbausrxg0y7qe4kk9wirhda4wlxiuu1pk7jj4c0nw7s6ogqgmhghb9lycs44gioxl9mhkbt32vruxa2kl8t4phni4faqkqmhe3ljsf9agkfqpjlcd2j77',
                flowInterfaceNamespace: '5ftbwjo7snd3cvd10gt9eenz1pxrfidtxh8uvmhfiptqhzk5l77vlliwl0vbwgym4c583ffmgcjy6sgvyjhdyy0pusq5b51pyy2o5ihdqgxnt0tlqrj2ufkzun60oy71u4d0l3tmhcrbqr14f0y3xlz8q7xon610',
                version: 'daojrdp89xcawvm0dqic',
                parameterGroup: 'k9yesjdtf54pm8oadgt5werkql3odztl2su1jbx2g5toalc6iv5dhxyre0lkcovisy5vrpe8a1fk6j9rs7h492kaop2gxvlxtbmghevza4g4d0lhmlpaynshpz6kaj43lss8x5kgejbvzznjdiiv2o38eqjeaeqy3uood2u6gs16wvwoyt3ot00v7qlkdd0c3izb3uvawib06n31dv7l7ivbhiy2frbydzqnksd4glziqlmw9pq1r5waf82bfad',
                name: 'qbve8b8krqz86ufrbxfnwkrr96ia3yrf9sddkigmdw1bs0dkiqrfoqnn6d5s1aojsmsxmsc89fzqo8dueb4h9iqauv8x21nfieln82sy7yvghbzwlqw1ejp9op1medhym6yzomcyghmzbcuss7tgtsvh3p4131ippe6grvyf8gzint2h3lx2ae7fxah65mjn8v80dkzgtjiytqndvlt8ro57ne4e0z3egi01fqnh6014lw385iix8ijjjeeec926ive398fulsovgh34wlghdmy6byaqezxrx4uhgwagijav7519obnflrp6pfsk06ru',
                parameterName: 'zxi5sa22zo4y0s1q8tznsjxtf103vlq56v6d9iuzqwpea6ixmev53t6wb20zachk6pqdguejvggl44y7ecgd18ddu6ucchen702837piqcmipsf64vald3fydc5pry1vov2m5ubrtz9ik7dyv73jtliogswqzmahuc7s8to51aq61vvj3r4pqarwaaew8vlt5z6096c6jr6clevth1igwojin33v91u155xkudoq0y83jn890l4aas2jtvddcxf0gmlrbasud6dxdse8o30grvhmj9tjsubzt838xxm6ko9ik7qdt8rnpx6xbr7bmkq9',
                parameterValue: 'mntltlnrjma204c684vlmr7fj0h1cvn3dlikyopbtamnqf488pvdfldxcgrdrnn5ushfk4t5si7g0blsp34nz6vr38dhqs6sh4gytcumu5tfm7z4ycqhp60nc26desr9julzjhlo5pyhx0kgkzhbr886crfix54szjecikya0vqfsnkv2htsruy6mx33oojliqxijqa1ufjmz9eaoc391kz44597pzwxremeqxzr2ftd7dlt7ba3gnlgag6j83phzz7ypdb34vrdae53oc23fhwss9qgir72d89yoynj72o2z8xv7j0bil1fyy6g624m40annjk3dd8ezvem8quty5xtnev0raqm87603xcfw4k5aqbrrjolape4entyir9omxb1puqlba3w021pwsfad1s5zp3gz73th8pcvz6cu6tvem9wxdagjr6mqwt43jgqz9uqxxpyxyrormznov5rv2dhou01h6jh7ehxxacotfgfze346k5dkvxyh7hsosf733t3eunp08bvc3nnv0g351ql78qdnv5kbw28duw5jyjlilj1ro63ek5gcoeg99bl9nxvkx5yyebbgnha47mox9mnt87lsz20rja9tppbs8mzawls27ey9sn1cnf1l1ptmd1ykx21xznr694wo9n1jb7xugm7ueo51uzkfrdit37659wnnuhcwj5qzpnzlldvq3d4p4cwz7b5ot54adtnp1h6w0ewzpmbqlova93ibdr0ogel4o8hakzgbxtf16t8i4u61wc3rleeegx2dkiem91qs8pde3m3ksx7gyk7dfvok6bnzva227u0ueohfkeocpgwpsiq7qqy0b65q86in076hd81s89xjuzz477a1b0sxzj96dv57ra3w1wmnlkouwwkmhongbgmpjsahygz39mu20m9l1dowctbjauab43q7ty2infdhx2eoa6ahgt33es48jkq8g0gp0b8euh2fqh6fheyav8aktq3mbj34xradgh7q7tau04aadyksxuw',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '99ac10e3-5712-4ac9-bae0-5a299ba548c7'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/42fd0f14-0d06-475b-ab4a-adf56380b8db')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/99ac10e3-5712-4ac9-bae0-5a299ba548c7')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1ce71d37-86e5-42ad-9126-bc7228deae86',
                        tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                        tenantCode: 'gmskjmxlwpp0qcx7v8e029r5dumqmmzxis71sw501ellhj0okg',
                        systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                        systemName: 'r2ejb0gny9b2quq8u54c',
                        channelHash: 'p9f3qoze03mvs1cce4td5yobe8ohsyhagf27kt1n',
                        channelParty: 't85i2j29z1akibu8jyni7y66k8e53tbxx6h5c3mn6kkflwn06ehj2hl58hmpbdjxhdy8bj7pyzg61ppeqmooucehs57iqk02e1xpi1dc2fqcqrmatsm487i3rt2tawevj6mn6tt55n0slc9mjg30om0pj1tq54gf',
                        channelComponent: '9g74dqyh77wvcbr3fpsc132ef2men06bnquu3pndqc9ryhi24ugoqcoaplb44nuotn2gfpsoeerg4wuov4ohldufyyrir7qfnndkvsuclifjl81u1n2qhiw0r9s0a0u3lxdmvjna7j5vqdln4vi553e1wvtawm3p',
                        channelName: '3w5ts8924pge3jrcb95234rh13kmdk47hmh0qs3wug0t9zlbdze2yolgj358tg4ss12i7dzaunjbfem0u8ifyaxsrmvlde4hnwjaoabx8l72et07qz90a88mgtd9fi1q146vpb7paffr8fq5z6zdtk3uxkkdplq4',
                        flowHash: 'vppztx33ebumz188hqi20r693ds0tken41o06hxt',
                        flowParty: 'm624b03tzjri0s1evc0rkyl1dpw1lotodxu05xl3t8fnxszn3qp19e822dh2496qi2x74rhue2opp9sb6rumvfqnm76h4qf0hbhfvrmq1s5db1hp7ahagu8kej3bb85ji7ro66vxh8325kt4cjeaaaviv58jjpuc',
                        flowComponent: '89z0umpedj5k0i7ut77yuuut066qylcu4il0w4a9bkahuuw7i0xlklvyrs03gzt3bf9579l3vkcupt5xtix40r59j5umhua3vlxzwamjv2vjvrgw97tgykg23ooec4d5mrjf8v0e4zytnz5xxst2lo7lrz3j2c24',
                        flowInterfaceName: '8mlnv53ebamo8wmftjuhb1uj5qh94v4vsbi1lr1v1xpbvrtnadruv15zg6di3pxuwr6alk7qwtu3sl3luv983ktk66065oxc8xbzc26qj19q9jqhdwk1iqttmz6m3zmc3vhytkorvx5drkkzw50m4wh2lz864arw',
                        flowInterfaceNamespace: '1bwufofzn1nvr2hlgifmxtwolztv0ibeksyb9o7h03cix5r39ujpgn3qbzpv72z269nwsgps0kj5l8sp0d1nuuok4o727cbfjb80o5x51xvczjvsk5q7mopogskxsoa3tntey2z34gzgg803ifr6g4x1zjboaph8',
                        version: 'gjlq0d0d26lxb85165sg',
                        parameterGroup: '1lusut6wql7p4nhtjrzqmmpxttq0avon9v833mwa3ghr8er9q3g58fjaxeu2o36653f8oaq6h4zd0oz30zy1bs0chs9ycol0rp8lkjg844huzq1dow6j8plhhahqccffg2j8ovjyfzxdx1z0hnq5hnaxxlutlbjbc4ngxzpxscvrol5uvlwfoamp9uq7wdv77hhi6lqvk8kaojuewb209hfeqavxyb2ap29u341hu6a2fqif256ewymov28hbqs',
                        name: 'hoopkmrcbcr3jq5y0bhpl6k6hz5cpcz5z5vehht76qoi1ttlqboax3u004klcdlv6ah555dy3cbo6ggmxrowuqhe19b7qb8cnqji7l7gimfj54es7r5n2mtrdcncsignqi7nxnzyxddwwn7k1yq7pu552vsufnwzie84or1i9u8dyyxm0eqyad3jh9pzarfc4kchj9mw65froklle1bplt8nh9zlhf3nyegibpqqnrspe820ago102jggmtpi9muwgg731bnqjjkpw11k2h2pv19wp3jib3t48cd41yauzatqg0a1hf1rjczkiraswax',
                        parameterName: 'e366rljyj8rqo06l2fupka9ifedzxq14jhgm55akimc53jax75x4hv14f9tpel432uwcwuidpbzv5f1czar6vdhuy97a6vg7ezvq57l59w67v1xh91mjddxs0pg6y3hsxsrapu0i3io4q9omnvhlvkgxt00j049yubo6j9qb14hdg2lo75v72fvf0xzhldl3jjjnd4c5klhz7kxnh8jveqa54jrody2jyzcia3od6msewzgoek2v0ftj0lxg1fmh1psv4mqg4pf7cjk3n4kkjnm23zn9cesuzxb9qox7d4uofqutid37t7kjpijdr8v8',
                        parameterValue: '75vda4zpr6h5esg6pq2nanfxiehl05yym4srovk3i7nqfwtq4yts91ybtga73oq56e0gcnxmomzd3wb2c7glxcd1n5t8nl0qskwwtkm7ggp9sy0tn9ieehceqw9lt0ilnob3tnaxu88vhnf3h82qpk0nlxfi73jijdm6kiir32bas45l95t4ouzupcgk3vr5n3lm862byl0ysdnm52o80h7ce90e8l91xsjllhirj3t45yrxrd4rummck0nofwjqamhw5a53db996cucco9c3ht1nwyw5hv1w1i1aa53pcv78z2iq3xfxrz0o9d208bmkt4vumd50now3kq96gblq4c2q01boakqzzm0gn1os4m7pi4yivx14cy60k3a708y3edb7foyyrvml3s09vfn2f286xwmp0ocrc18viy7br53gyoaako3622z0r7wzu8uvxrvaxcqxxwos9jtrf2c27obce26vb5xyqo3bwdskjqgh9knahplsnbjeg7f26sdij8e9cmjxrkjh5e7u6hfo3qw8u4kmd1m53vn550rorx2u4pf93ih3lykftbundrlisca9mafg8i7ugkx7b5b5q3um5gvdzremt62apabj94drjh8vljezrsyld6t5ak7wxljhlmhqt34flqdy3uvij3orh30ebncesx0b8s3j10luhum2gzyx4wqgfnhk5dw93h7l644ehhg1jbtenlhs2b9gltunlnsmjowx9oo459itj1l418kqvfbtn7zbcdodaauqtvmcoiix3csemv36wpzbo01l2zv67et28j64d972141hyh1pdc99jbsajeaw3a0u5p6vg2ocs6yb26gdi62xsnf0mby0cnfouoxs57p3uq09ihfrza0lns8s7vma6h7o02ewgidul5mpf3zw8yvvey8ptex2ew7zuq2opc976cys9be6g6g82002723x86ah753emyz3td3i87woke7b8aao9a15e16wchrctxnwrnd2q9d391v6j5crg0a',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '1ce71d37-86e5-42ad-9126-bc7228deae86');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '5b4541d5-312c-4c7c-b948-21e3967d3586'
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('99ac10e3-5712-4ac9-bae0-5a299ba548c7');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '182e2fe9-a427-4d87-ae77-d59a8278b642'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('99ac10e3-5712-4ac9-bae0-5a299ba548c7');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a23d3aa2-61c1-40dd-815f-aff6e061e375',
                        tenantId: '5b19d06e-1aeb-4d98-b220-ae12398bf034',
                        tenantCode: 'fsxv1mf7mumfdm1s1nmk64g7h69hnc9pj1mgctgau1v26ua116',
                        systemId: '722e9980-a6ba-47b0-b78b-07f0b738b4f2',
                        systemName: 'trfzlm2bijbmq956fmfg',
                        channelHash: 'iul6v7g8mbzxo55798m4zjhet1jguohmmvx7o5z1',
                        channelParty: '3sddhbtnkmxihxm5s7hu74suymbfw96so1q1mgp2w93dg87a4f458d0iw90vyb8d83z5idq31lv855jmzn9gim0ugt0q3t9vwh7t61t7g0hdhz27h4x9na9efr4omsikkgbiuxm938x5jvypiu6coppdmlaj40bl',
                        channelComponent: '4z3uhzi25maw6lv5w0o8aq7wxpz1q3b1kv9hgcmuhs9paj1ob1br1ps2jrb2ucepw785u9f7si8b3d9zqq9oe34j9zbrh4c2iquho2a63jy2aiwphmv85uln1re4ixx7i0betpr556ig4htptpg94ceijzxu6y6x',
                        channelName: 'h63f94xtesx65d6nw5p32uwij9t15s1ayufteffoliln7rrwtwbfdnr362c10ukjrnvbe7z769wgjte3fyd5bfjxtb76e5k1gay43f0qfoz7b0dazqakmaftk3t7wkk2cji7naqw6ppbkrfpd8ad2jrs83ogl1p5',
                        flowHash: 'ch95im4xm6q05hh7j0p6zdrsdom9wk19gel949je',
                        flowParty: 'r7o0sjczczdd8fqv363i27jeiiegvmfzfkop32kz58y17y5bfqd51s61h3r6sdvzi0ea03mzzje5akdzl7fu245orui13vlwbbjjeuqefyek3nxpht420ut6g0j1jp16q2a2l33j39n5g3t9f3hgmt74e589c6zt',
                        flowComponent: 'qakfmeiwwmf75lzli944gjw7dn3e3vwzcayj2xf81kqavutp3egx5u67wonry1uov7tx07v96cq1lige03pfsnu2w10fv4dc0s7cxi0si8thjy4f271fuucvdvv5u9of9fxyfq13u126ur8kom35mfb79gu15euk',
                        flowInterfaceName: '801tu4w5d2oowwq1z03z5fskciqe3mcq9hnmnwect0483yt26unpikwaqxffsq3981qrur8x0iqooj1457mlmhdi9o6q5gi36miecivajffhgln8awbogft1x3ygs0v0yucv05jjq7jek4v3nzxr4rfzrvkwhltn',
                        flowInterfaceNamespace: 'bbz5ajbmmz1ty9twgqmxnwqjiiuvdvpoix9k5lsobn9xpjwkix2se1j6ju8pndegrntrlevo2w1dqya0jmhir3gikwkebfjqcfokvis7entt2iek9inic5xwoiul8fb46e7r7cgbt2ofndp93dq8j1h438wynzv3',
                        version: 'hfyf6d792tjnijwcn1f6',
                        parameterGroup: 'e3072fedtg6kxf0q77mazx7djzmra2zr9wbrgy08a272y4e7ivy534jycgnmluknci8jxy1xch207qrkffp2iqlykwrtkebq44ua8xncdp5cfe483weafv31a3vseuje47uzrpiz2ppa3sf0hbnidhw3su696o5vcu1fkl7nw8noo0qcfwdgjem9htpru4li2sffxhue7bf8s1pa25xovfr00jirdd63ydjtb3ou467xxkcfs7ojcogmv9gkvbq',
                        name: 'u3biggzmvquif6oiudbxljqytux6vmxdiijrckon0fqxlq3o20kmq85ybhdssfkbukcdeg07nbcjz36c9ujvaop1mhv2rwhrp1n789zdtjnzba9n58ufy6yu5z5879wwx1ye7k8rdh8pw9tafefua20ghuykwbpkz6llqkg87h0zuogjs438s6mxxke41lzktu38nu1tx86gp6cyxd9vi8gx7081kjk1pi253yxm86fhhdr02ee5mvu567l4zxp87dey2ddxy0d8an714bods2bxqp4vo5ik4op4nb6m460bzolwrpzzze2y2mvo8ni0',
                        parameterName: 'fm7gnqh8g35m96hqgfbqyywxtikozeupxgn9ww7t241npbvdp2dqedwgvofe7nkb40rnxgi7bo01zdgzx1dga9jfzifp0pfwxmpftomesmoy9u7f1ajhtps8gz05bkyhy01rv5ptopobfc68udb3hy1u375plzjyzrmc1s38ni6a5z45xfbdq0qqbcpcvvfnt4qad9ebnxsn3rz73n0ika0wmbm20tnuxfy5n1mycz945d400b9df8l9u555m2afnlq9ptxfy032c8nyv8z3tve6bo7ylkim4g6lqvk4vi6zwtcoqnv07nbkix2030ya',
                        parameterValue: 'fie3rcohiefhuu90d4xsi8qmh8u565imhxzb4gejudt81wn2euo9m7obuvgrc0mtewccamdgfvgwdj72djci956d6eeul7kzafjhzmf1895vxbidxf1aqh0v4yjz7vwf0265o6wv2hd0xcwly17h28e0omyws6n9gatbyfnr56zaonrmovhkt9f2q5d7vki9xjupc20vnrc04frm5qwcodbhpo8bxwjj7wxyuhzxc9tclh6i6admhymg304kvsknxuec4jgqx7rfds5cr1imevxwhgxarqk4b75mxu4wi4uvtqen6k3f6yjqxrgijnmmm40s286a29tr5p6qhxxzqb97z73dnpxah4t5pucpnmcdnpn133ed9ybknfvl4xaee75al5zhm5yk9wzi9p36jdjvviqlhr1trmdz6pcrfin1gpi36ipzujzc8kmtejq2yft277izvcnt07u7ol6zebnv4eajwjtua3ocju2obmbluhepoxow6lviqkb01p4dhsawv69pryexjhkzy05rvatbci3d8q1l59ndjvyxik8bnvdmxt0e0e4hgxq52tjhvp8xc9zpmssmaoi082cz9wfpueiuvz3zkbgxc5rqtvjm15vvqh0qt51je2sdrv33d0ymcmhplp0ca7rj29mnzg5vcigam2d9ymveemsrykb3xwt6gyo28yvw96g6aqcsg6nxhm9jxbug5fs8u6d5t7u7jgqnidtrb1e3izimximj3x0ad5vdjoy4dmlhhl5bcywmb5pnd77hmfa9gn9h3qnk6lgf0mtjs7hozbuz60u75m2gdd2pwkae8wsu7qt8xaazjisd5nt77phcwvf84t0ozwiairewehj21vqf5safjnaazvz8z31gqdmzm3svm6gc6po0q3kq2y9xhnfc2iat6suen653nmhdozqnzpauh2uuhobniz7r8965okn452krq9dcq5p1yjy6hdk1rsq6scpg2ng38igvqbf5l67t67wiei8x8mdqj8zez51y',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7',
                        tenantId: '26606de6-1d47-4228-b9e6-7bfbe97837d2',
                        tenantCode: 'ah79uebvuthct6ghzos76vht95dzhewkcd93ej6f1diw09vlla',
                        systemId: 'df315455-a321-4647-aff1-ebf23d45dc6a',
                        systemName: 'w0at4yhemxlfc98avyjm',
                        channelHash: '96kz32g9tl2kc9t3mg865libs41e11cjc2uc7emo',
                        channelParty: '10b7ot1lmi62a9oorvfnnrufkk3jh2t1fhtldea7v0i7mc5sm5fpnk7rcq363z2a4s6yn07982ucedfynh48e0wgv8qj8ddcfjl6xsz7tx6xwm8x3ltl6t13z87fv2ittohn54h3fw3m59swz5obewuzfx2k7buv',
                        channelComponent: 'q7sisrkqex9xbnclzvtovexo69gwb6mm2tysod201tk2ahebeozwqee8ys54pdg7afh5j556ou0k46usase9ftavyvir1pjxcq8sxhi385z8ttkfl3ah102ro86urvr3pnzntssqhse65yk5mb7vujnjqxnfchva',
                        channelName: 'h4l66azyqamvrgxebm2jrl3xsc9cg7n40vca3v6jowzzggm4fe9qs8hz7qmduewhr4ah2lasq0oe7v6svn7qorqd57j2kojwm0uolisfatl6q9wplw4dfs03xctg9m4cjm7vwr9v70yvfcbm9emih1ksu0g16den',
                        flowHash: 'kxj5t5vwu44c3z0pglbqz6qonphg0jzrypw13kwb',
                        flowParty: 'vcl5v00g6wx2fevrq08fek4drgoh2ltzr62yyom0ad1m2gr6nggv191zjvyzb5mjje5u3336qq172i54cjernp2712afc5cc23k0p6ua4nb1o2d0hjxw9ekbofuaf7d9xrsxprqf7jy4t6cgj64lkq0ab4c8ivj3',
                        flowComponent: 'clg3m2n31u2w8x5oipxwzf81vcar5t8ntr2en3aya1tndypktfzhs07csjcj5sukesvueptsry4umy3riiy7ez6h8l3pglz5y2683o6y42px7dplfm8uqjryebtd39wdw38ej0db28jcfah968dfm7yo4xd7k1hl',
                        flowInterfaceName: 'rjduzazs0sujub55lk7asdwy2cyc5pnag5umlwfbdwk7f38pgd5i2x5pcw9dscijv2dpqwnc4h5v8bkjjlvh0zeab0ubjvxjrivigbh0s4ob6z8kfcywdft3nqtn4gddqidzwfs8gzasltyg4cqsk7bl93jn9tg6',
                        flowInterfaceNamespace: 'awpqu125b2xjxvtet910saa6kkcqb4oywiolc4qymzl22zw943i8vvx7d3pqafr4mlecx09aogd10vihewjpux31ld892djhojl12zl5t50iun37gpphmi7yb7oazn1zz90bmqf438rx0ugd1fnhv0d1kbqtlw2o',
                        version: 'dyfbmk7cyw0j7q1m47y7',
                        parameterGroup: 'n1u90pdzi1et9y4g0wsmt8fd9spbjvswr2bbi9v5g16gtr63xcr63tn1wjj6cois972ax7u1srja1v4ogynvdhxr0gjuj7rd10nrl0d05ngdf2ack848spg7zxdjmozbrjv7b6vewtlbmwk5lwhj7sk1o0wz3d8nlu2bzwmkfc2ojf47199u82nvxm52mx49bw6o28ggfybxtdk0m7n4szrzaryqa7tl59j3die3hnndlcyliqg2w3y8yqg35lz',
                        name: 'x424jvfy51wypbilkjm688jqu9zozcvklt1s5yq4681hfuezdx9dsqzui6601uueon07djoylam1ig0x134blyqreo05k88r98o79awmut1p014biuud97e52ij1vzuzgvfkri75y8ffzmcz9fmkewzf3o5dnsotpgumrfqak27b6gme6xe98ogdfpycam72wupegz1jipj9im3lzeh491cine0di1nzg8k19j2uia18m5l2tqxin2vby5hsnw4k6ojg1bg0yjocggy2hg5ksgwvevbsf1gjvh695a8fgielnfjzcqf3edvdr15yitjp',
                        parameterName: 'j59uw8kftiwxgw8z9ngzqcktcr1oqaojv8f25npgfc3tqpp8h2nhcp0i6fwwwnym5hl3mrawms8nuj3bn8x88agnbi02ownefyngtbe5425luipszz309r4dxqvio5hlz091shqk1h6oxh1yzcdd81xkw4fgb0e76cw5aufypkngwchibfxizh9vwxmucpp01ycsrty6hpkhio70b7ejdfmnkx9x6k5mh0dqr1s4gdcxp0te0b08ncdqm8utecngfynqgoep0m6n6hijwewwu76sw5ha1ajve4d028q7m8ebqkn3eaa01go09ecfdf0x',
                        parameterValue: 'o1yz1kuejvgdxxent2aavvxj8semvdajbaw3b4ohecl02yc0tn7v6l4osw5mmtr1tzsyfyncin2rabpgfys4pw6xj0f07i4n0zr20quniv3t42qk3ynmdxrahkesq9pxeu554u1w2e2o8aspzix6dl0qmhp48jgz63anpe6g8k9pu7uz6qoh14gn969i60r3y6dnwj0i9rozc5jcxmswa8r8a3d6uy3df1s01c9p1o6wb2c2zj5lck3qawixu218zfe9cchow5lyevmsfi7q9pv4wuazwt8s6qsaxhbqgsyzzai3b2xb8rkos1gg4gejcgo4lfz2b3pbje0b5gezaawoa8ljptk2isapvcyfs867ncvox6m6t7w19gm7p9bm1t2uqk6yhsuy1kmfebeiivcyq39tqmx36grw0uwu8qtzeah9hylkawfwzkdwukgjzsnkrvb5a4rmt423maxr3hxwm2ymggppp5r6uu8oe1zgvffu05sqm168vr3tmlp3re90icf3vg2ya29nzlzp8111nvw49wm1umtnp6t8hb15ofiqivd5mj0vn86c0ef9l7cq7vw52z58acrhbe9kldak29n7fs4mweitqgathth2irk3bwjnegqusu1w2harv6bjqlgfo32pippifoqpf4e74g5n6jxsgogxi8x50myjtlxu0tuiiwa91o8a3ahtomp83i4fj2w9rikdnlbr2juzsezccwq0okd17kwh4u8idxgtqzy3m4i9e2w9m2yjfil53yansptd2l9mhzmxgaan4gp8cx1f8grn7vbxb7nsl7o5a7p8nhl07ggs36xuz4e94i7arv5xlxlir0iwcuf0ry6c1p201fewc7eekm7ev2qt91ysq1zmsc6bb5ibat1dh074k92786rgvdrssxf82q3u4vq9ctpfdyjvi9yxcsb8gi0mnjul14qp69c9dguetu729te2vzzafd1lfpybsx2ihphpsk915tpnk7g00qep7gu8fby4f4o9z2n1',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('99ac10e3-5712-4ac9-bae0-5a299ba548c7');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b3eeda24-a4e4-47da-92b1-58b7c47bccd7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelHash
                            channelParty
                            channelComponent
                            channelName
                            flowHash
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('99ac10e3-5712-4ac9-bae0-5a299ba548c7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});