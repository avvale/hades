import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '0warwm13j465bk2pcgxja1at5jo3idmjpqrt6xgci0402llz6y',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '4arauxf9aopthr2jx7mu',
                scenario: 'ggbbgyda1v1vgawqcnu1c14dhuqnb9873h812d4pn25k3840wpcdr8h6leeu',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:10:55',
                executionMonitoringStartAt: '2020-07-26 20:56:26',
                executionMonitoringEndAt: '2020-07-26 22:54:16',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '0nurw5tmi2spm9skevkzd9wf86wzum7l8jum73n6m4td6m61sjbdnxf7uc7fd3ohe2ou1sy3r62dyhj88lpa0bz1330cy4cnrcy49el3vqazvj2619hnz14r098s72arjzx36z60g44sd07wi7cnrawjof1lta71',
                flowComponent: 'wpn10plnvfbs7tbkexmd7yn85zhujjxdggurww7xdajhw3ln5lq107wp44ur2309k3cy4sp2jnexe8cae5nrxcufkr51112y8cwobzfx9t0wqiifznb59feam8hyw69pwb3ix3at7i9bnq1ueqiev0kzv5qr4iea',
                flowInterfaceName: 'kq7x868plgfre07de84v2vijynzui0k7kh4198b1mkmmwhwx086jun0a59hx6k3wd2vx29xd1nyvcexmzcr22ocix43zcw409ud6c0n7vq7hw0z9c364eitojhep1jszit3fnixhvvdbtiyujdsknva9pktuc5y1',
                flowInterfaceNamespace: 'j1f6ep6gqlz3tzaqs8e4b4fnzyyxyfekgw42tpnjegraqli8ug9c1g8wehpe9yj3cq8asciro8m2fgyt0hnzzrc33xwo15vioxvw3g9ogr4rj0v7qkbjjgd27tlziozzys4dn9x7chc7gxehgwpnz6q0cq2ew7qg',
                status: 'CANCELLED',
                detail: 'Optio ea quam dolore et. Aliquid dolorem aliquam quibusdam unde ut unde soluta. Odio voluptatem aliquam mollitia. Voluptatem molestias repellendus et dicta.',
                example: 'ksu104dx4o1w1cux36oejhmel6fz8f69nl16pcyeew17u4hl3njfnkbinrhlmk7gbxhplzvysgux9z6gdtw35be21u8s8v9d1cmsvvr0ykx79l8osyjqt9gcvsgo1skvt51o1a7aolwewwhudlg723yca2crcx9p',
                startTimeAt: '2020-07-27 01:23:41',
                direction: 'OUTBOUND',
                errorCategory: '6pfhb84oc3bhs1ndvpjaawfj8d2l7yhvb71c3sf8g5v8c0cmmskxu9kf1d5lwlv1vyqouprqfjj3b82vkz7k0cz3e23eyd8cy4g3giczfzvjcm1oazagmy1icv5t1cqoth4re4xspo6eveo72163c8gekvguo46l',
                errorCode: 'hu3jeduwknu4rki6j9pd',
                errorLabel: 330532,
                node: 6765706780,
                protocol: '27iq8046kwde2vuf893e',
                qualityOfService: '2gxxlkpyuaki373g0gzp',
                receiverParty: 's1a7q48m6vo2riokly0rx5hapj7cgbwt26a0z1j0qv7b7vj1g845yxbco5w2cw09d000ke1x3fq01u5ql5748vy46xy4az2prfcx7zqdzhw59eq6c1giu0800xr3yf3y2eg6mkgufymp69npxu12apwnh8w0gpav',
                receiverComponent: 'l5ro0qb1e0z5vloz2aeikgkrbxzcdwsui19jkscehb31mcuv0rf30fws15748ycf6iutb4xswecu4bf21ygi7q2pnaxursf0sh8t6mci607sqizkwezh0hiew5c1j99vnjx8u0kk92qmydnn8t59w3evhpam6wh5',
                receiverInterface: 'bnahd6gsn5rld6yzuoeyrng0gvpuo8di82lfj4f3uaq05nmlflfz50fc8o186g9vkhxtbq257gxuinaq745n08crnwfrfaohptb6dx7o3wnn5cv5pbpn2ic7uwtsfqyrwrkrzpzjuik4g1dexuupact2vlp1ir1v',
                receiverInterfaceNamespace: '1oe183w6zly8h597br6c5hn3xewcnm3xph66m5ywzqv6rzfjczf85dfrh0kbx5ejag82l25qd79pqteaeehpr7sm3ait2rax8z9b1poaf16p0x67li5n51ggsywu1skqoiujw44mffv6rt3mdsl2v3bxzagient9',
                retries: 6055595366,
                size: 3308850257,
                timesFailed: 3370844836,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '3qzxdkx5sudmeh9fpxy8cjws4riy24l9u8m34a5wccr0i5rc1a',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '6pr6rkjdsvljc8ga9xc8',
                scenario: '060ekn8xbhp1hne3waoqh3f70fgwtak8mhl1es8cns2kl3jkq99u9qcpx3p5',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:31:01',
                executionMonitoringStartAt: '2020-07-27 17:12:19',
                executionMonitoringEndAt: '2020-07-27 04:34:24',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'sw8m1p1ew5tg6odbqufldpt6zgaqj3nrk8lbgcvcksmam0h0d2bsdifz60uybm4mx7uz3x5jhpku9oh3zvain7b9s3l3r08mqk9b2wd5pn9qyu4m4aqeknb4h0vdf4t672hz4syygez5i83urf2rdxwet11rtd2h',
                flowComponent: 'z1184n1p30b8nprmubwfijehlx426nlcateser1j9q91ar4kn59w6ebzeww2pqv6txodydj2n0p0k21alp3q0iygjyuvqo0114qevzighom8ihdpwwzemi1v37sjn0t5opcynebv8jun5bdcyg2cv5dy0ktj2e90',
                flowInterfaceName: 'rndjxxa00alucdec7ukweekvwtd2evd67jdxdc209hazhq53m0dzpe2nkilbvhuha7ug9mcz4dlk1eif650eqjtkze1imjsyhgrvxuiq1nmrrn3637s392qljkzw042g4svwy3eah78ip0d9ycd8w93t78ibmwdv',
                flowInterfaceNamespace: 'zqnkgv7tbblbexgycf4tzlj5qcqxu4ymnu1zel5cxe5pydtp46uxz0wxzynuafxhat7zr1iueewu2vcsypxfw2m7ehhpfj4pr8wonjjtb74lnsij8zs1l039gxouh2l7l4vgl3906hwbvsptn06nwo0zzpbcgmvq',
                status: 'WAITING',
                detail: 'Id quasi voluptatibus consequatur magni. Ipsa odit harum atque dicta in vero. Enim fugit et ad architecto rerum aut dignissimos.',
                example: '9ic8qm7s3qim9jwuownkbgv92k2k64fu3h7kemic016mm8dzwvj7uk1fqkzkaeifuh1gx2dsk43hyxxjwp5ms3he9ka2p6okrkpidoqezvayj3sgha4wu4n7fkp9y70iv85t4opmuv8stye6iilxz3t1gl5ig630',
                startTimeAt: '2020-07-27 11:39:31',
                direction: 'INBOUND',
                errorCategory: 'iesugj7806ep4sfu8miere7qp1eh9z1uygdj9e4al7qvgvhcsus7sz22e9op4zgvmftjswkzqz9xaf9q3qizypp9sh76jjw4765ueurvee1k8pnp8sw8f6ky4jqe2emzbs01z78vks5jq1bkod1zq0q8yij677ic',
                errorCode: 'goy0ssmz820h4nl9nvhh',
                errorLabel: 810099,
                node: 8305043500,
                protocol: 'rzzvxj4c95trg9dplcj9',
                qualityOfService: 'zlcap50bvazzmhn5kivv',
                receiverParty: 'y0o5m0e7uiueh7hy0u35zzykg3y1m7a7cc7u8t0hsej48irzh4yblxolzn4cj5vf27wgvt2e4ydkusdrec4bp977s2cdbxbgkt41lqrgwut8zq8xcfsno97587zqmezco945lukrqo8psqx12c8xpeskq0yde0pz',
                receiverComponent: 'inno85m84pc1jimbrp5m4vb1s6ja7n1j7buxznroktwwzs42ejaf8vll826m4049pe3cx9qag74y2zwlv772j1lihjqb385w9mrksog4f12vulef5drrmrbcz9uo71lnyead3lszn4z41ya00colcrcym6h1y9bb',
                receiverInterface: '7uqq9zvsz4gzex5yl390tai3v2oibi23xcqsumt658bulhhrxzqu38g8cx3ok3jrfif627wxf29ssxtglo2a7nyd1rxlsgn1c0au4ked3gk8yyzv9pedtp5wn7wg21swp4ab6n8gnex5biqjb4i9f6xfcos533u0',
                receiverInterfaceNamespace: 'wmdihcjktkbkruw21vanzl3xfl054y1j2zba1d58j44ds6rkmiwl0kt30qd48c7gedx5t97fdwaswduje01mo8zcyyoibhrtq62l5pdg5cqrdcy4pqvshlt30t7xs6sco6qufikd4w0h3u318s19ptcd5d3j412g',
                retries: 8940685490,
                size: 1096201419,
                timesFailed: 1826026985,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: null,
                tenantCode: 'lbxlf4o647dxabqqr8ca7xx6fkm72jnsz7ukhvfrc9jrbjz2pu',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '7ukuw3xi6t6fni2kiphp',
                scenario: '0s8p37k8gsfesfcmn4trcna0doi7y8ldkb5ctx4xl2wjctrltyrurywur2p9',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:33:23',
                executionMonitoringStartAt: '2020-07-27 13:30:45',
                executionMonitoringEndAt: '2020-07-26 20:12:38',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'prqqk8w8kiif3jrrfx0jmddadsv5q0w7bq496vbreqthof2pndldu47uecrymrucg8ptx7kytqrf6qzhuhp0anu8sqxz8reyjpjo0jt65hkcgeiupd6r410tp7mxrx2qceradwyakedik1o79h7tzggcxvjcfur9',
                flowComponent: 'knjtw9r51aiashy294xmspgp9grxtb3q6q9pr1bvjylseyo3c0tmb7oem1fg9gc79f6h7c79h2dtx5ojyoq1tsh3q6u4eh9tya6wrarx8djiw83tl4zkgcj1k1zu4f2cqkeyx408bygxhjttdbemls1syndcnfox',
                flowInterfaceName: '494vhwydd625067oiksqeshgw1qql6ox8x38ggva15200y1wuu2cvf5pr58t2rn57n7skl6qnzpopum49m8h55cbl75k5k3kcs5yq89xn3svchu8bvo6l5ms4qjpznlr53gcbrtjdkpdpe8gmbf1fu933siwo7ux',
                flowInterfaceNamespace: 'n9buq4xd15b9eyx0ibubcvr47044o2j3q59qe81rvgbpz4uzc81snvsr5i86ape6i8dz6r7j4oncyic20gvup3cjvw3gxdz7fi4zzv03ole8ga8u1ejcz731xxio2n9ls1c6uepjzcw8obvj66hvoh7gu5zstc1a',
                status: 'CANCELLED',
                detail: 'Veniam explicabo possimus quae et facere earum et qui. Culpa fuga iure aut enim. Corporis et quam quia reprehenderit corporis optio fugiat velit.',
                example: '318tumcramit7cw8flhej46jrjbhw2co5pa0yyg2h3u91f8uj6xs2bmberwl5pkwh6gvg035kw9ul0j6gk4u2q4lf0lobaqip8fbytaliid0vzmxlnkcd2z5n4svtomz3639vylipegbl2dtiilyd66f0guva6ad',
                startTimeAt: '2020-07-27 02:57:54',
                direction: 'OUTBOUND',
                errorCategory: '2uiu4n47sebmkw683zmqz5wdvecu3bsf2dkar6dsnfhxjf236pxsloagpfy7vhvpupjt9ocsy3df182k75ez405y1l9qtctlg5gntglq6558inkbji00ambgz9kr5a5v98gmas1te6ec1wbeiax62q6jsg3u3r57',
                errorCode: 'ln5z68it2zg1dsnuu4ny',
                errorLabel: 209226,
                node: 8358018579,
                protocol: '927u5x8m9e56b0w5i8a3',
                qualityOfService: 'nazy75oabgcq6bdw8ozb',
                receiverParty: '7lskxexdx610q05w2mhhv0duij12unhwpp6qwifp1a5r84h2ogt4k4higoc0y5jz4gl69byhrbqsp58re031p6nuvspivwppqlfk3y2tnwrboq2yjb07kjcfw7n238yzk4hk68c6fhj5oj54d0i2uf5fox0i44cs',
                receiverComponent: 'i4g5rsblmjql3frxa7nohgwexhgkegjykioyrt5lcqpszd9mmyt3o3wt5x95z3b0nl3wh0poljkxdzngwhvh9cop0bt1wqhqqtvn4e2midbk87akp1jm3sz089v0u1hgwng0ukukn931dm98tybxvtmd2ew4fvmd',
                receiverInterface: '8x1jmc82saztgz661trcxtru2stobwq8x7hri73gyks4x4yamwnsqwg7o9q4wjijyecjrvvzh50tu9nasbkj21odgofkh9libeh95lhvsaqgnak7umy06u31eubdag2x7472oyvmjckqsiuhnjj7ikrsupgmpeqz',
                receiverInterfaceNamespace: 'r3kxi2cduc3u4xku1panqjkx7b9zrnucj3iiynec1waww7ooimq5iye1a2bhpnbm11xgpcf7omyqte7g6cf8iwr17d1ssjr2fhgu8mhwh903p8kx0zjozdu43mactkpn3bn4ttsem9tyqnm1c6u4229ry54zuw3d',
                retries: 4835583178,
                size: 7151818115,
                timesFailed: 6137726649,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                
                tenantCode: 'annr7nb503y5y7n9f00fc9s7fn9ek1xg6p6mwkmh6mvn3enwh0',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'j3b537c5x0v5cu293e9t',
                scenario: 'n2jzpai4w549rsvxrh5nqewvjh0uolo4oh2efkw8yssw7mfpjmaugcpp9bcb',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:36:25',
                executionMonitoringStartAt: '2020-07-27 10:47:44',
                executionMonitoringEndAt: '2020-07-27 01:14:04',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '7lqmxr3yyc5hlvlajo1w03glnbg1jxrsll680h3ih7djsp5eb28wwxh3w0iiowspeojeqc6gt3wv23youl1kbvwl2gqwmne6phy9cqb7hkwa8hkai1gm9sminqws9ibat31yioavp98i6tc82tey17nd4oo5bu1m',
                flowComponent: 'bt726j5kmpakvv0myuon1b71squmnu8qd9cxci862h87aupsmrqfeyw50nwh8ieibqk8h4dguqi8mbo04xc40cg8jpeicvfln01pymgntuzwpj8fzu5aowtfsu5lppsj6un6ye16k67z2lfd80wsls70jifpurfx',
                flowInterfaceName: 'df7y86ohssxid7jdvbqmmvutrm2bu7ht70430mtu8igfjb5i74n7pfb0wmeelv771d92w5xjpqox00rp8adl566lbrex5otnlsup7hu57ytlbzw02ml4o9phfobg30uu31ff8fvegm3bemmphcd3vmgtjsmzb95n',
                flowInterfaceNamespace: 'j83cvzkef7o8ogj0jjvvatj1i7m4pjihx8jx0ams4a7dfdpj1cylzte0iyvw28uw8qwqscwgvl54eqbw8buf32f1c87e9ito4uakgdxne3um7in6e0tld0gpd3aup4lalhm50dclrqtw4tb26t8e4saewjtucz0j',
                status: 'WAITING',
                detail: 'Fugit architecto consequatur excepturi temporibus fuga minima. Unde sequi ipsa. Mollitia molestiae et quo molestiae consequatur facilis eum in dolorum. Debitis vel id voluptas aut omnis. Mollitia aut dolores quasi voluptas. Sed eos quia nulla aut.',
                example: 'h0wez5jqrqongpafx8aq6ykxxrytzmoydv7qqhth99vrxwaaqnbjhpzvfn8b0anp29xn369p3owvdlhjivougybv94lf6orm5itlmj6w385f0ucm0yi0shqtulnfq879cffl26lt8dcl6bddda8wvzfiwb1sr184',
                startTimeAt: '2020-07-27 06:54:49',
                direction: 'INBOUND',
                errorCategory: 'i0hsxenvr58le8hqh6sc7gziv95oe2tgxi4l99p5npbnoiu0cwzqcmifw238oabnr8nj3llc1lj2b2s707p2no3rm3bvr8lmyjixj251y210d8rfv8wxrsrg9pc8e2tbqk7frqeh68g8bn583wuv6mgq8p0xb8le',
                errorCode: '51ycropezds6dxn40min',
                errorLabel: 319110,
                node: 6397516222,
                protocol: '1fxvmstwjjekc9q1wast',
                qualityOfService: 'p7fgzg7slm28zt0qs5wg',
                receiverParty: 'lbky3kl4wg1lb1dgslymy80i9clk4de3am6hfgfxjp9nak2cj4g9rhc7i6lv2yx91nss962a4i7fot09jeejwyn98e0i8ze218o8tbnawajnpwgn7bce4q7to2gvae13296zzawncw2x9t0skwn3bgct56n2e28m',
                receiverComponent: '639dc4csqhpo0dv8b6ijxhtoftm9dixf43jvbezsjo500bqa0msg1v2thinixyviehyqdssc9gtng9q3dy7sa4ek36n0ppuayblwe6rxejezk1ijt4vq1vthiqmpepg9u9sxvwqaqk8d6uojvtkw83qhxk8eh415',
                receiverInterface: 'pni5r9tuv7hduerxzlxtfuis2ujdzihxcabk3p34jtcru7lnidk52tz0w3nrybe0qjecs948l5bwo46mfdn2amwp7pp48ti0j4iak8ooxr996xb55sq6vlrec6vykl51na83mjipejskk91ivasoyj4n5v13azvf',
                receiverInterfaceNamespace: '73ioi9o8304rm3ztirlcbp02nu23f5rboichhohsa1zrm90n3mv91z2owhjpafzxgvefzbva898sg1iw9xa7ar7z5inz14iw786695cfw6boengk4rte4apu5xnyyy2vtrdh7jo6gfkve8175p8gts7rr5ow1o2j',
                retries: 1103790379,
                size: 1717369202,
                timesFailed: 9248810871,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: null,
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '00mrzcoxptsnesdvs5l3',
                scenario: 'hb9wzdmzlbqkiywf13u5jj2ga2g3j2naiylf87pb628lxf1kcrwa6uu3x69i',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:45:28',
                executionMonitoringStartAt: '2020-07-27 17:54:42',
                executionMonitoringEndAt: '2020-07-27 12:35:08',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'n18lw1i40hlm0qxajmjgnl7m66z2fjxzz72etflwx9igwf0jo998e4kuh2gfoobuy533huqqp5fzi7fecxypw6qmw0rxnyuxj6sjls8crnrzhv8y0ypqoq717h53if6jq6nsh4zfk4ks857q6336m1kv5yloxvnj',
                flowComponent: 'uybjaqegnm1m1jlzko6sf8eauy0za1kejgtdj7krbu3zosrq9nw2q4zquy6n30fzf2z6ajtjm0zk9wgujw2agpxtc1p1yyqqz2k68au92nx05r6f26asigehbzxqm16572g8imri14fyydeceyyudrbhdb1v73ny',
                flowInterfaceName: 'vycic7giivrwit6iq15ueegu5i39ah1c1wkzrkcwy6bms2xbh5rl4vikihynh5fvbbkrjtiym31t478oz8s7pg26ymm0ajy6rhmenu6lvwey7quv9ob3ka102watfe7oi8uwblxpptq3w6np819te9w798wagw1c',
                flowInterfaceNamespace: 'g6j4vaqfo0x9uit82g50sph3zq3vlqjx74hjhn54oslfduh9qhong2ix9v1w23x76blmaenv87gphjtdb8tfmh5ckqsp46h61k5nflg19vbmrantdqhdrpl1q4afx1js3j7fku81is8v5i7so9st02oy9jc7enxp',
                status: 'TO_BE_DELIVERED',
                detail: 'Excepturi beatae voluptates quis aperiam. Nemo autem hic fugiat blanditiis excepturi voluptas. Aut at dolores veritatis omnis nemo excepturi minus tempora qui.',
                example: '8967fnxztkql54gpaoe4kh57mhkdu5tmstewzn8hfe50rykm1thv1wbvh1fx9o93bb327uiprjvyk9l8yl94b9m18eycgyoqxf8982z4p0uvr00ffyviuz5wtrvlj820hxf8n6zi3cgn54mvomv6aygfl7d1k065',
                startTimeAt: '2020-07-27 18:11:39',
                direction: 'INBOUND',
                errorCategory: 'q4uyisqxk3fojjrw46ryl5anu9kouvmxnl5riwrga8z2cg4nfpz8wr82q83b68dwn8drzgtrry8idxaszdsaqsz3bz3bq61lomqhfjrs6kud9juqjru5f5fid9gel5cxzqtnzosnnkzs811xfgs3wo2l6pegyjd9',
                errorCode: 'eawvkjq29z6lbpz4dek8',
                errorLabel: 852604,
                node: 3798317139,
                protocol: 'knf7s9clkxn6wjwdlx19',
                qualityOfService: 'k6749ufbhg4bv19p6mr9',
                receiverParty: '1qi1k6l75pnijx8p3g1vecxnmgsamzk5i865v489qt5m111fiqo6lrod3ofgani8v0zkmgzb5pa18hx7og1ewmrs935xdtja0he7g6sh5hsjoeqqwozx5cw2isaippbthifzux2dnrt5rl031swuw6r6ap31mb8t',
                receiverComponent: 'vciwcmjrjztt78cpwtaz5xo1vr2ee00tdqmfifqqlbom9787284oaqv938ttbg64d7mhcmol43d6xvcpwgje9bu9v4s2v96bgfncfyj8bxzqm8tchzfkku8pf9m9c71bc0ff4gl999hmp3suxa92o79xkg11gozw',
                receiverInterface: 'x5h0dctmplv042c2p492xru95us5422aftb2aimw4bhg9ypx02ho1itq2xhg8my4pm8mkc5wj6ak27695rh8umaaf51czht93ane0mt1yrktvsag9x6o88my0ro23y26zddzxdg6ie9sorumy6bucu6y42964g5x',
                receiverInterfaceNamespace: '9owwty6cy5dp4nh2xkxbazwayxwzokyafseul52o6t5nfr1vkse52k8zawg5wrddxboljgkfw7hre4tt5pjhzc27e3wafz3vdwcd0douvgv69dyowdicnobrbomto463ggw6u7enjm4yxlob5t6xu3i63bckvzwm',
                retries: 8387576420,
                size: 6744965816,
                timesFailed: 2212146392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'scvtmtua0sh8yjqo3u4m',
                scenario: '4b7tdhin43j6u2ld5z561xmx1tdefgz84v6osmlcc5rln0u1uxltdlbo5ak8',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:01:20',
                executionMonitoringStartAt: '2020-07-27 17:49:49',
                executionMonitoringEndAt: '2020-07-27 12:00:16',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'ztl7p2mwj7a0i2ohkh49kftteujdiagaym9boubm17z5y66unofbfi60r2edty68fgyzr8qra1ub87gz5b9h7srwbbz997z1j8beeazo8qemtpcx5ydtl0g166vfntxyvmf3epk372q4773bzhzqnfgjw2v21op4',
                flowComponent: 'tq1mwaowyi5r242jpqtupt1x3yozcl4kvob0u03thv9bhh0t671yhca6r522xribhoo9x8rp2j2sd0npojo69s82vs572y3fq6db0ascze2xzuf2in1cjwl6p0kiy7w0idmnkewoah1397au95xpc0cxb1xnnkor',
                flowInterfaceName: '4jom98njs56z2ibzl7r1bdrcre5bxcdoxtiz9cdp5t6tme72xbas02nxt6bhaogfrz8zovkpyfpxk8rsho1tqdtqbqa7di834bzvsuc1v40fhgwb4byw15x6ed2xnvmuppfd70t1pjqcoqoalidja48w8poh05gd',
                flowInterfaceNamespace: 'b4guptmvcig66792r949x0p3i0szrxiajousoy7z684ojhw6fjsu0jwmazh7yrai51lm7srxckaksokngr5n74kmjkiid5c5dzhau1r4unkabzpej03c2xcdiql5yxi26wm2qz1w2l39us4jv7e87ractz3ccoic',
                status: 'CANCELLED',
                detail: 'Vitae quis accusamus eum ratione rerum autem. Dolore qui ut recusandae odit quam. Et placeat porro illo voluptatem. Magni quidem recusandae quidem harum rerum. Quis est necessitatibus quo repellendus maxime repellat.',
                example: 'oso71u1h3ckuocg32k93c8l0jdaks6z4hh431amt1qxb08lhpzv5krigoy0h26hz0bwbla4dixk43n712ooo0y5upf7626cv16jy8ti6l9k4wiozm5ay2nwj75heh8tpnomce5qr2vdfv1iirkz65lxz4cmksryt',
                startTimeAt: '2020-07-26 19:45:20',
                direction: 'INBOUND',
                errorCategory: '65djn41h212hy8v2lmuogupcf1gnjcwslpc5f9951mirqh51ct3s5ur5urti9f9w7s8joi9oynjuetefuygmtb98fup7tv32rbh3uenmi7ms0jc9f1d28w3btili9kve0o5d6lsemzpjm2mjljckebup7kj1fcjl',
                errorCode: 'e31kp97cpwpd4kxuhqv8',
                errorLabel: 569786,
                node: 2048861114,
                protocol: '6n02l9nu278rjffgaxyy',
                qualityOfService: '0r0bbu8nw1f1luqhzts2',
                receiverParty: 'c92y79pgj9or8hhkgj25avekv25p30lh8r06sgba8l55g5wyx4lged80d0kmy1furz9kgrw74rgjo2ab3i4ecvh4bhv0f5zosn9cgd4lxfzugiaxxf97jdo8byjs8elkjefxi4fz78b1qw76sn1urzancgqog710',
                receiverComponent: 'egh054qxsa3syceq5e8mkuy5ckbc89zmkhf5ehb5rrdqm5tvd5elakzzpesm4q64m9cna2kaz5u297meqdrwftgmq95co1vmziqkj8iah3v2ht5namvk24vry9skt0v6isqkom11k8317o67osg7izpjjzcrmuak',
                receiverInterface: '14x173ja2ezyz6pgy2vjjno9gq8mxztny3x8ci39zexhum83u72n57bkbzs3d5b6x67juyx64z5f6do7di7qlsijf2pwizdo8d3mo0b7fnd5wsgdl284zm0r947j4c48o9nz9yhrxg6m1i74drd0rgzlb122roat',
                receiverInterfaceNamespace: '50ysvw8ijuvhj25znom8x2zs4k2lsrzart432rc1l1uzt9818m211zlrslvq4y3m6i4dkkw9qaaujmty46x4drjckhi8fuzgx7zfm2qna54wbe52jcolm89or68eu7die9x8m2w473pho4z2u2m48pupaue32f2a',
                retries: 5377282551,
                size: 8656424490,
                timesFailed: 6116389018,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'qlk79726128t85vtcganph0fqoio1hihvle06tgubmighxuwem',
                systemId: null,
                systemName: 'q3lw7okyaclrjd7axe96',
                scenario: 'cbehennlfxghqpgw7zck55gt6m5m6199mdx4lew28oulrfraw7xr6byzoo38',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:18:59',
                executionMonitoringStartAt: '2020-07-27 06:33:42',
                executionMonitoringEndAt: '2020-07-27 01:49:01',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '579bvg1ki9nsmienty7rcfygeptdsixvvjnncwoq1wikzcn2bhx0kxkeo7dwcstncmosl23pr6hnd00thahxd0wxlc2zwugryh99fwypbwlqmppohguoiki3ylvrohrfq4fmj8d6wlkjg57m21ogv7bcqqkhq3kv',
                flowComponent: 'dzh5qpagrhhi5497bpcpzwbp2xjutllpo5ty04xb5qanchpnew5r4e1fikkle9kgo8l7ps8k6gde81167djast4dpxjw90o2jm5divjgc80hc6jb6phedxik5nxbz4iekx1mzpu0z0t2qodog1ha4kjq9ap1hm2w',
                flowInterfaceName: 'shtnzwlobevzjfxenkubrbp019ewc0w3sr1284j98xan624ib0ja8l77abzxl5d7tk2e3ecwmx55xrgo9taefgmxmx32zpf635szb181ohz6spkuaagq25b3eqdx5enmt11flbs8209ld7r55o6q5we5uyihxrp6',
                flowInterfaceNamespace: 'wwscra1qpuqw5kccy053evip6cnd687jtaemrk3glcq2fkib8ww0e4n3244tx3yychw76s03v6hv460q2zm69i5vfsoacofk16yejnuzkkj9e996vmeag6moabukkgl9rz6cl3lz4b58k7nuovrafhxrgg1jygx6',
                status: 'DELIVERING',
                detail: 'Assumenda voluptatem voluptate et quia. Numquam tenetur praesentium. Praesentium voluptatibus incidunt sed porro voluptas voluptatem quae.',
                example: '2j8k5nn6rifso6z3q418skjd7b1bkhwreexjk0bnjq2toazvzvtzmj4yx7ciuy0m7zqpvdimig1yw2rpekyfbvttlduibk31qvz7otg7f3jx5ezpacqfv5hnyoljmzvv55v3le7qi0us6fhfvvgu1v6hy1oayy76',
                startTimeAt: '2020-07-27 06:35:58',
                direction: 'INBOUND',
                errorCategory: 'di5fme1qevhpcf2wrcje16ihs2q3ll6dsv6xaqucjbt36u1n9zek12bzvh8vp85wvii0qfvxaj0p2bjbeuygu7gr9xs4ra0tqh24xy6qriz2drogv15707mlj235tjelh7oz9lkrtnkz6jb3fiowy93mau7wnw8n',
                errorCode: '6o0lvm6n4jryn22q7unh',
                errorLabel: 319136,
                node: 6331203412,
                protocol: '1xzsjim2puh9pnl9c9w2',
                qualityOfService: '9t1ls0ejybq7kygenjyk',
                receiverParty: 'j7t4k8tz7u0xgyqogmtigywjdr9quqe3sjw80snou5nl6fdsvirsukwc3h8hhuqv5yk4at0giizbqnt9d9ptcqpivwk71hg5b4qmjpmb3vr23sx9jji4nbmht7vghkku00o8lyxnq93vj7ym8i93z1s5zutkp794',
                receiverComponent: 'ytczxeo8eq1iacpzqadv7k9cpdmye9bva5m12r798r8m5zw272g8wcbh084nxsf7oddmt7pm663ac6d9nla06cz78sl4snmdehco817q2l7it1e16ryydoem4t0h47olfoecs0ipfmy6q5pw3med7rwtd1mvudx4',
                receiverInterface: '9uwc2nvudh6hw8kbyfa569l0zw29jw2p323g8hilp5k4d4973q729m2ilk38e6wyudaqc30qqw4i7mvyw23dde7ek4mdd0b73hu454nzlwn3b60z9dj5hcbew16aiudt3kef4w8qorgw9zl86a6zbjwaz9fdwqw0',
                receiverInterfaceNamespace: 'h5453xyetqy5aiuuymjhpu35qd98z87f2blnhmgnrxbfe07lzwl5gs5xi9h3jlteto61gbx1r7ndk1stxnwq1e3jkdav15qro86cphuj98qeih02qi1iw0h0sx4pbzxxjnzpev0nam20gjr6x5xax1l1qki75nvc',
                retries: 2443502132,
                size: 6810666916,
                timesFailed: 3049291062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'mslld4vomdxj4vl8yc5msmybwyl84efavsza3j5qbfggttth2v',
                
                systemName: 'zlzoemp3617qlokne86a',
                scenario: 'rmp41rsirgxgus7ck0iwgkxyj08l54vy49xbkh4t2c2f1cqjf6gm0ce057xv',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:05:31',
                executionMonitoringStartAt: '2020-07-26 23:44:33',
                executionMonitoringEndAt: '2020-07-27 11:49:24',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'l0p7bcngisbvyr15nexod1csxystqydlfkel05n97ocfmgl0xuo7itbjuetbc7mw2thtbwwkvtsjdpy0kbeg25n6z19mzov4smh2udpubtmhaeilxn46gxszdy8hzyv8o8ytjmuhyerpz4fbi8plgopeibd7d41j',
                flowComponent: 'yyhd948a3b5bahb0m667gns6wl8f1q4bj742pn2dm290xryqz4s67rim9wjuoji0n9ys595ccyt464cpd7vgbur5lwduhuvjxv4yhdwqzjaaqacoq4d28gdw53zwjhp8h854b43sk7it2ptykksgjvhjs2ttb872',
                flowInterfaceName: 'ukhp7elr0hfugikk74qbvzjxjc3uptqfyf4topbwjxw9zk1wb1x5bhuqnl0m8lqgp42x0f8nwovex56j58y55t77sod0ry0gidjkpap6eb3vas9tlra3slk217uk2s10qql4gusbwhb6oa3ybfzqqwbu0a29wkry',
                flowInterfaceNamespace: 'xvlqvroznyx68ss4fyhgcr822a8d9fmkoy2teitwdfme3n0zv8zcbf9ww2asicot0h30fkhkkk6enicfl14h9drn9h3cfwdrr6b4wdvtuv4b0pmg5iflbfotkj7g49vdn6zl700b0hfbziuvwauoghaqesv5r3vl',
                status: 'HOLDING',
                detail: 'Quia et rerum quibusdam aut quis dolor perferendis molestiae. Modi aperiam et perspiciatis qui iusto. Culpa temporibus labore facilis voluptas.',
                example: 'nhr2jups12j8c7ngqqkvzvkq3ke24sh315f5uc9glnq0k0k0mzn46e4l74nc327qnsaafdmzi9xvkrelktj6tpcnrx5n7g0915wvpoktgn0e2ytzjh2thm7zeo40gd8pdx627hnzput70rwrxr22rgax5gx6ich2',
                startTimeAt: '2020-07-27 09:13:22',
                direction: 'INBOUND',
                errorCategory: '8wacq13crjklokc1wrnxtr9zm27965b1s0hep4xzwxwzxcojdy22i3u6pa78plf44b5i4uhcbbual771ouwfah61x6agh0p8x3pu38ragvy2w9kd6x89lgt33r7ea45ln7un6vwkujspgbj78e64kfl1oqnpcrd6',
                errorCode: 'bqw2mzv3gwf49enzwug4',
                errorLabel: 720611,
                node: 5539970428,
                protocol: 'x0s2msoyhod19wly8jhj',
                qualityOfService: 'reyo1k0ox48mjvwi9rdr',
                receiverParty: '6xthuvywahrz4yqj10bqhqurfsws6fnirmcjevzu27smzwc4cjnvhekocl45fjcmil30gviysohx0wrxrv9a2iipkgez1ktupo9so0e5tgo49rn6fc66cl760ldqvjjcm47ev6tnq2hzft0r9qb5mvz1m57ulqt2',
                receiverComponent: 'kexzwo4w4z17rbu6qev8hog3pkr6kvcx68esql3ybo1ofwslbeqzc8wdgzdogs8bnp9m9pcxg1t8zqopompld7qchkuvw00dimpylamu83p2fx4ufmpi9botvuhumcks88og4ecyt8ezbdmzjp0fsf1kqd2tlvwx',
                receiverInterface: 'syb11g78907oft5k6ga9d71d78ptz7daimvkmuyxq4axdkhbuz86tlk9p6s9b4hu94oggv7flv2hhf26xjev1080dsco4qo76r1pjg4rx8n87usux2kwlxjfii1bxcvclama6easo2n6epihlpl11fm7znt9tzal',
                receiverInterfaceNamespace: 'rdqbsoux30vjxs0yf49lo0uhua0xhu9ezzohrt1dd4o7b5k4hjlgl6seflzlrpit53rhe01sllt8sspenv65v8yarrl7fkpe7eqfjwcy6tub4vtjplbi76v1bi2l4hvxgg4mcwre3w3fo0rst81b623w4q605pir',
                retries: 5557169340,
                size: 9996832845,
                timesFailed: 7637665610,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'nip55r7nttj9d4hzkxzh4ciouyucge9v067a65u32skltcst5e',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: null,
                scenario: 'o1hixuzia7jkv3z6aac5r7l6aqxfx7iyeiakuajcjkods1uxw31qwwolk6d4',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:06:08',
                executionMonitoringStartAt: '2020-07-27 16:20:24',
                executionMonitoringEndAt: '2020-07-27 06:54:08',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'zqzqj6pt3wz00ip8n4vokh0aehrevox00ckfbtp9mm4n90gggv247q0p09ga9mn9164r98c2c8guso6g06tnirjczsfxfuxy4lh9t3soliqrps651x2fhybd230edlpu6oe2wjtywb96oqx1ye59h1uj7eclxpli',
                flowComponent: 'qnjb8atmdiv5u7c0ejtkaa8m88fcum76i5f19liatrf32hl3v3glamajz90x8es4umds9y5k6dxq1wj50h513d0qtwb5a3dgs00titfti3ztz1kuodve6fpa5tqquyf1jnwqvyyfeowyzwekufsbkh7lyn2owx66',
                flowInterfaceName: 'covyqwq94d67h8jojhfxxns3xcm8f0a8yg27x6zaik3rrubu4za9jie7llvq2mbk8gey2pnjwgozdd4drpx4hh79axz9okihyw9hwlz32m3a4c1q8xjq4r0aaok0upk3fvhdalwdixtlc6m6n31ykbn5psblt1pj',
                flowInterfaceNamespace: '88elvdbnd44kkj3i0nit7eo847e2387l49iio4h4icju2n3k9o53egfqjwjr78ms0b2lekvjwhdu6j3s5h7ibhybzmobo1dhfoncsvilxmcaynhgxwl0dzusn5wvt2fq5wfd03o56gcgwe1cfcx13yiqs1ve3apm',
                status: 'ERROR',
                detail: 'Culpa distinctio sit impedit est non debitis asperiores nesciunt. Id et molestiae incidunt inventore cupiditate dolores odit debitis qui. Accusantium alias dolorem et repellendus voluptate. Pariatur autem quidem dolores. Et vel officia voluptate voluptatem non. Quia nesciunt laborum fugit expedita architecto quo non maiores.',
                example: 'rgpgivn2agiqehvbj1moy5vz5d23pkevbopdpv6mnotg80twv5q570j5rpbjiiro3fqz2rgsvf15rzussal7t5k28s4egqf1z1s1ejedlen4whmu4r4icpr4laf4f4whe0hfku6ueh54d74oyl9dgs6339op3y1d',
                startTimeAt: '2020-07-27 15:06:31',
                direction: 'OUTBOUND',
                errorCategory: 'tufff6n6e5mz1bz6dfn7y6cvffsbgy7wzb2m5r368v2qr3i0qdcoq94w51eeiwvmi3a8qfjekb2r2tb899h1s92c37kqk00ym2cb79qhj90mmo05thori8c29h18lvxm4t0v4mei4ibt5twui6bop1due2k5re95',
                errorCode: 'reux5v2o1ztgou1tjyhf',
                errorLabel: 637227,
                node: 7805791508,
                protocol: 'sqy4yql383xv2934f680',
                qualityOfService: 'gswwzezge9qjqzpvohb6',
                receiverParty: 'r0tngrkwqmr5ikd46h4ckxr26wrs02jysexlwg0xrucfrwi9nn67o8ziv1stlz442uhbafuhtu4n6qn5d88uchcsbeth0t7joy5hx3qhc54vsfib0zm706qdbm6ve4eg6ine33ilgjctjzzd4usb7zg3xkwp9lnv',
                receiverComponent: 'qa1p29dn2jadz7omx5g47o8ak3ix80h0svcthmuu6tkh2ahtram026oqe7vsbe8i8v4r75oiiycfo57itempp84ayzf89cusjc1wu1tukcyicg7vjoz07rw1ntdl6dzxx2cpc9z2utmmd7f0cqaab3qgo8owm5n6',
                receiverInterface: 'uywnicb6v32m7hlyqa6ktlmoy0lmny7seuycwrcvakygpf783h6znpdadg93grbyy26i9a90xmfw0zmoprsnj7c1zbfxp225tuhpivk2u3bmlkwnvx2fnvvl3c3ka16m5jrbap8gpea2cijratq7ib9e6knj8hmb',
                receiverInterfaceNamespace: 'iu1o8qww86in0r4nqc8cmbci6pjjcewwwv0bdcxvc2849t1foq283bdoye345blu1jn1pmgxdekwi2zkw7wo78dqhmkhn97r3ch0wi0ab6b5msm1q8w8lb5cbe817j47huimn2nj8au2wbk7mgx7uwp8a4zqaji5',
                retries: 5851860574,
                size: 6702583338,
                timesFailed: 6636509394,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'db3ngu4afxh8wbvom41dy6p5xcmzix57v7rzpf2wsatra7hrm9',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                
                scenario: 'n6vqs7f5s64h7599xhm2ababtvwdpa65h30ocstdmytmaaizc6pjs1i5p4oo',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:38:40',
                executionMonitoringStartAt: '2020-07-27 05:45:32',
                executionMonitoringEndAt: '2020-07-27 12:34:38',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'q5ct3xfpzfluksnpmtgf5kvcsvjqzejketg1o2uww7i9lde8emdrkzpo4k1h44c8t4cwqd77xuixsfwfm2jseiti6vu9urt9ywq118oxxkwgxybsidgzp0ez52patwc72494pd76yd695at0hsyc80cmikg6e3gp',
                flowComponent: '40zwv1txpewhwclttuwkqfnqo63hvdud5uc2gy2tsa7ytuxuii0f4sngax6n1ry763gsiaulq3h9m5l9m9ahywc3yndjj2fw92yisp0wsvhf0k8helu551n1jkq9wjuqc9kp244bgwl97tyudpp7msqc7p0cjhay',
                flowInterfaceName: 'm2minb4gkm4zdyomq65dtnw7fun1yz90ebly8ddqi63z995qhc7hr21mva10l4lcjeuoua7o28jykbvbh6xbe7eo037a9ejcbj5l5lsgc8fqw4z14c5boys53rrcu4g4raos7ud21qhpuiy21djedhls1bba5aqf',
                flowInterfaceNamespace: '9xz2754hiwsrxkc3bpzcyzqxp480ezim7e2frvwwp51twt3yhe2w1z0urkncaobeuo3w1a00vmkub6yrhmrskigk3j342y71og0zubukpf0464eza5mek6412plnjzg23rw3kcmqnuuajua7kewr28lyzln0n2fg',
                status: 'ERROR',
                detail: 'Et aut nihil repellendus dolorum. Consequatur id voluptas voluptatibus vitae sint natus est reiciendis. Non et maiores.',
                example: 'o76dsa0aakryaogcfq2re8s4tua1vw75nbcvbn7wglado5q1bt6g7cvwm46fiz273a71bn9mvdibjsrkq9v21a8lebt5uuubj7etulgmt72fux4j1uf4jb6hz1w4d3pndnnpughx50hksal8es3q1s3x50l1f5m1',
                startTimeAt: '2020-07-27 14:18:51',
                direction: 'INBOUND',
                errorCategory: '7vg1h40s010bbtx25eur88iyrz3tuo8eyy6phkf84xgnitagk4xqruxxxv2ouf3n49v81b5v60pi0xjcubonvr7j6onz26zdc7h3gsuu98iwljk5oidfvbe3vu0tukbpyje792nfpk4aejf4mze7kzs4vbuf5ecr',
                errorCode: 'j50yfaib5p4lpibiyz3j',
                errorLabel: 475358,
                node: 8717890294,
                protocol: 'pyrk7689c7ddzdivgiwa',
                qualityOfService: 's15ypi3z0v34t9x755z0',
                receiverParty: 'qyyl77pe4ayzqyuhv0gqtw1xm2rzhtuo1zc3dl5y3qhoue8rcimqjd0oelke93u8voeq3ya5l8m00u1uz7axxqgc4asa2dtedh5sv0lt5lc2f2w3cnxjro2rodcx44yz8fmfyetrsndsecymf8m725q2tihp9psm',
                receiverComponent: '7ld8kpam2bsrcjr5v3m7y1hgc7p83z5l9k3xy5za2ep26diq7mc8sqfvwlv1a0srna9q96lghncopoz4ufwdqgvuzfb0u5lv1q4bhga6n0eype962o16fux1cpo5ek1ure5kjblnolid8myudbeq6qvyk8jl9k2f',
                receiverInterface: 'ilbcqrtfh9yc21kff1gceg4gtyufzfa01uw12xrf1y5n61hb523d18k4ivbjp6gxjycgynfimnw3gt5uzo8hizruhu2ayurkwfkabjcsp5noxyzrgiehb3j1ubmr99ndqswa5rwuope3h9lpbfowd6uqs8j21x1n',
                receiverInterfaceNamespace: 'n06y10wpvlmuvwxdg82xnaujgzjm0uot03mp274knhawj63vrctghtckfp2zgr67q8b6evocexb1ts0ta83pcv6icnyv6aw0lyutabk6uyknlq6x3y0j2l7qlj4t47w3u263ejye2pw3krjqm2eib8bs8stuusza',
                retries: 7277209786,
                size: 2350037193,
                timesFailed: 5694631887,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'cbpkrjyhx27yxo4ymkv2q9240tgbpndrr55ufcix2gfwca6v7d',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'mpb4k1uy4p04t11vixy2',
                scenario: 'v1g7pied5ycjc9wht98f0em091px6di1ln574kp30y3wvcplxbbxbjsick90',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:32:07',
                executionMonitoringStartAt: '2020-07-27 11:46:00',
                executionMonitoringEndAt: '2020-07-26 20:38:28',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'hbj3jazrf63603thvpdehuw7ageiiuxpldxomy44rnrr2f7gij9i2t12cg8k65y94gu4h61739hx04edwfh0uroijcryqp1rgyu9gs1zngnqp3ghpevvbrb0c1yog3m3mjhcmlls5yyy7jvksju7fljm0mbwv5km',
                flowComponent: 'yn4ssp2a2tvb96vsuw7smqdeh0w4fk5tse9ix812gb0e56u82ntl3oeb4obhxx1wxrdwpohdqay8890q9ziu2ckzhdkqz4jj1v9lahpisscq75zm1573cfgc0le26g1yns72uyt9l8dcu570dipr67exfrtekd1m',
                flowInterfaceName: 'zl5wk9hbpoa6d0ogh6r7cboq67u8t3wuhjsx1wrlj36j0hucvjq29fpmvw94fdb6h44ovxo076g5y1yz5h3ao72k5pg8vka9jf4kye1mhwn41kqx8inc89lzlbfnxbioycn71bbb223enym0twu2xpbuzjiimrei',
                flowInterfaceNamespace: 'hzmfee7ditgthkmlu39ucws6oxc4hywbe97vc69ubefuctis13txsx2vjjxtqtigzrno6hnb4n82bb7duv391lmoocwsgvxl43rlhmfq6kmpt13sjoa4u1paw2yt7vfiq4yw80uk2ya8ccwjsmf0r2g2vwewm17v',
                status: 'DELIVERING',
                detail: 'Tenetur dolorem aspernatur natus tempora vitae officia nisi. Modi occaecati alias officia vel unde necessitatibus ut officia amet. Fuga nulla minus doloremque enim nesciunt id veritatis vel. Nihil recusandae perferendis blanditiis aspernatur consequatur. Tenetur laudantium ea quibusdam.',
                example: 'r5dmadt7sd02kybedn54pvbzyg5b852823nrtmielrcdkh1m29h5nnql3w7xeka711a8456s13rmtd6oe4wxovd2q2uqy41gohf1jlkacli1m9ndr07loxtjyn6tofxlt42ghvkhiyex43sfu1n3jsubmrci5eyk',
                startTimeAt: '2020-07-27 17:11:11',
                direction: 'OUTBOUND',
                errorCategory: 'ht2crgxjnltqdvb9uo8wkuirzzdzkg6m4dy0y5krspvco3fejp3av1kjasm83tknyvh1oxozhgqrodfgpt4qx61b5ticzgtb4d90w0ylrfr6ac2glc8sat59921muzghf61g4anmv7k15v2q6efk55jgnyqf7a34',
                errorCode: 'jbxqgjotze7t0lwp3yvq',
                errorLabel: 870118,
                node: 7713497507,
                protocol: 's6ckz2p5u0wfibrd70v1',
                qualityOfService: 'dljqpua27jgf2lsw7b8u',
                receiverParty: 'db03exawo7ptua5c9d9x7z43sqixlreef3gfu6sse9rolx9i94udjwog11n2brrksppfzdw1cu848zd6nr2t01ssrvw5jcig3uqpaah5pzgyjk0v5bhv3ok2h9ops26ipy52lt2u7235evr3bzx4lqllo2fz2kz0',
                receiverComponent: 'xk79da61dj4a1g6f2nz5eb74u2xj77qqc1h2d73lpgsx3xgu8yttfoi2naruhos5lmyqk5empb19mv9put8z0pgmv0lsetf2rvqjvlvj9nr5dij6lx8bghm4z0n0a9yn15p8apwfzbwtgpwlohg5nt6gtw2fvtk2',
                receiverInterface: 'yfpvyq5ov3ll7mpiqvvhpgsvvp8zsjazts06x5nqniyi3eqfq33t8mhc808nz32u2pzs7zovtlp68vranf0ef8p9atx3k5lcmfla7dqnbwrpw9jhm8vq1mslw2l7gjexopvea3zkoa6nigaft8txb8gds3e03bd0',
                receiverInterfaceNamespace: 'natepu7woijynqz4uw626suhupg2yuzhbhw69qv9c4crdy172vfntz2s5b1ow3soyvmjbhaffmf3z7t478a474652fsfmkyzxcl2is86ofbi5k3mt1kgqmiw167fs0bcda21yvyqsm7bmqx9bd0fuvlvd0o19px5',
                retries: 2922886720,
                size: 1911195292,
                timesFailed: 7322096050,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'ne2n8zsune71dg4w56t3wguvdpy3p0ud2452c1tteussrm3v2y',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'zll0zqiblo5c2kg8gonj',
                scenario: '1jmxug0rgkbnzr48ovfuz61lso79115ia5l463wvhv25hv22aifpw2jcurgm',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:12:17',
                executionMonitoringStartAt: '2020-07-27 17:02:15',
                executionMonitoringEndAt: '2020-07-27 16:11:21',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'eel9h0012d1ly0n3g7mu02vt2vayp5jywq9jahn2lhepc6y5fkt0rnn9ctkwqmrmmhpuom42l8epdmdthqhp9jmm2yqheyt97sk725mut2v0x9s0lg2ulxthlw7msjqljxedeyyk6qupzcr2225u3zqgbbqo9xqq',
                flowComponent: 'x627gyvw8modax72v1zwcyp4d2c6mxwhjkjcgty4qz6x4iecpqbjrps04g117bq3isizhvfk6jq4ak059f1dyerlvslj684qdoou2c7u94s1enb6ss8h72kj52720eahnewojway14409ckqg75lap00553nj9sf',
                flowInterfaceName: 'h0s1i3sg6243923hzr2is0pztp9uk6vfajekt0fr6ck95djj91j75b1onec8xrk2j8b7qjpo8ww5ndm93858snmah79xav06exalxqxhtdas8fox2qgqqlcuvd8s303z4v48oeaoh73vzfi6o9fi0x9taj6dz5ug',
                flowInterfaceNamespace: '3d9b395zhc77kwi0yturcycarfojheq8nnld00om2p99gw64dtmuvrn7jnwxupumhrb8eec79bnie5gv2j1dkybfsb622k551dlgsv35zdpa7oj6m07in63d1uf8iapyyh0lxg6lcu2limd9f71l8e88p152584h',
                status: 'CANCELLED',
                detail: 'Dignissimos molestiae eum blanditiis repellat. Vitae sequi numquam et possimus repudiandae vel rerum. Dolore eum voluptatem quia. Minima numquam minus et nam atque et ea quia. Nihil doloribus iusto saepe ut et enim vero.',
                example: 'bdww37yuhj6suuyl7e26xqiayfnx9rkp9g2q26ds3uavoennqsa2aqkz48oohe20s1xkp67hgc8whpzqydutug6097aiqt7jerfrz7quyhml2q7mgeg63iqe8yg4gh24vbqet53c35tvwcg9l10e6mj9k4ee8uvf',
                startTimeAt: '2020-07-27 14:16:22',
                direction: 'OUTBOUND',
                errorCategory: '7jm3slypbkm2cuag166syiorhl1p07j5sbzqv4be64kgca5jnxh6wt876lhtvk44j2rte1nahp81jghy1rulri1d5ryj1gjd34si283zjao3q3fjcpo9ko0p1jtncojs77qq6ytnws9fd4nbkl2ib8cjluu9nyhb',
                errorCode: '2wu2fyuq0s3ya7f1tm8b',
                errorLabel: 144207,
                node: 6764016151,
                protocol: '43ekp09xzomjpxpqbvcg',
                qualityOfService: 'i01568fa40885oi2ohy6',
                receiverParty: 't9ol677vq35ux94x87ateryvp79wkwe5zjin2b1vsf4z2s1723wqr2zjxh8iziq6fvtj341f38i10eb299kmr5ska5u27k456ww2z376m5peevx0ynbq86wuvaghrb9jm8g0sunesct8m71cgv2eswyb4l6a03d6',
                receiverComponent: 'dwe00cuw8githgr2h981or497qdnl7fu7z03dhh05amtqdkgzoipi8gfeplcfzhsu9r4zoqdejr2ppkiw8i8p3e8gwk4i402go270gwpgo8aainurtli9e1zs3kshe9rokd50zkqri46a7hhhy5r1kz85eab2l7j',
                receiverInterface: '5xsqsud9lerlsvqsmi1r2le6f8gb5ohzz0pwpn8t82lpd96krvcrou36isgl5d4awzr1zkdwfk1qarfj4buvm5e85t15ouiivdm6xn7nm72aot9qolii91odh4elm3qwrls5fm8r8hs2a90buaj2w7wmghrhvwxu',
                receiverInterfaceNamespace: '7cgok0jeifttemxkhbk9sjdo1trkabp9xp3i75um945gknki0dpoqi0ltyot3aj41jdobganey7unqpcuk484f9jvidnhx8ttk4zkltch06l1jcozciyqn4ury11rxb34xs2jgnl6tsutpihedd85k5ht1kr28o6',
                retries: 8769453413,
                size: 5625679717,
                timesFailed: 2408893013,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '3o8i8ovh15g5igm3gzcgsuu3j6dqkio01dt9nwvlxno2ywj9q2',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'eaxzq2nm91g0omaueinf',
                scenario: 'ivbbmvns97az8ru7vdtt5v1uz9280hzeui4dd5ndzncpbkz17dh2n0ki1xds',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: null,
                executionExecutedAt: '2020-07-26 23:05:58',
                executionMonitoringStartAt: '2020-07-27 16:26:39',
                executionMonitoringEndAt: '2020-07-26 20:12:48',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'nsfl1f4rt4h2tq7ojghjkiqhl8exkkfo8hgmtht8cdvx8neqrkuphk853b86chjqc7spx5lnzikkywz914if6zbmd6n0zks9ld8jk2wjwy722a26fq7ytg73xlydumm2gz4alhlohnsnrvruy4ahylwnb3s58m01',
                flowComponent: 'msi4aopvug80mp80qtw0dqtmdusiv2twz28rmihpak3voxj926srk0i4g5iullv3rjjkj5tc7gk14loq3hteror5e0itj9m6v9ujhtdh005ogyfhrlrmane007x3scxxq4tvbi1gjw3qbq15m8r19jaiak2xifpy',
                flowInterfaceName: 'ekqk6kjlzenllz3upcecj5g00h0666qxk4lweaeo57l0fojdbs83dhxi9qossq6x6m84m6mvcrnjqcmxu3n2537p3vpjs0nh4m8aapqvn47iipse01e52pove9nbwl43ifexfryge448i4gd7mdimqclzfy0k7x1',
                flowInterfaceNamespace: 'cvkiagh9i9droknmyfj8slipxrt7e4w7ijnom2uaofxcsrjbbeikpr035j9c09ntf3xmsim55hyt2p5c67yaoes81tw5ejfizmjlfxcde5z8hw77zqjpqgmh1iilztb8r330wdxle6z50fbgezawgkvo3xdvbysf',
                status: 'ERROR',
                detail: 'Aliquam consequuntur nulla. Et eveniet dolore illo. Magnam perferendis aut molestiae voluptatum voluptas omnis sequi.',
                example: 'oj8fpll9h5q7w5c8850tfj62ku5jukd15ne2ppyzw9t80jx5e8axbjpo8x2im7isugk5g4iawc9sybzn5tu1df7ucuy0wvy701b8b126o7bkfqnej1wjqsuz26sh00fbez0ag8x8jnsjzfwud56n42kvs00rtaj0',
                startTimeAt: '2020-07-27 16:33:35',
                direction: 'OUTBOUND',
                errorCategory: 'e2ddylw2bl5u7ijz6itq5gohsiwtr49t6po2tqzjlhqsjtkme79s6dd7uvfa70rour91us74q7cyqm0mevwk3uv6rvmi1neqk727cmobyl82ffcd4g1v6cwb3w86aidjhxpk3g2npxpcbjwvei11uapprdun10uq',
                errorCode: 'qu0qe8rsg7eremi5g5ko',
                errorLabel: 921261,
                node: 4792324502,
                protocol: 'y8ppdew7owc33xgprfu1',
                qualityOfService: 'v2x95qe9h84fifnbj6oy',
                receiverParty: 'heka8qvdqxhus3gbv689t352zz2ms413spdvtmg73ms90z231wlkgh2ek9m1k5usnz1uhxhmn5jeon8shndt26cfm99w10w4b4d81be7zvru75j6vkn1v42chltua9pw2zkozyqwbtqq44d21x05cj60yubh1pqc',
                receiverComponent: '51d3dyjzqt07isxbskp1ygsblmwai088me9bhkj242yvj8rsxmelx9jdrjdh8lusn0z7sfa9ryyyvvcgjoe0dmyn5n0wtqrc06cgm6ucob4fsvepx5dfhjk54r05v6j5phxuz0l4rpf2tdsa0iigpnyu5t00nqor',
                receiverInterface: 'qoayfsocqgz2309i2qinamsa7bjo4hwzoknec0dlkxdtqr0t3nnwi8nip6terszpnx8fx8l5woiq058nqrgpqi1y8su23bhtee3j78w0l33oqg1dn5wv4mabp3gnlsrirvjofgbw3qxbukcnk5xiai4f0bq4wnet',
                receiverInterfaceNamespace: 'a4cdiv2h27yassctd92d9cois7lsv1fyl7r9kj4b06g2ixr81wwfiz0ga1gmaqoe9k0kugef5hbj8175rfbpa1hkdgehldjnc6qtm44xamsr595k68qulq6h55ysm7yizz2ktrztno23n8e2ks4979lxzh8rykti',
                retries: 5704655798,
                size: 8393310918,
                timesFailed: 2856729566,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '6n6xepshagkf53vfr8y2cgh8yjat1uywgqo08yg4jn6jdgnbvr',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'qofg0rm1p6kvuv4qbwfn',
                scenario: '3wgdsrberegosru20j12zvlgvp2hrhdo9n7twhwux0x0lq8wwxp9h2o6qufe',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                
                executionExecutedAt: '2020-07-27 04:41:45',
                executionMonitoringStartAt: '2020-07-27 07:10:50',
                executionMonitoringEndAt: '2020-07-27 18:20:04',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'u7wm8l6wptnc1kgh4tsaaxprvil682vvtq9591up5yc2cpmdid6pemtsd2ehxhc6af7x5i4ciy14usby7qg2x605528cv8enx30m93yvd472jq1vf4xgvhlc4ygpodhkiuxito847ohna0k3p8z6koa2o8mptx1y',
                flowComponent: 'fu21xbjai5rseyrsg99mmj25xgz9u7egia5w3ffrwgyzv43junf8xdrvver6c2dgkssw0uuxlwndz7x1spmv4bahltrascj437qy1w4tlmjpmneno2efb7hoc7vzqorziri8o8gv8l8w1f74fnwugjwjx69d2hoc',
                flowInterfaceName: '5p1f5h6p22tivuw60b3kyan1j0bg0p643aejgsviurdx7k15kkdvdf103ifopjbhrrlu0mivqfgouq4fifxt9bieq6m2ufo5y9yptpnyskktbezkuifuu8k3j3n5be27p95uglp87pfbx4gjpnfiuqg8fei9w5e2',
                flowInterfaceNamespace: 'o0xenkzlzmdk0xtj1wx129gj8jxipyhnadoa4vfjowp6akbstlj9e8muxlnxuwgxqmwa5fle6mich7xsqgnlv9ereilkpwgv3132hxil5pr93f9ms7e2asmx5rrl2tdapiplh5byeotfmmp99i2iobtiax5eh2rw',
                status: 'TO_BE_DELIVERED',
                detail: 'Eum minima reiciendis et optio ea quae tenetur quisquam. Dolorem minus assumenda quia quam ut saepe expedita accusantium magnam. Similique alias consequatur consequatur voluptas accusantium eligendi consequuntur error harum. Et eum dicta aut autem vel. Est voluptatibus ut quo id temporibus sequi sed dolorem ipsum. Soluta recusandae eos id.',
                example: 'zgxgcod23au5czrckbrphqewsu261i1ifel0j3aoyl9dmx1shk9ra9plflygd4offcmg1k241xcviw2ygipman5voxt2dnmf6vuiafoycu3azhxsgbh1nrd5t84ozl4w301jsuq37444wgp034jtbghxyziuw1y1',
                startTimeAt: '2020-07-27 07:42:08',
                direction: 'INBOUND',
                errorCategory: 'h08cpz84k8ou9o16m567abe9iiucwn143rpgbwr6vawli5ssvhy8fczdqbcb9ons7drmwq3te9gaft1ki953gallyufuv62jenbpf5651yxg7gnupki4aoonawluaulw5l29klrztd0e9k8uvlvri5j2kw6ppt43',
                errorCode: 'vt2sv7n4gn0l4r68qafu',
                errorLabel: 966937,
                node: 5792003766,
                protocol: 'ayc8pqevn0uo8h0jdk09',
                qualityOfService: '9xnglwdl9sihnhaqfg60',
                receiverParty: '1glbpjtzbt6j09adsftxssr6sv9bdmoq95f0u7b7rgk70rrzrj8hvl5kuf1lj3oj1pza44ri4cn5bp9qjq46c59ia137gjnleohnroz778iv4nglgye9nps4not5hppu3wx0ejww4do5r0lagfdfqgla37e0b9tj',
                receiverComponent: 'z7u7aepwmoleig4gw61jey1ele0l7vz75nvlo3njwtt1kxm0ap4mycx7ki5mn4zzergi3vq7hdd9jfs4jof6e1vhsaznuhb6yt96eqryzmpe88kdcwkmc5fwq1ymnhaehqz39e1fsssi0ios9ifckocd7a0z385f',
                receiverInterface: '0o0d7cuf36o8mwnd0p3pi0w5rz9ggjvmt83ud8lci23vpzuio7x87roqyjqo14amozv3pyytuvv1slx1gr58mn8eldc64ca3zz7nrsk1ico41bglgqreg4aph33k0ftxw2hlpjmq7ooj9d2ucuacf7tcer0q4gms',
                receiverInterfaceNamespace: 'sdogtnekohkjapgrk7cm7uq6rgnjlbmie45w32d0v3h7bimbz377q379mvbotxu7gy642o6q8moaeb24p6bbc4b2b2kldihrqtjvxdxxvob1zzb2srbrf01xvfu5x87y4keat2r0m51zc1d9zlgwtfj3g4dprs36',
                retries: 9703471639,
                size: 7102257060,
                timesFailed: 1336580030,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '8wcfaqeb1c3yzephbaapz31cenh0sjcfo9mbmx5dmbn3drwsbf',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'isnh2edbt6fg5060n54z',
                scenario: 'frfo3h2g1ojsgtqur8fe0vqx3x57oae6rc3vikq0poay3ykk7p3g911nv7az',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 08:12:23',
                executionMonitoringEndAt: '2020-07-27 14:03:08',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'r2yef6cfdjti8qq8dwmen3i2ll2uzfl807hco9vkvkl4aj6b5q5qlpwlxnde6jbyr0x11qkl5oa3jdsf7lxzirf7p6qekgtng9uju3p00gnw156d9lykgrysyqsz4c2lib5zhkjfwu3c9szi0aha1ekedb8l4jki',
                flowComponent: 'ezhp98ti4j47gzg340q6sql6so7l1mc3piaunc0ypiceu7p0iudi9bhxdjlde4x997n02lhqbme5iko7cz6zv73957r3zeheftlfbwmlhtxondqdfcoqx5na13qo98fl7rp2kaoseg3jtdf9omc6bg1ptjljvqa1',
                flowInterfaceName: 'k8rfe8hmjlmge3ze5hy61vjwno8zoonoitw1rl4uw53fgks1t7rsudb7gov2utny8de7e3v3006gzwc3tnu20un4wu8z6q2y5s3n27afo7solxigzhqgcqebfqxanbspsfoh5o9gyrl4f4t6lrt0gs8ypi4j7bsb',
                flowInterfaceNamespace: '3oyy07o9cx5o8qg1fsxahilvtzk88pe60xiq4iht2o8tzixi0jsqi6auo8iskto1055gsqzdxrvb6jejc36w1f49p8ayc8zji5i5h3sziw194evtpf94ryx8z72dgg3begy1l2u3z943qeut3thlmbvd20a4r8b9',
                status: 'TO_BE_DELIVERED',
                detail: 'Vero accusantium libero expedita et et sed error quibusdam rem. Repudiandae consequatur est illum iure exercitationem pariatur quos. Facere possimus molestias nesciunt et placeat. Molestiae atque esse accusantium ut sequi. Nesciunt nostrum est dicta assumenda eum.',
                example: 'art1tprq6d1asylvyn4smvdkaz8syhl4w8ylavlwcn3r76niyd5t9oa8214dl5mjux4jykgodrbybsczmfw78kmkzc05ufynt4mthe9zyzzt0eaqan0g4mbnbv86dfyt71i9nvb1hsrx250qplttithhsvsqh64d',
                startTimeAt: '2020-07-27 04:14:45',
                direction: 'OUTBOUND',
                errorCategory: 'pyql17a68h3kefir6klr22egw2kcbneln87xokklz2r7cjcd8zhn9leqk2buhkbq5hicroaxpgr2lcas6ob0q59befniywde185p41o2e62vb9m03rew3t2lgz049d9x41nf6xu19yp89rwmlqkj2wxbyo59nk4c',
                errorCode: 'qy18bic1zbmv57e6bjcx',
                errorLabel: 718714,
                node: 1808434213,
                protocol: '7ctcvfvcw4yub36gir3l',
                qualityOfService: '7zv84nrnwjcjk4tv9x4g',
                receiverParty: 'c156eqch80e331yz7s2325v0qsehpfx2ef2uwgojpwcqja2xkw09ho2ga8hnq4qhrx6wdwar8z509r7j8fwhmbw8g9k8j6206spg4chrosugu34w2ql2u8xkc3rnc3qe7whkbxoy0z6mx8rqnrcc75svigf2gbn6',
                receiverComponent: 'u4cqkq017umu5045naegusp7nqz7xt41kh5bjzde79fkxcya3w7sinrdkj8rbyq4ib16bnbh2qgd96bsjfcbesmxz2kwcal7p8udyh6wb0yi024teddy81vjp7m23spuf8k6ca14nqled9rfcku4l079jl88sunq',
                receiverInterface: 'j2gmhlx4tf9nq85kxv9i1qwnkj3krtbj1quf1kdlkspxfcycom6bftxh4t8s4nr8i81g7h994mkda5he3nyb74knr82ln9z2nhhf121erlgrht1i7ijhm9vhitpa33nea21o7lh9a7r6lxly1zaq8rvr49walgq2',
                receiverInterfaceNamespace: 'jdkvclcptd4bvv0ml0l7lvdytv0b45j1c2k0fqipccyhppvpeg42tcncywlc73948k8nb6voh92xqfaiiwn4ll57z5b276vuybb95adancvukor5e0yavjb55qwm9qzvbt0pkkk5vlz8lbkj807v3gq02ynprmdf',
                retries: 8291069646,
                size: 5558204305,
                timesFailed: 6904252195,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'aazdxvsmchemwwgm4fkryfbxr16fciefaxyyw87mo7qcopgbeq',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'okec15psg94fyrkfxxe9',
                scenario: 'pyhvct1m1ztmqakn9wdhmafbjp703movy8n5013w0rh3rqucz2tqixbkq1fe',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-26 19:20:47',
                executionMonitoringEndAt: '2020-07-27 07:24:23',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'cjst39tf2rfmuhhymsi45ls2gwzxqqifj9plva2ylvct2ehll7m6dbd787f9dllv30ecd128qhwzj6bzkxfsqe40agv4u7brxfskpwdjz6w7jl8812taorfx6rhte5632cqhq8u0tfm4fnh3zuf3w4kw1jvbuvjb',
                flowComponent: 'redmp59pf1b5b18d4bv8i1mar1peynw7935o0puvmmz18um6utw41jsn15t8ev5r1lgp46f44pb4omerpu8ylygxu4u599vwqfmtqppg2rhjxg0hiucuvnrynzsij6kgkqhafc5gdbbckp13gevvwjisy2oqjp9y',
                flowInterfaceName: 'xl1for5t4pf4bnw3c8one42kds70gmug5fhansrfl5ont7smv57c1401z4t92g1rmhntl3ry9wvohhdcaogqouhntae5dxw16iv7z55mooykd1f9e6z60wnr9dtuiu0fz0s2td4czpiv0imis43egoyupcdfk8qg',
                flowInterfaceNamespace: 'cabypcib54u80uqztiox6fxtob75dteauqy73rjaeiwnj9rx5b2hkj080oe2q3eluwv8wpjfoi66ucy2y87ruhdvo8oaz5h20gt28zkhft9egp93qsufuwj2fzl9c0r489rrko6gwen2drejyzlptf6158pzbiz2',
                status: 'WAITING',
                detail: 'Doloribus vero quibusdam voluptatum neque autem ab cupiditate et iste. Ut voluptatem voluptate ea dolore et facilis voluptatem. Nulla sit et quae sed aut ut occaecati.',
                example: 'd35k5paqbszj8j24o6q959vfatiout9xy2muoi147bq8xz229dw7hve6bmb9wip0jx5qrj5j2qkcxfnq92r76ihop93lkk5fmosqw3y7filwjok40u9kppnp8z1xnwt0zvxkyft8iduiovafkczwgc2kse963e5z',
                startTimeAt: '2020-07-26 21:37:22',
                direction: 'INBOUND',
                errorCategory: 'odjofpald27hcjd3aiyg77qrxzbkynpp2lhlc2sf91xtohpewx5hi9dxpsv1xj3egdr1kdatv50terlhti8uvhg5fiktna5pmadplduon5zyzywsligvlz3q2zdj77yr7jz4lkor5ln7o4w2plf8jan8nwybf5lh',
                errorCode: 'fwszer2s16q8iw07zhoo',
                errorLabel: 708623,
                node: 6970364856,
                protocol: '7kxlvibiburimocqkrvw',
                qualityOfService: 'wanz6ylofdw13mv88iex',
                receiverParty: '9ct1bmx0za71p49u9ip9swula9s04uci5n8x86ypkc8h90vokz3svrekt5qwrs3977cyqighh2hslo0h47q25yd2qqygawnmgm0ddacfxzop14uk51uhuoplbq6hkykl3i6cwm8b3lmtg4yov8h80g7wqb8krsty',
                receiverComponent: 'jxyequzicbv4vqz7yoaes8nar0k4qz6chwdwrckpd5zhrvbygbbuxm2lp2ilmiec49vi1x9rz1dnupyii4gdq7b12rfnoenuwvqmir12oflqm5t26uqfgo9dkiig8oyj75oohmisb8lbmdapd71nf4a2stj003ld',
                receiverInterface: 'mryibtgy90uqmpxvw6r2hnqhwa9xllncns0snm9ozm6qvqbblyzwjkdwkj96uf36y22tf6tvsno8l40taqcadxzlb1pmblxn9jqvwh6ifdqmfppfupa9osez99wj52lj267bdtl838zy6zrejzlqxmahxzm8d9dy',
                receiverInterfaceNamespace: 'lpn4av755ip0b0ucfqoul7n1gqjctcuh6x12heq2vro4tq79ofginb0kez0yu3qvg45yduf3haqnhp1l19wsm55px8o36lnwhgoo9anoj5m5gxe6cn97oggsiqm02l8yae6hz4pe392cmywcly7pkrsunxnd6had',
                retries: 2998851074,
                size: 2527949041,
                timesFailed: 9552421797,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '16ocj78x99k83hfo2vv3z1c5eqjovl27q0ucomwab82p6birqx',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'k3wiaqsgr7hnug1t5ywp',
                scenario: 'nnffap1t9dew3qp8lb54k80d2l19l4sd2pfmgffb7ghll4ffi8i94ixr0nhz',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:05:16',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 14:21:40',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'lkbcmuta1yfw4gwna53uawgm7uibcy85rh2qxevd26a39j9cu41xv35zun96tab0zrc1f2kmlsyicux85enbknua602fg78beiwevdlunl180c0jk4jf2ihbz3w7jv03rsizl4k0zy4okrdhubic1g3hnwwcpc43',
                flowComponent: 'ne21xrc1i8g73i7cqm52atco9gswk47gxhchpohqxrytthuufytjaqn29jp8ro8axkjpg7an8nos66bnmruhkl0e9citoys821zuxea3xcvyl43ub5n354axykj5j62m0tjrdruzhtgjquu2bmjm1rlquakvyfw6',
                flowInterfaceName: '446wzlfcu1q6b2qh39rrb6lfj0nc9czf073repg205p7ak4tf24azdykjubot22h1e0ehso5i1ls70ygxyok4dmxccaos4rfpav01lgrgs6shj5qk3wpq1pivxooi0aemyax0b4q7x4ljltfwyfgkp6828tqswey',
                flowInterfaceNamespace: '6zcdwk283301ltdwlxvh7c4q36kfzpjl6izpktdbw2mplm1xsehgu3hsl8mijyeoe7fvsicaux06udd8t2vjv2i8sv2urih0yajkze63u43h9122zvpkognnmvhdn4r8s05haa1ggwdx64nmij00bjm74xwxqwwv',
                status: 'WAITING',
                detail: 'Non error voluptatum omnis provident sed culpa animi cum iusto. Voluptatem perferendis impedit. At non eaque vel sit quisquam. Quidem voluptatem pariatur et aut molestiae similique laborum. Explicabo sit consequatur quam velit eos adipisci.',
                example: 'ngdsd5ivwjvx4mbn55qsnkokkq7op10goh1bwnchph7a3h0ojcumzt0albld2o6dp751qrbckicrfzi3vqk5jrkvy6d8gbbu0qc8x5h3zeqogc2gdnqxk9j9zsy8dtxaazqhmjbhv3e33i4123g2n7fgov4y6vvy',
                startTimeAt: '2020-07-26 22:38:05',
                direction: 'INBOUND',
                errorCategory: 'h92zd973tb9p5jwhzioikqro50u2rnpa3ik5is552nnp7uhv66e2ew7a0ha1eotaw3l7zyff0n16gy5y6v2dyzyh7198jrdf7jtsxrfsi2tkaapycjc8hh4rmq2n9dft2s7m8zwflymktu8cdu6h7rqkh4aexyx5',
                errorCode: 'o3znt21j3nj9amtwgbfk',
                errorLabel: 949074,
                node: 8359972182,
                protocol: 'ie8u8ui8s5smgatcj32c',
                qualityOfService: 'ljcukofekbmeq5y8eqfp',
                receiverParty: 'seh2fk038s0fbrjxjkmyg4yy3qc5btcxo794hfsypgn56nn0txwfegjhmae6glnjs3qldf72jzi69bsysrtxwljuoy69uck2tz7gsf21g99js63ybdqvowomk1rge3zkydc0ub2zn6gy7tdpg70ybrt6pkc2d70k',
                receiverComponent: 'h9jv2qca5rphwqwba6hq55j9io0bwbog2v79g34jypmvjmtfflrkhy8tfrdmeez2mpu6ser1ogwn0ca6sith7fn09b4dbu9lskayg6ikh0983klr7eyj5shlgua3ar7y502mtuujbxbe6ltwsffzac45wb3td50i',
                receiverInterface: 'hhnfkpgeaut6jxamfbm0qpg6rgsvak9hfndzh64optb24iikwz8x6ftvi8h2oocld0aazw9v4jp10g8nqzdc8nnsv2djlseguwz6n7mr3qqos5mebs6ki3lgo5xfww5s9vv8gbzqwg7eo14r80qm8b61swyj2orc',
                receiverInterfaceNamespace: 'jdgif7mc1pj558tdrco22z5k7k9y7zhb01mltinto67f8drxvc9bi4w4j7npkrflv1lglqnadfjdy61k4ircxev4zkmxs84lu59rnfsq5ha7zl93fcp1j48qiqvqgtpd5j2cgu2h2sn9m3gri47b2rhwnnb45sqg',
                retries: 3153163796,
                size: 8549076446,
                timesFailed: 7300287260,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'jxo54q3smon1bxec4z102xawwbrhqtudnbqduhpogx3r0hxtsr',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'ysffvpjdkf7ws305znv6',
                scenario: '700feg3xxcsgfx0r5rtb9zk82zvaghai8xopj9ogtv4bnj8o2jjqh13xp9ul',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:36:18',
                
                executionMonitoringEndAt: '2020-07-27 12:49:19',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'krr7y2p3trmdex4x8yuu1krag8yfndmbkdni5pjbogpwryowkarfpbasrmvqwbbwvdzhxdmccvmdmj3qlad5i6xjxpw8i7emnxdvgw9khzrb81lbkooj1npirj8yp8fjyhsxv0e34xp2lpgacjq9elugvzgm4ah6',
                flowComponent: 'f7ozgrqpvrfi4qriwyp9vvumca3r34gges0aropauutkg0hfs819a6pr5dho2ve0h3lsyf1iklodt5ut8i6zi8d20zysoowaz7vimbv1iqwg4y1jfukpk2e54hmababtv86i85srlcnwl76iu7r1vd6ac0kvkwn0',
                flowInterfaceName: 'rqax4fvomq529yga389hd5if4mfo3zutbi0a3pfbj91g5a980ohygc43hxx25m9hnybd5h2zpj31sd5jb1rdg0t166o1m7a7mwo3dlebf2k38u7n7x0iszmn9e450k0gqyqmvx63k02s00y7wf0oq8lrvkmy9x9q',
                flowInterfaceNamespace: 'gdxzx6ukmlminm6dwdzeur4ugc8fbkanpfwmgmmhyiqmx89rqd9fn7kzznj2bd7aa7wack83503hz9yhbp9szojnk59wsx2i0z4jhpa8i2zgz5shi00msejfzbbhov80197xjwy3hm7gjzdkw1v5z2drih326rtr',
                status: 'ERROR',
                detail: 'Officiis amet libero distinctio quia exercitationem occaecati id et. Ullam ad delectus excepturi magnam quia sit autem atque consequatur. Ut est esse et. Soluta provident laborum. Ratione laborum distinctio exercitationem culpa quis voluptatibus. Qui quisquam numquam minima quasi sapiente.',
                example: 'dn6r9wg2wr63g17gfz6hs8dd6124nh5hwmlnfhisdgexpgj3c4ng762ai1a89y6d19poxi9gyd8t6anwtqh69p2tmhfakantsldyx7c5z4mjom7cqwzulonu347f80udu1kulb144nx2x9w8va65dp4pte2cu18v',
                startTimeAt: '2020-07-27 09:49:35',
                direction: 'INBOUND',
                errorCategory: '045lauxs18686bt33vce3x2ot92wl2gxm5vlspz4xolr6in6b1kdowm2hjifx9s5f82yo3f2ccbmwdr5opam9h8599d3znjap770sdcc56eava256nj5jm3sf90mlnlaeb3pf8tgjgt6240u7eekrcdmzpao689n',
                errorCode: 'rv5g61wfber2jhc8oata',
                errorLabel: 981670,
                node: 3261715927,
                protocol: 'jpobzbhhvqj5bmqvlzyi',
                qualityOfService: 'wcp3x29xz596fr7rs8so',
                receiverParty: '7upxyr1iigkw6eukuozy4kex70q312bmnhs4mim820xmeijfr6ytww4qdta9d7edyuxw256ssyh4xwgyyae06kihcvrwysz93a3d06aqmdc1djmfkwt69gxrezgydgca75ml4iidz8tgpmjjsjpa52z70l4aipcf',
                receiverComponent: '9l354uqgc79fpsr31tq0rap967cngdl54kjc6g8ieywkr203hcpfljgsv6r8ebgl9v6frbqadti41xdmfkg081hddvlqdhoj8ivjis1damxa7vkxpldm2ezsrq9hbsntkoq8wb2r30lf4a5jmmp9zq30it6cey2r',
                receiverInterface: '4r5q66uabui1a836ajmggsw92qdo9tr9ele4q95gazrm563xhrh998wxary60pq8zqd0xv8gff0fr68natapw53d9te7ivgrzv3yxter9coifzh7k9k3tmsyl8vyl0cmfgikny5qfipepglci2j48yyd69j0me0s',
                receiverInterfaceNamespace: 'p88y1l71c30g1s5f5f6yx9a3sooyq3pmt0poqziejae9jgxkly13bswo9x2l2qqvz8id0o9vterwckmd4f1j3uaj9ntq5vho7y4jkz9i1usyu8h9pzzolxr6pdhv8qst51atab1rkmsjsl9lmcgyyvrimtpgqx3v',
                retries: 5185942080,
                size: 7297534424,
                timesFailed: 4912154916,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'c5vc9ji6de1sjng9yiibivzbqdxpz2x4dujc5cllp2q7ua15hj',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'c95eizrtcx1svd26jrbg',
                scenario: 'ilrgookn9brw4sonjvujj7mq48x6xg84j65o3ezt7oepsxcldk84p48cnwaw',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:46:59',
                executionMonitoringStartAt: '2020-07-27 15:01:20',
                executionMonitoringEndAt: null,
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'rrku1ymaczlh80e269mqslnlxkt7slian2f5xtxw522smui09snmzqk8tn6gd5a0ujmvb0zkor3msvugj8id1s1b180dxvmoy61w4bh27htl0azrvla27mbjfef79p9lzjsnu3e5nvk8r3tzhoao4v9uk7s6gn9s',
                flowComponent: 'uykoq907bgsijv3xdbecw1b7og3sqfl1lgjf7ucvcbv5tnmwq4lj1z1ezd7lw9z70kkbe8seqlcr6umgy0llnag8z6iwxedb5zj7rfaftmx4rq3zfgmzjicvdu5jmbt0ool6q2jzo6x4yzpjyzhunii7lnnh5znm',
                flowInterfaceName: 'vf5hs4aeswk9a5xxukifcqw4rd60ztg9n7m6gi3k0ont0s7spr1i33i33tud7ttbivlfeqhtov9mtuaxl2tnv21z07aobntiqq506hthhj0ktaz6cofmv8tyh0zp0sczd0uruewi1pgrvnrnjx2hx6dc1jet522o',
                flowInterfaceNamespace: 'dh5akte1oo4b1d66662bwvvbj67eykzshrc3tz9lk9n6yz67qrgb6ri07c66701ucbilovz10kmy1pzvazqsxzo18m3c3ms32km5067qdn03lnlsdtje5kdoz4v21hu3v3hhp4udgqaqbozv7srqqvnmn6rn5ju2',
                status: 'CANCELLED',
                detail: 'Porro perspiciatis aut. Voluptatum perspiciatis dolores cum consequatur quia iste quae. Maiores recusandae sint laudantium aut. Libero aut rerum adipisci amet.',
                example: 'fbeecrnuwo1he1uq0tamcj5olat8kpylakz5l65a262witjrs58nvki5dhzu3me6potcsrglpudhda4533b6tmkay0qj6rdk557uapvlpks1unta3gjodobt75dmhrodgtzw888k34pwv054fdsxqmqk0u1vdlrh',
                startTimeAt: '2020-07-27 06:29:01',
                direction: 'OUTBOUND',
                errorCategory: 'swhl29qtac1r9dn9j7gnwmn0uu158lydftlv8ay2e1zpfp03cagr4tz3d8ax8ptlxl0z7lq4mig3d4pqhvrkkr9rbpklk888kcpz1h7fa4peahateagdh74zljoeifgrwff39xg5maplohs1ut51aquqrd9uhse1',
                errorCode: 'ija4796n0vv2g8o76e5l',
                errorLabel: 512628,
                node: 5738394750,
                protocol: 'c23s2h5epngo50c862au',
                qualityOfService: 'fdd1afnjonvq5tlwkob1',
                receiverParty: 'wg9ilkrw9g1dj0j3jkadasr2xoksy0pancrgu4hhqmmp78mti2en2nee1x3lae1lp0f6fytmrt7kpfodpeurb2794ey8ge13fiabji7uoqiop7ltq7ug2sgran0bspx560ps0g3t32fzjb5pkyb843yz01z6g9zu',
                receiverComponent: '2cea5wfiv08kri2hacgkn3tyefvunne2l6rhh5e9s6rrd0ufrk4qpyecn7x7omvmih6th4zs2ln25xt4rd0zty3hinleoeri5fdu0xwcphueg43a4r5pt6hl9f7ojq9l6vxyepofq76kouwniv4xrcl3rm15v7n7',
                receiverInterface: '3kfy1ibpk6slikeavfnctq2q16ajbuv503p72oh1aa6z3vb1szevkozb82fhjmpprsh5lhjy1p3rw4bxgq6lfv93sxnz637pik2jikwvnlq8m7k43c7gndpdgqcfw2my697og54alcekcu46n1y75etbvu0s0r6r',
                receiverInterfaceNamespace: '8mi9f6olqn78yujnn4an5gagarh2voi9662567wi96ytmhmdfnidjyueuwu1l9g6u7qncol9q8kn7u7zvuhg7jzp31gxpf3p08btvzdevd1go75t7plyg1h1j1cgvg3rbptrlbtuxraq886o1z66ugujlsc08de1',
                retries: 8184896855,
                size: 6865109122,
                timesFailed: 2829492249,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'ufo9atff8v8uo1klmobq9z2iicmbr9bisdwqxyisy4a4ikefom',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'hosgctcqz16mt0yk5r6z',
                scenario: 'ku3m4y4nqcak5a2jyq0oig320z145lwndx9pec45up5x549lcvljcdoxn73c',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:36:44',
                executionMonitoringStartAt: '2020-07-27 09:09:23',
                
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '548e8j2r2h9bcud8srhq531yadb7bekye9pe3nqz3qiblxjn8tv3xgzisgs0tr7eib0fi48rgmnd53e93s9rhf8fl0yjf1xm3zpjf1db1g9wr9b9kb2gn255iltprj0aet4iv9ko1wufkf5kn954jedtfe7p5g1i',
                flowComponent: 'dhq2zv710pvozl1cbe8h3rxs89ndjmhpggjfwi2o2ubzf7uanvt49y6t20otpsluedh58t9v66uyijmhqbm7xeqnhwqtvhpl3sxoo4zpnsw6wqx9bru841lpvepjmcd29zp75txzra2yuk5d9ts2zr90ofzzrm4h',
                flowInterfaceName: 'z65t3lk5q5w5ibzoy0k1eu27n5ha203enwzgzps4pt450w8d4boxznq0mv3znz5mv0bg9tskbaed2f7rcn63ggp62tabyrpz2q0ctwtl2jsvmn0wo67lvv0ljaa9h0u8gh8wec55ei1sj1gs5rw3r7nzww9rqo2m',
                flowInterfaceNamespace: 'f4bavqcflwplckkstg5twi44qtsiyt6o271csou1eqv25igew28f0wcuqhs5yt2u7ch8179bxi9k4je75q4397gdqc8zoj6v28zbu0fnu9itvi74ihg4i6r06v2fzajokai0ptbiymgr6zpag6b9ivinezobmrju',
                status: 'HOLDING',
                detail: 'Eveniet nobis qui sit hic animi. Illo dolorem et eaque velit voluptates et. Rem nobis magnam minima. Hic officiis libero rerum corrupti. Ab eius aut. Id ratione cum iure doloribus.',
                example: 'blwarlxg4cu0ybhlspizvdhczuoc2sjc3383pf2rt60gsmoexmrisjql1be1ex18ai9ngyd8xglbntns65iy3d7ij1vmm74qlhb2aykj1njb65rqpv59sboy7qrzwxc02agzzpem9bfze2jsrsg2yexh0m0nqf34',
                startTimeAt: '2020-07-27 15:00:57',
                direction: 'OUTBOUND',
                errorCategory: 'v0kg9yxc598yi8jrpahok2u2bp91oc0exnpda1xpekpdv25nq21vgeesi8fmtbc8e9xrujds4fdo5l0i1fd2x1u5slw8p8sp3aukett68ywtkmkemeq77frhsne3ogkm0krdfoaonrxrnftd9ldazemmqyl8iygg',
                errorCode: '8yawlw44wyjhtappslc1',
                errorLabel: 741461,
                node: 4546148862,
                protocol: '9q9fxcwzxs83hzsji7oz',
                qualityOfService: '3c6k132461xrq18crulc',
                receiverParty: 'gs1v98k94yxxqwb0s62hgntcb0lwh6euoiqlco44gvi56aqe1h4q9m2ol9tgfmn01igxs0hq67nyl9j3a6072we3xnwa69bx54q2fw1n2cl4v8yxkjoejr4f4j0vyn3n0iyavk69wff6mjwf3iffvaoagz5ik2ga',
                receiverComponent: 'rvld4tyyo6kisi35e73eqmdtck8btepfew9dgsiy1o1n2v7x34ylp3d4mer07xyy9tre09lt1tucmz9rjguvskgtptqeo9nab0puomfei58ntvi4bwb8pzhqc0gnj4pahzcqx634c216dlc7pvtggh7yp55i556f',
                receiverInterface: '0lskuwnmomv3bpjqmfhs1wmej5d00ug1czsb65nzhlop7hgvoonj08gkc1vamyr3evvui38mklrlt7yn1rs975hiqdas7xcrfmtldny5a7mbv94848hlw1a286ibmu50jmntz6dk6uy9on7uacdm2p82ifd1wus8',
                receiverInterfaceNamespace: 'x3s9yity5vofhz12irznwnxvwnjkn4cgzwxql22u2d2jwitakmw38o6yowbl6wqb2sleptzcve71aj90hcvxickmsv8cgd16nrbxvh7k3h529hdh0uprc3z47hq9zomp00qf63jtxohbmqzjoova5ucjd9mys1r3',
                retries: 9605486911,
                size: 6862623563,
                timesFailed: 8559338888,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'dwvvtsl1d91spghlp1dvhi9nexgquzy524rfi53astmb6via0t',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'evzv4istwl41trix6hut',
                scenario: 'hq0tzqq4gqw7b79ckc5s9kqi2kd7r59ygiq2iev0uwarfda0al8139yah5bc',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:46:18',
                executionMonitoringStartAt: '2020-07-26 23:26:35',
                executionMonitoringEndAt: '2020-07-26 23:43:17',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '9uncf1ug0755iwh0phq77iwpmhdapp2iha7y1z21vnq6imnovp6sc4egvk1vegr7zkekr6204icc0k2cpue1vrbm213pyq9fdcfe2xl1b32x0kleupyoded2hq381t2su4fch1yn3yhheph3j55te3k1rcdpqqri',
                flowComponent: null,
                flowInterfaceName: 'c5dmz8dsmkf9ke81vqvwhyap6edicz20l2modkrce6620x8ckc2jfjefv4gylfrjmuxudz89o93qy7gqj54tbsi8s24z26mxnalhdmu8khbqm4i360oqotwb6c025cryn7v0q62czm8gv7u90vmoq5mcceyf0z8e',
                flowInterfaceNamespace: '0rzdxp8enwnxdol1fumi5e98pckqvmi6587zledj06459dksgha4bx1jb0djw6f7a9rtovrj8j19t2280p5x857q1101w2fydz2niytwdqp7cpspgk2arx9pwh5g1b0ruve3teezxv4egxt7q8e1ydt0auxp7ge8',
                status: 'SUCCESS',
                detail: 'Voluptatem corporis et animi pariatur. Aut molestiae sed fugiat. Quibusdam sint ut ullam. Illo veniam commodi suscipit rerum qui. Provident excepturi repudiandae dolores officia veniam velit. Rerum nihil enim et et.',
                example: 't0c0bbwwfyf982np2ljb70478v2af1ayll41x4axgqs3ilklvpk97toby64ucaorr4dvi3jkjnqtbe1r2jt4m1t672q1jwudpxxsr6i70kucxbx2th0h0x0ln127dm9pn15dqprygqkv1mguk3lz5wee0cqgqa5q',
                startTimeAt: '2020-07-27 02:31:39',
                direction: 'INBOUND',
                errorCategory: '0205nl3ck733hzf9vhd7a91inrcwbpos45kt3fcyjctho6bivxwdpt73i0lpvrzxgjklzeasw1kl3r465nhvmpl5m154glfaizbpvvdslpn7lczc2dwk3wlqbm8f3lw1pxm931akd4xy6crcixwzdchsd275ad3e',
                errorCode: 'xk4g2od8o83w5ozrk7yn',
                errorLabel: 667416,
                node: 1296143484,
                protocol: 'n49h6djsceuzb7zj5vt8',
                qualityOfService: 'l6lwogg61o2kgveyxqiy',
                receiverParty: 'litl2e3xyq3f2crfcc1w6ghf4uogcxdev5bjihtsa35nw07hhpwg1qpa6qavelxaau6ig65hoon0n6l6wsz31l4umk426vpma3sd24nmram51tlsm9a5dtsmrofv99ya0kfot5dtwhtiryznm6eeeyu2b57us6el',
                receiverComponent: 'gcy6v6jojbm7tne5rgmcd1hz63ux0zkuafdsx9flnynb1qbeb6v6wc8nzz1vduoeing7vh76ncdyqxz4ahqa25ku3z979z4hwl16wg5suyfneiy3gq1gnrfuomise8z33pkxty01i7qlh76ccrl2851d8t0gfhrk',
                receiverInterface: '5jgyid7z0eu95vtobm36bh7kpwubq0ggepctcnzhdprv2ck19tcbamf81ioz0141vz45fuw35kpkoxzi8rss06skwb97pmpchac8zjlg5ypp40cokxmtgzwwvq70wt6lmsfkaycsa9cwsn7t3fhiov92jih3i0xd',
                receiverInterfaceNamespace: 'rhvskbshznk88eix7hud46oxuwu98f5hqc6zs91q5g4oxn00pb76uhb2m4g22y8p6edt1gajc6qk22kvsohypefu4c0wo87mebcuu54cyztjkl4hwei0tvksyxz6cug1uxdk659erw30buc9pkjxax72xpye6y15',
                retries: 6985502852,
                size: 3413881791,
                timesFailed: 3842208944,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '7pe0a76bsndizy2j5ogh2o3ux4wfdwphxwxb6dvxtlwih3goo3',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '1x1vn8l9jdigx0fwenhc',
                scenario: 'rrtn8uiektvknbt9uig8f7bz3ayd0gqmia05pc6bjmuimf015udcmlpafwbm',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:44:20',
                executionMonitoringStartAt: '2020-07-26 20:24:29',
                executionMonitoringEndAt: '2020-07-27 11:55:08',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'rm7mj14zrfuxwkd319rpcy25zo9u5sz0746725dsliynueq3cib622wmco6mhd6qb7ljzyctw61k04qn2hur6ants2dey9kewrhr2e6h6k76le7vivo326mc8hjl89icuqztk142iggdb45ftk3yp872voptrg0u',
                
                flowInterfaceName: 'ebkg43zywunhhw01mtsko2a5r3nlzf47sec1t62va0ki45zrfftc5qrfvtc709o8cnafimbgqzmtc1eblfwd9mwcdkiet8qgafsi8v2p7n3ofz9t3ieqh723xz1s9003uoo2lf7da7ze0f11dwfxq9rb0tn1si55',
                flowInterfaceNamespace: 'hp1c746ijwiri8ivsxfni0ku54im8ex4k99julnpet5ci83nzbj4czu7rf54k6v31f3m83iwywc2stf4q3texazffj5595r0vycx155l9xmxcjwy6wju0eww8eg5d9xjfh430bdfutfv0zbl9s6rotsn2l7zdqmk',
                status: 'ERROR',
                detail: 'Debitis et ipsum libero nisi voluptas possimus. Ut facilis aut nisi doloremque tenetur officia. In rerum aut quis maxime nulla eligendi. Id unde repellendus corrupti.',
                example: '3a4bnuokl5l29ltw79umxvb62iayfrfnyrzf6itjx9vigm3iapjax7r4bvm1hvvoykaz515i8w1g8290o861yujdrm2rxcelsn7c5ch49axd19tynyjphhr7n0swurke0hvv7hbtuhx9gz0xj0obyu3cb5g6tpjb',
                startTimeAt: '2020-07-27 08:05:15',
                direction: 'INBOUND',
                errorCategory: 'ewtyw4p9f4ypdkgas3es28wl9ku8ydegwvd1q2ob4t2rlh056kmi1ny5avn4l9on6gmuetzlnzdpwbkg4romnsxgeqxjdfhdxx3mr97vf27bbbg1jxg80m0sqihgjgrohpluwxbwezv50q5kcrrlfbq0q08yrioi',
                errorCode: '0igj69kpxftdhdgvus3z',
                errorLabel: 607741,
                node: 3430770496,
                protocol: '5167uzh4k7q7oq2763c4',
                qualityOfService: '11bbqdet1rxds4pfphwr',
                receiverParty: '3a1hwc4brln7a703z4bir71opqdmotv5ehvku161f7m0lwegek8n4wl503s3rcp9b5j29qn1atugprl0qka119c2byw0pr3xzrnjyxzg9d2cw093f9pmiqkyhwnhepkrwbbowioupdwr9u8mshtjz7m2v5kj5uzz',
                receiverComponent: 'vlcfxy14myottu73xemlmq595k97nyhbn1n40n2w4y4u5sy0z66g0ub5s7benarauhb1jgniqov6mqv3ztebvmaxs7aoy6o20z0x0r0r85b6f8kad7tcroajxf223c6wkau183zqb5s28ewnunivw8pr6wx83jf6',
                receiverInterface: 'zd6oqqt56s8eyd38hwbunirt87al8sjpyob7j4f0cdrsqqudq5f7vs3cnbceihj6tvboo29yfmk33kwu5twbf1ncq6thdmr5u9xn5lf5msorvde1gkrmf0hah1gxsy0eoqsr29aipfy7nz3aele5rnvym0y9eieb',
                receiverInterfaceNamespace: 'g8ii2fruytas1ujl67er64vhmbib060j4djj6bdu5g13wcx2l5lghpeugnklr3wnlk5o0h5t594cw7f2i11p9bxrl7a9264fex3my18lpq3tsh1a34wbmyspazl2beqogk1fgx5x1llrok6mzs2lz8bfji5wcl63',
                retries: 8117791068,
                size: 5530745690,
                timesFailed: 7157965549,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '7430ijzxjsv7dn46jdopr22aklqlwulernclvndrbz3avco7nw',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'vziilu2xoofl69dw5v9c',
                scenario: '16hgb676uivl8yn1av30uj63uk35vjcbzikb4lxpkgu0yoov9fxxo2s1eum3',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:43:19',
                executionMonitoringStartAt: '2020-07-26 22:59:39',
                executionMonitoringEndAt: '2020-07-27 11:54:56',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '6e1mxvj0874ro6ljqcipd2ozi6xlvtu4fb0ql5xifjc675yv7c5oy1qnvwjjvxb3v2h16bg71owmeb8bx7oavls9nwz9n0lw31ku2d47jw48z68k661iawn2ew1gmo7e0ku8vhc5bcjbc2f8rloepejqlllq3ifa',
                flowComponent: 'qeurix43a9mhh4so6x8qy12kvbn56pfw7jq5y364lop8xcnldyfoedho06q66ffvtygczptmk6pdixjbpgozqu5exrthhb7wq52o9f6rvgzavu5soe2adcyza5acaw6hv81lj5d9rbnwzdq58k4nsc2p46r537s6',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'jnnm74mphxc5pktp6j4tfnfdu8tk46ls7ls0b90dxu13qg3i0qbt7bz1uvqch3rpovcq0xk9lvw0hlia5s63lcvbr49t2jib9piiofepheaph6xs4r6p893uarzvbe8lvj2wttclcok3o7h352yx6qgjc5b8es9v',
                status: 'TO_BE_DELIVERED',
                detail: 'Velit dicta fuga asperiores recusandae eos doloremque qui numquam. Corporis porro ipsa ut magnam hic non labore ut. Nam consequatur ducimus. Vel ducimus exercitationem molestias magnam libero repellat corporis non. Et est non est voluptas vel dolores et eum porro.',
                example: 'njatrd8yk51d5teynxpuuxbiw6aql6v5zf8yuumi06ftnv6hanqv56ht6ka7imlbdzgo09s9tf9d5x6uvgagpxpel03o9vlnr8l8w3s4z0awz8dq3uizre3xlsjroi2cxe5a5amodl74601od2c6lp72c9dgmqu8',
                startTimeAt: '2020-07-27 16:45:22',
                direction: 'INBOUND',
                errorCategory: 'kuy04fireyjht1259y3y0uopz3pnn9b0ar4fla1x2z0v4vh92ewqbtcemu2gu0bsejjpc6kmo7hx47t3iu3kqhox2oedvc2akepm5f00v63t8ntf1vwhq1n1vfurx5y9z6ss5uh63scr7phbmnfr0t1at5113m6n',
                errorCode: 'ben5ipzpw10ndzert8o6',
                errorLabel: 523606,
                node: 2789128791,
                protocol: 'b3j467d60flur58m7qpd',
                qualityOfService: 'lp07x4vyurqod9zx4z0v',
                receiverParty: 'slz9q1atm791nu09etxbqhb9qndot4i0oyos49hw4jrhk70f1vc5mqdxt46l4k5sx1em1jp03ha4f9efdttc7v834g544jye68gzfos58biyr44d0kp3gcfac7oy9g5ahne8opsmernnds458zk8haum7kw2xurq',
                receiverComponent: '4bzzh68mo4feenl4wlc4xkdw13f92zjsqn9ndy32pwm2z7s1dh15g12b4pj5uh5l4f5ru5rzfb1mfvtuabz5cd43jcf2n4hdljn37shg3bklm32nuhsc9kksp0jlgdggwbrjcjz4t2q8uoi143pxme8gsa0zqpdy',
                receiverInterface: 'iyroydikc2i5t6zpl7sx9ffsfy5bxjgyutvqkasecphm2se85a5xlf74w2dwfy2nq0098rf29486gsnnbvmmq1f7q7a0jg4wrgnalho8pb202zp5e3icl928laaa2qkmeu8sd6zytw4vvg9v7bzxlot7oe4vnynd',
                receiverInterfaceNamespace: 'tnbvo4ij5wlb86v400mxzz1uzv4hrpqqbn67vbdm4vex75okg707v8t9vb4qj8lg8u81dbb3ivf2k3b6shyasyyn23bay24djbjb9ftlpihgpptq6zzjr7f738bhmodcyody5o13fekfy5zuhb7rf5m47gfduah0',
                retries: 4273827174,
                size: 6413813549,
                timesFailed: 3927898923,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '1rps5mqxq2r442xi11fuikkssrjx5u2dkrkhanyuoyr5lhod0q',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'pmmwls3hwki82pe8osrf',
                scenario: 'mqcyr4nv7zlh4wyvblz1f20w8jv8ighnbl4k9xocl215ny3ik3xd6g0ems2k',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:24:50',
                executionMonitoringStartAt: '2020-07-27 11:10:29',
                executionMonitoringEndAt: '2020-07-27 01:29:58',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'w3lkeihivj3kt55oc2dyk1u5bchmlq81ij8sbcx2cydygium9y9h1igtvvrhm9j1utmywk1w9fkmfxy17s76grsurrq0htqtck3v3fzl4topq9j2cymv1xu02m5zexhz1r2m7g53lbbvynf3snioddx2sz9389uu',
                flowComponent: '2irgbgnvjy2hsrxnq9cdk957yovr3gbfqktm8izzgwtkzx9b04kb3vnas606erebyu8jtiohl0qji5g5aoinsj7v7fciu976pltbp1tvuwfrdjwzzc79cslh5o7f0fetd99ranqrdsihvyvbs342jmcusziez51n',
                
                flowInterfaceNamespace: 'x0b21rqtxjnhap43tjwfen27xd9f2k9dsy2ex71gxqnkjf7rqx9g6w7xvw2s8jd0y8lb4tqml74wt0h154bl7tbn0pudu356uw6jgszq6zh0bo1hotrxs6dmq3vw5e3bqolggg9da3xo8h1s94zgr9xh6ize845v',
                status: 'ERROR',
                detail: 'Aut eveniet omnis possimus alias. Et nihil deserunt nemo adipisci laudantium. Placeat ipsum natus dolorem repellat. Molestias doloremque veniam aut aut consequuntur dolor maiores tempore. Deleniti ullam facere omnis totam est consequatur. Et fugiat et esse est nam optio totam.',
                example: 'a6s8k1xa561spc7ijpegqg9tbn9kypsnvc4nd45gtnuvs5j25cnzx0g8hvfqc7masavy9cbohc2hz346p14ubttclw80i4wi9vqaw2ieqy1eq1yr1f1cd931625cob11wy8c8f43t3mnwlz53t0gs180xlpn0b0n',
                startTimeAt: '2020-07-26 21:46:21',
                direction: 'INBOUND',
                errorCategory: 'vmpkgxfuacd0keuammgmiwzno4ole3jd6vf68t8dtbw13eyi8g8ka04ybnz90939ouwyq8cc5ut1seil80u4tz46q262d3t1e8ru97o6jnzqaojxlsphzuyjr54buuo7bejwxmethj5zsdsdrxh3rtw6x5zohjq5',
                errorCode: '4uesiina3z7i06r003o1',
                errorLabel: 145320,
                node: 9050699964,
                protocol: '9lkfpoonr3ntf7853yao',
                qualityOfService: 'h08ncc072c09i7e6veb4',
                receiverParty: 's7i4zgcqevfnnh9pyouqcorw7vir6q8n98y4gibo7yx33plkrxvvjj7qm2zxa2uoa8a6kdwou739rwofm3idff2blsrs9ptm2qfg7bzvkzgu6xcqo2h6161afyfm79sau56i3wckkjwczrgkkkx1o9zevyo447ab',
                receiverComponent: 'uvof5en9q92xgag8j2xyoykdxu81won8ju7xdwplvd9akgxg58k00589qlczowcif0nnf5ash9mzo1oskjqu7jr6pv2hd6afvmfcwkxvf4ugwcvf3zqr6tmfq0ja4m8st3w7rf8us6e8zln4qyxnubu0gf763nps',
                receiverInterface: 'ltpt8pv24lgspn1jjxaloiy6g45xofht76s257epmrvhlbu8cfkw5uac0ez9olgmuh35nyqsnuv7u4ywu7v7zaznsdezlxtwbm6wy0ib5vlwq0psz6nkbk326t9sui7kdjfq4toxd0bp0gczobdjz1u7xvebp4y5',
                receiverInterfaceNamespace: 'l33s43o61mzjzupkfi9kioo2hezwqc4goytjt786d3qe18dxr7jc0jenviemdnoaalf828u60k3xi6033dtjsk1r11dwbmpmjyyfo2nxdnux7fkbnkeb3zjpdrkr530ide1vxu3qzyln57v7wfhqglxwiimh5lx1',
                retries: 5831184557,
                size: 7783434998,
                timesFailed: 2143284522,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '8xg5ypn1h7hqmaq321v8b7ug9dctk8of5qk5d82cjo3taq1npi',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '931ik8bavydjhe22fac4',
                scenario: '1c1mfnfiv1kmg7bf8eyog317ar44wb0cz809kfi1aylpoo3thoqdm2kgu8dl',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:46:12',
                executionMonitoringStartAt: '2020-07-26 22:55:41',
                executionMonitoringEndAt: '2020-07-27 01:32:31',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '3l83tb24pnzz498mtg2mugw62y0d6kc3bpf7i3c6tgsiqn4ge4w3i1vpkuvvn931y374r3z73g1umq103hiptayxgptsc5iv61lbxx2k1gnvora35h4uo484q43dqg5hqvcmpv0ky2jn46mi1p8j4pyi536kd3o5',
                flowComponent: 'zdrwa9e5caoy91d69ypyfbzo9xhesw4n6owgwjttzw6vgqrujfekkvgapwmdjp2d0a1gsefp72u3fhfsm6jxbrx7hkvlcmsr8882sexbjq279jjszw1g19vfkzt2fmbqekyvp59fzoyfosforyye0uit78uc5esk',
                flowInterfaceName: '9il3dr27pyw76w5r336w2r7q3uguecq27n3asvj90ncj9gtyig5oxcc9hn7bdaj4pths0pc6s8o2om7jegnfk9xp0h46r31u2ztqbbe4lgm7wqcqi0xt8xkrvm98j8a3x647vd7awzx1pf5351ussuoovb1u0oyk',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                detail: 'Velit cupiditate mollitia dolorem voluptatem voluptas incidunt impedit. Ipsum eveniet sit quia fugiat. Aliquid beatae necessitatibus.',
                example: 'o0z2ttj4o0cvnp3m7djpwjy9qjz9uuyj8455wetdvcv0mw22sekppsybgrf2jxg9adhe72xd8c4a7vyyq665bpplaulfc85vyjdafrrm15779v0kkg4j00dui4i0mxtvk7o9ik49u25brscge4cra74pceh8gzty',
                startTimeAt: '2020-07-27 07:38:56',
                direction: 'OUTBOUND',
                errorCategory: '9u5qq2c3f4j18xlme01ywklk591c41cg2cup10r36ly986w5ole7g9fj1or88ero54natfms89xeshkjioprm5cwx4rut44jeminbg63sxo4abscu0pjdznq5f9czdgjs5851cr4twl8pjt9au8vkxxw36twuf1d',
                errorCode: '6x7cjlck3p6i1z6es37h',
                errorLabel: 612624,
                node: 2213692259,
                protocol: '1qi4j6efhkntjs2zi162',
                qualityOfService: '4c4s2q19o09i4ylv0gth',
                receiverParty: 'asyiobjw7q8ns8e4vouniwgyhfzabscn4bwlg0dbmdkst637kj3wdk8h9tlqax2d729yhmtceq30er7a1g4ggb8b69rwal5bqye8hwpt5rhnk7z8sdt7buvdlmioyt210wnupxunam6lac72rncm39sfx6q2iapl',
                receiverComponent: '55uhbl1sivnq6sttxopl50dwwtisdrpqenukr0rhhcju5fhztdg5w8qq3wpqy27dgw6proehamnyjlrgwtjte8vmiglecwiixyr8lmyhhychjhjdgedfamg76eoonhnnxby9vwuwiuckofoebqd6l6pks43653to',
                receiverInterface: 'x2lww5f6a0jhxldb0diyuy72dxp45quztg7v9gjcb6fnpa2r9kqbkoihjm4nj05xgh4xjxcyy6225auvnnkbl2sxkp0wifpydh65egy79rgrhseksgbm985h902awuwbczvftodaxz5hk6trbg89s0a7q92lmjab',
                receiverInterfaceNamespace: '1ui21mf3mgjhf64barbq0avmc7168xnci7ybrk6t0ccx8i3r0xgqoq2961unab3g1ked745mitozejjewpygmdgtps01qxxvn3b73vpvbk686rt9ty1eoxnho063o3km1zqss8pttxika42xwnk9cs2ig7gx6ail',
                retries: 7246179235,
                size: 9089310064,
                timesFailed: 2919211079,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'tl4cshlqpyad58n1xbv7lq2rlb42gzsmctv73xk34z0ro3pe93',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'fwjb15e5vet4kf5du4vt',
                scenario: 'lzszuh6rww7n42oye4qc47eyo23hvkxeccwuwtbgkpq3rn8drav7r937s295',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:16:17',
                executionMonitoringStartAt: '2020-07-26 19:55:37',
                executionMonitoringEndAt: '2020-07-26 22:04:21',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '982v4377cxwpdlmkd5ozo5x16jxxgazmm9v2f338liwjdbgpqq7vncmkyzeg3svj4y3ideiw4q9563a92jm5s69xgm7vkfy58fkskr882grtprjg1dss5d39fth43yzn1b5k0u96ngloa9113916melz4l181xsy',
                flowComponent: 'nw8z7zoygfw0a6f4y6xl9g74aujv9kwfax9vf7u9zl1mfhl5okdvg3xenczc3qgrp0li00k34g5eughtu378p4kqv4kpeq5w0f3705yb9bw5r1ji9wxxqolru2vrns551nd7hzzllc9lhwh06ii0fpsb4h9mtg7g',
                flowInterfaceName: 'yjyk42gt178b6g65bcj85w0l0dsu83742sen2918xe5cgwtt6dz8582w8amqsrr8q2df5qfrknrzvlk6w95k9ttykqkml40uagaj22nujee6dcm4vod39r15zvl8jsu05j456l4zafftuzpl1kop7erpt1o1ou81',
                
                status: 'ERROR',
                detail: 'Voluptas vero ea ea expedita quae dolor ut dolores et. Similique et sapiente possimus. Ipsa qui quis ipsam non. Numquam aut harum recusandae rerum quia. Modi voluptatum aliquam porro qui ducimus.',
                example: 'eaq01org334r9dvwvdse9r5qiozti9xizbe3kahwr7in5mgabfhrl51xxchplz1crgoc27dpfuqszib2znuvlzftkml2skae4iqy8hisjqop6ukf7n1czn3gfp0b2rfst64cfi7vky6iygsnkvf61cn7vsi9vl6y',
                startTimeAt: '2020-07-27 16:46:05',
                direction: 'OUTBOUND',
                errorCategory: 'bgafkfgtrixptvhjvi7yx86cm6lynvjpdmlvcafgertgss7s97lgi4mu0wsl1u9c0pqymgftc1ua159wjsmbgh7pupyvk2660go7w6vgi1i0993jaecn1btv810956h573i9qid1g5dpe24btukb0sn2qn3pv8yf',
                errorCode: 'i9eqgbcxy60evknvxk4c',
                errorLabel: 674545,
                node: 5554960326,
                protocol: 'xeleeig7c0bkna523gb2',
                qualityOfService: '5wiem3apq83b6yiy07hk',
                receiverParty: 'kcoeieagj7iwd5n6q2dts9uuxy3ze6j703xwjee5sftlr1sp3aa4gn4v7trearozk9u8qvfmt70s9gyf6078mi82a8zqw1v8t1y9ytehg7tdkdt27v3cm4ox21w2o9i8xinv1ddn4erlpoizr0lkvzdjfuj2dfh6',
                receiverComponent: 'zcl52f9ej5hars15xg6hyv4ry9u7ckdctu6f6na62frl1bw9tbhac0f6vger8t8z3hd4urm8zwy4b32mm7euvgffqk2qh8m2bd78xo6i8gpmq0nun90gub54685v8qxcbc3bvcolm9pynjk95m6uogdz5xp80wh6',
                receiverInterface: 'yek8de3onsm9bapbcm31f1srhmc2sksu8hc58foplxnghpulyyt6me0kht6tb0vtsqpmkjlc5zi8o8qae8x8pkwezp4ynyu9kp24jabswyymhofqm16mwyhv3jduq7zsa38wm03r6nihox96p4qmmkic700e6vli',
                receiverInterfaceNamespace: 'f3iyt0h5tm8gwsxhudobnin6gwjw80fi6ped74b7foxe0942fn3gwfdb4x2mw1mllasaurotxonjb9qk9toanlxqn8litne6q3i81kvupocbmbqefrfdr60uwffvm0outq4bti8t9ccrowqz6eiqb6gm1d3hx6fo',
                retries: 4317722485,
                size: 4816189801,
                timesFailed: 6216896159,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '44fy1h7pavu4rtkml1bpzy1xarccdtd5td1gkvwf7bjxy5s5ja',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'l7pebmepwwgvpl5atd56',
                scenario: '13y09aqp8ae2s4xqx3gg4ie47d6yhdanie0uoa3pyy12thrijlofierzff6g',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:32:41',
                executionMonitoringStartAt: '2020-07-27 06:25:31',
                executionMonitoringEndAt: '2020-07-27 02:13:26',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'zmhe035e1qnlr9rbkjr9zdurc1xis233cfikqu1jghxyyz8autzzzf9e5g4lgvo4ngmrcsrun6zpgu05ep7kzfjurz0pvnkd25y5f8i84uqe53u161rys74bzgkt1ciqcjzvagzwszrmlnua8rw70ahybmlpa9gu',
                flowComponent: '8do3v27dzctg77rkiyjkwqusil0sen1l427z8qxq33kxpxql4qv22b08hw82yi6ffbxxt30zsdpeqllu9fusbezejd9k4yp32wlxr0rlfkiby9e60zcxw5rxtz4v0fkrqge9nq2ap8zku2x3ezzy05a3anzrh3yg',
                flowInterfaceName: 'gtd7701b69ro4dca9t25rez8mihg2v1y1wgpu0blzc8lvc6hkubdqk6n9zg30yvg1c5v0h56dq80g41lkd27mnkunpqs80a85hrbj7y3o31n6r3ocf5jzvrlaqdee0u4cvavof4a77xmg6pmw9e47w8qdxc0l46v',
                flowInterfaceNamespace: 'ck5f6mjudf8i2pz79r1h61ajxlnzyh8cqlcj2a6e21ibbur5zqeydgjqagmjdg7vvh08qdhx5v6l2j0djovo0pfytezod5po0wz7v6ogqqmj1mbtd46487pu4krgdw0gu70koeufo5c7uck3vv391nw3jh14evcr',
                status: null,
                detail: 'Aut exercitationem rerum nisi aperiam enim et exercitationem autem neque. Est porro sint illo nihil voluptatem ducimus est et eligendi. Est quos magnam. Delectus labore voluptatem minus error dolore aut aut dolores. Dignissimos maxime odit et sit est enim magnam et reiciendis. Iste ut tempora.',
                example: 'd728zyk4rxb6mraaebqmfblb5pzxhg3tmxtf9a65peibc6m5gig2hyevz09iverv0u9ygwnl49302s8oarct9m3twpun53sm49si9k6mjvixipg7b59ex2l8apiconfcflhf4hs1nbafrpupbfc2zy29536azqop',
                startTimeAt: '2020-07-27 01:14:33',
                direction: 'INBOUND',
                errorCategory: 'gkmbcku94n0qrj0emreswvavomymxij3h810a5jtxhndx9vyg2g692e5rit55xbin3n7vj4xczijy2cy6y8eslogrmfu1f2090y4qtnl304aizsxwaegrld19jkfnhm0papwpbkyd98rrvvgoo65tw33gak32884',
                errorCode: 'a95cf03aoqmzqbmak0q9',
                errorLabel: 267689,
                node: 7660101436,
                protocol: 'oivqhekj2cbtqsvdfvev',
                qualityOfService: '5makdpqrrjss565l5erd',
                receiverParty: 'l7rht98u0157r5no6x4a7t59pde07ddo0jp0hrguz72lpeyv69o5kuk9zz432errftplruq3vbww2dr945fllzbwycvswukb9izuo3i6drrxgkcux963dnwunfiyk8uoswn5wzfe42nq2n1zzym8vamu6j207ei9',
                receiverComponent: '34b4u42ie4bchxcvf9iwzpyewd6427zupoiuld525b7fonv00swqe994rpxks3gk8piz76wb5un2ceypp4ukl5y7yt4wybhi6q2j621hu0bmd4kocn1w0o1l25qxh2xu656swva5rdz1yom0th7177gnta9mw5dw',
                receiverInterface: 'lr0yvm3oi98un8tntoqt5d5gqkdx951fhjfkp9jpeaccsdhpcso0jfj628t67we93ptx3a1ihxs1rdjrb3mfwhj0mw87g7ajwiykh8lb6kiw3u8c1h2c03767keex0qbnx3eki2keztnb44ygsddfzknfzsjhi4h',
                receiverInterfaceNamespace: 'a9sft1r87ng59jphtpwyfejymptrs3fnqkqwq0yxoinpvay2zj1khazswsu5uvul5zyxmtriyht1xnyu0wxck99o5mnufmpsbt8yms1kzzny5c6ikzjd2uyj7ga2u3iuce4vywv3gr1cu3o9xtxy1u97vpt2wyfe',
                retries: 8841331092,
                size: 1490080824,
                timesFailed: 3860272839,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'u3equarn58kca511lm21vv4afwykmmwzv9r03hfbdomdcflokn',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'dnqxv0izd7otk6556wy8',
                scenario: 'xruthhrikws8z8n2gtyscc5tk50vbml9gnk6rabg327tybggx2r75ewph4wi',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:10:14',
                executionMonitoringStartAt: '2020-07-27 10:20:21',
                executionMonitoringEndAt: '2020-07-27 04:34:03',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'tylvhewiszb3maskig6674xfjd8hyl6pdaz1bbe3vlks9l6g1ewhqzecz8nxs1ev5zccfruyx6mnibxstqwzphpr9prf0j233j4to8wygk50xrhx9viz5qb8xb4iadojfl7tw53i3nilts3l93gn41uibe975360',
                flowComponent: 'e79oq5j48gnfpn686iwa7wrzl6suibkccaz49q3pawynm77ezqwye4jjinz4pxk1amszdw5kzs3xbwys8razo5z1wf5mon79qxy2u2ts75ncggjzw2o90uwzjkv0ucqho74k64xucw8yr2vq75kwc3afjw80pp18',
                flowInterfaceName: '1db78qv17s6x4hq8vp7sb4rju1hkkfkhf68u4bijlf8cfgdoebkykdxt32kizo5z3cj327n97d86ttskqnpmsybiim30uj0yeng8y10iioffylulbw1kuxmowx7itjbvqxhgfrr305wmvre0jxmwuxupk53p6b3y',
                flowInterfaceNamespace: 'ghm7gia9uol2sggv3x07nkb0skdrpo4b6is9vellwe5wtw1tyosaj6edhb3s0cywbty653hbop2nz4z2a9nb5qd9q3d5riesz7p3zg1i3dmtk31kqs7eal30d6j13exv5eieq92htjgu9fyzw0ua5xl8xfpqqmhs',
                
                detail: 'Deserunt explicabo et molestias qui dignissimos dolore consequatur. Iure deleniti perferendis voluptatem. Impedit quasi et est. Animi dolorem et modi voluptatibus placeat fugit soluta quam assumenda. Iure adipisci minus sunt aut blanditiis.',
                example: '51yohpelzs3vwvqasms73q9lhezyxklwptdux5ja2t6f82e6slhtdoinhlu8pjm6rimawwyt9kppq9toaqu03wn37bsw6gua3mdofn30xsyj6ndk917v7009cq225fd9114ioidxq6oiwvf7urr2thfcgrwyub2e',
                startTimeAt: '2020-07-27 12:03:41',
                direction: 'INBOUND',
                errorCategory: 'okqwtocg35i0brp8ptdpyugd0w70910wcml120j7gmvn90jaakdhkwplmy5ye69kmw7j5rpx9d1spj3jflwh4270k51jpvcnv6cikwlvlnjmrq17jybflwg5mlg98u89b3eumm41md1vqjeefs7cqwk12pi9rvbj',
                errorCode: '5glisst8v27dposjsoab',
                errorLabel: 539668,
                node: 3696045110,
                protocol: 'r3f8ezyr89t8tvcpfirp',
                qualityOfService: 't300fkb33r4gskdv248c',
                receiverParty: 'f9j5g8tpvtvlpekxzch7eqa213a7eqr7a0zzz3te49woyoycexhnk9410t3ykyngwgv0tf4alicsrb8rj8z2hm9kz8tn3ws8pdvwlowdmqhadlf9r8teoa9aanep9vsmuk4hfue7omif5cvi7sbwtvdzflc5yxi5',
                receiverComponent: '6rt9xekgu13nl8uplgbqk92nfpctb087ba085i1sr64uhhsnpjkj4pttinpvrgorfwmekzqxibk7fl08zon3uowabsr9ovgdzflfyg1yfm5dxgp8o8e62tp5wez4acnwem31y2cgw449dplo6hz0cwsyj0v443rv',
                receiverInterface: 'sv64k7ruzydwl8qmxclfzaf5gg0w6jm2s3klb1pwhkr9qbs0xwiagga51vnn45porlokpwcaf3fw9xwbyqwucxcte1h9vyar5s2tnojqc8mwa7ascicllqkcviz7n2ga1hrbwmlr5lf55psp3b4aya3kkkcirjfw',
                receiverInterfaceNamespace: '5i36m0cjzy5gwwgt935p173pvxu3s4kwf3rw6wfh2r2sii7otrtn81kz41nxd56j2oovaf647qog81eu5us8dz7abk2dchlgk4wzi4pkqu08ivx685pqna03meukh5m5j8nj31pd6zfhf0esshdybz98bptqudao',
                retries: 1426550884,
                size: 7822874020,
                timesFailed: 5718547765,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '65j6qnmnxs530aaxtl6e9vb7t85jtlxe1n7hcouuvzkv209svh',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'hk644kifqp31u3wmf5g9',
                scenario: 'de4pl8kt47g1exuij6q00w4f5ham7og73td1l8fnn9skw7211b7nzshqt0cq',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:39:44',
                executionMonitoringStartAt: '2020-07-27 01:52:07',
                executionMonitoringEndAt: '2020-07-26 20:12:09',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'rncij9egneolet9ok2n0nmmh1dh2f36i703tbngfvb47ydm9pocecebr4fdlmpxqgtqr3fbfcym5mln3m4my5ibzj5pqn8yudjng3ea0mjp8y4gildmxi85os56lqhxc51m4v11yziz31kjmd4i7g0i6fmgwceb1',
                flowComponent: 'rsmf3w2svn63ghr579dcok2hf0hx047o7l6kalsb83d4h4f56xcah5adg00lqlk0dy0bxn7ropoirmvlxge7548w5je6ln5vzccf22nisvehmsfmpw77hhmxknsaqnamd7zoxbsfks1bm537sp1an4d8gnv87x6x',
                flowInterfaceName: 'yf7yg6rvrjjsy1x233ieqbeztf7c5lcbzni0aemiht9v9lnxzd4as6wk0j13wzygqio2ec728i8pgycids6ea89ta4agwzsv49fcqx77mh8h4810vmv69z5po73c7dlvic8wl4dldivgg7iwd3k79oeasl7xhg8j',
                flowInterfaceNamespace: 'z0hag1ttbs1grtuqlgd8hhlyxmp6hnco6zmuy5islnrimtygjphzpsmrfy1qybqgqabi2dzbtulpibc0ijzw1xk3iee6c7p8i4typjv7ifawfbgiitsa07pdag3pru4w5ucx73xn1i1yicrmkbd278lx4oiewegc',
                status: 'WAITING',
                detail: 'Aliquam aliquid tempora aut sint et porro temporibus voluptas. Sint commodi nisi dolores id nesciunt odio. Quisquam voluptas quasi vero. Omnis impedit cum distinctio quae maiores provident nesciunt. Quas consequatur corrupti sed accusantium placeat provident nemo aut neque.',
                example: 'qz9iwm623sh7oa9gdjxxzd4e2c45u9wq2koew5vjqdt7uociiafo1hw8467mv5i0yk7e8225ve7guvmvix802nnaazc5xqfiekhov44wjo61pqoy3hx7597uz8ibkaegscpxedv8pvpjchdm9jtvh1ksg40tz0z8',
                startTimeAt: '2020-07-26 18:59:38',
                direction: null,
                errorCategory: '57yrfqc5qand78p1ee9pa1o4ftsqbfujn88kxn70wuwydq8iurumntmso0nfvn97bf1qcmj3n8b3307wahuwlkv1n5kadraon0my3rhcxsrgiiwg3uiuzx2cqmm11zsyf6cjciisf1t7epeg80gmxr50xsx88hno',
                errorCode: 'ypy92lwmhe1wc4836kks',
                errorLabel: 949537,
                node: 8234708388,
                protocol: 'z6snzhu99vrmgwqijmk9',
                qualityOfService: 'uhhr83tljsen14k0bqho',
                receiverParty: '77qezr75l1aw072qsvpwd69fbnzxau1vzvwnnj14guz1o1j9am2nua8nwk5dm2lplfhokkp19kla14roo65sxnpvazd4i9zistg9x1563c8fq7e126ngp5opim2am352nflva5sam8x8qbrehno76xg3khmbyy4w',
                receiverComponent: 'ypp8bacoh27q9t04yl1ppdw6f5bnlow0rma0ycqrdxohyhx26wyl8stua7ppdadv4fbxg2fhv1bdwbkm208osqhsw0o2znwjbp3mnv7qb2bp8giw3bor441n4nepa3gl0cn0z07j155bs2vtujke41fidyhp2kn1',
                receiverInterface: '2ah3arh9gh5ptzci22hkvf7b5bzbyn8uidogaxzzcyoe9ayi5s4sexvxj6ej6rx8hhm5p2sispmnfsqw6p3qtmvu4cjx4kpacwetwbfeulc0qjbaauazzo2dnfd4s0ycf3un7bqlnp5zdgmxoc7a9btrlgs21728',
                receiverInterfaceNamespace: 'y3u02gjunzcekebhky5dc8byetu7ws25xhgx7il4xlvxvbexol9ixh7ao824ddni2q5rw7puetbhw9mfw317j9j36ihsnitk1l2roezd73v2m6mrun561do9kc2a1x0uyc1nqhda6sesgx8w8efrgl7q6vxeg2rd',
                retries: 9248555368,
                size: 5034891368,
                timesFailed: 3418730110,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'dn2bvf2drq6l9xnjpt7e1ru1qndi1j7ldii60gdqdt5w1ss7n6',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'vi3nwxeemgasii6rixhm',
                scenario: 'gxf7108dm9ldibvti5fwbcvltm133i3grr0d05jumen6453vhnxw7u2aswk7',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:17:00',
                executionMonitoringStartAt: '2020-07-27 08:26:28',
                executionMonitoringEndAt: '2020-07-26 20:16:47',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '9q4sd6g5ellqbtunwbkmvybpcfhaxvw2k21y1fcg8g3ggjob5un1d10am0pwfmbloodon3dm00irt87ekg1fpgs8qpyzjkowtjpo9vkwceh881mq3vyuz3qt5bc8cwaek28i6yhvxfe41cr4fff341p901jp1rd0',
                flowComponent: '7ryprguh3pnakvvaxezo4cp6wwyvwf59manaw9lgi6h7b5cissmmv5zmbii6ybvu9npcqaqy11putz81b4ycx9tqc0xww65nekw8j293imgrw330a0lw9q23n9sz3k1pdicf01pa1ahp3g2iso5kv9zmzcyyjpot',
                flowInterfaceName: '6y1rjz54svl7lmevtq99374e5af7tznrh6e5yw2eqpwhvi4cwgjxwx1od0x6726qd0msipgeywimpa5qxujpxednl0n2eu95dpp2v43ge8k0e202ufqecqs13zo9u4ny6ylw4tzby5casufq9k7rulnu6zlmei4d',
                flowInterfaceNamespace: 'ra2603c0zkhg13z1lprkntmgxhllhhw89bcwrz11ae9cwkt8yf8emlsg3dhisx5ycybjj7nqj7ukmthxaqn3m35wp8sndt9j0rn79iz3l8wjdcplx810qtoo198rfeie6y2ct2m7h1sejh5yuy1zlqguijptnw4g',
                status: 'ERROR',
                detail: 'Quo ut perferendis placeat fugit a quasi voluptate dolor. Voluptas aut consectetur voluptas qui totam. Nemo nihil minima. Quo hic tempora delectus mollitia dolor.',
                example: 'amzp4uuti3c53k9oy4n3nmxcniiwzn9viilvjpfew4bh15d89yi46wapa1l8hfn3l2mppe6arzbm847fm0jstw29uk4ktfk8evwxrvz7exkm9fjk3fgpp3e1zms19gtu1dce7xpdp90x12fysfnvv8ak6zk0n39w',
                startTimeAt: '2020-07-27 03:24:54',
                
                errorCategory: 'i9clz5ri5sr1imiate6olxtqd6vicmz4ysvn0jpp8qdo4wu0lp9bxcoxdg5azgcw0shx8gxs89lh8bxppd5ikphixt9w9iiujl08wfz9pqds5ozezpxh0u0ygzhx82tzb75o7b9zdk8z2ftcvo2g0my4bkzcx5wu',
                errorCode: 'zwl876qhg2zgv1ewrlec',
                errorLabel: 542739,
                node: 9165068104,
                protocol: 'buk9g5571odjfl3azoq2',
                qualityOfService: 'fcplllm8f6xgr2a63td3',
                receiverParty: 'ighkeehmup68x7onlh2100hwzr69t8b5t9ytw922qte1l6njnas394021d1egkjhfrjuh3yul3pwpxzozbqy931r50eywhkqcsx0wo0fpxjhs6p3ejqxw0d2pzp710aqo9y8cnjqrjk290l4ze2w3sz8jxpobucz',
                receiverComponent: 't9mqz5l882cj3nbaj3ls4dsqjx2ma9o0tp8fmttcxy16ldz6sg0vww5zfy7veqeib3n302mhwc2j7pmqkop0g2w8atv2gni9419a6yfmpihne8qbcy8wy7pm23emkfcwry84fsq3ahu1pvgabt0kol300zr8bq24',
                receiverInterface: '1vjt0i24ufwdlqqjnwcx1fcxmtiktcer9k5eg1m1kcp9w61davq4iweow04wr6ww9lwm269se1lhp6xwszb1bbezqt9fm7zah3gpkdy9dp1p3jaubovdjeg66ngfrtfnyca6ergeqxgs8adcx3682is72bdnt851',
                receiverInterfaceNamespace: '1r6dpsd9iczjd145teq60hevvquzfyuda94i284j02ujrd8kadnmytwnc8h9cyesv1z0guifnshn73lw0vlwa24slpnnyh1hmgtd0axh80sjrb784a0dfls34hf35afhda3wwh4bmah4y5bpe979s6njzq4n06ar',
                retries: 9381662291,
                size: 4982496166,
                timesFailed: 3815002833,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '4q56bvkc1fca910zz7jn1quu774jzot29r7wn',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'u4w3ok045qo5or1px33l34tfmlul61nqqywi2xbjsmfzdqc0kr',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'u2t0fz11cfusjyxlf2u2',
                scenario: 'qzs13w6vsf0mfn6d6upuuikxm2s4etgovmip7fn80hgebqskrznfs7ks3o5c',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:32:15',
                executionMonitoringStartAt: '2020-07-26 21:53:43',
                executionMonitoringEndAt: '2020-07-27 12:40:35',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'b6fukbkv479kepvhmsbbkyze7tr60345g6dz1if79hdva3i8e3tms99mdmsbzmye69vy6hbyh2czhe5gd0iml868bxiva4pdnt5loja7zt10hxp9uj0mo0uahz1oth0qd2m8fz06wmztlmg0gsrc2rb12zmlo4sh',
                flowComponent: 'lg9yfrma96lphty3rrfmhp2euiqlbjw2d9t6c4unswv374wqp6i42wb3rh2zao7162qbijqs9bb88ce3hn0payqv9uot1wjrwf44a95q006zvya22loks9jgxhgb974fvo41jvbt5w6jo6jzb0mywc3pnz4quu2r',
                flowInterfaceName: 'ouqu3nzq7t0pjymsm6z5ilqan1f7bamj9wco3iuzqhur4r9v78w1cttfk40v0mosqy0lyc5dg6r4mpr3c8ibuuk2dbtdxp84uwufzl8i4rcmo2nm2vnhs0cuywtcdxgnz0yq2lehuykfnrawzbu0e4gytht03hsz',
                flowInterfaceNamespace: 'vc3mj1i4db9un9vv8buamzcn3fs2sce9puswogrx9g1ptlj6bcp7oi06ipj9sl9g5tovg50wbr0fbrrsd5mbzf4xcbcewyxypaqhitxdd11mj74uwhl2tnva0bawk0u4jdjeaq3vbiej8nfe5tej3om4ircavor1',
                status: 'ERROR',
                detail: 'Aut veritatis in aut nulla soluta. Laboriosam corrupti dolorem quidem ut numquam et facilis officia quo. Non ut fugit necessitatibus. Voluptatem maiores ut nisi ut temporibus non sunt. Nihil voluptatem eius sequi id harum tenetur ut. Fugit qui consequatur.',
                example: '22ccmzc82iugxj2vn47yv61m1vwaos2x9lbijp2j1xs0o3jds55kr6d8wcdy7hiyjl48kfnh7p4hvkb0tvnjkovr9i6rbrlsp84c0o6mkstfydeyhp5bcpo0gt490qxyqm1kdp20r3zemqnq1sghf8czueqd1fx8',
                startTimeAt: '2020-07-27 17:34:20',
                direction: 'INBOUND',
                errorCategory: 'capis16v16i853hetxbh56s9k5hpggujevw0ky0a8wj1rzvtpe05ua5nl3p8i80ekkveplcyxz22ncvzon5i4ze996is2519ata3a6ii9frqoccaqeu7jzfrqz42rzk6hj9t0yoma12cttxi57d3hxz0qk2pod3q',
                errorCode: 'itxz299smqmhxlv0t41h',
                errorLabel: 856597,
                node: 7267694977,
                protocol: 'kd9sj2r1r4kseh5bkym3',
                qualityOfService: '075olex6olwc2t8qtmwq',
                receiverParty: '1p3n2ak2g51jv4ibiaura084873veeyc718xw2vpl3bve8kjouk2cszxmb16j3glh7leluaill2xvhyss71g5r8ldrhwl6npxoku3dlxinpeldc5b1c0sjiy6uzcb9k0wkzihek5cbt971gwfu09eeyw4xqejhra',
                receiverComponent: 's7rh7lmgt0o39gpl55amaped41qa8potbjmfaeqe4b0hlxrn8wzq4t9lgrk984c6895pdxx70fkweqobxhrcyrpfm48sei43jnt9rrdg0h67dtgcfuben8b1egw8ilgyu3200djmbm6i5tuayiyiruiet567sglf',
                receiverInterface: 'zwzek767mj4lyxel8u54i1n48u67hj1lzgjuilbktca3ty50tpr3nd5z9whyjhd90jze9jw1fu88y6qeo4y5t4ido6yt6kdtesrb96b6wnt19b0vlvoakgkhriildxf0akd0nz0ml6qusq533fjeb39sjd9db6ph',
                receiverInterfaceNamespace: 'vl2gt4jsdqukqxf4c1v504gdn8gfr67frpsjsp9oeztiz34b8cgykadzr96nt90lq1t3zqvluvywsdvaqwgkbkmvbw1ls8z0vyhjfci89i6uv8lnpobc0tw0swwcgyogydf66k34t8fkiz2et9jb7vcwxwwpj7um',
                retries: 9950621185,
                size: 7850422500,
                timesFailed: 5329095305,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4xjopckhjdbsto3097rxx8fabecobidy1oqwi',
                tenantCode: 'rqal45prssq2tg6nzkzpcseawlbwlkt2y8bxft2ci5kdx7ec6w',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'vis4pp7rwsjufespnc23',
                scenario: 'oi3fmf3arzj5ol6ojrmosuh6vykf01l6hvdzxt8zdnd3j9vne5dnwqp8s0hk',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:51:29',
                executionMonitoringStartAt: '2020-07-27 08:38:02',
                executionMonitoringEndAt: '2020-07-27 18:16:06',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'hbdurybg8urh8vohj1ew92aqudccfrc77xguwmhitpz27y8qqey1tx8jz968hj19olkhnmaggw1zvrpgqq9j3p8jh9xlq34f1z6ne9doybinynobldd5scnv5alk84oi7nm2t01q3rw36tjyd3vuphrf9ig0lbbc',
                flowComponent: 'mpqsur8enr606grjr8wsqnyccofs2g6dt4tq82yaunl2ph2mevxpejvsxeq4yi8cvdxeu8nemp7l5g53xzu4d58t05yga9j1gz91htbx336zdqnq7gwwph3v4m4sbzamcu4ufkheq3g4lhsmqru3wwiejo8noj5j',
                flowInterfaceName: 'vb5zdh67u4egs6xn0c1v4w8w4ayfu360072y8ev2iyehdnyzoem37b84r65j4gmb8bklmysf3ixk657zp33hxjy700zdiq3qrhk4m35s5vbexk0ftwbc0s3rz7kloewibc3wta8mw28a7vljgdyw1mqmhb4pmusc',
                flowInterfaceNamespace: 'sbuosk2xqk5dhv3b95ofkwzqjssjvvnlgvz8xej4dniq2b5k99vcexsfbds5pkyt5ibwcrw751gru5nv8s65z0x3kox8m144iaknkdegaej441p7e9dlykbu7s81qkx985tbbuu5gadi2mjk9knddel70e4laisj',
                status: 'HOLDING',
                detail: 'Quia eum et qui ut tempore ipsam numquam accusamus. Eos tenetur provident quasi commodi. Vel sunt est eveniet harum quaerat quae itaque rem dolores.',
                example: 'ouhr8z3n02182cgmpl12dfuu76y6jsd5634f4q8mckldqrl78vr4dnte0sgg6x65lqm1t9zmz4f8n2p6zjk2o3h3z8evspqyiokmp37s4908jsiqvu3jxwp4f6ges6l30eoa24l35zq7m285mxe8twxanqudyv1v',
                startTimeAt: '2020-07-26 23:47:32',
                direction: 'OUTBOUND',
                errorCategory: 'i4tzzdttw9x81d87i0678l601jzc4emyi65p7w8dkrpzflrgy3aogpob445b3sfyiuodi060qc980mlrdkju1nl6j1nv3cfwtmtsnjzf0bpnat3on3k52fezrsdly2zbkyixfk9x32j0h6vvat63edgwf2s038ir',
                errorCode: 'vkxc740wz1s3b7tnupqh',
                errorLabel: 617093,
                node: 9793983426,
                protocol: 'qv0ksjkgpbiiw2f67wuq',
                qualityOfService: '00smdznoqapemco52hzu',
                receiverParty: '8xxwgirzfrdobj8m1yvqs6qsusp4d0bry685fldezefg7obyejoxg3xrkp5oj8gtu0q4zu8y72pwqok4c5xm6h12kb3frfvbgpb16d0ktnk6qd7rwhfw2cbz9zoa2p692cb303feao8a54akqgciyl44bftaeb8p',
                receiverComponent: 'w5d2m36n594mhi3dedmhxtdvgt9u0sjb04x4pjixmtiqcgccwf0ke9ir53sq7ht85giodqu0xwpzyjp9zs5fpwl0gz55ufwflt61stdnsb0gzktg9pfk586j3eg3mtlqyv06hhg8z3ftw09h4c7s2v0irigbjpkp',
                receiverInterface: 'dlyasya6p97s7m1qpqni3p8jnrj72mseli87t78vfu4ow4k7rsehbsyvk57deapas3tqctfc1k7qkvc1ehkmp2c49c16o4tlbtfunkjehogvsd8sulh9p13mu1d57lo1kib0o4dd9lw02k84l7bkgodarbect5fz',
                receiverInterfaceNamespace: 'nfmyowtbp652tq12ndrj927ot6fbt0bnkrh16ljacs2upz0e8j2oq0yquugcq7yxhyyx14zyvyk297dya3rsbiij25ngpruy3if4s5ag62gncp3zybvj3e393nhrx79owxd34o3ywu4iyo1tcpfyxcx769ieysdo',
                retries: 9862631826,
                size: 1581025576,
                timesFailed: 4452990652,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'ofkrlc7x9ye6iavy7k7q9ujgvxq3z8pv46srggie8b8fy7g4oz',
                systemId: '3ks9v7i6v42n9go8ox8o7m8zy0tmft9ajvi2v',
                systemName: 'lhr7g6uh8jyxmtbcx6il',
                scenario: '7ug8ze9dsrxv60bgf6idqqnphug3stnnah51kc7yzti90yyzveszolaez2ys',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:08:59',
                executionMonitoringStartAt: '2020-07-27 00:36:59',
                executionMonitoringEndAt: '2020-07-27 05:52:52',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'gdjgmska4bxjbkyqt616fjw3jujimmdkhq2ynjzqsevua1wl879hetfeiihdfooj34gbmen2jc6s7j7dsp6prleih7up0a8w62ylhpe2qes5wpskpasll41t68jqmlih4dwue71t137vh0kpvyznbexjcwto2644',
                flowComponent: 'vnketgnoj22uqfsmapfa8dtlgg7qyuk8e6syzzdke9c7gpgyls7heihgkb3pjsdztpqmzqybavk14k6k1sqh4gh1xlgk20xsztypzlxdclqlvj4z1q74hjrzym9k84jalmrlic11pgjo1xdem4uelnlodn5zvk2h',
                flowInterfaceName: 'u1zu72eudg7ksfb50kzub6vsq8x3mr7vgnzkyuhs7ntgxibm2e3th2p4ra47vagt8lrk664k43mix3mkzpio30ivfb3d4yh9joaepkhd0kj41wbngjlw6yeigdhfvkrr5m9yd0omo4etixsk3olpevyjs58ktq2k',
                flowInterfaceNamespace: 'q7kyyl6ixcrge8yyb513iicmilv0sdff7h272w6g5i5cmmpzynpn05s1qo712pjv9oi02338bzqn46hizyvnjt434o3ismmxsv0b6f0ep5fwolvns941xu2pjre78k7jrf584lsf4j5cv5g4gvurq9k1j2fgpru5',
                status: 'DELIVERING',
                detail: 'Voluptas ut voluptatibus. Voluptate eos voluptas et. Vitae fuga delectus illo. Amet occaecati inventore amet ab ea alias enim. Commodi qui maxime et unde voluptas consectetur sequi distinctio. Omnis cupiditate deleniti sed dolorem ipsum numquam sunt.',
                example: '316iv83fhz0m9q5x2f8re5w4ty44bevysmwe5uwnwzjtfmfwj3stue2csqybhcrfxb79hhvc0ek5abfeox2yzpg6fdmfnevf7sigtctg9si6orsiwp60baz11mfhplzac94tbbpmyr5iajy5ocwurcgk5eknp1jq',
                startTimeAt: '2020-07-26 20:25:26',
                direction: 'OUTBOUND',
                errorCategory: 'tuhvm6xw4tnxmkb026oledrg6qjax9udv3001bzoit53okxikjmwrd7exdltiv9rcyptpd288f0j413m3l98o9rvqqkxmst54ojp5twi9g94k6o9nstrobmv27xagejr8zsvw5qt4lq8sjpgo9cegt9n2ebk3rpj',
                errorCode: 'rg7i9lsjx7w4dbr3by8k',
                errorLabel: 527277,
                node: 1884324382,
                protocol: '3y5ols6tpes061tmhjez',
                qualityOfService: '0cajdxkq2fbj3zsueofn',
                receiverParty: 'nj951dk112krtl5y54nsajh707wno9as2ducm8m4455yrwh9kmj0wms5pmi38od6d8qw9g1l9wvx8bpzgfgoycu7r7jonppyfmwwq30lr81jl3u76qebv48m09jymoq22y4ysxmfw0l5mei24vrw4o5a6o4s3y60',
                receiverComponent: 'wji5j6gnxo64t8k000mau62iyo6hcmdujmmgxal6z25dtmyjb5otmz4hy6g4wudmqz5zn0cr6u6tdsryh04j3ewslgmim4vz2g48szvjuxsujzo1my3ca4n1w66j4qpm11nnu19t74tcts9pq3hp0rwke6axvezg',
                receiverInterface: 'j4p8fyk4dd53nq27pdy2jnqrrbyv3safvzs2xi1b9v4qul9am3kriocjc85bn8b2nf9pmwst45phzoy125c449831aoshobm2um4pbffqjs1kp3zkz0ko4dorjznfa7kzkluohnkjwu4lnymlq718ixvrltbsm08',
                receiverInterfaceNamespace: 'to6qaknc6o0x8v89f9lw3wldygrovmcxwniseszh071a9prn1867c4fyd8blm1ojmp3ysq11o4nvnjcaq5p4as1utrhvuncnhav5gzejtxeqaz6feoe0m0yh4yhxa1584byp8zzc2o48uri7q1f83r6zbaa6r7ip',
                retries: 4758767290,
                size: 9641847338,
                timesFailed: 2983140216,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'rcce0kf5pusix1ln07jk25ygikohm4fg1to3e89viqjyj5tr8g',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'gmoggeh8d04l6riy06xu',
                scenario: 'k9jhacyi1ezgxp3hox706gg3suw5sradxra1eaya04ov2ihn31jap47g4l33',
                executionId: 'd6dhgbhl5aj1viz4zeoqi6rwt3esjcf12czfi',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:11:01',
                executionMonitoringStartAt: '2020-07-27 16:01:13',
                executionMonitoringEndAt: '2020-07-26 21:54:58',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'u18o77crdw02aoxyy9w33ilvwe2c2xpucx9lrbayat95lqqcjou91nrp1l1tsx0rgi1m9aj4uf1d71cx7mhivj82cmybu48bf2m4jglnmr57jqllc0t0hqwkh9r726v7625ga6ntpco5u0i27f2p1breufraa5b2',
                flowComponent: 'z9wxtwmojp6xmetfdv6w0amlndt6wjdpeiwvo6w2ij6gfnujw2754yvzgww1p463jzrzupqyh62crjw73tklfs2grtg7wfk1web4cgx33mqc7hoovnapuk7wyh4r2gxkss94uc1ym1zmzh7a6ititwjy2317dvx5',
                flowInterfaceName: 'lkg9kr8pgl4at4b42r0wjjrb7pvojt5ja5ydoyexksro1u84ddlh33lexdp4as0wkjqo5d2apedv7bb1b9agwo3fccldr6j8hmaljhxufbwfc5nwfks0cnui3nj8n57nlnoxj16pzlrhh8gwncz47wa05i60yemh',
                flowInterfaceNamespace: '5p52esacjloj4lzmuss4grx2sk4cibix5bscxf6roy6shuzo7uuzvnkte8rhjw9qidwiwa9zz88tn0mkjbici7jkfume9jhsav73ju3zonzpxwgt23xacjwx4z1spsylr0e9ialkys668bch9m6d1tbptk1ecowb',
                status: 'HOLDING',
                detail: 'Laboriosam aspernatur repellat error consequatur labore praesentium. Est vel eos odit. Dolorem voluptatem quo commodi repellendus autem ab sapiente sunt. Illo est praesentium.',
                example: 'h7byi78m8nkwu0ogf0bdpcegsnbxsj8o7f7u0k192t3uxy6e7f8r0q7tftiedfywji04ipfb09u9jwnaz3cupy6uwfyrgbt0e11p8y0qjedcce3r00saxb24r1ngk6fz2v5gswpqpm8wj845wikeqmar80pvzv4c',
                startTimeAt: '2020-07-27 01:45:46',
                direction: 'INBOUND',
                errorCategory: 'cpqz1d8ql8mu8a80rym9175axeirlgkjrdbjmgr7tzlu8c7pbgnme1lbe0fhi75t37ndtrp13u7hor9qfmkva702m4iw455tczmy7k5bnzx40sc44kq2aa2gxnm8rks2lf628t7r8zm5iju6n25akox7md2cf8qh',
                errorCode: '3u9vmrpx8qttl4wai4qj',
                errorLabel: 464756,
                node: 5638512896,
                protocol: 'jokx7ezzza0b609yms2l',
                qualityOfService: '33yoipmwkjm9usgse0i5',
                receiverParty: 'y5byrsnkmfhb4u54lgruuwdg478ldyd3mwphnbabhwhh4to4whufn5fde4vew6aqav1kop7gatu860n98zrz2i4wgcbl8en3dk09652bho3iaihqoqvqfmncrcabdkoeqpwhpuriid1ne2igojvd74d98tv4t7su',
                receiverComponent: 'myewwo7ag2g4ewhimmc3xpw6sywwg5pv4totu4m35ik8bx5iroyoy36dzj7e2ghxegjfragldv42hctmhedu8n0fyurz3259udkzvse3zwrqibv9c27s7b66biexd2us9q5agvwrjwdzqjhqy5f4fzo9yng2z6pj',
                receiverInterface: 'n99sero5vunv8cek0kxlbqtuc0o9i65odwv3unjchn22ix6w8yjnoyqsfqvzttaha9oqaxd5dqnjy2nc5lly1dzvu0u1grvck0k678fvf0lxnhvws5ne1fclpx1uxii47nw2khhr8kt7ctc0rxoz5l1t4eub9gj6',
                receiverInterfaceNamespace: 'l6jllvntxvujlsh9fzffht93c521c9xatn6agqzth94br4adm5pci9bi3t485xp4jq0ecd1wbrjg3zes2s8p2yopdl96gj1a8e7d7k5evf7g68w257u3zvxl89y1yug0crup9tsjovufnvzdqcxw20lsmlv5lfih',
                retries: 8428388828,
                size: 2764268453,
                timesFailed: 7383078454,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'fnre1d9d5t74ifnthqfwue0cq3mzv9kn9v68tmikfs2jv606jy',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '4r28xeuakc66djix4me8',
                scenario: 'lybiqdvblwvl4b7wz6xp90rpvxvm9v4mud7kc0ipl6vwaaujrwajz5xk3a2w',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:43:08',
                executionMonitoringStartAt: '2020-07-27 03:26:12',
                executionMonitoringEndAt: '2020-07-27 08:54:58',
                flowId: 'bu9x2zz4stdo7qs1gkd5rt9lter6xbk3spwsc',
                flowParty: 'vbbwbxsnakghxlivj4g3gz7ua9p2yyp1pdhft3egvi2diqpedj3a5ci9w62272bolizn60on171ogccjiipf1cyjmc9267ge05e1zf2fdmyhpr04bc1umx3n6spsd7xp1ezbtb0t1m6bbc2fko3ageipuoqi2rix',
                flowComponent: 'lyaej7thpgcw5jsux55sdpsvyycc6pdqz18xtmph9ofkg9twyq2vhodd3spa8v63wtuhbxeft3a93qvqcw5mb33qardkqf8fimsnrk36hojhe2xuig5o1yzkcstv072luc3av01pr78n3zisf1lxp9z25z6z5nga',
                flowInterfaceName: 'r51b8pz820yxakcxcca7uyvyjmgtq8lb25cjapprrwqgb1z3si0xnjos8kb96v7hyi90z37n2ln70o9vb1dc2tetk9t0ioc184wyz0j9mlgud4fpiytaekku3xf6jx2uhtgxsg2z5fabkbq1x6wjt0ru0fmmb6n0',
                flowInterfaceNamespace: 'wr8ogvhygexktcvpmy2d1wodxe6lxo5wr6ik3rh0m7q4fxjn3recramnunadpo9pgjhf2lqxmr0n221wvh19vvar1ai917da5ovpzpkqft7x41b8t6ckkc9jxhubn7b9vpec7ang9ld8za43c7jvw73f2wqxuwrr',
                status: 'ERROR',
                detail: 'Molestiae alias eum illo ex. Hic in quia non nemo aliquam aut. Aut laborum vitae est quibusdam fugiat.',
                example: 'p68jvyxdsci0qswfo1tqic7fq3e27ipeygm5ywhc6tyzlfsv7xccb9kqz2g8s31ud2krubuzaetee8rw73vcdtl0zxzkdzkeynapln1u04nop00z6g7ady8fqe4ooqfwp8ruqasgeh7qnvd9jrjpr5viwdnjs7e2',
                startTimeAt: '2020-07-27 03:41:58',
                direction: 'INBOUND',
                errorCategory: 'aykntybc7nt0i7ed40m90e00y8d3tovbbu7m8tihoibm2i6veqwrrw7j7lwvnjt62uryyopzvp4q8ph0tn5t7f6tsdxoccwzgy4e04sh096jt8ov79ffbk6pq9sot86hi4reg5moatn67pp5xdy61cj8pc9jth6q',
                errorCode: 'rvgztzlwb41ode556kdk',
                errorLabel: 283100,
                node: 5914982832,
                protocol: 'dpggt82kfyj19xkzas2t',
                qualityOfService: 'aagfvehwnj2o3owmt86v',
                receiverParty: '0qfxsomnk8zsl6y3oelm6knyzz6u3ds09rhznidyga1u60lo6vkyu6xx1sgapmjzluht5amq39xnma037vyukga18jqr3tsk6h9qzhy91c2r63q02d5vwhwbgei7pt2teoi0aa27u6moaz7cjgcb580ltw5kfzyn',
                receiverComponent: 'qe4axyosx3ku5emxwbqz65r0hlvfna24rzwnifxmp2nwaeoqb6s3bnukmwe8do18scz6oqqbx83jw5ll8x7btcsttmhgeizycqzq0j3jvtmwtgayjnjr5aiqholvs5lgn6a8mgkrj3dolg1dtzapxnn69tlq70zi',
                receiverInterface: '8by86wli5jjte6nh7bhv87s7qnm5srdqav6faxn149oxxci6t7xsi5yic0irlrsqfxwpuajyovuvgrl4jqhsc96565wwuhnjgnkpyhlzu6j7ac1x5xm0zgd32pkddp9v41zexwq1ojgdl78ahgs2qvdiycx6nj5q',
                receiverInterfaceNamespace: 'dauziabwt4kc7dgrh5vudk07pf9hhphljuq9ec3qsxrzh11gjpfuyp54pq7j3v51g8qppxu61wq4wualgo4kk3sbsy6o2q14x1840mzogxxqoz09g8ps5t9x88gvc4vdhmmmahkkwg3js9ahima63e1wiq9738c7',
                retries: 8345046390,
                size: 3128674464,
                timesFailed: 4149419474,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '9kq0pmzn60jy2pdp12tnme2cqm9hveyjsa1rjzcy2kt5mjhfevo',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '4qsyosjxz1k2fd7h7ia1',
                scenario: 'l2rce0dku42t7lyyrc6q568vl6dh4abcui3hdvn70w5l7q0fd1qd201jk3ng',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:54:07',
                executionMonitoringStartAt: '2020-07-27 17:00:38',
                executionMonitoringEndAt: '2020-07-26 19:35:49',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'nfygufaskwiettd6g0omqx770yvys0no20tq2jh55gwrwp7txlsdf8h34so0xo93qbsuhejnav4le0c62yodd4ipzlm7dkkdengv5yza20ifhdj3bagnpx1o5wz3qolui8jdwo89xw0v45ztuevpiks9yhezx5gx',
                flowComponent: 'giqiujykf9o6mjk4mzb9jxgj2qfd8in4ad3k8600nkhi68dxm4sq9pqedud9wu0icdjanrhdru56he81e7id1kko4ip9hc7fievk1kwrzurg0hzdls3sdpxb1jqo5r5hou4h99fh2qaph0uhhscg376nxfw68s5k',
                flowInterfaceName: 'ookg1ij7fsx5cern4vti97rybid67ize93wituy5er8y80t1zsm9wscm0226bojjcan6ix0qjatwgmxmuy2oepsd6qlxqxt6xm0ci7uzc68cvj3g3j9bamlhtpk0cdqc4gv01el31mdzky1nng1x72tfn5lknfyv',
                flowInterfaceNamespace: 'spq4wlbsya97ut1l6d4ga4e046u8eong1gxyrwdtpum3lxvv3b1daqfdovozf4hus11cusuj3rd0xczcnyvtbg120nscti7h2a3x040sy06frzmncym6bwtobs729oipmt10nbtqrytyn1cutbft2l6ra9fgz24q',
                status: 'WAITING',
                detail: 'Laudantium perspiciatis consequatur aut beatae qui quis nisi dicta. Eaque pariatur voluptatem praesentium voluptatem modi. Tenetur assumenda quis aspernatur consequatur. Molestias eos minima.',
                example: 'hlp2fmvgwkh8gxu5oblz1ynxz7tsc2jfp6v1q06glc7gifyk36oo9cv69wiaj93bp7wz376j0i04krlaq7du5h6frf3vxyrri9bwc987msypecrrnzrlhinm1voqbryjw8131d274y9rpap122nkb628n92n6qp1',
                startTimeAt: '2020-07-27 13:46:03',
                direction: 'OUTBOUND',
                errorCategory: 'y7vvk47emvlemmrxvcwtgzmuhvyg7ae30qdw9h6zmcnzw6iv26vymujbaf022ja70yg7wcy03bxbucit429si80x2th5ysxcr41eppdong98630lje2rs6fwcf3rv20dgd9phq6vgxsofp7c0jtwr5812a775axs',
                errorCode: 'sloic3hmhhdlamt8ivmz',
                errorLabel: 613727,
                node: 8994736813,
                protocol: 'ja4imfwmxhlj2vs3fsk2',
                qualityOfService: '8lutoc34w3g5tfge8zlo',
                receiverParty: 's048ttbows7ait0dcpplzhor3t9cjkx6oe5yyt23fdpwofrnfe5jfoi2st2ul3og5ogx9mpaxlk4sbefhyoifebxs9feg2nd2v23pz7ifjvmd9rr5pwt3dkiqzywblhar0cuyp6n1qao06jb32zuvl60t3i1mjl5',
                receiverComponent: 're8u5khwhpxq3inz9nfusa63ued835dxghtnbgel7roat7ggches8qvh5r9dqgpoj8rgdpi5odc1oefu7fnhowuwzqctnw5aym0iqizgow0ao8v66ud1wz5qrdvmb64nf9n91j96djbe5zyutqulbcw3zkeet7mb',
                receiverInterface: 'rnpilcvlaculqilj93y3sbhe1dsvn38ac1apeok9gqg09b4fs0frpo8ttz2luizbomeuzhd2x3qcthak5socph51xyq5sonig879wryx2irgw8g8r3wpkzk408opgro1j0kgyqnzdt1ix2qek55su8aeyzcf7irc',
                receiverInterfaceNamespace: 's7laaol0uj800obj076smle164l5ww5qgihynv042fk993k1r7jvjnbiu0m05f7r0x6jhb01fiq45njw5gnetfjdv7fgynl7qervdfe5yvpbfkbyjcxvzbwm0bl3niunooars0yflvham7qewgfwk9nrfnvfmnfc',
                retries: 5276016272,
                size: 1649452424,
                timesFailed: 3603918693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'uiippdo2z32ow4hd95u5tszecutr5pd1fhfukxckj052jiigdw',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'im9rioqrki0i3or9ewk96',
                scenario: '5lp0t0x953kfugea5yujpzc31fe59g4176q2w9667gidf30kwtbjfjg88blr',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:29:42',
                executionMonitoringStartAt: '2020-07-26 18:58:52',
                executionMonitoringEndAt: '2020-07-27 12:22:44',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '6luqurgjrzqpn03t0rlz4sfv8rll0ctcjmkey7mhbapoc0mxw0hx28co0w0zkgazn06bvr6jybreebo246kuks3gbhdobiqrww3scrysxd4f7vn5af84cekwd06qdanwuow4mqmvhzaq81dpw0f06p5c4lxmalbf',
                flowComponent: 'pq6o1c9nqafbjlmlfn890c7ps62x86cgmiyu2ywn6b61rytnotvqg72fzqsy71qmxf6uq23eaj3xpyxyvbsaxwhvqn39qg6cxmoq5njcybizschkh6pc56b88eep4zd29p8o9c11e0yhvf92oikhbxmotp3s5kcx',
                flowInterfaceName: 'y3e6ypj8x09c51l71edt7kreexvrmekqk7lgq0jsandtt2dvbbnw29zcxw3kw042m27c586litzqu9gjgaliyrm3b45de2n84tctrduube06hxli8soite1aubihdogqaock39mfe1a6nuaa9k818n5kn1tq3de8',
                flowInterfaceNamespace: 'pvdkf08bllo6by0utecjmwpfd084px2hcbr0pnug9wzgzotfyqbosy0hm3ewd382f2vpth2g3h1hdvi9vtmr2cv418ad78uco2551x3n5uyi92gm63gh81o7te3bfboxqnrhy9x6eqwu6dlues4jr6j07k44otmb',
                status: 'WAITING',
                detail: 'Sint et sit amet voluptatem. Et et doloremque est. Et voluptates voluptas quod et atque maxime. Animi aut doloribus dolorem illo est quia libero. Omnis libero et cum omnis. Ut ut hic in fuga quis illum.',
                example: '5tl98iptowfvaa0dlefae8dibdv1sh2e8709f9ls3zafckgq58ek34u8hk75lz26bifqjdqypgwxchsper2x2h881csiysxtv6i3ckrc7bcofj2kwqkiw37a5h37q9lhk2k63urpz7j9ifkwuk5ipuq92kbhlzwc',
                startTimeAt: '2020-07-26 21:10:41',
                direction: 'INBOUND',
                errorCategory: 'c1lqxtxpapd0z2i5496yaoyjnfg0t6li76m9naw27dwzp4xjfqsiryljje5nnnuzxsde7druk12qh7szcqgrsjag2zolgz3h8kdrzxodu7e2zfhh1j9zjx5fp8jqm3qa4v5b9ed0tb1nhns3yb34i553yql9s435',
                errorCode: 'dyzu8zi6mksaegjj1007',
                errorLabel: 784194,
                node: 5108779003,
                protocol: '5g7chmua21g1zq2gmxv4',
                qualityOfService: '3wc192ejf5fqf98dypj3',
                receiverParty: 'sjp4c7isy8jlvw4jztw5elmxbpx7olwr675ej06xysln2zpkp3nfmdnfgbt5378a5ihl64dm8a1xja80t9m2mviz0yv68e6w1ebub0y31y8taops6s81jhd2yt29d919gx8liu3morccbwrvjublnpp97ff4hveb',
                receiverComponent: 'taq4ib4rst5qp1721qm0lt0okmisz4c0fmbiq78k7o05vm28bsldxd00okv5o29m96kmv14q2ad9jc7hw5ed2n5e4ixs7w5ok2zempcxg4s6y0b98rbeppf0nkinvzu8fzdz9panirp3kqm4h48blul998dwb45v',
                receiverInterface: 'p2nbglskg7f2t56312xxg4vral4eokd0pj3iq4ujsah85c1q3ifat6btawb94ir2c8ksyup54t6qpqh2cex3wtuly4281h3bm9wo9ewqx7fahzgpl1j8hx5rfegwk73vl6oz6ilon5skbq9s60v4wajzsgz5m7zd',
                receiverInterfaceNamespace: '5c0rsog3hk4f9ub80163585q1kqrszzu7sr6o1wngpyhq3vr2eyslw0kciur0e6nk5y8zh8xbh113qbz922q8h0qqeli7jdq2pud4ei4akzbq8cbuxfvr39gpe1tn8bgo7kpm47220wu37e8vllxgj2yq4flz5c6',
                retries: 9575492435,
                size: 9658141134,
                timesFailed: 1060348647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '9wt97qeggpu8f86j9cmshor7f84atiqzgz10uy6iejxldf6kt9',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'b405m07cvis199qj76n9',
                scenario: 'aw4ot6mw5dov4zzqke7xje97l9ycak85shk5nuw0w3e2gk1tlx99dwafmjcr6',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:33:26',
                executionMonitoringStartAt: '2020-07-27 00:06:36',
                executionMonitoringEndAt: '2020-07-27 12:35:21',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '86egreytjqd2mvz9jk0dkmkrvy4nix8kwaul4pag518pe1704cg2kbv7bpzljvxjp0m17uljpwg7ncujgcfs1y8hlvuh38owueqx8eb2k9ig8gggpywjtu843wehi1b1c1ylzjmkz9oxks56daaa5lt4urx1mrqf',
                flowComponent: 'mp2m2tpsb1wetpzh82suajv93i2fkl4fis9yccg46u4aerxn71pg1238a4ph81fipx913u6equ61f2qxb80bpkru6bt4dimx7g42rj24jtpkjcjbijpvgtp0w8fsdpyqqkbdnm7xzx8wmm3lup6drbho30ht7mh9',
                flowInterfaceName: 'z88er1bwb10se0tdaz60rm86od3den04m8h8vcco2487bbk8p01oulu74a3gscmcdkshk624a62qale6ypjtyg2spba7p6mk6avqxgl7k0jq53s9igrymy2orki9ko79m8etwxczrel8i1ougooethmygwlf1zkj',
                flowInterfaceNamespace: 'ofvs4k6po3s02rxa1i8a1wm5sf5sxb8kmtsz4lgrutv5owqlsgl4vh9r7ync1ix51nc0oih3ap4oo4brd33yd326i7c8i5l4jakayeaz9hrwr4e7nibhzrq7nj22wq8jm7x02o9j6t8qwkue6rh151aczow8gvss',
                status: 'CANCELLED',
                detail: 'Ut alias repudiandae ipsam. Vel laboriosam eum est ipsa eum ut. Provident ut aut quae.',
                example: 'id3wroxctuoff7j2zj2sypwy95c252vfrem3e6ned1orerea31ax4t0eg7pi43qfn22d0znrkmhtfn6bzzoxr5pvknsmdwy0joe0nfvkdn0siuswwgsodoibxvs9ngegqr54hq6548iorq91vz7w1wgpj3c5itaa',
                startTimeAt: '2020-07-27 03:49:13',
                direction: 'OUTBOUND',
                errorCategory: 'mr3mqmyahw1ylsjz2wgo2xrr16fvfbb7uupnddt8dr2nbdwu8ukpnvpxa7xttz5v6y63xc3tzcbhsvfig1phbq3k4vtp8f3985r5zxtqfagjfih6frud13m6i1qcjy22e5eqvb0pjqrz44odxx1tvf958d035xjf',
                errorCode: 'pcts879sqfhjgxdlwwxx',
                errorLabel: 243126,
                node: 6718814943,
                protocol: '2r1ie3gnu00bcesul6pb',
                qualityOfService: '30l7m97zqsddvx1qz29i',
                receiverParty: 'q724z5j0l4mhygjuxoc8j3mwdgn3rfvzqky5yyvimylr3xyk0hjf2s1ea04kalm00650q3m57wd0niqtlgmu5tc75tctv6b4ar0pc2pzimcbixes5vzpg9fr33h5gdcrjn8s6v57k8cgxnaip0ht5235owxx3hbc',
                receiverComponent: 'zdwbgbx7faum5jimur2f0gli7c77ilxvybd1kqbevgkep5jplgyqan1skmm6dd3vsncl8s4pjskuc2vn1es1r0a2rc91vfispjkbaarobb70eg5ftkx39mt872pypwiapx0n4dandvu4dteft47udmb36plm4v7k',
                receiverInterface: '34d3zcuf30cn91qxspt9fwagon4zi1ed4axzl1di67l0eeg0kap185uixfn4y3qnrhhnoek1mkptj68lfim3abw3uxjr02t6d9ntz1ll44abrrlk72c5ad03ys0lhg7sjim5iawdbln8b2yekjyzu79si7e541ae',
                receiverInterfaceNamespace: '6f5x4izhsx4tt9xbv10i5kioxj8r5hfvkr588cdcnv6cctx6in4ixvwec1iadnwkl4l7srcu10fznhz3mi5ag2161u7aceg6uwg0va39d95hyulb2hs3zeuc7a0kh1wdu363b13j7kacspou30dvtzcf00lfxf14',
                retries: 2922242359,
                size: 1185739291,
                timesFailed: 2315662240,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'l1a5ki1ru4iedbomrplaenaab6m5bsqj2gafkxotzl5ihve739',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'yr3ekzk2syrwd6ir310u',
                scenario: 'apqs01tjuolx1m2wmqdwhc4e8mur0bw95ineagvroobdio4c1d7y2y13vzwd',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:07:29',
                executionMonitoringStartAt: '2020-07-27 10:28:00',
                executionMonitoringEndAt: '2020-07-27 18:07:53',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'srvas9t62axe27krwudnn0wkyl7jl5na3y9kpmbwfek53fveg8jl2luwnl50xdxthl4z5zoxmgsa6pn6y98n0kg5qjjj0vloikxy522a2nf1lq4p1j64g2bgkmigk3bgl5f8mhbwoou9uklgvg6rd8nqz0lfahvq7',
                flowComponent: 'u09hmplh1x6weuzek61rj1b1uebkszh0525t3ezd73r3hh8el2oj4dnzowqcnzif4lg6doglly3ygs5nlb94rzhfkl5dazrs97v9edc9bvg8x1l996wd3qav2x6sje9dofpgtyen4nh0g2r3q70ahqriqeejscev',
                flowInterfaceName: 'biobed9ti4lbzuzcz6l85twrve5em4iusd6aroh2ifahdzpiwzgre5798w5zouzk0e2gj167ezo3jx42bh46ct2fgwrfy3r37fmpvv8hso1rprwsf1krdetdpkivob55qebbic9xhnaxhvqyn7vilqn1heg84aei',
                flowInterfaceNamespace: 'f7hgwdr844vd71hsm2c4x7isjrlzvt9w9fec6mlqoj5agathgozt9z9hzx0lorpbfazkpnl75ve1r29594hrt8s6v4kaja2gdq6wt1hhxnyvo5m4h90kqux4qpfj325iu9rc5vwuhr1vtiy3gz2nu573o7wojhyd',
                status: 'DELIVERING',
                detail: 'Quia dicta rerum esse cum quisquam itaque. Omnis nemo ut voluptatibus corporis repellat minima consectetur. Aut quis omnis nesciunt. Maxime ut sapiente est recusandae eligendi dignissimos voluptatem. Modi qui qui ea temporibus officia. Enim laboriosam et.',
                example: 'h58xxnrwcz9kid45eerl1o6sxp7bozc55e2bb4900prduxyxzhyr9so08sfrkrx8fivafj90dgvv7o9zlyjcgpkywcvl9aezreeaiu6ul9xutkne59htnyac33zmkiux12elbpf8gzxvdyxxo74t6so7f4o013l9',
                startTimeAt: '2020-07-27 11:01:58',
                direction: 'INBOUND',
                errorCategory: 'ou0z3d02b3h9gzrwrqlg6otw8pkh2ms6i0x7y6tgbhaz03evjk24ejyct8ulxs6ljzl5sxkglacsoc978h4glfehllvv5z71xs4hdj3f3f2qohjtxq6us8oc20ls6xjekd9xh59s8ygb9a78xssojo2kk2u6ik7r',
                errorCode: 'hn1ddlpvn13x0h35hufi',
                errorLabel: 550220,
                node: 4696275798,
                protocol: '5j96m3fmkd75b0003yvk',
                qualityOfService: 'xyn4miyvsvyxykpws15k',
                receiverParty: 'gkjn4ig9c7f4ojqol2xhjbnwuq3f9454hf8gvqsgekhi9ybqx243s8hxk983up5vfwkjw0pimsd0z4pmn6hw6xjqf949ezdgd21fjo8w8jh0zwyg63whzoz1tbvz4tqydzkpr3bur1tdq4h9yrsyovnurpphw52k',
                receiverComponent: 'ad4w0fn0duuu7c8sdlpac5i274r1x7z86loup6tbabhvg1a56hobwzr5cp3xj4l3qay0v9c145kefyvlei06nxvw4dzswbtw2sw7djg6dgahquiz02vip9d8cr9fclrp85mhzzinaec7jqbb54qhp83beewpkail',
                receiverInterface: 'm72cszyo55s9sj7oqlq05179jqmfdtdo2uwqk079qh5q9wvrid5qhzqomzzxh0dib8ugclfygodi2ubfv18sk70p0ci80wtx8xutz5jby9qe9a1n8olut69zs5ccuaisqjf2etgomx172dbmvdh5hcywkiud1gnq',
                receiverInterfaceNamespace: 'q4jufq7xib2jhrpk6kkit9qd616cbixmc8160m2xz8eg002jxyvjpm2ko4f50bbxmpjkl5xslydrah72hszr80rvx12jz7g38shg91bik8abwx5se4nrxm9xzbbwyc2aeyrbhm41l8h4ik7fsutylj0biizvdb3r',
                retries: 4555373778,
                size: 1237502143,
                timesFailed: 4565502313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'sxpu82c80yx7d6rlr1cs3fa3m7ygtyf8ppbf0vmibxsep5ib6z',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'ofnznvf9cz3wdiv4lzq5',
                scenario: 'xbu2a4yokcawhqlfe58o80fevocr98z76oby980z7uj604bphdp4hyie8h8o',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:20:04',
                executionMonitoringStartAt: '2020-07-26 21:46:49',
                executionMonitoringEndAt: '2020-07-27 10:25:59',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'veuekxhyv5rozavmy1dztlawgesqk55u4wad4ihnh10kzwp03qpsktmlxfvy7pbmr7mqpq3jd9ugppm7h1a93eh8qikt9s2weg53ddc8xcntdolxk46vwpg0qr7avk0vwhg6wkt8kljvbei83ttz1vrwt816hmt7',
                flowComponent: 'arpmxlupykmb42y4q803wxvl0wkn9d5wh50f1f07uawbz694sa6c28sjewon950gdou63nlnv15i9z51f5hqlmyth74yvzb4s8jbmqu2mhqnhvj4bqeln7agoptcf5m75rvy8etss7808nxtcmzmzx1vs1dreasv1',
                flowInterfaceName: 'mr459ta25mn2pgd28whlzuqytpz2cfmatwvmlaqm4eima06sdswvbnaav3mfi428di5puqj572fqaxneorgp5w0sav23lnbvocevxjphkreuz3pdg0scbrocpdph2v64ziv0thsy97a8tmt4mmaqafqvw1hzh7nn',
                flowInterfaceNamespace: '164xzv46mdfq1nur1nkmqjb2gnfn8gpe4djs21ej790lhvarth93dcbnm8jjk7emhrzajbfnzllwrz6d3kgtdnjgwqmnqpawbss53r1kolrwysb7d0tn1y55c31mhp8v15otlkph7yt1d96bkd047wkvwqebuo1p',
                status: 'WAITING',
                detail: 'Est voluptatem quis. Ut ipsa et et nihil. Ut dicta quis quibusdam molestias ipsum veniam voluptas. Qui odit quis facere repudiandae in.',
                example: 'jgbfsgpp2b5wiry7v80jur7dpic5utrac69cdzy8e9zofpybbo3ty0lwhs2bg6cd4zs8at4lo8jo0at3urlpqjsgfj4fyv3rz6w2zwvg2226ova6w979tajnicnvbtlsezu334vroiy58iu2ddjgqji3qs5s99aj',
                startTimeAt: '2020-07-27 04:35:20',
                direction: 'INBOUND',
                errorCategory: 'oc9ltsk0dj3en13s3gntk9qjg9pg5eoqzhem8f8zwiyq3b4t3ykqj1mc3j9ztzip78l6nfz4yb0bm20ef4qji8k9vpjkowf0zimhf1xdf98c5jrdo1czbtreq6i7lukxyvnm97yglnrzctp1qm0bvli1yjgvcqkf',
                errorCode: '0s66m7ch9jhixknqu04z',
                errorLabel: 777684,
                node: 2766255365,
                protocol: 'fj3nas6uhnsom0o1cwqh',
                qualityOfService: 'a3y221jqymti83wx0vy7',
                receiverParty: '9s053z01phd0tsa9ajzokjidzhu849ij8j26abpzfmh7as4q1pfcf3olxdy6jnugzir0fo5beobm25ah09mipizzc0nduyvo5w6u5m97l2jc2mnfu7fv5tb2dc1xag8pioe4sdgadyn098a7rsi53qsbhalow203',
                receiverComponent: '1p54si729lohksh8zk16v98dtrk8jg57t88br09ow0lk4bcy7o9dkp2kq5k4kbgo4mflv34ltuoevblidu53t18iohtp55z0ngnk95hs9ipf39m8ifswapwmt7gj5p0ezsg4c3gfggdty740ujh78lqair8fx2l9',
                receiverInterface: 'kzj4kc3qr37y9mixjy30yio930ra9rau0jutsyloqnw9l5t6v27e6rjrwynzvsap9ek6am5sthjyxumg2h898wn8yg6qeq4aeczrs7qyxsibp4teaifttw9hrv0e0x5om6r2o7vi54x5jbp10q46dags00s9sino',
                receiverInterfaceNamespace: '3xsmvxwel3pyakdt0vngaj6dnorezkrvm5xuy2vr80ail0wsebmn2hy44q7uw4aumzabb2xrrozvklgvt8fedghkuhulmezilb44mloo92rgrnre10ej3ey1qvdk32z404lmexrt7xal0x7cowfitmisgn0egwpy',
                retries: 6644824015,
                size: 9139768853,
                timesFailed: 9216601507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'd48lqp1fxm84xgay2znci2xe59b0rh4pplorchoqn5g5b3cdj1',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '7na3ykqwy2xtd2j34qdz',
                scenario: 'z2dyyh13092nnfk44d4olguruf8kwzwopk597nxxf84gfbibff2gli4iv2vk',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:24:20',
                executionMonitoringStartAt: '2020-07-27 03:10:20',
                executionMonitoringEndAt: '2020-07-26 21:07:47',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '9oneb9vwcho4tgps8vr00bh8igxcnp5cwt7ilnryoozx6pomf4u2fvtnq9pxodgcl7n0jhtr2whe40l8z5hoh8nzxt1nxnxoayn46uizqu2w0dtzf380g98bqiyt1dyn479ti6e1ptrj5f6lu3bup4d6kvv0y9ey',
                flowComponent: 'erk1zhdw6bo0lz659qfcktij07warmx57hfeya0uy8pjx71m7j28i3hmqrzqq1up2yk9tz34044th1xf24bswbxjd5z0dl9rwf3ppw5u9qkn03nzwlpts3tw7dax2w9284vtd3lr6renijizthz8yfal21tbrx7f',
                flowInterfaceName: 'msgzd3xojvxhtcc6mkirhnxeq0huq6fck716borz9z8bpa9bjqtq31sgjbnagz5ayozvk7i1fd1ski7dqwtyp8pwkbtxmxski727uc071owxmn6121szoo6bhtqexfmp2ey1c3nawpjy6vzd5dxiedytkeak0c5iu',
                flowInterfaceNamespace: 'ii2228o0ws7oeaeubiez5jxxo0bbex47eat5cbt8wsta3bb5z6tnfa88fyxghlvme58ois526ek66y0vs6yjehnqtj9ca3bfd6ulzlo6c5rq1yw6awz1qpz27kxix0zu2sof1m4pl0pgzwitw2u7rpr7eu8pxfva',
                status: 'CANCELLED',
                detail: 'Nemo assumenda consequuntur nisi enim. Aspernatur blanditiis asperiores possimus. Sapiente quasi assumenda modi cupiditate nemo adipisci a dolor laudantium.',
                example: 's58x54dwuuxaa575xw5h5nf8ar21y9vu8rzxq6rph49i6xhwzxbqpf1ho23phu1sj7v21pqm5kw4yudq6nr76d10pgh274j0e7pt7h9boqtm5bl6nym05ahh39bfkym5cv48sq2fvyunc5204mgdr2x6qhzqvgd4',
                startTimeAt: '2020-07-27 13:02:50',
                direction: 'INBOUND',
                errorCategory: 'g32c0hhjmq8lf93ihuzeidudxfawmwdsi5vbga1vibo44vjfpmiyg6lzx5vq02qf5kjvt907z53ppf4ns1j10idk5lfgvatw2euhoengd5uy9sd5ky4d2mixnhcqemqemcam6pk5i1w3jothjkgr50y0ljtwioqe',
                errorCode: 'pqqhelx46l56yll66gw0',
                errorLabel: 769859,
                node: 9714440084,
                protocol: '9m4i69x33i4ntpmlmut9',
                qualityOfService: 'xj9a44pa26o07k3te57j',
                receiverParty: 'zc2pe0nmxatpy9b20v3ye2hlkvhwg75vz40rfok33v1mykrrgbcqurtpdtzaxqpadci3biadzp9c1x4a51j7plloq4hxjhj9oxkh7rzcchk7f5og636rhowuyppnhtdsehl834enkp7mrk22cihvo85g7rxgduxb',
                receiverComponent: 'dsbl34kdhltww7u7mrwqx4xlafhc3hiisk04nw0d6w4ni068579gpklc3pl9rjh1r91v140esxbyeks9e1xthh6ko01m77vuh8udygf6jp9u40gk21s0e9qogkzypk4zoku6rgvasiwrvw5ycr8r4fp0p6u6vs6b',
                receiverInterface: 'jf28tuhkavivr7c2o9y053jwndgoci9fuahay46by9hpb720cnlgxswz1v26gorefstdbg2ne1qel2ffefnxp8je4nsvq1z0d1ye3j8wzhw4afw6svmo24h9lbtt6pub6xnkhcx9zbfp0vhjj0zbuv4n5il90t1e',
                receiverInterfaceNamespace: '8qet3epz81sn5bgka5b6yl661s3f3gvwq3nz54p8gft42p67d5gfxso66f3oco6axj3my00lkq3qjjreq3typ0af5qntlol7vsrnv8wa8xa1sxn2i5ork6cy2ymn37rqueykoocys1nlres670w7hipw0q6mdfn2',
                retries: 3824725614,
                size: 9386694976,
                timesFailed: 3884618082,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '24tvtddnz76i0dm10f0p3dzrnemyyg5z8axy9qlem4hhokboz9',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'd9yx7zemi6z05hr2f8yv',
                scenario: 'mqle8g8h54u3ob4p8v1tq93g8c122afic7g8f2h2kptkhrsrr5buc9rv6qy8',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:39:16',
                executionMonitoringStartAt: '2020-07-26 20:07:13',
                executionMonitoringEndAt: '2020-07-27 01:58:10',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'r9kyjnn4oa3wt7h1wlg2uyuf2ftdwrsjs7mckj23g90pjd915mfteuk0pmyugigwl3bv95a7jg7mqh995hz0vfk46mmd9lwsh4qhal17k20yc5dc8cslz8uhiiu5mw3s58s2kfrrtixc7j16vysq866jqkfgdl2m',
                flowComponent: 'wwghy2br5vgftzi8o3k58r3g54p1ykd95bmqvbb6znpomq4liii65a6ml505grelfhs7dhc0acwie3bdr9mbwmnyy47lrq3l5zvp37cbmfc0n4ol2scil14suu6owxsk90dqkub8cbxv5c74hsimrp41s7zqtmou',
                flowInterfaceName: 'kp1cia6khdjhandb4tyd4hmbd80jtg78v5kjdj0ik3ougyfnnbg1re8ucrtjl4i05vzus2yut36m0oyreg2ehh838q9mzzzwi3zs3wfmzwm9z8trftim85jq9ukjuakfmjiyarjv1sz4gvyaoawny5esa2hv19v3',
                flowInterfaceNamespace: 'u0k7yj3iv463331xz3fexfagtnjilw79uaiwa4kh3317ktp3yx90mb8g0qxl6ckn6ei37bhf4sfzhnsuncu0xhxaecfjp124wl2sp5qeek7e65yo0ji6eq2t08f35oqyvwbibupgpouueikzwhaoh891e1v386etw',
                status: 'TO_BE_DELIVERED',
                detail: 'Aut possimus corporis suscipit vel excepturi ut sit modi quisquam. Dolore cupiditate cum dolores nobis architecto accusamus eveniet maxime. Sequi dolorum a est quaerat quis quidem. Illo voluptatum voluptatem quam quas. Odio tempore culpa in et id. Quod rerum deleniti error.',
                example: 'rp40172yg1k9mdbp5fhd1x71hhepygh3ebig5v2yivdm16j8ythvhwo2zk3rjg5hj80f8s2jq3pg1rgekipz4ndpgte2nnag1qc8cwicx5ouwitehh9dsa0yat7kb460cbf3w0sncu6ewq2b2qa87bg1euhsvljz',
                startTimeAt: '2020-07-26 20:12:34',
                direction: 'INBOUND',
                errorCategory: 'oia7x7dd4ptp3yyxdvvas0aw7u5ydzxj1l6rfkp7gicoahx327v345kuadq3z4tcbx6hr9c73s1te0ywil2q9sh8rvfk5fu2pi0yw4t0f11eoftj9depykmi19z3tdk1m4g1dp0o9oppgo82afrpbykxbqp31jiz',
                errorCode: 'mwgjs0anw32ka6yiaovz',
                errorLabel: 929679,
                node: 6950499210,
                protocol: '1t8az2bdnh5z2uxxm3s9',
                qualityOfService: '416xcl8l3foqqt5dk5nu',
                receiverParty: 'k88qgtjr9spjgnhf6rdyq893ayvda7b1z6f67mrsjgmty5eya6c6x6nmpl58bpugr55njq22pobiucve622bd6jsyq0i3ebj5gp09fwmbj0t1b1iw2439xz57bpsu3k3wpfv4rs4kba887i72rn7hip2g8i5osgk',
                receiverComponent: 'z0ae5ve2ncghwn1tqyzmu2s82n0081qlkjlbhuoutxq0jrsq054gwvcocvsqkc9zh6v5vgjfao7zszcb0649rw509ce56axxkhsagmmbe29zjtggtr8kpjtzkl491k1xhw94j9opri3k2ca93kin2h938u90wahw',
                receiverInterface: '9b5bxbc1bs90kvb7r7oxqimqsa81hkywht40kk3h543fzsggznvkzxoiyrhvfjukv19vt0vkxuji6hk0lhho1762kc8hy1din7ikas3v33mpcq8vgy3hb7virct7mo73ngwv1qbmnlh9km1hbhz9rz5lsnut67aq',
                receiverInterfaceNamespace: '34xr75twgja1hyedo1xe48zm8qky3f6dlwb8okllv9sbv99iar6xp6etg0w3fj053hrx9vlk4vtovdb95g7w7s6ddczpzaee30n88y0l0be8bys5hdokmou09bsnqkvhzpmccq7efbpi4pabao1do6f03ahrr2oa',
                retries: 5556916220,
                size: 2101557725,
                timesFailed: 3700016544,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'o4r8u8eslugqrw86t6mqvrwr0k9reyewm542nw8quuuwo5ni4c',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'vplwpeja0ta80zblc98r',
                scenario: '4ldslw3i53g2box69tqw4m5ovxr1zptjb8vpttyo3wtlh27hle7ptmzgr3c3',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:06:45',
                executionMonitoringStartAt: '2020-07-27 14:34:05',
                executionMonitoringEndAt: '2020-07-26 21:37:23',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '8ru1c57lzbgrzwjpl4pxk3ju9nv5ng9dtan5soh8l3catqbk4lvmc0gbc3livtsk04rin2vkrxk1i4l63ctnuzxhkfv6x3lsqac73lxhygnseywp5bkpy1tlus64g62wltu61797kwm54u0j2d7c1flsknsegsv8',
                flowComponent: 'xpsa9gbhkc78dr22bdy01xsnx19h88zj2mcl691l7kh51r3pgffxf2z9gmmq7t24amyhmq2m5wb5grs7s765oxuv6pzrxusxu7v726ziuvfkikz45xrvu8vel1mzp90i7ujps2xxxo84vsb16ur0wjigrexggn7p',
                flowInterfaceName: 'c7is9n13x5pcn9xi3pm7hfuyt4pq44jvamggvezau78rb6jbo2tadod548inrrq4169uyphemnz8qlb4gz4ooxa78ioov5c7rrd3t6ek6mvwi70v3z7dztqzie8guapxk1yqttw0sn9d72uu99mndogjz5h4okxv',
                flowInterfaceNamespace: 'hbftdj0i6313sfo9sv78li4kmm4ciy6ap6p5paw8307knkalvne28kifqw3mfwonmirbba87vdey1f8kwa0bfzmnai7whqkrtzdt35o5mnh881nre92ht0840m4cbn3qzotx908ag6j25fc4gmcw3k3mhkxrmcwy',
                status: 'ERROR',
                detail: 'Ut debitis nihil. Blanditiis perspiciatis unde amet asperiores eligendi et qui non. Et commodi iure quod suscipit dignissimos. Mollitia totam ipsa. Consequatur eligendi cupiditate voluptatem architecto sit dolorem error ducimus eos.',
                example: 'irygpl95am7qevzdndfg7lk43edr7zhb1rhxgh2zvv4nn0fpdnmt0iazi28vf6qumdeerorfutfk4pfu9al4l40lvc53j09pve3uxllb1h7w8vyv4ypslp5pjn9eoyq3y9ok7s5tan41tozn3jz7b30wbw15ir6sv',
                startTimeAt: '2020-07-26 23:53:39',
                direction: 'INBOUND',
                errorCategory: 'qfi2jflymr7ljy9tl74z8r0tk7qqt2d2ccuy8x43tzzpvr0g4q4tsnk39p3i4ldh7pfxb1sonimrwzzkllr8tu5t2u1difc7im8mewmk010zuhy2wgycrbvzfrqhlcx8t2qxsw9glu47u2hnyhxwdivg9axb0ycr',
                errorCode: 'myxmtvhiqy5xyzrb8iv9',
                errorLabel: 207675,
                node: 4875449719,
                protocol: 'j01on72eps05n91k5dm4',
                qualityOfService: 'j2ey1rg9mgdytef8ib0q',
                receiverParty: '587kx1za9u6rdwvfyg5uvx7zkftc382ydy3ap15nbknmqebdusxxbuue2ewrxiu0wxuh39cxep9oqwocumw2m10ofqlaxvwctp9ajj2clumnw837vqx3yjs9u0zo1qzqxn56xntedu42rfv4nsskrxziicvw4145',
                receiverComponent: 'fgzc6lscrfnqqipxysplg9nnjyuvc4bziue918ooxn26rt18frbs3tybas3g73weym42iih2158fas8ythh64x92msccwk3gns6gt55vwds2rzwmvpdt33uwgzmtojigbcyto36dp409ad4u4hjt2f2w2lmkss0q',
                receiverInterface: 'vtknbtlfzgj0imyrad115gjs7okm97btwdte47flho0lr45doi95tly6fpj4y2fwv3yrwczt9qfemos4vjgv4elpfawubmerjroewd51ccn1d7ndc0sf0w9q0c2471rs9xy7bro92sno3gj1as2fv52c5fop5moa',
                receiverInterfaceNamespace: '6x0s1nkrlfg8e1saxb2unznwg1olffzxgxm6ovdrxiwtxjnu5cnpxyud08aovh9xierncj8p3h1knmvi2zd2uy3otvz89aa8orhmclo4n368mnn7g71a7v0qoyd87j2bjhud77eqgnjp16cogr7t9l6zukq87ij5',
                retries: 5854811168,
                size: 1884756671,
                timesFailed: 4046679132,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'co5w9oxym07nyu5mxifxsjfjouk77xtfkriqr6cpyq0n9ltq8p',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'a650kjyki0udp8b3ny1u',
                scenario: 'z9nl6gnqw4fvrpmxpaoj3ea98bnqve1qu5ao3795dn51eecd8ucxfbjirp77',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:15:51',
                executionMonitoringStartAt: '2020-07-27 08:19:57',
                executionMonitoringEndAt: '2020-07-27 02:22:00',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'rgebp0iwwkzqh0ft0dr7pen4ehcvydudvgt24khbcl4wwdnysttl6jgqoc70qzgfisdi760d4rvojrfidgnvl18yz11qrhsugue5wes2ckqqf9boirn0i2e9qb8doq9e9op9dhov3svwgj7fsnrmfnu3t1t9onr9',
                flowComponent: 'wd34xx06obmlvrh345d5ojtswg0vewu1owzwa0c4909nb0ssjqjq4ilxq4gn46ok8vz2q1qqcrc0s599poywd5nx6v41b58w6dzabsa3vkd2or6ns7tlp409st2j411sz5i90t2cwd70riq9s9fopp2lk94rvqfb',
                flowInterfaceName: 'iv8fdia2vnilg1asfpg60uf3mkvqai1nmsq4vniggvqpfcdluvef74xj5znh98x1v0upsmagwty1azzv4lzs15u5zt8ba07n9lw4sejz46tqf5ilobx9wxc77mvq164z3ursatlfi86p1mqmwkdso0i77942fxsg',
                flowInterfaceNamespace: 'p0bqoydhak42zszgbqdzvgcyuvtea43g075es5idig41x95dw4tu7uc66basdjosl1jug1jj6hf6v1ucw3nwbjjz6pz5kte91k7xj0iuge54dw6xgx94ypx5hmfba1bg1oy65697co0kvntjwod1ootl1ip74hfk',
                status: 'SUCCESS',
                detail: 'Dicta dolores vero et modi. Voluptatibus quia enim nihil nisi labore pariatur velit. Temporibus velit similique quia accusantium molestiae. Enim ut eius est velit omnis ad ut suscipit eius.',
                example: '0mpv5jlchbrs0ryqegardxucrqaz6jjmz2w82koxlbgeg7qfbn50snvumukw9hc5mp3vgq5l8ycsgjmnx5hwp9mixmzr2iwriu2s1boqlb4os2ux1r4i5flmn88l4c8j61zxg7z54mv27m93y6t1t0cy5zk6egzw',
                startTimeAt: '2020-07-27 02:32:57',
                direction: 'INBOUND',
                errorCategory: 'uknyznv76ktu0nsj7yyo1caoix2p04op7q185b3mutyo7t4gq6oambp5i12rxlldkvceczbhe40xj0bjpsk7u3tk2uvuypun3t19gatoakemyai2dd6eqngxfqcdu304skw06w5nt2e1rkofdo1byq1tl20zbgox7',
                errorCode: 'v7pgiy5id5i22axkdf10',
                errorLabel: 204815,
                node: 7549533468,
                protocol: '1orn3qr97v7t7iuymwmj',
                qualityOfService: 'px0xx62rd5zki15ayrlm',
                receiverParty: 'mjc161xxc5l00dl11qkptiq6rxs54ts1dklnnnhtzyas6fnos0n0jvoawspjhw56uikqfiitmuqc0510y1u3ec9yx3hnhjvglfpgur44h92f3yzr7vhocgw0astg2iw5bfp6ridy8i8qodvctccrcy20jnwj1jia',
                receiverComponent: 'cc3cy0ajq1hpihkpxe5vtnm69gm1tf50qsapzovafgmnhgt1gr1vhm76eag7uaftlplelwyl8wc6sltrdtnbqccs6rzdnhnd7sa7di8ryionhs6cpb0abk6bbk60zharj9gvif7kkp1lznlmpyng8qqw789qrz09',
                receiverInterface: 'w6pq8oec639b2fe6lrcrwkyi26rnwm6kxnuwn0zq7mli90sw2509tyydltww3x1ggmj6aeicbs25tdwglq8kr7p305xpthajqv7vjo33y4e4t6yqxr4wsofae3gnd0wcgk4h8ltw3ykcvsstc0i4qelfajhc84mh',
                receiverInterfaceNamespace: 'ooz9e4i2gnh9spfaq9ekaw1ajqd0bi6vqbpxyttjaw7y91i2fbz3ll16xajhuvq456954zqo5h6r719s24i8d9p0krpgmpow9vtjelekpoc1et5d2setbt41g1q5wcmb14hcvgamqgpjr6oym48nqf9a3oma0b88',
                retries: 4197120178,
                size: 5460334011,
                timesFailed: 2065946585,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'fiwzr8zmx5dbeabv0i95gt22mlubgvrrjf1oiz1c011paelziw',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '9zhcuwznz3bbuhi70dkv',
                scenario: 'mt79q0f9fjralqwhphhj58s1nkaae31soor30q1q57qjcxjjupt2egnw47x5',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:47:48',
                executionMonitoringStartAt: '2020-07-27 18:31:51',
                executionMonitoringEndAt: '2020-07-27 15:30:41',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'csty0rkkn115qhjsk7pieeu815e9r7n4d0zp5npt8gccpa9q2k8zsds21ja26kvvj24oo6dz1pjmp1a2ihgpd44o6ut1dudpt31wrmtukgpqjidod6fzwsx7dnxr5esg3zefp27zd25dbfg1sg0amf9kkz4zkanp',
                flowComponent: 't0g7wnwri526jlfbav1dubx8mjb2lgw813g1asw2o1l59741uagtn4bxbwu8o2qeudzzihtzdw9z8jdhbwnl19j8bw3w97xnggaoqafl3m42d14nlw4f9y7udi8ulgi93af47o3zev3y94ziwznoq6a1gl976aiy',
                flowInterfaceName: 'v7idboao9k2aiutht5ocgm8oiq3126n650hdlfxuayurae6e0ucgm0xss2mzdat76bp8htxnr29274nfwru02v462e4ykxj579500it50pujm78y0utf1714vvcdtz0jir10c42kryvoueyaxio7zv3affmrkw8d',
                flowInterfaceNamespace: 'f14kslk6j2rjueguwsef1alzj1b53r0870s9ne12sh9zye0sreigbedbqwri5wt2xfuyb43vvymqh9d6wyoevnefi213yjcayauvhu18idcbegpktsau5m7nlvjysii3wlp5fh87opwiqt6jo7ii2259tf2z1uzi',
                status: 'TO_BE_DELIVERED',
                detail: 'Doloribus provident fuga deserunt architecto a natus. Fuga assumenda consequuntur autem impedit at perferendis aut fuga. Nobis ex voluptas veniam. Aut qui iure.',
                example: 'c2t7zzzvj7cup5t1ndn7fhzimt3yfw7t06ye65k0dvqfi4rmoydgq3q7i2266imbuvxak6qsz4eynxf1qmsrlxw1n8g2o6wk7eje7uk6pvz9zgfasl1mo757k1w41ivwlq0n3rs2gqi16vnamy7cttc2juzyq4dk',
                startTimeAt: '2020-07-27 04:10:55',
                direction: 'OUTBOUND',
                errorCategory: 'uq0k3ynnt93ci3mdhcm9gjtkb0vvy1wdymaah2q5q0g76wqtgr6ofrbvrofqonjrywzcog4u54kr7xef3fc5rytlmn4aavnhjg4l9g7rax7syxx1dctcsmrmnadcew4k1f9l1hotj9q1hgi3hrp1w0fmplb9bsvv',
                errorCode: 'mr6qkerubkl0dwnyob9lr',
                errorLabel: 136412,
                node: 5793730057,
                protocol: '05xde51j1g5umfs8zo82',
                qualityOfService: '1bm2p7sgtcujtkff1kf1',
                receiverParty: '0f676bbi6n1tnwmj0yq3ros7b7f0djo0blr7a1ihgj5jug6149xtos43lsq5amyjmsesu4jck4ptm5lcwwr0v0n7d21712sjmiqjljmi1bml9uhsl22kadmtgqx4s52i4b39zhcqd4w4drelmfrcpg5uzniakzyx',
                receiverComponent: 'rlgazywivs31nxvh8hotmbn6vrnyd4e64zy7uzy4d6547cye3rhh7aeprnufy9glaclxo1wvmeawoybroe81ikt97j9ktuqcop5hpv75agyv3tyoqihb8vcbigqbhi0bcb9vz5nlsuxmgpipehh3hdf1oykjgtfv',
                receiverInterface: '9p2876boh8guxqo9t3ivbm7aphsxg4fdxqelyn1tmq6diokvel4kotg5tihnqhcwjh5jqtpbthjplk8rxgjid52oppjfextql7t6hmuoavta8z452uunggt0qwe6zoyzqii67mn1e4idy7wh534m3t15mhmuj8em',
                receiverInterfaceNamespace: 'aa4k7p5kfugn7jy2pozglqz5jpsprc6wpnu2tqql6ftj5jwlroky6vnd2jphvbug84pcnmwo227bwrms4ylpi17ivjynalxm7igealyt4vp8e38dngbd4qrb8n2tu40faieo126jl9rdt6dbwuw276hi4ohswjf0',
                retries: 1932490988,
                size: 5767973154,
                timesFailed: 8275595301,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '0eztbi7a7a96l3p97ulqmd06fwat9gzn46nnolu5vzimx9hkkj',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'o5k4d9y642144xkw3wzd',
                scenario: 'sj8tbndjzou4a9bis2u1q65awesl63ekj63kegrwr49awro511ohtb21g6s6',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:00:33',
                executionMonitoringStartAt: '2020-07-27 04:00:01',
                executionMonitoringEndAt: '2020-07-27 06:44:13',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'h25zf0cm8wvvsbliqqygn4khsshzalm61huk1shjeo6a7w49ql95ei1dsy7gqoy7iddyle4g9nekzsqp2rxp12kutsmvuf4c4si2e4jf5oi2q0bxc5s8rwvxq72h68d0gqvvx3vyql3ps5et38b6bid7qc5w8gsk',
                flowComponent: 'vnbg69ugvoday5a9jasfp7atpt7sbsg6xo2dnk2oo00ec5otleik6ig3gfo8jdircgwgr3fiqbnjnap5gif3deb8furjhxgwvbcftu4qy88r39bp7k82uf29w1jdh0ccxnljfdvsz49zn02ov3fdpn9yx9xsahio',
                flowInterfaceName: '24mslgkwxvfkllhe657tikmdtlxvsbz5dnzqpu98h9dx00y9vebt9k8d3vsff83q6zahdslvb0g989u0s1rz92oavf6gcbxv6dmnw4wnx2nt3d2q6s793kyjliw816ky4hxnyydsqbzsn56ftnn10t9aawllxjay',
                flowInterfaceNamespace: 'evrl957aujop9utzq4fdgdvoj1cjaxb12ptl2lrn954r8pvdouxqeyo7lof166lriw55hj5e9vd4yw9irt6425hjcxx3eign0rb5kfnz41mkyjql1q4lx99ojn96wb90rxh8e06e90hludx09ramlyttfi8t59ke',
                status: 'TO_BE_DELIVERED',
                detail: 'Deleniti sequi quia sint cumque officia explicabo soluta non. Eaque et eius sequi quo. Aut aut eius.',
                example: '1yqrue7bb7i0gkt1hywmbeekmpjfqybg5hqdk5oxi463i6cgf089tajwd0v1ktdo3o2n0vl7xft9zewye47tz9fb43d5iefgmjnljmeplrjrnvx0fswu3cqns8p5kye2x95qo6pgi2m6na0n5av4zdgb6kxybgw5',
                startTimeAt: '2020-07-27 02:13:24',
                direction: 'OUTBOUND',
                errorCategory: 'kfjbd5o680cy1x237y8t6aa1ti3fsua8x91nwcpj66n0czbzavuqb0rx8aejz22qj8o1sbucpxa4f13vo8laelighf168ng74nvd7o63bjrua2xerhbmgcqa1x49mkfydlfg4o02zef5o5j5xv3dnh5p8vylw3wd',
                errorCode: 'azq1h7863jdniw0jc3ra',
                errorLabel: 3024914,
                node: 9836113566,
                protocol: 'j3n03rk7nbk2i0e08vqi',
                qualityOfService: 'ns8892u5ew13y6t70kh8',
                receiverParty: '79jym9dwuttwridd323604wb9xmsszdnew4r848ebais6cvazlrl7hdqrvekvqtyt7e4ht5tf1d7cbqevv1v5uclj50nv8xn5a3up7g64mw8cnlukse79v0t1sw91tc5oxvsn91bx3sbtypelnelmu2f3gmjebta',
                receiverComponent: '4l01gu1g33qkci0m70eshfmu4vk83e7wd5mo9jm186xaqr7xis1ejft6irxsny7i1v7tr3bp8qr1fur0vwjpg0z9hov7b7r6z590qnlphxf73tp0gayla50jfcgoru5yjlmkv5e7quty01p67bsdkxxm2x825ll7',
                receiverInterface: 's2v8mc3v0gblyh86knuxecyje1e4j4qocmc0lmnw2cogmk4q0un30q5pgh8ar2bae7nwvmsif29u9extecah1j4o35m4v7pe37ic2cxqha1bmzsu8xcwh0dj6n8f871bis7uhmt8i5ujw8hq98sij00jc8en8in9',
                receiverInterfaceNamespace: 'o5muxonj06yru4ehgc1t2p0igazhf3tmtpad3b36db1n9w2hdiei4h1ub6lf9arfu0mwfyqcnueecojpnv2rvua1iinpjawrsyzdf5st8sn1iuwwvvkxncnadmiccefobzcwvl409jw6oa2zh7mbcahge6j7t8mo',
                retries: 6465594548,
                size: 8892306150,
                timesFailed: 4160582211,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'd0v9vubss6l4avbxynbaz64hujesy2u0740gmky6t24ilgii18',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'xto2d0mwls1zzqk37f8c',
                scenario: 'evec1d12k0k9vi6a8051fz2xc5ulg4r3c34pmor0gzyrz873yo7b6933kuws',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:26:39',
                executionMonitoringStartAt: '2020-07-27 17:28:22',
                executionMonitoringEndAt: '2020-07-27 00:03:24',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '8wg59bzxwfj8wcgpyrlsqww7hg5hxirc6bw1llfi2reyan8n3mfhylz6qxxdoqlxnqfejdsdo2t0gtkvt2x6edtf80f1hn2mf4pmr9mwmvna326gd4xhfanv3z5tia4kx39eui9wo3n6tiz8tykcwne8uy733mky',
                flowComponent: 'jyypbhad26uw8svh2ua9rbdl3h4hn45hu1rwpnfwmuq1f3z62a9bg82azo9m6caki5rd8k5ep1o2vndveii9aw05nbm5b7cx37t8jwhv0awcgweiwvkl4q36xdt1ztr64p9xthivxfrcaz1m3j98h32gt36c3cib',
                flowInterfaceName: '48hcnh9id3lbohpov3rpi3cuvo8d2dxjjc8jv4mkqg2n1p9019gh0repmwrcaqm9yp3gj7jvlfds3aj4fogoatm56vb01a5nhaxc91xor0jairp7twf5uy5xl6j9aoja4lc77ll5rmv1djszzspzh1avdde2wzpq',
                flowInterfaceNamespace: 'm977k3lh6514aljkt7l7f95yfdhzhtpuqik4axngxh1a3tkwzy3pu55wwmyno543zzunftljwudo2ccgzvnas3pz8nk3lq4k8923sbmzjti2yuetgvxnw0mp7yhak8abrgp83oezjw88tavw0n6e7p64hsjaejff',
                status: 'SUCCESS',
                detail: 'Modi magni saepe eum autem dicta fuga itaque aliquam. Sit temporibus molestiae omnis fugit omnis veritatis deleniti quaerat sint. Ratione voluptates consequatur ut velit.',
                example: '92rp0xyxcpj58ldvkq2j1ci3b3fzy81tkboq67959vdwajpyq86mu6z0zmiwljlvmbbqxl1tqz06rg2uxpm75y386bv6n3czhhplgp8tjyk8gu6moiq9bosrhbb1azknqfb85w6iwth766hwy9dpwn0105d4uvfo',
                startTimeAt: '2020-07-26 23:30:00',
                direction: 'INBOUND',
                errorCategory: 'sq2nlpzqbe8l3exfvm6wnij9e3lelkrv2r6a38dk8lqcct73rnmt8lc2skpod0ty8cv6oc4rlcjewnk6zz6nlgve9vapxnog8hqrx8jd5z0p1wp8xglepspivxg5zelgcuj9kuw50d8cgx7u7a1ls8zaa5gu0san',
                errorCode: 'hht0uow288g0t2e8cmzz',
                errorLabel: 196545,
                node: 86998131333,
                protocol: 'b0mnwle5ne1efqbpwdyd',
                qualityOfService: 'ed6fzfvu7l5o1lirbz6h',
                receiverParty: 'izf4y4xbyp75na2pmd9jrblr5wjziw0dkjl718a93sb2nci0mxdx2x721981fk12nt187bkr6cfj3razmtcd5l1hg2e7m1rk8stni94i3s9cwzyfioynnv9rgkm1v7t127nvufqj5hzoq1wwsubeb7envxx081qt',
                receiverComponent: '3zfhloss491w60zzbmcijxer4nqr5jww6zagtf8enrh1kbb7svcmkvnjycqmx98i7sawgkqjm1wr2zp4am2owwzkdi254eb5faqdi7pnxnf5z0cu4n0sabze443mtee5g6r5p2qli021ilqubkxe4pt4n1qgt3pu',
                receiverInterface: 'oq2cdkkm6dqb1k9bsug7fk23jzscclf1akjaaave0ynr4twfhygdivxkohfacesd2icj2lvz1nf6s5b6guwixmfqymfzj4j4i5t9qp53b6lghjam9z1esca51sang40t2n1f45s53ppnzlwla4s6wvqh5eeqptml',
                receiverInterfaceNamespace: 'r1mrnq4m6uaacomaufgivhafhovkzjgceujzqeofvp1j27wl7fnqeyednjh1njh7nb0xmwbasnk49tj8y0348iiqt4tmmppgigdz3hmvpuxt042cg4f7zicwmfced6qwoic5iph4tur0mzpbxh6vecgm6ixaew2h',
                retries: 3016004056,
                size: 5866734583,
                timesFailed: 1737224090,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '4ylrcrphgul9vtnd7uenyl60tw3tvfeuawktxun6518hakqamp',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'nzceugpxphvwcb2povec',
                scenario: 'e6d2ffssntheveorm0s66icm7ls2nz3sgsoqu7x7u2kfg0hbpq56t2bvav0t',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:00:02',
                executionMonitoringStartAt: '2020-07-26 23:20:22',
                executionMonitoringEndAt: '2020-07-27 05:11:18',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'qclz6lrb38zz8wzpgdq3p91r6v2d2eu9gslzt88y9tl9gnz5fgbglyiihnc7227pbg6nlzcbdxb0aw2sljpvmru6g7c3gdzl2lem5x7catsqh5b26dr4g1af1oh8s0q2a0qexrrd90l1p510f4yz4470bhno0jtx',
                flowComponent: 'f2sze0anvcymlkju70h2sxqd6uaktnz1hly4rf0a1gjwlhczh7u2cz7e2nkm35hb00tmph26a12g81ssf2wsz6d2ryig76adzwbgdb4rt7coqwp2yj74lb9rfa2vur5ap5p9zlkb0ucdk0wplsxl97hxbe3ee0gv',
                flowInterfaceName: '1ln61kzxkaey5zy1bttyrkp5hn8b06x4bxqan0z20you3caamb0bq33d528ynwfbg9leqjziyzv5inb022z8eoqckkrrrefe7jec3rig43yel0fl1irbyalrancunquguv19mzfqn3wja6pu4xbstlwbrme3yau1',
                flowInterfaceNamespace: '6lpotlonfnhgvoxpvzfsrwn8lxgxf8phmipw0u7tbugtau49eoi26npjiz28yfpil6czhq9m9rupf5e1mnr9i2r1s12qu62006vm2xzrebp3e1wu0xns5iydjqhmzl9udf1nq957vsp27v16wwpl3xfc9p7rowti',
                status: 'ERROR',
                detail: 'Similique voluptas optio iusto numquam illum. Aut a enim. Quia neque vel adipisci id sed libero iste quaerat. Qui quae ad voluptatem aut error illum optio facilis. Perspiciatis voluptatibus vel iusto sapiente ad velit in aut. Aut voluptatibus nemo voluptas rerum porro minima voluptates.',
                example: 'klorqoo2ju4os4quphvewau9nfoshjzg57mv581t0blf91l1qtindlbdrnvyfi6k9iq2pnqljnc8ut6s8bm89ytwdl24upy8kr1fqyao0lshv30we520jp6kseiwj857ij3pw9hnl8x0wfthyjwr7m0p1d3jyd96',
                startTimeAt: '2020-07-27 05:50:56',
                direction: 'OUTBOUND',
                errorCategory: '9qpbhmpzjgdes9a12gexkwxh14v4r3rrgtp6h9pnaic4wbezb97owogwkjcywayz8xyw5coimd63a82gapy7lp1bhzlm1x5oophjaubs26mc5r0680rwu8gs861qoqtg9nwn3074u1k7g9fyu043tts5sf3r93qc',
                errorCode: '3x9ok8din559da2a7vrf',
                errorLabel: 892760,
                node: 7800489526,
                protocol: '3y8mt0kts8hy6kcv1zb2l',
                qualityOfService: 'n7p16hxup29a5dereys0',
                receiverParty: 'b467r7ub1zy08v84lj5r1wljasvarbn2pvmdlz4gm243xcg7a5m4ib1ui9fbcgwa4i3vi8jpqdv3whmx3bmgpavrtwjz1t2cgdotsluyorwbo36rj2cimqi7dyqae8oi8ttkrn5qpipnop5xnx4musp5rcxtv8jr',
                receiverComponent: '74ec4nwxo0kh1x4c2711q4ebrzk2qnf2i29tbx7qn7u1s76xcoaqxq3djwknoag3o8bro6thv7hngoliknvq080m56px6m9bv5katjw6g3eywpm5x09rgkcm1jnwmtq6g4hw9p8clzz1vquinlrf3bktrsxbvoxw',
                receiverInterface: 'tivzfwa5q5dlvd1534h4o711tavwjomupurbnlbtfztvnaxmsd7e6njd2mv9qd7cslhtfetdyfnmra725ud2qyra6lh5gs5wt7kgyd9vgypv8h5aq7ar91o9xngiqthyffdhsvf4n8y6m44vhqj6qw51lsgzum3r',
                receiverInterfaceNamespace: '3ss0mezjipb5zh8313b3sbvndlpfemk79c5ioy5swoi0i559uxvm00r7xuy9ovw0x5dk7oif1ky6k1l2k4n3j55nf4irrom1ydxzovgdqjtikqfjzh32egec3yewc2gxlazzlken9iyv3xp44luxv5xefdqud2uf',
                retries: 3352639970,
                size: 9429121232,
                timesFailed: 4789476155,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'vbv2n8ytkvp36hgz09s1b8fiuj1xwrlspmmpbz5r6vlvcx97t4',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '4c7ypnh6nrugkq2ugwlc',
                scenario: '47fdwfeelqhxhji4lpefbe3a9emkuev9h3p19popo7pxledrdobjghgv02j4',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:18:41',
                executionMonitoringStartAt: '2020-07-27 08:20:59',
                executionMonitoringEndAt: '2020-07-26 21:10:35',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'sjpsyyascztpz3a2l0e3fb6esggltl4wxkh51a3oaria6za644gh4gi358fj1unte3eo16xfsp6uz3p2rfmhpiu9nmu0g051ghd291ybu7llu2y470r7gaqddzyjmuedeblqwyqspkhnbqua5i0plv175vseeiy0',
                flowComponent: '3chng7eh21v4p201cwvgj0o58hncbh9lq65n000rxp3igw50pd7bqil9d0l68eytmdou8przknian66n5bhxt9jlokf6x9an9oacxefflsk9mjb1f7mfzvmm7y138nob104m1gy2gyq8pz1lnmidx8n3kebjcbhy',
                flowInterfaceName: '2x945cmz3d5olqc452otjvukdgw62thv2z8jcdpqerb5zmxhx0o6aer1onl4gldlj6h5zcb2owl1agg5ftifjcxekyerjz8pla5d7e6u85kl4c55ilgmz19divwpkgxxuv00070ikfczildtagv67xy1u8mhtby1',
                flowInterfaceNamespace: 'rbh6vaig4vfirtbngkwcv73xonry23nl3owxbcy1q1l0j8f1haxwbj38fd3aob6sx9e2fxrzjfj8mih8nqklumc4xyljicmvdecs2akdcnt0vkn0kh06mzzv27wwrymff8073m7b7mrxxqgj9u64hqjttjw4qh8q',
                status: 'WAITING',
                detail: 'Dolor sint laudantium deserunt. Corrupti labore maxime velit dignissimos optio mollitia. Inventore assumenda adipisci tenetur consequatur possimus et est.',
                example: 'j13l3s44kd08yx7oytyatvbnch6dtgx0mvwrfp5cajrna3if2zoq1eldcyphvyk1g0hwuqtad3oer9acy617jw4ofhvie2cqcv1sxa6p2qwfrd1f4883fy91pc3jiq2c6h2gxqkeaamy4ympklu8n76xy0emqi3q',
                startTimeAt: '2020-07-27 16:45:44',
                direction: 'INBOUND',
                errorCategory: '38ek9g87xahbxgiwo1l2y30bzhcsxk7alwnpzir1jr8afwchcececvz2m0v7249h6biu58i5azaiacvnyo4ayhuy8oq5kid12m1inliq4hip0y7kjm2hfjs050xrq01wpyankjbr29x0y4joe0vadubqwo1qkddh',
                errorCode: '9tqy5uk0hklyv58mj13t',
                errorLabel: 402460,
                node: 1121968920,
                protocol: 'yr7hpj3dfbvxmmjavrfb',
                qualityOfService: 'r2292g9cjpye2fiainx1l',
                receiverParty: '2ulka1tf866h154h4awbkxtzfg5y2jhj5tzi2ue2cfaf0mj7ewwhxzuy85oy4mg03rdt24z8k96388pfx7zv64lasiz9vufbr2l5wv88xrtfsvwjtzake00zfrccsyprt5gad2suhwrrr2f1afoqbdqgt9qd9o8c',
                receiverComponent: 'yqut7qbwnv5dewdknp0ofhqhj0735bsqi5viihny9c6gqqbnvbb0x7x4nl1qbvpi6u7qmbnfjuuo5qk6cbhyf21z361w41jmle6vedyp9pdx0p2nirl9lax37ry9011cnjlps7td94b7gztb59xmj3latkqxbdkf',
                receiverInterface: 'dcm5k80dl6y6a59z47ti3cf3rrjzlgglgbzom53e0bzfwnwlakv63mr8eylw8q9yeh1y9wxjziws78s0drc3ibj7vd95to6m5ix5i3inabb2qsycihx9011u1n6ppedrpeeaqzk9hkf9ocdh8n66oz01n98c744j',
                receiverInterfaceNamespace: 'anfjeqytskq0w671w16e0dcjfvx7z442hku3nv6ldp3txt74fhpq28upo5xa7k6tfm273vazc6q215fw1whm3rv3q3lmyipa9uxsoqf20ka16v9jho4ea6rr49vavqhm6oue9bbs94xfrvsp206q43h7j1gqj72k',
                retries: 3531309131,
                size: 1165223336,
                timesFailed: 8508143113,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'xh0qlwh3m0dd1g98visel9viblm79lkohlnxwyn1ms20cnxclg',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'syf828ihmeamxkp5cpjt',
                scenario: 'rvhoom0xyw65de09chly9d679mly52zfa673ttm40v10xxy8uwfea3t8agzp',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:20:39',
                executionMonitoringStartAt: '2020-07-26 20:05:03',
                executionMonitoringEndAt: '2020-07-27 05:49:02',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '2x93myws6dz0ahgf602o5oxdf4e6bjduxgosy1x1ifp7i8lqyl4b5o58xkb3b0x4bp7pdf9u5dfbpge7v9ydlb76esw73ku48lib2hqzoepa1cfthew7eiq4ym4v4r9cx647qga6no6h2pp7lpg24ffrkfvzpc2g',
                flowComponent: 'v7ujl3t9nr2ijazsq878ed0izomyozemetsvlv2fsipvdhrkg344c3eo8st98ozfdvzd7qz40akqsgtdcc322h7iuh615n7ksdztrpoq9oyx7mb8cx2iww2jjivophifjgx87ndmcldou8mgrqrtlhu94w49yaf3',
                flowInterfaceName: 'i9jgvouwg82o0njldrzupv3h5wovcl6nuzf2nn3dvpo0s8r1z2c8ctddl16n919ijz46wsya8307ekax30cpc5kqu3b76f3pi2whqodmtta8fcn27bxkc5vtlb3vkw39nk8kii2hki0r4kt8mw3sc358rb3hdgte',
                flowInterfaceNamespace: 'htswbtfrcc35z2dotqkouhfhpj2bj45w2q3yv7w6odxhrgiems9zdgvpownoocbumnyvtb7c2zcljfienn6sm40niyia39igs1b5yecxzt439zg4lvpwj941wlb6j2tytwe2tm8g976y61badrsaw0s6ohnk5q2q',
                status: 'TO_BE_DELIVERED',
                detail: 'Rerum perspiciatis laudantium consequatur sed ducimus perferendis sint atque commodi. Nihil aliquid deserunt itaque. Molestiae nesciunt voluptatem voluptatibus totam dolore in non id enim. Nulla porro modi id commodi. Et iure voluptatem molestiae quae omnis autem.',
                example: 'vvq0s5gw0p1sipwv9c51ck6ww53dlaxcixcui6z6nscz8w0afw4wtgmcp46hsh59f8e2wwqpttl5ewoejp5a7pbcyucx4cb3riprc7w3h1xmid0k6w6ioe6qggzfg10dkgfz8cblnrt0pvtal04j93q0lzai7nac',
                startTimeAt: '2020-07-27 03:01:32',
                direction: 'OUTBOUND',
                errorCategory: '5ylhokldnzcuaro5sjmotx4kt8qgoqfz1qe7zbifkkg6l8riu72grmrfqoktea7ivjxkno5akvj2dczgilhuexx2ellwcj3a45w06kwxl3ikz2ehxa50qx3gq9xfauduer5b07iot1vtk71nsepno2bxi518p4vh',
                errorCode: 'ftnd41pxp89xfip6lx9a',
                errorLabel: 543030,
                node: 3095350001,
                protocol: '1bjzc3ghe6vjkwodesqs',
                qualityOfService: '3kyzo4jxtnuyso06lzsr',
                receiverParty: 'rem46oujj1dhf6sdh6blu457u1myx3w0gnond8nuucyoag0c2c21qgpcrswucxugz9qd1hv6zv9q7k8g16a5w1wvcsdfjzc0ssd6rvgav7qj0exhs7rgkgyf238i6yjawouprhbbqwb0cj6jrhrolr7tv14yt2gvv',
                receiverComponent: 'btyx0ffwqux7zwpgyc4wlz1l2y04267y4jqd806f2gw7e69e7aippbq6ybfa0bwa6vnfuqxq0rrkcvxy9bl8e5cvfusfsj9nlwqp8xo01eo5xbtn2w36npemowc5e7bkj6m8tuozf75wedkb3mnvnid3k7sp7avc',
                receiverInterface: 'ulzlpd32hzglqc75opdbpyf090ahzdb7f151uldtmo90b4xfjm0rszseo2s90s04lj6ydkt36vqbekbae88z8be74dbna65y8rb1dokteof7u51xakielv6ev20il3uoligs1fh90oq6uwrg22ovgy7ef7l579x9',
                receiverInterfaceNamespace: 'z4n35qd841a4bqjuoavggphv85q1pnblcdspdjfkngmod47ggej951fnzb05gqu8s7k2ju4e4q00l4fzyg9gfruey075gvo39cg0i54lun2qbx8vf5b7ij8o0zcj2g8lezc2jfzewb09tystfjph43e5677dnc06',
                retries: 7989471389,
                size: 9533026404,
                timesFailed: 3582961367,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'th6m1smfxkxxozrlonzxgspbzqdq0y74srtzpso0lggrq9a5mf',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'kw52u3tk0j2v55dxkxjb',
                scenario: 'ayux4lfzewf6mutam2ng4dx1a4j1dld95tddptgo4aa64guqlqx3pcfv1bf7',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:55:53',
                executionMonitoringStartAt: '2020-07-27 16:43:04',
                executionMonitoringEndAt: '2020-07-26 22:05:48',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '6nmiko0h7pj9iyv2qsuo7chtdsgimwizacszy1y2ngdu7pgwcewsbmfa6ko7wnqphimghdj0kwgsl7ntgne6cmxkosg030kyfm03n5xb9bqllg1vtc7sj8ay0a7nnuyeei18gsvzgemjn2xmh07v55siw2pse61q',
                flowComponent: 'p7bpypx93336m2mbdnbqtemw7b9fy8ba4x8kla2bjuw46vw4ty99b2nbtacinzxxgfkiu374qpshed7dhwv7phrvp4tcatl408i0lbep7s5epgle1mwoyvw9n910atmt2sy1jl4trgd5a8728f7cpmwx93lo0xvb',
                flowInterfaceName: '8cv4kyq0t8jgo5xjsyz7mclu678m0x1oxejhk9gtuctm3s5ypnfberle17qsgqhr78hxp8ev7zua6e3h9lby2jxp4mooao38p4e59diouk8l9es1baqvdnebl5wupwky6q3z0duk5wzl4czjc9znqouqcqbustye',
                flowInterfaceNamespace: 'nfiytc5sk0hdr8dghzn04riq481vevch55zmr0dxip8p6877tnob2ktxxl50yfrjlx2phuclexbmg72d39vhrk51r3lj0ie0x2pigsji3p8odmpjqu7xeqql24tfhgzzmrr193rxbnquvrznwg88ywu7b55ysi4k',
                status: 'HOLDING',
                detail: 'Quisquam quia excepturi delectus. Omnis neque blanditiis aliquam autem. Et architecto temporibus repellat quo. Quidem excepturi harum sed. Tempora deleniti ut sint.',
                example: 'u9wwvwza740rsr1p4mwkgu14jy4invfe63ex53h37tmw2dplz0zydlzggh9mvd0rmwdez3thpjbs7w8q513du4zx4868rjjkdx1ok02q6ln8xhlj65w6doduye63nrseel6c5fbppu2dqfku5u4bn8gdqazl7ypb',
                startTimeAt: '2020-07-26 20:13:06',
                direction: 'OUTBOUND',
                errorCategory: '7gc4nuf8m6ms9m9puwiteuq125fyx55zoj8fpnormp7bpd9pnqco7035bi3arw1kub6g0msn2dda1ym67kxt6xgt3bdqpmh50edbheri594iiw1ehxhtvksz9fo2kzxdx8oytvw34e19tktm0oxnf2gpc5vz8uo6',
                errorCode: '73q51t3azymufl9kjqev',
                errorLabel: 582757,
                node: 3548189310,
                protocol: 'tpvycsr9bta62l3nc898',
                qualityOfService: '2kqq7axezdqyiq3zcmai',
                receiverParty: '45urkzz070lo9cr7whbi9ncuvkhrv40z5qzqv7be0gzo6t4m4mmwtxo0dfkf6ycn74j085hd5hb2dj0dxmhkbavz4grrc8cmuzrr4se3tczsjutv0d93azn440dhcv0y1twr1amhz676b6vlydj80taseitzsk1s',
                receiverComponent: 'wtkv7nh74qsq40pjioq76187hdosv2evj6en9i109azn4tkihrhpcz0nm4uicunkw2t8go4ueq1c07y3tqdatgi9izgel1v0g2jyc8xsvyjcwgv5zfhe7vaqiw1ahe18es3rqz1vgyotxcidb2hkoy3uo4gmmc98j',
                receiverInterface: 'y8aha7ncvkvew0900iw713w8if1cr6y0bwx4ul90t5zmd3w3rgnlru0ya0696fbgrzo7gg11o3yrbrexp8ma0ocxcomldg48yca79rk0ek1f63pjiurm48zp7mkrxdhuczhh8bkxip56kz02eaka7jbrq5ta7cgj',
                receiverInterfaceNamespace: 'i1lm6n8q97k3l7pwbymjqqkwkpv2d3wcs6xp7qkklh5x0s8jceh8zbavty0z061jfszdwypi9rmv5rmbu9vza124tuf532tcpg65vxs8tw2x8vbjx661xds83nhcr58uuuo85nel687qshlf3iizyqlb1v7lkxwt',
                retries: 5122288864,
                size: 1007345217,
                timesFailed: 5229705269,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'qgkmn3qg4mkoxiuprqss422t8zt3yqm93u5e4niyn9837csus6',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '8vgd5t26td9pbdmdromr',
                scenario: 'tq4wejxd4e24on76lw94knktao9gpwcbo8ka7glo650uxldb0peku5bls3ra',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:46:43',
                executionMonitoringStartAt: '2020-07-27 02:15:17',
                executionMonitoringEndAt: '2020-07-27 12:59:09',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'udgxmqqzhab53kdkgpncicji3ens0uoxufse7z8dypyxmi294qmk8awknxvq0cemay6mo8cx32u6luwm8oz21ilz42gt041ewb1l763fj3szx1d6ulzs1z5c8yhp69ydtwlycsxn1i8zrrg6wmydvy0l8o2hq81c',
                flowComponent: 'djkaxpi3dbj0tspxbxxm34udr5zd3oqbi1ftg9yfs346y4y5lbfc1yyb8bju3vkw54t0t9c9ut4x0iiaqaindmiu620zo233nw6ftnasl6vecgxi0vbhsinumxuyq6bmkqcv4zs9xnczpcccvgqq6hwoeq85t2pv',
                flowInterfaceName: '0vil16kk9w33zhf5h3iaq0buxdk7wdaw5ocwlfgxq8wqf37rmhmjmxfnq6k9fdilqs22dcl34oe8j5id4dy6e40q95dxyt09og3ungkw3mzkzrbd5zvhvmjzgm6bz1gj6zzhdtfz3wa07abacl9kbob0ikjgmeo6',
                flowInterfaceNamespace: 'o45bc5yrqjftkt6k91z9ivku8qxle8ow6k3c72vb90ibj0rhi7x5cu29mbq4jr6mau7bbyj1ph6l8e060rww2dd5fok0siv33pcivzrakqm9b6n45uasjfu27qq07lxpcy6b17oy621h1tw87zfdeo471z0hzvbb',
                status: 'DELIVERING',
                detail: 'Aut sit temporibus perferendis accusamus ut quo officia. Qui quia ad nobis facilis hic quia. Voluptatum nesciunt veritatis autem qui. Culpa ut dolor dolore voluptatem nobis qui sequi eum omnis. Omnis aliquam explicabo dolorem cupiditate quis minus et quasi.',
                example: 'sqy3e63h0cd9n0onmlhb2bzc3d1fltav2tge4yyeugb56l5rrak66pojwi0tpl0pnjs5622ix721s8qwfzxdoyckumzhgdy091t2q0xbl0mxqo9ykuoivfkc8pk270q93wlz4zed11u0muc8jlq2clqn1war8541',
                startTimeAt: '2020-07-27 17:02:03',
                direction: 'OUTBOUND',
                errorCategory: 'iwfgyunbjl70m7soytj6akndbyawomijk8re1fmtjvt53xtuqkyjxml9a14fyb9udmt8yyjg48439m4krxnafblfwx5xvqc68nzh6wjmdnl5iwu2jvmg9d4nsc4qqmpxyhk325uss286vph37nqutxh81umotakp',
                errorCode: 'vme776nou93mjmbtntp4',
                errorLabel: 520954,
                node: 1174316372,
                protocol: 'sud9tfnen2vi4epquwnh',
                qualityOfService: 'cv20hf3sjovjdoi2j2hk',
                receiverParty: 'bzl9q8xhzieg3nqwss53zuob608enonhu2eom6n8vp5ey9w73691vp3kzujmeg9fov1fjfkepyx230bzvui397vgmq2qk4kpoqjyqipwqn1r16ppzudnue2f9m9ftwn90ngmuj0017vz4xhof7csqtx4479nhawl',
                receiverComponent: 'k4sadipuny3shegrywabxe0soa2qbq46cpeh66cskhw5ojzx1gbzhuq53ynrcpc2mwvdok9ldca9fcanfcb8jxp99ovotdot86ncn1u6lmhyc7r4g69oq4hn7lrcxhj0e3c4xqmugw9p6aeacxckwrw81zcbniav',
                receiverInterface: 'v81z8p4avi06lkwe1kkvux62n6owu2bexbrw1pd8i88q25ia75zukrmkgure3s80fa9xghwpi6y0c3m9isj9eizyainwwlutkhxmhok5t8qvh011n1o4zte1sddue9hp4x3iblhso23hdrnhsqcrbj2iuni0n884c',
                receiverInterfaceNamespace: 'ahl9ou4kfqzpt1fgwigs4cqe5ren7elchju5o3xwqm8o0zsoblq5rc6d2164amjckx2j20o9jz81ncjkx65043bivea35owe5h0t7qkdu2lnh7swpad3yt1hfp6jxdlyc0draml6lo568y495tv8o4hqzc2tc7yp',
                retries: 1431419905,
                size: 2861417903,
                timesFailed: 1485894188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'ilyeqcucbkqzn6cnj415fje3rh855uf2v9ox0loldnhr8llf8j',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'qu9lzotk8ugle7a3yujz',
                scenario: 'iez24fimdw7djcxxtg6v4dlz5f794p1bftnybi3aw7n3pkrm6dh8ggiboyu9',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:25:52',
                executionMonitoringStartAt: '2020-07-27 05:01:11',
                executionMonitoringEndAt: '2020-07-26 19:32:07',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '7j6d20mpe2ttwuolef9fnqt1gfzkoi17out3el2wnroq0cc2fqg7t43nknzlcit9aq5vt9w4bbssfghnsbt9xkc6x79az9zopq0qw063wll0kycej99j4zb3e6yubzaatubauo9j88h5roe1qxu17nma2utcv4uz',
                flowComponent: 'k3cym38lquervfxxozhhaoxh7up4u6s61twt4ic3r8sijibbmgbgq9k2jcn0apbshvsnij10x2pqi2ijefhqjno9khyc18c3o86otvjknnb1g7hf3i78fcrnw4aev6u83q7lh4dusokynyvm90eoh7n1ns7qq6yg',
                flowInterfaceName: 'nnh8tfubwbpxj7azul8p8y88gelxfi2onolb9m3vr1spdxd43hkkjwqg3w4twwr6t92tszdxilmigxilfg5mtmkfvec84iqctpgvvmpf3n2tpdwvtunhp6pqgw47y1381hhxx7k4rtyq5xair7nkh0oqbs8f8xq5',
                flowInterfaceNamespace: 'oxseu39jo58x8vvqktrx2lrjmsawv146dxevcx1gz0gnn10hbj3wp8i7pwv1672jox51hvt6nge5s2nfb99oiznqlaoixeg2haoh2wk1qdaklr9i9xo4blaf8hf4jvqy1d9ygp8pae1klxdn7u9yqks9vge2e0pl',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptatem saepe dolor. Totam reiciendis quo perspiciatis saepe ut. Ut ut eum inventore vitae ut molestiae optio deserunt. Laudantium optio vel velit eos accusantium qui. Nihil ab assumenda eius libero quis. Eaque et ut quod nihil.',
                example: '5pagfrzk23zrluy3p5ank6x8dzsk9xbbwbfjdlu1o59whxfmtpiibsl4e595elwatv63mtqx8o5sfswbchd2epvf7pf0qnlotw6iadl2x3mttaq4gdnbp31e2woweef2ldst8keymo404x3tnl85m3gu3m3i06jj',
                startTimeAt: '2020-07-27 11:17:46',
                direction: 'OUTBOUND',
                errorCategory: 'rehijt5wyq95hl4lglrb43i6sp6zhso7q3z05c672166a90ux0wkq4ntclsmxdk8bynne0q01vck3m9mqq1n88qdga65010aiyfy6yc30cyb3eibfybb1cr0id6lfcomhpfxndwgcm7pn47y29sa1ph6c4kt6fy2',
                errorCode: '6kguae311s3a78t0law7',
                errorLabel: 984389,
                node: 9917096502,
                protocol: '7k1kzejmmv1v647i7khq',
                qualityOfService: 'cciauw9zzi089bq4snnu',
                receiverParty: '8uw4fi6le1f0syuh2v00r8m8ooc7px6ik7b2p6zh2td6hvkuwme3r9xrzc4463dyfi29akw8labywzw9dmmh5dhmorzh0kxow3j9giev2et2rb2k0hp82b1hixmv6g5p5sf32cmnt4yfj4pmvertyz0yocvhafms',
                receiverComponent: 'ogccx4114qlefy9nt0yii3jve8fmojsrczvz16m1wlcyyu51rbyep7bkx1tqocgw2lvf0vb7j23pxele7weeiudauq64ajztwcdqd81ad3hhsqe3m7t486bem6qmrux1r2syc6ldnku0uavnzjuqwlpp460m7d3l',
                receiverInterface: 'gci18kg08270wipqldmpo3zhqc7uw5yaqynwswdf055wwln34hoiibrmuy83u8zxafthiwsn80vffyhzcgaidhwsjhcu0j8jbdfor61zk2x3b4unesol7dvr8vex2m2ra85r3rj1rbdvoqhtst07ccipc96xgior',
                receiverInterfaceNamespace: 'k3lkhapmnonvhld6yuwve6eev23ikp42040bv2jgcms4sl6vry42v1uvkhb9eutx35axd47c2h2lovvpngmeof8kfiyqhzsfmvuod5ss1xuhqu6zmzzwzkeooux7rmhkjopizps79kka0o7zii7qe3s8kgjrb3gyx',
                retries: 3034437566,
                size: 2590214037,
                timesFailed: 5322635635,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '1zm5ayuz6ezdnwvp5ja7ohbmtpwxs4z7gv07jn72kfioavl9od',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '0woltxg3dr44tme66h2q',
                scenario: '66olm1hduksn15dphoa4vazfgq79qv2mkmo9rkwa030lqkgxoc9sd0tbgshl',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:44:14',
                executionMonitoringStartAt: '2020-07-27 17:19:41',
                executionMonitoringEndAt: '2020-07-27 00:18:03',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '4uoovdmt2qlhr2m1m5364x4y3122sgu10p1xvyokxnuad6ndlt1lerwt46pta8625f3mi966j60388c50gwsx5w5oich479kxut4wiyd3j297md6rnq8lelaqgo6t8k8ygv7ujdikpjzdzozp7qrd7jfgbfncik5',
                flowComponent: 'izxryezlok17lqrhpwqcba4yio03wuh8q0i6r8f8ncl7uq8q558ul7jqm5msys4hbbd00ulbtwem3u384xb6jmgvzwkkm2jf6d5qiv4j53arir4bkp5nszwukoe0tfwpzo5kg8xnpbj6dlryrevk5s5spar9mufy',
                flowInterfaceName: 'tabaj8i3m4buin09pb1folv6l8awar9ieucfo1re04fv4iavinlw6i88mky3f4ndsymznlbpb6lcqvd4o2qiu2j8kgj5x6bul6t76tl2vgx6t0kcgexhr4wrb4lnj47x2poy7z74fe75mkpzcp4wc9duwxwg4w3x',
                flowInterfaceNamespace: 'wnb96my0z36k8rzgi3adxvi4x7zz40jf2f22v0nhtsvvuid16on4qhu53tud6snml672bvel9oujkdgwxcfz92si2qfk5t1imkpfqv93ajh6ii3qzlyac5i40lr8fhqnbsrk9rhghlff772dqz26yalelcma7tej',
                status: 'ERROR',
                detail: 'Ut dolores fugit molestiae ea dolor ut. Quia deserunt deleniti unde ad perspiciatis autem distinctio nulla. Ut veniam deleniti harum aliquid. Distinctio odit temporibus. Quae quia tempora est tempora illo. Quia pariatur aut autem est.',
                example: 'x6beokkceq7ltwyndgletv42izm1lpl9ofj1ofyajvxfxsp54ryjzxo2x8v3d3iigkypl464puy93sn1cvo17ybrkjfqrnkt2lhmp3cm5jlwfy5qeko1h1yic4af82goslnu0fiqwjp8ee3b6ju6ubai69yp9mv3',
                startTimeAt: '2020-07-27 00:38:09',
                direction: 'INBOUND',
                errorCategory: 'w5fqyn2t58wddlrczwnt2sgoa0z0wppf1r65di63qowe61dr0cqrkjm0hv5wihn5d7qrq36zfx3vvd2eawhozluvq2shxlhsjaxdduywf24oh9z6g3zfo1ayi2ysauxzixyet9whhiytf13lcydjqzj6dx7ukdyv',
                errorCode: 'aq7fv230wpiw9qg0qxq1',
                errorLabel: 816257,
                node: 5155953851,
                protocol: 'ka9vkefchh4ljnrk1f8m',
                qualityOfService: 'o58rjq1yatb6c9iqvrjl',
                receiverParty: '4lz5cldoyn7j34dejo68l2i5ln6yvhk19ccx3bb1bqgplgfawywqma8ccrhqcn0qry6tl2sjhhtuzdum5dzrljyd1lgyh8vbe5ae9kl50r8wgs1gsr4i5sskj0wk906w6z3a11dhq755atc2zvb87x3bvi0rt1cn',
                receiverComponent: 'x9jeui4dosvnz9vrz9mbgxxxig1wfgc3wg7nfe9r3bi75delfpgmv45l83jjphcji8ai2bt6ek4i44s0qfe09nu7q7j4rmm14ekfq8gkk6raa89uq8rhgux4wejbrscd3kxy5441w5yexd9h0yo98l6fyyr4xpnk',
                receiverInterface: 'taatyrx1fm7hdw7182sezm60maqnicgqlshp2i4m112vwcm8kc6etgd5kaemt8dnjjpqyzzzqqiq19956f8dcc53pnlqbrrhexn21zgagthdgt130squ4xelk6jwtcf91w9vvjvzz4kak2cp386it9qo6nfwnmmt',
                receiverInterfaceNamespace: 'ywlkl0rur0u5mt0ep75d4izvsoyt4ewxb5z1d956ul5asnj319j3th4x5z39iv2ffei82vaeod3e6i66y5qm3gs6l0zdfubbq8k3tcfcxj4bnn2e1ev3bksg6mrakviwzpinev6k0fwvcdzaaffrpc9wxqj62z9q',
                retries: 33640410845,
                size: 4018090653,
                timesFailed: 6037724542,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'nvshe7wwpzb4x9nvg8oj5vlh3b1s0cr1tt9f35pjo3m7lixvy7',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '08wjx75mxubmzd02odqo',
                scenario: '2sbjbwv2o65uou4vvdefesuztynjl0h5wrbp20n73wi3rgy5222kb25nbb7j',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:53:10',
                executionMonitoringStartAt: '2020-07-26 23:11:23',
                executionMonitoringEndAt: '2020-07-27 08:40:41',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'po2p328rl2nhdn651ujxp65vy1ktpj1hootufd0kr1mc4190ca0txvz7khykuo0mx80j5y3ww3ltki09215bhg71d5cpf7sdi5869hk1yocgbo5qnzvy8g7kw8m0v79zplw1k4vhgczartgg9xvl57hqpv84qtdl',
                flowComponent: 'wm8rz3uvimvdpj0nfjgnr4m5jfg1gwyyyoi6adpj7eg07qe79wbbh7ff0ofcbb1oq09tvti40o789v0ddh4vp73a3ncu84g7lrph1dpzrxn3c6rzj0pdvkfxcb3u9fz06m5xmdr7t0249coz9gwbm6q4snfeg7td',
                flowInterfaceName: 'fw2tbb7xyf0zif8hlat42trftldqv178osem7478cszvu2ouizq200hq2b00hfjsyniroup9uqvj9by5mrk9nfagsympfypuo8wb99estom5t1vehcrn8i4hzpdgi8cvcw8zaqrrnj52hihhdvsuqnwva7ubp3kv',
                flowInterfaceNamespace: 'tdzs4wyouc91wkajo7ufz18v2vc9qyt81xs6o50h7xlt78dkuoz4msfw7z4mf6ew40uv1fgz6vd16r5psu2ekcqj436cx17106kwseb6mixq01dkkox9osy586qa7znzbnb370kwt9oqmpqes5gi4ucsva14cgvi',
                status: 'ERROR',
                detail: 'Ratione consectetur voluptates autem autem est. Ullam cum quia ducimus numquam eum in voluptas molestiae. Quasi cupiditate sunt asperiores vitae dicta vero molestiae. Earum beatae quos.',
                example: '0xv0n5wceik961esda2k21cqt0tdn4hwzch7f9r01z1w4lts25zmep4qj4znu6wm2l6z4sqijcf2p1iu30tnelmhhbwzrwarcuvyju721l4mee4je28u4k9udsizayilda0utx77d68cdvt0qgt3bo5c87b40m1y',
                startTimeAt: '2020-07-27 15:01:14',
                direction: 'OUTBOUND',
                errorCategory: 'nqslwflucvylq54vtky2wa1aimbt8qfvegh69zmjs0630h2x30v6qlhfarmvueyvwnb45m8qrxdy7z4p6vhuku3pcyfmz96pm8a4mpmg3yqhuwszy5qu4vpma4reywmrc9hmewd7s8hecueav1db4s01bifmozua',
                errorCode: 'nfmll2qhcxfevjjumhs4',
                errorLabel: 370186,
                node: 7511943590,
                protocol: 'ybe038ab4pq99csog8sx',
                qualityOfService: 'azipgv1m9mebwgpwi1km',
                receiverParty: 'vbdhidekmpo5d7lmhdqub3fvdp2neunhi72bl8afw91lgrw7qiopk4nwcjpj9758zhx3xliev0gwmexb52yte8uakuds6zepcxoljc6j38bamc4x08rxhq05xdeulumzzbgw6nj1acg7pqocumvuq3ivwguck1ep',
                receiverComponent: 'sbch12vb53f7tuqxqsypm39mmn854q5f69ov72l3ojdequx2xgn98jqxf5tu9z6xylg0m7xkujab2qmsiyniq1211w5w377ufyb7qf71if46mxbduz7hwvepjnapq2my4d739w1mmar5adjdoqfij606jj1d4tas',
                receiverInterface: '7ysbcws2j6jjgz8xlhoyk91ovmnlme6oaq3mbfndzc9jwvmljndi0ai831wszyvp3t97ki6evhgou2euok61o20dfq1bu33k6pzy017eh3ttzxpjm9tjn1gmqdlu5ym5ru4ckfrujsohqa9ttzt9mnffugpkit2n',
                receiverInterfaceNamespace: 'm21up6iqxr5z4anvyg2ar2ec8o9xn0p7zc76rml41e5ecnfm8nu51ffbbnvonx07yzfayqt1n9mvbied23jk3ac9co8snj53xthmzhm3jguuvgp0sic84xg36asy64yhcd2kyop0saovb1v246exwnlnc1ovxwyd',
                retries: 2891650170,
                size: 21381821716,
                timesFailed: 2973593188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'xrje0lv1cgdglcg8ufggjzs58feb3vx25qq8yy3itx5bex5mye',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'gzvn9hx3z81fzmenpef9',
                scenario: 'i2jatlgs98u6de2q7crk6k4vicpl3hf9wie0xz1h7cw59yarv9meazqsjm05',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 19:26:33',
                executionMonitoringStartAt: '2020-07-27 14:15:51',
                executionMonitoringEndAt: '2020-07-27 03:12:54',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'lnwa4z31pro72j9sg7xpt3g1bujept3x56dndzg9u4s32fb0tfclp3mgts4nqaz317dyj9ez7xz23kw0efhwhh8qvmpdr3e11bu18bwryd2eduz810g1eh69nh9b2q3shp4qv4zm7m184sylz8pvuuzjx4jxhgr4',
                flowComponent: 'pfo4rh71vwo1tliryeesowafomvv45a4wz66hf4keqwvb9z41y2vzmrozee62wxa5j751dau00gynq16z2hsvs9ifiae3nhdx958hpxvp18h0kdf8k6izihjndruh0zzvlx7k7kbxjt8v6ckramj8a317vt0wzv4',
                flowInterfaceName: 'ddh19kjpr63k7vcyy7pczi31mdoxwb6e3zkqs4nqsziifspy7ynwy9f22udi9wmthlf38m93owddwl1503oeu515xa26kdzp996vji50q5auzzeqdpa34vvecr0axf5ne2q7sbmsh6vs1o7v4ump4ej65s4bylna',
                flowInterfaceNamespace: 'y7jk8qr4h3q3brry1na4zyvcw6di81d8idhax6zc8bpwhljgepx720cxctmy7tnelz7xk6kxaebosh38fwcy840fjn75npavqog8vg8sq2wgc9g5q0gzqwkvbkwmdgla0lu4j8amk5up86gqpr1hzt14yk3d9iub',
                status: 'DELIVERING',
                detail: 'Dolor omnis repellat consequatur quod aliquid accusantium ipsa ut. Qui nulla voluptatem est. Soluta omnis aut consectetur iure incidunt suscipit. Est minima rerum unde expedita illo autem ut. Ipsam minus sapiente voluptas impedit magnam. Dicta debitis illum et laudantium voluptas.',
                example: 'cstgfr89m5djuw4pzch56ara1wtn13q61fpr5exmmcoq7cu9z35i0kjtdxevfy78xorvs9m865nrcu883i6e6chrzr3ok0h01hr8b7rctzkmbqbsi2lvxzxfznez341ejanv4bio56wp4dl7bgkzrm8xenlka8ov',
                startTimeAt: '2020-07-27 01:13:31',
                direction: 'OUTBOUND',
                errorCategory: 'skch89w6d1n98xbyz3mkcacxz844ofvj5kjbahvb4602faxvsnyq3szigexi0y9jbxn77ic77llvpgxz6t0pymtav2a3sg69j3tamcuaqtzu600v0530ux331qstdrrqsbwfkmremh96hvn9h5m2wkwtp4r90vfm',
                errorCode: '9yyi8ielbdx9rv03vcpz',
                errorLabel: 422128,
                node: 5286735918,
                protocol: 'ngatta58utlu9bfzpcs9',
                qualityOfService: 'm059htucvmadfgtqhfvm',
                receiverParty: '7dlvli45v9qbpojbg4rbfmuphg26j25emwsquaacev6opscr201dzhzuwkui9i5v0xgxiiku9ldtgmkxounpghc51tqswsdswhp9m04keo2r7rtsbu5bzwems0e85agqtv4yc1re28dgydrhct3uu9l755ml1n6w',
                receiverComponent: 'yuqcx0gs603rb7i74y50ad94v9v7q55yg4jcsm0b5s2n17oc1quqv12z3mlj95ezoosymz43gxcptrdfg90mycypi84csoastt7dd9oc19awle7lbwfunqb3kcwfvd2rr1v5888il4u4p9r73c0ukle2ewd5bklm',
                receiverInterface: 'wqkv6s045ufeax8u76p6sapm9ha6e3b58k66yfqmgctm7a50vqy6lxrmny6u6mxoe20ekdwd7zp1w34tugeh4r6b31ku7ir53io9q99mrmxx1eqfjnaopsw53uidpo7ddkkki5m5h7xzases0n5nmu9j3mrasiay',
                receiverInterfaceNamespace: 'uzfwvfieqixeh4yzde3p4n87md73jli2ghgcsxws0za7rna98x1s5gu6c6ck563a5o2352bij6o6u68amq3kbki2d5h2aq8ljub4iqkxytd7uiflmmgmcbtaqrsr5nfktq95dbtldrqwv21iufse6zca59pe4wix',
                retries: 8883404712,
                size: 7513801592,
                timesFailed: 38135139145,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 't58v3rxnr59hqgwrwzymvfgzzj263q5ovdsbzfwfhni8pa5d4q',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '9p3xo8uf1o1i3xmeeo71',
                scenario: '4ta74ujccxama5avty5ykxhwnsmj57ezir2lv8bokqiwnh1lmluq98aii4dr',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:05:44',
                executionMonitoringStartAt: '2020-07-27 00:37:43',
                executionMonitoringEndAt: '2020-07-26 20:12:59',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'kyrykupxtmg7wvyofbd8wlxx3c6jiy9lvwf5oj3refo15qi8cmdbwl31dxb4o1rj6m0voxnwhjq23xcaly2fe7t34sq08qmvkcfzf9pcei0ixl41qfm924qsp9z8mtde4zumlockt0l745ss9dulbtkp2bgdw4gk',
                flowComponent: '28yn4ssrpfm9xuo0j22zls2peq4derl5pcaqi451azzalauop0ztzy1nw2r72gpu4pq37kesbr16ea8xdtabgpcmz3lkejl4z9ymsisdfd0rowbybylvj47z1f2hyrvkvmsb0svsjwum2w95jug8v8yzi5dn833z',
                flowInterfaceName: 'uf2fq1mslmolwr8p84lyml3hbj5ntj6k7b7lu06d0tqdtva0ifkltpvgqtbldd40gg1qksh9vsujf4aptz3eo6lqgo4y0jkmvrq9v46hyftfckhddo1kr19k4usm7b0nzpd89uemybnnjyo5l49upaixgyd2a6g1',
                flowInterfaceNamespace: 's3ooc9v5zfypphw5x10s0kghsvnjqigs6qdp1q54kfemdaksdchy0tq6rsoryawuomr1s8qslg9xqa2nzq2mnzeo08iq3b2qfegdrdnpwofz9iqxah16pelg4klgjnf5arczi7rgzyvsdydgr23a2378hm1bjsp2',
                status: 'WAITING',
                detail: 'Assumenda sed soluta. Ipsam quibusdam odio dolorem quae odio dignissimos. Omnis voluptas exercitationem. Voluptas doloremque veniam veritatis dolores pariatur eum quasi corrupti.',
                example: 'binp2wrp8i6v36x3gma51c28q9ybyywlcman8k2hyq7obasjb07ikvneya9upxxyqrh314r27o1zxw4zfdpfhhwk7h46ehmuzcogb0hoc3f0rorxbxxotdzv0gopsoc6qyjmpebwp37ro065uhg4l1njxzb1t0eh',
                startTimeAt: '2020-07-26 19:00:01',
                direction: 'INBOUND',
                errorCategory: '9zrqc7d7zfqn1sfmchsm4g817idpoko1puqx33ic1yfojev1bxay8ugmxnq22886f36hpj19ydp8msfxrvufjve443803sjkwcvuc2x6wqv1t3ifwaukw6w72bh0prypkrbegyu273hvcq54e9zvw6g8d7hhx0wj',
                errorCode: 'zckg8z19gnronqj7qfty',
                errorLabel: 511317,
                node: -9,
                protocol: 'spcw48ysdmxwprln1dku',
                qualityOfService: 'zcsz461hvvpb9ohjz05f',
                receiverParty: '006rz50nbt186qwousy49ijpl15nho6pt45hf0wqks0agf66i0f9uaao6fe011ty9mz1cfniuxr7r8niepfipc0tgowftxwu2tjpe01pnjcz2l81xc0h8ixy2nst6rzqr00j3huuvy0114llnhy1qnt4x14445sv',
                receiverComponent: 'v8a8b4afyp3c4u751q4oodlomhu92fuczsiyz5eop1u9un4tzbx9z2thuwwyl3hbboblztxve4f8e05bi49hkdri8lkjdxjtm4g99z1amc24takqotjovismvxlev6dm6uhhbvxns8j7039w7mdoor79xwzk3pjx',
                receiverInterface: 'ecdhukyiy4he1qmtjmipvpnvffc9ev5f3kx4ebhwvhb7w1clxhr37ag2j1757g16y1ks8wxclzy8pl4g0sg8l0hel5au0y25qqkertya601kfl745hd7pkug7l0t9u4hdeqhuyve6k9x06231tm57lmc2mhya5hm',
                receiverInterfaceNamespace: '4wnyxo1bc1cv3jkb9ja5bm2otngvphidnktawni1c8ck7hyqy2bm8crfmx4x3w0t52b597pccbz3b1aa0pzwyornlf03z4fqmon7c9ch7s063c3nrhco8xspojpq5dzxwy5bte2h97kcqmntrblyo89fgo3y6gvf',
                retries: 9794696766,
                size: 2888785551,
                timesFailed: 4006660391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'h0ejecxyk6edi29u4sw16wihfndtym237t95jtg3rp5nsrtnqy',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'o6pz1vr0uuyvh9p9e2r2',
                scenario: 'eukzv4xmu4pzpf1rjqib04ovaj0es60xyuqsmws92qem87zm31yp0uywg3d2',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:49:22',
                executionMonitoringStartAt: '2020-07-26 23:23:39',
                executionMonitoringEndAt: '2020-07-27 03:58:48',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'k7h1kvprvhymgsedn0vonxr5bcojdyq1jywt0og8bmuynrdbggml7kuz5i3003gpzrkrddizewh9wwcb43yf8vea13piupyemsjpwyrdkevjjwh4n38iwjqz8mleb224em2z01zk9xs75qtbi6lpsdkv6l6789j1',
                flowComponent: 'xs8xkqxewx3zhnzyz5g8fboqh617qgf53qfyddh7i4xwugwsbkvlzjwrlqogw5e5blq7ozqq8zf8mqfqa9c90g23kvy2is4te2lytbtlnmek3r3ufrn5np4pu2sz6gycfng5x2gsae0mwm6gl21g4a4k2mprm7yv',
                flowInterfaceName: 'bu80hwhmn0ns1f7ry0ntrh15ff6owzuakc7lqpz5wgmdgfe7lha1vpgxrqsppwovj8zdwqldqglidv2t7ejmz7euwte2tk2rgxirshjxxcqug3pwdh5nt7263dx891zttu4jef4g67hn11oh7u40gja78pu411zj',
                flowInterfaceNamespace: 'm9kdtjhhrrnla7w6avbk8llfu9lr2m9yfmyprr4741q21yc8jyjzz1j3bx2dejymec8yy1rl0rj8q79k1ovd541ajnosjz1mqvcq85v7x1abfx43xntnd6nrig43hotlmya0ifplbkbqhgsc36902rw83h4y62y9',
                status: 'TO_BE_DELIVERED',
                detail: 'Vero minima voluptatem non. Maxime in suscipit enim aut quia ex voluptas et rerum. Est placeat labore qui ut voluptatem et.',
                example: 'odwfyvy8y5rvas8pued6jmx892i8a1djy4z2upgkw0k0ub00z3nw48awve1r9a9u0mgsrls7k8ccyyqhxiewc7ly7qrx0daw6esu2572syxl5k1n8rj6zrf17g8gddix2w1r6918adcg4od5umc1agg88ts04br3',
                startTimeAt: '2020-07-27 06:51:06',
                direction: 'OUTBOUND',
                errorCategory: '0hg56z9nycpwrtag0rezi2xiby2y588k10zjolipe93nerlmhvz2wckywvy5dws624r5nc6sw4okydskc2psesr3c719dell7eq40k2xe94aoamm3663epr88v9vek135dho6o7n40qk8zyls9ezfz0bfrt5ialz',
                errorCode: 'y8nnuv73muol40mqs9vz',
                errorLabel: 834033,
                node: 2054825700,
                protocol: 'mo3u78wlt67xwsjhv3pm',
                qualityOfService: 'x2d7hxsyprc8evk2uh05',
                receiverParty: 'qaqz60e07iqpzriot7xkkzfqehrcxhj2tft6ofwnz4ogu1imw9e4q7k95tgepn4okevzkgge6tlh80jezwws4muq73ilxjcicqkoo05rz0fnqlbbzxu8ybmruzfbhnikmqgl130l2gv3bzqh3nmu8l140gsoaksf',
                receiverComponent: 'd5am8i9vfacbulcts68cvob2g7q2tb7ltltr1zxz6570aohqz8ev7xar91i4ax3p76vm6efvhtymffrdd4ac4xo7bqneaylr71ls3ajmqw2dot10mdrbk0xh4tcuv6oywu90r2d8a57314h8bk3an8v9ifexnby0',
                receiverInterface: 'w1s2styhcmghxwoi11m4okgb1vm9058yx77tbyqw25z2ua9sx0vgivn9gwhyxwn3k7nh6vn50e2w24u5xtocp0vyw3k06nc6unphr6xb72vzmx36jpcguei1z1roimpz7cjh51ae4v1a4adubd7cru6lgtts71q9',
                receiverInterfaceNamespace: 'n36607tfmbq28qpq0q5z2ka24227uf4l6wvw1sp5ynm96xelxzgfndx1jboz55bejnwl45rs71apsz99iooq28lmq1zgoyeq6ag69p08kady9gl1eb1edagflxrcadg3rr5pgcq0xupjq3hv4kau1639ccf1jxvc',
                retries: -9,
                size: 1413200488,
                timesFailed: 6832900904,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '8omye24ty2r9gi8n0w8gpezlbfycrz97krdxmx9q7qwgca3v2h',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'p9lgs2ep9g0j06nccil1',
                scenario: '6wijjoiu1tbl0ltf78bi8pxxaciu4wazwqr1j8lr7aqplpy365jgnyb07mg7',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:32:45',
                executionMonitoringStartAt: '2020-07-27 12:35:11',
                executionMonitoringEndAt: '2020-07-26 22:26:40',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'hbu99gajhv1f2micg0kkgsi0uwtofmm1gheeah14sfs9ueksffr9vtv96bklmegaa5hug0zqc7n9qutx3qfsmaw9evn68ye8pit2qjzjews1l1j2qyhcz00knmt44q9ktwkssq9801vy5k6iexto7uog961laubh',
                flowComponent: 'xgs4n3fggj4fv9jdft5tgk341bm0hkn17kddft7fpe5jc4owsb37p6csidh4bz8y24ld43uxfjt1sr9uro2yjtpjmyo62zkc7sohgu2anjmfwon694pglryycu1bzm1skdeujop4v08z768lwwryyfb7bqsh62st',
                flowInterfaceName: 'yee49d1xky0dy7623wzs20ge1sfyig2o8ov6hwz3npl45339o6evhee57fu4d5tvejaru8r88i8ky1dyh1yokxli7a3kf8sag0xwaa64qz3kxhsolqkvivn17lyagy4ply7tlftsx1psxdlyjhoe9hc96jhpbqyb',
                flowInterfaceNamespace: 'nru0gd15bjl0aa8ptfg5uwygyujl3i1n4kwink8tsqjezwkoljoartinmcq1dfjgwq049j36wfbe6cbudnir0lpr3uhdphjsm18qb940sjxtypgt12sbbu9go9k57qr87gyaff3w4x7ebxg9jevooiyx27rprh9w',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolore dolores et harum cum ipsam est. Perferendis ut voluptas perspiciatis. Perspiciatis id sed. Sit dicta non nostrum minus magni expedita consequuntur magni ut. Suscipit ut et et sed dignissimos.',
                example: '65q57s5ksmri2fihsfxfcyneknu2lwfk94oppf37u2k0o4vjrbdnn3k82tw8j3w2j95bj8j2dju6xda65icoc2dwdiq491okuffd79cs0v99m1jfr9c0of808ejemkbd13n6flb182rd8co8or4vadfjomwpyg85',
                startTimeAt: '2020-07-27 02:55:19',
                direction: 'OUTBOUND',
                errorCategory: 'jlo0hthfgl6d9x9hm1k7lx4mnvvfm681agpib4kk5txh2ybv1lndd2ds5e2pvqj9a8a2gbdka0hvom3t1ak9204olcjwhhs9116c5e94cemidj50u77zqej5dq5rz4ygl9kxzbwl8loo9v1l2k8u5m32f415kcug',
                errorCode: 'f468n0mzu5dc4hr3auts',
                errorLabel: 244165,
                node: 2736030923,
                protocol: 'uyrlzr9hd0tij1qil8m1',
                qualityOfService: 'vingp7zv5nweftpilidj',
                receiverParty: 'cocbb8npv151moa97xxyq2zswgt9t6mgetfpl5e2495flyyqsrcl74ohwnxc6jg0b55wr3tpbpnbvrfn4gi1e8tsb6rswgavcgtlbwtvbfrzpzqxrfqoxrq212wpn6cjs4jrbhzjlb4l71i7b99czm5g35yhhdks',
                receiverComponent: 'o0ei9cz3yz35xkgxaw70qpodm99exb73q8s9qe0athtio6r5tvvqelq6o7n6qkm83xjnh853kwm64828bbpsyltk65qi7amgwisujunqeuc7ryim55oemxti6mykf4edrp3i99u2om141q3xx2qnzavt310pce1w',
                receiverInterface: 'ms8t2wl12sh8kixpiwjs6zss79yfwm13mn0lowbcr4dkucvunjuluvx5xa1onsoiufe02700wmka6419rnj7uqiot0cmna92qpwc86hp8oiysczrz1e31ddtenixxaacwoqm8jdrnl5ayhw8p170nkq1zaihyl3n',
                receiverInterfaceNamespace: 'az8yn1wwjlvjrbxgwn8ezphb3tnt2bsr9ry2d9zc6ihlxqvmj2jd7nkd094cwjibte0lwbbj9d0z3gli9rekpjdrkpwyns0d3rqu8tpej8a4r5qmyjvrlscw37q413kkp65evwrcmpuz1qfv6suslieshfxq5frq',
                retries: 2242857585,
                size: -9,
                timesFailed: 1510555387,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'anossz6dqwjzzql2opl2jfs7agnx2j5y1imdocoho091m7156y',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'bjfklbf5h47ytugipwuc',
                scenario: 'x5iluminkrx2xoeafk1y6r73f9x619ik23m7htt51kcvi8k8bb2x2vtzhmt1',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:17:58',
                executionMonitoringStartAt: '2020-07-26 23:12:00',
                executionMonitoringEndAt: '2020-07-27 11:57:28',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: '1j7x070r5kuzcqy767d1yrjnvowoen2abfp546bato5k9p4sx5vwjiwzi8kwsszsl8rytttai7cuno2dm0jf9i4dbviwejn5o51btyx08mvv9s7q6eqar2zyqugrwjti4cjvar4cpbhe3zn7zfbiecz5nxg230r0',
                flowComponent: 'zrxqo3oxhtcjbmhynrcerkld3jvrlldkr27xyuxoddh1tbgme5nz6m0bqo9p5d16o51w6jyomxa63jdctwaxg98lhpi0d1nzqfm7c9o2enk09oia5kw55yw72v395a2f5pkke5uqebz4ilrigsojvhular65wfvo',
                flowInterfaceName: '5pzlqf76lpi3yo7po0rhjrdg561rrqfdlvosryea0c6u76qpc89prkox7u8wjge0rm156u7efry1p7w9fht8yvrc6og1nql9bvorj4z8nxc0hslkasxmawvxm6blp9wio1g7lvjv6jxgeysqas566z59dp9ljk3l',
                flowInterfaceNamespace: 'w5kvdrskwg0d5r9niltdilh6edzkteuam6h04v4xu1pv97ppbaccbkwmo7ft682s6xx87s8ai2rvh7x40o68sqr3c02wngfx94gal0q73vdzlsyim12i0cxggflpb5cj6gu6xb94o85a6q930tboq3s3741kfk73',
                status: 'HOLDING',
                detail: 'Rem omnis neque dolor nam. Et iure dicta dolor exercitationem iure non harum corporis accusamus. Et alias quam autem dolorem eum vel nulla. Magni deleniti cupiditate magnam officia earum.',
                example: 'k5argikr5y6yhqg8snddc9bthu6ad9le0eoe4hxdzo3zhhq8sj2d0l3vhm6z1zvcse4bwnr3tl4zu6hhsdbq5tkra5dcmfbf3a4p1la16p00pty648zczyxykg1vdt5bb3q55mrq9pygdj2itpdh48vgb0h36ymi',
                startTimeAt: '2020-07-27 08:19:03',
                direction: 'OUTBOUND',
                errorCategory: 'thkp4mng1astr3iph8cui0jnqxq754s21c4ja2pwhww5plpqlzo0ab0hn77ceowhwbppn3b2eao8v71am7vxn1la8ah9b7mxin111r72pq6x6uvrv2h1ds9uj3x6hnxl27q4ebu3zg8bblwts9egv2n8d1s75fnb',
                errorCode: 't5ca2ascszay6bw8m9of',
                errorLabel: 387769,
                node: 1717115637,
                protocol: 'moc6kehuuuwkrensa9xy',
                qualityOfService: '207ohapxdluwe06fjrtk',
                receiverParty: 'qwshk8ficurtmw6alg5jp1uml639pnet5yopf2tp9fpjovb5jjc1nm1c0ww19y4vxh937t4t6e3bqjk7lik7q8oknc6tdhp34fnw5yth4ksomg4aogjxu3jt1u4wj9ldnfphwj1rk3pwq4wo2327y4xa8i7gx0x0',
                receiverComponent: 'u5vk32q8vxgq1krn0mhbnt6yfq4ybp4lg149wbxgd5d34rk0powqyizhk8rej7leivxen7ifm7chzadp4kupk1eg1b01eej7li8q557q6mw4i2pic1a17q231oixic7pv5xlxawlmr3turw6m0khxt3nodiz6ghn',
                receiverInterface: 'djcf08gp04gcdr4yheclgau36rdqosfpdhxeyptpj7ivuobf2q6n8ejz3z9stdijbpm0c2mjl828ixvjbfd6ddjvqgl4f0xwlclxf3mzn1jhx4ji2wq1eqf9cr8bqqf8sftgxrxfucezmxo7mcwpm2qzq7r1pubd',
                receiverInterfaceNamespace: 'toi2jl29to535fsf07grecvmg0cxz1j5hczzguxckeymenxd86q5boj67ozu2f6dtx943vr6ooycr1v3qu2rlhjngdmb9c9ddxomdq867ak5wgfna84ax5dkpelpaimqt3pevmvckneqm55seay4vj583lllxshb',
                retries: 4323110098,
                size: 4924160995,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'xboulmalj87p70dszhxbcl97jatbtt9y39nulvom1sjbyiw2kv',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '10vv6ww98qxnusqc8q1m',
                scenario: 'qqpsgx588r9flwsxx2x8jhbnxd49on3brc4flevyxdk4yvbuyprmdendh257',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 00:02:41',
                executionMonitoringStartAt: '2020-07-27 02:47:39',
                executionMonitoringEndAt: '2020-07-26 19:41:10',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'odaapzj2th0nv6xn4lgpdkvovxfcen0ge4ye9q3clt20ppjl89kszdmvywb4g5rcx2rn0qgpvejssrmesr0erwc149lbljynv9kqgsb5vt2fdg666w570i886czzd85zqk4ljz44gv498bhp7lneeuk4jrz078l2',
                flowComponent: '3okch9w8zvy34ecxacf0h7d14h4d2y78rvruidd4a7do9me2nw7d9wv4elploq9kih24n07io2tbe6truh8z85w0w2u73c8k2wx4atspv233wx537zvmc28t2xcb64y2bnfivxp1yf4iwghhf479yjzmppdd6rl7',
                flowInterfaceName: '02amkcg6kptjqmd5g5gx9yfv4s5wlkr36d106q0ia1wn2swxnkwlhmpm9cr36dbxiv6cd0wxmuvrq8w4b9ebdma63nw2psf0f4yy8lbbhg2jsfcwpiohad22pgpwpf5ajmuc6xj5e2baz8dbm6b7y1og3g1xi5wc',
                flowInterfaceNamespace: 'o9vl11vrz5k3xw8prfcovbykocnka5zigf33y79gqwququ1sbik15p40j6sssr6lmgk1tb390gmt46sispbv8rxioz6sr1o2izgrdrx52nrxfsiphh47e3mwt5lrz6sul3ans22rnnrcejoezqpnvju0vnpm55j5',
                status: 'TO_BE_DELIVERED',
                detail: 'Et quia error ullam. Omnis delectus dolor dolorem. Qui est vel ut quasi nihil ut enim. Consequatur magni sunt explicabo sint consequuntur aut dolores. Qui et perspiciatis ipsum porro eveniet id cum.',
                example: 'ls85bq8g8cw5g412h63xcpppnhu50xyxde01vvawp18282nsvj8638mftfiy972fh0o5vftdowsnu4hmj3e3h1qeeup8hq1skgnow8hbrgg0xha921k0f9vr1yikpei9j8hz585j9si74d59zu6227gagfmvnlbs',
                startTimeAt: '2020-07-26 20:48:32',
                direction: 'INBOUND',
                errorCategory: 'dbav0l2egxuyjiogvgxs92n0q4gixpf3zds2gnp3g223s734o2az1ni5ohrjsiq1t7pcm6dr8c21fglkyosiyrbfl6poghkhmyj1siyuzmtneglc44hx33c0nejteq3h2pjesut1b16bzes8cnc2julz39f5b0xc',
                errorCode: 't9miv8lnhjpfste75yly',
                errorLabel: 920991,
                node: 3962840965,
                protocol: 'cdq7qg3gy53flrmsp6uy',
                qualityOfService: '2xnc4rwletgqn5mcpt6w',
                receiverParty: 'tubwunyoiqr34jxemx4zm9f88lhs9zu8bqby1sylomc4xup35qvgrgkwvyu8blsv3hmkxva2wz1hr3jge6hmzo4k1y3mne6unixw89ddrjy0c7xhv1m8bm1ezq37ko65bm3wswi1y58a1dv5lwahu5ikwk9gcko8',
                receiverComponent: 'tzkfptu3fe7s0aeyrn4sdygqssbug2io9coqsce4xxjdxm2lw4blq3ftbdsrnuwcctcrm57hrdfpcrlu8bgnd5n2i5coheje45grgkqg3rrali93k1pioxx2jnael2wfi7nk76drdq5ameykm0m8bs8wqa5ficq8',
                receiverInterface: 'gnpd6kewfmz3k602jeo4gwk8pdqlajmk8u43bfqxlicwu3ug0tv5vh76tzxlxqvv6z2cvo9mkc5c47r225bg6o2mhzodt2v66r9sz08gieuqql5erptdg6u6j4lu7p20ksvcyoxgozi7w7c0brau75w01q1yul2g',
                receiverInterfaceNamespace: '8sd55qts9c4ipfz6r7slux4dt9dhgi13nq0vt6gi26qm35qvqrjsywgv6vumebjygowg77wdykw4mzarxfq5dfmtm9oindhn0wcbr8eps7r6nypt4hw6m1vf42jrh1k0rbnnm3oxsrd7ztar5ox31238fbw17se8',
                retries: 2901144971,
                size: 4433619158,
                timesFailed: 1860620356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'uxmtaox4o6uw78ynfi0czqbn45yilsfkwgrb8t662t6nx6pgxv',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'sqgjqsvwg6rtxrrp24kf',
                scenario: '39sxedvvk1wnf35m9x27pflmk6pk09i0x46e7qx8hzizjwg57zsb3xt1sc4s',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:55:45',
                executionMonitoringStartAt: '2020-07-27 07:49:44',
                executionMonitoringEndAt: '2020-07-27 07:38:22',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'z08bnvrm9h7m4f8f0i4bcx7flickqnk623w7ymz5pgwrswwfrallz0sf46nyeady9pqsddg4qdd2t3or33b14n8obsob3q0s0kbw9fw29cfa52iwtebjbmaxytzosss3ojsnm5k0e2t68z9ponxuxjkm069ui8sn',
                flowComponent: 'lf8w4fjfn1r4bv4wgw1fx8zvejca78b4t1vo4rl1uv3yylpvg5av2uumnctrl3pwpxl3y8ttajjsiw9s7vk9vlx30nmji72nwa43uj6nnot8crr0s7awh6kpfzn492w5mm33p2k4nipt0mmvl3h8jaj1er51obrj',
                flowInterfaceName: 'hr0o2x68tvtvw9x9z5gae13pkp30b7pphksv0ik0xg3mrp0wnr1mmhqgg3csaz95fik8d7afpxmt8iyn1lkzk8tymw4i3xe3r8f0tt2l0j8a392inpuh7lifn4zzkra7khji2lrxjv2vnqyzkvsaxjcxbsjk6dw8',
                flowInterfaceNamespace: 'z6qujz7ojhsiwo07jr5hw0ucpr0nuo1ls4r536v4snluaiz06k8tw9eapstx6r2yqft4kg9b0nto5fog6kb4z1ru5o7t5cned45f5ei9q28kwesudbsular3kyxe75x19rnv7z0twu1umccfjgd6ujdbqrst3dvj',
                status: 'XXXX',
                detail: 'Impedit odio aliquid earum. Harum rem accusantium. Voluptatem voluptatum est. Assumenda ducimus perspiciatis neque quis aliquam sunt tenetur eum autem.',
                example: 'hq44xaq5t8kdb1t03jtlsthel56whknfpx0r0lksm0ovcz44ux551n4sk5i4bo87fm38pqoiocrfcbl4woa8hh9nz0vnep38avgwoz74kx7zjgaa8of7pq8krjn4v41iz6msik70l7u4t8riwzqq062rjs1okf5n',
                startTimeAt: '2020-07-27 16:50:30',
                direction: 'INBOUND',
                errorCategory: '0k8pziqofw1ntp85xdxux0tjxjknj9fjroigcq6fskldq51mjpvy48jjmlaxc4tova0cqgahpiyzyzq528ulrdw2xta1r44wlwwbyp2cqtycobm3jf5adpsbk9lfi2forr9h534j84ysncvwt09i7tidmipt5bsc',
                errorCode: 's9rbn976b7itipd9c5d5',
                errorLabel: 216167,
                node: 4581723252,
                protocol: 'isjr8q9jihxaxra6agnb',
                qualityOfService: 'ogz1nneeegfubme3wx1b',
                receiverParty: 'dbk8fvhfp9mwdfqlvs1ntc10mafocrco8xw8mha3ev7dykty6yh1mghl6c83brcse8fnaorqe2ehty9xuylzvq51ivug68suqxm9f5wkwyugu0yo21taxx0qsbu2wx3b99qr56dd448dtpedmbnm10qyps1tp7p0',
                receiverComponent: '3qcmujpb0qj84zsww34bjvgc01zydmu71zshlewpif4ylbkjm13qcwcj3x9sbfx61nf7khfltb295ctrs08aurqg82z2i67gzdxcg3ljlqehatkawb35itd77pv8d2d4chrk2ly7jyl2qqjy229r6tzp8cvukwak',
                receiverInterface: '7tzpyuchrq1jaenirdboctz8te7rr8tul0hut7cg14kn7lgk8xvtknexv5qtn8gkhwirfze9xrudwgb7wfu2lzqutlwtir4emav8gvkuonincivhkg0mprppol0882vmhwgvxl8d15shh9p9zwqma2cfmcp4hvrm',
                receiverInterfaceNamespace: 'gtee7mz0eqwzkjoek6q1dii9d95em1syj12n8oqqo3o78z0v0vpbpawr5cvtr3aj4mgu8y4nvmu3thok3xfikbqjp32txkadn63pd7bwwaxdr6xz83nubw9rf4265r4b5p8nj21xfbitralqxut8e47yt79kuva1',
                retries: 6471530300,
                size: 6405979828,
                timesFailed: 1506469777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'kn51d1het54w7asmfmprk03dbnib8yoh7e4p4zym0yii7swzmv',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'gm30alaiovwfnx4dv82m',
                scenario: 'k8jh5ja8704jtdm23jdd4739eoipph923epv5x9muwyzr37foplcihsftvjd',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:03:00',
                executionMonitoringStartAt: '2020-07-26 22:18:39',
                executionMonitoringEndAt: '2020-07-26 21:44:38',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'yt3wsmkvz0wjqjrc4qwvysz3s5dcuyr7mn2iorzq0mt84wdpzsn5x4aj5p6bhde4n8t9wdhw8kq2ubtoybm246oy4xavy5jycdskj638y5fdbymfpvajqze9hyelkj8hl2ofs2exbfwgeko99y0hf3je46rodlzr',
                flowComponent: 'jb3tre2kk5wc3x1visllnn29grgw2jetouh5p849lftyp7scyzmp8nburcp09yid1wnqi1pi2v3zmg2134j78nsqgt9arisuxkm8py1hv7hnvrpeme9374gjo5i2at5bpfsnzxg447l0eijbzoegpr3biqlpvhsg',
                flowInterfaceName: 'p5ykg6xpbr5a344ldqr55ld0a5qpccdtevj3vphl3hvwyw20hwik27e40lizl44hkyjigojwlhbgegn0kw6jw613c5xjnphmok3arosjb8j4fswh2u7grvtfwgidn2yolvzqhuggt1kcm71r23h93eegezgwh657',
                flowInterfaceNamespace: 'ni2oiv1n0iwa3xhyn4tp18p31xkv4zqam9xburmyw7356gzml4v7ganxrjajxj2coa6r1qyja0a31uf08iuy701ehnbr29h6p73g67bil21p5irjld6kugd4uy3ipw9akmjikmxwan0kbb4upamsq2hgixtsq7d8',
                status: 'SUCCESS',
                detail: 'Et saepe atque. Mollitia sapiente aut consectetur suscipit molestiae. Saepe suscipit et itaque qui nesciunt qui maxime earum facere. Cum omnis ut totam. Illo rerum illo.',
                example: 'woru5tb4s1mxnpx4at34xchk0sdgjbkbzibdsgelpss3n0bf2995npilgc0v5xcx6hg61333xbxqksp1ieyjrx4ny9fgrqh285mp687qe9w5xv9djf97d1rj867ufdpnswfpg7no3wf2neq2se6se58fgwybgtao',
                startTimeAt: '2020-07-27 12:16:31',
                direction: 'XXXX',
                errorCategory: 'sxnrflu7yc3311scec3g4h6zczezv52zh5ieytge6j84wnmxirv994a2neadmayyzl6kbx7s3m2zgt4n85l22ees7d1pebskuoul9ivhbmpjzuoallc25cvfdxyjunp01xtg7piweltt4vqlp23j4eiami9h969r',
                errorCode: 'piqvnemqtoqgsqke7eg1',
                errorLabel: 506725,
                node: 4430514442,
                protocol: 'fj693ijbfld7l7fsky6d',
                qualityOfService: 'fskpoum3tr5g8j63rnjn',
                receiverParty: 'suftkgdkdrd8uqkdojiwkxaqys6oxcqcqhnf9vmms0n9lbqyifx5006clygd6amed31aqolpz2j9timtiox2bxm1pez2aja0fr5s8ne41ffvsauxyq1dt1erxvd8u3sfv1z3bk7d591bhtwrx35130gs1n13faqm',
                receiverComponent: 'bcn0vgfpa2o9h3xk1p2h8acrsf7nighbnxp8vias9l6hhzxa1fg7tokzr92mvzey2srl82uwt54u916kvv7wv455gj9n4nax82gbvr88jy5icxed4ky2odx8iskp72f8wxap1fvdhiwrlfcut13mhjju639r8mez',
                receiverInterface: 'bb4z53a5z7m0od2upwwqokg3rzfvafu0n4p82myszbm5vrgbfolaxduqao8oapy30i6ahd2y1kjsbwn5hvwptgkepwyirjbfiwdcc8h2tl78s04jyb1vxmixx97rvaimelqsj3g8mp435e9hg739g9bow2v71637',
                receiverInterfaceNamespace: '7sehmdnlc2m6gmtruo5v9el5h3v770h5gxey0p0auk0puhh36lndy8902ym2g7f49e9zz7u3sme1mbf7khfs099yh3hqwz9dx63wiyi0wfxxh1itlcq2p7bj2cjs33nt73xkx4mciob2jl84015v03selachbvub',
                retries: 8076152171,
                size: 9262787626,
                timesFailed: 5682658062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '5mcp69z1fhzkeqnv1agd2kk5p6f7fl4scpic4u6cym07n0vt6z',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'nadwyuxgt4iwqkh1ik9a',
                scenario: 'dh819l4leqz290gdwwjobtlbj4hwwsj8m75sovv58y4nbk874twbgqbxml0i',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 04:07:27',
                executionMonitoringEndAt: '2020-07-27 07:47:21',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'c2coljr6je8mxjttk58mgvk34iec3fn2sppvrfraa1orgjs4zif6wmfnf7r8j2e6j9lxjp2w4qec0jtllez6ui55p285vbltlxeonlv222exrkpx1vtlc9jgu49qpimfvut3c0kbp2a9xbiteqbw119vguyw9gv6',
                flowComponent: 'drhyhucjxlho4g56ixo9hrkqszu38wr2evbv45g5zsehdxa6gr4yhsbniz3zk6fl78j99bopg4a3je78rb0ln6w6fmnzs0x6kbdkpp72ms1zdip2me4vzcdwimykti1wthdx3rpoi0c4ltropdvx0fqbw0sqjt0s',
                flowInterfaceName: 'm9lyesxt3i6sdya2tecw9fv3ff50o3doz84bx9jac60j0pkhydxxmz1rj4m1s7nt8ep6d0ds9xn8yrlb8blc5wec6e31zjotx4y1grzyg8cjq3rceesrhvp8071aaqc761ejju6ll2gilekoej8olhtj8q1qmoeo',
                flowInterfaceNamespace: '30plv7ejpcxdrb2ymutsnbw6royjey2qw7empy8d4lhku08e8lz0lfluylr1l53xx9kihnza9g97lulpb946wbfbl1b8y6gqi2zvcn94hqxo4fhdq7rezf8z1npk5d70s0iu1graw4gfyjzopesysqpi44rbxtfy',
                status: 'SUCCESS',
                detail: 'Quasi dicta odio. Quia repellat molestias praesentium dicta corrupti. Quis et vitae soluta doloremque accusamus aut. Neque qui dolore dolores dolores a distinctio delectus.',
                example: '1wk9o35q8vxikb2688g914bqvnyk3bqexp89b0bdicjo9n8i3j24qkop8vc44lw4yhmaup0nuxvq66nopi4we9rd03lubwxehhtouf05fo6a5imugplsep3c9zgnc0k1psbimznzf704yfb4ebsoen5jfqjzaxjb',
                startTimeAt: '2020-07-26 20:52:29',
                direction: 'OUTBOUND',
                errorCategory: 'toz8v4wtpiioxvzar24nb96twtbjm8ddhlvbk52kp8bbv1i3lt5qcbyiv8vmpf2rm5xi75f3kcncr4vn7lmlvmxlh5oatzldrbhqka0737pp93x2z6xxp8joresxei1vrq34q6gdafz1vwqrbp5le1kec0qa1qqo',
                errorCode: 'labh9jk99xerlvo2htr0',
                errorLabel: 279508,
                node: 5580715596,
                protocol: '3odn2347fi5wxqtuff2o',
                qualityOfService: 'xwsb69cb9i3fh3vqrvie',
                receiverParty: '6pdo3m7ciywl78shel3vfxa3kibpzbmvsrpsyrz0iqoahd1dtdrmbu2mhf7qgv1vkvbxol5gc76s9ru951bsxb6qgi75bx779ocon6pcnti3so6k1fy4erxz58ypsuhfmvg8mxvz4l19yagoreg36o4rejdwv1m7',
                receiverComponent: 'b5vsjujpuum7w179gnn8me10w89kvyre8g0dgqmm3spdhic520kxbgc5bikzxtbcjdyznzm348gzui9qzvg4asrkcsy9drplme27mqlwmxk5qibe777gl52gfqlean14jbujjh8j4kjzj7x3cx2w6hi2p2ifz7lm',
                receiverInterface: 'kt8g9k15c9eyrj2v5ehqfzudosem0cpqngwdjvlirwz8lmxgvzymdbmu0wzhfbddbifb7bjtntajpvn1mr2idg3p9ri56tn4q77tyg5r06lwqkl3q9062oyqj2u2fkmw0ed2anm41f4283j5ifupmz3u8zensdbn',
                receiverInterfaceNamespace: 'wtirwjzggd3jmajo8tro9n47ojxfhdx392ogv4jd7t1e4b0ni64qx65yqm78tx5d8jg9g90ydk0g1be42v88mmrh60wex74y9ih0gocghvrw6fjxqv4n1x9tu6qzzbuaipp1hrjscxjg5a8ua7vzagh773f9jjx6',
                retries: 9966580003,
                size: 9238762892,
                timesFailed: 3652195490,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '459730r9jbe5zuh4z8xv5ao31ei5ymqtuk9l8gvpc0zllq2tuv',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '3434mrmeblzaj0b4g2pj',
                scenario: 'owwrtlv8b17czz1ptu7c54ot0xf0txgeg9647qfids7qytxmdy8pcngoe8tb',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:06:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-26 22:11:46',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'd49cfo1j9mnn81h2k0ztcmjpz35uej61nb4lmrtzpzd2somlik9jeb5qf23tfyshns9omfx3kv2dybyv0t1ld9omiw11xswog4n9ytaar063c3j7w2igczfg2ozhrcuwduk9z4mcr4uo48kw9vi6p4qxvp0uy93n',
                flowComponent: 'nov3m62ce13vms4nfc7i2g99x2avfcvxfv2pw8ym6knz2ugkflc0r6hwqk7ds0s8zz9oqvsz4vnyv8vzqlkk9j2aaqivcil042qd0qveiz8e50apkhyqrvk58uw325qsg541f4z7hujz2q79i8pu91a6dv2kqawi',
                flowInterfaceName: 'r7ok2rv9x1xyt7gvn0vd8uilfgaqn0h0840gytkm19ii85u0dby0bflhaiw48c86sxtu3v7rlv20oxi6ez4hwn6sf4efe85mkhxd3b2jl3f45z3jitv7fsqrhqskghnlvb0jm2zk8lpv3cdjc7kuedhymtrzevom',
                flowInterfaceNamespace: 'nzyjjmqr6jvnd3zrqg58a2uvinuefd554ntzfn3oqh70dyzmwabwnvo1etbwan0140021to9k8hv0custno1n9lpzjik6bkeztc07ovgauzlbmgf7bw90nyzjipi0h58j1ra9qw4ohp6ck4nn6f8kl0jjhpiq3n5',
                status: 'WAITING',
                detail: 'Neque alias cumque sit quasi quam sed dolorem consequatur veritatis. Quam quos numquam non. Dignissimos dignissimos est reiciendis voluptate quod iste aspernatur omnis. Voluptas ipsam commodi omnis non est corrupti. Eum velit aut qui error tenetur ea fuga id sequi. Atque tempora et distinctio voluptatum eum est corporis est.',
                example: 'yvjaosuppzwi8chwfd43l7soxg348zfsxtccnigsevlt6036xisfiyx4liukhbgghzvv8gl25wool9lhikptia04wkp908u0rwrlogbedovfpxce7evy4zb7j3ect5bcps9576wbaop1am6v3164k666ll3om5e8',
                startTimeAt: '2020-07-27 07:54:25',
                direction: 'OUTBOUND',
                errorCategory: 'r34rm3t63r8p4gp12we7p62ljf8i0j20v33r5u33lcjpokl5cxjpw9ciqjp33quucomzv8ala3q3v4060fjmn3tdjqv9pgabutdvymcr2wuvgpsgesbwmak1mck0z6p28rot5d5nqlnhcw8fhrjne3r3udddauj3',
                errorCode: '5n6pzbt62sv6s9hl8ra0',
                errorLabel: 940377,
                node: 2949152224,
                protocol: '6q42ap0cftq6derc7fiw',
                qualityOfService: 'hmde768380g4dmpjhox8',
                receiverParty: '9pj0687apd1vdd733ui5c0n4qipsrv4kqopvzy2o1313f7gy3qkdxslkyk2ega7h67c9enapy1c5250v49gha7tad8mjvyx2g0tt55r0u86btcwrufdkowvt8inwfrs590pes2emo3z1yg1yptwagqoj52mwujxk',
                receiverComponent: 'ca3c74h9rdj5jb7jjhmvgjjvfh03jbq2sytewgimhfqxc3mhr3s1qxa36zpliu89ag0eepuqg0g3uvzyuhpx08r4dmy0jurrol6qe3gfuj060qckpx3azklgs9yjvbsqsd2ruvlm5af2p0xwnw8cnnmctaieqkv1',
                receiverInterface: 'tuy9ba2h1phl17c1ukupgpa5ogkz8cjls2ci1odt78yyho7gd75ias2yb7v8t4ih13gkihagfxaaavyl1gkvlgpnnl5nxpmxmqw55zp5dreb23u8eiwvtidaw25juhtrp31ugoicyyaja3oehj87pls7nv03ttgz',
                receiverInterfaceNamespace: '1u8ip4b8luklzph8scggdt7aaw6g0xw9xg53r5ro3il75ey38vcuw3a2aih9xqievo3nlpmf76iy7fqqoy5oqavgxhkf1gz3ddlnj9o4f6yoqt2yvlts88f4vrb0o6guuhslzqwnvc1ov648431gk65vl2kn38pg',
                retries: 9435649508,
                size: 8164725384,
                timesFailed: 8000329373,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: '7d3ze9a6bz7qk06dwxmzgskj33auks0k79uo36auanlpgr51ue',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'ycoin1ow7guyp5rxb1l2',
                scenario: '8ncms4cnffpqjc1obbhfqadwjzihp03falfhoezm8bf1zp0wp6u4huv8xmas',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:21:08',
                executionMonitoringStartAt: '2020-07-27 13:48:59',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'aeqtkwrq9wxte2mv7m8dfshnsmctny0g74gnrhpwf64t9i3pntncnw570cu5otrq5mt67rzlfxc4rlvof9nf812whuym3uennan4cqp25ofmdnveopgs1l59y8kry5costi1257ihuk2fk9t2rxew0psmatd5n1i',
                flowComponent: 'qb9hvw56is6t62exain5yc6mwkb25epol29a1pzt2j9bp7nq16ms5yd03qhzwdcvvbxzgc55zn6pracotbkk1b7o2sxabmufbc3j09m7tjxlpurl83df9voiszlhqrd6t6kizcfb5ca7qj4o3xwdj8rtjm1wm1y4',
                flowInterfaceName: 'i8uh89ecww156r1bvvl1woza59qgrftohm4azrojvecee5nmvxnykl449z5keclx1s1ejr9klvqx5ebxcrnedscowkgtviahr91x17pll4vo9mcmjsrtd95jugec22i2qvo5h9vv0vpwoeiuuxqujbn44q69faal',
                flowInterfaceNamespace: 'm3dm0l49h5olk4mm8o1pw9ggr4nfawr02y16u5odsgayqkgx4u9ar148pu1rpn0h0sv2o9qud3op07328tsqhqz33yqy0cahsk28i7r76eezq58kqzu246uk910rppexzzi4ux9p0cyxqx20nwbf4iwvfv78qcx2',
                status: 'SUCCESS',
                detail: 'Rerum omnis aut doloribus earum libero voluptas veritatis quam perferendis. Quo magni illo fugiat accusamus non nihil. Molestiae dicta voluptas saepe molestias nisi iusto fugit. Itaque qui fugit vel omnis qui id voluptas ipsam. Temporibus facere qui ullam aut est eum eligendi sit. Molestiae autem fuga.',
                example: 'cks3n8bikgb4zc0myth59togvma25xbm2rg9rxy098f92t9jkiwcbkwuy1oeg6dtxjwngcaeqpzig3tu8lt9g74kaospcf4cb21v4riwkgmt94hyf1p2kklzghu2u6vbsrh9hpsb4ivkpre7nsdzadeq05zt1c9d',
                startTimeAt: '2020-07-26 22:47:32',
                direction: 'OUTBOUND',
                errorCategory: 'je3tis11bx4cv6xvcyocxu8w35ttv2qgmn8ltaamcb72zd3lrmm5whp4m4sryec09bwzjuctu0qvskgj5w2gk7ust2of3w4isttwkhm511f8ilajfqwsl51qm0vpq3cyuq6c1stsn6t1g1vu2ol6pyi7o9sf4d86',
                errorCode: '1sbiby5h1yughhbqybj2',
                errorLabel: 233999,
                node: 3339987690,
                protocol: 'sm2uy22ef0quqegd61ry',
                qualityOfService: 'hbi33u2fpywl1o55v8pu',
                receiverParty: '2rgtsjql1h0fl107h2p0e2ik6nwbhpvjm37psm7tru6rgqqqr3vt2jbiqi6a1j2o3tk0vdbqnbnyf4mm86x5wpd38im8fkb0yog5yuma4aoytk0l56yogjxdiezn2v19m9s6kobev8p7mfs0ki2jr3htrar2sdsf',
                receiverComponent: 'gsph8v40vuirp3p2buzwummh8qqf17gbfccq9kct7hfdtbyq97qqa1wl7ykqfoee1t6n7aq3vdzsvoddxifhyuparwz6aueymmzg0ghg4pf37ybteew7lkxtdb6wldkw5vxsomsn63ssu12mnhukgefkfcwht8ks',
                receiverInterface: '78skcoia30foqah3yrnuszd1oqoxasrq00yxjft2a9dp0edft0nulbfnlv97t1ov5wsbgi9ximb8pqf5ocl6h3gyird6c867lo8h7ec8ks57vklr6qgm6ed0cenbag03ojoxlq9c1e4j0h0xpbvsb5na26p3amnh',
                receiverInterfaceNamespace: 'csctm2drzkq2qm7dhmuvtu43qdfx3l7nmjdd3ormgdvssr8nenypih6pywxsz14glris262ni0ed15g3d0yruv9m2vtc71ign61cvd2v7ndgf3jes8t6m9i3dvvzsms6o2ajs3lfalrrhdf1hv20uglq00xmtn7p',
                retries: 5283882740,
                size: 8519653366,
                timesFailed: 8354012536,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'kbjyj1lwcvme2sqpzr5zu0tyc1jl770kebrams79paoszojwzc',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'ot1kug32zoo4lcm0pilw',
                scenario: 'cvj3o3ag8zq3hl8bzyvjt7nivuf1jh0ixbliabzwpohc1bdkxoxt0tsl4vf2',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:47:42',
                executionMonitoringStartAt: '2020-07-27 15:39:15',
                executionMonitoringEndAt: '2020-07-27 08:52:37',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'zwjk7v78srt8muogpis9pwfnyz9axf7kzzc55wa3l4e87pp0l1wrz4h1b3l43trp7gxfs0pgcapr1lqjjpz6je224958gfy2rsm1l6samogivlq11ysoafc1q876gcvbtkaqi7ywa5gjhss3lhpu3jezpqdv658h',
                flowComponent: 'vc8k2ut8klili5u0dmci1x5p4x50af61f8zjb670bwjhl7ebnhflbvjdu4aydhs9jq84ez9icfhj4h48o2sbfht55gw3okhnt0v2bsf5dr3slesz3aos7zz7c14m129qnmetzu8r4zg5ji0nl2h69kehrdm5b253',
                flowInterfaceName: 's4mvihkl4nkygfvcwz8n1btw2g6ltfd6vbwtrpuavmtsnx2weeh95tcuh1mff9l3pe556tddaz41t5scgjvc54h6f1ndyvaeorhurvspze1uw631gvyyjuj4vwko4bxen258f59chjicay4ggj8zhp7n2hzbmf2p',
                flowInterfaceNamespace: 'tc9tz53fhjlm7alj0yg5h2bqvb4p5xb5bxak24qrwpsigxhrlinux8dmxddjflm44r7hlfut6cm7hpbr7nhvc0ocyhon4gqx3w6rtgdg3eybak1x5a9ewh4hyi0lfnrnql9v3gt5xscwypoiaim745mg9gwdx392',
                status: 'ERROR',
                detail: 'Qui recusandae suscipit voluptatem magnam laboriosam suscipit. Omnis necessitatibus ipsa eveniet a veritatis molestias expedita aliquam esse. Ea distinctio voluptatem explicabo excepturi in beatae vitae.',
                example: '2z44vu2bjbvh9j3ekz26g3pztmh67v4gumg5s6tw6co8xxdqukn1g5bzoampfqvbb4p1813gtgez8alwzdrrj6ukgpg4umajopu2bn6niwjki3r659bwa55vija7w6twwqhbrffwcj4tq0nlouszlhcfue8xdhaa',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: '5pmoq8spaaeoson2v2ozms4f9c01uftlnvxt6f0ccrist6bt7vj6o11igo6mpv3dpw1rbz3cnilk19ach0kw13pmq02p1pgtntym395gluxfprmysus9yljd44adf9adbi7xl3joz5dcauhuc8z0k5c0gt76meup',
                errorCode: 'kl3zjs3d4jnpx4u1hidv',
                errorLabel: 735507,
                node: 2141804996,
                protocol: 'kbub5wsos0qq7utwx6nv',
                qualityOfService: 'q8v86o91e2r7y5o4o7b9',
                receiverParty: '63pqhq9kht39sop5pchidzhu8xmpgy69s2qgg4nhdkooi2etsv3c7k5r8hjh13vqxblov57z6sraufog9i35abuz9aurrhlk167eue7w4i6vdzytz7u0xled7r4ufe84kskxdnbk5zibuxv3w4aqaq8197ijup2b',
                receiverComponent: 'ybdejas1mkp49wkrnc08tc6s57siyjf5y9zxyzk3gzjut698m8a1gi9d5ho2v539mv25rm5heismbw9nelirm1pnu4ulj7wrjvzvhtytxcxtymxv56n3n80ef63z8v3162bfxskwtjf5wn0hq89odt9nozvzz8j4',
                receiverInterface: 'inp8g3dii7kybmld4102cjlnwb2uagbjih0vsfcduynanwxia7e2jaousntm98varbv395g8qee91tur0lcocy66muskl39g1sm816y4342nzfwn56bteqw4mzerwksktkkfgoxtjong2aqbk4nw0224i03iz88v',
                receiverInterfaceNamespace: '7kcauwya6kzxqm5lu0v13yyfinofovjyvr9n91ywm8sh4qb1z1y6d2788kk84su1y09epary6kutb1ycy9r1tg2nporola7gt3dbbufgf9v958ffnvzi9ikkbkdac8jqqc13w9b2qwhdfvgrxltf3po6faoq21lo',
                retries: 1717502180,
                size: 7950614153,
                timesFailed: 5807841793,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'z712246rtcan27wtj1gxyzsd6vxor9yl66dvqgosfw8jkboznz',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: '02my75xj9l1ckele4s7z',
                scenario: 's63nhdr13w0ln5enwuvo0frtemjfx5p9icxskr4u8sxut3eujz9wtsu72m2j',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:51:31',
                executionMonitoringStartAt: '2020-07-27 10:30:41',
                executionMonitoringEndAt: '2020-07-27 04:02:18',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'd8qcktvb6tp312ejlhx8kupus32ntib3q207o3e1t6buefn6lc5btq6ioqszio6hluqijo0v7524lfcta9775fc9imr5q2pzk7r9q3w4kqpoqjyd1unl3x3yt7ddsp4fhvlfj2znsafn9vtdmx82ybovp46n751u',
                flowComponent: 'rqy1x59muh8r94w18fabp6smqj51uzvwelg16yx5t8nbdkm7bh34f7cvfwovbmu4meeha2b1thcdyg1wm2fpe5j9bjvdae8ao1z0nf4sgk1f27qpbe9w3bnaq01u61q0hljfbxgg3blv5h456jzz6govxgs5jhlj',
                flowInterfaceName: 'ryb3taiwvw6zouv1kp21ezlfvidlcyvfkaznk1maruwrczm1nvqjqdpjriy3janhoqtgkketwefpoxcx9q6e6cwel0gdj8nol50znpjatl0xsi1c6it40uahxqpr04wmj66k3rnjjs1jrtezycdi3l2mhfvr8qnj',
                flowInterfaceNamespace: 'y195qg6wobm9w9snbiizfqshziq9yylnjhdtm544f1y67fga348o53rvkcl6hd6zdtoi3txri36utxyl0t48u0lvaqdv1fgw1xn0nd9eo21kdmpj5xueowknzp6euto17u8erjw8p90m548hw0112cqb92c013k7',
                status: 'ERROR',
                detail: 'Ipsam vero dolorum. Et deserunt molestiae possimus ut et iusto earum a ut. Et aut eligendi asperiores voluptatem est illum quidem voluptas ut. Expedita molestiae ipsum nam expedita dolorem. Consequatur rerum eum ea eligendi sapiente fuga.',
                example: 'xh1jcsjuklz2t4wtbuyy2jt5qf6vq5iv1ddsc4pcus80uvxd1umt9kb9315zv5jdfbdxli82hfy88qvpf749u7q9m7t3bn11dj1nq467w8oc47jo11to2zn4tb0iqokcaw396k0kmay477510w36kw7mws2khko7',
                startTimeAt: '2020-07-27 14:35:11',
                direction: 'OUTBOUND',
                errorCategory: 'xc8jkajnbli5oiw4i4y57druy1chq2cgf537gs6t7o9jv0evq9sho1uwgpr5208jp0hx2l352jpp3ipd2t3ndxybumzgq0drufgv178gy5bcvyhj94drfcfntu8q5r39vnlsp0wj5sahwei5xiojtphcprqf0t2w',
                errorCode: 'z0dqvysk9czpqnfume6i',
                errorLabel: 851609,
                node: 3833489143,
                protocol: 'poviwrahe7511qfa8xzx',
                qualityOfService: '2fwzecfhzgaf8o3q4ey3',
                receiverParty: 'os4a594vj966wpbux6idkah2mlnrhkxx00rh043eoj5jdti6inlqynzp5ljfetp2tuewgqb07y6jfsm3o5ov9y49s84pqloxabryoc0txchlub9u6um75nkllo1ke6v84eqgjzd1b6glc6t5yzpar2vbgh79we3w',
                receiverComponent: '4onru1fzs9s0gib5hexkw36yqu1njk8sjmhnht1b6j7fjc5rrxblwvw6ure5rf31cjz8h3n4j7c2uofn7pe66t7tc1gn9tk1fk21zcz9ixlpjzinuwo2gtj0vmlsbf3eyu8i7uoyuid6kagc57w9xkxvp17jfkgo',
                receiverInterface: 'crx10qaafaovk73t9qa3yvqku9k3r1j7uqx3umb1417dnm6vtujx30zh82na7rs2xf3fxc8zc8guh6gqnpzt2m7fllju60wjfc20efd2k41to1ehddtxxavy1u90u54dxm6hgitlyz1n3l5l2ei1mjfa6ut1yf0v',
                receiverInterfaceNamespace: 'sofwifu8r8cwvj7f1r50ady9mfl5jtvjxutqgjjslxrc04wgdol04an9fmdtwoisp0rxwbfn6zwdv5y86tuklw60qx7z96zlh53un180sv30uc3ihgly8nnwhy6sexid30v3pi0jo13qkat1wrhd4wmj9u7zpmp6',
                retries: 8755457539,
                size: 9266664102,
                timesFailed: 4946731392,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'bf064a56-7ef7-49de-bab0-317061aa44d6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bf064a56-7ef7-49de-bab0-317061aa44d6'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/bf064a56-7ef7-49de-bab0-317061aa44d6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf064a56-7ef7-49de-bab0-317061aa44d6'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fcb0d719-85ec-4550-bc32-7b789e26a0cc',
                tenantId: '441dde14-0e70-4fa9-a199-57022f8b5834',
                tenantCode: '0pm2fccup07cl5b3lw9uj88btwpgzd5qc95l2w7pkhmo99i0qh',
                systemId: '6091aca8-955a-4a55-a352-3fcdbe3b4fe4',
                systemName: 'zr3akdvkqsrlz6anhy20',
                scenario: 'turmc3cyvcxiyuifqoeb20cm9qb6czmforhkcro26lc1m36jrbtcbyrpbq92',
                executionId: '24ff6586-2f60-4ae0-aba0-e4a940640168',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:06:23',
                executionMonitoringStartAt: '2020-07-27 12:52:07',
                executionMonitoringEndAt: '2020-07-26 22:15:30',
                flowId: '5650701c-b1b0-47b1-96ee-48586bf233cc',
                flowParty: 'd92obwkgbldvl5n0fdltv51h1sa0949alwcygbk56uy5rp0hyi605eq6yvfynsp772a1zouk5ttzhbvd0xewhvcw5g1h16nbl308roru44d61qb9lx9dvy11p7dnott308v5wi0835r3orvjeomz78rg73gci0xf',
                flowComponent: 'ai5upmuw01cv1862ik4zdc0obpajuy39hunz8d7gzy73xpdmj94wz9a897ysc648d55xbbxo10mmwyj0fhwsvmj7sl1jfrxomcnkdgj4tv0q5m0ck5krwessf3e9e52pq2fn8jrbst296bnhk34hxwiab6mgaxmc',
                flowInterfaceName: 'ap3bx8e4kgi0ut9dyrq137usfhbtr2bv4864pxn3xzxlnrfyuj7y5l3y66hfnqtllp1ps5ejxfzn4hvnctew1zquf4hoetbse2ozkqhj921m7ffi35hbozvztcutta27i8l6kr8g4eg8k2e017sbxgim7xl168it',
                flowInterfaceNamespace: '9r16wzvjnzoy79bzvyi81f1nx55fz5jm4gimbdnqiqh1lezhjy7awwf83w0g7i9sa2c9cwixvnnn6f1hkmars8c1r4lr9e14o782siekqj4a6zv56t7906uuqdymku28g54939ofsl5tgpqmh2yw1d9blmclyvj2',
                status: 'ERROR',
                detail: 'Provident vel sapiente autem et sequi. Assumenda et voluptas velit omnis quod repellendus vero pariatur ratione. Fugit excepturi quis et voluptas magni repellat qui. Nobis non sequi ipsam et omnis odit rem maiores. Debitis vel non saepe. Et tempora ullam recusandae commodi est sunt quod pariatur.',
                example: '7uwcdd9fn4z3xic361lnjofg1zqimgaubojan3x1cmeur9bnjtcwch04gckuhztanqx95rt1bb2u9q6yasxdkp3axxzeuam4wgjx5l8eun6mssa1vycax9nw9a8i881f9ghoa0tk1lxgl43dh3qusvlfc19jo2hf',
                startTimeAt: '2020-07-27 02:45:56',
                direction: 'OUTBOUND',
                errorCategory: 'vuv7kq7tr6jjccx75sqrwpmxp1eetsm8omwj1a2ufk49vrj26f9lp6z76mdsbhhn0hhnmywsl2hpjej41ye6ba724um8zmiv0yk6n1iqhrhs0liq5m0tt5ja2ct30ylnksm9jovkppcjhkdgui9jfzhkvtub1qp1',
                errorCode: '1twllbbwnfo73qzsifsv',
                errorLabel: 600049,
                node: 3557456568,
                protocol: '8ig1cq4ke9ff67bpwfm0',
                qualityOfService: 'vr6l1g8klwkvnydnksd9',
                receiverParty: 'zmmcnouehc7x4yiparvoms1xp2tnxc5unozw4dr0ltac87ksvnbr9dypw95ifk4pmazz3gc3o1vx3g4b5rlqmyrg377ckrkkcug169x75qknm1aosheytitutldra1a75rsmq6shytrdeo3e5bgi3mntlrwv8bvh',
                receiverComponent: 'jqwjdbilbckq4x28c3p5zr6uvm7hik3w4g82u2yc467x35k57kqi37yhtu6mn7vntth7j0vmbohokxddhy309cj5im1doa5haar4jis2bj6we02d7r9r1oicm29auzq9mpig99smdxp86m8ti62y1iu6mtpbxl69',
                receiverInterface: '352eogvy36yib6pwig5sacwhwnzrybdb23kylfuxctlywqxw1li7rdqhtzl8c29p33lb7loq5xjxdfljlsdff7rk0jobuqq1c2za3g95vp3wtzb39u50be9rowhd6feeehbtv6p1j2g4zbtod3kbgw1th3182l1n',
                receiverInterfaceNamespace: 'g599qbfxztod29mj2d2na2vnnnwishkibr76znah6x1ppfqyxxbhbyhai06i17wa4ciumrhu5ir28y95z1vztaby2lluqqptflfah9ps2pkwayicnrj7ic6049e2vl1w4jlabexpbmg3ws3guft4pi9a59tpadsb',
                retries: 6443325787,
                size: 6994208723,
                timesFailed: 2217401107,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                tenantCode: 'tjysgbk6mkexh94dihbgpkubkhozu8nmgio7geznwwn9v8bpdd',
                systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                systemName: 'ixe6qpzi6e5qq0wdfx5e',
                scenario: 'p7hi2rwz224dh27lgwchpwsiby61ka3e57ks837bj50029mo5rpjq9v2stk7',
                executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:34:46',
                executionMonitoringStartAt: '2020-07-27 00:31:38',
                executionMonitoringEndAt: '2020-07-27 09:49:20',
                flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                flowParty: 'dp2o9wic8wm0vjzw6mlilmdikhk1sj69ifm4gk9wahygw8jobj6o3xp7ww6eiku5wmwyesbqr6bed5w7f5zmu76vunm6g6jfk4952c9ke960mixa72xftw6nejl2ow7wfro4ozc7seulyezsqem8y929oizx3d6o',
                flowComponent: '6dh7wwi8kdb6s28adz3529sjaph7lo3qvsqla2vle1um4jfy01z7lh9yuxuuv9etqiy9emxxhp7jk1li77st27w8c5rmyz451sgz7nq0kxd1nb92ttzr4pocawhjkxpqpuxjkr6q9vcnmruhveayr12y8qvlbovq',
                flowInterfaceName: 'xeabaovma52v0or8xx4jv2k3cg3ltyf3cy6x4v97s8gl2w48kkwe42ckzu93kfeyp9sv6y126vum6qab53ekho74z9zq9pi61sho91u5e7zfvxrpbx09irq6qjf8wsqoublb3l36nijo7f0f75sv3jxzbenrzyg7',
                flowInterfaceNamespace: '8wvzv9y2gxo33thpdaknnbjhecm97718q2cz45tyrqp5aq5o4v6d187mzmucfpncei4wwvficm1d24hkxn19zk4omj6c78dn53awakn715uyxqx7ah94g7cktt3v0uumbdpj8qe9755vhryichi45146zra9hzst',
                status: 'ERROR',
                detail: 'Recusandae dignissimos dolorem. Fugit nostrum dignissimos autem nisi odio earum consequatur consequatur quas. Consectetur nihil inventore sunt minus quos nobis id. Voluptate quisquam nobis minima sed nisi amet animi harum.',
                example: '5qx7c1j27m20osqwfptrcjkqjm010wfoiu0wkdnql1dujs0r39e1evrkaknr0bxjpdxku2ufz3akhhfdr38cbs4tpg902nbtfyaxout9sgr873dv1s2x41gebb6rl37jp1fn94swkpoyr6thzn8gr1vyo3nk9cgv',
                startTimeAt: '2020-07-26 23:06:03',
                direction: 'OUTBOUND',
                errorCategory: 'kk3b5rj36vmbbj8rtezu2p4qhjzn9d9a4rl5n8wvs22dex4t6mgmmy5idjw9oovy3636ft1zbu0jttzch9zyficvl71natbtmnm2mmkuiwkl1li5msgwtybp4w3mbgc49dpc8dcuetz108rq79h7u9r4jcn8x8xt',
                errorCode: 'ounv53j7bbo53st92fxb',
                errorLabel: 674026,
                node: 2645183976,
                protocol: 'vs5xmm5ag7pi6ugrg924',
                qualityOfService: 'wxulwvj97nviqpu2rt5c',
                receiverParty: 'n7fdm3mzqd1h800pel11zf57fwk1jicrn0x18e6q9i3bf4w52pjsns63zkvia5hxjnb3umqgoqmchzpt00c6wqikg4wl0kfhym9v9n32bgf4yepn8utjav7wp8fz39n5y40q79hi3kqw4kz0cuda1be6ldist8bs',
                receiverComponent: 'zkh1c5v1gz4atyngspq082zo1nkg0hlxufvzeex9dxa9wlcagynzt8ejfrv802wfow4c3ts56i7wvbnks1n8twudpa2mu8w0sotk7c3coaidmkldkfuvtyu90hxaeo1ura9ocoewe61qzfm2mp46vnfkrr90cgll',
                receiverInterface: '2y8s82k8x7np677yidr42whbrtw4xg1khmevtxvtsnkf26duefs256sm7ssb6zs7t19s6j9znqugz5k6z0m01qy7vb64u3l9u3e7zgzwlfog3w1xtu3sztip3nci3sm96ven2aijnco1uqq1vwnughdal43c7603',
                receiverInterfaceNamespace: 'rhxicpeov0f2me4sihlimeorphv1erv4xo1hpx3z4ws2n3l27cwbjx50wql4tl62xqxtrtfc1vifc14yjd6ugvwdjftks41zsqec0ct78zqvux8jgy370kuofcx01npb5nm4ppv2u8iin0fl1zvgnrzorv9v55i0',
                retries: 8646108148,
                size: 7492281887,
                timesFailed: 3667001065,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bf064a56-7ef7-49de-bab0-317061aa44d6'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/bf064a56-7ef7-49de-bab0-317061aa44d6')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cd6bbc98-c562-4930-9055-03b1752cbac4',
                        tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                        tenantCode: 'bgxuvojqb5hfh2dgv9l9cm4j7krz99s974yxxicmgcq432vt76',
                        systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                        systemName: 'lvtok9dv4z6wubjt4hyw',
                        scenario: 'tif9pkuee1fwsttsdb8az06u8g6maeovsowx5xgf2zq6lj2h5j3a2onda165',
                        executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 15:52:14',
                        executionMonitoringStartAt: '2020-07-27 13:59:20',
                        executionMonitoringEndAt: '2020-07-27 05:06:24',
                        flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                        flowParty: '2o0uohuj8984tuzl4hrhyomd7q1pkuk1hv4cmwt8ffvlss0fw4xoomkxp8lmb86f7bz1hrfwpc9oowjoaph5vdglb5hk976faib3jmvjax3l57lsbvc9devfed73po1m63oz9dd6n099ty9a2u9iwuwmt2x3cit0',
                        flowComponent: '1ee4n41xm80w94h5fbsj43e939o5wnyw659jgi3pczi4utl9tz4d14ipa154lk0g3dbschoxnc9ljykqtwvl6j3ez736sz12ic4zs1x0w8sq0zj160flrei1zub81twvhlurmdsui3uvkznzboh6589l0unsh3ny',
                        flowInterfaceName: 'hwvrtyh5qek83pxi4be2qehq79hp7i4zlan7zhz5x2dn0fjtiqrkac5d8nipdpgl1j26rphngvgxcy81j17gte5snlpojrix8jibu8fwt36cjdjdaqid2897cbzx8lswh9yucwkv3fkpxjfw3b9odcb20pimoui8',
                        flowInterfaceNamespace: '5a4fl59101uwilimn31cu457bpn04nzohbxv3qu5vet65vgj4o7x5cmqfdr3n46g0kd7kojww02v99bmsnmgtnmy3k40k3ekbjexjfi9apopz6de2vjaoauw812197tkyozwq89rs4i85bw8ukul3kswzaly3cxh',
                        status: 'WAITING',
                        detail: 'Incidunt sit quis eaque praesentium quibusdam odit sed et. Voluptatem dolor repellendus iste odit. Beatae sit maxime nemo porro est architecto at debitis. Voluptatem magnam perferendis tempora error molestiae iusto facere et amet.',
                        example: 'np2w8bcjuijedd0mmjm5z6be22n2dcsqnkwmd9bc6flwrhfp419u32q151po25wn4kv2wzuxds85heq065wx6k8wpfpeogoiwdyo8e6fv3wktrijxm53udavei90e2q4jf06v8v14lzrre1wirpyb0krkh95vosb',
                        startTimeAt: '2020-07-27 00:36:10',
                        direction: 'OUTBOUND',
                        errorCategory: 't3zfvqvneaxrq3216n7x4yax7t9uo40pxjtlvbvszz8sifa79mku85bqrcnqq8nhu8m0yl1i2sqd7oktgoa2m8giqo25i4idfr2fbmjtns1edtmgl74rdx25hhitlidsky7guf91fsngc3dmowrl10ij6pvsdpa4',
                        errorCode: 'a99n2gq5k6xsuuok7abh',
                        errorLabel: 842120,
                        node: 3807561630,
                        protocol: '4p508m4b3706zkv5r4c3',
                        qualityOfService: 'ruumium5qc8li3b2s6mb',
                        receiverParty: '8xhqokf3lfnoaxw1442xh5elt1spih58rdjaxorz40kwl56iwj224chdsn7k6km1agmanamx49gwp84qw96dfv8hucuicrzmgve66kz1rghc8s19jfq47voj1k3ubyqwh4v8by63qv1gc7rfmqdu6o61rucwuyor',
                        receiverComponent: 'yj708yp21ovr5qe9cz1qx0mj500hgh4vbtxo6t2z7u0s5ii2o4c9swq1dlif3d6uvzd2cwg9mvkzxb82lfjv29xvhr6ufq3iofjg829hys03e0doj5l4mqionjma2mhwe3soh3amc7ti3natzjvc0s3hps2zjtym',
                        receiverInterface: 'cc30xywqsay2avrk7ml5pt0exvp065cxr95k60hdwbizie3zvmoq3u0gbfy5rodz0mikxeieisrkzy7ngyj5hkn2dalfco9sfk99gysbiqqcv4k5q1kahzolotr033lxqodu05q9alncqk0pxwpm75l3p6fuz026',
                        receiverInterfaceNamespace: 'k14lqv5z8thec7r5c4xbwbw9b0scujji7sxedlwy7eqn8x552mpp1ra9hz6tkmjfpnit2vm864v9ewb8vjxv3ixfuqkopcx7dn82jsho0ntx5g4yqoxgo7dit9rwcx3hm953wd3dkesyf1xw9erzd50s25prcvjs',
                        retries: 3436476665,
                        size: 8193313117,
                        timesFailed: 1134586316,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'cd6bbc98-c562-4930-9055-03b1752cbac4');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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
                            value   : 'bf064a56-7ef7-49de-bab0-317061aa44d6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('bf064a56-7ef7-49de-bab0-317061aa44d6');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bf064a56-7ef7-49de-bab0-317061aa44d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('bf064a56-7ef7-49de-bab0-317061aa44d6');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f1c903f6-95ef-434c-8ae5-229ba11abd95',
                        tenantId: '91ce7072-3361-407c-aac2-6b3b433bff89',
                        tenantCode: 'lsl0eqv0iu36pn5ol405n49d2c38zdzchd14h0hmc7z48pd73k',
                        systemId: '154ad340-744d-4949-8d82-84014527071b',
                        systemName: 'pgp0v0gqw3zl4sf9cgwk',
                        scenario: '0ar482e24aur0h470qjqrk4w562ul9cvlw1d198cw3cg899zh63rxm5dq5wy',
                        executionId: '571dcc58-6767-4f18-abac-0bbba3bc7b19',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 23:25:52',
                        executionMonitoringStartAt: '2020-07-27 18:22:23',
                        executionMonitoringEndAt: '2020-07-26 19:52:59',
                        flowId: 'cec1d633-b4c0-4a83-9f97-2f696e0a419d',
                        flowParty: 'u9yki7a844ci8521hub2hs6jgtj20qwu92xqsns6xj2opxww2rg7gefaid6w6czd0nyj3kvd2ayh4h4czvfugegdy2ihojgzd6rg804oiqy185gys8wz259ohvd83bd788m32bq1wqufjb2a0y50oo0ea3oc62v7',
                        flowComponent: 'f95zsthbr1lhm3xbwd1rvzt90jsmwz0j0ixfeldfw2d1lvp4uzeqzhw3dpedrfolil5b29kbt2rp8m9uhm0jdifngm0tiu0r6bgewmjzimqsuqoz7s32vxcgm0wo469dy9oba9lf66emmg6wa2qyxwvafxaz3bzf',
                        flowInterfaceName: 'uy1z9bnrp8casnbykut839sysrk5wxrt9e62jzxvjql2v830lq1qg8oq4kxit1mmdkx0whapmtsu0rm85jujz0fx7ngh6pz3k25s2fdi4zozkkvsifci24xm2rbu15gn6w8xebzntts9csdfscyo6rt7t64he251',
                        flowInterfaceNamespace: '26iirtdnx8u1rxa23jtnxktuiyc9843tv9hswfzgzb77g9qq7hoqsbzbwd1evebyzoheu0ai1mj7o6sgnd6i1on8o57wbmqpcit2d6nzjmofpbmv0sqb0tb7ce6gml3dxd46o2kxfr0cyk2ellexjdonwrkprg43',
                        status: 'CANCELLED',
                        detail: 'Rem repellendus laudantium aliquid quis qui. Et maiores praesentium repellat quia non repellendus quos veniam. Aut unde odio. Minima et beatae quam consequatur. Qui numquam eligendi voluptatum ea rerum voluptate molestias voluptatum.',
                        example: '5w6vwnp43akb1v868u8l1j72x0tro1lkxqapeyculrflo7n24gj3nvkvw3p1o0uqsntlc1takm3pf2sd4k7ffgou9baclo6g2p8fxvkmqe5w7q9mtuwzu8n2mlogapjac48yoy1azqyvsi09nlg7m9x3z21229u6',
                        startTimeAt: '2020-07-27 08:45:25',
                        direction: 'OUTBOUND',
                        errorCategory: 'we9g6n1pc90gqyxpyhic0eslkt272u7rpcxq1ospd6b5zhph2to9vyhognvkgbqyitc2nihmx90ephf2inqm9frlioss51wfxsnyx1cjvvgdtfpplk5j3aiym3bw3yporq94li33ip9i99xfdkeavqz3oairjod5',
                        errorCode: '5xt21hsbgtlm7mlx2tjm',
                        errorLabel: 384826,
                        node: 2504883429,
                        protocol: '5rl5ooem2g2vitxqtj15',
                        qualityOfService: 's9qdaevi799b6sgebkfq',
                        receiverParty: 'wo3daytm9lpbjcyd490lxvzca4skkqx6551os45ru2e2mcquteiee42siboyvfd2drn4eoqzbdrzbdmu530lyh441a9blqws07rl9pnzvotq5jkpoiv5oph7r3vsv450hpdsjmh5bjasoldaq1c5ckzfe5rw30xz',
                        receiverComponent: 'rggjyowvvto1pdej25fbqyjxwvmadl6snpxr8vdny90y9ez3o2bzxtyv5ekdbovbuwu012e1gpbzz99sigl6ou83zj5lqco76qud146n5pkz5u3m8nt2sllqrves51f4b3d5bg558ivbo147wonu7d7grg9wbqpe',
                        receiverInterface: 'drfd03tnong27tnd0o4pbayy0we6ck9942km90p250a7g1lpx3anc9rj9ozcu6zefvobgwzek9ho1tczgnzahw7z8af87efey0fw5v5v71ri0dtu8hd5nrjeraz9jduupfqzs6p6pu6nbq1dpfj3rwyhqhpm0jt8',
                        receiverInterfaceNamespace: 'a8euk1cxyo26n13hsspxqkwif5dnlpls7x8o2kd469ldvieplaqji64i6iw1or2a7q8i6otkciefs4dchk8shc3ry8zcm2r4csru7swzdr0i8ar3ljnhci5buxqq2pds9g1la9szdgf5v7k6aokyy6f7q0k56wai',
                        retries: 8425688855,
                        size: 5759269291,
                        timesFailed: 4107410004,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bf064a56-7ef7-49de-bab0-317061aa44d6',
                        tenantId: '4caf00a1-cecd-40ab-8e5c-9f917e1b325a',
                        tenantCode: 'gc0curpzfqk9cj1ly55z7ow676bd81j33ene9yzsvqsm53f7ue',
                        systemId: 'a470222b-345e-49ec-909e-c6cf4f2d3dc7',
                        systemName: 'tjqilbg3vo8fg0ndx80l',
                        scenario: '4pzn9et6sknk5ohz62tynqoo840gdoqk7ry4rurvl1c2pkr2xg1k04jmu5ff',
                        executionId: 'ad882728-8622-4458-886b-6c7a769d0410',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 02:31:26',
                        executionMonitoringStartAt: '2020-07-27 17:05:29',
                        executionMonitoringEndAt: '2020-07-27 00:44:09',
                        flowId: 'eaad4972-1832-4740-a6d0-db4ab070d351',
                        flowParty: '22cxcynjjd5927fiv1x73cvr0r57nqa4b3jur35yna429azdmr0bufkpbkatkmqdg9xyadsrrl3k1fwlwwaapa2jydsbkvpz0u1mmxm6h1uaerze2zkxts8fdw04jhv11g22eqs0haqn4z2goxd5sfzph6veid6u',
                        flowComponent: 'jc8a7o8k8ihr12o9kvvshfsuxufj8ucvyhztilt16s00gjafw5pznvllhtaekp5ezjk2xx8yt23ngw8i0bjyq98x7o3hh5qswsowd2xod89juz9p41vauscyb7fmr99ch0y1wbm94ij9xi0131nntcw8jg1w11ql',
                        flowInterfaceName: '6zgzlfwcclfyf0buq0kuty9x3cievbu0tccq53e3kblnm91z5yvvalyz3y48lul3dcuat5mpxldu05rxr6ivtf1t71bzqj6remgqa908y9ttgiqwqxi68prbqk10gstzn5hibti6pwceebq45ufvy30auqir1cwh',
                        flowInterfaceNamespace: 'ksdbgchrbygmj2mb5kwpd4nmzfsgfdjp5rquzvui43dg7dhop67krvj75zce2oqelhz0kl7qc2l6tm1sbc3supif61rsokz79g1lpuw5h7gruaewpncghatc7ope0skie1w53r16ehph44fsst8mzcgc9uo04cfm',
                        status: 'ERROR',
                        detail: 'Alias quibusdam vel mollitia quaerat aut nam at. Sequi ut in numquam id soluta enim maxime. Deserunt autem ipsam ratione illum. Eum repudiandae corrupti ut dolor mollitia est tempora veniam.',
                        example: 'xvnr2ew4g19djz3aaxmp9y9zt1axt0v9pktihnb97xqrespabrd929qsjjsdlp69wnajlqx2xlgso26mwbrv3w77odks9lq0enf9hcg32uikpupc1i7qvyfde74vsj0h8b3nec7k5x7ze0m7txaoc8znn51nmion',
                        startTimeAt: '2020-07-26 19:39:01',
                        direction: 'INBOUND',
                        errorCategory: 'cuh6kl5aatky6ekpw91ztlo9n4p64po4utvcdwof4pauygrpu7fjmka3ey3dx4i27fjkagcjqdhpsyjqwnyex78tbbrtzgakj7i813450z1tyytv4n20agutvog23f58i48sugt9nka13iqhf088jxw3qh0xg7f9',
                        errorCode: '5j94xcit1vj180d092ib',
                        errorLabel: 526771,
                        node: 2613167988,
                        protocol: '4b31m1nsl5g0da89u8j1',
                        qualityOfService: 'u162t7o06nr8vt003lal',
                        receiverParty: 'u8crzexfk6jurnlvnwy2fgvzc2rqa2fibksprsxaonq80iz2hxoi9gchgsdfi1c3d54cq57qvwnp3vu7tmkwyxc92o441avylsqqh6cj93eta03v2piq0mf1rl40mxpzegsfa3m9z5p3ssvy08jbyh3c5a0xg86g',
                        receiverComponent: 'llf7373zvmgq7lmr44t4tuwdwtw961e201ssk6k1yjqjccmtvjpxuljul51fi21srg2n1gp8ugo9fgswvd2g056q6ro5hnk41b9wdcah0a5f1nvgi41zrexmvrrn041gpwgiwbsal3wsqkf3qdur0xo7tj1g3a2u',
                        receiverInterface: 'c0s3g98vnodk8w6k8kfnwvi5nyv3gbpyy5p6vvwqf84ci6hs3884211vy515uhnmv1ufsmkwk9x3iellcn0346nhv4gq4qkgbgjrm4z83aewh5k3plm3dxmv3t3iu8ybrsuv7do69sb3d4jdvskwhcguvd8udpnf',
                        receiverInterfaceNamespace: 'rgavsfpjxzgj9xraop3o31cutwkfgadzjyikp0b2bdej6y4l6n0nkq25zy0r52t8gymimjyux5xzofis0y3ai526m1u8ko20tui3r6fycw2ry2072spc0k5cxcft3lk02yulo7z78i4xhndd03j9jko71lpgvw43',
                        retries: 9809876098,
                        size: 9556551607,
                        timesFailed: 2295690606,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('bf064a56-7ef7-49de-bab0-317061aa44d6');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bf064a56-7ef7-49de-bab0-317061aa44d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('bf064a56-7ef7-49de-bab0-317061aa44d6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});