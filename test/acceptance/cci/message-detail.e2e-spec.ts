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
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'l2slhx1ug2snbxj1bum3vcn242qoedot1q1p8q2aqiu5auj4i9',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'bvire2lahkn1pxnommy7',
                scenario: 'ipe817hez8uxwwf8wrmnikov8vix2pok9lskvmz9ha11saqcozd7b27vz9au',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 23:01:35',
                executionMonitoringStartAt: '2020-10-22 00:33:30',
                executionMonitoringEndAt: '2020-10-22 01:33:14',
                flowHash: 'm0r0okc7l92hd03n8pfbrlsisc9tu1un4qrr97hc',
                flowParty: '1v4v2fkdgqdik9bxo34r2hvdm4tfq5p8s29kuouuleya93ot351omky9fonm2h5l64h8s0t7cguldc6izjnlzpjtwxlbzkosevw3z89trwi9dcw059g6g2sd3vkmpomtx5po8k08abkytqfd2nnk5zprl675iebx',
                flowReceiverParty: 'dvscpgl0bowsc2benc2n2ou6zjl8a9lf5fh1xwnt5qzludzd45r03c03w00u0v2xjpzd7ya5eqpq9c40n2vswtbtn2af4z1xlh9la6u8hsikj6nj9xkwm5y9hun0axf5v31c4p5vh7kou7p5hkj7vo2g4pl3lx2y',
                flowComponent: 'l3kyprquqx6lvhey6tm4iejxxf87fl4z9t3a6tn1y6t492vk5yv8akup6it27uahf61aenn1b1f5b3lo9elo6z89brfl4lrn4uwh8mxu69sgoj30nm9ci41sj76wudsecidlt5dtivo8id8casfhv0eee6wimiqx',
                flowReceiverComponent: 'g22uk6lqf1283j7ythlf47io15ddvllaruxvsqk4rwmnqtf1r6gsva8nlndlsrjo43jljwj11frga12ihl6zelup94p2otw37mnqwm5b3iy70bafiw29zcw613ke05xx2xd8ur59db73c3x5t75q6o2xzme1vasp',
                flowInterfaceName: 'x9563lkmfeqwiflrflgg4mtz9zzpokmdbbc0e7z1f0vtr15w7lgjcxggboicabluunf3980wcbh0i7otkkpyqd05noqs0fc63xlkqx25vs4p9ohxen1p2q8e4czunmydrqli8txl4u263sfexcflq9utbdwb1d3x',
                flowInterfaceNamespace: 'r5p6jygby9a7pflt0tg7gdf4i627iki2qmb9bemu9jqx389udylupq3p59w6hh3xcyu65080663hr13xqthtuiwqwwcweishv969silone8e30xaik0jmf7vf3b6ge1s3def7b8tudvqplrgkgexga9zmzv588kc',
                status: 'WAITING',
                refMessageId: 'bcogfjf99ukqpcajy5cbfe0xphi4i9xwl3cxot960dlrdg2izq5gxyk3506nceu8v7h6amjzplzztwju6hvs299cxtmohvm9t4tc3i8uz224l4y5089f8ts00xp4uhziporydbq4udi1t9htdgs9s48w2z40kb4v',
                detail: 'Quisquam ullam quidem aut quia voluptatem et exercitationem. Dicta praesentium culpa. Assumenda voluptatibus veritatis fuga mollitia eos culpa recusandae non quaerat.',
                example: 'aqpl3w3pyekq0cijlmz40teoag0dkolnweqzm3eajz3n9v6qdahssh81hoids71bcs59uz7b7s55p0lbh9rfcuapzsckkugq5mg4ot0mcmypu4rnm1f730yr9i1bjy9tj2k6mcmfi4uz436l86w3pvmy88fi7r9l',
                startTimeAt: '2020-10-22 10:17:25',
                direction: 'OUTBOUND',
                errorCategory: 'fid2995v0ty08v7tg3bdp6eaagqsvg33bczovfdovx60qhubye8uqb5gvign3j73m7f1hsyapcp6i2ct7dntyy8qmrleqpwa0hbf2m5cqyc92vcq77jr1i8tqjsyg9kq0c4mta7b9hixmt04n3bnb1omz57n6e79',
                errorCode: 'wlmkz61r3x3l2txizpm76c3wlg4gntkew8c3h4j97qmc70dqpt',
                errorLabel: 890763,
                node: 7386595044,
                protocol: 'azp1cg6ku5x8fd7osvto',
                qualityOfService: 'xuqrfq35hzvr09tgexfc',
                receiverParty: '0p3t83hzb8ulkfn9y90l5ciwucqbbm68ckq8drykpovr54oszvwofexitgjjgvoxd1w28mbf26qngqnpaxaif0l4uy4uz85urh6nsotzyt9qu2d7llh3jcott29i3ri0v8rw8rh4jxgt649fse55o0zv9j5nc5ww',
                receiverComponent: 'bseb4ny8qc44ytypukophuf97dw1lzkrfk7u0h6jps6lzwg88kbdb3nt4qc54b3g0xhgag5i8w6s4rrq2c7x19n043kleayhv08yhkwezqenslcuunw6xwug6fnhdxgjbb51p8r8g2t3s0s3eb54s7e9gjvpggc2',
                receiverInterface: 'eblkgyr6tq9nxnbhb1presw8rbepowz0nnxl781230hg0gqgzvdqnf9ol0ppxgvsbjibmnfgruq4up0lgnk7r64p94w3vedbmhsjkxc8s43n6tzfdkb8euuzf13plmkdgbx812dpw5xwsgskotqn50v3aq1snxtg',
                receiverInterfaceNamespace: 'qd6i8cn99pb7uely0wob38uif3i9l0ra9yavfjn3db8sq8v1vp98ll7jwhq0szewsysezur2nnqztzgxnb6j8db00rsi3x31fd4q3bo2hkyoexh76scxms22t4n1ailce9xz7ioukkvvdzy9u3lmm3r17c6ebv0v',
                retries: 7818952706,
                size: 3447280973,
                timesFailed: 3980336348,
                numberMax: 4541700857,
                numberDays: 9309308497,
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
                
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '6dobetdfv0knni1m2ysjezvm42fk1bkxjuwtx4fsf822fgdj32',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '2oxvjldhdbx03mbe2t0v',
                scenario: '6pdrpdwlnuqik3vx7ja4dbs7nxqxbk2853ksw1zfd2gio2kjtvh0sqplpkzn',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 03:29:17',
                executionMonitoringStartAt: '2020-10-22 07:08:55',
                executionMonitoringEndAt: '2020-10-22 17:38:08',
                flowHash: 'ky22bij6rarnrf41hghux168crrk77e7by6ibzo5',
                flowParty: 'w3vpp2yzkygr44vimnennr1saeuyeqzcwfd6u0s1dlcqq4icwdkmsc422hzo7ow9kcvxoo8ohqn9k3094toy3d2xlq8rdyiuoujut70hyp97s9yqu8ehkb844kiukvbp5pc3kja69uxggfd4vlor8sll1zjt0fwm',
                flowReceiverParty: 'ki985xoz1fvv32g1hg06nzxws0fut6hsv8g40tqjykmk6g7tgxyf353htieh06fpskdgprx0r2zo4n66sr3ylb38ahpp1nciydx0jdid14dvs37jvz4u6v7f1cfoork2cx83zre47m4vbloixv098i17wf5j9cka',
                flowComponent: 'yy3hj20a1w86ay9cpaa3h8shdijn8ike926twx6n8fvd9s2q13fw3ya79yea14l5vu0vg8q1dxopdp7g3fzq5xschgtvde554b85ak44yhwqnzxu0onvdfeqzudx9ryrv9k7g4tbuj627op0o5h6bubyv7wyqz9e',
                flowReceiverComponent: 'dtj1ogdqnh4w1oppxg3pf44ku4ktvhr8g3gt93335olkgqw6273hi890p77vi68rnz9ouepimvz8sgyyven488hj5mx481tw1r7silm4yzwvtqq6eqmhq4a2vdk3xcoxcx1cqv41x1ye9gx59osi990k16e8mhqu',
                flowInterfaceName: 'qo0wbfu04cnzdv178k9919morbhksujlo7v5w1jdqamchneaih3welul4j4qsvkkr9siddqtq1oddfus4bokn3n22llsexkcid8pwqe2dgnxqe8ueh8kbyyvm19p7h8aira87p12vbacpfhhpua22i941p8ahenr',
                flowInterfaceNamespace: 'gbs5bahwq8pofqumnf4jgn25gj4xdxb9lup2kngk1n6u6a1fcprvfe2m0njpnz94gevlurlzvyomjtp0veew1n2cmdpbjcgmekolxlednunovjnm42k8xbiy946fax1jw9zwdvjq5d0kk2rlt9etdp9ooaxpdozr',
                status: 'SUCCESS',
                refMessageId: 'n6ubx6pwsgvp3ub4jkx0kns951ogif6kg13avm8nhn7kiii0euerjy8jllfdjvhg2kvesvanb8hxuzsmr2bb3oemjhqn3siduilbq6njavefhdgpibsh09fxcjve4bugvtuu7564bhpwuu9x2n79ypn8810h3ckh',
                detail: 'Dolorum est ut nulla consequatur aspernatur. Pariatur aut expedita. Consequatur dolor et ea enim harum culpa magni. Voluptatibus distinctio eos est vero eos sint dolor consequatur. Corporis ab nisi ea natus consequuntur voluptatibus.',
                example: '7gbigstilyd078cyt765rkw6one1i3wktjdf13toxc8uqubiu7g8wbyaiggn94bwfjlwmjo40txz89rb9zmelo9fhq3rzz0fl0kqclst17j1yksbj0cowjf8ryizlji50xzavnk892mi953h69dbgbpbknrrfbh9',
                startTimeAt: '2020-10-22 10:11:55',
                direction: 'INBOUND',
                errorCategory: '6u5vkbr5wlv2frwejwi5i2po1ef7rqzo70yd6t6vflwvd6d0pqrqaihw93tn0r3d2le6p1ubcjes5yjyahoompr9sxtrnak7mt20opkh7hmklc5zrpziktalfem80pg6jqrlou58jq0v724dp90xckc7bbjvdp5g',
                errorCode: '1oc2i1jicbycuvyc4fvq3ddjtomnciuoimpr8xv441d51gafbv',
                errorLabel: 152086,
                node: 1694101699,
                protocol: 'u9go81ss7gugeewtp451',
                qualityOfService: 'qbl0xjxxlzoxspotu91e',
                receiverParty: 'zcnmxeyw97mj1qncu1oxv79amp6cv08gy3qsnld2npzny4rzffse0k7j7cedx8ywgpqr2zd129gxnefrvnimbv2k8wqowdruncpq59l0pr3bq3woyj1nqy25azdjmw8vv3k6d95kgrz9dz65pwn9swyjdrzlzsob',
                receiverComponent: 'rxb6q5q1wz0bvqybt0gzdzaz98axn9c61jmw9jebzat4w8d084mp10ghsv5ndwg2b97x7wrojhwl45t5bugpbkf1rb5i85ej8yi8v824btz63et6aki21sjib7xtbsjb9d4pv7btp9eb7qgp3xt6jtr9p5e3ylua',
                receiverInterface: 'jmv7uglq0anr0g4xbevklx7w6ofweixzu4wt28z8nxjatlb7gtboky8fxa6jfzgd47irg41zlqkpd6b23hwspae8tpde9bypk93n2sbmqwqfdutovkn81a9sz46b5oy9ke4kxppgjt6vh7g2tdsq41esma6z0zsz',
                receiverInterfaceNamespace: '9buupttqbuhclt2my47rxlw64iglr7l14250hhmvgn9ov8omilww3z38geffkgncnxpvmozqn3k28j12uohq9ui89p2wm7k7vwojw5wp1vwftgq9s42dxc5u28xrz6409bp4shj2to29cpi2qs46lcphu7ky1o9v',
                retries: 4270975621,
                size: 4260008410,
                timesFailed: 9639087269,
                numberMax: 2514972278,
                numberDays: 9476851424,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: null,
                tenantCode: 'dcd7miyqzpxd8mw5gwm1jepk15x91cpk72dph49hhza2t60ble',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'o73akt7blpku7k85cmat',
                scenario: 'vabpg8idhughx3nimx7xqt4zdxyx6f9kdu1j32lbv3j1phqk3gnxb63l0mup',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 20:59:07',
                executionMonitoringStartAt: '2020-10-22 12:36:45',
                executionMonitoringEndAt: '2020-10-22 00:34:39',
                flowHash: 'xvlj4m32ehtb7taf8li7zz6263sx20spsa6sdtfy',
                flowParty: 'oixlr7n6xco8tdcsmewclyur0hzh5pvv1tqmzku19i64j91refkmh46aq2w5e4y0i902xuf6vec9zaxrf2dk9ef90sqmhdjpp4b6jeszhsdnia39b52rd8kl0r0np6asvirumh5ouink9htodq3nqj2o09fpvh8w',
                flowReceiverParty: 'ffzzbyh8d7234pdoq3k7o28ftzrp3pae57vdfqgoy66fdo4zhvrvviej9sazsiau5z549xnmqaocgagz2mzlskqf9uxghntf14rul4v18lba3wjyfkdsbhazfgvksk5fxgrdjebsz8iw94uc4ckmgzzndjx2y3t3',
                flowComponent: '45yjgkg4kcu5mbtvarc0g5uzv6tj8qryonwrvzopaipjleync5pim7uq2ndd5lkxvezo27uft3ypjymc7igkw4nn6x9y2n0l0vdnkie82i2gp5lvd6tt09210b3b6m51h0m4w39tlgcxv14euq6xs7t0evmlenym',
                flowReceiverComponent: '5ynbt8evqlprtjptpp93wkb7byg0b54ae1cmpjhxdp884i0jjz65l35y9efdpdp1qzdpit6grbwgvbilyuobadc2otd4yqkg5n0rgunxxahhmbmxbaahst0sfrhmheqj9j2zbi40spg4dkuqb4w5dw8z53ikodak',
                flowInterfaceName: 'aooapr03ugdemwy15g6fksoyc1wtg2emgb274bssq9yjppkxqlkcodqsnuezhbxdebbvj2c3hpnqdapdanbscua3b2rvj6eqzi76gcmelwn2sqlqvlmkxb8k7m8vsi8gm4ozkb3lxfsztbnsiz7i8gbbasikzi51',
                flowInterfaceNamespace: 'nrpkahj8wkmfnwd5j7lwwy9vy683nyex9jv6mmmi8ebtz39gbfxr1o0em4sp94se5spo412ft6d4i2rl69n4c75poz38ns09w7x9tnbogwy2hwbvmtvdul4wyzucaay1arxpgui7hif4jlrllgy7ikbqubja4n86',
                status: 'CANCELLED',
                refMessageId: 'wec8q68h6j8qe6ocufjghv30xjbdhtsj0simufetnidw6j3sza0qnfxx83n6py58i3mjnnb6re2utevyxuu6z2v89sbv8okb0uj9kx2ko4jgruxvl0cyl0ofci33qq2zxj6729f9ayznmxf9d2sxx32qfm4zj1ms',
                detail: 'Quia magni exercitationem corrupti illum rem. Consequatur consequuntur aut saepe. Ut dolorem dolorem minus distinctio.',
                example: 'qh73js2hh0qyjbydalq7kjfx5kp1lwb4xyjzo8djbe9am8q4yvef8yzpstvhtce5y2ya1zyxzabv2a78hbhkr943ojf71mw3d370s7ad4ywzfm3qd9f80yawbb2cnbcmcwaesfn6wxpj2c93guuf0vx5jeqk6lmd',
                startTimeAt: '2020-10-22 04:26:26',
                direction: 'OUTBOUND',
                errorCategory: '9wzu0tujv8m0u1bunsobmyqkvzu49aqi05c0gxkvzt44vdnwq6f7w7b9ka4ke4c7gxd5in0xeavdkddunv7gmcnrz52x5kqoimgin52hbeml5bluqwor0qjquy5thpm8xeetemqt6rjsiom6vpn9zdnxg0herfxq',
                errorCode: 'pu872btmpsx4doy7qtalkp9k7exdcg4uy3mtymyozfil0pn76d',
                errorLabel: 253272,
                node: 9886070068,
                protocol: '1fsftokjmpddiavodfgd',
                qualityOfService: 'vbvggz8rh2s2rt4p63u6',
                receiverParty: '54lowry2j7c6etbr5clepmudovcfvqbvb7k1js8y1trj6mtu32xlquf573j64uxsou26t29row91kaf7t9ieyhcydkpganccz73qf3sp15sfz4xbmf0k94py91fttni8l8y640d4h5ng5m9epjss5w3xqb6d1x07',
                receiverComponent: 'uad4vs98tijeqe8xoxwzemwmmc2moifetf3o5s08vwrwyky0bi0u0g0pnjnrr0iwzafamx5zymy3wso00f3un4ytto8lxfqrl1re6wbxfgbfq0acnxwx524y8y4g1m1lqp54uilp2xw6oumh4lfik1norbb5mbde',
                receiverInterface: 'f21mzjdgj7wcwo3n06p0v553qj1fq8mj2qaddxnp47ncouh9vpuvvdscoy8d8coq00enx74efl9nc1ik1eo7mixuoi8hgkmr88btk8yc02lurizbwsqhwwb7x072ttdkllga5btmcw0x8q8tqs0twxs8ejmx6l9q',
                receiverInterfaceNamespace: 'yvfzwylqmnno7vmgw7894wpvuf2tjek1w8g7prpt0s2w91zgmv3y9o5s3lbd58khkpw7jhuvarty6mc0ob6mw8pya33yp42xbsbqovpz0jz2dm0bsdgbpat90k94lp754whumsrex5hszkfdfuo0eqnut4j6rnz2',
                retries: 7908211791,
                size: 1599920207,
                timesFailed: 1333107682,
                numberMax: 7730276808,
                numberDays: 1872698205,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                
                tenantCode: 'j7jtdf7zf9m2rdqwlxv5z64eq62m53ywf5022juh287l5u8jj9',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'gm27o4rzc646u9bihtpr',
                scenario: 'heygh0f0fbc8kf3oyokn8ethjw2cbcrvjgr85eq43h9yh8t0zf1dblyt29y5',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:19:57',
                executionMonitoringStartAt: '2020-10-22 10:55:35',
                executionMonitoringEndAt: '2020-10-22 12:30:21',
                flowHash: '1qe9ye93lm3692agr9w2c0uyf7ukjyf94kdp1wai',
                flowParty: 'kqam2zjvmmbkxx74nzr6h4cn5m5r7hsxodhfc0bgx9o64sce328qz40cywinoc4p3moev2jxiyku5tdb7xbnbju9kmjk9vkkw6pakik0wtjuznzg39unpaz4qtfqrxpyeobkywco1u7q7ja4zg72hs0rdz42npyr',
                flowReceiverParty: 'swwa9z1af98e4xzv6qwh8aktlbee5bppliu3peka39ek4xtjv6v6e94r0gg1pzshrjlbfqooq2im1sxgxxb8vfregrxweq1op5y6k3jtz8t9lh01g93a7wzzlm6apa5vvm7g3n05sp3xzwpsvncgbjvm2try1x6a',
                flowComponent: '1x6u9c6gmd1oovqwng9v9phblqlnskzwony11axsnb6y4q7bkas6bj9w166df9lqhssbgc6gxp2lrwsm0kdvpgmo9bqjtis9vijqsgsxjylxa3td2owue0entag8jd3cxn3c3sv3nfoary9wemwjk6d7bt2y0ugc',
                flowReceiverComponent: 'sefh3fjhbxh66k0faptgdeb2czy2kvblhqpfkm51uiaopye1xobtvehz8a248d061d5yh408oiswmhqq87e6zd22wo2rdt04lyvdkm36r1qzlyiwcofz9o5ait8w2l94c1rpar3vw2onol0662yw9c4c7ce5o3cg',
                flowInterfaceName: 'qso84d0f2vm2t4fk2e76qnaoy1071tbnshhpoxxoufjzl7pcdj6q3jnc50g87z95qqf92cc1zdp4f4ojn37gtkmx4gkkboeosu4b7fs18gltwkhoce95wtynzk97p7sropnaxqlv69sz0imwny7zj3hqul98iccm',
                flowInterfaceNamespace: '0514w7t11otyznsoc055vx52yifdh1wjkf68w610qk896k2onr9smk6mb6i7e6fvyfta39qe9asr38bsby5jovurmw4mrc3rhhn2g9sjdwi3rhdt3swuczrt9ij9aftdmwcvnz72lssfp9n7sr1g6x5mkfi01edk',
                status: 'CANCELLED',
                refMessageId: '3wcam7ib7zvnq15bf5bjjz303z8y4jhjjak7ck3javt24bvm86sjjuzjdzw3d122zmtatj7rrd4yfio9wbi6r9ihbacvtln1l3zcyddfpw8q2xsecpt1jvw1vjhuxbpuirn7i1hwim9k6nh2u93e50qrdy1p1tgn',
                detail: 'Velit consequatur laborum possimus. Ut rerum mollitia voluptas molestiae eaque non. Et totam voluptas impedit quos. Iste at sit voluptas est et aliquid. Recusandae delectus optio.',
                example: 'kgpkfk3xv3x334skuy15z164gkeehpft6p1a3s3rl4ol7lliuqd9jvtccvh0qjk02gehv5858nhu8s9ph208m97vt7i9dk62drim90p6mvti0c7ciq1rt0my7qvh9q690pij4eburejga4orj6q5rfq11actlx29',
                startTimeAt: '2020-10-22 05:49:00',
                direction: 'INBOUND',
                errorCategory: 'byuzrqxpt6wtgp6gbjgyb7jjidgvruvurgutayi5j2dg6r4uabxdb6dz5ztoipg07wj8quq61x39zdzsrxjtnaqwl651shm0zpzesumsfhy0bcefjwct7b6o7oilcrd7x01plio5anmrjsxrhx1ei4kfnjg3sr6g',
                errorCode: 'f4wbqpcgym3ymnrygq120xjgznfvywcwufaj1wo1j1y5pj296g',
                errorLabel: 906208,
                node: 8026266207,
                protocol: '0w6c0ss4ds0njj6jy7pg',
                qualityOfService: '0h7x8ltfpampc5oojxh6',
                receiverParty: 'w2y0ym4hj3fobkibjhcktvmb9nk5eed1gvtymk4sfczhtggfbh2l1eoyjooila7zaxzymkgavs6u8v134v70wcyswk35h8cyvjddl2yxdtjhhqp6d6ff116eqocjfuanu28f10frsveem84lfz77fqd9i29p7bfg',
                receiverComponent: '5sm8ainjxbkni0vl9jbj807h5jlp2sfrugavsvsers9ogujj86u374vyj6m9u1gs0bk8iaq26xlptlsfaitufd7onkqkjus6uzfyia1hdkzhcrcfjseoyj6kwnmuaednnm3j22fzqe8ncktuchx11h4gdo9mayjx',
                receiverInterface: 'cy6he1re7gujbsc1mdihjzirvnebyr466cdxevmh4575glmv3hbs1weuxqlg0x3ch5l6krbj04nbri0k8e6fc3hv17x17y2q63bphc22bdd7ucbbxap2dxl4uajlmwhsbtvvi0j7i18jd1513mg2bg2hc10izhr1',
                receiverInterfaceNamespace: '5a1iw0r95sfx47wkt8n8g6y9dwv586pjcshfkh276a3fdoif8dvhw0qt8h7rne3e99kih7sj2zv8d6syzyhgz3m2t1w18iub8iednctdhtb8djtj0repi7k205u3jj0jtv5unlff2ki8ltje1jnznwjvaizegt1f',
                retries: 2680782437,
                size: 6541780040,
                timesFailed: 6883357971,
                numberMax: 8806730157,
                numberDays: 7817278086,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: null,
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '7pypviuljwo8h6j32qvr',
                scenario: '0bbne1d9cr2ytzkzjtr44mro491ri50y3v92xc828nbyigwks7t08a98wdzk',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 21:01:26',
                executionMonitoringStartAt: '2020-10-22 04:13:29',
                executionMonitoringEndAt: '2020-10-22 10:40:24',
                flowHash: 'nonjoyyjnuciah1cv75ineruyj0nh9439v4f5ahn',
                flowParty: 'lsdeqt78mapupf8m2vsrf37t3d9oemop2rndbep08prjrdbu9lva335s0re5f0rhl0scpfidx71e0y84xsnyf81xyrijs46vhvdflayjc9tr3it04to4vdkybmu1aea5093i01az9pntwhosjv0zcxsk6mo2u4a2',
                flowReceiverParty: 'nvrykcuztbljvk1wg6mrjb69xw3pjfzftsmph5vfvaaggg9j1d26wkdk9id2ie5scucns5duf808df0sw4to8cwh41qr0yudzc5mfyyqjis2wmbetbxvzuxl3l8k0zvb28yi1jplyffmhojvk8y3xlkqg9aje55w',
                flowComponent: 'bqwwd94g0rirqrpdv2wclk6wsahyuszq9di5e5x82fmyzxj5efubiojx88xkx3rtsj9gi2l65wbmxor1xf3jbwjm3b2369lfm7tmqmgtnizea8j2krx3vxcvxkolvdxwkcjn4c4srvocbv3lnfbt843nwotlzala',
                flowReceiverComponent: 'ohm6xkak277uflt5vy0c2gnv68fnyafru6t4k8hwtdpwffv68oc3j81fulovr58tcg88w5jsp0c7jhbqpuddvg4hsfr7mwg06fclztqda9jnasnfzysn1t2ht68fo1ycv81p5ugwo0auna7aqjnz8jmbc2g4funn',
                flowInterfaceName: 'rszig566zglv4744f8uriyidgbp9b11govpgtm8yipvsxkdi3b4md3gwhp12ue2ecukmr43vhc3siea8y2pp6314hiobw16cnhu49xjfvshzksuq77modnpaid3ayzez61ozaf3x8p6tgjjo0n4nkfx1az4is7en',
                flowInterfaceNamespace: '60gw2u8zyteqyba4j7gxakpcpf3f73dnbed91qfmpofr8exgjdcjg9scs5dp2fbs3cmsrawdcbz5v9u09r690waf4h8fpf6mfa3rj11c4yyio38etzmsg0m3r5nple447j65op4ah21w3ggqpt7nukswh191t14w',
                status: 'DELIVERING',
                refMessageId: 'rugakad0bm65009d4ftbo3jye3y7eiyj314hayyd0byeifdyayy8jk8rn7s5zyhnewpnyh2ij09s7apc7xxl7eo1k9yrnfjumllp24j3mkar48jzsbambfwj6sms94d6xajo2188ddkuzngu5cam438quwqdmkh8',
                detail: 'Ut omnis cupiditate quia adipisci. Eos fugit qui numquam. Cum nemo debitis laudantium. Sunt voluptas dolores porro deleniti animi iusto. Dolor laboriosam rerum ut laborum qui deleniti. Quia veritatis doloribus aspernatur voluptatum aut vitae.',
                example: 'jrsoz007jxbmbdg8fnz5my77l2ekcw60xu144f9ffh8i9q2j4bpgfga1aznz2k1261ajfoqx5c31n671tzllgtpqozazw3wos1sdj7a14v21j5d0zeldsam2o8rqu8lbm8y16b14e1izu6riq79hcvg1bu2mpoqk',
                startTimeAt: '2020-10-22 08:21:03',
                direction: 'OUTBOUND',
                errorCategory: 'wgk2wfir2j4yqyidbfda2aepm4zftqfdeuak0cm6xsib9ceyb3086kh54yye8ife9nrwwj2j962gwgpc3lw220nemzxrcrg9zcx3tofxdnjsyke0mypw2nb6ogkd9k8132lgk43zlrpzxbit7sy3wgyqc8fqosr3',
                errorCode: '606vuwps441su19czc2jozwux7dv4nswtahbk142400mi5qog4',
                errorLabel: 606518,
                node: 1026719693,
                protocol: 'jxvfvbx0obpf8g4xa4b0',
                qualityOfService: 'kgssyyyofyn4rkliyvyz',
                receiverParty: '8xm0pz8x641jakjlnzp1ce8ydus0d0ecd9axtd532xgz0t03ht8ryf1oixnstfk8w88sn6hwyk99mod4l0fv3tpcmisxtgxz48mfn6pw9bon77k90ysm91eq6l51bdckc45wpgcpkd2mzab2deu1eoy54cyhjt9z',
                receiverComponent: 'l9zv5lvso9bvox7dnvjyl8two1ty8x05cs8f8pals3uqae9g3qxmy9ramhkotzz548wfnprklr76jv4van9lr5sgi2ke19lwkmtrpdg5zqg58uzw957wpzwwvhjb0gr4i9kr5gkqmulh4u0wdyqkezivxavggb0h',
                receiverInterface: 'ioaf5jq1p8n8efqkou5nlkcpqpzr0t42enywxy6zashj9g7k39c7egcjnkbmkzzljwy6jb35v3slahfvah55wf1bg0k4j53epdrh8ni5hev3xpeswb6j6evr41sag6shz8ews2wg45a6qm74uxkg2n6y3x7qyqt4',
                receiverInterfaceNamespace: 'nz8392vwi2azxwh7cmfbwd255j7rgsxqm31uv8xggytka4c5hfthmlmemw81l4wejcgyw0nxqimgdpimnlgnqudwdl5d8eimruqafhemgv68f64be9j8o5wy26tbub3vmp92kf3l3thtiyiuryz73raqsqyippx4',
                retries: 7543710411,
                size: 5986517541,
                timesFailed: 3926922385,
                numberMax: 6703942225,
                numberDays: 2937381860,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '2js6dwrm9pb45ybstwgq',
                scenario: 'zmws08g0critnn52cvb9jyuzim5dgzh4d4f6nzhuwjo5jh2fvkjwavyimzwm',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 18:28:33',
                executionMonitoringStartAt: '2020-10-22 22:01:02',
                executionMonitoringEndAt: '2020-10-22 02:19:36',
                flowHash: 'gt49hbl0xxgt0xlihabj0qlxuwpoup2mvlgprtw3',
                flowParty: 'i50pg3r9mh66az6aoxpzw8a6i0adov8zkd67u6vbj7npoc4bh62nzbrq52cjiq2ft4bh9kjta2gn7t5ykd1my9npgy13th6kiuc2t63kk3ijsgjdi10uijy3k8q1v0qtz5xecref4mck4kp3ul6l03w9qiszx6m6',
                flowReceiverParty: 'e39h67zp0poy1gqnazlm3kms55hap54ohibstofrc8n4ngn8pp6jyddadjfy7neqkmmml5w28gzdhl94i0c8r76shff0zuh6cc0ui11yo0vbi5aj32oc35dtj2v0x4elvj60bu2liz3a3d1rgouvvrvc7ulfjjem',
                flowComponent: 'y04o2so43v7ea6t281htg1samsvt0hpspmtloyh0v6rxadz5x7ol83paut4nauxno1l2zry20hlikk99unxidto0peh4mml0jg5bv1i6j8wyoon8l6yh95lxapz48j92ua6bm5zv2a2gjzjg429zuykkv3flwpq5',
                flowReceiverComponent: 'khmulpo4g5oku2benwyymp3exipswk12qa07ev4dxsd9e3mri96fh3mky0qgnrko98i9uqis44xo3f43sfouf4r303psx3j2crn8su6pgemxs5k1fh2jow115kj4rowrlmkyhcmpng6pjbaizokhf6ttjya9ykdg',
                flowInterfaceName: 'r8tfbqsjvyn2qx9h47i8lwjhkdgjoqu39cgogk5mg9ucx3qmg8g8y5s6eamdozm2pojdt2tho3odtoqkgbdfe208hgnvnaua0tci948i0m5urv8hmrys2ma28l3vqajgdiwwcndjrrvldvfqg885cbe149h5mh09',
                flowInterfaceNamespace: '4axm8hvt532w7dq2cr1nk2tk0nofwp2pvjnooxa4u2s86kqnszo5iaq26g1brtb4v3f1oddtbiah8qs8q2r9z7zz4f0lhlbwpjdqr85wmwueprigcpu3cu7wmlihke5zz8gtuk2j2aqzaq8m4deu5antegj0n8wf',
                status: 'HOLDING',
                refMessageId: 'qkz9o37ymaur51ktcx72p0ihp52ye80sdp8j7raw1js67z6ebidrkevml9yg48bnb9ni3meiocusjiz3jum75e3w6qzsqszhwy466rzrl895o38v0vqtj1762vz0cr9g4tbzoez2i0pbrm4250wk2cl83bpq7nlt',
                detail: 'Corrupti exercitationem enim unde non pariatur. Explicabo distinctio iste dignissimos et laborum voluptatem beatae. Molestiae soluta unde qui velit repellendus. Eaque temporibus eum placeat nihil voluptas voluptas et sint et. Omnis necessitatibus veritatis corrupti ut laboriosam culpa.',
                example: 'hj4bixbj4v3esxrsmbzvl89pge9p6dkk21rnz3qbsosp5dfer3vb9i7jw06ix5wpeqaosnstfk452547n902cowbdy43ndp84e16phukip5x19ipzgejpc2j3tm3rop917bbk2yty732cixke9234fmm2tlgfpvu',
                startTimeAt: '2020-10-22 14:24:56',
                direction: 'OUTBOUND',
                errorCategory: 'm14hh3hbuwgjfwaq3c5s32ws2atlizu54hxty24r6luf49vh00cmylefryg69qfb6s847rfdegr8eymzcmsugvj7rhgiah6qiz3djyu82om772n6e5yqvh9j166pkm5tyrowiu0d566qd76wzrcckemzw0bn17k7',
                errorCode: '014ulupnaphvx288t6kaw8pop6kdltxpyek1088ss7gfqgksqm',
                errorLabel: 499283,
                node: 2907562044,
                protocol: '3p9bbb3546dt8x1ynlcr',
                qualityOfService: '8q3akfzmkdoj63cj2ial',
                receiverParty: 'ge9kjljwii4u4wj6ui19ktj5gsyaxsg84ufpj3sgzx3ch8yg3gq28wz45t529trkqtojxtm7wm2kx88osqybmz4gyvfkft80o5vsbkt8wvy1mazdg5ydbmt3ery4zuqgwd0ww5xzbs4ya2sp0aqdruvh09ci7l7o',
                receiverComponent: 'bl3om8yvq5kppxmsnzcg4h6w5ug6urajvmimqjoh44733l6he5vhjnbn4y17f4x7nehk9ecxx6xd7o792nftoixjj4q1c2pb2e81q9dcociyxc4iwof9zsb48usxeo092fgfvl2tti6gziql9bcq6ien4zgone97',
                receiverInterface: 'ga6j0l4lvkr2rjbklenzuoatsvu1sxe8ok1st6hoqmltwcg20e9dsigu6z2uxdj6d83whu3c8u6j39lwgtfgu434eoioa0x1jds36r2wtqxcpjewuy8gnayjbjbfu2bd8pg24bo2wpby0ewb6yions4od0ih8elc',
                receiverInterfaceNamespace: 'ey8se53aqklzb8u2pa9etitwjsixvy1uzsivim395n5ww8o8ebeqf5tl9j1bnxo5iiwpkrd093lvqr7bdze91tuhidiss8a5wlodadq9ip0wwca32mlya9ngt7vlb41oketobcgumdp68lytb3oqogd3bmyn45r6',
                retries: 8247057896,
                size: 7486478600,
                timesFailed: 5803034894,
                numberMax: 5466692659,
                numberDays: 2226424873,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'vf9pim88puttgs7bdk7j3b6efrbie30yqoih9qipwy62qrznpx',
                systemId: null,
                systemName: 'ccof23e8a8mkifienks7',
                scenario: 'qxmv3gztmbg0y0gq696nekq0tjawuk5wsvmmc1a92u5q9x440mcat8y7okss',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 06:58:28',
                executionMonitoringStartAt: '2020-10-22 09:37:52',
                executionMonitoringEndAt: '2020-10-22 21:43:53',
                flowHash: 'cl5058ttfj713sr7folz5l6wnh1v6methgs1c8xh',
                flowParty: 'ww364yi1447tmb0fnzles0mh9ll55jof68xnv7mqadaa3qlcatfvhauwabrda0wqtp33v4ez0smgewp2taswv7pbeu9dc96c91u04mwcigtnkeu36zksv0bv0ct7rpsefr369vqbbixjvaai95pakh1tg37yamh6',
                flowReceiverParty: 'xx2oknyuxzxmq6pltmgdlg7105w49tw9iuz7v6dcgpdd764fk8fxtkhekz67dltdc0ibbuqjbdj5ik9tyjyutugxybr4uosebquh2yofgfy21o14zhx0bj73poy8octd94dditgkhy8iwftekaahhc7nd4mmv6is',
                flowComponent: 'aqcmurqjovw8jp1emeqqg136obhhiagu54xo9y8istg2w14oif8g8vcirt1npvglndysh0jtbg3u4yu1onqy6am5mfgv86z04fj58iu7i0zniy17d4y2b6ppm4qtldhsjcvjlb43v26jjdz4rgy5akjsbi3i1zax',
                flowReceiverComponent: '5frwke032f28z85yvdgkdm9e79u5vnngco4f3t3qjzi0jw5y32kfh8wm2kqxuaejvzpjji78kv4fg0dmqzp2xd0eg23e1yzsd01j75azjiqkv5bdxqwzsvmrunet1cwxcrlk0056qfaa1ji09lkfpkxxxg0gs361',
                flowInterfaceName: '9l9j3ognhs6eq93ppgddvrz0sx98unr7huo6jud5ta7aa4mbzacrisjsdtcaqwznbtuvldzwe75fobp5p4446y7utwziyde0ko1q90xjpc3x7929zzcgo05axjz4wt2iu20zayrap9soux4ijak88scnxq0fj1j4',
                flowInterfaceNamespace: 'qf08lbsqquc2d6759ls09alg6s2owclqlnq4jnk13ktsjatoaqy7132x0vcr1bjcublr7k3pwr1moitk3zsf253opz48eebq61g2ulcf0x1u9kd2gm7mdigwolt0mx5oikl8wcnxa6n0mb7f96va9cpx8m3px3au',
                status: 'ERROR',
                refMessageId: 'b2l4psalkcg0vnlab6f96icc6ia9bu7m195xyshnou8tmi6u1k61t1c4h4ibgk1dl5yz2267goymd2z6b35gwjg4m9affpk8premckoo3t4cmms5v995llreaveq4irnzv72xmgrrl6hjn4127bau5za9xp27tgo',
                detail: 'Accusamus deleniti id sapiente non dolores qui. Est architecto reiciendis molestias vitae hic enim et perferendis. Expedita esse minus eum quisquam aperiam deserunt. Quidem totam earum. Explicabo consequatur harum maiores perspiciatis quas iusto et aut. Ex laborum praesentium eum vitae sit assumenda ad perspiciatis.',
                example: '3xkh9zrn6l1s42kbc3zlfz8hve2egncj61vcqm8irlay5fdx9xkz7ype2srpbeq6wlyz49ajbjnbpo2zewnh481erbneuh64eluc5trs2c1mx4n75auo431z9otur7iy7hllxvo09l0q08ahvn1vbukahsbtbnmy',
                startTimeAt: '2020-10-22 17:20:10',
                direction: 'OUTBOUND',
                errorCategory: 'ptr4j67n1h5cbk5ivb4rg3k812gyr1zmqsz491quxql5as3e97jaxmnlynv464u79ln1i9hjusj6kt9n99dvexabotdb2fufnj78631y3fiolebfgyunxltcec7phno5pw1d0uhqrur721b62ydh3qelcipmv09l',
                errorCode: 'lzkd0tpfnrcgaj5jak9dfvbrdprlgga2778ksebo2kw9ijqzjo',
                errorLabel: 722192,
                node: 6360224290,
                protocol: 'abh0bbs32w2xf99j94x8',
                qualityOfService: '7b2l8ykrfrbvzw7pjkki',
                receiverParty: 'l9ep1gbxlemmmhrn96b5yzwk9s2m6izs8ryl3bb3eei8cl1rxn1sai59hlqw99tj6ryf1tt3ihstdi3lg9nlml2705hpd8eu7dq89c84tx7tawsrt2i305amfkeeusub0wrjmpkew9vqc7rqhsyi5yr9lvs5gavc',
                receiverComponent: '9jkn75pmsoqebj9a3o7y062118u7dtigwrx4cyhcdey5t362x4ejgi7jz7ze9yjkq6ndc8dvvs5w0hhutujjs54521620fcqxd6iw74yfk1a3ohdvyke0vxrrgn631r79jy5q7udhwabhk0351hgc700y18rc5i6',
                receiverInterface: 'hf8dj2r0pfqmy68yxdlbp9ptzfwewzaunlhlarol7ruefk9qwo6qriwmaox5vutk5xikqo0ys2uwc4i3gidetlfxfoi18cxqd26wky984lzvkw7mg3sx5lo1s4ldaeu0ww3ym1l9nt9xugu98uy0b5djz4n61h7v',
                receiverInterfaceNamespace: 'hf5gmkdl416tssmd98hsf5fn7at6sv9qyro0cjwtd1jtr1i37xcx0paaf17jkblm27azwqnr2nh2iupsg12fhuzaukkzhr6xzqu71tm54yn12e0xbizonw1eix4h4mhgdzu1e4rji9zemyhfnhhhjyzhxt5rcm87',
                retries: 3708745070,
                size: 8819169329,
                timesFailed: 5292546058,
                numberMax: 6584539659,
                numberDays: 6416926557,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'l4t6o9dq0ydchxl3ubnnphz7wh6o9onstua98hlmbeno6awk4z',
                
                systemName: 'm69nze83ei777knw7s5k',
                scenario: 'tpim3w166yk0cby9i85zrk7kslmwtx4gkz7h2bfrktl4rumvv26c74wi4fwe',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 10:48:28',
                executionMonitoringStartAt: '2020-10-22 22:29:27',
                executionMonitoringEndAt: '2020-10-22 06:26:54',
                flowHash: 'm4uo8snbzj6x5s7udf9bqvvmk48e1t3al0l6yo8p',
                flowParty: 'jrxsy4nzptor396d44usofqbe6n4hcu8pv3k2p050debhvv0t1zk2mzhghrhkjypbb0dvg9koq1zbifnpfb6o2kmx4dv8razny2itfr4bbfvdqzai71g0hairzycyfj8jmyhd1ozapk855bh3822o26dyq6gdylv',
                flowReceiverParty: 'unzzzbupesfmi3w6y6coqejp9ljmc4txaclghsskzd5z5yrjv0qkekd7qonxllpm01lp0oe70d3oz4ent22sqp75kr8q3ujuj4pmfxhzoi4fy5tquv74rs9t7dxpgzsj2kapsxhxpc4mgxfxx4juj7b7sg7hmgmz',
                flowComponent: 'jn2zjfp3ecbzifpzjkvcikzdmkeoapvk15synqkzumg6b4k7oftnz4c3k5oboqi3wgh572z5er9hfrxykp7mep6yb6lxu4knrib39zrfyn9iosnqev4tgqvmesbtxnyrlzbw7dnoklsvf7h3aseyrsrh063mtty4',
                flowReceiverComponent: 'x7vbsmbpkbcf5sjydvdyhcs0p3gst2rmyliqhj5vwhha66vu3kga62fhcjufe9hzr92scygihv8a8wdi7636j23q6xu7mhhz5ybwpwzv2m9pxo2xx7i3u7cylj0e9m2a0uk6l1l4mzxemesbb6fipqjfeocszxjn',
                flowInterfaceName: '22256svpvgdmbzbhfxsfv81zfe6z3f9ogbsggg662g90upf64k1brzjh3gy3oum08j25u2ysvl6ckmlon9cmxwhb8o2ppswxm0aidlclqf37yn3cr1kryf2e7fkhoh441i0rxjs0vap0ocakcgx25a4ofl9xw0mh',
                flowInterfaceNamespace: '2uhviqvd7ubhoxxxvgp01qsohu9edhgj6npck129a0ufrd6xtsa6s7dnnkqzvh8z92wdoa7cg1gf6lbl179fizbaq2zl7n9lv2lyrhny5tgautojv4ppeyl8agxbevqm6dzbg4yqscj5hhwjp897m1lwpha2nagf',
                status: 'HOLDING',
                refMessageId: 'bbj4ma8o67849awko3ow4matbit4mgietkmbsz1nykolqdpdbiqwshja7ms5a6ryxwu8rbniqyjqolpvjcmeggnvcm6vccybtqo56jsv69c9601tswmv0nm51w0tsopgrpgfzlwevoxmi3mhtiduc2ns7njczk39',
                detail: 'Voluptate praesentium sed odio est nisi natus est dolorum. Illum numquam consequatur voluptatem quidem aut delectus dolorem molestias. Vero velit vitae quia repudiandae et explicabo quidem ut.',
                example: 'h0bav7zgdy5l5a7gcdcuz9ri9nzelw68229evuewrk1krfjz99ak4h3omzwkub7u8k7n4y5plmja6tq34iz81za4web68o8bjzz5nadqmbmxkp7um90rxtec2r3v0p2emq4o46u7j4tpkucw6332yrpscoq2mdeu',
                startTimeAt: '2020-10-22 20:12:05',
                direction: 'OUTBOUND',
                errorCategory: '1xzmebq4cmkbytkwh0b6zjf7fxf14nl0tnxfrd86nz0huyig98f5ofr0h47u15mfwaj1ervpcm89hdxbgaq62wbr7x9ct0v5277d0cxv4fxbw6pseemq5qpsu2msjjj7pj3myfpu263c306lejfzduufx3q3sh7c',
                errorCode: '5fg66o78md5ivq3d3fg2m1od6ka01e7lfuyrjckyod0bp6t6hk',
                errorLabel: 464269,
                node: 7633322219,
                protocol: '4cec12o9qmhuv0rey2aa',
                qualityOfService: 'nj1trnp47knvq2fin4sk',
                receiverParty: 'sdij2rj4w12q2td4oaaf63xq8w5wixih701eyjmrrzedtdwdm35l51o568lhpo3gfgydpobnh46lxdvfk0rdefdonr8mesr2ug3sifqv3iebow1j8k5nyxygbd8r0lg5840cucn6lahndgu1ldrq9vfj10mgftp1',
                receiverComponent: 'wce2x3qifubw4k7i110jdkzf0zfjeop1v9qtbx6kohndooyzo88ofb2zk1jflb6nouik3ltzlwp107szp9obtbqm37trzvtp8j081djsaiosazs7iqp19y23aip4zjdn337dgguvvx4p2dvir9fm04f8t0jt4w3n',
                receiverInterface: 'w0qnl5mf1fyzqsmz0qjzapj9rq4pxexmuftd3rz6piovz2r4997k00i1ytms1je3n59x97bp28xj6j2xmkm68ntxcv6scd3nchl9v2tn3negu64366vf4ar6tztok5isf2rbpre5tcsb91r9y6e9oxyu84kg44cu',
                receiverInterfaceNamespace: '899rf5xsj4ts7hndcws25b7440zeich92knz35x4hc4752d2p7o0sotyfy4155duy6ali6xsqn0m3ud03w8fpmlwc4hrvtwxq1q41pdbjn1pg92xjxhsz5wroctbnbca16zcdkd0w8a3iinfnwv6qidyxoc3blu6',
                retries: 3382419154,
                size: 3424100827,
                timesFailed: 5784605507,
                numberMax: 1218213573,
                numberDays: 7942781406,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '7o2p0l0fi5chffjuasweu7emk409okmo8p727txh23p209blkl',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: null,
                scenario: '7z43rtyo99gk4tu0i4zllxtwtj45di2yrrqnefgjddl6sfmm3p6jxmmykd9l',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 03:32:24',
                executionMonitoringStartAt: '2020-10-22 22:06:42',
                executionMonitoringEndAt: '2020-10-22 16:58:51',
                flowHash: 'svj9garl2jeez4bdkkv89yxeku9t3xudej7xpplu',
                flowParty: 'lwerbnpplce2hh3lb1zq97mvftoh1ex03bbd6uiotvh0kkikm1mkff5a7ffhj3qbpoyjp5upoj4zqkt6gdybzptpd3ihomxhwjt5bc7ogoef88sn8dra84eie91ch7adh7ira0bgsxu9j3xo4iegpdgen7phnkaf',
                flowReceiverParty: 'z72hsqyob6vv0kulsb29vk2get99fm5pzorwsyk5ma2n3jzvrc3xfl1l93n453sqnzhmoq027k1unfpa4ealxzodsc8ydzck758kdohugmjnu3m2vbzc7gyz8ndyzipa9wl678apa39diclwutovrrzn3nhcypzm',
                flowComponent: 'the5xs8slemfh0hj1g1mkmghcz4tqqw3oc4wfrdqowdmml2e8zsfo1tu0xp10y36h2jz828x7nr0jldm3h0p65p40ndy209e465ifv42489fp4y07m9wjnxxs793xckmcfq38cs6rt96kt4qmtgszaf0nqogv59l',
                flowReceiverComponent: 'wc2xmobm3nzvu2abdpazi4f0jeoaehbl9qd9648rq3watpcb0b5yg17t103nvh19k8m4vc8vyyhgvgx8pvab8jkn2e2telepqwhbqv143vohpm2u4s3mcwcitqz1v4r17vs327m6huea4cznolgxj80jqp3u41qk',
                flowInterfaceName: '1igau9nbh6oy2oa9z8ftg6uuqip2vn79z1nlhfdc1rgr770a7l30zzkf1s2v5j07ahba4p3mgwjo4h87s5hzjup0kvga0oyu0s94x8t7i2cdj6lm2p2uv2f991x8dfcrv9pv2g66jyp4r1kqj9z2kcazpmb1f9lp',
                flowInterfaceNamespace: '8z6n7uo8pvwr9rr1ivaldm8r9c17hdk89tcb3qaov1olwwbekynu1cippx2mvj57e10b86t2wb79iwso4bkxwfmr1jg7vbs5s4abjydbx63g9r42050jln9g8lggx6l0n5qcelrxdwhq4kx90ol4tvkiuih1rqj5',
                status: 'WAITING',
                refMessageId: '9nvqprl8a6xjzhii0bhmt26pkhq69x926ts80xm5n3rl3mfwtf94r5l4m4673tkai2pr00sfrkcy5y8kzdbvz1xbqzbsyso9gjhtdo4khw1wqg90rhcpb8nr1k36o45cytm1wjkhkqs4szl0514usqo3asemfoce',
                detail: 'Id maxime dolores ad ex. Labore excepturi nisi nam ut qui numquam. Nam quibusdam praesentium quam aut qui quia asperiores assumenda. Et tempora rerum molestiae sed suscipit. Qui officia aliquid harum.',
                example: 'x8oe2obx0uyq8rkma1vvo3pvjppie3i2p3saznkd3y7iuroh0jmgi8x5ahi682dzv3fgmodr2jf18aijt4sm7nogfwem8kr77r2kx74yap4jfxbnuzgxknl7kyd0pu5pa5ia8bdgsmn8rz24jmu3ofbkkephzdgt',
                startTimeAt: '2020-10-22 01:13:31',
                direction: 'OUTBOUND',
                errorCategory: '8wow9e7ih5ysy4lon15lkr4fr8g5suh54oq76mmq9u9gan4zgzw4nw6tes26nd61tu275m6yyzznn4jaahxwxgrmo8qyd5yts7g0m0fisdri38li9c5llae1oqrt651lo6d421ved6vrwtfqro05swjdqujjj2rb',
                errorCode: 'hqzfqxbwu3i8w9q2vvuiednh011s59gml1tcr1yategdg3r4w3',
                errorLabel: 788089,
                node: 1900198687,
                protocol: 'ythv6qgtyrro53twr22k',
                qualityOfService: 'mieoluk0qv8p02ufzrfc',
                receiverParty: 'svmnz53j8rdau7d95oecdwz83orm9spwf7rz5e3bsaz8aaa6s0qwcmfsoe3p790dejbanki373nshiklb29bpcqm57f3dnvsmv5bukf7zlzflkrvronexzg6fa5c7kxgwuhemqz16k8p2bdij71ppt1rn9ybl744',
                receiverComponent: 'mv8p7wt71vzku26v41s3xyh11dhjftej7gi10miqpbkrc9guehkc4p4c803nyhw4vzn18bt8ive5ien62k5ii3hs9fz99thj5w33j5366dyn2gez40mpxqypje7alga1ys6j9xlamwvkphs4psw7qntuho5jii10',
                receiverInterface: '9r4rpiw7xshgsunk0l5rxc5itwbbsxsb49pzg5enl43492nig2vh4ctwbfvill7kdbe26nz0gpqixfvzp7w91vbi4k9tar9cn25gibmxa8pq4m0iyqif4cbbm65c9q9pjcpu6lwd2b8wyga7cof5xklhexa2qa7j',
                receiverInterfaceNamespace: 'l9w8knufeckn72i6k2154kle7aewebrwkywq2219yla878qtnj0gbj1jj3tmvadf514wfo40vjbjcj71tuf8f2s2e20765d5nl0qdvsklg2nga6zy7yg6ez57gk6xpdkskqko7l6lsm1e9z1tcdkcr0atst3tr68',
                retries: 9709668231,
                size: 7675189250,
                timesFailed: 1065549214,
                numberMax: 3234429791,
                numberDays: 5255496562,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'vd8yqy68hztp7dpcbol5p6d62yri1l8z6stweim8ftd3bq4m8m',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                
                scenario: 'dw11v9vf5h6rhh9ff1q9e2fo542lvyovu0xti09lfgz9g0h5r9s5rv90r3hd',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 05:41:19',
                executionMonitoringStartAt: '2020-10-22 01:23:31',
                executionMonitoringEndAt: '2020-10-22 15:19:36',
                flowHash: 'fk4q6e805uit08g3gumsfa4nobjq2x969l63wq6f',
                flowParty: '563pbs615z4po8qeozve9s8akenifu7eqvms17mktjcqj16epsls40c3mndepfpgmer8c40z51rf9b1hlnf29uf248ac1hlctihrjzb39a8ne56mf8k9kg1bxmm0syls5lv6vpazk9z3gba7s9z3qodcu9q2gf1u',
                flowReceiverParty: 'ck95rzskh3w3yht1dxdyebj4lfo8z7v6vp37fgo2mcnfq5u9ab8nhngcy2u2cdva0kyzrn6gjzk517hmh4zvl0t5oy7u5zuxlbjz5vewvhogj7fr3iyjs307lzfppgt2smbb00yrbpgj2z6i2bmadog7n4tf090p',
                flowComponent: 'yt87x2r7zonprafey1zd1ure6s5ywbansi9s3wv61pk01sayiuau7geetmay27succewimc0r1n4a3q9jv60x1iir5ffxv0vd342ktjgisfcim6o5wd2hpowf1xo1agyqmmgpvp9gdlyfrscrnxglb8zk3zl1p8u',
                flowReceiverComponent: 'c5fbgo12pnmrsy7nr1i111n2cj005khvpy4y2dkce67pphrkd77psghzv6k1acx0ueqhokvhr6w4apxzimwwylhqum4kmnj35r90yu53ansbyqqaib8odhtkgfmysldzdo1an6lpo3cb7u54qilll6krqmmgr93s',
                flowInterfaceName: 'w2y6etfz7aa2909iumzlur69jx292a30uvy2dedt4gi9rdtql2x63kjf0dry8c7nzr4ewesenlsqzgmmo492h0pbxwxl2ea91a25kdwy2awwup7tj15ncre94pfnnxi9cf7ubco3n42gj9vzh4691rk03tweu3pm',
                flowInterfaceNamespace: '3qk6yq2oa48dghldogyy9krpqu7ll1jl6adnsep3fa516py63bvjnoxg8otpoib3zcazqoxvgw79x50u3wl9hbrvz5g1qw7cek0f9npvbilpn7mx9f5cz4wnqo7b6nc5ducbjyff0543e1i9zau04cgsw1xrem0n',
                status: 'SUCCESS',
                refMessageId: 'fz95dvhrwod6tsuf5mmgn6xif9iu7mjv2wuxly0zx6k5tee5r7bf1f9c9zg60ky5doteo58dg888zskeo7mwzx88bokv27cul7fmqfsjlyeftaakjzbh3helf6i3oh1kuprv9k5y38oqw32vww3jmchtpjn6yvsu',
                detail: 'Sit aut molestiae. Et laboriosam ipsum aliquam tenetur expedita iste reiciendis aut. Eos labore dolorum sequi.',
                example: '384hjj6px0ibsp1v3laeujkn1j6zf5owcidt96ndp5onr0jq4kvgx62oxwzj6zhru6r8dfzwg976n07tpilt2aynqg9zrai3afqb7keyjq6lk0vouyj8s7iottpf3jcyfgwuzpnsf3blfsgb4d00vdzkbf8bpjdt',
                startTimeAt: '2020-10-22 19:41:59',
                direction: 'INBOUND',
                errorCategory: 'kvcwgp8jcsnoo9d7nbfno23movpesfmpdwlczrih8swrs0vgwj0s2e3v8a3jti89b0nu0c61vk53xnj4eamaj9krdp5cszddgr8e0qkiaxdhytxzuexmpjinz76ilidd7t02bhmhocd5mot3tgyjopy1m89w74ck',
                errorCode: '3owpflk3hs0yt0p5zc44f5krzi2103wl4m7sotvoc8riu68gjj',
                errorLabel: 237266,
                node: 1080158453,
                protocol: 'umixilrfcfpd6qm1p307',
                qualityOfService: 'lo5y69w0vau4zehp9r3p',
                receiverParty: 'q5zrjysqclsp0t2036gjqqj86d4apb9vwlghrk2uycin35fuogdlmxdpl4foyideloebja6ircpofa27cpwt75xb2q0vus0vwjd6nnsrs9h2kz0re4tegfzphtzr57p6bsa2x7mx7pcqwmncst5eamwusim676hd',
                receiverComponent: 'p64xk0gq4kh9s7ya1leqgfc18r6oyok7tiuskmyj63p0us75clu8se04lyeuh2vso7sw4j06v3qojs3xzcyv7ue3fxn5ryw1qwerxz3rrbgy4qob29rouxxge1fdc2zq6s9e17deou27sfkgpiksexixgefml7sp',
                receiverInterface: '8hqbyg9vlddyxsmptyzkn8iujaks60xcmdpu4015f0x5ycg2pa39pp82h9shb0hraojjt4t74bzd6ff0bqj3uwagvfwci7nxczmqingnaus7dwsdh2qvexyo1msk7vk1ro9ichmt2paag7m1mqt74trji5ree7ce',
                receiverInterfaceNamespace: '73dmv0rihkrg2spyk2lj65kwb3dst11oe0gpm0m3r8ifwuqtm4gyggkqm62epqvjc1fa4n83ihmqwm9qm7wxwydhog9nil04kqw5mcj3tqfq5w0uoez36h1ylch7d55yfkbqrzij6b8ibkr8aoirj2t0rirsjb8y',
                retries: 5281314522,
                size: 5467030305,
                timesFailed: 8852182823,
                numberMax: 6637995839,
                numberDays: 7069802336,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'qajcx6ppaccvbnu2u1jpxd87qi76bkyn3wtys9n7p35h6mkuhd',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '9mj56ykawl01zh83vjks',
                scenario: 'm8g5wpo7w80yohrbs98rbj9sa399ty1q3ov7tf2qc1xq1gysmuj3p98x22pi',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 19:02:47',
                executionMonitoringStartAt: '2020-10-22 07:13:50',
                executionMonitoringEndAt: '2020-10-21 23:23:46',
                flowHash: '506b8etz1knx2ljkqwq2jju2gy88igm8zrvz9tgy',
                flowParty: 'ntnuhlel467a41kwzny1izq91e5d0hgqawjttuw1rl1wg6ai7c5zxuxen1szzeh0xi682i8dgap9lvwaoimlbham12txor99socw6sc7jpjp2q10sdeuk27sldwo2rkmw8um06qrc3z2mxq61skag9v870hewrgs',
                flowReceiverParty: 'b99cqb0673pfixvcfudqq09ypcg4ouytsoqluit783qxuw5bdq56nfnqlcb7f06enkxs1k7rixdyfs2b8qjrg2es7vdd2yv8qp5drbb3n9y0hb56vgqeiyrqxfapxbm2y7ad4inkkggdsmnf42nlxjxlh3pcgyp8',
                flowComponent: 'v9pth46if2430nbnufqrrqjtxvwnkw5zq5ykzub18pcflvqp9b1h773fahkbtji2f7oms96t7m9mcwn8bpzwulmo8yi1tk0vmu10500sfaw1tk46wrfipxewwlqrnk8y1rs0gkwijlym0v6zfyfkmluqq3twolmn',
                flowReceiverComponent: 'qj870wjn1zlrdej9fa5mit2n8uvvjfclc5r0gljudvs3dp5ms5685n6gd2zai0lpsxggn8sftymjxdf47qzd6xel5s3kq9k1d9a14quywjgu1ttuukfnzjrz98ofx77mxe2614uqujncwl0nl2wlzfppa5279nwg',
                flowInterfaceName: 'el8kb28h66fpy5fbuggxmcr10u7ziyvrhb9taqyk4hxbvzjtolzbe412sz81jz655l5kexcznei3zppsqygjgprqrel8je1jnr26e7l4j46mxmwdqclt0xfc6mw01wti1n59j0dwvrgxj1lvp1ld6xbc6fs8eycq',
                flowInterfaceNamespace: 'v5zl10ktwl4q3adw1z7qirh24ov7ssbhf3xcw6pf9prqhpjz6v1xwxeu064zxsviwrvm3hbxdnsuins1ij2pf2ihofji98qo0t8upxzvbuawov40pslcc5tv8huomvxrcw3kg5ncr6f2tko29hknkfowf34p7y6s',
                status: 'CANCELLED',
                refMessageId: '0fzbn18ksvws43e4zs25juchaqa7luoa008oc2yqtmnnl7r47cz7pusry7gc8anordq23vj7jv1jivmdxx12z03hsdbu2w6elxfjoct5fdl7taaa432emk6e70catomfnphlbp9zqf7elya4hqrz0p3tx18prk9s',
                detail: 'Vel quidem eos quos debitis fugit fugit. Asperiores voluptatibus quibusdam sed. Et nobis debitis inventore doloremque fugit sit. Neque amet nihil laboriosam est dolorem magnam minima excepturi doloribus. Sint sed architecto rem quia velit assumenda. Id assumenda qui.',
                example: '8wiq3y6t0mv34e18cr2cy8ec2bd4oswqltxfhejeasdc3wzxoebrsc65fowdgbqu6ldy7ycez58zcjtlh6uisoae01xn1j1ksu2e2lrpk4tcszhnks3d7rlx9cuaxo97g5kvtospyksdjp2ppmrluduu5s97cp0t',
                startTimeAt: '2020-10-22 14:00:52',
                direction: 'OUTBOUND',
                errorCategory: 'jstjqfm9t0gl69umur3qpf6nuhcwctw6sp90jrv7ah6hyyal2tx9phjacvg7q55gzonhm8yewuqkmzc0vl29yasqk4h54f8jnhb94os5zkpelue53jma0097stky0wv8y2ru8ggjqunh33dtdv5jv6zqo1f0bmd5',
                errorCode: 'icgzqj7kbudwdqyit1rj60kf3zmv9j43c8892ej9i6dzzjr7vz',
                errorLabel: 953385,
                node: 1126478618,
                protocol: '50ht0uhcjxbfq91k698y',
                qualityOfService: '9eb59qn385vdojg5iwqo',
                receiverParty: '0t3mpxpq2sh34oal2lcjt02bzmjpor88oyzpmwg76mw6cnqv6y4ecaszw46518137reclva3bvn64k2nww1kkwdvk39gbh218fpbfvhsfrc3aim5kvqnyfc31wet856ebzgnx807i9nb3zvnvciqr59tpzyrfzzi',
                receiverComponent: 'rwqz9cfizslug3ctc7omdiys3db3grfsz8tdli27fa0iaf6q2dmr2s5r9uuag965psmyg4y1l1y80bkho2zy9jskzqcplydziq15pnnhut48vqnepj0z6qlhwko5elrq2nbdwxh0g8wxqpyeuvx21c896dr9x2wl',
                receiverInterface: 'trc1llq8engmblg3uzypx7dieqrgpykt0trjoxhewc9dmydrvbjjk3ttpvzmdloq95iuw5zxpilh11h67iwhjlzeebeuw8gr31tsvga4pjnqh3wjzabxfmh18u8t1e4jpk7os2lbcuvuyex22jin6wnyse8eqejo',
                receiverInterfaceNamespace: 'euu2f2r89gdt33h64t37sq9iedzb1eqn3olmn32x292is7lh28spfpyb4mtl9p1a9jj91rdg6o7eljkvykvy4nuumogisd5fv2ogc0vyir3us6jawrudaxerxbjcejn2fk6p890p7v523uzo30xgqkjfoa1b5joo',
                retries: 3068570872,
                size: 8391310724,
                timesFailed: 7137429932,
                numberMax: 2975244499,
                numberDays: 3013933084,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'rgpxzm739k990ot690d8u8mp8e3fevrposubm1j9fid65jh6at',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'vha984uaqnmyiol77khe',
                scenario: '6c079av0kqqjuscw545sskscoq52qqha04vl6ef8rz6d7kyfh9zsgppbuzz9',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 03:55:19',
                executionMonitoringStartAt: '2020-10-22 23:03:40',
                executionMonitoringEndAt: '2020-10-22 01:38:27',
                flowHash: 'kuttp1ao6mdnr5oe69yihsh3h2shbz9ja4wuse5o',
                flowParty: '9e4e39pe0k9psb66o6nwbozwl1bnz0ddti66nynngroa1djqk8pmudphglscldl8ur20ywrttc53ugyfx73akaqrjmba5v48ekkbv65js0mp8tl32u8clvl4sr5lx732mvoqg4j8rsnycg64gpo5m4dyv561qrt3',
                flowReceiverParty: 'wizd5u8o7q7xpxig3pwzsoog6sf30akpvy5x9n2f1nbgdn7rvq2mim25umapb4d8mk1hxw4yjbs895xr3xduwisl6zh4thx3irp5irvsejqj3pqb7bng9od2egbbfbufr4d5cn8psfvb5trvv1drtwjn5hy1xf98',
                flowComponent: 'kzhylw6ab05537us09cttli7yno9tbf6jfl5ycewyz90o1inn3xjej0aajf8di9hakg2wbj18043cxqje0w0vveerjv37ggfk7uy1q72xjemxj546w1jfgot5c0tlqrtp0mo2ogqh4fszsijsi0okcaot9ny1b0b',
                flowReceiverComponent: 'o8yrg4tr3lg6u33nzegno8qp7kbwmom92tcei5qnduyfk5d8n9tbjfqgihfcqdpiiqy0bv4qs4f9x55jycxjbwuxlz6r9egp4gpur8cm986xrcgsc2m2p18meh1gv9hkac9tfqgsxxhbe671li7eyjvp7ww97hrh',
                flowInterfaceName: 'p5tvu6hl0rrrihfbyeq9kracifg6u1ktyqy28su16k917jc32nhxlrlr7li36hhimsj6s2zpwb8b6piy5tl2yj4gbwreryaxl2jv60pzr9zfbc36ns4uai9lo4bbah2svsf5lq9w9qy6qo01z9whbobq84l6i7i8',
                flowInterfaceNamespace: '0j195ovm99i7wtv6rfsmm5gkigxxoryfvb5xt7x3e2aszqnkjpi4p8gbfs0fpvcrfq7g3gqt9qhxv8u8r4hcqq2nsi5t132i3svg40qbf3fxhlpsjbdxt728y83co3zl0s32c8h7xxbk3r60ki4nvqt4lmgb191n',
                status: 'SUCCESS',
                refMessageId: '22n7fjhcshf6p7sk49te7nhqvly3badicq800iy6e1l1unr6s1sc4qvqsat7mgtcl4ux8dg4i6x2ksg5j9uj537vt89byylo2zb7txxfy3un4pr9rlh3ruk2xyr2upuhrox0rkweroum77flbzzvwet4ubf0gs0x',
                detail: 'Tempore voluptate dolor quia repellendus id aliquid facere. Cupiditate laborum ut ex. Non modi consequatur qui est numquam dolorum sit voluptatem. Excepturi dolor optio. Dolor et nesciunt nulla magnam et molestiae vel. Ipsum vero aut aut modi ut eos fuga voluptates nisi.',
                example: 'rzgd3a6qqioc84mq3s9mjadtd8ha6cpz1mpch4hstjvjoynnsizwdp7ytazxkvbpuea851ktofoxudar01g0q4llfj6gmmcodnhnn06a5oxg3fht826moaqd9bsuywfru1z45kjqfhyawgvr9lymu8xphgo7lkxt',
                startTimeAt: '2020-10-22 10:53:57',
                direction: 'INBOUND',
                errorCategory: 'kbuhuhg56muftne8l3zx4qhr8di4e8e89sow3rvoyppf8wxlopyglsf6efd5jrj4s1vz1ehzz8de8jrqdpgzim41kwoxsgxsrwljv0evwnmm4m08mbkj33tdfeda3hqt2kspriaq4x6jsrn37kgf9f3papf00rj7',
                errorCode: 'a2ghy220moaq4xl8hfz10vw3a78ep1mwvnv93hzptcdwx0vvt7',
                errorLabel: 845278,
                node: 4416490954,
                protocol: 't3t08o648ilvr67104es',
                qualityOfService: '2i42apexjygr37tzcuiu',
                receiverParty: '74ovcc8fjlwiv69z1bzeg1w0tljlf1bqj1ukoecxiysx1kxf956wese8iuougmcfgdrjd01m63szhigsu2zgor4qmewidjshp8g07dkpee4gc3o0tq5x7rpdy6d5ofo8iefap5y8v6jgo1smzw2gmsjz7xqb6svj',
                receiverComponent: 'tba1e8rvo59p7xz2jmlqtx850a7fgovmwaq52jthqan1iq7yo47q7oh91vteunirbplp4i6p5hb2jjj2x4d0ktvvqcbo6i1iw6tfe48inw7mkuqf3qdewsutzs4sjeb325o89eu47gnfbcbzt1kso2kjgxfxwavh',
                receiverInterface: '924pjkgpgflpn5s2m5glbf15630r402fmf50mtoo8jn1214so3oxkz5i41qq1ma69tkpk6p7zhuo2e29xkknettl21rbjuvgykbluafi0url7z6k8ei3tezttqx1relkd9vq1xpr88j6r7mdjgn9hrpodhszrdgl',
                receiverInterfaceNamespace: 'ujovxtbahc6omr0dfurzfuyle4a18268paxn91ld98ow6wtb9smsz73tsnl82z0tugh3wvmokg04gcno4lait4nj8og2c8shj4e75c4604gheunxpnbbo6sa8zmjrcqrriz1x42fggujofs5djxklx4iz3q4d4sr',
                retries: 8219021258,
                size: 5270912347,
                timesFailed: 5646529279,
                numberMax: 6735829272,
                numberDays: 2683788932,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'h4amrhhmy6rdk89a0qbiwz1ydqzykaptuq35nqqw2hklaylc12',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'n14oagyno9wlrqtxapb2',
                scenario: '3jn0a9uy7hmm7yb689zvvg0zoi41up6lmfkrkc813zoge1k4jxhzcgxmcti4',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: null,
                executionExecutedAt: '2020-10-21 23:19:49',
                executionMonitoringStartAt: '2020-10-22 16:02:13',
                executionMonitoringEndAt: '2020-10-22 10:55:29',
                flowHash: 'mwq17o3shhd8a0ndiqo7q6josyd96eh6l7jkif5n',
                flowParty: 'f3sgbs1ji0227avoznoky8yl5637hofj63pf4mm780sn4ehknu9zqg0hmsjhvoootpf033gzw914ay2v9xhfxnlf94pemy1ir4b6iaem7vfzdzh1mz9a2r4xnibcmr3vxahwmtkthyw2sbl323yy0t62wv6sdkka',
                flowReceiverParty: 'kyvj40qtiwxs09wt5sqo4op96s96c05svdg5oo6ulg5eieejjlfiuc79gpc3xnww7sdgg95fsonqomkit8y824tnn5m6nceg9jrpp4jue5xof8q2pxd35dhsaox9gk88dsaerv9mtuj69qfqz0e47r6fkvxpg9u8',
                flowComponent: '99skklekzl0cd230brhn1qhkuivdpgab1v9d1a68kh3qo1ooh1q6c50tkmmsmlbwgpms548xdzrjx38y0ro119dv77p7h84hz0w7w0nnvf439f2e8yewpahw1fz4nhckg9e82xe3c5xhg2ftbp0eudzbj245iaef',
                flowReceiverComponent: 'fmwasvdj6hhngaz2cdgt37v2mgwr79x7kcqf0edwf800mjvybaucgfl4sw2pz1uzf1w6qfjl8v3xn6km6eq7dlg4cnydeih4n7knrtoj35nax00zgvz4fzmmxl39qpkv33wyn02o6370mtkgo7f8ogwz3dfa4ygv',
                flowInterfaceName: '74xmnfqubk7lo2b3z4o27129haiosewpek5u08sln4kumdxhdd1etovnxrsem7by0ym99ptro7nvrevenh2qf2919lpm5gw96akzyck77uq4fg6ge20ul987rpkm13ejmgmcj06qbb59wfs3xxvo6771tak68eve',
                flowInterfaceNamespace: '3w56sybrlf27pm3o7uid7msjjhnut1jebrlagve5u85qip98yp0gy2eymsde9grmdma52n14fdihp1oui2hsq4kwyydu4to8nfqdg7ki7w2cvd3j2yy6vnf1b9e67r60dab8e0ctkqquhpbwxtra2iad3rom8lco',
                status: 'WAITING',
                refMessageId: 'yv07unnneiotpwz0d93k4s8us4m3toy394bsb9izuwh43brjbrd4blaksgmtg6qxgsbej8j710yrqnxvpryx0ectgmnii1u7ii1rirujmagnoujbw963d16bn9yeg8n2353yofw2pryzd4runyg3ncnprp0blp1i',
                detail: 'Quisquam autem itaque. Saepe sunt voluptatem nihil molestiae a debitis aperiam vel. Non laudantium dolor sed autem explicabo incidunt dolorum. Quia ab non quia. Consequatur dolor ullam molestias explicabo. Praesentium illo iure sequi.',
                example: 'mtntrcvpgjdayifhmh7mvxah2nmweio73jpvbf9dq29zas6wwrtstk4tpgwefrrinjiaeycvn4uyz0fby2uuhoyiguhmk38ovxek09s1ueeuw6g4cvpop5sa6vo2zl3xc9z80vc3qprvk3v9sx3fhmb0ypiruag2',
                startTimeAt: '2020-10-22 17:07:04',
                direction: 'INBOUND',
                errorCategory: '9w5i1p8zsawz984ai5auf9jtrmz8g7o24a3jz44b9yrnexae9jvr4h2owjbu6l0txwtnbulm8i90le2kgjfu5z4j9cwgu2jjjx8rcgr06tds3vdjv8z3fxclgbdsk18qug8pdg7644fmcchtf1pih15826n7rxng',
                errorCode: 'j9jystv0zd4bmmsc2ewkhd4fs56wdn7r8pw8rnofs0csxn6fc8',
                errorLabel: 547015,
                node: 1564534676,
                protocol: 'q80hlywx4vo5qhjjepnf',
                qualityOfService: '98awtgw1n4kcocs2udjm',
                receiverParty: '7ipmxbzescghngn1srf0gn6tf1ulvc9qppxfo0tordy4a68rqm1fzn6sv1y44fiekfs8qy3hgs2w10qvepk46jx50to678n6rph6nixoza8f5rijb1hbq48s7x409qan6sfls2n3ukoszpzivbjx3yo57wgktcq1',
                receiverComponent: '64v4h7zm038rdzb4ksr7g9bjcpln6522zzphtrrvkwezwe8lyw7831nduzgrxhmto3rf099yegy43wy4nyo3grau8zlnxscd8qhwyx9dh1uxh4y8mwawnmbqfesj2h4rxvviue4p5ho1uzl1jpxv5kb03qpebffe',
                receiverInterface: 'prsf1qrqmcew6a6j4coauc3fxdyy7w4mkigm5etc9kxat6tzjpx41kylh94wr6ooujp3f69m3f1mdpf91wubpwf9ikk57v010wx8902z5jq1q9f58yi34twbfvwex543ehtr04zu4tewkcu97y5lqwiydwjkhff7',
                receiverInterfaceNamespace: '43qoo0gdv6ucd96uqoiwnf070ymrmgw6rtmsoofy3gtkxgvg9nvovk0mokb1lomyfmj98jbzxn4c4lb36jj65eq3okzgmsysjsli4kpjc41gtt6zm9o9zr98hy6r9npf3m7lhd7ph0h6fahhphbvx09u3ajrl44u',
                retries: 4505416565,
                size: 2432252788,
                timesFailed: 1965908864,
                numberMax: 1387920617,
                numberDays: 1029588053,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '48z2u49j7me6k4wtu8n30ugbarmnzvq5tjgvojgn4g3byxjweb',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'k8sqdjfkhr1hi7ng55rl',
                scenario: 'u45fi346cf9aqo96ncbjbk1fe9qaarvdooc5l6kwa4xgft47ll00btr9787t',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                
                executionExecutedAt: '2020-10-22 05:17:08',
                executionMonitoringStartAt: '2020-10-22 11:26:16',
                executionMonitoringEndAt: '2020-10-22 16:12:53',
                flowHash: '1hlz6ypayf3f0ltzd34rqjuhw5t0b805m71xsyyn',
                flowParty: 'i208n7jhbzib6apzpecvhh6c394k5czy26ory7p6tmhkdegv0btzu6lvq1u0ted6hj1mw1ntfqw7new04j3y6ku4mxa37vsbasiya86ojz8oz8eemexs6v944rj3erw4fg3dmty5imhn4ytmdd4qerxh17odbd8p',
                flowReceiverParty: '3choxn0g06z3rq1ed4dj0e2jy6f9zrauorcayrz3kiqyp5ua7exx7gk66huzbq1cm5x2gt6pm89gqpd94ct3l5cuk3ni6kpkk8eg2oqcs8152mvoyr6l8vi3o0lsil55vps5msm36muztl3we3cgjp6ca35h19ln',
                flowComponent: 'lmmoqo5jcpt78fe6ti9p7yj1do95n4wvr1ki364vhv2j8d8npm0ui0dqhadrfmsc82ja56vm5geoj0v10teo1mumcxia5z0jsvj55hhowkrybhxwcpo5ownrlqypki606xv0qjmfq9bkmqjv5vwiro7gtvb6tb5k',
                flowReceiverComponent: 'qsin5fz6xkxhullpo8nym944x8nvd77kg9qyv6wdxiv44wa0ax3ygb5ziv9neb0juvwbp9w1part0nh1h7b4m2ygg8wsl74hkjgjgwmhdjonmijmb32b7jxgj74hvhpw54goyp1nyni6lndlam7li1un2xpaebgm',
                flowInterfaceName: '4iduizoov6nzq3ont6bwo4wktlyookmrs9b92d3ezhc0c2y4aei0qjwpwry3hbl4z747uii22xyychmc8t3cws4e10h5817qpx97kqih1sx4o4ati5l66ocf0mwr7q9w7f4aq3qsvjw84em60sx07nizn9u7jpos',
                flowInterfaceNamespace: '378e611ewz1rz4e9groeu96ajh2zwpi3h3bimm9cb8utl36mm1id3yk9poxiqui7e9mflx6tj5t63hb33gurzb8crvgcoq267f9m8pjkxteo0fa8z5odak0bm0bo6m25epjpwtsbs2i7qg8n4m18fe31ualt4rg6',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'p9k177wjps142y8805flbn7qbilli8fvwjfwpfp6gzlqfoe1ffaad0qqwg6lnlafrrsxm54e1etwit4jbjwvw7pwmdtu1zce6wp14dvt53jee6vjesygkx3kdsr1yf7dxqkn9ly8yotiixi85d8ngw5c2prq47qm',
                detail: 'Sint dolorum consequatur quo nulla temporibus natus velit. Voluptatem et ratione autem et excepturi quidem asperiores similique nihil. Sint est tempora quaerat voluptas.',
                example: '3etom23m8obo8yhdudu87g0qjif1dcr36ownntoikpg05cgam2wq35r714astvs4bjt4gpmbcjbed6h8xd0qc9s1zqlzworjd233taqsi1o3h0vf4jw6w1ibp8xwrgeo1mzjkw2ti7e4x45afcobzym0d09tuzru',
                startTimeAt: '2020-10-22 07:57:20',
                direction: 'INBOUND',
                errorCategory: 'i15fg1ub9wqf39s9hyqnb44fyxgb9fx1dum4cwydfkcpithxrkfmfq8snbvh6yzedawmmzqcwce6dehg4bysio20vblms8rzggt6i4qzb0et7rqudnyuo0ydywq23lv9rlupxcw2mbcgz4u1u5j9p1t5vnu88txr',
                errorCode: '8fvhifuoz6wbgjo5p6hzunhh3vhde2mw0vjyqvcl4ooif2e14z',
                errorLabel: 657125,
                node: 2355448318,
                protocol: '6wepumb9uwce28t8umfo',
                qualityOfService: 'wob4b0p583iu5y1zdq3t',
                receiverParty: 'bygo8jm2xi54e8tbqu5so7m6x5zshd4ebfb7riuw8gvopra8hjqyqt70ptmx70fw5ky3w7xia13kl0czwf68luzhygeu3vl5ga7yq0g8ubqxsw4lj5aqbt8x67at5c2caci2cx3i0fymcztyrozgrgkn8n5jkuq8',
                receiverComponent: 'k8scv4bpxsvvzmml9dpw1c67g9n5zgnohzthgfzyz9xizro5v5txxsangc258p7swm9vrc97dl8a7i24mmor4urkn7den2pt46grstavj1m8w2yx2589lizc72dmqh0l3ratunex71mudvx2ptz8t7dx69f320v3',
                receiverInterface: 'q4katyk71db3t9tsh7wmjvvj1dgcmwyeof1o4qdkg64rxdaegjzbixkp792lkvbr9ufn9e9kw4g4kgl77gt5gqa5uj1qcj5b0h69mogsn99mjyvhycoy61dplk3knp1c4u2kij0idq63jl4zzpp34t2rzdxymvet',
                receiverInterfaceNamespace: 'q2uyz1u1d3e31st44myc338mn27m3devjz7hw8d2scjyrmgpgid8tcj2ijpirr9rgdhnwag1a3x0zvdf7lzxcestkmguwyd9a4ix8cliymwd8mvbdj77x06ezzp7o9yeq9b7y2ldr3ihx916pzwd3iwnq2813hj6',
                retries: 2519594335,
                size: 5995924905,
                timesFailed: 1592983531,
                numberMax: 1738660563,
                numberDays: 4109200989,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'w1hb8t2mm9ljtngl9u93fybbxozerdaprxzw7ss4xra28h0cc9',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'lt3ar2q7cym3bl8q65jb',
                scenario: 'icp3rtqvvdvxqrr3m8n3t576gi2oc62v4g0h7a54ig5qpf80wj50b3okinpv',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-10-22 01:22:22',
                executionMonitoringEndAt: '2020-10-21 23:28:51',
                flowHash: '9whnpx88u339ftiu5vbnmolwom173d0e3a1k629x',
                flowParty: '5s29mj6ww9acjh0k9oc2wfldqukkb61mh8lcys96dzavlpl15hr7ifet88wz5r1qtok8zaqmgarufmxps1gc7t36hp1ub8vs8ktnuje50075ip1qfkccor84tgi7gnqvkdudiejt50plovtr3bjgupv41b13gmt3',
                flowReceiverParty: '41yi4d01mx46o4bfvdujkqta9gzaj2v5yf0e2umgres8tym5oqezqzwy9wwkvurw2leepixa8z0brsgpldxk17b9sk7e75b11g3pvzrbexuay374srgd8bpdnun3bgwze746gewwsgraihpk9wqw6p8p1dh3cz3y',
                flowComponent: 'zsix4t73dwisrruf2cj15fgbxay43lc4szpduok83ht64pa776f84p9ucvls6e3pp1qf81robrc7qx5ur1zubre2e82cgzmzg2xpli92ioz25studljjlyq963y7cbpp91k411w305sdijda1sfz9td3romlj5jb',
                flowReceiverComponent: '7ztheecn1s884bw3k55do7arlp8pz2bo5nzq3xt50fx1628fjw437bkqvwvq35lhhv5wecrfk512yn42t2h8kxwo4yussct5x2tewimxrt9uzl8wynno6ykxi0zkvo1117li5u50ohbhjv60f69daoprj8rig4tp',
                flowInterfaceName: '1pcshpf4xpccf3dup7q1qiebm1lnk48nbm56v2al2nmezceyc1edbfzdzdvnlosnyfhhcfcjs9fre69pma71f11lgjp9y2abflvpsoasmg0qa5ijbtsj848d8pah683qyi6whon7bjxpnwzl48dpq6bd63eofuc0',
                flowInterfaceNamespace: 'ztji6k10742ssszbtkbz542ureum23yo26t2bombfv5uiiukjguy94bsoo2iukzjjpnszf6npq6lx6iiwg40zkc14j69j46x31d5r7q2afga38d7ou0u1x7xogjixuqr45nzufldw8pxecozbi53qhyrl7fcmy32',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'kgcyyh20igocbcif93hauktscaf1xzbsnuusj8secgeye4qish31xrlbbqjmwqup99od1cijorsxnuvw2yx6xkzez1pj5entmzxxz55zuiv0iq3zvxq3tn6l0efr74p6wltoucibvvll1bhzw1crr20iswvj7x82',
                detail: 'Tempore non porro voluptatem. Quia molestiae qui aspernatur qui voluptatem consequatur omnis. Eum ut ut officiis sint voluptas beatae ex ab.',
                example: 'xd98sj9eeb2ljc1l075bmpzaolox1gekrlqv0h2sld6s2rxgq1mmtr2nge8u1hocfepllqpb1epe81ec1noegzj4ewbx8jnslbybvqyk09knvrayofecf4utbny2lrb14zj1io0tyuk1fr4ytj9rq9sjy6fvdicw',
                startTimeAt: '2020-10-22 10:10:26',
                direction: 'OUTBOUND',
                errorCategory: '2cfasjd9zxk1k7o35dcqmrhopcdh48hswryil2eok7nwr3tktqbbeatoj0eihz93vlezpvjnu9yxy74ur2f7o5v8mjhtj5mpvw427u8r2vs3krt09bt5kzvtfs6qvry4g7c85vv4spczd13kqufq7lh4des65vsq',
                errorCode: 'lsxlom5ma129n98u67vat9umnsf3brclvajiqaegn1c205pi8m',
                errorLabel: 240508,
                node: 1374236176,
                protocol: 'usjadvr232z9b0q1lbi8',
                qualityOfService: 'lqljgakk0uh3kpfu7n17',
                receiverParty: 'bn056qi9pzfkc361ypqpz0t88j0dm21qs2pr4s1w5j358teq0uzmkniqjl51bf7i0ry9mp2e932zbkpegeq6csvx3dpfk5zj10gd9hicqgztwyatfi2u6fkmch96pzoetqz2o7b83c8wo7icej4izxmoqnsrl04g',
                receiverComponent: 'eluut1bno07rnfkeiyiojivheuty5z2o33r7cxp1uuk92bdkrejrnbr2h3i8xmh1qtw9lkdo5swnhho2llppv1s7w3ifhqgnvb27erxcjy40y45kwtg9wjqe1izpy8gf47n6i7t696epzjonulk087qr4xriedtv',
                receiverInterface: 'y4g8w1sndwqy8vy752tr4i8zr9wsh2i9osljbmxhobhlk7m1vngx6sk9pmaj8q68pilv9ddqr8jl0pymdenpmkjc9j067uo2nihqu4cyfmif3ltffa58llr1fl1cc5jepuorpx08jb0ot2cdjhgo6vlj6yvpryfo',
                receiverInterfaceNamespace: 'lu3lo9a5bospu86emw2dd2fll0qhlnn8f33ypt0f48s4g7kc9tz2bifzs6b884weq367kvsgaf2r49smt4nsppnhmoyqrbgld3467dbxil461j5pn4511chxtelz5c3he5lznbz88oftl4sz4fwcxspjy08hi0zl',
                retries: 5401514986,
                size: 3977590112,
                timesFailed: 2858872894,
                numberMax: 3225425999,
                numberDays: 5010102542,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'e9k7d2b69dzdmcv5fl25ytbrgor4aninh4p5jvqmmwhkvb1n9f',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '2z3386a613dxr8qzzpwl',
                scenario: 'ewkyxvjse21ocl0f8ebtdy36a8nekaa7dp8aemwixi0yxhr3auszmckfgd4p',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-10-22 02:20:27',
                executionMonitoringEndAt: '2020-10-22 08:02:19',
                flowHash: 'j91a0tvrt6zkfkg0jx1axrrzxk7g5y5zhc2jy64s',
                flowParty: '59zixmkx1lzqd5vy07wkzyqu7tpep0kzbxse7gjd2qoe8bppb29c0fruuxwgdnhkps2ox1c2yhyql6o09e1dmq0qt6sbk20i3pejo5fesko0d37a4l33c1qc5cgmrda5ilmpiw8u8uwxhvrj1kssb54hypjjwjuo',
                flowReceiverParty: 's82p7f6h4f95tf4ecrwo04zwzu8bqjpelnlfh6he5234xc79hin5hc3rsy25m7i496ub50c53yby1kdzx28y333o0dzj56de94zffvie19p40dhc40ebp5hxr4i3s332tpfkexy8epq9je4owlmdg97tnra3yp2m',
                flowComponent: 'o532bk3mp4kfhovth9ya1v4mcr0t65gg6iuctq09avqhs6tufq2fazxgndy3jsgeqdysvqmsjze7y2y0550a379iewnbioe41o6g99v5qjhgrix6c4ulhcvvnate7roi7j7os49j0u793yupsb5kouxud97ot0cz',
                flowReceiverComponent: 'qm5ogh4onlwx3gsvy93vw55eahsmm8tg1jawg98eg759f4ckm4yucr41sx72dsatzny57ly9b3a4zvmngzw03zntlp2msq2plwmdh0tjfl1a1qejh9so4a9gfk454pkav8nnk760m1am69r2hzcrzjcjbrglpb0s',
                flowInterfaceName: 'dfc1vugnxjtm12qhdaq00m97m23bjz0eugyappjqk74d6w0fmhyrw02qngztxtrbun8ua6eyrlitjkwrnlb0figzfjbexxnedgtk6yze110mx6vf8bwbvi58wkpda5u74wbcimb1hrt3wei9vmhipsroatnnfn4l',
                flowInterfaceNamespace: 'pkhf5dq9xyrbw7z5t2h3p8gbf7gafy9q01k2v5sfrljyyy1cialtj4hfv91zndhjbe24rpu87a9xe7xwdomblrcleqkrjpddz8sq4hj7ebhiok3y2cvr5cz5gk3u1rql2bnxie6eqhjq6p9lzuhd289qnuromm6q',
                status: 'SUCCESS',
                refMessageId: 'xtmnsdlqzenvvo1lpc0aban8syspz4sc446uyfz173d3zgg8ph0qdj9fdchyscgztf4v9za692ph1ik5e2eu7dy8z45kbaxy4nepaxvr9ij5ikqluw1h1zufsr436d72g1ugth48bxxkfmbyv2kqg1t5wup42oe6',
                detail: 'Vel et maxime fugiat et. Optio fugit reiciendis neque voluptatum molestiae eligendi. Earum vel expedita ad laboriosam aut possimus omnis occaecati numquam. Repudiandae consequatur enim ut amet rem fuga ipsa. Facere sed et tempore impedit.',
                example: 'vouxh2fm40j7ec20shniamffexse8hhvu3du9e5rwwbzmfy8k0dzdk7mzy1jzm8o9w8pn0bliaasndulk2idocd7pc7gd0mzb561ldgs03t5jhignfuxao5b49td3chl320e8bf50s7beux4i7o6jh8trqnj741s',
                startTimeAt: '2020-10-22 18:21:44',
                direction: 'INBOUND',
                errorCategory: 'dwdoxmv5xm8646f9cfzv6f8umg7pu1vdd182cuhnb9dxkz552odmy5mg938h7mz1kaaev6qekfj788e4ybq1ehkrglijixovwoujvp6rl0r6rlj1goedvs6wzdguadyjbmej2se8dcitppirq1it7max2fn2iqmq',
                errorCode: 'q0fojcrnzds3sb1qd3l1qf0o77q3s5hp69e72ouin668cjspvc',
                errorLabel: 850041,
                node: 7113376180,
                protocol: 'm66h7jtxv18yx7jxnhq2',
                qualityOfService: 'nh2z2hulx8op0ngjh0tu',
                receiverParty: '8oqcjdy0tcb9znosih1aph7n05z6y0h79ebk5pckva7ad2t0fdqzykh7pp7d06v6fvt4k7uit8dubi6lflagff2mwfv9k4gnss20f97t05p4e6iuvx0sacsdpmqoic7habz4s3yxjl53qzjvql3y3raf82v29glv',
                receiverComponent: 'rv6aysgrmsqboxicbqceit5lemz4c3tnkv7svd04905w322yxe6cjevrqyqlg3z242yvr5j0r5riqesa7szz2zhgqzvgo16td5cfnok7aur3cqwxtjsm1vqbesd48ttrqqm46ce1n6azsaono2l9wtcrcgu0qf7c',
                receiverInterface: 'hik6028h7713u11ytkjph7vwel76k15elj7wp2wilup2pgirtt4oc0b4t74vg92xyo4thkh8w3nq9sh4d6632vb7k79qdoivahp6ph6uyb8qafz1va2tgysm5yu28k2wfmhx9wvb2cqnha6wk9cblaqmfv7giqgx',
                receiverInterfaceNamespace: '9jcmxbg1pas7jacqbtzrzka2yjbn2z41sllsjw5bqj0hamfhf25d3c5ezxliyx8gboth1fnkp9zkhihz1d1ex6l0qnu333y7ugkidzhb5sssc8m1two37h4ama48iu269xucock9a7vrd0c883h8qq2s57ke6j4f',
                retries: 2653097281,
                size: 2506535281,
                timesFailed: 6379294218,
                numberMax: 9187676216,
                numberDays: 9946994787,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'newg20ozi4fpzpoc9tkkpnph2nt3m4mtl4bf0ehx6azsv76nbm',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'jf1faaym7q24knu5u479',
                scenario: 'twsuo7n7qrs79svabxlyegnpcq4dygkisc8tvnianmm8u248fswqyh04f10k',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 16:30:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-10-22 07:51:26',
                flowHash: 'whgwkylqeu3x5rcl2uu85viq5r2yocpt8xz3jug3',
                flowParty: '4y4w519ocqnna64dn6jzlv5082ggm1u4i1dyjv0gawqvnqzckmxtkoa9b21duiq3nrnzhqs0xu02arbuetxzxdp0ofs6yn369jdrxfuanarthxey6hxk6s2zubs0vdzapbrgawl6ech6zgw8wqbt7oy37jgmxrpj',
                flowReceiverParty: 'ua5otas4n0ske2zl9lflu1chrg7fanui2n9e1l6zx4xhhzxgrtof0a4b9r4odxcrjwjqv8gzuzrlvhn27wdkcammk1lqegqfy7i3qyn0p6nj4vsz4sh7b8zahugk49tdytit82m5fov3hgxoqy63v2m53zqxf7cy',
                flowComponent: '3bbaah0ym6id35vk09qndge2kyza7p1vbvb21dm85f42tfas3rsauxs417dcsmy43gt941ghdg8dga6oain3pzvw3eg030m6eej544dl1a1kwh1kpe9ghly1eluy3i4krx1mxm2jjcex5dmpv7noha3fylcxtcbk',
                flowReceiverComponent: 'tl2627afdfzes6sptxnyuk82kr19744fmakw2mhudu8p0utubjmgs59nn3br2taq2lmkap4t641bjy3jzs738ffooboytzpnnilvx09vvmbbhghfaq0mktwupoxeluz3xrk5yxhud4etbp5u7ggjzzm0qhqmxcoe',
                flowInterfaceName: '63d4jcsws5n88vacr6u7jwnn8djxjwphpan5ay063dpzn7xzkji2lum731xe3r7hjccyhc2wb773l4vbbsgb4ymvelly9y0k1xeseqrd7yv6rdresnhhp9ki4ilehdfgou6a62rsdkt67ur695o79uhwdoy41cnv',
                flowInterfaceNamespace: 'd7w1okemms35atllc17r79b1kew5803sgwe7p38hs36mt09gjgu9rgb18e4oqrpue9d1d5w0ft09pxm65fhqg4oi2m9e3m45auiaer1mhg3q4bun23csb9wo3vep7icpy489ok47iz6xasbjip89rbjierp1ba2j',
                status: 'ERROR',
                refMessageId: 'awc2w3fayi7xlmdlv0wa2uhnddn1c3vd9309rhtlkbo7w9j4hu4i4cnqusdjoe156jw0kq514nf9fzmjb89lfz0o3neu75305t06qb2n1vibxm2aa38mpxsgicter45j7jwsdifnxu46t3cqrx38s26vpfeeffve',
                detail: 'Et eum est culpa quasi. Commodi dolor nam molestias. Iure ipsum qui quia odio impedit eum deleniti voluptas. Qui quasi quasi saepe blanditiis corrupti et veniam. Inventore cumque error totam possimus.',
                example: 'tcmbaa7kmwov9puzfy6fpgfk0hjsyiupi5ul2nh4oowaxaq2gddhy9rrjmlxyvmezuqx1e12hv27slxd2omzhc656i4lcmbtvr9l2czguq9m4sgmh6k1sso4pfl24kx5g7mva8bu78un4jsbfdi0rx3vxw8hh99l',
                startTimeAt: '2020-10-22 20:36:28',
                direction: 'INBOUND',
                errorCategory: 'ttfh4zuii0t4q7awirm8d5u9ehuei6gqrev0fsuii8quhqayz0j3xyn8mmthupetjidymcfaxsu3yp3kiwmg8eilyoz0xal04k6s1o9bu2bnze4m7wavtrpczil44kdth31z9ov3tjfu9sy4cpjht15ewzc5acyy',
                errorCode: '5zkzqm3sdecgqtucos2qtpuri9ovm5onc1juekrjgh6tgpgccd',
                errorLabel: 958494,
                node: 6344573869,
                protocol: 'fbybfwcnrfv7uxxx0z2a',
                qualityOfService: 'gksb972cp4mx8dr6a36h',
                receiverParty: 'raswt0yi2kz6waejj989nvzch86lsybc5jrnuvvmarwj940htqkz61r4pl2qtms4x3h304szporkjzujicwg90ogr9cv1n6fni7iq18e2ies3oqg1gvsq0tp7vis2chccmbuq0ac78oy0izigtcy5w35je2xebts',
                receiverComponent: 'jin8xy5354x05mxe51z3cu5kxgdpon75ig0s0whcewbd0by6f0qutftxss6vxcdjd9bu30nqbzmdrcsvl8btg1heu53pe9hp51xiqtaaggmhcxs7mjhari4qd2r8t397b38xxjgsrqpxhzmbofa4uiy1ttylw9jo',
                receiverInterface: 'hr94iqtd3mj8a27gn27wi6xgv8n3e67ddb8dila54ii2rg6t1zn78hmaiagdhyofpy2huvm5cvxwszp7zf8ck8r0hbokvymvekccfs700m740pdpti7i6brdopdsov5rbfyshzfyurf5lm6q786qq0qtluuyxwi0',
                receiverInterfaceNamespace: 'q729gh0t9ngnia0yzbfsbrwhfw52s910zdcq07x14wotwjkqbwa5hqhud0alhz5gnkovq7xmgitkcwysvzho5f9g3onb0zuqwt8m7ixeuiawjp9bsrpugg06y4fatz54god5lrh00yamxj6q0wzvj45f34r8gyw4',
                retries: 9765769750,
                size: 5532061926,
                timesFailed: 3115742855,
                numberMax: 8227300642,
                numberDays: 1778444545,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '4kbmg5b5a9q3nlsi2v4dg8dxpzk6tigjiefewccz20u0tjghvh',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'k0prb6xxgn77gv3pibsd',
                scenario: 'mrf9oo9afua9idtc258er27gyaihbfos87vjllpg9r19jbe4y01tl8q0vca2',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 23:31:40',
                
                executionMonitoringEndAt: '2020-10-22 17:27:31',
                flowHash: 'm0izjdyczrag6nahw8n7hsa14tt1kssupl80276j',
                flowParty: 'm7elh3o4yedu71ryag5gzqw5un2exgo4qn686u0shjnjgplk29v3drc3q8ufuw7tnv6zsyoko5ycs8hcuxwnn39dbtl15ulcpn4rqkyi0npp38ja3chgynd8ui849g4vfejsdefi1n7mojym5vjdrq6wlyt3xjo5',
                flowReceiverParty: 'zdakvsrerykkw6lj8ds3o0qy8g45bl3tgkng7ftcw6fr92x297sqk7w32vzzhpe5oh2t5ujgg3akjdx1p0n6af50lo73mzlnd29sfqa29m7655rj0o2npqw86jbgi8t6oq9ycl11q4pqfuj7g0sju0dq61rmb4yv',
                flowComponent: '54arbpur457os2yh5uigcv9dei04bdxcs7zm174rnf0e7oxig8ns1pw49vwj1bfu27b2ab8r0nhlkl43snkql9p2x1934l8p1hqcbx0u6gru8h5tavi5675mkll650jpe9j0i12xouvlybxbrqbj5kxaq7rf9q2i',
                flowReceiverComponent: 'lwuoqxm3bvghkp1beqb333rtfavospoproghfvpppyen2dkxdas0tw1nmr5qfksf39e0fe53zhfk04ajoig7nviqccefe3crk4lqinntsif2sexzmrf0chozv8uyrj4cy4zotb2v2hwng5jjgia5g5sjkol4k8co',
                flowInterfaceName: 'gb1vnu8ejt0x4uyd6o6qaiy5c4ln252ccb3ncgmjpc72hzol1d8ou3cfe8hs15f915fvydnh7z9lcvf1dqfjjzymgy4mid9gsvriv8bgmdc5yr91sew4kjdx816heq5p7vmplgi0w6yaefi4tl2jdmfpbm9b0zy4',
                flowInterfaceNamespace: '0okrzqwuwotnkgfzpged9jod4auxq9m6f9zm4qx0r0qks79up5b8j2fckbczzm31vnj3uf7o8h41prwyw554eioahfiqdd3tou96av8dtyxzrsnfr17kfwzhzsxqx1k4ybmymd0xjc6sx8ox151fn415m132bs8f',
                status: 'WAITING',
                refMessageId: 'h8pgpdu2icnk68bvb4cgta79zl3180o83m5ydn2ylwgdpa0alnyaks2ed48a1l8d339ghsj54nh9b3e5t111v7mgj3oq2p38se87yim9sb7eoo7sje8bq2kdcqegvxo0he8ovrnpi4hjupnp5vwxb4r5tlimslfj',
                detail: 'Laborum minus quidem ab. Blanditiis porro soluta rerum voluptatum odio et. Quam quos voluptatem doloribus dignissimos architecto ipsa nesciunt.',
                example: '5ssu2p67mbrulkikcmp5htrmm3d3lne2hv70a22vmpx3kpkj0o5o61a38wjh57b1851u7jc99xrirkwwbxvqdk5ikqges60e93rsw3jbphfz0nv65b047aiesrtto6ilguaxtmy7rfllx3tae2jlikctl6p9r7td',
                startTimeAt: '2020-10-22 16:15:34',
                direction: 'INBOUND',
                errorCategory: 't3p3zel4kt7jokkbj624u92lgwycb4tzhj8elushka9xyihm5oowbqutomk4abphmti6q9luynput9sx58eo5rf2qb36da31p4s1hjutyw36cx6dmn73pdx5iqemxkuimdjo6ss1x9nar2iaey5moig0y2nzmr4p',
                errorCode: '5tvk6n207jilfl09skzadlgs8vf1ecctsmze0i63w7ws8c5ho6',
                errorLabel: 898891,
                node: 7787465772,
                protocol: 'mv9w5kc10nr2tlgj4wow',
                qualityOfService: 'p5rn6dlh7r23wskl0clq',
                receiverParty: 'jyd0ewvk6jh8ft2zxlfl0dxkdxkv66s47ailrjibbg4e9682n9ygfx5rv2oi1lxzgk5hjz6m75c5hu19bmbxxq02ba8rtxhz6z6rogo4tbr0lws7k3316yfqgic8bdv60vzlblg8tx5wn1tp1inivsvdi87uf7jt',
                receiverComponent: 'sfbl4hcxyt45gvbikwufxalnb41qobx94ci4hijtlox6png8ll0tgu8anjbxkf6c60owlrxoo0im8auykwh6hwshird9yt37bv80kih7wueamc9l5jgoi931uq86hrd3h1myimqotiuxn4ly5dvm51noz05x2og4',
                receiverInterface: '9jtle8ug4153rb7qgv5wmu4fyec7epa2i8d917t2nh53ztloz7k76nojxs3g7ssq4pty9h5ybzn93mkn3v08ap1x5raqoeyxiaqu25xltsdyuv84j6bzo2hwmw8p4k5gtlzwq037u6yjbt9blf76juu4h7bxjk6r',
                receiverInterfaceNamespace: '09iqj9d0va16qqwnukdfbgiqtdqgwz9xu6j15qv2q0sf0ic10yziar6acufl87joixbkp0sgwlqura7g5a2vrf06hqs4fyoq4zmbw3f6l9boz1wcigqtn6i11pwdnrkfli3mgte6407n7lztewpoqlf4pvo701g0',
                retries: 4482372318,
                size: 8031178543,
                timesFailed: 2870957270,
                numberMax: 3863112897,
                numberDays: 5871220874,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'bi1951w7ld4chscuzhb2zkcnbk6kpzgd9nvhz26gbcxq3wkb72',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'pqrv1d345yibdoo4nfq5',
                scenario: '3sp70njx4w4jdmppueost3gu4x75674c4zhn85ym5st2whd3dzzw9z2fjhfn',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 05:35:21',
                executionMonitoringStartAt: '2020-10-22 04:42:02',
                executionMonitoringEndAt: null,
                flowHash: 'vcpn0hsza742jnau153alldlsydb8umil4ob0s0b',
                flowParty: 'p7q73red1suyhyhqbl69te0pu5ahhn7b9deg0p6l2qyto1lflrqloy6f9u765njszqsmzwx2xnbioe23njblv1w3zpksby6dgaellgingd51u9hp6tdsb97p7e1oorqsrvifoau5clv1f2rzgudo8jbn4isp6vmc',
                flowReceiverParty: 'k7p5b3u2eucc0wjz1n579meb1i793fv8urnigq3080rh67euf41xqinlbqolub0xtxyjuv18qq7ha38l36f2rk8mkgmawhcwcqxqkthm38ronm4grqzjm7tggnao0elwsyd5urft9wwqdobg87ik9d11k58k7zce',
                flowComponent: 'xyx49ls532effvagdujcb4q59kt8mvv1i4d6gqp16fbldtoqjp6unh23t6mu1rt6w8ld7bawkiljky5gxkrjgi4nkuqj2v5029mcyb400i6le9w4ny52hm7r9ir2oxpz5x869hjoxfodpcgrzt2ir56h56b0gsqd',
                flowReceiverComponent: 'wq2icywm56ktw6x3tl0nydzr3v42cpcf8qnopf8o0ilzts315r7hzob8ysix38xby220k9t7ph4ect1otcoj270ctqu6lza9pqc6mvgy4w46hqijyg2hsne31s1cy4sso834syo1snw5wt51oklhp7zwkjv0190a',
                flowInterfaceName: 'answrezlwet3apq0sdvz1ootwjmpnyy309z88299gnedx6h7k8njcksihn7l1o6y7zuiy3kgcfvs6rgez7uan7hulvw7b7wsw1q513n0b0xde8que8x8fjpo1qi5t0qbcz0hg7tu7jat5u2tu300x64toxx8yznn',
                flowInterfaceNamespace: 'a8z43p0ard6jk2pvpb4y88n6jtusyuqkjnefc0yxr5401d63i2f2jqjez86w968fdnhm50qxhtyl84a4ggjo1ehqv5povx3ixujy1uoxa0lclbavv0iut3nycv2cn0w7r3h2oad1bqcd2vym46mub9eboqjtlzwk',
                status: 'TO_BE_DELIVERED',
                refMessageId: '86nv7fucrt04aqkuxpkdxfxqta6wfq7h8wqr3153uvro7ydxkzb5h2uey10xofszxgov96ryyhio5tkm319p3qsultxav1fu947avyju0iz1phu5ny8rkmzmfi8ad4odrbjdt5w3blycsb2ckazgfrzai837ruux',
                detail: 'Autem saepe quis voluptatem eum eum recusandae. Quidem nisi quaerat molestiae atque inventore deleniti voluptas praesentium. Perferendis in non magnam sit deleniti minima debitis quos.',
                example: '6826l68xq1scj7awc8tb3rbbk5c20esyyhq4yv527fm9uwa3j5qhqieyeruw2b0vyj1kqd2d1z5vpg7bu35tk89j2iroz23l4tambeayo2bw4nta29t57xui3eojn864l55mt56moy9mn11yiwd67lvpy0gbvtm0',
                startTimeAt: '2020-10-22 04:34:20',
                direction: 'INBOUND',
                errorCategory: 'nv9dv23qg2yajx6zpnxv73xu0cgf3ti37y83t3uxl7nxskgwnscpxl8sqo8cub8pth6i7z5d5162igs039uwtbuu0cx9diattlmqz0qei8sz5usnpaafcr7ngwro5jwghr9h9lanqdkg8bv1r65n7wdkuide5vn8',
                errorCode: 'udfyt0n8o56n7zrdad1jbr6mrql2outa01c235ayrsqqxuiwyr',
                errorLabel: 252014,
                node: 4097350238,
                protocol: 'ituq356dgu50xibxevcv',
                qualityOfService: 'rh18tls9r8xsv5i2eesy',
                receiverParty: 'koyh81p6q162x9wbhk63j7effz0wshjvyposgi32gfp6dz1ok4cu99cdcl5vesx4mr77a1tvm37yhhja30jic6gof034p3ynw3i2ljeewencctqwc6efoe6ad4u7erriaaw0zwpi1lk5pie61dd4lrnprldfpgut',
                receiverComponent: 'tvb9eurmwj43ekk260qj46tlhvrrpqqz3nm31fx9tzj4zvgnv3lpt3an0darsy50olud2teu0m347w59eqln904h5z09jdp3158loceioq1gwppyf8lrwkv53o2e73xgfb3bcal0zrdm0xay717k7au4op3v4eyf',
                receiverInterface: 'a4tatvlghixp5qo8fs51cudf7nv4bia86guxr2zgdpnhspd0x3clomp24quhj5oni8s6wb5qhl031i47ox8mnbs3m2b4ba1sjd1ougv0dvij9skcwoq97yefc0rw8xbhqg41cohu2hoj951teavubw8ftvtq0h95',
                receiverInterfaceNamespace: '675xjj78uh8gdttuugtne09zdw11lourlpshg8lc1vdg9n4jhp3ay68do1fxa4sqirku266u5nm77ocu2tr2sjipwh9r4ls7ra2fg3u2xz7q5hgwe50xew65nwr8a140a7ixjynhkm1n5orwyd973ypsmhov7s5w',
                retries: 5516074961,
                size: 7917318464,
                timesFailed: 3399278881,
                numberMax: 5695717595,
                numberDays: 3053732019,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '2tslo5i4cq9pad5jzheen7bk9whwtu300ff543ftv4kkxv6gc1',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'blnnn02vn531b902524m',
                scenario: '4426yvfuxb84etjm6vzzm5dl8h62258u618om0wysky4rkpa1knenertfn94',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:03:40',
                executionMonitoringStartAt: '2020-10-21 23:28:29',
                
                flowHash: 'usw3bajokixyscq7hsamb9uw1ytghz313r27m5c6',
                flowParty: 'rjkfhourpv3ris60cq70khxmdjbr58jyuh6i7dqqmes2c525ju6hvvil9odkiljtgw8i0jf2hvelw1z64f7ejgm3obwlvi82o15d4w0pihxbs9qfwgsn1449sowxfpogp50e7lh00timxnpmjkj47c649rbhkkml',
                flowReceiverParty: '908964ek3nkt2owub2ip6secv3m30bp1k1rfvee8r3nxte59zyl4hq0dzrhigiof6hezjxcq72zyeoeujwiri3xp53m0xd8lrt8hvllvtx4k705nebelvbfm607fh8cbf5g7e226ln7fft2e3s22rdfb73g3qn1f',
                flowComponent: '2aru5qwwo8b3r0cyq6exr369fwp3qm3bk3isnx242uxeliqut9xyb96tcau8xjq3a80stczap0rik8wrlegi3frilgt26hr3v33v47gpxmsj5yupptdpq5obxngm1m5ebfjvwznx15dlh6ez8tey1huoi4s0wvbt',
                flowReceiverComponent: 'lx0mta4bpbreh13mfs3u6z9qa5kwv7wva4m8e4pd6z5cv5xslwx4g55dvbarjrtpv4ttkcj323bee2zufaeqbwg8autihe6lz1vfmd8kmszsvepscp57tnt354evejrk7ql9sc173z5mt7r8gvnv424vh5754klh',
                flowInterfaceName: 'jefkb4rkqwm82181yp6zpqd4rvzkv5g92tz73oqxgdhe00uuxxews4suxwz7k5g5xfljm3ve5ibd31a9gkcbu36evwcx1e31xv0loruns3yv4ktjksh59jnwjpor5io85ni703zpbn6kvektua9us8rue4fd3out',
                flowInterfaceNamespace: '45qvi43axcmsn58vc9o9vy9l0mdce4bgfmm49h5k1imduvsygkp84su4ch38tkqwlrqoj4qk9vdym08tmeywc3ue8f7lxrq23xv8ubx0sqlclkejb2nzghjut0s6585pfhrzezc9ems6zsve46pjinajqyif5dgp',
                status: 'SUCCESS',
                refMessageId: 'emhrwsvkmlp3cgcimljgarip76n4z3cxlg5k9r5rsjkukpkzd2nvjis9ppdddbuqzpmh1p1vjor15mj1bhgjphijdz1w4fwzykutfi9ddtwcgwaozqtrngjyqy0fzwybs89ixgg8z6cloa4jim89zbjz568f7mps',
                detail: 'Pariatur eveniet iusto quia facilis aspernatur occaecati placeat. Officiis doloremque perspiciatis maxime illum corporis. Et temporibus cupiditate dolores itaque doloremque ut nihil ut.',
                example: 'ybs801ryn9b2pdqi4mze7izmrh311sdh19378mf7a2u1ndo8dw3ceu9ckhioikuf6x7giabv1l2rgh7r6c7vz75l72x36ol9m68pl9yxdxaxijwd704urct7e82tvsd6on9lwpdsk6me9a7tt31fq7bo77woah1r',
                startTimeAt: '2020-10-22 12:48:32',
                direction: 'INBOUND',
                errorCategory: 'mecqmr5g4glge9n9h8xrb7x06jlnved0717ge9vxs03vmdn3g9lisgscrbhbqhpx1bphfy02gjys3m0wzgvsd6vov04mqvvi9np5ybvudfjv1ck2ssg7o2i9lrecr47jyock2qotk9vq83onm2gsf7lcfz0942i8',
                errorCode: '6d7d2g0z3aisebrig2mbikwlyhf3r3c5p5m4wu6q1ma7ld1k5c',
                errorLabel: 800782,
                node: 9045374517,
                protocol: 'y91tqio8p36xfkix1yws',
                qualityOfService: 'gmajzra2p8q0ntrgqai0',
                receiverParty: 'x4ac58abr5jfiegrgvrwr3d5mhcy8yasfimvbcugxnjtlhmbvqfn3dpnohu8lo9w1s11aiobrrb8iyeo92th1yexzr8zccmxkfmmj2jncags4icrho6g25wyexcxcrw97hjj5m08u3oq39zf37s1nwbqm4ldo05q',
                receiverComponent: 'png2599hjop6xn8ng6kx68rgmcuvo2y9uafx1cn9yznv7aj7yug9h2fmv0a2of75f2ka6mqn9paq36njc4dj40autuf359i564dj518jinttetgqxqy9m557yu2t3dykx7f1mhpfr1lfb0gptucev1ggnb1ctx1y',
                receiverInterface: 'evqr6g654pvwqcr100vcfy2jfdqo80warq9thpblfmgmyvcuucge2edoa9ek94up51u62zm9wt2o8c3m6suhtrbq4k827e2ibx6udaqxxxpqcbk9a33gqxu7jehgtrxvfmu8sm2r40gi95fjyk7of48ldscp7f7c',
                receiverInterfaceNamespace: 'of5chn0enh4b2ozl9vlxcgcjjk3qutg5hw7dqbr3br12v6ygvd5hlct4yso5lqlub5v7var4p0xyb0b15mopfl5ozkjopoy541zix8sc87wmd08prvxrt5gqwc3pg33ueey5ple6e4thesro1jczfljb827kywuy',
                retries: 2921045392,
                size: 7235106406,
                timesFailed: 5454058023,
                numberMax: 2604328865,
                numberDays: 2211619733,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '0hyn2db6xvggsgtjrk6fsc7jfv7h7pyu48f0sddkdkvpdbm9ev',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '2rbhnjki0ege7cxeimm2',
                scenario: 'yn6g1gnivdrkb4edtf188rnn0igxxca10zaftguk6613ltdkp5yg536qtvyb',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 08:11:54',
                executionMonitoringStartAt: '2020-10-22 16:43:41',
                executionMonitoringEndAt: '2020-10-22 09:02:13',
                flowHash: null,
                flowParty: 'imidnzoxevwdae2zn6ddov217klpv4m8v1ge0r6qf337ygkr0muib4wt6f0t972dfeehtxcnqs6lvzmu0qfmrlhun41s3x9ziuh4jybai5d3wh1tzob5dlie3vnwwollqlodifkmygtoiuj7831dcoxr66he5o3r',
                flowReceiverParty: 'e4a9aio38pxjcuqz2ki96zotgpl9rnftzol4yqjp3r9d56wvzza8hs3i7r51b11uxznyyi1sejvhgwosst12l6wb9oea256ksme690kdqpq4x1f9c0s1pg76eemg97ngd3h2i0ymplkk5d2rkn5h8ik3nkipyoug',
                flowComponent: 'ez9ypsvbxs195agubacy5d7enq1utr2v33epgbv43vl8k1wn862y27qmlotbva2ctry49dk5t6t82vjm4city08ng87pe9toxelvce4tpay5qx3sw8slrkl99iznb3kq55r6vl8rwfu6cvy4sut9orq97a5u5icc',
                flowReceiverComponent: 'h6kkmhy9773tjzddey2vn2u9lzd8l2qopf7tgty6bapxklqqidkqztyu6urqigdn32zlnfzru962849bg90urlevq32p8uefcleye87u53w06kwdzngg3pwkz7s98tsadlgjxkrhx6cvr0h79b5ztnwtrxio2m2r',
                flowInterfaceName: 'qar3lzc7dlpgdtz4o27rzp7sdak1lor6gqmhubleoptls3p24yq1k5lec10rtdcymepj82767awt9wbtprsqj4uobe9f3iwu01tir0whg4he8amr50znx2oal3bqhfxxcfqw6fei8cauqeza51niiaap8v4umoxl',
                flowInterfaceNamespace: 'rmool9t11qnf2nw898sm3r7hb9yh4jf1ee17b6qlhignubmt55r7yzr0gfp29vrpanusiysxsc0so46o19q2b839qybcixlrcjucngtxga922ra38oscd2tv1gxi5plbweytuaogkor61t3w1ofpml0rnhojh3tl',
                status: 'ERROR',
                refMessageId: 'hh7q2lrv80mzm7cay900f3nqk30k2gklwh3yfivtytqp28qqo1mxsh0914rkv6kv13333izdld4sytlaqzmr7ta7qczz7caqa3r4w6zt29nnf3uq8oymom2k5qe79vsmab2evwx3lo6nj8k4fl7spdg3orrd1zwf',
                detail: 'Et ducimus vitae animi saepe. Soluta delectus consequatur nemo. Et nulla neque. Eveniet et libero eos ipsa. Ut minus qui itaque quaerat corrupti aut eum quos distinctio.',
                example: '8q9y8wu0ybphonivd814vg5cbwsx8nkojb3zmqr9y0ibglbmlgbjtv9x82fx0w1cz31u8vteb9ihai8f448svatxtyksja4mb1nuo8pqt5wq1i8f0j46jfuixelcsql0n3nxzk92z5dvssxrhrog4n4g8ndve8xh',
                startTimeAt: '2020-10-22 20:53:14',
                direction: 'OUTBOUND',
                errorCategory: 'mne7teaf38h9dzswsyg6dzbox6flw77iq71qrfpb78n0bllo12lu0ac4ajeug8j7czrd9dj6m4jyvays6uce5uvzxglkom32renapcjn33jcyx8wpo6x4kqjdxijw9tbbl9zplgxskefba9ustw15yuap84wl4yu',
                errorCode: 'z9l4cege04g1grbw00nokqvh0hix9g5rxy5jsy9eamyy2v4tgn',
                errorLabel: 959100,
                node: 8482305692,
                protocol: '3bqsjlwt2dqihey2l893',
                qualityOfService: 'f0feuxeog35k128h8v6u',
                receiverParty: 'gkukhtuef0t3ovu7pj7j50wu6x7t0og5yfdnr7gye5hvd99iehwkpfdjs5aw7dnuqadgo9n0mi1y8lnqq2xaprrcwgbjuhehie0v84cjfmuh25deluwjyut5f4n2l353h43xp78t4wdhnt0t9tygsqg2rk46x0hb',
                receiverComponent: 'qxsf5ij2b6gdhrt9onxmoxtjgz160yemgtkqxf1qhgegj462w88ojo76v7kjpbe4ho6ar8fdmwtoi7svsbdb73kh3ophdm0r4vjev33oghskic3uwnddmbekct0n2rash9u5l4e6ekrijnz3bm1plthxn25toyzo',
                receiverInterface: '2it4ur82o54c4icyi0r1yknkjgui7yz06zl0klxpa28ldb3vt7uvv87y20d845xmxcgaadhou5931r1jxqhgt0rlgaa746rg4oco6ufyjn4u4e510j4hnftwq5qpgq29gjxibtd2t99g3gbg1i3hwigzgcsr1530',
                receiverInterfaceNamespace: 'z1y83tmgngh81dmdn3qkrnxawsud5oul1t0z45j2rlu0x9qn8kwq3h03ywpg57i5mpw1w8fvs9y99ub0knq6oqz53rvrejvvmvemhecrk9q12n50qcz674vwpzvg9iyjsqpa28232fjjrsssbr8prhoj69hk0vyy',
                retries: 5625357476,
                size: 7893079302,
                timesFailed: 1502297591,
                numberMax: 2462878824,
                numberDays: 5378257061,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'udv7i9wittxu8w0p1eie2tkmno0lvtv62cizcb88z44c37qiek',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'nfk4j4q1ki4lh8tl0dsz',
                scenario: 'jtetf3uyomv7leprxqypssq2s1p4s3rh5322mleqrnbvkzpol7nmdprptnxk',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:08:36',
                executionMonitoringStartAt: '2020-10-22 00:11:19',
                executionMonitoringEndAt: '2020-10-22 03:50:24',
                
                flowParty: 't6sow4pom5vle0gmyvomt2pzrcl7bqhe0zu4lmbnu98ta3onbt2obnjx53b7ejqgu2lg36l2305nik1qpjsvrxnvugjdwv02r2mwo1ua3hhhdjdntlc2fjtj0uv56efseks4m1bknjxa7m2it036p387ov1v1h1p',
                flowReceiverParty: '99t8t4ud93esqa1lfaczjao1sqljw8f8l8xwytt16vobzezhu7jk9po6wnqva2l6sl09botbahh5spnjn5fo2brx318wxmcfifhzgjqygnnqu2rquak2c7pdg4aplpo9gyfwos6uwx4afwt3y0kx2f96x0bdvdtp',
                flowComponent: 'ravx8z1gbctyv8jzlgw0fyadqq7mtbox9sj8sosrz7r7l3c3g7c3za44yyxb7iz2iifoa22qljz44mbb5fy1eyixq4mgh5r2smzvctcxz92lu980nktr7ztlszcjif4nsliswk6zybh488pn7h8n3c299dkn5hrk',
                flowReceiverComponent: 'axhhhz8y2ooxavvwpligt0glivijafv0u8ezqs7cu64ow7j4uqpysmx32jjosug2i85j7l70z37m98vvuhbdstzx7i3wlsrxvouc6wtdyj1k8568lc9yj0brim8cuipz8u8o39ykc6gehvtsffmxb5x64kce9ize',
                flowInterfaceName: 'im5xpn2mr4rce8adpj4fjvoqrw73u6mv2n7dgtwps2b1m8a9t1qdkqajm52xhwopkvburp72aenumt5s941eiqwiruxbtlto2sy19e1i9k40tp86maw3ju75f5hmfxbq4m4bq060np7e0rctnwr90biyfmxgaxes',
                flowInterfaceNamespace: 'r37zoxhqxlcua5v5ve6ck27bae6v8reyo5yjegfimwsmwi164cmlkchfvhmtpxfzyosu5w5i1q028a3sgzt8xfsi27tbd31ppt9zpavey04kc75e2l4qkuvy4cataird0rig1bilvhnhnvoa5qpjihebtya4png3',
                status: 'SUCCESS',
                refMessageId: 'tar4p4k0tkqxkiut0io15n9wyqjoo5psmcswtnkslzron3rqv2alkg8hsvaohmjiub6rvgp9et3unhwavq12n9n2yfhavdjwopv2fr7k7jmlban79r7ycjrwr2iondfsd4ozx7rn2u32vuvu5kg01uknzfyrd3dg',
                detail: 'Ullam qui deleniti. Aliquid rerum laboriosam possimus non iure reiciendis cumque incidunt. Repellendus consequatur distinctio sint ut distinctio nihil. Et et soluta sed ipsa provident nulla.',
                example: 'gmpp01if04rhvz9gu96m21r331zci495mhb5j4qe2jql327brhvf1vyu6zn7pwd4w0j997yta6zbspjymxp9p9jg8ch0uigdo993lwn5r5ugz6p3w1ywf39ol2pqbqz7dlojs0nkjtoxce4myzpeq91pe58o30gd',
                startTimeAt: '2020-10-22 13:13:02',
                direction: 'INBOUND',
                errorCategory: '0odrotfxapgonwg48j2jbl0xnj5x3rrq79zisq93svk8ftjykew5tzpwgz4lep6o4xzebocajo721dr1d5euvwvr1rzgsildcyeg7bjc9flxer6xizduqyzxat7f4gxuavb86lwa2pyer1uo72rdqgmmul59shj4',
                errorCode: 'xcka08jq969zwdltvlhkj1xjtw278b8e2hyuftfx09918y8evf',
                errorLabel: 920889,
                node: 3553335782,
                protocol: 'z2tecugsnj45k9e6ch1y',
                qualityOfService: 'x9f3x7jldger04w8oj8s',
                receiverParty: 'rxkihiqq91as8d90mljiqbg3dl1wi0po1kefvvb80lqxqqay651ram4gcljf9yw39bwk1oe9gz03ajqjm6st19u9z8bec0i8hpxg8om9dme7t4lhojl106xhbgphdj332u9zr03bt6t1ecqzkqekkqrsgrce62cs',
                receiverComponent: 'akxc3v0vzj95ews5tk7u0a263zejyz3azvu5jk490ppthw548k7xr95304lmkj2yzhepjm7wx4lgzrde1fjk0rqyty9xk7j4gfr72tf6wtmlcyzcrwj8ji3eqrywb6ajh4yq4s9s1znyj8fzby1mrxlhjjodooii',
                receiverInterface: '0sudl50svsub5pj4czby0l8i3rpwuc0p4uqbpo6h9af9jk783wil3dcwjbuyulp6419y8vlrvzrg9n0uk2peespg208h2l1qwqqvpugs0arjrs5cxlx97r6a3ny59xcrllunkaw1p4v8eozpq2w8whl866xahjzz',
                receiverInterfaceNamespace: 'cxia23k3oqptt63pfw42jpv0qbmtsinrxf6ggkcm2fc410jwa61cm6octyzg4g57vi5uvr20y3lo7tzqa9rqq192p6k66g86ykbjx4t4uwqbfctjoovtfd5ddp01nuaoisr15edhhm753a9p5org22xsfvkd75la',
                retries: 4082206241,
                size: 5420768262,
                timesFailed: 4026221079,
                numberMax: 2599832560,
                numberDays: 4158663893,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '44svlq0c5z2xxj34nvft5j186o2nd5u7tfuqjvwujp63p0m6f7',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'uz9cxr3tnntddu74oc9w',
                scenario: 'rlx63y1ietkifpeg5i7v8l25n2uarflvz7gucfzr10opunhejc544kp9xcch',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 16:13:34',
                executionMonitoringStartAt: '2020-10-22 16:07:35',
                executionMonitoringEndAt: '2020-10-22 12:14:12',
                flowHash: 'd3k3vqhc7awu4zrr5ynb17w37eldh13d3ck5tf90',
                flowParty: '9yu965te24b5muaz6qb4jkjifxkmpovszffdpshxszzl5raz62vwjeogonwxxjruczjuaw1qe04i1c18u5l73f0zginyyyx6t4z8l5xbc0145u79m0pbtam88y0sbdywzzg7r00mdv0czglgk8vjdx1fc4ouivve',
                flowReceiverParty: 'eqpy1o8zxn637dcvspzs62mxmzi4w6m3mm4saxiv95wrhg86l1alriuksq4bx7pfg2y1rdo257bfigtyyf34vrqbfc88axivbltljll8t72srwpcrtibcc73g1dfh7yxpa1olv0hze8yjo17ed1xe3jwd9mdqe1j',
                flowComponent: null,
                flowReceiverComponent: 'yjuznisvwortg7l4d9u4618zkkg5rd0xfdbwr77xp5ag9nnp9p79q515nw2cxj2x7ae9lgkobamrpk9gabjj6a6276b35wx5jzbgds1qu39ektep8e6ie2rycsxlsrclriaxt41qpxll5qryrlij52xd4o74y02h',
                flowInterfaceName: 'tihxfa8ddpdc2cceh7x33vu552wluyr67iflw8zbfh8rojvujtgu8sixncupqyik7v4x3ty6q73yy3ls50os6rznwfz4sl4sq9obmtgjsk4ma3xt8i3s0vrr4h9y7n8gx5m7xq9i0y8p3x0akjucw4pgu74q8y7b',
                flowInterfaceNamespace: 'p339kmc9ndq89zr8o3zbolldsgv6rdsorkvimlgh3zck6gdlfs4thp1yfjft2k3v8x0ay6xzydcpan36gs2w755ng8dpd3g86ubbh6g3nlvg6twr2c6jz0o6xywizbxa02g881337kjxw4bxd8jkxpdr4izxlf2d',
                status: 'HOLDING',
                refMessageId: 't3ihhdcjbxy85yqx1i0ssfrxopxs8a0jmy8p37jub2i4ybt91tzowgz9etf7zqje5i9nsv5c58y3adtyb6f871pbf6rs3r6ravvke2v78ucuaftoan5jgt20rp7cbjl2v5333q3nz62vt4ec63n13lz8ooehn59f',
                detail: 'Ut sint quia ut. Eveniet voluptas vitae est quis autem commodi et voluptas delectus. Ut pariatur fugit nobis.',
                example: 'cytlxsfqhptsi5ci6mvsegnyw8lymvxqg8byi1nbotl00s6ugmqnycb1c7x79oec2cdkdg8lv4tg4foptipt5y57h6uofziwjwb78nnhjnr0wbtq2de5wkda7r1tennqznn14yd9h6fjk05796yuninbiehwwot8',
                startTimeAt: '2020-10-22 21:04:37',
                direction: 'INBOUND',
                errorCategory: 'toil6h8pc4ld2gncvrcg0pzt2rcolmgeau132hug8ctq3q8vh1z2vmw6fmehzx6cam8w6jkafcbqswpstw329qwibbs8a3u1mq9mvlpgwrpxwejc41kysda9l43l2o62er8lw4piogjxqlqbq6t2jermq2ssi0ll',
                errorCode: 'hkul817llwtac73fshatnk785zhv49iku7g5htot1kofv07a9k',
                errorLabel: 647166,
                node: 4948405138,
                protocol: 'p2kancso3a1a2xyvtw1a',
                qualityOfService: 'ok5e3xcba006dsoo05gj',
                receiverParty: 'siih3k8poekn1d1nfbjwgac0ek8nnmu5o3x32mhd2lubcj8if2m5a88pp5h2nm0ws1y5e2wqlhu3y1wkfa2tyt2uqksxg4fie05qg5leaa0unxr8kmmhok3ljnbd7hq3opt1psehnvcf0qa7vn364bkwcv4q5d3c',
                receiverComponent: '48m2v30pamytxavbal10gq3vlhget5vnybjlf3nrmrqr2koqkqf1df9d2qmu4xdnpb0edyvp1u6klmkqky0m064m23i8r8i7d7pwrzrydwxrpbfqewbb6kenyan22esbub1z628g8n8ghb7ckd558w5s50i4pgld',
                receiverInterface: '2iarzrtmpdko3wn72vrhqa5v5fkqgi430u1ltjt9h6fjf85kolp8whlbss4oa17zfksj6yez08d43x2al20oev70k704j17c95jjecdh6posmksecqm70h4ki6crqk2z0llatprj1x9zec267abcbcgci6197o8l',
                receiverInterfaceNamespace: 'f73usmu3d8mjph8hou9sygbt30vcy3m4dhzmin7rbze2ad28jevcemt3h6f60bhwdncwcbstcfymqk0oel9qvj5gbijv0vipbeqy4k05e0o2vm9lqv8ccj40z17zdtsnul9dd9piv0q6hw3nzvhqh6pgcztyx9g7',
                retries: 4107080258,
                size: 6424016388,
                timesFailed: 9744347102,
                numberMax: 2292343314,
                numberDays: 1954390884,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '5cf7bujrefjey2ihcf3bholf2ywqx5v43a42d1k9gq48vc2kjk',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'mh3h0ehyykbl4tw8z44u',
                scenario: '3v8129vmphmtqtleyhwxp9jstz3xc3rc0q2xpo6ndmtpausl3coz6oanovpt',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:11:58',
                executionMonitoringStartAt: '2020-10-22 06:50:26',
                executionMonitoringEndAt: '2020-10-22 02:07:04',
                flowHash: '2deranlxtt9i4u4ffzjuo0lkrckln2i6eygijfyu',
                flowParty: 'pw5txkwiwafk11xk1iotlr66ytzi3b9qmtpasmi3jn1it6edn1bddp4c0rmov4or85mzn4mp69jmbty9x8wiq5iw9lwezaezd4uq6uxipd9sam3pcd6z4lnucwrtgtsvxpti761ckdndh13w30qk660mm4q7xuwd',
                flowReceiverParty: '0szg3s48k9n5uxc9tr1l01rs2c3f1c76q172gm5uz2ikgdvy0d8ft6zo6aut51sk5qzq09laas7okd9jvia2qvzfkg1io5k2f0e6ic1pf7rz1cwrpkiljartgjwgynivnnaus1wp08q1sxwlch21vc3aptj8qn5f',
                
                flowReceiverComponent: 'f3qhzjm1s4fr2fp1lslp2ze2h9j3fc97wwt8mz3ve7eisch37bop7vc4q9384yxwbnvoo3l3ayuege8i527c63mhb5ienvd2p1c7p66bjj48dy74on6vhsaaxhi3jq2qb107026mwbai797kvhpf99g14q7lh9uc',
                flowInterfaceName: 'drv4c4bovrr76db8uo752lh5oum5slz9lzk0uylub6se21tmwvdqiw6xnxzt133dotspucj9wut7glrvpt3exzjxgmvbl53wsf3u1qcwnyxu15imupmovsqxbsvugtuygwmiakgdfmsi5lkkf5z4de3yzh3yr2i8',
                flowInterfaceNamespace: '9budavyen0ipx0wjisoamrv1wbuxnlz9e114qzrmp2ycvu3l6a4mj9q8j97tloewg1pen1v06f0og1x8uhwijk1m7pniikh8w7r3zcnqui6na89gh2ws6vlmoov2hswue974ttodp6ou1srase7omsn54xbil91s',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'v1autzj1vjf49yqdg6uglswag4ovsk9esi6cry918o9ug8fmsmh21e89picmd72g1n6pwdvq9ibhy0awoqoeez2jw6ma20ay6b2w6qywuj9o3o1xmmkju1onz8bosiextlln8e8wnv07o3gtnrq1t8o3ewvh1p90',
                detail: 'Impedit labore consequatur nostrum minus eius consequatur sed reiciendis fuga. Quia culpa ut natus saepe id. Ut commodi quasi laudantium reprehenderit sint id. Dolor molestiae facere laborum et ad eum aliquam vitae ut.',
                example: 'y93eegas8uddtjvckt57ger53kznd2i0o8lotaaux9v00okfa7rb8zdta6y06wdqqdoe09h3ak44wkkpkwskvzo8obj91n609yby4dufx7wxsemg80hfjzd2yrsdghw9raxsifz6dy1mc9nf5166ptuedls3az4d',
                startTimeAt: '2020-10-22 10:33:53',
                direction: 'OUTBOUND',
                errorCategory: 'h2gkidn370ioxhjo4qrwcz69xpqpzoauzc0p3yp9bc8bsj6e42ldjgmtoc22nq8pj4hwshin5jqv5v2ciw7epg755ifbkg9zvbdl064xiivupq4nneterp9bxczn4zwlb95e1ezew975yel2xfuljqj62yu00ri8',
                errorCode: '6d23zw3r6ma3j7jj80s38coqs0oo4vtxe0nfvo8durag3v6mff',
                errorLabel: 788902,
                node: 4001290922,
                protocol: '33ie07haqcu23u6mjeof',
                qualityOfService: 'ir2426gxaxn87duz57bh',
                receiverParty: 'o94s2ph6axkxmsmyk38iczabtqa0vr90frpmqpqah2t9fv9y7aq80rfopboz6vz6wke6sh3kho1hv47lz78sr8g3p3jiep3xjxayfx8acq28j274e9mjzeidscftpy0w1ard9dt295ys2uj5nou45jkf9307h8qj',
                receiverComponent: 'qsbyg9kuymcnppsrpoeb899f1k1eo4vsakleue0ws37jdgq9epctdo2n9181d6obu0yt889z5ij26i81wunuqnb6lx3uxebyk18eheqk9v7eo5vpeeqjqbcqt4n5zx43ixjjonhhn1dqa0faw4msomuk1fkwwfl2',
                receiverInterface: 'rpiqzdjt7h41taptsxp883or5zo5eqdlhjhjo4umys533rmuxt1f0jwxv2y3wevahm9ozzv1v75zt5jmnbkf3ngcxa4ep2oniptd0bmng02wy572bqf3dcp1m5dp2h1kdgu7de5h48vhvqcwan9ieftjzkpziwcd',
                receiverInterfaceNamespace: '2vfzzsvnm200ifkjp8v5g3nrc3syg0dd7hrgwuh3yb3bddgykavkzm6s2nne9t5u87h4i1j1cl06rhkplv5r0i7kn5ycho574nc4jaj61z57p9oze2zswdrfiqbo3axfjwpb6sjsf2xux1sx20pk7vmo80nw4hfu',
                retries: 4409849364,
                size: 9620081993,
                timesFailed: 4783500425,
                numberMax: 7306941105,
                numberDays: 2101823332,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'u0mbeznuy82blf4hvswhyzt2asju39lkh1byhuf1d31d9dx1e3',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '0u4pkezti7soj5znnbln',
                scenario: '6zqxpzie12xd3iimn58sq56kc278ijn807bxt7hm61305d41yifl42uc67zf',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 05:50:46',
                executionMonitoringStartAt: '2020-10-22 13:21:50',
                executionMonitoringEndAt: '2020-10-22 11:51:17',
                flowHash: 'adpvrvhs6hfntpzkdoxfmc94qtb4i7hflt3k7owj',
                flowParty: 'sq8x7hkd6aier5a14d8si50fl3illrpkt6r01qqybiezs7lbzqo4ek59x2ygtl9w3l1f5olx9qgv367g4pisyfwcsd47ny425opkjuyxmbokfqkvc23d4hxyrnvemr03fiiqb89nr3fjytfk53a0g3zpztoy3zn5',
                flowReceiverParty: 'm7ujt4l2ce85yqp6qpu18alcolfre3khse80w1c1x0xejsgurde8qomh4lt3o9isbjcsqj78scmzjbe5qzdfei0wt4czll2x246u9sm4btqs18ybm1w9q9tkef9ycsbw8mypym8tfcdf32kccd843jwqn44rpkbu',
                flowComponent: 'nql3tq2gzjl80yylbjmw32bk781nmb9jj0p9l8oiztdgkv9xcx2zyjp95i5x11qyfr0td2487vhzslzhcvyvawio570vmesfk8s5tma6e6jvw6w43qwqh8fap7w3bk7ms0uybcjoknp0wvpxq9w8k8j769gya6to',
                flowReceiverComponent: '98xc9u66s0pq2ewhxp7yft94gz27r79zmjkogwyu5p08h2kpha2indqqotyer2koq53q0i0j8tbflhw21saa2azgy88czo6m7kd5u4b9labsoza00caurlk8axo6avj5z9vjhcui1zehg6uj186afneebo270l69',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'yegf1wl1tgq3fpy6tyhze4sh5wvfaml1hjig8z19bgyd6p32tx7z1g5ht84avy91ngdlc3xlfez484pataaptesv59o5xkt6jh5qqql23e955j22ex7fljch9rbqrg7rlj53qr5cfefbjkti6jvrl8dc3sc9bj7w',
                status: 'SUCCESS',
                refMessageId: 'hv1dkoy74detvhb9ogf89x0oomthfrbm5t8vw201tzbjwyq4wgqubglw9hw5dhptb97btf4q9qwyeejihd45g8xy8l9enldx29uovjbym323efl8syqdmc45h5w0pmc4z98rj6jov2uemuuexmazrotuum728soe',
                detail: 'Omnis aut aut voluptates. Ut recusandae quidem. Quo praesentium maiores repudiandae laudantium et sunt rerum. Molestias a repellendus eum rem. Reprehenderit pariatur sit aliquam cumque quis dignissimos quas. Placeat autem in.',
                example: 'nregjamxv53cq78lgdge80dzx8tgnhvqa51u0wokwxdofuqfhpwbhd2gtfs9dqiya4wh7yley6s252x1mk7ojewnfpahcmw5hilyvle7mz51ahdbdeiy60t8sl76p8cflae085jzi7dd8a3arpg7eq4hz8q2r4ds',
                startTimeAt: '2020-10-22 22:45:04',
                direction: 'INBOUND',
                errorCategory: 'sxx683pmdzj6uwwkb7w6lzf1uhx4deb02hl94s6f1fdzynmqr5o8zjnazogsvw81np49kt3vkx27oxy3rethjxmqqmw4mto6u6wa6vl0dac4sgemkkwfz4pg5md2qdtqwili257ugz1j4blv7ncqj6vlh2210ura',
                errorCode: '9f130d41mv2hueus6mu2xbnrbv2m73efzwxrprj6u113nql69e',
                errorLabel: 889978,
                node: 5259877353,
                protocol: '7mqn04v6woflkksiq9n2',
                qualityOfService: 'tvbz9jvztiec84d1a961',
                receiverParty: 'lqbwplou5jt7blmggopi5dv3kbkq372117jjmu37hx9eoi33gwwso2gg879lebv3ja81bs9jfhyhqs085gjuubvlgkzd0cjx15m7tux37v4e04ceun5qs6e7anxw36hqzpwdj5w2o2uk0ns1w1y1g0r5i97a5zsq',
                receiverComponent: 'zevpj80d5v7ded4p2wqjvmau68amlin1e83li8sugnk34zjk8ifoxzmcvdqnpqcd16irw9c4insszerrf0ux2dyw7180pkzxh77gn7uqw6oxjeo0ikczpu8v6m81tua0c8twzfpcquwi31wg6nx2wfclt4vdr5lh',
                receiverInterface: 'wbqndbnxzgc04bdi8yj91oe21mf2fpjxqb1vq7khzz9fnx2qy7im00q7xjvu01fy1ascl0b5lxkwo58wejcc7p72b70wvtefjc1zzv4wpgv8dfgcrk8oio24rpaw6no0ldt1mxq2eww6xxgnvbak43di6a4to682',
                receiverInterfaceNamespace: 'wv0ptkj6imuvmxno71fpxyw8y3ync107igvb6r9tsnwv1cyh0f70km57vv3wwkp6r9d1n21nqlq0n57mox5zojz3teuk09gtcsyfvkv77pxy5baij7o1h6du3zh7cg7jstn50ebdmyletctjh5qiozud810o27kv',
                retries: 4149166316,
                size: 2812482437,
                timesFailed: 2909731059,
                numberMax: 8839550698,
                numberDays: 7549203743,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'vd4oxrnm0tx330b3762mac4qvrl56eng89l9tihtm0lp9xvtzy',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ghif3r3r2j01ujtxzh00',
                scenario: 'f84ufik3041qwpnla4khp2hy9terkbszw8w2lxnxu1n24z9s9h09v6lh5bnv',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:36:54',
                executionMonitoringStartAt: '2020-10-21 23:55:57',
                executionMonitoringEndAt: '2020-10-22 00:20:16',
                flowHash: 'nru36v9jhujw0ch1bdfiphu8yfdizx5va0diuv3e',
                flowParty: '9k3s53qb7qlrxpub314ssixmizwiz60l5kzwb1gsx1iq2nqe16tjetqt7lgn3ve8p9kuxzrrpsabtk2xckh7ghgaq5dviloxsg1wnsozxf3lj9crtm8g6rsxugehipwtopjs9ll5qvvg6b9thuo238kpndis7oih',
                flowReceiverParty: 'ce8ih71nwzobtzbyt8jtad0yge4mux756z5ceagxs70jnm2qrl8pxw7xa6isn3f5htz1ootwrg8bxk542rsg2iuyw10tcv4cu3olhhhuu12i8v9ilcx55tgsovoguqgcc0gtvhqxgzigyc481fr818j8ajui9kzl',
                flowComponent: '2rgvmwiwm6wn9fa12jiwk91fmyl6rut0g4c871kmn1hweysld5xipb7bq50gw5gzqqmgdf6vsdtiz532q85myafy2g1nuslwyj313fmnesg1cwh6p0gqczb4p95qpjqp9dnd8sw2vvk7e1lo2q1fggfijtv7noii',
                flowReceiverComponent: 'hc5a2i5dlrc1huj9wwi111ffonmgz3ptl6pgo05m732yv0jwurd1vr2tvz8iuqdme5qbjhhhakzjfujt6jp60c4z2zcdehio4w1ebh5f3jt1r53z0s993b280w1vnbaul33nvco4kgfj4tvpeh0ylgtz10fcn04z',
                
                flowInterfaceNamespace: 'deo0fyql8l1vy5upffrwo0xf934lhvmudm5qgao4qvz2v24vtyehkuu83niqp7scn0zopi9nxc7aymi53s01yrky8vadt6c8srb31w136d179v8l8si81138uypas73yn8z2c0rpcasfwgxjuiw8he6fkemfh7m6',
                status: 'ERROR',
                refMessageId: 'qxo5yyjdtbs8m1qdn55dck2xkk5uxsx153ayo1h7i2b6jw1pe2n56x4ka81zgjswrio3kp13d1qtqyqq6jqws8pzprhwijqa7x68n15kr4cvbzohgxbgtr33vvjvfarscrq0mvzk95cbmd3x7eks2dtyxpara2lv',
                detail: 'Nostrum qui aut. Odio molestias optio quasi. Eaque illo quia provident porro maiores laudantium natus. Sunt magni accusantium.',
                example: 'agk6s0s77rtg9qaqqrj7ruzp6k2zvjmt1k3c9ppns7wf4tw0gh95y7b30ofk5meq0x2tmgmzvjoxb945tvfugig9x6z0qasry6rerzmq7fqdc6auih8o7d3o62noho7a0jlr626o6haxm2e4xf7kvrozv7460p87',
                startTimeAt: '2020-10-22 18:11:11',
                direction: 'INBOUND',
                errorCategory: 'r9lu1zu6c3ujsegz7n7dagbtts1w81hit9w7ng0v9oq1d6kd4akkucc6j64zv2gq8dkvm0h3is9zs9n4m0f50e7xg5uv54kc6ogi3d8bt62cdkur2l5534xibsk7kgxsueeoolrmscyk806l40jsirdcabdugmlz',
                errorCode: 'mqs6fufvibc9hkagk8aoa9yq97c55f6mwmvq8wbo35n29zk0t2',
                errorLabel: 739246,
                node: 7252334349,
                protocol: '3tdob14bh4s84gtrbf8t',
                qualityOfService: '4xpjsthoevarfyxcen44',
                receiverParty: 'ttuffb3yktzjrqwhtmcoc1b9njtl8u7n0abl55zj60lgxq8sx2h99pvozndvomvilgegiwon7ezks5t0kgvkq5dzd1lio0toyfn9mw5q8peoqlccjw6vap8e1df9oddqd8qk3r39x53hxiag2c8fq98surk1t94o',
                receiverComponent: 'lrc2cv2kn4m17vd1ozz9zl4l6jrur8i4ncn66gy1xhg4suunan0xg24mhfjrchbv4lokt4xdt400176lw7iog0e0gr3ul0xjxolohkv78jdlla2wiu3ftdb9ey1uoq1q3m9opedoh7dnznmc9w8a9p5ecga2u8lg',
                receiverInterface: 'fbx1obq8hb2jkgwinbdg6bp724raqvwz2akc9a5dz3esv0hiwjiwr1g253epyhoioniqwfee0z0ul3y9cqs8bewvsfa15u3bk9bb57shvx19pqi6keurklfqksnrfzhr2uh1hxc2bi9roysihkh3v08jkepw29ch',
                receiverInterfaceNamespace: '1qnet9tbcbtvphmbu0rv9o53yq2igw3d5a2zuvw1zjlodrzfemtfj7o6r0w7vwdeg38xrd7tk5zxfxee3ha8blxid1g671fw9mjom6w402mm2of8qff25cbwsqhiq1ohzi3unsxslq3x1ay1db0adrue0i9n3s5g',
                retries: 2481838062,
                size: 5669959914,
                timesFailed: 4885170908,
                numberMax: 2642639270,
                numberDays: 2257345976,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'fh2d68r4ks9881btf1p5qurj9bqvaohi1r5weymtivle3t7r8x',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'pmebskuyr8mxg0jt3tat',
                scenario: '43rhn1wvkinlzzersjljl8bwydg56diqkvs12mmi8qz4kbbiq8gven4jic9t',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 15:53:45',
                executionMonitoringStartAt: '2020-10-22 20:34:36',
                executionMonitoringEndAt: '2020-10-22 09:49:06',
                flowHash: 'bqze4vkdiau6s2h9hb4xlxuw9wbtupu6xrfouijx',
                flowParty: '3x01aa8ifvkcravcf9khcd1r9k8k5ujlv13cg9zp4hw1g88tn8qqnhwh9u24qumzmrm3gksc7mqd0l034ahws52iemr697qg9s6qoza8o08cbfkbapar3fw39k8sm46qqp669le5pac57vg8zzpcznmut9cth0qv',
                flowReceiverParty: 'e59ps1hvc1cqejjqaqkbfe48vew88i49ekipz6dqln1tbbdmgbx9vmbzd6o2o8153ouh1qde5dr10xx4xj2boxmalahngbxg6oih1ji94u6oh8xs8zd2vqmtrbyjer9l5twcza9fx275l4aepwln45bkgjmwf1l7',
                flowComponent: '129bsltkm0a1xuyek8vxrzfm6uka7p9ouijmfqb2jj50engq5xc2diftx80uxvqbyco95um4uc0389ivug6v78skloow3m49o0dfdzi0b44z0a4m73o2wwb7kxpudty8cd9tj0b1yqv9lzllaoox8kvk9mb42s14',
                flowReceiverComponent: 'ml8dqwnp4zdlst4f1xu9cwfr4z4tk12tdlieffeqp3krabci7owdcrosm4uwn7hontmd9q8hmqterd3ntd5wowsd4f0x55liy5hurhiit3tcq9nccpfk5a16adtx89w4igihlm0v61zv8tva96qxz4dg5xsacky1',
                flowInterfaceName: 'p9j6tdysd1dh2ju7j0l6g7skc97oedqsee9vs31wbdfwb8x50xke9xxmfgopv9mm0d7gxmwtpmd9yyb21tw4gpei84sn1z4efp3uvlmjtm8p3bscnbusf1qjbixpx4vkuu1s8tldyrryxnj21k66qq89q5sox3s0',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                refMessageId: '3hiy35wrxnidh6vq0k9cm6elbfliw3hvi2yphmke3nonykycbkcys9un2pvned2yqggmkid7bvlq7k2hm3gcw8sno5kyqapz8qrllkih69ndeea9i0oxsizj08w7wq0g5z3ylqo1zyz7bhldor4vdz13ajheqmui',
                detail: 'Officiis aut qui error dolorem nesciunt veritatis quod dicta. Consequatur pariatur minima qui a sed. Voluptates voluptatem quae optio ut itaque eveniet ut. Eum suscipit facilis aliquid vero qui velit et ratione. Nihil eos aliquam aperiam ut nesciunt recusandae eum quibusdam. Aut ut qui atque quia error dolor.',
                example: 'qa7u2kz3ipwjffzzxrol9rpvsphytkmkughkjq4273curvn76l6cku6bthwvr0yxa1n22dagmx6yvvpltntfobwr5husi56mls5a3v7hjhagag7ahlj3ia48s7cx2hlzs5niot9p513qrzgkm8hdhoniyqq0drh9',
                startTimeAt: '2020-10-22 00:11:40',
                direction: 'INBOUND',
                errorCategory: '58ptgf13u7kopacj8v2sxy2uwg2nz6qno65ycj9v45nvxkvhk7uch4s102v3njz4fotbdqc1ww1s359h7kq2d53s8v4jdgw1v5xodr1q2hvhwou1qxdjpqapmtuegf2om3w6pjzpp2ejsdsv9bbw0cmr42dgv0bm',
                errorCode: 'wf3fmkzbd4ruh9hnpvi6ptjpt44rnsdii66h394hu3nv2h18on',
                errorLabel: 223792,
                node: 1139087971,
                protocol: 'z532fydxzd19avp3n0rp',
                qualityOfService: 'tz33l9jkl7hz92u5tkq8',
                receiverParty: 'q6xf1tk0bpn5t0aplnfc6qkrnzgworwtpp08berf18wjni6d8w5i4j2k4ot602r9pvw0gqqvz0xwuea65ajfjxxqjhvp25xdtnt1yw27erclc49vrmvrnc5qlmtcy4qcbfrmsmcc9rikc3ta85jkz3tbcrdtq096',
                receiverComponent: '2wd843ne0i5fmnppgsddd5k6fkjbj9wuyc5ar7z1z7wlgg03dncq5nnxuc0k5u975j1xxrdp9r2zga95r46zdru3jwdrbzim6hjait9jtah7rf09kxg42kfl9x6konpaedwr1xzueikolo723kikoxx9jdp0b3ht',
                receiverInterface: '9m67vjihwd2neqqp2r5qurl84jsrxjgc1f7ly12ulubqaozh9vl3wo7zqq5x8zu2enteeuosttk3hw5m0e0nd0yumduovz34tcao1e2gm22qziokgvishash4vhpi7tks28nv09dly8xic2n0aju40mgm9b2ps11',
                receiverInterfaceNamespace: 'uds3iq1hjm3ps8magel71226nwfx835q1cs7yvnjlxmn9blekncq3egmrbv3p9f8waon16zalv3hv4j66ey9q0knyctkidhjhqrhxj8bk76vreu0pnsb174v97y0msp05jt32k6esu0l734m32b4qwhb71du87iq',
                retries: 1344147973,
                size: 6661110761,
                timesFailed: 2162806850,
                numberMax: 8822929063,
                numberDays: 6242252438,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'dvenhluwuz0l3q9ef0kswex26cb0dp60xvorgmr5tjh1v62aiu',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'n87wvmyf5mvvlknok9oj',
                scenario: 'nlewvz0rji5fnplf7jet78syy3f9pq5b8t77f7mwsfip8w85agc0c6ol295g',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:11:49',
                executionMonitoringStartAt: '2020-10-22 04:08:25',
                executionMonitoringEndAt: '2020-10-22 01:38:21',
                flowHash: '81y551zwsclj6r3kyuv2di6qumoe9h9bjlwj9bri',
                flowParty: 'z7l9i0wyfg4onsodfa23jy1rofz68ya69cqv0o5yv7iozk103vp1l82z66t8vc26z0x72gp3uyojqwazj5jtj4syjy1khaijcck2hesx3mfaxqpp86mvfjfcaha3slfm54v34rfn8t1pfknjrzloa5ruvifnoxvl',
                flowReceiverParty: 'qn9gopp402g9osr1wadl4j6cg4vsezj7ltm59fn4nv4u5sgtrs8rpuvt4cp4jjoh34ymr8tl0vsqra4oe1i7i73x3g9j2awle7uktfgbbker5sqbj94bsy2ajxlno7ob0cet5czeqgqju7tyedva0yvpnk1je5fy',
                flowComponent: 'fynugrbfm9lku1lf85hkne7skcmbbg69qmu3cnmh9l74r8oah4p1qf3jfp9w4ph3rdjq7ujwtal0k46b732q4ttd3vculedanqta442aw8xbzadpzz0p69oyli4jmtqxshajxmhse7idhkd11xqigae0atrluw74',
                flowReceiverComponent: 'pwt8tsxyu2zxhvbtuakvyrehodc0c0m72a4bquvg8rglstouzcbgq8dhl6npvgo3y2fm2rja778ndw2jxd4hjiej6mu1nc073xkpfle5iwrogbdcg28xef58a2j81cbxqm9yclg87ufqve8m295ipqfr3d6r12og',
                flowInterfaceName: 'hs6h1reptmheo9znqhly5dpxbv8u6moi9rl5lzlmd9px84xvngtu336pdzzxb4gzqc20cju0mjwxw1m48gusm152nfzjq7x6z5t22n69t49lqo59hkuvg7q1jeu8qoae2w44vlecy6hezkwwx5y4yjk5usfz70ro',
                
                status: 'HOLDING',
                refMessageId: '4o2pa5r8dxf7b5uo1g35t4q1r4ji5zjjjx76g0uvy9bb56f9fpwentcavbz85w0e0ajyvdm7m1aqe54tj0u75qnfu6mx85725bpw88dgvih93auoczxpfcfxdbjc7u0at5y2r9hh2ukl2mn21b1kicu93pbkgldc',
                detail: 'Rem repellat aut aliquam omnis quisquam voluptatem tempore enim id. Non et voluptatum voluptatem tempore et. Quo quia molestias natus et esse et et tenetur blanditiis. Ratione ut nobis aspernatur non. Voluptatem eos rerum consequatur possimus aspernatur dolor aut nam autem.',
                example: 'ihijzcjq4y9zzz89uwvqtiv4nzf885z3eg84wj1hc0dqwico509gsde8lh6zu5ial7p7v6689e0gi4pc5hc3psh58tjhexc05rxrs79r44dt9livjkysnyslex1hgz1m5r42ldcwgkaegbsr0x1z047838mvc5uw',
                startTimeAt: '2020-10-22 07:02:23',
                direction: 'OUTBOUND',
                errorCategory: 'v0c4mqqrepkebjibcn3x9xq0faudi0ncec3q2h73f2odhnz2kh1rlwopbqnw3m1xmlr93wfwboxgmbdea21vm4cd05xjg083d99nx2cd40ganjvbuacdrpfo3g05i3u49tt8t0hv8g0nu5zza4v9yzj18n70b0bn',
                errorCode: 'gy2zc8icbgewlyic4q0aeuaxkgvb4851jqzoreadkuixmddw68',
                errorLabel: 614665,
                node: 3559844965,
                protocol: 'wfmc6g7vzglrudfao2jr',
                qualityOfService: 'ewgfszrnqc7hiwalxht2',
                receiverParty: 'pzz8n6s4vmn9zt5czlr6waluhx09hqhpkbg92at7k7xxtnkgv18zap7pl1vg6iy9lkk9ob97tpyc6z91cy8ifdfuvk8n937cm4fcoftaz8dhha3aix8nkwzknip3ykkaka544slx0k7zm9qfn44fht260373g5xq',
                receiverComponent: 'bv76doxl4ny9au0oz77h64lze1k188qpatm7yjag2osgkhahs62xto6awxzs6zgaldhiznacz9wxgqdx0r365go67buwsr7qi6eep4cvgpmb2eewy1v7ukn025slojw6wtnee9xez4676uy0tu6z49zspgyqrjjh',
                receiverInterface: 'nkvtfgsa0ovi0n2jcaor8wa1ufgkd2d0gae1gvlgkph4yswkm2h3v73sl4cri3x99u7yzb25kpvemw0adr0jgz39zwsl6nfm444qzmfalsi6ot34c0kzcozh2t6jl61ng5adv8j5afy7rl3xxvjsyqzq1ralh5qq',
                receiverInterfaceNamespace: 'ibmsxr3jnoldj086k2d0vjwg1egv8v24sguxaf1vr8ncce9ue4kumof4xz3p26g89ts1lwek4jqe354mf91194dytnvf2qh7cuaahrt24pu95fn3x1ff65rlfzvh1fayk3ku6jba4tdjdnfi8xfm4ty8j8l35rgw',
                retries: 3956716539,
                size: 3230252654,
                timesFailed: 2617395930,
                numberMax: 4722108393,
                numberDays: 2180985641,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'rbohv0uu7494zr5eee89ebkk7iqxpq4q9tk9qjrqzc0on7sf3b',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'vxv6xkougsd5xvnk605s',
                scenario: 'yxpoi9hnmihs5trov1qnw5rz0gg6ux5jcjmfsnfy8ggcw37d0g5dxmj8qi1y',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 14:14:41',
                executionMonitoringStartAt: '2020-10-22 14:33:47',
                executionMonitoringEndAt: '2020-10-22 22:52:55',
                flowHash: '5j7exb4j1smdxvpas796b4eq0p9vewk7tqi91d0a',
                flowParty: 'qtmsclskokkbiqtxon17i3rf3kxwafizke61xgl2vxhlxhq1rhxcj8v6p9b0j32f6efbjvlcy2yy5p16k33f8tlebhtnk6v3t9ibjyjblrh59hme8afkg5htzizfpcggrcnt3hutq8tmwqifbha693zj5ufhyu2g',
                flowReceiverParty: 'jypztnm4lsm3uiuct2w144xny1e8vj91jpyj30pis2tic7ywbvglppn0oy8cw19t8v5m959rd5ygufxll1n99iy49tv99uojqvdolnyzz01et7b50yr46iqteknahdv8okt6govyvyx9sd72ckznf41f42h5tjay',
                flowComponent: 'l391op89x0njs1xwd9qgkryvvghqnpchf0dm8meq4jzexmeegjharty45ijsvk55vv9yriw12vo6f0fg6czsf9gxk7bis8cnwvqmxqqnnbo2w5evy9y651dmx0ne0vgb6mp4t23gcm3ymy1988jlqztvozg5hhdf',
                flowReceiverComponent: '9wq9fwiives10yc8yfc7j931nhpp63zxgg1bb810f4ouf75tohyx792x2klwst6on34m37dvvkb30x0n5it7clfkuhokn0vfkxqcvcga7fjpzmee10bj1v304atanbmg8yonolyqipxr8c6lhpyhguij13eae66g',
                flowInterfaceName: 'bdrly58cen05wiiyge8ja2aggdspypib71dv5fa8g1yj6lwnkra4kinpjnovm8npet5txkxetkpsgqpg79zt50esy8cruwvp9c29rxtul1ql6z3to8ve3gmder6nxkzjh8dbzwo983sl7yx3w8qz7lpdhezngeha',
                flowInterfaceNamespace: '8ebr0wdkh2lz97fe2iz4v8eqs9ojs1pp2a2br8npw2p54bs7khn5adjus06lbz9hhc52rpbz36ps4pjyun52hgf9972lidggfk0gty0ycc0tn0s2fzyw2t9tu7ixuy30rmygqhqi2vp3i17sxjplfcb3hlvfoqct',
                status: null,
                refMessageId: 'hainunb0h7xqd8d2cb9l2pqtt4e8seznu3dxw6gkqrkgx37loyk7yctpo8zb9s5vl59ai2iekhlslhhcvm783ecvjtblx539qkkfjxraqfp2288lantskxhjao5fy8x1hlwtjwzoy0yx96msfajjjwub3rhj5i1g',
                detail: 'Deleniti expedita veritatis voluptatem. Cumque rem animi corrupti dolores alias. Cumque vel et numquam hic omnis. Minus et laboriosam architecto libero expedita sunt nobis amet. Est consequatur voluptatem illo. Officia et fugit ad voluptatem ut voluptatem.',
                example: 'bayr1bswss5zxmklvcnxjfc4tb7h27wrj9dldwqe43w8ph8q3bx4oyuhasl07spmmvkt77zx6f9062nvmc43v4v1leueu0k8rju2efmlnla527l8lrdzlso1hw78tesc87jg7928v8b8xg4nne1t0fnfmdirj2lq',
                startTimeAt: '2020-10-22 08:48:12',
                direction: 'INBOUND',
                errorCategory: 'zojy3kmy8jnndgoua3gx9ovd4vkwy36yvme5brel3tbta939h1qsfk75awx0zkvc9gdiqag6naq6pxkpvf9nz47k4ne2sx9a6ozy3cj0mdfrhyxg74yqgwv1czftauco7pxcd2fbl53kjqqhifvdg7gt91jkad2y',
                errorCode: 'hbyy1pwzfrq23cfe04x86c42taqrdduc6ga1mebfz8x0npfi93',
                errorLabel: 496241,
                node: 5996569771,
                protocol: '6og3ud2phfsyc08mup6i',
                qualityOfService: 'e5irfz363cw1taa37sru',
                receiverParty: 'f8be2r6en5erontm7oaszhckko9jdefv17c2f4z6fx982ri3x6oge9h12vip6bl8lzyu8gsmda5xgb7ustmcsx0i9g7nvfht0l8imnbjj1d83pfdrchmetmgxq9hh6kmrtvstfl2d4h4i5mw0blad4a8wuvftloi',
                receiverComponent: 'sb4s7qikds3uzrq2amh1w468kktiohmnfcxbubljb8alzughtir7i3id853tjhrdi3xe28k0732c0tetztxzuxh6vj1vwccie6dhfrq5g3t00zkvdoozj5dz8m50uiugww23npo9kixpdzog19muu37nsy7emehj',
                receiverInterface: 'fb7ypjpmena2adzptx4vy21ata2amhqf76n7fz0c829594ojzva6j1wm0au60rbxltjcfvlxu3nvhr08t3qlsazfny0eoavb4c2zr01bcv0ldb79aica57wi4k2ms73dppq5oqrrwnlwv0za383ee4334forlpnh',
                receiverInterfaceNamespace: 'qczooohnlbj86s011xac1lgcrybvep14ra2tczrll8f5wvymszuf2iwle4dv9o3a5bgp117ptuaowumauyrwol137slf0m8mxnovxnj8msd2wb46ov8rpcmwfvwy5eo90ckpacn7d7di9pnwfhwrnhb021aiwiyo',
                retries: 1012573118,
                size: 4357317609,
                timesFailed: 5607443778,
                numberMax: 6225629038,
                numberDays: 7017166570,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '5z95feq5coxivyp33toizfk7omzs6hgxqr05y6dczrzv552a71',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'yw3g18op7r2k317u8dbv',
                scenario: 'c1f92ux2fwlrukhtwkd32v4gzlh6r0k3n4l89c31w2m7xhbnrnzsr1z2tj4i',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 16:18:20',
                executionMonitoringStartAt: '2020-10-22 14:14:46',
                executionMonitoringEndAt: '2020-10-22 13:38:39',
                flowHash: 'qs7f7w7rc9pmeqy9wo4oonb4b7tfjs1h871dftdc',
                flowParty: 'w3i36a0mamq8qyaw4oo3ivc2dxylvnmiqc9mtfzgts1lt9ez2sgkfdrs5wgqdfjhnq1d8brcj1sxtcq9ql7rfaabpceh8tliha8far2alrhas9kba02y1s4cwjai362sib4kguq6ow4vqlgmbwardcbwz53m498g',
                flowReceiverParty: '1b6ecndbu4afv669e3bejl5c1bi4kfrt90g7ynx97ucsctzhxnaq4q4bwry6y4ion3h9dcpmhxliq0paxim131xdv5204qv8qfzsn458v19rakspjjh190b75tll1poloya7pw09y78zqzhvoa3tfu8n53v53r6l',
                flowComponent: 'hq5b6wsvnby7c31arbtvbo5b43ji76mywureo6c1rm6l5w3g9frbhnl7rbjxbvftacrjnfxmoqdd6v8mo0rid9m4kq80be7pd3e8au4mgtvnv32qcailjaxvky0o7x45m5whpotiunbsolf0wy6rvsvcoq07tvt9',
                flowReceiverComponent: 'ajdzoyx9hdqlzidgndbotnkknvd9i2brvguk6xbnmkgpyzu8adww843vqqa1rlv5pm7tqugc0x24q65mb2hys0c3r4mos68zqnx7o1fn13jnp68e7t4owo9d3zhihuh4k38dm1v7thu05qapy7sfa1wqpodd6osv',
                flowInterfaceName: '6s8wjiyvxhbxs549ufjphm2kowewub4g2a73uc7p2v98bj8jk2bbdywiffjkgoasef8izavflcpsks3tq82dbdcazvi3yrqk0wls3mky1p55qcs5pbgtja75xonm03cd0mtcnt45xz32khypppbl7qiab0er2dgc',
                flowInterfaceNamespace: 'uefxedj9w1oy88rbx7qj1rbrlhzy1vpxah2ld2j53fwq0qabgl3bokbku7n71pnngwrdzr2gy3oszz8yivccv2api8zhel2fqfk2px4jy797dybissbth2ncjpoi6tphbu9jinrqdfcz0gfegj9qcv212cwttitc',
                
                refMessageId: 'u7s1c7oix1m6niddiik5pi2hk0knlwqgy9zqjitbodiwyblrqakgnj1dh3yq4bdph9qvo9fjo0vsg8ekozy9aqinqbknefm08ns9pfvxzeu129mo50ci38p887blavs5kdr5s35medciqzub2visnuc3b5umvgbs',
                detail: 'Voluptas repellat eum perspiciatis sit exercitationem qui nisi. Esse assumenda id voluptatem. Facilis soluta nihil voluptatum quos. Voluptas ducimus quia neque. Ut et laudantium. Exercitationem porro debitis deserunt corporis nulla est quos.',
                example: 'yyud2srp4v9bhb5jqna2sfmcvknqx60whtqofbys4ln1wsj3d85j1psuqfpdzildms2tzql2igt0kc7cyy4281oq4yqss22xrrjzo1impm1ziivoi49zja58r4o0vxbw2pdoklj9lgdqfiotoin042ral2t928sj',
                startTimeAt: '2020-10-22 07:21:26',
                direction: 'OUTBOUND',
                errorCategory: 'crxt2kaeqrx5o2znx0ogf8563q3de50hc6g0adntl6yu36koyyynjb74mkzqr5dl0fpw9eq6btxhpqqyb7udj849uc2nhpmktl7ydpk8xvglah7nyi2jgv9c7zi5hs7vl3mukw8vzbn940o5tgprfhw1qab8ae84',
                errorCode: 'nwfo6kcheeg81jl8mewyz29ba0mr06wg1chqjiw7fem3pckj0r',
                errorLabel: 742798,
                node: 2901416562,
                protocol: 'u7ldd6ndu5gd654bk7kv',
                qualityOfService: 'k9adymj9w4vgfdlgtmag',
                receiverParty: 'm8ufs1n3dwfo1xvktbl2azpb8i37sglkra1u9h7mf9h71vg00lbmgnifmmr4bywrls8tnwluteraq5rm41alsn9st28x818y57gu1152odkp7r5al58p8924bl6lxuz81524iw8bph3nfhn56qu0fvhmawlpmwjt',
                receiverComponent: 'cc0177bjkigv91d5j5c8zqnbfb0k6ubuv9ge6zpm7dqvetjckzcknruczu23zdbqwfp570ydwh9mlz134gor4l8pohs5mcry47v2t5ch4otod5fnfzneywosyeqbxc7e9i34tkzzzbxjidns7y6rlabxlelyimsq',
                receiverInterface: 'zq7iadlxsv2mso2y33oivkk9uct0g6b5pvzz1rtzwoyi1mkzh2dwub3mfqjhsjiumsjnkpog5f98dd1matqfbrhu3oeyjesoq7a4hg5wf05blx047niaax77e5xqldgub2p8wm65w2m714iltceay2io3iedza9g',
                receiverInterfaceNamespace: 'epf16c4ysxirizgo6su6071l7wew43bkhwyboaqrvt4534fea9cofpc83y4wus190yzksmj3m32bi2lx9sxyokwjqtcueksjstqyqwsxtdfyb9vk2svbna9l556u3pycvhnmvwp0l6pyn3jspo7hk0o1bsbjctbr',
                retries: 3738201524,
                size: 6771165236,
                timesFailed: 5694167710,
                numberMax: 6345487776,
                numberDays: 5788455040,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'wg1zllskw4y8axpnsksm410766d2rb42vbvjt2msuxlrri4j4g',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'yisssdocant1ttccks6k',
                scenario: 'jwvgq1b3nw5x5q0e7dl5nj9ti1u2rko3700qlwjeus5nucerjilhxgvwemk4',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 20:47:35',
                executionMonitoringStartAt: '2020-10-22 08:34:57',
                executionMonitoringEndAt: '2020-10-22 04:02:06',
                flowHash: 'zemndwtsmbrngdyx8mkc025iql1ayt3wnv16d3cl',
                flowParty: '1dspj6fbvn3c8x6k2rg6s016os48muwrftmmili11r5q7t58bl2v2beqzpqyj74xyf7uniwda3mucysx1eyqzpqdrzhm41kipdt44ta38boj213plqv03hehfsva3cgxyj6sxn5ip0u9lzcuizv6jwquwc5wkwtu',
                flowReceiverParty: 'd5ouyyz29ckjaez5mvvu231e7qkhhsdbgady78svxc4ebnrz2697qshwv38vcaxt0zdw1dr11pzifk3dspfurk5b84ibzklz1nu6nhntcbac3mxdvnq7iyr9c32w60ilnp6p28e368np5h3tkdf56zd05xlzqvs7',
                flowComponent: 'lrnogqsck94u5bw77fmhgh1amvfsdt4xxl2mg702203j8ihy41b2f6i33h8w9b4ismc92upy1l3hv5m7xf5qewoyeznbroee4ch7s4h4s5se50fo4vaqi2bgg1nyqmf7c7jigaejmwaglgr8uqeg964y5zxvun3u',
                flowReceiverComponent: '9brrhc3en4gxf9xdji7ju4s8sefc2z0tc589g5xro583h9x0souitswuzpcoy8tr7qkwkkyisfecapiy1pzl5xqhu4fwswq653253b17yahgx1o417t67ymd7v8n11d14kmeuodofrp92ejf1jrjwboqh3lltb6p',
                flowInterfaceName: 'bqfbu26qifi39g161809kw8mix6hufd08cytlwujffugkpl5oqj6cikye6iz1kr0atzmi7vw43l5qqjnu3w1hgqbj0jdnfvpt9clusncz1dmr4iphp44bwshs4pazajvat7dgtx1enjmg5dmyz9y03btl04ftaw1',
                flowInterfaceNamespace: 'jxdxfzxuh69pzzcaxve8r5wzv3lm6owdzyxb1ct3xba9agoachwoofvslc7fc43svbz439egpv3agexn4ayfd603sha5888ynpdum0h3xamhvrvsthlbfxh7qea3il0pg5x8m1wkwherpxxgcuox2rzvtt8j00cd',
                status: 'DELIVERING',
                refMessageId: 'i90o9ohdyyac7gzycw92yiwkasljage4jx5k1x6f152y7pikq168lmv3hligk23x0il9yw9dts5nddbouxarvkx39vokvelackxrdwynlp43zj5fdhsekzvak57y3179ebnn87f5mj0vr6v9gordxo65y27znyh4',
                detail: 'Animi soluta non fugiat sapiente cupiditate quam. Repudiandae maiores eos esse a recusandae maiores dolor illo. Velit delectus harum nobis sequi. Est expedita aut. Repellendus molestiae est eveniet tempore qui dolorem repudiandae consequatur nihil.',
                example: 'wal5evnblm6emf1pnddwboesslrjb8xczd3yubsibgy9zz1boyp117lijp53pu3wttzn2mlpskxru3drm0tpbdfvkdj5uqjd0nhkbkut954t355rgr9jrz8cz9p84crik1kmn5cjgoxoyrpmfgipx7pnt67pspsl',
                startTimeAt: '2020-10-22 02:53:31',
                direction: null,
                errorCategory: 'sqnedbxkzx7f8zuzxzuhgad3bgabbve2bw8q43v9vfs2b1dwsqivs7zgtjhu3ksy1wzow818e8cj1irekobunp6kcv8y85i61zyn34w8o48u4ax8zcr1crxxltscuardw5kkk48bp0v7vqyriqatuom1yy17s4md',
                errorCode: 'qpsyuqemvcot1qwr7otjlmqty89rufqjbn9c2vy66nm5yypyew',
                errorLabel: 825799,
                node: 9432763943,
                protocol: 'eqspfjpbhfoz719cei74',
                qualityOfService: '7gj0gkmdbhtmi36vqg0z',
                receiverParty: '16c7zg74dx9ri5txw54zcre2q7zrqv8dlhb012t7kwm3zjva9w97pz7zw9kur8x530ajk5733kaexchmhu5ryqi8mh6pb5d6kkiapz0rr0q3onqzk875dk3zkjuj6ou9onf7qv21v2fq6hr9mf7paosih9b8zyun',
                receiverComponent: 'fsq01jj5ldawlralkp3du0lthsrivndm7ddeiovxvlhmab4rr5z65pbduyor9n4i75cz8xyhgqwnv370m2xxjoval3pkcft6g0wcdpszbf7dbyo683dcose8gyilv7gmplhhtbgzc4kzdckosbzmxkmh8da1povx',
                receiverInterface: 'kfx4djrsv3k5uixa2445zqv1xh70v57xqp42n2wmqxehy5t6sgfhsdzn287tjf3pkuzpb1yn84wf7qjspplcz23t9r3yp1wedkz8814c7u0mslimlm7a5yd4z35ok818lrzawwce9g6ky4zyuuzwj2kthzqwx1sq',
                receiverInterfaceNamespace: '8vdffklio1rtjgic21oc92a3etofht4o9h30t1ufgac1besicxgzsje9c4vqdvsm68qvj2zzfkuwwej9lodsdjl04vs8y5ewy5w9fqdtvhbhu23x8sez1a4lx52v3lg2dguvshfrr0hpa2efi18r3gan0zxhc67i',
                retries: 8311182424,
                size: 4955201844,
                timesFailed: 3892502705,
                numberMax: 8142886665,
                numberDays: 8940654545,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'bx7zqhcoaa9t21tvlunsq62r9v8vx7w4asel67bgcuh32yzule',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'jxrp9mxxht4f8icukgm5',
                scenario: 'abrzg3zg9yv3v4zxua0sg44y4a20l6srm0zliskrlakz4gvr7007j2zk6oh4',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 08:38:14',
                executionMonitoringStartAt: '2020-10-22 21:23:21',
                executionMonitoringEndAt: '2020-10-22 21:37:54',
                flowHash: '93oicjapwunesr7d5rstnjm5igty36c2xf8nr3kw',
                flowParty: '4o9m6iietl4rdyts8vh86wdrs02adn81k7rk2ru4crb4j3h004rsf1iz0rpkiz968ro363mr6r6b1ad03f6tbt69umcnxvyudqppdfpe0c64b0t5ctgyms08g8z7rh355srpp15rzrik6zsckz1lt5695kffo314',
                flowReceiverParty: 'h2glhu75tsctjl3wqen3whhdhmoeq4mqzp2g08zfe3zui386e5ee93sufegwsrq7r4wyz20t82zaclvmow11n5nt793c9qbbzyr3tsfiqgkuir01s1hvv82738x4bgxar20v9se3wqt5jwswdseyoj7d1lkqvjx5',
                flowComponent: '5k1qj5eogu4o6th8et9bw0ovuvsy4axilx0kv07kgihv09uolmamzm8dinpv4jsd7bj2cr4ernm47e6q620ed5cdy5eeeqcaqzd0qq3h7s5n4ciqii0rlaxcvne1y5d84f6qw4zhws9zpqj282vxu9ffmh5dvtjy',
                flowReceiverComponent: '0ng138efdrh0jtde1bggw1s7skhhrulh4uvyijfltxvk7p8h7zuyp7ryemopbakvg52o3h727130v2irroyvcmsa100l8ou9i9pzlnto8azcka63bgd59xl0y89it6zq5rv1aqos0s439t9e6wxjd29vzy9mcc5v',
                flowInterfaceName: 'azqu990pswm8z0fiqt0680t0al2vlnsnz41q0ghbsycdiwl2wfrhm7erf7zue8jqsc8jyx8as3dc72q8a004yk9cq05t8f3oibr05ksnwnvfa4jy8e9kbqqlo143bqtxuxzwqzyb2w4gwpcvusshwmkw4xp7w72z',
                flowInterfaceNamespace: '8mbj0qtjjg80bn68ptt4l35t4ew5qv9azdq0cfof3ifgteq7opa6cjzdwwixteo1b3wm051yv95llkhyue5l12fa2wgn85o5o2rmtq34uozfwj1ac9rb4dp7o098zm3eqdia1wifgk1drz0wpr205pps3kagqj24',
                status: 'ERROR',
                refMessageId: '9tk0b750morhy8mif2jslunj8nfljakkyjn8c78y103lkqnisnx5jvrzjbmfv282crproibwtoxyam017fa355e7wjbawj4lchlsdby46hkurehssl1fi3pn44r6g557wmpfosdc42448t0t3d6fpez0yp25x92x',
                detail: 'Non voluptatem eaque enim qui repellat. Officia nihil ut qui aliquam ut deserunt doloribus asperiores. Possimus magni eveniet ut dolores. Praesentium natus rerum debitis quis nesciunt quo eum laboriosam. Nemo aut maiores consequatur. Non quibusdam aut.',
                example: 'xo9ziuf2jbhfwqsl8bbbmkzgkx9jq5wzlu4jv23habe2le0vepgmk1vw9ll4by07n3wpw0hovr856yt0rfwbpgzu88jqr8qv55af31nbb35tsoyi3vuwzi3rpgewjknmdgfwqs18vrnx9pcej9za2n8wegxya48r',
                startTimeAt: '2020-10-22 19:28:23',
                
                errorCategory: 'iuy2zhz651cq5br5iqk5k9swy5g2eq117qrj384r2fgx8n6x6c9jn1ycs5s4vuzq1ceyzd9p8c6qx65amita23vndvbcutsjm6v07cuj78zxmyu1rws6e546zhc9lpmtoftqn04agg70z439ktxpz1iq8u4bj9mt',
                errorCode: 'znksx1hi072u4flegpb5b5j3x1s7kvkdw2r2x22p5czr2aug0q',
                errorLabel: 374290,
                node: 4120448955,
                protocol: 'tticaxudyedzd6ksyehw',
                qualityOfService: 'k75xg3px5yaaxtkuk7o4',
                receiverParty: 'v6wwadbd7js0rvxxbsgi4dtsug97ejpjue1powb465eqmqvmyalsou4pteqepdi8z4x4nys3kgy58nerxjy5355igvl669my2cde3qkd67rizxhr89ssx0xfsdom68wzesh386u1xq8r1j6gqgcurkok93mxex4y',
                receiverComponent: 'i4lauceg72wir6lzieestebtfyj8lgtmg4ublv0c42x3mdmqrwyueft3expwuegp0q0ajijsdecrbhfv42qqahan0ml7dlbqwscglihvy5hqmor0jgpamk2z0232ljwtjcquc9rmqwgdiv5fqgk4hojwoiiq7uvg',
                receiverInterface: 'fijcrqlgk79rxti5odo85o715fw7eyp3hnmm9fjsuz4c67xc40zkot3ixbuouwivh5w0pvrql9m4q6k2q3t9h7vnzk0nendn9j5lwmhfdyepjvqno5igejbeitbmraiz25xy8s40eo0rux8juspxdi8t63rw0hio',
                receiverInterfaceNamespace: 'm9ya0n85dty9krnyou7exhtzxarerf9nprjc533muyonmfvbg3z488ds2qeb1k56a209nzg9nf3kc1hwytt16nb4daqslhz1ko1euu5w9ym0xu4g43fa56yzuq4siov4xgidfckdqekoti792eo12ewt4dsjxiqq',
                retries: 1547631012,
                size: 2051690176,
                timesFailed: 6916077321,
                numberMax: 7478436051,
                numberDays: 8933459221,
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
                id: '0di0b9j4hdefe5nvui310z0bzf8s768m5xlbw',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'lsxjyovqnxd7wx7aw2eih6q68cx4wspizv0aomgwf961bbzujs',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'r3d9gkcozh8kj9ij65nk',
                scenario: 'uaabdo4t329k5qmhabo71sxpziot2npiutar6rzq5boqr1q5f0dacl4tssql',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 10:58:09',
                executionMonitoringStartAt: '2020-10-22 10:55:52',
                executionMonitoringEndAt: '2020-10-22 01:28:19',
                flowHash: 'bngiyvgph9wk5akwo46ebnvi1f9jfdbesqeivafp',
                flowParty: 'xwssyf78863xunsk61qhf3tegu5i64ymuc2ucypbm4d02jbracplbj7qqqs9xx1d05e6oxmmoy1kxplabhle0ikh33v5kkrtlrfbuj3lozg9u8ogphy36rpx4tg9fgfr6ajr8xb59hy0pc492l6xjgj8tn6rt8nd',
                flowReceiverParty: 'crykgk1yxgkravfwsl8t3hjamg4qvencshnuorsx2bg79bfq16tu46gc6cyhagswswuqmyerzd94eu765w4wdn5h7c11jufm17sepvm3kbc6t3r2ygnyq421b38e1ny2cualei9bg6zkfyeo3kmuehb6f0av8v0u',
                flowComponent: 'a0gb4fcztnkhquke3p7rnknem9ybu7l0mv3sicclr2ra05nq6p3okz0n6n6f6hko55j5q86oso5c3tktj8n7f52fq42dc0990f4a7iz4i4w0hd5kgj6z5eynaf8jt08mbuscburuz4pt0wofxznrxirdlsnit4qo',
                flowReceiverComponent: '2lcqxhbqv5dp5z5pshggskmowna3y1f5fn7vr5o3nl6cvx6xac7kqom412ca3plodm9m6oiwu88lawqy0f74cq4zngiip3o0js20i76p16e989a4kyt0r54980fbdkb88xtlnmgb1l92kinq1t3zpt15oxmbdtgk',
                flowInterfaceName: 'wsahr99nmhtndzbuj23xyyvw91d0u7d781n226wx0jmaxgudvudwqqjbuu66w6mbd0qtadgf6nq6jar655vdd21hjp7d7nppfry1v277o7eohm58fmwmy0n56e17utumid7f64jq6odz4kccs4y2hq8uo39rbp1q',
                flowInterfaceNamespace: 't1q7y7ou7oeeb6mnwtvlnu2f4ptbu5cpfe12urmuyegqz62yrkxmyf598l6m3d2edp90b58v8yki6rqw32ok9nuiliov9f1k439d3h5p0358f1fnheu8n6b5svuhkkvr3pvsc0p54rq9j40xxtzkmhl94rzaev0j',
                status: 'SUCCESS',
                refMessageId: '5ibpf90e9ryb7zj9y5mcfl40bh0te061hdsag5kjdxfpqivbuuv80vcs6mszmniv61nvo33ogjl26he83fzu4w3kz5r9gw6jzbocyl5mb5gesbv6mdrmp93716udq7q9572v3lz8ci4oquqjp7ecxwv3rpovt8of',
                detail: 'Enim saepe unde quae. Laborum qui reprehenderit aliquam laboriosam consequatur laboriosam. Magnam facilis quaerat. Expedita blanditiis alias ratione.',
                example: 'jba4qqhxsc61ejzoynbratybbbz3ocxm20tmvta8vy8z17kor1yftsxi3sk0g1i3e8p8jpyebnyof4y3yeckfk99mxogmjlz2435rhbg7kimoooqxow76n2hfuudl8vvndfg1geu986btujk1emzb15u5xulijfs',
                startTimeAt: '2020-10-22 00:09:25',
                direction: 'OUTBOUND',
                errorCategory: '2td049vs11j0vbq7x9pnp7hvu0e8o97h1x90r612xk3tc3axaujg2y5sz04teuvzk65r97iri1waaexhqlpis9mb353xioptcuzss1ojdnp5vdk1jawztzx6x279zaizdq6yvcacqgguq140hykm3q33okiqqxj4',
                errorCode: 'semzq8z7c2ugrfare8ywk8kfkw5e38ul4qp3njadr8yru5qf41',
                errorLabel: 127565,
                node: 4158245108,
                protocol: 'bsoxlbrl9x6xjnj4wvtc',
                qualityOfService: 'oowtxd0kye8losfe92fk',
                receiverParty: 'oj266z2x6x7vkd1tblvfemhnqjot6fjb6ofnoxssngc42bxmvnetzc7w4i7udxf9lvsnw8tqf4lvduy5xn40f8x75im3958xp93azm8v4lxhno8in557ht2tmf7vf43a7ltzkas6ljgnrqamwdaqiv98xx81anqu',
                receiverComponent: 'qbrbyb82vprtac6sh356lf5nppbjf0iozvp1jtlnbns2de0fa267fm1a29q59c5xiejfhx4n90qzu2e0nnixemko0u33he3o9rpl8rofwwn6rknpp4erfmgrbf2n83j94cmwew58mgoqkeeutf278oawrcb5rato',
                receiverInterface: 'dr2g7rg64z6egzv7knspku6v483eg4by0yhd98kll0sebyu213u9n4bf6d40x6uqol4lwelazjsdadsidh5na305n5we39iexf9lr315tnoti9izi5xa5kqqr5q5tziw860fth3pw2j76z5iwy39qsnfm5pdcz6k',
                receiverInterfaceNamespace: 'm4ip5ipkdrhkt5sad2wjlti4zlhalwjy14a7plw5fukqm7cks2hso8j6bzqs4eq2col5q6jhf3dgzmpw473kv39k0m208mn0g42xwn75om6j6i3m2frqg07pze64coy14j9i01bi9vsecxq6veyqnggak9u0qqyu',
                retries: 8744921991,
                size: 9552883765,
                timesFailed: 1763466365,
                numberMax: 3388309336,
                numberDays: 4061616068,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'yhwatlqpv2ovw7vdg3ukgvxzkr5iz3k9ku3h5',
                tenantCode: 'fa2hwan8ynu8kopcxyztne2habu1razrt2bs91a4fkjawy36xi',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'frs678gx7wnwmmciun61',
                scenario: 'w1jtidtdjrhn4s1wiy04ikdlqpuqn8nr5gomy1t92u0x17szvnj3x5uatqjy',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 21:25:48',
                executionMonitoringStartAt: '2020-10-22 04:52:04',
                executionMonitoringEndAt: '2020-10-22 13:07:08',
                flowHash: 'kdfb553h87jgkhox6wo2bjsk9qoypa0j265b63zr',
                flowParty: 'b8sj01tip8ifocywjaeahgxs5qct9iist1bchqztszr4y9bcs4tahp8ill0wv56qlrymxbothgj19kriyam3jn5xzor7vk374bwv5bmjhih76o1vp157tdtth9bd6r6ndy6eqvlex3fk9gfsyjcpoz38mg1jyttd',
                flowReceiverParty: 'qc36v1ffaxoqeoc5k3lodts46b6q03okisnqxf3yb6aupiw25p12a0z659vc00ujxrgabn8p4fugeyjtfezbayj4og08155279gtfd23bds5lfhsdsks13stsyjfa7pj7rmze17a0eb2on4u6mrpb8t0lybsf1l8',
                flowComponent: '04qudalimmqn3wgt0x1skugqq9b4hh7pt64ioi1atkimxi3kmfmfrhpyv1qd9te9h95fwviisfctouafj7d8g19cq8rtaytbfhr95bmuqntptt2a4ync7v2shanvqv0crjns3mcakzomlkh81cior3uybs7ky9yj',
                flowReceiverComponent: 'nzjiu3lugql1ki7gpmangqgbr48fuw19pbo02z469qyqkwjn6qgmoz6tsj9g4m1vl3elps5y7ytwcv9wmgwrrp69lp1nn7jfviw238rxz3lap7m977pgng6brjnqqn09xbahlx410djus3dp93gkt84y9y3yv9lx',
                flowInterfaceName: 'c8i3sw231l44cz6ll9ukp25dml38nw7hxw96fp9wt88pdt6udx5emkbam7347u5f7liq5b9ltm273e7t2xzp9n5izm7o6pjxfwkfazm6grejlv1eyu5b4l8zrkgbnu55sugny1vc5ru87qbvuq4wnzzabpqt5pg2',
                flowInterfaceNamespace: 'm5b2m279nh4gkjetgz7od5m3hfy4r3983i70la4u4838dvt7as6xqzmaqp79d71z2gbiikeevhebr2y0thhtfux9kvdpqs3cpu0hyx7vpev077abv5rtifp4qfkw8rpwawhfs9vycle5i923kpbuhrsttjflomtz',
                status: 'HOLDING',
                refMessageId: 'qd6633r7mzmsm2gmdn39gm8oqvcz2n3srvmx89cc3atqm7t3p09c93dpl0kmwcbrly02scst1h787l6hmje3wod0wovqllhn0a908yhf3rzo0ob1gu11wsah7jetdxoxqxs6sbwm076ob3rjq2c0kpe5krev3g7i',
                detail: 'Debitis et accusantium accusamus. Eum dolore vero enim ea ut quis. Nostrum aut id sit rerum officiis. Provident laudantium adipisci illo voluptates.',
                example: 'zgabpszqwqvhdkad6gcg5lfj7443ki6c3sb05q0b4rb4wu735em1rl2436yrg0uyd1wtm9v5uw45g7tkri8e28b4alimgb6zz86e861qjwtd4bftx12hmsascga1vanxmz3evcn6gxd65lg2mgb4c7jcljb6m6ix',
                startTimeAt: '2020-10-22 00:56:14',
                direction: 'INBOUND',
                errorCategory: 'vhvwq4a4w0zew1tqohkbkf14t4ivaj1shgxo21uyaqnhylq2lurdcidjq62se8br1bqldkez0nlcsswghjsjks5d52bhft7888hnmq2i852pkwgb7htnvykd77qnh7kkyi3o7r3ygf1zz8pwhd9dzpurcxazjqw9',
                errorCode: 'vdrwc9kd9wt8mydl645sg2g1hgtlkfvqox5l0nk0b0ybqhp5rg',
                errorLabel: 360645,
                node: 6754005418,
                protocol: 'aixjo8lgndxtqgy6z2ff',
                qualityOfService: 'qj3m66jodkq0gxdyleun',
                receiverParty: 'ludhzii6tbxas25ensevk0n10xgtgtopld3s69uw06e1ougccop5olgo0oozozhucsv015wni3dduxf3eh0spzt36qkmbzednio7ytlbm9r56e2qi3466gw19aqaou90xj0vb4autketbr7w1yhkwdwvbnw1tbds',
                receiverComponent: '2beebnuxtvlwysy0vhtxchjcb7ss4f9hm2bce9vgke0sv9dgin8ws40mve38tfpxmjjc1pi6dzpeey35dhhhj564om9508kl119zl0zvf6j4my77jkck7wnfcy3nqxh3jdk94lzijtl4mwpn5d53agz9hn3x7fsf',
                receiverInterface: '2zprefpqkrw0m8u8u4wm8yskkcnkk2287k7nux7gx56uvfh1zd303m0r73xjyxgel5h5g8qizuyd2glsfo2rxxclj8vb7o3e2wo3ow3p3pg1tnvb2di0s4h9x58m32wcejv8ckzxiie3t75anehtjmwyxn3phshe',
                receiverInterfaceNamespace: 'c1l198gnhrmjlv6cv89f0qleze688rexy4x4o5kl49v7rjo26pvh2tslbs5l3b1z4pd9aer1mx995ym6c71nf0qtt5napxeg463psco2smvp1g5fgufsl691wh6gotjt9yjxznaqws0wryeepm6j39ye8036ryw2',
                retries: 7118439854,
                size: 8542315805,
                timesFailed: 9107434458,
                numberMax: 7835183682,
                numberDays: 4485179010,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '513s3u5z5cco0g48m6bc9dxjf9zgtjb3it06ze5vckx7thpwbh',
                systemId: 'sq9i4tqounyc2h4rah0njuwfmj1txgo59kn8b',
                systemName: 'dym1c0apqde7zjqu5nuu',
                scenario: 'j83hf8r75ms6lp5s6t0o4e93f1er2ryj6wba0fqbabkef11gcvdhq87eci6c',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 22:28:53',
                executionMonitoringStartAt: '2020-10-22 14:03:27',
                executionMonitoringEndAt: '2020-10-22 14:49:53',
                flowHash: 'npxrfzs3q631vg2h9ydydkkxxxjujs7k4abxsdl3',
                flowParty: '51b6wrmunctjodpmsg0y0b9m04fep3xrokph67z2mmb7itii74lpisyo2g97x54e2rd3z2tb0c6xhto2jbtmft1hpbf9n6rwfqk8n8fo770wl5gn70cgz8er4c5bvecgq154mby8e3bu6ba6bhjwpjrw4oai2al1',
                flowReceiverParty: 'huuh01meuij0i2hdv7ij1mzfniccuf6ziovt8f0zt232mc1m5fdwv5nedhuk7nq4vfu03186zrcti6pvwhmhjps0348hcwvp1qa0u5ql5t2h89vxiebobi0f72hq2agjme3nf2k4mj3s5xfskiligyui3q0iog0n',
                flowComponent: 'sg2iq1e7fxsgadcf46rnd82cgtlljmjfdgox3lrguupbo1dqw4yce2sil9xfx4sdgjtklhg5bnp6mrgvjppjnp1po49h7roxwc56ncrcra8zpfwm8kene7r8603l3bcda3pffhrektekla9yaufdyxrcftu6ybuo',
                flowReceiverComponent: 'kss16c6v7kgf9b9g6dds6umcxat3o8g39oz5snghwvoxilbef88f5xmm0zpu2t95prkr2e76gj8xw6uv5wcniutbwix7k0whcq75apeud4bx8etyvvj0guv9nvn0y6eaw6rkouid2ii2eghtv225plcib6hkfmjc',
                flowInterfaceName: 't2qjcc0owsn3f8qhf6cdalx8nv8lj1ljiy21w0f1rfi48c6w7ycamy6o5w3s8x6mlkr6egr7axoqvk2qfeu3ladnweyw7huh1qba2r4cm6qc9fk998iy8bus05erwriemta6h2ifropa1nkc5wciia0mo2isd4u1',
                flowInterfaceNamespace: 'sjc52t4p2igra6rj36jai8j4zorcum462oyfauzqo4hqtwhzs5own9g987prxek8gy1j7cfh7kfrw320bboq0ncfn1h8lgjauqmqdjmcd8lctimxf4e40g2yx97gz8qb3boea18ne05a6x1wp3wz3b8607rf1rfa',
                status: 'ERROR',
                refMessageId: 'tw24o2r9g3v8ba0yh8pzpfx3j6uent1dky87k162r35xh5xb9o55krcaevb4a8w8e34kngodn7qgqnitroxcxcd5uzlqozfivkgggblekcrlpwin9cw4qtegiz8380q4ysctn2a4ud2wnskludbnne2halizwy5h',
                detail: 'Itaque et saepe perferendis quia ratione voluptatem. Ut illo laudantium dignissimos natus quibusdam necessitatibus iusto voluptatem. Omnis voluptatem adipisci. Consequuntur soluta vel voluptates velit doloremque. Et repudiandae non et neque dolor consequuntur. Et voluptas cumque occaecati tempore est.',
                example: 'uzihd4qo3lv3k8ve2qkuzwzloi4hd9ixzqwx03fu7faar6k91veuxc8ltssx24feuxk876blllfqqqcmmofjnkjll3z0sfhln48oathhqgnapobgzwmudcj0vicls5uaxv20lpo4ogj5pg4wpsr5nlxsk6wt9zpp',
                startTimeAt: '2020-10-22 16:07:52',
                direction: 'OUTBOUND',
                errorCategory: 'u0r2y9w77e825xgakipy19xw1g8oqi1ck9zsusaollhrmoaj7ksf6upjc0dhh8vitnpq5n8mh6bnbu6lfxnjl6osd7v2x1qzuiuhzu9pn72u0hj24xq52ctvs3i3ipde5kgs0favnupz84am8ucjzv7945n4d7rs',
                errorCode: 'ke6rbnu3r74gkkxvaruu8vt6eisv535dwbu044wjmi9130uo5q',
                errorLabel: 559937,
                node: 3392940337,
                protocol: '7fnv8tudsz5b4baawjhu',
                qualityOfService: '8bg5e49m33soiv1yqi03',
                receiverParty: 'xe9b23l2uqtf14753p1uu554241nfpxjurmwsbr45jsv2gqnnwcbdcmkjn93m52yprj48a7o3pb09zpdla4wtr9vp83auspo77vrpyrkbfnqcuwb2u3vose0mwr1tyfuc31925qu7qyequ1sju8q49w970l3ixjg',
                receiverComponent: 'k199o0707tfpu6ioyobsjqu15btdx57m4glddijyj35fnahini5zdsewj3hfbut8tzyd182fecoeqy7dmbxt5w36qhucuwrbsa1naw0qxppotw6u48apanwat3utpoqdmf1y65zmpdxmd798i5jpfn0n3htrza67',
                receiverInterface: 'r1c7gsw30je58q2efnmjtbbal7mrhpxanhnct4eciknro1abtzz3pya5r09sedkrg2ntmv93pl1bq5vcswm852hhvyrda3rmww2i848bfbobw8y4m9tmgz03nuuxgdly4anu19zqid81xep8tr5nd5yrh3l04yth',
                receiverInterfaceNamespace: '0lng17hfdia4l65f2vjxe0jke34zico42o2z21z8v17m9gsdc4ww541rm7r5mi4l4bw95fltc4aqgkt1lraeuxjmd43hk1mfnrn7tvytyltcanbodt48594ykxye16oc1u2qblb3zo1eowy28eplnk8h0bqljb4a',
                retries: 6914437639,
                size: 7139914672,
                timesFailed: 8701822494,
                numberMax: 8653423434,
                numberDays: 1965819586,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'uuttwv5i8yci2vd5lb9bqt46uq3z9hi8vgqptyy4ljdwgjyumk',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'kzqhbt6cu1eghyptndrr',
                scenario: 'icy6u5e1xhsd7alqwqwyemzzgw1hs5dgxbow7hknlxdq56k8ngqs5cf6xq4d',
                executionId: 'sfe79g64dwhd2ps3nzgra0x14l7vjrobqwu9l',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 09:44:14',
                executionMonitoringStartAt: '2020-10-22 18:13:00',
                executionMonitoringEndAt: '2020-10-22 18:14:20',
                flowHash: 'qp3szfd4fifpheb9yjkuobjobi78vr1m2l6wtvg3',
                flowParty: 'qlhwwf23gddy38s0d8v278y7mh8mbt82uwz3bbzypgvzm71kptmidit6028oej9hlx89ebb3r9s5do8rd4werc43iyfqxpafhmi5b5k1dmigxgh2a0o1rgffquwi4by1mczr57c6r1ybnzsyhgdai8lixwo85aa6',
                flowReceiverParty: '3jsvl59jw4hko5636e5kd5d0d9983wjmcxai65hk881nhn8f34m16svrxk4du4gqp7z894icmjb5damlpg7wj9uv2qani0tgunkkygrb1g2wcuzq4zworfu43n6qe70h6ixes2vxrwaxrhg9w7cjqfo547derp5q',
                flowComponent: 'kt93atnw1lgo13isu5zlzbfdbfr9jftt7ha8jk6wqa99wvczto0lwbanl2thw2fm62uoz1yr9vdv67fh70hdxutnm8shkslaklwqi0tf752uapljp3akrhc6yg4tvtkys4kxje4fumekiv5xusjkfhyls3nwlks7',
                flowReceiverComponent: 'jd3ev9x1fvrql057771q4shs6lb1iypvmxdmc9nj4xp4z7mao5sv2s1xhoqyea1hp88ytkl3a497wcsk9io0ggd527txzynldibekk07tj6a42sicba1d7qeqn80pb846ueb36n00zbp3o255g9rr4s2fi2hia9n',
                flowInterfaceName: 'i94gjj4dgf54qwr4h3l8kpkmp2y06wsdzc0v00zi23okhosbrvebsi9d0fm5fmrt6cy91iktvj0k6hyxg6lj9xa5yf9xddg68qcxqhqnaz570i4d9c67t4ys043g5ruv4pb1qh33hb8j7po92k947drot2k3ktnq',
                flowInterfaceNamespace: '31bwpnflu5nyrjjx00dybzt5xhxd7537i7ky49bpva86jicnjcpo6ug11l45rqsguqy5m9wxjcjgwg8bqhmjb88tu52yxbpbaekagf7ubu6vltqqq0j6ng4k8z9udcjxkwulzcerft8q7fbavoc7suxg2f9meis9',
                status: 'CANCELLED',
                refMessageId: 'o015lfdt79f3kzunyhx3008iwy445kf76a9g8yag5657kjjns86y5glshpimrx8cfdy4nik3a76sms2z8ber7r6nyi3cn1e2ha2co7raylkyx6l2am5z4en1rlkmr07a60480qr1eme4f7qeiokq4109jhurklct',
                detail: 'Accusantium amet asperiores. Esse aut voluptatem et laboriosam vel rerum veniam. At et numquam maxime eligendi deserunt sed. Et quia impedit porro quo eaque.',
                example: 'dxkwd25u8cc0eokwke3thvn5bfo3k0ugq33l5cfdo8p2ibjms3ip84lli979j4w8durstmis8altno3p2k0sp91lyf89c3wx4b47y9sdjx1snffsjigi1b55mtpwthg8nsooub05qm036q72ge43q8ofdmghuurt',
                startTimeAt: '2020-10-22 07:27:44',
                direction: 'INBOUND',
                errorCategory: 'tp1vymshnfftsuz8hp9o8cbln6jqyol1xjubgnfbywz2t8jk98t7ysyygd7wqmxyrfh923gnwag2a9tx3zoefl5ksznbnd7x0j4fh2tjbw0f37kztg8r7bqpt976cec8qc9fa55fvcy3axsdyf538ds0pkl4wdao',
                errorCode: '1ph5u0f0hkpju6krv2kdzel9u4763tjnrl830aw0oeblg0ttl5',
                errorLabel: 141527,
                node: 1486469375,
                protocol: '5n8r0foulcjc15f6pjnh',
                qualityOfService: 'gx2ci57otstpy36t4575',
                receiverParty: 'bv9t89ot6cd0zso90j2con1wkgll1cztj1kj2a90i1ryz1d4gty5vdm30g6tah0areeb3o1j3644afh1dybanfj82kasolprpisynxr83xqt3qjjw09roz4q5jcutcbttcsl56gdx8193lyt3a75hvjb2e0bu84o',
                receiverComponent: 'znz68bxjkjy2mllv0alcxphg2ns0ca6jcxci1v1giylsrhnsnww755zd5qrtmbcvv0oq81x5miyeh12ejjusw9antoozk7vxteiaaj4rz9o4cw4ghti2fnw6m751lwth37l1kigyp1qih3tgbpsx3mmho2h57m33',
                receiverInterface: '2hlmyl881a0t1vafabzao6xu9sc5aoyyxjsmncrcb6a73b3hbpbcadbx8whl1g0i51oyyearlo2ucrcizsxxios59ixtvygxkzevyg0i96o7molm7o8tqzgaar435x4ay640dt9nu4pxo604mdoe6w8t5l3g4hp7',
                receiverInterfaceNamespace: '2dax083zlxhcc9vo0isif6ryuvyg60pxmsr3xm0sqhb40tet7th2nxekiwc8rww5ihipj231u9bld2vlxpkg8it1whdkshu3gmjjsr6mzd00napk18hyuhfw6lkusato3wge3e4el0lg27r5kg748jd1we540rae',
                retries: 4141743701,
                size: 9859180470,
                timesFailed: 4612619865,
                numberMax: 3218706810,
                numberDays: 8820556017,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '6ccv370q9ytwdkkdus14qicipr7lz9nyz313k8oqfrrxb183az',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '53ahmkkqzuvykqra1cz6',
                scenario: 'dotp5ahs1eq1f0rofuk7z0lssv4mfdx55f1ggob91s5fldwg9fuugg4yysmd',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:15:42',
                executionMonitoringStartAt: '2020-10-22 22:44:28',
                executionMonitoringEndAt: '2020-10-22 21:09:35',
                flowHash: 'qq8i65czhi3dffvq0ae8nzj8dyc9l4vq12d1sxwck',
                flowParty: 'hoxifwzu8nh5dcpghd1531z2lwou7bm6u7ruvo3odtbii46tsjk5g48tmeiyuex6kpmervj16rkjb9moqu2pl0uz735cb095sjwdxoi219ba3ah466vvyhh4xuzrer7rioscjzhft3ki1yl0vyxoxtkjl06rp19k',
                flowReceiverParty: '2m1lgi5y7g0ohbh4krqgv7kl8oxd1v7541yctjj47v7y9asl00wvhm8o0qzq34pyk2nwf8digl1963oc8brrmjtdqpzhb85qanao5emtwou0qoblihr2nry9vkvae41kjr1qlw0el7h9zzqw4bk4jo6gm6dg4iz9',
                flowComponent: 's6xx8e8vczdmq9f1nw5poaxrtx8xx53fyr7odqhfh3qddoga9ib459jdwvlbi2fv5e9m0hhll4hnek4yq0u2b25ap4nkbqqf6acoj26xu36xkjai4916aq8oby3vpq3b5jgohws3glayil71v2cnlp2bbsi125pi',
                flowReceiverComponent: 'r5og899mxehstd78497x6ymeez0ai8u96i5xa6zv87yew2323jp4kla1zr6dsp9mcaglvbkkx4x8agp4itfyps7iwbu0ugzm30xmx1ieaka36yznieowade1u6rvdiylx7pnz8084moe3l5b1n2fdvr6ndbc0cyt',
                flowInterfaceName: '2og3q2r4z458nqnt197wfh7v4v3x1vfh743nkwz43vh7hccjhiztpkcn096lqjmi6or4zqtp0oietknexsp59h6litl1j8zp4aafa4u0m9cy1h80b8lrenpwboxpizv742j0z9cdnq1uubifewbnw2a3395o06vz',
                flowInterfaceNamespace: 'y0mkleogq5p0flkdvbjxdb7ns5mj4ljz2k7y7kkzvyhcm4f2960exv5olsyr6qdw72hh8jrrcjkeohy9zwi0antne5kymh7zy7mutjwgcvrwvsikt6rvkw8p83uoacgoaem9vde4x4wj94305qukpnf2s3zsfbwv',
                status: 'WAITING',
                refMessageId: 'lcxyxvvrfn19w1mxsczmv74nk2xpkzzyqrd7dixwsql8zo0tm4mwe8dz9jpd26rzz36xqnz8w04kfa3s872919t73b3zomo6n3fbsionsc1z70kc0ro3rmzuy8a23aehtwgzdsl82rowvtyzf9i5umunz4ec6r03',
                detail: 'Rerum eius et nihil eum iure sit quis. Reprehenderit nulla illo similique eos dignissimos similique. Aut est non cum doloribus quo occaecati cupiditate. Et delectus velit voluptatem ex assumenda.',
                example: 'ep6q5nyzvyl4wn0ap041pzp0bzguashg3jx40jl8g3rt8b31izozd5fb7545mpp9vcxqcyyr0p0wu51pvr8bn5w52pldtxc4nmee7g8xmwxsemhbrj0vayuv7f7oleaytvoyfhitbqtzvf3zhspu4ta1rq78xa2w',
                startTimeAt: '2020-10-22 06:15:54',
                direction: 'INBOUND',
                errorCategory: 'fndjuptc2amse5op6a6vknuq0o8ewpc1fn79oc2pnrgcldr5oon3qi6wjddldo1u6sdrjatt5a2dru1snqbwzyq10g4ikoqc9hdljlx87rewgzkrun751w2uodgp6tscn5ksjr07a88qtjyzhb88nl18tduwn05t',
                errorCode: '03swrgbf8ljsiy3srr4kzkgei6abgkw6jbbt8umw6vfbf0g6j8',
                errorLabel: 217824,
                node: 6542472469,
                protocol: 'h3ttmz2mlu8bzysllpxj',
                qualityOfService: 'kg7klhb579nj243key81',
                receiverParty: '9dkisakfj85wem9qfzbtkooebcafyn4i8nwat3vrlo3f0epembbnckiglkjc0kjyv6dobs4jv63m2e4q0sfrpdph9esos4370lplovmt1rc4z8upla5d7xvxjrbbasg5ttmff7phox1tmjx9rzgsy2nl12q565is',
                receiverComponent: 's61rty2h4nb75zuzp538p6pqxkckffc3mubrmf99pw4l9kkb20jyoo4tsakyb4azv03ohoa75ak32y3wlw1hkipx41z1sea0wbnh59j3b0tx8vtlkzeaqmsbyio6h4wtnb63v321g1tkol2i6yt51lxl6omgjo7r',
                receiverInterface: '97g3nvvzs3zuzmjewlcgmbqrt1kd8iglg3ux3msmy4l6d0l3mvyaslqw6hdf20t9q4ftdlme5e9m5godwbw5fkprvxrw3ugg5gt459u3y0atdndyl4grcyf6h2tld24zu37l3fq2kox9x052o2248p7509kmi3w9',
                receiverInterfaceNamespace: 'ksqkams87ryagn2rhugr70ktttaob4u5lmcavy6jtxnbb9xtxom3oa6lwgageu0xi6p6jlr88g72hs6u5ryqxur330sq6ulb04zhcauhhodpo0xkx0igwsbcifqikb8if74rjvcunor36m9zct9fwivw5zjp5e4j',
                retries: 8679258179,
                size: 1450936512,
                timesFailed: 8155355933,
                numberMax: 2715894902,
                numberDays: 1073668064,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '5lj1cah1a49wqgpfy5sk0v343gh6fse2tuckf1tztnvvnx89oaf',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'am1xc7k92578sk3x5189',
                scenario: 'hlni4dka77ubvoz8ba553yzx9umbhceqjm8dgrmw32g2nfdhandd7y5wl6vk',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 13:53:48',
                executionMonitoringStartAt: '2020-10-22 07:41:46',
                executionMonitoringEndAt: '2020-10-22 11:26:46',
                flowHash: '0imvqsfz7wi0ommrqrl0ywrkfe6645yheqlgc7x1',
                flowParty: 'm12s0rmka3fh34zcz2h26nfourtrysl3a3mcnm58hktnhtwqnaehebdzhz7hagkm8qr0zo8amiyctd7ltb2hrbh6s7ocnrpqp2nhbq18mlnl4p2fkziayysjadn99vlog55jbrnovbqz23dgmbtu6em4jsnykqzx',
                flowReceiverParty: '0b9hyq6uv811omxuomgefikl96g0q8svi36t5egfdtwymew0uifn2hlgh9wpzvfw9wui216ajdsb92bwucdtssdgdv6yr2fjqmpinai4wuxc37jqok6ntc4j3b7k8vunaw7zwib50r62liqd9h04qzhf8aeprmp5',
                flowComponent: '9paq56ah43dqhdz9etyh3m0v1ymmp9mk2elamcpjz0yrybha61ikbrs1tt9an7smz2lhrvxg69z3epvyllqlog0er229y08ogvdloeow27e2x77mmwvjfesc3pjyst0jk92uwnqlkdwhjrc0901skhni6kweqii2',
                flowReceiverComponent: '6z6354osb554kkql1ksvvbxcon1waua8qo86xvpk444v1zbj9dbnz5hzegsoslt2t6fuxyocgbi0jg77lmsr3rl3twdwb4z6rrz0fm6bcmq5lc9emwt06cklxbps6fd118xf0ycdgrnpjaqaldawj0zxnr6ofe1i',
                flowInterfaceName: '0xvq9fssdepgrvjvj7ighbde0z9dzbqofll4rhkdaolgat0ejj0928vw373wbeydlkix3nx3eflgkm65v0l0c1s26zzq4gbrxztmxpe9pdr3z649dpmm5w3alfk8j3l2je2ufmyokq98urppuz65yfme8ugvlvr9',
                flowInterfaceNamespace: 'qas2qu85efh4ffkr8j28cskak0mvavi5ndswfjnxjyane9nx769itqhxh36kbho28c38sibelnur7kqopqko8bk34xhuc9uvbwaomvvjydves9l9ppynbm9lnd338lom39jppb7q9pzruupsufbfngb5hxgdtv5d',
                status: 'CANCELLED',
                refMessageId: 'pqzuo1elgd8evphm61k3l683rp650r7k4y76sl81xk2oqbmuiqneh1rqoc2agk1bga24upyabsay319gy1r8pwd4wrurna3k3sebs1ruiaq3zk477x9ir3if4hysozrd9bck60wo42turn271tcz5swgid3ne047',
                detail: 'Velit molestias quam rem. Qui rem porro quo dolores voluptatibus nam. Facere dolorum ut iste amet consectetur aut. In occaecati nihil et vel et consequatur. Rerum aperiam error soluta molestiae.',
                example: 'ogw2ycb8fzrmm6tz36xaptcx9tv4w0pckzb1cgh9ewnxy2i5kfepk8jvjxwov6xobul9mt02bbn0ddpb9fq80itu1e7mhr87r52r5dk3krq8unuim0wo4smekl4giqkx5b2fr29njdsq3777dripoce9eam0uieq',
                startTimeAt: '2020-10-21 23:36:22',
                direction: 'INBOUND',
                errorCategory: 'y2txaqrd71fyzarg8kq3w3k3o81ro21it5v91ygz9jjgvwgy08o2ue5bilt6i6nyqb3a89txspgpvn8ztjjxkkzl3gv2srf3dj453yy9hsxcve0vve0kfxurvje8gl3zuty0fd6krhe32c8qmk6qyx5gkqu2zpmr',
                errorCode: 'xnst764dweqz1v9ivlsfr4xr9ooq61lv7g8s5jhvntf0zi57zn',
                errorLabel: 645582,
                node: 6439006137,
                protocol: 'qg5gw5jl87l3372462qs',
                qualityOfService: 'yviq6n6odzp3w46mfvx6',
                receiverParty: 'bc8tbla5ce8uvwmsc5f73rymc41ym7hysgb23oje2m5al5qdy6gzbxszwj8g7frjlbvat8kxxahh728m3vscenzdhsjth14zbepjcpv5l7tmz3zegebb0vc23lhlrzqsmhyw2pzv7jiuqwt113r6h7x28kijikqo',
                receiverComponent: 'qz0w3612wdljnd7bm9yciswke8w1359m2vuccr9tzz8b5adybbn6krbr1caal5yr5hzyrpra2l8tiaamport9vm1xjhpcf70tgz1oupr9snswq67np0ygfndnnesnu3wx2z5v12r8u26skqul94ewk9y2falhs6u',
                receiverInterface: 'j99cnh530djmr0yn1bdw4g1hnne5jx3vumc14t8a1zpghz4kegxuu8trx7qzhwt7hjzj5qvtgcfp528dakgoek0gqwp6xr4empnf9oefsl3mafr4ouakabislwja6664t62kvlqpqq1hmsgl6psfclf5hb0l6yld',
                receiverInterfaceNamespace: 'lyitjcxho8aivg68o7z01p8ychua0h2ul1lblp5cdmt7kb1n3tgzxj2op3wvpl8pda4e21gej86rdrf1n11b83c0yzkrz3a7kprs8hqed8vyv9t7gi8jcj6wfm63k28g9q2uchelb7do2r2t2iz6akd4drnpvaz1',
                retries: 8653244447,
                size: 8212003588,
                timesFailed: 5207073150,
                numberMax: 8005414417,
                numberDays: 3462780675,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'dh49yvrplwgomuso5tnxm0me25xk5glkd5ftix7617usylwlzf',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'v329r36aeqppl5tmvgse8',
                scenario: 'r7rm7patbtlko6excarqlbd38r0dm6838jemcqyfwgnwtn48i6no3yhj3she',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:22:40',
                executionMonitoringStartAt: '2020-10-22 16:29:36',
                executionMonitoringEndAt: '2020-10-22 11:30:57',
                flowHash: '8ld94vagawaoxy640xmzr5rb6rb12iiap7nkj8i3',
                flowParty: '282erzb347ec0vlhly4r0bnvo20o2ho90xhgw0vji3sdx8ooac9mgpumzgwpc7uee8n4huf0vwle9uv0pccxkmx0rluccoz3udktew4cdf168okz1onms9jbylo8v0zl3wjqwq97dwvfou6izf9n6nb078amlpwg',
                flowReceiverParty: '2gglh0dildbsovjws5cscclppkqm5s291madxyyd0i54ac0a9ckabrwoafqheatvl7o10fdezzic42lan7iv5xcsima85oyho80j1s4k761o1hy9odnuor707qqe2kacecs0xdeo4av8evxjwf8xccbrsqhvntwr',
                flowComponent: '2ix4igbozi5v9zxizfy1ozu6tlkyh1h9kzdt9n42okccdj07rff8fs49fy1mu68ewu0ahlbroksp3tvx8sii8rls2g3j1u1exjp19o0m168y5fv1xpf631hoqfszglv5tjr54zzoqjdj7v7mkl1njxzqax06a5xv',
                flowReceiverComponent: '2sl3bya64k1g37noqak4nmyzxnndbeygbnirgxzwurbd0njkh9niao6sxpzbirvvr0pqn1o95b9pre2sc2b1q0r9qx1gcr1kdjgcr0a5qo9fitpvcssp8oa8loq8er6h0mpp6him7gcm56q09wyj79ivlw6007ar',
                flowInterfaceName: 'ou7vol5yhe428ojsxqhxatad0oao77wgm6bfqajuvjbjn9qa4mqbjxdcdpva3rg44irngycmqp2cqltt7aljep85ekm6tngaurzz0sutgvfbhvau31e1l81lvyjeuh4ets01lxq73l82cfuyo5v4riz8mrryvqxc',
                flowInterfaceNamespace: 'uggwkuvq43xbxq1z2jg240a1bp3ad0kij5tsmt21124e40m4oeh90tjm4v66c26mqeoye8awy294qg7774njqdvnedu2sjblorezwp3ecz79j5hac6yfuu1beg9ec1abprhjl3q3v9qmvehr4xmjgirz0f4q40hg',
                status: 'SUCCESS',
                refMessageId: 'lh1ntyzotirywbln1utnaho0em0q4ij50qoaqiol0lunn2n7itnqf8zzpap54u04hwcsfc0j9n3cektnhmc9fg28dcgg1mgyqs7qgkqdhyahttk2ofd65qdxsvm4ci2nj962d7di76h5tbxqhfhm4vt7l13pnfeg',
                detail: 'Impedit enim impedit reprehenderit voluptatem. Et recusandae et necessitatibus veniam voluptatibus harum. Aut et rerum. Placeat aliquid suscipit et non rerum rerum. Velit quaerat rerum dolorum magnam culpa fugit autem est iusto. Quod est in necessitatibus itaque temporibus.',
                example: 'k9pgg6116d00hq84dubl30z20recw2v6gkee73p51yo5uvjjlb3qcoqfsuso9fq0qjfmf25pmbji80cayo6rrg8ztxt7v2qszal3v8k5qukrwg5neb20x98rj0xu74h11dxfbmpkpo9sj3e25jvum9etr658lfmn',
                startTimeAt: '2020-10-22 04:09:05',
                direction: 'INBOUND',
                errorCategory: 'baczjovynp9z287jg0qgpvhnkv8nbjp79oovc5dktuoh5g1snka3g41i1jq1a129uwgwhs1cu1ay4u4ympbp11fqoptx7at64ot89u9b8rdssspx5wsmuepgzd3zq2dymptlx89xdo5tcr5jmfzmvrc6o62xeoxt',
                errorCode: '74wa6rvfyvmr70wmyqbj6aj3ppj6pvlapa87z4j1spmh5o32zl',
                errorLabel: 942025,
                node: 8135571348,
                protocol: 'j1fwsy8cyhl3wuau3l39',
                qualityOfService: 'wcj64nu1x1492rnkrinf',
                receiverParty: 'rw24o7da6w5ja5syu6hy6fy7cl48r0vmbe4rgl09fbpseykk99q62dc3uujtanaiqdo2idjhvax7lmcvu8wiodwf6aubm6omyzbhytm653zabnosnc8lkjdlrw445nuvrh35romyu5ovjxgu5izqmmmnhtssmlc9',
                receiverComponent: 'wcnd0zyzkixaof2z8gs9az9zmtfxu3qxt3hf9ogjaqyffxdlqyhgb82nhst4ohef5dlu8mr30p61et28l1qasa0n47nehb922q4m0h218u0qa32v7di73ltmbkwziawvi9bg7zw0lmgke01a8iz01bp20pwteovu',
                receiverInterface: 'r0yt2c81wuzmnksjj9lhufjnm1jr8cyahwnoo06dp3n38ey5vsc3n8rc9asu22gkbfze7koetknsdlq2xep01hxqcxsr3vtpelkd2ubgzp5iqrwt6pnam4ef6sxmyzte4qglo0uhfeecztuc4r0n6hupzzjpdmlq',
                receiverInterfaceNamespace: 'pi043bu4gxmig47ve8lt077s8dxs1w54flyxnmssuqfapm6ukm48adx37yf4rh7to8f9lv9buynjoambfm2me3h7bseiweej1rrkw19fcb1bydigb78xpzmanebhiu059oab5j0hzd9msxu4nvg22kwkijspxcoa',
                retries: 3316821758,
                size: 6041200060,
                timesFailed: 7307611993,
                numberMax: 8239765942,
                numberDays: 5663234924,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'fq98q5s4sbun0eqp0vp3vdopna10ojin5s1u2e70je9uxpjvne',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '1efc3jccvvd4xpiy7lxr',
                scenario: 'yr663cgspbyogg3ddjzvsba8y5dyrz9yvf40tw1oohkqignpa5n634by90alz',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 01:16:37',
                executionMonitoringStartAt: '2020-10-22 07:41:44',
                executionMonitoringEndAt: '2020-10-22 05:50:13',
                flowHash: 'im8i1rqp017xxpf5e3q90gxw9ighm1ukovsywsgt',
                flowParty: 'b8b5vcywdexphp17tu3a98onxmucy9eh7q69ycgxsrx6uxtcbx811rlcizcq1uwm90u4rzfdb03ughcitx8sfsbwehizp86h4i0lnpfaak2dxo8qrqqx5lz4vmqhsfqh6ydi1fd9ozhuxqwbxke80ov9wqjvl988',
                flowReceiverParty: '8zr7qzszwag239a6rxj0er0nw3945hrvy3jli80qa9pa106xsl3h45oj3a0k1aagyzdicbk8h2hy7sb3mttp7ved4y9a87wbmw36p771css2giowcc4pbkfa3iacihfs0zfa6f50g0ya64812rbjjmyebo81ox86',
                flowComponent: 'e2spl8thrc9karwbrqqfjey4y1vj7guhn66dznb4e91dcdy68w9wu0o9p4x3a9g59h1uk8ak4x0ns9csi37sbqk1at4d234jcbdwyxo42yg3fxvs0gk2wf2s1c0kzxr3eaayuoeagg25hab3wk6mykxtkmwb88fo',
                flowReceiverComponent: 'y7e04elx4pzo1fy33r2ujtx2a3801ww5cv093elirbvy83kp8g2jguf07lew7qulyue5hym38yaav6yz0sn89niz16q74c7qkimgkqrc9fm2appte2chcy3g9kmd5myn1mzk0f9nvqxsudc6jfcjq7lgd1gw3m2o',
                flowInterfaceName: 'dec9w9z6k9twnquj9s437je9k36zn4vjm9mihbxsys9loa79fhdyl6qreb36nubt4wh32a0xvg4t0pohjie4ejby6ts8laa0zlm5e13uedymqlfuzoo7h8t8lahmjq1ga6d6imh8caxf44z5vldo58vya8lhbli8',
                flowInterfaceNamespace: 'gyx06dkcoomrwf8jutuvlxt3b0lihl0r1h4940u6g8zjlvsjoqlq8ybb11gwn9eknr4ra0l19sioro125p3kkifpkfo823bgiz3u5u4ln5wjzr4xrikhorin4xqyn3a7acgaqlj2gytqmx03seammac0r949g21x',
                status: 'DELIVERING',
                refMessageId: 'ioyrl9zakv8dexyjwlmyetuc6pthbduyb3s7idokwxy0g5xxkbjs2a032x6qdghf30gmkodxpj8ubee2aejs70sh0ml2cepfjqzrbs6dj5c5uu7g82igl7l5icgkwtdee3y9zf0lyb7t89cpza09lp1h68d4g1mq',
                detail: 'Amet occaecati pariatur possimus nihil possimus hic officia. Explicabo et distinctio aliquid quos dolore similique nesciunt explicabo. Facere repellat voluptate laudantium distinctio optio veritatis consequuntur.',
                example: '7quh6j25kqwy33iskbiuvk6nq3urks6kl48t9irhquz0z901k8bs7a5zj1236hhwek8u8o7wgft42trv2utvzuqi2gwcfz2qooek7xy6d2q7xlia30ma0szlfell31czqafgx6ryh4yugplj1ema470aae1yctj4',
                startTimeAt: '2020-10-22 09:27:36',
                direction: 'INBOUND',
                errorCategory: '8m4iypenykmh7zzxb193r4jkgpr2dco0zxypi877l322ewfinxmxwfdiub2ynb5pvc4qsdm7id0szhr2mve7gbjqf3xa0lrp0tk57pkczx7u4mwurk8maz2er9sf3mxsraasptka39n6wya461mml7lqtyxm6r6b',
                errorCode: 'gf8arj3do9ocusuotz6qonnpq9j4smfbtweb0wy2uifrpwmztj',
                errorLabel: 665232,
                node: 4372546439,
                protocol: 'lov6odpkzkg9ybcl30ni',
                qualityOfService: 'hhunfosifcbh1oknxvyl',
                receiverParty: 'xil2544ay7ult3dutoooeso618rq8tew8964ubd2s8iz406p6jkmrg17528kgtbtxs8ok0ngomr9b7wbhc9mb7b2n9el3ykuesngrssqkvheuctc2fpkk66rlm6v9rukievmb5qazcxhz7q7ocudq6oyag0az38j',
                receiverComponent: '9mbqn7liv3ijw2lorc7vjf09qh187dqqwuu47aol0z8nv5uia0z7n4cxk3g8sosnwt5c29mxvngk661uvny5lsrbo7c9ye7zot5svnd1wq8aimdw3rmbt65b25454d425dldoq0x3bxnthdusvd2tm35z2rcd4gb',
                receiverInterface: 'b5ycy2ppfakj4v65v6xzrelicyj8njrqr1zj07glbmwicu8o00pombknlx97sl3cxjfn4y2ra2wrszucat15t26nvuct15xruyuroputyckspfn9yumuu6x537kgmakxtibylavmy73yp7ghmkapxko0faaa8wdg',
                receiverInterfaceNamespace: '3z46al1wjy6pgsvbsfwi02wpto0sz7e74gawxlzv9r1a3xhm3t0d4sx4rhl9045vjq1808t1c1rbq8ai1i09bb7729gv96cdgt322mtrpn7aq5vh7tgi4bl9vzzxaa4le1cl2zstavkp0i6zjx2axgg4yx5hpcdb',
                retries: 2244295924,
                size: 9294097938,
                timesFailed: 6136000416,
                numberMax: 8287569096,
                numberDays: 2934306590,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'vb1p1nh0see0ry56w9yeqnv8n73czsu32ftr2x034d20tg282x',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '6ml3cjdylzhwnp2ui2sm',
                scenario: 'o6dlb1qkz6p7mph5759n32a80d5dq1njtv00zmzhhv56cpt8u2e5dtuhp1f6',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 02:50:11',
                executionMonitoringStartAt: '2020-10-22 21:27:01',
                executionMonitoringEndAt: '2020-10-22 04:10:17',
                flowHash: '2252v7boa1sgc2y6nvxa59e8sfeglceo3fopd6rs',
                flowParty: '30fsl0f4dw02ysa2by77oh9yzv4ljzfewrhs9go46sof9yx6b25t1n9m0i766o3kkblzwdaksxyki8xe60kh09youwemx3v375pg1kki5pyjcwjogttugk7p5tunofab7utti0zshrtw3lruwgeyaxgapkifg4nkv',
                flowReceiverParty: 'gn9qh5g09djtwcvbp00ee7n9uepugwcysbfimc7wh5fvufdrdlnj794ewpe5hk7vcsluwxg72i0eczxz7v3yrpgulvpg8ty4kycnltmmvtd0a8afqypxa1rwx9w9qtmty4z483njmojd8ybqnefzei29xxelv2s8',
                flowComponent: '3anf20i9tkng4lwhuahkj9wp356gd6wwxarlukq2n04eei0ctuxfbsn1di5cw0h2yozm3oa8yrsirmxjm01uq560sn2a8m5gkbgripo50940ax1djcxgkrk5fnuobinu9tqk7deuagoygycnq2c60tzj3831s9h8',
                flowReceiverComponent: 'ep75wcekbeoyfoo71h4if5r93fxmwvsgnbrxd4eo7bohi4sws01wzel7xt3l3up3ni2oc6mbvewo42i4zpgbdfyr2uyb3cszw9u2hzofx8g1yr9lzgqd1pnj6a5p71c2nxe1kw64ix05wtayey2kgeovd4a7rb7h',
                flowInterfaceName: 'puhrapgekdz9fw84u6pmqjxquwwhfha4bgvqmb7lbp9q0o1gfmcpwbrzs5lw4gnuziebu4dyfuyyrfuye1p6n9h74wbn9v40difdvgets5j3r5dhyv4uw6giy0a3s4nhyxytlbmmgkw0ul6yuso5uczmzfblb7s4',
                flowInterfaceNamespace: 'hu57n4k3lal3bvi9l2770hctkhj3h7sf2x9aeq0krg5312n5olqvea3j6x22ki0zthuv2gij4h5b8ig9e9ccg7twgespi0j5nb0k4f3ais39kczaduq4qwrvyple1phb7apyeu3aefpk4d7ehn95uvaebj84pbdw',
                status: 'HOLDING',
                refMessageId: '16qwmso42vpmhd32o0kc9cys35ihxu1fddj820b2v5o981ycry84553vfev08h6xoo9k0vy26bfwnyu5792c3ptwej5nh4s0z1vc14cwhwiph5dd58evdem78vrbm0m5gxc57fsexuhsfoqcie2v3h1bi64ef33x',
                detail: 'Omnis consequatur vel harum quae quos vel cum atque. Adipisci officia facilis minima rerum tempora dolor. Saepe qui occaecati. Non fuga nemo doloremque blanditiis. Accusamus nobis placeat sit suscipit qui consectetur exercitationem ratione nulla. Animi esse modi placeat et placeat nobis et delectus.',
                example: '35cn8yvkdusvmrm8keo5x9938eabmqihl3vu9iwxic47kzeie4kcxi5llyyvyzgbb2dqc2orarkfqfe927hynkwiwv2owqc557fepbezogxg67iv4oejkwh2opkrqmrfvc0lws2zix47yhdnpjw8gbxrdfxyckqz',
                startTimeAt: '2020-10-22 06:21:48',
                direction: 'OUTBOUND',
                errorCategory: 'xrmkx5ujdujndzzvv3chwe0xyw3hsctp151kkbvuws76tglybgr72vtoi1gk85kdjhiqjaj5i4omo8g4jv5d5wrz73idvdal8u28s8tj72pff6d3j8n9xkkv0xrbtnv5kd2rt13u4uels4ypsavp8x7q4g1lwaz2',
                errorCode: '0jh14whg9zh0l31xvvm903p8l0aj50n89ba63ygca9pw08cf62',
                errorLabel: 529318,
                node: 4039981684,
                protocol: 'pvlln03seoxh8ioqc7ke',
                qualityOfService: 'a9g543jlm0tdtoi913al',
                receiverParty: '1xo8y6zdghpaq5zcdmfdsksb8yzqrhnoncpe1qzuwbg0zu1n8pi5ava2g48u01kk7xzr443o4fn6eikcziq6lmuh7xvo6be9d07ohj0fets1dp62f7wsitjfbjqruf0tt9eyevfb1cfdbgng6fb3i9ikklvvdrzw',
                receiverComponent: 'tepeb5xpobei8z09oi8eo7zyh4h11651uqumlxnr89euau9apu3ecqzcl12qadgu0wtf1t9dnavuhehvc8ha62e2otloyjw9d60j2eub12jpnpoqnb9b3l3g8n16onula86yzn666kn0lm2ir6c4bmrosuk7foze',
                receiverInterface: 'nkyb4g3cuwdu31jdnyht6olq4p3tc0hyb7swb03beprzz7uibzexkesv51eja6zx44na6ko1gu237zpq7204srs2zxojjs4hgjzsarezxkvoq2nn8mmq5s2tekwti2zro14vchq91orq2hd1xdsourlboh72ziqf',
                receiverInterfaceNamespace: 'be1icatgbnte84vnnoycckc1z1tfydfj33nrrsulp969b83zrbamuaw0pf3wye97z60eity4br9p0pl3kq19qzzf447kd88w1ln01tgnufi83iz2qmorzlyfr9t2ltdfcndom55ksxnz8wsoyhten45qio5xua1c',
                retries: 7082265680,
                size: 2576353380,
                timesFailed: 9622502100,
                numberMax: 9677554686,
                numberDays: 3916207416,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'ryl59ycr5lmbcn3v09s4g13m3g6s40b57xpkblbnkpepb0z0ql',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'rog9rr8enjkb15zqrvqa',
                scenario: 'iyw82keayeywz1zzdyhl8mdi1z8itpnm2jhzdrhpc2f15k4hn26h06soup9o',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 14:06:18',
                executionMonitoringStartAt: '2020-10-22 03:39:27',
                executionMonitoringEndAt: '2020-10-22 02:10:33',
                flowHash: 'd6i217egynjdr21l5uo461mdrw4oy0k1ghu885ub',
                flowParty: '1v0c0unnyyxvcgkku3a0b15fs40w6dgdhq08prjiug9eji2kjm1igkn2skj96ndsra0bo0zbz5rl67gnvpfj8klk93q5g2plh41dotnp53f8d2i9ufgn5cjn2lir4llcxuwnad4fc7qnlznb4r7qcc03rarcqhq2',
                flowReceiverParty: 'qspbd2dwpkrfijnc69nf0om3wi0gqc40ohocxqr29srles1v8f20v927rbnpqkl9ouqleq7erhrhwva1uqhmd22f3fq1nqnok41bmk4kogs04yuq6rck4lkbqpcr932xyepr9fiwpmqbjxxi3sgf8ldm1wmvpt73k',
                flowComponent: 'xn8s3yn91vw6nfnfr9tzcjp3xb3ehkiys3oo5nyr02dnte6n22fwmdi9pnyxi3epzo3sh9zpmrmvvq3y3ybe2q1wa5u2mn8h9e6r4eppdyxpqa9cjpcgopj02n0pv4xupyyqe24c3nrvfnxdbg7719rvd410vdjo',
                flowReceiverComponent: 'xpwolwq3wv7in521bgv0s3d1yzrp7cmk0gupfkko9plc4733a1a2pwfhh83xaqvafwvtlwd0n3cnmlb34q7ercc5xvahgvi4zcwht471350kbo1e0yrmmpj1hqm5akka0sv3e6z7d95qeh1jb6qn24ikv86ehmvb',
                flowInterfaceName: 'r90xc0ww31437tet8hn2h98w6o63t1mefuurzwfkeb5rbnzbhpoofv9ku38s2jjrsf1a80lop77qraxqv9emp8fpq0yb5xfts1808s8r0iabcflusbwmbf55ek28iacbk859gfunpr9bpw8d4csren3s4lp0a3sh',
                flowInterfaceNamespace: 's6t2o5gwscqkhdy5p8hp9qhhqu7s5gmly9owrlyeh47c45z1lz3ejp7i3ub9wngor8zjr5k0m7qduxo6vgpkydev1pqgujc9xdz3gtoivi7djcxkyor93ixlpxmniajoiyeio5hcdess9layw2zfbyc2gjopkrvo',
                status: 'SUCCESS',
                refMessageId: '79v2btz2lvl3wsy3utc7ld23wtfy1e6xg5ekbuf31859mrwzpcrqwcculhu8xix4azd9iy9v6gn1nit6fma8m0n07a59xfickrlx9nezavylrs3c6a27v86lr0hugi192dmqnbmpar1q3w6ykmexqqqv2b7ztemd',
                detail: 'Laborum nihil dolore. Deserunt et aut velit minima consequatur animi eos. Molestiae nesciunt optio. In eum esse sed temporibus nostrum veritatis voluptatem iste. Maxime quasi atque rem laborum maiores quam facilis rerum. Magni debitis animi.',
                example: '47v8jzux1f0rzzl0m96l9tr1vsvv56vqli4oqzzsbhv8ik4pq0zymdg7vte4t5h25fikmmcgspufdmkzvvw01or9yz62vrlxlb3qyi79udptg2snx078rs9k4vfl2jx2m5wld2iupnyrw9s0dqegernhlh7ub2d3',
                startTimeAt: '2020-10-22 13:19:45',
                direction: 'OUTBOUND',
                errorCategory: 'irislsq2yrbhii5cwxnrl8ul2jzm6cb8c46u1zk6rbpnugcc2uwz3d86gpk89bwj0d2k0oddqgrajg9zrzu2fz4895m55a1ewd02sz6qez6nouohmy9yzb06qhhut02124v4llyb1o5vxyowtoybfepncb998kwp',
                errorCode: 'o32rispequ4rnds5rci7e0hywlkopr3cflm3365yqcfwtzw3zd',
                errorLabel: 220356,
                node: 7804495977,
                protocol: 'p21nk796v0p9qrc9rs4n',
                qualityOfService: '5l9dimcjc4zs65ibsx9a',
                receiverParty: 'p2p9y12wro2lnpmjwbyltdbzmgiail1ajzzy521jmm7xx7bs3l2ur8b6lfp6hlsb7moi07z20w934wlykcwckdo7w28c1o6h191ozhmk1f6m0c1bw7ibhtdfifywyv4w78yvoduienylmw493ao043enffz13fse',
                receiverComponent: '490vs367k3vkgppvymuu4pkm4o9yc1nmkl5udvo6rtr37s1ljhyhpi2i3ajrnut9xnqimdf76g8go1mtswu56wtyou1wzaf9p6w1da66yqbdjoerxz3kgopa92dpc7h9dgce6ab56ehm153dd3x4seo4dkcdm4kl',
                receiverInterface: 'tqlwnwp853rrwoc0jiqz2cfxjadhchyvuogxk4x8wi9ui9kpl7avstaewlacbv7nyjuqobxxmqm6339b3su4xeu490a49b5qbjj5e88osoefsnpcc2g0dbkt1t1ld8gvp8m8dkl6v0gzy1zogzujczw3l5znad6a',
                receiverInterfaceNamespace: '456g9oi4wuvvqmnpmudlrt555yi06rn1lhbhgw84ewok7bntnjlhi8hf0jmprqttzwh1vht6picg35bs86ymw8ahzolih329ygoub2leqwk3qfn98x1zce1z59xqqo23kob3vxsz18do56pxqi1r2zwi5hwdt68l',
                retries: 1867532590,
                size: 4040799503,
                timesFailed: 1200624185,
                numberMax: 8514319625,
                numberDays: 9890061804,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'pix2vmxwpvivy7fpztzsp9pgszbmnvm809o4ukdv1vw3i0iozx',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '9tyb4g87wlfpftyx5ok6',
                scenario: '5m1tvkogd68csw8wirowqokavf89a4c2bfa5b5vg69gjymmitnffdxiqw8ek',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 18:40:28',
                executionMonitoringStartAt: '2020-10-22 09:03:20',
                executionMonitoringEndAt: '2020-10-22 08:04:52',
                flowHash: 'yua4hwn39fos9704jsloe1bxexixx09wysd9fict',
                flowParty: '5jzn3uyq1lpii4gdfiov89pfhjrwbtlqlo9q1lat5bxbx76ajexra6c6t89wsb55wdsppg7fp65zbcda4ormby7mxf3mwapl5uz6sipb8loqon1x86m1t4388rfhgxqna17mw4fb2mnki9ibb3bvouzhnq7f8i1p',
                flowReceiverParty: 'p4xo0xq9rqb98wdw13wz9sbipody8n3yrnilgqtqcw12f7edlvmlyf7186haizp45w89i34bvr3p4igkqvk1qipvzignasrvj5at7sfoq5f6n3yrf4320y7os5ks0m8d146lhcd496koopmpa9x9vmu28xprhnkp',
                flowComponent: 'z8t9zz3wlvaien26uw9wkljqxoiwq3z9u3en7dtlo50qo2yl8v5ektld36vxiq95wiavawr51mzgoxntyq12qvd51nhlnrubxjiiv6o85blbv0tozvgsizom2xwufs7dxwuftic2sliyn66qw8joj3aafqmb7baz6',
                flowReceiverComponent: 'vsfulixr2bgltx9rm0bcqv5hcieyl6kwa5tkdu43xaox3k3bbb18p0mfjw35gnbbwibgjpcwuevl4fivmahpaigxrg9y6vte7fxs7p3pxgcvls2aotups78xcbo0cr56lxc9qiisaoag7h22pdzmcwwy18zn41xq',
                flowInterfaceName: '3cqpivlvtv6x1u2wl81rwke9iigycz5sbhmwvkez6qdd5k41p8mycdo1pd5cvaa0sevdr8l5kar45vapj6r243jn2ab40z0g7ryjs336dr454ih14epzh29gbelf0jt85iiwjwfup39inzmn45cjhgc3t69tig0a',
                flowInterfaceNamespace: 'hd43zdcsyysscluqzxab95jcx7xlztplocdkk6vur0h30o3jyylyo6j3e926w09aydepefwcbqz2jbowcxpaoknvweyhgt3mnb48ulemes16ba4a8wao3vkc1t6xzrornji93ov9i2n6ksj30st7oa7bajlg124f',
                status: 'WAITING',
                refMessageId: 'f9bosuhtrp71lf50k9igln4uhbrfnkw3sv6cahfcblnumh6ju6uy0x0w4vqwh1lh7qxazafpvlbww9z2tvq2iotrx5a0iq2tloe0s6oc456vdgjcxmnzfdg7afwmvdyroupbry0nplowcqfpelanur2wof0uqrry',
                detail: 'Est aut est ut aut quos dolores repellat. Qui et voluptatem quod. Molestiae iste quis necessitatibus non.',
                example: '3c4eogo2t1m4wafdkhdihbu5r8ao5mg85vx6lod9ql2b28i1h5o5dxdawzzb8z4o1b064gj41qqak4rgt1tn7chovohx5n7icdl8ktja1gajxnhtihlo0mxe220c2szty7ziweep5ezuj2gdz773oyv3xykv3e8k',
                startTimeAt: '2020-10-22 03:49:38',
                direction: 'INBOUND',
                errorCategory: '1hsq52e6x9zafswhcu7ysgbdfntr5no4kwhy3t31mv0dgclj7i9wd2vlb3kflsd7a8qajjn9sn2db490rdbkglqbeotf17x35yboyug7rcc8ou9tsvjmljtsiwbcsq313jgmrebjn4x82956cnmswsjei5p9ro7s',
                errorCode: '3sb2eazgcuqr9iltuza5m4uqyu43gisedjg0vrwv6kn8lmemqz',
                errorLabel: 679183,
                node: 3980645925,
                protocol: 'rqiervjn1idgdrooh7zv',
                qualityOfService: 'o6uur8hpo5kvdehpxt0d',
                receiverParty: '5stfpbblikyzwcjk9il3ihtpf9ws0gox9eueitilp7e6mxahtcne6660e6skvd4obwne3yduvdqldrx9o6xw0fvzekpb3e74u39b08j00w1qmv94j05kfeh58jvby99xstpp8g4nu572i7q4i7h8z3034nazt1t8',
                receiverComponent: 'b7l9a559eibf4bky5zwfmuo4ty76q5e5dk0awjmw6te5sms3v23ybf5hz9j9hx2lnofaqlhuxttgvjmahizvahsoz204hxgi1p26gghsazyzil0a0t5bvqijh9l6kxrdh36m78vswvv3skg0vphp42bymvie9hvr',
                receiverInterface: '82al0v5m4i6qyt3710n9clcse5nkpynkdooupoj167c0bgxk0obttt43vjn9bs0mktc2tyq4iu7nnzt3v4axhh3ejo219mfxqr3cjm6z6tiexamgw69fvsts8zzsbfiobkd3s6h99dt3nvbxj7foc5ilakntk725',
                receiverInterfaceNamespace: 'ddug2qw01irc80sd4jpm4qhu2b6ceyqmfxhmjvgtb9sh0ncpxxuwwomq3i5a1wss2j9bv744lh11e8hjjzigq29d605e1d41dgkw59ggn4quijlxm0j1z3fp87vpadx56p6349c1euij8kjc7uyr9r8kpsf9uw5o',
                retries: 8562034653,
                size: 7701262373,
                timesFailed: 3811409038,
                numberMax: 4149791710,
                numberDays: 6438513034,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'ed1aifooo5k5nxvr628q0jkkxm5mffah3op03ctgsguajku3kc',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'k67t0oh4unrmrbuiejak',
                scenario: 'd99zs4con8zshnd51eij3uxo44ir9ws6jnotv9pui7i5j5hhuzvzoecr33w6',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:42:32',
                executionMonitoringStartAt: '2020-10-21 23:59:26',
                executionMonitoringEndAt: '2020-10-22 06:43:48',
                flowHash: 'rq9txb40uxhbo4ythstrtrcit5h15xyyzkmyatk2',
                flowParty: 'zvkqhv8z3stz9deflyyuoi1hjb4u1s1483ewjwwchur7ibn5cooi7t2guinw9alqz2q6m73hibvzku3fwcpvv2rh4q71eytpp0l0pkae8qeqtsoja357rnd9dk1fdd55fe9h4jyuevjurcu5psdmln4bzrwxmrcd',
                flowReceiverParty: 'b13fgx3gddo20l8mzstz2qzhsmsem05s3pkrdjer1ah7tnf0gh46psfg5k7fkx9xeyrxf2kesz5k5lwopx0cotgs6od1nocespv5ruydm8nrsux6zkwqz136ygh4pnf5nduq6m8r3k4qddkt8brr5mtqsielazo9',
                flowComponent: '2t6vui069q2nkpjhumfdtwdeh3mjh559as51jkb08mhyjw2q730iykc7i5i0cwbpmrcc3yt58aa59mxth18jb0nbtcqt0eto7nlv8nn4drdy1bz66odhs3bhbyx9aasz0ut8a25e6wtf3mo7dn9jkrfa1bm2npu0',
                flowReceiverComponent: 'xgf1qykq0tw6j8gofhtd9l4a8dq91aq44n0d0jccyzgkl68j0tboezdkknq8pv8l7nb65w36ykr6whqxs46kimbj8zps0p6bpecm25zhpf6nj6rjy7t8w9ngp9x7bbucy7rjnqft1cenkomm3eh8nc8a2jjixgh73',
                flowInterfaceName: 've3zx6tq5r9dyvjl2oxfv7si3bt4yxpihmifwrgmo09txwaenl56k8pozzgk0hs3xzkuc24bfd8455jw31hesvf6pa5b4s0wbtlqu61dosiyjp90h4o7za0qqmd69tugst0npdqwqi5pt84fb8fdyrupql7g8scu',
                flowInterfaceNamespace: 'i48n9f5c0uavvrfy9buwk4nqpv3byadkxyzfl5enmgnsddpqplajm4lifskox7rvv4lk25w5pqvymskp8ydjk656srk7xjkctu547yj5wbjkp59mxpj98dguzl1fmwvkaz3v2dtaflexwn7bnh1hv9m5us8mgk8m',
                status: 'WAITING',
                refMessageId: 'g80mo8pbwh0wtp94swd4s9n8axatfhq6pe4i1u8x6zbbw4afo9z4gbzxx4os4vi4wep0aj8x8kfy57ge6ka3hhzz3yqtxap69k7p9fkawfbzcfj4n684lr04latl9mhascpq0xxueqw0skfrr818febpncctci5r',
                detail: 'Dicta qui qui. Accusamus voluptatem nulla non eveniet pariatur. Et cum libero aspernatur nam. Est ducimus minus facilis doloribus. Quis quo facere error. Sunt voluptas delectus quam saepe modi suscipit qui fugiat.',
                example: '38dhmpw6p9iwazj8thmubylk47424j9jumh2ns2kixtr6lrvfuoqu3g3dpd5bo1aw9wfjhug1szgawhg30m95fpsgroucr40aqttgt8r9z5e6xau2tn322romozv9x5za3o7ib9ydjug4z2le3fvlbob9bsbttng',
                startTimeAt: '2020-10-21 23:44:32',
                direction: 'OUTBOUND',
                errorCategory: 'xr9u8dlp8rbo4vxishzvcvpjpg9xsd020z0z9tz2h331f0tk8dx94zxj7vw4vsfvd0kq4sw6y7gr0vcudsfqxutni6sjpul9yo61gfroewgqktu28q967ie3svph19cek19ob5fhi565ke8lqdbg784ih3h13pwg',
                errorCode: '9qgz1mp9jttvim9z6mz5wx64kfmvc8slfizio8j1uhmfuhfy2a',
                errorLabel: 203403,
                node: 5711956479,
                protocol: 'r4uw67weyesfmc5xa8yy',
                qualityOfService: 'dmn3bohc7ls93iaoq9fu',
                receiverParty: 'npoao5d8uuipskq9evw21ar324pj2qau8zxi5b1w1cn73xp8ycjmut97jrxxym3w034dwns27v2u7cx5nkcfx8xdlqfxei1hkghy2s4t27h4c4wzs4k1m2tx8brzfe89rkoiogxxqladyrrzsl6qc5qdyifrlb09',
                receiverComponent: 'r3btunrq7ugyz63ho6ze72nybs2e5nhmsdlliycuusi6ob5clrbrnwa1cgqka1txr3xq2b3csb5ksxktt3c4pj4orosesk5qwmr3ier0mk5nzq4yl2fwtmay7hbp5mtnf3xg5pz3obb77uva3ict73quqzbewy66',
                receiverInterface: 'jb06inktiyw4h3b0bzqzga7c3aqgzkvsg166vz7g8ghse50dlmdkyi7v9h8l36vul2i9bmomb3nlc53ief86ohd8ayk3rmykyrqx5qxpciyrgbs7zmzxad7101uc0q1z2haiu3o1po885ccq0209tkeat5jff7bn',
                receiverInterfaceNamespace: 'nmudhbcyae3foquqjrpdj9afxy274isaihz2gmuybt22r8wd73l9xhkyshwfdjx1pfxyqh282kxnf2h8vqum2kt3nwq7cjjfzwj2vhwubw8ja5yy2njjik9hfnhi2zt46p6twvef40w21y9h21dp09b35980eqvx',
                retries: 6002393930,
                size: 5345082530,
                timesFailed: 6474803195,
                numberMax: 6161687498,
                numberDays: 3393227067,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'axec8k1t0sfx45thegjuqs4pcudrzzx6da4cjnuhvrpcejuq33',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '0aw8ys2xa1644w7jdqqd',
                scenario: 'lgh3kq45ekp3vlqxsptd400u2lrlmonv4yikgxwawo0qkdev82o7p41b84uv',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 20:55:19',
                executionMonitoringStartAt: '2020-10-22 06:14:21',
                executionMonitoringEndAt: '2020-10-22 16:57:35',
                flowHash: '8g9d01ihms5gzx0p4huwp1sgwhdrom5duy0vcoe5',
                flowParty: 'h18ldl8knc4uo50l8c21jrs59db55u8k4j98mp7kr5m6r5l335uy5ovy0j97e8wmzw8c0j9f7tmz7kkad1nvsb5a7r1t3vixku61m672hz7ln381w9pqmp6lj4v9mftez0dvf3679wyw952x4agp82wo5vkmsbc6',
                flowReceiverParty: 'pdidt891hfav8f28ckochg5xd7vjixzmr4d9e5lr4rd2qe5c3hda0ox2ctanpbvlxwnyflbizrdzenyttj98vgakuvcr46aptk80qhl0z1hkuo5ouweocx1jptozgutly1yrr9smbuw0gsxw6jwb8ab6fot40s3g',
                flowComponent: 'w1wi2se99i3hbuek0u1dlsedfd22a7qm7kvj7z4j31dwied30ol3lq7pytuo3m149xmfqy1djvnyh84gskpuq994r8sqdjrx79uim0j7z0n8csaw66aeftvq1myhwffa1ldru9dzdxbi5ubj1oqlkul66e4hnyxc',
                flowReceiverComponent: '9izr82e1hsx2m3t63o8vgs6zsyel202i5y2xc4lo7tcbi195xb8c4krqcudmcm2nujvck3ckx4n4txwz7eq4oly85q3s8p9kc0u40hn42krpy8pq5p23arpdjwszys82a39mp8m9r8uvrlfq1301h48xs66av6h9',
                flowInterfaceName: '7let0ubsjwxe0fu1itig5qafsd8to9eqkk542mv1b5234mx9bak8q968jtmzcjtyepyhupsmyrzrzujol2eu0az63jgsv5jd6s1pquyg7xmdwmh2ea8oenqmfr167tipz81m234s5velzxkjvyvxji4hkh1sj9wvz',
                flowInterfaceNamespace: 'ubw3ny9hcypqdhif95waim1vmryqmige0yy4sgrl4l8qm1d957zntuozfwtqzsblec7rdoyixozeiab1sjblacc2ynaeopjboiad81izmqqk4zqyav9c0i0q6a3zwl4idwci10g132q4hqne0fp6fv7u8v6z75xd',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'b19sj1daxtzrm8pu9p7dj2fpfrfcusfutzvzoc6f54wgltor1ak2fiy3zvdink9q5wzxcae9kdd55pp6xn0hqs96ahf0q9c202fwso51idhnuthl4v874bamfphsc15xb40qf8ibl3lbr3ge2kz6uwg50nyqk5gv',
                detail: 'Ipsum sapiente voluptatum sunt et voluptas quis doloribus at ut. Est eum occaecati commodi praesentium vitae dolore qui et. Ut delectus tempore et voluptatem natus. Et explicabo et enim praesentium.',
                example: 'zfzxo7cfkjpizxpm732aczu0f3xmev5d7rekunqgfitjoukvigghnhvtjkwine4c7fkpf8hxudznwppa967ylhx7b5jydvpjvbqft2h5qhyturz283pzklzmy3ef18matnluplsm93uufc8slnjzeq1u0hf6m3t4',
                startTimeAt: '2020-10-22 12:08:17',
                direction: 'OUTBOUND',
                errorCategory: '7hdcfhr1untphux25nn9nk9or87a4k0obb7t5eck7lotpowfs0k8fkoejt7934gh2jt7p7i3ybz18hrz2noo51kzad09j31g0k71emtdf2pd1empx5b4vskyrqs8sqs7o2pnw0bpy381eeeq0o288ktuasxdrvui',
                errorCode: 'zdppzclihcb550443nl9a69nfinvwyp12n9azvlszi8gnlnuxo',
                errorLabel: 100464,
                node: 7548848353,
                protocol: 'vg1ftdri91ju3iv7p9es',
                qualityOfService: 'g2l0mnccmm2vj9t3rg3i',
                receiverParty: 'ee9z7dxecyfyqmdbgo2jyjldk6jka84mqcdjermcluuol90snwxuo7f777ghilg6qe2d6qrn6fpiwykh0ovft4vm9k9cu1dlxy5tz3xff3hdgw0dvavbcqvy99bvnnix00ai9z8fodgoteadglrnjoardwcmpwgp',
                receiverComponent: 'qjooetk9biexs477rb50rvnmsowbypo9x6m2rhb1myx8w6wmc77yic3pfwuvpqi5eqf9i3l20erfbm14txbgmcz9bovw9bxaskwn5qyngmcsm1zyz8lob1q17c2r6r9dhbq3llbkh5sufgjz1r6kde2jgh2y5v6d',
                receiverInterface: 'inbb8c73m8mcssstpcbltm764tw505s7tcvmmj3q5v5dni2mpzrg5w2u8srtpd5uu2myyhkmwpd2nsvm8yf4l0we6v2tkjed9smnn9j4fw9066gdspf4410t0yyxrk5gezrkgojtgl2ziqycl96kme0i6mrylyug',
                receiverInterfaceNamespace: 'jnnunipnz407ha01o24g0ohj1bm6d915zrpowmduqjn180ebq7fol8x5t4oxhbxhz5ivcb0p2eho8l7ulk0t29p2acpalsbk4i1t4cv717c76mxc5ec8e5nh2v86evelst6fo2ndq7s2hm4lamm435u40081dj26',
                retries: 2694641692,
                size: 8733290656,
                timesFailed: 6436959384,
                numberMax: 6571946840,
                numberDays: 5407661708,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '6gvkgq4al337q37ppl788o55wc2hir2yla1vyespefeona6n2c',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ugpre3nesst2jqgthy30',
                scenario: '8x2mmatbq718w2ok7uzzatropzvh8du6rdsabsucny811a08cq2qpb10tshu',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 07:32:55',
                executionMonitoringStartAt: '2020-10-22 14:30:26',
                executionMonitoringEndAt: '2020-10-21 23:53:13',
                flowHash: 'xh01dj66dzju7e81l9jbcigsgfpnna0io6aa9q61',
                flowParty: 'rbxepo0ue45fiva68ysjctn0ao3ozk2p18anz6qh8nx2rmnlpqdajpijk3dsoj9ru540qq1vgkquxakhepioupfy4slxmz6oxtkjoc4e3a0vxgg6wirz9e19jouht2cdvoq0hqs0hanzyud8ckztuctim1b15h9m',
                flowReceiverParty: '0ygmj3sre4ar3juopm6vyncufm04kl1lbdty5mykn3cwf95k6j56le5qo638nx7inmrgcbfocrfhpflc8e528cfofq7x360ddkvp4a9enqvavp10f4b9dxk212ahg6fg5tx3giyv2472xwdsk14nf9bx7utmh7np',
                flowComponent: 'pe0cgp9xwbk72grypyprrfe21295ueu5bs1er6njga85ymx8cntejzqcawv4lf86ahuo6kd5isr9xr2tcpsxegxpvajoal5vz9piy2ca1kfan4vvpc78ms8ukh5eceugc6q3k3bxwmf0ohjdis0a6grgf94kupji',
                flowReceiverComponent: 'jciet4ddeqs97w6sm7xswpppyv9h6dpg8jaqh3onz1t4n9d3wgu9artlttghn0bey1fw0hlqc22csyzf79m7tz40vj99by4znqiaj6msi4fbewjag4wqyyglhm3fkame2buk0djmj8hhs7v9rvku64cxjc9x9ief',
                flowInterfaceName: 'h56ixhku786cko3xq6041im0vmo2gklkrllzihsn10vn6euaylaymrwzmhay6sl48t0j9u9usixkrppq22dn9lnm01psdrq6s54nzibswexnkgdcsn9t0ltkaacjae4xm8o6780bd9dyzumvdcw0yvio6v7uhpp7',
                flowInterfaceNamespace: 'ioxgnka6nmu7dyjw3ue2do0g2hhicof7gu9xc7tcba49h2nfmq8jkml2xvd4b2hk38hscdh3up4b83o2k3g7g93jrsvytw2cb8j07t4vppgeh1q7jun6j1o05wvhlwe3vc3m2dmlbyzkkpxsg4tsjzssvwsqzb9qn',
                status: 'SUCCESS',
                refMessageId: 'r6e7crz8960kj9d30lykrxw7oqqam6k9ogo4icvq27xhk8lyzrhd0frp1j0740f71kg12qy8qu5ypxilhxji16mnxa8ev69v7ozlai8dv1y2homj49rahecpygy8wucqm1sjv5t4xnpz1e36m29f2pn5rry06b7s',
                detail: 'Voluptatibus ut est labore voluptas itaque rerum. Saepe qui mollitia. Hic cupiditate consequatur omnis consequuntur illo sit qui dolores. Similique quae exercitationem ut cupiditate.',
                example: 'byh8mrnqho95bmqg8w0vipmv3yuid3ahfp1bqk299uyn3675sk8afulzwmdze10w48ak28tabeii9sj7o6cw55w0scl223o15q6txcpol6h3qa1ur9g9nelpngy7kfo7p15joeaa953mya7g4zgxwaciro590tp0',
                startTimeAt: '2020-10-22 05:53:41',
                direction: 'INBOUND',
                errorCategory: 'esh30u3yz7tjcv1tet05iix2kiuoul5cugm5tx65f4mk6yv550ho7kq6gygcp9phv1wkpriz2ywi8iiob27q3u7ne02dksyy4mv5zmvy83gbce4324kka40ijlums1p9a1yro9i5r455rhq2rc4uubaek0qyn24u',
                errorCode: 'bmdaqlntgbak9y8mppubqnkjrcttsakxscdm4uhpyxxibsyi2s',
                errorLabel: 181580,
                node: 6652864502,
                protocol: '3y6lksbaoh6q9etuz0u2',
                qualityOfService: '94xj867gtwqmcbdm69te',
                receiverParty: 'jce0xyqat9yjuvn8ibnkcntiqp838fd8km91ozqmf5elds7m22i6vg3dlhbi9vdh75m4m143qbou6a48gj8ovhyk3zhwyriwrvkwomtoxa5yvvgffml9iw0nfa7jq547ewk53dna33j3k5k2y0kr08egklxx0fn0',
                receiverComponent: 'ya8zewkmd9jeu8o3sb8z1fdt32t9zc01ol25lr8dn5yh89yq26g23cwxgojp9uk49nqbcoyid1szmq2j8fizqxuuf7bzkevlopx9xkpndpqaa2sfkofbhqzcvpwygpz3rshq7dbsiyg68gthzzr9qzf2pu1vrieo',
                receiverInterface: 'bceslt3yv31l622e9nia9jd8ozze42s04ahl22j2oid0eg55fe7txmqcsf1xn4n337x0ztoylb5zecsks9pojwqhezz1eatwwqjlbztrczd555zi1kn6p7n6hpgmdeqvkv6dasnfyubh4mg96btfjfanle7td6gp',
                receiverInterfaceNamespace: 'mb55g8fw2xxj9lnh4mpse0hmpeunqi55pn8cd60t43sdg2bc6lyriykdapjqdbytpq48tx3g3z9lra63m85dw7y7qhrjnvqgg25v8hkv94ol0214lmebx1sauvexu574egmodq9befxn6mzsfl9qr5tbbpiuykoc',
                retries: 4520805769,
                size: 1677626679,
                timesFailed: 2162405376,
                numberMax: 1798869287,
                numberDays: 6185209607,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'xa0gndc52vd4plvatge91tmict3isewbwcnulmx4yrm0v8geqt',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '7uwmn8sk0ywhcp69uu8u',
                scenario: '4ow4ke16ojfm43s2qd8iu713lzjngcas6mxvscgmk2wa2p78letatfqa3pk2',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 11:36:47',
                executionMonitoringStartAt: '2020-10-22 17:13:05',
                executionMonitoringEndAt: '2020-10-22 01:53:18',
                flowHash: 'bqb4z12m15sw5xlkgznnch5o4q7z1c13li5kc0ag',
                flowParty: 'hnjsedizle8pv5osj9mmh10p7y45x9xodbh25ai4kk3d6gerewf07o3giqmvw144nuulkvg918cx6bjwpgcey6m8z3wmlh2in1hv6kjecwrsloi4dae0l26ehfi5psoq03v5twl6ma72sd126d1yahpq5z7yb10e',
                flowReceiverParty: 'gxwrns9p4or9a63qzqhbiuicmkg12z6c565gynkl9okm4ipmx4vvjvev0c5ptbywqautxp6gj23hautjjirr6f7nq5ykcvz3kzeiuwbhjbogjsb42ixbals53go18w8np3xvdag3t4kd2qz94oy0gbhdh2tbtwzd',
                flowComponent: 'm4pmgkf7o0eiq3zhkumu9tb3vz9g2lhpqw58rzyfcmh3xe60tlxr0b7hstdsnkckqrrfpwedkf89ontb4p47xot5bydtq4kwp3u9d9lb2uixor30nsw4hakn5lnoi8bfcw021jb7astwp26mo3qm2fqu7uq6awze',
                flowReceiverComponent: 'avhtwmu2dcay3sci03f7p2encmbgati7rhfhyk5jvlqtrcgec874bx8a5qw6sdvj1r590kq7bbaawhaye3bj9si3ofu9end1db2fqkwouls6be9g8m5up42ggh15zj6bsftgqx29o26mrcpd9sbc8jlaby8oatdo',
                flowInterfaceName: '53g6qdlef7c82krof4vhdnej65f6a8m4xn1jz6badsu7w6muy2fnckiow5e7hqavl2epdk5qiy2y82f96uxbyj0nmfrs4s0opsw4uopd0mf371t5b5oq5p1yavudmu6mvw0newuh8xahmz3w27y4hkits0qbyyt2',
                flowInterfaceNamespace: 'iylk4qg3g56mvggc9tz37v2tsaz9qbkozb0dtkqqfjcyfzg4aniuw216oushyltbkp5lgy7jhi01xsnbeqzlncw427j1wlv6ub7xn8bu3i9qzwlioe5rb0vjx8gx1ouu7en2m6p101k2nnw6m0lckh0eu1q4rcw9',
                status: 'ERROR',
                refMessageId: 'o36be8xoby4t2q76cbm81bmnyii3znainuefiq7yvr0ednabgf19cglhvidjawx6vmg6whz7lb9duztm2s1f2l8cuxl9u6cw7qkx6aplqzew2vzyphz7w0um52b1sgifakbjtuz4pr1s7q5fs204kwe4yy2sgny2i',
                detail: 'Est itaque in commodi. Occaecati corporis id. Debitis est ipsam sapiente excepturi eaque molestias nihil. Velit occaecati est non autem. Ut laborum adipisci.',
                example: '3mbm2eqrd3ryyb2eoq4le1sami5l5pkllrtzsto43jfdlro20qmulaesym047w3x3dopx2f9knv0pp8l5jcyx5jec6bk0eowysyixrw5jc6woujiilx7e05gevj5dmlaqa3bvygmdamusmdvsz92ha3zj1ko96uo',
                startTimeAt: '2020-10-22 19:17:23',
                direction: 'INBOUND',
                errorCategory: 'ado80a4iu4ebhnig4oen2thnfr2zly67pf7aila5nnxng117jkfjtsj38kcx1tiu4yplxwo6a22maet6454715psbyjlj6946ckozo0coprwuidt7zbq89slzxivbgjix4cjdsiqsrobdok4dyamsbio9hlqlmhk',
                errorCode: 'eictw6mjvhnh0w4y9l91b1v3lon7zk4ig5vp1j03yelp1mlv77',
                errorLabel: 826948,
                node: 5162217323,
                protocol: '9xn4ocr2nefextoqy1ut',
                qualityOfService: 'fxeh0oylz73i3wpjzxd0',
                receiverParty: 'dofm7il0eqx5d88b6gye42nmul0r1hrmn5eo8eycykc66cgl9zlj1bvtmryisyyjgflwq9v771ok1jza4xhqvxt99e3d03614gtuyag6i74adycevq1i2kzju4wgo5e7pya4xzvvdak0v8ji7hzdrt8mseqlz4g6',
                receiverComponent: 'yh7p82qqbqui6qkce5fve115yz4pigo7czwa4mablfvj87slefjc3vi4zgxx2o86bpocdyf15t6s8r5s03mciuxojtdrzv70b6rgvg5lfvias88ffbk8l1hvmvrdejv69wgcnzoj7ap2m8bnhl2bmbe81vexbjs9',
                receiverInterface: 'il39k6fhzsp17wutou1t1gfzwkcvfotceu0prieftfjx92cswycip6efybgzfdo78xsu4xpo5ymyr46hqeeph8lj4pp84fpv1xz2ha323pi003tksej7krcx9lsocwa7a94rccr72bopajephma59ytsl8xyyi9d',
                receiverInterfaceNamespace: '3fxz3dgrkcnjntppfsld2jrzv4waxoru5y24tve1u7q0blnvr283xg4jk7vkawgmaexelx4e9no8lejelt9hm0qwo5j7mwx3vxmkul7akawfpu40uj1tjwzgkgklg9m69ss3kkjux8cejdigv465uwdbfi43ztri',
                retries: 4593080619,
                size: 3955601501,
                timesFailed: 3456541325,
                numberMax: 8781803750,
                numberDays: 5144082587,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'asnb3bw7ou84kn5fntsurv37y427r2koxcx4072kqxkxz4le9m',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '60r8aq8pqiflz4ip85w0',
                scenario: '0er97tkwrldjuhetc5mr12tnes4clfk8rqhj9xkprw5xgeea7bojioagfzzi',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 13:43:54',
                executionMonitoringStartAt: '2020-10-22 18:49:31',
                executionMonitoringEndAt: '2020-10-22 05:32:02',
                flowHash: '0xg7jxlgackorc6cso18gynuv1vyy0v4a0ph1xax',
                flowParty: '0ezxp78rcrou1zpevq8xqke3r2pceu5i7wnx3ibcnph09ul63n4421qaht0occbjid5wiizjbpvwi43wfklgjgt47m6efjc4rsbwzfnvz1u66eetsunxqfa4ujal23apa7tnunci150y7s3bxu1ekhkjtaxet9sx',
                flowReceiverParty: 'wenxnky7y76vtmtc9h3fhrhzgje7tkn0bgqrdn1sonzsagyaphi5rvv11vw41f4oyzlamj21pfnpp1ctdrr9n8qd7m1knq63fy6pcfc1m6ebcagacalk7fuhne8hyszws0t3loo5top62jiir3lveo24gns1s3a3',
                flowComponent: 'z3bbzo0b7pdxe3yufn328p6egg969ldorg6fdbcvvkgxfver290jzsuavvsy4c7bukpb9754tbgv8bqfwaqjj4bsu3bfl6oxigng4fhq3wr7qltawz4dpmatlozr8unno5aykpzxsgyvgcp6pf37mwax7mbusvtc',
                flowReceiverComponent: 'qr0i38pa5c5tckqyy34nyuqx3trxpvkcf5ly4s0722fgmsgzqjiw5q4txss2c9ik1ltz1a9mjmvq6xs4bszne0t7yi95zhjn9jfejj61p1ki7gx5mcjznndwcr15h75lv91spitsvs41syhh26m2nsodowbjqbmc',
                flowInterfaceName: '82q7guj1y46lkeiwdwoegzwi3b1qkwy87a2i0zm4g7r1ybzpecn92wk90nq2o5pt1hztmn02okhovf1ypabhlf1txap3l3g7plvyfw6u6amp6jsf01gytx1wkkwzfm39uap4wvlqtbqr3u86qgk8vggshs7rygic',
                flowInterfaceNamespace: '2h2d6tmd03im12yqlq0ekk8fc67phrtufld7a6rdffcgo5od9080oqamfaxdd5hoz5s3gtk8pqrsjtqk7u7dsx8wujnodad9qiff6jwru55wiemukwff48at4rcz4okjhoyjde110ryj5dr1zl4j36kboirm6zb0',
                status: 'ERROR',
                refMessageId: 'u2esy813pt6jspyh96du1xtblh1lagl03syo7rp26qff024t70lg231tit7izamtuscjnq43mkpddiaeihs2g58kw3q7dhtwe2610w9ldvisbr574af133ig79mecv13xcpjzrvz8x49vc34gjoh8d5rw8yfmfb8',
                detail: 'Qui ea exercitationem totam in fugiat. Repellat ea debitis officia similique et sint. Corrupti quod hic. Rerum explicabo sed. Aut amet aut dolorem.',
                example: 'xm1r2idhfamms69im9ytl1ivd1di204sb9po3dbv9agijuzbcyq84lo3ggxtqr2lnfyw04tq0ev0pyhv6uf6lesodysgd6x3fnkj53qaq02uwc5r1zjulj2u4tc4dgifk584886z244o8fxygudji5d97id6xbchv',
                startTimeAt: '2020-10-22 12:11:12',
                direction: 'INBOUND',
                errorCategory: 'sesh0rnqogwceel1s5ekdo6hgv6bl5ob7iq1za0hlfp20r7qnp52rq9jayt089n06vlx4ri7yf28s6r3dcrprnuei6ergeqzqml2is5ty31i1ncgn4eq79roi63s4xv03rg38ah4zlzlaczy51aq4bdvxp37i6yz',
                errorCode: '07hgqzn854x8ne8i8diwsg3bdvgf2r9xb11s9j26k172go4nfh',
                errorLabel: 142416,
                node: 3593836215,
                protocol: 'mtwv9jax4exb63xc00ze',
                qualityOfService: 'kq66nfca11hcdrny8sjq',
                receiverParty: '0hp1ebhn5w5gqph1pddjuw2x999yah0cdgcjcfl781u96f1ed20utjtrl37jibx6gktvni5fw08l5tuohpor29a7aiswna4zcdy97r9dhd34kg38p7za9b83ja3gwci4muppbgmfbvl7x2y07tdyofmtuh1zquui',
                receiverComponent: 's9bzr2xb6wi6ma6z4x73ignkfmnh69bx4cz75dywappgs610mjkxqiyu3wqkdr61y1eyw9nue22dcv7byzhh95ur8wp44hopmeptpzivzq6dv8yl44umnr8e5kk16zu3o0aw23b7le1jnaj6w75g0hfgty15ioee',
                receiverInterface: '45c0lepgbpv55n7sx0n7ftnhbyb44zkumd49e76n3ve253uekd4aoto107699eldhbdj3ccdd4urlweypn5toy94fl6a25ip663f2mjmfr0tfdi6w75y72x1c7yao6e496r9ndtt8o0tgqf71ymgr9rimujop2jv',
                receiverInterfaceNamespace: 'xp9caxx9iuuhp6gl58htnqx0w4twcyzf5w2uz0i4n4s39aghgt3ap71rhm3967y7qv3meu47zf4yt37kjo2h1k6oa400fn9ndrp5u9kaw8ifpnpjuxyl6b0wxkuvuhthwb75e68fcrjmfjt3u2u9c2okuwn8k3ig',
                retries: 8539997004,
                size: 1903885687,
                timesFailed: 5339632553,
                numberMax: 2865959535,
                numberDays: 9729096580,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'bn4dst6com2eo9fmdoxzykx5nu7yzm3l5zonmpmklypnx81fo3',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'mlb50kwlscdj0dxx4gre',
                scenario: 'fl6mlog8nzm29tt6lvnt7qr3pyqea3ea6chs8oodzwxgng2tuf0u3xqb0zjs',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 11:34:05',
                executionMonitoringStartAt: '2020-10-22 20:52:36',
                executionMonitoringEndAt: '2020-10-22 13:21:30',
                flowHash: 'pzd7wm7l2bkd8bml7jwyf5dkr6rj999ywvl6yfbv',
                flowParty: 'fd5ekz64w3n6uqg2f13dw1a7ito2x8b20z7bfi4n43b6qi2ieqjrld1qwn9ckbtw48cjo7rje26u55bil7ea1a54w9ruf1iee609oyj7g7ilcaw3cres0bcyh257swtvuyuzr8brsnj5bguitywqu0coqvnfyf4r',
                flowReceiverParty: '90seylict7l2zvrsreqfisnfxgoivhjobvniyovnrxl895oeabxksoxobkjuf8zgqiu3lmdl42krpld225p1rsjzgorzlq9jygpeqgobeqgxuhhiqs7f39d01kx3mhnepczyhhmv2tgki0mc574zo7k3e1l28ivq',
                flowComponent: '6e6iwz62zrba5j2rbdnzoax1347rfzo7uk3cayg4e92782vzy22xxwhkvlm7v34w0vhakc8qqs67gwxtnghm4lc6o0u3odunpvjud9lf2nv5ynw35lg149aiysou31tj34j6oxjzu7ctsmbcs07g8iplvmz95bhc',
                flowReceiverComponent: 'rs2f0e30aoie60it36fhg9j3uemm1nlpjccjbrv2s91oss9l7zgdkxef8cm62tvouos94h737k5sh61y3fzjzi6gaps69r68mvot1cil4ubqxch8125vq61kkhuc6lmbr4kvtm1u669vg64o6ennwmy4m6p8sgni',
                flowInterfaceName: 'gclzv9wfqspbwfclp8okms8qnywirgaopimts3hmuyo9qppil8lhjsmhvh7r6ve1tfdwnabqd4lrqif1v2z0czev50g0vbgzusf9o05vaqcvlh3cjws5ws25lafqff5303arrga0f2aekinoufeiq0mx6j29cumh',
                flowInterfaceNamespace: 't3utayxvfjvhalhtsr30rcz46zs6faru9siedp01xkb4qnvcpf2yyx10eqq5kbd7n3mr4f7313692h2pfiawdqmomftijhplltfobiibbn5cxr9wm4ne6ta00iskjqc1jonngub8gh8zy7jtbcyv0ksn5qqa17t8',
                status: 'SUCCESS',
                refMessageId: 'jl6rdj5hjyex56c49dua3tdc9jz1jggfmi10y5oy2o8k0784f9l5e10ly7i1jwngmsv2yk0tncbq8jklzudwzhtheq73ufshudrjz20lfuuwoymdgmq65mpvl0cdx8fucve5w9bk9a1mnleenezvcuigorxn7fv6',
                detail: 'Rerum rerum odit. Expedita nemo ut. Magnam quae laborum rerum debitis. Ducimus distinctio consequuntur amet id.',
                example: 'dfwkeukl4n1p6pcx4bl6qgtxybe9qdfup290yktr4r6xtpg4s4l9tojbt73e8jjhucb0hx5q3l6xkrwzp8pzncvyhyt058938irwr6v43y2e8ldqlic3gyw92isx8zxl4r2g8bzlsv3zxsmin8pfo39ghun0zhsf',
                startTimeAt: '2020-10-22 10:22:07',
                direction: 'INBOUND',
                errorCategory: '5xj3cj7rsv0qv1vlm4fxg4mxrgvl76e409swwfq6vzhiafztetmihe1vazddkafqjrann58f7yhrmjjtfnyydceh7l3jx2rohgcjjqee3jhqilc635df2cmj0uw3tjq20j6prd7esmvx5n7egxyrtno0g514pnttp',
                errorCode: '6jrwnxm7rzqa1fqzah2bm3tjw3gyt02o1w96iqt27j8jlk4ve1',
                errorLabel: 864915,
                node: 2022518288,
                protocol: 'a2kzl9lnh5puag6z5xq7',
                qualityOfService: '5e5jiz24ypo6wi9nnwb8',
                receiverParty: 'iual19s5ix6wq0gm5rv78ywmk9gq2fo4a14q1gkjmt823g1a73a4zjux4hn1d13ep4skz78ou0it7273w1dhr8fkxyqs06lboxpyq54qj29ibpnfsmgda28imp0lawqss36s6asvluxii9z8nf6gj7k0ouye27mk',
                receiverComponent: 'jmdqqm1yptcwn6n7057sufrvfl7vxj991akz55rctwor9yz8r578r1kf3zlkbyhtkufzzc3xixfodus3hvgqpc9pumzgbkk394r79n60r5r7fw8nbizkhsygir6f4qnqbyrwhm11b4cc3ypmqi8fhv3a8cmeyplx',
                receiverInterface: 'aoqjkqykhssyk1rufuzwassqq85t1qkigg2d9f5uqk2xinv386mxn1wzyco7lwk0v6o9v31ja8yhct43zviiuzbccunh8wijk7okg1s7ys1mrnxtf2yazp8229vp52wchubx63de4f5xu5t715zeg2n5cbrypddt',
                receiverInterfaceNamespace: 'icqpt8ufkrka6joe97cbvkj38gwt81k2y3r8ypvhgyqyzaz0vto38380f9tjd5xfrgs5khb1r7ezqut9qdpn5cqtntsngzkrobgs7wsxo9ubl0mc1tyhuwf3ar60tnhaq5xcysdnpm5y5dh3b59awxhem9ykxdi4',
                retries: 6841397818,
                size: 7934376648,
                timesFailed: 9189391960,
                numberMax: 7398752507,
                numberDays: 6227953447,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 't0ey99iupwb0ofre6bdpq74w6touc0n91o8dq39ki3chtamseq',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '72wycf58kgk5r7c21h14',
                scenario: '3lb8865czkv47dyoxroeyb5frpwl56x91b3htbqlyytoj5n0z5kz6u7d5c3w',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-21 23:27:47',
                executionMonitoringStartAt: '2020-10-22 09:43:07',
                executionMonitoringEndAt: '2020-10-22 09:42:03',
                flowHash: 'e6k6ikzctef9iujn3b33nlbtdcmbyagcbg1ys50y',
                flowParty: 'yddhps6l6dlpr1ph2pucm6ulgwqek59onbh25or1ch1olsjb69em6artnr5ws03icap4m6awfh5bjtotaj68pp3a9ulvtscqqv05nab3ln9sg4w294bhxyprx7a930j100u52ac1jjs0q0j0ul1c7s9bz16v0ifx',
                flowReceiverParty: 'q5mbcufsp33naim24orhuvq711pct9ftsnakxl6neea5oujkiyf71n2m8a9ebicaipi7mmpprahs2q8kqw4raoygniunwl9tid4ej7kcsupi6g1q7txuwf828vavfdk8t4dekx2t28dqci6mq6pmnu051mrwmv0k',
                flowComponent: '61q9smijdwhypc0fm2ikvbkrpgttndj5lfbbb19i9rbwepn23nufccpy8qrpocutpelvzb98lt217v304s10vu5zqzgjwfp1pe8162z450cxyrntjjv1xu335cmuapm2jeqem4fbq3fgbb6jbx3ou9m0tbrshvls',
                flowReceiverComponent: 'z18uqnhjju5n8pkfso5jrz1d1fs9p2o0qq86qe495ns3s38cc7hyqdn5v3xo0n7dcfprd7vxxlp3nsyq0d0jbbyy3o4qmj3noxgybapg201w3q9efrvrb6cgi6y282xthfp3ws8ijbk41syvt2gput311ld7ctxm',
                flowInterfaceName: '0ig2dwi3ea910c19s4anijg9yloz2f21qwm2o4npee1xbfgrsprajjl1rn4z6p8i7hl5p5ylcdz9ehsqfakk213c2wvrojxpy1aznqk8bwtqr8md4j5byxtpz3ztykihsyb3q8kpwbdmpiil94dbnsxjp6rnqui3',
                flowInterfaceNamespace: 'mm3fh6dg6vkv3ru8fp6kging5r3riy70pnqpqzeepqjuv9pfvlb6vsgjxh6nqvr1fgqfvdrk34lbmeg4eldrcl1jslowp75hceqc0246z8jtwmg16n7k6nyhjdttm8fkzffa7mrqwwh8r47eq68isi6vfgrv3rrs',
                status: 'TO_BE_DELIVERED',
                refMessageId: '27tu9fx0dkmm10wtod58ralzz80s2l8ek9sws3xmiga79vdu8wtftrq4qrjql91o20lyb6u2tex6f7hd32mmawwsyjeyglewa0sdmabyokbzfga04rgk92d1tx2nzob9ifzcq4cm4b2zkgw9caw19brg5mvwvu9y',
                detail: 'Non ut dolorum dignissimos nihil repudiandae eligendi fuga fugiat. Aut praesentium consequatur et. Odit qui iure.',
                example: '2vmr5dr7v4e32u0k8gpklhijdexfr8b1iro0p2gkiawsa5kk31j8ur3uaf90ayn3kj27h146lsjtxqo4koazluskxy63td5tsioxwvrd6bj1vupasd3uplk8w8o7o1diaydjf2rco4ln6egj891blw2l0viqxwtf',
                startTimeAt: '2020-10-22 07:26:01',
                direction: 'INBOUND',
                errorCategory: '13t54rkh82q153omy9hb91d9h95s8jn7uvg8fep26j3nw5dvc9k2vzahweerdsqusxxkh48aeakoqg2f1zob6mhv0ezy9an1wr5wq56mog6jodarqk20yd6529hq6eg6oh2cl7m14nfyjit4oh0h7mbfrwnq3qpj',
                errorCode: 'of6irx30i0yocm8dok7eh4bzbo6oi70gs7u6h39bbc0fe4asjgc',
                errorLabel: 766647,
                node: 1091700202,
                protocol: 'g90l3srd3whvayie1e33',
                qualityOfService: 'qnccnp9jvg91yd10nmav',
                receiverParty: 'uf2lgiufsq1kd5cot9worjredfe74rlz31l2o4waay7p80ytf3v1f5zfsvow4dc2ld3e3mpfqunisvx972r49zdgtcmewn3emm4lmv0be4waw86kdpkdxyfy170t6ms7hpg1m3d44ful9tms2bfb9cx59jhte4b8',
                receiverComponent: 'eryobzu2xa9p82zzeoso5phvjv3cv4vze3y7nw62w5v0mex2h34iq8mmuibl0nlheo0ikyui1zfr0c3j1fezxiq6gasknklpk9we96e0xcbvjolhefw4vl26u6h7kj3ls1k11jr5ap65l4d2ij9hk2kdz4ui6ygo',
                receiverInterface: '08k907nvu54k53nlm4mj5aisdifsk8rp79yecnf16k4lxoorfawwiwck3iuuri8iufv7mdibhjxv5ukjrdzva5bjy23dw7jffgnw5p4qhtsuplov202k8nhsiojq5cvxox1fqv6g03kwy7ou61k9o1nnrxbvhufk',
                receiverInterfaceNamespace: 'nhgb5lobukm3fmuu22dn6b36apodtmy27l7d00h8vo5bi4nrxa258jeldjeygjs0uzco6rjv3hr8r3s4qwbl7civaw6ovfj8hfs0gzs1h5it9u1v8zcdo68hg26i4fl002k7xuy84wl103c9xg93mtz3jq4fl7b0',
                retries: 2592797177,
                size: 7069505884,
                timesFailed: 9811790983,
                numberMax: 8833394147,
                numberDays: 9517120663,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '58iu0uc2ae498720wbm38in50ycdk5wn1c83afepqr29p573b1',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '6n2rww4e5wf6m1by6fnf',
                scenario: '0r48r9ffm7nwz4yy19741n3gnbkiq92vwvwjd016uid2u4hcrh705xb1g30v',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:18:27',
                executionMonitoringStartAt: '2020-10-22 08:53:35',
                executionMonitoringEndAt: '2020-10-22 07:30:34',
                flowHash: 'o4tki59gbk2b4rm714n9f8kc4i4go3pbs08b2b88',
                flowParty: 'ixmolzkwr4yhpmz1qkml1ah5i8znzy6lt7hztfkqs5kp8t02tqd9im4apfyx5fjoxi2i1clvb84tkvo5zlancystj16730fwu02278llhobdqyw6zzs0noyo9zsc5aq96cgoqj812t64ii435l9ia4yrqk13k1iq',
                flowReceiverParty: '9c53gly2bo4cohvfs339y1tl9hpskuow5sem8w4l5i6bjzoggroe2wx8l5q2lui8i32cjh8ztl1ciqtrwo0p7gmof2wq3kzwew48mmdpedfx1eilekf7hqhs3fgdh0c32803ygblqxdzpa6phqhqerigr1js8qqv',
                flowComponent: 'khjr84ove93h35vrly56cyhqbechexj6ccfwnegr674vkcgkcsof4wt37n5u3vt33nx3gib0ap6f20eeby19mfvf6dfr3dpheop5shwqepkqh4b6rqkedluqvp889m0bxmtolekk4nqmnmn9eo0iurvjujlluk0g',
                flowReceiverComponent: '0jw8quuwtehx4ofg45ancxbj49olu0ug0dtmee407x1a0owmwfco29cbixar30njdwx7hksnjg0jdl19kh6smmlyeal8m5mbpue2qh61s6g5j3vh6mvqt29v8pykdc78yc0jg8z47xaj0tphn2ehadpjgow8haj7',
                flowInterfaceName: 'ubt92ygf2dc92n87ct2ledmz4qbt555dd6vbt9j0zvmaai6isui572jkjb8qjc4qkekv7efcw91m2rw68q7ljxsowadk2qeznxzre226xtfh357y5i5gctnv0ha6r33vubcobknlpityxiyng1dm053v6u7vx8a1',
                flowInterfaceNamespace: 'l5o1aya8741asf0tbibz64yd6sa66l51jc6ssb2vf0t5gxoes8hc5087qb1rfkt7vrg0trn5ux3b8um5mylla4v4nu9z233kv44rhw6qy2yhmpv2jdsihqiahx98km7sebukym2ci5z2tclealjd6a87qfgc7qn6',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'mvszmvlcffg3wvx7nyozvwyatbm98vzneuz83xn6mgqksrf0d0xjtvxw8i90ycvq3sqfcd5wmnhmxpaklejkz8km9p26n2u25bh3hihvg2mmkvy69q5n53vqniaomovlyhzjupfv44hkpi6i8o4lpm9ykssocmqc',
                detail: 'Minima enim labore quas. Sed aspernatur dolorem fugiat deserunt id. Ut asperiores unde. Nesciunt illo vero ut assumenda qui dolorum. Ipsa ipsam voluptatem rerum fuga veniam autem. Reiciendis vero dolores natus odit esse natus.',
                example: '3n2rbg8dm60ajvimvteesddjpqv1qjbbm8w9xkxtktedy88jrmidrd6c2nkakk3eqxsdrqm7iujb4ej2626wo1ovm01wdj9dqd4ymijpitj0mvr1fytzd56qd666cveoql54hi8iu6kgphim0o1x1cozcttc1lkf',
                startTimeAt: '2020-10-22 09:54:33',
                direction: 'OUTBOUND',
                errorCategory: 'vuumimplzb9tw471fmu6ezosbrznf12xc0nni2hpmp1b47fp78fmgakkc00tlo5ph0t0l4jcdph554m0qzlm9lrd2oe1fel3yp5ql4uitanxlrfkzxh5rqj4bqt8197iy9hx78judxcis87rb1g0vi7zpe97q59w',
                errorCode: '8t7oiitm3ya8rbgbjdjrr4jg0zp6yqnlxv18x7t36wfuikblgs',
                errorLabel: 2690632,
                node: 2248066794,
                protocol: 'uq4y4jjg5u6lwnetn366',
                qualityOfService: 'tf1nnmyw9z3doxc1w3b6',
                receiverParty: 'ulpec68n0q95zu7iccqeducqdk4yaebpqrwgx9mz9y1mf86zn26zq9ezyf5rsbqs75uyuvasv0m8noglmd78ftgntsk9dn1tgptqyr0jdzwjfeqit16lk0ef1cbobnaktrhiagyb2439gggtqoqgobus4c7at12x',
                receiverComponent: '0ty901o9mr5rg7czxa008uohysabvv1rbf0lqkv2p2tmw500k77eu3berx8abomruueu4dnuarkybmva4ccvc8fp7gjyjpiojdp7i602zfjnvrol1djz991nejyc2i0g0s99jufi8xamnp8h3bytf0rs2p5u18xu',
                receiverInterface: 'c7x8anebqeyuns8ogaw7fwkxbbbtfd057wwtys813dm3zy7nddxnnhajq5m1q2vidb4xkdgy4v8w5mi5u6umtahmeblwo8g6r5f5oa53pybffkg1k2bjzdr3a9lt75a6hdshh9omejbqsi54tj6tundgawlb4guj',
                receiverInterfaceNamespace: '8oubbsbwgvr5ytam51d9jt287j45um4tybf0j5ts80teoryhxxdlj23mu4a4ni2xwbfrfwvdb0v3obfohb8pipdl2bpjxox93c4g6f71b8kupvc6ztclntrqjcts38mrkuzehl28fh7uvjhzrz4q7t1k1eqzx7xc',
                retries: 5268092365,
                size: 2105010324,
                timesFailed: 2360388788,
                numberMax: 8846769108,
                numberDays: 9283339576,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '2cqdlizpruifr3fcz4b2hj5h8exddysvlbune1lgo9sebg20zm',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ib8og4r9m8jjyr81awq0',
                scenario: 'ffqqlv0p6utweq4za0eudhlplhxru8xktt6l2anc6kxsep6yiz3krday8hge',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 15:51:24',
                executionMonitoringStartAt: '2020-10-22 03:19:23',
                executionMonitoringEndAt: '2020-10-22 20:52:46',
                flowHash: 'netax0mh5is64utniqrg5a9mocj69z8p17tv9pni',
                flowParty: 'y5njirxvjhdkyqobr5juqr7mcoqyufwb4magp42t5ft5caxfa3sras2itceqtjdj931z71n1yzncab2fw93ukrs0dbkxr761rfyd76u6bbkqo0bvzabsi70s7s39jcrdxk633m49lqgcv09t9oly50e8tcd3v2bq',
                flowReceiverParty: 'ir7nq1wev4q9y7fkncu5tdw52j59tpi84mm85keharqa6fyn8zn4sm30v5n3sf79ybq1edhuyr7qta31e04hb0jksacmppbi43zxwrmbi6o1ekcxs01zvanl1ysk7c6hehqykxxqqqd7y3ftg0m08r8eon68v0px',
                flowComponent: 't5dmu7t3xhwpxy5td2n74zq8pys54lyk3x0z1uukj0uvbmapu5lp7wlob69eooj0i9jr9ou44hzp5lywqribq1ysxzlvrrx33809hi6cq06z9hryfkk1nfiezhvv193k31b24s3lngujbdfnn7flvjgp96x3iqgv',
                flowReceiverComponent: 'ba34s1agq3e3khcd3ig4wxd5tkwm7t4g82r4uaizvx8wwjljr1j1v9pjoqqb5s4sunosvl869zqhusjm0sfi0con85nrqg40smpd02g0uxnutalx2tashoudi8wv73d5jfmvmvzeoivngsj7pmiiksxiv1f5k7bz',
                flowInterfaceName: 'po4fg481hscniscy4d9x2cv033q53da2nirvqcefsrkomwz74vq6s8jv70jf0k0gklqtzp6btwbvlk2shfuchlxvpur2uq73mcfysgxzf7h0247146egas5rsw503stavmjlgv2bea1b9ccp7445r2q7t1codk1j',
                flowInterfaceNamespace: 'cxnimd7dkwd19rigow186j7646nhuljhy7tnusqc9xfd7j040n2nu78e0bydt6auicys2qgk0x105u3h5mk6oysambwi4v1k5gdqx4myw2kpaugso8xkox3kufddnfub7g4hmne3ha2pxqzadxdcj05m4gzuztid',
                status: 'HOLDING',
                refMessageId: 'lodlhcbvjtoe0rli07fb9n5w7alp3lwjvzl799ahmj82pg5euuuozgcc5vqnnj73iznx1v9x3o8chfwp87hk0tnhdx3gz3blvbxsu0c0hrdvpasmgdtllsvmts9xsztac0wthax3i3dkqxmuq4puallnxr2nou9j',
                detail: 'Ducimus voluptatem doloribus labore. Natus fugit voluptatem optio. Nisi cum ab laboriosam quia tempore ducimus alias qui quam. Harum et corrupti sit et aut dolor omnis alias ipsum. Nesciunt quia impedit magnam porro saepe dicta qui.',
                example: 'g7wrwc2tavbd8rppiqgjel4axqwn16vtqjmbmhfjrparr5t7qmdtpeos7ix2bkw84nqc5rvq2oulgl9x7vbife38n3xfhtpihjchj8rmy3f46igeyoy9zbk2nxcj7s8fuk5f5k9c2klc67h3k3idahuvde6svfhg',
                startTimeAt: '2020-10-22 19:53:49',
                direction: 'INBOUND',
                errorCategory: 'v1hwh9d5ugg007arguwhmz3i9cyxnhzo7z7in9lgd2vwzh7eo20xakrp2toqfjsst1gbnusk7tuaj9bva9c0yk2hk5zccfruxk5az93u287y934ey5j1axfc8h4k9q0c0ou3xo1870gdossw30boglq7tjkvc4pp',
                errorCode: 'psz9y92niwsf0o8u0jq8vs3sr9mi2gz85voccypmu53rouqpwf',
                errorLabel: 495392,
                node: 52304406761,
                protocol: 'i7na6hqdj7yvbt091ro0',
                qualityOfService: 'hmt3mdlgdurixf2syotu',
                receiverParty: 'hp6paih5izq43ym2ypsvf8uudoxpjyfac82jd4ek95bcz32lguu43wexcm0tbp0e149uv46j6vwis3a2oyeyawapx22rwrnk4bu9p2eqkgn7lsy3j0ci48uj0srmhsr9ws4eel8p4u2fw51lpwqvmu5n82vwzi45',
                receiverComponent: 'r2ps8ugckzlykiv0xbv6gr5fblk6pq3q983xa1ncfuz1wb7yw912r5iqeikwq8re146lvta5s14ol0bwml2auf3ipci49wkf865cy9ki04cqb025wx4llm7vt25tn06sc0sanspyqb2wumv1qe6rzkg15ndjoskw',
                receiverInterface: 'gq5ze2rg22ko1x2zwy611p4k0j7uojgz4mi708airhoids0t50o4tdkyfs5a1qwkgdf29xp0qs3igyz2ei1hj1bhgebit7kjx9m4yigf54yrsqzy9lsci6xzste8k3xexeo92x96yk776bepybbrdm3ck7tn7g10',
                receiverInterfaceNamespace: 'jmyb5oop7o3xr4rva0h7q41t9z7p9c8mto8uz4l01q2wxqe28290ycb8j2xysj4uutytmqqmnq3lxb99t5lbl11as28rddfcztawfrfpgoe5edd14bysfwmo4r1l1alg6lvkwraieq5yrr0du1fqpzpia85fzlca',
                retries: 5274143457,
                size: 3165020361,
                timesFailed: 6910629427,
                numberMax: 2106574879,
                numberDays: 9710222992,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '4889759rtw0owog1w88jsdj0rlrcuv9u2yxw2ww28rpg219sgm',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'yn8z97npcmme4al2usw1',
                scenario: 'tu9477yizh56cp1xwks661mvin1k0lpp9oxxayddjx0at9k7box64uy6v21f',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:15:00',
                executionMonitoringStartAt: '2020-10-22 02:11:55',
                executionMonitoringEndAt: '2020-10-22 17:17:05',
                flowHash: 'nrczebn9tosdh5vupgy8u217ebzk3jy0nnl56iwl',
                flowParty: '5s7exj4zj9po597tq7cuny4yxl6zub63aks8lb4f7g6tfbwxtf4vr85hcdsz1s42wn0pfe6if00r6zl7ccqmolw2pm9ht53at0c8ygtz155g12vns5hk1m2fb8dmlxh2f5g7n0y6igqldawg0hz47pzv0yqowxei',
                flowReceiverParty: '5f3scoh9qi6xoucn19j87qc42uuzpixy9z2x28dy23d5sv1ekkfm5kbtdzerlgnmpzbkv8kdw8nf4ghezy4lixt9q850up81oq7r6w4d8duu7aak12cxibfuiu5fy1991840ptsjruivjo9lbbfrjuan1n0wanr9',
                flowComponent: 'kccwu155dntxe3g45j6pn8rmmz345yeypw5ac8aype6yxgad7sufpnjoy7rlgc90gyb2oke9xn7a8i3nafkmtdyh5uy5ix9f1il8zgdqv7g2k401q7ov77ny0v5lj3xvxcuipix0sn2ifkcatxy491s4yq1n3sfu',
                flowReceiverComponent: 'yy9i99qfdpqtwborkyputw3dytyu7usz8mbknd9vnpbrhgedui424su56isau779mo8vi03k2jxvam537eaw7g938bxvs6cjjvvkeg10djk3irnr2ea565r9fl1u3hyagiohd05wamvrjvjdsfutrju9qku5c3di',
                flowInterfaceName: 'x77la70760afvqh77x6b2mlhugzunvjbod4jgp0nsqfgza5v9p6mx308nmd2wum1qe3j7txq7tzrkc8dtt5r5qygd5xjbqfn88jrmkboqauzkxi9nzkklgwomo8g5ru9qhazheaikchijmxi9zugq7ka1hlidvxs',
                flowInterfaceNamespace: 'zpyn0fjyc3yld0n4fbhawcye9lojgtxqm1pye7486589zzr22u9momedu5j2mfm6nte02vlun3fwud5w1e0vmaua58qwhd0ckux64d6w9pur9ybln5lodxpvuwcem0pxxjp88twrz1wx30eryf31zuzvuq2z12by',
                status: 'SUCCESS',
                refMessageId: '0lnk9ipsnpnwqygojslyival4bc6io15eut026p46brjl0qacjcyx1b8a7vsq2bbtsg0o9v9w9f9wf80c47jhzha499k8ce8bcf04xu61weeepcrcxwj8q0n59ez2lpd7fu6581yyq17aiimzbbhm17m0vkx6byv',
                detail: 'Ex facilis ratione quas aliquid. Non quia nobis excepturi excepturi et consequatur voluptatum accusantium illum. Quas dignissimos fugiat eum.',
                example: 'rnopu4b33rmgov4mwj5lil5bp1h4sz2ekx19m6fqge98hkz0yar014ssa4fyiyn4kw46r9jtzjhm2evnlak7sj6u4h1a87nhd9atclydp0vgez640nnq0sjkzpokuj4aszb2bnp5n8zuvryhdbeq0ncop0b8xyb9',
                startTimeAt: '2020-10-22 17:37:34',
                direction: 'OUTBOUND',
                errorCategory: 'jwsfhdcf08dc9uq2k61csf94fzh220aqwbm49enrnkbz2li33iamofllj66jl26lyc0dp6n59xcbx86irll27zgx4epx7vlnt0o0k9c432r3wzjpkgjoz4zx39txeeq16ob87avjzox56ubfgsp2stm638wmmql9',
                errorCode: '7nksu14no3cvotwc3ct4w2f7ymeescurxpesu0mppr1lw6h9d9',
                errorLabel: 600047,
                node: 2972143821,
                protocol: 'cvndilu7njj7xbwoumrd8',
                qualityOfService: 'e83khsiqq6msobakvrz5',
                receiverParty: '08w4tjvjcxl19zq50bcgs2vgt11j1ihpdrx88pi0n5ot3cicm6siy5p3al4pplj9bvupxsmpfvtczh8t7szjwruklfrrx0t849sebfrqk1hw33gqjqmtba45qra4pqujs54z2clsz18xqtmixkmcke9ztbq5e76l',
                receiverComponent: 'bl58ojvep9t3pvxnzvnfu5rvrdusr5d5807r0yc2fznboy2eeyz30s0wme8s3hb6ii360dekb8y4fq2o32826ufnksz9h9ksxc4i6l6deeudru3haa08qy5o8bamsxu5ecpejn2gq6l4ahorint87d682tg9xrlx',
                receiverInterface: '24idz1uzprru4bmqgugjktjzhfi4292jbpx3pw95agy89hqxc53gr8rm4lk2hkagughuy4a3no9ypere79f3cbpz93c5zroszfa3nsuwa77ie695tc7t3d055eszaggtaba6a1q1ve3wpgmqjvojjygrymann9cw',
                receiverInterfaceNamespace: 'fg7lcmje23zq9632fek8nijjff7u4vn839znm7anmvgn7k6tfi7qlj067lnxm1r7ok1cqcyp8npi5bytmnztliu95btmw5efrqkapdxo7stmydtp4qdmt5rw45p04zqnrb8t7jn8mv75dxfkjfvgae3oujyohoyy',
                retries: 4005731581,
                size: 4956344253,
                timesFailed: 3636216032,
                numberMax: 1072654841,
                numberDays: 9013493897,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'sqmv94r80lpmu86m3a5zkepqy3m0lu37q1pg6r3k4foru8ptsg',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '1i5cu3i28ajphe1k2bz7',
                scenario: 'zmsallb4r3y8iuexp0rukk191n4spxsk4l65r62ilqsjzeyp0ioo56zht9zv',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 00:41:45',
                executionMonitoringStartAt: '2020-10-22 12:38:01',
                executionMonitoringEndAt: '2020-10-22 15:15:28',
                flowHash: 'x72sb53u09e0z9td15dnmzkfnzj3wlwp3mkwa3oy',
                flowParty: 'apnb1cpfatwazgfkjzhjf374haanbqrdrestf28nyes8vlih6dws5138vllp4qmhsx1x5prgj7ah8h495qkg8gjg7c6shypawjl9b0ksv8le9s29jwqtr9m8nwo3x86rsevwbdbcq9p9zujsdlbb7xn47i5ahkej',
                flowReceiverParty: 'kuivvhw6y2bwov4mpqqj401s3wgfuzqdnr3z1ne6vn9k56tzshsej7ef2tcaz0gxjl8jl187zyewm6ljbakcx6acbvjlt109q58ht5kulwz6vcprvn10d6wy0vqdkysgopuk1pg6cbcfyibwrth1asgmq06hqlln',
                flowComponent: 'cik12s1h04ocv8w0p51n4rlzqpnvzmz88864ytyt20363iarpyd2sseodhlxnlnvegx4v5p7kqhs41rt7hdcnq9lz9rovfwfryalx9slc9d3t15p0rbnaadl16ib3tmb7wkdiezlpxxlxdhgey5xtje7ow4e9wcx',
                flowReceiverComponent: 'ckigaagjvyzmnlfg7dyfzltjnhmg5xoohluzxy58qtvyl3kcrp884i3ba0mmv3nyrjr6fy9tmff8ibxsffi3tzovyqsii7ca2hswtazt9xe9brp2f09yo41kcbqyg8yk7ecrbigmau7if67gwbl4x3b9p4gdd0i2',
                flowInterfaceName: '5p86qv5928fmna4aun3ei5imi0v5xuatgfybpgytj16z33n932yi74mxkbw7xp9nrhyhulc0r22ttp9ykkeczwif9x7swm7ocomi79qpv4s4ogfh4v0saau5rbbgl0fb33bzrcj7eh9i797es8y39ycgsrox6ciz',
                flowInterfaceNamespace: 'ba8i53l1c5wtmjcvfhulmk09w3dfvzh28uxkxyn8hukqpxr8lgde6qb83lwro2hqo0vyoupqazgubpnmvi8fpgh47achtax34j7ft58wn3z9i21kj6lpaudb9x70njozd6r1y20ww5fb014o7hw81g0ujj39tm8c',
                status: 'TO_BE_DELIVERED',
                refMessageId: '436rs0ftx3arp02676cadsrmh3i7ro41ismdl8eujzpvwq7jumzietfe4wpfwf37kpwuufkbg5eeq6dyh12q82z9xdohghlix7jcx5hjn6zmo7q1h6bxa34je0kgeolplh2og1dbnt0sdba7gsh3ooji1ihp891n',
                detail: 'Molestias non culpa in. Voluptas illum perferendis. Incidunt et ipsam ea molestiae.',
                example: 'wf2ebbbszguc5rbghihu5l7p2g9iw7v8s0nnpjus7r46bmiav7q2get1u6i53imazdrpm941io4km20s0hqpkuorjesiql5w962xc9no0unrvqdefqyxy62636304hvhcqkezq9hatzvp335v6awhm2921rlfgrj',
                startTimeAt: '2020-10-22 19:54:32',
                direction: 'INBOUND',
                errorCategory: 'snrzzsp4bkk2cnc237h2ent595huxvlwk95hq4xjgjrxa6owcs88ez9edjcwg1j6zb28h9lxsdvtpgga820m5cox12os1jnpao2bjwbu31dh1gcd5l7iz3f6ab1aljv482lw74pdqgrte07a312m5hprohj2wyin',
                errorCode: '1z550ex1wsm64dp7qafdxriyu6nn7lqra0u23kr9g6bkktl2lz',
                errorLabel: 234150,
                node: 4762755511,
                protocol: 'gafevu1jbvumrgqmuqac',
                qualityOfService: 'vd5zllx91g9mh687qtncq',
                receiverParty: 'iuvmml5fvysamk2477uk0ocgpyuuk9cs86j0xnjxcjd5mo0zuniwwt8ushzh2vecj6vt44smk5r0rwyudpwhhwbsc5dzg9y72tt1bwq1v0jjekooo6lv6f9rkswx014hx7c97ri281te6acdna3bxe34l2t0pl66',
                receiverComponent: 'ahm9wakzfyvdt65ssyqzwgnsiohomk4vxtgxi6txdbftqja9w6stvldck5o6xvxqeqbymoyhqtr8bh7gellgvzd3fy3508hwrc1qwog6h0oqrgs0ukqfafeui1r8yonung6s6wzcdqd66r3tbyaz7xrf16k9sclt',
                receiverInterface: 'belqw9je9og061mvys1m4o1eahuidd1rj4lymgkuuvn41kzr4a2dxuxn7m8jtzyekrnx5hybuv30ui8e1qo03mkycu8imrfo7s01i63qb7rmoq8lkkbvwq1g4iuodfr9ls9xcdxehres7ucc4xmh3fnz26yktamj',
                receiverInterfaceNamespace: 'eojxrmmfpryyvd3qh50vncs5rfbcuvd0ekw8vnx37uagyhhiodt28ggg9y7vzmgt9sqsxk6t6g62tskgsf6mbamm126b2o0r2zq5r1urdtcrdh37lfqkca9yi4ffejqvj2qdnxl6z0iu12s3wrpilmme91n700md',
                retries: 8010187728,
                size: 2104947482,
                timesFailed: 8669055709,
                numberMax: 7182020157,
                numberDays: 7915419010,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 's6vidwk6lj03ysmq9gxgjf72k4swb4dguc8y77gi01f7zcp6er',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ih8t86akts6sle0lw6q9',
                scenario: 'kxgorh898xad5lpetuckaeeu6uar8j896gben5nghlhpn2ukpyass19jkpub',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 22:41:39',
                executionMonitoringStartAt: '2020-10-22 18:38:44',
                executionMonitoringEndAt: '2020-10-22 14:21:39',
                flowHash: 'clob17pdwnoahu48qio5rtohvucy8jdyfbsf6ft3',
                flowParty: 'xg6waprl8owcdly7qwxzpy1zcc9olubv3rwkyeo8hsx79bacfdi3m5kyjul7ilumd20ahczfrtjay0re1gp0givw83kqbclyqq9t3zgsrnk5pmr002tfmanoku9wgn50cur30fg394twook1oype6uzf8sim4eai',
                flowReceiverParty: 'dgdydd8c0qo7zjmc59yj5mwt25afqavyilk9hu1mjephj2y5r3yr0996u6ojxktzuef7arrr272c5oiag1k8998nb3lybn8ayxkulznmme84t9ctg0124nlta408pvj2edy48an41gqwznf9xdeix4tpe5oe45df',
                flowComponent: 'e2pfu2rt4d24mlyift5q7nznnsdhhiaho1ece1pfb0uuoakc1jmxulxti79cyop17x937u1gunamrgd93ccr3b9h501xj7bs9qltpnz8d0hg403wxb68azj0x80mabclhcdtf4tx1c9y6fzbfzhvn1doahotxdjx',
                flowReceiverComponent: 'vigu6vuisry17p7o8jenr9jzslzj9nws64fal01twe4j7pwzc7gzl81h7lb23xypc8tvjgs7ntz8w2irckrb5l4fq21e0g99vssbj6zvza7dmzf9bcz65tx1ml2cct5n1lycyscnapym3mws5lod6u4cn9haefcu',
                flowInterfaceName: '01o6aen8wama78pi5aqc8khh2oqb973lk4vfculwl9aarbqjmusnu06dkwrb2m0a3zyectm6aiilcdcq91v1fczfys5ky9dc3vwmbmvx8gvjkuwdis97unuk0lwxj4hhw9ilva7n36ozc8t7kupc5niq74x78ej0',
                flowInterfaceNamespace: 'wo0soyjv1mt4mwe65vldha26923modk4a6aaun4hun7fdaphhv4g8o7sthk19vn6xr842bjrgu4jnxe4qv5tymh0prcgpqg6pqzhwsf80z2a7p6g1zo4spss40lithi42zg2xnz1kpbhsr79u8q8s6vs0h1gv6ac',
                status: 'CANCELLED',
                refMessageId: 'vir4rfkpivr8bmfaweb994bveuvu9x08ac0y9kdqdi2bwp8q1dgufzk6cel5kmkzhdqvhtovha605j2lvf5qf39ce8xx4oy2e9jtreo952yc0a9ggetpzrcdpah7itph0sc69ofzqiwwtudwtm7efoeiemrycc6l',
                detail: 'Natus omnis recusandae ipsam eligendi quo. Ratione aut nihil illo vitae blanditiis tenetur aut rerum. Et repudiandae sed aut excepturi. Qui sit voluptatem nihil. Voluptatem praesentium sequi cum possimus dolore.',
                example: 'lnz3ufxomyfx0eb51fkohhosrvedhmbqg51vq1hq8t53rzq7ehod8x1rhqjvflpo286twc6pj9bo20dwlokqha896hmwv1de0oshf2wkd2s75f28vd8dtvnlps2tqzb18xvozqiijx8pn84c9zhljabcczlm445b',
                startTimeAt: '2020-10-22 12:46:14',
                direction: 'OUTBOUND',
                errorCategory: 'atdi3sdaheu9efmg64iev5iiro0p7e30oza2qp77f7wvif6myyvr6xopfpvqtq3x334mqlkxtccaq0hoqhtlor38ynofjiujxvay06xeuq2qhtroe5mpoclqloz39zf3wclyws5qkpwr28gj9tjx2wfbps1xx02i',
                errorCode: 'wgdovms9dl2dwwv4jkdyk69fc6b3vz4zcvsekvwbsge1xt91c1',
                errorLabel: 686669,
                node: 8350909331,
                protocol: 'q245autbhehd1wh8ikyy',
                qualityOfService: 'g3crz2lb93uet33fd632',
                receiverParty: '450dy1la35fxum8f3ori7rnpkly1xvs7wyz9f61bd6n9gci2rjfyn7clvn5zmq2c6tu1gwk2xualjrql20hv9vpq4a2qt9z0370oka9l8khws7hnbw0kabgm9lnhqcvhta4v1jlxh0tx2qgoetpqh0ps074e9ri12',
                receiverComponent: 'lb96p43ekyb2j0ilyuomahb5czhxpquye48k7gdczg0ou7z1uzixnrjnoqxabt09mmujgjm0xmpvb2xs5a6j7rxenv3zgfrbli9k1lcy0rovc6khiszpg2qk6xr3lswlafytws8wjaku8o7hp60a3q5o50uhu06l',
                receiverInterface: 'vpf2cp5321suw06o5dithsbwgr2etj73qpunoy114u8gdkr1loq6orc4o611o02y753itfcu0o7gtghesyo7jykquvn4227yn3wq9jbj6by6emcqg80s986a2e0fqnwaj9xnbrjxkplbxojj23x9sk7aonzellzn',
                receiverInterfaceNamespace: 'irg0fkel35cl5z9cgzbyukbywk6ugvo20o6mry7enietp4gmlzmbwpjlxxap40ct7qng4o4p4dvq5ui1xg4cmz1loamwpqdim16ca8kef3kt38fpy793histbozqfkzjnt294roxn0kpse7v2ub91xbfmfuw8hsp',
                retries: 4711408049,
                size: 9405824897,
                timesFailed: 2252460337,
                numberMax: 3563092667,
                numberDays: 1650503788,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'q5gp5fwmhbwol0q0zoyhr108e01fmmihoyvjaidpilycigdppn',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'p1jdgbj066x9dhsc8fkx',
                scenario: 's6i4g04b1nlvq2kcaq652ywlggl1e5ibh09lnhdrjdwe3uz76r1d05v4ar1n',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 05:19:53',
                executionMonitoringStartAt: '2020-10-22 04:28:23',
                executionMonitoringEndAt: '2020-10-22 23:05:35',
                flowHash: 'hh5k2gpe3lhxmb70myb89hgyraeh1pv0raujtf9p',
                flowParty: '1kdt2p1cldcczl46w4m53te61nk9lg9ivom21fh7vgcgmg1q6cosjp4ejb92i8a2gf39ksevpvtwfjjbsicnbyqr63vkgkua3mx1iwpu5q3jae2bc74j9xr6e3mgj5r700xtijtz9mwoswlesfefypx88jseylil',
                flowReceiverParty: 'oivh0coyp5r0tzje8s63mo85x2h7sscuxgeee3izfvuoxsa7fkp8vwqcg7si9n21ikzqd6g3qzhoquwvd8vv7rlmm3aa8jc5vktjei6rzpmaq72uhhodhdzjja5baiotfc6cpsnp2ah497scd1f13xkg05e06p9t',
                flowComponent: '0ksqnmcxnal5sgu9ydref4nw8674ug77ldb6spw3kkokbmurtx01423dn3288ztir2ov3es1p0njgix2s8wruxx0vimoptwkqjb1ztcgbnt0je168cty6lmh208wo1yzaskszaxhktdr63pth392rbaaiezl8plz',
                flowReceiverComponent: 'r0su0fmq6slhpffovw8eoe08psoyqz4sv6y7z54vwdjb1ycdsmmkruydamnr7qbzzwyt3172u3v66fp4p6w2ahqzz4v5gw5g9y5hg50ye55b8scorpbgexeqizep37etahvrj2f0jrarhgqj8dsqubl372op9q9m',
                flowInterfaceName: 'jpvnf9vufq3dpn883yc58fudz5sdxjmymkvjywa35glw29iyolwzi667uk4bij0yzlvzhpsj2ace2cth0q5c1gug08cjljc0fejj7wnbzr1rvjhbxjk1k9wwm559ncu9jgxe27aiu9prju1w3t5roblhn090fk98',
                flowInterfaceNamespace: '66ee5d4k0ku4dhpkn3rctxeu9kc7jpq57avmj66hw0zl6tmetnox9vaon8ic0a5qm44eirjydu6e9jt0by5b5getts9e18y6037dzo8n5suvblccknu1li3wxosf3fi37fnbvfxtpmvcwcq1zxd43eehnvch5p9v',
                status: 'CANCELLED',
                refMessageId: 'sp2070c25g81oy9fz77kqok65ndu2z9q68etpmy128ci1esn65lmj28ov39t4tesw9al4nhbr61ggomobi274yxfxix7bkyk0d2liamg40zxi9kbuhjoa4gucgb050g1d7a1fny1rsmm6a946x4pcv5oaq59m38h',
                detail: 'Et odit voluptates. Illum aliquid dolores illo adipisci cupiditate eum. Necessitatibus nostrum sit cupiditate facilis autem consequatur necessitatibus facere quia.',
                example: 'spa80fqafowvn6jnejxm5ntbghoj9w53roilu3ertdbf551tluaagremsvo8l6sjp4l9rcoz440lz2kdjxoixks9op0m0tw4sz50svnk13us3nk9fgctbiqfqr50gf6wugcga09krw4vzbzwvz3oiftn1m1qb39r',
                startTimeAt: '2020-10-22 21:08:35',
                direction: 'OUTBOUND',
                errorCategory: 'g4yy0jdkgxuz06wr9u25ujkejv4nqkgw7mj292uf4jp3srkttjvs6z7hn5togesj2g8ny0qnx8m2hkk82a7ln034uf53lzrvi1nn618dq2coykvxi5vvww13l21naf60d61ush4nekrpespdi9k6riljw2k0i4ze',
                errorCode: 'xr47lpjxq4twvgtarmn89e5zuikjsht8m8vt2wx66iaedlpzww',
                errorLabel: 299856,
                node: 6600218558,
                protocol: '1re8py3u12mmrerue4ga',
                qualityOfService: 'y4xm4rzajt38jhrafywu',
                receiverParty: 'gyensjf42stqise0ytlgyf6nuxmmlz529q7fjzoetrp1976afyw8sp0eblhjgdbzibv70c96g59l7k05q0rer7xxywroihnfr3ukekhp38bs9g5zpq3hzq80a4ta47lhphp744f8j0qbvv0q1v62ipy0c9vvjmi4',
                receiverComponent: 'cytqk33zjfj58mp8lmow7zvgwhet5rgbp79wlui0tvjzzgke77q8dkoptjcupogovvvrnbcmtwzjr7rnc5vkhizu1l9lgmwlusbeaedt90rcm0lzvqhrkx1coll2zzn3e70h94i2iboo98j70gcvq13bg5g85enza',
                receiverInterface: 'j68xuh2ld0rgw2uprlyf178b3mjl1ppd4onj9xswsxrpywd8jlmfbu4onq05epp0kghfjoz3djpfuib473z71tbxuz8p1yr5e5tr8p4m5x6c7h9mlxck0lxlqvatuj263kyeaiu7590aunp0klkckakt8yubk1cp',
                receiverInterfaceNamespace: 'ennqr4crhxyxsodafki9141yk9f7jnmdqti8rhp13glhy3h6jjpsz4odjikkyv38nrlkwxe6cdsxzu3h40bn9t32gjuvw0mzdcbr8hj5hr3a6jz62adtqp950z1fsh7qj0e1b5xqcsqbpwsi0v9bhyolddgva31y',
                retries: 1249241190,
                size: 2658398800,
                timesFailed: 2554435627,
                numberMax: 5555083464,
                numberDays: 7804551220,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '1v50bsm2e6fa9s5jbrealbkwgg6yt9oqvit1ulqjl4ugl505ne',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'i5pulhik4w0dsfqhnt2e',
                scenario: 'kqyvdxu57tqku6cdnhuu7wv92aw2mhds6xlnnivd4mt1etdzxfpjn0rz3e6x',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 20:11:03',
                executionMonitoringStartAt: '2020-10-22 06:20:01',
                executionMonitoringEndAt: '2020-10-21 23:50:45',
                flowHash: '85dtr9s3dyc8gxupl9swhjjmtj0f9m1ux141l7g4',
                flowParty: '9f822kljf1oe65pj2t1k9ahldyf02skq40sxhfzwag0gl3hnkjghcg3o62tqh5c28jkdf23qpm0atxkm99070pdj4jfzhnlfw2xl04xznx1q66x2y802ffjrxrt4t9gyoc8s57ss3frq1woa2iyq4e56ee965y13',
                flowReceiverParty: '2b7qbfahc2mqy93b0a9m6gy20knjgv7p30i2ojgysb9iki12n9a55ynjvyd967jpndop5b58yeszso29f303prorsyeiz3rb0oa5b5zqi6lroca9h1q1qyetcip4lsmt123l02qctbb78dxhe6ys6f1ud7n7vj7j',
                flowComponent: '2a1s2s53wrd6pazk8nsa722kwnv4sgsid5i9620w5szi9ydrm7a9lhjx08w6nmrkemgyu2ztyege3uma27iig97kpnj9q6ajyld96cw1rledjt6jz5bxhydv5auncjbxxv7diwclkkvuizo2jvbeyh9114yv6jlj',
                flowReceiverComponent: 'zezvk8gvvjbfohbiksya224yu263dyngs21ve4vdadreovqnsq4ro3a58p100t3ee0zdvmrsmqpm3h8k2q22vcqbntraffzrnr9v7xxcl6gupzk7togwllgqfuv6zl5aixq1yckblttlh21cybnnetdvzr9q3het',
                flowInterfaceName: 'ibcn9c91hzhfbipakrel8cedikmxlo0tnn983gjjxk0mq12l9asnkp6rispof97d7i0x6ibj2gpdc6irzi3uqzpre6wudtdvwn7enlomm7n899wkg20jz2ogz3yp0vz19wdnr5t5j53yzaaf8i1aegt3l0td0fip',
                flowInterfaceNamespace: 'ehgncg7gvq00lb2rr4mqzrp5yzsoy67tfxto626wwuw6lggjouo9ie8kytz6s04hz6w6r7ztp9lljxdzye64qmbrdskutk6g82mpx7tz9d50iacugvvfaco2wo2n6fst1xpqkcfbs5z91nif3580c2v8yo9i6hhn',
                status: 'SUCCESS',
                refMessageId: '044gwauucd76lpu87lboc50re5zxkasdrclijb9i8lzvcb1oqvxetzwr3l3z97umdivr73imb021m8vnr3eoz3zl8yy3td1nxyeyo36fw04m81id9m6h9eyjeboxpj0txi8xoahtysurwc6hrx4es3qb8rpi08c0',
                detail: 'Optio culpa voluptates est. Ex assumenda tempora quibusdam amet omnis libero et. Temporibus ad perferendis voluptatem maiores. A quo deserunt nesciunt tenetur assumenda qui voluptatem mollitia dolores. Rerum in earum voluptatibus sunt molestiae vel.',
                example: '8gi4m83rz4scbsnulrsl20pacylb9srzswovj50hj61zjk1ca7g0peakk1alyusl60cf6sdv9xxu1x3yegdva48ssb80kb045145la3cgu81doc4a11ghvqt7ppwtfzm4lzvnfcsehoro6iofxejd10i1kcrgy5a',
                startTimeAt: '2020-10-22 13:08:18',
                direction: 'OUTBOUND',
                errorCategory: '95idr3h4p1pk0bl9i6k7z9rzmefa2g4jch50lkea4101mnlm3uso7ggl0x1exx49zlme4lc4bkq1iln4ysvyyc1oh0r4ras8o01fftq9s2pa0yaxr09e51x9ruxt21q9ut14dar3bq8ty9h52m7xla65wr8ed8a2',
                errorCode: 'k3irxlwwckfzn0gh8dbom0iwe7cpe4ej9ofgv7i7i1hbj73j20',
                errorLabel: 617074,
                node: 5748560529,
                protocol: 'tsk9lmuu21nlhbo7sbif',
                qualityOfService: 'zhzoxfjy7g2yxrgzyn08',
                receiverParty: '6hfbe0hot7nf7vghlufiqslnhqgvftxxkcwt85t488bfx96hsikg7vol3q365j5anntbk3uc3u81jub8h7el8mypi5don27ew6ztuacqwpbq5335jp1d70hpl3o4612i2bvtshid4ap33zbuacjtgsh9astxbfml',
                receiverComponent: 'fyge7n8t7q9klnnwdr2jgce5rj3w1n0t8k6h5bqq9nsgg3xm5c083ytdhq3dwlcvjnohyzgkwihvsfpiaifa2jm5uroyw78b6ldcntto13it16il0rufy4dgm53t7ovyvtlc630ppo085jb2pwfbc01cgbrvpe8p',
                receiverInterface: 'o0homr10uwfpse7ibgg16g1hz515k1wg6g5kui6x79p8pibiekhehnhn9h2wptkfazwyejyvdnhj4zmdzo9bxg69ip5sj59c3xaq5cr32ohry8ilwut8dj0z9l4m7x0l1zcnfh6nemxx542u5iyvdsirs0nm525ry',
                receiverInterfaceNamespace: 's6qkbggkrwzras6n3b1vlp0yebxr258rw16xftuqcr1s0yyrziuxtzn5bnio7qd4tk64fjwrlzj7bjpvzeen2vzk6dk2m43bhffylien98nvgs48ae9awrffddwz9b2czep0q1k9pxs5bgn9rbispvfpnnq63phg',
                retries: 2175243363,
                size: 6431040061,
                timesFailed: 3106995884,
                numberMax: 9005867400,
                numberDays: 2797833118,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '0j22blwyah32dpjzjzqbesk81tc359gc8bnr1v9u2ixv0rqv0z',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'o595i353pis1y55qcfgg',
                scenario: '14h9aby38xkqkmossdkprefebiemhtc0ejzkthb9mdpb8t3ym1aezdqsug5k',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 09:17:39',
                executionMonitoringStartAt: '2020-10-21 23:59:34',
                executionMonitoringEndAt: '2020-10-22 19:04:22',
                flowHash: 'wpco3o47wgxsfi0um5hjcot9tj8kh792ujzjtvxy',
                flowParty: 's0vs1piz4hm9m3vx3b70rr5wdnoiyriwjyjsfna8bjr056cexligxql1da2xzg7pe4rjtyppa3uor9qvibk3a0ltam846x37lj85o8mv8nkjz4eyd2v43wm5xeaokqu9jinerqxwy4q0trh8r39w5ihgp7c931c7',
                flowReceiverParty: 'qvuxh38doey3rah66d5uiv0n9h7wiqm3lfcxnxax3h3s9ra2mdgh6wmtg2oyodi4s1urpjq00qa4bdkjct4bbfdyrmipbsb8vt89axx24j4dib8t76lottqxgdokhkdphzynt5m446tcceteqondwso44fkdm6on',
                flowComponent: 'syshmvizrf7a7wce8527r2xajha85cnlozkrurf9x3fhm0034qyfmp2k9p1iingo4h89t9aa6ai3llpt5n53juzngtaev20r2jo305jrx4qx5lrpy6pabsh7rvps4zc4xvhte2vv0tc6316eytvpav2xx7ojzo1p',
                flowReceiverComponent: 'r0qdxlgfp57bni3ijt90jyl994t6k2w31fwo53zqwvjopoekape7qqt9wn9o7zip4jjkewl75gp87unn3wowq7eiadj289voysvbo70s5woz59g677q9jj2vewh3qshxtecu43180ypx09zm2pcj6dceav0funjz',
                flowInterfaceName: 'kg4dldgz2e1e9gn7b58nlvmyaz5gqzrnovu4wh5h40e7og7tl11rzegovnvff3be52j9fuwbeak4l8yn80yj962vg039hwap7k45p9ulxgefhmcgiw17w5krpv0c1gc46f722thdlj624gm8xiatps18gzrlbd7s',
                flowInterfaceNamespace: 're1l2qrwaqpk6pio0oxrv6as138g6buotyznyq93d26d6t0khezdkjcrzk7exaxklv1n5u1zb5df0pykl2k9mhv8gtsrqh318qsgia4yyi8beu3kr7exm511xv7oqpjh34yvdxwln1y32tkb54xwkjkmkzshkhaz',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'l8dajk3o1ktffcv1kpmrdq4qcn5yeby3142y5oweah8o47vpo39h8qlmm47cenh3n6pa2mdpxjp7vmwqjq83n5xf7o8y7doth8g9p6cb1aid762fu1olrnpsbazi2wj6mr9c66cx9baypqjg2nfufsckuespluph',
                detail: 'Quibusdam corporis perspiciatis aut doloremque quia dolor modi voluptates maiores. Unde beatae quasi enim voluptas ad. Et animi qui placeat qui autem autem. Et omnis repellat consequatur sit aut sunt ut sit optio. Porro omnis dolorem.',
                example: 'w78u10c0bhjhuzw9719ltvizjhtfvr5b29mgaqw0ecpj2lq0ti23sllpqrbocalwa0ms9btalwij3bjpo26xqtge74ic83lt626lg4k6prnjtyi0uq8ucm23glrviahy3inc0tlndqr97132c2u34c86cvzjd02p',
                startTimeAt: '2020-10-22 05:07:57',
                direction: 'INBOUND',
                errorCategory: 'w6fnwab3vu6a2vf2qbux18og6w2s884iaa9lokg9v05qbbwi4dpzqhb8e9nmnmxkdqsfzgdbk2k8gq6bd3v4tz0bxx9axb5wc8cdz9aey4zwsse5e4d05vozmj0tp4b4f76ivclcyeesuwiafzso8kxxd7tk7pzd',
                errorCode: 'koidwntxg4931q0ib32h1w1v2vkifkp2ublrpl430k7zaaesdx',
                errorLabel: 383928,
                node: 1970872087,
                protocol: '1ez4e4w0a6hk2iz3100t',
                qualityOfService: '0cky8n89n774i9x4i0vc',
                receiverParty: '1f7ohvbyy7nfu9a13hm6eud6mlex4n2ipsrvx9hu9mj02rlmwfum9na1cermocu7imx00e69wtlss3wt6dq5msp9rsdvw3d2lncvwv48ftzlhnw1sxxkjiuqivu7a7xquagbjztv52djkssa10jqvd6eyks2ls8b',
                receiverComponent: 't7u2g09oj2n15bw33x49gk8hopurgo517rni56gdmso4y55tk916cbptco8aveeon8yznws9fkr6guig6vnoot3tjq9vv9rlqei3gguan7erv7tb9jty9dng3s9h2ajmo402lcdrmydqbswgnzcrvb2lu6xgkvsf',
                receiverInterface: '0ekztn8mz29i0fyska284snwz4fzushzmd6nvfwgktqunasuzufc1vbiv7uusljeld0kj9x1wz2jbsprcy0qbcsbob6xg3qi24ouxj46v35ahi5x8356je5lwisqiuo4ggt0icd3mi303nqyw0qlf16a56dp3i9t',
                receiverInterfaceNamespace: 'jxngco87fcv6jgu3rlj4xr3acvpfolrgel94b62k7prg3m6iq5ggg3e9mbx4sterljlj824lgb1g9l9sjt94xafn3vyj9j11ftos0qlls5gdzp9pa1aifltmsl7w9sgsollyyhptmkn7fve5rh12vb1a53ppg849c',
                retries: 8853816534,
                size: 5922487922,
                timesFailed: 6064472779,
                numberMax: 9204363420,
                numberDays: 9137374348,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'mfn6jswb3bxgrk17u4ohg2r3d0ffoymysnabkrpxxuk1fg2pbz',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'qsgasnn0hco6d1tvznmz',
                scenario: 'scbovtto5b0e6k77r1tx01m7fy6clo1f2e6qxaf7ccxxgnbttanabek6cc2j',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 17:43:30',
                executionMonitoringStartAt: '2020-10-22 08:22:27',
                executionMonitoringEndAt: '2020-10-22 17:28:31',
                flowHash: '5ewblw5cdqqt1wh07g9qz0o72ymhz768j1b1lb15',
                flowParty: 'w618u35ahd8dsi8ul5hmnooz8x429l1svsxdw1ywd0d2zoy6x8renottc8643gc1xecvyc1wmz3yirplu1wu6br1f3azq64nqt599qs1h5evypbm323kpp8st5z5nvlgj5db8dxav1lmkxd9vu78beqzf5i8sbjd',
                flowReceiverParty: 'ya1updb0rz3019507hc66f13oy58unvrk1f0axwyzzy33592adfrvjyukvv85i1pf1pfiefgjocfscpw4r3t6pxck0b87dceb93cwr2vyslbkjc5ias9nj0glzc1imktfwhzfeommwoxvclsz0l1ak4wwz3gi7y3',
                flowComponent: 'h6vopsyonwb3yie111xidtn8hvxqyfznhu70m0zrhuxqsw10ug054ulobj6evd6s0mzt1n1z2fx91crrsgtjuy0j21nc63csi2wfiuuzp0pxl207k8e3f6s1be3u65edufh5rw8kmzsxix00ojokcyai1narzogt',
                flowReceiverComponent: 'pvycvcedipsxjwleez0pest2hjq7p6l79sod58b9vb0htc9018r70yj3u2fstvoahab9pmxi0mc6uy4gw3lwf3mtz0zxwixfi6t7x3ujhqk72cyiu9djagfmonakrjz7mh642vjpdpmu4m89ro9m83jsd3pxpkjf',
                flowInterfaceName: '2ufgtsfnvkbhtve7x99m1yy7f6xlm5aeswqc7hu7vfenk9dym22327r85jtcs5adw9pu71ojidwgvvru7jdvwxihjlgu7jwl2iw37nshrthbpl0s9ckt0nsnpans7ohn2cercow48yiha7v7x9icgg94o8j0fe49',
                flowInterfaceNamespace: 'njcejb53hbxezdhvgnguytgrvqdo6i5covs82op44m0ee3l248sgxs7afp7uhba2j2i4dujno8hon4pdbsgrvtn3kx9mmyc41a2a3ug70mwwpht97vrehj77jpheegfwtx7jcgj61j20ompd54e2ptqwyg5hopr5',
                status: 'ERROR',
                refMessageId: '1s9l79ijuwwc5h8dmonb1tvxca5eep33xricm715bpy265vl55a23klrjzhblzdqihyhvtrtc9qx6phm1tj3v2qqh3165ezs3at2ogwixommaxwc13w0dze7p52nkbjyqhsh6bqqrydti0ldrcu9gs01dazw41b7',
                detail: 'Et quis molestiae sint quam voluptatem autem. Voluptatem fuga expedita laudantium voluptas. Sint minus ducimus.',
                example: 'ao3hvo81y8tub84zaim8ur5mnoqepvj6e71torjx5u44rlmakw0ta83lru0us8odrdnn36hn6amh5ly42e73ezxooj1hwya2nalr4esyw0ejoxh4aa55rghxtrsjgds9gxw1r1rnkwhq7aa2wifg09dh2iil8sy4',
                startTimeAt: '2020-10-22 15:11:05',
                direction: 'INBOUND',
                errorCategory: 'g5rn065ex0i1kwxz7t5y8dpp65g450c79pexziiucf4h7ldj2g2fffhnpu6bgnj5r5e2q4y26v2mfjrgk9zegr1qok10zl8px6fvpqzq6o0sy3cd3wbg149pykwrjnh8sz891v8o014w40tj1kdhskhlgeo8ddvw',
                errorCode: 'f376rx3p4e1th5yq2ax2xuuabwgate0wies03z3nu3tcrtdkav',
                errorLabel: 890702,
                node: 2407799776,
                protocol: 'qp2ql3j0teks29t04d4w',
                qualityOfService: 'vnuc80hmv12529qwpj84',
                receiverParty: 'ckduuwomq8ay8ayw5ha830ksmtm7n984g53s52zwp4bd1d0gi7c7d7agrdce6ha0rtlc6gcm2ox8i5m37qqfzmkjltqgbsrd93j2rdxn8dolpm87u93byj6dt6f383c15gzly3yeer8f6zsdyn0mln9xr2s23bf5',
                receiverComponent: 'xflgi1vma1lxhgsn8xza54ajnb648ljeh0652y5vnm2ac4o08iktcny2th7sj48qwbjv48ogo52cmw3ywvu6ibvoxwgqwqm4cvnmtwerncstyli4x1c5azpbykxhumb0orxczxlenkez884rpjc20zv9ia6vikeg',
                receiverInterface: 'c1hldyn5u9erj92358qb51wue5bg2z1regpoope43d3w0ciym1c2ff1uelzn5g36sdvc0cl5vrn8orpv58yugbeolkxpje15nqudg5aouvfc2ddr95zwiwl856ew1bvfp2i7vt2ndfowdcvl47dreh0fv8r15knq',
                receiverInterfaceNamespace: '6bvzsb6ujju099ofkd83dh5e35jxutbebl5zhaxmaap5vg3yxn6ifnj9tly673nh6dk8ufbbuwn8bf4sta4y2ju72doy9oiqhgn5bt0zskxbqxvog9phd47e1d7bhxuihgv5ccmur6enu4o2vj7dmamm3o7zgaww',
                retries: 45003274711,
                size: 7402179707,
                timesFailed: 8269057984,
                numberMax: 6870384432,
                numberDays: 3087938062,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'bb5pz3f04rdwv2z3ijelfh6x5ypm80gcpfil4ks4sh6te5r7ds',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ukfy2uenaca7ek4fgzqj',
                scenario: '8g7yd9a0iut1w5dijtl5e91b19wxse1tsmni9mejwq2lmh9ckoaih15c8jfz',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 03:51:23',
                executionMonitoringStartAt: '2020-10-22 13:23:36',
                executionMonitoringEndAt: '2020-10-22 05:51:51',
                flowHash: '5rtfg3hv5jw32lzp2pp2cmrfar24hlt5cbvekpj8',
                flowParty: 'z69nj6ysexq9sn2upsuomn4a42kgiriiamfoz3iydxa1nu7ogyrfg54tsc4yoae7p56vsr5rhw5ali7p3f8qoys4c4kskel8p84xmxtma29oqfdv3cvnk9xqsc3x8itrdj2doomh7d47va5r7dru5jlktn15tkyp',
                flowReceiverParty: '3cgttzs1bs3yzaftlkxrwzkkjelz1swhb7h8qhj4nj3a83piglxbbk4rm8q09jc7k4deeh0kcywkvqnredxoieq0a668yi72taloluw94zz0ecsdr5cee1eo0eeahxu5kcq5ek7r19du7oincr6pwzwn5pjqm4i1',
                flowComponent: '68pcxk1db735lncxtbhm5w4ry3itby320t8z5vw19sw78k14dx6o0dqd4kpasovxo65ygeets1rimsqz4bowgvmkq06v8eszhvz4s0xuvnmv5zr2tw3cwrkt1cijq4ejeg38772hzof7l910pczz50fex7cq3a3a',
                flowReceiverComponent: '6eru8sy2n7m1xca6ht3e9v7hiqzih8xwf4kk16ootx6bnr7nmh6zfb3fm1nrw53zv3b42yyjif5zcd0thu58xdld3y6y2unomdrw0080bou7itq7fvkrcz09z33p59zq2ozw1vy37dvqdrhc1qb8xt7dy38u0sig',
                flowInterfaceName: 'z57544sqkns5gczize2hsj21rr7dv51teoelsi136o1kqzr8b2fjjcm4xzh16u83qxhk74h2dkhu2ilgur1qbi2ribv3twv6h6ai8a49rw2y88ol1llnol29rs2cd9lta16iu0yrx04dmb0yk059b5os8jojmcro',
                flowInterfaceNamespace: 'gyn1drmq98n48wwvvks0kalttr2dcmr678egmkqlfg1qqzxg8esv49l4ebv2vmde8h5xitcj2y5bbudnqbl8m89m9gdvc5yadvg3cicawap4facrjdezu0eexwy8yworkmschcf8aalxu81sg45m0clfy33j6vos',
                status: 'CANCELLED',
                refMessageId: 'bxymsqy3ui6qvljhjy3zvsec9sn52ugw3fkmskvsu98o2kc5cdizzmrq5noft5dqknud5dgamvay91sqr8qa307y8awxsy5qldxgj8b0yqitr4n2q7dfbjt8i70e5hn40p6elvz4u9aprzb1p7rgr1v0zoqhqssy',
                detail: 'Quasi blanditiis accusamus iure facere aliquam ea inventore beatae. Aut accusantium voluptate magni hic dignissimos quas doloribus. Voluptatem sunt pariatur tempora corporis maiores quia maiores. Cum voluptatem rerum. Tempore illum et vero deleniti est dolor et ut aut. Eos ipsum dolor ut aut sed maxime facilis sed maiores.',
                example: 'bzsbz7oz9xq1u8x3fiath6nr9zcmu76476h76ccsff6eh4shvnuw1px1x4l9aoqolyew7fwgnn7v02f8bwgz1sw0gdt1w3ko4gt7qwq044ac5xglbxzgc9i0upt95fozdce7ydd8pvbfqxuzthqjmbwpcjc6ogyn',
                startTimeAt: '2020-10-22 02:46:38',
                direction: 'INBOUND',
                errorCategory: 'muo77zuxqoo6m7mxru06s8zml5jvkxwdsx2q9z42105ckr17315ewzqsjayj84fxic2ahjm79hq8c0oolpiv3whgr456t3kgrfmz97l6ykoqsg4blbt9oxnpao0fyci8undlywcqieepnr8oivvlqengp3tcdj2e',
                errorCode: 'v5qbf5u6lha773qvc1zh0b012nvuc4tulz7etzcp9cjbsmt2t5',
                errorLabel: 753319,
                node: 7378254780,
                protocol: 'nltgyjo2bneprpsmnq5d',
                qualityOfService: 'c6j2n574jsh3ol3yy5q9',
                receiverParty: 'ws3zomfn47if3z1kuvm6c9pcterkw5jkwbljxyetafgvkf7p8pipqk1564hnpw22thmvgevxds8sjr6420lg866774esywbwjv1k5fvmt4hhnicvjfbtxn7n10jwdl82sbmvmw0ai8ne0asp2jubbpibrg24fwkv',
                receiverComponent: 'c5iik52db0xc20y5x1e9x0cwg1un191i1kp6k2g765pbrljpgmkauw9xdavfb1g5lij95mbd55plgk6p4nu5tu5ysj0rxuwm848yrhe6s0n9gfjfqmv8ittnusbzjuetoyd7xjhhq75i792g643azmfcjbtptrp4',
                receiverInterface: 'b4al0vrfbeir2eaa4a7hqzvw1e9i6fkt7ukacx02og254a3d0w27o2ble75oe5guwl4rlo4nm1xli311y9503aq1977t0n062wi089hrv19vjfpg5sa7mldnfsnt68pa79kcuubwz12opa9jxc6ulfi8vlpdsgck',
                receiverInterfaceNamespace: 'qdcfehjk90r99opbp7jtu00mtq5qf86y75yyh7radq6rq10dhopazfwihc80a7tp426ul4vz22bci44funtnqwft0iylikbeyrnk6qpdfhg3ku2jpxo46udqtqosdh8uu7uo3awnrvzgfmmtvupoa0w9fvby6txc',
                retries: 2615444203,
                size: 20114326063,
                timesFailed: 5092515878,
                numberMax: 4632391281,
                numberDays: 6829129747,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'nryraj1sr1vbo44m6irfhfzk6ypdncc88773g5rucchcb23blz',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'vyyk385j9pv8ciq189di',
                scenario: '1ou6amdz4au2bgwm2kzk7mkpyiiwgbd9d2jkeqbjppos7jdx5crhr0kghgqi',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 03:21:44',
                executionMonitoringStartAt: '2020-10-22 21:49:45',
                executionMonitoringEndAt: '2020-10-22 11:31:47',
                flowHash: 'ew9nw3o4hi5x4ldkz5ft3h4gnisdk4kpp01kxosl',
                flowParty: 'kcd2wmz5vb518ie3iw1hzu48epzxde96vlezx9ur0bixiwdyzstdtobh9cfawolhbbd1z5wmgbp3lxqluvoj72gtet7ivglkwslqu4klwnhq5e8j1sihb9hw62o08g1brngqq0itzzvruda04kq8k40ltg0y586d',
                flowReceiverParty: 'a7l0xtv45ss9jb5kg3y1v2l90lh1mmaji2x2b88caph957stagoyr9w79gh5rqdqw6gtezzarsdcrr3eup4zqtg09ujm0bv63dai439d9hzlpjtuhu22g9zeir295y51sjl15rmcchlrui0bhus39engrfek5yik',
                flowComponent: '7hdpeufaloeueoyucsxv8b7w4mp8edolpf1gmfwsxkvhw9m8pb8gnhs2d98n5tulmr354ksj75h3gzv3vnh00uy8mqeha96oau5traqp09i8li3sd3no9m11s6jkkaoz7vov96gquup3bkj6jme88x3qn4uf4nus',
                flowReceiverComponent: 'g0ffgzfkj2ntnhk57f3p9g5x5yof6e81gbuvnuylqhxhb5ox5j1bvfbnawn734w4qffzjjgzv8eqe2dqjvbpbip7bhb8gxe6ltlhlt6ci5z9djx9t0feq5syzr0i4uuofdxc5ijhxt1pgi1xzc6ac7e0xc0tigrx',
                flowInterfaceName: 'w9sbe2wnuyzdg5ihfmdrl7dmau77g3euyby5ypm3tidolhi5ryrq1m22fcfe37hddoirk1t190nyt20idbcm3rclozpp2q2nevmswcq479uppg704z5ggc864109xo659lt7qomqwy8kxsahqq0lt8x97dlj4c1h',
                flowInterfaceNamespace: 'zjflneir1ecd6o72rqf3wq9pkab1w1udyf51w7i7zmt300uxdy7jrgvbxbnov042yd49ikw3ur8vba0tae4jghkfj6tqnayksh5kxzxyf603gvpfzoabbg2xdlcwba6jnncp0middmc782vy067vw4x4enmz5qp9',
                status: 'WAITING',
                refMessageId: 'ii3c8xkcs37wvleg8s5p7m2eqyyimi9tlgdx3jav4v6epe92nly0sug9kt89gtuucq5ymam3i4qegyzcn8fy4inp3ujdahy9ak8r16spkg31nmdzninmck7a7csm94dmsjhnbk7w0jm8o2g89hzw638m4h5hv837',
                detail: 'Velit eum voluptas ex inventore eligendi. Blanditiis maiores aperiam fuga dolorem nobis saepe ut quidem. Vitae corporis nobis voluptas illo blanditiis blanditiis. Quis qui tempore similique necessitatibus corrupti velit maiores ea.',
                example: 'h7ai721rdeb32gm4b2p0i0uk64r7pgvxxvbsjc0qcbs076pzar67dujcftmpcu6szhnvqyqp6yikm4ln06zdbxl8rathr4vkxisf4zr1cfnylc5zhislot8wzw0oj3zx6twd1hi9q0rtc3u45a68o1yjyo18isji',
                startTimeAt: '2020-10-22 01:18:32',
                direction: 'OUTBOUND',
                errorCategory: '95shod0bbd4nz4xchmja0da0ef9nr6w63b88ioo7x0umd2qzw5jtg12ebow5b3ca9wb1an9wrvid97ss6plapcnrpv369zeekdit3ahlunt4gpnhoxz3sjhb3t7xrpagt9dhtap7wwv8g0zxcg6s2tjlfo5h3eca',
                errorCode: 'zv7ruqnl0bepss6xioset2cn9k6333z2mfo92itf52vyqeuqn9',
                errorLabel: 456700,
                node: 7488834106,
                protocol: 'jqd82hw25d1v4mykvejt',
                qualityOfService: 'p3h5ezg6ojf4ac3cbai7',
                receiverParty: 'y3ltrweb920ojuigjb5boz12vlfc1xaazaxtzm52b97j7ctd4q6vxfa0ypkwe0fhrmuo167iuz45ty8ou9lr7mv07axwf6u8nzf8t3ucigvoflyjdqnd4zhhgs3vxj2yhb939pphwbi6hugzvgolvcx7zo8ug2h5',
                receiverComponent: 'nr5g4h02l2qv6y2tvdsi56vmpjypq26hqtm08ih5bdbzlvfraebn43qdh89o9eq3vsxlfwwajh2ing9l72kn3ts09ckcx7v5gufbtegtfwd3niwrgjdnsfss8rvhf4gtvwekrj367n8wkkwl3nt3jqunf89bafjw',
                receiverInterface: 'fntoppnsu862v65hq6w8kvyw335dml7hai5yg7w8oya4q0v0ka6vyu6tbrsangoxa5du208q8ua944tx2buax7cb6n5k3no4w7oo9qwo1flbq5rt6az1jli01yl6hmzwmo08wpr05vrbvr61q200h077ve7b19zo',
                receiverInterfaceNamespace: 'jt3sxkgg7o6n13jreg7afs8sti3uw21eo5qo7g36ijqeojjox08gbkhhrk2q6r8y617201kw6aq5gvxgkjf8qpgkgxdj8ft51fd0i650xmbfim2kzp6bzb3i9ts5iuzq9ktujl1j70gyik2gmmuqxl6z90edbzez',
                retries: 3366759369,
                size: 7300854750,
                timesFailed: 44292080555,
                numberMax: 7310352020,
                numberDays: 3325536977,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 's89b6s2jm2tv70lnckb7j9w9t0gdxtgqqz2xeeng9xkirt5f6l',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'yr9sybcbl90nxwwxsnyd',
                scenario: 'bdfgkebxu0vjkmhd4pabye5hfvov9m86p76z703rodycsdbafbzet63rq440',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 08:47:19',
                executionMonitoringStartAt: '2020-10-22 05:07:03',
                executionMonitoringEndAt: '2020-10-22 05:52:44',
                flowHash: 'y4iilnnyshnattf8dncg471nbapbyb7elswx1xgs',
                flowParty: 'm477p5c0xf0p1eppe5gb55hjljauzho1yodtx0j4zan4agvj87si7sxhc4jgd9lb517pbbxsbfq0lxnnkldrcsuntohxxpi6bvtdd53au3onwil3qixr96oczhtraxuj4exztq1xn3r86o6qx36fpynai61kmt3s',
                flowReceiverParty: 'c3m9j1zgo3xla0vt8666ekvppecma3cnms6gzf61e40ouywn6j5xj98jmrnuc9eqdj9zhg0ips00zlx931wpzkq6y8nja0pg8ylmhopo9kgkth38jzx9sk7w36ywna5hhvlu3jxv4s00j6x5kpnxf1ha1yuf7ro4',
                flowComponent: 'syat9mrkojj7aejssxw5l5qacmbr2zcbtkxf6yrytn4w9m1xeqc9hpjb7jwtrugtflex1t6jduaiywwmialxi61i5e7edb9s3q8nosrht7yb5t0mqren20y7v3h3j6c1oq2ljmfzy9d6uu3l7k59rup0aysxd8qn',
                flowReceiverComponent: 'bz0jndwl8kwihs5xnijng338okwb777kjatp01iwgm00jfsknz1koj51yt4vqpdguln45qw66y3csn2ehdtnblacb7v5dfisrm41zdlsd72hnsvf2upxvjcezyzxk0dyt1tvcoj65mnozyoiqaehdiyhnssl75vu',
                flowInterfaceName: 'uj89med7mpestlj5t2le2di06kjcilba6xctza1iqtlm61gv0x5etzzrni931deoumqikcd17nwsxbepawdztmzzw5iq9o95f5zkawgpueq0mr5myuj61c7tn8ab8polnn5y1kv9d4nx46fcm5f2e3flvgl8sy43',
                flowInterfaceNamespace: '8fr977bg44lkz7nr1uligq6jtnkwoxvbxgvw9w7x0c14fy9ze1hq7yclgefgnehimwgo2hrycxm2pxzzjqwef9h4gjiaramgc4c0rsz6cw7e8ffe3ta28uuigmnk0k6l0nz91kq9zn8o8uiytr0sdcls6eetaq5d',
                status: 'ERROR',
                refMessageId: 'itkr5cymswdgnug4qwrnq3uopf7ohq6vu49ukn61w5a7gyvvw3nl7h5damwci2fn3nxdd6ox2wt31z1nulz6ig4a6oeuomtux6godbipguwz3c1zjbc4u32xobg5ibjj0j2lt8ovzb1ak4zz7ufilslscbnttjpo',
                detail: 'Ipsa adipisci aliquam aliquid ipsam itaque. Aliquid et rerum. Beatae nam dolor autem. Velit explicabo eos magni. In voluptatem vel sit voluptates et omnis numquam praesentium. Consequatur et ipsam.',
                example: 'etmdc1kf9vo0ukclbrrk50b5p6oi091e64x3y02t00fbt3okjn88ukkubhsy8m0xcolvp2vk5o1od67acz3m8jcl7fbscsddk6ssbs8cdfjp89qo7gekt9nvhjn5ys980wwn73svjgqzdje30478nhhfuuumuld7',
                startTimeAt: '2020-10-22 07:29:47',
                direction: 'INBOUND',
                errorCategory: '89nu3uwv3e04m0kyw4j0qhz6ko4i97h98gn3zhpumfq0ubamt80vqzci0dz7tvpm2spolnkdhl4oftpsc2zj0jo3yyjkrixzcp53bvyxh8v5wc9sgnr8jrma7pgcza2tpcwa4qor0mdts88s0zkgmt8wil791li1',
                errorCode: 'aunixi6crodr9e6uz4yu0dct4f05ivuj1pdp1j662z8tf5rnoh',
                errorLabel: 548158,
                node: 9311960067,
                protocol: 'cw0ovk67iemiad00grbz',
                qualityOfService: 'bcvi75rizo5uyrfu14dg',
                receiverParty: 't3me7xk7z01ww4cf84xnatvq6ajd29l9o620x58y0y53vfey5b5dkk83oqok254f5u2mbsszt746qordfl6vwvpjj5tiglinntjla7m5dqr32zeyo7oyfpr3aditvihc9ybp1w8fej7u9rmbbdg585ljbdewqxt1',
                receiverComponent: 'te730ht4tk6n17t1c42axbngz88iwrwgmqosljmaa6ojmcxj807qma18psl8iuvh2z6esg7vzhmjw58d7nvjk7a7aba7x6zf8pqjvqxvdie5yni3uqyndcz39pw7capymw70wwizrhzrgkiqtyrrh3dm6u2tnkgq',
                receiverInterface: '0w7c5g1cztsrb73h14f7cy3yigxv59gyva56na7t6npigo5sworjtp2blma3q1hr64cr7kq428jooqe7yb8ta04e4fzzndc72bdns948q9tfs6ulqtcgylloqv2lprapwai6mk27nadrtlqq0ku9v8k5i8vux5d6',
                receiverInterfaceNamespace: 'ssh80a9k6rya4rsteprq29mpyhq0lpcerdjjbb9z88a3u476v2refr4trw62h6fs1o39tjljphiu2ajzmyodof6z2ws32jetudnukiggxwm0nelcuzx1a9a99690efiy0wmmrht6vv28mx7mgpd9d13ydqll4bnn',
                retries: 3334552689,
                size: 2571743917,
                timesFailed: 5511076084,
                numberMax: 29484359626,
                numberDays: 4125575951,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'dspeac522a2tid9dqo38j9vnbfxxt0tzv9wdo4bk08x6sr9df4',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'tq93visdjalcfhdrv8lz',
                scenario: '2r90mo50u40xxhasmpq6xbyuaxdgarp02z0auzxeux8i03ym6zax8cz4tjve',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:17:05',
                executionMonitoringStartAt: '2020-10-21 23:53:19',
                executionMonitoringEndAt: '2020-10-22 16:35:06',
                flowHash: 'j9j0iir7jdghv9ed19yumre11ugwz03s5e3gwlh0',
                flowParty: 'xlebaeenwh6q8a14i95wn5syom5f7ow3gp2n03e4p1qbj38t0isktwua4plwrcueh1cpvajqw6ps8rfftnhsqcdzf8nvcdkpq2yvrc1lkqctsk1gvzjn8jv70gksyqm6tyy4loht424dy4kl5dto8bi7aq9sgvac',
                flowReceiverParty: 'o6kpd7c5a5w4cyjv19lnud0z9f2kv7epvo75xtso76r0z5k7gsqrt3ru19shxfoyz0rrsw6rbpprwhtvqcic38bqxju2vs5wzoxx1ib5nabhaa4vjzd9yjarugxfrfezi25okk1ebl2v8stchw03mmjtla0a9azh',
                flowComponent: '6ye5xanq8g1bxtwwdg3cz6oi7nwa8ytpfd1pdsg0ty49d12olh56yublvzm173aszjlf7tn67xt9b6rplantpro7lu5t9sjdnr02l2pan9en8ngfnthn6kgge658qrfb552iflpocy8ocj2rea67z63d4b52u5xd',
                flowReceiverComponent: '93yg312o5hfnicd2sat19efa42z6fa6ptyj2f1ir5lyh40xl6f8yfqyf8o8uqi8tclpmblcrw9i8f7elo8g0suqzzqjt8yjj8ldvibdq8cejhegkgcj9rg9bmyz7eu2izdide40a2wd2hglrckjxr6zogklqyxbe',
                flowInterfaceName: 'h3e816e8avjg027k7yiab4kv2foeg0inii9s4caxloxqp0b0hio2hac3skt0w9szrfmf7xel7olmz5kkxz8ubl3lybf6q3rzx4vobrhel992nmf7jzm7elwmw6gdirg5rns2u26982c57tl36ib6ustm7sba3lbx',
                flowInterfaceNamespace: 'lpe6bgxnzs7judx0j7jf2djjd8tqd0edr50m2m7hpjp6odxhujr9wn9jwgvemrcoypnqj78mxlzc83xf3xm8mh29es4bnvlatvang72qm57ihbt3zif0fjdav2v8y6oixx94ty7yodgp6wqczffuaywvn3s8wdgv',
                status: 'WAITING',
                refMessageId: 'keo9m84gkdbrjh5oq260foh802vk3hd997cdld0mv0w45i2x47kj7nj9nfcm1xkyz7t7wq2lv12kuckjcn2905hzsc39ji9xd2fdnvxwmbknpiz6vht34wpxgmefl9wiilbwh2k8rbnvwauq4th9h5lms8nijhjk',
                detail: 'Earum et eum laudantium. Eius nobis sed est necessitatibus dignissimos et. Aut iure quas voluptatem non. Eaque amet veniam nostrum nihil omnis blanditiis. Sunt ut excepturi.',
                example: '1r2rmjapzw7ekspzxpzj2ghulyqgapzjsqiczyxyl51uaydogbmvsgyj6levspnmh18ophdw6uw1ko53x9nwwwzenn4s91v5h5qqmdsobo7ytpayznqnmodoryvzzge893wzrsf8o1r5wxngwh1s46zfrp5h7ubv',
                startTimeAt: '2020-10-22 06:37:36',
                direction: 'INBOUND',
                errorCategory: 't7bfe2zdz3cjqxmjxmdj902hm0z5jwns1k8gkrex89izady5enhwh1a25b5k6b9byvhu0m3udcroarzpu39f700cplbk6357z3gv3kk6y05mp06ekl5ks9ydy1r7q24vawoaeskva9s7t355d8t14zxdo7mc5bzw',
                errorCode: 'g2ywlyc1upy19d8hrhjvwi9lgb64lhzper25z6zhvh6a8ldbi6',
                errorLabel: 449617,
                node: 1696940549,
                protocol: 'htt4ggjcmnql8rqdnd0m',
                qualityOfService: 'd4wzck73zv24z17bda93',
                receiverParty: '4ma06agvnzvgk1c1tqrxym4vk5xbuo05rmphkhnwgbo0fr32ewqpm2kpq3mwdg8rk17ehpjop76hvbql1idoywrxzmum60dczt866o6ab3018arvv4xbau8pe4w83qd43s45jhl2ieptq2036dofis48gnyqlpmo',
                receiverComponent: '81pgdst2lw8vfg6vgu3m3638ezq2yhlj9fdygs0shklu35mb40a5hktabt2b2xrc3kmm9bbdiqygglaa0abmay1gacs93279px1gkxyql4v4wlob7nbzcewvpd6uz2bdd1cer83hb2zrfiv8034b90r9uo907zi4',
                receiverInterface: 'wqxmk6ta5iwomjkvtx19uoiawjbfvg28z48dpjs257we7rhqapqsp89033dg4ri9dj4j1135j6tokq9bmzj0zmvpl41ese1c0xu0nj683gy8cwyr90wj4umpbxsmj0kmt66zx36v26xjx91d7yjkc3task0ufpjr',
                receiverInterfaceNamespace: '9nnszypxvze628fumpyx41ze8gr86qutnr67itmoxvrbf1lqsml56ilawb6cj8mm53xl3z8w90047edr3n4lq074ie9jxvzzoftxykae4ez2qroqto1cjce7o6eozeo8yqrmifx41glq73u1jgn6tdt4t0abjn0v',
                retries: 7741542254,
                size: 5677645021,
                timesFailed: 6007727903,
                numberMax: 7416998109,
                numberDays: 96550902449,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'v3cje1l8l61ckogm5u615uhlnuww4huuk6exfyo3tw1frtfde7',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'qoe93av21q1bgwc8kgjz',
                scenario: '2beg09qz6lx0bnqe7h8gdix9fiqf42dq58i0blaqi7yd90xtp6u33ttwfl09',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 00:32:06',
                executionMonitoringStartAt: '2020-10-22 10:26:40',
                executionMonitoringEndAt: '2020-10-22 03:53:24',
                flowHash: 'vlsnttlc4fefscmqsnho0xm9popsv8a1lqhfb2o2',
                flowParty: 'mr7zg21ytfkywk6zom7jzqidphj95ks5jue9kfezbfq0o0wonzte506ge0hwty4jmwaehfb0hpndfyuh6sge8txe9fmbx6uzy3qvwutavkqre2o9q6afo9k4wb6utcdg69eqy2ieljf0zua0akc0nkb94wulhcnb',
                flowReceiverParty: 'hokfjf2g4fmiuhqp39vo25yg405cuee69c8zvxqdm9tf758xe9o47mr6du3vxbcteyi7n8jgbk3k3nn91svikdosf6cvqv38d93hh5vhj7xbso5pvmnhe2snaa29guqkbnefe5yrutko11zcv7dklsp84g8361b2',
                flowComponent: 'gvdy8khn9osxpc2u357ntu7ho439mignr5lxcm6hwqeu6ffetwnoix1f8dwxtdvfb3kkz85iyrealahgrtodvdslzde5nj0vgecrz99yxam8pswkfrnz9mqw7wpqxzcm0bjoaa0ycrkirysj4i9dhmcnzv8ma60k',
                flowReceiverComponent: 'h1dngj6lrex2afptguyvwerppyon2hvwjr78jxv9p01nju3aglri8apuxcvz5rm4syscx1vro87ukd5slkzjo6fzfa5nx74xb7ecejy5yq3t8unk2firmlzm4r04usyhoa9orzwjbqyqr7l33z79zryckl4xhzkj',
                flowInterfaceName: '3rwjswo073019cui6mun7hjtcsiuk6jjptzl2w4u7r2auzt1yecyvj8vqaubk7hi2qaw0kee20x0s4i9rtp7c1bomrv9a11wagpqvjwbks679uk7p7ql0x3g5yrhcy4i8xi9v5q5sktscgq7x17l1h74l1zbt5pz',
                flowInterfaceNamespace: '4n22cmvoz06n7o70plqtxcpt1scfj2q9mbhle8xnmfqeljv53x2p6zy0zcv2cq3w1c8g5c3upd52e9ajvixtek89sc012qdafrdgroo8xcsjqendf7wenkp2wtr34xurpjglvc298wyq9v2r4xktgd2418j1s57j',
                status: 'DELIVERING',
                refMessageId: 'zq13l5h6dqnpobmdb7p4viu7o4jc9hotz3x5iadldsghqnmy6rf1icuopmrky0wqsvykphprzz57ii7jsovb7jjoqvj8qv5otb08lcngngxipnpmqet44mcbtu8nheni73a2ittpw66endhsa1mhwd9hhwp3geoo',
                detail: 'Laborum explicabo sed eos voluptatum quia veniam ipsa aut. Explicabo dicta quasi quo consectetur aut nisi molestiae. Molestias vitae illo quo accusamus mollitia nihil voluptatem. Reprehenderit voluptatibus quas velit et. Sed eligendi reprehenderit porro voluptas aspernatur est vitae nulla.',
                example: '4uh5sxizj8xzw9vbh20aya5o0tv4v22jgaqn8oan9qm5p08jxrqlncawnduuxkyf5c3i3cpd3kanqxdqz2gofqb3vawhnc3jec3gu21bn6v0qivrwuv59u440b7m8940ih529n5x6oauu31rupb506v2dklhn5vz',
                startTimeAt: '2020-10-22 21:03:42',
                direction: 'OUTBOUND',
                errorCategory: '2n57lx1a5cpf6xajhustiisayj42cll1mnihx06txj5r4ldua7za2xftqe6xpi7jcpny0buy6rh4er53b5wjfouxnpcwis1awornny5od20ly2gcmoubznvp9jjza23m2m46ksaple51boyi5uubfyff990g5lvb',
                errorCode: '7xyqti5wlavrz31mie9e7zzjhl1k0ylqyh78aahzglzqr3q8rh',
                errorLabel: 892556,
                node: -9,
                protocol: 'av8lvlgfdufgmh4nhits',
                qualityOfService: 'nbu5xa0gwv4bswnlu1tt',
                receiverParty: '1v77b643yhhvmyn7qbjlay6brmav7vok019e1qgbucawtmvq2heyi1pn8yj26p5w4cudfheuk7v8cajnlpjb5werungtfah15jcujw47za4759q3yik37lxevktgt2oygrua8vpa1kltjtpyzfto4ueertl6ei3a',
                receiverComponent: 'bac9fmu8imlztah5fnei967ugkdj0lk1lanpmhrliun0rc3do3xxoi4z8ewn0em2slf7kzgj8sqn7cxjxks8hzbzg181d9tf93p990dn2207bdfcnnslnvlaiinci8zhscmqh3r74q82t6a00sfzollqgsqen24z',
                receiverInterface: 'xsdr2h14lua6y241dg0nt6cpwo7y5zo60r3pl7ozpydvixlsfmfb53p19o9dm1awhofv3yd6mea3r1dd5fitgfbcyitoeou5gyotxtdd032w591qi93kppsae1vz2vkci380ubm04tz1skm7snsos1zq60pfhi0l',
                receiverInterfaceNamespace: 'osvkg38ipsyvihorbegxbumh8ftkco9p3x93fhfipbwjtlbdq7xhhfkseljwhikurr4lwmgde4h08x79j2u34tgnuktpef6f4t6psipfmb6vniisk79pcgq4ylnrcld5gg524iee0u5aj7lf6atti7b2m0t3u9bn',
                retries: 5507309103,
                size: 4933626951,
                timesFailed: 7631159177,
                numberMax: 3839735702,
                numberDays: 1090824889,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'm54ahh61ew3r0rtxd466nfrvcoozriwhezi76088uiz92dho2n',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'db37i3pq9qf6uuvr1iac',
                scenario: 'kk5rad41zxulg452pn2nfb2ugwymzoy41wwd7hg77fbglsk687oggypib849',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 22:00:42',
                executionMonitoringStartAt: '2020-10-22 15:24:49',
                executionMonitoringEndAt: '2020-10-22 16:14:41',
                flowHash: '820zpqr6vi6hlvb9nbku534u4lwvumfk4r1ufxav',
                flowParty: '45s147082nyosp9whg04i6igdjge2gvtfincslbjri6k7eshesdese3kojvky8d5zjha22olpjln9w1bf1viewvd22gtt50tpzgbl7973sz1qbon8y624x6chf95t5gec1p5qvwbykh880rvp5opkypjgj18zkyc',
                flowReceiverParty: 'y7frcrl0vs9he41zfbiuvk86gj69r9jsb374o12qsni0qk43f5pdca5umcmgj6k0qgyre0dvxw7ainxkqwtp0p5zy15lu0bsdz5ga9uhvzwqxdhq7yb53sz4k5u6o3mz8q1yl6myqng3d6cuz3uaqshf1kny5t7w',
                flowComponent: '1tq0jh5j2a19n38nhawwnzpisuw9itc66zh6g4id3phmsr20vxal7w7vryes6bv9t766hc5dtvl3yqb2yug43ky9shsmy8shm150msr37e8cfpacd7zgtkm9btqchriqrl5ezdnm4bn01hzxfxowonwok6vk47h6',
                flowReceiverComponent: 'kxie208wgjuh33zondfur6k9qxshptkehvsre6mf3zspq13ecfq450q7bjfl0150b074gli1kll2vw8namqq47u5bklsrc6y8yt4lostwko1eg38o6pznhglcvjts20uon84wbyfbz6hgi8kzs4ugmvhre5dl8rw',
                flowInterfaceName: 'zvugimr8g13ytm7qziuhztuftxpo71lgi70tjoe1msratirfkl4okp6p1xr73f6vx9hc3apiy8y69oqnf4du2tydwfmpdgke4ur4kgx2fi1vmio342ileck5ggsengwiq0tcup6x0qj7vsl7a99gzmn7dxsk4mq4',
                flowInterfaceNamespace: 'g1dm96np8ek0q6t9swtv4tbonp988e76da6w0nweshk7gl5sqtn30szey02hf599u9tfx3npsq8kdqxcrh8kmsyhe0dg8gtoism3sj32k72wund6sejpj0td7s3xtm7a5gv6d2ekkytpngtguob0vl6cdlacwdjp',
                status: 'HOLDING',
                refMessageId: '499hnfzb6froed85piph6z5e3wzva1kf8uugapwq4qrnwwrjwy25dxsvt7u8nlewquil2uuva3qsodo58x9gdbmt0dztt9v9qvh5lf1z0blh0n48zbnvs192a1t3s0ciey4pw9vbralsa8n6l06gyjgrdlc7via0',
                detail: 'Vero omnis minus. Temporibus et quasi cum recusandae porro ipsum. Magni tenetur ipsa est commodi sunt est beatae. Facilis ut quia et qui atque sed soluta hic quis. Sint minima ut dolor perferendis.',
                example: '8czmb76886w7t1pr7zry1altixw22jyjm85cmzphf47fl4z565eubzexccrvpub2mevwsytb7vwskxk01uceosg65ctb0wapqnrlwnn01im8zopyk7941862go8x4wd2mtodomnm7c13a2zjzafvm1beexx9nxk7',
                startTimeAt: '2020-10-22 21:15:25',
                direction: 'INBOUND',
                errorCategory: 'to69byayf52rmk0xbnho2sftrzns62n4qliydr3a7pm2k8fctal0oagi1fyl1mafaw0r6dbyujr0csigp4vh1p4ehntudbjh088krobmxucb82yl04b6fkkd0z3eabqmke6wolc8ibmc33t7x7ow6c02hcqa77ah',
                errorCode: 'zz90dv21clw4m1sxth4r58in2lcvapxuvmgopmb6zta3rhbd1s',
                errorLabel: 784287,
                node: 4238556067,
                protocol: '5z5q7t0a1th1yamsjt11',
                qualityOfService: 'yk95ugp8renzurf9to17',
                receiverParty: 'xuc1dusipzo1t5uai5egjph0lt6wiqrf7vfv9ncbtkk2m4yzxjlhsk7wzwklbs4cl4cvflqz9tv4j0hedcgfhy3v89wweaoubmwyl9c9agg0lneytycqoiwx0o2fkswox7pc0rq2nccbhdsuwiqr588y30y6upb1',
                receiverComponent: 'gcpyn5r88iqsxhdaq4mwzxzyripk1vki7yr9rubcqvfel3zbrcr5t7cic053n7v688ungkan7gtjs5ycwzk8u52mm08yx0bsb0wimubbxwnvpuowfqoum9r1j3lkc00dg8p93cr6dts4dbbpeaa092ozwgnuz31i',
                receiverInterface: '6yqux171e5zy0arajjll8t2y6xlrbvjbjkmrvn7md9rygvv1jq5wnkd0sffkk0pkb7pln7neur8hnf4lj2cpzukrfjsbozuxj93erbclmt3jd4jd3i8q1xjxmifj0bh90j6j6c6xzbviw7jsz9r24p6g5uxq0kd3',
                receiverInterfaceNamespace: 'eef01lsiijiww15o4uul4ugjvxlpuyu3jpvh28w0cbiavrgtagj0suhzgsanhyv75y6u6y3qdpbzbmkzn3jlolnpqoie6xswx2ktnd20v2427xr5jisoawcaq9vqedacvzcconuyy1nx3pd6trfxh4pdvj0ui8om',
                retries: -9,
                size: 9271753924,
                timesFailed: 3651277764,
                numberMax: 8203096368,
                numberDays: 1164300872,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'lmf7xc2a8gh1us9cta938mdcpo71mjlq273kml18i6vh3xj64k',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'x7ed6ooauubccvdxtxqf',
                scenario: '61sumusaom9wksspjp5g37iuhwj70lk91yko7c2a0pdol7auxh2a0m746ok3',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 00:42:00',
                executionMonitoringStartAt: '2020-10-22 01:54:05',
                executionMonitoringEndAt: '2020-10-22 14:48:33',
                flowHash: 'knskevtoqzyhxkjxwdku8fsqh4mj2mby7282g5v7',
                flowParty: 'm07zbc8l78rtwwtl5ic7jrb8or0el3v2qfm2ucqghlk8jphx2n0kt2kg9qr5z2wvru279dxpljzjh7stnbsou52a7ukhiaos59m51229tn5wfnaqvlwsp4b8h8kyurpf7psnynvdcdf29qh2qmsksr8bokz7i4c0',
                flowReceiverParty: 'b3sb9xwdzwftse3chgkiyy24ua7mv5dqy9ym4oebstvf7l9qn2c4me12w923y3upzsarx8fq6pmj75ljymjnt6b2bvbyunwgrcr2gh18hda89buwg1n37k4lzj0sl94k2pi3n8tl8yee98jq941zqtnfon05ajvh',
                flowComponent: 'ufyf7h5n1m5hl7t4zfe5p0g215n3ylgf2t3bboi4hvkfsamyihkz4pykrm0cjo27d528nyfy27jrt4ah2lz5nu4v8pht6h03qtbh2f1mv3pp5znshebi907ilcoucqv1vsuj8nds1ifpcqpnslh6kqci8ht1t99c',
                flowReceiverComponent: 'et52n6ap911sqy1pg366mtwgupoygjar3g3e2wfx264tn5mnlaqwxuqyr9lehfozumj1r2gqopcfk7d3srv17zqsqknr3f5whbcct84s528fsctob10p3sbuwz3jjb8tvznice3ly4wz6yab95fl9w2dn272b348',
                flowInterfaceName: 'k4hkt1cem47ch8ca26oi90oqi4lngktdt3n081zm1e52o03s3q29tehubmj83cd7nmhiq9agznn4xuwl0ca9mwynk2en7mfyzeaglsi2j68gh9deey5w990j52r4gvkun7017eumrnfs52a7tjurietqs2gt99ls',
                flowInterfaceNamespace: 'lg3hh5o6c8c7cg56st9ambayww14h78gjw3ylrm4vbyjzzh7ib1brm0nhtmpx1yj7r3ccsojxa5evzivcr39tcrz9kw809acqvcbgav58sewdurfpecajw3tgjhhs0gwt7s18prlbpudw3or4shhrhcqzjry8cne',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'ixsit8cuncmr76b1fgzcd5tktnzojsce6phzdygxu1ua1ai3mu6ofd9ti53dj3i25ia3r2c3we4ztavln9gy755e7570uis0di5vnvfh7zjx9zy5anxia1udhef9wcfd6l0uy1o1sx2wuxd8qv1z6a0m5iddmxk6',
                detail: 'In earum sint molestiae. Aut eum quibusdam suscipit neque repellat libero quo et. Tenetur iure reiciendis voluptatem dolorem.',
                example: 'v25bv1ueenft6rze4kj1e65guygq6gbtocdnge97w0pi4s453ksn7zegimrjhgnz6a5hyziftrk1lmwnhbpafn0qq1enefsfknadwgc6d2y8yzatge2weeods032ejwyfoy1wrxgc4c519b5j7zmipf4ysogikvf',
                startTimeAt: '2020-10-22 13:54:42',
                direction: 'OUTBOUND',
                errorCategory: '1uju7kjncdeeoob7zfqqz9hm16p593e67i5xh2ntbe9kxl5o47dx7pslsedaw4v1jpdlm7mbiv8abmwmqjl72vvzqp77u573r1nkdfc5de4jaa3rc0ofp15xk0irtiszn4c9e68ga9eekj5iwgtwf1ox4v4apymk',
                errorCode: 'cpjgqm7653acw16idclmw1wpql5alwqiu2q02snxngw0u4szks',
                errorLabel: 433714,
                node: 7977105127,
                protocol: 't4v6uu32hshim65ivkkn',
                qualityOfService: 'x93vk6163lazzvw0n7bn',
                receiverParty: '6f4av19qbvjjgkyfu9mmo0whcsllfg2fvww7pbro0oz43cty82ztimp93z4qssibh4lnbrjlj71495qoutn6t41y6nd0ax2g8q9tj2kk6gfvxomczpag02rz4rlzn1v3ex9k7ekf30i0ybn1sx4vkn0tjxat2suk',
                receiverComponent: 'g8rhzgpclc1hipz3fyhmqhg9nwoucjzmih0hlz9kxviqhfvyesw17zwu2eviizlmuanz1mxjlj2x91u3my9389aupe1161tqau375lzfmc40t0pu4ekcrvpnt4u6bsvneecl3gmh7e7p6m1oitj8fwfojwdplsca',
                receiverInterface: 'lnz2xxw62xlav5dqhgavkwbf0h3j2n8hdaeoe8tgflvddf7oc2ppwe47efkjtl93na9sy28g41cbjgvx5mjsrpuvx5iooqqh6io4semkicvpwbkqyy87ipd2o6bapn817m82b2lrmdrdsgnrgmytfrdj7le351qr',
                receiverInterfaceNamespace: 'q4tmeh5bw6kx459ugydy8ycp9q0hxuqt99dtri3decirnhuadbg5p2el80o553ossqcxpn5o0w0mld49iztnhju9t1eh0otll0tny0gvt4esj3xe4ebyxzy8uqcm0l3nsulhvu7ylimr84p21bjnalo1c1qyhwq3',
                retries: 3240916594,
                size: -9,
                timesFailed: 1137848352,
                numberMax: 6892239865,
                numberDays: 7408191161,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '3yquwwsz8fe67n9makue72l6k7qdrwtkz9kbqvm2gk1o6e35y3',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'ujnajccgitalsfkcs4qt',
                scenario: 'ju7ceiavcegn8zay8tpx6mhgwtpy6nut5x2v312hd268wnnef8l2wi4rl676',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 05:42:37',
                executionMonitoringStartAt: '2020-10-22 17:51:30',
                executionMonitoringEndAt: '2020-10-22 16:27:39',
                flowHash: 'v3e7v64o3zvqt37ip30ixgjbys7nwv2h2rekwyj8',
                flowParty: 'pga787vqzaqc4q015868h0hqh1fadaprw762u6w4pjtkiztyn6atg8a1trke6dsum17g9l0b0jbhc2fgqmbby1lhjhsy6hqp7av1wff5tuphfrqfxiwqjen0xrlh9wd3pz4oh3vaobipmqkcz3zaedcg2j1g0dti',
                flowReceiverParty: 'btls16ft7t3hvdlb5wkti2l0rfqsso0a2xjey6oquv7dg07205g6yvsqkhgot6twrs6u9ieilxtr1poh9xlalbwl8up93o6ywf0121j76gha7jv60e0bp072w24nvooj65lgb0q6rimoybu1goxgv33r00gomkrt',
                flowComponent: '37bq2oppqdqbhmd0abzy5e5cd68et2zvu5kua5aixxcz071t5296jjqku37s3s2jclc5zqyfohw0xrhbnb6p3cu8hzgktieg0r1xale6atie3o5ci1kaiisluklr9qeuna68xeccbiwtpa71ijvfz10z9xol62rh',
                flowReceiverComponent: '8ng8voll0c0nv885a3g6oi17ylcbnvnagvkkd6glubcc50ztpvxckb2k77wb79ioxwxpbgs4wkvblj3frfy6is2c8azs33gopy7f81arl6pnrgcil1hut5aip8j775guyraj8sgtvkzn7ld5dcwc4sbd3x8vu2yo',
                flowInterfaceName: 'aez4444d0dvm31g8a9oypcfziti1izpyvhj116d2qtaoliotsnbtyfkfnu7u32x0q743dhy2u60951u0mb67y0guwdy2wy79wpburhtmnvrt6ai6fm11vozide3872kgw3ucsopreojwqsn4p3ehc2t8es4c4nlw',
                flowInterfaceNamespace: '66ggafl2v59lg4wqfqm7a4tb0m9wdhzsmb0vnad9sqbqb8pdoz0zt2i6h3ivofx0sfuvmcshwi2k74h4iwosacigf75xry8l1vemx2xooprrr42w4p7x2bmy2co1dwpxif6wfetqa03foi0tfrtqfdowycpnanxz',
                status: 'DELIVERING',
                refMessageId: '3c4pdlfby351t3t3th589ksgoimz83ih3ujvcavjdx98v7fwnrnv5pr491o8v2oor3vupprt52t6dyicrecuavfmxk7l06gsrmnflc6ed974v9pwco5yhw317sshyuhscm51ulfno3k7er5yam1b0mt93v986yjn',
                detail: 'Placeat inventore odit ea. Rem perferendis praesentium voluptas sequi blanditiis est cumque. Dolorum qui accusantium optio nisi quos odio sit ut.',
                example: 'cxfchxfma7kp737ctpu122j3kxbq1ia6jktnauoji3qv2u304sxfmeunnrd9yeixte7hnhtt0nh9m2q5v1sa2jspvx4rpwbiuoa44p3e95a0snic1fvgqnawkw1fhd9wh8tlylsrzs3ipm86nh13i1a8y6k9j7c0',
                startTimeAt: '2020-10-22 09:39:09',
                direction: 'INBOUND',
                errorCategory: 'jxu7qhcxbfq50zd09i0b74r1f0zgbjin7hae1zdldlcc77g3mxdxpcrizv2ryzoha3vetbxatrydl7hjpv43r9bpq3yxce1pr6tfdl4bxge9smsk990ivl0akzr6odb0yzlvuz0108ix3m1fvnz0pjfg67nes56i',
                errorCode: 's4e7kz0pr3rqcfq0pqqkagxb6lqtovmw0waeabc6aoarsrc127',
                errorLabel: 316475,
                node: 2053765251,
                protocol: 'nvx65zd63gbvte6wg082',
                qualityOfService: '7hrbt7756y3709gxs6r5',
                receiverParty: 'rz7a441ia16rqhg4m2vn28d53drzb5i5pqd0kikyk68di2zlmpmn4mq7wyxaskhi3xb1o0wf1pp232qna2m5zh7v7i1l7sgqrq8czuiu1xn8st08y925p7p72qoebfspw3cqxzxagcv2rqil3a9e55b2jddkoemq',
                receiverComponent: 'munrkj0f6o7600t11opwq2sz0jjhtaiwyjolohwz01dmzf35t1tpm3c8dnvsypweq8hkcb0zyucagqgvknjsajet9p62l61zbrbo5ctsx78cz7q67lf9u9c97h66r4u4qv4eo5f45n2ewguse8hpsxr5b7vrl5k8',
                receiverInterface: 'h818m7upzvpdzf7akon2tf2g2zwh3801dg8l10h47mxrv6wk3vjiuj79yovuzdr5ml63bcbcbyny6tveelj67lp9khtkmafq9ugo0lrgkhpkd2svxjhi3bjdg27byl81ef05hwg6e5jw77mo0n0wga6njxh9akc7',
                receiverInterfaceNamespace: '77ujumvh2wya8k3y5sl2mrp9pr99rzw1tfj8992jh0kml3108cuusuk68l1ospo02cncwv5i5ihs9f41g1issz539j8gp4itaq79j7nlbijaky92tgb9alnwswdqwd4mb45k5p4a40remj8f6rvix43asvju8orm',
                retries: 3241782917,
                size: 7613928980,
                timesFailed: -9,
                numberMax: 7130605173,
                numberDays: 8351787670,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'kjddkxkgg1orz2ets9r5f1ji674l0vnjgrtdot0vl83farr7ei',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '5x6dpzzbedx1aq2px00c',
                scenario: '8pwozsyt9oedn7je3a44ht0ddbji210hz94ir3x1djj2y52v4lyc96qtxu6a',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 12:59:13',
                executionMonitoringStartAt: '2020-10-22 12:08:55',
                executionMonitoringEndAt: '2020-10-22 19:47:58',
                flowHash: 'xghyfiv0gr6u8cezmulnd8t7nawvyykcstbrs9ba',
                flowParty: '0kh2ny3617l1db6uytf6zbykex56mtdr6fcapsdtvgnze7a0gh1kpwv3entosjcnemazgf3nq8hx8s1iwbreudn6a99vbmit8fs5az23oonbmvg2r6ntuvp0pr9qp2nrhofe5krk21a7whqp4h8fsxtbqwhn3jsk',
                flowReceiverParty: 'us3lwvhipmgwkme1nijcsrex868a6lhh4mcdu10u60j26iictven53vknkbprklg8zt0guhcau2b47ibjy0f9pu9rkk6wdrfiatcen6focx2zmfjblsnlk9ie7z1vrxymsbgnfis7h61s140l5zjk9mwuucj4vx8',
                flowComponent: 'yq4aarkek1ymxzsv2mm8wh5n5u7aze10zt427pp53m47b88xqzj7udjnrajutgvtgmm2qou1f0moz553hu0qw73efoxqinf936abpv1wtya2x0wrndx95guwlbs0j80782uaidwqpmodmdnxhikmstxwag9buvwc',
                flowReceiverComponent: 'karqn273jo72x4copue128bswf7qscbgkvn0hlupujehmbjykje8w7m8b66zcf9a8s5ydqoa49rphvq2u7g1g4x4yogrgsue9f7yf2eip6pp9mw0l5wgwbaidoq759esqzzmch95o2xr0537b58pk8qvw5tvfzoo',
                flowInterfaceName: '0fdhz7wvmttcvov2667sel0z8reol625rl9149ssjz2bjzzwk51vhn2w9guuijckplg4veyo2dh9wli2sp0i57he8zrvkgrxg18hhkll7mdyo8jobyzdmz9ncuq802omje4fdhqclsmijr7665a0p86oneg01p5r',
                flowInterfaceNamespace: 'bnebbfmlngttvaviqsxor44df6906oog5gpcgnyhtwruegj7p3kq57jhhrdtx2jymw6m2robqt04of3133b1wwlyc12h38yc2z9m7dhngl8w1csbxdjm9ogn45ifuvdwnpf8bkmjat8fhuoics56yytb7dkuwtpd',
                status: 'CANCELLED',
                refMessageId: 'ejdihoc5ar1fhmywjp5ejx8imfxzyk3swmltugva0lz3i4p49ykllul20g5m45o60tykreffljaxzeyjvnhywqoossnc0l9jbn7k8u8bf0ghlhb4x8bj2kpm7f2itug3309blks9wl88shsk3053g7cfykayfxe7',
                detail: 'Corporis amet optio in. Atque et unde ex quibusdam sit velit corrupti. Voluptas ut eius harum quia quo et.',
                example: 'xpzrw1955nsxzv708gj2t8etp4ws6556mpxlkvgfmiwn68aw4897z6vmlyb99kph4x08z89tjlaqpudqdkr7iokzh0a4ozy6caxify4eps3ywpn4muvrc1hrl5lrb78si20qfctw37bt11i8hi17pk8jna06wor8',
                startTimeAt: '2020-10-22 17:00:09',
                direction: 'INBOUND',
                errorCategory: 'wln2xhulbi8xiq50u1wops1prmf155l99sujkcrwgmna320f9hr6qq4hu1awg1hmcu0yoelhzjja8fio07lek2593alse1byhj8s6oh2vvqyyys739rxhwxmxo5dwnok5kjrx5tmbdshf9adz6uweko94qikmsaq',
                errorCode: '24o0e8p36msl9q5svz71b96d07qzpdjdmnus5109km3nu4k62i',
                errorLabel: 257298,
                node: 7104716134,
                protocol: 'indj12ofjtsiex4jwjmo',
                qualityOfService: 'uvaf90z8d78hfeflza6d',
                receiverParty: '2n87sv1tawv1jdmrwegomphhj6v6hqs8lmzymn4ba6wj0ecxp4e9ry9zqbr9gap791dt1dur2xpy76ka1op4nujyx8eyxlw6er22rxbikrol3zglh2w6k5vzil9vymj8pbrgsfue5bgdjpobped1ootlapdxsf9r',
                receiverComponent: 'efwxl0eoqonys2pgvcvdc8ruquzlngvsinr01j530dq4wgmkrm3ba1lywh5q1s9zq2ezcinbpcowasq91mhc0cmfhzpxcnvn8gslrequdszbzx7dxaliyacau2y2u8f7kdftmqvdwq3o3agomsbs9pz24xdts7yj',
                receiverInterface: '7cj0ixzmoqa6p5i7ddoxloet3ndh65iywfh3kki9j694upu4m6g68jepolb49cuj3hu2nalgy3gunyt81ovgx2wzysmnxxjuwtsj18nsumkruk2g251v2o3cqf50w8prjjttjvikzgp61752taom58nnqdagz7fb',
                receiverInterfaceNamespace: 'xrmfl3llcqtzow611ypc6dludwmcikw98gfiy26agzqgmojbeq8uaxvxu3w5dj41c7oersxdyilxkwyug7ooecz9br7bzdfbxn46ms3kyyrunl47cfk7ygsvyxg8xcf8qlxhl5l65szxuecrjyxplv93qlu8nkbr',
                retries: 2709353237,
                size: 1856781803,
                timesFailed: 5126737748,
                numberMax: -9,
                numberDays: 6959030260,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '2s3b7vfqh51kyulxcceutw3sc4t0vtdcqjngi9feb7394j2nn0',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'jujlqjrvxa1ampaz51az',
                scenario: '8l4wu8eqthrg6eghnl4s4i6be9ftc2rpsx4816oqgjvij5hhb1d67uust9e4',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 22:33:45',
                executionMonitoringStartAt: '2020-10-22 11:11:25',
                executionMonitoringEndAt: '2020-10-22 21:54:27',
                flowHash: 'gze0yaqjar7jnd3msszlao7ohilji5n6gpkj4flp',
                flowParty: 'lg3olibjwr2qiimtssc50n571e3d52tj4yv8o61b0yf8g5zjoyd4etl4a0d2ursowv7qn202o6xeyldg7wbirr55hka5mkf1hpmu5maufjm3w2rlc2migu6g0buan3ljab71ch3tvdu5c6bzjkksmnz4cjaatq7k',
                flowReceiverParty: '9e7yrxdamztda1af1a572ip0wyv8r54id5mevwsfftovrgun92l0ba5aie2vhx65tukzf0z5hq53ndneze9lg5tg9yvc04wtpw9n7dhh539sub562noo4ms8kcbp2kokn9ofrlokdz0cns0szv4d9wg8dck3d7nz',
                flowComponent: 'uzila16hkbmf0xxskegmo09umozgc7oqu5wjigq7mz2u659niw8ocyk9jegq9i3d5au3fgd7jfq1ksquqk70n8jk3rzgdr749vc29ykv7wyeqr5r9ri8zsdi8lc8buxjw5kyfbrnpi8lb9gxo8eub5v289gl5kaa',
                flowReceiverComponent: '3rghkpxqfaa0r3r11hn9j4pymklkjoh68xng6xhv5gqxrypjaogcg3gsk4gfxjppnfq7oub65mfgzkyxwjllcnh1vpfovmrj5o6lckgcc2927vmsbulblv6ux1ffdmpoijne04gvqx3hr33l1rl4dlzn2zr739jg',
                flowInterfaceName: 'aqvwg6muuhmhm6o1tvk89i4glyn8b4w0ppyuewxfxd4480oc7nt5e1nji5vn9q1nidmqks9xpbfob05oz3oeicu8188s05zmmi9r3n2tpke2nlzagh0qhe3a29a5a92xfq1vrxi72m7mgn236qnt1t89qkjd5rdw',
                flowInterfaceNamespace: 'nyoezk7t9fqt0meu81i0040gdt5szbrvnjfb9jujqh0e89y3lb0f6lco1bpevkuvgrtm78jrnf4imh1ozr0xuz4eovzu8g4uvrh1lomghtaojzy9mjkv1v0qllp57m6khx2edi8ktjcj9kdpwjdjxjhdjrnh8fio',
                status: 'HOLDING',
                refMessageId: 'vvxzak6ons2kqor7ofhjjwr4rjm15447tvhx5on857vc34u99saovqsrlbbmn1gqcpq1emqy7qjc4ujnbq44xi1nm0k7nhtmd34e0z14b5c1la03hqnclr9ibxtdnyasplvmfwy0mi6yjsmrkzxwhd21l9f6ehqb',
                detail: 'Perferendis quia dignissimos qui minus quibusdam sunt hic maiores magni. Nisi vel ut veniam qui. Vel assumenda amet iste sed est ad. Suscipit consequuntur optio expedita earum iusto quam nesciunt. Sunt quibusdam expedita ullam earum voluptatem ut architecto qui recusandae. Eum unde tenetur ut doloribus.',
                example: 'zebq1def21k97p9j4r3dfnuxdzgmxzmzyocqi6a3wwoen9x78kba5sytnqzylj5xji94ni0f32rb5s9izk5hx2z3lzblkk7bgk3du9iq09imoj8twheqmtpgxl7mr0ub1i0elcn04ps2acc88bqasasffyoe2ic4',
                startTimeAt: '2020-10-22 11:33:24',
                direction: 'OUTBOUND',
                errorCategory: 'ixhtl3l0rolpmus7e9pc02ecsvevkea1tok47r2ct4tawx5s75yhhqoyizpfft04uj33emtkxhjqrtavpfu7odwjhj0gk5m8bltcuiy621intbe3wszgs2rf7lb04b2bcm31zjwbsqbah157ffpvhpjf9lv13604',
                errorCode: 'bvbmxh9i3xz89dyccl20mjwy75mp036xnvrsoj00d7b2okfqbr',
                errorLabel: 357613,
                node: 2624114284,
                protocol: '4uu7t9x71173voni9hx7',
                qualityOfService: '18kj0lgh9spj4zy1hjjq',
                receiverParty: '9znmbwblzrwgo4e9jf3mrmj26q3bvil8ol4dfg5w0gmt0r7aevgymhlz3uyfcfaun2o0fzsnte9p66j2j3vzsi7apyyn5a66p0ig4vsti45z56432m18695qhmdtrq2x8j9ncunmqu9pey1xddhfvebrs9ppm3f5',
                receiverComponent: 'i1sx8yq9oufouhvod71icfpyv0pdj2vtv3jgtebjjgprb1qwthlbsbcz2k9pqiz6vhrp8lwlorkcomhuc7yoww7211zil3sq72q05tkx3hlk2vt8j6vptdcjcvgx4ch669r9j80v24kjh910a4sswgzoboqabiv3',
                receiverInterface: 'sut8e00fnz3qwnnhkebunx4qkk513c7uftwishcedhl9oi3fm6xxmey9z3vuxu8ydo9cwt9txtsolqrko21sp0wlrm35tdzi96l84siusk8um3gsjx4lehcyaxaauw2b607nixyf29tw52dawddisoklexmktv3p',
                receiverInterfaceNamespace: 'udroe7x7l17djupyag8n6azgvkll7h4e0u6r1tns0qdjn3cmzjadqti9wnyokx56xrzztu5u2jdpnh650p21890avei3w8nifctor1y4h4e1ereuyfhg43d1vdotfila0wbl9pb2gqqw93n1xe3jsz7qqwdm2mvz',
                retries: 7318469939,
                size: 2561017424,
                timesFailed: 8347178075,
                numberMax: 1626876156,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '8f7e4cbhrq0os35864yzw9752izs31hegwbgznmzykow6bl9y5',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'kn5syn0c0qby35fwrq9s',
                scenario: 'vmzm6gd7yhlnsbv2427nb28j2icie9vhaan38vuo9z38ajjahcqc9vmf72o2',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'XXXX',
                executionExecutedAt: '2020-10-22 02:44:06',
                executionMonitoringStartAt: '2020-10-22 16:24:09',
                executionMonitoringEndAt: '2020-10-22 18:30:02',
                flowHash: 'nv4k0imlsuur03bpnpan0qv0eefo4jxybfkw5n83',
                flowParty: 't3tzliqn5ra51a0a24oexj45s7p1fav295xppcquuop5qflrwlo3tf08ozkvt7ubrb1m9tm3cvdix8gkuzraatekan6pgcs1y420uxboc0ahu2l8q5stw2xi29q5hp5b323gwo4z21nhg437ht53socae0o06kaa',
                flowReceiverParty: 'll7zq1gmlv9lwihrlgsssirmns8hyead7kd17vn58m4r2hg0io88edqzq0n0ml510o8cg0n69ijgmx3vdn6j90nmng2qotx64xq93663dfuo4z76mytdbv82aou4f5n0k3rc6n5ilma8f2z9xue65jjsvuy2eep9',
                flowComponent: '99wemmupso40fhmoi8vto5hbla8z8y3ra6e9dl0dc1n40jzyd4lqpr1cwsagu9doghgbndnk9u2jgi8242pher8u0tm3hmtobhl75zift69qehi4sttim8y6gfm2r4x128rk84xby8utvffl1ox2nktqclkr3rva',
                flowReceiverComponent: 's0ay2tga86xh6cbu0kz92dazu7y9a62nc5y0mvg3pcb0n5siio2yix30umsxxtpqsyttuf5j9t4852l5tyd5fba0py8x40r8ea5l3b2pq212jydus16dd0f1aoddrcseqz9x3jqhfir7nr7t1gctj9cae58k43r0',
                flowInterfaceName: 'qwl1znlb6e4mnwum3k4igoc50ar6pxdw2mp2j9cu00p2p8y380wvbga3s9oyaos01tx79a0m5lx42dhc7jmez25opknoisbxuqfuk0fe0tjly5ug3iy3refcq86vemag7lnml8qak0l277gcmhu31ad3yw6tt3nw',
                flowInterfaceNamespace: '99p4n5uvdlrqnw7tq20l5ylbmvq10pvkx4j3eeo14rpyjtyjswos0mmrsbrtlgvl4zfbm3kvc0teprambbuvrqtl1frsxhey6yyx8bsdeoyimgadsf97wmmrmnrm0iuou39odnl89y4coqtt5e3gq8t4v75cgu1o',
                status: 'SUCCESS',
                refMessageId: '7z6agkr1pk1ou46yhag6pxuey9rkqwh0q6968rvc6p7ewaga4jj725zbtmw6b5ujnv57k031hnamni14l70jlk89o8h68m6id0nf9d3xlrf4wjt5v04j74h7doregybogm3dcsxxqzbt9jeydirqos7r8fbudjjw',
                detail: 'Dolore saepe iusto qui a ratione ut temporibus est aut. Deleniti dolorum alias voluptas necessitatibus est quia eveniet magni. Sit ipsa nulla dignissimos magnam ab sequi non.',
                example: 'sdjaxxlmku6g96phq07nkiin0704ai6bxu2k5h1a4ph84mutx9ycr6rikwgdv3h066y1ixfal6ji24dvcslg2hj4kzq27zjjmhdim3meo73kpdqh9ee16thpuurkyy077xr3dgxd0scktup5syfe9tyqbnvfsqpi',
                startTimeAt: '2020-10-22 18:02:13',
                direction: 'OUTBOUND',
                errorCategory: 'rznec36wb36b5imi7wnme3p8ds11m87yn0fxzyuxqvjslybuqkq4k1dkhxch5rzm7h2z93b7wfnkx795myx21dnkpqjg40q79w992d6qflmfbmrcbb4evad02u4jc17sd3yi4bdip5jfy4lrax1p10e4lb6epfeb',
                errorCode: 'ymsevjxuq8tl2x66hglh4z6vfkwf2bmudrvo0ugl9bpvjabck1',
                errorLabel: 968113,
                node: 6845417218,
                protocol: 'eqvs39gotnew2yzj51og',
                qualityOfService: 'dign2kw8tzktn80k4ga6',
                receiverParty: 'yt48ugfqwr4m47alc7ustotpmrko9rhf4nc3nrd1e8xxkaw3bkp0fjnq21emrma7y5ktkqwbgbibsbqp4p47kg6b48e6yuur1hzcnwvpm0zatan8jjdf8sp1ldrj4ekopjnr78eozszj9rxb43lggck7lmddzj5i',
                receiverComponent: '43fad6rwi00337uxte835012h9q33702xrc489e9s30c3h9ufnbwn63bkfjiv99przhr0oiry7qba390azpaj8eup2xi878ik3m3oqsnwn8ya9zk1op7l7hqvzmd8gdbx7tmpykd4bsxfl7tvsleln5b31ymwt8l',
                receiverInterface: '5jw9f8e2m6701g5z1441o6t7fdxh4o3qok3f8e18ntsjhcnnm84yas4slewgik70h5h9bwmdcebzyniisi8u4eq6nn6n1cak4ganwfscvn9zfxj0jtevvm0b5rryoj3kndmkhs7r6j7t121e040ifecm1vyza57c',
                receiverInterfaceNamespace: 'sewu67gshmai3cdah5mn54hccf67r83wlz0gw70c8l3p8pw7ijjecuffd5epztlzapqwwg1da7dbjpo713v34p1rq65h8hof5x5lb5knlhjj8oxdr1coieuc6npeiv4d5a8u4xct97r3vv9tnun5tm0aldtmvcdf',
                retries: 9716219768,
                size: 2859180040,
                timesFailed: 6517070456,
                numberMax: 1596239745,
                numberDays: 7077113288,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'treehc4haxn7iedqaqt3b0zrspjxfryejhqu5ae8g5rq6213uw',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'p66xd3nqwinb9mzrjzk3',
                scenario: 'k6bivmrje6byp7vysmlj4pwftru00ccm16e96ehijvjs938ilpfibdo51b88',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 17:35:57',
                executionMonitoringStartAt: '2020-10-22 06:05:04',
                executionMonitoringEndAt: '2020-10-22 12:27:45',
                flowHash: 'pint2d03zrk4pucilgwctl66ie4844zwskcbse6a',
                flowParty: 'rc2698tg4qi7opuyl07gl96hisdtb0wgbylpcuzw25htt4pcgxm289k156hre1hgyvrz1t32k5jyt7rpbexcq1oihgfhr2zd6kuv2bpt4bdo8kq00mv94ah7cq6h2r9bdn8rv9bci2lju48hfp2h5w6luy1e4z8f',
                flowReceiverParty: 'nvnlrg0mntasei5odwi3ctm5f0fsjg3c7z58zkogxcxyy6nfx4uu2anycpgdrzfnk7zpojfnat92uv3t5h3i3igfpk8si6d0gixq4el68cgenjb7ve9ytlhvcel1m1n5gf7wa7aai1dnbl5l5gvn4tprjx36jd13',
                flowComponent: 'mmryl5ylrg4fvfwooykpjbeexb6584lkcexqudu3lu0sojkep5wlaognji1i22ztihm6jv188ms3vla8y60gs5iyzn8ui18f1oa6h1b4zypjqlg9pcxe82yw2ts74fxjc5byfb8s6p51xfk8j7o57xbwhdo8pvjc',
                flowReceiverComponent: '1dh4trmfq3j2ndjsxvslrmvp02znyb093kcyxb2tkph7njr1g66mux050w9ph2xxlaxfqkwhaw7i86e8tuo6mz7ohwpjt9t6guv1x3pze2yvmfsdu9ee3855uqczyhu7eygf7g1vj64282evxtej089zvkc6zzb7',
                flowInterfaceName: 'yen5d3jyz9r0z3tn7ra89bzovmuosrqy5w8vomi5rxtsk4evuw92a6ea7q88k9ywq6t9sjmhpoubp868pjz97gnbsabzg1gazxn0pf0xie5jgnxwfioip1cv87koz0l3keigt1e3zgipsex0dvvnvewwmpadvxiy',
                flowInterfaceNamespace: 'rt9zmu4pkfu9r4krwk4j63bckklrboklp9rrhnj7uzvt9v1pdxna74tgc5gpyih37l3w4xeoasg57s13hixmzz9cukv24vhnnh7c4k4pv760n67t3gb7nuui03xzfdfdcyrvinvpjwchyeowb8iimlahsy8e73ru',
                status: 'XXXX',
                refMessageId: '7ghpj3cxq25i4l435qxxlndm16uehyyknfmx8y22xwqgr5byqz8j14of2sd7hsivhcpjb0zwhmlplwiuaee905rzq71d6opddv8m1evmbyr8k6x47l159omoa4r972oe8yleo6epqi1dhe78g9kfwv3hutp4x5g0',
                detail: 'Asperiores doloremque et libero quas id nisi sit est quidem. Earum qui et sint et doloremque dolores omnis enim. Omnis dolor est mollitia pariatur enim repellat.',
                example: 'fthagnutd6x3q7xcvgl6hvdy85e7w741bk2iq5rgw1prw5quray8e8s0gan0o1zh0lrn1c1gwwwpyu5t4tk2tmyhdi5b076oovwkbl5msc1ni3ye910phhobrt5bn43z08l1v7wjejnj8f97p53sqrkpbs6p4f95',
                startTimeAt: '2020-10-22 16:07:30',
                direction: 'INBOUND',
                errorCategory: 'rpepjj4sz7dl32pa1s2r1jvod7jce9dmkiwbohsz5c0z17jumeqllalpn6fvlm18v0r5kznnz7wifvxp8l4s66vqu0mi4uvql8xscgqfom2fqk7gch6rusgsfu2sugz2xkz0jnp3zrffoqgrf8qjr9kbpbh0cexv',
                errorCode: '1q0q5vach2auhd8ptcymbdxdsy2ldgka8946wfixphg5y4d3fs',
                errorLabel: 597473,
                node: 8039172378,
                protocol: '9qp5o5acn2rge4871ex4',
                qualityOfService: 'fqjdbvzaifb3yqb27ir5',
                receiverParty: 'p5hlftijji19pa5i2rqh3fz7l0pugpj429notqfc9qnxkrtpotylj4cnc3nyd9n50iqwzidftna5t6oqqpt9ftkeudcic8ynt3e8shvxfzf39zc16zh15x5stzdsiu3cetij0v406vwkea6jajj74hdxa8xxgobp',
                receiverComponent: 'h4c4z173sqbf4cqtjbpdyqwh0segg6pmsusvb6g3epgxq2u5r27gfvt0o6w4w1r2lfgd36he8mcrr3hjkr9oia53zph819lnxwaiuewflgtbduthpafo4snyqwxd6o6j46s31qmbrdg5lcs1wxf63qsqbiamavzk',
                receiverInterface: 'rahucrlxq82r4to7iu3laxuf1p81ubsx9gq69uva7j4izrz0n2r7ygrponxje4uh7mgofigtq62xyog0fx7krbi18n4x6wreqgo991ewke00cj2tb8di3oiz30qip9iqcxqvwxyvjrp7f8fw48h978ukn38x6rml',
                receiverInterfaceNamespace: 'fz6rn5entikjpzn0k1qjc1nxmbxa7ne1mmuquheaqv0pvk1av92r0e7p2oai86sdldfwg5bc244dvmabzqy41louja4jugdil1wgy1m0dylvt1zubwvspxyl2b6u03q3enh2c82rwr3u4tjuh1vc3jpfogue1n8c',
                retries: 2285773088,
                size: 9069512763,
                timesFailed: 8487416597,
                numberMax: 9512037261,
                numberDays: 6223351749,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'forzs0xdjmaufkif03tylw93fva5ozdoxsbxiay92le2m9ctrz',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '8n17gqfz6s88kp910kqp',
                scenario: 'vayul7l45ym5qd9mtxhtjoyw0kgxstr5a9r51dvbbweqtw9v2kjy2rdswddg',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 08:11:06',
                executionMonitoringStartAt: '2020-10-22 03:27:36',
                executionMonitoringEndAt: '2020-10-22 15:06:19',
                flowHash: '2dlvt7y8fmjvisq9g83et9kw0zw0qbcipzadnwpl',
                flowParty: 'i16giu1890s0zcwe5usavu5pofb6rdzrz4n49kvsny762bzgfiinz87enzbdub69flg7cbw0cmvpzbjl2rz21km7nhubhutwp3zptv6zqg5bailezni5tbq6tsiue7r2gwbzg01zafutuw081jrkl8bo8u5m23pj',
                flowReceiverParty: 't6f3hqocvwkckfwdgonyfkptv0g345jd0ncpsedmlvs3wr19tky1anetiarv1b77li92odonecb2lf2nmvw8u8pezxwuqe7l84oo80c5h7hghlm471imocs1ruluo3h4y1rb3mo3ryyjca13lun0waa7w36ov1iz',
                flowComponent: '5kst4he9liaqxkuy6jbbnkfnk4i9ou42t6q2tvdle7wqygy86b4nxp53i9sazgu8z5c694t7vhbhswh1rqq2e0hr00vp0g5ilqc8wsmtxnmrh92fn47n4t56umlzgsi2s8gm1g1vtr1pqgd8vgg8vyuge95bdsxo',
                flowReceiverComponent: '7pluw01jmxwyqwpiclnfd2yredezrd2377gtujgqqf0zrcnwef3r2oxtx6ntydgrlyz6cipcd6oczk314e3987g1e2gj7ftvwpqqkd5x4sekyu4mrufjdepm23wqq3eicvc18a2ob6g4vzswpjflzvppjiskt4f5',
                flowInterfaceName: '6x0681c1wujbre6riwqz6ii2btuvoybnjlq9i1v85ee0swt8yritw43wqyfzfdhbswlenbd2ae51aq8h0thnr897hwm0bp3muy8gi51zselh2j1jzg1uk20g8s6qlova9grgwi7z2oy1ed9wynrzuaus0g4dwdaa',
                flowInterfaceNamespace: 'a9upwgf6b2lz7c927egcd9q09lzwdcvqio2lilwu9deok2tt2mo36gk79gtkokppdgq8bovhhfp5ftbn1lertx8949st0vtvcvzkkedvbbwrccvm5jf0dvfo0hpftb8fu6mwd6uaoy9tt43f3jgnxmmyo9xn8l83',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'v8ibp6g87jur4po7toza0vk1hzwg947n14zxg18mlu3uynrmrl77fhz1jzo543vjwxop0obbmf4ls2rnskumdtel1pnsqk3dz9l0qb5ezz98dz51c0eifrevmrha7gzgk8wzu76tne9o4kk6r7ujpj46emctlwog',
                detail: 'Dolorum itaque cumque eveniet repellendus tempore consequatur aliquid. Autem quidem velit dignissimos unde inventore sed rerum in. Atque sed aut. Veritatis reiciendis ut non voluptatem alias sit.',
                example: 'tcemmf5s1izrbphdonjf9ozyd4m7mmgifg3ze2j8l11uddd5o37nkjm0bfairgo3uirko754xys31kkvc4wsv2873nyzug2awtbos1sq8jn0u3a798pxem2j8piqcv7aw813zztns5mkfk1mkacy1cjs5omeyouz',
                startTimeAt: '2020-10-22 05:22:07',
                direction: 'XXXX',
                errorCategory: 'xzkqr0mkzytlkuq99xe56p9aavdwed1drt6lqzor9gyfvf829l5chb5sop6n4ocs416aki4c9kw0gib0a6ug3suky1tiwwxb9nybnpa62kz99iap88nl17f3lhmzjspakz8917xvzlw200gie76r5gfhnka1pc5p',
                errorCode: 'aqwnqi6qzuiy066hqakk1ivp3o2gmu7nonn965jml5vj9tqvkw',
                errorLabel: 848919,
                node: 9885956439,
                protocol: '3ffntlq8kih6d74bwyo6',
                qualityOfService: 'va28lhy0do69havijlga',
                receiverParty: 'wz53hypvq99plmdosnqzraenp7gvlqt512n7qhvuybqad94m6kjanpbc2vsiz520j6bb5hzis4na8x7rie6g3wpjjaktjx3q95vmaipeed1bme7jzdmczqvd5tk55ih4yjvrpb2vz2khkpyd0oi7x5krmn5spjpl',
                receiverComponent: 'pbvmmfrcmwol7l1vyn8ohgwcfeh98prhklgurpinxssg4tnks7ulp36048kwccyolkrv14gia14fwhe0kfjn6glzajf71in16xir4tmi7geh7k1yqzwdgz0zrsg2pju8h6ghazytz6fhhbrvymlv7smbwvb6vmlr',
                receiverInterface: 'cxjczdquy1esf8lx8cglvcl8gwzvvgj6ygp2dz9m1hihaffw5mhpe48khdo0xsfmm6ddug6fdgq731ifx7b9tymmedlvpaq4tac2m9a466linmjc7mu0lbk9ovb21kpzut22pifpj3bxymrrxf9bsfp7mtez27xp',
                receiverInterfaceNamespace: 'luvotbrsycjha6htqh5pyeurbj58glm3xtls6i12anytr8k1vk2no96z0o5olel5sb9deb7z5v3e86p77sbph234tk3lagecmudssu52x2lln5k98n0olhqzov2vh0wuy3lqjou2zlldfma2hvtp4186axg83e2e',
                retries: 8607424914,
                size: 4506237566,
                timesFailed: 7732281346,
                numberMax: 2181875694,
                numberDays: 1497811089,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'ax2t3pbhjsfz1d0v8q4moime4cu99f8idbopt9mdduljk72dyy',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: '0a8tdd5oaffjkf4gjktz',
                scenario: 'd2ne4h9nfm8gy2q8l3gb1y5r6byuywsn6bfayx2sdk43n1pdowzlv3di146t',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-10-22 15:35:57',
                executionMonitoringEndAt: '2020-10-22 07:22:32',
                flowHash: '7u3sqtuxdpjd4yyyzvd2nb8fmjl42ubfstgfcbfo',
                flowParty: 'om2jlk2gjvd3vicmf0q9h0p3siri4vcfcj1an0crxx63w6ipe3oklfgv0yjw472yj71f7bpj6hzkoa6esn7s4cvyt7sf8sathfz10r95vc3tyzxdgc0ud4h8sv0sftt59yliulavfwcl29268t9g3fp5i7m6vf50',
                flowReceiverParty: '6tyudx9k01j4o4dcpt2ldqero1h3rbhcl5jlgkujc908we0s0g0zxrog6ombix3o6ao83bfqnikhx119zwjnftco5rb9wwlq9qed4fg14hshewpizsgjlaupp3vrd8rec08xktdrn19vr7x68vla4aucuct05mge',
                flowComponent: 'ohhnjxrlegk4p3zwmtfqob49xyfu3057kgdwn61ig5kpd64frqtp38gn7v6xsbb5fyu0tz50i024a93s5japq8s12gz3nng0x9mfougr5zyrm6p2qu4p8ztwbs801wef8cbo18jsqkynhn4gltovuomj1ltl8f6o',
                flowReceiverComponent: '8h5mxka3o8edqw5l29p5dyczvtrzop5nllswhosjx2psm1nzwhpje1fs098na9rcf9vteqopn48xhb7x7tvf5ejtjt8z4h3r85vvj1f0s8nkdmrs8lp92m9j5kdvowmfd1j6m83qxr4zarie9d5ovyw6gzfwv24f',
                flowInterfaceName: 'hcuewg560siy5qbuvl61w8q5td4batbtb9u68mnlxfg9nqgbkehm1d27yxpu3ebgerz9999o4v5bo1xtpp7ljzwo23i1fzqminxl8mue5mei0vfyfjohn69txisbjgr54sw1c95j16ykcoh4o3i91ei4eyntp4up',
                flowInterfaceNamespace: 'puytmixj49dkv7f513j7gil9kv3xhgrpye74v8lhwgm6r65ehhxpgqn7jcjk0o89apivdehi3j3lchwonxwjtuzsvqlon9yl9i399t4n1o4avhh8ov7c97vo146wannhxnn8vewlud9xd9xc8oady4xe6a6p0x02',
                status: 'DELIVERING',
                refMessageId: '13kz1vdcwlz94exb0h4ccml8gpidcwsyr9dklktrzn2fwmyjdc2d73v0w8iqovui6srpbo3ipjgj2ed957e6ud2j2qzvid6ej3ior2x1su4pxcivb4htevr1zhprbnea4syuplw12r4ysgct4xeircy5b5liutev',
                detail: 'Nulla ipsa ipsa esse id aspernatur ex. Necessitatibus maxime voluptatem. Id vero expedita deleniti quo. Aut sed laboriosam et quae voluptatem voluptatem nisi.',
                example: '0dq3gpml6ep8az5u4zzrdugabs3hixqw2qy6fq662mq6pft6ylum7w27hb4fjq88jgrinr37w9gp6609a564uapd482hjyyt0tk767ejyd658ueb4tn8txv24drrfrb432s757hw77ai8lv1afazbtp4x19fgjbl',
                startTimeAt: '2020-10-21 23:32:16',
                direction: 'OUTBOUND',
                errorCategory: '9dbe2upw87epnvwgtbukuhymld4rys0w1rfxuq4rzl5ddqm713a6o4rmoh2ivfqx1edmn5z6spmr9ubjgt72uz8rohkadodaj30hxzime6krnkyyktkw5oaapgvxdne62f5dd1oyk2ucij65al3zfwt42nurogvs',
                errorCode: '32z50omwl7t8nbgoyyc704ub2qxiyat11kxci0kpez1q1k91m5',
                errorLabel: 824002,
                node: 7916247031,
                protocol: 'e70f88727lg4lbegtusw',
                qualityOfService: '8i64nev05ubzfp0fbezm',
                receiverParty: 'k2kjp5yygc1k0bhp6kppa0mbgebw85ituav5xfi50eel82fsdzwlehk7ple6l31x8byp2ct5y8d5uu1nb8lgiuu9zb1qvtv0paspmq9h4iamtabuy4wdk9ep6axs2nkbrsognhqli5k7q66a1tmfpf1sx3vq0vyv',
                receiverComponent: 'tuk2o47zbdv4zgyfjqzr4dicquxg72k19f9i3fraa22rr8m7faorq8bnxyxdwxqfplcgqivis6nqlrgbqu57mq4nt1ih3d004kz9i3w7zzeitiwzs14v5s755qgx91443tbo54xom5gwbae253skwq5fe8d2uamc',
                receiverInterface: 'z3d3j5pyvy2t0s2sbgaj7zg0jlrgshp0iwns81jnrkq634k6h8srew611yc6giqrue4061p91cpdnr0opel2r9ga7k1yfy84f4k8vrw9zz9savyir9188wgnx6xueusjbgci49rhqhko2w14h5cf3aubmzly3vu2',
                receiverInterfaceNamespace: '98suhgcol6ot00608ba5v1vl5h5831j8ri3c7qvlx6lpcbq7x74yy4x2acd2lxakavuk4xj97wwx9xroz9w3tspvrisflt5wgtc4o2ki6dtn3yuv5kjywhg0qu37gh96cvz4pobd53afkcg3045blfa2jjus4y0z',
                retries: 3286862437,
                size: 6178526020,
                timesFailed: 1028216648,
                numberMax: 5787590858,
                numberDays: 6720071612,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'kx2bcauys4y7229lk50j6s7smijnnruzfjqwwghwq3d5txtl12',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'fpeuyc5be6849cezmn6c',
                scenario: 'vtk3d7q7k0mzaxaums24t7nc3ny0i1opvxbdg0bvrq1wvo1u7tpfm5f8pn92',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 14:34:33',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-10-22 05:22:08',
                flowHash: '8fio65s4wgtr9dkkn2jjhex7u2koboxpnbyimn5z',
                flowParty: 'syunsassow2ahh627bje1t72vdo05u595d7uo7738j6ci2b6wgip6n3sxgtnell4wz5a0v56dx4rycs30iw5guigvfrjdypoch4o5ugnea58qi69lyzstgtvwk0g0witzrw2vb1wpzyigqaaqs12s8bm5mx8yma3',
                flowReceiverParty: 'pio0rp9c192xvuh5tpxa5o3ilv4u9zyix0aew9wifmeih4xjhobufjhbz4z1mgvpugeacr5exad4fjzq2ptbasrhsilmrpq62pg0hgwxkbnga7habxman5rjztc87xh9t9w615hfynuoliy3u5j2bh35nups6vbu',
                flowComponent: 'yliicw4nr2ju5l5vd3ax0gf3zrs56rwz6vf9p23avpx04z1xooip82wtuzbise2bve8fhy8xwwns4aunv5vl3m0dbfqle0zzpmf4ra4gxer9b5856xf2h2hk19aq1rnwoikzlxrp5ucavzv9f9cmbzs40rqxbjl0',
                flowReceiverComponent: 'zbkgx13le5xj2dak7g37j766iud398o339z8m8gp7i50u6zf6jydu5ya5ewpz0ls639f7yq43aukwg2waeiv783204lo4gntnvvafx8qenlzwncyrffv8swz7bkfg3l8qk81t083i58o38jl6e2em5bmzl0bnp9v',
                flowInterfaceName: 'xb5sib14znlfs2ntvqbt0yxsd7hmfz4elg65luhaj3mdgl1zae6j1co4chqtf7g9z2zy36ais7xs7a1tvciggexl9guxfwxkoczu96ccz1ufx73hlhj9klp7tpqxzdkrny79ord9aiimmt6gsmhtjn0zrqpg7mfu',
                flowInterfaceNamespace: '8w7b3bttztyk2i8ykiix8xk8g61p5s39qwfw5n8xon65nz3caf16h6wqx6svvcycfg2y78v9qyq72jyez7a1mlefhzp7d0z8zum4xqtsob09tx0x0vh0h4au8tv67o1pb2czsu92rxy3uf0mixovz3xzdadwmqd6',
                status: 'ERROR',
                refMessageId: 'il84jmzj0qfvhh1iab1g83yjgv7vgcheqw2ichery1unmven08ls6ttel4ai1vitovip025lqqmfvk4hncg4fwgm5xkfh5yp2g65g9srr98pjjflo421fbun3bjgqousycyvvoc5nbequ2ktr3tcgjyprl5uux9o',
                detail: 'Eos nihil ipsa est quia porro enim. Sed tempora assumenda voluptatibus corporis. Asperiores eveniet recusandae sunt laudantium. Delectus ab et ratione.',
                example: '59ayhnuasih8c7fpxl8misd3n1k2531bibzd6s8p02yisl9gopb5dp5pnx2p1bfi76yrumwukafiy34m5lvkhb9acthffflewfa6t60tk09xtvgcg2z6okso87r8kngkhpeat8wbyrary16is3yjcv5sa2ijuojt',
                startTimeAt: '2020-10-22 13:26:46',
                direction: 'OUTBOUND',
                errorCategory: 'z4pvb2wlerdd7trrq9xbqinzh7zchc59kk3l8lglq9ybe33212zlq74m20ll8u5nl4nsp545t2liwxipfmxyud5lciz1gip5ski4d2kbos4w3em44mviu6y288r1hltbipzstxr0ka2sr3vz59gv95ebpik2rrfb',
                errorCode: 'sl8yc3vujqlmum0wcm308la4kvqshfr7e8jmcq5x3x6vs5ygl1',
                errorLabel: 384187,
                node: 3523329135,
                protocol: '7rh6dk9qdlsj38olzzal',
                qualityOfService: '5iel4dr7rtr0ayg7xfx0',
                receiverParty: 'afatdwcfpi0bw87tgie2kl6yh77do7vklkpk4zb5cy3tajbqgr1m1v489l738yqgjr91f4hixiefginz1dfuf75hk5rh2i1ka8lt367hwefoum872w1h6xaoz1r7khko273nerrncuqxqms0hpj9evw7i4h4lsce',
                receiverComponent: '1856fzv9tnza3l4fufndk1v6ka0qk85b9erdhrhns0irpijx3k85ce6cmng33ut43gjrqsmlaji0rb1gfalyy256543xozuf05cefngsvjksurn3b8vscehv42juoin4bwzrzhpubd2bsnmr9suswxxewdgsmljg',
                receiverInterface: 'slxrcifoepq0rblw4i4qy4k4ehrdvjfxyejjdwxzbsxmfaa84zjrntp6dg5ztme2gd9djyy0iqs0xrkjwbfhgo876u2dp28zyz9z6zxkrq4uqeu808urx3ff2zpkbc39k4l5ue5dsh9zuzr3a3nbzg0vuexbmq3d',
                receiverInterfaceNamespace: 'hqu6ob7ovp0f05karammh5euamz5k6mkxpvmlazt5dv3hrsr3p2gdimuzuywyyhajpaq7uhfm8u3aaf6kh96u9h4mbligefor24dkyvq8imdokopx7jx9858eqeepfrocgxuth67g64km21m6bgm7ho99n818sua',
                retries: 4908864167,
                size: 1607180479,
                timesFailed: 1356160293,
                numberMax: 6945497903,
                numberDays: 5840964734,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '8u1igioclbp34r3sthz6yc19h3qsy9iliw9ow356jknoqzelfe',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'v9u4pft65f61d2csbx1f',
                scenario: 'kglz7wxwllul60soc3nk8ydffggsgyxd2l9jik5bwsyxttrgqt1zkx6ft6u4',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 15:28:44',
                executionMonitoringStartAt: '2020-10-22 22:45:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'gnhn6u7wi8sg3xqsv0ol45pqz0yqehhuwvr4whsl',
                flowParty: '3oxr01fillzn9sxp7e29bvwpclgjcx5xj2pwivfsnd9n708ks1ho4kmaikbel5x6t5lsrbqzzss9vn8gwqslf0e5pdmzt47t8nhityg0vparhqjiycvoxqojb37pa0mgy0n48mclfjh2143vilc1o40eqaltoutp',
                flowReceiverParty: 'i7hx1v2jm0mltx9ycc70vojrcx2tnb5eyh8w6g904e2w3zzs4p6y5atm46ffl8bcye0nrjtyx6m9jeslfu523ahn0xkt3yobnqrxm9etmupb5we62v6kw0agnzevw01dkbg13b9t1o9gexwwlrd02vtr7tbikrha',
                flowComponent: 'hzh9zuejqsztdu10xqfhh3dmiq2afz08j5o7qpe73u5qe1ojxfhlkerrbtq0m218ykfefk1td8jfyjnmya1s68kpzuhvvpdz9ufr7h33fywpkhtbudr58yk7vww5u2wde7upp2n9pe36le3lfk49edaas1akj1cw',
                flowReceiverComponent: '5q6lnuzy9sxsjn8y6yj43k64zoajhnr0c4d5w9jlfzmqdqw1dcwoxvn4ru8yhjzuswbs61ac4m1gyvk5naygkoeqi0r0vwzmpvy2suexq80a9n10ur6mgp1odtbk8xi20ufxcqu3fmblw7p67a7tvdh813rgxnbc',
                flowInterfaceName: 'ibjx49u4jhdbskj4foleb4msxhsd1whoxwi2vwsii4htw8z1qe7v410x16aadp66bbye1bx09a454ji5p2sozr6cm4zi50b5izo7ni92xgstkmoxjw2wcofmf9yc8kfv066nzkah6nrr2dq7rrjiqa6lnhu7ui64',
                flowInterfaceNamespace: 'zrqqajn5fp5u2eixpxu325pwuy5fla80drqxfjm8pqse45u3h96n6ja9g1rc7b09tdz9w2uof5fz13aa7dehly8k9304rtdo4po40fq17hyvhn0e6lk9fy8gy0xajq2ov5nnana5c4x2oodklhimmiirbitmth5y',
                status: 'SUCCESS',
                refMessageId: '04o4n2mix54qixoutqjso14an79laucq88wteu1bgyuk9c9w8t5ldrdhsmgoflah78azq4dda0bkeiudsi5bpxxa12gyhgh6zi59oxew7z0n8t1qq2cbqxyismhgmk2c4j5xw25e9gaekikoc8242xa15zu5dpp4',
                detail: 'Veritatis aliquam temporibus dolor fuga nam est facere quaerat. Quam eos et aut ut nulla sed. Deleniti ut aliquid voluptatem autem omnis rerum et tempore. Eligendi dolores soluta enim omnis voluptas impedit et. Culpa facilis quia ullam ea voluptate est ut impedit molestiae.',
                example: 'mg4t84fsxg62gw98zvy9jtfhigtjnfl1qbugsbq3bdmhba7j18j4j5sa0tgbq0jwklu5g5e4yvu7auezbpm7p78tmdd0f7eedmf9y7e8hoapqv1um7wheaghaumgdbm5pcat295d93slvpz6hg9pbv4i382pavdl',
                startTimeAt: '2020-10-22 00:34:27',
                direction: 'INBOUND',
                errorCategory: 'm2de6ifixiyp6kl3vlzfjv3cmshhyqvkg60vjico7798zk8c1gyfp67v7uw4cwog7byp5xiaorxxeqkq6yo8lpr75j1euly3kopxru88zfxh37yivm5vp54leaz4i4xvjx2o9chvdilc1t3c9i4kz1ov3wk4n6xp',
                errorCode: '7vduokk0p8licb34rw9xyz0r3sfatp6y64ooqv61w4fblgbv3w',
                errorLabel: 869024,
                node: 4349325190,
                protocol: '543jxbo1ykri4am7jpjd',
                qualityOfService: 'km3mghz18ex0susyn1k4',
                receiverParty: 'rzyuhva8kcam4h2jo2mnzzv6624yjk89rkpx0hrum8c1cpg3pc31d6p62n6d5910kzx029nk2oxr6wipohrgyt4118thr0rg7zykn8dx8mmrb4247xfoknyq3o1y71hm9x5rd878prb4650tccyqazkcgo8s2ix3',
                receiverComponent: '0aidt4ih0eg2ndb642p5me6xcjwzi854dv4lpgigh7263pxhh6z8eso4xwekcdrtl1le5xj7ajn0bwrwhcrgkaekmw1o09xe03u96m6xn05ug9gy09mfxtc6xh82q7jou4jgtehuwhube6a0nrpzo4xkn1sbb6v5',
                receiverInterface: '7ktt9d5ck3muf4vow72qsfkx8wt18ievepalgst69g6gfpyh4cv46iz5ctizf92rc1nvidxvaq7q7pgxeae24khz0ccs2us0htkwwpkwir127panu14utk3484fcp5m1gztd1qp5x70vv7649dwxd1hm8ouovd2k',
                receiverInterfaceNamespace: 'a5kzbvn7gf4ex4pyfmo3pzn91stem7a6k16ff4zxpvgyquyjpgkzfbf7yslotx6rpl74uk6kpiq4nzecmhphjkob694dejoh11bypkezgfsme7xbna5sgulg0oig9h4o56yadp9plb29dsowt740n126ezwdupce',
                retries: 2152318454,
                size: 1742654770,
                timesFailed: 4946708851,
                numberMax: 9593591225,
                numberDays: 1921817965,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'j4p0b3vl3jw3ezn2l3ruhjiir1xe0ai7hxhiy28q8ju4s9wuk1',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'x35hkc4s3ip7k3rm0iwj',
                scenario: 't2p2qqe94o62s3xp4qltb8wxjz42qzlkoujt3d1xu7lna18kzcsuq3lrqpiz',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 15:33:25',
                executionMonitoringStartAt: '2020-10-22 18:49:33',
                executionMonitoringEndAt: '2020-10-22 20:56:05',
                flowHash: 'mk76qxg68eg2hv2fzvdto3sj6fey6cmhaj3xmlec',
                flowParty: 'azf7offjo0od66xcrn6nln07w4buaw7lly0g6ojs2gzcrnaddtms0pnxtojfh4x43ge5zegch5tg0dofpwq9j63b6ihwih0z316mo0jca9ko7fmig0snvxcstfkruslud82lmb2zild9my689xr7lo7otxwj5s1r',
                flowReceiverParty: 'xupi15tdcat4p5ayvcfyi2i1borv1ek0kni3nj48h9jw24y6hevgdp517evgqep1y9pcm4qtx202p41d9baomdkbiq9mm1xsd2wm9azrkq8gwis8td2dpzht2pcbztxprtypvcspyxt7bs1r0h97pvp5q88d15gp',
                flowComponent: 'ql8f8vsv2du288vh3aybodldfy0dzvcmpze2fudm1n6ybzd4ynnpqyf4f5ho4do4cgi52mwe2g9ila43ndx5sm0iwvk3a7sv1py4aulncnf7tmn4iioli6w5zdewcz45fpgcf6be5dvhbnfxy2m61l3yhj9k169m',
                flowReceiverComponent: '7sxj86uwsesz46bt4iyk3uvuwufqdrkyp41dpaa6dywchk6rqbdl1igs8wlqh9u7ox1su0tr0ppcwoqd7inmgj8wawh6iiriy8zsyom1rbsmqmscnotj1a4i2q07w9wzhfjkvns881uufuj309uc7enp5do5xtbp',
                flowInterfaceName: '8sd8aatrooxm5vx5halmic9jgbx7xc0w8zb0ohb95n4u4qeybb5gkrglxwjbuq33rpu9dn178j0a8kqg1z89yj9e4yz81wiyabq2j2jkkjoyl8rgoz2nuynrpgc9d0cygr64ldu2s4k0stcp5aarj1stpp140yr8',
                flowInterfaceNamespace: 'jp548lwpsgpxjdiygvrq4shp1zurg9u37clji92x12rpq334v4b9lcsnserlzma6gr94n4fz0ai671947mqz8hr9qvdtu560lnkah43p6e2rhx6eyr1adkgg5wcsgnjjbgbez39qefzth6k8c73yy9fc1nwb8s08',
                status: 'HOLDING',
                refMessageId: 'z0eb7oojea1n2trb5yszqxcp3tt2t6s6jkh82iz05c59hprkp3mzglr3dca3ijiroor5amlk6dqz2sw527fnrqe3tq1elp22wjo56iira3cv7n15vjp8vt9u4qqh4prbim6ez2i14gdowftvr9aksyen8t32d9u5',
                detail: 'Consequatur possimus eveniet quam sit blanditiis commodi maiores odit magni. Autem error asperiores. Fugit illum et aut quisquam. Ut non soluta et ea perspiciatis. Error molestiae corrupti provident quia voluptatem.',
                example: 'alm2sddq88t76xv7ok9wc3mvi4q2krnn6hyg4x26jo36xyize7m530zapb2gv3uw119bckoh5yzhq0u4ac0b2rvun8ktwtn8a96max2kp1oze541vpfujcgz0gj500mtoekr8bxh8tanpv5jgpkthraq77bz951d',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'ru3rktiojuv6b5l8jr78hd024rbe29xl7gghs1nj9e82cleqiarunwi45jys9sur4nvmd2idphm2wrbrs2r3u5kz3bpflnncji8wtqci1jzn05b261kekjzi0tui7p35ba88p0glrgfvqfdmre79t754g7y2pgqu',
                errorCode: '6ay1tradc9b7lblagqea3hlzl9ld9iitxwazs787f1oavvoch2',
                errorLabel: 656742,
                node: 9799090238,
                protocol: 'i01ach9anz228khfy0j7',
                qualityOfService: 'fyst9tgo9gcr8qki99e1',
                receiverParty: 'vek7q865r2202ebmo03oz1qoyi9rq7nj6urlmjtsd8qzypk9vumrc50hr339bo615oorf0og2g3ly2bshik0tmyt5ciec6h50labbk6fud96qmgu5qwglemxuq0qny0gr5s5ygnrrayqnco6s73ul4m8ivq3g5gz',
                receiverComponent: 'hp8b7hngua1z9pzft8bkqwc2di6dz1a3fqom2x698bkplle39kz8rrsy1zqtdjudug1v3dvt3ywuugh9ol0v66gxdxf6mlky28opp5kfu24kuchkqkq00rydyp5s3dar07vl1yftrbyjepqfgu4e2cco2hlfi6ge',
                receiverInterface: '4ud2bxvkx7k1fbhf3ip1elc2a3zo1laa4l40mv191lo53jk8odnkooaawlo1frq9cgpyueu207g66b414ocnvuq1irztwqvxk6mj3n0gp118axv5vxsyxgshoov9qg25se710f4im7y47lqgmetethz8udt3q4if',
                receiverInterfaceNamespace: 'fcrl6gmqvid6ky5c8jtz8jl8buk2lcrjsseu1huf0oc1g4aqzf2h83u91sj6pmc9s65fwjjxm1t9j7ohvsue3ok6d8eb7fzzea0sv63tzubatw9ki8w1ow5uiy81gc015gdd1s8c800fao7ia9d23nafk0k9sr8b',
                retries: 6617819172,
                size: 1519938084,
                timesFailed: 6402720010,
                numberMax: 3459821510,
                numberDays: 3710005892,
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
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: 'u5stkydskb8dvkuphrmanijmvhxa9f6ek2lvxajkq63ve2mihl',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 's83f09nv9abyk1ouupeg',
                scenario: '2gbayrsxlzmrfrz550xghm2he68ad45x1c9ulq92kq50zv9u1b1dswmnno26',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 19:42:03',
                executionMonitoringStartAt: '2020-10-22 20:42:13',
                executionMonitoringEndAt: '2020-10-22 11:02:14',
                flowHash: 'z62hyrtht5qctux36nmv7ksgqdonxywt9elkoljx',
                flowParty: 'fj0kzgl8gi0d7do92bz02dfrzas52wgbel0h112pf31wmchj64c6f1bikmffmmf0uaksbf1tdoizkeao2snznkkr36moquj4iyk01ody3wmuv1h9cp2kgwb761jdhjze58yiwk3sjzbsaxtr5qrqixyg4vep8pi3',
                flowReceiverParty: 'phntncc7n2ho7d2ebesuufuwnd7x96y66irp3ab6spou15f4jan3u4uty831ywrpya8o04trviz4po2bu86f311cyw76995vl6ypvzwmy0ig65xhbet3hiqxo2pfp0mrqko39p3stpapvdxsodondh2lxecvj20i',
                flowComponent: 'slhiv1izzbf9bytk8sc2kbju98luq76ff7q8dugyzw4mlr1e1i383pxh23zmz76kmcwt17bm713cnp7h0ooqzd3nt5y0ao29phw44yhwzc6qawwwayphk1y2m1j4akh755bccss5bbgrgg20kro2ot0v9cacsnnz',
                flowReceiverComponent: 'd5upsaxzu2zikpc3cyrq29h0nsx9ua22c2h3ugadgca5j0n1wa2tsx4oy0nvsyvzsn9pm60329borfyn4dmi95u4r94fomsyl8lzwebuw01udacuifjoe73mwhr35iw3o0y7999x55ojotnhwdgeae0ha4akckae',
                flowInterfaceName: 'rl0rxp3pv95svgo8s3prydw25nuag2y2l0vandi9k3ms8olnt6odpula21nomfxz51hvvqgtb5gf0y36yvh2mkhotexqyx8m69ysidbuh5xkpuj56l0gckpv2fhz34khhzdu47jzdlpih3k5ybr8q9z756htg5jn',
                flowInterfaceNamespace: 'm3etqhnfz55jv4t31vzzd3y8u8634e4d9h3vj1z008bodvxxo6scds63drrpytx062kqswwhqqvrs257yoi7rxfkjw8kcbn1aylt9htnxvgc7756jk6c36tzc4k9fk7wu8ofircnjqw7xcupm35nns7qsa9by24k',
                status: 'SUCCESS',
                refMessageId: 'ln9k2tecw60tuofhcegejxxhunopb5tv570vsghczurky87dqs9m4rrr9tfhxwlvy2ook8xgfmy95258xdvv2icidfguh4nzinw852bhcj2xrlmuzu2efxi6orbfp8x1w4gi1xkghuhehqh0n0qnljp6ayc1y0mk',
                detail: 'Esse error sunt sint neque voluptas. Quaerat aut voluptatem fugiat ea fugiat et. Harum est ut.',
                example: 'ekvomx03pccz848t0q5zl0c99rdkzvsbtaew5pa25cjsck2ld2mqan9uxnux1xnijrncs0l95fm0it2e1smu2y9zborin684m92cx74vswdkdwqljcmoa1ooxe8orxe8gpfvsdntfpt1p0b6knh9njno26kkvilm',
                startTimeAt: '2020-10-22 22:33:26',
                direction: 'OUTBOUND',
                errorCategory: 'asj2ubdnkodpvcc3xmsrct7awyo5i79od3odu25yuyz7yks9s4cslckv7i8sftrlh4dnp9bowy89x0s8s2jphdlsffnhn5ss14w9ijn9g93mfzp6uj8puwrmwsbry1lgr98c3jdprw44e8gamrzwmp2u90ci625o',
                errorCode: 'be3as69g5lqqmrk1l28vgt2thilc8a9zzhs4vb56zgl7a7fyzl',
                errorLabel: 352975,
                node: 5798955031,
                protocol: 'qgw1ia2q21nu5gurz8tg',
                qualityOfService: 'kgbwag2vfqjqwyojbw17',
                receiverParty: '5ng275cgoi6ekhryt169bbs4ep9x8zzq0pijsho5q7a8qcgltznxynelb5jemgablms9d5mr5d5xnab83zrc001u9nz8fzxolojf7rno4eo578kc3zaptbn542iw1qzrt60315y236iyoj6hhvnbi4wt1zzbnw8q',
                receiverComponent: '539jq3gy2r5io7iadkrg8q2sd8c4uaxqpfhr7lo37a8djh3huusyj9nyc3rbgnbsys69uoxwgpshgzmn6v2fic0yijnj77bs0vom6ga01qx0h11crjpanh64mjr3tmm2tg6jcjj130yorze9nivonj3x404frtsw',
                receiverInterface: 'hx7844vgc9vy2tidqsbqikqgxzc22tbegf50yw9blhlito737jhqr0y0ssdutqtbe1qq28ybwa16wg4ib3933g6qfo6zn3o4vyb8xzvdq7hi3vcctlbmm73lw6vbwb25nm8l4cpwqmz424do3y62vxk7fcnlrfcr',
                receiverInterfaceNamespace: 'sj0ooalepj6i40cjnilb4k5f96w4m5q26c6vi8zf4c2td97594uiklha5dmcv5y97xrqhb6kyarhujb4vcokbm28cwo84fbdji6tkdfkqn76577xtaxb3c0d6qdawideoos1upobdyrk4lt4r9p9u9twcvaa3mtz',
                retries: 1003117596,
                size: 6393659547,
                timesFailed: 7800832521,
                numberMax: 9901265359,
                numberDays: 9498776464,
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
                        id: '6e9411d6-bd7a-4299-8b92-1a25830d5898'
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
                        id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/417dc537-37ce-4fe9-add3-164fa29971f3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/f564b5d0-1fea-4cb6-a38a-994e4ba8dac4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'));
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
                
                id: 'd4f1a587-92d3-4e87-8448-466d21a1685a',
                tenantId: '2cd01480-d550-4fc3-b772-98ed5ce6a3ad',
                tenantCode: 'xl8yidh8dqlyc8915qnzhcwse46aptwcdoli4onnzreyw16mt7',
                systemId: '2c97091f-f335-41c7-a1a5-5195aa6b4f76',
                systemName: 'b630wzef44pzuu8hgzze',
                scenario: 'm5mbwxuywq0qliep2537opz351wihtzq5czjfkt3bfnippx757xixdaevulq',
                executionId: 'addb651f-ad88-4bf7-bd01-f2c11ea088b4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 13:59:06',
                executionMonitoringStartAt: '2020-10-22 18:08:41',
                executionMonitoringEndAt: '2020-10-22 10:37:48',
                flowHash: 'hlwtww7w9eymvupgokfjaqtr0lsa66ywuk672a3y',
                flowParty: 'sfy46ptngx58hi2nyfhkzn7jhgb6obz4bke1mlottppr50ltt318upbmiq4rps6lpxasbf68r2lkiiedncjmbe3epjro6c4ik0vnjtnvqe3og3vdqjx7lvhtwasncz3wtwlvqfihuuezd312c39js60p2vo5v6hn',
                flowReceiverParty: 'wy7tvrzst0uxsidc9t7r2cqb2diz7s3xj6jyagnzoyvx6e5h8cx0yykhx9pu2xmmv3sqxa0hqnerpb68w4d2r52fbchoh1k6ht57no9y55jr43l6va2ny2f1z24cfnlartlarf4ktengb45m6qc0b4z3mxnmkqer',
                flowComponent: 'eadj99y45x053lruwjbhhe2vgvwu6zxzswdm143uv7zxxuni2t70we5i2grq9j5drumiydzu9embaqtfns9bptzq70h58cwb8ejyqlxsa0stt7qqlfghnlvveo7xc2gj7kisc048hfr6o67err3yv04t2l7n9rei',
                flowReceiverComponent: 'eq5so02nvdu1uf2nyrjah5rdknafcprx7y1so250lguinamhjp6hynt05qj612jnwky4849ds7sntsxrtagng01ndq2yuestdu3zreyhls724ob2otoq2upf7oei4oai9sq3xxnqfm0481ditjh6z7cz429dwffl',
                flowInterfaceName: 'gquary3sj3mnico1thm9nxo80tkprxpwtu83u6odz5h5ttsj2b34v5e587z0ywostg7kk9xspx90wpbhqb6cpwjjm8615otm5a4r37ooc0kgd7qswegmunzmai3tb2weeop0fd55k2g7m8gjbshla2u3tbdhxqmk',
                flowInterfaceNamespace: 'rramyir02sxe9hj47sp7o996jf3etu9ek42f1ifr36yhc2wg054rj9q0fs2tn3xt9jm41x7320br4tzhu0adnvthdfo4uhx5ybggmockx7d5viux92upvjthr5n617u3e03uu3w2yvfqu6jiozy23tvl9hva9pw3',
                status: 'HOLDING',
                refMessageId: 'gvfz2xqw8dbvm3rh9r0xngvgfmwy4qq43vhq6pa2uofs90js15mq4pf31jjm50xssh2gvpp6zwgsnq8sdvimnemea2mm2auo7yzqfokzexcwhcipxlr62f50od0ovyb8u4kociwen0dgybqoz2mx2agoiko7vgwb',
                detail: 'Reiciendis aut nesciunt rerum nesciunt quas. Alias excepturi pariatur quis magni. Cumque sed perspiciatis velit qui. Suscipit eaque et et.',
                example: 'hlahy6ck9lt7j9a5nrwi9hp72lbie1tkujysnzpsdm1ocogb1fmvlqaxx9l1fin6wn6zu2y7fbqkdpzeecn17scms16relm6nnp8xa9vouqde3urutkkv849lqg0yzawt1iv18nkf0xtikkr6rw379jhrcy6f8ue',
                startTimeAt: '2020-10-22 18:55:11',
                direction: 'INBOUND',
                errorCategory: 'lvi3ysai0u56wmtwbt4p09z6lk3ttwzal7qy8dozmy1tjswp2gul7sms1jyjjzik1c4r0y5oab6cmobptu9j3mf3rwt8e3ihsug779t981oo289or0e62it1424b53u63tc52uxz6ppfzutxehb0wfw1birny22l',
                errorCode: '24vzv8z9f4bkzpjndw08pqsimr44f99shfa3othi5q656rtgeu',
                errorLabel: 162366,
                node: 8014324573,
                protocol: 'ga6l0jx2hiovrgrnvf08',
                qualityOfService: 'vg22bm5pazedj1n65zvy',
                receiverParty: 'utdjy6d4w4nyom8unkpafhysnpdvraz7rohh8a5c17sre4uegoz6ddzdzfuujnms0ky9i6t9yc74ym83uf8vr3dng4x24j3vta0bvuk4k3effgxelgv0l31ovygi2mwuz93mchyxtto1l4984ur1n55ut7gerhqk',
                receiverComponent: '36cxtpkpan7exns7f3ojock8hrm700ubc63wsnygnu8vb5zf7q9gwwf0d2ku9re2j45j36qoow1hzxhi8z6vrqhk7b8a3flxex3hq46isa7x1fpvas3smpsm8rqg1o8cipw0p3ascos6a8jns10pi7x6qxdtwul1',
                receiverInterface: '2s8b0hoerdvs2gc48bs0ndkcprvh8tog0173q7u4gq2ylbmuiv216jp7cz8w2cn421yiipxmtptkk3bpr2sr2yu4j2s3t6o5n74if36pqbofvablyxxvn5rsk7wn6qpfyd7kwl14am9fi3onssyq77smksner9sk',
                receiverInterfaceNamespace: '3nt3pq5h1pfmejfkb3bsaaz7sfnfost6cho3p9nopj88kb7tzujv99qriz5ynii9gnr9boa70w3xxizvxqthmpkcdbp1v2kdd9j3l7whsjl3ps4ylkfdo72lx28eo44z3tpjvyhgnlpjbvsto0ate5p4kp706ubz',
                retries: 9890777409,
                size: 3193583509,
                timesFailed: 6789384435,
                numberMax: 3486654371,
                numberDays: 8599109297,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                tenantCode: '78349isa5w1j9xauf18yl5fcca39z92jx0k8bs76mn0ki2rzve',
                systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                systemName: 'fbdfd8pipd20ugle66gs',
                scenario: 'iygftq73zxb91yokkrsav6oa4krakenza2xruk59lkp0zjvjn08hxavwhu6w',
                executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 17:00:54',
                executionMonitoringStartAt: '2020-10-22 00:50:33',
                executionMonitoringEndAt: '2020-10-22 15:56:57',
                flowHash: '6n3gmvns1dts63rdhqzq4h8sha8c93a9mprhkgx6',
                flowParty: 'ppu2ta1dhxf9akje28j7al00y7kkvbmdnvzbkl4vzgwucu4kbqja8bhnvm4p48r4f7jiukestvgvvccx3mv3qdwe4p1323herdx6zaosr228ro9wzfn57dts1ycft2luqwcseodxgi0kj1cj793gcoakzsqg5bkn',
                flowReceiverParty: 'ne3ghg3py6jnh889xttq7tq8pl74j7bqa09gprz4p9zwstxnqysnd0rs0jug33ygcovidqkzuiywmrr69000l1okbe4l6piturhtx4qjevzft88r2s8fm1lu71waictsnlb8ynhearw40o6381nmosswjiqe9np4',
                flowComponent: 'nkdxrvyhr69xi0ag19910gmlh5lm2y712thiyaew4ar2e1lm33f8p4gjzxf0waqen9l5g9npswhuhl4gwefbzg6bjaxsmb5d5kfk9kh2dqzrfemr3klipz3v644lus4tqk8k8jr6c42pulrq3asvwskf7lghy6of',
                flowReceiverComponent: 'lopnop29j0gcasog8nnf6lle96hbbt4q1go0nch4wqefq2tkvt2r6snxa2tak3pkc7nqpbwt2534a1soxihu2obaav9gprj8tp2romeuawkniz2n4s2j2immjiwbq8hzikd9mm5z67y92w6ouoekpbopmhxi1vag',
                flowInterfaceName: 'gzq19k2n2oiek2tizgh952w1bwzrmnazpbi6tqck1ri660vlkchhfnt98j69qkioa4zg83yedz1ndbjn9bou1izfygm2gom029ppgz2f9boaigyt7l0om7k0x4ylwy05zvbv8lkzepav7s7lrrbpsd4zmj5nbjki',
                flowInterfaceNamespace: '9yn7kccd3s5jbpqlro3mnhi8htzv4nkwdt5ml03mrzentyhow8vylepz352p43m5awmptlukqc7elt7wxoc8xn1623foubxqwzhgn1nk9b8heolcn3dc3usteqtemlu31sntekdaq23x06wq5cxjat0yjuuo801n',
                status: 'WAITING',
                refMessageId: 'nmopgpcgit3k1hpl2zga4ssmmwttxgjx2mu4otr7nluw3l0uua68fw70mdnjp8fw6epfdq6ybyg7qlvgmfagoqeuz4jf8ml5bkv9qoex4zovpzm07bf3r8ccpyrrl3t3lcx8ocb32n1dq43gpegj1xyv4louux1k',
                detail: 'Earum rerum odio est hic totam nemo saepe possimus. Voluptatem sed nihil magnam similique minus et quia temporibus sunt. In enim quisquam qui doloremque quaerat.',
                example: 'dul0ync35db89rmwzxtv12nsvr2rgyhwse6valcydkdq8zo714u8t27i1g0ban8glr5ygjgjckttjaymvpi73ctrzt5cg053itzeio9h5a135qdnvgqdngim68kg5re5ep201w259tt4w02xy8q9nweia8o7kk7m',
                startTimeAt: '2020-10-22 00:32:01',
                direction: 'OUTBOUND',
                errorCategory: 'f6g38wmfnjsgjkbyez173757mjp9k8et8hgy8oxfy68tgohf814iki8evfwp6pek1e0vx3rz73ev9p35opd88fe10leocbrndlmz3lrgofrpkabtx5wxu8c5oqr8nhrrhh64knbxhjouxdrmzudsq4d2rha6kt1c',
                errorCode: 'g9gv387prkew7nsje9bf4lboxjr8ae1rxa4iko908z5mqjusgf',
                errorLabel: 119374,
                node: 5013287306,
                protocol: 'fygecok9jcyvtml4liay',
                qualityOfService: '06eppxwqmvmz9vklhw1h',
                receiverParty: '407po9mk0riw7lt97oj0w0iou56ucyikv5rts5aocjjbdxzd2zg89ri37tejiwzkb2waw5hjoeyad6zooig06bf7za57juy3jsgd5agww08gn6ye4yghrz0872v0h0c1bn1lghagfgqdmnqtg2s892kiwypmz1g7',
                receiverComponent: 'g9qgv346m6nrn8sf05j1gtybrht30rxncplcr37tkhu4k0wr4p3vkuxuw21lrzolwz2lfwfuoirle6s0tmsgf2rdtabrcj80fw7afxu0u912o8om23awoynnwufu3a47e49cinmb5od3ref3ooy5b11vvfqgidif',
                receiverInterface: 'splgub6l81jozrxilva97b1bmlcy4mmjyy9aroo2ohc8jfjksx3yxaxajbtpfs9x4i8ol95wfrsxq3v1d3m7ygfvogbzomrofc52r7cirw20y068jlmikkogbo4zmq49bzu9neof214x5zb8qyn3jyc1y7bsln6j',
                receiverInterfaceNamespace: 'n4bds5r8m8v6gss9gpl9u59925ist2xt9ixm1cj6e2jgrvnz9ckgfluu8fjthqvglu4mtef8t7ry16odelrbme4x9txzcdf5xp8rwwtsmu5imtu0asvfiyoriwnypxs43sqg1cc80d3e6fultvxu24nn4yfr2gjy',
                retries: 8197593877,
                size: 8502999519,
                timesFailed: 8936080304,
                numberMax: 5997541972,
                numberDays: 3149530161,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/33494816-7732-43d5-82c6-81a71d9ee6b2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/f564b5d0-1fea-4cb6-a38a-994e4ba8dac4')
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
                        id: '51dcc7ab-31aa-4800-9f3c-ac2654b67d10',
                        tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                        tenantCode: '9ncgza632011ct3ncsfvbcgaru71k9twzvmk75xu5jxjbisn45',
                        systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                        systemName: 'xkqn7b8dtfs8n7g9ngs9',
                        scenario: '7omv04by0dl1i6mncebh2gaypl3wpdkm9zdhlvmihuyi9fl8tpvmtodqs29g',
                        executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-22 22:44:58',
                        executionMonitoringStartAt: '2020-10-22 08:37:42',
                        executionMonitoringEndAt: '2020-10-22 14:55:29',
                        flowHash: '78cul6ht7pq2j40a304tjjci9opzvqygtg4l270w',
                        flowParty: '6edrx3ysaqv8jl9wz2jr5203raaxtr0j0p3oush2n889az27sgm1r1cqv8nsp1p80ky547bl45561d99gplanwhrzt74ddzh1p1xyelghzhifijinkrc3k5h5h10x3ue35t3p0az7a4bm1s3ffea67ogfvabwzfz',
                        flowReceiverParty: 'kj7etsplnojqexd4cf6fp6sf8t822ew3iuuee81wrkptb21hq99yyae6mlv68933cy14rv8708bvpcvqypm9ha522upwitnvwd06vtocvx0ey1pwi8v1vvdw8cgumg9f9gmk61o5pmqg5bjf00vb694q9xf1s5cv',
                        flowComponent: 'cno10cfqs12hnq48kzudxx4ybxi82rbdfnr40xzlki62r6h72pw0jyf9ohlptx1q7ottj0rpe0vel4yyrz3zzef99bho6gyouyufleycdk7sagmz6n1avz0npme69lduiiplmmnyl5zgkq6yf5xzjmk5xk9hesoh',
                        flowReceiverComponent: 'rzisuesdfwjfi6rl683ayuqyuts6dx25p411p7ipaoh27py8ir7oh5tcm7jxwv1p0qs0di5k4rfj6u7qs238qqun7yitvu5n2yz8lkxdg5geamde5zivos5us0d9t6dr9havpjy8c2fof12ll8zs1dtbhodajhf9',
                        flowInterfaceName: 'r92jqm1vg3dzd4rcnenhyfky7ey6ahta3a67lsgcm5kbsxph8z4kllv76mc7ny15u8oqfarrp75e8978iuplk8unwy45938uzvfcpow7ystxy30hznokwlkkvs56qd3kc251mljin4e0nk7qrv38q700zp6insln',
                        flowInterfaceNamespace: 'pvp3bdchmz7ffsg8ne0z2yssxfy79xgna0h48q4v1hktt9d67xzcs7cxel7hmpdm6m8vzho7r083szr7po35mzxwry5jc1aze1tcrx4t32w1kjqti11mpz40aqt89grwg2mdj35d2r9vz6evcieydbqq30vv4m7j',
                        status: 'TO_BE_DELIVERED',
                        refMessageId: 'ci9hfaaxbma9gem496835ehtrb3z5apgwadfqwhlraooheohu0juruv5f7cpb0tcwzbkvjcq6u0u6q4or05zqaq0uka1jgwaxtekaw5f3ofj0sz5u7jkunn0ct19bwhoe184f1veys6afwzi8n0ppgxlamj967gd',
                        detail: 'Officia porro exercitationem voluptatem magni nulla tempore distinctio error necessitatibus. Odit qui aspernatur modi minus unde. Qui voluptatem magni est velit quis. Esse sit minus aliquam labore quia at. Non ex non molestiae nostrum a. Rerum earum non nisi eum nostrum.',
                        example: 'vt19buwp83d8elgvmqofk0lyt2xskwzcukomu0s6zaysr01yrkm9et5z3xbzj6nf39zkkqhkz56timfnybklcf49f589xati0xpnveh00dehumyduk1mtqynickdx6928hy9ax6uv1zw1le0d0uxowzjxgrka1kp',
                        startTimeAt: '2020-10-22 20:56:14',
                        direction: 'OUTBOUND',
                        errorCategory: 'elqhoodai79u5vb2ab29gfv9vg0nuv3cg8nek4zm1cr4mecglbftti6vo5neudzgnn52cpp07puyd40bp7kxn2yh4wwox3x6pw9vifqi9t81vpleacoiyo6d06ulu7ewt17yjrt9na8vqdowflipjeee3oxdleby',
                        errorCode: 'kgfhic9b0oijgu4coep9atvzff64t8jf629dpznj3nl78loefm',
                        errorLabel: 385498,
                        node: 7261211961,
                        protocol: 'f9ysb3qzflf4gyqyxtaa',
                        qualityOfService: 'fh8606wue2btpgb71u2i',
                        receiverParty: '9asj6ukak4mstugqhxebhkyz2r049ilvc3og1emwtqivy5wdpwd2s12tiooo2foyx1bt1g1cssee5o9j513borhzrjkraun8y5sjuv5y1c4t6uwqfakjpxt8wapbl4t4sgqh29w5kwmdg10ptyp47k1eh5ybnm8d',
                        receiverComponent: '33na5gouwrnevpx7s5albieixb9usjdfi2hpho4454bdevbhhhzljwk3zkatp2fjiq1vm6l0ndo29x59l1lrqr9nmdj8xaizi5qkn8r8mx8ot7vf3azwtowqkuchnya9gphxrhqg3sirqzok794dtkksz26t5fd1',
                        receiverInterface: 'wckgwkt35zol08ywk838ysim3raqt05l74t9iwitnieqy1rph58idq652q9ap5988d28z5jpbed76hmncw20oed4xeakeb579q58v9588tts5rrntzzz8e6x0fopcuinonxd4rrdwx9rgocdrlzqg4u27ddnpi1i',
                        receiverInterfaceNamespace: 'bxkyvvmcqdm3j4x9lhag9xggk719jd3jv59lfromfh4f96swe1g1w7rywncovdipsat19jvl4xq2aavl7trbmgyutx4yxaoqi3wnwdvdvdk5ai6fbytpusi3ygdqxl8n4y7ble31422rqlnlqjjpay1v2sb0kcmu',
                        retries: 8334792591,
                        size: 1332359408,
                        timesFailed: 7272059772,
                        numberMax: 1853494613,
                        numberDays: 4439502617,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '51dcc7ab-31aa-4800-9f3c-ac2654b67d10');
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
                            id: '3fffaded-9f58-42e7-9872-ec04916457e7'
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
                            id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('f564b5d0-1fea-4cb6-a38a-994e4ba8dac4');
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
                    id: '7bb8d651-3659-4555-9925-1b6c74bd1cb7'
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
                    id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('f564b5d0-1fea-4cb6-a38a-994e4ba8dac4');
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
                        
                        id: '889b61e7-3f0c-4562-a983-b4ae5d1771f3',
                        tenantId: '066a6639-d8d9-477f-9973-d011824b8ac5',
                        tenantCode: 'd3650378ncpruhx6nh3d3v0iomavow858is4lfdxr36yvxrqol',
                        systemId: '0420a373-f0da-4cb9-ae27-9112acdd0c3e',
                        systemName: '9q56e3oicaom28bxmc2u',
                        scenario: 'f73bywonqpvq6pr46f4ryosfpmoil4jgxv4sak454u7hj7hixuw4lojva4ad',
                        executionId: '7d874f1d-875f-4575-8a88-5c30fe64c1a3',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-22 10:34:53',
                        executionMonitoringStartAt: '2020-10-22 01:13:34',
                        executionMonitoringEndAt: '2020-10-22 11:54:16',
                        flowHash: 'mv5rz1a71zbj06hqacp2wfuhg51k8m79lxsfmouf',
                        flowParty: 'izpdm3qd6gmoh3m0qg2idr9sv1mvbmiyee8oy7kunso4l6p7fkb85tmjzlrexfh57pd8b5clngghhzgwvj4ziiv227phf7hyi9y5cm2hxi2pqxyb1xwmy7h2kryeeb4hwie0wicposs5hp82zi045i5m0n6tiylp',
                        flowReceiverParty: 'sy0999oi8f38nu1g30jmg1570chzkd17yvyavoeogq3v0lu0mii5a7waooqwaqddzcp77av3rgg2dlzu8hpyas4fr78gfdpowk2um33d7qtmgngjqwsl04j9mv8g7zbm9jo03p8wqwvpwejgkktxc6bscj4qsg49',
                        flowComponent: 'yciioghumhy5e8b06rgwpd0uxctw1vjax5a9ept06a857snr6oa9bs4lh1irz3n9p6nf6f0wtl6mal1x5ojti3s82l9uub3pflbv9p3ohfccidikkflpgbe15ztqq7q20w995hjeevkqz313771eu1evj41nb0gq',
                        flowReceiverComponent: 'en2v8qk6xci3hm142172wop12tocyyjh5zf606c78ck8t2upf58kjr8lf9tmjrvvx0in3x13ddwl5fu5xsynbeombq4iwzxplydkx155nt1t673apdmgm75hn8j59ftfcap4v2sapz4fcsvbr0snlzwlcrf9a44b',
                        flowInterfaceName: 'k4s0d199scnr5lb099b3l34rnihi9w8bb2w145xrga3svdup117pibsj61vlq6e77r0ypn76evcghhhwswjtmonsdt1nxy5cqtjzeuhd0k0ndzedhtgffv590wn98hkfp7yg2lyk6pm0bd63e8yqjeothfml9qn3',
                        flowInterfaceNamespace: 'qhh68me73jauqyxs0eluksug9b3wkuqzh5ocq03ju5v7ic4zs6sjft6sp7ibzin0o6lxg0uxaigjbgvrft7bb3hi8qevzlsgu0ddg8xyd99sqcqnvjy545psdaxr6lih2w3q4okh655swplo3sfm4eox4xru10oc',
                        status: 'SUCCESS',
                        refMessageId: '0lb5ng1vib4j4p9rnot144mip9oya9y2jj74vtqsi2ax5ziz6qjx5yz2e4voymm1vwu6ldhy7nap0lylnif85nl2kk4b3ulr6vgdim80fu86lj8oj1k9661rqhmwt51dscbf8h5mafi1ue6ekpb51i9ptnozaynn',
                        detail: 'Aut maiores sit blanditiis ullam in ut. Recusandae quaerat aut debitis molestias. Optio enim dolores ut.',
                        example: '1dtfd2vgvin7qz272qvnktdhdklt70wxl58j9gkrdtn71x2994hdfqgi3sy3ysip215a8a3u8z5dn8bld2i9n776ryju3nnnginp9vbdekmfsz2qsc14vz1yn2tefh4hj608nhdml8nfenkppxf6biud7v87q3hc',
                        startTimeAt: '2020-10-22 09:01:32',
                        direction: 'OUTBOUND',
                        errorCategory: 'rx8f6ubhgoopnq3dqmpwmwtwd2u8p6sbc54l3fvlu6efiso0obnvba06emag72acau54cp3zewk04n5iceklxxh1yt6vtlur1o5s0ye0e5ze6hl4zlmjwugpqxbmg9n3i8bpjeu6q0998bgrdzi6bqam9g7isng1',
                        errorCode: 'mvilmaxzqza869rg35ej9fcyjoqd1wylenmy64k8jrrnotw1wc',
                        errorLabel: 253341,
                        node: 3127784495,
                        protocol: 'lo272ej2ltcye3h4z1ed',
                        qualityOfService: 'rrmcrbktuigrsrknxwo3',
                        receiverParty: 'cnmfax58f73rx0bo766r81f10ubw45lgp236e8m1zatre2mbr5war9dvndfephmudo5u16z88zxy11ayko3r95ws7dxi5xv4mx70k2xhqv8nvhc3vxr74k1ezy1lvvn5tm8g1cj894nqqg1w4gs8wlxibltgtz5b',
                        receiverComponent: 'w1tih8fticih8u27c8cybg1itzssgc5uuxx1ty2mxn4sk6ez1he6l7tt7k7a3q7evlcp24w6qvpczix11nellslbm1ddujdongw08eo0rxued755jyam00wpjipxwpkwme1lo095htifu85rml393gi47noxnsb1',
                        receiverInterface: 'm4ukjibrwaxgf07y7c8vubnrcw6zjq0mi7wxouwe6ajh98u0rsc94om6pfyl7b6jtqbroqx8kzq1yblw45sz7mb004tu31x0bxfr6uktv2i24idguktk7en1kzf0pnm32ig0jzkovkig1x0bjiq4szq8kccpn7ia',
                        receiverInterfaceNamespace: 'sgwb6u55qpvhypwu8e3t102e9d70nnq60wli68izf0g55civk2e8yzkn73jcs56bzastqq1k870ef8cskckqurbaaogha9dnufb13qma6n049lfmt7dc5sarjhecyop2i7qokuo9dpg37f2so83h5dmfxeustkf3',
                        retries: 5707104702,
                        size: 4318907394,
                        timesFailed: 8504370275,
                        numberMax: 5957724358,
                        numberDays: 4826928836,
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
                        
                        id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4',
                        tenantId: 'e53117c2-7ba7-4554-99d4-dbfc2c1cedd5',
                        tenantCode: '0qvocxm1v946mg5du6y34dhzhvvn65mzgykc5vdng8z0f28ze7',
                        systemId: '2b2997b4-6147-4c2f-8a05-f1fd3f2f12e0',
                        systemName: '52us1pezfxc7q0kif2gv',
                        scenario: 'w1k71xij2fmzlp6w64ddracricwiimrihg6huimiseiv0hevlyuooczfinw4',
                        executionId: '54c2dbaf-1197-47a0-9223-8e927dc547d9',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-22 03:28:07',
                        executionMonitoringStartAt: '2020-10-22 13:42:37',
                        executionMonitoringEndAt: '2020-10-22 02:19:33',
                        flowHash: 'k8zcftn681vzvreofrnqvsqrnlp9yliksugorjk2',
                        flowParty: '6ywtq0bouo8jze8vgo2m9eqhhah1u6dq5xwe8223hpl3yb7ca7knsmeomwgbndb9ngvowxizh1xez2wq34jw1re6siur0o9lxy9vtfv1jztluqjk1ukrwzzxhuxbrozwp37nczcqls8iub7x6re6fkn4xu8yklyd',
                        flowReceiverParty: 'i9r96ezeoxr6fq5usdh6io9ohz26g3uxv49cqj3suptzu1o59tfd1sidiyyk5wydb756yt83349l492mja85zb9dryj6hu0goaewdwik5zumy4v5smg0k8zcmb2twlk8mc6bhrx78byfci02xkxxrct26s1rfhdg',
                        flowComponent: 'mfinoubpqek6jq9cfy5ihxgd9kqtd6ckp8cst3m43smar1vqf47ubntymrjl351azbqc7jpcj9ywqdqxo4je6pqvxefpp075usxgj8925o137jyifdkhbgy7hk25k1u9fxg3vhmyuykn9xe8ghmeg7qbqjivzmkf',
                        flowReceiverComponent: '4qn320gyl21toxpieciig3wpgurrjq2ljbunulylawg4ugnkdaaamfzmiqba2bwe1p6qz99iwlmmxzehylr0zlrjtgbe2ilgewefr4folfy34kskzgb25lnxyck4e49nsqr08wlcn0217mkad5jhmtijjhm5ixu4',
                        flowInterfaceName: 'advikk3s8ls7bg5qlqfes81n2jqhxvsbzsejx839ca8vjvmga6o3hueyo4uz8agcm2noeq2kjofx9m2n8huqhxcah66kx7fq5fldjw7pbxgblbkz9b2sf2cauepfb9uvxtn6vt4ko3et9mywdzd7f7mnozfn8bmt',
                        flowInterfaceNamespace: 'mbznkhh8ary6yzhdg51140hwfuvtw4yya07uqbt75hax1uc4die61nljzklno2u1qzk3t2y8qxa8q16fy7dpa8fjij1k07k6sww16hw9msd3lk1ka1d51ubj1t4oqfm2d0sw3gnpxgpow7usclqtgesunkjznrqu',
                        status: 'ERROR',
                        refMessageId: 'lja4ewvg37fj1ekwtqceq2etidfyozd0l2fpjrd6frds89o3bv05jzrq2i9vdpw281uppav1oh18oq4j6zg5ed69e4jy12tqk59cd7dlzc5hafdllwmd07epz7cb9bvzh8vf80sssbgv1o3iu9arn53snzv1ncg9',
                        detail: 'Quibusdam ipsam nam. Magni libero ipsam nemo id molestiae. Incidunt quas quis. Sint sit dolorum sint.',
                        example: 'oqlo424yr5r22p7jb8sksw3vmv2pincgkbx8n6bn18gjt04m328jibj3mhnwqcfdw5zqcjgt8pp773zfyo9eqz1tfwdlqjjpsjm13oowz5ihvelffging0osipx26d2lsb3a6rzrkqa3k2kwwi91nglofr6pobkp',
                        startTimeAt: '2020-10-22 17:43:38',
                        direction: 'OUTBOUND',
                        errorCategory: '1zqwoghz3gw24hf746256zp2ciufek9bivk2pi6743rdar59d7s371yk21owpuf6tiy8ql66mgjxflnb6d8wmlkqifgu30mrbfy4r4yzk2638xqhi2ootbntsuq2d349updzl16um9rcmnbvhyj858wl2yc99vlx',
                        errorCode: 'jzi7pmnxi20jcufg1bk13j24f3jqcd0rmwz3hgau0q4s9ovyug',
                        errorLabel: 598397,
                        node: 4488013302,
                        protocol: 'aoj5dwcbsoig7at3shr6',
                        qualityOfService: 'puy1cihlp8xaufoleg55',
                        receiverParty: 'qc4h8xjv16mwbosv9qvnkm69dv79k0d8cvg1u7kmik12ix3tzgil870ytoig14tqul5hha43ltvtco8kq07y6gwdr4aiyzn4865j0zwx3bg0w07cgbm0l7sakk32cm17ntzjjkzc1z168d0cuwshw6osu8ww6bej',
                        receiverComponent: 'r8iwua8xblfbpufkv496punse6gyhz9lgwdnwhaa5bubuv1lgghinnnygg7xkrl907p6f2k4xgpnop7iyeamymwfnyu1sos86xlqvq9q06dbjk9cl4f5bldi2bflitlyuz7iivu5vtjscn0urxs09uaik552ie16',
                        receiverInterface: 'gf0l8yu69t39dwap8jrvzl2nxynymiouinqyxxrpznavnayp354g0tfvzkdtxiz4abtrtltrucznu8crf2y8xavbbnsyyje5hh3wm7tuix4g1n4iap8ksibndxad0pfopoe2dmikuy82omrcvdgoqc7jj53dr529',
                        receiverInterfaceNamespace: 'nagudeih6sr00xa3sgkgot4wwbrzimod0cb94atx44yr8ulvtjurm7sv2avh0o2s44ur3y1uybsx7jouhlnhedssujqav12clxkp61hf15wgwfho0uouyftqggqy4w6y1h28nub5gu1j8fnbbchkjpnavu1objtk',
                        retries: 7629069197,
                        size: 2893147020,
                        timesFailed: 5043256259,
                        numberMax: 9161584037,
                        numberDays: 4198231436,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('f564b5d0-1fea-4cb6-a38a-994e4ba8dac4');
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
                    id: '394c0aef-ed25-4e3a-b362-1f063466f930'
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
                    id: 'f564b5d0-1fea-4cb6-a38a-994e4ba8dac4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('f564b5d0-1fea-4cb6-a38a-994e4ba8dac4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});