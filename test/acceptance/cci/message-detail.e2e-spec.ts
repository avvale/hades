import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'fuo598bj434hqu3fcey6x6gqju79kv2886933nj953ouj5ftnr',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'taki9cfgrl54cu40al16',
                scenario: 'aypmlb9jif2ojocr58br1eb7hpd7jo9o6gyotdcmnns2z5y9uock6s4zir0r',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 09:50:31',
                executionMonitoringStartAt: '2020-10-22 12:14:44',
                executionMonitoringEndAt: '2020-10-23 08:31:09',
                flowHash: '4e32jeh4059w2u2gusa6z8mo2f0fjn4oxrura7q1',
                flowParty: 't8zedanhh8ewlzean27mqf6oxg4vg2bbhkg99g9hmv81z5244trkbw11svt30p63e8my7ngplbvktlvrfoi91pircipc5qhby6em5tsd7s41ms9qlko1ks6xedvctlozusi6wge9be1sxfr70xqbu5jozdhbnae8',
                flowReceiverParty: 'pku8uzxpzv3p58xpf2r1ogepkgg9a6l6z9myc6m0nd0j0mxu0zt7x92vfv8hai9a6mhke5pkhcpuourg2b9vr2in5r0jql3rj2rcj8yylnuzupcqeryylojadiqodhhsdn5xh5qxt32qjg5zlflz4oe4154hlfjf',
                flowComponent: '7eupr6hjonfmo1dqkgribtcikulvy84m0bzq4prh7clf8a9v8k8a9bfatrmhau71gwcdn674m9a25fd1qck0fi3oaaqe809afzelasplrvcsvr0my87jvv3dpqupf8j0kng8qpcximoby9vog3sndggnsyai2ety',
                flowReceiverComponent: 'nw4mu7ixa1uerrbtl6va4kk1k0k9qg3ig2kkm9eret0sssd7rdezh0ddnrydg194uywa5565uyc5z52jefpe9l5jy69h12qnadg6puy947vm6znxadhturl546b9orj8y5mmz221yz4tn8yqa4xg13dl1ya5y2ru',
                flowInterfaceName: 'iskv85y63qaot1pbo0c85cubfojl32slv9yh30t0150niujtghe8qo7ztcsua2f8ptf6eq1jf1zlycrac5bm6p9qwhc91nokps4yc9ta4893s7povxdijhv0n2bfnwa1nms0s1qa519te3g1nnwhlt6wikfj4q94',
                flowInterfaceNamespace: '0ocy2gy4vvxpjiilj6rb3yp8wtud4ohgi5uliu4pivs6966mcw7vhz26fgkcsc0rlh0rlexfdk4fuot300w4ap7s45zjhbk9bjj47ysmz5t5f21sucruouoj1g6v2kng754noqib4pcg7qbmxcqiec2g41h6vlo6',
                status: 'WAITING',
                refMessageId: 'jqf8g53yrjfth3fmxjp28mhqznihblefemgppi9ypz2rhoh7gzf8mm5qdxxxi13ypyai6pk89np0sdheimzo52yahb44ydklx22ubgg2ycbvvzyoqq7m1r6b9g81te48jzh6tgjwqatr3g8jk5suw3ije4la0ic3',
                detail: 'Quia molestiae reiciendis sed maiores iste sint ea animi dolore. Quisquam debitis dolorum facere tempora neque dolores sed pariatur. Rerum eligendi mollitia dolor velit. Libero aut deserunt nam optio cumque esse dolores nobis est. Rerum eaque sint sed rem exercitationem.',
                example: 'kcmwmto07aa0vm952m3pnbbwbeed16dneb7uoo66z3htpkrcjwfml8gnh27cx7x44k2r52w1l0dg9hdf76bydsq0cygl8i8i1uybi9bffynur7gemk1cb48gl53dppzqhck2bftwh3vm6j99pw1swxbaexru2pmf',
                startTimeAt: '2020-10-23 05:02:51',
                direction: 'INBOUND',
                errorCategory: 'j3mm2paysmc7r0han1nhjls4cp7uiqlg9mtt8f7e1628koqwo0zwwls3fhcqiqcaoyhssbecghe8lr9vtu2ie0xzbychjn24h60k9bfzo9cavpj92z15yixhonqv02st27ipg0y55pn84mvvvcf4vcjza5pw1m8n',
                errorCode: 'tkbjkpl3bm6u6h62soudpcdvpukppzj7llmx88qo38nmaguwfi',
                errorLabel: 730075,
                node: 3826581533,
                protocol: '7bx24mzz0vt508rudqhn',
                qualityOfService: 'wcf09ip5xr1oes9x78dx',
                receiverParty: 'i35vufqn8c87kcgdvfy8m4qc5c167rqd6zrq4m0b99t0hwdne7s9o5768exyna2y7l48pl8yq06tstdwv1ah4qy8mblyyfsqmm8559d9obbjoy22qw0u8i8sxen67ah85pbxgn4i2sjc15r2ia32fuyrxc6vpd3t',
                receiverComponent: 'ok31gz6p2pvm0j9nq6vrkwskx6dxpvkiyrrmk0dta6fq5x2i1zpc5n8x8grbcquvsocsamvjive8b2nlzs1t390p188ah3l8w2o68k6872jo8fiztcoqs7htqaqq29uumspwouwid3llfctwleunjfrb8rsw2nr3',
                receiverInterface: '1n1l70m2fd4ahsiorj67cqolkfto94kvd4mjfwjxgitsg3puhaju8mmj5n5doomgob0z2rqyonhzoa835huubykofyyds742vm7nq4j5s3ab1eg486gbcns3g3hgh0eafeovmi31rkj48ln2gmf26976estvp33e',
                receiverInterfaceNamespace: 'hll9omq6nmv8vqzq5yer0m5gc6rs6j90aflhk9im9gvfegx6q9koyt78usqmog5g5juihhjasv599nezdfz0x7iqzlmr6trvbnguw7xn0d10x7rp8fepq83d8cx4rvkg3362gj1mert96wmvfnasygyk0ee2z477',
                retries: 5968849524,
                size: 6198355290,
                timesFailed: 6656391226,
                numberMax: 4046982356,
                numberDays: 3624252634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'nsmft7zdro6l21mirgv8ael4i2nrkkcmxqerm7y1jrxamgwfi3',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'ngikh9qsqz5c03ajq882',
                scenario: 'amnowqp260ec4ss09fu49itqmrbp3kehqyzxol0r96scj7kyqepk3de5olaq',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 01:36:19',
                executionMonitoringStartAt: '2020-10-22 12:51:35',
                executionMonitoringEndAt: '2020-10-22 18:28:14',
                flowHash: 'q0m3clk9l78f4cn2suzveqnlwvu1e97za7ly9sbd',
                flowParty: 'mv3gj5l8yv5t4z7ah6ujhj3zrrm2so4eejrwixt3ba0cs5hrsa1x9aqnqoyx44onsvorq4drwhcpt7rbq4fnbj1g3klne85bxxw9ancbad80jfb6fwe6twt8lh0d10p1f3axh6b7n4hxoxxgn0ae4ee4vop7p6em',
                flowReceiverParty: 'nocnkl055l1ke96ge9vcocg4k9pgxq50jvq6r0i9a4kf8xe4a8gzwhlbsmfp6kyzkglci7zp9dgi4y7mpk10zlsj52fexbh80xuck702uhquqpl5qv8pcknoslz3xjpmxodz7b6ng7srno90s1esg6y46d8j6h97',
                flowComponent: '01q3dnzb6o2zdhbw5tv443tc968b1pgetm9950j34ll9rdihh1r4sxvq0v4f9rfgp0jpegob9wim81mf8tn83v2iievoks8cfjd87jnnwkimjdt8cdf2czf9nocck57yl0phi0xclpy5u21ptttnh0flscj74d9z',
                flowReceiverComponent: 'kex3oq9wsvs04a2w9di0doocogjh277zgr3tcrm0xc3qrdavquzhj5n6beffy0a448b0iem99eyp73k940y36yx9j73syl341o2u6jgbyr1cs16o41zm3mlogm4tcrklsgd6dooyytqa0wdjwnop8byiwp08w2q0',
                flowInterfaceName: 'dlvav30o788rp9g8b1va8mpcdjgxmat4rkgynhjni6rwb2vm66k0xct337f1cqu9twps56vxy5h2uuj1a9isbbd7dgi6i6e9gdxmseps3iig80l4pizsnrpx9p0icchk62m1n0os5war0geuv2x12hp47dmm0e9y',
                flowInterfaceNamespace: '2oddmo7bm2qnr6q8wziy3fk4pkkknt3mh0dkzm7whc6bemq7loai5yari9lnh4e9hfi9sj8lm0hyp9q0vaomycmbe9cj3lvw84e3on6xh9hrcth4fyefo8n4ubfn2mindzgs1rl5qttv6s5z7czewi6sj6jryfol',
                status: 'WAITING',
                refMessageId: 'hdzhrppwnvc6ofmlf54s4ilmrlqfdvovv9x1g0jqhquk0xk5fye7yth2lv4n7i2w93ux3fmcuwzq0bxqvf2kef3lm2t1gfho4a2iratr2lz42rccftvxe857yppahwuctx6mpbamtq4izmtdordif8wsasjseyzl',
                detail: 'Placeat voluptas consequatur architecto vero minima harum. Molestiae sed ut ut quidem et porro. Similique et aliquam distinctio deserunt quia vero reiciendis. Delectus quibusdam cum pariatur molestias quam corrupti dolorum. Magnam natus quisquam in. Et ex sequi animi incidunt cupiditate aspernatur.',
                example: 'iso1tmjzl4xraqf34lig0d2w9xwgj21lcsa9f7ebi7ffpm289s3jtixz4u9ye1bwae4zyylqci4vuj1ikzz30sggsxoy1q0sdj5mwei1j3g9z4d3fq2ek5bakdsdquectxu6vk1l91ilu92rks8yqjmtwolq9b2z',
                startTimeAt: '2020-10-23 05:44:32',
                direction: 'OUTBOUND',
                errorCategory: 'xin1f18o44ksyhmdhd899e9592i5miuf8odewjqh86a5njn5plt2ynzkwvlc1m5oulv4885m4w8nyjpvapekhcnhe4o4gqtw5023he7gu7znnpx2k48dm0iz9myvw6sieufu235jeb7hhprec1wtmmyamf1kj5jl',
                errorCode: '8nbnz1vin4dd1pc9ayh1k1iab6uo1cvaraufjyxydr546zu82z',
                errorLabel: 854275,
                node: 5826183336,
                protocol: '6xmpgt6pr27ny7jrf4g6',
                qualityOfService: 'rffkvb73tg3rpewt9wwc',
                receiverParty: '1lg7xbjhg8mmbrkdz40dqazijbld9468py17j2aq5h5trjcn6ibep22kkpmspwlv3woj0o1k5kbjssziqvbkzb7txif1gfmq5on7zdla0r2oz2u5vf758zzpfkhd9b0q2a01ce07r72r93heilv351mjkbjqtqu2',
                receiverComponent: 'dk2fsivdsibcm4j0i8zcik163zn8aw5138pu907hmjeqe72yfwqxyixpz0vi8rhzs0j5f3jjh34ex3br454jyxhaga7nccz9y9zpun99vl7was8jqt2lsuspecopi9a0we6xvg74uzzxn2i6xvs2oamod774tbff',
                receiverInterface: 'mn4vlav0m3thhpe4f0qbweeujbd1fqv1kcs22a71x5plrb5upe48am1uh9ez9hsdgknjc4ue7ywe3zyamwkq87zjy02kqdm4ce1ptvf2cujeunv3tosj48yk10gv61fp1gfq2dmz4b6flbu63443r14yihojh44z',
                receiverInterfaceNamespace: '18rskexfnvoohel7lfm0gvut4ncxvtun0lcce4gcifgvmlyte95pphzqlceee729gi7otwwbrp295caofgebnpv6srnws174wcqng9uwfu26q76pfyyuy6s1jzq0ug96r175z8oyk2rewe03pv44j8gyzk5hb0u8',
                retries: 2372677832,
                size: 8421715784,
                timesFailed: 2183174790,
                numberMax: 4928933684,
                numberDays: 2100785357,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: null,
                tenantCode: 'k5tg99znu43o56rkzm4rskih3qe53ri2iztckjrnkej0r4u20c',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 's399trnkjmtcpywp35yz',
                scenario: 'sipg41yu8or9fv5ykju50o31iw4hnb510nm87x0agwe1o8u7dw61dhuol6mc',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 17:47:08',
                executionMonitoringStartAt: '2020-10-23 08:30:47',
                executionMonitoringEndAt: '2020-10-22 20:43:15',
                flowHash: 'zs8zryb66zhgjs3vxg1pmybxzt9wev5q22g42pnm',
                flowParty: '8egm4xgp7gyl41zrmdn04eedagu6niktur5kp3uvewzxo28vusywyh5xysaf2gmn8vzfrc98uqh3ao6dhi2ymagmlyu5qofrw3vd0a5yfbi5x9mlf1g7rw9a83uf1ops8qqke7j5ipqml8ht5iiup94qeqjt2hwb',
                flowReceiverParty: 'f6g2makskbdpe4gafwemacz9iqszhdcfep4tihih8wdn8gsldkaj1iiw3zfm1zzz6usr6dhqr7ej2mxpq9uzzjw0t3pfsvppslxuyy73eix5udy71nz7a21be11yt94atmm6f0ijbntifwzx2q1s3azc6ojry33b',
                flowComponent: 'a2xalloyrjn18w9m9zng0vxqq4l7id75jmggdi30q8qywzgtux6wg5itiu10w8hfzpqbpscxdzrytdm62advissqu1pbysp8utezbb5wy5pekevc8awfb35zff62il7r4282wz7z6ymh1346515ozubbkkg13xqi',
                flowReceiverComponent: 'ctqtkp9ztxun4n3j87ttwbiohppkvukrndoojbomg9yem5ttzcqrb1dyoncbaazve1f18tpad4e5y02cooybgb0be5jmvu6wm00wasbizjcpubwmpgtbc8i6ix1teaudfzfd13bij17rr276gloct4chefeui6jp',
                flowInterfaceName: 'iv903dxmpt8k2sfdyfroyiszym2exm3pu3isdckgqhnrdcian7ciw8r1esbtvdwyhvlfypm89brcx2s59n4ansxkwk91spuwb2d4eq9hg3p3fk8grjq4ea0661z41ikdms0unrc6myvgctgh7shj8rdr0652gsgx',
                flowInterfaceNamespace: 'z4asv2d3ibngr4lofpu2np62wvi08c89vcqfs9hydzx6iuizjx7crbt6wmnqkzzlucbbdgvrm3lc7ed24mdj76gbbuaibkirs3hs0smuunp8zl8u9otgmdyob9f0t7kwzpufex9gv42ptljdr6q6mf5vosahtid9',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'j5vcctxf4nq6t8bqbhlyypnclp0m9n1mdtaw1ppcpqrbwketdaje16tchdv91lw4in3n1lw6w79lqpbu7qjyh35gjbv1y58ky1fc2n2sd6uvq4xj6i9dd8lyutzlqxci3ca040gwgmcihkrhl0lwiumg2oykrzp3',
                detail: 'Nam voluptas adipisci. Nesciunt odit placeat sed et quia minima vitae. Repellendus harum officiis nisi nihil ratione reiciendis quam.',
                example: '2mjij096ukw3p8raxjn6jhow3160u9takfooxlwlanmf84cmpoubriukh29aar59nreufgtcx689t8c04wy7kfzfsknuhz1vow9l4qirs3r1nkdluhkwkuf9sig5r7weap7lvbvlhyel6s6l3cxy3ussj2b37dpy',
                startTimeAt: '2020-10-22 12:26:44',
                direction: 'INBOUND',
                errorCategory: 'm5ts56y3h2dr7c3be1za8yxg9v2cbqmyj46ylynfm724rjgh7d00n6plhagox3j6dflfr253qgmkl9yxe62djqpv64p8igd8dero5eqnz4togrikehon8y2u2ypiqrewr5g59di8mgds857yii14l3jdj3rwwr1l',
                errorCode: '3g8dxli7hgxf51r73qgcq2qg2zw9qrm81wkdashx7vs1glyia3',
                errorLabel: 836162,
                node: 2520690877,
                protocol: 'a6wbnxsgrtq9myzaa19c',
                qualityOfService: '83tp6fkpzhtfp7ylz01j',
                receiverParty: 'hxoc7qeqs7wisj11tgm1237q790qzm94e5mx6f64zh0kdsdjxd1z919hjdzumkaap22yvfljnohs8g8dfdum1eds52ymm6l0ovf8jrssjgtvl3h3ohrgqdx0718klk7amchd7fcpxrbtk0gka6xl2yh0hvt19yn6',
                receiverComponent: 'tm8xe8o9zgkp5zbf74khbvh9p22alcjtzvv759u6wx8pb93v8tk4afc77qnt0d07i8ga8ou4fz380f2qkvsef9gv7v8zv85m65tq7jfk722pdat3y8ao31my4r7ggku39kqzcbltrjmz3xqtyky52fnburzjcud9',
                receiverInterface: 'vdakhaa4qjo14ypgi1hm9omif692j4nmcm7ssutizpcxd9n0p6cmeh8husungb50ai7ofscinc6n1px4217w75mpq4kivgrch4mml2s9hcmni04ck1v2cb2glzy1nluuvd5pwq8gmd10mwx6zlayq2qku774p72r',
                receiverInterfaceNamespace: '7qwxshgx0pi6icnxhmx3yfi6dkplsknzduytrqpjugacg60yrrfs0izd56lxrgahsjjn6m5t95rwvf864jw0zbsnumn4m2k4grvqsix37zu7mbty146myoid0z11m9m4duzd2rgz4a7zpbhjzktcc9rx73b8nun3',
                retries: 5339227860,
                size: 6464064019,
                timesFailed: 8464140515,
                numberMax: 2387247522,
                numberDays: 2247557440,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                
                tenantCode: 'qclwpl4q3hty6mbdyyuixt3gv2xny1hxyy76icekhxey2k90j4',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'pd84q365l6l8h3zlbwb9',
                scenario: 'gbfbpujpzl2pj5373v07rwctmm3rbvjchpgxmy81cpk1enncslol01r9cznp',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:14:16',
                executionMonitoringStartAt: '2020-10-23 08:52:15',
                executionMonitoringEndAt: '2020-10-22 19:57:47',
                flowHash: '4jubgveil0q5t38bgmt3rvk4xpzk4zxr5n96bsmq',
                flowParty: 'yehmccrio30otcs2pya2yizdtwc59zu34vua2m6edqjue7qhlrpdqd8iccwtfwap5ynxmg28l4akayvbh9sjmi9nrxdrit7mgce9ejpmf2mls9b5o87zzmvmn6cmmdg3qkwa14pppoh3ds73wa1vqps2lz2ud5rj',
                flowReceiverParty: 'tddntx9x2lornsrvw6vz97tssi9baomx7smxcj3gd1hf3409w9gx2nz7wciardbdp5z2r44qcqis0szji8i80r2fso61bwz9uj6wr9l1dro3b6uy2awuhzifbj067uxbcdxdqmktwvpvdhbr996ikivramzga87h',
                flowComponent: '7fq2xxg17510lgv3rkqhwom0j5ugfc70ix19divl9i31kvr46rnscncctm2edffod67w5vrtewt2h059r0h0fc1o4fj31b0dempq1bxa56d0tmp29fedpzjmt2b95elw2yqolexx2z3r4dusu8eow4wopk60bz0w',
                flowReceiverComponent: 'tfhw8ara9xdss06o8wvyt2jknoxbgd2rphql0c06nyl9w0op7yjg3dcdr1fj48nr8rhlfynh3luvj6k4ixdecxh5nxbm6izwrw5rgtmgqzmg3xk93fabqmix7oagov8gapoybzcvvxzj6h4uj9rqv9x9uzi2vl1g',
                flowInterfaceName: 'pkcrfg2l5vxqdq8ctdfidgokp79a0yjcrwrxzjqfyjghc4whu9471kjclu7y7z4rc98qu7h5opqbm8ug0ji2zvriexkivxvzulphtgzs573gxa2fhvu7y5gz09d0sdc4fggh49ff9zaiysw9dbeg7lq0t35xzsr0',
                flowInterfaceNamespace: 'tiwgzprotj72xg1o07jryj731q0ym3uk15g9ft3uq4u5b8xpkafl8byxsfzjsmde53mbx9692k8h1isgu7toto0rovqzcfq63k80cawkf60k4axonfth1y6yl5yn2yq52ng00j6ppi30lkxu2xpgk01r62o7zwwx',
                status: 'HOLDING',
                refMessageId: 'hukqd1hfd3yxoo4j59o9ibr4dmldtqs0r1c0tjjlb2yfynvcc9pikoeyql600semqd9k37ia3lgbe8xeii6drfy15gau5sw0bc28gs49ac53gjti59gqqdho3fknakxe07mbw8al5q8th5415xehubiuzk7hlq96',
                detail: 'Et omnis repellat blanditiis voluptatum ut repellendus. Beatae iure dolores amet placeat et. Qui autem et unde praesentium non earum accusamus aut. Corrupti saepe sed cupiditate ullam et asperiores. Tempore illo similique aut. Alias qui non quia eum sapiente ipsam quisquam sunt.',
                example: 'i3oebc8lohtrrmtvn1cegm5u0o217jz971ijihflul2yfp2288h7x49vq09ho3w355ujykonqedcph75kbae0b00a7547pahetmk3c599a9copzlarg97giescniqryrm6ianm4r5vz3hudd4q3dliya79plfu8z',
                startTimeAt: '2020-10-23 00:08:41',
                direction: 'INBOUND',
                errorCategory: 'n83tol76nxwj3d4j6o5dee04mx28me1dhuzsrlw4328j3h66varzmt2cvxisnf54tqhf6v9b1amqug5c8029eefq9cubye5mh754nc1xvl4hpbuc9lsgjm6qpxpvdqzbui98wg3ltvns01igmow7ep23zoucppvt',
                errorCode: '4tn8x1jhe229mc7lnosvdrnmhnpkkubf1wpge67rpmi8lrxodm',
                errorLabel: 429495,
                node: 6752475839,
                protocol: 'vjnle1au0gkn1ox2vy16',
                qualityOfService: 'f6r8vk95mz8hvzppoouj',
                receiverParty: 'cues5hh1mi6e2h4fdaumqi05qczqe04lm3rg8oa0gajbs5xdi821ve39xenmxo5r2xnw4pjrkw4zqtywnkb0ugug34czlonsra45v8ngwntgahdsrwbd967wtxc6u257mf2clv9unoxmv55gyrq6452ubc7j9sou',
                receiverComponent: 'w6vx5839aps053jyy26xrf0xq7o5ckd6o6v9k1zvbycu1tv25tt8n7hvqdknnd0tlbyerkit877vs6gzugluid6fxp3qh0njspws6ua3yih3kushj344bw3ceeij1eg50nkp4hu3cjvg1kcbkyw61bgy9425o3dp',
                receiverInterface: 'i020thkwa092nmtmd34xb7k0xpc3m4k9t32jjqcnct2kkp8i5mbe8bay6duy2rmse2aq0980414bpaz0qqiace61gx34y73gmrieqzctdxbckwcqctv8bej0j9ncqe4hxttvei8k3mcbdwwav086sog7zinq1wgi',
                receiverInterfaceNamespace: '5n1ojjlofhnkliinwzidxfp8greqa6z3dmivhc8pgs2d3h4bfsrpye9ec5rsy2q4hh995a0j1iemeozw3r9zq46ydvvhm9532dnsltosj9zxfqyawtqdsreyqubyzbqdz5zt6kq34vwcw161zta5fn5g9nvqdfp3',
                retries: 2764337251,
                size: 4260584830,
                timesFailed: 4522383138,
                numberMax: 9218828959,
                numberDays: 7990557985,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: null,
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'ig7msmhge0f8thryrpg8',
                scenario: 'iz4diy9cpq3mhov3juaj36frx0px5b7xy444s74dgo23vcrkc13se5kp00tt',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 15:26:22',
                executionMonitoringStartAt: '2020-10-22 21:31:07',
                executionMonitoringEndAt: '2020-10-23 09:19:30',
                flowHash: '3bghxrqapi6pfp4vcgozlrsnrnu6xseqmrpiwfct',
                flowParty: 'ognlh1zmh33isjuyjmj9a5nr4e2x4rnwzgnk4p7ky00i1bbqy6nna9e71ep0ze81y7lnl7tlxgbcufe9r8as1tbajh0sorjao4f31yml43f75okiaj60ptkoc1m2cp4ptali8ixon5zfvfby2s7gylvr02zqfzz4',
                flowReceiverParty: 'wj4g3bapod2wudk9o6wdyfm23m80zviul66cfa9bq0uysndxi3yi6cvbfahpqv4rk1hhb2t5smgwl0wy15ppt5mlun6adng28p98zuaigv8jf0344emvm2ejpl5mmcaorrss17szelu69kbx0d83a1rxyl9ou51t',
                flowComponent: '8sz21acfpqzgnnjk04flay3veyq2nulc663neznxoeivfdqe00qbatybk4a7s332czqdcwej8rhnzqdwv3obbsujsf2knf2jhjnmptrsrzvx0dom4skcabv8ijgte4anwxpar4zxi9uvbcpibry7z5qskb50honm',
                flowReceiverComponent: 'b9qdfiqylkf02hvsh4hmq8offi6fe2fxp4dah2m3jphs5n8l3shu8yu33spbzm2fi1gnsktn0f1r9ywrpyl6ger26hn2fr0dcrbv0ibh0nd5o5rzl1x1pz79sz3f8nzf2kl64qvboepbbvyb8mmr2e80ywbutrty',
                flowInterfaceName: 'ig2mkwvaidpxrnnj3ii1tu1bnrkhw7h4ps8wvhvbbc24af3inyds9it5vj9oslzm02536591go4h2q73o9ogiei1ywsvymijytlegb69izy914jjuhoptb7pcsp15v6irwzbfqgqzsol70t38vjtm8gzaf3z8j1o',
                flowInterfaceNamespace: 'xiq6k028rl9pplfwhoaacv0iz132a14ymczfko8k2m95zppljvmj5iyvqzl0r7ndilndkn9348e66zy9b5acub8so3m2yvcmb2412dop4d899jpsreztq7zk3pieflkyts60r8oebnz9wujddzlphnzco8t6yh74',
                status: 'DELIVERING',
                refMessageId: '8km63mx2xfzw1oz2ai4zbuib8pkcru5z8ikfvhzvhwccz562xwgt7zuorej240bzxiy7c3o2uvdy9v45l6p6aaa2w3ppy3rwjjnnyeg8sx3jmzfseu317vwrfrnqkem6sjlqi679rvs3eaf7kbvrz0af8y3pjdm0',
                detail: 'Voluptatem a aut distinctio pariatur dolor molestiae voluptatem. Vel eos sint. Voluptates libero dignissimos earum expedita ea perspiciatis. Rem qui rerum sunt tempora voluptas fuga sed. Officiis earum ipsa.',
                example: 'uedy58wg0l0giy8icaxjx9db0bqj8jjabpi4rcyg073qmnxy8qvg00eorwve6q88ghfryt8iynjdrsyrot9jj5uvqbpik4q0bzb20x7m9fs7junvgk3kjbxittvn0k0h9ct3vkieclns1k39rt3nb41ad50ppzub',
                startTimeAt: '2020-10-23 06:09:50',
                direction: 'OUTBOUND',
                errorCategory: '1p4qtpu0sapsbw0brh9yymkq6g56em4mj2crvfx3fg5qk3k600urgjpvhmai83mhm3k5dubntec4fu8ihnrz4v1ab7ak72m4ukl4ty1hlgb2troscsumfv644v1wy0m4gnk8z1ratm9xu8akjpsaaltiz8cvd8av',
                errorCode: '1xzouxfkjyir1xvysg3mgt19f5m1i0rkmysrxg77wvxbogbieq',
                errorLabel: 806343,
                node: 7956878310,
                protocol: '0elg2kqe53y7vzzvw7jp',
                qualityOfService: 'skie6txnd93pmgohq76q',
                receiverParty: '21oacbcppjurg3xewxru3lbto9f9ef0707v8t0m4ubx14qdwotmpejh8ndnu7grlru8omb82raxrty1ts3hvlkcmeuubnr0f9v7r9ay0xqyn9tgenqv4qi7h8oelo53lla6vt2o5qic6jriitmptwylsx9ahpjgs',
                receiverComponent: 'rmlfm9h8shc2wyikv5b71irita7orwdove9oxwgqe878ytfbq0mx9h13sskscrfkifmjeoy9ojg1mu78fehwmncr3dpwwg6erk9kl7ne9hlmu6lhdgdm3qqdoe92xar3z55230mjfayrvjz85s9znvfi0khza2xg',
                receiverInterface: 'dlpmly3jp3o08eott6ke7hh7gfozgf3xgxp6rfs1oj1i7ifid2svasmovbc4xjlyhq0wqqnalmnz9jiyksb3u68phn53ldc2lrwz3malgh175hw3n9zw2brzoclx4tvur1p7boy9fy1jl7ck2kms844cheqbzdy4',
                receiverInterfaceNamespace: 'l3m617n87yfk2ltiqh3qgfv73c3jngcosizure1h0ej51qwxqvrmykv1lcgcg16i2k19g4h4y8h92wr6veldb44sjnhyzb3hp73b66ds2u6vjs4uwfwmj7v0ratd9ciixbugjepo0galeici9cnnjomzhim101vv',
                retries: 4703475538,
                size: 6022712255,
                timesFailed: 9932853686,
                numberMax: 4186790644,
                numberDays: 2179081402,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '9q2y2381e0u9b0zjk7wc',
                scenario: 'ucnwceim0fmixsnc4zf2cigqw9cjvnyesa1pvhpg4s2qgfyrzta2vyb0ntsl',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 00:25:54',
                executionMonitoringStartAt: '2020-10-23 07:11:32',
                executionMonitoringEndAt: '2020-10-23 09:08:47',
                flowHash: 'mg29wmfdnctv8bhxgy2r4y663c7h0kbu8ltotf69',
                flowParty: 'vvbwmd5ltz8crtq4uyg6qpbrq834ed5d1x81kci2lsejb36e2czzbk08xputclq5kbnn6d6y3pc4zy8o0df3wpwqbrqxyrzkgbl9qidw44e6ila7a4m4upbq48v8y00vt16qddv8hq27h5bqidn55u9k9mg3q1cd',
                flowReceiverParty: 'v579abtxzm0avhdn843u33tn9b12n5qashotrfbw2qvlwd53fgu4069rpe40mcteoj2fjyp7cnkiislopphlwa78ie783ulsr4hr4ylt7cyvlfcjfyr5asa2x20c69bky62hd69ojaph2qv11k5wnkvqymdmylbf',
                flowComponent: 'fi7hu59hzbqe3yd3z68b5f73ybmea4oa9c75hij50i2fa9eom964rybwtnrx7z012qwe7k9vp90mxuvhllkswq80tidih37az7hbvcnsjz43h9crkiq03js4gim0wjlifj3nafbv6sznvta4vzpahpxhqzlhxhfw',
                flowReceiverComponent: 'qethg6xl9owt2xy1u40gy3o2mml0fbqlvivlw0752wjp0ooytmzi0spvme4aazls962v0s06objmf1ie4e2zljdqief0t41ydk8fv0z5dxht8sl77539vn1awkhtwg8ae6ax4avbzcs3coy4opc6ihtavi958nfz',
                flowInterfaceName: 'puwshsbhovyieol0dyi48ijyq8hntqj5ook49oyqhf2rthpr4s58qbr8etf1zh3icuv4rwid3t7vvvjobhydjxxkl3r1eygjsqwc568wxm4l80mkkx68pxu0j4b4umwgnwsnh2moygeg8ausmyd01qiaeoof1i8i',
                flowInterfaceNamespace: 'uzgtwxid7vxfd1dd4a9ge4u3jybv1l24f5o0bcyg2p0oj0eil4g0gpbk7gy8pse7mhux0v49j3k7ivaqlowmcmyst27sno812u3llw32o2se5cap34tw3oc9yimikfpsevzpc1re7fig1bjbts8jl0jyiv8pr2w5',
                status: 'HOLDING',
                refMessageId: 'w2387id7x0086qiqie047meigvb3dllc58g68um3q6bpujlu2xb3s18wzk1o9snjubsot1utw9ji347grvdpdgqeut5slkn6b72h7f6qbfd3chnj1efzeg55f6kfn4mdx6ievdybi9vr562ytbyfo0auagmy3zyt',
                detail: 'Dolor molestiae numquam odio odit omnis. Dolorem nulla quia porro accusamus quis. Possimus explicabo illo esse dolorem sapiente non enim exercitationem libero.',
                example: 'zp8yvjf08pwoq7qj82ru0w2qxb258qzhl07ts6op8vjynngmnaf809ilvmik4ljb93ayqckiybts4xtqn2u7xwov3aui7t5m4k8hamfgyosv3w948kqwslicv4lb0b1y1q78i6fak80oui0akbfw31w54t3jhogj',
                startTimeAt: '2020-10-22 11:28:35',
                direction: 'INBOUND',
                errorCategory: '2smlqsvkj09e07qqvt7cm4a76yiy5xz3gtqev7ekgk6tq7mwl1z0pm97p06xfe8zbvbkrr7xktzj5plh2xtutggma2srbr1xpdu469lepb2gwmv66gbfqpu0g9j3q71h3yxmnav8olzke0xgxe2nvdhhka7tova0',
                errorCode: 'zlxqfipv4mciw1z8iy3et139v8zadjiut5hv197ztt87rrs5js',
                errorLabel: 164963,
                node: 6696813597,
                protocol: 'fjc0dukcrox57gdh8vqa',
                qualityOfService: 'mqgct8fnoiyh2iyswyyu',
                receiverParty: 'x4p67f2b2yhgc5g355bu2mm2mi2nw37q59f1xohzrc2ea2sjl1zvaj2s9se5uf9dv3ut526vevpvivnnbd3wdppbiyy0f2zcbvettjznfuxqgf0374rtucbr6crc4o2r14g66yfxk1du7eo3mdl0jybnwxidqs8m',
                receiverComponent: '7zsktowt9rjz95r4d55wlr88rdv0t3oqenucmnfry6q0fphtagcffd2i0izzt0gu0icbveg0pzri95c32coa6hqlcfzmq28288p0h9j6sup8i6scv51jiftj28rct5592u1nqwc1zhb8yec6opdk73bmcumo11vt',
                receiverInterface: '5wgoinrwyh7zbzc3rfavkamdo1lymd1rg2vzsb8v44poppxbmm3sjmz7o213td2my82xrra5u3tjud1szjkse6i50zaeye8hr52mwn5wgpllbbumutw8n5agyza6e8yidm2vysg930dyfcykrh6gvtv47dceq59n',
                receiverInterfaceNamespace: 'toinr43g9wix0k425bvf6sothyl6agygis95skdrbjxzg8xh8xv3b78zup4f28mysnyy4fblf4fnph0jip4iu9mdyh26m3llyfkza8qhfx4ehid135zwl23vpwws3hds8yprkaqxbwpi6rnp6e1gbl9xn9heews3',
                retries: 9202771679,
                size: 3472393805,
                timesFailed: 6986511371,
                numberMax: 3043013754,
                numberDays: 1675024583,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'c2m4nyw3a1wfzrjkem691w9m9z469fazuq1qrgcr1vx5g7yqg0',
                systemId: null,
                systemName: 'bn97mpebx8tisdpc40m3',
                scenario: 'ccvzr5b0i58v1ltr5hmpqbgnuoq36ugbqic2pjzgjrtjpdlhtp5ubskkvb6s',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 20:44:24',
                executionMonitoringStartAt: '2020-10-22 12:00:23',
                executionMonitoringEndAt: '2020-10-23 10:56:51',
                flowHash: '8t46jj966cpz6saxhe0rai3i1ql0u0d3sh2z4dva',
                flowParty: 'sgrxpjmjdkh85r8zm9x85ved8tjbjt5w2ff68cg2d8lpo82fizkzjqh438p7p3nfnmgurkrdbt0wfxrrw6q84p94skdvo92pyfc6wk6tqf0mkfrh06o9wsp73sxdnvi8ctzh5381xs104msfj32newecfqhuh654',
                flowReceiverParty: '72kn8t1yqya5u3c5s5k87gqshz7efye15y5yi8zfh1o5cu67n7dguooy1sbjq6c8qmsb0p6q2d63jocdjvz6i9oxinhejqkb7al0xal60rwqphzqs1g1c1efplqcawlm1nktqyukg1wlgbi1j0m2okdqvg2gba7l',
                flowComponent: 'a0uqi79wm2vr9cohvtxt9v7cthrngco8ikb1gezdiqsbb0bvxyhm7gwci6ch06456hx79f417fa6ozfqfpd0cu5uukx5exubyp84kyrarpp408xt6nwjmad3qblpg8x7v4l9d5rweosi649s4uddbsq401w8y5r8',
                flowReceiverComponent: 'hk6rxcb76ld0x2hy6plu936oksnibmocblobtrtdx8ysge8ts5fkai9wiwxx5j6vtfjgih9x9fygqveecqn32mjf1dp1u7hahqg8p71lbi4tahjxx7g4kwhywxkeu9hk0qfcqly4jxrdrvyy16u9qgm7wu870eoz',
                flowInterfaceName: 'nhnwv079imdplz3iz8wdqfmbuhx3gy4nutnowt28qantqitwkdvbh24c26ep8lv5yrb2d52ph716u6s6dpgxckptmzpwf3vp1gczokl87wxpqcw971g1wmxhgp1fm66j4aztbk2f3z82n5vlazos4nvb78v5y024',
                flowInterfaceNamespace: 'w5tmkc2ynveya09fe6jm3yp7gniaianhxl12j3gda3trkk2a8xqrgw3xolda9anui1dntymduxoe1qsvtf5oad6xril9nif4lmao3g48a6rowatk3yb8cgdu62bs8o4cvito92x7pvfb622usgaid9wkigzn2mly',
                status: 'SUCCESS',
                refMessageId: '9697dg6yoz3mk14c1b2yznnwowc8pftpi8la5yvz60g3pewkak9qzstfjytmtno8612zp0izsusp4z6k0f6vbrhatg15kmynr4uni88gfz0cuolsx53itl0pbuapv5epqfpfgeo0i1j75q7gm9ibjbck75l8m0m3',
                detail: 'Ipsa eligendi fugit nulla nihil beatae quod nulla. Et iste voluptas minus non aut sunt esse. Quasi et ullam rem eaque qui deleniti dicta commodi non. Eligendi qui voluptatem voluptas molestiae necessitatibus distinctio molestias itaque.',
                example: 'sc8jyta7lkc3s7gxwt40euio3qqhuqmr5xq2uicuneooti51xtv45n779wx5etutqe0om3j0vt9u8phk98tltojdqudvjnx96ghnwiknbous4z9ictizpp95gcvgijbaj7m9xuumy36oaewo9las7y6uf2c0y8ed',
                startTimeAt: '2020-10-23 10:28:55',
                direction: 'OUTBOUND',
                errorCategory: 'kt8c9ufgw7crx9779tih82l24g9wrv1b3osg72pcwv6fso82kihd3hgnruucsjxj3nvuqffhpsx16qjx22wi7x5jo4jbwaawvur8a5il3791fhtu8mp28ipqj5my3nv5yu5ni0mx7khlzu6d4karkkmsuns18hp6',
                errorCode: 'x11nz2diqjwz9i9ksk9rpqluv1ga41so2ukkscyi6wu5epvg7v',
                errorLabel: 513281,
                node: 7131863346,
                protocol: 'dzfofockwk1s0c0i3tlv',
                qualityOfService: 'ow0hviyugym2f8adq9pi',
                receiverParty: 'ul8ihcggnv6m13nj4i8m8aui0kz6j8v3ca8b2hfj7byj96vnv2m32ap840a8pmdwevjy8hlmmm2pu0jgb2feckcdtv3g568ltkf4eykdm9mpz7grmuijtiv8mhb5qn4iepl1q5fo0xabjxs1169dz3kxnaxapcry',
                receiverComponent: 'yze1eu74fwpyhhfna344k4fxbi5i175092icua8urqa1298ncxp62bfo63igqqzon6m78fqmv8mppi6lnxfe3tz4843qrv0suk780n2hzfh3uuaai5yogr7hnfoe6nxiv3h2eyeueuieyoxu0rrcfn5c3lg8vz82',
                receiverInterface: 'tmkrngki6bfptltrtk0kczteuus8sllduj9x1o7chdspcvznjthmydptr7wjitavqmrvfhys2llc3oo1ym5vcnsimx4j7nfexqmwd37dpoaj9x2mrr7ughdm1fy9patmzrdrworenspdu6jzfw8tvu3mb6k15m58',
                receiverInterfaceNamespace: 'ibbzwpbkqafgzt7u9nn9mmia2ztu07j56v4zmuuiz2qs8rmb4emz5lddze00agscktku8rdswhffy6k5h4a7dnz0sau8a2t4qubcl71lvxbll8vjqdtb26y6s3emgln8c5zdg139e7eb5jyr4ggi55xmouvy80v5',
                retries: 2255827394,
                size: 7370606064,
                timesFailed: 7818102725,
                numberMax: 5863082045,
                numberDays: 5108721760,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'myqgfqvklk3tj18kho7c9wb0b9vb4bpour2rp06bindhr9lnhu',
                
                systemName: 'ady63mocfkz9w2kxxivq',
                scenario: '8erhj6m9dz5vf5po0ff18v6cqnwm9hz38huuip94qcrh9mdea346ys5q3xv1',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 15:43:58',
                executionMonitoringStartAt: '2020-10-22 17:45:36',
                executionMonitoringEndAt: '2020-10-22 21:14:19',
                flowHash: 'im2hxi6wdth2aht1orp7rth1tq6tv40dbd5lypro',
                flowParty: 'stwzsoagzrizk0ulinhvo8czlj5qeoeeia2b4rxmccxblsnyq8d0dnyncj1tib81k2yv0l0vblo9gd5b120ihjva7spnxuaeaanbcealizqkqjgsuuxi88y65t8gjc3t5t57ldsy4gfy6gvrg053ukmqo9cz9bi2',
                flowReceiverParty: '4x7wi9go8qmldvjc1fxkzkhqwv4188ysza00dzj4ky0nj2ey6dhtovrskzhw9avj9vhicz54w1768ap4qelzg91k8w7rlidx686luj32asixn7nhpqo24nwrp6rwcyqlf7y43ikxm1orne8q9jbyeuhq8gxt2wqn',
                flowComponent: '0e2qyhaceo18q61kudr4x6cwbusb0zmtkulu6nauq1u5b8w89g91koc4c4utaba9jawpadhle4hpmzohok61vbszwglrk2wu958glb8bueghknab1k8e0n8ehy9q09d24z2jce27lw6jznl1mf6h4irncenvedpm',
                flowReceiverComponent: 'prejp6msejach7zafvtuwp6e4l3tol7wpt9pbst5g3kxyqi6ybbrn9mu7syxfw4kezaxfj3y1tsqy9m6dyi5n6pt27fnv6h5l0gaq84w1qjt9y3xpdp2qejxyes93q0tlnl4dzrsahnjsbp187wqk1r8hzk4nz19',
                flowInterfaceName: '84tjcalw2zd1vlefxbmgeddkx684z3yfle42h2pofkrdb9oyw48cyd6nbkzmzuheaireqf9je6f0smuiq3uxbt4fgboyws50ekqnf7z2w7z3y192pdc48h0u43ncfztfxjn7rdllkob6qe5m4fglp6oyxokui88l',
                flowInterfaceNamespace: 'vfw2emytlkr2yaazld68751xpl0ro8itqkagu78y3e9zpmwqeh2n8fark47zskpiz3kjtoxaz3q85jl64tc3pi3vor0mykp5vazos6f3ea0ksdoird4emsdkrp9fwyh0pbcdz60cam2b2dud1my49l7tqt25nnlb',
                status: 'DELIVERING',
                refMessageId: 'xozxzaxsbkg8j2blfkc5ikhrjl71720e58ig188ff9lzaykvyf0u9uhbz1bbb8051tvlip2iywvkkfosyinhojd4d7hbrasrauh7he90p45xg70nfzsx64w9chfgjp01zuto6v0q1lelp3ul4lzyq6f11j64maf0',
                detail: 'Occaecati laboriosam eum dolores. Est et fuga doloribus voluptas maiores. Ipsum dolor saepe eius. Sapiente earum consequuntur sit quis voluptatem. Sit consequatur et.',
                example: 'omrpv312h8h1qi2pxsb91io453cfr0rudtpl8bqv4dolo8juvnge4t1ijsfr17tscd96m9cvs9tznhv1sa1ivk1oe7x8kr9n3skzdpq7dhyihics2qd0gnz3t9vskhy0ugzq6k5hzzqra0v8kbzvhl4ig3xh99hx',
                startTimeAt: '2020-10-23 08:03:13',
                direction: 'OUTBOUND',
                errorCategory: 'xs40t28u1w4fkzupkkale7ejjgy14704nglf5pjyiiseitdtms632pblh8adb274fy24zven2vvuikqajmqqkg07397rfjfsigcljfva7ruq3p528ntwxzxj3ey734xec0303becbmnlyx9cxb02h683m6tznf73',
                errorCode: '4a9w585mjqdxe9v9wn91bducy1om8svmt81suh65mpwvfvfbxa',
                errorLabel: 308590,
                node: 5538608938,
                protocol: 'zyunsso3io195562x5tw',
                qualityOfService: 'i91khixwuzqtstsdmqrk',
                receiverParty: 'cqlzoqjk0d0skfe96p8gr1aqy8gcybgv8r4ose4selbm8ghjeg6ry1henh24wembyjsjwpien113brrcrevvoxvjvqx8e8wjtg2tux1z6s5p0irsqzmo31qhhpu58o9zakh00j9f8lchm2d0ls1qvcmq6tlcvdo1',
                receiverComponent: '7pf7wj8pshpeqyxlfrqdj92hxo3wbubf5azatsho6v4ok70y1gt8la8o8jqgcdl6k2loibnr7ja1e137sb7d0inkye4nybb04u7p1nvoqnfkfjwkbh1k41y0vixwq3op5rj42wlva0hr191b342kj88lhnplhf19',
                receiverInterface: 'fo8a0bv1o4l5m6hsrluftkij0zmfwu8ywbx4427pwt93y10kt0837wmyeufug3zjmzrzz5ir5afkhmtz2ryt5rsj1n9m5onyaup0hm8dltomb1azuglwk9cwc3chcy740pw2jd2z2vnp62smgzb0w72rmjye0e8y',
                receiverInterfaceNamespace: '9wy38c619sla9uyzxc4urnejgcnjwxulz3k0244bo8rilt1a69us510tuuagvkbyyjw00gwxdo3lx18hq93cfvogchv31q9v2gz11lvqkh8o6hdu41uio1gehaou5ezumi8agy6ja3nzh9od3rntatpo6ywy3o4t',
                retries: 2505906472,
                size: 7699567049,
                timesFailed: 7113704088,
                numberMax: 1422333253,
                numberDays: 3904043741,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'o4qr1dpq42o5bkrpi2nysmfgfz4f9mqpdqr9o5lve1um8se5wv',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: null,
                scenario: 'fdp0jfqnrxwid6xssqs4obvpws1mg2kp4lwaf10182ecwnooremfd6vctz4k',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 08:12:01',
                executionMonitoringStartAt: '2020-10-22 13:38:36',
                executionMonitoringEndAt: '2020-10-22 19:39:48',
                flowHash: 'wqfcfgx8brt2oi8pg4yv7ksgzhgy2fna1kmhd462',
                flowParty: 'bnbxl27rkp1spv6wtx1zackrn65mzp4vv1fqd27a9d69hxkejqy3tlncoetp4fyhnpwpl9s1u262ru12jy4rekj5gpoxtz64i1aas1agre0vvwvscxa6uaunuhgxilpz3qtewgqsim2bwhee305zpqr9nhx714g8',
                flowReceiverParty: 'heu8uau14wwn80c3i1nrhdj4k0jfkvpfp44l1lmjb8l09nbo7y3rcacxypsyvs2cmleyx7k0up15m7zf8cash6kgg4epoqxqyflisphdo23r5gy9v4bw4ems6x3b1i6ovo8dftpmjunjn65r0872lq5vvhaj8as4',
                flowComponent: 'be9jwm1inyrlzxpau0ro95lecqdb0rjchg12xjwywoj5xn5qizg5rvyvyy1b6b2zycmp24arkckl613flaqfyss11tfjpt0olownhzy81o9qv5coeg8x2mmag33wx6s6df7xbpueb4covkh513d1lor2jxd2uhhm',
                flowReceiverComponent: 'v6omteog8zp0znxv5ypj73rrmjfpxw7ul2ij5tc6z5n9gb1psudwnssiv9udsz63zzrf40lcgaqj3ecjwq0d7qc7hi13fhlnpkm8n0vraes113zio9xc8bjgolflxueual0foj3cychp6wtavqwl0ju3o62xva1n',
                flowInterfaceName: 'sww0dt69ic21dxagbqd8f82j1bxdaxtrpirgjr41ry6xxir94y6fz56lxs9zyrsnf07mz8ypn7eyrlrgy7m8mo8y9ll22fuusso1elzqkg9o4wg6dliqppowoayje67o55ijaug231uk720s7hoyis1an2g58ipk',
                flowInterfaceNamespace: 'xh1qwhhfu4sd6gvwm0si4ln4olae5ymta7zz2xkchp76lmy4j8xnr04yuzmasesn09lgu7uwbnzywsgriedugjvsqkpf71164gdj8gtosvfx7eczlsh1jfft4occxynip7g6s0woodloimzbo92hxy09v5g0gjg1',
                status: 'SUCCESS',
                refMessageId: 'lj97iz4e9u7ortvbtakbhgr6zydkql845bszxf4hk7vwencv0fn4mdg2xzpgoqa33bvxdkpbaxxqmd7iei5w6z3pf4nbdu4rpq2r5b3vr2s69ctaafy2v9df89y9l0rk76p6241br0swbvwtl8suwkvtp8yjvxkf',
                detail: 'Nobis iusto ea culpa. Eligendi quas qui culpa. Eaque sit eligendi aspernatur beatae recusandae excepturi nam nostrum.',
                example: 'fi5ed0xd6v8jlmhs2115k890y4ievyl9tnrubqw9q0dgs4c3a39gtjrc7ayzw9mx15a2nbnewul8lkjz41v6jx38z58jrtxbx6gsp2ni9r9lgrlp6o7uo6tqfmlh0i8rf5bqdgchdsyjaci4fv2u65rh3w9fwev2',
                startTimeAt: '2020-10-22 17:37:29',
                direction: 'INBOUND',
                errorCategory: 'vq948ack1h2394piazr7a1v7jvi4grxr37wbbvhkgoihn6jrj6890px4oflr1t9ri3wq5ycxj5yh9lb7f0gv9v499ho6v4t8rnjk5xz2i3urb50tvbc4lb57roi5me0sj2ww13ppdfywsmzccv99qeryfwp052jk',
                errorCode: 'm85kdhht69c6x56slwx6idswb4tm5vs88vbj46bbs8mqjr9hw9',
                errorLabel: 671997,
                node: 8876511083,
                protocol: 'fvoaukkhawiunc10hml2',
                qualityOfService: 'psrlu8ijyd9y9bgcfobc',
                receiverParty: 'p0vfsm3g6q5557h1k2eweyhrc813iby454nre88b399zv9ahmd3n0uyyiw62z2qh5l1bq3uva0frt8ktcj33l7dqpmt6fzmy977x0g0zti3su7t69w2hp34w3kinjmcgyteia7128756v4ikybtrouw03ze9qhlo',
                receiverComponent: 'xmslxdo8j2ld30murmbptqk5iu7z065foo5zypbvo6ehxzn0bluj1y4qo18pkemvx95ay10a18s13cc0cjyd7tu99i177jd12e5dtupc41w7zbnpfl8ck25v9q0jzm9o0u1taaqr2bo1x6lpr9bgmephmm0ond0b',
                receiverInterface: '3teop8nqwa2coddxcn4ull43jq39jnla35x6a4sp4ygvrek6zwsgkmhtxqv1k5k80sce9ove0nppccskdy68r640yfkndt34zvv6r4hawz1k6u92jg6mttuvihyo2zlm896576nhfqbtyl87ed2frpzppf1sw9bt',
                receiverInterfaceNamespace: '28j0adao6pfg2dvl6uz4vsh0om8o1pugr5vfwcvcwd7lduhmwiamctxcc44z9hcr9h0xn87vuiq0dara996b98u6cfg3kzw4osajmzgqqlkugg3fmvyy54fvmbu29vpvxvkybqhgomxv16n9rd17o0q1hfhdamsl',
                retries: 4663861214,
                size: 7447507170,
                timesFailed: 5731970686,
                numberMax: 1667729643,
                numberDays: 2223740389,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'm9cl0wdk184agxgfvv0d6dn3cpbsajhrthxny88v1gyjlu7kaj',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                
                scenario: 'luq1wpylj08p4pgjxbulu0kttbbxgm57dd7ac2wl9dx5ctpv7lmztptzfkh8',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 08:36:00',
                executionMonitoringStartAt: '2020-10-23 01:51:03',
                executionMonitoringEndAt: '2020-10-22 22:36:04',
                flowHash: 'i3f96oux4h991127akk2g6jn6y3pkd70y9e1wfjn',
                flowParty: '7v5k36oz402jp829vg6s9o51cpmfj17vo5tll0igtusrr05yk82w9t2tmt9kh5s3o2pegaqp8pglyienya87ekiklgt4pp1wuajf0p9l1pclvcxgtathuq44c9z9y7l6qolc06dma913zuhtd1y7fnmvm3o5f9oj',
                flowReceiverParty: 'jq0jw7vm8bcwnkeyoggmy0jgtbnh4je2zqt71oji0b1n71iv45s509npy987hz6a1w3mpz4dywfz7ycojecthb1okywvjjg6jtyr1bejocon8v0v27hs025zvuyvq9dvkphddmd0wk9nylht50wg38gqubewhi64',
                flowComponent: 'miplhbwmnht66h8r757g3ja0m1rva1oir340zdmtvngk2jdb9jlx0t2pn0qx09v66cnhm74ou08pdtrl4ec20n310ffv3o2fs3o4za41dppiu2c3val8vq405vbtar74t3eqcx3xym96inv5f9qsneafd4q0ldjy',
                flowReceiverComponent: '2l5r62jjdz7idxrggcd4goqv25o6z7hrnpx3z7baeensnya92rdo86vxcev6uxb0loo6d6z0p1q7dy0zy16s5xz6dlbx0b8sntdqlhq2vup2nwlh6kaqeepf2elj68u5agn65pnmnwe2486osi8g4ay9frt05ajf',
                flowInterfaceName: 'lpo7k0toukcbm93xaowo8dwih20nq08xw9on8cotvasbkbc50ah9i514xgem5emi90x81tpl4g6wqkt6v00c77rxg9c70vkpjfmag99nof5abblyucqrignsbt559pmdib7usbggkkqbw6smj8ofggzlhurthrwc',
                flowInterfaceNamespace: 'td4q8q3jzqifm20cd0g4lk5qikrcrecky0rcv0wga7y30u64szm1wjq4n36vfjhzli2pvsk9x8i37anojadb8q8mqkatx9n6e2lgtzgvnp2aafg1lokqxqo5pgncg1308o88xvkouvzdspz0n1fyimtr4n877mit',
                status: 'CANCELLED',
                refMessageId: 'ce4dbw0th4nedq6nebngrsreasqvmewozd25cjrwmx064qt43969ggh2bnf1wh35fwuxloatduz77dp0nprseego3fmn0etyhdaqfd68po4qkodv0s6s2jr87fk0k7b7pvui8e1qw99n2xgar0ndr86g3jw5f777',
                detail: 'Sunt quis nihil autem aliquid nihil quasi suscipit. Tenetur dolorum saepe id. Quis non tempora aut repudiandae maiores expedita voluptates rerum quasi. Est quo odio eius et cum neque ut ad quidem. Quibusdam vel laudantium dolorum.',
                example: 'r85pypj6thclomt2gnq7qpz0iwl1sglbz3kcgnxtsg8ar0vh5bri2h6nnivzhkjxb2qrct2c3vu86k1dkgwf7c4iwe3m67ena7pyb5mhenjnreav45oawonrlhk1jd5wtbdgdq3v7xkevzcpwoy4acqo1jhcwms3',
                startTimeAt: '2020-10-22 16:01:12',
                direction: 'OUTBOUND',
                errorCategory: '4klkl8ipucja08vwdnmpifrffsjvuwlef40fg3hrrpgl1ffwykf2r4p66kflmgdmjgx4dwlwcjv28rzkipbqd13l77hgl5fohqjr63qhea2zl24r7ulo7omhbzu0bfl68irxzb3nxiui407udmnttsfy3x7x1t0z',
                errorCode: 'o8swpsk7um5gpnklxmc4c6mchag8yc7nh290rruk1c7xsecsnd',
                errorLabel: 118753,
                node: 3998966472,
                protocol: '3vzybqdat8l4kcmrz961',
                qualityOfService: 'my8paj39890yhlrd9ve4',
                receiverParty: 'nmf3qb1kcynnyon63a3ono69dukv6l1hhansxmadgsfj2qth4nhha5bgxnsnv2n8rhlw98nla96podn0vtiscw959rbd2974nm42mzyau6ir0j8svtxo9189v75qz4z7oseedva7slj6dkx84naizmvy0drk8wd8',
                receiverComponent: '9vl82c9jzb3yz2x58bwqfbnkqggdac6r5uq8tbe60n2saj0j18ogjv94f2erzaylb5eg87x0ec0o61d0o0bl27dj70wdz70csdf05eu5eufq444s4nptq98pfv9lbtk6hoa1fgac0keoyrhk6za2mo3mkhefcgnn',
                receiverInterface: 'whnnhghzndgzu10xfrbswbsronk3blz84gxee9gerio2yqo7zlzxmx46wby7a0j6a1hhulry51dnxqrdaxpov3wag0fxprngecgovcrzybzyvd9hs05bpq7hz1tw8kq48vvxzb06uhe61qsuctamps8bxflup1is',
                receiverInterfaceNamespace: 'kyybh2usib91get6lrkhy0wldc3jjaxsple6rg38j82a7rh54jg5d6hdsq48kje9y9vlwzmp4i4l2n8ye1w9houbol7lv2511i9jl612y2yfjg69to1q2rpw5t83nyjbsihzn0kvf9kc1wbkauyd22oppyvjeze0',
                retries: 8074995325,
                size: 3361967069,
                timesFailed: 7125523957,
                numberMax: 4509153964,
                numberDays: 7091211247,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'zuc9g9lj1g9xcrjjnbxst8po9uqikyxskj7jnm7e1yf0ur15nv',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'qf0ghxq8i9zyu8kvq9oq',
                scenario: 'ihvv4ca0y38wib7ge9gcijakw93ncazhgtj1yxb7nfl7vnv4m67d1k9uiwca',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 22:34:53',
                executionMonitoringStartAt: '2020-10-23 03:15:24',
                executionMonitoringEndAt: '2020-10-22 21:23:48',
                flowHash: 'bnwkn226l0n80610a63hco61r9fqx358rn37pln6',
                flowParty: 'zs8yc7bmod9ndx0arlfspfgxj7tievhcapxd6wzgev2byvruxrd0gs7xj1i7wnqqzhmx2xnrlxnihsqs66ust1vzjx1u943w44swiiol97l8wywc2wtq1tzxkjjtf0dsc2xk4tbs64ywdj4e2mqw3c2tyy7j9x2g',
                flowReceiverParty: '7gwfdm1k1ttfa8nclhwgb8uxbxm3m15j2e0htt5do4vn2au4y0xvqocsomdw4drgr59s1gwe8mjfszfd8f4im3xfiykuj2m5w58q8d56ecazef3qhh4gx9qgf13g1y45xqcv5hq0gmw6zrlx1hvx65l3zjceatp0',
                flowComponent: 'qb57t10d3c1f7yrjc06a9je9pmndilkkdibpvf2sg23p8hnuqg379gvvi8w7jxqab7ez39rdmf3z5rkz0d3vujto6i0r77nyambv38ryggub3n7kaloj6mknttam3n4aadgk0j8ylzmgs22mntj5dwcjzxayl2m3',
                flowReceiverComponent: 'yf3mm0ykpzpa4vdur093jnne1ebm1ar85ywn14vmhcrkn8ekccys7bdiwtdx8145vcnqf2d18opykohccr4x4tuylvdu0dwjizvodp31i1yzkr6639tnpfhelnaipixxsnpz6gbtuq6g5pde1tzecnyvfpknn3rb',
                flowInterfaceName: 'o453pp3g53dgvatmwcmu23u6dkq3qmgq365kxij68r3vlbbjhsmcwvbmanacyeog2dcdge2j0b77ub2fdkj2x01x34pb0yuj8qz6zgqdpvbmfdqgpedbib6dt596rnphirsa6o9lnhiqp898wypi42mzxhwo0uss',
                flowInterfaceNamespace: 'xuvfjql9pwwi3nxzjn3jbsyyb58ovp88s0gvn670i6t91wcn25xrt3hjxumlot1wdgx0u2oms3lcrezxvbjfit1ozpfpqdhhhktdwk5hmw6vv2qhuxq8485g8lz1nfbxp98yooumw1x7hb4122aim27qmomrzpjk',
                status: 'CANCELLED',
                refMessageId: 'zkbg3acy8h33eech9mdnjpj80epke9el60fnuxfcrtd9kba75hlp5r4gaa18tzkszges44kmd0qrf7u4fc74zvjxeef1dkxpjjvuaj42475wf049fbhs1nb1k4jh82i3260t2l5703ozd6af357579ek5tdl8qvh',
                detail: 'A sit omnis natus ut rerum. Voluptas facere fugit velit veritatis quaerat fugiat fugit. Et est minus tenetur nulla aperiam debitis eveniet et.',
                example: 'v77p641tmodq413j1s8x54z84z7ous0f7nugzryepacxujfzukdok0cd3f7d4n764a8f6ucl5dz2m44b4q9jtf3r779jmty3yytyd1kjzyio8m701c63pypt1217i3kog0em79v7uk7j9fk6x4w27zpdioo36gwx',
                startTimeAt: '2020-10-23 04:46:28',
                direction: 'INBOUND',
                errorCategory: '5svy4bcoft82t6udibfoash6ndr2fmt2fqm8bnw6m5hguqvrk0r3cmea45la8i61et2h3jseafd7ney8jffmlzzlfg0thjigd1sn6qoq06i7y50m18h9cmb372iux0svfe4xm0e38k4cfgcbz4clznbrxfjnifmo',
                errorCode: 't15qtoy3bpohedpsm4x2mfhxvowbjtqsoziw31lyqt8ntw5jls',
                errorLabel: 868925,
                node: 5872556043,
                protocol: 'ffbaf4tu97vf51faxb9o',
                qualityOfService: 'coq6jax3qg1bsptgx3fp',
                receiverParty: 'qubcha22sazokf07cx7ligorsse4n3r27wnxglvxbv29indjbi80ztlnoomrbr0ifeph68qa25tqzoa666wf6k5bu77qvyrpkti5xnf9va5z0pxl7swygltyigatbtcg7ex6itnuh66bb4709a68eqv36rgn8glk',
                receiverComponent: 'ja31sx1ihb77l9cj7qxlid7w0vz4arzibrwluwgmq1qu6yxn2pfnp8rfq6x1fnbi84vdufh15yl324h6eq7gqtj7thfgdcrdr814ynl7wkyubs2lubl9t2jzzmjs8gdq21g4xberbktaabu09kdh94dvvcug5e27',
                receiverInterface: '19qev6yv9ldi6kb9lq82pz6nm67l8o0hnhm41nkljchpoysv09x05s7jusfkzsy82s20dxryundslo3q8zuqu4zetuq0olvbamci2z460uwxr0wh1x1qtfthoost2q2p7t4thwod3zlutp8tqnpzwbn7nzwfep6i',
                receiverInterfaceNamespace: 'g2pqzo2qlq55t3bbjirht3ukp4yk4e4q8brigbsa9um1jkubhfaerez4eyh49omhp2d3epbk4nrh9xslwxvuemksli9x2ujqhxrfr2e0s7mmkqvzdxmjlgirwz951ooj9893aas8oin8akmdnp1v6ofl9hcbj8bb',
                retries: 5913288561,
                size: 3098940381,
                timesFailed: 7140360346,
                numberMax: 5197370925,
                numberDays: 6293100570,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '9s645ulgluwfq8z8y2rdyh3ty2wieluffd50vb89fzy63r0zy9',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '24ib7wnc1g1d5k8a14c0',
                scenario: 'n640gbfvbdan14sas972uzls2v19uvmubehy21lmpxjpzgb4g8hvoak242so',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:15:26',
                executionMonitoringStartAt: '2020-10-23 09:42:51',
                executionMonitoringEndAt: '2020-10-22 18:26:08',
                flowHash: 'lto4susybg012h7th6tdqhrvl64nhaehagkxexr2',
                flowParty: 'zerq1gxe741hbcoutv6noz4k3od0w2e76f4vyhutz87z7lhgho9xo9qvh0c7jczydkfseqv3g0cc1gwm2l1vx9tbhtwzb861k7unc6eezommalkuk5sk6pfdull28wfy5w79ehvgtiyb26g51zrmi5lcgmc21gmf',
                flowReceiverParty: 'wovrios2071ebsgcdy0n74ouhj0x9p3y5ggfxhdea99wkvxmcocce3duedpw2s0khoabg1u6hqvy6royu4e4p4vo9xmqgv2lqu4nwmn14e1xhg44fh92k9mbfosv7ndwq5ddplzg54bjkpk2zm8w4iurd32r9dv8',
                flowComponent: '4si5wa593uoilxqarmah1ifawrar4jzxxo0bbqjz4oiqdobubvhl1uelthx5al455x9b9e5t1j8dgiadruek98xdfwswhxgji959l5ewimzi8ms2wb1bdlueaj4xx5fp30majp841jjmlt13rroxp1d7y2cy5epq',
                flowReceiverComponent: 'd4tu0nvdh9rtl1db3i795x9oo4su21f13ric9mrodd58owsusfbed497qxcj985o6owakzwyabmnf3w1aj8vloct5g7p13w68i7kru5kpiks2t9us13r5f11jssg339cuqp52ukjfm40iy74nntn4c318imq9pqe',
                flowInterfaceName: 'bsm2nojom9pk14fo8yrs4emv1qkpg5iod1njig3rj9fuhumeaoyhyq2xwk9aihvz7zvzzcl7ras9wahgyaeje68c9ld6hu5pvyg8f6o6n5xvp6nn7q3dqnrndmn17i2yi599u4g2600kl21u2cvwoxbkndx1gfs0',
                flowInterfaceNamespace: '4ghwdmzoqtjksjowb360nh3ozyduu4x0q0keizkcfq8bbrhim0h047ga33988rlzmm86j7cjzwqo4vgxxfkern97xs0thyxn0lo6wndcg9qx52t9lmq82q9v6zoa0lq7959a65hedssfx90n6u2nh6tusaswinzz',
                status: 'CANCELLED',
                refMessageId: '9gggtk4lrv49gf3yrm7phji0zmdfws7e8s4mw4r7f5px7qepr814gour27mrlly5yb1kz5p4kpiw0sw0zu0r52sbqjbn78iub7fsjdq17p58egp9le0uojtgy693ae6okott4ok85t409tnmsbkbm63m5jigq8mu',
                detail: 'Ut ab molestiae perferendis nulla nemo dolores optio. Praesentium quos commodi qui in. Veritatis voluptatem veniam a distinctio et quod omnis excepturi excepturi. Modi perferendis laborum ut saepe. Sed ad ut occaecati corporis rem vel quos similique. Cupiditate qui quaerat dignissimos quia voluptates voluptas.',
                example: '1ltbenk2m0v9c4s01sgjm1ibz2ug7t7v9dmiko71yqvdhmkilzbxbiytqrql0tzj75b9tti9n2ln9csyjxd1i6uwajvcmtukk6pzhd4gn9mpq05ttl52ihg597rsnxi7om2rr6cxfanbj6w31x7rx2un7iuhin36',
                startTimeAt: '2020-10-22 19:53:23',
                direction: 'INBOUND',
                errorCategory: '6355sfx96bdi5md9g3yjouh5w92rm69p3lumuir9t8aj7d2klieb872u8mp3z2vvi914o2y21ipncoukgl25y5rpjbph9igwctr1zeniis5aq9c9ix789uoi2zwh4zpx047ctx29w4mynbfi7ivasikymug02fy6',
                errorCode: 'pnj0ov77oj9jyj2gec7a2f58du4k4q6w504drhue9lxkmmaxej',
                errorLabel: 302976,
                node: 2635384330,
                protocol: 'e675l5bmn8wea76kt3d3',
                qualityOfService: 'qwi0pse8sg1f46foekbv',
                receiverParty: 'ox5up2ki8jsburwk9s8v4fgtegfff9eeiwirpav3ecymqsyo1idhbugcit22sjfg9vi88tb1fvv23hg50ec4dzlunrtc2nfi9v8m51hiq04ctgeyf9dilm1dbk6be1tq6gkxf559cwmqrflvikt5klgd61j1r06l',
                receiverComponent: 'j1iz5lctg4jglmcuavqocwtz2byttnsayxd6keu8f00faayepdea5zkn092j7rnts3lz5u1r96megwgmh8exdzuu13xlksc87kb0zcm5uha0qderti38yqv6hb0oc7ewwbm7zqgbhazidwvpq2uijn8ddnn5hxt0',
                receiverInterface: 'gx2rpdn6t1f9r8tj5fh5ycn4gdiqyvhlejphsam1mmzllmihmb126s9gt0ah1ied7bxxw2sead9mw3jt6voe5s7n8ooq3jr054fnhf1vl1xsijmvqyzlgqrhzjsrdfahmmm4wjat7a8qieki71eye8vm9t37jbrx',
                receiverInterfaceNamespace: 'yxogl78o9zcwhwwojnk3jcmfan1s2v67hfjcvu6ek8q1nxpzj736bvpdm28smizy3alfvgcq8srzw6g1qeoztsn3bddztkovxazmse891o4ven0gj4rhu8vffxdpeoj3yqikndi94qttcj2nq2arfm4w5ivonjxb',
                retries: 4400639200,
                size: 6174829694,
                timesFailed: 2029761122,
                numberMax: 4699915186,
                numberDays: 6623726401,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '652knfzb2giog12zbqwh1nw5wavaeg7i1cfttyjak2rm59qdzf',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'kn2o4i09rkbumyqg4gqc',
                scenario: 'e64w0k15g06vn3pp8swkajafctdkc1ypekmdi3h2oxz3mzyxebkwj1lbca7g',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: null,
                executionExecutedAt: '2020-10-22 12:32:59',
                executionMonitoringStartAt: '2020-10-22 16:59:45',
                executionMonitoringEndAt: '2020-10-23 05:59:02',
                flowHash: '3vtyx74hj0gexasqmac50q20cee2pu8n1s9iyvam',
                flowParty: 'vswc3z3jxwkwp2xfxzvqv7manox0x47yng4105fdvky241g4pe7rwzfdxmlj1axas3xx44qlrwm80zfd4v4ok7vdwspymbxc645ixrnrtwke4t220j2wa5nzxstbb04i5gt3sap5r74prml8rwiyqxkow3rh4np3',
                flowReceiverParty: '59pvgx2mepbngo85qglpg2uqd4fbekt8scs0qyg2l7ikov3e7iwq2ubhyhw3m6205nwvxrsu1ysq2clr0koogid756lrdim6h4mgsg2rlngz6xmpm4tt2fcwimycete34km8ztlvsyqxw09ozuvy8pynx1nrbr8q',
                flowComponent: 'blosyb0te5z4r393i458pk3h7bwnuhvegum3ffmiqvswfcqjsn4g7n9aaz5v8tw888xljtywsv5uxmnh877719pks41x83ebehvpd6u2xi06u7ceb07uagtpvv5ffaw5l26s216ujz3kchn0m2st9patib7wrqk6',
                flowReceiverComponent: 'ip7pgbugb8hrm2475aisnm90t2ge0hcu5wvi5etz8aaz8ajm2iutxnv3l6smzvyrk9gakevfj5qw1e01awr2f2so00nj6wjtw07j5xbneoqmniz1mi2c1hyvri2jkv6am5zol0lk3df739xp5qgulouchu0d6i1a',
                flowInterfaceName: 'm5l5zzcyvm89vyt8cteb2604hb7b25snzboyu152tppunobrnw4p60tndswnclpjnkgtrqiaftu21i7ggqygwp83np5zjfqi31103k3ar38feogvy9wm9htlhwmpf39qvoy1qepgr25sj8xosgou9hopl9321rcb',
                flowInterfaceNamespace: 'kjyp58itbo0r1d1s5whjx7ve1u5pjqzqw8ymmj7de8hkyvgqf54vs1ffm5zfh7avgjwhxtohufox170yo1mj6at7mlaxwsxr87xdk8o7zykiqvblc3bo64d1veu7cbyzdz1n4dumx9j6u1c6ukcksuzuogzj63sc',
                status: 'SUCCESS',
                refMessageId: 'ih5f1skjvgja5hzrjkuratz34qu8m5uc0wlyv8n9fwtwe8mqwcu97hlp87jxe0tc2552dvhzemmwj72kktuy9bpuk42nxcqrrp2ztt7rd1ery3su7rrrdw9olfzjvzw89azx5u2lrveppbdfcvgi2ei6yrqxlwq7',
                detail: 'Sit quos et voluptate quas totam rerum alias quo totam. Optio porro dolor modi eveniet nobis et quia quia qui. Temporibus ratione porro sit nihil. Ipsa atque fuga ea repellat voluptatibus quis qui. Et quis rerum quaerat voluptas consequatur et placeat quasi.',
                example: 'szvrjtkbm5z491lqb9nhowzs8vx394dysduv1henqgxnllwoghvqwzi1lrb5u3fa3coxmas42wlmwpn7tz2hrowz0awmox7dexc9sv5dd6yv1l8bckjmt3ekn64q57xohsmwhnsa4r2nhjokb8nh71uzrspnenag',
                startTimeAt: '2020-10-23 03:58:36',
                direction: 'INBOUND',
                errorCategory: 'asn5hd90q4ba211ghkk7ev2ea00zwjaroqbqnbibnm46ntkeed5ei70og74bnjacn0jhxmw62b2nkjegkor3jabcmybh890svxpn5ta1803sikmjr6ngzi8gentbw37mbj8b6i6dxwighuijyur3xc5picpt5uch',
                errorCode: 'sc0ufnw29jc2ozs6onrhtdwljqz6uoh9zm08jgedwgiamf9iso',
                errorLabel: 297337,
                node: 4382976486,
                protocol: 'k4rzy2y5x0lcwc5kb67t',
                qualityOfService: '77l3zho5ii3rf5m49wre',
                receiverParty: 'k6uc1rv1k3viwqqgkthr36kt30c6qss14lavb9lnpi5uoar8tsp278boeegwtsx2lcfjy7z3gw3h4slfikawq5gdz48l1bm6v0xyppy4v5m1kee7qjpakvinf7ioprmm15ejr51r5yyyv6ojibrcj9ab328m3r38',
                receiverComponent: 'fwy6motut5a8n791nw46i31o79ccjgs3jy5qs69cxodplaacze1fii8zi5lf153sre8qckljewawsibk74st74qdflj2z178lixncvfp46dywldum0cag8apepf9b0pw91rt2u0t7f4psnuf9ay8garkk0k3ysk8',
                receiverInterface: 'mehsd1gwp392fl8c2c6v2z98d1e6uvu3vphl6j9vqvp3k388ami61g5zynn69jtjskl36qjlfwoov8yrx7j87ef5gaov57gmakvnbu8sxh8mrgkitxshj1v4ludyrrafkc6vmme34e1t384mqlr8213k2vem7a46',
                receiverInterfaceNamespace: '0clmvzgp7jf4i0fp7oxbxy9n5652optmgd53jnnvo9vr5y2wgi04h24qudj6mb7pr5o2ad0udv14o6pne6mmwdrxsn1kl1mqko2jmiu28bunphyr1iuw268uht0fcuycdy9jdhdawo7g4ymhbshgv9jxxd3p6c74',
                retries: 9689809699,
                size: 2430158941,
                timesFailed: 5307125187,
                numberMax: 2029280876,
                numberDays: 2807681557,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '67pbe8sac179uu56z6y9kyvcktag8cj0qg80xoesnwyiqczyos',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'dfw5ln4fneljzj98jsf4',
                scenario: 'ty56q9854p89myqmfu7ok4x1d06y1l0478u0c12onbhf4l61cx561g90dqn8',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                
                executionExecutedAt: '2020-10-22 17:20:08',
                executionMonitoringStartAt: '2020-10-22 21:56:29',
                executionMonitoringEndAt: '2020-10-22 22:05:57',
                flowHash: 'jpw3io3s5kldr2mp9dw4x9c8tynj4ls3f1qqol48',
                flowParty: 'nnbrmn3o54dstrubs7j9gqe74m8inns2r6c0gavrspj1fv71ciicwrgh3l8yq1469iqnb4ci6xjpfjrnhs8gppbyacurbp5kbi7hrl4j8q39imdiddoyauc2ldgzwtvao2cljkkkev5hdmunech5kugezkqm3kl7',
                flowReceiverParty: 'mj9a2rn6lbniu4rw7sjah3x7xpqbdxk1d6n88g3bvboymvjnrzd8bidwsit65h6hpd21lrtmn4ewln2u8tcnmywixvsewrb2bseqyx1ah11t0ggruek7gklyiqryjohhz97c6efsongm24upf37m4seusp89uyx2',
                flowComponent: '6ie3com43ocu2dggyxskh2vrpo4p0xa49rafy92wgsrjyahullqz5yipef35ipu4a00p0htarsljoeanifwfvjy7f1n0kttxg7itj67ak4aa6st5lgan3r9ridh8gtw97763phjd7ewcukkkg1hvb6najeum0feh',
                flowReceiverComponent: 'exdkpihv1qq86he3224reja59u1xag9mm8f297rc528tur9ox7jlagq7ij8mktskx9pj1nglckg2z3x0gq77szqr63ekl1vkwcz4rnxy09buk0kqbwmlvdtcilx9e0tsov7e41hrua2yc0odtrmzwj19y64xjm8a',
                flowInterfaceName: 't0xx8tbfx010elcj0ohv6rz1b4gavo363k6la5uozs3almmx353yasp48kkpto1ofi35bld6juvz1ohe9n9mme9gfunxqvfm6ut47wf262uyxun7uc8b8mqa2yq9jrlbri5q0vg61oukf8y2opxqlc1h1rqcmea6',
                flowInterfaceNamespace: 'j9jfuup306k1vid4kaubiihdtrcqii2pl922i1heonw9ng9hya02udy0ieyjetvx0yctboqak5t5eit43rcziitvzs0c1v7kolo6gzqn978ch01fgda3yisa9mr7hijwplenn5esbhc3ejmpwm7s1dyhjbdxeev5',
                status: 'TO_BE_DELIVERED',
                refMessageId: '6hmobyodjiwrwldubc50khj0hm3btgfjikqrp3fbzydsvpmicep5g0dar6zf6gt07bh9g7ckf9gu170kkeqvhryw83tt7i9n09t961yp3fpj9ird5eik8worb0pyp8sl37y5pnhdf8ujbgmcooag8gutv9iu7d07',
                detail: 'Et omnis nisi sequi quod ducimus harum earum sit cum. Ut et et enim est et qui quae quia. Sint dicta dolore eum cupiditate voluptate nisi voluptatum. Ab fuga exercitationem voluptas est. Libero perferendis quisquam sed quis.',
                example: 'bkbs8eatk9uer6fxlmkkv9t4wmkdxkw3xamgsjzrrk1ifqsk2s54t8n91tk9bgnrdfcn33k6jn8npk3to52o2rcezwn2dq8gwnielr7g500ann35aje5fh6fnej982ktoz02g3y9pa6bskdpp7ywxwbo6pwj2e7r',
                startTimeAt: '2020-10-23 09:06:08',
                direction: 'OUTBOUND',
                errorCategory: 'u7pluysl3of03z25eutfjiciqj7ehcc0zoq4pmkshc2k10ucx2adsek8o16hzu3e3m3surgz8f3n0caswu0b9v6ou7ctnjefqz64hcmwy4wr2adxh74iwnw991k2s22dydaxtuoxtvu7cugsvgu98r2xkoj0a1an',
                errorCode: 'f9x6i2moxlewwbgd54q4e60ofdoka6zetr1rjjtrnjd2t4m0a9',
                errorLabel: 461140,
                node: 5865269497,
                protocol: 'du1ic60f5vde1fy8faz3',
                qualityOfService: 'ksmdo564ooltf0zbglbt',
                receiverParty: '75nq18jb4qlcj5eafamr0dxy3ov4mb9f3zkvgv8t2o621bvvt7rlqoe5b9vfowar6jf8n86nb9fxgjqjubuvlfeaeor6rjiy7juec0jwjtg0auelgpln5l7lgynuq6ba91lnhltofpznc1ed0d2k9rw7kp4uopk1',
                receiverComponent: 'hmvl7bclmgdsqzl6w2aqus4tzbahez2ctdi3qnonwgg2jo748d2m3ry37n4b7k3nnebptr30c2z4zef077mpn0hz0wphj1s0mrcs1vlat39z4nd2ektac0wlfi0zz6x8i2a8daqccqgmcgsc5peuj3uy0sr1658a',
                receiverInterface: '22mbjjeowqzmqqubg155zsqhpcoss8oy39009ry951wmcfa69j9zhnkrm56bsmxez3pakpp2kegdwetbdnt6iq4jp7iut0j54d861nqtiamejcudjgihs7cc64ij49ii2etr6hnrx8ixlmz0fefxb0rxwj54irjn',
                receiverInterfaceNamespace: 'f123w81szy1qyz56oo48i8msbxxafkvn2yjy0nfqpkwvd0qo4zuipdhmn91yelv5dh1z3pzmr9bkuk5igfg71isltag0opnxc9079cwcszn9fh14dlr7alcdzt0ot3887ui5979m121738x7rfyz5jbd1mpylik0',
                retries: 7521101714,
                size: 8026513171,
                timesFailed: 7783425413,
                numberMax: 5602762425,
                numberDays: 9383195646,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ye05qdo5ghehvwy1q8t674bllqze7ewnsf62w2x8s4x1ltxsqj',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'marenmpw5fbw16snc0m7',
                scenario: 'xzg77wqwn5l20tqj2ps3k63p3fyeoqell2jg7e4r2y0ndkx42czkeqk3hfxz',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-10-22 14:26:40',
                executionMonitoringEndAt: '2020-10-22 20:55:18',
                flowHash: 'sqcmj2eru0frgrmr13fi2c463r9ai7lgd2awpl5e',
                flowParty: 'nvp8hjaru4qj4z8yanwxcvnn58q7rtl89bc80w4tvc8azuv81msni6etlk89buk29k4pd9hg9o2kipums1twzw8wa6dnh8qh41i5nhp7c001cov9fq4l7p83l2fvt7acdx2kirehhyqbua9h41us5m9h9peskuct',
                flowReceiverParty: 'xd1n2ojal4ebqlakgcn5zrhzvgqw8r89bu86ehas5f9cwt2wisotm19wi3qrbaxiaja6xorb99eatpbfoizogqok8o1ap48nvokx9njtinqvf0tkhjq11mb0karrvglq4lejlemjxz8pq9pszrq3xu2b2hdc02h9',
                flowComponent: 'h2bf3jqbk0yevyoqkkzfg6o0no1diwbjsxl0cncoha7z7rj5utmyefezfgr82l7ylsi45w6agf9vjhkg72pup2djhdqlt0v8ycqlhzlvmzeg99iud1i4grw72pu7srucisswm05eat4se991phh24ducp6eg2wll',
                flowReceiverComponent: 'iu25jc1b3xttbpr1dtga0c6lzawge7it5ct73vl85vjl51r7wnan0kpoafuznh1k87l51bjjbsetohv8y7zhvvi7vr8xzjuk954amwjdvwy8z63dl44ptqruveuw9xldi4wzq583q28h84gx3siy3xjrpkzb7jpd',
                flowInterfaceName: '4b8iur5l9w5fr5xxly95wljd9zz6welae39y5a9zbecsemp7986kk2zbgj0ieypfljsp6krajz48jdjm0amr5ux0p5y6ezj3ao4oqcqp75eudy5fjzpulh2qnwp64u7udcjxyadr0r9ejf5amode4akvydrao37p',
                flowInterfaceNamespace: '00ri3ljgamptpvaf2ab8hacp9uxmfvpdzncaj2asczoa1csu9je5kcguntr44b4cypgpl7mqn94m8ziz0cm11k9rak4yuvmexh213cok5myarwk29bh3l3rx660noq56ckkap52u5qckyh9za3paw9cr6nbrug3s',
                status: 'ERROR',
                refMessageId: 'sa7b34hrw6w7c231alsh3tuftrwk2jh4bpdzlswuyqf6z9h3mbkedgud080rdspnjey2lqfsivdt8w7ms1b9kypce1p7znsx1exzijrv8kn5sjwmfudegfvvm1emjc9p9xwcth3bfyn3kcmnzu73isi5hnlx5wg8',
                detail: 'Totam perspiciatis consequatur modi a vero. Aspernatur nihil porro ducimus itaque. Qui harum sapiente hic qui labore. Commodi voluptas aut sint.',
                example: '72jbfi9ulkzc01o9qxhg810e7zhaz3xbec1q4vub00m9qcpzoolc5mhhxro7wujgc4w4ab4wwr7hdno4im2aj23e7zohy2f67by92f4abhdxt6v1v96u7is7aloqc3x0pjdbrwf8k5o0xhltomgpyn7jvlem2g5n',
                startTimeAt: '2020-10-23 03:45:04',
                direction: 'INBOUND',
                errorCategory: 'godmvb2xq6kwl7bkmvg09wemftkhhzn36t4gnn8600on5fuanf3chiu7mxdoccefhjbofebhu49vwfqkjog1gi1s6gzh0tm36eng0fs3785t5udnd7hufqphybe7c1f1wnovvqf8bx9xlsqe9sby2z1wnq18887u',
                errorCode: 'sj32nximwakufufbjovj70pgjpxhkos0hjua57b6o1wydrf6pr',
                errorLabel: 137808,
                node: 8767235945,
                protocol: '52wa6hontwmuxsbskvv6',
                qualityOfService: 'ak1z1q8dsklg660yf3vz',
                receiverParty: 'xkgw0y3a9pzk24cl71oqylbqzmgmur3me1yw7fo0t3aq1ze3w1kp4hvjb34e3gt54cutn4ptpkjxcx6g2pkfjjh56gg84uq2mh7kvojfdg279bdcwdeg75i5uwibrn6yj9zjlf439wfh1yobwg83etdzrkl90w9g',
                receiverComponent: 'f9gx4e67yh8x7jbytg95vpkjk5rjmnhwrdu7qn7ot1ou8x3emp9t4i09myilndnmxzm5tr7pys4vh5safdzeeqpxjkw6cl0weigovzpjmq0qfxf1kitlf7ykvlxnhtsic4phzxwt77neq2re3mjggpdh635142y3',
                receiverInterface: 'uvh1qgrlgs23ydqg7t5e15u4bajw3fnbstq2lr5mam7fa8o7gll73cnosb7a46o4s8xrf66q4sg9ygv2uzz4iwf5rlzdlqq13sp151ldqx5f7c9veb82r2aw856oqd4rzjhyszg8782ek90psmn7yzesgb7a1btp',
                receiverInterfaceNamespace: '3vuhxtl53ohlmvzli2w6rzmqk9sp8i293wcgh1hk1nhot19405d5tj63dwgc1mj1a2jro0z5zne9mv45qwxkwfbt5woovvuiulv89g44jumsvudmxh10bhx137txbtst7wwdvc8qczvsjfm3f2821e6sg6c6adis',
                retries: 1022373741,
                size: 9665892420,
                timesFailed: 8950319735,
                numberMax: 4591272357,
                numberDays: 8650432979,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ep3v8v6pqmklylq55jq99x3w13au7j0a53yzgylswkh78b564d',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '9tj10lq96ol9h3xwy2t0',
                scenario: 'mwqkqkq9kisqzvqqzfz23umrjp9cenbylszq2aqjiyw3gfkkja0wyuvcoo8i',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-10-22 18:17:25',
                executionMonitoringEndAt: '2020-10-22 16:40:29',
                flowHash: 'ail656dg70arzr8o6vjdfjhizncd4k2lvf0n8uw9',
                flowParty: 'jm37o37o7gr9gdpnjr4p8cbxg7cm2k1mrb6jx3cbvjfobqigwxgu4zecd27vx7dweof5rhrwoeilxhvmets5i1elqxu5a2eksweefm30njdkjx70bqjj0tma9skjp2bsw6jmcez6dtop4xleogpubsrc5ob5kq7r',
                flowReceiverParty: 'o5cn0wrcdgmafwmj3npdfmoegozlkzp9t9s5hi518o151fjff98wvt5wdbzn6u9rtn5ri4h1xhhxbry8c63a0durrywns8jm2q9oj67hofqpskd4n704a01ozdwjs8mboltkk5kz1avf96m6aoe7i4ponxc7typw',
                flowComponent: '3zri0cask8p4e5m50s55oh9bsf1gsqtmshpd10ka23e40dx3ys18yjs9t3gp8nzkvp90stnakvn1i7rvxl3nvwh5i8ed27v1pjndqzbf60hfww5jl58faok6r7vjxhwnk4e6aartenq2yysqoi27fj4wjfugpx7b',
                flowReceiverComponent: '8z90uxeeljtthjdasitihjtkirkjipdsawraaj01wyvuixrpwnnam1a227wq544bbwbk31vbg2ro5hmfouje4qnz2557irgwhxevtuwh8urpjyoopk4ojp5ed057thx5xh4fnfvyohhxkwja9nmy546ph4c5uq0o',
                flowInterfaceName: 'vr787hcfy48fq2drhmydwwqfkrgwe6jo6tievu8gocmrkyfp5dzcjrpjf7e94dmyusgqcxala6kkgk2l349zd4gv89i5wrrshypph7i8om7b08034js32w7f1quvi9i48ixswgyi2infy4jnzgcb7qgkg042tmea',
                flowInterfaceNamespace: 'zpq4jbgxvsdfmalv2crb8s6tvx140jmdbgrz6lrbvqkvoadaw1g3mlzm2qhaa3aehjznumbxn10vj9av4l30onf31upx4vgb63gmkp8sr1gn9bv5yz6fxmr9xoeh83m1sfy0c84yeu1xm9kai934oyxi2pz5x1og',
                status: 'CANCELLED',
                refMessageId: 'gsu6obehd08fjmvmlq8cia74anb05d35tb1pukilk7bi0aiknq0t9y9lr8phlzru7s612jw0t347f8gsm6oj9jo6hpls2b8nvwai4ukwkloywgog12njwqmeloolh7bfqo3erc9sq1i9r951cqnk9s2ctmskilfb',
                detail: 'Accusamus sed sunt. Doloribus cum ea at debitis occaecati voluptatem sunt dolores tempore. Non id nobis autem excepturi veritatis. Sit id unde.',
                example: 'hsffesc4ofk70jltgbvfphwpnlcwt5277ya8h4e84wo5nl8v5no3gtbneh3ekehe5gr225ykwsfls5d8w15yifobudqxc3svjud0ne6jv7yavhh1tjhjynm45netgorabnoo10omfto2a3vp69d6ssum221out61',
                startTimeAt: '2020-10-23 09:56:03',
                direction: 'INBOUND',
                errorCategory: '6qveyof8117lzvolh538j0hi6y11tomeu6n85944npynbwebzi9inftsfpmvxcqvyyrzxsv3lz1b86vdskjt0wxzaj8fzisywqhuwphdgdw59hwyp6u8uaiv2y4o1n1uudwtvpkmjanobiu62183meekavgo4dlo',
                errorCode: 'osp3nugfo9phoxv4gtrravniynjprolp6fo9mp8gcbelm4vvnr',
                errorLabel: 148684,
                node: 7000353817,
                protocol: 'umc2ioj28w03mwv6m37q',
                qualityOfService: 'wkl1fvpjq0ezpa21dsl2',
                receiverParty: 'b0xkrzm353ely1io79kon4pc5vekaocb2t0zxboxea4mt0ofvds4f8ijmtsdsx9hmaxbrii1ljmhecklppgy4jt38qrf8qgwu969ql8koq17bo9ap0pkh0siy6jtw3rj6wf5dvzrul1vfxagdgraf1rie9r83jnu',
                receiverComponent: 'zr8w62cyh0bxjs5h2icfb9j8l30ssz5gij07pgfbhs1xxu8m647o56frwr3cej1cs05wjtndyt3hlu6ovkymk0jvf2x5kpsapzf7cz4920xndnclm7vse39n41bwfc4fndvgziwosbm5eaf7y56liaouqspdyrh4',
                receiverInterface: 'jrbxourlegr07gt08honyvchx8buwo64so86ixp76y1n3xkm8surmw6knk7nm007unb6d7cvmbnldk74lp42raap31bg76xtd1cy2zc01zkcu3n8lvtqv2iq3lae0fpdar6vim29kh2fv7dtnfscvhj2t9viauq1',
                receiverInterfaceNamespace: 'mqjimunxefmvfw4drd0lqwuem84oigb3j8pcnrbwjw1pe7by1bousy258ca1tjfhfqcxykojo2nmmp2w90n8n09pn3zcjr29ocz49x42fnl8o2kc6iim5700larg8w8b7xi22qx80q1qv5yn1t5ey9v9kpv2d9qk',
                retries: 8117408374,
                size: 3574543174,
                timesFailed: 6634782699,
                numberMax: 8865350714,
                numberDays: 9148951810,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ibwohz0v9wwk9nmy1c39ouwnesh52fp2vv0zmjoww1zgvdkbka',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'tpqtfi46ellqxeqqwz4a',
                scenario: 's5l3sv5k25tr4uxs2zmi10xsnyn6vanitjt552ud2tr24gf64opwkdam4ubi',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 23:15:23',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-10-23 10:18:07',
                flowHash: 'vqf68orx8tb6wwyps9kodneye5xrqjfz4h2sndlc',
                flowParty: 'wg9fdoasui7fltcj9djjhlhwpy5xmh0v94ldxyjm166ypmqbrn0vor9hsta3ak92et0d0b7kc18cuk5hj3cu9lnqeu3zrb91o26njmqjruc7tsc2gmhbayygg7bl1fcfd7niy5is6f4b0q04q343lkbskdhqu5rt',
                flowReceiverParty: 'nuxvkvg2x5e3un3gzrfxtf3zhqrlq4s1qqxuhjqqpfm7ppb44oeha44egc2uetokvly21n9cl8s4yfzbloqnxo6pifjqdgiwfaei3snmrpxxzk7zsq7fiwdhyyinuafw1tj3rykfhtkusm8r1fcbmr3122smk08x',
                flowComponent: 'pmkkv5uz7pxlbwc9b6lrtszqs5wb3dsig4i52b854g8i232p6ze888rsb9btwxgv399nutqha7oqpt4aey4vfkjxev87nxg0vs4tcit7149jyaddfwn8avsrh00jfnnenqh8h324bf3yjuhvauzq35ojpmgjgoc8',
                flowReceiverComponent: 'ji89oqhm6ff3huhx76hcbnov54yz3qltwjqmy4ym34qmgk0qblmcum9a6olak25zwa0z4l5t39oo4uo3v22kh3cybvamxcdbqmvw8oxezq1whua58c2o2570c6420wxbaqz3urz829rdxrwwhqhn9z8sx6chx7m6',
                flowInterfaceName: '2tjkeint6chyh59wknpb17734g2xyqw5tessho9h5dc3lh06mnt2ptsvztwqy41vfv6p351ohpdlnkawmlelxceg85tf9aksim5mrnusssjpb2hwrwbzj4numzn4ztim3431u8cu3shm8cb2qnkbud95mt9zvgs2',
                flowInterfaceNamespace: '6hp369f9lmweoil0xgsc9tgk9j0x3sgxb83ao6ohf9az6jpjisu0l84v63s61vqoe8t7h4fhevtxbkr4zoi9uurqcsggud87ta35m6czhkxv5llibbylf87ssg28gx0465llm1ed9hfqdrxd2asx4bglwy8hxovz',
                status: 'HOLDING',
                refMessageId: '52hr7f9jhkmppn2x8fafjif1p83gz740lge2v129ggposiatp8i6z5j9jettwvde8bgnlxxy04yzok9rkqbt62yqrqz6ytl9swe1zmnj8sthfnuaoowbg68gvlyo5xfeq2np8up7ypv1zekrsz1lb25o2iornr7q',
                detail: 'Sunt temporibus quo atque qui. Unde quam accusantium ut delectus vel. Temporibus nostrum aut molestiae. Sed veniam magni deserunt at facere et. Quod eveniet occaecati itaque ut deserunt praesentium odit. Ut tempora dolores enim cum nulla vel dolorem possimus corrupti.',
                example: 'cdctbhf7n1qirpk2r1wkutn5a3tnmy1wn2n7xhabajx6n6qxazgj1rkgs6z4ycidzw9skh9zoe9finrusx0lz0959wb2rq4gpizs35uz8fqsve9f05icg3xvaqvj7wwx7ttb0tormfy8k9fqk5vjcsw2n515j9v1',
                startTimeAt: '2020-10-22 21:50:10',
                direction: 'INBOUND',
                errorCategory: 'pc5dxhq125169k7p1wjkdftnrftpjl2ybfia7crnwqowjt967wtlr1ryyub0sr70u9ga2agrhw8rjeaftous3c15ghhb4206ts42u72zric3iyexvu7al5yg26oomemuz5xvf5f5oqfmz65wlzzsuumgusxsq2q3',
                errorCode: 'oo65v9avd3i1vtpz3t3y9udmi06jatw0y6pwoxqgfgacwbg06z',
                errorLabel: 395289,
                node: 4691970631,
                protocol: 'i7986z13orzghzmnps3p',
                qualityOfService: 'tvla664x2ynxml2siwox',
                receiverParty: '4y1oax63zaqmsfjblzeuzsb8jmwwbmw5vislonh5ltcze52zcpjh2p1rez5hz315grt26n9puam1qw5x6l84c8cqebdc719gu78jzwuu3krxnvod794j1zim3x8hvqw674tqwry1cpjsl1g06ak97bret5jkf53e',
                receiverComponent: 'iagsp090jdmsh758g321o8e2wscm7fc85uosija8vswu6jqad54d4eqf34vpw45indky09gvb3cnypgy1gskizg4z1el89at9mo96c9fgiqjqudi62f0938sgwpcepsxw527n53uvsedftw8glfulaiglvgtjp0x',
                receiverInterface: 'u8zl5xwvwxvwy7rhn07aiqxtgxe9wr3crgblj3ahmbmgf5xvcmljc98742nw4q6m5ybpevwdl3f5driygt960z9rgkfzr7nrkbhcfswzgh636en84n00j2k99h7ijk52fp70wmbim38orwth41a8n7ird9ts6nzx',
                receiverInterfaceNamespace: 's919d24ogp48l2cmnt5cy9t72kydi5aj9527dpufkvbot3bpoux6wl6aoasks1r2pv1awug812ppkotrghfbe60uoiiql8r1mmaefy4q5fmgh0ntcsh5v22q4e8auw62q3tpivh41nqa3vvygh6062u6vn4n4w2e',
                retries: 7707854467,
                size: 9031580068,
                timesFailed: 5627895072,
                numberMax: 9675067079,
                numberDays: 2957699578,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '3jaf5qm3tcc9ee3vb2feogguug1q0o2q9vqw8jpxxm7g3dgl09',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'p9c8se02bld1kpnvjkle',
                scenario: 'ru7hfs3i3jfaoa3qp1blglzts4q4b57u5o8hgss48imdbvm7ec9qyqggthwg',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 19:27:22',
                
                executionMonitoringEndAt: '2020-10-23 10:30:06',
                flowHash: 'np9l2mdtfmjxekttx478kyf850xpxp73frn8kgnv',
                flowParty: '931u6lwpvvk8c2tzficb72467l9t3tlxk9xvnowf82lxv9f1hnff4lhmwz7p84e9ewoddq1lkw4fg3ck7rh009xixt7ds0kv1qggx16mi4wbl516prts1dwtulozrdnhs0d9mwv1lym468fhv1zk61qh771numvd',
                flowReceiverParty: 'cxrlzo2bti8xezghsimo4y8zdpdcp0v8cmoxunfzqb7l99kpp1flwh1sh6x9vgvl9488bt2k94n8xua93g160j01txf335lfgfmd9lsfsu13kxhg7uzh4hbh77z7cj4gxpraeqavlhzf51691l8m38kli5uui2ku',
                flowComponent: 'p59jyt1gbnbb5lppkok96ckzpfeuyhwczv47ohqx3zzb9m5acdvb7sa099ro87oyq3ft8lgv9bat0k5hvi0rk10gn406n377obdzgp6qag4ncajut2xx15rebjegaomeji7noq23yoppcfh3jz1ssla5gznwpzwl',
                flowReceiverComponent: 'zksqy6k3l9o2zubo7zrs42ubwynh86i0sf48trox4c9iyfxczh574muulblguxu2ids49g0hw7ts5s7bjp7o46h4pym9m0cttg6y4ndodqa5qkxwczga5gd5oaa3uxswymetufz68b93n50qtv3jj30sj8qtq783',
                flowInterfaceName: 'elcv0j1eqq2q68rw6xiyb6l55a22dn3p6lasyg1v1fq1yymsni5ph594zidtwlnz7n20nsgkggzfq0degz6ch21lxm30w0q4lsokwrdsob6as2kf6bqrylxiuviknq10rh8zt89t2qm19gy3eb7xmaugq2wkanhq',
                flowInterfaceNamespace: 'rvxe9gtsrxdbfez809uc07qix5xuj820ml8ke02nx88o4f3mtkup70aqsnbl996h7ob1igh0mbzjf8uv4he3bcwx0m01nnzk2emcm4sbu1748h5d7fxyvm479ck5yenkwa1fsy62rte150056eg1rkbjuogdg91m',
                status: 'CANCELLED',
                refMessageId: '8lnld03x2f8tufnxo1tvkc250zpbh5nydk8dvm4c3l6ta1qa8ul1sn3hm62ze08xc8dfsut07pa02zx2avjhi5wvgv5ftpcwmpf0yg2vg1dd6q0fb2x3pj6vjkcy1s0f4dy6gfxrcjljzrtk5odh8yafe97ss7d4',
                detail: 'Voluptas quia delectus. Sunt alias qui dolor fugit quo. Aut mollitia dolorem deleniti corrupti voluptatem minima. Dolorum deserunt quo animi voluptates saepe in omnis.',
                example: 'ukqy224b42h3iev2ewqmecollvgfpjf99060y81i7199gp9ykqknwg4qaozfvvadq3u9ly1vp78a2n1q0jju0ak2zw1n27zt7jwojs23l14easgbkrxx6gzzchmnys02deeaob8wrnuox921e3k5tovyt56tuk8e',
                startTimeAt: '2020-10-22 13:06:55',
                direction: 'OUTBOUND',
                errorCategory: 'jf6efgl4ah3y7p3a3ffo05a0xnow2wsugxdwy6isl6bxrmpcba3vydz1ei58u9px7z3xkuhenn1ea3hq70fhrw0rn6anbjvbqyxqkxln967e24qv3m2drqyv2ly5tuex9bu1paxwsavcs7vyaeb00l6r7s5b68yd',
                errorCode: 'g2iwje9t8loyuj72w6vdt17z0yjh42hrtlax0ub4note507zwc',
                errorLabel: 429717,
                node: 8046494564,
                protocol: '9zto98qh1osip45uwjbu',
                qualityOfService: 'p53o4axe39bddk041tu0',
                receiverParty: 't2wbjbnlwnsmoal90hv2uztiiaj5pmb3rrzph19so9z6slh0578q0b73vxzsfyleyru5pbuewzthtpmph52gy9a07rsem0rn9mdwlzt75tiz1krhrsn4hd4jw28blhyd25ze4tgk6ly38b7sw582ic58hetyk003',
                receiverComponent: 'wxrvygbdurmyfs8c18xelao7ax0ikhq8f36rfjycgw6e7mxqkaoc5mob1erfzhez2qjff5k2vchigg3jllfnj1qcy9l8eqksjyn1fsb18etv3gncw63plnc2qvk0dm666l4do08839amxp9o87jcu2ltufjb7m3p',
                receiverInterface: 'uryzb8bzmj1oszki21myevjjks6g990apkojwpi7825vi3g75x5mcty7eell1hzhny030tbw50vykibommovujwvvs4xpvcx1fzmj97ns8b4ii8tee5m1fmxc8qyqomnmm9642ccqkuh7x4xdwjpwfglz8oouc2f',
                receiverInterfaceNamespace: 'kknhshtsm42xzrlmni8migmt68fvgnxt20re68vw9h5s9zd76tdpx6ua7zywacxlfy0uinf5ogcm0n56cc2m0nicqrkjja4m9y7fwofak245qct6u1e1pv416udngkukxo48bufdjr8i1lly5vq7cukysgshl2l4',
                retries: 1673702803,
                size: 3519275130,
                timesFailed: 9656994428,
                numberMax: 9143062475,
                numberDays: 6154344751,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ocsgbkcguxx68l15gjf3xjlgadrgp7aa3d4nr7y29ax5jhpgz1',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '0foyw99xmvs4vlgwgs4f',
                scenario: 'e8zpbk49dpdosnc47pw5mxt6o3p5yko36tpk4n9w3jrkf1koeoj9m9siswl8',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 11:11:06',
                executionMonitoringStartAt: '2020-10-22 19:29:20',
                executionMonitoringEndAt: null,
                flowHash: 'ar7c1esc4tvagxbn13ld18mun7121mranavj1mvf',
                flowParty: 'a6rc572i7giv321pyc9lqle4a4xril0pwbwdru0d256tftko0avw9hnvtbgcekcifa6bz1urbv8xzs873gxyljtcugpwrpskha0kvz50ui2ltpr3ii4bf8x8sq1cijmauotzheahqenqxoi1ozl3mw3yg0yleykz',
                flowReceiverParty: 'i4ia6m1dpq4hbocyp300byktzfwnacn0j30n8ffrt5zxy1ahvz2v93owadkueiedix01oauq5ssjm6md15qq1281dbmk6cqzj0desj2f62ablqn5flw4ebixdsb9vq8kj7i44cyq9c39rwgszoapxy28hz1hbc35',
                flowComponent: 'f2pvkyaspe6pc7ch3524ntk5rx9i8qu57zil49f413duk1p51s2wa4rjstpq56fey05m4euxwhsgpb63kz491td782k7itamcqdzuf7w9fip8el14m7v5xrg8no9ymi67i9rgr6luij2bq2679xd55frfca95e49',
                flowReceiverComponent: '2g4g1bobluyimchoqtbhg22ldm6qtkaq33ztmqlhovac666ptsbbvcum41re9thpbjr6sjul07msi79gj2ctn9wnnzyf0h3yntrugjrjadrivuat8v6hydw55qpysfklz369bj8e3w0jjcdi3no8db303n153his',
                flowInterfaceName: 'yrzeqn7y4pyu08hmvslthumwc1pxd2hoy9re2s88ah6cyamymrop4xc3weqw16qwiijqvesbyxk2l31kokunutuux4rjqh5od9zzd1xh3m9tm247ljyv865lum1ebje3su2fkagb5rkolt3rk6zvq9tm3zspnzc4',
                flowInterfaceNamespace: 'a81qxrtn2vmkwmkuckdsgdaxpnko73ubahbjxzypc0j03oov1otdeugckrit4zyne5jnoe99klij48u06ij52oq5cxjcdydf7g2qso1d1onun6joid70lhodbwgzhwzrc1bnvz63csd0qsh3pecwzujx1fpcniol',
                status: 'HOLDING',
                refMessageId: '95ihykw6h8yr1lb51lq5c9muynl6txjw6xm4gd3vc87id54z86fqogvt8wmjlyir7ur1vg5xgpfbqf3ofrubw9s5gog8qnuwnw87o5qn2b0rr1y26phyngmyvmgsfyd5mn7c6hciintur8fogyx2dojg1hhzw53b',
                detail: 'Non et ab. Praesentium aspernatur voluptas unde. Quasi qui nihil quia. Tempore sunt autem aliquam veritatis architecto nihil quia dolorum odio.',
                example: '0gw1zgkb9w8b99y9n38gejk6xrofrpcm3qodwrc3jjlwf95rprq30k9usyh8kfybwew5abqin5tdptxdo83ip5yoz4g074k76ctzoy0wbgrhfg8x3jbpuruy1ri3tfju0k3gmv8kxb903ko2shtq7ybvrkj07xc4',
                startTimeAt: '2020-10-22 23:54:16',
                direction: 'OUTBOUND',
                errorCategory: '7su1xv5d6kqst03e4hxbkyq5ym3miidrp7szah2o6lljo73vgm3aermt6rt4rfwnwadkpq69p857u3n1dits5wsp11fg4elppzyc60901fz4hclgxf3f2krhnanrr9irb7htv5wsbgqbk3pxccql30d4xjkuftna',
                errorCode: '3evosg09voreli4bjdmydm1nloyqo28myt2yledimuh5ec0ehz',
                errorLabel: 418695,
                node: 9495459933,
                protocol: '96fiugfnvnusatzjhw9i',
                qualityOfService: 'ydelnw7sa1lv8q4kgqkt',
                receiverParty: '5u44fw34y1p4oxq6rmjc1lwddk0hj27ei0cevq7wx345sn6n48lq7r74jur5bc28pxdnrg0v63bnpwrw4n25e30efyrjp68kfo5npgtp7zfgr2yxpnu2midl08orwaf9loimeksf7bq0pehimv5k8y3dlwm8l9lt',
                receiverComponent: 'nlx256pxmfhbukuo86o5ihdqthinckaofbdjyjcckjuqljky09msqnafapqkf5rc5sgzv0p1bp3zih8ekwkfnjr6h1ib49iri4f66puf17gthsml5v9fxpsr5ffgkm78wlejx6ddc8xr9ekpa1111ce6pm3cy6vb',
                receiverInterface: 'ojisyv32jjvoj2jon7q7uscyqxr64cll2e8wmcci9sezq9hg8cha5ta5fzy8xi6b6r037qh6g7osdwakdkxv214mlv5two5upj4i77h4f1ij3s87bmka1w9lnr41r1pgqbuu4cpk83hia2fkko9e52qfy3tybidh',
                receiverInterfaceNamespace: 'gdx7em2rd6g82vws6xxas6qz4sm2q6bm12zohv0p5c00qxmv997aq3d787hpvthuk8z499w85abc5smavctgqhzk5ttqqtk0esehbb5o0zr6zbn1mch6ik5eb1v6eflwilpur8l46p06ayj51yq3bgdny4lzkguj',
                retries: 9477206727,
                size: 5877392752,
                timesFailed: 5005986495,
                numberMax: 7813086874,
                numberDays: 4053951277,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ah8do9u2x7bi7c35aao2j20h5dd4bnafxlas1cma2j61xvfnm3',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'jzan0l5fo4m08zbovpn8',
                scenario: 'huu536ktnr7w30omn6j3lk2aeo8huzpom6zplnvkmkdhg969m92yz9xx6gb4',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 02:06:22',
                executionMonitoringStartAt: '2020-10-22 18:58:51',
                
                flowHash: 'ckg8ay9armz68s58o5mju24fq08ylhvye3z9bp4i',
                flowParty: 's57pyeg4msjl1x8i8sstk81opk7w8r8co93g6kn9dhu0nk7dc6satqfoz35r6fmdb4lb8f8lps36onaubzv63xq227ysrcgfi9b234a48dnvffwrovjpij2ets15txd7e0ivr2sdgziaga4s2df12x0yjt3v1v4k',
                flowReceiverParty: '6h8hmrv7dnnch5dycywqfx708e4exzi6mm3lum541ia42s509t9gmwsqdswd8je48jccyvv6jdhj728yefwun61ufgs98hhq0yk3tcd4shxm836e7o2gpzlote0tt9j3x7kkcryruyh9rd4fn3anfz71chioau1c',
                flowComponent: 'vtd4oixl9h1b21job4ox63fy4kd3mewu75nvms05jy7vnsvlip5fss7axruz1svbircd47au8hsztymsuvw2f66zen6zeh3k8clvvwqr7hrz3bh6codf874ina6se8j8k9g05yoqmp055gb3iegbg50ltkjv3xvj',
                flowReceiverComponent: 'izfi8ys1xghsnkuqw345uxhbrxwizlds6la8o6t9pgaditnrsi4zckn4ai6f3syoayed7ut952lztkg851h8at6jdzpjieb3izvkof9bo77pdo94f0bro3x0caieqjpsn7b6iwvqzeum7i9mzdwxz63ctbp6cqx6',
                flowInterfaceName: 'ecx7bg53yik5uy1886z080m6ehgrj3nntjtzmuq5ocstys2537yahivcu2ybjea7y54o8sey5w52st06msha9o9y83ip8gjsjedvir30pecnf131l6jsbf56momg5zzglxv14vlbpw5vw6tsjwjztx8ndh6ig8ob',
                flowInterfaceNamespace: 'uyzoa0okfa5taodae5uy96djed7q3wtwm1hycz3m8hh3pg9cdwvakjaq71n6v1af08wu3fd2x93rwjakyd6hnqldzmvqa94ihgxbvntrg5phqctgb8c8ar6r5pjmr3igugj7ee4p8s3rz3gjguknzjkkwg1xxbyp',
                status: 'HOLDING',
                refMessageId: '9iocb75gpwxp99imz9slusyfon6ag8978h7sqii7r7u3idosm7i9limr02cjypsbuar19wltyylyakwb6xw0fbd3uljizlqy7826imfcrj0qpzejgsmxzjyx2lq18ll9ec8v7k04xott52nlc74zz2008iz3m4oe',
                detail: 'Placeat doloremque esse mollitia nesciunt esse accusamus. Et ut id natus id maxime commodi unde. Laborum voluptas numquam aut harum ducimus ipsa nisi. Voluptatem voluptas sed veritatis quis autem ipsum nisi officiis recusandae. Illo magnam vel hic ratione enim temporibus repellendus.',
                example: 'en5tc9vqalyzbeaf9vi6z2nutcj5ak91kqiu1sc1m19c86b9we82jt73wkftm0qoney4fx2125b31liggdwytg7sopsdaksuvooc7b6qfiygpg4o73ho4x6f3pba5vir66h88fmeaiib42466qibhxxdpxox5gm5',
                startTimeAt: '2020-10-23 05:47:15',
                direction: 'OUTBOUND',
                errorCategory: 'rjsn8mlvtjsidcwzbl90etgdyilbsq754dkpsr2b7g170w6iajujw0s3qv1pzr0pc0mx9yrsgtyxxe4pthmdpgmpwnkux7oohavk6lii4ett3yycfd5vrwjtexal1nz3h4uekvinbh301ojm5fimxhy6x4ftmd8z',
                errorCode: 'ahyhyy7v6jzkqsdvktpfays72j45qpvgdaf3y8jkb8bhy0pnoc',
                errorLabel: 263832,
                node: 5032195175,
                protocol: 'nnkdnfcmcifzmwus3425',
                qualityOfService: '3h7kiolnmnlikwk5sprl',
                receiverParty: 'y3tyv1jxm9xaue2cbf4bf60sg0j6brj3j0gnoape4asenj69n9vfqjkfwalk2xjkihk3ee4y7fo858q2y2n4ngr9v5mhjhrpgqyvqabtpqpvatr8xwfm3d9oeio67y5jouhwk23gjwlas79tll9bfd55v00kxb80',
                receiverComponent: 'jbn1d0guijly84byx5b2cpkzo504njbfv9y45uj1eyuoxhveraxdwy0pmwqpya1g68fhazllxwtjc3w2lvs0qp0syl8xfoqv7zmxfse63l9i0cg474e1u9vgfbep0tx34siilwvao3mnjxeixblyc4b2il9abxz7',
                receiverInterface: '8nsk1ylb2zo1en3tmd6cc193ohhalejgw2k6bgcf22ngb73lcgquemtzh6ky2vtblhz4ro46u8v7pcetjp9pv24h5pqkaj85xl5lt77okl7bxvgg70758rk3gxuwp8ai5q7132ovfl6cp9kkqvmm2t9g6bmv5ufk',
                receiverInterfaceNamespace: 'l97oxhi4v35u6z2amlam80evwb5kxkfqf97o716jbbr1tzjs8kfle336k9m1hbepsmc1yz93ljrllrjhty33a90uidl3jm9dx9bucviia2gal68ksw37c1415qqmm1pk2l5hp4i431zvdyapcdnspfqytdrviwup',
                retries: 9886182744,
                size: 1809876489,
                timesFailed: 8099304223,
                numberMax: 8259865471,
                numberDays: 6725360372,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '5y7zm6kg8g4jbi5emdq3mf4x594w3nu5eg88ynu3xxclvv67a2',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'bc7f6mtutxtwmzq11r12',
                scenario: '5ecsdnoeit9rstxgibzdov6nkkgmfh0xnsxk0086yesj82b6hzcvgthasm33',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 10:45:08',
                executionMonitoringStartAt: '2020-10-22 18:56:29',
                executionMonitoringEndAt: '2020-10-23 07:07:20',
                flowHash: null,
                flowParty: 'hca0xucnkwioag05vmy3ztq7vki6l447shlztclo9olo90j6i5cly20sm2169xzgw2f83rspmuui13kknyx6fhjmwjxht9krxd8xofnhawkupy21xnr7cpotxd7p57lmslxskzy7yegxnkxsnlyxm8rs719pnl4e',
                flowReceiverParty: '5f14uwyvisvgqzq1hmgdr4j500b507schdzgx5bstmjhdqvhw5y1ww2zsqi83pqs9pc6na96gdenk7qxhorriilufon28vd9bnaha88sjwnhj3qnyyw4tvjl64rhopijkncqi5l57h8jxcfhyzk0pxjtfigqspxr',
                flowComponent: 'smw4250szzjkgg4nrc9kknntl0ttr6xolkhi7ea2gyyw45hvhkn3iqypwhzaptlbuyfbyivuivnckz5avj7igwmue6p3ed73il76s9b62e4dphv52v3pg55zv87e2cnb1sw81lq5xdodonkbvikza6j60619x25h',
                flowReceiverComponent: 'g9g5o16jzzj1jdyik1r18jkpbvrlrojgjw6r80947n8x9oa74vz5smgw1i59ngbdsvenxalsslqfc2k4jgfnb2r5xu06x0jcq7mjm8upgc8ewecwn3b4nubahbg569tbkrn9uq4gfycj5n7si6ho7zutt4y8ktq4',
                flowInterfaceName: 'ufo6aa8smj5b1nd0drybnjej6g3fjapkahmg54japj5iyi9t4gis3ih29ll4034fo5ysuiymqyodgduj6j9zmhc9s7p7bi0dpkk257j5wg8pp8659v0rvftaxqwgt806kqcmdwlfzthtmf1m76g6v7bzkk0bz96h',
                flowInterfaceNamespace: 'jz9nl1khb73ct5e5lyhla1yry2lejb983f2bphu1304n819qbyip8f4980nrxmy2am3pa5dx6d2gkz7noe27j8sk2n4asp7ob1h14cre9yhcm2e596sylee9bz9j54beqydt8cfiz7aqmpc8lrni8lk2fx691e4c',
                status: 'CANCELLED',
                refMessageId: 'bgpv9e9b8vaw6028zoohrlqkiqtt0w1bu24b9ugyvav2pum706vr2w513b41mc1oc3fx8by7lrie57ntyfopm52u682eoyud43p3oma8orklhjcqb7w7b00kp2j0dhiom8719tgkt8kjaipnrita0nhprcm3ligs',
                detail: 'In iste perspiciatis voluptatem. Quod perferendis dolor. Beatae est facere ut. Nobis ipsa veniam. Placeat dolor qui ea veritatis id. Animi et quas voluptates ex magni et accusantium suscipit.',
                example: 'gs9wio3pawpg11drme8okyu5m6gad46fgi2fv3h7np2a72qfpoirz1fa80i1h7bxfhlp02zzkkwp35pppuxwwrjm0wlk0behe55gajv56zpkuq2lwdy9qrafqqeqa9ybzec1bsvnnuz68kdnhiyg729dlbh9xpfe',
                startTimeAt: '2020-10-23 02:56:12',
                direction: 'OUTBOUND',
                errorCategory: 'flz2m2st22mcbxxop7gauk8corczbeu5homlepb0nt7lmqboqvy5iojynujftn4omizafzgndjhjo19thh0ukkxtven2syw6jiebtd0pjel1agzvt8gqufzessqut2zd0d1wk16l5hq446rduu3nzi0ycas16dad',
                errorCode: 'i3y97wbar0o72jgj3bbhbut3n9lpfoqry6lcs11trq4so97ph1',
                errorLabel: 373432,
                node: 2456084235,
                protocol: 'ljfb93ccsobn3nspmnle',
                qualityOfService: 'fdy95n04efaz63zzfb26',
                receiverParty: 'nihx3smx438zmvas10m0pk3ua23nadphrpi1jv4u7u0atm6qn38v1vw3030mhzgoybz7eiafl26cxx396vlrmr7qj79jtdejxwbwwy4uhyrbxefa9b59hcksd25v8xasps6s1scmcaw2b9kve0nrrcqmecb09z66',
                receiverComponent: '8vt24y4uvz3y1wzcr9vui2z8yiqx59qbo6k82ymbhtr0kdyud4lnkkm1cwq5bhooxsb6xr6w06t7cc1mv9yu1p24yohb1l2z0xx735qajpzbt40kk9chrelk4606wsw3neermfftj5w3z8kfag47htcbcfoomokl',
                receiverInterface: 'xn5e34y736m1ugji1rq9lgadgedfvltb7bi2l1sejfxhgo1tfxgx9a3zy1zhl9l6u5wa657ihwax2gd5wuibk6gtpmppj9axao6yj7fsjlbrzsb1wwlzwbcebqd2gae51o40oevkh31skvot86kmhst6mu4rdhay',
                receiverInterfaceNamespace: 'vlt6vjtylk788auf2rm700qxop6q2veo25uxn4hzs1ckx48j93csbcv8a27cuftsnvronjlvauxswvbwib06kb67nldfjv5xpep2wjkfszz3n0kiij3ldszsx12mwoxsedfb9i3nayt00lzfnouuod7zavhj0bmv',
                retries: 6788383811,
                size: 6736128407,
                timesFailed: 3305157240,
                numberMax: 8359767177,
                numberDays: 1062252533,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'qn7zep82incdnrl41ihgzbtvmhtkrvltbsww4ffh56jrhmrrtf',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'japolr66ubfxy9qcu157',
                scenario: 'krhxkyr9qgkihkitn90hjn5iyxbldb5fz4nppds07uo4dgq29n6vsozvywwv',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:03:40',
                executionMonitoringStartAt: '2020-10-23 05:50:39',
                executionMonitoringEndAt: '2020-10-22 16:26:50',
                
                flowParty: '76315ln8fsdz46x8cfwelj3fi12avdczn9f1ywf8l9zfswuw32cryqzri1562uher5xqg7j6i1wg9jq7hfj0qy6xvoyfa5ry1wu0974p5csi5muc4nvisq9159va699187wu0yfj6hu4ai24stb7cmmn46xbs49f',
                flowReceiverParty: '3qz0ctdyab590pwb53lo0wtxkqco5juxhrg2noufqxutyggymsqnr8d05ofr78dak1ck70bfvu8wtp6h7aimkyvm3p5r95r09va7ofdat9ssy52t2o4hqfhenzwneyp0g8fp4vu1irgjm9j1h7b6ar6a59npm5ul',
                flowComponent: 'dkn197abmvo9flsh3w9x2jwobmh7kbyq040pwebbz67nc0lof962xxb3i9si9e2s223c9q4m20l654ynd23u14sg9kfirn4uehygzo2kbu2x85iifizavgenxroa8044133txducb72zzittz6d0fwj3jvxqbvgv',
                flowReceiverComponent: '3c2psu83j0aq3g3y6agyln7w60ne81zw42x1c3pzwoznjw43v2ghkfyi3ga7z7b3sase2dky72p7dsdd7ytyw5rg7yuemvwyfyvhqhm06bzs7i2rtx7ogjakxcgfoo35dwnizus9ggtgxpk1ms87r6gdkrqmg0ma',
                flowInterfaceName: '8zljrafj9637np6qk7efqvgaxnfcu6vacsmyk2au9ozbt0ckua1zkynecqhzktddu5aruqb6kh54vok554pbavekix5o0oamo6frb2ms2l9n1afhvzayb7w01vsokmpry1s0e78780ekhsd4z2nossnccumvscxf',
                flowInterfaceNamespace: 'ifeag6nfmgh5ranlcdnmz9xqjby7pxd9zxz67a043b4ou4d8qqgnskb27attm9srryb10yy3wkuolbqe7h0zcp4zswsi2bcf5n4edr1sugxpnqr7p6uistn55clw78yr46d7lmd0taadnum8k2jccedm22nit3h8',
                status: 'SUCCESS',
                refMessageId: 'nzrn8q1gxmmx08aphvo4u84hud39rr8654jtzftupn6xc0mzbu4nurxgyxrl5i4e12on2u43et4grby3khgajvq4s34iichxzrr8uva1en4mcaf3xam9ushuzfmo80udkj26yps6n00ibu7zd647m66yump3shri',
                detail: 'Atque nam in nam alias eius. Ut magnam eos et vel animi dolorem. Et aliquam accusamus voluptatem fuga ut non qui.',
                example: 'u2fofj52ayxci6ccweig1tk8qlqwc5shg1wjnnizy69z0pf22oqrwjixcaca14p7ukc4j3igcn9v28t5iy7dk1yg0bvufvus92el6njoimxfp39p6h4ii0jxxz35gbytx98klarvo2k3uoo6nh2cu49pbn12igee',
                startTimeAt: '2020-10-22 19:54:13',
                direction: 'OUTBOUND',
                errorCategory: 'pb21nrrmy5g8iu5j1dvgeamv5sbp4z03uyzf14srwxzfw78xln8snbhaiodgjkrr9ogt1oh1n51qgh044ee5rrzlx6mfjky9878baz5vll04vg6qi7qbj4pca5p8nzu7t815a4nfsbtu9imq9hbagzpdcmcocbfm',
                errorCode: 'sqe30yqjgvpc9wosw5ynk8hvkej4p23tan4xzyyzby19emujok',
                errorLabel: 363206,
                node: 3571697498,
                protocol: 'oatf2hsy3iedv7136f86',
                qualityOfService: 'fadighlagyx273d955hi',
                receiverParty: 'k3b8wbjajgfrt4ehaob4unnsxlk416r2hh6bkg52m330foymusgxg6zk77gcu3bbkqvwpudvg8llljvv2sewprp592768xrp5qb3pgnwewtg8tjwizypwa59qp5a29vnmf86nrcyblpkyxxicc7lr20izglujij4',
                receiverComponent: 'uwg9o9qi02khdhb3ug4ai28pwppzr7qmwhj65x4nx2nh778kl0wsehpuv7qaafgdb6ruxt2fhqra4cqci4hu3z9duhyyyhzlxtovcguroxk4ttfbjtra809uk14mhw2uzb7m8kx3v3eamjt9lc0eqhf5ehrwnhkd',
                receiverInterface: 'rq2cbq1o9l5og9aaiyv4omouqjipwj5496tb54ql3bqsi8ga75i7al5remm16zub4hdbaamg8rx8o9kijyel2nv34v6f2dblz7768qzy9q9hku84o4i3cz0t7qaulwfc7j8j7057y8ksjqicyn1hsn4g0uphvcmv',
                receiverInterfaceNamespace: '92pm7zbbdcxg1ogirej5ziceymksng12fbqom61489fgya1742uxvvib7uthkpnig9m7h4qcr8hkkd2oq3l16t3av3gde1u9pfpy0pwgavhxa5x0qf6g7g6hkmyqlo7k1ftrqf6cl9itupspc3arcfuzkgcwl491',
                retries: 8977176207,
                size: 1749235169,
                timesFailed: 6777509683,
                numberMax: 2439046551,
                numberDays: 3010808871,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'xmfn66j8dyck5soril54hrmmwckmapdl4lx4zb6ix0jbrr5th5',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'y4ctv4lq309wgqgp7o2k',
                scenario: 'mhyrlxzbxlxbu3ay3svy48dkh2xl1y4pfyw6yaf538aw7ue455e6uisc13mh',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 02:53:09',
                executionMonitoringStartAt: '2020-10-22 23:20:00',
                executionMonitoringEndAt: '2020-10-23 02:39:04',
                flowHash: '8497iuvu6t2ne3ukq5prvqg4ajh57qpcjg3ubvrz',
                flowParty: 'nc2ic9tt2eajugqwi2hhesd7zg4rapb0co5kabz877krffx115ahuygqtugy51cyjzivri5bnsrocty6jm2gw84rh6ux8f56mw4kdgd6b3m47wx3cs1gj3clrguk522tdilwc4occ0587q2nc6o3hgvhb8uy5y7q',
                flowReceiverParty: '8zh5xn3semv380altueq7x99gmbpe9zh3ytfnkoy35jmlag35jm9zkkqtowdkyfj5t1dukux1b2n2qpnv60dpyxdqudhuh0i3zpg5yvch7nw6i5meog0mqryuddxiuk2zfxrsaxjky71303uzy3yls0nooc1a8zy',
                flowComponent: null,
                flowReceiverComponent: 'lmg9gedegp1impfpl1zc25k9ejhs42rsxqq8171xnrkeskhjrdo5nidqanls0upvk0i2qgh32ursbpw6x4k2vym4potdbvciz122jacqhflujao1x0yuw743d7tze953nvja58akgt9a63hxp3xa09s7hhef769t',
                flowInterfaceName: 'yzhelie5v24aiomp7kgzfph0na1l5bjznl34q6gjl2obht7p5jov5ooixa5k4otoijl1fpdibenva429z7kfeqc6yz1xmu0tofi5fgat3d55zm2osl8fw2bbtrgiogf2anirqdfe4g6j0x4xzf7tnptjcvs4j6al',
                flowInterfaceNamespace: 'q6paskvgwzf90ipfpkrelye4yvfi4yrdfd9eg3l573fwjpiy8uw24jwrnt3svko5rkraqf9xxjec10c142kreqso1ulpsf7t3r2uj2rz93nf1aht64tkvtqq7wmvhwc9gwslrr09bs6wostkzu2g0dyo8z0ubhwj',
                status: 'ERROR',
                refMessageId: 'i0h8pocaw4e7amval6yu3m47v99xadpz2od0drm8z1rszdc0h0l5zisyt8d6wjwqkjzg8mdxy0q0mqv74jjaykutnckdxipadq1l1dxs5e8sczs1hdg1ec3vr3iqyfktar1ke3nnqhw117odct1juz725liaxr12',
                detail: 'Atque corporis autem atque rerum qui autem quo aut aperiam. Ullam et id amet ut perferendis nisi. Cupiditate molestiae aut provident nam. Similique in consequatur tenetur suscipit dolorum fugiat et repellat. Et ut ut suscipit dolore ex atque et tempora.',
                example: 'gl00wkn5i3x02a2urr7b9ihatks3d9mjlaie9qf5rietq0sqwzfzsdll6xb1n311ldgdl2d4nwtk2jbbhbhej7fkn7qx71h8s4dplpz3jah1e5vfggwdgl87ey8cgoxszbk9wp236od4sc2u4c7s7k6cbynz9mfs',
                startTimeAt: '2020-10-23 11:01:05',
                direction: 'OUTBOUND',
                errorCategory: 'nepvzf73lwy4ewuia7h4t6trqri3oi7l9bfwors25golmxq66swsjnsga0f3xnpzbzxiexkg6xlrnpq87kxqpqqc8ut2jraemyqbngsgbw6c3fingmbo1h8oau7e2kzc9pqvcqarh0f66nh1wjj9r82327ral4l9',
                errorCode: 'j60t43xb1gbxnksqoqsyftkmvnabgv62iywuzchzb63cnv79u3',
                errorLabel: 954801,
                node: 3843382543,
                protocol: 'p1ruebjjaqhpk79w051t',
                qualityOfService: 'd8qphua38n876x7hdnub',
                receiverParty: 'pvf4si2ovovab7ly9ae3zy1c7nuje7b31fml6v3u113i218u2ek4exudxs1g2cuowvlapm5e4y336fg18l6qcm6gt8wkxtft0i9ybf2rjkybl4r582tiupbsxgymvq5hkitpc1wkunpb9gf88r0ermu7y3i0xeep',
                receiverComponent: 'ftpvm7kc2f35heajl8hs3bddg8bqkx2in0cuf8soczugw4vfot3yx2ttxrhn8i2eam61qbnwqa0pbdx2u3krideceaz1d197e05gx4jte1g5zbjan1ns0buuzcq84dftgwkjtt6tdeawltlga74vmfxhmzsfy6sk',
                receiverInterface: 'zkncwkvxbon3tk5i4g37atxpy9zbttsp3s5cxlkiv5c418sz82d9bo26hzewmltarhwv6skl6tmr4b9x01la4kzd1eyvjg9t3ruxr0tn92te9cyyx7m8ek0dj9ivb3uvvtpeyt9ma6n6oig88okzmx38nys7458c',
                receiverInterfaceNamespace: 'dpw0o74m7g9281ej291s38gj2qxtl2vr7f62zqlonnjw1aztqlv32vnsiclxly3zbzduf39eo0qnt4kechzn740byqz0au9h0dgt260n9xtywku40vpxaxwvjhbsutpqc9rvv9rjfmtk9zyhbypnjkr0kpn4j74k',
                retries: 9305956220,
                size: 3657745086,
                timesFailed: 8534834145,
                numberMax: 3222577777,
                numberDays: 5611438719,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '251jg3duqunpw3zd6uj3vogeboglwrdq6b14hmmxvf05ajz5ep',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'gvm095mrnr60pmcefn48',
                scenario: '283blgtjm04j41z3rceuz8ftec49ifh9s5a9vp68zoljmlz488ywyg4fptec',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 00:33:47',
                executionMonitoringStartAt: '2020-10-23 10:56:21',
                executionMonitoringEndAt: '2020-10-23 04:52:24',
                flowHash: 'kceva48b2myhdu86zn8wqh56sru5szc3btubv34q',
                flowParty: 'zz4dxlp6f5revr0w0by8ierhasld4mhjsugkf4i4tdsmwwgipao107e9gi6yc7shbizw60s2h7b3c2u7ywnsng6erhx8w1h7cuhvjzflelosgrwyhvunim8m4ysr65f4w5cl2oeoi128zhggi2awb4edwjive4mu',
                flowReceiverParty: 'nov8i7xk2wg011xqvix90vbvlz80t6e835i4gq7y89goa1ht47lk8y90o53xf86x8w8qj5x3yf2noa11mckoyu21dl3dobnjzj57bit7plzhqxfy65zu9qmqm44x9diucz7ejp2caqplvm64gnqx7920nvkkavxe',
                
                flowReceiverComponent: 'r3gc5i12iloieehvavw5b9l5m0ko2fjzbci3xofle77j1h8arvzv606sq2bef0894v4uq0xhyqywp72i717c4n7o42noiic7kxgyaecdd6fnrtxmp1i6sctpwb0z1ycqy976fzc0jflzdxjjf0os246hnqun5zwd',
                flowInterfaceName: 'n4rcremn06lo5wf3hc7ye3y2859p7c2mxnmt12ksm5mqq3paui3knssbicjua0uygzuw2thj07k7swf80u3yv6v5igcdcia6jykyw8dejf4s8n3wbs4u67swj22wdu24qhhnp1vzi4nathy9ue2eww5skb9by1gw',
                flowInterfaceNamespace: '5yp8otz4hv41uvx24t5p7tyauw5bqrivbpaodhei0mul3ba881zuxpgduqo7b5heu67h7im6h8vbhuqbh2cybhpawh6xt2zjge6yrr1eahqb6slkrt32sk70xnmsc2y623v9xl85u6plm2s5dqj93k58t5dqvncc',
                status: 'CANCELLED',
                refMessageId: 'xjpaoci61h8e18rs8xggptgiv5xse8a3sxcn7rfkrecmroid0wzums54fbel9oimtgawzrlsgp4fj1ycci089gpua0ck9ykadc9od191cjukuku7xgh8b320zp92oloeccd6hglq7orz44o3t20obd8wr5owi85p',
                detail: 'Molestiae incidunt atque ipsam. Quis aperiam et iure quod quis. Ut dolores deleniti ex optio repellendus nesciunt et et vel.',
                example: 'i34kje6jvlaemp88b0jyrdrr7ow15pz955tmnnrvpq3aw7fipisy2agg2mk4r6gz4heli4gm1g0s2hj63b9u5vyi72xems0wz58uq8sp7pzqbk6a45aihwedwu189edo9lh1zppemrmy6j7u990n76qcjnznjnbv',
                startTimeAt: '2020-10-22 11:15:45',
                direction: 'INBOUND',
                errorCategory: '56fl2pfpemgk52d29qyn3xdti0gxcrl298akm9wl1sy3mjue6xz8tvvtxjt2sdkp6exq6454686c4kr4ee6f48tte6c8q4y6o7egq0qp1pkx8nzsz4oqdqffnqoc56m5z4sb7rygljojxjrkg6diybwh9w5prn6y',
                errorCode: 'pd50ijixgp6xgcf21bo5156oc0yfaxmvnnqw01ta4yymwfqj90',
                errorLabel: 894776,
                node: 8080244918,
                protocol: 't04tt1rwd6ik7tgd6w62',
                qualityOfService: '8r67zj1sih27re2xlbpm',
                receiverParty: 'zwgeizqx73djdvj32ze5n33l825e9ofq9q51paanm107k8otkeu24d6is9pybkivtjnhoa432gmkdo1l2poiho2cq9t3mv2mvgimgkr9xi3gid7w49gbi1gspenoyw4cycauv43rv64pbwwa4zkm131d2zrmoe5u',
                receiverComponent: 'rxt2n0x6ereho3gcrcbnd1ygfbchd81h7t076uwqildlxs5pke78iswu9oe8ico851oql42b6vrv76ukryqjr1b4i0w3llkjg8gof1jujpqkl6gi8y46360639jm8t6k2hvb2yt64m15497j2tfcwgil7gyz398z',
                receiverInterface: 'zdosfogvuttkveairwjfyvqxkv6iv456gf6gtfj34odv68zh7ynfpwsj71jxos06kxh8mtyf12i0vjq2blwetd6voru8ya5eu2oshx9crzxjlz6pobq4064jsp2tt9mkwc31m83vdfrnt5baoy6m43qt73w369qh',
                receiverInterfaceNamespace: 'c4splzate1nwk25m4h0ih971a1mff2hypyf8jlqrd9aj7cvzxb77mcp0tsbs47xkbmsgyhplsicx0msy0xccgjh14thyfetfuulfyulprr9wpx8nb8dsbhf63nvkrmukz3e8rkufdk5b3zwiml2ovim5ht2bllmx',
                retries: 7787791161,
                size: 8708549430,
                timesFailed: 1039234395,
                numberMax: 3869565118,
                numberDays: 5936222525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'xforb4qboobjtkimg2yh89x57yrhfrqtrhb1uydqe13sylg9qx',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'assc9p6h4csx1tjob7ht',
                scenario: '50hsn8fniq2lsez3zftzxgnb0dfmxz0t79slaxcu3uupp20a2fsmk4bcw0pm',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 05:23:15',
                executionMonitoringStartAt: '2020-10-23 07:34:18',
                executionMonitoringEndAt: '2020-10-22 16:46:46',
                flowHash: 'j8plg5fz7or524vwxafj2xnbquu9vnpfh4qfoxzt',
                flowParty: 'opvvpbippofrb56vovxnc5e32w986s7fk7pqu9hve08m03ty4ez2s0fu1m6j5zzkgkmfyy8fkiadrnssjmoebxkrg2fof188jn6ql3za9kjbrttsnvw38elpq5rhqrm57v5sayx2ic7ss7b1y0mnp5ba1pv9cvfv',
                flowReceiverParty: '8qudu7ia7v8i8tkawgibzr11fjfoyith2th37bmff6dugvlzsh9n4rfigtr0twojiimar2u9y0btwn0evxfyw5v8c04ith890yp22zqgo3weaqqp50taagso3on6umsbzvsms8kkcbyznrcghxd37dl4obsm70r4',
                flowComponent: '35eq9mq1cdkgb8yj4502kl2clnyenmq0418mct375lhyu5x47m3h488ojy2o7237nkf3ylycoyt9n5htnq17n407pev7uebd0b70ralavfr3sz1xa8qtrmdknzov60mssgb9i8m1nlfp5kym9yx38r1wgzdappwz',
                flowReceiverComponent: 'tc69axgxgi80dguq8asdenzo7w8341bpliq7it4kp3i3xrjpgcdjx7760owdh7p5jfldf2l874md1u6araor315iertlwdgj239m62je2kda98xjfpr6xjxqqn6pwphy5dgy6c03bxca8jdqwk0nshib8zusas5a',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'fd8bopev2ypk0kmoxojqolqyzsy818nd7i9ej3v1quub4uiob0xym78ebp0ygkuin2ka6x03zu540vc5eof4upg2abc9ana01am5zniahmcdsynrrg0hby3rca2zdxrk1ef3okhwe8wwke1x74htmgozrk63itqa',
                status: 'WAITING',
                refMessageId: 'b7d0rjcf7i7ysala5sgyipnvg36lanlwzd725n75dm9om925068tjol9p7b5v6f1m61ou9hlkq6kclkpqu6cpd8v6zqvo0cewqjcsuc6xtbns0fox5sk9d55ogiexdx5sjd5qowi9k64hps92tkzfvke61fcvpyd',
                detail: 'Veritatis quaerat cupiditate eos deleniti sit. Reprehenderit eius aut harum rerum consectetur. Rem ipsam odio.',
                example: '4ijff2sd4ijjxo3niv3vsgrla0i4srfgd27n2hwjwt50gt7w33gi295ygus7v0xn4vmlr63yiwag572pxmyxb6dk6no8yp5a3hg7cll5wj075x0idxizp4i8vs6sm3cue0y34bdlgb09dimn4tgjnr081t86lcj2',
                startTimeAt: '2020-10-22 18:32:20',
                direction: 'OUTBOUND',
                errorCategory: 'k0akq4g4de519hpiwqfhzhsunbvm0uwerfr12n72iyo12qxsnt7rz8deqpta7rdnm1bhykaakkv418eamcfyw5dh6g11kvk7w6lnpvjmit2wpdvkblfsonnh17k54kvw42p1eup4nqgxuxzh1t0dzl18wh1s71s6',
                errorCode: 'rc8a7yag0j1ocuqmv6qctog2xf0ayukpovm76ue2q8edjt61sb',
                errorLabel: 509073,
                node: 7655410185,
                protocol: '5efidmect2abyne9lhdz',
                qualityOfService: 'xt2kggpcsib6kad2y0ws',
                receiverParty: 'zfcg38r9x5xygxg8s0gs7aytlfa0qcdpvoxsg8w77oseo8hkx0qug5smfov2x8g82obo91x1hpjey31nukuff47pt8c7tiqoh45wevyu4hbl27b62vnnfb25gq8hp30hlcdxvrz97orxuq79v0eocg4raguzq6fm',
                receiverComponent: '8es3gc4v70ipnzk3k474yx16j8axz78rtwoos3i4fyrm9pq3782c3lwec4mnliixlkakdbjw35b8ynhz8it0yfnuzycc1spqzzad7o9vom6fmc23xwhjhqu7m8j8raw39h0n41bqw4gi7wmmpa5ihl6kers73lga',
                receiverInterface: 'o1ipvklyt8odynjpqh9juzir0xiue4tic0vljb8d6kyxru28zjqtcyqrixfj5cs05um0ljc307ncojqh0ladhpvkie1gxv9vwx77h2siczon6tqwn58v2uw1w541smzeypdb92pxisq886dcc5mq7e08ogmqzi15',
                receiverInterfaceNamespace: 'o8z4u2bl852sh6ae467itb3uta2uon548c11uzthv64asztpzxut6toeoz4ay18uq5ipfmt2a1ezjxtqevy5wofa8vw7c39vv9vosg47h6dlmuxrv1s67wgte25fwe259zm2sqpu0feux0euln5i28wj5stuy5b8',
                retries: 3091202440,
                size: 3158951590,
                timesFailed: 5963245975,
                numberMax: 7918382060,
                numberDays: 5548010236,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'sf1qb3oej1dkwxnj8ka53ifpglf5duioit0n4aj2wpoqmfhwwf',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 't5usznne38v1tusywzmr',
                scenario: 'b3cjfrc778wt99kfah3ye1w81te7n0ioprshysg4zn6l1ya0y41qwskhxq9g',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 07:38:16',
                executionMonitoringStartAt: '2020-10-23 09:56:22',
                executionMonitoringEndAt: '2020-10-23 08:11:36',
                flowHash: 'qn2q4ws6cxasijwlqyska68qcu7es85z0461nczg',
                flowParty: 'nvaxhx24uj7ch54moq9qguegbgh90mptei5xvepjc4k03ygtfuq8f1hc9l04yb274xgtpvk1enxpyh01sp8o5v63dn0zt4pdjz3266awvwwl04ia216seaj2t9qagc91u0le6kg0mi4kptael24zf9p833bm1j9n',
                flowReceiverParty: 'lkzpkvxshwywwng2r735hitl34czn2yox8cuf54i9rtanijpgvsktpalnjnuc5kb7m7e2itt9o4mk7i8ykbgg0yomjifzj585dxdrnvqkm1loqcg07366ow1o626wr8fgq84wvlckjhkvfd7n4fse8sjp86quos0',
                flowComponent: 'adiu6dw3hmqr4zlsllb9zd1l25z9d5rla40zow8ov79q0fnd4oyuqldm9lh32820ati3e7hyc0kgvtgse3tobtz3yuiqtqfja3umes3c5rpnzenbaaoo1y056zhb9v6x793zuxq7gc68beolx1i04bxk1jp298wt',
                flowReceiverComponent: 'f40ybowwgt9z463mpkftiaiyh3vp27yl8oonzz7s2zn1sjll43ffnh7noazghz1g60epsdz1x715jqa8le3oc4jmlfbcosr8e3xensgzdp9pn6y6ab83hmye7qp7h8razzaohlddwugpmw1vm76uzdvlaiba7gpe',
                
                flowInterfaceNamespace: 'd456bo0c75krxmgg7lhr4q3obbzbw9a5za6r2uunnl13ymxp0v17kd0u7ze5253nf2b0b1goi5pp6qfjolz0c5abt3buscv15hz1ubkfkabsanp5yyd2z6gb5fkuf9h5zw9nav76ni58hiq11zpt5jdw9zinrlxj',
                status: 'CANCELLED',
                refMessageId: 'og492fcwg3levig52bcq45fet3oao8h93slksrj3zhjqar613ggigdjvie4aqv3gbtu8lgrhsl2wvbgrpbx9wc8vw0iph86i1bzoo4mfyfcl7leiyl0px0rnnk7gvjbmiwh9pnaz3rfjbfbbahx63h9c5ni93ibw',
                detail: 'Voluptatum distinctio dolor mollitia voluptatem praesentium non. Non qui excepturi facilis ea omnis distinctio. Ut aut nobis maiores. Repellat minima perspiciatis. Maxime eos fugiat et veniam debitis. Sit dolor qui laudantium a.',
                example: 'jll0dny2nbo5jsrjkfltml2h91dwrbkqtafbrb3jyeqvuclriugb029qqform9s0z2zaven2utq999b9y7alwrxniv1h1nuz0ex4x8q62vkkdxe8ou25roxqgyf3sqajt798mcg2u9y7g40v7dd5wyt4ddo2n66r',
                startTimeAt: '2020-10-22 15:25:18',
                direction: 'INBOUND',
                errorCategory: 'mix3e37u1ezpkazwpt9oft70xms1in011rn96s0giodx1q25sgq9t9rlynf6fbxnyfyur1xasa0au7c3r1j33nz0vkrhk7j87q83c3e35o1281qfm1pyqqoy7xuv6zz3mq2ctq6581ap4mrx9mxcvwigsxlj0jup',
                errorCode: 'ipgahx5naupy46xnexy6ibju0iqwx1r5ymgcg3i0knxsoxanw6',
                errorLabel: 862706,
                node: 6631248941,
                protocol: 'yd0cs05oabexygjou8ie',
                qualityOfService: 'ly6zv1peqv15ibz9zp9m',
                receiverParty: '45wav8oe9w3glrcq0f3jgz89iell1nuugdfuuk7rdh2uwfc5p4kecboiqmlkbjmmbva40d8a2n9ozrrbvlagns6eucfwbd289ph0oy04et0y6b025icd06qdj9cu0xv43awioieob0nghtbeeie18igstsvsjjmt',
                receiverComponent: 'av9djvvuauf6fnjyswep0xv3ncei8zh0hmhtn0eg0gbjxp4fyohmhnfqpjo7d2sfkct6knjo1yopwhjhi7ueogofkujki20b24fdeaaa63u4fir5uxakbwi10e9xgkys5e2ectexeb1lm9mgnjcf281bc99vg2wt',
                receiverInterface: 'dtrtavzyyp2p0r5ponq6x3tw37yw0hwntlpzd7fcm7i21q1a0grsphtvdekpldn2u6elyfjaqdujp5hqa429kwbjkgv90sam8fj2kfjusgifxu7nmhnkog4k9dygacpvgqwdngfkaq28v6uprc9o5ybfq0hp6lx6',
                receiverInterfaceNamespace: '647bfu15pe08evr4xlkwuaclp2h7qwzf2jpive9ez8iudpa2178qc7au49u2wyk9zbgegsa3ok64d625mzxvdjl4ppk8uazyicl9leumgwjjxd2n5dfk5e7u1yv9h17vvzwhco33ktbymt9xbu0yytkeb6axqq7f',
                retries: 3401154533,
                size: 1281006336,
                timesFailed: 1546746096,
                numberMax: 3789651096,
                numberDays: 9080792641,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'elb1gtj42cul6kxqk20xq9boeo56k2xb3wotjhl8zdk0lmvqtt',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'nacsq5ofyeby4cmfgekf',
                scenario: '193gfrhiqjxqtm1c5l74nrl757whhffql6hl3zwzx8azxhssht3xynva7sbz',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 15:22:40',
                executionMonitoringStartAt: '2020-10-23 10:46:48',
                executionMonitoringEndAt: '2020-10-22 16:48:34',
                flowHash: '4ejotozwbts7f5papyuie1fjg5k42uorgqar8fbh',
                flowParty: '612cv37gxg6onkwlkj6xxl76ubwp4q1c6y4fr1lfjj7nlsxb4vpbi0ej40eokyr178p7qlaczxcvm68uu5f76ars8kknz8y9cd45nn3ud62rm9ien71asbfftixrsevzvw6ywhmo9h0sp20m5x603xk0t7hei6zz',
                flowReceiverParty: 'onv4z3z06ralnxffgc0i6qtdsz1kwdk9dicamtgjcepf7p3mp95hbat77tokeb6esqzw4bg9h1x1ctlwlm5i1kb400x9awfismjrftjl3n0hdt2wwbts4he57aq9ljrt0vhyp6yuoqrfoydx0uqnj5sk904l3vf5',
                flowComponent: '0e84g0r7bznl7bzz42yalnq6n55gof40mo8o2jo4k0yazapgjnd5c7lzgkfnp649209ajo1819r5aktx51ik18twhvcyzrf98auuydvjpxu03idr4gab7xxf392y3wjz0e02fk2mczh2tvmam5dte7ig1qs8meay',
                flowReceiverComponent: 'eszp06fkx23fbdac7klnq74f2wea47mkgq0f5ya3dfntal86yys3a6uqdcjtlddc0o9rq07xkas8p5052lrrh3si54w0g2c4j5xy5gbr94hztkkvt9md57mvrih3gtxd2m0zjipc9o0xy3x2ia4o2otzbu01y7q4',
                flowInterfaceName: 'fr8z5b3nmdh5j3wc1vyj2777cpatzkuklnot2e6e5pa4bn3h3svue4hqn92vybr3tm5hg6ak0jt9l04jpb4ft0b0jjo7lmzpl8eg5p1zfaxuapkk7kkfwkbt3ghatm1ecn77xq89vji7rf697oomoch5hwdb46z5',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                refMessageId: '9bmskvqzpnqm25k9m5ppjuc5pzrpkifiee49etfyrua7d7aa4pid502ftyjmuow7y6lcun21wlo5new1imzyju86z0o55cm9zmy6axkv6qj5qiv7w8ir23ipaagpurjvd573gyq4izq4cjj8f57b8iv3n9qo1fni',
                detail: 'Quasi sunt cumque. Ducimus vel sunt vel ut et. Et facilis deleniti modi eum commodi ab ea. Consequatur provident repellat dolorem facilis dicta.',
                example: '1089nns7rckmq5h6anzx2s3fwop9ioiszrve65oad9txd6g2ylbkiai6y18uoop6802iylj8in0jzbc9er3u1uzj41v3w19clpjy4kegbff4ivs3o1tfs1zalwds3gxrat0bo9e7x4kadvseahxfpkjl68gi52p4',
                startTimeAt: '2020-10-22 17:23:00',
                direction: 'OUTBOUND',
                errorCategory: 'k2ss7d6k5ejsd74uiszsgk7fdimv8q5jlcb9mj7n2ibki7s9ce8olf4vfu6aek3ardtmjabjovidn7s4mz7waf86byfm5zmvr2giflg837l2shijv1wphb9giqe3ox9mvttpv421i47cu10v3ibmx2hchuwqsnp1',
                errorCode: '2g7s5e3ov6uxso2wbv3hmjlhevztqqbk1945ea7qpii15jasax',
                errorLabel: 586656,
                node: 2401282054,
                protocol: 'yy2roz08ac9dx20wdsc6',
                qualityOfService: 'pgab64vyur56h12hlteh',
                receiverParty: 'x4ton3w1nzs5e88760lesc21yq52urzz5u7a6fma5teerjy55msbfkumjj0592kevp90qyxntq4p3t9tzuf2xfpvx935qarihcctwge7up5eu8whouj5krqu87svtuxfnov4bnrwqg850jqyxokjd196adfh23gd',
                receiverComponent: 'bn5xhd2kmjh6tdha3wceynp2ami3bs21jej3vzf9bkmhkcwtluafzhq46o190tu25oxwjitl0z4afh6cgilp3it5t6286s70sypzevwp2yyjcarimjlj9a7f59880rr95n7u8z458i776if5t4qy386uc2e2b2jc',
                receiverInterface: 'nd4nbzivrfb0vlzfkk4tg27cm9l0kxe50v1bzzlodalxiuzmuj2iw2x25hftdggqss8vk2d70gn0qz5g2mo96uutp825ggxwibdujahr0nim1u3pd4oxen42n9fcwmasogzeqqaopwh2pbjpovovh8yaxf3d399u',
                receiverInterfaceNamespace: 'q1un5wf36ohd15o2udkt390fdrtmsc7e5uw2qj5l58dvaq1lgeig06jr3tfbvp6em8yib2srdtwa4n00j5z1m3wj7auiftma5pnug9ywqyeamq0a8d88ubq3a0tnv857fobcaa4xxhk5q6teuvyps6fpaetw9hdy',
                retries: 6065657754,
                size: 4514576609,
                timesFailed: 9940085945,
                numberMax: 5799995511,
                numberDays: 2783599544,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'w3jeixn2v0ka71a0x1448mw27oprmfnt5b9d31sqytc15orryf',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'pgna66c3vov27kjegjb1',
                scenario: 's42j54vyf6hghe9t5nxjg9vg3l3zx0l33hxyc3q14wwdbsp5fpuf1fwfe2wk',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 07:23:10',
                executionMonitoringStartAt: '2020-10-22 20:19:10',
                executionMonitoringEndAt: '2020-10-23 10:26:26',
                flowHash: '5iot86oi76uluj41l87fl17csbzsbi0pzyy0yl3z',
                flowParty: 'jxwa7nt0k0aijy770y43zj6gba1cdg71jwajpb4k24i8ld2gxjhqs5f4guri38m6itffhv8qi9epvuoo5jpe8extlfqia3rqphwdu7msclralss2ddam7u6o2zv9fm18t1zpf1m9ml3sra8keiyn4152i6of1ql6',
                flowReceiverParty: 'ooyrqpil47g60u6omccumfn0ih9p4zwi6pgqvwpp3glrvfiz0zavugglf0k156zybrzx5woggawf7a1qrlu4qsggwgbfmy3gkdex35a2jc4565nv3bzh1dnh22c271uf2i628w9byy35ha5ywti6i8eraa33jgwr',
                flowComponent: 's9vn0kqp32k4rvplgittmnkhzy37k8sac1a3rjc99s5fd3qljuwef544vwgbp8r1w2qjy7vpwewdx518faau6tj3kqj8bcld1vi0tz3h32lq2q7nagy598ugltxmzydjw7sffynuotrpvyv9trgn1fnc4qylxcxc',
                flowReceiverComponent: 'sfidenhyqxq2xirjks66877ttrxtwlxwro8anticvsml4l2m6pysucsqffnvwdwqlwxqpag98w89hx2pyo198mfoeoa8706o5w63z8k1u9ch7e7c41ztp5lw2ln2jgo2gehzgqxh4k44i3iaszhrphh222yy547b',
                flowInterfaceName: 'ms0r2dk3ubu4dgldxs6ilg3mocxkc5yaub46fq60rk1x2ntwtqsnuy2fxu1nxpvljla5ap1dupsj15v2umyiwe54ne80xk0c1v4yxwjvw5skxf8ja2ims3cwj885ca42k76r6lb5t71kq94d4cpz3oka76xhtuf4',
                
                status: 'SUCCESS',
                refMessageId: 'l93hvi5wtt4jp7bgyl8tm9dinci5nnlvioxh67eh9a23bd91j78rqz5p46v95sltsclks17w7wl8pghta7buu6ftfvald1amuma05w45bg3eevueesekah0ai6tkb5s69pouzq0iwuo0pw3wsu4557pka8tcpi14',
                detail: 'Excepturi dolores corporis repudiandae eos. Aut dolorum vitae. Deleniti adipisci dolore rerum voluptas et deserunt. Sit vitae ut enim. Saepe minus est dolor facilis voluptas eos quia.',
                example: '0rt9wyaj3sbxdmsn3qkyslrqi2ew0xct1a4yoo104yiwd86clwv8d62lrwopbfoosrerjis5go2t2qegkrvy976hc99g0qqobmepm2vt7qizohivtav6c4c2uikubxtilcj6sphoa330buc6z55iqzaax72oeivp',
                startTimeAt: '2020-10-23 10:27:14',
                direction: 'INBOUND',
                errorCategory: '5xtfwbsxzu2a4iu9ikjnde0ot6e3qm71j1g5ccv3uwahhexwcikusekrri0bygemuhr0cl11ifn0gdw4zv6qy9jbeqzn5olxd45zy9sc5kq8ttvdowbwdqemjzbiyo1yx6k4u89i9xqupbnglqar9isg97l37v68',
                errorCode: '6rc83qouclvy1ypcxxlb8gpk0qjygppef9y2e9nmgshoh9ul1c',
                errorLabel: 245741,
                node: 9799416634,
                protocol: 'qlsexq4e21gm6d7k7ors',
                qualityOfService: '8ec3ubcf1fosixc1w4wg',
                receiverParty: 'abqw9oxb1b5o9y3rw9ltva4ekqfo8setj8nj847i4r093o86qgxfpsv45ekxt4791pr7gf8ovgbnfhohpm3c53luxp1qxv4fq0jiq07kmt21wh76vpdtt6nndqcs9363t3q2h5zpjirrxo3stxdij70yu1isfw61',
                receiverComponent: 'grnx1zf6m6cg8x6p7wldig1kn4k7j0umik5wmwfhlw3g1msnwj8b2gypydcjo046s6jb8o5p7ipgtozukd5y5rldkuk57wno7nkmlximimhiug4c329pv13e4rem1fapdgl9f3ey35s64wrie22sia4fm7lolb12',
                receiverInterface: 'bi6mnjts7p01qq7630hhnspn4wqm6g3vk46hnih2665xnaw3drccgcliz7t9btvhda47itlttvn2m342sp6emxb71dtgc487qbt5ec61ps2dfkaesdgydu7ckruy3uxxalw6epplnlwaq90vjoulhm5yyzjnexbr',
                receiverInterfaceNamespace: '0om7mxb2x76re5s9k0oerwwajeo37id2lr9qcx4dm5ix1efbscwq0s4t1yedhago80sh9onjepnctl7ixwit89u9wu0opy6m7fvxxt7xoin4j6bzrt5q6gnxk4qicg6ck5e0nwhxjg6oebm54fv766s770jb3jyr',
                retries: 1476797917,
                size: 4735642974,
                timesFailed: 9964276836,
                numberMax: 3492159294,
                numberDays: 7934002208,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'blxycg5h96fd6qer53rzmi9hfpek3w444te3xj0vcwn4rgusjx',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'wn1jwhopmxxyt80cdc64',
                scenario: 'nqlzvrynj2s94c4s6bjjjcmajpy0n6n9m0vultui2phu2jah1yxhfkthp078',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 07:11:57',
                executionMonitoringStartAt: '2020-10-23 06:37:43',
                executionMonitoringEndAt: '2020-10-23 10:55:26',
                flowHash: 'xqm9xti31olp9a5vud7gxwol2l2jba0561wmvzzw',
                flowParty: '4h9eh8x9a3e98p97tm2eaxtzknrddijr81vf0p11xy6p3xmvlstdee07mvwjrndwnwa40duvrl07d79ecx3l642qptik8tgksewfkqmn5lcuz19qi8b556m89xtt7bg529dm4dhjav3ariygksb5qoqhicxw13nl',
                flowReceiverParty: 'k8ud2am0x0imsvvy82ex9br00dkjxnz0xubzs0s2u4y5pl8l0ldmpaihv1eojj8q18pueggpyvccuxwuoa2yiy3xmjkd16bmostn13pnvu2wx4sn4hith5abd3uo4kb2mu7rhhwborayp0zj6c32m9ucfv2b22j8',
                flowComponent: '6e0dzzt28ky06uwq0ywukyxyxpwy3duee0aggx276x4wigp3jgcaddzi456mdhzvi5u38ixa1kt26lg8uagyrq9u6ha3613w3zw1qgtiu716fc8ishx5pnnhw97n2hs0r3o2gsjq6cpez15v4gtme0mxdow46ct1',
                flowReceiverComponent: 'ent3vh01qrvqin71ycmy65a0f8f2tedhp0afisxk55oiw4uqv6f3vl6ay9y50bf08gkvn43rd90xqfbxzijkdca49z3uno15tu6bbg8c2x3t3yoafuy8ysh9tavq2x1q7hzpccwfq81miolt3cqw9novrepe5fde',
                flowInterfaceName: 'gpgulhbfxb16zpv6cnjswov6u0iqpmt8fwqkfdyt5dgcijxxoosvnp9lk9f7opk4on03yqye8i05yszb0srfhzfesx2fforoqvqrs4ov379q1if1y18ummonv4d7sbra3fymvoj21ha53dglps3sr8o9k4xn0cjc',
                flowInterfaceNamespace: '7sopqroxetxut2ypicbf5vc1scop47xo3bdnlav6x0db2xwu7s7r76l73rnvnm8ejj3xqdk4jb09xb9kyz718io1xekxqw3eza1hd338poympana9kpm4m07q2ryzq6a3ycqjnombggd87jj79qtdg8bb7shvjjz',
                status: null,
                refMessageId: 'lc5j239n8bompry76ixd0648kqm8hfyn2tmpttb9884omkzn8ctthscjp7i856drpsa0nphhcnsw6w9ce4qvp7xfo4j80o0ymrfmgjc333gz8d4i22ytkqj2p5ftpffyey53xqczwdycs4h15pw21w9xpjq0xcst',
                detail: 'Sint provident rerum reprehenderit cum temporibus dignissimos qui accusantium. Adipisci quae minus explicabo architecto ab mollitia rem magni. Voluptatem neque voluptatibus et temporibus.',
                example: 'x8vv7o4dawwa474kpgin2j56uszupivrww0rt64rucpcvik8p5bajjm5rjaw90m6p6p5bidahs5egokre9pdcopn4x03ux98az081ymtvq0xhxyo13frrnwyf6zcqcdole15wmcoawzhexp6526shpe74np1p0fr',
                startTimeAt: '2020-10-22 20:02:32',
                direction: 'OUTBOUND',
                errorCategory: 'x8kkx0869mayyusop94cioj1s4953y8rhozl1f7qci5e2j98oxr3x9vgc1wxvzqp75c2pgyy9zwxex0lyfwg7n2nsp2sw14pg2adrq866vvyb464xat783do4or8fz9ng201r9fyi7x2wu42e1ctu9e7k255tfdu',
                errorCode: 'bujjjwjr9i6nimeb317nhz3sw5m1dky2b0o9or4elrzw8zbikr',
                errorLabel: 477570,
                node: 6093723736,
                protocol: 'qz4t9neqj6bniwhtqpu1',
                qualityOfService: 'omqmmtlfz5czwp3e7oia',
                receiverParty: 'jer0r53s6399puntn4xwzd6nb4md3d8b9oye5tp6fgh6rza2wctsjf89xrto7fk6zroybqtfnir2zqiznex0u7x0yq4rrryk1pv3ezcexkjnwwqpy99s07c3v1bm8gikhoxu4gdjjobhhhvgt1ne87ahujm2tuf5',
                receiverComponent: 'y1ezyskuv4cjkoeemdqfbv0a5f1g42alckkivxij8aep7sgjgx8bz9hhl4uao5mlsuk5y5wcnqcwbpdmi14jkk9y89oqja6jbnlk37ukmqp8hoqdj73elkbjqnql2l71yz8qw01qkp9jl1d3q2b1pyhojyzbrovx',
                receiverInterface: 'mqg5p3gmaeidc3g8bfc8xczgepb0xlv9szxbv4dvkmy3le1fzkc71m5jpvv8qd7xfwwmkg203mzyui3hgaq8wo0uvim4g1wt3nu10pdtkgh0vlhiyfypbu10fdm0zs5yodzqhjoj0rrn06b6r01elo9m2vkklr7y',
                receiverInterfaceNamespace: '6z4pkk5nh9f4hajus13zntsa39nvq1gzfizhr60sndowz9ct7pajmd3ba7thcpwomw5vla7xgp5k8xl1hcajw7abqu593n2n497f2bhmrgb34ttra3zibumq8jeqxpm2904gozzib9r3vlvuuz70eb6q8826he6z',
                retries: 7382800548,
                size: 5898999705,
                timesFailed: 4360381295,
                numberMax: 2658951623,
                numberDays: 7643395922,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'qv9ogoafnugofccrx8pvxx6r10h4xemxhfykzmo104mb8e5opg',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'uxxisa5s8qqhg8x6ct7y',
                scenario: 'umklx925aorfx0srjkoe14thcz79xu5oj8zv1tuq2gtwnr15ioga9qhyx1yg',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 08:04:54',
                executionMonitoringStartAt: '2020-10-23 00:45:37',
                executionMonitoringEndAt: '2020-10-23 10:19:39',
                flowHash: 'qvunahry578tcsg6sf952xhf9vq64zb05p25a18f',
                flowParty: '2pc0nh89v6lpviwe7nbf2ucj1oodhekhjgosax1ojq21ynjzwmez14mpptj7r96in9p9hlc9ju7sr3ankn212smvd5ze8yxfqv351sqnhfnpft6ewgx0l09o5ya4xqh04vz50zbcjqp2ahjmzi6iboy6r5wit990',
                flowReceiverParty: '277wl71j6h2u67i968b51d8tdqaf4pg33xm607e7ginzv7h05morbtck7m3hduhbo91cfb12b7poeizusyjohy1s9igr61cdp33roxgl70btwl9415bch2l1508jdne529ts2de5xjd80nk3gfqtj3cc1yug5baa',
                flowComponent: 'b665pwdiz0uy1h1wp9bqkqqluabldmlughavf0tgj6vjtu9dvse17uoaov5m29a3fkn20g5kpyg6nj0vfvbh7qvh2zirkq5i1fd053ae13ri179flozlltehd5wt075ocakab779al2hyuvmtc8ngm1mwanq3ach',
                flowReceiverComponent: 'xehfb9gmmc2umsqm6vf2t4frxlk73nbmtw0zge8alq1xrg6yeipybo0qdkh1dbfvnczsci82j2xdzpqdi1ykd1xlnfdwl36ufw828x6fsvddsbp3vrm1x6baho2sqijrajtpnjk3jxqm4jxhnzbvoioei5iq3jrg',
                flowInterfaceName: 'cfp1zba3cs6nrtwnc2531vqd2ikv56ii4tmkkhkbrekic7vzdshehhg2r6ckg51tvkw7n7wwqgpwlxsk7yjv594gwwkuli655ixqb9obreapst5wkypr9v4lfvxhlzhx11o0w0o4knp76u9jcfrpy8rektoehfrw',
                flowInterfaceNamespace: 'rs1g82z3ot5omafec3qy7kk90fw9d6t2angsgk9p5kh6nuprg8miuchy06r0lbp6kpbfw3zshh968sui27mk8l7qrhq8opm9pu27tnennzb7elxsr77un1k2qy9p3ohikn370ndmun74bysxc9zueeyl6gx1rv1v',
                
                refMessageId: 'qdyucx5lt3tb8bznq73kzzb75epdub26moac4sj8wwo16h0p59hd3mi13otlq75westd4o437suujocrjntetiwzvjdj3uxrhfeerl3fy6htc1qnbx3txm4btqnpi4sd2jbtylzm3wg5y0jz9lwgii1jl4itck96',
                detail: 'Sit et dolor quas in temporibus vel. Voluptas non distinctio beatae suscipit suscipit quo aut voluptas non. Est est eligendi et architecto et quae est. Esse ut quidem et pariatur. Vitae laudantium eveniet molestiae tempore. Culpa molestias aut minima aperiam tempora voluptatibus accusamus optio incidunt.',
                example: 'z6n9nf7smf81i0csjqsbu9c8h4o287kfjubzbnfea8eqq42h8bsw1iqxseglc71ablhuojt00xijihh5kew8nvbn0inn0zo3xgqt9vs05ccjw0xs5g1jw053zgh8a3ucd204qepkhii4cq13pesaa60g2qjy3eqx',
                startTimeAt: '2020-10-23 07:02:01',
                direction: 'OUTBOUND',
                errorCategory: 'vrtpdotqw6mnxlx8bymlt2bp0t5deb8s4ux59ojeut4aetgr1pj0bqwqp304kfqsjvn9trzwe6147c3hbdc7xzd3e74uy3l4ap9rbrx58b5facpf1meqaus5ate4zmyesxqaefeo3rtwu9xjggxcfi8ncoziwuvl',
                errorCode: 'hjxqf4e5u1kedist7t9193bej4cqscizqc4olesw5lu3ygg7ho',
                errorLabel: 311334,
                node: 6856594681,
                protocol: 'ga45gggkry14497qdhyn',
                qualityOfService: 'ojfulf3y9w9eb4fqfje2',
                receiverParty: 'fmsmryjj5km1b1uxsm16dlu1m6dnqq36nzq8hdil8pyzag48ywr035fi3swb28nun9lnhr3l730z8vb6xb1o18fcopsyxzu24ogrlwu4a3q1hh4c2nj2umylj4g4logg1462sda9bhrk6gn79jjs0hxfebwy5pbt',
                receiverComponent: 'v06op9xktime949s03ad2if1t40swvwja20yh2r5p5tdk60ed4epglg20n6o9h1zht9ckwj6bmfvlm9ihc25anr8ybpa9x7qmdhnxlt149bz4sr4alefiar14opbl2vuaa3j26453tn4wfseex3jayg9w9noh1ih',
                receiverInterface: 'vrm7qulpgnop98tos1pnpcuo0tdk71i3o96ep1za52px6n968moth7hke5sktghiceghklpljslz3m7m1na9ho3aczhea3ysreturq569d19op0af5gzimhkrp3buudzeokdglbf9mf8o0vxqp6x6bp1p9z4tatx',
                receiverInterfaceNamespace: 'jgccbdxuyveffo2sh2h9hfmrpoghm9uogzgawadzyapwd93w5ecfp1zu6je3qhodrqt7xxbw350kaazt57gjs2lclk92xaf1wy4nt69lt4jm3gaiy2vtx7eoilrwb8s44w547t0p1vs49h6hus7nbara0oeurscy',
                retries: 8937214891,
                size: 7249588807,
                timesFailed: 1269256601,
                numberMax: 9439413246,
                numberDays: 9184559238,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'gg4v3m2y4006mw4dluylhd2ys2g070gu7p42jx7j8j2pt6d6b3',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'rxu2fcz38j475v5tg3rf',
                scenario: 'aump2j191v8fr56447ftjf16o89edi837ubdu61aj6soiawni1hejohvw2y6',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 21:41:47',
                executionMonitoringStartAt: '2020-10-23 06:23:59',
                executionMonitoringEndAt: '2020-10-22 23:54:31',
                flowHash: 'iyqgu201wkqddpcom9tjb2fbpr09cvtyetacq680',
                flowParty: '9f4uexhnc0koephppadl5kokkbzpjlkrphtqpthwfqdhcvniwxm840b7e4ps73npuns4t9h6pqwr4irrzvf47f8h5yj83l085p6q4lz8zj3pgxrceamst0cq1j12y4g1gdp4pz1v8sh0vm92vo74rmis55f9b915',
                flowReceiverParty: '3ojfgpbtba04i4szlk2h2m4imphbofcyq45fc4bs8qi7cskzbe7ej0amcufcjcf97wh0jbvxy2tamuxm96d92vtv62rbf1lx3rv55f94g1hvkfayt8bp8ssmt9szw3y09srtswquff8a4zyc12epg66dtmifksq1',
                flowComponent: 'qrs2tmgrik2zlbp14uzzyv3o5o5vlrnpqz7cm09wn574er4gwwb8plo5k5t9hb5r5bbsyhdmeygkzvectn8h4f1o1wytckyz2eq7k0n8q8fq60zc48ukwnwnhikej5x4i6jzrhteec42k76todk5a3qzww41wv9r',
                flowReceiverComponent: '66zjwhgo02vxssffzgzzcv5vi8vt9bzt5hna2giopo2wdq3tln8lt9uvv1zwwr1vg8hckrkpkjudyidyaiy9dz2l7y9mh4gfn1xf9xtki9iy0hl15431h7g6xphzat36ufq2227ayrj0w2f1ocrrw76ci0zo7bp2',
                flowInterfaceName: 'e3mxe2sjsivhmszbf611liif06ik0fw0h4q6ciflpv61lgmill22s5sjtk4s9fapobob4k7mh3m2vhjs1olbo5zhfannra3e0bqax16cxcaciasvs0bqg6jol16v4qzfbqpzcl3bukizxu6sdyypsw5tq7ups8ud',
                flowInterfaceNamespace: 'aq4affstagumcox4nekis0remvcsxjy6gooncq9bj17hpw65oginkvy46hm8y9exj3o1bci8zkp0pq2i85ktiartuy19xrnpnnoj23crlygdjj7xj44cnip4wxrglj97nla9b6dp0y2pdww2c6b4wafm5pkqd16m',
                status: 'CANCELLED',
                refMessageId: 'c34dxtr6t0eo2bcchd2l6mss8f4su4hx0dx9ygwyogeecrt5njsqj6sfxsluva7410atkd5bszihg38tj9jotges7q49cixwf0vm2w79ctwxurhuayya9v0id2lew9rww634594vlp5kl716jxumofa4ovantdzf',
                detail: 'Occaecati qui perspiciatis voluptatum culpa quia eligendi. Suscipit esse error. Maiores ut non qui necessitatibus labore dolores tempore vitae. Autem sed occaecati aspernatur animi ipsam. Veritatis iure earum aspernatur. Autem est fugit.',
                example: 'gmikwxamshsebci9hwlhnmgrdw7v02lgcros4h5ni81fs6yx2mlp9sueplrvwwmkfh8mtp3s91ppcdvqjwgcjolk5cismqsxlh457g1gq3zwtz3d96tgmbx0rdjnm6c0kw5bfn06yue5we3w0kda7dmhdj4bb9oq',
                startTimeAt: '2020-10-23 03:45:21',
                direction: null,
                errorCategory: '6mkys9sa2l8khwh6zd7zb46tvq0m47pyqbp5nbk9zuudq5un31qb3uvmua7psavcc0l6xg57uc953rozr71ncsg2g8ov6yg10tbgxtd5dxca25m0r7fw1j76w9qkargvnvh42du7ifhdjrc96tb9pdfdxcgxasbw',
                errorCode: 'j30p3bj0z6cgeq6gc7xr6p2wtyjhvyn0shliekkii6xwlrullz',
                errorLabel: 114697,
                node: 8502408808,
                protocol: 'f47wm9uutazicdyuwlt7',
                qualityOfService: 'juu31jmnomvb22sbdwko',
                receiverParty: '9nzlm78rwjkyz9vln6qyoo08ij0b20gnqntr9m7aah4vied9ob67i86r4byfw0qy9vxwz5qu04kesheh7g81qi44ebyev8zl6pwd08w6gwugbojeu6e3l5pk1z6g1tv0utyl7h5mzz4ldywftlq5d3tv2c14dtt3',
                receiverComponent: 'qtwqxdtt5drg3lsy71t5ywzklzaqindw380kg9ye4hperwu55nws5naf4x7zcq96d4hf5d6rrj8k4ihvz8brqb010k0q3v8all1a7z6m94759bdn64c74g7wqplf945sxs2h62lo01l4ot6d7kr2nrevtocm6vdg',
                receiverInterface: 'w9snl6wtmg2s6fohoif3ei2gk2mgrfq02q5ouf72ar028v1sa8w42wskqu6x1mhzsgczkjso0l8lxny3o6zod20etaw580gdwjir059qet066e1t76vuq722uda06iowqpnm1b7gwuy4k5z9l281a9pbnq374767',
                receiverInterfaceNamespace: 's67lr4be3uyz5rfs42dey29fwg3cqwkem0hjc6o94dex2vckbrfze6olifw6eo5njc4iu5zsqtgm9377fp4fg940sv6qw2bn3cvcgm4wwfr6ig86dw2j449nbde3hgodqaq75n1f65ncl55wwr84x3hw96qxx23a',
                retries: 2165950828,
                size: 7176074174,
                timesFailed: 7226163773,
                numberMax: 9427440580,
                numberDays: 9903830619,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'qyw184hntcfene49pc7y8yk0t4ik99uwofzqy3lwcxo3tpapgm',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'tuk06rtva810sgt7br6a',
                scenario: 'scodghbf93zaz3d0wyh82dflr9cj83tvmnb4ctx5z34xy9058gzmxvwbtc38',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 12:53:44',
                executionMonitoringStartAt: '2020-10-22 16:02:31',
                executionMonitoringEndAt: '2020-10-22 13:18:41',
                flowHash: 'en4j435o64qotx6wkld5bdc58lsie6zts3kxwgkn',
                flowParty: 'sxdvacoe8rz33bgrd0fsvj1ndotmb2bajhmcqsz04707omt0gvr0tcah0ds4m7orpbb7i13u6anfx5s9e7z7iju40gs9jgrjik9kktaay29afhguju8qfctlallpi1uj063mbxewmkvfbuwok1kc2odydgdzbn2a',
                flowReceiverParty: 'kzrkew9svhh406822vx48ow6rrgdz4gilocrmastm3904b2z7c60cgrir1unn1o4hyidzw8x9u2fl6p3doyusloorast2n5u8gp837aonhoksxcajzlszvgztyt3rika4wac03qd6gw8zlsarj0mz9c0c7cce1l7',
                flowComponent: 'pgrj166gcdghxfkl2pbyt0ttmoqft38pqbduup47ve0d8aa58ps3jmhoviz2xjfo3cfauinv7xfwjyok14ck7ftrug8mv1puscov4bbwa3xbvj9xyks2p8ro7yerhlmepehtppd58uz1idh9dy82ta31gr6s21wn',
                flowReceiverComponent: 'vjt8p5tbinrfve8dvs4igb34ujwz65qh4sdmpbhx4izbsmzvk3vvqcn5wssd5cneqzhvfencmsrtld3rjx7bl6vfi8efhnpz9p2c9ycev3fyoo4jwfc34yagtq69qxqay485s0zysq2lh0jguvomnmoernsn9yfy',
                flowInterfaceName: 'asu04lmkqkfwp0d7107ee6rhc6mgs91k7xh9s6lq8kz9u9o6bgn0xnt3ybrsu8viotdkv9koe5hjh5zo86rr2nevkhkw7ln3cs5eh8g4atvxj6gt9bdz8tfude44an4tddfd13rys2yhsqhsiolng92lz64bsq54',
                flowInterfaceNamespace: '7n7yku5fjmnz98kddu7zb2r2ooc9vf03md8jxsbg18svnvp8y4r51ep6u476g4zd5ur6zgmbfkmgyljos1vln22339nopqfs90ev4oujgvavvp12iq279sub5zeh9kfii6it6hpwttfqsq07o23dn6jywc6ylyt5',
                status: 'SUCCESS',
                refMessageId: 'hyv2n5v8joo875kdoo1v0y0bshq2gop0npdu5dokb6pv8lu5uojgnhz1bxepncnrlj2fg5ddkvnpt29dlqex47y7qaacwlx9l3ddtkfxika6qo5fj0cj5g0rrqilzb80qcnb7jp40tl3y6n17i9sy475gdiitbbh',
                detail: 'Quaerat et iusto dolorem repellat sit rerum harum officiis. Sapiente ea ut cum vero. Nulla sint eum.',
                example: '40mvrofxqzuswz4m454qxyugs4ijhqbtq21wct84mfg97a1muwwqgvtt4ydsm50grlxuu72ekx8qwhgfyg49r9ohifodm19li11eiyiyv6uoo04c8f4q28jukezjyf1na9int5d3oge5potsz74mil81o6voy624',
                startTimeAt: '2020-10-22 14:01:10',
                
                errorCategory: '4jf65wolbqx7zsrd2ju6zrknxgiwfzv97n2qwi5ttniw1iojjo4q6ac0g64eubykdkjev39b4mdfom7l1v62fq58kh3u2sbukq9svj81woc98m1vnu79x62gue7vsp1g4967ark64198r7c3j7hbwqqfq46m6b3c',
                errorCode: 'gopo7nct9g370pm16fe10w5vn3n33h0wunrvxtnmt2ss6oftyj',
                errorLabel: 718612,
                node: 2485171040,
                protocol: 'mfbmz8wcnwwl9wdqevgx',
                qualityOfService: 'kue0tglhvd9ozpcw0ini',
                receiverParty: 'crwx019tvyyey2aqxghkwdyakbh48zmhlsbnv4cavdd56cqw9xeumpiro8jq7gdefzgan1tr90ay9me564k4s94b94un6gj4101p8n5v62g4oua3mw3jkmdspgezh58ae26tqksyq6buv4rx41w0ikjq44b9b0u1',
                receiverComponent: 'ue1zsa34dij0q56rn14gz9zjqgf94y0410qt796nyyvd8d4k2vwsib0wg0q4ymxj9vtra6njhwex62aalpmg0cdgj8jk7mtid73qynbti7lejnp2q3et0qb71vfbye60uboou5y8za1zcyuuhowqyb6vchy8tllk',
                receiverInterface: '57e7r4c61k24x96iumjjc2x1l7hal954ehoutp3ny79950y00fbeqgfpsdkyiy07aqaghnfaiy2qk9b69ocnz8s919xot75j09shmxfcza7ey07qpvx5sjdycih6vy3fgu442ivmy8gpu2nal7ip1fyyru33fav2',
                receiverInterfaceNamespace: 'ohvc00lszxg0b6f1u63w29dxwejhzblq8168p8nyjnscjrvnltkm5h8e1l9687le4et2txuiebclbik01bju03hk8782uq1aninhydmsn28zml948nto7a9kklb7wqmomwfts23h2dh6l8nk6p7epg2purnrqsjc',
                retries: 4248477894,
                size: 3357261762,
                timesFailed: 4244946403,
                numberMax: 8117194234,
                numberDays: 6942536261,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '83d762g981v21pvok0nvqypb4vmg36omhf22m',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'hei4f8gaz8cb1idcntegwjvvad81rqorbr5vcmuqrdu4mkkep0',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '49veezdbu6e2kxthotnv',
                scenario: '1ngdzcc3oboj09jqi1krqdw1kou7vnq48xta9kmqkpmvbn487sh9gqif8g34',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 02:28:11',
                executionMonitoringStartAt: '2020-10-22 18:08:59',
                executionMonitoringEndAt: '2020-10-22 21:26:48',
                flowHash: 'xxo7cgc6rtiqlbbl8kqqtb8r74ysi70a58twne35',
                flowParty: '6j6mduevs1cmoqsjgp4za7hne7ufbrzphmztq53qeyibemazjt74k3k5ue2lwhzcko8cqd0wfjy4ld3phq1ikte4op35idez0neqzudsc3j8adz9j4szzc37k7j69u1k52qelm20duv42j6o53tkh5xmxd0yad7s',
                flowReceiverParty: 'csl17x8t2jmouo9jh9z355aahxk3qwlnuhkfsuznacrmhyvpv2yfcca4d7h2jbb6u2lccg7rtji8tewrmp0vrvbubauwqodeb4z404y7htz8s9d4u7kistw1ba0td6x0dfw40mt6shwdtev9kox4eal09a3abnef',
                flowComponent: 'fim47l6rpdph4bz3yheotmwyb9zi17qjzlchql3uuo1m3fk548bdkh8uf216n3doblytryefkdbe73m24fw3f6vdzd0tps1yirh6xp4dcmzxdp2pi5efvq21ejtddfxc9r88f2ay69kz2avmyce93sx4t9fy7cb5',
                flowReceiverComponent: 'xlsk768linrsgghg71fboc65zn90pphd8sg42597j0dlyj9mjw337ev74juprd5itkflwsp5k1ef8f316wy70abzy8sorwrxwr6q8v2ht0azs79m71u16r0kgvl2xdsn9c1vxzsfr1lktygxmfex3f1ipf9xgp2t',
                flowInterfaceName: 'cw14anp0yhl3fjed478xtagjfqq3i7f52oua8fw78eho3iat058ky2w3835utpzq5zumzrg249qx44gp1c6cx9d8q6exmtlufp4t1s15jwl33p2cn7bl4ah0rxfn2pdapkvguz2r7d2lek31jo34j6glujw6vldh',
                flowInterfaceNamespace: '8xvxqp5dkvh3tu0od99pir9y3xp5la73x7pwx3bwrued55sk9awh6eow4lsx0lfbbn5fy3q82negsy98kxgcutwc9h86gti6pi3w5jy5j2yccgvkjw7y2sr1vhml842cde3qd3w70drbvc5gog2pu7iedfv8k0s2',
                status: 'ERROR',
                refMessageId: 'y20c53u65ybkxatafrpp1mqqvcs132ykswgetdy2ke3wyp44wsybgidn3vgt0r1g8vydd77p1ww04zkms8j4wp48x49t2vnp9gov4o7f1ldktxh0f9buetpkh99f31h7ui7a31x5j6i2r5ba3icm3ars3ybt2tnf',
                detail: 'Ut quos sunt maxime veritatis doloribus. Blanditiis quia qui exercitationem maxime excepturi minus. Distinctio voluptas et ratione. In eius distinctio ut facilis aut quis. Quibusdam fuga sit aut provident voluptates.',
                example: 'muaqqaq1fs72eofft2vlf69rn1897pp11tki96blkz4ku62hohxyxijslmwwu8nqmg3jxcsz296f3ktimse3818gut50zelt7wi8vmfigrtiu6qytwh0rtdqzrfqb029qlmiei537ihutteyke8yaqen0k76xqe6',
                startTimeAt: '2020-10-23 01:02:35',
                direction: 'INBOUND',
                errorCategory: 'zkaknrm2hii6wxxwd44masbgulwvvao9tpe5kla2ljqzf73xx08anybviikhk6crwzi38ieo3wt727w9caf42aqlmzexxpyq5qslgb2mrmqwnhwgqk4slpddlj5m3kori7y05czhwj5g3acovx43eml6qylpqas3',
                errorCode: 'm1zyt1x13w86co3fsap5el5gozqmosnffzxsn7vjobnvnb1o1v',
                errorLabel: 748803,
                node: 4975500224,
                protocol: '7kisqkht41j9wjq332wk',
                qualityOfService: 'uavb8wfl6sz1a74m2uaz',
                receiverParty: 'ylhfoh82yj6wa4qqioxw1ex6fc7cg4vn3scwh8oai4hq6o3beag4ggsnkoqkgc7nrf6bfk5u80p32y04z6c0rc5t5kkhhdwcamdd35ppbxzzce5db5w8v7dxtl4bzkbs8tdtley7hlmd2hnyyxn6zpa2cst1zbgg',
                receiverComponent: 'mbfsbx5y723nah5ets4eiz4qz2x1s0ezo7rg77rkqru8fcikrwuyuv9ia98ar8ijs2rjewzqq8p3xogrzuea9s77odkr5mbvjnh0z06sesfiy2j3jiwv9fsjw377xohkao0bfmdrt8g52pc83968z3lo2anemsju',
                receiverInterface: 'jlxcz2teh5j1yc82oy1v4ywcv4gh2ssn9m1ayp27iuhjzcvusdw08m40qgypvww3m49tjog38atubh5ic7n153wdios47qa5iifuiulrbbzp737mnv36d4v3usyvft52vjpdgi0lvkuwtz8q4t0d8dw4gx58wfug',
                receiverInterfaceNamespace: 'l5sr2hagrrdj99g1xvcb0r9oeqn01rq04y4vhjh4qjjzwr5yghwx2jcatb6vtmi77zvx3j28hm628rt40ghmmqmuetn0glal8ma99piauqkr3s6haeznlj9ekim0ebdp1y6lajit3cn72i6r82crw1ieovp0db8a',
                retries: 4704172092,
                size: 6765401554,
                timesFailed: 2258939767,
                numberMax: 9706976676,
                numberDays: 2949961541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: 'oe21140sfd6ulq12ujp9kxztj54ltgomevx5d',
                tenantCode: '40qyi2b1pvdwbnkbrmjt5z7k2li29hoaql4520a5tlvwiv4cwt',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '8kxqtagtmrcdkx2c07ot',
                scenario: '34ax2inpyl3b4da7krdnx0wc2dimk3egd6apmv8f8usbzq6z1drbpfjspmow',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 17:15:00',
                executionMonitoringStartAt: '2020-10-22 16:36:50',
                executionMonitoringEndAt: '2020-10-22 21:46:30',
                flowHash: 'n47w4blpy7dkg3d6xpsfeiu1ux7vfoo63lted3rq',
                flowParty: 'xnylzxxu9j1qm29okjrvocuh8cwifa2apnijxkr57hhxjeupmtt6q23c5jmtn2fhj98lj51dz5gumvo8zw9gys8g7vwkb8ftod1kyt8u0ysjc0mq4b44xxhj28tlam337hfrbnlm9xghcpvxaeb27jb92h9n2vwq',
                flowReceiverParty: '6u0i8cr1jzmilkla3f7z52rbvzhd4pfm28n1zf88s982tgufbv0m8lzcc4euowxqknijzgnrh9vizrq512ic17ladfpcjjdb59he91qsbg86mrgm048dcha8j4plfmr977kiwd4t8tgqhboegje648r0gj8jwvb2',
                flowComponent: '3oj1x7ko7rxt8tkz0ccapc8i14mh5p2ukow7127595u7lxgg5tz65bnd7xu1xe609idrkha3gze4u5ta0ttd2excm07jtmobtc8m63uf711fkn4dmr8jap0arex579628t8i5296drlgr09n5v0lqw80a0cuy24o',
                flowReceiverComponent: 'mxgc931x73rtv61upzdyctxs5s0yp0v7zd95gy5x4oibzsevu4nz45xpov33ra8jmw6wgfv89xtjienabxg8w9d5estxyqjpxetufmqcbmnq3cmhvvkctmmd9lec9zt4o66pr1wbs6jo2vsjmnq60j5zhm2ger4s',
                flowInterfaceName: 'm2yvh0masaia4wbv9do0z7la23q18f6pob20adfvfd5ei05c0u2nwhkm8lnp2ae9dyrbdtd9nrkpon6rbx3sjl2lbgw2ao66j4x4ges77a51vlk3qajtxp04nssq1foendl8hkumekmw2j7noofc8npwwjf9v8zr',
                flowInterfaceNamespace: 'v5pe66482s86ifzsppoa9mzth484tz5xo35mgu4ac262whycwi8yyd4q1aiotv8w0448tvj36cw0vpfatpy4f1rb8ju9812db2qkw48nkfec9hpmqfxkhdclh8qre42strdfdf4af4xwneayh0n66g990ghb0oh6',
                status: 'HOLDING',
                refMessageId: 'udz52nig1lq1ybexsctz9kqdnknup7cf5eurjsei4zjto56tu7lywao4tya05jh6cbmccqaodb38q1jjqvhqyrs2vnokipfddtl6epq2qrcvhqey2986e11rx25d6g8mjamxb867nf4vlphx6lsnpzfqmy1q2b2f',
                detail: 'Est debitis facilis natus quia. Reprehenderit vero molestias rem enim minus. Aut dolorem id accusamus fugit id quo asperiores neque. Consequatur incidunt corrupti velit incidunt natus mollitia aspernatur sint at. Sequi sit nam repellendus blanditiis porro molestiae vitae sit. Ut dolores at ut corporis est minima.',
                example: 'j4lafrtdsj2x1vdaxs3n1svlug81szqsfmynlm54exgbbej7g5sqmyynshk5jl3spnqdm5b9htcffojpf2k37fnqa4j0njm5q7voj936sghw8q93vnj1mjsyza1spjogzq05n3l3xbrisrvy7e2q848cddnmykoe',
                startTimeAt: '2020-10-22 13:03:29',
                direction: 'INBOUND',
                errorCategory: '73oxng039uppd270256hkbkkt49pd6q5d0a7op574v70tjuz0md8ihr3ktdgusa7ynvn132xxttqmpx5igblednxvuu8775eno3v8j3knmr3nz1rnfbcnxe7tsv1px72bhi8bh6pxkdyxfmj9s9ifiy36v7cvw6v',
                errorCode: 'txypq2xvbwfxv4ax1x5vxv0s3wxyepm0tpu4w5hcidpwxuz9ly',
                errorLabel: 220847,
                node: 1850825926,
                protocol: 'y2lf1erk12elmefw28gn',
                qualityOfService: 'dyt2nrklha4a6mubrdmp',
                receiverParty: '0z7xm1je7km8ho82o9w9sfolcip5ocjqwgq1tya5x8jvz5xdh6kb2m735ep14lwkce63d0lbheeggb5stq9lyygd5wcweb1kqnqdr555fk0sdhmqlykae7trqh04k9bdwep9ehmolrhmbpbzopr8mrfmbgq2ryr8',
                receiverComponent: 'hjjxto3e4uyypd725sk17is53a241j2mda9onm4ijjorwfsitjvdhbx5brxd1vsd63dh4l6j7gjieykg5e4aa08k5bef1idoa20cp3c8f1062nbgtma9jtq7rx7994carkrgtyx6092655xrfryzyinaaay8ektx',
                receiverInterface: 'vg5bunoigjppqup57ngdcybv61j4sqrhhg7o3harlvr2cwrvjehgiqz8hbyxn7adruda4a9e73uz0seyjc9bmxlevywykgdm5xg4v6yd7ray7tt6x854w5xle8f2qe5e47pwny5w6p8e946k8plnqrjqpmlt8ekn',
                receiverInterfaceNamespace: 'szuxrhrlvayr4ydydtite0wa3i79wrlkg26insd41nvg52ktfen562o22yllmpxt8uv2wzfeg7y07q7l596hut80lv2umevvhvi1ktebixx7r3sw9qn89kwc3412jtm666j3b1fmk3fphsi1krudr8mym7p7o49c',
                retries: 8581386012,
                size: 6573389274,
                timesFailed: 3540110951,
                numberMax: 1706784349,
                numberDays: 9471926339,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '2jzjwo38v2hmql5fp6h1zf4wepnr1k3xyirlynvbx25u739aq6',
                systemId: 'hwouovb97ttebixlbm2w94a902d944c90zjh1',
                systemName: 'dx7p737mb6vps3v052ks',
                scenario: 'ay8tibrgqirem7g8wqudjuc8299inmn6vkki6jsnjmjxky7k1jfkzw5m74h6',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 05:54:45',
                executionMonitoringStartAt: '2020-10-22 17:08:28',
                executionMonitoringEndAt: '2020-10-23 05:15:23',
                flowHash: '6bvaqlgcnn6olur2x0j635nfzs7gd18w014y25sd',
                flowParty: 'moid5m87jfii5byoodq77n6svhkzqasi8cm89adiw68g8p5jnsw243u4ow8j7ouddinb13f6e0rq7a0nxyscoflju74iwbo9uqdtgksvt8rbvp25hs8s446keu0acpap7vq3j2k7azyx2v9sixhb4rtqks0aqjhx',
                flowReceiverParty: '1pdepngvlfpx1x06s2spwotrhlyzpoji8xzbe1vyw8mb4s0q16gxd777n011ui21lzz0zo2p326tmkkmbjuy887d48h3y6shv9w7qbng5zckx14o3qt393iw5q30ph49xg5leomlsetb9sduccztzdzl3dma7rgs',
                flowComponent: 'frl591cnfjodeckh1mji9iiotpohnwqsp05ttkzb1l65zhxmwqtael8e7mj4vqwqsvw1jzeziqz2kcycdditw0ii727r5x4ulpd5zolu1f7frrzu072z573fuzyo7v8fn07rpnfq5l2uvzkf510o28tlqpvfoip9',
                flowReceiverComponent: 'hrepk2h5cevc6987dw8sa6krsm971k0atzjl96a5ynjrl9b8olwr842jyssoxndk7oiuci072j5qlm6tbz56n4aovw996xdc2726iunp3l67j40q8t03izaxlb3z36mophbedzkkobztjnui7v10yteua6mfife7',
                flowInterfaceName: '1fhs4uea0ynb2jfmas6pur2vgbpgio7mlttxezlar6prs8bpnxoae271nsedm0ovoif804301845hfw226yl1rhotrlackm8orr7st7l4y8xihjrg6kg2r93wy269mm6y7ikwn453816a5iwxqxjk2x8mjh4st4w',
                flowInterfaceNamespace: '91fhoo5avgvqpeqr7cwbc28tzdymwx3di20k2eqmmz9sd5q0z4eeapd1jbwipo4ah4ow44x4nme6q54xa1sh87rrifg95jhooc5oxgdfj2phtf18ia17qux5n0ac23ffxl140ti6fbgexmbop1gk5zcog74jcjew',
                status: 'ERROR',
                refMessageId: 'lmnw1flc3sl4o87iooz8uf0ajuis81fjjqyilkhqiayxf7iwj2f2kewmx9f139lsmpfs5pagaznd476cm31ph70gav80445lqgcudo60k36tut8i8iqu7ohnxvjaqts6n6afxvkujlevppgnlmqe0ecbjajue7ix',
                detail: 'Blanditiis eligendi voluptatibus deleniti quidem vitae quasi animi. Quas cupiditate veritatis consequatur quos. Sint est aut nisi fuga fugiat nesciunt. Nihil voluptatibus qui dolor quas totam.',
                example: 'l2n6ax83ppgwio9wxpq5ruw7k7x13ohvuw0fsap8azncrjcqphyj5tdje95gyesf1uyy6oe9fcy03j48qu8ogs01alsaeawjpt3ctzzt5n8ad3s1hod8zcdxbg5pvmaynup7jqlnj8j9vwd4r38s9u7o183jrviu',
                startTimeAt: '2020-10-23 10:38:09',
                direction: 'OUTBOUND',
                errorCategory: 'h1x0kxz5cykiuvx5cmj1b4htec1fqso4d878eyigicgd56s6mr8l9snzg109w3gnaro7rko7w77vnn1db7lnq053nmkcg74kmxrp5pi0gbjvo6sqo1o55kp60opace6eu8zca7c7rx4yxbgsvfxq35hf0xvyer1s',
                errorCode: 'vu67xc6b5f6722ehfb81bolcap4zmbppn60oizq7dsuasy4n9l',
                errorLabel: 907937,
                node: 5569652811,
                protocol: '9q3j9yo8wdco8k71m8jr',
                qualityOfService: 'okp98l3u2jtorxl3nt0d',
                receiverParty: 'viz1qt3dr4d81v83811c4sg3dkdwcvsnvazgr5l3i5yiyjr82xq6gxmlfefrbbggv3vx9ph5fzh4iab38t5rvl79p67pmg09e4qxtnxt0olvwhlscdg4w3hwar2wqyq8eevx6cxo26gk4fulch3mmecun21kgpgd',
                receiverComponent: 'lvcj9syoonxt9y4o2tvp7epwsf6z34yfh396cp2791lv11u01wuknagjm11xaubv0fvemkrackrqlrhl0z6mas15pcsyvautrw6sdsah2u6dy07yf5ok6q8nxrhylj3gyssx8lmv28ryfp6nshur87zx0qc5us79',
                receiverInterface: 'eqthtzxpb1hrr52v4vru0d1umc95qceysdcrr7otxap36dftgx9x1gec9febukmfgh5vn84y3na4advu6j4fp19xz9s0s2tejltwj15tjtl2593depx7zmteex6ecae4724jcfdl524tlfvtqyg5myxj2qz6wlke',
                receiverInterfaceNamespace: 'o5q5zo7ntmqyyvbxa0px450t15h9z2laknwdyxbglf2dfl4vreli9ujelms0dcuc5uwruna6eivg3ygy19zcpmeif2ajgwc9k7qxk6bd9mfpug7zyzrmouj4ys4d08no5ktwphtqd05l21u16lcjx0byux7jx5tk',
                retries: 8726923554,
                size: 6972061702,
                timesFailed: 4218536193,
                numberMax: 4492425572,
                numberDays: 1507143726,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'm9ajv8uqv8pl6x7hrwynu21p4fblygldqpf0flsetxkm1lxqe8',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'txh83j9j3awr97f6j62r',
                scenario: 'e715v0t6q6l2ekvyzn2muwuads90xrpmwvcuvbhkze74voth9kiud2rjmkvm',
                executionId: '8920b8l74cckh8b1jepwr9ilmlxl0wwrejj30',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 11:20:36',
                executionMonitoringStartAt: '2020-10-23 03:42:53',
                executionMonitoringEndAt: '2020-10-22 23:28:59',
                flowHash: 'm8zk8kk6ijyo6t48i2ozaq2u92itb0wjj117ucts',
                flowParty: '1ysobtwghs0d2ugt2vd689hx75h4j16i59z0q5na1gwygwbwvpll56rlylzkvxgf7aerlju900en25r9aqirrwlenhgs69832vb598ds4ov5vx82hivr9b9azchiha7whrdtdoub2rz8ughg3t8ulw2lew61pbq5',
                flowReceiverParty: 'bdx7rnvy0xb57hy4g5curcey3u6db407jlwfj9j804lmt7zctz9otiqo2s92m8ukqngokkl1nr5xq9kfnt20259wtinzk88ulm4l2irbfovagetsnk7xg6iozfvb5f0m0i8biu4olyb4ch5lhffwygzls8clz3w9',
                flowComponent: 'zx8cxdr1bq7on08z5vjejyn0rz3qb1uvbeo8gfg9qb33hzb3jksm688y5mkr8kd5scwj0ksls0zh47fdkjhrlce7it9mfpzv6eb3yhjk08hdn5ixiv9jg0xu7urrifcig4ry5avsx6k7yvd8irk32w9gvmk4emn4',
                flowReceiverComponent: 'mt2he040kwr1tysdsjbs0hvxtkmahtu8z61xwtq230r98vpzpwr2887f8az4afv2wbx71fuc8br4b34n6ks1y607vactbbhvtea8cwvl9efrkmihcws4fal6xbw4eym2q07j9y2jwwfcmwofw02o9ypzqci7ntdy',
                flowInterfaceName: 'd3g7zq8a2ycv3p9a263jelgv0fwxffirj792qyre3he5b5c3fhv5ctfwql6kva1td5vgc2qwz2cmn6msjg0qfbj398twe648579ocoor1gbp5sh8sd5g4uqs07jzeqlf15bgf3gjqqep34ddsm2q0fxi9ukfp9kd',
                flowInterfaceNamespace: 'pcfe8d50kjp57xdbbpu15tt6fr8ajzsab5mwxvnqgdhl2t025gf7d0wg1fnx3pd3y8ypurzraqp6opkxu5uva5syd3dachiltwvlxsy4ua3cvgzg4dcvfnsheam0yai0185scv7quwpwbkrso2n0vhfh736snsqz',
                status: 'WAITING',
                refMessageId: 'e29byf6vbdj66elyhx9ry4ing9vp8le0oyr80iyy28sp1k01agdqtri5s2olijwxwsibwnub1updfcwnt6ybqu4jl4laem27idemrexvk44cepo6xqi49hsp9c8q4z7yohsc7ghn9m4gn45pwbo6kutsihi8udlb',
                detail: 'Fuga officiis minima voluptatem eos minima distinctio aut. Sint sed est corrupti voluptas qui aut. Est enim aliquam debitis molestias vel impedit rem soluta iure.',
                example: '6dy8bnfgtu9wwlud55eiibetvwaowruvwoz0zgpk9xdgq8y4go70bzu5iuqtv704ebjhblxchp4v83ynbxhha0ifvewjddngcxd8t8fu2ipbvbng1yfjr9o28r2dgauk35zety532h3n3qfqnya5yz3iv1gk1fxg',
                startTimeAt: '2020-10-22 12:50:55',
                direction: 'INBOUND',
                errorCategory: 'd6x7mii0qy518ctwpxx2us61grg2wrfc6o7puu6540y5v1dojlkii08tj87cdu3i9ocsnt91aqdu41bd934zn453czj51k78xb3gr35hign6k76i2wf34s6lnj1m2xpesqa416udbhmkv8hfxx3bnjj7jsqj4xll',
                errorCode: 'fet4hlonvvis1fkibzbhtdqv5u86s8uol5at66vggcviohu5sr',
                errorLabel: 535739,
                node: 7557733490,
                protocol: '02c3ab816448axtcscho',
                qualityOfService: 'rocs4m1869aqsqbucyaz',
                receiverParty: 'h19sqgql7wjm3fwdneizob3ocsbr8btu889e3z40lm6wgro2a9czb0ahrbj7qybdq68p0vy0gyufkhgbdx8m5euxzl4ns0whudtbew2spuq3ou6fwrnnmh0bewco7ya7uub8iktuew3lp0h1w7d2z0gm5r8cm9ut',
                receiverComponent: 'xqdtcw5r374v7222se8z439ibltwtzpcpzvdyo00b1ax3p2h7xnk2y5petjofedclioifwuvnn4kkcucidniq2o3jify9s3kj8gl9myz1t9ro4tapzz2e6rdv8lxiw7534ejzz4ni6ifeatrrgn34gytieo0chjl',
                receiverInterface: 'g3prjt1e22963xb5d71mt01ylkzhgbnep2blvqapzlqpybm4soplourvm12zto0f4njz1jngpcb64c5y3bqp1zmbgacll4he1cn8h32bmj0fdz5qkglzbays1l34gzpigjhkzx2xy07g82agaoiqah4mgy96mkvr',
                receiverInterfaceNamespace: 'fpioinnj787n3xmky8khbcgbgz7l08a1rwuetsdmkxa60ihf0hisjk2j47dp00uinih8y6010g9afevdawfu4zy4rq3e3reqrwg2g3wnxpcd2xw3216d0f9351ootmgusyeow183lpxolgwxxatipx3umlv9dels',
                retries: 8140176697,
                size: 8088864621,
                timesFailed: 2788208568,
                numberMax: 7760571370,
                numberDays: 5208652577,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '9vbtfvznufbksn2heyukbxh8isuqxqkw8gpligi9jx1tj1mrav',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'fnfrowdt2uytcgscc5eb',
                scenario: 'ib0wx9tk4hz9caxw91wfpkfm56fv2jznxu6pkzpxutdtfr7fd7agiiig6nob',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 17:53:27',
                executionMonitoringStartAt: '2020-10-23 00:30:52',
                executionMonitoringEndAt: '2020-10-23 10:07:59',
                flowHash: 'w34nswqgkwj1i21bcn6askvfazeohvf0ts67poiet',
                flowParty: '2lcgxwsb69xnlc3xahlpt16zhbincig4o0og07exmcwuab5vuqyoknm3ohe7sif413divicixkr0mhsq2yoppxctduetz5w5s6bujzjqdd4vdoqpfrjydhbaizody2io9vu5getmma0xbbyxehxlrijut1on5v7r',
                flowReceiverParty: 'opo15aahvxootvivbutxugsebvobwanhn2goist2vfcg6neybxushdqncg7ungiga0ngmpistuyb4hz3mnp5kj7hg1nmg459qo1tmudl0901ahk5lpaxo1vbno3id3mm0exspamwbf1jy9ui2njgp2f4bx269lrs',
                flowComponent: '7ul9w65101bcwzvy56w7fjc1n1gjfwh3y17i3j5l8xv69s7j5v2fhmp78hbxpwr4zac1ssb6ro2uqht8hbrka4jp9hduzzdde9hnmqn717w0cklw1i5lyitcydq6t4wmfzkqh6k9fcdmrjjebzgqqs8ad0s2syyx',
                flowReceiverComponent: 'htxmuqatjsngap1fiqhd0ki9v360srz3n3uu3rziqitg5xwr66tg9bqx1q2yvuwoa7fazohhcf0pmf179krfrsgtmkzoi4ec9nemo7us50xfwyodnkrfc7ryu7oxcefmb0grsre284iq06jop4jyebvzxfrswc18',
                flowInterfaceName: 'ud9vdl9vav7ml3bibhv1efe3zpj7w5mgnwarm8aculpfxuapr6afm7agp5ij4ksx5p9rlbm8vkskgm7engf3syst774sx7haeogfxtvzbj36jzgo8qdt6077bx5xibh2393lnkj3lrcagacxv1mmlwu7i4nw9zqm',
                flowInterfaceNamespace: 'dvaoqds3cj07wmbmka0l52kcmskx62up2j3qfuhuwslb5pc81av5io4mjs6zrwgsvngn0l7lyta11jioc1e10dj66z4bo0d2hn8ho8cubyvbxvjlklix3b9tlxebdngh3k4adl4uxdddvlsmbrliw9xwqebznen9',
                status: 'ERROR',
                refMessageId: '2npqvi4scslml6924jv37vnsdty8f5uypcjfv9nzedhaiiqohzcn8rbgebh14yxfscneaduo3b2vaupk3ay1s0jzymaay4iwn492gngwkaz97ngdtm7p9n0bto4onsnsx3hbygirzqjn2dukglfs5apok9d0zvhc',
                detail: 'Distinctio autem consequatur hic. Pariatur iste totam autem aut. Ut quo possimus et dicta eum et voluptatibus voluptas tempore.',
                example: 'vfjmtdsn3fr49r1p1t4vz2ydjhni2yvlqlc5mcc3k9v0gbd7w2xewan3g6rdmjd0bvw37mcw9l6957g82e07yk9k6bpc97ovp57sktaagadqud7v76cpdbqimdyuoshll8wr7qz2yzr9i60nsxyjpoaqgdyqt6js',
                startTimeAt: '2020-10-23 05:02:32',
                direction: 'OUTBOUND',
                errorCategory: 'zwrl8ni3ktymbbff4tk93qrwzi419lvvxbjuya8kxcwwfuh79ybc2ebzclmgq3mw6ijixxe9g8un63vqvkx6lzitgiy3wcky04u8nar5k61ollbxuv7gkbm0b5m4h4208xbnuduq03vw6fpqeh8mvndr3g9gjjer',
                errorCode: 'jozd29oqwo0c2rsxo5ad27kh3q586l80l8ha412ss7ua55nmuc',
                errorLabel: 322416,
                node: 3433665322,
                protocol: 'b7m6i5rpiflpz22b9ia7',
                qualityOfService: 'icdn0d8gzjj0hde8lihd',
                receiverParty: 'qoqsld9m38micit6pao9nd1xw8ras3d346esi3dh8cuuj1ohg897xixxkyh2oatif99s3igpnaw5pbblez9qp5antnnmmriux6y40gddgojuwti6q5tzp5o58s8rp3xx16m8umes06q0fmqcvzp92jju7d3434v3',
                receiverComponent: '4zow382yhcv8nzcesae99h65mbxj26lto9j8mzyojxlhqw9jbuy2jxfyk1ua92bvlz2yshta61itge5zsetdaw3y8qfrwbmjfc2cyvty1xf85qu4zw9niareqdlfw1pkm2g2y43qrenabb9c3kvvgd441igv0qdp',
                receiverInterface: 'j50gvvkr1i5bc5mojosh4820ikmbmeuebgx25jzsbqan9dtqdsw2nhg5aljy23ta3uwg9jtewfe7rmf3n5bz9ecntdk9v60ycrmoybrjxuxf14619bgm6pgermbijhkqyo7x7ylz7c4bwuancj5x0oamkpcj0a1q',
                receiverInterfaceNamespace: 'flyxxiik04bg390nglwt5irdewsj8ohnibcls26c9dax15h17zl4pqcbqty2a1dae3w6si0wcjdsma88dkbeoytne460ox2ywnljoulxj5jw2xce75pqiiqf85b601mpkafb2cvrsl5yjjwudgb1w80kj8d5xf82',
                retries: 9016139575,
                size: 8975555227,
                timesFailed: 2860425444,
                numberMax: 5285794160,
                numberDays: 2949676444,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'kgirqnhcz2k5c8tfwh6b0maq85uhunqvyabsnyxa724vogif2zp',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'rrkowdvovy0ig7yzhl3r',
                scenario: 'ozyhwgxl1m31rewqh539bvx551io2wg6wv4az9ust3m0crd4vgq8ma7lbpwl',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 13:33:07',
                executionMonitoringStartAt: '2020-10-23 04:22:16',
                executionMonitoringEndAt: '2020-10-23 00:42:15',
                flowHash: 'yrh7n6fjhoajds5z85siw7vl40jkazfjphbh22gf',
                flowParty: 'z4479w05wdq547rfnhcplr1dvfspwa7u1d2iiu8cr1vb8qj5jvvlcpdwkag8hn88cfgulvzbibwokec84xtovk0knqy3w39r9nnygnqxa3cxn1lczactv42ywe6ryz6m1mtadqh0rj8o6z35b6zvtnk1i861f42g',
                flowReceiverParty: 'vmw3ylz3gaglvn4i8ndl1bds1754etpat6z4s65m6evfbxxkhbyldk85her3mt2ouegejypu47h804g649kd5m66lnklaxe6acnamlshoy46tiogbt68azefxricnrpatf4mlywdeci3btitdty3ttbivbd5yul3',
                flowComponent: 'yqj35ue6xp3konwofda1leqqid2wm1kp6a3dk8mpqrz92i576zxnkjvgtahjw2myk8x4m5zb2y0c04k1blvcvwlo6pbat4qsjig62gp2obk5nj5btz4ollmpbkxjmkw0dukgkvjqu3na6py38m6chhvx7mndllwq',
                flowReceiverComponent: 'wf1o3rh81s33wv7xdcw50s452yrtk3bgujp4x79ymeqa52nck4lx40lbo2fhock9uu6i8hmfixr0b9fqgwfzuzfollkg0zr4wjqrrk0s8zgf8tb1xzwndc17g2k8zdceii3lmq58xdcnvq5bf0nln7mhi6q8hl4s',
                flowInterfaceName: '51d4ujyfekf0fmgoioks1bsyiwrb1t3lax0n4fp82ltcnnpickzm9snf5ere2vr5p6238b6bpi1wrw4t6hvhhbf6jtz6he4jo9q7ka8ngzzhxfud5ho2zzw29lxda3h53r9bxt4anvm79wxnbtz9mnnrk16hjj1c',
                flowInterfaceNamespace: '8ad1zncg82ln721bvq3qiv073vh2nqn6owir6yb8yfgtnfvlmxn64q3s8mt9tsw6dpc8rghgzb33kht0fsyajz9xsbssa5aggeutetmo3g8qx6i2rpxf2o5ys7vj7alvr1y65xcqncambnrny9o0pgjlvepp23sx',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'm1lqpc5ajdod9c5ta0twdvqohwsq9vxm12znhnhxicgy0homb4lamuoie3kggng0t0quipoym4ex59p048r8kpe7vhuqzw14zq35m1y7r3570j8ekgg17zf0bnv9w25dxu95gv584w90sgkh4teej5b0b9qoeujn',
                detail: 'Recusandae officiis nihil vitae reiciendis eveniet non ipsa qui illum. Nemo quia alias et itaque. Quia ratione veniam odio aliquam illo commodi rerum reprehenderit cumque.',
                example: 'qgs5e748nppqmzny8zwz632tt8fop5irk12gtzg1mefievxd5gnu9y6j9u5m2yr1mp05rhy7mmid6nclu9thmcwdu3d2fig5v3xk09tlu55x86wvtgpzzb7om3r21p2lfpaidmi7ez5cnasp5i23ux3pe0vib84a',
                startTimeAt: '2020-10-22 12:15:24',
                direction: 'INBOUND',
                errorCategory: 'h6xktlv560kongrit5lmfb610dwsmrnoekr0ro4e273gxzn2wx87twfuprl1jjn266aovej5vumr487cqo35ev55calzljm2z2li2zg9klxxs0sxm60k938hvcpdg8aszf959yy707rvp4k8sfj4m19lif1n03yf',
                errorCode: 'sl6hro1g3vlup8posva074h71ev9a9x9jjwt4x9nd04icrb95z',
                errorLabel: 406909,
                node: 3342264940,
                protocol: 'ob5oel5koi1xljzva0bo',
                qualityOfService: '2apx26apf5yaqcmrluqp',
                receiverParty: '91lxzoxrbluesncvryfkqozezpctjh2cna6nlqi6zh0n2u57g5bltoawbl0uznup32maemsqo90aamshhgfqhyp9ehrno8x2a1uhcqe0fwbxu1643wvk138a502ainpqrqqej5fgzs8kb7dhqcffdmum2ulnytnn',
                receiverComponent: 'jc95tjm8vffom9vl7ajfl3yvxbhhfk71oi6znx3arqmvvjsqfdeoochw3ri8wf9dte99ac06ls6mhk4jo796l8otctqmpobxro0hcdvreh5u6cbeq6snok66jp07wv2ow467fm870ptlcta6lt1rkfgd09vdiqwi',
                receiverInterface: '0xd3tb42u1sb14wtjag43p1k3o43sc15falaq3xyzafcmw44lota0g2eugbixg8ttr7navbsirw4a86oa5g6f8trjptetaysib5kcjpsegzf1u8bvekisicmj49kdpftbvhc80dmsgsyf9iwtqgogtrwskiidb3c',
                receiverInterfaceNamespace: '7js43a85mey32jo5sx47a2c0dirokxk8079ztkqa87gmkk5dpv9pohhp3m3tsfxn5e4ik1q4q9oucrd4ia05u85qr666hib579ywosdrd9t2k95bc1t5zod8r4ruh5eb7p4yucgxj77j9qkpd5khz5ibgzrv3eu2',
                retries: 7262402999,
                size: 7912285665,
                timesFailed: 7128514841,
                numberMax: 4199251145,
                numberDays: 7241332223,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'qx9xwlsujr4jvldqixi1xiqfpcwdxj54d718xb1tew6n52in5x',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'dcpcd96b0j1pm0h4y378k',
                scenario: 'f6b1e6y9k14516zxhkwkbfy2jg1c24hnhtdqgiui52oe2w36wkt81rnxq7a0',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 00:00:47',
                executionMonitoringStartAt: '2020-10-23 10:37:54',
                executionMonitoringEndAt: '2020-10-23 09:28:50',
                flowHash: '2y44ked3h3zokksslodcdzyr9c1925sxp92z4lsl',
                flowParty: 'xw2is7jb6dulshbfaouadgxbvv4bfbxmf9w9l2ymu1mh68dmupw1qqb2zsomsyuu23vq3va5n8aesy9ltlaxvwdrez0h81abz9dwi6blj2dbidunjcsqvtumucv13erg6kfmoh45ih25qs7tzr63f1nlk4w0svnm',
                flowReceiverParty: 'vj9pcq1uetid27pw2mwyhbsqrgl06cttq75vcxajo1yj68vd4b4pomulw3fa5z1ib35u7wgr20e61giriox8qqvi2rgs5gq7b1la8wcmqrtdbrs6lnz0sxr6e898zaapcbsqfr33tqtqyamt72s1oifeoo8pfoc8',
                flowComponent: 'kbvm14l5b05xxdbb09pu50xkxsmbddwmzb9vzu6l227rbv8dan44l6ays0ef13dbju7qnnx84m46nq9mko1e9amqmtutb1y4n4fb7yvimza2aawt2fmbdgwaqwvp9s4jdp91147elnni7vfs39n37m21d8whe9qw',
                flowReceiverComponent: 'kebnif3y3vzx0znqrkec4u6emaf18h095b6xeyyqxw5p11d4iklprgtgel32unv7zwfj8c4pgaqg7wz1kikti1cx9pe661eo6sjodaioyiaj8wu2a481za1onqtowygvccoxft8lo6lulb9pun7o9bkcrsrh66rx',
                flowInterfaceName: '9wudgnkfu2yvtwls8ve38uwjlyftyxyr87z7w84x9up916fmomympj05nc82w8m21vlw6vk940nfy6oc1044fkouy84kdbtlavsm6laq1b8xmqoy88hts26jwc61hrsu5exqzd3kfdu7dvy1ckvg9xio4i07m6lr',
                flowInterfaceNamespace: 'xvujt16n9jvzxp7j98caeshcs8k0n08e4e5rek93nc8qe6xd79qucbr5v1nylkv9k5qs7za4wbpehx11k65hocjszfa32kg4gtbk3xsqgl7wl97aoykqkg200plgvou7nutvkcll580nbve0nemvwi8nmqeqd1q1',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'zqk8hw92oklslihbdvj3jirwxyfbkjuw3z9tswpzbopt7wif9eurjgxlr03vdld9wmw8h7v7anl6nughbipe75v8x1xh4miv59s7ybzb301ecvomx7th23pp8v2a9yjlqxewpjraahn2cqpyynof6e0p2vu0lhcr',
                detail: 'Amet sed molestiae in. Eos dolorem et suscipit est velit voluptas et. Vero ipsam architecto commodi suscipit. Neque esse magni odit quibusdam ut modi error praesentium. Impedit consequuntur vero assumenda consequuntur facilis.',
                example: '09icnvj0722wq1uz87pbggyznt873nkwz71q7wn1i1zz7sfqi1hg9rufs3472qmagjwiekgvtmu091lc1jkc7hq2hq202yl0msdepel4iryptl6ko1jb353eg6gpjrbak8r705ur2nlwr5hnfov4gkjjgw1s3jk5',
                startTimeAt: '2020-10-22 13:09:51',
                direction: 'OUTBOUND',
                errorCategory: 'p2su6kpc2vjsbh10mimomkkha5say4qrla44inhy84hpqu9o9ueiz24bvul4uvxxm9twlmgg9w2t7y821bysxwqyg1k4y3luoqvuwvh06v34wtrie4owlebfvpotmxmbdzmish6lwqt17cqqy17qw85p2n8x8rm9',
                errorCode: 'agee6q9g03q2a7vj8b7uqqo1uimelic7ws7kw6cfdls4tpx649',
                errorLabel: 922249,
                node: 4198224427,
                protocol: 'z27nr3wqlfy60gn26ru4',
                qualityOfService: 'ki2nm9hxk5va6xhobsm5',
                receiverParty: 'xg8pqvgjguo6iguuyqk9d2hta4g0oi3o5z5uj9y54bkkt9h155p8ioq9lwcytw44scs1vk07rqo2jycg4xv0kkjwy3eavov9dtx4649mmrouxuai0zf1pu9zolgdembya43umgn2enj7i5y05c0bbzlbe8de838h',
                receiverComponent: '0wfbqivypagn21zlz0u4nnpre3dce6i5812u6v26uhzgm534lzon2h85a1zs5s3jt6b7ghhs4jybrgi98lef4ojjz2wsj9mg0ohxpo0idfmr9wjj6y4lo14q7g5c7xee2gydu9ujr8qli1izf0n0daxjuu40p9jh',
                receiverInterface: 'ok91qtr54bv9gcsl8ylsyfkedx5ogdo9bhdl2lubgfuqc5wudcp5cohqcn34r6c6ea8buuxzxbycv2gk0p8civzz4d87brqkosk9lkgppwdosilfdywv3f8eo3wr1utrfyij4y9ih2vz9uzlxv4tszh2klj5j1aw',
                receiverInterfaceNamespace: 'z9082jd6maxpc7v4pntdfqpyw67b6ppmbs1yjh67b26ffnrysadllqsx4x52b5dwzyoqcai06ox8htr7ir72ofg2fr70va1znwn5wtjkdtrcn2i7b9lznwq7vrbhua04ps63tk9kxxz1317wqhftkuxjshn0izer',
                retries: 8505855512,
                size: 7621067502,
                timesFailed: 6155104856,
                numberMax: 9135819922,
                numberDays: 9098054193,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'n7twv5v1iq18zaja9ntylla8hlkglsz0kixp3pvznltnqglzfd',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'k24ntn257i2ftn3c464r',
                scenario: '5koobnxlpok5eag7cl2ju4i8b21qz33431hsm9fx223c1bxbgil1apjwhyztq',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 08:29:58',
                executionMonitoringStartAt: '2020-10-23 08:53:51',
                executionMonitoringEndAt: '2020-10-22 22:45:16',
                flowHash: 'mgqx5aybcpbb5q2ktbrqeddiqh037ysrn4befdzg',
                flowParty: 'k8g1zf1qs27x9c7allch1fhkwbhbxsx4pib7u9mf6r7q6u5j04cn6rozqn2rd4thfboj0d2jgbqnzi6pvo3gjdnwplo6sdcdsixfzmy017kdaj47z1aadjbufrpww7w78z0cck4zgnqgcvwtkwxmpjwbfirwji3t',
                flowReceiverParty: '4p25dsilbsytf2eecpknfisydjxk7h45barattwua3z8dwnkqxeeh81cqw5n5fgdbg10d98q3orbf9s7pu8hmoy2fng3xlzen6ya2fwqb5qpr0io3n7t742c248ety837mfd38bg43jyw9ulyxwzswnv4afm9x8z',
                flowComponent: 'wqa5mjfr948b0khggpv19cnwdlw0ie8tj91yajjilvy3e66966tx304s5gk178b8svz4k20uqo2mfq0m3gq696ltazn94x2d3haz5il7nzzlb5o1qz52ac2txtxaq0ni1b64va9laft4va63qljmrmkemlh2kn4u',
                flowReceiverComponent: 'jh98zekx3mmn9ly4k0iwjdmtjlzr0o6ov99i5wjci47ly7p8tlk1oo5kbc214lw2exu2jdhladp2wgliy00ilm1rezewyull88nb65uknut0j3w18crk2vdd1r0oku0r680u3hbpwfeslgq0k906jx08h787i37g',
                flowInterfaceName: 'kmpmfs9t300d471xkzut8chhhsvhuubqhebq807i94a1h66rxidjmsnznh7nj2w26a9ug5xhbs6swl8gg8zyiz5fkxzlt2pluq415sxzr4p5p1xlan4leflhjj6atz80gtxk0oe08wye0rrn4njjs9cbaghrnege',
                flowInterfaceNamespace: 'ci8r3sdut3ebs88bi7543cdarvjgjzh0q322p1wdspy9ne29ij0w1m6ais1mxlhbx17c5qr2y8un6gsxbo969oamkth7kqgf10981lsahkm64zbnt48x1fie88ey8eeo33u800aatuh5ja90qo4ye8fmxcdwe9ec',
                status: 'SUCCESS',
                refMessageId: 'em9imh8am9vbbb08349bb24cev3gwwhtx9wayzg96uzhojx0215vbgfcjtfzn5hzhrgs9dufocl5zzkkcrx3olszmv91pmktj1hpkd4l54gpdopfjvja3woxyg8wezqpauipno5uwrzo7bleooypfo2szzwi77tz',
                detail: 'Saepe eum id eaque dignissimos eligendi optio reprehenderit. Ea aut eos ad sed consequatur ullam. Aut autem nulla est.',
                example: 'jgb7bxn23yc1jmi947lww56yp7foexcinyyne8vty5ve9nh8mcro3q7l7ypbyffzjduf4sw2lhnsipwr5ptd3dqo6akmqzxhzhcd9qwdx9uaxjs56ee9dj66h0l4208ixs6xmjzeex1sjbjjkdha6un1ncajojaw',
                startTimeAt: '2020-10-22 19:41:43',
                direction: 'INBOUND',
                errorCategory: 'eg6teqvp4mio1ofl83hggh4eez77z2ao64yk6exouj7zjwbe358w8qpfcl63mv3tn7nec56daxcqnzadbhwszclzfzr5uv2hxtm0nhqulp4fs13c227ou5cwhqusc2l4lc15zt1ieirm4eebskj953o1gj3e2m8v',
                errorCode: '54sbnoo0mg0sw6i0ynprua3b9mfe13ju04pncaqwynx23t5mz7',
                errorLabel: 688735,
                node: 3007840723,
                protocol: '81600qe87kax0vaxgs29',
                qualityOfService: '3ee436cgh8wuqq988e2p',
                receiverParty: '3jfssldtr9js1hnj6r9s2saf17vginkeipyefhazuwom3qigqkh8wa8czztw7st3g2cvteujpen7guzl40srd115ja19iox71jw0h0snnvkd4v9oc1q6d9stfg0ruiq5goapne01rm7mbflp67gn0f9gjm9xenyd',
                receiverComponent: '2z8xck23arjrui8ix7m380j06bfmvb5ju3pxa30cdzs21441a58bishlnri34xa83v1irw21dsbp7hgnm35dwjxjybsd8cuzl6x0zqsbvh5tj4shfmjzv0qqho64x39tqfs1n5b9s37ylu1vixcfgq86w5gyi6gp',
                receiverInterface: 'zzak28zpk8lnda7n2me8vvnye9uwzey0yqls38eq3awpljn2gkeybn72hxxdqyvrcggapr6gl19njk8iooy6i6ehj8ebo5otwlwvfqu68tss7mswmwiy19rnoec94bhzuikkdjc01fo23vpg6uapumi09h07hzwu',
                receiverInterfaceNamespace: 'awtblc24ynqrnv9cfp5pf0eghmnb52nuotc94pcareetscy8v38qydfhh15g4d0wvjtzvidpg2045qvyx20ylvogk00qxj8pn7nai4klfrwk79cgt25jdknm2rlecr5llo2owy6ls2zfrgt3hxnoc3nq2oncme9y',
                retries: 8524401253,
                size: 2361350666,
                timesFailed: 5834671528,
                numberMax: 8834336043,
                numberDays: 9869416834,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'r4oof1mmkh4knr04faspnjvboxx24nlidm7lwlafwo7ab6vi15',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'xei640e3tf43x6kmv6gi',
                scenario: 'du6ntm6hterikuwkfcwy2hp5as208wfttxfpd2skg1asrfw8nm41ugq119ma',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 10:41:44',
                executionMonitoringStartAt: '2020-10-23 10:27:39',
                executionMonitoringEndAt: '2020-10-22 18:44:14',
                flowHash: 'rhtqnem511gf7246x6vwh3wz1zj3folfinxh077r',
                flowParty: 'tpwbzq8matmn7u1pz9pgn9115ouxnkxhxf9g3wv1cg96sbtv58xbvu90p94iyd3fg6synrgeg9ivh8eq9alntsi4ernhwdzrgeqtc4zzb3bpi503a81qsguoqxbl5dkbwac5oy9a7wkhcj55de6wvgw5vvsr2rd6p',
                flowReceiverParty: '0ktjprt5jbor9ra7j4c85kjef4q1rk77tnr86wtn0bcyf7qlj1339s90v87398x9jvq54w9g8ynq66e3d5svwqh4ku746jf4ah344zw9ghhzfv6bme91sr2svi9kae8ig3bt4dl2pmujcrq2mgiwpa6qkwaksius',
                flowComponent: 'gk26mh81cy12m8csqcy8ubpxpslxzqu9hzfunsdbtu33vuuhsat5slyzwg2j4ejng0o89qv076hsrre0dtqormp3gans0bknmdfkxketllfb0hrz51h4a4xu5e78mpiutro8fm129eltk81xp32sej3aowpby3z3',
                flowReceiverComponent: '3408nchjgwerr5komu3i8140jrrl4mqbmd9s95rzm78c7jz9l5muwk3csfoeb2qcf71y2zjuzbcbz3pk6yxt6eefrruy7rz7c5qmxgsm9aj775el990kdlan0tu543bv60x8o3ugbc70nu5jgoembgd7a42rf7c2',
                flowInterfaceName: 'jjnrbtv9l4hfq93bi59zfppaecri2o2dab93x5r30ramnesmpogatewzipr9zxfb026va93v72f62ir63swo4pcrzutj0p69eencwjdohldrag0nc4y2v805njbf4eds4rh6zi4tm43gq5x5dla93909lbn4v6v1',
                flowInterfaceNamespace: 'u018chl3mbeeor77f72cxv6yfwghbxb8rsyzp921bqkeh490jxbytsidt7sqv4gc662g5cpirx3m0um541ka7ry8gmo10mk4j763024idtwvokr84e3krkt9p17ieicjc8g5je9iybphn6e9wjbdp0ih5t4fnu7u',
                status: 'DELIVERING',
                refMessageId: 'z8on3w8v36inbp5jsrzc9xrs4slkodqo05wzrqrg03vqj5jlekm0u0z06j8ev0sci00sulra1j7w5dh6vcsx8grkdposr87cbtoon5mflhvakpsufxaw3xrs1i5kk73gdcbvxcquyxum1uw9bxq1wuawox1wu5dg',
                detail: 'Consectetur velit quis quia id et dolorem soluta sit est. Consequatur earum cupiditate earum. Neque accusamus modi non minima optio.',
                example: 'rlw3g0v51qwojuvp5b42668prn1di8tmn1gmxfiidl4cgf0ij7tlgmpu1g5xo2t0b77tg2h84595hnagebs7c0jni4kfcaexef9skjfehz8kmgsoa9yaz9skxe2f8f2wtbl8lfkthunbsi5dzafczijxvkzha01s',
                startTimeAt: '2020-10-23 06:09:40',
                direction: 'INBOUND',
                errorCategory: 'u6fu8vqoyeoqm7owcnw1tm6fthcy9jwspcoixlcx664to66l1qd8tk1o39ypky85ksgi7qk2olynci6h2z0tik3a4nyadaoxe72aqg5ikw73bwxjxahirdqhobpku0aal07vkyrigz88c0xyk8ame3awrxikgf65',
                errorCode: 'sjflpcum24jsrc6xt3vgzbodmotz3iblnl048o3uft1707zjl5',
                errorLabel: 931431,
                node: 2441603519,
                protocol: 'mobre4kr7zs7tr8ebi0r',
                qualityOfService: 'pf217lw75y7jujpbgjc2',
                receiverParty: 'hrgrtlpvap74g86id1p21k9ayhz7vwi50hscoe5e4zw80bhrizsm85gwmf8jxdw0aajthqcs9et2r82k9rvzz53v7yi2s24twu3fmmw6ygsgspmv0qnp134n0jwjggvo5ebdka1bw01w8zlm6xprc0e98gb3wh76',
                receiverComponent: 'k5es148wjcnqvhfz9hb7975i34mfcq685viplq64bfff8b6ikiqpfmvsz24kqgx250ypxnr67r4z5s5dst4x84yxzmpvalm2bbgd2xmuxlo13m0eacomjq6sulvjcit7pnrbr3hje9rsbf9e7r4kd45zjfrg8wt2',
                receiverInterface: 'i6shremnedmyk43asuv1oy1lcudrnrve1btxtve9910pk5oh0p8ueuo21ihhi7pe34sp8v51heofse6brsg55abjqnn78dvhsp3g0b3deldd4z7a38ukso14ifjgwy5kf9gigkssn4r5d4mdx7u5nftrt1grqh03',
                receiverInterfaceNamespace: 'xmnh1lqqo0bl8p97cz063sxtr9upnfsqf6mm8iyl7bzhjrvr7fxn2a9byzlmmsj7qyv42eu6jqwso4d2dvcl2w61dipn1yn0t11eoe8lqe7gulslrcek669wcxyx71vs1qxevghpwf2zxt5a7fjk553zg35t73vm',
                retries: 6454094328,
                size: 1458817329,
                timesFailed: 9344401042,
                numberMax: 7676619445,
                numberDays: 2265622264,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '4wnobsn20pontmz8vsn60nmukr0jvgvaiv5j2qonhzlf5g9nir',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'bc1hupivo4hqijq1z53q',
                scenario: 'tko2fjae3x75evfprtgem9t7kd4n4foxmzxs5a5uhyk5g9lrok1wonggk7h5',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:45:17',
                executionMonitoringStartAt: '2020-10-23 04:36:39',
                executionMonitoringEndAt: '2020-10-22 17:26:28',
                flowHash: '5ponz8mvc0retqu0s8k5b40fbnou5go1rvt473g2',
                flowParty: 'icjhjqr2zrtxl60asq74iy08mes145i86h21gob3zl3ve8045ll2mrsp01pgi8xg9pocln1ru8ufffa9nxiwu9ttw0xr6kgwheqeodo1rd4qfvnkwficgiowoijf7pq9ejy5xohbgxpnqxc31zx5yueqokbfjejl',
                flowReceiverParty: 'r50r66zntfohjgh49rdqnhjzo2vh4h2rydr8fbkjlwe5nddusp3c9mn4h4500fpluv6yb997yrwlpxdnk7yc5lxemx728r4nhyij3bgjiioo8brl9i3pha9o57r2w68bg4uyvkp1tpob4ufmmak0cx5jqsvkevdif',
                flowComponent: 'tlh0u5qp3a7k4n8jbg6m0kkomh2y26t2oy1r43w4vjjxl96w34f5dey9dl5ovlixljyall92ong1hmioimto6h7fmkptz2ci2vralg0rrgpa71rpwhg752bq5rzhls3sca1kcep7c1suo051oz56qrbaxq35sr7q',
                flowReceiverComponent: 'y7d7kcgivanbpstfj65zxd91p2ientw10mvbsvpst4pjnlkumxcnfwpfr7xj8tncuxfpwnjr6zqtr1nb1uudgn48d7nth0hqhaajhc3x15rxl6ni8pd5b795z5frx8sac8dc0p4t5vrqmcnis84vzdg2772e0mwh',
                flowInterfaceName: 'um9bezfeu8tzu6g8mlzdap7bfa7p1ua1btiexrcsmtee1hspp9fkbhay5ysshqbtpg2xnfg4a74536nw2jn8g4dtxhsluycr6xlfpyqf91ufs5nw7go0zs69j79kmnin791ux3855lcdmznh3j5iucch2607i0i2',
                flowInterfaceNamespace: 'cwppa8940wal451pqpd66atdwr3eukmbc8artwis3jmhdz4c9sc6hcrvaj0axghnzubh4v0wqjchtwxljq32fkm72jnu0cx2tdp216z0a4gg62p3lov67tju3sdu0mm68rh7qdwwzo64icuc0dvwb4en2tbpqqh4',
                status: 'WAITING',
                refMessageId: '2o96is3gr7ujffjd0w8xqwjd7ecbql4zooctfgzobd49p4iyktuyelgpx8bjajifsz4j78n3mnxllcg19as9tx7bwsqppbfn7171kn3l0w6lo59eb7tnt7inhifvpst8gaxr3z13euvv3dvuwr5n4m1xba20dbs5',
                detail: 'Esse ut consequatur ut ipsum ut dolor nobis vitae. Autem quasi aperiam. Sed quo architecto totam veritatis tempora. Dolores voluptatibus non facere vel qui nihil. Ullam provident qui labore. Adipisci et omnis ullam dolores iure ex ipsum.',
                example: 'usvsu65lz3lilkh2jncgksedpa3r0asao78wloyqnhdfklentlej6qycl7q1pxvjrjkcwtfha1vslyht1jj19cueo9rrdnv822dfyiwfoqedesmcr0avceft9jnuw4a4of1cr9mg01tl36i51sg9sixy7ji78jqa',
                startTimeAt: '2020-10-22 23:20:27',
                direction: 'INBOUND',
                errorCategory: 'umpz0wo74yupasxyy3xv3sj02nbww1drzrfisjj6rp3ryn17tuwodymyi7htkmscj54mrx1f22b6bn1nqnfhjh5a42sp6kyb765goa691wfxmyd0f8ellr5at9fvl2i3h1qgr95mi9i7qvnogolekjsedn80t0q1',
                errorCode: 'jel3fssa6hg14ufrjjw58kf3pdofmruycza0cntghwgkp6saen',
                errorLabel: 162930,
                node: 7531822723,
                protocol: '7numydxwweso8w5y2opi',
                qualityOfService: 'r3c8kq35wruxo2ysrqc2',
                receiverParty: '8gk8hbhkgkdhj781lmyh7cp4n738e6rdz6r3r67wjlxwdi7jc6mry0odcnisywpyqijf8z6lnmsv9tquvo9r07b8bnc2y4d3gs27hnxzozkd91d7fviw9moi174plfwhqqxphmv5my5eol2bbigys0lb9ivoz3vr',
                receiverComponent: 'vc6av3nt9y55iibk09bhhero7ofdsb2hyi4lznkff3sdywauau89grt041xk5o7030f7gnipt9sbz2zlwgl54iy1max3ms419gw5fs6cu2kkwhrdhbo0jrv70zagqhawgstbrc2rua03uj6wnn5rrtbmszaodyl2',
                receiverInterface: 'ngzhlda8ccqr5ouah9fvaz9kd8gp841kd6m9fil530yo8klfeb506qvxuwurpp7txwegiexf3sibo8n33hefglhmwuhw1qhl7mb1j1dyle7lg5bmojooawm2tub6q7qlzvdb5ogadmu7jyqdyibhy87bs8bb6rc4',
                receiverInterfaceNamespace: 'jfz89vds7b0f5ng10xosf6s4gnx8arpnpy1t579j2t8an7zfab54rvtjmj3r6b7hu86wkbnrsb6g3rg00y96lzuiaudfcct26r0o8gpl2nrfqac5rrvk4xludd7dwtsa9x4dzwh96z0wrphtf2477g6wagj6trp9',
                retries: 9244308274,
                size: 1560923249,
                timesFailed: 3122344927,
                numberMax: 2449056021,
                numberDays: 1971543374,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '9cg56ferizlcw50mdk66huzoam19qlfgl08bqr65dwu8mjpaqo',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'mi1a2zhedpnnrqksv5rm',
                scenario: '1tvjgr0erv8ml5hma76o2gr3ku476r7luxmxzznvlagnw66y9h1f92keor5g',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 23:05:52',
                executionMonitoringStartAt: '2020-10-23 07:22:32',
                executionMonitoringEndAt: '2020-10-22 18:32:58',
                flowHash: '8ttqc7olhkff926pfeg73r5ceqvq2pnlumcd5quh',
                flowParty: 'g4fxm4wf0hct9wh4vnb37x5xq8he0rg5b6isn7pdcejvlwh67xnuezluv2g6cbxqmq9tlxisp91lc6zutyea5fswfd5f8ua7n5d93w6x3epo9az6pvwikke5i2js6zuktqxe8deka0o2q7juxwdkorghb319br62',
                flowReceiverParty: 'y0fb5mh81re68sl7byfatxb9ffvuqx6zjxc4k9z29339v9a1df7mze4kkgjqzvuajp96pd1mf0h6w8plsjqbj4i8qxjx8e27lr3clj5s3kz62ug2tgkvykxnw752ew9x33w5pj5qn3u3yuj9iiz6uo5i34vubv8n',
                flowComponent: 'tgi3xldlpowjamrv77sn5trl9xd0wdebvjqy8m6lxpy8b6bhtfticpejrsuxddo842h53qrl0camzhwhmtpkd17vhhkirc3af3fsjtk9hhfb5sc40v7ae6i4ngef6yls6ef08an0bzcbywgiqvycfml0321j4o95x',
                flowReceiverComponent: 'u8a2rvhf3fztjoks7mncx8ii0z5mdtl4d2uy1w5wff3cxk006mhgh8pxs0fmcf1ilfzqcrye601kjvrs1huw9bfbl3vaeroje2p0fv4t7dtjai3vtp9vuywu6lkv3gutb9m6urxmvjpgp07rptielt8rsphwx9j1',
                flowInterfaceName: 'yy3ewqbryfhsh7mwgocubgzk264wabu1ov6u3sdp1hdbs9gdt0tbeifs4no6s0rts52irbx15lcahkuni1xvy53ygklrajhqy7nvcbqu4vmti7jb4azpwe22xluhipmurp1a9kkh97wn76u2c4ivwsoit12thnxj',
                flowInterfaceNamespace: 'ja8dl5672h0mi08y59pca1cv0zczpk7gj7rlsjxyancyrwaavp77j60s95v0gkgny1hr2uhagl4alp1eytvoyza7qma5se6h7za4o3h04llxyqmtmgdo2qmqbt7xw5stz2fo5fi4vbmjjmmdjnnmtv72czy3x4l6',
                status: 'SUCCESS',
                refMessageId: 'ybroe0gdraabiy804x9uf3zbuojgjhzrgsxdrufx4de3b70563tpt5s0bbes82cok8rk7xedzpu77yod8uj3myp38k0g90d7v38d88943zvphelzwwqoxhdgi2dh9uu9e3cm0c83abn0vq3dd22ntki4vyxgiv00',
                detail: 'Qui debitis adipisci. Accusamus eveniet eos repudiandae esse maiores maxime porro. Eveniet sit velit veniam.',
                example: 'mk53h607ztna414enhjmlc5cx5baroem1x60o7t6g8ttsyscejf7o1fkqb1yvossxm61aicf5r82a9n5x47zrhxsd93xq9et9962bbhllhsftfkhzbo99ld88n43unprlqzx6w6wu0hco1loqxar3yc732nsamwn',
                startTimeAt: '2020-10-22 14:47:48',
                direction: 'INBOUND',
                errorCategory: '15bj8y4fhjacj3ds02lcms0lgbzyrxk5hdwtmo8wg12cynggqqnp6zalgn3gbdpp05r1eii1ekf1u1jmhm7aqoazsss1azg41kmeatoxi2ats37wt5drzqwowksihf8594agzfa2v78oc8oy3drn5k9290e9sznl',
                errorCode: 'cckq464epqr8hhmv9ie0lfd8lkgngchzn19ad3vyqi1ut5617x',
                errorLabel: 108380,
                node: 9112967362,
                protocol: '928rt2fjn1ky31da0qku',
                qualityOfService: 'idkm5fpiudxwodlfyujf',
                receiverParty: '9auq9uuv40bznz5lul4pb4n50adn07c4euwptyhtnc42yzf7a33ypfjiv8gzfiqdx89sy6l707157hgw2xnwmz4xm072d8vf92z40wspihwqy6mdx6qkgd7eo9yclqd74nmm5amhmes14r7xoeuhxk7ub8szi657',
                receiverComponent: 'aplb57t6xayqa0d5vn4tkbwocqcqrsu0ha2z1xz427zw1ml8lt3n671w04u4kaaglrodzwrk5ovu7zkqh10jribm3bcfph17iq2ed0siq6yhx90t50y2q6of0yj4k7xr1l00qvyjs8tl7cnp4g9hqu7wclt2onqs',
                receiverInterface: 'qbiyps10t7g4lahva1guwezy57oj9umo4xm60ibwq8h3zc0dmhwbrkvomf259ki7hlek9h5q9af371z9e4x8sp7h53tbj8e55co9d465rw16dnnxmtenz7z7xrpux5aqi091n6c9hqgc6bum6tt3h2mkma250ws1',
                receiverInterfaceNamespace: 'mxg1q2qd2qtg1jcql4hhm7syh62fe4zayr4b545ocax8jo1gwoygxjnndkmdu2shi37nk4kw0bf4tlc34cw9dojetlwax4z9tcix68xl52dh2fwd6bb25gissxofmlqkp7zmw0b5fol4gs6b32479v94te2y9v41',
                retries: 4546384038,
                size: 3550499453,
                timesFailed: 5198316241,
                numberMax: 8545773768,
                numberDays: 1688078554,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'z2fq67c36c11rjt7idje59yjumimmal2qm5oim66u8a02pdkme',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'd0g17n1dm2rq9812s5mq',
                scenario: 'bxcuojl3m8k5nttombpnmm9itb8mcfjdzytp9alt16fil61qm6x9ecej33xu',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 23:58:15',
                executionMonitoringStartAt: '2020-10-22 13:39:17',
                executionMonitoringEndAt: '2020-10-22 18:00:39',
                flowHash: 'ask1pwor99avhpn76ocl2k7duqv5j18ap0pqxrl5',
                flowParty: 'mdsttd0ceg3tjmm2f0zj5cbdelzi4wj2lgegabttcniwc61wh0glrxyjrlz6sb6o2hbfdhd5e21zeewbefyrmcl5sr0mily82rgll0wcdy2dhd2d0e0tugvesb1oa9g4xktgqvhbc4fvgct76qkqrax7xapzujpv',
                flowReceiverParty: '0wsef6jrggsnneoezuygnt0nofatporsnl038t299rae17p8do5o10pv8ktt5v030uwu9gmgdmom4ddl6autq74o2ds9s46abnoeboyltc8p6sn7gl9hvsygc2xv9vkucqjcoc7dwsppmdbf8pewg65wp4g83fpz',
                flowComponent: '1pxjzyxxi94nubwv3fjuqeiuh1itn1x6cn8brhy6r9ozv2iqs84sezz3o0arwfd8jfrd8ss6u1kffzpwpndi13z5sk3fxsgcaku1p4tjlwmd8zyqbetz22ivmgv4p8th81xt3w9rtffegarc37wn4pkg807l1x95',
                flowReceiverComponent: '704iisy3ps0299rp8i7sa0ty1wlpn8q086j1nyqgjpsj7vfzj8pvxuwbcji3oyrqmz8gm9og69lw8k0mqei5nkkbqnp4zurhdjtafhsupkzxxq3yd1b9gmcqeb2p5dlft4tf3do9gvuufq7w0j1jtyz3jrx0m882c',
                flowInterfaceName: 'vtb4rd11t5rdobjedexiv3t3kw1nu3409h69w9u9xg1xjd9qwwh58asb9gfu3i32fwfz4lutt2k6cgtf5at1d55rwc5cf2098jrzcv1yubq5z6tz9jzucr5gvaco185lo4z0ac092qfmq1hh2ol3khrjnf50i53m',
                flowInterfaceNamespace: 'woko0ivfztp1mzeu66zbp0zl6u6ncrsf6p2fmgtvbec0d2hb88t32h7izdm2wvhd3ffickl59j83d7zv7wy6difiwcavqei07tpvqpcdi0l92q5of8b3v92jb8kqtzglppzzwm3ha282k3x6nulyx066f2z6o7hv',
                status: 'HOLDING',
                refMessageId: '61tcr0cd1rftt42gjn7cnpw9n6cus4qpxywtmartxx1gmm7q9vk6b8bzooc2mx4e7aju80cnso7ycugc94dfjetzu7yewlrlhvtlp597b69hyzsv3puoei76v6yiqeowoo2vkn2lzzjr5xqd4glz3iwiqc43ivgp',
                detail: 'Maxime optio praesentium et molestiae ab est quis. Ratione et laborum qui ex. Enim qui qui dolores autem qui laudantium ea esse quas.',
                example: 'bhx2a1jskar6rlp3c7kp8zfdjdb6c4qium74ha3lga8jy0p73c73g5g9aw9xy8z4gh48tkkk9gu9bnx0gmwbhs5pj8x4e9xvcu96ynizbrbfdcyu2lub91j0howjwz1ygi6nf7u376lyx2wa970vxobj0x3zmkyu',
                startTimeAt: '2020-10-23 02:38:07',
                direction: 'OUTBOUND',
                errorCategory: 'b4xfgwaywtx5hwm9x2w6hdfnkoynyh6byct0x6poneylapxmmv8mizfsttown9hlmhqtxesd4nwmilac7elf5rs7mz1f5hanu2dl8zmgmmooyyq8vzp6gu4oyx13pejv5wuwkiy2505m7e3yw9ngmlakz2hcwawl',
                errorCode: 'gjvbgrv43rlmi8tvo5lu8ukjxwr2usxf6ca6wkfzarmvlyfwcp',
                errorLabel: 333870,
                node: 4077705175,
                protocol: '5kfufgfahq6hnjux38d0',
                qualityOfService: 'qyfycsj9tgfukowyx8vu',
                receiverParty: '4fidmf1u463t2wo9pmmrombsgtf5pt2fzuxjy436bcy5kt1pictgcny9xjjqqsl1mma80vc3hnn6ysds1vd4d2fhziw1tj84bm4biqwvgpldhvdiox7kujcm3wqyjczex2n4ylw0xva2kt6ilw5ij2dlj7m7ai8f',
                receiverComponent: '7z6yfiav93zs80r7qd2qrk1afu4lnawbthrextejx8i0vr7vf6rdhikycadq5zei1b0npomkq92npgkni461u6pjbtk8smxsg9iwjibx9by8zd5p82yi3bipupgktdg1zu1rg4h004ibyruj8xkfi6gl94yw3q3r',
                receiverInterface: '65y3dj4ps7oay0xbfuz69nkmkvv6d58n6fsyp95jccy0k90l8gpn9dm0jcpif8n876ga1g69tni7cvv0uenmhk3bpqezri25go5ld2zg3udoi722g5gni5yzoqenvmsxo6p5x4nuo0ircys545ujmj0oboijbcsj',
                receiverInterfaceNamespace: 'uer0cqh46p1q6v65qc3ocrxawxwkdxfgag1525ffsdegr0bet4jyxf9yfggemoc1r4fu2k9r2uqchxar4ykfvetdzev9gwvsu43bdvtorspyslml07ph1x9d9w8uhgodaeeckm53mxg228aty8d0tx2p35rkvcjh',
                retries: 5176433742,
                size: 1986483473,
                timesFailed: 8172496898,
                numberMax: 5134797551,
                numberDays: 6308934049,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'tbfsvt03ynynyhgvqpau15i7c3f4rgd3jymf99gkp41ydiyzms',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '9xfhikozt18vmf03wsxz',
                scenario: 'y2podmb1osrbo68b807ev4movx9v34wp7qp8mcsfc96unfhtu0bxvpgc9mqn',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 03:18:18',
                executionMonitoringStartAt: '2020-10-23 05:25:53',
                executionMonitoringEndAt: '2020-10-22 18:15:40',
                flowHash: 'ucn7s9u9gzsz1na89aywwx23uax9a8efr3tkbscl',
                flowParty: 'ijqqbrm3yokevbxsemee81mus4esjbh0p8umavq5uwd59id9smdsyfbbab6kmmbwbkkffyhx1dm25uqv0buiawbrbqusrgivnlnv376rbi0sgj32aobuq9f4ypi2k4udjjta5k5cw2xt5mk2gfn5193udnxhu2sp',
                flowReceiverParty: '5mn4wmkgggx4puenx7macm97jne5mtvtd7nzlj42zka805pdqov5cbf0fimbz5bf8k6jnuy5rqviibesy72xq3pyrr3y96mk5xcqxgdudcj8rur4rkdf0m54we0pzmcg705k0mikdv892lkwyq79oa53r06cctej',
                flowComponent: '9g6d4d4wqhqf7j68jxwl2bzx8rwn7hydb3ktfyycgld5lg8kt5ib67hflw8oliauyaaxn6bq401zx71u58vltqxi2p6lifmokilttki2nxltwkdx39lbofypvs3pcrzdhgj4hxw0if0kjbuyxw3mrnbu3lkkjkip',
                flowReceiverComponent: 'b78hkv7w0osr9ldl4975mmas00vrjeou1g7t6b3wfsv9ngkb6gypvw0qqszx01ng9isf7yz5l2l2zla82g66loswtdl26bw1mg75rnhr0lhwfoomxn3kikzufujp67lliyl59ccgxmrtflighkjdw7x6vc9i1qzs',
                flowInterfaceName: 'ncndvu1xxec8nlf25z7k0r6yl9q9bi87ttclsmewiqvv3gl4pli7976obpmhur5m6sw195rz8rjcrhz1u5dun83qcjzohlizr8npb2g810izy9i58ae6t75w38jl7flhwok22d3vb9hkvlsi4w6h35hu7o74wyf91',
                flowInterfaceNamespace: 'rld1f7tcgaf5cqtftiv7w0w7dkuofvi3z1fgt69nhom65u1pvw6luzrw0sesm5oaosazupp0qh4d2xiq30zmk8cllyb9os8cjz96vic8q7lgj3s54kkcrfm2oc7qhlcbdyskdwbmevxt4v5wgf1ybehoyufjnwag',
                status: 'ERROR',
                refMessageId: '2euoswwl1nxrgpzapr71t5iqil4h2ddph7mn0exg1d4ni79w82as97208ui2y28fapowe1bg6sqt7rnryeuh55mvyqjc8mtibzebk59245b3zljgnenkabg2lx7gqcaeqa72rnmn5a47dzu2m2jkzcojpgx781gz',
                detail: 'Est animi a aut. Et vel ut eius dolor. Rem et nesciunt fuga rem. Officia similique ullam sequi minus illo ut earum.',
                example: 'vkf0pu7ewoce09s22hfwlur7jqm4qdsl1zadp10u2vrrc0dmegxvr1112y80aaziun3nvsctn3f1zpks3bot2g410ng62jti1jf5z67u7ujkllucdlb6ovubzcr80u3vru6juioypixcmn1a4o754fx1u2h743xm',
                startTimeAt: '2020-10-22 17:21:02',
                direction: 'OUTBOUND',
                errorCategory: 'idnpko7z77h16bihosakotlstuwkes61ftl0fw55erx2q0pafmut103ioy2f9sb1pdi3n3krgglj1ulzro6w1uv1lg98y4yfniszig9n9wn21f3psj9t0yi96qzx3scebljgn4ea0c8ygjficqn8641p3km3hund',
                errorCode: 'rirbxeendt2ld75wwoc1ibunqunzh52rn8zvsbtxxzndg4eir4',
                errorLabel: 558068,
                node: 6485999670,
                protocol: 'bxlb7kzbmz17905tp2r0',
                qualityOfService: '7taoxm0g90oiuq01m56n',
                receiverParty: 'd0si1ykddf3rjizb7ad518aen501xoertac7smru2pzo1dgcu0htnemqgi5f2cnzq949ezrc7fjv83bql7512sjogimqgg4n4bz6089r591e49ba8fb1ttzqmuex3z53m8odkulegx60buwz7pm6u2bbc4nq0dz4',
                receiverComponent: '40x096wy3im3acfghyxnsq4wpyyk9adhx7207ff4ajw4t4zlqwr0q6x877macwt67cs3w247meudm60bb2uw54jil4wkqxi653pvl3m4efzbl5va4j0jwjxnv9gcd8qnov8pswvvhhfq8763niom6lq571glcb5r',
                receiverInterface: 'hp7jfkvxtao2rftcuf4v9kujdtlc7i8mfrp4gui2f1mkxgb39sxo1wyctnq8y5p1qxzveiau467k31eucjcnkkhwx4aslgn3553zcdnxi0dnh65rb2in9lgim96begu43fm40pu2kr6crfk16snp4mlqa8oaqw91',
                receiverInterfaceNamespace: '0rkflv6snqzef7jz6jgkszritl3wedkit0lgzinorwy20jwr0uvbuu7g7yfufd3if1khhsfqeo333pwjujntx4sfriakrjnzyb9fvmclhilxwzy3qafp4e945qaf8hsslgulbd6fo8xi5c71kaqgc0em223syp5s',
                retries: 9291531996,
                size: 9260882559,
                timesFailed: 1531155765,
                numberMax: 3564960728,
                numberDays: 6146787703,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'gb9cq8db9rbz8v9wsc41qf4vv98led8ciq9kg4ze4hee5oh613',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'l0d3lughqxkt6w7cgm6h',
                scenario: '0wng47h0bb6zklcip91uj37q8miajpb7u5tbsv7e999zki8pytv6ahazxyjv',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:42:35',
                executionMonitoringStartAt: '2020-10-22 18:54:22',
                executionMonitoringEndAt: '2020-10-23 01:56:11',
                flowHash: 'v9udj3cjzhxzrtc1awpbaepw6w2mz8v5146dwxcr',
                flowParty: 'b0yvwtst8opqncgn47v8hdu93ebyidc8lr6z8n04a0nkkeyxamphrw2y839vz8v68ttl5zm0jtawaqjkxrwpao955xzyd7u3hjolwc3x08n2t61meozx33o9gv15ovlzecs2648ew56ny0lylbm2t8c3mg6hgrza',
                flowReceiverParty: 'evwegrwh5qwffjru9fvgqehzbyqgrn853pp3q0m9xldfuzmzedrf13cgmesdt51gh5teymj1cehelyzjy4kiorfqbfkvzootpb1tm5vd636dmh96qe47qfmyok7vzkk3p3dz5ctivlwzx2z7pn6szno14di9jxrh',
                flowComponent: 'k637lc14h226lbw7xdi82inb4kws0r55wjofp3c6uzq0fc15zbqxv6u9qyhvbxasy9fj0diy2r0q9yktfmzcs2iilhb2t4ssr3b181vj572h1w1tvow0ohg70clp0hqlwzwy213trodf9jbufi3mczsbmav1y6ld',
                flowReceiverComponent: 't271oahcm27vyf1sfl42rjo5f1sdes2ai02rrcabbfki26l66vo5gt793bfcr740bq8qj4yei9mkug2grhofyiithl76c85piswgrxdr5e1ouxbow4pf9gesgcjjdnbrrtg1pv3fkowz41ac2n58baswgxg9mt7h',
                flowInterfaceName: 'thq89akt76a3psqpebssas6oxc1i30offurhk9z33mujti7ddw7axq4hnq5tfg19v8dn6504k2r6z8pgqe6hunwzqosuhzbtoqh8wxzrxeul605wun1qrpr9cmlz505sceid4z4kjvlfcjcoyipoz93mxc8g2eai',
                flowInterfaceNamespace: 'xr98snyi4kzp5rzydfpjsll4ih02xsughy111je774paipdc0nxucinksia1ad4ptrh52la8uc80tgpfxkmn03uv3gtjk66u0mfjih5az4wveyhwbbxavmbksl637iaxab2q6zigmtfz2g377gpfoibqnebn7cfqv',
                status: 'CANCELLED',
                refMessageId: 'g91thg4muger93v685c8sozv1pe3v8vd5kvlpl3705u7pl8zy38a0io375g4yc7fivuubxw13lbdhuh135bz94l4chn60031geseph5ychel7wyjyriy67yc5dbgbxclk2maiu9b5qssyopcefoqnmvuk0btlbyt',
                detail: 'Est corrupti eum est placeat. Quo autem quis odit ea magnam. Facilis non aut. Sed aut non. Qui mollitia sit. Laboriosam corporis qui magni.',
                example: '4xv6chb0uw1nu6trn8q9bfr6bksg9zn7msgd8k94h0ash4we2g4imnk9jh89yw970x266waoiitco8v28ew5yzelugb0bytbw7f30mdc2i5lkfpnwrw8iijuj12zdb7e551tq35d38nsvsiyhr1yrj4chwoocadt',
                startTimeAt: '2020-10-22 16:06:24',
                direction: 'OUTBOUND',
                errorCategory: 'kprhw9ig2yc07dx4mujehqz4z2qgsp2k70smzpx9z8tvbgqje3l4s5urb4yrtqaxcniug9dr8v1lxwpr7q5ct08gybu04qfnt8664a4qgecuy6hfe5t6v8129xha8vymgxq4yvouik77ucpi2jne0p3gxqrdk86o',
                errorCode: 'riyhyfzfp1tu1iky702fl8af976s9z8hz6ndbsxg8hx72gr328',
                errorLabel: 364894,
                node: 1706454364,
                protocol: '8bqdmv8m87dntc4mdc9k',
                qualityOfService: 'jqdvck5c5xwafw4b11w7',
                receiverParty: '8pjxj6ooki7lvzzi5i6si8anszahufjsosuj5ezm2qgukpzmig7b82mcbjhmuqjx9k0yby600yiwa0u8g6jwaviclg471jkkokmzwujiwdzjbj1gzyjm20gvjcwede4ajfm774e46xn131xslkhwlyh3l5tcomfx',
                receiverComponent: '8hx2vr69z7fpgvhrjxgw391cb37lfiwuly7hh12lfsxg7zsd8vrc1bw18325z9712rm89z77wahtr4ai5ic2jwe6bzyk1brn3a7t23kccazy46abd3ba0jecip5v8h8nrri922303jt8zssdn3oqcwrvc4gaj95d',
                receiverInterface: 'uvrc6sinlxea4288wfrcmi7plk5foytiwukazc9pwk8ndjzq2g9enkg2ho6zq7idmbma3ll40zv05bk3c6huobrx3ovtfdgc2qkhylmfpsbii1ovene8tfdyj7rqgh7oy9ia5145akkzp9ai5pwhoj7f9r04v81g',
                receiverInterfaceNamespace: '29owif71vz5lmadhqblhcbl7smxjvoe6607b7e6065zws7290llr96w4crclr1b1v96oqu77150sxo19osi797f2fiq2jgofuywnm9eqdvxws9m0s4x4ggjxqe14hp7kzslv7o3sf8rg2edyrrk7b6yn170en1hp',
                retries: 6807277536,
                size: 9524810477,
                timesFailed: 5970652421,
                numberMax: 1395674597,
                numberDays: 7531338005,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRefMessageId is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'epbkyqcmf953icnql9afjbvku919613c25mlg8kqd5m6gxmu1s',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'mz9hs9n31zsrodjmd51i',
                scenario: 'o8m2gb3agkxwyuj9k05zck1a0pr3yobk6arp8xr6njwajsyn5sg7q27owfm1',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:45:14',
                executionMonitoringStartAt: '2020-10-22 13:18:18',
                executionMonitoringEndAt: '2020-10-22 12:12:30',
                flowHash: '3qyvexfdkj9h66u58ry92gva4jxwx4z62flw9zeh',
                flowParty: 'yyvoharahooabbbdo8srznr084rjkwbnxg8nbdg6jp2lbcu6wyqo91tvma7jkxneoqrzhuwe44nyh9o4u79le5nz8izyeuvdzdid1j0ljoejfb80qwcm0runqd9yjrzk71xsxnn34jsws6t484xynvhsqnfxxzyk',
                flowReceiverParty: 'kbdkgm2kdg3q2ixk6no1xu89wkwm1vnkxk7xlfklhrdn1uqew25uu9i87xqmyubqy2jm4d17c8f0pf2s2sasd8c68wenqjy3942vavsvzamjsujxmwsbpjg2yhu4rcp4rwtbe8wxdjj3fa94bo97mqs1e2gvwz77',
                flowComponent: '117zkvwk3dunaa3q90xk4od2pp7c7bou5m5g8hg0vt5y3oblbu31b8iqaocj1bsxok5k1drv4lvmhahzsgz8gmvfybqcck7klzpnw0nk6vufa8e99rp9bytbyds04mdvolyx91nblbbtwrp640h019ovb19axt2u',
                flowReceiverComponent: 'enpfamp0xlt3kht2tqpyfnbkinj7oizkkaovhk44l7qndel1sgclfbcimteuoaohn4tbj7koisdn9gpktsrpq32kwryhcblo54u69p5v4iwgv346iufgdeuhmk2gkbz2z6f6547pkor80retrkr2zfkcuq5f3ujl',
                flowInterfaceName: 'ucmr4ek40d3u5ahgobg03pikh0hj87hh1wdzeuzppggw0nypdixjcpglr8diemzfpqtx6ae2ugu8gzrhw631gxpd4dzqhl70z7l5pf6h6vo4plqg6bi5y4xda513vjqm0duptd6hms8qsr3dbibb58jlh9unxkl9',
                flowInterfaceNamespace: 'd88iw21wo25mt3s0qdqb2kimvg8ulrxiktbxh52jdwwfijarxr05kl8hfy9k4h2cvhpwes0aw5u7ljkvw21k2c4k2k5nlex0kr0cnone486e1npwzizvx3wanxop0m7g8wyfoakbxsy0ha4l6bgmvo9iw33930av',
                status: 'TO_BE_DELIVERED',
                refMessageId: 't8u6qac7bfqy6vxpfuybf90wplugo71qgqt84ac83d2pfusm3vauxkxbpvzjs814s1o5mlaigb5tv64imyfmz6qoghhk49g49w5bo1znn9ag3thowzl0lsvuelf0c8a1qh96cpnhw5x18w14ojd50ycetz99uwqpm',
                detail: 'Totam rerum porro cupiditate aut. Ut voluptatem molestias. Impedit omnis architecto ab ullam suscipit.',
                example: 'm41j3n5e7v43xdzyddo4onik4njoqynt5uqv51zo6zzlc6g4hh16mrc7qevalvan0t3mdtg9d3f7sa2enozjmv2y2zizmmq44k0hbrvigev6eoy2xscp1fh4otbu9ii0e92ixf3dsu82abupayby5lz1df6p0ud4',
                startTimeAt: '2020-10-22 16:47:14',
                direction: 'OUTBOUND',
                errorCategory: '2kb0dbjkmte6dvjfpjc9twol1rtwxng9upqyq2e54lr3195u24huxnvcblaauv8c9nfxduimc7pdksml7accj9m1zmu2ae46i269tw73imr6cxwgtnppfcrs7asw0nul05ttd9p8ixvu3k2xb9tmbkq10wjlwmlq',
                errorCode: 'fqjpo58wnyrkxmcgtvazqlstwx5kjx5cct3u7sgu81x47h7rzj',
                errorLabel: 109058,
                node: 8081353519,
                protocol: 'fpd3h8qee3uwzt3xyvpn',
                qualityOfService: 'vh7sfcsnspzansipyjmv',
                receiverParty: '927wvfgqb8qt1m68w1nb7tx1o5lnpjsq5h699xbwzdqyli4mghs3mtbu0bjri4e7kwtdqy1eq6xmce0ip3yhd6g43zh90zwv3u5an3bzod6wd7ws8i32heyzu4sxzdlrb7we0w21tu5tdpgddsymzorul8edl7s3',
                receiverComponent: 'q6az7jancvc0ljbkdnijn3v1ke3v6qoy67zk0xr8cz7yx4x9i24qqa2olk2e9insrotrzssoamsjih9t63q3f1a1gxqovooaa5jtc7r4r12llzqbg7fgdocmg4z7ukw193oovt2nwqvnz4eb2g94glf6n0ianval',
                receiverInterface: 'ma1ztecsl6x37zdsjml13akw04ie5if8vynuujwadlcfyfcwdf4jksird174ud7bnq1d9iop45xarn2vibbtphwneqxqlzqt6a6ma4qzhmtsyvp5f5asl7mf187oqs86ndc2q971lbcloyyyy6arrtn26fc3epdc',
                receiverInterfaceNamespace: 'j8um67gms1qezgnmt7udanitzsj594sf33d7ourzssh9r0ouqrwwwvpk23ohbfr7jx2wq1kndfh8l4qhuq5h52gyzriob5u1sk0r9kdcue4td7dg2nqlvj1xkpp6708iljuwyzmkxsemxlacbdbsle6htt9ula26',
                retries: 2186776546,
                size: 5489537872,
                timesFailed: 6012883227,
                numberMax: 7694997881,
                numberDays: 6771203545,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRefMessageId is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'rq5iy83x0fb0k948p1ao3h71vtz33u883kdprvvqc67athy60o',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'piw1dvhywo1a1hox38jv',
                scenario: 'tubh550uznbku3b3e1fjpfnc4gnc99yqvph77fppdzeojcu3vi8uoyjbs6lo',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 16:27:35',
                executionMonitoringStartAt: '2020-10-23 08:26:28',
                executionMonitoringEndAt: '2020-10-23 09:29:45',
                flowHash: 'f2ruzysmx75lzlw2kpoy6xsxc51tgams0qwehr2k',
                flowParty: 'xs78bj8jn66ao05jst0oaz6yml9rm8vhnmp8lrpbpc26mk87xkolhvk0r9c9x3o82ulh8r9cg1hvf77yf6odc31obi5j0jouztxaypv6i32p45qrg95r5ms004buh195fclgffgv4spzm8g2pgqddbm1jflplbbw',
                flowReceiverParty: '2ntfdf6c1dtm08bwejv55c4yq6qcysne3azqntbvm2bcawjbx92ahwiad0fiwwwznm97u5j01l7lmmg0x868yuq50hu7r59x2125ak3m7ruradt6fj80r4kbg2xcree7i2smn3rigx7u1o4858ut8p3mf68t8jid',
                flowComponent: 'wmics4j25oedu36c6lt8df6ep7ld417ba33rfc2h5orrfkczwchhf6i4vwvx7c634m4di2ma4mvfca4hq43dlp79sl9u12554b31hkbsy8kid7tsk354ug6lk6wkgwjkaedinjdx1s8xblltaxv6m4qici11zhjn',
                flowReceiverComponent: 'ko1dhlq6341dk66dkh07w8mohuy1rsxy8xgoaqeyj2pbq6eqh7hy6gfjzkx7oor73t8rthwks48htga0f0q71hvxponertgqx3fwjqnomwn35dxfaf4zfo23ow000034u7h9plucojo38sej3bf97u2b426ha2xf',
                flowInterfaceName: '9kp80x610jd82n6n95szmcwt8r5o5tjknzpt7dk3g6qdswvhhqvbpxhhtfcq9132w9agin9dd3mrv58dyndmo989ecom9nfloj8ccw6q8cnukdh2ttuuhkx25vu50f5tnrsle9m91phwe51m82b08vh8blx0zx86',
                flowInterfaceNamespace: 'xuejymqmzaim9x691vxn4y1yr1yr6gwkfkoqnm8eg8yijr1mdu06iry7bd4nyihzgnqc2t14so30r4laxu7nd3tdbtzvdyx9yavf892s8evw2rtkmiuafi32lxn4biv1xe3n0fqwqqfoocwv95b884qdohblxxqa',
                status: 'DELIVERING',
                refMessageId: 'r7boln28tg6a7fx94o3xjvso8pvd8rzfymxqqaqg3ilejrzrythhrblgpbxwb411qztvxj05jytrkjrs684rypuvkjj9arw6zfe6qfpsfhrxbradnres7becax685ew2dy68uljqkctx5qgplwv2xw57gws69u00',
                detail: 'Vel ducimus quod minus. Fugit ipsam sapiente commodi. Necessitatibus et eius aut doloribus rerum non.',
                example: '4lt94x6hcr9m113ylssvh9pkohzdvin3byh3jtl2avgqst0eluud4tabh6b7q87l6l16uqo298fh4h2em9381k3r1s5d7roep7kn4rlwoi3g89pdooi6m4k53xfqrwnyihbnfk0dy2rgtls54h3ctmy0ppwgfk3cs',
                startTimeAt: '2020-10-23 02:04:46',
                direction: 'INBOUND',
                errorCategory: 'd63c2ocjynko0bsjdibftypfgqpw6f5qwlpyhvo8d6d0wcfci9ogbtiy875eklpppib3byojskvpju4beisf248te8rplntikf6uoce8myv0ty1fj0me9mqglqb4s822cj50c6k69k0zmc3qksk51qs1q36ay704',
                errorCode: '7vryektl2hdush0knco3kzwl5mobj17j77b47dk0aexywx6rri',
                errorLabel: 579911,
                node: 4194383565,
                protocol: 'dr79f1il7d4cdojbpxoi',
                qualityOfService: 'wm2r1kmwfic43qtn0g45',
                receiverParty: 'h9fik1id0pptobko2a644owi25hyef08d3ycloxzv7chs73szsnjyx5zzdam4pz0mf1ei5dlria2rqgbym3wgo9gaiay3mogfuxivfhuwwuq8fohibbu2i0otjwrcac30k7s8l3n1r3lat6z6jokmh6zv1fhhfsa',
                receiverComponent: 'ujjlwmmpfko6hlzxpycg93qfpw0o55g2viabtli2jy5tym48xnbud04vitx63cw99be34ymfi4pv551zfgulecz11pfzqzmr1n29qxlxrq1gnmb5zu14vd4dm9fbpgqzuwkpg43tucccq6y2hf1b3vjsgmwau538',
                receiverInterface: 'fjw6w49om5yrkx9tfp3jv6ygdszdelzb8b5vjuzmixz24l7eqhsef34br1fxverlriuwvtc5ftl0s3rt80zu2bp0tvgd2cb0zn61jirlckygupf33b0vu6jw9iy2ux2d1nf623144xjodvp5gaye5pn0voixajpm',
                receiverInterfaceNamespace: 'zxavp34zgrc7a5zkh9ovutvhm7cg7fb8i4ccc9j64zv1vl4c3zikm20h4pkmo6fualq2nelz49hdppxqhs7pyajjr1ka7hz74un6246yrskl56z0as65aahav75k27hqdem0rsc4wg317izj5bgpisspjf495wbk',
                retries: 6913665211,
                size: 4522293603,
                timesFailed: 1494073369,
                numberMax: 7349165180,
                numberDays: 7015595151,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'a2m6uf6iwcb7e405kv80z8n4d2iv8ayit0mmqgxwas5lkdh5sd',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'wu7681obv5vnn6ali54n',
                scenario: 'pnxlxnmxdpey7945b60fmf0plnklyo017ca6mw9cm5cdc0lh3xtcw472x4qa',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:33:45',
                executionMonitoringStartAt: '2020-10-22 21:04:58',
                executionMonitoringEndAt: '2020-10-22 17:15:35',
                flowHash: 'bttyra70tulrix8aqobzf2rqby09939g541g36sm',
                flowParty: 'cbv4ahg35afvzy0s8v9kwxrn79uxyr6334r8vyw71zo84kw04ddhpiuru56l5z0dpv2ydjtktkf05s61qqv0bu011c0d8j53839kyvpp68chnsbdyb3s8oafqigrweav6n49be9vhpvrqgdp1lws6ljs6awyq0ss',
                flowReceiverParty: 'r9jr3dlsps6t5ip1h3lckljfzu0iuyihdspdc28z3e47hs1bobcc9x3rb6hb9kp8kq8fc0enx5ns3wzwhfk7h7aipv9xjuu7zr2raheriesj14cfy061dgrc2lcw1q2pmar5ffhtu48y88a4tnsr9kwpv3nh8w98',
                flowComponent: 'zb6q1xcghh1kk1nqhbxezzfm6xl7pkzfdmd8d9gog2of6n2g2ga2z1smiyn39pahsapwx9xufke265gdumgqvy8il7o061xxeizknv9z5c2ax1ksfmllmxnwjdrsf160rq0ketvdsf93xmh47hn2xfo444s27v5r',
                flowReceiverComponent: 'aputy3pt29bron7jvbq0b56gk5jar2ts0xp4o1qzy2heju3r2jcwap34r6kwnvdsev95fq8sezgfm482ca6sjl21ll61x8x3e4ocrntcbav06ljtad97j0q5gu4ycozuf3a0w9v9odb9bh6qfbm3o26tt7ryghbp',
                flowInterfaceName: 's5y5jj3x1p4rbc1jbgfdw9tkzh3qujvgtusm9dly4xz78au2slq3z4zzkmogaadvzmkyopehyvroihksk3ppw4g0n7568nitbohrk86ee9kafaus1oyvrrbt8eszj9md8m7ybeusvlv2k3ptz8wr7ges3m8pkwqp',
                flowInterfaceNamespace: 'pyaji5j617m8bkdzjhuq8oxqyrv5888erzn8uvovoxtnzpicnp9x4nhi8m85s8vvkeuexgtxjewueiq46sswxdaly5a94piyha1iptp0qoz628ufqvcmyky8avzbjto407n19uotkdniv9qphr8xhbbz4scwx6xn',
                status: 'DELIVERING',
                refMessageId: 'x7ov3w46366ypi6uak1l51fkk48lp17b613g1ekfr82xeu9hqgkubl4gphu1hls0qpbzdf67qjjmpa2dvndre9mlquwr8sde9y16aqcf5din1xqqn13i38bkqh0730f4y7heuwt5jkjowkfurwpf3b8b22d8tuy6',
                detail: 'Quia mollitia praesentium sit distinctio. Minima deserunt maxime eius nostrum eligendi quia ducimus enim qui. Ipsum mollitia reprehenderit odio ipsa fuga sit similique itaque quam. Aut blanditiis sequi hic vel ut sapiente nemo dolorem voluptatem. Quia minus aperiam eos perspiciatis voluptas commodi cumque suscipit. Ipsum magnam vero ut similique voluptates et.',
                example: '0cdou5n9rjhrh38ziynzab4cdjmsoef5dmkvo3mh678vh3p1retda353rpmvraf09qxmtwhqoq67mohq4h4pv6nx7c0975mzd4m5hdgiasyr1phor77pbqytwnnltbcsrm76e2dngsk7fd2qz71fo7gki0dgq6lq',
                startTimeAt: '2020-10-22 12:01:39',
                direction: 'OUTBOUND',
                errorCategory: 'b19ox3xaxf5mue1cx0nonuhnf350g19hap80avotdctbr8nne85xcl7ti19v34ogpbgb53ws4bquyykchqlj8yol3s6l4yes32vcwi4qelqy84nu36bcw36j73k7sgxhnvytvrd9hhm7mxhmqs93by0s0vcyuy89x',
                errorCode: 'ybln7cwpu9uycc0n3khjsp3t13wi9jiqhf3j1c4ovx7cy8of0o',
                errorLabel: 904599,
                node: 7990348844,
                protocol: 'ruutkvlbt5syqfpnwymy',
                qualityOfService: '18kxnk7dme9j3tsccc5w',
                receiverParty: 'j6bknlunvjlh6voovee31vgshsg19xgm5ar0b7oapt6kbbeb238f7x6qtcc9xo0wlhd59hctfcr1pxam7dldcngh62dizqliodg59lm89ntkgxxqf4uajzxzc2apcsxz234c5yjc32ngbojib8ylc15wxvxjs1gv',
                receiverComponent: 'dq7k0iezoj3t7hwvlq2j05hjf03tkszxjedmx9xt420wztr4h37c0dfnmyuyib5nb1leyyi6jqfbon74zxam304rw15xp3q8xgzqi8dx0166wzuvvw8wdpuayhiw45pqci1tfu2hpokrno5bgv8wujavd99y2qyc',
                receiverInterface: '89hcnvprs0zsv7ta60tf9u5etgx606q9pvi2hya5neth68lpv8ffdz59rkdkr4tcj7lxrplspoqflhehjh4h3pbqc0zkj4bzbwee9addhi1p0jus3yzeaef83qf1kjsygnmdyykziullfrpyu1dx0vz2a9kzunni',
                receiverInterfaceNamespace: 'g1kkxim51uxcfg53uzeqgvu5mdwsenijstktw3qdpkuqdu53prytlyhnjoy4blyw679pd352bg8zcuvmzvomivq860n7afhlkia9vq5e85no2oboz23ydph7leqv0w42x8gbbl1tvc9g8zw6fjvtr1lhly6az99x',
                retries: 1594801519,
                size: 1995501651,
                timesFailed: 2537524982,
                numberMax: 9548658003,
                numberDays: 7559994870,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'zibnefbp7pssv5974ip3mn1dclppcj9xg028vk7nakat8tc5vc',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'v7hyu295rtl4jj88mmx0',
                scenario: 'pcydf5qxoyv2190bp1v5roai8a0u6bjplrs9bv88fbkna2uuhfknekw8bk5i',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 00:30:00',
                executionMonitoringStartAt: '2020-10-23 02:40:08',
                executionMonitoringEndAt: '2020-10-23 08:47:51',
                flowHash: 'c2m5zhgtna6qsxyyew0g52n9gcs1hxoqxy78eyz9',
                flowParty: 'xmxeckj0c42v3ay4h1axm5waumjp848029lbta0e68mmxww5sfaa08khscio70hszs9yz3a0mtlxn9um3dfr8xjtzzxl8rdjcupj8hfw2eec2arhm0rdojopyunbearejxnjmw3c1m7s7fwqpryzlybbyvd2ije4',
                flowReceiverParty: '7rcah7anq346mjwom42671i8dms7p5vsax29fubacz9s6xckqggd4vwoly1poec3fbfarmh6riswtzvkgs0znel1zi23rv6pkew5h9z3n5ysjht7joi1zqvdd3ob0i2gk8fiokgewnp4z45hjjd7zoxjrdzmo2z5',
                flowComponent: 'eogp8ydaydef56ed7m1oh4sqjif70sht41yebxyt2970kl2mf10ogwahhi4c1id4lncs23lqdv306h4o1zreohb58nba7tuf3cmh2rc164aipcdywoa109617kp5idybrqs1iiftaz33w4m1187vyi4srvczdgqy',
                flowReceiverComponent: '4xu6ndijybocp1q29otcuvab33u1c8hfyxucp1a80l2y3xbuli2uogvqlgg20k4g7vvfyoorhysrstzcdr5sxmon46coo4vfi338gjptgse5j7xsd8u8ub88t49mw6u6q7f22w6l2vopcjzes16jvr7rnbh01twd',
                flowInterfaceName: 'x6kz3b17mtxezewax7mcgq85z34m8elqiw9ajk48f66aw293qam0778qb2f4dztvp5afpfb0l0boe2bccsfyxarhsdac0m0btq53ew491hoaytxcjuu3hb3tuacd81vw6knt8h5pg7cqv9barx3613bil2r78xbw',
                flowInterfaceNamespace: 'nzs6c3ni04mk1oabhk2y8vdcqsnduidkp0044g117hjw5jjw39ty1tzibmf6ot8chzs0zq3zxc80tdc5d6qrtymv9zphts2dudmalzap9weibek9z48zxow15pnf8y0bpewg3t9ypiyf3tuj681nol01lxp3bts1',
                status: 'WAITING',
                refMessageId: 'f98kkxymnf663co8bbse2gx7aur3x5otppyu9kjq59hfgrukamxuw1q5px97c5a3v0b9jbbtfmda6sas5zzm1q3b26kydp5gnyxrko2ydzine9f0dyuasszag1jegbds4fu2h7n09pqrjdha37u63qm72k2otky8',
                detail: 'Dolore excepturi perferendis dolores. Beatae beatae consequatur iste magnam eos. Esse tempora aut quia quam consequuntur corrupti vel cumque rem. Consequatur magni praesentium cumque odit. Dignissimos unde rerum ipsa.',
                example: 'qsbelh7age8d1b3fzgs1qyzkfq6e639q93qnpcs8wh2sncy7matt5dwklqqs5yy6w3uxpidk8llnrcm6l0pu691l5edj671enj1vjsr4emph2roz9omvctxgucavsrs914y2muxiswk7ro6j9b90mvp9nv9k228t',
                startTimeAt: '2020-10-22 22:15:51',
                direction: 'INBOUND',
                errorCategory: 'xq6ktr0rjb2egmemnrlwe580mb7tytzbepwzk85upkfc928js7k27x8fb6g8hgxwr4e4ntpmbr2roxpbxaj03d5qn62bix6y314hmjnk62p444z3l63ecsf79ev5ret0f9hiar23jiinmnvu6jhd4qfilk3zmbzk',
                errorCode: 'h29pb60twhsnjjy9sqiry78qbtdh5wea8o1d78x125mrr6zpwux',
                errorLabel: 569872,
                node: 7804370772,
                protocol: 's2vllqwp0vsx5e2i39ic',
                qualityOfService: '4rrhbccph0121c75w1qw',
                receiverParty: 'cti8zlzbm3271gunbc3f659jefgo9scwrr527o8s1jfyox2wskz9x3gt19pwr0l9c9mtfm755ye4lyxilvm69063aisa0f8i3kjnphlf177dy0h3pnyx82ds5jlkl2di5223wacn5e58opqpic3u9tys7686zbh7',
                receiverComponent: 'v1nzn9xhtohhlhko30lvwj1q3doxzrsopk7wkwdudh7kz9v7xn8og9jo7syh5phnvgz1d8u3ept0awshrjwwewajn7eslw07ldbltj4jgj5ffm2zhorreccms9121qvbukqdy1zrwl4rkv819i9sv3xcja4ik5gx',
                receiverInterface: 'p3aq6s41fr3f89brfxwqjm9z9q9brd5xc3td5ng6x7y4t9fgt0cdblv7kf729fw0h1440ioc70gn8u741aryowji0gtccqu4w4aeulcjvespj4jhkrwjlu1kkunkajicr0eeza8okloa4vrrfpvrly3eb8vlvk3v',
                receiverInterfaceNamespace: 'nf0tjr884c2vqs0c5oi37d70fr6i0lzihqbr2qrmaw220g50tuqk9x8fv7wi08s6o9821gcjxmn7tzbug81xv3ethu5a7g34buhj2r5faxl9lvilkr2hpjgryegisq051jrzx1cc5eedpzdti5weav699np23ndv',
                retries: 2807999276,
                size: 4485584869,
                timesFailed: 1471046719,
                numberMax: 5244414545,
                numberDays: 5185325395,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'mmiyx6ecd20lf217zb5vp64g9n1yrohb4lr23ot870sbhxz06g',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'ol27yhatx6gh6y7tw2y5',
                scenario: 'l670lzi5zoloqbwgvpot5duu4qdlvpihd1s28fokhfsua2ajzhablbvmrbmt',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 18:06:16',
                executionMonitoringStartAt: '2020-10-22 18:17:17',
                executionMonitoringEndAt: '2020-10-22 16:44:38',
                flowHash: '5pq8qsjqy1bmd3omkmdt434yhqex3r3kaoakr5m5',
                flowParty: '41v25ik1jmn9gt8xcph15u10yads4r183nt0dpnxvcfgcwlhpkdw953sk0487kv78zilxg3529u6ockkh9z8z1n65qqnk65jb5wyu6rbhm0pps9v41giv05i3cyugy9ws5uk1tik0ystxeu3yocfaamkan99zlm4',
                flowReceiverParty: 'du40zphivshkwn06nf58nw2zebym0rd6qr74uxyt7enw2893q9h16qdhgo49uaghay27d97hh1amdlzgb3veqy4fsy5f58idyyjphl4f4v8cvakyx237s4372ym8cj8aloxeiu3xs9zi0q9olrs9367bmlg2l8u9',
                flowComponent: 'maaf0tlrjsmjqlvop0r4m44d4gt4nxf76stcwoej52edj096k20x4bpcakjknsou0l8ziqw50axoc74ke097iqang27z47skgwtca6mqx8dqjlq0g8xkp4xilc1qym6d10nvtvxcmmn6rv60fmgwt2rjr5ml0clh',
                flowReceiverComponent: 'oln86i6w9of9yv1f63oso7thcgaur6ics8ie3hfz6qh59e40rokhw4j1k9murnif0owevnqrl3ga02hb7c08wfct0ebqf70v1m61005szwgc3xbum4wurzf4t56ecfpbzsk3npwpp4mrdkivinjo714y9z8lxj89',
                flowInterfaceName: 'ojsblakcqn0uecabkttumd8o425uaki73trmuumf2gkald3zws9bzevlvbw74ca7matcdthfxkq98zdkcfnai58rtqn3ht5gtkxapkatqkoc1ivq2ecjlotkf6dy9pseg9tvje740jfqqkhiinilbcrpml1lqc6l',
                flowInterfaceNamespace: '2minzeqpjga0yme5jmue34lsflvc8k6y8wxlkthon8u5lb3ogl1f34j5o4liodq6jc990ipnwj0qsgopzdmggab97snqnsjy4n3nvwccwix9t11g5blaq2s0ha6wllkvsuyh2g336v10p2rhz6flxuo1ljdrfzkl',
                status: 'ERROR',
                refMessageId: '27ui3b11b2njja4h5wfkhgkj28m85h2ppwl418294f824sampv5ksoaqs4y18s6tnakm2loi10r5fz7khkldlk64ra75f86l5b2zd67m1bui24nr70352gd2wffvex1onpl5u86v3hbw5q01zy2j379m3p79iiu7',
                detail: 'Tempora veniam a modi cumque. Ex tempora et harum laborum fuga. Et qui quis aut non pariatur voluptas sed. Aut officiis in dolores ut eligendi. Placeat sit consequatur voluptate expedita. Nihil illum quo qui quis exercitationem mollitia.',
                example: 'w0e2659zt3y0bpcjdcj2knr99z6qbhlk70h0aiv7d8xftm7vc8z2pp55dfsb5g46vfpyj4fkp7i5xfbq3wjkxyjpj9t8kudea0anv8i6hq5gh7yixj8wfnhbjyos3mu0blhka0wsdw7ufeqlnvv6sf198fa11cxt',
                startTimeAt: '2020-10-22 14:08:05',
                direction: 'OUTBOUND',
                errorCategory: 'p2yvtr56bpbqauyujph7o6yo0eulj7gsiu68jnh8vfgzjjypsbgmpl25kuknv1kgtqxq6ksf0p47ke10nbwq3xru5whfpft21bez9h2upij2l203kcy1xnndwdsy584lke8xijnpzlospqg6apygvm8ry60e9ccp',
                errorCode: '1wgmxktz834fmwcnxrsd0a7i5qebzdcje4hum69f6zsmxiyvca',
                errorLabel: 3225308,
                node: 2015571066,
                protocol: 'ty43m2xocwyr3f11xctj',
                qualityOfService: '308fg5ziw7jfs03xpzn3',
                receiverParty: 'qzla8ox8lxn6ep38ii8o0pvq8dipy5toacjvh0dkz0yxsyqtmqpgys7z08tc86e7ff3etsku9fukgg9dmoxhxy7b019wa15s43llgnepoemz5lmtpc5he1kkpdw1p5c7ap2c9rpppy9qhstol86wxrvw0x6ullt1',
                receiverComponent: 'opygs1jrb10vzj83rixyx9kegwvm8uwr11o0v4gr6hk60pj1xrc41fvh21uf3o49rh8eyowgcr80jxqfo2luxdvql6u02jonplj6yja5qo0mapsyw1iil2kl3suheojduspy08j70hcn7ebwo50o8tvy5d7v5xmf',
                receiverInterface: 'da40vwfu4zmexomjh4ae1ddccchjqbqp3lkqlr1r5c2eu9i1vx982ubk9ftathly6nur2mbpo82zbkiqvj2jc02y4maow0td8ztiyom7na8ilxj7vcw16pxu9w2fnqxsy2aszj0leka0ftk1n68p27pmslbjl6io',
                receiverInterfaceNamespace: 'ztuq1tiwkqdwm9g15h1xd9pxr90q41phwypwjyz17l3x5755ew6vftz980dhbwebuwdmuljlez7iy9yi459hqixv2k7im5i4toifsdxazco9b15g9xbv1b22vq9ow4e5ddug3vkdvo9djn0o2rubg4eyeo2hi71v',
                retries: 2396396654,
                size: 7047541895,
                timesFailed: 7584802951,
                numberMax: 2751797003,
                numberDays: 5732054045,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'yshu0cysktkqpq68bds39kr99fhl48w565nhrwum39vlkrfp9w',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'clvakkuedr3533q8ybkw',
                scenario: 'yii88qvb45enoql4i4djt95dyk8ipcj6j96wyz42y0v0nbinwe9pkvbdf86i',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 03:26:32',
                executionMonitoringStartAt: '2020-10-23 06:14:08',
                executionMonitoringEndAt: '2020-10-23 06:40:07',
                flowHash: '83fs1gz5lsi9ehxk6x10m8yddafcl967xqwnwle4',
                flowParty: '13ep8hykaj4h7iimzz6fi30g5olt9b0foakiy8hvdgi0f5bdu9gmyfho9rneagdq7otfdlu55uwl192sez0qy3tvrn6xjseq9luxn6bjkkgss5shvud14yr9y1jjaeendqu8x7rk7q9lu53t54bbcrnlz7u7fig3',
                flowReceiverParty: 'igbqpdguon14kglo259r9u9eyb040bgadb662kebjhc4o6sigc75vw37rkspfmua3cqlbj4gr208ez9zmwi80qwyg7c5kjeioz9jci5kdd1gsfygrpfhnv8cogfd7myk3tm1uwnfuggcss1c0w0l96wpac3qhyto',
                flowComponent: 'm5m6d1f1r6ch96etfis8mfp7q5xp48klnojtnh355gzvy4yk9x2i71o9tt9a0v5xlnenvbd3ys8ule0on946j3dxv7ttmbzqsapizroouzudshdj04q7zjmxqe8pjenuu9z13jjxmmh6li5awgwze0a92tm7li33',
                flowReceiverComponent: 'ce3kikz4tpz3594vstcfdwyasc9cebw8t3emf4uggykimtl20tikge6sj77k0pud2ukr7xay36fzrbc86dw49kh24i95vnq7p3d5f0g8hydcfzcdu3ub2okpwq24emlnkhulfcb70nb4ci1z8mvovh0qlyk7hs1j',
                flowInterfaceName: 'zrg18y4u9e47gb1b6726plwsphjwyovjqe7f03tkogz0dwhjr6kpdtppedv31xn5qqxy0r62ch25zs8vmhc3j4mapk4t8p845ngdjv28n4btcvnj89e8n6p3om3zgok6dipzqd0iqxe975nan9g4b8b8sukgpk1f',
                flowInterfaceNamespace: 'r24saip1cyg29fdzg4itkhjeig13p7axinmvwcoi85tfp7xyyqzn3x3kvhk5fji0kc3go0cpz1bt84fj7jsdxk7csnst0wfekcb9h3leyyyd9a1u1dxj1xrwds449x6lzuk07o2h28byse13f6cbnk3uckvg3qpb',
                status: 'WAITING',
                refMessageId: 'yez469x6idn9y9ilimgqti4mfeh5ocx6lpml3uivorjltdvqfrkb12ae401bdf3w8nd4z9z651uch0tncy7p1bjuqfymoo6yy7yh7o7ntr778y6g4m27wvtjhjf5tyl9v5h84m9gug10x1rl9o3rik60izq8ydhk',
                detail: 'Modi aspernatur nihil omnis excepturi at alias libero eveniet qui. Quibusdam nemo soluta ea. Animi doloremque hic. Aut facere vero reprehenderit velit. Quibusdam temporibus dolor et iste.',
                example: 'zxvdkywu03vr0clpfh7gwxduurlxw0zbxeui5t0excina1y0yawjuji6o1kuqzbj39d30ot82xpvrkjg61t5hyo084349b0bj4dirkz30idl6sylh57t79ltcjokwa6uovxfl9bnt1f11egbwuxokjzg8nrzors2',
                startTimeAt: '2020-10-23 02:26:18',
                direction: 'OUTBOUND',
                errorCategory: 'q7b6sib6fd9eywfylliaip5ww0ym2tgjnrvz6q8j3ys5kmly6iamib22dhqt696zwdopomxzxohv0y4r28smk9mzyn5sk91zd2xayerrmnezl51cs979dqh8krrx666bi2wm4gcguhh1by7uoodnthssaewp61f2',
                errorCode: 'qfd3rujo72ba23k4qq6lij76ck3kue2jubzfz44o23x308fesw',
                errorLabel: 187772,
                node: 69207993182,
                protocol: 'xjzv5oi1z8udw4zs1t7d',
                qualityOfService: 'pc1imlzrsx3m6noi1iok',
                receiverParty: 'n9b5fced2udmuaj75y0bmdtp9uch0eiek6rj7r0ow3odf3c49w402vtuamxfkqawan116kopsgv8ib0cg6qnrzyrbn3s81hlge7ytkcp1efu8kq4ac3ykih485il8ouem2tom02yhnkxyjmpjvdw3fdu4uao1nfy',
                receiverComponent: 'ogkyiprnmhbjo8wgvlqy4et3ki2lezve4hod8zbz7gagy34lm7yd95xi2v1dwe9x9rykwc25ygzlet82nd6v2ui0u825adkyzs54l0jhg4s9f7md5nbayf58ksti4uy4bxm1ffs5w3dngkwq4eqxdc1dbe8qeatf',
                receiverInterface: 'wks7q0sp4t09jvb22isly9f71zhzbvon2kuuc58r2tlc376s9w5ch24aejy74ldr5hgh8sbwhmo2s5rjprf3fv3mkak7ro4n46x0a5y31hhgwdcxgnnuq43pfrzz48gj9lr7kjs0999agjy4888o5aj88wjje9f9',
                receiverInterfaceNamespace: 'b9o5xn6dodj338sblel72xz9522cdpdktilcuz4yvy7yk3c54ytlxn54yaarplk9yoh0o37840wwiu3bb0e4yjbaegw1lovah3t8he6l4y23krzy4uab37o7bbnl2jq0z1chh776oiw7jhc4a0amhslbq4x6jy8t',
                retries: 6917237504,
                size: 4932182184,
                timesFailed: 5557122762,
                numberMax: 3935723623,
                numberDays: 5415418883,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'er1xo60s3sf72wpk52dzr0qazxj7wmeozbf5rmou7n0pp2wd6t',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '6pdk0ek1mnstcjkz4v12',
                scenario: 'dxjokwyoc9kjxoltqe0vxyf37t8n8awfv0ooh3mfy2gjmd6jwt2sz9d84v54',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 00:53:10',
                executionMonitoringStartAt: '2020-10-22 11:36:09',
                executionMonitoringEndAt: '2020-10-22 12:00:51',
                flowHash: '3ictxxchap3uj9a6l86m9i5nz8yb1zoxtynvz4fh',
                flowParty: '6fthehonpo12a38lxly87y1gmftl8173mpo2s2wh2pmqynebeztgr1ojsfzt1cz98f8turmh7chp35ow0tmgnkrqadaqgq1yd37ausjexaegbb3d3gsf9al6oeecotto5qt7osegmmubhsb451ptk4fqoxsl66o2',
                flowReceiverParty: 'fpuwrrk7jrx2x82henjoqgilkh70yauzurraoo8c4vssg917g4xjqajzbvucxlyg17ful9525p0rwcgj92tpcomqijxnie8gynvrcpun1aqpr5a1b5mdicgbjgs33kw3p3evyitf992uwlumo9a3upfxxo25ng5c',
                flowComponent: 'ctprg2u1fu8giy0l3qrs7ab6qiyfle48ftq5dv5pjt6udgrxou9by46x9gg15ae2c661r3yy5o1ag5vrc8eauw573xqlfc5zqn7o7qb2d47kiy2ldnik9tkpkeonzvsm8798cxyjiwsj8vs765obl146vn61037u',
                flowReceiverComponent: 'gv2ztqj5ixjsmfugtd4hwu3deaa06dathoyuamr66awxu7746gnzetloujysb2ulcxxjan24kp48fwt6zk8ugnrzehj6198rt8ck2yylcsh3aokvub04uv5i68puodcugeh1b7tnvir470f5fyhupkvwc90whfsf',
                flowInterfaceName: 'rczvkm9xwbrbislp62mw4non47515wsyzz8wnauu38zll06zla1l395zfzzazoirjnjcwzntuvehegt4xh4n1gsu6oytp1jr8htvdavi7ku1hdtkkgzohmqfxp7dzrqy8rhrtem111ugn6zlp8uxxzyu2z9pvd9p',
                flowInterfaceNamespace: 'brze3jdx4la3zizzo4zz20u8tefgo5htsgrig98s2iw22rr7rej7qqf3ptx1lm3a4h84ohadfu9frz83h70ggc5xwgtb4yczq9shduvnx0oswe6wmaylpmhkbs2mnttquv2ay2yekxwjsqzrdtn5324gdwidw3ez',
                status: 'SUCCESS',
                refMessageId: 'l3vsmc4yh2fnki1765xc8gprgngjn0j6fsh7db2hsh3cwxaddp6jnbhul5t1epy6re2lfp0qreo7onbk3d80ojyfmrxbh7xy3s09p0bmklat3lg8hhk2u4ub8efmilu6rsglkddu42d5hrl34kkgq22o6u844rkm',
                detail: 'Adipisci provident necessitatibus voluptates commodi cupiditate molestias totam nemo. Suscipit temporibus ut dolorum minus. Ea non reiciendis. Vel sit velit eum quo veritatis temporibus ipsam. Aut distinctio voluptas aut dignissimos ut.',
                example: 'vw8qnztx0an0k9slufwin9zn1wqyek1ntdx8jgpen9s7zcbs9jq8asr3sqf3rjyjuehx3f7x5ekde4m1ew4broxqy9wrqw910dnv9lgc2bq1v01ob6bzd6wusriec4wa79qiznki6bzz2yd6vn2njkb3jfbybs62',
                startTimeAt: '2020-10-22 16:32:11',
                direction: 'INBOUND',
                errorCategory: '8oe0mh0pk38ig1e2cxw5iqhycvsa5j2zt6bkjtcz0jho0ma1f6t3k0hg1n96pzd68iggc9tsvhc6hfajmnsnw29rh42tq1u6fz5cfsba0d549vru8cia2brviqkfab2znpw0l6l9a0puefohuxxmjs3wdxxl56l0',
                errorCode: 'jjproh54i6mea7r3ayb9h3gch909uokhmuvyfpe8rjbhj3x7i8',
                errorLabel: 372884,
                node: 3096638720,
                protocol: '5kmjf6frf0hon3kxtwxqf',
                qualityOfService: '5qr006sxbt7fj4rhpcs4',
                receiverParty: 'ggzmm5wadle67621m2bpj417hcue8k97bimy8c1uv73uiqk8gn58kxdryyty26eg7xxc34il17cp6az5besnlk61h3i3uspfehpynf8n1sj3y8uujpvhjlbcqcatm6megdez23i5yns5s7ip4ne30ixo6anv1yer',
                receiverComponent: 'dbsglocszlh7xhc5gysmv78vdmvd33wkhkdytvy7a2zeb26u01oqgbij5mn8fdcznlkdmdmw9dwprq5wgr1x9p0x9409lnjma469tban528iv2gidpnq1ibowua8lb4otq5p261pzftxby55a5x78gn6z5mnvslj',
                receiverInterface: 'ru8i3nd8g3bserlsrzmtbuz988eo2pf3cdlm6l251i9jw10vtupcewmrkmvhc4fertjmhbhnlteri9jpputiif6r658vbynk2yupni5x5fcr8l02uluiy35k0aedglrzgvef645l0ttn3fk7ias4ky8rsrtt1asf',
                receiverInterfaceNamespace: 'dsbmeguxlr83aa89rijst4uqvkfdejv08hbc2vmar094xwnspowffzokihpcm36eogbpen5y1pg621fjs3quh6kwqyj7maklq0i9qhknwkbe8700019groz23q1ib3lqola17cayakb1s6fdfipgrx453hcdxg17',
                retries: 6334705463,
                size: 1616901357,
                timesFailed: 5367949460,
                numberMax: 1955243488,
                numberDays: 2050475874,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'wqfmkaej21hz24x73gbto8chbsh9punhnj6p60qxm12p50e259',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'c4l48zwjjhedn9v6otii',
                scenario: '7xc68vmjba6u79us2ydv0og6eu8334xbvl4eftv3s5m4kour3tdkw40y98z2',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 07:58:26',
                executionMonitoringStartAt: '2020-10-23 02:47:41',
                executionMonitoringEndAt: '2020-10-22 22:17:50',
                flowHash: '9zqnhc4g51comvvh6311mtxi0dzkodn1vl6xu098',
                flowParty: '811n2nl5gs3jp3n2a43kvussmkfgv0oz9jo4d0hst9rvtgb03zg8anpti4czl4j3vmlgunv3crax1vmvtgas1ie4z98esd8t8pz73sq25auxwter606zptkusl1dayeu638cgrt03a1x9axl18mx55pmkyfqr48z',
                flowReceiverParty: '45nsi9sb8qjldxbmn3lsbaajtj2mjao5rjzfcp6aunlos7sh2xf7vgbuca5gtbbezkarc2c60wii9suue4s948cd98tywtxiwwvqxwg9btio8mg3atrg662xvp53xcw12bfpqmu47p3pmk5qxj0zfk2iahgzgmw2',
                flowComponent: '9vdt5pv18xyraa9tsrzzbk3yosmszn9j1zb1v6s8b87pvaf655693op6lyr1jeg6gk0i2howy52fxetyzwh1p6b0jkpo7r1gh1cjymjigf058kcgj3zjtw5ahgn10kj57t9rt46uf2600n8dnaa9ivxxt1wdty2n',
                flowReceiverComponent: 'y1grbwdfuhgvclr7kymjocr4oepvdtne76qc09fwo3d166zwh9z8frbo3dcixmy6z1a6tj6d3y7m36dfzk67h53unkhm795jscatq00euik7p9kdeg00bvk83uodznvms3rwxc4fc5n54wn726jh01353ffky20g',
                flowInterfaceName: 'xp42spv8owxe24711rgcglf26pvtgcsdscoe1kgml69e0hvw8zqrstnvlmfnw1o4rbc7rqe902qok9eqbmljb6znu7wpcywjbja0gsv9189508hsacpqz6zke0dtrgspmihorp8boy1wrogehsny6henx58vtadr',
                flowInterfaceNamespace: '2mxn7auf9imp72fn28o3mqs8mcs3rt455dk3ynwxrlsrcnfuyfm0rb2ml03eswklq2gpxi4ygutu3aqdwquo3ruxna5dkatsym74dhxcnpuey9gznm9mtdcipap0yksw9xp6holq5hevw6tx5868c1a9xfbou7om',
                status: 'WAITING',
                refMessageId: 'cz7ossta989l6sjcuuwx56jgct560mymr2ur4np8rqacqrila7xgvu4yoz4o2qh8vg0x3sw6fw6st1xiodd1vnprv3vb2jpr765vbsa9rykkifvg92li89soa5yrq8toiv79o3unsclv8k1z3nmqkladbszkxeti',
                detail: 'Corrupti voluptatum magni omnis maxime fugit qui autem. Perferendis sit est at est neque dolores ducimus. Expedita rerum beatae corporis quo quibusdam voluptate aut voluptatem omnis. Odit voluptatem cupiditate tenetur. Labore vitae ut inventore nam voluptatem amet et.',
                example: 'qc9x321k9pf4wd97m49ajqo2vfqztqh441x0urzlpmb4iosnt0afxgthougvjtcttj6rxkdj6s1go6hs52ttn5u1ipsxx9nu7064ucjjzmtpaxjz9zva6e6tnkkekrbq5oyx99zcb15nqoobr98o1e4jv0q7xqgw',
                startTimeAt: '2020-10-22 17:27:59',
                direction: 'INBOUND',
                errorCategory: 'zgdncwjg6kuk4ry2kkan68k1wjkdpbs727r3jnwjdg7utkx2llvetwiz8g04ljdn8i73te4thipuecygnf43uauefwait3zstc3n3v6aou2j050mr1a0w7nns0m1rjco0zsx1exzttn5p63l0jyvf3sixwm2jicn',
                errorCode: 'wdsgxf6w28r815q5k6kvnigg9qtveekjh1oagpwdlystk8ip1x',
                errorLabel: 806626,
                node: 3622138588,
                protocol: 'fp0cphr08j22vzjlvgcl',
                qualityOfService: 'pfetih49tzhfn1vp77mmi',
                receiverParty: 'qzrgzidwtctmimgd2c9zun4bl7f30o4wvkexaxtvd7bvw4kbknadm1j077rkl3iixy6z8jfw4xngtbnv1ksv9kl268uwcn6hgeu35g8je03y1q1xcs9evefsyxuqtrgt016t5ynon1hd6dkwwq0mnmfasye1uiya',
                receiverComponent: '9b2bo1kp3x2gdat82frvxpzcr1lj91mu0nsefmmh5k37nsk5q022mta6y7j29nh5o1ji9c6y4rsw3lrvosrt544ccoqlkrfn00adr0ctizbxhz98wynb6kcamph47fdh8bkjycafleufcjye5nrnn4rusjfr0st1',
                receiverInterface: 'adfg0ze6peki5t18nifxscw9wynvr46p4qkarw7gi1scvgp9pjmv129a65t9y7uqti92pgvhvx2fjll5u1ffz0uwk5ln4pv59pugqa6uy81isi0l2fu1r43zjfm4js76ep41jmys75z9r9v086rpxeyvhuul6a5j',
                receiverInterfaceNamespace: 'u2pyld16qgyqwhmbkqrll68ye8gseeoypjlnm82qy7735yy8gkqh57obt4c1dhgj6g87a00fh0u0lahxvy587f9o0nwq2bonm0bkqpf5jqjje45lt8w05bjyplpmxvj4h72qieie9glzkcxe4omfes1ik266uba0',
                retries: 6482309806,
                size: 4168779480,
                timesFailed: 7116770601,
                numberMax: 8452594074,
                numberDays: 7570069661,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'zwkdzeziu9j8qdg3tq36kckettlwae501hx9kmllek1giwe2ud',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'chdoncpv2ga1fhrhfo8c',
                scenario: '3lb9fbe3z6bvp1agiltwzud2rngbfqpdkp1zmh73nuixd96jfrkn21onm6af',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:57:52',
                executionMonitoringStartAt: '2020-10-22 22:14:22',
                executionMonitoringEndAt: '2020-10-23 10:53:10',
                flowHash: 'k105pk0ew1wwig5up2h5b9txkkd2ad3wqlkc6wnh',
                flowParty: 'zvd0azxrsudgm00o38kctg19tjf4bhkzqey3a41am4t0zhtmugl0m8q1rqqzlejqxo63hdq5b45kkic88h4kcji7tyatmngp674bhbn9qfk5u80gmh7lytdtnt7nao4nqqxi0jban32igx8ducyfzqgn9r6uhzw7',
                flowReceiverParty: 'y16pkrgr2rxwh58bf5d42wpv16zgx6e10qqwfsxym00w39acb220lms9f3kwc2gasimstztg21sprix95yu17jdug79lcvoq68o3am7q3cjryygxhyvn9pi3rv2d2mxif44cv81xrm0i9b686bmqz5qs37e62tub',
                flowComponent: 'xbongs8hn7g114cxehga3957ljdkdq6oeweq085j4j63b8aymb3qer0bubwlh77njkbzqfdije62iwbeig8xwwaivnwj9p3g4n44ahqakptkbn3n1zsuu3t6zmjyajy80ff69rjaeydo462fjo7fonh75hthxctw',
                flowReceiverComponent: 'zbz07lsv374zle7ly9w07ss9014kepr31rspd52l9kwuwc1dau59if7ty7erwulh91c20yf3rdrbzfnyxiw75aalddztfkhcfh3ujpuzoybgycz0htobrn12b5x7l4qnkuq5tlsckt036ql02s4klq2lieu8h8d5',
                flowInterfaceName: 'tlphgdguhndoxvoq8h2dygaiva585t1823hhzr46o1xu8uko9nh2k9leo50ov4ud7r03q8mqyqm8y21xwycew40aa9vlfv3xc39gwyz9c8fxrwcy949npjbctlkq90dlhz4mo1u0k6f6m5saug0rce9yhih2zlqw',
                flowInterfaceNamespace: 'm5brtecpxn69rzl3u136m8dywgqza2dhjvi5xin1qiy8sreet7mnexgm6owltiwm21e03jn7y04e252rnefuz88g059pqxd8fynalcprcymn18q6ilwtx9gvvqhzi9d0slkkkh8syjqtxtx7jp2l9f65dqq1k62v',
                status: 'DELIVERING',
                refMessageId: 'ajn2bh5jirnb8ltq01cprduxy2uxzyq085jodef9wpjwjoq20ok49eymnshrj76eskbrvtvx3m8k0ppubfnv3xp8dc82bbfld23bybs80xky6pxg4m1m8mh8485f8ro6j40dda7camv5d52iiu7l00zvyyqq9emz',
                detail: 'At ratione ullam modi velit vel consequatur dolor. Incidunt ex tenetur aut facilis laborum ut ut dolores. Voluptate reiciendis enim. Exercitationem eum inventore ipsam. Perspiciatis itaque ut et quae consequuntur doloribus non adipisci numquam.',
                example: '734qricdnwlv909gnowbmx9priftc47n6qb6l16mjqv6w2znbz3lneuls93ms17ft37n93shuwxeug4i4tt2gkcihqbkvykqmak1en1epd29obkc6zi3ec42zku52lxbdr2z6exzd2tnr7kgsfnfdj361hv15rpy',
                startTimeAt: '2020-10-23 02:59:04',
                direction: 'OUTBOUND',
                errorCategory: '1zo1hfynynsw9tcfqujgjqy3nny6j7szfwmoa7lxvjybi5c02fmmo4724hyn5ybghh5kkaek6xfwmc90cm26mppltilgl0drylu6pw5fskrasis2ta7rf261s177szjg3ugjyb1nvkfu1tbolwsbw3h73wdihegq',
                errorCode: 'dhc0sz9dl1sk6ouj9z8a73cr0ahvh8ssprh9xj79j2sghehox1',
                errorLabel: 305124,
                node: 6426275049,
                protocol: 'pjtnhp1hxfw264wsoa95',
                qualityOfService: 'wtq5qzripb8zjylo7uld',
                receiverParty: '819ukes9legeyflam62n0atm4f8h921tsllfipp7voqeqoleypmtt2mom11ahepsfdgkknft7ogm2vhnoguxilniio61nslk6oi8rds2ehqg3ahqe7r0dv2gyf5ebwg2fx75vmd9d6oz28mu75pv1wtrxc0uk7zuy',
                receiverComponent: 'wiin634qm5xxg30lhoyuwuyqzt8uro5zzmcx0fgiv4divgxpfyknr2sa5ahajt55a6yagwnq52h0y74i8xci0vazebtwvdv2u8msgkxi75jlyniymvyhoz8scj86e6ww0yltjc6ryrv08rt6fdvukwvlmqab89iz',
                receiverInterface: '6migezezgo8vx9mea39370lap4t3qarvgm46cmu61ywofwmvw6rxrwmxorugrsew7kah73pbsqoewt8z0lmc4dwjyy4co6bz315twryomonma3x81seu0rczxjtvwy7cy62kec4fhwszvb9lzr5el967vjuzeori',
                receiverInterfaceNamespace: 'es3eknw70yfgynlaa8c94zc4lzhdnagft9xnirddptk8oiwrndgtvlqdo1p9kdx4qa376tzhnar8ddvam1uysylqpngb8abmcy6rqm38qhxzgcp0t9852myrczjox6tfkmec7em141ywq5j59aikmvvz94llriq7',
                retries: 4489261625,
                size: 9049116377,
                timesFailed: 3605763701,
                numberMax: 1774666726,
                numberDays: 9182143730,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'zoqm7bh6wlriurw7x61i6u70caaldic41klodkav5u8ppz6nqx',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'x4pwpdp8e0sayxsoub4n',
                scenario: 'prwxhepvflve06vblspctq4v95wckhaq7sgn4dttmz50r4bqy5kuux51fvvz',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:18:23',
                executionMonitoringStartAt: '2020-10-22 21:43:28',
                executionMonitoringEndAt: '2020-10-23 10:18:52',
                flowHash: 'x6k3wofmgzukc1l24tef6nmwltf2nysj6bxxfrrh',
                flowParty: '3htc7kb9hfvwpp14rfjd8dvhqstz8066zqszvmpfdbtyuxtobgzqt3mpo6fitwi8h67h4docun5esfkbumsfvoxd0qufmzv04hz1c2g61nligt3cblbntkkcca9cdizd7c4j5n6yarum9ndiyfoyfs90hm68qztj',
                flowReceiverParty: 'lzm1o0hqxzwc3n52tt3cl1nmx3lvs5favs5nwpbmqofmly2a15uw4trjjhv9ep7dbv5lj4dophcyclyexpk6jh8oo2962jdpl8rhbor73zwcqw2t8c5dw4lfhk1y2zu9hcng579c20p8c8u2i5a7cw75w1ns6cx4',
                flowComponent: 'fzu7sjx2toqpwuwl9bqxbokxdd4wgkqyb3le7nusll2n60c2izy1l56e0za9c416a7sk92afhtqd9ncil4ep0337kn9y57vqd4fn80zjzps55fcuykh2kpg5d8441e5xo7t6r1fxacugmse38q8p45ko6ckxyre5',
                flowReceiverComponent: 'yd6fela7djhrqw2bwgubky5jpyo5rnx3rdjzhxx0cze2peuc3ib0fvl40kesbcfjj4qlvufk2cq54yxykq24uk624ktvncm3ups3n5idsro2xvy7n1ow2lmqiyoup4h6p3bzzxp1m8hdwj2ooryif02lz4w90bdd',
                flowInterfaceName: 'yjeo1quetdtf6e5o9dzxf6bkdhlcbxewrztli2s2ypd9xzicracvdrzmcxg7w43mb6nd6h5g8w1mvd5megli3dyqn6pa5zdohspuxihiriwzabgspos7st83lmeu74cecn4psnx6ocy62qociowhroye1fkkum9f',
                flowInterfaceNamespace: '0qf2yhtdl67dj1ha2tmuvkf4xw2gx7ed27esbw1pre0s9lo06kc6svbdzgbl92xz98g62ojbuuckwqhd804l0c1nv13shktdm1jhn7vas3jsktyip7x0vohzwv1v41pdc89cfomicjyj0akoa6agd5bsqvbs1eao',
                status: 'HOLDING',
                refMessageId: 'nl57vaeb4yctl2z5arya0hno9el5k4xul1dr57sb3xf0xpxy5ptdvzbiolm5hvzgvqzgnqinvewutc71xm15kaqv3nn2o1zdhhz9re4fnjy5prhbjmg51xhxdh19adhi5zui12vhk6e5n6pchg7sbaux2ys3uf8q',
                detail: 'Cum voluptatem fugit autem aliquam ipsam odit ipsam rerum. Impedit aut porro incidunt sunt sed voluptatem voluptas qui molestiae. Quod veniam porro. Aut at nesciunt ut enim exercitationem aut. Et esse sunt nostrum alias incidunt alias praesentium et. Quis ratione delectus beatae eaque aut quidem mollitia.',
                example: 'aoxv87jwxxn8zouo9mjk4vb6rzfq2bak6cjiz7df0kuzuu0pgrsdou55r6yginyi5v44ct9dex7il2non8qwtxmmqu2zhtv36d7fgiyqs8t54z7nj1rsraj8heuxa7fhl8fn423vj1ww2iqflxhcu9sfmvno96m1',
                startTimeAt: '2020-10-23 00:58:09',
                direction: 'INBOUND',
                errorCategory: 'sn7pehivk46d4b7gyzqtd4d5u2ey5bb3ha94dcza0f54vnrcbebf5fxqpi86edfp6cte6lplzh6j0sivly9czcl6ga5g2k6riplyccdrcq159kbop3qtgc5fwxx9glyh740vnhrj75ryau7sy6hel636vtd233jx',
                errorCode: 'mjl1tgqvpqfkrkzy418nls6qy7g5numnyb8mygekuzaevkxya4',
                errorLabel: 979558,
                node: 9391768699,
                protocol: 'tm0gqydqgb5yqeacjmxk',
                qualityOfService: 'sn9dwj5zuz3yj5xo6ooh',
                receiverParty: 'b9exoxv7e39lhhgb3ay93soh9af0mibrp93ncgocl6kn01436tu91qs7k4dc34amm1m8fxjvt508qw64av3gq6cutpflkw8fdmy12gs49umfx1gpswcaw9fannga88lj5y1wf1ho447ena1wpv191l072nnlhggv',
                receiverComponent: 'mu4kcu67f8c8umnztziy9ibx7aey79cgn9wbtymwzctzoxtc8rd4pogyjxmk5oi8dfngkzxxozkv9ulzxvn8u4jeql6v7vfoguksr33u5h7pfpua2gg541et7gjf5md0r3zx78ng1wy1mh54ph9n9mmdkchjqx32e',
                receiverInterface: 'm87r6bcygb9f4vmdcz9gr2lx43fc4xscj3n3bqlrnvmbcnepvirabpoeroo1bthga6d7u25x6xyxd4u3roaneg4w9iocz715vf3ga4vwhsy1vt3glu9ymj07xnwz5uh9z8kand8cmnewntj4etfpxvp24gyz8rqg',
                receiverInterfaceNamespace: 'uc4ghx7km884a71xr3cdcfvewirnvtdgqv3iy76cgn046hxyzj46lzwmckuy1pjucvjwp0f5t2hcpxgmytm0rb3a26bsb0dskl57qrvpi7qxn4mhfmbkne7gxk7fdhkskvbzql1zsp3gnpsy65hd2xeepf69sd1j',
                retries: 5035376381,
                size: 1115435433,
                timesFailed: 8801332242,
                numberMax: 1522026339,
                numberDays: 9021517507,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'in7p1op576x7l11x20qy85xoe8b62mhum5kvd96hwn9v61o44q',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'tgeaftdnnudpror9xroh',
                scenario: 'ld8ar3pdali8i906c1occ9wokbkh2tpblnbah58hkf4ihmrsg52je2gur49k',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:11:18',
                executionMonitoringStartAt: '2020-10-23 02:43:03',
                executionMonitoringEndAt: '2020-10-22 15:24:33',
                flowHash: 'txjug5l1syayjfdws7ius0ii7ksh2nbn47cscc8u',
                flowParty: 'd95r132gptrdqx3zwpu4urllr3977ximtkt6go98zbh390qoyc4golaeuttqlic9gotmce33kwva3huopjgx8i995u37meeyff0xhnhr4drhv03wl92w6qn35giyq1f7s0qep9woqzvlcfb69l98fd34ug16qpdx',
                flowReceiverParty: 'xu6996mmnicn0nqhesglnm1tua2vhvduijhujtgzq72wmsw7t4vssaayou3yahsfp61gfa2l01a1o0ly9adxswrswpu8h6g4egigec3ab8d33pim5ytjhvk9o0rr9rh53uy7cfjwuawr77isvy802y77udvkmwq6',
                flowComponent: 'tlwyksw34jloxnnefbwsb1oqwk0t67ehinlnti4a9najr1p3yiifukxjz9ea3j7kwsbyzd483vtsu2elx6pum3f6x2o6ktgzigjr65ciwel55zm5iz72to5mul7nklbytesytqhvy4dy9vfnhbso9czs44xbiedl',
                flowReceiverComponent: '5z6b4zqeek5fp2h6tdpbdd1f22j3z62pvu7w92azve765n2h9cvmu4qwp2edrweylenswvr037m510yd92j50835th8aovzgxz5k8138j8qwcrnom2j45nn05df4d4fbi4em8lsrjrdkf39prb0xyc7rqn9it1jg',
                flowInterfaceName: '9j1wjslqiobdtjp4l6ec18p9uqmgcgef230rqyk06b7zl5emh9bs8xz9mhhfxtnh6pvq831sqonpudoje1wweai52sa8qw7o3qkpvceio8aharm6v3vrgwghurgz0a67zobla81i3viyy3ose2ynza1pa0ppz7yd',
                flowInterfaceNamespace: 'jd2e3jkax9cu4wcpbu8hnd8885ebt2emb2etirti7ez76rtsznk9qw1p19qsy22naifdjpo5t9ru61i5cu51rxgxfy4sqpbu10nvyhobm9k1g1qvkfcluco11oi0p1ebvbtcnogyo9g9jan0y65gkz1nupaoxyle',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'kfggzh49zjpkgghp80lhipadggffqs8bfb3lpcfkjbyeld0gjsfr6qgffynesnznh6emf6t88x8exa474yk6b1zbtzgoqo2ehlp5s0h5t8rjoexj5e8390blnzvjvo17ksph4jpckqwf3z7o76vsart2ws2x0l8q',
                detail: 'Dolorem voluptatem eveniet numquam. Laboriosam ratione tempore veritatis eaque ab omnis quae. Aut reprehenderit voluptatum ut veniam ullam. Aut aut ipsa libero odio. Numquam voluptatem ex ut est vel et minima veniam fugit.',
                example: 'moikda8b7m58s2i34moicyubpw8rzy2n93wcdngfbc065805uem35v5aona4qfuvzdedpm4ikm2t5b0s0mlpoiw99ka5hrn95m8alw8bytby2zskal0ytaj7gh0sf6b4yqvk9wghyd0qb80vvo12bfaalr8xdb8b',
                startTimeAt: '2020-10-23 00:54:56',
                direction: 'OUTBOUND',
                errorCategory: 'mqj12yuu5ylq2dqv5cxxng2arfc3ltpyqxe1caeni3ojby2hs9ntvas2b0ip7v2tizslkklte069ua2rverli5x6j2fzi5bv6eobuyv5nyelw0d9she3wtol89qvugh9accrnr5w977qub54h4vfmfojgsxk2lrn',
                errorCode: 'eiuqcigv3baizp8wovke47r201sb2shp8rfil8gc1hqypfa7j9',
                errorLabel: 699877,
                node: 7404473586,
                protocol: 'ijjy3eo9uxel138fi3o3',
                qualityOfService: 'xc5gibjouz2hg3wk0f42',
                receiverParty: 'bm0t9x7oy5m4xe1yjij3ff3g5vuaz7i8vyy295uafmde6gpqoiat594r5gdejq7hex0ztxad39v8pp27xllrrtfst7f6iaq14p1vjmjet4chlgvczi6umpsc61cfufb33ssw6k8n4syosu6oa6x3tasatf1jbkgd',
                receiverComponent: 'uflr7ye0nunj71zoahtoler129krxi2y7aygn5mc5j3yndogerjqqk13i7hrs49xedvinxwgz9b5pj4jld43ywlpg0maebvfs24vic4x39pjvyw9c0p4xw5p4nllhu8sknhuvpuv2kbetwxq7ovy8jr14cg9o9bs',
                receiverInterface: 'myurc49a08jg6f4b95tfw3w8jx9rxtoxp5flc77lmfm1i7y3ye1iel5f47rtj7ye56l0hnjedtoqxiw5d5usp4q591keb23y3m3rlptf5h6kn0i862qykxbpl5z3fy5583aq47z8s9qyusajt59sz5o1bxj10ktv5',
                receiverInterfaceNamespace: 'ihbnuitv3s4ljykq4sjltkbnzh1iyw1xw6u3v5qif4obgmcq7ptoh3t1qh1blz8kdtzxo7zknlh7e8v9cfeual0owbsi4a02h18xtehkka1tnucenajiwerjtn3cci00mo0kkko881uzy06ofnrcotjgkdbmd0zh',
                retries: 1934780980,
                size: 6559408400,
                timesFailed: 5482258779,
                numberMax: 1558501290,
                numberDays: 2800332233,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'n7om6bao1meynlrm3d5af1qe0a58jff2qwiqe1agbgq9fi8xxf',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'uye0jy8wnugjgq5cw5b5',
                scenario: 'iwfvhob4qzrhx24df8d3ayac00v11lyrcud9435beka5wqikktjpu4tmxzp4',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 02:29:00',
                executionMonitoringStartAt: '2020-10-23 09:13:59',
                executionMonitoringEndAt: '2020-10-23 09:23:45',
                flowHash: '16g3lz7dx7puheo1mpqeflvr0nb99d3a8e73mupe',
                flowParty: 'es93kjd3yi4jehn5k1ja4v7rto2i8xprh3lw3qymzqsjax5xjc59sdpy0otzel053vm3oes1q1vkprtnhua2ohv5j7vavsz499byf5cajpdzdgvy2y73n5qrnekdbcs2rsn3av6gc4ns567hdlxc84z2wjo2cahu',
                flowReceiverParty: 'v4kfuxev2lx2pps3fr7ugogzvr1yvi7ovkx3besnl3vy0lp3i8o9v6a2j5dfgq276xbu35jbzm1pz870ffsw7khz7go4zp01dedl1q7w812xnklo1mp4esd18r3z2oe2pwybz4e92uo2dnwax9hgu2hr57dujvbg',
                flowComponent: 'jbdx70t7cdr2mnjz20urauw79rl9e1i14ed3mlqzmrmxgxhzx4mmzdgyqo2194cuwpgesioosz6i731pnw041658w57sp5yez0djpb4vccioeochb1n7tivawy9gc98px4sg1ena1fdvk48tmf7d7cbn14grugr9',
                flowReceiverComponent: '094sizn6ithxf1q2jz80qr61gicfhjloq1j9gpox17dwmenwsxkinys4u6h35q55gmrgzwqovek3qtcsj5yyc5zwy3p13es176pn3v66t4e5n5s5y5a0od3qubz6skyml5ltekvqhhcab51crlj810zgvkvsps9x',
                flowInterfaceName: '4l9fnxctc5x0lak2a28a5jh0utlhqbq4o0ufmfmndw1lsnw3ylja9o9t2vuojq4dbynelqx0za57twcj2texow9tg0p6u3nrjhhaisn8uhsd5cyirf1a6zn0t2dapmnhli08w5xoai8kfkotvb84w8d3bwr6mq90',
                flowInterfaceNamespace: 'sppc4oy9mq14vqbh78qtg8o2h32hbjje08epc8mo6t5xew2jtjot3et7hnbjkj0z2mkufqpydwsowrxn5orb7er4r02xq3938hxk9sc1xd4oftzeezfanvjoldd2pqphklgg296gcghdpgg068q4qj8uqlrjvm2i',
                status: 'WAITING',
                refMessageId: '90dinrldpfmmugmt8xshizpu07nneprns2knqdr0k4kn7dl4uv1z5xlwm9t8irbweogtoe618u72yk4w8zbhc25ta9ua7rl0136cptp631lgt4p1jhxvxvap35v05zu8fhl0t00a2g2e02agml13ms36j9jlb0t5',
                detail: 'Magni minima fugiat ad voluptas eum possimus incidunt cumque. Dolorum cumque et aut necessitatibus id sed. Nesciunt quaerat nesciunt. Ipsam recusandae et aut veritatis omnis et velit. Et ipsa quas unde hic voluptatibus qui dolorem totam.',
                example: 'ycbhp8qjvxes986d9lkwbswbjoblfa1a58lr60hen42nfb054osr5vih2pu0mwf3gco01q5vy3jbylusq6tja2895dg2m16xkg4x49osz5lh5b4ivbzi9jju70w321ti4hwebzk9kfrf4t498e5t9oodk1pc5itv',
                startTimeAt: '2020-10-22 17:45:58',
                direction: 'OUTBOUND',
                errorCategory: '9k0scgn5rn675ahe0yqzu6d0jgnvqjji2snqb3k6v0epswztyyw7izyhur4l2axw5tb1sgrlcalwg7i4h5irvar15m1varp0niypik9elekdpc74g6yxo2p5ie21jrkvox9qh5gp4y9ui4mw93tds5opoq2zcrzm',
                errorCode: '487lxakc8g8eed0tiyr5qrra9rjne23jn1vsf4ol975wyyocpm',
                errorLabel: 531291,
                node: 6757412795,
                protocol: 'k0ygi956j4d9cwjk193o',
                qualityOfService: 'cibijshbja0eixlzm6xo',
                receiverParty: 'yjqpzbpew9239x86m6b5ajayaszahptg7ep3cya6wg3le5zcg5qsrcwphj5uly32j1t4he8sw6so9oyufpuvxpyhhgei1zfn4pl0ya74wxek3569r5d0hzfp8zio86lma83mqxvg4ssikt61dklhx7j2hd1c4k90',
                receiverComponent: 'eh36i7s5mmqbt68khyxzbbysshg4tz3688gumxea07yc2vquximfmr7gn8jrm793jvnjaaz29gb0p2m3vyc7seewoa56pu8kcawb7yhamsq3w2eab3rya1yimuytgm6hz1syz0daguvbkc54glvqc6jzw9myr4ej',
                receiverInterface: 'unhk2fnm8d2wdtvyd77p9l8gfqcyy1353p6g72qaxwknpeb7ncm4y43ygwqgp9z605dv6hpyqnugpjuh5haekoc9qywaxkcae5itfthszym4ukhpciqg7yzpi4s1mlsqnmb9zt1h9wyvisrcyy73ic765bm1trbz',
                receiverInterfaceNamespace: '4cthjmisk6m1j0ngr1773ud6zl77qtwyhrxb94u7o0fdhx59j1iyogik0os7a3ibayweavu7rg7m579w6uhx6dj3jn80u7ol0cne0gjp7op91lkm41ryb6lp4gic2i5djsmarjpq2zyukg1baogchhefpajxnxf8i',
                retries: 1654032846,
                size: 8403997004,
                timesFailed: 1998480051,
                numberMax: 4819256032,
                numberDays: 7925876425,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '6rzzilvr2drinj0rbx6pvifoybdp3xdn629dyvxoitoni0vrd0',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '32rzm4qhuq2n1lt4umzb',
                scenario: 'oi764dyl1k793u29vidlou9xq8ar9mvku1hbqvvqi7vqh44zzn38n5tief5a',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 15:26:58',
                executionMonitoringStartAt: '2020-10-23 08:04:40',
                executionMonitoringEndAt: '2020-10-22 19:33:05',
                flowHash: 'a0vshjnlr7izdz31v5wmhr2xm1bqfzk6r6p0lbao',
                flowParty: 'j5bhcvh0ya9s4p3ght0tk7p29z89nsxdxr0cldphd5d6afoa3v66ujikr69wus9gsv42b98c8ix0v21ufb4fgaa3rseqyqe5rib0ijn7jh9us1yfprgou63untjblp1gq92j5c5qhc8didi0abd3f54hllt2o8yh',
                flowReceiverParty: '0gd5mk4kq6ytasysq3k5a41t80qk2ok8onfqymcvt2rd0bqndnkggxev7lgivisi6i0onjsatdc4h4cm24u0awz3chbbvl76aq80oiydf3atnoze1yfeg0tqruc51n8kkm2lla1565jstmxp0x2suj5ipa8ionkx',
                flowComponent: 's20c35l3rvsu2p08hikde3h51gbufzos02r53f8cw0g3nt9hyktfz1su3aiw0nhcl71x5fqne4astvqmwzv0gmcmue4gmjal4anujuxb224dbse4vkn7ey7xz9vt1623xqmi2x42h68j45jn5u59kupc0ullrvt5',
                flowReceiverComponent: 'hdjjui9j1iezp8888ugel994xmobcffurvqm2c4rxwp9ppe7421n6mccfu3hv0qw0lvfeao62jyqg72jc360u22pybfqaxo9nu8f589pgqs0hbxfp3e9pxoged32o8s6gw5gvt9pqn0dd89zp60dcgx1krla1mja',
                flowInterfaceName: 'djxx0u0ck57xqlfugcd10pzczugc4q2oy8d9sscmuqdycvfl7abph6v4in9gzhnss2vc8nx5l51ajycmrkoo0q0i70jcz7fvqpowhi24c2ptosn3ha51wu20f1px3vxcdfh4woqe2uqlmqukzwd4k6gw9t9s765m',
                flowInterfaceNamespace: 'ou6su0yuqz939rgdexgp7dry8aglc291u46bgeb6bsdry3if036z1kquuybx8cx8nrq6rkle329p9slwgnhgdagjp5gl724z1i0uibk1l82nkkdpki2pc7wd07ivj8mlellv82n2nn601vqvqq4wt4yb2kn2xgwe',
                status: 'HOLDING',
                refMessageId: '9nwwl7df1cmh1yzkz00yinndia9vcx2kodpz2mbpmqed7m7215q9981c97t18kcu4gvxengun8avwgpse1ljx8p3sjydle9z2c4pbqqc7ofluqwi0psyiwp77der2pr9aqgj4zq4n2101j85ylvmu2iae5j9ucbg',
                detail: 'Quisquam ut maiores. Placeat nisi in excepturi sequi non est. Atque tempora neque reiciendis tempora. Qui culpa voluptatem qui aut.',
                example: '4oau40m9bid3vut4kg54sh6jn8x09k02lsqbjeiagjugxo1gmxtm2udm19ekle1a1fe8mt49z6ka6apx8dfcq9kxqavfizemy88t6f115d1wc6bqwph8rcn6mom02mxufrko3e5ianhorb7iqrr4u9g4f7vi3n58',
                startTimeAt: '2020-10-22 20:11:32',
                direction: 'OUTBOUND',
                errorCategory: '5cvru3n6n7qiaa3pihki9zaa2kut2bgiusnifoi3frivn146fmd6j32u5yv8hzg2gffnqouiqj0maq5nqpsog1zpjmm4kubsj0ua7iri5ma30o0n3uho4xdrs1fw6be9ybcarp9fgpb6nbbyb84ab3auczl76e84',
                errorCode: 'ehwk5ni1gujpbig2bf7kx89yw1hxcxal1snnj41tln3cl1avc4',
                errorLabel: 631114,
                node: 2151109526,
                protocol: 'xwsl8hifm4nn1g81qz1i',
                qualityOfService: 'v6qz9nu5fsa8anpwfxfh',
                receiverParty: 'm79pb8k0anxl4r9fxl6w4y22p50pmvvu2mlbwsbn9fo3vas23uiq2nw9wxdut5knbix61827413b3b6ki3rvcr9qrjtxtptsfbo7b36y7zi7qrdshz4l1o5h9lx9xm51lzy0bqlpcw05k2te95x2fak3fstfj3vi',
                receiverComponent: 'gpqf2b2q8dzhnbr9xqqgl3n28t4vjthjkiifthrqf37qt6oukueczc3ek8glt4uazk76tpe33n60bk75befft2uglspo0fpa8gd6cjuvxxycpcj5h9l84mrwg50750u702bwduva8ox5pagrhd54mx6t9s37bxmo',
                receiverInterface: 'ubpz6gks80ze7moe0ziap4frvenj7meq25c79f2aazqtag1ccrmsowvvpoe8w6aini1dc8xljt13serqd0ff8chhzsjmpr7zwzlvoh9p8zj6nnt5dskk0z1r7k0kt56wqkmv7lauefrjjn1nr5tduzgr3nuak1ty',
                receiverInterfaceNamespace: '8ev6k10tqb8rnv7h1sbpirsy7go5ho48ins04i2sy9kfc5n8ydvqzae9vjulpbfvz73fmn2pyhgxgv7y9bze7r4ud9jnzh0o3v05edwtzf50s7fukl061cyz1up29fhdo4fbdgrssh6c3ddchexv2a2ktzglr42y',
                retries: 33318481026,
                size: 7522425140,
                timesFailed: 1315175598,
                numberMax: 4466329032,
                numberDays: 1953697441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'do2yz3gabchzx7wvpx3ehb5b2kfe7i9bjy5lfmrf2fi7bfoeov',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '1mlvpywcuo94k2u5xmum',
                scenario: 'getiu1cpdxbjfq1bejxj7plpcje3rm1dkhv3zvp0adumk06t0crjq0symfh9',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 08:52:09',
                executionMonitoringStartAt: '2020-10-23 03:27:27',
                executionMonitoringEndAt: '2020-10-22 15:13:10',
                flowHash: 'l0oswrgtmi6lo3905rb3h4ra535sdry7cu2ywzjo',
                flowParty: 'o7cxerl83ms4g2tmavri3zcw3hklej83v3a9xrn1xmkgxdxlxycnz9hxszrd0n7rh8cpzvk85a60y9pdgcp1v9yfijzoefjvcr6yepcxzx62hfchnqac8tf75xbn0med2ug326127kb47tqm2q9zei6i25589at9',
                flowReceiverParty: 'ehy17ekqfsipa44psqbia6500d35sa30350euz7ryi8ipitwz0kmpr2vefm811dj2fy8k1ei65z4on1qj9xjthkb0hy3gjxd8anknll13xtj40476cvdfuu9ow1ahmh8u4bgq7u3r34yyv2gcjim8q5bptehwsy4',
                flowComponent: 'gd25nil7qgfnpv5mje82cfqtpqlj3mwe89m74fdghmfu8j4ipkvxvauzxe4a5n23iimqqg942aixbtryrwrcu73319beogzb2g6jktwi2n2c3i0udozyew11maf1jf1dufs3nmbp98htgl2j17ieulx13kma7b5j',
                flowReceiverComponent: '0du5qjc27x1zim2nw30n01coslirb2c0po3e4v11ti84f1rrtkqy3ijj036agemiao7o2sjxf7tu02ojcjm72syu5jvbyt4vbnn497elugadbezfhmglx99lzl2xo9epqkbsgi01tqwqk3pr87n1gqo62mv0070w',
                flowInterfaceName: '8xpry9ewm05t5482pcvlbho23iy89h3cmo6lkqpitqmt9y21e4zlqjnmyqembxhqleeos29okoae89akzpwdlazvqwdkr5gw2no229nufetfz6tsg0wgtyz78rf2e3nex8u0qou557qktbudd0uxhl1x7tr5foj4',
                flowInterfaceNamespace: 'oru75ayaw1lxzez5jrlu4u7s37cnl09p9fxv95zo95fws6boaca6mgyfofyhzsghyo9mziz9xfsmdye9580qmcycn2uxpvpsc3w3f1o0ms0mw6tbzxjw75gnlotjjn9fwq1sdlhvx6okumn2514lpub6owynidtn',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'wvp7xpatkac87bto8u2uu7murzhg63c6u7fgzowpb8x32y96ubpproxyff1j4k5049tj5n3iri7j701v074hftfk9dwtlv5ozdogese2lybnuhti5tpixgux2nq8vu4rw8v0ehaxbhj4fsgfd686qq4cwy6ixihc',
                detail: 'Quas quis veritatis sed. Facere earum accusamus quia quo voluptatem et autem ut. In et rerum. Perspiciatis laudantium adipisci quia sint itaque.',
                example: 'rkhmuata84qbk4023i472vfbzox8gyq9n5tdypgue5d4av85cw2f0ub3nv6xhmf2k2o2aj6y90wa9s9de1a1lcuh6kv10com2g3a0jlmncp1n0vdd8foku0ubis74ro68d47kgi4jerv47zrswdryveh1tuftgco',
                startTimeAt: '2020-10-22 20:15:05',
                direction: 'INBOUND',
                errorCategory: '26tyyyb7pk70hvkecxbhcpqyovvn0adgl6uv5usiq75586xnvlsbiofjc0wm011qkqsj3hjnxg1gblnlgsra49r16hxp78zi42kjal00abanm678wfy0vwx1mlvhehagfo0omiiw5ghwl4vuvg31xwq1h3uwh01t',
                errorCode: '7snqk1x6wotw5koqh39ub8euwdoawti5oxnh6b1w1x72wsrp6a',
                errorLabel: 444603,
                node: 5225509067,
                protocol: 'kme4ozedzc1dyqlgf8en',
                qualityOfService: 'j5y61oyq48io3dle6r63',
                receiverParty: 'py06p0c0qnshojfs59ju47kx8mb20pjrv12l26kqy6euuymplhvhb31dvni7ucu6gk8nk0rw6rlf05sqae745w5a0n5ibwyy83lxw6n6dgcmjnoyhos0v20ipn5d8vy35vc9qivilqc7yozp6r3rjs1ldsultpi0',
                receiverComponent: '5sqjb4ub1hp0e3e6npt5kxoibf2776clhsa33zxqzob4uerqws8n2hgxupczpdt72tpxot9qvb7bhgizfqpst5wcu1draetgot9qguwxonaomy7sfben7rcjf35dybukem5f4zea6onxoui13gbs17hf9c3cy148',
                receiverInterface: 'jnet7od05d01j4kpjhr6olpoogklevfev01ifnpnq1e775j0qrbf4fpvrw3lku6p9gz21w1ylbyfxgrrous3e6kuyg1qweqbttlrurin3aks9lvox3ar856fzttqyvf4k9jajx8m6n5teqx3j6wp9eyyhnbl732e',
                receiverInterfaceNamespace: 'hfh965mynqjam9v9lj63ya2wm4s5ev4vvpl43lf6u83em08aet1d79uneuaku4mrk5zyq84xivg22iwixrg3iubicb7tgnyi95o3nsqyx9xsw28k7nw1p7sg3aspi4xa9whdq8d1b7hg324byja9tsbatuv5m733',
                retries: 1912156001,
                size: 11253754445,
                timesFailed: 9506341491,
                numberMax: 2546794372,
                numberDays: 3581405780,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'zfzax5kfdf2vt13fyjr5me3xz0kzpc63m6c8j8azjj7wkr66qs',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'tnekoqzxy647kcwzro24',
                scenario: '2e2hora0p46oc5bq88jxqmksk9lwsbrrzza3i645yp5tjyb6t9z0kcrk83jl',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:37:06',
                executionMonitoringStartAt: '2020-10-23 04:13:46',
                executionMonitoringEndAt: '2020-10-22 16:31:23',
                flowHash: 'iago88ck33sqar99l7dxvr0y3q878bviqayg0uoq',
                flowParty: 'eoqk06k7wskehfmzdh1jvp83wqwsf3k489xqmutlafx6vywd0yj0pudn15amc2500rooj6ibx5jyxd7qypip65v61s73m9bs1sqa8in7xha0i8ovdr0hfpx3gli9hy67md5z3rw1ynqq5h6rnhkpz0sz2eayvpp5',
                flowReceiverParty: 'dus2ngzuu583jn2gexa8fi196wyvry0ff02atip17n7zgsftftu3793hbwpyoyng0nfj6py7z0z5b5lplyoqr5bjqq9jriahwwedlpwmqwx4gj9gd4717281g7pe1ztpt96q16oxxifx71qux4ofvm7050fvz2ho',
                flowComponent: 'u22l5gmbb72jaogzusn0ynur4furj8rg302zv8tb2z15uqchky5edjd8gitznz7jcwpgd0qb68c7lb9xuf5nvmq94ku3dhiu2dg9vh2hv853gw7k47z8ewfsoz0hktuvyo6yndavramy5j1oiwceeg5u1z5iepm1',
                flowReceiverComponent: 'qgpf4zu2974ne3nbzubi1kxy6ms2ti60tq4gcjfyy9upud2p6irmd9bke5t2bcrn5i4daphwryz9wb1k3adrm3rachln72uif723xdds4hhdzpvt86cndo9mpks2weiqtsietqk2uqxqrzvwnujncycoed1swwja',
                flowInterfaceName: 'x0ef4swwg821jn1sgv74a15co4xsxul74hyi1x5c6n2smo2n1frzovn38wapw2xc860b7jqlyi9n0986cz65ng6pvonfkdz9aj4cpw51zie636k8nwjhn5060c6qxa6645zef574v06zhlx8pjpnfgnxhywmketg',
                flowInterfaceNamespace: 'mqmwslrp98vp7zdvki4l5m4l33e8c2bbimg7m5xamq9ts8ssw58f98oibhomznpj9l2693ngwcq4tr2lvacgf67lcb1h4jt7xi15fbuqyourt66roda81fl7m7h1n6tcqae2l01bkarrkp0vh4yg4gm78slnggzr',
                status: 'WAITING',
                refMessageId: 'r7ram0h2lnzx8cerl3h2adfoeaa37iq9ne6e547qg3id1z9oc3bjsry4y2q9hch4p3azcq1yceg4ixl047yrm3r97wtxjpjl7zj2xrors8xeahwzcnfo0l72bnu41qj3qg30awfrre1l32a1j9prikugemd9kbfa',
                detail: 'Voluptas quibusdam modi expedita saepe. Vitae molestias ex. Necessitatibus dolorem tempora accusamus quisquam.',
                example: 'ucxweak72w2caasnw4d3gax9v9inlzl6umgi571390wyqiisq2ossr72b58h8d71yywm1r9si2tsdo9zz07iy6sw9sogyidjh315lxz8h1gjuyzov9bmv9cdsxd7ezjwvyq3hylah7vxjk6xniewl8xt43r1hzl8',
                startTimeAt: '2020-10-23 08:28:25',
                direction: 'OUTBOUND',
                errorCategory: 'fw7t89ht3lrbwupq9zy6qse6ln8yi5d20kejnvw0n5vu7tgexa1ig126qw8p2c1lcs0jlnde447bp4m9c2yrgkv8smcw24z2afc3kldw5yr00nzc6ubvrtwniowgharywns3sgl950le98nxduv1kyu7suuyrq2h',
                errorCode: 'x9cf5jx3l0qck7fm0mgj0fy3kslqi4bf6j3ktmza6ajbn7rr3p',
                errorLabel: 104944,
                node: 7257725432,
                protocol: 'hewo439fzllbypp8v8p6',
                qualityOfService: 'opp2iyiw7si44muazf20',
                receiverParty: 'okz5l1ednjzced1se1zg7l9ddvwfvmyksu158jfm4g90k78p841zei2kyrgtmagr63jlf4o7gdr61rccqfsd7vxwqipupr1agqid5klotx1qdgnh0kkkeusfpvj8nn99xx5jtewsikmbpbmyt1nvb4xbvxq4ret5',
                receiverComponent: 'ajqi99qhm92j6pjxosv4md9za9icrxz8qex3jcurykvuux2pwqotq9w5tscrkvg5264z0u25dx7xpoxuufmhy2xebjjc25dp3edjcu498zoya4q5q7tflfky384c726srar35vdo82sbz78b7xeenidqbpo662c1',
                receiverInterface: 'tqz0rx197rac2ap9evjmdk3cx6mv8fs1y34fav4auhrvjdhqhi4kugelxiuzx8vnf4vob59yeg1810dc194acn7808gqcuggndpx59axbqc67wwhspq16qjfqver59wgsg1jho9gjwrhyvgqvkb66f9zcb3jly8v',
                receiverInterfaceNamespace: '8u5jchxl46bke6sbsuedjjogfi7vewwh9pkxl7tf2l1wj1zlnzizs28opo4zc46hpfzpnnibvmg2umv0xoe2ay1vjuniqab1aopbdkd93tmpkibvspxhwdl6d5j9knem5vzxzgmk7c9yfvublys176edh4uddjlr',
                retries: 3485186774,
                size: 5784241733,
                timesFailed: 35735060890,
                numberMax: 4889333626,
                numberDays: 2584947391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '5eabdx6vbzbs0au4bu2drtiwci062xry77x1mflonsdcrag6np',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'hnpw566glqk3ees2e9eg',
                scenario: 'cblf2x7w93ljj77j211k1gkagdrww8sk1sejf05l985fgrjivsghon2e6zqr',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 01:25:31',
                executionMonitoringStartAt: '2020-10-23 07:00:39',
                executionMonitoringEndAt: '2020-10-22 11:42:26',
                flowHash: 'y28kut0okhs8ykm34prspiu166fl1gslkkom83gq',
                flowParty: 'ifh8jablqxssa2cfv0w2ziyo6knz7kn61lj8bp3cmb5c369tr9lhc3r5nl6uw6ewxjv169zkxy58futw4na5rm4k4tdzj1sd66y1ambopy64q8xfw8ey9l5pnxo4q6mp11aeo8yvnsr8xnocc3k5025p1by0ssre',
                flowReceiverParty: '2trfu2fafdlbkykzs8lhmv5htmtnlyzjhu9q0obtyytur66s66hnaqedzssdioww7xoukiobkynsemt22zrtc0xl339qtb1n1f2n7o8x9gynzfj1ct5emgg95ldmv2xvte1nopkmierd1s1x68poh0zyxl5ywv36',
                flowComponent: 'a7zqwfo2r0bli6dexudzthwg0u1po0l5iq2enct58bglzzd7b3bdfd7h8o3l83vtlqd35krntazj7qxoft8kv6ls5xk6nndcqd4hmg3rub20f20f1wkpwk1rqylb9bmzg28mzxijaw7s0opfdk8qpge2upukxkpe',
                flowReceiverComponent: '82rg55c1a60l4ng25cimgpcjw68feil0dz7ybfd47ynw15hvesq6qnhqx1xo6ttt5c4kww4ywywlk2fc2bzsgfn25btvtjfmcrm5uum9jhiue3o42qplaaz0nqryeb3b1b56laeiwt76fkl2zhjcbc4clscweaqx',
                flowInterfaceName: 'bvure8n656ywzms2rfjw76ceevhnmv3afzu8ipvf87r9kxd0ej7jz7b3sct3kemd10atw4apl4n3im418l3w7zuirxb9u3u03qqoz82x60k0drq4pt02pxwgabwkgtfl8kfhyx4t8flwsphvqwp1hsauarfi668h',
                flowInterfaceNamespace: '1iafx03st1ttjdicvqb7sd21aq5igo2od4dwu0thn3l59l0sapekzj1trekgslymzhi5cyimjacazzk5qkd1oer7kluj09nhvdmptk04zwi7wybqlwap3ky9qqlf7dqnb3yv786pqggwh7k5a5gk0skti82x644d',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'tj5in0av7sdo9edpt8jxf4rh3t7t8f7kp2inyqgc5nnl6k73psdol2yqi8hmt2ohmx3hofknbgoavri687gks74mzd80zxark76dabp63lvszeujft24bnaqwy2btjfk9q2sguyvv0xdwsj3mf7w721au4e29fz7',
                detail: 'Voluptatem excepturi iste doloribus similique repellat. Rerum totam est neque. Officiis reiciendis distinctio. Natus velit alias.',
                example: 'fbjoaz5fkmcpcxil5h8dxp53zh0mrx71up96u4mfdszf9xyv0by6j3z2rzwbnnbi0gk00jgw77yt670ehzeecm7v1szqwdc2fn4vxsjrr3nks6jxxrvz2h8hgndrvezezqdadkif7m3kh5vi7mypufubp25xb39v',
                startTimeAt: '2020-10-22 18:50:18',
                direction: 'INBOUND',
                errorCategory: 'fta18dpslm4cgszxapw8gnno9tt03rm8saeyntowhsakxmrczd5r9twzo4hc175jbibjf30tnqfrn7gp30x096zn99s0456njx7exlzfoggjrg3y2sczy2jxrrg6dck63bbfkv97414jrqgq5vdgsvm52b88swpz',
                errorCode: 'p7i6gb1urrs6j6a61gnr1hsv9wj3doku1c2lk3ncpcb3jjapv4',
                errorLabel: 550663,
                node: 5969681901,
                protocol: 't5ua37g64qidnmn2hsae',
                qualityOfService: 'zak24o7joxz1l523iuf4',
                receiverParty: 'tw5dpjf357f1ggf46ln2j31phjti5i5c9aixl9otea71mq4u1d8fucf710z1chznvsagplgfj54gdf8ifgdp9zc165pewgjwj51mb6mfh9rq6zqeqvylv7x0xkdorurhddwccy3up50jyoslpn4zjts97h6gupe2',
                receiverComponent: 'stp3n1zlju7a3qqzt7ckeqz9qfzjihujiyrk2914sv3z3mo9p0ophhlytspmwxej7gh5dpjdnu235oza7p63lrbggvxvv2b6zv0dgbadlvzq63wba7ss9xmqqn2a8vonreyref44he3crevujbtu67sakwh2ivl1',
                receiverInterface: '17wayqbkx95xlf9qcgmdq9g0hpnwxb3hy1o0r1jtql1y2a7l5rev1b6z278ux2ekwuh2q0926zniiy0mzj4ck8qc81l17ewfht5modn9ibfrlfupbnte42komnif80ipcoxle92hrtb0i2hp30z2y2mrm46bfsfj',
                receiverInterfaceNamespace: 'b75fjuszxxiewt6b4symkqe45ueklgfqxm5jdknajkhet0a4y5ie9inqjqa734mczjw9xlrb0qn5tzbmupwst4wl8phab7qgkv40cbxxfdtr0ec5pvbjgyjk40bt3fgt62125zjnua69lsgdfg05a1veuhf1tdgj',
                retries: 3843753491,
                size: 7689348162,
                timesFailed: 9109797928,
                numberMax: 43317029710,
                numberDays: 1868399102,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '76okqfpvwkmmdenacgjcawslzh5uakmw9m5662iax8qd6noimz',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '8po9yxgjfb0kkpldoeqr',
                scenario: '36r25ok4iw748w797kbyd0pkc15fb80gkn62jyvi8kt5zli721ucchycx5rr',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 16:36:23',
                executionMonitoringStartAt: '2020-10-23 10:24:12',
                executionMonitoringEndAt: '2020-10-22 15:36:01',
                flowHash: 'x3wqyhqltq1z7tsr5wndofnjqiv1t3xnbhfzln6y',
                flowParty: 'nigysi59zjitfbdlxqvwr6a7046g5pktwfj2cw432isxau64vcym11i3rlrhznlsoqh3mhyuam7feql4e0osdmonkbzu555i1k9bgyd4rgyq5196bsgq2mld65uv2h0yeg8x26rytgfobr7n90cgj2y24nk94qrc',
                flowReceiverParty: 'cl07oxy4as9n4v88hzn9j0ghul3nu1vnjeqqy4s4mcq7r5yplbuxfmpnpbe9a5tkuq2rh0nbcmhu3y7gt6o7ebt0z73vzmeqyb4867oztdkmeo8nlgomc090z204aoblhjwmgm072isdryi12yk6opb48diykc6l',
                flowComponent: '0anbjccn1xr5s2jaxh1jo0xoocwpgtd6n894fj0gcbpfspp1wccd3n7bfvcy607ksb7hfr6hvy54qddzyysnrdc68aqt7cf8zzbtdttwcw58k8rjsr8blswyltc6v2q22crevyzmidh30vr3an0nobij9k1onul7',
                flowReceiverComponent: 'rds8dthc31vwpdfm7kn303z09k3ynj1id0ozz4yo1exonfrdoebq4ik0d0nylakrc8lry9hhu4wzgfq3hu8xbdldmjy7aijvj2edbnwqcbozx26qb3mnasueeuev23lud0nitw27ussv49hgsqw5q1nhlmppo1vz',
                flowInterfaceName: 'fa4hkrfb2qr88ttykw7bd2obujaii44xxmym98zbf9uxgpr1r7qpuelkw34yfofqzdsw87wcsr7l34wzg8sowe3mhnyt9z93g1um116xpug584s7s6w57gbu7p66l3rv952jvqq8w3llo3hwhl5d2bl5j2mqlljs',
                flowInterfaceNamespace: 'sylbcl3p7tp8yekhx0n60h98g55dapt74cfdj3pjj25t303hqr4bl852366i11i71zg9gvqxtojvk79i5oxfrn1jd3kik8k5cxrxrd21qvm8lmhe185vqmv9bhx2r86triq15x44fe41bvgukkwlgu2vu4dbnvr5',
                status: 'CANCELLED',
                refMessageId: 'a8crvyt7qwth5qwzm7krkeu6n50j1vqqkjqbf5ka2fyf0lvyr46qpvwpgc7a2dnr5di5pissw9jevorznhmdcfndogxtnwc8fkeh2mxu95fz3njdtjh1rbybp0b7lpqm7i5vw9fuzffvsb9uu8a8i8kar7kn0z7g',
                detail: 'Et sequi sunt in commodi harum quo quisquam. Culpa consequatur ea aut sunt cum dolorem ipsum deserunt autem. Accusamus dignissimos aut eum porro odio amet dolor in. Vel odit ipsa officiis voluptas. Cumque totam totam velit cum eveniet cumque illo.',
                example: 'a36er61k9ri673kpbkskskw1abz3zh1tvsz07o4foeuczpkgsyk4356pqdayvby7zy4jhpsh2362bk8ke76dslykh7j4q9jyxaaev9gq3n87wg7cwdk0vwkic0ht90206mtwdy86sl9dmb33w8sg3yibut08l1ju',
                startTimeAt: '2020-10-23 10:30:09',
                direction: 'INBOUND',
                errorCategory: 'imx0xwcoctkgtksvmi7wrjxupsritqt2r6whe1aq2ox07yji0k2mrc6mqhq02xocus6krdcw4tasiqlu7ny96879l41tbel5ksaw1ovuqf0z4x57ucbc3s0r5105qchohpo1aovb0bao59tdfn55ul7wmd9pb2xr',
                errorCode: '6v50g2euo1oe5g6szgoz0yahfu6hnifhqb90gyaxgjeud1a5h6',
                errorLabel: 998749,
                node: 7299031601,
                protocol: 'epb5y50j499jeppysra0',
                qualityOfService: '20d3c5wm37q26yptrvuj',
                receiverParty: '5z9ypgf14w1nhzhmkje4ld1a1wff70q36zicqwhpgcul4c5y2fkk14x881wmjzub1vaflxh7b3pc45sc81rca45rbtozz4utllu22qpcqy9vykhdejhweev1ka6r8twdotliv9ko0pbe5h3ip3utxe5xy3y6e9eq',
                receiverComponent: 'tkm6xv08kbacdyebjlxi6tzer44c0fqk8a0rhtr4o3q4gl9jr780idbheow2gbi7v5yrcoy0dfuawijrawxics2p1ufib17mf5s4p22q3p1nmts6668vxofrg0pwwk5o81lpxsly4ojef9bbm7t8cdplfgwag9uj',
                receiverInterface: '1d5rhnsu3z99q7ezodqgixse3ga6vwe3zncrji6jcsqg4l4pc7tvppojnrg2y5ymya7ix3lxwkl2ufjo0bdwsp2bsmse6zcw8tje6lmqgyemywsygh07o607bh497mmlfzn7rv4gd8gxsmqktugyctcygpod6iqh',
                receiverInterfaceNamespace: '3xgxxpr66ch9hkwdmc4qvztsi8zdpio9j1l62q01d6uucakstm9jkws8y7dp8yqqwt0lcbj1na72o8qdrvdezaqoql6sc541zgk42q486oirbp84bwknjrvjnkemktg899wspbsf2pb6i8x1bvv9wt1un3zuv5nx',
                retries: 4502960879,
                size: 3449597745,
                timesFailed: 4069487211,
                numberMax: 7824670356,
                numberDays: 50045915890,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberDays is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '0fusa8258ojihvz4ii2twqmcltc6j4gm7g0xt1841k4b71ho43',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '5rlhyspwc5gesjugrcp4',
                scenario: 'tk4215blpiw6ug52e4p403ydg3v03igk90g65oc9sb3ru2qrdpxe032d4yda',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 09:36:19',
                executionMonitoringStartAt: '2020-10-23 01:41:25',
                executionMonitoringEndAt: '2020-10-22 14:18:32',
                flowHash: 'eveul80iwq2ija54d5cb4ms4fgl5st1053k69oe6',
                flowParty: 'jz0ieypyf9nn7m7c034qqngkf68e31kunnsxaam0ge9w2o9thnfcut9f9roazjoppx8nzzva7naaaju2doik1qxqtxz2ig5y0s6gts1otbveqslorzvx24r34yzdp6yleck07qlu9ptbx8ykvstntav0iadb85ba',
                flowReceiverParty: 'dfiyt8ngn51d1o2ygim8hv0zk28v1twccewaf93f45gjxiok3hw9vvzaugfna4vkxzgjo8u6zdapzxjnc4hzbsf11ig61lnwnginqas6d4fiddgikg0rzg5sbcsf8s50zu8y9dm7me7i0r0g2s0cgx1ih47d5psh',
                flowComponent: 'jbsgdhoed22ykg33sux8z7m7nf6av4sjeciwpz4iibvdxm757rcwnzvropnjzp80zhtdzoldx0w9vhn45uq2yagdvx2uxyyqumr5l70wl6ri1ihdzuon7g8z917rnfob7l86nt81cfx4rgefolbtmma86mdbgnv5',
                flowReceiverComponent: '8bf8dobzxphq6z8oz8ypxar7jcoecl6iz3tgmey3r3c52922cudlh5n2ia7ebmh008nrrqcm9r1d0fp6mdqelnr9pk9sfc4cjzm1ly4r6dl6eikl2pzhhuumxduuwbbxjotirvp3zdriqw87nzcumtckv8b9w48w',
                flowInterfaceName: 'tbynt5vn5my25jky37yi1vh339zax213m2ufu6mortgu3kpkrqtidi5klccwg04sjmfft8tgbkb3sgp0ex5knqe9m9nf1cg7kjz8dfyjthtrc5op7z7tzvmim23b4ow8v6vkd3899p2vh8mug3chdm5z0j2gjnt4',
                flowInterfaceNamespace: 'z6jqs8ykopodlpr9zvc9wj0vbvqzs3obnvf5jlpu4uxn1exajk5yda5ha79r2qj9r08b7aql15r0facz30u6cejtbftjpc20qg7cq53gq5zbccbklh91tqxessa32trhnwipzzxh30wfbpk3ppxyetmv567ah7fw',
                status: 'ERROR',
                refMessageId: '7f5dymczokgrcqthdekl86b5bdjkybnqowrututfgyzfmakqn9nj84d1hwu33m96ad9gwd9l5tgeuxgvrgzkaj2wcls9oxyou85wcv4cbty94a6s1exmzb356a4ju8gtb2puwuq6v931aa9c5cepgb0e64qaws5k',
                detail: 'Possimus in et assumenda veniam officiis sit necessitatibus eum qui. Sit quas ut mollitia eaque velit. Consequuntur qui et quo earum odio corporis sit recusandae ut. Dolores eius iure quisquam accusamus amet sunt. Quia sunt voluptatem vitae sed minus sed itaque molestiae ipsam. Quisquam ullam tempora reiciendis quia quis.',
                example: 'm9y0ikoojza8omh4dhb9ywqjwloy7uk3riqxh2fyp8au8k47md30al7amwvfl36shsobs1icizgvvl3147saz0uom7p0436r68ztfv93waqm20ckteygd1vlpsypjj7c5yvz9x70mln5zdhk008gqfokwcvws050',
                startTimeAt: '2020-10-23 04:28:37',
                direction: 'INBOUND',
                errorCategory: 'v492mic9wrynwaj0iqhxzejy8kv6e7sd4wvx83p9xxcoe3uktuv13m3pshi0g8jg7k0xibd9umehs6ofszlndp1nd6nmh1dpqsvtcgbhbffs0rd2pj1w6hfs1sc0vubexn37vw3jnjhzzxa5b6fi4y6s6y7aisye',
                errorCode: 'jkmhltvc4c1xxpsjd6r2sbve5fznwx7vhiva9m28ihc0qnec9p',
                errorLabel: 443202,
                node: -9,
                protocol: 'y3u5vzqc449hccph576n',
                qualityOfService: 'dlabduszuypt0il73d63',
                receiverParty: 'co35mx2kws4wd8rhfaywgskcsr4opx9ndn32uqubu27576iuvwlj2waaryt1sawgzewdqd5fa50axys67pqy872o34yldpi8zi1r1o2n5juv8sz7mkxw27rxutu36b8pnls2wumkmk6p1ely3mnrbb0y58xxc9jp',
                receiverComponent: 'hl6a7lrrl5w9j5h5cae9uu5q986o4ecm1gxgyba79mz7zlqfnfyfhc82tj80z5w3f3hxyqck7p5oru0jene00ubktbjqf4ubji8takamszt4mt3rnqpxsjrgt9pwge06uj4uvblcmwmle4pwgmt6z18pt9f3ug51',
                receiverInterface: '5gdka1af4faxegk47p55lkwk6x1z5zot34hik54qzzhmcvtklmjx49rc6v2vg8c5u6hj7h1sd1mwfdmq57wcr9vvq9fpjh12s0wuz8esx7r2ik66r6myqhtdav56bgeimxtwsz6k7umpw38hklxuysmhq396ljhe',
                receiverInterfaceNamespace: 'hhidmamo7obefury9d2935h6epv7eigxapc0ml1f82tby51c9jqhpgwfls1xieq8uvknchyrsx967tikrulw62l9iu7umclfrcdtu4qdkosmgylevrzx2xaq26urzp9uhjh5lp4vo7r1c09cq0ictf5fxbajbmej',
                retries: 8576321242,
                size: 9636957929,
                timesFailed: 6756455606,
                numberMax: 4868150111,
                numberDays: 5554346165,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ua6xbv7uktnxxj2axz7q3na6e783rwu25mkq1y4blc9aknrp18',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'wnpkxlidpdh4ag4b6hft',
                scenario: '9cjuros1s9odtnsfd1hzytjty3ame87bzcjucu7fcb4ij2vl7wbh0vqn6psw',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 04:01:17',
                executionMonitoringStartAt: '2020-10-23 06:23:07',
                executionMonitoringEndAt: '2020-10-22 23:16:46',
                flowHash: 'qy14kt8asio248pymt4jqlf6qf9v1y2rtmrsojxw',
                flowParty: 'kdhk64seno37pgsxcniy2p87utuq1m8224oqym57h7shqz0vx8x0r9knapbdcqrgqise44sku0ax7dh88q58whgaxac9wk81x92eip7wknrqcgljedzlc20x8gg7zyyi1hb60v1xombvnpuwoolbt3v4hllud41r',
                flowReceiverParty: '4h50q820ph1m7ify1yq4l6dwwgappbp49kmokrx0unj17ng12nsbwg0rk4nj0pafdxrx5cgvuw95uhhz969avimni32vlu14dgabr3ca2bypvdseocg77ry9g2c1yjdn1k16yyxcqd9jvohcisdsh5k45g226ox0',
                flowComponent: 'wso002ddantb84uloe5yyjv5mlio33md39oebghhtpuw0nl3yz90ifd7oujxevvr1xau6igu1t1dspyjcww17gwcbjadhzsmeed24yro08xmgp2y6cj2c25xtzb7bdzpa7f7yemfakz2aluejp4lmhnz70q8215n',
                flowReceiverComponent: 'rjaf75c9x66n1oasrghfy0su7113wx2103mi7ygostclpak6d4rhtnk6pa80i7z9dvdm8jutx2irba6nltojnr02hc303w5j5hlv07asbn2feb9xm3w0lunpsgu8rtqx5bf7hydgfxnskasq6b0cta5smld76bmx',
                flowInterfaceName: 'wwh91u8f3xafm576duqq9szt5rdmim7w6idh1sgys3kfnfc4u5zi2ackytrb3ct4ryh8c3gysz0xb7s0ouk4piav3zcrt60hc8n9kc72ycqibx5sqdzpeojtqmeibt0oh6aiy6cppzcrzs8difoa73prn2avy284',
                flowInterfaceNamespace: 'lb2897huaxjcwp5apczzohuvkp11sw3e9ka2w146kk3pet7dc4l92ut0wpz36m94tpdsjiejhx9ks6411yt4r4bjbnydi6xggsg76kf6jhgrjzsejhdiegiynmcuqi6k52j5gcnqckkwp1j621e9fiqwxc5xtn6z',
                status: 'TO_BE_DELIVERED',
                refMessageId: '5bra3hpnfbm5a2y82yrd66axcz5bkya9rw40eoh1t1plla1h24ucl8lw24u02hbaslm5mcgjbvbbmo59i02wq66bmewie85f17x0phu46sttih2jds5xxrbouwg69s8z3lqcv9nnp1vcaee63dqxrkmibjbxa0ym',
                detail: 'Omnis eligendi modi animi atque. Provident illo unde praesentium rerum omnis explicabo et. Voluptatem nihil quasi mollitia eum dolorum vel ut et. Nobis tenetur rem voluptatem sit rerum at reiciendis possimus.',
                example: '3w3d3xxc9cvbh3nou1epzspy7va0ti8fkwq0nijolnigzi5k2xt1xyid2pwq3gul7tuk1rl5lpe1piynjl6trkt7mg4ackaokrx7kgg31v6ykp33ehvt03o2p86eddoewnakfti52sv9pyjg62p6ffxm1o9uqla9',
                startTimeAt: '2020-10-22 12:31:32',
                direction: 'OUTBOUND',
                errorCategory: 'fel5cutwprw2e1aztydqh3z8xmq8hhhkjkyo7072ipymp6kihsxuzhu03e102dzztn4lx4ilb2br4ql3pkqo3qr001zqsqv8p0ocloiwnf8yrl5i8bqr3jpjthnfg32bmyqmlwlgiazgfknvqk9x770hk8jhhlzp',
                errorCode: 'xzisjy5bmetgnsr51wymftz77zmej6ps7n9zkbz1fktjwg58ic',
                errorLabel: 412336,
                node: 7723410737,
                protocol: 'l2p6dnz57nv6m1hmvzd0',
                qualityOfService: 's22fipgp851yxhm1s5cl',
                receiverParty: '98drv81ja32swi8tsmuezr8napdqlnfrzupnhrj3fbkahhhusjjrlp28d3g6hqdkkmi92kq16xk9k21k38a6a5kv15owji505s9ggxln3wfdu8abqwuyzpzap55rb1vfcecfxjxzu5e9nk1035bgnijp8r85jmmy',
                receiverComponent: 'x5mxnau2y6oyeo3z9yqqnhwsgt2fumknhnhejgb8op7cf55yu2wkc3p26g3caal2jxe3nuzau9d51eys3iiykmwtip0hfg82g120nldxmpo7wly0weupw8izgeungtkx5kzks6euzog6j52ppifmtn0pvt6h3d8p',
                receiverInterface: '2rxvpv7p6w1ljkl9webtumvbw1jzqp4ikfv29dkiay11q584j9iv7ex2tii58wzr2se85828wmky5uhozwmw2cgrwefmzpog9mhxrtofb1528564zsvciiveiap40uoledmhh35srvikc29yy5cfvczawuj0ksoa',
                receiverInterfaceNamespace: '7f8c4ymolkzigsmv6m6ybbax0watpnjueao077yfn7il018r563oframt7x5ept40o5e4da7lmhx067b0s3bdj2duo7hs0w1y440tyrdsm7g0v3x9044399v1qsdkcdlv8aeni8uag5i6323sqj9dse9v93h0fe3',
                retries: -9,
                size: 9490292404,
                timesFailed: 6914773953,
                numberMax: 8792735057,
                numberDays: 4987634798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ssgsi9iqcmp9ki5c3k8koaen08uaoyipcp40c9raouwu8j2jts',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '9z0ua8d77kfi7ajhmz06',
                scenario: 'ezcknfxa9zf5k8ohmh88tnbo1toon62d65wjthngarqlyexvbqphovqkaly6',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 08:05:20',
                executionMonitoringStartAt: '2020-10-22 23:14:46',
                executionMonitoringEndAt: '2020-10-22 14:58:04',
                flowHash: 'x6f8ostszqgxx6qdj455o60r22s4x65j6q3i8qud',
                flowParty: '5vzxg41jzvq2b2odn6cno7wvv54z8wzy5qiz4rk5az54y6xxm847nhnl7mzqnxtoxbarlwng4yjzrdtt7ekbw7zey06cl3acnzauptdwg35f4bfxjyrercktkr6qfte1idr2u3d0455zso1zxdat0hn62q932fks',
                flowReceiverParty: 'wtxd9z368yngxv6pa3w1vome8zjvlii96e1r1knouc05q72xnc268yr3isi5mjpz5ndihkwn76t0wyig1txj6mynpqbs2b6fn9ph7bh4qy2qpy6u1hgzb4wns278jidhfpkta9yk56ux8d7di3qcx0wj1nwtkr98',
                flowComponent: 'qlbsv5z1rp3rflmbc98k2ms5avghyygaoco28homdk9sjvyt0sfi2pmyr1ul9418jz79dpmws4bn4co21xf0k24go0le0jml2fnow5lwsfpgqcmc2t8snhiyi9aygkgxbamz88b5wf6wumy7mm9px4dff3xsmtg7',
                flowReceiverComponent: '4rzdlyslq512tgh1b4v6k4zj361qrm2f0dye1yut26nx46bwwpiqwlsflndb249r133jrivd1i28sebat1pk7ec6ct80u9iuyw996h8rrf3xre87a3fbc4qsd9em1adi9j7jt5yha2jihk3qmm36tw975o3cf0go',
                flowInterfaceName: '98twzul0p2df3qkjnhes6t9phe5ayi1fx8suisudjz8965fo7sedqivliv2zrviaw4c89lrhxsfg31a76bfj8gwyww1632fdmo9lededgukkfmmztgig6syu1vh8i6oolsfzqpmwukfdz4yr0xivu4amxwtt8fe3',
                flowInterfaceNamespace: '6l9w9ctn3m5bju0tpubhvk906pwsr9kn59akyeypukg8bxfnrbnwg7uri6gh7jy9e9mgirk5fww5bqkxy4vsffa7uhgdzhmzf9bizsuixbamw5f4rqjphsw0mg6dz0i8m6xqr8jn7edo6corsxdym7223q0jy0ih',
                status: 'WAITING',
                refMessageId: 'z89yymyvclw46p37rrcx11ufin5ykg86iptf0jn0tygf2rrgjts18lsmn9kq1j07202w3cszuwqv08wkpc6euz99oxnchcls4mhccx1mbn66f9bdvcjx5dvtlghjgs9uvj032p128qdme7zij2fhfb26sg6y8b43',
                detail: 'Doloribus fuga autem illum aut vel non. Corporis dolorum neque et eveniet enim quia. Sunt possimus nisi dicta provident facere. Voluptatem pariatur similique tempora praesentium dolorum vero. Sed enim dolorem alias. Est perspiciatis delectus accusamus.',
                example: 'd7cna2qkcwqgn2d39cppfcdkb0mdaii3n9dufvommbmzsd1743gk3dbl0st94uasni7q8hfkvfrljtl1v33fuplbwc86zmgcs2uf9l72uzdr3zss1uzu8w0o629nn5d5xp5fwcu2lr8svx74q3xy71qxg47j18i1',
                startTimeAt: '2020-10-23 04:07:10',
                direction: 'OUTBOUND',
                errorCategory: 'nsnhbxd75sk8jrjpx8rx6frlwjg01ae3j9odsnj1buavf2edcn2pptsjjsagn4ts8965jcxhhgxtnjkacxm4xnfdykgq7c9t716pv2sg8lm25qdai3x8rlewefadecozv9wyzosrzihg3f8jvaw4ulpv15i7m6jv',
                errorCode: 'vhrpspswe1b2ko75hz7xtujbqqtj314vizs6m1j4xebspf7wqq',
                errorLabel: 806349,
                node: 6750162134,
                protocol: 'o7bzwza8vvf43k9jkwan',
                qualityOfService: 'amh25wuql85zc4oqdad7',
                receiverParty: 'gyryf0ome8okwcuog9jh42ojet21d85f4aeazog5mqn5zaxh9mwgo9zgf8llk5az33o5u0bq1tdm3v6pi9jh48l04o6nps44iqalx79cm8oso6y00j8qsdh8vjwmjmac0mbm9o7kugvjzuciax4x9d4niwy4j12r',
                receiverComponent: 'choich0iz0a0uj3rf29q6m2ubv7cke4bv6yhrxgz4jh7ps44qopsfz70ldbn8ad8vel1cifutc7p6n5wkl67m9ma7us26k8r0yd8ka4qs840rwywiq7elo6u64p9l40vpsuyogepf1zi310qbmr8b2pyc96277l2',
                receiverInterface: 'a4rwk104uhe29vy9otwo0k84gepaynw37g2txvpjje13h3vt521p755cehojl6p1y8jklwr15fgs7nby850kod58mua0bxa643ukx1nviy3ir75asp81ylaak88ug0a84l505q6nrr3yi7ul5m9rlyxby27q3y51',
                receiverInterfaceNamespace: 'u1p1rezyjeq0g3vlr1gghv1bojj98zbtzbydu2dkq8mvk4xwa1wgmlh6jxnbka1ylctuxrb8owv406f2ujtnzlp4mf9ghaht72jx635mrrpt3epk3g6buc4kxol0lyy1hsq4evz2tk1n4ted7uzijtjwjw7bgm2m',
                retries: 2113558185,
                size: -9,
                timesFailed: 7623069287,
                numberMax: 6963914318,
                numberDays: 7098142444,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '9d4kkl6cczf2nzh4u0h3skpc6hizdhekywe9fjypqx5tqu1jhh',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'qm9lytbj2srfarid9dqm',
                scenario: 'h2urc271r75w3qsbbay0c2k17hyguktqc5uf55sqja1rfhsljsa3pd56re16',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 12:59:33',
                executionMonitoringStartAt: '2020-10-22 13:11:31',
                executionMonitoringEndAt: '2020-10-22 22:17:37',
                flowHash: 'cla3jceeyep2cjpv0c0m49gdk1edfr9aqs0tt7en',
                flowParty: 'vjsauez1ly5wtfafiz2454n27fr4as11znu6ydrjbocnyfv1pmf1z13hcx9v8r81obikw2x4pummrvoq117lpdw2sy1iduwjyg23l7apwq7chpxkrm0xppfsa6536ewniiibixbo7j7lc0zjcs2c28vb0pn3s7sq',
                flowReceiverParty: 'wi1lc1m9y30ti6rrjwimm7ztltnesgnwuzgqfcy4jry8iyenu4vxwq0yqo06jb98cjox37muvitnkg9nu9ewqhyychibfo2h54r1ih0h3p9tefuwc9k09aw9v43puxf7rtu8eosapbf9xyrqjf1ed38y344godae',
                flowComponent: 'y0jn9a2wkszksv1ly2xdv6yyv2ygpq89s0oit3g1ledeyyatcj367c8vpi7gyrh5obuejdyigra099jdnzvjvhg65hb8lel30iicvr689rx2it7vwher5jr1iubc49wk7wwpjlltdnof9rv7ih6o8mc5eipioi06',
                flowReceiverComponent: '9t2hm2wieuaox7c5em28qcc9ntvwz3w7kud60xvbolzjsvblrkthi6yuy5l1zo2d7ezkkdubhwuv04m03ezgng06pg7enr7t13zq04fi3kh0r9ho4zxlgu0qimj9rq4bkltsttjrib6pugh3vwcjem3zhioddkft',
                flowInterfaceName: 'xz0rg774fg60c7b53lvzvjoe7kd6qqs317cttpj9v9fb74fj50whox73ah7ve6x8wgn9t8hjmc5fm5vm9pgnczpmu5n23omdmzruxj97t32pow4y8w50i3iaw9cgup1wybezxq7ooie46pdv8wxomboyjex9hw5v',
                flowInterfaceNamespace: '6c4uyvhq0qe9tbbza1suyyz702s76gatpesgawiev37qursq4ok04ckywew79vezpn2yeaibj4z2q06o4hsw62za1jlfv63h2sicw53rwh8bpv9d76nrfs0srumlu5nmk8w1cvd1s1n6g9jiydivtqrx25sax83u',
                status: 'SUCCESS',
                refMessageId: 'e10g5zz73zrysm7qv0t5amt1cacerskefpccv33irmbiierkniu1x9wntmwz5qebm4p07xp1esp05lhkgq36y8y1h4bjcxyxqfbjlko2qxa4r13jm7slvo8vgagplahhmz259bl38e1ejubk9g6539z2df13tisq',
                detail: 'Modi quia ducimus velit eum ut eligendi est omnis tenetur. Error commodi accusamus sit. Mollitia cum hic. Blanditiis iste quibusdam qui dolorem autem voluptas. Quia et totam aut ab deserunt sit sed. Ipsa quasi eum.',
                example: 'j7tq3ul0rarudheai6ibhxyf8wr5tazn65avsd933wsv8or65357k2c3kvjviyxthv3frwzmnzh4dhpgmlr1mh359hd66vkeyhr9km8blrv5zomotwcpcm16huah7y1cst0jadaqm8nnwxh2105ycrhlhcvalaev',
                startTimeAt: '2020-10-23 02:21:05',
                direction: 'INBOUND',
                errorCategory: 'ov1brs7qfepip9a32fv9ds4rrjccx2undh39pxrf73a842urnaebbm48sa7hp83z7md7twc2sum47i01jxrfrpx7rqg978drnkcwyv1kivq21t9z7wdemg7ksxq2wacp4zk1cb2ontw81v61eqlhtv44th04qfos',
                errorCode: 'he8lmkytz7b806nw5uvsra9ywxjnfawer437769xmnm79pt6lj',
                errorLabel: 582299,
                node: 4164800133,
                protocol: 'y12zvcmoujq9835s2kt5',
                qualityOfService: '8uk39x11nr3urwqcnr8h',
                receiverParty: 'pw2kkz7l6oljbk402gxo096w5g2we7m90rb107v4sx4p1e93akiv19wme7b60ujxt5pbrhqav8pm3yaiud5gj0s98dsaofysu2i885ozfbjjes6x5mw2ahmc6fycoe6gzfyp6tqkgosbwre8l79cqupf6nbf3ypx',
                receiverComponent: '34g5apse513mp9sne7v6c3j46ba46upoi0e8wwxhoxb9weiu72z28lm1iab8yvbju75g48iymbpg5w2648z8s0fj01xilh7gt40pbryx3xupen1a0jhg78qtlx7sruaa5zvqjbbm9mysif1165dk46o22lri7jm5',
                receiverInterface: '75ue47q2s5bdxdl4f5fo2kme9rlyljzkiityij6t3vj7pujxrfmmi0deyrmvuaiyrj0edjr6ndl0u4p3pyoiqfg1fjgkvfg8lsbr8jmrkcbt49qwnrejizo75w2tshr5ku8gka6kiofi0p74not1t5rg4sor657a',
                receiverInterfaceNamespace: 'lwacqt1byg0sshkfnrzpx6vz1irh2qrm88fxatwe7wxubvl8tqm7ayuo5n1ksxqxj8w3d20c7qj57r83xagej8gtureiw9mczd13ylf0mhqv7tjtf9r0xxa4myr1q1hjghhfnoul25piavkvoese8x9da3gwnlmp',
                retries: 9950459791,
                size: 3182544163,
                timesFailed: -9,
                numberMax: 1455478571,
                numberDays: 3807123232,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'e874cj4l2op45m29rc20oznwbbxcy9qaeerfnh0fbw5go16bl2',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'z64iqzta8ka8pgy2y1l3',
                scenario: 'jru5esd70uc9r6863au66v4a1ideuttu50gqrzrcqh15bxkhyte22jsw6ogu',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 08:14:04',
                executionMonitoringStartAt: '2020-10-22 19:18:11',
                executionMonitoringEndAt: '2020-10-23 07:27:02',
                flowHash: '687k7o9wcp5110ql9xfe99sgktm69ts1rdiexgoo',
                flowParty: 'fw33xg3yfttkkczshcyhratroj6rk09lqzu1qii05p0979vwhjks4ek0e1yhvk8oduixic0fj93wipgxytdzlsh6uznw0temic00qxarhcii2lrpbg4fz8dos5ruvb0npcptdg1wulp082aenzhrybk52s37p1et',
                flowReceiverParty: 'bxuukw5n3ppr8dtm8dcyyde0nnhy7waoo0ukod5oed0ig8nzrbk4a4uxcrg8x595757wl213n4amvu9k7xpgajytb62iocfq848unjp6xekrn54rg1oy6zjwrrym7zzsoq1u6es5gj6jf4x17v7ad50exahokcra',
                flowComponent: '0yfgwqni5lo0ap2dt7bs9li2coswama2kzolev2ltqfmg9yo7h0bq36hq4296e88i2yk31n7ix4sf5ycwzxixj88nbmnwwj0gramq79z3c1fpxwlzd3m95lykd5j3w8kq35riep9nv01li3zmac9gwalswocnyxv',
                flowReceiverComponent: 'klh2zb765vh9c565gtg8rb4w0nfnwk3ssi9tdadr1kjksugsa5birkbxxqfanz1rory5a3le083ieefda0ftncukr9t3z8f0ddb431cegpvhwd76lcarfmwuh95r3gqhgxnjf8cf41z11m3395ygsonndu3jhi3v',
                flowInterfaceName: 'd5rb5ymqnggdbg9yfr9ynhahrg6la0o0m7qv1wn88kw20ve2m1dj2tvnzkro6e9uho25x754k9a3otzzeig1sohbh7619xv9pqou6f8ulv1cqil6va01kahj3pifhob920rwd036ndqmsk0j2gdsbo8knqoxqzq4',
                flowInterfaceNamespace: '8c253p1bbrj6zwcgb7o5af6kumks3os1em9cgi4xpjtd6bs7n097rrctyqorsi6a8o1e90rgwmjupx7k3gakz1y9tq1x7ocnp2sigbph78uy2tuf93uqzn0o3zluib1i7s0909yhpbq9tjyueb3egj0oki46i4ky',
                status: 'DELIVERING',
                refMessageId: 'bzur5b0y6d5g4elpvuxf6oakdpmhpjv6pw62wycityeho0jltojxm7nmn0g2qnbkq1asq90y85eroab576ltkxpxtbc3cft4ezhtc138fd8ye283m30hvys7zsh6d4hokxd2t9i8gx430x7b75v24vsppf4rvok3',
                detail: 'Voluptates corrupti id illum ipsum voluptatem. Necessitatibus rerum dignissimos ullam cupiditate et magnam sed. Et vel dicta est. Eligendi dolorum error quia deleniti est. Quisquam facilis ea quo.',
                example: '4i99k3nnkl01noqhfat9wgtz7exzzd8br7o7eedibllma5rfhv6x9b3v4pmb53yhf6pko7faerwj307z4i6utgqq8c0o6pa28prahf3mvrrx94lox00zc6eos1di7adcx74pv247d97y83ip36kn8k0rfpqp3pm8',
                startTimeAt: '2020-10-22 21:06:08',
                direction: 'INBOUND',
                errorCategory: 'qgxkos6xy54lvbf11isvkkxdtfstfvjqz30ohpbru5s7bbbcrguundin5u8myu4eqfmqdpht3a5ocu9tkrkhjkva4rmarppvv2f3wj587ja5tuthe3syapsdc8ewye8tum6i8n19hh40xakur7lt8dk75nwz0lic',
                errorCode: '82ml324bzk2qzonal9nexgfj711wrj3ku9kbomh0zw025490h2',
                errorLabel: 342660,
                node: 3064904337,
                protocol: 'c3rtgorbro3jq8hj8uab',
                qualityOfService: 'xq3pv87xzo1dois2pyzc',
                receiverParty: '409kbc0tx9mcx2e29gvyc3uousy018tunklttnlsdpm25p9ky5yw6z40jtkwugeow1w8xrxgxbnylazuxkopmcdazin5ouvn96hjb1ze0ranxg5bk39742ytuy2bqxmllml226zzdkyd6kd5uu45xrti86w850cb',
                receiverComponent: '2sb0qdcw2tao1tf1k58fyh850lhzek9orlc1fm7b25r6zshu622rpla2ezf14ydnohopdyrjyl2vpwhtm9xtoduwzs625tpn7erq5f3az6k2egfgbavcv2yi22f9df7zo3zvl98xsyfhz2yzbhbu6ohvkotb6bfi',
                receiverInterface: 'eqe0lz0m0tjunphtq49am5aul5ll6glowalt4i8wvbt1ckumswa4ue76ojygznde1exddjdupp8nbmmrzx1ic6iljpnlo8daoc50aw6y76x585fj6x0reyysosfof1fmds0xu2jc5q9xrecqpdlkhehgl06vc79m',
                receiverInterfaceNamespace: 'li942dc2jzga9s2js56btqhbh3dg788wsjaf8z6o3x4yf714xvze8mqaj41s04nvxfnah60i5ff3yfkttvdyxhpiyvkiem2v9a1ypfe46w51x9gcj7bldgro473nzjbxl6sj1d3x7qen7w3v359vuw4cmdp4goj7',
                retries: 6568419210,
                size: 3139655631,
                timesFailed: 9789904012,
                numberMax: -9,
                numberDays: 5349935490,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'jjqst75c0lybq1qasb8l5v908mzqazrxcc5znp0il75bo6lzww',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'qjqtpgcpeahkro80oy7l',
                scenario: '9h9pi03q7kkj8xtrdyfvz69wwhhmhez4dr70cbujq6ppj07u519f2s94bwj3',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 07:55:52',
                executionMonitoringStartAt: '2020-10-23 02:58:03',
                executionMonitoringEndAt: '2020-10-22 16:56:09',
                flowHash: '5usgdqvamdajyrejavpc8wg0qtgvh6amu128b9uj',
                flowParty: 'hijv8h9hsbz6d2het8zc3algo24hj7a9q98pabhgylxjmtkcgv3ih0c11mqszrh7hhlo5u956bno98fj3uagt94zd1xn384sqo1tkae8ogqgdfj0eo23t38ap2cg2y6prrfy0ejxpm6e5cdilde7c6dxvrh2gi2d',
                flowReceiverParty: 'pa2q1g38wy8vyvma5hv8128mwf67bx1o5hhg99jzp7vnc52guvh87kv4jyix3dhqnfkzl5xsgd5eb50dt7yo5nurmu8cs2d2iggxx5o4k00uedtmw1ven1u57f8azfftpv6d8l4268cmvse8gu8hfr4x8bhcim7g',
                flowComponent: '1fxu87bvpcy192p4kumfivor2bpl9hzgrrqzl2suua8c79jdxfv8vbh0rwebh2d4vma25cxu9xq97g1846cykphuxu2mw2v0mtndf00unwftw2s91a90uxfciuuqevng0etxvcts9jltekg62j2d9h6jvfe6zllg',
                flowReceiverComponent: 'ayskmxlwj9kcnqeboz84gorvbetvt6tbpsslvtkye0jfy8lnvp02ennfxbptnyug0wkkyud4m7ueongwu9x9t9cdllrkyzvtkhu5zczfv5dyuqbrm07pvuz6n0dnqq510v8fcbpsioppc11iwq0cord0tkhrtlqf',
                flowInterfaceName: '1ulzh5swqnf94poqhhbjbnqryrwnl304zg4s4po72f7dt9offq28a42tu6xmji2ou9twybp18ee5zd65d2t0gvd29ihnphtjkeb1vfdpoml6kekhfzvo2c6amep420gwxwzg281yyxfi4vzwms7xjl5uwrrpngt4',
                flowInterfaceNamespace: 'cj9c8dtnpepy3uo9g3zyd3u17ovnobl2vuubr4r8ew9rwti7n0l0i8h2tzynih5bo4yd4x3pj0fqzqiyj6lpe7nk8qm6dd0yxq2n6d24cevulz6etkaisypnaiialxlba4u3e8kiyu1ofaq808ozkcqqeyvpcjtn',
                status: 'SUCCESS',
                refMessageId: 'rmjwqaq2i5j0pie9yfg00o77fbupr17p4kccjwcdrg1kenimbt7novkceozu8kqlcyplu1o9oliu3goasouvkdbkarhae9pcdngpc78byjear7um56f8y9zoiy8uvnjmwtrhkduoeq1go536v6n147aaeiz8tdpd',
                detail: 'Distinctio voluptatem qui deleniti et numquam dolores. Aut unde sed est numquam omnis. Aliquam et quasi ad a. Eum voluptates veniam ut adipisci quis. Quis quis exercitationem voluptas delectus perferendis vero enim illo. In ut expedita nostrum sapiente eaque nobis atque quis.',
                example: 'vze98q5l207pohqj0c4apkx89zqngzj06u1tp62s1r0h4xtz3337oa1y7ms93zs4o3z9j8rpzl1it6ta3q280005hu6h4lsip183s85ci12ksmwr5c50mxt11ov9z3u3mwb3thv0uh7ospylw854j8mdtl32g0z7',
                startTimeAt: '2020-10-23 00:54:11',
                direction: 'OUTBOUND',
                errorCategory: 'rxpnbcw38fgq1bueokbm3omgwggqbqdfbangdokxsqcw6kho4vxuqn3kgprrknqmrlzuo3pqx8foegg9wpu2s943l99joz9loy8btzcg6ma1imyag69vdoz5y98nqhmtsfhc7989oqtictavjcy0sqyqr1blc186',
                errorCode: 'scg4pxoda0ge276fh9az2lx60bakdbmyxwd5p09kers60k88xi',
                errorLabel: 678569,
                node: 6747700327,
                protocol: '88ad17xp0zjcweoppohv',
                qualityOfService: '2kh424ern1lmbok0jw20',
                receiverParty: 'f8qruoyc4xy9pm7xe7s4qos6c9v6nxabgj3gg8ogdm6x7enf4nx9wsyftsbr79qdw60xaqr4p59au55904lz8b5pfgfkwcrtrnhxd0el0ee9hsx11fietahfuhcuknfnkkjq7dpzm272v6z1rmzbsajcy1sd9rej',
                receiverComponent: 'xddq3jezmjdwcgl98ckgfsnlvsavzn4eg5m6c7lwyyi1a0zg8773324xmgadn4qcb2np1eqjcf5sgo798m1a0y33mov1h57kr9xopcemjhg4sg57sdbs6o98o0uosdt4ei9ivedh3zuy6xcw06qvd05kdylhqbv2',
                receiverInterface: 'xjjja75ssldy57twgith7wafh0m8dsxxcdcv2atqt4mw44t3w5ohpaqvuxize0m33b8i05yl8f61z6rawxlyieisxhgaiagy8d8nw66bqnzoe19py7cmwqmikfiicejkw7j5ggcnyme70y3cbqlap6tw7efmsaha',
                receiverInterfaceNamespace: 'fwxgzk6lxc6p42h8hhd1kiby3rqdyijqkdbnvomaebqpsoy3v7o5h4tm8ry7cnzlo4giw1ucudy1oaye6z6g4h3f640kcltii5jskcsak0dag83xnytbttyqlhi40awshy2mgdp1ee1jiv8s010k5f70ut12uxka',
                retries: 7939196329,
                size: 6603121730,
                timesFailed: 2136000788,
                numberMax: 1707031013,
                numberDays: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'vu2tnrjdx8h19qqr2ihh8gc0b9dj7k0n4eg1d4pif7l419hh4g',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'iuic0itntmbz3z77rgvd',
                scenario: 'p29iil7e2lryitud9mdk1s41q41kbn26prkis8ddrpdf8937vuhy9umsfr91',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'XXXX',
                executionExecutedAt: '2020-10-22 15:27:43',
                executionMonitoringStartAt: '2020-10-23 02:34:51',
                executionMonitoringEndAt: '2020-10-23 02:23:29',
                flowHash: '5a1zisjj4qnjz3kpawpq3jqippfgz0dgwmh1smoe',
                flowParty: 'sysglgxqejlfgbrgb7e081v7be7i8m5quxm9po3vhe3ca12h8380ajuz9dwupfsw13jp4f4w3xlj8er682bnoag7ybyp8c3658lj38ec6p411d4223ytyv61uletkz5zn2opaxlc99lo7t1khn7shww06lxj0ylu',
                flowReceiverParty: 'zwzk35ar5gzdf70tlkt0cyi8v2llulyofcmlt19lfibc4hkh6bvkltlckz7sbsoxtmf73r1k0rc58pokkmx09d54b8wxqd88i2yznmg3ojqsyqdniuae2luf05k9b6b6rsjo122m4j75k2ftz9p6yfeg02gvwo4p',
                flowComponent: 'f149ta28k3cc6tgezd6q1g82vgkq9m0rwpfhspo9p37whw8ls4sugdty9cne82si4wdsf94ihp9e6ut9wkd45vkw355usr4416xp7yemzf5h3zr62nqbltxmcj3i4a02dtfdzk8rgxdgv7im53i45rlf4iveh1my',
                flowReceiverComponent: '8q0pl6n4w9h8hzjrpdndsc9yxnb8j50luqy87kx9stdojj6zkbn3ms3h3dum13qo2my78m9ggmushamuiqir7kbdauwh0cpb2hqwthhro6ntlalpkka2caoj8fw3b9wktnt8ksnvqy5ycacsvsc9w247ffy5at7x',
                flowInterfaceName: '2hserjp71k7o5u9hn28ntizpwq39ikmmiaz5q5033h36rdghst4rxe9vc6vdfur48mwjpe5monudbnuqmtsrmxbxa0iqhqssvpclmn0ga7mdzc7izxfvkyhgc6dl9spvi7izbvh3tr8ryzxwxla8wm4v75hcrlwg',
                flowInterfaceNamespace: 'hm915zhs8hdqm8nzsyopk7kvd0x82waijd9cyrujejgonfdcwyzqy7wzs1kkein28suqi1hmgq1m6sg7v9is43v5dpmppe1z7cy25w8yym0ni48jb6cwe7swu7nqg51bhmbz9uku130bx3dp9jes1mx13fdi034u',
                status: 'WAITING',
                refMessageId: 'kb5fel0wbr4wh08bfsu3u8ybcoxhxnesg5yzjw31nqg6wbucxgjbyfd1g63kdenvidlp05wi4aj6n1nhrelw8tyvr3p71ilnh5kcx5s1lzh35203lxl4n8l0k7jmn3ry2a7izrtg81dig63sx3kt65u5hamvdvzd',
                detail: 'Veritatis alias dolore voluptatem dolor autem qui dolorum. Facere et voluptas et voluptate molestiae esse. Aperiam ex sed. Sunt ut et.',
                example: 'm3ncokyhm3tnxa9anit0fcwbpm7f7ma4jtm1hemow40n1s54hxewa31opbrp103vf1wc2jafjmjmr0qq20j57liwy7bi5pdnagrkqu13c7daagk4g98bsgwja06ec7rwzfdozgb4guj6s2t7yuei5y1679663sf7',
                startTimeAt: '2020-10-23 03:19:22',
                direction: 'OUTBOUND',
                errorCategory: 'dldphs97gcf1bsw0wuu2w1l3mfn2p60h2pjzg0qspzc4s7gtvn9k634airowevv4752tk4zdjex91qffhzhf2xlbxreq56abou2v35yontd7v1b5xmdcbye05uh0rdojfdexrhigmmct09vx33sz9hnx1dh1zbs9',
                errorCode: 'yzc8lj7mi6bg80d9qbo4bx4vjaf9sl516xlgyyy21lbb7yfpae',
                errorLabel: 132546,
                node: 1611468305,
                protocol: 'zf7dh5njzi9frhw5ehuv',
                qualityOfService: 'mnq45jmced5sjshx93go',
                receiverParty: '0natmf4uhoxk7d193z0ynvydwc7lnb15tf43my2f10f9oo8r4oxiduszt9z40psplz4uerfd0cspvn4tt38mdmhggwnu4mkz5ynyxaeqwuzv6cjrgariqrps6vderyqk6lj3ohrlmb5684eqilde62x83yob250y',
                receiverComponent: 'co7bozuh6rwu3veyyrpwapymvnvqzo0bkr2c6rj6h686x0o12pz600un5ccr5tl4y353tzpc410hfexfzi8cecckx8lwf7vu6ag89jco759c2i8rpwm1sssp3vto72wvzjti6tsqp3i1bhy41cwf9w6sq5k5xo6y',
                receiverInterface: '9zauivj9p6nliy9d3zqgmd95hfeidcqmcpw018nbbfhz763l12plr4mwlciuicqv479d77s1n76aprx0847c4ptky5pav4rt69o7gk9u432ydddx7bk0mvqpsj5wm4zbyrqnj3l105s54np5fbe5bb8jkkzx6yp3',
                receiverInterfaceNamespace: 'q6qmjg6sou4evl0jkd18sk1lf7dl1tvkzbwoegx0kfj38x1pjpnuxw75e6x9l29kt519rzizzv8tn7isfe72cehn5h5jwcqfv5hdducty8l5rmtr1vi47m7xowgn3fdqjf425ahhd90w4mmchv52t2tgdfh21uf7',
                retries: 6931516076,
                size: 5052797212,
                timesFailed: 8923347599,
                numberMax: 1354451340,
                numberDays: 9118515667,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ti7ftearunxhadtzlhz2ha4pe1nxmclsqgzz9bj0et5cu4hkl6',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'i0z6mj2f9ziccfvjxhw1',
                scenario: 'swgf8is8eh61ruzk6xrwbppvnbkge6k99qx6utp72hsp1ay0kuhceqr1ekwk',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 17:44:10',
                executionMonitoringStartAt: '2020-10-22 19:22:49',
                executionMonitoringEndAt: '2020-10-23 05:06:21',
                flowHash: 'qrisc9g682a0j5gz9wkjiwmu4lpxaetq9fxi7c4h',
                flowParty: 'lu8us0ys4c9y9zs99vey792ikrdhucucljgqe1p2ug01rawx5atdq6xo53dr8g48vjuvsaujl9oikf5z6ag5x8i74rztixnfb2fb1titxcwy6jfge506dwuaooa5ju5nukji64ubjabodj2119us9b5wyyijbtoa',
                flowReceiverParty: 'y0evexby785x6evvs6zf10cgw54u6sr8v56pub3kvwlrclw4cg4ocnmtuq8rnjgad8ao2y6v9rsz4gx4ciuxei9xh1yx9ztqa8pje126fatd5og9j9skmfweuib9qq3ay2ny6nbuaq7j932rlaadij9rhqn91foc',
                flowComponent: 'c0nqzboi6j63xcumwad0yttf19ufb82t7n2lfo8u1xnihtscr46ld4n3sy1ajay7a8g4dd2y9z245afivfjww1l3sjicydaa6pbdfq2xkpiux7gb1lk5s7s4rtsqqef9ousl9bai5rtosw7c88ozyunbfl6eljvi',
                flowReceiverComponent: '1doeln94qeby557rqgice4yl71v7apeuacdhh40n0drxgsuwu5gk1gk9r5iwf6h6tx4d3dwn0kvh7bdieiqct3dvtlu3c6vr19c4iq3plfyjl217f2cb3w2hv92j3y49nl3enwzhzweoy8ljkuywszkj6k0r5o8o',
                flowInterfaceName: 'kq6uwldk7dp40t71cpce8ybo3uqbdw856puz2l1wtgus51zk0hagc1dfxv1ab1c2y1tbofpue8f6d36wzbvpxt3yvc2y4r28gmdz5rtb9ixhm2sa84cp7cozet5oggtyidp599thorujp5ve2445yl10d1sy0nd8',
                flowInterfaceNamespace: 'g2k47wj5kus0s2yokrufuduw4frm2xb9mx00yej4ik9l653ruoedmnvv7q9nxs0pm8cay14mw6aggk28gk1nc9t1vbc9lmsjg60rtqop7hf7p0j7vfyj4r9d808qx6jxy1kcinm96ij370451gitptytbyzob2jg',
                status: 'XXXX',
                refMessageId: '0s4tw2q2g66pv8bqj9fjeom8yraufaw9x1ik050ahbib3cbyr2ovrlq89v1re65xks90ioh8bcfpupc603mwpfiiovvwbebobuut70y241naljxkrnuiktvj9rklsn3dqtvx0o0eyimqhg901j7fdinp3x8nu1k2',
                detail: 'Dicta repellat dolores itaque. Sint tempore odio repellendus blanditiis est sequi. Est sed reiciendis sit natus et fugiat. Incidunt sed quo iusto. Labore veniam autem illo quos voluptatem deserunt. Nam et fuga dolorum et distinctio et eveniet perferendis in.',
                example: 'gzjep24fe9ywope2snn5x54z91gmfap9be5i80ljadv954nf5c3lehtasw5mckjorfbiz3jlqxwai0ooqoc0l3g7hxytahc8ihvev12d4kigqvv76kfxcnx5284zp0a7lu2sfhs4kjd586hn6gu2pnbenspo3jyj',
                startTimeAt: '2020-10-23 03:40:24',
                direction: 'OUTBOUND',
                errorCategory: 'vfiemr541h1zq0c46t3hbvimu2rczzw4ed8iyjmg0kxzbhd78zblnztz5y4tz000oj02f7nlx57drrizahhtsx3i5m8g7bfgpuwjb9b9utcjzadotz9yifsdzypj3dinzpx8bnfgzeitaxc1ht6jbq9c39wawj39',
                errorCode: 'h3indzho4ohkguc1aupv069z3axsxuo6umsec73ncrfjhntotd',
                errorLabel: 117727,
                node: 7560347065,
                protocol: 'g3fkgwvdfdb61yxfcdd3',
                qualityOfService: 'l15mvhzanb8n5ww9kpr7',
                receiverParty: 'i72yv0t1bt7wyg74ty7luykhm306qfbu68ndga53jfc1ohxvrjxwa1rpl7hs8aqcvq6g05xq4k13x9okmk6aj0egu8vqkqs5dp1s6a41ewjzduqsw9a2xaaefxmnx88yg6l7j2g4y7z29l7nyjeuczj25mocrjxy',
                receiverComponent: 'd89er71jsogckvoqzf57vqo8nh4fs4t7h3el6gnus1sk3sf2ukp145z3ehxginpjolg6a7zfe78ly68wjztm3ky5ibkh6cnxikwx3y3yd6829rgbjswopkb44411q6g2rzo5fun1wqdtrm8sxm7zktl4n9kzzwft',
                receiverInterface: '2vwhkrtgd4b5pv5klasq884s4umlpsq3uvtsow1tr1uyoh3z78izzo6ddarbo4aitc2dy8cllluk8qda2l7fuat0vvy3plmp80d2eghdtk1mwporwoso124hoktsmat66yc1tj8hfn03s4cctibcgwgf9xz3p2au',
                receiverInterfaceNamespace: '6n43m5x4b0sc4aph0ohfewr71zpb6o8thcp2qpepo47mjorfjw6mrtwmlsqjelkt1wbx1jaswnavedl2d1ljuc0n02cc7pjn7ih3lqnlrrtpxl5ydsdd3qfmjdko20ziyz69g3gcnf0e5aibqmhjdp05gnqa0imk',
                retries: 9553070271,
                size: 7884303075,
                timesFailed: 1551276829,
                numberMax: 1044742252,
                numberDays: 1558506731,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'phsrjiin56aefpid1guy8rbnpou3son65jpk5uqkhex7ubwylh',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'hjhdtsk62kk3bynin09i',
                scenario: 'hyix0gp7i43xk03jdxs1hj1ukzvw2nktculj9jcvzt4r6kmnoq9pq00dx0hx',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 02:08:41',
                executionMonitoringStartAt: '2020-10-22 20:40:34',
                executionMonitoringEndAt: '2020-10-23 07:35:44',
                flowHash: 'okifmho6w5k4wu5dhcvdwz99rbh5hu3gt6441q07',
                flowParty: 'bkztud1eyfbem2sbu8hf3elgv9walfwz5p0s99vs7kt9ulsilrkbj04f4209trtoifyjzls9h0jhr6eaucyjhum0dqi3galthwkfdp4m6tvmt10qtsfv8y4ejuyayq6hl4nbnhin7cx3yjw2aa56qdckndz862ls',
                flowReceiverParty: 'nqepxe0f0xyhkuevbw5w4mg78whu8ol7e0hmmznnhmzscwkjv9hfo28e4viluvucp7b8pcd0bff802hvuf2m7ifq0nrf27001msr15anhztxlm9t9opz25ld8rvvg045n6abmeq2knlw4zyxxvrp1r2japbwu4zb',
                flowComponent: 'ce0o90tn8t9hazjflhdic0kiza74ey3hisek2zmce40sqkw5ns017kp03ord7fid2yq1p702hh6tsu8odaao4pk8glwujt90s3vpd8faylxsp7uxmavrchf78q9tdgp9dw55wlhsq3hute8dgpiw5kfqz1892blb',
                flowReceiverComponent: 'guhj4lebtw2kur0wxx8p8wg8lcwqednomwvkh6n9f6z832jajwih253e31cksjg8m7soiqr3787m9p125393yhklty5xply56vfo3ib2f9hrqimy3tthb8ucxij4zhc0efqot0dd3u9icaxaqbdiwwu97nunamle',
                flowInterfaceName: 'hoh7pv1yltj7pv5ict95mqw544fpcvj2wx26u1sw2axdeyp3p7af6d4b27tta9oqjcgzu90jctsjw55rvcs8nkp2d4jrekwy5vzzj9m55s115qhpdufbua2j8f08skwdiudselse6azhvl8wbv76yf54bbk9zkmn',
                flowInterfaceNamespace: 'k35kaoybtxe6ysze3bznidk31t52t18ts9k7rixhbsje7y0ftx5n5u6hl5xv0p9x0wr0aq59cs6u72djvgzum64ghzwtlu13fs35v7o6tj0a8kytpzyfrq8eu67kbsp9j4cqcxi3dpbvg9tgcl0iyvd1ztk4sbta',
                status: 'WAITING',
                refMessageId: 'gpf5nwre0egbm67d649ba3kax76ovaiguw2aoilbs89z91bv6eey85cribm7li05ypm6eqqrtsvu5jqcy4wophexh85n1z0t0voe15u145fwgvfq0nxoqkuihpdy4xth4vbgwrlo7w75hphzvzi14fmoqsltuwxa',
                detail: 'Sunt aspernatur iusto et non sit fuga non quia sit. Alias neque nam natus illo et quis officia. Qui rem dolorem cumque voluptatum eum.',
                example: 'r4tqh0dvz7w42vb3s66pg6y2pfqjg2qh2ui2w7ibqzmdm3nnqhy5zeeid0o1dngob7s2eqbfz75ke9jfu9zou8igjsf4x3kf3orbrz85knasjm8jtzltcmhjhs6urzu08lx01nb1ia4fkv96vkmbktzfl8k18tct',
                startTimeAt: '2020-10-23 03:00:32',
                direction: 'XXXX',
                errorCategory: 'er8l9verdujmtojmqqf9o0fpl0iom6jo6q73e1z1cnx8q6t2fbhj21c2mcqpstywawvem89vnah0vyh0msgnz3bp6bjiwhorvxpa16nxqsf03vwmidzx29eycb1ud67tc8lmh62ozhbb9fct2js5y7xmqv9937rd',
                errorCode: '2ndggkfnsqknwppkahujj37e4awe0nv3ytqos0knxnwo2xwl51',
                errorLabel: 694966,
                node: 2047482508,
                protocol: 'yh8c65m8hcn5hwy1erlu',
                qualityOfService: 'qvaos4p7yiztf5kl6xwr',
                receiverParty: '5oy2k87becyc2p7fce0a3iimy1sdlj7q4jxnixi3z7vju28k5coge99h7jtjeytpypdp32ch8u729ja9sm5ii6fh14pfazwn69cbuyaq3prb3doohvrd0uxtagb8smgbg1qrp3hljb8vgputnypmwpshtze167um',
                receiverComponent: '7h9bt1vo56hhws8fzm3dlwuvku00jel0g7ye4n5cfb90yctdq8a5eflww2ox45gefyvgnc2aq14ek0nyedd2cxhdlmcunr8ymafobdwlcya93iep0okzc2bq76d226yeo2h27gdox8ltgxunprym97bng908idv6',
                receiverInterface: 'mqfdhj3yw2hha1bwcxlpx1ke0vnoxix7oxzs1uxw3t8o9s5hdhghtmgz2hdxd6xounyk7peqdguck7ery8c11xg01sdxndgtimpu6vknomtnr4lqd4ugada0lluiiehwsm5ddydwq2u5010sf982c9idgpav0q7m',
                receiverInterfaceNamespace: 'memyizu31li4dpiy5876lp8a5d6vs1j1vbfwbq9adx5tg2xhzh3b2kydegzk8t3jc9ycnexlwivkxotdoq4fl1la09bpb277pkk8w35il0lnkpn9p5tjj2qnwb4beuk632nfgrqfgxonpch1dehokoeu2ou1bu75',
                retries: 2721191244,
                size: 5880504239,
                timesFailed: 5897922007,
                numberMax: 9728773925,
                numberDays: 3852936053,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'kvx4o1g2w524xxw3dih5qldz5h6ot348xgbljdwy04xoy9qtbv',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'm12mk6kjssxin119k5gu',
                scenario: 'ngws8kzdncecs5rqvsa7czjow7zz516gknke6hajm5cch8w8zav2cx8e196f',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-10-22 14:42:44',
                executionMonitoringEndAt: '2020-10-22 17:58:24',
                flowHash: 'prhlykv9gta6nesg2d9a2houbok4aaozq3rekx1b',
                flowParty: 'n0psvczat6zerdbysm2g2xbauchwmmf7q6m36m9oodlivplcnjvy4ozl3nq94mijmm4iue3frte6qqmtym7ahf8ur96mrcqlob0064mbdr1atj7qwg46rb535h013vm93ru6yu6hf0fhocq2cvq47o111xc3evbu',
                flowReceiverParty: 'nxqwijrbxmlm7muq0e2fvcoumdk67a97r3p4o36dxeysyf7ezlp6p7bkv0z061yt0e46hfmrio3cntn1nfgkl1d0uo36lt1t0grez7287d3grxg00vf5nsra2c5qafxzgv31ydepynlix4dobanc3vitn5vnajne',
                flowComponent: 'olzz9a06u15rkv3r9w6aurkw2quw0m9dn9ska06cs4sq9wjs4kipc7lzn2fd3dar5mcqtsbt45lv6jyz8r3l6xhxj6bnbwetrs5bwljnb2kvwe11rcajjh9ig924pjuoqjjsvoky02eg3vsodwwnophqheui2oq8',
                flowReceiverComponent: 'zi76jvbvxmc0jyvdfm9g7mz4jomksgto959vj46gzs7pm6dt1hg8fjk89cvqmgkbov9x659u55lqsnkcu7i3t3kkznxkjtvlv4spw7d2bv11xd64po86lm1xngu8jlpflg42igztlk63p0p1jv99i5j1du8i4ikb',
                flowInterfaceName: 'upztnbo82i53wwjv000o5gvylbl3h6vagmxk9uzrg0fhjokftrfchns5wjqlzoyf48f1mhqviztiwdvdmh0kloldofp0rln34fyw1svy187c8cmdqv2wwptz82kpcjrss4ribxvonr2ezxip7gpppt2k1gwzzl4t',
                flowInterfaceNamespace: 'jba4wla8fvy6mq8c9vzxkfj01xjnpquzxcqae1igah6wrxn2hj4i5losw0p3rphfhw1hpjsjn4ikv0gd0lvvv4hgk0ch5s67cekb1onnq19jwx0s6w0p7pueys1gf0d321b4iyvbjpnldkm9d67hn3vc0yv1a7vc',
                status: 'WAITING',
                refMessageId: 'be6nr4dnq5ltoycc3episz5ao03uwqxy4z7016b9c9fap7rejqtqtpvby9gzdsimc5gvr7r04t6g6ikkso11fm22mkfo5iuwxpu2k3j41bny8pij614zuzb86aqfrs97bmocmnnfqupp2jl69jyqc28awd4kq1hm',
                detail: 'Voluptas accusantium sed sit voluptatibus non voluptatum accusamus. Ut sit voluptatem mollitia sit facere. Qui esse ipsum qui.',
                example: 'wj03b6dd0bf0l202f666hl58e44xp6vg33tts1zj6p6b01zn4zucrq006rylo82pyfeyi9cf64tv75wlqrseeufov96qh592eo5wd6sl197n8dlqgqfuylihm39m5j8u1qakt2d0ji7402i08681t2h1yz2rm5je',
                startTimeAt: '2020-10-22 20:50:12',
                direction: 'INBOUND',
                errorCategory: 'uwu6b885t4deek85xoonkjtjfglxv4njdgnqxd78xzww0mf0x7pqeod3kkhpq918ldml5k5odtr0b5rbppo1h8kkl7c4ubjphzlo0t50qogvp4jifkp3kh9cjw5qlteuy19lblxf8nltavd447ggyt15lzk6zrr0',
                errorCode: '0c6ghe2uv6zr5uwq6ufyfht7le01u1sh5povtw7xvpe7bzet6o',
                errorLabel: 489696,
                node: 7971454152,
                protocol: 'poenqlndbnzjhfdoeg7x',
                qualityOfService: 'lnck9z7l9y1u29sm914m',
                receiverParty: 'dajm0pf8gjy0szwv1r4stp3hr2ona30q8xnphp0jpfb8uuxysqncdpzw86cgs28qj2fe1jcitxnu14sgpsmd1r1cz4vmz6xsgj0qfykdodxawgcw3qrndouoj4uekwnu5481v2c4rbiupq129caiygwmaftabuxl',
                receiverComponent: 'e46oqhso5w5jq2s6dfbxz6m1nypfxu4mf3ycg48law24qiu57rqkj568svkh611cgfdumtk9kms002oqmynoe879f0a2kj6sdsjqil6mbm4hs6fk7j4dy3whdsbfxocad0oitnx60477ss8zt3wwbv5lugv69mrb',
                receiverInterface: 'tcvkqr90w98aihodpx3kcxrnkounbn8xhjxh66t42y7vk500bo6mj7f3q8ylje69jo94irnou14sxscxhyj8z0vcnz6l80df5pzxf7y44elmokkz1b64dsh5mlimbkf38wdrs86487ohkjpgyc292iwmquc6c8ax',
                receiverInterfaceNamespace: 'w1ahslm92zw2b0liwlw01d9s2iojtkp2yxf2ijc77x6betfan9zjz05ioursv0xg522lelb772dnq3fsd54q65kprg2iy4a5b58zu80uhxkthz5naw0qlr2qr95bxkht9mb2tphsztmazq8b45rc56ta14kf0fjz',
                retries: 4392660502,
                size: 5568644330,
                timesFailed: 3580189217,
                numberMax: 2178259991,
                numberDays: 4351980442,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'giz19w44hdq2bkvvejcws1f66wyckn8l1tkjl682zj7qsqjruk',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'k8rgaczet5jech0qdxvp',
                scenario: '1mwh1oka6d8gy40ipzlfvf0jipikro15b1z332epmtcr93xxwonok9lql9kz',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 13:21:33',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-10-23 05:09:10',
                flowHash: 'd84i8t31o2zim2cjtj7n45nemlysxtsallafc9ph',
                flowParty: '9nmyq40hq20dncinlq3xj4ehkdh715h7e677qcre70hglhlwl0rsx3nz9re7p46q1jjn9a9zdtqjgjx0rkklnyx6ml56wo8q2tyivpuqjj8t7lsi2yx5qohduaja3p1aw6fbz1pltsp7g65qy4effg7gllvz811x',
                flowReceiverParty: 'wu453ey8pgdlml6314fxn6sha6ptyqc2l2t3lwqeq1755nap3otendg1x16otn3tifr1usc7exzivz9c0coszwfmznowvmlplva8iz9f395li14opvcm5jz20lzu61af5te8a63y35rgt40wxtjy733jw3d55i3j',
                flowComponent: 'a3ykogod1oipx0ls8quhqv2lma5q17evxfoiy2r4avl7jzdiixapi0yyu05k7lhk61cju816715ztnhwz0ybmspv7smlj6ygmy8z8rtongw5b927thlz495a8fb1gxs8swteeagrr4sieep3kxf24ax00h18n510',
                flowReceiverComponent: 'e4tx8p2ussob1110nmrph9kk59cdweltku9u38e6f0fuernujmfhn4knvs1t9m324lsveze38qcbaksjpm4jjv3k3bea3iznyooj81gtpiaofves6cud54we4fm351nrajwmvnl4lxr087b11lm8rc8d7bvbsz6k',
                flowInterfaceName: 'yh23xk69j675dtd5w9zd1ix8r09ps0jw7262frnm1e0fd7qbzxfiyesx5dujt14l2wemstdh8bamk72xjvrdbjaaluhfalv5ey8ctdtjzgv1kjjulbdpeoup8n1ohwho3f1v9ml5xwxw487khz725mbtkspxw48u',
                flowInterfaceNamespace: 'tftt1d0xkef57syyjkwm2dxbbc0wkax4m98bay17q4y0rqla4emiw8b161llamvczu4rnzfaptzxdasdbd4ixv6p4r3bh8cjtv65ibfvg91yckrx4okgps5tjohp0dxkbqip8ut9m4i1rj4rdvbrbc38dxi8vjsa',
                status: 'HOLDING',
                refMessageId: 'whoubu3hd8ozhfcz6yikx9b4wqsdf1uyp7270wvuhfgj85kn0xcyx8il4gkthnt5gkfrsirbs7h3hn5etl2yv7vniyo49y6una258oipvxj6u2z7ridhqq8kuvma25uqrch3yj45y73t9abgvep6h65zzwkuv87g',
                detail: 'Non ad aspernatur omnis est quo qui corporis dolorum. Officiis ut mollitia corrupti voluptatem tenetur dignissimos. Voluptas dolor dignissimos. Quia quisquam excepturi ipsum reprehenderit reiciendis optio et harum distinctio. Est id sed tempora.',
                example: 't416w8pv6z1i6vj4eyrydo7umgfbdth12int4k5rsuj6asuafk7qvx79love83y8j1lmeld4mfyssnxhcojyfpfj643ksufj7hwqasxuezwl9hlist3rzn1w3z74amevclp7zxfcxyflbh6vfwkzgo3a5f8d5ri8',
                startTimeAt: '2020-10-23 02:07:50',
                direction: 'OUTBOUND',
                errorCategory: '91794kez0up5utdekxnosq9mndc1pazcxkl5fw5khnq8a327uipd3ddids77y0oto69f1p79g50vhvl8wubw52eyt3999ck7bubw8zgsawfwwix1gzfyv867n23hn78hu4dke4vpkwkh0diosxxolzoizf2edbjj',
                errorCode: '2jhd5775k1066j57mk4v03wwcrpxqxzencvnzax04hbbqkg0l3',
                errorLabel: 863963,
                node: 5893965887,
                protocol: 'iavrevsiykw3v9anfi4h',
                qualityOfService: 'b8arbep9hzr5v8rbph3c',
                receiverParty: '3igu04dlu3iharep80zjew7vy1iven8je8uhrdxmfjlqcxox1776gwfs98r10ld47c0eciitsbakzgh7f7bt5l4bn7piptt3ozqkz35m3gux7b43p3l7zwtoxb4rnkp01vlgfpv092innwuw3xwchvtftw1msv7i',
                receiverComponent: '32reh4too3vqlo7i8blp7hkhkd1l1ro964itjuevx6cxz6040125m5nr5buegxnwwkqpcleufhmkhelv0x0lfaghg555dhvwcxgisk3nf2h5zvp7h7cyrlwni97738f9j2nxfvplqugnx8lfbct25ewphrasy0x2',
                receiverInterface: 'm415q1cnekuakhh9rklgi6qj99tfpuogylpzkepns14k2w4785q5j4azdyul1ojczt5f63g764915xbwc4vzz1oefz8qah7xvhpv4o87m6jz5b4l12cvh3w02o059r4p22bbg5w6djqu99pb8mlqvas0rbij0r3q',
                receiverInterfaceNamespace: 'ghg9kgdv6mf8zfj67ipj1lrebj4yke85xq8yy5cqn2ywhpwpvi13uvkmdlwrsfxh9e28d00fspvr2lyk0u5e87sqir7p3naod5031jjnoylkht2tqyz2kmqqb2u87lkifmachcljwjlfi5vfesjjd152877513dd',
                retries: 9582788449,
                size: 8714062783,
                timesFailed: 4088604955,
                numberMax: 6974579967,
                numberDays: 8630554363,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '9iflec25ln0w1v1cxqn22aj5otgbe61c521n6wnc6lwiyvc149',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '17qwbftwiz3fc3ukmkvr',
                scenario: 'zbb0wmimmveiru7k75u30a8m326tj6tc8j02p62hm1ikrtzzzqkmtoj5ndyh',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 00:25:18',
                executionMonitoringStartAt: '2020-10-23 11:03:03',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 's0m1517vb6fsj0dncq8ky8dup14ddbw7nc96kt9u',
                flowParty: 'cjlkks1fwdzvcqza0hhbzeena56y61r3rhykjhsbjm76kelmwtcjvpmsyx1dvizx6e4ag1j4ombrrsrarnq7acykb9i6kej143xu19p4zhqa55u2fx2oiilcs4cj463mgoitgmgxrgjzmi1dp1tdi9khiv9b7ywq',
                flowReceiverParty: '0ps4kbr8zddzne2o7vtzwg95isan2zdqp82etzs927wk691sdqzfnpqoex4fsqw3huwh0k1qmenysqat4vhgsfsdos5cpkuwpe1n9jmcwtaitvozrs5us5lpyohe1sbxiojzr61g9s82xs3e7d3szyid1ouk60ab',
                flowComponent: '7z3o61swebyzi9uats6mzhx3phahylsw033f39r47mo8a6d475kzx56uqrzwqy2ptoie4v8viwv80d527lcogecmotmofyj91aewml0wsifri11dscs3ydou6zz7rqhhkv7w56znqf222gfbllo6ej23wzaoh6a3',
                flowReceiverComponent: '48ve8msi1zgtwi6yaskqcmwk9dn19zg3ppsv0tj7xmhfnlto8ji54lz0hprww7eazu8pjyhwhv9amh2kzj4uchun1p8aehr28kd7iprfk3c7q6i81kg2cymdniqetav9w3ox8jkrep8wc3hf9bcf2hwd4z0qqu5h',
                flowInterfaceName: 'k0ucidrueg7tuho102krwabwqeivp7l14106vcnvpxj0p14a6vpy3rkq5fflpq9au4b2t7x10oqcagly2vynvtg5au3s7a4bmuxdtionudq1yiqb3ipkt7v4hfv2g4i1cyrtk60e4ne7dhgdi9vkclr2l6n6ynuv',
                flowInterfaceNamespace: '0q92pabpv3wp4m05mj7qhd74nlhhhu2axub87o71dkdwuuds7l27id9i5ypwg4ltw41f1qyhf2ojs4fc2ny567jk81ztcwngzg9rn1nbop8ybeml06qqdhre14go3m88wn2oofm0zcwan14009e7qx1up5ho2tqc',
                status: 'SUCCESS',
                refMessageId: 'cddj7gaoeqswjogwuv0lw7ufy02e5x6l0mrslko27ouj6hwz21xw90cqffbgebnn8chswp0pk972wrqssq421nj7n67jr639oyjincy7bfo2kv27hm3za18zcgporjavkd3ahzcgotuautwr41jmbhlgougb19pf',
                detail: 'Adipisci dolorem nemo eum ut ullam distinctio possimus. Non accusantium occaecati. Fugit esse voluptatem repellendus praesentium culpa dolorem non. Fugit quidem corrupti perferendis sunt ut maiores cum et. Et voluptatibus non atque at. Ut at non quis consectetur.',
                example: 'qfhgx00eabfelvheyaxaq1v2vov5g9eiks2xtdvrgvu5c6twfmfj2zr5m48ew35zojpl3z62eezreu6lt1yjurw8mu7vnq2ocdrkgivtv854qdtiz9je9o8496w795h1ulenayk5biqyfhsfbotscla1gel86qpx',
                startTimeAt: '2020-10-23 06:16:47',
                direction: 'INBOUND',
                errorCategory: 'ee2ysu7seeubtluffcfqtk39badzwmkw2psf73ckq4rnnfqxp9bjoqm0vh5hmc84ykl3s8lxhlphcxvg5kkj7wrxgchpddcotah6fzn7qnvlvv6acxtpdw41uj3t1z4scmlkxm9stfiynt06x5ke4u5xu2tm13ve',
                errorCode: 'goezyismz5345dbek0tkth0pxj5phf9t66uy8vxne7snt4cp9d',
                errorLabel: 446656,
                node: 6985053908,
                protocol: 'zo0w6zkr7zmb1vu1y9x5',
                qualityOfService: '5a4zy4euc5d6e8j3m1gz',
                receiverParty: 'kfitm3opwhej0ci215hd1jsfe6jhurim59hds7pm9h3u777k9wmsmay9voj4u4zf5b1tctxbr440zk9aq94tzcd00zr7tnyab24li0udva5qp5tumu1k8exugm0i8dfien8v62i1ylxez2uy137b54iftqfh1pea',
                receiverComponent: '6qcvmmojc8zkhx0s3rcvx1nm2824a8l49h9bwdceup5wv716km7qyjcy7jttzt59o844lq500frgfkq7480e2yyerqot6hpcfj8v8q7u7d2kyui3x1sg4v6qya8xm3lflfb51nejc0yngew03c8ydjze908uc83w',
                receiverInterface: 'cgu3zqcjjb4wz71p5kd0frb0nw37ej5o3oh16vt8912995yhgvldr6wflisec4ovyrpsfbyg1p2od6u3f6uoo8hs4xgviivmc3xbeb98fomdsa6jyyhqudpx6jw9c9vzix05siie7s2osjdu1e2bbig00cb4n1k3',
                receiverInterfaceNamespace: '1nqld88s6s95tu174g0d8atx5xu5fiv7pzyym04lau8ae6vnn0oehzkidjuud71gtmjzp8hkzawamynumu4ljv15lsu8hpff15dak2bs0wve2l0mz8ufmnuwl5zmqrhj2licvxvyrncq9ajroc3p5wjnstar82nn',
                retries: 9431098268,
                size: 5102988211,
                timesFailed: 8103090627,
                numberMax: 6961579777,
                numberDays: 6850927586,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'dg9h8cl9cx1yua5zp7gzbk2n7rwzhr8r3809hdzxfzg7g8147e',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: '29o7hrozugnqw3wi8ve2',
                scenario: '60ddnk5euqckbeo4fb6al17i4atrbaycphgwdno58jgn0p6r2d9b4pzmya6x',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 16:29:51',
                executionMonitoringStartAt: '2020-10-22 21:40:36',
                executionMonitoringEndAt: '2020-10-22 23:25:21',
                flowHash: '4844pqctdwjqrbwnkrfhpyrw7rvcm86kz4vcncva',
                flowParty: '24bmq5v0xv4i9qxkx3lp3mf4jyhos72i7arujhbe2iqpjnhvhtqk04so8nec7fq6qfrq0zaqph441r8fbe7gf6lzcs4y5ij45622obmp2xxi7m1v72ci3hbpm315hddcnoe5bop98dbr2csxx5roaqp3yy012jl0',
                flowReceiverParty: 'x1127mfv5izlizufs79qk62vdk99zfjc3h5ts8gbynv4l0g2ip6ha0liefiyj85ztft294y11ujtt6vn3hd5bfszvwdsg6z6dm5bfgt40kbthlits5vlixby6r1irmxj32c1va089crtldt1hp7f8omk9x3a2ctd',
                flowComponent: 'k59ipfeetd370d2zlyll0k8wwn717h87hniu305tn7fo4caz8mruvstocgs879bi9rqlc7ian623ai89pvz8u9kmtmbyuk47ancynj7cggw04nlywjrkmk72kmji8yizk3ow2r520r6ehayma155ovjjncm6mn28',
                flowReceiverComponent: 'xht4b2nn81zwzv7zwfjrkmtu42jmrgtmgu60kvn86w1v6bdof4d3nowt0s6l6dqp5pgq00s0jtz26gppbfusbz382ryi90pm8ouq17sud7sex7e01m9maozts2qljfb8bwa5efcaz2ezisbxgwwrghxl7es9s173',
                flowInterfaceName: 'wogul646i0axbsypdquzju9zadu99bnl3257y5ycfmsgiglw4a7bhhpmnp2u0il8ex17mq7zopquca3z9o6zl65exvn0654npw6jidcsq12gz40y60yv9nz2shsp5f3lcwaft9nmd79iulmubg0xnw0njsz533rf',
                flowInterfaceNamespace: 'a8fxl76betxahu5sf3ui1p8bqubyo4vmtw3uj9pb3a6d3frv5h2w3dcdt346ayydronkiuph1jdj6h3sy0g9j3kb4ud3ejdp41j3zmo8x2r5dwvo1dq2lxvj38nl6j9yfcreqikanb14gc3hfv981vvwsijx6l7h',
                status: 'ERROR',
                refMessageId: 'bwigt1tnqzdbaqrz5rj0r4r5z2bkrnxpgjiwyj9y95abytwfgyeh46i18drlskxmjr2zmjhtfdbw4syupqom9zbhk5zkoesx1wtd27y2gedpg5i5o4ah6jv3rifeyiu1cjpfh0mwyi0ri5gw179kpteof21qqsj6',
                detail: 'Inventore expedita et autem harum magnam optio voluptas blanditiis. Modi officiis aut facilis nesciunt et molestiae et. Autem eos aut sit repellat voluptatum sint doloremque unde ut. Nisi velit libero voluptatibus. Dicta quia quidem voluptatem neque laudantium.',
                example: 'pu8ykcju32vvprrghblr40t6t99vkgb56io2pxegum98dlp9ff0k3r3fyu6itvuzx8hztqgtaqqtftv8dkwizc8p81ycj2npf1y2wapuhd34rtvfznx1xy7s17csm3e3ghqpms67cezvos5dy3eukraybyxaau53',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'bukpmhbjrq0favw3t0ypglye1cxdmpcrobye8g5t6px3msnz2sdw475ddvhswohi2lqhx5wgk9dq9ljsb9s6ambpyzlpn5ovwm0xbn54sqin3l3fzhs0fl748ht4wtffl44wrdkztdrdscaictv32ngoezfhtoyd',
                errorCode: 'sm1has14rwuo9dzi92so90kd3yawbvdfpepd8a9479cra2nixy',
                errorLabel: 131436,
                node: 6465976445,
                protocol: '33c0nv50yfyzmtyzhc0i',
                qualityOfService: 'xwk8302h4q26r7r1z8t1',
                receiverParty: 'jeiirn9b5hsic1dh3z8fkr82t0jhxnp99e8cq9e2l2h7g6zetgcdm6zb9717h41g8rc9dnfk72yp55isg76a2jgm37t7rj2gk2ank9hluw4h0kagtk8j6lbqcvwmlwfvu7iz6vfpvqdfxj8ww5et7mbr8j7u670e',
                receiverComponent: 'jl5l2z87ve42mti54hni1ncusea3zubmmcr0fgyi9wht4ooquw4g7qbk1eogxwqnxcnrh9g5j5ylvd5rfw4reiv4olkpt1q3owhnybivaq49coscm44xyr0vbg994y2d1ye4fkzrqmlqranknm9cc23rlnpdx6kg',
                receiverInterface: '9o1odvghsmxqgd9lfdmwl1gbshg14neieqajvgztiuz8m5w2g72wjtiw8lxofxpcr6z3gdjuk69lex9jibbak0xlow2dmlfyo7jbprhk3fvhf699g5pxg7utxpwvwjezotb71d33q78cz7wfcljujxjnlzhxjbv0',
                receiverInterfaceNamespace: 'dfprxbgxwmocgh7er52lo7vt8zk9ucfw94urc7s2slr6xv5sg0zng3vpgivhndov4pybfbjddncfnbrghxpruz7ku6egxtmasn9bbczjqr5b6pd5qrng0tluxrybr9n4c37smbzxigmuzj2l9q0k1kwe4rbg86pv',
                retries: 1027346274,
                size: 1585974203,
                timesFailed: 8875540668,
                numberMax: 3312458662,
                numberDays: 5350918372,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: 'ug2kaoxkm8sq9xr4qj3f6wjr14z2ehthk9g52qachwbekcxako',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'hyw9leupqgk295olj9r6',
                scenario: '9amzw67c7o3cwann19f0p9t2qngzyxtlydgjqg7p0gqkozmpuds8pzula1kt',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 11:58:21',
                executionMonitoringStartAt: '2020-10-23 04:55:41',
                executionMonitoringEndAt: '2020-10-22 13:37:11',
                flowHash: 'r41kera5epgpt1zg9jstezq0wexpo4mmo8utqxs5',
                flowParty: 'zlbtnvfai6x4xuk5007kwslmptrmfpsh171ucbh5sahjayd1gvi8lja3b035ld9ickysbzftwvpwqcxsipcrjji4bamfcmmmvrgmhc8rq3g0rr8ynq8dkr0a1v73c17f61qa47y61bvbq1tdugx12pkvfq3wugim',
                flowReceiverParty: 'c2yre6dbj7kbw44rvnc2o1x5v5ta5612u9cdz7v4geyjfwy0zciwho80gkkccifgbn42hsjd9gb8co3ul04nyinfb8nee8ayf3j134yheoh1drsufx5ixyum0jtm3kqwimz17udxp2xnkn2i97zwznmypmjo228k',
                flowComponent: '3hmbixrwv2l3kh83ogg2y9ebwv4ib10jtf0ywfdhj4cz863k49t6nny56f4y9wwyv5py04a4iogwnarlre2kz58htzmxdlymox61ucu4hd09x0xls5bnhf9cz95nlhgne5jnkkhqj0hre2tfz3suoy7wjmzbgg6m',
                flowReceiverComponent: 'blpc4ickr0rl2dw48zn2qwya1mydfu71g9yh74w2oi0cwq87wvdbuaien6uwnyllzlcjyzka8ah5cfds6iaxxjh6emg7ipemmknswzlvgt4ori4ksbqeskhzbrk7z7klvpf2rbupiu9gexborx8q0pddy8uoqtul',
                flowInterfaceName: 'np73klwrmqw7jxnnvclbpzzdd9kve7p3etbf38fktkuyqhkf7ftoh7791il6ifdshl3ilxbtbt7qins9gq2tb80ifd7uil8verfqxr04ujm3sh638cxn91usram9n3zv8zfzijmp4kp05wk7gw7y3b9ybfvcpvom',
                flowInterfaceNamespace: 'ku38xqhsnnmdh4tfzppimeay4s7f14pp2t532obsal57tpq65zkor5sc8ciyuao36n0945i778nyrgxnfizrkdqweo2c5ftdszlwnc03rmispgqxqu6yel5arvffsgyyl3yrqjpjeozzynptv80qnal2jq55o0y3',
                status: 'CANCELLED',
                refMessageId: 'jceilho2wndbppk2jom2a4zae1ikb7dmsask2aopcczajecgw7rg5q5jqdp8uwbtawif7l6mu1euasp8to3u3a5j92pzwubua0e0iya0pic6jn90d7us7wgcxel9usjk0nrhy7o4p5zhzvr167lksgu9ycc6zcnz',
                detail: 'Quasi reprehenderit quos iusto. Alias tempora cum. Ut dolor ex velit eum facere. Quod quia facere laborum itaque ratione qui incidunt. Labore velit sed aut nihil nesciunt aut repellat aperiam ea.',
                example: 'hcopd9536x3ygfxqd28eu7q9jhd9usly1q8b9z0u7lbtgonf6af1lsbigwwp0pt9mqbimyfxr28kealzbhdub2xoqqkqmkjsttg2fexy5heg0y1c57knb2u59lnjlv9asdnr0vjuxhy95tixs31to7aqg6z251ff',
                startTimeAt: '2020-10-22 22:11:08',
                direction: 'INBOUND',
                errorCategory: '55cqn2rn3i89b7tz14i5jeo3auu6n0a0mtxhgamal4uvmht0073vynw0a4bsg57rlyg9jp69sf1z4jh4rasrs45yznrr78itn8tny70xoxgeuy35agju14tw3a8dlap0rp3jsi0wlipj4j4j6i1j0yd3wb7xtnvg',
                errorCode: 'uml5psg5bmfkoxu1lg5tn4kg9yix6afnjsqiz4m58gy46un2ei',
                errorLabel: 847291,
                node: 1176296791,
                protocol: '4cwsr7vmf3vqm6jovw22',
                qualityOfService: 'nrpmkn36mjjszhdjxl0c',
                receiverParty: 'wgc8c93gqozxomcbmtjfldl5ivdi0w89mhbty812pm4hy6rw5mifdeqd4hqaydmnze7cf19i63m0tj956qzm09awgxr81impi8dlor84xfydp8h0rl3q97tnbpvtt97ajvorfp6hzg7dhfrqacwjc9diuwobdput',
                receiverComponent: 'mnuzhtblr95nfypewmwyrsm04r6vxovluifyqcvjpks4zq7j3g0x8bg0j1gp8v0yefitdkws4463gbfczezp8mlpk46ye4n84i2soedmza4xl3qp36u86yu8wxl71w5o97xwg54fkc4p446vst2oz4u5bt8kti69',
                receiverInterface: '15ml3v35phuhe7ycrru087fy35i6gg5y02jzyw0rcv0dd73109pano7p29bwr9923bijw0pyy5ajfgq2wncpp4b23tqcz5f4bmbh6nyutdxr396v5vlb5jf55s8ysm2nl3824lj5pq2rl7vwqbfteagyiy78imez',
                receiverInterfaceNamespace: 'ck8z786yw471qf8ubk8i3ybmgtuxm41yhn8enydumxte5dhlt87g6qt0gy8dzi7htxxdhonlys9l66dznhv2gcop4d4zjyuxy1e9trca6drxwp2mt47jy22n8hnueblg25f8fs5n0zljgooi0qabdpqnxojhoyvn',
                retries: 4585361044,
                size: 8825085961,
                timesFailed: 5030735503,
                numberMax: 5542342613,
                numberDays: 9294346316,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
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

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a3533d6b-7847-4904-abee-0a7cda0d9088'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '53de2976-3362-48d1-8b27-5841b7a049b8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '53de2976-3362-48d1-8b27-5841b7a049b8'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/a85d97c5-b325-460c-9c82-b378e96acb2b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/53de2976-3362-48d1-8b27-5841b7a049b8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '53de2976-3362-48d1-8b27-5841b7a049b8'));
    });

    test(`/REST:GET cci/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f8910118-aca4-48aa-a7ca-81c826e0d309',
                tenantId: '86080bad-baf7-483b-97e3-dc172102138f',
                tenantCode: '3qr5wc2lp4qwhehcu515dkf54auemlsy66ohxqw97khjon6cug',
                systemId: '62047384-f225-4fbe-9257-ea083bbefa83',
                systemName: 'g83ymgd2hebxn7gnone0',
                scenario: 'yvic0jkqtcw2ixvgz04yh2tw3cgixnbndok5y4y3paro0oyai63nqaogeg37',
                executionId: 'bf79bddd-659b-4a49-bb3a-9b47ed36d490',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 10:49:32',
                executionMonitoringStartAt: '2020-10-23 05:23:05',
                executionMonitoringEndAt: '2020-10-22 20:19:06',
                flowHash: 'hg97ux89ajix8xtr51iqk2pdt0eqvbyw8i4dvi2f',
                flowParty: 'j82j2eix8gwhs8gocxnjkkfv0nzaz7daubmy73c3xenpeb746srakpi72esmalqc0ibzjz1hobk6k388y68aa8400bs733t1tkv9osbec2b2y5fdkyz7m4m6w8odmjkr0blpy70ppy6h8nljyh2vmkoky7tnp08i',
                flowReceiverParty: 'dlck13dm71uyuishwcluxgl3hj4q67vyoeez7obd3vrbkfqf2u2jdviqe179odmvisb4efekf3wc5bgly34o904l4ul2upyhwmfryehs2705h3t8y7bpbpdungv8werqfk4k7309cicfwatesqhy1l3dso1pgwx4',
                flowComponent: 'ia52n6m3qfhi2hup8btfzqcfp7azo8uqe1332kgy5ldfaan3ey8z6p8s061bkboinmvkkvz7yil3owxh0xvusqxmqc2c7xebr18lw370e4aqmp11jpdt9sau5q4c5rnncf3w8klgcr943wfbz8cvm8hxl0i1qigz',
                flowReceiverComponent: 'lrgixj95nrn1htq3bq39rautvkb0ehkrc7ifswq1di8ybpla8f26h3e9n7ht4sd3gj75d03zoe3jdihc0fl3xk2tn6jevd9p8m1cdbgounv8xz1202gs82pjumqmnihxb1qpuelbj5af6o4br2hqvwf7e1jsfm8j',
                flowInterfaceName: 'gxj0clpkw8ccxw09618t6iamerotiq0v246quib22u1ef1jmphjovyrvvwxgne8qwybw8pg815cpvf3e9n1hssikkmd9s2ux5p2u7264idtalbu3hqwhfwuqe8mxmdxr4x0scet6koufgp7by9q7eoi271e9pjfk',
                flowInterfaceNamespace: 'l7an765dvrto4dos89e5bd6z5vuo8gtsembbo7il5ipq6fw3d4gcz5d97fdvalfgc7a3z1dlqdwppfvy6qh14ra7axtqqzl87lnjhae3x5j63sxshdykodaqnv1ms1l6qgx49qum4hmutbxxzodn5kwthly7bouj',
                status: 'ERROR',
                refMessageId: 'e3bvwu8tsko3gp7b7wrd5q25wqow6pl108uf58oysbuwtcd3o50r871rtsu5gduyu3ibk6b7bxae6mkkigbpw1x4n6pzi4agcs86s46ydvb552hfbkna4v2m79gn972hxonc2d5ik4a24dh2w00ccoyft9khwmp8',
                detail: 'Impedit cumque dolor soluta dolore ad. Aliquid nisi adipisci minus. Deleniti dolor voluptatum veritatis dicta necessitatibus expedita. Est mollitia blanditiis iste eligendi maxime itaque minima iure cupiditate. Exercitationem molestiae qui illo sed facilis id cum laboriosam.',
                example: 'l863u7vpv1os8hl765hzeblc8qguu5qck8pt1sfoh4p80ppdcn64kdp08lrhq5p4m5lz93a8y1sjl0g1b2jdtiiahzw94g6wrxehbm3ou49u7u7iprg395ocd30f5i472lo0mp4n6uq1wyfy0gytwn2cetle1txs',
                startTimeAt: '2020-10-22 21:07:52',
                direction: 'OUTBOUND',
                errorCategory: 'yo55m1dyn1i83gjswyx59d8vzw82rqu0xnsk9b51dwui1wpco78mr5vmzw3h8cgw1onxrqrlqeiyu7w7aatetajip4s3a9te54spip979k72qgxhdhpmth06e5gpt5po1ij5vwb0s5ydpo0w0ytpkmdonvtfhhq9',
                errorCode: '2nkejb46caa0eenmsujc2zzfmfvla4svqcmadwbp5en73apkg8',
                errorLabel: 540203,
                node: 1665322542,
                protocol: 'a5q92ti7qz9e7msrgeq9',
                qualityOfService: 'pnww4o9k3jscxrysuks3',
                receiverParty: 'i7smn1jyakahjrao971v0nw2ye93o9jd05ppjbq8v0otgsfk5imeo0bv7yejfav4kivuf9j456tk4clyz07oy6hyvspntmwdhm8qrno4f58nh9lfi5sn5ac0d8fh3tpbgue6i4qcv14lmx8keujejejjvg8nkrj3',
                receiverComponent: 'ndwhfbv3zysd6fxmh3ugcbidp7gfl760z8xrnfhp27eh56d5pqalvfrkatz3wip3p71x96wbfzh3f7l2gqboj5s2q6aje449rnp9cmbcmu0hui0uogfcypk3g1thooversm6jxsgg4tym2xcd6mhnkri51koyhja',
                receiverInterface: 'ae2dgdc6hroc705u2p0shjigf9tuo42gezixa9k9zo6rrlkwd72e9nks5i4n9cpetdu1ed7qumg9jh3qzmne03m2cqc6r3tfy8j99h9xts8c37va2rau6x4hjcdeq38mhae4t6bxrsuo5vzb873pbnrdtfnzdl13',
                receiverInterfaceNamespace: 'ff4jcx5klij06v49lg98wplb5v03nydsfegt4mdmmy1dteft5hboqjrzy1hfuijow78jjzp3beytiqbjj7mn8nmsnsaqsd4fye7qwink5bbb7fl37lrn4r806c26s1gxybr4jwei25kkk68tg7k54yzqdpniqt2h',
                retries: 5335901465,
                size: 8122046677,
                timesFailed: 1485310031,
                numberMax: 7134253227,
                numberDays: 2375563938,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                tenantCode: '6wgo41k6nmd8mqqf0b93gy58wkxi0qig8fwsl3kd36u2gw39wn',
                systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                systemName: 'gt1w4igllbagigtqq3u0',
                scenario: 'yqre79iuz3ehxu4876orhtui0ngoe914zki2zmmt9vwkkxqbtpct4jbfaiy3',
                executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 15:47:42',
                executionMonitoringStartAt: '2020-10-23 01:17:58',
                executionMonitoringEndAt: '2020-10-23 06:40:24',
                flowHash: 'ghvar8702tx15xwk91x1iuy9p1iybdkgehrm0gk8',
                flowParty: '61qbxoryfbtykmduhz7xsuzg3vtxxyb018xqbf9tramwzpvz4hdjal1b2m6fjmgyw10gwzkhodcsrc5h81tbj8njq2kz2t35xp5jcu1rht7mvt8tr097cjf9tfu78zv1zr3e97f15ko1cbsxlokvbjn0u9mq2x8k',
                flowReceiverParty: 'brxcqaolae14cwv48i86o4m4rlv5c155v3jllf5la8xg22gh0mk5obhwmnai2js1vv2nig5zwob8oissc0fijshphlrmmlxldgl9dv1l40kfge1slxeheh7kx9nr4u205g0w0n7t1p2ab3xhwzxdq8c61e618y5v',
                flowComponent: '90vu8ez0gz9xu36zggpfnjftiuzacx5om3p87zyq6q1hioevc2b7sbd2h79ipawj0pxy16m1tru0my1rq4pv8e0o6k399kkol01ftzlafy02hpa71hmon0g10k6ubx0caqj4gbs51v1iv8rlk35tp46kpnbn5d91',
                flowReceiverComponent: 'd2fm818179wovq5d498a9r2ctqbhl20cqvxutn0udubbxgi8g38ecwe54ep6rkbjk4rhs26j5mg7v4jcx284n3o85sxzinhbil9jk0b2q53rtz2cbl1f5xxy6j1rk9aft852c5ymc2a5r1y0yagb0zy6uvawfudv',
                flowInterfaceName: '8srpajjobgpp9rx4ln7v71ymvay4brqyxjsrqb99ag8lxhvbiujrac1dwo1p7m1a56cek4bplgkg4bwsw7fxsct5026abe9j6tqzk6zp998m43bqeoh62phreac8onw7xvzp3hmg4ljx9cuj3zkhil9c870uk9ez',
                flowInterfaceNamespace: '8sqwu60ncy3kphjf5mby5kalp5klhx6yzcl915vfqd8l3rw4zofwhgl6rul82x354qwcuzz4wc0wo2idwkpvkuvbpretyp8atjfahvfl6g8t8uy466opn2nan0wvprox3tky4os15t7h3478bjn6bwd02nxz3ard',
                status: 'CANCELLED',
                refMessageId: '5hbi93t8cu6a10s3j6pb4dbibgj79ka60zaq1ztnwfku7l0r8v9amfj2zouq3usuk697eiwmdg3u7rtll6nnz64czykg5y88xhj0updw3ugegwkmorsrdfnhfmc7i6m9ewit044wwbvcam72bgw5visaqlhv4wou',
                detail: 'Quia eveniet accusantium nemo. Iste repellat dolor aut. Qui aut iste. Et voluptate consequatur enim.',
                example: 'wbhojszumng2cpdhuddokh1uxq6cef18oua3ug8qmxb3k1m7mwvvd6pty1mze8vu1pavxdzvwatqqymzkjht0uff8w2mwp9lj0nk7156i2fg1jk0wwau9zp2t256gtsw97k4w22q5rnbv43edhdxqmx13ympmqf4',
                startTimeAt: '2020-10-22 22:33:45',
                direction: 'INBOUND',
                errorCategory: 'a1w5jmgafagml1gh2crjudbnqdlz0q0tidqqhxlp0vlk000dzr2ld1xien9wums7z7475msk70sy3skpmbq6xjz96qwkngcmahex6nr5q8gdxev47kgm2j0m5ezswoy88yk0owjh66m5p3apnoq95vqwysz87rh3',
                errorCode: 'l81adhxnft3p7yq0baz05pmcsznpi7a4p1cpqzmr498dt1gxyz',
                errorLabel: 598556,
                node: 4545139055,
                protocol: 'mcn8w6kbpexmqbwvqc6p',
                qualityOfService: 'qx5itkwgl5fgmxrrp2c9',
                receiverParty: 'qoow4wau8t3m1a58mjn15tinztvcn43n3i8fxmwnim8ftomxwvansoz97yfct2s2nglfyfyh0t5ob5tcy4ad60k9vds1okeh565z696o120i40q7huuzkfneivem9agpz8fdl5bcuwp0g99cfsf30dltov6aii8b',
                receiverComponent: 'lwybb1hezm3982v3qt8pmwczl6i910b35iixcjlochr3lopnl22m7yhirsdy6wsglaehxwg5zzfnvdsjjv769l4p6g0uq078frjipw23ylker1dar97harq24lzwafbr6hye1ojvjjhlw2lvvvvugy2evend0h3w',
                receiverInterface: 'jmdcq9tr5jabhcnqi3uk7g45rr1aygkz36fu3fkvlr9i164p0615zdt9fmf7ng6q665w7hop3l1029qpojkd0lbqturg69pfacu27o87txcbswd4ebv1wpc232tkq4ylsaxdujvfztt955nfghd896rok7d8jgdy',
                receiverInterfaceNamespace: 'dltl9i17zdv1ompcdot392oyu5e7106cd9my46tj47vtm4vjwd4jq4gzn02f7wit59n5pq311fzqru97no4xssgrfzk7kkg3bnq6aq3apdf37y75z4soppjy6po7eb05w17m9q6yrk64sb8e0tt3oomevqdmy2k4',
                retries: 8999715253,
                size: 7043132969,
                timesFailed: 8863983194,
                numberMax: 4433788748,
                numberDays: 5175786144,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '53de2976-3362-48d1-8b27-5841b7a049b8'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/6b078f34-0943-48f5-85f1-e20f1b3dde35')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/53de2976-3362-48d1-8b27-5841b7a049b8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
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

    test(`/GraphQL cciCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '86ff54ff-ac04-4a01-814e-b58c7fce072f',
                        tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                        tenantCode: 'hhbxij6t3skiw1h2f3rt6tid7f4dzxsta45wn4dbn51vr37xmv',
                        systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                        systemName: 'zr08vahjkm1uf73je61d',
                        scenario: 'iah1w69oyldz58wa4t2co8ysnvm9qaytj7ry7lwhghkhpinoil97vjvl9lz4',
                        executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-23 09:12:38',
                        executionMonitoringStartAt: '2020-10-22 15:20:38',
                        executionMonitoringEndAt: '2020-10-22 20:54:53',
                        flowHash: 'ogj2a1n1v7yxo3l84psagfhauu6tajp3jbfqwlbc',
                        flowParty: '7ssglx9wz6xjg8vortqzy489vhd26s79p2eebq849g9j765vqay2dj4a5bct2j7mu3aaho767rj9w1u6r43vfaiwoa3ahlgdhk9ayg02lfl6hlbhsk4isoti1rglrknjwh3oj8pccdm6f5e8b94e3xz251e9gt5r',
                        flowReceiverParty: '9frmyx1zlpj5e6huyoo5sgm7bxairr0a962urrs9g1b77aqhyychnfaqgkbhuhy29tb9oc1mgm7zq0fpsm5d16y4jn9pygvtx3gdkl2uvg3ywmdtdblyr27jj82hb1tjz2t67vsmtfkm5oupgjum5izmzvxto8wx',
                        flowComponent: 'aqeof9eu550784dgej6f5obe8vd52dwjuz9het6g2g7p34s5t28vv23vuf0842uicjquzjv1rndc5zfcj6dnkiv3ooa92ofn75y3egavrvdg95xwhj3svfld7a9dmp7p2f101jww0hfz46q7yqa1no4cu8z1t4c2',
                        flowReceiverComponent: 'n9v8y2wa8tenfmh2kt2ngxw89m8h55dzw3mau3co524irdoc22fm5uw4odmehrrxiiv7ukyltynrebiwo4h4eojeecdgu07eph8fcksjitvmde5fzj4mdn8fuu758645h6kmktbqu1ordqiush1rte74tptyzpkf',
                        flowInterfaceName: 'l12wvz7b82de1o5uqo8504dtrup9bb6nt1h2ezlwoevnjxmgtpycswjckgsvwrg2wl6jguslolx5c9vkaje3yccboanbe0dg3eohmmnb7wu0693yrq8ngaxrqz1r4k9tokkqpcqnrnifaeuqfj40ns8a4jlpvulh',
                        flowInterfaceNamespace: 'dazps1jpdicyyhnfdbykn2ckx2pdkbcukv7bbzuld5cemyyyy2yoqsq4rat3w0h6dzhcn6s0z34du6n9cfo2g3m84wdq254p33dnkqfjr2likumif7cfkxeitrw75r0n2r9tu9cc3a5ulnq5a8hlelqkqigcuhgn',
                        status: 'CANCELLED',
                        refMessageId: 'ztrywrnl2yfddnjqdkxnx3mzgbike5mychzy99levdacc0ru6f5htskwknnelczyuu7sc12a1hue9ue7lq13t2c6cmxl05hbsf1053o5s6utv78742fsrj50obfcmu3lm4dsmgq2meek7ahasfyq8v8i5l95scse',
                        detail: 'Saepe laboriosam quasi quidem perspiciatis enim. Omnis voluptatem reiciendis culpa quibusdam porro et ea. Alias aut eaque corporis cumque excepturi et ea minima. Occaecati earum vel impedit.',
                        example: 'rsls3tio89at2ig47ked2rdnq55kkaq98k4b47d2zbpfiisrv6t3n83flm8ywkjgr0nnv1yz18zdbqn5wq1losjd9fejq7a4pbc4czqobku4mgbm1w33jgr5oz520ob9gzg2zmz0n59cg1hv0uedt08vjfjeicov',
                        startTimeAt: '2020-10-23 04:10:34',
                        direction: 'OUTBOUND',
                        errorCategory: 't25zi3hhw32i4nphnk3xf0jnuwwsrchhbufyhsc3byrwkle50gtzjla19js6li61kvu3ntcxb0779lkpdg13nlbwjq22dh3wez9hcq11nd603zp71uarbrodreakxydwvqpazp828cpmm7a8rpqc1222uuojhrnc',
                        errorCode: 'd5gavo70p866dd3smlzkgzbxvdkyapzdtmsv5obsl5u5vfy93y',
                        errorLabel: 198096,
                        node: 2044317973,
                        protocol: '9jkm9vsb5mvo0k0ey1pz',
                        qualityOfService: 'wb42oirn5tkvgspvq9ks',
                        receiverParty: 'svmo5k7qj5l71eonhg0z4uy1zr4s2yytptr8icuda40o718643a6y6or6ii44f9tqmgox24fkpwejj6rvodf79muf8yllm8e975yf8rqol7feebro1uufm4taohu8syac2fc0128rsxtxx8r4ghwgei4yodsonvw',
                        receiverComponent: 's0mpusiaovqect160hecqw96ms0yo02ehj7iufojifdqd0d0aw1bes1qhsabwws6arxq1sg7n5cyppxb1200e14btsdumf6zw8m6z71cc5r7x03h592f2n73pjnmg1tng0g0nj43qrsjplfs7qirg44w7utctnqz',
                        receiverInterface: 'fmls1s9s7hll56hew45nxwrw1arvl18hbn5tq3wbqgmna8mdhydhsazad2te0rtln92pikvntge2ixg8qughrt8ifcmvh26d24wtnx0gd52q6l7f2vk2fy9fke9chb73ydz1z1fc4ap01vtfu6mox54s55kdwxqq',
                        receiverInterfaceNamespace: 'p772w5oflj6jgj1hr0xjqtxpvv0100e0d3ytjqvzxi6vepvqtsl9qi21mwmrpzsnyk18wc2p5q5bwkqkkgpz8upnhx6z0uh8xfcwww1ahycqbpuvekgbpv8bi3hh9jg9m5bmq9p4zq90aazwopz49tpnd5f7urnh',
                        retries: 3033491281,
                        size: 8934100622,
                        timesFailed: 8073765231,
                        numberMax: 6593386107,
                        numberDays: 9130954293,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '86ff54ff-ac04-4a01-814e-b58c7fce072f');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
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
                            id: '4455ce7b-bc9b-4395-8c47-c55f117dbd52'
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

    test(`/GraphQL cciFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
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
                            id: '53de2976-3362-48d1-8b27-5841b7a049b8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('53de2976-3362-48d1-8b27-5841b7a049b8');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2f8a9eef-937a-4aee-ad47-679f12c84086'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '53de2976-3362-48d1-8b27-5841b7a049b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('53de2976-3362-48d1-8b27-5841b7a049b8');
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '262e2da4-e684-41d1-8c8c-d1f43dc2ffdd',
                        tenantId: 'a8d0acef-4c1e-4fe2-b68e-ab5a70f0c0c2',
                        tenantCode: 'imkooa2rimbxrcf6w9tpac69c80g4aozrgr0pxepm0rvm0qqwc',
                        systemId: '198739ab-bcf6-4d93-9e5f-71e89ba6215c',
                        systemName: 'sa56lsrhcec1ivioeo9b',
                        scenario: 'a72k9b5sxlw4cdzrolhdeiuli1dyt5jv59i7rmbeb4cl1sfnm7mrrkixytoz',
                        executionId: '185fafbc-74e8-4d6a-a91d-aa013c9df851',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-22 16:50:35',
                        executionMonitoringStartAt: '2020-10-23 02:22:49',
                        executionMonitoringEndAt: '2020-10-23 05:19:15',
                        flowHash: 'ieaaowuzz120ddwqd8x3x6kvon6lbahogz2yi5eo',
                        flowParty: 'a3r2kr026nqu7lgz9l2dto8t715ugqwa2azeudh0ho2633csaiuhljjretizenidr1gi2k0yqvtoosuf7odjycgdclkxm0ihlwfvwqfozmrxitb864b5c5f5nwvku3aqumook6bc5ntqn6p6tiap5wlkg525oqaw',
                        flowReceiverParty: 'x37pd67yjflqxi3odtqn1vfz38v1ni577qd6st6vuz1hclnzuwqf2w8qcqat2ril347jgaaoqnu5ru4woje53nhbtj6wjnumobdepsed1qxradp4iv08ss8ws0sk6jx143q0g70a2h8xcdv45klxzi75jfdyohp4',
                        flowComponent: 'csano4hjv3ehaykrlh9mgb7oyc8e5xg822but05afu1bns83c5czca76w6qvfhuel31wvqg7t6a81gdabp4q4lv43f3o9hxai9xwlfj3vcue9dy53o8n2n1iwkocn8s1yff01as41i45hg25sqz09pq9j54642w0',
                        flowReceiverComponent: 'x19q6y9afkzym9exto8ehv08u4om493ns0ekb867zhoo9c0mxguuorkd0qja15hs4vsgjcfcwyreoz2q380g1elo98ufdacoofm6w1mqi03blkik7m7in5bi0o9ww6tifuv7xtydjb7zxe77aq2pvgjc0pe4dvhm',
                        flowInterfaceName: 'c2fif58cc6pe01ec58ga5dmxkzj073gbvbzl73dmz4loqrupcfs53uosnt29sz6ggvfdjmqrd6kf9ftncf8kimhucwlpd9psm8kj4rmzgcafonbigf16uw3gwzgtp9osfgiw2h4356iinchv12en6uvc257fwi4l',
                        flowInterfaceNamespace: 'jdw9rm88wukeqm5jf86lexpozy020l9il5wdqb180kiedoujcjf5mv4uov2fqttibibyagbetdpbz5jpt2drnbccbe65ufpilxibajw4zdr4wkfwrrnbff8aee3ekt7mmrne29v9uaop57njrl1iyj490di2tlho',
                        status: 'ERROR',
                        refMessageId: 'tb48hw4h8tbppoafvzf94v9n6uz1vcg29zl4c7wcr65ntfly1nbjbscge5ch9k6i2voxyx9qo45b3i0cmbrxio9i0cokk79dk71294r27kz81zywdomj1n2u4jtz0znsvhl9m5ta4rp5mz9jqx8ox4vv91j6cjag',
                        detail: 'Voluptas sit rerum. Delectus qui vel placeat adipisci distinctio. Et dolores non. Voluptatibus voluptas eaque at. At doloribus corporis at quam eaque dolor. Tempore praesentium expedita et repellat debitis voluptates rerum quae commodi.',
                        example: '8xru2myetfk5axg9771kpdaed83vwsjzzrxc467mhc5eei564yt1xxbpc3j14ls8lcdnbj9q7af38q2yxe3q85z278et8wiw3zcxj2am9pi0wxvbdyh1cg6f2b7ug7bz2i7qj04xckt8v5hga5lim726n43be0wg',
                        startTimeAt: '2020-10-23 03:30:58',
                        direction: 'OUTBOUND',
                        errorCategory: 'xl1f1bd1alepa8fzpgjgwkozzyorvwgtuzo4awjyh5o0fowofe9yi3i08ng3dltu2hf1kqd77uacg9rzlzruz6plvfl4yr8exisi82ybe6n8jzjem4ok1zqavt4opmmmd9x99htv9ilvirsxjlyxwowfsdv310yt',
                        errorCode: 'tvu7lrg1jbqsfdppu0pjz98aj82ofp2ybm0dqr89f29i0mko61',
                        errorLabel: 133562,
                        node: 4520948361,
                        protocol: '129ayudjexn2mrplhoju',
                        qualityOfService: 'dar33eqi97odx8dzddpc',
                        receiverParty: '0ugz23jwvuqtidewqpjuyrfm0k4agm2q3d303bxbzqht0ywe3t1uv23ui984qfakgknojr8qzk3y10wwux41n4qsk2qt04pmes0alpa21wtx0skj7fxs2ylgb2enuzco5t2keo75akzwbdrs2s2ykmf5bgx2khtz',
                        receiverComponent: 'w67yv5ugbc0nv2pbvw443vejmqnknb5mmio3jd39w851likytl4y4sq0wmcie3elpscv84f0l8e2jyvzy6xftl9qk1z98c01aygnz6678c3icjn2kjhbssw17d4qt7ts3mvgs5nggu1lhc486colyzwmvto9ent5',
                        receiverInterface: 'wi33vlhatrfslqegbxv2mbnlwixoaq4zwo2k3e3pcwh7bn6y7iq2cudjm13phomyiox42z9i2tb3esbk62mljuv62u8835dkpiyilnfa1kj1vka4twkegulotpujc32qds90e2jhcjchmb0irh4bk28onw6stzwq',
                        receiverInterfaceNamespace: 'czea1n7kmk03gpzvhr1uud0c7awty8m5mshzb93f9rgjup3jm4aknoao0qmg16rdkkka76hqayyt6rn9ns6a6rj46avotikluk0k8rgx0szneow7egoq586zfa6uosnj4128crdqqjh79pbqxjhh7k0u7tv0x9xq',
                        retries: 8234846429,
                        size: 6606367459,
                        timesFailed: 5878469182,
                        numberMax: 7394190625,
                        numberDays: 9092518404,
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

    test(`/GraphQL cciUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '53de2976-3362-48d1-8b27-5841b7a049b8',
                        tenantId: '340d849f-8258-4900-8156-0610c134bcca',
                        tenantCode: '9dhv8f84kktfbucjxvcapm0ps7wsynwtmrhm54aivv9gmdzvlg',
                        systemId: 'cb8afd66-5187-4eed-88c0-97713bc0db22',
                        systemName: 'szjxe7013tc8r8jhixcw',
                        scenario: '73lilucm2iv2ekvr59dsed3vf99hsv0vo06bum7ega5b66gf08rv01eb4to0',
                        executionId: '7ce4568b-403a-4b2c-8321-8aa3397dee43',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-22 23:04:07',
                        executionMonitoringStartAt: '2020-10-23 10:20:02',
                        executionMonitoringEndAt: '2020-10-22 22:02:48',
                        flowHash: 'shionicr286dqzok6hgw5bpzri70z17nvjjfevh8',
                        flowParty: '29jwo2hsduo1bb9ry0kd5errzbbynjfduiiu5zvw2ek52o3009vrbvcdazdnhrxiwu29o64qv94u6k3toul3zp886yjwk7fds7ws9g2w3ndvte6ausgazyovdhbco4e2rrjy9fp05cqv6jrfnykwpuw3kk6am0e0',
                        flowReceiverParty: 'edz4ky56cgeyz015eft4zwjr6dxj45qk1jgpl0dmko8nakkfksjz7nngeu5f8x0d1yo6uv8m0b7abdo23gjrj21qnjjxhmz11gmz129klokacu18nf57axb4a77qyafw34rtf9r2n899dvvjjvij2s7hjyh307qj',
                        flowComponent: 's7qiw2pyuc932eb32xkmfy5wp7g9atqn1orwvvx8h2kb3q7lskih17ijrjnhfx5b59pk3g6ihzfs0izh44lo4ayctcyw10pub82sgju1hku2bssm3qe8glcjxz7mcb5z9oyovyiz6lwjmofbow27ppwriv0sc8hd',
                        flowReceiverComponent: 'rznye5r9dybafwanaueoazvuec9yoo9ciu2r74frjkuaxm6pwn6z1y0ua7l2750m9c2e4sf4p39wlrkwiq2c5l1c647cfr3zgmoazx1effr2ja4dojh7oss73l6mvt8y9zexedhnozvkudwqbznfmtz1otalwrxe',
                        flowInterfaceName: '7wnzu0b6uvmf4a2i1cr9terptxcxmo6owatqeoa9usq4obfqbxcdsgo91sx2nrifl1tr2hv1dtsu7oal4b6pbt60avralwn9s882ewk4fi5kphd43gbikf3qn3ivrjhbr6eipeiu94tayg2g1tvk8l5icn1n76kt',
                        flowInterfaceNamespace: '27htswlszatvx310cs1k9ms9xo6y9p6w3t6ap4bebxf6usk1s27w7rxe3rffnh4gcyyw8juo1ru046rrv2hkh1hl82e0a5yavjwen3fzjlaxs7rz5lt4xbxyvla33gtywrtk5k6zasxvt9lx3h1m2j8cszxfj0xt',
                        status: 'HOLDING',
                        refMessageId: 'bsnuxlyzd7i2eexv1ugg5uv04cca63ddi8g35kb864zlif52qn5b98fjqi513n6kmzgogxxy8dltt9yqav916bnnj8uf3sab3xj4cw47jdxrbe8l3bepop3vrsygnxthobt59fx0y8cb6jzlwuoho5xtiuanzagz',
                        detail: 'Dolorem itaque pariatur est ullam sed laboriosam. Excepturi et aut dolores dolorum officia velit. Est in commodi officiis et modi nostrum temporibus enim in.',
                        example: 'b09nz6438jdjyturz3by8npbctlsssbe83wjmyfoa2v2rf399nyy6i3i7tykszx9dgp5ed1hgr9pbu542hz1zcvt9izddrh7esv6nr23npuqrxsts0ydlya5ej1grl9noccfhjvq74ifh4lswa4ywusjx5w94ze7',
                        startTimeAt: '2020-10-22 23:29:33',
                        direction: 'OUTBOUND',
                        errorCategory: 'aeozvbiyerrjpluu5ygwy0lxja1i5mj5pjf66o27k79h45unbgzxnzmdvw1gb98yx763pk806pd1kdahesphsfkav2bvodz5lbbdvn5cdhwqyynuo2d8q7w6yjgkc221yuumc4r0m3bkyniimkvx3d0epm5p0h0n',
                        errorCode: 'k8i7noy8gb9l3q6yjwjwjem686k0i3dfnxdbfrwqrd89k0vpdp',
                        errorLabel: 803609,
                        node: 6184598404,
                        protocol: 'orvrx7md58oc2wjo6sls',
                        qualityOfService: 'iekjjcbqol0meaa8u3xq',
                        receiverParty: 'dtat4i4g351svvsds5obe6veaed1mp24j6amvva7ot5e7oovgu42ky35z7kq1q044z1hxbrq2o71kt8vvkp2wv2jjamot6tg35aj0yv6xmuo63f4s0xry5bup4bjxp4kfozti7auc7wtpgvgojqw2vb83kzbel7x',
                        receiverComponent: 'mdfd32c2sln20gdlyx4bs4wtc643tipgdpo7d060rm6hcgoac5r5pynjdfy96m3mdeyoxz5vuuc7gctjp4ps493jxicrswaqc9l4jsrv1m1lpofzbirlbn8oawy3wch4g6ht3qvpntm624tt1323snw3wm9r088d',
                        receiverInterface: 'mzyyelaikqojq3vy38mmmnq7qh3s1ucamcerj1b5fdhpklzcdepxcvzqavoe328kz2pbjel87f1hnpybdo0rwv1n4lsrbzhlf0cp1besolb0uph7y6blcjbg12ajlvpqxil4trmdieaetzis9n0jympv0tsdbjj6',
                        receiverInterfaceNamespace: 'kx6s3yl3aiefpb5o5nqjob4513juj1kiz877ioiuri7jhcfglm8tr31hfikqselil1gdhdfkr98s7eui2k8sgar6unu900y1krqefnmvy92gh0a0yiwlnxu4fcyljsbnf3g42knyymkgdf2y3h9crema5q57m5eh',
                        retries: 5392082023,
                        size: 8590034840,
                        timesFailed: 3207094939,
                        numberMax: 7750918560,
                        numberDays: 4140027390,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('53de2976-3362-48d1-8b27-5841b7a049b8');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fcc5db59-8fa8-4d39-a178-d7a0a7e986ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
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
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '53de2976-3362-48d1-8b27-5841b7a049b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('53de2976-3362-48d1-8b27-5841b7a049b8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});