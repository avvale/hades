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

    it(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '4j8q3oif6s0dmtdqzbc985cm69a3iu38tq6o92npbvvl2tph9hm78l6qox377lx1eptrfhvpvpipdmzd33kqje6dp5wchsog03qby0b0u87euaww23i91fdfn6i3gvh8d9v2lingo9bmxzu0347qof150g99ovnt',
                component: 'yandyyb0ghcopc3jixurkou2xcfaesrhy18k0ttxidzqxun98ilc08bniyyslh2q4v22izfz5zpcasahtf5za8l6cuaqlenypk1oakof868ik4we1lfkxcvtsofv2qcbdupxgg017zurevi9nnvv4xc2vnzvdib7',
                name: 'e6ynra4qwt325zuw359orlhhszfflogugzcaq963cj34ddpqxj5s9a5ugrfh11l5c7g4d0pb4yr4cl3kmfwhr9bgjh4r8be7j8z6ywny09gkhn1wwopya3387qs4lcit8mi9skybmafwbmkwvuxx1ok1m0jcpste',
                flowParty: '67mw8v7iut9acgdozxs8clbl3et9ls61epryxlf3orhbfqq3qxqv7ljy3ificebudzzo5nj0ydf4le4h57678yobiuhetmk150ml7pj4tc275tetjuqc3a9zw30madf9xl5off83pv8m4b90mjcfeiylzqf7ysnc',
                flowComponent: 'ubxb6d2bjkduw3dop5a4qobidjnezas28bgp9mt76coic833yaphn7xxnuokuy7mg633cszx7y0u8uh251ycokybwz636j9o0tcsc4p1ikldanrtb6a1k8firj957o0egkumt270vxgmsc81asdehc7mf954ifmc',
                flowInterfaceName: 'r8inxvmrvbgn2m8ur5q4y97ok0o68fz3yd7loybxjj82s8desmbn6mms4lgipmc3k3bea5erilskh5mzjvvkm0rx3vaqw4limkbrgeki7uom5jocjspj8lb0cczz5x2yuu9vjwdwmpe4e8xg6u2hds91xqyh9okq',
                flowInterfaceNamespace: '2h3vpf3o70epst6xtdhyddpv3cglxzhnn3hcqdlc6944iifboq3shwyw45om3uxrdw7adk3v45pj9fgwl526h04kaprihbz8o8mdg2hzitp0f2wv70usicr01yc1i4vunaz5pzjpd47p0daslzxn0kvhhkj2876u',
                adapterType: 'ly6dk0a4go3i4c157buubvtxpzyhlt9t07ro6sqgzbdu53kxr0d8afw7o060',
                direction: 'RECEIVER',
                transportProtocol: 't3cyj9264ann1tfkxizow3yb6zgwl7wa5cjjhg4rzhz9abr1hmdkp99bq2iq',
                messageProtocol: 'p91zo5y0elvefgo17d3lm6qe0riz6pgb07zc43ieojpfvqygrlla31qyft5q',
                adapterEngineName: 'fbjx72ja5b1i1jdfa1z4c5zoyt2bw36ww2vggp6nk5srxddafczro9cyl258r3q2w8ctshala2qtsmej73w50x8bti505rxor5iwzj9hby22p7fjkyj6ev11cebkb255qr4e3puzwebqh4i5ueij3tlwp8rfcywq',
                url: 'ig54wubq50jpmzq4v6rh33zpxktrc8hnrcu1fxgf1zk9blwwbuzzszt3meuhny3z19n2u024zkd0q10dej9kehv6gozpsrvj3kucx7cd28sbmxbri31dsa0wwuxu97ochhs6l57tf0ihhlk20fww18r14bxjrocyajn2q7fkhguxpwdbu2xcggfhlo4l5w8ziw4log5r6pm05yb0u8z2cexr7qxvrvbbi91r3dcqq4us0nwq91qo913kl37fejvlj5hinaiej0f9dj669k5rlssoia4li66968p875wxm2c83e7iq7s7gcjcnnqbkxvf',
                username: 'tec6eiq7e0r0lbg17d6xxbj7d275hfmcksu9zj09ylu9nye76r41gn074bhg',
                remoteHost: 'bk7ep6dh6frtd8v41udo6gqcsz1b52679o3hzzd90qk3lpdawl7qf0bpwl779ov0b9nfnubmd0sm62z4t7763oqgbmak63m8xac73l6giw61mmf0i2abwdnzlbv0axnq4yz7l768td2zdtekurgj3aexv4zwwcnj',
                remotePort: 3829642680,
                directory: 'zuqmknkf3j66c8rr2wmmxdrla8msy2huypvcaok8uautnqguyb3jqpcg9smt3zm8k6xg1sglp1z2tdo03ac2fccho42exxqqb682pz4stellr1yxxf1ql0fw7zif02bx49myalugtfvviy9i4pz2ltsrrsssyd44391vi9lc4qtyfg4z0adki7cr0rn5xs2gfrlmtuojz8sczi67xf6wszrd226pigp0o1aiey88wja4tn1vcfscttlltz7jd5ddvkv3hxtlcxfc23jtrth3sz05ip5rd4z5dnc3ufwqhodss32opxdfkcej9p5innc4smr1yyqy2wkqfs616knberafg1spw94o6eawjexpmz178v2tu652endpbrsw05jc3hc05mrn6ul3clg03zn8w66xwx6pus7p46pmbupxee4gir7mvmnypv1qk946eoftq5s7k1eeshvfw2betit7fkd04bwfx3bjkqr1759xavr3hiry4tjc9xalwr1a9ppg7v47zukr9jifvririvww6t5hrd1y2ea2lbi9vv6ajdou5kcyhihh7l9emfqhw2ka9jad4l306k670eacugcb0xvhm0j15ua6ws7e605xo4xciuqgwga261j2eos7t9jxhoeyjc6nil3ypb9xeb62x6pby7xksjwnc8emejzaxcx1eb2m3cg37yhf5fz80cf7kxm2flqojrmongyr1tmpkcmbjornhenfkndmmt7444ldlezbhif9cd961uqstsybt8vkl331kqn9kz468ui48v5m0s41cmonlr9d57ovpytbdvds41vlf5hw167izbxn0nin34hk32q356c0sc5dgnadoiu19xcy976bomnvibtcu715id6po7pt37gxvufyyuzh00yrfppaupaxts411v008iwz7s0ybqx8c143lwh2bjoksku1ainfbdumrhn5ee809jptf8d1jpud2a4xr4mnikj96s6x8yekl6w8wrbtrzpysgmgu1af80lh1udx',
                fileSchema: 'uumsbfx7vvb5gj7rr7amiaokxsfznqxtovm9sfe6g8f2yrg4y5g4cm390ohuebw3qz6a88jplvzet33oqq1e40eql2btcrk0vdcgo9jfzz436pt31efsbx2p2d1hfvf7cq44sfgaeywe671ufplcr5huiqodqb3kgysdn89iuzagjjm9oyh458retw6aw0vuk9ksehffw5q3hk2nc14uyadwqtqltrrba1hliz4ec39q22cej9a3fe118br3lx4pzizpwkaj25louaqsiatzeq7fqavwx6o2jjux7wsrrkmli09zf44d1u2uoect4ck9ey5e0i2ohhpv337jizpl141hz5bhft1gtpxdcasd1ir2riowrrhy8q7ibt7hpzxx8iqm0qu4ej8nore45x2eaplscj6ry6fkvr2g7qv43bxbnhkjfhew29p70zzt5sjx5y4c1lp6c5oqtzupnxkh80x4e3oux1dmd258slshibjhcdx1g2a3fl8gkz7e457yu8ydtq0hysrmfclyem696mxym55omqzyzns2f0i8sb9sucb4kmb9nc9f6refuw84ol8bwsc27lv9ie4r9g1cgb54b6j9ayk9muif5ihtxvqab8zil6to4ninbgtmxjvw7yu7yg5a8pzc5ub896zsrstck5e7jxvs70tjy0rwejcyrobls0u66sfcp7so9xnpevqm5ecvedklgbfotlc9iprxw1snhj2vcutncc7xhj0rgfa24j9fsuyey5u6g2heiuqsxesuej26tphhymkmrrqtvtc8crabmhvt47sxeswsqnfnvvgsjkh9kxgpqzeri0cs6n51h0qx65zdniyz7l1vkt529656r4z4av29fut7p9om2elgyiiy3t7yacdipr54iivfiju7mz1pw3zgwh0fusp2em0zm9gzynupr2h78vpp5k00m02odpu376cf7xjy9d921mhu6aql03srh2lw354r8f59zu6zj17hi2zlgodgch56lj9w6o0jecjq',
                proxyHost: '2u31a4srcl9l0c3qwynpzi3b6o2nh1kqrtpzjmo8t7e7w5papq0r9bdierew',
                proxyPort: 7295828168,
                destination: 'p7xoe5nt9ukhtkwhofy67yeuz9fbg6s3dswdu4sdoja6y71hv0tjeyois78popc1mi93eikhpgvb0so3nsy2iyzqicir865sywclvf4xudqudj5o6ewgpqnbebmvhejwfdrgzkids1djj4cxy4inaxlncl7ab5q6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6dn5gpzcz45ds6oko3iukqoor1yml3tnboqja4e13lfqz8jwoe125v4rl2l8qlocriqkbeu413l3kp3hxpt64vwpao4av61mr59ov6veb60gfdgiueh5hnppi2kewdr4tf7mrolvapimiv8ieutramflnu597nsn',
                responsibleUserAccountName: '1lddxsms92ozi5hm0au4',
                lastChangeUserAccount: 'm7b3fkpw4z5nr8z4btuh',
                lastChangedAt: '2020-07-17 07:41:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '3cobosxfukb6vy8n9xg20rcl4yg6ljv743gxg8sjusxwuljdgznwlp03ch4znpb4gxuan4yp3dc2ji56z4lwuesj7lf51q8cwp41gnfg0myvbuiqj3cnszh8j44gh3wlso89877swdw2784jl0audesnzh20w2nd',
                component: 'dbezvj9wgrz78n7jbn496bilhg0qtb0agh5fqxfgbderk5gkebmt33tbwpiutmoj60krll7xkhrgdidimo0d2qrrn5li6dih5bh028bx5zrwkeuw76i0cmwa2y3uqzl5xcybm5t4w9fg3suoasnhbzh94lvkxvwv',
                name: 'vvjwsyzqbmq7stkhwagp64i089i543qbxdg5o771245pyinlzmlxvfxb2ltgoilw5ec85resv956qfe5bzdj7rt16h55j626c2kyv8rpbqyfqylpehqdzvj443lafktcqc2da7vvr5176t2bvd7zcaj4varmc9rb',
                flowParty: '0n2h7ocj8qj2988baxbldi0qcvt6i345h8kc3iz38y9hk936cp1abyb4sbzfgwcx9bc0o43uz1zzd5az372a9any3kj4gzs0op3wapzo4pfrpjxn9xckrus6c4cxjactw4qaawz6ghiuxoiurz96rbb8c62kk7mm',
                flowComponent: 'chivzwnwtfqdzp3109uxrcjnfkwedhgo5xow4kcbxadu2k6gzyyf257honkgqckafo4aody77g4xd749ekn4722cs1ayq2kklsgfv0e3penhihh4i8u4e1dcqweal4c5xhw615p7x66so6j4velhhkukljafeijh',
                flowInterfaceName: '5r0s48iqaxo3zszc7iaaw0em4o57a2d0oa5rk08fp72hc42n9957m5zbu0nbzwou6amvolmfmbn05hxphedvxpvtkftv5wo66kg5ro3aoaa1s6uk94l3truwj45xxuezy9h4098vpb4spubmax0jf9d161rfrz03',
                flowInterfaceNamespace: 'csmpavz0pjxdl5jfzuxa42k8ohgg7qqvy58rso5djrge6nt7e8v048eduffpwonjk5o44nx2jwx64s6kvltehleznhmqd5q1lbtm3ahtnzwxmab14o2nmzv31pkc208mgxphy9vew5cetyg11esulrtil3mium0x',
                adapterType: 'nthxl05te5gyd2vh970q4b2vbnhfeqnvk0zcqnq6tbsrezg3ce90byb8mo0q',
                direction: 'SENDER',
                transportProtocol: 'rx3t5101u9039hmty8cwlx86zfiawdki4nc5l167igfvbh3cfkttvpdnxxwb',
                messageProtocol: 'jcg6bxy75833z7ugz894w6j495n312osxtt7118va4dmwdmf9w3w3syblc2g',
                adapterEngineName: 'sjxejte1ei6e9kuzse1mqvkcsoduh8ygijnebkvu2kcqmfjtrhcxl2e6hrzq9507kwpm14cst9mxzxgr8ar8apdxoqiw9ikzn4fd67vfqg3zeafhz2wr1ivli7el4h412fe3w2wgcztngbv02w9nas0ddytlqml8',
                url: 'qfjbn2ls53mp6it15gcinpo4at5hzu6906nmxiwu2dheo8hxs366xuwfqaciu5zf84yz2wb0bmq6ryxzsqyyvbj68olquz9zgel03bqrg6yn1x8qqbyjoemxdagt1p0z7g5phj3qzk8sfv6y2wsiqucondtqyrfp2s5zy3qiojjmye00mba3alkq5922nsa94jpmzfwwzn3e8t2ctqgvzke6f45tinkwbv7g0izzu6ymb61g4trurzz4zcemosz698vugqgzkfp4qr7p46a0s4kyl7y8hdy8zoj552fvce7bkj5ieb1sh0hoersf75bb',
                username: 't14s8fjbmxru8codulxy6kwbrz5e6tdz9z0wf1enrf4ioq9s8sfkxoafzyq4',
                remoteHost: '9frtrtiwra9qf60tuzhsn85qoa1ak64z466uugpbfdjmt7k45idz43aggaog5z0eyclq48npipyy6eb27lwzme24f7byv1nizrb2nas5wni10exy5s7j4b89nzdln54l84zsarmlb9d10numb3veai19mzmysrmw',
                remotePort: 7524605698,
                directory: 'n9nvdokp3cpjcjp88bja3u624ponn9oal5eaimepk5wsguxy5cagou4qobnp4iqr90jnmu0ab53fi5ecewv9wf4p7abn7kkmp965u2idp80mcvlolzujtoiu6h2ktjacvcv8rqnit7j68sslfw6xfxff1dhs8d785sltxit6htfwer480w9dugpwoth4fkb1upjat66gy83uhf8fed57a3on915sfzfmstxezeaih56lvznocmkaivhrs2wz1j4gtjrex1x64y7gojfm09nauzjpejpvo9vcqcaqvih65859gqa8xo0ktt0z0bxcdm0ovntdwx14bqp5lh7vbywbe905dpdh468ozz4mp0imdmm59auvd5sc5sa1e0l13wlnsc0bn97pmcnq9ps5jbmbr6lz5vh00v96lzte9o00z15t2uav44f135acrgzpcsjgn4x8o8pbtdt20mf3g1ld0joryznh9ex65vbrg4tfqwg1gx66v8p8e7riuz1deigtp8s9dm89vrogdcxhnqf8qf2ze1577wk1acnxd8xb6g6bkypykypkych67pssjtua4so1jc59go76maoe1odr9qfxmmmkxqznsruc2onkrt2iz8uymxn5j9ih8hyg5ez7nguvye0j4q86inkk9uilowxhihmhyfbday584fn6qv4w38l084tbcsr5emrzx8m257i69f6fmztgkf1i7jxgumkmk9sb3xcbi04o3wx40d12o99dh9aq9cyhqau0p1pq3pawere2dmwhcik6zrizbetdz5935cms3k6g4epowujgtfn0c8m6sb71ohm7cqgfzf41gm48f5wxjvwf5u0jd61hlw30uqlmnw5mdu0pk7b94ilwdczhz5l1o13q6l99vmwls9t4rmgf3mocfwhz3l9wvqnqgy8gtuteax0zc2miayd4ru5zooixjzn84vy5f3gwqxxec2fm8ija2o9vrqzn90prfcjfrynhexaulgr1j7h61sk7ikwd1djowri8',
                fileSchema: 'inevsebgyr2hqqzqz8njse8u0f9x1mmmr3qtqmuowbscsfyw8o6tv6qck8ttq5sct095gjcos207mmyv61xpwedc6gh8k6mlqgeya7a5mn5j1hhq0ipl2icvdurtpxeneo8b8szk7h4cqs5wqlkgjwcmxrrmayxf02gqdlbi9uafiinat6lm4rfkafu2q25zq1vcnzt675dgr2jhed9crisyf4kz3cj4n632wcd2kjuuoezqzfr7at36vd16e8tjx3htq5v8voxhq2gd5xwqpbsnabadx4ucd6sccwwhyuwo406nzong45eoe9gtx8yl48zvsm6bgdge9fxub2rpzydl2fz332ujrov8zuvu0qnpzhsoa2k0w0awanfk5evhog741ms86abv5892s716xro2kmg0q4vo83jfcfzknez27awi2o8ckxofw5gjt32tlyxa9oh0thn1bpgsbx5zm1mbqpiyptm7qz5byaf1s8h33csk0u3ocx4tmuam0xx8p855430fip68ekebijo9b1rylpwn29svnykdeuv5xeqj65mnibj773m0223tquwx6gyc8xxap3w2b10fqqu0evqldretvx65arj071izhful2wyiokygfpjo3ee1aysjg70oivxze4a7wg1b710tli8lw25netlfemr8osyi3ajbleeeymj55x1qmh5hasz15inx4u3mxm297f10xxexfbiiwkg3e3mk3vyweufc1br71ctia5aj3fbkm540t5ybe6i1m16yllv3omhc52l7uro93fed196q19w0bz3tdfavq4hyhkuqxt1dhi83wt0en5dwu14xaqa5s34uhg5zvxcyl3vnjhuixa5u6cp9xxodyen8bj6gka6k6toor0e17yw5t8wt6wxxg5nmbkv8pekic6rthu19g2mminubjev51ms0g3upts1c542fo8butv5ts7gksjomoipf644317esf2iwlo6tbj8ov24a1694by9vx3yj1qnq77dvuscf',
                proxyHost: 'goft9wt6kf50pn5zr8puzvjngxhmhw90cyb0oakicpa78wbrxus2s2s25mr9',
                proxyPort: 5116272935,
                destination: 'i0fozjwcse0dbr40a5y4pjwg0ly2olecugmf5k87q7jmlgvr5twgpihogw20jrho4roonrf351d0fb7u99rt4badq18li0qh9p2cxflprqi8xaj9olcpyv2otnzjsevufc4f1c8zc5awsulh8925x98kjn1wrz2o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd01tl39tblcwufwg0oxaug7k1cu5v4biyg9u8fb4onfdt3eeiqkby54pvpq00udu9rgqdi27idj0fahaarpy4vmnvyecrp48hp2i8ymieqdnpmt2jpvo5ol8o9dw6jiv5i53wypf0k6f5u5x3x29lmlu40uxa4lt',
                responsibleUserAccountName: '9smo8eei7h1aqyndbdja',
                lastChangeUserAccount: '85zh67tfjg7yxxi07a5k',
                lastChangedAt: '2020-07-17 14:55:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: null,
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'tqdjnfqz1zyt2i3qorvt0k0ijlu4kdv32ykn2f751go3skzipacfi79bj4bf0ns3gub4odh9uho9zqs5ixldcmjbunp1tkonfha8qq4rkpgemc7oddxjt7c7vtlq5f3xtai8it33zwlpr2oogj0ypz4q8t293zv2',
                component: 'yxulk5jv55jg8lfy7avsqbmjd684sl5mcweo8vf0rsu8zbcw899jmsxlocuk6n6dekv3kqmqlst9kfe9gkoqdguf6eqtws1fba4tlfucamm71jrvlpswor1yi5xen1fqd673o38ua08ub3rhxv0bos6nkxpho1ex',
                name: '1xcz3o9ryl5g1m9e6q5eiaodpwpz8sa892yn6ocit6v3b0rvzgla8kvwjmc8rw3wihgwrwjbljv085ks24t9vw8e2wev7lp19nkxqwia2xabd393x8fktkyeixc2gp94roitf1l4ectwrfzrfapr3p31xs1w31g5',
                flowParty: 'pap1t4zwyqn0uuf20j4uluf2xehuix1czol79lo8ib2fqnljpzq0tbvgx1ofqao9s5h8yj9eimaxg1oxkgum2e9u7ra72bpyuflm8050452ethfop5tqvezognvkk7y9x4wh2f803mrz5ogops2cgqld6i17ikvc',
                flowComponent: 'ul83otdwo3o1qpbonadyc1p09inp9ri0niqdlkvkh5vx7mum1seokpbdh3sbjn2ybhsq9qe0v4v683e569g7kzp5ql5fxcpj19vqpw6q6nm9gr6pzcde11g8eqfp8ygrghd2fyvo8n0gwd89o92opevunx9er4yl',
                flowInterfaceName: '64aa6znviwo56sgd7e34ut86o369dlelknq3iq7gl3v13ag2my410t1ri3zxuh5427egtjn25fln3t5852j6lgrn6uexpn3vtvq9po5wwg5bttd2v0xk56dw83tugoa92z9386qs9l409ntueng28x9jwtr0wtp2',
                flowInterfaceNamespace: 'azkuubqwt7o9xxe40y9226ebb6fk9xvmei6f92ak6sliyhcoghlzm1o1skn1b9eqgrdm24oq4p4gpr3v13d7ilvs83j3hyl6ptwlv73r1gl0rujewidk75rqz5qp7ijf225bahmbhmqtuvvhq9yioki9ro53jw2x',
                adapterType: 'wy3y4hzqtonmq318vhffttu7gkl7bf0h03cy9kskbxwwk5hj9a4djvsyvz1c',
                direction: 'RECEIVER',
                transportProtocol: '5huhu8zidf2wtxsjtskzfmvt2m61l7o12mjx5a6ztdhpp9qoehokq8n82btl',
                messageProtocol: 'jhhkhsqin7ybh1f5c8u8k86tlmj7jxtoa9e5pkz5zda6x7qx213nsye417du',
                adapterEngineName: 'cos3b0jo4nti4vy8lvodtj1gx7uauwv9cvjdvdlwxafu96vzvwfd49k7ng3mkpt3gzctqueeytvw5qmm58nlug4gz9v99071jzt9rhxcto5nrhoa2ghu58mddalb0um1s2wynr8johptw3inls0myypul23jyb8c',
                url: 'q19nq0ii190g6nee0n23hj7va1ogvmqc7vx5yem3003y1eih37gcxoverur01z21mh9e0s2ecyl2r1aho30t8vn7x4b6fdkoc6e88mg5ja6krnkwskzgf9sxbo4k307jyxsbs3egoqfdnh5ygz09jl6hag8po3frhqg97axj7v529f69qwc925z68h9ms6t4m1pllb54a0zoi4d5nokknerklic9hrshng8fs9fy5hi2v1gn10gr5iiy04efqiiy7lcapyy1n541v121hxqhnpt151p8y01fgczmz784n55b0yq10u9g4wnbopu8f2nl',
                username: 'ctm1bjwjlpbe8z2025c8vj02hp1bki12ztg4ltqhpi7xfj6khg45gkm2rady',
                remoteHost: 'i8enrbvxewou9hwt6hp7ymo6z3a6qjmy1hnooea09uu4vj1cnqb5s54ls7vy7esn731gnhafxmh5x6nvw3qe4tsw2uu8t0hl9vqc8xnvuxgl0ijdgngy9ityvmwhl5z881vibw8t9v3r3tf08bo8bhj6yrq5v2xd',
                remotePort: 6608154602,
                directory: 'z3suoqupn3zbs5agh7u8w0noml75hpn6vkwuhfmf643s26u7mc3nksosqwvvnhrzlw9mvag32ab7f7b1vte590t6kw93ua8whdpacdm1gzb5qa82soj31nsevm6r2szyorzsf5jxvnnwsg200nj6hkwpbni3ub66cxna1sh0pseoo7u927b55ywe3k82y9vgdqqujln3wvvosc6o90kryj59g496i46wez700vty12irqxzkggvba2l2wfpnlt8ppbfjk53w8b1vp1hcfn0bzzqrluko2062y5fv9tj8r8hxv5tana4t0f6qtl07bzogxk1dcw287h0w7sd6rt75e8usw6mdaxr1hd615s78wvvtxh4iu2nmkygeoayqwibuk4il2slog6jqf0o5eqscs6kyf4h8lmd14lbwtew3rwe8rlhrnv84s8quyurshxwx504817by5zjrmhvhg9b5kp9eerfznu3zcgjr5hpeas3wfh7g290khdsgvwll70ap317pqd0536u1kctqu1s5j6p4rf2obsfx66bj0ckok11f8ejq76mynt6fknjsfo8vsdjlcutzvj3y3iytnc6mu08f0ix93x5fkjrtqa4gki9iomuzc9nosia5libbpmevd5rjy53vixebb63pj0yonasjsv1eez3kb44gmoedkub15xgiztliczhuwdcxdsczc4j2cobapr0wsry7rtl3ubepvpfiuqye64xo86fney1fj7d2eokopbhvxkvdg5lj0tkq5ajc8m6090c0ccxxlewejdy8kft4ufyg1ngqsvtpzpouw42a2miqp58vqn4cjk2fod6lt7sjgbqs7daxqahtfpb4jnbqj0avvsohuhk7bsme41l6s46p69s0ay6b7o84z6edytr8nb6vprjhxq7w5w1f174lj8fn2ypezgjpim4gv999hz1luenknmvpwa2ah7aqu012ktyvp947skf5rzrsllnrg22uylwdnqweoy70rea7cbxwdmeu6i84',
                fileSchema: '0yyelmxzq47jsdxjcmzweiv97t1dauc3viowdc8pgsmkt45mmhf2rarm4adn5zwezgbyd0n8kugixe539o2e6vnkw487q4pg0zqhbbrbtzfm4eqyi76fo24er2o882pnfxe1vljqfvcxw9ljoz5its4gh4n31bik2du001crwqfuuximjoa50zfrknqarm3e7q00pry6axf16b5mvyn01rrr5a1au3q6d9s5irq3bfmsatfiaxm0xypq4odxuc59ddahv6zwgpe0pgm2zzd896cfcpo0h1m33nmz5yq4io2d0raf9fkugo585fqlmxhk2cn4ivgn1x0inzv0tsywn62w2t7ktxe13o9xnq49j1r9x5s9d9wsen69fw15l2h2fuygyq3fu7jvwvnrbqxv0yx5cejvci9je5dgj85cd16i92fnpu86lpa12cuj52ei2ojerkpxgffx50qr74ypyppcnbsvsd1nrobqh6u5qy62kmbdzuh5hah914tubawjjur2fc88dzx2z5dbzzrlpgz1923bszk8qkrqdskqgfa494597njvrv9edqbm6q7qqjn4d0mqpqfyyjeweejz8xxia80g5c4kp5qnylur67l4uccnwdjl9zranrkuziatkvjulo4szsfbvj1o1ypco3h37nc94acf686d2wn00l9u2k8fjmvvdnpclwqhw3yapsxej2cnbz05cr4a1hwmyzx5gffhksi4s6m9hqy4gb7upvzar8cpp4f4973foqvw1o0m5jeymzjycqm7gkw2okfn7a4nljf1368ish890g3wu3c57q8iagiw2few9w0l3wd4md2npxdm1mi3bhz4gl59kfoms47hdvj43vz3milnbo7n6yp9sge08e1z8ac62ran32z6ll547fzkk91dzw5z5jv4z4yn93aacnp8rygoyymdaomgfax7q5mywryz0bwhkbr5z7lot1u37berpzhyk5f1hf24wnlbjsq2kmm2wngmkww338809dea0y50',
                proxyHost: 'st96gw8snkmlr6fzmp8ac1fo25p40fkyhdna1if1o04k7u70rzl9rggvb3gw',
                proxyPort: 7841315977,
                destination: 'd3xosixz26tua4zmld8mjtam5x3384obkt76ffkr9y0qn1r11xswcch0m2hoxqiocx0w8qf932vasfrp6r935yxjw08x3mekpw41njna5dcz6mr2j33xydu046bksdq46u848j4p27v6cz5dj0tgk25ulpbn9ufd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fbzm1c8540umlbfgbg3r0chpz8y1efrushwldqd72enbf773rucwygnoxg56v793f3v5ep5gy9xt0zzrt7q91mq02k0bphenkydr3ev2ikuk03ees64th81jffjy4cuge7woa2aq24mj3d8r8388u8zmjg0dygvp',
                responsibleUserAccountName: 'tw0rpkj8e0wl0zi7dlg5',
                lastChangeUserAccount: 'rbd47gnm3ij7nv9ts9gt',
                lastChangedAt: '2020-07-16 16:36:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'w8xg43oqlrsx3c7z9qsx1ozvtxrfzzs16k0tev8ozi0c1nhqq2ia4u5vjag2efdrdofvukidchtyiivaz9e3allb78ho7hao9b0cik100ml3ggiwkhme8cb2447mkomio87c0d4ml26059o1040a596ouw27p1qd',
                component: 'kw7orq225jsf4fj5omgqwku8x84y8pus2hepcxqbirwxndv3fr0ekjzg6mykljemo3i8h5gbt2ya9rxxjso3pjezcjm68z1e5e2c9ez3g6qxpesaqv1g5ct062mzlbm33j9rdtg4gga9d7l0ucqu17cq0cjfkjdx',
                name: '0lfc7kb7cddst2tfo6wrg31k2ca731dntptiwmtutshizjyihafuhbenkr2tgkx7kauwqacovjtodsg0cltmlvk84dzq0nfp3rr9u9qm91n89oi0xmk0k4376nnjr27wxhnnl2cljftvkqhkub488v4rcyjrhej1',
                flowParty: '9hxh0gurxap8nc0wpnahvd55iczfdrzpm927nfvjmf6bi45fxwln0plqlg8nz3xzsktj9idlvtmztul2jo82hm0325owmp3l7umxvyl7mm6x4o2g5b0lwuhp5xesent6osykczgsq7rhziarvk022jc5whmt5dxz',
                flowComponent: '3jdt559f5ujksheqtseleszcjf449uvt4rc3gauc6cq5bx08z3psswmoli9hurl1lcmxeq1g8j6ajhdfvisqhiz56n7tx0iacszr4nf1eio89o6qqpzqlyi5gwicqsxjdabapxaefydjr2vz4qwvxva8lm1bqw0g',
                flowInterfaceName: 'ql9zksjpz2zqobu7t8754birp18gq4bycd0sullie9ikt340g32ulb7x31aq7jeyaxaf5rchrvwsue2diifkfl7cg6bkbrjxhio67y261tv1p0820m5qqtuvjhqkumgcbiafjkw5lxsybb9srkaa0xtqruwj1mcb',
                flowInterfaceNamespace: 'f1kkp5i88umsswjwpi03n2gvqda4k5gfj71gp0mql47xqbl5hcwdadxv0sh9wrtgafq4gbecc1f2d5k5ohdanf630w1p6goo205pfem5ldfra9csmi7hddcxvwhlb3xo3qdzlxpvghwuzhsvak482e4jk5blsfk5',
                adapterType: 'pl5ah3yg788n4cvo4tf4cfewegtz65998rblbrwlmapd4n3o4llqwfj0b7ou',
                direction: 'SENDER',
                transportProtocol: 't9etjxvr9i3wvwhhbkz3aw8zue27gqq971zr5lbcpafjbz7ckoq0k4wpwjen',
                messageProtocol: 'nuxu32s7der4u5yvchx23u7nafiv2pft4ejzfns7tduf1zvsf5m5i8ta4cm2',
                adapterEngineName: 'ybdb1e2lgc5ac9nhq7abocssohps03z6qzvrgqvv07kh3qe7d61qas4ucutg4mnwbwph8sxwd6igrgdpvdd4x9g55lpffg0u1qj74a9zkx273r9hpukghk9fxqqohz5f0c27e0luzof7yfdqlr4eng0yum9mzgcc',
                url: 'ruxbijmre9ix630v7da6hmb3u796duqcz9m1k4gvcoc1p0tb567l7vs55mh76rwvpd97jomt7lcd8amootaltrudr4m1j5ggci6pcd63wino46n9dt1b7ji0s1i3amp6ahm5z1tkcp7vs49pmrwvr5f8g6hwjr2zjpojjwhc21dt10qm3a1556q0j3xayxxdc9a5dxcy885r22x0b4frnfpk2kwfzbnzm9ul0tcm221dzfaskrvaupqeibehhmt42ikeiazl4dhywku8tp4tl1alzef0kpkl8atagjbi64kvr2svneait2qnp1qo78d7',
                username: '1idpywxtpbjdokcboehobongo11sg7llhwehbik0s4ss9h1buqihybcb3eb7',
                remoteHost: '5z4c4objw7pk2vjrtjy64vgwdsbliru7krei08q0oj8vo1re9spcbs60o3quyff5pnlc9oybvk1eevlyxa3pd8khmguyj6buqrsirdsyfqgqk5s7l5ndzncmq0q5pv3vch1od35rzamowlv3hiac1x5x1bp4hoqw',
                remotePort: 1442922710,
                directory: '581wltxk9uzcg2caa5l01314ncgm8jnr2l7bv87nj60d98r2lperoui1cwg5pu51mrs1i234mgy9okp7izny1itb50vocaauwma09deciptz21go0po1t9zfxd9n9rn1l2scm0hukigdue60o5u0c1us4tb8cvk52vbr87nqogay0z2geczlp10gjq9kfgdf1jp7gb4ksol4jk50vyz7o8icyxzm631lcnjp1se806ffvfjonupiw3qfv872nm2vwfx6qx8s3fh0c2syd1i9ucnq0so0y3gu21m5tysrz543sk6q2ytcacw2uhtdj0m56ybfqqb95ysmhsnqsoyq3y7wmmhua0u4phdujj7wbowmlqlfybdkly5hzpab6izqyu5sasdg58qom3m8tghmu7zkctuszrrm0t7ham2js44kn2ueyg1jbd8t0rhjpvpci60wgxw00efocl142oui728lwlztkcf8wj5jde3wtfqivudru1gve2eurgalbd8k5ueroy3o4qb0api3ri32dsoj39szuwxje1tap8fbkoiidi13pfcwrlz6014v37w2cf989a5zvds2b0in8rzqwc1sc9m3l382sbqr8rud57gfj77iwyuvkyhmpl69q68x29vac6kzylncmi2w4g1u62s2ych5mfer8kyua2wus82kxzkwx1vydbrbsped0u29ggkt1ihxvm78lavbwzcnit0i6jn33s0n8rkrz949l2n73b8751rllr25z465q33c653l0mal9lsoqymmyr437p7txhn96622ln5fksy4q2hczq2www09qniqavvl806gahxcxzniidit9rcyjscacekdjirpigbfdbs1h853nt34s04x1at985u26vya26imvxawr9e0i067jbj0i6tttd5stc8lpv4jzeup9znab0fuitjv6wjc6ewri8wbbibzwrhmvv36vq4fnil6p7kyjjngvq7wndkn43bajrinx1vanhu5u4il0d3l64f8t7ug',
                fileSchema: 'i1z4h423bz5pnf8m5xvi2qrwb1hd8pxugsf7sqr5g7wotbmd8e2yz5bzq1u1owr9dzu425qsu8cmr0dclbxk5swr5fsnhposaxq10g7cv8ymbqf819lf6pf4kxj1gpb60y604p9f0hblsc7y3rbtq082qgpt207ym256c6mcxa09drlcp1078oyytjylxkplo3rcc2s8xn32drdr4zvlhqzl5p3yr5tiym5jr2s7uao0ml71rzy9yqk0e7gc8m5whbvw53qn8233ydmijj5szhhxzh2hqfgubxu2bz1t8bd6bs36xqsqz8zppdlvwplwf270s0zmnp15irtxy5l0w50cgf2pmvgshdk0r7v2yptuaod8vqk7uzzqhrbx74l5d942xwjdx94sr02adam0qnvw54mpoajwts1pewtneekm8bm1epfmsajtjix5ylnldw2i8igxnlj5yutu1z6odnirm6qvnclp4cy1g829kcfo8gxwu1n41yyw899fxc5f3oapbq1hxyyxir2ygrno1bp81t64iiaiwjv72a7od6e2ayx872jc93whpeug7b61fudg7ebx8aehb8250a4rflz99ejbm9rkgs0mnal0y2ndoibp623zgu0abquccusdmpqe04f8czmcxuq8dwg5x7md1i87taz70gh2wd9urqwas13i6h9n79s60g02o5re5z73bofodo0sqk1lk8nm8ybdlk70u80fsx22v6qakqhvgk0j14jmlmkzrrbhiiwscq58ryjfqbqvai2x22gmwjjse1izc1vntbilpsnsvxrjq2nkvydp7ox274qbls4vqi6v9p3ma70s08v8trv2b2wyv4eu675wm3bndf00uriwd3s2yxn5bjggvcb9l9oyjza4y7zyz7smq4bclyvbecyjr9zso6nkwbryxgdypjzodvpbm3ihldwd2mo70zf3dqfgwfvs1ggfkr9vazad6zqzccwgukcsfd893xvfa7tyyg4giwobphoio1egrx5p',
                proxyHost: '61the87zblzbnuzkanhptvk2le08cb4ti3x57emeszi9c6ppifxo9tkcgh22',
                proxyPort: 4861206938,
                destination: 'zu572ro1kahyii89eiyqgmrwb5n47d2ykgu24355kv96lc8nrrq1dptw0p7tf8oivub4acnvh1splz6ps8nyhw2kcp7fvfjhxi1ttu8q9f5x2ky0hfo49g7rry7ucvoikgz0rv7rs2xh9mncutwjbtioxpqr8ley',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'szbr0uu3ulk6h9t9yl3nnblbinlyb4m9jcmr9xzrlbb99mo10bltji7w4hpp0ks7b1xbdt2dczwpp7asaxew7xhz7r8ptne1yyi7uuwzb7rjcda5k4bad09a0lw5aswqj1eqm5byp5v8fyg4p5x0zau6gcnr7kp7',
                responsibleUserAccountName: '9xavlk8m5iqy9jkjqftn',
                lastChangeUserAccount: 'uuwfqm3u97tr3zv03hcm',
                lastChangedAt: '2020-07-17 13:32:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: null,
                party: 'sldd7fdnv00p4tri0b7jv0e8knpumb9rzp4qlworq9cfy6aiwaspuw2j08r0eua6j5aztyfh01brjk70tkdfszu6ttj2e0uo0jr2tbmx4d58jcy5a4alzpw1jrvmu5ajplu4vngcnmxr18yokvyc8kritsbst7e9',
                component: 'sknaspo5qn1g6sc88ke0s26h0m0f6phg361qwfimo51pc7pi6ld19cg9b4l0p4k2mjl4rob3fh2oh0a2pzxdhwlsxfcaq37ovel2yjqyxi09vjrnfmho4v9je9sallqwd0rns7n574pcq69bhkday8mlkb93vy8i',
                name: 'cpzzq4fkvbe3fyj44esagm2sztf7woww1q4du64wq71wjzlbzy9m016ff87jjbnjslrjcysrtx3lstn5t48e3tpelhdfmzdd9wm29h2kpem9fdf7gtvj1nsu1mcd1yco8sk9lq06oai5aml0i1r1tq22qwhxxk8q',
                flowParty: 'xigj0tiwldb9dsg5j5aj56whkr1b8mcf37u83kg2ro498gk3tucgo27j52ul4027msp9dc2aqnsag6mis40y5ts7qavajm00ntu0hnmnlwai9pl0ny3rdicd4j2wg2s7w5zcqafxz81lfoiqx0l0z2cxs7j0p0r2',
                flowComponent: 'nqhm3u0ilduoavrw5y9gfc7zxss1daeati89l0lfhliojhslmgco88lalujcmzyhi90d0eh4a4vrr8wzhrkqbc6nkkcs0fo3krzjfltdmjotkpo4qtet495g7hx3drxzge5ov8glaj1kue1hql2gt9uwmjm9qi50',
                flowInterfaceName: '1klhorxfdwo21w5rx8l60bju3rt7ygylu9e4xahneu853x9xqwelee909kfarge5fsgl2nbr1eapp9vktkxw86dhcorxaye4ww7pl5sk51a0isn0dwhe7fm0ns452r619rc5rxxx3wuerm34ixms8nyw267siba4',
                flowInterfaceNamespace: 'c1umduq17l4mohwps75hqiftw98q4hsg8o4b5d09bepj837dktt2d3jwdfd59yh7vrmk0eszxmf09c5bmwvkm3u7qo2tpdy8dhgg358v3dmhsry1xitqxqmoy08xx4exly44zpku049km2i3gq1y0c4uidxew71b',
                adapterType: 'w8d464cd5p0s5so4siqlb62peopbyh571awryldegnwc9nnrzo2exqsk51p0',
                direction: 'SENDER',
                transportProtocol: 'jq3tsgtms65te3bwicasbcbhemg9y5khvhalca4vs476zrav25vojlivvqdq',
                messageProtocol: 'bpni6l0baqar9hux4c917oep59gtfkvau4o9q0ar2hhtr0yzp550gxzjnz3x',
                adapterEngineName: '8er4iiyw9kuuchgykxus07kddt9vkgz3v56tzvuuazbet2ffwm7bnh9n8sifk4l2tynlxl1fg47vex2cxg1vct73mzjea5eextu02n0qh34593ujqhv5ov7qwjnog8k191gsji037b0j7jx9n68crll8dq1yjclu',
                url: 'lowb82nvp7zi1xldwbr3whcxvfakd489s3g3evexsb8qyx09p8edjek4bgtcof9l7u8f6blqev8exc301i76nj1iltf0cgia46chwwznv05d5vval68pdu8irmxfri1hc6j285n6cf9looi63gggnu9vppv51tqal7qdxayrw0zg6caso2x06x9h0t5zj2s04tmjqilz82fr6zn8dxfuzo3ziysd78b4irpptwodhxb6ud7gfq5mix1lbqj7qahz1u9x95gtjqzxow5luxdiv5t67a1ctzcs2krfxu8bu769aiaq48btocvg6sdfx6p1',
                username: '37t4ip8dcobjaa9r3gmmwtvxj7n4lyexq1fwwkflvlrw6582flfqbr87baj6',
                remoteHost: 'fi63m9dw3joijpv83fidtit2pr254vs7c1r3oh47myfairdmnnrj0cizjn26ep0lorwekdfjg553236fm9of0474hacu6q340h3j8iy8fzlz4tnjv45ru7xqi4orjrb89gwuslfi14qrfgrsuzjkijwos1s3lxva',
                remotePort: 6936809761,
                directory: 'vvzgyn03ivwwu4rhzmgkd8mno7etco4l06wvbh84xlizxjfywob4asq4itdn8ydqrjjyynbyw697si9ugs6xerxwhayzpaw5047gg1l2gscac9fj70nnfngh3n64r4kt2f560rsmlv5ypvzr6vlev73h9wgmmrbwdt7jy1ovz9k2z7bv7xyksudb9f5le6xogmdfw68bnefqbhzlielc7zs4etpq5o8iashk0ns8v8r9u0oygzq737nmjjp9bv9emi3hcwl57y42m1p2vpgokg1eprk3i2k6tiwrw4hyf4ounoifqs2yz84ndrzkz91reaqyvz8p1p8urtk11nnw2v4fcjz0owi1l97jgf0jlffvxkomrr15ccn63uexn6t1kktpifbwgojd5rt9afrke7ebzgwapie23f9shmpilocevtbmp6flconbos2hc9q9q2k2xh4tkl06jaykxeu2au6lh4c4dl12wkq605vov8ab86ulc6bjb75mz5l1h2enq6q6j7euyv62r1p5qlr2sslbolwfv8t1ce69e5kakmsj1o372o6031qpx6vsr84y3xgwftdx68paubpo9li0iaqno3wtkdihcgpkerj9bax97ubeqnbmdnfqanmsh3jx7ifmzerttqlree23foqfjfio2kawvyjhuyqbo2zu4r0a4bk9zzvdkfst9i9v9zc1jnwdo4z4b838yhxv7n3dn2dl6s7et7406exku5xdtctgx0776jscbu30n04yd2chjtwj3uto4zklbln2bbwukef61q5t1ljnm2eeqyqkfb2j2a8b4lrkdkl7mmknf88zvqys7x4159clk6otnjwwd7r23f889dytshqlmklkx5ybsvi2kvtn0nphmnpta4u51xidx4owk6j81oaweiwz0i2lv1tz0492u8gfnxi1v8ksr7zotplwjkr18mto3l0con441rmdt0qga0ofx3w4mnnoxv6ghxj7hp1m4l5ux21cv991t17jchlmcdtawqv3',
                fileSchema: '9buroiza91r9uyfra4jkmf0o1ga3scaaf7w1glx6v2w2nijjaw6vuiafdt8qd2hd49barsfjp3oyjl1ult077h400uyks8159shz5w77nczoaapbixi210zojxdas1hyym3cb0u0gp5dvrt3fcozfug5yi00d0vgvvvlo48nr0lkbn7g00177m91vnh4tlrdz3vbue2nnqkssdezppugnnpwlxkl0be012z6u50w6z88cv0dp601btcxddvoqyzahvcfkfqxx7xocf4dwjht0svajrw1c605t75hy8tdy4uhmggdwdfu23lqo1qhwacg725509eu3r0b28gxya32kxmn9jufhd4p81gnxyiwby0tmsksmm8xi1l8nepmff2pdas76tb9mooxm0i2waocze8o12xjnkseel9saq06pq7sfcwlawj1zvzmpwcng2ayqlc0e9kk4tad9k51kher08o1xfyvu1f7coyyhtvy9ljr47samryo3v5sc1q1j09d0l9eufpqlz2l25reo5anydyy8pxsgips50f6hopnckxlh2gsj65ljsxm2v6azucs61iw3khjcazdmy3l108ol0s3fa71ow6uc5opqu77g86o21p68ws45amj0wyfj9kyvsvewq1051co5gebbrc0oglyg0nqq8pj4dzag7l5cyc3flalwo76lf3wks1bch94jt3umfxngpkdowdfjrsetu8kkrmkjwb1dy6pq22rndtopfl7wkbzjtszvmp01i4sqr4miyznm5l9ns9bqp31hxa6lje4r0umtiwcpa8t3gtmfhf772awyl6nazxxm18drgylxyy4o4ce7hv7qbdigbkdcxewztv3n9s68f14by296bdasojp4zypi5kqm628pq3nlqi688k59gsk59q1n4zkel9ks8kwcalnnl520ku9p68o05q0k8s6que4jv0mrnb4kroc5mwy2fyjr7sft7gfjwye0tbvw4twzg2788nochelm11e2j95z299e5rj',
                proxyHost: 'vgxxo094wvdvhtsbf7lxmf5ig2ycp54hyizjvz3b2510soccg9uu431tjy0k',
                proxyPort: 4952156204,
                destination: '55k7jok4bkxi8q6o2rqi1bleuty4lievfvdf5g61kxhp7fi0r1n80leh6vqpomnkpnect7vxcfg7m9qf1aiiz7gwnik2vn55hle56kqwbcridy53c9glm41b4j3a5l53zxgeujqq9bsq44312bmsm3dhbuffkbre',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sbrxdjtl5qylw20m24cxs30oktdp7272g0ys8oltralcy24kt61oa9kjmq2q1mm8hzlaaz17yvpqlccp2ogzblg6ccli1wp1rmdq0g2o5ggdhnga3momg10z7nimnq7vdhlxktyjazsmystkdnq4adkpafq2hbnh',
                responsibleUserAccountName: 'bxa6z4yaonkkrgkym8m4',
                lastChangeUserAccount: 'fi0hrfbw2mah2b6hm3e2',
                lastChangedAt: '2020-07-17 09:52:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                
                party: 'bj4h263og43m6g7q9qslrxvqdtlpx8c8i8pqf06vg5auwxmsimoxbjxuwqx6hcmayojukti7crtpkbjvsfxw53k8nnqr7wq643klpiymoc9hed8vk0hrcdkgzgpttg0rjk8zj2ldyfltakm5gjkucl5gmv2msgcy',
                component: 'sccwcb7buho5qbpybgns3xwwtj1kx93og5yf7003ymynob1zbpyrpamthfgezdjw54ij8aj4lu02eg3ubj2ue1q1u982u1ydhw1srizf5evl8i64d3f41h5w3h82tl7uhps34tknlbiqotkxlwvg2ad4smsscic4',
                name: '6alxytc93lc6a2ffzeqduzgijsrblcjjldzoy3qx2f3fe141i5z2y6gcd71v0aya84qfqtf5nducipaiaq8etq2a4krbm4fr8lsyhg6s4jd2b7i4i2oe1hrtpltcxil8wij1jsak2ae9crosrc0hr4nhrvw0nusy',
                flowParty: 'vs8pd9h6glve4lok5tqk33loi4yz8ah8d68d5yqq0sy52to2zbxokolrb06wnk75vfx2x2stg2tfyaf41kzmf7ns68bgwtdholms6k2ho9okhvob3k5209cbs2b09wlqohl77dh5yxg9ehin66f37uifkmypc0g2',
                flowComponent: 'gkid2419gyrob403rwrhmbaevmr95lpskmv1nwhe0bsevpbs6mzahr4wj2fjoieo984g0jiowmd291udukw0ndh909xm0ab8wqbzjxt6k8144av7ca56aadnngo6xkoih86y3ay2uqpg4go7qo7b1xvhwl6ftb3r',
                flowInterfaceName: '4zrht99qhdetlbskby6iv48rj86txsyosrtauytkabcm19bgcn0yp4csb1nzja3dq08ilbbh0bmbzxfayajzw3lxt0krzc3t9dulvuge2bm2rh4s8x3ft0vvxwkjomhzwlnbqyfiup3u2vuykww00gu5prho4mjz',
                flowInterfaceNamespace: '29ojomxsk4vlas6mx4ixjtt1ofzstmfnlux0v9m40y79tcw3cj2dkdtm75lpagq7ge33t66h7ew7sqjjkwytf2mf3h3ymlyqyznt6r1in79hi9zsd87iwc7mdezf7bvm2cik2gde98oxw842ht6p1tw7vh2vdrb3',
                adapterType: 'ioxc977ld2tb4s0ak0hk7757vnuirb7jn0bjl3il7zposlimrlerhv606ama',
                direction: 'SENDER',
                transportProtocol: 'x5ewww6f1kej08huimoy09j9fw76rg0tkvs1pcgwpevde3282qy6xzl9xzv0',
                messageProtocol: '7zke8o7vb3b98ja7y9im7o91jbb2itvyuvhiox3nojcwrp26q6ll7xl99fii',
                adapterEngineName: 'nijtjm0fnfi89gqzayxsaj4fp6rvrgswxsw3tszq667htvcr8odyug2cl1g2fhu5uz2g7nolc8a7fi429prf2k832jug5en16wnkh3lvcbml6v72433ozp01yzyhoi4s8qtvz6gphrvig3a2hel0ekod1hym69qp',
                url: '3nn3p7imgsk22doc6nd0yljqn3iuncro5jwvoc6voo405jekkd4bb7y318clt1yhsbhxqny409kdhddd9y8zcndr0xqra6bkfzi85eg8l2s5fclwd2q8bbkykd4ga5b7vnzjpmgqiq3g76rymh92lohqdgkv8h8ve66kzjmc7a4ybamm2ypku3nq8m2661uu9hkqa7yuao7pq0cjt91ua1nxtbxvn58j07r795qne1mhgxhmz2f6h1n2hd47rbiucdxqtaro5fs6o0kl4xgt2ubux1e0aizfztur0l13mytcvgmll922m5edegempjak',
                username: 'teo48mpvxcka63hy188f3hn7pszop8hxd9l7vrlgk7lty3r1kermhevujuxh',
                remoteHost: 'cq0svj8jkb1wzf6u594z6uz9cjd0cnzyog1nmhuss08n0nlrqa2flajo9zmmndpqezamc0x7j15dma8clohkwibaewtj6khalvahpx7m9riru56kbpmt5m788ebjppf925bwggwp72axa1488zui15iwnb1ug3k5',
                remotePort: 8861296993,
                directory: '4xfchjnz5j4vl7305o21rlw4ziek8ebpmma56uoj0vs3mzfcgub0pq0lsg6p186vffmbdt8e4uxu7ematfwfblajj208u04oiz93hta3qy1s7fbhbdrm8f9efpmlui7tslhp066d5mht6y0m814e0zp7mkwacln3mf1si6pa5mcqfm5zas3dkj51aj5pj1es57uluukjjipr798cqjkvckxf8kwz3zfzd9nf2abfy1ahvtygqu41sw41cxfdeppqnonm3ebm0f2k12g2oyktchs3bysf20rry3e8kk7fc0vk5lfau5l3w0zxfjl8cypvdzj65jjf3i89t2llspzjgal8t0i110cdzqil5skyx5n6ugrfh3iuyj0l6hug5nwmxkou7mfvak8vsry2g0mvvz8n1t7i2ur0gr0ycegg2xalkx8zfpmeakfs1sk80wv8k734vt7yi23cr7v4tiyichwicefahd2cchkl2xlm3g749klf06foi60uv8fjyrykihk0goeuq53pj5i0sj85wygv1vjtujxoanwwerxyepgit6rx1yxgrr9jh7b6g64m0emd45rgw53daqrclsonr0fk061jey85gyuded2xgkh8rzmqmtib5zp75rksx7az3j303jy5z0b3gp80mdsfs590fiiuwdmeuhlotlmx7icjct7trtf8dwchux7k18r686csw6qd48utfwi30jzw6fr1slsldcfrdam29do9tex1ipxbu6p3756fl6cmbw8xm9jb4naf44vups2lgnb5qop1k1lhdjfpkw1mak8rqom55d0sdzvfw5y3l8o25ll4ypx0m7n8qydzvsquomppfvzzhkxh9rjp0jsj6540doa8a2jueofew0lp9w3n3yfhm5yglgmj71stoi90lc3pvfzr5dm0ro1rro9iwy4sqodx78e2xe2802zbquzowow39whrk8815ew64jk0dg1nmkpvcqtsalnq4gtgicvdiaau9bc3avwv89wo5z6cktmv',
                fileSchema: 'x9xb92xcvfg4jqrhl926qd74c85mkf4tuuz3galqjenir14pn9j9humdlco8lzipp4hzjrbssi7e5gl9or2f1lhcufsoq98x7m7q509zk2yaii8ao914oqbn1j1cpfxqb3g9l1s8thxqzcrrpmnz0sptzx3x4850bicj3cnukj7urfuenji3821i9rh46uud6miz6ujug8g1kai7cv1vco5h8nd3tqeon96n7frp0qmpfshwd2is9r97vsuqxbi4rf9mbyee2xmk6qk60kpm2q13xbr3fts5hh2p3kkx1aa6elfg9gz079l4fph7pzzfawrd9r6s1etrt3wz4ckwutb7f7hs98ommowa4vgcobeqlkzl4nuhiuoswvxlkvpkns610g49iw6sq4pv3s561mcnzi6kd6se8aure63rog642yif815o11r9k1cx5me074dq5p1nnwgagmg24txywm7mapv0du5cnhj3jl3z8x2te2m3v88ce7dnllx1ujwh16gh6av7yfqxboxeaiyjm0b5cjxt1n7u3n9heaqgchxow5ikfwoj9t1b47pumrit9lfqp2zskkxoxywc2op4z99bbzbd6t0u8j2mn968j7xvszhiiw0hvsjzebsx706ac3wnd9n2bn3463el3vu8k237apnt0k06r1lxdscm2pk96eyngp3u4xb6rfsjdtqg79c8fn29kuadvt9xwjoyjr3pigd07rqkbhfse2xn3o2ffdqgm1c3p9e3zg8qps3w6ijmpq9wgychzt885zwiwfx3oca9z8gw4lnwlvhjvn6s0u2pqnlu3udtig2eto1504frrox1wpq8v32pnfozusclud4l719kiugzlvwd0qmp6pb3stw31nxx9xdhazybe4eg8afd013iidtxcmogeypatgkork93t9uqccpcw2a5wro6niywtermfzov8fjwdvakpngu4430h3xlx2hvqlfhrmo7734yxz4y9tathxz2tjjll9uxbgzcbat1o3ko',
                proxyHost: 'l67nco31scx4e994tkesmsk6hyztam6ynbo5blxe9zikcmkissywel7ldtxf',
                proxyPort: 3149788744,
                destination: 'i8rhhzfyheld7ufxnn47jakojaybm3tbjsmds8gy0pze2c00yicql6wahqzjn5405nux2snog01rc3m5a2mfq8m3pr69rcvhvjkx5qfdc199nz1zrmznrztnamy18dzztf31k7zdw10oa8ssixwgrjm3sqszvhrc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bagxr30hzxkt7kkqm9qlmylw4n7g9znohwjam4afify3jn54nji2hzusnwpoymfrwe5qyt5b9vgn3h4okxwgpwn3efb14bnuwn452tzcoko72ogbmgtkbl29mxbq6vjuf7r00a5fh8u20al4zk2uyiu0egw5ko4p',
                responsibleUserAccountName: 'hv7dkbz43nnw3iz7biwo',
                lastChangeUserAccount: '7qleyksi5p89s40ib7bq',
                lastChangedAt: '2020-07-16 17:46:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ru4lreh55bhax8l4kzcerxgg03vp8ie0lgf799bxrxg4kareouew4ql5y7vwrg419f2m0ul26uvyaevqd9bviu5z3zt8a6tddge7t08frxn0wpbs6fty690oc3me8n5nxfxwxix5fnuzaxy2nxf252w154w2l8n0',
                component: null,
                name: 'iaa9yf20wh4jsqsnrat20hrrlehsmsfh67a2ip39v86n175smx7gfol4cdsc6zwhtmm6ttey47m4vm6dkedhcek65bxmxp0dcyzwjhxk12088bhir1z80iamyh05bssxj0s84l29qrhh4fa3p7mklqu6n7ir9gur',
                flowParty: 'dw6t2og6app42xrg56vjy743oih03copo13gv8i3ld8k1b434w7it0yr0wsmadry3z9efjxncosral7yd6s0leybnco46ungl9141xj05ccampnr3s7id05l8rz1of6pjkugkibmtltmuxjkk22bzncnoo2lpqtk',
                flowComponent: 'jsqm0n0vk182q31lv0160iejpwm55nq8j2og1ou75dfb19vy2fzxfh2qh7hegjwk99ixyapie8lav05jb883ficbabwv1j4dlvy99tjqljcl95ojs2eltox43gunvidkkzhnvjvo56lygdhr5zvgyu5xg8dogzxp',
                flowInterfaceName: 'mps97zgovw1g48c4z1relrmwmf9xsj954u0v2yc9bfv38382s3lskouytklbjpztqr9c9giiv4reeico31viaior7zghp9okt62975jzb5hvnf5vcxly9ax103wnzg157y04kuvdmh8i6ogk68z5xvhzb5xon4px',
                flowInterfaceNamespace: 'ajwl1200nv2zl98quaqaamg2nyzzvnzejze6q51lssjbqh0d3nurpldziysbog65icxmweu3us36tjxqtdky7kx2ygpr4uexjdww033f92qvk6tsdqcjl1yvkjk0670nzvuvi0lyhehjvfa0jdziw0zyaqbyjyri',
                adapterType: 'zsqtubhwu517usr2zyif2ktp3vhy62213tcz2horzdvam1iniaj39hsi2jnj',
                direction: 'RECEIVER',
                transportProtocol: 'k3vc1mek1g95xuc2z5t5nl4qwzqg5wvlkyp5cnid8qceb49wp8k1erlj6vux',
                messageProtocol: '5f7szxy849fwstm7zfe3eic3ow1dwn6g7awmc5basdcvnilg1b8e8dx7ehq3',
                adapterEngineName: 'cxwnuehfx8ta8v3of45wz9gi73nk09t77533hft5eoibnogyd4c3dbzldua2hk65s4slf83cwlecztd6pw8ejlf9md8hwf15g3y9kwlv8oes31z0kq4sjhi4c5kmiy7sscxs0p3hq7z3gvpv3tb33qhargh8czjs',
                url: 'lkvz1odx4nt860qbbpli0vkq8qln6h14xaiphub20uoeoxf0s8df4zhfti4woro7ejbleaxo54f33dtaewchxaldvczjgevni09vzdroyug7avl7udasx3t2bk7c59j7ge9pketnec6vmdl9wvbd18r5wktcleee1xdmxhi85sg9qh5bhzwxq50zo8qm9mcey07qc0tfc0un71q1cxigweedie25gun7vm06sa1rcpayoezeuh3igvqkwv1nny9ui6vve5532g0i1k3oyuckcvcsw7ul5fb2ful30u73msfm762z8v98h74a3mavkkmv',
                username: 'n6qypzoodah31eudzp0k98jo8udll7p70lax6wkdk83b9qb7wo5ahp30sb35',
                remoteHost: '9sq9ht38jrwzhm2oup9mfzqjkkj1kg7f0fj83yhfb8zb4qsp7ja6kpky163z9w8kwcxgh3diu03kuwatkq8ljg6s01rvveftenhi0iae4oqqvdf0wqqu23ooyw9fe4ctv58rm6dnpfoei9gi1s7e0cysn82d8874',
                remotePort: 8377485082,
                directory: 'j1jd5jeoozk6i1h7m7w82e1onjtt1zitua6tfva3e2ph0qhxv0yk5ntbotcw9c83hplmbv0q1lwdiuksp8hkz8bcquhh5cdxpm8c8fidxk2x18kbatd2ixktdbljlh85j5gl7ng23zp82kcgvjt5zzaxogb8g59yqropb32y7x88z4jmv6xn2uu4xyzgqczppxd3ngylcxo76k2nvtl7msy0dz5puc66bxlxf8jc9kynz0ol98y0rbg26thttnfcfikpv2d7kie55n4ow3izb6zctgk8lsdh76iapof3iz1b4ngp253vb6xuztabe3u3db3mavxhcu9h1ghw0y37ggcvlz0zy9u9d4a9824al0hutljxjcm4xnkpavj12m3nvm5r1hforys8dvlvhz93u7575skno0vf50rq60j5l7m26qgi9lgfzwgwuf5wcklcbf3635qaryleiohhyekaah6xv5164z6kbd4zh0xboiggowt6httgb1l3j3zi7ulp6arcfgniwfd0hft8114wwwkz7k7txsilvad80rs8ebw9p0m1dgdidzy3we5uxj159vropf1s8hpdog438tohxv8fepq107azpyk0nl08zv76x95qrpsefre0d81brxt20jvnkj7ltlk9t5iqiud1b0nbhbz6rwbj2tmi3quyh3x8oy6zff3k902doge5uqrkxi5ptzr1zjl43n9dpmogwyg0pnt2nx3o24sn2id6xo42iym85mnqpkghisvx67xm8fb137pzpykuyziykga80zdjbwjz6ql36g9vkwcylyezj3999x3zbbq16jggtsp60uc8azvg2s847wnofhbaypbdaqm7zjfwqgjy0sag8bpx4de17wvdkudhecrzs1n85rd2svve91yhrclqbo9jyuzj08fac752xnw1wmzp6rs2s1q7zvhupkofu7yoqbwarsl9inlrexxc38nqokknnfxvrt3ocpkox134f627epqafnpu2ri8arn8zm62h6ia',
                fileSchema: 'thfbj9f9y5zu3iu9wgtrbd4odgkov3uomlfck8ounuzcbbh8l0l6khpegoahg0ugbsemgn4mpqb24lpynkmp56lcjxvp2nxlfbckdyww8itd94vhr8urs046lc30q07kt9lmtsdq7qdzzpocipz8u8e95838tna1y1z38rizkqwli81v4lti42myrcno95vlu5p1ie5i5c9ijek57bct2y85qszbyo0sq8bsr99r13r5gkvzffzkln3842r818juul1ytkea0tld7ju0mmnk4y5zadobid1ik5v0l4vimgw8opeeudeetxuy04017k2h2xapq6vf3asseequfd8bf0vz4ly9ty3j6gz6rd60venl13btbxe1i2s8wxkp2s4hdprufcw5knxytc1au6khv0mxw5x14586lbuxpay4jxodxw9f7ifzgk2eb4b2mltiyunvxvof8d1zzstet6iykn7zs48nwhwhwl2dih864evraj7cmjsvb2ek1ji1lkm21wrg1fukgox7cfb80btji0efzu3su9zzzzarraqyjl702eabsb5jqefv2lj70qy0hnscph9zp7t1a8s4gr2eki5roy0c5qxkbq3l4ttcxjpvzpc3b46wsv1d74mma0llpw0c7vwmlnil4gdxlpg2ii50bbsmjgkkh05en8pwuz5m3u2ej2mqgt5u12dz1q3wc2z519o9kqisx1wi2d2ef9pp53d1dmoiw4czdaippt4337t1j6xj223ooeptf076j9m065z6sp2xhedy2zv2tbjdhurr0wq1y93h9065idbdzmz9qmdkg9u9wxu7s0fg823nxn03lsp1o15aul47u76k443d3xl4tlpsbuoy23fz09xn50z3zz3ptlgpmb3wq19icosvys02knb0myccmx94vgvy2iq8ddp660q5m85xtu516quv0gc0qxud0flkf3zky3ni8ctflu2bxylpt65liukrv1fpsrhu67ql0z8ryyiutlekm3gyw9az2wlu',
                proxyHost: 'lgqzh3oreqdcpsags8fb5atuzk0tuqhnz2pxne3ho3n9l9ilype4hh97bic3',
                proxyPort: 3393756351,
                destination: '8vqato6mdegle0vgt4nnlt3x40gs9f2ims4somgvb8s2w4ylvqe5qt8t8zveuqbtqfhrarv9lrpjlazipb9h0bquu5wtsbass1h1zzig859fole86eluibattykii87nhkskocxd8qydbbjwb3g41q22r1e7t2p9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dec0tls5ebicju082tam4eejm5ug0bj3dro6gimovtrtozcpbhhf40z9ezotqfgtzq8s7huiz2aq3g0v9wonz4cw82orf8hcwtw2h9343qf5wffyfs8ynmvni54t3wkpldlf3b6dwh1ect71c5o3uza7ol47jhxk',
                responsibleUserAccountName: '59tg15zikbt4v8v38s2i',
                lastChangeUserAccount: 'n1jb39fyfk2uhdqzlcwy',
                lastChangedAt: '2020-07-17 08:33:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'uvq0jdc6u2id8d2eusolidkkk9732gxc1xq1ziddbjzc20qc5bqarheh5cvrwsf4pomksjx25250v3esi91p94t1bjiq4dnpxwzhtvwgpb9z6xdyo744fqj1xocqz64u4f4egbjf84begmadhzmm1nw54bba7vm8',
                
                name: 'u0c6pfxfbapjkpc7x840nikqg209nf8m2dc2plgh8kgnfw73iimyl1zwp434gpv7py5ca56txdb3zccw91tut7w7jtdu4anxjnnxgumiirif8noty1o75puhx0do4dpzi94f8rlz1p48ejbhewfssv4lqz0bo89z',
                flowParty: 'akb7rp25j896w0bnqpet4qty4fu82onc22tkqk33xcrtlp5xfcpql32dfupq3hfhcscujc82ch0soi0bf6bl521nkzbt4e6fv9i9aa7wid03hpc55t9no6bzlydagfvz3o7lcz1st2q52cd3exb1c2s4wiueuxib',
                flowComponent: 'qg3t7lx6ykode62ts4k3o2otn42cib57uoprxgddciosb2lp83lekmnm973nia7tv1j989bos6mputf1o2twk5h2a6rfibnvjqxd4o1grsqv23zy2stqvqzufp7lbhjlxvxokhqink6bmgyk9wwx4frxxezpadoh',
                flowInterfaceName: 'a0zjlqca0ndcj71b4h2y7naiioihgwqu71h45cnhn56ked6stm2o18ioj7izeu38oez7bbsjpqarvsu6bq0nh8pm85rrveuq0qm9brvfcfnnptmqhskx5ch0hthxkbjmv4j4tl9hjrur8fobpide2yo3c15ffwc1',
                flowInterfaceNamespace: 'pm26o46dv5zsbs97zwujr0q44xtaxxtwhja5nc47ask0kvk7majupb0ogmjbrr753ol92rb761repd7q7ldjacxb88vg6fthvkzrju8rnlytpqgciz0mldwzka4nmw2egr69r8y02zpecr6o2uzn9bhpomhki89a',
                adapterType: '2zy8u5pyxyxjg7qo899qxtntzxd0y1v3lyvmc4v3k1q3q5dyy7m8264g715e',
                direction: 'SENDER',
                transportProtocol: 'mdebhxqh1ztw9950fs3sziw81p0kenixkifx3axu0hl6qvzds7p98uqc1pp5',
                messageProtocol: '7ie12gg0u8zo08n2nh5uxpoz4302csmx90uxiu5y4kyzw819nwphl7yzlewy',
                adapterEngineName: '3hr0wmihyrzxu63m9jxt8wh38v28s1cqjpkf4vjopbbmmhw5miizwj2vfjl1c1jc2mctqx2t5hsel79p1nza1tc1zpjw5u2ufk5twchlemq6im60viqzse1kkdu28thmrxsxn5ycx5ifh58q2a4p2bubt3jx38fm',
                url: 'h73x1i6wyid5g44bbnblou2huwavqiczt3c4jeynqd7mqjcd8fl7sczn164kp8c8msa74pk5ewbpugd8572zwaw60uookogjobem7r9ep9fw1iy3nac0k5s96on5ihr9o6x2ix9sp0xjctcvps98gcmee7e91pvgwcrvwds053fttnllgynoa1pdunxrdub3drycycb3b273o8fslb9uzp4zj3h0iqt0wf6r5b5nbihym4qta8kqshwpbdj15mypg8leq4otlqtozpqtffz7tcwqkbnfvzf5mdlko2gmfqfbir516vsnp7nkbci8nep3',
                username: 'mf2p9lpgek7woqbzcarbav0iegtht2ho3f3q0x1vkfpzx0llunxju9mphgrc',
                remoteHost: '49hesjli4o52eri3pn2oxtr58gcpdibkyyhqtr13oc2vxwt7nyjw7180zzxe9u6hz1mx5ppdtozydahunni51887r84448j5m2t6yqh7nqisnwqd22953eob4y8gn3vu50z091cw370dm5muztlhl9m9cgjctkdj',
                remotePort: 5054074383,
                directory: 'aqglxqy21uqah2ltbot5lt4iryay8e9anxwbpg1spjjeo2lbr9ny1xhwzvdfou9juirc1bira0g9zdos8ao17sy3t8oa6y6h1ufnmc2pycl60jt2fnxn2ofgsxqnx1ojhofnlplsrtfrxp1l2fr0y630t6he6swfpehib8sbdjx0u008tihy3vujfz3ofnndh03nzdp9iifx8olk4czk70n5qpeh3cvip4kllx5ejbe5in6upfy7phbf3i6yij0a2apdy6qffz3nd2j29trxmcebb0xa6v9bluoygp2qm6mwdz90dz7p1nfmktm4yboa79j67bckae4smcpddra0l9c2iq6e8c5pzzwto83x7hxue73no9u4v2p16j76lmggo6anc7mo70ecycqu0nt2bvq6be6u99mlkzlbae4lhj46pbcpn5gxfypta8xqls19yodkzy9qbdkhe6bs7rax6tmo5e1d68l9lnabmy1tskrkvdp5m23u13si35usdkgi4vge56bim4t7sju8dm6y9zl0fur03r31wotqllyiqvjhkxw9kjrk3ijya15y3z6g4hb243wq8cohcs48fmwggdgh0shiqfulsrxrvnnhkz7r4lyzwsjqv9nttfplbxqt5u3aoi2u54dywpvds53mxkin536qekdc4o0m5fjstnk4gy2h2vj6gw189bkzehjcwvdbvs039s3lvoqsbw24zxiztxceqruwx2c74ntux1id13ewrdsmxxiqmc55plek0unlkw33lcbc96snue51t3vsygxxlxs6s82ogrjaeg3vglxa65dqfo978gjvt5k276w99bkm7k5d36wm2ymwswu6ltw7hr54h7sxybi7p62pgat9a0v7ha1ze18hthi062ovqussuwsf7q4apxoxysb3v7yzli34475u8vd66a3s3fpawfreel2owydr6q0vkmb1touuby3iyv7f1tluulix1dd5uurs5ciht526if08yinede2d6dio8cnuq35p',
                fileSchema: '8nlr0rghf9u0zk6r2ae2z9hgbfb0wh8d24a2rcpjt1b0kl7fqxee4qb36za59nf05xzvmps6iylakkr0ktk79n3wmyoc787colqq22vtk4z4dls76ftkj4l0umvz1c4yhswej8fge0hohon7aiu5n4n69lq0ub3alnmena26nvdrfzowml7cuqxbkmmrkhihifp567jft7ky4kc39ib40s2gv8q6hpmtymrb93logl03a1sxb4ulyxqyckj8wpus4ninkn4uro3zn2rdcuvo77oq7fvckss89jtpd083f5ozg3l27dcqd2307iqhssckgst8dnnkflzr4j3xx2j7k7t02728hk6u4rzzk3ymp776pd1ira4v1im2wj0vfik0xul8l44gdy06qjmdt0i2vjuy8zhgbkzksktoxzwipiom6nvdrweljpcxs2t6w177qizlcdb2iil2sffkxokig6liw3328pv89xyl14p4y7w46zgfgrrj73se624ew88uqhrizpzk8luea7k16knzmxuyc3pf8hn5hfbqzyud14gh8ts5fft9b543p5hodjtziiwob4wpuzdc3qxfoe6ib5rdflaeohnbyvialp4nvyl66n7ftvcmv7otxijlar5bjnhubjmrpj1ep0v8zf5sigfblq01oham9x3xkoxzxwdqmkgmbs4aahmxq4zijku0xw0s40xlc0dyojpwbamo89i3sgcxv9mijp7tawmi4vn09btwq8a07ypq7a2wipdml1p7ldf9lt2bl5dyrastwb8zznutevxn8akc1psi6yelhd7uowfp3tb9xozh09i28lqteoz992f3ou3ufk4l1wzwv5o07de41t9pt90k0vo42bec5j7dq8bssjfzp2zeamtnwt5x019x1idegvyll9i0icysg42oetuu2snhgf4abu9it3uoqqfz4rmm2vhccjj71almbpi1cwz7kltq4v1aas16xdrw0mpz56070a93z1kign3199e6q74c8fed',
                proxyHost: 'wp7kw357drqj9u5j7pap2tkmn43d4yctwtkuj8hbu8wdaajzb8vqq1wmfciu',
                proxyPort: 4385490832,
                destination: 'xco08gl0tlkqk0i6pp7ecsesyium3zirrv7ke5cw4wr03nq3s7j782fb8o7h4r741vipdy98pwe73y3y4nhs0tzwvykzz94pa74x6k2ns5pji3fqfybc567fa47clvt8iuqzvytkx2c4pj58sikg3aczlmgbdxv2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r7p6pqqo68qcdtv7gabqt5y2jb8rbcvv0bey5j903213e55bjplbi0lqaj6kowm224qitbv70xh9ktqkkraq2aoyb9m45tkwlxvgl37e4c836xtdjxaap5avu6nnx62cmtdps5evvl5u8xjccpm11xdwyece7it3',
                responsibleUserAccountName: 'arlna8qtll06w8wkz49r',
                lastChangeUserAccount: 'amf27gszyuthecnw8x83',
                lastChangedAt: '2020-07-17 10:22:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ibggxzms1d9jlmey8j1er097ngq2v7p0wh3ixva8awqv0ttsb6dhh9awv0qkiwcp7v2lhzer9v0olzd8f807dyppru6e6oopjdz4ks9jnj91nke8mwdr9ivrzikiyp7skckhx834yaljuqm0evkm6y18rkpa869y',
                component: '0dhsjtkpu9bd5a35cny2qoal8uvzyj7rxnzka54etn6iukmivb194zi78r11fwj439z9no2s2d1tqfq67qu0a9gop6ofp49hyq7aa08tpubj7fg7dtd2eccbnz1cvjyqsmxre0d44pcqt2j6xwrgb81y9ymy4hgs',
                name: null,
                flowParty: '4tq7zc748pn9pxnptxfi04kcl5k3zdtr2jcis1ups9y5142ln7ppcxq8eepv4xx8l2a0m05vo1dhcvnfg8kzbirevgsqsljhim8yvbw2q5b6sikn9uo4b7s1fmvbq3brq6fusm3cw7gf7zdc7st4wrz5x182mv72',
                flowComponent: 'eim8io0qvzkwgrown2503iuhxt7xx7npp151jzpm6uo94pe9gxud0meao20e4wrh3iteq4edjyoq3sojvdg8gov0ox7msurfk2h6456ku9xqi88ak3bahk8kxfw2jqymrp413t5ddkxhrzbs2h8q1bb0cbe3rgva',
                flowInterfaceName: 'rqnvxoixtja6gp505el3fxwcso24b3s4sg5lgz13x82au65iye6lqd0zwehmif3nj7srz89omienkel6422yql2z5upxxbmlwt8r3343szk5guk9i0fxacwnkxr7ax2obx6i6ignoppl0dhxbrktymvr2xyl2gow',
                flowInterfaceNamespace: '48v0020ftm6v1k940kbt19fut57cst4m8ru9fmtr21yf6r4zrwxmb9kljg1fem6wsmb2mt0qi1z75lwyopjplwi3be7jdbjgcwktss8qbum7lxqqve7xf1ykzbmm8wb2gxam019pla9wxwqcdldbi94sdfx0cf0s',
                adapterType: 'ycip2zgeo1w0shm8rlfuf1udshtsitokezkg9gz83c4v6y06wq63op50jkvz',
                direction: 'SENDER',
                transportProtocol: 'm65ig0r3cjmss4mwbt3p5evl8c195v0htkhigfx2gf76sn1rytz9o9p1ms9h',
                messageProtocol: '5zmtzoacvfkv5aqoilog1eb92d7r7gjxmi3gnzs0989zpdy5ux9vgz0n1tna',
                adapterEngineName: 'vlegmteit1679kr5dzolo640sac0lsjsczyl1u8ekfe5td3hfc9ewx3fwc4gmoaqrqtlc5pipii7633x2zjvoqe1kzndf466sxkg76jgduhcoq1qgbkukvar5xs3frwh2e5qjgqw1b5pej1u97zhe98q6fk2b0no',
                url: 'jexpn3q8an76ds0sjx7384fy2te8g23uu9e71oe8axu7tf1qu4aax5rrutf7au61tongivymr4bkn1e7rlwfngqzqz2twcoilz84at3guupf24xrv5206ngzjhc5u6ts56jpq3i2sp1gnvbe6nbnaxwti3simfp71kw6u3bwtyv3k9fba6g384s0uj2e8366uztim6h7woqfhg7wfw4kb7o5bzcqbkkri5ngpcosvbxn3dkp3os6lf7ingjv3xbqekmasj5cofrey0jxr750wkxjt81pxu68vcxl81ebe3l75bhpo9m17joierz4j6y7',
                username: '5543o7e7mr8llze4rzvpftsxpmvqm8nib1khxmnc8a1jot0x1ditvnxk6hn4',
                remoteHost: '8hqly9ee07x3dds4do5uqp39s28u9h5143m02p7167xdasqmp31x3o6psn3i5dy72rsarjfqt4eumj8fxj7sut34xr8pfwh8v2ee1c637p34eq8mxwxso6zncsdgrhebcdllo85bpddsm0pblgf6sh5rpmfxk7lf',
                remotePort: 6195193326,
                directory: '5zb98tkdlhi6t05zglg9fir1qpvvuabr5d2rbwc0uvrboljj2cl6z53qpmud3zyy1f7tjh58gc2qjtcg955xxacm9u1n7hg305puwz55o8s3r0s41aw8072y0jdeceyqucmqxy78f9y73vlqy6x26no81xpeqbr4k0p4ewu4y8nsmkigzs4bljn1ho6jzidajbur0a6v8ien4d3qkcu0t3g0cgyamogf0j6pnh6l9j3xwdpu3qkg3k6d7nuyexrnxpzk949omx6j39r8xragcav061g4jenil0ga0mfaucucql7s8ybit2hvpbbqfq7hbdfnwndkab0odfl8t8ws1bh1ct2574sckxxj041upr9c393hsiamzbqmhx9nfe13buz1wtddfwfullgf28yal7xoos4sh1875fiout56o9q6xwph3jm92os51p626ec162gpvab412a1p0zeg4pgv5i3hcnd433vifm26xzz80wj5tzuulx49zmupf9gndqtq0graviq8rawqabm5513trpegprkqh2e9s7fdnwtszbiuxrwm3k69td65mjg90odehgf4ej1lwhmk68ut9zc1sol9t1njossctdr1dxc48b3hate9eb4v4tgr4o40w6fnhu835romdmanr03wcc5wkfefpk60kvyd11jee6a01r43lef2zk8wkxd6dv6971i452os9do6y5zfayk2ivl4n70euautb9zqtvhrc05rl1l03kxx8ypxkr5dr8dj85lts428o3ty1gui923fva0qcpkb2r27fhu7ppaerh52sfc8rbqay192i7cht1rwls8vgs2fcrf33quxil9zmn65axsqq36i7ie6ecnsdbxnycd3hwwertrglaablu5ejmhqm3ll9ch65299vrb85n8nsit45l5f5zy6gm6dagzsi6cfakxh95xlrjt1pfjxwz50u64fv6ho3dt490rc1fm290igo33z8rc2gy0zhipgbzptmt4l8al083cdpj3test',
                fileSchema: '6d1uiejixowf84paqe8zajzthaemjc9kqc3hwoqupyatf8pdui2w01hwoocowmnmcyzd1khuq8tjdf47y0t5nx3i02y9pnl3lt1h4rat55c36lxvrlv6c424ttkv4x7a0rb21y8hy6ezd8ckbzyi6uxnyp87uz5g3a61fjikhxwxunipkey6n8k6d52iebm22rzavqphm6k3z4arhz5ow9uou397cj17k6vd3t4547k50ftsvb5tjbkiidzg8zohjjzjljin56rk3rst1zjxb6y5yb54xk0whcqk7cnipddt0yq05db0hhqr0cw1tqzvk7ngxsn6gnc8gjj2awl96tiyre5u0xg3gy3wfnpmdtc6neiqzs4y18plej56huu2yk8299txln26wsxkr4cibn92ni4xtjhm2sj1ca6uq7safv4p2lov2r4g7ec9itj5kefspsmxjk990tdlf4xmfwdlbma859h9p9nuk99ad9g15xhwuuebwqned9zkxfd09wlkwq8k2ptc64cukrdtjd8mvgjo80byzqcmu00vjt1scstzvk3s252g8jbyzn0ci2yhyi0e333hotn1b9k2xibjqphme895tgbr2ild3s8q1b6n0l2jkcilpgm3ufx8zgbjznb6vo0tovqqxooaag7qu6tbymfq0hjk29lm4ll0wg9j6fku6imozliwprxrxgeijcgz9jf9v01hwoit42d62nkd9wfngzc89gw2td5jkyfoota34a1pqwk7seufb52bl1xlfjpvm874tiyso0s45pj7p1ktwxfbxmobcp6euwkmw43nkgj6slegtt3mr3afntfcppyur2ohjjtkbgj9tiuat2pjv5ce4if5r2fh5dwt2jv0hgz6zd9q2cz6desjtx3n1sxphbi3bjoq7yktxitf3aqyw0onb2daws1a8k5z2hq5bau6bznxtcalsbp531ekjm1v0r7lu24qc7ik9w6scst8cjrzfv5eqni80l0pvol7tvwzza2igjki',
                proxyHost: 'dflzmpp066k5twoizvopn7b8a4hu9oy2cfiyclp6i8rehpv0cy8f19g25fh9',
                proxyPort: 1857276182,
                destination: '4znr1dn0ccop3demhgj24ofl1vm4x8tlt827rw7zm38qwa81bmeof53dxs09hqgbu310e7cnkiwssrz0j8bvxlmm9fqwj3srkemfmh04972th3aijxap3wfvzr7ulb1yc1q84431i3qgxbq6eh8h6lwgz3eiq3yh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'manq4tz29fsw3ol7ws7neltwcoa0akvump11wbf5vrza4occ5o9ha5khsul0530iydg9w37z3vw90ptyamjzl55e0usb33flsb9k3d070smrso6v8jhu3516z8gl95deo3hngxe1o3m9i4lzkud44joo6nzfod2y',
                responsibleUserAccountName: 'bch0x09es4l9t6179w9d',
                lastChangeUserAccount: '1sj4ij9cy3ykpex9sba1',
                lastChangedAt: '2020-07-17 15:24:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'i6qrphr8c0s8yj9x12sxiekzgunmvj2iug3aink337n73ve4gmpia2lvff8fzj3vr9db1p3gz05tthxe7xc85viqr8x8s3omvwdurvfqyu2d1tp1leq8qxkk63w311q4lh4bu4yzpdvkvfklpgzuck1fo2lzhs93',
                component: 'via7ubxioc9lbih1sinohtkq90np5g3vhmjq7ougmbxwzexfvusn02ug1axdg28mwlr3oolws9a02nar1fzdgrd9ovjsxq0x8ioroda1ecutitq9czuown6jcaik2cdlaz16yzgcdnj8pjazrdfl94j9ya4lil2d',
                
                flowParty: 'xnz6ni3hpueyu78d6i6ae14kfh7fqrbduvf1p13wafm8jorwg4n6vzvleap7wahcpo4h5mmklrzarmkfamdghvxzhz6e5e6w64ee9jjecoagqs9h9619uhi4yug2hl61bepncu8ta7vtx4vji36gyji0i1c0jld9',
                flowComponent: '3opwryxrs2vn7u3k56hh3e9cpzkcpwmoewqp8zzpwvqicn67gxbn1qc6fxsedzr5319a4zikv5yb3k6aj9z6u3abcyaklnzixl732dg6c1g8sdocruc93thihkqg5cnivgxralexx9sf169zqrs1nw3401i6d2t8',
                flowInterfaceName: 'vnv0i8i8ayy0qeldh1uhfackyh2a3ht44fna4q7hn3jybqwm8bshee2hwkzgssc9tnv0yy3nvxdczwgwub7dz0z5j5s5q0mjbm5qxrlra6bq18qbu8p2peyhdq0ufjbezp5gl8z62ry52q3h1bdsghwrjk4om0hs',
                flowInterfaceNamespace: '3aoddoi1dolqb37bxqbgibxr2rdp65jbs12mgamy4r2maryqk81d6qn08njwiptjg4664zlyxapfbyzvo81xv7yplaon7ow75v4nqzvf7gv7toms68jlghp4te6clrh0ez2z7je5evoit87crpeqpd8gg2ee8glr',
                adapterType: '14m02uhjgy0vzqrgxzmo7g6e03vp1f4g8xmzvn4l8pudppex591oaz0lxxg1',
                direction: 'RECEIVER',
                transportProtocol: '73pvsvj8ki3e8msl52vat8x0xa4wo2irqj51xl3w4fooco4potzvzm0tauug',
                messageProtocol: 'pm9aeebduj4iiwsmcjnl65bmyptihcomy0m9w4hx4o874x71nca53578ix23',
                adapterEngineName: 'whf1em93vtgxl1zk7vs2cy67den8rylfhkec491wt5kqtonwhv5y2semgth1yr4iz3vyr1qfpyyqly9y14wjydagxcz7k11m8pknih29s3jol12oimh5lzrtfp7vnq8hq7f73d6lwq7uqsj8frrl7m51t5kq4ys3',
                url: '9ganbux2xx591jndamrnucx8j9xfrylt0eg06x3i7t1a694i22zdo0bl4pt9lytgei95lgudgqrqil2v9ov7ok66a5mxcuu41sy2tnvv9kp8qn0v1blnjvcns31wqtod87xc758bps8r95bfjtg81u72saa89m6tqkg4qc6jzd7j2xmq32vzpdo2nvja4k1qfksqwefh6nzjp3oecggdpgctivsc0s6idha6mtxjhp8ztht67bxmfx807l76w1ncwbdxhtm8p5qpyqqxysj4d3fvtxv8vdaxl99csjyzjmc6euu3jx79juucgwrhgz60',
                username: 'lca6o6hros7b98o7ukycn1b42jp12h8vr10gdehcdqc9yhuq7askc4qss9ry',
                remoteHost: 'lqpukddkqxdzbwarrt3w1ioynth0zls99w0wd0r3utib72v5680uz5kiuvqwxz1i03eevc0mnvgewjvrx714fdngm47l6xhl9pjj5unblx7o19qytlw0c5z28kq8f0kcdqq1dntbcwvwsddze8as4xyfvg4dpcoc',
                remotePort: 9021878129,
                directory: 'j5uiq9lqfwrndepb02wpu79fin097bnri9iexfzyk5s5yx1ebbycs5itggp53kglkx4vgctgw3g6l0vi3i3r3pvcd1dv4j2x9akhdolwxasl76tv35bh1u3ava9hsc8o7mupey0v0xdnor0sfc9oblot1qb5ygkxih9xramug105uc7am11vy511iiymh5z2pckwchjf7wdytcc8ja692padzmj2kq7y1knuey24r79vmow49nbvoshwwvnxzg04mdc6mnovn6duu7swjottrgdamc6kqfsvwsbu4ghx0f9mjcxbkeu80qpuld80kdhq1veai80zhxgv4aikofhvn2zndva3n08sw3mtxvwa4mxtgkwga018g8xb8np4a4ifq7b2u62nn8y9b2ew1saycwmy77df8tb8dqy65v4ecyegg84ot2eop1nei284m1p9tma9gbr6qusuekyrv198dmty2baij0dmc55zoop0ndizvgvj307nirv9z3yntb208grikmwlkeotx5u8kjjg4i42j99fkupx1vmr8bh1q3voz1v3pe8y18nk0kbcbmhvkxza1qxa96cmehqkff26hqz3berl56nw78m81169sybo4quwe1q8zgsrvrxcjkf7mi0nmjw2k5y7jsgbwosqmhi4dxvrnif3ihepsza4v06m5dy928k7kphzq6pxdiaklw175fma0qer9bzwa3ln5sriz6z5zxymrx9v7qlutd0dk70m587e68rhz0iojcysep7ehn0tdpmuat3zg5dp61b1dlai2wj1dyrp040nxz3v3wl6pcrl99jc3nf6aw7n1lg9gsngcjdxocnwuno3sdpb1zs7lwwtlzva60zm2nltkndypbbdbccsxuev1zk06yfrejieb70uuwdpw2cr87d4spn1y4tdthfofu3m3dh95mr3ios04ym84uabry816zg1yopftwwxmh3jj6ztzsjte36cttjslsypko1ruwen2u5cympl45zabhqf2d5v',
                fileSchema: '4kh6yhvtfy84e554vl2etk9kuyblgx5hdjfqtodinnqci3jmqou7m5l5ciq1rv8xwuandycnelexsxptz05q2a4i9li7rk1rsftovw4dx1tnnd9pjwuejd5mxv1otmcvxge88ttnmcyoxa1vw2q9zqnbsfcr5bwjtkxpqpfewpajq3nyv9o7kjyoa2rd1fw34da8wqc1rkbiqcavk8jk6kpa5c2ylhzot8sh3t2zqkaj4s3ffphcld2a7sflt557or0uik1man1h7iijzmh4worddzx6orhs1xea0o10rijijeol60u71xlmcg6b7hq9upfe2le9ed8t9x8ezr6xi0vna2qz5cg95ws67pfoj9kq6cy2ymvzqvsi3x328750rupu7w5gl86ftmgodl46jhno4tlet1xcao8ojhr5xjw3o6vnywtzctw3lksgi0dni52jgf76q79cvahcaicvlvufnrzpndu9prnnkf0bgpx15n58uwbwynrfx5psdoopzsdizmvw3w6rq5sxgl9x3buxfmq7hagwnwbgnt4fz97dbpriv96wtojggjxd4gchsbe75oo4akn2yf5tzlh0anozlyp19jbaobzpdcsol6ory0mwrky7rh467twncrydira60l5nrgymmobpy11epvmoid9j4p4ge3nx3g5397oq2jjmdeugz6tovr2ah1454mke2p1yls0bn2ifgrgfmx9tg8xpveb0qa3k69qyw14mursqiwj8dw5qirotvly4do0e3bf4mcdzk6aryk3fg60n8npdq553naldgt3vtf4guz3mcus979yrqwlh4yslun27boh2gf5rdthr91ej5maiuwkpx5nununu90nmlkhd66s8szm5qpdebc4n2icn4cpelbxxuw68p8h977187fm8kiz5yi3zm3v80tlnkk1fv13bre616bie9k2i8xptabmbd4j3uubzbg7ec5db32s9v2j80i2g859htc2bbpaba9llh42k1ruqge0n4bte',
                proxyHost: 'ztgsuzjdap9chezcswtuulscr528183fy5qmifcymz344sn9o8utggcsjv6d',
                proxyPort: 9169832861,
                destination: '9mikba860kshiqglz8q38cr68rnwvw1r4fnm8bi2fbx0q7gmht3qlw8cppxgw6rlg72mn77zhomtr1ydkrv64m4zt9c7gmoysabnkxlbuwvqzvc4uzz093mlfjadv9i8fwwom9p5vb6dlipj15vj8jxkhhx6qrq7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2fsf0vqxnlop95p1yk0ald03q6hklqq21hjh7o1cwtlbdhealu2wmnvssoigme3o786l0ps5cw0dh15m2trcfy0mh2wrt6m1sbcnqjjeulonubxyxxlf7ewlmsmzfngwajx2uxdwqmehier1d8rsowf6x78ir8v7',
                responsibleUserAccountName: '46qsgymox32t0uzwug7m',
                lastChangeUserAccount: '465ygnfs8iyw3zc2qkb0',
                lastChangedAt: '2020-07-17 06:59:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'uqxyv6bxj4q5xzx1do3ybbkhxxhwcw6a3dpsyaimsvxf3lbrrkvxwuxby43tpcpdv0ck03rclrwzp4khzkv28xwt205f56ewizwq7uxvdo1wnvjuq9ur6tcfzfxdgb36vgofbhhjrpgx3bbuube4redw6kbtctuw',
                component: '3mvundn218atlb7r9ftv1gncnygd41moniavzf6v330pe5qlj8u7k0wb1ihqhwqt8aoauqueb8pvuko6gl2ekjdfkr61651kwmee6vzlfjg9jvjyozqjrrksyy73qa55hyevp58wkr00qc5dp07lfll8s0j9fh4s',
                name: 'btf75vgle1cgt8bmeoq2b5v3u6oh24iudvvfvddqesxqu62vl7bvgq9gidbeptzampjnighzbrzt9q7opbx0zanyneng7alncy0qe02778eyq4v9m8az68c6ggiohmp3w0fte8pf8w0par13s2kpdl4phebkjl63',
                flowParty: null,
                flowComponent: 'mbwauzj75hlrlrmko4qs50mw03wop8ozrmlke13023n3cphywso4grdkm470s96hrvh1fwxlv1v43zp90bvad9ilxoy73bjwv1iwnimmucraogxkk1sjdyccjgsad01asoraezf1kgrilk9e8i71mhakucuhq0ng',
                flowInterfaceName: 'aci0wdrcjgfoh66obutcu1iim76gkjet62blnjo8yslqvithfmnqzocafirtjcatcpcjsa3ngyxb91faeu9mj6lxs3z3hzoag0z0ywez49wi0lkhm19oxtv4d2fdoj1scjvb208ybotrfwtgqa97l161kijqektb',
                flowInterfaceNamespace: 'p5quk3hgxypnv6xt5utk942mrglcyj96e42lrgrht6ltuwltc4vaiznabupx6tipb4i90lvdj88zyjltwp4tjdq37l14n8jtcoarpqht3dkidh08rgkby9jrn1zogsq3xiks3jnibp41qsozqe3yinx7vh8lcv93',
                adapterType: 'hovmdyl5w8qhwud4hghq6nyihlwmnvj04evxds1idkhirtld9wyvdzgx2fwm',
                direction: 'RECEIVER',
                transportProtocol: 'ry851dgz3m6yfshu29h8tst47l3znnxbngnjbaqx7m2dou84asaw2q1o6c5p',
                messageProtocol: 'e0l3sxmluupwzhtdpa68jsuchrr6i6ftxua2gozhfho0y76tf8utxysk5u46',
                adapterEngineName: 'gqi7t650ozamhq1yimd4k2twkoxoy3pnt8417en6k3cf3ynck9foawdx3uxeuxjl9a65aq42jg2f6503t1rgq7enoyj4d7cacxh76b6jz2jbitk4t5i8o49crs3cjxvdt7fbnbk0ao78pgomz1dfabb6fm4wsiu3',
                url: 'hdu0t3kws1sy7ecyelaq7fqjd4udduuf7npa3mf6nqvc362tlfkkwwyiz6qr7h8g661xrv6imb8ryaqsujtawo00sdrjw19jy2yrjd8nk3kxg0cksohxcn96kk53r7ihcm8wtcp27qgmm4sy2j8td74fsop7j7rpcczziy0ejqm84pasfftkb8ym8ysjxyotneef1xaeuz0i975o62zynsztyrlxetu7xxkgnf5yu72msgazqymr6y77jxo9ahkn81ulefjp6xgjp5qt43uzdzctel0jkqa7i4kbfpor798w95y0p3fdq0nu1s4p0z2d',
                username: 'uuhw107u09vk6y2sjz24h5smk0cdnolfc4xzbdhnrfa0h4vdjjat7gxzqpww',
                remoteHost: 'mhutdmdr3zk3q6dgx3pdwqnem3gtit863aomlcjdxq3pz7qm6caik9663dy7j212fl3nzf2nwk7twmiz8bf9b848ssjjonyamfk45wlc4alzlxab7civufn81b6k3958jdco1ecu5wy053kag1y05kvy4c96fkux',
                remotePort: 2378418360,
                directory: 'lkulf7m3q73bivardoeaejl6dxbor24cix78vizxr9y29toriws26wtcuxwhp39dy8t87r32e80dl9lndhpa5ahgmhc1ezps7b38bdhd0sr4n401z9y4vb29xempeetjov8szp1y7vvky91e0oejij6eesd9zutjnohc8hxkd91cm6u55ndwq9be8xrsdfhxbz3nij8xklvgla47fgivwdd6r9amhu0boiayyr5yt1ag85wq3q6eeytnzul3n2dttyqwqq40qzwf0h9y44v1wdyjoilugs22zn55sh3wvco7zlgpab2aknny5qb2cadu50q2zakh2zx3e7a397oc9xcqclm40c2w18y5b4kwpz9boe6dud08ywyd9dpnaxtf52e0qwrybd9c2km7icn0qsq125dfh76v983aqxmxrom5f5a4v355rv8y6hdpjo4jh18o4sr774qulm2ai57oolhtuik33bha3v1bq5qk3k8f39zguorhtq0eb56x5wu37hpvskm9tagekcoyjsxgf4i1iuewyd47ob9r1mmkhflc86g8y2gdagk0nx6hkun7lp5luan36ahv8yzwsuxaaup2memq44ibxjjstfznf1f3d2ne66vks7sace7s2soyaju1j7370tnwxstmgagprpct4j7p54a3s67z9qhcv0lihqd6yecvthongt9gi0zkrvyhp4nwps6d19jldf6o2mh4unrlvdvwc5zgyjm7y3pfxurrts9x2lsndeisf9dspamsf7ut49nh33r0ot63c38z5as94wy5qtksd4oshwfu3j7o52gx91im3odkp3oafl0p6883odvgk3c93khmv446kp4fxkkq0wy84vpd9s771vrkz5gskaex73g938yswutomww4xda7ofupl081djqpn2jcd799yxbqkhk669celgr5y0x37cu2njtfsbmopzunca4drul3f3h8cnuts7yc81evk266kczex82pribg99duv6uuhqvxpuhn68cu',
                fileSchema: 'qxzqbcwohthc91j3rzppb4oq465rtvbo2cjv38m2f37qruabpyxl9c1fjgekpuddi2nnv0vsiws4n5hf97f2k00gfu132y909efjhyao9cdosd52ydhu0l03b8gn0z1iqsl2d27kb9ivzpveockw9l4sb7tbtenaiv30tasjz78xx8x321ih8x7tnkc6cvd4zlggilhr9yuxlhev42gz47rgkr4psicri46qvnpvnmju0oahe5pmrrh5n6tcckgrnd002u77eupc9xo3ketis020txg47s5q64mbchrqzcp2hydipelrzuaalllkklicg1w8n336uhsr3xp8l0lfdmlx9syc4spjzqrohvjr1gjeh45m2xwqj9v1o3097677l5cxqer5srobox3jc0y1pyb2x567thsdtk76jj26r7zbva9hvmywec0s9zcowrgpkn5lq4piraiabv4ml7ruvo6vur3bsnrllea7k3xown3kcscwhxrsebwrl9grq7kthr6o7fi8vbwkanodrjloxiw16vdh3ojfs30i6dbabqtlkjkxbhp1g1rsi0nhljxrlykykju7pkmbnxhgj1fo5osk6m1mi83m2wsey0t8zrg4z1470b3yy4u8bn3xfw0lv7p7y7af0xikyxzbizokfp0c6bv3w3vburo341bc18fbzce6c4ccz8wsb1sgddhat7f26dekcan8gnxjs0xtv88bcs81gzfpe5an8dxltpk2x3fospdsbl3psfoeko0j78olk0ajer5q12jcrttmczv5p1jsbz5mmetyweu2mzxzmsu9yhhxf4ub5952tkh43zaef13ysfwmziqzrvy71x8iitwybqitr6s3kpjtceto0asa62rn7vvdyd9jsndbswf8ypwtkpls14ff4xwias291hbgvm2acyk36nusxtk913wqdn50ioidhkk50gp1tz1mk61zid8xa1zuvwyxw7unhq5i1dvxi74abthxlj9msds128dosurj8f8leokh',
                proxyHost: '8a056d2b3u0ghhu9cn7ii75k025zy65ikt4incntyfy6iw311ud9nc9ihaku',
                proxyPort: 6955506608,
                destination: 'adzvr55riupw0vg3982f40rzjh2sndcr8ue1xtcf93895mq517cshfhou24zw5azisb62kr9ej8nt35aunhb4nl6kxnukjki5vjw2yonf9tekjavfprs5e6cqp0l2g273jef5yca43982gfryf2cymkngiuiedpj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3cgbv971skeltemnae9w88hgh1mt0obukiv4zg8d9ntv650dkyncb62b63cywkz7uwdetij9d11so7wylbjjl3nmer1lmhiheoml8d3prj13sjor0mewpewmeu8dv2ae59jkrl7t43b5zaq8qwsyaw7jhodgkgmq',
                responsibleUserAccountName: 'hq06vphdd1etyzxicsdq',
                lastChangeUserAccount: 'bxnpza7c0eqbnsdu8l9o',
                lastChangedAt: '2020-07-16 17:04:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'm9aw9rujhhwkh4c0f2q3hll2199ho06msh6mch7u9mmzvsbionwon2o6sg34ai09mtouci3lnjufqnlrn7ryx0imm2vnnn97tyirqej0vhr9i9ow6pv12k71v79qhk5ybokmuvdox2qsr4lfjlwjh27obktccdyi',
                component: '98uxcj1spg2hmbx5pj3bx5w5zzci2zn9jx29mkq00opsck38704rhsdpiyje4c1rgrx4inskn1j77yv9kes2nzij0axfu3015uspc4d55ebar80h51npr2t1sv7ma0lyl31cq8v57p30xu9isq2bbas30vrkl3bm',
                name: 'dqu6u4itwpty92r8ehwknrhh0wtltui7da3wwxk6lp81t33wc34b13k55jsdsobi36it7lafwiz8hfgjhcgktdyt3gpgky5dzdo28x3c5ykdp5cltpgl7dqhepekiokxbd6gyx2b393e1j05gv7m5hns9esolw98',
                
                flowComponent: 'x3t23gxvco0yyra8aflfovdhcdwafi37r74if05en2amcwspnf563rr9wif844mfobpxq0n4dz4ucqnva3pm0nb2v8kz13pzp6aafqdlgmnmbkx9qwl3h1xk52i8fvrhi142tb63544jnzcpvilokct7rrcmzt9t',
                flowInterfaceName: 'rdiol9gyb690u0eo0kwzanyas11m7ncreiqnqrlavkt7h0wva564g1047eags01l785mzhdc57spov2q7wjd4iw9dhc5et6milylgmqljwd5oftnw3gobmv7cz5bpss4dqe1gnbqdrrp0kit687av0w4iwz4axbd',
                flowInterfaceNamespace: 'c6ozaz6ab4ij4y87r8zc8cv0j1r3akc4ann18zn88voii5x8zxuclvjlrp5zbc721p9rfv0rhb78qatlol4g8c9gq2flevxb6137vsrv2cz30x4km7l9e3qyh6m2g6tubvkvus32bropg78u19lla66rr7kuyll3',
                adapterType: '0njqyzj416b1itgjxfc022jgdhu5lifj6rsibz34z0es9j2y30f88z514di0',
                direction: 'SENDER',
                transportProtocol: 'oc7ovv48zbizu8bvflnl0ywl8cp9o3jaua85rpnbfw3ou8azks82k60kaie8',
                messageProtocol: 'q5360fcfhpidtgijx7xkdrqs9cqxssuqrodqxai8zyqqwdypxajnu3s2umun',
                adapterEngineName: 'wsppxg2iqizil630mb9pe7ykdrcfopbw8jh718gq2drmqno79lde5e0tq7nbkh8ekcm328f7sv2gvvijat1t6rtxt84n8kn74a4vyb38wur512eljcnx48zllh3s4582cl0p76wv061p44gt3mywojid96t60t5k',
                url: 'mgppjpyqg94gr2qvmkl57jdvhtyuiw6sopmkj4fkttywzsyclxstxv5o36wanansscs8395wocmbe533t74c4kw9kce7q5iaq3pzklhjrn0gin4a22w6934n0utbzva3azvybgehcpebh696uuluugnuc1m9xvjmrnn8qi4qzu9gej849fpgpa1jnsttr5ztsxzvo6ausj4ar2qmesoc208uhq7ezihe5y780eo9dvmy96061pit7bfe0e29uqhnkufm1yesg33r7zll2h058h2uq8yftvqnfaxtk97eflg0klwzdic6oxy52k7p1yky',
                username: 'hl8xiwzdtza1viv3t36cja406i7gfxcd12g93bvxqg61k3ywzw031unuspy5',
                remoteHost: 'hlzatt56vv7gfnxrbbi4j7983l6j8v84abi0egcc8rca30bc2qhepjvm5a1t9ahoq1lfxjm6w1kcwaa5u7puu73rtfvwgqnsmtrt0gw38bdyk3fucn48v1zsp1muafceojdle9pzw9a5khhi450hx4mals2byd3y',
                remotePort: 2228444745,
                directory: 'fgm69m3sg2rzt3vo15bl2n4gd5qszrpnlv0luumqichtuy0bfcpxn4qow8mg3voi4cz9f5qjqow6by109zpigv4ilr5ol06d45xg0wjbkej9fmqa4z6i47rb1jvc3gsol615dz6qkz7lezd2gild2p0eshbi019lpslh7dlqf2jgswqyx8bia1jowf07qisi1zedmgwuxspui5kly3lskkri57mr25ua1c5k54txyr76rwdjglzb0tl7fwt1p9c9ilibarij2g1mzy7443i60fc0xclb1fwcffxwm5yi7pcgd8d2rag21rr7zy5try6j2uqtomys83b2ly13ta4h7nc1wr85drzymns2t54siqjsk7rtynli1vy9nylldzbdhv7jvlrui3f8u05drtidr1cvf7t4t7pekgzsni1t648xo9p3n7educq112sofr0g5ftoa2x5rsr12n0z1dpjhm3ur1rgefwb49q7soc4grf9xtkjsgkdqxj75m00muw8z09ox5c3m1doql0mg61ffmw0psnhtkj5plkqxro43bettujhyi1lncowvm5v42ngfgi5ediaj0tvhypehlzu354tskfdelbo801x9lnnr6d4ls0evzn6iyqj8bxkngk4aewwim604dhkzhif06nl1t9z2peulkd0l1ud79xcr38mff62jg88f97iqbzbaf9jw3etkh2uyqdyrbsa4xzhkn5lrnfm57hug33aomgg48z3q20kgadgxhsrc12xsumaukvdwhz3mi2i1995div6tgvzrzmcvema30czjofuroq3h9869btepktw5jp7bxo588kp744nv36srppmzv9qe645wxz2yr5dbl378h6xzuktwev05csjw9nluqiupkfcyk58atat7cinrs6wy82o7my4nspi1sziycscfqycc3gat8p9u82xsdb8v5shtwn3vfsy4zf378kfrw2occ0b5fjp3kpwp9d1ydj0g2go3buwq13jl6eaabntomsbu5vl',
                fileSchema: 'auiddwh6h46oo5n3otfm8gd6c7zxmu6c842ouzm95unv4ed9hwjbm0flxwi2rfrjosz350vlapxzadnjjdq4lpu4n25z66yj4woym8c3u4s1othqklg1ud4u5y6c7524di0x303h3fpdic5bh9ru8479bgxcuw2q4elp0sy9ark70my2ofbnjhx1dg7ndtagl27j8zeup7q4hh19c1pr4y6xtnsrh3b1fuaev41idxqdha2niiqtk10qe4mg9fgzld1rrq3spva6u20mlpthgyii7tp1gh2m6ws3vqfzpimqe61xc8ih71cok9uiv7vzikc9zycs9w5y3swmqex9mg384q1gjao8k57jmg5rihyeqt1218u4517y082ocqsl2y854qrspgtyezy8h4gkcvhlbhjb062obg6bf48blu9liq91bdox427ccyozx0b3d3v65eztzgid91g9xkw60w2yzvcek07ik7i4jwaje0udtbc5hf1l569hm1ujkbjc00qj2ghw9f67o5j3gi1i8frt4fu3kl5o3dq44h2pqacber0l6h1rrnlixnbujjmtk95mg7a06mxlpm8h4kej30wldliz0u6ebxd0mdt74joi4z1o77rb8r62cjdqewfnjkcaxdh0l90b232z9wd30yzrn5n4qz7xv2xwmryrzh68gcrbbhtc5b84qf6njj4a0343a46ovj9sd3umnx8hfwlddq170og9nhm791uoe3mh10wjoo29zc2rm6kxmllzfoljxflvd8w7lyv9zleskty1zi4apsj526l5dkgrwkd1l2911ncfotvj6r2zgv1vcisab8dvp66bp2y9m385ts0ytlarw6juj0ojdugyhy52xx0fgfymc4xcz3y3thy1avz0jor7lnlappyui5ichiawp8z1u01pqwxh6eaapiw8dj2dx1ivrgqwyd5hc9wh54218izmuxkjms3bvmghii3e70wfn1hkhy1a56toal690oqqd0yihu7wiztw90m7',
                proxyHost: 'b7500irsdtlnzjz5qtut6ke5v5kzivnr44oh1d2hr37afs9zf3cnpt7g0r6x',
                proxyPort: 7109178307,
                destination: 'zndv3wm6ufapho6of8bzzbv6ohvq4gxmnmsy9sxldisyhtdrpp096m9vxo0u3fautjz6qxn77fldhux0adx0pvr59gpzbzlcf5g4p7pkhuupu4vw0go30rmcf3gcre8li0u8rdol4j08gkkv2h4tv6jp2w6y1jrk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pry7aw19a25407i7b1x6975cu29jybh4qjps5cf9lyr40n6nkb4kyt9v6x4hwc2svzj5esxpl5erv0ro6oa4kmg89cqayvg15ztgpm4v7tzobz0vvpjzthkuz4up46r8b8nu83q1mbryfjy8vn1hrvnvp6facsvh',
                responsibleUserAccountName: 'uegrb2bgv3omarc7qwda',
                lastChangeUserAccount: 'wg6yl4pkym6cxnr4o7d5',
                lastChangedAt: '2020-07-17 15:43:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'l288fm8qpvk6xd1mt4sfe2op85fo1hiv446ybv01ypzs8y46l8xvr25vhczrut5rxm7ve4mhtxckhb6pw0ko1fw312140jag0oaqwgkwqc71vxczur705pj6ga4hdxu7vqgsfujwojw6hrg2ing088jfotk7dwzm',
                component: 'hehfp1l8djm1nstljm3clhkyw4rffdodh0901hbezg5qdot68ytb85beuuhvz5ciny6ejhv07ihobhsr0aedp1bi23kmvycrbquptpxgtdwsfphq86k1uvuuj50k7ox6p4b3la1mplav8y1sr76x7kyvkkr5c95j',
                name: 'f4r1m2wbh8svuclnbkspddgk5cpjbn277xv6afy4nny72p5bdsvhz9u1tj9la4yx54b3tyb0rzety2pi34pfy7hsg3tzllxo06739irt5ptwpge7dz8iedk7o34janw8qq1alw21jjj9f1qx4t1kzc1gh4dm0ivf',
                flowParty: 'nsijjjxnc8jex2tnzdlny5zdbglpfuhrwltrr744454dfej569q6pbza8u6i1ahu050p2uoqbj7ztbtnfs42k1215w202zo2qumyquixvrsl92lzczgr96qjo7dkpqffwrm9l0p2tmm4fmwufchgb537civ9ixpd',
                flowComponent: null,
                flowInterfaceName: 't4hbmfshoa74axra63fv4nrt0sgwokeydiaqm4xnsngzv7tfee4wbg8k77704h0toeq00hs7w42rj9f3431bkx3b4obxn1nl0mv0pj03qmfla8k9pjfg91m5zf0vricfwbgya4a3dzu81m76nbm8qsy04321bpt6',
                flowInterfaceNamespace: 'kt4hkghfkswj5syt8jx56nt289z1wazf09ftwglsjt3jmepfs9d86l2y1m34mgnvkxtinc7hvkayg2o3z10rkqcwzpku9xlr813xuj4sqd459ielpo2qacy37tldylkseml0og8r7eqjnpcwe3g904kdvf1wz23z',
                adapterType: '274z08k7of0sh7df7tpwyio0uk3g6jymw225evv7o8f3wm0v2ah640kzftz4',
                direction: 'RECEIVER',
                transportProtocol: 's123kvsfb27wn8wutrb0x5ao2epcdrjb3dm1q1itd3ixkkrrnnfbrgccry57',
                messageProtocol: 'akff2o3dxkvlwlmv00zebgdy8ntpttpd0pq10txaz50sbhtwxdgrkhaujull',
                adapterEngineName: 'pzgl8etrybxd0fyda40d72cdd9gnymqlfnrogwgogi3leeu23ck93kprjlgau83aamre6z6mzxqb9dso68553bwbsoj13t8zpkud0h8obdvufv1i0nz0s7nbnk6o8x9jbef2ut005dfwmiiyq42ynpvncr5afmur',
                url: 'c2q3i1qsfnoifkpijeghugrnetxk1jrih3hxd0k2ecdt0lrdoma4dmpnkio19iytnf71nrkvvtwqxbij0m942tq8f6s92h4m7ygd969kwkls6okwao64ome5mtjenv6ri8ncuiuopo1rd1o4rsrygm0y88fz63ibdjzfwho4y2jr4zbf5g1ghj56em8mhdr7jnfmtr63zl3ftbwfmvfsq7kudq4v92zvj5mcgcle6tjt77cbq11yham3r7n7o3x9v80mphy5475xdjwvbq7yukwfea0jcqlz30ovjjdio83s2mlkkvx30bay2h54h939',
                username: 'w7r0td99qokz7x0d8hfint837an7l49wwsw4o5u6v9fy7rco1k7voxeyn92n',
                remoteHost: '78lgfrieil7ep0bovrzu878bjhkmi53e82zrvd67xacixoi2kzdhv6aikz5lzhiaaux2r26oeefm3uim18je0b8536v8rppdfzs0bamz6vg6w73n5f7w8uf5k0yampzor2r5d6dtjba1qgr5hcwtr5lry3vuq07p',
                remotePort: 8075967963,
                directory: 'tglylzhj0f193ck60mfir1cv8xrbaol5a5rk0lj0z6jyho9tetplovimww94r4ugajybvi6ugpho903ebv2edsbke6h5vxacn1dkmwakw5sxcg4btnfqiie87i3cyory1z3j20vub42pi6omt6sk8hfqbb9mi7wy0w6mzk7i2f8au4ktllmgjw1fdpjg4svo4hplbo2q4mpi4j4p46vv3541584g7pj5ght6806xfgz2y77w3l841hmmrvlc1lao054hf96zzvn5wa3tjmx5qn9xrd6znhwxrqnpkzlo2i3f8g2kkerr8yr2rec4kib4p6oarrt4u77mf0knxphcob3d4f12gewnezn9h8hzvxhnjsd87wavdlfbjk866p841q2hi23f5aidf7zuu2a7noklw3xs0nbbpeibr78fvpjstcp7x76ss7dmmnp3mmaddp3qfktk7a889prpumwinh3k4f2wa961016e3hmynv2x0uhphlmep88efbw5bqaxsu4ptdl6sjat0i826juycdisv7q0n33aqp4i0ak3u5jbfcqcln0n9p1dffgg7c8os9blrmx9527vtyzcn4rg8x3gqqjsydk9lgl3i5cyvb33bgp4vmy4xoevu9e6rtuxw0cm0ybkyva01babszal6bwmwa76h7xz2dmgv17n9i8vlnsr914lqd1vi2hgne7mljna2dvabj5w85xfefn5zm043j274ik7mwtdho1dxgq7nqat3eerlok6bk04wcezbsso4hhqmrmx0hi3lc24hqctq8m0mtn06fsx4ryo5vc08c5gsdh51birxc98aao0tdxt2v5j25u93b3rqq53b3g5rmqr0p0ayc86tjyqf5vjwfi1x5phiztimq3865j9ruruz01gdhvnb70htdpy4ukoncb2zm5fiz2rapsyjo0q1n84ruirsu0gke8si0b8ilukkef84ssphhintyeikwiwjjsqezbzyqja24zw20cbj9gu756v0f62tuie8ca1',
                fileSchema: 'k30kziiwu5an35m75ai4ygwaa0m31cmnk5lgei6p8xmef8gqana8k40yo7ffaqu1nuc7qmzskacwne2ov84xw6ynsr54c32lnluanvzxvw4dutybs5q1rgmu7sq1yrf3k6znwe54yf9gk6gc9p4vs973txbfvkfhmvysa4xmolcqoawy893g7jre1xw9k4io0maq4emc6weu5zzlr7crpxyzivcns1l13kds6yo4fqlw8vv54zsc4jmj53ems21l7faj55tczse2ikpfztunul45gilcxubeu91j94jhlu27nhd9qqvcd7w2m0goa0l8qd4ump09cs4g67dpwydm8h2oflmsa5iutu3zh0hcc16wfe5xzwx4ngurd9h7vvelrrp675aryvgg8j11wd5k25zonhm20poykf08lh3wn8qb19i8dditfa4zu4677n5vgmz2jvimegfmo0hzgixp3ceneqw3qqyrt18yf0q4vzinu5mj16bxa3i1s5mfkuw3dsodc284inszxu5m6xu7qnwqqn0i86qh7yp7ahd6w4zh8nrqfpn2m4vpjd1u62v4z7i9qjr6qomq72co1643msjo31uykln421pfgabr9oyoibpu9736n9mft08x7bfm959gdvqca4pjozm9a6yjb1kgk6lvdvzraq0b43crnos6zsaj1r9uzwh6zt3hpxmyzpl1gfv14qez071aeqeogmyp8cfw7xnf1l9esw42qlvmbal5xonplrv4d12k6yfe5bn9c4dq2p9otyf19nak5yu0fuyjcugu70iu21d31eg6a7egwg209w4ne0pyo465a52ulewk0b6lismii4tikuy95jxyymrzbjc0hkkwz02o9kr3uqqdbbj3pc3tdtgyau3fzbktturnnsybfiwv5xkbeop34pzvt4o7jw5umh0pm2plb0n80y259o0vetlpoprdgdot1g0eavc3db69h6igbv5816jbecx8d0kj6zm6ibrqbir8myyff69y0x7g',
                proxyHost: 'o9tmbd6zh2halvvz4gp3gs2em2836j3v0htcar8qp4ss654mlinkl2up2qee',
                proxyPort: 5238639002,
                destination: 'nm5rcfvuz7ucrif8hh2tx42jdxsjoav152nmeb9miqol1kklmje5oyi06d9s4wl9zkpqku8rdyokrwsdqojszlfytkzcp7s94sv1cgp2dieb4ako379oqyjo6uq1t45axb4odid301c4addg6fzdib24a859ecs9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'od5ski8lly6nt7ymqlqkfhwqkpe7hesrikxmtuius5da8g13e4ftg7qjukfjw756vdjvcopg3wha9456pxelxd62bjowdi0jej8dehwqu8gx5z0g601zj59digx9lv4jl3u8u8l4rf8bdk95ppnyokzkjjploqtt',
                responsibleUserAccountName: 'p2etfbjs7g1bxyd9x7u4',
                lastChangeUserAccount: '9t6ytz0uutmoyyrecre9',
                lastChangedAt: '2020-07-17 11:44:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'pbpkhip9gbyufcuf2k2sxtf52rkjtoqaxffsujib7oim2khalog07jplpoa2yscqs4jhhvhzo1m03gvgh8lkt82tbu2jcqob70kn53hemyma4qvczgp2jnybint3u1rreteijnau2b9rgiptxocpewvb46bp8x1z',
                component: 'ehek69t3sc0xomqisylhinkx5nwlisdt23fwj7qrl61hy45xj1zjwapp3jf73n2s6kxl7f47yyojelqiqr53vlam30ifcp9xaji0ce713av6y2balrpu9bz51fj5o47qdno1w38yo74dm10u69pclb2r0w3t6zh2',
                name: 'md4htvwqrewwzye408evs5v7wk83ey767mfp50mt3lq64j41rzsw03i0lswivktj34b330z9od2yu2s7dqvr71pmv9fhqxjpwb2y46vg5cm1c5pzkbkb8afjt60o840yjqxbqgf82bzstcrpv65dr0nf15uf34lx',
                flowParty: 'hmxsys02hj54qklobbvpqg7a6yuwhiottc4sv7oekjaeu2bcq91c82wyg6sc6x1ovaqy7l7kdqcayxc04itui1i8c2ger0dcapn6qp7op5fvedsfiuef7botqv8fttans07jpznvippv7gilhqekxhvllkfg5ezk',
                
                flowInterfaceName: 'cbm54iooqrqrh5i3e5zevmtij00520mzq706w0obe4it2vbx0zh03ermxcc6zhwj92j7csxb9gd6u52fat6rnf4burj473jd0i3suj1lzs1fx9ntc0m9lga4ohrbpvweqqs0owqn2k0zokko9rkz3varm0aamcfo',
                flowInterfaceNamespace: '5mob7i45vnuj7igmsrwsn7tsmms5uu38wmeejpz0nrezgytut03d1is0z10tbpymmf1g7f5k5kt1ls8cjcj7o74fek2behjcbrexqisvqzr3mn6v7qrcpjhugwhrfvntk6ae6vjo2i23p371t79sf45njdlvfajq',
                adapterType: 'dmitol3j9dmrghdytfd5iigmeovtqy2u9742nw2i567j07mokx4z3i24udox',
                direction: 'SENDER',
                transportProtocol: 'psfq6wvln6wibykk6zu0nh9qpq5saknziq2qub12hkv14xw4eadae2hlrw34',
                messageProtocol: '0vd4nlny9vqdak1s9evia0e0wdtnjcxyx1o7dygxjfypklga8q56hql60dej',
                adapterEngineName: 'kx2h0qb2luo03dqyvfyi7kkahrfwafz65tr0gqk4cj764rdmjny2eugm59tousitlladzhyyj57bt8uyxu09qiz4c6ig055kzfoiemiwkf18re0bsnpfs4non5y321p085tqihcbot1lmj1wisyjmfzl6mbe84cd',
                url: '3qo7ns14ll6ixz4c2dk7lz24qqlwb4il1r7h3ljrt87sr1xd0kx5nmrpsuito4hd3482g9cxjsqox5gha2nkg8tidf4dd770eivgl1atn8d95e0vskkg14757wvrue32halbdcn78m27md7fm518i7rougthq1i1lj1qnmvke3xr2j0hu040qnp666cwsabhkwpevkbo8mm0mwas5ojuh18enmtfzm1dxzeyjt6qf09xzf1zceenci8361mi4b4jgbtbmke3epkzmvj9wplv1ldaspg4qbwri5nqymv0j5l8a3v4e4b3n2y7nghm760y',
                username: '6ewm4ntbrc0o4f2ya2rly9pygtej2yxkfjvo8en79ueshdbpp3c6v95yja2u',
                remoteHost: 'jp3ckgptw466kdnjzvaf0l8rt3zboorroooifnziex45rtsa1v0hi2zldu4mxszp46qj4p245ih57x74va22d0470j865bvhkebtvkitlgxw1yfhlkppp24osxbwz3fvv88kzryazawha613313jn3upd9bvjiim',
                remotePort: 1094765388,
                directory: 'xnih5j84wkavy5jhaealfuujn7tign1mu0ehs742t5vboyuswuanm2aasr7zg8kanz9gjanlm2ytc6ktnqoifmq3649o19une8b23tfpbftqqnl2eiy7mbhjsm682lmc1vc0uuy5vf4l4niar371cineytzxea9jkmcit3ziur0dzgpboyvi7vwxpvycwjleog44099zuxskkqw6drd5dt95yhj5zcy91rq74qii1gc30ga1logoi8oalltq338oqc7zinzqjkfz82ngbrpo9b991dir07bfte8y89kpnkmhpowhpgeu3k60072r2eeha0kswmkzw9h7l6qbqvs0dxl40tpqk6rn89z5dktci92dkatggkeoyydlx2akwwfwv9aj7y7lrkghdmys7klvaodt3ps7hy0dwqlx9jh8hch4tucdn9mxcpj1j85czcvjccx4xj1vs4y666p2kkssnw0vamloymgev1rmg2uwog02d1eawuf2n18bt3sfazvknie6i93acf5j325tx9n3y7hmnhlyou2zbqyulc5zgc3x4wksukaa3qstdemeqr2qhy261ymlpyb7sbxe19vvx2cvapm4en1teq7j6ykvnp9kbtt50a8kbltsymt0h1ggg26f302iyy7fifpfq5pf8g86dsilwnlelhd9suztnzzknqn5sumpo0r6as2bezc7fav97kwntbmtbcumvqktca9w5jlbu9cssn4bxmehdc3g9osjdnvfvdbyfhclwd6qa9den442byzr1apnum3wdtnuiedj2szuid5yk1s2zjp3n300px46y9aatyjekwwhp0hvbpeyzuiqj8buzlkoq4k1c9yxwrxq0utfs4q2icgdq0s9e2d50ox2mp4usjr1uhkq0osbay4yyzoyf79ki9045py6ly1hws9n98u8ircoyxnwqznia9de0qcpy4kro99k1bcdazz5wf095cz1qfu0qkjes5effj3dayxa4zq1e6j35i6r8h4n8h3ucv5d',
                fileSchema: 'wrfwxkqr3g5xrwdj8w2cg756ap6frwtbkcw80ntoh5gxx3p8irnkhr60ee7kypvlf9xx3kuua0pl2uvbpjx8gtpk0b0daffe0p6v7mnqztohy595ppbcoyiicmpzie1mwlrls01grgzdx0xpbaxttuojjdq1fo66gbv4lsgiydz7l42c2q4c5dzn0a81uvnar7wz29qd3zle3uwx1akemj9luuamnf15ljs5igk1fxkuu74lxhwxlzhpa4iuybn43dd79nhk07nms53kd55nahrz5ffi9px5r7zsc7a9z2837onoznbxoowmq7y4ey71w123dgpp9qk1lgde0moymlih65upb9efuh2qhgxr71ubyi4w7reu75mtrfyhafoc83lgvgdrqsofxs9gq0oe280le6ged2vg1pn8p7zujvgncdo42owuzyqp30xudf4j3ov0gcycl2ago6v3kvzeo4magrq4cr7wcmrvyto8oh79odkg4vxh3u02r7annwkcs3husf6llnohebycbwvs56syola8tfmfdhe3voc4wsia3hro8u9078qodxy9831ldqpha295cni406txg3gg65h4xgt5do71ogm5bdw18y29p46aga2hizl5q4t7wgwifrcg7domuum1xr1r8zqk4mn35fj4zpoomnw0cr2ejyggn1u69oxwknypcg4z8bkv4z9m4gm3j6y7rmduht4vhgajo5fd8ss0kcpgyxchyhlja6t5kic6sk4hirw0ie2bv0to2wb9ehjjcuww4whloayepc6584z6exg96tw8i3fvii9xfed99c4hyoc19v5aygg1mciy5wnwj8ga0arwdtt6ndaoie120fjv9q557n142ucd8mc9bjm9key2y6g7v6e2zue2yunptm6tffd1doxkpfeqzgf9g6lixqfon4svbb7sm30njba8mb877xt1w4teejvzsrfm8oa22mhb4rlg5sjkhgffffk8ssv6zejmflu66skr8onu215k3cj6',
                proxyHost: 'dbyxbjotzgdslsjfltjamb2g970dewijqfkw4svbv905d2dlo8qyvr8o9207',
                proxyPort: 4782866038,
                destination: 'kfhnwfhf90c409938w5qcax65tts47ezr9oxgji010g6nmlkqd3zj758vd6w72hi5ksjklokguqgysa1we6mw25vceuugjvqow5r0aol64cvq00gjfu06m0b20vhwrk8kbwxemjrct8b1ss3uwjkw9zorwg9s4bm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qhdnue413nu7em1svvrtqw2rzrlyfimljydzopx5sf2e9qnbvupk9cdeecfo0ibq36vsgui12p7zea9vj5w4k4zvc3mkcltkfcx5bctjhdww1akr50kq61it7adh4j218oqef59enksop8wa88l85pa2nzfgs61o',
                responsibleUserAccountName: 'b778bn6m1349rxc0pc35',
                lastChangeUserAccount: 'di42fuefrmlo0a92kioc',
                lastChangedAt: '2020-07-16 17:10:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'rgq1k3zlr96csh5fb51g51za6exjm94m4nyqxxas3oa3geebp6az5zgw67p67s754uhn8e6ejjq5koq3aded0b1zgvdojqhdcj8hb8caaeagm8wq5q47ctpcpz0f34hajsetuuwluertlyplg41ekb1hojhlrf4w',
                component: 'pu3wnyf2tvt6o9kfbesuz8dw9xw3n58z1mxislla9brqia9j8yif81i39786b3ejtycnpf7oaoy038yz9m94iffxh2mz53v6y8g6ajkpjiy5rn1eksgvcwrse45h7k1sa38dwz06m0gsqqw6awd0pn1ew9zetplt',
                name: 'z3s4ttxatamrgtp9kigo1kwanc9pr0pd2gmr0h1s0vkx56khcjsbgebe2r1aq20jsqbrnqcrwb6mv2zc1dfce2m0wokqqnl5aafjr3njlm2rsleqz92yuav3uzmhodn2y6z8kmxwcm09p8rfmcwp5plmhi0bnlr9',
                flowParty: 'cake1yr3pg74gvixcteaddauiumiw9l36mc91429ulqpzzt36sujzc88h1onj1606y2v8lmjgk8nfd4ala69fuvn608tkfk5fp6sr7hs9umqq4kg671tjkp8w1119ldxll4j8mgwll2ga0m9upb6du3hd6arypte',
                flowComponent: 'bn2swzw1c1k49w5mzrt4h4ii12o4qi2lkk0pe5y3kuf8j3ogrnouqfrgu1gstnvzwarbschs25gp629f52co0odz36uf2pjwq5c1cjn2hm9yaeto3le89pzsn38tw9zbnry3soh8eavlwhgfvnn7pz2u83ctc9a2',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'utd9y3akm965kyb2hniuj25sfvbltzouhwpo5ar6ml1dsuxdf7h31y2vts7e5bcofkdbym43r9bg8q0t6jdm1511kj7fkrj77np1kkb1c4njw5y6bjvenss89t2o5ol6bxp37926ch1z9cqjo1mcaegbb1mpwx14',
                adapterType: 'jse8p7zkytiju7bhy5iiyc5e4n1yarmi6dj2977yb3q42ru2fuu1lll7xvbm',
                direction: 'RECEIVER',
                transportProtocol: 'xprfm8uzq0w42byr56ku7slc7ab6y2up8f6s36ba41exomtjf4ptwz9q5pf4',
                messageProtocol: '3c4g3f1bjzb9guw0h7wdxce512wjwwu6ab5kfx76pumceskx6j5zlj2gh2c0',
                adapterEngineName: 'l8kit8ggpypoeewce9smh2njq606eq1grojvi2xp2cuur7qkkrwe2jfcm59g8ybr6chqpwbfk2a5eqiz2x99ld9nkvec6imajoau6kf97hi7rnq83km8o73tm5faqji6o5uwa0ufkqojv16yxs1arhsgra7dl4pc',
                url: 'xxpaazb3eej54axm6lrnh1q31o5ni0snpytpagrwa28k1ipzkeyvpqel7b4g9p4wt9137djyaqd038lyfozxc3j0yzwxe7zs3gwn32jccbcgfcrm906mrv5fwkgvsr0exiaiea4iu7e27bl4hhq61ct9zfv2mpomrfn03ml3cj52fyzr84h22hrff8jo2iz0zezu5vmthwl6zhsskpng48motd9w2abgt78qhx1g2djc0mn3rafj0qbn8lwe36vuybsi9rw6hbbrqdhtwuhns32uthg08q49ad7yhk0zhx263ujfq9ybe7yvq9wdkqg9',
                username: 's2vckntvf1s0eiiiw00o6u1ly0gdw59ut035dhoy7yoklcy9ly03xeffs2w0',
                remoteHost: '138doafb9dcuiv8m3cp7epz3vzuusmragth1ysnfi9ntii54obya4fjivicdq6og9hc92j4d0jz7v26p8rdw2vg2wzfyvtoqvk08c0mm00q4wa3tgp4ajtsylplzqirspqxgjcvb0m97bn2wrq7131ru1l17pyux',
                remotePort: 8935819725,
                directory: 'rrty0vqdwh0kvfo3w7vr413kp25ppfytbltud3qqzok3njgzzsymhdown1cuv2pzrotebc3zfzqpzct9yxubryburp84v2fe2llbg4qatty8gejrm0teshmids2p55himzdesgmai5g898yg695spsb781e7bj4krn6ktusk5m78t5krxdwexmbfzsesn7st3crdgp6t3xm72qd1bsbu9jems7jtrp6tkeynq42knkzr1abcq0kq98qm139o9lr81eebdfwtcwh91b1liwkmu43ut92jggl5izaw1jj8c9saxbne75ii1u21fwos8rb2vezky6h8p0m7ybqwunfclxxr8ypn3lh3wpw87zad0et01jtkyach66jlmpwh4r0jsmtmm7509ei07r755jlfpj0cfejmpe9y4ctw5uc8rkk1zca01sszq2mw8rdppxzyshv7ne43xtcuqvhyodydhwy7h9o5tvyobpkum853gnr5thvdhcji05fx5cc43iyeydu3aebhxc7p6g66pscaz25cqzzigsge1cwctzwkl7ifrtxzmaws28da2ey8c4h15vb8bh33hzmzjq2na53p4j1hr80emk67snhlze1id6gpkjp1xkeg2critgwpbvsyovgu4q52i7mbuixtfhy5qiddjcf3s5kdjxmxdzo906t7fa5401v4cz1x7o4linqy4moyldh1kgmrpnxqfwmqidbqthmav7cdv8yqwr710m024827xktptih3qmkrk98z8yu955i3rqmkpvac08ab1nfbkneh63vo8nvt6kuvysy1m85lp9u0o03jzgdv9oamousoevnxvus7okxb3ilu1p2u17xdal6i88p0w1cvhm9g93tj0dv7b88ydb4o74yfpi02i8r6nux2u4t62otntnwzwqdzjhhoqnnmacpm6d7zvdivpc7k9anvprarjee20d6qfgz9a562vzigkptrtmp6km2uxprz2l6otjic6lumepyp7w5bv51lq19p86ap',
                fileSchema: 'mr89mxw0q0xbf1cypaduzkjsxpor7u3b8pq30ts5k9389nac3sufgwujmoyvr60wm074a71ajf9ynvjdava6w7mfayjg6awnqjaea5yvgbzvz0smyq8x5zd1xvbb2nnkld8n0pmh4rqdm6zjobhxgiiesxejonwwn673rxp2lbvy3b61natvik82aec5mbff9wrektwbtsdsbu20wabfjwictp192xyd5zvgk63m4fe6qnqxbk6ci7u9jlzu1q8c9m65dsbbj1vjaaopd5poh37u18fawhykuu6fxkye1pg7x3rm95zak473680vv0ibim31g37g05mfob5ihqimqm4x7hpwnf1meo06voyggjvc4ahqdqcos9hqcakf6grus8fqxiba5ytk76iv6288dowww1qtt5nba1o1eo8x2mp5vf38rwsgch54ipnvilltv5isnefwxp1k6ayq4h34omwgbqnc88ect40nohudaop7lj5noxjbuxiy4b9ng5kh1og4pbgg1w3q3ouknohflmfnh3928fuwxuljd43de5ycqfiozgy9uyd7on8xwgfje51e3v5h2kxfuxhexw79gnwgm9z548c2ud3sl40thenvaxexi8ob5ma2gyhgsxyc6yknfh2wzhj28f9uqq93zzj5a8klxi8zdnrnm2t06p53a7euqykjgem9qmh2g3c8wh91j35zj2bbuuqyrhgpgzo7ift8san7mntnimgn0i2cgogk5s16mciyo6rygex4u90a4xpi3ld3qdkmv8m13h9fi38safllhfzj3o1umu7skjwyl1dxpd5au789autgydabfujkvklzem2qx0c8o47pawxdwfsk1iypjl1hld337ksywamrrqtprqb8mu956l3fy4zrumr5ho2t810q8v4jke12xdyoeba68t7cziwgttr1d34bnw1oi1i8sc4os9qr7i2un1ptk42jt16ln27ojb8a43t3y3rma36n1us7u3z1enddxcsarczaru08',
                proxyHost: 'j4mjtonlex7r0lq8k4kh620ftxsku4sub7ynrzs77rhg2iijakaufcdb1fk7',
                proxyPort: 8261835690,
                destination: 'ku00p783y6kqho16mek940baigscjpqld9jis15zafjtdnc3ib8l66tbmcs0ngp6hu279ha0snc5tcdr7xshyutbzpvnti82m6pt71ou4vbbed6s4co08j2lzwkovag1hm2v1zw3jy666py89nbkb2wja4x08jt4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ekdtnu5v9kam1nwmw70wtijsenzeaa1jmn0ig5e8fs9rbff7kq0dk8etf7p24zz0wwd57xgq1cqkt9z854l6n5xz4bcc96kwnsc27gdakvtq85ijzyvjd2aqq93kdcd47xt6z246si5zmu0wpwrvhs54iui3kv7g',
                responsibleUserAccountName: 'ts6myjm7u4z3rjz8jyle',
                lastChangeUserAccount: '62ssitpfh57mc6w1kqtz',
                lastChangedAt: '2020-07-16 21:50:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'nvc4a3eec3hsdhcrp3jcgg2dn914kt00p4h1sviurb7y275b9mru8yl4lqmwqiyb1gbcvrxculj4h4nqli2njgz8m2wxmhl62134fmw9x3nottyz6km0obv62ja7yd3zlb9dcwyu6yzunpup8r0hhodv5x0pi9ic',
                component: 'y8ks5hla7uum4wcy86wjmbed0378q5cxxlfgp4j56er91dk89vnzuxn5r4p3fb2l1o1eebhzvsito5z0py78sp703gc4xkvsisizc3p1i0onejmsdhwi7yu8c78bfsxnsjjrsse8d2ykjqb8ucts0tymitrs0fqj',
                name: '1w7b5th89ao5v7mo6zqsxcmh3x7a9ib6n94uj3otuozlejov7ordy3ax0tlm02j6dnf2nwsottz27659b6l9vgl63z3oa85205gzvwumjinvh26lk0250qzyo3r92tusyd9c3ojbynyzra2urcd62afqe329ww9c',
                flowParty: 'aoqwdrqwsmmsolz2bnaet46dckcol5fiqu9ysvf5iw2xc31njxqta2i56a483psaczptpbuwt7f6opq0rgkt7c2u06ds7mzxrg9mz12s20qf162ntnbmp1l6umx5dgb3zayo37bkvotdlgxu84f2mazkceacl95i',
                flowComponent: '1lkd1w6sp5w7su9jno7ckc84zykwmw14c107scccmcd02fjy5jlh0wei3vh0bqbeprxl754hk32xe3523hqikiq1bsz0hq7f7c1wquqddaivv0pv8eqfpe2s88h6i9vq6rukx2oticukdd7eqi0pn01xbkxpa6bh',
                
                flowInterfaceNamespace: 'ir7t5iemztbmdy2hfhax04yvfmrg1wx2z1slii0ronto3cl8420vkh29fxemfh9hbmqcwa2es5uepe9nwnawnfkjxs0tfhlu6w0pqiu6vtzubkkhigrse9sx1ls09r6uaoj7ntbc6j256wa3f1k5bmun5edwi1wd',
                adapterType: '62pozzalfeoeuq6gta9ed1qa8iw1veaid3anyzp60adyrnc17jwxapr7l2xf',
                direction: 'SENDER',
                transportProtocol: 'nwryigzno5700e03mtd9al6yjp53v6s29blvp2v4eciz9o2jny5o0t5vcxzu',
                messageProtocol: 'o86ta12l4u8fffmo92yt0v651sxvkni6pr1uegn1itfqk39mone4oj7otulo',
                adapterEngineName: 'av9gid7kdnexa4z1uzoqa3iyzdamia4vxrv5lld0bg3m4zj5ctqoi5ftehvfi3inmxe4keankma0nes4dmg51w0jbv8l0jb3qoyx1w57ly3js024de9r31upi4npyuploqjanxdvafe9b92k8mu8rv43fmz7jj73',
                url: 'vur1ib5p3ykffoyupbqrupcjkhbck9v1q7xi6vrdlip02ic8wm97hlc1s1vkkhk8lefc1qsy3861fjwforwt5bicd586i4yc78qhygrrgkaqd09e8kwm88zab3kkfuctv4zk0cmuc530599w8td8c9fznvpf04q16zjmcuq8gml4qoxuwp612ibb6krqiem9feuw3qsb896v905v3pmxcqb9dxt8zu8m6hfbq6o2aijia8kpc766qcfvuqkio15ukz05urkirfi4szrh96e974i06wcak2b4ja81xdmbo6glmfrhd62ayxefwc3tz8xn',
                username: 'l2j157iwi88d49gogygg2aju8a9aahvfkwrg95e6ywlnpgkxh0b46qkg3opt',
                remoteHost: 'lbyrrdvzxw1hau5b6c7vg0fd2xb586ziy54p226jfyxfoa9tnvf66lywhnf51wqy57rd1htrga35arc7krkuchk7naer8yxwnamzpjiblmywv2hsmsad1oghffqmtw26lz2eed3fouyb28n3ubjsg3mnqkq8v09v',
                remotePort: 3494954879,
                directory: 'pfk4pysulrn1b3x69k9w6r0k65atwu6ejcnoknszxqralwqkg2tzqmc0zsbtv5mkgyph3aoknkup93009rz6o4kz8vmfqz6fii2ao8ckigsfn3a6ya5nuvt8ggl58zcsd7rbqosdb3cr6izjighmm15apsrj8nf1qoo9viqqsc9r994rj36aon20vwtlz5rwbg63f7cb37089sysi63ix94vrnsaskhi26lnpxcqxz6u93sup6ax1fcp8f98oq44lchk107nact8sswlkefuoewe3kvak67mxgk38ac5lbbtkazpj2d12pnatornd3ynxcrd3iroe4gxnjv0crenrrmogaymmifn6p3sdcyo2igtaoq4nho6fgfn6vcmle0swui4glo32x0stqemkrcmnik769mrkrlhe2w7l2jz1j2e4dhn233kdmbmcnvi5qxbgtfbgegt67n7qgz2k88ji1392d331ntnwgpq3d8tlybd2my9s0o8t5r533coc7p09ga2mqrpxsiy09q3ai1edy0rcluu7zyfnnsw23irz4685xdzzb1nslc583aa4j3wbiznlmd9bw9orfwcw8a7luo3cgqbta5ld8adg8c1qfp5xf99iy136tq04t541tdpdhsabueyrcott4abvdd814an38bi09w0s7sr23ctizrbwipk8ci6criopbjyo6aujnn6xyyc3iekcs3w266dzm4c9kf2nuxvepg5t3nc27lmfr0pw3r5p80xrrju7b0h8vyzecy5bmkmqc9ynmva1uc49z6kg9afouzn68jbmo17qs1a3mnul35r83r5dnyjd78dckfor99lwlaxshkid1w3nfkkqt24931tjq9ee08wjpsn95x5788oz2ydsw7vrxwjea6rgn1i136pdmsqm6lroer51gcp4xzxdjbamy2ia80e7cjpwxf5q1qdy48qg9t9gf8lq7a5c29bic7ozyvhgw6e7wpqxofv47ti4o5b37qitifm1dtydojvc3c3',
                fileSchema: '6i591j63nwh3njnq4o6ocs6btj2shyvb5wep0dvlrjaplb7ebrhbgheyiss0e7z1cz2jzqanhv6hkoqk7dsul8wm6wh3rjk39sn7zx2dgbdaa9adldqk48oghhe5i5ml5avx0lpg4a6jqrp1ojvvyljiui7vbsqu7vn9gaje3k9z03vxwkza7xy2e765v3akmv551u30oi0afd0rnjh0z93gr417yfh06c4pp8uhlhze4ivk6vuvzbnmwdy2g8v6o9ujctrdtyoyi6v3iv1g9efjwr6o4oq13rvhjjgzgjy0q6icnsyxfipudhiqsa7hyibwcismttd93wao5e9mufikp77h9vq3tj6con509p7ncog3qhhgwpne7j90kxfgm7ezupvtx7so53527ktfdcforcqpgcgwtvdgs9nj7r2xwn9ovvj3vlnk9jzll950x6bi0pc6d6v9sr813kxemn1kucmlwo5h1td5lesqkdyh9k2ikxm698264dokatuzebj6nvhlcv0xr5w4opp2utqzsssptvgmxewn5igjoiqzndgopj334g1pysbi4tzbheyh4yqbaxzyu7myhmsvsnleobejr1hc2ux5xzcvaa8ep1kdetfnhpdq9w6n7ln5dnbn0tistz4u9rd2g0k0wemj3cyq37anaupbins6wt3f0fhuynozntoslte9f57yc2lgiwdnuk082m4cc1xizs9q9w7d5j8v1syr2yvvga7dzbxicegozehell08z1kqig44nayorkl74se400l14wkn69t5wncglf2iaaz230p3dzfh06ylg0tkw1efhrsyyx0nt7o7ufoyav10mee7cr9bwgqun43a05n1bywz5y403nuy3l2l7sq6m0jqrrphy79jnbxw6xdpmrgsv59a7ixl9bbl2a10sex68u0wc673u7mqx6flb0bhk8t50mf7sg0yhowggyyjm17fps3h9vjwszle5moch6wmp80ep41655trpmpmicro2ztod3ag',
                proxyHost: 'uf1eq3tpd35c0cwp5ha3vqi3rp3ukqeaxbtyn2re8o40heoh7qqpfgum6hm0',
                proxyPort: 8010214925,
                destination: '3s8apugd1x4syotinzxqw6j0p8pqvcnb15m7b3usue6qdlvuqnn8cmztflqqm5xa2tbjlq37qgokygkjbgjoyi27c1dg73zti2c1k1lv9z3j2tkv42xwqjjo21432643t3xuxf64yrtngql3j1rsp7vkc3m1fwme',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gwfqbllks4xcsleeeo27oo4ogwybe8d2ol5zg8ool3t5vtkt00g1df6y2x8vhryd0bboabjotzl1tsphtwroysw350azvf1qaxzy9jnbr2q9u3m2pvq8e9q3hmvl8ruw9y15j8g4t4habk6ykx9wx1rtath13nli',
                responsibleUserAccountName: 'hm6zis0eeaj91pnztzpl',
                lastChangeUserAccount: 'm3lxsncqu46eyy6prul2',
                lastChangedAt: '2020-07-17 13:22:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 's9bmbv6rfk5no1aevwspextwqd1931kdno8zq00u74b9ujf87ugulhlkhzdyf9nt9tzyqx9r4imu90mlny0gkwz67rhlwkmn6hul1qm6tzgzo7lhuixu59040nyr7ecmqrtuspbjmlrmdlp5zq31e5jzrx4v0idg',
                component: 'd5a8yvs9mjj2ytcbia6kpvek8uds0pkw4ssqfabx7gaopc88t6llhl0c0nitani93kc819ndvkrofs0vjlk6u2ftzf79rhp2dqh3pd7zkrce1rjzyvy0ei3bjcu9xdegfgu4hhk7kjpbhit35l53vmd6wg60x8fc',
                name: '99wd4ooatq2gzb7tujtqgvyp3fjljjcaxn2z7c8l3dxd7l39glxx8ywkgm1ihe5jebpnio6zkuwbs2uxgf9lt7m39bfyz3dz08w8pwqj0rooimieqn0m9zx5025db45s88yilathv6mxbtc8xybprwpcf24uizz9',
                flowParty: 'rb2ub7u2k2kqegizuxl82qy5plti37z1urz4v6pfkvaujjo739qipt2ve5b63fh24b3g224uy8chvk40in3lek056eoj9cwkh9vi7v6ydmi03o000j9v9hrcwqs6oq5e2hbpq4vwy9fzpea6rg8bebl4fv0vm4pe',
                flowComponent: 'zsfgnehk52fjed9jxmj9dz4la2384ai56jdu921cjq051qvzlt85wm7vq53zao22hncirm6c8wohmgmeequtjn5d7m8nvkzabuhnu7jxgb9spp8id20b3blv68ma0s1okf0lbb1fc7l2quwb0kn7e7rt8ns8433i',
                flowInterfaceName: 'z6cksr0hcj5ohb6bmveilnap4xycw0po01vkxf7slcv6n3kolv2jmg7gz7uchv20yszviahop8tt7egnxyqahr7m7xfwebottcbya8o7o2a2act881heuhw3nhqcuj7p8z5tfcqijd652zcgfoq5ktx1l5qz9a8m',
                flowInterfaceNamespace: null,
                adapterType: 'q0mqxggrnn8ai1w03xgf08qvnkvwspv3rc3t9xdnydrdsbjlzpluwpa04klj',
                direction: 'RECEIVER',
                transportProtocol: 'phejh5z2o1u0llfdfc0p2k0994fy6vh442jj74jfhvmmfrbrfv3jitczfodx',
                messageProtocol: 'ub05h7t0u1qs2zq86ml3eyp7tfm7zu15k41cpitq48iuflbq703pvjxid681',
                adapterEngineName: 'u0hq80f9bbai86igihbcvdc1p40lq0divacim0zesa3x8s932fjf7ztf9nnmsqy54r07pchss6tb0jbhwzy1j586latf9dmfl11o2zbl96jrupnuisqwxc4dw7eudrfrzhebr4nms2ttsopz1a187w9vzyonkcwt',
                url: 'dyyfs91a8kyasubjekeevzvpverhzx4ed3wnjj5rr9pfcgtzvj3sgi3m4bf6uohfa1wykb2g57uxpbbu0ntliqkds47z0t0wp6wtzz454e2fkhjhc68ikhtqumli6lwqc9zqvohahxlhf0q0t2bzlq3us25he9n6roysvdlb39se45ftdk1rsdpsoh44zi9swwg66e9t3hzme5e9i0xgki5t7fp5jdadvztzd2rz9djmms8vd9f6hpj4ghex49apclwc2py1due9n6d5wvud3a1vtilw5nql33codjpbop6iy05g9y4xht14752nhmja',
                username: 'wvzc0ahlbga3o2iuhntvs91oet727r14buj2yajrd0uamulqvgbuux5wnx4p',
                remoteHost: 'dg13unxmrm2f1j22oke75k3g83z00yln84qlzzbudboikzd4s1x8r1at4rc0h4e8nwdkjmte303c2so5v61j1r09gpuey33wjftgenbec7f61gvm3g4wk69cqqhynl6znsnum2ykue8vsljhhns6nchzseh02qfn',
                remotePort: 7084146293,
                directory: 'fe4j06bq0othzvdjll0h6jro3toxx4ttri533k95ut0tt7ecnw37vvnbofulwm0uz6lb90lmz41u5qn2h5iqf0ldsmvcxuol6edzdaqpeqsscz2qg63d1vvn05ovt57bc6ruikz3yl8dr2xlujkbbqts3hqxtnc4e0n9xl81adqbxrsy8pgdnxmnmdvpvqdvtvkf5c43wo10505j90ry6a845y95i17tmnc7dnrgtjrr8ha1u9xogyv5qgdo6sful9owp1fawclyetk0vt14iy4vuwrxk6vwmig87ar2rpol8lzv09mnomlqs3me9smb51ap9ynmdw6y4kaqmpwb5z1y0qwv97k16pci5dpj8vi4o5rzl9rhgyfvu3hsgzvwg8mwk72meo1nwac5qsg6i3sl5y6rdprnt03lhzqhlvcb60uujovttfy60tgqd4qc8s97m61lau6bfj3zas4cazftmzdqelbmyys0bztiz5zldyy9ox7w3x8d7a9nh3uhvpyb0q0cpetmd4r3hsdehoreljixcu6e6hjibm1vji34jsbttq5di7cbripcfyy94bfex5e2wnu0j4nl3cnzlh1kth9uvektcki3bsk2wfohx9dum1dvfsvifr8ebbn13gkgoa9eij7czqubht1lbpeusr73fa3frw0nfixjyn19kt174ww3s3l2cwip212umhl9x73u3fjqme34rbm8eqkdbxzapdhssdzq95x47wnjqiromcciwruxreb0zbobjrdmarrqrez5wfiajrdq2giy9gkd0j5siph1ykl4rntnsa1hi88ycw2rjtjog5lc9hwk2xnexzytax1l6rz7jgow5fdkm8gdi4iffhrugd52xohbnxstrue215dr6luzoo0mjgt3cqkwb94brv7gnm8u9soamm5dk04i5023ygm84kqhe91i0lrmn1iyeb0jqlx5r7fgm8x97zjz3pz32da2ggzrsasqfqoli9wk81g755zst7euvutcu936zed2',
                fileSchema: 'hvmxgizikg91gr8w2mmd0nzt616b6ewfk1e36d35cnkg7vqae7x6z526ijhf44frufjjwuurk2i4vz0zso9ah9jmpsm1c4w3d6r27jbuq2yoj5cvsqyx3l8h3a58conhqeeo8xeq55vm585yzyhy5c14t41w15noa6segu6eluc5kn7ecjcg02roc4o7yls25doc8q6xyfsti94i0jswy1wdn9fwu3smt78rpt20kc08kww3ggctau224v5rjgnn8o5nmp2qyqvnkpat59nqcqio1htqqpgl0oe7jx5vakpomplv5frgi6fdzd1l871e444xlw7g6bbrw42hv9zgfxzyn53e4ddj3q8p5ce99lcwh9s8zmpo8qaomf4z7e5w9uaqojzgjt3rxfu6r62d0v82hzf25f15rzk0d5aw941x9y4ite6cgttepi7r9813nxrznm6m99chry2ibg05lhzp7yd9i38aa9oejpty0iz8netre7n7l69kiccmlvctizzsogvfadglfjvyq5np52jlsdf1dess95y5jpd7mso0csq6h4apkqvivuypv6usgpkihv5ue671e50ljaciv9hbi8xio3jg3ta59mi0m4t3cob4kxjs3y3pb8fvostwxivx432doysc8lr9bw4v6ymkdhdzl8qi02bt9hruivmsxewfjkkar8g7r4be7k7y98lxu7su11123g5ejinygajqair0ryurbzpy38mc5lzir4ut69ecixoizfhaj6b959ws74kmw3i5hw8rfwhfz4gt2cn9ndemzqemogaxbg564vtsvbqxrju62n4e61emm5mu99bvivzsyoyvr0wsfxeno8nvz6zftuwg70zws87npko7xtvwgqj6db6y59bq1f24vtlx1q9i0z79unbn6o2ge5e7xdj3hk57ja42g6mn7yiifn0199vu0kk1t4u0lc5edkduncsq7zmkpsu2e513t8e67fgiaz4tpn8jhbkcn42hs0z6yl14hla2amvs',
                proxyHost: 'd53r64opgz1lbjix0ivd24fuapzhyoubj9yeteglmexw5r44mk6s5xe7b4uv',
                proxyPort: 9542224487,
                destination: 'crbhxzb8ctxyuid5hgkfsw5wcx0krogso5yrbywnui42kw7u76dhnnbz59f7x9qaqf22rv86hlcb9lufn4rn7btpi67a4h7aewgz9d3ralzxk8u0p15130gsd5pqytqjtkkqousf4sai030df0rbrr6sotsq5vs7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '27n3gr17rq2hiwkn6lzp7ii3wgmlpnoun1gz3eoerjcw1ibvjxbc32qwkvjhclz7km34nbkanayjh1x4z1ntcfpwe6ndb0awc8j2fgtf18qask2vciubbvyujh5ivk478uwz6ddfmuk4b91b485fe3cmz4wagf88',
                responsibleUserAccountName: 'dwc420lmbd5xbmjvan32',
                lastChangeUserAccount: '5vdqxb3y1awb6l6dy1sz',
                lastChangedAt: '2020-07-16 19:06:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'n412b6acsgghebupn3ljhsn3zsm0qsxj1m8wupw0b0taqtd8aerpwprd9j08ocmcda900vhmg3m416rgrv0sefohzym5c08thr1ckg6oy43cst9qgzdxxr9jg791728a5puagm3f23rww48f5j1vw5ao4p4ornl1',
                component: 'abufpo4dv07v1vnq91tkhbbo1kt2mt58gb59j3vp2v7mryigppib5bk1ccyyodupinq717pcszw1epm6watzn3veepmzzkop91intqhd5xvackdzjhcaxazd2xz6se7kqg6ei1i6j6qnbvf4zhko0w3xtts99dub',
                name: 'tys7z66yrsmc16qbtfgdl82aqyr7u9h5il0ne835aqwcn3d16tks8y1909hbnqm38gtawcn96qunyd6crocr7mgnssde3mqaw250kb44yd9xm7d97ng3ucitlaug7miax2yb6t8qk9gqk2c3ap57vnm6skbpm1kb',
                flowParty: 'j0x85yxjbhuinxc3psl4m7ittm6gsul5926dfrxa9zwh21o2dps1kvrjkbcm909edkf2asb2s67j26zhfeupni0kgvru864m23iccqyvfnax9ivpgjgls75ki01fwm1hi6aam1qlq2syr45izz3yxkl7dwku973m',
                flowComponent: '15oxooeeeol74bfhx0dmqopjkhszhi7lh6kvwighbql1mcxc8zgjhaw2hngy44ctifq7gd3vefgt2v6gx8it5cmh1uqauiu77p4ldowc8nghozkw52v447n0ba98n4yn85ut8ab4l9xldk732xbecypfk4ehw2lm',
                flowInterfaceName: 'ibjtxkgn691o22xs6jl0zm0we6q829mhylnp0mkado97qi3vdcszy9r0t05j99xmdp0uxij46348uaf69cwukjuj7py1jbct58js1wzooyoli225t4e3agbd12x9d2rdj22veu0y03q4y6n73ym8dbc1gkaz0l8t',
                
                adapterType: '0v9jbbdjxswpqzfq8bftf6rfec4jwhkff1x72abvcvwpd8scuenbsd1skbds',
                direction: 'RECEIVER',
                transportProtocol: '66h85xtubcj8yy6xbqqtkfi9r6userponmakaxplyauyt034k29v9fjulvm1',
                messageProtocol: 'qilnl26r64oumsfwbbxq7alusinmcmor8sih2waf86y61tclxcv1i2qzcven',
                adapterEngineName: 'itg4l9wmjzq73lj1deary56a2slxuim3utbklw9ppyciwhfj3j89rvykjbj44lrtgsfpui0t8cu9c5rsjl2uzqoqmb29fiosra21hmuhng13aeottdz07i84cc0n9qikm2jezl1y71b54dcr7cohieutjq9k5k1t',
                url: 'pts73t6kwuqk60fnjd4giiyhjove33csyya89644pw341rckp704b4yd3s9ijedfu1uqchtl3tccw2hh4bm8jsdehr1fznvspgckvjf6rb15vz6gcj3o7hwupycome3jk90jau41n47everh46mpssalppywx2wgffv3ac0ur2u4ap15trw5yld73c7g0uue08eq86btcmsyswqva63b5co59t58qxazfcueu4pme1wdhficv67wk54f5d5p0o9apxzhg9992ft3k3lr63zsolkz57ndi3vobjkb8duqv0qbxg7ugon3gddv2isgx80e',
                username: 'q4otb285rwim7dwlt0olyou6m4rbd55c0oul23f46qluyacovquzv4683doc',
                remoteHost: 'gdrj1vtxtscipcq9phv7l48ia0zm6q93vjr52022qh7gv77531ym6r1kgjocoq57k9ysw1bfwd1gu7ye3yr9bx67ncxwztmllogxsw92ege3o582kd0eln15s6yliy8fskgcp7oc47jvz2cj1pggu1f9fr7er8qi',
                remotePort: 2993288701,
                directory: 'arlmoco02480aovkces5uer2vskokmbgil6xvbdqkt4b9051ceehuze9dt0091clarj6lfs9bwgen529wuc5bahavo88ncup2w4so8jmfnnkl3fuhxa6khygbuqgml8otosfmmwhfehjen3olgngg25wr5pglkkg3q14j7utg1gce5n48hgutgnfooly6vkizwfbpxw437g4l0d4rcvm9qq5vnti1uk5opdgwbroew76vfs6esqpols9wboca924svbh0zmr2v2ntclpnkaw00eq4m11qpjsp93zuw3kuxloav4ego3aqw5afq5faler7v5nl5p2jcijt9kgikvf9436cuj3ago015cscdo2yt9frr3atyry44022q884u86j7pgek53l83qiqzwygsiqwf3y6490c19bfby5ag92md1nzx9bfbvntjbq9qh8g3sfu8po3jtc0187zq5l3dt3od74e250ljhek28huwtrouw96nsdim7ryhm40532w0rghdcl2uduaeo0qoxsvcf9ldm2hl3ihbip24vtf22hedaa2nuiq6bnag918tmy9odpsnp72armjciui3ujhlrz7l7vabv0frho0i6gsr8ze5pkfweo4e54x5ffneaf8keysnc32t4pm13yfm45hdqtzwwf68rwr3nnbmbi9azxxhzypxoebvfwjkkpi5ge21d9dgjnwtk5eaf9ht8am9hk7ziwk7r1dnbsbrcoac5nzia0tldk3go3q698kytpunc2yf6t5ujd66hknntl7bvim3q9nr8u60yehdm4gy2ewond2g623lrvzk5p90pzwxo02nc6dxhq1l8isja27jtfb2fzma0njhdov8o399199owtuxrt1bldxuqvz2suixtkngpontwqjcczr18bc6pddkchm7ysn233cvw8q99oa7pgr5zxk9o9kmftj19750jyf1iqf6jbjxymnb39wksxmbe7gmwevaui9nc14c7opbtyjtrkt6nk8cxu3s9md3u',
                fileSchema: 'b6wqoei1r7in2lln0ro7ijxznbkm3g1e98m1oeaktky9wi5defw3zk8d8sl6mongd6b6umqswr7exiezsrboz9m767p2qb90xs92l45dljf6lerrfknwe9t8xp5o34w9emxesuz9i3bbzg7z11lsng209dvou1wbam6hv0z5nf3fe580gusu5ln9on3uypdw1hyt9f5h3ce8k891a7ejje7nyyg5eq5m8a5q1zaahhzo2oe90xib6sf5tl69c87w776rocls44gl7078z3n2z1ulvhx7juin40vjxbqy5g4soup8p9abrmgqwo0rt6d2ulywf3kj3gyelobmafmlhkbjcb0pd7yk887s2jfsmt7p4695wdwm97hjpaj17dz93rckr6yknxej81swycq3w187rk204oy1uvjalcbpcepysnl22cgojqj1qksgorxebyyhuuiah3zpykkztar48vo4yzwahhkbc9tzxt8gze9odlmz99gh20clvvj0cl1ku7u9ems2w6veh2rcdbwevhs5o8s4ngl4le5dk9h3tljz8fv3l5fyhosianby355coplomcv8umwvfdqp2qofez5wp5buq78zez2fm44fobk0mfbwbtq5a5mouogre70dx80snmvhaw8xv2cq21gey9esf7ohazvh0j4mo6hvyeylxmzwhjuevw4mfbb5hmmn6zrmocqt991r8530y72e7xe01hzwsnfev5mb0afv0k41fnq64wytq35byzcxpooy3e7curs0575u66bfvbfk635j7boeulrp8ay9be4ye20qoxx084aa5idx2adogbl4lrk2vp0mme6i3b0gd7tjm2pzyysync8czkcw3z1h93rnko6oz9xmpa5fesqbu259i8dzgmq83bcli93q6ghi9041hieoihmfi941bgxbmgj5glfxjobq98ccfiub6c3i4pa60h3lc72aju00432fbqu8gp1peumyledwj10gjgd9cbju8aykxi6ojakh7fpy',
                proxyHost: 'n2jdx9igjy253xumat4h3ed0so8ybxrvolk11af1114c0dmv2ea62iqyvdt6',
                proxyPort: 4233199283,
                destination: 'gniq1lbi6mgfhfi01szgjwd3bt9gd0zzns0n7cfyviztovu6gksag84nujsps4clfg3pgdm1um11zah0ydauu2i53k476jnvcjjt5cur42qbafc62cz1y70djvb4nn0jso88aas5nvmib3t2uskmgu51iq0oxggi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9idcw1l73p753d9xdkl4mijf1d8ovfff1er0tmmkce3ltfdj8n74olak9cu3ku2lc7fh6p6bsestspyh6v0hy3rytzefv7jcg31wrdn9mlknkqgqr137np7byrkuwy3eqm2nx77v0zw97dz085std9vxeltx845',
                responsibleUserAccountName: 'wav588a24u6hkpll9wnj',
                lastChangeUserAccount: 'qfbj8zxcgviewtuila64',
                lastChangedAt: '2020-07-17 10:01:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '606ws2i6ypfhsvcemslng9yuqoc0y5t4ofcbk7lv4aoksn1ysiqxcug1o73el4p2rjoz62a1lbo4ntnjpcabgo2i0v2wvpjzpjmb1hnnn75oenujguroxb1ek1ashw5bt7vp8132239fcczu358ldf7oyfdklj4f',
                component: 'todojijb4vuhz4kg1yrtuehnq8zwfp1q10knlafkbjg1ai5rtsz5ie8pvclc62esxm8rkfll4wntpak301a6rnw8m8g5q0yb4j3ot5we8uhzumiwc4v4twe1twbl0ub9s40c8089sonz84imsig1o0nxmmod9stw',
                name: '9ajbgm3m425xku119o4mvhqkhrmbjefvrle9pethntdqlfzp80mu3rgqalnvcge6j2xjbfkvufyxp4sq7rjty8ymxl67bhlvt6ffrb99xqwggk7dg2iwjy9ecm2phks4p55pckn3n34yelmyba4e0g79w7e5alb9',
                flowParty: 'eohs3n9tldbqpa5t4ffh5q934ao4e0wcan5tyhmabdojduc92w7uggfvshz6que6c2f2lksmxkm02mkm96hz0p4aiuobcpzpt3v53wwv8wezvd6opj22w2mi69kng8c4uk3d1aoh8t9y3w0m9tzvf9eialmgpnpt',
                flowComponent: 't3s514t6cqvdunyzcuo56p3anu41vk9r9bgqort3bcscn81a284p49e0wcrobkuicin2sahown9rwxek6awhgc9ouc4b2op51j791jwirbrfbsl34au4bv7kphngv4lz2u1csnukwriuk1csn0e3zp3w0f1mov22',
                flowInterfaceName: 'mg119gxn7fxfbay6xh80zp32wl2n3mipxyikygapay0uwp1izzy2qf8xl3v69zn6qx7zauww2akzz0h6yf7jk8mx3qmcanvua47032q3sdzfif6y0014akyv5hg5tw90clem5ni36v8w5vheuc2v982o01a72u8j',
                flowInterfaceNamespace: '6icjlgog077xgc6t0wv02bw7z914lir15zecrtzyylxi4umrk2x9650tkywy0b4ez95onlehkgkc5bklttu7o8tipszdi9y2st2566vqg2thxduyuihy7zjs7xbbukevq4ltooshaxrijmgr3j59s1qwwb25meho',
                adapterType: '3iblpp1x9rtzvj6z0bu6q015tf10qlurj5cq2ojs323wf6bs5qkubgvc8qya',
                direction: null,
                transportProtocol: '0zr6nffjvl9gfcggd8ajyai7gp2qhvv2po20j9h52w7sik05tbtn9vrkip2h',
                messageProtocol: 'yl0d04x81757ufudpuclvb3mjywqs30cnq04wcrcrvxncjkt21f580h13a69',
                adapterEngineName: 'm5wtkzm9croesyhce9grypjprvq9jbb933dgsrdb3m7xfosikugl5hbbo2xe1us2h02tg5bsbh0mo48yp0pvhfc0gqrpuvec5qsjgb03zvak7ltv1aqpt57zlxq7ys69ufn8t87l33kbwtq3l4ewhx57n3s59bzg',
                url: 'x1x5ulyvzgvm0x6ikbey3aw33z5ikcybn8brj6axu90nkdf4nwt5h1c1x80x24b9s3al66tmoo01xqrhnec32oq6sadjoju15f23xaqgb9weivlp3tkhvt2j3xl5fg2qq4gixfl8ggbqkq4mhpd675lrw4u6686fvkhxmvphezp6ye00z52sia25sivwfbtctjgrxxgwhjlj2n10lcyvh6aamh781hczkk2dz1wna4r4zbyh1vpuopo840i3axscxpyl821uyw57fvx462yi0r1jpiw6aad2330rnsu7skikcydob4b2o77zokohtsap',
                username: 'fiig1gy5tdnot9wyvdzds1im5calr443qn77bc0ss1apgo7i18sahbu8ox5e',
                remoteHost: 'odc6z606c0frwtn8y0xa7wn4ejej55hzt5hc305vy0y942y0mmm3afs8ip0l0zjoe5yorol9b6kysdfrv9wtzawxeamxlcbp3wvvjmmcjavvgk21wwgvi948yyo6ecuvw808q295dgricoayeb4prxl3uj913nnf',
                remotePort: 4103153169,
                directory: 'e0ua80j6gblbqwfdgquzqljpcqv62gtayg1qqvcr305tl7q3t56zps9rlfztrfdokqbogj8veoqio8psa7aky7gdl4iplomz5uzkb60fuhv5iihsaj1lz3i728kwg06ca4jgw1u2oko1su6874tgbrv2j7lqd4j6txjkmzmq9sj3fd1mnuxbv2k4x8imxpbgnro0cjgsec9kt24t82tmfftxfhwxbxgv4d6dkum82rzxukg12czje9ssgats8dt5jr032s58f1tgpx3ol3yl65cs4tah1831brnl2rjcl8kswyzwie68u2ltl3vwsxlajiu7501cb87z3gbt6vhb1gei9i0ykfg2l5m6w3v966fm9vmrij0b0b6h83pzvhwandxnsnfu4dfjztjxt7l88667xq30silqud09yzdg225flo8tyr9rl0q7jb1w04qo33newbgq873wsbecqcn0wljrby8vlhf9rsd3b6qiqguirp8r0wa0ua8975q1zkz5287xj3pl5hxeo0n8jlj97c1dtv5ouzksum88b03zngtdtnsm2ri5e613htv0a447afiirbntfzhph9sy6b0n97iccgl7qiqx45iq6ftbiihheapowtzhw4d2gxcu4xoq3sjf993jh927owt2axwcnwdzul6i1jhervgsz2usqe3s22hvrujldq7agj7cwn6isbolkkmolizxvm9ujddu70505lqg886x55l06abl3o6gdvx3bci4tfessj4mrrayod4qafzdsjq69uzxw48zqa5qcp1b3dnrwung7j0itf94q3e7xtjtdqusxdv9ziiknp5zlehtl2sz1v7qg1e4kb2164x02hy22pts6ogbgabzysl3lb37ksi4vkqdudgxc53hasowvo9ssk29mah7rc8yust3i2miteoyozn066oix73vlecwqke1z77vu9hxd10q18m811juyd0qaz91oamynzojwsny210g1921lt7dq7qpkgzodssd1zawsvx4',
                fileSchema: 'hbfqj9bru04n9siivvqxpr465yr3qeh3f5k4nxks1u0m1ot02wfb0xmxlenexsia1e58p87dc4dl9ypyb6j8i2izo9b1am0ow6vs76gwipc96uw08vsd2qwghnghkh6ye55bwjmta1je7jvlsi7cpdbjurkp56j3pmk2tl36ki0kzkdyqj6ct7luiua8bggslk2kg2lvukx5e10w4i2q6119wnpix6dho2r0b4v6c44bj5z8k0d8e7xret93cxwr646hn0n7xsjheznhu5tsx2fy4mlsnltemjkl3pcubwbb6h1o18uavm6hzfw1p40lvyuzobp12uqn2mb5fpxn650n7saq49c7xx4kw9zjmzqdeomgr55vuvsgf00q4gf7d2jtyd2ip263nwb426inleo4m779ee23p8qb7x5gbxgpzgyfvgvluudiqkrarhuvt2zsjxmoc8f5dz5mlpe6ko1tiycfii7gwbdhsulsbdes343pd3pahhpbku27mn4w7hdktacym27ncfgxqsmryjsxu9pml4xaez86koqyd10vvzmw95sighde6lv5wg8my9ef6eny74nshkq0bqukl1l7rw5hsr2cajj9q8fkw95h3rjcyvzqmzd1zkxaw8sogy45v2wm8hiafoxosa8qzfg8j7h2x5e6h6zdf1w68f5xuccfwpune7p7xghjrs0asdnuhd428iu0gz8d9o85ob2q2mqr306ito8ytvmz7cjf3sxwsipa3hjt7vrcse0vaqtj8mixmb76th6ap80dekxeqb1ky7c03s9i1lllllq8f16kfqsa1ihqhjc90w2qszrqs9aoxljdi04iq3sjiun85o0dfvoiiie9ny2zo9d2kfr9wqzbf6infz0bn0paqzb4q661lod254ee5m7jipurlbd2fh6b8bf0goghpvmns3m4wn8drll9oumnqiejfbcs6wca5md80qva2d7zo4vrgcewafci2oixianqncgs608e40wvjgzatfzf704d',
                proxyHost: 'l1d2cgcoh2m8bc5xu86o3alga97gt9ucbpyoxf1fwii5uxgi9zi3gn36haw0',
                proxyPort: 6615345874,
                destination: 'lwrwsfydm11kj7w8z8ho43mfm7zct71n8he3ydpthp3objeld62sebhz1mjm620jnv9x6tgoli010jwvcowru9dqsntafjx3tbn51dbkh2b4m77godkiqrlet8n9o6kmlga65jcr23rimf9zp9hlg7nsrp2n1xbu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ds2t8vx36qqbji5t9wsx2ca00xhlcogsykfsfwg68c6oc30brfrct2jxn7fmgc2hstz7ji7bdvirv6q60bkzaka1w4u1w64fii0klrit16zlkl4nwyr0n0a3dia7xuc7hzwflto1zyvvf4pk3c3rz8nwe4fhjx9e',
                responsibleUserAccountName: 'dkh7a57ko90kzpp7oy3w',
                lastChangeUserAccount: '458zzmgnze8duejomb43',
                lastChangedAt: '2020-07-17 13:06:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'qjxfvlinj261ptzeyffkj0z8rw0d175qvciaic165gs5qdcpa4ox364zt0wnpt30couoa8qv7p8xo2lvezkg8gus6049bs1xw4aya5yc90z6l238h6t73x0xoun322nxpnaqvv5i9870473d91io3bmijqg4bth4',
                component: '76bp50fc9ns6erqeo4wuhorvdh60s3uvtdwomhagkxixptk9gxg04fdu1iu5a8irelk8healsif2oc8xbhrvtbcjdi681qc0bmq3xdc0xx8cp4hq4a6tnn002xggao78yk9o3uw50ee470lsyj6vkbp7wgougws4',
                name: 'qttumw7ak9h7qocxrrji4w6ok5dqito6u098mrbnud38uubvmfu14xo8g1ukn0kpc9grmm10gawi1ye493u1lc2pfkh85y6t16f5bvzsd15yeklneektu3fe7uabby82163e8hujsci5f2jitfq6drek4vfgtqjs',
                flowParty: '44m6hke3m03zp68rw5u5b45s2whmtds2d606ezgk8j4iizo1svn3rzxfm8xvvvobhbf84nsuf062ihyc6inpklqjzw05qh9ngu3l81pohxmomx54dn5ulhilbttf2sguuujuiuk4m7j9z8bu58ona3w9b68pdukb',
                flowComponent: '2b34qihh1lics9kyzg538vbawxpt34pizce4j1zung28teovi001tez5hk8nuzyjimmno8mlccdoxj9hblkd7n3j02yzmjvp4lollw4d6akjq4ssz4yyu68yfxap6lfcq3pmf8baf31af9ssi8rpfz4hdddhp5a6',
                flowInterfaceName: 'uaib2hg87km1jz1swmlk7p0qz08wka1qncfzs16zjxn63e2cs3uq7o3f62m3h32nrlzu4fhmhcfy6nt8u1ku2g17zw8mw7enro0ev816qeycdurqlma6663hmymom62s6lejvv98sn33sk5xwsba5ljqkmn43eil',
                flowInterfaceNamespace: 'jxfchk0izf75uosn1fhkxhgykoiw8t63clqydgs9ei3rgabm1uo04ntlwp7h4zk3z81ba9hqug1bl7dii7j5hnv0guqny39fxx2xrkdntg9zbpb1xi61998m4ehcjiht4l2iksnr1ddj6hmjx404x5sflhth4bxb',
                adapterType: 'zt9by5wtpmtqqb7bl1akg4e5zvp13d5osk5ycx4kyhaqpleeybaikjco4d17',
                
                transportProtocol: 'p1ixme2huioul6q0ygbbrsp165z8pi4n8ongnbbj714ez97rig10jbom8ntl',
                messageProtocol: 'w0z0v7b47poqo7v0lta9ruydlhz00hc7zmsv51rp7d9kpjxll6j019bjrwi2',
                adapterEngineName: 'ue5ybedjsoomyn1rgkx43krdfujr1mif5qnwd2xr753skvpn1bu05zfdfkr1z6gt3knf81ofqce4bv79s4ygh1ual9rbkdxukqzq8831h849pqq7n43qjgthc2oo82dp2indz63x5nbueobukk8tk1wejsjt3uvu',
                url: '35o6hyt99uwwj0z2fq5aqltbmlpxuax5s6600sdyaufhjo4j5pu7xwuqssp7csjjmo4w7binfoumjf8d9sac5cucqy83ar882alwuj24hb0at0nca1vcy2suc1mialvk7ngarchfpxlzxfjuvgg8lnrzfud6k73fgzd2iuw3kfb9jb0u4gkehkxw396ruwc0ynw3hvmfdkqb8un0v5wkc7q3kqz38wcpv0xb6n8usylhycu9ctqe6quqv4a6dji15e0yjqv9qjv9vk07l20451v6ex4xh05xq67b01590u4a4j708dd3gayz51wprc8n',
                username: 'fo22uxx7habvu3bbk0kxd19pfvbgnp3r4jheiwx1xsl94x5907oqszy3b2qj',
                remoteHost: 'b62rw03vozosbg66rip2cpw2l6mfdjl4c6z8qqcz3i700kf4kg6z3dwm4d5ivizi3p2kv6vfm6kab6pxopqgon4ogs26cb6ua9az6hqo5wk8by27778ytjvwf6xiffr5j3thdkmxjnruad5segd7xx8hnqhfwkxu',
                remotePort: 8805670310,
                directory: 'd401uyv1wd4s0fs9dcdpg0uupm339ue648j1uyvblktk5lxw7ikm6fvnvwti3b2lsycjmve61id4k7q6x1tkmnjpnjtapicp4hk144fih34j7f5o2h59nhtdzdv4bijpz9c95vy8yojwt57s9200cr13wwuh1ixnvtqqpgvi5grvzqq843rsvq1hc2nidfyrjganwool130ktautk35m3ip5ot0iykq9d7wzp18pt8zyzhyhmdfhrthpqxvriyvz7f2t5bc2b74hui316o80jvcckl8c5jc9v4q739o1ssykc5w521s4kcbgq3v3a4r9b2me7ddwwj187w2yoc1cro7zolh9pwmwfxxme0uyvl2l6t0ce4q05uzevlvvnc1j1km276i9zczqpg2u4bpl4hx2nylu8pnpr8sc8nk67xlmxnv1sfl51eor5421ov4105tim04ksia32vfimhwozy7kwwmwkjfu2t3faksmn9axam8n4nf8ez937jyyecy38nd5r3oczqr9gu5pha6gwfqtcej9a3h61bhdjt0595dgjpghkyyz16tzkxrj2yrv35t2o3pl4fjvv4p9kf5ls0pt7fo7wtgtnw7340hok75xakxisx2vjznynlxrdsj8468f00aenlz1dgeg413rooe1cbocf0g6ddh3gqh0aj90a9ypdlanpjhv9tysn9nt4uvgpazpfrz47zfj3rkcamph5cqvp9aytkptcfqsgoywritrlxu791fkh4wisx5gumva60w9jwcvz9ibfzynfmpj5r6xv8mzxiv0n5uqbcafzunnzpr7a9wyv3kf1e9ptw4dmdlsvuc9weri3sl9fzfdqc122kotx7c603lh66ogoj2qkkuutj4t09te81q73n1hhxt0qbhkvewaibdfwh3ewl1bmnw2jtw1ctv6d6rbcnfmasuxjur8252dg67fjvfsmtj4kjyhxni9x3b06ruideou33h49vikr5z9z2xljz2la9ayosqjbhn0yklx',
                fileSchema: 'crceppuz092jr8fon4oobbch9z0z0mints4691dy1090klm4z1z0sefexefmrym82fgtwd7h6ebdlfdw118urd1se5pb7z3ldk3cgj0baeeqcubc5nz4cdbkejvmrdavnpxlfgattqsg8af8puadjihc90x75epxg7la9evscr5es8dcmpzi50xl88uuyl62cingcfrpwd1v8n57ex6qpb4nurpwrmxjg722w84fyhdda8sjvw2sqzvlyeckrv62wy0a92nuezb5a9bit888fb75ghy5t5yebi1dwnfb485vljewrjtvui6tfexuzn0x74d5nln5966vm8hl1pupowmvlwqpuhgid82sujp9tq23698ijg2jacjetcextblkkzpl3yu0hyjtyfeg46i59tzmde3a88gqnalnkfoohx14hvrheeettjhy1g1j2tyzxo6quvxspzz54z1pwjcpugag9zmoh5mc9ij9u23p57znjfmjrj0rvbokr9m8hyg42wyz47wz4qgcyxkp8mq0lwa09v4ml5u1y8d7ubgvi1scmh25lf8m9eq5cchbfn3vef9annnrz40gxrpo0n7m7rlqv1mg5vtcm5jg3lmq1x8bpeakhqafscldbey7g1r92kaia4sbodrvlehvmzbmt7eyxxj74f68rdo5pcdtnyp1rata034oj0qbtl59s0ylj561v4xyq43rbi7pd3trlpbqrx27c7b5mr3p0q5ab8lp9h6u2kxyousw272eoy5rk84abdubxsa5ytpnlcc73tfe3aja99p8agk5fj0t0ktzjvb9ryytj6a2nyy5v4gdym36idplb7olukwfdcoels47ltrj4qmp1jtbg3xhu9ei3ozgnsgnl91i7d892g0k3mbtoyj2383ixxgit3xc5bomp8dccw15lmqugfspirk4nopy52lvzw2rgepju6wcj62qxne4x7al6if0kbbqaef98njzjwoayryq5b813v2j7qhtx5bxny30z3an6hvr',
                proxyHost: 'poxmxc43i3lirx6969enmd9u50079051utaxfayxf8dcimduykmvyvek20mm',
                proxyPort: 9544974468,
                destination: 'sdbw87q2ygw9sdesagp1jfluja5fjecmx045z25c1v5q40e8ttdz6heveuqpmyl7u6ycipiqmkmef1zk2expln7verca53x45iz2zavt95ywpte7q5fe21oioy4quldip95vrljahmdlkjp2i97nozirnl5ywp6b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '56txst1av340d3gz3ofl2tkzamlc35vpujyla5w84u9kkos42d3u8rbh0x6fbu537s4d0v48fr1pdml1jk6j9wovirkcd34hmdbnk1gai6zzcgf9bivj1ehgcowp7dlcexhundboxd9yt1qef6mjulbeowftdi3d',
                responsibleUserAccountName: '18zxwnnlyejymh8op0n0',
                lastChangeUserAccount: 'ckhjrl4y4cufmz0ouq91',
                lastChangedAt: '2020-07-17 12:20:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'smn3z19ytmd24pmkppiv9ymq4opkxz4i5ckvyw2eg7dthdc2sf6ulqoz7drvq8sl10277obu4291yuol5kxbn1rpnfj1rdf00paynlkpcn0wq8z1rlmqhtar50nb4i0hc90jsynpnre1w494wnzi3tkzy8qinval',
                component: 'tfwn8xrgqnwr9z04lmd3yc5ok1r40md65qkl6mef8flasggblwxoykj3c2f8mrm1v5hk7x270aftlb2a9alw63dsy9h4lb0xzz1jtz4ebeu14x8nawuk6m6aede0ho32jjitu98zz2jh2clie1mvqjab7mgqjalz',
                name: 'q0ipuywv6y7gxazeykibtpb19c5kh4q76sx7k25dl5knf6tucz7mb2r0y007twtgbt8s1wkkb7xtupf068g4nstlv1xonzj9bb048qcxk6lu8gulyvq6ejrfuln7nzkijvfcru46d63fokkh9pcxh1cxel471g0v',
                flowParty: 'y78uxdjx1sz2mmfabge9260z16ihwu98jff91pzbnbynfhrgak4wy2rol3h2ta811meoxejp4e3nb85qlfjtjd3oi76hrw7dibp0fsykrdkbx0biyg1y7lh39hsj1g6968xxvacfg31p66kjmp7qn8ryr1ztbtm3',
                flowComponent: 'vnmv4hrki5d48e8crmbue5g1bw092np85mgai8z0w1jyu4nnyafbarzxx45h3wiwc0fzu8f4u8ys490x4krbjxu3uupel0ws5vpv9jjljb6v5k3wo8o323zotb5ie7nvxy6lqv87rexyji9az580uem253su2znl',
                flowInterfaceName: 'vdjwftj39e7aba7nxenz0sdlxgh5fkboja61cz1h2yegxebsmu9aojgu6sxefclua7vjykmkuvyew4emm3h6t6pp21jdvmkqfbsg7lsfh51rkohcuyur9pjpzwx9myb1lnj5uybqy0xx0ubu9ea2vrwxmxmbs80k',
                flowInterfaceNamespace: 'x0tpozhqop7jbt86ktvsheq1ahxzqryxfjv7lua0a4m0mq3vc953x2ecw48o8gohsbsfqfsb2x96dpejx59ot0icltzv7ovujcwh48z5gx9o1bjtna03pnjnn2cguqiw3wz68d0vj1y35hjp6iozml7vig7t976b',
                adapterType: 'e12jtxygpgipedzokocn1om6s81en5777s0bb9moyu35h6a4t99pehfjeeax',
                direction: 'RECEIVER',
                transportProtocol: 'nwp5oprr24ecpcj77ey4jhgfvu92fhn12bb95x5i1ttkxorm1zcenwqrh01p',
                messageProtocol: 'v9x3a7u7zk3hujziietnd7tyon2r3vrlhnv39kjsekckyhh2lbiv5r34bbh3',
                adapterEngineName: 'imumavh4mx20s0rwsso920zj6f7vexwfm29jxazthsakgdwpmly4vr23hg4pnm3pg24hios6pvkdcgl684g7aebrm3vh431m7fnpb65ersispgfnbpd8sqy8og97avccx9ufydx84m9f599ni80bla4wtpn8ucl9',
                url: 'pg57zpydr1a6wb9jnrdyeeh5g4ouzosngf48yhee94r7whkpdwnfcsllaswrmguu993aqvvd9ivbio10id9sjnhivx3x934mae337h608okfgf9f6sen17gnuyoy3kxg3q32zjc83bnmiofr51soc7mj80hkgpvhdggqnghwzxwo96e9f6zzzbgok83933pxonimj8btwyxxia5n0h1v37av49wds9m340c2oqw4fqxlbjvjkvi590ps68to5v0gum0b52dkmcwck875aynzfacng3mrpqnojncm3vld2l8h0imanyslbj0q2quz2wrl',
                username: 'm3lo9upypildm676uwqoizvemmubph3x5fn9uxmk4w13s5nbmwogdf8bu6n5',
                remoteHost: 'ubmr9jewsb15jr4liq1eg9nixbp7vrern993ktpxagw48hj48ay28231samkd25acn7gd3iwbckr3lssv99j7zuflsi4yyd2l2npsd9fv65051sfq4s3jfxn58nvyl1oaghvwciznmw0c2eqhyat49u5retxpuv8',
                remotePort: 3470188582,
                directory: 'i4m52s3amlb776apz560i0coz0qwuzp2q9sd4vxymap54eteoxd3zvsjl6ebd6wcfag4fq7h0cowsum1gody622n61ex4tozc6h8nn2qkgzovpihv846b3vfas9x28ffjsodr4j75dabklqkzem7mtbw2moruln1qrpesmp2u6hhgxguo7wpn0s5kefy1137sf33l5qsl330ppqpc9ahudyimt9fry98igxbkv2lsef6t6487i8gy457r07uu95573lzxtd1nokc6ob4w3nv06hgliic0naq52z1v4pcr2ntw8fumtjr3o77xhpz8bc6xq1adqeh12nypol7zcltr8p27y32d8ghgc6jmgiwz2ag09iacs04zx1yt2njk9c0lf04fw800je0j69mbmc396vnvgxe29vaff28s3tmf45s4kci7658xtugsadza19c63whclxsvgo7bn8toekrh0r84ltki01hnfezazwaidn78mnjzlf92gklrdhx8tqjk5tds3atxb953skw82p1bfml6j2hjz7nmz5z6fcn2z7wbb1yrp4ztih5ao4xnzt9b5rk8dhx8gyqzgjxn9b3604tc306f6c5loihqa6vbft2ojducxzbs0lr0cnytshir5bv0sa41pxfudpr9frpshsobazzmb6m4nu903i5ouipi4cfnecb9ifg779pv7n7ccxgce0xke6gpuu0lg0r7jjdoudi29zzvkdeg76kjhwn5tnmafm585ilznrglfayjsv6jgk2zf8nov0w48dwv94vc2t1bphjn0vcrhx9fskubuiyyheosaag4z2minff5iol0nwpwu3eb7ueil6hfrnc3hso8rvgrifttt1ysvufwa9142c7pcifpqh96oy4wy26krrw0we35uaxnu29ltys5yfeb5mmopebgwgjum2jjg6qz1blq7dnhp5wy5zo706bfl3cd3iouhx8iem4r49m8ifh9k653vvalsqz19wqcxzqsgexhr75pfcbut4w',
                fileSchema: 'tptgr4f3w9lgse8z4s4wyz7r2brec9zdb56tucq4meti00z8nrpoa7x7xwciqpe6yyl3ttrcr59i25ph076xr8dwy1dgi01sjh9q5gsdh6xqzxkos3sk2zk011qbbztqenmrba9r2z503tiizwlngcbqcai31kjhg5inlgrfvl47646kcjiqp8dkgjrq9f48ein8uxor4fzntjel0e553bok3a3kgl5qrzwolomoo6zi8jxsazpal0ulox2d781tbswgf9amu61f7k4w5bjqi1mes2jfcdq3lvkzb0fol0krfrmtqekfoo3hijlt18ldsrj0azqxqc53g45xthxjsb4mt29sfjxydrr7924zzw3p0g3qy7a73p81bx5bxddhaxqyiauf2w25i4npilakei92e54tm18o97ib7m7ig30lgbucf4srambqjtsz9td440ertgrrknovbovcyqmfz3ixuc51xq1949jakqowo5s36bqkxm1tfst8trm4f0sxt0hnzjjriabilwnva87r4cm7dyrpquflsszlnqyoljx1qq5xtisqjxiymy3z73e37n1jmjpiiw3daw7jv53jvme4t8wpc0q5dojs1httm617ys4y6oxnu7ksuur7qwzczfo2l6lsgn1t9cl8xyz8f4itevek5fy8lamzqla0dvaj23oopr63ex9fkr87y0wba5v74cd6qxqhojtb20h0ljo3r4pbc9lm4v9786q0zd4v827kuhdne6dpxxiaogvwvsoomjz8kw01s68nisxr8qdukmtwiynnul097yzrhhbg5hqqnatkkll72bxgsdeev9pvjrgfiqg6oy9v4ksslxqsvy2ypvtwvr8msqxpged6dta3axlrd3hfhn1c5olkcqlm4pzd1uoc8d4ag0npukp95ymmimn2jcmywx7x7iplbi2ke6s22ecxtsmzvearywb42kbswurfysr7hut18j5ofmodan6g8wygnsg9cpb5uy6dxuprv58cmnow7uoe',
                proxyHost: 'nkhfbtvtlycw26r2v7r9f4a9zowejhplwi1bd4xu5un974lo3etpe1suy2js',
                proxyPort: 5841172612,
                destination: 'qvl5vlgt81uty30lz5lthg1x198hpip5w4gassi7idbaybnfwxmbbna8lyljjjm0ad02e9tcehv7doyjhbr3a7bha2igpk62bgwz3suxusi8d7yr0rmils93hfrjpv0su467reu59c5kcpkspg17c14ecdn75t43',
                adapterStatus: null,
                softwareComponentName: 'a5bzb4tq13ftidrm89b0c19u0crztqm3jx5n5djgit640vkuk02zdzhv9m1cfaopdepebuw6uyu9c5kabkc27yuuvy34mvwqwmfx672dkq409nspmeyd475yj3oni6iqkez4yufje2luhdrrw41fhckplqfujocw',
                responsibleUserAccountName: 'w7eh5ddk3j0hosfji5qv',
                lastChangeUserAccount: '16886wvxiomvhagflyzj',
                lastChangedAt: '2020-07-17 02:32:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'hknnuu1tf3cnwrd8xffqirocxxmjtjas4rxhog62e1gk6wefi5ytft6m4yudt0023opdjsjsa3yzx4kcibv3xvpfvmgyk7e1i9f60tpjmyma7csxypymvn0xlupzkjd842upuizjuk6rdthnmhfz6vpuydhbcolc',
                component: 't6ospg7zfi2lkkwhrpclsaj2rvla3cwjk3rgj2l198rqu5dmt9wo3at6twvn4x93kqhrjjf53v0thzi13pfhg8ki9skjphlcryduuxjpl8t7l11a29lw3d5qpz6j1loo7y8c0oexl2zjihjo6e7djn0szej9sbqk',
                name: '54z9e2fjdxpslonu072tk6bdhe15aixoslr0lwgvh2n2eq3d8w3xuukzhgsg6yw579fxue87xxbk3y1ft23508wvqmujldb2c4wobwjgb9dzq42mq58a75swb52plutzfi678sbg6uzvpmgdp9d5861vbvpeuslj',
                flowParty: 'o3otc6v6obv8ws6ibilljqf1u82n8vdhumb01hxo3ge6b29w8t1yii5whriujfqwfci336dszv6ds5wqdx47e3qunyumbxgivx5g8c9wukb1lni4y4atensqrtbff7rv7yv3pkryfyogi5zn6xg56ssrwu15beyh',
                flowComponent: '9pglo5s2ej4typptkkzqxhwvad4lr5j3t6gtvkw1aod1klum1csl820kew8m1l47q95hmzmznka9tdw6e0gercug3jon7jrw4c1k7rqnq6hqdtuj8b8jcxecnledpaa1ev42hcetcngan8nhb2if7btwd22h3p48',
                flowInterfaceName: 'e7hggzlegvr9vw2b1serdlsj203rgsw6vh825n54zlknps067dk2ghng47lbanjvombxth7uxyp0wek57clkijfgpwd59oh129045lpzhq0nvt159gvukyptih1742acw1kvnjlcgqkvjqduj691rzxd0e9o5j6h',
                flowInterfaceNamespace: '0b686nv1gjw059vt5ehcy9u14naho12t0p525t2pr8t4uosjytgn6btj19z4i7bwlscj4ujg0tavafalifjhnb8tuq21vphkpn9xx3ywiivjhw3jiwfm2xl0okf48nz71it49lfgtvj3stx8pm84sru94arrs8qt',
                adapterType: 'ls4ddfjyg5om7aqdt3cmih57iv3fvr0ku8ui6dmg5aaxwbo3hc2fl5zqvav4',
                direction: 'SENDER',
                transportProtocol: 'wah80fapq6po2ls4ehd6fravu2gzvycnhi4czovjbkudcfqms60fglk9285d',
                messageProtocol: 'ptu9s97my87bcaihcpnk29z20pkjzbz803vk8v1jv33fde19i3hgsz13gzi8',
                adapterEngineName: 'qh67ru2zhe61qp988kyt463osp16jmttrj4wdetsyeddz34mnz8900c1k1uh13x95fq10el08c5ieyz8tbo7ojhoii7wrejy9r8b48z8ds9uzw42g5uqevjq6uwb2hih1o7ywp44uf587opio0ywi4sevcaclj2o',
                url: 'b823nxjrbiqniaylrshb859w09dswve7km6fww092ly7rg657dqnxoonggoqlwkv44h94ya5fl9edg5fmel6km72m6a4qd5wbdvghti59o1gqscvfxcc69s9tt5f4izj3cvtuey5btkkpt473wlayrk845tj2poe3yt14n6323kv4mrpx6nritg3h8bf8pj8cml9e3evkbarzv3vr72jra1w9fts1rtr1aibnv2fbxpiwdhyk5egb1z7zv0h4wqa48zimfkoucqsd8nkb2t1g4e489lilfy8k4c74kj61g58s8yyz5ww3wejz1avkxhs',
                username: 'l3j9qm1weheefjc2lojsf7bl4h4lv9wzj1j4qjt2nof9w2q234koh5ihi4st',
                remoteHost: '78rv1w5aovd6xhain0d9itlpmbm6qc9nw37qmtakuh10k54v8i75oslsvk5dgzer6f9sm398jckzcj85eqk33gv1jf8y2o7rocx9loepx7cwdurfye7e0a6w7b5tdoe3vqvpyxif5alntjzhicc9umhd68ge4m7f',
                remotePort: 1595519852,
                directory: 'qmvldym0s91hik7o166t5c47bm80vyysdeqqt6oagb9rtu3uvzjurwarjb9ke1rjpnabtu1eomhcy9vvxvkk11jvs8zj6o4he02zhsmq0srgpyyurqq21u19emqqm0wsqtgwbkh4jnrj6we4gad2y76rw7xy6n06unubj0ilxmb5qmrwee2b8fxphslzud4qngeffrssluq0dsdcljg0nf31u1y5cck3tvynd6uuu8h0mp0qgu40u3qvfnm8524ieqxx6cjr5rr1v5ze60iavjvohsqy6j6snvyoifkgdi78d2iw560vw8xdv2rvl0onas1pck62pece5djfr1bshn1eghiqxuwspmfnnlwnnmgvkdq1lqd76i4f5wvmhcaxcmuhfbd9sudept2rj1tlk5npfspajn8ogkbr68jf7cenwn47dq45r010898kejhy7x1h7bfq7kzqynmdnubnt1t32kf6igdt8tm0upx1koipxer9v3l33u991ofc3fcb4ynbc0bojhmng7wpjbk1v93k9oyou4o0jsodsrezqt1ktyyfg0l2c8arvkyvme6lzg37o8rq1ppv0107zhrlffpwzbm29siawxlcva64nnfdv2zyiqkzk3y78raa1baa2j69pkpx1ds1tnd8ue8p48nzwxjxic2ws6vt4zk5hzr6trcax2hwjtts8m1i1b5mw6953nwpcs2jlysvmnx5v2fqrnp0s5zm1eitm1cq2p3oe6hyinz46zrtfqys9u8lvpelzsbf1a8m385dt3s8f92vesapyj6yj6seyj2bllhj8cjrgyjmhyk8kg0nriijbvqnnj035jpwyue0x2lhgalj3sakui27ktqlo7f2pa2am612e3h9x0f4mt0lk6o17bjq7e0z39l2w84auann3h8jsxn6d3epyuiwe2xis3cq6e6hsoayx4axyelkdiv1ue1h0rzwmrkvy47afip574kq3x5l0f7hopxmyug8hrm4uoqwl2h96n81k5wsw5kz',
                fileSchema: 'mtcof176ro68vrljxd3pt6wmlg29ye2h9hon4zedtrhz7qbx0ivvwtvrxvh0uynxy0lrel09c35shrrb2qvrpnpuzl66mafw8a4b95r1076o9www0duxagedyemmqxn9p6lphi6daba7n9rwh6hlg9y81murwmktau35fs6x1wo5rnn97ri7zyikn7pe7e6riejawfuugi402zfe0q0wllqgikltzz50yz71ozbc42uco1p8si7svlb11mpqx072ic45gk679rw2q2s32axbz4tnhk91hj7cg0n383whbduq2udc30hj1l8u7etpb3bgjip1e77g57h71gv4vtc6rllt2dyxbhxv5wffrxqyit3o5mt1ajh3m5h6hfoqvxmcjc0bk96vtgk05nrg8w4j8edn1nomfy68992427dyp8fcl16gyhhi3j1evo11sesyxkbf49qqgkiozjyxob8d21bbpb0ddfpjmklwttscyqst74nqcdm86zx0qvoc39efimmp5bd2b8m5e0fsf5zx67idiofozqvlqj6cvk0q2208rqafm0a35vfxn4ot4ab7dm11k4viiffh5sxvequ42dxwvzfo2tiz000z68yp44xoihz2lhoj2j6exayke4n4afrrkximq32705uxl4c2f8gbvb5y5qc5424g9cwjzs8eb7s75ldybfbanw4vzdzcs35os6gc8psadgi5m42u46934qvgbzym0152ixnkbyhg3467dzijp1p836neoe89aichz90cvjpo5upjgwpb8ua2inb2rfbr7qut6zf1voejm3ickbogloj7aawbx2rdlzgi1bzl6fdqnxh4osniwdezoeejsoyr13asyudf4zj5rmif5oax0kpheyem8h5lsmym6szgegqmfddygs1juypj0udh4ztcahwwdoaiw8xotxoklvgb02jgc4lxpi6zr97gg0igih51rcn0xstwnrvsjpt4mo7pw7tctx6drts0cfrgsk2lwcscedp7x2ei',
                proxyHost: 'dsa04ztrr7jwtl4xl2o9ltt5f7k0wm23ldutq58iuffkpm5ulxnlnc85mpq5',
                proxyPort: 8537961222,
                destination: '5pxxb13i337rd26yxafrom03yci11wftmuz7wgswtg4rxi7rw615xmdkzw9g3s2ob5zzivd8b595jrfw6ei418oocw5isc34qke9n7e3435ro026fkeiy4al2cascijxy2x4cuwid1vx3d8sbdcgx3ba7aypppgy',
                
                softwareComponentName: '85k9ugmwc0lv4rncqwv1rjx6qff3wkdzqvrbw0ugf3fq2bti8hhj1aqgctmc2v1nnrvhlt0rsmmsqm6jtrokdjkpftxkeefzjeywiv7jxsdrjcaekxje4509578oj7vejldq0vygem5tqkl6imld8vzszswoighg',
                responsibleUserAccountName: '8c18aqtvr5eimiid6n3w',
                lastChangeUserAccount: 'wq90zwcrdxqhunr1s8mw',
                lastChangedAt: '2020-07-17 14:04:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'ej5grdc9y05jezj1fwbrnsios6b2yjz2wmw66',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'px6pw0h8lyllndb2cexim8v4oaoag07q376e02tvly9rvu3i92vwgabj1vuicfvhqcslq1o10i9u9z33r4s4xvjczadyje5eh1yfhabau6o54pcqsd72psuhcnl68soho11f5sxk70gme1ntpmhmc92cev84kh41',
                component: 'uea8qwddsk9molu74xxi4p5y0rw9hmzweoq3dgq4hnzqzl322hmjxh03edmp0cdcbxm6mmiwfj11u1goeoxas90pwmf0sbt27owtybwporkn62zv6lenn4chyw7y2b4otyoc9jljt0xhueb6iaosl6b5bq277etk',
                name: 'hvrqzubb15e95g9698pvi4r2zikunx0ybxkfshwc19nqmsfc455e7szaxe4v4rx6oxyoz90fs07q6r3pvfkubgr4u9s662huloawoonuf98mshbpkznwfqkf56tepmqv9jt9gdin2dsp2kvcbksgemxy2rmuh314',
                flowParty: '64utswe8nmvcwts5glaulxqqvjpgajkm1pfmwi94iht8seeytli4uyrcoqgfmskeil0p1kj6mv8tkd13a39dwbysovo8iy4hvlwgfx1yai9ck9xf6nraavl5f1z4b14ft1wbwmfip1wnrjz49cxxzs8xq6n6y6sj',
                flowComponent: '8ffqscvpyamefymam2jvsobnpw5oxc99ol25bsjz9cc6v44h077q1q8akq4q109r49e0oafin8sgfzzvnam1g173acj5a2zrstkpuedgnpstsrvrpxe24uvmm7rnr2wn2oh6tl8yqjik4308wl4xq230t58xujc6',
                flowInterfaceName: 'ys1szhr36r2yfogxvrdqoxl47n4n7bqpkx5kttvni07210f8la4sh9zyjdiy3k16zzvq1wj69rtmk20zmz86y0lq5el3n8uz6xxm75u66u19mfnz9i6e0pi3p48njkaab689daplomqjrp7k22jpbdvqvzrvs59p',
                flowInterfaceNamespace: 'd4uur4h6giwcshggoda49usujkyvmvwk8kq3xeghkba4p7ro9vae7skuveqxkb3afcqhmtltf1twspm09vmw41u43msljp2q27r5yel3lq2o3t7orh54u42bqxk8rijcnaej8alc41xfve03s01r4x2xd6e4nqlo',
                adapterType: '81kxuw1mhqxksmu2o1hg21wuw5xra3kuklzvnla7salq2jxklv9gql4s5ef1',
                direction: 'RECEIVER',
                transportProtocol: 'xlnyrctwvx9kdmqjscomkqljp5py1brvc7sbzuww539690f4gs8nrxt2gw9g',
                messageProtocol: '1v9vm23ythriorl3hr87de6nj4hysb4ls1lws2qhaox6ekuv5qnfcedq96wt',
                adapterEngineName: '5h5vqpgsa91gazsf12neqpalqxjtfz8c4oyc3pl9ojbe08ublelhlk787gbbfsb9z6etzdss9qxd4uw4t4aczeopvixshmlm877swqfqgy7u2dnyfuu5fkbangs3wcfgp3offssdaj1vjx7314u8osi0sar5c4si',
                url: 'gsdw78jntv476y6qu2hhak47belu2har8azyvz7ttdatngv6tjaivsgr5oo0qzj42b7vcre6k9oz41fqjkssy1v1ixhasgjg9oldibwerhmgauw9420qd1jh64q3049piuv2cd8navc8spxg88wjmo8az8lmhy78wtej5ikde48syms2xvx1b1lfpdvs0wpi9nqg5shh0f67w75mivtycd10a1t8dzmccilrca5f420q9sm0whvnwawa15sc8ptsvfef75oqwc4sgrflbl3yckh3upi0362dnn5jg1gt7odafoxf273ztsr7e8zwbk3e',
                username: 'u60q417079y3cvojt4i9euzxx9t1h6wwtl0ng4m93h9gpb1tqm8eyvkhl2zv',
                remoteHost: 'dznvwrhod21xb0irvlj9ikpdi3jvybtvas2eab8yrl74kwsdue54ykardjz4lbvj5qkpr2f07nb7kw7d5leedyjcmwumeyfnp9vrjv12c5c0vmz1kbzd0t1aao5401hs19s83o6ynp8ostjo0r7u662d0720qbxl',
                remotePort: 1883658385,
                directory: 'dzcg6ku8uoijkyop7c7erxhp37eoojv7525ezj49ep8mpnhpuxtf2ngkqxl80936pi0yy3e1lfy1bh4x5g5bsh85h7id4e173q3o9efupw11sr6a70aj0wsx9db44avihusn9hv1keegghl99e809em6geutz9xoj6e03lufkl4kuuuu3iz1c0jgn1shusjywtwp6b2uh4fr9jdfb9xpz5ek25eldfe2q31z70aawho94cw0zx8d2w6vsiflqmwzqm9shp9ahlphwk143fll5isyit57d5svr0894j96mnfodery8wt4h75anh5iily7sqqrclc9kv1l1oozypbriz19sdtj8p5qhrrbt8kzv7o6hvuh9irno1kvfi5lcg5493dfgk0maxsa10vzm2kd77okhb2qy34c730fcgzqfi0nsp79uyadac5molm7lai2q59zcbasgmplcb600w4hwvody11in0xgmsbbl1759k8pl7tqy5c1rrd05tqplw0gt025gg7oltgw48lveyvdfniv5nfw42xwc4tzbjzvmol0b25mlk3mlqz2x0y2385i2zv6h93qvggdul1ssyw0m6cns0yu7ed9jucv0xn26d0m693kz6ktwubbugwxjugrbuva1i51k2brg0bvnuh09obeuo996kbj6oockonihokol8e7ui5f1zcxd3yasrszbc8n6uw992eyufs9k2bepuuo1ao6evtcm0fis1vw7j1ryrdakisckyp0r4972381901u2jf8c2z756dgtljlae9uli22od3isf3a3l8zfah5ghv2aw7x4mnz151lvo21i4l3bsqhxbirdjj5vjkekkk5qpb8026ciz2mhblmuknbvz8lhplflp1ty6mcfynn00jgnkqt71c07b0r3wqujgsq29jdco8cfiuqx8tv1yg90y05241ft93h3rb2s65ze60k08pgmphcy2bxmiertimtcmk2f2c63u3pb3lykpq5i07mgjnx8jbkz3shs3nr',
                fileSchema: 'jt7ztgvz73osebgukvb8grk9tho775zayxbrqkvyymc5yd4iez4s17mgxuu1doc28sbu2qugj2jtvhrdfmh6e22aekgyjw357pq4fe54z5v0xbseo4r6motwwto4b9uba6ni6odei2079gnuw6abum8on4xby2uapa4nj76x3dbfipxmm1y0wkeg4xi0004ij7orwcl1rcc88ksd5fjd5lx8q4b8vah56ccpfbhonr3xwmkwrrb7h45rdg5eph1z2mm4t5ittjbriabmlhincahyz07qra4to00dcx6pdtnwrlsxpoaab980r546hih773lwq63uy017q0ewijjgc7830kq8hm1hi1a4zgl9pw9qlz0113e1xku5uwk840pzmd9bgxm1oqlk7gcrb7io2rwnc5v9vel1ypd6t4oawtjwool1v3iwdvaonim1h3jn3q1pquwstpzwzb4kxoyhzq8sjsrrwviyw20fg5y222rv5ouesxc6xccfvfgg15nm4vywwksc7wc4hi4s9b87jjh14e9ubrz9vyiio6pcx5yc1kb1pp7789rfqg257z95psbq66i1ak43oj2pe0gp81p3bckq9naw3n6vwu1ix4k9d6lszhzv2damba4jxk9mbu8ltehlat1wye05oien2iiljnnws7tufr1gfo9ov49dicj1ads8t0h1mpfgyi78d2qrgh2kt2fd0f5vetr0hoesvs0ua95ciab4q2ggwaqbiyj7qy7hz5d4chfzvaq6fmve763ptmhocas8q79b0u41lcf0399r2813vq4y3lqux805x4xfg9ylow6jv6hwcke71fx70znu34r9mokdw614n7uai2hi1a4movqne4i266c1xkgosu0j4vnibtu81bde3pmwr58jyf07c3sbwpetz86xtb79uzdovej07px3c29cbq4wjmypc4w6a8ctpgk8x0yn7xejhf1eztwdmej0hti25r8wrr88lbtvobww90zit1pjqy8vvxj6jxk9',
                proxyHost: '61chh0z4dhmovr2o34ruland1vymghor1clc6cos9jt0krvh7law056eacrp',
                proxyPort: 5017966253,
                destination: 'ym9z3twwrbok5h43ygdllcn8emtzkf57xroswvauu4yzhqhcqn6dnpg65ju5bzpi1ltwq9c25hqlahxmusy0o0e882d2jt3gp8ja5a7j01gx6ywqm0akza8x9tshdjb91g1e99of9h1kxc4h9n6133gj4y5t7f8d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ngyizw797h4cj9vb74amxjiwc4f6h02zempi2g73f8toql636q5td8ixm984ot5m3x3ja3qoacgxoynqr50of7z1olclap2vpuu0qwj9uf7sze00c6gjxtynhrt4lfcm1yj6ni1jm3dst28ohjwosd04nz9pu3o5',
                responsibleUserAccountName: 'o6swkepxeisep33q0dhv',
                lastChangeUserAccount: 'ycozk26z0v9ajw9divdn',
                lastChangedAt: '2020-07-17 08:15:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: 'updeo989deq97df6wasc4qvcnowoj81s7ohs2',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '6qfk86l8bxtx77ayb8d2w995pyuu252d716gybkla5xyienmlj9g9x4gvlu1sy2jvmp5o3o9x4xziyk9a3a19ah904h0sr9h35kdjx8uriqd2o24qkyfqdrhtu7i2yumrvmhe1aklo5fymaociyqsi43ipka60ti',
                component: 'rk0xkd9xy0f0luxkaqxbgsv9bsf8gch7ftktomj1bcbtmykchck71cail9ue78xj860m6ulppevs0hk3dzntfwqe1pnzwp4edfr3efpdxz9inpnwcr4ompcwfdf8yyidhtt4ca3w5k8za2v9er66l5yd3kq3e700',
                name: 'kkzrcd4hrscayxysjf9t5p5jswyz5moglgjtp7u5eh9drn5tg06xx8st3xjma9ccnbgh9r6s6gzoitafnxm69lltg56mv1qo8gkla9sbr0600mcv2ies7nh9bjmg4vh58pl0j81q0g4wr0gelu73w36vdiivxm4z',
                flowParty: 'uzqjdzlxkwlxhkhqmsbo2ouljx3vmnhidyx8on9igxnokifyaa2fvqdp96helacz3grrf5lhvy87zr5ziz4wxsbkremy6rmrk313vkatwz74yo8op0a0fc4e0r7fpfv2s6g88soqk1vamawfy8okyssjezbys3kv',
                flowComponent: 'dgpppj8d88vmi3za9vogyqb38bj0ygs7jwsvckixjs54s209dt9jyybkjnlpfpx3p2frbn65vsq0grqacovjrygi8utr0xzj57yn1cmab84tud0llp9lcd8hmqcu8vwqkgqkzx4vzplglkz4cqe6g300a9sontr6',
                flowInterfaceName: 'utx4kqk9a9akwuldq1q0qkd187o579atvj20sbsmeffd0jezpnevziipobprgz92bgfv3njtirakc9omfhvzg4scvllgxdist1t80ubdrissur8ct3ae3t79j8spkwbx4jg6srna2oqlaaxiclr7anhb0yulbd44',
                flowInterfaceNamespace: 'wezvdlb6p09qgva94fp9wdbqbaeafdifkj4hcasg5lugeh5sbhh1rnj7fhtsiximprl73tn9xa4u2iy3dji35r960vktbkrgunfffdp5wfel1hzlnqqeiayg8nsjhvbw3n1psz1hvxo0t45g8i8qpk0brzlnpyf6',
                adapterType: 'wk4u0spy9eqyfcj4p38xwk2880r24er3ro2lw3jycb9p2vbaz6ss2r7qdf3z',
                direction: 'SENDER',
                transportProtocol: 't2xt6q246patljo5aae02450uu066o9z0bt2vc7lwmppjyp5le1mxzng8wdr',
                messageProtocol: 'nou2r1nm94e524ntbh8fohuok4dr8z1yk1axgt92lt0nc4558kqcmutnfhee',
                adapterEngineName: 's4htk9dqvxgmbxcejrwaq1cyh6an3leh5vmjjloxnw60vxzwequh0lkl438h45mk77fqfwqdd922w8nuv40eb3ntehyhom47e7cfboasmsgjjdm0uar0gs09lhv69wd8fhw5h7ucalnimj4kit1n9pc4kcx2fsys',
                url: 'evnsq9ftu9976loy9tlrm0x1p1w5rb7bje8qt096jjqu4pu5js8omyh8tf78zlm4t9mn7ahxy6j68xf1coee6yoye4sk116o7oy6yhg5xejcqncm9quos9eqsjts6b46eml1xv7oo3o3srvr3g9xx1pxszu9jid61nwtstj8hy6xuvfd6affmw41y7kvjxmypwdyf2z8mmnmayyptl0wkimuemip21y7q0fezrwa2g09x7ph9tj6txr2jwqti618034gkzqythhmkkpchuw6fa6puro5d96p5hw2am4q9x9yny9nupewg69bfi06wgr3',
                username: '8svgnx5vgtdywhwezsm0isuvbq1b2ujzuv2ki8wthhiy7va4nnzoa86az98t',
                remoteHost: 'tjbgtcb8y3qbk285xan11gw2cghtl6iy0i9xg2xn8e2a8424wsxyly0ak6rtyk6yucvg1caac9bm9ug9jxuq3fxvy1j0yp036ho2a8creexsaxpgbs93ohz6mbflhgv8uhfpf219f836ak8jq80cuhryibqpqnkg',
                remotePort: 8106138758,
                directory: 'y7kjkn298veawicjabdyf1zhyqjquk934r9hdiv5dkt9t4jzadeiymv109ech7cvtekhswo7kjkd4vj8pdw6wu1m06pqcvknciojqgxw23fgkehr4i00y42aedjvt70jqwvkmvoy9ik4lkr1sezaa8h8zeo0lad1xazqij0y4j6nsody3ks4f5w9b1lyohw6bt86xdliz8q0kkqno2dthdk0xwu2twis0qioy64d3znvfhstg0jttm0xcq14zxbd44k455m5dh3v5ql836pvfe30uj470ryw5lnkdb3iqb2u142c509ipsgwbrg5aqhr5wv5goewsqowbmkdfq0qr9wcmr6ktxh0sbil6e2p4ozwe4ffopgqbdz1oyjqerxtp8zdq4tmlfdzm282q19czpd8pd2mhtsalhv13octikamtdvr1qiaa5vqh4r1usnf9j7th5vfvwkvj3ov5tlmqx3fh7kn1xrzifnsv19gwvdwjqzp3157strurb196ahknxsqw6tl2mzp4vja7ctit79j7mg8lfdyxbkq1m22r7chxk3ndprk9bfoe0go0nkz3u7ae3vyvre97octowf5x72sbl4w4vprhofq21m8uzocmbw73xnmd01ogjnvznubssl8mfylovj4zh5sanx7cmvmnw59w2h2cxk9pjhe4123uqk7zrrglcrbc872p4nh7a0m3itpbyscqszuq71tl7s6wcg4cqfnfmbb0rpb8h932b0190unni475d0aqtp3f3mocks55p4r95ekxfrzu1sgbbm1y7xt8pvat8k25cnjqjwlmqvrlm6rt2myjdhe2eows9sx44p3rt6s5daumkhjvb8ai171v45xepbyybivmw96fl77bcr6xonmtvf7vowe2m5p0egdfngbapeal8h5jdef2u82el52l7deeahasor5e1eatxm0ywhgz4ud6dcabm5zvehch7dqy6zricm6g3pxzb5xcgjyu52vs1at4v7z3z6aucxe8j4rg63k',
                fileSchema: '891hy4y6ps8ryxvuz2ziy13wmdpza4n3jlu2t3uycnoew8xh1xf7prhbiqngtq9o4fuw00kfp5k4qu757ll610hoqaxvwha7cowv5exil363gihmngl3nb3co04vam3nl54gn3ux5xtyxzc247r4id1iqvy4whb3fkhkrromve2kvtcanrkvsqi2w6gyn7j2i4jfmw9o6wfhuiwgtmnwmpv5aezwklq6g0a5znjtb25tbkpoo6qlkjkcz0vw7nnsujeb2soa6xy3q2rik8537h5dr07jkyy8qstue06ysj4xv7d6dbnhyei8qxms6aar2znjf5oiyrleku9smgitvhcmrtj4jfzpz1gzieo05f7ea99m9hhwj5nfil9p8bekpcz5dbryjdysa9dgjhmh95vxjb46gyzsv67g7p7wpymtj8mfx76u5th24j4jiexvf3ki79h5tpvu0ckk0wgdwtpylhcgsxbivb1t637mdjea7a9mrvfpd1i3o260z743klfk834ypcvug6jzepuqg0kxri0o9ux47ky40sqrr2fwctbah0u63ufrluzfbt56sbsoz6ofkczp3asvob7u1ppu6wus8ocdf35iv1m25enbe19tlixo01sf829tzwiw9ssuwwkt5eykhmp8xbxu8qrps6p8bu47c57dopss3x6vuyhsei9r4a893njhkkpct2l5ocnof8pygry7pbo3es5ztrhkbaqxnzo1fn2bpqovqvdy5p9ccgv4wytu82437n6h4y869e4drsxh0cf1ogrmsq4lj7mzqmpwwufwsg96eb1qhg5c0iqu1uwk3bgzemcgavi49perakxib8a7kgszbsaurksrmdy7cru4q4qa5kz5ncovun9c0g5b87gwsgykt4l813v9z6wvba6w6scfb0bih2kg6gqq5ienr0txs3f9hrb9ar7zzqsgy57u47r0syzdlgfqa5thr2isglu5ya5spqcfy1pzs62eq2f6v1ydteu567cvuupj0vhk',
                proxyHost: 'zk2leci8abwistt6y0192c20y7v9qgma97795zy7ob09sif0aorwrrqpbit0',
                proxyPort: 1102078547,
                destination: 'g9wp6ash162pxkiks29o551pcn268scgky8evl77slar28xbrpiousr9gtap1zmfbe36qgzryj02p597qxnf63t44koauihm9qgbtchsjqxfazsoqfawym1166bnv2ol1imjafpor1c5v2vc01794441y2n200it',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dg47uxd4pct9i69n8msuaikxj3ojexvj1kfc78pny0mikeqo2eec0s75loiyo649utlx4o60ns7oh4bp9jmhuc5jrxp4b2vnsywjsl3igqitrdsjsmjgirxceq56e5pzhxhsaxaqd8rl809eifil4fyur2eeru5w',
                responsibleUserAccountName: '9m1f2ghb6csw8wxtkoji',
                lastChangeUserAccount: 'gbr0rknxp5hhug6gjqh4',
                lastChangedAt: '2020-07-16 20:43:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'rx0xw3o30bcmtvf1jdjv4b6avvedo3lwuzegy',
                party: '52e7jqs02rl5vi0dsavg7zvt0jkb0rdziz32lyu7er28wgi2c2hzg6gdvgsc43x75nhd3jzsyul5ojewlfo7dc6lpkn7bu9lwhbeya5sxtxnlvhgw7n39wfe3qqdhfkl5r8qpejso9iotaacjtkk0aq9awndmt24',
                component: 'mgz2dhxa5lt3ngd4hjgdle03c2ymczdnds68mpcaov06x8egjcsbxvulhmagvo7efoui9vp66eo5bc2o5nos18ev4xgap66tpcjvi8aueybzlsafp8bzzssqcfk1d1hcanpc56ymkmaitp6khkf4nbzz28mwz2me',
                name: 'lht1l88kkxfnqhp4qlroymqmmsersf70m9nulfh1fkc7jvmll70a4mug6k8rje1hbdcfdmru3jts2uawkjavc6rfg2i5msr75bhjouciktzga9voey806kc4ipf0yssqm7ylizy3lcw6ml028j509ymvcwng16be',
                flowParty: '0tjez9g81kvs6mgzj47i7yvq72l0hfvd30h0wiju1vjmewxfi1i54x732p269u9p49byx1pbatszxnmb4op1yoc40morf8igdeayf9cmeavgjoq90quk5f15lbv8v4t7ewd1bd4v2ydcvq3pjk249ed07g8pcnq3',
                flowComponent: 'ftf7pbo84hhi599qxw7v9qpn2qo7j7zinif6ifpbrkzey3l9tr8ds1284glwclui6a9l330ihiq2wmmqg4vfhpuzzw37r3k4nd4nizvvheazkawrsjn2cltgjg051y5tmgeip7jd0rodleh28pnzceduxqp0fci5',
                flowInterfaceName: 'nyne20pl4qs5p50k1qd5s5zprj8w9bguimid9t9uh9x8c4l02e2azqggww5ka3flwv46egzbye7xoogwu99tjsmzozhpk243srh3gry4fad3f0dt48ph2vpv8stjctn0tbgarxjpeyso65fr5ndjqn4kaon975ef',
                flowInterfaceNamespace: 'bb91mmbc6bwwgxxbn0syjz3wznyqms2i2lmumebjup6n9ym4rjwmejyx8lb7kee5m453wqb4dlbt6qi1uj40egxyjm2v6tfpxd4wfw0r0v1jav8fxnbx0ny5lyxm2dgqe7cledcuhbwjdab2u82jlxudnvybtdxk',
                adapterType: '73iqbfqrqzorsjb4bh7aczwwdqzymliju5rdnkxd1vxcfxqbg8cnt2gebcg1',
                direction: 'SENDER',
                transportProtocol: 'k7wfv282c2lkp7rtk99p7b38ntylpq3us8lv3g7jkqap27xfhs1irt73oate',
                messageProtocol: '4ri9qxtvu4mg7tty1ix8xolx3ftffpxtg7p3z112onilb8tvm53zojesvo84',
                adapterEngineName: 'lrj2l4avo1wqkl6pa8hytwefs1cbbjrroozaxz8mtuhmux8vd6j8268p3ne1t626o58icli5i42cagi0nz3qa6qkn8ofnmv2vwsbdbymsytzrdrys2ku8r9hpn2y7w8rwk5uivn9b7ajfubzp7cv0olhmjfzpn86',
                url: 'ka4bi2rcgn54x781uxpqvdotlz0ac3rduo8pl7hdop8kfgmmrsialfqm8xbabqx1oxjiht6ewc6rl8k8dmj9x74grsf8zjtoogpm8kgjhltsxbknfdmsmk48h1jnwfajy6451pjomzfpyxe7qi84mt4apk3zr38bsmgq5n29zzpzmxcqf5k4k5adfb77haencfc0h60g31mn8eifxvhzeq1z0h01drsnxbgaq6q60xv4reypjw0d1sayix2gc8lxi9078yybz3hz0x9craxwvtn40yx9gmv4zrct0ju1hrrfz48okm8uycmxx4sdnb3r',
                username: 'c01o2weoboxqgatnf33c5c2fd2oleyhtsj8au2gob8h1bfs6b522zsm7haij',
                remoteHost: '29q3ywbfqqd2dtvun531fpbex980dnpij2mocnml0jlyc2juh4p1smew1gurw7ic43md4wcspy03jarqzs82bi7ifczl4l15t0bw9qsiclwi76bhvfdmizif2hy8r10vjfpmcxx3wbp2lp6yi9iypiansqlaysr5',
                remotePort: 6920479825,
                directory: 'stxt80vsutenqli7pyy7g2nbwxzets7tfgo9kbasgn8dt25y2e1eo4zpjhkv9s8jwgcf8qz11ish5adihmojnz3852zyntyerezudxe7r9ckva6einfe2hiz1kibq3wx8183xaxoq5npz725dbms3of6asaohz4j71fkmlow48u6r4kbr1tb7ynozvf2ukxd0h6rygm5ysth4b5dww2zcxoeaa2j72w62i1ip8bmgwn2ire8wr5gxzpgemrajwxnqwvns168qq56zvy1mlts757p2fsx2vr2sf91vpqqys1bljk86mcqt0bvdp84gdyuvzokwht3mdhu4jp03dofbe96pnq8quc9o7v0tlq51g3z5cxqfa44enmy4tmms8vswdgbaabcbf37zuhku3x85e4m3j1m6asc18c28immxmmorium81x6id89a8d9z6cetntcth4u0t9e8ijljrz0o3xc9eao1z97txnu137khs6p8mx715misyj7a85xslm6gtbolom95jjc7yrywtsyjyyf6jst26yrjavwrrs564qb9cww3wkbmlbht1pnnqki7hturmtx0ej7waemz74qzvepp94w65tx6pcdsngmakmivj9wpu0cuhm1ubfwyysj2ydhmxo1cimaiwe4yz9wribz168mkeb7l1dxg5jrwu0ser0umrgrw5dogqtpcy67wmlq00mfhgye8uys7vudo43cfkkn8ye6gsc4eif4weulikonxlcnvvcc3a855jymddu02mkpz56ldo7r1oa2bst0s4vkoo6xra9ahs449xsx4ton0lf2v2kco5py4jenbf3eprrmy2q0vkof4ti8x78nzwlczoqxb6y94xpolspfgp1d00jiz1ou5gaikd01md0qza2epy6hhuyzr9qah0ibq9rjmg0z9v4u22jwl7n69jx1jmpwsrxchvhpm4fyp3824tdbn2lq6p9w7t76cqi24j83ecuax3vfshncf3x5sehuwk08ufm189xly553',
                fileSchema: 'itvg7ayt2fwix28iksoeyv6xy3a53vom0hs5hoa7vf69e7qbf89c3zgv9tqciv5uuhv7yg55g4lqs2irt43z28xia1gmv0v8uqpfc1bg23i8gkp7rkchtz51rxhqqkrhynth1xmqtc5zz655bgkyqtxkjg3ra7ntuyd47i66vid80m9doaluh2co71k0tj7vc8ygih1fe4i3x8pr1s2inilofxi3v9gdqiehl2e1a3q5hl86h0dfrs6q8142q5xv9dyz77po88nzu9o4f3qzbke5pmtiodabgjhm6i476sgd6wkh5amuor9oxj0k9nkzzhzp6krz5xmmvg6otgojyu4vm7rkit37r530wp9hr994h3dio039g6tznvtvja08k9f109f1sktve4wy1m4ko6clytzxy79ob0dsajsqs12qdq59jksp02ocgnst7g4xkvow1yg4gw9mjuggfqncye0v7y6omf8uaxc4ba4v85hknt8ddgkk1386w9wfsh8zs6hb1x3hq9v571ctez6kkyjlwvkmcftr76lak0xq4bc4m8o991oonn6e4qzw874rg63ividv28h5hft0p9raeja9udkcbovte44f1o5eheg40a8ou3vq1sneyo5t5dskydsurtzee46xkeby7rxbzd3brv103jjfws2u4cj6um91d27n05garwbjma50fv8dnwrt28vbhyxuq5dai2egjyuw3lrkxlejpnrbuta0wzeme1w432rtwmd0ctrq8cq0m5pzf6uj4ewmhf76hm76hcnnwydf02va9u7j60ckzgvk9hon2echh2h702uix59j49aq0c7mn0sw19rb33sl422wgvjgv64kplbgalf5egjhdrx6ngqttcwqi3ssowsjhftb3rhqweuq3qsrxychcj7vy995seyz0qygsq12di3k315anskwe4gkb451dv22ko5k4xb6pf5ey7fo4mz3krisumeau935mwzh8356kp82mgu9x8a8n1dncgdcwvrk',
                proxyHost: '534s2teqf0ey5clf6c5x5fwat1au7giwdvvnba9wchvr3b521u1c1xo2tjaa',
                proxyPort: 7590975043,
                destination: '4wm0x8w1vmltut36a7rl9uqnnq6dxqj9q81191mhyoz07besdgnwn1h3040r7z0hwrpxsjuprx4dj1xewpaf86dtwo343o3pwlzipx84w38icdljbf3yw80jafcnhtws28gsgkhes7vm2hnho2f235fpahzc0co5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sbq4f7cvphz5vm4fn286hu1egdz24un4wi2oe9ebgmkxqnlx113jgjxz83mz43ds4t3hyte50agg10qlufkx9xjm8i292kq48dd0mtn7qckekxoo6ihu0emkypyhbw6m1f03ym5y82o6h72kjs239z7wwbjps00w',
                responsibleUserAccountName: '5uo6tepsrl5tuehvmlnh',
                lastChangeUserAccount: 'fouh3npqfhq6mq1768ek',
                lastChangedAt: '2020-07-17 14:45:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'rmnfgcorrmj46wx4e0wqr4u3llxxk1oxu13rhjtd0ekwtwf52h9kcv8ul5fva2u5k4m3i3ud00gh1n0nl2fvqldebrjs1vmramblo66h7bjigwdcx95e5bfzo2yej7pu04fkdo93458uw11g9sepuuwjaa4ihg5xj',
                component: 'dhwhhzh5fz2b3hzvx2kxs0ntxzdp5l0omcb7i45ynmvuarouq6nkjamf7vlsrl7vx31toas8w4y0rq846qltbsgh928ajn8by8v103l9f6547qd2ybokhvcdj7rbizypy74dq9e4i3fyli946zs07ks4p1s9j3h7',
                name: 'el692c4iiacxburkwe9to2m2hrm21ftjoxfp9d1vk23q7ezlwp47tj2kdtkprgzxsn7n6k43jjxkvq9qt13jbx9mzrp4koqyr9r7l1eceyfhs08jk7rvsczwcpoiqfn0otvmoupserygrkwlf7qscbw2cpqgui09',
                flowParty: 'fpg9lqva7pdlqtnw6jzxsq634dhio1bq4gl0zqnhi9z0h9ujvzi1k3vc2x0pbxs3lo79jwbtzvh9ybkkf9yum0ebntg9972ucyk0jgbm6l4prwnifc6wd82ep2glmcbbnesioszwuovu7ta3xfd3fl67884om2sm',
                flowComponent: 'no0yq551t7uctw2zlbinh5e2su8i2wfmsv9drv4uo26a84p8mz4vv92wipwi7v27irqrv5eu6b1meb96v9l5pmelxkudo8j6982q8ze996y05kwblad94dhkra0bftlf93d4rihungdemzol99acqq3vcvsb01te',
                flowInterfaceName: 'f7guk4ssgk9mr4hoye44fx6qwot1urugyxieocxcie5vxuoznk3fzzirgrn3uo4o3e0az1b849he33084pzqcdwaek2mf9olibbbe5zlvh135ug8nbz29rtmoch21ouv5ds5j95emtp9eo9zv19y5kt2n6mkyqhi',
                flowInterfaceNamespace: 'kq9fky5m16h70wenofh98ajbdlb1s4ldin7nqr4gztrirviuw9oubc6bst5h9b9h1v8jnz4b908pno4kp4w1wavd2zs0r0m09urwqq8hxjofxts5i48wicngd4rqsac5754ztz7lpp6c8en19enlmnat9j75fj9q',
                adapterType: 'wzud9eopflpvlx8zi84sy2j8mkb1yj0l7jpv6t4hotve90qbiz0y9ocg2t79',
                direction: 'RECEIVER',
                transportProtocol: 'yq81ig7j2fp7l0tps72n9zopklnh31y6llqmrf4v517iglkvu2o3y602b56y',
                messageProtocol: 'ga8tgmvvyabe1g649cj1jt896fh9rprn1tphwb51slo29wpmzamlmqy6nao3',
                adapterEngineName: 'nalov7fcxt7p5jmcyea8oook537rwz7mr9x663ktv9eir57shzu68dj8zqhbrmzfx6gsoejeh2se6d2x1gnhawp0z2jkfk0efnapuwmbnav9be7ryl41ddhr7m7gd3twgs1jh8r5hymufp69djh1mjsa040rfdk2',
                url: 'nrz7zq9f7xwbb0eyzc37evep0j3jcxk2bfolu7obepcft0xia01ka1rcatmz92u8lubiqt728b3qgg4r1iabtpqrkttuaxdhtpcvk8jqtwz2zxq009yctnvwaehd8aix3ge6mgibfrg41pjow6i2qvqdgipwcpx7qcxs1g2d3kjrq7bdxvnktz5o24q92fwvkx7d65ykm8awalrfxbm2n7vf352ljshvyaxp1mnembrpkv5278r91nkdh6gph0xm8gsz7l92hb6o5wo6mw2nzzsh0feopaoyiw1x205ice0er22n33rzxe5h9jwdfcw3',
                username: 'l4ujmlsselie14sd4l2quehnvbi36vwy6r9hivq9f4e7eo2huwtpkriakkk7',
                remoteHost: 'pmcmewja5kqgxhib1fvq4kyyqucxlw4llis9drk17v9bo2zia9twghg4vph6uxy7mufw771i0d880oi0u94cyzp816807vko1ifp4asolu72mgdeas80asjbqfigfn2k6qtdirpsvj5o0ncz3sckru1a9xq5mma0',
                remotePort: 1848520216,
                directory: 'ar9yie0udejb6t8uaix07yugf0k0ete2czxqohtg2nuvmgrct63dec9eq7j8xndf7fbqt5rwas83g2on4zo3ktyd3g6aexrru3wcwmvfxzmr4969o0gnocqg88fxhtuq4ht9phpntgkfe73pjkdg0df79kvvvi0lz8ej94h12cponxm3rn4dyypkkzl0nfjxfrhr29xt8gm7hpfiqd8azvye93b42jptgu1ygoqgzhct95bl9ftahjetn8ddufjubjtsjc6wtpggk3sfgnk9s2i2tj71c036oyn3747b7zdtsapfa48s9lljvk1dc9dg2g0w0vn3w504rstywtyczsv8i1k6ppa3fcmzqw3830wmjbpn6rwgm1qowj5zv2wk8bz25vzexsri0kxgovqfo9gugbq53mqo4u22bfq2zqgn81c7tuweyogp0u7gpdna7pjur31748ghrwnvf2e3zqknm0tjf204ups2ilc2e2irwqop4x4kew93j8sy21lhsrl7cgzvz2lj6o1mfujscp6n9rtmk2bt4yfcgwjuxwnq9l9l41e4l5p7rdsxrv2jxf0h9ydx2iojtauan09rknw0kuuyhkl06js9vz8bo4u60ixbe4qyk8pmesut9qs8lne6b8ol0rottdm8t7oqsq2s932u8956n9av0x6k6pbb2n6itgqc6ks42048e1733o1l51f5kodu2n9ccfgc4xbhfu1ktkrbj4v3kcg8e16yisgamxz75whmnq4wo8t51i6py527j63dlz85qfuy0dp0m08p9u8ukju9gddjibq56dlhem2354u5dmvlfyhg8j1ow1iq00haf23n0h3f780vzty5slbwcult1xp461t0sggbw9o52bq2nkr83ot7nvt9oepa8q282pv597hyyv1r2tglhddhpi0r4xajwckabraz7e7suouj2plhe02b48cx8p1u8enqezovif57xt4utwij6530lmm20h8hz4le8aosu3d81t8mycmp6z6w',
                fileSchema: 'fm7ksjiex3wqsltx4nogzbcv1o5knodc76q6y9uu2o09zwr0zw5qw6jq3uwcpi0eqt9nsjnuv0hkuepvwih1w7q231ci8rzunsq3ybvvobp9pli4aopmihx0oapubkchurhv61zapmeydrrvnzbwgeozx6g6cf5hvrwurfkmydgu4cov56oav2qya0nw0srby2t927rbzse2mjw965q39wurq631d147jnl9mvbdvenls090e98iijwe0qsghznhi47vvjfghl4ka92t4qdrmi46j7a557yqhhixcezjxxooh3f3qj380b0agcqg3p9fs17oz9o8jl9qmz03xvori3d7ag6anfcb4ksirvlbr95cg9rx3wjuj3bdl7n8360255ua5zve0hen1re9v7v1t2yc3i60i29orbm8ntl8k5vyky8lo12bz6sakhq8lo6wlah83xvrlr8tljbxnyx9oukwahhqt1ggteeztrk029hij64o7v8igtcsiscwmmw9kw683e1301e2ekxyr2cp49w7ri4947fpy3gabp2t91dwhemsk7qfjwu36lujtpgqeiey8dopl6i070df8hmtm6nr9zeheumr19epcm32sa26n6n50zkpj8o7etfnbkxy184ol2mmxj3tvxlkbqp3zogeuss935xifo5qv8z0rje5fuptzogur8hilk7b5kko7foy4woppmeotfycsngf2ti491xbjdseoooqt27yx84icurscdqrjh3s37w56zhozf5ydwkaulijxkxjirh46b6uv1nwkti3p2xpeku5vtlqu6dh0hljp1t806jdf02e984czjl2da1pk9q495eifsms1is71414rrmajekov4a8vc4bayfr185qarohhm6caebxeqrlfx6wjmntc8dp3o3jvcfthivtqqkak1syzb2t850efvzwhcw8v7humdwg9kyxhrf7j419jeb26bx4fc3lqdet2hybqyxt3xd0c97je271igle0rk9srsw4itb',
                proxyHost: '517x8le8tzlgy4mlaiznkn5lneek5vwxi2z7ghqb720u1ucf02sl3c4iqfjb',
                proxyPort: 6424835331,
                destination: 'p22caenlpl6ab52ytna2x6i998g1aha82okcwh7wxyw8wkmju8zjrfqbhmmgscyyqq8n8w72ww8il1l409nx5u8v8dqa974ibp09lu8vw5pgxjoznpwk0zr7bhj619gu939ec679b4nkulzg93zgkbs5wx3j6k1z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1k2awix1mndlzbn8x4rngfalw2ofnmp5qwkufbp0zl4q0dlhmqo8dtntfmco7xlf8n56zykutye48nb8jefsqh12b7on9yuv3pi2zhf5xkdhrbbb7phmnm5c8pp5dy5fpyjwlr19olzwdmv2581l761a6ybw7t1m',
                responsibleUserAccountName: 'tmeqz93hqq0mm05y0f6z',
                lastChangeUserAccount: 'm7b9jv9icvj58dlirh5l',
                lastChangedAt: '2020-07-16 18:14:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ajuyf4s3f3zuppulpkf6kkuhsg6epmagxewd9pq6dv9qurjdu29zdqlrt5v7ustmpevqsf0246kuviy2z7xixpiwl002t5xzwluf3x845ni5hd9h4cz5k2kxmni48054bomy9644mar2tses0ozcrm0ju3juu1s9',
                component: 'ko6pgl411pw1wf001hcjaq2bg0ta5euvqbnb8i5oy4ojqp1bp16i9lotht8ihagjbqcqx82ciimimpz7scvkua17zl2qwgli0z6v7jdrukc78ds0afiaiamp6p4pm5y6zuuyxwjhkka7651ss4eltidosheq803jo',
                name: 'lrpph4pevbxnux5b1fwsz91m6azhthh847xcvy36fbzgm5yzf7j4za02yvmgzrnuh95n6by29j8tqt6ovs35qnpnirk0qzba0zsgdzq5xj3dps0eivelomse6lxxjhe5xb8ep0l0jsmjr61w7z8k5xheykm3fyqr',
                flowParty: '9u859hk1bp4v4lqzid1k084la2a52vuc31abr0l9hjko126nymx2iju9cyjym7msx4keeft5y9t83nsbqinbb7jf0xd6gqr332cnnafxh8142772rlazd5dfz4y5v3qm1tdqkgbjevb984n4sn6smrlwveq4e0jk',
                flowComponent: 'xlr5vmmp9s1byqm9t0l6rugiv39kfgkwqny3z2y3dx63zy7bncgyfczoq468mj2gnis12yu0ouuhprkj1i24ncrr9fdugycpvgfxavs512fi156y20o6bdfpn2qra1btlll7nv0r3wsja5xzjeeqjh749sy3iyir',
                flowInterfaceName: 'mud0znsh39z378opiqvjorg53cwmrvqktmlzfiomrk864mvbdeqr8pfedoik1u040044i3o8u02il80jmstmuwsp093oue7u97zznxfva7tmqiuv7vni1aw4krigxklc9baqo0f3mpgyfehv406taymyb4kaflx7',
                flowInterfaceNamespace: 'iixzflhq862gtr0j6nd2ud9q9rbjuwdmyvqz6w4cg4o6vhfj7j3pa76a3555mf1par4rp41mm5bej2slu6muv9v925ib8n9iy5pbz8caza9lgjn690rb0r8o7umbbiw2f6cnzy505c1qq0xkvuxntlcpq0baim64',
                adapterType: 'ycx0cet4vw6jhg5m29ffflwu1ump0qcmylvgwsdw1imq51qwkkiorxvwe07u',
                direction: 'SENDER',
                transportProtocol: 'fu0yzvcvbnstraobo5ige94gbj65q7bg53wa60jkzljz80nhg7pheabcon50',
                messageProtocol: 'tktwfj8d7qpnsvtjyhp5ukj7vih82u9ctkav5pkuwo58jlh6xdp3iayog7gj',
                adapterEngineName: 'd6nlidf14wkc6vsfrjtczz25k7ouvxhoaxgz2sgx6bgcx6b592xe8jmdwigb4nqr0kj2a96ppdqywi84rgyjzs8g5zasxz35075iptxm7bjy9iw3hfq40lda5kgdaakou3098cnzdq26um84rrpboinp5gqka104',
                url: 'zxtiapm86974clx3qrlg4zagypldbquyxabhh8mf320v9olr8vlucj83jnpz5d1gv60sdkooi98znezhyemohc6bmbaji1mm21qb8qol0ui9ppoiqhusbcpnewhwlygz2geryuzjz6bxhwjja900wsollhy1gjg5k07osog6bs4df290p8brrjjmt9mxrtugxc79mcd1kphf1v8rc8sb30gfek26m8yryj5zc7nht1e9m1qbnk01q5sg7pczxcgwb8ccl0d2ocvvknxy8by1f92sju6841w0wxrm90tzdmddkurydve35gpr8xarwrpf',
                username: '12z3g83phumfg9u8lfd16afbss134hy5btcsbd0nq1dlt0e5b41xcnqn9pxl',
                remoteHost: '4cjdki5390plv8pluco3hi3wice88vmcq3mie9zsh40bnpqn12qnzxgtwiz0ymqs2w9be8jg9awarme8w55fjkscjlmkdt0vs75oh3bqkvjqvsrwdpaf8e2ka1gmc3c1p4yuj3vrrd1rq5lytbl23kgqpy694kt2',
                remotePort: 6991155234,
                directory: 'smb5uk78q5shfnpmsh0spindnam98nti5n9xgmusg0e8br99iyau3uii2l8faiwzapau6exf7qmalwy69r5m9l1cqyoxwpl8oz6vj92yi6bncpfz4e0r192i5ob0av8nhu641ba3kt7umpv3hhlm9t8bbp23boupbsxfknsm22xz6x5886oo7wg9fkb3m1ckg1e5tgsbnci3kvrpoef8ckgtllqkg2rxf4mm6frhajv7znujmt7jvheony66dkos32rfyimfmda8mlg766qr5ai0sb61bxf4iizuh3tzz84agijpe41a2ptfuhkh83h9skjkc05rcp1j832ayx20y5o8yweiw45rzpmohjvadoa6mfy3394c1283wz2ige7gfgp47cxe9etacozdbm7fgnk95y9r7af6aie3yezr1srumr7cxu53d8b6hv71rk79vddhjhbom0ffvqjl3hpmt57bwzsqy6ufjl0qa08fwc1xfqtcg1hzucjx0e10sf3ylghpc31v4cjjru6t6z5tuqv115tsfa5us7fevjvvrfexyjpoiksasm42j7q5xrxi5tqmnmlw7nknofzxkw09ajo60lawml12kyh25nbl945j81wgxfcq6ofw38owznx9a5z0s4shupixh7nobs9tpw7onxamwiqzybkydrnqtcs27ewa44s28a73wpsi08umkae6t317zw8w4ezjgtyco3po0kkkzmpf2i6sfarczz8d5yesxoeoh8q6dx9250cfkm1z7bow8en5dw6rei0u6v0ajlsjuw3y01kpqadwhoiyxr7ijn47hr1sehf4bltaro2f4wl3leuzz34ikrs92mwq5eah2ngoosbd7fq0jxuqxzjjclneb1cwcrc7uahowx31q5w47hfytzp4p6m0ci8d4zu9k8hx50rmbcq63f9zfkj1mqqmevaqlvhgmdtc3qsai8mj6bxl90l7wi34mrujyvp9c3lskp60w22c2hnnnbonqi3pqcuuq903iohw',
                fileSchema: 'zf99op394iwfe0ahe9ucyzm0p6fqyl8ny4i65zk36b37gcrnivgqbcvk4bw06gzsjb143xn8rs09058lcamhgwvt2u75aj4ktw57e0tvpjaw8xmsfty03i7uem8do04hx2vtew9mebhahae2r798m2sqvef3rq6z995nsi1bn9alb949mj9pqkedq9c6sf2kvfx4y3h3ve4m1ujqsp2yfmw6illb4oyoml9o7gi977nqw14vpziaidj9qguh0rqsnn12rrqgtvze83gjxb5ic6w63bziqsvn14jo7tusf7fpcwil2pbgrkl2dc3kyfbcve2r42zz97pawvnghv0yy68b3vuhfu62fjyv2su4kaojvrtc9igpclls64wnvmvti72i4jbqigid9tp77iaj9wzwhb401v9zwphhg5q7rdbg6n2ol082xh2ns6q5rz1eoe2lvxm8hy8no8w62gtutd98hlu5uadbpvl6bv24qjhn59pktppgp7xuoaf7bwdvu1oa267fshdl1zfr0nswre4l9twudzhb4o79u4nvz1bsd8igx8v0mwejtv1who5bbp4g4uaugu64x165sw6k079cgc7xjazddqcxzy75k46hmcdz2fcu5uv7gp78dwhkp6vrcb8g6913dmvck72v8krx0ckyfpafrwvdajl56ncoq4djsijt0od737a2p121amohlcud7ldhfn684ntrtp6v9j9cym78ilp0r9y7ikvwawtvbf8dwdrvgbcq0ja9vt1fy7mf4hg4ldmivzybqwf8obhrllqd975v7rmjwbv6yby2bpzox50esbruatzlcawnpzua74ne5s1ifg7f3bp9gl6hxjcw8as1omwk945y3d83kcufifqkqamic3di7oz7rpkjqcfd2uz4y1dfexqmydnvtvq2yqnyuk9rhn2wzfrazmph835watrt4wgu1movpdh7sidsxawmxrhzzccj6pu9ypuoqtaxzitl8h1vuhetg58hh5olvrni3tru',
                proxyHost: 'notqs38smjve15lr232xfo9w5l6csdoowe0m2bpqrabximg69kp9fue471me',
                proxyPort: 1320161444,
                destination: 'jk2un0wrla7jda6arc3ca1zq40vhtyv03b9qz49frw6oqgmk6w6rqrtrvrdwtm3vso5s3u993248q1p14l8lzboj9uimnxrqyelbk233zg50w7pkswj54t10iub7iyq5j2kwet7ahcwg5nzrsb6bt4dq7pfwckw4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zyljpxnw94hpiuy28d9y8a4l5gc44masslzzgwpj96n27ncjnxe6j1zleg7vcde4n3ysk0mbu626mvofhprorvruhj46uwxkxuv86uclfhlhjx3jpcebz3l0ge8hzjf5roxrozaszdymrlaeefxrjmf46hh8e3wx',
                responsibleUserAccountName: '0powgfk08ff9sm55a9ce',
                lastChangeUserAccount: '59yzkrkcaqxmhu3k9wbc',
                lastChangedAt: '2020-07-16 19:11:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'zf5ed27b24im7mbolz4myabg8nf40f0nmvi0t8bt22dhwlhf2ci7307jbhkyr3qylv3qnral17n9org8dnz2c30iwtn1cu0fk1h1fgnx3a5sv1dae81t3kt3cdj2vgod5yjp71k3wlqwhdnvdlgemm6kjav7vpnf',
                component: 'f51fh9wvxuc5yw671u1z7y5ffy3gcu09kqjwn9w4g6lxoz8c4aljo22m9hb6m4d5pterwksxw40s7do91dy9xc39oc9r5d4jsbu0s1e2n76pli9hnn8b6h4l9kr3hzmwk5ya1m0vyqcb7krzvx8uxqaw8wliu8qp',
                name: '3uzoq917ociu3we2g8qhvzeawb2vnotbmn99w6hkwgubt596kfcgmpgr1xb5ley5xv8fiv6bshg6596j3hzwogg2gxzj8x9yz8uaqwiubntk64oo8lgr9ncskthan587ba2q58zqwotutgvpxrxn3wzy35rip20ac',
                flowParty: 'zvam8uc300gyduab0pcx4mck13xcdzzo0y12qaaflucpk983p97tbvapzzafkzvo50412yx5xa2f89bqvxaptskuyi5xj59w7miyp0v5rvo0uqi5fmbmtl2pe2bsm6pnpq09agg6p9czcg81sp6b6zgsqflh6onh',
                flowComponent: 'c7hsfzi7w6zzswzww5wvc6qn584eyotqer36z4ytrxnm6mw66ki5es2h67pyunf7ep20su386wq4je7cq1wjz3leg1gd6l4t5jyv2h0pwd6xi0h0wy3wv0qn09ec2056bwgqzvkcai89w0ko8ec99dp8hnzvvrf6',
                flowInterfaceName: 'n4y3c83mlw17jkmoyutjfwcvhz0lim4ekfy0v6fcl191b8nwh3i2v534ec185r4ay7yqn16wpyafdl07nwgyjatskr5ljs5qoojsg3kc9qcbu05dh79bgvql06x6eoeoyvtte2uusirc5vbpob1oj3my2kehj3p7',
                flowInterfaceNamespace: 'rnwae1fhi4zbtoyxra3z375k5rbwfsa5zkf10auvcgp4qm30lqp9ptcpyvz19yamsagk9gatjekkx8bkuj71y3txv8jy4ccdz7luvh5ymtju2ownwcrznyiaac1eppgq3l95fhkyxitgbu2zmpob1twvkt7yhqur',
                adapterType: '2p2bxlf8oanlw2upqszs0a2ieu9m9xy73dtpadgz3oktipu9t77gpcda5193',
                direction: 'RECEIVER',
                transportProtocol: 'kqxeuu2vfzvbn3rlxlubw2vjqnnsd787j408n1nrj9mfj6tr2ht215415dpf',
                messageProtocol: 'xyp46pzh3um0b5s472951c33bwt21ci91hbl55yd89bg6dhnkfumejmug83m',
                adapterEngineName: 'tzamdp5650hh11r3dp7v343jgy5b2jry4n7nq968kt16wdq23vavxjz5gjrod2psqk8rqnbeuzc92o6djalw9p741gez1v5ta3obwxtifhkkoqm3nkfmm99eqw5d68v4u4o6njh3xg68vls7ioq0cklr5w1wvw21',
                url: 'd0bshrxhnjs9ut63i48j3ywnj01lv455phw58izheuovofwn86s3xo77flddpp1a05if5u9e96w390c9mmzj9s191o4agnvhnzploikfqajnuxkleuxwfqao8fb2v02f12rzoc388yr5hhxiju4f0ab4vegriojso92u20oqv45utvdoekxirima1oncqiu716vmem4xwlxdvb7bjd9n0i8l0q67u66r8alknziwj1bh2977ewzx6oix7eo928bqa28wcdfj7eqv1t5vimw27rtsrz8mz6msuolv3fnlgour0qn1d36g4d7q6d9kiabb',
                username: '5s72mvg0fxtal2etgnxipo080s6zhyiq7a3t6nbdjddvi4qb9uoonon7bkdq',
                remoteHost: 'nvlzy5zlac537v4jtcvv8mcpb0r41dziad8gc9gm0qqinusq743mc7dalam1bhep04dgqwjcxeymwnlpdz7qn0dk6glh8rymgy3o6y30jjyjc431hg5x1enfy47duo4n4b3emx4ub3658kd4xkogmw48x20de0uc',
                remotePort: 6802379834,
                directory: '3euewpmjts1kvx4jk9nrq6k28hartb46md68qwk51hvpwzir8nf28tki2yhaq7qpo9wg0y9a44sk96s0n65qkwjc3gdjhks8508pasmwda3p5zmxvhrdfv5jthvdznuxuj3gmnednznzzjg8weq9i5ecji5ibyjs24xo7zwepbemg9pxcgelbw2qoi7yfdgrrz60qi3eojmwyf7cvanji3pwfp5ex1r7umxewpjhd247rpkp4wp10n2edgqrdpchl2a9miwgj82hvieku2i7cigk36ju2xu9pyma9lb8lzxksft9yrvtwr1cm1sx4v5li1uunz1y2vbytq8lp5xxm77nm7d7thu4ih21nzx58nnmztdvagnob4a8wir3wub9r3whgac54on2hnw4qq3wjhwjqte84r1k7w45q499bmheamqihqaeq7d2qiengy6lesu7mcexcs9hmrpuqd117pab243s9f3paj0izllm89jil4mfjzeat89hry0cv70uur3nr6kkr0k2j90gxgkn0g6bwhxwfo0jlokzpymgi23vj118g4t2qrp8fo6mzahbxuclaca2cegqkrdtfb3xqa6zyxjcpmb4h9w5az5x921i5oslkfqg3nuwtf4hcjqzkon5urcwwbstjsocv4ssvm4vfe2docwquoyw9phlvkety2r9b9891utet8hsjr6t9zhytzqcbc6v2hufmdaivl0y4srphcs1wlhl9wzjyc7t0k0ogfy1z6qwnt2oak38mvnx3nml0ka8a0kie61hvoieugaa1jzilp2ukr6savreng17nnwpmej0y9z06ixirb8xggir9upkx2mi1xdacbsrmy7sds4hr1tvgleljbni5jjyo7hmctsws88bjc6tqbvbvk6wh92t1mb8ao1k1red9uesi5maha2i43a9r38bt7ksmy0jr2ckvoaashc22cjdszjm6s9x2bvh9ve2gy5a6owjn8mn8omv2chbneoyyfgnicqysm6nnvw52rx9',
                fileSchema: 'y7t539vjv5l4azazodbucr6jj9l682366zzoi6w9yvfdgk7t23mkia549z9tmw6jjrtjzrlmsgns4ibyciigux7ht9y446tzjzz22t9vchowzbgrz6rsrd1bhr28c8872nqs15jr3v6vkk157lcv5g6ex1b44p792t1hoeaz8l7vrutzai09qg3jjr8slafntsd7m71gamkfs7bj5frt5etugjlqt1pz85vf81ytjf93nkdl9kmye5wp9hy45fdvb2hnyxm1sakymttqqtx0mashg5npw73r25aejq3i5xmsv99c18nulgogljzdtxplbfqzs3l48bkj7gw9kl5fe1jmc74xvwsnea6gf7o9googb5u2d9uosqjietkcvwwsgdh5xdck3xm26yeyecmkkzk3pj3kcb74t4nmqvuxh5tszw7vtilmx3te05h7yctplqt3lwboyb16qyreiy80d00ykw0022lijhqly2gt7y0n2j7s5lnhxh39kyepw9qcjexo78b9vihxs7joi76xz9gupe4suqb5o4zew09pwv0ljmcid12c2i39l7omwx8trb5uw7apzvs4psxpkabcmv7zx7z2rxfzax7fexywyu9nvwgrv94lnh813ayq06pmb1w1994piuycbra8bz4tdeeemh0wda6qivgxeq0jxo2q8mmurld1cjcbht5d9kbtjrfto2lmpg9idqsvarc8jjli8tzuk7sonopw7ep7hs5uip2cb2h5v8606b7evdmfdtvry4tpdxbee1zzpdb4nttlafn6h8kozxbmdygukjvhxd7176zn9jymsr4py43onnq7bp7v4cq5dijbw2q4f9xhqb0ojm3kjepmuukd05jesh9kr70yc9u6oe99z9xxlok8lktaibr47o79ut0sghfjtrwf990vnutrzdm6z6fvsb6be4v7vjrp0vvr8ch2q5fl6tz6p3ixzgz4otcx3mb50ls67g3vcdgcfh8fky34sag6zj7tr1tl80v2kets',
                proxyHost: 'ezyudoeywmljk2n9312qaefogn3wihu58mamtpl7jadvdiw3pkivzy5ssqms',
                proxyPort: 9883363458,
                destination: 'zpoigtakqtf5rr50mkbrpqaejzzbm5evrxv87k3cotdo6c2mygthadl3vlkbdufw8ghcgbvly9d5dbvzmfmhf59gavcude99ckk36rnx8bzydmtm8ol2xquaae53oqqhi9ssscsfpymcrqznsjnr7es2es3wzbom',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c3rz2t6ppcn4mzvnykqf7cxbu242f0arwiwiiviluhyn1gc6yjimsi2kndlvyw2o7quruik6puv6mfb9waqrbadu0d8tohcj84ghkl08weownphcoayt888fioup86fxo4jl0q61fidtzb27fo84yfhwdtnrxavs',
                responsibleUserAccountName: 'rjhw9pl3ycq60ms3z681',
                lastChangeUserAccount: '7ms13v0pfdah832g3yb0',
                lastChangedAt: '2020-07-17 04:06:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ujprqyayauvjutzdl10k6l4pl9gyckfsjaqdlqy13irlqanxm8z6qwilaxoly11d8zc3bietabjy5bwfcedsgisgcbl0z9yhq0kr839njkr4croph4yjfu9t7z0fubwvpy5tdofv2sipfpyukxbt52sfpk3ulylm',
                component: '16gy39j4v1pworl1z57vjcdgorv1x42li46puwfmhmopns0y1q4gfdk2q8m72olk60v0ujm8muurx35zyndspyfc67ckn5dtwtqzkqun5f8oz17nx77ndjfi6ft7dr87trbg4ry1a6kyt3yxrg6wxwh6og1emcuw',
                name: 'fodflrk0s37uky2c6u0kxguagzjaeomj5fpmdt2loon5pmjtfqire957m3mfs4nzz8ckfnak7w5ctiey0ipr06c8we8rk0f5cms2fjpjjhe6p5s49bsiolqiwlbs14cc676948nnjny4n51l9l1xkkukk39j89pv',
                flowParty: '4gmazr00qztjd3aq2zmwccmyp3et3770z8r1vedhqxark5u7t12o8psjruflr7wqncgcrqkxhkzblnqpncfsrow7glf88w1n041lmnvn49zlemm2dbd9ulnxoesrf53w7rj6p1lb1ryv3gfzi18es672bg3pau89w',
                flowComponent: 'ptu275aa8cckb394qc93zljaeabyz5q056uyiir1f2k91cy3d4ay4htisfq4uyhxowk351vomxvgmyn5ni3whpy4mjk51rgdfx7jiov7a29jzkt81gujdh2shepzebjktcmp7j6pb8umxszrnphppwiugrxt7dza',
                flowInterfaceName: 'mxio52f7chpq4txdtlz8fdpb739co19b1axtu0d8rgauhvyn77abgh15i1pxl8mkvxgo4844ubc1d9aoliikfap89gctv9obhcgyf7395d9jichod26qfx0mpu8m4je81iitme25b8gar3zzklczetj5c2lnm1ng',
                flowInterfaceNamespace: '08zbj7srzrls5c03tyzx7qo4oeqv81hsrg7abghx98nq7hxp502qm69ete6uo89d8tlzxsnkgimbj8uq9l0nzy2gcoe65usajeilbfqoufryd64v7m1fifgcvo603sez6901bxkzv8vxnx7sk5edurx7nufr3rn0',
                adapterType: 'envrqieolpdxy47f1n893wyvudei6yauz8ncetzenoo3f19c1w7485dp0lnv',
                direction: 'SENDER',
                transportProtocol: '97bj9xkttriz20b2c2k6tw2wlixi901wsovwmik06c4anaoktgwpkfy95vd4',
                messageProtocol: 'aagxkk96pymvk3f72t1qao21stifjeou7ofjh3ijirrvj9ovn6avy39wdxgn',
                adapterEngineName: 'qoc2wkqkcnsna672ltz0o7uy42lhvjr6t8sqdi45htl8ct7esvtxg8kj1vys9p6f57l1j8beet9uc1c49n1kj0rx29jzhufff3pblrh2khonwi1o5a47g1zwz96t46n5c26uaowko5ucin0219p3jie6pjn0zcj4',
                url: 'jp72axr47x7k0l2pr9dbu0m22kcnn0jazzeud7o8tft55odk7xqddumzto9eazixkmko9wh1wjcypcv4dzjczx6o2yud2cmvmruo6gk1xtdh0o06l6zs1njnvpkla8xjzvlm26lrpgk7rf9gksx4iarka5y757ev1fayv58zhaiimhzxeltuzu76b2chjxpn4z0y69v0gy70t9mrqnvfdmzye88by3ht9qbqr6v3htxtpn4lz5omckwameu7j04u7q6idj3xpnmaxx3ab4jeelivcmfr0ibrmgh2fszbtca41kovfiu01jekwzdr0wq4',
                username: '462i8gebb647f1k75cqfot4xroe79jdwro5w6jdnxas806vqgpjz7m8xnuhx',
                remoteHost: '7nnnx0uimukpmfm0tkak20hslg3qf22thv03r4vuullepop5z4fa871wxe14996egiuzwx5sm8ulich3cr7uth81of712e01bned9z5al5iixi6j0ea8ku1zplc0akmrk810pr08lgspomdiwl5req78hlt26a39',
                remotePort: 7700136482,
                directory: 'u76ork2jnd788hqf1m7zci1ri127z8emt0cg1bweqvanmk9df1vtnzur3hhimjqiycq0zejg1177y4jun4uobhfsvftzyoypij5iuwpfajb686fobbobkv6uxumjk37u0mta05265mgr9qwl1hskmf5aksmzx8rmb9m0h34wvygw0zqycjw16xh8whk6uwp13iz130qttx97z6onrd3wz5wvig9j8f2m5cm0507k7oy89ebbkd5ls34kiqewwmpymye11etrgso8lxeh9i2dp9wu4ywmekttnajg4n3j5capyj3jzoq55aeieln7gxmhi28lt7r8ce4l14b3ztnuszrsw7v439n4bji495y4g9cdt1tdvzxirs0uewbgar34ncfjjm7bi7w17fzilcxsptjl51aj70bulxr3c1hd2o8pfgbgxamo6426s1q7eyl417fkbxlz0sxhs6dqyyyzpyamtl97veac2mpbcavhs0yggkoxeckk97y0j1t6eaa4h9x5sd5ny88812cjesgetcp26ok58zayzgdupfvnk7q9g99vtydwcdnz09kapi4b973uc0ovujjxwkmpofequo1rtibyrqbh4omkg0q0x7n8etjqy2etghl000oq0cuspwacwvu1brax2gz2bh4oznp5equl780xu9ycklmj3s2cjp2k6sx771bp1yh0sh6w6zefjg7izgk4g81annx51kznczrw5kz5jkd0vngyvd2ikr3x6ucdfpdnt34id310m8hrh04w6v2j04wrwmws6zg04ezfeq4k5k3owennm543tz4gnqwm1vlxo0jt36urz38p1ywr2as5r2j7g3ca7ext9j7j4tnb375bnffgkghd3ocop5ldq06f9gb4l0h9sikusvo5u3l39jkcmpak92ti7572zdt1i91bf05gqbwg2f0yjthct1rq33eb91wqkfwpn1ed8z9s06022i9ho1l17tlczuvtrvzfo0k3bltomfoxv7abr55y71l4g0wq',
                fileSchema: 'kqc3h73fd0076d6gjo557xn52ai42ns9wg4poyfs1f9cu4jxuuh0opda5jx8rfb576jzh0sjls6oc9zdykerjfggibbpqq7dlo91cqh6pjtdn732co2a32im71kvbkbvvh5otsi3sazoxixuylp6l64pr92d5mgkes0oohohe7dlm7fjgx387irdc5gwg40jgeuo8s84btprdtxzsk3hhgcxsttf01347drqs5j0jns5q6o1hhuqdpul7nvvibz2x9qdzc6d22j188jh8e3ihifm52pc88nprpgbrzldjuj511g51qddqe1haomaduw05lr1ohcemj5bialv42akdvnahcl4ja4n8rlkzos7mbeq7xwqry3tmk7ta6gnvp81mxwxndsdveqbxvl2e3z1ovunwr08pr4h1y3yr66a3pkdqzgj87j96k0j5ybu7jd8xc7hhrvnor6k35e377rf6mdyhz7sv7gs71yyn39xgple4x68a8ll8ywin5o9h0j1g1vpyk55kiao27p45tm8y421nfphimcpy5gg6dhjamwz7bum9ao0g69sf2ovhluhpyuntayblmnkjdb2no1gbln3bvw19zgam7eq0r2xaplkfm7ojs5t7creze8rrfy2f1kcvaqreuq1stms7xlhsgzu8bdb8rqinqj33mhfqev9oeasbzla8rlixbkd7bwtdrf6ciadboq6gylv0n6rvm6qnswzllpkh4bnjc8db9njy9h0cfjf0ayf5ray9nq5ncmq6ew1njv6elvmejlwblx82fxdcokkwf6gzryhe16l8yv0whi5kg8y11wkwgdhnn28murdsz9mo52baumr26jt5vo5cgvv4xp97gcwcnexyaadwuqujt6inmin2d9royap2xjv42qhv3nim1b53u1afatj8af4aizr6bjqte5st3u8mtw4nivfbakdenxi5tuhx0kgc5gsbubrgbckh3glq6o4t3qjyq0pm2psa7q6i7j93wj7pzh5bm6py0rp',
                proxyHost: 'dqrf9a8idurqdpypmlz4s6yety6ze7h0o9yyfztzgl6vdgvhxc80g1v7vt2m',
                proxyPort: 4856715951,
                destination: 'fu1rwfd013a2g4oxvczge80hfrzklr68qumcb12r1ielrkkshxlz4a0xi9xthc91ywmelix2e9wfw9dawbpmwjxpyscbh2z6as98dkgbkdskgbdq98eb8bhk6r0hrazr2hh7dxky85j5szw67ro9hg4j8dwurmpw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wk71d79pr9u9nmlqwghtafjq5i6qjtq13sl49gzhkc2n5sybcn6a93ioluxn5cwyu6ill1q6u7uoaw8ri8f6jl8z6t8epwyatna5uc5pjguyn9vw1xyqe1hr3g9vdmnpppw1eyzgu5nbrh01hhh3kxw5i2k2v377',
                responsibleUserAccountName: '2lh8tegkzpw7q5z3rc1s',
                lastChangeUserAccount: '4v6yvwfqrzseer2zek0c',
                lastChangedAt: '2020-07-17 15:35:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'xccff4ywjv6i6wmvckhq08sdv79zganrt7ju73ti32mavq4s4sxw8xq1juo4r7oxyjs1srf7y3a6n2wj07ok2wcvjjovtg0r9gffik5sg6jerwwe2a4gqh0o9vxswxrsv3q3ka52p95qj3t6strxv9atviyov3w6',
                component: '0d3hxc64rsgsg7k2gtq3yvpgjzxvqb3yif084a1nao0k979fth4k8kcys47xqymmpy6xatzyjtx6h5rhbx7lkhj5oraizt4xj8coovbgwxitoz70en3yp5p95341q4isdp69i0kolpa6yg5j9j2nfchkedfa7wrz',
                name: 'y2xn5x5vo9rb9em7y0chlpc4jxazlmrkkxa16r50g5z2zoudsr3wr7cigr6q0q2mp5x94ggx4g8lf0amgas8h08jkmzv2eznkxzon4qokghgfy7fioyd3fjpqsoca3apm1ak6qn30a05wfrsojsk93aslypclme2',
                flowParty: '3oguvcclbvttzowv6wazv6j0kk4i3u3ur8c388e3qxs2tjzukzzwz3jplidvoa456yi07q4dvio3i42c48owycnb4r6dcxgcea3kzf5ea8m58mru3c9gwvrfdafwcnwnba4fio2fum031xf7l4fwaulwbsc9j9g8',
                flowComponent: 'sdguvdzg4awmv93odpbyjpdqxbmgfxix74sg01sbtktttnog7zkkuws5tjamcx4yzn1u8fpcroa1ahzed8i5kn41np97xpzmwfk4wsv816vj2d4tcis66oqws8kzwqcbrnquittm8m2909buxd4ll44ze77ng4jek',
                flowInterfaceName: '34q8kkby8cvek2ail9swefj9n2zk7bt8ioijh92tmwcku6wk6kqv3i3qfjy1lw9pblc1hny2xca1ijiuiresaudwq2kaiq212wl5c8plf3chhtthg7sst5lxu0aea3nc9g5jjhxielribfhbk1v3zo7tulcqcqu9',
                flowInterfaceNamespace: 'nd34yuep9cqpsdt3s6xqmne45kmo46f3c22kjkfjlvblva38yxo4ytnnpuibyxglt79ajhnyq8dg4l3i64mtvpn9zfv3so9dbvhge6nzl84xpfx84az8nz2qgggmal4cplzklktlfvxtzgq18ud3x6nnc2ddhdl4',
                adapterType: 'hgz2ue87q37c6bq1ksj81enr0uoqo8noifv2ctdu2v5y492gdawvdzsz0xhi',
                direction: 'RECEIVER',
                transportProtocol: 'qljogahjm5rnmqoxug72mbi1e5velkovt2djhj8qvw5a4mlz35yutkbilype',
                messageProtocol: 'lanv1p1hw5hzwq85l1z0ose0bmqzo2dd3qsegodiamqp85sla0li30462zzl',
                adapterEngineName: 'fz5gnimgbr7f0jonfdgfy62q0bus6htsioeexe9saq0hdcxx6dia15ao1xpdk741kf4izy8tad31zkzw41p88ler7hhqh1mcbkd7sd48musdl8prwep0bfj27d4f3dnlcfigrqjc02xrr2ospgci6i69oiidt5w5',
                url: 'xo9shfg0wt72wpj20nsbrun2nh1c8th4hwlb8yf8e6f1245erim8r4ipbbhpf12j0cap3ue3be7spx12jdlnyp52tabvlpv9och2bdeib6cmz0b9pej6u4ugmdwl74dl6y0flhvcov0t4ulmgdkblek0y6ty1a4t4i7esukjnkdeb9t3nhh9xuvrw8hn1612nj8rekyufqna18aw25hmhtbgnjgv04qal2jbx7mut3yppzn2h00qxlxztr5g0qgd2sz1kok9ei7wbs7xueapca8f92ahjohinfmdr7b1r98b37ecpurvwi3406p1w7fq',
                username: 'jffehh21eondwijzjd4bw09u7azoqgntjsejtwn13ecvczddci1z0am90yar',
                remoteHost: 'himlhcohvr7qz9i2ppwgxcyhphooov2kl1hyrbow0uszfzx07fk1u0fj4om7ox8zcjsi2um5a4i9tvttaqc83yz5cmq9plt0pvpnuuwjdjz3rs708ejknu0zf2z7bsz91zjh1dewwxohbwtjj260pxtfd7sf2ou7',
                remotePort: 1740129861,
                directory: '74ridzdgts279u7uyvqxa11steuqs90qmugyht1c6hedu1ek0yw00ja5d61o8zm9km5pddnrpmz6sgkd7fly13wbriq4vyf6lmyvhhc6tpniflj1mr41as82ch1odr9me0cqqmllemyqv9kprszcsq3byjh9662vnhcsnftcmis2vu37nixw0sw6vsn61zpn6lcnmiauaqrlikq07lulb14rjzw7fqlo5e1l0ug6uzs71znaobfzvrqp4qoa2diq8aostoi4lcpci3kxigl8v8lrd331tt7u4lqemx43soaq7uiq2j7auszsx78zmwd5m2xobiws46315bb38hzcibp8ip85u9kxlgtm5gh7anrg6zrk2eb9ybu9hdiiziti2ijecuof97ipioj63uky3bsm9x6c6kwgcmm7mnd1vxbndejwjou6sxoxivsvtduu2ypgv21qfqmlz1fqylfs4viatw49pna8wwme1289jty6kivaa9kd8tzr102kssj5cng3dsw2362f73aecizihu9ia1fsth3b67lrrszvsfsw0xyis893kleomvstnx6sbjpsm0ri5evuhcp0htfn3paj5lggwh5qe17abt8h8nxnkf4vo8twxz2q5qgx4c5e4h10rnroa7f3dbao8jkzsgp0de1qomh53rszp3cuhct1xugxm4b6aajwhwslgvtooaketyni5roz4vokznceyoc86vhsj5omkbmadykhmor251z9pxlw7abrw3qrl57zde3zeavhvl3a49b3riajh58lvqry9wle2agpwz4y49hxczwe2zjk32uta7grb7y52crgrqwwyswf4m2t3p683w8u45n8ai01ksw9z51ey9635y6v1rrnpdiqdljmtc3qcvtpovjsnigazeru017qinw448qao1e0750041tah7mkgtumicr74y8pwu39fyqarjq92cijj3ta6x57iu7es1xqu0804i4x7r7y632s6k686rm5zi340agyg0i9aq0r',
                fileSchema: 'e74e6pif4gatmj4zdl2o5kztw5ujwqdujmxu7opiwkosxe0tlvxj5wve382wqhx7ocxe7f5w61htc1dzip8lnyownae2b9h64xjumaia6afxh83x9vyanjy0ndesorqff1b3vlirk113yfprrgr3ml3gw1d28u7tqzvytzs5u0jzt1y1tr71p0qrvdf1ivpyrkdbuo1ok5dmkt6dl978y45et06hfgoy9g6s9vnt3g0j5ex2x3r7xlpzz855e2dwg6rf8vszptyp0g8ldu8b7mb2lqwokt01l9ugwbmb7dnym8i5d67ysouo59xk82pb7736h1j6hwcqe3hz7ofi1g7g1nxdfwswwrb3m63y8ujqeulxjqt6ochnv8bq42urrylszrlpk69iwoop6uourerlo1rf5t3x0mwckl41c5m16c3wm1o4vsgf87o6aeun5utae3rexn663z1cfzx4xx3561gpd3t2e8tiazdz9gpvmrpua4rob6mkuxojq0pndafnhr6x3h4nmqbslig4gqlmi95bb6j26bgt1wm2jm4y1b703hclwwi2lipmq5kss3ceh0crjbw8qt69i5taov18ndpqqqv5ui09frxl1yr905g5z6jdj1hmr9t67wk27h0z0xie5kfporj9z50x3mgmrjmc23rokuyzoq1xyzzl8evl20q5ioenwajkuvuscb36rk8ou2i8u551iykdsyyo8q7cele88dg69mlh1zq5jr9ij7374fhsqgdkhnyq68hal0d6ilrlu657ngi9s1cndmg3zzcrf3egzna60269jgs9bnl4f3ykjthqpkkmeb9x4hagcwqvrd8c47079xe7bmdv17p35b7brz0s5ybcylbf4sumvrtqv1uz2g2k11b9dczx2zd16k1wktweri5e5b14yapp5h0rzr8rt10pgrxagxdsrszxw01gocjmi44cwf7qatqr3vsnp37dof1muxoqy6rl1yf6sl0j4kpby81v0a62prujpe8ztyf2',
                proxyHost: 'mi0n6fop3p4gsbf35heqzha2hacrwxegegagkd308na93e87cbipekt2466e',
                proxyPort: 3057823964,
                destination: '2oxqc26qxt0qoovumwx6ncdf5srmfe5y1bavda42nwzuo13zus3xk65dqpry6c0appj4xck47wee4muhkqt86f1sia4pmegojua7lu8lenbbcbmxcbrzwr3c6w7nrzb51s8r5dbvmv47zp0iqz1a3atf7s6fhsi6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8fc7rjbjuvw58t3u6mha4riz4n9wsah1rqwexw4rjrgx14un2ryhutjzvngrvoi9mze9fkokg9tntyrpemkoevyubreqk5dt8j7ndmjo64lqc2pwagv3nc9guhkmnqcg8sjoy1sebtfhyrtqa8rilhpy1jgrfia6',
                responsibleUserAccountName: '2d2zlhb5t5licsyauod1',
                lastChangeUserAccount: 'p4067z57aq9pk5b28r98',
                lastChangedAt: '2020-07-17 11:30:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '3kwrwgi90uk8seil3l40zb2bflnjl25bk74a4psc8r0f8a081myl7e562yy2ne3qzbd8dh316tjq7bgh433h4pwellklbmqpnhmnt87os6ufpx1ca94we3onc5hnep45kxri2prdi696aqz0pav28hhxk1btvxf7',
                component: '79vss3823xq8ye5fyp6360tzm44x15xxx4gyo9yz5fod6tebkhd7cjlz60hft25n0qai5lf2hwag8o5nf0w9klubghaalovx6r49hgmmbg98qm50o7irul4mi5ym3ev7u3w6loeyme2jxjr1o8zrgk3w0tmd4d4p',
                name: 'a9jhd1dz4tfsm6bl7gx7vz7xfws6eamtrfe11ej40cxik8szhncq1e7c60quewdayuryo47ecf8gomfbqbdsoxnekc5brew3haogyhq8x7wzckm8z4252t7vaimiacs45oh7hjkaqyaxh9fw7a98zug548p4ssqw',
                flowParty: '071b580bk75p6evg8pkfivle583hpr0uagcfj5w7dzp71qt4d9vyyz1fx34z0sr8c2q9hcwlvfusnhnph9uurlsgmvhcs5he966mkiwonjvsu5fmvcovgly33ed1440njtewz8adkr33mb8wjubg53ni1njkldwl',
                flowComponent: 'crlisinxm1m85msgi5rhpcvxual0sygtbe7bje1pbolh7s87ua9ix4j5jun6zhlqna6zh0desxjxv7vq75rgv56owxbs7rnq2v9rw77igi7qz0wdsv19tb0joze6jbg3mdm4mnk1krlhu1vn8nnbe0vkpnchimb1',
                flowInterfaceName: 'uesc01asfnaqbb4nesow8oth92na5q0q3sfc2ut3i3q5tfngh0b9kedjg398m0ocag5b6tuv4nsfjz6t4pc47j2cv1as4iomdpvhp4kkjfbh3p5u58otjs0btoruka5dzj9oj6sof16z5r81h3dnsjx10iktzty25',
                flowInterfaceNamespace: 'xqqabjzc6tgagrlgtnp3vjwmfm2tt6h7rv27a0twskxcu298z3029q181udo9ukjm9mn3h2nilrtrpkhix3v5xih0v0ahtqhsf1iw1oydnglqa5t9ka6oj23o8jnh2vy2gfifdl5my8whj0qjmdaq56xdtasy2rv',
                adapterType: 'k3znnr0heh9k8rs7dzotkfbkuvx1l390ifx78y44qm9i4l8ue2rknv37x2vb',
                direction: 'RECEIVER',
                transportProtocol: 'lejny10ry4nkaodqm3y96zk9mpv6v05gz31x6jyy64nlx2jeigzclq27qwx7',
                messageProtocol: 'kq23dhminst01y2iudl3iwh8lq6tken5sxanix6124dglbu35lx8h06yjnqz',
                adapterEngineName: 'tst0f1rg5eaq93o9dsax2ro290rmt6n6r4uvvlj9kies3319dgb6g339q4b9tpv5mzvvf9kudzwwu37zj11bho6wvqlj8p8ubb09in2z96vb4jqlwhg7fkqlr3rx98w2as3cuprmzo59ivbbxcddjgo1qnkhebmq',
                url: 'lc7qru2lw2a334vpy6e0xnyk3tu173zfue55jia3epa1sydgw39xzl99nps99aob6avz9rxhk10scy7yw4s0m4eomrmesxu2nodrm6re3o0fizzryqi7yedgtudustg3egdegt5gzlarmoci8dd0pnnjoxq0e6bsen6mcddgqgn0xkt6od05s75ayz7bbz0uozlkfkeotkk1pjadox0624d678qmzyljxdaobwcmioqvsx4w8ykbr5bndnfldj59miaj4xyyjxjivg4dfkr2ji500oeuxojjdoo97du26h7gztjah09qubntfh10cacz',
                username: 'sttkys3xo69kuydd4db1lpcj6cfij1i7u64hth70ezyvy9okvdh7eacm17yw',
                remoteHost: 'swzhsm7hg1tnij3p8k9ed00j70b53qcyz7mb8zd923p0tj1jtju7bfoinpv0ll4xcfv7jm4ebmzpvuciticgt3luhcr54rq0kxr59rxfm7yrikpuzalx1svy504kglt6djdxfejc8dlm1guljj4qhir11b6mi84u',
                remotePort: 3144190413,
                directory: 'iqazc3uic3f2lw0lvfyvyt2yqme7xvula665gq5t4jny58seihx858kd6dejpezteum7954i9gfexk5igqis2yqc53200diw079wrqf9rohz3ffgrrkqs3zxa16s3o65gwa36n7xnj37jopq4ppd9i0d5uts7zfrfvym00uj4p8u9fenntiyuy170boirampb2iar3saqvyis37ffi4uq3xgx6fpd4pmx80hfg38916ye3amb2t6bnpieybq6481llppfa647infam5tvytk6mywjg9pi9i86wnqqgymym3dzpdhsj2lde578sca9531c7k3f2pamorpv7qxcrmh8qok1szfi2i0eg252ykxnmmx011en6m136nlb4l6n44k5zm5mblw7mjcu4nnn0rq7k0uv28h2t0hytc5thv6fyyujhjzbyg2xredy7xggv19atyaxgusx4e6furce64fyjg2jnwcau7accmxa8vwkbfmexm1pkf5zgx58er3ya7iogvhlh8fmnkaa03eincvqyrp0qxjvo56dnwruurikzcn8hgly7euah5h3yxfnp4ej8tgcpfv7j1jwvj6xxlatik78nd98zvihmd3dk5gb491dlrytzwof0ebkn2n1s3z03gj1lpkdq0fj2qmqgphvsjnn6k25ffvsf72cl39w62dzmgkdebpydrg9ghka770nudbj52xnltp3di8mewswtj5tzri16i1qyql561c8oy95naeza5uf35k2cali5x3v1n3mo8szwl5dom4yppu7y3p33yz1srkbf1eqi89xnmtxv9o5x8ucs682ixl8zzz5p7vt9uk5c70pc2kod31dljar7pdh5ewd5efhjar249pth76g78qbp2jiitoiujx34e2o335uhc05z84yi6fqhx5xs4carhxp90utl7t4ei7n67erahdox44wcqcqj1g986io1kj04xmr73o7s0e2vktn19t6znf1rmn64tirfr4dmk5tqzakflo4wo65r1r',
                fileSchema: 'rw66iv4qbjo81a8vb4kk6ok4r463h9kdqgs2yrwqrvrqwppxnk0qdedfpup4yzftgefqprfsg5hw5pg74gtysyhaqrze3maji4p0uo6xh3uypdvyt1yog5h2pu317n1u775lwju6l0ptym666cop9m3m88oex7ls6xdid4ojr7ek3x292w23fxdxlawswp18vbkmn7jrl921vbt7j9v7gxtjil0c12093c42g4b8shbjrltawv0h4taqsol8pc95adxz9d6uszdrwf4ld4ev5rqve4wnm93f26f5nhtlic1mbef9qzy7xx75lt57eemo7hi8htlzt963bh5x4hefa5w5thfxs3qkh96u9a8vmgwh5t0z2qxmlanxyk8i2l6noje8tipyhl9vnjwk8bl09bwtv7b1r9eq4ja1y7n2wc0n5sn5cihk13k4ozdzyd9jougtdh7mzaxcdwvdc3gtln7tsohio6h2jeaahq0nn2emu6m79xt01fc5puufg37qwbsx47sphut200twryc34mwa1nbaj81qrnjgbnydv07ff765a3mrr1hdcqjb28jl05nktsvufw39eh0pglui5sjw3a2giin8p505vnk5gsmd1nbgaz89v2dhtqht81kfrijvbjywvh9w825u4649w8069nqz4mhauwv5ckagwfuy4sheqqs325yxcgxsocy148w7ty3e1z5zem4x16yiqdcpd5iw7fnbutikb52qyeps4m4i9nxw40nhlib11zf75j7ia8aev60v8xii6hmth1r8jszrj5hdqt495zubdvoaf4d78d5v98pldmh7xtpf2f152vl6u79r5omvxnrfgs02t1az4ofvuujtxdee8vxrvuut7726fft9ba58vrt2snjg0qxt1bf76ls5alscg7h40w5dq1fg5o5sisxgmeomrb2vyvjbbjhra36ldajfav0418fi8ubhx57tef9og3jv5utzxiarx93odioduloyqz76hemawb9v7kvzxju1',
                proxyHost: 'mtxvd49b4s7kggh1of7wsmdvxhkz0ev0hfp7ysgn5i1r0alo2vrfoejfxgqi',
                proxyPort: 1678185756,
                destination: '0nb4v8mqmh3pv55ouok29rjixl3n4qjpua7lyrl0qz7beyctpves3vo0vj5i90ouen1woy1uor95ikj56j1cih9u2ls0f4gqnh8q80mbst5y7rwr7fxhx55k8ma9z43lekh9ahdylnxi8xcxbgu0gprvz0gwsrvv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '631cww5m2ep1kbva4ccvrzqv8dze2kap4u82q6i9swgo3x0psdbet8s11yi797q4nzcuk4i9m36eunmecasqq5ds27xhe1afnr4mhxcnbywbngcvpl0a1406wbosrssb09f314emyquxmyo8efkl42361n29ifql',
                responsibleUserAccountName: '13ckon6hgqpvdx9sg919',
                lastChangeUserAccount: 'dkzvkza6tbilrufhsikc',
                lastChangedAt: '2020-07-17 04:51:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'q0hrgxb77iujfmzsxa5cwh10d8mps92ihtgzz7h7enlaj80619adkvxh1s0eaqcorfagnv1jwhhd6xlgtafb36hba2t9tp4zpp0dxwata9ahpq18vv9y021dpu3wkabse4n3rqglark0cg3v2n6jih0mdg5qizr9',
                component: 'jpqicfz07txebxom2wunlyhp3ui6hbcwic4f19alncii4wf183fppx877tfi54i35wqdy086cpm1f2lrj0a7leisnz28mjghkk6xc9f3lrbrbi7tdyoyn9y4vdan1qh75ffam14pp4kifp8gjfhexv52z923v2n0',
                name: 'chujmeymz8r8ngkgdzqaafmydqt5fm475hl6bnt6ugxwygfrpcw4lg3tiaiza113o1vjgexufwp2ixebwmcbvgjg9644trr7ydcctd9vmhcgi9vx7k8q9cjcpwajkiohwoqhf2t7tvqr216bmt2tc0s4eo5dcsv8',
                flowParty: 'g4eijmi9yrd8hdxm3uy6wx86y36huptodr69od4pcb7v9oi1efdnydy7izehakssjkh2zjt61ljlw2ubo69b72thvr1rge49pyknopc2fivurjyainogchsqs1oh3d5bmpon3dg5787g28106nzow98xl7zz269f',
                flowComponent: 'bwg5h89cb9rk3mcwgrszo3mhprc0kefltzdjm3tg5ru4avz1ov5tkoeonzndw64w098q7cv6wabvpng4lxg9qy6lvjc06nqm9ccje90fqw1i1dmvfdnjh6rttmzn1tpy0enx3m95s6otfwfbmlh77mlkxr8xozhk',
                flowInterfaceName: 'u3oacnb4zfi10aalmcq9nr439tq6422l4b6uq6z4s7kvk847n4icuykxax05njmvkhh6h45jw0h2hqlzcaor006shg0pnuhwpq9plz1zjdfhpnyhs2r667wptviq04xesu5ubbl00fhegdx0tk4ix9ypx4t914ae',
                flowInterfaceNamespace: 'pav34i1xqufkzr9kj7kmv6osg2fma32n51cwwk5f5wcew72n172ye7rk4q6rgv7mpc4ql1z9axlgzrbf14valz68fmy7fw1n7xp3su58gpivoyu3mgla51x4uvwp7pnd7zv7pka25deyzhzfqdk8n0oxcflpzoayb',
                adapterType: 'v242zk5oat51erw63xepo8bmbriqoh2xv64xm126mlpa8lbm5ges285971ok',
                direction: 'SENDER',
                transportProtocol: 'afzjjgbf1l22jr36i5qocjqjba1yx8inss7w9iw8uz6q4stw0vqjwp2da2qk',
                messageProtocol: '78zwq2ympc9hlx3quk68fcigcy6osmxf2du1phc3nuig4tbwmf052uoamolr',
                adapterEngineName: '12xgnhojwq8tf42txtv4z951s6dczdj73fgnk979d8ayesy465587bvzoxk7qtvn9g4phleaflgb9fiwn0r7agmahaukhdch77tedzi6dun1svczer6k3qwatlbfdv9zjb6mchgrb1p0ea6viotb9s6y4w1znrpa',
                url: 'dfpvggwlsl9fdewztgld8dfhi9i7ikl63zhds4snj6iwhyf00kpiiepjqybvtp7uldta10znnviw1skc51ccy01no7og4gsygo1l94dg99jdl05hx8cylybb1equ0lxu4i2k436gkvpbqmzkc6nbhnvn2lxoy0twd6wqp447w0axm1x4gyulylrz9hv1c8rx40l8npojaqm3ipqgkill88ob2prwyqjwautpte26ohqkxyqg8ax28gamm8pgaax7zo2ys4xnfk3jep9gbts1dju4gd8l6e5zophhcwtjztejrvhmf4vsn9prshhlgsek',
                username: 'epilvo71amm97kizmttguo0s2p1y8pk73houxq0a2w5bmjfquv43ws6a3fy2',
                remoteHost: 'h04rejaqre4gnwcejqxbwoncdlwo5rxww8gcxrkysdkwcnfgei9vnpcua9j79ewe4p05ldclna6d2x96wt4a2zch4epio1hx7mjc6340ulvvrfjcd9ycnnntfjaig4gfsmux5ns8dd37ekp3ddgojg9zyl3cv87o',
                remotePort: 2176048628,
                directory: 'm0nfhlsqu85jxg5z0ramrbvyds60cd99dsacdrg1faqeugfdou92fgra9jg94rmqvvihcivzv2xptc23eb02nnm4qdf34djgjtxli5f7t6guh1o6k5z6yisfteov9quqwdyz3ujj4jtmlwi1sdssui426re390l0ge06y7shewct2lnkrc2a02beo94841izuoltir2f2wzwo8l1todzfigarkzrg5mblpdlb57r6egkj6lwuvb0v01nqg9wlgmzekl62193iehqcjabt3gnqi4kmq1a4ut98p3ije9ufuxmpel32hnypomd8fgnsulzjlfivhhtofdlf0onbrkj97tzftu95xrex1nxck5itgeu66mf62sojcuw3ye7g4vl6ykxnguh56ihzy34lfa6ffcj7u2pqszf2f35ofv42zaf8wa098rbxgv9513sq4oqoz0aa1y4828avx8428ovy5zl1fuoqbuo8pexu4xkuxpwgpzm0scox4l74cbji6urzw9wnp0obmzlufwrtaqrp8i9c2bpgafczpd6ingmpvnltxqwxdntwjo3wtkv64mq6hxweuxrvljne49neyfgmjz560qavd3loi495gfzkrtefky3nnxdgweeuikb8ovkic1li9zq9hlw0ntkyo5599ewqds80bcbhhbpq1fsbx1grf7jen6rvhigwl4j8d0xwyzdrcodfc00ymksh3esbvgkmx7muwkd7hhh1bctra8cqvdk7jpk32oh4lwcz2co0cxqpmtxsj3hltza9etsik7pw9mapyk84hup2gl7yyw8bt755y24hohes4veu47vklrknx53ml3tz0lev35moa4mhio1omrrhqcnva4qplto8yeoucbygwvlf1zh0yp7al28cfp7mccxgk1irv9yerjcvkhemzbazh0it44pudxhufsc90zbb03gpgjk2crc9rfe06c423qzu5at5la5dc25i9yofzmx5qojvw6usgkjmfngxwdbt0vy3o5ufvao',
                fileSchema: '90lnxtffx6uxtm9ivranchkv88ypdeoms5iwp6vi7cmqxty0zjj96etio00y8vabjjhlofv24zzu4hnm4zennyf5jrla7y2qj6ye03uo59wme8kgpn98upjrmu6of48ct36sbt9jfogefz5dzg4btq5pacriazqqjzshxepw6rlbhlo1q6ck46m27lpzxezyv40jjobzlgok4uaaexgsmtfziy1ttrswunj9y603yxh5d3mq8i3i0vpzune4k2lfqsuioxv61lv3yo6o8omrqgh09tcaiuncfphy6ual9hn33j01cqg8dri8nmdesrurcg4gc3hm9vdazwyhruhwowam8ozxqb4g6k7pvb8y76nyfnqkwrye28qitkwhcwdd8z21tzh6safkvwsnf0k7jrurv88ofjk11800vgbf7srbqu0vvat1694hsqx8do94p0llh612t9dkp03qczkd00e7ldc3kosij696410gsceaqnoeoj93guxuddlvjmr7um2muhtmpb7lkvh4po4kpmlnpxecdh61nn7gab6v7w6e47bp4v8hxl2v96gy2ldkp7p7hs3rtuwjnavqeuiihx5amr09nzfhngsd7xxwn8ad98y2v842wkma6nyhk8ina9hl6wnry5h9opbr3bgk58wqgyj35xl9edz3vccscd316418kseae0zm9f2orf0zk3c6yfrek41k6bezqkalwchtsn2c7jd1id3zr6bmhhqw73imj5e5kuj6gm4la4iwd3fblek9k98gj6dxou12vxucxm8k4010qkdo00qqc9cx1u9d16b1e1q2ldbjb14xfxufcnp3fc0ls4wpcjqzwlos7ugvx01a1rqadr19ierb80i3gz1u145waff08gi71t4jf4zcmcbsdbco2rr9o19yrhezz095x2xm4u54yyt9lfd939105ratl5xz6tam8ox7wapzzpeb35ygmjo0du9k75z0mgq7vc1zgf2deim0ts2lcxokyz4ycnkdc3ef',
                proxyHost: 'ebuzpf5rbujv4yajfaur3awnywl5nhls0s5tpp0kp0xlpxmy6iborjo2oogj',
                proxyPort: 9296280967,
                destination: '6rukwpjgjv20rch0q67m6066sgb6ohq52nuifm2bwt37tug1tndirdqbnrt2c3ft0sjnw7ffn3uznyubk7q3e97eso5y4lj7qicir875eg9muq70rck5x4alo644yhfg4543775wa6ga0egskxkzz5qwpumx7sjo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jtjhzkafl8t3ww21vpu8ky51kwc11tvgrm8rbjrpw2pe0jtu2frqmc4c8s1zt4oll0tqgybnnz4mk5ym9twoy4b0jr1t0o5uly5p4dz3mo8pwgalv8bgt2b0hydpppg5vjm1u8ecwfea94z5gv54i6vefqnfzaqu',
                responsibleUserAccountName: 'hrd74s3h86u87zqlia3k',
                lastChangeUserAccount: 'agyez4n3wc5d8mmvbrwq',
                lastChangedAt: '2020-07-16 21:31:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'y4bqwupx6vjqgt67xnddjlzwvlb0qtrroa9l70phzamhzi0imxg3dkgj4250y9e1ieymrgkx553kuq1pgfqoogm4h0m9v3oztrtwpzyqpihenjlycwf85r3xupnrgfjphu9i87dm600dq94hiv4vbayxi1p38obz',
                component: 'wr7qrs9e5u03io16pyq0mnuoa9hqg5tbguf7jl92a3b54j0cc7o7uifg74jsabpz3cdx7ok1ev1sejgu0jcw7sh97g1vobz09o8s1oxkz0mzd3hn5z83fyja8ft3w8ebzx6urde4txy3e1mrj217bqh3j9eir2vd',
                name: 'd7valdab13y5qpix9godlap42o98lgb8618trvgzg858dpqcck3i2ubd189rjvzpyg2al9gmz96ujasnme0daxk2p9n90g31hbxebjt0pu8uah4cq9v35lw2wgys3a835w61rgb2a5n6q8gnhpz779fz8y8xsc43',
                flowParty: '4t80xou2ifnkvtcyamce3zi2i3o4x4dqt5mzq2oqgms5xags6rhn4jf9isfx2rqwj1o5di0s2ezn9hkmvf1gtbq63z2v834hnyo0nqv9hblv88a8za0214bz2qqhscqpgvdye2vypvgio4b1adty5ogzxrnmyres',
                flowComponent: 'j22wddlyfqscfo5u020bg5a3zwhsew5miagl2rhy8hgxwt1smrxae2na98hlj8eoh8iqpvxjfgx3wf7g8tpllwk0lbnuk6e51uhhg8wwpk5ag51wxbqtuzjko5jsm1ydcnwuenlg21rbq7dtrbjpl6nump07t9p3',
                flowInterfaceName: 'mxnys35bt2o7ei5ly0f844ov18yn9csxtqhel0qeobsac5o05bus7bqmch2wfnt1avyavicdzv6te9xezveef0ej54l51s584r2y96777597hgdmkxrlsqysq5b72xed5ejrr0fjivpbp04luxwkd8ltkkxcr68b',
                flowInterfaceNamespace: 'awoeu6p7i8f2vqyc2ztmkojagzj9wlsvroms1ztncbzfkqhd1wp2oks20rob2pjjbreylhpxnoc63gmldxjo1vbsvjmjbbqjgmxug9ike2lfapvov278v22vv852ce3oergsfr1cu54sibjqhwbhiembu71xmx2u',
                adapterType: 'mj0ysfw4yriddl0bt8enqdnuqc6k5c1g1ayqg9kdasurkbfahxeakvm0xuf8a',
                direction: 'RECEIVER',
                transportProtocol: '36kggaic87lknuhid06csj3l0olk6e8xnu33al5d4qggh675owlhg1pwthby',
                messageProtocol: 'mexht20ajnx4z0cmdwdtnankris8wnimm9id5vqks5qihqgp7nnntqpi6bb7',
                adapterEngineName: 'zwc417y0ienk6m3dnq7944wic1j5x90w8xnbw0am1nip95wcaduzlerra6xy3izoqsv4ef85md6sgu3mrrpq43hs4g3shm2c0v3gs4tc33oslri5uzq1jsnchvw74w0hti9lcth1b6h1ukrop0o6qijxt9z37vjt',
                url: 'w6unbc7p1yd0rnvcgzrkeba19voyst5ev9z2sftghripsgups7sd9hkrer5e9imkzctt19xerk2ec67kq2rn2l37cufun4cs6ulo2x71c1mygowblv1hyxsz4mtbm0tqxns33ka45hzax6kmit1fd7mpqr5ht1rlbd887fwmuda2wl17bvnygafrawvkmz7e1ouqhhf1t3gpvrk77hp815j9ze10is67ek4zux6lw4p3r981nri21ta2744up637rps5pf6qmvmk3zt4hy29p0retqt6am695b3jzuhivq4t9pd6hkonqfvxs4nlr5mk',
                username: 'uegqyu7l0fkfhxb5lana4ycul3460t1u7xdmt5mbpdtvw7ast3tn0jvufkbu',
                remoteHost: 'scyn23s4tu23pjf6jbp5xfja6pcnodmyfnad41y7d9f21w050frqez891um3mhs5p4mfjc7k2o68ucsxqbfu7p9fq2aew75jmu0aym1f06cfon865ngud7uwel1zi2t0bnzzpws8v94qbk3jrn9csxgzvt1iugvz',
                remotePort: 3257458025,
                directory: 'xtfjvs9g9b5ppqdhh14p5j7ucai1v0h0q9gwl5ktx5euxlgfnzcxrv5yj4mcttuatdbl1acv9sy9l6t8ufvprkcz02282n77bm4rek1mz4hfhvyfhf9iagwwitczrgehx7ky73ga6xwjx2s1grwvlhcll6soa7xumy7lgfb7bbkcbv2h2v9w3uvkmw9vyna7xw3u5iwvqnhtesfd8cggccxz88s5lotajlgvxk6b190l1h94fmcgio992fxdj1f69oly4pw9msrt7b1nreousnnwktimxy90ylzshcy5c7qpf846ozasm68lsc989zq8lsxdksq0eyo2y0mxf8rxve1rq6ixw7dq7ux3d0jrhcrp449swnzjiqsgyszu8spad2fbkotfttcynsmy212reqf1mwzybgtho329qoc5n9rsb7worpvtc1m4va64x9e45rmc5b1t4tmns9eof6vzrpol4omq892qrkf7rsuci4p3cpwc0ea1cbuvao4491uc06gnq70sj6nds2m48duivrdm0wt8z3q8sobkztwk0smxpris968h2ea2aou4wg5nwiag66t0oqdc1by4cl4syfo63txfv1qrzdcv1u9p6f4bye1fxz0u0mynqnskz0ib1iz6ymo13ed5o0e6i0qzt2pwwrp6q3m5dwj0tk3gdpnxttay8tpct9g5g2gbpime18aljxqvl64ulnvl9y05lnsqypzuu6r4zy7jksb1hvn83tm0e3t6uorfro135nyei6xtx2jsc8j4var8r1sf813rgmj8nmksfr3m6chtk854owenmk8p5tjqtsajpuqh4d5dtkltp112u1f8qub9qflzpchx5ex7wq6868ttb25lhvl5w5nkcrvlzac6tewk9z8ukb97th3ocda4iqobd1heriwchxx3mmpeqbrkdqxg8vjo04y07itg6cxd1vue32fy8cpt4hojisfa10ggqu1kcrvfdlv5kg5r80bzc837i45pcago0ejb3kjwtrii',
                fileSchema: '43wcxz86976j1g51fw4xxrppf0nbx9hmfi4mv51hro9zl9vglmb8ecxp7exsheizzwoz4vkqsngc5w212f5w8u4pjpbdmqdnmfcw69ti91hhgf9fe7zo1vt6xb7qpplxea6fhghvsh4nbkk26ew3xhxp7zz82ltvmz7w8s8r0q6dlifpfdejrik1103r6b01ppckc0xbqzhdtezmk8nf2ktpemtznpvjexscta5351dscytsmz1usl0v0540meyrdg89c5xwridemmpxg6f343po2bgpjv23bfhmff5rqem7qvilrmqrbzgv8xcsd9xga6zq83xyuonthi74zagky9s4nth44hvamhi5g8dcq5ce2gzsjmnj9nem8h6esc8lx54u9tpw8dvknjh6c7m0pymormg99a2cqf4fo3tjfzevha79iepatdf6f2h0q1ox2vezkwgprpsfrock30xghrm7guvilne55jdvkwjrzy0ktbufp40m78juwrfhfnor57yi832s4pfoqvborkhenf6omql1k9y55meki8nrjon5yn2hqtgct36aj0mrt17canskrww27yiy0l7vd6b33ptc205mmyfaw4blrhi3ixbym8qq5urjgwg7onl4dqoj1p9yk1cds4ciaysmbumqomnuehujqocj68r31cyu17l21nlduovhhz5o2la8c7bkw9l2ztihheexkcx1cne0jb2itkizhncevlts8bcxtsl7gtcyqg06ugbq0pmjwkmm5s71oddtb57hssgbvrw3xki323ee0srihxzghfdwmw7n19wezlid2iqifibojwb5ldbu8e0010c5ltxdsakquz0z59crnflmnp8gvih36acka5f49fszihc9k4oj8ii81dncqas0oiax6pm93lma4hdgush2bgr6soa2llg0mdczrstbfps508p2noufvpdq5pauionvcv95thg8oioowjattqnfd9o57lrw7rg4by10bjyvmqjavyrpln9f1yw2',
                proxyHost: 'dduj2mr6mawv73sjrn8sixnpvvl9x1guj4swmyeekqm4q97ajhlhk3oi2ypt',
                proxyPort: 2030426188,
                destination: '1eh09da8jod39zcnglnlsqguong9skucehj6z5l2ay4f3t1se3uvbr585t49drnfrxjypt1hxsw7d9etujmcjvf700xwrxkt5bcs0a5k81p12jotmx9blt75lsikcl7pcujshaqk4qoeyo3jgr3cnhewvpfuasjn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gclp83u5wh8mh9e3ekul9ynspbhnyt9ec6174184l2c1gb4va7gk2o6w23wogcp7bayv01vwzvtgpc0lfqhsc2dd4szxpd3zejyo0ll0x4bobqmo3dl5cklwmqge3ogp0pw23m49wfcrfxcqx00oxqlkxx9ml7ug',
                responsibleUserAccountName: 'rlgi4wc2ulv0ws0zpqf8',
                lastChangeUserAccount: 'wvr36ztd3ipecr6bo5tw',
                lastChangedAt: '2020-07-17 10:19:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'nswudwuewl98cf5zggu656dqf944x971a47n9wt3svlvi5mb3sleovul867cp4c4g2e2hfmuxtu4fw9j1ucrebw5ypcsxixm2pjmui56fhvmp2nr0s31d453x6hwb1oi9kqpj07upk61qc2vonbdssz1jp7ngaoh',
                component: 'hst18ardsorsz1suv97kwf8zb4qys9b3gs0m00hqz4ookfdo5ihdt4whpql55duykrl5meaa3wpuzg0psjobny7yjvnx91rtlwskmtbblnxnovpl04eutvt2isixqejxmuedyn11f13h927gcs7rj9hm2y5qslmy',
                name: 'tp27gku1f4dgoqshqe91jfpwekha0czsqlc8vl2kq3uiumek6xfczl06uahqh27e477wtwoqyvb2fd7h1t1hb4vxov016n6js7lknmnu6g22eh7686sl8hwfmyjagq2nqgi20exlbw25b9f686ikbu8bau6jgvbk',
                flowParty: '4si4m0qww4ux3r3kmhdfkfhe176gt2nzizbzukkg49wilvqr4vac9cryg78dpjulhg7nauyji3xh48dfini7y1s4te59f7jjbskt3emscwbmuxblxlnzk9k5avb6bgeq2cymo9phm9jrpq3x8u5f56f0h66awpet',
                flowComponent: '1f1ft3mzanl8o1okdj8bz823d2qzh0x0qi474fj63vxzg8xp96mjz3kjuo48jw17r5hztyw7xo9gne42l4q2o0t4tmxrt43nctpsuq29tehsn15dzco3bqdv6qqm3rb12rp6nersrmhob209vz1deae5cs8c9t92',
                flowInterfaceName: 'liaxak0i7y19z51bzhu2wtehrhog08xstawfy1qowuko9368b9cr6fj73jmj9gwqdw9unvdb8c6guzvy0cprwu2lib4s6qyevs6qaivuefx55jtskbkbzkzj9xrcy5a7ukloonvh884m341x4au2oegbrcbj459n',
                flowInterfaceNamespace: 'xmo3q8l0yezmwfm62m1kmse42eqxzfl2geef9nny7jlilfhiivj9lqdymd910frflg7tllpqhwpmjn99noc6jd8tbtw6d38w72f67vxmy5rofd72rm441x6saer85fppezpnzcilu0rvfz2rpv29etqynrk6drgk',
                adapterType: 'b13h1m218gzyo2ptaibw3mj2hxlma25sntwdx7bcjxsbssc61zlcszgb2aar',
                direction: 'RECEIVER',
                transportProtocol: 'iqwctd4olk9w79we3cdstrh698jwxhbowdiigw6u14nx90wjjitrvr864b5cv',
                messageProtocol: 'qys15ilhir9zdtlhgk8kcuj3j980mk4cqd4fbvxzxvv243ifynvm9hdvbwfy',
                adapterEngineName: 'czxjbub3szd4k58dwl7vgga5wl1h2xpzk4zklciyv9orqw37qy0rq8275kkwj96dxegf56lhef4ebjum10z37p63b9lnu62aw0v2n1kbn21agkq6mxjzzkurjhejkbrnuev7b6o1stx8i8ien5nbmbb9bnnldcyk',
                url: '971n3015ipx9j9q0z5nswu4d3o6b70hak5x4u0g620amjhfq3q51u61wrvro8n0jo5n2ec7h329s8wuw0modh0djo17vv8k8cjnubx7wdwc1s7nyagngh8vlrbxyzy24iwlm9yul6mr90orsdvsj7sw6mclp3hydfohxqhk1xf9vr3fvw9867uxh6q25fxq7t2cy7p9gvm8fqx7awk5od0g34oggg1ph7eo271dhwblv3ssqm7lgqu69ow3xx0sykh7fk6nqz97uy9q73qz4p8dhdagzbj9qz16yel4ybuj71ch89677vxehbuzgb7ms',
                username: '9d83kbd4h3s669kz3qzukwsqxn13cvy9x5ahcxqnxnw1orxh7ugvmuaqgdin',
                remoteHost: 'rsvvitfty0ji4neou5v2e92vice2ejltddbck4xqp2vp27giyrywdlu3afg41z35x1y7r6gd15fngl91g6ib1mvzkyv32t57c2sbl34v2x7wsvtotfa7o2az4jejua5mfu9bwygrb9rxbgkic48tnf5da2hjau87',
                remotePort: 1155719405,
                directory: '4c7dhf25elrwr8wkmsns6aw3f8dknqw4qmy4pchx1z4tlsk6p8n44vjtu9kqxpgwzw0antqxfnm578310flzy6dgx5uvz5iq9tka9gr5j3lur6u8xzuolrb4xh20kgvbz2nn2goxv1htx14ed7ul765ifn8nb70bpzxxk18vzdc3crq4q5ab2xhm4y2wcdher8vnu6e4pq0apv3sfw3gwfd9aj1rfuh43c8y1l4luxcctfjhz9hrautumkehqca2bval1lhj659c62h44ov3o67u543keqgi5flpekiziwtq8nonyzk3fzuteqz2n98yy4wylwt0gwfwb1a9ii8mnp4t4dsv2a6tk6zmzlx03s7mqq2yszgbe9g70muzf6jkspg9ctnepz1z5bwxk5y6aux6rbnai6yry1vtl14aw2chahjwigql5yhwroyjfcypj23yjqvpuk4zx9lp4r9n34ibsai5grb8ojnhvt4a7juxfrduzlo5v7y7goi32omyl2orpaddd4evp5kibu8l67pv7q4itxocsfkyvpcbha1awr24p083hn61d0vk6dgkpa4ymw8x35h3lmg2v21x2wg09gwjx1c6m0ffeu8n0ezy1rvglkbz2ak0jymnbf2dswn1d8i53c190ffmqjzqid92hqh3usdhkx0lnziwffi7nci3huipiqex7yyfpvqa7r4yf2vn1o6fxcet3v9whicrny4mes0bm22up1kxpk1zxcpey3983arakwxh5r9mc6zdxuevo1gg7uekm5vr17i4gaysdi5i62g1lvagadbcapykn1va1kt6w0ljybac446t2vbbuiaptybxlrvr333wshz2s2ebyi53d1jdtho9iaeapa9wk4jh3n1v3m1i3gdccstwbwtejdkjmzbnnjeivdo96o20baicgadmah3z1tgbag7kca13melbnuw2i8b098j1hpxvo99afxgdgdkqhweogmit1lydfmfhrw049ay2v8iqo6flwh19de0f',
                fileSchema: 'kg91ihfwiuxx5slggbaid1zed42qaw1tmnf44n6qw3ddb5p7d0a5e2mkmx9prw9ls63vs5rajfc73bacga98zre1qdgaykt7ou1jaamk88pzfvvco1c3tihnwytnd2vgfrkh0x9viy6uw816kh19wvxut85s4k7zdzvsat184vys49voac7hedtq7b4gtwtg1mbj045ugastza26wwrx01gwjg5zzq68dv965dx62jewdiodt65xh9i5twgx0rgdvwlht8x4wj6s5bczv2xs77cuiyyapy47j8kyrd8hlrh9cuebtjti347t88uj76t3t1hb4vnbslevgrpmawiium4tmcj156z6l3c89cy9z54pi4rbp64wfjxflpi5nsx3qnyxwz68bkxfmk2dju2w0qoikyimi7kdbshhfnnvdvvgiizejdyll2ow1wl1gp097w4bbu50yd90ptzqkn789tef8qslmenvdc25fvpvwgfnz3yfuk28q3d8ho0ba4sf064meahb8eutoc2dbn1mgyfpklcxliqlh4hmswii030x4r8jbsnohybe2vu63vdvqc97il1y1yww4kbwi5gaxf68zjh49z3xlbml0mnlkeq4nrd55hsmonjpud6h6y26e5h9ib0ss6gjsnzggcnv5a52z4wkturv6ibwruzh4gisxt5q08fo4628fy1v16vcf34tvvc9hvdlotoxzdrr8mmv864ibawgt3wat0bhs2mp7gna6195vh1pkuc5k3wxuarahmbyb4y9gw4r6in3fbqyz1q0mk1q97943jlgfwtmfvcufw25909o6da6a7qy58gi88tpzgthxy506vgtf3j6yb7yt5pzbvhcs3vlrurzrn9q6tewk6q0bg5273m084ppl4cugpcr3d49ek7rdhytz49jsdsdb65h2oyvw6zhhedfm79c2r7oxvobgvazshtytyoi1k3px8fxh10774h4tbwrdrszcyat1kdgcdybpwi9g60wzz02deil76yw',
                proxyHost: 'vsn103tpbn7dqyonuyqukketf07vq1wy5fgpkdqsuwxo7pogp9oxjl7by0i9',
                proxyPort: 3785191679,
                destination: 'v9icjfc73x66b8biq2re2mocf9mkma6nw6y9mil84j3sdac8lxd8kjd0rnz69m3e1qe8fr4k1dw7vwokmo5vrrtwiuxgy94tjpulyvacspljs6fz70uis8huwgcdwnkeqsrtq0nt8dllimhdxttydnogw5j3swj9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5z5nbhosus3r351j8sjzdi6g03x3dp6jwlfiqdmdsquz0arr0eujl6glxfnufb80x3xxuij1qfw3l0w743nc7i6qa19cp22vm4o02rt7dv29rh3v1fmfaamcjfesutyqy4w72kfv07q0gwq40w8swarjuo1azz5n',
                responsibleUserAccountName: 'yoork6hnggqek3vfcjsi',
                lastChangeUserAccount: 'hkgfdgqxzinkxib1josb',
                lastChangedAt: '2020-07-16 18:12:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '9mcklb2h2a1zn1bebk7yuip0ngc7y123f9jvr7toxm1x5l08dgow8b3ifgrb7cowvzuqggv70n5iofvyj624hfsdxa1d3tt5xifr0ht10o4x1ks54umgy7h1abi6wpwf51rkbyshns40x11867059crndb1fjavl',
                component: '3rdrp60lc5bh7xjayw9if6iylkw44gf3u663i26hnjqm6bz2oi6osd5zwsezm44fvkdb1qwaqyt3jra0ks0s8cr2p1w4s08bqghk943r7edgfunac1me8cpbm1ecp9gybt13gvv5i21o1gu0we8u1z92k155ii1q',
                name: 'mw42xmfsbm2b65v2hepsakbcilst2td0imlo1k1gncrc8ucjh6qhm5obpaehwasmsxfqjrbz4zfcy19awi10qrbyduoaqs8xl4oxb7o1tzj07sx00i0krl39xb6tghcyq373ll9yz4hqvu7ga4wqcr7gkaz8e0q6',
                flowParty: '5xybgqdvl2twsbxu2c4oxpv7ld95tu0ofbyad19fcodhce9bnqq2a3gkbki10v7vahmfplwoxx0dwa6j6nsaxwxvv27m98q278pesasv8qpsvm0ddjfbcua1ogjnjh878mv3tdbfdwyrh4pti5ykccuxuzlqncvh',
                flowComponent: 'orataacmxgs70lxsu4uj2glk69l75anaiqdu0cg3fedy5uqoenubwz7gzhe5pys2gxd613c1ipp5klji2mnzmcurajylrp77spxlzg71fdefrlxooptgoo6pabjrt82ccnbxavtoug4s12jozolxcq38zcjsmlba',
                flowInterfaceName: 'qmryplj5clnll3vjpagde0ugtukmfst76ao9n3ujfvnm4q1g8dyyjp9lzgq4353nnpiymza00xw1fq6arp370p9fk1fl8rkfe06k9y4uw8dv32b45ywbxgcifs0ji1y30ybdljvn333ny0vfrx078jugqjgzse5t',
                flowInterfaceNamespace: 'izsavg59c29rtleu3fjwa19fybxke23n7f0kv93gompw78fupnn7g334ubq5zhxoeymj14gqqxvm7tjajuna05frevx0ps8eu8wuezbf8a2wvwe2wci07evtg3wqq73fglslnbr4zunx6t9ji3gyv5elvkwfkpau',
                adapterType: 'gycpqjzjeu0yht98ip1ilcolekvnp8svgm8rr5tha6p5wfpjzag5ttjncoc9',
                direction: 'SENDER',
                transportProtocol: 'yb1udn5beg9ub986aj4q9uell67oodqr7h2sy3dfnrn3tgba39kskuh7sp9i',
                messageProtocol: 'nsykd88b1tfqf8239y9y8ctq90a0tjwtqdszy4ahb0ailhntz9e7101uwzbyv',
                adapterEngineName: 'kpy57pqvkisdxvq7lckjgzer9pmeyzgjspoakzjqcqn7ltbdzizh9o7x2moagdgh09f2m3cvzrzgyckq623o89dtwzxffmbl4h4sycg06m49kglmbabkbx3xyqiak8764hc9iex9d5wdyhfu1t5r0icvyoycdwx8',
                url: 'h2orkgyliv6uu6dyml9w6jm7t7x85g82xnntoqqqxx6sac7lzhem0xbo2k2lgwmwfeqwmykdaxgfujnk0eagaqmx7stwi4zr05wp5673ghs7egd3gk2xf7twfpp6p3po6kpb34x6utl0g9hyb3qr1gjmxbzao4a7mqequj4a6tcpypqy578v3o2t00fw18y2wznmnk0iwgzd4baggasmdgg2xw955qph7f8yy7x9pymhyxr8o32fqcl8ej2c0n2uiilns7l4hjsp2u68gul8qcs7nghidv7o32zkt6jm8rze9xz412qr1omlbz9un4xd',
                username: '4ibqjtye0kar1qbksd45st9vikl0kv6o501pjfwuifhe2hvgms58c465zg9m',
                remoteHost: '25hr9g7gk65nonix86k9qjokm6bhb4d8ib4t46o29ache6j1m57wx1t7tlyekyjh3l3mobr3wvaun1eeg8hohixmh4c4rmth4lwde6z62v5xqbibt70bkuso906nbpram4023yuo2ja0aagth0g9oy3jhj7lycfy',
                remotePort: 6683262066,
                directory: '5wp0af1xbotrvz25sbs8t8cqtx3lr3i3za6n1wibvhwpdnf4m5yvxnndd8hqjwhteqsylniy34209h6ncg4zurgj8mjcuw5gj64nxd79hzfxvjq7ye3oaxud5j74i9a90m2i4ak5zhwh3593p4ydtd4xmh2e4mvp1qz51mwqf54zg29xvz3yy1vswpr912xrxjj3b0exv2d55xzytgspo4sagfw0h29282riepmca2kklcnklgtoz5qazec2tz5xkngyodr3l4hyu90isg5vxvbzfskwwuqydgv041mb2t8rn0iy7lu6fo50qjflrxor9b3jqu4pfkskhtmc6gdkmai1yrly75o99hudet7kp3ewcr9qq4j42tf9or6i9wodg1ra5qlcnx8yfk2rdw83346c32alri3iv4jsv83jopznw1wwno0jnvraya25kzdjhtkozdtxapd2n5nltfazqc8gtp87rrss79hchddgriivhihwn8x92q8wwkm6u0brvi1jl2954v0qgmr5gtqzse0bzup0o16pxjm4hu19gzgexnnagj097o951juqq7avl7fv7zz8cznplyyxnr5ouqxw3r0si05ef8kzukjfyrkqe5j49qvvu8e5t2saqxolwysus1jfiacsko8m3aoxtzeu9r0h3a78e3s4ogy37udlyyowz5d3vwb42qe3qvq9sucb299clw2xhd9j2ko65abl6ktd1kok6uqbzu9ok4mbucyn0m3yenc26r55tqfcspexjxjcug24u6ku5h5sizmwxbo345j8vl4uwg4yqohl6h8jobt9x1i20f2gdzfl564112y8ihukb0i2128iwowafe9rbv8tufeiv5hskyptnthls9auwzk1oubv9oiwf2ocs21ocgvxbmghvw7s2yszlktv6rqw7zj95d0ozej4prb5mihwgno8jgjmvuyzdakipebdc0q90o88s7qjsg8v9eanqg24yr77cne1ntolarawqao3n3b440xnrkb7',
                fileSchema: '0jzitpf6ihuiwsffnox0c1r78wrgobsxkugvlsyu30vblfg6efra7fv45r1thzdtctyv1dgwplhlfpp6dwa32jczu73mxa220jyhv77mjev4v2tvqdjbg7qk0fshhaykq24d109wqe8z3tbaip4qsehm2yzulcighmkj7c1ufcek6a37miemgjq6a3kahuoxm8su349u3x5a77e5f7h3g1vbug39q0naugsanubln3vryy2ujlglk8s2d44n9qg59f07d2nrd71s0nvwmhdkjzotv3h9d0sdsaan6m3wy99erci60g5534cbmg86grzpikf40ri149kzqcnw57ykre2k4rgcr67g0d4vymhl6341bfl5ywqtlgco7eemtq5ii3f331nuojfhhl4gwjjrpslfypen1im6geodrmxfmdhdekegl76li02qhctxnak70hap203amlvh51ywrcbxdeidrfa43ww1ktyhru7w3l9h59bk6k9o5cycpos7hwyyeb0y7albqe29piuojzhfms6o8nyej6lx7lanbrnggcs2gbpkywg3dwk8rbk7628gxjt88pvegjwhzk7ojh7qikea3spoema6sn7t3hihmmnskfert7xcjnhye2n63r85pv5p5plt5pvdvpuavzz9t054cvl3vicnp9incv0cuzhahq0quz7dp5pp95x2got1frb64pkufborm5xnncvwf7ttivkn5b0zmwfbrsg7xr74mmlczx4kzyr9wwa21ej9mmuq4gp1owk1zv34taqkyeu2hhli6yti5h5t7r6p7sxblqztkbhja4mmm5lztpkacbd5ulwniqglbfulry8ggnvtyk3ow7j5wvs2ol9vdgtyv0jxrcbg7xpl3n968m15tlwr2f0yast2qgv59pn5bbyb3khmh8qgm7zqj1mfgtzidp8h6rx8a8qscnii2x2ulxhd0ndkhwh8r3t6lrhjfpojtlq13yuskze6spqkd0pa62q33zhoaz21a6rfue8x',
                proxyHost: '0aje609tc3ra9den22ku54qzkp1yo6qh3yps3uzaemuyvuhi3z9lhtcj54jf',
                proxyPort: 9693885521,
                destination: '49wwc7tz1pw09ji3kztedr5xd237s9zpia5buosr7q5qhpzpps8lhg7k6p3xl4aexu6z0e8yljv9wv7913f6swn6rm4euncpbihpbtotrpca75t0gmib8fm2iz92ydmh2hijs2lt0iqpyrzdy91vaccbpcw1lc93',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8rgwjm9a9qo01nh9deua7a5s3jwb9i183gma6l0x78s8q4fyndz8ut3uzwecrtuw143dw8irdoxl3o2xjmsd3efqg92gwabr0z2zc8unffesj7kxsh6ynyn5hh27upv8k8q72wbezz0g7nq7gagxn4tm6bpodlbk',
                responsibleUserAccountName: 'g4vm86p4pyu89g1ic0pw',
                lastChangeUserAccount: 'kakfaks82oqhzgcdjsez',
                lastChangedAt: '2020-07-17 02:01:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'qqby2wfgz5l75win2xe3jeppo6q1omgrrzlwh7q5nj98ulxahukoa9g25wujaypxp1ooewfyo4000tj7vefygghlh4i7vzjge3z7wscqxa88kzkgdmy90lzjfm07jquknei39cq7zam3d29mahk0ur6lxjzsgxsl',
                component: '8l8qjdp34todyfdw1le1qmok6nliwo74z13hu252fdzjesu159f6x7476cs1kele3i6vug66oz8gdgsxla4np6dv0kmertq9k3u9eztck3dzgy6o5lgjv5ytowtj242bai4311u1ytrc5ybxuv5vdc6qr33lovh3',
                name: 'gboo8gup28w8pmaribta4wb70v8g7xnqt3ya98rkubo2lsteuygvfhef534oh9jar9fr75w2z6l2whae3uv5y0eaanfhvyddq7hgpdo8crku3sv7kp8xpp4mlj3ysnapr5lwelq64wsqlzjfr29x8i7xh2smnfu9',
                flowParty: 'fi9iiknr4lu2hm34wx9w40jzh1ed6tw18bqf6ds6zw3jrqy16ijujrgf8257gdfa5pucxg5b8dssi3k9ctoazwgurn8qcpt4o88k4ab8i9w229bbuag8c52gvkv9w18ogx2m3gqr7lbzpv915eldrc31lts1dyne',
                flowComponent: '6wh9s8pd39er911q95vvd4ccbyx8bmkkjb1g7hw3ffzhtmz4ud5vhu2oo3okdnuc2b61kcbtbajv74nlv5x45kh3q7k2x3k7tgjx9w57exghldf8j5m9vyxxppfwcxe0uwsj2m9wyvz4ib10omfrwih3izsi7bu1',
                flowInterfaceName: 'kaqhoj5rbal809ab5k029s21l8c6vbofpzuog67dv3c86stj4ewy6qwb3006u3glvx0dbpdx03iryze799tl0ml0rmtcsp44cjp7syjqoechxpqz0w2ihq8fgdycx2jdpx33aryecab3fpwej3zrto5yr41qagio',
                flowInterfaceNamespace: '0hiabseoy9zl55xqad2haiibw52id1stpk4bn7q0r3ehwi6bfo1cfwzh0cppj02mzb4c8kz3wezgy51g4lde1glqvpwqtwdj3cbxnxj7chu0vtj8cajlw9dnafsx3ze1a2d9s4mck2c8o310w8apai14kt1l6sdj',
                adapterType: 'lncxasl2hb9q4o7ountzlhxzjxjujcaf5ld9jml2k6xlp88flcfpaomuawhr',
                direction: 'RECEIVER',
                transportProtocol: 'a2kzmom0r8be49p8b99kusx2lcmcnowq0wov4wckjvi2uelfkqtn08nrmck2',
                messageProtocol: 'nrbytfkffjqoratghkby0i6s99ntzitcizfngg2txgz7q2rrtxj56q614uh0',
                adapterEngineName: '2ruevz8wq68hvm22pqyx2g531gx9wli6ra1xzguifblzqfyjh51oh36eekra5fe0bv5gp88d6dopq2l8y6ulcv742doeukathkpj2sfjrt15xgoxxgse1z1dtbdbxb7rioqg62bku217swnnm2myd8wduqswpkbsg',
                url: 'oeof5c2bpc61n4zguozfg48xeienexr24fxca42alposf4zxvasyddtdupz0vmkadi7r82gj4g5650gsqieon3uf7o48ad9rpdtovau9sf1g786acyzsiwvkcg2gpttszcn56kghvsqsdzx8dz9mt014cmcarvder8hsybdaudq0ycvv6ws8ju3ot2hhhbazhtz1dfbvx94k7xoohd5t1g3vrz5wywcid1x306uqjpvzshdcm09ate9e0zls76fylye1smm9en2c7zu7anlq0dtkw3qd2lh6bffa5bwcl4crbrskd0jhvc4tye5khjmn',
                username: 'jpwhyzs2vsgdrcodu7opmh06ped1jkgzckx7hwfvy67wj9dhqecea1aqpmuj',
                remoteHost: 'vfwwva8551fde39yqpv9aen2qli2tt3p7omet0vpndl38c16iquwoaavtcni9zy3ibl7ako0rjie57923ferny6pbfrz7qv6ib55tiawy7dumjchiajr7dkdm30t0o3j3lpps35iy0s36h83grljml01ipafper3',
                remotePort: 1034878784,
                directory: 'r4jwz9qhjh4glm44nw6bvxuhn654fdwjxffdvlhd1icf5un9tody6otscrueibdt8qs1chl5jzwrvdx80xwtuvdiad5ow8ytvjb4s6cghbpn0bea3svonwlyqvi27tig7nujy7lmazc49n66n31znte293ni9glc69rk4rbq2xl3l5lu8b2l7oxovh7pzuy4cvbtbgrfwhd82rh8obu613gcv2caab2ts8tbg32wnpqpk4ksut3grcdroj8807fxvx959el0zilm1ogi9vzfavfsemz7yc6ak88vqfex8z7qbdxryxak2p2hm910bnoigfnpin9nd9m50ea8ju3svr0krsf8lc578lj9fi5krtfru8gdrtub15wwt6xxufpsbxcu9co2wj28pmx9k40iiahbxkrbi8uwagwhn3ppw18bh7uugahjt4kt1btyqhz5r16yzs3yhmqj73wrfrdwrduu1qd8ctuiqek992oi6nyil7fbuniyijstfczsvmhgefuxtpn50yavf0k2t5khyzl8f1i7n61oz4qr22yqzqk1wnp80urhpjxb92bhyun7kmai9vf0svpr0wrsy81h5ajdlm5b007cgeqqu55lmogqzygxjfxumvlnehmv2c8soax4g2j6upgwvj4ardeeq3devi3cuer792wehy5uissy2uvafbt6eulsseo911zg9iwpkpyqiwa7m8t5o63km3at7pr5mqmbb8oz1m519sdxd6l4zlkeuokap43t8d65885f66a1ic342asnycuksth3mnlybgclael03hy7ha1oxht41kpku7h8he8ge6fshq0kvcschrzae5gs52841m7dh02xjypqnvnwir5q3igpem5j3f707l3zduubo5yl6h7xfrnmqv6hwmeaofu88hli2smnsnl7js8mchotx80p43vwguyhegw1rl4po8fzhi7ekwsi3fpqo20txuotnlm8whr70xpixq0eukfkvxw03iyfm6e700hcdo2pakfx',
                fileSchema: 'hirz2ba11hnn2pomiar25boxhuaoz7twg2b6m5onp5iukitooey0c4tyklaf0q3mfy1hsil77sdgqekw5gy9bupzjtqi2nf98mxdqt4cq8t0zlyb35hdu9zdpyx7n9zp7shiu0411kzvkf7yj812n2r7514iv60zsoofkb4rn8dm6a5zqvzdmx4vweqxzuuxxnkquxpiw78fb6utzrfipuaveyhcct4fb8px06c3apdvb1j3p7wmzc9f2gu5s04rztkarptvsdjttulbxnqvwr2emqyd1qgbttsfzl50kvpa4ycyltz1rltqi0u29pllsqf61j6zlwq66044mmgknkjmf3d9ysc2p4cnxli0fhj0qbbdz89nalzwrnang5ss842ku7jernsnxfa8g1w8fdalyidjk01spbl0rdk839t4ebaftudoa27lfvmvmne6oo6su2nj1j5rv0jxyfw9dws22p9p4amaphcrxtlorr2zkywn9h2f8e05k6n1g9a8c3cqt29s0rilzra9qrkxqzw1q7c4rp9ncx0t7hx49c8dgpdwfk6sbxtx3d6p4fy42t2y0ppolx867mguxv60fmw8gtdtuq7wbq3tf7gqx4mnfrcp28137dl8dgyk10f0g90o5tnej62qv4niywj11xakc1d2w4lm6ikndqd1tpf28p3ubofm3v1ulasqfqp08n9mqfjzgarmek9qwyw2irzek7lhopkq16h6i1g6ajo9ey9sc7k6gtuuwexn83s8q8rpuymy9c0627pd2ped2fjlsj8xpaw51gdfuxnpzcierexwx8m9hqhs7737tg4cqqs1ya8035jy6tanfp8curbkgyjdda39wuelfrnynlkw6t1kp7k5mc1nn4up2jm9vb2vljn500ap1hiyxwl40e062hok2gzlew7mvdu48494kuocmd9ntkdfvdu38enjex1thufnf4d1vuu4h8objyxpwq99nw5i1h98ncht2iectvuxceawo5mt7unqpxxw',
                proxyHost: 'ykched3kfbadvfvagmpag5dq9zar5g6bwnt1aqsqv0kn2vt8ugnl7c1y0pgf',
                proxyPort: 9538804037,
                destination: 'ajvqqmhi63bohn592vx4souroaed1mmuewfdylba2xyenysun4cpbz1egrg0d96aw021mk3lrou5slam0q5g6soxhop2papcclfwr1g6lrvzgna0slbq9beqcxurpckclhsv43ql9odgkdnpslk38zqhfha3xd8w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mkzlvn0611igm34tk1f75r092iz0izvyoxmmsyeeaavvwu9gn6gbqfps2xt92c26ec0p0jf1eqt0o6h4d0nh82z5e5fb5eervnmaak695h3b2fkpqq7aljhdal6klgxuy7avbubjrqvtppmidg96o9i1791hf9nc',
                responsibleUserAccountName: 'grztsddboyvtbv51dgak',
                lastChangeUserAccount: 'wb80xrguefs2uq9uov6g',
                lastChangedAt: '2020-07-16 16:39:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'xhhzdkht5hpeoimvsl4ioh2nao7lnj4hos7d4du8ln9dhx57vmoc1l8eilqy4aftnu7lpfp31btg9t5giqm3mqnoyjtd12tb8br55j4ala8k1cm6scaf4bu0oosgrjrsdccgf5r0mnjcc5pnn88acdqme5r6u39q',
                component: 'wv1vfs93vwlfdkcuw8c8fys5m4my23kcfq1dkq4biz0t8gu8nduppp2ec9lxw6hmufcnf8v5s40reblgk3oyaeosue3eb3zkjif0l0uns5m2arc140prxqcnya5usuuuz5atecq0n1tpgpmo5n5z23vzbt9vkdut',
                name: 'vqr3wpvoi8ykiqqrlnvmd7yag9ra97q6k55667ofbf34755r90m7h99p6l3qvxh7b0bzj48w6qaeauerr8nk0ikx7cof1rhsaepiqhhu2pa83z9tq0xbqwftcrkxbhxvrl0v5iwdepyc7d2u32in82oqvzerdqlf',
                flowParty: 'ld1t7fepfr57cxwqm6kelid0kwyfokucwpkj011pc87mg96lofm7hm7kjzggjwmllozcjpmn6cj51szj7wr2p21hl5v77l9l1ddn0g30xxml8en3imf447vrjpz3onhicksldehcjigk4uamzoegjaswdfac7eon',
                flowComponent: 'w295v50zr38yeeoxxru0minmszj9x684fzh1fqsj76jiem74nvgrh89u2al6flbbrh9hv2xaksp4ffiefqs9rfea1zxzzhd9avror9130wx7j0acxlo3tr16xpff1kox8wa72jjr9j6iv2a9me9l0kgn6rc06j07',
                flowInterfaceName: 'zwy74gm5zzigjh9jetdeoikdz7s4cg60bc9fn3s6yjsvcna7i2rn6fwof5glj3fxkhlfel4tkymeslyacrlb5zmtn7li5hlnx4awv5dayiuelenv9rtezz6iaau3l7cn7ryduihfhefmxlgew8hqi424htzrqigj',
                flowInterfaceNamespace: 'xka7uc1riv6owxp4xswr66wpcdsrywut61mla4tu6vqtgsm8byo010eu87dfw2lgmi95j38ktehd8kahti7o2my7q2f2g6bhh35f1ea22i3v3j2r5kcd2lkscxcu5tr5ex2gfub781nbf4w5h76ks8ftnno6boau',
                adapterType: 'kjn01nk81erbaxmro9flsosz0taqoa6sozn9w0l4dxkujt7gewx4hwr7dbi6',
                direction: 'RECEIVER',
                transportProtocol: 'y6zinlgu2dnz5fo6zk7u20xyjqe47mbfaydvwm8f7k135vfrjkxrxjum5arx',
                messageProtocol: 'p9efq5ipw8srqm29trdl3gmtibog38if53y4ubfham4zsm1kc14ecxtqe6la',
                adapterEngineName: '2yg4z71n8cnmhpeqji6tt7xwlf7htj9c4qx1crxoi7giep4h3ljewnxbafu2a8yshy5k6zpgo4gn4qjrkjvve8rfzatrqdlx64vzph2n8v0iqll5zqdt28o8611zy8qximjxt2w7wwkpfv2813beatqgkdjyk8u7',
                url: 'zmrzmvvcxfnzg7ljgs3ftrneeshnjlq4eeh5h0l9a1lqe84aqb2khxb499vokrhw2r7s2jck244agyila6gbgow955y2d7h4oh5r9l5bi0fxe0056hgmxrxy0ffm8yr3ig4svsuex3wylzy9n0wknsgjzi6d6n22ma42prx9dq8imctgjub4mmeayzss4npjy1rgzficllg7u1f4af4mki5flsccojpenvooryyyrr4yfibvsd5hz7a58zo7wf6kfj2dk4fcjzu50scx5aemh2ip5i0qz2kct21d5orlxbob1lh1k72bjfnflyyk9wdbu',
                username: 'wla15j3igc6unuoporo3ee4keu85xbcd3n7knkmt479nprkns73v9h3nypf2',
                remoteHost: 'o3mk5ydoof8zoctj7388018f8h57i66eqz20u63rpq6n8p7q9u8cdnntvg45twbz4fx4bxbvm2vfsl0midohayo35l7min2ldk6fh4k6iiuse6mr2nbqcb61wnzq4kqzqyfkursi6tudbyrrmc5xii8bkd7jc5qi',
                remotePort: 5191085449,
                directory: 'yl7li4p5gfpwijymgm2h12p7cjj6s860t880zlfv44kzdts3byqd5yp8a0fk22rm3445qx6iaq3ioxbkz3ssovjbtasch9sz4uxlkuo1jait944fmlekj3eqkif1zvtszh4fgyzijskqadpum3z9igg0k0h52ebwxd3yas9j9gb1o97sot2rqe2yxt0lq5s4vyony3370zf2nhikstrxh7wtp52bj2bhd75qt2h7pkt6i4r3r6wz89nrync6j1yi40v17hycjpwu7sj2dobs4ewfk3zzrrowea6y60fwf9njqha6j2aw7tn2fgb3ykw4alyihp9u1ijm5ms2nas0n0vk5hkza7pfrhlmo9js6lkmgxx19xiyal20dlei4wyy5jl6s93if68w86oc3rdo1ycnem0dnzgncgpnqbdv3aedpuatpgwb162uz1kzplnzyww7qvp8t0t6vjvt9c23cpogv7uylyu0gesmeof7p4qjajhjcg333l7vbzq2j2rqmv5pw020cbr6fkfwtzljucseudylg6z8se5o1jew5u8addx7ar38k467rceg9e4uitv793muu54tla4xpievht1g27j9ic768d9farbr6w8d3e1ms967e5p8frfikj5e7r323qm7wrf969xeqecb84c34tgiao418apivv57sfaoretozo8hg19ie7rdlwvaozcuek810hjgksf89pl22idvxxct59gagkzyzxkn7ilofzr4n4hgrn1ci8zm30m0xa60y8aw5m16iki1305673izkzgtbqg6uoqsdyscmkmz7gbfm3ff5b4u4ojj71de10q79l2sa3qaiaoqv5v8df09pv234qbkygqfz0n6md0ii8pk68ugfrulvrilyspbo3mtk3uuha40b1ovrqmit9lsyhba7kazp6x0dy2hf1zygoinc416zjdbr226jyh6d5i1pjomsy161xquh42ya2owjxc201plvkb7yf5u9ht65e4wkulkywpu2mx5gknj',
                fileSchema: 'xbwms7ds42r1py7ynxjbzw6n3wt6hnb2r0qojsat9dqh01vcy79904ltlozazsrda9qsv393p8r15jqf6a5a2c5us6f6k7m4416ij355c590utd508se4nwro2e1l7rf7nbeo1mqwq7tp27tfuoiwi3a1ezfk7ef13dkvuzl5kv45n3iitkijhu4zl7sjrzcz91qwxymdq3vg0i1mo9j9hmpftt8uu9t7cg3tif3vl61lv51fh6w27py7u573axbt4yqbn4qdazjgl6010ufwzuqnjka5jgci5wunnq6iudwp5ff9knzoyu1b3i71o6tadw0cra98xlnnidvfodi0pl1w8sg918h5w6r6vv5s88o3c091q4sd6e7oyvsy0110pwlwr04zgg7hy45kdcsswqwf5otb66koliq7fkdcw161l8sja5p3rq37b6fy2ctbhtr9tp9uds6s41uvhxhyh7o0at98kdowxs31q8oz8kz51ichz7v89pod0hj96xewzupvbpuo5x4zfruw4jd7nrgjr5nrjn5i47dncv96hscafanr15cdhfdp9b303dzirp37ccgp3wwzddnevhkluk0d4tsppbpoj5azfpps1xmu736ma05u2ty7daxmpdo3xuusm4yhk5j8zi96o0z112gd4iz8etqksy9dgrojll343i9h9k3im20cu99oaw4ghvc3suwzwi1i1crsoqdh3yal58trt2llrh2s1gxl82yxu12fpoxh6passqcrrja6znupob1pdocleypwlhfqvlgbwxksfo5q8se5381ryh09qnitxhfudi0v40nmq96xdzlyu7v4q80qb94g7ynochsxmkeg4978wse1t2ljq6vbuhix91fzbj6fav7e0j6s6kh6myfmcx8v28aktqdyluvj66g4y0et3cqvzmtavhz1rkqeiwn1cciiby7kp26x9mr9jnibge204d5qg4kn4bgv3zrk8n416485cpdzs8l2om7ktizkqxdwu0en5ce',
                proxyHost: '3j7vjpkakby9a62eghi8errgurh2m1kbuz4zm1j4r9yp78ot9uclrvmg8g0q',
                proxyPort: 2093778373,
                destination: '0q7cpxf14allrmqskj3581jmbzv16mksi1puz28i9orb45mx8rhcq4npd0bxe8fsb2lpa9ay92tg5a673h322rip6g61fazaekki4ayo4tx35lkgft6i7wa6u6t0wsnkgnpcsfg30ytl6ucw9e7j2jrocmf5hkst',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b95arvx953mpqj4l6mh9kfilb3d9usufj98gh9wr9i9ziztlybya0jc2szw7ff4enhefttxfcej8nc5d6qof5pamgrig2sr72fq5kwuki2kx8qjgom70m3na5w7bmmc27n6xh3tusk1wbiqdbtedw90bdcpzfttp',
                responsibleUserAccountName: 'dwssf1rvkufayiuo69t1',
                lastChangeUserAccount: 'h4zrbbyify7iukvvx5u9',
                lastChangedAt: '2020-07-17 08:19:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'vc8mvdybq3wiymma2sv3pe6f1m3zudfzg012tjr3f80w6bkip8p5c29c23kxy6eq5fkyubitvyceqjihb01bskb9wiewx70pcmtwz5jw13hhcpzgqqu25aze9d5g2jig138e5ay6gzt3durbfnxllw24lxu44axa',
                component: 'nev0vyein2otvg855l5o4k78l2ofbk8pwhhnarkafsk9j5ryevtdyvuxz08q64hbqobeys4uappmf7q2zw6ie2srbby1chtsgdxfm81v2oozjqx5dnru33vin9hxcjef1lc2kajtlzkstay69chmrne6ky40bdc0',
                name: 'kslrrj5do2gldxsizv85qmlf7a92kb1nik9b5nrfntq9npombs1y5l2wknba5hddqt8il3bw7zfpvxxfcljp7dt7ocamymx94rzdbvrv5bfdexwzabelishhb71bgms7lhv8loz600vyj24xvrp50d60zjfrqjei',
                flowParty: 'niot7y4g8cmkbl9fyutnzg8kk7588kgsjh92rtvf2lgdmk32uy965f8tfp249gmiiaboe3a95wdlx4838vodfg6ptffz5ctxa1h9tpq7yckw7y2dmo1lnxqogqc70ojbcyg2dl78rpqnjmzj221ndz9h1ocsqwji',
                flowComponent: '0456j7p71zd2ulywbo60qe5jw9eo4yv7jwps4vnwbg3n6mqtrfvpa3q06sortwu98fjxjzqmhloo7jay7j69k0zwg3g5ya2odwo272z1i6a7w753v5giyp2636coqyklhxoma9n2pnfbn504oyt9tz59rtkmu8qb',
                flowInterfaceName: 'i854uy0uzexai6nfhzuvctkl8vx1wools3bh6r4i9jqn2s56exztx2h12g1vx6n3j6ik0sqc4kn7p9ibviprgu8t40pzizvt3zr010ahc81ankddztjsd7bgvwzwi1jyx6bnejsux42m8mxz4gn7zgyky7ltin5q',
                flowInterfaceNamespace: 'o7s2cvb6jlxb6ddhm2w4cgl55o57jswzjy16o8j22ag62vzeoip7ewho15n02xyslpy5nalns4rqgfdtc261wzebmkw0u2q647o7otqfbm692mwi9vry2bw6hjne1zkkdr5scjeihvp9bli2ero8joxhj2g7ramv',
                adapterType: 'u7loq4kfankh80iktx3ps2zcgimnde8rsgl7dxpxffzr1mvbjxll6rbdo7yd',
                direction: 'RECEIVER',
                transportProtocol: 'yg260qlysj415w1njh3a4xxn5hqfnegub6n0hp1ocezwgf0n7qcgu80mlgfh',
                messageProtocol: 'ta5fkbu6yhmpludoxrs73tfvyi8z2dg72y062715r02nlmp2qogxnw05enoo',
                adapterEngineName: 'j9yzwbbo5w8i4i6nqo7b54jquv72kj211b4o8tecwfx8jv5zy3zbnwyy1f2j36l4r88dwfhwrhczgiw68zhagfm49fd84owddbcoi4npxuayf65uhwtymmr00g3um3tt86e5h64whj5i51lgh4vhlu7bo4cvpser',
                url: '7hps3ivhx7uh81p25lfq8qfhl34tu6ckka9vdgoaavdk8dbxyu0gh7jb3mxq6nz7x4gnehmd9gloxk71l8hg28no2n75wzxhc5p6cdhz8lxwzcidfq01a89hykaosmom5ixcdwrelu544hyddhxbbksoxw2svjg4gdu8nwxyiwf1bxwglm07avv6z0n80zwkie8qvlp3y5d9axn9o03mkrgn3jozzkepptxn9nko1b9klgyp9yimsfab3pl6sfihso9f1m1cccum5043ftdq7pxjiahw2wjoec2oiypjz130v2wg60hq8qgcslxgxh5e',
                username: '28w9u78c9484q13hvmdi94jk588owwqsuxmfceayi4vjrzawboq9mjv8ohf1u',
                remoteHost: '9eiml4oiahwjw5i94mik15vcp7ec1iin76egauxojygdypjhtflpk4zrxog04hxuwuvj9ya2l27qlqj96toewvj6nccg6r38t05sbpya1mnkh499cla554gl549zhmgyups43c3a5u9zr3muyyv6wdgwa6kl50xa',
                remotePort: 4691599601,
                directory: '0e3bdh16k5nvhp5x0a8qjn9gmci5yjl6ckpn7ceg3vb9v6ob2z56b7efp9u1y3xr44oucivl58172zrwrx87d29s9fmn4c5sbdp0a8otiqm8vf2dgyl4sb4guy21b1il268ypfijpxsuqnpzur8fmm9msq415tqp6qk1jb6hd03pct1cym7qsnq58f1n9x9tfsuoj5on3utoz3sbx4tziqoieyy74d3mfqgq3vhyddgtuqre273lqtxnywdnljug0lrxzlpkf3xrztvo4b7rl7z4f8vp4s7792npc9y1f8xvnww1jpa8gko4ehugs2isbyfbq3pqc1j6j9fum59a1zztgtawydbwv5e1t5ymrkucutjrlm76drfw31qgzg2oeoen431ybf4sleym1x8c2htxkd76jbu5jfvwlnkohtjisaf0cohwelb1gz116xrzt4c6yaqacrsbovks8ssf8zbqjxw0g51t7mep0kfk2zkt7lbccu5klm97lzxwqb26aggxx4kag2wqlki8vvl8x0yfydq88syc0hp2ll23fi25sjyvv8ow8yz3eoqevoqbk0jf5ve7d7hyugkyc10m8o2vcmgmfm87wdo0zo9s54cdknhmx6i7soysqs582jks02a7y354z0akljvdlj0ce31gzc5z08toepb6fy2pjguo1degggqirgehf9gry98h6iohwxjgrzyxw3f1lvpxhq2v61oal2i9b1i5oy3qr4ge077wcq2p706455ts2jetza9j2smk4mddwc8ao5mgyy260n8eheznb4ut8eculwoz8634nawkj8006d3k9hvyi486k7160qc1434mfsfhhpcghj1a0b804seas1hpnox3s2lh9h7tu10t1u65aazcjrerwdcsmiht5jiqehesp6nhfwyle139n0sb5ckscsx46xmekp7zn2ljljqhntwkwmjxtp5krmkexb07qp35rsekiju09nvrors54pzitdvd3syjgejva8r13jlvii2v',
                fileSchema: 'do73crvnr68dw3qh0q1sg5fgaxuba3072a8gyoc7kmo9ouzii0lipufbk6fkoix4ks69khsyt5i7l1vniph342yki11tr09wq7e2bjdvdkrc2o0zj4khz5w95pf64cx2twl1nq7zyfcelgmluyoj06wmomiia3c3wt6wrxcoug8ivuhm26o6vematpfk4s4tncwcll5n1h0295ytdunef0vls1oc77g3194reogkuk1bsnrambq6aqvg54whnd8ylrflsdn3ocrpm20zmj6d9fdl2si8lbw3mdqhiy7ikwwlwe5ejp1nia72ocrcjhtte128sdr7qocopd2e9adk63grrsvcm56jmz2g3lx2f9ciedswewhkapi4geek9qiqild5ylvp1n8jf61c9dtx8l08g3athem6mznr6m09cqtrcqhpeg9u7h38r33ithffchu8pbw6uw5tzxvuxhax9xevyifik5dfx8feluwt601h68il5o2h33o2cuibnz31aq9hurb54yxv0tblpifan7yw77dozn1ldhzsdvo2uol4liu46am38rzwrd8bfcdmngz3oyfbgh4e6uskx4dp2tx72ejusloi2kwmjreuli7x4uh96gnyt0cuvh2rfgstnd0sn7phl2h6z412he7cy52d4qt3r8azlbf8zn6wzhwy4rmozemmizo2lk8zaeb407y214iy5da5eehtypr47ackdgozftv9f9nxhofi20kq2zyjsm3bt0uwex1685ucahe72y4hs7csloqixo1o7hv4t88rdpidfecr2jhqfulf204zjfja6ou30ib6wj4h8v66m91zyk6lmekvt6hj8rmq0k3zruvy7ao5kzasbf58qh80tic6nmb68iszh7p1vlgridevf46xha50a9a5v6vwry3ifktwamngjmh9lt3t3ag2tho9wr0caeonh1fmlibc5shdqxlqp0x23zjef3j04afoid8300mmfb1gwr9gb40pvmc9s9unsx0djv8d',
                proxyHost: '6q6vyixizow1vdsvlikic6ombmhg7suokvvqbnm2nupbfizzmxcwpje7tk3p',
                proxyPort: 8192526053,
                destination: '1h2iumirszthzch096xc5nutihk492edl9yiwhnnmh46362ptswgh1h92eyxcism8k6ae01dxnlm6lhaofmv0e1o9llcxa1okakofgilqtkcotz4vu69tg8ypbamuz9rs16e0hcxmsb21rbvzny67olnup0vdsoo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ja15yksi0h7o3mmtmljzanaxtwc7hyi0p7oz6kkobxgp4bw905lofjohg521l1287m7vr1g4ow6u2wslgj9fthyx8lv1w7fiijy94uaslt0id9q694yu2g845zll8mev11o602x70kghmxb8er5xhg93ptfqo84s',
                responsibleUserAccountName: 'no5t1szxa9e5lpn4oh1s',
                lastChangeUserAccount: '8n90nk73c733ewjaux87',
                lastChangedAt: '2020-07-17 16:26:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'h0vbj8bcxwvc702u6w5lshqvy4sbxdz2sf88z0zo4hzt6w5qbwnvnsmy5c0woe6fcdtu98vp55hx8e5rbv1ktwc86z86n13tphsk5ffvrs88wqebw1aorrc2kdfzwsfdv6gjpjzbwa26hxxwyvitqczfkfiogld8',
                component: 'qafrm94o8qhy1ejgz708c43sgwtqvl4hd007kfdz49novsos7fv2130toxkxv6l2seow9jdpkw47agn4npx6i19plj5rplofdfkpi6ptlwrncn2k7mnobf6fx26y4q7whbyd8czpygof4gjcbax0z7bd5254jw15',
                name: 'tgjjuuls850awlb8a7u6hmt5v81dpvr7ivgn4qdtjoj77dlfnhtijw4aknjr8fy2cr9gvw6d6jvctegkhn7o212v1adlr8xqmtyabjprp1nszsnh96q4vuz5in6r96c8qarihx0vbxgyxb3s5akcqgq1x9dvjlmv',
                flowParty: '0ljzidtu1uxekh2eupl2f5yr32jwaxrtt2kpvrq6ogal6k008135oo4gz65v2vrf87f319j6s5km8uylvczaa8o9o1tfema6lkqksiw42cs9a7gx7b8gh09w6wv7hci3yjlnaq2r7e7w54mnz7ua1i56p5dp6s09',
                flowComponent: '0hmatkq0p50bwocn0s79n2xqi694qyvhmnzuw3yp1lyibhe8t2rvs300pp9lwvi6e7sf523a3ftzq84q69g1t3a591wavitmh7snf2rn59vc1mx7so96mnsw8l4284gbibdubu9qmf8gzqf1cwrnyjdqjia5tzqz',
                flowInterfaceName: 'wat9lt15dkndv7t7sme4ifqfbubadrk8wp0je7fiuwwgi26lv9ej3fa3nlip9n6qtrzvyhe8hcwvxfvabmiz9xdbsqw4xg6iy1biulw72nvlxj98l14xrjrmmpavg0qw5r6vvgijln3k79w13m9fd4401ff7xynq',
                flowInterfaceNamespace: 'lg17pgtxu4bkslmkipswnvbmj4ysjbfw155javmc6gwn9rqad6q8ciy6skpyfyjz1q5al4e0r7xj0rbqn4b0pyciu1tp0pyhf2b42w1lwkt9iiuhg6hpyu46xoa9iv6pqe11pfenqrgfj95iuev8nll2pq7z062m',
                adapterType: 'tavwgnpj7ktxb5qxakkgwt8010h6gd2oz7vy5ynl5jtw05y2yzt12639eoxh',
                direction: 'SENDER',
                transportProtocol: 'alj6aiv3ka4l0ymwkqse7jpsza1mctnm4okuz1wsrb52cyzla3j5btfaacs6',
                messageProtocol: '8071sydnqjcrthbuhvkrq9nwru2irnb2n90bov44c94ty6k4vn2raijz5d2j',
                adapterEngineName: 'gjfis9axl199fwgc4coe7csndtv9etbq658hpkw0so8q76xi5mgydoy0d4j7dkzy2gkigvtcvv6xmgsc4k5uf7xtt6p2j32t1fwqalo5o0ex0a1i8kviwegqi8hxw0iev7y41nfylxqdmvs87ckb52wcdurxvf3b',
                url: 'jnn0nsl5xbx5iuwr06avdn8ucx0bgabh4eztr7bbs2np6mvmwhv56prcmojdclka2hrirtqo49ztflfl98m7cmk6eu8uvyx5vggyisq0dgg4iuxlmtx3evuqdur5uxefy910yqjsltv8imzsdt1mftpfzc0v2yj6f5o8wjwtioqzf7kwdbgzj44pqfflibez60q1p5z2gqzdhea3wk8h85wfplomykg9g2kzcggvkehxq808hr5ts0nqz3b6w2zz058wsx4q608vz5uw6ydih96e2qbxfgf3k9wwow8eetovtbhe7hibnyygtxz4d8nc',
                username: 'rrbs6q5fh92rdbjzuqva1rps4l5fe2aldsx9sje7n26lc3bcq2sr8k2cxas0',
                remoteHost: 'h8z79ew30fz4idzm9dh1y9157rfaqlb1ovev1a27ikfwkk5rhne7fhetqcuumo63amjvmi9ed8y1s2nigjx6cygpf1w8yesixkoveg3x93g2jvdvkpueaip4fia2oz8dgcfz12iqsrw00h6jrbe38zdy94vmr50sj',
                remotePort: 8810012180,
                directory: 'ej9aei5p0vu3og1fbr6t972f94h1vt8qzc21tbuji3hed5vyohxeemodlbx6qvns3auw3fellk273mod765q4tkvlkkbosy35sr9boebwpk9hh1bdfs10rmlqvfc48qmgtmw9z6vxuy6a6dwqkw47s4umpjbwkgndv1f1am8rdwkxzpsqq2z2plu36hribdht52f54gbupplm19dw0fd4tkidlqt3vexdndmf1i8alarah8wqitzxumll540hlzhrabiz1efducusg0w54ibf1y2jym8mapw7g0707me21dglhm7tjsdtkt06q456s7jg5vp8sbnzb2h6xzut3masqb35bdb933tpq1qqbxdp3wmuskdg5ggphcwg67moidk8vnmcvj4u4vujbtnx5h8i5g6h33hdvfc4ae8wv3h80zsoumun6cayfv0jgvwhjnimfxg9zjnly1h6rhuoqp02ehsc011i64jkqnhamwofo9dv824as86b1daahmnxcgvqr3hipu0i3qihoawkrrp4tup73rj2bitygwrv7ra36p53nlcjaxuw86sd56agwgjlzu9lnvlz7s1wyeewy8zz4r8y10007rwtigumqpgr9e3pn9fdsgolvhrjpy0vwchv7795p89ap6o8aug6t07g3ft1bb4efdu7suua2dsfdppl6l0s54lccschk54xmi9qf9adduk11grpfofvi5pi84a6zw0ohy6ciob38bo1rft74w70nxrit2qjvt0iclhrgfs89lk9svbozodbbp57w1osv7svhfub39me1j3ynr63dxslvfkdqpaz6b5p3609sooxo78ir9q38dw2ji4s124559wuz8zwatr0fl8zw3w914bsnz1qnmmoh4oxj9vxbax2zh9ovb0pl6b9oljh6oh5qq38esm184spz7wha69kro66ai2ja34sfab9zii77j17rjzkk6i10y7hhdhz0d37l0g29ptw3thu4rz17ecbrz1l2k7z8g3wtp94y1v',
                fileSchema: 'kt0pui2zwmmofm6evvrvv90mey0xh77jg3clnhhnoah0rkilz8ary1nv6fe4nvpn9melggnpuywdhii3t986o54csi32gj2s6ob119140xaq4fsaob8ncnp5x3d17q3junlerrk1fefaugtb5lm775ayeejvsuotmzrh4889daha2bgl5k7haxesntazfdvbcyufwe59oprhlhnu1f4z3x0hkmr82txku55gnixnu9xguc0c23v7me6u6y672105karjozr3yh2rt7ll82qpqg1xwgjl9qok4oefvrg2nhq2piukwc61sc8gjux5h1zypegp3l4r8lyv8jylsm8zrhbpbgeoprkz61tfhjcyt4fu0t8pm5zxszd3o68qftdklquy8yct6v7e8hbicvb9gi0ngo269667b1yh0es25d7l5l7dhyeei6fm43f9a1o2gd2qgg51jbnmio5it2dokryl9yj6yifld0jrff5e3amqod2y2bgw45erwivq0z1upbsg2fqjrhc3ttf6ickqdzmp1gdmwgi00fgt0qa6rlkv9jcxmbwu5xbwvirvx4t6y033wckbx13d1ladjarcw707sbw7o24dwncdkvzvh3ldodaeg4xybmuyh5y9nrji3i1p6pf03ps42wtwee6f0fu5qns03mc23z2oka7yrf2jjyi0tl82k6pyajyqkuy0xpvarxnmpm9oy9zhucjxuojq1dwxf7acme89tbcjp5nc9nqhll4kw4j7wkk1ifvbkx6amakk12zf634v1sk6l9i05c25ame8ycznarsrbxdld8qpkm30w7k62f87syhltlblmpwxi8yl9yb4f9buw9kbd79vepuq1b2k25zrhqg3ftoncb3qgx3uu22fliifjtrncgledive0o32ra3q2br4zzedgmgrvgamo6ky4c28vmnvh94lqu80tcdcjj4f82vfv21srft2ye28pwgc8v2r8tgqq53oxpi1zolj05qmrhjp8w73srin38l00fhj',
                proxyHost: 'rzxm5wmfsnizp65oy52dzasst3owl5mtqus738o9h9k5xzwhzvo0zc80591z',
                proxyPort: 9347867352,
                destination: 'wyj0ucons1oqb5s0redv881ecf0f834iqcty76k4oynkg419uvqqbrwgn14iqlobot0hztqxij74c0hg6jwie3s21ei9lfq8ff2aqrmgl1yunb2x5bdhkoezrc2u4pxsjrgejd6cx5fbr15uzqrmj4l3yusdjw5s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '43y4xbsgbu2hz2d4htmvls5tkcz7s6mvittzcldkc00cadbiel3o33pg0tt9g8o66gur9mwl4dhhnyrpcagbuav981myewr1ja49h1wbqouw6g15b79oia0ki2rm00d4g8n0keelv6f64yuhyqxm3ojvmgsd92d3',
                responsibleUserAccountName: 'wvegcfgun0y0an81bp4p',
                lastChangeUserAccount: 'ax6tquk0grtlz21sdjkl',
                lastChangedAt: '2020-07-17 12:37:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'aroy3a9rsxgs34yqh7k58ewy2cpw18v68l2j5a9kk9s9ocz3g8s5wen84g08g7zmtv40i3jrq9064xpyzmq420cpkb3qic5l9qb9j6z74uv6zloplgpl1ei8t0c593wgxvail7dv05xmv9w6wlm2ox3i8idz8jfo',
                component: 'ijlzb0sbo70qjt3mtycdxoplk1ur9jt1gxv0ad3r1lncrhjceg6ee8r984qfq5les7wlf7evwl81ebywsjyagk28egee51nxbnsfsjcqdv7ntg5h9dy11sfhtv44ytdjpzwcz76ewcgxd64tvz0wcx68ksdue1zf',
                name: 'lvsluplqlr8k2oteaotie7rkej5669imfinq6rw2a0ckrhwagxlfmxma3rc9hhlbqfpzphfzlxxhssakc2ux6a3o3g61uqhfopltyxj8q21mn4acfqpbd0d725zrkdjybcbfdw4zma39waox0u27k6vxwadmgc9b',
                flowParty: 'yg17wdh3an4wnhqhdzx8y7xtaxs6wfo5y4y347wdxy3vrds211nx454ngu4j5849nvxsjfjvaiwmsgq5o1134muxgo9h7d35pre625hagfazcepizs5f0oen9wnxauq7ml6a4h09uwqe72k418xfh3cf1eoztqoj',
                flowComponent: 'ybe7t063t0lf91tbzt5o2par59m5ncs5u36p3rxa61nkq0z1reeufibqvo9dup3w9ayd7bphc5b6lb4cljbkm6y2a1mim4norc686a9a1cdx2guvsd6tpperjz5f85z9f6e7s82p277l1br9kqpeb93ilg3fxldj',
                flowInterfaceName: '619pxd1yez8fi8re2ueqkh7824d9m4a1xpehh5dqa0on9m6d4vzl2mjggzvw2pgnfhbd7nucxr2gp4bpmu0ezu5yt2zcp2g7d4rooa6ohirl4hdln3cv2nahxy3t5eyz0g8qjzsk9lv23488iqc71zqknf5ms6rv',
                flowInterfaceNamespace: 'nvfj0wksdwnuxyg5luk4xd8zwzymm9yx3eojvk2tx9ek5hq2pbt8whlyr81nxtx6uc43kqnph46yjibx7z0ie41fh449daev32okuu9cba6ak4p6rqeaxhekbhfhl6nrh9l1aj3r6vd85pbncakk4qsun728i7zc',
                adapterType: 'rf8oa4cf2bhnzrsm07q5v9u8e3t60uw6snmn31ssdslx1votkntt1ot1jx5y',
                direction: 'SENDER',
                transportProtocol: 'qi1q6pn6fqjuv9of88xw0mr26qv8zmqd9gvzy1tqlbi8umbjrgg3irouzvta',
                messageProtocol: 'vs6nlh22ewknsi1uya9i63dxq6swwi036fvc4jonr7n76fmiiwo5enotlkk4',
                adapterEngineName: 'gnkoa9ygv4vxp60g76ok8ct1cu7zd8ih9nt07blvriuecwm54hf4wetlvzxbhstgyarxz2d4xsd93mwl1tbfhqd7okjaiaqyg65fg2fd42akmm7rbrpeq1057vbsglzxmts87gx0wgi6lujeiuidwx4747z8zji1',
                url: 'chv5xwcox8xlcuqfsbu357m9u649cjf8sfqbvmooh24onm5w5eqfitrnn9yck4d737x9awlcer8mdn05hm92363p73t41f2vbuac4n42k3cfuh8pswi1q6z418frlr7qwwaee2s1jio3mxoaa9njxq7jzm7qbgn7gv45abbreugyzlzkyng762r1wra92tbwkn8pf83mhos448roy37wiy4f42i3gkodd3n5oa9j6ui9ikwlnxi48sv0to7uddazafq67kaimr3hbcaa3yc2hon5qleiu9rrggne668n1db61iyufrvqpyq8g5cuzomp',
                username: 'ohchoajjw1mpj85yk53ybyzpaq8ozt5lc7r91nt13z5bpmdjx00cyre4ffcc',
                remoteHost: 'cwxu9c4h47672hc5499qdt8h0ss1o9kd9dqy95o841nu97663nj1fyhrleyh1qrwjiucamykfz9aiso10246xwlkm5s4602ftyj08ukyrm0lgzht22ppehz3xd6x6ia6hgffxka9mg37u45oo505etkvade1moxs',
                remotePort: 68436316908,
                directory: 'xgixvxchky3b89mwuamcx95tfzpi7pycj72gkeh5453c0oizxa5cu0crw9kn4n3brauqdy7zg8wji04z0dj5lyzt8kl0351693yp9sj4yivofaac2kb75g205itgviwosu2mlhujwyxgj3d8uxx2sp1a5jow9vepdxnb2wugs1q3oudp2jbzvzzfsghm8zkpgh86qxbxb4pid4qx1w0dv9kw84r9lsnq8kuj86o1v09nb14nx5k98i8vehh4eof376rs9ttpvv2rrmibyozta5h9a0xlslrgorazf118xo8p3saztimeo6yihrbpjs69ghogfuekzfse09ckj27w6b4nfhbskwfnldgzzyuz40t37pir25gaapwalauvjwadpciqivf3sdj8po66x5h7r66sx0ktv21a4lzfvnfh0gmzkizb8qpck9uoz85unwnkr5xkiu14jbzsrf29p3oay5nystt2rlwliw3w6hg4vsku3gccm3dsh4qpz7f6z41i2x09vohsj4rdvp53wfqpjmzu4vbs5otr12b0rfic3f7ywbmw5jw4cpo6mp1tic36d0bzjzkewr8q5n8j9p96dzc8h1frfmv7jqlniwm6gzkr0sobbocrr4m80ke0c0a9iyoa0oef800ie331p411qc9m2k00qek03b0mi5jvmywt9lfcyynsrqndzvx7oias8vuu2r8x623hx7nq0pzm5pmpou8ytrbpivivwvu8plzp7dy0hmw2fm0100i7esfdmulhf7o9p8h7ee369ayapb73ljebthvlu91blrtdp4nyq4fxcvmeik0087rhbhzphj0vtayyelgnpvf341bw9wovhvr2wzzgp581n0cbsfshmctllpoltilcyf56xpdw84ev2dqpkx07iwuhjwwybyicjn9aoozolkfgzb656gn1sced6w08jx7zq1fvgi5qkh9g9hm21pzb5nlc5dc4q0gh0g14nl7g6luaur5fug3d4g9fb693knqun4wk8ju8',
                fileSchema: 'yql1mx3eq7w06r17h21pbhjz3j3vrzmxcmyqsvs9cn7su0jwanpw9ah99a0g1fgu45g2d4bwpcwuy0g95orcoe5f0oa6a0z3fpg0c7r3fhwkeeimjadz1ctuxf0d0oc14r0s3w8o91l77yz9wusmrw1rfncdd6opt7j2pbgbqc7mb1kuxtn2d7q2i9sn1zkopnnhgwj9hv17kgsoqmdqz12elfc9omtu0hwkjgt5xdx0ozal3lk92bwt96rd2gl0dw1puev0xj1sm1aamgdwvl6ujdgdke0j06z4eanynv0pkxkpt7k2vbybt0rwo7wvgonzgqio1ekpx6eabc97qiequxf4sfs48tgcc0tu9iqd8lbe117f11j4tpbleqhpkm8a73157mipeuh8221gi8t7sxjkck9qdgwlp0w2ctuj6y6t5k29q0dm4xpwwrxr86a7co5u9flpmjvy0rsfkz06nvm7o5f60vxvkwyub4ojogxq2xvraayclp0ei1fm8gg84d7ridn47d886cyzo7acjn0qvia2mp4ephvw1rvtfyasvkwn4rprtkngb1wnkwcw942zq1dy6tnvp6sw4vl9a440zgk6q0xr3kae192f05vbg7rrhahpteyiocz6zu3kgwk7akmnpcwgul817204czac5tkkf9r31skodnfa1pkb9qfj6xxlcwzlexrg5tgyh0fwvu7l3ojsc96br0qu8asj5ij611nztf4ujb142u7gz4rhz4157hoak7gtb6h4um5ong91worw0irjnir16yg7r3qnvmgt5pg2fz4c7dnh4ifd9b1rypi4lik6xwyquoxgzs9dbr0uw9w8bqv4e3ia5jpdeil8v4oiv17dkqtlg2mcjn84uury72023x5x39c2h15zidfmmbne0kum0ozpb9g9a2adkogrcwy6mu2l559ytg6dmtb4ha09o56wrjlknczkxuj2wjff5gu5lco3klo641scn86e0ahx47sz1b6jjaxon5ro2tmr',
                proxyHost: 'sou78wcti2xan4ibg9o3mdhoefb05g3wtc37ny1c52nlub7k5r1a7rmurd70',
                proxyPort: 9895717920,
                destination: 'sy4pmgamf417jkbog2544olhuyw01y60zkvyp0px1sr2dgzey9gr6vq1c5ek6yrlk5smtcyebs2ot887uw4mm9vs3cpwtplngbculf2n6fmv0l8yq1nx4kufjt062o5irm4nlw3x49jv577f244vo0u6tu0t7sls',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zw4h1366ekqt5qeh9ur0gqrh25bupfqqbmv7oran0u2s500eb560vmuhji2iicfjg8h7t9b0jwsvzck9qrtvybvpcg5g594pslpsrhsjb5kf147y65ggkpcn2e0dub6ad567lmf6n49qxzpnjqri9n9k203fhd8k',
                responsibleUserAccountName: '257n8snfk1jowdw641rt',
                lastChangeUserAccount: 'k90v6hfg5o9e4z51w0qg',
                lastChangedAt: '2020-07-16 17:27:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'po8cwwwk0pg02uz17asciuha02hh1lfbqt0o7y3j41cisf5czsemiujl5b1p98kkq5nnk01kkvksuii5qpnmj2em1a2g5vwb7dfml983n61n7oomlf7n66b8oi4b4w2yy2qlr44mbvt0qurxv3gr8uefwyqa8uc8',
                component: '1dh25320e2okp6hakok5jj4kq9s53si3c3rifcse5hdspqr2hz07hv6kwxf9ve9ka8us3od2eo3cg2mftzimt1e809cnfhm7sgr94ac8xn8warks9s3n5xk7f5ohsyjklfrzs4mns0ytoj04e0z8a5gsupx2penv',
                name: 'kpnbt6dh0c6zqu2xv5dsmxqa5na4d6kxt8hkkro2nk915cwjxmem06ddo0yk9hm40ybs4vipbvch4uxyct2594309cnf3cz7xtk0qdk1ix56akn0zc4s55tig5kt5j596owdki4gdecgcro1sb2zzsaxxp9gmyaz',
                flowParty: 't64rupgr0ji5yilkmyvq4x6wk1vhzvmjynkf9vio2evubvkec65r82vjnxs947g00bt4411wzwh1363idhs4zyrngcepr0fhdyv3vkba1qzelxywh2cv6usjzstmnmsysyme7xry3kuydclccf2i9pdimv1rsmwn',
                flowComponent: 'e0yaiiox7wo8ik5y8bv2ykqtxgm9ixqxsvaenx546qzqtlpv21f2nby1dex0clm9obm8ok9d1uiaw4vqyjaflft1kt0jrfpsiublmfmn2twk1cf0zo0zgag6rxkhbg52e8xurv5pql1gwvt40gqpyr02a1cx6d9g',
                flowInterfaceName: 'x603o7t4m01yppwhtwmced5xl8hy0r7rly969wcxgfuvz0xn28ytgvdfgvl1454b6151rmh3k4hcwevc9l5gab0gmxeocnap6vw5at7jwgdkphy3a4bngffbgt879houf8zu7kfrqywrpqaxts8m2t2tk541odec',
                flowInterfaceNamespace: 'iqe0hzempm1gvlwifc2ervfvenmpuw8uhq93gi1ec9c7clya93pvzzywz8huyegqf3xburvfgd4r9o42alkc5p6389js2p29taarcxfbvpxz6zo1vkse49mbgjmzk4outn96453iutmogfax7a9gur7t49geiyic',
                adapterType: 'nyl94fm78osos8q0ilelkjcjxtgqe0z073is2hqpx10bn96vt2f11e65fmyi',
                direction: 'RECEIVER',
                transportProtocol: 'pakn537ycfb8lve1jx79c0y2shu0ch3mwz06lqhzermhqz44cxj0zscjkd65',
                messageProtocol: 'bijn6vt9bbjqfzx2vh28cx2ejui6kw23q8rt4zz6ii9uls29sp60201m9o4w',
                adapterEngineName: 'mmipj2qt3untygv7zvht5wmwa1kccw6w73jlfxk99kjd8nb6xnwh0l5ytnmzrgnftdepuuls7yz7bccbw9dyhg75usrssefohhq5xydvlzic0dy4tgln3qyrivhk2sy40lse9z5g1lc07f4b08fr9jlojowyo03v',
                url: '0w4lazzqdbzft0nlpm7zf0n89w2f7ee2phd6r0u5jg6yo2uh31vycrvcfsh2lf42w1hvpq4b2iac3jnhd74yu7axtdm6ds4mczbdz2dnzywsc8hf7f1h5zrp2qw95jcpcbfpi4iq6b9ehjx05u3u9jnlh2qfwfpelj3ghkswulqfqgztgku1vn0diyolwynfb179f7jupru039r5499rv9pcun1gmghsdxgxpj8874ug5lfg8o0fzkh8os36r5x2f4ul6n3okznkwu1x0tsnihfkj6t4lzbmngtgknfkl8v5xvxz5423ss5krswo486s',
                username: '4fvvxyr6d8k4rlyi82od8gqc5xl0ow432rakq9vmk8t2butx7wj6dm41pjyb',
                remoteHost: 'sv4mhmbepf0x544jomb0s3qhf3v0owe928ax2igzxvyhkbi5tj3hulju0zu39fomimt0io6oo8hxt4rpr67v6w9is2h1i6y4btori8cwukp7az8fu8lsh7o02r6ptzndrwuow3h61fyd3ot05otqxogyod1ks6z3',
                remotePort: 5726677281,
                directory: '77o412dvrue6hb39xvmrvxd4c4k43ikbtumvxzhc661v5yru9lrgtlqmm9h3zqzxr68yhpftwfs0i2fjgtjyzt2fqljzf9fprf6e18x47usm4xg4z2ge85vkdqs7d0ie1kr0ncfmal2586eiyymdisingxzo2loeqvlfxzfbjneaeqo1qtbdqtdq92k1wfcscy1evlg61fs73j8foq8pxi4h0erv9dkzdixv40uss6mp8sd8d2kf7gosss34wumjl2t5tn0ldcrdi4j23m46x0dsqerxhg59yhw8c1ss1wiqlvqkhuwypr4pckd6pwvfdotsje1srrcnjs23wyvygmi1076371jgy05fg0jp5lzzz5j02iftrv7hhp4iw7mabkicgza0cdme5a2psbp6xd9zgyjl32smp1dl52jwy9tjiuhbwd7aqithpv53f9sqgq3vk4gzb60wtzpda4snj3gwnurcny7q8067ty4cby35fpse7l9uq8tidipzr4j1nalkjrs9qx7u8ku9ipxndi4tun24yy0yy8ezfnzbt9rzl482soxi95eg1wxb055g3ho5zkr2weoal9435fx46aglpvxv1t5wel9wdte9pytb540ln28579u9ioig5aq2gdis7swwe9zctz5v49q1fzmhn3bnat21qmewntwzsnrue4uew53hzup4ptmivi8wcg8yxlonnz7cyjestlfljbhmkv7thxgz8b7g4cimesvcpx8jl9ffbewpwuxxgs1sn086civ7vdezyjg3vf6kw3mknq4cson9i4mhgollb7mo4nq0iygam4xc4xpo37ry9m85xbnno61l2kihz347z5emnfk47tso4dm3qicmvap9cg18blq5lzaqcgxqb0g4b4befmjejt641qo0mjeevpdl6kp5vqlebd89f7mw7fhjvtev68op9cwm1fuhfs3ahcn0onq297s9qf77wiewdo9dfk48z4475196vblymkog2c2e9n4u2wxhey58x75jf',
                fileSchema: 'hu6oejqrxlcvsq8o4l7sltk22w8q6a3ltau9bistwwlfwn89qv6vild5dax25chjd6tgi3fhwcvs85v8ctbpndbe2d38dwcj9a149zbmc44jp7cnbz9mpjf482fparknednz2sasd1rqzupdtgdagqq18zgzm3z3j8ehazabcui8m66v37p2etzm7u3cqffq8jsm7tndghez6xcxa3pjdpidx2mvick9k5t5an0qpxannwndyep57h7g0wm6tq1sxy4xcgcs8qs5p5cijb3cqj07u7q6zbr87fncfquaevsbf4y26gyr3q7lvdbrix7hy76i1fvxzapjwqzzs0hp3sdtjkibbqiha9zjv704hmovooq8wl07zy3r9k4jw804gqjsb9jmy2f1uxz11pw9ilzedhnsbmywgirugd546sob7uac8uw5062nllto41etdbjbyddbgqybish9fipi7567u21sdg0u64tt7hswlvcmdvo8lnwer7a34abr7tce7ju3i6wt39tqcb7zr5bn9vzgzhb73czhqgws2xpypbx5xi5a3rf0puo8ppv7ppdaq4e0r18hwe8je598kx9qrweumoyvm0w5383cjopc4p3ovfbzpi7v3xdxaj10ld83vhnvi6oto9qfkmhagf6jn8yybor3ohj4yph87lkc93l7hr7tsvgk9nbyeqz2jt3n0klpeyyrxm8h166rrmqybf1smk95rdbk6h4gepku1pip8ancpyyw1aq07shu11rth2zozo9w19ydscljpbz86e3f1nuwcpejpzalvxgdqj0a9ekpqxzm7wr1vhmc6w6bncf4ennmucq9g31bmiw9bn5crgl64b1fn3h7xbqftnpj4rbbfddnzn0zuxndjj85y3zgestcvtsabhhc4yxznaoskykojm66u21t0bbbbrvjsvizc5mbbowk68ico2bflp8e11e81ytjqdgtiaymepe3fk53avd08cvr12cnub894zi2iep2e5qc8mmf4fbs',
                proxyHost: 'ofrhip25sy18m96ybsz5nbuv0isldfhsy45qccgg9zmhvzi27ugrgtdfztmf',
                proxyPort: 1600823759,
                destination: '4qbz7zsqkb2iv8i80bygcvinh28tlwp22t0r18xpsbd0esm7lv4wzyybpfl4i70kto5ofrax6r9os81tv6s312j2yhfif4rlz8xp25g1t6zxwtypefvwqc6ugtwtm34yikkrgkyfxqv88qd44yhm0u197dxvtz2c',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5rz1vj584zqrbhj0nt29qupm1yf4nqwsmg1o4pvwfkzetpvhkqknbz7bvb50bqeg83dvi5tg1hhoqb6lvfk9vgafn69cse7vuqradd0kmh5u344zv39sb193qv9iqzc5qu4oysgdk7iy0he4mkrrpjfla2sc6fs3',
                responsibleUserAccountName: 'ak1pnp5qlmon7t479963',
                lastChangeUserAccount: 'dtyu35okcmljv8n1u5sx',
                lastChangedAt: '2020-07-17 08:57:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '0xypvm0ofq64a6mrtgu2cysauatjfic70vve82y1r3c4ryn5i4ipk8r0q2f3zirxpxf4jioglnooizs4cw0tutw12k0718d509a90s15dblnze2p8hlu3acz1yo7owa7vawkjmq5ymhr16j3e4aqc5gnusocjwza',
                component: '380wtzr6lgf1y8wgo7oq8maxe29lmptbuje2gvyys0tp1qowh8r3ziqu0rh81ig9ua5ednb0d9nwf91c5e3h90sqemuoxpyosei9z9gn66hcc2blgwwl8dq2m4yrm3vp96ojxg8fs6b2zyx9tid8hal7ymezca24',
                name: 'b0s9qjbbp6db72usli8afgd73fqtjnk1mkz93pwg6ww7q17nzs0q9eah9grq8r6os59s1gji8pcoty4n0jhrmaah8cv0setsuj43vhbm7ttfegbcw8wce7ptor4fw1jhp7ipvk9yc1o29fl53fi0hs220v1hjxqv',
                flowParty: '0bh221q3oeuel3wxt6vy8hayh1v6vfv48arm54z4w5hqg4o1p2xyeydvyyzdz53scurl58ft1mw4v0hqtz8xt8xw5uyb28ni4k17uvwzchfvczh52f3m1x4dfn1ez7qn9gxj5rhe8doubc97cpgoe88bjx5m31ed',
                flowComponent: 'czssnuw1nmtlxyn0kjmqm8k8kvqzb8gykgitp8iq7n4frbasee3pyy8xittnrw2y7s344o27l02ly6cd2ebh9v9kjjtfdyw005b32h32bvblsgbjbhkkcklz6v6qvmbpzilywizvxcul92jgdil71lox3a80fomm',
                flowInterfaceName: 'k9nfo27pu9ub1diexx2h9yrwul9hhdnfp2x0imwf1p223ygzn2xb9ikc0vuu6rq55rlk32djasm41gjj86nuzleu84dcmueox61a6oipa9xmb8reg4x3bkr0tnyh0o4njbfu9y1n8pic8brvp8fxh1q8ia0wony7',
                flowInterfaceNamespace: '5443w1cjp5u6swfz02pb8r1swp99vv4u51gbc6h20ad0ktmykkbs0jupftnjs28i5bhcwra87oefnshrqw3fazrmblyym7ajnln69nqruvcdory5ae7r3s9l7xqom1c1j0slu5r55jq79cu100s3tms4cav993qb',
                adapterType: 'ybzkqhns2x17ihca5b6goc06cdomoj7tz7e6k382ap7jcbrza9s354vga60u',
                direction: 'SENDER',
                transportProtocol: '076cly8xwneb5a8094c84c6x01qp0kb6naq06inxquutu6ponz3gd62mmysn',
                messageProtocol: 'ao7s7i3xeqo7h5aq4009kjbv2e6prsd8iodvjezqhr81rvonx6s1mh1qqlhl',
                adapterEngineName: 'r59p15tk4uxngum1i4aed992uo3xnv6kz5i7jyatmyxc6cxtsor53u4xvkn4ntbcurvzl65wvx4tk7k4e903uevubpvbappqs9bhgxm8emha7bzd3zwe54vdf1qqxsxmq5gacpdzhvo3t3qrax1dxk9zgfqlictt',
                url: '4xcyerxr49jx23dyb1d6hbxxilkx289w33cu9je30u0fbegzi27gat855hn021c7wqlttdy4q69b8om78g7x8mu2vx5e0rwijodtwt4pe9wqe56anylo5cxkrfbmnjzl4wqqp5uxzwojpro6vu1ibv2h9d014sx0fhwlkdzxucfzi3tult0m52urte33fl6bmy7bfviyluxfxko3q2l143h3txl46dfwquvyazmxn5hzl77ephnsivmtw77zoul5go9wmarirzl9jzwt5f50pptg1nnsw19saml1ix0fl9elhos283vac3n0doszn3t5',
                username: 't3zwremg1qnlvkbtb8nzwhbn2gqq43hbt35jd7emp9o5uomvsdruo23miqjy',
                remoteHost: '1itaa1mp7jyaqtxva5b3grbue25t3fszzwbfiv9xgx7vlqz5scplxcapz5kuy1ljmzjrnvmggojhlxzbia40du57u271545jt5w3phb1rxr6a2dgl5nould2i677wvhpl9wnq7pfslzstcogx3igtg8zbg5nv1wg',
                remotePort: 8893408160,
                directory: 'h282v9r3iqwoceza4qxjx1wmidwnmrr0cf6e3tkhegnqlawt1k1zewq5tajebc5qm6edjz4y81vja75dinb7qhdea5gyr4iycgcvyaqyyk3425o7p9z5d9diqembncgwq823w7gdc0j591lagzexp51garb4fps7qoj5m1hbfwjleb0wnd6kwkeu7b1ipcypak56nyn3bx1os34ro8am5lempw61yxykl8w8fxfwjf5zm8vw9js4v2a6hznkipkeiz115r9s6ulu8cso1sx692cn7980525aade00f0n9xtq4xg45b1x4i6eaok84r2isewxewwygfvqlkme1je77coeesw9ee46y5mn94cy6o433gshy1wg17ql9jksu4c6pumm4jjsrmwhrpkyo3hzwh53ot2yu5fs8kog2w9t8zn7774d50hcscgd96zgabby4450zobj6xk095dq4rrguei346b0idflwmvkkmqwfdtqj2dcdjo0jgnpba90a23k0uzjl0zwqm0rh7l2j14hknzqkvc7924x05z2wzacy6ca8mf7gm13zaodj0hmpfdux1uldvxnmb9hb18x4g1pezwoubnmn9j7r0tkvzs6u2yrgn38is41oqtp21ktteg4csu7qnz8wf1ks9ycp4q5dhejsrqjpjoi20fhh1oew1jh4ga9j5en0mfjik69zxujfkqpo4os46muqlvyk68arlayw1vzdfeulu4atdt0k3zs5z29f5neqg5sxym4wrbdqovcn4la0bpzgvyusbmhvqmo5lu17umyvkk1zg82god3sn2v7ptysv2vhto7wu5wt8vl9zhg7ii1zh342g9735esk50wbiq4ggm83rtpngqa2pomzjxcwltapgwfdjdh27u5p2f6arorc7vf26p88b7u02ytbw44t1e0yfkr0dyfaytk1m9jba54ycaqm064e44sejk3acje0vxevi7blqpnbymdj7cpinlk6zjkc8xavyd5ip0e6p4kxwmbda5x',
                fileSchema: 'xq0pmjn0cd43ow1m2tu2vtpkefhuvvl0busl3xbfhzt5t112z6j1349cy1onvhte0m34r99m2c3rcawpm15rjitewcrgnd231vqztv3x3cx6b36lb85h57ido0bvm2p5eewina4ug2buqd5p66sv6hfqarai7cjx9hhlc3j9v14oq2ot1mxhn9n3spj2y2lrjya26at79yjobpw44wwy0k2ybs8fqz14qf13dyqm2bjz4owyzwxv1k22v2x7zoru0gui9ehulh4j1n2v12dgucf2w1c4orzozairvib3smw1g6ic9kr5f5ifmc0e2j3eiieodpct76a8hylyhj6k039pwttbdfre035gqzsy7iiv002t6mqdhfyilpq2oyrsm9kaoy2x0nnckm6480uzpetxg36dha6s97763fp8nsd0pipcx6v8vs4jp4449fae6cb6qjtp86c5jh94yj66a7mbz3zbioe44gl5vt2jyfksjrm2lq3e7rfooo44epqartw2zrgptpp5u3cmusta7e65nmx8luvaclz45d04ebxsb435rgz2kel3heai6h7ykturlwwmdmi66l0y58bqjg5tw3bibnhihnrzz8otdm6y8z1oxg41jtx9q6q6r5z1nrfidfujn080idwr2p8w4v4awxawwdxeyx422cdutuzp59efiqym2911ez51nphz1wwwkktiv8q2w8b2kc4wvu4lf1qm4em49pocr86kd17a5e93xfly9m0pmda75tp3cnjybzr8wx1088gttvoj74ypiqjp4hc1fdisbcux2chncm07f0md20y32hza6wlht3vnm1dkiw0eeu65gp263h4lwaxpj32229d50du2hvm07d98p9a3pppuod72xo02f9uxdjcol3dp76yivdkk9ct6hclrw8d2h4vfztze46wd80azfub2ozrhxa8rhtc76kb7dxfgf6p98tgxwsswhvvp40roy9461dpceg6w0uktizcd3ndss7iceanbwawv4',
                proxyHost: '9veavm73r8jpcs0cjjnmtsuczmojq7vcfyw9obq4swrns6nk2hl4bs1jn6ew',
                proxyPort: 4385768158,
                destination: 'zn5u78i66ogi0qds02hn9uj6afhly0m4npadf0a3uaiu8d8jeppny24rdr2u5uvssbikdkhgue3ra1w3h5pdy8yfpyc8f9g9tttx1367akw8y0stt5fs8aoqi3kw8kgdywg42yi8o5pc49u0wsl6fnnotymdb3p5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wbnhlk6em3e15pmwn88ss2udz1kzul77k6qbjjwkg5jbncrbje27dv4xypyu6qh1hsbrsyhdmng5ux54nngsaj295fxx70fpm64jvrozj5lldohya4firxcuiudj6pf5m6n9px81r7a6sn72r5ln1tacvcesu6xz',
                responsibleUserAccountName: 'b5n9e747h7lrb7kfqu7f',
                lastChangeUserAccount: 'eyuri6yg3xw6plmvkz9u',
                lastChangedAt: '2020-07-17 06:37:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'z6986a5dccjsicx4kcakr6xbzff3yog3euh4asygcv7v2qpbyorr154ydpuycdkcmdpt9oyyxn555l2590ml8lrtuk229miltrejtiy8saz65m6hityy7bp1qu7tzmj14qiis928gngc8lmcvxz9kv73vqlb0w2u',
                component: 'yqz362j2r76wl5ws8vyj3wvfuweyqfdfj3v5nw4j4e8sczq02np18spci5oramh22k50829tp59t4e6creqx979xnxcwmq3ml0npv0r6yl3ydupvg89c2ys58fqeh4gm0ddw8wrmim0jj10cjwob4tb4h82o19t6',
                name: 'g1f5106yp5hon9ep5qy5n41y47dems2e1xiy0dz9i4ut3w03xhfr6m0v2fcazgh75a4dpkfn58jjy0uxpxhbky0kr5do4doi0gq31zjk0rzcj69y06x932m4962ave7cjeoigjmlm44olhxx7obw5fbn3016k8rc',
                flowParty: 'cresn5d1rq1usw0iixrqmf6pc351nvr6sp5e9ep7s2041xwnxhqsmoe6y2yoxpl4q2s4zlkixxhpatx0jig42oku529o2oszwko0z76a291d5nhwi9zv7br9i18sujcyd7d62rzq8kcjl68ntwgn5nbim3gyhw0x',
                flowComponent: '8frgmw8c5nfem0a6rnogz4tqog0rpov4mojwgx5a0gfilkzf4tdjrlt7gfl6speiwtj5b7756xiqcmsoiwg9vro514rzn84r611btr3rohz1t1xpggjug3u60krdqv5u2affcd04hbv9n327qqsgng4rjx0tiag0',
                flowInterfaceName: '1ff5ofs7hq2w4xe31aph4txdm4fzh5s4fosecybf9flyxy7cu2ees3vfme6q2k0nlk2wugwthb7uth16qmtk1hx7mdnepxt3nxp36gosr0bs22jpttkdwqpzi813vscwr7r1ewvyp1kr7vouh14nvyneevxu1voz',
                flowInterfaceNamespace: 'yh6e7tqcxmrtfivfwyolj558m7i5ie7g6f2nyz07u7w5ono5bqxmwgx0zgd0lx2tyf7mssnddzl7evvkk1glme12ogov4xn22l55qmktxcdwj42ymt306jwvvli480u1p7stzmv8ky11tnu8xvqkmu23j6zmrjm7',
                adapterType: 'vjmunriqrushxtt290eduwc2ouxkwwni9wlp7c5gxjhkrqig5wtwlmoowhx1',
                direction: 'RECEIVER',
                transportProtocol: 'h3o605t7gdtg6ycinypk499c0c7i8oxts740ulgexeftxfky3o9ub6w2wgwl',
                messageProtocol: '163th8j0gfbgesmhbc63syfbxe4migbqsgxvlra50meuw0d0m27d4rxdb7hs',
                adapterEngineName: 'xz7hm3a5l5o8fstiyosy5umjea610tez3ufu8g5u1wudlvp1ugky3m4zo54rmpb1imt0req9rjzx6ogb1cmd4v8dcrzsxc04x59ntk8379fzutng5qe7on7k5vmrgkylfdcwh91h8kknjhnadzm88wcvv271lj63',
                url: 'i2khpcvwo94l5crcfwbzkqzigh9g8n5pl6qnpi8egv4gclu4gs7eage571jgg577ulory1fac8g51d8ybdnrnpg5lc5zvgwjt7n5ek0qg1zq1iyoxysb3eff6r8icqaaqhi17bu0ac0aaapdqtyomhq5sfqrq5o1d4dw79mf0pdr0ausnsqmsgd6s245ur1muibcrmvuhb1u8urda3rpgq6qsehmtc94slcw0zjmujogh24pmvxxk20xjk4wypqj22wx8t19mqaj5zrntdqfk2qcd9jfh8nv2ihpqjesdceitv2o5or3fjqloync19x3',
                username: 'izrgp5jkft2j9w1sk4lhl1pogv89cf3awocrm7vx0vqhagun7sj6z5btfsh1',
                remoteHost: 'kvaf1kqqhhziwlej23lwuz9oitdheens3kpmhrtwvu8lztxxi2prt54faoickigbub4hq42w8jb4tara44bxu59uxzbz9vegfw26o2wytk7vna1dymvq0dm05qj54up0uz9udlbaczlids0mcg2ctt49tog2ifg9',
                remotePort: 6099921985,
                directory: '7x5f7dt6jk7ngdda6j80lyd8jgvgbn392xyqe650y25ybk1umj1iwhb46jatwf0ajmp4ir23qvyftrh25yw15gsfpfk7ptve6p61xg8bhdrlpdsm0qnmf94htnv04kutjrxwhzyap3c6pj9qezenfaurrok1o3n4knuycuujo8zy106y0bqve3ngrek3xuhyrs0hc6nw7gy83idu0euwb7zwpps2x5ijdatp1xixbcb60td4dzfjatjsvyexngtyjkaghsleei8wbuyngxfldtc2ypmx6uxpl6cin5ok5k4dz82db0ak0s2ed9vwkcr0d7n5n0u558ynhp8k0n352ndkeg95ulk2koyxsj5an4hivu73en77p283qjztz1av1lyktz9dl1zq1iy1c0ongd2zivfk893rh40gfryxpvfhn5c24ggqkf6mze7dl7hui0da8kpch2tyqidlts37jgck6o55d35t3nq54dv0fb7q31ozgw3f7rwxw4qvwx8nmrke4yyorblm9zt32rs3p51gmb1ail207wrjrpdvijxnw9pqj76s29hivahewlq4a2eeyl1kmm56kjruwtxg5fp9tnyakv4znx3ovmk5zkjwfvu16rzmx03wrkjc4jyxpijoh7zhzewnver63hvhjh9cy7h0cozdcqbvn918eon8zcohzv3do7eo89o2rssl3hnc08grt813gqhw3conw3bg0253sj8e4wyg2fs3fn48mfgomxppa63m5hfod55zcbp8zpzc21v9z4n5d5m1m87poa6ly8gzyu4sikgladzaagztbhvw9s8bnocyvkzfdseuumhoihs2z3s115n11spkzuq3w9lti9udh6axsx49r5a2k5nac9r33sfbibubngfqf8aac966j0ff2ynfosgo65xc0c783bp7axx3pg5xv4eosgf8yzerqqnbau35ju60grcowsksvdrd80x34y22hqfq8b6gmoao9pjjybgsamykt9zztwbu4k3zvgbj',
                fileSchema: 'f6vcmqlhp4637mayp8ms9d24nko6nq8ikov1gwraa68wege7pwg35wfzttx6azf2zj90epysuudceqzzuo8nxs30559yn9rhu94ygm2z6rl1jwd2xsjhc8z4sbzec2f4g0lprxinhxg40zfjkp9h5dbotq8rbq36wfsnibacbtk2nek6n2dz4qbf2dkyf9fncdj3c32mmrkotouiruhq9gwb59wdic7m18ubokr5omj6qmujzu6mz5bkbh7h6ws113dw8hv7cbmlt2uvvwp8h9spcbvkpdko4qu6z1fs0z6ei3g92ry3vy5e5upytco9im9yuyvnl7ngus2frucpfldsbgl272v19xdk1dba4v0pvk6t4yibi70d4oxddxefh301sz6mdj7wtf6atlesa6mo7djrk1p2wkbyw605exg6kyelylsiiocc7ee5sqe29tfcyaqkrldua910nwlxzqqhzb2xg3d2ewygis11kfsnl0hwd763if2hsw4vawlbmw8gbsk1dgyvocahx42b9fqxp6as58lxb4yh9699zhpx6oy883p93737a5kuhqbbjc4anwy2rpdfb1vgyogosqf9vq4wa19dcq7wws0veyizz12ub0nsyzmymv70zmg2wkrmb6d4aswz3iq2wonr83buqsdy5z5au50d6csjqe1voidqrvftfzxu9ssj2k5bnyzb6364n7a6or7ebt5qnh0xcwrk6otb98pxtbxz5a3bxnpzral8dcs19eldzbepnw1in9fplsrjubvweyirr344bhjsv1g90cpykjompyaj8xyfxjbcndpz7g1k7lqshs1wmyl16xyd2m9m98evvefjy79ozcmeuopdleyamoj55qhzgirengapwo3qi2gvbnbe37mc3szpq0fw74flrj4f8hio9epre0qdfqywlo4olw6khj0c7nf8iyikrlarxgu9ztcyvbst0bf29x2lzxd6eieuefo5h0zme4evtth7a1j93uue5th2o7mo124r',
                proxyHost: 'ze04r71lxs6t0d9bs1m4ly1vpwnkzfva08hx7ifgkt6n0hl1ofkrzcwyjay1w',
                proxyPort: 9648715139,
                destination: 'zt5usnq3u1uqur0wv6vogtkqagnsq3e6u103kkogek8v4dgphp7giqynf2lcintd91ynl5q3kefgwvgu6ip9tdyt0ug13beghkzlcltsf4f8q4iq6zuqys26dz25l05m9nxr9cu519n1rf0yfrcmi1okzhxf9xch',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zilerxgifwkyphga7aaqs9p7bduo6ss1ey1uutyv520v06c1jeznaz4ewzj74o3j8wzvifbusrf0i0dlurrnsfzrsp0kywi4vhgq497uwgwyya8k8h4u98uoxhsawvpbm79op64onvzbflbi5ag32c5brsfku0k5',
                responsibleUserAccountName: 'cd12yknkh5ysrc2iy9ep',
                lastChangeUserAccount: 'xl63rpdwaza3jh8c71oh',
                lastChangedAt: '2020-07-17 07:22:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'jrw68sdukpbaovvbip17jtpo6h59dv9f1omyvhuvt45g6o9bsgspwuwsp6z62t9px3charbsk9rv9xw495pfva393aco9wfenjuy1447h58p4nfmihbownk1dtfgipvdwei1cnyzpfyqb3rtah2prpza6jjd1jiq',
                component: '3lqdl6y25om4ig7j6e4qrgro90qic4zigodxf6fc109o5qpiyprftny3w1s4q0k2z6f2ib4wxnl7y7rfjxzegof6qddek6p8cz36p5052glqhkul72sbdfui82llssulfikxddp89vz76lxcsr73sbmvm1o2uvdm',
                name: '3ny5r2jaqsxofqoxtv28sg3m33nqapdcjcxv10sk662v3f1v11d1d7q8hdp43scs5v3fjt8ua53ulfilheq9nsmlej1qxrj2ly7dhmqzc9wzrv4zcklshqd01o5f89j9jk3rlnh2shevnsyq2cs4glhy0aukh1vx',
                flowParty: '945mt6rxodccftszjwvliuayfrtu1c013rpekdfjqrwf6h4zlemfcdk0lfisx22hydtw3n4w2pujo2smi7wjapq6yuwf98l8h6tlj30tj4edmp5x2o4rdefply83uv4a1qssjzjclhv8hzboxg7wu8j07ao4eult',
                flowComponent: 'rq26qh60pasz68c6ql40ko8kxx3ce3u592if4myseud2o60mv7kf3jrkyuayq7om0de7x246vkarnyjmpbwhbd2njt7glm32oki10tsbd88kghbi032xy686evk9fud9j3llg3gx22k1g2t56hb32nlj64t7v1p8',
                flowInterfaceName: '5c93zrklnup52kqvbvjejoqzvsot357h8e5ex6s19rbd2crnjddn2dx3hegxz3n1gipfy0j5rgzr0s9gqyx2541bzb3kwypg7cxpodd5h166uxvm45tolo1t3fl3dcrnr0s6mhonc6ltzae0s8vukozpfr0edfzp',
                flowInterfaceNamespace: 'pvew7sm6uwlzru1b8yaanvxnzwx91zwoutnh4f6tn1r41lnffgby3olsdyr01h4jmc8dx60o9wsgo6vxwfgfiww6ldpcslchhkwz2ax26fx3awy0eokya2wuj3czbu8ni2k2nc1rlkm6621y7vq3gjvfzzgum265',
                adapterType: 'v67r5bwq6b4b45o9s14sogv11rcb70f37m0dydfazv84sav4keosurlvfe4q',
                direction: 'RECEIVER',
                transportProtocol: 'rv0cv35oxqsfm08swcw3ww9zkgykp8m55yc6kmg9rlck5xml0sh13efpf5tj',
                messageProtocol: '4objoz1ol2c3hxv3oke5d2wx9cl09gtm7sxg4xyrv9848yjago7hkn4szn5c',
                adapterEngineName: 'lpey7aufwuwzaa97q8l9z3mfojtabvnnbd7fedtqvkaud3rv3vcyvh065agihc66kkxy009dz5uhc7i1cemlqk3rfmtxgvtccvzqfmvmvql9ty6y1jx6kvag4pbzyeohuo50b29qn2kt5b2uxye7wfk1pfhmfvx0',
                url: 'id6u7ykhlbf9b1n964w0ae7v3mwoem4fkn3w98q6pisj3nler6u4zytqbwunks2q9s076koe5yt8ckxjv684t9cvjez96uxizyulbiqhn7qvbpnd0ihi0xv0b67jxnoufcdfriqj9b9mfgv4onz6l6pu338bjfxujwhzegp296ot3r5167a32mefdmnsbegase2lizpf7dgqnk2fuc5q30ivhol4v4f02zva3pu0cqx3en8bim8n2zwz55dvfmt7jjeq405hxga2j3a6prmywvk8knnrwmf0wmql6n0u3c247hxsjctkqfcwswvq78xx',
                username: 'ouvlx7b572w2d1sha34ph2fa0932kq3baz24zilp2qz4nuz3clb0vx42mztc',
                remoteHost: 'qprmjm6uqnvqf2kv1xbhw9d93jbtflagxlw0fy843q7lm8xs3wc3p3ueptli5pbcp6n4hr4zr25xjvlvuwvzkja4eeigekklgnn2fek93oycl1207x0w15y8ps6cm6alpb7r84o7opmz73h7p7tpuzggcvaz8vac',
                remotePort: 7146809672,
                directory: 'zmbqx4m01yl0miwjsxns4438civjqvdbozei9h3jccgj3t5vhiaamd4wto3i7o9aymax75cvw15qnigrsq5y1l3godvvblks9b3ylhdxxnzzxus6z2n3xx9zvxbdyvroy31ld4rdjzx5asbspv3bt0rainu14e7d97y57b36iwhbt00orm0k3n60w8s2m908p3w2c3xeqv8yjxg7a7fv8x7em2dzz0f9iw9m9g4gdaru8k8xn0zxmn3vh7a1jtn8iw70z2p8xuun2h1ziakvyohe8w8xlnq4r3eeol0fivynfh29d5d9ccpont4737xxp4tahmxjic4r1zpwmkx6n2yvc2nt4q9o5sz88dvbiyiilady4xpmq0aujgwjfj095o1oyf99fe6vonkkuqh20ix1s86svochp1d9r5qfjswq07fthrnsp1qwjrlt4qkba4b9ijrzovef4h6pu36y0x8znkc9wawkjsa2xvfefts9wio6zhet6ng4donkpjkhqsaqbf15umeszk3mufopgwz5zlutnbots7zwnsq6jtgeavjanv46xi9jkz3wczzs2vzduc4d1ju9isxt86rm0pmyas30yfztdfw012w8kbp19naj6qz3048pn84o1wpl9y65xxrfos7mafbfoi8kdit08orgx0kyxcb0w3hjadf4o6fs52db2afbc74onhl05cag3yff0n9nq5ymf491xfhin5uso11mvmsn6ji223i7lii3qdzpdz358y64rw5pdje1k5ydndlsuf9f8w66aootj3q3glp97nu5yw6riaqtm4nna326u20h6o5osdsd8pmx8pc8639o8q7bfrmptkwksessxcjpdqflkv12zsholn91mpytour959mbaak6erh1m4vz7yfpsh6lqcacjxowr191dnviyz9gap14rzv1xyhyp2jyih2uyg4uajtwbns5ud9tq3zmth307goth88ouyjmug5zpzjvol6fp3wxe0yhrl9de1oy444lowl8',
                fileSchema: 'd5nfq2euf3wrx21ukznsu0b0jktesfabq3onkj2z4l3d5ntkwdhqdzhdjgs9jycopyc92gjaiaeq7vegd6bc9xafo4cuhpwo55ksc3rc1ltx2snq3hsz8muuwkazjjpl8jzo43ni6njb49j9bzu7gm04mpiczep6c65avegehn6spxa5kaxe7m0cdm2izsbrv0j2urfirvhmld0t0p11rk15wg7iv9xcwaoasba1uqyniik2iwxyq825gaxbldps506zpa7ksbbm5ks5vc9iwqbnfdfq04lyebr54he83br40jzl0yy1mp8c654dr6zo268qihy14ll9toigfpow1kxbsabiumiec83988q779tcfuf3ueqhmkcee1a4u9jl3j1qcj5l2ocw7cucbivf4g7riscbd787fy15pn1zs5qzp8qlv99j65tefky2d76j6jbhorg5v91fi6fjavmtf6ki51vbce6q3acwpyur9nop7146slae31lat5rq0bwbjm49r70al9sbsbat3msx58whgf2r58ek9u9pfw7263n18uwgakudrlkb95iklz4q2qo4fy59wubqgnytwcot5jpw81m60fabxtmjjd5e0gcs4cmrf38ah4mgkgxy9l7pkhlg8c8mxd4ffvirk5m3jk47vtgsapemi077c0tam287yizcbtmx30v13eoieu1g2gx38p1sxezmag33lhl5p9eouc8tld16i6uw78p41v57fa5ckmjh0fggp9aeuoo3fi9uys45xun03os6wedpn187xegg0bugy7rynasx5xw7daelqezm8kvt02684mka6mct36asaxckxjtyalbezvrnqvav70zpb66w5m5rac8fmumr0qz4ar1mr5vf8aa1v8ow1t0wq6bz0oous7k6solivmv3p2q6b8zgjdzuk33ryys8zy2z45kbsowertlmmld9ur3ju0mod0r7hr2o8xgr7zeascm3cmf7k0s7be7pxxuj6hr65007tc63cilb',
                proxyHost: 'ju52r6u9fgz4vspxgvi3edwvnsz8uspt0e58x5xib598zsr3az9vy2orsivj',
                proxyPort: 45138133146,
                destination: 'tk8fc0csx03llj6rogusahqvbj37puwoepeifl6idvqljw07ctr3m3azruv0eolywys192mgyqimtdy7mwc0d75d58humxktkt1t92rah2fhq84kw3jetd8o3m6krbuqxi1n9ju6d3mtnjx0ynv9cvww4bvyci2a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qwsi1jatlkpz7t1lnw52fhreqtx266duph4uw6sruhk9h1f0fm7klzg6q6ljv8iaz9gdl53aivxg51sue6d0rsyrro4eacdnuwr4l3m1ow971zno2ic9o2jr85q79u3kfid83tqhrc6wpi04jwb40t6gokxejgqv',
                responsibleUserAccountName: 'knq596wy988pr0uz2ns7',
                lastChangeUserAccount: '6siia98q6f6suj5haww2',
                lastChangedAt: '2020-07-17 13:19:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '5d5c09rkfpyr8k8mjjobna1o5li6vb4idpf8qhey3ox8uc82gh6x8rlrvtg06844b2zsthnv25b86fyciv00pgvwbud96sccg3hpxqabtr99t2aokbf738f97af0v85hh727ncekfiveen786n0sdt224o0vb0fw',
                component: 'neaatgo7g4bvym03pffr14mkzdnzam35j7ebi2mu724i2dl4hss7o3tte97pvf51ze6nvaw2pmz0vtc3laummqyyhfh4p46comhr59lwi6lp8me1ogs2uhp6jtu9d9ny7lp2d9hgdvsjn928l2rvjgpmefbijbcn',
                name: '6sadhze8ivgmfdtc8i9h01o5u97k612jfh2ywjxnh87p1n7ikffpivqgi71r21u6y92jm4lpn296ym0j325mu3szdqb39l0lmp75k79spfc2w4orzs8q77rccdk87dxeycommgrbe0fgajpxrg5gmtxq17bv9ohy',
                flowParty: '3lyabj0fqktb7tjat19y4gx73s9e8dvi7a87m3d7l6xwfuk49p45bnjubfs64qjzinbggwb0lre91lu791dzchtvgihumwdfh9d3bkgdwsjl31who19gh4q7tk1gkbybzikps7pnhwwozn5rhro15ways4f5ospq',
                flowComponent: 'i8959sgz6t3sns52er9fj2qhva1l1e8g5ngkpwzburqi5fc287kdejx2wpysvgk9otzt72dya65uj36fra83i6bp7tadm0bh5xh8d0ueuemqj28y2u76vmmr8rh2lnzaygotwdc1qi0eh88z8zocnpnqn19s4wa2',
                flowInterfaceName: 'jok59l4xz586tn4l106joa908r2n8sxt2sha3nk861dbgr3658rmzlalbluldk0x9uu2xj7rk6923s1vehdap8dtc7hvs7duo2hiul4q8388rjpq47cc1jj4xybylp797b1k1dmgothu3b3k46ghlylbvy93497l',
                flowInterfaceNamespace: 'nb2k9quod3hs5dbh6anj9xpulgrreik70m4t4rw1jd86cv33m7g5zu9b4gu7bvb32jkigb6ezwjnb42z0ecyjs8qbns4i1yhugglgwc9wumghufmtm7dm5ury4yesjpcoja390m52m1ddwetuxb49tfnd90vxtt9',
                adapterType: 'kgtotbk48sr0lr4kdkistqn4mhk3jdpxfqxebo057fyf77oehrtiksmaj7ol',
                direction: 'SENDER',
                transportProtocol: 'qi2fr2dl9mgwlytrhaor0bjkq4z9rvavadvpitrcqav5o7yc4npun5uclk6k',
                messageProtocol: 'h13ehayl75esphkq0viyu96xc75jlfo60oxukhfryx1chjfx15alh2g0h96g',
                adapterEngineName: 'll87235kekixgdjk0fdkwulvvv68j4xqshwik2ztlshuhgighwlt3cehco7b2uzj2tv0gi8wvp5f3etuvl2h7tup15yf4o3x85093ylr4z0wih0cbllb1xe3utvwuzun4d3wcgqjjp877pyhaur86aesa1dvokke',
                url: 'arrlrtncdzfzr20f5dgvw2ijf78zx3s1klsjqa10z4mi7ny41ninhse3f4t78h9jj8kpmuilaoc4afhht29bnk1ver7bhwwwady75023eu4ir737dn43kyghsea02c0dx3rag911qtpm82a60liezt8kds30px9vlwhznm7lh79jbyvr1ye5kx2960t52sxdto6v0kuyowfcrg61ke2ldp8to8uqednfgv3v7hkknq0oemn9m5vn3mfcautrq64ya26rzu5g86mfaup9whhgk4riozgs8241nabhjin754j1zt340j4hqamfl0w0zrft',
                username: 'h9oazkfxavn564hvd3bakonbb9me1j726rg25paldhi1uv7v24a7xkqrvc0z',
                remoteHost: '8lzhdl7295iifqw7bn8gtfr3i517yberoupaw66i28quoth07w8wklwgp8ekwu94dbqbmyh0zrj3sww138q299y5dga1w4ue5cvulbzf44x2rncmpbhjboddhd8bhx0ccj02s2w1ksrppvislt7lk0v15us0hns1',
                remotePort: 2504114409,
                directory: 'xwmzm75gv37qzzlbgyxxq1tfkrp568gwz2daha8zyqyunf3fw6o4se66n4vsqpzuj6g67iws9879d1peqz0rmg6oxtsfjkzcr181zu9ft63arhvvd376krfbzg6fqeendkfscp85zzcp8ba4njitik8nahqn8m338mtufav4ovw18s68p59cz5mu8941czt4z3ew77qz7h27af4dp0b57ns7r81lbecrqoo4q3styzpl2r0l3dgc8qbisabxgem3rvstlcnwnawu292y9fx2qb5sztxeak7xpi5kzl2blg547ndsj4o3zmhemqj9hk132uuvjkg0kvq79x898e2s5xuxl352lu774ldxwpvdna4kpfp6shcqfxh1m9xnk61rupe6bkui23nrbu6eonc03ehcvqq9g5rh1187v1mrrhj7lbsp1kdbejlu91rsykbht788fwirn2vaxonadg3xhn5zn4igckxgkxe5kqk10njsye4ark516vpsd0chkwe249gmn9oe7wsyal80s3mtllb7gg9b6zz02ia4zdxzsg99iboadg8wd2eexcjsle3s62hj3bvrjo1l3fb549z8q1pwatsesr88exsxwfk484mxg0omlsvcys2h7o8ly9uvlphqmfsyslgtisr6ybgh5l6rqefnjw8hx1oigvrkfeg3rupzjplc5fstqrf79w1piy21er7y14ke874bwrppjxrs0fxpww80dizwx0ahkpqirh44hhtbqkd2t1wmif00mfiqlya8mvzmtj5tdwvettcc0bxvnq86h077th4u65rz1ix10ercuufwg0p1ihic1qw8ws9ovs88kxmxe63k620e91i02zu86bndz1t6frrazk11rr6733h623b2tdecdrjc4yekzm28mtq5t94hacn16x110yz5javy7y913ynflq6qruk9t1tzf0zxu5y4nkbbcwxuqga6q7pmlkqp3uu6yoqhd8qylxogwx3q76kbsi3hczh14ciureqnzloa',
                fileSchema: 'umclkdoa8br0dd9oleon5j34cansznpdi8pbsp52xv68ympv1qpf74wfwt8u3txibjngah3mqd0m4cux12vccr5v5y66dua90c5zi4fy1pkun33i65n1ka6d9do70xcmnew11a2u6vb0yqnvk8otfaiunrx8ck0lyzq4pv6g8svxiqvruf2ilkyw9uxpoq5pmi3xtk3rm05vwsuk0e8wuk2umfckcn8rzx6r9p3d8n700u7kfj1wlllvnnqu8c8ztdezsr25ln57xfhhqyy6ht3xhvg8z6a1r7xw9yxqilxa8gejqnk9olgg8lz10avvl8aeetozxa185zn7fjhe0sa04eoxuk7t0bsf9ue1neqyu6yi1rwikx004urzq6pqtx67jejyxmghjeblkjxwa8sif7js0191xe17mzkdvt5efyy9vxuwirp9jj54h8n223zb39c6d34fde5uohel089h2dpkavaffmlgzisbukj6ms4qvdkfznb1a9cm7hoydj27vbvs84n2n21dxwyuhjh46yqduheexx1oa6d6zanx583c2xf1zwlhjgy7zwq4u48fkwjuymwj04bkr6gicbqddn9yx2xeymhj6isqttoy8cseip8g39ub624pv0k8pwyq1nk2152qspnqkioj9d6vohua76zryznpqrgblusqz72trku7ms63gpbapbyikq2c2f7659mfzdpq4fh1htks2okj75jgwp34uo56hnv1m8ra9bjhpzujw5dt4cfy0596f5jlxsxaxof2icqt0efgeb2az2k9vd0c66u426rymjuwyiput542mh15gna3nyr019f2dmhvzdq55brafjc10et3f98smvvuie8koq67a071o8o1aq7je6d00eu6vays4std2jz5s5q568349lszannlsrxvm2ux1o8y2u45mamtyj6yjrmsadffi32457rgozykfyjp5mrgaejet2lplq6uz7iqgmev136zfra4u51q0l59h486vmrs5i0a',
                proxyHost: '9838ghhkkrorhbt5o47jdbqr2rjh4f96pz2ertlnhcdh9e3enrxao6ukn75u',
                proxyPort: 8305917786,
                destination: 'rr8phcb40fdn7czt7w1jg33z5bqd9zv4a9soz1omn55dig9b1o732b8xyivp8lslzpojz5mlqmbmvud2nnxpl29pfxct172jz3m6edef918be0gct8ckxbda36v4ztc7ze2c4mfuvzi2dvgndbw1a1miy7i7v9ovu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5r3gqoxah6gi3zev0ullg7c1nk879p1n1av52nigwo2jdjvrgh614m9rbut47uow7p8euue9yfywwgesrp8r8suadorqf4vsovq7yi5y8dd1oc1utremctd5jojf8ngd7bwgpozpf1xamtc1l12w9xgcl7n5r5ty',
                responsibleUserAccountName: 'lfvm18qsxgulv4rm2nfs',
                lastChangeUserAccount: 'gevam4jei0tpg9w5xnhk',
                lastChangedAt: '2020-07-17 10:18:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'gjiodmwtdksoignsgcwyhiybbpvhfjgka4uvlzpa6q45pbqfuix5zxgkf4ovv8mbgi4sdf77lrz0l4y9ei7m3twb3invsa425io94xjj64qm1sw2py4gv7e00wu1p5i2ktjq5ba0oqra11ez4fwulcawynjdnewb',
                component: '5axzyw7zut80j1ykooogfp0jgtwv4s263074zf407vcqvlfqysvhijumd353834nlwirzuqh666tpddriepujn3hne5h8n5zm73bpis1uidl8v36lbx0o7ke0p09ld7yhjy4b8ssz4wmbycszyy1mzr9x0tvixxp',
                name: '2g0eizv67hy6edobkpu52blu0jafxqeggm1kwal41hj25yf24je4vf6rafgihtua644la4dvxvicgy9tp0lcvaa80sueq6godw3tu85axnaxu9wgiswgnqd39d6gy796y8u3j17qjcwketg19lq40sffdar1jo68',
                flowParty: '7b6kaa9r3l63qhai4iud4p1u8hq26pt24x6cuzkzuc67yvvtzt2c0am8mudcskv1txmxnto7461tg0pswntovhl54khh5wkhgenb0tce8jfprj7j4ecjyseowm0a3c54zg4nv5x3hv4cxttvtpmndyugh31a6kzu',
                flowComponent: 'ubawy88o46dk99venqkvdrnn4zlrm575bf7jdnkiiapww5utz29wzdhqen3it78rx7fjafdmpz05yu4m2qwzg3h6w97rj4rszpf4bbor67xaj3h6de5fgsaqc0cxgk3xncht33tauxaaf320yq07mrzwudcvgfyu',
                flowInterfaceName: '6xivmjj9eda4zoy1ea44fihrmnmhnxynejno94fqei24rz6yn6aqs9b3j93xme4rze1phaeq1rxp5lmou07zid7p3xi9xituyxfujn9rp47r99anxe8qxveepb7e4g2xrm9axkoka8dlkizztq7bsqcgygc1lgrc',
                flowInterfaceNamespace: 'orhrlxymyr4jivjljhslrdus4yoinbltegiyioeaco2r06yprx4xe9eoj53d5iohji4sfsmasfw0nkg6vfcz9hgtayvsofo2rh9lnhwt9tsj1662vliuohbc72xyqfyn25mbc4qthl6nmzxfbgzjq8ixnqexzj9u',
                adapterType: 'b9s6ab3by1tpjym75e01fs2r19wsdltyaa3rlo8i5hur6xd5t8vnudycdxu8',
                direction: 'SENDER',
                transportProtocol: 'un9d2lt7kjicmkzndrnrrnxba5rr5quc3ausg2z9o5d0aezgvvfvcp0uct7u',
                messageProtocol: 'oz7nwqm36yocd2vdo17ykp9vrx2eqhlrzof034oppgve3qyp1w3oc4uewc2s',
                adapterEngineName: '5k4v6viqu3cl7zl3j339u6ert6q83cwc3vvzio1tcp7t2ryrh0kz6vjbic2zofyb81is53yq8xdjai0fpc4avf0pvkwljz0jcpq4z4cjzqsbvfwg2tnvarffwlmg2h32vjnn8emd8r4m7cv9nduezcu3h55ehfxb',
                url: 'cjh3cwkgcgtairbynf993plx0k21qk6vq1tz8mpltl2yavv7bk9ymlq7j5ytb0yziai0rwg6tfah21lmc5ejonarml44c45zaofwnff45kdr1puh8hl3r02d1yyqciut6sap7g0jk92g4822bfljvsjgxr3w5oz5e87ga4d1n9dj8n9lnpg7rvli5holizejh7377ienwrramlmicngtmj3jqz7gn7yuf1e3v009imcj9688a2yup6gruo77heoqxa1plwq2xrgzcf5jp4h288shev30cagductuy4eql3hq33y2i9naqy35atbt99kj',
                username: '6j6yt9bx49haxn1f7vwhrowtupx0072sjb6rpzbb6nli3psrbh82278pi2kb',
                remoteHost: 'tau7001bn90rsltu14nvu9y0r5yfz4px9zd4sxnj9b59y3lqwv55eonl7vgmqtaau2dlyc5grdywhw57cvassss9cpaj53hms2hqhyer1l9we4hi3ji04owmc2llxejd9fum1szpsxo6t90jdda2riujnb44ntb2',
                remotePort: 8036786097,
                directory: '29qsxqj6ujkcb50shnue43l168q988g7le2xis46ms3mcjpizw5qkj4o45a6cfzdlu1ryjrj1rojwm48xwpr0zu63l8u7zx3zwm62xf7j0wum3ns870qhgn347aywukknn6mynzv0ml5uvdmk4r9vw0puocxpvjvdiaz7k0z10jhagbxudutpfvsuis4xoybl7h5rizhi8nyrwzcyxljx9imvr9jnmzunpvxpxjx6fwiwychhl7rt1e8nqcdk8tpczpgxx4tun21agncg2a7fgomn77zqrnj6ugjv2bji0txu1wjy2bdi4s277o1r6pz37lv59ari3pg82fxt4go4pp6yjwwcdk4ngt8u806rlgiea2f7kgzeap65yvt3y26no8423atdotmgbnka2ji8ctlji98kfstderbk0hhypyqqt5jjnbfs791lb97qealbcsthp27y3s5z0uvt54azlz8n3on3ajkngyz7wcz1j0vs3pqyrxeghujxfgn8llqa0m6cbyw89sxe3uwm97zq21l57hs79hj8kv8gm7nnwm89hsvuadubqz42nq8hxqsktayu1d38ur7wh1ltqivrheydvtur95mkg97x8l6ndbmu1wwypuernyqura2lb2zuzxsmivrz1htaow6502kut3764pso77eoc9afihlzzkv85rref5o6cfhgorw71x5r3relojpymc3eevuuyq8pqze69lbo19j1jk8460lwu24wi4965mve25fmz3ix5ha7nbb0ecnrkr52viia10vwc4oslgg42td2cgriida7ejjo03tlss6f2he843m8r91vx1tkp69pjqd2arh5qgie8v68popcgm5p1l3upuw9vorbfcemrnmbpnxmhg9bk0c93rhegliirn9urs72d3qugkrz0krj1ctvi6z4n8jbek2ew6aob0uspakdtk1zgrsxqslxgkhctpdya0tiq58onsl6aycljvkdxe5exmtvsm3awikkcyrqwxv316gyi4b',
                fileSchema: 'ofudne3gyp7y2v61dochbbr1340uc93gs90rb4bsl07oljf3oumlz0g8nau3u4jlpclcbqq29pdzuusjzkp9qxk7i1p1ocg2e3edndz106yrduxucvzz0pkrwwk5i6bvg3igg18x15cpttfnixnhvzc5tbrq88biskcdouf4g30tftkjvawxdr55lxe0z0wh8j58oofvgdo9pj6uezt9agxnzx1k7me9f1lxgnvcxsbbgmgusahb6wowohr4hd79u180nv7dlnjqiybrii6z42bf62gggfuc5uxeqe8y6mlzx5dnsobbkucn3iei3c41kut8lgcadcclbb2fs9idtrogzq03fzmbg6ftfwa9tqeo3mkyju611draqwdrkafm3fj2vo2a1oqqs0kwx8u8a28743dwlb1yuv052x4lex9kkjzmtj04aagd0pm3bssuy8ffihrw3psx6p1mkoxf0mevt6adc20veoaslmx5immkm6nn577koa0uxq7inrz586lt97dngd46as9m26ozdwh528rke1i042n5w4ncjxewt9r891qm0jv96ioo8ipzdr9uf1dwde1dfzo0lqyfmw553z4nwtssg2p66jqfxn5wbifg1szgr5bioafkyc4d2qzwfko06p6s4rnj0bxh75sjuw6vgz3rcfyxrc4umsqjpv35xn8prbrojkivm2w4n7nytn2595ikpcc4kny1fcw26igsad0zmab878oi9lvrjnwwcitozy70h11g23ae44xx8mek64b2rzuwovuyiidd1bc1iudwrbt0wy0dyv594p8gr4jahw20iq956pjc1nhp2wb5bl7x6tep2gtco4k8wry146tlv2rcbtuu0epsmkbsfs7qj8j19umgldeaxxlj97rjv03x87avw8jnr4w4qfde7vd4cfnvppxfug3zemdjv8awqnsa8r9tqqp7upddtkkwrdmhu1maq9hm9d5hjtveqxr8z106k3f2wxfjaog8s4yfyi0bs5yhb6xz',
                proxyHost: 'uww95yd82gokyn4h8z2bzgc3lpvi2otmg9gwj1htypjpz69trug9ix716fqh',
                proxyPort: 5762134152,
                destination: 'v93zsaoa5imvak6fyt9gayfsgvvn5v2k9ypns2979nxak590350f08heytmpg7m39cnj5z2im132e70x62mldemugf23dql6pfuw9rudn5amjq8k5pbtjx2wamfms35d664oizxl114d2ffyczr1e2b4dubkmirf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5jrvoxze5es4vvyw0c5gohqdeufnfykz4ni6bj89ad4c3xj0wnuswuhqail7rjjj0s63a1l70puwirebm2orn3k8f69punvvy0l13fhxeg62k9d356up4ls4xdqh06wlv67jthw6ugcwtgfyrcw8s89ylg104d6lr',
                responsibleUserAccountName: 'yxku9kuufjlhixrzf17s',
                lastChangeUserAccount: 'wvl1rwc0qdeq4avj1bq1',
                lastChangedAt: '2020-07-16 18:29:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '26ai6c75qasi827dj4g9r8kyfazlinmjh0m1y7o3w3wqzwccz41ixg9pejjld9mai4cwgbrmy5jj5gfiezb6y7f3u4ch5ck7lxxggf1fkzel79l83ergxnmozwgf7ch6g8y7c3gh0sbkobwhl6caj7ncrc6kd9pt',
                component: 'tn2ib7s2xlp689l9ije0hf9pz05goq9j6i729futwbj2qz7vsdcwjg99wflei1xx0k0a7igd5pts22kzuyu20fw616s461v46pbsi7wx0jejhlxx7vsmn3jc3pfgfhjabg0j5ce639aruag8xxac49q6utf0t38n',
                name: 'xh0syq5f3iqphvhm3ootgsoeunxzyj8v1cmwejac1jryuvld6gx47b9j8sfanf1ay4e80yac9tn4nynhzg0i0j2479phq60sxdmkbongsbd1tsq0st0pwax1hm43125ljbkowt2seadd33ovum98m404entk8np6',
                flowParty: 'fqbh7m9v5l27tsiaqy9zew673ofoje68rloajnieutzrev67qhb206nu2x0qmaegp31gblevrhxuq3r8xmnk524lzey3kbx3xhw4qlpj6e6hpxyawjsrq27y4gwmvjr2nxnzetjshbg9voir6l0no3z0od0z5a6w',
                flowComponent: 'fcryb2tkhv2ogxi69uz0bssnd0zwxsimhgkr7zhmr4fm7m3ei8l3njyqvy7tedgu020zpppdxxznvan05wbubvz0g7hp5y1rcbpnhaceung5lha5xzcth0zrx4n03dsh25xjao7ob2anmjcgnofbe8m1a2665hla',
                flowInterfaceName: '463dipxfeea3zx22mat37n72j03g1ym3fc0p8b4uqhprkbk6nunyuquhnj9lzwub7lkinbef6z5n0mts5ok8xcso9q2nlk5gkyyuhw6yvmqhqokmr3v761vc9ejxfgh8l1m8p3j3o163xibn7lw9sin4gcnddmy2',
                flowInterfaceNamespace: 'f3yxgumpyzmtjbeu2pnn17egr2ig77uucmlwn3dgoac48e9f5y5bd6y8t8c2bh83vxbsg5fmmh833or6ygra1d3oqrt0u75bs57xvm1u6o0dnw1frdlaeg789imjvbodfwb7gmf9vydkzsb7rxmq28t61lmqq6em',
                adapterType: '5sep4jh02751ix8z80dqyk1h58qypkyiixroews7ekxs0duhhe37c74ci93j',
                direction: 'SENDER',
                transportProtocol: 'g0erx686wvg8qqgj19ursc0x0vwdokfp30o5ya7n2kt6dozwlcw0t4in5fy5',
                messageProtocol: 'a290ihh2uqbg4ijdvvjcz0hu46znphkf8hrnexkplpq6lz5bgbkq9wt2b3wn',
                adapterEngineName: 'lv9v1pebetnnhmo96794lhs9pmla6hermgo015gq0iexn7cs5vfcgt1dz9kqj5f4vhp1a03pkd77pcozisjjrcioo6gngznej08w96j7vv773a19e1hlwiuxu0k8yv49co7wuvvwb8xl3fgmmz3y6z2n2ai98nzr',
                url: 'if180xrlg92h50tkhzki4x4h9h5hieblguul7yhkzieqtnxuntp4lvmqj377ei737ryv29dap7lqshby1o3ghmdc1gkk3c2gh5e7yx3569b43wa4c1b7k5yez3ekm4lsvw3du9y317qh1bmmvhiuksqemcr05s88lm2hu8ty7c8lmbkaluoew9hk3fr0e10hs9h92wwgtp04hpsed82wkz5v2jwx1axwsvyd5ta01y709dcw7hdxog8fxwjn0m60qjcclwm3qad9giqro77kygvn30m54k2b41yqgb6v2j4nc2s0wl23osyycx0izs48',
                username: '5ewp4cxln4ste8jdqhnkeqxmv4y1sphtsyx9fnb4s1piy4424da3eofn2n7a',
                remoteHost: 'lctgow81qnxbkna2idhto4sco7a0nkgx9tvqco9hkue7e79t6cyojq2p45y9kckzf0b6kbftqfuk5ovlhq9fki7klfoiv0srrh7ay1xfg624qe3q49m6173va0uqn4qo2262l20zmeovfzppbhw69wlrzhwlyq0p',
                remotePort: 7041908939,
                directory: 'axnnv6trbf5b5xjmlmd6ep80a7466zfvdm125q1rssgc3wac9wpg7byl0pplmm2o58tyubzz1x4yuxsi8w6lwxc7x8effq28z5kl4ffq8p6ltwwy94lhvce15v9rrjisb0t7cmq5mwwlwx9o5vruza4qh1k7yij71gxd0kq1anyzb7wt4r0v705a9hkhnznakyrnlxf93uic8bsf5hfc9rvok71soojqx9kpqp2v50q12iygm69ucv1dg6649jtit6cnbixpockneamn0iosxbqlqo4pz15lwj79k8vcmsng86cqo0nn60gvfw5ua8irzl70z30op19khtmsyepa1tjy0b9vvee8ncvvu46smiacy2n48fl9xiq5pz6tbk11m3alo620lm8cwcbuv48edv6unyllry9a9t1xfj8rw5w9gn3tsz4zqrfa73fll8v07rsiwa39ffqayd9u5tychus60lru9wxjr82ujowubgc1ex45p97uz3dxqnihb16o76p5yv6qi5947t8thq6ye41f4pxao4g47qoud0hq1an8kxiaz4ziplw1tpqzob0t5zp7c2jdcd39acqq9bxb8gdmuusllrfozpzd1wwv0eyz6sftm4ifb7e3qrsgx9shv14lfzqtu9mw2d7pj9txlb6pdm2kvvp7dcgqfrbg8p4bgodqrz4be3ydcth5zq6ffvgt2uve8lbxgg1bh57hryee6ce7pa0dvqsxln2nhupfnmexpaxb51vbu5jz3km4ketxbgeyeguo6e87f5o79ob902hsawjlx85tbkftj8hc5y1lictrnpqx03buobaf77tlddf0cvvv7nlpwxme0y3w2fn9mpswzo9a63bjcsbed1oqml29wflamzbsdfhghgh68aydsahfswtz8roxpnz4ghpw2k97pfheij3vmw3ez0wrsk42u7k01fhohjswvqzoi6z4zphd8cceytsm0pa06hrpi72qmstjpbxnar1y1xthm1lkma3rqx8ejmyl',
                fileSchema: 'ht1le8b6ola302eme7nvad3ajul3tqv9r17cnaxfwrea49qxdzkg9pxepjlj3t7czuk49ir8githqz0l8ccahpjjtqryy9jxf6o3gqindlsa2m0phrmlxjxzylbfswepyufkf6ltwfmaa7qlkiowjry52d8si8v642our1u5et9gl6lhkonqy45r7ggohi73z7zx9wz8ofipvwqvi4pyuucbbjdjenf1nhpmiat2kr5vo6yyqdvphutbj1wa0moyqo4x251p3l61ai8fh2jr89s8x70s7mjr8exgz67ildrq2aniaxjs2wv0qu5vqk5jjytnmwijo72qothq1ub9ilwbzyt4aan1xvv24r2yf8og8suz7i6eafi4bbcjcxhmlogpgamw5w918iqbywp0utx1outu6amltjk7jjwenyvya4w1gshw495uk8y9ouns9do80jsfuk9qmrxlmsaarl8s1kpmioprp74ltmso6q9g583w0dz0jzjd39umtff6d6fizkjqfjnc7k0azi5tc5krk83alenlrz8nx55ehv0qgfvk0pat8p4kxaxewceslts66dgrzz2ii6kjvjj097g8zgzi0znrs4kzv24d8e4vbeipr9j6zwh150us4prrnx2kdrn3ln36illge1z3nanap4zp26qr52wcbcydpt4i3lgnsgr99tr3nyh494fkmxmmdr8aasst9iexss91zeyx292kysz94cr3ej1i5v2yeqitdvc19ih98xtxph7t56kjzg8q67o592hjvaiyuct5l4skay4thukhor6vvn7zo73lju07p85turng9fzge662nxl03c78l7898ymnvbhjuz3mhh2jg5eg4dhy51duccce40nw2ybiesyhkqr4ef7nyfuo73cj7cia7qpo7ru2c7nmqluz74z7h2l9jcnq5wmszxh3z9k0z3f5aif6xr84ugg3px5nl3vl893nv37pygum7qkhod6xw45s0ors24df8babijy3zlsfa8c3',
                proxyHost: '4nxyinp4isbew6yvxeii3y3go5ugo9oinwj3h9ne5x9n5wnnxk7186unmye9',
                proxyPort: 1664284514,
                destination: 'r73j6480wznvr9prznpiwx1o8486wp331rve1mfpv5hc2dbphhnuk9kkrkz9gmk7nwvsm16qxzu6mfdodha91fl820xillsprvrhrkhnul2riwsyu1c8pcycjn2kuwsg2iuxod38zoaop7mpwtuomb6k56ssq0v6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jyz59c458u1p4d6frc27skw10vqsvl2wrevyvg0pklxham0avl9rs8j6untztx43l63juo192rn4unfsl3h4aya14hvtitx92yuxzxrs9opc2od4asprizbiqiawqme9cisprb6zefgn4hozd6y4el5e716199tn',
                responsibleUserAccountName: '9zaewn22l3gncpnusf3ir',
                lastChangeUserAccount: 'afpsms2g434ggkcl7l1h',
                lastChangedAt: '2020-07-17 02:19:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: '3j0jg0bkgzox7sjgfrfmuf4jriqbsb1pzx72ubp1ovy7myz53dqjqb2ysfcu6jgce866imv4manp7s15cfjs2qoggkf7zrs8g5wrk7mfq4sed4ebszr2vi0dcb3g9udxdx2w05wpoczsomd5p59lpz8t4xtjvsdf',
                component: 'jywkc44icltrmrm1lc20wqqvohubw7vz95tg442lt0zh7as4kvcvxobe7fmj9245vogeoq3op819y8df63j91p2o7pz26rnxe9v3hpf62y9qgxmt1xblxhsp2f4prfey3u71fa5po4a3ctyjjqo650i3thfx85ti',
                name: 'mei45ih79uvmnfkx9hef5no1xzcrab2rxcu5l1uhaue5wfzk9ed4ntyx6ql7jtziz09k4x2oqjac4nu5wjofzdqpbvdy69i7gzqa8yb1f4fqvy5vai3igxtrmdq4xplx4291w2wc1itgko2r1oouugh2pm3mq2j9',
                flowParty: '8i3545528nq8dmtxowknho8zqojo8uy7loxi56g2h5bnd9m3hmzzsqg8i85wp0ar1kls2u8xepa4kv8ntsmca6wdhc5rvm493f8fanmzzyavv1x7fm67hwkeufn0v1coeb9q944adpwlrzuhhav35frgd97x8bna',
                flowComponent: 'ddh76b4uu1n10ageekmif9af9mrng5u7ohl6quk4cg79nz9z39wxjz0iy0frwdwg4j97kemcf7y2zuup9rijcxeryvec6ggtreevxikie9dzzkn2x87qf4qlx0i06dr7l1x8zce3s9ioifh4nmikwcg1z6jzz9um',
                flowInterfaceName: '5qpl4br99zyywz08atjqv21qvuj1m1x0gcq6a4g41blls7n8fuwlic2ampgbxjvgymle1mw8vbkx4175aws8be435vi86lqz8115cuujk8u6ve81mvfalasi8zhnkgtj6dsvmaovmxjp3trdb29kxm1rs71ppf6i',
                flowInterfaceNamespace: 'b3vwql4kl2ou3nus366ddn2rhijhr0ikznwo6w7b91s2v5kkc7owiwoewe0t85ge7v6chsw4u0qkhidw5bq3uxz9g5ekv0y8nro1wfar4ltzwafpxm3j4ozrl1dhtxts4j8gz6jhldh6zvogl9y17xj4dphutelv',
                adapterType: 'zov2rffcqc6bmmwoxj9lnqcmsllzid0a9i3kgv8ngnc7llq8hz680arqldam',
                direction: 'SENDER',
                transportProtocol: '9wl8mbikgzjqetfd2gtknqh8lvk994xi9o3a29eg5w6n31o64rpwsrj22bqu',
                messageProtocol: 'cj8521ozhlugmoetgrpy52l83kv5760a8f348fuxya394mbb2uhskvneao4p',
                adapterEngineName: '7r1qd6r8xjwafvfvwvb40cc5l8azqlxxa87u6y9qska12j1wm4hpcoq1jjs2pvml0439y4gixae24j6n6yn0jzmxerpxpq24ej2z20xmxyl8fy65op4i0e68kwet3djs6z89zxfjm2xknqy1kadk6ynrjqjx6rmz',
                url: 'zykz7g2yyfcb1lpmzsqsl3pqm0eniwteeddeuzayck9d2tpwdw32ojqphhbx2b70io494tsidak74rpq6ldcdquwixaab4qsnt197fblfl4k9hzitnxfpsf5a62ehnhjfnyl3el0e22og8xhi5x3igpi9z2oy3jd5puk9sn20yhdz8ohvysobokgrw7y7kn8z8w8lt1d3xdre36btau92jk6ph9dqu7lhl0oxvqbdde88x8jzb7nkc4sbm95eww7mm3in8drth3jngehgngnjcygb5skb36jr8oxtlwufj63qqkpgx3na1rdyajyfr0m',
                username: 'h0x6j5f2mscrg5n7t74239vd58sigypa3dx9kb6gx62ov84jqgg8qyq8u51h',
                remoteHost: 'lj0yj0969735wq58pzs3vguwb8fp6yq4oefpujn2qa59h2rjlk7lbyu0ttsjvvms72mwdc74pdor1elpxu2secjns9nji0km5sji0g41tlwi9y8gs9oydimqbw7x5buy871wryezegzw3tcswlplznmuzevog0d9',
                remotePort: 1560801822,
                directory: '2g62mqgpter87wmkj4apr8e2d560pj7mbegfjlhj7201usnyszmksai08c3oihellfvyz2d5b8vll2k56m4jupjadgyurqrhhusq2n5w1lack26hivyi6gagzu6p5pe9dt4kp42v5umil0o9nbqleklfiyy4b7g6thdorq6fqnt271nvgnydq3yeyyvb5z9o64fr4y0ixjr9mn7yk2v8wqrtv475lr4dm8spvjo48vmvv9l018t9ku139egptkvf9jamn8if9lvi8n0e6llkbxjvu7g0spl0wsg2v4mum1ang1towhens3mq21nk5p9qmtg8wmq010d17sua4fcf4ui6yemix0n2stgah9qyrx9x8ropa3zi5iej9yzl2gnmgqjmpbodxdajnhz4zpycye75z4mutl9571joogc4800fym0tf9n67d5w2n5eqqb13t16ohpozar8yyjyhiborb0cnqi3bcw796q19m3w2s9u4n9yshbqqfehgmmgxkcio5qdpjb78s95ohisnae513pzs3d1kvnk08pra0pmgle9m5sg5mh69ytt8iplm13xp6156a0uvhjw6ojmytyowtz2qh2yttb5ldizzjt5uymyqiiy3q5ziuhdymiahdae4f6aeq3zg28m6q757yubc6xfb6s20o2xhfltq3jik4jgyc1iggxtgd9vascvvfja2mvcnczzzhexs232lrukikbmqba23ufap3y94xi8kfnm28g34zfmaby4xs8g428tz586y77h7hhlod65whvra6np6xeo4py6hp7xr2h1lzoa2lpcn86o0s13ypay2w9ns1mcloanh3rdfd3ofo3rtmohbytyf8ypgj79ucf12v4r60cdkjgvaa35w9acridy4rpvolcrqfacswvlevxfvnb4to7jge27j45bs8g29ymhhx0ty6b3dxk4bmzbxwnimc6ep7baiejm6m0ydsbah4zc5f7rpozu7njj6fpid0h4c03owcm80mv0nuxmdxsw',
                fileSchema: 'ha61jo34368ogpveolilb8xnqnxi1b6avmx098gnvg4awcja6tlf1sefj04peqkfo96ltzholvrt3rv7t8a1jsmf53q3np8grfkl4h1qmnxyfqkomq279m1poi9relg72q7mghy0sdblz5umvqmeoix334mi92036j713yct7ta5vq2b3rhw1pkw7j90s83owwz306jjjnyrq8cfzs91u8qhwxmegxhuquo8penacw40wgdup3ocn8p1g67j1ntt7mt98jxl7uviog938v8ib330t4sld7uq1hl1plht1c35ez5qt7zfs66hzca0f8z29rxe251tfqjfkhczgflg0dv2244giml7qgu1nfexrxl7y1d087muk6u9eg13g1chtuy0v33bmimue20jxxkdtqonp91ww1kbrn3j64e2nyur4xgtfbzehqd48p7givlvwb98w970d1se7b9pipnvkai6vviidmohjyod93blt3v1ba9eqf1rtw1tp9xq6e8sewaamih65hiaqm8beq3gqvuqw2wqnks1sgz51mbhdyc7k89tx2oxruz8iqvgojycrif0mx8w2evxr2jhqyzplpjsisgxbrmd09yqz5n6smp2xvyaq3a22lmd8bp1vxitvymq6iwgmsr9214h2t3f6ay9r001urlrm51hlqvd5he5id6g78riw0yrlqn4vuk6k316efwz0hfcpd413j2swqz1cqzlkg9qxv4bbpf2aizpf0cmw93nb190gei3u5kzbo67zu3p4ad83csoaqvpx0y0cvbbc82gq609si7ek9rj76yppxoce05aevgt854wjhq473ulfuw667jveyrm0iltluuomthiso9mpzzgkeivwxdq6wdvg5vh2pmgtinq19e1kpxxbwuvyk8dm7c1bggkzu721ubym2zbdgw63h73s5ydpvv1n49lc7pjpqi2ynj0z5vwk6s1f24qzgpfi7ggvz2hz71qk9p687gdpans3i8ayodxxavokzj8nrox',
                proxyHost: '0f97631zkoph7amf1ovdxfweq44bndw9m4dbqcoujeu0gy5ee9g2tiv9xhp6',
                proxyPort: 4713178527,
                destination: 'x3jebx36fi2s6emmel5rphvmfexq5ykq8km674wub5qox5igc8g77fsstqe2a5wfxkqi743v4dq0r8ecvube3cr5pu8yauuket284uqi7ahil72m5k6f8xolvp1it00vytx8ll3rr79tdi3vkyvhutidbvozxjfh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'meqy5b5kr3y80fgckxujzis5egklzxrfioww0b5rps5otdtn9093xb3wovl3pets19lqzgtoi13ofi2juyf3co3ptws4l3cpfkcv7b89qzvosil7pqdb88h4tgk72knl1w9qgsz40blbgwwsrp3nw2tmrchuql6f',
                responsibleUserAccountName: 'ehslm040vu8xfvy85y6p',
                lastChangeUserAccount: 'ch3229ol8id4q7zkt2wzg',
                lastChangedAt: '2020-07-16 19:33:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'aycscz0z2usi1foxvwxl2gy0arxvl2we6dge92pi3j4p0tk7zb5y8dtqxyydbexuc84kzvmatgg0dbsgra3t1uhqegwt9q5oxmmhm57t7fggz660k3n7r9scai2jrgw0ow42vvz5m96es6eh9mcl2f3qffxfb3zg',
                component: '3n1zpneems1fiu8od3otlw7edahwumc7crcpwao7dgn2mwxyqibbhr185v5du0qxszf4mabcqoqk8ynf476vswo7zza67lt3so5udlsuq303jy1qn2881ywd37gf9jb2ms0cg5430qi0ys94bpltkoa09oiv88ii',
                name: 'sesz2sxqunk394xmkjy82yqvtc1bti9lqhldswfi5ov0aavflvqw4i64bxuanw0dq3e9o8srjhpfc1jkvl15w7hp2dfp57eft7edn7nbttexej43rjckpwyf2pjc6ikc0asnc8f8tr7brliqgh5l7yyqphe7omg5',
                flowParty: 'mj06si1lddzved6y2cf4n344l7q1zb9ifb761amh56vpi9e1f7h8d24k00pkhtbwpd8c3hcoomf5990oit24f8zpqib51auhcgbb01576z9t4wqi62tso82by1559rrsfhgbpgcy8wxmjv8jocnv4xnlixrz6zwo',
                flowComponent: 'jhqcxqkqbe97n69qrd4h9egyor9v68tym44umva8q9gu2ly44imt9vz7861ee5j0dne8kmiihczr9fk3mrmx7atjw5000yz4nf73lhrdev7lgulsofxlcep7r5ilees1cv29ju14hgedyrmacoq9c2t87u367cti',
                flowInterfaceName: '7w49x371k19sdiccesoh7u9fx9szldox5kj9y8xuyigo9ur12azwsvn7i24rufynso47vnw00jrlj51c0uppzhzdepct7pt99z945289ogmbtghxchxc2612rimvrcxg6d2tkdvl99ax57d5okhplnebnhlx04wr',
                flowInterfaceNamespace: 'e5l4pfugp32mtgmjxb1mfmwtcyqgtr0oiy2kw7ha4r2iwfryzztwg4nrk5hc1z7389mji6ss2evn1v9gmzywmbodiqssfwyeas54o2qtmmhxeedizzrzeyvnvlp9vywoxewbj3txfivd8a2m5rzle4jr9nye6xkc',
                adapterType: 'ciojp4gufyxvngi171hma33fvtd9cthtd8fyp3w6vcriafg0wheaxflaq9f3',
                direction: 'SENDER',
                transportProtocol: '6uav9i9iz7mip9rz9qwih86zvnmshr0zj8ds28vx6mxnegk37fmimmx69ymb',
                messageProtocol: '2qi3gv6iffalqdqy88lfiwfsorglnr9qg71otcibrms9242llxtkjs8z8gc5',
                adapterEngineName: 'pr7hufpqd2pqmo87ro9npsxrpb3tbkc5x72f5bzed24en13twwcpts874ytbxoxqk9b37rv2sfob7wkeomkxxc6ibvf81e0a99xvrecydmyzfyrorat214cgbqtdhhz4e63xbv1o47oij1csx0k6ugvb2w44d1cq',
                url: '25y8cwze99ha0pedvdy6clrkpcn08j03xbj8gek019t8v3526cwy6x78nppfa07t840ev1h0eacgpcos59n8suhmkvb9mon55bn53hu2hdxnppgztziolfu210zkcheje67g1jxkb3u69rpqcfcdaoqvirxc0m0ij1jjrrttvbrguzd5680zjj478vzvk67yz5m4muxb7dkmzxlirekqmmyrx7kf8p2fsdn3eelhk9b0vnuxlmt3e34pm1focb661ki1ug4x9ivy3qyn68fpg43rhjz6nk1ysqah1nxa7jtv1s23l9yfjrcnqjtco2mn',
                username: 'ix22iqs1g2mfsdslfbywm0ud2q725bqstcziyspzad977cxn6rrqb6yj7wld',
                remoteHost: '5953neu3kb0kt7nheg0uyyn10nakgr5ape670xvbnwxffotnfd8snp7f6407e7c5lj4s234kxkrtnpcgb6cffyp78ihwzhnwf0ngpv1hqhoba43wvy74kmdxpueex1ept0neqrqog3hs7i2n3780y23heubgvj2q',
                remotePort: -9,
                directory: '70njrmjzi1gngxfqddm7odoid6pw1a5tyzlgx50005xokis70ighwmqfx785hh0gjkndpgyf4wiwe67te2f696godvx1d68yi92i475e4x6k00o56ku1d3iwn34vy0fbgyfhvpfb8kdpzqq1qke7y59rlplv95ffjigjs0pd03wfp52a491i5i1wmcqnan9cxgdbwe5a6lredrlsysuoqj0ki28z768umb2t2itk0lichffgtscicomnfs1llpabye3ju3x3mwkg6hoxlts5olmeohwd13m2l22wlx3081w0vu3rspxfuem87vh53u5z6hpqs61thqo9nw2nluun2h2hb9o4kpxhkovzm6yh344e9s8bu3272wkt464sald0npyhdhpujb4fc7c3jvkudhy62wnthpdkhy0wjpq42lt8wbw6ekjcl7lonvq9bxnqrmn0qj5rl1in1r33taz6kse6fphzeoij250meeu4xbpbscm13uz2c21ov84hb0570hg7fnipifyjbwjb5mp7bm37hojnnv9yfi4jsfi1z2xgzcjgxuqnwhjkcw9kptfrrxb7pxrju30u8pjnkxhhz7pzjiq5cd0uk6rmmp3leycrn3v0j84oncpk2xyoi69sv1fv0l4ojssjicigd3czz7gh80wql9m1i0cr2s6o2pvncbx1adg9czhmtddyxvv0dr6qjnacxq6fycr1yyw5mn5j0sudii7ank9wbdf5js03wyotwsze1fld819rpuafgd5h5l9cnkh7bkzfjtrzjzhwualkdpst08cmjoprk8t9crermbub4s92othcry14juqv62spti78tkd4pb8kyk51qwwab4c4god1olcm8vmq6csm245ncnzv5d5kkw7u09bo7w67ce0dq2zfw4gwufu9yxanth9s8ht0clyp62oixrmf398aennpk5cp64mqevz7f7z6gebjmbrm7f4gf9hup3otmdyxcntsg3ympmgavy1mtimk20uz64stebog',
                fileSchema: 'rvebi3798w8bizwz6n9xvzdslxs0a5hgastqj8fzci3g8vx5g5gypkihj3xns6dornp0rxvza88xe4qj0gacwvatqi8kz1f8w6d054jahc5mucywudowp0wdpdk5rb0y5isve8kl0wv8ngo5fr3mgotmaeq54p2picj3azps87dy1avvpuusxfl9c6etu98jcdp4gcsmjkw4d8wmdpdm6i79hee0w8phnequcjidhwbr5nvr4817fg60tp9c6loo9vl49zqshrgv5q4y2t4cb4vy8ky141oy988zip0o84bk96jbzashkkx0mv2ymyi9hur8xghhx78inxw336ho8aqfqml8681laco4mnn7ugrqrb7t8wmxm7mxs8c3t5690occt6k2dzv41q5c3uuovtts22knr9octh6lwh68rjev19ldnhr7f7n7o2lx0m8uva4d63biycf1ykt5wn1iqah0r11rgxcojyxiwj7xtdm5setj1sf9in9q6vvazld0cqym3xok5jwa45957pnava0421xu31j4jzvkxv4h93zaiap324x041bhk3so11ks2nxyi2570nt5ydly6j80j94bqmemif124i7tqb5lwkyriv387evqbkcpvucqew7saxs1gtie0zuidurq67n03ozska10xczedb9q61s5ubj0kiy62w6dif9jiqmu6kh8sxkcfpanr0o8stt9l3d8vykmsqmmu30xmnqfkjsxfqm426aoe1pxw1otozegcex8v87z4rik5wjcegmsow18m4h0xgq69c3a4jnddypj3zbhjuik78vngb79jb3lkdvrxnjnerf8ra2jpxkdoxjroug56acgz17bvh2wac1xc0d05dp1zx36yl0cgjvvh39ms4ua4dh6axvsjrkry8ofq9jy7737doau65soox518j865xrk44nvdmyvm1xg80mfcc18860cvpvddk8srfpamade8kjvn3mu5n78mi7zohucdn2lcmup1gv7zm9nyh3a',
                proxyHost: '6edakj9u1mgwo07n8ozaavrcrf7i1p0eoi6i31h9v9ue8saxcru2qot5yrve',
                proxyPort: 3976438372,
                destination: '9vi2t4s42l3vrtmx42kw7zlcswhyn7kgmh8ltsxy7f8iyfkgmn3sx30be8b39aou17rppwwrrk0xdus8mo52gcaraaum8snknpghzhomfld7ee66dz9lkfve0dfh5z0fh6mx63oagdle83q984w066i6ug18xmb5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0xt19rt3rhesdvzd1krmhau0dvovdjgh8aooq076vhljrev0nt27iz7kdsfsd4r2z0cc5y4bm3ug67fttcfj05a538tfr2zg7j3iws62al02mqifesf7kw30levhn16eq7052uul9v8sbljqbyucbv47dqsgkma8',
                responsibleUserAccountName: '3g0eapsxurwpfjfilgqx',
                lastChangeUserAccount: 'asnoh27nhtb6o4kji7y5',
                lastChangedAt: '2020-07-17 12:07:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'l0e3gc3p0hxy3k8crw8t6pb75qf5zwh4po0f5ou28ri5qn0paxccdbbkf5t5cw6w9hedbm8k1f4vjfft3z9u2c3nkmo0zh7u0ed8w1cnhb6vvs6xcydth3a5bztxnl4vnoyw3rk8kqg87iyg3sebq1t14k6ahyut',
                component: 'o80kxjsk56sspb0nkztdzehmafxvin9d7x14x1zbcagpyn8ffsc18rrz6cekem5keux2g0kwdbanwr3ptq08tkj38etkzjpdakqz9q1bno4gy2t7vrlu9sdgjb1nq2cx3i4ok9h9v9bsru7hkkjky7vizmi92tet',
                name: 'vqcvfjsb3fj4llqgux9enq8tp0mvz01qhv15acf0wl2jkpf4n8yvkgo9wfdh4as3v1p14sbwc3ipkg6f85c7ce85wiy2nq56049gxksexso4ln6m999owkswazdgrhjqlyjniuc10p45n4durdygx9z4b5xhp9o3',
                flowParty: '7juxushzm4kz1hgfqqsc3o9ozqq6o51nl3xmholmxmqrrfdhf3ly2n3sc4rt5etx1y8shqplfj4o49eww6ysasuprlfarfe3ih0mpk1p1ugggr09io5u4nrkpv58a2195kau564lvmg35yqkahxx3xk9f3z15zkr',
                flowComponent: 'nlnxyygwcm3jcq7w65t5hln3iqyiz9q6r1qzxx0sthqwtwxr05x8ps4ld3l94dga3493qojw6x3utwqv5790zfr6mn62dehwx1nm67ua8bblw5tpm3s46cj9gh47vkd6q94nhnoynhiq87uxbfyni5ar7516o9t1',
                flowInterfaceName: '7bvndnalwokk4v1yveqdearmjjrery5619dvlfm0ioh06weve79bjlpd1dryfc4ncq00f1omczf08nmne4bu1l54vis1jp91nnvc6quspeuoowgct6l8m737g4qobsosgwxy3w9xc6kwzhnrmub4fiwp5ktdt9rv',
                flowInterfaceNamespace: 'l9bbsuvk8s5if7m48wclajleknjqbru66sxebog2wal2ep8c11onynirmx53uka3dpsemblav0f9uhuu9500m3nlmmcnsmu6e0hehszkaabdt4tr3jnda5jeowylicopfvvo3zlkb7c6nywwydgvaa3d250mjgda',
                adapterType: 'fy9hv6zmglvtielp6bdh97fkl6u1v10lbbunbifywwhfpw28a6jj10x459mv',
                direction: 'RECEIVER',
                transportProtocol: 'b8wciqqjx86doyndnfdebdzbfha95vwaqs7vz5mqqp8x97b1mdqe95v7a3zv',
                messageProtocol: 'vmraf46yyvkycsqtdywcq2e0ylwal11ot9glwkjiqjsr4kk2irxcurptqxe1',
                adapterEngineName: '9h13bsnuxq1vf40341eu7j9b7ngjvia78wd4qyymxk6sy9dbvi2z61d3k6algsguzkoypmyfb9nyni531lvw14ygtfmthg3yd6ip60zr86ts66reuwgl8opbbnpamguh0nb37w2ul7krvzbx8qso57crj9zk1vxs',
                url: 'm377v3gc1vfraqo3qtc90r1xp6cq08t5x4etv8ob5rmxxhen1xii1uepqe12vdhmojzo1gjim7xstrcv62juscqyhk8ajq24hj9gb0781xnjkfr3rxshja4aqtu200tw5ehhm8d9fv601gv7d91hnn5hfsrs641xefs7esmm92k6xuwm6nbtwvc0yhj7cqj4xkrtx41l42yeqpijhfh1rgu5ndmkhpocg22kt8yckho28symqqvvj0ixyv0izv41lgxef2r4fnj8fdkeqxuusglcfq744ib3o72knejfgxp64y4tsutp9rbrey1zzcrp',
                username: 'cml4p4prkkcoxkrl1gjlrd1i9z0mgp5sow7gu4edxvtpelde2dkoois8b9w3',
                remoteHost: 'bo87pad8olxpxwr7g2bwy10evnpsg9aomlw6x0mk0hnl5i20x81s7f3h4a0ytdpumt3cnibull0r2tynb104mtlf916ko9aezbcxc2b413xcqrkacoo8fmhjtsm71m0n0d38boqs6cktjmqq92qxztub52shzuyy',
                remotePort: 1163783135,
                directory: 'cghbhq2mfm5l9tblqrs12r9j8t4xsik3othghisehaecb0g1zmf6g7bamyaw3579sv0u0phll0bpyvcpi30gwzxqmdfnjpeqxdvqm51yod1hakr90gohfmzavfjs8kc1fqm0atk93567rcnkddvlgld06j02gh0pghqow15clsk7cdp9c6wk57yq4i4t4mkbvu6dsvhadzmjhvpy80rri6wqrwb1gcktea57402duwr99xu2mf1t7br17ptptziwutvnvhnnu2nh4040qlo2vqhpq4lfoag5l0hc271pqmdk8uc7r5ntgqstwdt0wx3bmakatid0f9mn84c83wms2hqtqn1mhqv8fw5e9ksybfxzeoxrjuofsga8fkgmvl8g3do4lcyf43gg00o0z4u72xsssqnpylkomzvkq2e99y268eysb5sgwl87ixx27558vqbr0gzdcdkjxx7znz15xwjohv1f7gipbohy1taxanqe0h7s4hw3ql8knrhv9m9nlzyoubsglnroo43llgg6oo5mnbrw3iwni71zu9uky6zauwkyfxl0nginik6q8xexs00zk2gj7r2aoocznka7lo8mqckcn4ze8pxt056r7uta8f66tr2ih2sn4z130n2w4u2mh1uf5slv4w7qcqgt8n4mg0faihs4wnpjg8xkur8ltypsr0mprn0eyjmkhmp65b42lphgt2850w8bvhbehna27fwuzj7le7vqgc1feyouwp2sgmkf9whh4ba4qo36u5vxzarhxms4pd6y0iscrdwupabyacpteysa2xw4tnltm8d86bd44gwmxdcurmtwjp0ja2pwfclwbyvc0yzvvdiw3canxl9qkjmg3t6d4g3kf7bp2mo8u20slqy79iqz4fbqfknjd00ljlpa7oy6pmwdzqi172z7rrff3nctj2qxg3e9wdwle7aoxmvkhqjej6y1u4i1ijks758u9hsing1w950dvydfp53uvps2sd2fuk7pgqc7tfr9ifuv5jph',
                fileSchema: 'ks8kwcf3vxu47cku961k0kssmt1nt6meos3bpklzw2gcqzegjn05x4lewna9rj0cr5e0flpzpfn5y3p71zoi2nuxm6mlhp1u30fm8evzjl9qvyrfjssxa1euguxigykytm5ggkoyw0xor07aig6mi0wlx6bgbfdjokq2zii1023dwavf64nmulfqrt9yyprrui2h393ww767aphysejhung3jxi2brod4uzmbnbes6lba7xf7gxi8iw2rm69q6s1z11udlpgoj2nlt85qmo2jzf6xuqchteo3des1xnueec95xp3u7cz6m7elbd8s4tqijple01dyeqdmh5kd62ur9eh7zmxmlznge4usy33e0ld8965grz24uwqppsgvfy9e56v5hrlgl49ytz1fzaibc8suhulnoxyrn2kkn825w4rpnjb7o4enzzgx2hzre9hfhviea0iulxb67jmbda3wgbaa4nlwhpee4bpqadr2ub6kocl7kr8dkyj4v6ayy3av4pdxxrr6ylkorhi5k6iohv4hd7slwxlrkaofej6vdf3l4a6eljcfzsz238fig1vdiurzfv63h3s9xvzl036ytaes5exhxetf5v0nk14l2obdkfx3kk1o035r2p8ct052atpo7jpcv3a6pk7xc0j86xkjqiayvy7fwyokv88ybm28t3ug4zz75ncrzgib0tkw8wfudk09li9tmhghu42cnscny2rho6gxcekgwf0jihsnqwmp3g3fg8gbkdjnl7dqzrsg898lfosc4amy6sp3vial7qdvfw14aivu2nzej2luffk6qmte0umerlreljyrescjdpruof3p6q5h4lohktl2ttg289m689h3ydsz4m71sc2qddiwp8adl8r3sw98r3nugp6apvspgeebdeezq7hbp1w063s5rlhc73urh94qm78vrwdg6034845n2zldk3fv5ll7rbbyttpe48a31sj3xb8lq8zlulbx7h9bqfhdymw5n09x5vw1erka5wb',
                proxyHost: 'gyxmw0julfbiczy815h9hnn4o1lrufjk7uavi04e15blcpe3f4vxq6qn24iu',
                proxyPort: -9,
                destination: 'ev37xhvgvc5dg14x6ywi0xovile8gul3ge82tn96g0km71vv4z1x3dyimx6i1fq6064ozska48rsrqnd2vaaaj8uc1g16hrmmtm9ozt6bxq32ykipqf8eiyx7nwiww5554gxwqwiugj5rpipadrbijepbswupz9g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7sv0vohzt4pcqfzdf1o3vgmz1l296lf1fi3d89zzewpgmgnqhemikofc1tpbxjcfbmt4x7dexgklbwkf2ut2bkdxzpwlevfg3jdca7frgkfqe5linbidtr91kl3bednfkzxs0rk0r27tnibdqh5w4dmjgt78dk0x',
                responsibleUserAccountName: 'k5p3e5kxetp24ulitm8v',
                lastChangeUserAccount: 'enmvbgoqh8zjjpbmrke3',
                lastChangedAt: '2020-07-17 15:06:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ds5d3kagkfkpepax71abvxxllacmo2iy8feyukohb3tj9ikhyuckky3sy64cey3szcbgpde75ln5um0wbyjfajfgm1kkooyioq0htjpmp5z3x79uz7niwy19ekxjsxk915bljp4rbj2cnivqwzrw9h7udrk75hz6',
                component: 'okek0rmu7fgu7y5mpiqvb4603ujpd56v6gtgekz96zbe3esr6qjqexdtuue4clqwxvxoknd0hxgywde8qcmw4w070pvi4buz2316sukty56969bx0kw6h0t9q3bcuoiv0dnbkwn6sqaonhxjgfnq6wxpvdfv4mwy',
                name: 'kgd6rb4osao93rgwlnrteto950z51l8p79y35atvjcnwz3matdunrcu99buj8sebzooqugcqg8pvdq4ayfarz20b0ta85z9f7mxtrwjqcqk0el2tue2pm5nrmynfmecfqxzr6q5tfdhirg7cg2vbirm8i3dortme',
                flowParty: 'ahi2oxmuvlhmosmruwr86zw8y6b9luvep8pclmdzv1ib78hcfggajgm7ccrlpjozm86xqjt94xffqo6c2u2l0dcun6hizgbvi1tr81kdfc8ep7r46czlgfk6m6ja18vpkxlmeja3itq8d5ko2o51gymhvemq7uwo',
                flowComponent: 'ubethztgzsdv4p7lamvtvv09ee2l2sj89qfrkt537yoefn0vnueg5mwzvylr7nr8j6jfdpa0l83527l2k6yomuvlo318zdhkxf1ijhzmkyfh6ij7c73evgug8thiaaygac32x85s09cnfxmqw5ww9ryhh429qthh',
                flowInterfaceName: 'fiom4vr8jam6ezovzpe4eguuchuoghztk1xwuw2vv0vwj3jj4hidomd04l1bz9ghg50rlpsydxj4cp1jkd4zhi3nnst20ga72bmiszpapy1ygw88ff6nt0q6ycfh2203pqc1ig3fx1e6d5s53qq6q6aj3p2ibc8l',
                flowInterfaceNamespace: '4rkobsuv8tjyh4ugnj6t9s57hd5tamqrjy75vqiazno9sxxqkide43rfpvo91wbomxrozyatmsfqfymbxqv2ukfjtz91gkcmpjemy7ceoa3o13nhun6we9xpz1dhplvepguqjr8vimat0gzrxvz7rmcgttfv567h',
                adapterType: 'q51i4xps6rfyfcdhr62prab44omuu1cfjc3pvzvs4sxdxwv5k0j72f7cvn7q',
                direction: 'XXXX',
                transportProtocol: 'wlh4yo6cxcnzo8u7gncc5o5p66orpu7dq67b0x34kf64wngfnecbcib8a1w7',
                messageProtocol: 'w5pn0yk870h0w94ozjw76knf8l4zx2k2vd9xl76tv5j5vz3xm84xatq4xtau',
                adapterEngineName: 'tg71o9glw9175i1qopdczkd6p3wnpuk7vcty6zn9zfx7fymd0s4qtru6uzf7qix86a41kgu6y67pb02r8paw84sxj4un8ntcbsyrndaxpera87jf488f3f3v2geljfmiqtqs6t0hadghjxa5k6g0uxs6tmamfple',
                url: 'd9yb8ekdt55i2nz0ju3al40bxzbi5uv4jlqnow8jpnifmn5oanlwl7r7j54p3ofo6uul3sum1dob15io24ihtevmg5nk4rx0o9zj6p3q7fnoh77g280t5s4g0tmccz4sgul93kingawklqwkd5ik4x0cx37w8p5q4xoi48jrcixg11faayv0gawnlowpo08304o4xfyyj3jsckxqlnlujhsfairv3m12bn1k8o0tc02fk6bj048c19ip7pz0hm5804rnv1cvv4zlap6rv9a2z04m73t212rchfahlfr8ges0h2ydpqb3qm6688c4mst8',
                username: 'rdk77j1gw36n0hp3ie0cxfuwt71y888nzsu5ya2irqkhlod42wf6a0vo3kx2',
                remoteHost: 'vhwm2lttvv6syje62d3wezt4xxeawu6ujtmu0ya8h3zt2emk7o8ub1knrydk6udvl5vvfe9gsiqmqxxqf1wuseadhc7yluwv46ornv7b7gfwic7ub70pjfpg1ieykzlewazp4zdyuifr99199dwbbs6s3mbaxfjp',
                remotePort: 4143428700,
                directory: 'i7dtgzwuqzlpxls0zavqwtnnot1dcls6n70kpldkqo6y9fg5u1i835mus2fzc2c2p5amny1q9l8x5521gyw8fdu1tfh9tebnkl95ku5jicv0dn70xqhvbduyjkzvstulxpw6pg5v8kp02pmi1vzk58x7g1ff4je65sv697ct9o6o2b8zjbavhk65spn86jrvkef1063yna5rpov76ea2rw744oaxi4qx7rgouy62ylj3rsilu9dbkzhotmj3ioe3vn92t307e7cw2bbatp35ttjagzs28bhajfgypj5e10s0l3mw8yivz7q5k499imi6a46ss5eqllxzxizyuaaxhpzwx7wngse9eekcar55m1iysty2kpcfqaj4hr7tcvqg4fnwmqr962bm5g0g319vpahdguyykfn4ftizqi3mbao88o51cmhj2db2lq5i7yohihm1lgrij6ugnri8nzlt0wj8tej78dg4w86kbiv6lhln8v8s1moireh40wqwz37bia8f9qcgwo1j6r7ywcsjresk7hkbodhi0ucwv1spq7a3m3w9jd57vbe1hga82cnzpnt1tfqfmcpul4fze3ira4mfn497gduy7hru0jalvp27zqs69o7lxfcukm0xslt8zaluyhgrdik067rsv87ez9aicn2k9pwv8gv28d5znfqqued4kv8j3emiqbo3vmoc8oa240qaib66eh6o5gjtdkyij6o72ac6lan5lw764m3z7fosvh1e2e1nf1hvnbrj869usgsp8vpr2dxrbx33xld1ymow31zb3q9zvomnygz5nfdedwckh8hyj2df8xa64g96ueqc7k7h14gya36x3jzad0ezv318kr6g06cev3fvwcdh2v6p99z3yuariql73qo7vo3diw2pk4ikfnqitu1r0vnsy1ga7glt6ayhvyrjt7txstxguymgzt7jb98135b6xj89pan6648nh0qsfk42odgjnqtneqsl2pesjr3jq8ewtais1gaofrpo1ul9',
                fileSchema: 'o7q42h8h2j1c2t422e29flwftq6lddpcc2bxlwxfmgic8t7iaakvl83avoc66mf4kds8s2zmqcvtew45x6jhwe7djfq4p0cow554tbct7qz2rdavarwkj2cxy7plqyfmboqafy8egu4di7l2oiak8kzhh3ghuhyvwe0dwd9nu83i0t80fkwv7om40s7m04fte7erckbushv0w8spr7ad9jrjvbkl2l9oe1xaohbms1cs8w6u2yjw76yfo42hubzefpbis5fq2i5aax9qa8yx9rhdv8a15hknzk343qqa4jpm66fa31scqr5nvofxtudl77jp2ju5yotsyc2e3sa0bv5i53c8rl6xd9emwsy9c6aj4z14v5f5iai2mvtusfwdtu089ods4betc6ezquidnrl6dgpmflhcp8xcdttz0flbi1miu5psku0r5d9vcmndebjxu4iol3p133mawf6e1a8we3h8rc9awwvrvmbym26q20v50gg7isq4shvn9qc58yyulrklmddclbckddptfpfcrcr3iqdw6y5zncbxddso9cbuy44qdy75dbjwelw8ok87of7bh87v4sirfab9m66ptpzyv7oiwccd0i61d3x4nhxj23eppdm4evuioap7cprk7noa81eyqt5esxzji1zntvqvzy6hjco5gkzr6ubyihb6doqzyecmid9568vk6kurc395ginl7dp9aj3wtibeh8bnjaijxb67h20flw2uwqpvebsyb90be0x7w9apf9cw36opl15zr0arjexrzt6awgezm69mz7t9ww19gflzit9mb30d9hxzn5rkjrinxx3pf4xvo1bqdygzqk78am3ulx1f28n20yfoigww8gye1drdfd2rk6etru5crjdden3gqmgz1e5adddpznk7zywli4nywff6bgqpn5ojjthgtzc87wvrsf54uc2a0gynpup5ju3vzwkgr66g614ctwxgounkl2pwiq7xj7u13mzdpqb7y621mzb9v7fbyffd',
                proxyHost: 'zkwfltmgsdqssbe53vcjob5fo1kk0g4xpin2s9t07xywonus5zmhigzz9lpi',
                proxyPort: 6630305066,
                destination: 'npgodzxrkozs4obmf401mlb4cwvekb5menzl5btd4wzfdokise0twl21w0a4aevnga8j7lxr3ol0jj1d4pfad8nkjt3bsm870t1nornnxy74v3lhktzxxdx2eofcg8rfc0hap89kquww6jik0eo1mvmfm47s8khg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tj6f9a2bjwejbjcr3tndnbs8bon9iuj4odo5witdhgrta3fbs6hepsxylo5560xkv3yzc2lhws9431i6k8ir76tvlmt1w464btkasm9q6z3a5ji9appiwsz7e79req6tr3wskcepr5zhkvknmtrlvsyigahfjdw2',
                responsibleUserAccountName: 'uttzil4o0g8qdh9ldkm6',
                lastChangeUserAccount: 'r0lyxkcsskh2dbj2f7iu',
                lastChangedAt: '2020-07-17 08:04:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'a5p39r125dh4xb4rdnwfpy62ur2bjccho6i35io1nju9ifrbbf5q6rohhdz80sddqim7we577hadwatzgc2q46buhpw9llph5m3ggpoqtr18cu0hxfpabravrt9d73h777jpjg25ryr3hkijmcqr64abt4xp8q77',
                component: '4sbpy0ws55510mqy9bkwelxjlz167ozf9szp2w8yyo2fkquc79dtjkz9wc49ac213339yqyd2su90o4f73bj6o2gt7si9b2upzi3srfb701zzijewtodtt4p5b50dl0igcz7e5qr75mhedvu85pf3wdgfl2o3him',
                name: '65h1f3qzff8l7mp8h1zhx2gg5rifplivlw2lqslddwddypw9y0bmuids8rnv9q8ufqlj2n6rm1a252w0dstp055rug9kshnxfp3p1fz0zvy7ajcrahuarq9ax2h0ff6k7og99c54el8jp2drfskeg94c8kqbsw7x',
                flowParty: '42a8e7c6nnn91kv54462lzxhinjjgyif5u9duk71k2wo09zfch1sja9jtk18xldwc9kxyml4zbkrlebn6rt4ms80mxtha8e3wbswz0e1rgj9g57mup6u2f3ypuq2l6flv58ho7keb8sy6vb8kd2l554gyuwo42a2',
                flowComponent: '3qz1rhudco2128aqev0i1tnl0ml1dr0bl3bwrktc8ymg7iknaaav9qjaomgsnnzawqyyn135bl90ye80wd4nmpoi2ab8pfgrvalhtieo0yxowfj9bbasyc3617jf35notu8kqce29eellu7q6hhu6cpul4ddx92u',
                flowInterfaceName: 'dxb7gn9fyp70h79ou9k0ztaf3sg63f5lfzmj4t2zqux2xku9ybsm1wiqjj5jvqrpedmn6nskauyuki7c6zqk22ji5vkh8bb8eg9afwfpko1x50oa6gspuek6r57gal4hq1kq0v8uvb2wn5gea28zunbzp3hzqzug',
                flowInterfaceNamespace: 'df6n8nhkbehlfusj1t2uaes4jwqpz4n7owwwjsy1p6hxt4es2ozrip127mo8c88uqrbll63bbugyi4d7klhctliflk95hhlzm08a0q77s6r0et8np6mz0xww2g6dsb6eunm1553k080f2p0vzfluwmg6akun08qu',
                adapterType: 'jg86ikqwz392yx08yxl1y9bgmhfh3zn93g5meltmqjbdlojalj3f5adf2btu',
                direction: 'RECEIVER',
                transportProtocol: 'ne70i19pbxzvu08i7uzuzt2s3k5tmvnu7qtr59jmpyur2p7bs748df0aln8v',
                messageProtocol: '1yxn2vxqunbchpumdge6qggadbfwcncdaowdfarpfb5ax2hz4jp1zrhdiqwh',
                adapterEngineName: 'z6ni5klgryu941qyrfvbqmn5l8430igstv4vxjjattgoq7hatp8g4jtic3cqf0pejzkwkcsuigcapwesa1ma4kxgsc0j5kx65fgm66kn22m8h0ejxnoll5e0kw6in3c0cymfwab3xqfz9gcjdm2uus650znef47b',
                url: '3xwsh3ioutd1mqw8n7guou9xr94lun2ltzz22zhvr4v9hd91v5xpyuiq5j3lcijckdp2usygte3ekxp8ote36rlibtxf14qfyguvddq2gqqf6i8j5jnrz126yh3kpqrf4zl9054uqwjnnlzg5u6a5qvpdp59b5mxzq5oziae3hpb3ry8g905j3q8j4kftumb06izpdcjr5idcn2ef0q39as3xq27sonljgzfn38vafnac9ykiu2dswprkivcfo7bjh69l1acolchyam258ini597kbg13zd1q6h10g6mz8bo6a2as5m2axxukqbb2e4n',
                username: 'kyi3kl0mtkwutjwrzuzqwxors5k83g2l7uqjnzyjy01d984v00at2cv4h2p2',
                remoteHost: '7n0ubsg0mrhe7sboj168636avftpe2zxtaovr4oilv7f57jgl5yhfkgx5p1urus1ib9csmeuv65zymnjdg2agya432s7i191ifrh1phg7owhjiu55u9ih1vj4woesfk27vupyippckl9u9dmkkvetzxs6adx6o51',
                remotePort: 5432060339,
                directory: '07z5ie35o2uj1yilxhrjpknfbpeqqlei0pwq8wnvisi5ixfc99fdg0kyfgdzw07hz0xf6pf2kymoaxmvncmg9lemz291yptk5550qdzjwjbvh10dfh3t9n5x30qiqtbtarnting2c0y698y3az2qezuyveyxvqzdq9n0cgp7dobmwozn38gavjv6r8mlpwwgcjlqyhbk3awxhup8r1uclu2to9laytic9gilxu913wpzo5rmko4cnchml8q112ykol80re2cl7uzl4z9hmtnyo0waq2zdlhi9bdfp7p8fn8weq4qn9l5tvqfhqah4a1j03ziyw0ot46hh6pi35yyxl16neni5t7u9lu68m8qcnlc4sdxd121bcrjis3747j75muu3y0gqrf1hrmb6k6yrd55n5uojm8wnk1cmmgk6h74i24xzn6b9w4ug7rlr093chz0mqy2dst5y0osquc8upqol3pdjmblxarpvw67qfqxy08j5va76mivgfx74jiiw3mucsst9lfslhusnda3b8eoo8yijrbfcswd734i9dx8y2mmmt80d73gqy9yq211jvozyipbvw7nceuwi94m5a6j9an37pypf0vfl453ksntr8yd3jus7ne5t209zz7bo3j234f2r2e5602m4pasortmh3zrg6ztrwhzcafqn7oeigsqdd54h5wrdll79f8tgiauxkz08vd4ejdpwm60zarfyzwprpp28ckoepxy1gv9onx3t157qqhs0h8c8jbui14n9ohhxoie2om7cxmzzslil65gldlsyhljfyczv7wf36wf3a9iczykwzes2qi4zbyagcotlv8plx9mn0nqalhy2pp9inaqzfogq4sqwyljpkhh4tbzjem967j4jgyok1r96l9amaw2gw2y33ngfsn1ppgvgrqjrntvmbql45k6uwgfx5uzuv3ym2r960r3gps3bxicgqcdoh5d7io7u34t5svgni6urcdq17zzv4nouhjd70ctoi063mgcfora',
                fileSchema: 'cp9tdj5bo7x8b7ikidi6volaqypmazlgaa4rzmfz6048tfei2zpf28dvhcwpprs7btbv1i7mrzg7dc2tv0dww137clfxylcar80jkx8s84wwr7d53g9euppc0w0oeh5isqwhblv28fblqcvtn4kefom9yhrqhlhjtq7v0qpew82zel3yr16wlklkyaa05ysrclh0vkssgeyujma3j8mmqs1ynvpn7ix1z0akrpu2fkl4b8f5ue1nsgb8rtzes9g6p4t66z915rj08jv5hc7qfv2hcvwph7uwhx4v427ea7pg6xim6a8f51iqgepebnfdt17hnxdcuitb9kghho4hyjfm75vwva2y4mnvk7fe3urjrj662v296vn61y7rwh6kcnk5atjt0gbrzm3upjskeejmg29dccyo0275v9f29tx5o9yzkrv4ghfbdrdey1ufy3l0mlmhey801wn68jivgjqdqiky07wddg332ta7k2amta3mqz3vgyp3ojkjm2g8vob0pzly7suem7hddddqbg0gz8bxa8r6udjahg8y6xow2v139ra577c8emp0xj321dgdpuwqi9cpzyur95rv3i4fv1walzn49bhcol38f9tonen8p3s2b8xt00hi5zq3dlam43ixovlb3lk4qzivfkfuin232edvxjxboqjccwnhiwzvcr9a69gun42p3ycgjp7xepmpo5rgs96v808wxo2cokzz3h5vsrrjuxjzl7ennu77x4pn1rn7ruxuh08wrl4xo8k389pl9gt8trgqlp6vg1526edpkdp3cmlyoepuhlvqpodpvvx8i7jcynnkhc2vryha0o4cznvthbqp1w8dwu9866lc4zykk2gni5nwu6l4ymn4kcgnyzaeidl6bez2cxm4dwuio6zdqsyvrrkm9fbeio9tik4bgpgy227jgs3loqzm3vonyfjts6y7jjwpg7q8fxzrxg84q4cnvxno9zidufqjgylqdknwbeca0ky6tagx1s887flz1nba',
                proxyHost: 'sj0bap33mv7p5nnsftyey5awggcxodlgn682couz5udm83rwj0jkot3s91xr',
                proxyPort: 2426958113,
                destination: '5e2gh5yxcnmg34tydszz70p9fa2y9s90ukesz9oo6f1v4adcjcy3nen9619gixpte0xznzcxhecsfvrv39jhyc1i74wok7apu9p3zvmc0iun67vh3a8kq64ad2xdjxgnhnbg3ihlhfe2y4w14xxc8cmflo1e3ge6',
                adapterStatus: 'XXXX',
                softwareComponentName: 'cmjuh3v7tt1p3d2bqito48kshkpz5m67j3qcrevh5pt7ggap4i4k1t0yrrihdl6tggemb2xcgiibfy4kalb97igp4s42pkhrdvuy0opda0easiocxotpc0uszbedljb9y8tazc7advhx750yqwg5q7mtorrr151o',
                responsibleUserAccountName: '1rahjs3daagqrg5zr2mt',
                lastChangeUserAccount: '3col3kry4bxzihb8k80m',
                lastChangedAt: '2020-07-17 03:18:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'ukj2r08mte38i2kxft646b6k6qz8vruj8ttm95ia6fsrgfjn9qfbi9fwnsvykmuunuwsqtm6skphkmk5nsfzh7lo3fiwh8iipttj281pcqm3jite8j7gb73sgqzkv4stq3f4qmpuargit1unicmauou46ct2fbf4',
                component: 'o0wjuz0uh20ox17ryseqloafyh4tgimnct7cfkbnagj2jwomfi0jddpok3rx42ut06egp3fc0dcncgh9r2z6mo6o63wb6rrybaxsg5boz84e4j9pwelvi8jfakh86r160vcbb44i6s6h6r1wlp8ijshcqhfnarx0',
                name: '4xxia8rq16x55fuh4d4xjzwbrqgzyikuwtt71z19orp5og0vtss3o95bundzihj17apas4r31ff15iuiqjx33lpstp9qghxf3zj5ch7kypip940excoep2bewvy9zp04lt76c5hq3wanp6ncayhh7fv9tbbjbkqp',
                flowParty: 'rahwd43po5yf8a0yn900l53rna9oi0zlqyvh05iyqn8c18mi5a58seqxuurtthb28xch24vpf60vhfduyd68h5twul030adk7rr9xkfmo0qsozd4jig3f0uoalvnuucj6g430hqgya78ezd74pvfsqo7apmi9qk3',
                flowComponent: '1d0s5fydduf8uuyeaezyx49ryrmhnh85pd5vhywwftfhqyrbrg6s80mgh5gi4fn7qs860yite9vdt3ztct81wvi5d0dpe3hirrrr9k7sj041c1kurf7msniihdzub6gr28p0sjnrkwq7ac8ur7o2685kjxl54d3g',
                flowInterfaceName: 'f3b9fapn5cv8xr2knmyona7iiitr3rkai3hwvdwyid9k8teickujgyo18s0u99kgvr4dco1fz705c00qrxu202borryd9vpsp54mkpiko7ydh2p8bd2f4lfoi2kxfmrrxmpk5qyayx7xjqmec6hpu0seyb7f0pce',
                flowInterfaceNamespace: 'zxzr7uurrz46izuvagdyy3caumh32tzh3gyx3alrzleibxe1lnud6vuh4nogs5j7yr11kv5qp40gytvoixx26p8y5yjpac9hd2s6y4vixhg8q19oo3x3lhsb4h3mhj9jry5ju0uf87ea18oefp58sncph102w2hd',
                adapterType: 'xd3des8jcy0yd0ffbmdmetdqa6d3hr84tnz5dvdwg27sko4smwv40p453lnd',
                direction: 'SENDER',
                transportProtocol: 'zomdw13n9klbgm7ykg3g53ywpcd2f5f6poukflu7z9yqtg83zq8eag332q83',
                messageProtocol: '2a1kzlfyyrisx7yqc6scjej29t2i5alo7w55sbofm405607gh76ud6r7mj7z',
                adapterEngineName: '07i0ixvxh7fzq5u24zyottahktz4ftysgnr35z63sl1dy1vrwl6ntrg7i444gohzggi476aglpsk1hgkc2pfuf3z9rsj37cnxta41fmv76et7tdw7w1pf8tr3p9v455xgatfbjr6nwtjrdqf8tq0h19e3w5sxwoa',
                url: '0q1ij5a9pci0mcmzjas5f0cafwg8p4kf1o707ifutsn05hm3663csq98i67sl4574ffl3cf90j0ybu8d05k0joc8r7ryq7j5jajrjkmn1z9gu8nm6j0b7vjf0cwuliqnejhu3j2pj8y1l0nnde0mee0n82heh5lq94jlcrk082uv2jv8ium1e4s1e4jsjsp5noufrtgmejrxxbbgq5qys92jugsunj4zgplw4tjaq4okjidxibcy88wmlmo30066188x3iekz192x5z3bb6smzhzq5d88n549ocrpw2sm8xd4fp1jta9yuuhzlqnni9q',
                username: 's46f26eloo1rf0a9th2d6flky16pxpbdi3lde10c3k4flp73gpeiradmpl0e',
                remoteHost: 'zhx8h4bf5sbb10juejeb1os6r02in48y2rxgkugodbm3n1k318lhkffpslkqmmtbpvq11m7n8oso90fyas819n5k4yjunpq8cj1iwgvh3nfpaf4gy9l5obq256wvwu158geoneuisaq0yi0oepwv20sgowd127qn',
                remotePort: 4998654732,
                directory: 'sdyvzb7ncuujc3gmoqxyvm44f66dtd4fio9wewr921vb2mqz93bgsqu8efcttw7a8rqwo9avcv7y06pcvc2s969cln1uzfp4t9e1cozbk8swfasux211mmw412ptx9rea663buj6q5pqoroiji3spalxk9f3t0dhxo43pq55pf2p9cut8u8nec0305gwjdmyehmzsnc3fv4doktmegzph8sa20965nbtydgrkru2hhk2332xeu9u5jgbdzipgsp91yjz5vcrgiz87kilij14pe9zpwimxbjkdx2szhfad71eih80ky0xpwcc046fq4ztni6fpemdthk7685amj6m5alc1n300gzoeqq3fk4i0dn68io2pfd0nehnc5f98bdo28cnbmcvu5kmncawtitxxpsjxhybl8rrbyruijy2jut4rwwh8rg82ohv2q195qq9k9ydhsvkroc3buychzapg7itj4zi28ujuzaa9xkvv52njkcwlqy3kuzyvddls678dxse3w2ffhfdpymo9lchree933mb8w2osri5gb8yqxzivenuve7b0rjf753820ra9a3ji5spv4n58pjzsaznpn2nijlx28a6vjx81ebzr056l6g3vqu35wem3rzio4be1yd9fv35w24zurpps1mtk3nqi0404nhgs56vpo8e6bb6t1ywm2gyrnojlyoy3xo3p7bqcqny7wvwdwbo6kk3gukws2dg09ydtssq8pms1j8c3uhnie2pzlh3aimlfdk21k2tbi4k394tut3ih93g3q037zj3gbtm52zhfu7bb7b3nc652ekncwv0n3e7ny94ibk2a8lv6zardfeisk1jd0n90j810vsq20uou70itsx8c8kqn6af3zyjazjg893ym4gjv90n05gte4klbxoqqzy9ps81m7qh3hfhaicj6df6wb4sqvu7f4jjrsrbtdypi7k9nmt4e82gzqxcl8artst87pqphsu2qsc7k8u5fo6bha6y9ha5di6xb2pykzfa',
                fileSchema: '17sva9qefp1lr8gp56fjlmj9oemxmi3ngk8em90ek8j0qxfqhsy0ygnw0unu9k15otbtxx311u4lilvm38a0876e1lha7k1rkyle1ab12q5em0zw0ohtskth8i7os6yvpfwymxk0cy4g7mkpxewh72x2m51qhhefpyjp640d0qswjo4amsrm74ff3bzvufgjfonhpnnxl1mwxm04encryuo40c6cwnvp11v247ag0qnlab0fkmjt737zzd0q7ppubpex9lfx8qt27yszltccccnd0iynba0sq48xv7smtjqqhvod5p6aa48ipou9l4p8mawtlnmjixxcfk60ilwen1pfz1y1yorivyolt920f2q34hkoii9xobwcdhofnbu780qyar4246ltl924g4gzzrirh6alxo6324ihu0e53msfx8jhes5ogw0y70huurqpxntbuy84e3zktdrey8xd6jezp1f6xfrfk6aq0psgngk2tmja9k7yt2i8syi2stng1mlqdcdpy7fvpby7jg5stq2c2hm0wqgj0z705qq4un8av7usyun11p4q7q3spcx8ml93t398lk5jcqjllv9s7y858hxi7hnkqpjm5nwj5czmr8cx2nzufqsxi7luj1nb47tnuyr9lkos8cv99woen5uacx588j2n4rlv9lbe5k3c1gup9jjpi1anmcjyey3u35tr0b6udwudv54fbs7qtuiiosyelyn6edd518bs8xgy9l82jhwxxg4ut2qj2kz3dv3snszddlxnnnqzjo7tjod6imdhjjhyz8kgcrbk69mej9q5il3c70bznto0iufwaizw00ebw9qqmp6vnyufxwmxkc620p2hsme4n6uvbf2hogbnx7t9wkhhrxbw9ad7vyii1ee1us6tafwvyg0d7rzxdtt5ha1znry8o3bmj54tdwxipp1rez3kq9vy6xgd5uf9o1qv0iodgz8intulgmb38kr0z9ml58v3p7kxspr6fp01zu26pv7r2if4uqou',
                proxyHost: 'vigx7w2aenrc5nrcaad202xqtwj6vnjvtbxsviw4id63yu4qwim8lq9vsmdf',
                proxyPort: 8034818076,
                destination: 'ft2mtchopv660mgev7ml3jl8adfzlhprxchb12f0b0z6fc6c8qu3ryfcd7q5c3liq2q6axcpx7dzzwoqg0cstiyn712dix12z6bcwbav3zs06zseqcvbkaapwzqld63fwicu47zk624lob8dk7i95otpov1fhgyd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9mhc3w82n0l05ucnsddqzd6f9an0xygwzph7135lkvdlwyux4n792stev6y6gcijn3rl22sl5sb7xo341v5nsqcegfqv7ut5ngzi1pjyb63zjs03e97i3lyoecpkczt8qdkx7myuf0p2wxwxdu3u2e5bducfif0l',
                responsibleUserAccountName: '3g2eldo8nqol80ujvxml',
                lastChangeUserAccount: '3x5v5leun97vfj7u5m7i',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'f58kkloq4dpsua074t8n15fh4wd8f519sp6lvdqgkftixs79rk7wrbpv6r9ckg1ap8jh6dzllutpcyyu9m7defuobcms6hra46d0t7htbhqoqas3rr4s9whtnj7s0ngo36dghet9gqt3so9cwml2nx0qtbnvgjnl',
                component: 'l7csq8mmz95w92nfc1tktoypa09b260dvqtwfsaswyvie47p6dzfetcmodns9ymyd35jsdiizk1oxww96k5teelidluo49izzygmyy6mj2m0s3oqcxvdkw24b1pl7jg0njy5mycwivys2mz3touil28bmd1k40wc',
                name: 'x6wifk13lez6citys82w1y78vbxsib20y656okii7zbpq8s04hmnxp9ogcqus4lomo3rikir14utzf52z1me8ke0nlfl4ivry6a09xj660xs64ku6m62xeizduuvafy1j6htl2t50uudlcm7y6wm57kj8l3spziq',
                flowParty: 'vwunnsgjrq20e9ox99fjvzqktvduni0k64mjlp33fu78oq64ym9tc5nzl5or705ynhu72f7mdb378l66oacb70upshzheq8r860es5320cv2hw8vpe4xvlo9ctdpbf438qd1fnm9pro8g4sk6exjpc1vkjsm01re',
                flowComponent: '47m3retw76v4w0am63hy5cdhtpzsew2fv0w4vusnqsuemo7pgauroq07utl9ewwa62bg3pgb6kk7558j3y1dfgqqlzcgepnwqqwerg647nlaixlshsnbc1ur4jb2mt7pjp9q5cmfo2abrrs5z5zliwzonma7tnim',
                flowInterfaceName: '2xto7w2u6hgmeaddqw5wkrsvopdus8bt3imts4scj57t8eyso6ds8t5b49odqutjxa412o2v0zbm0r5939wj9vf61x78xkh54uy6drdi2fv579u3536yscwiffo948rz4trjgq6wicuovoxc0yx6nq8jahycwh2u',
                flowInterfaceNamespace: 'tp0cfmpo41ss774txlsvkce9d6fjv6vn7gcg5nsemro58ounimv5svgu10ov35c6rzrouq6q4u4kfhrg398sypvyqmbjxpuy9h93jk4evump0blnf4nilemmdbajyxye1xrl5z4vd6t6tk2g2aaxfg532zxqyvwo',
                adapterType: 'ossytxqiilek6qbn2p8f8gr7vlil7qs1qeiuiylueuppgcooot5rb9x5cgwn',
                direction: 'SENDER',
                transportProtocol: '8mjlgp5s63pzxwv95as9iddfho2ajrj4fpjrld1iz7rs75d46bexdutq1mdz',
                messageProtocol: 'hn4ewgvcjv3m7zkohanruhqdksyh5zn8n2550qeznj3h0zo997u2xtj9qmew',
                adapterEngineName: 'm0z7mtmv1r3m4mz2v2rxee4o00u50pdb9ndrvg95ikm9i5fu6sddkhc8z7d8wipi9um58g6vjfnsq34g3n16j2jh5gl2ug6dufaz1fdjd5brapdlggyclv00ur9aec7mie5cssqm45ql3zyp8gucfnf0hpsfj6fy',
                url: 'v3p4vjc48t7vvnhok22z77itoy4qcln566hnci4hhiy7g10fvuwjmq5t45prk5o3ixkgjggl4ce9vxxhpb2ij7jyyexkx5ihztp60vh3p2bo7k8zi27jornpnoxs2pv7470hqzthpp3pwq0bdurnvf02lqj3mr42xjdvkdwfve1adrpzmi4p1snzj71sg5k0ahplcqmnjdk341dyxfmagvk215gxhsiatq28qqiiz7tc8s96y9pkqco9lohb2ztnhfo43ctk3wegu8kjlubgbcx3ysynxrpn19mu3s674gocna7c1qduu3canf88imbo',
                username: 'jcgbu8pnvyercvkral4o8pu8vvu0pyju8svq5z5x1q8fyo1ef64sby75hqp5',
                remoteHost: 'g4mf8lcrww3a4l098iie2hvkftdo9ck87bnjkgv02yp6dza7zv9l5vned26chuni1ao0r3ha0yicjingtony6uoez52chzk7u91jd0ip4fact6t5rh9n4c74sx2a2rc22l04be7zcacta8aq12pz62hd4xlvigt7',
                remotePort: 9207623442,
                directory: 'anwga6irvl4emyax6xi5meaj4fv3lisfw0frqykbrdr476eften4zb8u7grjuiku5925wnk81nbbr6hpfeed8zw7ximquptr1l92717nk6znd1678t1uqlzesjhfz56eia9npljaxk7dal5yuwc8x8yuykv5ptcnh77w60u1qlb7tyfe1w24bliq0yg1ai03bb15z9evqyjjsq9z6ue802w1fz17xugeffujx1szqh8fcm08xoj1w9as2fy2cbyzz5olr3nit6r8l4a9wshxechsryca1gbho9wfte996nhmqrzj2f473ug1zgkderaffb9ea04qrngi1acvqh3ha98grvd04wtnpq8r8fl8njq4gcaxz3qgt57m3linqni6dkwqyqa88unu78gbl28ohpetwsyyi6bexdd9krqozgonrs60b0nfar66g09w7zw02xz7xkfaegu4lye022jrf3eg2qtddq9svxqtansdtap5nq5tpkat3oxr9yfkuyzna5jlvcg0hsprnh6zvr28j0bcn0wwyb5y909gobld6ykmvvulr9xw26u4yjma5kyhog4cpr7ihslsk931ltgbcztl2y2ijg2lleqatgpvo1bzdxp8c5ynpgd60tz0rm9usxcjns1jko9qdoiuskf2wgvbc41gq1a76qy60phhkgmwapih9d3o08vjyedutwjno42q0rja8ko6dofa6xeeew8ylhossim3d83dsu2ni9z34eqvdvkwluc452mftz7k42lkjblryrcjtixmfr7s5rix97t6eic8oe43db2lupsg3zkwpkkwruzn2ffa0leicwa6wdg1en8s24c9luelxdhwgnka479e003qft55vac14hbq1srin3wrhdklc00qf3cpp0e1mvb4m256rlltege7i7ir0a3qqgwz9hccrymdk2p5ccxiw7q88p8qsmc9knq1hun7gicelrb78k0x0m05tc4czyvnd6x7y2nj4ga71q46ys6eqqtpoqy2gqma',
                fileSchema: 'n4wragh1mtwy9hvuqen29domlpmgdmkdfxlz5kj4r6hx142ziwug9igj43p6t9jl7jpqxa2oudt6yim56xdwwzdwwxi8ac29dmo44ulxle1phkrm8ws2qsglpg83qpbsmckylxrpaybsyc12pnwokfjpz2cwrr2bhfngej8qs6izw1veczr9si52tbrkxloxwdzip3uzggjrqpxx7lbbyigxv9pn1q6g1w8k5wuhz1q79xnxwtl3uu2oam4yp7d8qxl90ty7zl676z8mqub1g29ps6t77t8tozetq6u3qb2tzdtifye69c0yklsxdyt8cjpbrposjrgz4cnjdu2npa173r7ymg63yu02qtq8g47eilyewdhpoy578pxhaq190ynnxywebg6z89e5ablehq5p5f1t6m4netygplcm5i06whz299n6jjm46zw819lmmxjjj37unn0snvwha5aix5zvaycy0fdx4xqvq47c30y6tzd1b4xff2dh08udj048grkbgaem458c3v8hl1molkehxycolbvpfpghhufarjhnkikg89ihgho7zgyo4qlmauyrns8inafcl1zb2kwmw114m3f42fxddl0dpsbqa6nlpjhxgsibdu91f2umv3x26nipi2rs2fq4aminavv0f9jhlmtr2ojw6qy2phl32a7roib9z651a23god0rimv7p7153ey2yfz0pocg1x1i3ugm0tkz9d5mwctbvu24ljwy6savy52iowsmvky5rbevwpo7b48q0sfxyusbzhra5erm9h2gco041fx09r7nk3btmh8gzs9xypvs4r0d1k1qlbwwg63me65j9seao02bstq1d8hmikupfedz9bogcm5hxg85fmjkyy5btf4z8qeihqtsjt9e6vmffbhnniad192mfrl9kmililo33yuqpk3rwbtfb9y6usj0r95n7uijeluj4hrlog9kmzhcg2ey5i0snm130fbrr680q2c9i3velxk96uop3n9xvan8i8zo',
                proxyHost: 'oro4mey13osvy64cg15196eg0muz741ygzqpqnlpuzhirazxc0dcieetkegy',
                proxyPort: 4408614319,
                destination: '1wk0m2cn8jqichc7timjximbekea0yx289l5916gjlk1o2pnrxmd0utqh8xjdev96o800zfrnwsimq6v3uak2zg33mq2ef6lnrxfo864w8yxr30ccglyq4e1z3bowpk87qbsoawaminb2jhqnwcofziw7mr8yogc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ktn81ozoofidiu6em5rw3ltzhcb0pq032aekpr3s0lpja5m7bbkylfpnct16tfusykfvxk05nuk3x58m4gk2i3j1vdk3hs289owm60ci3i4biiongpj9qf3kdpyzfsangc7xxewn76ovjt0frc12s1k3t8454c7r',
                responsibleUserAccountName: 'gr4k2i9dwsq98iufmqga',
                lastChangeUserAccount: 'r0j8ev38w9gscgtquckf',
                lastChangedAt: '2020-07-17 15:28:46',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel`, () => 
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
                        value   : 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'));
    });

    it(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/bc9efbb1-2b66-4f8a-8b60-7125694e1a40')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'));
    });

    it(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd8403ac5-c1be-4761-9a56-b857855c8913',
                tenantId: '60932a41-3e00-4d15-b6b6-44f01256202c',
                systemId: 'a7ded94e-f539-48fb-a118-812d496bd0a4',
                party: 'l8u7cif3l131258uexgjqxe4f7rt11hhxw1yctf1olgn6lx3w9t2ithat1rhw38a7cph0lpxcg4v2w9e9teaiz8r5lk76j39cebggzgw0pyprmqcxkkmt28zpxwyi2781c62oathqbf2nybg4noz80mk4l1daaem',
                component: 'qjp0ke3s516moiyc7vozdlxzq2bsl5dfiev2rwbv7zf2747rsrp5mf8lpu85gvs9h2l1ext6d8tm9ixwg3opb1sx82klrb2050jjtl5rxmqgw6h7dcyh2f8qn53aurlb54qe2m7qtjxt1bd0zw8cdadkryl5qcqj',
                name: 'nn1fqp6xm31fck47omh0ci9utihdd1j9vfflhcc5o18bmg5bxs23dav05us49q8pr5xhdtg9d4lgw42s20ajboqnb5iw1hl1rirzwvrje2pdn2omaghp3cxaa83mwiv4hsrl1p247n82juhs8utv3ofatm3rgk9c',
                flowParty: 'zfp7ygtqk25qyj96j71p0enkjk5u3on904hj3rrr9uhuqxggrpx9p5xwnhccm84f7n5a3bmns8gpw4pxv5m1tis79nu9rg0i55b9l5qd8jigv9a5mxz41cavrq0s67cwq5p2gw0u75th9hupyyy7xepsxe8od35d',
                flowComponent: '3g8affqe0eys3228atd7afrj79k6wfial50woz375b9uss1wusm1lpqfqaktjoa0i4jdrko78dq00b30j880kgms0pz8b7r6o87mtafg9x40647us0ve9cb3yvf7jhvpiv9kkmz59l5ew3u8tdun2gtyap3yovum',
                flowInterfaceName: 'yryezpm2df7fmnoyejqpxvkxbggmby9hnug5q6ucyq0m5jai0ctkxh3976l4h7ma0ep2zj04wjdek84oy0wqc9335ug25gfjtjj5la387seeq6fitw42t8ruq4cnkewbyv0w5epdpj8pohtw6zql3h9287y4lt60',
                flowInterfaceNamespace: 'b4dw5r78kq75etrar63wcr8po9eaqt50j11664yj4o7yqapley0qiqdzarw4ywqg6i323j3kusarg63favfrqn5jr16vfncpcdoi5fg60q0u4udv5bqfhaprwnoo6blj4s1cot7n7ls7otk3bwobhtug0ixs1vq8',
                adapterType: 'jjmol39cmp1xxr2xrlyr97qz7ivzxacs8n4zvc4300c6w2ww6a8je08p5u04',
                direction: 'SENDER',
                transportProtocol: 'xr71yr0yox3sor4ohztyseoit9uv6vt5h8o355g7q9lps6ksqc2818neac16',
                messageProtocol: '1wvz08inreccez59wdkusu9v293wy8fsaz8clryh96kwh3gro62vilz4imuv',
                adapterEngineName: 'ldhjucgf0vge5ymazviorj69w8sg9zu2zl7um8zce95c6e29jd14r67h0k0b1js1ewyzsakndq1lgi8whj7wi5hxqli431esysr5zqe30j2w8sjcrfcwx4ej7skzib2z31ut7sbkyd6bsidgf3dxb6q3blaq51jd',
                url: 'wxclnpzylrsbxixv7f807uj88yjqtceplopj7bc9nayf86c4y36136cm0hxi1o5qtanii8oljywrr6jlqfa7bfkx4lydpqieecpweu3eyxf8volw3x9hwinnsidg1gslylzgredav44cnru2cvd3kpzq3y7uti591dmt7o899lk9o6c8ko3alyzawcj85rlsbub4pcaho8tnsy38r4019qm9alwiwjd76wz62z0n09d12a5ryo82bi1yi6fl073ny7kzywjii7sya3oot5pn4gr1s83dtr5th8t0mfcpn58aetohm1igkgvs9yk4v8md',
                username: 'alfrwf47vkd4vohtkeh8arivr6mt4nikbni3tumb2qjbye1xa6z711k86k03',
                remoteHost: 'fe35gumsfeka8nw36kvgb6y4fnfc8mdf88r0ibj1jhhpna3di2w3iidnbm546jlplyl1lr6r5pd6b4pg1s7leobx3jj07r2ehbv02w77mvlfffv5zbhpc7xcmzk8tkrodjl0me62wlfv99jtk5sa7ggl5kpk3xuv',
                remotePort: 5049001861,
                directory: 'j2zug9q523awmau93k8itk9lp66x23i7hnpofyna01l0hausj385xt4i7yymhpy5frf7q5ru3cg23u8wlmg642tbg14zbl2uivhk42rycnwr3oe5le2olf0n0gzyp3nfmewkl6zzoc6s4g0adw9g0jokag3lse6nkp0cf7077ydepm7840i1p6hi841djek8eg1nxp65by6whgkz23njys3qjpyg0mbe35a6wvtmzcoqkiw27yesmwzhb7owzyevjut2lz331yzcuqgqi2hbts246mcyia3x199uevntkdv033ju18sv19gxo8k4ad9vecp6tvesnabfu2mh95dmr71rw1w46vc50w6s53d6fcfy1x4vtxpytn6sxmkp58yb88a399azmia5cv0i9vekbj8hp5541gg7kyo6kudd5kk4iesz6fl5ffei278xmccnndkct35yq7omr4sx5idst0plx8dc11fpenx78cwh3c4r5icm7f32f6moxcv75d32no04sh7dctvv99l1dr4k40uom178ejqsg4ew38tjdhxsdb5r2td2ml0juvqp628nqay3wgru88t1wt7t41tixtz4aqco8o9da4uh3pnejbdwxlii56er9k11pvyobzeru19lxnmd5rimlmxqjazrnc3jkcw49fhc8sn4luzlfzs5m0oxpm3ee6wzqzwmu9587v5qjcotie5upaz6hfuf2lsg5md1e025mep78iu4m588w35fdko095jd4mmvzjmk8bpvauw0twdne73v3tocx1w63q59137ak182pqmr8reg79od46pxh5zunn1ia6g24ccp8wseezgmqp66o4eqcst7ljxktyblopj22g1k6i984c8qxm0u3h27dg7anhhfnycsg48majwualx8rreyowin68j14vso0gl6d7fpyttr1kgt03b49fimhjgwpy7uiz4oxfsd3w82uytr6d9v56d709g8pxit7dz98v3uwix88e5ky0y7nsx73dw7octi',
                fileSchema: 'gvjgujmgbwm7e67aeqdo9sra08ivctovf05foxx1erkrge1eucf0qbjerrh750d3w552rh9y7mjip8ets6zyc5iugwpxcl0e91v4asgtx81nbm6o9w7ssb000e6um8o9gktjg27j0du5r2ppzg27sg7ktiducry0tvj20sde1debno9xhhsuh8iwon2ox3ocse7g79lo4kzdetsa88d9tdbb4j7tw7xq3d26d8fptq41qoj4ceffk9vwew0x6wp0rvoffmi10varc3j5vvn89v1ywx707luhlqrieujkevqtc30q5kf2kc4bwtq72k9y935fr99jeb7lf80xns3io2ajr1go442bsgtv2z8pjzvglw2fw46rqnvljudlfj56uuz2hf13dv1w1huo72ee3rk4fbrgm3meoetv2s7nu5gjfjc5jhgw2cdvyev86brl5bpj4pm535a73zujnxgq1pbpysts6pfsqf3sxvejn50bzetvaktyrc2xzpa9ps52wxr896f5gcnva0fu71u0u6hxd3f46a2ri9ilcb788q73h8skuedqfd6wwjv8tt8wvdw6birbtcvpixk4uq7fsjw2nc5cllqcnypbs4lma1qrq49is6un8nmgrxwi13pf80m63n10p71m8rfyyf3oth5derpb55fv6ypc083r4ruhbt95wfdz3ru6tevv49rk66da955ilysiafzvgu5u2m42gxsjvbzu88y8m6mvbutg2c5e1u7938ulq1qij4xsros0sul7wvtnsjf9ot7b1tyczxn2s1fi3q2db7oyb1yf40876mopqjs0kx4pewfddhy6q3n7khh3b7thd4nxks6x5abxenpgli4fd0j6db6z4hubaxin8dv9vetoij2q39dy94jg997r9p5d76udkkq85qfyz6327c1lqsuhqhr3we0i0x5ze22bte4vj6pn9py7p56dywz2sspeto8j0mbtm3igsrvge8847rx14yo1z3iptjwgboimngv6vkwn',
                proxyHost: 'bezfoav1uu2rb785khp8pqrp07q4qgzuzzk9n5km3lfhy1iws9tqzvf6leex',
                proxyPort: 9997000155,
                destination: 'x6r8cvndwdc9yvrl85z2pwx4z2fhotw2dwg1exvf1c89syicin2w34wte36x6fx9e3fasdk2ks1n8rvn3qpdmx2gubtn2llzfyv5pde9sn9tuu6hpydsvcil2cjdg801v5ql37kix2snsfcuuvdvfzht8u05u5rh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ynkukw57mcdcu7lfde8gfip4b6oxsgsytfd8o3yh4m6e1t3tzlc95zx6tyha5wpso467jrpinhsu6ujs4xbmvsxoow2em62d2mdy43sfbdw21o1e69v9vafrosphh46cl56hgnykivv779jx95e7l4kdtpq9q3m3',
                responsibleUserAccountName: 'hsuujqgpss1qwz5f7hop',
                lastChangeUserAccount: '6y1ir5py8083k7togyup',
                lastChangedAt: '2020-07-16 20:58:09',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                party: 'dupc2ib6j96e08emh6mlaphd18f8jvhl898f3dv90d073zq9biew8khivbaoqji43qmkxv8rwx8qi57njhp3c3fcpnsfrq0oqyjxd0gyvhlhfs4cc9c6z1peezd8p8bw7lg8toqkt6ahtq7f6mv5vd62nmwgaqn9',
                component: 'eeiacs6axc93ahv7etgct1w8zvtjkaio7lhmpnd2x1jw4rxi7ugec9k1qacxtqnknasc5anqiruqftpcqgm7xxkq5eg66c9kryb9ymggmci8gnfgazlxnuxi6n8gdh8ay4hvo8j3k7u0f8iuc24m6ql2mgk1ii6e',
                name: 'bf14oycszl3t1jwzix774scrww0cbjnh5dvu9h6x7s8nikff24n9j1pxvgwbxsz6ls9cpeel7iwxt0pdgcsvl2mdayr5bat9coflhmvp9f0iegf3icj53rhy6dbstme6owbwxe6xl8bfp9nwpme8kbdo8n07481m',
                flowParty: '2lguz3mv8ds9jpqu9q7r7kp630cgn0bjxq98mhrdd4c9vkcbvo2z94ftj0vjvr6evdbdy6vdskn5uni8yxx1ckgq1v4er27hnue03w6c875dlkg636sqzxji37olq6yy7lwunvqj3lsqtcgjvw8isz6s1ylq15s7',
                flowComponent: 'vfdbyg2e3vbqaj6b3ysuads8684eoqn0jwmndsu9gd246jpm3vfcsgdv4ce0ibppy1jfzxzp2iv4kxqrxtkq21cqgd5ue9wsppstunows3txxdj0bplg9vzsaww82k4m1ycztg5tui79yt36cx3ishw271bxdxoh',
                flowInterfaceName: 'kegsyr8hfeq43zuvquf7kw1ugpt9jy0x7t8lka2nplxy2bq1ba04iihzqnb5eztq7aa3zq4lqy7f0jq3hwk0swsb7re21h5xhpwhaqvlrmepim14bjaf1aehmycbym4orvnsiv6tfmx1o5ejm0kx0o08wn5lrin7',
                flowInterfaceNamespace: 'aj3rvhxud21hwc6npqmv9z2abau8kivcw0bzg6iqgq8y3zkzbijzz2icmlgfmylkjkniglips2ri5l2x8pygzyppclskme05ae8xawwicfzbaoj0qn0v7xafkuu1smijvhbbprm20q601ls9ygr95qrgdirbm4h9',
                adapterType: '017xday5omjzmobs1nat5c9u405n1a3e69gfkmva343y4ugt36jlco63tghl',
                direction: 'SENDER',
                transportProtocol: 'se4kitwsj251s5jdv1cc0g3575sen6xnl9wnhmm73bxz9rdtkd45b2k84n6w',
                messageProtocol: '0v7bzbaz60b78cyf1umqk5qczr5ftiyxkrbqfr8h1guqvdi0vjfd5q159a8v',
                adapterEngineName: '3yacymdw0ibnel5rqt7hlzh067jsq9dsy9y2p1twqh9nhnj3toqwc7nmhtmnt2vqetawpu3p7m8fkppxlvm9zaj87buj3q4bzpkw2c3r10o25gbxsprn6w3uc4wcz8eh2197ehy5fn11i9ab4pkjzth3bgcfaeh1',
                url: 'ayxnk5bb8xuybqot6ezx09u8q0x8kfo4n840vozkwxgaqwk3rspk0q4fp20da3z8bzpbtxyw5mu9f04n4s46a7marylu6uke3xuteb4t85p39qztlz9166bdcioylu3ot2jvyr5x3poilepowgkzclgiy2yl6ojgc2phjvxb6gmqd25ecgvxaux72tfabttbt9hq6p67hi0kjekh3h19pfqxgkrdls3c5r6fr621cxkj8t15805knxykbdhc25zvguocrds1oez6qj6wa5cyvc8mlw0pbf0nli14iwsx4n09mlrhw5vre2afhzev7eys',
                username: 'fpl07rjgep9wbcjcm0bujbp0s8buachjjytwi0j073a8kyss6szfc8th2g04',
                remoteHost: 'hm38ru29ao1gtuqcmlbikksomeycrrh41v7fhkg2hz5dzr6d3mmsxnosmh3l77mnhqqaopbjfyohvi6noy124mhcqn6nhnnbrk4hit7oq2ofcyprp3u3j6gxznvbl18iyf93p2r4xummwf1wb4yja4o3y5239fsl',
                remotePort: 1311526013,
                directory: '0akih25p8i24hsx5bzmyp0kirlyeqiwrjfd89n2sh8wketotkeapcwr0fdsa102li4bm0lpvgul5o7xvbza22fnfl48rmpujpbc9olhyienxsernft2sk9roifh1we9xww8rlmz7bdpnqo0r2038lh84lhxnb9rdwfgumluxg9mij7e0lmj83658sdrg7xeb0889jnh0rfca298tig7jthe7iwtqsnukec7ckk8huih53h171oix4dz04i318lwhualip6kwyjfvpnsp7qkf3ozm0wl1ibpppyw9f435czhpfknhy5r863hmr9zkey36pccoiyfh5qv2gd0obadkwbb0u1v5ssj26lnvteiiudj6gt7myvknom1f6wzh0a5g7nub3wanw7zybixdi0g1c4r479lgfhzt7zkhi4x4lyltsdunm2hm8uxnzxu6xghdu430k2g0si4zqz1ru1drz3lqrm6z4jgx7saq2w4g0c9w7jv1euk93ntuj3lwor4av3y9zc64ot9aqltlp0yiibnjpozzqb38rg5hmxh6uk6jk5jpqo6dvw99mrl2e5kx0nf2kracc8x3itm5nuhzgvqypu9u2wn6pq8a94s96vs6lbw624v8a39m4m1nukyt0n26wwidzs99lzes3zwob5c7c0q7t7y73sjrn47omzy22034ppo84ogoh8n07r8xrdqn3ugv9dp023x1zej8g20wnlyz4n3y5ahqwjtjxztympihg2nbfi9hr10n90ymm960m8h1tg60wpswyz07ww1prv968ylit4coyys763udg2rrkphf28tnxz0chmnx0rqs1dzu0cdcfta9jfak9xlv0l70mbgd6pzcw0ta13j26jk2paeformzsz3splyawlmg5yjoi2t4vdg83ugg3hnk6te93q1yo71kjfivnjo9fdcxuesghjsudk55t1wdgq04459b8tdf4o1ls9k7vomrr7fls0p54i4l76wnwasbfdmm448h7lto2n6wia4t',
                fileSchema: '77j0fdtdeqwgy3ri5hsf1tpugwqh8gefvhxvnac9vg4z8or9vyjpv76sat5n02opidaid14002335om11z2uvpri3kdfc625zal2zsqn0huv6xkebtm8s8skp0dxtbv3zn518a5b14wejl2lskpxe92ss7fk1uob35nrlid9znllduauze72mdugbvsvto2stxl8ysedkbdh4sn80wfwy4ow2u24y4vmzo7aoflm3y8kl53lvlh2c7xp5kgxtutvvynroeoc5rurrfxmrrnfk9nu71gsfnpxj28fs5o6pr9nxk2tstoe8lqga9qfdulogir14d4aq4zgwsllecg3oml36hqd6plp04rcxc8kz0jreeb00ri81y7o5z4doj1nrnyd59372btltfj9vtqw7ar3nkenqia1n5h3xne4y4xiee3gqf2xypza0zwlq8um0qneiskh4i1d5s0g7rdcvqu713rfbb8qub7387n5lo6j6io0pnr4wvvor2tzxz60j1x6cor6kipdk3vntv9qn3ygc1dwu5j2g1kpr95ez57h00m9zhqs8lcgkun6pq1sznvz08p6n3oidujdh3ky3qr20f64kc36qgzgwm3i5iwtxrab4ea3kx5g9uppoyb03vm096i0y9vuty5ii48srsnw0ryzc802wpazqtyzv4voa709mtd4xyb9muffpg7buucee618on3uulnt1ft8kaus4xoevf9v7s761zbymu983r2bj8plkvylw7503az2lj1ooehuv2hk8ieue81633z4bb89k0rc70ubffngn09hic5pwzlv5xnybpicp07fezggwn3elx65ard29vx58877f2oyh8evv6g6cmfe9dj6cmk6fwryfjyfh6u1itnwkznh3lubbqugbollgm3d29h99zck0aiii6scjtpi833cvelj8ahxaieig62clb15z7wq3dn8xga5gw13uxarnjab7h9gj4ntxyeoduq68rwv8ve2ttmshn0khmfe0ni6',
                proxyHost: 'rxb1yygfviigpij8fm2yadkd6klky03vs1505letm440u0tvojm88o5evbtt',
                proxyPort: 6855469884,
                destination: 'l5dbixq34js4femnjzt7zi0ki5guwehkbg96wya8o96n9nf98zxajpr49ef7klrmd4ver4xazsrohbfc4ohj1gl53dh64jpqvop18evoyamqkdyulombmynnu7azz8vlxz7fm50f02y7su5w0pyt96zmudj9wafu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uyrck2b44hgfd9tw0j0mn8ihnbu9dn78kx16lsi48c34d29v2rkzvwl8xdegzss4uw7ql399zkdfavdo1tctmg7r86hau88hgnb88766fbi50q02nsivhz1gd6qss8xtja2ij9unxdelv3dwcivmb8towspqml4w',
                responsibleUserAccountName: '8lhn8vvd4gut8evtkerd',
                lastChangeUserAccount: 'nxhxhdwa8pgtvmeihab0',
                lastChangedAt: '2020-07-17 14:35:08',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/bc9efbb1-2b66-4f8a-8b60-7125694e1a40')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiCreateChannel`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        id: '556e1546-61e8-485f-b484-7e88afbc3fb8',
                        tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                        systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                        party: '5jo0fezdt0bf7hje7u80xigquclwtuck3yf5wcspmu0qd9g8h1myo9cnp38y7e5repw8ox9qnze1csp0h1zo0lupdbpxw1kmkk4nokldnm0f0eam5ogqv04yuhg1zjvk3byr4wh0iirp2761ba99ubmaivic7lmt',
                        component: '5nxff2gzxh896wmt10dki7u0wvg35ial4bsmkqd6bxs1vzt1foiomyxlfhio6f22qtulao9298zjezma8cj6e26csek2qajfkizrggk4lww7bbg52k7cay9ultz90wanwzn549nx7sy3ctkwnxukvqeqq68ck2o4',
                        name: '1cm1vugddouzxp9gpx97gtcxfrmrjs65ifjxuwo457zfflai8vuy56d42p05uyx6nvj6axelj3px5oh2le988muthobtbat9p5sddce28x3c392z1vl0r8orbsahn6gu003u1tqxvy8aj2s14uua60usnhdwb5d4',
                        flowParty: 'hjrkq7kif1gx8dj99ltusqzdp4i2zfj41av725jncau7vj7kb8w1tq613azcz5f0uh26f25obywrha0o863a2s7o1szsrn1fvwzcs9c8hcitd6yqo8dsqveuahf0sgoiv9d45vco7f0cfck4q8zb484r1z1hvdr5',
                        flowComponent: 'w32zvsf2hfl64l19eb1uor5fw54u3yfuhe580kh8qn82hrv47x0dxqh0hgrwn1k0ylwlrmuk5vhojaur8op0q1ql61qp0db3s7imdb4wm4i9u7s1fkmmlfsrxp2z6ybs8i2z0z0gy4ootpeje7f9521duyvpgu66',
                        flowInterfaceName: 'z0kfwjspaecyxr4ejgkhcvxv7506bbulxxhou1hvg8yhljl5ixtkdkzj9x4mknr8c0tdiggnd8il9upnv26606n29gbmkeueedsxsmr3eke3b913dlnk3vzlaodcvz2f73vvivor5ykf7z2k1ru8x74beqcmem5t',
                        flowInterfaceNamespace: 'o0gd35pbxi0ecqcdptdu9yblj2wongzzi5twmkh5485lab7fcm9xfad6u9taqnrvc2xi4dcfjq2yrymrruo6lsxgxpvigaic94e9mz8e8mhth0dp0e7nq1950nlie1mcdc7mi590w6jonmn45p0nigcbsnopdqo1',
                        adapterType: 'n540jiko2brmejip7eygi4a56ryt2vrp4lodiu7g7vm793hb6teusu82os2p',
                        direction: 'RECEIVER',
                        transportProtocol: 'ogeisdx06hhccalirfe21qrn36sjcporh0jqt82vrkvw9mx8ith5w2eb2re8',
                        messageProtocol: '7eld021sd55qkr7rslz0lv1hzik3x9xnpmve21b1ajzbt615jrjvoze1imx4',
                        adapterEngineName: 'u4fx2xv7jhogzkffc9yt8y9bmlpvgtfurgebyyp0orhmw23rbfr5gw96t49wc2dja8lf7madjfjjvpby6zn0xo880hbnsp8zwwgwrlqlvrdw37a4hicr0w9ahjs9a33uia2nrpijp8h572wzuwf9trsf1zecym7x',
                        url: 'mtzqs4s3i9dbz65v5wamb9sprkzdxkemfhrftnkdih0weyv7xes8v7khusapeoujcgcgs2bicoqyfci9g9v75u2qzdfznqhk12r0ywhnos5atvwqrdx2dt11fhm40nunty3tvnmvsxvitskyqnft057ltrit5trv31po2vs52nazobi8nbav920v80g5ib5675z3yf410yjcgc4tggwk4wfddqj2gnkhimv53w38rd2d7zo35h8biozcnjdwc3es91kzuqf1wacc4te1owqe6nrn8nefp4k74lkalkq7nkmkezji3dxucmticzla0etl',
                        username: '6qj95itxz7i7vxn5zkvbg5rjafwgfw6lx3e65db0nrabe5fjzmupe9ry6juw',
                        remoteHost: 'hzbr0fmi41sccuqgruitnss7ygtx2e90i341etszixs0yuqb437ssroxqa5yc6a1fyrlt628lzoiczeqjm1d4gy1dmmfnf89yq3jjiit1jsp5vbokkaiszpwxx4rbkoplozotoxmve03pej94ty0b8ibnnu1tj1p',
                        remotePort: 3541629973,
                        directory: 'vlucib98qtmgmrt553wzae4zwdf7ym9kt9rgbrgxzckepayhs1k44io9jenxurc4saez3otodswdtzitue42hs97avrckg7pfnqquyyikuaye5tnsktvjovcsdozrnihvlpuiac1ijhpjane7hbamxrbn0up612wdoltje0yra01bc58q2ek2lixd4e438s43etxwhl1mv6j8bbl7n3nnglg4r1mp0z8xwdm7ww1a7n8ze985pj65ljs6st15ad9cepm84h1dbp6p7vck4abmjm9bec8pwr1jk6y8isgiloujqalpbnff67rybfppry9xqz2desf1091brissfuf4wk55id88zb6plddkyd88bf8hl6xn0boo94ffavncoc2jm9ftmbt9podufjggjc3yfu58vor98iyntleut43s4nzgjqgw2h14kt908pjtljss65w90g1e157j1wab38f0eyksnscpi8vvgazxn7edco7nf75oazq2hpixw3ssutmxsbq1nrbzn8xdiy39xn7dyqacko2fe1vgbu6fq97ngqthx0n22vcxz9zhtusppo447huxfwncs3eey4ahe9ihlmaj5f3z4yi4hrrwzt40qc7ipus8zfp5obryjloiluugqmj94vnxn1k85v9v2v1nbi3kljxkrzyd7onageuk3kiqyuvjvgoy0qk319p1xi3bjpsvjx1jlyhtpya2596s1t7gzqpiqhr7vhtel9kwlrhy0eplxun61axys4r92vvsc2302hucruywdwlgw2rdbcm6ome8jz20oye7iyy76waa8xt9dml6vkz1dab5smylkg1gc2r19lzojogn1cr89lhyb43dwoyql29q6m52aatzz1eq4lmsaco6gchtjoghb64mm887tqkuocxmrbaybvu539bam9uxtlgkhf9u5agyg2gdegwdmznilkzw2kb3sjvg7wmatwdn5lzgddzq9w5dljw2tokk4v1evw33k7x5mb3tlou1lin1ihvj8cs',
                        fileSchema: 'df4h2olj4m75fxpmszq6k6e1zapl6gi9un8wpgdi9i5bzt35vfxbrokxyiikf47d3wt11wiv63gr4359sqmfqr39afmuh29daf24bueuqm406pua45gzuz7fwystcsy0pzrn0hj1f78h70mhott89xg4aiv7ul88822oy1fargwwzwe5btagyvbntshyghfg1evqw2xbqja1xojxcf4clzzsuj43nclzuj936k1secmtaiuac3gd1mwy0rlj0gzng63o57t0s7vzowa5qog8w0oxy5nvvm6914mpge9hkty7nshvsdjkhleddg0xo20c5tiwy8fmzfcla2x6wh0sf5ehtgkitoic95j6b9hx88qbgygkic3xhymdq9ugukcc8zgkfzq2bhoup8qjuedmck6wabqoxd3935p6glycp2suawglgdu8ixlntw47kusbrn8jybak0s8nwvo4hzbcyxlamcsmdh43repx4khhyfhutd9o96rjw3h2m0leg50wp0cqdlwfcxxnvma5dhpk2z5b1xb5mm6zmj7mubdwxvtmzvw5webz55djponfw1b3ma0zgfwon8vozpqac1evs437lytiq2nss1fazu65n280xn26j5xwue9vucpwyyamlnsikd98xi4ewt8rw13kg8yzpifvfhdi56r87l492jlq194mtx8snxwhfunm53tfsifjnggcp8sd8a2to26wx9qjhh21ur9l9r1l2v5z0uqhdd6573w8mjygv4fov8urcaoh97f2mbzuuavj13pzdzoxanrazdrkyw924s8vbgo7g4uwq77r1ad35edyxq9tqc7617c983r64xksyo69e404xfgrtk0o5hnqudzyd87lg8br9njbcb7dh07k1nxr8ur3rdid5ywychtsot68nkyf8nk24qgkql1z5kgdrlb75n2j3a0cz7dft2tp552g8lgeqmsigxmu63q03vbphkt7cbz45g3npx2faix1mu6ttjpviylvap7bydkohl2o',
                        proxyHost: 'ttswzov86efgic2q9r24h6wfdo77l48r4fjeoqk0efounx6tivjmhmxqvlq1',
                        proxyPort: 2333800599,
                        destination: '1e2inqif5mx1d04md2vh4zz0ekk0jeu09hfcm5s7n5b2ga9q6wb0foxi7gk1uu2w95ln64wj9vurlth1lpgihsaf0n35iziqegpx7mnyqouqjloqkhmdncnas1czfkswtfv155bfmqtcogwk09cdxgw4a3gv748y',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'qu8gse1n53yo73kw2nazmd14ks6g2pyfzoocil0nm5iuosaj0b2mkiu83al24rm7wxx29ne4cbiu7enzdibk4xzr0un9weis4xtgtoliwpf3fl3yrbxb2is3ml158rjgdvcjpq7hnio201wgq7c58yinqhf9ljvh',
                        responsibleUserAccountName: 'kg1axc0nyidt16j4o4h8',
                        lastChangeUserAccount: 'wkv953htyc54x15o4vno',
                        lastChangedAt: '2020-07-17 02:03:32',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '556e1546-61e8-485f-b484-7e88afbc3fb8');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannels`, () => 
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

    it(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiFindChannel`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('bc9efbb1-2b66-4f8a-8b60-7125694e1a40');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiFindChannelById`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('bc9efbb1-2b66-4f8a-8b60-7125694e1a40');
            });
    });

    it(`/GraphQL bplusItSappiGetChannels`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: 'c1a4de8a-09e1-4825-a06a-207679f08516',
                        tenantId: 'e0332cd3-cdbf-4fe1-8297-c3e8818732c1',
                        systemId: '8515af94-7294-4399-be93-9114c9e20c34',
                        party: '690qfce8ivmg6vc90f0u67pif70e6rm8ri7rzefdefndm62qg12vajw2rafi1aks65lkgdhuow742tap3jpbfcgkvzgvamhti40netrvjnokzxt49gwcwckjdz73gh7r0je3lpmqaixjqe2qqv4a6he2ewjzgl0n',
                        component: 'rlejf178z0ryruz5kvehrhwgicm7qo1j8ic4ifjyy5ngjspc1t5gxt3n750nzdgy49eiz7nn3cjzxudgeieec0ltb7weus7efev4q0l7nqle0tnkj1mcwueigqsmbbddecybpfybker6wzs6x9jgh0t47i3ja1mn',
                        name: 'fq1zkwzy4syr5c9xfq52zfsuk0ig1vjq509bu2mvhqqdgbhnfxycjnj1qnjuvg6pno2caffcwsegdq3xbjixm3iwv77s6t0jj2gomucozh4nly062x8o5mw4ln462p51jmzje6srt85wtde1a3tq7dpaquzwsh66',
                        flowParty: 'aajjeuyqu1rqnewvokug1484auzharpknpz8637ip8yj1am635ftzdwuz60zqljevzs2c7c5wyo89ygjofa1pocsqkpk7cpujud4clekgrubsn3kfpapi0b1c0g7q5lpcgeo6dgc41udwj8nur7y5xsswf0dj6mw',
                        flowComponent: '2aw8ce7gogaksuddj36f6tpf6imsbihlu19dizqmd5kudlrhgosg8pk6utxxm7ov2sqt48xsguh9risjyvkvysqr4dmrjgc9s4atlrk01gz4az8sra8s5ft8zn0qj9wggm0eco35ddarvber4toim9prxz7wk5lj',
                        flowInterfaceName: 'llhhhd6lwwy471q79cignb1pk4u3qjf62eobwtenp9a7kpwqu874cd0df13s4pjyorppaqeqsjnevcc6yveh9fb95wz8tuz2prsqnjvukxgf3gi8vmew2jcjblr1xezjgc4ewit6vz24l6hdrcx13x5bphpja0mr',
                        flowInterfaceNamespace: '784cf5845q7kkovb95qdxbaozjmimk8ehwp5b666bz6k1hclbwvtklhrzfj6tbgcb15g99jo6spna5xnzlc399oqjk94yn04hsfo5m0spf8yl269cqovoimxmqzz1hr5l80rng8xthyrivny8wyo417289ukdkun',
                        adapterType: '2kl41ez28v1k656ja00d0q3sbhhxpve8b435o419bsomli4v1tvmir5wqnd0',
                        direction: 'RECEIVER',
                        transportProtocol: 'pyq5av1wc2e8jlxifdbw3wnb6uvq5den4d2adzpn41inp108yq6blll9m2o3',
                        messageProtocol: '2ef9ldwrkyt6145zade65l6od5kbgdhm9mgpyz85czcqas7bwkscklt9cnug',
                        adapterEngineName: '0w5r92pa84uyqxoxg09ht70awntrisqb7k0ecv16w2sy0xjly8v3hdah9mx3pfx2339g7po2o1eekvntrs2077zr8bjisbrczj938412fq3uohdwq4jsaa6vk6sbg5czxk3ubony21o5ual8ts7vz8k75oiqo3sp',
                        url: 'q792zupxhsytq1upr0bw0wp2csifz7rzk07n1yuyi5tb4xqeuz3bed0dccauk11ydd61lbuulzzklram4aq3vvsnoamu6l93gd2xmsg6gesnzhb395gupnbubjg6ghqn9ajwsauyuhbov2aee6noap6zqqjmv46vvmhxv3ohp27c5vwcp629a43u8ugdxw7ylqsc4awzzzsa2rppbyrzjfi9iis9x5cikomxisov0bhcqq0e48b5bqgpc2nrxyy3f3xivn9qmsxhc1qykxgdnjetp73mxs35zmhk1qs6mkj77zney7jqvva9a8bulu78',
                        username: 'v11umo9s8g4ohq3uy0ry15erjrcz3qw7we9d55b3nghj71o4ck14meaxkh7e',
                        remoteHost: 'iljguo03dlj79xg978vb4crkxi5gpq52fhp7611nqbs6dbsnixngcctvyvs1urppsruh80qsqlojrgibs7s3snzn1nynbu9p5khemi9nfpyudf014rm3f5c7zu0bt7cv15tqw5o07q5n65apljik0eh0r2g1yqey',
                        remotePort: 6131775919,
                        directory: 'i8aizquix9cpnddg0zpyvji8yth50q09kps8dml8eup0wa4nr77drf06pxuld1vboizfv6pr2kqcq79u6gz2ri2lymgbbhfk0mcu26x7mmulhbe6tq7cabcu68qj2gwmyiitbbm156twm92jidjmjfhbwa3lxudwq7g0tq38r98hq379fa21sbsggkdes4ywyaiwwdyvlj8l6rvln4a7wx8e3vq08vrtok8b8bh3hyrc51zqjsiqokxrt6rlihhrsc4bx0og1i0xcoo70nz9rk9dj6xk5kx2qk5ozrqx6ia4efji5xzjasduq8e4kp4q2wu4x7flt5m40ddqx70sw0eldvae0o1ldszex9t9byjpufhgpgzsfczpbff70uml4htd0kktgmwrjr940q6b2h7bvy7xifeiyygkg9vbvi486y3tkt71it9ge4b8sb8bdgjsgvhb6wzxrzsem3cqwn9pnjfrdb9sjbmhw09nkf6v00he4116ng63rqgotynw6x2d6n9ui4pnalkbap1rvuir9fx7ooz6f44gfsk52nnx5jdrkyx400ob5jyk2ir8fjkm79tqw8wyka02vfngego4wqj4bumdtma41j9qn7lv3ynkag14rmnwp6k61a9jnhvxdmf5pjxknupo9icsi0syypsd6zq6lm9uealfddij388ifxdkkc9z9nif1xpxgfzjvs8hutdbjstuzgthy3ipj4hszlmagcbfo0apansk80e5h5q7w3x578n832vi9ssmizxnenphi6thj8lj1me219k24sgh3vsyi44h99irmga1nhz5lbupqu5ousaqwsskf7ysxthyujfpt3aq3j9a5cfc3zc0gdeehqefzhu81l1lu2b6o3sd4dh9ox0uxox8t1miz0xr3elddg0fh3nt43tlm9lshzqlntkhaeygr0td6ef15io34nx0uxvw1eltqdatohg7vqa52br5r6fj9dd9ekh4b1u6x6s2ggfnuwo34zv4z3atmkghqfna',
                        fileSchema: 'u2iodvm5fygvczvphld60ngh6di3c8twhak7kvwym5zffunpantt4tgzb3fc7d8r54l2aauameokrcrs120e0i3wo18yfch13fv7q5f8wzx73bndzotwsjtn29a66r7l0oeg7p865qglviunw967tgadkajk2fvgco3p9lp1vkyfipnfj0x486h59vpl9loj1ls38w64zl6uyvag73qxci9mbpymxlzqxh2wyj4btuedvoibeh4pvchqoqm1mjd89jacrou9u8k0p80ypepl9176weigltmt7p3jdkupec0kw9gmk77q7vdou90i574sw8woic0q7ti92mzclzijthu45ds34yu76yqheo0ltn9s86tij98z9ybjn7nebi4l68kiaxtxoz6f9z2qtxhw8bjynis15drvzfmoj7gx86py9ywvksz1hfdbeblptvtn1w515987intgcr3k1x1qnc3ll3uiv8jtwrwyh0d8eecb0cm4kr3o3f8u0rctlp70ju6qmr4v0t1e1bczyses8f44aqflsxtc1uglewauhtvkygfvmd4hppc9ulnn7rctnzzautgrjvlpjnw45enaz2ztabosdkxd4eyhsk2lbogjhq2v8oaokvcye4xpl9w5x5t07h0chyz3c4j3x6m70n3u4f1dnptfw17ehc89at5bgab7h6qbmzk2ffud1br4ttlhwei6rjh99usjv5y8cr1a1ahxfs507jjmbeekwg7oc8vyes586ie5pds1r8nstx8f0cm2no8i6hpr7v7insav8v1gmqbco73w5o0fy3j66x6ujg40kv2vf4uxene5spnjiybjxco7428jjjbhnnv6vhf601df9mryci6box34pdnz0mp6861cx1izp083tc5xjjzl6i3r32tz23ofx4fgj2bg899clpinr3gyjswgkv0m04ifq6uwh6p3zshudrdf6nzt54qyac7hgnbyc4xxjnhadec5mby8vvchia8d5u785chyanx9suorjvfv',
                        proxyHost: 's2iaf41n7atkm9spfbikucbqcbcq4ssizyje7tv2pb2gx11jlliu8l1tn86y',
                        proxyPort: 3328479505,
                        destination: 'tqh6tk6b8msva1qduds050frlh2pwsjhbqufto8fbqon8xxzqyfvghsnajcuxlcpoqljzl8y0cdkbhjwoo02uiobh6b5wyg17dhhxmulph3yzrf88qp6cobw1dip0qi6u7eunl26sf9tkuaseh8whbahtq2hf7mw',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '67pu92l8j9g46hgrbvncvz5ivq3yhm2rc46tiam860g4vq0e4ngx9boou2lx1ctpie9e707nu2ipvakw4ju31egmyo74n6e257arqdz0haanjmyu3cb1a6a5pxn6oo37f1llpzdqv5d9ggveoz6wq1omwbnuqa1j',
                        responsibleUserAccountName: '10q05yh47ph7vfsfgdfv',
                        lastChangeUserAccount: '5o8efycad7s4gqgjm2nv',
                        lastChangedAt: '2020-07-17 07:44:14',
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

    it(`/GraphQL bplusItSappiUpdateChannel`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
                        tenantId: '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
                        systemId: 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
                        party: 'oxz2twdlny65pjty2biecbucxg7mxp3l3ijd5mn53ycv6wdt211obnjz76c85gqy407mpg26jyqptgrkgwazn24zu5iow5sg41gaa5oq6dx84vxnm0ey14r5k7ioymd4hmt9az7idk7eavmtk9rci0yhyb4w3qbv',
                        component: 'cz97ttfd6l2c2f0j0zvfzzplq2zcheevdre9cdqkjzmh7p5sb1y31n1yv4h9t7kn8xrpycz1kdbx2effrhy4jep7bu4j8uvnkpw5f86y5bj1c7dhtkshgolr0waccotqlrhvj0cvwd4crzn9mjvd9herde5x5e9q',
                        name: '99bs9yffzjadqwhsueh2hn3dkd2w7tzaixr9c5a81apod58ihnj5cf4opl30pqyt87glrz6oudvkiv9qmgr13pulal2mbzcwblph3wilbcb0r4v1y3xw5gkalr11jcuud2swmszhss7oqy9px5jua12gwdeycauw',
                        flowParty: 'x90qkbb10nrjdn0pvg37ue48zqa1u3oww8yd8esf1pr2jqyrgodlvos86md3ec8m03yl2fh1pmg8mcjd1nwgil8erp90174yxoabf5p5budclqyvmp7snh2tuugpi6se5xgorhn1k4cg2e4n74qmlskvh4fhuust',
                        flowComponent: 'd3nrf01kya0ro59c9a5c83ejx3c8oekb3bhv7ml2dxzfv3m0equwr5a6u6jy529gn3ofek50s0zxvb9ugy7zn4t8hda1p7ykhzpfk2e3vxp3inm11edhpoa0ydcpz8uajcz32rcyrexzm3z37p3c3kjxve4v190r',
                        flowInterfaceName: 'n9qlzykci95sfdrtut6he9slouou0a9r9s0y5e003imnkrqt0agk91xcbqepxf6ccuvxdu8vw7wpqhw524de68pt1heqflgnirzbyx2prner1nqr1f0owwkgb2xi3v582heaszk4zq29sub0wrkk8dfuwapejdkc',
                        flowInterfaceNamespace: 'gwo50ae4v7i87tful9xld38spezysv20jhtmscwfbd22ojjbj0ir9gx782rf9a1igqr978q98q3hwfirpy8cr1ods34x806l6mv5japnn4or8pcr1ymzlgxgeicy3pdb2g7su1p9racxh5l42ckiziy79kc1f0yx',
                        adapterType: 'p17svh7xmnpp60c3nksana97phuqdoc3c6deh9f17dqn4dlfyhnxa4ntsk6k',
                        direction: 'RECEIVER',
                        transportProtocol: '0m2q5n5u5978iqyufsgvayf8xjrnlj594nc5fpyw0421zb3of06aazcrj74q',
                        messageProtocol: 'o112m0xnszszk9e4vxn8xqnlqt7vhvrzwa8xsag92yk1kv22cjriohhputnj',
                        adapterEngineName: '1zy82ddprpi55sr86bcmv6zbvy5h08xpzdtaj8vnj6njt96xq3ue3zhedzdtr5ga21ioxw4os57k9sfqtu3e1dp4cnsk1kow0ugy8rdwfkmmxnc96xu5wczsjmrzrsyz8ern7xmjxygy8xhj21h5dz8tte2h6yv5',
                        url: '7mvidcvop7wa8nbuvuap9gcuyrted8aibf3h6pqifggyrmyjwf23gqzs7gruglvh2dvwby2fh78hu2fhv0pctfx6ho543y1re6olzjjv32iz4z208whq41lsngqtb68704mjuqydg2uyk4yhehgoq7vzy4wc3z0qyn09p8suoywxe8bzd6ml89vuqj4ixez2h6mwjiotlp91rf9br0uhbcho9e91n2jdix6jsml20fhozuptcpht3tqdw1yn1d5jxmrlm7cb6obunb9nw5i016p9zzvzzbljztvhyw90m8fv0h3326b1jiscy1cxopeu',
                        username: 'os8h9san3v6swgg54alee2dyh4bkfubphfcejsqiughmzpsmpiym3l60si5m',
                        remoteHost: 'ge6zcltlremc3t4nod1gfhmrenqr4dg30f3y43u9mx2awibm4bghl077ima297kqoyn89pirvhubiipw1cmsdgkozra7a54muw0lvrvq6crbuwpsog14qtlqd9aqfiqbsblzvi0357xmli477ow17czwr464u49w',
                        remotePort: 9700751013,
                        directory: 'uatubekg3lboaah4h9q5xslpl1xjksscs33lk7hsikie4xv7ju6t26eo6p8ytw5gtw697n55piaher8o7rw80r1j2ysgcqxksghay729810fydmnjr9he9lnb6h0dc63bzrxyqz5sssbu6sfj7nn4ipw8ijm6h7w8wdg3q68y31oaib3bqp2p7hlmzxs1c77gbnrnik9rbxncqx86ndoe2d5wegstjpi7axdkmhgujs16e6zbf6xvo8giyyy5ljsyz203z715mjb9kqpeoi1wc1skdxor6moc6zlbtlchh49p9jmh8vyxqcubwp06fqi5q7lkomzzn451vrdrpe26s83u03yctzaxb7yps06rcz3wrcc6sawpom2gntti4cy9uqyegbhtsxtziof0szbou2yajr8au39woqs4wx6ixipf4fp5j8ud1ylonwh3pgz2eir89312ljftiwenzrpadq01gjj39tf17joxlo6m11eu83vs27nc1u9hysroj6v50tfs4ki1dr73oaozgzk7yubtl4p9q7j52211ff3qkhlib0vnh03ubn9fc49lkn1nvc8bghujyjtbhhs1xdmts2ok10t9iy8iw58492suvrxoqx7hdaz5agyu84nhdp01b073nu7bey995pog0cen0k7hcabfzcocz817qnwmn9k4lwgnsaz0zavwdfqitija51zx8dnftrordqmab6dkadntrjmemye4u85tvf3ce8en7a8kf722uyascasnd0pus95lf8qz28ofst6mty9bo6odbieoe9dgt2gimishp2mq5ilhyklyznwzd542smm9juh0t40cb4lxs995pyq5tlby9rbxwq6ps5cfqtzwje7ls57bswvifzrpobrdt0v4zckj7752k77au4kw5in9flqyb0a0leu06ooupqaow46cnu8rqajuh39de2vlye35p3dll8vqeagx9tr7ozes0s2546v3b1gorw2umxq5l4onzs7v3y9j2h43ct7mqck',
                        fileSchema: '5dje404nwkc8jcgxq4ps9konvaxrq6ge74l3t58obufgfpw21srjss57bjdk5o5giog3kp33cx6rufhlh8c82i6fhlz7kletgvhadipg0psglp6qckt7jawy16gwzg3k5fvpmoxzxbez1o22e8h5265flg4pptzdpaghjre9k3e74wyqcj5j4yxjz369daylyk728r9rderfhaktn2p5a0rbo6y83antcpf1c32slly846srhyheanwrshw9orse5wgy3nqqp69ao9kgosnemawmrxoh0mw9nxazi0i380l4c5r67x2bw2nfhj51w51l95zyvug69yfkyt7gm7ibsmp56pmqemwka9tlcp0ec7sz8bkcximcs0v8jtd286n4thxn0vxodod5l594xxo5lekt8o2nt4kxqzi5rpg2ifawf1uwkqli3fqwuxfmy3pyzsrscm1meldgwsx0ibiuglq6zgmsa38cbbhzl636i3dezywxu71ins3wytyeqo5hk9jnjib3n7f8ypqvqeaed3w34g2ne3oya6nuqpqdlcbun263pvzgozkhyq3xqkc99lx2wa6brl2fajmg7vpn1xpiex7z1kotccbm7wuor3vpxwxeqzokn3x7wfvo9bgxhrtrf84ifhs56fc75wuo5jks8kngsoxsd3x9ae3aczhgiyujyl8w2xdj9iz4ok5w9rafnddq2dgexvusrx8h2otx09pgyhy1jyf9xf34vh3v48l94g2r4op4uxmvtzeby05j9xlob038jmmfes2bkpm405n7k6243od2iasrt1pga3lukmgb22u1z1zt29vilzqbl1q14ru2yk05myfijps5asgfel7vz6q5ak2ugq6fghsox8n1tfomykj77pmhtolkneri6uq6d6jpsd40d8ocnqolay9ci9qyknjam3r91r4meefp1mxbzutaa7aru2m8x55ps4mmiik8q0amao6zbu9ycd6plqpbwj1pbfsq9k56v3mwgn06geemcjdh',
                        proxyHost: 'evmorxu3nk6bl7il1v48b3wf1fpv5k9b40ih00ptxbkw7pilapydhc1dfdue',
                        proxyPort: 4814253994,
                        destination: '3aacb9h2rp2erfubjp8uzubp2chxsygcwwv63su4408fi0zx2awek5efrnf0a6grxhopvnhi3lkbts5ay8nqcy1ui560u7nlcyomkob79o2l751fipgd7ycrywd1yjxk454cv6ds7uka7gzeo053y3b3m3ic66q9',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'wklkyf6zefdh1tq419q0deb6w9efk61gffgzunwi6h8nddd9jax3kl05lr67im6lzoyh4b07fjkypcprpb1g41wpswkl9samzn9tz24g0ein8v99ino9abhz7t4804r1lce8w9elgamyluulh2k28hnkybthb3mb',
                        responsibleUserAccountName: 'vpz9i9c3t693c3zlioj7',
                        lastChangeUserAccount: 's0moc0riom8qtka6elvc',
                        lastChangedAt: '2020-07-17 14:54:32',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('bc9efbb1-2b66-4f8a-8b60-7125694e1a40');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiDeleteChannelById`, () => 
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
                            systemId
                            party
                            component
                            name
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('bc9efbb1-2b66-4f8a-8b60-7125694e1a40');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});