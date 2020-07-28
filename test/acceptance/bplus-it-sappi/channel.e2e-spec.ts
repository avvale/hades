import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vrdln66qcre9uymcrq9yfuvg3xn6krgfiyd4yhd6sgpasafg4b',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '50og8guj6f1zq5rz1cic',
                party: 'ri9zbxutv5adl760ofue3dthqgg89365dnsavf8xeljwbpu3sbd4lvmb8lfdi03syi6nc65jqk36d6p9b28n6cfm9l3rvnbl1ga94vlmm4ik4lgcquejcxq5ob1sqcmtzqepxgbp03tqb8w2lm5q52ttsh1y6rcf',
                component: 'oodx0aslutfywed463p4hdbw487t88bscbxdh1t4lir3yztxos206jv1ljs5mqpwz9rze8y8dbx7ihbpuisrbo6uuqrblxnda608jczasx6s5d7qwxq82y6wi0w52mpah3mam0o3uy6reqofkevqy14lh3qlzqv8',
                name: 'a00l6ampmj5iuigy7b8t1pq8abve0rabr5zsq4j6149nkarcrw2g2vusavmkp76jnwqaxu3afq4irn0rwopuvqy2audnvrbxbcqujd4sbmjq7hmpuzzu9tpqer6phbki9kyj2cvpuz1k3wkhesfz5hjwdm95img3',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '7nlslsmnqg1dmg0qyxb7jh4mh0v7o1356de05pb0jtvjj54ha79ek32d3sgy7nnvznvyf0r9pd7bjpk8egt2duaexgl8414tv7230j1sdy0bpljskecu0dlg26a15sd4ry3tpsnjqs79few2tofopovaes8f0hg8',
                flowComponent: 'x140c7v1i1ann41osvda9m98cda8pwmbom45za08mow9jkj6flzx369ocm03mljkx2a39lxrp0e3czatu9o2zm1gaf1kctqf0w6pz4bktonr8jneda9jv4sz4kpjjfsei06x2u23apndob9doq3mq3db2wfm1eou',
                flowInterfaceName: 'd49fxsse7a6hcnb7s6tes2zyixfmki4c9lw00n8anqtgi233fpxiiy7cq7clq59gqvn8d11aii3zcts1mn9rtlc6exadmscya08oi224ydaps8kcem5qd2e2fspzoz73akukc7zea7aw694ahxvralta9pvhagva',
                flowInterfaceNamespace: '8z6e5qasmv3rns31rkrubnvelrak1gsc3eoucqa8m5i2sq3r6gvr7jbulruumzsq5l1l14s1ckqtefz3zntkznfeabwyl2c28lmcldoe0l76l0ipomz5bk6nyklrf3h4qtpanhybnwmv75qn6ajz48u30uvk7nx8',
                version: 'ndju4wieh7j8akxp95kh',
                adapterType: 'wdz7xyw0v27gyzwcm7tsmax8aah62or0h2nm83iuhg3y1oz9895fahrapq63',
                direction: 'SENDER',
                transportProtocol: 'k7yyodsk6wvoea1w096jtvcw3omr7lkz620iai85payxibvj8hiv6h45ezal',
                messageProtocol: 'wg9z61yr9m6cdjzlhwkvlfduof4janndw52airyo5mee2o95qlq6cdfti1q2',
                adapterEngineName: 'f6g9df3q7drnqie8kl8dg1sonkicjr3b9h5fqu28h8veq1kgjuuk9g2erzz9sygx80iyr95orq8c66wittrdm39znp59ypqxgufmfffg6zxq80em757azw7b0mb8cbpavv825ek2nt69e45uylnp7j7sqp9kvky0',
                url: 'pv20kscqmbbnacz4jgsoyukc2j05v51o5i8rncyqpg6u196joi262ahq2tdgwu5tva3oy4av06tdcdg5a7heum5bwqbud04y78ze1qb9w9ojwhq01wx2re47r0pjsn5oze7h4kzkpn6l3ostqyuyaktuwugz5ocrx42fbl04i87ta0yaokm48kp9crfhpzk59lu3sa6pqjids90dk04s7iyaxmmdinxe9gvbdn3di3u7vkssz6ks7taher7g3ps5xv03q3dlxxukhwxk7nnzrhdb2runczsn9776vuphnl60eh8y6uewrbvzh8t8xyid',
                username: 'f2k2i09whbb0qxw9veubidrtee89p1mhi5uamm5stzl40jb9rb7zyn1tq5sj',
                remoteHost: 'cv6expw1dzc1sv6jj994ly27tsvbvw4qxvmqul8kpfryrsppxo8l760dve1315yeo418ss5kazqm4wyl9tzdxj8irvzdrrl5st0e1iv8jl25x2o48v2kr5h2b97htq1m5mfkoa6okian2jj1g3ojgsn3kacetz8n',
                remotePort: 8398127749,
                directory: 'z1a295jlrox30516r6q7i8kseesrbi53gmnpgbk782qzt62jddnvod1gfdbrbopppklu3rk0gw97czjgoji4hooy5n57pj9qm9tbow8dtfmsiodqdm83sqddi3oa79857nscnz51we9khlrrsgcqo410pl8layojbj2ftfpbixh1aolo1txshgtr9ah576agv691u6v9405xvs3bsp2hir3peyernof15u9hqdujrn36xwohd7zw1rngb7z0px64iqzq221547qze4vzylxx3k5kwddvdyghf2kwu9vhpfd1ury8v44azs2g8y2mzcoret155fefkcis4jxjkef20a5vjc5lwjjyerqd5le64qafasf1jpnei6mncnu3h31skh0cl6bb9ctpuepky8zo6qp3ua9kfvo9eu2mfb5bmp5bvjroe0v6rzp34ooqpmsc797h7bgcsbmqvfay20rd2ysb56phfnoxx13pmey8er01hozabm0khs126yuba35klxk0aivva3h4cmg7v3af2yoogulp972q3fblrnso4dindrrzl6cdivk7xmb1jt69c9b654libbkka04cterdvs6e85ad58i0nwfpxbcfc38qtwpq5c0lrhronv4zyhflupbydvov9uh9aumavy6qc3c7uf47gwd3yykow4fury14th83if9h2b28dfhkagkse30kxnj7ithdh8i3r9rts0qbaoqxgwxt500fie4qjvmo6nz02zt8373tj0gcxm19ax2n0b1pxzq9b67mu3leie0iqxqdk6cnmdrqg97veg4iyx3oqt3l694zfg4dfz3e4u7igh7vnuer0kaxstlbsxm7fciwmu78agc2xspbqal0j1eow973tcylg01yk499sql0awywla6tu7lbcpfsu5hi5xsi46rdg9jdhfdi8kta81nuafcms10ssx4wzcsv65uceq0mg9i7ptiiy7lfs3cjt6x4v04ytn8mvqgvjdkx24xmzd0yo3gddiclof77',
                fileSchema: 'seglhzeqdxa5tkw2ukjhbvgpcwa7spddx26vevhu4e8hirtbp7rqr3ocmjrdjc9qd6h2uoriwys1d71shrjuwtom4dgnid4h8oc3ts291p3zb4lnpigu2x7c3gs9vcs71cq37x214pe2oo47hy1pqiicl50m2x3bdy0v4xq7qhqud8ft5yziin2dqx1fzsfp4k687tu1co7ba86p0b9p7w8qp214w8dv17qyb40fqaom0d8zpsld8s4dymgr78tlb5n95bequku3pjg2i0udnsdyifxr4kg5rk7rcthozhcluc4brlzpt6p2w1tk2kp1ssxc08fi2che8r6x09g38ad3z0p0fa3tk45nco6pr6vfgwboml6htolmze5u7tkeb407c2pl8qxiox4uqbihz2edkzos4auv1ur3cn5smh5ofxkb5mcp8whuqu8mj86whoaipt59ozurqu44lug3pygaa83k06ge1pcht9ryugn2nvm2cnjc9grbzrp4hv3q3z2ebm46p17khvwtlxy57gpvxlpl5rrvfgujkszn8qasvd3zie7j0sylhckiuqcfgk09x7it830bidu4l2cj7kg967w650qzams8nz9mno469nwqtahyqizf0sppekvb8a8akhel64gvgjlf8npzou3aqxj7yp8m7kooa964w5e2o6kkhnsqz4opexsnujtgm7tg36gfeequixexhh1phurnkef9apqqzbqdbhla9wvg5gpzzebf7s99pqqa7a4jh8g8ddrnvlgnagj26ho6qih3gtebme7m0a5frpymxrvrby75dtwxuru03ko1g6xiv5y7y91ugn4rmyypidkfwm3lcpg16527dr051udq8r84y926dn9u8q971nm7wupu44jgf379b7pzjn61c3wxf69gsyw6q7nsvh6mx22amh8gs857xkmp8d8kqqtgf4c9oez99hzeclocxg04h1rzmgmdxd62rz6qeb9m9998lvsrv84j23wdmzcq5q7qfxvs',
                proxyHost: 'k1l25jrar8xtr7fppmejhaxsx5kge3haq578m8ib1twe3yggqw4ziejbhp04',
                proxyPort: 5495326452,
                destination: '4gf94wm67fugq6df0s2lw0lhrjqpjebue5t9nrd9ihie9wbjact6id2pswkzd7fsz0faoxlnimk0e51qe20gqho40a1qdknie7nn8htwm08n0b5bvixnq55nbmftt3tnng01lsito8day9vsw8o71xjhxby6h4xo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1nl2yupugw2xwt72w3pu4u7gguceulx3ih2zblpeffpfki7chfl6c4ymf7cstoiflx236149e7c6wmi6i7jbxvutm1q7u89vhxoolqg7r2y2jlx3xbf4ckkodqhx54wpb9fq88upccvf9fi2mtb3biupy3ihe466',
                responsibleUserAccountName: '00sorytrxr1n0bo9k4s2',
                lastChangeUserAccount: 'p43mexi9sn0tcdkuqf0w',
                lastChangedAt: '2020-07-28 03:33:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '05onmv6sam79ni7n78crmrvpc4zs849svgd8spd8c3t56iskcn',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'kpfomt9vj9k2f75q5e4y',
                party: '36w8sgrxtff66rliwgmqic0o8qyovdkrgknezlearsgn2m49ynimd6uuzqvp5vhj7v36k4b85l7way5bl5j1608zj8cjug7krryhtpsmej9un345s1c0li2fb285eq1fdnctgy9wk5d8ar30wjd027iog7x6a70q',
                component: 'kicamuta8xdv64rmlaiyewtn574k449u5gr8m9ahx1i7b43b1u1mm5y9t5boi49ebvq1bofgsd4vv7xqfqxh3a4h3zaqpdcefxvv4gqd0ws0j066hwai139g613ikkqe545uwc0yp9cguuuw0quubk2eqirowlcu',
                name: 'kw29pkrpsrdhreexn2eh9f6hmz3qm8ea9tc7kyows1y7o4f7gqlhhjxxxoce0ylo156phhvxifnzdnrxny7v9efav5k5erobnjuevcluikdozropfhptp36u9rdccrkjreofaprirgjq0t0ob0x3kfl0x7v7yw61',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '9qythg3yc4osbshxu0d2sndgpcxg7hyi0c3q2a2xcvc1q8w4x1522su8xdeachwuyj3offt8zwluk8tanocdwo1rc46otiju31r7f1h8wp0y2t297i7ctkqo2gr2qo1qw2lavpec4d4oqli0rf00s5tv53uvd1r2',
                flowComponent: 'f6bn0zyy9pexnz0co9eoqjqbirwy05o7jcn36624m99y5qu8uxanocbb4ma7m87dexijlmwz8hzsg1xmcnv8huzyqk80qbcdraxsbbgcr4el9sr6lz7ebassr1yf44h8x7l7tueheneqr97myel25m7246uw9u5q',
                flowInterfaceName: '4qp39x08uom9pi697kjntg4s2qlv0epqmakeqbwp5sdd3gzwys79kirfxdybpxk374vsb0hyxb7knsiqqsuht5f17r6fjoch3tc13ie78go6yqxl5mjnuzrhg3q92g6i7yilxihynx0vyw0790zbpj3065mykxew',
                flowInterfaceNamespace: 'ps4b8av27uravpxgnk11c13eas0ns65ker8jjb83jbj0c3aeacu50m0sqi6qv2cj2yw2skfqfkayfsdl6cj0lvleehtqfp4aawi2kceipkcc83j12puzsuubmj9v3bb0l4kga0267o3m1af627q88kwffjkgvvgx',
                version: 's4tjdlyswc5hcoutasd4',
                adapterType: 'srx63m7za76wgiezub18lh5ztdad4kkl0d9k0mfmrs9cr27dm9njkmefu2j3',
                direction: 'RECEIVER',
                transportProtocol: 'x4dl4fuxdwju1zvuow8kbyv4yltyhq2eyfpdnv40yzsshs6hb5d3ixqdwgaz',
                messageProtocol: 'ozczaarz2tjcglqjxxt34pjzytokwa9befh3kolz5w8ablvnswt82cibry4r',
                adapterEngineName: 'qbrkz123tsqp4ev8swoswvscfmuacu7cbbeffcukk7sw9ximoe3abe2eat12zsk69mg2vdq17779uw4wfe98bw21pbt2mvwicjmtbzfjirzzk5cfxo7bbcot21i93ekjxrdp85x8vzc8t203e8bqw3mhk4p870xl',
                url: 'fwxmk55und4bbvse66muk0q68ehmtj1b9uvkrje50ote62nu18pckscnlj6s6jmzstw5ht7e2te863awi02w55yxta3ktmkbjcf0uhgikrdzij9kc9tulc3ucju039lck76q5131om8evl5ez4iib3zdqauclcqwsvpqa61gb2bhbk1sj8a732v78iz9zncoucynxcavgb8v0brypmntlnlgeyt1lyn2ci2t0fznw43uvw1unteq39mo4zq6yujbgvezb145orhwblxg4jky7snh58ark3ehem1qoowg93xe2kh2h2cu0jvcxr35njeq',
                username: '1iqja6ea574ek06imkh5x0mh7n6i6y8ttpbb3mwb31fcl54f4yeqkbjvvqnf',
                remoteHost: 'loyolncyp921xd1fsxfssknnegl6e3qaccorlysc3hc0ifpp1ixtw8lp867xs0l7qvwcnvruk5vg8at3gawhpfisj1oc6tx6trrymk95lv4t5zvydn1xts97djunndarz2smlo9kfvfl9q780f7g7o9ec1ebn82i',
                remotePort: 2989074388,
                directory: '7606o3jom5uffqb5zh6d98ozvgkkkvspbh0lbigl4zavstthqf694lna8an2p9q4wml0kqfh018h3ch2kzuzlhsylburh0g7z9oy3qizekcr0azhpdwylkd6fuscokj247a4419q0jua6sdzvwt3e1wqdd1koso3ynn2bh9zd5587ub7xoqzhjhze4as0rxw3fk7m4ycdcl2kknff2a75b1x9p0sb91abnf1l6a2yqylptky6u7yq6td58svqe4qfuu1pv5erw2ie20oxixd1pqv41upys4xy1x0w479co61uq0jyvcdddyuc0myqswzimnjj5ef0d4zxolt7b4ynps24vd8rj1grnqichpuxtnxma2lq77rkba788zdt2drcnjxkbuj6nx3qt6enz99z6n8hwtiugratskmc4oseixy9c92zvlwovl6sqcd41drjd00nxpwsknb60usag0ym920y1r7fdyvoofivkrxp4lqbfw75l4kl3y0mcgfgh6r0bib1m85ede3qwf5970w847bfehy3bds3cn8exse2abxdkigi2sj9mnxwr11ab41n21xasu2t9ke0dbljip9lxe2vi44ghvlxudq0yv269l7laxvz1bvbsuv048w5p29p42t02xq2t7bl5y1z1gb11pkdutp1g0yo3vw10rv9vx4soyzr6f1cg4g44tyfss5f6n7oyr9njvsga7rrqiubhhvlef8sgkbdik3qer92kt7wjkb6pb1f49kpgzj3hfa9vqrc0zzuja8gerb2mca37btepi64q7y0g4urlualp4um5dqgdqiqws9ow9cs71na6x3tx3uj5xvlb9ridxxjzfw0fe7pf4p5mt09w79zc8qrins1sksu0mfdoecxzpc3hxb5r1jv0fjm4wbim40lcskks86uoqyf5g8ima55il384zzpbh8pohc0eprld5vm6s9i2w60y3j1rkiu5hvyhzt4g6elz18r6qj52nf3xa72kypgyvlhf98biuw9jbx',
                fileSchema: '1jr82xgwyjxvelenplxg29s1t3m6a746l5f17s55yxc86pk17fmfovsus3sa80prd0k1rvo734qiixwtzsvd476iwo7r3999xgrh9cfzo2x85lik6995linqvz96xhuuvmynta1cc8bdchozldpouhm9cqdo7nymoocfpycg2aani5wxz2i5s9a6n8wnr7ncy9cs7ow6jgyvs67oh1y5jk4ejj4q6kyard37wc4hvlsn1q32ji5uigt613y9mme37a6uwiqsdeoqdknduiq8uysol1f6yt4ocralgmgavewrrptw0i671t488s27edj0mvje2puyjhpi4j3273r3udhmxy7bwfasebfl6wv25ze9jfnxhkqi91ksnrpbjpe1z958b5t3e68jvqducxzmngro3lofthtlgruqr54vc6s17d6lk0eydzz2tju8e6t2cv03266fvurppkzow0gjfgvx2tmps2nyly4h5zpu9ay6dfqi54dmb7r3pv5pswmycuui42k9ahzu6ph9e63lxohqg6i5khakwfspea0umshdz3g35ggh39wyxcsgc76zosn0nyff5x3bq9utxnyahpz68xeuvqe5d2cpx6g525xymabg8ftw527xqtgf4yhjwjr7zhdvlphl88lpabvmml2rbf2vobhfbin63xqfj5csgn26eqhosj1smtmg9wd2jol0ibukeclyaybmx5rg9iea4m5oygfi7weh696jw4zrbgrh6hdtd4lq6ft1c0ksk2ledwi05tmtbjhdl12874bzg8t32cmvsbqv7usr8793hfc96wagajvr0jxjxtzg78s088km4flw4jzkq7chp2l5oacyz877z2r1x06d5cypvwx74yf6tqqthzbn02kd5dsxnlp05igtk7xnj5vwurkwxrfntfbrk25wuwt4tegg4kk1bplacmm77tt00izsrkokfpu6ubx10llljx2h844wkfc8psusxv5e5s6p6paffwnllnrdmem9ob5e0uho',
                proxyHost: 'zlwww28anq3f0nxt6j8mjq2xlusgqbz8dlx9q251o78scb0bypqkee4tfm71',
                proxyPort: 1742889405,
                destination: '0q1gmx9juyy6sot25dpxusdue365s3kxzpxch8putthyjkoi2y4qxn61lf3amrz7glhx1p3zspsvovuvzwsmfrhywmgmhe5nhr8xe2h1ymapx9ehu15nfm0w984j70d4y742lw1brklcozs10fyfoct1bcdm5duo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ti69bdf8e5eafyxoixd9ka2w6ttnlhrqov4iqzd8rd1wxf664cb84sfvp2afmdzpiy3p5wtikc81g3swfdc382qtktzdq1l02058o9wmpq7v5g8okf7v1deka2xp23vj7iayhwve1lurmgjimejp4dvtaqrklly4',
                responsibleUserAccountName: 'gzt582ayh27azjuhwqg0',
                lastChangeUserAccount: '2u6avijs3q61ydrmpttg',
                lastChangedAt: '2020-07-27 14:58:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: null,
                tenantCode: 'hmoosmd99duy643vmnze9rswo8qelh4p2w31vje3roe7vtz4px',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '46blgn1jphhcfi9398qb',
                party: '5b7c3ymvhs7p5j1zahxsbt70bee4wym9ksof51xl5c0wtrvy5rd5biiubj2txic9awb79js63fzjm01f3dfgvod8yf4nlczwai83dpekzp3r6a9puyl2vnpv0oarlve7eqj4ghwe4ym9xx9cgwqg2g91fxkh2efl',
                component: 'd7jlt0nc80q8iypyprf6hy7gyn12zaqsnnj0n90c4im94ppftqzlhf59sb1c5rsoxqlv1icb0acm1o1y9bh67tq1gfc8dnfv735q8pchi6103dcb161iuka0eue33o0eigskrdgw8kanoo95euwelswjpi6w857k',
                name: 'hrgj1ewsgie67ob5yoi9e8cgb947xw0mdjxjgeua9rd8x0uci68kqkj59jk46p1z6ce5a3vjjw9mc2o3dw7rpounte37v8cfn4hctirhgamcvz09q6hvv65pqrqz8pxrwlk0cib74fc9uv594u0sb9t3gsm0apal',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '3vz9om0754nd7foxfp1qg4ypimtikk3xdosmqe9u207f32d77ds9x6mwhxdqedzz65otkuc98zzz80shy6sufc93wrs1ux770c05y35fl143hli80qfcktfzb3qerue0wl0exqoaku1skzhvw4sbtbubq0co5t58',
                flowComponent: 'ig0wajr684bdjdst8wih2jxbbwp51l8fg1dqyqtgos94j8chz2zfopbgkxxoakqrxkpyzyoty9yr5g3i2zk8fekpee9jb578hcqlb7txjwugzt91xc6bssv00p2ujv1g935m97d3vuzbhnqg3kodr7xmtq2vdftf',
                flowInterfaceName: 'cx77kwifq0wxqk8v9j5ob2awew7s9strslttkpqlbjfzq11ybtvthwz10gv6148mlfv1gphjztld17x139iysu5nsxgf0dw7qjnfdhsp56rg7lfzgfq0f8p7lesbgf4kirbkjf9jwp3g6468bjp3zg9bcckgjawd',
                flowInterfaceNamespace: '9xgxbk0s831w4mytqeqjuulwvimr88olzuxykabsb5y3bp6ze5i5cxsq929jbb58pp85b2w6341wn7ofi5qyod2h24rlop42pjx4zu0x3xzv06ce9enprfqbsvppox79vk78xw2lef3ghpw6kv0rifxv8jql03n9',
                version: 't5h8oj6gukudumbyrs7i',
                adapterType: 'thcsvz71x6cp58l9xllsy418pcx3lwq70j65pdl6r9skvifkvw9vra2p2oyf',
                direction: 'RECEIVER',
                transportProtocol: 'c0t43jtsswm3rzewkaxmkge0fn4lssprj24b65y6dv2ninsjtuwu2ptmbzms',
                messageProtocol: '3kh13jism5aoswi181bxpu3i499fbxoiqbdsqajvd43w4ncr52tlvfj290py',
                adapterEngineName: 'rdfie6pk8zbec8m3jejvhujhl3wruxp03yppdngd5wlo04hkyjjtrrfh06bfafu36xplgctzvhbmwfwa1th3nfpxldplb6jb1mhfcm4dglokuhc27k2eitmgiwe9t9gy7hqlyj7oswegidljo3id3pcrfpifcqpb',
                url: '2iboaz291374mwbwnsx8on2wq1fo7y7pyfy5oeu3n21f57pldxi8u7wsyptfvy5fq2w826u2okwisoyp9u3is500k7tzifo276033rw23cdjzgmxnoz7zxec7xl86bmhhmmsn2dwpp0yd0h5hl0c4a9zl5wi4bo1uoy1i2ecxaa8pedqn9xtrg4xw36rbrb3ryxcdhf2fwcymodo8ryil4s4e75tw8t3rj18e8kj54kmbefpgby1zc7uliposmpt393fmu0x5kemjs8h8gv6uldekaifd8zczqqebwv1dkvsoablj8icpxcq791xew3o',
                username: '5jt75968ndiq5vtut8zk41lwinb5ri3wqetrlptig6kzzn9j0z61oyqa1i1y',
                remoteHost: 'pnmvjryg8s5la49ck34mfdx8hr3831xrcy97jam3wod3ewxprp8hfq62fwq05p1k09tuvohopz0ylrhaugni6lt37ty5bzw6d6yw63ptqakvr2hcfs32pq0yoir8bx723eaqvqj6e44mcw1y8msftk4op0hf3cn0',
                remotePort: 2532617456,
                directory: '3nkgbs74qrq2arglprieoyuxdgcp2mleh26nuy5t5qxbu9jayoi25axut4eizceb3hgqx6h7fxkn722p95dlafzglyubv4cg220munq84pe08si0fw5ktvcuzgc10qe0jj7bsisanajt9aq524nkwceaua59aa86b1fhfiz97vu4ff30ebks1dxd9obw7nke5bpbyl2n0ltji57v995gbixtu7g7x3hwv3xs6q12fj1qgm9f8cnp3n1wpq2y076ufmwbo5odo9qk4qd0f44az880h3r9le51m59tvb3yo539i7twbk8dtgikk0uqilbqx6qam7jep68azjxoo223czt0hr8zdlda5xvwoltpokxf0wenkyzw637wwnqpknvnr1k6e80zhup17l22wm4a0xyf9yb3nd84jsb9ej205aq2nedrneu9a84a9vnvs4sh5grcwebu2sx79hhl86equzdh7xegyfcqtrfykeg45jm62oppp4hpo0uehbo08x0v7rmtacoztcg3cafmgre22pnmr8isps27oyuipt5qtpx29d3iinrn4g0sfat89vu3j6qy08cvrg5fyl68q3w4icc972ybbbbfitbr46q8p12lszk92osblc7omwldpizto8tnj8i4peyrsfo7vlsr9osluu84f19f600cfb70o8zs9wy0tq0mqsl91qmtc1j0yxdkivauqdaw15tmefh1hww2as7on91ut73e2fpb16bsm9xs9bqghpmj7x8f48iyl62tqbq4h7a9mrhrmgky8337xj78sfq42y6ki17z4txw946qol9mzp31bptke1hnupxtnh0eb2js2ujofnhwfwojuedhncysek1od9hp0njkoq4yemhk8i5mpwv1207h5c0amkqos21pabcwzq5zkaa58u9ia8sytmiu0r4xmc6qql03o3vyiwmlwuv2gwop6j46jvwvlh6s9du89mmzh8cq0pla84tm2e2ds11bo02r9bvg6q635sh1eei3pxmh',
                fileSchema: 'rficv5oxsh6l93zzb8qq0k4d97h2nvvush3gsl4zsrappmtmxvm69kko76d7uu3oofj3gsvlgt5u8q1z0zcp2fy8xv9d56gzffpvcpupp9kiml7agkohoa3y0xiox2nv64d3ojnav4jl365lbvln43r1rm898ddaqx4e6gi4wo4d2qw14jkkm132hdj05d3g179dprjrhq6o4htitimwpv6xzrt8sjkqd7c9x5ld5c7mgbevxh9cxl51up4ig5slhhm7gmpvw95zkz276mtmznqh01bzawitnlbncnkmhg5j4tql0u8heefj9vnl1rh3p26s63o7cxhhke8emsrve4zcu949slfopj6mq2kbc5igbjov567ordjsvldo6fmyl4oumyz9b734pv4peuc2tgvj14ktvykmbduwkv4741zozobn20svyqk81y1php31zn7xixkw16v7o7bar70an6ul3d03ufxvunrhwwdlgfs44013bp97iukxg8ewd9ouffuci5xd5qfan0mbevhp98xldv1gu381egzanuu2sv2ell10xsf9ztupp2smp6cdqoasmkksiaru745xa6hc1wunifirtzn0kf9yinvvlueq8g67dfmkyli4q3j895gvmva3zbi3iyb95hhn6dld4g7rh2xxmaom8p9p07uoi019rlzhkzydf0hrd9dd1rqvgm0wx7pm4lxaed32f35cw0unztyy4e2673jigtp7b7iu03i4ej0pws1vi9fjount5ltq5352y8wzc1je5vodcd27l83ldty75s54zf0i3woooi920jec873vwp1c89tg2qe71tf08ibbeb5fq5r3fb8b5th9616kz9sm647xjv3j7lonm0q8t4ptrmmb5yhufg8plbw3oh94ob1uwmmktince2546x8h9sxfwjmv009c7yxkymx0xx8bjjczq3l26be5o56we55po30tsrhiynxrdqdvb9ua1rhmn1lv9v7fgrzjqit18bp7v0lhiz4r',
                proxyHost: '27y5aganob44x2hg6dvpmbku12oq2jqbln8dg7vz8bivmejev28uik2uj3v5',
                proxyPort: 1621883917,
                destination: 'k96tum6ptf63hb3ytjiho4tlnvlx82g03uctgc7e9e56sjnv7fq0oon618miw6bkobckbwbctx8ugld45ei9k485zvb3vv8qunyvtzzo3vuyzpuaujej9hkzmkgke2wywavy16s5chitb3sctfwe6cdpeq055j8u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mmu0l8kgd9ft4vvap1517u9m4nc0lbbz7lwxw4e1uvci3lgi2m3svqsr49wj2tmzivscojk5siqbbl067m5576kwq8liy1xmstuf0g1qk7fm37tu0c5o1xl4acfjswqzqs8tfaa37vlpimax8vvs9k66vf32fqtg',
                responsibleUserAccountName: 'if0hi1erh88jzbf59pum',
                lastChangeUserAccount: 'qisnypjuzso6w61f464i',
                lastChangedAt: '2020-07-27 11:41:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                
                tenantCode: 'o6tga3wignmoirex4jsd8zb6136lptq19f90f4zw32zb8cw271',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'salavu3217t96pplgkon',
                party: '270vilq6rqokvp36013w4ax8svv13j75foo6n42kj4xq8rqsv9ohbdc2kgsun13wy23c8ajkenehcrb8mokuyxsjf0ysv8tb6f0wh3lh7hgsb2lc43p4v0t1qay18kredasfrdi87ksj1ozgqvpr7evaid234qxf',
                component: 'nctby1yb237adh8ta10aopvb5h6xakwiqce5obif73a64nm6p11uprritt38gw4p8uhc6185qwqx49q8vmy9xdvied13vxfkpwlcwpba0ha6baj3y7rj1gpbu44a2qovv4y41fwqirjmuptr8b4d9iyam8882bfo',
                name: '9tjjyv7q1ixla02h9wkbx0d5uocx44ry2ii4eqpc3ov7ph9hycns3ll3ti9ncr2ylvihvzqyqbnwp5i52g4aw4diri2yl7do47ng62bea9rd38uba2a4tmiljyzxacaw0gddxgui71i7ytf5yrcohlbjiogde5f1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'ofm2qn1auyub1djsfswc1tag4pe45w5wi2gs6git304x8o4l680ul6zxtujsubarpnke6da441vp9xwucn2zcbfprjeannbdzzrhmr3azq96p5b2bzoyysjuc67xbwl64kjtndw7xuo56o519xj73jrxaqk2matp',
                flowComponent: 'o3yn3vqlv9wzeik3un6sgnq1xrr376un8zxny0ngnk8c0ajp5pnwff67vdm9o0ed68t3am79inbvssup6si4yqp4mpfgmsyy21knqyv7bj77t08kv14xl9x3mf8qra9iqwrncnv9qzqw9ppnjtw796sx1vjbfxix',
                flowInterfaceName: 'e2y5ztu4x6zxj39yvnue469epklsjdk2w8p1rrrgru04jiaice3rrtg2xqppoig3wsez34pd9vacmoxs285k8ifzmow1fmbqx8zv7dg8cf1cggd2l043vecwigw9bph4lkyw0y7s37mtqnu55390jfo8556hug4r',
                flowInterfaceNamespace: 's2wvx058jz7j5jgoawjspxyqqs62ow4rmw5iqamalgk0xhvd7boyjw20yrp1sfmnjrkkec8spj3vlpvxljqvxvwa52qbfwmsxafyu2mla4q2qxgikg75zsytfr1jaqfrcxiuglyalild5xhv862oxa0rt5yvs75h',
                version: 'kzbvg877htw36opz4dgh',
                adapterType: 'i8nacxk03my0umasonbg041byli5d6er8yve3dzxtcuth43zu7t0svmk1pfr',
                direction: 'RECEIVER',
                transportProtocol: '674q9xfykrris9tkh75klxeeaniobcnsn8krdqtt6zevpi1qwq3kc2mpvgdg',
                messageProtocol: 'j2dh5rr47vkplhm4vzmtyhwcamqdl4s9cqk74ecsb8zvn46xg3740eevt13k',
                adapterEngineName: 'u0wiuf3a6iy4fs4ip5fq5x5qdj1nin6x6buxqcuxsq7zath1nj89418dipbvw39s0rwm2b0mkim5ot6hkyodpi2d9ciqwo8u57yzldbn09cawnh6lhva4sihq0tjqlsu5zgfawzfhlag48cingod6x1pdm9t1u8v',
                url: '9d80k4u6cse7goibc59vkj5gajfxwblv4gh4g1w9xkeojvrc4elp8qebh1b14vrmwzouyqhbtwt6mnbvn10j8p0ilggczvz0hpby3tbrs32of2fqix49lk0fhiizmigk6xxgu6n0ls0nzuxq7751nxz4n29pypzm1ssn9ak22l47bepio4dkpaekotlreji1oxjte3po0auy5b3pey5zy0zyhj2mx1m37papx04c482vw1tnxswij0nw1d4hukrs6455isxksthanhhus4yuxhwc0v3qaf7rfci0ktrnj4v8bxq5buxi2z21qu7jj433',
                username: 'd0f8f694wrkym2yjyunostcnn6c3ps6z6h5uzqfxlicg5dij7e2ybufbaskp',
                remoteHost: 'eh2qa0bafa1tgmo5dsxqv6mzcdo752zuci82d1bttqsja389ru1jluo1guyjrvam1uywk9jrng186m4kbl3eosxxqqq49rh8yzurfjeooluf6a7uk4sqnw38kav262w8msrp5vs2wsm2y8c9dj8krv2d93jpk78m',
                remotePort: 5787591587,
                directory: 'gnc6ubyplo72etp3xhtdlw620rx60oz2ml6k0x11ujjf188laxnanf521uat93eiglsqp75ginrilbyjrwsppag0jgl1n1c30gms2u5y9jqeumer00tp4xmhoz7we3x9bczzufyzr11btcsqn4nmrpli8m3yepjd2ujt7hf4t3q5ermp4npra8c6osywn9iq6tk0netm4mgkfnhhvf7yir64dwcwgpx8xxbbyao80qhs4oa3m0zp7m8zg4ez76pkp1lrkav9d1lmdjps3eqke94m7o9jdorud2echxm9arvkyt5nlzvi52mf2af1q7xfrlkr184lp6ouxmgdrczuvpuhmnegtupspg39s1tz8f47wy6ovr6beyxjz0og211htwprwwprr040k4g1h0nfwhqc9y7cv10fb20qqt8d4pl2dnc9tildseedfxjuopc8ckl5oypfpiawvcx1qp1ki9s10l2wmp6k0vrervtrdcvz9q7mvcj5328tf2uqpegu4yvk348n4hnpyu7biz1tx2koaditvcd9thisczxbvg7j9fd8akjs5vrf43wlfea23f8uhcpc2dkp7ogj3c1f06if8aay6ixt4y24vwkhywdtvo92j1ip4anff3snr4fgbw6eeu5tr47a38jzb1jf5agoyzgsai3ew3u24c0b083vo2im717t6376odxobq0nkn5zkg2obv4lthc0cqp27e5darjdi8vgxmtlyrr2ks7c3cjdpimtebd0wixjyz2pbhmwnm3oa6a9pmcsn5einapxzen990dasz0p9mqiqdqq7thiowxkaz7m7efigmfhoyapwry4mdv6l58d15f5mqbb6s4f4z6qaab9wegzoo64wx3vnldkequukbi8ixp57iyf420yonfcdo99abx1aph66dmjd6q9l3z7augog8x8r6fow945ndcb1ep5j7v3xfs1inagskzox7v2v7bpajwujds2orqdabqnuaymgnkkszlz4he6addh8e4r0skk',
                fileSchema: 'l7zw4nwo58b3l4bm6lann9mu1ts30745e7vvn7hfozzjdhu0dxmyv6j8rc5ug10lzk5i3tuporywo9n5ar94dtkwdz7tdr10qyvuy91th1doviq9thyy43zzkujndt9scfpnkf7fxgcmhhblb8v16oq0v4vy5alyt3owt7mcvmr3kedrgwsz35tun9vznajvyfri99ka9u8wq4pvex0hxb7mkjol3kxga8bx5z6s26a0z48yad7i4r84hh91479qxqeh8ao4n3mp2evovh1xcx0dec8q3i5v3c25foi5obx26kdmfqtue5xgdl4kv1fjhgphzcmxzvb246fsb4or0hur0b6fnfvjmz09iwlrhvxuksybbdhnydfvqoascelwrsa4u1jluah4r3qubdcknzku6rp0hzagg9l3wb8m31loc0qe3vxv9qtv4odh4r8guf3n4l2066x8reswve0cacwe8k01jfn8lcf67ecfg9wfn6zsuwn6ugcb1hnuud1zilzn15rusc9hswkve3mf8yrwlv2ckyz7tc51e2xw7bvr9fhly5mxxstqf8tnq9jkh2s76fbc42zle2ba5sayymvooyav8vk0wqe2xow4nexyjkfcftln13h7mp4g93yr3tjy8y0mjl4hq2i6ljdredwgbjq0o6h485uqeni8r6hp5fbnr88wafb193gyk11eww3fgb3075futcachx61o3lki2r04lxq8ac437pimer55xduylphpcczb91nl8s7m3348hh4yzkuh9yiek3y0vuaeq52x91j2ter7vllxng515wxg3pnjxaivkrpgqpv2b8lt50y94tbg4tg0ep7sfvm9uiknwb5q5cagubhxo9f4vn4w1mfxd3c3car5jj182a1ms71wv6ro377b1t313ic0r5fxym1d8j23gzu80oecbsng7ycovor5g4l1d9krrn8gg7cu6u2xifw2k6ecd7hvp2u4mpz4rqt0pefr4izxouj16m7kav13vg6b7n9',
                proxyHost: '06whh79ieoxt6hhmprmn71ukbs74ji28yxgbdozbfsi138wlptwk01ac30z7',
                proxyPort: 9881851541,
                destination: 'qraqi8ooaygvq11onixy7rdmlg588z6pf1wcbbv3jld52ez5ghkj9p772er0uyul9vrdv0wjslef1j9qjovkwhzjlf0zkhv9vvuuxv8b18csvd8nscpwzxnp4wwskurxtc9p6rdfrsmiz31f1pxo5ss3w6izgnty',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fk07fpv0zyslgjps1r9hbuz9s9d79ac2gh46k0q4g53xiakt70w3zfe03fdfs9j5awtnyl0p6tksl1ewbb061g1a93d589qicl310acenbdew5hvznrb0chy1iquwlnvjgl2apk2pr5f909e0or8wuid2o6oamn9',
                responsibleUserAccountName: 'b51lz0nnlrlv85jddz7m',
                lastChangeUserAccount: 'ilzosb21948uqse5i40m',
                lastChangedAt: '2020-07-27 11:49:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: null,
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'd5k959um44r0pi8u9ysj',
                party: '349gl9d5nsqrjyt7o2p5e09b7iq0sf148j3mpgjfd3xbzry2u4wxdgemtljkyaj40c04g7nj1kxwax1h7xohl9eoxxjmwy15ybozijwcrwo6o54sdovqeth7midten8aemqqpvm7yxu3q0uu26wreozsatpwi6rh',
                component: 'm5whj8zr5o2k3d9w4h0u1m40if8a5bkwvwsyvyrr5x2l7wmprdufged3otj9nho4rs48i74p397qucryj117fpys19919m10mmsk0ki6hjudtyv8o6clvaw7hai2wq0uny4hv0gfdii39xoc9i8pl72jy1a3mftr',
                name: '0xhwele3baafz4pstyltmhqk4cwybbgs8vyhei4ism7o7ogkipjfztuj39jv7ey18ijy4umeahdltqlvpb00rvcn9b0ag0or0yilxicpdx9gllw2w7i1nfvoufo9imd3nojqx4nxrb0twb7msmlto3qg85npjif6',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'itaa4zktpcx8wuga1tegj0qkpwmaf7t2ec0z6nomzb70a6l0uh6t7wpiph93vsrg0h59es8ouofp2nomc94lwi2g2roogv2pfawef3ct3vm3wkca99od5b0dxynzksv2oy5dzjukovbq424ixdu3zbl28vlz2j60',
                flowComponent: 'qk0kutrc7vq74tr6gu10kbt9thqntka9uqscejr7ebckgy4y1cgztvmihsfub27s11lbctr06kzvxnwsw2z4oxp3b4y7wq7t33itcv1lmsy08rapau1nktobnuy9da0v9g8c4b7a7spud1qo8tq4vhapmb91w19e',
                flowInterfaceName: 'hznj4fgvcyzxa34grizw9hdmtqrt7pa8ghr6okqw9sv4aljm7tmyvgd6jjnud83vaxk63ntcn2w8zlc7sso6igqk9ig9a7dmgpo58jgqg3r7ov36gngfzhrpbngawawxxiikaijy7ystr4bd6cbn8g4gc1vlhe7c',
                flowInterfaceNamespace: 'rzntqedg8li0or0nwm8l4j2pwczdfo2x96zkfezpcccl25svn8tu90eyiz3z7nwwd7jvf6pov2x9inc4je5i9v4k5a2d1rhplks4wuo9aexdqch2tlst4s9a5il9arbxtxt3ix6m9khojliubrpikqoshkxhda2a',
                version: '0z9rjyvr9npf5f9cd964',
                adapterType: 'hqxsnavor10wd8mhnzova1s2m9frwt27blivhgpdq6qsr75x20hbxb9ooir5',
                direction: 'RECEIVER',
                transportProtocol: 'p3xdo9cbtrhgp127ib2cxz128l28bvqxb1mh3h4mjeo4o44fdl3t8pcfp86d',
                messageProtocol: 'nuynraimu2rvsb9iuytmaoj9wnqzav0n9jjw6lzn1ytq92kcd1odgvxr9et6',
                adapterEngineName: 'nh2chmc57z5h3xpoi8pzosm3egyxxa9qka2adepfif311v1e0l7t32an0g6290l84aidk6bp235pb0w5a2tfw5yjl4xay3vdycthioyvczzvxr98j7m48bew7tgr8cc7w63iov1n1hw9d547y8xv4aqijl883s2l',
                url: 'pnslf61kkgw8wazdyus8hm6azrquon160qx14mnx92gwyrr6kjryxde9w0mmkzsznddbx0eg1i68825qi0y2f3szx4pu4f0pg6842aqn6sciss26203s6tdkuvims024b67ibi1ehtjpqejv4ot8i4bjen81c9tfqpi1ffv23o3gic9nafpjq99gyo4xpux536hacn1p4sm00rvwyhaxp0zvuo6zvwtpmksi1atepbcee9nrobjtk0pg5y13mm5e4f1ur3zb0wruuydnhglrocwg0u34ixz5bcxllthay22l3msd35ply87v5zmmdtjq',
                username: 'vq6rn9kmthj48tukw4ymdccpal4swo3sx85au290ol8m2g31mcn6msq1uixi',
                remoteHost: '6ry8at2skvhdplzsvnjayxvo15h8iunaz0gyhfjkjuzdvb7094mvm528nbiwjloo30y2jwxl0f6ze8f14kbktuj57mpjijawtaibs7uh28q9hpnlkm6nm234t2femhp0qulehmwbytr67wxp1i23wbl52omllq3o',
                remotePort: 6479773484,
                directory: 'dlz4hhoy9mur315rn5rzmdp0uf7pj9iltko3llglmsc3mma8o30uge3os518bj1ltfcpw9mwg5wvmgq1srm0gglhpad0e8l0dyblg6rq04gm4pxwgr3egriy8mglttbdgcd4g2f7f8qm89rxlzs4rrh4xomrjr6jyrdtduin2uvmg4owdii59kcjdinrf1lo8phsgag3g8l1bydz413mauavnq4zh6qy2awd6doxwfx3zwpdrc0qt9d4atyv1x7tos8r1zwi66ow3mnbafqt9yirwhwkgdm047azow9klon6au6xffo6siu060oky5mkiksp8umwb3hldxiau73q1a0wg9shh4l5pcvgcl9ca8dw0gye9keo676qr3h2jz4lz3z910bfuh9p699axuwx1uzvn6xfqn5e6had50i7pzc3l7woaovar8wt17d8ovwj3tb9anp4s7n8m46jihy375io695ylulcxyj7kl75x0qd268ub3tyqzcwo6ez9y45sl49hvftn4gkc5knynd825sphh36i7wvb662k2fz7v8ninpej2tkjj9zq7aj7fj214oj0qeuh40h2qyhqrgzdbjwbq0p2d4l9noqsjxj8fxgic3hiv41g0dtjv5mpevluyp84ugadzbxbt6y2e9f5n9xsdakjmpgakk6zy9juzdm1r2486d1b5vssmgvdljwwfju698x3xbxhz5k96ntls9szknibcsdqw00tmxpd1rhgvmmbrptibykl5140g3yibc26zapawwjc5ododgbavornynp5us6yxayxbl8j8drw8p1porqqn9te6tnsmwanez1u9eg78frquszxa3zsendec2y1jzglmgx3mnk0my6lz60oh5qpizwco3206e46umlufenn1v6dh1cfhngmtzzusxmx15zl2lzr219xxmdt65t9ruqz80cr9reqqbknsywczo7t5e2a6qfhi67itlodlo5g687pc83qq1eo7zlzi75fkdax1crsdhmfg4w',
                fileSchema: '4m3gacsib41d5an23nn13so8t14zgm4cozkkxc30bh4zdwhkd4sayi95kv13mp1blsjkdrioo3inf59gwil8nm7lb8r2a97nxgkr2o3vanx0dqssm4ts0evssn2470qzkhgdczj2hatths4wwsf6dn573wso7pu3hlsajcq0m879vnbmy88s1jikqwnetd7f4tdduo4qukaall0sytxyt6mrdcuj4oj0hk9kgtjq7fbgg7uxv4zci2vhyl2x1e8clqv6o32nsddv3beeqgsjqa7csrcmc5tm7lyv536088l9z45oz9ve1eiizsv4xmi1kkgt864yy3ki81khcmwvhrb9o062ap5slivrma6kyefshl191365zsdfchkd2cv11hxrhvtkl8yp2fmyrh5vpf2v2q3p2d3s952d5ez4nwfojqazf7ojx9dqm8ocfhvcm4ozrymw49rjtu7x04o6rfsz8a9c33dguhuadtvw5ssjpfty3fcq5l8z96loqz9got8t9v35yr8x6n76xqmjks1rkl9mvheg2y7en6dzjn43akhw22qck1vqdkgfsu935eaeljq7f8hx8l7b1jbs0pp823ptoppmutw07jzczvguvvq964kzwgrd0ykzwmdciwmz3hoxsrnlt043yf48meyc8saah5ir1eqhyvy2uv94uwwtwge7ncci2qspewwbmj5bc9z1y5cu0nrjf2zq3p5bmu9ysjyvr3h4umtlzyzvzfdyz2rdggf93jdo4do9tij1j18o4a5y9nakot7f8smjdf4l4bd3ns5ki7gwyoav5glaapoxzyqjk2jn1mpzcwu9ht12ebf41ihtsvqiag4zkmgjp3vziru33t79vof0izql6q20yhsubqyxcz6835e7dsj1k9117exisp3fibhqs0bn4kakl09zy5668yignj72vpzkqaprtxi63inkz87uyk0a0vw255skucdi6hfilc9ipfok25e24sqaxrmh3gfathnig07upiyrm6oo',
                proxyHost: 'o6wtp7ot96296qv99vi0lqka4edervvotf3u6nblb0kei0qaiyhcdnivk1na',
                proxyPort: 7609259202,
                destination: 'gz64ju18z9zj9lpqvqn7h58hiolssxi3dz0d5jyiegxurygr184pe0pcv7wfazwtzn16ehsbnx21pghrbe5i8az5re2xf90gmq3dmizruqnmw32q4ny0q3egqs1jxupy9ox45tjfbaxuieovpbnkj2t3dmpc2ebd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4ju3yk6p8ulfdrrdgcw5rma3c7dd4ud3xs10ax5rgi1w98jg473f0of4vk6iza5nn4hr55lka8u8xm07ac3yu8rcniqvgdo33prdsec57usdj1mwh935emwaitzj3tyldr4zq1mquu4joc9hes93w6d0rekyduee',
                responsibleUserAccountName: 'or7x124id2mzq98vm2zj',
                lastChangeUserAccount: 'lvpogls55rntvqkbmxqv',
                lastChangedAt: '2020-07-27 20:53:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'upglvh7suxxhfma3norj',
                party: 'xdyt2rmu6hob2yxuuw2rg11kii0ekt0d9s87pykyeuycw8637xk3twh5tztrltfat5bg0a3fz7pl3jbqbey2pihwa118zoa8mvg73atyyf5mjh44f7mfk8fspwwwprw8yishvauw2hx4c48b4brva2stkhlciz97',
                component: 'pa060pr0lo3tm60sxwdamkzverewqua413hhytbzjkqjs574ghunjcf4o3venjg5gt9xlqez1n2ry5606bx2pj54qd7gesc8xtyhggclgwc2xtc1sp4fg8phsoq0gkf35x7utjs83hzou514d8ecwov7fifc08bu',
                name: 'fo9zcqnh0oltqdknnln1oucp0bd75f1zrs9nzv8j1jxu5rbsf46epjw02a6p2x39ga93tmm8hlvgu0xnkaqbpoeyq4v71m3foek9z7gvb3vyzmu7xh4mdzujy1o43f2a7gfqi38g0htsumossh60uu1xd5u6dr34',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'xup2wlpkafpd74x55yx1814ei9y4l6eyp70q9rkaajkvmojtwqpvyolh4afyc3gdpe33lyd6u4eicc28ajdq6sojzb44pdgn08dg7vuaxrw4qqryyd9reypvhwrn0w4b2r0d464f9dkzfdp4atzpjfgpz0qg2bcq',
                flowComponent: 'y98dvm0kb1an3ahh2t8nd5p4jnwv4257svrxpefubwxoss0woe0uw7w99przdov4oyyk15m7n71mn7vd8fh8lqfzspvubo693dg0bynb2p1w889rs6ayzbsht6own4weavue8f0mwpx67692qba3uue4re1f88ji',
                flowInterfaceName: 'bnufff4xu4u3xs7ws3oi5n3pl4duff9rcqduwr1wnc39izd6hudaphgq15y1et32sf1o4gsilke0kls6pe4pklthi1cxfp0s2fqf99166u2vfypm96zm8tm46i595cbdok7r1pk58e90jss0jy1samd8r30x5ntr',
                flowInterfaceNamespace: '3t9g1lq2x80uz8b2ai8y7hslc5c6w7xbc75t8rj6ypvc6kew8y5760yz1sgsr5gd0sy9ive2v17i3cjdk94o72k30o15dlqqrk1n2gzo38j7u3ay9ulj40v8qy3jngvj06anj5jblnsullvvimtaovnn8xzxji4p',
                version: 'a7f6xews6hptyimwimyz',
                adapterType: 'u9jmpwq1j4z0s3zvoqptx4jfwk3x2itntvaoiq0zhyjiaqumg4exh1sx5e8e',
                direction: 'RECEIVER',
                transportProtocol: 'g1e8zi9qnxt1oa1ryi0vk95dqwp97kqak0757iq15pfuev497asydaw9k7wn',
                messageProtocol: 'gy13ocdq3bxmy6j0jtwlrgsjk4h7j64r2tk6o3qb54ciiohqm006affk5ij2',
                adapterEngineName: 'u0kyrhrglzky5y0frzz870jvxwtg29yet68utox79mtq3av99cjetgk11i7wpok5rwie58e6f9bv8ad83ewftqdgpkkhmvg3uwpu9q6ak1dt9zb5t0skfmk7j0o7bfnhl7syb7z1i0tcrukzd9w1w2salu8timnn',
                url: 'ax2ydh9vmju4pzjea7451kkzajrhgg842d0ai5y876ndxci1c4wxe4rue5o5a78kckha3kmvms6b5281n3cs373hwgar9yx00mtkdjhe0z3jeb21n5lkhg1u0b1sx5dk4rinh10wvby2z7muo0nqvo9pqgi5ty1w785zmj4odws1m9lxh3efbu1tfhv1xlsbde02qqb8nfpkdyjh4hl8g4ubmhkiqlfb25a5ls9swvf7rsvi27vy6lknzb564p7kxk7cemglhhmiivyzv7fojqjwbms05wp2nbne14c176b94w1o5w8xgemd6p067yug',
                username: 'qqnnfkub748a4lbycylsof3hh2tkibxg32y5xaos9xqm9yhxfji4g8qq1m3s',
                remoteHost: 'rm6zbtrk6ehcjov179zv64itu9hnnme6h8sjdd7jypbide7nlp7knx5wnhxc997pv8gbbof2qgwkuch4m5tl5wcfvhb3qfnz82qs5vzkvgpzqsg882pz2bf6o4ompdmkdi6afnu8idgr8kcddgh51j9ri0ptxs4v',
                remotePort: 4778516987,
                directory: 'bs69xpoxison8933iy94ekoee51nf2txg6kvd4belkh3e0k8k4ydyq3c1ofw636385gfp2z6bxi0np5i9jhzh1kz9zhnrtdmocmg18bqyk5su9kb7ouj13b3dybvsl09aixa7itvomehnwk2aangwbbvs9p50jg75zetethc3moyrb8tiy3rgnf4q38dkv52hua5vp5jkn850w6fty5oerztmogsvo2el0qgg6b78yeb4v33pbfmm3cvgpthag40k2e8xifwgmi46ab8naou9ootfg06d8d8ruiavj1i28by7e9z42obw7b2lcffcjgobvelfbdy6vk099u3ij8fd0qs650qk04uehvpejzpi1y4e68rf0971ez891drr9yjdw022nr54sj2vlhbcwh5rrmcgx9lrexyllnxe3y055rqy2w7xp5xg8te6v91d6dh5wf3yt9mq7jfbab4vh5gsab77aoj3uejsomnsqe7bcth15ok6qtiqjroqs72wu48oqyt52p3nqxxwu0ygwm8vf9nqg8g3u4zbd3rowav9mllme3g205r0oxp26e78ze1q2kst917s8jonfid5orxmujd4c0abxziagwetu9xezfloesggwkafshfe01x97owqdtqpnx999opa3nhd8e76dyt05t8uawg8l0if18en5tm1ehp97vnxk80ny43cm7x7fd9iq252t3wik9jrfn79abnaxxry3jq791pqvbd0vva3tr0w3bd9v6ufubf3x0zz4otgiq1o40kv5j9pd8hmh2zv8r39ul6s885ivqy0ojllojg0otnc41awg5nk7auq3bsi7xk2txt98hrbq8a1xyyww0j9u5xirchsm0uxdhu5vkdyjrgij5kw21wvrfjyfhlwnopwk5vtemp2vflycfgdnspn58sq55cnit5nuan5ba6tnv9m3o9m5w1k9h87yqae2m3kpifxoglnkc5lfxqsne1d45ywmrfrxerh0h34gke8nyh8uzfago0pkrh',
                fileSchema: '74gm4lkg08025cw77gt4izuf1d1ehn3an5v7d9rjdi4q40c8i8vfa2w7tr4sk1gidqeqsm6fbgqmsa2o8cfy6ug1zhsql3iidfl9ff8gt3ascwcbt5wau9jwzpvfg0mcxfju6wtcnnrniy6xpfw19s1sg6jngttfjs51ltnk0q2p88klalchz285zy5x40jhu276yqw5jcmhfbjqp4hnqkxtglvy53djg73cnoad5t1a3tec6120i7z90vut9gpnfgc8ra45hb2az4pqhsydz2ez4oytabu7ccb1lkxe2ws58ckkaj8hrxtvpg1oq629phvz4qyhinyprpef43m1l08u7xjavq4uxs04ipoo5axtkbtvj03ip1yi49h5whbqt8xj071zh0ovnwui7542nvy4m6o5kpx2jnnv1xloby1q8jd4mbavhfow2av2pd87f6ik57szoewawo8tu6dylwho14ysiejdl06ndz9dmkz36khr6coma9q7qzkdkorwrrwrdv6qgwco8u6y24cnmgwexhf6nq37x4p48g3x1py288p6xiafb41nc8z6y28rsja1m2typ9dc0h3x2g49ycie3p2369wfc05a4h7htmov31taq24kd3hc3dzel6ygotij08rced04skwx2wbnmnpua7jwdsp13vji8jn15zu7ktvef6n449o1dcejwur93pqvoktufz7a30d8d4w31fslw569qfulq3z25101m9qb51o44v3w7kfltclvdr1dk4489ptc7wlfyzxcc8vkrbn7grvyj6ams81dq0ozqjvep1alcf3rxrvyxuyq5kjg1w2dq9p2hu9eipt1yzdan5dvr5738i8z8gulhh1pgext3e3dyj8xqedzhkv74lpqa3ow9oeyhq088wha0xfucsc41f4bozqq7s338ln75i33jzigzcnirc0u49y8hp2sl14au65zdsokwf8yblwi4jjqvuy7rwqbjjpdtg2al8nvzu49fchufvf8zc9q2yws',
                proxyHost: '35aifuwemy6vxohsq66mwvw06kfrzlckjszg46198xkass7ujruum3l5wwhf',
                proxyPort: 7326804766,
                destination: '3lqa9d3w5gkzkw66khkghwsgy1065gvhooxwc4xuzc1v4jrt60xn7nxrti30rcjr4esu9bybsggm33mr4xchxuor8gow0gj9svfj4j2qv4g125lw0iqjg3g4ny55ju8uquh5cd85hcbhfhi0vmx38widkj5kdt4t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ynpmryklbr42p9yywe95jfmt83a574uymc5u0wdu7eoq8ebe6l8zcwl0ue0g5xd5mnfva414cdvawos58wy5x1ini6ct5k3axrp52m86c9o1qw9vvxuo2219ylyktvrf1f6i4aueib809whbmh4r9na83hrty52v',
                responsibleUserAccountName: 'dnnksr9tdb2siofbngws',
                lastChangeUserAccount: '0ry85m8yo9ndaodk2xaa',
                lastChangedAt: '2020-07-28 07:38:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'qhm16qi2qbtvgujm09htzktwlicie0uk8jj19whzjhm9o0m67f',
                systemId: null,
                systemName: '1dxk41x572scsr6izrs6',
                party: 'ec7qxz5wg1xy0497dp86kw4zds5k5c8j204iam0dkppxcskt6cy3mf2gc81oudy6aluaq99ecfj19jsilc89mhmp5qi0w5jjdmf4y5ax4dgopkdw4g2td6hngoqzmm5re48knhb3swqj2tqmwiam6c0zdjx6ekou',
                component: 'pb62hqkjrogazcp64h5nwhtq8mfyxhmntj9bz5w7fuqotlrajngijghnh7zwlttefnqma7gpvmqjgd03rh9x2x76xd7tcrf8ui3kb4yogc6gve0c4ruayxddec6i98qq2klwzdqlckgj0v0ue6i4dp1yr3ozwauj',
                name: '6220909iji9xsughkucqun3nj8zk6nby6517sjzl46h7oqkif5tcoafw4f07bpe5xer7jz6v03a9j6mmlxl67rzrel4ofupu4dy4ttmg7wfi8dtkipsvzrh1anbh7rwby8kfm4wwix2vzw3ojkvmf87b7opz638n',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '3zjvreijyxfcbngfwbjuyesy6h1uoofxkybuje7mew3lu8qwkgw32rg78zee6hsrwmpnw9iihnaq73pjq1ijp2gtyo62drkgc9ize8ihd4o5nmuxttpaj4px0pilqx5stvlku7p5ahozqftmaoj5ckreh03ygjjq',
                flowComponent: 'qz6clw6mo9icvetpy6fn0gjaxihmaxka72xchj7wl0sb7bwy22v5259ku71hpyh2d6vy1yf88uco1tmbshmf84kipfyjdos4num3593pmqpy5b47ag81cif57xc4ef4s9tbwd7c8o2kwvs3p3kwktjxe2anag0z1',
                flowInterfaceName: 'nnnvtx12m84895j1zqhjop1ynfbhdrni9q3afe9mjvahzg0lqbp820p9op3y6vgwoikxcbcd3ayl417sd5xb1swzrb9wx39yop0ek5moa241smkoya7ualskq0jd59lwahlpg5a3oag0zpn1nbm335etdjctudv5',
                flowInterfaceNamespace: '43c5ugjqvctxh07w5h8rv1xwlmg73l5ajpc17ej9non7mso7uooz95elypomi6zq6ybswirlxm92sw8ewl4f14bftmpcwn1s035qy8pfecos9zfkemyt9i25t9o01qr4eulaim87zad96137vkp38ub06bkh1164',
                version: 'ul5ni6mtalln2m9gysj5',
                adapterType: 'uww8zl8idw2domineikv5i7xx7oo0lr9un1c8pk8kwdbybkqsdlz7ipgwjp2',
                direction: 'SENDER',
                transportProtocol: '1k8v13znaqncdrule9retxtmtm6dtqt7hfts5adorbzs1zn6f1ardktl8sy4',
                messageProtocol: 'ekwmzrz1akx7ob3fp2i65w89m41c29enyrzcsxl3miki1c0y1rn3ctd5v1rg',
                adapterEngineName: '09sxpix66qmmf97gquvgdbqc7pjhlpd3ukxvz0zavo39oqfww5lql7bczlw537qqxz9anskca89wv6vaxr1542yl8ucqk5n7xzun08qxlsh7pt5r3520biu3dutmbc52drdqvw6rfj1ptob5bzpu8ixjuwz6iu8q',
                url: 'zgqr8n3y988x310tynk6p35p51ffycs343e0wh2jxp6xr945srx5dyempxcy0ghyn2nki2j2jaedemex7b3aahnuv08hpogbf9cmz7u97h09s68d6q3yy9c6a0o5wauq797p730449hmhouw8plpkcc6qcwldr018q9o1rlpslilwcghcb8jzft9zl3k3clge3jraik0q396hakctlvfk2wsmv9074233phzj2boh2eqx9ycs7g2nj70hfy342r6elme20u2tl1r8kgs10tocp9r2eddngwzza8dcyesa4gopablt5tmtkrkibfakeec',
                username: '74e3n7ylow0v59gtyvxwahfgqtuajddqnlnio54quf4ziaxtwmqq8ihimgeg',
                remoteHost: 'bww5lz9r5wof64w584t4ts4dxt3a4r280qefa0jg5jl1uvqrxlaabu4p279q0lkdmcevg6nq0gt7yksmkcq433zyhtdb68yi1h9ka1linod0h8uqklxjzjwmv4jyxv0dz7jmknoui313ir29a7r3vy33ggx4yhah',
                remotePort: 7157281793,
                directory: '2r35n5xs112leq08g2vwir0hp93f3ek7m4dyqee5r8p9flojqmf3dyoqg6an2m5r1a9hm1qa0fcqkzftqsikbdrcgjsj7daab4uetxm8uiz2r5qu5rrtvhbc598fd29n47jc7w8nxqzy5a8aq5ty9gzlzvpxfjnwpw8dsktkda98x3nq3i6yfkvqgpqpjzew6wuei5bci3g9vh4upe6vs1fqtflmp52lwrh3ko16lozydsmzx7x4ehmvza9a3os5ewnamf60y746iaq7nz4mc52ixe2rselqma0zbmarp8spi2job1nm2y9rxrdivb2v2fexygnazd1m8unmb2s8pcr2oz2avz8cayc657sianx8v6w5civhv1ihgekq2i5q867wn094uw8fi7umeprh9nc28y1mam4cp98v3bd2z9twalyqy9cm944jyrw07i5bkxnfk8m4j2kfn4fy7yhfvzby55blt8tm7iumi68pdy3jvlqqsapmqlgzptjse7i97shygd0rsn134zkjli7bzkyl4doqalkx345usueuh9tz81p27bewxz936g2nnr7wowyqmziyqzpj4cz0jmgccflx05gai5vnl0xhpy9aba7a73vi3fr4wads2q2i8wel9oyxfbqdir5w1l4bh1tmrfrazlr7unjy0v95di8szcb4w1gfwm1z2lejy7tgdrq2kzgmecrylvkmt5enj63mnxw9t96f0wahnmapja35mbs8aixcvsev1eou1qys24e9mltxjwkodxvpm43xwrtja2vlzxbqj4w9s74n0c2g717i6b5xkj1ij4fgfcujfagtplc5l3da5uaz5u6njuliuysm8qwalpwyl50w5ub4ofqix3ov4apqgrcbhmouqoxwvbh4w9x574kgv0o922wvbismlzvamioqrhbg1siiwla1sqdscktn92i5iwdzfwbvk1pm9hdcaq843irfz257n65teb45n1k27b9nf7kfg9e03yzcglw6nceswn7wbwd4',
                fileSchema: 'kh3ais4g0g71qdg382b2ue88qvrucrdkm55d1mv5kq5088y0a8qva77jj485cwnwldrx4vvoafuhm0y2e725tq6tlxr5yss965sq5ml0b7y50m29izsxb4m4ex93cr91t8n28qzpldmsxtotmjsujq5a3zj9bfgixnbz66bx8ruw76npwc8yjd4rjwh5gyuuled9hxspzptew24xizbhcs1xh8h7dkpuaxkb0oaj0p3f3ipw51z5c6q5io7oanlxftoexfjbgump4q8g2harxkrtu978e0pcc9mxg8bj3osfyk2egz054w7nsleqsiryxt35jipx2ym76kxayoxq5iomq4k2k48rpk7qfo9oocdp84bir11wd4b9ngeybudt6e0stf81xivfg5l7mq1185ta4ec757y9ck4k8e312pekcegatkteu9uwmku6vf4cgw524lq88hvy7et5e9akmixy2lksvm4xdcus1t73gb6a7gpnxr48qery4i35qoep6gxrqc8365owqd724xywlvrnu65df8l0cqrjksrt07qzt5gal8voce9gytgwqlbzcrjix63hw2y9rjxwahj89azo91r9r9ky2qpfj6wnmit214v4261s6ovtjzfs9l9tvy4c309xkkid5i6o9ejcyvikfjepbt03j07qv63zrtg5zfbcccg1wm4qf6327viwj71iwbxhx47k05dmukajh0grc6txtgkg0epsj69qyn5nritddsyta4gx9i6ua16qlwpzy8yxxsrgrkijeqxdad5gv4n8xv05kvhpit3eoggu2le13iajdm2j1s8x7d0wghnez09qm8iocahzifg0h6xos0o2gb8jn4gopzfuqzpo5yu2oys8ehrzehqtx0z9x28neu11rlhu3p4a2ve5y4oaopr9nlyqmk4nwmnjohv16ruxxe0hzv0cdompd4eedmccnpdpy0fijpvjlpg7my9e6xtfa569qwsjymbvwblw7pd7klo1h7zoc7rgr2hr',
                proxyHost: 'e7oh1uu6jidv14fzupzici6i3fii5zqsl9bl03d9g8erg1z3d9zzvfhjm0xd',
                proxyPort: 7104591134,
                destination: 'neq1osv92bxowzq21s0d3mb4okuuw17smphc1dbidzpbgeyc0v4thed7lxc67jitcm2skwi1c58zjg5hxa6yvl1n4yg9e9b9l2y57v6fua84pf5364zerxnuef6rdn8rx2g7a3uysu044n42lw061jawt3fe0nik',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3c5dqr4rtye01fn0xltes5f7o1cz3z59x86c11n1gv9h77taxfqxbyt9fjss613y9f9gbx4lq9i8orwz8bzeng6w2j88m0dfvvwqvijkuk8m8v5j0djv0to5x62xy200hw5id7pdykhbu3qcw9pyzrr7ondz0fk3',
                responsibleUserAccountName: 'hw51yx4ontys0xptzrj6',
                lastChangeUserAccount: 'j9j01putcxoh5j2qaz7i',
                lastChangedAt: '2020-07-28 00:07:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'y6zxhrwo5cs9gfffsd022i6zeoi4tspp2tzg3d2t12e3ntm5n1',
                
                systemName: 'yu5lnrgm0ap8xlgrj8lx',
                party: 'aoje6agdjswthk41ydcsrbo7lye346a8x5mn8e4ca7i0gm4bqyxyvrn9ebag640zhz7iprft3sh4zdytut3ugo78zlkcaabc1xa8ajz1vogudpi531acp3j1kg0dp6ph8oivsnn13y9ddvpkxhop7t65ax4uody6',
                component: 'dxrqpsygsus839qmtpet5yl6z8gk3wi9inp14yj6j8etjy705jvp9ilnq4kvz53jgq9uhvhppsa042nifth3kxfp9gfbmlqhtomt87dok5q19esfp2qahggzxartz6ci9wcib4mrvjeytv49o69iwbthl2i6m26k',
                name: 'hkngwk0haeisskv0g51p3e3gyeggku1na89qabusxbkm1b16r1zn62ft7102d901vbdztv06p0tvbvvauj67l8x3tlow97w6wutgn95zcdxg528livrvr93lq0e9g5scfzvhpsanvad09afyyqz3jtpbp1mp8lph',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'xn5tjfotrli1sf9z80dmm5jeexcl39knnz2b1ek2zgrhzc6xtqykndbao725bc4chhq69j56zen3b5e04buq471dqkahrxajhwojxfmxjo7aqiylfamk625xpdcidu9z75ssz7pgr0w0h72szgazcwa5u9ft34xu',
                flowComponent: '6h9nv16ku8vvquiv6fn8sdn68lhh5mihz54cszaf5y5fwpkvjc7md24omj4qfu8putfrjok3fwem519xu96rcm6itqtwrprc9lzpukrzxwe2u3w83adr33svjja7k3y6vs3xffqe564nlxryhi96aqjxf9c7v7a7',
                flowInterfaceName: '3okwi70kzvtwzyguhw2hiwt57jxia300weoeaeegwp3gt86sxfqzn6m67e9rh78524nia86h7w8pkfnr64bmjvhv55ij3r6v33rvbbs1vgbdjc8nccn4u2hrn9ta2hd4ptb5j11rfzf7kemz1r6kvu60depl186k',
                flowInterfaceNamespace: '31gv9t8slko1gnz5h1o9mrs5wvqxgau0o2brtmwz9kn2et5al5er3uzyzmayli84i7z0cmfipx5qpgtqxu3bw6ozxok7k5weujrasdqyfs3m6kznd9txxh8fv1t2coi0x5cqtprp8dps1g0sasutc2fe7cu86aan',
                version: 'x81mglfdveed12hzr7h6',
                adapterType: 'uxbt5baqbgbmq0auii2voddxcp83igfmlkjko5za09lvprnnob3zybakb1rl',
                direction: 'RECEIVER',
                transportProtocol: 'gnzd7pmkm3exrent2q3wpe8fjk2rt6ytgq6lsv6ioztffbr0ip782qerzolm',
                messageProtocol: 'yopikwv4f69b57ciiwf1qsga23njshkji7cmehrqz0f89equa4p7wtxmdvjz',
                adapterEngineName: '3a57ua5oakygwsqxi3p0jryuzenjmzldpb1buq22z423sos2xq9eoi46l5mls00wlhis18drdcz4nmd95du3qkn17qas9lhuxd7w3g05aa28c8gmklojoqv3tzhi80pjks1hi7tpyy7do0kcy3y6x4vbcbjt6o0u',
                url: '75lml6nr0dok1d4k6jisv3ad0ccck8gsmea0nnzzn4zg4tza9aqrsax5655l3iz1m4crslyi2bd1tr6leyth3x7o63xdutkamaqshy3ni92bh8ehwpon5xhou09h53aixrz3ao7jfbtoldfx3o6gi1w1c68svgs21xkb94m6x41vlohzy37ov2cshf1jwfhl11mvczmtz6m0o3lrso1xobkzmdjj2kxwhcu39u4ec5nru189pghzwk0af08dprpdi4apbwiqb54eb07y5gw5dm46jzjbmiovfwg7lbm8ay5gj80izhdfb962txbcnq3h',
                username: 's4sakamhdt0rwlitnl3w3ub8b0p9dz32xtgjwubtqiid2tihc42a54oywgxy',
                remoteHost: 'xywavdh4r4c93gy52th1teqqjndwkdjlnll0dvclvbsssb2nwf2yf7lhooirmrrspxq7ah12dbhi08ar36g6uemib95b6eshx1phhcwy44nbx05tusuxibekkt89kmcq34kdhb4lwrlkm2e1ru2g9zl93zv5pgcm',
                remotePort: 7413314574,
                directory: 'cy5unmx2wkqydfsctnm8ylsuuphwl8iqtvmjh5k8fus6ey5vl424f9zci8zqix2iwqxwg9dym70kizdslgl6nwii5aqw4piqo6dahas0nrhlk3vw3oyns6dgn3nsimqill5v9cw026m3uazfqkchmp9lgb5j0pbz7pgsqyn04n1v1c3n7h9qq7eaey5ffz2c22cwyntr2snin1cze35fos61cri37zmxqprr7t0qcgsf0ea4ocq5brysg1ghrvxmg2gf8ign00x8ilbf50qwryaesd0setlgyyvu5fadrxplfufr6rik1n77e855fr8lbhwjnwjiw4a5xbrg1mgvctecq52icnhs9vjo5pzkokfcc23zg9ld3g305lp08mpomdqf4j8b66ficsew84qf6okraeubdv5r4ufbsc0iis5a55eefn3xtx18s6xlltt7t0b2yz3jruez9qq0k2fmfwma7e40foba66bnk5zv9pxhv3i5akzv2yix3l2xu1ul7cpwant2ego6e4pbadhqa2dytbxekwazifdsto38fiu4ygdv0bhwcvf0jakbvhmfqttkndjd30ks69h4ag0r6otbdfxwjzakcmghat9551whsg7ay5d9aw60g48gf0ffn2nndnvts2r6mo2cfng653k5r3vet6w7uhx10kjj9s50d3hs4xm09o9256b8vno5gmtg2yu4l10o0shyzk95httw69ae8gb18illo3s5u1slgr1vk5vs2jdibo9462dddcq0qnj2wspng06idf035k1tm2h6676yevtvgzzisnmv5950yehy1czufv53bilpe3p0ijl7g06ld59zussxlebu08nukn4x1ptuv4c5v36rilgp3yq3eautcnlypxvyexbsgvhi30tzpc2up65pgjkmursqidix6byfnnnisi9m5w4dlsxg89mxx472130epovxfrm7qkcct1udgpb233tg3ac3y38f0wr671q5umw9eqcl5g5td5lpvi466s90',
                fileSchema: 'atummmcsp78isxud2p8eqxskz8qanjg4esvtw2jqjr5rr5fbsmvbfoo1edr3r99h3ivxlxian9uxceke96thz6x5czlv1u1r2jzpf5zmaius5a1u6uspzrvikflni7vox59vaq0ainaqafqqjgg2t90g04ucn6sm211w7co81hlizl3zwykfh8yvckob35esjmium9j17vyjmoufzxwh7kx107gg2jfo72mr31vdtq4zfhv6b0rvasfuxt2el0ti717j5j468k2wfjvzg0ik01cx5k50i6coqwew60rcn67jle34kahh7b00em5szcwf0toycv13xbw4gd0mujgxa7il4wcgimvmkxe647m2kzqx7xn2llrmk6autalha08zh06bncgpi2t9m1slo3xvkcu0f30umzcelvaxo5wqbc6h2ypqwierdr2tg1p91eosx2kr9s9xbkgl2852snm6v6jk4r4sgrxfmz3tjadvt3a6oq43otp80e4yea4pgzz17lszfo0kiazl1eqqw2x1mcwedp73gq8nj1ug3z7mczqolw1y1fbm49sdjyjp7kp9uy13atys5x6hwu8cqjjwnpj2otkjdlzsj6hgguoimcks2001u05g2cpza8l63zqqt7c64rwhkuea72dci8w7q2pje3kt6afxl5n8mg3l2x4warhzkm518u8efzxik3n17kdxqtfuag8fbjun6a1xyhq8tlvneruwluvz0zpe7uvdkge8j2gjfth90e3r86hqjlwgcf8d5wk5xxu1dq1zjih032mrscxkdstbm6uzfzpqw561t9rkpusgqpod9oap30p2chbzzycr0ctzqz5b5hl6hdq53komwgegjpm9y0vuf5agbhs1f8x48cjxzr4ctqw9lkvrjnh0nn9nnucorrn5b18xkgiw443o3nbv7j5lst37b69mf96fmfyia46mwpy2dz30nhvmo8i9922fbtk33tlbmjif2ubpndm6zm2fhj8dveux3ksc7xizx171',
                proxyHost: 'z8jtp7l9ja7rzn0cbzwv40sk8piq3yn6on290a8tybaoqxfl0vp5otivnpdq',
                proxyPort: 7393785641,
                destination: 'k3n0ipozhlne7f6ertnci97m77hecwqmjp4bftgfh1t8y81rv3yljfzsxazjhtpusn4vehx695mr3rniyyxv0bgmt5ara821p9l6e3lyiohp9wzlui16v9dytw3h3bm095z79d54i5qtzyxof1jezgbuvb0tt56x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nqwjfyhlkf8grngbqrll49mdb6uov4gxdkzpwqc5xwjanuao9zayxjnjvw29vmhcfzw3e1gc6leo1sobrhj3nj0ho81xdq3di1scc0vpfnsi6rs3x2azi04oopiw74ctwew74s0q4cxhajy4q6lbjrxlrohbfzpr',
                responsibleUserAccountName: 'meidu8m6bvfjrrkoezvs',
                lastChangeUserAccount: 'igbpusp3a6nk6jm2ovyh',
                lastChangedAt: '2020-07-28 03:08:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '1xtwd64d2ekjn4nsqkw0o9r21a41flefg2uyoo7r8oy6sq3rkt',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: null,
                party: '8mkqaz3isgjw0ivifiznf6nifkij56f3hurpr810rvx0csfksy3sy3nwzwmxmizzzf69464fxfmkkii76fcjmzgyp0byo5g5m6y5hxqhy2q0832qvxwmcci40wnaj8eb8q4tedo979g5ne7ovm28wtzl6dfqe148',
                component: 'pu3qbxie2831zcsk8eicbhxepgarhhh0znrmisk0kqekwxveg2su46nst6o0j6pdo5b8i451zy7wlkahxyw38t4vc7nbcirxc7e06jxdfdz9zi19xxp3zqq6yy04300gh8nk6fgpc2bam93q6osd3gyqkow28a2s',
                name: '0zc1uaf9p3g288vl5zhdi1xnopep1uep5146nx288xv9ap4ns5bgjlvoctcqgtlk1pgyjnp6bmcatwm7796txv6mv4wy6izye56kdf4msihsl5kjldqofcjjyt6sxultfdtks0dtasjmjhivawhps1mbu53m0lbs',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'wza1uvgi9y8mf0dtr6huw9zophd7tvk0n1srw3fxgfuqykcy19qcvsqgc7lz3ajraca8s9rco1wsh7n81kaublgn9hp9kfwnvszirfwlc1isf2toz4xv7dwzmd8680fkiaxbrtdqbn2p6x207udzyt5z3ddpmj5f',
                flowComponent: '87aa42qis8tlb734euwbycqdlblt8dxtgng3sbkbv2r1ditgsyewun6kxocdrzbh7f5zymkqlfe1wsxqmho936w4w5xp13uln8zegg8csfoqxsevr4a9sz3zyfdxao0lmmusg9pwnmklm9mreq5rhl9o4eg4s87c',
                flowInterfaceName: 'hx3itm1a4o00xcui5nqxo8rs418hp6mguxxikr6kk49toos1pidwi27ho7tnk1y3ecg1t1nbu5opls7lazxwkw9ov1wepcam61k14taz496z1e99d4rzu350n7nu7kfvwmx1do33urs2m1of7u9w0lu0x9ati8xc',
                flowInterfaceNamespace: '8cwi7vm8ttnpskgzfyo4zx2vmuwz657l8p23f4r7gz23albl1u2qqpuqylv6w70t94je3xljiysfu91kkyx4cvb8sjdcyqap01pg4jkblrmxeucgmu170xhb0phhxx0m0gzf45icmt3gj2mg42ljcdwdpr6npu25',
                version: '91lerh1yj2po745oj58m',
                adapterType: 'jf9t8glxii5oezvqfmlvfqrit4bpi0ludvpvaqnwq0nke1lgq2qyoimhuhtu',
                direction: 'RECEIVER',
                transportProtocol: 'p2vuhidgkkwse27dt8nwop22pm3wypp9vq2fz5dm08d6bmex4bs68fcz8my9',
                messageProtocol: 'aap1us636czmfrkuztjbq139wwvywp780955lkwa64uc4uwcdcmhj45galsc',
                adapterEngineName: 'd1nmizo5kxe6yydno3c7ysovw1ngg7wy81tuono7gwnf0jo3khmzs5v4orw1ysbl501l28kipnwi9kf8y1lnmclqjvtrvtj9pqw2q49xsekz7dfdt3jp7ptzkczppr2ac7udldm0whk52x7vjqt32i2q2q519qje',
                url: '5hox7ogbgfs5sb4kvsw892zqklquw7k4r34uf27kazynuonznfbxlpi3hn9gg4tykw1hnz60jui533pkbsuvh76hwoorl7hvztovpl4xvtvvykeahgb8dgsrzqfvwnlpos9p0lh8l9c88v7k2xuiekke9zadny4a8qy6cewuxgtm0fi9q90h9120fei9b57xmxpelhrzlszotjbhnbyuvmc1dhvg0y4dr4jxi50sls2fzqd7z2wl8ra0uqgap6vulagtgc4sztavdeaz7pn0e6cgaydunnsd0ydao7gschmt09lfmaloq7v34jslw44e',
                username: '1nr5qbrnoj3xaas6sfvy0ln1ppznc23fd7w9jn8438f4ef0z6ymewzoieirq',
                remoteHost: 'aawejj7bm6sq6vzgfv2a8te8spbalz4p0dqjlnkrdhi1u40e4sfvdn7bv4apv53ipn26r0br2gvxx5pqmsv6f7pz8aukf186sb8kjnadcfyikwnhtl620o1b5j6z6vhu74g8oot2juun6h81ak3cj7wenlw7828m',
                remotePort: 8725840032,
                directory: 'zhhm4au75hp3vxckpj0m2xl29l359y792vrrd7os3xzptay7i63jx1oerjn398nlb2khyx2rcjh0f7wyz8iwnl6w23dwn74ns3z270thrf40b74n6zl1hrlwt7dw0x9aw43gmk7qvawba6v2yt5qxw2dpswuyfiw1flrj7udzdu2dgbrv1q1qiibe1z16ciusyabvyob51jpqijmvh4mfrkysxl6umlqzwk0lp0l9b3rokct7hr77mt3uj4lf3dde8acr8hfdhbk0t9oqfroxy755q2axsnf9nngcad76y0b1zgmnqt3ujqey6w01x8sr5h42vq7zwwfd4r4gzf44l8j4x5papbcyvvyicu5ms6lxx8b217w3psqizcpl7zrq3qe5k56286j8u4g8k3vxnwxida0gmeqwquejlpfgfjdb6ury7w4mjhfk543eogh9gukn3zbgwxmbfowcxkkxxdplut10rc27qd0ygrikg25rxo3e88bj419rpbztirt7ep0tdng6xxgg4w5g8mra0msy6dpitr5c7lolrnjcsqbqxgi53s2z1namxtc36vm2nxbm8w6bbf5q4ml9eft3pxof4evhsy67s99cns4xbooxy5nmgltdorvw1gyx2sidnbj1f53ovrxmw114u013wl8rsftdotsrd3ogw0hh20c7p9k9ncihzmpmwz1zou31hkuf0v1bm7ulo0br481vyncpcki831rg0gl74msuvj0oebcnu6x4bhqujq7bw3rfz7db4l4eecvs9nftdcc631b1kmianjuf294xthmjv0zc0n5f69tes7zdxhcq1rmoo92awovnx2n7z3u8jypl1x9ll23z7ty0i4jbfk22b89kjqt6le346ii51n49gsyx6vosi64cve1nctyl336jqq94ikpgv5pvslm1cng1supbpb9xxrgk0qloxjbyfmtoctyso6ip253yt9f8oifcq489bwwj6r4xiubx109o58te5sq5r51uuctocegltqn',
                fileSchema: 'l7i3gkc33x674gj265vvjfsu3i25xy2pjbq7v580wc4u35nqb15m7ghpg74yj5ztronvgz14fhmqsslo2dm3g50hgocbhga92a68ri01iukt1e47p04ga2x251ued08cky36iu6fsfl31vxdfw3lsjkyf9sfzjxippcg09mmg939r1s1v4u4vd4a7dmlc0bjjnfb20fsjgvjmkmtx5j4ixgn70nd4gnx1cjqssxxp1b2f76qo1m2e7xhrvojgpf2q8c8p96n7dan0wj0p8j3sxpxufjfyb8eqdmdspoatcxrqn5g3lngr7scforfx7u8dai4agry8hwhcdygasiczcn7rmcv6mugzyrb3mdvjqv1fjcxdq58beif3027yog1s8t5b65vk1j2sxhe1005wn3jzzeq8znwb4o85b8el95ev0eegu3gu41rs22xbww7cib77fyvuqt7fqmf2fz686q84gvcej50d2kbvpsh2b762dgexrpk3kgime4hqnmc3xs78g89widskzdnhak328vkypcsw18tpso1dkmyug9ugb4ce4mnhqyzg7mtpvfjupyw3y84lzdkx0sphc68jizt76zqvn597fxp2yd2p96p24knzbyp290ssp9xgzamti0uizysguouj7d2vqln4gqenjy4e5irn30upvpaiys0x35s1jmttz4m4zj11f72kyvo4uetdzqeq98gnhrlxt6nxitfqss77qhc4h9lf6zfwqh8vzkztl4zlha409jx86d2ll3vgnzh6b6d8z4j2wvtoxwqpiqpxl6che0nwndr5faah46h3gmwbfepa1nesbf16t4hil5nj7f043jj952symd5akl231kpz4ihn86efkff806qyq6pg91n85pvqmcb8ocfatsj08jqye2i206949xc88dpdrt07282ukrtr901ubqh8bfhsz0wzf8hxkgmuu2lk4o2rcijfzdq44seg8417uzky9p4j8wwao6kz43p02w3xapd07mcxm2z',
                proxyHost: '09ao5j47jm56b5c3buz28swutca32bkgbdcfngeqd8tcg0ig0wxqabwroj2g',
                proxyPort: 9836235816,
                destination: 'wtlf392fsx9x8eyz5qdgchjrw6uml3cjdbo43jm2fmf9yu2h0ivhuo8qd0re4k7mwwm7hgc5wi6v0xo9gyz6s4wlvq4j6a4guvx5j3x6i105pbk8vd9z0z5lsnn20344wrp7h4x2un7timas9dfpm491itcawn8t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zc548vg9bjg6lgi6d8hsq1osjabu0vgjuoajd97op4zaybt1ajagyo9hp2qy1ph8khxoeftbhbraltf12uie3cw76c9o0zw9tqimymgrp87571kimu8yf2nb98x3bkkymywuohxmfyzfq5nmrukmndbamuqjasfh',
                responsibleUserAccountName: 'dpjyfzeoz3alp800l2on',
                lastChangeUserAccount: 'bcgejjqv3d1iq852ls1p',
                lastChangedAt: '2020-07-28 08:10:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'lifqkyxqj6idcmms70nl7ajdqtqbb4vv6me1o34il4x2m5z4yi',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                
                party: 'vh8qggkijuo7oiy4ypokxduz8le9l714cuwog9hebh57o0q59ec46c1titkyvj5hjqcjcezmaj059vl5493ifpkqq68wfzgewui6a2zuxv3wdui5u59dejtrt9lgjzka76sjkqg0se6j2n78v0rvmlen6vsmnwoh',
                component: 'j6xp96uis165yy6iv2i81gbc65t0e9irgm0cuzsz7v180lczz4og36sctd5fkx3lkj9yu76i4bpwy9ecqro5cdjtrxi6ol1q8ejkgmxjcqxe28lg89f6d7wdq9utxt38tpqptgzos4wgw8jayktuywamij2y9s48',
                name: 'vcq50cxhhpro15kci2vc66dk48w8ewawdf8g0ta77tg42bc8azp17cbsj4075lcp5lz5zong5q2h1fqvxnmsroo4sotbyfgck6wgx7v5beskrlvsf1ezl2eq8kghuqtd3ekxwmhzgtkxlwmo9su5t5uqxlgper0j',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'cawmgmk6w3cxv41w7jyfhqhxg3v1ipdbgly2ueuq2awlbi3esl8ldwdrke1ulyd1p9u747tmyp6dia27o3a2kwecsss9g6cjmlbbwwhw4yq1jlotylyo7rkoy2jq2iwbqzgldw6u1vhmr7r96662aa3v6dkgia7n',
                flowComponent: 'jpcd2pumgy70te929vqie9aukbc018dt321ze6m2nv3qwkkas4v836rbu5eu2bgqnav8dv5sew1goebji7aaijvbqlb38d3mizjp35kt2i7fu5g5rvbgmnnzjke8icckpfybk8pj9mlx7182vt1qa9affdjol271',
                flowInterfaceName: '07fuzt4o376mza7uzy5o9ba5qbuov741r554d6v7x11u7pelehyljdn33eqh8kh60qgou8kixupx68pq8oc8lufjsg2uk87holol37b8cdrjd6whq6stb6du2vuijvate7s4xaff8z765wud1h9ffgq4xunvboti',
                flowInterfaceNamespace: 'pobszdh4coao41vl3pdw00f5avepe3li1ak89fyeq577u50d1i9b4uv2v3e2ugjfir3cpmjsl5hj4iylvd6qpb30k86obtjnhroqrrjv66vf2pyxz790jjzawjejbwrbqlqj3nop27ses9gsy21agvnoorkbw0fl',
                version: 'tyv98ijmcxpuszver3sd',
                adapterType: 'kb4zfd2zg59rxxx79avctgj9yblxaxdwdheg55xxk5uxha42480ddrx459pk',
                direction: 'RECEIVER',
                transportProtocol: 'imkpk4t4d9icfhl3ws12zyeh0ap8to6lx62lbkijs8s7rtgnf5b2pwtw1xsq',
                messageProtocol: '9gwyx9sq2rzjzhab8xmknws6dhc2fj6f5q2nfo9c8jh1ww6ixhj8cv5riyds',
                adapterEngineName: '2e6exn68kzvj8r24nsdftghnffvn7iuaun64ruox92ibxfrqwyewxz7i73jsgm4e0uy5g0dlvbzo2gr4xxix8pukop0lqza8zyfqv7nu78tfq3a9py2xb9njf2etqk1w2kxw65q7b0ygzxx1fhi1ptl10ghb05iu',
                url: 'dpw8oj81k064yskfr0213p910c9wmsxzuw02pdmgjqvkoom1ywk6kiba3bnkyopzzv4g2khhmv6kgv05acllos3kw2vc21gbr5fv4dl0xh3jf4bqz4nz3ptui7b6pfxh80lg2n33ul8e02qvbkb93h48xv3lo8irx94rape7l372c1xwjahvt2orw1zbwcmmls026zrs8wajqc64r3sgcx88khjm2suh8di8bse1ce8k4vb0rsmx2x5rsycea18juzqyr37whh2lv3q4danq4263ftzt0xnpwcv6absoqzxwc6idfwnesu9vfti0s7g7',
                username: '5wh8xoi98kop4skp7mhdbu89brme1hed3jxzlyxkp8kg5j07mzczuexzs6g9',
                remoteHost: 'x59et6nhmjztnjevciav59cvqagxbkpkmsmhtln4tgcxf5pn6cu3fm0nvtwndh1m26rmuyg2i368xkkr014wx3ees7ivfc5i7dnapra890hameztrvonoxlebo66nzquw0blnasubsyvnlqr8kzne5n589tk25px',
                remotePort: 4071614323,
                directory: 'vz9inqksrnwjs0mpi6zelh9gz0tspdknap3ehrfwywfz4o8a3040eabiprrn9ir0pz5v31hly72rgrinxb9gaqdk5dwkeuz5y9z50eyyalb5y3x6m3monlhd08amrnc8mwa3drr5hi8yr03ceoteg35ns8girextdn8e2ijyz2vs1ufv4ptob9575h3hnsdgpxtvwnhjvpsd01hv2467gkb3i7f02651hwz6y84htzg5hon8y7ajlrf1ngfsmo4jfmflt1s6j2qk98gjsq756fm3ao5fcbqxu01j7ni8e5f8hqvzuw4jgb9n0sno6zhm9f1pjphqu2mjpwp4lcbbkqe2znqhqtknfqmvpmb5wjahejvjjdxjla8gt8ocmd21urkvyy62qzubywvswcgs2xdv0aa2s6y0iny9qp5v9o5k75qjapzhyfc97j3vzhtixu2vhlpthqhz5lina6b6cls8f60uj00fokf3l8p55l0p79wkmesfv2qiy638ewnwgbyfi6xcmyq5y7xfli8mdhh079y2mlevmqh55ib2zrxcmejv4cublyf23003guxfw7z2esma4jevsm5iedy2w1j8tkq3qyzv362vtb9br6ykb3510u7ju4x3g1yevk3z7lcx6xulum6r8yggh5s9kxfjlou1qfrj2ozptblo8l3enxq85d9kal1b01ygmnzei9kjk7ie5fjv7g28db1rpwx3vq8oqxcwau2lxm28njk1os3op1c7ddyky84aqq16d7dnm3b7osewcws95xf1xnrpv7pninp68nvd50y6vxm7pbh6obw285r8xnoetwgn5z3e3a3yf9utwgbifwpgnovf0wz0x4fvzq6cf45nfr1gbalr4ys65jr5eshqodcmlojqrn7f0fbmjc8we8ilfeqc87uuzsjehglrbo91ogljd9p4u4qu26nyakrbaohik6yyubwp4fki0jtvp2rfbdbg2wumrmziifs4wc195nea043er8ajgw6v48horuqd',
                fileSchema: '813bqxq62pmkvrqxfvmirx8uxb9y1ua63dv8rb05bm2u600t2v0x5zz2buhs61zncmljn0s18nce6uy4k49t0ug4cy3g2xcxp0qf6jq1ny7hy8kfdcwpo0w5zos5mn3147aopyj9t1wcebl0f5t8ikjndzfq36o59z90z98qnmzq7u1mq84dz72i907ya0m0rzsypyntp282k884xt6961xxq02gks00c2dscwjoej5w6qljihwot1och8xdxlquv8e3fx0ibabjuu9a51056oqvpet24x6uyb5070xxdpe9mcm03779ahbni4yvf6tagev1f1it7zg8wvtexu05mtylo83fs9rw7r75ylmr6vlew6fh5zsufuu2p22gm1rx3m20727n6r96kglsvp517qvbooouvvsdjptb0v6m6t80k98k98qstgd4gen9ur1s2bejw7hws7pv25g9hj2yg3j0rxiy05nw9md0em5425755czzx7cxz8cvo2qhypvs1qhosz0ewgw2ug1ikz0xzs3iu2crlt58hdpnsdpr7aun48s11qtyj1beiqop2r0cucs4ssmsbkejdnyjaauy12dtdtszbrbab22bz9axzcmylgq2grva45cb5fhw77bkru2o92ki33a9nqiuhm7py9croo574c0bzn7qwekri2y4enn2p4wkmawpm3ulkk85bhrt6z0uhyyv8fjj4w5htft1tpy6szx72memw36iv10volcusbn6oxlcnfnrnurdt5gklald3irpmjg7oxp8dxntnrc5iugllhyxu1a8j3muriarc5sjknetdn34w8x4m9dzrxs0xwye4vzopo2fqdayumywlwssdjiecr70y9gjcxx6nd5r1s44gs74rm4tywee9im6fqzu7x580bggqi7j8akppse0luxawi48ymewcvo3v0806usvz1ej4yn3h7q7kb5imam894byu0ppr76dyckuaezs6csizycsr62nzb85f5yv05ej7dsm38rc',
                proxyHost: 'z0kwxpjpa663g0snvc7aoghm66572ieoux8z5uxh9jd6bbc5dv2xsj0kn6lt',
                proxyPort: 1019641130,
                destination: 'ob7h0f3qo8sz313a9l1nde2o08iqid0ncezgcjutkyd28gh7s065s2hmcs7x8pxub2u3xsga4pzam6ztcjfp4oi3qz2jgm906nu4b5l8pfx3cz5q29hj0hnwf212xzl8lie6xfq111h9t1swavfgyx44zosn75wd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'byfchns7iv7d2e6b479loxxyhqljurwg92w47nfyg9tlv1vl738ytqw0kt3ewcgcyimqqimp614nbijhcqmfnvqmyzxmmzlp7evr6ydjlgiv2du7m4mvc512uvcno31vaqcnuh890imbxldubh8zgcbh1dohzfwu',
                responsibleUserAccountName: 'bplvkg2q2rme0y6pmr35',
                lastChangeUserAccount: '0c2qg5nt0bepxekh3pnd',
                lastChangedAt: '2020-07-27 18:38:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'xvbfxbwbxsiwwm5d0vii28tltopl5stp928xyc7ezff0nt5ihj',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '5a5awoiqcwfpow5zkycy',
                party: 'uzbybitbb76x4a10a8qvtbw9mov3fbf5klsdgh2p6grx67lw425x97ey4255oil4bqhvtrlep8b9dojj6cajst1dn1a9t52oi2xani9pxa30escfh9nyf9z866dge2e9ih0x37k07e3vowuijhvr7xuzgkc5c4g4',
                component: null,
                name: 'ob6xznad3k7x33qvdfvxnewbj0l837tzpxlskmhb7p1f2rd45grpa5kjtqh3yf0s2sptaz3el3f8xmvddve2mftjgwws9q3eanlvlqbbn1cai8bq0l8cqo90s5w8fi8kh6b3tyq0985yvi9galmquxf385jqsmyc',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'widear2q94u6ffksmvfjjsapiegzd33o1mm5yijlzadiz4n4ne2pcjz859hb7ugpntghh78dd9qcb4aab16rv81j6x84z624bsk9mfmadcfnq3oen4m6xbkng2n8ukz0apby0up304vajgnvufmzw7v9w765enxu',
                flowComponent: 'sgfupbu54buas4trs2196b8mglvcuks7c2azihmpnl3pqn5yth2guf1gk9svzmhbkjxqkpbtna1ltfiqd55gjwoizenly68dto3st6f3lna0z9coc0u8lbbqzjscf8413253hrwpoucazbpx13o9vp5b0ts2ny6q',
                flowInterfaceName: 'l2bx9bi1rmra5ls9g7hpnglaau4a10yldkmmogmgqrtb5nksos7ilj3hig1joi54lubl4zqzur4vijys0o9lh29xptjcsntdive95tyrk8gig002955bs1jahowkquo80rnyvtg7wdfz4y38v61vyqbf8riffxy4',
                flowInterfaceNamespace: 'g7b53hh1d5ugbjwgat4zg35tsxb46nbggsv1jj3vbigctc8mf708bc4fpzggvcgp94f5mmtridufuigbnn5rqxsn8r9u2t14cdv5eravokqtmzd1lfo1dhu4bmlp4ggf2ngq9u30bilphzoym9gzswhotm8a0mz2',
                version: '5ehzbxfkbet54w5arx14',
                adapterType: 'mwcd3n90n7jyqqamwgxom6gun4erzmbkom07c4lzm08e3kr51rojcpu2j26h',
                direction: 'RECEIVER',
                transportProtocol: 'bkbu3oc7hmu3eod2fq7ifzxbg733q623nj13zwe36w39888g1o8n5vpawy1r',
                messageProtocol: 'wa7xas2j7hmsnchpmmrdec1rju72wj4y6khno35bke34fa18jp4qtwavju65',
                adapterEngineName: 'lcukc6uxlr6a0oceitvoa0v70zglugrxxyaa9rrrzdtxllc2pdvhk6nuakb9n5kg4v0sxqxh3lrf31dhm8l1y717li1z6vq8f0aicxgv679qmpodzd4i0t4d059sadeatn8ppfkoauhy7gu9z9uz86tyoooy7i97',
                url: 'mu03ttdowaaj4c11jmul9189hx5kuqupc18gyces0t12p2kltnhiazffeq0ij51455p6hndrgujw265wezk8zjsz2gz8fra7jqj3nzstahh9lz9ammkgxmenqqkpus3n1baqsguij1ksufucms58bza0q4qsoqaygq8snsuortsf8xo4vp8ofxrfp0bwbepes75goe1arbld72f4t09wk73nme8ap47yqo455m0mshg7v7t98ylpeedfpyhgipqoehqe18tnq2q65mvo0hzf7jewc7s3bzupv30m8si2t9paqszdj0sgzl4uveas2pr5',
                username: 'vytl6ksn6nxdx3tey420gjhls7ak74qq659z5t0kq2cuskt1n5cs6yugm9gb',
                remoteHost: 'k4rpo7m1qjimjzpgxvone7elwxh2qcxbfnhmfu6zb0koyo13c8edhu9sbewtz9ojvn2cdw0ma6o0pokm0w94pft4pjsm2eso484vmaz1xtuhn2fedmpwvjm9a21rvf5rtma6z1a4jczlju0984f8lj58y6dcdddr',
                remotePort: 4217724498,
                directory: 'hq4djabuwny8kcna87tex8e96jxssgno777t42tblyr23isumjqtb00gx55iy9swfwtwtzuhn0s1at5yqrq8u58km6f94z17mnnzoopb5g5dscbgt6sb3i2w7mf1kdyuojdm89bs8wof6d0fe9wfa4owveia615hcrqbrkvzyqkrfj0yqbeek34qglwg85a2x6nvybdtp3o549zpy6ag8swn9uir67akvw6zrsggqu6cl29l5ld40upuaekuam1cqfownybxdgqrkht9xrnucy4rjx24vddt463an51udz3fqzhbdcjobt4291glbyo9144qdp6bmpfj3jsskwn2ye2atimuxindf8e05e2td92iyc8umhqheoyprurzzhffnqgw18rn87dtvdop36nnrnv5fuc37319pxpbpqcm7r4zu8fvolhlzul4utqc88upyq8k12gv6y1xwb764o8eig6cty6nx4zwmvsupk37tvbzejx02153udoyaiqdlhti3v5mdor4ri4uq6uwwofb5vkkg5a7twln7czprtxmjprnb8cb1snfzblidyk7plf8no462gnt89vjazk4tu8xztjfvhloycpeh5bhkekrxk0v2tkisafh5xukgdo529hlyf0o8bhwt7d1pcz5h7vvkmkbpifhgbvbfnoff23uwlyzim3ptktp1j815nvj1uoiysc7ech8myh60y3y85foce4h9nte6af3csw36o6m1bsghaxrhlpcf04iux95ackhl27q20phc51y5r7inm2sp1wpmi9wcnke94tmu1xotg7kj7gfbqew2bh07utfeowj67mirlrpm0ace611w91f316ak7gwltwr370z3jmperee8jrzoxg71o8x245ct0mswe4xhc7t5494kn349ls3l8oa07g6paunh76v95k8oyhkfbvcva671l72lgeyf1ct7xbottv3liwwei34ejte0m0e5qac6hqx8w1yctg9ur4ejtb7zuu2q6umvjirou1a',
                fileSchema: '8gn1bazvdzm0p4fbwlyqvhv1oyk1a3gj9g4733wkjifqrb6rn9esxetys2jqmmeppafooc6tz6510p4re7ri8bfhy5j242dc937u7zyjfjnno25s8b8vnb5yaoioz84pcsyo4f01s81drz7wwqqau8pid3tvsv2sqxb6xldpn1g5ilsp5gep8jfday7wgix4ldi7t6aymazrfv6wzhljk1lhvj3awsfs939ze62kd3ffaskhu8x3abt7v1l09lalvjxkdzudmzjor472clikzrm9nccgs0cmk3nuuvstasgtak7pwumsrqqncl09v9yd0anlz0i37350mf7e9gt27c6lmqk6k8pnqv7wa1ijuwob7fk6fvfvka1hevw4w8j17cqn4v38plsbkhgsi7zsjlkzqdhb8k0ygejv6aqfckwehjghay3328972zn2ff2s3969qc2nvfcd18lfnyvo91zhlz9e3zkotnscke9gopz93je2z6tf57nnblbah5e4btfg1l7lvg6dcwi5mh7e1q0dtehv9vhuolohjy3lnh2uepf4tvlaftlq0836xpkq6fv3n0qzaspym8i87umzaswvjynf6g1ezlimte3yt28w2jh3jfoxn8x4liijrlr48ussdb3htl95zl6uiqobp55a287x1dd7twtnyx6dabx3td96plp6f9cjaxoej38u64mu3mj9u4gpmsh1fvjhzkt9rpwd08myhh3s9ipi6a9d9dhppwcyqvu7bkyaxmit4vr682yoakos5f4bb1ffeip124olc418z9wij4pot6snfzouh6c98qss1fh99sdvaq2ujcw4gejq482fsja37dpv41p8nqw59c0nfpxeanvdcnstdl6q9vagqq96ax7k3x4dy2mclz2y8mg2y38dn1xkb2h5c4pbwnvtpmn85gp0y0gox9m33083nnmkwlsgm0q0p3nuuenyg45kdbhszkks3314474pr996prtcgd11hcwpa0ob1chy55uacvyn',
                proxyHost: 'rs30darn7fob49n3unxr2r31vqv7ikouzxw5u71rxx7r0jhdnnebfve8uz6m',
                proxyPort: 1818737398,
                destination: 'a71injl7eisbk424fo4v3gdcftf3pyxesz4nj38u46yjwarprgkkiwrivhlo8nncohoialhyfkafzpw13jsy25qfq53ndv8lrma3bt50beoxly7wkbxkgwkdo6d0easi8kn3hj8g672nprgelxeb9obmtho64tmq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hrazlhi1nitgaebohqpyq1xafs7627c0j1wnmg0hqqx02hxbergkn33wx72ji1da5ccgyemyafrhhp8wsp6vzuqvxzxrlotxf6lfs1prmsdeet2jg2l04th0ivwqnjwbrmdogkbclefh8sw4z1ff5zciwlh9bghb',
                responsibleUserAccountName: 'yoduv7s5pw6725swbuzf',
                lastChangeUserAccount: '6e106mp226ucqr2vqx31',
                lastChangedAt: '2020-07-27 13:34:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'k36ax9lwrq80obw94dy337xf8pwamj89bj9t46md0edkew8k3r',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'xvxhfmtuotfz0fggnnb9',
                party: 'tx91r7mmakvzhpk9kojr9rphg8dcdch1eo4tao5yp76x64s4y1vnywsb6y854wigjoatiekkupz9fxn3w9aoum34yxj2pg7k9fkz8tqbuj64jhamwcc3h7pcru5atwzgl02opide7iz0vkaxjfqwkpohjw1ta9w8',
                
                name: 'aj7geav0j0598t1qgijeftxmdgwopa1qtnj9q3t6db66x3aftepnroux2fu5a98igdlya3n9gte0d4jxtkwoj2l7pwqpesq4nbqdlodvy3j56uvoftx45sdnyybxn2t7lrpjvmibg8740mhdskwg48apxxg3aa5c',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '6bbpbfz00yrkvo73yfho05j7mgtwco0of939gkp3tz9mxyjift8qfertmo87vc18715ucollg9wxw95s774x9kynptv6puk75p1287x5y92o4utfh7x564d0xexrvwd5j99r7n0ll62fnkreyfpzg7jzz2ihr3tm',
                flowComponent: 'sovwtm9ek0rnsobjex5fm4sphgs5u0mdddrea7rkivwvlbmllko69aprlqtoagl2ani3zak8sosf8338d2vd4nzii5hdis54jmn6yeqe9a4yslpgeldxljviy244b3r4kmgp3kofow2288obeb9atzks3l5xsrq4',
                flowInterfaceName: 'hvobyarxohd2gqrnzcpix0aiawjg6ro63hjzmddss8oyu1c51wppdwyqtces5psign3kdsgh4rl3xqj25g3z4hppyx5wfxbxkwsim43cy565t2l3rc31t4zzwus8rik1o3nlya4ar7ya97jk7jrth3uzu661vdzc',
                flowInterfaceNamespace: '6ofyzvmz71adv3t1y5bsqjsdiwdml508gsq6pz3jr8jcrojxx3m514jtljskqsem1cijssj8pq0mc8yh5wmosxuqfgfikufdzthh3l34pg9sf8907im6upvhq2gndw47952665w7j85rhg0tt0xy23z4diny9aw1',
                version: 'ru3kn293yn2uajhjsj6n',
                adapterType: 'e0q469q86nuhp4l2ncfh9bc215h2scjf1pucwcbm3gl7axap6m59chqrxrjq',
                direction: 'RECEIVER',
                transportProtocol: 'g6uauegmya1vt11ccdmjo6l9rfwl2rebavjg0jos0auolbx9rxr96r1k1ia5',
                messageProtocol: '4gy51cahe41muvt20gxrvdz7qfs0hzco6wfgpdr9v4zjt126965hebhanp30',
                adapterEngineName: 'ofpfqzvmjnlzt8wrupyt7442l4xjoh97cojurtef3n2xop1ohbsz1xdf9rcix1rt49t89ousn9zwl4hvtvcdt73hz61rlxjlvfv4znrahtpb6xhb52ub2nbpq3p3j9o44yyylepvwfvjr5c1rwrdd73ixb1j6byr',
                url: 'lrujucfo0aczpxxczn7s5tmk5b366gcdlq4zfkj115f4h6wlm7b3m8mm83u47z4rweg6pldp1niie0p44ca4k0ec6s4u7k8mk12f3cjg549qy84y8jo9w8etmsyomked8qdva1352mbu53lbtlzqjnsrexjxr5dzeybs2geel3utb7bn8wjd46jizprlbex42hrox2xci8cbuc3e173amnxuoscknawj3z279fpc935s3rsn0g6h2wn8xqeo62my6xcm70iq43i923w2d5kvx9ckdz3fatpmb2yvbol6n2sa7gc897ft1yrxuyj6y0ci',
                username: 'bndhdcmk59fw40nsuitvherwpnam23ylgax79v125vw7d2o479wlu8ccvguv',
                remoteHost: 'a090t9h4ygkqli7amjqbj5ely8qhdok39q4r6chls9boucfscefbj4e9ryo65b0pzhe7jlumr5trc1cunj0xjgro5xecsyylhyr7ph2ph168660zqlt5lynkeewxsjq73zjho4l7i376l7h30ee76bcvw8xe2akb',
                remotePort: 3608640387,
                directory: 'rs0241mkogrddjmaw405mvblqdrpxqlh0kcpeh6ml05v7xtrkejno9q0aq2i5y1cprj3if3wkd4e8hqsbwirw6adv5ehvmkelyb3pghmvtuk1zjt9wr1heanquical31gysw1ifyyskeq88hc82um9xgdoh2lngy4urf6rqdho6kkqkpub3510zb3fe6dyr21yr57ehc1k2w2chjrg5amxdkdum69ehgjeylcsvwcdpi1z51rr826of33qfl2fj1yjwmyjct3pnlbpoarbhyslcok83n32irto2bjp8xi65rmqcxtrvu6971tgo73yj0cmyb99jcld42tyvevo7b7uzoqlv67z6zdqwr06gkrbhdj8fw1zk8j5r90g8ae7g9rr1li8lucal2qiitf2ikkrgxagxwvjp6wy8u2eaywlrmmmql4bcdfnijdgol8hpxz530lg8adz5iy8ny8u6k4subgb40yuoh0az21riwfc4rytjk9yf5q5lm43ymbpluxd1z5xag12n4uauikidw46b3bktn0gbw6qzxoqvn1hovh8mgv08ys5rfpxvvs3v1d28gjz4i142dvdsyj1xij9l7b2ei1in0re4emp2u1dpp012t7nneqs6dj6t2zmcy0biydbn6104fp0w3kuy0cs031iiy42g1j0d6pjkf9nnou8t5lr6l04aks47ov1x9bl1dn7t38a4k0lwjcs8dghg83dl42uhsjggt3rcg3tp5snjsu13hsl3k8t6wrx2cu08hyei5ncjturd0cpdikgkjiwnzr6pz394jo75mvqm2xgtpgcmu7nmoaxqddh1478znrgrv5yg5p4dbb04ct3rtwfdpa5y1c88rii5ntk7cmcwdn95i2uz0kud2g9w8mq3n108svsq4k3nv1c2ohsmf7hxm5erpg9bqiqndlf0mi7enyh1wsmdhp2mu2f4xe1glh2w1x8k5g2h5fn67zg31h708lbuis2shyac1va3ryoshjmjeum1b5rrxko54',
                fileSchema: 'yh5qj6sc6jfbwro3vmxh6xoxmt9z170a2zeqwaikouyl4baw2lgxr4u7i0o1qeyggtzmfpau0hx14cymg18o1v7awwftpdyf3fai4q3wngawf62muh2phykmp8zl6gmpl5iv0rjyvh12qzw3uw4wt9lzk2ip4tiptctyb1i454fdoh3ggq1s1w4op8vmwykk9t1vlqkky8mwhfp5u7w2vtjkjovgzpd16m5n1mbrmqz9edbqtq77rtilopley6kicjnld3p0dnwbxinwxdq2v2wy80579rkcpp91uyhkz5ay6kp312fcipxeptnpvmn413jlxry7hf62ruo4rssx1d3ur84mcekzn44unhuz639960ftw4tobrcdy4cw836f8ok3iazrfjdk2yi92e1usnlmj9ejq9qlfxhrrl5y37aq7s1abno6hokhfa0q73ehsdx77630pzgw9ftzgrgspno77lf4or4z04qhf9yi6s0jpfc6xvzffk3vmy58k168fwmv87vysvhizrrlh0rkj3125w3g1yx0726hz0w5e68hknqkuaeribjn5g3p4r6hm83jtkzv9ap3pyd2dsgh0879be04yyymm2tb95dejk57jiez7sc9clclczicv8xyc4dgihzlkjgs5rg8p1y782ks3eu2w2niw4rnecror3ksxublvaaypsd6n0bczblvr8hdadmowx1ewu71k7x3mk7s373fzuve6i9lu5isumxjj46o3sfjio1qlk90j2q8hdabbbhdo6dqxux0e4kb6agogpyqq3wucdxc8u0didqhn4wo70urnru2yepdop0fbiw5whhxrqq8i2duoq5j4z80jfot760wjwb3cema2u9pgkq5ekdm02mg3uupmuq3zry26bprmhisop08yjtscyzeeq5de7zpt3u3i9kkypnglduocmgqeplqxfcqn8ih0m5fdj3tmbusuxz3bq2amrn79m8bb0nzx5zzgqj0yy0mgjd2ek482s3lpjtrf7pj',
                proxyHost: 'rdapfmj6hynks1iokn8as6ufuohtbbu25u3a31qhhhmo7peceedojxbrm7wn',
                proxyPort: 7600098090,
                destination: 'bj43ocrqj5re52idrqndquv5lkd3muyrz6i435il4jiatxukw1nt3k3n7hlceqmyhaive1eupz4uf4fghld61ceade9cy1ot0t0z2dn9p6eqgsw4h5zhqks33up83s5t6wl9uz81f4sad57q0zdnduutt3c90myi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sdi9mwx4lgd0mcw0csvc491rpgrx51aqcmslvsnuiztbhyd3617tkppaqhi5fqmg0jb84238x6wno92sdem27uuz5of8rsenemnktp5ml5prfktloeu5kv3t9ze5pxj5jx7zofqzrbe2n1rrzrlhsw1ogjxnirya',
                responsibleUserAccountName: 'hx5v2urxbarw47exfxlu',
                lastChangeUserAccount: '4m4g35yrq6kfyprmol4l',
                lastChangedAt: '2020-07-28 05:07:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'gs943roq8d6rxe5ow589ikgc6jkiqfnfq426910kxvebhhmk4a',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'yg62o5gbaxur1ibb75pr',
                party: '17wagpfekbwzqi601mdbkby706zds1zh0xqf67d075td2n7rymwjv0x0d3tvjxc3j9vzbi1lhrspk06387br6mv3eu3ehnmmxedpysdjvnmvyeo0l233nexvyc7a3wc12d9z5rlievvh8q4tyxgo7vgdoe3pvxti',
                component: '8b03tv37rd6p0ipoq4kkcn2eoadpobmdrau4noqbcludxmnfhzkxm2jt83xev8tb311dxcthwkuih231pwrmvcxet3hilsvdhk8ry106vceo6bln00f3nrk63yvci7mg67namukoaqkpexexblgdid2x42qq3b7b',
                name: null,
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'pbk7qlq7p8ud9sm3ms2rosm08iwo8np16mywektif94ua50rokw2m4ef8yva858h42e8l8y10nr7zfxz6wnhbs1qtb4675kubyt8vndzf00t7u4vv60g2mefzuyl4uoi1qn1sh0dp6356kld28moror5di6qkqih',
                flowComponent: '0ztm6souqdn5at5eg5b37n6iu2h8oczbbmpnslvxsc3thn4j7wb1t1f0jkj2mdm9ths2qtxrd2yfykhj5i8kqn3lr4xuzjmozinf50imk8shl448drq1di8mhbefp0x3mn21gszndsqeetr1720f56rhvkxcibfl',
                flowInterfaceName: 'd731lwntnrb7ftdm288xxsmk63ae5cfh42zrejezfo1cw7htkhvpf6hqx8ieqmdnqqtsh2bj94qv3eypohshblkfq6sjcmosf7ez7sxtzwkpz1wfvm4rkxhcwx4l0ojvk7biwn4tvavn5d9r2qarzkn6nsnhdmcb',
                flowInterfaceNamespace: '25kbpgemzb4jaoee3hswmj3vc6syoonxfvyia4wxl82oegzfzy12w8nzx8qex9aytmihvf5r6kaq5qvg97v96vrov9qfah1hb0a411u1x05ut0wklxdn34ru7jim4h0x7std6hgpgp8y1xq85gndxgaoqx38nuhx',
                version: 'qapxyztsgj2c6cgyim3v',
                adapterType: 'i4tpki0n8muwb7vk6b44b4izup30jtp2mcg8bwoecea0df0myx5w8j2rdsa2',
                direction: 'RECEIVER',
                transportProtocol: 'wxlt7z8skpq69k9qkwiypsm9vwqohtxtu082i7ykd5d0zzkvkx9f321y8xs9',
                messageProtocol: 'auhd3xemrufaguvdet3y0i9yz94fw2hg4skmtw2juofdd8vwkj9q1p64lpn2',
                adapterEngineName: 'nng07ndts1328iuacxd6adfhc6te08bupw9mu97f26qcggfgf6t2gg0ohjhzl5cvsmor7oucx4it25cov6xwe4uby8mrtnctxm1zzd545ocr9d8obdon3aojyjqd8m21o28lk8906sps45v7090c2v7cw1mbxsw7',
                url: 't0uomnlkzpzyusvw4rmwhd6g8jebu8vmwgk2wbhkglvqf960a3yuoj9iucyqwd61mlrlthbj33umb8t7w0nys47jcqj7lgn1nt18oh24bmo4ym32vv8u71rs66uqxqz1dlzxi7mg0z34giim05ufxwvw03rykie2aoe89secwrz9kldsazxusyqpen7kqv7mhi6q0tz93tyvh74hs2jyey4l5xa7t0zymv8bp4g7je6wtlhu8rssthfzd2n4j5hqg5mjhshya8pxdj34f0hpm4d8zy0ld6ftuds3zjhlc9k82l2f9h726zx5x0hx2k3e',
                username: 'ql6g838juwz299k6b8es5cyui3oglilf6vtqbbngf7ju2oefc2aso3ebzz80',
                remoteHost: '80gs9an0jkgjkzvyvvwrgnyxjvmp0g15n28vze4n2h412yok7vaxh50eb5zdxs2ar0xtps24wb8mbk1w9rvrgdwdvy75kd11s8zwqj1s7gmma7x3h4lvmd1wwv0ncodyudi9pyvp9norrazsf0jzzu5plbr5arcl',
                remotePort: 3292791676,
                directory: '1nvlk6f8cja88cu4csbjxkcjvd9oxaryyed3l1smuhiatgbzxkbkbhl4gtod9i5mcdkmrte2vfjv77skyhip2ty8xlnyyyvjntf5goowovap80d7eabq5dm0zps8hcuu87pxkuskunqvxyagi2bkpw5t30rsbd6yt9ououc7qmt2fcg5jbbkx6ej4fouxird0h5ygc8heu6i2nnw3jemib0q974zl7b83apuh1wuymn1molgdeysy6lzct4ev5nb7nwm9ppipfjaddaj6p11zqh0vabfxk5aygr5zlmja273sic67htk1rxutpsssv9eij8v5dlt3znp0f7i5wxdribuclc93o7gk867n1p66aw0kjn4gjo5z1h6nvjcirpmkufpilb6m62ksbvae8hdp1bonjpkfhwj4llab5du8ma9sr3c0h1ppbygtx0g41wcrn9htcu41uj8n2em5b7m19nig8whcsjl5g8l71t8uzkvu47i7qdo2q2epy2l5o9b4nohy29ylvihbdj5blnlub9sc409vfon38b4j4w2a34r67sbtiy3tzv7b4wx2191mcv7dyslkhv1l0zx0x5d96wxzsofilmgeunnjrjyfglbkrjd690h8nsrkaag4112snin8ldm9wbix646vddlat4jkd4y9y3cawpsdfcjk9o36du27fm0p1nns3yfp4g1zdd6320u96ht9154ytl136bcma2dxixhtubws1eb19oyq6kms5t2zoaj854hf363iz4m26y5bg8ovdpbycnthh1gur2awv4swyuwssucbjrpjx8a2y8ep7b5ocirpj4c7e62cg716nposlwdwygvyun9i2vexfheu5sk2cvu4alghmkd6gtn565tmej9j6i1i5a8iqe6d78gqw1k2v09of26hw8twh07wshcpqse96tyj8558hgi9e4j0jvdbihf4tzr2avwd2a8w02zibtnfev2ialafzskkgy2dobxmh9hzagm9372bh2jn2nru9ms',
                fileSchema: 'w1180usb8sl70neuxevrt12dhascf0fcjk2la24avj6dmrl6pmgkeht67kbsb0h2968t56ak251qzt3c3771csi5kyip2mlr06bx6h3ejkstbpulgljrl7se8qh19h1cok5hgaxa6fk5506qqiu4jni4uy0c44abdqfdfshxtzg3cgl2pqetmygli2mqcmd2jv3v4klwmwntl95xr963an8dl666ar3xon81fuwvukbb71x7zedxp0nzu5apfgrh504k07xlq1cxgf01pgbkk3w2fd3s6yzpwntvtoapqj39tgv8o8k9twpc2d9mctq67rbasinaca8a0qao9nd0g5zciusossb8vfksl646t8tznqjtfmyf2jneupwstfrju3qo0skedbngy3gnncvbe70r2rhxmq3uf2dizlymvaq6snq7uvrvno8lo9ikv8cn4tphdwq3ztz45e0ygb0d1s3s4n7k41wkduunij4vt60u27dn2kd1sy1x0g0knvwoiekc6h2ty7pj7m6p6gwvblra8md9ib1ib6vtqy5a4ikhck3tqq168of2qx5pryhxqkrur30d3rprwbb35309nsj83bwat6plgkvwdceyumn2m48go6xz3p9ze6qbukvtb7seh27e5fmcwc9vdig2ps6darbc3m21oouulbg2nwo7w7gvfdwp9y25586asv8uxazjqq108bi4c2xbpsd52as7z7822i2w8q4wk5ydfbztv9vbc93gk7lkm8iloejsa79210j1gj3pafo0hkwsqkasmdc58ad0abxqaeaph4i95z2bg5wmuxdx2hj3ukzxd1otm2r5ogj8kb2iry5xkyplfqygc56g57pqw4sxrfss0l3yz2f0wkit9v2u0jxcx92dcyyxeokavtc5101yjf6v66wq8cil1650quwrrke7o1d6t1z1coy53pk5dnpp5576f99n3b3a95byor9m1jlh1nrpy68ktdohwz8fgrc9n16uwo8zswycfs0v8yzy',
                proxyHost: '9jududn8kgg1jsqpgeoxzpdcs3o8cwspql2b1ovuuaef3mhdwkl9uc0960cv',
                proxyPort: 5859984133,
                destination: 'c2gcrcvcgglud6cec0870mbc4z6o5ds8h85lpgws5y2uc2cx8s2gybmpjzfjvqp04vlnheaq7b1a5sxe6akzlp8yw4pig7wangysu733dthsbyaynb14v8zsn0zdihho4wzk4t8j0hv3yd2uuigj3yjolql0ajn2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3dzazq77e4vi5cy7m2itiuagi8i9upfr37766fxrj12ul6zn8zv567d3rqxgzfteo5xxb29cebcmz5azlji7fpcrte0ky69s4j5secyxj4msdkfrm40lh3eeriek56o0041lu5o9n427g21vih170qp14xcw6tij',
                responsibleUserAccountName: '2lweqpqdxct46pmfijm3',
                lastChangeUserAccount: 'ah4uui0kpwwglfrm9egv',
                lastChangedAt: '2020-07-28 07:16:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'z49b3v88q55fl5g0jk1qfbrxww0bjetecaqe724k78dn86wujc',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'fnzdq444l12noasrz59s',
                party: 'gnamd1mh0s3hlris0ai36gvyjly13nxyfk0gj33w625xcn4olhmvrck4gl4qbmyagjrlv94qy9p24o2see3j4u6tqe1u79ijr0h0xv8c433ecxqhtm8i9ak8z7iyiv5azoqy6bcmxu21gmxox19o2d0ic3i0mavv',
                component: 'gdrlz2rysb6igiuyh6myigkr35x8chgzupviw7koml91nwvixm6vtbhg3gggs956c49iyuze3csly43b0mir0iv0uh0tkkgk5bv1mfoxymh3ght94yhhi26zzoizqt37263xps0hjgvnxt03ahkhf7qg2ezark2r',
                
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'y3ipu5egzemo51t5i33r25d9rosp7jd3qb5aw025r1ak7e4sg47hzmrv5fwfkmad3yo7h3xls38zikhjhwxqen7wbq79a2ifoxapr6kah7kymk7rfvmknxi54xs2kgguuma19h940yx4wwtdwxdwzcynp8rqs2yj',
                flowComponent: 'bo5cjjd3sdh08pat7o520zqde4xtecq2cojpynh40zpxyu1aeluk03msitw4ymt4fxbnba3m9cbf3s9s7401vdd90u5sgdkc5nbn6i7dai1x91fxamlhivs0ksuuyq3yx8tlo2xpfckrzim9iopngn3uxyfmzu7r',
                flowInterfaceName: 'gn4ep8870o6zt1fun6ubwruak14ipvf90hefmv89xqmjs5rfht8hyeg50z59hvz81264hzvd47jsnt814r2actjzmh509bb0r1a138a2206r38j5td7ilmuuuk2vds7f6k2dhpcpk0g2e6xs5zfwjzw4fxacji0y',
                flowInterfaceNamespace: '14os3egejaidzbplk3k34w5xgbs26irt43kmjq0fkzvlwn1bhr6jac6un2bp505lkswrk6evytfban4c70l77bpalsavus5of2etn0q95hmiu6wcovvu9pyw1nmpvv3wwgfkk3kc82j40rnr64g1s7f998dmbtel',
                version: 'wubd1voyo2c1cxu4tewg',
                adapterType: 'uvqoa0y6pi6zlzeuubabfh056679q3nbu6ztorbz78s57mmfens0qovvnu57',
                direction: 'RECEIVER',
                transportProtocol: 'c5qmqhjba94lhu8o78cdugzhrxszbl2083p560pultr875ist8vw9keoynep',
                messageProtocol: '6q6l7qciax5gskanjp8cpljmcu03jckkiao2o6p2i30o7sh2hru8wkijtdy2',
                adapterEngineName: 'utl981n4oqmko8on81wovzlti2u8rz47r25beyj8e3sxnrg5m4x95w8jw2q4rcaplekpscai233pvta7g0yvq5cujis7l6iste56kwartp65ldoa4td93elkgiy634uajh342idm5ixxyh6b4pto82srzemsz9kd',
                url: 'yw503owjbt0219h87i3wakbj9k6dh1gle3dpj7jok6in3mfbpmpfalf7oqj9meqwtkw579x9qs4jutkab12aidgm75fw9la4vha59mhabnkmthsjaygfqmx3xiopfbuqwrhkuo6q71p1apqulamax98xhojorm74le3bm6qeejjpb64rv9qu6rmwlarlmsu8kl2wlk98ul858jkwk7z79j4vmsqjzjq2cu8fryp6pw1to995nmw9j6c6khgw29if9923cxhyqiah9oysdpcpwxtwsk40g5cd7qi572u6oja70zu9xnw93uu2sc94mkpc',
                username: '37ui16v3kxx8taefxokp3zdqtozctk27id2pyylepp6mp1o5yszqwc0om5eu',
                remoteHost: 'qd26cnnkixok1wjrvryjigjrbtwyktaos9c06tyfm8iv3xmma6czlcw27kefqbcjwpbsp25csibsqcgvtc50p83ojovza7bkkzlysxo8ipml8e87idgf250t3dlk9j0r038ppfwfdjnu6jmty492dxjo6zgfl67q',
                remotePort: 7471908152,
                directory: '1is4gucdexp86ckkb0b1qt35yx1shw09ae4hbqm5zefw8ci3qgmiey1jbcwrzsr8u155guyo5qn33r6l90vr3u49ctdgbikjxtxscx3bnawxeayiav1ttvie18hwznpyd398e0lbbkt6tpcsjq3oimnkjqrr58gmr8x1je3y8em4c85c0sjvp5m2zp5s8hz28ay8eimlcjfza20dxqevdx8yintkljvpicnex24le0y2lxh0c8yyvn04geee4me5k9z1k09fs322p846vf9ssse9292v8aw1hkswzowi5wdemog8lzeheb7g8yqztnype3f4ijzubg3ljfr63cxh1zm1ycmyjp2dn4mz00kyrioldqoij5933sgmieyjz4x2i0pme6jj2izwlfnntjxu3zdx3590x6pg7js9selimyeobc9m72jzzkq0g4pqge0oiuzpodaavru7bvgirdikiabe87ybwmfj6oyphaoaa0zice8mqhmg3ynbdy45ace84v4evrras3g0kyrske4ennindjbq5ufqe6l3dql5ftsd1h7f44b1yqg0zhdxbfgy1v3qka29bxd1pm7sot96f874284w8coi9vh99ut36lbkco9iudb2ajr0n4d3airv1j4tx1zg1r1wv3ws2wcdhc3ru7p69iwclwsrphnzvbl8h3cjiin7dbxot2uj6z222taxbmxyne1zxz1fjutkp2ggyxwhckqiasx9185yp2qwgpqaydrh19xroje2kxnhgjy9hcp5fvqa6xtpe7de7rwyp8m19wt1eelbz480203w9w297g446206bn35o2ti9w5fub8ycdq2f9epicw41k4t8428thi5f7ouns18wzw9bg5j7qnop90hkev8dsgd65ivjzd9whvsy66yd4tdul6gtd4i9v2cn2zkxjot0529wh5ao18chf8lszr6fhi9y5de6vfxdedmpdaavcx40f23vxwc0ie2ndfimbwattl5w3yxm9dsqhpuj9bc3nio',
                fileSchema: 'g7o4gyc0cfpdelobcpv933o05xl2t8rgodkebq9rhzl8nuhkyvypcbihq8le848kbhzpuhwvrs5k4ff77w9op0kys8oqcbjbqwvc4al1i4tecrehwkgoa2q47o6er240r7byvopvfsmurppmpff3xkkhnmkat7e1dgsyavlujnuqezbnfr46fwdef6f72bkegbtvrzhfhe0q7jw4xhxcboe1roi6njg2c50wwskxd2jzgw68oy7i6vyze5k4qnn5cs2dyoe4w7ntw6d93pcuptiinh9h96jyikczitqaplhnmosykebca9msw0brk4jo7iwatxwnvoohw53ipqag97fv1qvxwhmqpjvzkcgm9mebw4gw9vs4r9h2yma2mh44q1l3tshl40q2l8xb1u77qd733jko06u2kgezn1r7mu9z9tw6q2zyiur1v6u494anwdghttkbfcmmz57bag8mv1hlvwaoxobadevl1c7lf96qqorjsndg8c7z13qrilqg00y2gwrj7qupc05y6vsey0n2dadacyq4tu0jnkcwr3es4ty5rypb5npz5epfp768m28qjvqtr5gions53ngix8waxiewupsf8dsqh2brkwfr3v31473fy0afe9s658zwg9xm3v5cxbcjjw6iktszyfxa0uvupd6iy01o8i04rjrvsmmggf6ofd18m8vldvupduu2elvvrjad9ws7qs9mgf9e5osrgxcdlxmedgbrbfpjs2uqn1c4m6nxn2f00bbrrifi9737rlhq4j3wlb5brxanms6k1fhtmffp8cxzd91b2ko4bsm4ukw7bm9qijefncxaj5d6bl8qgogsben7c8j7cdidfhoe5b0a8xylfdwaqqvaxqew0fxe3x9hz9gdcodofbtz2vbtng3e7de019o6ihil6o4rnvo7vjeusqzopzkwep1ofzvfnoqcmoz535fj8s3heccq0o5v8nt7isxcomji9kg3l8cokdzcjy890pqo12nd5je6fv7i3b67',
                proxyHost: 'p724o3skksic3s8q3w3ylzs4l98xem6eih793x7k8sysut7f6xtskgzczj8e',
                proxyPort: 8170531694,
                destination: 'e387hun06827z3yfq92ll429oou9novbxe9gl0wy00s6tim6n7re0zh06srtqjsdivhd5dtvilhgjn1qhj4xfmp7bg4srbn21jkqzyt5kqyj2qdpztnq8kozmoix1hoato01ak75uh2eiljdhd08xokhoehj4ip3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i8icthhm89aztazqnk4vdxhg39egq8tqfpduovkchuw3b7nbemp9by847vaivljbsnxq4szn1szki6ju03apb6ncl4xuhrkm830dlfc2dzcgr5prjlt0dc569w1bb87uzxyxu7yn6vvb4t7m0ow4cncxb7vowchd',
                responsibleUserAccountName: 'c5n25apjyn975rszb2c5',
                lastChangeUserAccount: 'gjt5bvq5lcpw9ok13cq8',
                lastChangedAt: '2020-07-27 22:15:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '5h2srcce6jiwcxbmhz4pdh2d8yhcg0sk3x4lu1j94skkaa8kdm',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'bymye78duuxqo2mhftmz',
                party: 'vazmkjb2ovabftb0x6gh5tcujhe2hlx98jd48q1vujgz7rj7sugkd8ulgy4lss2d6zlyhop82xqosyv9pny8fle8tr7pcxcj4c1for0q1j5dbs8u4vl3p77syhvtc36xgaelwzr55kc6rhmcoi5txwupq6aiq52l',
                component: '32ggvkfql682s2duiswblu2sn7iynkjjyehfvq9bky4k6p8k7dj5ggzifkn6c6hcn2mawng2ysg90g7e6m266lasesmrwesogmsaosz12646db0v5qai8jpp8m85fx324d7n95hwf3idui4ekopv17ufmw08v2x5',
                name: '0wxmzt2hdatlyjq5lwktx7um4imvplji0sf0ibpcny587gveubiyk00mpe0ts1e79l32wthjz569u5nn1nq828ibuva2yxzahg2o0zajubwxe2bjznmadekl99mnocm8fw7umokmtco1i7so28on2stqaqemc6ef',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: null,
                flowComponent: 'hbczc52tnp1xqdhx63tjuze1aa3a39zenk7dtb5auwqiuenbfs778thrp998b23g46nclv3bhncrt4m793c47l98ceyprlo8radmgko8psym1zb6w5q1kom1gc9w9ilupacaisdnej76fdu2aj334zy2jskwmceq',
                flowInterfaceName: 'jpchcfsclfn1v1cepbmea6vghxl8oxau3y07vkvuybquqidcckoy6g6j2ab98r6ko4gdgka57alb2qbytry6g3bpeiid5dur95y8jxjyagp28agoh15z7pjc27nvcu6vhrpc4w9w72xeerokdbh3pug52nm4jvt4',
                flowInterfaceNamespace: 'plxitehlf4tmswlknsjlurm0uwt9xsmoa3vodd8chr0doify5o8g7jw5891rdi7kcrxpr7iew261t0uz79umfpcum60ngmuv6puycvsxlnj3h8hqwu46iw2d1zefwyp08v8zrwovahxq57affgxi4x5tca6yr1ym',
                version: 'd1k691ua3vbt7ftviipt',
                adapterType: 'syniynwcj1jhr4f41br0x6o168o57pnl9awc3t0tz9zt5vilki4xvy79xsa4',
                direction: 'SENDER',
                transportProtocol: 'sxv4uqftjkpjdhbg664fhkokpjgfc67v3bhju8bhald176ac7xb1oft1kse8',
                messageProtocol: 'r8b5cnbhbvk1tc6s83arrkts4w79r9t9hkrr86cu2706zkkisvtnuyqqi06a',
                adapterEngineName: 'udiyl0kkrw246rz7jlebo6vo9yey0m5jmaboqpby6nsn7rxrs59bqevn7x8w10tghay0g4sdook89siwzm704o58l1av7l9mthq2jtlr96s3ci4eukcip6b0qvj50ic7tzmvqv6to5uredl2fwfca0vt1o462z8x',
                url: 'qonbohjkgf46cur0wdbr6lanolk7sfefb6odssy54l61taho699kut8foobod9zl0h3mgbymaqd1d9cmrxcdmwab1wh4yqnj3ji2h71fqfvzfmy3xrvo0nbibgsb0vi9chpq7tpvwtkkmkymtlv50pjc3jzecgtz27eibf2a8ia2vbmqbua8n13awdb5v59cne35lvd9tneluss6jh8qjx4y6q63kg8ro3ifm1yea4owiie2uur88q4f0zg8dlqh08v7761w9ekqx42xkoj3yv2r4kqxb544mffdsjgwnn7o63tf3ypz2yqoi43sa6yj',
                username: 'n52gna7vfg2az1gmf0v7ld0vk0fydapph40kzsu3hj95fwa6ya4o33qkv5o5',
                remoteHost: 'alh8rwd5zj9j3ecurl906c1v3bw63pv50g09jclrst5dhonhs8e5jzxbad8go7ufjr1kkochz0adlxqov71xvsa6oxecw5f3kshrdduvvcdgllmsul15l9julf8jdwj9o3qukb0f5s09izub0iwbkfib1ibmh67k',
                remotePort: 2372769277,
                directory: 'cmpdbsd73s9p0rkliqxltwe7w4kmkdxtdejmu9ozepb8y0gx6sybs0oc78owxjokutldkj72fjo3781lekbaqiwgg87lwfrshncwo3whqccw31oz3bjo896upsmqs0qnuw0nk376oy4w2relkc9iudf75djfxmilnfo7bflcnhidodtcc92ltvnshp99g0fix2lslbj21lmx3kuyx0dmeqb8om8tyddsqg6skpey4i62hiiw6tubkz05cyoy372mct7zt70kokyit669k89ezhuejukmzbkjb7bdjz8pmatyp38s0dhxw9s44v32obvn5yg91yqjq7nkqe7bplyesg3hv1iie31uk4jfc7j7jahjlq072ipmkj4ei3o1exydqb26p8lux9aavmh3r88wn69had943y6dm40kl181kzir346dzi5s5anpgu0qmlfgxqabym0zllqqzdvogkbkzxomqngiamare79ywkc3j12v6ln52ysjpf8n3fb754aptlcr5n01uz1b69vlkpu6ko7vfcfnp1oz8j8lejbm0v3ahkl9xtlw9v4c5qy7syoydxalc52ynhtyji84nevzrp67oc5b1lo7vqya7j1avyjqq0c14d2s96qiwi9l9cl97bl3iuldz708wleopqfbuchz3l018ddifivlhoxey78vrmbvim85btuujd6qvf2xa205ap5neh6j5y6ypw1gym52nesiqii69lmfsn00hdgxiit5jxbqivq3qfamtdcqy62ky714c9pp95dmtqc0o71e99pkh9usmnksqgkyshqizqqr9plc2oeaplto98cxj0c3bp0b3hr25o5lr6jfc8j4oa7b78pco4yya0vvh7l25h781sk8fadoh4cj5cux31pqkohkajqnp83ec4icpou5iysw2rh8xfdajg0x401dsbjfndexc4kjuv88itfb5ed3nrhzhs9d4qdtatl2a7v37qr3zwnvpxz4zn7zbdyprm8g3mxyeu9vaa8jea1m',
                fileSchema: '88a1a3rgoc4rkt0ny6a1e4qssecvht8v4gr26ji8yely9ebcgzr9mt3u3xshl7cwzpiuad4aw8s5m65s878k0yl3xh9cvdzh1pgbgimvg21kzaldhheiz63m0gnterep7l8ii9nq8jg5hff09dkup9mibya1wvnrt617y1c89z6rsv8r9co534gbzl4thdbnec484zcc173ax118mva8ovivxmeg38hw0yln7is0kk9dx8r4mwovci8jkbp6o83rdo8dmvvv24qohyq8b7k9j1kafe2taut2obg4su5r7j4w85ypvat76x44abfhezswo6qirfnkagmba4u9oa5o1ogmx9pary0p18gdp9btddjq8yyvnbtr1gb4evz6mf7llbxfhii41wftuwvqxbx7x24hp13mftq2o5thpuy86ibiitxjpfulbwv7fhfevfrb8j0seze10y42zqg9d1mf3zd9xnuhcxk8vg9p3hwf77o32tacekzt0fpfkiyl56orhl63692exut7eocuk2mwbfkj10ulmw10prkktmsyxwnce4cfpbdj71kfvlqbbv5ao4wako62onjo2eh6rvfittwh76espfzeejghrnpc17y1nx97lpxmtajfvf97pzd21wk3yzytuqg1fqcxjbstf2i5smi5n5t08o8oeukpgvc81oo0qmerzk7gi68i9373wlc7tihhrb51dzukj9uulobinbv4m4629n20r3xfe8dah7p6g6d89m3vtiw7xvavr1gqw77kwqs4s7jpi0f4u0w2w307yid2anoxopub5rr76k0o7cjxg878g4xi1ef28jvgqi6eb9yuxxkbxxsaeverbmbrfaxaknaaf3ewddbgmcxhuuv97j6omalq5ad6w1yr1e07qczfiuzy9dfm4nf6jo00tqsmmrg021t8xocyp2ayd9qjsmlugvimd0uokrgpa8gscdlpn9irn775qqw4avezwq5stkk1rhvmwsysr8ad0ae7ekgh1x1bcbqw',
                proxyHost: 'nqn7r9ryrwzpni8x25co2udmv75df1rkc5nyq80p8jgwzjo3gv2r8iuhzdkm',
                proxyPort: 4593179197,
                destination: 'juv0hn7mpwc85kcmrku32hqmiz2iw23b0l4oe7ejj2y6stzispz5w0q27nn07g206i8060hbijwxokfner5iam99m6c4cbpprdrms26rxu0cpk9qivyjbmpypyz8k3pzp0ge2jvdsfmlujihllkm05j3r9ogbnt1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd1eilsqct7sexj207jjpuhhchmskbobnewips4zcmml1s6anv5td8pin6gm6ys80zo8fhyfkhbcz41fhd1xmjrxrdlu6kp2lxf9ez65li7p5vk37pz7nny7nvebi776upmvppu1ixyefmrd9wzyfmh38t6ig0pz1',
                responsibleUserAccountName: 'eksdl2iexo3yslj2xmvy',
                lastChangeUserAccount: '5x8ypbipfmmce4e31cee',
                lastChangedAt: '2020-07-27 14:48:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'oufigdvo4llgmcj1tkoejwjz326ebrzi782aq7azd1qv49efba',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'k1mtg01ua749yvy6hnmv',
                party: 'b70rbq5dixsxq17pky9yky02xkpc16ql20vpnh0psyl5568afqfzufshh36e8ci6g6xwkxiwtf7rgp9xxb6j7grp8ff0fskj38djij6td5vs95kzw3s36ajn0vle7bo92e7ny4z7rz178v48ycaa03s28ux6bza0',
                component: 'qjouxmhfzspzef5svnzoh417z1ft4t6qfcyljclmlohbzuub1jtm7ngaxv739bwisri464o7wjwfj9du51laoye4fe7dzekypzsf4gbx9gb3hi3so7higzb0xkiud4h3si6p2y5gdf6kqll7s59xt1jweolrqx8t',
                name: '2v39495v1o3230nfzuyln9akdh8fwjtfvv6g5idrfcef5txu6sup7bac1tvfuzmepzhpa1xd2cl448bif5r84tvzjtckgenb2320pshw1xn7zzz20wpmtojthdk1nn40vfsabwlwz68lkxvvfpxg94qvwy7pu25o',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                
                flowComponent: '5g75a25lo6hory7qivv1og3tedirz19x5oqy2quaotzw9tmr1vrruc7xrxswvhfzcwfgpzd0168bqmseswf6kge58trxh5n8zbko3o5xs5g2zrp4kb1h3td56uocrgc0s22wts771tp2x848xb8jkjd2zbezv4gn',
                flowInterfaceName: 'ybnfldfr0jpj9qf5oqimcezung0j582scy8p3gsldmwqsgvpfhgfu9emhgxryaai14gq05m59petgavfurjl9edfm7mzamntehs9edg0seeckcgyuusbqhgl2nsziit8dtvsr497u8wqnacf19mtumxz9uxqsc0n',
                flowInterfaceNamespace: 'wv7owo54ir1vyhiy4a5wv0evbv4dl81oki6ha6yh5vt5a0wp8twgf2eab428ax20cvcewxcyhtr2lib4103qk1djctkg2ehnc6pcjrqkon6omes9j5wfo1aemzdqr8xwdon18kpf5uluujwgp53sagt8iy16rqgr',
                version: 'nwosy11jj746jrkwgzht',
                adapterType: 'y8ow540d8bisbuu0sz1ywbv1f6gqya36ay3ptmjtern8ij2nnc34w5pc5g40',
                direction: 'SENDER',
                transportProtocol: 'gdk98ybk0n570s0cq9298xaxwr0nr3r46ko8kkhk1rnjj4w3xk0mi9kg32ww',
                messageProtocol: 'g1b0rwtpvv15vv2mjbylu7zfxkuk8ru8085jhv21bdpr1tpt5nb29rgtqx0p',
                adapterEngineName: 'lqwznrid17mwz5ra0nxp5lfsfv9xtn8dgr4h3s8a107ftdospr2fd7xhl8pqcht2i5fhmdk114l6sjst0qea21ucv5rg554gg033833dht1g48oncpfjnwb2p1t1b40h1b01f0ohj05mkw9wdlk9w6kzp91srcdp',
                url: '1ib9blrfnw4am7qmbn5z388nws3dq18fofwc7gvd9nc52n902rwk2l9bbh0ohjmr3k3nvpmmu43mci1cdosl17eq2uclz435mojwbxvjcgf9smzour1cb69q2z06r3n30m37m2uizhhxlhf2pf5psibnreeczkyh60l1dun1vcw951pekocpe1rdoobyms2mtyronzhstq7a82wrwr3p8nnwwvx0krb315b2dyasm6gz484kd70h39sz1x6q58a3q42ny1dm3hfzo8wi6i8xtn3ip8xmwhsufpqfzw890t693dr6vyygnnu531jegbae',
                username: '8yrkcueujpob45yt9zsoqap41i2rer3iobx4zo1nyymadfgn3e9b82wom8yr',
                remoteHost: 'vtl3qblsnio26grhl11g9wspqsex511lt7vwp7v2w8goin94q3ukvsqvc8sou8k51mjyvdblmjrgurl5x1ji29jp8s3c1rk7nv97hqcpvhqouj0hazdlijn64x93fm0tq96l6w64sodxsgv8km4r27616uzw9uwj',
                remotePort: 2338901643,
                directory: 's9meo8rf6dpxa1sqloq6r2x2ilwph5ld3bk48gl46k49vlgfmdnfg30xh7ysk1ghntk3fyu12poofktrrex1hsjn6nbxzagzm7u9ceayoub382etrx5nu29f0hmv6eqg1oy16tnheecco3rk8nhxzq5phmsoz81blfnvzf4ocshkoz2aas3xi800qxwu14uw3qmrrmau7hnlrhaaf619q04o01ut4zbwtpuufe0o9bum1cegahyev7xqc83zhvkrlzzdtsod0nw1djdiaj579luxdc70km0zutjpobe2sh38ijfn97v2u8k9oeqch9a80w27y19xzs5tqp51z5jnxozy2clrztw65sghbei86dwje2a8c0u5npknr7sez1lm3tgbayvjg7th4bbpv82zwx31yew35b6a1ens984d6zdvr5rhx4ltl2y56olgxg19s475njgaqpf2phuezy27fj3wrftrjf9sdcfie6h6km3x6w1srhdsrd69jkq59jclrq2ptyw1189t2dbjyzhgjmu0f7ksfozsftdbusc4ukaxlvrzlo2aii011hk8regopb833w2ubgf1gvs6lnmpw2qa2bz3s1oijpyhnc4t54p2592go1ahtxsbhmf2ix59accgm2f4kbsujhinneckcu8buw460z4k72dlwiqepsj6ywcof2s45pgoaf2tkxxefgn2mztn02qynivscfhsc1vk0lhzgtomx6s5y6m0jbpbamycc6f1mycrfpmt5383obk0wp46gn2effamhg27aqpyyynjkqnelpj5pk9n6cxoubu2ewaqi3qewx1zv0nwurnl8q7ixddz8znba2o51420wnfw7sx991ek5ph3ftco68g4irugcbr4z4ucd3j7ergqo7p4bvpp3gwcu83thmvfu3q1blj1tsa8510pwg05z2my4nwvt8o9kvisoztjpj462usn8vtzixdcvs50i32gclrg9xr1odgbo4lgd1ehvaf711fpgmm35lydfmbf',
                fileSchema: 'k8f4rwd9bj0puphxhvoo64vqjq65qpnu6wg0j8xks67m6fhjkevdi52jkfj4f6tgqgh9xaclctd58a33npy9g1la371cykpyvxog5unzyp6yf90539p3devrl2g11xbhsw827vvd9g6dbbe90lvl8wab8p66tv98l0po8fsyf5qmtuownryi42o8u2iw2agsy6rcabhhjz1y7fozyb409oecfbzbwq6ia6i42jkvqkx24ixkm1xnavv84cr9jexg9pev8vsdgf7kshg6vorvw0gdgtzntpouhtksxthput9ioc5aann5qwitdovhzl8fbg6uwm97v9t40my8gllfpjtym3h49l4xnb367atuhdq53gmgtbg0dp7whif1vgrr2huy57aw4w7pozk4mlo0ubkbdunanf69mrthpkrt43vhtmh73augikzhvklc89vrttsy37kp879thvsxm8918r96llnp23qf3fypim78kzbekaesma7oixqf3fwazkbq5ak2fgtengcye7ywqvnrp5y7lrq2j7zw16r3zbftiensngknt8swo9t5vfyzd42ja1kfxblbgur1qif5f5a25rms80iol747j7eojvnr3jcoour3j83ha53txjnk02c1j8fu629lqt57ialudnks3sfgrgv73xjvdobv4tgal9k4lp9kea3c4dghhld48vtus4pplo3l1gynzlwkh988yrj213zd8itdaome82k0tya2e8wfc7neegef4g1swhp2ir1zb126bmr0r0i8ahtdoyct9zvx24us7ixvtpc11pg6ugw3g1r5snzcgupse5s8orzj6t8zt8lp4u69sqp2mo6h9wgz2qs0juvmzq3v0r9yegf44qqwxtzalmcvni3nfkjmjnwgbm3z4petlesbgzx649yx2gvr2m47r1toj8w5wpuniq1nrz65dtu7uxx4pogatqhsocy32rcz2uvmlqamesgdsupvrclajzbcx8mqrsgjc9ege06366o4derd',
                proxyHost: 'z1ge53prnpolxubu894shbghf9zw2ylr5rs2jgk8vuga3e5ppnu3zvr50oib',
                proxyPort: 2827541980,
                destination: 'yq52sjk7khqmiap9t3mxo8sv3nx4rshk6ypdhharrr8jiew6v51yxg3egvmlakg6e54re576iglfalp4fpab9pb0cn5vs24yap6menj318rif30akd5nyy4v95llmws0a2aigreu75uyetvv4zetzbxfzj3ieroj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'naavlz32ygkzd6qmr1cxs4npwkbogfhslyqd7jhjywqea77q4xulvi220m2os8w01q5cl2zh31pqcbepxtcu6dz1d88w7mfm610rcb5421tsxf3e4282q746m089s70dnlh7arn032bxv9i9asljuow01lj08jyz',
                responsibleUserAccountName: '6l7hzj1aebzyd50vh602',
                lastChangeUserAccount: 'fsevlx2x1uskpdgsqx0m',
                lastChangedAt: '2020-07-28 11:03:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'tmazvfq4g593btng4m86q071x0zholtvav8vc5k2ruad8lyfaf',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'kh8ar23a9j4jajpji1k0',
                party: 'fqztey991i4i7l006yudde5h5193e6wkn0p8sn5bafsd9g2ijhytcp6wmxc8ghis3lnrx7xoi3m3batflitaub9vxbtk5maovz5r230x1pycfr139q7tg4q18cx05rd12cvac8x9go3y6sj1ouuudg4frzl8di38',
                component: 'uqptwxpf4yx0e8junwrmg85uceq49bhgdhldpgw7c3s092dj5fg0itqvd92c5b89kijoqmzlq00t5p3nioe77d1atfoa6hmxmvj6evq49fab9v95bicfiujvuzf5kik1o81rsylktiev4ny649es0nsxd4bil7bm',
                name: 'bk0hh264w8m98vnjrgrmra9fjvf9kitixup8rsna1tnbp45zt1e9opptwhs2isagq7dxgjrgzpe9fx75ffazqkimndl9ox1g82qybbddyj1hiirpzmjlzv1n45cwjk2zsyaar8mqs3gswjpp5t50va0f5fakywwj',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'rt4qvt548t3nl0x4cklg40nw6yirektmjm75zbaa98o035fpoefuk7pae79ypkvp3dkubwce35yl45c9ueqlcglcw7492qg8iv6ajlxv3btph9fi1qli2g1nvalxxye1a0454nswebixse5pvzy31qsrgyhjzkwl',
                flowComponent: null,
                flowInterfaceName: 'i08g902b4unpesrh7qizqb9f6me9r38ptpt836bk3dnyaim3q7bcyt4e6ueftfe3dpzqb2fn0wlvx2g6972p17anlyoaddrutwgaxxuax02gw8q3vbm0xpqexp6v60ucaexliwmsyok0v23aaa1x49k32l0linoi',
                flowInterfaceNamespace: 'a561vibw5xcdg0g49xorqk8hnb3yn1a9zg8r32uetu9577ag0qq5ru1s7uwrfr4301d4ykcg0wnngz8m6rqhhs50gswz9br393rqxewbak37jdnmeqoqo4k76gbmpl3yo88dvv2rig714ff5bf6oa0gbk602xeh8',
                version: 'h9ngnjrmsdm3ngqq612q',
                adapterType: '148djld3bt6ny2ls1ycdf6u67967alae2zu56lkj0zmjw8hdys07718aq82z',
                direction: 'RECEIVER',
                transportProtocol: '0cnm4reyiq5oir5d9rjyn08lblqovep18fgtr899mgc19vdrgiebp2uno9gh',
                messageProtocol: 'szfhdjw1ohnrpn4mobdl4f7rnjnvncly2lkdrq7w62i7kl5m0cgvohuf7lzb',
                adapterEngineName: 'c1tittpbhcovd41059nfccacrfv6kksd2dzcror0pfl42sn2nbcdxsye5ydvbi8fjgjunngirazet4j81xfkunyga8jpge3epvt4arxvqydnsm82kp7h0nurj28rs6psfkyampwibwm029bruqy03i2wez0c3eim',
                url: 'zinieaqoko72hh1uklobso4dtryosokdtsg5bbhob3u17md5globebnmgfrmw3ln2vgzmsr7aultpfshlbm2cihvububuedtr6wmln1wdfav2vlx5ynb7nhbet5fjmp1j5v9hf3myvtregu03yl4b9spfvnpotudzxhghbwye4dfinrhgox4c92cll2rpq6lb2tfj55iqvvk8a3erohd99hyagzauloc8sajqdt9qb5sj6nf5a1feufendme9k6vnfqbegdyhiw0gigyvq6ohx6monknr7vmqwefc5nlhyelmn9qjv7o4kl3disho7vv',
                username: 'r10gsq4u4hgogftou3mfn4mnnjepmwfq8g5gaqzaiasrsetv6ojq67md3o1r',
                remoteHost: 's0e5fkda8y2bwwpabpjw4w8aubr23sntiitenxmojx3e6ex03r8bhib372ti3gndtrgpez45my89vjdrnguyydc556aqnoy4qs9l9w1ra2epr4d36yzzan4n4235rs8m4ifi134vjmmt9cl7j11p5xwud7j7c8jj',
                remotePort: 1121588976,
                directory: 'g3cdj3kg3pdqgvu0ynd1hxo3n62eoo11ph3ck2e0uuqinhee0ux3bdgdztou71vf0h1wcrhfr2g1m9is77kw5w52ggxbwvg7askewyje0t41qvkyxzhii92ogjv9dj0mmjbtgsnby6p9p55zcuwbzgfntlsy9jqawhj7kfwigp1q1np7om17oo0x9zk0menv4ywvdk649htrck4k7rg9rooo9uptsdn737ovccrn8cs8iso24p7mruo4b04kvacwq243sz19pt4f5q8sew0vz2aniz2e1mj6ry54cz69onnw19xbm7m4453phakbz4nqnc4vdxxlihpcxrvsl0rkpri9sxcyah3jj1p4k1t9tgjv891cqz4162lzzy31bh9pw4pdkbidojtvaz65w57ammzqi0kw3t5fykg4fbldypukz9jxo9u0pgd0dkqlete6ofbqj0lir96nlffcpdi9k75hlbx0wh1g4oeyaj13i2ndw25it06xc2eoa84rsgkr0e5611eoqpdcvbm80setuzszdqd1nkcowyi53ke1heewkteqfafba2zbh9pk6y2fpvf3tmyj7z8b7dt3fpkxx49s3dybysckebp5ixkhomfrqpxid9n4ghghpwbs19e62vltv7i99c2sfv4uso6sfjg6dwpbi4pd0o4joarq1nxfz4g3ad2qpwcf16iwu6jndneznkpnqot2ib5ku78r3q475blq3azqo66ny5rbi9wbivm6mct4iida7qr4wydhn8wdrl8pni0ck8rl02z4dzap2fa0x00fggmw0we37e0jk4ilm7wo54qmjvg66xgtvqek9lwpamazctc5f6ox0gv9l7zpe2h3i7qr44g9gdydz9jjc58opd6oc7rsls75i5xwmirmmyl9ulapfzh5ediiuo22a3bawbmeje8wnrcdwazhbu4xrh1czcrfr564r3d3de54y48n3bvtgngcmilibai7if7t578ftot3oqldk6czrac5opgkuh9ux3rr',
                fileSchema: '46sqqjysfjz0ll3auyi34yw76lniuxgy28j0rjss3h4808rstfv681vyq0x9bpw5vdwnqanks4vfe6r368pbqd4at4m0hnk7drt85ngw651sna5e4mhwznyo5q0mnekf0z2krfhjj52bj9yyfm4exubnzyntd39it4i42ynak29zgqsne11u721lle2jlgzxw8mp06egig0n8mug4dk05gjgoz37o16phqvjx6nvhwpqnv92fy6m14h0tm1gez1giodfppgdv655ubayxk63bxcfq6vr1wvit173m5dlrkbhe4mhp0cj4ifjclcx8ydni3je258kagrzn89rghyl8w8rduqnb758hbl4707k246n4dnigrh0lqjqcroq85jz6rx2uvn1zmy87teulcae5zg1ctrhvm8m9csjr24qd2ug8rjyjbeh1xu4g3s20zi6msv3o8bghb5g48h9ntj4yeuwloktqsb6cbzdz6ert246hadap70zjllj9ghwg0ua4litmfqx08f5ft8wt0jivlud6q2qvv3dkwznbihy8hdc0lgzaezx9dhp53iveugaehxcd81m0sztq5xhnouszqdnfj9zuyupg7pzqa7yzz67oaa8wfvvk7wpudxppjz183rziivps3x3mvgjqrhrsm53zl9xqj7imvr2gtcumnuaf5o4s31fr0ua6cl9uxsqi191aqenppurxe5px97oiyhv1m9kwyelkgadw6v7pgx1z4zfx6aj3c32sdeg10idt1amrkgi95xvaj8ej1525y5ruzoakyodre5z1r2vcpc0r2wze806lydnbmkc9utme8lesvgrcbhfilc9zi2ydpowvwnzx3byovxv1xy4ybmn0gm3bln3tk52zyc5msqbw08g3r37se085pji13w6d95ggdgexqmm5fp633n86um81yzqtuj598oydgubp4vaxkfnwtvc9wvovcogvj5mgpyrpz6417mp74i9ogcet2m31svstv4n0cqv21mdp5k6',
                proxyHost: '3v85b1boetrg3q308wwydigmrx68pc38t2qesp93btkjgv1e1554wx1wjbvt',
                proxyPort: 5680395951,
                destination: 'l01pk64x4trjz6njm8wmmbiuko5brkl1aguyudu6bau40nktpi2g7brjwlgp2pztq2r3spnuj0b7i3f57vu1b4jcwtfw8gnaq5ym3ntiyhqy06z7mjv2lotqepfvyz76uc8h87kolhc73lzx1hm5bsiszorjxxfj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f3isz9wer3sbsfuqo6i5ekghiozg0u24fipxqke4d3ia9rx04wvoq9ib8221vc2iaiux1wx86bo6reao04rfwn1pkob2r39hwjwn2xr4sb39lhpn23ut63nmr8n8lu7yrm2k5j1lkva2mod0b70b3qsto57untdm',
                responsibleUserAccountName: 'xjrqzdsbmht9lbhsibst',
                lastChangeUserAccount: 'f27qn0suedvmomtfy1ww',
                lastChangedAt: '2020-07-28 02:07:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'zzrdytuo47mkz29g1obf5x37weq11omgwvz7bhrt24qk75e5l6',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ubnz3v4b6y1ukagevr31',
                party: 'ztm0d78pia2woasq87eun8dliv88thex5ru693y5k30ye4z9b3ti9n7zh45rgxho9p68jrradr5yji1ozi73fi4ifvjzq4m0996704b8x7pv65qadjoiumfgdthi6xinwmi0l7bqmzcm8ct6ehaqszjobg683you',
                component: 'ece97a418by691swc777kmowe604took065199mjg0snql4t2d2l6rhqhzp72r56ldvik3n4rnopsp1qzlomgtz6xf5utnbrryno5im5vnucfd9uqd46xdzg57ynosdj590kc431gf7y59nq9f4jlb3mlcgsnp2x',
                name: '88rzvp4nnkurouovmvadunmzw1clcf97dfw8owp0misjxg66b0u7eve0u2yw6iks5zfu4kdauf26pckxv7civbazphvk67c5fgeqannbaflljwfsrvfpqvjue8dk9llfn65m7rxsufky2w6lf9l90il6dx9xiss1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '4gtvp3qxxqetl7k0tbhy9azii6nt5rjkx88u9j6awacl9y09zq7p8bgz2v9h1r3vlxqnzb7jyo3bsodg5cgxyfdpec304y531l2uqfyju0khyqcm40nl7paz3bhcjb20m3kgyis7qcfe0gpd7f0d3hnn7ljmhby7',
                
                flowInterfaceName: 'yejhq6wpcemr5pwosfuderijyeelcedx59qo1l8kioave20c1kdajoodylwuk6kkfgsj6ribajdk5jmidju17pc1z5kerf3upcuow11eudt676gkvn482hb2wn53h9x2p6v9yndaja11qjxh9ckj4pi0mqqw939x',
                flowInterfaceNamespace: '0odcvgwjd1t7xbgwip8qm701fnz5wkjantqeqg5d31rf8pafpxvfn9ua1kc5kh56a3zi4fmdjfu8jr87v9f0h8hqdghlw5c0ojnfpi4fynkztifmr8eibvh7l5wk37vg4gwngej1hibthcjofbsrtm5z9j5gp9im',
                version: 'agzm7epa9o4nk20sm55b',
                adapterType: 'iildpu98pppwjlbr56mjk6822e0cvsjfexynn9ldtcv6bj5ivfuy4vdthnoz',
                direction: 'RECEIVER',
                transportProtocol: '5svqodv9m667uq5szvzxcphyi9vnwa7z9zjlqe81r4oecivt17uurmcrxw17',
                messageProtocol: 'lqtpvlzufrr5p4kc660xkct9pm49he64etu5ek5nm1hn5w8lv206cg1k1za6',
                adapterEngineName: 'hjmf8klc2e33phstd1ed2714uu9istvpa31woqj9acmyisv6swwdwlsqmxs36hs7jxr5dtzxouqvzpf764no9cwu1f2sztiyxr61urjzfewddkokd2pjdemde127158cplp3jwnntnaom0hz905ins0ngsndx32m',
                url: 'lpoamorbmiylh3s32zzld0u0g52qrymxm3ywov3mcwjld0fkwt4e2xf3eltphlp8eu3iu3k8t4olsszhnki8y1h8xjejigsyja58um3cw7w16dofqn3r3r2i7ojtnqxagpsam5g6i4fue1t7xa44ccbhtnzg92epm8j56za2ux29pg119dwvw08gge49yotry5qcbojmobt1gxt53r4zzcy526bk8ljj9ywactag7ass4yjxncj23f89vhww5os0vuyfy4mj29iscnh6u8opqstzkd4gii5oils9fa0oq7qcx9sh8u66nw3ws3gq8o6w',
                username: '9vpgkbzahve2smh9z5vp81ct0vhmcaqjxtmc3x7s0c2tgl0wrm73pgx1fteh',
                remoteHost: '44yiugoxznn2jlc1b0g7q7ycin3t75sqtvfq833w6loy4tsnmzofkc50zk7enyqfvp9pvjwz8382nrdk53zxuliaxg21cslyy0eij8r2pji917gg76dwun26ettasqjtvgyzdnw5orz4afe9atjrz62n4zp7s2a1',
                remotePort: 8503679246,
                directory: 'naddaivovkgkgiqk0fe5raqr9s1q0r3ommi7fdima9np69owi767hqc6ojhxxrvamhcpa1fd6y348whx83rtrcy38jmzdm156ymairrvmt946puu1fhv2mr4dzk996uwb52jey25wx78f73nvc1wn4h0mgkzpqkgff3adwb6tm6gntkkp3sa2y6g1t3ygwcg2ye4l0zqucpchzeyrqwhzbygmwgef9jzfca5qxbhtrncogwwt8b7hnqygbk3dtv6ff470orvrzjpqfqzufizcx6f1ikq7954r6siv3pfn1teelhsbjf98528rly8uadghbpq2fo0dh2pt20amf9nez7d56ofmoyi1px7faqjpuawus7hewy88zp1w49t6mhirhz9w5yr3ctdktex7p1ue60505ee4b5ml2hhknwww6ljsztaf68d6nvrwim1gu7get5g0vbjb09i1wblimrx7ti79u5nj4f5dvmjyc2qtn178uu2ddcwfdtuczhwn5wo8kxsabdh53ncq3yon9tok36lfb6bbuef1v4nomeb7e9gtv6nwwsui781me2ht8vm2hsab677dhnbi6vvfop7keexbgdjkli96aehrsrrma2qk3gtu8soanpmvknbvter12r05pycfbsue628s8ukhq3m3zggyapofzxmbeqlebmh3qygmezxctzkyhupixs6wdw79b9bbcbfp17hhikbam9rrij6y2bupn8ue9j25r8zcc9856uah6okhbcm8apfyqkwlzfye78l4f3bqwx5icxkabtseax18c5hdt2kqxyzkesiqxv8faaw0q2j3lran84hlh71ekah9rdlk7xulvhjo09tg5t9uk4wumb9v9032jhhuq50cbsx435ar36xuy6a2c66yhf8u06hn000zwul8opzg7jz5mz36edyupory9pvlqzp80pxqdr9itartxk86p09me3pulpica466r5l23m3rjp6gxiby3lyeynqvx57p6l6560rlt86fe18',
                fileSchema: 'dzioqfc6b27bvy20kmef4jgli6x9hsgd1elfhc415pdcm4tstsrbmmpv6fl2zx10966prb2r073khefiucalcsz6zddpzblrkd8m7k4iad97uofofa0zu9zkmxnvmkzniv0bs0wvy93ngp4xav4zrxwrwsmgcnoofyioqm2tud6w8wlijir4f7k1yv6k7n6iv82rjodorm30n2535902xfmxeren8dko914txwdk8za0oqknxcg3gdofiy6k1i335puleeu3uhfeywpo3jrsopmeb202d3x7ysr8biufzk7oc9qtkef10kmgx375t61rmums49ds8enkj794sq89lbhxnybn0omgx7x5qizjklf9cflls63tzw78r0efyb2mhn8asrie36kbtwlmb1gpo4pxy5pif211i5yyfx1ecmpg61ddtdjyenviqeqtql2se21kws6wk4bhwjp45fbmn4g57xarn0lg4ogbv8oigjxlegs9a888p7xytco3dj8oslv491oq96ryrgtvxm22tsj7l9ybzuswbdo43e7nq0emitwt596ch16tceybhgkq8pxb3zarhgbhrh38vroias31aft7ox5s8lm84mhp4srzfqm53hyysvx1omuy7ztxhp68ws9ul90ccw7v38yd7evzatwksywzikv3629fvzl71jyk2uiht8wylb0ak8i0wvle51mqqkl2vuct9ktdzw4zbr297svvuviocs7y8vlb6oek8o6htd8782wrj5tsqyqzssmak96qgzesxislu81ttxcr9ghva5c2ft2re1vvb4uv32caeeoijpdqde5g9smphazlhppru92ngeoz78fmi9u8yss6unpkzsmi00idximxa6j678gqj48bu9lbq7sy409r1vfpau2t10ddvyj736eoiyosg25b96cbvjhg1wlpqyef71ugppba4dj5ew2xpkd8d8rrsgno29eeelzw41zqt25rlcyjnbtf2t2zfng9ghrdtccp2y05vo7z',
                proxyHost: 'xwdcm60ejy9or7fmr483wzoeu7ijsbvjifyw3k3qh4t64nld3oxoqxav8ane',
                proxyPort: 7362349966,
                destination: 'ucfi1l84wdeia4azcuqulad5h080er9eqqfsdjdkpbj4hgxwaugssbma88kpnoz3kj0aggx0h6vyxwuh2fsewircky2qya3un79epxucdhzd27p6ovadfr2jj2m895dl7e7iz4h5e13td6immuhg9l55yo6xavds',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ffl73d8ywpbcjxmwf8qa05c2pqxwyhtm4gfn4svjlpkhlttndbih4ijs8frkr6ctx0bovlu1jf0yeq1qr4hs0bvfpah5kqdj7wjlc5ovwa09tgklzffzauqk9w3rt22mobg8mwmrtqt2earpwtbawpwkojx2k2rl',
                responsibleUserAccountName: 'ydoirod92g3iar1z9pjv',
                lastChangeUserAccount: 'ppa0ciiv5wod3vgni7bp',
                lastChangedAt: '2020-07-28 07:38:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'znvr42lu4y1rmm9re92id1c1x7v2hyquvqrg9gmyb2wxtbtm20',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ui3spezpm9pg81klyguf',
                party: '7mspuodvu1suqszjasq98efcm7yugxttpus6ue2ngmjk72zrwnt9w2nyznp5f5ihnixkoiwpl1vxkuvn44bzobzsx6g7hc86vou6xnev0mk0qbw8n3qxkev5pyi5766sn51nlididr9i6vv2sy7m44532er1ibl6',
                component: 'xe82p5y6jn3fq7tklpuxu5sxbfve77nacwc6xpcu9djji6ys3813yse7wp4879varcc2pnpkmwrq8b1zo62wn75g0ej4fs008w0t2904n6l7r7ehhp0j9kubuam6dmind3zi8f7pdwx8o0307bzei0zuumdrwdov',
                name: 'e3crxb8jo1o8g29fncqrbji9srdbcrmkqyqqg100cdv9lk1d7hvucewfwi78wzq5bjbqo5jthlmwz4e274c3bbx1iqswyb54wdx3t3djl8bgdlc80p8phqedttbna9a65wmt2htbe11hscrxbwhil2d66sl40c9j',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'c0n5cbl5uj9ecac0cduwei0hrbcqwmtye0163tz7rhbr3h4cbu4amesi5mu691gitgc2dv7hxibu0e3xgtc1ptrbhfubwb32g5k5xmenr3628zcyizak5qfioezgs934zzklpoylke0v9ccnafah9x93cuynvrqy',
                flowComponent: '4o3chrmjx8sbihxsqyhdhgr1f1u6bs3mbk00we8xd414eaeycjypj24w7pa1vi0hnnltjszowmlz64k9vltjhevu4s6kfnyjublm9lpwdincv5mpnz8stsezy3pppgqddsj5uo99lv2st8lkhozcdb91jipm9k8g',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'np6o5nafk004me1xltksheaze6d5gdgooo0ly79fb5v52569lncircwcwt0ppottzvu3zwcj9zl8oo3hmxk4ckdzki36srwl4uffhi1cznklpnh6fys2x4th2mkio1g4wvnld0aqisr1dlm8i2hg6g5qv6vksiew',
                version: 'l4m82xdnaljuov45ulzc',
                adapterType: 'wtj2xbbhry6pfk24x9d82yeeny968924k1esj6av0u98j2y2sls1o5m4qfxn',
                direction: 'RECEIVER',
                transportProtocol: '45nnqlznankl9f5uokrf9bchmm8ft04jbcp782bpo6ae7c3ojmmnr945hlzh',
                messageProtocol: '5vs7cfdjzw26ne7x6a6c1xilc7u8wurzsm87ogdbtm3wfqsn7wlvf2wd4xfc',
                adapterEngineName: 'z15psxv8qb61sdjwirt7ytqa491g9rdeop9wppgcnunm9mzbt6gsehz77s9p1dotznc3iogbjnh4e85199rlczz0q5qy48j6nyz7xgob2ue7xg4ws17bnjqoq3jaay2gs0t9hzj6acz40xn94ihjwnqgmmoifotd',
                url: '6wibauu6xo8jzh3u7agt86mhbem3cnp1xecn6xhak752kzpstcmwrsedu6xc5brnponlp879q5kbhcodsp4og3s4xb2q1z9rk24y85cswvhm74x2rt40dtt2vw7fx2uzi1kldtsvp6ndh08i48w85229awmo7fj3ba97s8of7y1g12etqvd96ta5obkl5bpg8eqguhooe63k271wtqtxs9f7dpvd8unedd39dru9e42xih5ja6ppo4ykdgsmms0r07rc0s57qisafgzd1j2iybg8gteev1bbflhesgkmqhy92x013gozfz4hb8kmvycn',
                username: 'em6fbih6dshows82azfsj2et8s7aoa25cknmdflymmfw7ekthoolxegrmxgr',
                remoteHost: 'nnqgwfz0l03roc89nf66xqgpp6lihhxvlh6em81l8443by3806a4kbvgbgjk4a43z5ux3m3xhnqs9afef12ny8gcohx33pin9uiow2x2lroh3ljgteg9a6aza4g6tdavag7cwr33ac2zi07hvwk1sh2988wahomc',
                remotePort: 8428988983,
                directory: 'i911lbgmktu053hxgkvi9a0p7x8takekbu3noktfq87m8juvzkpdhjwltmob0mu52e8mspxcmhb0epm7gp5hhlhfx6l7qi8vtxjpm7lnw0g8bl31yq6emiby1x9ytzllwbbeh52uc28p9cy8m3pggny3uie7j16iximh51h9zyyyg46ga3mwnke32g7uwkumvsq1s4h0u4soxkswnjx7pv2bpab84dqprwsq4nqmwb0zc1osa8vj2jka00xqy337cbnpbeeqwe8gv11iww74mrad46jefqerosfdz14o5hk4shlmx41kwz557tc1fq2vtam0ym7pe7doyuamkaus3ll22cl5eoumnulg5hgnzk8lbyz3ubsd9bm0qdj2amtw969y043kz8cl7764zn2g35das1i3x98ijt12afq6l6xb9sa6z8gt7bcftm6eiw4xbkk3cryqp5vl8wyesgaetes3411axr6fxa771ktgeoltmxvpuc2d88eu6cl6fabjddagie71ybiyjnrpnv5bvw26rly04carnemnm8l7ndlcn74391b1qerr0uxeqmlpxfnnhkw9wzkfio1v7zen4hc8zrrdcvi3xxizhr749bdgjyu5hcuv8bf3a36ucvg6iu01wxtxdyaxr4ii1qowvo42jwz0ppwxb98slz3sgovf6tn1l8thmrwtqk1eczu1kddr11nqj8pioxfv0baiqaj7w5ock0bqetxswhzgxs2y5vg6n15b1gacl2hb61k77p6o8r1m021divoiulk2x1k3kem01g05swpzs777stdbro0e0aj22o4ki7j3oguv13ytmti28bsui33qiotnwdi5eltlnwk6qg2s6xb6dlgwdxirl5j1is4wpx1yvlkc25cplttrocwup9hifugcju7vya8cp3u352xdu5q208jyzcmm1c71omhve3gmmbsh209uw54id37nwwuoietk8axtglp4jv0dg3ttnfc4v1cmrbt6fvoyzrx35ukjc6yk',
                fileSchema: 'z0ew3b0ishjx85v0z7adf2gwl403js279d4q1xl6btdnpmf40wqrzjvqlbp9l5ibfer9eleduxkmpc6tyub5qcxdc5rwgf5wo5v3bolrg0b50tz7ro8otjjgwrq5n5mqpr4wlmu4fn443cgbfai703k1dwdlm6n1pvws0wx0x2ossn8swq3lxlsvxdvdk4x32hgt4l29267nqocmahz1agmv3ebzb1ufsmocsjfetd8gmfnci40i16rt8j8ynz4729pzjo7xusr0vr7c3txl3y1n0eofbud1c5x40qndq47tnxnk6evaiws1o2vsbcin68ns6r505cby4jb5kfy9hsu62gvuq6t5r1434vqid9il7equjurs0vog0y4r4cvgx3kkjxb8r1vjapogi66j2wg3uofxnd1usazbjeowqppypm6m1pnlvpxvg3xlmw2vgprp0c212zhh74lgtsdbdkv7f0hru1qrbt989pvomse6bt1z7bjg2hr7yrxs9xidh2sfywddmk7yqifxm5mjd2pvdpy6v74iyonpi662skbpgd8rjwsxnlg4fwcngml78l9qsfg68j3aqzw8ehnoyo0b103lui7717qvwd6184lr1mbmjji9y8fwzq9pn0l3w3w1knfidmhm3k8z257y2zxdcv5hfoef6f2byzefi7b8ah9n4086hcpuoq97s6ieo1pjpwijemv36o939fx98odnkt8wtypulhbzm0scdzx3mnlduya7o4wjgmkf3s6pwsu4oak6lt169hrm3n96i48imca6cqhhq0j9n17544za5i32dt6pceby5mbdkq8lt1p5xmdsn79uz3ne9bbuhdwk3tgubidcg7h684kddmaab0emqn6a29thraqkxc3e9k94ziowpoxfholscr3z7gy785ib8lct5xahtjcsczsfpgzuxqawc3tcb9chrn1271l8v26z6z0b0lwq0qjndpb0gz60tucce48l49p29vcrcdkd2ywwqjzwd4evxzct',
                proxyHost: 'bknhhcvv33bzc0s1oy9pqwjz9mx7194a6yba0qy37dbtp6ptmrnm8k14e4ys',
                proxyPort: 3170194970,
                destination: 'hxl03qyrl1r4e5ma723e5732pidwxmxpehjn2r45mbo9ur8xjkvr1w4wh6z6y2y12ynytwraub4325xnuk26x0qjkj4b0bn7z9qj9zx41rh9ia6f728ducjl1y76l4gi8am3wmhyurl2bv349swlicaw7t6uaj6k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lc0p7r18cvwrhhjfib5d9qzlshl5hv867aa5xhrmkulo27tf436nzqnkv2x32vpwg99dv8a2u36vmu49x7qfsmyy4mj63t8vc1x5471ihxsjf0i5a978hgima07x80lz8vwb1rj8ixagat89avpkpcxzgso68jr7',
                responsibleUserAccountName: 'hzss3ilq2gu6rt41e6pf',
                lastChangeUserAccount: 'pzacyf22yljhisss80b2',
                lastChangedAt: '2020-07-27 19:27:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '4xw0ladcswf9tj91u3g2qq2a8agrrj33ki6rsnzucr05oifqyn',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '1f6vzfatd49ievx8mdut',
                party: 'uf518v7p3mx8nt9uueqemeob1a0hx3eas50noklyyo2rffjhnqfshgucyee9apselk9sba3lwtxwu3ln64ymsyo2t7ltafqm0l7pcuqg1f8b93zb11q90s6wlwdnp25ie2rnayoyq2st04xxqvs9udjb4awdnkgt',
                component: 'k2nsso40mxq59nbhj7ro9btwpct3t8pt9u22o38v1shskrkdbwkihpseg7i2be0b9xausooliqg09r0sg9wegtprfyd10rb5s2ajjoiaangg7vlest1wkq0os03bj1h0kuyek8bta6re9i90z2e3okltjliy8geh',
                name: 'd543loe82hy0eyme81easpchn0vobwtu6f8nwljxxjhpygu52152cqyd1ee6xs841bbduiun5siwkexrmmap794zrbhysoow95zrxd2j1i0ewykw8vsqpzuk96hqsht23x5rcrwh317z1svmj7c4f8yjoivu0zem',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'txva529teieieuvbl0xsion998jywk1v8coegdxsduvc9op2m9m75u5b7ygfn7ng15zp31wd5ikec7e5341gnuxsr58r0y889ogzmtll56kq8r0qxqwy6ubttsvc2zf8gi8zuchepmnttmfhnrbu0stirvbqc1f2',
                flowComponent: '3fyn9vvxhnnwd2ojbpefge2s8apv924b2ev8rzm37y0spqbxj4ndx3dosrq0n4ndliocncscqa9l3y2hqxcwobbbf49o1yfwjr5rgfndylvzyhfuh5eths69rqvzpyolces7v59atp0s5nirwe85b51goqwxcxry',
                
                flowInterfaceNamespace: 'vjk46ll2ibfmi0k5zznvgx7g7z5pfdkpjjfw1rtsp3wkedjdw3egf4hgei9340rl8gnl7rciqnlvmn4z0v445etjiuegowov55hj42rn6g8euuqpwf65rvxdutcc5gz52yytaw1aifb2zv4yhgx8aguh2nvd3wej',
                version: 'p325mbf31b0gts9yh23k',
                adapterType: 'v0jd4mfrkomd0otqnludclepkzapxtgecopgq1qgfbiz2o42xq7z9e9b1r7e',
                direction: 'SENDER',
                transportProtocol: 'nto3u86obayu18dib53blkf7diu38v6fafxrrgn5jueb3b4xnppfquqpw3p9',
                messageProtocol: '585i3jgcwlff6ovi9sxtooe32dzswyhhssyim6ol4xq25r54i3falx683h7c',
                adapterEngineName: 'gibgvn4qik0neq6114aul8bn9kui1zp7099iyi4obdg00n7bfbqbsivzdqlxojy2pqecigjmzk4hmt6pilewnchn2m3g7mdckqqtoj6ow4s06qwhkt2qqrnndn0b584icqreni1c7sra0t5j1cgnx2zy1hxa86xp',
                url: 'r2qu4a9icingbb7l09yjlvrf86a8rfduji3t81ufiwldswidgxtiljgcscszndlwuiktodxgi37y5v1c4se5t9w0r5nipapj78ezw5rckmftmh81j02t7lp2y4j2rpop90x89i7clikaaz5zhip1zdz5vovz0ogh00bg7j4jd484biueksjy077jk5ifki3ecx621ama9dfcwpcveikear18ntswh28moi9b1w9ty0bpi5crmogrx2zxepkimaayxv7mhtc7oavmtgi26gjzu3lndze7mfqgyci1b7k9kttpk73t31dcgn0plftn38kj',
                username: 'bd546iqvjh4tkzs5slmg1k96kfxgcgk2pw8flrfocfy2c4dr9xr5hguzznq2',
                remoteHost: '0t0t0eynkdj69yat0br4tspaago1s7tqwk7jwjzcrq24qotjm7tjg9um5yu2r9ycn8xb3jvwgamk77meve1h708l3gxydghl84hm5v7tmymgr46kp2f1j4t0ydfzr8ka4mjxlhn3x0cxp8mtnp1cle00x69w2yha',
                remotePort: 6946731429,
                directory: 'vnqkghmqccn9g269v5pa12k7n7cup1kpzhmhtbk1941q2duw9m8v9csv7qddb23jrq94cjzzx7p7h3btnk621xzqmzlqmqa2k4kafbr0dwz73w3y5e7ljg2utrrc70geeuzpe2cym9vbrlwti8exmnunrunvfp8ilds2aj5cx4aodgcui3s55kthqff85xvucetnk4kl1td1ygzaivfrchvzui4svhzpbg5xn0tcugf5tyam7nobew2smo8c3vsp7rb020yr492ts5k3wvki5r2f8zru8ycsbgptfya27z3k9yohxqj2p3q053wr008kr1kn7sq4i0xel8n1oxf31yocssesqb29k7lrcgkkvg77k97ppsq3pph07n1dzxv3qahw3aeyfgudljw929b3lyvrre5bb2exk7fartwhlf7fctfg393dunrkzq4v6db1jcjoglnhqsbaajdtxd6bnvzihj3hu7aotxw5w0lku1mgg3ohx0mmyjoc7ffrku0kue0b0ne7oca6obj1lnt0ioc9651en7m7wvx1f927iyph31ldxvhehgvtuvq8euxo0zi0jj6r1m8zdg7wqlp0xl18thpt7feczjivl3fdhaqar9785q2g8j0ldk3erwr6ged24wajd0tnkkskpapsw3jbqspkoec9m5z407rtio3m7t8i0ft3sd6w0y39u52a87pe5k53eel5bnm84rnntrk2tkblpw6rjk4dw5n9renhaua283mbpo7yui7vfuxepdonesi0n8vgihpqsklp0y1w3g63usf0tk8eqh4af0pap8eynqgc3q5lvzgb6adz5r1gyh4gfnj8kn2wamc14dpw1zsinxwc0pn0hf26heoe51h6ktx3xqv5y2rc1xsb63sp8sh3mm1fz6pyoe9j1x22rhonfhxnzc0zvdj9wqoftb3zh47zgq9meji3vay57s4g40pmwswju9cv99b1ufjl5tpmyyn2jaqo1befd682wtw38eoz6y4ff6062w75',
                fileSchema: 'yd5xa2h51ojaod4r3xva47ihi1r6267glrxj9nkrd5irmmi8ucrzlw0zh1zsjoauypw3g9ufxlxhnuki3d89p7zaxtvrwmjcdcqnvhm3qtj7xno49pwp0rzqbmftmpunfbkqobut0qjqust93pst2w5dyy2ecxhhsc9vbzth8eijvae1a5fvarefat03hdv6h7s4jz0rkkxkfidznd4p0ywp8l90kbeubuec7y3s3fh6lm16ycw8lmzr6dlzxqbg5incl13izqri6sq5ldzxqvebafrra5r485jka9hlcd7l9bam9u7y06ratbmi8axuc5d98j1hjdrpxm4myr7yebu1dll4crdxe9yavtavp9sbld3njza2zzh0cdkm76b26zbsc3vlxo8j1dycpp480j0t4hqpz8e6xlbhh937emuar1yuixpx8ergusr30e8f3utfbnqu2j8v7rs4f4s2kbtpiv96hma1ius0ucqrk5cc9qsrwy9cg6ul7prc2zvtw5d8i8ge9umeo5a25gbyxftubnbepf59snmwu94uku7u27o6d9uhvpfnsi05d6p2xgxsp26j2ju1a38zjqi9tu92p318zbrny3msudad07wm47fibu6tsd2yy1zmjyq7zxojvo1t29e627wusi47zrpy6wxsgqphmq6y98vx86e6zu60t7gjldhpt3mwyonv7gcrm4qw5w34fa7hp1xivytlj0rrzgo99qw4nhx079njupomrluofoqdzxzn9wuotjhjrzibtfxi8q9dokyhslwakqnsiq4cla5350yr1sqcvdwrn4mlza4sw7i17yn2wh6bj3x5ae1tl9l3evasq0yiov91iuajfrtmaiek9p7eo0kmd3j39db54koopov1qg1xbt0rp7cz7hdi0g1cc38w8kyqyg5kgpypgzp4arlwwuqx5yyv7hlabrk1wligmvrt4eaaz14fzxbgfhuzkdg0wxihiqkib2xa3kkdg501l7u8lg2sh0z6jxbbsvx7',
                proxyHost: 'o9752bgcxvn4951q9s3fzk7w1ytyn09vtfeoo1k52x82jtoqi7f3x0y5j44r',
                proxyPort: 8802085729,
                destination: 'ww6nbrcl4af1rrufpejatqluqoa55jxwaw9zlp3j0rs5cqgx9wa76a965yimtkysdenuex46i55qtbqz2s23t7rnqj9k1h3nev5gv174z27eaes9sx4tz4r06yfh4qbft6wmabxtp8y7zpnkpi7a9wxxiz3noiqq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z585u07w3vayrn8inso5lxkjvs1qw9xx6727xeu5lgdgcqxe2di5m2ewqs3783ubyee7o2afohh0owtdxoba86msgsln34mesffz8lnp3alt2d2yshr1lpgn3kowpdgc9zhg3keoymtuy8zwcq215m4d87tm2idu',
                responsibleUserAccountName: '3jo8sq6ym631fxjh58rq',
                lastChangeUserAccount: 'es6kj7iz65qaxcx2g5et',
                lastChangedAt: '2020-07-28 10:04:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '63e1egar3gds8gzpseehf0kw5aghg3sg771km0piqinkrfzkd8',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'e7qov4bealwx97r3o8mm',
                party: 'de6vdgga0y30mevjlva628hav6mpwl25b83ov0uy53jtz3j7ozmxw11qxgsxct3k4dprzv4nbtp5j97xgbregbqzfgl3yhnu0tygcr2hadujwds4ah3a5y22sav2p4seycpmczpr3y2o8uasp2znffvn5eryjbn9',
                component: 'bx9k33phlm84v0n4cuwch8ytgf8b0zxhsrqunqrdqeii3prj40z2y7ln6ty3nunh4hqjw76jz7g4uo1bs0pgejmqg3o35xk9i4a8zsfmzcu34pgfriesqfpmxbuqx1d7p1uhh61funacnf90b53l049rn43sxl5a',
                name: '1m5biecqumtkhy4bf1e96xa292vdnnmr5jlpqioyqz7ongcgyj7laf8jokryg6fdisn340tu1it75q1eglu0yr39ciipnki6e2i7yk8iidwtmhje5a9u0o8mlxno9irt43x4atqwtf6nd6zi9v6mt2vt991021h1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '3mlo7b6j782ov3pkt77f8c4btl7v3evq9cm52fuud11oo713h3mi3j7yb9nv7krtrcor1nppxzx0den0zcfpxe8x9co5stg54krmmigmvds8r8smvg1kribvzpsvowun687y5u8ydjbxiqtt26b17llh0w7t8a73',
                flowComponent: 'fikbidc273okqvxvtb9ahjjp6la5o54c8fincmam8raovnu7rg5dc4dqf58t8wyj5vt24nhttkwlbpagfbj6sc2ylc1jwwh6ikt2yzv4weev7lu8445xq025pngvf6t0s0zj4x8mc4k8htk5hk1fgapyvzmqz85h',
                flowInterfaceName: 's3pjmiwogdpt1lsn7txszl6w78dhyx7s07pog3tf1hajn2nrkn07g7v2ve7m2b5smrfkmnsng3rsuru7m6376tswws4i34by7hvrz4cd2n80uq3l0o9mdviln666owi631g1p7u7uksmz6qber0y8ojdu7hyuic9',
                flowInterfaceNamespace: null,
                version: '8wuqlgnirqmz8le9e84y',
                adapterType: 'bgqjwl2d219b8cno6sp5bdz90plb8l8xigw57rvy03scslxtecwc3z6r08sr',
                direction: 'RECEIVER',
                transportProtocol: 'gq79a9u3q8wj3z9upfalv6fm2manwx78mktkdmpg2gshkbus84evxatt2br1',
                messageProtocol: 'lws1onyadw517sv4lmgd0fexylabljq6ggns2gtn6yf0tsm3v5o43e1j1hkc',
                adapterEngineName: 'w3siwu4je2nb9ye1prvjlr6j7oybbx0vwvyl2csxzgovee7i4uy562w94ee4qlgtwkety8xxbxqvdgwyo90ubsntivtxbdml3t6mlpyywds6prpc3s3ijo2p4zuuvbccdc3zcwmc22bmw6u20y4x78e22oijcnje',
                url: '421mkbyw0mk6loajkfy64u2p7ib1fwttt4rwz9thy24r7yx72mbjhtkr10yakq1lif1gnfuz6vz2h64eanvoado2cms0mfrhjrdjjioojftwss3tiazc9r1de12n3z0fcuoo5j5gl85twd1keey212eyeabf4j6msjrjaxf3kn0a5u7u9582iv2vl0ry7qtgveduyena5kqpnxu4hdeg7kgu4ehvs1c49hjpi2si73loyu1rrhwmksyn8lboo7ym9jf8md1cbkzajgma26bg5kqth5n8i3dll104y3j5yzsu237a87xk68iosfxwo1og',
                username: '6zaeonm4vjqwl0xhyg621dj4cxc088r5aw7qtb5sssf3dqumc7c7ih3zrvg9',
                remoteHost: 'vj4oooivi2743dq0660p6jwja0ajpsczjf0p8vaupp63g7vpugtf0k6f8215wnp2par20ihidtf01yfxmrsua6wn8v4fqutpb6k07dbskg9l3ghfba3gtvzfl9gq73nxlw5p3orn3naduf5yrumza4zcn8e6itib',
                remotePort: 8823447842,
                directory: '7u3zvdxugrap9cd1jdjcw4zgryw3g373bxsa3db7f5j366nedw9claoqizas4u7m2oyssyh8ex5diwpq5k43bnqcbc5gb2us9l0dyxhcza6yw13wxzzrpw4tfefe48x3p7z49cljt0s5lv67ublzbxybzqoynfsq9aagy8f6btggde93cykqqkuzzgyyum4w6i85m9iez1mvpp801e67mjaw14qltyc4clnkr3zggu1c0jdzsyufaurqzdxlg9h10fo4n918lwpv2a15clp5vbiewjm4k1umlf9as2h1osnkldmvaz73mez1lphviwym8kqdrm0s47nj276beqzqzvtocva87cs7megojne4mbq905cq0vnpsd2d10sx388c6mbattrgwj1m76xuu0xdivbo6ivgozzao9mevcze76or8zcgzf2cm9s0wibmpb5y0epu67vpthctcgmkk3jp46fwtgfblbx7itqtutu1zewax83ky98llsv9sub4h2cdfg65ogl8z7wr9pffioioc5425omeq4j63wh95oup1c1sjpnv0jm9wtwal02fg8knnc6psljiua8zl9wvdi7lbgsxj8g5mf09ums23oi9saek3zn6w863tc1ya83m67qgo3y1o57q6vvpum6wfv3kndqknekkbsxa5e0ssony99qshheuhd6zht26q44ng8rz33j0o20mswe2qg3hftil5tgsqkioiv7ju670nx9ipsm7cec2jw77c4fkioscet05n249bp37up4vl0qecsk9q3inovdeaqdbl8a4qdxjjd1mwvifkaaxcgxky10kgrrs58mf10kyp2dyoz4i4y2l2xsvo6ul95dqahythlt1evuvmh4gu71bm7v3fmvf1ahvneaysp2mpl5fwzsbl5i4lu163vxmvsbv56q4h7dn846wm66ddfg1nrezb2of94dbr7o4im3682cqf02rnf9wlhi95m5e6orixab3jthhw5s7b4zd7w2uhca8ya847p27',
                fileSchema: 'di3iapcdijvy49u7vyyhanqz7zt4e9v1ymp7wy0i3fxtef1sbzb6i9j0xablc2zr29obz2z6huw2gjmvlqveu771wcw6kf8vcx0uq48iygvi08n9wbvk6xq7oey6m8bsiq49az855e0y9sbm1qntf2wzjmxvelucjd9s0fswiwozt4gkvtysi1j94wyjwm8srgp2y9hgvgmoack3yzr1en2rl3qpoqrsae0kf6w8aoi34a52rbdjt53jlhn5ds6siwbfjasbi41bhktyfj3f2izzvletytmon1puw846nph07drw1vighe3icaagdfax1gi05calbotlndk1ebdhn3saobf44wq5hnyfqtz6udij8hia0il2xonqtc2xjdh74mhemdzdu7jsyjtzeexvkt225ngihd1rtbunphphp4hrvss88qumaadny9utmm7xera2tnvtz4w4vyj9my4a3px0e2i8zhzggku8pn5lyij3u0wupzmhmkyuqbfu521njpbp4zlepzx3z4hq3aox1lqarq6llwykslm6ym673u7ets6db41h8afpxrug1ifugnjc5zwospjdc97sjqeykkk9j0xm4ipdpg3xnogptoxkr48qcp3s146d23mu0hlyjxmq0y4qwhe4gfsupp2qilcys770f09rm2i1gnc6c0lg2784tv26myxkjsoecsqvrn80z0ho170e2c9n45b6g6lpc4smzb73g1jnkpg2ve7pwh8foquh13mnglreae7jpnp3f7wszawxb20ygs8x1wc9w5efisid3ciseopxwr3f849a417x2c6rpdgk4vs26v5huh7ll9uwn9x4se6yyv4m146825lmwvysjuj32tocb84ily7ikiq1tgwpi36vf8ohs479zekfilw5ijy7irnch1v85ybwx43yl9sx1taojkjnod1nddy83h6o5bvhrmisjdihdfjym51joyi489oco8m15vv12tbrzgsxcddqmub337ga9uqjw33632xs',
                proxyHost: 'mt5i51oxdt3bcx9uc7thl2z3xg9221o34f3gpy2yoomz3z6yj4amcvzoag74',
                proxyPort: 9023475181,
                destination: 'chuvnopiu94i0mvb17v1lt3bijbjyyhwfvhafzh91hwobsc2qzeyoyudtfsjma4ejonj4kwju4zek42r0uk37t2l51ig29rhv7l58lwno8yf3g69xrof1skohndcahjb0vhmv8r5gcbnfmtkbaww8ny1vrojyx91',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pngsccdxjmm9q47o3jso4ljiydf6och3cjnyeeovvh38f6wqutfcd430nfrcs2w3g53ktn0y01dnl92fwbclz19yrutskexr7w0biuhah4hqan6zzrfdatjupfrryzgi56gl1jse311zwzhcsg5unahay2johc2a',
                responsibleUserAccountName: 'nrx20rzanzv65u9xy7qn',
                lastChangeUserAccount: 'e3su4b0e4frz50e2zdue',
                lastChangedAt: '2020-07-27 12:58:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vqetl8mtff23v3i37ea1247q7rmexwe936j2284n3vd98zwu9w',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'vq89zjp9jclgm6te6hma',
                party: 'tmg220tmkhxzb9aslblwwhx0bdud4qx6ub8i0o76e4ix2sujg8yoamovd7qxgmgw2bigu35tks31qbw4g7pfo1zqeyzuwrbxrf3d2ls0wjyh7t5o2qyycky8u20wiz0pd65lqdnmc4nyu18t4lu6t5dz8uazwsoo',
                component: 'cnfy482bi6y6c35b8nw9207dje24cjbtmr4kajws3n4r5hmsnqcrrfkjj0hloiys90icxjaspvt1mdkhpj8s3np53kmmn0c0pohv3jk0z3ciyyeca90lkb81gqdl076qa3w79owofq6fh5kk412t5wp4kqhefkco',
                name: 'jbczyd6dds28wczoz5e7yb9kc4zg9bcjsnizcjkeblfnibpem05pzrzimtsi8v85yyh70nbnuj8w5i2ej44rle98c3y54ci6699df1o38rxrjsx8l1tl7b8vvnx1fq6yyihxvdxnixj8p5e5ellri4r8ge3ftnzb',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '3xq28auqtyohpi47g2qpdde4vq3uobe4aaqurxl32v7zlpdqmp6qg1o826tms75q0a9kf9y5snynrqm3unl1cmoue8gipuln6r1q6setd93vmmoy5epj4yzciun0utnk65fd3jkq0bxwwg17iirqf1vdbzjpp281',
                flowComponent: 'vpp8vpb3m0xexqixfz1vekrxrlq7e2314uiv8st33mdr87hrryu5r3p1pr16vl9sd7co1k7ljy232fey8qxj9ttxhdeld009pqmn8qm9y3gw7fia99re8hmu8mjt02d0bntll09w53g4cfw7kv9vemrah7t5hvst',
                flowInterfaceName: 'w1erudm3bqsrxv3nq4zyxot4iy3lqg9q0mdvmfu5aiy9uvy9c2mktlvjr8lduhe2k2r7n17adniefoxyqke5fltk8s0zdj1y5i8uwtlx83sdegehuybryea0ifjkg59bi215tdvq77fqu3k6bx18z1fl3zslwfyf',
                
                version: 'jlkcmpftkcwf4w1cpzbu',
                adapterType: 'h4b1whm5klms2nrkcm6sg58ilpyk2wp6v8f15ushhgdetx11wjg5z98z7v3b',
                direction: 'RECEIVER',
                transportProtocol: 'wmf73yby0fl6yk5omak8pvztsjrro8wj3xd8f3ep3t30in1rekaypkjid6ay',
                messageProtocol: '7m1grv1p8y5rkdjc59g5hhzucbuqjie3f4ejopemny0nxfqj90lo2zdx7wmo',
                adapterEngineName: 'p4vtucjtsmqhrzn641et85wpey9rmkeb3cu72raje3ouxhc9987llwi8fzeqpbq7527ziz05ejvaozntz157ajgf8ml7pn5aftrnu1urrgvr8er1cin4gudayyb6gmr1zv2mljsiube90paowtl6qxf38m1x4kr5',
                url: 'g82n24ko3cdeiz7z5sh41hqcuufpl4ipjipk26wburdhqasinaxfiuj1topb6ex3xtzhq574y60r4n0s66lvze5ccg6qukoubdm01yaep6poauyq54ulp79du1qmol870mqmiucwz6wscepja6fjh7bt49h3zr2tqi8lbobyj91dkvxkxprtngh50nl19y2qeod6ni42lmygrukyol8mwrv201wjusv00mjd3zlahap78sxk22hjc1oeezb7adf9j37pp82wzr3vwaqj0zoxdnwobyxsie9mseg5fe46vo785wfqxd2ph7wxes0qrt0o',
                username: '0m7ln0vhsz636xotfu1ecd9k5jasxelpdvhsy0hdinhupmgttgb35dkh7vfs',
                remoteHost: 'ijpqxtmhgfe4l3k1a2jl2qvuy7vldyv9dmlzu5b716r6hyjdb5jfgh9uy9rr2mrquef8crim8vi7xdphzjzf3hy7sraidcb1gosq0leze0fqnu3p7u7e2kuwvo8dzcq8whda1lbc5ejti5v0s30puxo9ejwhlf3x',
                remotePort: 4592342812,
                directory: 'qwg7gzsdz53tw4c0ap91paa4zy9jtrs4b8jtccgdwd2geai911qaijiqnt5np1lcv70rlxiknj46xzyltp55ezx4ionmsnj1x3fyo4th5unmkqjdqszvrc7tvr4egikze028axhpdaagfbxbpwqfzcxoyga0mlpzjvki0xjlxf9iwxply821swjmoelgqskzppgwjxglpp7vekw5etn9n8y1lpnvhe2m5m46dj7ll2gfwybdy05t7zd5gajmvfwh2nk4cesg5saqdo1iqj4c9q6r1rm9wm4kup7mbemym2dbv1ufk1k4q3cidxisuu3rcbnkeyu9a5vkrb6rfv8m0eh9as49qq82itgpzqf5kgjh4ljn2sow837fnc62w5hki5q6opjh8yzxkkbs484do37scb4dmrk1ssr9hi89e1hk229agwnyzn89whk2xilar4h0ky8i7g660e9hiwofpvwa67febp36nkfmwrs7l4z1xzyj9rgkwfat9tj92hbyhele9lke6qrtnbk20qb8xalplmk6ba3d0zx2tns2c3crypfpybwns0ji36vly2enyiipbkatrpo9o33f5pqyfl8mx1puuhq5fml77lmd8kjumtc8ltecj2h6kowul2kg35iasqmqwvlgysh3y78rmhcef4i50ywu528m6cskdx2vbehvgxz0om29yn538c5v9lyyvsny1s3kp3l964dycosenl8wcfm26aseta5ph2eil1t64hoxmzxbhiezqw1bnfvd61n4movy987aacnzy1rshv2vs93uju992v6oijef1c6zmicibbqc4wn2e5re3q3miejbfqpgyejgm21vbg56d2ucgami8a66anlu4d6c9zzaaws72w34g2qyv2ova4dyjg9u98exjqdyvcmg41wahjzpdk38jlhe2rd4xbyocmic5vjmctow360zpij6iawl6qxs53wjfpc5mi3di4t7nkxhf3d1wcmm6h6nhp30yxpv1ntoaxrvjhkyzi5f',
                fileSchema: 'jgd7xcr8twfeykxlkboa2romlue15n7s4s2xbzo508x3sq5hjdbvkx9edhlcgo17ivbam53yniwh84bensx1yc4a5n0xi6xn29chr1biat2bnkooh6h8cexxj47ijqur46g4rqkx377nl7f665zl4qdmq2yyz0e0ie2dlqi7gclgyeojitzscnpg0m1ambb5bms8dda6o2kz2po04p4ekkowkx7egoq7ak6orshpuc1vsuqzzffunh363n7999o3b7h3fm7k867cxodyngsk4iwsi5ayd6p2fgmvv4uiop96urnsevngdc0fyga369s764lwj59193j4s06silfqwkc911zxpss78829zibr27a5hr4fh1q1f4v2mzqg39jlfohcyo6a660r3y9jdso0nmc2r7nonmi2m0nf6g24zmijv39ot4dcyh47rz7yp2ewt1shrylirzuvrpohba419kab3hbwz1nchq4dzfxhhqft5kqph2uawpws8usrxl20twr4zritvqmxkfh68450bkp9dirgf9luow3kcgo6gv51xxuadtdq1g0qszzdgtggl7nrfplybyediqrgm10j0jxtuupalez9eomqmm4byugx27m4s5bpi1l49d8ss71shijherzp28oar0rhhrngy6qopxo56y5cqbcfxxa3mxby3g7yvp9rk2nliwcx8k2vkju3xbr2xd2rccnmzc1yar6gf4b4e92826pin9ow6tnghnykbf880juiuim456fzuyjlbrazs40hcr6besxl5um2xufl8m24l80s70se1vq06gvcmox34v38uzksdnurzlmcraxmk0w35kjojmuenq9secrkspo65vcvtnu07s3u7wdmlt686nem0xu5gx73izpgcitkq5uf87gpxp5gcli8fderijre00xsnv7sae40ogzbtmw6f36v3loa5xdsjc4z5u4xyui98tg567aeo413ac571e32bt75wb8eml6jf90gxts94kx4wn8iwhfw',
                proxyHost: 'o69ob83wa8bgzib34zpbr7ccerzqb1ai0dl746sspv0srd7bnpg59piiq035',
                proxyPort: 2400839140,
                destination: 'vjfkgo7dzdp2o3qw16u3avhbezcjrn751khdr2sxa9se8ikoagizdjqzmgc766jx254v3pq7k4mph9o8oehuegsi3hbdj4n3zrknwyvwvvh7x0grwoe7i8cntpockk9nc7xcs4ch46mxlzjkvh575a3g5xpqfkvx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3meihrzm7znxtqgx1oi6qb2im0j5p6oyo3hc7rqovirrc87727pfw6lupiwwp2ttc9eoseq76cdq0igxkjs4t1azpsd87zo0u91jihiza14u0dgcctnwhqg74hwwrxs1xvk65i21n8tzbjh6fzz9cffblgh4rmpy',
                responsibleUserAccountName: 'mr7jcck4runzpr3oweb8',
                lastChangeUserAccount: 'x0lvr1ctt0t5ytu9cndv',
                lastChangedAt: '2020-07-27 22:39:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '78ixmml1avra99d970mmrfwf9q4aurh43j6jij75kfnrr4up8k',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'xjx2x9icfj5dyabo8vxp',
                party: '96yi3uz91tekp2itk5f6aegozff6inwhuf1xld3qrnbrzqhq7yttxafcmo2tyhqbar7yqiu89f4gm82ce94oi4oajokqhjsogb52fhw8hbm1h1edu2hy6b7k4rxyxcys9g3xenk2x4b9wnyeqecgrox4jaoykxue',
                component: 'v1bvqoz1jcpnbnkwjbbyn6hbaijzvi19c6ad7hssbow6svyietw8jh5b6h7kmf8mthapkef42f65scwcp4msecwg0ufzzi79s9nq0dvwoe3q26fxcr2mj7r298sjq8igb7rpowd4829i6eqwhaln7mx0lvr2h8nb',
                name: 'j0961t8sjtzyoyihplczx083ckokd8dqxdqgizn2iimtb1aie742xbpf0byjdvxkfvbd73zhywapvb5i6ub3kd2aycs7ko8q6p5e9uv2dfsgt8lc6ctq83gyl872fzeo0gsrn533m4ta1v3qm3902q6l4tla44mx',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '32i9nnm7ut3ofxrr911847eciwye7k9xhaq52mhff03tqezhd26647lg8nnmryak5lm87ld6091dhxci2yaf9shvgvtjnlym5ezg6hgmru0hvhg1zdnla0gwhz0yew5ktx17f5opd27gypdfzpay6y6tr6lvlza4',
                flowComponent: 'kmysefyyue22tez9e3e4tlz6966cnfl2ddvdfn73a0el2gceakf9b9rosbd1e1zmpauj0idg9nvrqdjvfdg5dxniopmi25nl5kdo806lh9cyhj9qe087fncacxo2zv0vt0xgbs1yrn8ds1llwjscqt9jrhf11tbf',
                flowInterfaceName: 'usgbd0sxfxfer3kmq970j170uo7l5dxstht2p8494sk81f8facacwu9z0pbl1cjl49b8gf573q2xkl4bha03v1f7pnwcrnmargyj5t0xx4gbehu9ik3al0ol1ysk44j2o0a2sw07cu8ims8kk8nqi38w97fzqeyf',
                flowInterfaceNamespace: 'ehequrfoqf66lke1nv0nt3x7klxq05tall7dlxqsb4xq3fhqaggytiqxh3w95vz6nbh3ptyxvr6roxkbga3bthegv6nlge436qtp5eujeiqrynl7q61fpy2lyw3irsyirblh4xvos6htkl4p02v8j5fyeb0p61p2',
                version: null,
                adapterType: 'am9hao1wjbjgz0uz3qjkfpcmr0zqy28j6rqcdwt09duotvqjj3vypgpqai1g',
                direction: 'RECEIVER',
                transportProtocol: '5v4hqknpfdsnvsg9xrmwcbzhqybe36zw7xec1lohyi04z1ysn165ymgldlpx',
                messageProtocol: 'yovxrjf2xzb14cod88i1eidz21v5nbceqfnmo92wdhegj1wrhpxtmbv05hsu',
                adapterEngineName: 'hoi7186jyve4aushb0hh04b5ot6pxf0ioxbls0jr3chztsku5z0u5y2wop8sqwowci24pd8uvgrup42a758mluuykcqcfuo90dbokcst4eupu7rn5e8xpiubt85rnvrj2lkfd2ptnnmjzppgbpq9dx2sxoz8kmh3',
                url: 'l13y91rv9uf03f6674a4fk0xsklqic6nvd6lryq6pb7pcrqd6vdhe5036lc9j3g1olfq80ti13sokxqjkkoyx6542nc9u2tu0olcxz45smo4lny4auvymnpp2s4h83z7iso4jodhkll0u0nniyzmt2vds3mz4nm8730eo6rbqbs04ha32pnnrbqpgv9ct0uak1axxvnd3h4y67ofqwniz8ycdr5zcghn0rgjwbty1u0ufzopryf9zqcccxjoj3r0ru1t84zaimg64v7tle3ntxx91ynzfmjcmge2v0e8xv26yjhb2qevpitk0l0rmdxu',
                username: 'j7rowsujnx93w411jfblrnq2q7suefv32meq4zjde1d6ew13nq4p2qkpqvtp',
                remoteHost: 'noikui1m7b0b8158gujaoa8f3n405aewo0bkyjnl9klgfkwed1pc3w7ztnphv5lbowfgok6zciysvjk170bfnc84avymu29r67bcvlfmfxbef3jw2p34aspnj56qv3plf8i7n80zrxq8owcfcj5wuz0anc2a1u1m',
                remotePort: 6279080782,
                directory: 'bqvwtogwqyu564oecms767d8vfcrxxpdw3iwhw6q85u8ologmkdjlhxny7i8kz71upuk0s9x036kx4l8kz3s6ca3g938r670kg4a197jpxw3kl19zxzhoyxnelpg3k51zi5ecc4te9u48q5apz5tnsmvhc6vjoxcz9fxq336mu4zr70wey6oo3pwyc8hei3k7ojlrm2eheq4w4u71y2mt5azaql2bhf6v17kx05ipnpk1xb9yvn8joq18roq4st81zz7j7i1h12gey3voxryux3efxlqa396e68ai8k8eaaxa33f52zdgeg7hr9uots08oggb2ov1mr5k61dx4jo8fnzcl7posaf83gphhwgkk8p2rgkkpik6vx2n25mqgkwq78e3hdssniucy6jxdvn2zp542g55wmdx3okzw36vqzzmwozq4019xblx1y54jendk8tbcxushhgk4aoqt64zn66jls8xvkvcurz46rbztgd1ue0vpwtdhyw0yhavhnma1two6p2lrpheq6teg3qq65l6kf4a8rd582vzcl7gom111klekuwy03zeclkxat88kjcccbm0g4l1282bkdtu76p90d2coy4u2rb1opeq4m19m53wng4r6v06jlcfcoook0tgq87bo5nv0cegizhavbu9qg9h4v4lkxk5hqr8lwkw1qko2pxcpmy0gvqu2u75k47c7aclwvbhsier72n4tiynunu137ipcchi9f7vrkvez0op4b5nqit7em305w3m7a8qx122fut3tzzwa0qd3z9xti8206fh590afema2vd2y6pi1ktnmwg18o1ipop5vnxnrow800u8m1mn6tzugmb6a0r9l3n7jxfevee6pdycne4hdl4yqn03ckj83g4gr85wmez1b4rfw8v8chr8rp7p469aven46t0btfifg7qww8k61m7tgv2i01kjdqumqbb0ctg38sddd2afj4g706n5pua8lisu084r8re513jww5j0rh08o2du7awg8ld',
                fileSchema: 'i752nmc86ql9q7vysvbdsr3tccryt4cim5iwa11xyimfp6tvgrtguaha3f51gqzto6b1o0naulc0c0lnmdzgdks7vkh76n3h85kv7x5db7nip17lhe5qvku3pgfmlc1rjrzixh5r2ofnn5mk1kkqgszbbxya1l3t7mdfwzjqs5krpgyn8dswkr18yf075fuamseilx91w0q6cckly76z1mepm6sbdpfxvvtrom8ixykhmdgx0ak0y5qmi3xs6gxw1lqf5gcz7451wsv3nl75aqrfr3kh1vreoks5v449ubtvt1isbf25ogccxm7iuri9yb88zk8bg6yvd34xi6rlrfdhvcxkyo35fslf9mlxfe6fz13ukjuza5xqwl312lff8sb5c8z6y3190c1p1gks0vzysg5c78uj85n6a2y5memohcohyttmoj3zx9y5248ve1jjim55t8kd22nht1oyt6ohaelu74lr5flfipwulap4iqcao91qmj43qlzk36p76bfdhupqgw35dzuxbgn98zbozba33ynitl74tx401jldq1r4e9sddy57dhunofxfhptd7oi6c2l1ak5ohff5l91u099re5c8cds8zkh0dkxifrn93a6axfu0embbloxsvwfnxxe7xt4te9kpzb1sjr4ubhc505tb5tmwvnre3xjog3mjq1bri5rw5h2ln33e6cdysf8x05gb18eoyt37q4cnkolo1mcrduods1yy4x5pj0l847kglkc6q1joc5sdsgxwaljql96ovxwmy3pf03mbiateqkzga4cl5eppgrggtx7o2n5nw8rjladzo4qpktuyc3qe8sip9ea4b8zmuaebwxi9gqh4s5osf5alkq0abxh7sskdolgjc1slce328mpjxl8nz2op9kzj9ddicczks8zr23dv31nxaxeqblvdxbmwc0ffe2l84tzwomuifrvfgknvgub6p1fer5hjr3cqw19m3db2d1yl6jgg6vizqm77u0thtrd7k4jeuqps',
                proxyHost: 'eot3t4z0roh4z4repneg6cu6z954k3ytjbt7p7qjtlrje7t4q1slym7f3tp2',
                proxyPort: 3999648716,
                destination: 'pfjpmvc5svj5h039gxdyjr71peuvxa5tpc37hgouldv3tdyd4yotbl6sjmcto570h4skw80p99j8hireyhs7dyascjgf6qx8pe63utci2sn43qlyuspx42tbba8o5mg8f8smm1pgtitzydfedtlc8q6nuvb58dnu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '17bnnki1ft30k2irpgjt6tlngxp0v7s987vf4tw6m6z1ijzbt51nakrnftlz7mgham64l9k6bbi14y0l2qdad8fe10er510tkjaqn13e64ie8qj2hktdnk49cns91prz4o5827a8zl3g537w9jpbmfsg3ulp4ewk',
                responsibleUserAccountName: 'kms9isch9m7mvou6xob4',
                lastChangeUserAccount: 'dmor5zgnmc2ef1m2z765',
                lastChangedAt: '2020-07-28 09:56:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '7c9q1sgbgxcvfcetlzpq7z5077gifzk1hb3s23u28j3ewhf6ga',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'pgdm41dgylug9opd2w9x',
                party: '3hq3dy3vkywmer0ucxtw98jzm961k1wf3fdsy1dzdg4fje82bkzmljoljw83uky638jv7hjy2q0qpvqxd5pnz96lett4es48vlrs3vhedrawksfthmzdrfbdksegzgaci53ep59cxol4pn2pboge3gobcadawf30',
                component: '0uwe9sbyf1hbd1x8vfubd38brj20r3xm4qohd9kl3v3jjshyy3uy3gihgxnj3v5wa1zx3592qz240rgmp0fm3rl9k22w2puwpkb45nzvn7dj86c1usfzf983ltmdgtik0icgtzhize2g9cqq889weib72cxlhx37',
                name: 'xo81tfxqxpime2t41wu7sxg6hoe60i8pzpdancfzvz3ru0xyp99pvwrns955e0vx9ovzcnlj35b5lpaulgtw3d0fnvyhmmnlp8faav66jp8b7wcs1n31k6agller6nocu25wpbzm3yzntve32u5grq1nctpno2xd',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '1d37yer1i4oty82jc34t4hrh8q3aojyc81zamlxz0trh5y5trn97tndjv7d3ibbv7cw82ech71a2j6dejr6njqhy134wx2ucc1stbsj42kkvt35n5gtw3csf9y9wnn1hqi6wrc3nkolhusy6xvxzrpth0tz1z3m6',
                flowComponent: 'rdqisj9zwmx6i51t76ovmof5wr7sufxtxzaf2r46b2g0wbi951w67hnbj2yuyj8jb5yg6utvtwyy7tgzvcraeu1n6xwzmi60b08u8xsbblxls3qqp18h0m4pcranx70twp7tluq10nbx7n09uhnbodpcgq1z56ek',
                flowInterfaceName: 'fyh9s8emupucrxrg88ez42s71mm6cho1mk3psajwia4k0mduixljkbg6uu1rkttxzcoj7hw1qkmvhrptu9mmcfy3afiytlxyt8isq6pjg5cmsgsfymo8s488dwxkw0xv10qxuntbtom0xhnojiuzzwcop9zpw7u8',
                flowInterfaceNamespace: 'vobo9lrsvcvqefxa45rcmhflrltrozwfiv2j6fennr6lx518zqew362rbg33i25x1ymjh77xrg5j9ahjzwlzbohpsjzvyro931dodkig4gr2rk1mxrus9jnawdh4vjotq4y7pg3eg0a32y0viuw6jh7va5mlm0ty',
                
                adapterType: 'ao8ef4tpxbkkfq049xoznap1zvi28bq3tm7my9t05a4wr6croqrno6crcoxl',
                direction: 'SENDER',
                transportProtocol: 'wf748m18err528y3y54d71idxjafeskuks6it3iyq4we6j3upouyiz4k9owb',
                messageProtocol: 'yffajp90yo3o7okgz0dmjfvjy5qq41luc4yzp5dur9982p1xzl8airz8lg89',
                adapterEngineName: '96496jyliq0zdvz15ffxmwb17wmyetz1ta2xvf6d4hr6vid34oxnlhggaiiug9wi8arkd7iaonmkl0f4pf8k89xx27lc57fv713h2vkqsz9x0k3y0ihojm8rjy3atnckelwex0s52olromn774v5l1j5wva6gctc',
                url: 'omwnna0g2ypvl7hje146c17v84rsdobixzxve1rdta9kjj4h4v3dsiizf3jaxonsi5sysezb40sv4bohfup9gtfrbqueyobm7m3qnd6i6iypcwcr0ugdslzuyl0cuki7dlptguqvy0niq8ky7uvv9za3lh5er2vd9ahbsh6bckahd4s18naqj8oh14abjfsh05ipk0sj0fcu5iestsgnw1r3rergpjvzam0weycvjbmxf3i4l893t9sz5r3sztpwq3dsihm9fu9ja0lf2susrqi0wv6pytejab6t80mk6z4nxep4aahz1r3paddnk65y',
                username: 'afp6si2ftw2tj3agwxfwn0fazrpa4oys3pu9ets2af6i0e7wr85gbykd1s2m',
                remoteHost: 'tw8otpg71ao1bkpymx04kt4nexqv1n6gpm07b43tt0un72ox0ifxsujd572hnrep3yhglsa2dxxuf2trvewnxooyewwh5kdxqay11yunaobpihgy197wtec4kv0haqnor71jo795cpjtgvr2t8d4z5jg265ncowp',
                remotePort: 2922198673,
                directory: '6vny9c6stex0jcqqh5i0sw5hx3kgh2uynnfsc7gbwhhhofdof3xtycn4pr839fij7w6l115tltc48ud7q57jymbm868gb3hftwazo3twbt8okyarwf1rspvtihv5fxnido0heqmdqy370mxaapacs0mbiuai59o5sw0f5gvgrpdyiztufu01jpdigwe5smmo5xddorl7m4ln0gzdgzs8hhje00metldkijzez4zrpj8nggz3l1kfy1jkys0h5wkevrrgrx6gj091rcevkxe2i1u7ecbo5p8zt44umbmlq1kpoxeldyywv95gczqa85daoyzpkm1xion1l2hpmhimb9m8vbwvujmtp4vs89k7ler5l5q3kn2d7i1iupc0inowz038jurm2rt83f2ypu08yn6qdhgnoi2bzr03gm412lu3qdfrd4lmuqdg745gqph54rmg5irclmgyzrz4xzsw41xfgwbqllqug50mq17onvenlii0xegnwmrrsgcp6o4a3uhwk2z2vytpzu65weiut166rslij852n1msgtbvbitonwb1jjquyx3tg4y0c0d1spl5u9irh8wfn7o7kj20qrdjvl3xebw1ndqrtsozjcjvlu2gowxe4cqaaqwoqd4tno5dx6s28nqjct81yn0smg505m2wt2iob928aeexdioqjhpzb27wv4pvhoarc1fv8ufez6y9ce2wrtlg8q2164b7u801v4fcnez61lukwnltakkxi28iopk4vnmjof9afsz7pz6y15oo3krh369dgh2e4r97pzrl49y8rw3b3po6gut0wxyfpkbrwd0j0pzlrqnacudsi3csxsa5bf2x6k1xgo2xhge6vjgd27utqj6f2vgkq528byhc7u73wtbwijsjm7zgm2zcoknf88y7125pstlel63n7zs2qbwki23kmrmr0f6c2r5xlpfvdv6mco7tkrslv1c6txevpkbf8zvx16ps3yit6tjzjlstrpl5jog12b6cfx6e4z2gtakt',
                fileSchema: 'buwqqupbxagf7svg5vbjk7fot01i2xd28xde224ite3xpyrz17oftdvywc7no97h3rqav8h8l5k08lbudxps7s6y5jz7myxz2gxg6ks7x8ypy0gvbdezc2i2srto9y9b8aamw81eh7f9dbw3j2q10qqn3bzmk7tw1dnnfsg43w9qe4ymmsh1feq7h8l6vr979zuhq617vvwjhqbhu3nf42xmmglh4cohcn6e8nrr6yct0k4yh5t9wq3qrbgtf05vdkku9fo3ctvfzo0v7774j1zgyjdttdszsqlgh357kgoenujrzbgue6hw2v15e7kkltkyi8lz651upobbjax4wpgxytb6ey39wefkn7rfroj9uf5ceyjt8dzaz4hwum2llrnjgceh0umedkfutctdap5h3xzn5xdjv3wni6cp41uccsiuomnm07rxga8cuicf4gcn5hgcxlq46bfexdo9sd5pf1bormeavre1r3iwgohgqv3dp61g1ga1jyzfyfcja2bwtgeg7kofdsejhztxvl7hvi85qxv3xrdeqilg4v93qj91k506wtog3juul2lad8026gf7zf8jxbnbm0kevlgitbv9fryn7adbh490pbhkpjy2w0ja3cw5ujgnlul66aonsuzf1k64entcgifh5uzpw3j1q7d5umo3vxfo6wgdvv0b6tjpkajaqg0ek1zxjz1p1zmouen10beuhc1zsj46b040qgt4s21wqk2qjuydmzl8bjb9aidir2flln84x9nwwre2h7yykkuq5chpnofbin0j9a23bzrq5n2wasaq0b43ardv4b3wm82tti0zx8l2g3gt2aam6xtbn04cx2ywms32w1bhi193byrfkhl8v470y1mn30sc5ztr8hqkral8028rxalzd8qr97d1eo260kpykl1xumoe7xn7q72e06ec06214hwq01kdjggz20yzpgb836gl9hu0fqxfi90iys74gpb2lrs8gqna7ax40asnsxangixp26dwe5lm',
                proxyHost: 'vf8190ds17264uoiuowxij98ynmkknqmpwdqnkf51fb60poeutx7avytv005',
                proxyPort: 1327552869,
                destination: 'vao58o4apug9s0hadkq687ucidt7pbzx9n3tcdb2k36aigt32a1yqlgjqvjhcxv29eg927gi6nb5x2d4p6seov7b9c2nes9wph8herwr79nxbymn74dhbojwfixspgxo7kxt5kmbohk53lp10egauhls31az5qip',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'soeio8vdpej7jikhs63v3n26wbt1pmyyf7f419imoeif0km5lvve3x3n9t9h3i4lvao9ni0n2dkosjxase66m4crvt1f3ngv986h25u5ht2q9sn2vq4hn5iuabh6sfk3lju6vyoydgk8upsg11pvzahpnz1ici6o',
                responsibleUserAccountName: 'wo0ra1qn5stytymntp0t',
                lastChangeUserAccount: 'tnjhfhicks9it2z9cils',
                lastChangedAt: '2020-07-28 11:04:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'gc5mbagoiq7tnjzrqjm3sm0evj8387iio0pdgtkyzl9nkrzf7h',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 't8aowbtjm3rmdivhyop0',
                party: 'va0of8uopb2u4pr05b4u428lb691r23k9bdcqgckdpytzt71egomro0p1ae4ey6i5uv1jt519babyf4pj9dxnnbnf9vdgqcg3p9ys55wu0suv674w9pz8g0lrcnkbrhhj0xhlyp531r7gvw0o73wilg0hxbypiro',
                component: 'oarzqkadwixzcabjs7svlds4n8frhflvxix3o2769edegxw1yde2psve7k4egxabh6qu36yf7v0pby6fgj9wn5k18ehc2jce2zlqnbgt9g0uwpkye652rg8wgbbr4u0xkhyb3igcb77xhx4ez92qfk5oskf9j0ps',
                name: 'w3ioabqli5fcd1840z26au62o2js0ip5ixb7ehdxmwyjbkj8kr6yomtvleourqmi5syeoxzx11y1f2tsdnscz4b5sthv0fdx4q4l1r9wh4uj0vxqjrh097cgbhmcf16zrg24t9i4ljhs9ck5xzmm5kuzjr7c7sbc',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'dwq9rpsw5utnhs4fumn47hm82ay1gvtdxyl9utswz3m2hyy97dz0lqprskxik8tbcnqutytjbqlql3zny5pqvexz8oe93p77f8wb27f0jialwlxmqk7c24x37k1zegxp8qzjpno8qod4zmval819xz3me46b6yqw',
                flowComponent: 's47hp85onadbolxsx909l4teugdds7q13ui15niqdusolib41tmo01syurdkymhvnixap2evykbg1vxwsv3m1yspmsdphn82dcuxtbugft5gyhc3o0koapyzt1uklnnchh6x2zv9nxsjqka98p7y7x4sxbw5p1oj',
                flowInterfaceName: 'annh213xugiv7txz17tvye7hp3ym5cait2pvwsdjzvi2e2jp14p3ap27zo3ihv7terprmsy7twf3vlyjlftx6ltmt3m65lbodntdg423agzep3zkm7aexbsv8tjlqk97bayro5ffu0041ogci9y30sjizcaoddo0',
                flowInterfaceNamespace: 'fcyox7jc1205de4ejjios4vq71nm17yamvdmesmk5icekd98c3f2a3y7fi5l4qab1jw0yvg8ysu3q9mpn9pruep50apjfug6rlrarytnbo53krva94ldzds4wf4wlnpsbxqlgoxr6pmuynz3gz6lsa2q8kfna8zg',
                version: 'u7eryhkxff84g9yspxe0',
                adapterType: 'jr7ow4uqjlup22begzr4ejjdgipxflzbtegcayhoeeu5xjn206t2d0ifgv0z',
                direction: null,
                transportProtocol: 'msf2ctq49etxhm69gbvf8vm3502mzl9rgz1csq92iiwsjy70xhpp3igi9jp3',
                messageProtocol: 'ldah3c0aedp9to7r91cc4us5jf0ef6obzesm5p22fvx7pdi7xhy4veb2dcyk',
                adapterEngineName: 'kimb5fgr3x1qpax03n04uyar5jd8h14mvpowralnwsj2nm4xyzd045mm56gg7wj8glovjvx64qknl4swkap6dn46l477ezfd9bh1bwpg0p7eh5nrwf24z4jparbderbmeley4qbq80q4akg7klyymz8a3q2fcewl',
                url: '1enchtnob33t43ejewmyjsof8m1ttsfpx4bd7zrkhw6tsqcc4tmao26duc7hib2i6omq90om9ih9fwcyb2lkfe1zp3bgcidf66jgz1ijllek8o0msqrddhy6enhux0auve3cjchmmjeiexquusm70n8t42u9sdlaxmphhboijlsgm4rt4yums9x6nx3w62gs9fyaji3kvww07q4bknw0btlcful57wintnz1inxbec82wsvprhdgj98fyrhtf03fslch1q7ivsdz2ghsx4p2nbbcblbb4psn0qch65297bfq8o6rb4wo95ex21001uft',
                username: '48vc2fupj6x3xsld3pzyajksbddun5ryqqg8fhm4q2pnayuecv3172kwfmkc',
                remoteHost: '7k4gwujsyjl9t7lsfv0j3iuimvow81040rlpmtoibx44fbgx964ubkrov4becaub7o6ik8tm8x26q4keku5ld8ehmsbesf94v11slbqa54ccu9v4yvipkywwfq9aztf1se9j3q65hs77l86jiqs7uu19a836l4ib',
                remotePort: 1293029818,
                directory: '295f0sh3hew6w3g6ochtsmsay7xkcdcu2o3137ahi8zxwwqe441srjfnpqhjomujvx115xfhbzv1ur8k0rieuiww6fqjtelqad2tytgpfyrg9wk3zhkdcszsc6vafgr88w08g26k3fagegan2zx9ft6v3peq1gxe3k2ybtma6uurxgyzg6adgxkx107tnv525o5ml2aenw9nuqehk9nlswsoi6v5tgytbxncwp0qr6j6uzu1n9hdkn6mm7vebw8721cvnky1xyabw11e1zsjdko6tbomuz4a5yy2wyl4llqj0unlktw3ywjcgtpv5y86o9dtln5qrzbqi1ldehjnp5qcfynttmye1p2qp73oazm2ihz5m5ojcmwyx0miyyk9luh200iorqblpr1vdmr4xf650zfaonomupkd24lr417lcckhwwb9fk1ujoqduth617ldkyz7lgpxs7l1mp8nlxyjq1k4vreyuqpq18t7eede0ac14yc8gyfyuctnvzk7pslzaw0qtiljvz1j73cjtjxe9kn2v5niztaaqvdqhzzvxl7o2lqrmelhbhidd86bt7xexftzaf7pcu52xjr76namff5u6zn1yv0c6i2mldj9nkihq0dz7nw91ae6r90muj18ypz3x3fzf3oxg6hvior82q3ppvipdor7nb2lqbbek3enzq45l3whcsibcpuzzx23f16h5wbguqwejgap481im2mjcm4ae4c6rh2v0p6e6c3pha36ayu7mhxmxscr5flr5w0vaqpm343unryuk6oq1zf82e7cdvtseazkri4xyq584ntk036tsxs07q9t7lvjv7hlp97np00r29zmerg6kxykc857uthrp828e96dhngocea6itk3mhvk39a6p9u7f83oiuq6q69succw80vg9h0h3wlx1urn8kp0k51cpjsu9788x1x1jg5mrex8mzod4ydgn32i30imvse2r1q3ja2kwh54ufsp6bvjl8j588qy3qow2skahnu336nn',
                fileSchema: 'ae7yavrvxdoy4u5trvpjd52vxdd4388hjy5wb4en8pdh3bnxsrd9th8aa3l7eemw1ed3i3164oedzt5im249rvj5safv2yqnctn0lrurjklb1slbmcf7y6q00l4inovihvqfptyeowlscrqqwugg0v9aq96bhdq38evvkq7gk766vjfb9a4frvni5p91yoa7guzu0vp5ajrencvnoxf2xa32d9elby9eq70lpneww801879nle6pjas4dva2kvkuyuwd5qgbpw0o0psh17tkyh1v7fcgr2m338tqgjer53244fx4f50wbpe97fk2vmyfeepw64m02bq3hu23xn3qnxlae1vh9d93ej0beoktmvvp7xu6n780y7z9ebcv2v3oz9ivbugu5wg3qtvmoarctbqnm8ehmh0j1cxr4k24g0vwsxxuw4uq0j0mvdeju9ocr3a3ftl3rldeep5ndg7s52zi35u1ofyf342mc3zgpf25pr0rf7nqcbdn51tmg4bprx1waa2omim480g3qg4cl8bbbimhkbz04povtmbz4po9dlo2bxkyc9e9i46wa6lnv7rrz2cv01y5rxn4qr9zsdcec4n2al9h4jv6wcou5kntswomlsh3zy9vrjqiiir0d38efd9hl04g5s18ngihlea8wt7o4ou2m0lslqibohhemnv9n1rhb15y3m7zdj75cdjrh4dnhnhia3q2p4ffk75q4bj2r8y2s4csuxz61951w2gk76m8a0sp83pbici34sv4n4suyegbp2pwmfr5xioi4jhfn2hgi0oal9wd22n9mc0gafmzehww2okthqzdxwwjirhd2lv0qis97wu2pbl269s7fri55jzomc7agrkes6trypya5siaenv28rgxel8cidz9ru2in6g5s6rb3oim8z7l6ho0onridf12rsvq6ikpvsy0t91mgiebne2lurinc717644bl1dyfxjirqysmcqxhubedrz6n85l33wkypzcbuw429ebnnj83wbh',
                proxyHost: 'e8qvu310qy3qxu03lm5ea4kqjdqh7zw43k3dnanuue7e6ghs7andyghlww95',
                proxyPort: 3652069594,
                destination: '6jn6z02jsfrzqrbxdo7zhzzbrnvnyx10o7125npjlkpo48400sethp730k6axj6clezbae1c047ful9rq5ug6prnr1tgx4dwgbualck01u2gi32knry8fe53mrnjn62yi23d8vyl6ok32zz1upesdne67oemdo3y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kwgwqhwcy5kr54hd494ii37k9toqc7wlnd5v60z8sdx73f3ikrz1j6xm7fm9axasktuq7yzjf3vn3lrhtjg156q4fw096k44jxybej0o7eaiet2bx6o0qu4huuhjo6j20kkblw83c6ypwrjhnwrh6fvhuti499yj',
                responsibleUserAccountName: 'cit1dy1dqrs0bgjkrdl8',
                lastChangeUserAccount: 'msc544rbteyc7ym7wcpd',
                lastChangedAt: '2020-07-27 14:31:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '5obtq6e0svadlnywzlseduzoj4ek3q6lm9zetzubk2uww2pbbt',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'pv7l914pnxldgckuz5hp',
                party: 'pqzhhyuig2himavp1uhaz1ahvlp47srpgz4pw8atfpn2kqmoxsvwvy1g7gfgbhe9t463c5ersane4zaetpney4nyla3soaur0d2xqytclxyw4400hgpsedeq7qxdzze2bs2r1304515s2u8w84c8f01s4jmg504c',
                component: '8oohlgsw3ww695cjftn8rrdqja4nsvihy9z0jp66tmxkpm04n60uqcbytuahtgdykmub98i5j96qsnb59kd2punhuymwd74edwavdkw1h2ujzi93rbiipckgco1vxzu76mvxxdt6wzfuczyuyguf8jwjl92m6u00',
                name: '2knvkfshslsb2hrzf9z9naj7o1i23qe5bylduh9usboa4bozbn4k1xzq6v8xh6rwq31m6gz91t8ld3ku53eb9hvcse496x7wj1sp7ow81uqpb2909qnm6tpk1vqgfnttfa780dqefjavofzvomcwnjy9a06liq7l',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'lihnl87pqcpyj5upplfjf8zwi78gyvtxk5uxa4lcfjydb2e9m35r8w1rkdb9ja7f8zcq3299soug8ppf46leblcg8fimwp77tr85xz4s2r6yzpsqygo3shfmnd3n1xgke5yrre2zyi0vtuq5pg263nuc2bqa4qow',
                flowComponent: 'g4fq6v8wh6ijzhvdoeqf7svfl3im84d7mtli5v65eqgug1je7ge9r68kjjzdrvnpyazc9un1r5c7fv565mbgqyfpdg9zylsiwr3c2a88d3wzftcmd2ahhmpy59vgcqe7r0k4yqejg7mxwcolr8cns54emrla4tw0',
                flowInterfaceName: 'c2m0wzcjdr8guscgjhndkvcrqa1fbvg3jw252hm1qrr27x8s9wwp36fjynmghmeroza4peg9yp3qucv47nzf3ljcos37puilzo8jlxy3rn8tjvt41f6srwg3zu6ayjxwn4sp7j9gcu60qnmwjt6g5qmic4g2jkad',
                flowInterfaceNamespace: 'cjzdwrwes2l3aotwtcgouuwy4jvcd89lvkcofxvk3rwx8azzbvy6em792135kh8gzhmfp7cwhq2gudl8sc31926se1jm2trauwf4e2nc8h8177xwwssq2bbtkn0sc6mczrrnz1m48aac1omc5okcp4t5qgrp88do',
                version: 'lu46kxy71ze5zl8asfcg',
                adapterType: 'vfrk4x45gnndxmjzd8r798nibyzkbxiorv0vtg8hc1o3x2oof216mj6jxfg3',
                
                transportProtocol: 'nnlh6ujn661y3s3p1jzk4auhgd33hrdxcvd8c9vo69xse8kprwidrkysl0fm',
                messageProtocol: 'lymgueuoficag1b5fze9ib5fokzqctujndk0xnl6tknrn659ssesthgbl6qa',
                adapterEngineName: 'd1sl3rjidlua0fuqers5of7ccc0f3ivk1x15craghdhtdbj8zu4729m2pl27h0g1wxf6brt3y2u6vp1r87tb2hp0b5ls7c8y5vwnbws4z1l5xf8zuu23mk3m4yo2o9or5ctj105lxdro7hizfwxaz3jar6l6rtbf',
                url: 'cmrrs35h6pv1uol0qis9radplrb2buivj0y0c1m8h5z91uzb3hpenzxigyehp66p8yk81kurcc9pdek8s0xtw09nla9t93pw15qg2jr3msti1e8ysw7rjodgawwb3c3enpozef0uhpmaumel03cuuuk2uqh1tr09n0stm17fmo8es6kvkzm73xz3otpae05wf9kl5l3nsa15qzubitt7nhzt734ssaogy3ju9u5dlh7b2zvmdlavtr1qcktubrn18sls08qbfsuk36tzpusu7gg6oa5a5sqf0pg4xzysi1z6wp9vh8ccri4tr8chlc35',
                username: '3sczb9566zndap1jd4c9oyfk4m3htcaz8bq5b9w9hmml0fydqbjb9cf7bmxc',
                remoteHost: '5vdkmv8s01yv4pbb5u388x33elyswfp6uhu1u5ucrda9bpwnl243p5ulgevm7th84jaq660z196kf7q4j4gy9vamsftt8w39ubsfta770hvbnj8zat26paga5x50h62divkv3ct0pdk0ohqfn0eh59gk0tqwb70k',
                remotePort: 7498032623,
                directory: '12pvyg3ote9wdhen9a4a48dyz3qogpoqfdfnsint7thgr11f4spbh4mmsx8sg6z06waaf2j7dx6cj3ahlhag7ow8ch6hjfylpnqpzihwxo51zxj5gkagzmn0x64y4jdi3yu73d4ov1zbiwz31p79m8pr15purdbg0cyebu8aexkqv5wbk770exr7hzmnls5vbajt2xth6tenxjfez4jl19cb63v9eqrdvxlb0n7hvpsu0tvudeepg90if6hc7dvozptvfpkzbmr6acphwr2budxf3992xbclh5as6ebrhw4o1f14g9pacislmd41p8gf3zh8ys3qs14gtdxoa6q652cj5e5fhogvut9pr86wqy5dfhgcupxh3j7j6bc3nxpu70ix5o1i3jio4xj61e4o1g0pmq3dft8pcu5s09bdl09z9y0njudms5pmctki2nayomooi1305p4e92pt5iw1tqgscczeiqt4923s28qz7tygz7hydga5kzlrbq4f4070jqdevmrcn8btooq1y1fm1znqlgxzxxeuf8neov8eehb2cm5mmcnojvbdtfjv7x4p31v25wyy4ri7cpu4onsr423dypc3jh0mnfzc7tswcyl6p43m2k226frrd9m6pxkqtrhfzz4zaj3rfibskq8m6obirnrxm7an42l1tkno6v3m7zz3y1s4m4pdx8z1gu89c9lwcmuads5e7h08363fnxcousklnzasbzgho5t356c51pvfecq8cxndctn0soswtu5ls7f8uqju1nab3l740xc6axqs8sr77uk6hdhjp6lwci8laf4oqt584iojl3tu63989h7b6o58c4kn1x4s78jfvupn1djqy3ywohmcpknmxmxg2siww2il4fmblwspv7zgn9pkprhkvljcsiubgm0qt8gxcbuss681l1y257f3e3gexg2we26v4ertaf4687e0hko9osm0k69amir9zfwr7nrfebs2dkqw5f318lo1j6ojwotlk09wji37besf',
                fileSchema: 'lm0xycpdbzvjdvvkvmuplknwm4802f0hr11klo0bucmbfs0miktqbp2wtjewht4781ry1iz271kmp32krw13k7onwa6o5xhiv1j1ncub8gijf6g3jiycdmriiyhhqn3kf1g096xiqkzw5qx4xtntd4a6785td1q0up3hej0qlmn8fm0eig19tlb59h583e8i4lrz236n1se2llehmmse5nxzr8v1hu4ku17vpne0aoxsh59t3ju4acswv7wzsd01ez03mli4dr0lvbguhkoe8p8hrn9rh7nn5wqm6ycuo7efe9kcpnz0sinx7hwsn9g3zwbheuqwu9n3fkv72ppv0n5p3a2el7xueqoec8mv5j2wok15rzmcisyvjpvpst25a143c7vu0xl7rqcptezwx0zsv7apqzk8r25d1j9vtm18j6kna9lwq67oi290wfzgzlapna9kmp8dqxaos0sec92avft6znek9xa5hlfkxxqd42gzoshzk3vflw0gxykatdbppfbnj5x9jj93jgq1lf1a85luyi7zs7xlc5mpxj45k3c7sfucigvqdifehj7oyd9ymnlc649a1v8yvvutrgpb521wytif25qu4ma6jgav5pibl7qxp1fof5gopveh01re3837759oc4yp6k8lque630c5xsf87s466z78mau8jt2y4s0meq9drptngmy09v93oj59c7o1r0s89o1x02doyip0tymmly5ixry9twwtdxlrncu1vnhi3frszo8drlqd7e3htihjr2f2epyu83sg2jjwzdpehc6b6sfwddsb17smhld2o48oiin4rtaf83h6cpbgch8t99a3471zgn9l64lq8ejmzkzar04nx8qxwtv74gwcgzcbxyxs1tlimndmcnlc0zc7phqugfl7gj1tsdlcvd1w5d7tqbxl35bf9wn1j2644xv4ouffdkvnvxxeu6nae5a364jk6im1w891p1i2bnigcfhbmwdwikbjaumfp04uf5uw7qik4e5x',
                proxyHost: '42lftr7zh9tu867ne782iw6xsy6havgahet6y96ca560cph5qgoxdwtlidgy',
                proxyPort: 1960037915,
                destination: '63i63qouam1aqsmrz04z2kqs3vh9e64ban3wb8vpp0u8uei2fg9318hgev3m1l4lbfy9holoh0hed2pp19elobwqqsvi6lrxgjm07mtgqoexeny6yah9miw1b57ucce8q3z7i9hhe0utjb8e1cc3h80nhuai464h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jcgtbiihbfoh9qfm9pjedtgdthb4z3s9jieciilw41zkwtwdsuao5s7ms1w8lnf9kywpjcr3ucrzurxrtyo8v00b3p1yatnue170qmtqdogee8h6fain0q8djszfi6vkmrbujt4vb7nmqflipccwrunjpg7xppkj',
                responsibleUserAccountName: '69n183u2nv42rgckix3u',
                lastChangeUserAccount: 'hi5p1lsaquyg43ptxh4k',
                lastChangedAt: '2020-07-27 20:13:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '7skwb4hlp6szvwzm3m91qvwew3bdevmambuslbvgpr9okr3v6h',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'crhf0lowot0vu4t0jbn6',
                party: 'jwj69rwig2v4x3ab3suqwiygb12byp4srkgjgluozx3wmaa44bs1u1izr11sb6trur9fzfb06y2d76f2duyvf1geiuas13mov8bjzc3ob1pp32mqgl8z3mk87i7pbeql3au5vlol7g6oke5u1t9843jod15boaej',
                component: '0xxol9gxqg1bcq16mhwby622w2p51n2c8i2u3edexld4u0qdn9q6qdyaiupxj7m4n3wdqzvw4ivpcp9q5zu3u8jwr3x53gd5b6h3p0y9lnphpwu0yzsv0yqzzy8nruidwpopmsjb3vtu4kh61uac8dz4wzog5xnk',
                name: 'i64pnfvuhiiov7trnlwgo7navio06pbt917kbv1dd5oailfs6b50tnzvyailrxd6zd69jip1xwdg8noenns7e2ehr7cik68g6pm965po3j2fb8s4vq2z77rg7q1sxhzvlqbv2xzu7ejdpm509spnupzc4mkck6xr',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'bqw3g29tqtilqb7sqn6vwnv6afsxft0hs0ez0kkmj8v0aciafgfhegg1mkqg5zwb56e0huq3z6xhzek1661uho014xkmsbwe4nfony2iwa2z2l3jzyqru39988ymy8yfl6afcx2i7f70jbbn1wdnfc9ozzdfekdi',
                flowComponent: '07sctnr60x8nve0frqgwy7eyipg8e21f8nzy6v2n1xsnqka0q4uagr25erybctjbuxq26neewqrlxl9dm2y4lqk8xqhb8ylcwlxw8q6cggd2tisukh64jhyiy1z6n9wq3lhj5lcoa4iqs46jx8pwci05v8qluqra',
                flowInterfaceName: 'w7e8a6idc96ydvwkwp1lt60jozb23f2wlq5n0wq906ly269b75chqgfdeq4x0nirujqmkl1g51ss7rviqxmakouk98emqom7d5je6y552tese74k0ehb3dzchgue5fs8gr7ah0jg46vpbzmz2k7qcf3iy6y82wcy',
                flowInterfaceNamespace: 'iq45koh60066iv58kzsfirfamkkj7b1d8ykrxi5rj6vkzsxn9861mqq4d702b8bhwoopfus13kgclz0k82jjq3vuc80bexbzel3awelhbed432ly8r0b3o4139z3hfxohhyh8bjmt40pk96jtapbv5b6chne3c1t',
                version: '6jhtlhe40dric9bv0whg',
                adapterType: 'psi0k03tufnuyam5v9trf5o4oxwdztjsyyjqkws46929884jx27mhf5t2rdm',
                direction: 'RECEIVER',
                transportProtocol: 'envf1fyvguyiymi5munu5aw77oj81553iyg9rj60qjxsqwkfbkestn71rjg0',
                messageProtocol: 'nmc3jaryuyk440ogn6zy7riir4bdjghckqnuwtnsigj2gjn8bet7269ko6ln',
                adapterEngineName: 'mcywovxnzgxagq590v3wbwyy99oufrxjo8ij7dw9sy7v63di57j1lgqlxxc7l904gyt06ih1neqfb475873ieass9dfmrt4c0rb2x0e1v7j50d9fhwnglqilvrmhuyq1fpjotx6q08qw0az7kb49symemfq85sz9',
                url: '2vvlw6a9ek358rq716a8nzki0v7ewkms4huckh68i42vlq1xg8kptdeucn1jdia7tw1skw9drd7hkk94jdzm9oedtypq1we9fnpnio029w17u5atzoo52uvzflwh6s711i25y9hdfriw82ys2k82mdzpveszrto0kf01mnq7uqxom3ila32opm2aq7g61mprjervej247jgrhg0fiv07pe284abdp1341x2brxx7ze3f2ky1uwodlba56yl8snw4p65e835f947oavdm5n9iny0v8wi6erx2ea250vvdf02qs8pyqt9nln0s5207r1cf',
                username: '2e9lcmodtsmwh8us5u2nhm1zovalp97fqtv8qvoylpat2tcuam5gdy58a2sb',
                remoteHost: 'bb0p10i3at9chmugc7pxliw0g6bv1ts49jgb0l76eyiaga4uc6gbi2txhkbe6trhgcpoe1m5hrbinxkg1bm1o2m0wawte5e8mhbrfart2ab18dxrggq82r664rlp6w9eqtsosljpphmq2qv3jo8cfk7h0ocud67h',
                remotePort: 5271166315,
                directory: 'fj0zqcee05ba5082mu84w9g45p59g984ci4jtd4xy0ldpqwwz48feson5eqesfqhk462v3rfh6xux3qma2j9f50o1gdqz6kgnmk6mk7wz1lj1aw5hir76oz8pc2mg01hnqr1xxycurikpm5uryzrkc73fpcgvq0iu0eml7uej76v8w18hwdx5hb17h50gftezbtb9z21ngjf1xsze0suuedbjb6a4kq302s9y9hc3jtw6n2j3zm006z2f4mx89dh06ko432l7sk2cqm4drhjmxg8k4crtpr8scnhqof6n4j5kdrylwhvm48940q48tsy7w0s5g99erf08otqs1s53ct2kuzm2mzlx3zdxyf9nu7cdt40e4qg1po8mguz0wy6vaaw8xequp1810f7noj6he4s9pv6pjovitvrmvb5g499lxfhmjo6ujde3nuwtzx9kvbug1df30t32n9c44am3666riyzebix6x6ranw7kidacw2ju873srdxivliwg3siedk7z1q5d08abt2lu5mbh9hzofizqidescdqny1swdqntelx2vv0w9neh2433alw3gofhk82nxjmrwm8gnjtrvpzimpnch6zfg8dnqz16pafvhrea6z1hbfxx2afcjm824q2p0zcj3bos6d8ju6ntnjj3u6xxt62qth6s5n2y918y3qd39quwavsp0zkac8s439efocinwj12a1btbnskiwpmz8ouxy4uzaye6ycvmmwyvhwco8fcq4rgm1zdekasitjz4na42vbgfhhic72ae8azsvq9doqg08kbbpb3kf67v2qpac7enhe43zahbpg4ta49t7m10e812r0ysdbo5lxfosm17k0j29rxzf1u31croik35ugxxp03lf7679i2xez3z7xwm696k6hj0rd2wfxv0dk9tbkw85bpmw84breqj0z9tvx0ycx99so8fh70dlvxz6fxidfv7c5d48ao2h28nq5kedumqj3rg4p7ylhzynzd22yshdx2yac1oj',
                fileSchema: 'fvb0wdaymge2tw2f7w67mnqgvaqeyt3h13mwqul3rfhjcw334attyktsb9z89v0lo41esk5yy4j1mtzvkgnroicha8maw011cpi2bwll9d658vcieaxjl7z09b3yf5sbhsxu36jprv174vubwveodxmtq2vexilr1355nhjctq98ildak3bkmqqmbow1s5dt203y5pwwmzsl29yghva1c7zulupumes4al93crzd10m561w5yduxr3k74xpbowor93rubrd1d0l06irgjba82rb7w08qx79cijly6fad7ec43fdpk006tpgp84blfnijh59vwgu8owj1lswn6tsepdp5xb9yxz88x597c1eb938towtsrtdxomxxrbuf6bqhais3sldihgib5zllgo31rwn7nqmufawpwjhrgo28u7m6uye1k1t711c43qemgrzrbouvrn72043aseyjv9ejcf6mghsbcjj2cob7gugug4emtmtnh0wav1fomdcgj2360x8eixudtssh453vqlce98aag0kd6w3uki1l6z47eeaopwb37414hkuaq6fu624cwv5mugz13y08d0fzm1z07napran0i82d1x55ta2elmsd6lj4mji7px2ljtrkbbh0tzksh2c3jtygvukrccuhpbvcmz1n1mnkgza3f1s2rvom9lcg702zh7fo0ob56pqbf2hgbm59v898yxxvg19pdkdt0l2t7up5kq6c5ufke20rj50xzu2vl7j6n1jbvh1giz1h813polpun0qc6iovelbw71et8olbgyqd6oj3z3ec1f2wgkqcrl70bhllly0044c5h5bg60i859eyqoqa4druf3u170idd4nyqd2fibw99uxemew66tt8tdouk63h9zwgq1rorv0l5kl7lcxdponllfviisozg7o92whu27e0bn5cpb18x3f17bukr14li6feb7yn7inpbykdb7mhwd2cmpj5x4c87dciank672b4nhtuj81djf54dyg6lva6',
                proxyHost: '1iwro406jzt1542lj56uxxu08e71ygrbglpkmqdrpge0esjjw1yv6qnqycgo',
                proxyPort: 7075970452,
                destination: '7ax56cu2c7vjzjiq0w7kb8nxzhnoyjiks2nxln8tvlsbssdiag03i44fref36w45q97fnwoi47szn9762ss3bai96o0q3zwjzotmvcybm8pn5j3awyzr2av3r7e7zmwlo2g8j1ig6awuoi64792oeja1e1qybsft',
                adapterStatus: null,
                softwareComponentName: 'i7boeue3ulx0fg38hml4bwadlpd6xwi1lwuq5ekpjnfor06lec18o51udd7manftl60n1b8y90986w52m8cas09j25ewpy1kz5r8b2gfgzs9bfb540s4ajwodvpv9wy5vlcqxx3dxlsjlsjxhbf66ekz28576cyi',
                responsibleUserAccountName: 'sf19g11sgneznv3flzr7',
                lastChangeUserAccount: 'sj1wfbs6uiye7zxhi6b5',
                lastChangedAt: '2020-07-28 03:17:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'u82cc32mm7lxa67kndke367hjqvea8h92cnkvd0b77lim7mye9',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'b0eumy24rkinvbsvrvxs',
                party: '6ud6054iwlll36wz6ev6zaahafjuqmf3c94pkl557cubswr4aahqv0uy4h2yg7y3rvx39p4gbhfx5cz8f0isuwgzfwkxdh194nz5x3kz97aubjwcj1we6rdmpeyw4sj1dkc4rcd53338jr7no4q7u921opb4m3yy',
                component: 'nmki039s5thkczhag8k5hm10xtqfn350yha0or7lx8pqf88jbi2elbm2thqhs2nnhqj48a71bxyvjs09if8p4s7eqw8wrad7kl6rwkb990v28e2kmj1kr4u5qauk34hfq2bwgojjc9kh672lecmqkw8gu9b9goj7',
                name: 'yfh6vnrimb43ys78oqcecpp416b1f5xhz8ybu67678dhkc68lbk94kkmp48lp4i7e3uupcvnp6e9tbgo9f3seyq1j32ntq2n8jryqp46d1444kiyratek8984pkyjgrjl29xf9zvmokjyan7fxy25y1g91u0fegk',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'mr314oy7i5y165l5vn1eguvtt4d53bv4myc5zks8yq2xe8pumqsufppaidxtrzwm2tfj233d87hys3w4u5trjdfbxyoasj5a2ftptvpq5gh9h7jynd5b6p2b6oeckp9fzaiznmbrbhinwik18v6petftxnqpgrjx',
                flowComponent: '98tljqwhinhm6gvfd3wtx4hpiup4u4tpefocxa9sfnjhxp1qlfs1mbdv6uf90wijcap3opopipva1wrd7q8plkb210q1h72a992jt9qe6zr5ip9d8oha3czdmwz8dyecck2elcswr59bz5vsui8cjkcz44fgzj5q',
                flowInterfaceName: '1wjlltoyzfdzy7o6smi84fwce9nsgttndxxp9y409s5jomevprg88ortfv1pyweu013qp3uuoomzjuk467nznx39iqjgw637rl05ph2a55l5xjc4xyvag76tb85h4ehmj0pvum2aznhbk90rx7ct4rbcc8gwh5vv',
                flowInterfaceNamespace: '2msfbf6e92wfyb8pwnw1j3nq0ipn6lhtc36ts7zh97gj0se12q18llhfocp2wpee18dvo3wzd41gmp2a2ilftambm4uj4zs784csxlqi26wsen1il8uo3jsmxbfy9m2l5bq7fu6tmsv7lhdrq47hwrvu82bguq2i',
                version: 'l2djjlm7twlzmk5mg72b',
                adapterType: '72t6kksbxp977etw1pbkkaxsere53gz3c3caeuzkhrywa93v78wgjtl0hs0n',
                direction: 'RECEIVER',
                transportProtocol: 'jllfyyz0xjaak4q3ytijitft1zdadep0iln86z271iey85cqsapv6tyz2xfu',
                messageProtocol: '34ziduce8xrrx0dablm985fegambxnxyr870dex8n3iajp3gvni30xo941lk',
                adapterEngineName: 'dcicjuoimdb3g73wczzyp4atwfb7439p5hqupjipmrj1n6izc6p9qcw9348h8lmqlled5vj6o36ncj4g6sagwllq6hzrbozarax5xmp166nb8avp8h1wod2pta0bj2lgj6wvr3v8a1kl1snhxa2bjqyyxa0x8l22',
                url: '6u0n45ofd0pgnxqwkv92ulmjxu8oebsn44oam4vntsgmbvkntqsx0ovtcfencxy6is79n6ybnpuskevyb2u6n7lqm4b3w3yu4apznwniteqnj9we9glosdj7t9inhe810i6h49lmym0fd1qen3w2zzaiwwcj5bni7t3m86cue5x8aedh7u7l5xpwjvs7w3ah9xi48ito2mkdsio5edim8zuh76s6ft6hj517o7br59wnmyxsil60nbnlfx9pp1rz6sdggav8vujz7gauz1zyhcojn9nlo2cgwb96ts8pr1p6toyzw0tq64xtji2wx02f',
                username: 'uyvitcmw5fc2q682nrmg73msnsitcgbl7o0c1wzm88fgsubpgu6dxalzax6h',
                remoteHost: 'jp0a13e0y7a9xzg300fkexat75ot1nrdrgdlrbndu8shmvrmvkpa7aw7tehx48tibx2cd2p911x2y2hg8a6hqfzt0gxn02z0z5l2uw97xj0ritskghh9zsmvmxvlsinneiuk90k3in8zxqbah1zg0hmydshpbn7i',
                remotePort: 8403573888,
                directory: '9l7spr5eb8ozqxl0xklz677yrij0nims8b7eqtebxzxy7d7tluwz298wdmmy9mlaneg2aw6l0t47ox6jrb7hpy6n0h7lo5z2lo9tcph2mlacmadtlz0wkpw2yfw0kpisd3nf8uk2842dsl5ps69aeqt8dx3h0s9g6miv1g0zpwwyq87h0hjm7jsg69kk4qnwxa05g2xrrx7f2qd1kw1cfp6wxjuvrq4xtiujaz4isn4p7scyzsc8w4lro54v686hfqyvcwvayitz7tmf12qdceww73p3uvmhni0j4ucnr94gurkd7y4ygqm2ui2c2ywbx86xcsodyqm5ls6uqkgxqxwi5m5vfunffsmdqgqk9sy4ce88kovmaywsjmoyvsdpfgt860a2tzjayan2sl1ya7zucge9ufddkqhotdb6nxljj33vq78w1w9toqwl70l61l1u9a02zvhik0xa2tp3jdashcq7gzuixd6npov1gg51qralp9dnm99z2266jo9y3ioby547fwje4qoeaha2gk0z00xric5g4dxbpkgcor5x5kusgl9dae4pfuzjei17s7aeoj866elad8agc1wzslbfpkpeotvkxrlvjvqcim87bqqc7ws6zbdwlodi1dj5uzs9ux6ao033vucokdtdpg5hzlfk911b3p7w9obyarghgv4t2htienj90tayopu3q417dpqco6bi08a9609ds2q00joqr7ohg74kfxivmdgr9humjyin9fsjg7w4na8ml3t63vj2kb4qt5z2wt5208y2bb6b7t9a832xy3ssrosal5u4ueloefq6j85mmrais0lf82qibqr2e1az2dibokenp9ig57qhsr6iqpd07g9y33n250ssrwluh4kg1drgivv6c4x9rreh1jlb1xrqzfe4wi9ku2a4df44vyquf5b4ttg28nsyqqre9qg8lqf3wasjvzol4b37435j1n6xnkzh2kt73edef7qjjcp8i45g0o42h0uec9pcrunwdjjn',
                fileSchema: 'c0amea213ptpyp8m2wdjmznkygqzqp76m2mvebqyhvu04egym7apsiwcaofdb3my7q2snzro707tw8fywcuq9406pnsmtc1jc2m94haiqok8pre9sjvo9eknz2tpix4fhmexx0t19qt4755uz1egy4lctzy35v4f7yn43pcux999ba7pnkwdwwwpv34yjjjg4knsny1oj42lw1mw55kkuexlb4rpq83z91imy1ag1n286c81pxe17q4lzt6r6lkkw3zcuhgl5hylq8sy4kcxttxtp68iwo9761iamcfj1q3bth82zzu9gx0f9l1zsoinfzuwa1podfvkrv3px2ahsz1p7e72036nyrb53upplib5ycf5w9nwezv0dudhtkyx6ctqvl6vex0es9dz5jz56ssbshxpdu4kttvhfowuo77sk0aqxmyb88bzas6kuf4a1hiolj5ryfhej2e0807r3m7y83fno8tl60a01owvxycdousplf2r8o32wqhw180ptn27yt9ykg01gme2yezogpi7wubo16bav33up083eykxqckhxoma2a5wgeuu7bkaaxmrj3jqef1x2sytxj80rfhp7p3305143gyvy7i6e6bq6hz9b3mubjfk373011gmtqhjlks10htnfstsij6jt2xsxx4ujsudhg7qaloeczp2z6f1cwfxjuiwp8a6xesvm1nwnavb02g5gd21hqgxgh3d5onhoragrh21geunuqa6rzizpoa0ai05a0v3osxwa3wub89fhhcu5wes4pck5b4ojw5wrjz35nsf4rgpm3o2wjod1lcooc4wmbu7x3rm41v08h788b5pc9bz3oq58t1eacyqeaw30sfwtudfixyfpam64oc4ugwh7xqygim31u0qkm65t0lzffs2mxnpc58iwtct2zbxwlcdut9y1lni2fpv1lvdqi1dvygltiheanscgb3rld8ojalzpbgh9nzjz96imr5hkmsdlnzi4px5hppqewfzypxecl0vw3bv',
                proxyHost: '7m1ihwr97r36cldna6bwwbju0o3ay31ct78pmpim9da05008g23wjazwioek',
                proxyPort: 5323046073,
                destination: 'clpm7ywwsmzppowuzgg8u5gjsejdpl4f62tjqws4gp1j5c1bcnn7nqcrv3lzmdu4gux4mk6wzsxpheoycg4an0r5g1ywjx478yosgjcz8tnvq3ivgpz8lkiep1zwfdrnt2rk3b12plslsz5d0v1th7v88e382xfw',
                
                softwareComponentName: 'cmyaeqolzkepu1w7m1yg5lm1d898762v2djijc8moxet9x8n5e0t26djw7h77cqkhvzwcfs0r2s1mrkkrdaiwh8jok7moujjaq53rrshp8gz1tdw4di2m537s89eg4p6p6a7lt2lnibk62hkcurz6lwgij4vy4se',
                responsibleUserAccountName: '76q0qc08j3yl68wj4nxu',
                lastChangeUserAccount: 'wrv9hg5mup239g7zr70c',
                lastChangedAt: '2020-07-28 10:13:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '3dzw6tgjnkqg0eg92c3iwdt613abve06o36db',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vz8nr2qvtib2pl32t2scw8k5q10u79n2soem6e5xfe06bpk8wa',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'slt2rjw7bnmwtzvtzz7z',
                party: 'qvdpqy2eo8hqudzayutja5ac9cn354tp8cx64e8it3r2o6jphgxbfrioqxjm3u6y5blcz72t6o1ewfh7kemomk6uucrxofvfm2i4kujdqd8xhzgvwmm7gpg5qzqf38csw4k40zsoinp6ly88e950vizk481kloa9',
                component: '9up6pbdz86cvee1i071ivzekk6mo4xzn5pkmtw44xp0e2pcrnyth4yru6gw63v90wd2msa1kl32ckz6qfszcszyjus4paf0t7abws4nrfw9f9pahu1vw4dj91hgxql9u05bhnyheobex9dao68wf706g6ru1opb8',
                name: 'ps1p9vo3cve18ls7bn3tsqorrgttiowdaog1kx51eqp7trsuld8rmeuwr73nvx2e9fft7nannvzz0l8npgvdbymkzeh3b1re0rm6i5jr4ikseta3lk7lbys288vmljepdhhpattxv0hr2xybjwct5ge9h8mk0chc',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'kkdhn3yntq78r4x9nxw7jn7nxq4v120xrjmmtzpzuar1c1r7s5xpkj4q5khpsdaybtu7wpkwtto37cidcytfpfd4w568ea5yf1kfkdzvr7wqwrdjl4tfroji3gcqbky0bgnah7hseju1vuu62dmb23ax0xoil7rm',
                flowComponent: 'do7622149pl2xjf37flbqi6csl5kmlmw9fbbfwn0cfmozul21x1w07q488ialy0osymmwfubqb8xq5oewjz3suow8hqdc0pnb4fwh9bcdtdkojn5xt04gjln381z3763zu2ta9ts1w1u2mgc5wy0w69l0b0ii9vz',
                flowInterfaceName: 'rcnknqhvba5vt82xewbraqtuufr13oouiali4t9gc06hes1p49ve3atqmp11cgh9qkxlsurtuck1xn9yz0s7iky4f2g9rrbthgndn893e9isxc68039oijpej1flanty74b1dciinlmcjz0nnct92drra2dmpcxk',
                flowInterfaceNamespace: '8wmfyy6jf5s5r7loyqudfft571bbalfclxhzmbtl0bw6uawuqw7z32rx78jsph7mrnjqrit9ok589spgx7ep5kesjkpbvdrjeyo9cfkkckj1ha8x5qfqth7j9mcf3nfrhq2zj9d1e40eyqrp6kqyr2rduj6zl996',
                version: '9dzlj1drx2mrpjiuayzb',
                adapterType: 's1kryy1gtgh3erh5kkmn1oqgg91wjk9aiawm0hldgstrb9i6k51ajn26wgfw',
                direction: 'SENDER',
                transportProtocol: 'e96mv8uhjv5ap7qzbsw4kuecjmw2lfvzjv1fmcfvskv7nn9d2w3f5twdv4ty',
                messageProtocol: 'zaj121rpu8ukves94lpht5el7r2qcbo935alsjbw11tqy150c0jujhocsnym',
                adapterEngineName: 'm9mavmsa6yxlb9oaf1zxt1pvin110e6vbdpzkhodbj8vpmulnzfp4dqrunu8vu27lcahmza2f6x28e8ju6nw4qbbj5l7hzyb6mu8neaqr4z8acszunsgln3je7pgbfohctbu3bqg0q0tmp9tpw4el7yp2gfwmd9o',
                url: 'vvkr2m1m89vr1b40ot3340br7s4btpla9dbsiq5mgseulmbcwrfhids44dsxk2t5bxqdvq23tuml1upojeva93spgtbxpsk0lvosjvv5gnvdis1hmk7o00jjbwg0q2f2qb6ltl0gy9jsmvxw8url86rlq2wrn468zl56mzikgkzwwqutnpn8h52o5788cf1fwbgl5a1fykb65hpk4tmu3oggahzdis55x830309pyawt0wv0o0lt843rqtxdrufpfivgh2ehbz2mqv5tnzusxcks2ycoefggdordcck6v6fncmd1nahp88h1r11hlehx',
                username: '2q4oj79asj0pt73jqt0awluvn4mcyrkkq88ancblr98w6n7f485ywe5us1b1',
                remoteHost: 'bkay63442sbtht7q4ylxfbp01m2laffg8apny3s4gcntwldt87mutju7xanxhbw6twx1xdmvbgtp1vmpzdp45q6xveehl5mpuz3bf1v7qpsn2dlge3iknybpecw0hohowdqz3sm1rs4lj2tffvfbek8omal6r6hw',
                remotePort: 8442453499,
                directory: '80pwzzdi6s5k8sdigq59ysqn5ooei3blrlq2aues6bcqe1a4dd691sacgwtqoqb1dsvyjbce6ab6jtzjlplavkebygvxcer5cmroy012a3epcuzbfo5j5t4b59jx3pm8nh14tb6kgvx8d9ddf3w1v79xwiu2sd84ce3h4vamapp7qfotxb74qu0pae9c0f95sw7j9okjvqtnvpzi34eobm6tpg66k946770e6617oqprfz6h6okr1mdpqkfi51vrfx6a9vdarhztw5lhvnolo50l5gsuqo6x161n5q2ykccny6xd1i7sgry8t6afc2g7chkzqvano0mnrxr866ljgrwqz9eji0s1fynvcaxbby8wilgygpzxjok8lte476lzvd195lhsiz9aoz1yjurzsrd4asbsnthat72l6mrkgktxd66nn48gt2ghmndxwblohb3q00q3enaynmfcj6v33y34ywlbiyru6iaccc70kiue6agcnhag3iccxwjnitjm7mpwcftr115sqqds1hjyhg6jks7y3e742qonsrtei60hlxunfmzws9ik257xh51uolt7baonf9f1b6680q2d6dnw16yof9fb7tf2yk6aq4w9sgvshlggupo3oqlnfmbi78vs8llwbjsuw84vs94qsa2rfjba6qzrymnv3mb33nuqnvw4kt3r63j8z7gbsnpm049w9tt6b0s6u8xy2aaamhgmp6cp0cdeqy3yc59vtd1hbwvawa2wifjcfmvbre2zz5wsratd1qhnl64kfbw2xciu4db7whda2cjppwn627ue3vjw5xyap73xn8hhoy27wj3pcmrs6r72ney54e9dbuayk6djwyqor0k2w5cdww1epr4ybshuh9s6zium34r20xeo2mpfimnjftr2u7so3sxm4033bqeyug908f8npprqyjawqf0g6vingqhuc3j1gc483wkbsq4pb4650e346axtunvjws28mxnt0q2z2unn15ypms4cnyz6ze6qczhb',
                fileSchema: '73xd52jux1ms302eusq7kd4ahwbubnw67tpvo45wj50m2japvaho3hekkke3zwcxutui7orlq11r0axdgqmzd8gbu08jhkccaf8wgwyfxnqk1xmqhu2qbt0uazloxvsvr92vjhifol4hd01q9mwyx2aouzwro8ur65wkawd718on4y1jq0xc97objergfhcb8zqduyhkqopqh4b4c599bgc9fw6avgtzzu1bcn2p85g9rrv9vx8jeo8e2apx88qdr9pj08raf0ajbgh5irn9az7uir9syqgm17vfchuqexzpx2mz8ldriibjzpxeenxz19tkn2ymydgu529shpat1122w84n40e6ux2rp8sw209raqj004z7wqmodn0deyh61i7mx718reb0msef3p65dllfg7hixsp5cmm0w433bzc8n8kdcyh0f9klpm1pnhx87hrlbh96zm6ke5v6f1ugvxm4rwlhmd6v7pyjsca7q55ys3zva4x6fx4r73hg2n6sy64u6xnzofw8vncbklzq1flkoxaktqb1w518rlb6dtcujhi35cqhblgxl95vr1640pga27wk47gaum57gixtc0j3ricy23dk765jgtxxp60680l9rrse733eo0ava6z6f59v2wl18v83r45c1mgslbdtumg2jtk1gfey7w7nt4vgyqb6zpkydqxc4u5ps1881ga5mx195c0k7f49xzu3sf0melemr0xiiris02zteh7z8tcqqnu23aaqrhuivxcbebji05wk0ycsa3jahb3mr9wi4w5mcagjrgpgw1ohq4gu73affx8z18ysqrddmeixn1huulv5a4ppu051bpsje2ex1arrt53tysx10d5al9icksl4mk9cimz1xsyju3cq92bhpqr2ba8wh404s839igp1zfhq8hrkssxk5nj3u09g99fr768ph86cac5l2b7z5a39h4tk3p1j7ah7hav4gd6cqh6bh735lhy62qu9zvou7cegfymd8adu76z991b2',
                proxyHost: 'n03g1bl9od3s10qxhf7erod8xr4udmam3rorez0zyoxftfhcp725l66et136',
                proxyPort: 7962967239,
                destination: '089hup9s1omqsom194o9giotf0luum8iewpdd7nz2ttngp5v06mhxna8ck1fs2huprb3i6wv5lmjqhkstm3y0gysf99tji2zqh87209kgqiho0n88oh63pluws51nnq87gy04zwgtb3f9tzvspzckl6r2gepdrej',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qs30ii8nkgk9mul1a6xwawfzirfd0ooi986i2ga0ey4fqay9pp432sneo14mkpvik32k65rmyg6lbugjmuy25jfx0ra5q1x67xnqunjai236ywt43mffbxkzbjsn2cma187dfplffhrw1k9ixe1dcoy14iiq4x7y',
                responsibleUserAccountName: 'q69rhligbftzoxbyzf0c',
                lastChangeUserAccount: '3c59ozse20ik0cpv1f2e',
                lastChangedAt: '2020-07-28 09:29:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '09p22j6906worhst6zx25is766z3mgjpat2bw',
                tenantCode: '1q0q8lfv8r4ougdxp8ze77xv5bf71dumhvrxipd26fh2buzrp9',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'j3ygoxhauhwth5ypcelr',
                party: 'kic2woybu1oqez85jwp61kc7nr5u5e2gmndy6e50y39zfz1aem14ja9cjoy2ubsuid1d0k66110pcwlv17kcdin8zcz45p6o57q5te541sd66crzfak9x2gb8vu5qfradhvujii4tkd1npcy9go175t6hur46r0a',
                component: 'dgm2rvzam5ucboq8jn7obljv8eb0sn18qqxn5k1kefr2pnxbwbdbdtngyse2dpkiyr2f6iaam1f8zsbc5lb7p0w2sgsd913bm1k7ve55nvtbh3wcedj1e34u0g4t8e6dznkidtkim84wjdsjntftjc9yviwzvz9s',
                name: 'lza3y57rg1cp1tx3jjc3oz715i58bmfxht1rr1va743kzknc7tz6wvbmp8tpymk9u89am0scu0rx8kfc9yi2ovvtmyk2xt0i5i5cxozrb3vb2qdoscvupmr26wp6kvh53lo2i2xv24nlnpgfjwhrawyrd6d89cmz',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'uay8do8xqm8pv7koshwz5f6ru723o29n6bg13pmia82t3t3hfzjott50q0dqavconlg55fyzjmedgqhn1ormz3qwmdr6vsnchvuxej5r9xzfdl1tvewytzvf8vz3ov2spqrth0jjgv7uoyzwgzx0nqz7n5vanrsd',
                flowComponent: 'blkecdery51x3r1bkmgbn73s8ee0x29jp23brv1a1kwco0zs0p93b1up8on9dqju3ux7c6lisdp21fyd1ullwiglsoltcf4b84mm0r94wo4ckcw3ahkj6fplhf56a9zlm4e2sb7f5dbxlner2no1ww5nf4zx21ec',
                flowInterfaceName: '54xwf3q069q41poj65jr4xgckqkll9hxl1npcu931ie87p2bst0u6zvoojab16y32zcwtw1rd2tj5hgwha9ubexughi67xngfbzvum27au2c5tt4h0qdsw4pdgiwiqa9od35pne39qucksyw94izuugvnvnr3szd',
                flowInterfaceNamespace: 'lugbx0x9803sn9awgqgn4zt3qucwf8806yehhbqaoyualhfp7td8lqgnm51yxojrryf2isk8ymczrrv82aac3fiwu8jr9xssh5c6gta9h8qyrtussoujjva05k1i2q04zrh1ybe4j1ufg7rhp3au5s6m873bfi80',
                version: '9w7tyesnvwqthvq9hnwz',
                adapterType: 'yg1p20l4vajcqd9a5vt7esg41l7mjobsemh8789n0bx6oyp4yo4etrwtlhvu',
                direction: 'RECEIVER',
                transportProtocol: 'om9up6ih63t2x3ojrvwbqia2gq71lqtacya5i0nw89bo64db4n4kagwy7h9j',
                messageProtocol: '0gl1lqt6rvqzhfvttpkkvhibfp8x08u9ohe2fzz9snes7oi7qh8u4qq2wuo3',
                adapterEngineName: 'nx5hov063unojo9mw6e9xaov5u5hnynzwuzbz2v0nsj9g2livb84ljqorukxgyzn87ia4g0ys1s4z5gdsftl3xeqgcf9mrugcfethimjf9f6txjm9kudil2v1wcv7q1x8a3uywrgqxx64trkl3vukya45kyjbhv3',
                url: '9urg5arstpwcg6osfc46rofjdvm56qha0gmgpoxoc1y98moughkxody97lcwl1cioo25035qwxbiwfy433c5xwokj5mab9u5hpmk0ccfxqqvvfbxwv3onpehljcn89lsrianax8hvmbrsooc0swr6l3oxrk56xa8ews0s9oknegysztdgt00xe8jqsyr8v8isy6txrui5hnm9vd65rqtyi00s67t3mvtdmawttfugei9udtl5f9v72n41hgidx8paj8d51avkprwiu328uw4sbmcb4al4aqa8scjiswtzmtpoq7nzmchdfpllws3pucz',
                username: 'xp9z5b69p86dxdc6ee21rruxg3m5c58a1fhuigyd0ovyct74xtvr2rmhl5j8',
                remoteHost: '0bz5u767n9rx2kkdf04xebq54zfnz3d8vcxln51ikgtdjkfnbvx0u0lt1puf6bvcd0eu2jnkie8odasdwvugc39pa7aknc2xbjwa7w9ipd5ffyxw3z9g6jsdto6smjzxsgzkp9r1nbcba93t4pq7muittakhtlp8',
                remotePort: 6454117685,
                directory: '1ygo7k2vmvourptwa9jwv1mo25mg42tl4t4vz96dzkpccefdqhre82jgxdvwcd9cvsucf2ergyuiy1ri2koa14oxrydbceeuydvunah2xdwv2iu7yyi82nk58t220h2l1z3jjqrk6wpzina3qwtiyp4r0p54gac6z6fwf5p490kma52h46f2glc6sofj87r3b4qsoynna7nx25053gzhsnmhnabjpsmk5gpk7td7e3583fgwtx52l80po21tom88ap474gvlax2kl332f3l50zcp5lg864ie7lk8jl6b2v9f5f8iuizuum0w5xl4d3bmk3a9g8symp95uk9i2epf45k9v3ylboiuwvycggxx8xwujlrg8lr4p0vzm5nacx4e6k06ra3237sc23eogkf1igysvr3q8a6xv91zhyp2l7uxs2phikryukkgces90uo9c8a4r65c62xc73c58u31uuxbtqml5egt7661cdcehmu531x4axhwbemqbnjfxb67d0ggss0a4oy0beri3dv9ug0vibs7egpivyiac32sdyq5c1lgk9ukm8pp565yg28hzks0fdl89rlens433wjc9jhr6xa2iczlqgp16hnb1l2oqcvcfmxxkp92kerbden84ivtkcp702lg8fvvh3077aut4pcgo0z6jyrqprt71ojxt3d3tptcwrgi8i9cb2lwscijwdmfqnt6tc608k96v814fxt8nsuket6wz5xvu9ntghqzcf51vujv81jyksy8mqgyc4feayip1iyrrmj2xpb9ih1s2t9g6prcktqg7v2pi09ofen9kr6g1vig6smduqa2ma6b7wn3g6hys5f213o43p3371463e9xdl9wvzw3abutu20moe7a5ipzcfr7njpjx048qjfk8r3dmim1cc5vzl3mkpgffibvddav6ielq4dq0cka30wzxbcv0ri0xm7wab44zxxpvar4ytis24mq8tj877byfyr7fvoh5srh9h5czmbnfnmen4t7qkoy',
                fileSchema: 'c90td46v35uzu7yib0dnca8y3iyo9461n1w5hz7bhjsegm90qhw6x8dfptce68wipwlph3l2n9m7kdonqc7uqzj3kdicl0grisn4nxpu3jbouensfrfjfnmmqn51ssn7fpvfd5iut2auv30fit497h6cmntgtuy74fj9avqpml2dk9e1yiak3hnvjbwzu3z2hachdwk1qq3f7h2mh0y94v2ggx9zgkwq3htar1vzmk27e34ny3d8tuf4u115c65ihlu3jurozff6z9tmp1gxa0t13az0ta3tab5dg7eush9k7yie2i4tbyj6agdzjnabzb3gbg3a8dnztt0onrwowjbcbnoij039pcrtgulgbk8m3d1egf5brd3old5y67pzhd7n19lhkyjzrzb82j970jbs3k3vvpfq3blyj08x9nvlfzfe00t926o7u8c1j2k7nc88mys9h6mddecf8pt4a31iuqbw57o30tnv6woouqk1h7rnzfgbzqm7dy2s9mgcie6u2lbjdf0mxqnz9evyrc99s7fey7c4eer7puiehdqrt11lxg2uor90vzj73a59anntggzl9dorlc67ni8efyt5qkiibztoykdbp4nye41ivist9jd10000pp1xc2ybltire9bvcuj6r7j2ln463qg1oiw9neew4ewupcpms3jrv65toxtu1g65nacvtdu7hw5s04tnb6z6gk0f8hzksnje3hbawl0vrxsaxmb99cmn433txx23yjgro2nhb4zdit6uksta6l7uqb1rnheuboajfsi0lby4yy069p4zf8xb9arigb7xnj5ymhbf8a1bed66ob9l2a6ghglfn8u0nqzpe0sulkfoujong0oxb680lkjdf7iu0jt4tndqw4rpeia7ssuc6gcp9374twv6by7mn7lh7tnb2r5w64k6rtrilyj8dcgx306in8o25aq5s3k4uz3wm3niybjnbm1lmzo0vxh3rtc5he0o44pmi5lzkz0afz27scxtaizvkghd',
                proxyHost: 'odtyctulok81juqz03ijhw9rc92371intg59m0i8yc92cg3xbo1dkq9s70aj',
                proxyPort: 4758641441,
                destination: 'x3g11m9x1g5cb8gg352wvty1oip2lh7j0v097x4nfqol6lg7d7uwn7cyc8s0q6t8je162pwkmwgb1fyffz1fxqhrnjgby313tar9udc3d83bydj402rxg76pupipc0410wvxc0kmvsd8a211v08wchq7qtleo5kd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9omwnh6xcq28lt3ru0pyegafj263qwdu8q52mwb5wavtm0hyiqst3jtiii2cz0crifahydfpwzf8aexvekqm3hiagsrqx7912ag1n8h7sbdhtmjt4oamsgb0xt21dexfq4w6i431ty2q10mx3bldg6xscxh923d4',
                responsibleUserAccountName: '0zjmrmh2lzwxi7lhxshk',
                lastChangeUserAccount: 'xp9l75xdbdn9o8iqwn6i',
                lastChangedAt: '2020-07-27 21:40:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '97bhx5pknv2pnt6ften620p3dfto50tx445wbm5ongmanhxfnd',
                systemId: 'bvhh6vfcuia63xuacyfbgr2whuze7y6srh5hk',
                systemName: 'eatehcrd1utqku57zfzo',
                party: 'qu8gm36irumrgiy3qvikmvm440ftkxib4idzc9s9g9ji5gv06v95k4p193k2o5g9alzg5142s05dcdjbmgf10kc4j5v9ohbizaqmiq0j99bk64yhqyk8lzcbqjckdoq76ayb08638p52guxnxbpmjehno5302411',
                component: 'bf7cu4pmpmenjqqzkpev1hmst8h7ww8dnhmyt8i6doueyme1eu878mkko24yi2jofjs51k7an45rnyad840ozkt854rrhlc32p2xchlwb28yoavk3j6rpvljn581mcipkuepq6qk93frq09wqrj95qryt84e2i6q',
                name: 'ffijo6nogajl2vylohl9b9k5yzz7c25xk9m8iaewqjccji1kkvbop1yfz80w6tr70eur47k73kzdf4c4ixd8tm72m5n5sobz6lzmg49euv6r05aq9pfizvrxaprar9vuw149ml778mh4gh1f5vvy1tn2auh1jf7g',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'lt4kbsggb856ickcb9m9quo5mu57pkw8mc5vcjur97jfmy554yc4dl3ojvm95s2zo4j4fvdnf71baum8w635oixbbysmkmysngojjt8s4x0gnd7gk73xufmib9alkhr4jkkcsg23g8hcqt6kjk8k6cdd8ebvhz96',
                flowComponent: '74zbdo77jzbfdykno0v2kw08m6w39pwfnh6nkleyql539941are6znezrpyhuio1z9hzc4j19z9rzrhra2hfgr5hvlmauiq4nk1q6b8abcn48fp9t3y8hpuo2rvgllzxbjw0ojnstxcavg09oguv2p73p8qc3tn0',
                flowInterfaceName: 'mc7546izskt5tcmeino2oxawfadbm7t5jto4iilrjcjk6k25gcpga6v46a2yvansmqti2d6yrzturzae9948erd96mq6u9k9qk9brh7u9w6aa5xjbwy73tjh9rj6ohn3mukq8pnc3s7qocxjnxmf6kie5as4isnj',
                flowInterfaceNamespace: 'tgfw7ojyztie1fza5y4pazp3nr253hidgmzenve39r008rj5jjpk355ms50k62jngsobmydt7ioq91jgo2rg64vqoghx922y1huq01w2d8o2i3ulpks06hbql60zsz38m26vxd4wbny53th2p9o4sr6uqhdyvlyn',
                version: 'll6najmgp0vcaoizlxyn',
                adapterType: 'k9xhp7g4jsa3e7asg62jxa12mp21ypqcm2dp7i6zvfxm88ulw1bppnkqx09l',
                direction: 'RECEIVER',
                transportProtocol: 'nc6vg92hu4i1qhno0dh9t0hl1txtu4ijftlte1vjvrtba2615d914nc1lygc',
                messageProtocol: 'l5b4z2ldj7erpvbmebqn9p647womds0lpf6ih49fw5h7skydwldwym55uqro',
                adapterEngineName: '8vw9kja5nk8dbcl8hhvi64bxtgq4qfqnuz2h4ql7picoia32e6gtkafbsumgihoebwmlc8eufdwth7v7c4hog7ckje2fjq2b6vzgjollf6gpjlssd431evl942svroywdxx7s0vqc31cq09f69td67qqufqy9guu',
                url: '98ps9p4tuv2lfdaije6ivcvuf4afztl4rniyngr9h828ch5bguqev4nkoh67xolpp0eyr7o8p3b012u43asm0hzog7auwjv03saq7056fdc159hpe3uhkwgv8hc4bx0z865llmj9zolagup73rpmxr6u8vwq684mn3dn5eq3o0hkzwwjpfkc6yddfesqtb3a7pl2yxrdiwwekcmcdypjfs7hz4ublzvdm9z2d6t8m1par5jph4u484p8x9fwvwg469b1o02ivm5myjknbnc5kh31i6affpatzaar255y34li5mch7ai2b7q98kso7atu',
                username: '02s5orxduflmjhytq3qdwdtmkjs1u8u5t3rciwu7fpxf9017p0iqga3mnknl',
                remoteHost: 'qsfzwaloplbxap9ijy4xy7e3b1z8tdvdu2zukqwa34361qy4v5zdkjdqnu4wghjrtcoxwm172j9pqn5lnl8vq92t4ylfzm0xceh8rsyymbl6twxn9wt8moz1babgznvxxlro1pzvtdak10er2g8bsaiv4hyfo5y5',
                remotePort: 1038374276,
                directory: 'm8d0xh1fthhb0h97wf3zy482jm9jsv9nl7dg1xwitsmjgvhd4urmy0h1oqsoxo2xpfxmlmu2qe4c8377xxjmbt3xa6dtn903pb512ut9srz6ik8e8678lgo2pw87ziin1guor5mcjl8qtb58oifw5iukvkm7ab9rua8eacfg0eeb6tgux4pqfgdkj1d14rel0cimxzds5pgzftbzymzoob4kfu0gmjd0bicn3f99c18l884hd4ebxha4a96uwbznhg6pwq7wg3e23hd4js6qlk40vi0phdhq0pq4xjo8tkpbdofzotba91pzgmwevls69um18hmmxivt63o1tecwbtmapvlyvxt7bq77xjtzgmzin7ovxju4ixudkqahk2rgjejfuth8xevl5zinzw7urn6pc8xc1vjao5d3nktgkkuyge0oczfk1m7irnvzzn2y65c4ajc3scu4uxxepri27nkmrhcezb9upg5js46uq9na55h4l4153w5ks20oafl9huvihdir2bk450jktsfb14pxaoy4r4xlss2xwppgr6vk471gbtrdszwi1he6401w8wxlwklotjfwm76jbxhe40bm424yg29nbpip0n753ucafhlwiao8wkpapo22b2vmlwaohj26ywkf0vyjzih7mtu925s3d08u2m14ltfa8ui4l7koz641v7ym441x47dwgqpbfuiaohrjowdkn1ds3mdfgjccu1r6ptk0wrv04jcmetlsd74mz9fzxq96ddfl3nhapikiq31sgxi7oqhortfjzcqtuqqyat1lti9o3ki9f6u155ces49bd66j1lfhy4yvcmqihstvrqdzxywoamxh9j94ejdd957xbs4kxbi7lsp6olz0ufob0x8n9123dbahwvu2xq9uc9klzdpji7ecltaikh1wm9cznn4g1bgxlpdhlsfnay6mq0guuwdt6auef234eldhhkehhibpotk5siqiaszysi8stpn75eahdqx8t2td8lan55fq9bcw',
                fileSchema: 'fjztkr8sdiof8yc4g1fk66vqgvg35yoa6pcx9163e2u2nzlsd832qicvkcgpqm2v96uhnyhv4104ghej6k3oxg1kqzrpphwstwyvd39f94ysh5a1ac94it1adlhg0ozhhp65j88e6d4sksx0iu826lh3rkrsjcjfrspld4bp5op2vbi73ptndnbooiabmp8ltmukl2i0lizce07szc9rmaf0bm7ttzkawlmkpdu7z4oj73fqpphch2ikb4uk9vgaihxlxlh7vbtfm0zy83lmxehtilq7i0pd8k73wd5fe0ojzdjc4f2hbiuczgptbyz9j8uea8qb7hstf2hbcuaat8qj6zu55yo5hqr32k5g7vazr0lzk3nv7ij13e7tq3mgqnbom4ev907ytx1dm2thqaiwgnol1tkko91ebviors2p7ir7t42jtmwmmb34i8wk43gaan5wiigtq9j7dy3ilb49o0bdv4cbe7ip72ss50bwuk1ucl1e8qzvi0tjw6szgz9cutur5nfd90pml9agfxyw5gwic5jdjh7fe4rcxf6xv8thlb3ibjmp2mf8sirdolx4hwuqo0l1pjcdvqlej6vfiwaj4ixee60wlll1prahip2dfu73vo88vk3winbswhsdip5tfj9l2auxu1ke8ngq5fnwova12okhfnc4ne1r409deg8ge52kjt1hdf9r5uwuhecrk8ee67harpssp21w1bqc42dcxsr3qijjg198i4e9s37nat1ld3xkareug46d1y6r9mn49bngcml4um1sjex3qn4qfo0jux4zjfell7nsveipgt756byoeeviiz8ijcwwcxmhs93riz6sq7zxdqn8mlt0l3rm7ci8v0oezsvkiondjne3fcvoodwowlq95m4exihov6g256nyfs6j2t2b963bqbd2lz7fnel62gparp0gp3vrk6iysltxwm8n2o6zgzepenhm9jxjdr6mvd61r9c5yg3l13w1yyev2i8d63kb3klj0upmd1nv',
                proxyHost: 'bw3pj64e7aa2ykiw9sgzotzm0y3irj5ucd05uicrmieyfzbtg39m0dbzsq2h',
                proxyPort: 9151084279,
                destination: '54liq1qxo0pwu9rqmy6vqcnbo0g0ov6u6lljphi8yvdul9b4rnxt5pn29edn4cki0pmoeb2s8fmy6t2jzjb68vuvlbe3ubkfpp6h6rfrux32f8x1xoid3z2lra0armxxq5r56nev2esm1d5urlr5s95vna5mn18o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6ptevnn81orzkzb3folebv0ppkc2jwx9ki5fceuxzvoyqx7w1jjugjc10kfgdqfptiscdd5humvxmuumq3opasryysvgosjy1v7np906mez8mpus3dl6s3wvz0b7wak1ria4k9ygu0cde7jtqpory8lsw6dq3q4j',
                responsibleUserAccountName: 'uhcjwul2jlregma0im4f',
                lastChangeUserAccount: 'bw1izllv6pqgucroeskt',
                lastChangedAt: '2020-07-27 12:44:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'j2hn7stn3wlm42xg9abho1g7i9o2chnapc0lctckmbh8uxaim8',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'n9j1mcouudqhx3ddcy13',
                party: 'r9gzlnw8wv2ntlthsso0azliy4onok5r38de9fbwfq44wrjcttu9fg0onqm7upc2nzldfefe0dzrlm37pev5rxqvs9wqg62pw7ps6anb3hcjd2bnc23b4nauul2s6wq11gzn1j4chu8n1bff3c0btwqcxbts8alu',
                component: 'd2r979ftgh6oxxohaibeg2hneyosmq2hz742hvpypsl8fiulwh7uap2zcm96hvj8wrbv6mueshmjas35rlwi402attgo98etw3wwhjrkdmpm1ingwzm5eonm7tpqjp76zj093gdo8g7855nxphl05xv3tj7g2n4s',
                name: 'qowpvbhs1ditx8olc31cyia5oyaho6bo1hqucr5pjwys7x2e9ka1k1grjiurb9w24ll93a0jirfobumvqzxet9h16j8hqm7xtvg8sgdo0hiw2m0aivdm6wgi1gvqnydq4tnr0rc6mafyedps8nuz0xgvrgpg3yna',
                flowId: 'yvrcy1dxs719qeeg9z2zf0i09u4yuj8yysw86',
                flowParty: 'f0u1j6mxtgosm3u7xqc1zkr1xkjrl28uvaxzxz26k9u2i65x8o73k95l944ga2qbvwgsuw4ko91p2nwkus8g8wtaqw2hmqucwiws0laiaesmze1ssci0zbpt3bquas7014l8i03e19jb4rfc51354p6j21jj60ia',
                flowComponent: '1njs0epk3qmpe1902d5szw2ni5plyt7qaymu3mgk0ecadlj8n5ne7qoymzknv5406mrd0qojjt4qg6p5tyqss6jnctc6gjw1f9ae1k5ck5zidbacq9w8h70t81ilupsr1hmvzqa6422fpap4j4xweqgdopdbj88k',
                flowInterfaceName: 'dyv96pkcqdwpcv7dq0m6bvmfoy0wtn20xwpdy1lzdb11ohy766n19pxcq1ipsbaiab0bls6yowufssqmsg2rh5mclnhc7rz0mxu6n047n10pd6a5qopgmfimbnf79z2sznjhwaoo8pippwmxkxfeafnr71hoy0zm',
                flowInterfaceNamespace: 'cgknig1b17pwrw4gi7x7ijqmh39ze0rmv5kr64kjpkoc2juj4weofis79rri8ia4p05jg9cy7odp33kw6yudh4u29qbiy7mhdhva0b937uvdl6sq6tb3dc6ra65ey56cmsd75zrp5myaw6n4s6z1zq54rxkayyn3',
                version: 's001c5f7yjmzbf1wx7r6',
                adapterType: 'misgcwzlr24ykr83ad5v28mwr0ug4phj7uhwu7bpb9x76b360zhe3pjd8dp2',
                direction: 'SENDER',
                transportProtocol: '2yg0s66u2kb1t18wb04y93o5kxp9vkspdqa2vroj1st281ddadrbzbahta7i',
                messageProtocol: 'teg0lwmycg5z0ludthewx9lo8slg1jmbgi52e6x1f8jtzcrlie70uzx5gqbr',
                adapterEngineName: 'rdnnoqpe0lnja682ebzhlw6kufmpq8xefeg47da90v0qfi4fcuzfk1ic5cnzdte7whbnb4b8kurlf31ze5yiy9jch89pu7ythwyqxlwyi27im1aoftqth56c9xtx27i3upqcau62ol61v6v8xspibkkkt3pgaxh7',
                url: 'nl23knvi366ewg32irqartmt12o2pb637vtyyuly394efaapve6tzot6uuztr93qpy4f36a3a72wl9vx4yxn8cz9n7i00idcvi1xsn8kaml9hyqtggd1lnfm9q61qqbr4juz0nvkpmg1hnl4knvzblo9ncjmvduj78038d5sjfil6n6ld5c71ei12hbopj2my7xqaut72luzw52tyfy27kjldezityty9h54la1m6mugmcodeasx81czs5rjqtuipv6xinak3fdbop3cpwiv0x52baulgfepjxbgui3pref5bbmvyq0v1dfyo58mj11r',
                username: 'ca1x50d75bl34amgwvje8hps6ii7jo2r3b51g1hftlal3j0evm3za8zxmwji',
                remoteHost: '7jtqtqz09t771ve8l8vuvy6qbz9qp5jcesaombbe4anopbndxttmwqvc4nd08a3ubjdv9ttdm394rj51x4eicyfcugof54lxcey23uan72mj5adlylw0udlu4ljesfqdw2knfuukjmwl2gxprffiun08wk61s54o',
                remotePort: 9103656630,
                directory: '1mn5drvt6vncrj21mqmg64jfuortgnry4genw5egj3xv1tyl1i2tphmrsg575aantddqey6bnyaucyhbg5dmo5y6vah26zvtwyd8z2gchg1buspaiwhyvxhz7yclxq8344hsqtdphfzzqpaodwbnh0vh0fa4hcrfj0cyle2knagdukm7xdm2r41kt39x4d3odtcvvh09kzkl1do33hekeydqdoit7mm20d2pm3q54eotyoj4pm69sb329atk5gz9mqol58y4y9sccd90fxi76nxc7wftbk0fxs6tryiq4h9qfot60gvnihv01xqoghw7ug3gw4qz9g9w7r3253x311kejigse2ltokqehudwzbv2dvhqf0auke4krrvadq5nyku9f3m2pag2yuar9exini46t4wo28wjauh8zs1v2m080bvy48zcil6m1f48xfawvlmquqo5gl5xqudtslrp2yhvxtfespsmbzep0uzec7v8n5fslx65zgbduvv7zaa1agka8t4fhfkpr8l0skdjtgqsujeljrwpifw4pzvkz6udgcgf7hmqt58mxmo1m51pe5b44uvf3atm44361rxyujs30xi31mnz7s9k2c0qnuwg820jvq0kr3ozvkm273du7f4qf6oljej6cm75sawjnyz4q6un7fbdzkt03hcaadyuz73rv9l79rqc86vexkr1h9x50fqu0o6i2zh84okcyxhzckni56movecmkx3t9qz1d19sny3q64sjnsul9begpdzuilz30mflelphmqybne74axxaliqy8xs6jqkmviwhi5ccvh73f26ed4j8wtivu6p86cxwg09ftx5qkq0fyzqpsz96orv4kpn228lwcniqueo65h1dksadyb79bl7in9cf66gk8lp0436einsbvdo5lnsf3cu3hyxwmikipt2upsl0a9l5rbhvl02l65dlg9ww79c6dfx2i57jm68fzo80qzpqpxwmk0f8zarydeqsxt980yg7uaxqln2l3bwf',
                fileSchema: 'uue8w0uw7f01us1w0zz77epuja2vwpra04nodaseqas2gz9psixvupyndw43i71e7m3r0swan1cqt94slpg11pu6uul6630abzb2nlhrapovl9q41m7foielbu5v5sgqv3wi8j2yclwwhdvjcd8l8eid1dieh6s3vntsmfym7sx8mhbdi4ft3jpu1gaksck26jnzwi0cpom57f9p7ddysufcsrro9zcgk88r49di0jbb6545wosn2rc2pgvwyle06tnagi6fri3fz22rceikhg2xo8rjg1ih56bs10n5h2hqek20tq80zg39zy1oxvvimdd1ubt1yslgstuaohwqe3riibvgfsb7oswprowobwcjighd8zl2rk4wlmigvo11eeukucrb1nhhuvc8zz2h229vlg9exdurkq58laqfo0h5mvcz8d3ta3djf3h5egem7yq1l50d7w1ht3azjdp0jh5s2c35tgc9lq64qvs8jtkvvalza1guz5mw05ksgk6dr9wrdv03ronycrz8x6kn6x5qvq5m6bmmj4t9881q0cws8jo05apqrhl6srzg7g50oxdzv2s5a684uop3a0gptov3ic8s90pqx8eevldhr0x2v6vakgo5dj5gteuhe2hibtiabd4ivgtq38bpvqy1254qurjho08exzgqzbz5fem9vlm18mwmzhchs8lyj1pa2mh7d11wdrovronbcbo0i8gd4u3qnj7xa1nys7fpb4zx631z3c2pj92zkvp9jkw9ur9nn8pops95n3qqeetslwgpx1wrrg3z9kwhrrk7mdcslcc3edj306pu2hrui5hfxg9bnwax57xkazj311b4hgrmaanqxnvarl01xtfelnay6s8d5d1ewdf8y2xn55qjfte5t7yzetl2hjl0yu0cdug8l26ocp2ihaqq0rnavooi9j1muc0us3xvawrufit08ysfsvb69s6u5l6sv0nrthbloq31x7agxjolcm2gvsveujzxus6asmtoq0yqyp97',
                proxyHost: 'xu4y3y66nxautlws07l9gqc5oe8d026a2a1to7m440sjw7mnu6f95c3b92ez',
                proxyPort: 2365535358,
                destination: 'x8p72o4h39yip2asnxicgxpye6tvu5m0c5z2cnglop9gumnec012mq81c3r38heda4tscrl26mpctsxhl6xu4xywxxyz1cmdujgvzb04wli6ml80mn5zwhnkaai6myzmk6wetgw8b11kvzdg8f730pxsv08i3gtm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k6fc8h73nikihkl0i4mcbzms1nfj0lyfiynvu79rjizyhbubvhwvp44cl90m1wmlpixc78kyqws9d2m27ynx0jx3gl0o4mbubd1yk9qbtqge5sxg7toiplph4tf32s8aqkgrienv6d3q6v6tzzlrik2ssjm9rhev',
                responsibleUserAccountName: '54oiteyoi75v5tdnclb4',
                lastChangeUserAccount: 'kg8cqld4vwxm9b94t7o7',
                lastChangedAt: '2020-07-28 00:08:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'selomhl40ja3ncilg1gf83xmp03klm0dc6cppdamzyqn3h337nx',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'psi6qgiuggcc37j3xp43',
                party: 'ltwkrsx6zd9h3dsxv0jbp4p3fqbukgnbhxmvvhjnb9v9e04z5k3g2xyvs4u1b2otbpa5j5vbbz5effyq41v3c6pkg2i8jz9hgbqr21r12ouasje9hmqrks4yvst2mfxb1fuutadf3nxooegl6a1cozlav1bh2j42',
                component: 'orh8si6bi1aums6yjkfklpwiogm8sa22hm55xk9hm176yim6g8815htbprddf1fdkikkg4tcj27mjxr16bodcsxmhnh5pl24egu1dyhkk1w4vtskazs5krrjv9ud0bgk5t14oa0io05msdb1f5yroewl6xtfuonx',
                name: 'c6ufpiombqy2qecw44047gewm8lc2k0ag9uuo7lk7kwbcfvtva4o8vmwzr2znb4vvs3tav7bl75jo5bndpy1hd2qsc2e1kknrernybg4jc4s6it208zuwkhknpucxwfdp6kfyf7r6o2smjgjra29xypec2qcm4hg',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'bl9mrfm3t73u5gxzbrq04c7am20rm0uywt70ijbv60g7pf3hzgglqy2twh06azwzxi38dj8ficfdss9hjhtmskk4gqjxqo0am8wl2ex6dwu1adivmw9j5z4j0e4kolldeadbng2nbq4rwrp5dtv9gvb4bjszqnzb',
                flowComponent: '1mhrwboycqana5rdyfo6dahw4d7xn83ejnwqwmmkjfjgqdj7d3x7uxdbgy6ieafufy7c7st8bnakqfgsbo6jiwpgiy3wxf6g5wkolil86cxddbkb92a77moj1v77y3zaitx1nhz1mjihjlcmgfh821q4j0b7hthp',
                flowInterfaceName: 'rz7jth4hl5ko81pqkbbmyz16gwhtsrkbxrdnbokkse1gz539m1wa67ccwzp5dv3dg84dtj3pq0g0uyxzx0n638clavy7ddagr4zzw3809eneb7khauadpxlhe897ymk6ij890ufpqbh9x95lb6d15s37m2070wah',
                flowInterfaceNamespace: 'o5dt3iujas1nz2sof35h4cw3u3u261wq8cg8bnk7pz1ematrl69h1xbhvz67m1vp6xwt9otxxwsrsg0cv9wzmccgeekww67ch0upd37esn67uick7lkxqoe4ebycd3u2nvrny5esse1dohzitvu53wwrsuwjbsj4',
                version: '6ise28ysnlanaysr2qsz',
                adapterType: 'lllbidd2uqewn7utrm8mmcxyrr9mp2pliri1n4unc3zjzvxw6kpa1aq1qymm',
                direction: 'RECEIVER',
                transportProtocol: 'ghi8nhrhzadgvg95qzpvd2oanq8n800nv1kdjfsgx7uorok2glixrm4wf6my',
                messageProtocol: 'q5gtqi88pozh2kho8zkxvezapf7bbvhpgpdp8w8dn8mb5nox2ju4tdyqgkwg',
                adapterEngineName: '5i8ku0chm4nuiui8k5cvjgdwltzfq0zt8sybehukcj3evy33yvg22tbjrraelw8lr2ennndj1pnsqitq6e32lsxeocejx4wx6cqipmtc1tcv0hp8nqqquhhcwt3x4k1parzbt720w29jj3d30qjte820d8xze62f',
                url: 'lpx1tyvoaav5fqgomf8phtag1y9rt8ggz3hzcjxrt1x5ii5721wc4qdasveylixlmwrko8jb85gk2ike0zi6v08gndj7bppc828h5klnqyqp0bpbthfrfzounczou96wafbdb2h4gvngzc4nrh4xj9730vqbfz3zfps2omc5a10bnv5r3l1n17jocxc707d6x7w2kk7unbzs6odauv4gxjgyinucctyo9zz63nma54klvfl178nxof2fn5dsrdfkiz5s5zdjctvxjm7rzwmc1alxua7uhozsj3uh0aufk1wfmmq8ftfzypl5yjmhhd6p',
                username: '5hs1zj66jx4uxgblb9hpm2vbkv3qn35ba8z5qdghv67r51ahpse52f7cn81q',
                remoteHost: 'bu9j6cyjongzny0dxypnhxgf7v9c76yxujqupg1h8m5e577lcabwgd0uwx05rii1w73rzwqvwt734wc5shvh6pzmuig1i81906qnzszcbz9b76gfio5u77dff1u8iqiu7vcwp11chaqf01ioqdamw0wmrgsvoa5i',
                remotePort: 7544148914,
                directory: '7192id6q75w3jo1lj2yi4n3l934h5tpildcpvyc6h2doijb6lalqhfyzywpepy9fb2uxlehzd265jl75e4qbpw3p3tc8ahk5spk7y811m6tbm80rjtwki19tvvm08kelf5ruj6fnd2ii8jfca359lm2f7zzdiaonhztyjkq7pqwt4sk1mae0t3r0cy5mh2waxhc1je4gj5k3j804rxrhekxod24h2dlnijlaxxznvxwp4fo6w4y8wo2kp6xie7otcv2ffdro0pdzfdzufcbxudq81cip0bnww00pgtv72ahewnrjbh6rjroid5f11slwlzcbbpud3uc1fb7hk1vwy1kr2ff2qjj2te32s2skvc7jwuw8aymwuze1y35856rvrg8c9t14fkjmrauomqs0ddeq4bu2ubw21xk0hrh2y9yza3ibbtsrp7b8l93kifycdxcn23goffl5vzfu5c3269gjxqru3pxfb8n59knuu6xzqc3nzznc0swf79ovn6s1m7vwchof0fenmh36ormybsu0llolg7ctr125hjwxinvzfggtqspcwemsmiyvz74n6jr8nsgfmd2m86cafz93d1un9fwornpwidrpbd3v7b0d4uhqwt295lpkc9acuchyik8ob1pfpe0vbvyfpbbddwv2gnov2hzwmuzy5nm1ijcmfb5thn6sv389y543kpu6970rpeq2hhx5lvvcu0e5087t1pfjp8kzv3q0ev07p63x64egepcc8wjdw4oh67v6ta9zze9rqt34b10x6fgc9uy07zsdm9e9xk8s5hlvl6yzae3bwow25vbeqxwc5u1hn5l5zjygdibcxnswv045hs5abjdge6eq7fn1wrp4rg868aeijwqqhlvhndyut4sd1vohpq29cjdgdwzm7qb77pj8im0rf8kdid1ri3mwt4ds8wyu5ds4zab8jdrhgof8o361na9i5ce5hpawychbkk9v011r7x45197w9x172lvyw3148ccui3zqldphbbpl',
                fileSchema: '5pgua2au7eb8i8ft10l9ej6uj2dtkfrtrbmtm0s805uuekn2n66fb4rb2shn88aek7ww3pyqy5gr0f88btr8pke9ryinwzp5g8kzcnjlmoa8k9c6foog1rd1p4zt3mctffg13xsjw2el6fxg8ihewgjxkmr0orfw9jgsh6ckrz75ydel2yfnu4xfumvxr1pp7t2atvy5k3alhqcqsl74j8u4b3n38kpwvgy42zdxk7zz2mlqsh2y7jnnc8kczp7st50h5rghhov6n1a10yvvkxeyt71tiroldclmb3r8pm1h6275bcvpbn77ecp3gggf15htb4k0akupxddzvxgdkmbvqq3j68uw4zo94xhefzmadceueviynvfcatze9t6oss0s8p6pv6pfhgeaykm1w5tvlxina6kebx2f0d4pvvjnp7w0ybvtfewn1gqeeh71gfqllglcqzbza4bv6gk2gu61fz0b3u476o7fzzwl5tlorrmzygkf52vhmfl37bwmy402yum4wz45dfq9zde0pqem5pp0bui7fjmi2faq1ok6xbdnvb5tnnrufse8buu16nbxrvdbkgp0zmaqzkpfhmmxw3rupqhwsnr9acofzuvmbvdq3nkxqtfcschpvkpo8kdla8npcw9yvgiw1uyr5zgopc2p8t36ttwx5mmo0k3hbm1yqom8bs7vntj5js9745v8svj75fssenuwpohy2e7d7vlubfa933l6hwvrng1pifzjoa5j74z9kb36h3ev87gp3l8v3fh8jso738ipxl0mkvmpkg3owjq011swp0s04i6ywjd94vda7x15br2wzv6ow7yjev2js35tjqmjsfspt4ef3jthi5sph5wsldnjkdhgwc3zpb6xcl3tyq03jipjqy7g21n4yvy266eqgp6w8ih6u0qajmwvlkfdp2gtkoxgqid32ej9rofgca1jo706fqnki2nfk29jaua8cvze7m942w1hy65ppbxwyloupv8f9eh8cq5nukfi55uc',
                proxyHost: 'lrn26zdwzwtrgqjiwbrmfpzk81duxs9cmj1srlt8s8la2rqmjxaji6xxg3iv',
                proxyPort: 2678306714,
                destination: '5707p17he775sras0ug2v5crnau1j9e4hgwrxqd2tycf6x9ypr5rcazlbuep69prvfzx51ptmmy2g8mhznipg6asyk888eih08vdn4ybk8wheqhbyj5mveg6gg9j5p80i8qf3j442may1xffvkxu5u33qh3sl2fq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rrgiymi19vlg8f5py0f0sll1eae5yyvjenjdj5o53m8mt8cqbez2k3v36s89ph9xxn7pb3jwlsulajyb9zda5bmbtyuh5ct5pemslnvx8q7ys856z1812b969skuetzwhflufrglaz83y4gwg44bu4bheackyrvh',
                responsibleUserAccountName: 'dmrk1jetwzck4ngw8vt1',
                lastChangeUserAccount: 'kc03cvvzsol48f1qn0cw',
                lastChangedAt: '2020-07-27 15:56:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '2qny71e3emggitnd7f3o18gdjkecevxed393sq83615vulrouj',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '528gtna7awtdh1geg0x6s',
                party: 'vgey9ol6c5y79hzuwkblzwxi2hwdsny3jz7b2b1gy6r5ww8avpytxo3sa8eh945babxunl7xzsj0zve7ufwhdvx643t03bisd4brlij1q0jwker1sc3y3qpkfn8yxo8hlm41l81ncwn7h0c4ergmwpyy6eh6ouaa',
                component: 'p5626shvo4hdp0hkctq8vrvr9sx9k3lsxt7pmf43k2dmzemzqqns68vm5n9zl6s4xf8j18pyhnk9olqn2sh0alvn0a2u2flpp84fhelupg7qqmp93iv1aj8qcu1is6r4blc18fyfb6q32i8s7xl4u98bb5pr99yh',
                name: '0o9e66rp5ja2vvdyu0aqczd5vyr6du29urnu19vcgo9zljybbsa8ejkkhi32r9fljsp8yl5dya8yf0tq63bqkqtbu4qpdmuwnltpki065f2b2cncu23swosih7a38ozj8k7bfo7oa0en5s4jul9v66i4ky6gx0m1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'm7ucexxn1yocbr9uw44fe6kg09jz3j1y92n2vvsnk47u1dpkza11yxjeq5j3n7owlx72s7q8x2w7ux56oqkkxla9vf5t7y6avvmb49hef031brohklzr9qvtmvtopc9e20vrymiq1hs0irlm69lx5vfpuphwbvst',
                flowComponent: '8w03ua8qp21wylot5b9ctx8ycdoekckb97bz2r53is987459pz99g40mi3jqnqsj0jrd5btj2e9pydzor65fde0q53ktpq4emleln12fyh66ps02pnwsso1q1xna0usf8kaofy2acu8tvt9hab0cmtmzd1i2go9v',
                flowInterfaceName: 'io6e0buipecpcnaua90sd8ws35xb90fugkrvwjw7is5zbuc7t8h9bu26iyclolyeul4l20ds9fzs3r4835umma8wti8a24m7kmxkfjg5p4lz0t9476mn3wdgrwu8b9wpffkmjx5473ekg3z1emz52z7x9fx6w966',
                flowInterfaceNamespace: 'z5dmxl3ljh8cthxuur6wxflmtzbl0wve9b96nn5b0lqbq034qugwd82m7zk0md12g986if56q8bavk368wtmv2d57nvnb8og5d6ckg7cbg2wd7v3wyha9rx0iqtlcxxqrpg7kd9fwl545d7k9hxlaalr6zbstnbo',
                version: '0ujv051czg6czbig41mm',
                adapterType: 'km8ddnfv7wavp06xo4i05iot6eps4afra3pvb5drpydq48d2iegci833xop3',
                direction: 'SENDER',
                transportProtocol: 'lk6f0w9kzx85kcbj0w5692jy5izlr8cy5om1b0oxiatzffrmjkbfjx6zgzc1',
                messageProtocol: 'vy5c7cpxxl0yv1p5rb2xndp7t5hq0rspipn86gjysmv9adhhggdx1ekhqsc2',
                adapterEngineName: '6qv9nozbs6rfr9fbqzvgdbw5cr3m7dde3mxx4qctw7ac1h6tn2cu4n3oim3r1d64jw8pbnolbj3dz5rztnf9j5hbrwa1uamp9u17m8d7jhha4354ukyxihw642hvhhl3kodhovvsr5l3flkq098pcrso0mbrc6xk',
                url: 'y8l5s2b1zqct6j9irpcqztkkw0mexx3t3lbpe6skcycbppsih9i10uqlzd94jyqlf718gt6r4ekfhayet02bsh1z64dn890jvyt93cj42hugy6egedms6knngp7qvvqxifcd0u1wz3dh0akjh2i9uesdiqe2vayc4261o5g3e6p3yg1s369qtg3hmj8fwn8itlwixfcdlq7ibulnudvdhan3uhugu7d4q6fjvuvtvsula85ntmd2soscmkcym8s52zjspr5kcoypijahzke6h4phad5h99m19bwnfoitf57o6z5bi2o78b8n6t45ahj1',
                username: 'rxphxr0qyxqp0to6cq11gfoub3iqmkdcpark90fa8r7f4p5m564rq0pfo81j',
                remoteHost: 'zxsnk4bvka6fmxj9hpaunnjyfpvb3l240vdw5t3k70xjc8cd1ajvy5b7k6l7arxhmkgpv8bhuos2jwksvvt8ohprftabqbqhdys0pffiypxeblq70v9xhp3cri3hd5t2mozvll7pltvr6s8w84elsq6oawm7re09',
                remotePort: 8308912699,
                directory: 'dwr3659jm7jos1db6yug1hj8utplszxezrr1u1fl6xtjizcjs0ylhz75qj3cug4surdmubau5pzqi6f3fclt7p5e6oklg6xu03y6tmzydu6mfqnl94s178b7yfa14yo1f8r79smvanmsxg7i4nr74g9esl3jeoydhyxwg69ddrl0wrcyxshdgigzzjilkma3qweio317x4kiw8sugsdjqt9priojijyaiwfj6e3qc1kcfovijgfr9ppuyz02dnrj6f2ppzcqh434ti5wmztw9waeaq6z8lpwp61s8wlylifwx877fso1h8ez2319fwcukwoeq5mtv7w43y17vh0tfl6reswf5r5fmbdk33mojudvifzvp37eh9z0dh9x3egkuu7qjuqvx2ivvug0l9t65l1xn7w3uaj8grngjk71ybr08j2ulzgos8s4n1r2567x9yfmx0sswop2i9oy31pg923fmaeteeqxyjjiuic1t037tgv0ysyqe9qbsw598f9xxbbru6wksh1nmcwvn8c25eyeo314ep8zurm1menfrzzliddomiy80fdnfcyxr1c7qaej0reqegjicl6dj944lx7u3lhm9oc2xy5531ccwhuyr72emwxdvg0erfso53e3fbx4va32xb2k34cg8m4ki2v6ghf7ead0fbcawto5gdeagzh2jy0elfy8lxjjivp4xcdptq70o5a70bl4vt3ule40pqy70wb5k5h63iso8vrzyctif7t8q1rqqwddk17yf6sffbbp5966qd46hvm76ihk55axmro45ipey5izwq7z3hp1ciznlde4vfrm8gpi1v1bzpdgddex2hxms0a8ptj09rsb7py82ybgoif740xi04hecntvuml06m523a59qagvo7ai2e75dshgg7cdr5492foi5kwkxgd3obijl730tk7fpp1ekkg7utjx4prpf0xrd1xexszjpre6z1yzm3ti60wtf2uzc04ij2sszbo932i5xjojzan2fwmv0va6',
                fileSchema: '8c4xb8qia22y2v37xkbapynt7i9yf9qpot0ov0gvvsfzkhc4t2d5oe7z460wiyouqtw6oo3ck6scvr4p4c6q49ycdtp3n4afy3z4ga58pmagc4habl205v7ufw1nd49kh1ld0zoka8bfd0f22425xg0dj6oj8wnzdgr63t4qkls99jtsb6npvsk2mq0cxqp5k2c9e9k3glxnafwv9bwez9y9bfzi2uncna05qlokfjlkf6ytjz486wyjb43eroz41rncew23d0d6vw7blnp8fgrw9znfavq9tf9ztqxtqgj56h92efmpmybvea5ufd5ett7p47b2n1sgthkstmzezntdw51fd9xyyg7tjp6xnwx1zo1yc5wpmej605ay8ops9nx923d3ls5c83vxikc71v1mn6b5xpoqw1szxovyqy25mspomi14v3rmmwhxegu9xvp0nudctqbk1qucvptkrnlwqb1hlna1ffkm99uvs2nx8irep88ata3o65d7xvygtgfqcdx95eizhhpehth9rn3udslktavfl1kutecjn7w7o2xon1ntvwwxae5aiux614fsix8q89wtiz1soerftlje1yrxybd3zhjmgtuo6z5b9m8hx1stqghf6mtieaxsq1t22hrhsqd7xoguiswwgyxedbxfwxmf35ijhe0hszt7a2yv67mfdba73tzvod8k1wztd8c2spe6l4gn9soxsc8njhaqyxs6gbo5bj9lptprtptunj6e33mlu5nfjpkodwqf0p8avxexc0ah1glhwhyj5fhvrzclu5nm6uhobj76hqv7xqlz0ftarym3c2fu2g9sm4fmwigbfb2mvqfwu6bxiaefg8rxxnn2t5spa3u8hknxfhqqwezgllbyrvtmmw9g8tyj5z1ypr7mfnkrya8yfxbtbe2dvwiednxsj27st84vk3j1ll7tkso6lnpaq24zvqnsa5heng8y1lwkwluhu8n73mqbzeuw6h1rfpfowdu0ekkzyz1al3c58am0',
                proxyHost: 'mrcgn1anjks39qdclv4jcw0ks9p7womlen9hknnrd1vl9pnf75fplqib9phi',
                proxyPort: 7390630671,
                destination: 'oszwzsl78kwxqvipkiztk1w827wg8b6lk4nl2rvmzcwv57r36ks2zn5uatp05cd2uo3qqqiahhj81bbgcb7e3qj5us1tofpw68c7dev0tem10apd9apeidi7zxaqhs8urc1cmn2m4ai9r06sumf5wuusundf5ocb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dmlrqwdmjjr07ivrr261pd51cafu5yrbsf4o8li735twnm9tkys3jqz8lfrzztf0wvn75rekz9mp3tkp06jlswzmewmqdkeh2nuqys0p0w0knrtbrn3ekpr494vsdn7pbbkq4wwqcbb5wvj30l7v6ukh5btvqsk9',
                responsibleUserAccountName: '170org1e0hulu0khh400',
                lastChangeUserAccount: 'n0wr6cgt7nh01lrmq96z',
                lastChangedAt: '2020-07-27 21:22:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'mqv5apuq9o5herycukn5qux8wnmjllei05k8opnyz497uunodg',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'e874ieilr1x2x0b26swp',
                party: 'o4ct2knzdhrwitvhjw7l98l7i29dgewn9xyaqz4bseua9xhir18el9utyk6satktf1enhabo8btvdng58xbjv7ilaq4uxj8akoscez8cs3i1ai5eq8y0lixbsrfkyy998pjbkwjq3c7ugifttjs18y2tua9ln21x8',
                component: 'ud775lybqy5t568w9g29xa3qmy5eriw8rnrnqtyya7jd7drklfw5874h0ipivniaqemp7wzp5iixb8efreyk2q7ld2zouqh2paq25o8nuply7i3ffx2dxy7zbf3pjq73w296je3j2dn4esc8j6cfse07hy2xpo60',
                name: 'cku87lus8opjwz4cdqtieg73dhj1jdajvttkpz0inwuoa5bqgkbm2dpxd19l44qolzvc0acjxdl942um0vlj4tkt4f6et9svriumgy8ndq31mwl14e465ieoe9voel337d7w5coqfl6uo92i0emsrbk7xy7nk6wy',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'r6v9dnivudpf0r50oh7pknuaa9nhtumsjmd7h2a58ou4fknkfxfz072e6ukbytnk2lxfpnyarbyrul859c555fi0c74ltgucscfmd0gnun1eg7c1lav2002v3ob8br1f0ws0nxstvopa2ar182h58x9doeq1l8qr',
                flowComponent: '3saysv3zkovhyxgdro0dpzyd62852d2d5ot7mja8n7s698s1ib8tx3fehm6n0hg3ytwg6qjayopt7ruhtauup0t6pe8hky022yvbl0yitpipbwyvwcecp1q6zqon0qff1woapsf7m9b8xlms614dxegv10snbq2a',
                flowInterfaceName: 'wiib98whzv4xajq3kyyfhvy8eu4fqu1dkfiwg1dxnhfzg4yav5fkabekxrxzty2iassaumvjq8tny3gt24f2he42fihnsx74tbwnbaci76mxl59aiatj2hx9zl1d85pne4c5cyzk8wtvtnku6goyq5d2npz9u1op',
                flowInterfaceNamespace: '9vivofws07ipx2d80o2q4c5bl2iesa8pvc7gei7xagqivpzgfydo15bh0xowgzpz2xkb22zj7fgfrhcbr5akquqkxauv6do3sqdj89yid180z3tsta80r1dhcydliq6ransguwo4h6tk2icrvanjnlgsw9lazl54',
                version: 'gijcfz3nqkkuoaup3pl6',
                adapterType: '1yt49l38zzdouu5yugdusk8n419nq588eb19cvr4go4tnlr2siel195h6d69',
                direction: 'RECEIVER',
                transportProtocol: '7ktvqavwkg89sts99hlgdk5czzi9pqp17w7dl3p61o6n6yrbgs1cpsvi3u4g',
                messageProtocol: '395pbblctp1argceysdygkmxo14f4v53f3dvra3bkcn7ch1oey7xomd1ohmz',
                adapterEngineName: 'y09wjti6p26pblfgnpcj7cqzedko708hkasalx04ftinasfq3aoccapev57j4wbefuz9m8o5y8o683mvou38r6k0zmjyhb7o6jyrlblmnlb1d3jiqziz482knt5re1h1vqrif9v0psfjz0npa0ns6l4vq8ir8jiz',
                url: 'm8qqlgxmlkhjr1jxwmo6ropjl3egtrpy4kprsh9dtkggauyz360zc92ao37amjw8z877k5sf7wuny04ws93pa7f1wqq889aafv6vk4hrdp200haz177nigo3sr3iwudh2lo9sz4ihu5uo71cflglubqdzobfd5eyggh4l0tviiym2nhptfpawclnlzfzasok3ddauky6upyr0mrrhf81f7f0cq52mmvgeedrvlep32u9zxz1upg2xnj80cplrxgfbmn1gj1vntrzx5upxlon3pn6dti0kdd9e8jnn28xovb8vi0bmh7rpf5ehfd8octe',
                username: 'l2lwb311q08ug6f2nbg00k6nsfx5806ret6ygzmhyd53j2wz8dbzwodw1z75',
                remoteHost: 'qodq85qs46i4t9upnx3w9roimuyi41tjwctpa8dfd2mao4olc4tbg5isthlzcqdax9igm2ijj37x478f2ab9umorajk9rwqj0asoky2a3cl0dz8s307moddir9algxnt33udib2sjee01ljosqighzp0byi9f61c',
                remotePort: 6412656988,
                directory: '95kem1pg1u9a663a7nyq5819qgg6iheoi74a3fimg5fy8br9pffa6jkcsr810eg8yy8zvm3odfyvqeq5ladnqghyk6ptrioz9pa8vqkxcfwjrpnrbadf9rpy1or34wipaezks8poy4axe7aomr1c26ijfgbbqd4v7w1kv9aqf6ni9btbeb9i321xufdgnhjw4n5ygz5yqb3d9fjmzivdtkx1sussl1o1vti28mzyeirujxgrjzxrhl9h65ytjrq4q0bdlftm6we1lwt862zh9b139whs6taz207tjg7z4p611xon496np4v7skqjlp75kw8sg1yy3mhf287ovcwtvojopeuszq60ollxx1cqkk6fpapnu48xr7zwf823ptgq0902cwht4hotqtv65h4jl4cwowfl35j9o7sc77wbri8k2accs8ku91nz8q52h514f3yejirl3xrzoedr56v6bbvpezof1q9hpzyyhgatnz8j0l4p1shd79o6wv7w6qfr5p1uioaodh5m4p6b43njeqa7wr6leidl344ik9xqoxxhblwehb4ogcmn59d65ilxvcfgmblqf58ekxlpdqkvn739sl80bvghui0ac3icvnrp85sund4y4wqshx5rqfdt3l4883h4ah6caiscd9ve87hx20vc98tzbekst47s22hkdxh5742v198oayqwomcrhdm1ix7alwekuotfozmz1kkgzzw22tv7w505z9vhusvjqf56hmencugw71l16s7yyfwgdpq2llbjhxa1s3i0h5ajhlejpf68cf5r9glhpjevamuxovofes8kym2dqm9z9ta63h45up53u6u7orgf1q0ihfc5aa0tf94v2zry3ssu1hnsoqb5f39la3dc5ihvua9z0bj1dm2sruwzht28ww40wpa3kzmaqtpc4unm223kuwnmi0mg5hi9u19s5x07tosvjzqdjld9cptolc987dle30wjpu7689hmnyzcsuglbc6231lh17l29qi200ra',
                fileSchema: 'l715a4quee6o7f4nm30g1b4htv3uqgmxxx86ggnb8v8bxsij2ssy2xt6m1cprl90wlyc9w17gedcwbj99bhzc5zrm5sq9ia3hvracazx90ukdmhg8dsxuqxrbb3t3qna1k7efd9cxv6l5g7zn6nu9s6w0itq4q3b8fu6zx0fxslw0g0f0qfbpv0fa263jfqtj372rws0sm31jx3qneqorl6esfxbjoq99l32kx9s4rspgfp0boi8k24xkquk4bfs51tjvjg8299n2otnijpy5fzjtyhn9ojf64y6yj1yjvwu5hy0vasusbi0bu89qzey6ey2qm7mpolnjpi28cxoyumz2arsxzrlmz03totpyoh0hl5dbnozpd45xrdwhvyqiq6vldr1f5odp6lx0j2x3h1bw1uu6nox1qny0kk2vklhuld6qykymh91jngea9pi5i2hqkrrmojev8g6fpg9hlcss9w0dymvnusdse9hdza667qmhw7e02ih3g7i3i27700m7y7ohvfobmrnhq1mbhe8jcwqj7pcdvdweonw6qeclae9zdbykvos3tk430i6mlremixu7l6anrfw5pwqtrgp1il67zk6du15jtfgrp77f8uw1ktys6i450ydjqraf6dc3kvtbt1a3n7aromdhj33rq7mqpc08jvvujs0zhexf7sxnx4xz63p28jggqisq0093jbx3pb7exyf2q54o5cjwvavxgcwdxy0gkcqffsqr1srwnfboxk35e613tc40qfodzccxim2rhsqt3z95zgqzzls3s6hnfsneov4z5cvqx7f1sigiab3gx8irakz07r2ahhahehz5kzon3sj1qi1o8qc78mn5rz58pob9k4frho7rhi5gukespkwm08bsdim2tx27828286tr0cietnkq15749jpe4j9xgv5t09bk4j1itt91fb8tfyxv4ar5eyalsezwerr5pq5cihubk87bx06muexjwh2tdyaklo4ct03y0rgeal7ol6p19rh',
                proxyHost: '7atxplk6k8em4903iofb6jg116pguo16oq1bdrsjajha2ygjuyavk893hztg',
                proxyPort: 4764602738,
                destination: 'xsfqspc4ppn80yr6ctq557gjmufgfq57f1k4k8h6no4q5prpwsl1ze8dbn67c9bsrg5htw91u2c0de1rcla6lywkh0csc7aipuvag3fx9cum61130fsos7g6cuvw3cp0fbv6qetipwqfr1tgqiboz8q3pv60gf9j',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2dvhqe1vl5gp28ibw2dnzcf2ptadag0b3nbracx99jlsfxthfnoxcoxawg1xn09f23asz30cncr3fx2qlbvpvwpq2139yqpzcqrsjbvcxm9sbggs25rrjs1ycpsu60kx6d00qqawa4wnov1wzpqopsne5tj6r0lh',
                responsibleUserAccountName: 'uws1djvdrslkdpua0dcr',
                lastChangeUserAccount: 'ifhz4lclsu15800kz1fg',
                lastChangedAt: '2020-07-28 05:53:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '4n3ijawo62vtcj4pm30yhelw88uzoygj0xfl05v2z6018iua0f',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ae3j5gg1advz859riu0l',
                party: '3mt3j3xcoeoaa8j2jf8didzjnghst5yf3ohfti7nh2fkb5jw5n5nppwtmrvtnsoodw0rkt4a5cvazszgwbx3sdqig9jq4vwa56ojcz6leqlnllm12vaq85u5v4249ca3ulnpv6yxyu9u9wrx71x5yd9e30wvbq3q',
                component: 'iw5ypr8slgvac8e8o5mvdwx1kfhhdrt0pety8ixwsp3eueftj4dlcfxagqm6zzg8iyfvv19l6czem6kdmxhlbo5dgvjfcb6m8g4q7ch108osy0d5hzc0dm8jd3snr55rpd82l9enoeeuqsfyqpm68n9o8ke232dlo',
                name: 'urm97ya9iv7iomjht6fhyye78m5ii4wlqj0gf08vz72xv4buv6750dxb1pmv860jnn854a6eigyng4lwz75q8qftc8ubx8zwubxu63p5jlefqxs9u3w3t4kl97cpm0ltm2mp0s662az46fxyap4jp5zkmaggmh00',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'ynigd6pio8kbb9pttiz9g5pfdzdkpop1sgjvcncpdvfkqowrao3rmmarl6ibwfbt181pw2dusoo3zb5l8008c4n5qp68w7xomy3tym8ysvabcaeaavldtijc3w27spfzpm0snp7tinv5ia8s3pbuzq99k3mo0o33',
                flowComponent: 'qol2ay9xx5xvl4g3ie10g0teocfmsd6y01vs71lf62r493d9h8356l1rqz37yw68x9w25k0dmkz90mpolulzkfc16i660hk73g7413amz9m4ur7tjys6a3bhy7rmbz8anhk9sy47e8op60zslixwwp01nkc8q2h6',
                flowInterfaceName: 'pgsssjt34m2w5ecjlv10ovdin63x0t10dabwd3gkeqzesdyhf73twpq9ewbhb84mzeh6wkgy96yz2wyeq8cmb933ui2pxjdzyu3b0h6oxr9a59smujul9fpcv0lh5eaejda88x8eq40qmmw0dmbpeusvnlvtqqf8',
                flowInterfaceNamespace: 'n0xs1ubu2pslhglhgre03mtnfcuhzo6qq8j7clppp73dqsn7ne6to1wybp9ebd6sui4ziwat154gnpeisngtiynubkqr1gebagh280ilh2wrs4df3in6xr13zfmng7rlkcj3yk38za06cmmrz87raz735ucwdj88',
                version: 'er4dg2x4kb7ybsojgz8g',
                adapterType: '9y76fi62bh2yn56230mxd3vom21xr6s1113bvuy2fiznjj62t7ohby74xa2w',
                direction: 'SENDER',
                transportProtocol: 'bs3kwmipsrxjsn1yhgho4qp6achv7kp9ip6c9f9pnwrqh16cjsdagbyvyko1',
                messageProtocol: 'chikiuqvdf1x84tyhgvxlwywv443v4pjc2o3bchhgd2rga81weokh3clz7w7',
                adapterEngineName: 'ynvfntzc4vl0l23ri7ghtuvzdbk536pi6pdmdrru4wtvciyy0yl1mj39zu576u3vb17iyq356lq420kvvmsuhr5zspxhxnq9burl52c7apl2a4cykckjeg5d121qb4ft4a9jlpw058negyjblu2408rr9ynugit1',
                url: 'q8n73nq3b47iotg971incyrv49hz2m8zdyvtn3pudmecj6ulluyf1pfz1enkf4qzo54w7iooh1iuivd1cbgx5yilrkqslwg6563m5yqkgvwovxmt63taogy00z70mr2ia96qm01praqdgxwd7rku2rw9wspcz98zb6a3nn17twcn6sb1k5d7w0qzhol5xb25690e2x68c1id4xc2e9tcmz9z38lv7biiucdpv3acbpk7dnhh9tgoddptqncd0bp1xkpzf7zv4fvksgbkrwilvimzry5mdtvegw5zb8z5ntf3eyjkzqbexf2q81e0cwe1',
                username: '9my63hv4920ivi6s6xc70gk1dvblg00nhp9nvel77f5r9ywt07g5znujy8l9',
                remoteHost: 'xlj713j26uc9aussj8c6bbzpaybyffyakytitcdrswmhelj90zgabdtpohctvbcri30sw1ywhhsd5m82in3va6bmw6wv13wgyomx1i6tetgbre32ho642s5iho8xo4ld1urjkp9ovdwnlghb6cw6c24mdvof3kwm',
                remotePort: 6942429926,
                directory: '44tt3tkvubzbe0wilfk8x7cfqz7x2lepp7y8c3nelt8ag2uqnobxwu9xkxt2851pnojt6y73v1lptti12j5ns27v07a639xg00igqful2irmr8p59tj3i5yleyjyg3qeyimbfgla74oio9542m2ui1cir93tdm0rmcymt6bjk5daucr4dymgfb90hqa0z6ezvo5xlh9ix6pmhljru9wilew5aba1gyi2tfjp6vtstsyl2s5jzhg0179budth9upsrtltlqzttkap4ftax48l4pmj5p6j6gl1t6l7841438lpb45dl8swuyoswel19idr1an9f6c379cykj27rwkz8o53pdseopj3hi5kf2bwzv9zd5r7gwsdlbww4wpddc42k1ybuef9b31sv6pu3m1cly06035b7aovib3y3c84fc3sxnasvbazpbf675h2suvxu5vmgwmpcl6ra089aowqd4wzfh8g7a1g2khzxhmrbme486m22yi3p55kgax2shdm0l0nmtlxhxhifu5xw7obhxl8fizkz8l1oo0rtikaoq9anuuwcxrq576jlgwomuh78kohnwsdqfj32y4ypaopoic85nngu8wbrbxqympsh6js65vzajg2a6eqh0sovc4chrr8ym5emvfjr87k5jkk8o0e2obxyi5a6zepkbx8d1dhs48jvwgv842jkyc593rvvfd4h1yhik42lidcfn1lxgy7961bkjkwa9y9ycummlzxfm5523636bckn508vew3tqghx24x900jy9k1ypvzidm5e1gtjicnh2dcwpeglxdu573v980z2napxg9bswpee4fnry4lic0pb77d6ecnl64guba19xm2xzco1jfnldgwkgbn23rm2ej2fx6vmmjnhff7cwu3d20lz1dlnx6j74b3y8mwafpt1rutmcagqahf0ggkwf2748355dpiyi3690mbd6izpt5mozu12pbgmhyiffscl5gbecf9yvrrc9o7selel11vx2tkgoc67nql',
                fileSchema: '9d0s52pc8qejmqn15ryevxh64wh2c4p425579nk01d7p3hxiaoyodnxjxt5anna65rjg5jv177sbvi3kd6r1q1mx4e04lqco4l61uwabbhvo2ia68cv2zwi56s2oaahk5z664o3w7l1byluvelalsyqvg9z9mmgby7idyd1gpaaims629pvge6kunp7bv008kayuzlccwq1lmmn9mxyms921cizegp4jzzxtmu0b4c4mx0r6bjsn8zq08mpktha3htpgewjl2f4dpolcuwve8mixv8g5z5ro2rlc8mwvo9w3dn5dc7k78n0qe2nou8xrn3a3kol2jgrfl2ne1j4opp02fsutk80ai1o6bylq9h57z9v74r73y655psyzigeryeka2gskj8fh20hu9hk2z36zgs74treud2rloy0688ybfue59vrzeci4t9invfe1gqz9yykprg9fsxfew6ypesn2s7q4u3eyrv4gkfprgrld1dht1j7wjubdxy5asjfaq1s5gr1u6rek3in03pdkjuo1m5l03l183yqzi39ts3ooovztcpixlv5lr8ryhp8h7n04sxcetsnx49lpj9g3g75oadlu0l646yhr7p3pxbee84tks8xyq66u3kah4ipttwgcsenx4ucgqcy6zwhrel92tom3yrdekjko38rthqd2yo1zbrtoqxrk3aqmxk9rl2nw5w86e0yjex3uqxrud2ymqaeqcmim3a4jngc183nsbvbeffdg8bul16lia5a3zafqxncgf7v3s1w1qv9tglafpccn7e8q37oqdhjsz0zti63u3hp9x4rbz8zm54lgm1h15j4yq72le6ac39zlsf5lbkpg2okw6cvb4emjwuqrz90nta1d2py0yz79gks2sef69q8adcwd6hbbcxbeexsisc5uhajbgfyqg9ml4t3549q1ri912hi9dxxe1advw133ml36vffakgxblf2z1g928zlnn64xeh335ubm0tg4g43vhe4j8n4rh4lknpqp',
                proxyHost: '724qai6qpv0fovof0y5s3loapecv01y8y24ixq64wxp0i1gd0c75giflz5p2',
                proxyPort: 7859395453,
                destination: '00qvenfw49azp59hcivihtey9m5f9l0z70jwrizyqb68al5lwstgecimwh6lddfajn0ncmzbhcqymimfoxq6jfrk07evxjs1pbul8jo68fof671t2dgl420n85h881lx1nwa0pieimtxctpm1lt3l04fph2m0zmh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tuaz3e5rkkwgc72zz277tkxp3c0bh1r5t5u3vw8tdzz55u1crl8atsc0fqyfe8k9rqnp6wjj3yepa3l8z9br6ub4at5mb0ovvjvs5aqcjwb3awj3hj38vmwg7k88olfj94oa23r7n2ybtw9kxtd8qgoaitcw03e5',
                responsibleUserAccountName: 'j5yzn33t0zlav8e4mhs5',
                lastChangeUserAccount: 'f1n3zfvgyi1sgzzo5bry',
                lastChangedAt: '2020-07-27 23:18:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'jv0ppeh669wd0a1yey1r0al1a9jwnfy6zxy21ekiyw5at5en8n',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'am542v883d00d83f0beg',
                party: 'ddo79rug5mnf0m3kkilo7gsfkp3z8g1e0d6nzh1vl6zufnyg0ctmnl8stlg1e3matgo73qw1bdspe4rswfh0ivecm19f162otv9itzfttjuwhuzr6ziujzjk9hjluzr7juipkgpkhnn41ekv1ssnk3w7icii87sf',
                component: 'kadzfssyqwmkm8nrwxx5b5lxq5i7riwrzw08s5a69q5o3dojatz02miiufcw25ctot8qtfkpwwyiln0vgd9msrhkzr2gk4lzkxsdjxufuzizn9iqgk3151ugye7iehzo0wzidx5302d3ov7iqwv4gygu6rl49233',
                name: 'rqz969jdrkf26b6qq896dufwht779q7i39kx9rbu8hctpg8loyhj2ail5ogjegrzxo7bv6y42g1v8eixkzs7sbqdecezjrr56i2jnpqungkda3ml9789vlqnpwezkin8o7kwjmkgle7r8z3bn3byk0exmpwy20f7p',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'p1pvyvtxdcf7nlnq4oth9412kq2tt5c2f2hh3a3a3ekmdm4rg768ff9kemaklwp0v1kclbcwhb7ijwupghbl8apfqgvz4y0ib7v4l3piog5gk3vl15xm8k2w7zeradpbl1gku0s524jjxc7nec6hxd5w7iyire2m',
                flowComponent: 'xf9fp7cpyc94en5zjyodb4o4nt2ktiy08hpd15rzjef0vuahbi0x37789x3w06p4spczrnqgfrrbbe7641mk1me2enpfuxfaoqu03jbtd80abo9o0a7gclkdmloyt3nfikochylrevnfte6a0fu9zo8u3ewfibj4',
                flowInterfaceName: 'aahq4pfpcej1rcj27t2sogxldtim3mrtdbuwcto417g6zsbeq58h9tri86d7fcu5aq354mj7i8rm5wtlb7mvn3ga3rek7wsb7pe8m4ksm09k80qzdow8h3266o70fy6ae9opivbeutecyqvsw45lst2g9ygal44z',
                flowInterfaceNamespace: '97rcu6mh7nerh2blpiygygofz167xgv6rhl07wmwx3htytnim7y7b8q54ana3qqhijwi47t77080o7mf6g371tjm5ilf7mz8fbtaj6umnp4nyijm679hbtpoe4ljjt2h5vco3k1mgrogxg3gxip4sw38rw1gmeir',
                version: '09ckt0lj0tqwqmxczpxp',
                adapterType: 'v4lwxm7zr2rqfib8wcz5itcst26qp9gf9oscc72bdqf122clx88cpwxoihgt',
                direction: 'SENDER',
                transportProtocol: 'eq2n8mlvnnspxan5l98mzdz4l3motfk7tjzlchl91t06ca77feh0685lixnr',
                messageProtocol: 'u9dsiw3nwcbkys3yyej27pzqee4vux18t5cw2wwh7w6xnq2xt6vd9ellslgw',
                adapterEngineName: 'vsz1s6ucbl4xyagddpo6jnlu0o85zvs35k7yeoomsgtqtaax1y30du75jnpy4sm4c4rb412fddm1gvqlrhdod0c5mcxznc612xp6an1uu3xp78vwvl9bqor7hixq0ikd5e8ut7oifvbkb4ov25eee29o62oquvsh',
                url: 'i4g5zcdx99kufex9zpavosz11qlyvc2pabbolq97z2rp38sbzkd9ijgzjehlrv6sjxocsno7zoqsi9am72g5wlthp14nvo6qxq15punrr3mcyk67yongh4b46tltp0r260wsu49tf8khe3357jbb8e4gjf75yu17j3h5270lfp24c9gojl7rvb6r83229ahwxg69nda2wd34k65bzo926yrvw5mecqlcahwzqvd4ty7jywcwjhvkrf9kiw04drhq9r0mwk3ezys3gzsqicdzicserj90t4ziq3k2rvt3bnp1wo6h3fjediqf9og9b7xp',
                username: 'fun1lmgcf0r9chonpenp7jd9esl5i3bpwqiinanesrnu0wf21mu85ngc9s5k',
                remoteHost: 'fclg0149qpve4g8ray1yu21bgncxm2qrn3rx1t9mg6ssw673pct0hkf6te0fyhllci31jj0ipmskks0ttxblbqg1a36tan7nbn2ogchkdiu99lepduu7c9k2tnizwds2wz831te4har5gpxx4hxg8xwu4plr1nes',
                remotePort: 8470913184,
                directory: 'fkdjruq19pqdjaidktaa1xh297l82945bev5ol5ucu7vdg1rv4o5mz7tla1sqh1u9ksopuj4kxmhnbvl34tzls5zarz8wjajs6rbgs228i0ae70g7lhmj3vwrhdywjxjefd5fbnatt49uz6uoqcnqdeqro9ik0ucrv02ygs16q3i626rhbdx1y6tnhvk3d2fyyloznvkwv6q6t1szd6sd8fjyeyxeekiye3wf5u0glb6tisq3rx2a349fo1y2cf17k7vxy22hp2jc97qkw7wqilkkqwd0anj0c2yddcpy0bi99raywwlkc0aa6ow41ij9dovyz9qlzwzqnxyf63z9pxiclm73bf62303g6qv5vaeqjdu71iasrmvijsx1ir02w3w4ixp4rwkvx9595cinj53fkwoqph62imggd1f25xsl39xj9obbjo75lfem8repmhmmmtxw5csd930mngneht73oml9xw8djzmmzaskqg3bu5x6geykp67zz61jnz2vsz89k8f6i1stgkw0viu9d44ki85u2wdw39gm3otbao2aegswdimizw5pcipptpnkiu0mlps7jz0dmcfsiyimbfzkdlzdfa38ideviax90081avhbcx4st2rdjyj5r647wp41oldxggdyky7eny8neld8k2sgtu069o4afhip27k2jb1r2itr0fvat7flnd95ytm8q3bsq0boj0ptnkm2ms2rp1aamujlks2ll8chv7n6pjp621bu4kbqi9yrsa9z63exozaccp419ob1b530e5pyphzsy2pllzc2npdx1rlccim5p7sbsk8yxbcwfqemamivrx7eutg47r5hc1fnssw69k4rm4c203qn0268mum4k4ewwksagairfvhmoqlagw02fb3cxc4ecr11qg9unkfh9r0jvip2wradaaqbm5msk4sgtmj4oeuyjegff5hlyfcpphbu93ilmao95l51w40n0hg6tzvydmcob37ddgqws36oc3wezyoil06p0nb',
                fileSchema: 'tvrcvvfit0s4w1ng0n966ztoaalkxz2pntzypes9y5lzi8fdzebcjxuuvp9i6v6690le4pptaq7xo1nrmpdysvnxtxv9xmikxtbxtpmzp8ph5851r2bm2cw9yy5sn4721v6xcmewcz4wfz0g3vptuu3cdg1n7yntn7stzwfeai55lxsdbw9wdbzjw5csd389115sb39ssxykju9nfuhrunx2d7ntq0rwj63tc90625fyz30sxaihoftr0mwzx119458apxf78rt8yu8aen8138td246jivgvsxfvu19b8hnwq1yktfvb7dcvxp791vh0bt2vhuhq7sgmw08sof1h8x3evqf8i48zyuyrqk6q9712bg9xwn1u3xffvb9hoy0u8qizw4phyygh25u0bb8ogqupx41c7rtlrmw2vvuf0dv4007n6ufi1ybvahviero6z01xxhz8k5k6n8xbtjil9ikjtp2t8og6eji09cfrpqk7lx03ib7nm8ftquakuopmqq9iyz6nx0yjfn1qgm9prpgitmmoumjomk16oaklqzj1qg5auk2czo9qj8mwyarkjujfymyi71rcvmx70xvlhmeqt9neh03ynymxmxnxuqpq8a3ljffot5rh45ztourswloeveslmpueylcuccf3l2c21boae8nkpa70i1a32rbwm2445juue0h9yiguu9fvaqz4ol6m6pcnlm853db4yod44l9ceebxoyhjb31nujyd4tvm30kmoswh2g9gywp0ddfc4pbg2926pnkhel2ai8e6n3y2iv5zkqykl6pd6hqnh56k1gdrr8alg9ooibfvmvgh06oqn7t6o89z19x41odwfcmm08ephfdhaxlvt9r1hjxz8zgalva6yzor6ylr4nitpoyzfm56k4s6iywjy86mtv37wuz299i087g7ui33priucn906bjyoxft7d4d6s911j5yyuti8nlwalgpe0946rljjzf5z1989b6m0qgt0dqya713t114x87jitze',
                proxyHost: 'f94dm9lbiefb7e4q8tv6f2rbidw1x2e3j3ds3wq0gzojs0n562rzpj4vdo4p',
                proxyPort: 8967269469,
                destination: 'nkqqukme4ds112a1o1z1tyoqt1jfefxn3g1dy6k617kp9732xeloe92vll8cdymejlo95yeou53mfk4q67mcmuro6h8wheyojpmw9r1e8szvu2081ia8vkg2phim8sy91jmsxzmxph7e4lhhzii7qz1g1e3fr94n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4oorithz4eyvodysvgl3laxk3yf1dqq3vp6xkom910k2qiv1iad0iytx7rb0ajs9rlnbhsjiscc05b5cgjerke1eqm5vyavrtfl9sdniaxsx4l2796k98l5lnhkezea6axmy2pg8goq1isue5xrbgw6gsfn4u4gc',
                responsibleUserAccountName: '0sdehwauxxhkq5ecjh49',
                lastChangeUserAccount: 'jge6j6do52yq9o6n1js5',
                lastChangedAt: '2020-07-28 07:21:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vk3sf5nhg5mblgk27cu14fhk7ojqt6d794melel3of4bo70kkz',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '1o55nu0epav1k87trqu2',
                party: 'k1tz1xgg8cczeuriiymdyxsc0zv5d7f75ts3lol35xblkjhvhvlgqdn5dsdh6je9l0kgyer51sqlea5qnejkfpz2edx7iffbryx1vhi3v2xtskj6erdpna51g4wjrq4xa1n9xewsfc01r61q2uw043xpfn6x01uu',
                component: 'u70lfdvf58az9je5ymlv6tzotz37vxkjeg4unqws5dzwotsfm5kgdd05987s2swey8s4j8cdcilo2n0y2q8200cs20gnyc3u72ll57ntf16iuueuz3huv22ma823m2u6hvgsilt2n6pud8cff9tfv9577f52d7yd',
                name: 'tks413exrj0ecp6v6ooqfgp14tegobj4qoneiweyz80t9zgv25bz4npbidpo47lw8pro2f7g0m9007prq4tac1r8y4emm1xkndxgey7iwn95pr7ltvlmr2kb5s4eniwrbqi5czdi4vit44w9z7shzjw9dtfz1ibe',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'b2kpbqqx92ciugi60bq3og0sfutpe5c7ox24i94cnzj27d3y4zooty1e8or54o947cny2zljvl6mvhzn2lcwuhplxlfjhf1de2f0czkam7guodnsrayq57nza3zgvi0c7wypx2w7u70930o14fx0fqhkkkyfouwub',
                flowComponent: 'p2yjgy1onxb55b47uicgyhie788rpbfzxcgcj0m3cyiggspv28kb7ostmfvn1tiusx9qphkpwkdpz8ylujp8o9v7m4je0hv6m9egn07qlotuzzr8wn7hs1ogxybdk3zkyaqizqb48t39qde3wje31k3bwiih10xc',
                flowInterfaceName: 'eohb701zdimbu45mpjaszmxcaewkwrxzpnzd4z94yxo0toeg5s1exfuo9c1xk3ln803t2xpx9g6a3ry9kff3fzt0pr7x5f6s50l0rizaa7ra499ell5w6al5ixo9iedkir766ekn5zbs8mwmb2o7tajuwlor5eqs',
                flowInterfaceNamespace: '3fye6mb87b381edortssz1rchsz7sjckyc4skihgkw3qwi3v6c4r3orxy281tbgxcgaoeyw42of5ge0izr0iqu1ighj6mlcqfh26xw9dx24loxkx4eg6nc0pg1l742z3nff3p5q3unvfuzlwlduv9poan5lymb8z',
                version: '81ckxc1qquqqa7p6w6ir',
                adapterType: 'vbd2ozv9q8h1ca1qw6hju4vcizkb0eqdacuk6zif8t6pnakcvr52g0uk8r1g',
                direction: 'RECEIVER',
                transportProtocol: 'h10v2zz2ph47xmd614r6i5lm7jvfkpiikbxm721p0git32nj45471vgrf96h',
                messageProtocol: '0vs3yxl70rq4752pvfapiza41eoyy7a72p663wtwnxs5q767twj07g5f72vx',
                adapterEngineName: 'rmv8ylu3jz03lamwqk764vcv3pfhdc2gp5mngcozsrzjfk9xkc058qjc49iyb1nwgnkj351bdd774mcfb3e10hkzxjm3y6w1mjkmyiplynm8ojldqt1bagzloi27hvsvcsbjwbvlybgkbdwtl5dt77nshcrz19gb',
                url: 'j3sjuvf2nr2ymiqqhrgekal1p53331je1azha4cn11ac03wedkw0nfgz35omrrgdffu2q1vzrptm11c4fwj18dtewtjx3ct5dl4tzirehgn5uycenl5v8boc8gm29yc0rkh5ygf0054n9ndvx5gdad0ndygw27uwqf8plucp96houz87ioscdsjhw2jwoj2vg87pgknw0hjjh7ai293gyevrd10463vueqsg057c8l2xcan08qs1754lupqfi3hi1qke3dgjjnzm6rinf2nk1dnubeyl1enwgjauq8t32claxsw6lb0v4y0y88fbbfc8',
                username: '75tv0nrvqhr98ej125w780tllj775urywq8ybgks0g3pqqjvbgxd69l3d4op',
                remoteHost: 'l88kho2uah0pdqmqwlw7qotyn0edhbfhongvdcdb8jqs76hmki8vbfqkz78ioum4l22o076mh7dcdnejxy9yao4its7fyhccm9uuuhumdk8u1gakzgde3t4noyh5sdr59kui13nrxfunznmine4x72j6hydlifws',
                remotePort: 2126916998,
                directory: 'meb24lbj3n9vzfdh30suop2erozou38f5dotsvf42ur36ymfku6kqzyhnf9ms3zwxrcufk0gqsyk5r26j7pjfhqhsxs68tfj4drwzngpwssig8pfmqm2ltptz2z9w60kmwdsxgom3ysd19tftzyg5796pjwfp2cy8rv5hugr9v61x44qjy1udlaiw4gzx8gaj69vvv0a5r18h7c9cxs4hmpw7eyw7p50agowf1768jz8jd8z5j2d4rypmrz6uy5m5vrax5omo8bbidsrsm9wvmyc5nzikk7d4vq6qqf3tw7j9uumbyzlkp1c4p7rxzgtmy7hamwhwwjru9ij6cjtqwe52aovnujay5pghiz5mea7z19u5amcaxw4bldpvrmflamxaokyheaaaqp47br6atx95ib0xw1zpxi3nac5uwqlggj2ajfo915gsbr6kdvnis4h3l0ukxpzqvl6qahuerexbyuxf14hv830g1g1vxuijb060okfaxazxovsv6w7m2i6xin97lf6wlypo5cmlzxwo1fhzwo6eavrx780mfajo495oglm6p986ckg7xvztj0a51uhqr96bzu10ql577oqsqo4c7ct682a9cw75u8y6i7tuekkov1o1uoglwnzkpn64cc46fp6k8acpta8qfqvtboubsl66mjqcte9kosggg7bdyc8py6v4n809odubqgkrnnqe3x1gkach92anghpbsqis7ouwouol70iqju2ekslb8alxnr8wlmhm0kosuo3egi89bgfozb9588bgnf3o1m7zbwc0007vhcnt5am4t3zm4nmd8vroyfdwqjmgbzm2nj3iod9zzdp3b66mx0slm671122uvkb4rdylb9qb5rxkfwwm028d1qgke5ll9xxlrvsz0etkt8pnfja2zcfb3uxc5a9918isidp3x56c97wja0rklzggkspg7tw01dx8al11nacd2p12uqc75bj10mjcfpw04k7glbg1lidw26hv3ol7grrm1kbfzm7',
                fileSchema: 'czdwekivm2jewbaotvbftxh5hwoncz0sy0y2afxfa97ca3msxnn8vpq4a2n3o65widzu4pd6a7img8l67xudjlgx5rt2rxkazkrmx0wz0w5mokoohhwpftqz63m0pinkdw8mt8y0qvv0aw11tstqndujlwzpjeez7wxzpgv2iy41gucfhdn1iq0cjk3wmmriyezh2r128j09aats26sjpj8pi00dh6mx047r8i3hfog3avdvwgnup73cgrsoln7cwippysrlukwomai72spfoa1yrf96rjtjmizi9vp72l1jdmwgbohtgujjvtwinaj1zvo3i962r2vb3pwdos4854duk00acbld261yz0rm00w4cvkxsqcofledv02jn6ifs1e499f6felohctwuc6kiq18xt6narrftiiy848x6hif5lup0502pbxfzlpg3h2teqvojhbwjin1dwwj6rtzqnql1ixszz8intfa14ebnsh433yreenkp35ih8aus8s73ghypz3f2pq2hv956os4z1xzr3bogbv2rdwmipfedejrckusk2jsuk8v35tmb7rw7394nx54xb2q3t8y2go77g8kzfsu5tnhiudptk4p9cbq50tyl9noyn9h5ri8sc4eb3mg5aa9u30tz2fp0l8aurig1z6fq2hxkw7w5rqs9ad52lygkooctxq8vbxxi9k0u7xti73ie0qnhxej82n1bm57sfygi2h45227fjecqedumyybi79fld1ustykpr0hg4el7fgnv44lsti1tctj5lnqfqo9u2hs3ud5ust04ryzsf9mtnclrq72zx153lobznb2tukieonvvzzfmghg0jewbnoeamtt808kbr83tm67ovt962c6hjdspv2gftc9tyqdrlrzffnth35a0vfctqgxzuzfb73pwlzczv6ipkxdmptp6upuxf9sptw8afpb1chk1qohrkptxzvicctfobxrelxexkth48hsmglss8q1qeftci3g7qyebxlqv7qs',
                proxyHost: '7m8plpgwdo4ejnspkx5gnj748ryqxaelsjvjzdj7w1e33u8ys0c6x5zsoixk',
                proxyPort: 2402647353,
                destination: 'dakh8xo5duowuyh6dxobt2bllmrrkzwoy3p4bgwxhbc11fj52i0s2zhw0awkkf2ttwnvgvzfqxbuelr389qz7qn7mkt5mavxkiy46mc4r7hn8azwl3cxh9g12l1in9qjw1j5dk5453yiwdfj8mnh2kxpjmtog73j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tggfnf14sne9tpikougfigtlnhv9b314h704jzq4xq32agbft8740v923d2ybwcxdeajteweolysvca6yd9x4dvt0ikeiarufrbhp1hwi1a9fakj7zqmzuetph9kk30dtbc5sqkacqbhsuklee6dkc81d85lb9se',
                responsibleUserAccountName: 'e2pkes5b2ubjs13verjd',
                lastChangeUserAccount: '3b8gk2l8hgrwct0mltio',
                lastChangedAt: '2020-07-28 03:32:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'wa0o5q0nztd58x58ar4378g9t14ynx14doyatcu2x6wuly3jvk',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'fm7xvm75ebprz5oig4zk',
                party: 'cfu00ysmi0h4x024s5exdqemv32cm4nswiswq6rbsjxq3owstzn3kx5xx666nb1iitreuy1u6rjmv5g7tziyuzw8hllyigb7pm2cbaalgs5niyp6hed54p6se5hkeai47tryqkmfc9jxqwzqyauit1hg0ln0gzbx',
                component: 'tlmiampm1nw7drdpjthz84re01zk0avjdl5xibqxzz5hlydak1956x8s3q9r5u241klajtw20z4uqu28e7d56nvny3h1ao99m991h9gxkkf8sfr3f4gmmdhj1h91w2i28uw0dlcrmtw8u8qttnptv58tedtoaxlr',
                name: 'd8sgf2l765zuzi5b73t6jd83978l370sqrpf5so4gju2jufnkmrglb8to550pl0kzubegmktrzs2aybds3dl9b3wxf667un7iav42ri17n7yf8bb8bclu3p4p87evqolo4t301d50xyu29orl1vtz9bsdpc4n77n',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'h2v2jyi4clo25oh1512xbdk8n2sbdsqz998kph19yva5z233e1qhtnmryxwzu28z6tpa0b39eal1dr5yl7p6sl4tfq9t42xu6wuwvfyorc8nsc1nhd5xtb1h8q8ue1anb47odwni2qk1okujypvg53osc1jkvoq1',
                flowComponent: 'acbwlt4zqcnf6xurpzeglthf0dqr0wdo56km5z5qo8n4gd5le9kg1qtr1vpja4rvguom4hjazk7mdngnu7azetqnmv19p8ss584wfnu9dioqxl5zi5cab0rifesae0j5idbnhkcg3huwyriinkqgyq3a2zdg7iwb6',
                flowInterfaceName: 'hgf7x73b7spj3xrz7h2yl2lcpay6kgjj82fbgm6xxc4gjsc6gyqup7qkk87kl2jckh6cy5gw5ef46fk47p79mr6j2qm67rdcm1iuc019dcn0ql076vvw4s7jasm06h6m3aamq80av5y8j0gx6w6ky0ghhqxshqnf',
                flowInterfaceNamespace: 'buz96xgigvpvu6k1ighj5kvceoutanklvtjzkphiv47t50gh3dotsi5zlcy8gp1wdxg1cpqwp4yawyqpjxtnoebmec0jmxgsrr1gn9kbgz3ybzyp9j7e6141l13o52dov22gs8oq24x1dbobjt20zvenkdrbk7a7',
                version: 'wbdvtxbjan39acpobphh',
                adapterType: '732ibfzz7zh493vm8c9wsfaflvixnmkjr6ky6fr8jetcoxkdn71mm47o76db',
                direction: 'RECEIVER',
                transportProtocol: '46utygcn95snqd8u21bcofgv6p5zi8hsdue8gru6imuwn2yyi1roz2w6xtpn',
                messageProtocol: 'da9t77dgt4sl8fev9pxvhgxf3p36xklew33nmuvaqpa2sca9t9lfrajszl0r',
                adapterEngineName: 'cnsdkpvwjw6h2dz3beinr2eg68dwn6u4puowzmeofqsotligk8rggqi2udp3cxbmerp4upzprl7q1gnrohxqvhmu53ijzttkxjq62flofajfz1dkokodkdx2ox6byszr3cou1vnk4oln48ih5nt2qn5ra817zhi3',
                url: 'ba6t0qichn22sfqs8sutg661xx8t1af10kqxaspcb0m34okopquu53k61lp7b27dqh8fu1zb6j2ujr5vgbkddws9v8nibi0mlja9be9bfvl0rd29gds68u6g4cmknyj9ypzt6gan8n97u13ic6x4omktr7jpdhvzx6hjxxczhzdbnfh3t2ojpogu6k0jssfh6q8pfn0zcri574ya4emgk282f9c5jzfbkdrufe005d0o75oktndn8p31rn5pfmx6vwjrs1w254cinsojxf0mjkg0gfq2vczdo8kd3gwiejg7utus96gdlsrd3ztwjtsm',
                username: 'yqlyd7lc4ap8nk47r1788ujpi4x0yhbsf1uul8zj0xgapfxd00irksakq5jk',
                remoteHost: 'n4cfrulrzr8nhe5xe7so5onaxd9n66my3ioz3r542toofemo5hfppstq1otnqi1ndlok5o2te56ich5c934rdsm9pfva3aggt3fgup12xdybz216bpli2qrdacixu1ltngkimbjbjm4g3w8sfzqay93pbxbtg6j4',
                remotePort: 1120869060,
                directory: 'jicrcsdcqzfoa7f2kemuq0ez54xqm6a33agus6bek05abdc8ppmi8qphrr0yjdrz81ynddumicvzgwjgzwvnozdofo1vstu9qm0femmk4ad4dqfbxt4nc3ggb7jfgy3so5c257v4p08vn51gmq9a2pjuj335izxw2zzirhh1pjnap19uitjhpe852hva545i3o3lqdidwr7hytos3zpdqn4umtkbt5omsru4o5qsyatordyh9dpoo9gssu642n2lm4eqmovz9smetfz32o8k8lf2qt6j4297h0ex5zs0wsniwtvdx2j6vjb476qqzm15ylhiippby59lz11r47vcys6xhxastbxb316igep4obfwqsax81sd4sd3x72db3e3ham95c2ht6u10zzs8vqk96htcl9qnro78i2vt3upd74sqcg8zpl9g4g7ogltru0dlkket9d2ce2w2b18ujvao6vo83n1xp4m8bqf2bbmnr9atnbm9js29k0b4wzzd3hqfnu47029elnszej2aw5r8cfn9i4wjng19ccm9jwp7wn47nulz61e72yt16o441wiy41qaasp4x3qej1ty879mnlrcvmr63a0fdnolwp11pdjacedx6i5sh84ggo5sgvtl5h8ahhkwgox4gzonteikvnr63p7pj8i0eyft83z196vyd3ku5xz7ywxutv2euax9lt9a1avrqdi6vplokuy1arqw5lwoaptyddmszpaps3sb7o1ehpiox9es1u020jvbscsyu6uowf8otfqjma5fc77umll7ptfkmhd24okgvvmssuc9fxm9fazsvd9dh2di9ja7xo2etisqildlrh3vvdnzsxrr9fhr02ywlle6yq2jzt2240jexp26ig9mbnp2idpupn4ci6jokk2i0b1eldgm34bf03m09yixn6jucftm856zgem4nolterkagtto7s5w8f1xsvdttrwfiz8hiz2m19vnqjxh1kk7wr93njek8ipfx5u3lmk3a7mhjcq',
                fileSchema: 'ti3mwtxm0h7ryelc197biat6fmmntbq4kyu9i6ohjqjggwvj6zpoiqg80100gbay8kt4filz2pivrrp4c26fr3g69zp92h78917tfdv50rtyzet57vaylysxjpq2u3hzy0wjt094bj8zfbe4f0sejwduvovcqd5jzjdbv4l3a2yl2mko43m4b1wfcxkaha02dnaj1tlgqpoeraodkncydahb3br0fk0248c781rdhtu0xbfud3cod4qmyttuokdcgsv8x05577ne05oehjig20e4k0q8yokavk9d3fsaloy4az4kfq9zx8aijzmjr8x6o2milcza42veznjf40uzaurvoxuv7snc5sio42kfb4vempaqozfbzlmihx1y3aepy6rn3gqakyjt17ub29j2xaudv0a2uk9gvm0ciycbtumeizu7hyfz640h5ffww3ydt6nfx0nx2c6fodr53vl4dkxa463ikxbyxbf5u4x44kixlxo24xex1l1pczzlmzx8amy4xr9bi4fq8zad8q91v7uj4qcyfsnv1et2jmakluiyw8uwyr8f05t4zhrvmg2jyz72ksg1vf5bwy8bpjkhsoce39cpbtxqu1jg4r2ys2diext1jdd2rvpmnldo5q4n8sl8uxba39xzcqbqkjqrd27kchtgbs8jcjoxk1jcnd5ylr34jm3yvidilk2ctf9i3g1syud2y01442th4p46du939vtk88569a99xzib5kkj2jnjb1kex51zpyhuvro4lz4hyuq2548wqvk06f4tflmg2stdvz60xt7c47gobhdcqult5hel8e2te9ur36s2fqp0kbsravr3poqj2u24o7a6qc0cly0l6g0nji4nnblm6cf92ma0dk5ch8im75g45h8vcjmh2fx9ptrbs5526h9jjmvkuf14bed5uciw3wd4jpb599scl7fdnimv7s0ykg7wkz1b8rjovqsq8jmor7efubs6stdg1w2jwn750pwwtdyj68q0itk9h2zccvz8',
                proxyHost: 'hw60uh1pftdvqbmlolptj13dkadsrbux6e8jxqq2ug4zcnbe2nql8qtvj10a',
                proxyPort: 7126049882,
                destination: 'xwp32mp2kmnf5mucg8vd5ubm2zwdikpk0ytm3prjtop1kct99jlczx9h497cqbpnbohzw3x5ms5pxzskuzgam3vvu37wxwhn0msn7tocvvexf70ee142ycfa3b5d90nat39yy5tgm9ai3vwnp2h80giqwj7wilyn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cw9dbr2ypeebvxc5ul8qhrb2hh92dlby5kd2zwd49sswjw35hz6dnoa8trm8xwtfnfkkoooo7cg9q0nqkqxq9iqav8oxsgb7u8n224glipii4v5zgin96zfbi2k6twi82xomk83g8vcu4uojwxr8rpd6zhamzing',
                responsibleUserAccountName: '7sggyg5sabzu9shou62e',
                lastChangeUserAccount: '09zwqa1gcq0tzjl28ntn',
                lastChangedAt: '2020-07-28 08:09:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'v55n8ugvgv933430cwvqr39kgkdcg8hku0j9b3jpbndeoxgyiy',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'pvh8rz88au1qjyocenez',
                party: 'j9h2fd3qnydnmgqxhbol3xrbzf3bjmixjuvblt3srtmxess0ypu55gax7ry6w7ij2c1sccu2tt6ny1ljsrqxcwm8t9m613i0vzxn1q92q9xm8o552rl91lsu1m9v1xbvqihjio96fcfyz6w4d935hbgeqhuztk94',
                component: 'c2it2veiae6q3mqxix862ek5fovnl3d83jvturfgvu6ubauyughlk60mu7jbje5ssgnjjhr0z5fpm4bjyz5hs685kqcq798iock37cm2ill6nlwptp3wmqs0s5ntndrke5x2uak557xm74dpq95dcq0p4upschn0',
                name: 'nfrkmba1b1px48kd1r65uysjbebvqf8ojqo43py8up9awbxa3g2kjvjbsmqihemrfuerhzv9n1r2762226xm45vcb65h7dbvfp712rhrtzsectc6qhcdi9do698k8stlutk3o60yt5me5krsxcqowbl67x42omb2',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'lcynkzpa4zb9ncalx6uc6ymc1wdddwjvw7ubp20fqaxjttlsndroei0mvp5fcrdkzpto4tnbtcm4oofbkbswxck4y7k1618pgzpzzk27su4cmp2uoaed2pevsonujli4dvwewdzjadedvsrxmhoshedtisy3m7uy',
                flowComponent: 'ky09250btfaszvzoodh46w2epvpqx5219ltagz0nikbw4d19atldyh8ritr45ndewud9ebwsfejd7bbj1351mo4csjto06qbl0lgq29sz2ckp5j3a5bb3c3izgj9vz8r1e9apn45tx6mxm4urtf13qgkxptkrh18',
                flowInterfaceName: '2qarwi3up6abgymo67wnlhm6n4z7w30evurva1hq6nvb4le0eyxr3q38w44mzmo6c8s6l67wdnztkcekoy5cc9mmfksa02x6wj5cfvna5234uxz4duv1pystbs1x23el3o75x9ibr2di3a4o23zo52zod2c4si9jj',
                flowInterfaceNamespace: '75lfhzn3a8xrpp2gozr0dxjga8hlix2uf1omwmtkwtogs4imb95fiycmxtnkje01g9hqqfvc2d41abdkwcau1a68x95wkvf4gwk64uvc7y5q0vt62v9uv728a21gipy6qsyp0qshh0wrufw1mlu9jonp77tjf1kw',
                version: '58rij9tm51exmw54be0i',
                adapterType: 'ilh4hyjzrar1sma4bju25yatcfgxk5mg8y1qx36p47i2kqwcn8pfl1rpmhul',
                direction: 'SENDER',
                transportProtocol: 'huwapqkybhpbm06jkplo6603eivy031rhaucgh4mkw6m05mnf5vdz2ias8if',
                messageProtocol: 's5jwot7nw6y3oqemz9lqsuw1kbfo8kladju55y127e4cwixbp6medh5f3dus',
                adapterEngineName: '4wdms8y7dv6hv7q0vsz7bql34zm5rafl4zpackguslcm185qt0hsr2x0p4xtd6hwm2euvmgv5so7il8gp0k46vudfzo0tqzqdu6kbp7h2c2ch3vi8bc1ep30vc22954tx4znnzlr5hlht10ifb2vv5v3zma5a13p',
                url: 'ksw9zjgzl9v6ynxxkr6l0kb5c95e552mfia7t3g6rus4kgaogm29v55kvzf655vv277dsbm50ux3z7659dfuznt7f9pp58w1ga3e05xfgfbjbaowo24u9cm3bbx7v5ut696n5j0mi2l6kt8yga2lr8yuv7lsr90atnnpc5oaw8y08c3c5rghwvltsga2wz0np1qs3nhkieozgi6k7qmrjaxj49ktcaqfdh5nhsrcrapcrpt6iashtyndssgjirqem4lfpg0onxwfldkyrjo9nvp8jpwys59zp6ah53gqmlqgd3jnifdws44nmj3dowa9',
                username: 'pfz9hvpj4rs37hqp5xoet42d4o6vtluwhouldis9615g5fyu24w5jwk25uua',
                remoteHost: '0feqcfkwgl7ue6j7v7837jmzmxsazoxk3wfls3icxxxm3tvshc0a2zg466uzn78d3nuf7vyytjo3x7p8u9wr843qo0zi3osgrht3twudx2ce8taonaer4yzc9inzugt75k813tj6gmkic038f2p6h3gd25ml5bmv',
                remotePort: 3579387116,
                directory: 'znruxzgfwsy30zarigeqnx8u4ntx2mjh4n48voq4aobab5bhxv75ng1fsb4l1aaglha21v7bnjft30tpijasylsm2tvz4rmxmz9dqeohlp19y2lhe3j8lcoe66ghuccm77fswfp5n2b6gziwurul8dm3pwgguvleji4jo7qvgbtisxtsyrnt57z5w1gqgxswzdulccuxvb0eb367kcp1m8taj19ccetogq3ubwcu64l9baj86765apimwu33muxrexzsvrii4xf75zcwhidskkpbab5qm3n9xdv5l5y12f2rw4spavnltb81u6pp9r22sxsfundbwgyxtzty3ulz7kn7fesct55ezzaqvji27cbi1lbp8d3s0zza5heo85xdco2wnioasy7brdnqqhducpno21t7j4zzjatwz6qb57kbgao4yo050jxg6uhya43x648s9f5k5xb92yu169fpuhl1hg2apgf5jwa4j1tlxjd69rg5tg32aebm01rd6cacmxys036bsn4w6z4fyfjv1z4pu296n0pxexfeg5322qxy3x62o2wnmcrzd1vh4sdmms3k3aweggpwfcvhlaxcwdwqiugu8jd1w8rbn0s3ta3zb985rq8l904whf4wsm5zzlme0nkwivrt2tuzxi0j5ahbjn8j5f6o8kou7rrbajg21hfuhhhpgwxcx4w8a09go7heo1li3aeluuzari1m0bouhkq6s2grfd6r203knmqz6uj8f4jbiyc9dnglr1j82g42he9fjc9ttq7krw8lwjjap69drnh4dpfmy74fdo4zz82iqikx0y5n6jh9fp99djsjk0aw1i8pgil0h0li6neux907r5yp4q0bhz325inizvwnnojbwflsq9b5a14c06a6whja0xsg1i7ad2ni769yqjn2zq0uvw4xiijhb7yt5it8ees2o1sgtap663gxzajxlevchjtlgp93cpbt7fq9s4dgyhvmvo1h1hv350gqo0wzpni345i4lpkgw973',
                fileSchema: '6eecrhtb502ffp3k543v6ncsf1ramqow4aurofkgfcgnej67iwb1rp3edmogiy9d2yu459h4mq2hdjqgqhk9krrz3n68y1l4xdr6kfh874faubistua45ltcp6yef342wwdoh1u5tb6el7dawwkyt0rrdo0hvy3cj1dywhlzunlrychexqkuawoq5wejymx4f74wqcdlmhlwhivyy4m6apzbuu7yc4vj4ee3awqto8sj2val6a74lrtcizzi82mskr3juh13at8uwfmghjk2t1k468dh46b6jwl3qwo3scz6euwfu5vqq6ojvxygduaogkmjgo6pzku0ovv5f39ir3dcdm0cgqjdtlskhgccfs20nhczr52ih4vrnbrrvnwfhx3pv48ubs80i59ci7a7k80fsuul7gh8fsc02mvdvwsfvo8sd6v1yzw8nvmq5inot6gs5xdjeay0o17kjb00d86zbjvm640lve3qsn7tddzx24gkxutn053cs8ie6im8rzxnprsi2jmb6gak60cutrhifqqyz39pz9vsnitb9iubc99cda8mzm5yj54bea6zk2kv3zbmdv95zmanev3jxzfxcibyc7kbjuwmrr5zamv1lmczewykagflg40bveof4gqpbrrbp18gi9zaeqt0cmzh8tmb3ksem13ud72z0joy14jqcflmqexrs3tpgo8hz5jczxlqqpcryzm29egta2nud9q0ycqfmdecv8zemartrrg39o3ljtnjpn4thfiuvc60wacmnq341pgrrqs4wovua5opxszgsibavocrugpalkik3h6j1al30tph4wsjw0o9pqf3gvs5gbjp9hts6qe8eyy3l80yiw5cp5mcc5hasze2qxoq0lckdu1kj3ce5ztve03b3ufpckttar4jqerdo1pa9trpe0zm48w3ji6hxswkmfa4dorfdgihodkcjhcix9nj60eb2knfau7rzvutve7a3hgdrbb0upskhwc78svooqro184l3ous4sg3',
                proxyHost: 'ideu0chpnpjoyl26lvz0tdc0yqlcrciu3wearncqibwfba05igdyak0pkrbs',
                proxyPort: 9886957573,
                destination: 'b3iyzw0n9435qlypvshz5z494ley74imo3ah2255z08hiiujejjkdbg2fn2bsq93ak7bg82kci5qus87xx8iw8tkynslu025jcz79gkhnhh6ogt2br432lr5o5rgwhfa4kyjzlnjcwpx7i8wp0a0lbkbizobvytp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '519ikhychrt8yoykce7kx64gf9h86pc2coo280xg74kfx9bdzmm8vdb22wjrq1bgg1n5z7auf1t20p47gi62o2tda67kwz27st67c0ub0p41romsdwhdkoi7f92wfekswnlqwep890iso4p53al7pdf281vx9zi2',
                responsibleUserAccountName: 'j3molxpn3bxix5e77oo4',
                lastChangeUserAccount: 'wzv3d3iqy6o57iiwa18t',
                lastChangedAt: '2020-07-28 00:25:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '0u64cuuu50f4q6sa1qg0fm6t0lgroyl2891pkvjklmxn9zyn54',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '5ms9mb5t56m9cawq5650',
                party: 'y9yahhkaernrsuhdoobzo1qmud13eohypttntzghc5vexh0xmbqicmvma6eg8ri4ye2k1t5xs3662aejglvk1dnp69lk5ul4cutnm741laesjtmbqu9yrmmzpyh158eb16uerenkil4khldyux82ydvzydnfxm0p',
                component: '2u6uhszv2l90ccoaqvk4sja7v3e95ma1wxbv6c9rm3eis2j8tqg6om4ztif6cwrtqqqa8bm84w84hftv1pb3dmhc90559197twja1plwiv065f9ikh4ynxrff75lzbk0wxbzi6zdlwsn60zt3si0ex39nlma5f5x',
                name: '13ssnfnsiwrtifduccmvmduxz3mrqoe0vy2nmx7gq05hb7cvvi77o7g29ih84upthzwy71gwdf1jnoacu38g68d1diwlmrv57icjarzj88jsz9swtzurlcpbmkb089ienej8losns27wbak6rpht12vq1u45y5d2',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '6y4fprkr5b8hoqish0xl4i1h2iysaemivyr10za8pv8fugzjnffgl3ge6rshqi8zmzcufg2kkn9ay7dzexo20s7b75g0k1ap2d81pqfk15162f7996prqdg191surm3fa8tveypx60xtxfo13csd7nfab8prduig',
                flowComponent: 'ychvdockuedzoh9bya4k46lrdwicmoyykk7azez9y0zfw9vz2gtwkwhyk14pfd5cavoadm55wm6olnwo4mzcdauzp7btxuaprree7yfi2luav3ejr6f8e71sxdpdae65m3rgu490qg65v4a3s2jtj7ckhglyxafx',
                flowInterfaceName: 'llf6cignqsd08mc60u8paif4paajsimua8dgxvlmarirphxrhwve8d6y0zvopv5o8omyb4qvv7bfwuosfzn79cmfw901ca8s09h2aghsm4a0loyx6x75jdbs510pob3fn17ozjf8iutt3ctixlg0rmn5z12ullt5',
                flowInterfaceNamespace: '3sc03llti8p3imhlm0ej5lmcgvy1m6ts8c1hxmkag40qelqfdfbrwofdvniubx3koltgvip0dd6onb8qq6r8mxxznfe1i9highy2v9znplfqom61fe7id1lpeuke6cywj44aoavkr6s4fbcqih43t486ryzhxgq2t',
                version: 'ws0rqseleyvs9sn55z2p',
                adapterType: 'gi48j9j09vbnmlbpbmb7x7ubfc5nzgds3vid2m74hsygbqjsvhh3bhjbmab3',
                direction: 'RECEIVER',
                transportProtocol: 'fsv0sq38f73232jsyxs1q1rk49i0x1akw77fykyrm9t9hdl4x1jkyta7iorf',
                messageProtocol: 'qs85qshquu6jctelirwhdz1rdxmstyr2detr4taxfayko2dmtdmt6ub8jfvd',
                adapterEngineName: 'crzxfdagagtq4v8dnh1o1nmr2047zwb1wd4715ibeg2ox79od6sasueykk9y27u2uyusu3j47l0y52215p7sakusr7vvoqittaz3esgqd0wxynsm32elc78yktjau9rsmz1dsq9us6e60mzqm3gmpb8a6fwnzkqw',
                url: 'ikdcj5q9j1n3p2ythrkrwif2jdwt7rg81nsfp3nc27eyodwlepov9w8u7ug5ta2c0scsf4gdxt7whw45iq0y0j6p2a9bb8ii0xffkxmdqtsn5an0beog8typ3j78t15er0qk0hurj6tvhc3x9rdmsyk0lb7yjnxt4xws1yf704n3nymxprj222krx9rp9ipim9qb7b17ed93u4i9wgz9jrn423ggn8s1xxyqieoaw655xln2va2hpsqtczp3jgj9yab8dmpk8fei01iygaxi1hx90cxgjvna8kknnibb6igccmlrke0nq3yxm28o4kun',
                username: 'jwypmqqk4hemvdqnus9gnq4atrd2cmfef1uosn4wvtnnbqlw7lbfo4mqrmt9',
                remoteHost: 'svqk3bkh4qhqgx7ub306g1of79nxv8s2krmt2novoamdq9lh3b2e4lbzwotmkdle1diao6zfl7ljmlxunmt0ndw77nhpliojkp5i05v41uu8yav45hx8kxmuxpteawrkhz2pe2p66x6t25pzx3fxklzvrl2nqcji',
                remotePort: 5660496442,
                directory: 'vxnhnkrhgkklhxqbyg9r9pzkg3asdv8lyvy4tueqm9z3ytf9d7r9xkf6xxbmb21p8h1f8d6sdz69fqqyo2equhs4enlbs34teyh7et4hwzw9andoxwt87t03xlmgnr6b7pngavz20td1kdmnqyueke5sykf9hvinq19g400qzemsduy0ls8ixqu4r4pavh8e8da9zd0o6cerbtna7z58r66wcr8ay324qa06o2gghxsrehfol7xaefhzypnurvpliy5z28wf4z26k6o9qhikd8tmzv0svekj5jdae57hcvw7jnpels58n71bgq85e648zhtu9hp0d3kgzmu0eyfbmtkjaqzhqi9dnrc4md4zw9792s4modwuic25qapf5jylwsg2w0eih8e2nyj174ikjjub7ghlsw2gn8jnwwtvy0otusphuz8eio3lqemi3nzsmw7bndww771tvubbortden6zvgkfdpserrbksia5jbnw4h5q0x77e6yr8wq4jl201mk8jghas55gsn4a9jf0ebj7ap05dymlsc8yccwlvkqlccwl9td1cro5d5ns321mgsfjpsx89xmyqmy71sejexzx5n8ntm6mtdkl7vyxcnvd5goaf3jy84wv7onbezupfgb1qubqe6yipzyc07p7w2584rkf7h1dkmnaxh5dae7eajxo4y36a1zjtq0vltvxaiz66ws1hw20kdi3oxnd0vet7jbin9v2zqak48106xgeyicyoqtwabzfclku0toufmogxxhltlv44u8hfm5tirlkn36ac0uip09bjp1q86fntk27ibb4z3h2949jw0ywu2kx8dxuukzf00igir1pkes3ghq7g6dcjtgeewp5t2v6j9gf63pb2jp5yex7zo44wnvtinfcubcb45bii9fdjl4lyksuhvpz8lq1u20imwo2jw3vgfjppm1t8kaptbrrcsaoy7pufnqf5v9tlc92tp2gq3pegq5b1dzraxfye0rr5fyk6kkzzmy07xuzzr44',
                fileSchema: 'xc6uui0a9bwlauf7mvsi8690yxhv6e8a6e2as6richv5mbwd2f9f8zvnykgmcuu5zaflx195svernwq271cns551oa7axhyl89u6ln2be1y7nrzsmxtsg0i4ene2f62oq41r8dptvj2tvsuf3zt8tdkb71cx34btbxazjgsqvkkpu5y8aunz9akvmys0sqefvc8wdh3vlsp4zsoklkcbvr5aorauu6wgs2v410hkm1w2e4azyo2qgclru3u9xa9m5wuudebzu5si90b51mxe2tathvfd5hbjvn7nwwkmfj80vzv3k27k68cy1ki5pc6bl3wy7ptcrmnszdxrm9sc5w0rxcb1kvjji0k5i32p4cca4k8wbyuotqxf8yna4gb9z5qdjampptrvoukmwm0airlujb05k6m3xq79uv88yr9fyt65srhrlsfzmaoei5bvxjtqfj81kx80hqtas9dh9gb5lh53z6u7nzmwj9w47jfkaz9ybd96clzn7lwnkvl181s6xnu1avekvomsh78a18mvgga7zg898ue5g0s6c4z8cvfyv7dn4jofryl1n6o281j3qzuu756dpvp2cahypem71bjkz11i6huhktkvr4ykq49qgs8fvxvmm2uwv0wq49fmmvceu58gh1ewsyephwkbs3rcxdz02mvipb6n2ptrigz04qh8gv36qig91a3ii4bg45t8wwqqe79f1e6cbnipqfp3ln00z31gw4330civozkoh55r49bnocvhlkze03smpjjzkgfxak1l3zfhsswn1vw2x019o970t9a91jwokpnwz5kzv8lbzleijm8st3balnf6m8wrcuuwg01oipusznq6j4s29kh7jeyttd2nu0edg6ssvakkjmxt78r8b22ytjzqz10b69tj6562dtd8m8zs6yi0v3fwp5bbzn6wtclsq99cnc6ytmv34j8op26nzj228m9ex07j6t8xb1baio9j0mc7y9lz28bbxirlopxroaz47obfwa0frd3z',
                proxyHost: 'c8ixdl5zkf1zvd1cstsqfsokwkruon2ucxs8jzh0t7z3cns4h0udwhtktkvt',
                proxyPort: 6171796570,
                destination: 'y5f2az32l1gthjhwbqeywqpgylce2nexye7ndrcaveiadvhqv2add37x8jk2bv3dv6s8vrhzh7522sd0pao8brna9lxzps3dru3ih2dcdpgcqdru33qxmcocxr6s2ajdai3bahncq90zj0mrly0mmhkl3gq3c1kz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'puhppp98bdtq0r128kslp2iflekutmdym7zj54zvjracyoji6m0a6rvmbxihp0v3pnb07io5517zun0crhwkze672zq4nayrs219j9l2876l7r8351dfh5qjt725rwsjqqvga4sj9wgxdq7vxj8pmielezsstcfm',
                responsibleUserAccountName: 'a9a1yvmhjgrbiv6gy5tz',
                lastChangeUserAccount: 'x4a17i4i47u9q2syn3hd',
                lastChangedAt: '2020-07-28 01:37:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'uu2x4u8432wvdjc4w6xuia8cwmftax6x7k89nhqiljhxdkt5j8',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'nh92dw7rfovjn7zh4pex',
                party: 'yb080buptw0opnkywahwna5pkxy1ut5bups3km76h4yf5k5sqa9z3oxi5ftux5x6aku07tp8wsc556pzgs1t67rb15mvseegocbtraumi3qekrc65edmh5jdivud83a1p5yv9qyutwt79iqhyvpenp1jmk0bqpr3',
                component: '7dad9jnb6mr0ggvyn2hg4k7un6htdi1puqz5cbf4s0vz8afdv52xt2ec0qfj91hmx30kzv3zzo2hz93jb9pcfrucwqraq1o05pfidwacft6zzkskeocngaewylce97tbspdhf04oaixgc0z1uld66au71iumc2se',
                name: 'awtyu68vzh3s2wa5e6t6x4cxs9m8ybbgm8d5thwceh8dwd4c0dg3tzkq9a6tg2uw8ruzj0f21vv8obg82mu18iev3wqzacfb61ws7tyz0xkhc7zj5gsob84s2m35305g0jdmpmyn8l48ecw8rrktftpv1l8mdi3k',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'p4jm62k1vnjozhgoo2qfg21gv4ekkzvtcpze9oy732t2hw1ixywysb4fcy8u9dv3r4zejedti2twmmgu28qdgngn2vph88dz8aisizlaisrfgnt7t56n7hjj95d29n1h6b7h1ugz8f9enpbj3tk6eruxtqz2gh71',
                flowComponent: '7sro1tglp7aq54v1gifeozrwmj5nfd5vqppwuftmhtamaiejgivf2tab89nkbh93nvqaw5safo7db3cirsselgzakzfks56tggf1q5bs8l3ut8impvu1wcxo6bbwf5fjb5dwme33mru61bggxgq7jvs9dvonla6k',
                flowInterfaceName: 'axq75tudr6swbc2u06d05saxyl2qbfb1nrugrvek34lkxznimfnftis5t1udl5svg2kciqsqdfi9rk75cy3ko9y56ufqfn4ms7dur5mman0qtiiqjuodmvpy72x58knye9yqoy2bvmt30l1xhyacsitwbopgsntj',
                flowInterfaceNamespace: '1e4ka8ov1l7wz9lv4lbjo5t8ifgtebf4g59nhxfru0qrs4m6imf86uhipee2mwkcluxj9vxes2nqep8u60dmtkiik206y9k4iegeafundgf1gh7dk0cfq5ba61vkrcdvbpj77k01rpebleryv7w8vl1kzvmvfbu0',
                version: '9c7h0jhed8nrtnd1ht2dq',
                adapterType: 'xx8nbgq64iaf30sp11a6emmemk1skra2wf00k8mc44zgi7naopn3oybqozyx',
                direction: 'SENDER',
                transportProtocol: 'ey49iytol1s5but2asqwk349se1f1h3twurxedl97k8k60r4c1ity5sph76y',
                messageProtocol: '2bjxza6savp3k4jtzdawqu3u8z0ptkperzczsj503ougmt0sx0hg086rtcvq',
                adapterEngineName: 'z9jqqnl9tcesmrjui8y324tfrbswce2m2lb83n9mwgi42s5jcv93v9co6bsqz26qhrit6fvz94gdpmijd3s37l96gfyldphrgz4ww21ic5umkqzj5ey0hmtrkvqa3m4erznpr8kipxzbgew8895qy5kkzja5vxt2',
                url: 'ce5lxx8dtnaz8fj6x5vk3bl2sy55xyywi4bwuxki5wt0y25ihnham16icrxvb1njb5r3ydrvz1dfkz8y6puiuy0y14hp4pu27v45yagigp0hz3n21eel9fw1tk72zs3lb33e22yy4pddk23p2q9dqp1y4hp1u519dt5uydxyd7ssinja0ujqy2h6jinc0g2j3dkws61iwtid3gktlei2pxecfxdqspyikxnwck42pkem7bjk7t8la4cwns57uiqszqhxf2yb6tjy0niwgyp39vr4wb6ay9d0wbul4jlwt3lszhs6vp3tpy8h6wfedtj1',
                username: 'tglb19rcb4qirj97tmq1ewnkh7f6rk5xmnq5n5j3el66vzi79yoaefe5apsd',
                remoteHost: 'o6g6bfild0p4kalalo8atldgtw563mgich428dyql8x7byonfsec8xqqsrp73kxysm7l79u32ss0bl19tbfb07b7oktuwzsq5b5m17f3xfz9srn0as52qpvinpvds7o244fy1ylxeic090ae2p98d3gxy57mv2u6',
                remotePort: 1654627162,
                directory: 'lxdfcoyjdnclsbwz85ra041xylwkgqu5ft3m1i0g5jgvj327947rmyneq3f3wvrnwbunywt9g72mwre8rtugieqiv9tp8cnnmjfbh88p12sqeuxi6rdc9ch8o6hljxh3lchgchfk1e3r3p54frzqt7j7yr5yu7h8c9zgy1sg3z179qkozwx7v068tds7fna3pr9ksbecowddfqw7dbm6xge7a9bj1tut9l586cmt9gcwdjmgv9ngytri2b6filhuozr6vnnsgtqhq4m04o4b2f5i2ahaqcocmdjz1vrg1oc8fmm766xyahdux0i18rtpvm3hqzv6lywpb4kpsnjvwtp95hof914wp0y6b4nl44jgzohooatm2lmuh4c33gvd3wbkyjnt0klq5od7r4pll1zg16rpw4plis68fhv508qn9ywp2ecc23e9t8g9441du5qexfnaidax10mak45xuv1v4q5xiffyc7h0eseblfhhuxv4gzqant6ns8nlpb9tra0wg0iwn5te8fvt47zg71yumwqmxkfys7ukl9lihm78fwojqjcyqo98njuh23faj7iv7cbij47r72c2uuh7oujmkj2bq76xwx2m81w1w05pt3d5qbxx7htrowzzf01h77j4l2zjeq5h6oki3s2wd2xy7i9178ajxx83chqbyeek0yhjwg8xerzd4njsbvxd9zbzl2f2xavr42utsls11klwetiq78j9kyfgttrjfqcy9zbwfuvjcxbatyii5u84awdqtov3vpjv7my2y7zdyn74a5ljzj50y9hals14t8nm75l8g9j1xw5v18bn4q79t3fxul2iiydna8xmi6j68ltbz7wbbckn0qckctnuqxj5f97trpe00i740ytyf68pwn8xhe1vmyed2w3hmic2fx9hzj0coi97dwrhs7dqmo69o0rdx5z7y02r4aoxrsklqqbwzhzz6rnvuzlegwjx2p6jo0k4h4ry26dx02koyecqu1dqw448edts2l84ol89',
                fileSchema: 'sj15hxciycs797vru17k750nzgm5nigpuxmac96u4n5seawevr9mtpepei5sbx8xil5thl4wrpkoiy0yd53e139uqfdbgn9nuselaot035ua01c1gy1d6h55ph7vspr3rc3g4rwm7spgsb2mifprejowbmwhvml2p7yworcrr31vp2cnmdq42ruj77nxv0jn52qjsfklmgzvt2lcixkpf3ugk3d7364q8y4zdv64vhma5b0kzxm91x2zf1bq2ittzvi7wvf1jerb2mwu69ebfeu1hgjxs65o417b3fpa8dt4g20ernbkvwgefoqfzo1d78tsvm6jw3sihlqu21kaxzwtqejhjn9choopmauy29m6z446yu8qr7oo1dho8f0yehkj1yi58faz5014bhch2zal7gb8vchsmgsbnnop6azk7amjpqzn11e3r8etjjho9a7ydhwt5waq7js64epqfwzx3u6oonjvt6hfbkf3ri8js0rsv5khldcu7s3istbdtlyjtu3p3recww6d0yyoi8nc68qi9f8uj8u65ige7iuxbjxm031vyt8ezh25ho6n6zj0umira97ujn58srtkrz3y68t37ad3wiw9e1h7hl93zdxs8fr3m07kxx03df5gbro7vyxz559yn8karzucpqhrnq248plk9ibaigfy9b9mnxfnziis1jj4g7pvogm9duo3pyouylsvzk0itrgb01gw9klyuct582ofwougmnxtlqpsss704buumhl43j4upb9w9y06zxlhfirq7o77nuvrn9x7opcup4hqrglvlw52mw7b1zpmcvg8pdw79ubmnofdp3suvrza48ake2ekhgkri8qyf1tddpe65or6m6xsgg83fimsmefcscpwc4ky09j9kxcwvzk6dtpgphw7l6dijzjsbn4ipli94r0ebceeyo7zw10wwxhw6sgmuore9jgydc99h84hygx8pq7p9e5c9q2z9wooi7hserbgb9gtnjnap1xriw3sjyfbpkro',
                proxyHost: '9hfjpzi9sb5c5793y1q1bwk77lnwd5a7olniayz5fkf033lzbhij8xxptdl6',
                proxyPort: 4287112151,
                destination: 'o8xa86u8c2t7m13hcwsh3fdxazp550fq7wmv3ealtbfe9nb36096jpmy6du4xj53hkyitbr90gg5yg8xxjo5p9lqpwrm85icw4ip23vww5ppctm5jk2zgoyvydd326atnanaderoa8yu8scq0l53kigegp0cbagn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'm6xheqq1knidpl85n9a50isuvahlmgm6wqxva5ml3jilh13zjce1y7zdofh7c6qhrgr8q2fhhz1nyjdwmk1msvat3n7cchwo3azl20e9ym6mi499am868k4xlv7ucxsujem684evp86ztx9q2xnrhyhiqf6o5d6t',
                responsibleUserAccountName: 'xpjp5yi0pnucw3ys63xu',
                lastChangeUserAccount: 'l1d6u0tdvisfdfe3he7e',
                lastChangedAt: '2020-07-27 19:59:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '0klz1hhiy8qryt4x0ex9xrm3tb3ybcq6a2ldic4c4i4dltkxtn',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'fpltg5madhaicwjtbvc0',
                party: 'ng25f3vaiiau5jbo9xgsh94xoa007rhycb3ldryg9sw0kbvj7gplwptbq62vadj1eh1ikk89nf2v0gp52m02n1ldpi7j0fjkzxusstgw3algyg7npjcp0jdkidrm9wcawqyuh2hkjpq21lbksi8rtxiunvoigpyo',
                component: 'wsdq4c7c5i247g6uww9t739cc79clf9eyb3iilj5o4rhtl3efblwy8it0psmtqm0wclpuygczlla5149lsoke4kc3whov5gjo0zsngaehcshy9zwzpyugmcupexfw9y4xfejbatbyiu9hfpp0f9vkedimlh59xn2',
                name: '5p0yi2wk2oltz88537xeqz6cz0guzptqzfqd2d9jjc4yw48q8n88clw3vkuhzosbw2uj29516x9j3x4dhpgjuc0fh4ccu7rqzosbwcjl6ity2nze047qawxsuxz9dk9r2984sk77akcmgsq4nra77niinpsh7pcp',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '80og49a8pxohjexf5vs9rsn7vae49zo8bj92i2li161s7u3oh8ry6uqmptbn623olpsxn6ermi2wpcsgrv4bc5s1fvsdkdyhrvxclwsm08evaucweperhfyevhjj94mz6ztzk92xa0mrpd75voeajhsj28hdveun',
                flowComponent: 'dlhefcdaf8rzvqh13f80u1x28x7klujn88oly4mw4twve2w4vjl3ipobx3ti9510tlxooyz9h2rf7sm69z7sgj59pjapn59i0jcamtk371bb5exr4dii5c1kur1632dlkgokl8z0f4c65scg4zw21zzakcbsn0cz',
                flowInterfaceName: 'flbuirpvruh7gbk6cjipduc08m8uudie365po3hgkfowehc3gfanivac78bo4by1lqd5psidxp31pfyzreais40u4jzadbuutvmp5uplf8ckvkxa3jqwjacscfp7vlfi5z77685fwiyspjgd2cdkko21yy1nrge6',
                flowInterfaceNamespace: 'wc13oj74ybvr1jgb1e6sieko04dcb05nsscamugpjh8x0yr0earvuecgdcf334ny6oew3c24y5xamcuzrl8tday7oewdk9gv0e2wtmnt1l6apfsar5bzmvwfm2b7j99r87nniray90lnu18af8cfgov9o25b1luu',
                version: 'j17kl5adgw3g3x6l6yrs',
                adapterType: '51mat8anbzx3vmz1157ymmhd4h2s9ghz3rzebmqbgc342wn1r43rjogvxwtbs',
                direction: 'RECEIVER',
                transportProtocol: 'k3vdvcso0bhyzfiu2l6ido0ehsuv3tfygq0ta28ndi5zit22o3omupjt23f2',
                messageProtocol: 'hgthenx7ux1vv9l4kvri944p3pyducn9akz7567xbp182ldo0bisk3itoq94',
                adapterEngineName: 'tboggro3e7b1d16hipaf8zylezp9zwc8r76j5q6mpolpqb2gr2dk1eyfpukm6odvx4tl3cw3e3z0xhyykxv2l67w0sidx73fhfemidw3vlxnf8parxapey50z1p3l09kl8omsctgvqmy90lk0qfiyw0acbd55sff',
                url: 'y34jnctcz7e4i3mo8z3unjn6ag672akqrtzvngnxx27r8c3hoi255khp5knwrah4zkr8uj3ic51yn9aebblc86zgv8xu6zmq2oh55fnl0ox4q1s6w7xx30dlznvnhp6td545gsmstrygruvtx9m2rzsdq16f07ro3zmsphrumvcpnaqn7qiiz10qahk9bzqwak4307nxyf53ypxo15c1dvy2b1wxaffmcyd7zsm3zlwqjy9tb3ampyggpziggbrvesk2bbg4hluuiv0gewbkiuubz1aqhuuh10v56zrmfngo1q1tk8ndh9auy51de6dn',
                username: 'vnkvx55zs3ar6h391stv8f78q5i50notg21okohrtyqbryllv2h01xr74fp8',
                remoteHost: 'ugzo4isx46qq0fodhpb5sgn531haqpz08hywyrye4r2zdowi43qot2jglyut22u4vtycugk4zw3wfmlwav4r440fudsqfg8ahx78iex5cb9kgvhttxkf1dvspq0idl9xjbyr7hyg9o4mqcrveohrfx6j3sdwvjz6',
                remotePort: 4238919493,
                directory: 'u6e0gwhg8ofmzxbegprao3tfue6e3qxhm1li7mcx5y3f96ik0od96xdaokvmuezkvt4cc5oq11lt6custtf6ft19cxt5ev5gvjdppb5njv7rs66cic1a5rn275bsa6ogqcs998z2lpmgqoeijaxglax6yogk2cyn9kirzcsjw00lckmxh1w4obmn32k5tktgwuwru9lnmcvgwkvkrh2clqnu1i7ekoyz1tehx57w6ff6e8hqprk2o8mggphkptp016io46a374k3iwfm60kvkapibdkh40upwd9vzg6worh3eq09wwyjqz44qn3sg1z6s8purr2klhjau2cdqxe9t4rml4ewrtc6wsxky2d6938bg6cp87t7wb46rkxy6ligw3p0au4p2tzyinuf0uusvfxmvgframr5a972d13z1fquknsx1t8qo1c3oh1ccnt7xpw9s5tdxmk536nm8d8u1gg320g1dq4lo4qzbhvkybt6cr7di9kdy2d5b73pn599vhmukmaxahiu7hxfsje0bm5z8jpjcsmk4a8nx3to6rfkzr8dcve6lao49emdbdirku9ffxvyem3aqogsfym109jg3w6jhw3v1snof99pee1v654fx9y9xcx7y62aour9xul0nxftmthm0r70xwhsfsd2xeksgofm2v96b9zbyt3o6aqzthufjfx5r43fi2uhu9r8pkkb905qsftxq2h6lqqqvtlqbwaq853zydxlo0o7pjvbne2hzt0d4ng0yheop86xdyqbuv05wdr6ga8c091ds1fckcv2ltg98w1kbs8ijpunnotvykazxbx8epe8bpz1p8bler62pe229tcjuzhh47qnxrubnfsywobavg2t108u0s24tsbxlaookxrc7s8as1atdynbxfpzfcej8dkmnjcahuganc54835knif526t9f4fj1zp80b3836ev4f5vxo5joncixzwnrkl4oqx3dcwi606m2kpv50cgjie835dyu28032y4pn5de3mk',
                fileSchema: '55fki6szu9xy7g35swgz6e1ruh12olp5id55vcwidk6k8w4cilc3yqnalu3f72z9lu1suqpbo0q7xnfd6rsfb420hps1bv06oco0snccew91c9vu1vn1jx10abc5moisnaewpi66hpxc3785rc622gcbdp0gaxmd6bg2akn6e9dt2x97rcwcv06exzq3f5zv4vgmvjfnmseg8aba63oxlmfxi8rm7r4lgzd6w2zvitl6n35paotzp7v8juvsaeabueo5u1frk5zlqwhb6ea24uhb9zwyklvzjhznfheyr8hhxd05w59l2ee5e78zhf51ofbzjjq40wfdo8figfw14vv8n0dx2pi1zahfpre10x3xz9o61xovmyyx7cflqtbwi5yj835lj6c9tfmondigdmxi7itlhryfq9l7rtuokmzmscu5qxwqnvaa963f1qpx7oolexk8tje5yrictmt4xmpxvrekntys8lhvlu1ww6j0i9h8jyvco49wjlmm2zl23hqnx8x7jsn5huezmxhbgo0zy0w3u05yozzw9474fzudzxp993jddv2aiem5ckggee0ae2oaw7egumlxdwcx9122j74culhomnqqanl6e1t1t8gc3uepqrz5d919je2w5wblh1de5s60icf74t1jvuosi2s8468eunr3nhazn19be9q9w1tsg2j9hsr0r00ghnxb3ls1m130ft3d2ig2qn6u4tez94w292eorjn9bs8fdjkmwkx3hc70la3dbls9ovasazkgdw06p6n09uiehvht24mdzw1ihwyn27jiq1rdhwtfb0zbcwmj783gxt2ego26sofnfhie6fbbt9btuo42z37j1j5ndt2fsvatvouiccbaoi3lqtzwnci7q3kmi6fpklmv5trmq70dau8ujotdnmg2nfj1g8j2bhbkfvqywxlgxo1x6vs5l7zifazkoby2r7fzkikyfdcocuhtr4bttt6cedygve8m8t08hefgdp5g67os7dnoau46owwl',
                proxyHost: '0o2xlg2nru1uzwhaq4hxozf3uciz42gvpl5az3b1j86n8ewm9a4fa3052exa',
                proxyPort: 5256465132,
                destination: 'z5fku4w8nlowyrqanje2soalxh7vu0he01m3emx5qtjh8rketgxitv1w94qbv91w31zk5j9boctoltjr4eik9pwqeee4h9fil9otyffmml8qafsaajq6w4xcr78z8fx02pvx49bvw5p21bs4bzfccjeuhycnc9t0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '975axs4c0i7mjns99w0m68882e47fvdw49a7djldx2zne6ibm25b0eh6l75dkgjnkmx4vsxtr48z9viwa7tgzf9xsznpq7abdwmc4i781gsm9pwbah8gym6og192hrsa4321t7mlajhymqugaykpph8gqu43n5za',
                responsibleUserAccountName: 'hc3m23m0uw8455vp37wh',
                lastChangeUserAccount: 'zv1vog2lhrmtdg96hogy',
                lastChangedAt: '2020-07-28 09:46:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'u86or2rbif7jfdoizq37w9cms6ow073m24uhe9c8b0gr0pmaki',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'neqncamy34jele0a3wf2',
                party: 'mg6l7n3ai4cx4qubslf6a7x2bjctol2k81xtsiqa4oyfhicuzjt6gcxfxkda5h912r8ik8fphyuxx5rt5hobvkxiqs4dau84cd22171tr61mj9keiryob63yj4fsg5jaipr4fwvb1ctzvkbhuiqv5ax4gq3g7rcm',
                component: '3k02py3upyc5nq6n39ab8wn12ouyrhwem3may8kkwvtxv98ymlnd9bstwjostcqtd1viqgfjdbjrjuydw7v2yp02tttx6zv7wr77o8s0occ6cvsml4upc7cnrujg3d79auituduzjbxgd29818hy2o89ytkrxa4z',
                name: 'qr9xda1x14i7s4a3rhdkyf9c38j6ucv28i5ys0txpuq7ad8nuej0pe3wb4o82v9smayee7hfyk7xnp2ox6rwtav0ophzdgfmwf7hpjoyj2acgv2b9rdjy1b1m4ag9mr1a65r34nugy50tpypn02xg4clq8lb5fdp',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'vqwg4mcgz0vtajq5h5ho5rm3uw221srhsvgsed74i6rdf3bs60m44a4w3tl0sdtdstniywlsxgft74kybccgzi49pjw9phfyzolg40qibnw7bcdfk5t53edwttu0mwho9xgpykikkoux31w3hkhzqkpwx0bvvxzn',
                flowComponent: 'w5kzpvz61j3wep07kbwhm39a8j7yswjh7tx25es9401gkt8ey8tqvx5onav0jh1kgxgum7rc8e1qizhpb56p2vp409r1rgx8k4f6mb9gci3ov2lewww1iue4vykxn2dxgkxmtw1r3v58mdlpc7w6me0bv2g5cmua',
                flowInterfaceName: 'nznncd2elsfthk2o7ucc9oj8m69vwvgpqt637jrdvnu74qg4qh22a2nv2fid9inhgmkp5s0nv22zb8xks6abx0yf5flfys4dsri1pxwz8ne0ffvjqrw55m03uizz9ibqi0usxf5fskb44hcub1pvw4sjwqry1v6p',
                flowInterfaceNamespace: 'xww6hadrtkpx7w36gznk8e4e5wfkvyvlz4gyu9t34r0k0zyxl309jxa0ngqlzwsd7oksvldoa81e3ri7xsz6ynidgaqrakhth719ynbvewao04nudi688t17anm1imxw9xg3jz7mbstnpa1dza66qo0661mcme42',
                version: '4jh4836rupadbvsfqudf',
                adapterType: 'piahi5wh2ftgg58uhddpkgygf70899j026tjic9aipyndkbpxglzcj4awtiq',
                direction: 'RECEIVER',
                transportProtocol: '5f8s9q04kodw579cjo1wp7fpkqxd9lb75prpb1q134z75jbh85s94c36mon3l',
                messageProtocol: 'sx0vcv9ckj97xvjkdp2gpjitpriwekk2i33vyeeozc6dwjnlj912h62k2c8i',
                adapterEngineName: '3yxhna4heyxwgh4nn8lgh05g4ongaroyl6mjttc6m8rjqpe3yevhajryti90h0o8zfuh7vpghb2lgztazxyyk8v1fsectjgeh3gpnw78zlhroi1tt12kznmyvzsjllp8rqlmtz8lo8a7ri6n6x9igp0l0nsokrm5',
                url: 'kbzzrv55ote988mkyuc4teaym8jsoh2oj51tw1g7lgra0t1zyv4lgn2ethc7u7oj3ln9mibkneg5tv15ll39nss62hzbokyd2p895fek12mee6e0lbhihf56qneix50el6ss7x2og66xk1drvupv60pvkghntwcog7cco8iuyo81mx4dfi8uq8bwtyxhokr833to0av7io9tvpm2ehw1oh2v89rxy16bvmrhn67cy6vxip6ves8082x63lewd1nmyjehhz7q35u3ql4aqxmi8c9tnpu4kc2jqad2hstxiewvjpysr4ihgmn1qbstep3z',
                username: 'ouhq75k881zys0jo063vuc2ps7hr8oko1mgr5plb433clq7c4mthkkq3a8ql',
                remoteHost: '17dwcwwd4u2da6dmufwdsbz11joc7meyn2o6jeonruysyo57e4nt9iueltc5ecn7jk1h5c6g7p2uzcm4t62a7l0fojrpi5s21wefzlv9j122r0bc95sst6okupf8llipmaolz283altevpnacfuonuxo1z5zcbwo',
                remotePort: 2781755038,
                directory: '14kubp3fp6upiz44c4010urlwwt00rnwbg7wq9yxifuu5jxjlxu3wfo2njfgtzrel0nux6d7j9s9b4s3a6k2v6cbcvr1xkrcqli19nicumjfflqnjrbx8dsvixmkr78zt448s955hm20gfsy0yjogxixduvohxk00nnb5r27mb9kdb016xisw05afui1lvwm18rfgj189x55kowoh8xt8i8eeye57p6hiuyrilpqzhoyqkkw5g2yt93gl2m5fu2fpmm0ccmwb2i2ltkq4aka9qum3stsmh834woq2erct814sb8v967dcr6ijhdalmku8mipd5jm7ondd37fv3xetc5lqaaqymgalmsgjtjkqxjagh75vnm23i9hzfl7ga5qq1a0e1s6hpsq1xu1ep084vg7ybyrr8at04i2lym8ns9kmomxk0xmf3g6dqakmqs30w14m72xwaqibhhkcx311ei735dyxzrwvgou9bzrsrf0jubwpwmwlbar4x904lci3wpz3im00xmg1epmafojx4y0odcmlxralty25r8l7fssqeftu33kb7gsbxmffjj7wl9nxmh9wg9nabn6jul0ag3tqp6aby6qc38i91wf14jd2k5b0gs0msvui3q2nvmmwu0x3a8pmlvrb84onsso5qc7zdz1vayj92vkn4p07lcmb9z8qn816ayuyop8wxdi15vioqvwgiq7ggago1lzo4d0y77rgz5uq1qkavqftfmman8mdspt01tgntj7tbajgguiudrmc8nhfyhvrpv9iifk33xyy3hssyd6o9ky1clgpvdbslfssjevvs3nq6kt79riawy3v5cnjz160f5mymgqyt1bs3ne4y6wt9fky6mterp397tom19rin4gxhytj41xwked4lpylzklnqh4p5tkm6u2jaxub18ua0gdn1nobw9te57zltfn1af6y76j9uhfaoohjpgzu1q8rbxq3uj437ez8989dmkkr53bbcjlon5pg42an9dde7vx4o19',
                fileSchema: 'jven6m1n1ixi2jjh0zibaobpmxhfxpwtwvkg4hxutn8nn05821zwn7znz37b886ln3m2r68g0k9gemxqm7gv9e5bhnthofpfhdv5dob5queadwcscdhpdq9rj169ac97zxzs0y1uhwk0ljj5itt9q7jk86rh19fnjb41lhsa7jbbrh0ud25u6oxks1bsux2m2ko1ak2qienkdfnp1v9eckjktcxp873uhp37u3pq61806e07fntsnvi3nfeltk4st201cjexovvlfgqnzh78n6km0qqi05nv1p2og4lx60if0x6m0d8m7fzgbeqti0cxj9ges39csgrf31iys36n07euadqxd84qul2uomdsefvtebyv7log9uh6cbd6tm2wgckosnubw6chi7atxqkc8g1uay7vr1ecv6zct66yxw5l2m81cgwsxugmqzq96m99pt9alv75olpgc5vxol636i42jok9p4oyw4kj2y35039b6wmr7sdal7ntlyjcy71uwr7w0y0orcqd7it3u3tb73g06eygu88jzlkzskskvwg5l0azbu7akey3klfpyen4aeuf4ax86sr4c6igqvnfcoh2uh4lpyaig8a3do0bpfnhaerzys1jfqlrkoqipij3zyr9js9mkuj2squgtfue98wo7gtqxntrybbqgywd18lxtjx0ri37fxeyq3rs4edrcpqftf9g0a4hfnycdl8gceq3ztpas2higa3aj4n59dwv1s32xvlj8ww0vzhoc6908mom89jmqai5jhvyv4jt7djotqgzm26fg6oloyibtopmmhdtjbcdn7q901bfwgyqtqysqej17fiqd1bi69ldld9k36ifo43whg0krmy7eea31j43praey8vmfvly00xbcx8bzft7i2mmw49tdfwgvcffqbpwghm3pyjw8e3tej0zkxk33zr3usov506rnmru3ofu7hjzv6puqtb6g3dg9xey0bnkek587ttr5dwvhicbm2q2mue0rxzwwkd0esjq',
                proxyHost: 'sbi33dez119lcbad6twwvhpu33d1vjuxsw0f9exiuevzyzqzbw3m0mygcmm3',
                proxyPort: 8691603473,
                destination: '320g9mmqgp4wvy5wtth5q72xb9c9ryvundzl8wz7xyxtvi7co5t3lbly8yiipxz50f5oyr0998qltkmsdukyge62da0nr4c6p90hcdpm2hpedxy4k92v9ftzpjzh2fr5gd3b1srksn4o735biiur6w7f1wl94lr1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vjxdk3k9iamqwttsz0e0wfddnt7rlnpwgtu41ghlqgpt865ixm040b4mdm2ubvqtffy3w1u1xf0ptyqc1c57121tkzeprmxsendvjc4sa2locy25cpqut2en6b1l58cxw3krknn667gnco6hh699ti8c7k3i1v20',
                responsibleUserAccountName: 'svb3kkl3wba07sz70hf5',
                lastChangeUserAccount: 'kc6i7sef4c14cr41cpb8',
                lastChangedAt: '2020-07-28 00:20:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '0i1e2vg86y6pyu42oz8mmsy6jagxc45d8ixil2wbpg2qnuxrbz',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'h8flx3h15mcfoqr88lx3',
                party: 'sdx6tu4frmo61op04zmgv4d5e24m7uql4xxia35lxzmamzy4lwtzunhvujw4ky36tqe2zqircdsctm6m5kwyezitx9b7cbueel54umygqtgu3gjdmmrkhgjqfwavhp4t5hbeqi1i12oi3kriaaow0ct6ei6cunyi',
                component: 'z4wd5y8uva4r9fqnowgg5lyne2eufjfwbdogb6eh0q23q5tdkspvuwnjs4ql6k0wjl4z438b2ot2gs3c1chmlc3168qg9nwodfxewsz2wuz3jwx4z5nv02azdzgob8g9m8vh9nze8wscl637yahafyxi47n2lq1w',
                name: 'ta6mxoyy0ridw6cxpt4faeritjxw3x0vyfoqlcwuksqtzk5e0yu3oukwqazdturm15984psncuvq68cb99y0sjg42c2v9ygjpc9z8weifqo8na59hmxg533wuh818i07m9ci978nt7kcrgr94kcd2wetfta82qk3',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'af86mofbsjfoiw8jlsquhujemtijrw3zs5xtk1i5q0e0je369u3s6kl6nleftnjh06acnyybrci7bg2zlmqgx0djoainl39mdnomhub5kb01k29izlsloc34i7pmxbxi61my3w12c8x8zbqtkhzdb2lhw05efm43',
                flowComponent: '0zed8hfhp6q9rczm5avhfb2vr5xk40lpjtg330kah1ivq16o69jct9kvaawgc5ql51oluam78vcczqd0usqn0wbrk1oz1sywajrpm5mdobm0mb29bhec72dq63y2rkfjmitsxak8dpbi9xj4zgohwyuik6o2ox3a',
                flowInterfaceName: 'hv75pcm9bc5nsrn513dyk77f7depawag2chnm8msiho9e5btom28x5bnv5iufzb2xjtzg580ser45cap2oz1f1fdlgm7c71nib7pgma035ko8klepgpoxenbfqlec6eax0b9wqw7xynx7uxp9hdhjvgfemlhtt5v',
                flowInterfaceNamespace: 'p2hzuivccednvv4p1a5oypndb4xzob5hnorc4w8pxrio8p3qe92k8gn9gcftk2plxw4e5m09u289dztm9bt6rpkslqbzociag6rxwisundvysbjn38hpeokwn1vnfv23nbv2ami1ybvs807und8t3zmmwb91ox9j',
                version: 'qbyhdldq54ch81zwmb88',
                adapterType: 'biwjwvkzlbhwcgob7ztmvv0tlfie5saya71vcglzo5l0ah50mb9zcwakcd18',
                direction: 'RECEIVER',
                transportProtocol: 'jfk9c8g6kicqx2gry1auzvmvnt0k70uy1fw7xhyqnes5bcu8qn3r5w4qjuxl',
                messageProtocol: 'jujmnqe9pkbtesxk439l298w27l2gvrte50p0gqlv1iigptcjw1nx0lb83f6b',
                adapterEngineName: 'xqezhviyc1udq9ti0vc7l99bfkrgqprmkq9t1vti3doxvhtnu5odijux144qt5pbabdw8n7s69vqmw608blwvgy7tymas49ho8zfyqvdadovnfovg5p5lamxoqd4uelglprd6a8qcjx20uxre2k6sj99rntpb864',
                url: '4zimswqlll24s15463wpbwzpxtkglxg3vxwe7ttqxwks9sm2fpk09vmdswswnrz98g56l9a3euc5x0079aj9ry36w5ejvn1qbewaeevqnndblpvr66wgsrbwpt501gzfq2ed6nna2y9c6on2smwgke91p66w1usgzihidljdbj3ly0nqgqg0prxbb57i76aqvekwxw5k9mdcvrduwzhgpeh2hhrl5myrp6jiqpo69xx7l1f7fk15i57kzzy0oi6dx1qh1grw3ac4y85p8nq94m7pwrlp2cs7aj2n2coh4waibwtwrzazl0i8e9nz2i4q',
                username: 'ozb3hc976f3qyp1ihkujkc9pw6vilamxddhm26n9pwrrwb7zsmgckarcj7lh',
                remoteHost: 'ebsyhcuxhsle1num3kscsjt4uphun8t8e2swn3ogndzn5d16qh7llzfzivjofymnxgqtvbq7zunv1v11wmve2mgk9klgpyibaot11m4wmxfh8t26zici3vkt2wwtfhzif7i7yncptpaf2v3isuiomn13i6y08rzp',
                remotePort: 9150858881,
                directory: 'fuikiovcqkf5dr26ukdj5cuaxwpfti1l08xwd48cib9jnre4t1jk2p0e6liw9lr4es0q4b1l89rolfdvgtv0nikdtnbrfzwo1rm5bdnyld8ekkl71wis711zao15pxrgi5ytmw496ea5hh7917gzfdl7ndiwu3jxaw0ov5k9r23u6yt7uy0ymqmr2dwwtlq4ijebkt1ylh8ollzyc6h6ap428da095h1ngt3oguby0slkkuki6hpz8nf8sxj4iu6uaaczgtbif16hsagodmtdajhjtrylzrypm9qahcd7gxohsr8o8pwqhj91x9w6em9metetiv0swcqij6keebe8adpsfspyydhrxi9lztjcjc7l4zdmktyskmtf1phjtizq0zto6vq0rgbyv9rjs8ti5z30hiq9rfc3h7zszwyltng0ontut6romrmpchp24cgnbstb6hb5iqvph6ox71xa6nr9dr7bdjaqdrwobu778wwvc48ny70tgnyyk8irbc9ggqb2gikm4r7fj91hliof88ljvtiee2ajfq4jy3ztf4yslclmra2ab8seac8sygp98ghx777c25m6bssbhob9wka5gpygl62xs77w1poz649ljwyzyyu3gsetc8lek2qpmf6p0e5u03o7utuclwk3rndeii7c35ejh1kijb9o6e6qmxgp3hy6t37i5m8oiicrf3zrqshn6shd9iwmjsh1nctjqdvwehuq3f1ado0schnk92ki0ix3k08uae4lrzqi5v9x9zk41qaljgxjwdrliclrz6as6nvwnr4ftnoasei86dow1bt4498ifb98vsg2w4fphew8tv3jjchuwy3pn71bd36bassrww9rpl7cv1hokjwtqqvrki8nodtso7jlqebq47oa5xzkjr5oh6vaulwd9ff8mb8z9qvpa8l4fjx6wvqw79kvx7tgfovegjmteat5v18u2sxun017x1mng90fww97hwrh3gjvoybvhb96chv105jsxemjyf86te4',
                fileSchema: '6i51exajt24kgmllnziv9a3244e7utvxok3lqrcv7ghg9p2u2xxmaeeq9hj2anh5huuw0r3934djlr72emg9btfek2jsob7a2p6v970ohio8vj5nu9nubzkd0bsjcsir2t8ygiho3lvcodi46xwti2eehkhh3c3qqjplk7vea8ntsz3flsbcdr53g8lv2xhm9flg8qpv1f18tx94ilg1xlznz7ky95au8wv27uau9sk7y651ys6t59m4wyufuh5plnqfazq4o4o7phskwx3i7vo5mueigb0vkdw6dwy3vncxtku2c4fyfytaxz5jkfgw1e5p1r3pjlcrs0qwy0cljunsgtz65bpfjdlhkjk85hi9tmwfavlh55vjej318r2tmdxvvm2u7vtzt7c9g64e9po6wt1u7s0vpcc4egmhvkld3twuipalrudcanointdr87egdpiyb26cermjocfo431kchg7eoxa2p7fe3wpdkle9mcj20ykpj24r9wstieqm2d8j4a85hfhcrvr7p6s9d9cud7lddjvvalbbfsh97jkx7v4xydp2w0yk6dgrp99g2smj803h6xp9dpwpz8rxafi84onbmhrm1u2gckxp5gevc51n0abzh2nbut1jpm7hf29jpv31nlwnx4pq6kw4qllko9uxdo1il1030za1j491ipprp7g55emy3ceuwe0mnxdxvij3mtk5opot5kjcrj0y8vsefgo58wqf1pj1qk9o02dppc9rx9sn1ev1pyygjc9f6phzz9ayr2bmwst6cuzw0k4uemp23sg0e0ftoybsq758k16dzt9oz90zinkz3s24rl666xi9j2j8hyr51svklpxw5so9y9gh72hmm3jfxz2gdgjqvnp0kbdzhf515v7x7yimv9bdxw60r6gsotz67ts5x8f6vgmjb65by4y44loq77sd10acatxc4akwtz6fz8kcc6f1s8zkq1k1x1mhjop0e67e9e7pisxgry5nmjj6de5d87ez26kiffq',
                proxyHost: 'oxql2qpxliv1lvk83s3b6wqj40ykgo13byzzfv68en30jou2mq78bmj6xt6q',
                proxyPort: 4124132801,
                destination: 'b7ghaltt1n166d8klm5l3niiyq589r0uac2c3yz4w29zze0bbu5fh8j9t1kg8k2xz3vdyym1rnd3697pppse3pfsjrxqqgawhslgt19xw5vre0k0rw4du7vsq4m9lyn5lcnc3i331dpah91ox3y6akvs3b8r8g7g',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ij0v0jjt8jcn9ytpxu7d9ncouctl03xck6jl0xqkd1rdtrc0yndfccgmpvdgxomq01a9w3dsntmxt5vnylyrqhfmt4224iy1eaodazvzcnn4v5gu6t799n8rf4p7dlgv0nx1m9fblkfo8nmi68gysvvwtxgl2lki',
                responsibleUserAccountName: '808ke7p1sl4rus8s5zbo',
                lastChangeUserAccount: 'h956tdzd7b6tv2ryo9qm',
                lastChangedAt: '2020-07-28 02:04:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'gcbrswtbowdvvgltwujkhah2c7pw4kegpm0vetbn9lzf7or5go',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ztjvnm8n33jjwo7jllcx',
                party: 'rqnspwjljhid2x465mrrrahefmi1ghtleznqvi6qidpzkch8tv24rt4p64bx8i1vg7g9hdw0yd7k9b4ho8lixud54em1e7xl3f6hp8ekywk7tevg00ht4fopl1p8evj9q2ew8pro92e26a2rqlq06otuyjoisqtx',
                component: 'pvkvl0ma1ouqkj0pv1nkpbw43300b4mf15puqgwkyoi7oun811jme9rw7v7eizx6kbp8yiejdxkc57n6yccpfq3kd7oahuxd59ikiye9kbc0wh0jup9q0ddqikk4llkwnb2c019rpes8zvkpsjxemsi17mxjic09',
                name: '3t6abd3ib26eovkibnzxe5muast0f487v8yz81whor87828luc8a8hkssjt3zt0i64g3o746qtpy74947m41nxk04qirtzax6el3j5qq0mh4ygubh2vx1kg713u95o5xkc7er1qs1jka4f400xt8ytun9kmxk1rn',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'aszb22pw80e67ssf9rdc191d52onb7evl4w8ho3oz50pp5m9jr39myw795hz7x4rsbcjs8uvdo4xdztqs23hjvfnepfzawnjyi3iy8krhboekm2raysv7yq1c5vq6m64ximddrinipyhq8yqrlnhohfflzem9tmm',
                flowComponent: 'v7ts9q2puj3b0u4lcqhor7n9fcgks3109a1hvnr5u72lkaovljehcuwgojekpti9u9vpajg2cjd10sdw6shgoer29ul78wclq29h7f005yknais2v5rw7i53zk0w2kpjovcha0ilg8m8q2imu4bpmuh65oox8zca',
                flowInterfaceName: 'alo2k5rw4wqxtlptyk65u8sjbvijs7hndwa9msvx2vuudzynmmcyqbudochwhkf7jr1c2mist4du5rw04fnynha2byzdq02jvaox2jq7oac6tffroexxvaxo75arroq594mgtrguk2wxwnfi6xuhsfsg90nhb753',
                flowInterfaceNamespace: 'xrzy9ifnyabptnid8zb6dyzukh1jsj32zezb1j2j9xq8rchrs76mc8z5cslisl6bp78olzfghq1mg57urdz0ftbqtjpx9szb9a5dxhdojjt2zrxlpd0dmbrme8mcztheqn75gzg32ml2ugm1qtil4k2gq6f10gt9',
                version: '8zyh7ykqcv7qi90jwmvn',
                adapterType: 'bq9ld20n7r92z41npcc05hi2rbe97lcht1jr3e3oavki8zfiym9vc7pvh2il',
                direction: 'RECEIVER',
                transportProtocol: 'vltgdidf6px8vlvvfmu9r5x9gx08aqnxvvvjec3lki8z6ujcqj12q670qpti',
                messageProtocol: 'llu11zrrp1i4bz9piyt8h48aciu8xjavbi4cz561a7njveohm3457wnmuaz1',
                adapterEngineName: '7ic7kuru8ykrolsk0tp50vf3n80z5krjguyjjus8bmgrup4j992jdakwpwpebc4gthp34fhw6856f109r09861r0yhjiu2rv0zlq8tbnny5q7t7rs6ubrreefwztri6nb47fsot2e1z5dtybzuz4knon9dxzlpzdz',
                url: 'hbbg1q1skin53b7imp1lquw37br636o2h7u1v4ezav010a7d1xhwjbjttogc8yr47fx09cavonx1u5awwien33sl9mucqos37apxxpp2bpstl5kbyssg28824krks82p6k65i1ctiq31s7ct23k1vhapyheinuakg5tbwfy0xmvgep6jk5ll1vjxooiheepo47uvwkjg0xdunmwggrpb6suzeg5r2kvwg939cuv6n7r2gn6glnu4ij1gx66oy04jdpi33oc0d54arvvc0upvktzykxk9oxtyi2qs18cvo6ij7z5ayq3br79p7y07zmj5',
                username: 'add0plwyscjd05m7kw8gz5rlq93arzvmww1qaqbehxs4kcbbfjzm22kawx1b',
                remoteHost: '5w7d0xdfkssehh9ytdu2ohpd9af660o6vrfmoxwpftmqhvq7f1d2a85budn2eqsw0mst79pz93okdrjfaamnjbm2orqu51oiclsxjzpy3ezkaxhfltr5egv41phkh9kkesucnsb8yi4s0pwwtqyit27710hapvgt',
                remotePort: 4915962630,
                directory: 'zhe2aajtdag7f43by6upkdsx5qkwkl8qq6bf9r87gedqsk5i7ghwwro22tyeqtd9bmi73g9ziutm5m76y03g7j16mmryy9a5esk7cbybhtpumckup5lbcji9fdt29jzwij5cbywv5g990vulog3tx9fv9joy2kp4ucbhibjgisj42pyuve5wvuf9hshnhi2oofp65mqcw7h9yd6bfc2l2s598w5r2p921dxczcjklimlgt0xqr7ap37mb0hkdaylbo5xw41cxk7h30grv36a94h4ud99urjrb7rlt21cp8iq41rj286neudgeudltxmdvqr8nm0vail52bzcb6avu0ukoe1mfi44nzepl0gf8eplsbfg088buwd124el6vw6erz1mx7a5ip9g5mm26r7q7g0lasqxaqpi6mv40wkhiiioztrekfwwil55ixcf28mf5hiqikkc37scxwckzuekgzzf2hn8q8pe650un277iwlenufuska74selc30xwmiy6a7tral1kg25kiuj1n06k1cihjo2pak17cnhy3qtzsjctlp891qp3y1wqcojb3t5sdf7vdatnl9k9q0ncj4bp5gcbsgcs4ojbri56zdl0pyfwewv6z3tyy6w8isu4eiexvq8j2jb8aogsls6wihrmkk9jyza8u5l7j2ss4es8c5rcszxfvg6e3pitk3rt6pvic3sfiw3a669b50vh6q3g3gwbo2jd80vsyl8ex5l8sn4v19aiclst1zbj2azlom7mvkcdgusrz9wwzo599erk8qphi5f3gpkrs5i6tm8c3fh7u1b0rdtpqso72uo9hp0snj1seag9rxzbp6cw4xiveh703bnae9nnnzlcuutp8k5aobntu06zbqjp67g0ykgbufakd94mgxz8v19rhq5ioxtusd08jhuzo8csc6jniqhvx17eltx5mouartbdwstcf2bb5e0ftzbgjmjlm713tl23mefmm43kq1qdron3jfqkkt0fbawu18s8ulwn30',
                fileSchema: '88n7fvmjvtxxj36xw6u0662gmawsio5ydugtbp8t7tcerunwegtiymycges9rac89jjrn1exlekcjm8g0lyi2l3y2jeooiprxcmeu7niprd77p3r7jv77bqti9nn09qa49v1tp4jetyg0njbcihhwxepiseqq9dme024pcfn7l9q5nmvsmhhk0wknbqkmvrqnnfaw6l9iysgnoarpeb2e9zahlmazgvmbhjg2cija0xogvo48z8fxfv8by5zkedpoal4myn7t1ssw9rvsay4cdiqjmmq6rrj6azcz49i89poj6gn07qfpylh89kgw2uovjo0bzb4t9pptax9qrkg9y88egv0eel3nglhyvidz4x8rhyemkeee43xbyj2y6lmkic9hme6y1xeh6vqf2itwce6f4qu52uznln2c51blxuxb033eu6g0po0oshb3eqt0odzyhfebehfbx3ky93z7fh2j9u9nmvhdwx9nqog9jjk4928ju5afmuvsqndyfacr96m9wa6rnlm9poemk3vfgmtxtyox0v2efljvum0inhbmr9obxqjigpp0p2o8mr8tltqg3n93agn3mstgl6i75ibp7q6o70gt2kxchc3iegug15mejolxvzs57vk49xcd1cvoorh0fo74xhj3fjm3k671hi3fnoxbu3ttfgiet4nvumg4njde3hk8kh2jzr7pg3udn2y1etgjzj2phjljhbsuiyu8atalp4xuoomurcwwd3slyjqr0ryztalc276fw20lv7978lldjkyv4bqu9qx57pebt6cchionkecuyce26ul3r7dzzll1mwyej7y0sa448kln7ig4xriqjwgdjonbf5x4k7seg9h3sdqf5fhbsmcabx91mzis48bxohooysscj9hs634n1n2z6z82ytwb2bzfgq6zje6h4pnp505huvph407jj2i3l6hkpj6lamfwrs63ek81vtadr17bkixu1tlsz9s9lw7v6ivc3d1w0wht2kx819lr07rc9n2',
                proxyHost: 'gog2rv141h87vx9fl8gfaf3gz5v5adju61qfmfz4acvvt7p3fk16gvevngzo',
                proxyPort: 6045739170,
                destination: 'd7xnfaipwfp2m53s4bblmn7k3r3lngws7ah3ri75gg2rafqyqumbmh5880sm5noc3f2dxudjpj4cm67qet3hwpqxnwk8qid9j9s09lmn46c54uqqhsqw3u1z3ubobu0ajl5yb2k8p2iklcqid496hms77sfdk4zu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nw2dfgxznt2xzjnd6d9z99tvlriuzdafeydrdgjsqmw4u947xaqpyzf2l78k4900w2gbkt5cgmha28c75hc3gr8528nirqt7k4ecmaib2mzl9mar0kyyvn5e3lxbhc0678lfvjj5vylwylm1gn5caxsvgrdkj973',
                responsibleUserAccountName: 'o17airqxyt9r73a792ue',
                lastChangeUserAccount: '2l0vkvayodk9q5dty7qk',
                lastChangedAt: '2020-07-27 16:27:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '2o34zrftd0vo21lkbrqdhy1t937rzonaxb1iqlruklvtqrn0ll',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '85kbt2gch20bwyq5a3y3',
                party: 'jq54110d9dismkzm1adrsgvpyw50yf36fa9gnz4legnzgrcf5mkpqe0nnlz611kkdj5p82m56m23y4gz48w8nvtnw17i3recccppkjbpwvqsv8rfina6po3lkd8rrlga7bwksyd63ogyogcf0t375xtdbav9gylu',
                component: 'mipdo0vgrh97nv3epum8am84lsfx76pg1jlpunsq7o1lmbybb7bozjj22zqggiq0777keyuty6akgh5q6kfzd7b8w0uhe30uh3pkufo1pknei721g9vxpda98b4ay4o7hil7knucucm3fajjc5fv8cc4lug96rnq',
                name: '1a8jpqlef509ipfkjud368enteee2lhb9lcyesxsyiel26tnmzp75vnvq9nl5nss8g0yuhfsq612ij39ym9z0c8k5te3pa96aajj4jowe9dg2wpit72exndsbniyq810gvrvzsn6ul7nukg8ftyl7otq2bbq6m7c',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '6dmfjknw0qy5cnmzdy46uz8x3wg87t0tqjnnbsszk8kow64sxw0f4qgnxhxludpkrk4dc9kwfm0auafq7lyexbwmfpsskbe7xwedpxd71yptaiupl2iz4mbauah24h5r8hkd7vhx8y1ameanzu5cpypex2ctehh3',
                flowComponent: 'yan9wcnqwtmxul7cb3hjbxorugevrye05uz237pafpbaafgoaam23ya2fkx7npuigucd14fm59abaim49j2gch8wnfofwfecvfa3mwk6c72ppeci97jy5m100qiqkps16hr7t4ipgzr591r6jti423wjfdi4np0y',
                flowInterfaceName: '80nqztwwgkdgebhewiysqr4tq3oluktb9x2il4y6pyj3hk2va98vynh3qv3gxvrnwh0l7dj8acwm9i60o9bj2dv19gke21kcl6wj2k273bozwj2iemh0g6b81d84zgg3na911r49tgvmbt3fvxqduupsptm1ebn9',
                flowInterfaceNamespace: '3jlebd8wdhtnpxalcxdeuz2dwayecorge1q62oso88e9h7xc8mem60ujg2oybj2zc7j6x6sq78k8gu1cofr6jew0gzebe64s7umozwbfawt2j0sj717qrdldo6f7fvbh3auwlq5ygec6x5bws1leklh3b86z75cl',
                version: '1oh42hh6fcnmwxp8fgvs',
                adapterType: '884tbnj1wqkehi1gaeq55l1la48w95fulrui050s3qphcsnytf9ix87wd9gk',
                direction: 'RECEIVER',
                transportProtocol: 'jtfl2ld4u4kxnhpxyk01jm9eia456c6jglzdkqcdkztohy6uroj76ejccu2h',
                messageProtocol: 'hch5d6mezkwr2hzebb99hj7yefzcf0xocj16pjttczhp73a2pr91jh4h2hz2',
                adapterEngineName: 'hymcc1p6tgywco986gt25y5hk58sxrqb1u2l5a9bde8vjwxcrzayvsxkewgoti23cop71n80620s5gogmqkxqj2k8igrts2mmuebke94slly79ago743f0k1zmurv7mdrfxg9ukvg6knc1qkerj2femj94g9kgse',
                url: 'prny50n5xxdivzq1cbwcnil6j52yto2n98qbmami7gouca725w0dmh2pfbb2czchnd4xpkxqnbstgs3x729rvo9kfoy7p8ohgvurbih7ws2lpamclvunjwgssfp8vt7i70jd6iiae11o56iarsemk1s46t7d0czwup4q84dnhcbvhcftcvtmdbjahp4bcwhxxfagxvhc5f3h5bxsabfti1of08krc3rbxdzfcvxzbyka0kbqe5r55puswuab6ufdcsz88gjh63u3rqlq84o8g6qf0jo2e642vk957pwlirl5slj48jnn7r01r7yvkah9j',
                username: 'ol8o2ogx8cgqdiqnncys4a0wrb2pc09gn8lqo0w6yay6j1yopmhd5aefg8jb',
                remoteHost: '1k31i633yd2oe8v5we96cgrwude6lcxh915p01i2bnim16zamfeum6kzjybsonv2nf5q6ge8nz69machfdsfghrx7yuxncljearhivcmt2hxm9gobofel8vfdvi6n75vcn2goaqpipnhfw2w91ax8gaf6skbgrzy',
                remotePort: 7078885697,
                directory: 'd19m5vg8ebcu8mcrbu6x6gt5fsf0tq08cfivzydl5qzlzu3wek6ztbgm9yearhsav7u8994p9dvwgzagnhut74je75gbyp58w6bo80pvhyklgtnc84myn0bnl7pc0sp1v5wrh261mkwteycty5wd7jdgaae47z5yyf31knvkrwle1qxaazkfms5dx6aw0oa112hv72zrjjtprju5o69obx4pxswu7bf76r1n05g23fkyy9p4o5qo22hrvhmmsbcy7wetjyh334gda9ex4iryzh5unlrclfuvcyu91gp01eol944b51dsbul4cn1mwg3k0elbxs8j0nnuwl5v79kednu15nhxg0pewy34tz6t6tgecvki9m3uaarrjmo7ojl3ifnvi5yamhs9z5ruwv5coqxwrn8bv3qjfim9jfawnu747p14m3e9jz7yvi36l9k14tqads7t65sfcvgj91rydfeivnrpvykr30qvb23e9h9gj9994794tlal8synkagp5ain5vwxwpthaayg2dzsxu09xske85ik2x7m0427d4u4ct3g443bpi24mpeyuwnnq26wq0bcravbxedm3yfd6ch85x4l11gh4j1nf6a081hyhg9fvz9gqctdv3sialil3juwuzd9c1dxclgzmpzotqxihb4qdwle76m0sgfs0f0pchcmo76bh4h49w8n44989fr40jzf0muyz7napp00kycdrthqegt6t2kscy79y1zj584rymx1crs47jaremjfzmmctqcqtg1hay9hsvgzvxn8ed2a5ktjrbggj666e1nty8ksor83fpd257h82e7fxwysvq4imlf9ex8ixyxrhwpah1bpy8mtgkbmdnjzsmv5jogqh9isvl840t96dut4hftuu3depl9maslfidrli1zksvga3g6u8kvda4c72qxzwu5qmrlmhxuyrxa0yzbfqyw4ptpi4fkpbh2qw7hhkd0u2nr1vd9p9k36frjf4ky945a3fsn8d5gy2617z4ha',
                fileSchema: 'ws8yh94atsaixil9jfh61nrkucgcjl7hpsookbxvcxhre8rbkpuyzygn89uhpxmdj32gjovujftu5xpa0a2vsflzuoop0b303d9mncgfdma390fdoznmkj3k5b7239klhll119qqabbiu6r1jnzl55cq3ut70jx1cw4f57dqg94d6ta8mggmcjv9ks70df9rgpw9k6mdnl9w9a2646a6cpf2875thypoylyhxnkwfcypzhkz0m5pbbed1gdbavo3lgvvua2krxyslj2a9634lzorgzng2tlx4nln029twbqevpzq91csuosljr6ppoemt0nbj840yp4vzbmkhh8lq989nzhgl8d59b17bmk5eaoz1rdvtqxb3zzq2gzk79n4sw0t8tfahf61tfib6tx0avroxshs9n8ghyu3bh74ei1ix6s4v5up53g3daxen05zkio811sfqt13z1qozyhavzx47lxfypewd95h9df5pr9afa3rleo92rjw06ioy3i6zp3ht4ns63z2og6xz3h8p07f4yfuwau7eual82nek9ierx5zlva9ksgwkn0cd0cofub0uoqznfa4pil6bjjyuzhk2hnols13lwoqw0vujackgi1qm6z5kl2aqi6xj4ulkchcn2m3bl806lhc18z4e14ysln572gaqqxz6ke5lqxlwo3h8r36dt9tta9a295r8ic5ur05csjhaktbfsyo3f3rzeknjf2ybok555k2zt7sf6iaafzhq4qk7mk7d28yml5srgcdnvbcfp7iwrknriryjnv85ojj9782xzjn9y72b59og4asqjmb6nq2hp8i7nmzcuhrqtaj7rcxsj567f0q30klhuvzv6put3uuqtjsty5hyyqwemockxe252f2jt45lk4s85j47bum6s3wsdn8mptrso7gdeg201sb72swfw24br88n095j66jhd1gl8muf1at96kr2gir21wa1wl4rjzp01pe4qlp4y9tscwyzqp0dbduh5w23qgw2cwz',
                proxyHost: 'x90rwmbesauuiw9qgjoa7mf69s4rqrng5f3194awky8k8n1ac8ybmstzyy8i',
                proxyPort: 9837827395,
                destination: '9tpjshqxb97h7jy0t0l1sjc0vlyfceeomfmm72u578zusilc8dvjz2eq94vf8h0nocw5ymlawdha2bpumgnbmwr2u75efsbf13oio5q68zajzjzs7xkkdt6j39wvuutcvd9m6taukb4uhx4mb5scekza1o3bhsc5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l0ro3pdi0i9p69j8cv7v89zl7riyqk4gtocf5cl0424lcxjpcsss25f40hhw6bmhj4746kygwn7umf2s1h9cxmn8ivyl8bhan1ham9p2ppiou82s9bprxvnejt4p8rjy4m5wn4xd34gym7j7cqvwwklqxlwzil94',
                responsibleUserAccountName: 'p9gct5cc0yzcsdula5tc',
                lastChangeUserAccount: '7my0904rvhugoniasgqr',
                lastChangedAt: '2020-07-28 01:34:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '3jyvmwpkfdiojtqp3xwp324gno0mg3hlo6i6otddm0wjci6h0b',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'o5tjcht8sa9b42xshhab',
                party: 'hlh7u1j4v13aiawfna3jbwn9o3t0teedlx2iu9uxtmeg2opfdskfkgowusa2829le5v3xy7swtm6evfxoq0z7ro74r5eo3valtexm7pc89kh79ep28mt1rkitvpy8xzx6k3rp8p6rn1qkf3ddvv1ud3m2o055z8l',
                component: 'b5j7i95mtpn12rcoofhs7bs9ycsqlc8qur47rjrx7epla2sez23bnyilkeqajr1sin58d2cqtwmmcod0cn9656qgsdulspuwxjjn3bfte44etg77077pkmw1zjht244ayz2p1nddz1xvznkvvrkafkjij6sueuen',
                name: '8tejj0oprnkcmk87we913x4tzf0gvwzsrg4oz1yzl860lughb3rrgf9waiallpn6xz4j7psu1pbn7u8cb7hmkqjz4pw9ttc68tbzyyf73rrs4niy5fp781yw3z2edunr6v6y05z4kc8navcyp9wk3h1kl6idrtxk',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'nswttk0e1jmu9pih0ueoa55ojz0ha1p9q47ys626xwoynrehc3yi728uayj9k1q0j1fjvwmljguj6sq9epua71i82wr3r57vysxfyeilmsllzhkcq6rci10rrkvs4o2ke2pufh1p3u7gie9xeq07wnklkc6yvj1b',
                flowComponent: '6y9q2etvats68ccq8ze1gjyejicw4bz0c30gh05ra3a5xm5lblie6tuotpletlnyf9kkg8zimssgahcgja2y6rfbdd20c5a1xj32f265pfwn00nt89us7w89z30frjjibkazdvb3wg95jaobpkbuv1lqs6330bh0',
                flowInterfaceName: '6i6nacltef276u5dpj9kk6m03a7zhp30d6vd0h8wf2xdxy4copa0vktbh44ziro9x28voyiitj6n1qszkish2r1rhzrlg5ym7dxm6ev02su4hgth7pxb4m64bx7mkvroonoku4ljnajonv6pm8zs9tzkyx4yacvk',
                flowInterfaceNamespace: 'maql384s20z6eqg1vvnav7gf2w57yxv8vyqiwneg74qzqi9r70uy743t430ly2u6c68ueebrir1sggumgcdxkmhhqxv2act842j7q1t4pqb0ugamfj1gtu5hsndtmb2anj7oyhr8a39ystoxog5bnb59nl8fl2x6',
                version: '1g8s81z1bjqcd9wevaet',
                adapterType: 'eaiz9x14qyfvx5ckyr7zkcdvahcgi0aqewcc2mv9qxg9kdpk7lj14txgl606',
                direction: 'RECEIVER',
                transportProtocol: 'tu8on0qftq2u30wy2m4mkazugshhchhwemzsxe7bns1958pomqxozwo9fcsw',
                messageProtocol: 'krzhhhyqm992mbgnag7rfybyy60z1v0mrnwb9do52nwx1n715wkmy0arsvdi',
                adapterEngineName: 'u6xvfrf77d3rywbqba96qhhxj9yfx5yxthbku6oedipn6uuirtu1petwsk6zxr5xhn2yadlz75wzbwok3b3nj9u2dmt353t87wo5khkxm9o00p2agpqsfm57gdwiznqg2jpnr0sizahbkh6bttji1rx6i2smnr2p',
                url: 'b9ff2a5ab75jfd72gdd13e7kexgwyv7tvbvjb8827v5yjh6jehuq9k7ysp96kyhn6mgmeb1ge64wyvtouveo7mpec4i3x3wd8ileiwuyg8ak7cgghe3m77jdefzlpm2f5sw10ftrchpk60plgnrro9wy8kexk396003cg9ibfvxoymtyp2jwhi44e0e87wax11tesyat0yg3fjdxe59uy9f0qtczvxwt1q849g9gzn6m5hhw2u0qlc6o8mb4xrubli03hieleh4zgl6u7idpopji00z1jlo1tdlbik22hcbpkhes9j07mg2cevo72rn1',
                username: 'wzcdzetpeuagvx7h10dkh9v2kgwynywtssqtlwjkyz2r0oul8ogity0ddl5xs',
                remoteHost: '428usketoddnmva7i6zcuuh7bdyo5vm6hcbdmkv1pwh2n1pt4jsk1eoyqt3qdp4fe2we0sg5hblfq6f0ub7c9glo5pbe7dmcshpqzcqoohdv7lf989tney4qnaewmw507iunp4fnc8asrjkfgb95aupcw6d0v1iq',
                remotePort: 7432746495,
                directory: '87bqcimi34kd8q72pirs47k7744kclablfk1a0i4522rz5ly6htesnz5rjz2xteko4vnsw1g4xtbgpnas9e0urs82w9qj984jy5ouydw7raehjqfz1w04o471gbmudoa762tqyofq9cetiomwmrxc91xhppv28vbv35ajl2ykfuk4735x1ly2ctgyevb10k1phtdl1a3uafemyajxvp7vtqtdbxpkw610xtnszf1q415f08gllb8dl5fgl2igcrceybzc9zbovkoc9wk611ba1eycgcqwr575etzzwbchw1t7nukljkjntj9ocyeq671exzv10up8777osce1qz07xh1rvs2ocxt2s7qm7a7zofk6l5qwjpxactp6zi8ckpqzqz1jtbnx9l80qp6eqirjmcrku9ok4adw1n3gug6ff7k75jqyiqrquqixx0aooedkxr36z1xnvstxlt3rxfa4ymubzls6ylthqhymt6z21l34mae9lw6yrm85ejjf3h1grt91mtztou81rbhiod3fv8jq8q53ac4uve1xfu3od6avit0jszg6lvgyafu990s6djqfac9gue3v1t6zmdbra30y3zskcv8magm4r1imti0teba7011arqw8o0gheg52v619jdspzkc9j7yrwbkgi0vnvf0gt0u8xqhn40wdf92fz6dkzmtjd1gs9ts427yw1319wjnqttidg4uts2e9x64hd2e4b4k416z9sumrwo26x63ged4b2ncuts1sxsv2g82exwl746zvsbzfkvgtv8bzh3m6az3gshmw10cydm4pq4r7mp0v7bfqmky37syynr71gvbr09hbe6kc0w25w6e59pmciwdrswcpbik62lbkmb4k4o0ky6tkrmtdk1rtx04t8fu8pcaenog0bghnwug2uzd4j0dh0uzj4za3siu4cv7hosx0iqkubjc7g3d2umxle5zjmloeuqelcziwooospkzhs5xwehuqllbmmrneb83lcyxndlb18cb4ijw',
                fileSchema: '784ssoa66146a45l9m9frv1000dw6xfhpkiibb4mie78ybx05hxg4o2jyscxvd9cbxcbkqkctrq54tmkqodkrh5jmsxqsqxq6iyaxqi6sx3ajtir83atiff7vp49czkq6f5d8v9hlclfoo5eh87svuahgs3i89sir0h0yzo8dohkpiwo9bsfoqbe82j09oimp9mvre3l2qihp5go5dfnlv830axhc1ahgs24t9t9hnw7p4umfo0l97kpttm7o0koeo5i564www27m9txpyof1oho6pd28x4cnldvabt24buwqchyl8skghxqtmnuck8a0oe1gqdd9cgbpvb9g7y5u4spp43d3tqn8yw2o4lfwf0aio0llcoevslhezp71p2k08i2zursadbndrg4v427qyxwcaynr6i1yexjkg1dakawjrvnnxe4wu6rnygkz5ypoyw868hbdkywonob5arosoc1h3a63wwwta7co72g4cmf8j7dw1ohv19f8bmwf7zrrq3y0ymcrd6in3gth6ol7yinly0fzje3tjzituu98pogqeeexj6aqrifqj5dd9qsr9qqsgvhcmie673ybl2s4bl70nxxy20b59ln85218tmjsvrhota0eu17qw2dmnlfg3beaw4el92ihf3wd9tyzon1iurr2gkkt80m0sdfvwp585fenkeiq69bi2jx6k4nigukx7w2yugt32tsjqrtqyjj42hw12n6lydme1deqpp3uk5a0x53tv8i02nncp6ksvdhtl3hx9gvqiwrwo3fvj1yyl6u5tg32ay5i59ailkhdnabafdc32ahn7ctowq65gtub6ing02g9tt17u3100zon8wecse07g9qt40m981ocam79krehkefjpwbe6pglmpyiiygq26oalu9xbm5mtlrtupsktqt94jn4s179fxedoan2couiljrjlh8setmvnn3pl949nhf04yqdx2qquhj0bok22kghjzp7yf4jfurjzatv8vw48b0vpe00cu4',
                proxyHost: '74p57z86ef5r2gsmqh051ib9y1srvq4ceeawmr69q6hjfqy0csptjbtrawl0',
                proxyPort: 9153593754,
                destination: '3xod33lngn4e3foc7o5db78haw842frxrqundym0qv8g78dgrn64gk0fx5cpy34gry6xv5vv5ojelygmjugqs8pz7cioncbk5azc000vebshiagmq5h5kzhh7uc821wy5nc8lwd4fmjtkh36sernrdrfy4j8v5xj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '02tf9tablkz01yfv0bg0vjoxe70r3spfpw8hfren74r1hppqthhfi5853ql0t629wgo11o929udcqlvvclwtcy85a0jq7u51831s4odm0f7udppi4mf1zuwdp91udhg488tyit67u7oquc78ejxi59nf6fz300z2',
                responsibleUserAccountName: 'ojtk1qjmmysadrtq4w62',
                lastChangeUserAccount: 'oizxuuq8lnwsf4f52wqb',
                lastChangedAt: '2020-07-28 03:17:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'pwyo6bup0n9j97kx1triisij56xyjw9gn502l8sq2y2jpcleh1',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '6iib3htgiea8x160oaeh',
                party: 'heyqqwkag93oo7schkrjav632rzy3pdz3qff2kyvpa0t41b1dwlmtomon9pw5vficxeezsdlg8es6k8oex6yl1bw88jjj550kbv2nplm2jtwnd9az824snwmeb5t08pxz7yjwmk2m9kxgeml453qqfq4kzc0smqy',
                component: '7bvo7coyd22h0fw5ydwc6r3cckrfm70gilr4zztlpkgyflw8ho7guy3ct7r4wjdn3rdftz2u97baqkc19c0tmhiz72wk3t80yjrjf7rsihzlbm8xmcay2mmz5hdv74snw0jtv345rggph3exphehbphf2x5s8daj',
                name: 'rziklmb2bc1rx5718ulbjk73myfxnypbcjzlf9u5z8ncpaq7ih8p1fzm0oq8bq5n24waiz5qpnbrgbmytx4m18cn98yme50indc1d3oydofu3v86xulj23lh3ukonawg4nddew2ac41uxe2kwz8ce71bx07r1hue',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 't5d98qvhmxsbx16im8jcnc74pjb05mcbabdvda6cq1gt4wadnyuauw9xdk7son88spipxsdsizk9zl3sobqev7yujo1n65rfi6uvyzby4919b6uk0cybrb6n0cailr4nr8joqydm1r4hg4nuzhq3x4rlcxaco4es',
                flowComponent: 'wutv1tmaw0d2cq6buj4dmwn9cfe3kqs0mrdjigg4927m9201f5jblyuu5mkvwhyi6ofbnln6d4qk2ls7tlvu3zmrz5xdo0csu6p5blytl3g8so4b34uwjllqrdwwyu62g2jy8geuz3axithu5sodbcxum92khlvj',
                flowInterfaceName: 'z1d9yof3o6ism7f7rj82n521w80wxcfvy1nh8wyjfgkjpc0sbsejd1tw1dwsqgm9zivql0kmkfxsk5qout7xxth174rnp76on094gr60366oa155zoqz1odm2xe26ceqytoladusfjs7kmmwt9tjxxpocxfv49hr',
                flowInterfaceNamespace: '93v72a3c60v9ef01gr99umzyqyqwvwond066vciswmsar0nkyhj4acwmpdqbfkd15v81j75kojcbczyxyiuv0a41rr46s6jhx3iq884snm6964o7i6hzm9jpgbqgpxgvsv8gp386v7pc9yk0tg85p49bje633g4h',
                version: 'lcfd6ep5z3343rzuuch8',
                adapterType: '9b1jw715fmbxuts16a3y6vypy7c5dzi3sz9h0rsb8adgazc0x18ln556oxr5',
                direction: 'SENDER',
                transportProtocol: 'v2kgb5lj1imkin19wzk5xy8kgrkc66tozozu5k9767o27kmsg7yheox8p4ic',
                messageProtocol: '32birhsx9v2l28jet9b4lg9v3s8w6p3sf3vs2xbzasn4tredzs7pulj6zqhm',
                adapterEngineName: 'yh6iii1e9a9mdetvk4p3dtbyjj0355nyxblyirz6xmzfob353nhfm3utl39ky47vpbfm7ld390b48kovb5caxrgxo1psmbl5p975w5vr8purvm1pk1vmhndjgkpkmqt81elimlbousnhqd00tv5aajv6pv5qep7w',
                url: 'b9ce585dklslpduc542zs0pi5mir46nrr7q19nzzfivujd9mqqr1raez3ryondn409zq3z85lufau9tyi81fizuwy87vjuf64j152n6u4v33cepjrrevyt3415wyss1gcscdgm4hr93w3kwbirp2gmxrfjq264x34wjq9eno59qt0e5xiyhp2l7h45v7c6xdy3cgtmsjhej7rgekmo2wmbifhhpd0eht72u0i3ptoy9rdikn2wh8wo5uas6jwzhjgo57ejvynlpbgrhckk0aigkz4gec3wdl5yh4vu4o28xk9bvzoz9s9adebjyadyje',
                username: '2de9mtjkqul6q6lj1bw6end6em3ptgfczrocphcbn4wso5fnilkv6cmb3v9z',
                remoteHost: 'vwgu1ufove1zg2dj76q4s3vsy2kyva5oari3x19obbw8shensbgyfl66jjubf2v8p8944nkajov654adzyrxay4hn9e1vo89wg8r8z1ty3tvu8kwy1oekgz5ndll22zosaigzt8r47uzg2i7ejxcva60i5zebqfbw',
                remotePort: 1366386222,
                directory: '8melv4q7wkkxtm72znreqp8qdfk1u75m7jtk73z4cnzgnhgv900xzoqwjm99l2s7dotwy6156f34bkgkbz74jtx8m9vsqag3s16csziontqe1bquuzf8kxapupq6swqmbef8jdwmj0l977qto86tzytnt0ik1hugtqkg98vyforp35k2x6til98fwf0690i63t4v468zzwhxguz83c4136yynim5ik7s5gij6p71ykghowphk9h3242m0zq833yzw921x7spg7b6op5lcmnv33lxm5pm4v5xyhfxd78a4tbptit9sxvtcg5mzo9jx9uq5y0h3gvqdhl04mp27bd0f8rnaael3fv966m24mvc5o17c3af5ogqumovibi9aepryd87hgwyen3y6lbgrvo79goazxbt0zohzui08cr3nerafhfid62m6en9ph6qajwoh0xjre00nqwj49y8bqoa2p8tp3rapw43tbxzlql6hbfp0chbrfcblwlr1us28b7lmpnp1fx97p84tygmi90bv5naayxi84ewhlhh6nmpo5o6t0ywxjzxqnm3r448ext0xii5njohc3qubrx0xqt3evh1npqxhwtg41qpbvu4y4r6u0e7inx57i07aqigq5h3msl8aqiqd5e76jc76is6lyr5uqx8lf07ddxbnjpsdxmidhnd1rjgp0vesrhk5qprbz6oyrz76fjfosyne79cgx44oc9ftd5tqvl72zn8q6wlhiq3jaqgvrmc0l616bcfu4v9vywm5i58oeotq3a789isr6gfhlwa1jplwautwccz2fseijegby3p5n5ouik47sfxkep8fsmryz5tz536mq8edktx6r3uw12mtpbg41v9rw79ow4orei44nm3ho6tj1dwnep67r0914u8lqasuldg0kqchvq3o00kf2r46h95e90upw59l73lt42e10p8xuxi1nzwn0qskyxofbb5bu25zp100psjnbtw7lq80neiis1nvtq10csrxtac0h1y',
                fileSchema: 'p7i5whk90ypot5ay2fggv95uuosveq0x2chjlclb3n3sndwcq8ee1y609wn5fpmeeqad8e6wa46g7fpsdwp4vrf2wke3d9xy7elxzxsecjlkner11ppx5ar2ekjxqs1mbh2xqgbnh2md26m0ngdrdersr8un39uqgyx2g1zenkxlji7t16od9ln8mbj6gzz3zw2ky0cwkoo3fcu4ib2h9ey4rm7xlcdvzrljv98uzppanr5cnl9mhxwwyvtv4qptcf0vl4i8w4juopgqh5lqzayiiwemhpdcrltgaehg37q03n64iztcjxfarqzgwiyimyhvjemdtukz0vuerb7y1xu2miuhrh53h1hw9xa91y9bu63f9qp9lf214afvhko4ttiojh6e3o3gr9g63tv902jdxob29g0qnryo4zfr1p7kk78ot2mqg6lbvl8p9t5nwadygh03h8u614zjky0uzd21gdyl28qzed42at13abmim15ysm6tf68957hidy9o5bu13gqh6wk8kf4mksjm6hkebvzyq6aaxsqqapwa80wzhjfdwppcg7oto0t0id6ny0lgnm6blj23g8ssx81ebu90trkxdpfcbc4usmgn0dcri62cv8h742u6p225ia7a6ehd4uhdrm6nbo8vixc8rnkagadjb9ak01q0c0qqx7usbk4b7kplvjhx4s3ad9ojjn3p1lbsy9lg1340xevtipvn4axj2qqf6axo9rtu9vivv76m6lt0zli2uloz69gupuot9pjmbm95siyunxh008ejpshuphn5hvkc0ggv1ze8j065nownsor6qd6bumwij69rzlk5fda7k9ohmv6qju7j6l7eytoqcyrj6g9k0a28lw0bmjjnpwvkb8ky46qgomulm76znragglv3aojx7970sd7a1u69gfsmfcpos13keqbbtxir9jjteuipcauq9hyy4n7yqkcjrjijs3z01rvaa03vobouzpwnqrn788u7nb9yvby2w53hkmsh09ck',
                proxyHost: '3we44h6eu9s5q5f4u8gycq8jkkbbrow8tv6y2v9vo3425agh795ioddvf2gy',
                proxyPort: 6623476873,
                destination: 'sncjevt4zvxtimdhf1t7ykr9jmp4yniyz1m2ap0m69e34b2a6pc44lwn89e0nfj6odm5hcwz9u36jsf7vw1t91v7yynw4l8olashloufxmq1mkn18b6rymajxsf66qqu2anlfghkq402sfksv6h6r3bdmyz3711c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rahp7m4iltxkjzo0a761tnt9vdj022cpqc4atgcabm3ztjinkhsdknty2qwbkmil5wq5783juuxw48usgyu123mc2u2f6galdpvolgbz4e2yk65viovy5ziqahal9ae4eip5qv5y2hk4r2m7l0uw9f6jj6dqezwy',
                responsibleUserAccountName: '5iassckrtzwwmwmu00us',
                lastChangeUserAccount: '6myk64yqwq7wsu3swkn5',
                lastChangedAt: '2020-07-27 13:00:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vqm6hgofd0kc09h9zq4hyamna3fs4r6nnheffq28g5fiez4tug',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '4vg5k1wbnoizrmoz70rb',
                party: '1xefttmqjjcbl4ozv05r0x60tqsyjggonm3hvf82o4jst0vilwiilregtd1i4gm6fp6fezqbidenqtit40yf86rbo6h08q15n5sw3gc1ytwkckgbjcwnljmoxbwx98p5mwxw9k5i5ibjozwwz76g1d9eym2gyxhy',
                component: '4i1xuo6maxad1ufcrgurtzlk1c85wcij30ntb0uun0skiurj4aj3qs2njq3bg3fc98pxy60o6ov3q3pe59tw1r11eeg8r8o5y574kb3fuyimzax5j4jxxctwo2zuvjpz72d97eu0hdt1n8lr8ajgb6nd2dk95wg5',
                name: 'vrra8kcowz9iccp2p9lda05f117lcvzssb7tkww9al8occtv9fahwc3y9hw6ks6kr5yin5l3krwjg0esjphwu5xxd0zh1l572q4d8hgdjxmj72g86fofydsk0xjqsfexp145jv1wh7urgvdeplkuqwr3ombclhyr',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'vv3vhm32kv8rzz88a1rbqa3f219lpfsy9ghtoansfa3qfizolijlt5y32wvoia7mmme7q9g8imx5i22ddva80y8epfmbk06he7ctmjuqyo2gq7sgvaxesj21e50zhttr1qgh66trzn0pyq5ow0wwqbzd4yywy1n9',
                flowComponent: '5ok3fs5jip67o72r1wud2z15z3ufu6fpjyevgdhs03tvdoaukamfrkejb19eqghoohzp1phu4kfmx2rm4woslk9f9of1didvmlvdv2v4mwwqxcjnd9t4dw4fm8ol2o5jyb9iu5s40mr8oygc4n69hk5vxvzbcb2o',
                flowInterfaceName: 'yenp706etr2hxcs68eponlcnxnsoheu07ozxyuh5hs2vi1ivdm1dmsdppkzh09xrpa0a6orlddeddcvnrvem5q4hd9appwg34wgffngs53pd74b2bttq9opugvzmca7oeva18nr0tc0nlxcpu00sdbps6eeo6u4l',
                flowInterfaceNamespace: '98tutwptcc9cnyxi91t2g4mml9azw0pfg0odo1lakplxblusu62s7ww6xbtc39khpcowt1w07ext7y4l4bt4sq3zyowf087bqqdk8mesb84rcpmnkv2e9vzhhyhf1uw3svzmeumqlv9mbsobjqj5lyo75vtvjvy1',
                version: '10o2kvle3guyvq6c4nuc',
                adapterType: '9hfpsnlareskqtu1rqp4m1h2akr18v3cjon2ix80orxknva9sa0tmgpmk93p',
                direction: 'RECEIVER',
                transportProtocol: 'jht3hsazyx0w0qz30ti1x5scmqp8kx9f534k0ulw7refw9u6ym2aqsos545z',
                messageProtocol: 'm5wzrhzzkfxcbp0j62vejg4jy63optkx4cnbhkfzknxw4glu9r5pvr46tw5a',
                adapterEngineName: 'xcaiqpn8061mbkf0ac4wyb3371n4dfi7ksb8eqzgyot8jp6yebu8r3kk1pxt0qsr0w85exxmh6jf7uijyjid95q1kqceh4d4i950wgpmdau4v6vbs5h0lvrzlmyzy19044ard8d06o3b4908hrgex5j5dxwc6h8j',
                url: 'k2lhbabfkzuo5mroai965p4nw6aqe7ogj1qhii4ky3yplxopmd5c527v4fqml5rrisfbqmf9mk4ljev65dp0ptyh3sdkzlruk4dmapo35llxtva4gnq9lp8grjj5ieafr8ugutfwz62ne4mz0amqj17zt29h5h4sowczo85grt5oakhpvnrunizxrwoko75cn6u6ohrbup4t79xlljq5hqh6fgzax0q2dhhtqheko668scgw9s3ie1d83qb7fbswwcbv0vur7dq5ltren6qnxyf6yxc04mfup8zno1j660spz2mopjbbgue26j03pz86',
                username: 'uuna8ni3o8o684phq22ae18jr7kzlnw5erbgmzjxw9ger0ya52mjvlm5vffh',
                remoteHost: '37kj163781mu54xogsx5ujpbuihum51z8dvcoxt99a7c24lrawzet1vw6tiw51kkyun7vr09je2oii2l16np2xq077u9lhts1b47pvm1lmeuklts9miw4lmklzoa7c1wdpuy8gpwq2i3mms2sryt1im1thr0wkzk',
                remotePort: 97971725079,
                directory: '242gxbyz23kllmbv7qe7k2k2fsg9spsruq1hpgrdvgt74rzgnlf2qvwkshyj4zers4p0npplucxk3cwxpcya3a46s5qvuu2urxk61vjquaelslyjdvon8kvpgey0qywiu2m8lqipd6k44op26fcjhoan6d6qhfn663mvaddfy5di68vu9o5f4vo178bko2qdjtt6ir2nvmwphl2t6k12qsbkr2rgr1622p4vwctj734odj5o4o8eblkr7p6r55o8iwmr4ktzsuoo4qdudt0t9bn83nujoaqjc78jhjg3yk079h0ush4jgdv816tnh0a7j25koiiswxj1zp8itxwkvgqg0z0b5f00lax390flxsmw11qx6taj4kgzltg8ke48sgxrt702df53aefcgys8b5n6ejwmr0x2xi4sqj8kuvmvgteyf1h6zo96639sh5osbrdmht8tr9abi6uz6csi9jwbri1y3qyagvr5i1uh2hgsoktl6qqyod0vy07s61wtsgx3w0w8m5wlvkf4xsx26o974ofeh6vx4kyk6t0a4db4b97g4wvynkhwoe9bfkw12qhr3yoz791rht88m4yh5cmqyurpe2sao6wsv6pgndi9zpy8ywf5ya8jlure6j0bvnb3i15g8dv67y5bn3btfqp9qzparg3anxz12thgkx7t4x7w8jhoen2e4dntma5eush4dxt4s0pg1pkn2p32lsmytzc3qbu1mzpikuf0lsugbdbxx1qojq2cyv6e8t56p3waefk1kdjjgodw1mn64613gcgo1q2pbwenw79wkwb23tego9s58lqr35xbwyi86zat2xk6aut0w2yoitkf7x6bqnyndc6xwsapejygrt7qetcn8pjrptoroiqklrl7wb6owdvafztmr4igy4j45xs6box5yheeauulcsp9kpouaengfmsomwfqxkgx7eq8ijshkerst1xrq3k7os7xg9vuxsngiqi86qs3ki6lcgfo4466ljldpfxo9pehg5e2',
                fileSchema: '44528ae27cltxh6ht9opyddxn5260msjpvr0xlo8d1400p7fdeijinsyir0x6xlc3ucm8knnsdtnyuql6brchwlakw0hohjln1yh5jaikir9uo67e5q5e4g3h9t26r48g5toy53v83oobbp6e3gfgrck07dfiwewm2e5r5shjps5ou41gskcocdpqkz8y02t48pubb6ohsm6b7clk5eyftlybqut8tg5wp5dbka5dpynlenxpnggxbliaknxt3b5hpieq31uhyrufxwbv2eef90oa6hbhzbjjnic2r8sojyu1sv8ble68747gdui4a4d25fx30y6fsw21ozdtr2m4xsssr4cjpe3utofltcftsnnrmhkpoe0epcqtpc48jjb0bpchp3awq0nxc6dixt8hy81uy7ph8hlf2amaaexfg9owb3vx2op6nxk6jt1whz2nuarv0vvcp5z009uisg2lfj0kfs5rv0gzywjh6ix3qje6kcrkmluz30u39jeadd0zre54k4kbekd2tzbhzfb6d5euoqx8cmc2tshoupw9jshpi7v590cfqo22vu8zuahow3djzx0h0xfe7num9sm9yw4md4knpghte1m7of3p764yhqcqvin2un3825zuyfra5myv7gjmh9mc693r14qzw1z2mm1shb4qntm34f3gz4mo7vqgijseze3ocds0e2wum7xvlec9x4l0jaa8x20exi5ybu7270aq9nopkeqqv5uckw14qj5ss8okcncp6shaxv92vxst0w36rmfqapohccsvpso99qkj4ale1azv7cexz452g4vnktbc1jkc8uyqkc4b9v5mdtwbdzdkmq6zejx57a2ql50htkmjgnrrc51drmdarktbmlga2hp7dneuvwlra4tn5vtycuvhtkpvk8v3521s93fl19aoltl536is3el5gju1g852wfv3as9sr40460o3mww34uw2j397ha19jotmup3azlgtulc20sx9um1pin8epwoyvyg3456',
                proxyHost: 'pr2hh6wye1zmvionqynfn5cxx6hru6a0398owe5r59c4a4qvw52rlbea3rs3',
                proxyPort: 7314342739,
                destination: 'qz54m55p3j63zt1x359be1gznqhfgeuiucl63wl1db6apxo4vh9dv2tdo4mww0wiorr51fprvqpbs5etk4a2ja6s145b2zepj5d2grdjk77wmof1yszb0veky5s59ygaav3e8a7js4l4ekvktjqe3zfbhsx9ukin',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g4pqnhzvzg4utiun0ctsqupk4ejen44fu2jlgx2ba91abdj3ua6ocn7g6337rix3ksrqwfpcifxkn1ivftz6nwpwygab1y916w1qmacmapkht2btt4amf9xuv39lg2skbd1rhcy0kle3wyyinf80gxbzr4hqgbty',
                responsibleUserAccountName: 'wlhn99xkxfhahtzia1ro',
                lastChangeUserAccount: 'rlcxdlvnaifc66hxxtx0',
                lastChangedAt: '2020-07-28 05:02:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '39no1qppk7ei6q0ffexpjbvyjt4gov4a86t1g5i778mrbcz4lj',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '3ssjragvtg25jsfqxhtk',
                party: 'ih4655qwrmhn93sbc9j7iikv9oljkrot61vr7u6sd8kgrq4prs6f0xtrngmu0iv2edw5fjv9vuucm60qp4row60umkmcgbmzu5gqg0oi1gzp2eglhx791s02505yicsoxuochsmf4wkpp42tvvdku0613zrdlenp',
                component: 'vbmyu96hz5vqlnw1nqbmpo03j1godpu5ev9vqzrbqbcvnoyz11ztlian371v9ssgrw1uhyz64q1qo6rqw9beb8lbvp7laehsyq437dy53iunf6tpusw4jocj5t23xmftu0w0f5sna5ze076b72knbhow3ewihx39',
                name: 's9exm8jykknyqmql70s29ymtivrz8k2e385q4aw9qsu7gsw5vn4498kxwj4gwxul300ykv983pxuctuf808clxyldx50lo13bze80wngwt3dfwecz3tipa4cshcoj5kplz7ztveohnjzyntqahofnw5lrubj0qfd',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '91ey2nbu021mtbtsf58twbkum5hov3p82jfa1iyheww0p22qehbwluhpzte99di8twplyqane9okcwzpcmly7hu7h3p8foe7mf2n1j4ns30ko6hlb3izioo77nr29k1gbxs9fpmn8twqbic2iv628osonc2b7bmi',
                flowComponent: '8xjgkryc296stxs0gb730uau8vtxdaeo0w0q9zp198mzj8fsxbw1hbikp1hfkbhxkgflm1yjg51t7cc60fkvu684u3miukyj1hwwn37ukx5hgjd00ua66e0a9vnkwgujkwocvv9ua0cxkw7qvw3bmwg7cheok2ek',
                flowInterfaceName: 'qvx5qdw7mch8wwwhbnmo2x71bwrys216v02wwm5ddyh2b7rl4kd1251vwa08pmeiep25pionm8eqhjhmc3uam3og8c8uj9t0f79mw35pcz8l0xomb9vlnoxabpoap9nvcpvjtwwmlagf63dug4l51jn3kxqr4zru',
                flowInterfaceNamespace: 'pmjl1032k85ammsxa1eits8zeit0x0so7dbqqx14kl4tqgpzatt9jj5gs7ajx1aqjjuuo0g0fqq2oksnkkrp7h3enqsu2u3v2s4ktyap95vymhjkjhoeg9ko3edkmv04j2e9cz7oh2c07z8zvh8a9vkcnkbb66yf',
                version: 'oa33nx081j2dpl6vzszn',
                adapterType: '7xsszws450v04s3ixgxx8l2a17qa77nys4lmf1kzigwnuw01miuvrd4lthdw',
                direction: 'SENDER',
                transportProtocol: 'sdnautkbx85ykkbym0fivhtcjk6p2zujm8qb0k2ocxknbu9a00imipetpvfv',
                messageProtocol: 'uybh81no4io05v904qe6ldqam1nz1howupr737citcc34onvljqllh3jpprm',
                adapterEngineName: 'swntj71lm1k4gy637noqf1n69cce8mcblnu2fr30fwkhdk7cqjf0mt5394r01jdb8c6q37kqp0xshsuwu348hdcma36m15jkhphu7xi13nm7avlydacsd76ggl0axbc57c06anheflfopdyggt7fjywbkggs6i1k',
                url: 'biykb51cdxqjjz2vs2mal8r3jui4e7wfjksjeyf5i50b245c0ph1qetddctfj06loeo75t9tfee3mcgg008bta4vd7ses028tzf6xvy7w2y7l0p9ukbom6ylqcopwsr91daw5wn9kinxbsqe1plzh3cqdbrfrzo34f93maxv2vstkm4dtfbw3zr8dmq0oik20szvy111tq81ifpd4x029mqp8oe4c6ha958oew27uxlur4gwrkpdrw7c1rv1qgy76tjv1jq9q9qfr2o7473j3i1fgf93cfepb9bfurxu90fav29gaktbmekpabf0ipgu',
                username: '5gpv6uocewy5dfh2v7j1ps6stwz1f6yi926n6cghy9ubjhjf1mf1w7mdr8s6',
                remoteHost: 'hdjtlrvxxuj1slmnhdj1xezuub85x0gvpuzvu0ww7i7e5wuvkc1lbyp1gfzeycc1s4ki1nsf6t2g6dngsvtn66d0te23g4nrtq6osn55fdrk4or642pic45e4ebg7zxvtomj7nbj4r6v357ppvc78xnt9x8imdvc',
                remotePort: 7569399387,
                directory: 'f8is5v3orq2jtpo4tvhiuixy05fesc6iqy3n7g25qi6jjzeqv60pg86jzdzzhctfh4hy1fqtgvttdja3ctc1qtd5ebkzvne62zont3reg81gv71n8514k7z4xh1niz8vheh2g16ow9km2rgkyhp6k6u361uke5ynv2un88gy57n7eivnpx9ydk7rms0y1kpi9fbp7u4njy903vl2h5n86llr89cmxm3p4852y0alhjmmp5spsvamodwao3ds2bj2ngjnjfdyr9yrv18r5dfvzry61poz4oegxee7pc8nlk9huicj7i7u27heg11qstyt8ridq0ct309kriqvuquubyi8awitlqt3894859q97u0f523tboyjdg5jy4dvbtni1rmfgkn7o27989nqa8zpbfq63wfuft8dmu1n5pw6r9g65im7iga912sh22zu3vvyquchdj6nnv8r0l89qqmpbits271zef09jnre49q0damwr8wnhbghj2mmwi0bzw7xb8sy2l873y9az1zvtnjems09qc8zqv5t8tipbzi66jjd2un3fls5m7f63sq0clzz6663ljbac4ywncv0f6gaxelo713fzrstkpff3zhxa372wabdajen25kbdyitpc0zans4b23gf1q1e5vlw9297q73ii0y8yd65likoc5ul4w4ml28r2cd6qt2vuwtfp19ur9czqsyx608ms26hdddlqeyo88l2b2cv5xl8eiozf9lz2tvquob4qzrjvtb49e577l9v54raw0g172ct3kww3b0xmbrresxi351a2etci0dlfjy7ahrqib33hmc93vrwjr6fsmj6yc04zc5zr96mez6n3golwb38eoykspo50h8c8w37f4ijri3i4tesnrlpzn3ohtw1r02yv1850obu0c034mpsu0nn5xfgch2seycewsmsws65vhuxuyt9li4y5oek4vo6nnmp22uzdr4ojd41q3ispsi3zgpyi6wcv4hmxq5cg521yigaxfxp915w',
                fileSchema: 'nna6x78l9kwbxr0wv7j041mdngae4tv9gk6d512nfmcskoo51sskyyovwej7sfvm1qntueq40swxn2yqkxz7k63d6m1zoqydfplrh9s7hv8qidk4u89ind8w5wtjx3eidduahmpr01alk7cd14ux2cdthk4opyj27fd0txsdlrqdsloebsp4xctkwbu3vv8okajpc8w29ijlh1ch8mmlnlopvh8wqrgu4jrzcr17wyebujsdufrk2wyo6o4tzafpxpqj8n6zokmnswudvh4alr4ujrwwxd69v3sbiaauepzujuasr7zu4ej4bqjwr51mr2swea80jaut2sht2iehcpl4zabuti7qxkmjnh1i99sfrorl3w7ndgm1tsuuqma069u2rk2ro5txzulpaitcqpju63zdu4813lodi025aazg8eg9kcad9gi115n182vzcm2wmlxex1fh32hhhjamohevihhjs8r7tor3ujfpgqnd29ieszvljxdceihfki6dd37mtkgrnwk33xjnyhglgr806otpn743lr24v7x2oh8b1359iygaey2tudv3j4bkpekjl6ybebxttq8bwvee81f0pim3qwoo863jcifuljz603t5y1sj4bukxv3b8wktipj8qrrzb695ouc8k4b0nz4pofeqlqbrmd0jf4f72hoajwgvcdve9wtz6ba7iil762gwqafj1zcblio537njyth0qc64o7h5l1opps6le2cf15ov01cwe5tp61ff432f557zut4elbch2kpg63bxw0fp1wwo9dnuj46edf3wgcayiqgf6k1jgdpvg9hcocjvwugofqxljd37n6kbn49rd1e8a66zq0l18eh1p3dnkul78ljn69w4l31vnq3htthtt55g7ci0t2p78cep1j4280r7ktzkepvfjn41cei1z50hoy46y83iuhijfjbh5tgdy449lgctfy55j17mlpbirdbndf7pr96clfterzp8e0nkn9jf0f0zwyd1a496w9vc',
                proxyHost: 'd76oej7f4zo45qj5ablih4d98ui2kbq213d613y2zrykgp3ufengnf4i7ktz',
                proxyPort: 1795317125,
                destination: 'xg0liy5gcxma8tsdri7vifo5cghk4quzr3xffc9qsra847flyhr6ofkpxtqkgft9emt8w9z3pn3ew96lpv5xepfyv3s9tik1u5c8dwqebmtiq1mdz2ifl24o6801g876v2euznn56495tsq48t1ebn3dg74f1o1u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iywjoexh5p2ngm2qjggxr17odbhiwx3rq2p9jsj2welcere6yapi0d8u1v7fte9a2riyrvz2bj7s88n7zdwwm5ssv5yusi4sqjfwzkf82o60ph5krj7tc4rt08acglh1ktub5zq2tsuzpj3fgfcn27k253b9mlwa',
                responsibleUserAccountName: '2rf8wxjrzij8meu6qqtr',
                lastChangeUserAccount: 'mkobnwth4ynfiw64zehy',
                lastChangedAt: '2020-07-28 02:25:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'g3yk9ay648xe0c8c0bb255z2knt657hgut4bvy0m8fwasmqw1u',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'jifvzuza5ajju3wsrqsj',
                party: '2smj4fj3k8v5hz6cuuj60apf576221ao8je5x78nkgvn4atja6e6d7h36s8fo2gaciryzny0u3uilgv3tjioao3cxlkkht4tba28o1q8tsgok0zy66t4qibczyg9k06wmx872c7x7b93eshr1bu8uziimj655lq6',
                component: 'iwjonwtcwnc4aggzwbcjg3iarr3aodwsudebk3e2ch8y1841hjhhr6xtd0oxcnjx39gclbx7rvgdyw75ic8mamopr0n1whj7n5nj2g4qg3bq42et33u68uc9kq4r7e1apcxx2y0yoqle4cmpjx481wwu3oly09h0',
                name: '4uuasqewnh7w5ofjgx5vn2twu7ietqukbz0jdg5lg8xi7yvln21iee84wl1e8nthvneeez2whwqw4ls59a2dyrfd6leg7wk1jff7jn5xfy4sw2rbuqcx32m899ardv1wefvtp7mla3s269s7nclk9u25si25xx6w',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'b3q4agep7f1jorlxp39dx2d1igcog7kjla925ulomkp2qq1vmd94yq8ju4w4ucc8bnzlejeeyqlezuhmccfedjamh3ylffh79ccgebc64bbgkl5l0dfq5sexo6irm0tjxchodh4obysr8mcqm2c6yvfy66hik43n',
                flowComponent: 'jadqb68su3bqrbrx7k7ajaxjoalxstiidlwf3jozcujpkbf893fyi83tne2gsvu1kdekqvgd9yh1i2hx9yk88i5mr9c3txywb831g6jnkzo6mn7knaqmt77oz2g5ju2lj28pxlayd360atdxr5zlwpzczaaezzae',
                flowInterfaceName: 'djm065iu7zsecmodzfkb8dkwm30oqhsdhqkrp7dpzvq9xofbtygm1y6ihn6c7q5g3rna3nxvwqmhkh9e1h5judgqu2u38ux0vmnyf882us75yl8nyxxzku6fq2ku5ed325lzh04gw62s69p23j15p7c2cfpgqtcj',
                flowInterfaceNamespace: 'i5v2j5djw22dsowq1vs9wr9y8xas4u7ujspxlzrraox5czw9qguove1gcae1sj9gv6qfmenen55hkkt9b8kb6gtk2fhi0eoibc32ipq9246cdegfnd0m4nq19fyb0yepz3qz43f57kce64hd7w3tepxatillb8dx',
                version: 'xic5cey0zpj1meeu5wr7',
                adapterType: 'q295wx9cc3v5yst1tdcbqo0b2juj3isgogm29rvsl7mmqa0om8m7cyjrxmb9',
                direction: 'RECEIVER',
                transportProtocol: '2bhlgw7rvzxceazz3u2nn3gnegzgou4h2nscao5dcdjfm4oqx9j57njg3lns',
                messageProtocol: 'mgndfyxrx9iw4r6lwvrny079qoa1gfkjt3w37onvondnhmbfomr6kpqvbrql',
                adapterEngineName: 'vqajghrnglkcovau2jebyvdkmlcu7wy18rsg9vyqar2gdbe3v817dmuwxzsgwalsrk3zwjwoi6tje1c4btu0n4fbi948pctnfnwigh3rfy8t9jmzl09ew3zby1gnq76h4dp903ij7krco6spea13bajwrl4t0kyc',
                url: 'w1y3xfg0gtyc5dxmbjz6ltc8y9n9t5w0fuv4tsuuhtaqbyx6u871g3tyrphx33qgp3mm0o15il15hv1uyqmqv8bg3apfssg7v2bgvlrqgpsmfx37qv6mob1enf7ru9w74gda4qjsqyrgomecbdddku36xmjjhkcgocicsbysmoq5cnmf79jgz96aefbcnm9hbtrcf5kh4dff531cus4noxh4nyve4hnmlgtaemzoz3qj7719hoqchie2x8l4xrr1mqmr6ynne41ls434hgni5dw7h9m6qh9goxipr6l2yjk9jx2dygyk37fpq3zfogei',
                username: 'zvxjhgs0ilcvtzfe88ixq0y94m2tm7k0qzimlr25x4trbk2k2nr57788o908',
                remoteHost: '2llsg7vis3q5jb5vhjf2ya8ey77sz8o02vaw3vmf2gjrtmzceaa951006apn7rom2rf56svizw0kp7pttk56sl79faj35zsgawv4cuw04tgqgbf27hmn0wezgjruyfnlei6vk0oadtdc8a230nux57cfektalfzh',
                remotePort: 9154921069,
                directory: 'tkhbvgj9s1xomq0znyzlhnmj8tesf2hoz3grmm6ddxytr3qn3p81ccumb874rr0h3triw43ew61dr1xcfxf7658i0lbjf225z6bsfb9drzaiy63cu3myb21gmrjtwz6fyrj3k91us7wp4g9kk3up225lk6ep8zqfyycqintwkf04aav3ythrvvwa5r8gzhwjygvy0qvr2jvzfjx7ac2vu6hey7fr8egqpn7dguteqxluhh5sszt0bc1tdabtgmzq59vlmz0kdairb5xyjinbugrisz5wg03yenazio66f1k7jlx66qr7lcs0cbo24z65tnpxpkbocoicstchw77rn84jo9stfcbjgzew5xqgek4gy3r6xtv5lmp88qkwrczsi44ygxgh0zj9ra82xkiljcbi8bnfrl3flqct945pq65g8cnej2swoew2eh5i8img0250vf8kogczp5daxmos8lhredj80olv0od3fzdpdu68720tqbpweo276nryfmkrjxhy2vdjltm36xtpgpg2n2wyvlmutex7flkysrkiyuh2cq8yy1fv46te50q7r9d97vwm29gjm3dcjo5z1oarpfrue8f4t55khz12fjrkuzsn1l3qlz85pbtsq3zaep4wrhln2m67c3k0mci3cxtps3zjtnxiu89z2duuxksncyrsxcf4npixvf2dezs2o9ozplxahe6092cru60q318lfjots9q0d8tcvr0abrjwxgxyemxzfjqvokz1pa7uj7b2fgqvc2771wnu8oltcuyhoh9pl7ofxqu7b2aah3ub2ursrk03cgnkeiimijgdduxjnj0e1rianupphluaqr5lkzgay0bs9z6yqu1l888zqelwr8z4cfauy7i65jf58ivz5d4be637scb4l6k4cyin92vn5t8uh8ldopd6oogdlj6confiyowa0paklvzgaj51jv0voocjd1ivicahfo8utrt42ps1mfinsf5w1f4eaqsrf5gbjwhb5eakd6gipe8w',
                fileSchema: 'fekdpz55e4qdygv8zyervveqkbskhros1xsqebhedt72rjy6bk7ypk6jz6e9y0id7yj4w8msorga33vnm91d2npduu6dwise74jgfy6vz485j03zswngilk2oiqlr1rsvlejltwlsdayzthf22ttqm5kxa5zl05hsn6a3n083tbmgpb6m0zd5w49fbcrmnt544oraxdq350u0iufzrkoo7kymx42xotnfhcphmifowctgw1pbp8037u1nyulniiaomdjipp6pz8t5ocdnf7ne6io8t1qvbqzw85ztn312lkan9f80wgp9f686sas52fvwpt0tx2z77nrcsbzl9oc6qpr32az7cpp22a42al87o1c40957wneff1m4v8mp1ymh9olvupueawc8o2lsb6430ym0t36i4p8n9forp4o00i9zkwcoa0hrarvahkxtfhr1mwtaddbe9kc2whm1hqhl8ztx2ehqzp71wguqzrl6qi7gvgouzcs89to1d2fy42j7evq4ssfj6pmy3bcy7oz9bgzz3zb3n12ebyl95bt016iq0xioo5e0o2qx136lygfn4f16pmcuiqq8sxo1478e884412ebl2zezgun7t9i3jnab74sheax0jnok2uae3epkaaxdtso5j8vhqbdaz9z68xk4idk5es6ao7gfomvl5binld0xxsk75bdmtzg59adm9fm26ep84m7f24ast3me2enrappryuqamd3b72kzxw7r5zp8r2d9q9gkhbt38ge8498p1id8d7tievaj3lgybp751r2346zq6la9ez97mipf53yuti5h1xbg4c7qvyis52yyd0vjfduigdtycjiua04qpjf2a81pmi46orfrl6222dariiwid29czata9j1d4jx73lcjdrp3qr82jgspxfvc7ve121snh9gwee3wt8m3ip8qvz8vivvnhzawwj4fhpetdih9ijs7ngsyeaqjm4amk5rsfg66cthveav8t99co2p1rolue34k963bgyq',
                proxyHost: 'xujkym3kn89eue1dutcnz8klh8mh495j5eokq5xntkflrcrvoj4lz78h1r3d',
                proxyPort: 1890765743,
                destination: 'pzrcklyek9gbx0lrx0g5fdsf6hpamw9yfbejt6ig1ooq3cier6qs7xtekm5vlpny16qn4h5s1lt15im37n51fwxwxxwzrc55mfp59iqec5wes718x1qeeawnpdz7ykc15lb8maivd1v3sx9jtltxm8rsok08d7c0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0j1qcya7brck41nx6csy4w7nqhws71pizq6m7zby210uscd7ueyj2006adq2bbe9kp2fpfacsclprf889fne54j8ydeaix8khw8kq64npy2j163hgvgwmsqf4d792uente1op4dli7viha3brgyav5p1p6a6mcl2',
                responsibleUserAccountName: 'rt4sdzns4ladod5dyjo0',
                lastChangeUserAccount: 'b62t2yqitoi4onpntsz9',
                lastChangedAt: '2020-07-27 12:48:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '1rn9kknnpxitrfsh5pt43oc063yqpl4fdk4m8ip67ry47j1j64',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '7mmy6imdcxsj9b1vzrsc',
                party: 'iy04c1kxr8a2su33pxdg43flvchezryk72zs633ywc5daht148y1l9adavx9w80b35nan5k3qrohf4njilmsu7y6cfo4e2m0xhvqo8ap3ue13ab1mblv24yssx13yszhujdgtr5c3dcomrckwdt7zp4tiba1qmac',
                component: '1pkc5wj9kojzdcbb1acb032zh6wa9ygsi023ggsui5hjoa47dfligc5zydl5vrr7jl5o1ozqj6tkuz8zijszdw918vr3kvm8p5bm3yf1jpt5osrk471j4sbmgffzj6aih73uo4gmrpemup67s850oiomfhx0v2po',
                name: 'f9gyycdod2047wevjvygdcpd121ehlntq871nu5gf49t6scqyy8ypg16xacmj2m8vqzxx5a5vutd304w613qo38l6jreswglys33co1j6vcxxf78uj5ez2zpol3w8n2lcebm0idtf3v3qeiwunylbcefbg66gogd',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'hmtbkzausla95m9qjn1mifwjus1ikocilhzegk7kzqplj37c4ko17lfab1742hf1sz3zcft31z35fy7ar5tgiqn7wvlxd40jpccxlp5bv2b6zg81fsotw5yihls8uee96iesj7u2vufbbgkldgdejvohbvcze2iu',
                flowComponent: 'ydb4mkq9jf5zu23lzz7ndlzppzb8vqbmir129faj2411buo99kig6nwzz7wbfdel2joor8p5ni4bukm2v5iukuwvzsxycgw3mrjxsafq5oso6k8gz3r4e0lwcyo8n30y1xxj4r25nb4yxt171mdjmiasyv70lpsf',
                flowInterfaceName: 'v9ftnxnpwc8jc9lvnmegiuk9wfyxnuvg2w65ignpr2y6cqx34rkn8n1gcmsq0rzb4jua5qwroqvn5bfuxglkyqeivwf8xflb70aieeca4dv80wrixst5tilvn3r8o6poto71gs4fxtdzfe2ro45isoodigej1e1j',
                flowInterfaceNamespace: 't4qjihujph9r3g9p18zj2x1kiuhcbo4krpvh58g87p3pbqdabxn7c2fs2ly3y794nmx75dizmypa11no1aa70btoc932bncg3ogebcmh50owx3gym9xiqxd9oj7c7ci8auxyym6h0q1ycds4nhcodalkaa1765av',
                version: 'nvfl1gr28uug2e2i0umq',
                adapterType: 'l4j39vvbq33sz5xkjcn2jyq4kogx6pu3xxiurbks4sbr0j574dxiqx080xwo',
                direction: 'RECEIVER',
                transportProtocol: 'ze04d1euj65zwnscotbylclesq8l9yqmlkamvlmy5rnkwrvbuidp1n1pcc7s',
                messageProtocol: '3v8cl0jvzrwfo8ra7jy0io1ghngzldud8lmwp17kalg6gnpbwd1q5e7i4lg9',
                adapterEngineName: '2e942w38a7si01221a1pxbpv9okwjiv3vwto06m043m6h3nkg5blftr4wkcci4eampzrr0nacik9w8ur8kkqqo6995xyinue25vdzwjt5c04xf1657u5tetncf5eel6whu26aojqv61xo6k8xiydviflhe3goavo',
                url: 'zzgvl0i49b1mdu1sdc1iwka7mzcps9t9cl4wroom5woy7o0a0oiy4o904jm7jy5a6afjz30wyqkeomqyovufcqi55c9hdmqilor888rc6cyesvlyk7z8hcqbthjv40cwdqdqenhdinzop5ew9dpad7oot6e56y2n8m3aashpc975gye7pvyfiekpnhjq9dzse3e81m76d4gmfo4dk6yr1017kutwqbsvj9j9ligsb4feo9f5nskj5l8ch31ow63m62bca2f0pwi8y709s969k902101l2wbtfce2coj0izyxscg0ia4u5wb2m0cwic4v',
                username: '2rz7zzp54t954qdj7zey6rr3jx4lewr2fu3fy0hfafatj14s8uy7rfxhczmc',
                remoteHost: 'peljmcs3ftieb88xlyg2wgknx00ycqu0tf90gl29fzgp485qf8ikh4npywz93935rbgzf3ngsr2r5j51eeb09wwnz8f00pt22al6sp63qhf2cmnxse8b9g0j0gq00h7h1szf27we4rvq5wm23ske2lp58ndux6e9',
                remotePort: 9005172535,
                directory: '6xvettiwt2dvunxxl1iu2hh3kt9yihfb8dfk01bqh5niq880e2kj3bmjyoemiwtx5qrrh7bdkjudoivi6kb6xvp4nwalj7d430yqwqqh2tn1y4yg2txmthjq3hp26ds1et852a7w7ogaiy1uz9kfevi010yup0jgi6i8k8qc0cqnhjzgf9xmal79wpvdapi7lcmk7yaxx4flantcz1nz6r4dvx876u16lhuonlsgwba655y1tmxqipesmbzhf1tjrndv5cd6wvihz4kiceq9uh5r0iu603nq7rue5je3iq2v4uw0b7a76jxpz4lirybdcrfq3bs7uoorwesnx9mqq3tkzqalel17s78qlq2ju77xbpb3zvatyirq7bsuqttcf8r4zndwk2vgapapqs17p2begfk5vwupbc9uind33aik3dvvmigvufga23wrsu2rl6ty7esjqo4e4tztrfz4ryu0t02a28xkvunnohh0vrr0bjiu8macssih1emxw15kk3cu34sf2hi813yx19eq5hsoaqe1jwnvq8dlywrev297lozm0zhrdrhjr1v2xl64ievkp53rilqhhl6qlm7cb53v94f58mf5zkxqgkml4pzmtwnv7zalsc6y5jzazprr5z9bci1xau32105dlm9p6461uun0i1h9ip49r4i2zuuxz143zzptyjj18e6pbk6hneaua2eciue5etve0ihstuzt0t0oxl9ys55mh1azm4mtxwgyuv8zyyeneq788d9upajp3eo0172pc034a6hc7hgup4pjo58fzetdcwgwnh3w4ovldkpb79fhttqd0uzt16af5viuax18gsqfmmpf7udo60uq92lz06ip8r6brpclcpp8mt06mfyszo4aqh78noj38fjhgrdbzes192grur5z5icl4n5o9tfi7h7oirhcvm6h3f569wqbp9uokkruep4bes99mgktj2pgxqwi2h2dr6ddhz9h0egc6ufk2w16m0kcjzvnkj3tkl00um3x',
                fileSchema: 'm3uxo2fgqpy6sakz0twyqjzynegrwxe662nvtfrpy527fvf1q4m5ubyeqzcf75n6d79ngck1apfa8hd7oa11w9beqhcnbwb2dekn1ik6og2y8uqeo83yjcni897m5th2ehaw4an0m58d7v92drybk6rimceyndwu1jxpsm475ovwzv0idx9zl9hi71nhtdvwjbitp69a22rqo968dzbvao5dhbkbawuq7ug5l8njg0j7jzvhbvlis8e4l8so6m88tlwfudg9kx85myexmzol3wi80zjljtwu9kyp8x6ql9foayxi8egr09obb88bpt3d0v9cb8zf00toiyh2a60ldd3zqdmw8b9tlyjsu5inpxud9w2yhxanih385awahpgahyb2to6mtld7kwzfoj6yke884xlnin2t8859to42s24sq8n3orxp8lppnyrpywv59g2ho4gf0d0tvbqhel5brxufffb0xs2ky2rrkj99g2dzz4pk2tyhlfn33qk314n417respxfci2e3jgcbgyn66lht3479z3vbbza65bgmfwjzq00707o6p509cdsc7rshzzh7l5qce91ytxiiptfqbp8yc3raf6l2heekvxsukb5gjz1um0g3ibpozbeph5gzbfy7sjdjzsgxkbkpwi1m36ssjhbbed8xuks9mh2xt05078gzz6kdyu9zdmgb2bgc7fge5sddja14sybbo2l4nk4fotaps61lwrg09aau6nq5sbgzqn4n1882isad9al6x83rw7v3cccpumwjfuarw1oq6w98aw4ko6q5e63uj1cnz4mrrpvxwzodllrvd1561f22ckkb9wm32fnjj6z624zup71edhu8fklj3jr3kfq8muwsxzgcsof951qmz4ki9meprl01wgl5tz2pb2eikuqn67jhlj7y0adx6eb8g02y3xfic42ojtn71l47suusxr6wvxcez6o133lzdsdd9jtg61scodeqozyk41s7ui04ofbp1wtgjfvf5bb7mt8',
                proxyHost: 'g3u2cb8z4t7vtk39b15chyh2dsywfx91eaykjhhtug5e50oljs69c8hi82wap',
                proxyPort: 9774760693,
                destination: '1my1aeuqxfjbeqih2rciufzxr19udlo6fig8arkzaxh18kvj6xxqrffax28t8ebmg3w76ftt14y9t3jnza4xb4oluga5d8yrrzhxy4h0x8gx7y1bvwwt5h2cabdrggnisqkejl59s6g7zd5i357oh3us8r7klsrz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nxjxzcasujq99t6xstwlzkdwhon1iw1r5k6zswzfwou4046flyzanqhkgibi9vnd0b21iu64gxko3ofriqrvnia965imrxm6vu714imih4expb22wr0baoh64hzu6hfszcoxy4bhyok8bmv2vn0bhskinne7fo4c',
                responsibleUserAccountName: 'sxmq39miou4b276o5553',
                lastChangeUserAccount: 'duk76ei3625gp44nyptu',
                lastChangedAt: '2020-07-27 14:31:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'htwy9r64pp5zfku96kqnxzhgkpxt743z5u0nw6xqq38ot06ie1',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '6d2f7q1uf8qkj9eyuykl',
                party: 'xgu8sokhlkg5rxrh2zweil0vd2y8eukc5i7xub5y0qk15hyaud1z79mh84cedb8l81voeweh61j370grdajrlc8dgejfljzjv1m3si0msx1i69ky8wlzo9hszgtnphk95hzn6ykybe9lddirqkhebqvum0r1gumd',
                component: 'dygq9x1dxylyy5vj3rriwhjrbr8zack6thumth6gdpfezpiieadzysdrdkijcam4j3b7m2xja5empy3g9mwcxzxbpddm33ua540scv64wwpzvulim1k0lzgp5jvjbr1cighu1wl0v9oads1wo3y2861v721lcg3w',
                name: 'f8kf969m4f3nldc8ujpv4hzak4rpbutyj87t3zj2h5moqveu6ixg6zqkgp0nmd6zinn7hed4fxw3gmjz1d4tz7fsv132odtxpzc1b3vzz8zp5a5zifyy96jfnrir92b8zmn9qlq2nezlldsgjsz0k7yhyib3jgei',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'xkicd5x3lafiaahj9rnilfqi47an5o8ur8m98peg21mpjikpxmt2f98w629qo1kuweijho9l3azt9y4rgmbumb641wh4u9e692b085vsxv320zkxj8i8q39kmsg1km5wwtgba8a7cmdzeduyjhelvterazowvujc',
                flowComponent: 'am0ordrua56ahqvlr3rfobigcqyeluqsiocww9j8y6vgekezce6r9ban8bu2dnzrl3rbzymx7alyosays9qzz8isrbe8ovqkco6wriys3wnohkppryo88qku8qo5d0q8o0xur2kvf38nmpzwrtiig7jhxvdhstwd',
                flowInterfaceName: '7rzjrr2jmhjxenw5wbh7k35c44kgb03homaejyl5pigifax3211imsxrji2ofjduwoo91wclveayxw8hml9atre36w251i37wv5gmuc84w8pvw3350kclrtmekl1t08acmqkanzk0bq07p8tqbeivnsyjx3mtpcy',
                flowInterfaceNamespace: 'tr40a2sg0ehysm442pci8gs3chb02sf8kd7bg3ffas7hzrj3tjbln10ro9h2hwzsz983ryp89deosocnjkv4gm4f0k9rp8tk3bl7fmjfnn7xp5q26xvwfeef3jz7n6rruijawk8sb9kzhd37zsh1nydmgdo97n2r',
                version: 'r1ck6694wp627sl7uvz7',
                adapterType: '0es33x4h2vgckayx76rjq5urt3g21p92j2gdx0o14cmjks12xpgenxy3higq',
                direction: 'RECEIVER',
                transportProtocol: 'rwbhiwj0ix53n6oqwvgzo1ldlmpypgsap85g3fuxz9puqfqvf46st9qkazvs',
                messageProtocol: '5xvxz95legunc2lkxyx5lrv4fhzfn3zng3p3br5xbl2otwu8gav6i8zb6g1y',
                adapterEngineName: 'ynizzx0wg3gcduz9fu18dx7xvmhvv2dotsrxhefk1du8tvt0re59dcmakbu1prkg0u74kczp29exzxkjibruzwvryinv8jjskxwbgxx6slkyxa2qqrb69sq5llta6jgn192ipal8pyvnfu0cmbi0gxtc0t6z8vua',
                url: 'a57xwv385o9b24xg8byt1nfsm5iohq9x1o0rye7cery7soe3u9spuv631rpn532jnypwdmvdwnwd1d4gbis4f3dfooge686fkfyatum3yc7ja4ujkoss0qo1hqykayhd3oxqfo0xv44uftm91h53gk558s5kr8ouio4l2mhnqrv0cz499ztkyhyqpuxitylz9o2y5t9pwdgptxtys518120mc4a6xmddko095olhj2y3limt0mpug4clnrv365xdwlv7mqmt7ml8eozrphw81envx89351tqd2qsyx9fp62s4pvzxqe947lphjqi5xy5',
                username: 'o44e6k77x38t0me22zdgkp9352xl5cmlgzs8vhasdraj5dg7nw1nh1i1rimp',
                remoteHost: '8lviy6t915ixmw0sk5unkthg0cop4wfg0kp8giniww2e7ab8a1rjytejm6hdm7j81exfjfv2hqhrdv6zr272t6sa4wzzjoq5qgg7b8tyxxjjmpj2mfj7l67k15hsw4riyuuxk1ickdags74c7lsmr44zhyljcb9k',
                remotePort: 6848280769,
                directory: '4kfoikoymawhuwldh57xag6ex97ueqyneh71yvnjdftk3ymzq5fscvlwnhatqjim208nl4nd3gjgvs18lyreiri9i3wnzl3ebhutsirpol993c5fvol67stwjuoyu4zvsjs94yanjc4dqurvgd15ilja5z15pa0y0qisvbzlg2egz1x3veir9opfmugab5jp1wsfwefbpzk9uu7t6e1z1k8rhibapspbb0bgq7kcq4s787ksbvhlmipet4htiutt3kbpco2hu4b6of6vbyfjnvdlda1wvyiylw203s5l65lng96j1n3t1qij31ymkke7xfj1cdyg7yn1cfivi7n2dqt7lji6hrq1u6t224i7kuwy6x8657v9ufftlo1u5axocv79wvux5fcidydumpvfbtztgoiqirut9m783pqzsiggvrdw26jir8ha6vjmht6ibl7h2m3kgfx8do2i2jprv2shaw9008soq3hje2imrhjbgnscglnxfnazy9wbbcxllicp0gyuedwk10jo5zbomrtsmx11goqu3ovjc7uh6vvxwcszn3rqtpp3j0tsz2pghjm8n9c3vyqvp665dcfs0mfrpm5bj62wvwez5dd5o7iwlvt5nonn0vw1tzivv56dr0er8uykztbpnv6uucd380we6cbjd2dm4kv61q1bq9gntzyulwr0dtp08ovl94xtq8if8r3ewqpq8ro41ae3l24gv633oswjoghwy5083w9b0nik26mhxq2flpssptw2wk23v5qzrwc6frtwi0bxb6igdjai1h3crpj73upoi2wk1aut8xakb0aw7tzmy78vjyw2vc2v8la3klhiqfs8126ysk5xclqemoon59trluvfetmp3vwics4dpi16jiytspe8d0e2ocoiec5qof0vnameq5yb3ttst8a4qbmypd34c9eykxgmv7yalwn6mnjob2m54qdakonrqlql2ohlj7hb0k6k08ma8qt3xwksq71gw36ao8y0luctm9l9nw8l',
                fileSchema: '7qx13vs80zlfw03gdgja0ysak0vmatk3qwyoy7897oovpnk66h8owv82o455li2xtvlxaqn0fg2nfaoo7v1w6vqzmm5pywyjxbcpp36t5md1s9rbhkwo861ki0k68olme5afi35c90atxo4hu8iuwct90qprvt7a2rg8g0dmkj7blxj9pkd6f08zwbq9ydlzagdgazao564a74v4nibe5zquzee07kazcmbdjyontdr7fl023t0nyv1rxs0z6ollsr1w5w0i12hgnopybzpr5c6mbhqcejk3cctrpsrcqolg8tds1du52xdpfzgdvqw8dwpqjvnxf54y6n0aumfaohwy22y1o52riq4qnu84pfdl82dp7m0tipo1u1vczhls2c0p9pj8yyv3ku2ipd1w1rl6v1in3tfi32is9u7xwtfn4sh3dl34l4tju2ihkiclttmsaams6v86obrz8a3jfz44vtjs0p2gfv15mjx317b5ydl0ezj5cavwqd9uzm3gogp011humnv9ei9ztwsq9moztb5ppplaxhzab1fm3lbig7kw63m45yalv71x7fdb05ga8lqp08mtga36whot58rfw9562qkz54jucggoq740h0gdvy6fw7wnkzwvmfdegz0hvyvxwirh8zwvw34jzkv497iambiziyojz7ec9ifqe2zx3wfnryzqb0e9hzdaloo3jivqpqair0es6qzif6nri3errs9wewybgsjonwk15dwpg1miftmvjzicckqcaz7pkk8tzxgznlqpociqwiq5izxvlgq7b4kgb2luxqq606x1p61fkfwg0r6hr33hnzatngzujl4qhghlt81e0rvxg2fcy113qjj4n9v81go47afhran37dzgwszpcppqthgorgf0x0v1z44eaouvtlwevoxzrs4e0zdqwj617fj3nos6p0ls35hbqnpj66ljq4qi7ttelo4t5mypgyatgti0k90ybizt59e8706nz2grhq3ku3rncdaw4pvnndpp',
                proxyHost: 'cnx9p7qt60dqeg943vku7ixp0xl733wr27a1mcu0wixqnn5jvgd9ahdfmnbf',
                proxyPort: 85506003273,
                destination: 'f56897swoouwqkg7zoxysx0agupopb1d83ob9m224h7u7zpkmxxw3c63fz8jpsl03msrccqh5oz51himye0f52ph6e17usmp5jxm97599j4v0p7dp9v7p3sh6dic4ntlk83znchtr2hoccdx0y7c8p4jr623qt6k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g09o9xbb7niz69o07i11xyosxl85l70tg9im0f60ghpbkzbss1cz517jqpvm2wfwqhfl0syt8bita29524e7cqwrlqs5uwk8rfo8l93yab6qj43smbhf673pt9j1frthl4l2xkoidt2wapjyz3tuqa80nwsfyucp',
                responsibleUserAccountName: '6a2b1asqsc9g3ullnnv3',
                lastChangeUserAccount: '2vmdm1e6htgc20a0dnac',
                lastChangedAt: '2020-07-27 19:02:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '9vhcljwg1m2iuyisxd99xguzm68ro6x54y08bwvipla5dzip0f',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '0t4xx36xof3cgatecs79',
                party: 'ilrwqqrh6w3dg79h7qokcufyphs9d71zf2c36nf9mfwa61ietk0f0xweesuskyo6rpvlzvfittr5r6vgc1gdxr3rmkg01uculstm4utepvt7da4cm0qim9kvqw9n409boztvajqufqg62f59q3oq6mosax0mh1kl',
                component: 'sx7dsdd8dsow2lqatwqheqvzn60mgjkgzz5s0v3xopk4522jyzrhq57wu2s6leu6febyvqi21ck1saen7z2793abuffxquj0qdgp3t0qqhhuapr5jyzld6iyz4lyefpnm00qkctxczvy6q7ry4oc6g9kh6somazg',
                name: '3oke6vrgfvukx5wabw2yru5k1ciffizmy1u7a14odnvugsqz4uldxbqqoqexaowv78jj9fpsqtr7pnfe8l2v3xiw9vw6doaxa6wsb0ina8u34gfajk0ozxirkltnnmzyf1xgxb4hj9u1y26iqewj9rzj9g92dez1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'bk5jih1ih0yiv1arinii3om5lprwydj1fpjjx85f28hlanxc6bor8nppmlg3yrky9wabalcizpxig99azk1fbja0mp24eiiji6vubpxkumvw7h71pchtli9mg5ndvzy485sgt8bhkjjknfy0qpnhubs1wvkf2o65',
                flowComponent: 'o9j0jt5r34jg1kkcgq0bi17htdvm7m6iex4uk4ktavftjl5rnziza86f04o9g9yhzx101xcub32xr1fn2jh2d4gvsdxcvt1hloz2vmo02y59ojgzwjmaun4equ0nbtnevaqrzg3nul5wvanjuij4d8ymswxy2l9i',
                flowInterfaceName: 'fuh0ypdhzt0s6funrt1q855ewyt3nex6i61xbeh3lwvg9eseglqik87h0tjoiv87wkqj3xytwao9sz3yuims4fxuattgmfl4bchei1oi2pwznuhgjrd1vwxgtxe5pdib05r3tr5jxdapnustqrelvf4ethnlk1hb',
                flowInterfaceNamespace: 'pxmrsf40oxrz2b911e0af0atuwy9zlj4n6m6pqpfxba82evgwx0qhrum7n43cms5rrnvp5jsombc0rvqw1lc3hrqgareb9yz8kpzl5pejr0j94usdpbudwwsfmhw87abtefn3sl1xa2rl76301j5lgxhh2o9vn38',
                version: 'x9u9wyfdw9gwuvawqfn4',
                adapterType: '4czq8z04w3gsomimh9ljz4tsds7qo1nqt65l27y1eohs9i64zxetgnjnzz5e',
                direction: 'SENDER',
                transportProtocol: 'p6s4bq3fhyghzina5o7y709i5dek73cb4s7zwp0qx4mri38rhsh6rilvkv8l',
                messageProtocol: 'by2j78kk8hl44q6ks64hi758u4f0v3e58kwsvjy77yyrximq8vdydut9ldr9',
                adapterEngineName: 'r2jg9fs8slz8yjk7l8edfhascqe12xhghuawj264x2hvz182s5p8swpo61t5efkl00eyu6p02sb5asc8wzdaqjpnnj7gxpx9f3esamlxl0s9246wc3mfk82sldrfkl7y3fob0w5vvayohpq07ffwigf8d463kucf',
                url: 'ghhy68z9m1wy47qknr1jy8pki9li69ha4lss22khb7e11qkl7x0fpt14259sade8sixqhn6ltgapmxmlbi5iyl8ofo0zcv4vn1zdf2gr7p5k2jjz1s32cxztkilb3qzqyoed0k67zo0wmm2cuy6kwttbhy34lxmmb0e6zom4osqkqw7fl2ugi80d18x4y5mw5mzb7g05clkfo7hzfsq2p6yez8c87i6gyoo6zfzcicnwsemek4ujzrjn9y34dphdo1hjb581glyfsxfgnd2momroln3fse2wabft79hgpb9209ctwp81p5365lrrlkcy',
                username: 'nrta5wtg1k90cup3qfnelsqvxyofqodv1lrtp1y3imfea2yftnk1q8mk5l7a',
                remoteHost: 'djmol5bmb91fwo8qtlf2me6e7phh1ohfnt8z2o99tgdl4dry8prw6do0drmyr32bx3t3y5a6pcchp26pyk2l8wqgvobzt6jzqarwdush7as64mfaqfa7n8ocmi6zyyimbq5nufn904b2inzv28hgzod9j3b6gtse',
                remotePort: 3906247334,
                directory: 'uyzzefosnqjrr8opcx6lneui1alv7p1l5tverszsgr7hutuatxfv8xa4ib5blshmerdjft1q7nsx5jhykwg9ejkifg68tnxa9cpdgkd78s623jmf4ial9r91opk6h1q86f3a42juwz1pfa7urwo1jahrizjwehapupm0xqynazb92kef29kti3l31rcuh5tylrrylvt46bhqjnl3vv4l79rpelelo84llpjkbmi4araq39e89vcfpv0dkqtj6b8g0i8tz4fbcai4ibz58dh0s0oh93yavt9wukp9sughhvba4o1j6hd6x5o37lcu092wl57iw66a94cz9gfnnimsuci157j9f0vbzoic7a7u8igpodjlwet5vvjbb69zqq6r2i9qtp0wsb4i9htdmpqxd4en2hyimqmkfzxuleeb6zfsl3cgpa1aph2g1xz06fs8c7bcjy56wzsjbvzcn0buhyxm4mdfzki2gqfd0naedwvxte8sbl0drhmahvgnmy0262h156a18jr6a3y4ionr06bvst6h07xjdk9jyv6qdt6540l95snyf1omw2b0vj25ngkwle42xaheau5auabmc3llv1dp6mjwmr65gy9tl6l3jit80ncu0k468akixoud6kp923s12e59qy5wp39ua6w2qeh5tfe1qn5bzy1jkzq56colt3v1493m42tm14nlq92iobaehwqfoxf41cpiusly5q9i2yobdabg016pflvm9svjg9ig5q9lddr1pdk7h8ymqxssn27ydexb9zxp3mvnyr9hlu3qpvsm0xay6shkdb4b5vbn477ce10e1qvu8bykjj2nezqcplrg31vumz2t4rfgysfg4xvtn2xpqg4j6hba8u3oe1rfjl9yj422fiuvytdx8eplkj5bxy6l2aqqokjefow28mhe6jzvx7yapul3dzhqim6gr0sgds87g09shcq4txclfwnx4ayti73itrq32du4ltkvr3i3n9ihd8d2dyi3v4m22jmw5iff',
                fileSchema: 'qj3ty7xnrr691ms1d0aikbqqsilzw2xdyxlahuq4zssfli9e090a5qurthmbqnnc56k8y3p36623qn1dj53qij5q4zykpx6phjjc0c0zmyaqid9unlcr5tpugehcomei9xoetgvuj1nnn976j7ee1zof3zeg0la9e74klkfg4eknl8h422r4l9h9dxgxoy0u415r58py60hdyy82nmzc0nwd03kh9khk3swuwe3aqada31o9g1hx82gwc42544ntwaigj89akhsa7vqeer1dhvtg9c62d1ulmx5qmax25txi1wtamao161i9s6hjcmhjw3nsu4bdroriyny3wc6enwdwp146sfoidirytdlh5mmjtyrcz38lnqdg8d6emcxm0h7kt684kcd68keplv5mub4tgjwjbp0p4brvgeodp71je3gl3gi9qw3d5zimhrgniuvdn2si7dkxjlvg7yyvfdjuena52fj6pd2bbmwq3j6z4lq36dx7e7pj1zyn9vksq9j9l7id5n9wr7bp80ap5mxr5nm64m35rsbbnyue1ggojimlvn1bp4a7ohejxqcncmsygso6koys04cshxvqxmrtnelfg9lipepkmp401bdfeg5y88n5altacx7iniuyaqxaoklv5trk4kdiqzg1xcowwye8d6140xv2xzo0yxg6jjauxpobgcm20s3rgd925us9gezmuk1ctkew7nkvtlb9umdmhxr8b52ehu4vs1d5xtnjw2b1ekgdfbegmr5mt4qmkvr3fti63uo9be2hxjn2q7gvgvextj0qauh4srl2318u5khetng9d30axe1gty0kpaalopjf40wsy0krak6ye649lx9yp2rusumb4r9qoo5129goxh1dbw8nivo3xh7nal4dmghq3s1lj7uwjnlwr2g00yx4brs9ptowhvkdb4pwspj2fr42qyn6z8vjxf7rejw3ul6lgh021lchp50log4n9mms76pcfjxf79l89j06l8jaqgvtr9fjz4n2',
                proxyHost: 'dmep95rfckyyi5r0kjnc4tjkraekpekgarn3wj9ylafv4w3xe1skboh3s9x0',
                proxyPort: 2549756461,
                destination: 'hs1vmueu9g0v8dqbnlcwzpeixc8mqytjobgpu38r8622ynjtyx5801v626smyld8kzhd1qzjz8qh8qm8nwm1snltlvk3j5k19zmw90y6nk0iab3c3orzvde1fftitmiawm4pc6oy0flq3cq11akpqisf1sbobgf6i',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd3mz1a2iuqfiipzb8aag8abuo1lvlu69gwrzp9av09nbogszlwnbgxz2zzu7q5fpvlautk7j3ef2hqkj8t1wzd4e2gv86no14ha200xqmt9j2bg77ajmn2a76z3dglgylbyfil53lw59thantubfg7wytoa4so1x',
                responsibleUserAccountName: 'ouobwsmetkheam11v6aj',
                lastChangeUserAccount: 'hibgnx65k1rwulc2aqkz',
                lastChangedAt: '2020-07-27 12:16:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'ln0qevr75vkq5gfdd8g1ww8jb3nbcqe0bxdao496op552njtso',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'azg38j5cq3jhqu0kwaju',
                party: '4tprwitaz3niglek37w3w2i8ryt425uxjp9kt5bar3nx8kkbn7pcr5od72rc3jksjv0y1k6vqafwqigu3cx5h35mejxpy6xu78dvp057l48tk1pbqih1yw619w4zsyijobhhldnn9pa0a4juejxqq1no7apk6nor',
                component: 'hwwd7i1cf3fedgx65kol0gmxrq7wsd5kro7nt742kz50u1td43x579gt020vtwgrpzclspz14gvic5epju0t4zurfj6do1odqvd6uibsqp32fnnowae1gpcabo1c2zos9yu1oc7kjdulkz1vn8gsoloilzusawj1',
                name: 'ssc0bsjl7ycmzfx7uxd24yfgxv4y6z5mcbe5iudc5gneja5oznygaliyee9yrams71qal0jkq3wzqjw4ophwtpm1nbh44x9iw4l2qxfub4bcwwk95tmkwewsxf343blx7yy1w6xmk2u6xd0gniylfucbftgltcrx',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'dvg5lh8ngy8fq2e8gdwkes7ijozikcj1rek53aglw6jcik6m3y5h0v8aydliou0ybct11e9n4dgnge42o1oyqnp71xt1b0u436vf7h162o26md2d963abljjo698y9ych068z0w4aagkxupa7f4gqe3v5fv9ljzx',
                flowComponent: '7ih5cuo10sqw2oykum5xx8gq59rthc05lt2sjlfoh2h2rxoi761x5t1cvko9h949sruf0la6npzn0vs7pvd1b9t5x71bnul5hfm1vg5qrjoi0phq9xfe80xfhta0518kwd0crt9plyevw1uahivcsbcim3hxm92p',
                flowInterfaceName: 'ymjkzfie9k1i1n5bt6zlr3m3dzn5zo4o80zm8qciz4tf5d6j8r4swnntlcig9knw6lxykuv26c2takqbqitcnvry3o0grbkm0pmbq1gwfobhydemhivly819o966kqbyf1wzl6p1q69c1qf7beiuaztudbjkw0ek',
                flowInterfaceNamespace: 'jrge0sholyhvockw5l76wfcqio3urml023hrwxh0qx11dn8pbeu0oi0eh5bkdvh0sjpvrmc1gzr0gwzsm7c100f8gn6e4aq9qghxhs3d9q8oiwhqxjiiawjrt2iapi92rlzynjmysm7orw4mvw6o7c0559hos0qh',
                version: '14qkm6zsp2vo3b7yo4z2',
                adapterType: 'eps3wv0kt9yqvm5c13v48tn6dugojlxinn4mn5ywa1nzvpyhv6wgntmdckvo',
                direction: 'RECEIVER',
                transportProtocol: 'rfg1bpbhhzzs8irj25gg3dl43um5l0qj89y8r56a0hc2u68z5jqqfcwao50e',
                messageProtocol: '0ibxlvcj1cz95k185e2mjwbddk343gtsmg5dq2wc4oyftl91tvjq8svnuuxs',
                adapterEngineName: '5bgbvjxe0bdg02vsdfbnk7ojx98iomen1njpelayi1ghyxenp98vk2jlrforjx7yaj62x1tpzhdv8sp8lvergb0ealud3plqivkcq45b6ylbk6jg2myfno8pr639v3svsufvqw4g3851vbalep37iv2lhacb1s5g',
                url: 'zhfgokd06t34wlmuzi5lrmp857ub5fgrex1kyee0kwe3xz487o8iqowbrfj1oyyupdyvl3nuyxx6evz3b1oc9uhooo2omlduelpk883e4f5i32jsfk095v1bn5jt4z5cewybzynvidci1ozhleha25ehsmnv63uj6r8a1mduqzkrxpq9druufya1yyz9afimuh4szpubnt4u9rkox2cyewmhtf2p6q81v1b76e0kook49nbq65pa7b3qt9a5yc5spisttsbhss6qpjnpra0l53ohzuccjertyv2aemwra2f4u27z3iwbaptxkkv55g9r',
                username: '8r98toy3wkcu82pl9dt22yg2r8otxxtw9aox8otbvc4o2dfcg9dtqrd90gpw',
                remoteHost: 'fp3yc9un3g311zya9c2zru4fq3ukcxyf32isvkac2zls6fhlyydlju3paa3b1n56sy14j7edzj00y90sa1dgdm1b150pl40giav2ked01ssmoftgy8xfi60k3qy6vwpclaq7rqwvjcwz49id9iv749phkxh2yz8x',
                remotePort: 9511592421,
                directory: 'j065t5671xm6hhpap97ksl4yvly0r5drza6t2wey1rwnf3ec5n7s3c695f89aby08c5gfk9j1ysjy82q8bl9si1yx6v6h9r69nqo25g77nax09kvhl75zpa2kvhbqmyvy1oju663z70pdsez4706cj9kzakauu9uijqksauuwbztxhaq0s0r7f78453xjc97q81khdki3kgz0m2tezvdtja4x0w1txy2vtsg2yfpj77if6fmnar1i8ohckxa1wkjuctnk3do6celkgxls30470oy0cyzkrlj7wunx0ookymrku267jta3rakhl3jn5a0oommbzp8fdbugoe141x8nzfzfzcbtcvalw3paj7f7at1rlqknpp08r6vmgmyin3c5xkvrs3zfexcpqq7e34hsbtivjtybxubjdxhuv80iwvxnstvs9uag5rd6ae96ln0n54r813hjvqcr25filgbls085xxotkvbipkdeg67mib148z073s0tfheh9pt38w4hwhm1bs77vz2d94fz9xpq9lluz3yivqhq0ey798bebjmh42i7muts1ayyncisc8ltqijlxfcx7c1vya040c4zzhbyk95psyv972099vddkjvg4j79173toggazi52kzfmzkjhglqjmxfzjyyqkzqys704gsl9mydz49u7rrtyjygcnsysf5kvyvb7tnac5wtdb0s3efoe66cwslu64z0wzjdj4nhd9ohr0o33rn86a58yz0vutzkk3jt2vxclizctes4fcdoblx4rls6b08b91ixvh3jgxokk79zhnav16z1a57p7s12e5jb250bsbygfj87ktp44j3pfjmekxmpq5dn21eg71o0risgf649jh7orc10e0g6lxavhy9karazuzou03p2yckj59n5gih1zc5yl9d6te1kw3d845m7qf4whed7e9n6y2qo2v5y85nlop2l8eohpwj36ojaqcfs3tbvu3l4xucwis1ooikk8kqtjytogp3v7p5pdz2vnct3',
                fileSchema: 'go3nc8uu0d08jez9kgaxyr7udiup8nf994au5egpkl7zhns757vluqnkyq9i33p3j0ye1v6vz8d8h6bvberkhtadwa7r1kd8wyuqvzvjmeexwsxufubf9m4fm96b5e1r7141ktux7on9ms0uenul1lj5gyqn8ubz1xopsd4ga5km6y1t9rlrahnpiife2ytk5qz2twtlxcwnmhegt8f5okhxd5qnuqon7yp2jsazje9zq20p5drk3a2pw581wje4fdk6zzfhms0lk3zl96e11sbrhcgz47fjvz7oh8075cd5ugauv9ojlbx8qxm1ltu8gcdbx0he5oetfyyvj8bwwnymwg6w2fyfa9bw21tiu836op2057hl4adaro7y5x33x6ncsbgspz4f4s3xlpx3f30gxx89ilfmh01edh9in9bkvmy6mgb422m468q50mz78c70qxbglwka43rs1k963l1koa91vhzg1c3637xykdsc5i0yaahtk5ryk08hu7hxfcmglta96ix05kuffoq4hqblflmbsxi8s3awjdit93s7m7vpiaagjjfaos442979v7fly6r2w6l093sf86i725yahcrddiz7ry54p3nufnfj08jj8rpv3ak8xnwe88ywblnezhpp4qataqysb1il2fh6vjnwdhr2g65sb6l5039l9jol09sb3pl7n8r1rta4vgcrkjrd5a7mjlcapw6h8ctwjuhcpsjd8w0ltley1v6vuzrdzjqyu3iv2vmooucm3w3lgkt9y9x9zt6s0ku7ysavktibu0tx5kz0jly3jujn7vs9hg9blom9d99t97c1d9plg8055tzve31xobdn83kmtuqz5wtgpx6hlqmxihki3m3gjp6nz3ci3yrc3qtc9pt04rf9ov8hf0w2vhlto4ws9fky3oa9kdr41j9wpppasp5jeak9ut47atjz7wfv8gez85nd4jep7yua3ak68p5d06t3jh6d2a15bj197icjh8tzmgmcvukaevtofol9',
                proxyHost: 'eslb0q7air896lc872k4hjlmdizvcbbu63ppwkm56usee2uobvfceb567axe',
                proxyPort: 5183554921,
                destination: 'l7hm8pvixg7q3nrzocqctufcea94poybwiqindilio6vzxr70i4ym6juicvr9ifhn5p1zhc8fcn4gc1gy9kixfdevqpsquf10umarjlzzxou4jlh2ugupvcugdivdhwpn67pun0bgxvn4tgn56pwiq3rf6wtva9g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sjup5jolajnvrj6wabwujnixtojcy5l3takmsc5xe3spfssqcg2vwoa3713aveiw4je6q8g1wyiqsgddi4dpks4ua7hccd4njfcmbnnzcp4fwr1pcuarff9el0qsg5cspugyfhs601xyfrollogs9vodesybw49gw',
                responsibleUserAccountName: 'uznxjuvnngoiudgw1hwf',
                lastChangeUserAccount: '4ek4e54cbuhvnt0guaqv',
                lastChangedAt: '2020-07-28 05:58:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'iatumll2piqtebbk5sfwzntykfpuugar5f3pzce6b04bgbsl2g',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ilxz50t3ezruttkkjk78',
                party: 'pttx3y6dneqajw7qidllf2bsitgb6ug4vpy0aw1eome4e81mrryyzfv6r484zuv8thu9mjx0atdkg60oof2kx70o78dxhq5qqhuvbicv98mc6rqhcisf9aehsyvzz96njcpgw9jh9q4d0xeiti8g5kxjz81jfppf',
                component: 's0izp21rr89s2bagq3qzgyc0metq83xgyh6hlm17qrr1sp5vgpji2rvbt4fio8brhh9wm8bc5fppusadepnptj2db4x6mcgqumxg9ufl5m246nkbvstjuz23pzga1h8zf9446h5g830e6dphkccre9zxp1pjz31c',
                name: '3yr2vxuvggj1w7yzucppv2cntiktexqsh1ms77jiesl3siy991q4mfbtwapopi20sth9nbmha8wbknuk19gvi3sgpaqwjc8v3ghw6mg48oocmm7q2haj6smsjcomnxt00uf83qllvcnkm8lri9boq0ikzslosxns',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'o9w2wqspzhujl9q51rzvdrm8v7njfmupnrssis3xuxe8d0erqz4rjz6qncl14eo1x2wnk6ix1ra7ma1dhhhm4dzwypyfu1w4dde6eqouq40s8p9r5bx5eu70251960ata36c5bpu7v2ht83kp1q0gg8sthrmy3b7',
                flowComponent: 'iw1pqepg3sq8pzgmokm8mfy9k5hposyxwxumqzuhwo2lq3r8lpjb644meni808f14a947w4n7nx24b5dpj91f8sj8zthafdsyj3sunr44c7dcdmwe5dbua7yr3illkgr9pkyet3yrfe4wql8t3op8t5irf1twoq1',
                flowInterfaceName: 'qa24uzjbge0v5k1qzuvbrjvrl8dkyynrxjxmd6odebkihrjlapb5ollg0m9ygaom4wg3j77oly81czlabogjzw42p946pdesiu4ktytnfa0yxoqg80ceyfy2xf18iopadwzvi47j7lexnm8enfzxyrzcz5q62gau',
                flowInterfaceNamespace: 'gdw57repd1xzhdcqnk7h076rv4estyi6qcz7wphe21le38z937wgfs952pnazvil6seqvh39k1pivbe48bo1bz0uvonxa9t03wroelm9por001kw0xn0pe089ivr3ucm6i143qr8i2y68l9u93guhujycaew7s1y',
                version: 'pr1j0jv65mzd2q5pgzht',
                adapterType: 'gza3vxkgujj4me5miqbj5izqw4tat5bikj9je8yp6d63r975rudpxaqbsvwp',
                direction: 'SENDER',
                transportProtocol: 'rm8ht7ggm77cc5dbeohntte3csqyp6go91yl5b1ojofmpaa53attjmwd6dgk',
                messageProtocol: 'hf7w32tcqf3q2zuuid21e2cfogeuxvc7r2b3ly2ncua5zk0q4rrqljrvvke5',
                adapterEngineName: 'd4d1jxo5o5dhhxcs6esh8ns142cwuxwls7yu6e28nzr4f84q24p92n8tcgr1wwt36hi4ttrwlarc2cuh9d25snz4oxr63zfz41t15elnndq7a8vg9raqgeivm7li9ynsanu6sqmqjkugdf3748yud6dhzz3abitk',
                url: 'yr301wcb3d1nux05fy8v8d549jlx7espkckxwiryy2giu975dn9rftlw5h8ryhconvlc8bmnhfieicnlos63b7cuf1ljltlkfrmreeapazzm8qid3y4wxtlvqdtki8ph2durywr4p16j979v6w146pgvojlufc07fnp39uldztrcqhqobzsan4utqhcbr4xogvnriewpibkew41yhobese65pmnf3wl3r7hxlqcfpa2lyegpndy5u6wxp0ie7gzretr25jqm6pr2m63c2nq6panurauheyg93sx6w937cl1ywo2fj1e3d26yb6mk92om',
                username: 'sol7p57ha6wml8m0nl82deerzrx8uyqdr8od39qg3geqp0h98bg12ddclvuv',
                remoteHost: 'gvv350es95wrkqtbbd2ks5zmwwvrd8yh19otqggytk7xzejynx1980nv6f0ghhpbra3t000niqer4g699ugudibu716himunkn52mghozhaeh6mlv6kdmdopys07w00jwrru49zenkn4cd39a416b9n8ej1f1w8w',
                remotePort: 8331963197,
                directory: '63bkhqfz0retjywe613cfki9r1jx9pq0eaq2yf0l870nk6wxvhc9o58vf1xh2gpvobfgm03x4k0rob8aq5azxktbquj79c384soh3w1p1l2c0een6cq2yapnb8fwbfwfm63j2tjrp9p4kzmg2p380nzn0cfqi3uhgfjjscdgonp2sk7bc02uqj660os5u9rb0yiquhklhmd1qps5h4b1pyfvyd340falxg5o5j24tf4rwzk53gl9uumyabtg7fdvw1ym3wdc40zak9uqtgea8sg4f180ftkjq8rr4euljrybpw2n2jbgdtsdq479m53b3zc66mabk3wqayc2ljyth3abv277sl8pdmrhk6mdu4tuqq6p1gspmht1h2hljyg3wndrykph35hllqls9lr4pryp07gpafkr4zyu8ujbh5a4xi24qoshtqcyu4gavlpwzy5o39u9s37y9ajf0dg6t4d6g3unuqt9kymgffu0dvjz7c3b40s4apmbnecd5qgral6axkwxl0od4m8odc2e81q0z3b6kg6d9lnvfi3fq2gzz9ftg7wt9ego0rlx097c9tgwhymbb8dhnnwphi79kp7kzc545llgj5sg11lrz1ejj3gexw26rd127swak3nlyurvepvnrjdjfgrk1zfl7oszi1s08l9rttttxl37pfuwu4v144avn93ymb6mmx9vij2f797d9rshqs17cp7fou5c596mzaruvp1cpel8mwjlgephkvifr5bd37ufp8lwxyfy4gs3jrtidph5ss1t33xbsg9yje1qifowb58l9v0i77yif84vzyi4qhfkn2mqmyvjujk55cay4naovvx99id68jd0w3joss6cpl7xpq1qdlc5mjcsp7oohyjhm6rlqbhe8ztajs3ola8dl8iqdpkp4fm8gn5uw42ib7uxt0yezij3wwan4r8pdui8r5sj4xoy714ksdiaz80j8l3gufw5p06dilz4h14pyc04z69fghsrpgajlyx1u4kvwk8o',
                fileSchema: '9pcsyo4fp4pe9zligajzwucvkgm72d4z92tffvk5tng0udk1kpup70v5s3y0ml9gqspzof8n565cumyip2q7y0g62r2wz4kdzw8um60gil91ysfnlmcg41e91zninvk8499bh7qlddyavd7cbe239umtma6sgv940jiv1ti2xbyb6mp06v9j4g86wgl3a6bebtfo126penmni5o9ci0qrpsqhuaqlfpvp0ffg5idz23ddyef4uj0k98cwo12ro2vo0dqrwbphpwoi0bmi5u7fja816fqtkbg20hb5uaxl7prtql9hmepuqvkrpzhexv7f5nbfhyhj2lx1t2d742q0a4grkhw3i7r58qyn9t3ro7xo28224ikmjmzbzjlbfta9ek9491vb6kwprpj15bhjudidkfp6sabjxirssjgelauirc4ecfrxklc4uv1cqabh8hn5k04tz1haip7xtw192fodlba7nmxcujqs9fgzf3opbyskwls1uxrf7mq8v9iiqx3ibppgbm788ghnhaoaa6w7tc0cgebd6bg7zc79d7i3r1sbq3a7lkoojjpmsd2evvg800raa2tc7nafp1mc2cz4pnbq1avyz23ayujxv44ht7y5885gjzghcff18asv9e0nky3c4sf811q8ia2653b0v76gn143fgh3tkzlf6hj0d3s20tvc0oiib4fbzp35wn9dg3z0zw83g3dla7ripoo4vuzuorqlqgb7ulx48xk7vc0532xnqksaqwkp2dgn1jlt6rob1r892zhgnlcnewryrrzflhbtw21bfl9wbhch18n8x58jx1bvhmb07glx2hld3z0vnoxixv26khi8i9qjcwxbvpybsrqdiicf0sgdke73whpw90gvemznu2cn055njzbwz7r1k4wkr85h9u7gnl311rx4r9hczdvcmo1f921b5da3abanskaa2at1gum0kuh7snn8iwog9zug1r1ch5xjtus9mg9dpow2tnet3kf2mt309xf9y0mkur',
                proxyHost: '3t74zuogs162y9tddh3l0aifgn0vow1ov1bg8aaakwzp9oylvpabkr267yls',
                proxyPort: 4982864763,
                destination: '8uq1yfme3v9w1ajni2c6bo002jocjqubqxhlsak36lw3kz50c91x4eic3nidfvbjmsu82hxj088dpcot1xwh7ngm7q5gr0sr6gpphnmsaonhzmc3gc0xew0z39clyl3thr7agrbbj4q6l3qoyz2xjebsbjxd6hzl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o8kh4d1vjcxcwy6skgcw14vpqvvdze2wg7wak78fn85mtmb3z90vn9zcftbzdgby9qvnteyodurs77ka5x9b794oya381ug7fl8v3bdj0cm5b592dkw1wtcp3rj8pmnrafej3crxtmmwg8u14e3h1cit2n04znrx',
                responsibleUserAccountName: 'g28kj7n108lyefy8hhjnp',
                lastChangeUserAccount: 'wi8hnotz85orfg0gtaqg',
                lastChangedAt: '2020-07-28 05:04:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'vft7v9u2uqkjta08y7h0wiksrp735t0kckox5920eqehyk2i07',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '5j48rdn69mauzg30zeby',
                party: 'tud2sarvc2yv9fj0s041zmp6lojsotakk07ao89wdq6erac99qki8bq4jcnn221wfubkf6opbgzwqxifmdh26isz39lm1sqlyggtcejiqwytw8kneupmlth0z7mnq6jrkyg4lrkd131i4a11oy9u6f9aidv1ro4p',
                component: 'kcnwvela85l193rvijqaxrhvekuanquze0r9em274drw19n8fxusvu79kimaljln28tc10toxl9n0jwhwebrsfhc0d3a5ouibfyd63ibrb7n0hx60ur1lammg4rdinlrvy029he0ec5yyh6fsf8t64y5n8lx0k9u',
                name: 'n950250em0x4lm3nq87d92z82to730fs3nvxfofdrl5h0b9s7grherjvh9z1gtthvogjdbkm4g6jdghfz1n85opoxw22fnk6206ezvopwfdfmoqxqjwnji2722fmp10p31aqtf7at75zbzgabtyi6ohzm2nhugkb',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'e8pakkfxzlm793n885eoc2tcczykbjex1ti70jprloq2xs7zp788vw7927dd0mmyapjzdqub1eevg5in6i8bxbsp2813sr8ash2292kprhfuf5waoykdzj4dhuih55tcl39ah7i6vexeldwsyz9jsrpbcw5kmf3x',
                flowComponent: 'rtvi50kknwe3ggxtcvxh71vux0gwosx00lvhtnvaseqqjcr90hp5uq5od54xwtgntfdc7givdn8c4rdgovo0wd93nmhopha8wmb3g5w0oxqpzxgtpmqrqkrukmbuyp063xfzy42jhbwjie0lrigku4xjpresvu1z',
                flowInterfaceName: 'sumf2ghxglc768cjtl1wmnl3gp72b2cllnhddnc9ujckr46wqkliigrrnbt87lv24k7i42rj00gbatghiqjkiaku10nijd0gl6k4f7jm50kcbv30ithu1ahsy5hfuyhjtmy86fzon3xnpshon67vndt9covfzf7z',
                flowInterfaceNamespace: 'ynwx6umeiduutyhxek15ecc7q5hjr8q64u3sfpi9iygbmcv8l1g7cupmoxi8utugztox1f0yc7hs2fa9kke1kppceiocob3d189gpli1u4tgqzk8v4p1vg33321a4j4gh3oonyk2mp1syv2btzgcvre5z41h8un7',
                version: 'n8ue0cdyx08g916ssjyq',
                adapterType: '27lxefw3jsmpcxdtvy7fz4tk2q6d63xiw6syk3slxb1ov9qmny5ihz0sbd7w',
                direction: 'RECEIVER',
                transportProtocol: 'zzge9g57uw1e278xa59znhe0soothsqrw123g5y14z2nc7envin2t1i9qs6a',
                messageProtocol: '2wkzogxeirzfmrrgbk4x1mievvrkc0uup7lg6k087adcnkbh3sr05u11g5uw',
                adapterEngineName: 'r5xwijqqf07kurzx0mlbthg2l5vm31dzgdy5bm103seipk127zww3mkjeu0snf7g66ijbwiqlp1fsrxqzay98m4vo9hi8cke2jsu6s6u9kh0rdu1g0nw5k3nn3f6qmaeev4auqbyqu59h3onz6hcgbky3j7dhmba',
                url: 'sr4bmml654nwippo1klwv2hrccapgpz4p198vfxuspfd2ik5yy47d280pu5zsvbvc0vn9w2lstwm4m2inxqyyfkx7cvh7pttbl0bp7ikwiu6q5npbp8k0e7gwp9fr84tsmi259uh2ps2r2e8xn4az1s4axq0kc646lwgj0xuni07kbpxw4pk224ep3zx8ibdehjd16f0ryj3fx4iodi8pdvhdu31pynxqyr39xxfvcivzdbnpm27wzc0tzytt2mwwgbz4fdfelb30r99w96je9a7e7wzavl25n9ko9s23ge22l0nguhbqyw5txcjopg7',
                username: '9vk2pdhywrgv5hc8h9pq0jf0rnfd9uv4itlta8ywwf1tnfgm3sls4ljdk0wy',
                remoteHost: 'yrys6qxbuu03s3qp7dl1tm5116hshen2b8pynmnhztvxyw9i70htw23jrfid1146uc6idjhdm1845426ky0c3ux3i19wbw7c14mlvbgsv7e8c2onk9nkrbceps4tsl7ofo7c1um2joiznunnrkje2aqk4i2pt4wd',
                remotePort: 2706064684,
                directory: 'rhoofsam18cbyceo15xzfclzilo366dojo0iazc0mo6702wgohnuhaoh9nrzejxco0u7ss18renjrn140xxte76mrooun1w7t08v0j6cphqerah36s45f8qlw2uk5zjr77rlwp3sd9ivicwg8z3opgyog0uv27jeci52n1tmozb4nsvvifrujk14qigrfbrwbjlqxhp54k99foiv6lg2u6tzak0vs1hfjk1xntj138e3vvb3bigeytourmi5cxm81uj4k55in8s8w5ducfyagpl2iojj6qcmvbntefsdnlbhjz9hthq09aearvx0tnb9fb119e27gt30d5ahi539ef5bpb2tcs9bcrkhya6catct11su80g8xcetl1udx689y37fb6wkwiq27us6utu4i9zvgendsxe7hb2sun8xl7idwu8c036449p81lnlj37wpk3hfqfn0jvg5lp5g3lrx935ehf4rv3rtwh2nswuafpdnlvr45drn3hdpgwa98qjwe67ur7fq89x7kk49lg5fztgyhnwhpficaw1aoiilbhrl5pp0rbk3ajnpyogyon5ej1lihxpuw6qz330zsvcw4o8n1lbmvoh86fb8l00xn5qib1ly1dmorbjsrlhbbgdpmv86ykjn14tsmbmo1p9b4ae54v0a70oa111unsfa0uo0ybslf5wnaiic1gqds9ddudho5l3hbnn4cbh09czj7hpnkq2r8hmp9s34fkrk0n7fe17ic0zzofgof97zns1tdr1cuoz6202j368w9119gwt3fbr3ihyd13mwbjnrrsrqw6v52px86jk9ynstp37jhy9df7dhup24hxokz8wp2gvr7rubfuvdk23sghfcov9p63hf2ay11dxm6201e8u2bieyoktq24i75acet1vyo1ygok7u9nqxwpx68mr53vy2y86t13snm3sz1qkg7nunvykhptbh3rfwpr3blu7eiip1guai1zjtptrelllfjt64j0fkbzg05jeazcl9qom',
                fileSchema: 'nmx9xfh1xpz8kzse1frsms2gtlxxk8dlh03t7uxco8z29j7tskpilhjdaovuvon2w87aj28l5vzpdn9g7imyxpi67jooq6q4cr42otqusqo9gjlpxl6kxa4uma6mncuvbdrkk4jpf0n4nz16mz7mg3bgqyb9bskwf7gkx1j9xwy738tlkqosm2zhrm2yq5qsnk2kt4v7dkhj16fwexjnja9zu20z7jwvsp2iezwe810ge7h5pq40do5oa4wf81s8vwgantwdj7dgpo0ggbglj2buwfps0193pg13syamwbvb87cggdrffn6w0bvhfigp7wey0p9z5en5wnu91sgrqwotdqdjt1pej0efz9pnfpp63u1e0492gsyimkgic7oubkw730mv6xlpc8xnkm52pov9b31rsrzgfstxnd6ee0enu1wmikwpam79wsggr5j4q5qyw65tmw7xl7vrtoopdbif6291kkr77a0nqouwbi3klywso446vo8krcntjkg6qyfaw7nu5vu9viyghktbv104o5lw9yl8oz5e8j133ypexk2tnkdaen4wozoxd7wpcm69f8drm6r5124uqky6zco9nc4jupatkqoiyfgxuquh8eoramxdbqzbnc7oxwr120iacaatq3pl4t8ahlplnbl745cuv1zuphydj6iylroco1m6kf19s298y3bseu14rfybmtuyz90xpwmzh2ssntdldkmd666vnid63358dnx1mkwk1gx4bpe3mp3ede73ssp4b8t90h9b6r90y0hy6b1v5wmdf0igmyb9nmbqdt7ts6ifvvti5yx7fbtb5van04xygtu6986wpsm6dnzww60n7y10ihjq7s91uwporqab9tb3fe1grscrw3lv810wb3hjacj0piajuwxeu5b8b2dc9sb9kybsu38mqdfhi6fhe1t2quumtkxxfw3xrwlihqzgtrof4mmoie2jiyvfzfs61f88ow6vxesmeg8pqt98mf1qprrrjkbqm3d40lmn',
                proxyHost: 'mf5n53n33vmxn124qwpbwff98uphesyz9o5g85epkcyidi4ys7xessfpwt9j',
                proxyPort: 9284869207,
                destination: 'l9r6281djdi2ssujthv6bjrs5cuqngdtix9jl56r25t9wadd45zc4eo98kghgt4c56srnxnck4ez0nitf95k3j9x4ou9jmjjrfc6zwy41n2s4lxq5o6oszqp323aonht2plvu8ira6vmzf3dp3x6pmjq03yk7hua',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h7wdwx3bqlytettk8xpwdap79abbi7e3xqapjj2e7tdau8e8oyeimejgg94d1safjfllnmre0u40tdbujvr1ibhjop0mk05taj6uwstrqspnpthswgucjchqr74hixwnie73qo4tjmit27ejr436vt1wszykexom',
                responsibleUserAccountName: 'klg1w3k54xdggosjsisk',
                lastChangeUserAccount: 'wxagnou2hkpfwuqtwgb7k',
                lastChangedAt: '2020-07-28 05:32:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'znqepxwk3wqyza7o7w7aq7uql08ynbhcsbl158kzs8hlmtrf9l',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '8bbyga01xl8lgi92d0ag',
                party: 'mjoinbfurik9rq5ylhwm0gnvs5qzu0fbdjxiur2dncfjzglstfq7hc0r1mnepnugz12fnxwcdwae5bgul1by79b62q4ej1adkrz75saq2ttokdp2h1up9s2ciebdnrmihq6fmohak5df25kxobuho0kdvn7zf33q',
                component: 'y3wrruyjgn7mgao3rraae0lfxcixn5xoovwyvfpb3tldywob3heqh4xbnrv0blt8w52rx3wnl0wzq8jfgrcpkt8rzpozkt3idsqppyw882wfpcy0krnsl9vvz1c3zq8fuqve25s4q2ymydtan6479etsvhps8cmb',
                name: 'x0c8t79ri7s8jwbo2n3csgshzwqtv2y85ouxhgi5qpktt76n9in1840e6lrnp1gdc90hasl8cmkj9v73v7r6i6aqzjdswj5dvmjnspogciu6q7k3d9o2exiopxlgisowoe764yoaata97jvzv2so0szeok66nmel',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: '5qsfg96kqrimi96bi598ei5sfnbgy94ggpjgh4kwck98zr6mrjf91t8xo69ggawf4acl6e9muqk7sz23x4a1u1i7jf59kcltl9wqn1fifo68y283w8zvytjwsqkcigex55r4rtgmn19jfx91wlyh74e0byzko2y1',
                flowComponent: 'wzvrxz3noyeo1jpjl4qkx5cc8y4ye5k5g4yw41pru66bm310etypyamve7iryj6k8k0qkaos5vxh64g1l1nh2osby57t6viqp6gan6q8sni4uvzb2gk08ofvvm17l2xfp6i56l28y824mbxh655pzta4n52f3o7w',
                flowInterfaceName: '7phnmmvu62lzr1gia4mzyacpdbcp8ytgxedbdgck2l2co5yfqkflyd29mflvhyic5musb7e9ij02oeyrd18pmvrg6oz57z1em7h2wjdvq57qd7brv8lwz13gd51qm0zs701fzg26bysl4uz7ofnva0ivmk2sf1o2',
                flowInterfaceNamespace: 'iqlg975eheiefr10h48a1y96fgr3gphbmezfr20n82gajutkwj3j3oore9fgx2oe4hasigjoygmk1jodr06ipcxzyyj0fjyj7rrwcsbda2n5nxew5cmstcewhjdiwejc77wvx8j2ye645zyica5dupe7wwypemrv',
                version: 'ld70xdvoaea0fnhk4iql',
                adapterType: '2bjc819cs3tjxf3sc9gznu1p6plzj8shnvlrbotf68gvq1t4bwf3wuulcj10',
                direction: 'SENDER',
                transportProtocol: 'ehqbt5go75150ovri1gbmw7180aqwxa8swvct4xjrt3bfpxah8llgv1i3gay',
                messageProtocol: 'xizboqj0p0l7n3e13cjktjy6g4rm0eh80h38ee0qpzkotbxnir2ds7gaft9j',
                adapterEngineName: '7y2sgj4glgr2zoffglu2khtlwi8s196bswlbo3gc9q5y912y9dw42tyvdpzamkxlhu8yqo3bad6zqyqgotyuwwpynwjram1gga7zex9er27wxwvbgfebyvnpyr7z9hjy3axgsstv7dwyofb9enuicvyqmu66uk3v',
                url: 'ldbyslumkcgdw14i3uuoz4oxypte9db68rq8txti1lbag40212zf0h72aho5ms6xxn54shx92wyd1zs1vc02e39lt9tfurr1rdfoqrnylyfozibj5ctdt17i8x873fq30by69o4jxadp1w6mhzl8a1ezmr9nuyz1sptidvm9jjnxii4cdu4x5yr16nmytehad0gsqgl5yvklm8n58zsym3ln539h8ocnm2pk6p5kczywgwheygk1lrppr0eh3oqn1hajtyznellpff2m70ljylk3f0eq3giuufwydiyh9hed82h8t2v3pevlw03yp75h',
                username: 'iypbftlxzntan04f45ttawqepp6ktifjbveg14vftghluehomn1ntfxd95og',
                remoteHost: 'hhm7au9w5omuhs0auigekfe4lja3or17da4fiomv2g2ohrydz7rshxkvyv1iksbuvys4lz53b7ytqnr6oiq834x24u247c5dbq6f1e7i7p5olerah8yc5odog194z2j2xs6npg60l7f2u9lc9udzdcmefhxto9fx',
                remotePort: -9,
                directory: '4xc5prki3iollvn2foeyrtrtmgy2qu9qv402c52jf4wje0vvisxu3b6p70fe5pycejnw1lt486ceczg0y3ft9tkawj2ahcd5q316ccg4kkn6kguxlccune3mva4qsevo9bj04ycpjo3br1nhly9pjt3ht42ftfew8ns49kdg7qlgypi7qeu0t3erbmfotuygrc0s3vn62mexyswbct2myxrygh5yqfchom60uan8t8j6rrnzmqwbu1cxmwywhrtzb0ooq7nf0z13wf3umxwcjt8buv1jmf7xml4r3id6z9ll5b9z5xzow2gm2qequ1k1v2uazo8bnilcvt27c38zhbrpqv4n4501emslg2incx1jx2t1xuqxxehs7oigiemjrdhhmk34dsybl250yyfxbeh0x7qblwux3p4k58mrx6imnvgwbwull8fnnw99pjlme24fo18uo8vgijfk5bbwdzgbkzsfuxwa37h4b41tgz39ijtas4fgplismkt96x0qgwcj6u7zd5anxua80erq8w24t5g3359g946691p938kwy9tbf03i67t5twda9u2rj3lwf2mjzkcf2inbu8vmj1930jif3c0h9wx9ty2apvvvy4dny3j1q7egqn2nmiturjx3k75x7xlcoecj4c2vizy3nho0x1e3dg7u6lowly4n6hqx57as00s8n9ysvmttxu69f197ge3movocg6p4e2lid1z476az5hkel5eivow556419zaoor46eli25yxluxovyqdhcfvmcqfpv0vgsehcawanvdkxcsse17fa1ohd3kb7i47l0l8v5vdpj0959rb3yikrhhy3my5fy1aac4ycdg4teosn1nfx9pjmmmw30y72zaqqb1y4ai5e5qbvonywo6ka04wxxyfv2u5sa9sm710clict5up5me3m5xgb8k8z4hst392kacpu5okpu8si81xl0rhlv50s0x8k4j7i91nvgxyggwhgc4g8pm9zbzhfka53ofs0qze688mo',
                fileSchema: '6j4uexyluqjbi8ky0rp3f98qnj8c9v2itlfuhuxhwa1i0kbd3723ia26wgefobqnoplzt7b3ok81qgf3rqh5tdgtjhwwrv17lshgholx162lkkqpjolm7hoonmxqkazzlbn35seh1bxnk0kx3w9snone5fdg6pm9400pl3hn03ebumtcpj8qxk2t2uzbyoedflch2tqb68ao78ntpfek6qcwds2sat6hwjx9y1q9h8va2uo9hb6mr5y4kws5nuhgm560fqaa7q1tvyydo0usago2pd9b7qc3ammuhh54pdcsgafuaymkes7imr94mr5khq0q8dgxblolxijw65ow8b2fja2mvyo9dzzo9mkm1met6i3vn5dn1rcavyrgcc88u5jngz515yp900vojx4xghu0a2670a1bp155o29jhj55b9mi9dv8ti0wpk39vkgr489krymquer8jmf776jzldo93944losuxlb4i0kefbk6zz9sifwujmylxs38bveu28pcg6uvmsbee5zbvvpdpdox2ovbdqy3oj9o04qvb36zpzbg97qx17zjudyt6u2bad2eusdy7crl9mhcp2fhmazhfsc4ikpf3p7ebbldrcqxjdx0gfjgyx1ri3svwarfzpct4luetfzc616j0tdskbp5ykeyr7szkwp92urwlepmqunu9pfvuufdy66x755rrh3oqd107t6jsqnecxxp4a0zv6xryyb84336c3y9jn7trqsfrn04utbyfg2iz5govyd2lrvz704mdu3hhs2rh19n4254keg8vg5qkq7dc33f3fd7b8kemqud7lzrxe8kdb8ravq3sfun3ot40varay4i0y5yfh0lg7yc015tnx2xkrlkmhqrbccfoqxnvd37fdak0xoc68okk9zeto87bj3ldctl4iep3ms1u26ujteh2m9q2uvwy6cqne617skd1lyrh6g7urwcasyx7f4n5y3b4ywip8gqmq89zwunycjrw2lxk64phvxag0mkvyw2',
                proxyHost: '2fakoigom2kdhapv6h4b9ac4dwl5lfopzykzk8mpmrv6ga49f0jdfgthfpjb',
                proxyPort: 9203064329,
                destination: '833xyaozew5tu1urajwh468iquvj1nyo9ozsu16rypwr23wq4jtbf2kau6vpn99yc69r5amrsw05n47whku4vkz0zlqy9brc3o3aq7rc1ctf8le1h76cxojhzbhnz62ye8nrvf2ukx6o0wp8s1246mkhteg8eqdv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rfk0l8vbfb70jucwlk2w0ofrdovpvg436lyw8z23t8tw1llt4keu0259zvbbw46h3qkz8f39u3gkr9ukvynbv041uwoini71swxhrw3wh39pde5al22h7cra0ldlpz461u3v4fsrit4zojoi20x5ekc5pnv2xguj',
                responsibleUserAccountName: 'blgywnqz0bkmrf6rl3c1',
                lastChangeUserAccount: 'tv9p89q2xlyhk1xk9a7c',
                lastChangedAt: '2020-07-27 15:54:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '3uisjtu2ver9wqopfd7q5fk4kmi0kx5hg6yk3atkwciecipogj',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '98sun71eya96m9jd2q8x',
                party: 'c97qo5muqpn0unilezr7p4c4pfbarwh49dizmf0t0f88g1ygoaf96xoiqv5pfne5362grc19kyvil74cw394jchsfkjdxgaj3jhpdnvd3tlsznoqtpjdmzvj8d5bfmagvnppntc7piw67pi06lq34bi65xo1ty5d',
                component: 'pgczfmzk4zdhf58pnb0gp82283r6rwbj8ghts1v6yqjsvvwzhp1dzsvdstu9tykgse7ub6b1ymbzuqp7wu5h0l4wt24o3wefn47mt5t5hum3e9jvli81rmcie82ul3o1ocaapfo17wzyf2lwn1ada9ypiwhwdv3v',
                name: '09esfqsankgszqdc5na90njfvvbdwmbhvtiur1b1i619dxyl0fk1e87txate4x9n9i0o1ea1n9pdvp9tz9bebt7qjrtup5qjiywm9c1rh0tenb8may1rttto0cthfdccgsvg9ojwmbxigctzpi2adhcemyj4ovd1',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'x7o386u56t3oz9jdd0run6na1p23sikb1rz923os0dtzy6cavxzy7h92w7knky02euixqwjpipyw2z8enrryy41dphp3gqn0yfxcdbgfrjhakox4vq70zcvzsq68ww778ysfbvz3kxugzjdgpdc8ehr7aaep94w6',
                flowComponent: 'z52oqk5oxgaxiuvhkm7fqoclf52s0wd0si3xsykqjbdcxvi70ma6529nrbs06ut33qvxzl2w836sig7kzfgi7oru7miejb7zp7qbdemr6q2whn2bspmsw40kzf8t84tu8lsgp7ffp8acxgf8n0ighf4qprpwg7cm',
                flowInterfaceName: 'yis3jd9u14kk812s59lrw1cqrev4d7r4m4kbdh68o0yy8scgrhzs18k6ma8oueusbdjeksmzpmsblzb1fs8qegu0vws9svjnosfpy2xrv84x52q8tzgvn5xy7ww8hz9q2lbs0daaxp0ybpvgz2tj0x10k05ednmb',
                flowInterfaceNamespace: 'so3kbhzbghktuc7hug6mdis1643vfvng968ymmci02db6brsmyrfsz4fptx0enkk0nu80n56sj3ryw1huxthjs9de041ik6ilyez9j1qf7f7wmywma1is9a3cwdch90hphuywtjrfd72661g479y18nkgfybyuwt',
                version: '2xnbj6dbtsutwm1fyzft',
                adapterType: '1zzdnbf5pyedui11934m5sb0m8psolo5incmdffbmyfu1hgc19nmcxjti9xq',
                direction: 'SENDER',
                transportProtocol: '2ehp8j577cbmffu5m1lged3xfjtw3fiqccnk3mas4yyaplv6s50vyh7m17uk',
                messageProtocol: 'ak17mfq482zrrb5ypk1nx8qz3y18uk9mofxuzz85ncfm58lw6uigwrtx2rzf',
                adapterEngineName: 'q8e6d0kflesw5ckc2tcm0yq17xs2y3e7z59yagasvgos0ab3atsz5ykg4x6remf142b6kdyx3235n609amv49bcbpjxztybf92ps6f2rtuusn8qrdkq2mch1yo9art1z5qh0vn7ixigh9xz3ziq2yne8eglest4w',
                url: 'ubn3s6ucfhus6mtnt3ry80h1pmre7cz4qimyh6o6329bnj7v6p8tiwllpk6d8pl0btp57bta4g2ksua303kdda2pvyj3hfaj5xfsi2n4yd9bukciv2a9thhkvmqr3t8op9mxftuwsaujyx4scooisawt2owldbxy00xupv4urirj6tjvskw7gpzk7ax8dhp69qf6hnohb7uqintni49e1xbzwditrppybrxtq4sczs28j90ymtimbo60jk15nnrv20p5mcnbmkr4z8j1lm1761u09s5h3ztokdkfz0m9sis7upikffog1q9ct2bwgfuf',
                username: '3ijf2p2pr4a2grpaohs38p3cyws3irdg4lilkpgpk7ilo2vrhefp1wtuuqss',
                remoteHost: 'ka0jrwviocliw8uab6gypfjtc383qa83iyuvuky98tnnw4imvalv7gdswagnu6h8ujpj5r4yqai871a74h4km2z82um3gh8gqmh5dhlg5rh6fbgrclcob29gsef0typh5iou5668v1cm9bjn1ac5k9n0kfqehunq',
                remotePort: 6761781196,
                directory: '4lviweobt28sog2amrclp7adjqpa8lwlchaflp7os6q0ma6odw7pjsez3816t6n32czr5qv6l1811kvt2v62rfrumpau3wven2cy01q3p8hjboqsj43r91qupgxdpi1skrqrl3zob717k3ong6axho18lihsuaeoku7g1738j713kektq8ka3imqiypn237o4fqv1v7ww1fh9dtyb74j4o7ts4j6mhg4gb6u733xxgeg3cu5xppfxuvhi780blvxuk3itketru4d1x9whemlp35sgdpsge9x0ci0cfns8m88m936m9uoo7104m34thsvethdhhysy3d7y5kq5p9727ckyer3l3bpmmiy31wxpzek96a5z588zij51l2ltyezi20c4okcsi418ddfay5qhnwmxph3r4voghhwvry5yvqoo33ez9n4cjeqonfm2yyxp7px2m3yl6jt2rzno1xk1vym4nwn8cdxu3cyq9hyv8tdylstjkwxwri6krhjnh53oua27tkk2yowrb22xmswcwonmy71nobhr6dtilcdbpevg0a8dzpmmu6888g2fnah315pl2c2akzsv1javblkwpygae6ffkfi0a5aueczum6lrqpm6mhj5rskbg54t7uo5hs2wclbty2lnglut7jo31vimypost9wv3ynr3r048pxrq7mbv2b14um18mjta1ppbihv74mqlcbj6yzesyui1236i92vh5loqb89axrca1iqeoru84gnzkum8tffegyj33v5mbci64yua08eyyxb7i6247w4cjj3tymkmadl8y0iqxoqru91eg7iav5norytwiq9cgdc50gspwfkgc2i7s5n8hyk5x22k24q1ogw71gniuc7h4ruycasmsop0im6q4cmmeoylwih8n8vsnmncjwov7dqeqchb3vwf90xnalmb054txi3ji7ehx46muuxbtrn99k5n8s9bthqxsi1vmbu21i0hp1t13n7wh7w1bcw8eoay894q43grtf4ll1',
                fileSchema: 'g2mdqflj29ttl1orm2ciic6osqpnule0no5tb92dhlee5mq0khjz7dfg4rhezva6yu62vo73qe3ebh02tcmht2oiwt0nf7mrus9jsmayar473ahke7wtx78zl67gu5fdfc6gz1nx3f7j6xkj7trys9fdq0n86cd4mh80ru081c3cfz6vclj9hhvctd2ha9qlnfqx2on0mb2jslnvf5hv5fbaqjdwmh5ub0su4jjs1rxytvobv8jau83t4vt5mumb7gpdxbl9k1f71c6ueph0515hmta0gxt4esur160gc7uejfggbofdry10x6qjo1pda371tj9re2u3q95dlgw3h7lilvxh4ic9kgk9povy61fdycp656cvwnchwlmd6ke53a5nixw7v7wghux38jsgvr81ey4evdhkuoo2o3847zieaux947tnyt3xp9s7r0w3oz3kaa0qdj0k4z80kzo1wg2fa5d2sk2g90z7kpjxg10cayvmwnfqux0fdjnvzq3qgz167jf47o0ipbimljgxy60mnjoqjjhubnmwunjvgrlpkie8sesx2443yjoky7dec2ja4nijp550u1b4ojnezxspxfpl6t4ap87gs9gec0wecwqc3zemt9187rtpe3qt0z944u7dipjplg6txfxoksme9q0a4j7zd6m6msnk5agt4l7cklh4znhpq86lx6eil1sh926d9bf5anfinpbip1725rz7buitvlbc7cxhsrh8t30rz1jmkchs38cgpbn76md6sgprceuxof3fr4q268o6teok6jyagsno0mnrogbdhncugzta8i7ejt3w59vs0exdbunfeuq308m9e97cc7m11vqlkbh7r093mv86r7vazbijscokd5417xspperivytwog0fsd10z7d2oak8rlu0tcoglwbxousfbe9bznks3w58u145mbodsc4ltxhznw0mdja881kbfqeobfcv7294zdvr5sxjwhz8t1y4bdsrw0yfaba9boen6a5iei9c',
                proxyHost: 'lf5gtdblmzj8037rhjgb7fb1ojhzdkp942pjyh4hkv1tnzuqsn9e0ekwksca',
                proxyPort: -9,
                destination: 'uu6o1ev8ifsc75svzldmde81k6emw4azgjlta1stiopq2yd7cxwjutvonn6rs7l3dy1fh1ysktbgvzhzwisa5q20hfm8qxqp1l7baxk7btn4m88wyj0tj38thgjsk0ktw7qh8tszsbm2b44r1ff03lup1bxqw1d0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jciu6oog7gpslu1yq0mj5cxfscnim5f3pc4yadbar7q53eo75dslghy3dptbrwc9a0nl2d1wkvco3s0qgt7q0ugegv10af7z0anzj3guxcvfs1ownhwxzpl7itd50sjn5fvfcsqrs113b6pnd66yrdweor2p4m18',
                responsibleUserAccountName: '82g7fxowjsfr8md2dv6z',
                lastChangeUserAccount: 'm1okt5g3rufn3w8r9ths',
                lastChangedAt: '2020-07-27 11:34:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: '92eri59upoqmsouosabffolb36sqcf88970641ycui9pebuueb',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'ebazcjns5x918rw04z16',
                party: '3m9ougny0u8ikmx0r13zfgh5hdidu9pxm7bkajihdpjm7mo1812umkasim3yxubv6d3j5khm4ubxsh0xm7p1j4i1h9e6ubkk7t57atyp13euf40ps64t60hcb3w1ka6oy7lv7bdocj0nvlahtqmlz50juwy2c0bn',
                component: 'jtbakme3bzma4ssirv8eqnj5ur9yy5majpih926g2qbehnr9l0xrreb5eqe0j9bqk0kefvh92aoqto2lazzueeglwcrw2j6cjuxl9i8n1aui14ppcsitrzaycboqpckezd4zjie7xi0ujkx0p3i3e2biuwizil6x',
                name: 'dz0f53jdkptn26b28v86ep0ir0yunkxk5dcr8ixbrp4aptdvjq9krzf4geoe5hzt2z3cdfep61bw1ba74lue11xdbq0c8cceqwgwjsc5ma5w75ug1wzutwicutrp0lf1pdy6kt0nq46gtx9y5zfhdvq518zi65lu',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'qnxmivam3aunyi8b6mj7wk2mag2d3139lmu437l3mgxkrgsvpd3c3dpfb26fopsihy53n8rqymqpkuokl9l691anlacauo86hi1sajltacgit0lb9cu4ph9ra1156v6wugot2mavsw9q1w94i9len4w6szorj5f2',
                flowComponent: 'xcub06d9y7ui1fpw8odh6v7c9amro7pv5qpn4u973irxve6cikv2r0pultcczavh8fb80ron3zbxdxygxrhcdn0rnb8qgf3tcosvmm1f4l2zwg83s4gqrr5dyq9i59e67wcptoe4bbgzyfj4m2urrn6jbxhk7uz1',
                flowInterfaceName: 'q8inll92gbuk0r52hobznvsg76ypt74rb0j86gtr4etjqmx90uawdjb83kgaviqm1cj4s7tyll0ylbtf660my2s0nftwraqfqah59ffahycogwxptrpwf32cdje9i3bnc1bspxe2txo5wpr9ahiwn7lmhy2oovye',
                flowInterfaceNamespace: 'bisjz4jgyswu6okgk3z7bvi7b6yzfvxhl3qdlxlti65detmwrlv90ab4shpy4t6ghsp6v20ewp7b3pvc2a90h0kuf0er7dd4402j5yenrlce8s3697nnt5602c5ktb9qiyjfrkkk5ve0rp4k5v0g31360dt2d0xr',
                version: 'lzli33vqdxlup5u5y9vk',
                adapterType: '1o195gv0cgqridn9ljw5r2ujekhkdjrj93nh9xcwy02mab4rz1eltfinlkks',
                direction: 'XXXX',
                transportProtocol: 'r4pmh9n4bh4ylzxdtye80gwadfzur5jf3f95mn1ovltyzzs33ojfsq7l7vow',
                messageProtocol: 'eczjz3y1l67dax81p08ht9b69aajsm2vr9tnyl8uq007u2tdxgqdwvnrslux',
                adapterEngineName: 'lqd3zuk83s7r76txdlqljdgfii1z9t33darsm1bx1hoxvzcwf4ewo4dvzznmyu6lkxm86jmfbqrejmspaf18mkuh0uc4tpxcvzfoc9z97mgcwickioo734se5gp1tmjk5sjs2fu5gy5mo3t7m5b6qqdymhiog88x',
                url: 'e4in55pgvjgborjy9rym2sssmr1udmyei4muaxu1iqzjs7btpkebhs6t4pgpq3lei74cqpw5lq0vl2hl7d8lc4e7c0x71tjxtfvz3eatbolzentmj8rscop66gr5brj1xirqrwcxctqlos41l4d3tw8a0y8n9m6zgxfubx5egsmple0uqjq07qz215v9lkx8kgannl0afazf9w6ib8fp23ia49vn1fhzmarp1yth9z8zmlvq4ck91dsc0019h00f756m7x6op07t51koq07kj0rbyot0o0miy1zvzonkyp186iw54qcy0vpu3ijrwjm1',
                username: 'xz4hp0lwx4edf88hggvsadn6jem26z0s8tqf5rzdf79vfdw0lh3q2f0umon8',
                remoteHost: 'c47qmoci5u9vdd7x4pe0q771695vl54j71yrddiy7shwto2iisf3pm5k6g18uh89snerpr7z3tfvx9qrkgo22v7owdm59zwbirpa09zvmpqm7npwiw13bg7o0sez99cc54kio6m3744rts8o913hy8qi3w9nxivy',
                remotePort: 5459806819,
                directory: 'iek9d6xfysram4kb0yt4v93quoo9ami4g3qpa6fj5r29hgjiqzkaz1m08v5bxz63afc0pmx2umi74ibvresrsivgk3pavzjf7zizybhov6oxwmo7m7mcwnlrsxdh7lypsc7k6zj9wk2cynd96om7uir3vna79e0asqsqj3231lscv4c07cuxwbkmw3w3hrl6lhl1u6yi0xppqdvcwx4jf98dvn6c1cququa99ioxem9ors1xhd0yugc2wmgsxbuat709tq45234o7vnzcfrkek56ohjybrl3j0o9ohekmu1ul6oerimgju6tpz1onmgity1r0eiyhwvcjw4z12iz771wdodz8yibpzfs1gmmxsb22qf04eluap41uvqb579vgi1myv61dlpaqte8jyljqcsml3laufvamfv4ebou1yl6nen8u8upimtsw6zu5geeopec2oaj9ilw4prrlgqfietiijx8luix7gz1qkee2zqmdup3gk1vqbf9x63p27k0pgahacarpzykn5zlba8nfj3o82j4w1t89ejn39pzo4k0n7xv6vjpuu4fa8ayzf2rl0bpjhk7gbabhqkg80cy7cz9wqzsyi2bjb75yshg4srkhnpb60hvib2qhx3uo3hlt6q9sbygtp0c6svv80zrzix54v33w5v4dkxaubfsdtik3tw74w4lxgonude57e0rj32nv2zn6kk8f1xxes6v0qvjk0qfuax5418wmq6w305n05lx95rzwn6ltltvcymf7r9lnqupg9y1bi0q70o0ajlyohk3b09bt86b20a962e71wjvbpkm8v76bpfaieursk8vbqvwl22m5bp7uxfpustg74citj7cgqi4uk446revvltfs25fkjho9hhoipal0p3xp827wwuijaa5wql5kgnrqb5gz1xpn9magdw8prgf0jm5od5vacvezhstngjt8iaf08uf2nrhgenl4prqzkwhqfjwb01eyg4t5t1529vhwrx1ngxr0oxvcymcs0vy',
                fileSchema: '2bvhp81lhfybmkrh8y79rini6cjqgj8jeexo6rz3y77k2z8lharskksd7p9lzdtpvwca4oeiaa3ku4s2bwpx7gmpfr98g2i3swgu9qgw70mypkgv59yb9w346zvu4exxnc8w24jpqnzyn5mrzcgm5cazykgjfjgtlgkbeqvl3fqh6flcdme7va7m02k8shcntd672bjn7vtr7gzgvyndvh0zyccoa8uajuyj5r12hlqkr1h0t9nc4cy722eujdi5ou3otb1zxxo8tmcwo08tzcph456g7w5gg1vpvbdlloc1o1qewhid4a213u1yjhgf8bl1a6z1c2p2fxnz9a81q3420pcei94a4aetllrzskp2e9xfkg95fhu5tn0hwdxjcorp5cwmbek0p6p6mz4j0emsn3x7qtezf1w3czbc5udxkrvjy4bgk8xrxsb420vu1q0adu0nranertnid2wx0q3c69bo1qw00weu7pxx6r2ivvs0mcq8zk3raaoyyenevoydv20u7vj2eum6kf43905ut583xmsccyq6kwifooa4ytnsrxejvqc9rga4dnu82cp84j1zy0gsvwot650oggyfh5uf0dnpgmir7iffmdl97lh0ric4wbq71ctet5u8gnqp4lcjeex33mwyqbvn84dmvbe9kjgo3ojl3pgik2698m15zai4hgpo1k1490j3ag1mx3kz4xh1lsxcy5uxcx7m71ikfd916i8nleuj9l847pwctvtqrajm9cs8585z8p8kcf4c5grmjoussn0a3e7nh51te91y8nt7cffhsqorin95r7g31o57whrjrv8n65px26kdcekvk1ehulwel1bg3buth9gocwa6tl4v6725ki8dun65u1ij1cfwkrk898xh7bfucmlmlbztvgwk5ul6myuiqlgivfwhcn9l2o9svgzol0udtsh2d9995rt77nvthv3bb1d15wloaohxw6iw6penih5hrse42iw5cspujbr6qjtb1sqr6k6tv2b2',
                proxyHost: 'ux0i7flgdw08uja32lt8o1t2o0vgv9s2r3v3gu8vkmah40rhcc66uap9bmb8',
                proxyPort: 4568871996,
                destination: 'm9g0tbejbs0t2qqsgoi3c7wiyhz6z9p2uhdfitt1kfo9fczm9wc6zk33cot5isd4jukvk0t7e0w1jzb6n2omicclcq11lz5wy3gpzn0co7x2c18m0v5omknukbbiv0ol3eqr47lreeyy3sh3rhsfejicrfveium3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0ihxmagq371o6cx4vqmz06yfkl9adzd7fqt35rga0p8k6jm475n065oo5tmkl2cvaqt9pcbzbira8z21m6kxyhk2vtu7qnleyx0ov2rx4p72ds00vy6nfuwz1azuatfli0dw5wrr9o10b5jpucihtvko09jww43j',
                responsibleUserAccountName: 'auka1q60t62inbx8b2ub',
                lastChangeUserAccount: 'qmurlnyj9bky49g5zd6i',
                lastChangedAt: '2020-07-27 15:36:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'eudgny3hkq21ku36n0koxfl49av1u9sxhaomyu5c7ps2aoxaqv',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 'gx4gx8p41d13ah8avw9e',
                party: 'zo0lmsu0e9d2pzzsfs5sfu63qie1q3o0tt18gezncueh8n2gejcf5zz7rdl5gyu69z2qo748is6uhd5pww0nn13sypfh2dg4pztf0fp5u41k2t5ayjie32jq2gtcih3x61bcnnblcbxz7hlsvzvzg86t0c2zjbzd',
                component: '9ark6y1o0n5wb9kfc3umhs8zgc5x5nh3rcckcew8bcfk6ao3w67m31ah072rt43uejpunevve9vao14do0ts0bkv2kvi9o00vzq4o5ojygfd2mrnh07vsz55pdyekul26g5040nbv9s7oxhl0l85zl1kyzbyxewa',
                name: 'd7fs0l3a5tasje6x3b0ys15raclb1whmnnjuvm90uqi2sl89sc1rr38g6bqw2hizxd37wcv78kim30mimjmdxmxva3ayi32teqg2k1inupzbueh24u9i4ifr4gswwvb8iejwss78t3m0dnusv0ijyauk6j1qfn2f',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'nmdcxl2fwlawhd64olkw2hxk0rwia9x33mufylua18jugu0xhtnnw9ygh8xn3n35pd9tmmpjzb4pplnsueh0is5r5x48uuxha6gaw4t8wq2kjpofvot9qu189auanlf1r3hr6vg4ujjqjoymgtbwrr5ln9xsqum1',
                flowComponent: 'sshcps9pmdqkelyfoiytppmz0xu7a1lnj9ns6oougid45ipybnqhwaimjtpacmfp3hhe83xkjssul3ur5633ol9cszaagqp93m1u7mn9yqzrchfnajfc2deco7iwqpanmzh5ltnah53lpityv0b2kps3yyz56ibk',
                flowInterfaceName: 's7cp58owe84q7r88qtp209f43lskbpqq7thbkxzhct716iaq5eg4u9utu8tbji4upjur08da6tdrknkpkuv7icpx56zpsndu79xbodc7529dxrvfcixa48ccm4jrm0eko2bt6mwy1xe2ung1s22psbyl5lgn6ikx',
                flowInterfaceNamespace: 'bkdj7e7jysaq030smgijl0f9ruof0cskq1ny7j1ejsw56p7iqj8keyv3wqdlfo0h986y44hp81mvxjn7h7xrli8burmax4s9lqic10j3j5y9czh8b4899gbkxnpgnyyt3pcu3ra2zb2lxof29sfa7ipk9p6cqxta',
                version: 'is88s0fwl2b9ith2b774',
                adapterType: '5anqmgjjrdotzax5efishngj42ikgrah3wt43ei4nq178xoxsi7b4tasvw3q',
                direction: 'SENDER',
                transportProtocol: '9tup5krrz6ibjkpls1b7ctvbdhugdfkoltpze1mu8wws5pahwsknzcfgojkg',
                messageProtocol: 'kze5ep3q6gyy94rv3sapdeerdd82rwtmuyqig5dgo286qxs8mwsbrlc6qdr5',
                adapterEngineName: 'lkkn585vhx5sphppoy1aw96iq9pou5y5nu9scvti6hme6sg85truafnjc0zzefhlxr6c7k7qskw4q98zgf901yjqil8enn9auqd82zw6m33kwfx2n43f12kbmh87otn58mrwabtzjnxgqx171mubufu1ih6ppssc',
                url: '2tr1pimo19zdse66uf0sdanxh5ea4kxx3h0b6xnhyejyhm7lxax05jgq6cie6q15wngawfuadhcgh94bsmt2765oyvx84rca0jjul45ot1bbbrx4totdhsq5njk40ink9838rl6c0nce84q319r7i6e9lerbdk3fcz2w8vuass29njn6zgch5al2rqzvspj57r0o50q4tvm4aqmhixdghov0a93asyfc6duysz11nxpnkfi074eazgp8wk00kgvs9boecioqdi4iw505xcn1qhi5itpj7zz0sjhdb4rm1uvc8q83hjgyaybmhkn8u9zj',
                username: 'nbfutgn1nfvrbgsw8vfvwsc2wofgsu1eis0u78x9uja4n9ojbhju06g45m2z',
                remoteHost: 'ywm3zx641pa4rk3yuovfr2zuda5psp34tua2varp0lekfhlez3ucjaqs7rifn0quibzro0m9thuxq39wi7ag5yu4dn6avuy0mhu649ax27mn0qh7ieybokw0p9m14v652vt2wbuchgvmhekr8t0v4pj7wn6ov297',
                remotePort: 7901997363,
                directory: 'ztb29hp8jif9si18eh8omc1eze6ftoq8kh7ctdtunz5p7utdbefqbepipnqjk5wxrnnmsct5gfl0rrha459j9p6uof5qevtuosf183hkoiomp4q33vq9j0j3ohiyxjxd6x201ryvl26qv51p5atvazx05flbfg1lu0ng647ke9fool99q1hzsy1vfxuge1ah2oj1eo7ejutn25eh4wm69fks7qz10nfdcdvhhnduy335f99zbms1m07s9fxqevju3oeoc0jpepubb254raznk12daecjk0lehu5blauvl7t1f5srwsd5epxkydbea1tdeh9azpgiepf24kfubn51nsisvndu7fty14dvfz9cirqjd1md8zxuloz0h4n078ujyer51vlgog5lm6ldlzdbkpsojwiifdibkvoe9j43i3sn6qtiukoaeftjdv8kwwgdzwyw01um08zsfed5xg4fzdsrqd0bsfvzoj84kqbs97epmgpg2029yl0xrk4svm85s0rijdrh2hh1co9lt9q02qp0et4itl61ik5dpmqy09g2t0h68o8vbq8cp75xrq7mkr8308f3k5yunf3pcq3hq1ocvz8fhcjkd9avuajzd7k6t9ubore82fkwf944m1nf4cl6q9ly77x6b07z22zevp2jz2f2gysn72wo094un7m5qx7am48felwm9z952ktkaqfydrpm960wrb5vz7fkeechhodltqm5dddxej04xev9lvi7hepjzp9hkxhx3zf67rktpds4eug6tbhuxudb9dnx2ocaa6hpmeufapj05hma107fn6r89ufuf8lsoozwl8z8ip6fszjsgm8n4io88jqux28r7wi5f5zc9lc5a972oqq685dwd7196aunru4medqzl8lze1wb78rp7d14sv39jz32x0wc6jl3dvnmntzxvjkkgua6gct4rb4bmflz2lah493jwdwnk4x9v3h08femqehsyxgmmh6hzn4kqg8q125p8yzgv3oxayg6jslk',
                fileSchema: 'rrn8mq7wk4kc5d0al2f5cxhuyhhkbp5kqd85d14ktwa0027sjhr0yjwghhcn4vnnp7gyhd8uqwjg6s8g17989myany5q92uofisem8uwvkwvube9z49otxtldphuxs60tw9d8i0ub94t6oumy75ewcl5op968s2pdw2qjso4irirqk4o5kaorkxbkzbqmyafs5ejslhj0t4vdenbcdbzk9syo0tb8ynlrhzdhuc46x4r3cut2e7wknr3spcc9jnthwst20jk8ns3nkeb10k7rmvfjf18g3m3wbwitqyf2lxloko9ebw7b9e7q2qmdyefg7zc1flswcqfgsk6958cgdjp25cw0n3b1gwl1yxc3hhcv7owod50dng5x08h0z6fpemd0p8tmyg928y5bx9wds94nuynsjtgorepp8ujzcvqetvb4tu8r0nit54igquwikp6jj29vkj62zf60ii5zm9dg393arl3p0esk44q2dyqpx7zqeax803ilw8aqonqne4v3h6hf01hmdrk22f737fqmj1p94iypeds1ge14vxmxaj90fe82rk3l6bc3euuiiuyf3uz69s97xbuyv9qvdcavfhjpsy3y3dw310m74r97by6zmcv88rlyle7049xqjdjk3qd3ikgg5pdizk9901hnbzgks6vgpbprjt9o67rr8ghm9oiwzgxkevqihhei8irodg8iyw47rks1s0f5pvvy671uaq4jcnrtmzts1uloatrrosex58s9kha0trmvti43gvjnd9tmzrjhr37pwfv79f5a0a1rips4a5sxk3voccoh8abmzj5ejab2bpijgupgmps2onzzmv27kfegz32bjowtzeoase1plj9vcg6tsd53w1se6e0kqvjr9anqyca9gx75uc1kazzmlwkysi15vtx5msham2xdonwqdkh1rymm3dj1i4zsuwlmze4rw7swccz3e9ovsgo20omhdokhqk8759ujaiguboc0vsu1mhg67wqx6adopmwxzhf',
                proxyHost: 'z0zajm3sypwwuuvhic3ja574par6vovf7aushey8bwzaulkzeq4hz1nnjigq',
                proxyPort: 2571570605,
                destination: 'xj9x5u957xe8x4t9ixaclea98qy1zii4io9vhh1gai3712lla58f6i36ee1jktwynv2vc9bnmzf2grvw0ubj5674wmpzpne4dda0bzyfi01jg8awz1nimh2ncq7m2kcbn6ya0m7ka4xwkqae7xez2bvq8m96umcq',
                adapterStatus: 'XXXX',
                softwareComponentName: 'lilvodixagudr9ztvsry5lwyq9ry55kg28emyf108dqgv0q7dpiwtfg85hw9wpbkbsl4vl80jj0imklwxj6uwjmgxsrn1widshhfkricc438my42t9tcsgl8y0bv0ojzryytc7qose2i7h5ssh8nhvfryr52n2ts',
                responsibleUserAccountName: 'nlrgslox8ol896jy025y',
                lastChangeUserAccount: 'n7hwh98e03ynox3w3u03',
                lastChangedAt: '2020-07-28 02:38:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'mzfxhmjsil3rq5sy13qcl0emxb96fun9pd4tp7q430ht0akn05',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 's2uh587e4oeg6li3xk8q',
                party: 'of1xgi33zeaen0rliys0reqfuab5h5jta52ueq3dh0s4yzvokme6vrzbndv79adsexmai7eohpqfxcdnhg0t566s8ppo9dj96o9km640wezu0foxptv59nbha9p04lk2pqhtank6im03af2myv64z801voi6xvgq',
                component: 'xcsyi9qk00v1ucmduf6zpnwhljhlu9r15fdlp6cy5gc8i6c16nti4o10fapznsed1kstr5e0c684ah61y10at0r8kfx8qkg5uabwao6fjtvzxdzh1tkgjfqojgbvsstaypt3n31nuaeymwn3penn8jqupbcjwl8t',
                name: 'ychstuacxiiyic667w0ccvrlv6xvdvpksoi65arnxu0c1flseleoe96namim3ckql3t5mxq9r4wbn0l2veyj02uwx5yiniiucdutl5vjau2rubj0c0g7d7svhyz7kw223clevtll9uffddsj03pd4zu5nwu88dof',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'u50d32cggjhrs7a9i0pjjvtlgx1cbl2tg87rere00j763hwu1h2swsal9u1ehk65vpiprcxtk0gdfyyyaby2ihbioj3ea8qtm5y56uhgvsvwyakszgvc6romas4kaqusu8b5vbfv5zp2pz26jni2bvjnmiixhonj',
                flowComponent: '1fteobgu4klez1l7qw3a7ile4npm2v1pse4plg78ippvswy8a5d79jqt79l7zxvr6s3fhhzlgbwe21b5y36f5soxvy85qfh3kzk909hgjydq62y8y8fnbabtn5hy2cbr0vtgnjyki02cs5fh23n4liu5hlygg7ru',
                flowInterfaceName: 'rin9qvyzzt5q7r30wg1tqlm7fph1wu70x5brlginhhgoav41bqe7rac8pv9r79x2inl13260l435asrbwxcuu58wpi7neipxyncw1yd7ecdpnsprxc4ai1ovxglwb2vjihoofqx5grbcedww5qks19ta5bno3yqt',
                flowInterfaceNamespace: '87n64mxt44xo5a6jgb9c51qujzej2bve0e3fmqjztv5402zb7d0t9qkb3onidayhsniht3f5gnpvno9bw56ndzwihwftemork9fchx9so5ucylsnseuo6y2im8moccko0y8zmmlu1cu1l4v29vmjvxuua7s2eidp',
                version: '3v2ezk9hgf6jxa96od26',
                adapterType: 'lpxi7z7q96jr8n2c12hxxkaxqf1g7xpp6kkl2t8nn68u2jmck83d8xh7yc2w',
                direction: 'SENDER',
                transportProtocol: 'cjxeyk5rxoegrqjvo4lg19bzuuw26iexqtusffpkps5icy4olaf0wy1rar4d',
                messageProtocol: 'pq251m1o44au0v5dgx8izz0ozz6dqmd8gl7c5pd23in5vgecxc6l2tm9os92',
                adapterEngineName: '1ojgxqenjba8apyujk29ipm3apbc0lbnhczddxed5le0e4s0nthwh1pfz0poapkkadhucbrco4ao2neownnbj78419w2x0fw5jhvhtrgn5tcoy2dqhisxuk6ssurzct6up5x4t0h2uvfbj1jndqg3mj71gxrt2bm',
                url: '5g64g3qn04e8n2q7wnqcwgfpmc8or7dlpwfiboreflbxvlrevno4iigk009j8qdvggk8w2ea33o7biyfe652w1ugvz3oe34a0f32o26cm83uv1s89sxqu5lcn6nolxfp9aqw3rbr0z8zvke2i5rf2eia212oh4hyhgaa3ys8id7mx5ng4mz60msa4z4cdzku5asja4s7lz1hju5r19ok2ufhqnh9mrxm7tlc9ui9syzhp01djl2qcku8hh5nh20m64kexywqio45o9baz1p9hlf1kb61fniitmmntlq8othd9vex9rbq139fka45fs2t',
                username: 'isqifodgaj6ynk2o1zl9in25i1wnqg25b3dsxaw45hz2zgd7tikq3js0xvkb',
                remoteHost: 'nbg0sy5bhcyx5oalkp87m7udahj2sgc5mwd4t337ykhrddy0ib3jri7zaz4ofd58djfqhpf5tt3dd83k1hl6d0h0op3ysdjxnb0osrlo7qlug6fomcf0u6f7xtcr02l1p51405f6nm89pikinqui2cdcj7l066tb',
                remotePort: 8031194943,
                directory: 'yyinr77wyh8poy9180pevdcgjaldqi6w004vzj4x7qk5pb1s70evwvejkbgm64xm3g5mfxljt4lxl2zvaexwn9tuhr42cygl28udv2zbxzvbxdbpwrc21vfqp14e2dmvha1fo97pv7gcm4gd35e8amnhfl1omyym6p7sqtkruhtkxj7yckkb6gcvhw2ml0b24zcpmtuj6no6nqd524o66rqhqb67iz27xga1h14bdnjilj7nvgy73lwy7n0xy68okihkuhdzxrtfx7g8h3s23kzg3lllsr5ub61103vhn3blwvewljg9qi1bbys3au7qmb7d1drsexp5eh89hn9fvh1ve0xeocbxrah2p7i4larf50rm73dbfmyvfb9n2d6zu4tfr3350c7by5n2sxycyd0a9nnf4091cytu27ir0mgxulzk0sfaa7ugawoz5dqir30u8lllsmj8ae3psp24ec6wchibhfjfhrri4rhdwmiw5adfeywfoxks1z3xclmxwn21utpji1pj2i9tbr75cmbr1ri6odei5jx788v28cievu2tqisqm3y3xasq2ljm9n4kbt3ilyqoekjjzb9l398wy8dlgb2evc4j2g1ub3c7iab010e6wfzcycbdrlzmv5ds9tlhhb9ynbf36v90kgig9mzi3hxoxng89ggxhd9sgbdrb299dvbj2f16jua8ggkk1d8eqph4ynubv9q69rnqhj2nqulb7nz41ix55vnq8gd9bst5lv6n6t8x8eajw3ysd4fa9joea3li9t8hcb8gbo79v0iix7ypzlh3al3et0qu59z71jk23oktnvp7dvkofb7uhn89od94mxp8k863d6xhfqtwy5lk8ybr5sqas71wpdn6qizh1gmmzh9ptujv9np0ya60qghyyedct3by3gj6kih18znw3zu92c8ebwh53pns418aai1zi5bcb4oj9pdb53star2pw3mw97jobcnpd2kspprkje7jvfiruwz0q09dn0mhlwbh6fr0',
                fileSchema: '7001qztao8edzgrwb3kfmtifzscgrf63vr6a4ur0y53y0b2sa3arst2cx5mguj3aw1rorvyy3tseiq5d09btygvcpu30nyvizg8w37l14llqwzzfpklz8yyzpd83inhcgiwb57d05w81y153aia2xriwfe3wr5q9cjtg27akkz1kcblfie5voayxwj1nqwe7p5009lvlxa9o1c771q5nosnpms3ua1j6k7cguyb60umk3t6nkij4d7c9d9xl0akwqli4td1j76k8xqxawa34te4k2yv9mk1z86r2b8b427gh6kosga42pimawzhghndg5uemq03c6tfduu9z2rpcbtwh7exuzdgv75xa5ybku0j2crxehqb79jvd97k5thz0vbyzxmf3zzbfcmspay7s7wsa0w0q7w042lwtzzi167ysrrfz349ev7q2ybysh470q42sdcgpwvixfjmdetk9c6n9rsdoe79v6dcdfgqfa11vn6nbicgd2j6sydkjtmaw6hd1omx0bwi00fh9faoaq8vt12bdadmpcvwitnxcoqrq77duiv4r1glb4781pq9rqzbd266fctsel1rp33x46a1abo4sflg73nv1zvsihrdx5579st02bhhrm3kx6831hhdy7g9wot2buxf0mkpydvbswyxatn6dbnf9uvujh2rcl6jfwkuny9kll7e01hx3kugikuuqe2f6sbn3hrvm761pxijjeh054uf94td4qgrmlcvqx4ojzh4q9mgfhqjmplx37fmpji8h5tjt6wyex4umsq7dgukbiwqsrzpcxg9w8p8s8i3xz41m2jh5gvmfqxdr0m3a2k0gyi8c2v33dn4t3h8hd4ug78zc4tctwsy9n0lp0t9utjs7elcorcwmdinelqu3lrk9fv9cvq4qdl5bdzjwxadtxmw76b5td0e0twe2l2n9ha369hlax2cd7w1id79t2sbaszu4qqtnbuzi0j7xv982mlkk95qvbc665wh9ffqgxypt6hut2wrp',
                proxyHost: 'q9pb2l6xth05xshv76kok6595ny66r7ap2ks62agfody3gazup089le36kdx',
                proxyPort: 5333368191,
                destination: 'gi3yw17krqkg2fq6ngeo4lqgq2lylu00p4wr51xnlb5m4l8wjkaqz7ekkae4458enhu4nt21xr573s47bslid1h1w7ratq96hi5dahyvymoqhug607ejms0h02f8c7lwjetgt216ahhbn3avyv4dctuoolphe3k6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6glwn5wc6c2b6xcavt3rqo9zyqijeyznc6nklhs22eprej7rgm51esm3hra74turbkaja0eaw0yrw4med8fx1i2iltp4oimajcqb8j1p25o97v6chtylmeq3n9kh0xtu7wbw39t0apjbpj4wddfwvwf3g08827t8',
                responsibleUserAccountName: 'uj6woijhv5spb4mgmmtr',
                lastChangeUserAccount: 'qam76od8lmphy7fpojg7',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'faqtvutm50u86urfgd5kzlbgf78k9vtqqa6uruzqs16re28q1x',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: '4edkar00ynd2pntyoqab',
                party: '3njixvc1yoartl1a7nzcy3ozf4qq7wssh5ja2u1ouzzhxcczbflcg47xyrgtstjcg3s0h7qslqxo8j9kfqkqm2j91udprcw0dblmhubnt8h5a3amn5xds0422snlniiqz5creff0ka1nowdgyk99ms65tumm1ho5',
                component: 'z17xaxvoaq36xm496tupkx1t22nniddjy1a0siyntysijrpw61vsqh38bdwmdj8x4wx8jxjz0648vui7so8968k3pbuz2tz7ck58bsvetjzx2hh37bmyx6x8oa7ra1mmxxptpfqhzs19qid0x3cpmy2m96z89rxu',
                name: 'tk2in4hl4mqi5ozan9mx3xygvec4wya15jp95d6vy2w0t4knbloink6io2elx3mkw09u05be57cwgdzqm5ih6zgrdfnpdteye0koxfopzaeqwepdqrc87wq4lww4bh0by1b8xqdvr1k9b7wp4qt9b2qgo99sk1ng',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'jegyw7wdtingw3l6npgdcew3qnpgwnc6z9iw2zsipdbeae2d6683yxz34oz8pbwbv665p08bx4k8duj7bwlqzaz03phwnqzd1cv0m8xvrpy8zrqzfmwx0c1sqa5fhfyq5tqrvhm975viuifxyybsze3ie39ke4is',
                flowComponent: 'gpc5f82vf0iblrno3cpwo4emuqnxistqyqmphy2c7xlujekb4ynlieea3tdxv2u8ffex3wxtbpkzaimusb022zfdfzowmdv7iorzysy8d4bstno5k1jg66uc52ekta96w01xt7zu0pvg8gn4djvfgr0i3uzhf7lh',
                flowInterfaceName: 'k3scp0yu8e2rzycp953d0q8ge5iaqph3xs355jrkf880dcvb8e92p46d2wp974xhmhvvgs5ayprea45qfrzan0ip0cc744i9025apsgu8pneghc7it5pumn7nnk3ye0a5312xzvhvuety9hwb3vrz6u55665zmq7',
                flowInterfaceNamespace: 'wt7iu50mju8pety2hhjp3w165iira0ogcl6oyz9st0fvryxgk6a0kchmbjblplk1k4off3r5zhvjeghh7e6x9xw2uf1jikdjg2z6367uauh51bv3wv0q6yi1y66yoddp7xwrp589p8a8wwqpehg68cfddas0vzdt',
                version: '3wucahrf102gwx89ov85',
                adapterType: 'x407h6h3tnkrgz830a25xbr7tbxg4sg7yk4kac95f6un0pc03i4mz0qwehzo',
                direction: 'RECEIVER',
                transportProtocol: 'j9bkxvzekineqypc7y7xi01s3ftuomy50rcdm7pcl1vyc5q3xld58mcnuoc9',
                messageProtocol: 'sb5ol47wrjv6ui0lrd73emu5yygserdzuptx95x1rmeyizmrvlmeberwb7zv',
                adapterEngineName: 'xjb59hui1i7vpneu30w0nluinri1ylzu8c0irm5edzm2ceqypw9xn0m6wnsfg4bduocu7d86z222yn2yagq0elltd0ktilhey0nt14vig5yq6x2bjtt8nojwtwhe1p6nzgh73i3c4gie6aaz3i9il9uk8694hca1',
                url: 'rvl75rn81qq4332uv48y8dgmswua3nwfvz1n5qppf7rfpihkk3kiu2c96bt6j8xnz3te1lc5vnwei0qj40vh7rag3wefgi5gk3e16mg72kzbrr3i59iekhqqv7i3dqhkfyf0non4g9t5vmgxbwm14ptl7yvy8rmvoj7vhndis17b4mu4j036zylyjuk24ctjtnrxxxicaljlvhyvlldrg2dct3eweypk3ta4qa4ka7rqdop8w1hawxnod8uj7lqsap2xh5hy2bk5zr1tvty6n4ikq239asx8dvopffzk9jjk0tpwmbw16zy04gxldnni',
                username: 'ba1rwiydv2uhq4hqmi56tlnmbp2z5qirhcfwdj3p5335t7md9u5s4js28jt3',
                remoteHost: 'c4tgpy5h1vlhfdfv9gmxzo3awni6xhizxdyhjaswbtwuzu4wawsd58vh3u4wrrytdh8gmrb3tg3s3btreqqtdlfgsnfdj6gfc6gb2bxiks0y0xxdnm11x15imkvzd7875py5wzdubeqdx01011hdy14hn9fttewg',
                remotePort: 1118312713,
                directory: 'um8yasjixpr65ss3wvgoavqezm869188ot11w8r7oqunbgz44sf3oomed75uab0zumn7jxsksev418osxxmz4lr625atgahhsa0i1j3ym23emhvpqgelwbw5o30898e2d4bgb3qi96k7sx1sy0u1di5zy0cln1nhqlyjq058laagafdfn7e6q5uown8tf1ny0xy2c8wqy8o78xtc1jxzxii773q70p180rjie0ztz9wdbgxifwma54x590yv2fd2k0brdlmvdavs2vpdekblcgqma6zdsvkvlyfr7lidaywtbh7hxch2tlf0wm3j36kf0hxwunsniid1250vc5qvehtpsbs71any5nngp8yre3jkmf5err5s6e61yku43wn3l1j51hzmceysvbkmhv6ss8khxsht8h4xyzh5yhux9izgrr702mgil93oux1vlztl5ig7evg17pqzxwrv5kgdam7rownl74mzr3i00kdnvobcx9fkagn5hj5nia3amggy5x1lmxyulz5kozzekjvi0grvgd5bg0o2ieh5qzgpfpbfclekixnf6yp8a8yamcfo67q0woydp5crdl2ardsn7igarrypjs6m63k5eq2yag739kqfy2mof7zv0oziym5p6h9qozvdv6e0yz1vbjy9oi7itmmructurhrvfe86kyd7tvj966ad2281q3i9d1se1ob73t4tphzdpdnj92hsg8jce0i9rsyoga4mtr2q5j36iwshjp7mas8xta7m4sds1qojm05cubqfx1kitexpatauihisbs8qb12a42lrza1gwfxjx0bd28nlr71ugygcq2b9cn0yqebesbligdwncygmhp7g41pisdvmeku9oyb0m7ulvua5qd17yrtmx2bov95uxki4lk00dhu1c2l0ga70i1hzltqu6ik44s2budilvqpuy11iwmlutpb92kck7t8nijpo0s6wt7jwm2xtiq2q08l705ozypa4r3sxnm9ukoyt82o5c9wmit2f6rut',
                fileSchema: '7m9noqx7syrihawcjjf45kc9g4xpoyipei2y1l21wprzau8ccs322bpxkpdgyoq7ftvjbdwi9lq6f7w9958ewh1kjc0lpzl822hu45s2lwziv4b11whddwe179p2p4j8gfs1fwr6p90dlhmqjd87ssk7g70pyniv3b7wso863cmlxgm9i400fsend42mouc5tkiwtibjnapt8l1j7idla4kh4fgk7hy058qet5qoe1cy57eceimksk89da1b9dj0ngmyazef47ueedznhrdxkvx8qqb6awcl4hvfjur41v7p5fbh903q7u5zs7fljf1hd32zituiznlgf7lflgekslvrz5ohiuoftamk8yue97c9nnd8w6y4rumraapa2z6sridpayf98kzzwqip4mfvfats56euwiqtqxzq4xh2u2a8r2wswh72z6a9fy5wkf12lfsmfmafs9skgj4gmqh8ssfi2eekzu5oc3vylt97jjcjmy6urtvxbxktmhuho7gscs13uypamg8r0t3gc9msfsa2yy4cc34l7nesc3fdytd08oj0cs4eziagalgyt9yv0qzvb80sxch6pycae0ccyxp4op3v8qraukcsghln87diqr91h6g4j71dye5wc0cu1ijwswv7met97uvvio63h8psaaaj9852j6rpvxhhjqxruc10vef3rxpoyagxt1wkj7z1lrxxqydvpvhxli11joeuw63chc026wty0db3w9sqpm5l23pah09rn272bassw0kzerv6k43x3gutcl9rb5xaz1wh8rlopaj7h102sve32f6gxsb8etdxqgjoz5huhjbe6uudgog2t83c3x2w11fklhvmktszhoeuva946jsshb1tns40j7gl7lhb01gnxt1408xzlxca862x8dftvh8z9uhpvoesad9aiei4gc166gimtw3pkk7vobix9ibca8jmr5g0gbv549agqyh0qdc45i87q0mn0w894pnxaz6uijqi30rxq0b5gdbq0eqn',
                proxyHost: '77o6zuqsw3emy3h2s5ie9aonxm4405l0v3sfnk19mkfuezpqnc0ox3offs68',
                proxyPort: 1215187116,
                destination: 'a8xmql41u9axf8k32kkoa54c986487u3vt52s65tbnkels7qex8crpgiy91wvxkyk40yax5kjf6w5g42mf9u0883h1qp3r7jkrafupdhe4za5i6l3qgtbjcb3qqzbyw0vcwu2qn22sf3s6y8whf7061vccgxvg0j',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '90n8pkc9nsq3yx0mk66gup0oq3re45ay42t33arkhj95iwwahqsm1vihc1azglajt9yuxvyeqpwe4xezirxs341vcgb5hxmwm6bo03tntjq2vl5vk96jpin02lzx2t92xuzdnsak2cub91skzqxy9hb695spuiil',
                responsibleUserAccountName: 'jjyd42e64u39n9jjvkj8',
                lastChangeUserAccount: 'sqihx2cu1nhwwqwg28ji',
                lastChangedAt: '2020-07-28 09:46:54',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
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

    test(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/a743f0a0-2563-40d1-ad73-013f75bcc8d4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '6c758431-5ad6-499b-8705-4f64fbe5bef7',
                tenantId: 'b228b123-7715-4085-b591-29dd0ac1ad02',
                tenantCode: 'u9sngpfzkc0wjj9jkb11iq8fp7alkye7pzhh5jco6y3bo5w1ry',
                systemId: '6634bf44-7163-4cb5-b33a-a723c0b54de6',
                systemName: 'jt1ij9yel1wr9h7fsum0',
                party: 'u5sn2k7pfvxuxg39jpvw8azoo9qlygqdp5ywbonb3kmyfo2ry8gnhjkzmt5ugu271y8pca6rs1la796rej1hlbtnbw2mjjouhsmgch7xsx21u4n4y0dqb59b4tnwrvs198jn2j52xx8vgrcrquh89ri89bfqujn2',
                component: '37vwdnggkonohf51c01od02xg9yknwd22a3lmim3rmorjfemlbu7ehs7m5ybo8m0sdpw3ayq3qrk8ajkc9ix0n70zvt7xpy27a03ru9z9mfi354wqt3v3yt7wu7phnsa8jd1v472ka2cwxddebroqtyc0luky1gv',
                name: 'vxngtifpe453st29443aa0cu3oq65d1d52mqeupars053x38grou4pnv9yp0cmto7b5dsrelj0tqapzu12l8mzb717czxojcsvbb68jic7rwsnurh7u3xa894hqqe3mvyp17knvzt1w0oxewcdcpz8vutanscxtx',
                flowId: 'b1b95221-aa1e-44d3-b146-e0da2d9291c3',
                flowParty: 's51t8aedqz1ystgq65ovp94uju5magxwvg6qixvxxcbgwyb7d1lh0nc2gnoep2w2meovh8c1mfmrvjsmukjbx83zeu7c3s1pchrafnwbsdv691bkeigecz1xzbfsqfs9ivdiq034sdkd2e4hw2uykaomp9bfwm4p',
                flowComponent: '8w2rt7gyf5kvz2set3hpzy19z09rnw9uorpmpxkwdshl576p0lrpsg9pt9c0qenwf7ywidgd0p5t77e6qci47l5kw2cj0mkjhakmiwyrz0ls62etwypey713nxigm6x2ivztd72mc0e9xu14h67wluh6n4hpw9ed',
                flowInterfaceName: 'jota3l5awa4yyj0tesd7l2u50iqix0hpje6yjby3a6ao1yh2w7dnabfxxj14r2sjgqygmpuci7rfur90jtst3lyqd23cl6tvdzmdvgwu2lxipjew8bnonsohegk0w2afwsyk9ocf01sqwdxdktn1sgtm5rw2y8f8',
                flowInterfaceNamespace: 'ai7th04byjqs46q449v8uu9fbrg24szlx6dkjgy9220l9vmgwphdrktptuinjvf91zrkc1pirhb8ptql5a9pscj84e20noz25yefb90xhi541ibkqksgmzt7dkd0jtvi8hdoz6jmvrj16fl172u7ljvq8j80wn1t',
                version: 'b3q0dweadppheqlpcw6n',
                adapterType: 'y256us8q6a86cl6c3kd9x2x8ynojd6qkzw505c1i2s3odi265z2gqo7mjid3',
                direction: 'SENDER',
                transportProtocol: '42j3lrupak4x0k22zjjqgwf2i5x5xgrpoqzjbygzffk7jdmqk31m2i5lptuc',
                messageProtocol: 'um7cjh7eyk7qi6k03rpoior3kdqpy8q8wrqwpvqleanqnv4oudxvx2gfuc06',
                adapterEngineName: 'r46s59scedv8t8ymds3e2oafr0orzlhvogo04pqckvhtppiafzt5v8h81jwky3ou6dxad7sln16vankjncierlizxi9bist5dhalp6tq4brj2e36we286ll55e1onapp4h61ywiuskhejh64d1wm1hxp63mkak2z',
                url: 'i4i93zm1lyo7dx4vuij53p11nhsieipe04fhic5ofyvnpaj39s6w586dah7nkr9wfbg7ko03oxjie7ohllodwzj5iyete4pxy9msac9tmg9qv6ugt233nom7qsh8m3nj871h5qvw1bthy2v78mz0qrgmcxrmtu4x6a3qcn5d87ins8594davxvmtyfg6q2ade5cw10fra6uuu8d8bi06d17tgevt2qg8sr27104d7f2vs3v4nrj2es9wtwho5vie97wjh7zi2s77dcsii1prva55mabzsj53h93t74ehqyr3xcrkwpcx323i4tkw5ww1',
                username: '78exotfvwf5adk0dizg416ozgzqbok9dbadbhijpcuhr4ylwxhgj84fr1mws',
                remoteHost: 'azcjxh17mhlus034lndke0sraiui65lna8gmfrldo6h9y6t8fg45iljsifdkps0zb07r0nboueznn0c3dhjtcace6sp2volojpvqay52myg4cw43vbmrffq2op6uep9lbai5wvxf0l6wvc7d9bvanifgf7p69lpc',
                remotePort: 6704105478,
                directory: 'z481643qa1qz7pdig81aqq3e1984u51dif4vpk3r37gxswa08j5qah8afb57cwq4pekt6e5upjnqjhtqtky3lbo958n81ca7z5klvfsyix260oxcf668czw4dyuhyvtpwv9wxol6heuykqrdg3kiy6nw95e6mwx03wmgvsbfa6064cdl2mkdr1ofjtvadink3q5np2snfpy3p167hebhn41emwqjcw9vgvk85cydklzdmb8otvgrn1kjozn5019l4f6oww21ctwev3q0xj7h91p2xl0eyx8k031nls89z7a3azeuqxnarjz8nmfpfxhl7h8qswfffk5t5f8c25qw71bg272ukdpcvlm95urrgo1iaqr8yg0qhjwplijirkh99euk0560vhb0mopa3bzxsvreuvrec4e26vg8bv4lyiewawu9cno7k8dc69tgz0tc5d542rrdsnv2hfci9r974pc16432mz4501oyk3ay56b72enqgjp3x4dojuxmvb5p99xvyixvtpyijmun7e3j74gkvyrvbmurcletnfz13wvpby5h7clp9x3zzuqe3tv3y864i38vdot7k3wpn5fd2o2fcan2pke5ryuy6or9s3txusu3pfly3igjp9yu5g6hb70junh9fcskx4dxm9x18lja0opy4a713uk3ng3aimjn3yw80lj2a9hfjwc41pxbh1arw51cxmtsosp3kzuyum11szl79qf7gxda8qo8jvttun9jtqe6xaefsfavazrlqiinleqbo4dt0iglreguc659t58nrpaeqxzhi8t8rhgqxj0tc57g3vjrj8rdpzqcd359bl2gzuc22b8pwrkzqt8xxl1wsj6p5mzk0t6mcxzfab8unr8pqjhqzy2niu1s3q8ks2nfhfcfes7qtfldwco9cbjg71nfjay5l519cjzm9pwb0w13ri5nsn7nj94fbge6aket37gbpmh1uhkhzjfemfqq2wu4q6pyjdp84nq4nqs6okxtt7phkqe8s1ms',
                fileSchema: 'ae4634kl2es1ibh4yqb5mu6oplyfvbkbagp1sb0biuayok1p6we7wt6yqfbg7r1rjdl5ct1njug9o49a2xltm5kk0jesq6aoczs5548fvfupobry7t4zgtdzn69bj175trpz2kse2cograet3mtab1cw3yfbwmid8qi8vddzf5pltjx385hp7x68lhaohaldgybftzjvsjh7ibycpu5g04l9vqm3xkxbtwd0r3eq8ps03xgpxtsplc8mxzi8lzkkw6aulldvms60chcx1aukqcuqmw8lshg9znr8f8e3xg5t86hsbf7gi66g8psqvmlzhyz9q1lqvdi6oxjad4xdilcsekqjbgr3aof0i653w7nyel9qf2sy61r598g36o3p4s6uwb1hdxzjpizulz1ajoychyrofirekalupeg5d12yfsjmwblaic7z0f88t2iyrdq0jser291bkuo1b8nxcme8wls417obg7z442hgn79yftkhjyp7qfhafkhst9mkwpank48m3c3e90bmjct7den9vwcabhrqw08gc1fx2f2khhvmvr3v2gd4kan26v5adnl158vjcs5x1gbtinssg5t5pr6qfb54ej9q4md4cv3zorxx0k6rzul9jzc6saafczt3mledswf133uuko6phjxba4x2s2h317ue35c3w165tsrxcl52j0lus8x7x7p81nnb2sakoapbjehotvddliua5idg8wr63r6f64gnmwhamwd36d76pqe5j3ajgu2x3rc8kc6mu4x16vy968outw94mvb2ejalosc2kt5avbqhfnjbr3vrsctp2k3pnhbj1lhpizyvi9zrf9g5tgqta9j59h7b4ioyqv9tt1s5r0ntlyinpurraoq6942v0pwls0rx0b037xl3u3tyefwgxgzox24kvkjgpwewsx8nmplt2a7l4rvb62vtr8njtlq8ihz2igywob1dtxl1wozs80yz0y1m7lr013vbk7vwwbci359vck8dzihdb0uaslts',
                proxyHost: '2cx36e7w85mu8mspjih5czw66abzxku2scq6tr1a8puzx5sfpjw5krqet9j7',
                proxyPort: 1902555601,
                destination: 'g1jeltjwqeuhw5tramog1p3usp19z44y1bwel7fv3xtkvua4ov1bqr1cacgkzyvuyibps5amxk0yc1685ib9s13h5ueuhno79c3jm8msw4v5si3k4nvn0zlpr0c49w7mn7fb0vrkviqqhzm2tzyl3ir1djrs04ir',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3ga0lywhf93rhsbs5sjvi36jmxcemsxplf6u21fzhijmsxfo0ihtnryvd15vr1pdqzj00nbyn5xr59n0k2msy1qvx4sk8hmj6u6lgre7c57k81lbapo11kquyqfz4vcmkw7tdofq2rqt1c3kaejce51vddh7ntcj',
                responsibleUserAccountName: 'io4soeu56dhbfc69soin',
                lastChangeUserAccount: 'z1r7fa3x9lvtndh728bp',
                lastChangedAt: '2020-07-28 01:50:35',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                tenantCode: 'bwrrblrdzbtmpt9czfci1r8r2dlkpzk9euuofcp6xmdkg8noek',
                systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                systemName: 's905b0ps7zr6y34qy13k',
                party: 'qqw3o56luigkhaebklcgawcph2nezzvjgho7ik57ur6rjqj6bcvseit0xdxcr9fhajon14f83t6nvxsdaqozfawhw25ks5paqvnjn2zbhe4x6p1nbmd7lp6jcalf0bwqkv4i00xgq8chgi3a7lyh7lduohljh2yt',
                component: 'e7jpgnvn40l6kwjhoqgtboa1fmeco7ikbeork7qzjvapz7y440ucyv251ij1zgfaavyr2w3oo1vtpr7by3ix4pn2ntw49fp226237ch8wmi4y3su9hi2y1i7aca0c6lhv5manttfry9e1uziinxjcg55k4tdgseo',
                name: 'u7b3nlmkm29o3nvukhm41ta7swvitnfecg0vvrpo087e9fiwka72dh5sotjg88biux12jaiedj8vcah6pe2z972n5tfuy4ign4j1e2jxs1g5we8qzvjblabhstkablin8j5ohi09e3sjutdtkpf2ars25wqnbob7',
                flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                flowParty: 'is6wiqas4v9jskujn2mpjhop1l70akurvsvegc55txc7vpw6casasaikro9pvf7q4m7q4fc9qv3moqg2bmuqlprhz8m3tfbqso85gkiyirxbz7fa8bkgdw7qoz159830ra84a1ucqktzb6km7oqfuln6nr4n7d7o',
                flowComponent: 'c8da5crayi905eci2nf71ik45weuh95hbpwmeypvld3kibuiodmlsgcb0z91h8sohinuj14yf1tndftqh428gq7v8shvv9fvtqdrpdtyxf8v4d3kqg3wagw04y07s0nykbwqijgu940yne7rxtyfyvjobqr4huyh',
                flowInterfaceName: 'r4426n8e0zz1xkrlmin606ua6m4zvaa7x9wirmpmq7vlimj0caa8law7xlie8lofsx6x3rdmsa87k81f3rxnu5locf2ny4cx85iur0mx01t4x4rwk0vl96ogjm5ttzx7f7u11z2ynrayv114ogenb2kj1lydar57',
                flowInterfaceNamespace: '534bu2aovlt9shqpufx4ssqghfqbq21fztsghuqym0v1280bgp2bbgmtf57y8xy398nyx40s67vcvzll0bqntuvb2r76hbtk3h3a2nnxl0yvgk6lsg4dqzq6i1p4mkmsktlnr7evkh48i13so3uvm5kreklg5czc',
                version: 'qdeaubgzh5d2t86ht07r',
                adapterType: '2klxy2m2zhru08wledt8uub7oc0ft5rbgp4gqlf7lqx8y6pszz50c0vq63z0',
                direction: 'SENDER',
                transportProtocol: '9qrzdcwcoa3kwbx877hg3as35c1j3jnzbortbfng7uajnimuhawf7ju1h7ec',
                messageProtocol: 'hmcldzxwoxgl2wfq3vlx34nwraq1zc1202yu4m615nt5tjlrqh1l8fz1f1i9',
                adapterEngineName: 'prcslcpvu0b75w808iv12p1lydyxgsdkpq25jidu9thd0rkfl8v7845g6uqd4r9i57cdi7y8sm32rsu4ebhbfcchcsvkiwzyvp3a648eqoy88beiewy72hybvx947rxwtpjf28lrhlg4ne7w2we7xp0xv6nqkt1x',
                url: '5epp4bn9tup6wul8wp2vs2nbedvgot5pquapnvwcasebje4ekm6b0txx3hl7dr24v804b7a96cnhzbnj15y1q4yk0hncqwrsugcr6j9e629hjmxyq8ani7ewkk0n2ekvo24wf8gvwjgx6xu7rc857ry0girfc8dnalqxc9xtiec47kl2u8hqgouwmd0f5zhwuw0vpu2cx0y3urkkey2atdjpobqixlbi8vpvpgnc94lpv248wpuo0ceowf4avklz4mz8wpe1zbhugbfo5qn7vbkwe641h056641f5zskrzwqmq3xx7ulk4is1jwvg9a6',
                username: '4eiiyc2ae760uj92vfg39whnpms9gclhql2ecxfpw68jmvbs1opb1udpwq3e',
                remoteHost: 'hu4j2vpv9el618muvc11hd9zsc02g6xcz6nx9buxx8c7hqonhhkgbej8067b0iymb0yp8jhznyibqyafyuai7apuh40j7huxpvjcm0u34ubr6cnkwkaytrrmfkvokbrg6fxvh5b1l265bpq57ciu9mu0b1gzml2l',
                remotePort: 3248205497,
                directory: 'dfq61y9bgjco0e4con0yfyaarwri6xuulgm8makbl4mw5enkl6sxpx5tu7sj8ontmxufe8ioojntv0vw7x8du1lq32euz30qdrepzgkmqo5sz04n5if0unc1zvc6szif8ticp588qj9hd5gkdmw8ri3x3kej38sa58ghjbwq1wpyonc9vhd8minztwhlsqj7v4uefndkxoolyi7u60jzv2sya3kv2xl9hcrxdrxxsj3coobrlmrqoyykcjz3uyed6lf83heqlyozbhw73r17xnasxhm92uhelhcmq66vevjb0t6b3x28xqkdask14fqzv1v3un33zt91kn7hlkrt1j9zgigk7kch9gbsv96if0xhm59ymapkt9e17t7wdlsmp1vpgee5jd3e06eq49bt9r4g33ddum9ek0j3mqx7frgrwfbr24dmob35vavp0sd7o9v1o3spdz9rm663dvy5l9ryfkm7jdxo6dw3251gx0eaxudeqbdk9oboi0xhsc8dfu9qivg4kseh8tajgaqdko4f36vxazxuoam50puxusd8my0pzqwfjxs6omnz7lqc13b9vnoa8d39fcmrtlnksmcuyu9i95rg8ri16coyx8s42u8zgrbgs0gb5hpyj401a7yud4p8403fczkgoxst9ynyxsbkkh1ef0z3kojcdavzcoc3d3c8by8byangjil5agrx7v218zvbqz84exk0rymejl3bnbylu9o3k95e3fma3s22mp8a2angp4yfvkmmroifonyyyoicq1m7n3o5cvil4xxzyhrtawwau6idsi7bc4zm0up93k4lp9hhqrzy2er23ftor0dn7kxyc1hikucyclnhviujk5swicg9qideuh1y1ye7qjvzekoeutos0cjx7unlnifife8xoxblc6t5b3k5dl7ztlzzcr35l86gu0l2rds3gqjq5j4fz168rnyeuee7jt5sguomerabv1i5p51u8v9sn2d107zw4se0qsgrhjzy6mlrama250na',
                fileSchema: 'grclb1dd8sm91vd2ima5yerr6axkomerwxcpq16bkrts3d90sfvnrlx7h55pepqvcga0l491gtok9899rlhwk6cvnz5u4hvefc17l83flr9kbr11cdfj9el1xoygknkqoq6gs2n29qvujsdrefkq7pcpj28r81x4zpwuv8lyfpqtl14v9th7a8woshp9p9u8hy90iq37u2yoxn3jaabpk7h1f1hm1h13o9ls3axaxjgarukn7hesczeogmv53xkrxliu3x9m794upxtcxd82srkwq4obe41315lfp3cugqnssq8310tjnctpkgokpxlzwrbchzgtm8976lzq23ka58u1vdxari6wjmzg3clod1ujwdrliyklnxqi7sdhuc57kx25h5whp4lnylzemikp83kxnzw873elcp0c92ckb60dfbahrybjrcicj2bmjj1ppp2sazns2fj63ggkkzthlq655v040uno63chh5yg3aqja9tlofb8d225jtxur1ziln10daoqq9zgjchza43ffs4tqygsklbewz7xnxgskqwvfnwc1uyoka4ltli50y627vahmtsui817w8i02q9dj3y0tbjgrjx0c5haehnrmna1qxfpy2yokkayxj8rxq2plcnko45zjeohcsuwvzocwtrrj89l0tbvkw89aamcw0l6dutf4elwizw42zy4nfq393yjxxg7bypoqdv95m52lvs3p1vyq19o3tsjuohzpiqhiem3kz1d2ijhvo4pr9osb2igt2evjytyf4ztsoz9xyly9pxlgn5vkvviac7ekx5mmb5a2864mo8ycuzrg1vdlq6eby9v38sqp297wkmy0uw7h0yo6fa1xppxy9sb18p2z5n29jml251vp2pn5tml3ugwxf27qmjbmydde1z4ymz3b0bdh1zcv9f1rbb4ywk3spgidibndozevwl6r6h23suyzmezuo0aaexu0czuesramscs83lumjz2b53874sn5ujrwanuembcx9s44o03',
                proxyHost: 'ym7aznm6dfjl4912yozpmum5g1a3lvg0zjgdtmuzblzz0kxz90yrdi7awnix',
                proxyPort: 1063219930,
                destination: 'gh6jvj4djpq6f3l2t2h0v9wg4seu5oadegxb9w0145b4fbedb60l3a7vpaq3cpm4hpg1ddn47jx5t0ws7mlmaty701uxqdexwpryoa4oa4w21oauisacgglbsq9hajt071gyw1zjga3ycgsdyeap3hcgzgkzudop',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wolccgktcmr3pknc772cimr34xkf497jwxkh1p62rjuggnc9upu1h0o33pyef9yb0urfovwxekr46o2e1ocsdhg6nhdn6xnolzall3xp552phfzyivxfmj910k7l8ddwo2mf9ni2vny7zg7p9dfnxtn6ca633vb5',
                responsibleUserAccountName: 'eyt36e63s1psb8m19smw',
                lastChangeUserAccount: '43sdkpkjjx5y7blwuqov',
                lastChangedAt: '2020-07-27 16:47:24',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/a743f0a0-2563-40d1-ad73-013f75bcc8d4')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'df4405a5-4d6d-4bb8-a41e-dfdb03536b4f',
                        tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                        tenantCode: 'wvitm9wz4cq8exag7sgx32xyol8q75jmrdvf7b06nvccgpnlyr',
                        systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                        systemName: 'fkr4yywodv9kacf1v0p9',
                        party: 'xd1q1s6iric5xy2ks6eh9efmnb25lgdw92yggrz5v8aq0i9vs964hme17r9ggzt99gd4c4ya1tlmq2wh85ndmtibi94rq2kisxvxkuz29gshn3m9m1nuco9n2igdctd32mcrurjlidg7vy0b5m8gs6dibu9aueei',
                        component: 'urxy4la1abkf4h4twmxq294ldzbcpe4bh3wodcm7gth418kn0285rs2bnwi0c1y4byto4kweowsk3c563q3sceareqpegvdyaziv5wktxsc98u5ss8z5v98i8ilsel14p8f1yue0ahwu1cwz1alqlxgku3wvgzlv',
                        name: 'mv4ixe1prn6azu0to8b0kabne1akwpt081r3mci6ceooil2f0vxlhkef828eulbk01joz2sgnqvgeosp25q4rntap99ngd9170kh4dad1rqcukob60iyt8hute844yefmfg42vvhmzzes04bmo09wvk3hv3ytjft',
                        flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                        flowParty: 'lnza492gn27nlpnw2vm1e0zp0ppy3tvkr0767pdycvciri21cv1h4fj2y27dh1ybf2x4fdr4idyvbopwo2dyn0tcp7l4ka6qtbylyeyw5r6a7ehzyt8kp3axjcxsdap9fbkn3c3gor7mc7ebdr67l9tevns5ou4m',
                        flowComponent: 'o6v3uwvwh2kmu7qxycmw3tbrxnwl207cn961taxfad1c0bm8sgi0o0t5xu9g3lcxrp4ejza77e3dvvaw9tu34n62fsx5tisy7cfud718pho7pkarnyztl2jd481x4myj7r1g4q62644zcj8iuq47ee6p4oovtzz9',
                        flowInterfaceName: 'jaa5afugar7r4vryg54ia5fnae68ft4hov6cyphrtrz4dgqdzm4uar6ghq0cz4jepq3a7b9eqr8va5m3aw19ud1jwyoa8i80ctyjvesnbfbe9mxhh8hfhfwyqzx9nhsbs85pzb6kx54cr0s31nvo6mhnn9apiqic',
                        flowInterfaceNamespace: '0ufsy6ad8lzfe96dlp23wt3gja3uoe1twha7nw9rvhirmerwgm5uyab5g2sjdzneigjn6geubqz1ythugmwybud3yx4sg19nh03077au1jacvbmkvmd430cs2k48iljab7wln60e1hda37by013ewvnteabp40rb',
                        version: 'itllfkd00t7cqnstbgq6',
                        adapterType: '6dzskumnuiawkknkyu02uabtiv4iresb36py00zp14m5xvggyazp3i5flasa',
                        direction: 'SENDER',
                        transportProtocol: 'ynti0i5iwopde0lbo5lti2z9gba1eiqvxj5xadhjom3d6zdodjhit3h1wk9i',
                        messageProtocol: 'k35onin4d2s8bp8vqbb9kh0or9y5ai9j4qcgxvwpyo31zda0e1usnc1cwkzh',
                        adapterEngineName: '86k1vrohwmlzw9oo6atsaum5th8wimok1cm1jnc8wwhj6pxncmxu0auhl36pyu9jzuyrkfgywhmko9qip4wuxto37aas7u9jjylj0m0r5klreibxgpk7kyhi261jsiic1ei5uvrjxs2pyaw1rcx8pp9lzau6to3s',
                        url: 'bdlag7vx1yvwoes2vxrhh9nd2ca8bndiwiid9uwkely6spgaxy8kmy3nm1h6hpep27j29j6uifh0na2vmxfxwbiov65rb7mfo4nt9h6yrz16m01sxyrgc3rka166fce0o08rm6s38dlpmx21kx0olmovwmc0mrdai9p02749c3gl0fj6kpgmy1jcolcr8y2jqumfq4n6j3too2vs7niur3z0drqfmj4qnpdn9g6xh11hwijhtydeeq14nfladrusa0d3ksii1c62b89789twxuy5gien9giuopkk8xnwxoneh7i7nl2whf55kqifvun4',
                        username: '4xp7zgecd5qakz4aguj26yyxkx24luq48m4kwepu0abiuhpouvc1sdexic2i',
                        remoteHost: 'zbgg7y0wqhy34ve44bkvx2s5tk908fkimgy6es535mnzp2dpwbvyu2n2akwo2auvpm3x8s13j1z92ahx1q09gvcnngrckojxyxoaa6tnugmx4tgmgdch02j1lbo9lx0kjxgsxvtand64x7d9hxy0csedy9b7ptdk',
                        remotePort: 6305942149,
                        directory: 'tgen5wlccd1cae2eu717wvcgpzh4x1ta1984zitznzt4mip57n47gjqmcbq9a6byxwrfdrolzu2ekkuxn4peg3yfc77oxf5k4xhdaxey3i6vgj0z4x9iwtnzqkrwleq0aehjm5eo9fys0kmxhgfc3v4b7ve7p8aw7didqsjy1hfojy085bjvn9gav38p3spcz9lb2f9e8j2xuuunpg8yi1v6gxbivwzu4gqz9l2xegmdtiscrms2ttzfq023qzbelnp31yy7bjitep48nxp8lehd5e62qcrcshio56vfx3y8dyidlj1xg0lewn4q9anpcw74e6e13f0z93aaehign66ihy2pf2dwg9x123l3qnmm7ruayv9356wnqb2qtsld5cp7wmwpeks9h2h2954syn58ku2y324cy5oygwpmwp9rbytn4rb71r09f0zjowjp0anpntaziqoxvkmof0klwd4ywpw3cmi4rpzp5krzguecovbiiiyfd25k3dfa1rc2j4luvij1naq20d9yltpkgc1r3q7o0oksgmrd3uk2sbseellki1wqye2szdcu205zdu459w9i38h53av964w36xdvwca2awwtthuokjrhk75snybqo4anhb5cjex1sdqhxa9n9onzd7lbm3ikx2etktym7pgcs6uqlo6hfljzcf0moc4mqyiaut1hc670icfju1yuzgqh494zw065w9eiqwaucb16jr24rh4e3wbjoj3acnw2iao73qncgkg27b3ewlfgfshuvbfoucv2mpjwgtlseyy6bnqhit7o9wwkdl1d2xaun8nhbm1waqwewo2zo6ymibl49njjt5emglc9a21tg2pusz5fm86328t7eurwdzmmhvsbxza5zoegfxclpj28x3fncvm46lh2ml89s0zdlx1h83efkmm63kbg0vsts9fv3t5cwj03w8x8m2tk9giwfc7exobhf54smd7m6d6389iax3hlmdvglu25kwvz5ky4hsc80orfr6vh8i4n',
                        fileSchema: '9g8xm0rv7yl6zvrniw3r9dv6azzg74eoqeaum21vfzutowezulmx39xqbyyvg3vsz4xd06kbz35nc4xnn70u720rsk71rqvl1fa2ywikmd0rm4vw9hfqs7tkowa0on965yxk995rxv0ouofexsyofhik6p1iwniojdl0nopx3zmip30hkjcrwvre46zxll8t6ac5d1eli4usfyo6g05uj4xce9yjea0y0ims3pfrtvjn65qirybohpugx3t01123kfmreb4rswc6mso4s8dazqmg5kau9orr6xm7skiehh8am22q2rlp1m4x4s87e9gn0oqwe0w10jvpdzn0mwxynmmd7kxck52ib13ev3wxlfuglkme8dk5zx7vbszt8378jz5c7ieaffd2lj14ow0nzfjbczfk9ohntddaqg0p1fukynxde9qt4hfsaz450aclkcgcu2py6e8pdyaxzm2nc367xlk3m7df7daaehl28dbwgfv23q3yrl84ooqzyjwwtzlbx6o0sqvg5x14pcu5gnqkjoyggjraigdvjljr6i97lt1nzmeelp9wornzh4m4qmy1kakb1yuq22q9xmkh7rvs31w7g52zqq3lv8mks3j4ixbzl6a9yg4uul7x17lk230hvy8o7jl7z2v9f3uhikh8wtqv5ud3ebym9n8uisq840khehhxavc35acvhjgkvw67sai004nqpxmbb4w4vjgj9krhtwiuscxxwjpulw7c4me05hmv8mxh2qdohnmvz72t6qrwmgff683d17x7dsexqat7vi0dpizjkbh83ocq8ow5a7ezs60i892vwmrycdp6sikq9totf5wsw49tcy0uufg0gug3c9807qlayc6tzdbvswece23kf8jh3jqdj1jnbj17p7xyke6giv3wi4onb6j3rdhg86bqwdypzkdts9zebn7ojlxxp5rudbnkh9xwwhqrzj60pzmx5cb0ey2iascer8lvfwmcss16sn8jtagdnw98r5mgbojkkjh0',
                        proxyHost: '24oc6ld6i4gbkfjvtb5huzcjsk9h284kfb9m5ik8ttr9fnytwcoaarjmvn3i',
                        proxyPort: 9973230703,
                        destination: '4rxshho52m1jpd1ji7q7kbezlajnmqmc5m516ix9m572q1oso7as5ym3b5g473r0bs8ycoycbay5o73vagwjrny9uo04i5i0k191vfkkc8s6fv15sapjpaclndo44yaicwb4ykqegbgl3yj6es35o9zdx84tacvg',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'k54jh6wwwedc1emhw62x6srt64uchl2xuj3vijsshsi4nom5jab4erk635lteqrsrr93um1blcc7o4doicoesuv82847tel7w3t5p7mixug3a0mom2j1cpyxekh7oxembvhg9i15iulewf3ijgmdv8701l5nz7yl',
                        responsibleUserAccountName: '4barh1385y3ktkerf7eq',
                        lastChangeUserAccount: 'm9uuqhsmd6foqt24wptg',
                        lastChangedAt: '2020-07-28 02:33:15',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'df4405a5-4d6d-4bb8-a41e-dfdb03536b4f');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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
                            value   : 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('a743f0a0-2563-40d1-ad73-013f75bcc8d4');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('a743f0a0-2563-40d1-ad73-013f75bcc8d4');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0e5730ed-0bd0-407e-9ded-469f87b6b387',
                        tenantId: '6632731e-8ba8-4057-b8de-2deac8da68a3',
                        tenantCode: 'fgsblfuf7kwa1wpjiehdv8sxplk6bmplb1ir7d0m7z5iwgji44',
                        systemId: '9742f996-af65-44d9-95cd-4fd67a1c0b91',
                        systemName: 'ecac9zrjdknx9ozdb7hq',
                        party: '91wxv9gy41mj3nx4p62fjcfftn6ltrl4nwuf3y7g32vlpcs2qk4xcwf2mz473u1vlu621w4i19aq8drjkn9uzn9wqloi6xo6oclcjnzwudrt989apxwrtt7za9p3x03p9t9x1sriin45jfoqpnmv3ndwp8qz8jpb',
                        component: 'uzirvjyehrww2ohqorbcegblryuqez27lx9p9eprtljk5v7qbfasw51wk1gpknj50yfvc9f42h2bith17i4wr4fhpfpppzzrh25w5fvg70z9uyihp1ao75218bdtv26ah4uobcmy636kdnaeuf5u5brlj5yfpux8',
                        name: 'h47qq03y5vo9930ws1dnnjyd85qcb19rzlulaxg6d5z0zdflssjp2mwneplujyi51n367o8dew0exsji2wggwy65d5aaijvpxrafkiyo4awpd0frron5vr38srr7b48bfh625im6d9qsr2b0isbmkwensybvvscb',
                        flowId: '17e12640-773f-4261-9788-f42749d567a6',
                        flowParty: 'lznrjfkmo0qqm8v3h2rkrsxyb3scmmr3eel8udgcqv8ig6mgb0zxohujtxwdsi26nda81mrisy2xhcjk1sw3ahjz3n2qw9vv3ock8jj5thmtn6vntk8v3s588jn5q7dr0ie9ymmns9wmnz0ucetwgeqtsmuoh5fj',
                        flowComponent: 'om9d795pwji44nriha3x550n2fzsev0ue3t87a1oos74ginu3q817q9oq1zjdo3dy929zv8zb9gbesj9wen6txjl3on7pcxkdnt5ghziazdfssvkhs1m492khvpo46zol6ltyf6qczkmdndgd4rm7jepg586r8zt',
                        flowInterfaceName: 'pzr1d6z04na6d1uzgbhv0ia8xbi7pyepvkmxbaumgpclkqge1ojfandt4klh8u3siwrf314kwkbaepwm8rsjnhqd3crt7f8nkf1xypmk51vnbcrnw3ox29xsoyo1o6h8ex9cb3rz7mfnazq0jb171o808bh0buez',
                        flowInterfaceNamespace: 'lwm3e42354ooph7x3vixrwk8d925257c9iguemp1trn4czuoy5yipfi0vr9xi1u3uq2qrzr92egh42q42aizkttzg3oo0634zcknwu22pysdl2c1w0gx1apo2e6nc9s792kxrl7eqlzojh2acy1xzxmefe5c2mmv',
                        version: 'lp7jlwaxzp6yrmpm6ego',
                        adapterType: '2wdvv3vsivvd1443j6t71s60n8ilxqlmps956ihdgdu290qym91x5t934h44',
                        direction: 'SENDER',
                        transportProtocol: 'schiqu1gdjt78d32p6bcw8b1oqeql5g2mmo2j66pqy260n4naee06mkhya2i',
                        messageProtocol: '0xrh7ieb7ycvyca2sey7ibs1qvjo3ip0vx53ea3sruet9dfc0iluksbab3we',
                        adapterEngineName: '90tkgses1iwug8g7ojmul58vyd10w8xsu4b2pd26oypyhh0jxx0t1ykarcizmxbukaxslvhb5ki6ixdjzn61hvz8kkj97brlfv2ez9iiaiq7pnqraw55rgzsw67tu47vejph2iqldyucnj62ff1jot3ohlgyk6fb',
                        url: 'blalzm6ns5yar6k4g680w957vxruq6p5ajb9b3v3mwrmd4iag50fzwviqa9fquqsphyuhu3llt7gexjhzggde3zw4zcwscynxyuhmbhgkwph0b6lyv8937zpqaldtdw5lalj25vikf1619c482emvjtgwszcqmft7sswv4uqf7ugkl6e891gbdz7x4omw7og520wgf5552mwrmiyy6h5idrehh8atol0piek8qe4qbq3u3dohn8p4w7w5rl096dt8v9vtg24kt75ol4gj5swdu5usvib65hgl2sf0d4c3vwsmrwn9n9qcouhe530uxns',
                        username: 'ks2cke20le8vo70igdanidtpns32cwy4iwyhos6ddpwx7fhj18g3fb50losf',
                        remoteHost: '1p3iww5p24jif8q941k4grko4ztukl7of0858tkc0uo4tvxdav3fi42ovfhgk4hmg1fcxv257s6oykwj28d4yp93sd3y8yn1f7272zp1i4ph9etvmvin2o7z1at3v8289ra30fgpkjddkxip6g6fffxnkvyz6ami',
                        remotePort: 9846614341,
                        directory: 'g53vgn240lyr30uk2jpwvewk8yxzcvswtfzsiwqnlqmia0qo2pac5345da5bhfbkziqyiqbsh0nboleai36w8y7nhkcneuu2avw1291xt6r0lz90mdoe7bsijvmzotfg2s8gktwylkr8wiz4s472ohk0jimpmidtkr16rfy5naqoodp2bt3lhb389wc0b4orvadij3qg4sqkv6gkr1vnjpuhuhyh97w1kfnudw88gg7dc4ifzdoa7jcfp3e206jt6gr8f01fkcj6t0byz0d7xxnsxxy18zjepdlufx0bixrjyeifhjl226vres1xosx09j7v57ll01efnmruo9b6tdhs2q5tz6es31ken70xct0vfjht0pc5e5hw0ed26afxk7lrs7ca220ec99ovqhx28reysf12casny1xr71n5uxoi7ycgprif42e3h4k1r7ntsu5jjm0kllbxt2v41akw6zxpbopy89ehzuh7tr9k034dvzc9osbgxx2gcxwfpck5et7ggsktwqo4yqtmau5t0wn0yxq9ymh2r2psdzhxxhgpth7lz6wr6rg5ywt0k41rzsfanen64ahbrkochyfbn03h61lew6aluerubrrk0ycguzs2kwat8z9fvdk28d7duo4lvi20slm85ghhsu5trh140hk18y7ocdu50d2ea72csu8baz2wfxr0qc96j0u71hgu2tsozz9ntsvn4ur1axyjf7uc37qr37tll4dgp7r4kbo280plar9cwqdyyfmp5tb9bqvtb0w0a7zu6or4cilphs85cdgu6qtpthdpu7qjfwd5b0uwku8zpqb5rbn1j1wchk4phuyzwbvomnangml8z41j9c0eo1g2rqdg6wbe83rtxic1re08wqtlswn8uvw29n1gzmidceesk2cdf8o9ob0edolx9whvsxw2d1s3oxid9q1t7gb84u3bcj8y17xmyu5n8598higv5y9grf9p37eshkdvvaodx38h69lrvsm9ny9eww6hiv1ndk4',
                        fileSchema: '80okbl49inl6do67ckkqeb00ov3cgpglngv73fehfrzgs6hbvpcy8ly2d25p4isfagyql3u4adb3tsu8nswjvsyzrerx9wpfsmpy1n33wuyecbwv7ay5oanz9krze5kuad612lmh3awgywott3y32pjqwyfx5o8micbfa74gpck8m8mhg6zbhdsa6uqido1p0287iiyf2hq4m1hkvcu7gapxgwxa6732kxcbtnroiuq0udcqxm4sl76mtlf2rqi4ddyj1722wtyewrcbd0ieznwq7g67ut5kkdnozelpiwfuzl5vzg5uslqdn3v9h7ghsehtp2stcaxb5m0lgdcjex042t4epevyo8fm09d6lddywe59ytuu7iqaq8rsuuhk4zoi5ep4u9tngefuvmn7e7akfzifa24k0zzqr3i3lyo3cb0xyw48w2uf19phyol7ieya33qrv9bjbtbyy30vcvwyyfjnfme7u3y4sld5iu06wk8r98wcr5wk39vnyhhcrzjpcuej2t59fsclsjnmmx679h61dr9d0tdea2o9pvep570kexo5ftbemhvjh6nb2a5kysqdayh9h259uhjpk39ekygp4chv8vhisf5o1eqlhvyd4r5k33uas73ahjgwnhic47bqfc2s25qv7kqe3ofelkhau1a168eh4kzswopmfeek0nvid9sldu1cfaxz90tg1u09zch6nj61syj4899onacxyk0jpxxd8fgxidu2wokwqfh6xfdd2khfd9otrorefxin6otz79yiuax4mac2wkj8bmlihvjb2wrfs6lp9ppdb4j3fefl5f1ft6b3omhimsuytp897ms9jxfcimvsdzk0vptiwm650vxihx04ok11tslck79qbcenn5k2u5glp2qpye5mt31jp0erwganbsyfdciakdoi6xn71qqbqbjubml4t3x0pekc35llvim5t3wgbo4n9innaipb5z1l2j5sxfoedmde57iwyyvjy5t7h5d379fux9hlfz05',
                        proxyHost: 'icfsy9isslxlfaqbfk666xzezfnliw9q26jdhkfrmagur1o4jutqdlno63am',
                        proxyPort: 8584024211,
                        destination: 'febj5t0opw1njcnyqc9lpidpz5bajlcqghpr955gbb008p01sxdki7g76sf3vneclmtk3fjcil9gc2gf5t9p27o8leopn60j8bzg7rxqe4kf483zlu31wnvo8u1ingzpyeubk9ioz4hv51yr0k4hqwp77e0y9ayu',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '4d43s7d1mtac6u06bul80d50qro64vrb3lbjow27eyfmx4xtzy93tdl8qs1j54hxogjwj2a0frlbreij84tfgue29mbeoq8vtu1zswirs1ovegy75f85o6d1kkufhfl3ggjysn3nsgur4xrhlicwjo805xdb1wou',
                        responsibleUserAccountName: 'lbze8el7mz0aozbrpxui',
                        lastChangeUserAccount: 'u4vgcxbfv968qwzi6cb8',
                        lastChangedAt: '2020-07-27 16:25:25',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4',
                        tenantId: '6ff41dd9-0e69-4a1c-8bb2-470c96f1b461',
                        tenantCode: 'ue24e6qdog6z7bvgzmpz323fz8jwi23thmhje8ysnf84pgp052',
                        systemId: '7d54241d-8a03-4ada-8649-22a0a15c8839',
                        systemName: 'i35p4vmmghdcihxg3f2p',
                        party: '9flnz7y1f6awz1nt3gjhmdnefzr6e0q1ql0ohrcqdykvuoh3kii3edboz1w0ivyitnxecs8lvcozl6vd8w9gbit706lbiu7j2m13bl35t2zfvfyyc10qhic22emfefkeqmb9nluc4cuibvcrajgsd8kfyvz2zmmm',
                        component: 'x9v15kw6eujum11tkifkqrml5rnd4nw8447vmly20wwqqedjb7xybm0rivz711umnr7tu9dnnxwx2heksozca0cayuo9cc6z5pxa0jfr70sxc2vrc01us6928vmb6nst34kk0xiwxpy83sbqrm5j9nyg2ejvrs60',
                        name: 'al4ofad3bk5vs795v7na8jlx20ar93de6qzmovggv4h422v6k6esy92ptr8ofk9ilu5eox3mhs05y4yxhbri05xzesyndoueixrmiyx438m1lxaqgzkzjdthnwjr5vfgiruq0mci08da16hsovu7hoxm5yzime3o',
                        flowId: '1ec401d5-b4d5-48e3-ac03-3e47036ab4f9',
                        flowParty: '89dt5mr5q65qwy57fqxn9i57oltqwf04ys1rmllw4rmn3lss672rkk74vks0tqu1i0wm6zezahr2jazn63ive0l1vlfgkvx9afarep68zkcfqlmd8daolh4je9bsmceqi5qv2hozbq5wst7tip1n5nrdif31qfyn',
                        flowComponent: 'rxx1f1a3rqdlp9mvjikb1n8rmvaeqf19qr8xenqb5ecyj12l2nqdl336h48y90aipfdt532k0yzty40hwscwcx6h6t4u02mum87byv3fxsyeigqp56a8n47rl0bfuirh55cctyk8fobs8ponaii098iemmey8uml',
                        flowInterfaceName: 'o220a5q0m69zp1qcnasyeu6ykuw06pkiiafkyt1xxtwp49t35w68klvze25ps3nu870s6mmpsi7plmrx9jjnbr3oc1326ovntoy4k8qmn3j5dmn6890lnum72zfshzeycuu2e3vec3712crrgssi968briy9kque',
                        flowInterfaceNamespace: 'dyi6h6wzvo9ngq38bw8uowkn0jvsf7wkvms7jmmsdaizo13qtljz8n0kichw69t333tgn3k8ezsz6jauyuuxr26i7mryujs1bf824t6135e0r5ej5nfksg6jm1up09e34gv344fcgehzvbpjbdgeboscfqx6blk7',
                        version: 'byt26znow93gva8njvbt',
                        adapterType: 'fb735pbq5hfdhw3lpeppeadttay2znsofet3yra4upncv97xul62xujqfsn4',
                        direction: 'RECEIVER',
                        transportProtocol: 'wx2kotz4q59rbtwugzcjb3cjfzsql3ehvlrxxp76xz5fgo5hhnol9lsbivqo',
                        messageProtocol: 'sagjcq01catahy3vd35txh8vknz39wmv3g86mv2vydm10lns1o7gflz09l7c',
                        adapterEngineName: 'bt5fxqabgn382o85q3w23nxi2cnjorc6h0ucjqprtaydbvmvuw0artbfwibu6pzmew5a3oqzus3pd5a1i4q0jptyii2mdvfzsdfdnenw6nz16kll8ar0d84sqe5b4d8haiff85pw684tjbyrzztyl8m9zozlgt85',
                        url: 's3untv384ffuam9yopv3ldhi96yii1r8nrftkccjj0vw4rgsyple2laxksp483q7rhvfz4py9kgudohqx6h3zteqzj0xcoj4xnp0sb8dry1m8ipg2x8hqxdw05mmwom0p7bcct14ltl6ly1492v8y5x6owmw1nytz5hjw48fjux413hwytt0a3s2nsshjw1fvcwabqwgwo59hyzc6y4pz23b8q9bb8j1y0umock9kxuhri6jarw55wd3eksk5gna4tfzsu6p138rrie22jv48swyk02p2ug9nryfgf27bhouk5tbcrw306zxsn9hs0ad',
                        username: 'qnpij8zfy43zyjg5x767ygzt96pwsrmu4j2bv0qbclrpqiz2jfrp858gevfv',
                        remoteHost: '99xvelwbv6ni8sdzpc8ko7c75tz5h6htsufcslmnla54h7idtrczi22yf0gdpqgq4zq6d9lfauqaur2ivlqrct4316hpclil8byau3vrvt44cs8rk8lauo7c5rjxnsflzqqa8v54e5652vr1e15khn91iepa9giv',
                        remotePort: 3414732722,
                        directory: '44hxl6pznoqpuqvexhd7vxkhc7ryfzio6kxcgcxxo3rlkwmwaz1akr2frodnnyldnu5lzc82cxr8n5gedt67msag4s5gxj14ogwr0nruo4ftwgkntxiibs4veyku3qqpsz735yjxlthpg0hxtmojw87gxkpx13n0tn79lpypyiv9tzl59pne44vjynb6fiw6bzk2nhu4vx57ua8xzhw19li63xiybmwusrq8dhn0qf0r1tfea24tmoz4p9alezbgs78ur95s42iwkr1xlgmtqzxf41cuixecpjzsh9tzjf3i80cvk3qk2spr4enqriiadmu9iruonl2euur3aswbu5jrbgnbl04dcq8b8wcjwhg3z8pw82xp9kcjj92sm8rs3bl11prp006x6131rkgtil0d5xrzagyzx4cipymp8rkrc2qhv6l45iv2ex9li0z0nt9qmg6lve9by1zh9i6hjksg23w426j2ffvs1eqs8tmrasuipw01dib6bk0stsnlrsykvijebc0apxik6jnw8qwcs8k93ofsn9lvk9e02sgfgnaezxah1d3znnrq8y0rhzssrtajzji69hnw37mphxl3jf5s8mhyjdhd99t6iks1b0saa5nw45esjpi58ffkv7w2qkg4uw3rbkumhjmhkth6q858xt3e8518ypb8ddfzgxhmksned166nd2vob2p7scjfz5xt6hxmimg8kzuxkh1pv4daggs8022pwcj3563hli2v4o7py3y5lkznxe9nzc9asjwiwt8ft2sqhtw6b3nz19dm2rucnmhriy9tl87elo9ax06qf2sicwicsrel3aaer6yhtaobty1ble92xy17edkgiryxbjr6b4m0ku2gjnap816r4jdbix996awornwq6gcunhk2k7kafobddpzmv21u7mgm0w86i8ceg8fq7ou4r2xedwx3yhzvd2vb5x0zg85s3ss0my47c8p6xrkhbgwemdpdxp2vm8golz161k5zgdg5hf6layjbftz',
                        fileSchema: '0bdc43rhp91e7kd9fy57r0nfv6506dl7yjxeldhzqk5qzf6n4d21lbbmnjmphzbgo4x19lesgkf2o36w1dcvwzxws6sickl6fym4dcddvgcf6tscr3afdkxwt8qbx49evyatmpyhxob26ukbfmw8srm8m01wrjheee3zu5fof36cibifacplbxpna7q9nax0q0lpdpg8xd2ihv1oncdi1ovm5t246pwktgyowlmj7wuw77bvqmba51chgbbx8f0kca26m1943edf678z9ccfv4i62h9oovqkn5p4ko8utieqb3d0okc8pfp6lcw510f6z7fpx9gdk91d33ytkmeey06q0phidonh4dvjfacpyq5ssw2bjehxciilm4ipucbrxjhne1sna1iceirea3cxl2bu6kji4ywr4mx4i8qd0tbhz2uso4eousybdc4dxl7g11oxoykl7xuiyxlrn1h7ys6vwagpwqhxznsexswpd5eeazwggjduxfa7h4y7oc5p8ty796x06blawlavucskgylphe51oxkl2c9168pfafvime7y1tumdimb81nsn2ouh1v7avonuqqrw8mqhouu07hgg6150yio7e89vv3vqmsj4p4pc50z3cgawq5g5n808v8vne5ocovl9x0jqzdqdl70w72h1roaiskkr46dtx3aej3gs4qdwscn4cf0n0iovswpsw8vs6ul936c0r8oul13ht3fbd9ixevw8hskl9nr49m774nvkxgr1nnsdmxg6hgo418qioa0ywtukjwjtp1jp2ke9hmruqikxqb2t0tt7e0246fipbicohzn0fvbb6yvtt0gpo9oysraru8sdj0ip9issw18wuw3fnp36k09beelg19u40ptrlibxy3vv7btceu8zmayqh9nn0w8n413ilxcklg29fjw40nw1x5icrgs7ty40s87g79okkhlj2rgq29kjszjryyre6tc7ks4880eqlaml2muoqf34k8457p3daikbsw7yhilkbic',
                        proxyHost: '7jodictujsvufy4z3sqfsr3ycirywio3mk1tu8f809qnmefvamyaqsarntab',
                        proxyPort: 2354433938,
                        destination: 'o3k9lt249i4o27fnabcbvn5rful6f8fm83cc3bpfm00nh51xcls0ih98vog74uxazf9zhy9e08lp1z0tgkwfs5cuz3qi1v0auld5beo37grdj22xo0dfaghy6nvsijdbwbpv1r2lif0icwfudqulpf47vck5a276',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'cr6wwb4qjx2b2vc4apkjykblqtr6ddork2cpu340m5ejal817l9y0b16w8mpvga54c7iryrihqliksf6pd4wu7t9z13o1tuar4mysi99swu0y2ywqxupygcck7kpup2ikp3j5avym7susu9e04upunkkufz0w6h6',
                        responsibleUserAccountName: '81o2ships8wadjakeec3',
                        lastChangeUserAccount: 'glk4j1yq6rsonqsgvn0x',
                        lastChangedAt: '2020-07-27 18:11:17',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('a743f0a0-2563-40d1-ad73-013f75bcc8d4');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a743f0a0-2563-40d1-ad73-013f75bcc8d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('a743f0a0-2563-40d1-ad73-013f75bcc8d4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});