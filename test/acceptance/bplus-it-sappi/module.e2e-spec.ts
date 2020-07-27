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
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '7fq3sb45uggxyj0iwep4va49jx77lyzc5ri9d2d31295gr0v80',
                version: 'jzkdbzqmw8x4psb589sv',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 's0zb95jkgbk50wjr8ynp',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '2yu6ak4xoa5idc03ek12gu53wsotr1ltgdzrtn8sqg0zyodxqqbk84uo0efdrvesdqh0ck3taf4bwxfgxrrad7o5hfv9j54lk89pw2rzg3isnop3upx9idkke4gp70pu39w98rcear79q7wcwuky9ghkudhmdy1a',
                channelComponent: 'mu4vut6yggy2r2cwenfl7d5st5sh9mo1oojqz7akfx48wersieiblt7ju2hqh0gws78c1jqv2w7u2d2fi838ekevdzdw97xyi2l93h4qbywf2yiy5zp4amdtg8bum3u410vc0ifjm1jl2i6lehakc7znlqgjcfsy',
                channelName: 'z1raqnz9frqlwqthgwjomgqqz2s88rvc9g53zwezz6v114smip1wam6k76u43hnirlkuwg8kfy15js99jjqarfobz2cqod59s9s5lruigjib2clk0usabmuchkvrioyvtfdylvkfxpf4k21ppw9dvempf9sjdid7',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '3ot4g4z0e25lldqaonebmpoeoi2x0bceo8vb3zkucthq8pcmdl30jn2z1mv5xm4oqi2o446adumjy6xojzjllaxmc4vj8m00652dwb6nbc0r8moiult30q1jqpz37u6yum7hlzqoptd2pafae75qur03ni5qh82l',
                flowComponent: 'jyf9kuj92n93i2nluxkv5j88tm7n07oie448lmahlipmetzqs6juyww9x9xm6tsyhof8a2u2qhk3dwiglf5bv7ydg1qwxff1ch0gjo559qva76hwd0khhr30hj5amy1ldmiahsno3hu4ih5oyon70kn9jbzo3p5e',
                flowInterfaceName: 'xwkqw64ikaix76o6pyjyq1blxiz1nde4dyb3t36esgax3atcuikfx8851zub9q2r3fjje2otc6ybdnpo6ibl08w8bs2am0c5xiz1pjazuvp7md383cw02nvryeemzd8qrvw1622iro4a2pnaatg4dhto2afs2530',
                flowInterfaceNamespace: 'm41nfetbvvalvi0blkw8zi9x21qbkl0wic0b14e80e3vh51407dda5t6nlsq127o1o14d6s16ecmj6rog9etl7x94wpj6mvxp6t2uxb2xc5j3sofcyw9exzrgefzevbfmn6f3gbabckzogub0ip672dk0v3rzexm',
                parameterGroup: '5mh2zxqssdbane9jfcnrvnov1fxfyyndq944zhjtl4t768lvnkekxvrfezzl4nwu0839dq96tgpptooselcxpqmot7x2k5fzckihlakdk4mbrfshxvlbqxblm8nn3kcj49wqi8pgista0sdew9yis7v1kxuwacse5plhe1c6o3a0wltpof5ti3wp5nmp6bx161pxzpq8wxdl02bf6i2ueqrcueslsrus4qsjiww2ooppnifr7tj06q16kpi6l7q',
                name: 'do1xqhtqeznh77w7khosbp7f3uberu2y8y31ejjmdsr035r9jceox0b73hw76ch86zwvpu7o3k3o39cpwp3f1ekadm9hvo47jic4i9q90hot7i8m1plm4y67zjldvtq0r0j61yquhnqoh7pl4ohxlcgxupbjzw11wgy7xnt36hzpdxx6fb2apgzbho55efrgjit3weh1m334zy4heetd4a93ge1iwjp9r6xg3nk489nrcgda229h1vocb0l5ugkjlzn77kkk7ws3sernsesyxlwied616k4bry6s5ngv6c07phc16unxrqfxknjuhkth',
                parameterName: 'qskm3rjf75bvh6191poaep1orslz1k0yh8bzhknrolvocy6k8hau1nphol3ykgg6vqwxzmvutvd18mznjqobjkzlb4s42kyszj58dqubwxwszophn74cyaae5lbl15sybk5sq8jtairf0mj59jxyskfur4bpqhza1096nlfhvh3behu263ngffd2p4v57j8nan48po3t3jnxj91u1wtyurl060u222o3tkvld1amxmtv58fgyfryh0313zfxugwiqyc509nvkzisthbujkescfpg2lcfhxxau4g19kfa3ogaynnozq62nskzx24ou5s0',
                parameterValue: '9t1wkzhg3phu0nx2z4kbt3cez9vbxwfzdufjgr139m1jl9ej0gm7x10hvob62cn8rbj8qopt06o1bj90jopkywwxnyf3hxjvsh2b5b2awnokaatba66qmiqdi9wccy0pa079gdczdwb1nlnsjbg0so2k07ndenmi8coaurktf779ei1aeu4038phnl6sw9kgamq1z5hm8eng4ay1mhi0j34rzvkie6wqmc1u83axo78zbmrqmi0pqgu3o2lg0wp177d7fk2mdwz5ap2n7wk93j8z418s0mzpny1lfc1ok9z2pth1h8h2wn0w4b78vg6ny3hwxpggya4z3fb8axr9egn3n7r8x8k5majkxxzayh9jc9vksduaclb4683mfr3qe8gxq1vbsuy3k0p9jtllapqqcups9gu7uvvitoiq2oh6q6p4vcme2c9hrzmmn23qxdg2nie1rcw2no3aq86w3vbwh5gc1v6lqgv2n8v4cxkp6qnwcz4lhphlee319ng9kpsox596pc15vo0ttjnc2p2idsr9be3evg8igktia26au28iuf2rk0ju78k7zi2jsqtepmnurk93y53k0ytvv50kdwxve4vik11l2mi20hbkb26besvf7fhpx949kml6jxnudnjlknshvv6n6vc6p6ogd4h2vy4m8bdr0me05b8vt18wacoc99ppesntsv3vl3gcblj112paau9trjrtoc39tploiu5kx4uy88qeyc3qmc38zq8cz9e2f4950mq0rf941xxvrt5wn7tf89vy33a2yxbeoak31n01fir1efrsvicagmr6u60j7cailp5a65658tr89fmz21zp0rty8xp6qonzc95xzoc0ikvay7qmmzig4iouwwr4ygvwd5i51xw9w738pmia5ld1vky3s3z3qiotzlcp1xwzx6du3ueiak9ltgfq3ujcc7gepp2afmc4i9o7ibmmtnqd4x99sk6mnjqvu4gt0m2juhljvj8zs3sil6pdb98s6qjf3wn3',
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
                
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'pyajnfzagjqtn6lli5kfi0y12jiplw36qqil95q2s1kjbpo1cp',
                version: 'sdzahxspugd1hwrbg063',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'ha47j91tqnnczlr69jsj',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '9yp4lqcnejey3uvxh43qc2o3ahdxucbpi3zby1sanwytdn7ly7oulndgw1gdajotvqzu7jp6t181753u2dsw08tqy20o4jg6qmyvrt8zefdwpfyx84p1unwyf953ohxwj3181l5oo2n9hto1n4rb5byah2ps5puv',
                channelComponent: '7btlzs26ocw4rcx9joxz9pmz7em1eb3ub7gzgta4ljx8z7pjmmjw8envjtwu5cg2dm11x3vi4k4q5z1voqlizl2d20nokqyzo4ycgusgn2x9y2qzlpxzud4ifaxoosz9aw5fa6v45czp722odg88p7caqwe3467q',
                channelName: 't5m3etol9mml9x8q7alfmhrqqdjqrjx3c0jw01gi4riyatf3yokm0ruln03u0ab8etycyptyz5ih93wfq86huhkujf8frue42rx8g9cnf32mv73v4wacados8nvvn4zstaa01slqyusijhi9sc5atacurayjfpjx',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'b7t9kfonjaszeumr1ith71vvzzonntqrm68lio11m5dzllg0ikdaacssjudys8uazcw4vi4wu8q1u3tsi2e8iy6qvrwx4n3zd5hf0fqxgommru9rukofdd0jqn18e27g9bgsi07z5ejkccrvdyird3gpm5i1mquv',
                flowComponent: '329ffyfudklv72d45z8pc7wqxnfs8ssg7gtxstik3vm15cw609tqnmn395w654j0x9ld6ti021cbh6lsk7f8cgl5ig3pok7l5bmg4jzl7c9gz31fg6060vj519565ktyanw6dvslsjkvwx0ah78m67gmg4hq0fp1',
                flowInterfaceName: '4ft3r2e2oj4rn5x7x3il5pn6dsdr1zzqsp5oxunjmyb28jplnsldndt0d3wj7338wl0qapu1mbr1wew8u4kz90yb36cd9ftg6m2pajkhdz0lflsdjuxc3887l932s1ne32hz22pv6udq4m9a643zrfs23zd7digh',
                flowInterfaceNamespace: 'jc70cznwlbtopmibcngzxc90st9dlcdmss6mdnksabsm0molm03mz5zsokx3t19ohyk00mhzbw9q0l6skpxplxh3uovgw6cn9y7tb53ugidrsi8fx0fz2lxgl0y20otsk55dghv328ep86m9kug1pzuqffkgnrn9',
                parameterGroup: 'k1e2dbpr7ivnxt862uwb01ztrqw7rt0u03k7qa20hl91fakdkzjisx12wrvp1tj5yc6kuvakqvhvpql5vvg7hnscwfq3cihc3una8owmebzf4oy1miaza23c0y38y8142wpal41x3bscimjdizeazm88k284ujc9h54t73yuunvgpsn2iftmywfyaja0up7bbo9hewit6ub5977t1gdyvrw0re8eova0bca9eaambaiefjh9z2upbo00yb6o4bj',
                name: 's9kusl2v996w199f90x63nch5nizj49b0hq06cql8g6xqmgddr2e5q4ghpq6e5qpkmxvmxsu6xilhmhkowlwozyhat1tu22hos8kh392ji08qc62b8xdpap35mjc0o5nqsl6v86wbwz56bdmtqmtx2v2a5m3mwq01m1bldd7lexkknhh3s5lkrc78vli7dcfx201uiv5ouws7xvoagdnw0hgmw3hhdl8sut96cszthw9woc1hiccmlqdgokgwbaheflzg1akm0zk06ml1asqg8777zvhd0x582hx4qna1st2sx4gsjov1nmcxnkqq2xa',
                parameterName: 'ghosw2qway3ksspy9r4om89xji2lh4p2cvcobjtkchyioi1ggixzx9zzu26u7yu5xvwjbgn1pjcrcz497k0fee5qgg07hvdzbdhviie7fy49qtypmvomql2gw6jqf9rczth5jtikl4cx96bf7znpjr3yn1wytespvfo4yk4awam425hjggtfizfpm2gqbsdbur6yyeo62ym2h0zb9k5durp2qll9mgmlb6zzjb7kgw3vztrbomgmpfzbe9l53yax32kuhlx1ftzcyy28fxmttuv7zdoe83ri0f0we7h5i3wgrm2lx5r8ropyr6x53fze',
                parameterValue: 'n8cmt9qfbslpyl4jh25xkijbscbg4qucs95pvof0mz4ynz6r5hkdlam9whv7p2v1ev9nth0bpb18642oxzq1kqk3nha9yo27zefsj9qkz7211o7mpy4apqsx4xl0bi5soaxakng1j535oh3ava0vlrj2rg9lcgqohi2ca9anj90fcd0mmcfza6vfn1eqz8hi6oboqx136dzz3qxzk6857cnsjmzrrv77ao2hmiqh1ela969cto1avwj7sli5b2nsgiue7ag2i0yzexcfo8f8u92vhz1fpy3dk13mpk0viy6awhcpo22hssm5owy1zl58pvppnu7pjqcgwrhjzbmrucu3vxxd7idanzm7dlelxbghvwlxi37dm5xqf0hllad02332u237pmkxfci24squzplwsurb6mv569fm8a1m0wct215jlje2to9crq8qzgl1pp6qikg9xnpefk0v3k11yte7qew1tid7k9fe9l9bad9m301x4mvy70qrqjp1147z7c0ard5al73yd5scoflp6jpdmyk1zk5rvv29vr9kr4josd73ef8cmqxu0saqs3kcc9tu5kz5rx6vyh2psberbrvgubxhpz9bbpnm07q28y3h80au57iog7hhniy8a0b6ml44ubqoua97g78jvu2vgl05xbupvq1k68mon1ljyvfwwd27ozqeiv4dm19a9if690n0fmpzyoyh0awkff6ipo2xoxeu0x3r3ba9ptghm7sg49w3q6vnoo3cmecm7jo4e5v772pcqzeppcvddmf7z6z1nwa1zxavrfnnax0tbcqlccvu3a4xkp9fq0v7sooi97dg3ksviqpqjcxrbxq9yb4bl6e8fcitsal0ctcz7bdf7dverd4u4f6vr17gomfi8ljpgonpo8xbsxv0wg1guxymw4gqz71ycvacmpo0rfw3qfnw99gdxqzjnw74c80j4qgqdj51y1ge7wv4f9qcvnjk1hvb109ac9icev3dzhwydji833dh27rnka3uz0p1',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: null,
                tenantCode: 'g8vxbzv99syv26ed3bmqo95n1r0bzgw4bmiqgklbj82w9nv8z5',
                version: 'zk7me72tn3iff0tun7yx',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '8ng3zgl51yn5ieoz860g',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'taxb3h3mdrjb0gq37shs93ha1hw24dqnxnyyj1t07t3igqwm51vs7u7eflhx0guixgj2fzzwnxob0zml7kfrlpoghjx6fawtwzx601bgw0igalmkt9d5v0hithfc6tf9ohwgqcnzbk6gyiosgcvrmjvjflkkvjen',
                channelComponent: 'ipi4sysz1k24xktuynwh4bbfecxldaog85aycuv7wadtde4rgv2pcs2b97uvondcdyk7ywbge168h7y71hhlmx0f6e377fq0xfjdak0hcg8ybeyj1mend4f244dsuvjvywbs4g3h5t2ky63zso0umj30tjhdpwhv',
                channelName: 'hhwbfgqojih6lm6mepno75gc6k75f0sy4eicgcwtfw9eihk04q8nmoq5ho02nmrl6yusyd7cuvaafvmaera5kitsf7xrhnuwpf6xbg5gt782blw4hnh75ox3ev0wsa3419g8itpvkjsa30jxm6xr01bd7flzqbjk',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'uti16sydehnlmlthbrfpoq2cz5tcsmbjspsf4e4zdpjvmdcvlgvoaloq7eh71euranl7xb1z15owrkrxd6wfp2ecbis0v5rgt4gfevqvsllf0sxiqsonerc3azc562d5lpzs3vtd55anlk247ihpblcqobz515pb',
                flowComponent: '4j2dk6tuzwx1644vrdfrmqk8wnkg9jq53eof2qphk6b0mqe8y36ufwmn6dbxm5ob32tybkpt6hcutkwax2tyv8hg6cfr48pkq59lmpvmx148fmh15udobcbmw779md554vntztjccsya4m2c3li467z06399lob7',
                flowInterfaceName: 'c19nl81u6y3hm0pkif2j2c9ng6f0fyxyj22pf8n23yzqqt3zon1vntzovnrhurcg60mg80uxoycknek3kjml2vzmphco5n1prz0nyferg6xytucb9zkx2reo9k19trbac7and596c9tpr6zsan9cszlf6nsjw0d5',
                flowInterfaceNamespace: '7jz81z6ye5j47odfi037jfxuzml3s9ctk7vly48txqu1yvbcd747py9y87lh4wjy63tv8gyqe4vtiuvz50m7qyzq7nj7y5yarr5eptx3jfsdny99nbl01ph0zu13q9a9o33kfvib69sq7mvo103mv1oh8l4ewgh5',
                parameterGroup: 'uc0qi8x7y2shuq4yy13b7yrt9e32f0dcos7jtjyvpypiq0jrnk23i3p0ir5gh5ez0hunc5d2fy3qj64e71s1nhp2s6d33yuf2h3hhtwa2tricmd9dhcupddhlvwcjz6u683nbpw3qrh7qhoetbbawpeoe893m6506r5tqkgxto9ane57mk6qezfi4lgy96t5jhs1mb02sje9rrey8t60xqt2phjm60izc2qdx2f3ba9ure200g0vstkl50k8nwk',
                name: 'v9rz7o98q5m8799arefi7cxyy7sk36b09075ipexdrl47grmzz8coow7wllt71ulpdv10a0a61o92a7trfw67hmx3c6shsnld1xq9msqe18oqoz42him98sfhh1qo8dn46n9rhthn4tp6zqm18wic56k96r6avhvekepkcigaqlvmuijtavghvlk64a23thtw8wo2dhtbpr13ydo5mbv29nwjjwldom3ryg738nsi9f3xbctydkngsv45cyeo93lvtdemez0y39riankj8yheg7ihx17dre8tmnqddglcrapxztbu9u98szt0yn62ppj',
                parameterName: 'b644gpkqdjd4afrrp3zbvo40y6pz9i7nm7s373yabrp0x9ap14nxkiuhxiiddgrzsu3vdw5mm2p6o3uck9kyonbiuyfsclid23ehm1lvjju7iwv91ntyxolr5744412kxaofl2ni7ir0o6yc4ti711pv2tamxux5rdeyjdjje3pge06s693ulb7vd515sqyoheflieglpyweqdtsj9y4fbf2gmnixqj4z8lsmajxb2egi9yv2hu9w4i2kcf4enpnwdhfene081cjt5m01ihb8piirxaswpod0aajkp2vhgrm9ekko3v7zxa7enpcusnk',
                parameterValue: 'f502euw8mkjdxqw651ztne4f152qwih5rbp3xcxrwtc1npa3v8zqlfww2qmog4q9v4m8xi2pyt3ga8kx5c6mulpmtp0697twdcypopym6fwi9hbojw41c3a80qzivf6kp6p1fptui446hwmzlvfz18bmre16qedv441xjn7i4egpju3iwc091fmcqkcy16k5sgadv8vhgln2xut279yektjk1sfd0rdl4lycunw37wkiut5owb2c2sij2tflif5q3nbppjp25lq9s2svlri42em2dm012evlawtc01hdj3jbxmy5nzbzvhy0xgc1l7fquipbfqfophoj0lqf3j51nc7pslyuvjfqant83zyp9gm9vzfmz2aiw2xdsf9xndovci0104yfodvqnpz52i0iqw0hfu97l9d2pyuedk2lhmep8bdd5k24dhsplns7wt2uaexnkueg8o8kh45pv56sektxsney3wyaku5xrc0z9gswp85s7ix54uhvwkgjleg23zbgk9jht4jt40h601oeknvcaevshk0g5jkvkjqbl8ehzf3mb8kq9mbiqsrcjc56teio5qgbxwcpto8wyrr8uxvpv44u5bs405gu27t2hl2fr8matg6exg2qa7j40c7s90jtwir47q89r1v3txkilvq4sb46stfdlujxfiwopqzroiiov8bu96b0us3ccrzv816gh7sdttuittgfrkyycynn8irrk54lrorf9e85oioflftd30voyle4kx578dwotqdewcsc7v73erkunt7ojybigmrgrx13fokin4ki1vqs54r62hzsehkai27lwyhwx7sr8160av8mui46urr9un2v4n78n8ts7qiqrvpri0tbfef6lf2j42wv3ci0dcfem4adx1bpans7kvr3q4xvjpdvylp83tv2w3wrdu873q481087zhfmwb9ye0r5lw7vkuor9dfux7za9bk3ldc3h9irla0tz2b4dh7eawoze9zxosku7nxk1lobakag3ly6',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                
                tenantCode: 'of94lvzq0cfx89y5uy8or2ehhwpairk45g2w8snebpkl148ddv',
                version: 'm9e7nvc1jlxxl7hfytjc',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'vbkewtj917br0qzu80jg',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'n1453hwopxfpe1169y45o7zsxq9d2rmevp8cax9nkjlt5tlabljdo24znssxa71ekog4g3ixdkwuohr365jhqbif3fccj3a5v4i096b5mlk7hon6r7uh2m6shl4tp1wn024t2lfg6o9rm1muzi4ax0sp9oowkhl2',
                channelComponent: 'j2o26mozvfyjaeolbb0bcaowrc7m9rzf1bt6qve7vjsnkhoei23woo5re36tdn1fpluv30cyn3vsz9siry53g94bghd3wtambxmy7sjvylgmifk2i9riu4qw3bffyvwq8l20odwwdv2ngx7qcgko6ws89sd0key8',
                channelName: 'hlq9h02kshekzpesvuwptlb4yiu82zzs9cxyrghd9eoqz9cxwl8nm8wwu873g0g5zbyv5v4upnsa1yq5jodcwfsdv15lzrj6vek1n3satf56j4w2n7em26g2rt15tyxap4xa349qbukyr0afijyrydx37gfur0lz',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 've33hy744zqus568d9gtsocm3biagjekw27et3wtyi3f9158j9y6dt91hvimdkse814tq2qkamj1opb1zgxkxpqavigudp2clpllzk03qmqn1mpvet2f8fry0osofstrenwirnb95e48bc1k8vknbuazlur11xaf',
                flowComponent: 'kwbwlva0273tzt1mgjjljbb0nxontd8htcpmtgyrorl74c30gx02ot3q0v9vgba2iost8mgs1j0ti2sw1d42zros779pu2i2xqhq8ictypr8mrvhi2hci00zdnzj6fxh63b188mg3dqa08n9vric8j9x62s92kmd',
                flowInterfaceName: 'qe7kh87gtvy8ve35xbbarr31kijpy734ae8u6huv6kxxc4scokfzvk79tmt6twjskiek2peqdrk3ssjm73o6dgskupjdsjtw9a0sr78c46kou8ip9ekdjz5ori44abwaeisfyggjswdhtpjvfhxzf0ss61k1idy2',
                flowInterfaceNamespace: '9htrqnq4vgoir7igehvgrhp4extwfo2yi9bdh8t96kliauos7q5wzlwtz0swt75lav4356golhmy52iyxnznn0du47w1y17v22giigjbvsg442kxzids1kacn3qog9xzl3jee7o5g6nkgsdf0v0khoa4w23sfer2',
                parameterGroup: 'hs5r39j7s7jfpx3tb9opvmjyq82igc2zoqcofe761z81ptq5xh5d64lbnhop5s1d9a6dn2nima199zgx9j1kclxznzhm1hg94zdnrfstccm35q4uxiy9hlqmsplh3ktkimdic7m4gxvazh3e63kp70lxrs8aydc32zpc7xqh80fczn478lczx9ddyv88pqpicd5jwvublvg1bs0l39vgcm5k64n8m2fcsv2c22ht131o314rpc380xaagw3btzo',
                name: '1rhw5olm88ta090f49zamgoflv68ef12tkkxmf1j4dn4rrnomnylk0m426cxt7ohzd1vxn0bzsn430huflmqrlirqtr3jnou8y2uo6hrnw2low4tvh76zteiapmuh5za86hspav7oqhxx9ygwbu76zjh964bo22kriqyg5sj1jr68ioyvscbql9urrj78fapjjlbizalv0boboeylmf3fdzs6uwlq22qxhgoe9w016i0vlm2ny9pvee8fwhsf1jyvfra4md39736n71hazafjjfxysp0fd0wdnon57v348546untoi48bonoe1ysdbvq',
                parameterName: 'zxo4n88923grppf83yqacpd8iplyr3sfscva9ka4u9e21af834ibtpy4e7cfahyz64rzrw4vkb5c57j2brki8h8q1t2s44i37yrijd9s86du8lqk42wvowlt5hk8j29t5ixd2ammw5cp9l9no2xccj3jbrv08wz84eu9rnhffbcvdonmqskmuov7x4dzcbp3zcz48sh5eg2w6jcwt6al1tyax3r9ksygk7ayk7xlnixlogu2fa0xruajyzruwy14j0ipcralchg4eqe0smrapjxz5zgsvrt052dg39trtecrnh58iamfxu778eyzkxx9',
                parameterValue: '0ziaxfdrqixkmr669y8o5k0hdf5b0gn287ll8txvboekbv84p5d7uz6vajth3hev245w3oeevtr2wvtmxmkzetspa6xdo6bqxkmkl64qp4nyz8g45fmjaxm5otxmg142hxtuwgubwj9h195vcpcjbewb2di7bxw4wazu2fg2tdfu7kwrk5xac0c7a625scjyg8d23wmwhb98g0q9gcgxh27dkb4z1x41mbl11hw3sqm5oyxs25c9x8zfa8mgyaeasllapa43vqz5ihn65ed1qa6lqluv7wax45yz459qkpuz0ku7ovj5esvvsedbebu3tjgixrkh7er3j60lprbtxgmr4zlg2yxpukjouv1koh66g17czoh8qrmpkp57jhr446buchf1c6byvkuhcugxiuz6guqbj6al49o1c6qgvviriy673bwrdzzm550w1y8swr5a2h31129awue6maza5itj84cy3qlrly6ubx2dq8xmwt80k7hea0h13tv7axlbo8ok8yi382px0rjsme8xkezjmq2z7bmrhdqb3ub92p6jiqb8pvzmj8ngpp8k68s6qdyf85zb5ikmghej3csy72nqukpy4gazjpgq5ussr5d12hgw6dxgrjverek3dx91uw5byeb454o31eqm5jfcs50sv6nkb5iak6wf4y2wzdd8tejqp8xkc6jstzlyj5f2qarcy0z5ej0rn9ssypzi1cdng049aoh5lviem2wi0yl2hsljkmccwi1tfoi8tp5vxv64mi2gtp2htstgam2xm0tvqypz7jchv6i0fgrxcv0y7i97cdngndgenamibp405b82bcquqy3wwsliyepnzs2mln3s86ymjfxm08ozdcxe42rykf49bb1ed5eqdo0jp1o5xe0u5x0zssk2a51xu6lu14vzg054tkedhcfkn3xtsnl9u3bvphz5ujjnpwdszj53icfke9jg4e1rpx4l054r2ilofhupp9qvlkw9mz493gqi3vs3xx1m9yzzmdso',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: null,
                version: 'vvkrhgjwm0yu3vpfy4xu',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'q8ypkdkmu4ai4i4u8uwe',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '48j4f5k8x1ebhzmxkw7d69oq0axqongj59x93xutiwpz70quhobl1hs0aggui822z8c5yqmh1nsu8wtiuc5zs4iw02307ccebwmwu5azpbprf9ipy22omg0ohxkcub0h5rm6qb4e3fn96pbudv0gl2dr6umu1sd4',
                channelComponent: 'n9e1ppizrm6z2q33vo86cq9nxjkk9ljnbynny2jhi4py75em4u5v5jns04hg3zl7e1pluczcm7rsxck849yp0i1cqjlhobjkrpeua4k68fzcdwqb1tu5gblffww60jrjn855kd8sj5sd283nz8x54dkh8v9doj2u',
                channelName: 'bht74atxjtags3w5lzbirdsece5qn89665fo3m2l5mu4y9od1cqznwn7je3sth8967ol03w9wv1i6mn079ycewdixf6d7dyszpdgvc1619xwi666wh8ftixq0he5whpiqp23k8d8e4pk8a8kiu1vcylhaknuyeq3',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '2gp3vgznuzx0rh5kp8uzqngmfn1ab4z4kdcwl5w3huf9387jrua353iwx29ynb5f12lswcvqc1qxgu5c1mnokyn11aeaq3543qsddzw9kk2i8xcad2ao7rszi4c4m4fgnt9r94ctdgufalj1j3wfqtrwwtwg864p',
                flowComponent: '9fasu7va9m1w8ylge4vh8e3kjzoxw0i3uhvhnqavhwh1f35ey5py3g4k6b1dt6u66cr0pp5zlewqcb2gnki4p8rxy6jnoakcu55q40c12ucl6lqer09ko0tw9rrx6tt4rf53514vckije0o7s4llrli1r99uvckq',
                flowInterfaceName: '4euguqtayq6n9r39qcy6k1dkfzgi8nnymywoizaml099jtwbtd7762185v33djlriyzrdqef2h9km3o9m454mh3jekhli28cfaj9hs269rbome9otdsw9pufmhx7c7n3897sn0my1fmux6h1r8dvx0v50v4n6zzv',
                flowInterfaceNamespace: '7jkx80ribq6jswg874kxoxw89elnttqmfho2jk1ao2m0cadg47e1vis7yknroh9pzxfybyznvt5cdev13gwsmcyrtgl9btpq7rjq2bvcumk1ahlp3xaur55vobkd2afld8did4f69v1rg17c4w1qyb3u3u3ro61s',
                parameterGroup: 'j17h5s9wisx174q7h1xbxgybfn0vnt3n7pmyjouaipklyn64iamekn2g4hht9a9wnaoroqiv5ugrpbbz8vlfql8zdx1mbwb0w5fz7bckf1utuw6jn625xhrfybhcxggpkwpd8ncbsdgphv8onjeh7w8bxbkgbo1xk9q2dklfsxuiedq5e2yvjbnoh2oy8xloowsolr8vzcz6rwzhrd9rw9c52rfw76oemwm6v4aexmcvbjtvmrn30e5rwtx52px',
                name: 'h27ub1co3qi9w1p45zmqbt94tyl1rpar51yvsfhwiw3ip8gugjlriotdp2nhzcee9nwja381f5t8e9zslq6rxdrnrhz6w17o4rmoiokwz8i8gfd6p1hpb53gs9n77gsz8p3ps5482r1tq4lh3xxlz5wt6nivziqb64zitb0t6dospa0uhfyqqc5x4b2sdnjmagnd2xqw9sdbc1muywnjt29tuahi5etjf2izo8f4xg5lho3wx7xgwap0ryqvqvd7smdzadew5l5ykkkkvurd4t2f98g67own09vt5yw4zowvd6c46vuymov9ik3n6ydi',
                parameterName: 'd8afb3iydtnr2ejlgxlhy7du9nxaoi2kgdes9571tobga21f71cgq3bu0bxy8j4aaayighv8r06nlbk632ujelr7igrpkmskzkdf0k5r535iqcynovtp95eqb2m6k3vctw9v2stf0jj2wc18552ior75gl78qrc43kpy9teu0safexxhioc3l594fz2tzw9hnp09ov9tya1bfh4opugjglmmgyd1idshy0b17r8njbjiossc6ppl6uwtxib9ses4xcekoc840wweedkj24rk6xfxvc2sgrrgyjl01wawr9ng5k308ej59jf822zcco21',
                parameterValue: 'abop8po0kptzf6qc2zbyi9b1fyeiyrfm1vs4lxicl0edh6owm3olbiobkal9358k8uxoc4zb2of7p2u7ue3mjf3xvl81ytslupsk3k6p8tdczhha8bsq4i5vo7o79kn0m8i0kz2del8oz8kpaceda7o8040jlcztixhvp36xdceltiicfsm8zw4lvc3rw5s6wng3ee9d93za3t2rfvqozm28hvwgz4sj7qmq5asfdje4loy0xm07twfqklkk3b7xiswed0fgopw0r9enredm0l3yv5csp9gbxr8dfnp2g05pvcebup9ircee2wng3pk4vwdzzx6mjgvtuyin64lamvxajup4469lhdjqzdm4d62lh608iprmo0gjdcy4zt24trkma2z6iubl84py0vql3f3rnu0uyn1hp70rfjpkjzi7qnai5e57dx5dmt0o8v29tl1d6ymioo1bmdmqhdsix1tvidyazkt7a5l2z8ie1ni2l78kfjdafix5uc3puk2y41p9cwk9il0197fb4uone8nsbwp8h69x1y8kzfx27nd5u8jr56y2cy7ohsvvffy8bvuj30qoywpn1khqoyc1iqgk80t448g0jvmqg4bempha9uyopbwp65zw7qhwgw3s4tdgj2tw5zzjo1si7ws90k6ype89hi0kzutareai4uqrlshupuz6gmvuysn0q6ukn3xsrhm0zkmz5wnr90q0ly8q6uii7wzpiybxj8jorc3b4p0d37uu4a3fcx2aetogdvwnhtqw1iqseqp9zznfhgsq74g3auym2bfloojh843spw5x0koihzbanai8ltcc20yokqm3qerpjxd4aykrzhj8xab8zyzfrr6t1rlddiueo5k9ti9t8mbyd7hjed9rn413hdkst5q7l7dm8mys9tx0rde0ben0ft2msuyft3d0179f8yqbd7fjdb474eurly4ljr1z7p3iwam786hmze56d9k2yxf8xmy2k9mr8ensjsxl6ge8z8n68yqbhoos',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                
                version: 'zugs5m6egomkezxnbnbo',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'mxyqoulg40a8r4z57fj2',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '4eg61yxwlyytl8qe20l1u0tj93kz0qjjge3c8fjvtk3e2khsmqbc38jsd0qhddhm01fibe7qjvg4odv7ry667ticieu238jnvdplyt3zp517h0vj6jn8ebnxj3xmp0dm5ku99mhbsoxow5dlgyobkalg6wdy8t8r',
                channelComponent: 'cng8oshoyqnm4ham2eeyjhj7oxgk1mg6prh2dyzjetzmwccm1ftq9s03bbmxcln48q06b1g6xehv3eyawxzpkcwx9djy98d5r4zukcrvcp65yz7gonoyfdb2k9nevw620t7zv62sk2nhulc8ac6txi4kc4umq9u9',
                channelName: 'm3yw32ryiksc4pi97bbkvsg7pvvx8i3m5eynqllusiwuend1502c7037dydg6zv8rgxyu1rbbd9zzssi8xcknh8tio14rrpjfvyf9x40tq5g28d1uj9vvkxx8xahc3beulfrd7i9oeu0ycru2rg5xom4hoouqg2r',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'zb8aise56q5puyjr741qxqw9no0b78ni8x6yh1t9wz2i1ffmyhti6z6zb66khk6esfp04h0dad3b1h7zz478uym491cp5dgq01tcmz6id7awma0mbfuo2j5qq0so2jl0y5u5nvqa1mf8nfbqo3yhiafqc1yqsk2u',
                flowComponent: 'qmvqrp7qs3wpy5l7s8ja267j4vyhijn66jpdhavgy3qzowde5dbqfu17s7bp31qvh05j72eb81wn6gfwdrlke0ylz0chvhxdr79fvcuwixagzee7ww4ojzooqsgboig8rrodqmxuw7wtesiot1mq51zwe5idrefe',
                flowInterfaceName: '44l62hmd9dnksxlfrorc45oi8a2t7ep38ga18tq7i1e5n5szbu44bxu12m9oic4eumhw3ucopmh4e7goxwqvtzc2xewxm8t37es13f5i8aw8myu2i7vje04izug38re7skcxapy6fqhx13nu3azwskxqtpt8lwvn',
                flowInterfaceNamespace: '483huulwwxgk0q2ceijoy5uy0mfjjbywa9yvep81o4vx0zk5msqdhujcxfzb744lw3mr72dbz0zhwmee8ylh9q3lqz0lxkr3i7wyt19gwhcv70rvwbttn34dxcbrp1u167918h4tug20mih721ap5xkvhzgfyfuh',
                parameterGroup: 'ekw0shquafth0p0wllzyy838q0m3t2ro4ooxje2rfpwtcv3bztm4ianbfbikliwe2o4ewlr2d7c4d5drnheb09k6o77ybtse7unvxjd27qumqrb98i3wxmx0n42y3ejw8sgckx147x0d1ntcc8dazf0e5fcd5zk540dz42a8nyl0pn9tlfm2mu083mc4z2enq5mjhj1ttqzztfy0oy2ftv0yapd9yf0gc9ne3z04h04e74rigp8e7y9eq5agteq',
                name: 'i5lp0ib6ojndg6p4vl17fpp9xie6li7t3y5g5vzh8dyiobl2rkwvtmhue2mp8zf1tqr9a997f1j065j7zgvnavq92a285nursawssg5kxd27ia0zzsx4c2406j87tmgrczzdbga7867qsioc9rqv7feti8htc44jj1kv6ea9xaxifarlfvz7vw1x695hepd4yydba2v02pd4wphz3injaegp74gq8iu5yp9ns2kcv1gt2wqnjvq4itvpqlvott1ypyrcmf65579gn0yd496mhd52yazpa41vnmcusi9v7c4xve2vaogv4dvqlinzx0wo',
                parameterName: 'xtydbj2ysn10iek68z6ecvazm5d19sexivrez5ghgenlreah0g5dx3eycqmwunmgxid22ptvq4iggzpzwhxizh81osv5txgoedf82eii478lb4aqerx5mawo8f1et8tpkgyldre9d6ij2e8xjgx50vmze7zgzde77e9vwbqfvburs1qyrha7pf36cu57l0hoywrwiqxjkitp46nvjtu0d0ec735yvzasi7prgfb1ryitqom99xg0cqse2bqmc5p3htja8f4x2vjmiezhuko8b71p4cfqjbb32qgn1fvs88ojd4ymjh508jbolart3ze5',
                parameterValue: 'wooqdot6l9dw7mv5p0l05qedfbfjk90zkzyhqomt800nvji3wt7t6zofsyum2dvb5igd3w5uvvucc2bu4pkvkx3v419jbech03gcyx2nbbjf76sj8as10uj24dpjmu80a8tyqwy5hpynhizuybq5hbtlq6bd34358u51a70y2wygqp973cz8gnkubvbap7jmhr5ryejhph7q2u0w88ag52vlradafve6stnqf9eabdr6apg08bvghshcmqrw2uhf94jwz1kgog4dvp1selccte2cafewik2v2wt1iw8ax6oon71wbg09c6n61m7glabhhil8iptrkh3tgmvu1z553xkqfvqzjd66jng3v75b1f38vrwgu7f8wrplptvpfb0x1ifxtvau1r7900t7n127sh7t0kbfqp5x8zyvv1fqdt93r2tpqtf00lhm7tgrcwwponm38l04zhq8h0cntlhlwugsyujn8at6rfs6eqhdzt0q4bc1hxl9v1hmsxz7soghzy9fgrem568zk5wexdjf845vvne1atisgsmnfvv0lhk3qjwil9o4zkshnm2gav9almfwjmxiwqtztimrwj7lg4sarf94iiu715mehuxwv9dyeuaakoz9af28y0y78pftlrzcpbi1m4qkn7j82qd09t5g7jkybku0cw3d8z8u3u98xvvam6v9clkxq1cp65n82n3bv4zlz1dbooqp6osvs1tmzgsf6ij4gu7agz1k8lgxhidb8gacrqrwpcp76q046na9kj2i6r9kgyv0j8h0gxzeqrne8aqduwn2dyv1m5mh84jflytu85u3ywxgz2lmixiyukktant4k1kn1y1eh1uq55kdbfcjz004dxynrwlvrflzepy1hacak2hq11hqzbmvkicupmkpgr3pvxzd5fosyhdc1gmxp5s41lkadzmscycmyscvqjah40w9pbswofp27fe46d3122nc0ryyos88x8ck58iq6vnpczt4kbv1mbm41qjhrqjufz5tep16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'wjyc7ikyvj1trdbgoxt57jzbqswdh4kj5e7ed2ey8acyjtpr76',
                version: null,
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'vc6qsjm95wpgrq4hej7m',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'oqakb9puxj8t47lcvfhtx9akwmen53f8k67dpp3n9xp92aoz73ulfs068b9qs7ssfdv3qqj9uljqjjg3cwuqyjx3w22cilzklx5l7rta3lis1v6htkleqltaixg9alc6kp2senbn0c6am4vgd0qmwmgxkqqh3oxo',
                channelComponent: '38144ojtezaeytzvnz5c4cmp65vlos2bfbj0kdqoorjq09ypk26h7xocc6j0q01o0q1vvp5d1p3i0lb3zzjnb8kzm58av261jvn4l112m8ljhe9tyk4mw1bdrnmfevnait1cvdz8wmu5lwaomppyfp6j6h1fcsln',
                channelName: 'yerytgeanwsborageiqes9nvlj6x1nvd4hsvq5lus5icfx3dtx33pfqnh7j11dy9i0erwwq6hwfyzdgsxkt7t90uxqz724w7ner9fvpj2745n597kgvzr6andirap3czitampgf2gibj5awvr03qkjpn9uoe9k3x',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '0a4tu8gogmg3av67as9v9ni9z5ybwh4rl1tmr89k6ae9t4trd3st8g44nptoi7xk4exahdv0rsx5fqhghc7t0astz2ck80w6ur0mjopvhn2y0mqvbr3kyavccq8qqhb4swguvkxmdxf9anvbjoltf6xtajzeqyxa',
                flowComponent: 'xnzjrrgg3ndp9p0d11xdkt5myp2u92vormn4lc7goi1yprtsjxwj3wz17fly8gcc6dm6kquszgpocva3zofkt07bk92d3j9vycktu7zep21ixzfzyi41sooygokolxmfobwl9xeforlou59rh7mpqoze2r8g0xa3',
                flowInterfaceName: 'hdiu8q2xeuuvhk95o6sh1ij5ev7o9bkk4pwi02m7kdqz5lsh39ps2d32nour242l9ylnkr6x9eu60c26e5wsg3jkvfambqylotwdogij6s273cf4ssangl0anpmyy2jpvgy8r14fxreri8ar9pdtfki8beyz3cr6',
                flowInterfaceNamespace: 'll4ok0jvqih886heflnb7x470ony0kce1s0gryduwgr43113szbc1vm5a5eog845owq50x4btw5s6albn3gvzpdsprrn7a20shzy0iaw4fjeq9mp2h9l2u58cdrgv672cmufkhyjix3o2g41ob2i25c9zyj4ng9q',
                parameterGroup: 'mdb7fu4wecmn533r6br3gjntccj6bsbyyuzritmand6ch6z90yw2imum5dr9ifguz3jsw9ttqb5ffdy3ileswt1a6pdosqw3ayu2psr300vy35hrd727lmb1btjqj914plskpyu67o9gjlieshk413omu9661ni9zsqmawtmpxekqpakgmll4qkw8sgoy6lhduzxr6k8129hydwelj3i4muji0m67j77h5k88ngw68uqha5aogh4h3pzhl7v1l6',
                name: 'kqblaixbz4o9jbpbpv2tp22nejn1d60r9ay6zvlhrcs43dgyas755tvf17f2lo3k08mujgyek686phm41ph1qn4o1kr72rtlgdc8guifzpi2q48z0eq64c61yahv45mvblpim66px76qopj56qda8b6zxz8mgfy9d0pvsgtlko8aehjjd72qun4qquhzt3mtksm1vha04tqwtftpsrbvuuoklhri1kegxi6o17stnpjk4nlgn29q7gzzzgx7mkfle0lmpwz1kflo7p3xtp81k7sorzccbolbxi3gfecugtct10plqx9hdrbll4giupr9',
                parameterName: '07uj8jp2q7cqj0j4vaonnglv44vrzh06hrod5dhlcbu78x0abfqvd5tgo7ppzom5tr11b4abth7lfjpoaqpceh2dot14z7rinztr4bfa64wuufn0zb7duou2ikx9o8xy660voro3iyw55fwptdty941035v141m2vrrgzwr9wh8h0z4vw5aoftc9rv7000nbgzycq9cg0qcbqnty4wbzyjkgbkjuczekqye8vrxynzcwjmogekx4qza05txzwaqaumlxaglwoxlc6ic4u0dfvpriq4ib5jg7rqxw54cl39uucu18586c0dvbkir7mko1',
                parameterValue: '0nv7rumay19smwtuvxq8wo4bbale95lm3cgae6n3hcafeanatmzv1iay21fhoui7qxik0joxqefu2spcxdrkr7rrj32nw3rhpiode5hy2qmzl64oak8i4ia1s1rxgg56zeojh8wm2s7a8i81b7k35oxebxsevuqwan25fxuijojelgswc8sv543xw3hhpw785yyq8bpfhcclp4tvvwhtkk5896xgmzctyhtasy4zzr3qb1sku026yy1pgzkgzpug5qfyp5ia2gxr4st16e07o3ipvgfrp7nzj1oyb0l5r47rwnd01jf5ntt5zxf9dv6p4q0jhcjiyqf6varw2smqtiwus1dk9uwcumi83m54skq5wj1dbzksnw4kxqkyjg1l57gw7rh68zc2phhc8jx8d50b2ljy9auscgws2uk9rxlbgyzk1wl6rwt4ndjdgjdp3kttb7o6k2zu27z3ywrsbk4ohbsh37xmzgy5qy7hb7bwe9e13opo4v11o2g3iukgyg14enwsocfs979k8bt4wma9xucb411isk67bh0jvgg7errxq2vqp53iubyj7d8y9vdg6kvlxgv4nfxfpvrvafqfb3ok8r2sfdf0x6qo0wz8mzca37i97108opxrlcf35s4a5a13o81zkntggdarz1si6zux3z2oornpd0a3znd0rynynzmqbtz7u2535d4bnk46i2bcqlou7l8tpjwmmcgdo33yrsniymdnrx6w3e0198cfzk6dnxggxcpgshcorns0grqcwnupsymlvfd929oz3xyug4c72gw1q1jpfiwneckpc8icv8770jvmjqj71tunp6nbx9zaaxkfer9d5z83vaqdznz88pl5l29ttjiy43p45urutwk8s9v06g9pvdvuxa54n4a71nwihkzq15lalz2tqk4755dpvybo0dv1rv2wnzcu7b6772vi10fkmsq2trooj0xhbbxpob5co46jnh03s4b5df0arbgdb0qljakxxonegybt5a2b2wsu',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'sisp19ft3llqm72wm3kttvbggw37bqujl66f9lqiyikub65uer',
                
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '1a0se1ze3jxabqwh3kw7',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'k82pk8jgxtatf16qvmc02m80nw6ml372f4nfgjin8iuruqocy2ph1c6nqev9gm3yg0761ql8xp3w13p2vjndyrop2tonm2hbeke23p2is4b5pyn3d4twkuel2fob7tp0sr2g0lhmdgb0dj4vf8iyz5kxx7oxq5wr',
                channelComponent: 'h5uwxrgehx4f6ox04ofc3q3g1vt0sju45bhrzw0z402zpslosu9q3vt04zyfqe69449pj361yf0a4ftlcmfx7nu6xegrvhy32avxmf6el7egiiw079jqskxed78w1jc02kl4ocvwywqupjmhoxd0rr3evukun9vi',
                channelName: 'urufnl3kjvrg3vz0bddt2vw3pcm9sqnr1mldhq0ve9gkc22i2ou26sj30x8bn6cdce1p2lrpyybsfgn02fzvcmrl03h5vwvnsmblbvrpdw1bzadwd9krorj4wz3y44io030v4txwm8jooav5hchztqo31xnes3he',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'jgaasaonajcj0mctc67hky322o0x38xx99wcvmurmfq901wvc1gl3n7ua0muhwm2qi42hzyioeue0yob7q36hx66ply4ihz36lphvxahza2mi73fouivldte7us55qmflyx2qq7ogb7t3v83qow9wibqwuuo90k6',
                flowComponent: '0cpmlwuz5sjfczgblsltdrlwv0r2au0q3we60actknf3toigrqd0ale9ntc29e9n3al63k0q74n6ejc05wbf147rdp077bowcmcrl990xmj7b0ref9fwkg0ji6i4y3yoqbv5k5z8ov6jllke08v4a74ngqv399q8',
                flowInterfaceName: 'h07qqj65hn4l1x4glqojotvoaleoidv6a2evasneoeu3t7ryx759us2wy4pzomdp4yitttesm89sou2i408ip4w2zn19fc8shzuapkyk6s3xec9q8sql9691sa2n59ix0p7xenv5bfld3lw2wjhxe8vouy6bq4xt',
                flowInterfaceNamespace: '5ymg5jw8iion0p1jtuwmv3npgvmbgbo0uf8c0z4p3o3792w5gdqgorq5aav43aaayv7flghxxlvilp8r7vef5a6bpm1e1b51u036h2kynr7buaojlhyk1bwt7myz0qkjbi0qj7eynyx57wyolbyfajzravdrp6rs',
                parameterGroup: '5xqqs5eajc4piueqjwq41uyhodpwm861wlnc3w2gk2jwq08x7nlm7i1066drdm3hi7ddj7pe7tqernnc8x08z90yxyvfo6zprcq4d2ln2nzyb5bi2d592cyv33anwy5i164ownh4n2akmvbv2e52s7o5np9g5fvtntr0lxr1bp0xt4btc9s3131jecnqmv383az0xy2zxt41be5287u18161x7h8p2mu91twtyc89sukvbn3jfbgxc6i5xwzh9a',
                name: 'zka21tn6i7crcfp340x6w8qi694pdcknmxhl7csy9868lnevpplzaixhnsp41zdmvuv55rmw4eswy82m7lq02uouj61llx8fbe6nvdi95riwhes70p2zrd86pmn85t7sl43u36do74wfwvxxhvexi24yt3g70zkc8tegm6pivc0p69f154i3f0p1bsuv8t3funks14w8vf89v05774conrbpv7b8soccch4ncmsfqg2jyw5kk96um6bvcldqlz8tida3tlf8zezlbhaxowulnp6rfstbv5d0rl19vv9o6b34gjjaz01b2lnotx61yixx',
                parameterName: 'fuhkixjvca0rh1r2zh3p08eohxd4qcdl63vaalby44qfwn4rip1f4u1nqoj5xua2n6o6qixp3tinwz34tnzsa8gehacoro1um821mvmpheag2av1fdy5t6bbw5s394qj8m91jamyo5bxbdtm3mj7zycbc0hiz95x1jofdd649ewyfnl79zpbph87htdr7tqe9e2n4bs9fl8jywaia3t0ej1iclchalhpy93qc5gqqekngw24d67mkqxawp4jdpphzb2d9px791tv5tql5kcksvmgqc3lqp8j1n53tm8zolamkgx64fx61hgdvzixwjt3',
                parameterValue: 'qe8w09phpdadu2v20g0srat93extywq4zcefy6sfwuo5da0x7k55ddgw8fcuea3sixdbxd3v4iwe62vq4jbdd5ds7hjxchulz51m1w3evylaqp64evb40138uyqsi9j74ktuq3j90mju84kuoktad0zek2yxmi6q7fel4hcznuy2vr25kqrhe8fslmwqsufrv8efeyfub9fx17icremfuaqbnzkcl7u0pnlnlrn73qufq9suhixlb8a30r7wgmjy91ox1061em84fra0wtaox9m7b7l0plmm37ga7tjuvldtpzjcuyz5rcu2dwmim6l087gy0mevr98n243tg4lt8urx7hb6ufmb8i71rp7jsxu40es6tfanl1lbvyssfmlmmg4ozhl83g9thehl1ybjpblkgz87nvpnz1qgz66xw859ncgxql1j8j8sqkz19b5ssusdne2v28kd869zw70ew0zxa8fjrcmjqxp6j85gd847kypwi04utxi41u8cv4pi0cut61d0qme8teudkf41p8vmbgub45dxpdal0xa8va4wrjs7p2acoh1l6oajptld6s5pzmjl42aqyc2oz6rvsvak2isu92noygjgbuv9qajg05aswa784iw1s4ehf2xkxyrrkd2n46wc9d7dni3h9s0lmr6bco05vv61h2wxx9zioo0m6vzmr7dddbgpqqwuqtey1qbxf69d85mj6n9n1zlp5cjg1t7olte6sdzyl0y81ccccq7jzgsdheizoqoi1xxzidjxfn9wu2b8xcdcxudtkrdz79nt4438uzrwhefst5fxu348w9h5s9t2r77ekpnertg96uhxvd3gz00pvrm6orbd6xv2jrnm89ayn24pn22ru5p0dq5vtiyv5am7mqlmj4qfjtry79jm2vxldd17exoskl9ggsxdj6gktey1ilrvqs39x0qvu67ze7bx8fcncxtcb57tm7fhdl3e46rtue8qzf8ujpj3abbqeppdzx68otl58yk7g5k7k6cg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '3ijpzlr501o18yqdchg7xegano4d49rjaz956q3cniex0powy5',
                version: 'xo8glyjgt7l64k2dik16',
                systemId: null,
                systemName: 'vchqk9wzfbmtn5ld5hel',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'whx2fvzezehpk61hb1ftitbxwi02zvszrvi0bzd3b2hi8x3vd5cu6sohx05mi37lzyoxkklppf2unyqd90qwvn360qjnsaz6txk3ayoq7ruacs7s4auf67he3dgtzjdz8u9xflq1c87nd7n995m6ng1bkfqyca6x',
                channelComponent: 'yjd581gq0f5gfthpudqyrmtmltp8l2cwp33kcptu3gl13aoqds9z4rwunktvio4skl41ducv4dwccqenhrke0z7rkkvyurp1dp33o5eep9ziiwvenipdrrllwboqetpzabhax4wz3wt6tutux6rssnzen7vz0yc4',
                channelName: 'e4haiu90eq6tqhkr7f0zpvijmbwsplye39bj6pbd0pqwa3h4ub278h7m03n2oc7m2hcq0l7j8purbc6tqc3vlt5cb1lf6mam8qxkykw18cnuh9zcje8u8g2qe4yhl2yuo2hcu9kxduom4pv0viwto71kj130o30l',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'v4uqxu9it5x5f4jzyh5xfpcdyr98f4a5vbigwmnb1xx8x2urn42jls0fxwhut1k5ahkxfdc34tzel99lwm4myioadonoqj8m0de8za8wfqhe0luuxujtjecudffu2w15k0hpi3j4fsudoxi6ntlq1uy93m722sw6',
                flowComponent: '65b756t2s85vnv3x3du3fd9bwbc4s5wb4zgsp26lz0wirb582555y89d1eiysone06wh597vkt0bckgcfimzcftso01tlhdf6u9vxttq11t2v4grr7d1ji0d9moikwe2l2vk20wmaggtzim4x82ldcrbguk248mr',
                flowInterfaceName: 'b4vq7kkwuwdgyxga8thb0kam5wxtbt4n7lf1jff3f2lrrh1gkr0qpydbcov8bxnselumyfahc6klfvt9y45cxsc3i6znvs2gz9r6sv82xts9yu5inzqw9tm69jm5vj4uuse31b1qwx0ve4ssz07o183pdk3jfa9f',
                flowInterfaceNamespace: 'cr4yadvp6g7tmw40hrtr8b421zoir5pm6g2vy45of13dyv6xoanpjak4ep5q3hpai693mlat7bv2fgqiwtijis9wd7h4gaohsj5ym0w1tihj878lf8mlmzoony7kbpqgi4k9kvpbofr8hsduu5by2amuqpymnohd',
                parameterGroup: 'oitc8pv1brjc7heljv215ypqk9gcpd7cgvl0mtjjx8ozoqsmtwa40bws2x5gn2s3ebuk3hufe9ws81q98vjuuwx47xe958yaqz3d5n67s68802i7prig0qi0vpxp875qwazn0md9kkzokip92spp4di3ueuzb49714evhrnedu3u66x9xquuuea1vu7bv7z2zyg8dmvzvkdxsavvva6p9ywz6juttf2400oqq53jucr73fsyemohxdkm93n3gy7',
                name: '799nx8y08msiyoy1uxldb6wjuddgie948zzz4vba4lriqj3joibofosvf4ovbadvxe8mt1yx0r8ujmy24dkd59qznw8lnn0hodgo5yvazcqa7aqkyt7jl3nj2fayd0xfay5ari7cnbv2n0tk6ee44zr1lfic6fzds2vr12907wecx2f3d3ci8nf13jh2dkzwrv91ekn59ghnfx7z4wqt9bxadtnjjt1oe4b09iodubxes4l6pvieo7b4vmroyuuu2jm1ts96qf9sozudd82ps2wy09mkrv2toj6ziajp03wdo3ujk06ufbs9bcbgue9s',
                parameterName: 'n2viuuwsen0fhfqa1z3dwp3eyxtmxvsqbm4eluyh6ypx3hjgx57b9d0e9elgqa5779zeo01rcoxhkgquvm5rcfzzloxiaz41ynz5qgegxkcwenc2o9uif61g203dzg1dxvon20fpn6jflma9zrwilqfxbpx7p7sztgx8xuxsyifw1cbnh1ob1qx79990hxso3oy4twksyfckut3lcfmugokfueofxciavbjtwywtvcn6gtjjhtzeeqmlol9na236ior43gt0bzibxj0w3ays51ukz2tnoc8380gynmm7ih6rb2za23xo7xffki9h93wb',
                parameterValue: 'cf8nwl7m9kay0q1dshgmmiz7qyvzlwlkz8wtoxbmtwsgy0hg4nn3mfk5rnqvuisai7c78j3qq0g1yyfrgcxalzd29dv0b385tde3vup4zgcjvr7eavsnjwpvcecw2g5fox4khtjg6kp7gr2kx9pd25qo3pvl1uohdgwbug0ec49bpgkl7xcx6fxjge934s79uazyvt1zpvowm8c38fvfkng0u3hvyxg6l06xseetyb9kijmehjsmgkr7zgt70kzq0a870709iy3exjh3e707kho1f1b6vf8sfo8dk2ojekg823lc7v6x53h3doooypzd8hubzy2j4qn7ulskz82c2qrj32tpuopxdqcrj7xuadb6amxj9m1mp0ev6f1ohgqh9fyn4allhydtni2i0v92mgchm2isxothb3xa2ht8r4v3qmh28hvtkj3n19bkv3bhjmdmnf0sy9a1s4ua1kfrte8pkzvio24628o70p5z0ubi8pp2xncjxouq57mr5qz6s0fl6s3wvdgzdgqfi10a2zxr7t35uyuag0fs3zuveckawocaoj5xgwnlsjpqosumy841xzg02ry0fcn239tru8pxz5vadospqgclqnqif86olcrld1ihp7i88oyyrkr8awtq6abqlwq89gdhh5u96c9widtv37mvyrbr86za1076271p8uf19c9vbl8ijdj3oxpmw60x3m9lcyyf4ssxcnj9ejii98vjn78d5j7qr058co7fqkvugkv1zeb3yissme9v70e7p8qb1e41v796egez8wwbdxpyna9jeiim5h55hmb6a2bs8zf8yrlmt2c0yxabjvr7v7ffraw2eexkb9zmpqh9rq2564t8j49k33xnl2ixqjg0xhfvyqp23nhkaxny9ev9ttvztluh68dl524hpwn3lzc3s74jghn7q8rhqbztwfg9egmznc5j65hvkb6kfn43meo7043fef9ejok8x2xk5wo0wv4sxpo50ldog247hx2gr51iva06kltq',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'rzq84nqusjjt8njn88ws9ix9k9fsch51sekz902ppx3bowypdr',
                version: 'b3q2ucnxgz26w61nifi5',
                
                systemName: 'v69ni95d7wt3gw3drbvh',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'meqqff7ijfvrodsqt80w28y4rqvo3i50bhe6etknl07vshx26zvnxdiwteuw16k7f5avmjvt2uulvbnwio7n93bo36n5yvqd065hqmgtipc1ytlj2sx8b45ahzjt0fr2ncdjlw8u4heri6qzvrhvs6g33so6xyuh',
                channelComponent: 'pmvqjtnq9isaw4bhmmv9colmhd9y70txt6p9s48s4o9qd4pcpaxf969zs4c5cuej5j1qphk54gy977n8p12tog33puu7k3zbx0bbtpyuqq1l2ctg39inxdsto9ehvyluenfiux9u6m4h2ahcx5km0i2fkusw36kk',
                channelName: 'ytwxxuy3jzn3wt02qp7ayx155an3ek75rtmoc05g0zh8nsz8iji9xj9ip5wwbs8a0zosya0tgrev9vl1s42ty52znl9wup30i2keci3hezvszpkcigxn2enm5ik1u2ihg24qtk7v7d8pik7miqalv049hnxmr1oz',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'xacp51cz4hcbggiz2ytqvwbm7t4x0034vmnpu8cpz5o3nm6wywqyl34ysabkwhw22s368i0enozqdbsfstxowbwuunokiddk6g05lfzm1s2fn5zt8yq544xbvn9u9tfyan4x8r9ilxsqjujuhtvl9zoaw2rm7gyz',
                flowComponent: 'agz15e5j3189z3koq9atkui8k4n25n4p86c4rj3ma2fik7oaw4lwdm1qv880oyr12cvxe25h4ct7w7pxwi1jpc9d7q13segp67sh1xrmisq7uyphfh7pn33mw8pw1vd312pwfsjkfw1dy2oadtpp6v9x4kwwcft2',
                flowInterfaceName: '3v19lslvxrzrlyytou7ap4bli8nyyuerpkh8nllntun6u2avnt5oj7xl9nlb8j5znmt7axtzrztycf426cha3963dxypvt8qfthohy3gn5uq0w9ww77dh6b6mkut20edtac7z5vdxjvoz00d5bo7q72hk31et2dl',
                flowInterfaceNamespace: 'klaww2qxwutot7n7ft871cateqjxnxpvzg7so0fn9dbs3ffa9l8vn8zfslffwcsgoff6bh3igne3zxhcz1wuva337k0pzqy9yirj49mm30o35ybrix2gjgmh1cd5zdlhau177tt6ieqdi2bmezkf4sp4nfics9m8',
                parameterGroup: 'tu4dx9p59oztpawqs9fk9yb836mtgfir38o1g37nwc6ptdlkemm8vmlld0sbxeogbaynrrtqdhgibagiab1t3txec9fzv2g5rkp9xh640s5mzu2b6r7qwk8c95yodbahtvp9g0fj2chfvwrj08ak9sxqa815d8mq202cwtek4p5jy2qv3ylmrfo85hcx028wzqgh10jnv7one2fx5ljzepvmd9iba4mgdbzx7runtpcjqgdp3fe43nx18yl61e5',
                name: 'o0svr317czjzw59k2uanv2m4yjdlypp7f6zlzn0pl5nuxyafyhxoiwhsjrfrq957i0yaw1pfgivh1ja64l40vtdnov0ftbx6bkpsg1eowexdbk62im5fj5fd252jya5jvf8wx4okbxdjt4wfsx6cbgigjpm1l1lv6yh6jsp8onc1emfh51l57thlm6fx13ecft8svd6cq8r21ik5cqtb5gndexgmcbebruvtkh7cdyu68tnrj7tbu010x2pxymqvs68bgjf6oqmx42w903pot57vi3dw4xavvxu0r0y722j4f90ok96wg69ppy9mid79',
                parameterName: 'as0n9e31pqktyflgaf9hwm5zsvcvew7zwgoopepgyonjb5paz8bjyaoqy1gf8na318bxdcv3ql9tbp7d5ukjhibtnpmvva7n55fglh48vk9nqe6gijx1hhjbixzmnh89u88xf7ymlnwkj6rbqr6mt52gc5pwfznzf26hrc47tnek2of9lq910d62rhqtw3ajoj7iuuwpbkametw3xgs852s8bwd0kbqk8yu0r58dcctptzlrn9t5vb8epxzklwxobqsb96warat24xn0vdu4s9h2de25ycinnguair71z4gr06c6i249twt4x6gnc9e3',
                parameterValue: 'fw7wy1bhlam85ocp99um9s3mhf1u0tmgsb72gvpyeaquw3ozuab9f355n2mnz8ma1cgtwnm84rsojg20n362qra43758mkw3uww1vx3dlxa8m1gzhyopoevsbnfp0twucr4npzx3uy4nyd0cgm1s172mcvj7kf5y493bpofjo9uogsi9vzgctb9no3cvpt08yhuulfku0n5zuv8f3ho2dmtsegrrpou1psbp5k36x4e5riopriaoqylm61iofs4zakzr4q52ghqvzyld69gbdrq4t9rhean3bpypuagddp7cy0jgah5x7l9rkb6oyj5nexy9zzlptp6sov41en434eme75z5nmzrwr3mi4dzpbddebzyssvps5vlhb1psdh4px0zxozgelsx507gzwglgcl3ess2hmr2bdv96yzdbz88djk18nmy4cjswwwswcijj1mfmp4jdtzwoyypha0bx0tc2r8oxtc2wo8teizsmujd1zs0gvxaiye9nucx85kwzcsgsv8izhske11yxgcszl9t9bexeshhj15yjr7pgi6fq1ahhh744995fkcf17p070zh1v07u2y9ir2vfoc4ln92fpvkqalh7ngyx966ojhjrxlkp0fpnqfxwwxzrbmqyelb5hgewns30d3gxdi4yt24qqbjusbvhh7mhijqlrswths85sdacd9yobsag6lz4kr1y93ceab1lz76lb9hjetniw2di15yuvhvo8m8n6thfubqthefgghvcmlm15po13sjiu103xadoh5zpp2222af2xy747vcauvqe26vc9ms5epc3g2j4nc3tw03nzop7lj4aks1uwm6oz7wtilmwxvjj95txn1o32vl62yvjlr6rj3v5ewdlduj4n47ac5iik4f20jw8thripbwc3minsiywlufdyvj0b25l2r4bnlvr7r0q4avn6fyzrflqsh43nzuav890yqcywa8yx6js1qvh5yap5uttckv3fqazrgqco0wy6l8roh1mlnjvhyd',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'nmo4wg69ynyvxeivtc670h8crw5thz5vsn2q7do9t2npc7w8vi',
                version: 'piubn11rx4hmgkp5aw4d',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: null,
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '2qmi7i10gaqffilkclk1nu0j93k0zdfoh12d83t89xsqrgurlfbgncaudw7ovtayljbi4qjlgx829q3ucvho1hx6v60eywgug1l16ztz1gx4y6gs86yqvez078hvn9ev03hpuzl2dpktvhavyi0icgpr3c5522px',
                channelComponent: 'l5lcayzyddbmjsnqgssuec4254asoze4ji81v32uimadlfl1yurl6gkfv60pcoateg8mk6tph2p7zsoglhij0fk0bewdnwtwvc5qtztsgigzli4rlhvw3brnywkxj8rj58mhn1v4okm8bh8xvp6hi2qsx68xphze',
                channelName: 'o75cthi4e9xhyzavuj10m7oszqb6fmsvr9jvrm5o8svr4qvcs07zfs8d3vrx35tnoue8bnckysf194vo0er1xpj4wzje82uee824yowhwkiit5yyww5zxmzb10ob8v6jtdo5effc1r0mg5o3q12kqzlf33z1rklr',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'jjb97o9jjjiftoys4dtcwys1x0r21qyy2ixmfbayo27nfsx2b52qh7hofe0nhiiahgdcgub6xz7l32vgthvf3xm1ofdf9w61u2hoo8z3wv2gdyclqbt5rw0ttebeumntc3lx92zlh6u652jry82qxgfam2qpb4cp',
                flowComponent: 'urm9hl66x1uzhnlvzs5j3atgebeol5ujtbwdwd0eqm7hxr768u2zw1gyl31pcf1q1n6r6w6zcduknukkj6b7mzfu4gz9cf6os1be56uwd2l5vv5hwxs77u45urb5l820mwnky0g4ns86gcekhvxau5g5ahecsy82',
                flowInterfaceName: 'jg6xd22l9zftv83ble5yvrp8wppvujpgbuhkivo3kbw53f54hebxyvmani3dh70rq9235a8ynmvjjbzqefscs545uhlrvbp5npm4aqm1gqto213v8ko537q3xyjb95wws4daif6arv5xwda9lrroe7mnnpplfrir',
                flowInterfaceNamespace: '0635yb772vit8pi1sin0lgx1uzjfi4rywr5hpal99nh6d2vljue3wrpbeanl93pig4x04v8eiytxacjo741la6eolwlnaq0xeqer1y6gg5e3se043xuytbdc7voon6kji4acepewkvu7c54pd11h1utuugly6j3w',
                parameterGroup: 'w0tyjmgk3wd0yl9vd1fn4g1d3ag71ql77e8xeeojfmbp2ejvrq9bg2kymluln326oks9ezkpynff9hpstc8hcawlh8z2v5lvf9ei2swgd53zpx3z20ziw6ginf103zuy3m7c5ywqd1ypcmubvrs9so1fkwythy4acr19wtkqijg6mhlvd7glz8gbman4cw1z4y8w6dr5fohglr8klkp3f8vjnopyxtrftsxibjzatyxymu6keuzwmrwp9i4aevj',
                name: 't2womhs06as9e9iz38k122lktkfgnqyhsabbko7ux0umk8cre7356x4lr34dkrt0341ih5cgs1s033liwrzmkreva8lv6nuzf9e3uk4skvl72j2mt6n6f3y65610l5fmwbwak4ubm0f2mdysxhuhdqwffn9ivedbimgb7qpig2jj1bkj1dk2d3xlr4hdbodvoon3oewogpsyf6m4xesqeh5prlegeo8z01xcfqfb4jg8p0nym28db7ppfx7ermd8vsbmv866uus3c0xtavdjodrbr95ova1deuxq3jvq9u8gfbeeecs0wk0dlpt758jh',
                parameterName: 'hjpd44agqrikcgonu0w9zi1itcdmuq3syi4yjvo37kwiqm89pcba6hqavexg6gpk2f6j3cmq4r9ny07pdkxveialhb0wiu3ynna5c17teauoed7q2a5jxdo3hg32g3c5gcq5lo4douux24wk34z81qn89cd24nbuyjs12cqlfc41u1plsbyeill1ttki5po393z7hfbtia1rxjwozpmpi1vr5nr50eoc71bljqy8pwh59t3u64vki84dj3hne7k7v3hc34fduvqrjqspfp97vjoojqo6ak2zy0boxki6iztag6q90btewa4ex8656e15',
                parameterValue: 'n5bqpvdm3xlbogtijpybsv9lu9275uix07kzyxmncdsugtdah8mz1wl5it03vbm5yqieqttjyz485kfi5yb7o4labwzwmupid17j0ez5ox5v4blh2k69fktkm2a9tr0g9icky71lf3n9z87i928esiienu0wrsjsnjzh2roh7qufh1l56x5vrurou6i09h1meso6nakse02pg6470ee875zjhxu6ax53aj0xi7lxjnzheoo3jdqmknl8uwwme8zz4n5odqo9mw6g6uflfmocp7ip02qb333dakix06esx9qifmlqyj05iby7impyfcyolz2ijnfzw6novyonc8kgtjmi5k24yq34opkkh3fd5181vrswlbncc7f7mk79qea207lqbat4k5hucbwcxnnc8jsphrn3q308h2alhjpd00wf1msbcn9o0wqexr1hfd36spk5v0qq4nrp3sr8k6ffcf2w3jvyp6jb81twupiyabdulcv4knd3uvtxub71jnbpfhau6t6uyosak5tbaefr711b2x8bs386s87hkf7yt314hw6q0z7xmd1p9tqenxt8kemmfwmyc9wejbcf50qnqonp7g1j5m11hdrtdl0vr9mvifz9fjgw3snhdlk5ddr70b75anxszntj6u1peqj2fcpj7fzaa637cheps0cgojxgxypfo3faxb8o8324dcpylupzfldouy5mmd26bttykqw593gf7y9c0c7mpgwitiwta1o0v04wldn22zhg2u6vcu3b9wlpf3do00iejmgmkt6b10jv6p4pzwrygun9ft7x5a361vu5amukg4qh33pkxv3g6hjcaye3ghbj7m89ussasdjsf4479i96ggx32245bysr8w4b1zo9pzzw43538ehul1eiiurdfaw58k4z28b8mcqv0htk04pzzs1y75qrmks3cdjmcharucykiuy4m8hu4kfoas6q1l7yz3avsq1h4mjqjpjvrvwlkfc7u6u96y4bpsfuwl0amy1jo8o1',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'sj6voahtfud93kbxipyvgusfi0c1dv11tsobwqwb1x8mftjfsq',
                version: 'l9kmejphvxbaneg6xcgs',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '1w1xl7c9h2p9vbvq4jsh5kbjvgcaqru1b9f84ftxytxap13ydlfa6j1cg5a1ckvg980wnabxvg2nd9kbp1dnapk9nhgync9cd50gpe1e0edhu5e19xu62wz0r36w9ad2j484n4eavduifxn48i00c4vf2hotnpe7',
                channelComponent: 'pggchjgjxbr0vkc220w05sorr8buxevt2tg6gbfep92qsee32ym9nr8xt72i6wfg8qs5kn513g9dd65fsfm3vtwfx1lixym1jes7gr5x9d213rui53x5r1i9m9r3n0655cws1ujwa1gwjm161zvk832ghpafd7tv',
                channelName: 'qcrbb7uzvro8ozvj0u5ohaaf8nzylf2dvu9knelxrbxh0p6qxhxb59ckmb1ulnyoplz7ww6t53p5d0rjpyb89hkj5d0eg6w16a9j6a3df3czyycvnp1m0yh7hthro7pzjvs6zu69zi8ox3h0jbj8uocv7jumt90d',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'rn51o2mmbjkam58k437109uphyw2nw9mkpftibxa6fnvxmh55mk9nh5udgf89dje80vz53bca3wgwdt0e90x6sbawnein5enpw7tb03ppo08uf9igw34zqtf628gdi5bpz2k8v07rgs8pvrhoimuilncs80eyqlu',
                flowComponent: 'rgrgz5i0v4mru5bba511kxjmj2vdz405mxi7muhd20kyppvdv9va2qlbceg96e07t5auio3h2ec14n062d4a9swnxir5die8cdd2ttrlttvupaked2rf4mpaggs44ypiy3cvwbu98thknwamoz8yw8p8uoimtnfl',
                flowInterfaceName: '35vbgjkxv5f19u25i63x5cmojt6pl113n7qf1av7n6ks30iicfokpnnl2mcer70ggejit1e9vl4j6bcasav6mvqq22hbic085s60qujdf4co6s3ardswlwol6u5hdvy931vghw2ixpwavna9y4l2rx2y8h91i7dr',
                flowInterfaceNamespace: '9zwl6hxtmp9lagwwa1it5v8gvovy3qx0vkf77h40ytsc9ulgmi37qo8tivzm6r167lhvq8gxdujbeufiogq6v4foaxt03ciajofbl8zjfnfmvj07m1n2fle7div6xj8yx7eo7cveaydxy9x9l21vrsjjtrt246q0',
                parameterGroup: 'v9jn5h71pzv8ro8mal8jlfnisdstoaezh2vhyqurek61vxbsvxz8hxc7hrmcb2kwxx7cehe8t01jltllinsop249ufprow1zq984f53e3pvni0omso698itu7fqep1f5636v53ktkfqrw38c0acsrmpw862n52wepfdsy9oa2yudl30hd6dbdswesv3ydd4h6ywvsg64xm0uw6rxsxfuwkic84fppcaabtsnuzrplwtpi22m6pvn48p96no532b',
                name: 'wkrcwx8p9qmz9v4d10imy68wg8q06lx2tsmxbsqpurkx84hyt9lrwkwxclbxduapsfgunhgj50orvbtmeee1dps44pn9kdp80psk00nii66tz7tybj37ajikzeyup6r9j51k2e79b5oxxqj0udhicqqzq2l4r2lyyik3ph74zoqf8jiuersxpbwef6beenxloxbpezzxri4usoq7o3zsjm3k88oje3tykdmfog2yjmhm2vvftzlba3u1jizfbh5azcdoi1jh399xeb7kvylfkukigvjea590lq3vg15btrsp704aysmqy84c2m9p2mrg',
                parameterName: '1yahsd1zg48pv34vf59z8ql31lxcaxvu2wc6xrrnc8foizwqzg2u0aneo5k5t9mjb4akmy8gjhk1inb54877m3xdvo5v9231e8u9o52raegz894slb8b6tvrit7o6rbpsv6qiwu8ctrh5p7ca8mc2jyx0jol5oveu52100kc40ozeyutwz99956lnc6z87ocz911xwpkekur8mfab1eokf8sz3lss3piib0itp3t7chsj5i1e7ypggmnfw79itvrpcx2zisstnp6025j2m084beh8wphijt1c3esypcmsum78xx9sxzlw13fflhigbjf',
                parameterValue: 'gqgpohva8utvof1yyyv5r2chxheax1gahq8h6rorffrcrircffb2rkgg9nv11yahx1x7cvmg6st2paclykk38y8ke40sj6lz7o74jusl354yvzx6ldpm48r9jcu7t5vpzd1f0x5ukiqrz7b0wyz7ciqc1hv4qk6w211ujphikszojki4wjaz6d3chfu9p014peulet11pke2jk88nnb749o0a9eskg6bhtuxlj2xqax930yud1j9ttvvvj9jb8g9c78cw89ctorbs2y96vo2r5ckycyi9lqb01ff71t5n3wbx4b5fdt3snmicft283tsljjwgb7schs5gywpqwya9aw1mlggeexfnc2808l2sznarzfnxs0tl7ecype2alhmn4va7doj0fenesp9lhi3p5eoc23uq531k84r35tjkwcr1ksqok4t0fv1nzt4h7fm070la98zsnkz6s7i1z658jrhyqr11qgwnkorcnyjfhpwsy400lcgncwhoqdoxhvszrqw065p1perh7bfsc0tvzwk3xwf5naabbzngxwt974n581sxak8egxdsnk28u2qh0fgoxu1yuj9a0wmazxv2z3trei9lat3esg5vw2b4sso1a9iquoyoebzj2a51f2854yy1rhrfp539ig2y2r1ote5onhd0qc7lh6bgsxg12x9jvihrdg1si9jxklzpdyojoclrdc9n7a3r0tq3b71s13rk8333qm3d73hu6ro05kdnr3w96jx2ri58smsdhoem3w6xnmxxe7prp0juxhwcr201npd1ce37n6bgejbijzmgxb37ldal5dvf272rbd510zndoo50cccvw1u43paoywy6oke0ewbnq7fw01or9gt0yxiaxe6s3giunn4yvk51n8ve4h71411wmac5uzrb4z7i2cylu73he20s7jxsz3a8qcakp7p1wlpac8syfv7gcu15xfpwfbxekcw6jrfwrowd2r4ihoq3vcuvbapcil4f8iutg0fva7agfmztglq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'ii2cszkcb31vlbt3ff1ukevw55lqi4fnzo14wuek8v757qqlv0',
                version: 'qrh17649kt2kua1bbetu',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'plphbxebbh2iype7zveh',
                channelId: null,
                channelParty: 'hmezhlw66j0m4l6jicptul3p5puosld9sno70l0dvodossl7heiqw6141kwz1men8okatnbicc09d524s919sb5ibrcs7n1omvk8oacgpyskza50fcpuynuir5pf30v3nttlfmp99g7q0mahvt13r3dfzab8tnn4',
                channelComponent: '4x2icdsfpwm7yf5yi1hwywzp8qw3ts38jb3cyk72rw1lke5an9jd8ugdhpm479khp1lo9k6th6h83q85bde23auhysfyu1qqjwot4y3e2mrdh0ikl2xai0w168tbhbwalhcgu8bbhm56q4ntmzvsfb0na2xwibyi',
                channelName: 'sixv5xhq3dxi9hn5x46wnhu9vtip7hclhlhxsou14qdeopomq3p18jbruhaysikjap6bz9f57h21eexmrm2c9srb6q1hd7gb2clrfugkjwgi4952asrh4tsygtr8y8gfi45mfrpqdwf9w9m2w9t57y4ahu5g5cc6',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '7mwesjmkmmulblsuw28leotxkanb0hqrkgrz1x4w8kzitgh7peasaz8bjjnjteru7gdvt88kjmcthe7ai7pbdv619lv84ugf9z09yoirj0c9qa4aqda0wjob31lfmo6mtzd019wofbap1grs0w97b5wyrnkh9106',
                flowComponent: 'v2cf9qj11agkx4lcf7fwygly7yttqo4c8ulafiareciynfwy4a194noin5el78exlm0l1ylxwzwb2egakbdoogjor9c9rmgkssetuqdojbqyq7cw9e63opv6n6njn6aaoyg93gplgd81k9p84gf35af5bqhfb8ig',
                flowInterfaceName: '2mmqbnrochoqohe8ev4lkfhtqcbksqanvanzbzjacakeid1fay62tb8ncsmz6401d0uo0ts4kipqrjzdfj8n409jfmwomwo71jyggny2npk6i3d3hpr3xizbaxg93crubx4yocxsda9ygvfjulhejyajnjmo78jc',
                flowInterfaceNamespace: 'iycovwonggbwtp51u67gjonh3vtl2hesk8du7vk1aw13p34iavlya0il37zes3zsq3kex5i1em6rdnye10afs36658w5kccpp9zu22s1ffojm11v5q940saxdzknj3g3ym22586q4bqstck3j7osu0299cg1uos5',
                parameterGroup: '22gtr7lvvr84ntlrc00qw8cn5r2p5lau604yqogy4ac4hjvbp5k1zp0fwrrljk5gyk8uil5qy2kj20dl25d0i86ocba620e8445syj955pdgr9fws972bq0q7npvhz59q0sgfzxrt96lbjxnp44ynivxh6vc5sp4ybw8f6uzmuu6480epcw398lfc467uomu83ndguijll8nscfkpcsdpb7re0czw0vl0875zqhjw1wk3ayoflevhv4u3u1ty7g',
                name: 'kkmf3l9shy4ogjm3l8ktsa9n3zseoyeb6e4mzj2coqnglu77q7s30uvzrrg94natefpdeokptfv0383osdbgikf3o2qaloa0xjah870pbuaa5bjq763rid9hypfxnw2ge6c77r8ornc10by666h5polh4oodi6ty9w395pkds7suopj74ei1p1vkzhordp6z2vp9retvzzystu26w198j2irkqbrfse4sr1z0ke12dpx58gwicfomjrcemgebzpdg62g6lobw9bge40yf3wjxuh8avrwl2kzk0dju6r73lm13c0c7tcjmvjxmnqp1emy',
                parameterName: 'a25a0ny8xtum1z5blfvgtikzk99oolu2qqxxiw0deot32ocj8h5iht4946i8vdt307ixmwhmgziq6gkebdtvvpsmzgvm9ozbjulum2uty6p1qrfck2ev6to8he3902llwjc05a0xgfa642rk9649ohuuj3vqcpc5fs93mzg4w3i4vz3uvk2dc5gcswj7gci3lv3uvsyaa8b2h8dlylbuss4gfdjm18yaoh7cbvolyk5ud0y11ozp7w1r6xyo16fx9ggrh1q54p64mca87w36d3ux2k2vujyitl4uu6nvxi69v68jim827yyujbtxi35y',
                parameterValue: 'hkplwt44scq7jsj30er2t00zsafk23d5yxrilcwd17iqmjwtzlpzg36qhxry60vehqvjsv5yvwowyfo5z4uacqxsl6bsmeocwm7m7o9a1a71luc8ch6v6me58in70bw291m5e6ntexbk6rvs3e40f8zy3919uiuj16t9upzrmbzlx0sz53lxowg87c72y9v7jag18exwqdoyipe9jb3vs4krnzxzkt12qmah7ksk9jslv81lhzmp38b0aqxkj251tlthk45ph0ibvxq33dec3st3i4hf10d73ripfipo8pu183c3qcm5iqkwuj1w3lpnklgm6f9uc54ug6c5qqgyqpmb0rqpe90la5le6w0m3nc3i5ujofvol9ic7y297wft5zyve52c4ob6od3scv6j1xxzzgx0ac2kkktge83ef9hmvtk0f7pvida74ak6jpawrei0yo72lt64t9wdmxdaapo34km2f732tslzew9pg0gjlk01jkkbq5ww85x6qmv43up8jmxch6zlsfy63fgrth5muw99rqhufk8ozc07rkamcctxwjkuiuhh971eskx62ns55lr45psgvsuu1wpsjmllsvluavgxrnwy3to7n0if71cfs0w15qo4rfspdi9p8w9grxw1gypzfdvyq40v21jbe4m7s6dedbkxgial1rkjs5snzvedzrnddzcxep4eqhg2m3d52su2huf437p7cikm9crkyr27j8548ul3p3ejxhea3nkf7z90qrladklyktkdxsilxgrv9rj2q5pyzpt24hum66bzfqnaeajsqv0s8zubgbkvwke0mb30bcqeblfglz9530ayoilhye86ivlk1hiinpyh46j2xlghoriz3f09mxns6v0rgjpfpu015hflq13akoawtmsqufceqsu27afywmf9ig88y2x960iht2mckrka1nq6lt609r3283s555dfjvys1fvin0hbxs9m221ys38ug2b6a47dn6jkjphfjkal32gye706m9o5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'm156ees5lswe6u22k3o0n2807ifgk2t1ypzm53ix1n2vdk9x50',
                version: 'k0x7iht38egn5yezfltc',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '32wo6fdqlz5h9sikg5rl',
                
                channelParty: '5cr64br4tqe1hzme3v5fd1a11swm4ftn5srjw3sth9gfp139v8ght87ozrjb0wkcidppgp20xaugptlmrm1g2cvs3qqojgm62zeb7iii5pfk9xsu3yg3zvau3428jrmajwv4nxf7h97e61v9ae43wel3anz5ioaj',
                channelComponent: 'uly24fss29xi5hsbt12mzhj7uxms1cco60vj6cklahf6e17wo15od7cdbh55i01hqhz38cjrmu3q2hyyg35rhyykm4c16onlc6kelwiust9zbuq8hfyo3h4v1b0rne7tbc0m2csa563u0wgt3htdga3a1nathlty',
                channelName: '2v8yp1mzbn0z45q43zakl57a0cgiq6pe9l244kqabtgq7y54ij8xvl4mmtee8bdyy3wl7xhsmob8hw0p27kt8nrjeysl3obh01p97wiqgoaneav5hkqmu1jom5mjtusq5pb2ryfkmm52g4ko61fnw1z3i6g2vt58',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'oitfrsmi7b9oegan3afilcbwmkqmn4e7a0n2am6qi0sjmtcdfwdxvr2okupybkowri1muvqkuuha87po0cgwrxvlcgdi2t855ez31th92d15zyq0ae2hhvwusk73x1ky9wel6ns4rkgm9g6w815tdnpl5r04oiba',
                flowComponent: 'j90tqgb72arwct3x3fybhq4jwkx8x5em1k5nd73dmf63zzi8f1v51sb8fwumu2bxrv7xyrskq7dy5yd7pnx3ru9j7v0acfownqkho7d31a7h0zv2nqfjmof8it75hi17u1tex5me5qn3gn3prh69tljcz3tb38ia',
                flowInterfaceName: 'j0753ycmal84s7yhvl7p7r11qfpb64b9d1xl0e2uqwjanowizrogyjnllw5nibvtw4dpdj01v10jxzpcsid62yebth7pkd6s5qtppwnis9guk3yz849kl140ox46eza6fn1n8xn46d3linlrznsg7adnw20vgx9e',
                flowInterfaceNamespace: 'w6gjfn7w99scxea40k7nr6ckwwvogrem8khs1mc1f2hqwrvrml7te31nsvffhw3b4y1w5guighp2fr88ktj02m37yahpl13mpkjakju2757nc0kskr1dmswjgkse5jrs1v40b4rky5c1zrpigafvi41uzfnx4r7d',
                parameterGroup: 'g20mngrn9pp7omw0y4f5s1jwlrbsfcek5zbrax8rdfdp8yf1isaik562om4dxq8j9sx2bhwah4t7tiklbkik9q5egehzhe31qfyp3j7upnrwiwk6cc7cl5psz87k977ljm0x0h6oly0y2gy7x5z8zxufx3g5t7pi236pz5zunr0ovnp94bj77s7d9kgncf6dc8q954tlfswnmrcq1og109c4ewhhplefqxsha34q0qozzcbqwkne6lfiu0ygkqj',
                name: 'ucpk6djrpyq201kt9g216frnmome901sa2pp1ibjlrobjvrkuv7gpxqefzd8u0x2d68k752eabdytojl7z2jznjl7zlaohx19d6af16ynkh6q0cmz33vgko2pf73hpcinl2cy68ls51t6q51yobpj3i8ydtifffhxtiqz33uax5uvhmtkm016ggqlts4fb9netfebx080t6bzwxqp6g17objf0b8avjsqsyfifw4dv1lgewix6exa0x3hvj3n58gqh330qy6bf6rrkilrbqd6l2zrhk6y1p5iccog9glxz91ptoxujhpkczz1qkegeyq',
                parameterName: 'aksngxlvlwi0qc8ol09uwf0de4y9mhrlvi32rf4v23l4vdornoupfwx1ubfp8rgust9k6q8d5jq4f3wkoknyy8ewrdpzfl02nhrycyuissx00vy16rncgsjtu3nh4wx7jqv1q1ed7jh1wsq43j8useciutu00a4xicpuc63tiu3vncxae1tw361xt78zqgs3iuoe0sijuaxcnn9nth26iizlx3o506m526kaeax6w3hplhe8j9jae86g0wn06kbj0jhv3oyc3b0o5zkj4jp7i5rhc43vcr8as9z0czdm3kzk95wid25zc45ns9glegcl',
                parameterValue: 'dqv7djxqxt2jx6dlllt0pjkn821mi5qdjjbfp0lxmj7zvwde39dmo0bgf88w9s4ebt6187m01hicxkthdyhsbbwywz71q6m95yr12bp6cft95cgm9own8180ssdibr6x7yjtmf1vqx33oedg49ill4oy698orldm2kmbpi29l7tut9jbhtly5s1oom6j7vjoz5z50smylfctqsi0vizo40iw5elbhjnqkkdo96tosyei1oubiwrv93p3p4crf2qkhbkmpq0q0nuudfxy1oxtbp1z9a64wl59o5johozzia88ih6u9zo17j4bt0qpxh0sonlwe55xwe3si8hf726am0se02wql50ksv5hm41puupykm74epr0se0fum78xv75oy6fvwgabry8ncrei8m2mm52og2w32yugexrbznemforqmomxuz6m81y8rwgqe1taxh4ar99u66awwgztupunktqy7sa0ne7w3cusudxzblp1t3co5cxrw13oeug1qod7x1wmbbbe1eeh2zyn1gt1j0lqsvzgl99w4slz5mhcobmsmpou3fyaqhc82dghjiruaml0i53hm9l5yp4et9y8nog9xr1tddjstvvi4uyxsdytfbwzv3yg0vzb9qv7sj7umt0p58dtw3z0sw1xz002ad79r07epk3q251inmczbl35jg5zu1wlixw80rmy54plh1owqb1f37yo8v7cf4zd71ke0z5866ghq9gvjfq2qgpzz0zfmfj2geaunxgc8r4zklt14srvm4mgf3q6w7vg8jjewlbwh06job92russwh320rsxdlx1ohiry26kai6d3l74qhdsw17f2lwyvy6aq62oshh6yzjsgk5wet0ih7xx6lfyn6f48ijv4rz46jtgd6tb3qkkq77apt92x6ocvjru3wo9bwaqqdsulraewtbrezn1mjn7iwepflextzho04z8yqvkxrzvbe8ei8zys3b8et7yry8i7ev6b77l0k1n6yp1yarb1e3hte6qdn5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '9oz838nf7cc265ybv4vov66dfmt5sj1wfcebfnuvp1p31qvdks',
                version: '9n8loy9c5dejvhowjv3n',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '4jj1hcaonqowguezylr0',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'z4lirgm81c698cnby48sooeg63ancafmnr1topyht15mf169aw22h5br6e9e82ohy953iowapcs7ys2niysgsqbyoiijxntfz9i1x8u4ae2c4yatzrjzq1um64m4tnsodttejg3xl74outj7b10291hugupxq5uz',
                channelComponent: null,
                channelName: '9zf65gs6h65932r46hp96hsn7que89x5c630tzrvajxdnzrh6ff8wlfxfrb7bh00rg89a243w8l2g5js9volxdgbl3o9axfqvhl2bdzjg4wlcxpmz7s5ilk6fiw10ufipqgshjdvccjmlagycwhwrcvdc8ft2gt4',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'bs787x83mwo5yikyke0stvhbus55d5uakny5ppv95pcci86ldje322wcunhnwr1z3p1gyw8uk3ks3xdxlhkxh43ob9xmit3lkuims093knj79q3am9spcvfa8uspzduk9bj54zbpdmlf5u7e0z0rvra2iscajust',
                flowComponent: 'f0pkxnw7aj2ssydyf7as50ito5oxp36xf7l4hqb05dd822k29024tt1l6y95b1blv5o4tbnanas1mvlqmn7xtrrmio065vxo8phgwu41f5d66rxj9iqaycwrxdbtgschdexv3tzuuuptn0k8l4mxcc78zxft3np7',
                flowInterfaceName: 'ncsmjhqltwr0y4bn6ahulk3rv1lpt2g1q92j2xl0ssed97g6u903hou1gqqxa1mvp7wg146ufblgeenaficvuleb3rd2irfmrso5fjkryfc5foggehf3v54ti3cjg42b05bx7tsm8caa74b7whmvyvdfnhuazrqw',
                flowInterfaceNamespace: 'kf3t7zpu1ar11ysln7oqf5c7jdnw1wl4zq6fdwj2e08tqfpcfb3hd7vjm5wq7xz9x7651hfmlxira9ub3bmsjo00b1nrra4ets8rwdgcsj8meddst1xgtwrt230x6ckwhvp41f2iqyf25j8uxyy1743sgbqpqdyw',
                parameterGroup: '48ulqhzxtlym3mhtf5uxa2i47n9dpwt9jzq5veimwt55atqroa7ilqaw5ud5tcxgoivomr6sml7zwbschkc0b8p5bofsp6trh4rl4oz9fotd0k60uxlwexj8op7o1ii9m64q1lir3zw7u8gc1t82a14mr8suzouaov4cz9fx7xbfm88mfer9yakd9vrhqnfmkkhjpzhsh4qty3i6qirn2e8908x047hp7kgatxsd78h3fc3w1nhpmq7314shvb8',
                name: '5yk8makmx3qhq5f3tswhyltr018u5w1vh1bt3zwcg5qjnc53yo28vxr0h6zgtpvff9ir7butqvor7pi2mz74tiqcrnynpw3rzukx1x7eck8rczuiix5mpjgyu39nxgln1110woi45ansinzwbai486b5mw8257a35wb3lch71g44hzbdcaow1wkqs7bs7m9nbi55sk757jhl6mirozczvtcjbkoumuhawfdjo24orrtwreg46pgsjcg0z5zfi3x5v84eb7wrhujlfpv2xqdze950l6c3zmj6bpm2fup3m6lb4tw5yikoncg0ocwa10ka',
                parameterName: 'wii2oycnlamvz3r5zku99zlvp3xnj8gnbh5yaszf2m9pcze5897z2xu0r7bnpjpkxe2dv76fqqna2sd8idbr81oxw9y13rymukfxigluenp6wvcwycx1emj0n630uqhujb8ihgsskqztk5h21wu3vvp4hmf49ewfq0s0ux316k36szy30gbpxho3vx9hzfvqmed5yawmk1s389bzptlt215nolhrp6mpw3bx6e4lqigfb8w6116xuijzc5vwyjoat56gc50rgzbytkfppryv7tanme3g7m3hdv3id5e0vqcp3cwzeugn4gaz8v60f6v1',
                parameterValue: 'bg1nfbwzj8wi1847q514y22iv37785h63nl8o304l31ufrbyalvb8pzr4bhwgqiwwdgnubn2bqmqkfweekcg1a6rh1avm1zwhhw8tic1rzkazstevu41glcnri45yam9ayzzfb7gbvmleogkndjgc5kntgpmk3zqww3wqrd978azfev8rwjc79mw3pks5wzw29v4vjj2dqntjlwsrrrc9mrmjxyaz1s213ppznv5hzj6lcojbxjrw6xu8jcps1jkrmm73zi1tc5okp1cmrllyvzyyby6qrgcdd5ti2iwzs8torfqw2t5crkaarwazge1gposidjz3epefqyb3rehu1haw6kkcz4gszdhooa2faair0ior4oztoytp40v73w9qriw9pmu9086916nc1dncjgoeq6c7yk1lj6i5hikz7xosep5rviqs09srzjzsmnuttyztxl828dacb96nrnk94g27mqhcrf24q4it1mc4q6989jt2ixo98clp2yc1uxvvdoa3p35oghfdoe6o0g6dwoj3d2xzje8wg48110vztt330vd4bme5e6amwxs1wbxs4hculh6d43y4h7i1qcczrrxxkdmf2l4itt99mkrsk1dh5zcnzfh148yeey323owx4v7qhq3gb53uzrnzcpeyxzbsid7op59aq1tl77uxklhe5m38xicc1nukfovclvezr8ww6dbwbm4i4359urfgwxt3jd3qr8xe3syiaeewa2zk7u0scqw3rtsg3qdhpxj0n653bxq98bzimsih2ap2ur7w427xapjemrk78p0a7si5mdiodqry9d4byb1voofae7lln9h8qa5qgrqe65tyi9uh3es2j0sg0ioc2ntvx092mzjdkyo7oiiwdez6gscpy3xtzu8urgp5ovovxknom39lt0lk9opcgmz3y838wrqrbxt0qyed123b2r88343lxs1yrpgo39ftwvqhllc3g5i4cdlku0hbhkbnyindk31ykt6qbvgftv3x6n33v4e',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'xofzcs5k7pnx12k6qanuiogygzosfidvt0azbdcc0rgasuawkz',
                version: '0hbwqgetfy1a8n9g15un',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'revnt3vz23pzj6yxe5pr',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'rdhmdqwdkubnnial1lz0kcgm7le4woe5t2fkuc9f5zyb4s02nkyq9cbge10jvv4l9u3utq41ebvogxkmasgobcwxdjp1iqx8x5u45v79iesefstnlgr0i8y1yxsefcutnunm6goub2xhcusfekybgn8jcyuv8bxl',
                
                channelName: 'kueucpkgu8m11bvyuwp4rg1g9l662qx1wyyvi51yelfrn5vq1b68f9v9zs85mpwohhwu7odoxhmc4ss7jgofy2z61821cikrwm5yl0rsiixn0er5pogehfmgrqan3crpp5kuoxvy662j0ppds4fm6zw2sxppccxu',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'qav9yjmlhx6lj6509hzct8lh10et73f2rvfqrq2vl70zzk366ofmc6m6k6wolcd9mjofwrtruafz2712fnnq2b4065vszlmfma4tn64nq6dsfaezkxofzow0og1uafdzrl19l4ftzmba1q21n4jbmzfbrqwvxz0t',
                flowComponent: '7ryk1hq05af3o5her3x07d6yw9236wurr0odbdgyravrj5kgjadbstskame7id7grr5rtr1ikwj436i4mms242qugx95q871zvxw10146feiscioqcx0tlv96hsn43u8tv3mczpiuw0x5vlsm8nxkdoz8ihhyxsp',
                flowInterfaceName: '5yfoqpmwgzd8xuzlnnm2ajsnq3mm4p5ca6uzlzt9qxlfsmg2u9jkxfoijyxt09weszko98pf20mc4yz40zc3muu1vfgrbzdrolfhyjw0t2ubro2kkkv48qjh1xtimsin5i8bkmgsiu36lfzvxvzjpuv1ckxqc6an',
                flowInterfaceNamespace: 'oc72h91z9npvhekpta2ij43kiqnns0o7812qfrt3b6ij5v6erbjwy30m1m9xo1ukbglbgue1o4a3mbskoouvmk5n2nifiwzol6gvhew32rsnj7c9pf8sszf2661zqstx0iiwoe105ycsdlhdso4youjv1iukltp5',
                parameterGroup: 'n68se76s1q6qshlcuslen0un7ga868mm09pey0jcki0ffnza49p6a8zjdcwr1p6wq6l6wl6yo41thffs2c5ro1nmsxz96eilf2hvljoknhpyk0c25xed8500ge77jiczno9nkrgt536lsoutf4i8duc2h9t6um7r0nq94n4gnsyu1p6atb1brlgbf9mc43wsku7tyiluhco4welbzg1ftlg1ywf1did6ftyfl193zm8ic94yxzkrilizlj66y4m',
                name: 'c3doy41tv2e3eplt6khv9mwzajk4xj4wfpblwmhpwbm7s3jxa31gdt9k5jzeuf4x5tx1843a1cz0ldp5rqcsz5aut72voqb1r9gioxge5d8s9jfbvcr9s84zkqk84gy1vuxpo6pe8x7y08xpb85lk5djwmgyxtgzwfs2pnl8427sxyby260f5a1u4kaggyi60q8g3wbk9fo5upfnjhjj4oqcu67n8ctxi01f43jegnhlvpj7yt4nsime4v09xfalhyfb4ukq55mt1nww3trhggq72s66pttjysz2dqr8h1982u1zne7w0drha23asxnq',
                parameterName: '6sfnni9g6eytx1vx8iop5exwjf1vj7oag758ir85avx4h8ly6pajcereqpneinfq7i8x9wkrkg0xvpecn5cd1svoavqccpsjdylnluh5l34242qi5wo0iivq415m4w89ydn741irg39vlcilzy1ayj9wb6uq5yn0fw738m07a759kggylsssfws36ee1zp6e5cfnvlnly4jisvxqj53czis1whjm1pg7xjdxaq6k8ripaps9v9la29nnwq6lvl4ny981z2mxyha20pc8nn9wnjbnjvpd63gcbvctq29wbe4hjcso8n2eublxxdvn4762',
                parameterValue: 'apgbm0gwe7jn7z5z28964lpglpoa7fv0jhye1j2nm6e6ffoy4zz88ebvbjnhcthwec4j5fgvova5pe5menheykih0ska82nzgbmin6s115o5msr0ddkdyjcsczskhg5l3ocrw3a19ah74urwvb9l0phszcfzw7izfw93043gx0i1yd156ky0920iq43q7lc7kshumzje0tu8h5gmqqlqsd1hl4ft7nhzgadpv25vmx9q9ss49rxk6hvw6vo1q2k04gnbq8w04o3qmoaqhkkm613xfkrmywl3h55nyxrchels5mgknfpe7npwmd14fijtghjh3r5d81qnqidixe2d0pt3xium4om018qfkugezoivxyr5sfk02y8fo1tcikmnyi1na08eh5yud1rfnc43r8uh69pr9zj4xululywk01rtjqt5fkr74d2kgimkyabl4vpqqdegtx2poxnbf5awbqkn34fz4e2lry5xe4orvbevn7wrgievc3zndsz1ww53zf7tu65n7ikqe2radprjt5sl5c2tfbwtbnnvfrp4xgy45ox5gusoje2x6xpmeqdgz2l7mn1bo4npz3w29viryisgev8j6k97gaf4rrizyl2ehur5qxy81uw0oap955w5h9kjf8iykm3qcqysbdrm5hpp9pmeqosv6xo2iqovv9gyi48wf05dwnannt8qd5l54h8tso29jpby4rbo08tyvgchithsed7nnyr568dfrfjdto1i1emytlw0xwnozu1xouimhevzntztz97v6q85tcftajgy2jg6234xg6nll5u86ool0rc9bdjmf61g34bvmgsreb0o4hkx1f6z4x3fc25ge83qpxxn5rf649rtxk5dvkgywbtav72jy41inpiy3zzytkxxiqenznr1rt4xasn49svnuc8zrv26gdq1n8yj7y1izkl7sq5yqa2owjp7hdu10h8x9lzay4i9x563bzcccvc8nnurtc0wkvf5rezvs8vegir44rr9hacrghkl',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'cov9t1zdygp984lo2c2cl4vgqm555m27jojbgn43k62dmxscuc',
                version: 'ow06h58z608y8c9eszse',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'pn8s5n3wh46a0xrctzk2',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '7ik7zlouwin9ile6sy7bt9rtcsrpr06alxopvmxaqguc99usb37gf9f6qvam6jwjs66xfyqdxtago0uokl8clg6xq9d4oddiykjvxi8ha6rtjdfk323xb4n4ty037rl9gs8flw89xh46nqa5u9bya66t1xag4kou',
                channelComponent: 'm9nxq6me7tqmzrzeu8kd8553vkzak1x1qr3gcy43x3ms7wk2s0ez4ou1i3ftp0uhvne5h0u1z3p9oelgwazddn17qkgjxgjsj59kfvti0mzgvbvkbah4wieoj9edutq0kvno2y24cbtbec4zbtm0r3v2djq3uvcp',
                channelName: null,
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'g53zhlwuverf470ns91qi0e3yf6wefefvgydtbyfpy9xk1namf8srcmtg96ctdxx186c6avojpm9y7p7rcml8mlryrsuo4bb9vd28a42adx6ylnxu7anocr7t9mwljupsbstw4rrt7jb87onrys1viflpxu8t09x',
                flowComponent: 'dzk6y5xg4nxeef0sb96l355h2taj0r04fhcv5jokw5rrxnvpb11goc8qhbuto70g4n18nj0exum669cdy1hyl80bm85qxpafw4qdr9w9tjfv1uc8bqadt00y3j2azl8qy7cf12bowbq4iuls2kewjvcy3qf5uy41',
                flowInterfaceName: '1apwxaslqbpbm910egpdjpcv5bfsbrk8ns7c4r8936x2v7wc3p1nmjqx5y2dtsppe65nbklghrv4espl960vkswlv1wj45d42uzr87ops96ntsj0yfcklc8r4czql1f3itrycyk8nkesgcxt54zhx9rdrf8t4w9w',
                flowInterfaceNamespace: 'yqxzp12a2hg6wb8lu2x3mziw3jxrsrjk72us825inqwk8mbuivkgsara9p0le7fwnoto2guumbby34v4305ilfbico0bgt668irol9ia1m520q2n4yq9xq81atfhtlm9682sfksfrtdv9gmy74v0700l52afinp1',
                parameterGroup: 'pohrluz4oxgbolgm7ii8v8fl8yufzjj1xgasbkhlducba4bghmq3c7xbqq8dx3qzlb1za5g6x9ma1ged4nr35ito8ctctp3la8kw8a6z1fm6nc6yxrop1kgulcvskh7xcmxiwaelqfc9b99x9zbvjqytmbvwvehs0rovz417nma8ea3e3st6rb5gll7jqohx00xm6oo7e2ruirjzp59hsmcupg8684mdmi3i2fd0saqkvuqjqias2nyfhvtbxef',
                name: 'hk7lyilklx7uoyttcjilaxhl1pah2ycimo5v6tu4zyfynoy9mh8irhqptt7q83ujxbpombjxswmbbglc1gola2kqntqyxvg0758bhf0sxy7c0du4hm52lg3jt405jg070056cmht2oa7zhzmfwrg96bozqai48l5218vmlgzr9lqv2orcq3bdj9dh1z5w06j3k86t0u1n9f0payn7x01csiobzndxpyailzfvmnwiixq4jqzxawj21yisnwmzmsgk2r1dp2gpy6vsfgiqernmwfzv3nu7rbrhzy7tz31p5wd1zg8im0o88t22itw2n00',
                parameterName: 'sflno46vtqnw3x1msgf37191z6xfk1j088ujrkvn2qbjvrvseg4ib7rmzk79iov85fysr5odothzzr93m3nb85c22t2mgb46pxdhyibcxk6jlq1ofubxlgvbj6vyescj385nxq31yjg2ywbm600891s3xeoxeq72lz2nj9qlbal8t9bwzwx29gosdlfv5ithrkpxsjq5kanrx82bjlqyjhjpwimcg95jawwebjz3htir6my1z0slafaqdyljn1gvlabn0yeo6654f4096b31ig4selsslcyg1hogvnwb9iuou06wwsz309mq76lqy0hn',
                parameterValue: 'bl74j8ngfbreyo7u17qkmq3h911nwkahw16c1b09t742z5ldb3lpwpdsjtps2ejyuoxienlw6k60say2ioo1a3fr6wdb77yh86zr3s2gycbtifdkcp8sihigtpufonhv1oxq87nd75vp26vrxo5ejvkwxylxvo9zafmfhuwily7d5xkobk5u99iyjwsy99cpdiqus14rgor1t80i7a0ua784o5zt0318lc3kvnxcdhynsgxvy06pmnrptim9hnnmho5bpxyh7j8i4i0l55t6u7v1eu66odgk0uvgmcou0qxg5vqc7z3yfxkmy3isuyof8qm4hio1l8ulm00dye8dn9kfpkq6mvik8hmhfm10og6oidp18ypo2bgqctl0pyxdib3y3tuaj8erai80wk3dlh708ol8lnh5hjudsxmmfd92esg7fn5wefp83eqts58lxghcm0vfla6vdxq29ndv78j9nhz3yknueo7w7my37l2qd43d3n5dpjow5snf5r6vbduf66x2czcbzbcn3x16nq4ljce0tv81yzdiotblch3tuls63sur7ash11j7tnu0sjnm4flim4qfqwv1z8p2nnf034vs7x7tdcwshtxc0xfjyr0m7q7bnw1yxhq7m8gy60h03hhpkcft3p57f63o6wukmf7pisuzv9yoxzuo5g8lo3ksc5ok16vyrw4p4ghx7b6o4d5vz9tdvs721h6l7uyds190angihqxosbxfe7xb53j6xfrmwphdyt5edhv7m158py1vy68mkbajd4fikuo5taqnkpwz8n07dng85m1utntqhzjqe9thojmlxbpuqjyn68c1gi060eumxqkgv7bc9jd6h48au6cvc39ssm8mu7t6fk2r0mwndwldjfn6qzo3s6n0n7kg39lxxxx5sk6gocyiyhgiighimktzg4q2hgzfmxc1flzyhvkhw2xgg3u7ln39s0xq56qtzhogktg7o00nh68x4qt15j6f7dpm6ik304ijpgr9feohuaiu',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'f8uig58idcsl9uhq3j8j5vm6lfoaqa5dkf8hp8si06dmu0ttsn',
                version: 'kp1mkl98hkolvxkea03k',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'o4iofsg6eak361tijgrh',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'xpk24s24im5v5h2f9lrqn8zqhtpkthx4j2m3erfzylwsfiyg4l7ma899su03muue33q0lapcndaekeyqxlutr4be3cc3kdx7wi1brvf1yl2fgay8gwgy1tck00bnpkdoxqgqlnyq1sxkhywpuadxb5gxluviukdl',
                channelComponent: 'b6x3oypebezasih77268ju0lh9qqhtzi67h0311mwt0n4njy6k5unx71lequhctstkfdh9bth3f5lvwlfgurj84spl2oldtep4l784dcwd6u2yo46srgpp85xogo8d4au7xqebl7zlervkrzga6ms42bp781jnt7',
                
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'w4pt7orks2axyyijlct7jbaw2j32g6u9j66xli03apv6tonmto0ntiu7hhif86kuvyzopdfpjcyr4alnmxo5sfhfxnhu45s10sk5tzyf21t9uxhhsg4apc5vwwwrwbck7p9zrqz6rbp3c84nn35i2iw04myakb5q',
                flowComponent: '2g3fdr3pr5cnpimu1mq2p25y8vbvervzcia2vhb791nsd9lgyozb7awe64epz88cntp3khk2wkj5zni22idjjjb5l64o3g14zhw2ucpogsmtbuaijqoyq2q20ivvmpqxgvexhe5abljegdklty5igy1y59jbcjt0',
                flowInterfaceName: 'lma6ds0ieiiolnn7ngczw5t64og1cnu1zx34rt6sju00q44g7f8zn7hg0ho02kxvui530mawy9oeoeaxd5bbvnzwqyoi8m0yuefeii12s6ymg8f4rl32jsgpiivdfja6doivubaojb2xv2qk0ytmgdvoazarrxbi',
                flowInterfaceNamespace: '6axz2xvh8qr4fnzy6fpyo1ghkghal2d36wh3bars2yie971uhn7zdu6vagtzg333lwsmtmogb1otgy023vxbuxobcd0l6a9yyvnnr1ex4gmkh1h56obaxx4npdfodmt9udl7raw0jjschbls8oz9wil3hc0dvp3m',
                parameterGroup: 'q4o2zqq2u2502o7n9fvd6qw2kxhg8qifcv6eoecj6bzvawt25t2z54wtj8jwhnm222mkszfiudj5axjrd1cusxk04peebtsha9q2ycgkxpbcqg2lika0jnjqr60vdrjlyv732t6cyrjj86umcg0mpb4hlg3rucj9oytsy8ys6bphjqn9jpksiuru9wh7ernar1g5v7stvncoehdkkmtq5k874mvz2hc77l9iu7w037h4e0kbrj1r0jsjyirz4tz',
                name: '6hs0l6mt078we7adfwluuepr42751qhchsg3gzvu0yb44ve0s1cpxun2zctckvesp89t9ispdw0ujf5ws2en21xtyleyunjftdm01x0faqhjh5yl47z6z79vor3o44jyz2s0paxaivqwhgkarawo5xrvabz5pdegepz0jkito6n75711nwsc7518uw8nuelo1yrhsjqrewulh8ioycvjbr0q75uijrcmp43fq9y61zd1wmatch2tmfl95aoopneat60uyoev4q1xvtf6y7kn66il0i0xadak7mm3alxbpfrl9xny5v2kp85z0qo5st4f',
                parameterName: 'c7i4bijvmn24m9l9efxolt2o4w797d5ovxzaukrh2kziewyzp9w4c511exsc5pzbg652fryj942fw06b7b7cdxmmafn3ruvrrebjkz4yeqnakh01lbevb1jzxp26c1h3ngp7z8iu78a9f90qtdj9o451qqpps618pgxaz45xsajkxwli11o1n3iqfmlo4opv8e3oxx4n51oh7s50z9qpceuzdgjj2l2lr2cx5qam0r1nfgfm2olgdr5uc0ngwkuwnmoynsoe83a95dgbt2qk0abhuplmq594lj8k9z8xpculab8k1ssyr5n1qvex402r',
                parameterValue: 'rn4wsw60wg5yxg5841pu14nxgcqtn2q1gvvf8pa70aqng5a0fsnh9r6sqedcq032s4q1hshayuv29vq3v31logs8yc9gqz01ba7qzwuyhlrx46j3qd7w9rb2xnn3ol5ss07kin1hr3twvay77vc254x9ag3heu4htb03badc99q7elw1yq97umiyb773hjxdoqq9kd3ebmjz7vf54e5280j451wzn4a4fbwm7qifve4smr1ll9tjt1g5o4unwchnefy6cfjxonr069ax5bia8ylcbp4g0gm8z75crqro4x1pt1xads13ulbx1kmkg11xfptnhhj497vhaleymvdkq3s51s3by2ue8nu6dbffofx3uqztmjgx3ryajt48i5bok5ej0xgmynjifbkcc65b8f7633rl75e2gdmgj0bdcd3p06g7k3kbl5t0cpdqoafz97qyaze81s3gwwviff5auexnvprcne27x8o7jfpjmmi4m7c8p5644wpe6d0aftup8dz85osp5osr41vuh7brh1ks4pwyzbm7p7yizvvunz2buyw9w0hpp3xzo7mfjp4s78yobtgrwb20a41rfvonlmzz1z7e8ew11a8i2evzs7i9oneiy7k6ml20cxtmrir6w86wzorpwt8a7osg74eu9jwt7c32wnc8m72altpp0itr3psxjt6zlp4utnwur3ms3j5xumdjyzwkw3bzsh8v0p4uumyqgyu51h7xr5yu2s3ciwi7oao4py96a691gq55lizly0se7o6dykw0r2r1uo4jbon2z3886stnjc7x6pit7hdmjq32wwrsxzhuz0sblqigoj3q1zx06uit0ty4e2mwc5usbq36sfhnhr562rcpphzgh9x7bc5mgjh5dotsea1xef7bxwd1qk7qfe448y87jznvpniqy6goy067j6dt0vs91n4ghflw1vbi4z9supmuxvialgnlzvx2oaz8jhkn5nrrtrrvg7h8fx22g0h5j6lumxvbpzsxbg4fldwh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'xg2h48b1otwvqp2r0exk8h6h8dv8iikjlew73idlbyuzsi0xzm',
                version: 'le7tanmuyzaoegomkd07',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '1usu2uiall9u6m8aut4o',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '8ku5fog0odf0ygkb1947gfc1czguzomvluhq2e71l9rrz4tjjhke5h963v2lcusrnoxsyvo2gua538n8fyyfpz411rnpu97ehadhgvso689p77tda7xhdn6009shp8xb5shif5pz5472tianpycadol18m71m48e',
                channelComponent: 'tpm4jddpezmthc24r2wsfe44dr3s8k7wskgenhkam1zqu7fno4qnk8b7y6a4mjza7z7r3ldsgsy7gkzi9qj2ck5a9pa4v2zensp9wakrb3nmgg2n0brbsbrfyes0e1x6chkmexugcy2yyb118teaur8at1rg7sno',
                channelName: 'wcemhpfa3olh35jkefs1955y0qw7mhhudyn8q74zjj3f79uig3p99vhnvz3tjcyyicy9t9jfefu9woyu524q72guircygib5bdry81n320h5ghfo24ubks2nzqzli1jtt8lukciuzrwf0dyn22gx0p9ls59bzk8o',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'm2sq4cdn2w3weghnz5dbmnxwj7nmqsu8l6dpzl7yfw0eaonpx64yeumlnwz94urkgrc866tlm86113jkezdlw083716q0kovei1pjlrskja4srasy6lnackwxukludealsuww6crxqc96a6bqo9qiwkwtqdgv8yn',
                flowComponent: null,
                flowInterfaceName: 'o9lhhpb0ri4u7c27o0h8wuw5v3im7awof2pyoqc7vo8bgqfydmy5cq6agtzh4tfmbqin996pbr7l11ua6ezcw0w0jmu4yd42pk38lcfh2m8xz0d277nkoawfiwrnzpxzmcpnzdzqa55dpbhp8l1x9talfxxi9m1c',
                flowInterfaceNamespace: 'pmvnl1u4nfqfvham6t8uomtbpn3v0kwqua9bqc919ndll3u2llm0ulrllo8ss5ebuy0xn2tas25kygxkvzr8kl8ls19425vffvmknlp658r4g5u3nttffsi3zd9mvklmerfz8xkpufbwrn2egtokc4l3qpn2d6dy',
                parameterGroup: 'q56ngvwab6926il078tgnfvy6158rlx4n5lgfu855nk5z8pm91nnegr5xconzxm3h8e5y8ins97hfqixmv7675c2dfzied7kdixza1bdos8qnutspns654awe15v7awxhcptpct9v4jvolkkvo9sj3pbzng39shgobdupjqxki314x8ji1ks5ytgfvpwchmsfxup3jin18pg005j7c73oawa0cyyvapnf2nanb29ckcjm8zbbvxaw3mmnr793dd',
                name: 'pdx2p2sxghzu7kgmqzmgqb5kcefjobaupm08rirgpc546koiiy3zni4l6sphn9hy8bwh7mtu6qekpau2pbeaxtzxhmwo3cxw1pk8csllbbe9d0zlnn59f4gpitf65lzn1syinwvv4ps1hh8cohd8jvkh81y8fm41stdms0kmxttcsfxxpkvxq6qcpzaqn6jqg38xow69jnd6y20rp4vdtqxttnrhrkipmxki1z5hi9w8ne6qhoa83utxc4aunbro09fqrz5lflep51rqqk0qehm4t9blprn48z8g4s4e1ia4b791hgym6yvrjvv9xye4',
                parameterName: 'emavfozgy6q81ic1fuk7ti52sqjddftrq22smtn0jli76wi6fag4scf8phq4rng13eauzxwcjp43rpujra9l4tqn89g68q2sfdxk81389xh7bwzq9wm8r0jcd4gr2lxj0jsvthgr7qcsmypzd3vbi4kmuhtbrd8sunhemen51c07exxb8455mx5bsri6mw3rtfaqdfdetdlqsmwmftymcdpbfojbwm4cvwsp7b104g5hj8zqmdpwgxfcdv5f35b9nw34u8496awftg1sffr4mti1v6tf9bqof55lpg2unqo2brl9nrl1nhka1gibrksv',
                parameterValue: 'metj5gal16znb8llucjm8mo2ff8vuuge0nkl9gpjt6499fkrzl24e6zucb2aqhnaqyzp3nvb8496crqe1sf9o86uwo0x4q9qj6bxwflx6vaqkeglre3ga810qxtzoreddmf0qce8pykha5eu5584b9pli1bx3scs2pcos9g3c3m9f9mt3avffek8c6t32gim39j5qd2qpr6q4o39s7v91opnz9iwd4wae85fymicq2vau32h81wz4gmkhp2wc8u0cv48pqwmooalg5tc0nrcq3550tysz948wvu6t4o8qq69lc9lgzzvqhle6ioinq3e4ztllh1w340kvadsvll8vnfa3c7mzjpa889z0ptwfsz2mzh5gylvu7xzsowno8ram2unnnpse6ak63bwbzaboyco8es8zesohsa1yy8tpyb8ukzgp9nb4pis2zwj7qqpfmmstcfnk0ar6cl5k63kgu64oqt1zfz1zmres3wmylyzb7mbzkmh3qqgat2cvgc5nuhc4dr6ca7mad8pxsaekwsxlm0l0uchznqomo8652716o36irpvplgly386ipwuusppswkju1pwurkzqep56j6pl8snqwo2u9nrwar6798wh7ljghglyztnyan0u2dndsjdgv8sxh6od7wlgaxdxpqzlmaoymxywm7h8aa7e4eo8p1yoylyd1y48zwk564tiwgh2u0r6mxs665nl143vnst046i8n44zi8za3albe40dbyzjll39cuj3xqcl1a5n0kqbq9a7aj5m43o5nxmhd23s993b1epzmqx8bek9kmru5c1t9wzytdmhestbwqkhpwtobkrhzx6yq9354cdgbp7wqe6oyo40mm993xu3dakfx3zxg06ojjtb0ayd4qliuiy8ht1v4eye6zdd2bonv8wjpy3o6ggcfu5r0ozm7iefomqihpp7vt76679kgomvumr3fyor9lmsh691f4zobqhcncqunu6u9n4jhhhq171hsqhcfjp7wx5vq7nnzas',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'yyuvu0pwqrshny7vlw9cfdntqi3ob06m0ezo04jm3ui0sh223l',
                version: '93xjt68p8ihevyh2pzvs',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'ob861536n3rz4qk7iowu',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '0kneab9pl8u80rnlaosy18js9kf6iwszevrijlvbz0t34aeisvoqdv872zvnsqzdx1ljh78zy8uca3u3oj0xlvdrbzsfpi9jfn8pdey8o6v8rf7734an4ccrvv269cv4jkibmisv8ang6oeeu61blis2pzg8h46p',
                channelComponent: 'cft6rooj2kuhaagmc79opipev5dbg8inhmo5es5mc5qy791m9vebur0vweg93s9avd2vhtki3p9yysqkh216hk2chad2v2miqjrfqftkxwo1npw11mw7ic25qd4ku8rm58sdfp5hutfzytqgsla1vyk2l39dpz04',
                channelName: 'chnr1pnvko40rqgmz2c8asocedp4l4h5u92ggdhzvxdujqqcin09qf5opmz26aah5iqkn2ryp3exghe7f5c502v57g83jjgqwwb8lsfyrq85orn9gieh5tyet3apgamzw1llvqe6r2dpbfv1vqkygl63o75m6wbk',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'z3r4vsbp2grbk07j3d8vtwz8rwlnsl6df4pwx525oextuz9z4sidyg8afz4whjkdgfxvkol8qt8l0yaldnuw6s2qjnvlaxvxrhr1xq4dcegqo0tdg0c18ywt4re6aq99qkotruas2rifjmwgg3us4o2aqhgqly99',
                
                flowInterfaceName: 'hn7s5hkhb7gjo8nzuk4ne7g7rj7rujzzrw9obd737j21bc3m9rxrfbygbtbyn2h0wmeiijkfm15xazkwpjyrgaenrdpgmo7w5tvqaw476e4nwsvybhtap0c5vxryueafdeiem9wl8dd7qmpkjo9wqdx987vn245x',
                flowInterfaceNamespace: 'uttayq2g3mh5j5dnna9gm2laq4cljkoxd927w6geqgph85zix2h75ko3b615bym6bmdt2qb45veepw0ri5lio7kmhhhzawl5ebwa2znn5ywmcnowdrhqzetch7dwtgbocfsuumhvrndwmflsqg9p8byyb16meogo',
                parameterGroup: 'p3okifmnk4kinxzfywaez2sg9b04qpxke9oa25h35ymak269vr9d2qmgo0rzdd6u3ti6wsvnn905gidch2106dnbel4nn868m6urhwh363euc39azfg67xudyf0hllqhr01ogeb6kxcqy8t8lb6fyoafx4eejt1qxl27vewsput79my33dgsuhb6sx7itbaonfmp2206ny3epjdj0gbd1kbc389wz9mj0rj38dx7hqmdfwl3ukhww5tv4hm23hu',
                name: 'ky8r0ggruv6ohhfxnaeri68lk9aowkl5xghywmoc8jlks2kfag0j3ehhgenmac1oq2qc781ojtho3axdbmt9utmq2nf62kuaaqy1rj3q8xibi5zq4l3uyy4a20yyebdbmhgomzxdbzrdtn24zsdcksmdfv6icu4zib5c4ps4af93alggw3qagg8szi3iipw9vjitk4esm3drcm7kyyiqfbgw5d8fakdwyecfjxzhmbrid294s99eiysidy1cjxlgsemubtw7gnsmmo08m5on90d5j3t6tnnmk61bbaxnlodx2fuhml8x0nns3bsr9bt9',
                parameterName: 'wshgvlpi14xo25qfps4jb0248nw3posuea2nkgei17c02xvpcrmk8gjt3ckjvvvoae601jjyydvcdfbrdq8w4l159syde0117udl2ei9gc1r9kvyjheb7ahce3cqhk84z9r8jz5fwlfjokobjv6ivqx0ol6pwugiqxaofn2uizkwy68xk4eqg7byu5xgp02x7z20qqeha2nix86ka6rr5av8ftwqtk8zihthf9y4dax0sgql0g190qqwu9jbtf0zpoqwtb9nxkz58x13dyc2ajw0fkqvkmfb9m8n5mdns3v2as99omuqc49i4aczpsbl',
                parameterValue: 'mudvs74p1f44a6lz72omp6non88ehbeijc7tipdakp7j0culxpmzgi03lnfx2jkzkgwxe36pm5az9fgjzgpsw99izigxp03d1rfldhjko4f9yqvu54k2pjmosxs0o29h9xicstaqtw3x6ecw1autj7pljvletng4q9l9t9laqq4by3isfv56wjtk54yv9sraldbgb8wr6im98gpmp2de4uej3e0yyweabry8fhnc3gm2tnmoul3hn606u6a7fnw6fs9nqabxzrefa6yl8s6ynk616fqhby91lx1a7h10mkywqi7x5qsdysmnsilv0jdzz1rdpws3o98rsv72a9yrpkoakv2dv8sa58dj94snx2pukzcrq1aqv143cnc5sijwhvkcygbqg1jefd2k4vs7cbk49epghcymkpk32u7wv2jfrjhaipy8rra1d3hx96epddu58bf8qq3rhhngrg8fka2pjpk8hs5z1ooibu6bkhw1tkxgaln8t8r0zu4ud59zijcx10e1l0yoj11g540hxrdw2byl1p4kjl8ttzlsrmcf41ckab6e24uvj89fyiv8043o6yj2724dm9uxre4o9uun8uo32xpscb3uryoi0sdtxs10ndejijlt4k3ibuerb1ctx7103y7ruznb1ccmya2o0z8jdzwdpafm1xklezplhetpe7nrnlg8zuo0odcoyc2okew325fc2rwmabb3h89bxjr1y5v0c3ghh7q91caxs4nhs712qqc15mdte6mvtl6e8tkh1oh4rmz9vgpm9ede0wo0ql6lkxfc8vktsbcc83u3vsklxfjazw73plr4b4toa93is2dm0no5ux4ddfii8v3fs5qcwrwypgho4aklhoe0hd63dchvbqzvrvmcr5tq2fbwc9pjjjgo6lorhp4275j52i02dpqjvo60kvl1hatyo1yl2tdyw7tpob7085l6e8bftkk3evnn4t40v98s8g797rqnla338ue3gdtbgpe81f1a6uub8e7r8nlw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'vz0q40viny12vja9q0lm1jbkgbwssmkp8o1awt6nnpg95cpqqz',
                version: 'ov556cdoa1fcptcyuadq',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'ibsjmjfuhk728q059r1y',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '6sqb8ou66m71tnub36uqsib794pzb7n21qlcne0eg2fsyolmpxr2ude7g1zuzip2rtcjscedgj5gyc08sun8cydcm8bz3smfg6lur3suua2wv7tm9py64aru3huu61l9nzuwve61lf0pibgoqx3ancujnvkqcrk5',
                channelComponent: '49de9bzrxi2uubg5pbvb0a5frheff7c6cpbtyys8quclmcq4h1i83ssxhs9uwyjrxt6vi7rfzkoujuf41ur1u2vw7bbqpcrla4km5ltnxgejeolwecxbvepcx2a3ysnwmaivvbxy3525dix00ah6t0pinrnl161r',
                channelName: 'urc1rc3dpb784zawyzfv15c97c0ldzsbsdmtxi3malvxqkipmlo8x51xcebrrpr5thw3gj16jz61w41o2has5ft7ki5ousz9dnsffd79kdx3g3epniu846a3hefr31gm8m72q6qd8q2md1ul0i15elx00sfytbzf',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'lqp7bq7no3bt4w0bbvbp3otb7ndngp416c2no66w7dhsilsmdjhqnrjbpvjn3xotq8q79x5wuliuwlcrr7h7aby61e1qiz2igrlae947q5xrigl5v3ij59vu84hywe9xtynvi1y2ejltca08s5855lnu3yejrewe',
                flowComponent: '2auau58zyb0webb71mtnzkdhg6j171qi9f8dtflw6cn0b7tj5whwsdo3fai66kd8wo5pmwsbi0tkq8jd3se2kb19dqlz9e63e52myb7h2yy4u9o11144ubgt6cn9t5p6ybyx6eev5u11z5ipj5niuxmafw1goygj',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'nufg1l1d1lknq1w6l5cbpwyb4w5f78trk5xnn34xkpl78rg66my9yt0tczd0ghcz17mvtgnvbtscaag4fzgff8xrll5kiwqje2953ul7olp9upyzhrmwdvp0gdvu4ba3dj1uo7ko0ijbrc3hcqdnz9tve0vjrghl',
                parameterGroup: '0e6mkj8ati5a2z8vojt3t3v189ls7oinm3harqw3tykk75v4kg6pdqsl49a240g83ul97q35ph84kg51zf081jts5hl3odccq1vw7xawl9j1ixcnnferpl97bylvb2hdxnery6pfeirisp8wy12zdb0s1t91ad9oi72r9aepzbngnorbjnlyyp1eagycjkmhvwvx62aoncfy4jc5dcc460mnwcisqd7eldfnca31n7nlfthu5omcuoys8derpj9',
                name: 'w3mvift6kduu5z9okl2n2y71gku30bngieok2b4ta3mq7ceiqjuffne31c4saf80e8jhxouowvl92ywfjcfwfnzq9xj4lbx3pq69olzr6y587mi9o8lwrd79s7f2nakvg52p3krrweg11fe81i98q5hxt5ik7d1sxes9tudapy17bj8mqytq9gqx0d4wpkqssbicbvhlxr72ps7ofq6gzmsfutdfcu3gpfwu4uukyjcx155d0xgcgpoykc5kbvxyhm3cuda55q0wxwu3xikzvcy5ps2kg43sxibmawyo1u0o9hlgjls1pdixfgni8i2c',
                parameterName: 'pvoh0ww712dbbhrzpf9ct39f3vmvf4ao9no1g3wxe3pe5vhu6r184dpl831v9ktibytawxkf7k22l8h1495tjkzquynqm5nyqa1sa83xs7y9oh5dahtr7j5zsfb2nurigyu8a5cbqid03l707dnj4xfp8ywkh0dxh98p1wu4onvo2sn2y3ftgo6mf1wzoxhg9ez6vngvae0brrs2e7dxkvk95jq8wby7rhlaxidpg2h1k6jr3lcd0pkf632ioxh9819k0so12sz3r5ww9yatjent7gomxwpc2wkjanwjes5uiosqvlq87ubtju4mre9m',
                parameterValue: 'yv14ywpxogujvg22ra6pu1h6k0eov6are5csed3io4rchs5x2rj1fdhqc6w0xh23l8atce7kgckjlao27k3c3chasfwszuev1227fxyegm75ioodzvzsq4i9pidxp9i2fk79t6end5ymx2up6fcrsfnogu2p8qtwipengovk0o1k8cy83725z16ddmdmc13vbgcekn5dwiry9ckvhfsdc7ya064o7t4i29yu07h4z12f0axeq008afqedzs882upiusl4lq1inh3094qwcir3rpaxc7afubtldc89oi2fuu0xxadvxz3rvq6xipas9q1gymiqjkm0nqe84kl1ifhnn60ann69u5rj2iy6gqmgpxq2dwua4v5zx0v1sktgut3qzvw86unncepxdh5j8a4hkf5t0gvzmvlkjkimupjoapur7tsh281izgq1ew3saaz45vxs3s8h6bv1zz49kun849jjukve2xht1ga4fiwapag5xvbcfqp9xp26ajxfexy4yqepwkwvm10nslgueiqtmwrdx3uv3jsydc74vf48qkthqymssjjhp5ksrdtsaterif9aajvu9h1jcra54anoyifimjgq3k43otwhrii0td4dopcx4098x28vltwtqqgkg04o821c46q0ladns8t0gr1whph9up9zhhcfe7rclr7i47b0r067bycy0vqtvxylc0ab16ytmkw9evv1dmd8xlxf3om279n0io2hf06mupcfgwh0qq2930epb4psqzghzoc5u5xlqf3qrjb34swgt87vkdzaqv1m0pegvwzue1u9rv1sthitgxk21ryrzwdbnlb73ewh7pokv9s8ou5yd1vn2ta0u1ukbpaw8kp8ba8zksknh4xpjqh9ycq8qq743akou07ef7fsijaa5qwr2nhhb0c17n88ozmx5kb1r7sivf3za55ho4mvbohr797lkwy2fi2wy995j9ufvzjucw139wrnfah6r4qyp9399orvizi1tta1iasogqopma3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '9ku02nbztg8bfr5ju1bz5s3mf0rv4gq5xpf5ni5mxunojusq07',
                version: '9jqlbvvkqe95at04c261',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '9kqmhk3ta2qfllya04ff',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'wtgk1cgf7wliryrmyfoy7ooatml7ef82y9cbdhak2ujuu9veu2r1il04hyxbxzxska9f56h38zyd9bg63mo7nfjtryyik2wnndp07pm8hd1jf799rf3teu2m0l2s8tqgtw622bqplh2ykr7oudmcg3wat16irux8',
                channelComponent: '2m32tda8lgsxr91ia31zqon684qbdfxjyyxiy1vvc9e8p9ux748x9qmxm9jqfsb3p89v685gppd3n18hd4panxppjx2pisi2hzgvr84txc6gi9l24a1nxlizbww59fby2rrsglhvqkw6nqbujuegqccykyvtp8zl',
                channelName: 'p7oty2jxfsxxmg66xdpbivzj8z97erg7ge54y8kngoelklsxoq129mi0k6dr88c44fs7uvtmvkpf4xkqv0wmxdc8jtzh9gp4imr5uw1ib3vw93vdcyzlwewywe8q2hdgtmu2vfx1b7exkifqolo4pxkiprk1s994',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'zo26cdj04jocyilgduhra49i37evv0k8l1a0ssy0srw174609y1i64d2zh2d5prtyja79r6yua533jykfi7s4svrike7xdyoueyluu61w2vnll483tnexd3oq3ut2xan2erao49mxt8j7ot7t4zh251xk2vxkyvo',
                flowComponent: 'almtewyaf87rf2hs8828ex6v3yrfvdgjvagyfigqc47mes1z969pvg5spbj46oqx8o0jj8atasi526ob74rzyxb3ki6hn8i30amvi0bssz1hhvkfys2l0qmyodi9er0gvimqyfhwxgnv7lirc0sh8m00i2s3mzmf',
                
                flowInterfaceNamespace: 'o7z7yfu9sl27sc16tnqpxnpoceqamex17bylpizq4bh65tzmgfb71poauiij6vy2aerl2xe19rd6o3332yisd6yl2yhmaduq7q0qdu0nbajddn8xq5sifxeda0od8k28ml2ysofwy7y3vzy8rnvkwizy785vxf0f',
                parameterGroup: 'neetxhbbytw4j9rruqm10zdvbo6ktldb2kss562p203m6fhzn4383evo48iqxqa52t5bwc1leq78xsksbnv3xyv7e6vcif4u9syannutux8bv0dxkoxqwvbyt66vssjq62hcw9fq4ift81rsl8b9vg0nnki924off11j42xyzia2rqc53cctsvibcgpw2vxyoad69e2eqmxkn3jeh43j7m1qh9yaevdwmip41bg1r9ivtf57piisqjk6tso3ms0',
                name: 'of1b2y5z5clihybx2ughc8hdzu35m6z0210gy6labto173z2wl3l9iv65qcciyzkbmumbjz89zumw45br8752slth6ng9l7m4syfhx0bae8oimdwcpnq8fjojm5xk4h6gl3oumjkvypvpdpv6g2i20eju6fh2hfieedofyxqqbu87c5r0pn57bzxlavwp1t3sann4b87tnzkn57f7z8jaxa3jamxv3mn2rutrfkopffkf0apngai3oupwdlxfcsq3t5f5njgq57owoqextoyqpny9fdg4yfpwpn25asx1zdm5v6kd1ykwsmpiyjpu77c',
                parameterName: 'waz4blv4k4vpddkdam4nwbn24u1igccnz3cnj206ksdg1x8pklhj7t8uas3grjxy2noffhfiv3nqbsm5yffw3rlt5g48vwih76f4dq5zqmkc53kbx6kijk5iht2jo0qknrytntxks1cee9v0f15dl0delfitg9as536gpsehqxv3db6x8tx3ixl7np0szjv2s84c3zmzk6m5kbbvj6uecwaygkz1w6vwvj2guaxkgp0k2nbek07q0n4t1drzry1kkpwyb20da3nw9muom9kuvfxdmx7y186wo5sgijn1uk400x448g6proou3tu746nv',
                parameterValue: '3oxe1i1polgyz2vwwn5q5va6n64in4ejsp1iqx1ack4yzhfhicx29ao5cbnrv3p2aijsjg5qvh2vv0qaxt37n02ahj6lhiki78obprlien79pvfm4t3ga7rh1w6j8jv70izzo0jdo0t388fce5cbk5p1x52lfz985mpl9zfx6tcnn1ri1wo6y8xj8ltwivdzw6rwfvh90cfrjb46pv2saqlvlc5olhe8l5h422rme3n1w6zz3742bf625jczvo4n11wjy5w7ohspvtjo4wv5v831586qjgjwn5w1toiawcv7oglbrdp6f2vhinqqdlbldv00ewse3rhv97vg7gczzhehncurg8si3no7dfdsny7odgbwqkwn6lzurmhp8w4mbg7tngogqoeklx82zy69pmp3ri2yoipptwyo5repdm77tygq5v8pvl7e377hjd7tgicbs38rbm2ma4ymn2mtq3ov1x11izbivahelj22rrqub969gh9va2jnm5i5weafe76y5bl6mf3q64b74ijxuay6kc5a01vvwtviwygdkugs8pf3i32urtcju7qg68yrwpn4vhdmj0zh7htcuvl56zfzhol024sm7kfcy9ng0j8f3h8vo17gc33nas83agxx0noa8exqc1rhdh9lp8g3h3gq2cy4xx9ifjo5be89sjo4jjonkc6m0f1ph5f9wil686496ivf8jgqedt5mq21e68admydzuh4h9buyep0liwgj0ve4kyqikvzywyk1yy8owi0idsiqvpy88r1voegwvt5w8kykq8zpf80lyuwx1tzvfyji9qf5v05fdi36dyh8r3m9eg91nm176ivz6jg2zh1gbm0rz28npchyayobzi80putq8ies8rv1lulfy7uwrdhaz20fcfwlno0gqrc09ordn5mmpm19d4r115h7s3ey0ca7bopeur4bmy1hqkn765jqhrj7tbi40a7xzlgdf9h4xyig6n9qwqi4f96iqcukj8ez0wf327b31ws13i5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '51pxn90olv3pqbekecn303ci7j0vjzkxnjsvw1ax8b2xzniz1n',
                version: 'paqe3h0zi06snnfr5b1z',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'eqhw2yfhydl2w0exir6b',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '8uxc6m59vtgzwuy9mb4dxt3bhmw8xqdsku8w7q0rjzfh0huu7xojik99zm3pfwpo68zilpvjwe7ar6vw4vgb68lvh77xj2zxwjmrwapghkn5cw54fof6udnink1moyg84dzph2qadr7admrh44o0fk5ufn956lp3',
                channelComponent: 'vj9oix248lxa3nrp1azdqaoe81irtp2023tgp6g3ws07wjk2g1kpxrp5u2z5rzc7kswyxe4bnkt8omff54rmv2a3xo1jgns1p2fs1yckvrz91l9be502ipz1x05hm4w9k2nmlsbrmo469cotjzugepsb21wzu78m',
                channelName: 'yg1imwq9h9bjap3sn0bi9cww6ckmda1idhv03fihrn5jes4idxuotnjfqaymk1z214wv14ruxdmmlv158f5ci03wud1v2iqr20b95p95pzg7id0qpm8x0ajdhu5gynxsydm8aav9rlo8qcifaggd92ykbu58z3fu',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '7dgl0whoxg8i858ttl8ly0n5fsumuhnjigluitpemmiz3gv4jthc1couzj9vjf82jpdlhhjkg9yusbcepon9ht2p444jr5rojnlu6zbsekrgfjakjzhq7nc1zzycl3fhpxarz991iuw7c8q8p5u1ee83p315d9lj',
                flowComponent: 'juqkwy4caf0lbhhlx9cjed20dx054o5v9q3kv8y109tjvwa3aabpvc1nxalzdasoeutim002l99o4z1t5txfl7b5t61lp6ez0g1wlcmxiqw9ccgegilla46vhoim81wyau2yey6yx9xuhnbn3tw9xqpnrbg5amko',
                flowInterfaceName: '9pd5dv2t4q5y7e49en62otna8qglindc9f17sw88b9z1recsqav2xxvhin6fcbei8ntn42rcn2xwrk7hw7tkb5mcjw0b60hkj2zyqt4m6plc4d8rh8uinubdki97ll749owxeo45h4ujujjrdmxa78wxtkhc35i3',
                flowInterfaceNamespace: null,
                parameterGroup: 'dvv2bu7w01rbw6r6x2torb0omudj2yx3ep0z7h1crjao8r00b81xi977jmo9enedzpl8crjk3z2ilj0ocqxt0gw0uk3yzx6pexb5spo07z0u3gwb5i33k3agldcgfsfph0tsr4v3lhtzjauop0buslzvquchahsul3fga7smfyunbr0my3ilvd5sc0u3ioi6qkylluprv0bq7ef7ovdrt4cv4ugal0uc70vlrgea1614thtq3z3bnrwa3h3aq3g',
                name: 'w5zy8pjnj90slvp5oqwl52c3um0ngd92c8ancq56ddv89rtxut7byd3umqshwx264qwixosa4c1k9frp7totxcdd2q00ix524vsdgg8efndd1qrud587hwi0ukrqpxccwpdqos6iixnu2i1g91qvh2p1ganxx7yds88fs7g5mheneeqeahqmajcigz9bzt6ut68phc79bk3vaa639rfaabdcb5zydrtfx63r0ek8c1a4ofxphbcgckxcvcki9la44mv7n2ods68umjk6zn5xjmdx58g757azvyisowuov8apbn7a6v0hdwkiyv7qag2l',
                parameterName: '907pm89u6zctcei9ooy26qa8kof0lcaznxrer60lv5djsnrcuzk2yhlad1h2zc6ex4ft3u4amn6aaevubngcovi9pi5jgkym00rl489f6d6ounrqxip08iiw7br9tmib9pi6grjvykn2rmv5ihpmvobz0ns8gly2a0ms6hyeajqp3f1osjpohbj4gtws2c2kbiilk23sxlojgvn7dxi5y6u4ayx5wazu9xw7zjxuqvsul4g1gn6z2efvj6dx355m2txn9rypwkpfqa2d087ml9joq9m8o1tqkmrvdnby43g76wckv14pp2fhmmuqvl25',
                parameterValue: 'jfuntowyjndafs2xyz8zs8o7lu26n1hn2svvz3s1b7oee8xnxuh4k3z6a18hzgappvr9fdq07nbwdnbku55jxcn041chouycv18xk8vwejqhd6zxmv8pogm9ygel370fp10ifcn7wavjh62iox7imsi7ng3v0u4envfaunjdkhxcizp8fovnnlj7aserjqfbqmt14blfw9xs2czu3ox9afotzf2dozp9v9pv749mko3ojlwhne0bm7nda0avsbhrm5xm295c2gl9z6iaab9doen4eietruhjqtyagfj2pw63nlyb2l32py5juwlnztvlid421eyiwkouu827vn41m4r1iprxdzc8tiakqqbhaf3zpsh422y9skmvcth9v3l3ouqffq0e1hgnn97ay7lexunau3nj9dequpgyg6s7df1fa1zep2ltgbarwt9wwxakmfbpmj0e4cg5pmuphm4c10qhimom7g0bfrrgqdhns3gzbsimfed82xd2t42g4lcw98pckoywh2tpd1njvj51zc07qcdpy0lwwfsfpxpws2p3f6wl4e13vmbhm0l4zq0nqnqsyvs6a3atpqe2ogmslorwv9q9pks1dtd67r4g53hpwshv2d1qqjmmwglyg8w3iazosrup0pb66r1zl4ge1piie9pj5iaffzjplmqv1bukcwu9rr3vhv7lrgw1lz5nmhlxfbp2gr9cbhkteg2253iiqvmq3wwvb3gg4n1hhci81uwlsx0xbo4wc7tkhheco6hn27yto3a6739t54hgmuat2f9wkxoq1tb38e5rq3nfeo61vey3f08gwqinrrrrqkusf35mzd4iqevbycryn0zy2ct2tfchdfc8wqc1u7t3rdxz7qsij14rbtzna2wtfmt86uaj3lly8dpg5o184cg5hndlsg33ffasvikhywm0xbhypce0ovbm7gd0mcg5hsii1kyrbackt256389qfwkfhdlhifbmzrjie36rhxbg4li26coo3w4tzk7n996e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'sbhbhokkmkyr8rqdbi8e43hxgna52gxqzoy6uvam7j8sc35rs7',
                version: '6cqujqnybprtkvrrfh28',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '0y4moj8mubf63az0rxy9',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '2vhb897lb52u5iu0nn8bgzro4g1t00enwn20xd3k79tunbxhszrze3xk2sb34soj7a5igcaqvr2hmqzb6po0e2045pcm9q0v3x87u1l0swm0mgnkhk9p74ip86wkebzlxkfk3ly00kd01ezogon9h9zkg8qimkw0',
                channelComponent: '56ce50gq33lcu18c40od1ogl74ghwtkxhgwq0y3pxwtqx8eoq41yve9jt4898afxr0jvkoknr7bj6rlfd3qkigmjpugf3gvamry3wura75wjyu6wzhmobeotlaasn72cxho81ou69d47onp7863bryulk2w2lc45',
                channelName: 'nvnw2hsqpuqckxms1itwn0a7delyx3pw5ufs1wdue1g0qak9lszkksqg6np1j7ym1tyhxbh0hxwcuo1qpd3xyblu8r9jjk036vwse6vxn4wzmvzm0lcijle1b69qs0pf7fk8xynjqnrja7kwy7c5scoh2olt62uc',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'swpd9g56l06zjp0z8wmem89dntyrn6x83rj1pr4ig5vqqesdap791eidh7dptyf4g7w9jrijh3lie3c0unt8xnwyd8zo10csflk0snhatjciir2nhghcoe1412g7i7b607scvfheztqmf15ha1y3j8kir2jv0xgs',
                flowComponent: 'fhcs2wvukszuaw4ckbsocni3nvtbg72nui3fqe04xfmpy58rc5wit2z0vmqgut273akb1qptytye74kpy2sczt5hnqwuj5txyfwv1av6afojpudkyqnzmxn6lf5q6ne3twuhxmq0wg36zixffpuy0t47tfonzhlw',
                flowInterfaceName: 'tfelmvwwi6lftxp2g8x0lgxxm1js4vyhdy6qxi1psuc13texm6jk4w43aaco93bc7cifox32hul8hxu0m2l5oken5ooc1odcgysozyh25t36luvwb34plx8ottdx124wm0oq366apgubvipcypp4bouupvoq7ycd',
                
                parameterGroup: 'u4u901pkytq4igpyip6wxrgq4jibejt43190wx4e32foabx7k0nw4gpcfy31p3wnd28rbc2f4kd69mhwgpscqdcc80rexvto1xuf2z0ytkecf7oyhgk5xesrc5ioe63b4kff3omuep5rp9kib6pt7ntufl44uzumwe9wrzc2ha32xxwixbkazc3oqggd1buizllu2ajaa32d9md5x887of9xr340n2gfguh7braprco6i97puspxwmmixnnidvr',
                name: 'fwscysyqo97nnzhsldpv3i2llcf6iats83nd2v2exgn6da6v0ktmaj7ai8p6nuskhgqbpcabw5a8gomagy8x6bttx9lgv8pqbrvsgdb4esvm7j9p1u3qehdophoe3s4isti5fe304wl5c2nmmljrvfnln4dp9rx19nozwks4ymxmw2mggkmkwli9yb0np99i6d5prrl07idt74tj9jfg4kjewt1saolz6l36niihnryzj0i3ka4178xwoxhzrvjyh7e0jr045mpaj6oa5k87j5iqnlfdvg67nwjlcrd77w0luz5rxno7u9d1yen7eqy8',
                parameterName: 'iz5ag51nnlc28o65pevzhixev257bvx9vzidybc1c4qbufc8kfbesglwuw5n07m43shb6lrtaerhvxy9kn7cok54opsjpmvqtnvayvpwjtjtvirbrj7fbtsbtklqtrekj0xqi82fbhxaxuwog7th6rgi2gt01ppyczoovglem92tmqx2aaqq36kj6v49c74xgzkxlcrvsmnm94ki5e0gadvz8lgx34ap1tdruglwzn0mphix8en7rzh26bqbx83sinf5usce0jsawvlm5bifsi6xnkanb3vtzvx1ijuez8myyjw5pcsnlvdf1str6i4y',
                parameterValue: '8munygs6eo4x1snrf14qhqt0vrt0yuam435txej0pl1dbd06kvoar2q6hdhfi0qppma277ftg1lbl09uurx3r6il4kj48dtbwj21uq7e0j4ze4rj3we08178uowagjpdy83laacrhddschmyvc10xom0vnpd8t8ytbxxqvpev9sjn92hy42yuv1e25ecpzqe2nx627eyovshotzjn2s8xtbkrw0ect2x8zww6ii9tq7o1dr93s6yryo6ysw1g0xida0pquizl629sb4jry6qn8w2hqzy7bfx105ru5t7vi0u0om1keidhb8tvp9l1ibpmazcwvwo6fhcndn6h67h0u2p01b0lpl0oegrbk04tfpvhcx86w7sqscishaqmt1j19jeyae9poct6l3ytz4vck1kvfongh5nn8le5sfnps6wbvao1p6zfg2m67hobf9pwhuyt2gfh2wmq8yqtmqc0qckrpdtoehuyr7icme3gyxdmc8qziaj3k61pmow65paxzf319a0pmtk5ymd61ht9sqbb3wpjnbauz6npbreo30othebrcwbhha86z1jbfb738dwe1ct2fyxoju57nl7aqts6n8l43qjzg8x7vtxsqnrsl6212idctyp1bqou0epnwmar92jio00li8q7b4kiex3bho5ddwcc1wigitlytd4abh210c518ba8n7ldm6jsmdgtj0bmwc7ixhpqimnzzbzuxb3e4g3yt7izyv6d3p7b2yxh3sxsr4vqebwmsofmfzzwstev1aivi36z1azgz719g3etvm1sk8eww4xoc318r9cv64ne2fv91j1vgkd2pz1ou5fa97q04n3tjfpdhzqt0kmszutxjjy4o5s3zbe72etfua6pqubwquzl69iy8fr1xsz1e7ycs3n8a7g6subxax9xdas880n7gb9dq0ec4keun9jrflfin1ip90d2y5vtjydv5h4ajvn2zfkvoxd0nw26y9rkvskwck5d8k5s8b4bafkrc8p454ewuay',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '17agd32ewntnjxz46yij47w423fg64n5sfobv',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'evvxq8twwho88608y4qqdxu88qdidrj08d1wnbxlgio1tws1n6',
                version: '0fxibpg1s0ass7o8a2si',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'biwlbkk0v5zgqr7ela1r',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'bdrmjoxo2kvsfroa1zmjqgatopehsaligv80yz45qu3866v21w6c52wff93rxfp0f0c2jspdht6wjebncl77uzcqfaem8mcjpdqrao1ojuxltllkqdhggf5x64jtadjaouuwe60gu2acuticrbqnxcf0xokv8hyd',
                channelComponent: 'y1cqzksv2xdf4ynicazi73ql1w4of88msijiz7trs7t3qluaj21c06oo80d6m8sv3lhz1e2mzzz925pt9oihg3r6sae526mmfbtabgkf3h3ut2a5bpg9qg89zyf7q6kxq3mhgtp26k98uikfhd3psfgj3d05dvrr',
                channelName: 'qiu7ocrxdbbqp2edvfhjhnuiobvr5ku6blnz1s2ihria7zrdnkfbcoi878eer7s5stavk3a3cjfulena2kt1h9056gh97xaqah2nhzt3nvguxrhhahwjckqnmolrfur6xor0b4y3a1icwry9z3ifg0m4m4o6914d',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '6nyebg6itjhixyf7w2v8aiqfsztg1zlyx0uchlmrb6pkuf7b9wlm7ko0h1nvkz54ecpw8wzhk4iozf5u4o77j8odfhw7zk6a9pafiezq166gf1eb4dlpp04k5ycpgewshnssxqup6pisokezj33qlfc8x5uy61kz',
                flowComponent: '4d66e1q4grgbeqq27h587fvahgfo4wn9gu4kx0iyz1hmt036m3swuj7d6cpwyvqpq1moq9luhrajdm8rzhwk7rzxpb9a6khv12mtv6kjjd2pt16ekx95431ch5d040i2rn49xsmoon9xlt4opd1e40zdcezmnxs0',
                flowInterfaceName: 'k0rvi0u8gv1fn8vk750an2p16rtmp9f7prl83o6as1zmflrlg79ha0n8kora27qel9imogg0ucai584gjw66zxupq0u2q8fa7aj4fx8d7gbdy554c5rc70lkpka1ooyallvdqpvabg1ot926ikxr891tdpue5t1p',
                flowInterfaceNamespace: '9dqpq1losypbxt7wb835tn61pt25ct1ft8onro2wj04c6mcz4vb17p4kbhf30ywouhuybgazb2n4f0kthfeqhao1i60tnjxvmdpkemuwc26n8yogfekocz4d36vgshyuijes3xsj7v34d0a4y4vw4blckgkti38l',
                parameterGroup: 'hvfk38kjeu26n7jl2ekoyav0po15132ojayw0340ms25jvt7g0yp15vvginevxz3zft5mrxj90ag3hartytsx3ziwq2bszcmj1gl4rv9knf0xe5yv26j7i1xe53zljvzd0eg08fv6kqhs08js07rwarzcd3lzse338496dcqo0qafpotrqtx02uc4b4hf0mferyiwc62q65cku6i3a6lovag5611wff3peq248c983xc0vq5m8x5q579dswvgyl',
                name: 'w1yi62swglhx6ty8cgl08kribkvogzp0k4jc3u5s5owcbz3acom0q1y3o2qw8eki586qc5qo3b9zsic1qlp8kurhwmnasm702qsmgumfswk23ai25cfgotwcrxmfgq42yy9z8hwmf3pqa5whz45yrljn2rwprdtyvedceuq5q437aak11ratdzasajl00m71gv88n07sr0ih3ptcuwb9zk15p3cuyhiqvnavee6hcenutlx6ogaijux9yskwqypfa75zvkwktz9hfzwbu3e099wead1dx5m161dvdc3y41krq2c1wgzuk4qfd1cg9w4a',
                parameterName: 'egc47ayq15p7wmic08bmpkjbfltm9dbihncrarfn223294ncvbcgc7f9hq321nk11050cd9mvbgpj2uc3wb2b0wr03fedkcwzfomphkuyb9120nxo9xy3l3ib9xtjgys58y790uqia2949tbqkxgvqq3yq3edsaht5qujd8ptplcvp7r1wtki2eg8pabq873zyjqh6rsnccuwzd2qsex6xk54bbt0873abcdpezv1k71h0s95igwxnf67row0qmvx1a2lgft1sfkd02j0jvsytw537vtescgdrfawf91voesi31eovker6cyzb2knbjj',
                parameterValue: '3vyiasjr0e0atderp4g7l18fzvu7vbpnsuvicvq1xl9kumtc7w6awzfzi760bwwlgw621k2icknym33hjs6hsddzlxpn3w40xgfjqxxjhyv1zjxm44ovp3hasulnmobrpfm2rum36v66cykhb47lt24r3h1d2wj2ezwvxgf505s93ep7omnw0h6su2erjidnfptovgbjtsd9zlwrja3f3l4t32ubuwryafqygvs7zeyumdinjfnehzgjznp3avisclsmogzerj1aol4o10fut8uyoburxks1jxak5dewwemzfdteit2plyo5kc9ctn9x8t5wsp5ujlvkc7w73ku05v66pzrtfloiq7lk2576lxgm6mbb5g8wgbwbxlgmsgr0hx790x68mbd0smu3fjt0q13e0n5bpjif62xgcaidqni54htpth0jo6lla6e89nmn2ngn7cjyciozzudt9qtgfkmwe3vy7mux1j17lnunx11wjq6h8zm2hhhnerfbatta70xhzdwdghk6n46q1yxqzvbtw7b98nrocck1gotb3d7exo2ygd0hwn81dww03kb46ec6eqs855wpitsod810h8xjjrzwllhgg2zpzjsdszimewqcijd6ybcuviy9n97h1a396kq5qqdlgb9g7aa87u26l2xl7iucjw78q3o6cq3a774a0cv2myde0tlo9k1l9tu308pe268j3uejlmaf59rswy0zabjwa10aer2z7u6jhr1wko553hl1lh1puyu27il5jen3k3sd158s7lvdu8acs6po53gz4gpbmaoxlx2c1qlrv6d3vefklswjuhq74vlhvchhtrruvrmgqfulxi01421jyhaa9oovzd17asxzl5y7kfir5tcykezb8e7a3l2wdhg9trnq1ecztvnwyx7cxgyxasdb5xbpyljp9x5719fk8ynj6rce77x8sk6l0xcdkvl3p8p3zfiyflpv0r7y8d2kxtadqv70vjmvq8hlsxw9efs0jmw6ocyrkuxz',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: '8f9n9hco33a2xvjuafr68wdpbh9ktut57nqkk',
                tenantCode: 'mx7i077fxd5l3rewdugt7l4c6al4cvdaentpyxvzuqlvdj5zu9',
                version: 'w7qkv7jxrz3uo09xarj4',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'uql3kw61gh6swtbzzdms',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '40o4hjceoqczwq5gk1lfgghoulfeuhc7rfuao96ygbpjqvprkmsze8jel31dlndwq0xw4ejfr1gmtcjv5fnmgmq2cs60yduudsqxcfacmeflkf46xwc5y0cg337i7hoi2zrtaic9a1huqc6o38lhk4f87l8mq0lk',
                channelComponent: 'h4zxg68i4oxcg8azezjvoaai5fqwz0q4ab8jnw4qive3cpl8sdxeywl3lon7m6irs1piywuykyh29qhvc43jzmadgqp012wiwrh7il8qc1jzr0fruqf00rxe65y95byfe9x0p4q2p8zzoelkk36kvbx02uyusn7c',
                channelName: 'prywzqwt4hzof0sr4kmjtn7n0hw4rfm70s6098vk2nrvhju9lpttc8d15wdap1wlxvah6whkj0dxzllgqe8ik7q054qafo8ez3ovzqzv2f0er2ta4tvmq0tmlskljjnwx0alxcrj0bi0rzrpm3gs14jds1rdwzs8',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'p672io2djzosep9aeynp7ejzpmxn911eq11et7xzc7w4kkn93fpfsi4gw3h5v6wti4e5rehowr7xj36r2ftmqf3lmrtrbmj75z55w5g789xdvxj2eqyfmytqpko46j0eekwy1ubkb8wp0cgfifv9zl4mkv8hh2n2',
                flowComponent: '3jjakj89jspdu1p6glqq6jhdiwlsutjnpbresejoflodme5xjqtadp3nz5jegcehtflfufosywhngxm9tetvri3tfpx6f5nwf1hlsi16e1jknno2ud9ppp3petyxf7nc0fyzkd0bm2d8p19l0in2kldm7k5y56m0',
                flowInterfaceName: '1wsrm2wtrltd47pxuzmfm57styqrgp2d0091i5opd97tv2y8848oinmpbp94rqd7ipe1fcnyabwlhp5kjrwjvpm7yq6t1bgpvo7dscgm2aukh2ngbvgeuxml0jivdrrgqqp0m6t98034xhaixww8n7qxx25dnw45',
                flowInterfaceNamespace: 'dcwbesityovjgtitcf6rfhw2ss2x3y54vqjtjgjeriya12ochn7q7adnm43bnowlksmllzbw9nnraxzik1it48a18sz3hv1acvnqnv6vctcy7w5cy6gleqrsy42p5k6k9rsdsmrd1fdhawaw3o7qeh5nx7tnt3kq',
                parameterGroup: '0lm4851r6g1w91gdicv3nk1uu1qg99bh5eq3wwmkvb24s4goktenaamko70w4xt8vurvzzn4vvrruls4bixdflho3po99aym0h9ftvfhk7xlrqweleqbt1klheyi441tu3cjgmxha7fhi95tzsxmga865x9cs0z9vl0r3amop3vqkfhstxwv5063px97bxpw6gjyy2cwc42vjuosfva9s72xoh2p4ppyrjzjvjokdre4ii8kpls37iwefxg3eir',
                name: '9nwcp6cyhl9rdyg99x3kh4r1rbdgwydp8vb59yp0pgjy18raefec9q17d03hd41scmjb6zs9j3pbu0migckpng6ydmb4elpqyrwwo78vy1w1gg0bbfhtconq0c131e7roqkrb6kml1csi25q0y5ys5j4kc2r6o56tv8orb6ofy086mzuee4b012mvryiebgzcx5dpvve921vnw20wvq4mfjmojwjxb3ykk378k79bdaspswkijn6frz8eui2iuka7g2u080b9oih3sirropyp2mssseenl7dmxvx0kiiexoeh84c8y6ofpqmwfqydk1a',
                parameterName: 'w1qvq9gwa082kri0ij8ua4c8vpjoxtrkyb39lmgtbqes8beerq2pnix97p98bn9sgjwon6exe2wdlhryvdjbiosjyclbd614rh74o3nktoqsckolgtmi8bdx27f1frg9mt8z278qi4v24mhkwu93r4gq17cvbv13r9yqpkrc5e7sl0ceckdmgvjujbttpjfpummomd6szn9dnv8naa5zs4rg9ntkcwppo7daez8lbpkkknocvbkk7vvxvrb5zjzpo1v1btjezn6wia1ni98iy1tgzohsdjop5xttd0317dajase97iemr7yng2ad69n7',
                parameterValue: '9kt4s6fis65z248pski8uz7przxwuof3y9nhgsjmn4x4gyztk5af3r51td536fm9c5g411kzdxkwntwulbdq6bvb539qf16pougxbq7doa3jlbht15qtbyic8zb9hnel0izm8snw8qq67nbks4b6cwjbp24jcshdonm92jeowpmdg9k09zt19lwowgd5v306yl4x52ib64oniocrcfjvb4sadvsz13lajwgg1ts2231nd1x8oqladdiaxi62spgdne0di3m1i5jcd1zrn9aceldol4xdvrisv61sebozhfb7ylwy6glk88unv07ghbwma5sh15p52016iz990lrzaw0lvzk3nil03fuct3a5vm9b7ppfxmtygqa7exzzlqo3sesu7wz6vnld0ou3yfxbygqjuasulry3dmlc5n5lorcm9cdd8ursgphzlmc7ukcfh6qjwso3hssimdhvrzeovz1syzrnf5oznzbchw2lpagui7lz9f0dx6e61wz1pymp6pc060x4gky83swvqg057df3omqyc3rz0mszx2m5rn6fmb2l9rw13zyt0fsri5sttir587ayhnu8s3daq1c6zr9qqrjynl7wowwvd2y1t2amgvpqfc7st65u3wo62o3yy7ugmclnsr65b407ccvfqw7izyvjuyh02klkdn7etylbwyvb9ircsyguxwpuvoxmb14bgyvpggs3s5pgxfqw40bchix3i47e8wh1wd34u8cxvhpkjcofm7bmpvou4443qa2hkg67h3vua5fh7b429y5kqp607a0t7gcp77dg6wezcypskpj156u49qq1nh222n8a8sknt63ab6n2gws4v2m87d9lirj8ar1y7x9rwavp9w0j68a59a1qz6u7rupfrsk77cahhs9hbev3cvweo8jzs5tcuf3uajkujq4qb4r4oxd9q4slcfgx652luisbe2jr3dzt2k5tgz8584t5a33vw71gnp6gap9qlf8av84g4ww6eumv0u3ek1d3eysp',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'xru5rmvkhf6v1gqf1oxk7tznqziczr2euoo1s09klmmulyhu2w',
                version: 'kyb4rn0h4ql9jloa4wng',
                systemId: '26778aeo8a3oqgxetxkr8tx1ffqkjcsww032a',
                systemName: '0ida3lij0uh0j3o7gvru',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'h2kl0tky2jlae0hahmicy1nhvdajzgyoi4qj1s5qovh3cit9etyaxmo4n2cwvwexnooh5em0izb2fpukidpi72j3agyoe0ebb06ibmjrbsykawstawqzxg8pelhnhfmaszavslfrps30z59odnegxbu4bmuycwj3',
                channelComponent: 'ltzp8lm40pyg79irzmpfzds846rbacvq8hg82r3qhpsdmqtofzrwx6xe864rqln1sty9xvjd2f2lmhgpbgxybs2235gsnoop4cksp8sp45s0yxlzyi0vsv7vnhsptybcfbvut7y9tw5b5smiatendvfguvg25v70',
                channelName: 'oc0wja72qhp6jcsr1ueapxs52q5ntxfmtowbmnc7vvfe8s0y53eck4osh5j4aionur8mpeau7tmibps770ut78qq1a0l9r1t5v7eqyo6hzjh19d2yiiu7xhutq07oh2oxgytpx8ihe1bze08mj4s0y2gctaa3fow',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'zrceb9ob8zd7uphti1803khf208dyqmjaqlcuozl1dtqz1e8xa2bbmmbsarnii7wwvdohhpdge2fxxlnx5mwkebnpsv068t4msrfc1ud1n002abbp615oour6k7y4s1pt05ow5lwotz15cvnpp6828glm941pher',
                flowComponent: '8beyoqy6h1lxy6vqe7aht73j0s5tdwn8e3ixe1rfyyj4ys3ugpbxrsr1mcv538uxx54bi460nccoainhrtjauek8djbz1nz94yei9p77ilps8p38e1fcew5wai9ebctcew02bviq7frmy1uycl6jmymeq79e5e4y',
                flowInterfaceName: 'eaz0zcx1o89q92agaropjka3w1qxb9y0ny505371dcghoudzq4wfycbpjviwnrri31yhnd98stqem95jfa71zealn0k11glftyibinbpbv3z42tdnenbnbexefzke233r2zulq1wsno0fxgtry348rf580l1bbsk',
                flowInterfaceNamespace: 'ytildcc9p04wy1b87qjusb2uru87o2nyhgplwtx1ay4ynrxogv7w36zc7mivc7cj6dt329pttfc12uze40novvahri8jnlklogzosle0qzym458caymkmrk02xycsw3a8xet6013k6ksqi0o6xgy4y1iazt6p1d2',
                parameterGroup: 'cvy26v6y1f39b0e5coksps4u2jx4if55s1peoaep8ipwhe2irlzu92hz2xvj1z9wwn36u00eac14z7qkp6w8mfnjq5u8bxadztbbik8q8ls372mpd0sl195uxcfip39wo7puvir2uuy36enk1oi74axns84w7xwoj4ygfvdklce2zwgs4gny3j6k4g33trfp84vyajtv3xh20g1as2rtqxa3zk6p8ixxo2tk4hor5iowvv8rhe0j0k6qs7q60rp',
                name: '9gsak32i0hqqhovw9gnl0c1zn2lpd33zjgav8u8d8i82z2wckz3p95u17fdcamk4unluot57sboodewt6s5qyv9e4jtr03u6mxnf6jaglrwrhcggp6ieak8xtu6t6973iy4oq2xefa6gcg0lqia2jwmqy1d6lcdf8p9ak3q2z3z1mg1n68zyj7kgdolw3x9kcuebz0jcij0tm67iilqm1jxq705uw1f9ue0jsilpwut0y9b2iyxwxzoidf09j5docbce00kn3qi2lqrpm6kei95n0rcwzt38nsaljue7bpyq9bvzsbkszkmfe33xphq7',
                parameterName: 'iu904q87kgo7jk3htczzf508ezvt3glye0zc15n4fnhgbmmsq5y9vpzotlazun5pj13gwiwa4acyr04yb56globs9mjo5m1xtt1t81gbtlmg69rei41oy35o27zyi5vgszlsjurkwkairmdojefbz4ifavymao0vjz1rzxp3f6ueje0i1m9k80j6sz1mgbzb5xl0ckms6ejmanjlxiqap00o6z780vzdgt5ff5fwhakeinlemhgxgonxz3cysz2npk0d8w3wrlvg81juz53n58wfhnz0xuj81xj1pn9nz6obsll62kt83817d7wyvf36',
                parameterValue: 'musbh56y6pkp4g9tuc18pqukbhysv8yin28etw5vkr15u5c1xeriosdibmwm3oc8odjzz123pojs8gjm9o4dj6dexpsdntouwnwk0a6nbldmb4xqrtlnnbqysntgd2h2r6hdazx5e0yqh6bcltrekmpwatwmq6b3anaoqhljxt3r0ub5iy1nr61lwsz3iso7scbskalykub288kj46jucx66lhpo1kz7j2zdwalqz1pqchz6yrsflvv2d742e9r8rqa0sqlgx6bi1mra0ohxpvqjmzt3auqle4uonh75yt7x0dpq2e12af8i0xd0zhtbos9p1i27l4vvcgtofyevatr9g4tpdlw5fftdgz79sztq8nnegzzcurs7swfsikzvfqhleyyl992fl0jfp6216j4cc84k686ay07n4rcaww7qhzupm8jszumsjwtancfvx94loz4ob0epkoppxy6rpqe82w7iv8gfxhhy67ujqps12pgli6ua4ayrjo9sv85d04bcj0wg0ev4gwm2k4lvss4qzg1ko78h1ih8nmpidb7jy447rba8n899z7u6gcockuptudzx8xybxd99py2drujwljc8wfa3ioz3xic5r0b8k8x2g4vgxulqm02oznbt0fqzoilxt755fsix1n2ag9izwrfawt3t2lxq6w5wnkw0l8ft5cfxpz0dednpq72z4ufyprpdwg7y8sw6sp78jd942opv61mdetz1sq0fws8ln22e0lt0w5o0aowtngbpteqdydxd51ojaw4g4eqjamezyjeib2s7741rlr9ew806v3xlho94vhqi5sk7vhglamm2s1xa5zyu2eit5i53hzdkgv4el0m3zljegdeinqjybryhgiphscddiswesyd6fqprhmio8mqbio5ie0go9vzqw5qoclhcaiwg4zinfnsq5kkharout7io0lszgua9qj88lkufbs05abowewbvw1tn5hrz9nu8eu27qg4bo45g8cygkxspcxi59chf5qg3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'x5usxtjf27loiy6zc15x4dlc9zgixguk1riaq2781xsoxzo2bg',
                version: 'hhu8b20be007lwwicmst',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'ddn6v8veukxwxf9qcjof',
                channelId: 'c1lp2l9pztppt8mqz4pn05dxdcxb9wo50kkre',
                channelParty: 't332dxtixz5xg7btntphvyqoqszxnbg99r5wzxcunxswm3mruzdo0q83j309hzvwgtvhl3bctwg9ghjchyl3ob1ldon64b6fdf9dsly33jd4993gv3b0r8o4m7xorqaim3ou5s2pxymbkrbrkzsckoku0emjyct9',
                channelComponent: '5ugexvjmet12jp0u048ujwax7nhbquip3bpx777p7dqf3w6pawg8oq3sqgvkax4j4zyjzvmda1y4mh0lg8xhi3xdkxlruiuzbcrnmimh7dw5x9m1bsnje81pr8o714mroxwj4pbw2ldmslnnb8qn6mcy93nj7cx8',
                channelName: 'blte1w2on33b6neduy63tekt6lihwatmz4xvn862ea9wit9qhdry0ucxmhrw3kgf5o10gefq9zsvbeukp58eixhs6qrhr8eg4thwur1x664i2r4q0u62fzr8d7r17rwdkvlhbqvz1hootoq2d111c6x3fqrazl1c',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'vwvqfy0vpjxxfxb91bsqc5vosxyk4dxsgtta9ppqfy3s2rockv2o48jpi69stnzmxnf0gawai5khd62gcjzxe6rgbq79zhc69uwlj6d02xktzmlhdxju4ndg6q4cl733valqbnyfqjqmbst3xvuft7wzcuyv5sao',
                flowComponent: 'kpf0kdehj2p86leviawz1v1kqoqlogy1cvi6lw0y9a7kk1osvluyx70vpw7l0wf6o0di44rl8mlgqhhhoskfhocck7z2hzkj6pwkogtiowfy1rae5osx7khpeuwmc0i9liwjn3ww0o05ohr28t0gtbz4orjhrpih',
                flowInterfaceName: 'hekg0cpien6iylcbq93t02k97xiguxt1allxk0ly1vy1wf1i0tb95expfr5t401z28m4hp61txfiqnpzx59vikvyp5emr6e6o4a5dntatrm0wcljwg4um375ni082wrk26vnn45qtppqt9kipkiosid5lt2dtewy',
                flowInterfaceNamespace: 'j2udnetrl8muclrke9yo8cuut3yu60fnrazpgkrp26vtpf68544hb8gk8vdhvktgn9n897cn9t9zzovhu9bl755w0gqne3trx7midciamjwzxn52q1ryizo6qulgfmajipd82kqw202c9cgo88b3qk9v4llllf8f',
                parameterGroup: 'ljpcp29fkcs3iab6py892lvt1h6y0c8o4o4ee8k38onneoy9veec5s110q1dz7b795e34n5rjqjlzti1r3ai5z79tacvju4u75gvbmwqx49ms2t3ezmghnivlcfaobqt5olfj779dp7vxcyh8ilxmk3rp8emajehmbit4d9t3nok8v7sze9y1n3db3qycgqa86on8mr18thun97zk88jlw1ycgrozb4hk12ca8b58yl8ru5vu1ay7jbnthte6sg',
                name: '7t4l7wq7fo8ki3hqyc4kuhchngu2lifgqzv0lrxa47heerwzs2iqddar2nz7sc80lred884b8pck9aphbbnn9fzwdn186e8m1csh65ybdlqfvvvtkcr8d1izw5cbmeeb11v12c2bn60ss77q80c68b3axle8rlfxmsmzp59t5o68oc4lo8vzouurzoi41zo6u8otyym7udkv4n2506h8waaiy1v5ldd9gnwtwoor2im0dz8dmjpbxlzcccfu7z32np3fj3q4mamvcy9qjp1usxi8t5m0dachsln11b8obi25pqikean9mv470jyyhak9',
                parameterName: '9jlt0a7gneq48ogvwqtjb3u1kkx0popthgxp223zkr2kvzreog06hy1knob6jgprwxw8444bfte15amog1oei17l1z687c9sn8zyea91dkihggasm4yjwg6o8ge0zeq13373cnx73m772juu2mjps2kqdtbex4xc8jpqg53am83f3yvv2wnvfehpfvguodwtayn5a9y9rulejj65ktz22vcftgburjwmaqh3vv3hy7paq7jhzc4bixen8mbmsc91czplptsahzju0unr6xw9bfcxvyovwbna5z6r8y6q18h9r0sx9bed6fjtjnf7lsbt',
                parameterValue: 'm9labds7hsgoehrttbgw9bf19mwzw8zw9s0wqoo7emfyzprzjg7u5zj3v40kjbz2q2unl9dmeomrtb16qn357au0n1pbaa74vmzl1vcf2yrva67nl7yqeiswqtk7h32mo7jywc4ad0tldeknfyx2vvmio7fz0dfe2dobo8u8e60supumr5d7jlwstbnxrdqqrqgg4ftohp9d7lxeqzbw089ue9idktch0hqeo8541zuiqt2a17s8vmeh7wt67o11vgbxt65eldavvvq3soiej1qosts40xj6l8x0hrh59tenas9g7vm9naqeq2nz6gta837tfgf684a7k27uj9mfpku4f083nfrjxeqz6e5lcp8mavrjvdc5051ie2yy9jpqi0o7a8wvmr6rfiq1axaqrz3y2olyr1i0fxu5bs0v0bufoz06n4tvdetic4b3q0dftbszql36etoo3ja4xzjepxv5rqxv9fohc8nk65zt9xasnljrv1xla6wohwcajjk4r36c7ab4w52ddtttag0fjwazu7kp85zxeig8i6oiq9ubcua55nqedt9psq9hohm3vcm5di315xdxp0c063jp0hc748ugpenq8i6t3jmiukv50ru6e78db0j4pk0drryaaxikgx8uppknbctl6w87zqtx2htj0nor87lpvcyki8grnl52e9z177o5bf01f2pfhh1z2eeea2shzgfoyw4qwtikn6pja543fkqd2zopnpxccvi8dgqxmmrw6c4kwp1ucvaosel2yctzn81eyfobsrh7gtmz1yp3k7241ht5e4aheclldb1r2fzg0b3dmfmv7380gjl2u7btvwui6p4dnklv1743fc52905nw3zgxticzmztt57l8pjkz8rizypqb18enq5yk6a9cu8lz0iurv32a1b5fklf298gspqsq03zi49fz0714n8xvqdcwna9tgahj2ac47nw11t1tppcn1q15hs9u0ebiq7bk87aik2skgx3akkyn31pdb8o7umw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '7y1ogxfx64gkah1ot3t8ywlf0rvl4g79qygve0a46ov8z29wk0',
                version: 'zn8jnxc7kuam1r5brgt8',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '3vzodvg5zx5wk9yf07v1',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'mtl2qvcstt18mrwapphk2zd1otd6f5zermhxhn154eg43h8surnzq3ypjz01etd9gmkv72ixwcffku577tg6eslkipyfzv0rsejqvemktp6bc4l0iqrimr3ybb3gtt4gui15lhdih3i26vv7gd7eqyen4i7asqy7',
                channelComponent: 'vpvc4nbw0w3zcj1k7pabkn8kxq5wsry1vgaxbgemhnwy8r4uz0zqtzkdp5u14w8qgxanrme0qhfzln1fupwx3xfg0v53aa47698tcv84ijcahjjccwhrays8mktpqujljlcg1a0mi63uod23beqhr1jyhayww0eh',
                channelName: 'eudwxktg3q06kd4zwb91mb9dzfs904l4x9cqlz6eos3w6157mw8jgd5i3pm7p8zrod0rite6sxsvguunquz18bxg2ub72luycxnlgtqpzgc7sy2xoyzu6abg3ddg0uy0a6jsdj9igq0h7vn0e5q84djew06gtah7',
                flowId: 'qs4qi208f6rg8dfbgdqglf6wz8sfg36a47t2n',
                flowParty: 'lr5eusabqt5mkx19vgt79ak8z6g5tzfg5g36j7okn21m6cddcyol4wwwos212e4xrw1exk076pjjhpni72u12iobzu2g24sqv9rwculn1vwqdvuyxg4alrhp63353epgbs6ewy5kppj4yv4iwbvtuv6en5rj5vry',
                flowComponent: 'mnheyhl0rwljogn2sxqsljyhsiuy6kr87sxxqjh2klwt7v8ub9yav3u3494vt9t9a9dpwphl2pjvcrfs4zvfjva15x70qsuw7ngyzuee2nrnvg3mf4x83phzyg3ypvyb4276pyegsory7bd9fq4vjfppyhloc9wa',
                flowInterfaceName: 'l6gj3rjv87rh7rix0e4f81c9pwfy8y0eqfg50hi7ubn0oal1w5crq8jekgul4dtf90vyru54mlomzoz90bmj4335p4il968m2y3xfw7m52tc8l07qfnzou7iy5rj22wrjey0xl423eoh36pq3ouab27i7q2ynau3',
                flowInterfaceNamespace: 'lht1a3t8nblzeggw20vt01fai12ew9u2ef5g778gtkfug0vz5222gevzpeq4zhzqsl2jmp17drmd23b0tjkxohn1fdu94653fg6s8dv6bwxen8orw4bbk5vkpxab5ox4asg3d71kk1jbi7xe2gb97dd6185926az',
                parameterGroup: 'cpm9mqt9esq5dml4z09sqr51a2h69imdic6d0mgtoae50hlgnqq266yhjmmo5s9xugr1raa4w4z6ew10gl8r7dg9bo1u9e9eu4d553ahucr1zacc4uq9f2erlikec5wqvek7kvvg3eb7p3lz991fdy9xeeiy5jj18nugprcku53q7b6lnaaubp1z2xaf87uo8wdut1z3o7fpxvpszhrmc55s87mhwd665vuaosziemqnh26g1ymmczd52f6dski',
                name: 'ovvjq075b9ekkfpq6tc1v2526x1errpj50sv1osjsz1equy7m9t44z7b42henh7wsckwa7h7lkt8lha6amf49q290qjuvoguwpl1cyorthdrn6fggk04de45r80sikcbv143tulxzy8zyp7z8gm6mu9lx6g0rxqq0mlk6b7z6txbeuxt4w10pwcqdyvq5d2fl6wtzyourni2b8swxbppzk4v31i2f3rkvt1wxfb5irxfhw6jlhxha4qvaobb6va1q6owj5bcp9724se72gs0h927t4r3f4gp6n0fnt11cq4tct7l77shd8x7jyo5zjx5',
                parameterName: 'jhe1ojgrlrtok3gf1vb8gfbmeedyp3vlvghixm06ugaxrz26cr40qmeromin41f5r9upyttz3umk02bccizvm53yb7pozzsunt8hxohzx02yzoxgywpdsftwofd96zxilejs1zsvcmm7ae06b5vdy0ok17fu342bzdsg4xyir4oy8kne63t6qd8mrrac1p3wqh5j2sk2iw7s624k8y3dcc2hpnq04k11y4z040o7x348nqcpiw416gjvhd2h1ya9o5xzbzafzmwur45jzxagduybhg3tw2yt1r34wm36gx4flqmy6wyqgkqdihvz4q86',
                parameterValue: 'y73vcmof1uodistidv8o6cos3819mgiplamrjw89ndru1gdihy9y9vfn7dibne7wp7ezxhdxa5lox3jovdb217brotqtrzpl0o9f4otjp4tv75bduykl0gi29y1yozudcazd3rpkl4circ8o8fbyb30c9d4jafol0tawqv4hkfipkb3uoghlrtf3kwgc0xo3d52jpflvln6z59v9hqg4p4y30oeq52g2lyi1aa89b1or7vcqnos0y0h600zqz6whcjtc649jqkekx5vl3ld1zrc4y333w1em7054j40wdca8ogin43lf7rxda7t92jpmc5ql69egqs8x1bttj0gtkpp0yy19lzp0wsrqrvzd1hs18h7bwdqsqo4py2q2vdrf4xsgevuujjjlvk7mk1rbjeyka191vqp4yx0su9m1g34q4vhff22m9cv3ar703w7nd0jihzriohtczklzjun3z7tx522oywb6oounreymfepbaumqagsx0zlbd0f5ircpmbjup6c3e32f5j2tmgrap3v6zr3ng4ya80as5ro5lvjbfl2lgtrl5xjuifb61pl0ve36tdikptwzkuurb1q2ajpf1b6bkhz3bpqpe35subg28rqum2gbqd6gta6nsbqbgq7h7fv04v90ykh82pq9lp67dbedbgthfuede7q84h9en1lwkwakp1ev1qwj6lcsv3ynow46sled16u1rcvmfvnwv3gqdx3peqpom0880jpdq0qru36xwo3epydkuhugmh44yh0a6k8i6gmla480dfk6x9cwenxtbcf8xxcpre2q6pdr1vtbbnzewc51twou6d3rkrbni6qve5yaa9qi9u0um3xjiqyrayj64o24mr8n95hlm0k4qqa03uzaw3dhrj8v4n04jpx7gclo1zlqxpum1vyqm0x39my2uin44e4jxyo3mtkh2xd2tittc0yc5r6a7n8b3f4whomeksn60hi2oygk2u2si7h8ymqol9t3cq40p73p7t3ditmat9vf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'ahzl181l7emlf2ncfhpzipr9tdsuv1zczqne4u70qphcqw5valc',
                version: 'myazhhh06p9hh297f3se',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'c3x7uld64bt4s61rlzio',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'sgt5vpemn4kprx7ab8bo2a7ecnxnbn1mbwlvvljpv79ljvx736e1kt03vwa7aj451m1vcjmozmivqniqdb24hhm6p44myt4gzycjjq4pdcwji6sq535cy5mfwsixbn5in3wt3x4fdqvtrlrwbw8ynk0sbm1sb4pf',
                channelComponent: 'b7tm5g5t1263ge79b3avqe0ge4vqrnraa4vdnoelm4u21lo07st0ob73k0pztlhtts1kiiwlkkt6huqcqn8e2lexn126a13gohgli7t2jz9i54dfn0g7nrzno7cmppr8u5pgmjxkh05poxvjagf7loxyqr01k080',
                channelName: 'uh4tutmg2xq3qbg86die60iol8ibfkncf5z6oaha03dg1lz3l7w38g89jtjm0o2x6hfqtrgr5kp6fso7czmg46k63nguejo8u82i0w2r001bu5ktvtnefys2cndavltgjdykooj0mkowranh8naghrcyfws97zch',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'jorncaptj56m8ufndiv77wo9mjo5d2kc0xvfdo7gwx9wq9shd8ka0vtxvr4s4ppf4dcdtd7wbppxtwse0xv7ck89iksw51jh14gwaq7m6t59kaauvu0qnhyv07k7go9ibv9jevgn7rth0h9080rpa77puzo7v264',
                flowComponent: 'wt7cspt7i247ldinfprd79l1j3zfvp46wfatmxi7r4sblm8057hpk0m8rrexjotsm5ooxsq8mi58qxvjc6g9ljx9bvttle7qe2rcqe6l32fqeryf3ekk34ytcwuqc7q0odirohpl7uffp8tzlhbf4ag9fnmkjcjz',
                flowInterfaceName: 'zw4d0qfe68jlzppjtabrffo17k6li1one6h9vmbkcjkorvclq489hqwlmg7qlpb1q9nyq0z9lidzq1q8la93v15ng3e6cuw84hkcy6mlgxz2c89faysbp5udc9m4l1q237kme3464qx6drmqfjpzthfen0k72g9i',
                flowInterfaceNamespace: '2sx087m6panyq6se8ym6nrt8wiyun0p7v4v0cnfmb71xtqw2hvtb5fbyzvi3g4ugnrvx8xptma1bflv518hrag01xc3sg9rhavak32dgoocpvreeypb4gis4yx6clgiuhpcg3uvz7uwqc26pwlc2x5a9u7ey7ma8',
                parameterGroup: '2lte591jyvsgrbdyy5rx6iyuys8kt29ajx5ewsonm13j9vj5qg6o657y7nx9x4golkzvz48gthcxec0btvzyxz19snif73212wnfz9zmf5j90nghs98dgw0eeoo6s4euzgyshmn5lrhla5yd9c911a1dwiqyqnub1t3mhvinskovdgpbgx410375ff9vt9ihyqjpiot6i0hzrulu5q2nhh90y65ie3ixsaav6ifptl43yt81dvwte7ovky4nee3',
                name: 'rnkawk1l2sp3bbcbz1f5ttudlrz1jdj9ub42cmlrro3is9rwmbpxu7p0pp9ecm72vnblsk248rloglnz6fgg5mmnuuczxqn1h9gh0ti3oqmtnrmpbtrwcnriywhij7bwdut4l5txab5lduh7uqklmjsu335im1suu0a9pbmfeapjx2adbf9zxb46aocbtooip0d86lhf3odwuwte29ffmzkb4l9ino39pedw2ocpira1dpzroikz4snc35ce61ecpmmihh03ifnezxf826m7duhcm1h27aa5xjos5qz2qoq36ymrwbj2oi0jhhx1br7q',
                parameterName: '4injdf03rvo28d3n3x74qqoh7yhx66m4euw6jkm3bjxhsbqg761ug82fc0rt821x9xp5fae8aj1ech9aa09tyq5o26dpkpvasr7swhzozkljph7ssk1ikon2ic271q6tojlc5506abl0uierci39tdk8wbyghvmm41jv8lxauo6x1ya59so1fin7pyau46km3y8iqw9vkavntq7djxk9q0rksusg9px6wu9fr5bb4vgqyebbfj9uldbginaeb44ibxjbrqdr41p9xfcjqqawy0t7g0ibum0kg4bdzwh9cqycsafrxpr1hv7qx6lqxxs3',
                parameterValue: '8908l884ruv4bi5ufjn4zoiquozd76ijms9evig4edjndw70fjcvb5w6y5vzn0zqqh2wzvwrhypd4ejfm46gmkry0ca4zaf0subyr9gen58y9q7sjrm2edozdzox7dn0ek6lgdeiiw99mv7090ur9j0cgyvzuqo8wj3ng90coiu5sm5wi74dhckik2c2ra8zvtsrkjfket2tf37lj6wmyi57zweq4qsmqe26khn4584ovkyuj9ys3vusoigmbas9yfsu5qyr6dmjh82ol85yq5mca4d7geixrgmrquxruf8m5nmf5m8u2zx6z1mqe6k1dqdramo19ma5xxhmn4m5darps38cuauso40xrkhtu504s0exapff285isbsjua6d45avdlzw69obq56onnnh1r1ggogv19wxcxqrenkif92d5zoccxvwu2sv8xw1d6ah74rzq5ilojdglpb00lrffltk0uf8azel2enh80a9kl8wac1dotaqpfztocpsjapn6ci60276tetfrs9s14befkimjal9ng2r4v49odnh07idnouqu12uk57dzsc24snlncvs8281o2a2414q5skdcpc74f94y31mvjiacofaohv85va81g1kz1wws2w4hurb38pv98l1rvcpmlaeirab7t8bfhenin96hbw2la5n2b7ajf90cjhywd0m9nmrsm04565yv2b3r8bhbawy7f8jqmhh4iu5raycvsvonagns4b5z7lxs5a5ftg2s3clwoawirywex6bv3qtjdo8dlda4uo310ux8y5ncmj85u03k2hb2i847z5duyf3pmfflyxrjp6ju0b1q6qjc740ehnssgr82m2q8rvgs71i3iv8wic5rzszbyj1if1mxucjun5c89k3i5t2fx9ulnzj2rv3f2bnpoe4t3x5vslijmrvk5vwaewztkr7lp77aqmz89it0vid0tlmbasr77s8ohpha8pr43wmpsmqg277cz7qj8m661dljwoege5prxs5i25p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '43o0hvluxz9wxv58j7dvcdmjcw5lhxsbdd7eho5fbh30dt4xpp',
                version: 'rcpoxqfeemqx1bkv9g5ly',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '0xd4v2ga8494m69v49uf',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'o6b1ba6d5sx8u7a4h93d51hee03i57u2ihox3ybop8r3o293n4ibulvdu575w0ggaahlxl72pt4kqs1lrahb7omwoeykx0e5odg6vwfb0alu5myvsioahkpi06b9diwhdnaoc4ycnads9h1b6czzf9o5ce2yzwjz',
                channelComponent: 'nese3s7b7zg8r4gxq6fqia8ttbfh0krnsdgi7p7dza4ncr1acgyhrtv9cplw7j179h3t2s1wfem98sfjd7bt449mzynuy5f3uxr3xy9n2w5db8gsb7ujexfhdsmc0lxg4qbcafmn7ubgi459g5oneck1iavkethh',
                channelName: 'lkfqsfrd02utbzb52kefqbvzrr1ab0737x8fv834djtkhz0xri8gbpn7vtrcmdo7t8pwb1h40fpz5byjet0oiw7jrwkxcqrble9jzhktafusbg0o6hiacmo23nd8qash5fldyxivjjye2gvsbn9dcvaeo8ngzuh0',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'u9uuomn5ru0mir6vbfsuioif5e5qw0kimwgx03398q180uar3nnythukemjmqin3ngw9shm6zamqgqiu4g02pntay2bib9rf94ascew6fjyoybokgbu8qifhfbcon9079xagysqnnyz5tswv0st6mqfgnu5lvc83',
                flowComponent: '7skq4znl6tew1motsceblk5xt7rfr271xvjc7e51agtnfi0j1iznhfh6empo1u9hshd5nnd64ebwj67aan5wkgev0kme8lkaglokf1l25vjfsxybned2dc0qxa833hr3yh61lavn5mfobbfar9j60hukojlq35o8',
                flowInterfaceName: '6u4hd559yb4pwa3if1nuq5ne0w83xnimex28xonsl8cl9sln0721a8zegwffoqc5yojerbicdxx9niobbsfoy1lyoi3bd4mt7rkm8359jk3n4o3spx1zu1svh1typ5wwdpi3z8jmkinrtqrprwkacl5r6dnfwyip',
                flowInterfaceNamespace: 'vwospcry5m6deymb2qmv2zevg2enj4t65h4wsnmjgsiqjkrn2r66u7lbwo5kkxgluivyunqhhcbj8jg8cd1c940rfzvhm5zg7t5fxlgilroednmz4wa8klzwpnekh5qduzk2566aghwbeeccerzcy2m2e8bckc1e',
                parameterGroup: 'b71d4gay95t4xvuukagh08w2rv6h5sopiyh632mrq74if1b6mjzgzn30kmr68rbimpxlef7p1vxkq52858irx2wqmog5niuqikz84hwnggpuctkp52tx9c0ekim2f9aq4e8lkmbijaveglcvzmquydlizytin14acm18tf439auzpjlaa6wx2b3tr7v9ru29bnr3lnz6ocibl5jqv21r2uf2924gk7ddcebngeyrwkq2aghmzrt6gc7yfprs9ne',
                name: 'ilr31hwtrjtco55urbdivlyv3lqfn213v3hauhew68pyexloysff7v1o2fsu352ri68woanuprh9y3d7nxb5qhuljw5z2k4id3l3ht88toi8vet0bdfivxu8anb9suwglpu0wv74wq1fw0gbppg5qe2y8kd88bs91d339x5rqhvd41mnl5u04lz2q7xzxvgtgs8k63zhp93uhc63zkno8etch3u2p7muupo6gyv691qmivou4vw1krs0kwcz9aqb0ymzlsdq9l6rtv7nt0n69e39i75kfhvc4zvjdj36djifscapfqbjgxapiwwnvkvv',
                parameterName: 'g9e52oru4sfgk640z08halvqkkx3rhjxmse6e7tupy49h1fyconayw8vmoygyctj99idm3d75tavbg3lmauoxax7eirzth1kqs8ontyfpkkrrnvno6iy2dyx4l6ynm9eilaz11m5axth46ma0sil4i0cpj7co8csghhf6ukne0qp6j40r87saq90x4k6ryzwcsjd99481fj234t7muwvpf80tmg8ha9vyfl75w6bbnou7tnlaahvzw6eb7wjzxwuc25jopj8q2cwj5za57bkt0sjbmtitahdckc176kpqxdqhsmq24205nmgdtl2uhjm',
                parameterValue: 'icq55c5l7ym32jzoxnokt1g3mogn38zfqulhdlg036n463q1dsg0bu2jitewcq0c6w2hahoob7yfwi0wm3o5y1h60ma1cb2en2lyv916ar5jbf8evteri24rtc4u5tric386yyret0t8l59k23l1py81m9nqqmytct2bl6c0gb4a6puufp6tjqqhkkxzff3avhvnuxisjqybxj3hc75bh32lk7qq5job3cwnoczeh8l8igouc3o8u1vhldh256bccwzimupm9479bkis7b63hh0gmp7fxtp57lgwv9omna6epeh13w6dh1q07var82gmv0w3yyd47phm0of8l416ldpcc4vlnfhhd62mpgxg7v7lk01vsnj5y7buc4gmlve61wdpnssne14wrmjm8dae2xhy9ashji32pi3plejf4q9inli0qpy9za5128vhlw7su537w3lc90qpqlj3mb69vfdihq9h6uywtyxhuezs5iul7kn37ziyegluxy76nwm12dzgfnel6p7qlolmahm1bpheod69xw2sztwgm8pzprh020ex9dmbdoogshq1yw5sp6xeb2tpn4kkajw4n4ffp9qhld2bfvsncjxlfoa6sjibjjux4ig063u68qurrc6y8ng4377dgbfldwu8mqegp5uxajxn0nu6qmcxpy5jqnc5b8rvcik1usklhka7njm516cghpt0nwjcv06e7rabqq4kq2p03iqtulesn0fpn1n513urn39mjmk1xc0js4jgy6px5ff3schhmyli8o90j8toupc3or6j7gtkdxkh4co25zhdkc0esr2j573zdj8hme1uwx9svtvmhtk8pyyw6vd1i5n2fx7tnnqx62nkl5ujjyh1zrrlrp96unnmpeuk3k2aow58g7w8nituqhpley0rr0f35fx6bdnqxvy5gwbi3y4lxdrjcvnrqjwe8mmvgap6d8uh7smgzjc6koghblofnz9qqzxi1a0dy8khre3v7du5kr2wujewji1o956d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'e120d2apc88pycoyhwmayv0yzb8zhkpfrqkir0bhp6sh54h9b3',
                version: 'etw1xg0nuq7i8ro9mm4c',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '2h5ek9zhpccn5rz4ikk3d',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '1myfvrfjywc6g66w1ujtocxatwogyb598kneg5uyrzdw55t1ogwng5k7a5kzj9zuiwka4mcjuuqevewqjfd24t204a65l56t0lqwtkc4nao7pdux0ycfvpwte904ar01byz3hf5r1sojm5a89b662sg7iwdbuxsj',
                channelComponent: '42goq0rlacguaor7tve0p25x2x01n79sy5zi8w802vu06ialmqoq7rxkfsmer9yxwe99v2km28z9vph10vhrk26u8phkb7f68ubuul4xshf6rcmo3do0tr1181odgm951bzbv1n2731h2dkyzkwv8nynta0h5s3b',
                channelName: 's6x8077d9u25pss203h5puoek45uz2o9454jrm7iqboufditcbd4fet2z5qzioowzgtflxi6wcxszvlwcyfyoqa9wspvo2irhnr7kztv85thb6b10pgidr0nq6s0zmsl83i0b0bvb09b5kn3t039q63tbxunptm9',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '1s8582zhx6tgsvbwxg1sxfg2h9k7pq2x4p5szwv2nii33sde98ht7om55ac56a4exgighfq05p0u29f3044b7esauv8rbdd6ezow3mva8btyn8y5y0y2fnvd2oiq3qmdag3k26oiqn49bgzvfdsx7vxypekj497s',
                flowComponent: '73jiuqvg4jddyu8ndgimuvvlaard3fagwnbm2xn75ottgy6n762kzq94u3tiep37wpo9ptnotw902ougpy3ovaty9izv8gpr9ycqlskvppix44tzzl020mvqmimrffaml7zzpyu1vbq6stc8r57tywhq2i6zv1yw',
                flowInterfaceName: 'tcx1g8c3u4at59pjrg0gc267s9pkvxgbtj1ip62lnfv0h820nq0sa8dtywfu70idgpqce0hbnc01lcv2jzigu3tuz5zvxhwhhd6voz7t8y4lqc6gdut7p76d34nphb2sm8kkg7bx4yg814xiw8f1lzoks68kti9h',
                flowInterfaceNamespace: 'uzgchhq3nlcepomk9fcaw24sd6pimffexruzrnqxv2q5psn8nq1t90r2kq1wecbs36sq7tawiwteo6ra2nclqpypq188ew0gdoz5tesfu0j5wj986zlpqhn652wyvqbd2yp6605w6a9p43h9m1hvphcjqwyckq6o',
                parameterGroup: 'dp1ruxb7t109i42mx16erfww8dtz1ftj8k66odcoyk5aoiar3i3e9o3f0n2kkxmrd1b4c7f084jkd1p773cdray3ew47ygv7cd3nj091a80jejun1xjvo2iinakt7g1ultvmu0emnuqxjmk5c8xda5b2hp0apnfmb80bjnq547i2a7hq70o97mhkjhmv9shgq0z1ycgsiyd21x2xsch19utr97cls8g6nwsqc31tbmrn5lwztkkjn47p7e0qiw8',
                name: '58wn8s17aq5bsv5v594lskmrmd5kuj681umovb4ix2ty4c0hdrlz71wteg5dsf80xexekeruuxfo2mwjud93go89tchcn1sdv8794489sn9jkgbbvm0xuy4if0ifcgxxq43050xu2req9tsdc4w8b9mqojoen7m15bo2id0vjl2oeppmd4ou0i2wpfh3kcwmnf74bgp2gtn9eocqems5yk2dmgvczye5hdb56887suui637dbkrnjanabs2kliapqhotc24k26zooihkz64mnhyfmd64dynfda4u6yqo4f6k8nhr81ltfo5jnucnc7ns',
                parameterName: 'qsxyc61fkai0tshemdeb4oms4598qjv4tpqldsh51xaafteduf8iluhowqu40tp52penlsu1ql7mg9jgxnwkicvnj9kllpkz4nv26vl4cgqxusnaznxmp6i7iya26sgt2sz0eu0p6b3b97ucirqjnnm2eslusb6zrz5i5pe8xhhxzy8vos4ufszv9hql2hrglte3h4awdt71fnnjjghqkv4kur9yk0yepohlcj3qutlwv3kstfh6khgwx3qrfnrmux4wvxbj2ivc9v2jbbnjcrikhoilcxbvphbk9s5ojwswep6k2llzca5u1vv1neo5',
                parameterValue: 'bm8yw97tmw4vb8a0la498x4snezci9dn8sq4lm8r6x4xey9i5c47st7xvkhuun6barieibpdzsrdnafxwrhzm2ztecspssxnloodqnop8nqlg6wjv7b3jtf5al572falq547rbp6h4xl64kc3tk9k9sc2wba0g2p0nuazjs1gr4n4ha3i4n37gey3jdl1ztni8kweo8dru1uha4f02df13k4labqi6y9y1b4iwt8xlk4ifo4jf74tloy7eyaw85f8nbqu0j9qip0aa3b8xveoxbq0gpp44ub4roh60rgpxygs9bwupwn77u0x3efjyhswh6cm1c5silfenwsrwe358w9l9qs595q286kcbsduv0hr32m1iarca0lu89fc6jm9crp4m52frumg8xcjl98kt20rljuxfwm2t77lqbio0zc74z74c4pydadpxxmfw8qs66l7ih56z41tocqyuyqa6jxk1bxryzbvi8mc0jdh0quzntzlbhgof1e6e8a1hnsofgbbqyy7ozp6lv30pth9wmk2ljc91hwe4j475ap4azz0ppemrl6hsif7nbjw5uwvgw7wgk301c0dx34wlvfmpctdlu42q9y1l9y85wfvihxfcfphymj9qc3nbalhz10vskg8rrv9oguzdamky2d2i6v6k108epdxiobyrki2s3dhlepnh8kjil5a4j0zy2jm7mzo3a61qtyy61rnrr23vgshqf18yo3pgpppt55ueurdmrupm29cbusidj9ou9z9hk1zld2jr2ro47o50if31kgdjdpeqyydhk3kxpumr7g9s0vatpw5srv9bc0n3zhecyyzmg1x33d22kw1nldjytoscszcgkavr1f0z3y9z9vkh88n5t8h2joqgj2zplmi8sr03lypj13qqcgbcs4cjauitj9b7fw4n5mtp34dlup9zzl9c9gem2r30e0h2wlroovdmwbnqvzeh34dbjkmieabve2x69kbhryml5sovwbth9sbbqbq2wfh32h3244',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '6uv2gr3s8wj18s34mycw5nes6vpv24igf9h257aqxqh3bxpp50',
                version: '1m72uy2bfqgyd8d2f1e6',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'du5oqjpfmxvgjbp750oy',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'lp1gdvrfp8pml7uk88lxyp43gvsca086bno8drr7l8w4la7svtaiqxejk6gbwauymrvjvo6qjnp8tu5sfotg0a7rodotz41ueibp2kbeurol0807utldtec1xs0402ybfew9re30gl7mlz43qbr8nm9czpggekfbk',
                channelComponent: 'c8iy3bi0x300p3d3r6p9tdgryk6lvr9tnztui6n0lxy76ucsyicc5dvfqwvbl21troljghnkoff6ivpmwhve6vbt6mh7kp5tfoysdntoel23kar0mpwzvcj8r1f0kirejeepcq6dnrez033u1xfrrp21bru5z4uf',
                channelName: 'gtee167fxdu1nm2b850di9qswz8q3tjk188n506b11qf7h9641pej0eof6lhhv3wnncrriemznnh04wewuywa2a5jdfhua30qpi0wahn916mkq95ilyfvzvuibbghucm2nny1mpzgyn7tpkimvwduia3rmezxm0n',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'r1acav4pc6pqin61hqcw175ok7cjg0c67k5jxb5d30b23y3p9r579d59tbb10e3rxpognstbb3holuucw6o4rgks41thanf63ge2zhzqb1lcbdrc7lg8l95lie0lszmkcj9almdt8tmh999kydvdu79xup4trzxa',
                flowComponent: 'q2alwn9uyeuv1zpd1apz9eotfnew8xcliepgro1wgk76vo4hkgvrg9ibl5oeybv7nr5nilvmbvkfiq1zja9t6cc7grbxt4iuv204jrgx0yu1wmacyl97xy3qphvk1f39c7n5lu9xlymxotl4h3se27c09blfk2qi',
                flowInterfaceName: 'be456wwdgx5f09pshtzwrhquymumk66m6xmg6otno156dsr9lyncporekod49js73x288hy9y78kg709f8akgmodz1cujd4hkg9kc4ioftdthi7s2ciu1fijuofmvgi0n95wcjmjv6a6hfhlwrqtn7bptjfw2q1f',
                flowInterfaceNamespace: 'ctfax9pkab7g8l32z7f2l2jw50man879onpfh5k2o1f0fzs1ebhjcxon992uvtutw79q02tefe93w4pov65fg99epa8y42pvnb6y1fmveoda5un4btr14m4k4yil3dc49e2lgc8yai2wms0uqf590b52rmqsidp7',
                parameterGroup: '1o16qxqfeye0bpv68l0i05ivsj1h17bglko60yffsa2kkog4n7nzk1sk8bjjvwsxydg4wyfbmt2n18o0it1dnymdc63l72575oai45ros2xokfeu6e9ttsfwriaqcmgxpnyxaafwr3b6lvms07h8du7pequc1oy5s704oooeufsj5n7574koqm3t2r7vet2f8zdvei1yt0yxs5ztqktblmgwhrtparf4d0gvn094hg8x134yq9vn3vb7gzo7d28',
                name: 'ijmf18i7ssbnqvoay9s8lwtuic784jguqyt3s19ftxsg1zf9504hxn5gmukjt9p04r8dm9vlesx74zselqimcupjd7kp998bih9a27tal7tzci1vl62exu2ejr4gkwevc4sgevcibhe37tafzub3a4lxlpkvrmvh28r86mcva6w8rg8f0etj4ex6c1su9lvqnrihhi1bbm6q9kwczknmj8ee8ymiyrpsmg1ic3fct0yp7yx1aot88946acq2fiqnrjmi9ecf9wwlfnfx3k6865zvoeiomclr4sjnjf25b9v01k9wt8371ih8eyolspnf',
                parameterName: '4e57qffyqpuhbaj0p634rmma4box1kscb1yiatlukhszbuggr7cyph0brth3nlujy11sgu7jizs2lzbd04rwphsyz5co7w3ya69o8h2vcuhkj3ggwjtg0g4d4ncoei1m6vgoy9jhctk7q19mpxt4k32sldpfrupix5e045n87awlpcysnwbl5km6k5q5o67q365q3ad55xscoimjpebj3lf9mdf7o4ly7ue95smme3trgz03sl334gvavhnc770hxqywk80wyv0pcu50v3wcs5atg5xfcm96egeafiby4ymn8vbdi5gdlcwy5kc0s0jj',
                parameterValue: 'n1r9uhczg7kr5ld28yve8g1w68uv6s29zejshty87dngdyb43j057dqm5kqt9m30gk1xks58qk1dtyg7m1ygqffqh55tj7f1vga7k2rifmhe69v92kow2iuudyc8dml9fq23taoxxnkj2pfxb7nh5eghdjmm7snax3bgxs5rw17737cu57ylen9tklpmwsxuxsph4jmm8q8yaxp2afhlbqorl2qen36h8329ig3tk68jkvz549pb64s28h1pxmwmq65eak1dncb4fyukkji7klr926g67eexoa80twxio9tsgv5ypkdd9v6e59kb6qja328idmoijyu1lmb2vcsctn9d7ugfofw5w2f8gh91d65zmlggqozs132gdibxao7gkb92339zchqauhamsmqo0iwv641t9ykbx6p6u0nl2q5z5j64bc1d8oz6k13lbhmlknw152hacxtzursb8ac3mva2aa2pac63jlaztvgwizjsoqyin8levfl9uy0plr928bl4bsu8xop8l6wmruvcczpjiwgd3cue2625lmhu9y6lbsyfcwjui0pg4ffao7849oc9sbjxhp2r2o2t4ogvt6a387j8iumiy5wwdxucvhu6qih1lmlpnq6hgzpdng3gttcex0sztq9wshp6kjajmpoo3jdu1pzg04tvljh7kyokvzw63p1ayzoep5wydmrtrzqk4s3im1hlzb3gjblromxnz4vhh4ct52y18p2hg7kfvqnmk4unl00rhvtwphrzrt7274q7mj2i2pxqv212183leod7frekv4jb6s1toxpx6brplgvu5yc02f9v21wte88lr4wqzzis81ip5e2cj1ubayqnppe480n13jzegksxmjhdkkz4yuv1ho4nfmpr2gnbwkcnmt2qr52b0t58wnm2ca5t2h65x9uclpo2o6sj1060nv0f506m6jn8pzuz3g65okm890938vzm2peqcw20ixih01k6pk4xezt38jpzl0ka9d14y6gad90wo0cz',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '0rr687cndns4wyfdhys0pjjc5ioo4gpcl8gji3lg57o0kdepwj',
                version: 'hb3u5azz09xau0moftq8',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'lrzos54w3vnx6gioirr8',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '1wcazerq37d0wsqon0ri0rhnrdwzr0bvr8b4o1jtyrktq6o50okzodaazvpqpkt9zh4yzg8k1zjv56zeal7x7doy2fvh94fh1apl5f0tvrljw0vpcjyqxb9v1da46vbf7n2y720ygt6c871acc9tinbldqkxmv9x',
                channelComponent: 'jeow7ywjmvhrrovityb26q4emrmcmes6p5np2xjb6bghpq64lpo34nuseh9b5baxj1v0of33qn8trwdch2jvv56zyftz2ixuf1rud9pnum9e480av4bekvgeddrbxw49hwfufnz2i1p02udo9k98ibmajxz9mvliv',
                channelName: 'ef49ynxhqp033pvpcd4u24lvqshy07icts1l5mkq2i90nw777ge02v96aldldhebttl4uu80rrmt1xqnshzl1o17yfvx7rgvpflq191fni6gq7nwcjpu33mmr9f83rjijd5rssptk3xm0hmgbjmowty3e0yawy4g',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'u9n797dewnycc2yokmvlebw25uv2qvbmchyx33cur1venfou2hgspwxklnz0r3t4th29uk11d17590p5mdxmlgnj6li78q0hes36x40s1ifdxk7orj0kplgamtljnf57l7uefzk9h0fm5grsapqi1mjdpz68xedk',
                flowComponent: 'h9gwkl276qq6rk671t8yylhqqq355l07omnv3yg5keux2zh9lelgez73lkjyha4p1f9twy9t37cfuu0ih8ithpyuamyn6hprvopoyeu1ukoviapu5d9t04sxw0x6kmc26vfmkccuqesysjrufzadmhgxvhxqxwlh',
                flowInterfaceName: 'kp1iuewkk5jxkmm8acsmms80vs90yfhxzynozosa1ebskhxrogyiu6a1eer5hqgsf34d1zaleq5b5nwtljj6zf0l7qwjdm7g49469l0rth3yrfy8qdnnfsdaydc961gy8oo3jrix4ck8q2ma4kg9hpn3i7gip2am',
                flowInterfaceNamespace: 'ttnqfkw1pinkx52sehfc52svg3jdvle60wvy838mhkheb9xaldrb7pzurwpmbzelhdq3mjzkb47doh54u2uw1yalskyobsqyys2hvavf0ip1hyoc5ojdfci812acvodxpc5pvzei6lie2zvrsdue919l14yvqw9q',
                parameterGroup: 'ovibcla25jnx4vpt1hgenrygw2z2lixupzwgs9a7dcf5bjudnv2ay1wtwgyjhmcpsic4oo1ztmfm004oj3dzzo9utnq5yed29i9waje517a2bcepnuewxz8g94f2dw4o2p3pq5mcz5ztfxugx0rsy65kmsryitfjvz5kthrk6tpquto85ry0bmi24mkw7q8fd974pr4ufsx5hjse0lofzu6f8shzd6yzib66bz2clsocuqzwj03i3m3y5rgdwm4',
                name: 'ojxp5kza39a2kd4awhtkkux6s124gxd4z75iq4p6v5n9t0pypuc0t387cqge4dv95dwxpal5b284r3605q5kbmqghnkk1zx6mkyhhisqdmm08d6xmx8h9ov6ql13lhrqaf9alqmz33s7jaic6l7yzmb1lut3l8j1za6azmhn1vyjktss8gr1kfcn82mz9ygckz76jig63bhmxj9bxwwmh2luits5miebsg55g6xj5cb6fy1kwhnf51dbt4zv9pxpvgh3e8u14ywsxo9vmfwe0lmizb4enikz30ehko9xebqlxt9xsaul5gth2hrv7tnk',
                parameterName: 'j1nbhmwqtxie38vv4pxi7qnr8pr9nxni01vc1c3v1j8o0z79ej6jvpscr5wxw18zj3q1zdp0chqwehx37mbqmmy9oqt5ksghnlx2nsj47vx4h72k7z72lbpqqtxmmtg8to3hvqrka42ftepq8gu2xi5bf0l5jjdro129lkulqi8virynuon5oe4v4vol3kc5anubt4cwo253592xud4jxocxuu70j6dzgzcdzi0x7drvo499mho0gsppjobbwplls6jkos269lr2ajsl2molhsbyhfeie41ctay1nxvbm42a000dcppwoawm3qzgcwmr',
                parameterValue: '3awat3a2fr38kctl1la67g3ii2u4rp943te9w410fvaqxi8evp2i1hea8eqavse4mjwuvjloz00129k4yksrijlzpvo1eiaq1i4zw2x3auh3qixxpjhx83y8ztiq1pnevbvpxc7b09ouhcn3y2l1vguql7zg6lmulvq4dcpt3cz4qchu41bq5o8mozkju6yf5rbva87k3o21rnyto1gl44u1prbmegiydhfife12o5zy0ula6zat9vjwoji3h23jpxkl5j288vc0l7x0b8i9r4ph4hfqiu4tznt6jius4z7gjw95ypj5xgzaqqu9m6af9v7x6knz70djg699yxq4i3uvls4urmh04uhj98e15gi7kd0croea4oko5kaiatqxt16po6dckfb2bg8orkiq9n6fd7dwah7v0rwsq55ddvbzw9jxlhcf317k7qg0n53z9uozg7v9q56rwlqb4lao4z09yetw2dojg0mko3xjlknpk7a6oxdmebrx96185rhlu38x5dy4rmxuo8i894hz3jsfihzpngak1c3udl6vm6llyzu1s35ijrv48yiuvhcu0qg1fprld9tk5ufp92tux5db8o5sov86e8ajdj8ukgwc59q856jvbxvbppytbf8bmvcimbaxhfneohe4fydfor4d5mdif2p9elfqg5cxc8z5ky2km0mzu34yy23tzdyngo4rlrl9wyuqucq1taf7jlpsa1vyamgc367ir1i7r05k2c23jcjm16brytu5or6cd9wqsikfyt409hou9ccuz26s1lhdjbscoqqdmmn901pdzesf6f9gqh8qqo4e6m0vap975s4o42fke523bdp4uqjrh8hruag9jqzsbuf2rgjj0ou8jumx5913q1iyn624ri6gco0okdqnghe5wwxz66ydlz2s1puzjkqfuljpmtumdeaa0v86zfvx5yo5l2qazvercw58x160gkxcmd32gcxrzpco70b46bcpyv5wwdge5u1wrsssjasluorgpegr',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '99z5szg1mfmb9v3esoqlrwjcdllzo2sdkpl00v14mliawhnn6j',
                version: 'mzz1y3ynr6w7bi90400x',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'b21zfm6549aholajc9ym',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '9xhcgatpnl1ay8cld73tipmzk1xg8w0qf29dulhllbgd6xtkzfk4fik725nfi40a93qj7jdaecmkxclbyh6tp2z419e6gfiet2zzuvzjih76a8ax5jtea3h8t3e0ccc1ku5jkf7syskaogwcjs5905d4r227l2f7',
                channelComponent: 'tgba3ljkuawogkuivod10h2gyv5ihmbsqz5e6p0d53wg1bbctwls3byc3wvcsdzw1gvzzlxtdzoga9kvuh090nez2mf3an2vpx1xli92kolzgrxoxsw8l18usb3nlglcvsk8y3omce2ag49zjecr391oquemrbh9',
                channelName: 'ylihhxrx6yewdhffbzpkox8ey1g1c66lykxjd0d90qkmns8yhwmnq09z0c7x26oyhexse8sjsggadwiqmy6gfn6qt5fybo40muzn4d3y1wyxx8ws37ia7eln918hwoxc81644c2ay27pw2e15qxnwra0m6z6ksoa1',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'n3vvf0539m0nukss54871dwa7krw5854cvjxin1cv9hz6s28h1ytib6id49fzfippafsjdfoql0vsqaxm9ukbm66qrjjgfj88d5yubmuxcjeikw0lqpbsb151uxe8ozl6jnrmunfdkzv658cfv8kd8az5xlv5zox',
                flowComponent: 'hd2pbhtulvtvd1mb3734me7yb4x8xyc2ldpl8lvmrws50mrcx1a9qc6mot02bvertczbi6v0nb21vvz731x6kg9momu3pxja7fryn19s9b9iai8y99ofdczlojept91r5nwt53480ee01poscyfaxc7z3favidpw',
                flowInterfaceName: 'x8j67zb8duhbw8qxi6wh9gjkveadyyzlbi8oi9asqcdlprodjdazj6q2wkzvdx2vbah51iz3ygr0jytjekt37lkmzanelim64qhbnvr7bbn85ekkfh0xpqbtkpett674yjoomef3btk8ttgxnudfsrav5cobxxhb',
                flowInterfaceNamespace: 'vnhvk084xxgsvlz867di93y3j5k2yg4i8oz8y7z7k26jxvzkqazf4ehvnbx7mjcce1s58fi0xu4v9rwu1jhsmcbrpyt75afze2twz8bmag1y2wbbiqw7rmr5f59bw7nb63a0h0knzg5cgwnoy24ag7yjsbbmhawf',
                parameterGroup: 'hzqvf8jv957b2r4ile53nv1sl6vag9wrgj7sz1knqt0iu74f1hzdgl8p5j4hwk9z4xwyyjnff2ts0b3byq500b5f3piusc0x56ol9sizveuwtyznpnyuvvf7ma9ku7obkxyap2rncalr7gx5k85kmxvnuqslg9tacd7yjx206nck0orrwgq7pqjby6uac9oa6rc37ijsezgs3f0zncs0vjtjyx3hmaeimxi8v7e4pfgnfsa4vbmny9qzmxc6ped',
                name: 'ygjewa8tklnr1hvo6kmc1jvme3xt5tievkhywjz8nvbiqqnb8yug2318tr4zi27mq35r9csw5hgvx0kruazbgc1hvuz5ymvhnvg5plij2ua3x84aa63qeapbomysnln4o66f0pm43rb5p18tcn6aky1b9460dc2kkyz47gf7hpsggf9u9xwn2wi60vd4zmv8834x97wse8inkx514ytng2ibs6kwusk4rnedb8s7xces3u5ik3k93y39lfqhmnwu2yzna0reerzlcr6gq7hch8dal3llhqv99c0k4ksdrj6ava7yq8hx439589cca7ff',
                parameterName: 'sv8nyrb014xc4xuhbsel0v6re2sbddwv1watvyciwawhlzuwcrh8v79go5flo4tl2khem298xzgcooi9be3r4ifljs5rmqr84fbpwhxhl0w0m8omyjvctrh685rzb0n67e193viazcort5ynzk8l7wuuufvezz5uq73g65fjfporbja62szs5ywv0hrl3zh3hvectopyf459soo4rc7p8kvrnuhrv3mji6zskomotkddn42o1nqha092m80gm0h9nxgzzifkawz7l3qcp6e9x49n4m0kn0nx4r88fx6xx30i36h7lg58x9snyqxhihjm',
                parameterValue: 'sl8twzjebktzbtqk5tlfhyb25el7e0vz3lp2oagabmbt3s465u3t3jasuuyfrdx9betzc12j0hzkx3l0jtbfxww67a1ju8ft7z323zzcsaundkw1a34uaj1ekt3ribrstmp1delxyj0y8hqxb0hehg6yx04fygolk0o30ceouy8ej7ium5y0fzthdimoe86ls1t0fscpcme48drcdbp6v1lfn7kfi8ki7ngnd8x5n075iolygrzcx5xzhyp4cd0cxlaw81t0uprt7jxpgr8ujvgde5n4cm3ovx3un2mxc72m4ejmc9vip3d4p6xw72t194kis9kim9k2a59xphg4aqkadd0ui0znhebeadoosb0wd3p053j7nrhinn6auc17av4a86zhr2z8htiim6uk4fb8w96u9055lntxq4o62en9jx8r80qav2ewot0axbcvhp5m02pou0pnxjiisaz29vrsq73lcvzbazhull27kstzpfcmzm0o2b15yebdpc9gn2qo809hnojn5ui2wp6rqchrrsk0yvqcj616y1etpy3etso5zrdaeqftzfv41hd3pyyme6u4g97if0h465ot8vkhtkgpycr6tccpkj424u1dytofywekrisayat2y0zri9ikl3u8w7v28b4sy58b2z5g43623rdb0oh7g477znxatg5cjx352hryoxg1vrxbg3fyu76ukjr96arkms8s0ba9q26wejzmdoycbsg81skzf0p4dfbwwj2rhi2j1mdhbop9emapen1o38y4hbmw52d4bxyizqkd9sy1xrdwzxw40i7h38qgiqseftasy9a1vmx0lhuflklcyui3nalr526fabdua1mpn5d8ibzfa20a57627jbvwbks6w6085hhkoskftlbwntopc9ig10pe7u7a07alzfqm8vadv2cz28ol0imh1d7lptumo00ksxurjo8p5idn7bdhdelwuv8ju848ntivj97tn87fau7h08vu6f3gyz6tx8fa5m7j4vv',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'ht8g3zmj8hheaby1llxbqolbkqsn1ll5ie7bh116gqdf5vxmlm',
                version: 'xyrv6riely41oltd7cct',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: '12pb5z5jmmxufbjwqguy',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'g39svay2dhlvnvo3xul12fxlurok5nzibl1qtlg5wadkeomw5qciv6caq130dn4ttwi6vqw1v4n6kju8pxe1yw87m0wqyjxayh5hedntnk5wg6ys0s9z8vzeoib9duq6pwnihtqfkaihlgqch2pst7d0b0dcunwo',
                channelComponent: 'e3ocsqawp3pgsq6rkht7hiugwh70m8khch8eed1q75pq5aq3ut7u5nhhcl7hvgt2he8xvd4nyjlfh9oh5nocz8024c99zculkwfsbgnfxu6fbsg1037r9kbxtjyulz6pox7zwydlo76oi3ahq7r0jvncf3upq1lx',
                channelName: '6ebpa1th59cxdnrvrx8a495n6o65edin74p61w772uoy7sxng553wqlioq0du7ywd72774awynwuhfsq3ooint9yi8ruszi4q07gttxya70hq7rr155purc3emyfrwwpp8qqx4cnodvadh330yb0qtpp8mzw1vkj',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'z44uy7yrfnuy2772u7v8nmgq5jtbdirx2zij2sxbecjzs3re9ypzj7ui54idk3q8n7cea6e3qnc6t0mxkg6etiheoab9ermissxi6nrkisleh0b0gvjiw9f9aqg1byikm9vhde1bbbib399uq9iob2ugeatvcco9d',
                flowComponent: 'dz63zlcpzys84m723yxdwh0hebh2rhbmnr54y56er9qib1muatm78lva712nrajo60jvfob10ukyokjwqqonaw7dxo0go1j5ilva5gsd1k41gyt6zeaqovxjtald7nemyj0i4ib61z0ll4ouaipht5yyr7r2bwz8',
                flowInterfaceName: 'c4mu9jhohnheoad7jdlcqdsxd8ds62wuu8dct6oi4bs3hbvu02jojtr0vf7nfqn3c4rm76h3134h4bo1nfl4638n1c6r55d5bd7v68cb74sdn9f8dlw1wrj847ndi7onf930rwmyf48cw4s6eucubxolftqwa2v7',
                flowInterfaceNamespace: 'x9zdxziga92mgxwm2m02hbakpkkodm6vvvexjpdxqnhujvy2r41uiy1khdt96o3p5lr3el564rfalh9gjrtokascj42nxsjluh69pq5o2qk3r5q250r3asnxua04wcieuga2u2lp8xi7menwjgdrcc289zeb23x2',
                parameterGroup: 'ijcleor85hw43l3usj2lrxt1jmaedsw8j6zztd1rew6fb3o57o6tsj5yef93uqj7gd16pvwq7oprc477tkpwrw3ubvit256kcjc85kuuxefyeuen96q02xj14po1p0df2ghvofrno4rik5w3b7k3ufgei4b6b49ykk8nafa7bj6j0kfms3oguv2dco45029bckhlckqfvsqizcmrdzctb3jhjyr91uy66dl7jk3doq5yj9nfp7m0mgdl79vpb3h',
                name: 'iuku51karold87twss0bm84ehr69xzachlwqaltzrmtztq9f64pi9z9midcnrvpvlqqhl19gwhlbqikwr5u3s8trxskmwa2ft3pi07ao9v99mi564t6oudkeyhyg2tgu672fjqmdrdvlyxrnl3qjjxzx4odmfz78iw2ijjasmei73ampacnrpmyr6t5m7x72uojtgslyf6u5g7yhcs6757t05sh7ilmtc5sue0hhv1vi2huijhwskqayy9662bvsln76i8f1dcb8z2xx7fakp288n1e7c03pu2m1xhcicr5ropdujwufuoeii0kkx27g',
                parameterName: 'jthzt7xov5fg1kez2il68l57v8t3q6bownkubzhceam3ji332w6kiyxj2aj3dp7ca38tv1bfqn6uug66t1mx5s1hty3e3fg1afgrd1k4pidp7qwxkwc4zq7sjd3igzigghciai7ga87xx95t975hbgor2psl8lpdz0eluzn37wti5drb4ybn7lke0ued9emyuzqaqlkt6xdbib9abqn9pjrvfd49fc1n7oytcw5vw5r6hfs59voef7418kndl5syjekc2opitd82fitckjay71ksro6rmfi3vn89sq2cb953x9528jdireg1hyg36b95',
                parameterValue: 'raln6f9zsytqxndklf9swlqmuwfudrncl4m2ngy1p7v00pulc5orn1addhif3ocwong2qk3qtn0fqn72iikzpoonxpe4q2p4x2nhxnk4b32xgdm1wna013xrv12d5y8g1ds3ndj8hl27cbcthut3skxc7j92xn581bxixuw8lz2q0z6dislzflujr6jzi6hd9hbzypigw7qqlbcqcxs9obngy8ehldoxsg1cu80uklc10eys89uvqamluzd3d4fuetwbvzmyolma1s7i5wpkcftlgxlv3j17hkf7mksshpvokfsgya7xb1u2k0ekol8ownmq1u3nyxpfhldszzf078sjydi81v2lcsoac9do36e5ornmcasf3mh350yfedsq0zlffi91x8ya5yugf7hfxwmplykalqtxpmf9p21bdp19ih6at5skfy7ibbusgp9lmp8giw908nu5vhac3cbousp8whuvzi2w6lo1q0l68wwzjc6bmdllgu56f68gt61kx3lwfh8x8tzuv4kofpyv91e7j29nwdsvvs9uz9ger8mncz5bgcu1xdbxa17om4knu4yhbrrt4yyeiswl8eh0yc5nxewx4b52y4gu8rrgs6s4cn2tb84otz7wl6f056uqdiq29jbjilxz93wbphz1o2mboy7r5sbmptti3vnuscu4rk2yrl5ul1juy6tdrb888a58wpqs5oxeoxoi8juj23ck82xnvrsjpoyteis8p83gz3e3f6xmquay48ammk4pdqaoq0bniaxy9k2y1iebiwkrm41eaebb35yxkhvph22gf9ul2m4pb0wkquktf0c94wjgc8ayl6lmno2r19l7ozugx0m6yeazljn6kfeu9qhg5yoeotwuyjxxyvplijqed2c3scr7sy4zj2r6t2dzg1ozksve3hthakazkm2hh05n8a93l0aiphznqglzxj1dsu2r16yw1g4xyjnzicvsvsuc0n04i33wjmsmatsqbox6dtaomii5vpszlu0o1g5k',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'rt9mvkncovx3ec1i2wbqqiu8crj9zttthh8p7pa27nk01hamfx',
                version: '5i7usksurbd949c1jf70',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'laqdv2vq05rhlrgzfi5y',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: '2z1rps2sypazarmj8k930u0xl5jrc380nrm5gxeumi2wgvgnjut43q9dyx98fdnmrzno5nlqw9arkfuyqfanjrzi77iqt8jcj7fzfa9m9ap4eum3fj9l8uxyy0xhq2d1c4fbxt4sy38mbksnczghm346wid0igyw',
                channelComponent: 'n6tujb567k51f7vtx0wel5q2gqvga353ji4l7zdplq648dfl1bpbxumdsn9hfxkyct9m0rdaa2wlufot9nmptmau009xi28bdtc7ld208l1yqdrpbxjueu7y36jczphglzrs0k9ceww5q5kmn4beazfn86ro947g',
                channelName: '77u861v3xatfijhj6yn057msg2phwydfiytr1jj8yikgwb4g35r732dfs8j8ykk2zdrjjh6dobmxdi9uu2hwl82k4xk30vx2jks36pm2wdk30dxlyo6kmiyn1f5o9vtuaox3pjzsgdrorpqvgm1uc1smroxkshfa',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'oi9081o7vqqd56w4liyor169bu8rhz8qglv0tpmhovazceia0k1wbcjaaq1rb5ngkrrg1aapjehh9dd4v92ajq33xwkv97agh2218qjvtqbfuws89sc6cl9gdvf8jpbfr6w2mbb0sf2oauf1cr6289p4fm1ssb5r',
                flowComponent: 'd1hyp0qqw1a3xysox1b2ew0ufc7kds29nxrhvm0jes5s05uxv5b1cnotir460yr5p9wq3ex4ezsklnqdj0xcwe791n882q3ew254nwp8qke3f46w0qholipveyk2du8bu4lyztxm5gi4if24fyl5w6w4cb9p8w29y',
                flowInterfaceName: 'kep2sku0tem13nogn61bw4jgvhqjgf8swyxslpcpuvntprwq3w6girc8ykl9r7nb5ta2tv37419l4ot1bkzu72cgb3w4ylftdejugzjxwzvc42rkkim74lgrd4lfbh6r5yz6aex3qd32h2i5z7pbwbieupnehlgk',
                flowInterfaceNamespace: 'sxf70xx4tp8swhuq0a0sf5cepgf78ndpuynai5cu26ockfv2omyvihtv3qjwxfodu0zmud9wuef10e0akzldktalpy3swjjf3oaup4tqb4t0z4zvf9ors47oh94sqb8kwa8j4rp407j00wcc528qgwtvlq443g9p',
                parameterGroup: 'wjfvv7vwrq63bodebtk8zx9fdzml5rxcy46ne3vyquzx68c7ybdngvvptxslz2b02xbq0zwwtwxomywd8g5n7xnnodq01745kvd5189eg97wu5tdbetw55l2cxg7p7pqy6feppll9602foj6760jbc9krafrlg6bv19ulx47826yx4s5bpmbr7qyzwdejmjpz1ixvk68s5co8ctxdkl9qvjp1x50pa1b382dvrgaegl03jynsarha4nd74kp1e4',
                name: '7r2ia1sml1z4zndlxjxqocmtly3bddojit0w7eo69vwrfc4mpr00y5mkws35knetiy7m9ebytp7q6ofis22vbdantdmddf18ghuwzll8xwc4kyzpjd31zu1akis8gex836fdumu5yk02zr79a2eyixzrclap5twsffkey7q2csg1370uvnimxbe8212jx6vmla5mlc52gzinktd5zwp7o927hjc3vh21md6gin2xc8po2i1lwx4u7tyub0q51ai3ub9q7kpr4ufcedxa6alempgfw0gb9wvid8ogenqbtxx4peptlqiau6bdw0n9z7al',
                parameterName: 'fx5dhn72j7slrb9eyu7tl7axd4t263fa8uwnqn8xajm15h9ptwxglirew3qmm2ltnjapd9bxfxorqby4alim2pklb5ieydnynjidtcdjm4ya1z635j3jtbnjw9oyx6mcrfa70he72fmf53i7g17bj5mw444j40jsbh73sut0239vx7pj2r0watlf9y81fmavq0rov7qqndauuy87gxx97st2ktxz0zlkl2wzppdq39aol6b5slu38voy8svcaqy05laf32i4qd7wfxpcwkkehxw3k00ap851xw46ruil2mesbmulmmrudk2wrqrmst2h',
                parameterValue: '8ma7d5ki9my7qljoz5umd7zqwhcpotavywwz8kk6glqykbkuaajysjprsqam571322mkp26434p3ff1aty4x9guurxsqeaorib2zidh9l4rmg8aaybnit8p2ch31tpt4lbx12m14zszkn4wmvglth499550iz2nbbf0mc2mcdwr3kvakd099xw2wrnb4z5pm465i5d48vl4gi12g82y6enh45f7g88j8tuzpl0kqq5ls3co3blflnade7d1k2708d7bgu683ar8fvn1jxukrt2fq453919104mujdx2944uwmw0r1usc5oh9w211o3tbvwiaupdqt53vxoqhbpcpzi3apv3blhrxsvr5i2921e9xquencz87cs89wbb3qjugkvf6wa4xk4czmroos3qk9o4vkt7mp1xg0t2kzc7jwbwf4fu28q0jte0cpdsyvmry2p9r0csbu79ms5dhyp160qi02jslujtf8abyecy93avoh9585iq0upexftawodg76rrtdtnrut88pi5bn11b6mx5a29ywyqfbxt8lewtzc2zxl6r9tv21t9tfq59vg33m88jzn8gdg5f51e7936ob4or9rdhu9jorrzflyalu6ez521zzyeczosy1743oid40bq1e9awzn3jjqv2r2mnxmw8logbjickwjqdl9i1j80xroj3rjl5bpczg63899xavewjv9mxc4i4or7rfj0kao7q2y0zno1j2fmjzo89bl6ramkkpl2zrbbmesxjjesn5d3tq1pki8qbmxhhfzd29xm82tqv0wlqkmntziznr7g44m438ium18lns2tzvmjoscksju1ndhbul1cz2c5yfkgpv8h19bzb5wqdigeshc6e6fv9o2go1cxlfcs2f4w7hkxru6lae0t6cue6436a436zny8aluzuod9c0aza4s769fjpdaj5avvbluey0bmh85kq71vxx07dt9xtrtkdnkvl0chfq6e73bento8ldig9sonil7bjcvktpm69xvzj',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '4n5kv37jblx4p0xdy1sneqwciryap6z0xy3gll1xh61v4hbvp3',
                version: 'hi27l2v1ycxs3tsgt2aq',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'iih41e6oiup8ggxof8u7',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'aorwp73rff2ouye9isyp76clj004iz1kux1bp2oe6e5gp4rywc0wsh4xsiqclafn3zfgtbkvutp2q5p57crxifqldowsiwpfbl4of6lk4qy7kfiv7m7s803n763pufevf2hnxemauapsl4hpljpk8hd0sy3i6rss',
                channelComponent: 'uytywfms26dxou4aufw6c680s3qo90dteezheunv89gdd6x8xybt8di0utq20g7mklq7t5i9qmld2jeo4i1w99zn6jle6umkz1fnl722wd70y9728vrzg8kwabtyn8ed59mbt4qmi3c560ovj3btxxn3ce28ykzt',
                channelName: 'k61plpeod0rcvgt5exaycl3z3ap7y9a1wyvfq4df76ses39kh9n36limmnhneza3cup0lr824q6ghhqvgdlmqa5mlu7j1p5dp3k3hh4xfkqnbcki4qd7juy7olqzpr00iuf89r72zinrn71rg78v1r49ee4xaoav',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'dd2bw1isl674pxa5sb5l5hu8g80jdf5cwaafgv3gwyim5umrtvgotmix4zyc7ape47jc2281u0bn8ju2nr97tfad1f7fykgael8jly249hym7b03b00p5zur4wl6cvlcpn1c94cx36n0whna1csdx1q2n885pids',
                flowComponent: '130mvb4gejovo25aprn6d3sa0lqt06j446lbn55pfzc9oa460qlbgst70yth48pwhjpxydbatez6r81v5c3nfgue8wb2yglsmztsycfvmdl638ralleoc4i7lhv34kedga92dzegb84208t8sg01dfy9a3udp1v4',
                flowInterfaceName: 'ple1yfbx8ky42k2wquq6lz5c5lwa23mxx9a0ca7s2wl6gi0cqx33igdw449noc4hzzicl66smuc4g89cjt3f38uy960g1t6bpbue7ceqpv1tjg71jogs2om3xhp0v3mul9jri4vto2aua9s5rds92s80o5n5rcsgo',
                flowInterfaceNamespace: 'y8f50m93v5h635qscbh8kftxaaty6gx0cim1987xbc03n5rlf396ztky2wo0j0lenha75ge8bownvp1lw4v2k9xnavrcwrrpuk8ay1qe8tclh1rt4sgryy51uenrc4ycpq0cpf9wru1ryu28c4qd3ivzfl1whi4t',
                parameterGroup: 'k7qpv1wdpzrkmwm15lcaw2b2bxjz6rtbkztwgmed5le4kcso7zikx1239c0eb9042zpw8f3u2tj36u2lnmwvseqqo6xnev0cbfhdyto662hvkik01knj6ehukjk7pparetk1uac8qfslm67z0qmjv5b96zf7bxvxzpp5m1myd04es4snbpx5jlwwlw0i57dkiqdr9tr6gcwlozvod8i9xp9zb5aqvvg8nblaox77gxe1m05m286i3or503v8mdf',
                name: '7gu23s4wgbs6dhz0wjcx006n52pg5t1qztmciwa4id7tb9wcu5saqflymbu7elug0bos9el971s4vyejt5p92zwcrpfaog7huvzifwrx2rr228fcr8toghkn202ikikfk0i3n8zisxj8kbynq86urh45qsezkb1oxojl6aj4nubwb7idvd6zpwie0jeajkebdtc5iq1finq1a6h8e75lryx9m0spcy91lh5t9mv8i0e1owyqp2yfr3evn4q7q52ek19z7xnzqxf519cuszggl6gcujayhg7nbux4yvcz2k5cnsde00a9xdz8zwvxstji',
                parameterName: 'tit74f2mlm0v2a9vloemyvl7dgos3x0q1iwaa5t3uos17r02656w9hv6htk09g0hymnqkxlcfniicekcz094kt2lqm6098mlj9smqqbf2fgnjb2olfw9mgsw5c58k2zi7ytxovwaw5m15yi7k6sc9i7vd6t0wnkfckcu62mijiaqbclv9tx58rvvbl2yx2ove997oifc577tgbemtznhxdvo9atrah6lw0dv9ngpezmz1o7ft5qtolve128vkxjy0kdill5p2fq4t3ohjjnr6khki8ap23qosa6jztt80xjkkr2jjf6ytgz3qpio9be0',
                parameterValue: 'ql7op2hmcsnkis11x5vk71v19tojmus0xaasre3hgqcjk0ufxpvvcl0ydry6va85l63x8dacgd6cn4ugsv22syqgxd6ks756w38nrwe6srwjptish6rwv41uyt10vyp98ddo3o1l7xdgioz5oj9tt8h5qz94tq34rfrpvn1lxku0mhe1aaw9lcj81xwofkrjxcuta910d2thy31frc3dzboj8qiy8xskowdrszqd0xqv2mrpkagsgjsti805tma60t191k70dxtcopv9q8wy6x3je27f0k8azwkbp0jldgeuh0sqgfroan5sjvttw0axumjfqqpw2h6setox4x19vavko30uz3n3vwngciesht94c7idb2t9565m70ftea9t8k1ezyiqphrwkxsaj16orvd0f0dl8qzjii8uwyliirubidgp91owlhn5uhkv3oiqj6ev54fj7oysj1f8ayybly1zcya04i1d9ef0rh8k34tz93i864h6sxxvb20ecmuddosjlx39yafusn5yi0a0hl0pn8lma6rwst697s1czcmvkgsvso1d8npa8ecni2b832nmz2hcr7q88m3n1wb4n5qfz3i3rcqgjw6swgw6ezhthco6a7bj2qa1ptaxrj6bcr8gtvl4vgqpuwuleliyzknzdlxbmxbwpaobxui462ohudybpw6khi2kjz22esjgr6jyjd695zma74t4q8698owbk5e6bl2ytmlx0l2ezh7yrlcy1vvk03y61eruiz09omiysqx12pqo1shdmmreg0wxbslb3yyfwr4eled0dl4wfyaz4bz4s9diqpry73hlpvsfgr9gyprjfeiy23pq0hop8q74c42mj1d8prdp78y3p4b1pblles7kwrpg9kmw3tupu8v83z2zc9zcnhg4cyo75zum0k1y8wapj2bjgxbomdk8bwtp62f6bfgzs8hzft0mty6hfiqjuzdtyngpfcjvwe8duc19av6vlhczorrbzd0abht5gth2gdbcho5j',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'amaffu794k14e8boghku7vgdw7j0ct8fttvyphjabntgqdfzeh',
                version: 'd04miishcatt99k1obua',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'uipak9i3tfrxhpwd0h14',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'hyh81nvwr8mm62w2j2i0i5llkb09u788mhmqedl3iskfj6a7vjz067hc1u8yt7maki43tm2izdtf5bn5wf130yww444ee5oj44lircb276oqgz70dg3m9i1nlsqs2fok1r1noe6w4h4nvn13xzah0g9dzzp5hhbg',
                channelComponent: 'eeiqvd9swnibnqn2i1xhvwheop9fw0czump14jo9nwwhjj2rsnynhosayw0g5bdpxnbhzrrss0e52qnsi7vvabry2h7ihweorvqyzhqjcp9y0079t8ud0ybcw4tajenq69snn2o1cb5e3idhv3apr1vcb0v26eng',
                channelName: 'ilnbx8fxad4eu3lgvbit7031gm62e3pmtmj2tkmy0h51bllpm6c9ocponzm39ctjvzythmkdipji9kq95kbn5r13ev1c7n7i4l881g3o2g81u4kmauhnuj2d6x6hcey2o89gj9rn61j45rm5af8ew26cmukvq9bq',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '6k8qj8ytgn4xr1ha04zujk802tzjxnxxhh5mmq4fh482icsd1lbj5uulaapwxao47mnto5nspbb37jmne3kgl0xevhbicnz4ejdbgwzo2a3b48vkurasbwh3yvnt2od7lz6i4gogreytely3tjf24iscxt394gtn',
                flowComponent: 'ucynimm7iqma3ezqoun3a6my127v3ssvlrowgyzxlebktdmslwoug654138u5zwt12eb10pzuxdpl521lcn7s5hch51adgdm0us6l7mrtu3chns61ag41v90rewwebfmiumg6hhc2lxtp34qjs20tn92a69yf2am',
                flowInterfaceName: '4da0txoj0suo28htauy1e13iec2csps7d25w2vaxajn7szzhsmg0f523za4o5pbgzosoivwjmcqayl3tvqro3z4wc0tcd2u3krhe51cnnel57awicysdj4xh4ctmhsrqrkd3grzbgysywgykpr6o9p10w7u6xggl',
                flowInterfaceNamespace: '0vts5lmgmvq4iuc7ce6qt4788gveik1sxjcfkb6jld732cnovys2y4hl52t73kl7lqbxint9rz5c1dtj186lxynz0lchplkzrlyqkbn0ekv4aka1trbo62h6p67tj09cq1pbq86i8d6n9h6eqm61fafg99858n0vx',
                parameterGroup: 'z0elajk9qav7n73du44dznp3ojnoxrfeh6cu09ihwvi3a8d22po9hb810f9gf44td8kf73mjp58wu1aaud48su3l6ofr96hkp7l3vs36lojut1d9rex2xqtqd10uwxgcsno7shc10d2bsr9y5c5mmt6zh9j7r1j8jkt8zddhlgw50f741z8u1gaqndphm0oyz9ayahqjwq63d3z3l3psla0vkmhrkfr59yv4f6jwaww1pbcbt39lrscdovlh2fd',
                name: '9da9jixc29xdl3i3kv966kkzd7fltj6wi0m31j1gq6at3m7g1gkos3i06yqe4pnqxq7zmuh0oek98q1j780jz2auj6j9ei1klzi2yxahp8pgce1om8lrutybxm9g4yvlnps4ntq5br8h63jsmod5892hwsbko9qefy1a1404y6w5tw3cgaujum424cn6soh3w4pecdnc0v3rpfdoppqm46ar421c3arzvm5zcd899gazhjqsbq5rfjks7k5kl1l5w9c5w3290qhd1j6kna9sw6llyrgqvdz3vhjpd226xitfibnv4lhg2bjkmxr0jm2f',
                parameterName: '9frf2xy2t17l6n23uhj1z2hmmggilvmkcyd6ds7nb0ptttynv1lup0bx0hzne481r1n1x9ebrp9r64kbgfle8qu5rnwzufemoth869y4byw410pkmgmn59unejbty4gadagpem2lqsh2u6nf90uwgefdae0hq97qo7ikls76cofoh2fe963r0qass8hh96ygbzebwxrpjjvvo1jsax7teaxe6ekgp4zrp1qirgkqpn91p50ccawyqb0ny72udtapomvf6o8gy4reu83m1twdparfrhw8rc5t0q04scz7xqm0dctbzw2uqgxt4kqsxrel',
                parameterValue: 'eksskjumrqlu4r1ftvlb169pvc8xmsmkacfiaq4xwrjefnbeuh8lowdc54k19aei5glzosqyct3iqn6ycwoivl0gj7kdk2w9z5cqppgqcm2az225302c8pbolnv9mbgrrmc308j991lelv8cwvmxxxvu5p6lqw0knjb6yeyxod1oeeos9vi8r7paq405myi9uojon6ppnerqsu14m1ktndlaajen7mnbwodzgg3rhsjqnnrw32ekzgnqxl9ijur3xaef8uq68kytar9v3lbz2nqfkobso2my5wysstj8szmxjjmaeufvcn29p8pbsymvgnaii0n27a8i51mah2l37lop7y8yixob3tc73fl7h2xsg20xkaqs2ue2f8ak2t4df88cufdiap9yrmkv5w8tjmqevn0jg1kodb67rcdb2ohqxdzsiy7iz66fmb47n2mbmktfcu6z0o4li7iutgimvi5gyi7goum44auv1dwlky0ivupjdr0iv65uw4tm5yat8ecmlypbozfyj7m8oeysqh4fp7zetdem17sb2vayz5iotsqvfgih3q9fdlyiz848iyec7rn8utb5dl8gjtr2opfqpq251rcs8wtfq5k0jotii3c447rz40ewlq7mmrb2gex5mgf2x4t46e4h2mooss918d4w0a4zb27xxktmr9uv2h1cjlqtjhgxi0ccbvvy7z6ahgadn1dv2fmh5lwyjjxx0bdvjrscrnh9pbqldq6q7gt9dneeqa44yrebit23n79iryu8q478o4obtrv4js3vio58z1hfh09pryjl8o48fhpusev8iy3l0r9ao38ftlxdn4783gqr3rk1hl0xnoo6bchn39w11xgil5mcl3xmeauvrs51cspevzgv1kfjn8d7wdlpamijrpmh0aypq9zi19vwpbnpm9y7qhh9flpq7czm8jgwt0lqrkgyas3idro6knc41nh0pp9wllhysk65rlopf4q5r6430fvne6psj2exmapmp90t57wnaf1z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'vwi2p6obpdvopfh4o6sz6zqeqmzpoz25itk348ehbb4nqqo6aa',
                version: '4n9pp6hgx7wwbld3arve',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 't6s6d0otu6uefik1erb8',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'fm8ui6gj032oo3qxa4r16nrw21pk5yy85k2debokjeo1p1dgflk4xs2008dx5qbrkyufuxeo2d1mk2r20bqsrwrhlwai34igz02pj07djply5480u9evavnz063f0sgcyr99tbh6xzx5dw28ykk22l8w9qxgeeb6',
                channelComponent: 'qemjhuisdyo5mufqd2zvi6bxbahlu34iczb6fiee1dfn62psytqx1b6donsmk9yt9oh79mq1eokkkbi7v5271g34sl3m97ky7fohv0zrwmtblbxmy7wf7safclv6z5e9qkxcip8qjev96vx83v32lhpe5nbfz4o7',
                channelName: 'cxgpo3xwruri8r5vm27zhn0r890hfqkepjm3uiif2joqmzr430anys7c7twrx3uytf93aud463y8nsussu1rwq6w8ce5bra96n382m84ze81b553t499r837xhv2mbfd2xmww6qqzsbzdcwlgsqqxp0pth7pqq6k',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'u2tlqaexev5oj4gd3b810yvqtmrxvfh01yakgmzp836qac1ogmsctnzxkp2lumiq4yzqlin1k2gzpgc7bu7wshqacc12tggd49yl2o1sza8fnlwtobxt23s5iubqhh1drb2svftfj6bjajdehsbf4plzlthvjtl9',
                flowComponent: 'j7gscna5u7wz3v7gwftilh4lvvjj7ghilcwr2re2n43vqzmpy42qgwce4h5n6lui5gsu5tkhmzxydiaiwkhwcdwkqq4wh4ypyjg8hbfdu9fc8a3tnq7acx8bvbwkufy95h6smkadnduo62om47e9h5n2bq19vvym',
                flowInterfaceName: 'pesotshzdyg1tn3v73um6sbbm18rsb6fldhbbh2mh50j7ypts46urw8b7i21ug0brcfc6xz22a976dcy955jlagmcvfbi0pt0sh5uubmhyugpjqgx68lgv3jo03tokrit6k9dknuk0i7z0twwffzq300zyfk9qsu',
                flowInterfaceNamespace: 'l96kznv44r8c5ggd9t7zz6mqinkaj3kx4i2f5afcmc5b4ha03ul7eph6oi4e2lw6n11husmeebzqzywjnjh3hvkd9e5ha0b31d671zpto854z9wxtdiui5u39joeu6j68p8j86zf5lmbh6aygmo2m6x9a5zvg0tr',
                parameterGroup: '5h0hydz8ja76wav1neq16yprjld0hqj6tl2w6h28vhcg3c3x3cr7k4ilx34ey751cmi3g80oem2ztxc4hmlx62spp2aqz4wy0fxzrxvxz7kifa1ucydqwvn2lsx6w0qoy59yslolftja8yhrjf94483zia31k3l5w5dowrvdkjm0gfwc9yh8e9d9oe6gky97wodhhoz3hnbr8d4pg6m29ugb1vuf82beun9kyt8wnx5rejy1kjf2kll5bxhne6p5',
                name: 'a8fccy4gsv7f2n387ebau9hlu66pdiqz9yz7mgksa9dt1b4wdfn37kfvv4yij2270duj5x949fkbj3i5nfdb0lcmz005uigksxo5puwfypct8yto0f35ykkn8wcgc189fsfijaj0c34h38crlee064wmkjmb1l6uwsdyi4vs1izkcrd1wxsbti97gkowkysp88o3zubpwzrzxtgpxqzg94gzxzp5mpxfsv61le357l3aa2ey5xgfegyi7p4l3tjrtg5gbfi31z55dawii1rhbqpdyu5nv9irfumyzzgjthp0olxikzxodgzed3rinsns',
                parameterName: 'bsyvwetewco9hubcjemqdu2ybfmksbgte44riwiuz2fbjh60anpke6ehgohuqszym66df95gsks7ypwitfx4sn6l4i6qdw3b9onlq7uspq78vhhfch09z8u04lonq25vh0gv3s86gsud17kqoda59wl9susrac2q00p52w203u6t84us7zdmwz0ln088adiewawkc9dci2ndzmnhld60fmrvl01mx5b02akdvmoojqkq41gtn8uicchqd0apozyxa5di5spa4x1e3lvu9cc2zeqq86jlvf6wejkr35hyzdj31e1r7bu0q6q2587tv4xd',
                parameterValue: 'waveag5jppvtqkyzulzzk9qjlzsbgswaq5l0j2kcc21qz9wy9ltwf8n1a1g55w3laq2qiqfi9acj1uy8dkphutviemeu32x3w8mp81h2kyai4jxqyd1bikt9u62b5diwkjknl7bpmooacpnry4ymylpbeq3mewmyutr4v4qccqxxdg2iglsv7jphl2e99ii3aeklzds9knx9ahzwwqfj30pvo8t8a1ntmqlrbnd5pzp3cgtdq7x4b8xzd3qmfr22by1lcgfgyocc8xc223j9dm82989vkqqw9sytd05ndgotuvh7rou4kjyv5wsl3b5nlmshhydsvggymiihk9jubfa6p9bs7mgkco38nyyicqpiwgil7eknh1vvt0427enjbci5dnep06sd3z2ry1to3fo21ulgrocn0cz6poev5jpmeuk3s2vv5jhxg3fxe27rfhiskoboxlazjihso0kuzvin4ferpiozohbi7zex0vq1007p6civgqvafb5lgmrwv4k4m1et888gqlh18lw622wyel8hp2ubxe8k6mmfqsf4nwqez5nwmomzh9xi6cmdksqw1fmi8h6uhjrsfqgy5q8c3j9v37fh3r7lehat2r01pulhsp8s3rlrk4770cimakwe0ogz6v50mjb0m4enyvetl41hw4qdc8tmg1zf6enuzg2vtmku3rzpt4wdjv1r6g88l0or34vgonmdiuzjt03t6d81yboy2q5chwv7a8xkuxs4u111rjmp0uksp1alsze0s4l72f5rsqw42x8v5y2k5e53x9d3xkdf5wj9spvs3idy7p7wgprh61u23fbwkmljbujujjhy6varm0ip2k4nyyjpldoqj7krzt2m0fbjy273tnnuivnaol85rb7we9czrq9lrzlkwkplps7fo44dw21s8ghljrtvped5rhya0n5xe4f0qd96wp4pl4a246kfv3dd06n4ero6j0sz4z6dyl5qgnndcglnkars61ivid0vknjd2isqgzf0v028',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'q282vndbj8xxc9pj3r0gzjda5d0j80adcxzwo3j8j1e0e8bwpt',
                version: 'u15ueubwq3ocyrn1ik72',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'e3hl4xnqhic36c3mur1i',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'glazu05lqet68fi7ttszsxfdk791jgapd3lnaa707z26cim7xddwhx92ob1h3t0skx99wyc5j8uras0e1m7fbsscw4ep98savvlet623jv7d0vkzbdlvy2enqgvytvi654gfssmxtfqmhgw8chtrqepsdzh9jq8h',
                channelComponent: '6xdl7lkroc2e58mmkofovsxm8o2987xg52hlrd08rg1ml7oud3iy62pe5d2bjcbr35gjsnr9njt5k2qbi9hyfwvhpc28jy1h41q8dpsvmtxma83o65wh1hyyc9c3jo6enj6hpocipdsx4b166uv3o1fmxiow8h3f',
                channelName: '1wpfxuu840tic8to33r5g77ty7bqy58bb0snebsser27w2srj3p62cjs3ztc1hv9mk60v0rkppukr9d3a5wjvzmo93zt21qjjy76l4btb9ao708g1pxc3w3492ls6hzw3bev7lxtkq34cohoq3wiuiks4gwid253',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'y83qs2es72fzdnhvusi7awkx3okk64wsawqw2znudm7am08s8fwwi7l9553xwgltisrebuqecnzwuubldt5awe07rcvs7odlsbvgufpghko71zocapikgtf9h4zp5p0w58jplgs71d599hd5t90ld1unq4bip0oz',
                flowComponent: '55iyewjpuv93uf0gx6gabuekhh0g32d4he9xcb7o166wq2uteu5bo5ozapkw2tdhxkzltjo358nu3hosl46mmhn0un67nmab6ftn70nlgaqaggcpdd3rn6ygubbj21frk9ol1i781wapvsunc4ib0r79qlyvzpax',
                flowInterfaceName: 'nuqyzgd20ccfesaa2rk05kyq6mr4pl2t8nntsjg88gi2q6ibas7ljlc9wl0w3rr4zcsn7buae7bj2xtqktjqyks6bhdyvl06ujf2qhfc2421vm0i5fiob4v6de8p902ww1ojyf5mcb9uxvoyntz2cyhe2w01y5qy',
                flowInterfaceNamespace: 'qzpqctbinyfa9qtw8d2kvmi6ek5mdpxclxqb3ngroj06djd12fq43yj06waamp3gmictoqnzeuu0wvjggxacv63qkk0rmklv4nzw46s9htc9dugoqo7l5xg5f11n9ri7py92py57f495ny8vxm95fgg795ys1qce',
                parameterGroup: '84fxddpvlbzdvymcokcn325kiwn47ks32bdgpfp7hxq9cavrdgylv1k9qeijtcjmipkvrovdpw8hrupo3no7mh6890sddt06h0h0acbdmxbt1fis0b0kpc9m0170egiohxc2vla3zpc8us5olr1d61hmkpjuzkrxhuqajqgqq7bycugix6ejkz52gm3na0n62cyq3994w36ms75e19f4ntu0nvuc1bckabh4tk3fvkjfysc0rbhz8jycgtc6rx3',
                name: 'oszpyajcg61qllnncibo1c28ydvavueq6vy0eb888hr6qboody4dxw5dta827zkrygbkaqgcx76ttfnx8kkhk54t5r38py5qpznhxb32ex5c3g132xw7c5cvwwz61vbjixdr17v7xcaurk5zx5gnkifkggraotuujxedrefsfhjetgnx1j8nzsazm9rl9x0x8t60sqpqb94mjxhs168lxec2tqmqjjd11ihaislr0v93x5jls8zr8m6imma7m3glifur3gosiqq241v3pec4wg464uezsrywhs1u2cjofdh2m1yev0dy1ket4xmvt4jbu',
                parameterName: '14b1bugfpkzeg3kdd64japu8xow3ddor7um7ymn8it9om4g7phpx0mvja8k34mo6ho23o7bln93v706h492px3d1fcsxj6uq5n23d18oxsmauf70f9eymcy8k5y3vi4u52bh22an9mb5ejvav5gy8vljsi98amgr1rrsrdh1pv0bjaf9o1vaval8k8t9u4vgn6rnvux0jzn01ww8xt9i4whf8oforaut8cja0x77lxn09q1gj5e9usxjks1ndn5vg4y16mydw4owvziwwwbs1vj59mnfjb3rpcoc73blcpunosb6vzx1t52sso5xfngq',
                parameterValue: '7emxsvhbcpfdqa3g85lzbuil0lf7iy4uazdo0ulj43jrm2mewq9rz1f8cx7ob602oj84hr7hcclwly57a8hvmelefq097ryzz18atjqfqi1jkxy45nhbzbrqz6ayylo4dzy4h33mhrc3jlrba00kuknnqwivse99jhxpun5t53d2hj3bf752kvcpzzutssqb3qwtek5008iofxg15xror2kkbw9ybxw1p3lqm95xot9cxqs913b4q6zyujkhbk25p5db7nbj0iwixdq42tyvvkqw35r6n45kee6x89lw5sr4ex3ir9alqridljqmjxynmoi1qgi6bguezj8j9lemmix5nwyz2s9vie2muobg8f2zob88o1r44t8vwjcx99k8lnkrzu3j6iliz4i8025qpri5gs3afjck6kxu9g5liumcrrgvn52lx1b5cer0lhwzmknruherew6ph5fwp2v81ptxb9kdqf9hl6r78be7gmk9z5r140t1zrd43mtlee4uciojkcd276og8jon9qfbtpozblqoo1rblwuerhw6ccdl8vhg0hrtjgp95kktg3nwyk7ltae9uz75t8g4z12dnchg1e7b81s62efqxevfq6k4oh1bsk8flv501wo6wj2t731t78he980q48m4tj5ialf6zydzxyd6y5gkl71jevt5v7veywkixeqt2cxpfm5quwcle0f0vw1eg958uayei3j7bh1oqbv30izg8tjbkekumg8vgu65gcjuxwuw17z5owhinommd88mx04wuty9ppgetp49lfnm8v3awtxc8ijhdag7d96ouvlxzi3fo1gqlvioe8h5qmnu8oi70sr5lc1ue2v5lx22g48k4klteyl3u3rpkp6av0mq99rljuh6npb7qo4qesfqwrxcz6n8wrpts13nqqvs5ufooat1g0xy5jnl220th8y64rnlk5x36ckjxq8k2xl05i6v89dxwa90h6kvorxyjtzy0v6q72e5bkp553lxuayw10ztia83',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'yzwd0j89jahqjybp29camgctbnxzxk1dlnyemqxg57k6ehyfb0',
                version: 'lz32atsnsdz6ppl3kr3l',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'o1xzxg1tnbd18pg073vi',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'vl8vwm6and9bw7w6gp4h8r3b3rram98wvcdz4gh5rrbev2jsahuch0x5v65c97hoe1xwth0ccd80ljhw3j1bhfa00bwdyn0u1by1zajietzzm0iqahuaj41eqbeole4oebevazqi6g37nb303bzly43fovzg35sh',
                channelComponent: 'auz0sv5o7msy04m13lncudkzlbv5abosqp2ggk4bbdoro72pahytwta7k4o4nqn1xu5y15bgxgk7h40hay8qyfgd1j9zacd0kx1t7fsf75w8wyrdqsc5n3jaeglef72oagdiuyytadcdn1g1g6et43gp3fip94g9',
                channelName: '9dtsiwf8lto6pmxyqep6vzpcju07u09mszd3vv52fy0qch5wasrfj734ltpuufjcjk0l1yuko66m69go239wt93rvyg3iol1cjt26hswfs01nbxnruzwvyal5jd1bn2h3r6xg1bsa6h3p1ksn8qa9e0jjav00cqq',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '18tmf3gnbcdj761vgwz4vgzbywzuaydvtz4hp2ceeo4hz27nf8pdlardq3spmworxfwr1yqp8ene31ezsrgvs07ck26fkx0fxao2p7rzc71041jfpziowg7cbf56foe0avrr75fza2m9cbgmm9zqhh4ryc6ti84n',
                flowComponent: 'lxvme77r4844zlhfh4fs4degajyxgph90srqvwusdfligjsp24qqhjij3s6wds9cryl5uepr25wplv8fbw2zv6bam4yjr5ew9558cdep4s1jrdli0ohhcuqkovkl7qwq7lmqdbp03zsqjznkurrauajszz0ub7uu',
                flowInterfaceName: 'xghmehdk9jdcppvvwtnjc7zqx8kv1tf216m3coqdmx2v2l66f9znigxcbialgrf4pic1bqd7hla1vs1y14j8ori7gvvevcurakpfjvw4vbiflkpkjws55snygv1kkl75morumlgpbwqlrp4syaavljwpq82oxjka',
                flowInterfaceNamespace: '1dhupodid2ix60hwxi0xnsp0r4to7udicu2nc9ke7kcbbspkxgbeu5lffgagakzwgytmi20sfhq2spybcs0zde8e26n1s2xoidyg7qfrsf6cbghsojx2ziu4cvhtzclxeorc5xqakyh2xo6scjjftivdvznt9xgn',
                parameterGroup: 'gyedevwvwcnm8yczpz6li1jj0u29j9q7p8k5tg7jwiat0blea3hz7jc6foitmkbngj11v0bxc952l46vwc1a72ogfg7kda9ghtasx3mhw6hfop7ljgawc8d07oc26tf44zpxpttzq4fssseqcs834bdb37cxa2vr43aozv9czqb8hbkngxt3iy4cdsmpc51n32maqvnctjmcik7muqyl0k85e19y53a8j2h9bqkra72qpmktslg1y90vi5ov5hi',
                name: 'pjc5yzo673et8bb84fvbaj624n7fsuj6xn9e9ng1t1q74uqv01slotay6y1mb7m5s1xrrxzk0c9ram1h5u4x9tmcdquc036031iwbk6n8bdcd8gsnc22j4ixgy4mb2tld779qof7uvs9fz3ihg1wza6yl9c17wq8nzabrc96ghm61rzxe1glv6g5qso6f05usxj8q4fj9lb1t0w5xitsep9wq09u7er1ar0tzofrub3r5zf0slbju2suph64284bqcg0k1gou5vejvm7fi5wgrwwlx4oqbmqlnlxgolz9t7ape1e80syjnfcgft1jf44',
                parameterName: 'jl2mdqwcuuafhj5zekd1cbyyyh0am9iucufwdemuy9gdfg0rfv8by22488vnfr2i7jnl08qblfzrts5meqs3awcdf5xytem67dulfb0x39xdeywg2dgw03bxzv1qwlxq63e2gofwz280n7z7uj4s0z2j45omvwkzggsfj0qo03cyc9gn9exbmzyfpcja96h0ofavnp3m43rpb6f3mqd23xvvu1htrxc2uw1e45dv4jy4v4451j6mc09p1qd0bvwlgpyj2cjfvneeyledcet7tupfoneu52mm56vzrmasl6up53kiw2y8yu86bqg6jays6',
                parameterValue: 'omytvy2cgk6lkg6evrs10gu1u08bgop3nehtf9vecyntxq5lddi80nqp4mxq9o62keb7hqxkt20rtvez41om00a9ba1icaogy5tmqtj0km04z370i7pi9wmfy54ax4y027luu5v5hjcjg5dioylwsn7ck24clckbi340z16m1i4n7n6pl3vjd9ndpnvw4aqkzxrm8jujiuf62xdpp9egycgujo4rysacttycum0l65sokxd5veyidkrq3se3j44nuv5i3015qvwjp2jrjidsrj3ghcvlnmuvmit4og84mgosh8nojekhdzt08ue7pkubcbdyyk0mbb1t07h3mory4asddtgcovknneu8htrjtwyk46phafr79oueuodazjifdl82vljifclxp4ub62tnz0et0iclw1463jd5hzpm6hucdmyoi93ce5mudhjyv5z68tlbm3qaq5mdnbpj3ayot1irk45m9rqiyba3ci8yl3bpn3m6vgih6jiiq83tr2y2ry2prbarmovixqbj9ybop9s6sk8qcr350nubjnzpck168yzusjejxrpgecty2ln96b5l85xmbfbcnmlpy8l8hai49tvc8sllwdzlvlgfe2sqjxewwh2gsl2al778kuwpd9k6toq43ku7x1hp4xiwulwr3gsng740eyihw3wt49wpeiudu9af51xymzj920qz6hkvb04qw6hgolila1py3uc27r61pf5busfa18vt8tgkmryrai81bq2574t04rgptakvzqdky9q7qyosks1fuo04znylr3rdwaw4bbsjaxsiro9mwf2fcgo25w0tw1xssn9kzljrmmo2zwg56rr1s8lu3voqbq19d4o4j4xsuyeg0vtd5n4pgtrh7h51daakn10xky4ote382q6myrvmhf37mpi2ovcla6gj47j0eivua98te09biabsavzvbzuidj97h6wkvmt6qx5lh0po563fuwowcz8t23wn67sbahg7za2yel8s36u9dot91rir',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: '4p7w4t8apgd32n1qg5toqrlb75puh05ephobzt5w6vufnj7s1v',
                version: 'eoptfs0o0psd9xfo63q5',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'l72tsbau3qrofthha9k2',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'pw0wh3z4gvz5amnpzgqhi9bk4h43b6fdmwfq7deoss9i5ndh284dp1ro9hz7ugbaxjl42zu14d03dhzeqblyztarcpv86cjpjqeh8l51xv20sug716sv9les4mx1i5246j5u849hpb13p1py6r52k2r9ibyk4c76',
                channelComponent: '04rn2nut805m787pr0fyw191uf6qguewm523m7qg22u9flmq3b0ujvzgnirrdhjg7p7hec0axuyldwheqq9hw05omz65jqo25wdn2v8vg1x80yvbik820tf7v8y0i7mgdlz0v6kdciled2b8tpagc4z74040b3lb',
                channelName: 'ef5cfcalbd20rv7q85a1nkhkiz6827nyepfx14yhrxqlvfjj4brrpb1rk2c9b5b9um09xtcxfhl7j54yf4xy3wz5cye29t5qn1btu0270ttrz90vjx3g5oamzfl20s8fcizu4a0u2dmiocsmshufn4g9h165s7wc',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: 'buujco53w7zd18tdljwoln22fjq7ersfvp7jby7jqr9az40kw3iavcgbo5x08z3cuqrs4451yacubr6cfjb173xvymzk59p2fg4xusxkhmomshrarjg7r9nnjut0htuftppg4fxghohv9xu1hfw62pdu8wq1hm6b',
                flowComponent: 'vxn5a8ef0zjvu0jhvli0v98bgew2on3rlcow0aosn5jjirhs6wdwe0fqsiu1clefj73uei368b3kctqt6wlsnioepzflh773ube9tf01x6z9pvx1mns1uvmmrzszx6k2kex5rxuk285zjybdpjq8a0nrdl38yikv',
                flowInterfaceName: 'taxgasflkqsxwrztcb6ktt3sc9bjslxrah3nbwfe4pgrka1fhmhe0cr12gpgqzn4v4yd8n7sh6kirtun7c3nl6g90ed1ctgd8v4b30lyrrmhjj03wfa0eebs5mfuqbaqjzkuhzsg7923u8lf57259pv1fgs8rg89',
                flowInterfaceNamespace: 'x8sdbuxlgr33kzz09ml4033t19vxk9mx2vpvq4ebsk0bx3f0q9sr7l0uliewihyefuomwlrdflt4bjq7ngmau4uub0k3qlebzljb8j02ypbrg0sawmyh5uhfmt1c0grc97qh3aui0yyjao9qf4skwaorof4r9vi3',
                parameterGroup: 'gei2tsov33a2dcrz5k061gtx7etbhk3dkij7dq1l8mco2lmmhzhrdvm7m7d7vquo94p6cpze2q9sujw3gcn5p7g85q4iofw6pgxkiih1q72opfsscr84he4td8evapps1okq4e6qh0q23zqqqk84en7qzyqtuo47c7lcetbn0wf90rpwltwfk1jafp9ipemn44fa0frpczl6mihb922lrxf1q8z62g3rix8wspit2wv0qxzyv5n6yr1345oawkg',
                name: '94ucw1l1ngc3n6a7tc0m3zzqdb12t3zv2u5gqes59ve62irvz9brupcu8tjm0wcupfqll0o2ihhm64hrgoiv2jp92qzg0enhfbprmxrkpiqcephxfaaibfwmj527k69or2rkbjq0mt5t2tzpudqhqspv41ld5d06s9p6f9w33euf53dd92amg5itve10ofruvlq6f2zqhrxgy1c70h30wk721jo2bka20vyitc3yz5enslkejnr1dvuawxx2905qem1o7o9m20jc1v0rc3whj5sqd40grohbpvymcbx6adbo7e2fwy2hmlttlk2n7quq',
                parameterName: 'jzxeewos8dtj4zkj4cyegn9qkzd17w0gidlb8ckwm0p23c0nzdbdv21p439xjrkfxdvivrgaqbonvibn1lqp2thc8igjfebh7pdykz4i9ur9r4wwkz270x39o73v2bzv9b50t2z4orpiy4jen37zd4465udkvtf85dw4vs5a9ko8kste1gwcghwg16o1g5vn1b7a8xm4u2cp594wz39b44x5egen1vvjbcnavwdb2lfdn97u45iwezq0wd6j3o90fkgm0t9ct3quq0p8i4emavgq1rt35xrpxbwwd5sdf9meveqxn7sd5wj4fxas8tua',
                parameterValue: 'lkvg3zo0l78z3mz6te5cq9thei7fsek9k4y8ncjhw3v36lqmdgeenpn9sdd5j7daf3h1vys3bhmhmlle6vbx63thn4k6ptr5mnvirhvredrq4h0vrxuounmox81s85ci4ozumtf0yewia0ojttqns99n7ngva2i3d01f1s68jtcgg29qa1qm2weod7577hpae53loww7762msyms4u130ltv9asaok6d6aqu4yjs85kr5f4tmj7ue4qqqc79svx3sh8upiuwge16cm11wwwyvphl3zy5i5mhnkguwm752fagbp8n1wl1vfujq8rhiqa6x4tybm5fvw9xd3e30t4s6dk7c7q4efyr1hjguahysb56dkhxqixqggx6qly80d3s5kuksg6dirfr83w9arubvsypj32mbyg0yp0ni7eef75q7yvypo61quhhx1095al0zs7sl4mr03htpkdxt2cn1z7g0s2mlx446vamg19fxwcpfw06z8e6barqw5a6fhn8krtxpq305tvyr28ou94dh0disd35hirr9p5jae1vui6k5lya2poe4ibhwge494lnnzgpt55r1ewbk11o6kyzm4tcobkfhnlr83vgdv6xuotf8fe7ll0p9v24xwtcr6d84bs4f39vi841at13jjfqjlvo6egk8s5iv0saoc4kdv015tyr6yoxqo6i5r8gv61sa91y25invpz7lu7fsnfcis78dslvfzteamixwuchhpcxapg4tdbupzjfuz56xmiuybsytveisltmjbond6a8y5fjyqfm0i1qaeslw8eu2ptphkbe7ef1t75dzz4wjxavectgsujvmgjqdpot2yxv0y3hwmroo9cx8hoeg6gwil8r4b3kaftb8spt8r46p7rkt25x5sx96dhogq69tpombvzfzytw2dwkc0gspohamt9ajd0riwpeaadygugso8vdrafyaa1alj8sxb2td75u2co04mee5xz59cknaxwxf12nxtd584q0vvhyumo3nesu6',
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
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'l7h61xob6kro78120e65xtzqvwo8yog27iilrsmgmxs40wxwan',
                version: 'tv9mve0dr62ldors0ddu',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'k2omk3o1bivk3wki8kpv',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'hwna2g71g1jwhrbr8kweyfeh4001twnkilwq4etmsu8eb1fdj6s8hjljp5ua3z9d9vtbrav6rmjvdtopqizipbwm8ukpqcblmr8qw7cr17y0foq2typ3vrjiymymuq6ogba76yj0pe9e9g3bdws59zlc2lagfq8i',
                channelComponent: '9aye6e9sj3tjxyuynl25w4pgv72w91z5f7rn07eblstvp03d07sphtvtzo5445z1m5nczily35v3pvlkc6fsyhoo5i40ctje4teaywwx8j7xr7c1fc4o1qco3e1u04b4p94y6z24zg0qz1tffiffvryb7k4ay2kq',
                channelName: 'ci34nl9yi3pded02gzhppm0kvjxwq2jxo6mi58y6tgu2biaa477709hpt9fy4wzemwbtjxnvavz01gfx5k792cx082gu5ga0dailnfr372vmji9klx49888ywrjw4rvdwgfb9e00bhm7jhkseknjrezfgdh92ju6',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '7xeqkmefsur4wyvb89iba7zqx41wqzqdqfofjxdy8e2k4pv16larzqioyqiovhcc7fkl33vt8ytsq78eb70kipyabonc7wx2gmb3vfgksmxy914ito4er3tahrjyirm4fopdz44zvgnsaxs65p2pxckzhg8uqfbh',
                flowComponent: 'uwearj8dlwm44ofk7mg3b02j9r7uu5g3n160moyqlxw3b1ah9n9joeadko4agvqsxml5g0ocidv7u6mpakp6r7nqbkg5dv51gh3q1dodhnuy8q1m306rw87oeirts0otd2g13f1abpxccutd0dncdflvktybiobq',
                flowInterfaceName: '0sl86hu2wk8p8uz9dq6p0hhuc6aa4bq17a5pd6uxz537tekr3977xe212vdxpdz4pcm9iolt5oqnsemqsa3jkok1jxhrsw84nfnsy4aubqk9yzfus17mcge67t3oubvsr9ji0a6rneizct7514oquvmpinerm9kv',
                flowInterfaceNamespace: '7b5m7ycc2xkxc540ez0wfutmy2fr7jzdm61b51auyipafhnarslhg46jf29y534s52am7dzi7pkud7wxf6j90t9rz4h837swia4spjpnej23wok09kjgalbi5a6gngbbsgp1ecy9rx2mrtu8jg155s8kh3up93fa',
                parameterGroup: 'jv6thkanqryyun23gtajcmjfqhw7v34b0r7bpb0wiqxgqp5h0qtlv3xugysults0npz1rzuney03fu0wkaetyh6o7h9ujyqefu0z07jjcecszpd0yhb0awzzx27sue9m12jm9fxaz71euucqnzaefvlngzapez6wv2izjd6kcs6yah20omv6vvs52sr63zmu4zikli3r6w3sjcl8hak8f58xeg7qpfxl2jh82gl3m4x34c1owx83pegcnvbguyl',
                name: 'e0hcfwfhs1zfrv0j9vo14m5oi7k06q8umh4fspb9xy616oczp3c35z1fn1749cblmynh5k4yyj7yo7vjf8tgi45ucszs8vke6kmwxbdapc0gklihoupe6tvvj1vacbfqs079qxix0i5yqcaxj6nmeme1em8wdp1tgut68l4gjl30yytg5dhjvet9r5uyzm5h76bpa0125s5n1qhttjnksow0pbv4rold923ru0tdbpsawo9ujkq6xoczog9fkvhiuawdr8iwe38x3d2szceaefi6cc4plv3sfnuqcukso8bujfpoqxj5ss9xiaa5szui',
                parameterName: '9d3vbiad5dgvd0nhlf8vf5jd7tv5loxzrdpparxcemlrtfqk50mb2b7c3tigsv8dv57impkl1k5nf85jj9uvwm615ntmrq7994pcrj4d559uxkgenz7a77d2781fekymuf5nph7zt07ng3g42bgnlbysdnilc5q2epnvbwfc0898y9kwuc86nj0iav26vx7hjggvjkfm4e3icf269591bnom5eky28kyqtznzhcd1h20fa6r4jrovq9m5e1jpxnb8ul4tg3qa879bb0pwqabak4i5qrtky816t9zmov6i85kdhrv7sjqvmuf6ic1pjx9',
                parameterValue: 'aocce64wq34xr4edkit4sibrn6vvl4nih8cquv36gabya83l6czifq0cjjq4tjxjfxz7peyxr65lf0x17ma2qey3pfk62z86hmc2xf5hths7041g4j1isw3s8ftj7qr04oi50kh7e18mdg43854wsehs0bsxd6i0955jkkh9aihzfyygxdshq69vlp2rmb460082g95wrskwdscb9zjmbtckbjrzbs17w9mlqcakqzag76hnfiqe4yblafno2sq4z6cfhgxig5red6zfrul5zoyyvysz11gh6bcq1fa0q0wzs5e1k05z63zxtprqr3j97qvcz8m1j07gi5mdb9iblbqurd49dkle7ylt8zcrh4jbn33gmkezm8rlka0z94mqahciv765ixz74az0vo75yqnijo0fbo2azj2t8dse19y24x7n2ufpw0l24w2ofzoqh615xia144wmjoz1ty96aaab44ruxesp0mvbe4nyakc18yievksfm8irluoc23yidajylb68t6hshcpynzils9l85r8xo2wwdgriat2jgaxq2xa7ebnz7bl1txodt75lzmt7vnfn9uhdwynb0tbcda7xfebwwhpc6la5b8lva6m3hzojzdf7ydswx3snyvbwu8yyuf1scnq4iv1fn7lbp8cd8bvnxx3cc8wx9v0k3557ccv8tdbkmeemwlxq1hiqi25dt2sfhb4x7uksbjdf7dgtpf48i4gqcmh59xku1ewhilhqdqhkqjbhnifpr167s3p7unbf8lu6u16x9way5rtfsuq3rn0ed8h8dn74i41f47akws24njeseoywbulw67y2kkhnqyo2rbl713an0soycmmm1kdrb6solw14dobfk0ms18ey8qpl5y0quyh84jdgbxossvszvhuspedwrs3bzph13klzyi0zel34xtn1jwq07py3uyhnrdlbrxehzvglh650ar7jeesyw2xzdl6f9iqz4p53vef8djfne81nvj22usykg5y3rdwchdoi',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '8c122653-36d1-436b-8270-cb3e5bff6f19'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8c122653-36d1-436b-8270-cb3e5bff6f19'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/8c122653-36d1-436b-8270-cb3e5bff6f19')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c122653-36d1-436b-8270-cb3e5bff6f19'));
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
                
                id: '52b11dd5-de8d-44e1-9410-8a42848b538b',
                tenantId: '377f0a4b-1ea1-41de-9f34-c6a82e5a3b8d',
                tenantCode: 'tw602r5bo9k6xd21auq11w4v3kyx492d78e3t736arexfcpxzp',
                version: '3bglty0igu497y6p195b',
                systemId: 'fa08068f-2079-4c39-be44-3ff837dc9009',
                systemName: 'kczrgsjpbxw84tyj5lyk',
                channelId: '1ce60fe4-e849-4f93-83a8-34d485bcb848',
                channelParty: 'f466ih9c13i5hwjoaoovjcb335g7i214wn1m8f6c85x77bws03ac6sdf8vej7x8b8ad5mbrqbj0bg4llhxy6g2gqryypmw4ir5zys7houwx6t0ta3jrb965k5vpbhwxe0kpvujou51teo0aw159dy6ix40ct5mw8',
                channelComponent: 'v5ebnotxratsukby4l56r66r7j5m07lqh9i61m2aciiudkzz96b9jbnem47g7yftmj9t8z391vsqb25stcb48xpf0pe004qxa8invlt083snhv3siizfy6tlxa3fm37chik8lay4utxbo8wkau75vs63zdzslzay',
                channelName: 'vjy864o52ppeyeetms6by1hish7vpztklk2z66vgvvodnlhb88hbtcattj7zgsz55na9vbzoxue7ul5jwcn6ucphpenta884mkosrk1k75b1qynhuczi93z3itsymge24vb67uge3d5ww4t1pxuzlnwo67ljyvl7',
                flowId: '87089ff1-462b-4423-b9c1-020fe0457bc4',
                flowParty: '5guhgdj6n6k4s3fcazagudvmsqyz1v2163g9gvklwci35d2ia91b7woscaiuhbock0zn2mp8hcn5plwsyu6z07lyc80lp48ulx3lg0wbllpjqbqfb8a5etn4qfohqk6wiucgmztwtcx0mz30fpg1tf7usfbj7xw8',
                flowComponent: 'n0ygm6drw93g6vj735ez0wwoll5j7legw5nfv48ajrsdfde65vofxu9xw1o74tav30riqnqx5kuscv37hx89tv5jb9f48cu9h0mbupcjiparp963suvd9mnb461sxd3a8b568y2q68ixev8l1oiup91178sx6q4t',
                flowInterfaceName: 'zbfiswdl60x8i3cscokgu3n2uyek6mjjy1rxotd4i966677hy7ar8fjos3asj8ssln4inpqykoe8ekn1ifzmnjb31vnr2dkb23rb2e7bhfia7hlian4lufbk6c18zmgqn1a2xopdqpnasgp0dpzzmi5ycapogk1q',
                flowInterfaceNamespace: '4wxi2ks48yfh9dh8lk0ja5ms61bmai2hioqnj5cyl4jjznizi9xk72hi7sev6osnrkwvgvvxjcg216k16r719e5wx0agi555ha8gip3dvzfm8hbsxye99b5ueeaz3r4w9zfdy0dog9w7ywvw6ujw1ahsqu9f2l7n',
                parameterGroup: '1nongmgonafplqog8crxvp95i0v9qsnbkrwcl8vxze8w15xawrtp35xvyp5wqzrtne40ejbbck518yfa6ubkqnbxuourtq6wpqrt72hr850feuonjef9vz0kwrjmkpdekjn6s011b8w9lq44x2ux7nil9q6r3g0tlqtagdjvn1ebfb95847ksbe208req2af69axz0islowdck1hdzzc29riszspf2al0rzw7jirgnmbvlm1yew7o4hj7nh37p0',
                name: 'ddoawpjcxnq6z0c1paur2ic8dscdp8n6n56hnwtbw4vs2k67ujyluegpzj7t940fdw1iliy70uptvz0flwufddzclfcjiyqu71xqjd7d5f7k2n8thkd0ji0zfidudpd9p4raujta65vruzjjhn4rrbvz1baor089e7f1l3esheppio29eopcsg3swq48ho96ieevi43tkarjwzuo4t2umdk53yumn76zjkof9abesbi1lppp1keadwrfgnjkbj70hndcfo1843iixc4et5pqaxzww5t4v5fzonzeb8io55bvhz5kh5b40vwkvvkrdej6',
                parameterName: 'thpkklgkuiycbnjz7d85x530kyww0bfhbvyi6myz6pev1h6am7ecd9o69kifj67y60xuxjonxi468t5kiet0aox13glqxk5qt5jgx51gqlpg711gpkhxhomkmx8ll75do7gagi9mu48rg1gwemfac6m9yklxeureechu50fz35ehwt3grflu7yxvkynrr2man824p4zlsoufhv61obgajt5lcwg0wkfmcty9smdbb6k6rs0el2hhyc89ztkgcqqv65m4zrbl3hukgqtqa6avx7l0k5t6dhvvikidyao1frdgipgce7y8l6l34btt1hx2',
                parameterValue: 'tm98f822uxj2ekqkcndd58t5yzxyhgy02zx99row5a54iapcsxen9jpfkppw135fv77qryra0wls5szpqe96zy2dhqegpu32y4660x1nrozp2cjuwxcl2aywv3epldtjfxwd9iaxgiyu5295objywjc47y52ncsviq6zxcazvil1zcshdct5t8al2rqoxzzcga7m2adejpvl43q6f87pa54fvx599qdvnph3e2m6dqftqgkhgs7hpgpf3idnwemxxc0wliswml3kmxjlqjon1hqz2mu0uthc7jf8cse6zlw3c9rfarbhfzk43tbq9kfon5mmam8b93el4taxqe0pcd7r4smhdt9ly454x0xy70wglzct4czpwjevj5npka3tchfv4v8kk5stqxig2s0gwk1qtuldqg2m5pum6smvme7zxfk7ya40hyt0tpr7jhefbtxcv20mjs8j9bgzhq1hcaibhx100l0q1nnxjowojr6sj5r20un13ok2q7cr4dtmptmhq6fzncqq9ojl9na8q8qqbe43bum9rn5y9daniuhzgbj5mzrhsx5nvkzl6jxesrnjlmtq9317gv9ne709rmtzvhcuut6d4ti69is6ctbc4f8vhghcv0ugxe5qbm06ez9bvdyhigyc1wv5kdnpxmjog4ga2xwbtttovb8womk3tu1r62n3rj963ckvm1ec0ox1vwolxb7m8acdv4jkl9csz1g6b64bmw2xakattm3tub53bjewfgn48r8z99nz9hh7io7d9ds3pc9lh3oh9lj8myg5m90meylrgvvwebixtpgn9yui99yy0fq5rwj400d9lga8y86qkqd15f1ylpra9th7hqqlbs2le23827rfy27yqj3k7zzfxtkqd3bx713d4amqfyib80vx2qlw4x73jogfxw2pzvp0m3o7r9paj4m2ty47trhbld17oj6b9lodu2q96fwu1cxy2pi3tmvcm915q8j0jjvudjm69hh5jok3hxr6dwba8ow37cgr',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                tenantCode: 'h5ntdals61f2sp21d7r5hxgs4mzw3d9l99qnlw057bygq464my',
                version: 'a6u905vx2ddpehspkxif',
                systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                systemName: 'ptpt54ljqu6mmudslzqg',
                channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                channelParty: 'won0h6a8a4zh5c5s0kkeqa2psqaxfahg5g167rgytic0oolskl8ozkfr85f3uaflj3ayaz84k3jz0xyn8f329onxwr1medih7sv84vn4t1vmhvjaz2exfvlyu6mqz02ty2gi2fpc22ecjae3andgw4e3megxbvt6',
                channelComponent: 'il4ubwbosolgtvrm3rhk6bt2q4nvsg4dqe6px7icyriogpha9jm5ho9a0a8t5clg9ewvsokc0h0aeu7el92ry1psu8o1cq297jv4obxlb4yz7c98qvojeb80tenhf21kc9e7dl44ib9wrveuag36d6zgcu6vbvy7',
                channelName: '6h115kvefafztq2l7eddsf1zc8d2muxf0h660va7gkqlhisx9eat8cp4c9yjc53ncj3iznihp3gxham7n1zdym11ntc711e1w3rr2fn4xe5qn8jzpfcy32bdr2xmucqu8s2jbn4y78e4wypt75rfchv0xb2xh05c',
                flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                flowParty: '418vm6c93ghra5o0qu4i8jqr11hcjtq5rnsohsldntvgwojhuzc1qzr8o97xhtzjvifrvqodz6e6i4qp6ck04b40ccg8ay6khruxy9tosugdnj2qsyox9vdofzuxqzjl8xetq6yiw78h2bnnak0ta3vospemnaby',
                flowComponent: 'iexdlzq99v33gxvdz5t6qi6jc9wi8c7sdme7hgqtaxngvmgqg1h03sj005e811ngsn3x31sg3bxqr2nxkntvkytss2d62e4g4fy5anrqe83wctx9idowhj489l6szmkh3io8rgny26l6m0syw1fdnllwcereuab1',
                flowInterfaceName: '4nug3pho1crqx51golfdq7wluzd5dq0ai3jn4thwhmx4xjqdq3e1moidpmqsrx45gk7zoyjl2ooizrv7j8wv2uwhwiht9ozvtlv1xghbtkyxplkc8vi3p9cze9so1oaws70qryk50kzjix0zoce0oxr9gnbc3d0f',
                flowInterfaceNamespace: 'yk6j1eo68zwuyfg4kwzgrq2ta1ozj07g5rg13s18lreeokyil2jjx0kcqz5ganggiuo0nosppwvb6vrzqixrcigth9apssp3cp8sl04l0ly2w8vpqdcdm2vpijhvd5c4go38wqtfp7dovb5d014649om3d1d4mf0',
                parameterGroup: 's6zjig5t672tre4qbyxhf9enx0p6ue3wbyse2k84mqajj93dwdbam6u214b8uu0lypzhuk13xts7y9mp6cxkhzkob161rzig8phc996ic23pnht2n2vpgqrv331zfyyd2z5l3opi2gpff0c3qafq3f1u9sd9l273fk7q3e21wjnnzlvlam29p3iesn6dsj02pvbx6k9os8x6hbuk887imo4cepaopli5esozw0122ulyhvwwczcz7cmh13bkse7',
                name: '6hv9ohkmpka7zqt049u9068b3ag5u6ibn8y8udv4v905zr3cchxhn7tl817nww95a0y29jdxejcu1umclnqzvrryun6qcgko0pp4urb7k48ofeapahkabukjcelrptz3jkoy9vp2fcflavz4ymv1byvj2ursgdvj90pf4mhx5u2q9ek03rz8yu7rkn38si3pqh7cwwhkw9mwicrv9luf33176j03g0wqco4efk2rc541b6dmyxff5y9nd2q39aivzd64hwnoojqybp8g9qvm05s9pcv18k5o6c6zuo54pk9reckg3sox5mw2ku10xqyw',
                parameterName: 'v4jwrhxtmmd79qq3ldlb6r1k3p0likt6b7ol94e1xbo5lmirp3fsizqcl6k90q8g1cdrce5op5odi43hggcnn0ktun4r9wyu641agqxozuq0w3a50zosxa0735x6zjiuuahc7dv7t7fcwwfu86fb51kgdq6yiz1drpixtd8496yzod0q4we97j600lmu439d8c9vhznham8db9oxpdv5d0bagvj4sd8kjjkba3rw8pqbl5ezt8v1bmo8qgpwtirq33nq9mfn0qpckwxq8omiq7j0un8jbwtnkzvctly99blxrs4rvcer3peec3he3qhf',
                parameterValue: 'six3fjio6q9eyaxrz5bn2c86psnxzmiy6981iu51a5f3d6hwlm6uuy4jy5xj07ijignyerqry2mdfzvry7mko5t0jr5jtr54sff04exyumkvqia5ncfy58mm6nmh54gcqif412mgn6l1qba92mkuwd9dj07qf6850l91h7b8u2rwmo9me4dsj28xdptdszix6xwu36dmdgv8bogjmlp5kae6osilzm6op8rin5d7niutmpzeqojazq2x1leczrgr36xweamaa1sgmcqdwbrzsearsnvoa6etqmbq58z3bhfnk1peubhtq5xk3k8gnmzibvut1ah34vfw9s0oqusce13ekvuuoq1opxw7eta7hh64f56eydovbbfs78tcr0akzbge1xkxme18gyk4avzc2sm85w4d8slu7f1wvj7v5sg5nohz9i2rx4qhzt0iwh2ljg7uv495a2mukcdi82zh3jdl35th0o8gegjl6q05ykg6ds9k56mymcmlm2jjpl9ez9um2eqsz9jb1gmi01cu10nbyiycwx5t4dnlyes8ns4xulkpp7laix3zw8rbr18abphov96739yxf53kzd6n87otwx14du64n3jnddlq8c6hm7n61gqootoi8k7l51ms6g13nljgngyzaxihpxj2gh3xgcu283pxp12g6bffuyl3st0v172v5deleuop0nrvr6he7zfebuzc2fgz6yvpvbra4gumnj1e9tp3tbpln38v4pplhjje7xona88szz6viqjqa199a9tot1ukvpkzoo9mhykwqdxlizwgnb8xvflbcppfa5ql98068emtmm9v5ldl5ry6mmk20mow5e1l10za26ukt3yy0xfat82h65to2ivri16xvjtwfryr32jnq828h0pmis42z07ikafq4kn8mxsal6seuwdmwagbs6x152961ejgmhmdg7u0k99wsy4d30nbgl6jh4y2ukk4lwm842o4xaf2edj8zxn01dmvqln2niushj0zulxboxl9',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c122653-36d1-436b-8270-cb3e5bff6f19'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/8c122653-36d1-436b-8270-cb3e5bff6f19')
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        id: '6cf00eaa-b382-4bf8-b3de-fcae28c37dcb',
                        tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                        tenantCode: 'chvf680sa8n7lioslbaui3whwtuqkrlods6f3ha6uizplq8yko',
                        version: 'r8bgnftf745cp8o2g32h',
                        systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                        systemName: '1g6egut2sxdosl4krjj5',
                        channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                        channelParty: '8jqs4zyzcdatfvqni08m4mmhduywm7lp1wpf552pzj8x296kx0zynxz6g2cbj3wjiinikjptgucjjvdwlnekpt83ag00va19fxscacgc56nsw6u5hfsf20ne70ksjttn5gw4prhkfkyh9htzpwk5nzmwauvax1d1',
                        channelComponent: '7h23ig7gqb0wst7m7cf413kxzj74160f225h4u0t9nv1mqo2m0w559rf4mcaxvgm0ajhbmirz9if2qjb97tf7a846zlng5prthmbdkhcaj35h8q6tw9u0eeqahdvh9xrs6l4o2sqqe5y6hjk9y6fvs4y0o6cpkmn',
                        channelName: '0e26vuyfcmvtkvo0og0u9ixm4l1nib49tdt4nekii8uf6xj2766xwnx6o977za0pyczub46p7cjwg3jpy8ni7orvyrkyb0r74j4r7id94eul84vxrn1nvmvgle40zercnfnsb4epwr33kl28lfz9nfparcfce7lv',
                        flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                        flowParty: 'z5zk28uu9kabyk4lx2jyyisu6c40ewmq4edj06dkg4oqsog1zyy55mchv4usi126drirlw1xg94qnbyziy567k8rxviflli3wuyymigx7w9bphimjjdkojbnmf538v366fgj2a8w24py2nf7pavgonildkjc5777',
                        flowComponent: 'c7lq1mzowjt0dgxrlz97w0tgjjtirh19s5xfp8a0yacuhx85sq3q9vu7kwxyspdk1njzvbc5n5z96nlvj1dtbdljev17j5lsp1jbdu30kxa1oiybbo10btwdgqg5fnz4uh8g4rfujggodgr86fjx21yx48hktl5g',
                        flowInterfaceName: 'qaqg6txf45a4y28h4ly2t3uas2bnusf5cnf5rliplaipgv3zh6ozh1jwe81ouf4sw2go3vcgab83bvx7agz9cjobb8kv52e2487a7aal0v3zyqwq9y8kil5hmspy1qdajdukqn17s9eukxocebf1d2cn48e4u8ca',
                        flowInterfaceNamespace: 'n2zrwxkypyf3yrr22vpckhvduwr4rlwdgdvs4cki52fgrlq2jmlh6ae0hwrvwn89k3mj7onilfe416ls8v0jrms8j3g217etrjxq9u8rfnc64rt2imgbgx3rkeo8p9oxb6zdcq9524bi1r99jafruxpvhhn3pikj',
                        parameterGroup: '53p3vqj14fskl8t8vgj078voz9fm7svw8jv1g8wyzr9vebxn99eakkbopa92ubi4sl4as5mki82sf9bqjcfgheb4fxrilrof9eg17xw2xtxn0o2abvzjj7xrb2rgbyqd0ubpo9sm8e5itrivy3qu4w7t2ljgsd2ylmbrm0bz9kznmim2l8rj598kz1eargonkcvbw2ap8qe0o2rw5dybkckci3zymi3ywlas2dccoixt8eqnh1ngg8j480vg9xp',
                        name: '5jjmn76qe55hlx13gjpepr51vr3tpy8qrytc6jp9kd02cbkzdgheezcij1t1it7o9ur8u2c5ht86cou72bjd2rbv48redkc0fwfqzttx8nj46c9qp1r80dkw9za0qy83hzz9kh7i6bkd55otu9qxt9oa2yfc1fafpbu6tid2wkaxuucbhg6ftfd88b59tffeq15hjr2767u7g8rk6hmh97cs165vm9n0uw4txbdgo8hqr64mklhdqfzi5ua99vd2z5s7h1vke48ie2krog7j9ia51xpp9d9cgnsb5td51epdvo1cms7byjmtlkupanut',
                        parameterName: 'z7dt21udduwsiktanvfkcrmot3obm18hr3j4eeq2jbct5fi46cjivt9tplglgg8a0jmamfyqdmmw3834wrvxadv9zx1elwoedv0wesht7vzvgtv4dnu8k2c91pq5orf6nbew4n08d1s4fhr4pw6348g9urlpx8fccyftdttd89ups7e5z3dx3nycxrl7q6o3priwblxbe7deg3ppxgxvhm9enb621wh8njbzqj1jle3yliz3tkcdothw6fgpp40z13kakm5a61ikt1zigqyadkufna0nooa0krj8hlrr1anosvrmj2sbosictnokfyw2',
                        parameterValue: 'sjic3ppbuynyjfxe2jk7jvhooskhohzpd6lekhnxeohzqe1yiynilkt2w78pkyfobrdtaldcdbyt6gdhwsbzjhm1pdbpczgeyjr9qv2pb9d39e4fijmfiia3bvwu3a4vm49qm6awncp02mmi8vxxnl63odgr9kliicxtkvqchex8pa9mqorfzeokzlzvorylqzm9dsgfp2n06sgfbrvs3dl510cqsmfhv67pw2pay8xjb2ccga3wo1e3wwk87dlvaiqxswgotvpismcxs3vaynjt2l9ys5qggfqsg74peeae3ayv83awql37o8zjhwsbq6dbiabti3vvslv4fllbkp3zyqfri4uxsszylq6wthy4g90ku7jhq1i8lyxjyhf8zatknbnk3feo5pdsueksrix92alkmkh41s3gd7cqzxvfinvloy3i858f1vi1740eqlqb0q0xnn7blf4w9pc7ydcvp5jb9drnz03nvtywzit6xqn3ogex9b3p9tjjmqmv2274jol8owgigypdasszncy1kqut52awc6kbbti206rlf5savqaqys6abvbqki4vaobbpe96mhoaoamm8s87zi011krllsgvnkinem5zm44iwnjgpdcktptj3w7f4ymo55ywuixzw0nypp594nata5tdzsxrl18qpkxpd16q068vt5o7l7s8oud5pq3y3jjaucxhdnpifknpbum8t6dle6rhb5w21860zimf0ceskxnp33bw5v1xjmscfp9s2t6der95wigstgbateeq21he6rp2n67odssie0vhz2j90h0qp341urgxukxj4ap0xbi2ul7s3gvcfxocwll3dbd8rwmcifg7pop3gjjrrlr7aafo96mvsq2bzhwle6f68rk8wwbepcm4oid3g49hzfue243wwzv11316tn6ru4dfoo7pmda98st173q235wdvzoenwclfda1vasmxth1bg19vzx1tlldwt4l5pyc6udg4kiqw75tnk9k0clye8p757kx',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '6cf00eaa-b382-4bf8-b3de-fcae28c37dcb');
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : '8c122653-36d1-436b-8270-cb3e5bff6f19'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('8c122653-36d1-436b-8270-cb3e5bff6f19');
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '8c122653-36d1-436b-8270-cb3e5bff6f19'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('8c122653-36d1-436b-8270-cb3e5bff6f19');
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: 'e23d4ea3-f36d-4084-99a6-3ab4120df1a3',
                        tenantId: 'c6b1b1a8-4712-4485-aa70-0122674e398d',
                        tenantCode: 'fkii3beplf78u8r6am6buemgupasuu28v2o21jt9pb2nwpgq6z',
                        version: 'hnwl92uwexqtzc97uyar',
                        systemId: 'e1b6abae-eba5-4293-b325-b69400d23982',
                        systemName: 'ub9a01p86zhin8ghm0s7',
                        channelId: '75729089-f22a-4b72-b613-975cff77c9a1',
                        channelParty: 'kib37eydysyihuoaxxuomm5y7wnebkt6pf4e9frz9r5rfcybg7rf9q83alvvjtbde76f4xz5t8hdhuq0qtf8ij9hwca9do3bryyxkksprbam823xzs0ga14spls239huvvs3up5ye1jpf8tlx08zerxgh12upoa3',
                        channelComponent: 'xl59xukofxdu2sv2kbhljv5mwf5c6v8bvm3o1i6ytgpk8eswb6d48yxkv2a7pmu46ywux3ohfzk6kr8hwax3eec1ws54a1s5da3k71x4ze52a86fh1ln03grtlz1fg0efrxm7l99k7zgcuopuchusqpau5p8ltzd',
                        channelName: 'v40kt1axggv7pewx6vtlyelfpokwl39i5yx6ftvlovs9zpqglulbgxgpwzt7rucop3mi4ydmj46r13l7bk54osz5s4qdg0gtyvudcuqqk1l4l939t9ecgwt0n85x5rncym63jfc5v1i2gqsqdoozwdmu7dz94uqu',
                        flowId: 'c2824e5b-2074-4d8f-b52e-fa1d59d50586',
                        flowParty: 'iro6gxktoo4jep0wnin7ze3o44dv1ybref9b5fsdpp36ag2tk4kakhswvce0i60iql8a0hd9eoob61534orcvon8jbfbea6qh1h2wks1o8ob71ythbixpk07m01lf543neu4jguht0y9vltny11veptvih5ygxb6',
                        flowComponent: 'n5286nlhn4ejbd1mk3pfdcmexlc6pl15t9fc6mcxdncdyh6f0glzmqap85xl4pr8kgpnlzc2vhnk1k9hc5g9h5vdx8egpjssahbob8x6gyeuxsjdmv65p4r81qkhts5dj5q6lbgu7hncf7080umjashvscha9e8l',
                        flowInterfaceName: 'hdsijj30151prdc1bj9dpaxvgsk8llytosgmzgg9h92d2lijjdg5k0tqpvlh6q5dur0p60k6ozk448rkip1v0a5gvhlhuh9vujj4bo2eh5efdcmjro63dttlmc7bq9gmzt6ygyq4ir3mmojep8j6pmwoe4n4xrt0',
                        flowInterfaceNamespace: 'zja9dojrsgoe3n1dv353tsfb5ylmnpj5l15e80vrd09klh4je5k4vxy82wft1cu2al8b08wjq3fh2y9ekw03jc7ndkq7tmreozhvgcqndozm9g6b1uj3h6f7q2da27r0ne99mhzcgrkukej7sanzcfwdve3k2xlx',
                        parameterGroup: 'px4ranwk1eqwxs68g7h1ok7ou2adiub54yw787lhnliy2w8qnzxdx6naugwl5w7gvkcm0tquid2d6ry6vhh3zew4syd3a3qhuwnzqpw7uwbiaqpwmxlrpg8vrrqlzla84gfz6t77yd1fbtpj0jjwp1099z2saopmp70dd84zarwfrsxnceyw4x40qy66y3i5zqy7ys95e1dqz2oncq8ikllzxlosg7s7dgrw7zex0z8r3cofdwuvg6ifhc5wzft',
                        name: 'fse2dga5gshjdlbx13qza5pp8gs8obel7sdbnyqin9jt9oohlvvfyrn5wnl2x4l2s09j2uwl2p1mju59o20s0wv2bx685kegcjjcto0pgemgu0rh0jjq6tshxcot02fwui846f95dns04acw3sg9ymslejqkk7golkw61e5cl3xbuybr68jwjvbzlhn6onuykxxb04giq053y659w710s0fgea5zwyehgu2ictrx3zt7ol3s3wh4az4zf603o3cdu5onst6lkqupco10cx2be54c9dal1uuiez34ar4cqs8v7x1wbb5b8ep629se767x',
                        parameterName: 'g5ndmh8gjt2yy1evlguy0yb53osy3kv5sxo82ylojknl4chpatjc5j92x77hj4z4ll8ve1gupxt3gkkjwm3pfkeif78ppy0ot88ee91ivfrlxu5w0olk1yz3pj7mf4vtw2x5b2pcad20mu4csqfkjxclbb4sbc3q0ja3omcq8boxucod77f1qp50ytoajt5esdl7txdftppz4r8yr1a6l7kxmcgvvilt6wsvn7nacfptzut161govbktro6xuw9j1zesdtf48wxq4r7lausu9pzd636fynotrp5oi2cdq47kd3fjb927njjxb7tmjexg',
                        parameterValue: 'fn9f089klvqin43ci8tzqy8ie6388ii28xcdl7kvrpifh8aod3iy7vs1dhpqqwqotqd3x2kv5zlqweoujf17pi90sbxa8add0a9eyml2hkwg4jxw0j76roirjsxgnkeb0lkpds8p8qag2igmr1lkyqoli3pqlhwhjwe698kbufnmgb9ara15uat8ofhoxiiuo9t1cbqrob8lf6poxx5n0r6p0n80wm2hqvubh50u62knusvk57raxtlisixvt7m8cwce3dn0pgsx2oq2dadnvfzmtn2mv07vggjfw8c306ql6e8unxv680pw5fyno5jetln24rcoc9qxygy4w8hv72ui0fwk9je345n7nb4nr3sn6y2qbk95vab56d1uetiqmqp7fy8udt7kxrrge2z24vpck3olc1wmg18a2nn95tqtxkjrh6tzbjhb76hzvcesoqbtucaz6cdtqqkteqzb8p4kw0pyjdhr991jdgzo9ujunhnv224dxg44bwupx4bnjn9rbwpf9xj05wni78tb3st7ed1gmdbzx1c1hg7v02n2nu6kjm0sb0gcuolhnm8xpd7m5vts5knodcycb4xq7do0pntz9t6nnoatacppprde21rz70elsbmsjirxe46b8c9x2jqbdazvg8kzwkk4qja2kp5rc6061sjqhr48rk7ygdisrwzyk6pxkkjw4mkh5opwq6mxay6eqrq8dlc4o1q5erpg1ow4gaeg1cjwkm9hzvqlfmizkpb9nihoqa2i5tcszooa9wv910bjtfcpjll2i01bt6c7afp2ch6k0x7lcso27kcpaecdzrbuumwsu39g9zyty4s99e8pzzhtqgbst05qoqrfws9ut0gtuonaot7g7g14y6ncs3sg3oa8k4zed6sswr7zurh8gjvv0yzyppu87sf0b9e4q4nb0u4bxgt0yeqb42p36ds8f8g0ga0lmucfv3o3a0qr70d6s62bfqrro6fywpwkz0bq3ibaxxl6idktmj4vx9f1p0rk',
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: '8c122653-36d1-436b-8270-cb3e5bff6f19',
                        tenantId: 'bcc034c8-1665-4250-bed4-f9613a1cd2d3',
                        tenantCode: 'cqgcbkzmt6pnnyyn56bxcxc1x41n4m01wnkacjozlvpabr2vhq',
                        version: 'y6l3yvddpo2lydrmcvh8',
                        systemId: '948e1709-2ab6-405a-acf9-6a1f1fd943c3',
                        systemName: 'gjl74v2alvmodi23ilpp',
                        channelId: 'e62e7fa6-e398-43e2-8be6-6b576b589dd1',
                        channelParty: 'gkpe3cktud3r3tj79r3pyrzazwehkbzgxkeysl26pt0y3z3igbo5l1mm50qbsc1zx4ushohe28y3cu0xocslvoxze87za7hxfjoixcmypcqjokyo8p9ld817c922loxx2e54bkdeds3e3z7b3nas82obztxzl6ss',
                        channelComponent: 'zyf5kzsgj887nqj682yet6qw9fhlwlozwgmgk0qvkqjvllf3iyg6tzgqff82qqubqk80103n0fs6ho5kq18d5a848tqub50jzy92lid3uxvm504mj87hnszq5gn7vicfhcdjhgqwkhj5zj9khvmu8m3b5ag1wxqp',
                        channelName: '0egx1rb73j9on7k18xb3dws04y9yrx2dz1xf3eez2vtxx8ma2ejkp7r1jk3adh099p34gqthwvq71b0q5beabx82ce2xncmifhpogfopuqkt6t5595km0q4u8bxv6o7pxiuzxflhvjz7nsvqeq5f2zk67u66wonq',
                        flowId: '29d414aa-c091-481c-ba72-a0bf9ceb23b8',
                        flowParty: 'vf0jzqadomlkysw3cgkh3oy5wlf6mdphhy05bp5uas3nmk075f6k7ce4wei1a5fw0kkut3wzbe5q0deuv37kkpm5oqvfy4vhlc4zfd6bw05rdfbc2jceeegimxemq90w0591qk8e4crmz3855jroc39sa1e5qdwr',
                        flowComponent: 'zt534fv1mpox8e3p1c0onynna70420zbmj9x01bmbz3njo3qqkkvxhhu0be5tj3gbm9h4ajmjej3x4x49ztj1x0fa5m6u2spmhsujr17vdgs43py3qpxh3a43ehcxqbf66ow0hbl1waq0zswi8flfuxhh4a5w9ix',
                        flowInterfaceName: 'b5t9cvvucldx2grs7tks7f4taec0uhim3rqhn8gyi001efmdw88qp1k9z7elo5rpcd203rn9dhu9s9ww8hp8codas9drld4f3wf283ccvi6i7zri7u5v6k4elrm86etshimrppx0thybfj0isvukgzk64xe9ise0',
                        flowInterfaceNamespace: 'i3d60raa2kpgwmgfu29mcwymkdtxnc45v62wp30d159z6pmi0shhulj7sapezdt5fqpjep5hpy1jfw2c7jzd1xx97kig7pz45xss475revyn5y9pb726srb0xo0s5oam97er6828lc9hhmrles8vtmwmiouc787g',
                        parameterGroup: 'ftygtuapdcv8xz78qs12rr7sc3rwnj6j90h0jbajc98x759zwbfkhnl6cgxhsiumvyn93ws9tn64mhujxma1tprudqq4dcy1k8ulgv00knzyfk09l9p7yk3qev1qabccjzuyxxy8nn47zl29onaqobt938ivfcgwxqo5kshbzrcot02ng1inbef45i2bszkqtlz74bg8i6pfg6511mh2s7gcmjrbdpf7z8j0zvxqbht8a15tuvk2qw9sx0e9vaq',
                        name: 'x3p1avxzts906ozyqbi5hu8xio0zn7mukfeilvtko7q2qv9ffk0ct52eihry6ba9s7c4yw3uvxoky48qiajfgpqedlcn2wzj7pyxu65glkyu1pzxh76j93m5zulw6qdhswc2ehy3zjakn388vs40uet6kf3qpurv7fdswmewtpqif0ub1weln5ibmp4yw1mgd8xqet58n6ps49r4t2qil45hbe50q7kwjsghtfzp94ojoxsct9r0egl3ffrc5n0nil0qed042l035damu3c3lemln25h7bm8vmp2brhtpc9bi9ix6it0ymvgqwzxd6g0',
                        parameterName: 'y658njgpylde39d0ttqyssx0e39ss7new4wmmq8d1mefwdnw58rldf8j04tt0jy6kovfj3miz76s7kyen0t5e5qj0ztcjgikn2t85964kwgv5rr3b1j6l2jdpbzkxdzac000x18ih685t3afelwrv813jfnarzy873kvbvwzh0499bmrzqimiiypz8tbujbfljgcxdm6sy2lbafu50vtepnbmlrd6dlprd2en4cdk1hd3wzyrsqeh8ndf8o0cc0ib0y6oiew1n9l8rbmgc9qbu9exc898mm2eo5ncs95dis9w3i8pm0gkf4pk0y9pze4',
                        parameterValue: 'y37tw9j1j3isjvkn73umnyu7llw3x3qcsrsgtyr955jlnbkj3mgxhm3g1icay91kqmhfcbds4ozvo6svccywun6mxv17udr96yato3dhtsnkpahed7fgdmd4z6vqoixhj2hogk7f70jaft5danz3hvj5bic3wib9140jhgs3ykpasqbg915uhuimg2xp6qfp76y7omk27wh3hbinks337mu7vg139yob9xheh95zd63itgickazkcv4fvl9nqs9e01q5bxq18zsd5pisre4dqq2ckjpnpnpbwj32fw46o2h1v8h3f02ow5alond0lb5kk3bk6btrrei75a3hjbtwrax2rmucpws6u3jy4za4obrvoqm2q4viwjt32k4v8790h7wu73170qcx2oxk3baxtcqlvwqeuu43dh7047v6va248d5rhbflqyqmw0d1ygl5369lwuin3qqn5kv4jg6ag0h02894cx9ylhkyxyzhs500dcuh24pjol2gyrgangkl57fd2dvzgl6f9bithb4lgfashyl731lqjyd7mkgh44cbp7nwzof11phtf7d2zdbxn1teh43ljx6j20hwyas2qn06rtok5oxsppvv3ufyohyjuq0f79epzxngh7t3xndn7dkhuwubgj7rsgjpyueuaeux6wptqryut9ai92e34q1gg98sgiqhiwov4airxit5df7f3mipqqaomerlgf2rxeoz076iahawym96bziw07momrul7t940umo9nbki9cx44z1ls80yfklxgz4sss89391v4pzzffdw8s848g0xbofyug4msi1rvg0eb9u33eepmn2l2gm6ikdjtpr4uz9rpdi86vuz7ie58c1io7256aw7lkado5x3zte0mmu0i2jtsl0jl7w80dzll1tvgq2vmgv3k9b5fts5qoqf090ivwqlz2fnmg9xow7dci0c22m7gky90ci7db9askurq5co5pvfd3clkn84e3vt3r50bzbl8u2ko7fhvmnjb6ryjxs',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('8c122653-36d1-436b-8270-cb3e5bff6f19');
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            version
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: '8c122653-36d1-436b-8270-cb3e5bff6f19'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('8c122653-36d1-436b-8270-cb3e5bff6f19');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});