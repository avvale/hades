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

    it(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'iz5vlntjt4tchfnbpaqx',
                scenario: 'u12gmvynmd0q0tbqvb7b9a3y3o82l7o1bjd2qon218r43rod23ac63pck2gt',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 13:28:08',
                executionMonitoringStartAt: '2020-07-17 15:44:44',
                executionMonitoringEndAt: '2020-07-17 10:58:07',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'j4pfq564s19zdckk7ti3zux2h47qr7jvlsf6bxt8x69hy5m3blml96co8usqhphh46xkf8zi0qe87j0x854k8j67g3gz0x48x8khoy7l54icg15nb8yxw8z64mxfzrwv4y5cpf41zhemyufcdkybshmmh093cn6s',
                flowComponent: 'cua6o6hce1anaqy05snu7qlg25mt46bbzo8fkiztlgj8o2ez2lnt697jrhqbsef355ksjqnjj8rw6dxinj4ulwtgybmqfskh50vlq77qy46uv8vg7po27br0qtut4x2cwzwzcdy19vjiry8vueowunopbx1zf016',
                flowInterfaceName: '0m25dkk4eo7un3jd3zmfudszcn79qvzrkho7a3ini9430t8480hu0swny8zsfl0r87d2venqmjwrdkfia4aatf3css728xl9kwt0p02zf78lz6n417xpgqy9r0ix7sm1661cb7zmvcck1676tv865h7ppreo6cfb',
                flowInterfaceNamespace: '0jhryinhi51swpfho6sjw4tkjjxbeokugyinzm8jyudqbx3wu9q1k9cdkksjmhsu67a6p7d066xr256io3ceaie4udyldfex65pmxlpcdkpjd4g7ixy988ttcr2dgk463csprpx5ff53rg089y58fdid4xqp0oo5',
                status: 'CANCELLED',
                detail: 'Qui aut ipsum. Est est in ratione velit ipsum ea. Odit aut hic atque nobis suscipit ut sunt ratione. Reiciendis eaque odio consequuntur debitis. Ad nulla vitae non dignissimos.',
                example: 'caqet0r8hvfytn1ieq9lelpi536bej3cppohii7j7xe3y4dd0si7tkfa0rhm9wjl517go9b1ovrk04nbm3wzhd2dllnemsbk9dwp5fbizrmsfn79eonppsml9nej0v6rn58gslbqzlegtsil1mp2b4ex3br4f7oo',
                startTimeAt: '2020-07-17 06:00:19',
                direction: '2miwgxtsbac7b134n3y7',
                errorCategory: '0o101q65oul9n4b2dinm7287g9uufl4ss0rwsv4w2lqz2fs88b8rzc4cejb4xesl9m2j67eujrz9h7zlihehr9pc50n2if91ksrgrf89hykw3u0afcrutugpkbtivrscjifwmlneuy1xnl3zxra0e36cpme8nxgk',
                errorCode: 'nu607l10lb4b7urcmk2k',
                errorLabel: 'dafedqjaoajr1rlqaa5ldvhb458kf1kuevnfvj78d1ml0xr4zsgz52afrucjxj2qxezo3q2jxyjruuz5uydlijsltq61cfttyzgu3wgzly6picczb5qxf5ngeccnohyk1awh876j9v3wh9fvhuwlqytzjardf9up',
                node: 4401285877,
                protocol: 'dan2yui1h4et7rsc3skn',
                qualityOfService: 'p6xuvp92yfdxotj4mykm',
                receiverParty: 'vpztnjan1q4kc46m8yo0ouhi80uz1r0e7yjanza6ca4jds514ko4k7q6m36i8ysss42xki9znmgmav98yx1gpf6xedaxb76n1pzv4kav6il86vqiylmgzxcbsrzf16u2npu9wujcb21wzadoy6lw6itknovu2tn2',
                receiverComponent: 'pladffhr5wrsb866dfle6dhx8xe2e5wbzxnb2053qslxvdi09jvwpm4h4ux793yqxfxm4k1j985vp5n1ala5crarenlil3j3nzb63rlff27u7b8ds4x3z4xq5k7knsi3dzz6fplp445pbj4i6dtuynqphqeo5pt6',
                receiverInterface: 'b5jcetrxsfr306baolbg2reuwtzws0sw90gcaxbyxrt78cb7wqhsnr20rcm2ajwvtsgmr35ydcp9jcaxlo50nzcrgwxb56rl9qghfi6fmtmytbcfogbtuc3agmy3teqjk0k3gneuf51odc07ag8o4vt14mvq07qk',
                receiverInterfaceNamespace: 'egmzgsj0rp8kkjcyzj1c4itik2p8q97juwqvb6mdshv07lygn3jibev6mvodfw61g6to7l7e4xv8p0ej5cc6r5j0fmxyk8vngzqit0euhgk1k2wjvve9rvcb5d9hmj9xia7ct7k8kbi9ljq2cycu6si6qmolwd0e',
                retries: 6997417622,
                size: 4049059689,
                timesFailed: 7389229248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 't86o9annxqmkxqcd6tfb',
                scenario: 'xyf6oshr72me39g6kdf8d4erdrq1ploiyaxsnbx1iv7zn4atbxfdxqtm7ld4',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 11:26:01',
                executionMonitoringStartAt: '2020-07-17 12:21:56',
                executionMonitoringEndAt: '2020-07-16 18:05:21',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'xhcslf7vzdj9npa1hdbt5eqk57arlzcj1i3yqcpthly4tzfea8cyg6v5sv9aspcwzo4zterre5qufxzfoo8ql7wvvtszot8x2tnote0id7ul3jim8hfnlbfa4zxxtnmfsa09jthlsjv6bfmaovf9wop44mb6reo9',
                flowComponent: 'f2c0qiaxr5lua80tkqqx1kupmrtin5zvx9xcr887unboi7o9ddsgays40s4qh9ko5u4gcwmv9qkftoapx5ktqo7inj9pskej3mcgdjbsxdu03in88xcncguxmkf67xpis118kkllb0twyawx0fw3c1xf1hb69lha',
                flowInterfaceName: '9r6nvr2sg9vjurdohv8o8xo3zapomud7l6x2dc3r1nillxho29apxkgd1lo28yvav7vtnujnexrfaz1s3h1309azacwl2t9xohmfqixpnbt6garlycgqpt3k9c1h4etqygs3k9vfhox3jqwbw46ts4udd3kjgh6x',
                flowInterfaceNamespace: 'zkukl5cjt1rfp24akcrtw8yqe5c39spei2cgqfqizvtxphmqipssswhj4fuow2ufov5emycmy1ly2gnmguhu00hdafxv3x21svbdk8zgu5blldb3pmvo2xm8ykvnemelkqvq0uy65bwbb08mj0ldntekqj6b9ax4',
                status: 'TO_BE_DELIVERED',
                detail: 'Saepe illum a ut ut enim laborum necessitatibus officiis. Quia ducimus facere. Numquam expedita provident ea qui.',
                example: 'b3lsp9ixkjz963rwl2c8bp6o1zi4hda7l7h6hqlomnsgofy2s7tbjvq0vfty278kh4s86g9x2s6lnhrd00zy147dg22bgf47triqk5kfljd6hung248fdbf2nuxsb1nbbyzveg5rc3dzo53383wg3z78frawlp37',
                startTimeAt: '2020-07-16 16:46:41',
                direction: '7no0xdyhxmsjxyp4dqih',
                errorCategory: 't22k1v2xi19d7gosxe0ie5s4yqldhqaz3cjcd4t1mm7qn2d6ov8p8sodf51b6ipms9f8nbtiu202q25mo3xzdyibwmi28zxay1k5zxx310dcjxmaipt92qpse2o8nl8qpir6q5h4x242vgfhb9yjr0rcg9bbyk3d',
                errorCode: 'efaji6zi3yk1lbrqqwry',
                errorLabel: '3hmm68e9lih8ucy9idnit3wnksmfk2nr9wfb4oleldxqn13e0ak026jwn3q7ciyncfyia46w9phi0vy2j86dxt5bk7jb1oadvxu3vhcymdq7fcje3v5l1g5rd1o72ktrbb1m7pbq914vofjgr55mxvi7ey4lvw4p',
                node: 6238976150,
                protocol: 'ndqjjfxxuzzfqrjtmg12',
                qualityOfService: '2kygugmlxqi5p4qtm6dc',
                receiverParty: 'tibtl11ulvpuwbzfev137a5lpglh9vuibjwcn66wp9wqu7io11jrofyb9yw0pnfy9v5rw7axbtd6zpm41f87dh94getdyons5vl2ij0m722bxa49o3o0ccnkjwppau6j8nco0qxuyj3k4ii2h6uvpb6k9idqwysf',
                receiverComponent: 'wnu4xh7i3ejdssrfkh2hnhujmrqhfevqahtinsvfsiw2lcns73x9mm7w0p13g5odxd173bzkd9wzoix9o5kbc7bkl5msggta188k9y7u9efmm1ocpk0gv8y9cyo2nlnb5gv72sn4f8v0hufm759mrwo0gfx447cs',
                receiverInterface: 'e463x7gji89yutr8nay4j6uhx91jsy5ekznwo36xdbrulr4c80s59fnd3up8mwduwna6pu5wn70nxgkf2oxw1ytbhsixmyxva9djnu5uqzus9i3x8z9e34vpvph3rrf80dhi5dqa0hoeb8ajryg8d1gn59h8ejt4',
                receiverInterfaceNamespace: 'zxwvd7w01fj1hws36jfjl7ntpsyzcnec6wv177ex5g0rwp607tzpgszlhuedxzjxlnn0kuz6b4pmnepk1wog0ri8h9j8v5zmziy3s7x3rb2m7ssflj38c0z0cxgxt2ipxwpjtj4v5cowr6yugxqszo400rr51ukd',
                retries: 5999089254,
                size: 7070227081,
                timesFailed: 3882160670,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: null,
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '40kwrzm9wya81ymzm5w5',
                scenario: 'qzaxg353hietecxz6qnl7pwal2z0elzksx5umlyh3eg7qd219s7fjzkyr80j',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 09:42:06',
                executionMonitoringStartAt: '2020-07-17 00:41:43',
                executionMonitoringEndAt: '2020-07-17 04:22:02',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '606uz25zxzdoishe6m7wjzajmvft5f6sovbya56ggm3ylkyg895so8pdwa55zpmxlp8lyxympml1asbcjghm4kpo3tqqodm2ev6xbgcwt21m8qslrwz41s8smuiinagsx534wxfq6lmumonia2u0rxnvrebr2kxh',
                flowComponent: 'juanhf9u08b86ljuvh9ym4xlb9qpi6g64iopn31dx5cyrp1fys4ckavr8062s120wh5yxaxcp514mbgjlas0ln7twm89i5t7j70p4v57zilokug6rpvwlxzcdbbyoug9tuu9q8tdm1x81m02j9hmo3kyn8r7plb6',
                flowInterfaceName: 'egzco5r8eno7rbsgfy67firhjukdpp6if46img66b5qx7439tefooblxk0rjir198gz5eopenwtvahd027mkr2gcmd73m9r00xd14nudfzylwbg8o1ngsgbmcf2d1kiunivs2vhzhwn87qpuqj9b0v9kpycj9fts',
                flowInterfaceNamespace: 'kgoajimi5m63v8tbz670fjdifleabp3q17u6qfjky9kgibfj342b3omp4xt6dma7t35ygzf63snqqhogr2kafr2kv4yyopudu0d1y86m21rvfjy1br8kzcx3rry3jzwnw7g7u0rza8yg9rm8z7piss7bdv8t4v9h',
                status: 'WAITING',
                detail: 'Et qui non reprehenderit amet nisi quia dolorum eum assumenda. Ea in quas itaque odio possimus. Magni at harum dolor illo atque quod et. Eveniet fuga et id.',
                example: 'myasxsnkdmvdcaidyxtzjx82nqs2me277xscdd82di63ek1z8kfog4h1txrlkayvhfbj7ndce1ph66d804ungirsps72wabu148ji48w3yqrk0eartd5e68hb959cwkk7az56xbl2r48j2vih9td7y5evvk08hd4',
                startTimeAt: '2020-07-17 11:08:06',
                direction: 'm5geq9yop3mvhxndqzo9',
                errorCategory: '4wiietyjfa9kgruytzon5qemdm0ldl2oefr3msairzwta76e8iqg0x52qs85wnvfopql6inzhzgmei00n4ldnqy0ndyi5etc6r4v35btbuo6g0x7alq3w5sxvktuc4fmev5htu4g4miewg1mwhdimah1amefc91s',
                errorCode: 'v8blxt659hhnyxqxkux5',
                errorLabel: 'z27lw9ymr32kqng36hmzfgg6lqv2w111egtif38ju2rizfucdht2plyijyad0eodi34463m1i1lvvg41onfr7il7h6uhjmip6mcdcw6dbejo33gacses865jk378n6whulaee087p19f8l9p98tn9vjfe8fnyjve',
                node: 4338905415,
                protocol: 'wi9c10fy67tifmqnt7xy',
                qualityOfService: 'jnt6b9ij2mtguuj50dct',
                receiverParty: '2m3dscidyhgqtrbdizlcoourw6d4ttrqmpw1nu4zt8rko4gn54whk1om9nviwl8bzdhmmuga7uznxcd4tbse1ms8s47y9n6me0i8ufd5lz4jp0afd1q24v5zxlajqo975h5xrona0i03zxqs9q9lnj91sfv8iaim',
                receiverComponent: 'l64wcvihcmgh3i16uzjdoj1q3hon5pdsm8yk3xepnu09ggg7jabw4i2k8zi1c0zk2ujgzieprm0ubdgq9p0m21mcc43u1hn9ezscdsp69by7hxppieeksdb8d73lpj9s24ubck6672evu2qyc32itrca804ffzgz',
                receiverInterface: 'fyo1kuvib0jcg5y0m7crqq2kttyytutmpupnaogii0j3zlhd7n53vcxhxcsmemv7382cjq7ulw5srfww0vi149st3bsifnka6glegf29b2jzmtuyuozhhag76ydo5798n8lsvnyreatb4ubk95gem4rs9hvleey8',
                receiverInterfaceNamespace: 'ar0mgr8lxy4ta68mflulr81ejwvy4aghh4vz32r682z0o84c448f2fxaxj8r3bf2q4xlxj4n39qx05d96dvioxeeuppjximx6wbl7j8lqi800w6gcgq2e2xew74i62glmo8yo5cigf82gyh9ggy3sod05j79p4kn',
                retries: 9911741387,
                size: 4736065875,
                timesFailed: 4601369796,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'xlwzz787smegu505510y',
                scenario: 'yworj8jiq85kr210p0pdadczyvjpgxux0il0bb5nc2qqh7uk154ktlygab5j',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 21:20:57',
                executionMonitoringStartAt: '2020-07-17 00:59:27',
                executionMonitoringEndAt: '2020-07-17 12:47:47',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'zrluang8pefscow379o5qdyr4smvofjf9yrxuq9dr3tcax759rxvg96gzqde13rz91d7w75iybyyitxr0oh8tq37sdt7rdhl6w87plp57xq6quw8k08txw0zop0oto7c12uxdoy80w87r3d3g6jy2vsa2qr42422',
                flowComponent: 'n9cpco5kbgiq86rfpt2425l2n9ahcittbc1zppvibb2l3rdc6a0ivyzrrembd6jx4l3bkfz4egcvmbsefmv09tgt2urpaeay6myhvobihmrims4fv32kbnunch5thlf5dhmx967zidle2yhjw9zinv6e6v9njo9n',
                flowInterfaceName: '5fg9xec0mc6w9t7c28clhw67f9tajxn0njbr2izlga8iw73wwh9qqm067w6v12r0dbqmq886iqsedgl218xsk9o7iowr1tln6k53f9hbmxyfsuw8kp0ej0mdlaw06x6jbrnnptlnt0zodwq9hjdm4ir2xy3pjues',
                flowInterfaceNamespace: 'b9stfm3a9r3kh996mhnn1n8w976msqyft9p69z3yorfgqnmht2qquoud6fddnnpus9qjpa25a2ur4dv2d9hbrklt3pdns2g6f3sxa6mt1lp6d4oycrm3w0cqa434fnriow19rwstixtpg0s1p3cx42yiaa8syx95',
                status: 'DELIVERING',
                detail: 'Animi amet qui esse aliquam. Quod aut quia aut eveniet recusandae voluptatum inventore facilis. Sunt exercitationem nobis quibusdam ut quasi incidunt non a. Officiis quis vitae voluptas dolor. Fuga et suscipit rerum quis quos facilis et voluptates in.',
                example: 'ml23arzauwkqdah60p1607exkhw3o029tk7joiou7t579j93f0ffbotmtdqs27eku0k1klsbxslryxahr8bpe5lu1mlr29bi2ftj17ibpg6avldl4n4u1tox2kv5t73bwzna55z004cdg1biwr6lc4vezqidelx9',
                startTimeAt: '2020-07-16 23:04:12',
                direction: '6qpq23kt4emo0oaxxjlk',
                errorCategory: '0lp9syxgscqrezci0dmjqji1hcal4llwlna0n0utei0ty3d2p8e5rsw9430epci3kjfq7b1ntyrkzh5v0v3y149us9n6hh0kmjzm6hy3vn5pq0x38x5z55e006jw0lpmk12joit2yfi4n7s2tbaa9cgrq15d2y6x',
                errorCode: '3u2vbu9bdo7aj3peucky',
                errorLabel: 'knwofjolzlln8l00g5py6hsixn1l0ayg26v4fyarbxwdgzfm7vwvvzohrnd8dsjjjmiuq2pqvlph0xcchlepoakbcic365q7ojn8yg81dfu8as9xm4qj4zuu3gs6n68xpcfdn4m08xwjxg0t3sfe839d2j8827xe',
                node: 4611914284,
                protocol: 'vh1oabk8c22axg3pssn1',
                qualityOfService: '958f3xyrr8srlgzpi27g',
                receiverParty: 'zyebdefngk1n1sa9ze02khrg6eod7i3vc1hjkht208seaodygucytd3zzo5tipeeegomoisodginq0n362zb8ii80g4mn87e6hu76n6u9rpmr56t78oe3stwpyeaq7vosgnobiy3legl1mcclqhn0gh4jaltd9h4',
                receiverComponent: 'w2hcnxmnrkd798uwrydszdl1vbqz1wxo3lti2do86i8d8rc5q0i19xtz8ola42ousydnt2kb7mxt9dgjvcgp2blludrakcn2l8kd4kiix6m7n0up5brny70orv0bib4fifyowr4eycm07n7ur131iz4ki4ip5j3s',
                receiverInterface: 'nvkv2an6o0uqfupngjzsi53xas03k21nrpiimnrl6ve1igz8mscqarcd5dze0zhpwr11u398ewqzpi4m915js4b1ng5jh37s89hgzt6yns1s4250ktaqzdwo0j9hxauu6mcsoaug5lojh4cth9iiv5tw10mqy2xx',
                receiverInterfaceNamespace: '6e10nk5audyn5he2pghtjjtxjqw63n3se9j1dtrsbyitvyfm7omaktqsluy0vmdgs11yhovo538i07hnta5h3xh892u075k3l287n58exxltdim0jkrzd14g7cjr7kgqbmth6196pacpa8yidgbtnd2hqzg11myt',
                retries: 4378445657,
                size: 4625778368,
                timesFailed: 8839638669,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: null,
                systemName: '53u3rjcr86jep5dahvyf',
                scenario: '0n0zbmyndubmbozkz0dy61qzistt8ubztiliyc3yqac0tjyoe206vytuv3k1',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:14:48',
                executionMonitoringStartAt: '2020-07-17 05:30:18',
                executionMonitoringEndAt: '2020-07-17 12:25:11',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'lefc6tudwu1c76l1oyuta1nnodx7qiwt7hpcqt7jw66sgjkw3ytk1295lh2a3xc38q5a62knk6rguaf6izr4grx0dw0kh1dafbjhxyeiuwrxl2sp8nakpb7rtm0ltv6net12ill6h0og23yxoz58b117wcoyzmp5',
                flowComponent: 'mreuh6shy3lqbn9ru968u1m8gw1me5345rb3er28q6d4v5okfmojobihlaql0m1pcbsi08rhb5p7muuym3g3zny5kul4dvsvpl55y9y540nhpiv6ag5s7f61q19ydyo6hah9f7egzw5x4xcw13m06359jm70i5ka',
                flowInterfaceName: '3zbf58ea2zj6nycc0e98g89quvcl4r9u6cwjcavqg3uxbs6a9t1c1htsvnygxofwxtzhuc4nfaxl2nbonqyne60psziybudlxsz9tx9yq3mcxhox0vht00ltei2vrq7fbopsm51d766qpdrndvjetwj5cwwl8ac8',
                flowInterfaceNamespace: 'f0f9u6dfvzlrr7xeh6zrxl38bbdc8jy86jw0fafl7lojm8e1mqh0xan0z6qeji99a8bhnp02vs0a6ag6d0owzwa7opymdby4d2d4bnztmuezrqah879eahceyqy2jmnzamklf6ikistdoq54jdudlvyombzac72i',
                status: 'TO_BE_DELIVERED',
                detail: 'Nulla aspernatur nemo. Reprehenderit quia soluta odio. Rerum consequatur quidem et id. Voluptatem provident veritatis quia ullam quas voluptas dolor qui.',
                example: 'xgfifac7btm2ut2y1rtcfk330ei5mjn65l9mnv9ce49u43i1jv6rs4e6hvwp78r65oo1iyoik3p9b47aqhmagmhu8ydvnnbzn87gc6lh3vsaharn3ynxpvthcrg10ve8znstccwa4y91jb4mw4a4bbjfeezq7c2k',
                startTimeAt: '2020-07-16 21:10:22',
                direction: 'vdu1sedxtp2rrblkheqt',
                errorCategory: 'tqcaktoqzytdini91vyeixjv4wf3d5gta6qjlqkx0boes6i5ae90dgz70vvej2h32h36mglx3gmls636bptotnkow7zp4q8nr01gg813gag14p21r4hm2p1vlgtkfxt357lvrqon7ghybp9cszxnv4yowb459tac',
                errorCode: 'vxg0jnk7p381dg8a75vm',
                errorLabel: 'sl7fn00frx0em96eo1sci8knforcaw2ancxht3x3zafoq0sxoh7r9tavpja40p0mt71x4qvv7soda9s1diy7bg25mrqjonffxyj4t7ynfb9gt1aqas11cyroqwj5zblbzgf947kp5ykekmo1ii45e8lb8cug58gt',
                node: 2677677554,
                protocol: 'rihiqzabdnfvh4xqq4ny',
                qualityOfService: 'bhz28amxah08psfta3p4',
                receiverParty: '2iid1k9ssdvutcmhbwdqi8lfrvtbk38gdd6kjzw2kohsqlaer55y59e7zpeu7xskmmlmbm20wxb6oxepuwap7bp8tipr489a7f5dv020m5n04yhjniu8rp7ntc4ghy9nb8woauphjisi3fty4g7l6peu8swfsguh',
                receiverComponent: 'mxm5kgtjf2xv38jdvv6cf2q1oh29pmwtnr9b7rg1vi2dj71dsan0o5ijvf9a0u5n1xdcmt8l7wovackavfunu7gril5so9ez6nc59jfxe5ycgw87hhyd3f17gp5dfz99ez3c8zk8ixbiycqabq68xsghrgvupqel',
                receiverInterface: 'ui6phedj4mjpv97g1bnv8ewagezswtdbpeeigdw4sj0qbdswt67i66v3afs1phlian526ltafdiy1vonf3yawjqsoqx5rkox3o43ejpcymw0xt739oz3u7em74luvv0swd5aap9s56nnqfv9tn02pz6ndnyfnl52',
                receiverInterfaceNamespace: 'cax4o0td8pw5rmkm5levzkywyszwdva7ye19844oxfhts059nq9spxlxac48yl8n7ihk8uqegq22h6bvwsdt99ademe0nc7k08jtbhlrblt106v8yq4ac8i793hkql67orfvdxgn66ebg8szbijcxwka1z7pibc9',
                retries: 2474721489,
                size: 6737115957,
                timesFailed: 1107665520,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                
                systemName: 'e8bq9t9qvrqffkygja8k',
                scenario: '2gkb19bntfrpaov8iyjej9utjqyedwo61rftano7vlatkuegqd2sgyquikwn',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 02:04:28',
                executionMonitoringStartAt: '2020-07-17 16:15:09',
                executionMonitoringEndAt: '2020-07-17 06:50:13',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'vx4zi2j000o321wxdmq6ul5plcl39fio2ux9jlzzpiujncp4bl9cc8ohi694ecy9stcg2csj56xkwldlsaswf7hvu075os13axktl89x8d30bu8wivz0qg3pna6k3o1akq1bqvzm7jmvku4wdr2l9deqde6j19ny',
                flowComponent: 'c0dejv9nig7tp54xmqibrf378nq3nwqdk1ozmpkiutyjevjoic3jsylilj2jegg8eos9e14pouoe0h246a1a31v28xob7z0ccve4za5yaxm4d7vyo7se2cot2po1azhp36iyxgcu5z7w6tluc6bout8xel9sedh2',
                flowInterfaceName: '1v62rholaymjuznbbeonrbbnocu0g43zs0g2bksi51zhi27grnouz1hn1mb0v0f5708vy91vhhylchwmxf5xs12blxm045y6h1wpwho2k92aftk1twb2yls3pdqvyiq81mr0l70fx6gn8nixkbt59zi3ubuc1evg',
                flowInterfaceNamespace: 'unan27vawmadw68uh3s0d6mqveok2nwgbivwvo4yd7r4znbkv4m0r6glhmsoewzxosx1y00dgq787iw2d5o5pkkb0s789dfqbein8cnbyi8h6ooypmey70y25nfd1qvi0ittvivueybmy5jc62r1m76f4x6e9zzn',
                status: 'ERROR',
                detail: 'Rerum omnis quis et ut ex qui. Sed accusamus soluta repudiandae ipsum. Impedit dicta nihil. Iusto repudiandae fuga at esse suscipit incidunt qui sapiente vel. Et iure aspernatur et qui voluptas consectetur ut facilis. Assumenda maxime expedita nulla temporibus.',
                example: 'jsiesqvh9546bg2s3ab935igijpma5ai0wyoo0yf20qyed8m30rm1x17o65ah4igjjrd89y0nk83c5ctzkrcr1yr59hvzogrz2cn0k2hmd27l11vhsxsxauebc0kah9wlrgbrbmm3ijgafd0d2vuz9ifrbyieky7',
                startTimeAt: '2020-07-17 03:10:07',
                direction: 'dr061m503ize2fc1b8gb',
                errorCategory: 'qu8xxe6vdpdn4byjks0u18gqz2jryr8o1lvkhegjy40cb7hzeihhuvchfbq7lwjyj7t9uayqda08h08b4278a4azbbyvh0ah71neq4la0vegmwu89l89mc2noymcx29jwvz44kyy593y4x9tmygzslkkmtkot1gi',
                errorCode: '12pd4j522f8vci9avq1e',
                errorLabel: 'dga0esezycxpt476oye0j75xumlmynsd76agfhrcrwz40nh8uhny9ox1dozkwjy1qmf06o45x6agrf3v1kxpm4stlhh4zj4shc9hizzoo8cgstczrlhq642skm3v5sf9cjt606fia60koykxg04dtnuyit62dyvg',
                node: 9506331247,
                protocol: '8y5zixrnkp1rgt54k04p',
                qualityOfService: 'oavj7sdxl6uxq2ulj7s1',
                receiverParty: '1y15fkdny0f3u38mx5uy0yhzcizi6epyi0yc5cp9zs4ee44fyu3jcqz941jvmksrzes583qjfdtnf0rg72yldjt654byzalwa645rpqobyk1m44uks8pwde9xjgcg0uvarypvu2vwtizt197t7t76oj7ccr5vlip',
                receiverComponent: 'ssbcdxt4id3dcrjkfyxxs231er7taqms7gdbdc3hr1otaswt0x67mc66i44wwvyml7sgvkq0hbctnbib05kutjuxrrmo0mvxmlfwaxf2kbr1xbifo03uhhkimlrvzruhi8505w3dhwbowkfr1u5fnv9ntdvfcqiv',
                receiverInterface: '8bfnwvjbi6pj45ehvvnt588vax482veu5481fxt88o53r2iv4iuqqun8zhvogfqux6mi23hcthwzy2775unx2x120cxmfg7txz6do561129m7tvknn3dgeijmolar6ymcnxgnj5m5gt76yneu8d3o2xbffbuw6lu',
                receiverInterfaceNamespace: '9z31unzhca718u0l5qhe7tzofinj5t5jh7a6vrd9d9b7m68p0ilti3bbv6kxpwm6kaae4d7vfoy4ag69qa2tm3zu059grh8abnmfwx9synf7brykgcc8uet6j45axg36f5xy4gazbc4jxeikzesdkx46ph2c9u1v',
                retries: 2476134574,
                size: 3549039015,
                timesFailed: 6949144725,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: null,
                scenario: 'r8zq73uhwddrvksxfeg0b4a4jton920n0bk13ykbhmmqtoy4bwo4wmqf7arx',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:58:39',
                executionMonitoringStartAt: '2020-07-17 01:48:53',
                executionMonitoringEndAt: '2020-07-17 12:09:58',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'ltwf0hce50n8zvribhdkvfqgjytouwh0ndke9uz4hstr66mqjewwvvulrryu3m9std773at8a12zemhzo1spb2tice2x7jjojwe9kjuj64ftduwgrz8w91lo6yeru56clnhgeheoydwyeudlat166co69z3kxgxq',
                flowComponent: '1bu15honewqc5nrjapoppn0npd2au0lyjm3168yqp7nxy8icm5thg6s1629i3b6ew1pdudzobru9afdhgtx8l9yfm78c9mlewk2sq3m2ylq00g6irlgful8nfpruk2f046jfr3p05v7h16uyevyuw2l0v7ycrd8a',
                flowInterfaceName: 't569p1mph8r45j2hncaxfwbgr4spybektdeo5zujazjb3k6knjr2zn78hd6ta7isrlxnpzp0c0pvy85d4f46zwp4362ga165l2bm3j951pc4hk8xfg332lt3o30rrp8v3wxl5kuzw610w0p6tx7qaeu3n6hs726w',
                flowInterfaceNamespace: 'iq2zbxxkzuk43zoy6o6tpdpcksk9qbm9lvwah3uuu4iqrykthaaewrtf4wkxx1klzxr95dnomg8jm1ohh56clth5hm4wfwuczc4kjczbexpvlxift1hy9ljxt854fua39xtpvrs8kulabvae9z67p8cpniusx5qx',
                status: 'WAITING',
                detail: 'Harum blanditiis id dolore necessitatibus aut quisquam sunt. Voluptatum magni qui repudiandae fuga sed illum dolorem. Et voluptas reiciendis dicta sed.',
                example: 'mftvf76ur72mjgg1ykxuvwj0soxje57r8ig6v2vol64mtmnyvga874sc2zbl8fcwotcsbe1fl2llrutwmfa3yeryy2sc780pew2jh9igfeo3sruky8gjp5am5m8s9xoc56l98vfe24htfk679gqi5zxh3ob1tmja',
                startTimeAt: '2020-07-16 21:42:42',
                direction: 'x5w1f02onhfrtsq5fy3p',
                errorCategory: 'vxc0s9tfu3agav9wkpq3iq8mkn7o8x1g2vl9ffpi1fnyhmbqfucsfok74a0d7f99d5oq61jv76lajr8i4sk8lvrbe0c8u0k0gs5hoaqlz3sryzyejbchgwc9eirxk4nz3rognwaesftbgd80zhvvwarui2xk597v',
                errorCode: '3lquwhqdrhuw3841s8dm',
                errorLabel: 'hd1usbfcypgkkienwxlzard648h4wa8p4c5w9kh0erdarxe7lyjhn7jh25975d27vu4cim9nzlmyskisfkmo1xj88xiijn6bal28j8xkas00tvo7edrplrqsbtmmgqn6fep3frx3t77vi5fi8tl377qexcyuo3tn',
                node: 5672165956,
                protocol: 'q5h46m8w5kva9tou7o8m',
                qualityOfService: 'yc7ceh8bed4nkup0nljg',
                receiverParty: 'ol1l7sir40awcqkb3l2h1q7mcsanaqsx83lyxgqxwdrw7aczwwrqe1qdafx1jj2hz9dri45t164rw7u21g48kpj9v3j1o6t5cyzclkh80ekx86aletkfjpxmtaskjy0m2iiylkmuqarh9cmmftrxhburzwtbe76n',
                receiverComponent: 'u76krm93aieg5lkytmuczr2yg1qx15g91wf88fqm5e7bvivy5ytcwltgs516ixcz6irmgindsjy0mgyc69bkgn3553xelwqqt8z41j1eru4uy32f0tyi6m5hipoitlywqr8w328h8rzo43sp3b518g4xi51sxllc',
                receiverInterface: 'f69jtpi1965mjv9foodetc93gq1y23k42stmmb7tp57gas96ckwn8eh494w7vlhjridzpm7nljoa5dmxjfbps9wl2r09r31dhgpooiiiwbfrex9xlcu59118kwky4idl4ln3pr66ewnm8q46t10e0gxxe6dnrc7l',
                receiverInterfaceNamespace: 'es95qq8jiwx755xm7js7mwf21pree09cpjr9c97b2m41pefh4hh318h1wxxudh8bqau3vo6r4hazofdagncp4yt428fosvaxx77d54qta6q1lkl0mse4f4x4yaddj9kcp29hh90fv5f42yxky1gbyp0fbvopzfbe',
                retries: 6775673366,
                size: 6718599983,
                timesFailed: 8915109652,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                
                scenario: 'myw7oo3tnxmtvvag94gnjjnysaqdq6z5b1wa77w8i6i6gen266wbr89ghpfi',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:51:24',
                executionMonitoringStartAt: '2020-07-17 06:05:38',
                executionMonitoringEndAt: '2020-07-17 08:56:53',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'blxvvya0wzwuogtf98w0k3t20i7lw7d599lc1dos5onmj16pa9jn2q6uln8dw41x1lghd782rcxss2iwgj0qr2pt27zq97xt3z9omqqs39d7mosqlkxbeca7511atm9w9vgk58unvllfr8uyty5d7el53bxtikhc',
                flowComponent: '8liouwjfl9r7x55w66wr3bwt9bralhdo4fvnrzpkgicjveiijp1123hhlso4irwwfexuifylitknlrlxxo40c6t9bb8k4us1ydd7fynv2sa3bn1vl3aftlbb2lt3j8b9vxb62oa7s2chyyed77r1oigt6th9l85x',
                flowInterfaceName: 'ok755gbs8aqojusor8rekdungfhl4kwtio8frn3umj063e1ijl8ebphoim3af4mj7p41k5foxmj0y4gdnx8sec3gizk1znxr4sl0o6xj80shihr2fxd9npg6jwa69fmasj4tflhjqaamlcgata1pik11r6e1es45',
                flowInterfaceNamespace: '41h6biqa040jt94feld65vje0m124o7wycnyggxdsbrniz70ws7ultuy3szfgc5gsywmzu4eny975rmxgc768hu1rzsmivrq2yugdfav84jqdejwn1qdue0lxcui56u4ddg8v1tq0f2sj6o26vj15n6ygy4a0rxo',
                status: 'WAITING',
                detail: 'Corporis alias incidunt excepturi. Sit et aspernatur sit nihil minus consequatur tempora quis. Quo qui harum repellendus doloremque. Enim fugit in adipisci deleniti voluptas.',
                example: 'jerhyvw0psjqnmn72f0jv2pokjgrey9jwevc0u8vosidwbjcy7aw307irkrgk6iolyd8drww55rbyv22wqe39v1w61g30wdgu6cr2oa4es46dhccyk8mr8o5w7s2z4h4t9ns2q84d978cuw27cq5d7xz1x0hzx0i',
                startTimeAt: '2020-07-17 09:21:16',
                direction: 'l5jv1ce7544z5o73c31q',
                errorCategory: '7lxo2joj3uw9350dswmmy8rmfwes87iukrnudzeuvqdv850d8tmagy39akcoqma71i0z72swo2aj7tr703mp7935h89ef4st90ujgr3r0d7pzxfmnojpmycmqc7npbojzu6isn7mi6r0f2owm1vkyjttnzt9clc4',
                errorCode: 'zmyxxloq0sva56ijtonm',
                errorLabel: '9e63waedeu4pbxa5hebm2t2ykxizrh59wu008b6z7e6jvsqezc8v09dcwvzzkfymlto8zzxwq33y6nj84jyxmq6gft83vtu8apsbp8t428oodc2imtyrqn9iwppfxt2tzgfwk2i8cgj615g0d31zy6k66bald5rn',
                node: 7920126190,
                protocol: 'zmc2b4tjtr46t7uoc7ce',
                qualityOfService: 'm2k1kbec1gz9vq7f48jx',
                receiverParty: '8iw7fa29fv7i95gn8emf398b02d00wimpkewumvo6vvg4qjv356nh292b1mx6u227nkztrz3npb07dtkqkvxgbg3ccubk19ndf1ajhg38oncqp4o7x84bcfzgrjrphwtsf0bsvkhfc526bub1xsl4j5soml2onn0',
                receiverComponent: 'i4lsw0xx74yangsfo9qj3cft2iqibclgn3lynril2vgjd30m6k8224n97hxk8pg8g4u5skvqfw8zpqg0ln7ov65xtk0j216c4y2q55dnd5lye7iiw97w3mlang0dxnhrz8za30n0357ehbu6kvi7yt6iq4u90gd9',
                receiverInterface: 'am1eqxknp5iqetiuthitgl6cpvhi3i0pcuv1prfgw80a7ftb7besoacy99ssbjuozmvre9rs2ml7j3e4vo7je275neluu1auimi5ld9hrdaqef6oh6vopv77j424ajh01x4sviioex80je5ldkg4bzkuzd7tcqwi',
                receiverInterfaceNamespace: 's2sqby9gl1n0polfxhe3kslpltpas1i3ojzf116ibiaplxnm7t245f3dg6pcobw71anrntukll5gz0lzbycymexobjpe73z1bnwk7z1kxjgqd4nrhb7kt55psicox2t6bv5cymmgho0cuqz11ezlb451ykuzpr93',
                retries: 6847963010,
                size: 7782532657,
                timesFailed: 6464978328,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'uo5iw2gzt1k64qofvtpz',
                scenario: '5b29m13fa0er8bf6n7m75xs501elhgdr0mj4e4s15jdk1wj07yavv1nd3v2d',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:58:43',
                executionMonitoringStartAt: '2020-07-17 03:52:34',
                executionMonitoringEndAt: '2020-07-17 06:22:44',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'xh98jus66wg9jsd0pq7spc2a834jtfnj3noqfetsrr7o2mapo205cl6zxubn3nyakwzvmujc0sdo88gflh9dn55xllxrqrowz0zn0xam6pf9eek9wc0rbzkxxti02l35zr0jqi46oe9z7toppzbto0c90sqmy1r7',
                flowComponent: 'jgnbkqg3n2mwtlnem0vpo2xw3978jr5d5925t1580w92mqjqvin779i8qqbn9ifn61o56pu96rpcfus0zzezhw2fdxirg7k9rxqz0gk596b06v02voqhqcvk62ooo4j9k935p7qqiyzshe1hlbtt23ln0wp5ufdb',
                flowInterfaceName: 'h3up3qu532n9lnamt328skqepw8eu8jilbl66fcxwcwgmbswa1aispfr7jj1qjpwqcuwtyyzvuxlk7k56xlhbhcyn7fw8qmackd0eaiyiksds6wde26cmmyexnb0wh18lab17jzgb4jnswbeyokyl0h20ypig2xl',
                flowInterfaceNamespace: 'nw5d47hdc2qqgwqv4m45lyccxqeyp74tbxozb65ym5vf507i1iksxmr86hh1rhh82ftmksb6vcmi3p7jx3vw10ddbzhu581iesc8e9hsgxw92l4nx2kozdjf0mysuhay3qndxh8qri1saczp3wojxsvh4hr1ld2d',
                status: 'TO_BE_DELIVERED',
                detail: 'Exercitationem natus illo delectus voluptatem voluptate. Molestiae inventore commodi eos magni autem. Autem tenetur autem beatae. Unde dolor corporis. Eveniet tempore voluptas fugit doloremque est necessitatibus officia reprehenderit. Est amet et quia dolore repellat vel veritatis ut numquam.',
                example: '5urp0ktguwkr5ukr3sqk1cm9xgqzyysb26bqyoezlen7giw8vkh19suskid1dc4flaq1p2gc19g2ey0mp4a1c88sb6yqlllxyzt93hyvjjypftbc5vigevp10y6x27qcnseop07d0ol1fqekdr7inpggfnimxx0o',
                startTimeAt: '2020-07-17 01:09:20',
                direction: 'po92ccqocugadpm5k433',
                errorCategory: 'd982u3qyq1fbj9mgsxjizcr8na41vx4og6i94m5eja27rfd45xi9yhl5dvo4ptnmmvg7c5agj4x5eo3j06zjdsuh46e7tkpf8e1wk3d145f1sf98a9h4i7fqe7v20m080eiwlc1l18xfdznq066s3it27rxc4oht',
                errorCode: 'xup4i1c6s9pyhb38xdv5',
                errorLabel: 'r35vd5g9qd8b77hfwhmptnj2a0d3ewseludlvhfo7lqa3dicoka6vrqco4nbf36ttoyi4ivrq840xlhvkqtla997bnqv5qzhhkap46n68pfwjx7qjms6lvouho76krabla1lei179dag9l00vsfbpglk0e1qq50m',
                node: 4617387721,
                protocol: 'u5upqcm9wc3hbf414zss',
                qualityOfService: '0pajv94s5onkzemg379v',
                receiverParty: 'domxfgmjucnfji6t5t8sgt1kp3w657ogoanoge06svltv2k2bivgl5ntqtotbk46j9wm1jjy7ndug1wsxx8xx91nd5yk0zbay02veg391u2ss49fjx4ywis8cxlfo9gt1pf0vmfq660i5mfl78fzja3toxpxaul7',
                receiverComponent: '3j5u6gjv1nxj0hkr7y6nesck9fkjwnwdbpo99gi2ay5ovwgycy7zsumf859fhcdv73iml0huug7vxp71gznuxgs31dor6fdosdw7iskebftviokzeb7g7141k8yvoagc19c4wuzhy5c26nweo3r4uxxngmafwb77',
                receiverInterface: '4qi3subv3jniep0wevequp1r9buopay0ztqhbzhn5nqw63cp9he7v5rbh3rm22hj86zxcxisadqvfva6f44z3r5653bh9vzeyrc1k5hpyi16l3fiqz4za0wetrdyjdipzln0vin9jtdefis2acnz1dbf7rvepvar',
                receiverInterfaceNamespace: 'd4u4368vhbb88ptie70uc6kroo5r8u6b8vl0p9bqlktfh2oad4eh1voapj9vui9f8thr7lwgr6vs9mfpl5trl2t6syhi2zxu36jzk8v7g4w6vy8zrp38n2wuxyhx7pzvcrsgu1nvh9z0ulq0cnb2ynydo2nulye8',
                retries: 7572236498,
                size: 2517656051,
                timesFailed: 6609092414,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'w8jnpvorcdixiu9xn2oy',
                scenario: 'tptgl7oofpmfr7on2qq1l7a7x4kb59fp1fyz7ieqwafjab2eff5c2h22thyu',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:55:19',
                executionMonitoringStartAt: '2020-07-17 04:00:52',
                executionMonitoringEndAt: '2020-07-17 10:52:49',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'tepk0cydmjhz3y35k7spm2vqxn5zwp4u2nrgal8aubxu2o29nk26vvt40t6kp8qgdffuxwnjr0qfcizhzqpft8ww2ovk89conwuza8jjgd72we34nzh9qnsgol7qy7f9nd5yi9z9yl0r6emkik5pusgi8xc9uq4c',
                flowComponent: 'irkokhx0dnb23azt9yp5pzn5ipxk5a7090gyhj7j33asqc77ka4el4pwmuja8ht2row4bujsupqhf1w76xc7l75hk945wec9srdjz716v35p37xln1x443g2507exppozv9fpwl2y9xy1h7fxpagwjktlpu9w57v',
                flowInterfaceName: 'xze6o8nyct0vl6v5nan72m36yl8maem20i23msu8ajya2q9hww5bxlnfdjs9g954a1xwwsk4s0udr9hjfx288ajvbwu6esiv79pr72e65gkbklzclsy4r3ncrzg403gi1tq2z49z81idcrnze1zy8ev4jz3pkuc8',
                flowInterfaceNamespace: 'r024ww3glixllhv21utiwrolvva6b0mrbnmy3b2aofzirp2buq53ku17grjy207f6gc1gb6snpl0jm5c373udc06dhua264tykjkbxks3qfrifmvv5n319uh63vo4fk3k1gqbcwsvmfmtwm3wawqjk1879hb3ktx',
                status: 'TO_BE_DELIVERED',
                detail: 'Excepturi incidunt iusto blanditiis illo corporis eos ullam praesentium molestias. Aperiam sunt dignissimos. Quia qui odit sit.',
                example: 'z9wvxiejw1n6irtiomp537bn2yf67sdirzb0umtjkit7o5os8y4f5fqfqnsg3fa37dp89tb5a8119554z66irsbcxpm0odj0iv90ol01rwt9a1lqmvaoe87dgc25uwg2cdetjh7qkoj35ha3cbpienv48nqztmal',
                startTimeAt: '2020-07-16 16:33:57',
                direction: 'yzqtnjju1824iwdbxpe6',
                errorCategory: 'cooft4iex7k8gs1x4piqk3lf1lqelaojnlaqfu1c4xlh6dmnf5cjz2yjut63axqac5595bz0pkv6uh3ib3f9l224fjgi8i9wmhvz3czu9ob20pnckzfgscl4eb3sj3f9s8161azn7ljb8swu3p74s2wglny6fzd5',
                errorCode: 'kfqfqfi93banqvt3i5c0',
                errorLabel: 'znv2j423t64jrl4puxp5gr2cpjq18ximf7zgoxioxfju8rvcwz9kwxs2wwq357bm4ttqbgsmb5mvyak758hz4rnwq2hoo28hktxv0693u7mh5qxuinbnyp5sjvgspwu0ms0i0tp803lkbbe3p37tecq4rai4o47v',
                node: 5572395279,
                protocol: '79td8kfi1ldyo8kcmlpe',
                qualityOfService: 'xtb95rfu7ltig73h681y',
                receiverParty: 'co6gkfgh2kqo9xy661pvph96fv1ommmlts94w1wrcp7bnad0o9awbg26ckclbt09hpmyfrv70l0mpee7nkotktqu08g4esbd28q7s22yhqfiabzo2m9mjf9pnox2cid1hkxhv0z6re4ou7nb1uiqu54r970r9pf8',
                receiverComponent: 'a4r85azx9tgc1tcl7xbst044wletryn9cwsp68waksv4pjaeqh9hr8zmv7g7j48d7v2otkhf97dk7d6augta6amdrmultas1ip75pygw5fvru4xl14o3xfrwxhbqoavg5aveushyohq8f8pl36bp607pw7hsm4fe',
                receiverInterface: 'c9glm3truwx5f8dt874t8vqkilh7bffh9k8bpyavapbka6ul56cwlihen91ylwex2q2mvneelifdv2udlmfoov22qbj245wss9hj8gy0mjos4u387xi7dakhjtd8ko9yb8rpyo5ja45y4zoh90deuecatgdp9cg2',
                receiverInterfaceNamespace: 'd6vd2slfnsef1ejkbk0o0x0w1bprsp6fsizfar5o5id2wql96uebnkpq5ez0xj6c559f4ogjnr3f46eqfqt0x5xpnmjm568l3k5dsuih0b7brksjstfq7utiz9v1xa1k26o6yn08xvl0ptd4otg5vxbqhyvtk1gj',
                retries: 2767800498,
                size: 7218494537,
                timesFailed: 8490456352,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '0ckygr9uthnp9b2iclw2',
                scenario: 'rlx3s94wvlkw1cdo84rz5yt94861wnqjvjpsn8tjmar4n42spzkthsumevxq',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: null,
                executionExecutedAt: '2020-07-17 00:08:16',
                executionMonitoringStartAt: '2020-07-17 14:52:28',
                executionMonitoringEndAt: '2020-07-16 20:51:36',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'wldgeb96mcmh2l144htjypnqaae3r7o3h7zdngsx3krgc1cduwg5gjsmhm8mlz682uis2jtut9xgpdhnckrcud5j8srqpvmow6zf6xehdj8hs3u8jr1c8x0jy0t3b3k3znydj6jpoutkewaeaa1oy4y0usr50cp2',
                flowComponent: 'saxuir2zv4qdkf9qlgib8fftel08jsar2c3zit1twotsxymj9m3pqpdlhqgmitvipsprt09mg71tfuyljj1l3tsf17ppwdhobe15i9o7i2n2q1n05436vffu8inz1v5q06cgm7jm2vl30t8rbgaiee5cjw26cspt',
                flowInterfaceName: 'v7oo5ckt7lijbtokzb07ibqelrocenslcg672zatkvl7cysn040p21xcehstz8dqy25g4uqw3x1m3pab7ff8cmml86hlz8foedp3she0zar3b76oyg4fo38eb80v69pfzk2xk38iroo0y4oqchaqlu52uurivua8',
                flowInterfaceNamespace: 'k5x4y9lljdbi0k6t3dszsbykyg9n55seu0rrtq6bq1cw1111rxwxtdgvr6t0bjzkixftsuhr81ktloqx0wq6bdkyyfdyioni1e0xvpxj10l3tadb75j7xolnnhqanm3zaphv6yi9jjm3nozkgtmck50ot61mvqjh',
                status: 'SUCCESS',
                detail: 'Commodi possimus aperiam repellat animi non molestiae. Repudiandae ab ea hic deleniti recusandae voluptas. Sit quod fuga molestiae. Eligendi accusantium voluptas sed pariatur inventore ipsam quod velit. Dolor et et sed facere libero. Qui vitae vel corporis natus aut laborum non eveniet harum.',
                example: 'x6zfh4myqjpsxoc0zhh3k1jeuvmnqp7lh6twli4xionvjjxz5p5zenko1dqxp5vybhfpob4cymozxmztoyxxnevkx0j6tj2g945qs1rpi7iu5vx34wkv5v20f1gpso85m5exhc35scn200sxgob1xjv0tb2vne5y',
                startTimeAt: '2020-07-16 23:01:16',
                direction: 'yskr1uxdhc1w5qf7znps',
                errorCategory: 'btt0elo7ff6hskp0f7gnc7c757lyh1dw5kgr6xrl91f9edha9n157bfaauvtlrj5lwwr5o4cxkrrpaad5c0s6hcujvtz4ohf2npqf4286hzryqwkzb44qantih2w7ue47o68350oybekosc25wgemwlbflaw80oy',
                errorCode: 'rfenxuu0x8xbi9d2vto1',
                errorLabel: 'yxy2sm52n0zwrn81adqvxykp3eqw1y7v2rvab1qf51n0wb921jxpyb3vd3qhzursiurdfqv3jjtgibwz6qlvlbh8ixjjvufrzyd3c5ahd1eub1hbkafc4vhuzt5kvwuf8sh7wipqk0diqfa0jxuiz36wfbrw9cyd',
                node: 2692089628,
                protocol: 'w44pa98zhzppiz8ihfqz',
                qualityOfService: '3mcuhqeiwt6clzo0neoz',
                receiverParty: '9xy60kvlhm4hguqjj8591alzmnefl6mwo6dnwu2fbq9wolsdjuxbeohgos6oval9t4mqmws117w01cu5tnabqyy31dz0rnmj3tyv955s8l3lk9d3ja4u3xypmkfsuqd2l8ps3hf8bmc2k2izfdpw1i7l32e17iw1',
                receiverComponent: 'meuullpiysmtfijlbmz27r43av4xffq25rmicc4bvhe05vh1za7knvdl31hmqo08a20i92eudijau3xhgwb67q69o82fu3ba98t2mui7mt0lrzw23p8cyv4yz0jxpq314wyoi51sqs30yl2e7yjae0y4auujq6cs',
                receiverInterface: 'run558eodtlnvkoi6rmupfh2ttksqt6sspjqihvldqpiv8mumpep5fcmzfxw918qcxibcm8274ifzpfogxox8nij2ehx3sh3thcc1h8fxrj2fu2e5f5l90tbx4ninfpyab03z63fh4jsgtu6zo412jhkuztk73yn',
                receiverInterfaceNamespace: '0y6qcxl0kxts6v3860v2m5omojsp5e43vy9w6xahso91jl40nvavzyxkycm7ev26eca5brwlj0mf9ot4vfkjkkt3fj9sjeeiopij2ta763qf9qt76lecu1v1lyokp631sm8tdm8zy3nyseq0x2u8hrss8a2q1z03',
                retries: 2546602871,
                size: 8579506180,
                timesFailed: 5491895988,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '07bidanughbltf1c46mo',
                scenario: '8zfeknncpogx7c4hc1zahzjt683ifp9o5c09p0zmhma52gppl2haupd6ub7t',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                
                executionExecutedAt: '2020-07-17 07:52:05',
                executionMonitoringStartAt: '2020-07-17 07:58:08',
                executionMonitoringEndAt: '2020-07-16 17:51:54',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '2f4e2u8j4bl8md4lv5ga3i1wgxbjfbgm4kr0rt2nrfhymo2payclhf31gbtxsmvv9y5wur5io7qw8u9rb4gafvukew4fs9ghmagxtypxl13091wwv9dbzj3fjawpolyw3yn3k4474ubjp78pf8jkssdeyysvm6h6',
                flowComponent: 'onxp65oact59oy0bcaffo4f75qgtd6wh38at65xmqjzw9rzkh1ivfkiearu6lzwb3fxkk9jubu45j8uwgp9s4l4ejqdzat60w38viuva0nxzf2u5xbdjaz4qwx14ettmjudmkxc4fglb1fqw7742hmgjp2sq8y4o',
                flowInterfaceName: '8ieohsswtyfr16qdfyfkbdfejfmtvkggtes5c675wewwywmnmol8ktxqmjk5cgc5s99slo3oze6drsnwb8jglmj1ryrb0f5zttz01zm3y5z5rhtnz550b27gu1gz4dgz7twwjka1gbz7lt3ukysviv9hp4yvstil',
                flowInterfaceNamespace: 'y3zw4mongxf0ta1h61thqeoih20f9k6k6mapezfl8a60zshprlx6qs5cb8mf9yl9fjbpteeyprpaus2427yzv8azit9166gs49m3885oljaxmptpb5ibtaz9esf6ie1eazgh9tfu2bjvumqe3cr3001dzwdv01nx',
                status: 'DELIVERING',
                detail: 'Modi consequatur nostrum cumque. Iusto beatae velit recusandae nostrum. Aut beatae consequuntur ex deserunt voluptates est in numquam magnam.',
                example: 'z64qwjl9pbxs1nx9wrf0h8h2p22jx0hbx69y4lwrex8fmbu8zcjuflas8m0s9yihran5ffx2izxbajihizkvd5lvvs3dn5xs529fxtx57453pir1n52esbye1hb2dfqobqkehdhrfoyyk333x5m0yx7uqsn8b990',
                startTimeAt: '2020-07-16 21:06:23',
                direction: '636ggbw0wvfyfntu0acu',
                errorCategory: 'h8umg1nci6qrwnpmn95n28slg3h6mws6wxbmce4f4wzeznqbzs36vsfxayw58el1m3sj4dl71ot99zfe9woxzhzotkxxc3ajypl3vpj4rg1oynazy93bu98dam3go9h1btux2xawyfhhj253vt72itxt45pbgq97',
                errorCode: 'tunpovhisv5ppupd4hz3',
                errorLabel: 'n1h9q3p99j2ag7b01mnou3bsi7lsklii1txq66a36h7yoelp7eid2u6ux2gtnyhnh9bqwzdfy4aanqjxdvfgxg8xoan0mp314hakao7b21csh2iwcw4qqkihbam054kjko8c3bugd4n2wznko8wfibp7nirmumml',
                node: 5757982233,
                protocol: 'yxq8zwwqtv6e638owgc0',
                qualityOfService: 'lbwsm66t3auf698eufvy',
                receiverParty: '5x6v69rdqdtjhwdnt30n18petth4k2kzxyo1rhohx6twty2ohm8iqwmzst95smf9sb9j1yifizkwzfaitu79xnu2um33ke76xg9odqpgc7bfvewfpodlp94yi8stdm6yt8bzi49klonp96cgz4chjl70lwn3llxh',
                receiverComponent: 'b2n5o75vadn8sdz8cwp51othg379n4jh9mv9krn92faintjuo0vdxiikvvrzm046rs59sn8144gv6i19h7c8pzzbl8zw5760cdqujs9x0s5jkbg4o0itpj2v0kc3ijrwn3ytc4zwveecfn9x02pwa3se85j7xctj',
                receiverInterface: 'cgs6o7um6zmx7lnnv6y0nea24wqt88863iuiq45agvtwhsdurrw7ogm6uxb88sidz3c1lxcq1soqr1pfbqnuro8mie37avz3bfrt9hwm41445ja9ew495dn3nrlmn3qus8s8nd0z55xjaxrkfretmbjkwshdvy74',
                receiverInterfaceNamespace: 'icgtv6jhau57cnvesqrrbwydwfl3cy7u5qhpqej1325hn6cf2yjvjxtes2izakkplnkjpi8bib0jpse7lvfu5mrr6qv95qgzlcdkasqmthh4k1e8apoj5pq0nptw4ulmdsokyh0ugrys3ml3j5vx4daa2a39zxqc',
                retries: 4671555750,
                size: 6125047500,
                timesFailed: 3113072985,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'lck3mabmtg6n9px4a4j8',
                scenario: 'zl12smcfalocix2dwa6wltw2of34dqhqgxy920dczg6tjk0grbn781c53v4w',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-17 15:42:01',
                executionMonitoringEndAt: '2020-07-17 09:58:01',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'fywia5fsxui0zvg9x9rfkebrldcb80pkokrstxndj37emhowtww1v464v08xf8d6vgn2at66ttr526uwq1qr1wn0fw08kcovi2dsqmtym9fz91g0rsvwcyyeyt34x1eqmlcadqpizaxek9kmrr79n1necy6dh83h',
                flowComponent: '7uhel22qttus0snj58px0rtbufeiga0oesutbzn76lz3y6rwul5yzgcbdteqv7yv4acbtuf2r8hr6sarn8ymh2ahnhiae9e4ldnf7ukklh4lsjk4ac9s59cd0b54yc7k29d9jaqyubyjl7zzt4xus73qcwzfclrw',
                flowInterfaceName: '3q15mott9eftl3w11rj6k062yt7pc8w2bhyd7uwewossfs7shze5js9uswrg9wjo6a1kgj3kod929ut4eo4a39fnj07q0ny0wwv9bwpg6i5vle3dt96narvs5xulbf487pbnqqsfbp31f28uj2k0irczojmcomw2',
                flowInterfaceNamespace: '9jo2cabu05awnfc6ocoluwu29r8fpk432f5hr0lz7wty7pzze52xi0d7zq5wk28f3s59awzkt9wacxz3fa7wre6pes6qtwkp74k5b5q8qo1xrwg84xl0fpmuin2cv2uccqj63sxuqvunks8d40fk5ajve85d3zoz',
                status: 'HOLDING',
                detail: 'Voluptatem quam et excepturi ipsam laborum temporibus cumque. Qui dolores voluptatem amet adipisci. Eum sequi et labore. Doloremque tempore placeat consequatur quia sequi quam.',
                example: '7uetqczvghg6xz4t4wlj71nc1k8io14yw7qi37c25p4iw1tpnbgs0takhaxmsu3edovz3jqkp0kthmj917l516jmsf9ywddpsij6pple5kcjkv19ioyul07b8pcrutwbnzn4xwla4jwyqeduk6xkjnjqoqhd5kfq',
                startTimeAt: '2020-07-17 07:39:00',
                direction: 'v647t9fnuvsk56zc5ub7',
                errorCategory: 'n8a89qnxlv83a9pppr450dfy3dnf9tapasz167yfeevcwu8d59jdnhqppmx8cbayh9xe63yabvze8qbzckky16ogag6k9haee2lh1gvlhyvrwjz3lokchpfcw8djgcxq5san9d22aqzda80omqq2rd5zsr7bjan9',
                errorCode: '8aia90gbh2jes3ecft6k',
                errorLabel: 'wtaonng721wlqkoh7t7a1vxztpdokere4dx4zi5narb3e06l8v2cds0u8znr8d10e2r7b9gnzh3ie846nexvn356bn2oypkkqggw4j2aowtiwwl0yljdtwb14xwdj18mkp9hqaofpumusoge664u56ww6z86c6x6',
                node: 8028177243,
                protocol: 'zch3kf8b31wqcm3s15aj',
                qualityOfService: 'dtym51fntiqif6lr63cz',
                receiverParty: 'pdzuqbq68x58r64qeflvcowxzu28varf75wbjcerwou07oqy2q9p0crqpi0zlk7ianwuxs8jw3zgfh0f09g00bqdo6954c45fhh4zbqspqijr7s6xi1h3iwebghkxsdc1qvm70ot0osrrzn3g6dkaav7kxnl3bcd',
                receiverComponent: '3nldkfm7zk1ch05t3kubfxbytrrn23jcukt9gfzlpit41v6z6xry43jfoa10joc2iecajmvx1dx8kc82a7bhh1ewhpoxkcgvdhcb75u5rkcn5occ6zimideu23lf0tpq7ikeikunnzl7unzhkz6ljmk01t4ln9tx',
                receiverInterface: '5zjwdjnet5h3wk9anqgt64tou97flvx055vkazhy0gxngqymcmvd28gi29k6m70owrtm09mfv05hn5w0ibbaqgzx23jv08599lw4gnl6giacirmdtuu5mmtwsol8edf2ckn6f8mr9rhovmsv891f206kf8hemuu4',
                receiverInterfaceNamespace: '6yc1m8izal67zb7et9n3xtxjafr1gkkesvdywp8tz1gzjalpinnisividz6nd9vbkxr1g8kkpwc0483m50iqrsypl6uyaqc17qw5lph1ox6k7lwkz0qekmtbfdac56uy11gmbfo2tz27ol7wtjv0fufzp8klz7zq',
                retries: 7884658470,
                size: 2660946311,
                timesFailed: 2706486671,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'yy1t476mo3m4d2vvf97o',
                scenario: '7nvnei3bexrt1y70olouv5ardsgvv8nqimdtg3uvkov8uhxbl2b8atcyrfez',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-17 05:27:45',
                executionMonitoringEndAt: '2020-07-17 08:40:24',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '4e9ho4cp6k6xcocep8y1swl651uicovdkuzr1qeudpj3odco79o1byrpd3nhqvf99ktod6dptxd3stopvn6nmw52bjjs7qtj9ibss2uw8ih3yqcjssx57k32cxkcp5ktv5dpt8mcwqv4kbplzkqoph41bnwci25h',
                flowComponent: 'tsxu4w0xvi07l6ojed42a1daa3cbx0ibu3hg86eb4vwc949qyduhk8rye69ppfnqr9wsp1i83lt4sgewylx9ug1mh0ea3xu68hmdsriixr6bv2yr979pjny37gjoku1fe2c29vbb814jmkrasuyw3rq4jlyy039a',
                flowInterfaceName: 'xrfqnq7327htpegw222ib23k3ox7dqel7wj4d5k7sjzpsyrqt8qkt3d5fup5rlz86d8en8jksmcg8sum8t980x6imlloaj3sk393vqaimtwn34zqanl7w0wl7kpb07rl76ngnw5o8pmmn90x4g2stlrmum42apig',
                flowInterfaceNamespace: 'yfsj4l0irxpjc6yfuv9v48lz9yh8f9zsuh88gz2ctadj6wuoowh5818n0c52d5f1vyx2ed67umnb82ufrib2k5sljk1oo1x1n695zwqcgck1p7upt717oqjj5a46ju24qhc07llm05jsu6wz9alqa6zsysanirnu',
                status: 'CANCELLED',
                detail: 'Nesciunt tempore quia rerum qui veniam est tempora. Et similique harum. Officiis dolor id. Laboriosam explicabo quia consequuntur facilis tempora dolor. Libero sequi non ut. Ratione et tempore eveniet veritatis et rerum.',
                example: '8d28nax8kht3pj0t7yp1d92ohn8v5pa5960p1yjsaspt95nzbf6yk4beygz1morjvtrdm7g0x2s4xipa2v0pskmfxdb06p7mr4qpfaqwo3riz39abwt9n3i7wow32r232yeyyrikfkop1fkxfqne9ezvcr1medxm',
                startTimeAt: '2020-07-17 09:25:49',
                direction: 'n36icpc4pwz0io1evuzr',
                errorCategory: 'zhx3il8e58kgbqkkc6be1toq3qpum5d5h9md6en3995qg8s3cg0e3x02lmmkfwjs8nvft0l5593pq2wlg61yj9btqk0e5qf0h4wqk662du9bffufs3k9a34rkvqjb629ocviv8b0rebqveu0cp31hltdjlyfe3w7',
                errorCode: 'xes00i7rv650kxafjbs6',
                errorLabel: 'fgurfy350arerhmq81gwqnxz19xhw98n9vrrx0hmswlxfi4enni6rdm117mi0f5gft1xmya11xn2ai6jv7mhaz9n44v274ze7xqllemyg9fz6cjje8p67zd964aj5wuw1eza0crqi67niuwzv7aahx6tlbgwuy3l',
                node: 2310415246,
                protocol: '0k82ui9vrrne1s2fawea',
                qualityOfService: 'manh4aw718j9ygvazfj8',
                receiverParty: 'l66qejsjol1myc7hpt8rb43zuntk2xjg137tpkp3ruirqcvyfsa3hvpeeicldjsvtczl008z0on992rk03y4tcbo1wmv07k91x4bv7wz5ev4gm00yun2x13gm8rdgklopihqdlzezx15ju2asc44aswzugefrrfj',
                receiverComponent: 'skq2i237sjgs15bm0jbfaq6ieytj0nkwog431znw7gyxs72tdsh16sxhiirmmz8lryxxa6zjspy71079p8yv3t4vdw4xohnstzv3dklbnlq5ksf094t5yjch0bnlgrys4r4cwdkepw5w73g0kn5mto2ryk1p5bnd',
                receiverInterface: 'wcmdqrrqjwj0gmy7eeyl342x1ttga2yghbdvmbgb650kj4nvw7n30nx0docw8pbccd91q2juj0yzavx5wuhz8nkhlyyqt5oc40o1k948bn953xr2wx2w3a7gywo3vqeksz7tx9ypng6qx9fksyfq0dyncqisioyi',
                receiverInterfaceNamespace: 'cjyqu2v02jrrcz6b6t2z4nbsuoz1ohnufxdd6f8xbwmptdzqzk9xz36ap6qmh8rgwrkhu7kn3um8gu3r0nzugsrltcwtdyy6eugdj55zubjm5w0urttsylesw1pn1v8obuyemdsn0khip6eupcpsbzncgdj332im',
                retries: 9650605353,
                size: 8373082530,
                timesFailed: 2386634472,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'h8h2uvsge9ecobl642wz',
                scenario: 'cbdohvh4qjnsljtotb6ro4gnuzugkkb9jwf3b4528ldqxrkobfbwaptaisaq',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:36:57',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-17 08:48:02',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'ooa0m8i3fib3h3eswk8m66fnxsp05w6zw2a1sw7cvpnr3l8d1s78f8xx7h56rg4qsqz81zvj2gupaphq5r9lpvig2qear8vflp664ng8o8ems86drdg9sfy2qzqeooa0kvoqffigp2hu33c853f638jfjipmqi0x',
                flowComponent: 'aeeizthg249nef7r6nwg6c9f6q55qmd5krt6bet1qvu7lg75lbfgs46wuvhw0hktxq5gwdbr9mvgvm1dgxcnb56m6iz3811p3b3utr0joyo6x94hymwvs3q17u0didv248c0bmg9k79u8djjug0msaesk6jrmlhx',
                flowInterfaceName: 'cl3fowgozn6cf0kt6s8i25te1213irubfn9u50836pmul6msg9o1jp37bz2oeetlkjs71fozympen4a95wim93hi1n7jpmv9uxk8atewpsyj17hkaozy79809i4lrzgwa38nxpu0xxvw0lzvmy3ov90yskrimfz2',
                flowInterfaceNamespace: 'jjdkr6l06be4xzy75x93pwd5polpcc41tkebgpvk8b4p73wd5hyqmc7ahyn1652ophpuglnt215x0llpxiovz4arotqaxa977ken8jdpl0afnhqjqigeaqlanmmh9tsdxtl27wb7tll9cnsppw600m4obs6142l3',
                status: 'DELIVERING',
                detail: 'Rem et ut perferendis tenetur quae dicta magni doloremque. Debitis doloribus odio suscipit occaecati. Sapiente doloremque enim dolorum ducimus dolorum. Repellendus dolor sit ipsum quis tempore ipsa maiores. Sequi pariatur vel ipsa velit cumque vero nulla in ducimus.',
                example: '9z4lmmvpyci0doivjdmbp9mzir0jflzpf9almzhkry97h88cirwr5ljc4aqcjahem0af4wjzwh0fqco9pu5kgyu3jeyr44t6gmplmeg6x4wgru3u3dbm7pqgwe465ilak2ztfkfdxlkq877c8lp3psxx0b9aykxi',
                startTimeAt: '2020-07-17 11:02:55',
                direction: '706qvnwadtr1f4lak9gd',
                errorCategory: 'j4kmp7rdn6mdzmkya99p3y9mdpn8zcuvoh1rvvqrq9jalbcyq1sg359q5mg07jyjyw7lb7p7fg1ic12b2ly6ky9sdgsbcc5dnacw465cx3nd41fdlt6yxx2cdzmdxxqsu69iaegjg3gri24eucucv1awig57jyt9',
                errorCode: 'tbasxhm5jge8827erq55',
                errorLabel: 'jp72wkvobioz3yu03gwp2ga8upuhk6360qqghrox43gl9hjg6moi3rdu9fdtredzj2vq3n8e854m1dftwqb4r7036exkhs2zxotidrz0apllv2k2dipb83p2ctwydsb22r61udy1yiku4x3d0ulnfu8wpln94nzw',
                node: 7689059208,
                protocol: 'ghrtyi2khmolpjtp97th',
                qualityOfService: 'lkq483kw6fjf74ixevh8',
                receiverParty: 'nrylk1lwnmecqqokkwsjs4ypvqs5h3j0r58ayw8vd6es647r789oz3755rw3zn912xnyuzppgc6fu33sd50k8lt6bv0kb2wkdo4kdb8uyym151kz1l1sbcif08smt683slyq54xru430ibynycxb25frdcgyylnq',
                receiverComponent: 'j1pwyysvy7la992e6jh1rbz4mkunqde6cvei80d1o1jvkg7zd2r1qhrcq8q17c4hjrqsvatzp7iih2xv2rh5iuiz9fr175irr0avr2tpmh5b410gx266n3ui8ge8baxf3cwf1r5pdgqhbhcjrf1q3otcsgc4cdej',
                receiverInterface: 's0wmp3zdeqd7fn027ohvd2ew5vkiidbsfep35e49jbibcyuijg9axg36j80wjw8dcom0hcpkabxo8ax3cq8uaboux5uxzv4midk5ubcwp37pxckidc6rkjas53ujksil3txrd7tkn5feajx53v7xw2foba5xswpd',
                receiverInterfaceNamespace: '2qpj1o10ldhbbp3si2srlljcotc44nn3fr2110b8nwmvfmiupqtskrgiqfacofpbbx12e87yl6sips9ns6lxfkdttpbtzn4ffxcfa7xb7bpllgrrpj4qd9rsir7qi1n8mkb3tr7g6jeklosd662grvhqxjwfxynq',
                retries: 6918115226,
                size: 9870257167,
                timesFailed: 7029773233,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'ofq31an70mlul7mmeyzs',
                scenario: '8krq5ujlp2kxvachzhpculcq8jigggjwixko95rg4efr66k9xdc3rtc35q7i',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 15:24:57',
                
                executionMonitoringEndAt: '2020-07-16 23:26:28',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'kid2s8dfomxqixa9ip8z9mmfuw6inyh9tqjca5g2ifsyy0he32zkcpyrvg8artr12m07vyusgp9jwywgxrfm4yzir3eu6wto12aq8n0zidq7ettfczum978tnidbozy2dxmdcqp8uaoqu3g9je3xqzqavcs9rqgv',
                flowComponent: '1cq7r73hc7o6lgd0b4szz50sdnde5q0twh813p9ycaqz7fmcbsef1vfyx4to9z1ogcfbuou1bzq40qmmvizrmdwdm3ywd2samisq3rq618zc54ba271v0k676gvdxu9nuzc63ccbffn5xjvvhn7y45jfsuuwgtkd',
                flowInterfaceName: '63uce2p1g6r6dq8mnsg3v0v00y70vrb8qnvp03mnwr9xl3bneau3dtb3wc6bucojuayrlqqh7wall5sdtwyssqfm319htyi687u8lpjoi05nclfr8opuedlwkvsfg56hnh1af7fvpb7wi5jf6hej1atcb4zvulie',
                flowInterfaceNamespace: 'ikz0qfl482tjcddy5vvgljhfuxlv7wh7it7k5z350s51xc7jjv3su7vr990txr0a57beucqrz9tt4fjctfg7mtkpin1sc5fj82mbvrgvs83lg8c6tj0b2l73sh1dhcl0bpkslkxdxhmw1almmyxn95rtqurb5mdp',
                status: 'SUCCESS',
                detail: 'Mollitia unde quasi quia. Deserunt atque ut necessitatibus velit dolorum libero. Velit inventore dolores.',
                example: 'nkzd1adhz6c5g3svs0zsqqwdsxbmupod7z8yk47yapmkpoz858hu42m4wopjxsfltroyx0o49a6oyhvcwuqro1ji37e0rq0qy6odzz2ld0lbhyja09xvkudgnu6hxqnua204p49qeo8ua6srd4k5iips6d79xvjp',
                startTimeAt: '2020-07-16 20:20:55',
                direction: '3tijf0cg7etaymxi5k6r',
                errorCategory: 'geqc7dv3kf0s6av1btwwrpu33qc9dqdiy7kfq06iosx6its0tccig0m74f5mmz2j4qkrmdpzoqml7i8ll67hda3839zibv7bewywjx3adduqnsvxsriftyi70kz7bi407sf87oj0jy89dqjtzd7cq65baihc2k2t',
                errorCode: 'aoitpyo332avlxe402ps',
                errorLabel: 'f2bqcp9qbahu0gfbypdnmb40xmaysleibbihvvbl6i9or5zy19pikv9yco2kxoqib1q4i2ob7e5w6iq42fhgsyz930gglnbu7yqzdxrgos53man5k7xwmvpza7wptew551j8aeqzf7e46ewcn6fkexb4norzyfov',
                node: 7559746963,
                protocol: 'oym5lqe2jkd8kwgz33pe',
                qualityOfService: 'izlakzphflt4dmltqbun',
                receiverParty: 'a7y9nfsafow5px43618ldlnz4kus59nj3callc8uswwi8wp9k3hcw23rcf5245soirzdwgidnlbgeya38r8cslbpgxmec75kyyn3ml8zt5sda57qi49db1tlgmxfeprm65s07gari8e3txjeyexzikuwv9axz6a8',
                receiverComponent: '47g1v6tia89h4kqpr6pm1ncc02e8nsu63agsvvg1lfxpt5w9also7zbqub5gjik4ud8lsb7aoc7a7ylr3u1kxc3lbfres0mmdrv3htw057awpt7qrwd4wdl63t9h0qho6n34jpiljqgn58m5ucfrjci3sthcxuqp',
                receiverInterface: '7h59gbg4a3yxadae09vqxiyk8ih12ltr7xkop4cthv37nrn90uuiugz4kbr9pw7ha218smxzkhyn1estyp26r3665mpplho6bi3xa5lsch4luond5vv0r0w5odzr0ta7w7shpzea2a0tfnhdg1za9rek84v35fql',
                receiverInterfaceNamespace: '8dc73ds4rxt1zttp3x89jj87li16ssq6fyrsp6mslh1jgvu8h1hd6bxfb5yp6m37jw8y44fcnmr7w7qpqbosxatnvqy3ikcfvr0ezxmxysabsej423jvko7vwmev6tkfxy0ysbuz7isk1a06uuol0c4oz9wrenp1',
                retries: 2958420100,
                size: 5278698396,
                timesFailed: 9431202851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'qxcrqloghg4213auele9',
                scenario: 'b47buykm65fmm23ohmd4axul40qx55wjbhx0r7fdfef2x2ur1baqh7bpaq71',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 05:50:49',
                executionMonitoringStartAt: '2020-07-17 15:08:46',
                executionMonitoringEndAt: null,
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'vibi8kx73r5390b8pdxkxb3fzijplmjhh9f1itqourcjuzqsa6oldm7m7r2ddr2ywd4lpsm6vdihy8vo1q956du973q2ff4krxhq3zm4idzluyqnexqc4ntiz0mvjnnl8wfsaqk9xh3db8i06s6k0yksi72fmkge',
                flowComponent: 'y9b5qk874e0b94g5crmpsxdiezc8l68wm2tpdddfrrkss4ypqc9x3ss5wobyk2gotszugwagg3rw55ebwambgtbr7zgzdy6kikkkyxb6lf6i99nvv5xje3zwy41pwftfocl8vypiq15lhsek8nv4ixblt62u5hyw',
                flowInterfaceName: 'wodbc8gqiwpeynwcvsft587y2fvz0o8d3bji8kjqi1fimjm5gf8m6f470xw6w4i67r52u9lczkjh0qnuwa9ejtcqv39oo8cgduxnmkg382ca0ubt3kvwywdx8srtsysdysot87niqjlmsfdtbihlmu27gvswnn20',
                flowInterfaceNamespace: '46j7xcrqy7ymzjyudm2i2uu6ii1rtamgwy2uki16queu5yylxnwek388h3x6j31jq3y9mst7udixcflgtsj6knhey7e36b5l2faits4uqlgfatreo3n9xm76vmexy34mjjoxutbmpdlahmjox65ejtiman2vlqdn',
                status: 'WAITING',
                detail: 'Corporis dolorem dolor autem quia magnam. Dolorem culpa rerum quia et quia. Dolorum inventore est optio.',
                example: 'rq7gudtrt4wq23bujpsi11a8y73k89wit9vmhaqsdx19h4c70ce44v4h89pqov1vb40idfcgl666rr520c87ld26bbq5pfegeq279reradm7ymqv6a7qxvfj6cgfmg7b1fm0g4a68rk39lon6429uwelr14tojxq',
                startTimeAt: '2020-07-17 09:17:20',
                direction: 'e6ytdoczldvzswaf4ctl',
                errorCategory: 'vxpshp6puc2npbrsuczhbh8do4275g25uhlaohmsh8zf3j6ofio8l2by85lhy9px60oie3z2goq83jx4yq70etwm32a6q97iafz3inzenhnmblk4gh5qiti9j9q8vbddhp9hldg9s9nin2qdh3t8nycokgm6ew2u',
                errorCode: 'wk0bon0auv0cmi0y4u8f',
                errorLabel: 'bmga4ijnbz4v5xuwig44cah3zabw8rl5km9wdnd61mainimk9aua768jqok617ajom9ret4uyg4c5rlqtagpyauly38aveur505u2ahctt5wvh5u3egu3znupnqjmnjfrk1ywlpcn8rkvxxasgc59swtch7e4y0f',
                node: 2492204244,
                protocol: 'f1071dk44ihu6veoi4cf',
                qualityOfService: 'x0rchblszwey6f4ka2vr',
                receiverParty: 'qfp85o1g7b3zgt2v83hmx774gjzv656chmt5x6dvfv4pftd0q69ljk6fqa8ioouds1edp4njx7txacte404iugfplbhvzudvrqoynxcpffx5hgx5cyslc3eiv7uodinvn49knp18bmj5diwuwvkajsgcpzrnkp28',
                receiverComponent: 'sr8nf0818ew4wv5h4j4xqcjgo9hyyk2pnflprira1frxfbbs9808px77bfxu3xig03eztai6ms6en03ku2174id41bzt3jc60fda2pq3lofvkdypf10zp5vbld52sr2f2dwd8xcxna2xh4p52iem5d09rvowqw7y',
                receiverInterface: 'hfk3bb4wt4aqy6xeeyxoju8hqg7ldc0yjno5tipc2jzg809btpqnlkaedsdmo5xzms6rgg3z0ca49fyyn1zxs31dql84uglzirzxve05iwjdhasp56w0yp2r3uji9k2l3t8jhcvw3qc54dr49nna34f4274xwizt',
                receiverInterfaceNamespace: 'bgaq6x6hmn2asdsxbwsvm8jkje2wuqztef59kt35qxpkv981ohka1fkn0wb0yyhtfbgqoqguyjur2t26508x4dlsrpxxuadhr73ychbpm0jzgruwb1eavzxp4zjd8fuae6fs5u4vrhk5xqzvt41wt6s4mg0rjfnb',
                retries: 2036215112,
                size: 2991114324,
                timesFailed: 7534590302,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '0846meqpg0e2osu4i5mw',
                scenario: 'rhf8vnu4vll0lrwnl3gbnh2u7v542y27zy1196j0pfgeeew12xl7qq9pm7ul',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:03:57',
                executionMonitoringStartAt: '2020-07-17 08:32:41',
                
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '91r5k0mdhu19655u8swn9p8vqxsokva79kzqwc9wez25kdywe3b773eoub1hl2p2x39yqiza0xz717zokg58z76oppvw0oq2jqwu4dl37n8hx5udabhk2sfx07habdeln7ragpu8ldumiogrdoce8407bxc4v46o',
                flowComponent: 'w4f0bi20b439al6g49seaadxqw99hqyciwlhargt579zxs5bmqa7lamuwki9d5pkq12xa3stwrl7f8lxa3aiiao5smu7fl3nzbbhv2cjxjjn6xj5mla9jlkncs2de41a885o30jq3a7huf9nb0xd1jqw06ev9d1a',
                flowInterfaceName: 'ales6ftyndlqjegumrm0fznirmflvyyp04fiijcgn2q343e4a0z0q7rwl727cthwx1dpjg8gbnim5erk8mkmkw0x7z6it1m3t8ow1r716f7fzfzub27nrv8xh9yvd671tym4qr5rq1rk1tu4v926jwxt8m9jutpc',
                flowInterfaceNamespace: 'wuf04e4ya5c8f6pw9mij4q1ojdtw5nu5rtb38siajevcgkor6o9yu4mbx9i0bqvy3s2zvpgyepty1wlpdqa9rign4elpmj33emiz1anyml59ghm9ljy6l4nswhp2kp9esicmaa4cbsldfe9dlqjdk7j33dvmx32k',
                status: 'HOLDING',
                detail: 'Qui fugiat soluta quia est eligendi libero aut. Doloribus quas non dignissimos porro aliquid est. Accusamus et at. Dolor consectetur non voluptatibus qui ad. Sit in illum et. Qui porro fuga error delectus tempora sed.',
                example: 'ruymkw3t6f9yhlhwo8ttbte6tjd7083yam2u0j67jnzqx2r2pn3wcivfibrmwaus2udpx1nve8kb4rra7o7geonea9gudahfo2yugff0clpjv9k8v4rzwodl4egg5shijvin9b99fntmscwv00vdzp5e9gfwzcw8',
                startTimeAt: '2020-07-17 06:18:49',
                direction: 'ieg96rnmz0inybqslmc5',
                errorCategory: 'j47wuor2xwwxwrjr1p5yl1smznjprc0aql1hksduzzhpj358kmbt40b38ydrh4qf3zr5z8y9rwqyb0xx0ayyganvuilqq9bm82zlkzekq809xha9twivpwgysap1i1wswmbgp9jo1bvl5u81wzn36oixse12n5sw',
                errorCode: '2ag92iugpiljdzn4hu8s',
                errorLabel: 'tsvdbr8esbgz0z0xi1kcew4pb64pky830m2vop95extdgi2hmrcl0dyhm1mjjgfdsaaupm557kr36e8a608s7m4n37o19j3c1ibjkkezwue2cs14gnqobblzgd27sjbkhsnrz5dg000024lzutruuws5dyd6tj87',
                node: 7936010112,
                protocol: 'uz2n52mzrub2udueo0vm',
                qualityOfService: 'si4t2vxi16f5c9zumjug',
                receiverParty: 'y9vf5eeys2e29wcjyatkt8l8ylrejv6534g4noel4zd98jd8xos432cmobmd3v1jp88adnwrhi3b4i6i5leojqk7gw76gp7yaq2ziu7sitg2gxrkt50zrps2x6bsovz0hqu2t3dqau95jmewul21le7ylqyguoi7',
                receiverComponent: '3jq7r64rnnzamie81gi468bjq15mofeuccm1sjdzwestb9cr5mwyny6ol2zzaw3510lw41ubt860hlil0a0u7yro1t4066yeasul8vn3koegk782hy8r2hqzglhim0xxn97jinbyrh18pidwrt1kjbffzjueuhb5',
                receiverInterface: 'zojiajf8ufq1v8h5xjlibt960e315alnnrv4dj61cra7uoqifxxgi5ll89ymmou86hnmheo2lucstzc9yzripi2dcqnqi722s2g4zqkvmigyn1ggia56nrc69k7jmint70fkkjotuxu9uuhzb1tn42h9at3isanf',
                receiverInterfaceNamespace: '9dtpxmuaoxno0up6blnxie4vf36o9h7m2y4urozmtvs82vpop6x84osekz1mt7o3q6he4pdwy19hcm7gczexey8qfdhcypgc9ks1632vjkmj4wsrwdz65xrsxxkgunqllm3qs5jxhds9a5fy1192pauemy9m8ajj',
                retries: 5361413487,
                size: 8790289824,
                timesFailed: 7058103857,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'z9kb9ximq5yw6yu4btiv',
                scenario: 'ej52w7cmm0et8ge8mf4utxstjlwo7ad3m52l9ksq9c2gf1kjpp7byfzkrh1v',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 07:11:15',
                executionMonitoringStartAt: '2020-07-17 09:03:13',
                executionMonitoringEndAt: '2020-07-16 19:06:08',
                flowId: null,
                flowParty: 'hd3c8cp818us7is6spgo2lpsp529ibyyvd0yvpj6apxdqg45fdww4755n3o6fy8pm9w9ulxq70191u1qgfaqzxxzu45npkgood76elalh13xyg8hbf8h2tdz2zev588sjfxj33u0ib5egn1cxmlii3ew1x6oso7e',
                flowComponent: 'bvq8irrxzidey57uvh2hw2muxkt84sbjjfagul9ni32a9wonywkfmgq0i5623brajdo0biudvg73q6cj5s7f9fowlcxgxgdbnfkwb86yo37ii0yynh6j2mwurf4sffns3hx06zlkvjbjmb6bph7yihy0h24jjcii',
                flowInterfaceName: 'mh1fpesag1n8zn7lpk6l8nx50moy0f1gm1onk7sjjn4eh5w95sj9prpqhkvaptsfi9f28425hfpcl00apj85l47x3d6b6x0tlmqvsllb44wiw1sdkivva73emdtmlla9dezyf5oqh0lsdm00o576nolo43sxrgnk',
                flowInterfaceNamespace: 'ocfqk7yxjcylxmfru3fj95wpvsyrhab19evg77lt0h3xirw84tqn56bpa2y9pi9p6g92atuzhl13u20yum6bes06rm8p9st9yd3ohhcvbrb0qkptgbbauv57bsam42vsqgywhlukzv8n50ovou2384ulhzisxv1h',
                status: 'WAITING',
                detail: 'Dignissimos consequatur cupiditate totam quidem ut architecto. Blanditiis inventore rem rem quam ex a quos rerum. Neque fugiat est consequatur ducimus sunt aut odio voluptatem velit. Cupiditate molestiae fugiat qui ut occaecati.',
                example: 'p1fpkwwgmcqn73tk3kl2injrc28kjwbohfkguckrii8e49iyt6in4i1uozjl7iqv6xrgf52we4p232y8f9213sv5pryaaf5vagsy0weruikn4bhy0l84tq0s13sz22flhfc2l7jvo9o64uzos2guohphiyrbyhja',
                startTimeAt: '2020-07-17 04:38:35',
                direction: 'aaiq8nrubsmoyu550eso',
                errorCategory: 'sngwczfdc9ldahg9grr0npikzla0ty5o4hia5o7doy96rwxk8ofemuez1vtw67x2kqi2sqvpcstw5f9rz37y3dfynkyh33g1fsv37ulrjqooivutxs9cadvsocab5vxnfpqlt6xecu2eemxsdat9mybv2t42ezgu',
                errorCode: 'lyw1k6ockw7fvzdaixof',
                errorLabel: 'kioel47uii9a2u6qm4yfl0c7l9kjgh0kqgpqoyzolnkvgt69wxo8zjsoq06pqyvevn9vrx3f257f1zzrn9ct0k2nsc9cqfw7rwolfm2jgg9f58od6mq2abv0orj19rsk5jgd0nby49z63zesgn40br5mawg2ujg6',
                node: 1965824823,
                protocol: '5v8sxtru3ew88uub943h',
                qualityOfService: '3jjz0gets71inymirzaw',
                receiverParty: 'x28i8yxpbk41suep9q2xgh4zcpv94xelyf1d2f2scwbahl07tapqx9zfddaditah01g7kszl3csxp2wrvlaherw8iwj9czyobtlny0x90zyqi6trnomg57erl8p8afugicmbpl9xwtns2olfobgv8ay2gxuhuayx',
                receiverComponent: 'u17gez8o5tlg5dpjzot32q3s7jtpdc9ccgct3smy1bpd0e1moh88foe3rqiqx2bo0p4sd9gzld2lp63if0yxwoofkg4rklbai6gg1orxgk9bhekky1ece37vz5xuzeffcs6q7lu4ser3x9if3x607tfuipa32b9n',
                receiverInterface: 'xggqo1d7x8m4fh5vjfr2lj6xu89o10u2dtr6f37cdvnux85aw9gci5mseharjfu3e5h21ovgt2va2my6esfvwf6wx5n1rxa0mqj5hrbve9pnzsy5sagezjwg08zg0bk0bymufnuf0pj3xyr7ffyb1i6355gl67hi',
                receiverInterfaceNamespace: 'frpkxi33zn3e35hso39hepwzd65vragb5hvz5lee9oh534uvmfax8zbsq9d30664jqj9hc5r5akcrtp15r787bpjzb47oxhony9c25mew88dkdjjc6jqb3w5id6fmima6oqcdurhhff6scz0u5hllhendox9wghj',
                retries: 3557660105,
                size: 2663811253,
                timesFailed: 3469874762,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'aazvr8v8n1smdv9qmlt9',
                scenario: 'sjk1559pg3tyfluxxyh3dblo73yzv4jofghv0ohtx380w63wrfge863itozz',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 06:01:07',
                executionMonitoringStartAt: '2020-07-17 01:46:04',
                executionMonitoringEndAt: '2020-07-17 09:18:47',
                
                flowParty: 'ixrd4or9nnbwljuvpoj7c9cffqgy904n725cykq9amsxy879fukclxltz3xxb1jlw5t8k6t8asg7a7fiy08ijn85198fswuii0f799vvuoo3d5w57txuut2lbebhs15lavzbk6rzt7jj2t5mt3nfhrumejfrflu3',
                flowComponent: 'zylwosfkqi0o6vehcjwba737n72ndcmzv5pj1pvpjkgvafhfidq7uha3j8tlamp1ctblge7fq923cnho3dn3o8ddz4f4q5zy9qwr2b4ycgnq9vbjd5n9cwbhpc1j2utqzfmn6puret8xy2c4scsf1itxspmnxvtl',
                flowInterfaceName: 'iudenyqmdsrdnx6m4m8a969yf1qqw628ufd0gzsiws6k5c5hkw78kckfme9swrwio846otiu6zevr8r1xpbwz3xehupfqi7681js2xcyi2m5inah2oenpeq3xddrh0yhrycqldngjrwgbgmwx9zgkl165vkcu5t2',
                flowInterfaceNamespace: 'z049dbjmtq0bfienrwlw30gyaoml8n943ypf2cqudtxjogt7yg8o5jzwfygxvpf6696rfisoqtu76o5x1491j5vi9qe3x0s0f39ktmd9kki20g3lucaxib1hmt8ewwml2zauny2dex9eazblcfzp8cn9nnq8dyzh',
                status: 'TO_BE_DELIVERED',
                detail: 'Et non consectetur voluptatum fugit rem qui harum quis aut. Natus saepe consequatur. Voluptatem est excepturi sunt impedit dolor. Assumenda modi sed voluptate veniam consequuntur. Quo cumque cumque asperiores adipisci natus enim eos quasi. Sunt quo modi quasi ea error error.',
                example: '11ooxjaol96b3ve34bu1vj5ulnm66d1e0i2yjlzq1oa39d6rvpu1e9gkrdhf0709c4glcicy0jvkp644hqdg2vko3q2zlrcvsiblvii6j2cfvf4nyf6zv1ewizbxm4e1u96e6qksniqblskassam1de13hdvcbts',
                startTimeAt: '2020-07-17 00:58:25',
                direction: 'a3smc9x63thql2myflck',
                errorCategory: 'tuky6m2ttmilcopuye04431ft7i3hy4hguv77to4nxnep0ym7ztdhw53ag2p4crkgvsv1aj9usyunfh9k3r8e2nnypaym034q1jr499abw1hsr59skpt85g4acdyul3126twy4qbfrm6dfgfxk1bq5usciz33dmv',
                errorCode: 'w38adfo2nfln8hd5wdpz',
                errorLabel: '3yc1ol16bgrhjujw9f6ydr084vg5wqhqmofkixiuo8gnn3l78i7jahvu8bdv81g8xpmumq3fd1fy1dwu8vtpwtd35gtrmujlpwgbqkcjcplkg8017vj6mwgv7vzd8bl7yoz1a9978k6uophe9ttntfsth6lwkmzl',
                node: 6222163116,
                protocol: 'sku22yfjxridi8sr0y2c',
                qualityOfService: 't29h3u8fex9k6o5yj521',
                receiverParty: 'dtfypzj7de7fzrnxi66z4oia5pyuqccthmhp2ngojb2yvj1i0zj4ksb8lnih0toeoy15nus1wj79564eb2gchi8cnqjt355moeb58m9w3zjozgqn4as4po7vlgvn78sdl9a0e6yvjve5eiff78mp4qcy9t8wrvpx',
                receiverComponent: 'tp9cgc96y52gf750hw55jpsgfrzald35dqsh6ow0sqgulzuoa82jl5afgdzvf6k0xq33vkehd5dcptzsv820kuaohkequd3mnyhzfrpt7nqtfr9fkbn4de0t6buaapfya7elu6ivffhdkst067f4vsv43v6ub6my',
                receiverInterface: 'ji8owe128457stlwnumksfo191wzajpgwi6tg6bka57yup51s8jdkf5eet55c69rqzwtmahlxohitv7fctzff4jv0mizhipr9v3q6k8pfltr9xjtqq7ct71i009zpwobwz4mco1tdxtwxft7emb4f3mld0wyrwpb',
                receiverInterfaceNamespace: 'g0kvgtk2ogvqe44hje3iudr9laaoue85sf4vyat1d8px8m1ooewov33yc34n1wn4fkfe59uvqdbfig10zi5ypvd9yxrm5j2k467cuwrw8o31p4pq0isbynua9bkmhq68eblq690pizjwx1i2ie29vf3ul3170cnh',
                retries: 6123839173,
                size: 5954219799,
                timesFailed: 5359854986,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '7nlcfpdvxnt23a0kknsg',
                scenario: 'dlr21tempdt3d3gry2a94ggz58ws3oi0ix37cro5llr23o3xf72q69j9z4t8',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:56:28',
                executionMonitoringStartAt: '2020-07-17 03:45:22',
                executionMonitoringEndAt: '2020-07-17 10:06:05',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '49l1fuz7rbck5vt32qnhxdlryter438rnq82skb7hiknb7o55ydyy3c7yw3emcy9dgrkadr8c5shcsnfy9covqrx580wduqq12x8gs9nnqrhsv8tfoacqo97su6x0kcw7ukv2jxqfgiztojv4q62km2vi9jmsucr',
                flowComponent: null,
                flowInterfaceName: 'o5b8j08a6wm9kttj563dg4kdjhofp0j2rr8iwqqtdlzp8ejoidfufean2yiim4wisas3114u1ndl9r6b2dqcez42aanv5vteiac3uu93euk1jrxlp5xmmplg8exdl9vyoseet7nxhjd7kuhjz6u1z8zbx3630xn0',
                flowInterfaceNamespace: 'aodg2eoe2rpseijyuo5f6rux16mxsczijtuf4abo0tla5ksidyirzqz1cwf7elw6htk1vpr2ij8smvp6x9ccuwmja4jflbgkwfz819vybhexm38chyk638vyofzrxbapobjc9rn094oqkkwibgskxygek0xpmz1y',
                status: 'TO_BE_DELIVERED',
                detail: 'Omnis et ab. Ex deleniti ipsam repudiandae soluta. Praesentium eos omnis ut accusantium sed animi exercitationem dolores. Quas ut laborum ullam labore cum a.',
                example: 'wr8m6fxdjol6fyrnn4gjygocr8ii6x5tulvu1jh9dt3g3qg611hpa0m9o7fpoxc7tsug32p91etu2v8byjnumql1ly1o6gfnthms2iqnn7otkz63li2osutgj6ndyveu2rs4g0hhukwwwpbdrggspahpt60j9xcr',
                startTimeAt: '2020-07-16 22:55:29',
                direction: 'cmomj8phm221ufskn64m',
                errorCategory: 'f3hoxue5j4zlsbc39mgcuzumb585bjh5v1rnbjr06jujzo00xlnojl8kn7zzqlduvdjnvoaw9yh934egcp79zmeoo2vc28g4n2djmr8p7tg7ask781fctz733wp79tepbu974c1kt8fxhfl1najduaym9np5d48c',
                errorCode: 'pre134twamhzv1193j2y',
                errorLabel: '7l8kopa5vv6nu11ujntyie4kpg47mnd5n2n9eh3fokov2bo8gr6h4hhhdr0hbzn3rj2v487yngyj2taqljh9lb1mwp5qllgyyy8lcx523q9yh8vmw3f742dyp1cj71ft68j5pzvmqp5mgmh6imjbgfjbur5muex7',
                node: 7974737762,
                protocol: '5k9yokay5r64ao48203l',
                qualityOfService: 'v7bjay07bys3dvkm9r11',
                receiverParty: '871f91i51am1dqq46ut4xacctr3vawx9lxqp2y2r9778kpk1jclz173c9uirrb34jrtoxt85iy1mqvjnr6u7dsawz6epkwzq483bd0f3sy91alftkd2442ifv7x6bghgob9f74e662jvexihcm3d7olgwamrhraj',
                receiverComponent: 'bvfsx0zstld3mw7fresj4sry5b5iypmivam6tt7ue4nf2at10lw0d4zm7j1qfl1in4fh5777g8y7gh8xyy6nutrvyr8h1uo8mkff21eq8atxb04uk4elmk2hjx06ahqj6axdu01t6t8qsxwnx4s5k2of3zxi15kv',
                receiverInterface: '58g2nta9q9xs8rc90i5vkvczojipwcb5xtihsbg530ywfu5xcwkkbbc35vfazu7tmnnlhq8axcl2aguga9hik2zhyaow0b8qqxntro10rpttjxe4e060nkb3qghr5c8nsb40hdifsm1tjakqzdfuu2o5ctxld0pe',
                receiverInterfaceNamespace: '9b2w2zvsuhlg68s0qrcf83nyeq0oo6uro7yc1b0udw8a4f03oyhp1tdrlj1usxun918pfhfurr8fb71llhby2k0wykgvdblsnwwftwtku6r5gdcjf9l27c8spz9ykzptbxisewn8odxn42lg0gjahvzzzlzmkp4i',
                retries: 6477411022,
                size: 6410798537,
                timesFailed: 4367495572,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'w9bdyh3snqy0vqt8z2un',
                scenario: 's1vlrt5v06c4kjyhpm897j04f93qy2a6wwvnl46m4g2xqq6oxmg8ie3yny85',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 20:00:33',
                executionMonitoringStartAt: '2020-07-16 19:55:46',
                executionMonitoringEndAt: '2020-07-16 18:18:07',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'u5ingepqid1ia2qss8nh1ocerajzdn8jm8dfcb3zg26ynfuadyczym2f7y48fmakgjod4ca6zsshxnzuc7hayz5a1wi98g5ny3d0ay0j2a07gf1q3tq0nzktp2n8zvdhklr93hcqdqo3lrbfbm5m1dtide3th9gz',
                
                flowInterfaceName: '1zwpmteupvdpfcrfctcjp3ytq4xi3ynfe7gto1brrqh8o61zl6thddyk57ktvn2jqm4wwzrnvg3e21ozkvdnk50ty0op53gtp868e185avk02oigskg0pt16jpazmrb0sc82zxv31apkkb1ofm60xkasy6gsuyy1',
                flowInterfaceNamespace: 'aflybatrt3a6xtz2219tf9659j0sk2iva2wd2k2ohqg7yijjk3zbb0go3fvdsu39yogejg8uyzzkkc26bdtt9sdiypudrtrk7nq0h3f4w5j7uecgi4shuri8wy0leel0xmwv0itrtv5lyalt3b2ewy345q7prloa',
                status: 'CANCELLED',
                detail: 'Temporibus quos explicabo. Eligendi necessitatibus magnam autem est praesentium quis repellat blanditiis iste. Eius odit fugiat numquam aut cumque rerum praesentium.',
                example: 'cunq3podgqqch4drom1ny6bll9pgyvc0312xjguiiq3p8ah6ndsqrat8zur3sb2zl79karo0zr4znna3l3qbbavsm55wkaweq7v0ji9frp5bn0csds3o2xnsd1hg3fb72sd23ekn0wxjoru3brxl4pkoxya81vxi',
                startTimeAt: '2020-07-17 01:32:44',
                direction: 'dcq4h0j6a9q88v3fpmyt',
                errorCategory: 'pqw7w3t8k5a8w6s7ksv96yaz8jq9l7y14hwckjgs2pqby5pdpfv884zis1zjwq70ue7rm710jxrxnv9btdarpdtrn9ott6cqep243xtvbbyua0cptrosxgvy6ks7bbyew8e4bodcok9jmlowu34of37rg3vgwnd5',
                errorCode: '22ptcqea5f8cihwdiqg2',
                errorLabel: 'vjgovqgs8ju6t52cmbdkswpub2v1l9ybbii3fsv4ly5j1v9rxn0cjmg1zefrxxvky0heec33ptihb09i2r6bi65wxhv7prtbekl68lh0gt6vdc0rs3g8l1jo9az3kz17qyvbnqjwn4o0iakmbalrgjoy3gf346f8',
                node: 6044314940,
                protocol: '7sj5c0nadd98gf0p4o46',
                qualityOfService: '9pcwtpr486qcw5ogd3k5',
                receiverParty: '0j3eoy8rhskdkdkumh4pgcuwwotsxe2abel2qke5rj9fx64czqa2yyxxher3b052rbzxibr9nhrrgqmk227io5ty4u03te2r3wo237a2bbsorrl8dl3j91hoeikx5aihvubn1ov7ln8v470zplpxj7pdf3or941g',
                receiverComponent: '7sc2wkdb0sds6uanc7ricwjlfy74oqsldfqt2yhqoxd5e78sb0mt5fw3zw7fx4w78fuyj83x4dow7jv3tmxbcdu3g67go6na0mrz41a6swqh322q6bq6cfm6wq8anuwx9w0rxc5nraxr3l8awqf36hb1t5qx9z5g',
                receiverInterface: '94bipxsypvrvpwn04lgihnhqfokem6wyx056xbt4aow1nymzlzgtyifx9e7c6w6za5amfms7hquf0kzmuhjmu7mmm4vu4m1rb4y8q3m3ud7d1n041o16l06xmi8u02m9kjkrvp07uk0n2hm38utt6uwdubmbxfl4',
                receiverInterfaceNamespace: 'byy4vdu1rdvxyldk30pmnt7pzynzvkyroh132yrz032t84r3mc55eaotbgcl5gul3jox6iwv8p0zxriht3nqrkhekg12vz9d97wgnihmywd5tls7qd8ot9kw76uj6o99dsoj21lb72l7gymqhz97hfoj9fuar2cl',
                retries: 6689356948,
                size: 6860048983,
                timesFailed: 1338237348,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'wm2z0slzoqbqxz69nkak',
                scenario: 'ob10wkgi6tihnt6h2rwaidjd68uemrh2u01npnh1rfexexrqalvzsnfx26yy',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 13:34:19',
                executionMonitoringStartAt: '2020-07-16 19:52:22',
                executionMonitoringEndAt: '2020-07-17 00:43:39',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'frihvvsadm38stykf2bx9pbr6qxq4jh2v3oe9vwqod8ycp9morpe4oy8x84fjo0jfztwgagkkaxsnn3kcqgthcpkbif4e52tialrhg8fyhcp2xq14zzzrt3tp1bmonbckthrfiuqaj27de98gkwf3svgcdfcx4yd',
                flowComponent: 's5951wevcwq3ycooi7f2mvgmuyblk8wqwrxpfxohqxsuwwnlw4v3pvjmcy3iqoxuxvjxrt2zwn2vit9xfdrip724go0u1yz0hktcfl9lpfncf5uaiqt19gpnmitwm8f12se91n91q6ygnyqe40np6lr779lzfdfi',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'tv6dlb3y02ff00wgm177blypeutn5rlk8aj25fbvehggwlmv0ix2ldj9ouiz3nxljq44042c7vk7ufvmcq9fsn96hd03cwl8hfxlpakei89tuoriiume4aene3iup21vvmrxcm84o34wi5z9ggp1nl7b090ne0zr',
                status: 'ERROR',
                detail: 'Id doloremque earum dolore voluptas voluptatem libero et. Dolorem veniam blanditiis. Eaque atque atque nobis. Ratione harum quia quia cupiditate facere sit harum sunt aliquam. Vel voluptate recusandae ut itaque ea culpa velit qui et. Expedita unde exercitationem quisquam consequatur et ea.',
                example: '67cjuo1sgj2nse59lfpc5qz493t9qolzdorzam4mwtcmiqtd5tlgpp7xi8fzl03zgqwzoawmk5v0i3q2pwduuj23obg9kux0t6lucz32tq9eur9qoj9vrkoabvb8vg7o0cwmn04sjdp1wyfl3cjldub8im9q39t2',
                startTimeAt: '2020-07-17 15:27:11',
                direction: 'k0rgi87n7lfi95332bnu',
                errorCategory: 'fukez18w3824t6q3mx4td0b2hai09uyyx14po5b7ktw1z1nmo1j85lbn3zeg8shrztimluzurgdjp9oryxzyun32tx2huw4gf5rhm1yzagb3o7ht1eznbr2n9j9cfvt20n17wlbxobsi60evqhplk0ldxez07xyz',
                errorCode: 'mw3a1chy8ji1al0wjhex',
                errorLabel: 'x1ny0bhe05hhh3tcirslwuv4xb49wf41n7kz5zx21jwnpc2w0bqpqeh1u92skiobr5s4bx6a7jmqattoljt7obgtmv1nqdf3gvqccn9eb1sf0sj1f5iwx3ajvcq5zpj40be7v214yd6yz9xdu0cykac16wmnay9d',
                node: 2518930698,
                protocol: '7utw7k23brt9qdvqfns2',
                qualityOfService: 'v9hzmskpah9x7i2ubh8l',
                receiverParty: 'n4za7j19u8usmpdnna6jl4y8f2daggsmwo1k0m1zhf2c8y0cmbu57ugskr5856nobuse9m4o25b0rf3ss1p6vi196me3n3ih7iqv3k0hsmzewat5vybdorev4t4oxaguu89dqpfflfei7mpulviuvnyrcrqb9u6m',
                receiverComponent: 'b78a1i0iu5o4qsopu4s650te7ui9s6k71kdxkxtlkfgkm8cnkv9dy9g5b52y91osla53rbit1kz7pj7gsnz99l2sz0xlthuzyun64rogjgqbz5zchdtslnfz9nztt83tpgmaiukuqcd683y2wwm5v3nojbpbxu9w',
                receiverInterface: 'j3us0jc4071fgehpbcd8ylq1xhl1rc9qhndlbnrmvvj423yumtu4is28tseozuw20t398bmeh9ojcm14koltin2krf2uxd4czmrhmqqmiui7k9nupp1r6lc447pkfr4d75drzvrijft5nhjfxy6pi0s6crg2sdzm',
                receiverInterfaceNamespace: 'dw1rauww024me9a993noz4nqf5z4sw1sui6y9jqaqtvv2axvyiuyc3tik6xmop9px9k40xn0cydc6xnhctdbef6d2msbtnim7n52cxn90vvez3rqieoc2w4bp3ihf2esfh8ipquoiqhmm4bx5m2blwesmpthi769',
                retries: 4288170346,
                size: 5618787484,
                timesFailed: 9187688934,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'y7350c9wks4yftwfrgdo',
                scenario: 'xv6tyays0j36rikc0hde1ec6cyl82eaxc8xtj9cdqoub84y3ye2oesv9i1ll',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:20:09',
                executionMonitoringStartAt: '2020-07-17 12:05:47',
                executionMonitoringEndAt: '2020-07-16 23:13:48',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'hi6twbinr8gpxxegkqp8cyxdoae0mxgmujcsydbcue72zozy6rl5dm2kvvbhrb6xq7cile7vyu0vp5id6gquorfc2pgq94wpwzy285luyarnyroxul3yhy7tb3a2c9w9a9huvegipfqh3ev9febmpl0a9u0u8188',
                flowComponent: 'jwgt6tgc0xv67y63bk7fo3gb7m2tiqv4wcs3gobf1k9a83qwf1n65zbassvehqiko7ynyduwesieugf1a513h4wnkg2bj9cgtn6qn3aw81cprw14cma9oe277bv1nzbgim50h1pkdmw4xonb3n9435sle7y2aw9h',
                
                flowInterfaceNamespace: 'uaw1ztcs5flvttqn0ac5xgrr7l9gccbcaio9h0jisnieqcjtrt35kbmh4lvrh3dxc5efoijk3e2uw8pcmc8yzy74xwplq8git2gbwko5sm9liq3fov00bb51nisr8vxcgjqrs3u4a299f8usr9oefj6maqn653pj',
                status: 'HOLDING',
                detail: 'Et voluptatem aliquam vero laborum officia qui atque maxime ea. Iste itaque minima eius est aut. Quo quis et doloribus laborum esse minus. Maiores tempora ratione rerum beatae quia quasi qui vel minus.',
                example: 'cq3zisoml7pampfzoyx42x6jvm07bd54u08wm9or0rde6e3uydbn7gixpg1fawqv1msq79o2zz8klw4li04eucgou42wvw1r7hjws1cqwf2udpk94b7byc8y392plh8fvcaheql3bezfl6dr629l6mk4qnezg24m',
                startTimeAt: '2020-07-17 03:11:57',
                direction: '5onu42nhst3ckqq1tquq',
                errorCategory: 'v4h8d3brjynrmum0205zyyicgz68d3yzzgzz66o42gopg12w9gok59ailzlqw1fkhkgwnw5sv88kkqxfbgn8ydw8zulqhurjkx41544914xv8eg99qtp4aqgru5hfq2rrkewrc46efacgdynoje607nlozkxdt6w',
                errorCode: 'wqcfin9zzcw521jkn2bg',
                errorLabel: 'n6jgqaivi4ev4qttw7ybirkigtikizptd12d00u4m7dqw34f6fz5ecoa0zjeuqdtemslttb7ods5ujrp4twomphogeu8esgpkfzf9b2wwjiqo2ohgdjnfdvckkv7fj37b71s528370yn85wt59nz4ija0bgzooge',
                node: 8482958147,
                protocol: '206xzs7mfv1aawalhzsq',
                qualityOfService: '2aqiwyf1c8rzuibmvbc6',
                receiverParty: 'uk7r1a1vkfpgtatb6v36n1p56iqyjm2u2vau54t6dgp0zzlz4cg42wvij4qi7clwid6xw2jacjmdqh18sdahm7cnaa4cni9b30y0ajpr59uu80h8qav7l3utw8ja2og0g47u9chh0ghmxatt2jmmiky8bnbk3mzr',
                receiverComponent: 'wikyvevle9oycun9hpfzo26a0pb235y7lrcna91odcmqavk513lraal3mkainveft8ihvtyt8h6muy9g9dhanq6210fv335ohmqk8ivwqb5notf2qmet3rt4jc2bow5bshqxe5s0rsoz7rz87iosg5q7wpdkfiua',
                receiverInterface: '7pxfzh5xmesfrqp4xrhynew9w0jzk7q499jygwf87e92vwhkey0nmp9da1wwliqoutlwfxwarg1gsq0u0bruw26obln1jicwn3vfszr72r049fulcn76yvgcax576xcdv79r75hadjxhdtadfcwe1ylj3ow7y92y',
                receiverInterfaceNamespace: 'fr1r6xrj1hu6z86cmi9s0uikkjzywk25uaetufucopb1cxvkgl0colho1lae7cpmypbjxfhmft3b7ozub9wrp1ny91asr796tktb5lrs273d2md0m7wusgfj41ab0va9i160grh3nja41vf9npbxh3ngdqx8alxc',
                retries: 8991251724,
                size: 5456831762,
                timesFailed: 9418763642,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '93oskhhzmaq1kgqv4xp8',
                scenario: '33yl6oyn1xq6osjjuwg4v1ltokoamnrse5663m5w8xbdluf7w3a3l57k0bon',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 20:56:16',
                executionMonitoringStartAt: '2020-07-17 02:14:00',
                executionMonitoringEndAt: '2020-07-17 13:33:16',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '140h4xvjn76651zypitkdj7gfwnk9zjrychu64ew6d3i8xi4b0rq6trorkk8kqgn46gdfsht9jpqfb340hw953lk5usxe264nt88uk5f0qmzlrw6m18mepi74e1nhuf3da99m7e8gkmwms0po4xr604w1cyiblzl',
                flowComponent: 'guu6p2ctx7vvikcwfq3ebpfbqn3xu1c19vmiuqfhnlouzetflf0pe1xuqvut1lcja6e7ex57kx4w5alcb92otidtfo9b4yznoowzzmpm2j5eajqsk18lzh0h3ctzsaeus9qz9bii5o4lp5tqbf1amzxbkyb8c6ld',
                flowInterfaceName: 'hwu1d898bk581go9i4vaj8nfheq6z1kaylb68v8t25piqqkvrlb23c8htkdmioocddkvs9yoqgn6y7luiaaenn33uaki11q7ecitnp11zh2a0e1v46rfe2jwpuchvwdo57fzh5xlrfyihx88c62kra5v9yi3p8jt',
                flowInterfaceNamespace: null,
                status: 'CANCELLED',
                detail: 'Quasi suscipit sint reiciendis quidem quaerat nostrum. Commodi est alias hic iusto molestias enim. Ea doloremque repudiandae ullam voluptates et sed quo. Et dolorem quia dicta dolore. Ut ut ea blanditiis rerum. Itaque quas molestiae nemo.',
                example: '3kztyxp78wu2w69qo81seif3fo5o5rvsxgosc4craqqikfl620ssbuiq351b0mv4j9f47gcio691lbsxi5rcx3cyczbzxjt29rqkjfhwl41yc7uusn0pikobh1r06x08hldkaa80c6t5c8o3mslri6atfspos031',
                startTimeAt: '2020-07-17 08:38:14',
                direction: '4q4xj3tufnar1icrxni2',
                errorCategory: 'w68rkx6mmjhnb9if3awadsesevf3mj1awqgdlb5suykjjs0cgvbee47xlo3p8xarg5fhr11f7f01xe3sbncelfty1j8j1jtyj8s6d39896pmzttvn6s1wtu08b2z87j0la7krfvc6kg79pwjxnji3tw9srlm5lep',
                errorCode: 'tavwgibcmh2t6hzwpnv0',
                errorLabel: '2r5sjs6ow877lsbnjx8e71xrbbvk6kebpluglo93m8ctir3c8oaxplv3uncqspt47sd6hry2fz85bb05q3rwfyj24re8xfzge6lvw5cpfug0qvvtvf0vyx0a9ch3aivua0lsg6kzqco3aeyf0k80gazgrlok910k',
                node: 5426168718,
                protocol: 'dsw1x4wqr4fybs4m490e',
                qualityOfService: 'tasirf7dupo22wkdlh6u',
                receiverParty: 'sajsg88mdy70rlhftcfsg1dt6l2i2bru7jj98mks8azgdtn4uhxq5ld5iyya10qk7sv8yk7msz7t664o7x465nti11i87b59me2f151sbxzza3e3or48dz9cy5bd0b6grt89pmjfg8tl7s8pn3cqq3mfh5d306fq',
                receiverComponent: 'lucghvdkiie8hqq3f22ydr3py1bin9ln00bi6zso6v0wnbd7ivnl4t3xa4dsdgrep6f8lsyillx0wc090v3dkj5zunc7018pcgxpy44jmv1kxenaew2z94j4bpsbs9reia6mdviuwv8xpgrs96dewws0kkwoz5f5',
                receiverInterface: 'l4a5339129d431st08hfudnztdrpu7dt4hwtt2qo7jopitw8wqyofbhpdqm4b3khz67xpkzw2oisij73nkfrdkk7lzvaly6sibmqx031vs9qbas0rssgu8gfz8u0zlvz3y5j5jgl5wpsta0tsx6xmoiencp0j5ez',
                receiverInterfaceNamespace: 'z9nkpo57edkaww5e62ep6lf2pywjudpmvq9c21e95zipdjvw99iawj62w36e8kvbuxg5y8txsmrumhu48cmogfkemo4v0x6yeihdygyq41ygw1robnvl5ern1s4zfktw20xazsu4ypavzrjkvihnjjfdou56cljt',
                retries: 6986327338,
                size: 8935282337,
                timesFailed: 3556931628,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '3jjq7sv0azui5qv00vv5',
                scenario: 'utw86i2lx98iq3re2uqey36pagocd4fv4ivf7hoqgpdhog9cyy67i9mjvn0j',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:11:22',
                executionMonitoringStartAt: '2020-07-17 15:27:24',
                executionMonitoringEndAt: '2020-07-17 16:22:12',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '52qsa8ls49kjinoma4076knmyc1cduwtp2r221xqcw939g6p5kdear64det4pumkb7o2adht8ljg5vj01adrkq67s9nfeee36ebrjk85udfy06p37j5y1c7uxxg19xw2kos9rx6pvzg262z5dorgntz589y3bhfz',
                flowComponent: 'd58hb60lerqndrjr9lnij39wyej6v9zk8ksgwysyjocjnf925kmxt3wb66l0vfeeryjgjb2q6qexvtbzok0ulfqn18ygjptsvv1mgddnlabpg8vv3hls1oedgd6sp7wcn4j089mgdxa601v4iitxkux2wroct371',
                flowInterfaceName: 'pbw3afglpr5noj08kxvh31m8yavcq474kgoef6iru2md3akky0axg7zfdmpbpcs3gsjwl5fx2bfl1b6p0e5sjeqxoqg9spbi6ichb9votdx05r1lhnzm57xjwug4urr49hasq6r0ueyobemptcjinw9rl51ajm6t',
                
                status: 'SUCCESS',
                detail: 'Dignissimos dolores placeat rerum omnis quia a cum cupiditate. Rerum illo consequuntur suscipit debitis tempore nostrum quo facere. Delectus quam ex ullam aut eum sunt.',
                example: '5bb5sc03qxvcifwkyecu9rqgrcohjnfuwv03so1pg82su31ahlvh3qqkfjwt79l21hlcicsc68ukhad1hoovry8mpzvxe6be7kkd0brdh5cfarvffe77d3vtajdbsgpo2onwo70smzh4zqako28gfmiwv2augmg0',
                startTimeAt: '2020-07-16 20:55:57',
                direction: '1oocuqx7h3n6pqmjsas6',
                errorCategory: 'ygdp8ypvfanxphjkj29vh7xps6z7a9tn136idsm4dyx4w3djbm5uzkpe1o9enxmhooux57nb9q8bvz45imhk8yqgyv9ivtd2l22c9mchpxqraiju8bb17uwt2kpdgseajf9c15jy5z8a2szofht0gfxjprjvjven',
                errorCode: 'eqq9w4h2k103jz66q0q3',
                errorLabel: '0pinu9tvy5upu231v6do0ozyqoh6srh6viz72lqfzmf5nzbtrg9k6b26p1t2iy2gl8lfa5kkykifnyzc3cg73psys78dcg98awta7w3t2xlb8pie8gtedv4z18kqepinpdkqymo9wfpyp1scvdofex2iyyl7dnif',
                node: 8654342481,
                protocol: '6y5cogaoqq29bha5a1o6',
                qualityOfService: 'g0vq4e92e8zqvigo0xp5',
                receiverParty: 'guesfbdi12gxbeas9mqqexvgwpedt44mft5ql0zozx82nt16emnc21i5aeyt1v8j3b6yr77yg1d1rhhikalbghdwgvnwfg2ke4wey1mvhzoivl9lyzdqwjnxk9l2fhlhjtotwzok5zgwtu26urf6s9ayq2kk5by8',
                receiverComponent: 'hu0tpboh9c4z8tfq4a1nbm839o3je7y01lfiw5bf7wsgn2b7yos299pjco1h2g02s2retlhhoq3rf9ozdlrd86i9f4z7j4rb5qn68ahun86ezgaehat97eluktyngrksd66gza1rfsmow6gvlk5bxpcyid8ehv50',
                receiverInterface: 'rdmcdfns2hdkgjn9e6lrb6jnfnr4jtjhji5zfcz5fuotyrkyduxo6wzjmmni92560nhk834f7ov5snthaeqskflccvas7bk9te91sb1ukp0j3jv6fe9wq0knmbcfv02l5zei5dagn7hvj8ht37mcs3sxvvwnvx7u',
                receiverInterfaceNamespace: '78tvquud2d4aqkqps3hjx1fsaciw62onzyw13j291f7k453hk24m91v1cznmbn0q7s37v4ch55cr0i1a61aqgkwxtzeuuzx4033o7x3bglnl2wi88bjcpfga4jyh2w4zsmi8sfo0so8io03hlumieep11x5iylln',
                retries: 4574324011,
                size: 6522560138,
                timesFailed: 4841091307,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'tylii5o5gm901ram97l7',
                scenario: 'fkmwpcxzzfzlards0uiu81szpsw7700jx38cm52forio7ewghqkxzt2q6o3u',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:24:41',
                executionMonitoringStartAt: '2020-07-16 19:01:07',
                executionMonitoringEndAt: '2020-07-17 13:30:37',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '8cnwhn0cvfeshkraz8fol9ebmihxr3jni32mwnblz7omx7b43zghgldifpcfvfek9meazsquqspz0hogvrvqc7fkwwmatddnxx5a80ycy4jsngnjgimu2k7ylq1tzs0l7ljjo705tjbz7rj4oy8xnsprr9ktvss2',
                flowComponent: 'b1sjuucjqjcu3f9rvy8mwmrthoazd2clxeasw6pwv5oqlcyn5gxgqe9qbvncmtp91jaeslvh1zpozqfspdkvuma31ya7t2f0sqhg1rh1wq2dwiej7mvskw7prb58mb9ltya3fq4f6zuf652bw5jr9fai7bl1hzto',
                flowInterfaceName: '3gp3tu4txrwx97cstbqo3g69kvdsu2k755x9zehr0a4iegoxtgbrru5drriecqsaodbhf9ywiu55sgpsgi0wsdg9xaop0h8e4fhxzrqu0lux56dj3zwx8zx0omsd6jttkowvjctqu9wzk2gbt8fbrvr1ifu8o4qx',
                flowInterfaceNamespace: 't5bfu1x8llylvy5q5dvr03fnkmc5eo99wrg0w4hmmca25u1gzc545yz91me3e4wdh4urlj2wyzmp1e5bpz0ssftapd6ook71b5dtryrsxzeforjlgidr2syyb090c7yeax378t29c75yzvsz97mcfit56sstcuu2',
                status: null,
                detail: 'Quis eius qui non porro saepe veniam enim. Autem reiciendis harum error iusto vero. Pariatur eveniet rerum quia qui porro.',
                example: '4oyl7dimmh59333hhmcwpr7349fdhplyggu2qqpp1lqa0b3915txbdlsu9jzx9jhuqynbo1v41l21q3i1jqvdc6igioz2hvmk7jiwbwgykf69fcc2lwkm7zyz37nekha0cux8i3eg7ph9tb5vccoa1s7c0exgafn',
                startTimeAt: '2020-07-17 06:36:07',
                direction: 'bcjp447eu3lg7v84djak',
                errorCategory: 'l07hykaat9ubs33y7m6wmezwcry0t8rs27211b4508vhhquotabk4hw9xrdax4a2qa8eo21ijp5uixqta6mx8qmwa344dmpnj26j9kgn3mgrupi38z1pd3h954vrhulr0choh6s3v0fu4x0zyvjoldwxpwfmaehs',
                errorCode: 'ixgr297xirjsav2gyawm',
                errorLabel: '2si9on111byr00m3um99n7f4a3w46y44ffqnwda8i0dheogb24cwicr3389rg6enhn7h6mfs3r9mrvla6ham0irjmvg92ymfifwvcojza1vrbfabxolpwxz0hdg1v2u48oi77x5fhmz22b7spv81ad7e3ytjodnc',
                node: 6460933092,
                protocol: 'ha91np36p7zhu0li79dq',
                qualityOfService: '59mv5xi4dwegwetcq1z9',
                receiverParty: '4a85a8v8ax8zfm1le8f8exqvp4hlr50tulqv7hhcbe7oq8mii626a18efcw3vh4dmpsblwgc63ul2hehpvsrra9jtfihsx0d4gwwtehxzcu4c83fxet5i9lq4f56m1hfo5wlrck9zk69b4k6knezjurrygztjqw1',
                receiverComponent: 'apj07714ixz1uyx8hvvkpbp9bcpkd64fms310x1m9qh17lv5uwllapuuqtxbj14vs0fg3bc9wox920ctls8ogiudwoyoct1m58pemm24dzqeho1gbffq7qgj0xng2vy4hn40dya5vqp81nwuipzgz3o3l4oj2qth',
                receiverInterface: 'ljh1ykeo308tnka07mvme4xupvroavxolcskw0kyn3h7y10ptknjkyml5lz95y60wmosvc8le46nnn89hxyjorys3ylubesurgen0aokl3xpxgu8mcds4yv7oqkvs2yxbglmvmy8sh0g74hc4e5gf2cj34e4ty3i',
                receiverInterfaceNamespace: 'wt3xij949pp1928m9vg33h71ai9ivdjkq9hsgorwfvvz6uhdyzcd8cv1x91t5b5ug9it70ksgguxl1aoffddsehditurf58abrxz2vcy8bme6fypp4h0oxestdg3dl89147we9yumcr4b9qocrq1asr4jto2upl3',
                retries: 5333567854,
                size: 5393097462,
                timesFailed: 6561908650,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'wmdq6hh8412px7wm4g7a',
                scenario: 'pyg6gomyjkb28o3nssbo616pbx913z8x8czbf0hlz0ekvtvy6mdsizeb00b8',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:03:36',
                executionMonitoringStartAt: '2020-07-16 22:48:23',
                executionMonitoringEndAt: '2020-07-17 00:40:09',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '8qr0vpmnyjmvrtel9zacdmtmoiiqs393sktdd7hdgk1q4t30kuw2n8vxk1xgxjtkfdfvz3wwm1a7wu3ovj3gcu5yt15ki9hdaxh10rb9owuoj8pef63e2jbmwqikhrbhhfhcrldl5twp9014sv9aibmnz1pfn2ri',
                flowComponent: 'zgby162zrnnw5mlhywrpehy12guzn3xzg2gghtc1lip5n8slrhbkuuphn3s7s21v9u3rzdph9irmgygexpkjxtobooeyxd3utsgc248vyh6go5y367e6akvj0kebu4zjfd1ta6kq7zk4evim6nt5x9vq8qm3yirc',
                flowInterfaceName: '686tn7i3i8sybs3fyv3msz41rkfiyvgwma1shtu5co8pucb4vmoxzt65j2zhf4iljxi9bzfi46c76tm3fkpntwhqewge7stxnkfumj0g7vj85fu3s2cshbydohsymnuh21hll7c1igm2e8q1u9m54typujlqh1c4',
                flowInterfaceNamespace: '1jgr9pxea9iqiww3xv7879pnkgbp4pu5sfpdjuibrdqwl4v96mtbctq09pl6xce154ltau09b7tole0isg90ck7dxvkv45br92ks86fmrcswxj0xl2s4mj6z93jvn2qp8e19185aihzuebxx3xpwmev4rsnzb010',
                
                detail: 'Fuga facere neque. Laborum accusantium corrupti nemo dolor molestiae ut ex cupiditate. Accusamus consequatur maxime nesciunt rerum aut.',
                example: '1eq5gpsb32jcvgqp2i1xfr9j9n6g6b0o8z1s2jfmnd68jof1bqiwe8t7m7uhr6rqvmmjlipsp158cjt9itur4uyfoy2eodos5e1kt4uxz0k71im4yy7afjvddljpiefddy3y2pfe7dgzolpl2ne68wvm3xgytuvc',
                startTimeAt: '2020-07-16 18:08:47',
                direction: 'ror68dr4z6dciqggn0el',
                errorCategory: 'n0xxg1gbp7wdfxg4cct50hxzn2ay3pldzg2i7jcuax4rda3e9k5pg0wydmnx0axnt3pwl2d97f5cwukm6vlcu62wdw02idya3jsxo2ui6f64ak5hm2llijz89q27bh3ebd9fhw5k24zuthm3onnrdzctqypahw9v',
                errorCode: 'zy0f6yy63maulqtcbhaf',
                errorLabel: '5vy76zcmnzl0evor6h808plb2mt0kecigurjnyg0qvqpptv1kx72bpwmgoxz3nc822pctt9gl3cc94jiqpta71evg3zjt94i3l7ws371gi8snm1m2whnonepxtumbizvcvb5p07qorm2gvlavtynlv8goream9ms',
                node: 9064388535,
                protocol: 'w14cput2ghar3dmqbxvu',
                qualityOfService: 'o9pb10691mqoxvrcpqr9',
                receiverParty: '0e4gowgoq4cs3sibvcb762k1ml4cm6xcvw1houwyo3cuoe5k33q6h0s32leagnbdud7fgp8ho9dqvhvs3dpx355xj07ei3m6a06sx0jpgmqm6ypv7299mhiccjx1agjm0uhn0q7vclfyv5ag6hkcz3j75jzehof4',
                receiverComponent: 'rzb5vj8rush3ojokvt4xkdhletcs7nqzzn1pkdhstjjh612cptkwh2puf4wf2cgvjzju30aaf3vhuk038wcmv7y8fvhnd3hup5m33cqcwryo04csalioef9e41zjgi11x3dhe9qfupx3ytox4284jvlwz85pvv64',
                receiverInterface: 'bhp39tp5oxkejsnhezi5e106o95sslq1knad43rfxx7zenbkmsf4pmbmzcz74ho5hj43z38t8inlgkida9fy3hh6fo5nnwohvd1zqjve0h4gwmldp0m5a0d3cm3ru2br39y21yz53d89tzir1clu71vrcvk2i9sa',
                receiverInterfaceNamespace: '1220v5s4ctxpl6ppc50nj2ag24eg15w387eac0g6ewpjdwf63lwz6l9727tpva5o1hd2seng62uu0zodulug3ruxbs12t4g7i9yxz75z5ujsr80vtdahcpf62ibmy5mlhyfiyvcymfsvvq5mghegrqvrhhcc4489',
                retries: 7676447403,
                size: 8848600121,
                timesFailed: 3953014699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '5w97c2lsy2pt4db4ehfhxlyggd9n8c7wu2xz5',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'lv7c6zr4ebd22lcjw7hd',
                scenario: '0tl8xmrkmo5wxkzcmugw6txzo1zi0hnkcn0g1xsrqp1a8vaqgd9qu2fyo5te',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 09:19:19',
                executionMonitoringStartAt: '2020-07-17 16:12:20',
                executionMonitoringEndAt: '2020-07-17 00:36:01',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'ptmqrew4oeysblsgois7kz1k9rmzes7nxzcxi17g71f2taxc13mvltawjw45mlqc6wrt9j73a8qonr4g0gc1nfhdri1d26r6r5t59jgq5jnux1ki4ae3cvvm0wj74q5ljo153hagerwbodimp37hvcqhrk9s82a7',
                flowComponent: 'fi0om3g9pnr32t6pr1cra3vmxis4lads8v3bhrndqve98lor3lbosm8aumh1fw5mqf8rnddt81thzrqbraok5bk0nd6ulxq6l0ap8xn5eh6wl6tts4btogwwli9fqtg3zn8278wg0al7bxadbdqnxostmd9pp9jk',
                flowInterfaceName: 'puuuub7yr59jq6laexxd41mo9vzq8yp952ujpj26a0zp5ufhvvd1r7a1alxzv94ddfirp7unm750m25bhkei55uv94mi1dbudgdxiuhjd1e9n4w5skbsnruolx8cuifdsxdf4el74k4rt3ppi5t70naru7cy6q0h',
                flowInterfaceNamespace: 'ap34tzvnet8ghm1u300kfcc8c8d656u6oixemutgjj7cjgizhf5i07bx17qi9riirbgfuwkrjw4m780zw3wm0mngk9e9oe4nfak3md3lhb14etmfnjsb03hwhjxyd6uwdgojdknh6nvq7r4k5clyu9zbu8otd898',
                status: 'ERROR',
                detail: 'Quidem debitis pariatur. Delectus saepe quae voluptatem dolor qui sit quaerat molestias nihil. Fuga vel consectetur delectus et aliquid voluptate dicta. Cumque incidunt in. Ut in est.',
                example: '90ze7cfro0k4yedn7o7d4tsn7z4ju8dnhotu332gtb3mb2asvrfgvuqxqem2xo21nlbg9nding5lmameklzoi0celpp20r6hnj7if9bp5ry34kpdg5fvkp1vjeer5zrd3o7g29hv7l3lmqyw84m539q0hyhxww3z',
                startTimeAt: '2020-07-17 01:42:17',
                direction: 'ejsa13om8d23krp3yx1d',
                errorCategory: 'iy1ew5ddl6qlymkq02i2qiz4yjjzgqgz2tukph6qteml15y9p8xqyo2u5tw6tbtkz7mepm0fr6cd2ntf1hda0j5dsfmy42a029kjh2mfh23jdk26d2tutkig3u4ohg86fpb5xm6zwx16k8b96gjqbgs7rgfsx8db',
                errorCode: 'wiceuuqn1nx06vff0bk5',
                errorLabel: 'letcceqgkszmxx6ob9yra0f68a3vlikr3278thru6975ktyb8lhyhpx2n05b43cnv327r5gonlaccatq2ugzefn5vmg3bhf1n7x65uhgb49vwim8b7b7vvdr16gqajzl4knv7fvuj9hq1cxpem2vj7l1sfef6610',
                node: 9621224162,
                protocol: 'j6hkobf3nf9l83535rd7',
                qualityOfService: 'dcjyfu80s8f2pcqr0hpy',
                receiverParty: 'kyqlwwhq7r368i65vgm76scbluc0m58if53gz8h9oz9wmigkdn1gqvvieb3nf6xii1dv9el6nipie4dgkbh70b4rfa524schqyefi20u9rsmi591371lyt9ec8uo7fcyvvaazv9uph17h7o72dxtxajfmm4pvz12',
                receiverComponent: '2xfvpnt7jkobr97ovr6estengr8i56fpb7a84ynulwbnylkaonnhchclmr3ymaxatnxzw4xf2pqvon4njhx1a3ab7ppw45p6ac1tnaa7e5g692yzy3vzzzyqucl4ek2c4fkz3m88u6uvqxzqvyytktnm4squhiy0',
                receiverInterface: '95xuijdzlvozmc1vop2umfe03l9k6vtmfq28wolac0341bo4ommucw1cg1ck1z8tu1ji7z3cj90g87ulapik3o1ho58g1ognxqs0t2lfms7rz4nt0ndtg7hbqa6bl3c79032t7l5jz94obiatxcyntby9zcuj5fr',
                receiverInterfaceNamespace: 'bszp8fh9yc1f9273hugv0fa829r3fkh0vmf46cv35jd7qr0y43g04xrnw7xibw57v01ccqm3lzqtiidc5sm2lmkihtnoy93st1j3v8d7p4ugiorzkvf8lpwn4kqzofdtfpdg5c4enbmh3v08o85ljyi6935xkl4z',
                retries: 9089783121,
                size: 9589126245,
                timesFailed: 8831547998,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'xjrsp06xvbhcl225bw4vorklqka6zv56zbnn7',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '6fpn5xaqb1s505mvhnv3',
                scenario: 'xuq4qwhaf7wcqk58mn0ad0eh1pn25wpi2nomoodztu4dy41h5230f4bzqb7u',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 21:15:27',
                executionMonitoringStartAt: '2020-07-17 14:38:57',
                executionMonitoringEndAt: '2020-07-16 20:40:02',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'lrlkxira0yjta3kv4ekasif1v5yl2gbfdlpqbcnw1furzsstxi3fkw3k419oxesle0n77ga3lszzccjxhld69gdximxbs12dfbkkp6tjt5r7ag7opsdo1inkoytmd299tl9i6we4taigvuhym0jgr9660ogixtwo',
                flowComponent: 'uk67z2zr5n7mwuv2idbjlw9ya6aigspj2bqyae59m0nuvkvyv3zcvh0g9cda5cqm7g9v9i081we3oyuu9a3tpj396vpa64h33coj7ep73porrremdawrd490t9f8xq6j9ejpobu0mmpn74b3eupgsvzwk5am3rdn',
                flowInterfaceName: 'f8bf66v2u4hmu027oug48tqnuvnbf2ye4b470721fqduwm8bboenl021mlhwduhp4wo2obuxvs0nxvinx8meft0ypylz2i9nfndcl81qdl8oqk7eibzpmagwxf6ljj244bpakdtfsai5f5gn05tatvd92phty4rw',
                flowInterfaceNamespace: '0rzce1ch6ql6qan7zro1n64ekxwle3ivx6gm1twd48ffwgjrqwssmak7y7rhbjisjv9u9kcf3304n4apuugyxvw9j62thtl6y6rvy9mwzhtow5dpeypy65u343uxwtjjas5o73shj82dzrxe8i4j3o4umj613u1h',
                status: 'ERROR',
                detail: 'Fuga sit tempora quia rerum aut. Ut consequatur veritatis quisquam ea. Fugit corrupti consequatur placeat illum natus maxime architecto.',
                example: 'htf16he27y7bqkn7vytohscaw4ug0tidj3zsw8qpk03fsxxp1e5trr2swokzs5fptqfgac4hc64co55lbptyn0ukx3oh54jg9rifq4f65z79r7qbgkmuks0ubo8xg2heiuhdcb9s8uecdhppkzvru44w5j9wp7d1',
                startTimeAt: '2020-07-17 02:53:50',
                direction: 'vnzrzm86948mo2v60dem',
                errorCategory: 'bstdqzrpzmlw8k46utpgfjlujubvo7sjo286q646xe22b4gvkncdr1ef7r7yxr2wcwaml0fzwqgyrdmhpcdojx2239ceuyet0skheu0hfr11sn0c0brcno2hqhbenqbbp2vogmitcjm2n52p9ld29w9yeuy29fdy',
                errorCode: 'n9j3a2cyv5ka64wgounh',
                errorLabel: 'yd2cp41xqetx2i9u853b7c5ku3py4pql928lmjabet99zpden6nweuh0vxileo48yrroxk7kjjwqzply7ywq6p4as9znwd5l5dcmbf2m8czawrokggn320fpqk2lgseux6jc93qphpjyqls4nq4f5js3qn86v8c4',
                node: 3375563736,
                protocol: 'pkw063clshf9g7g5dqlt',
                qualityOfService: 'gaaisoce41tt9uf1fb18',
                receiverParty: 'jilpd7zovlaix4whwsl771wjpm6hk974lspnp30437q0tygtty1ugqf3am7anrp4bnznwsfqjikw9xwqrpjddi605f0ukka9hjjmc1p3z6so118o4224tl8xgkzg8tft069jbkai8vkmzgw08vmypb9vc8crzti0',
                receiverComponent: '4z36inoqpvurxsidzr6gk498l2rw8rfvs44ybfw9c2cmzn885g2nxnf1ayoy7vymmrb2e8ybqomsrvmbpbdneyudlci10rzbxt7b7xbasjfl0pxdhxovn7ial88etiazd2sowisj5nlm9dc8u90yecz3p8nq4mi5',
                receiverInterface: 'aukafpfwu1bh6k3r1hywingg19kfal1m5s3t3iwhylole9wupa1f2xk13hjilfbk1pv0fnzh4524r8yyxn2kdwjj4kogoqdgiiii3bcdy9jclj70bfi1k2ig97d4gi7juh8ywkvbhkus4ir98o3yc3rzjut49kq8',
                receiverInterfaceNamespace: 'rwuvix95nm4ru52rhduzswrm9dw2gwg70cdtpebliw6i3ecdfs5sghptvy7zppgyrh9ivhsog1u5x0x1vevsx9mzeu322v7a7y3awjoubw8smn25pic26nt7l831j6hb9znpl9343g33u164ehtmwa1ri381llqr',
                retries: 1055897934,
                size: 9923880784,
                timesFailed: 6120584233,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: '99zqqwwov72raa2l8czvugp174fsrrow8f357',
                systemName: 'buxar5nnh6q5r1y53k7c',
                scenario: '97utz6tpvokiokq9dcvfkwjc8y3z0icwe6mvm0wqhme17buazpwzcefei8q6',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:51:23',
                executionMonitoringStartAt: '2020-07-17 04:27:04',
                executionMonitoringEndAt: '2020-07-16 20:21:12',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'n65m4ghwn0ej8sqtcin8jqfzebdm6cqthgkihav8sv1nm9gxdp8ciqprom5l3viflsqw5qcmbs98dvfc908rupqe2grqxkjutl40h4dre9kk8671pxsllxtxpavz79rxkgzo9bd23oynvjbvzy6ssu6iez0om2pi',
                flowComponent: '9l25wdrdsj5nfjzgwl5szw1zhwiz7fopxhffjt4mhkjycemizorxcq2vb37lzi6s3az67ba9jnf88pwmfm82xuhxi3xx9e2tqay66x28up29fxuksgaz7fe19tabvhbzxokd4bv7llabhucbh8ebdlhcvzquf16e',
                flowInterfaceName: 'dbvh2z9r1aqfuo0qpxc9ctp9alcfol33pd63uarwsj2ju2a19rg7d89ofb1zxxiz66q1fa5mizieiwidoajcrhn0qrf1isnmfmuhljnylflw9c8w9ib3a203vk54c2vf0l4gsxza85i7xkhz1hl8nugscsivzglw',
                flowInterfaceNamespace: 'zltv3nfwaki251f70dmn14hvictblofdp39byt5gfruad2my0v6o3z1be31sm34ijd0fiz1d06j4rv4sq38pxodczqdnzkavgk2p18fgveczwyewivm3412bv00aet6ud50khwlq6y8kes735hdtdt15blg0vdpd',
                status: 'SUCCESS',
                detail: 'Commodi earum delectus esse. Aliquam optio nihil adipisci doloremque. Nihil error quidem dolorem quas quos. Accusamus cumque exercitationem architecto atque cum. Recusandae commodi ullam quis porro.',
                example: 'uxd7dg4vkz1m5hdkf3spbuctldcdksyk7e5glpirlqkwnnqs8cw3z8t180gos0ft2zsflmnvnlj3dh0unllb643zuvvpz586twaqv8t0s9v5d2fsbi0b4ajr7lmnjd8zzl2omo7e3m8wixftqf4awil924o8oqye',
                startTimeAt: '2020-07-17 14:30:27',
                direction: '3va3yea87el2oz1su353',
                errorCategory: 'b9866ou3m1y7tc5z0hfnw9dhtx876m8jor8c20so12dw3qw3ojlzbiq38hdhytxrd94jdsgwktbqeq1ddcyf50vl309a7u1jzizeohletl8tbdkmgch9zrui2wy9vh024enirlnral0z7ik645773k9171l19pyn',
                errorCode: 'mmo8fni6b0pmaakbmsej',
                errorLabel: 'nzn4hthfvw4k30ov7rebggjwijhg8dpa70nb3x34rq0axuwoe99vozox1hiqsaa7qprznq18pwgh1he0fm778l0phgk7llww18uw0lwprxexfwfqp9iynam4cxkq2nzff4z6tdaxpihort4yvcxcalegck6ehzvy',
                node: 8624787740,
                protocol: 'd0lv8r658msly9we9u83',
                qualityOfService: 'hz68clmun81z9lnschr9',
                receiverParty: '2qat3f4yabv3htgxq1f53vgukfxh5ig9v7ocavbmwm5snf6lc9mpadclrzz8aq1kvksrmmyvnqkc5vgybkjj6hsdccj2jcvdi2t58emlekmatf00znc1givg003uklsnxi2w6yl4xaoiqrweh1da6i4bdrhtkfme',
                receiverComponent: 'ow9vt9ablf66upuqxc15p1h34q038rpbbg9gtana5v8i9qwgntqpw3k8cikj6rnmasuehf8rymnombzn52pvl7btk0bmdm56epojtg24ijahpsolul2djy3sv918s0bxs9emhoec7egf2eodvseb52hy1qerdjln',
                receiverInterface: 'd2znu36vf295dsjqlg51l1yxos9ui71iv1brklecowbrjov6qnusre1hdlrhbozx97q4sx9i4vzvqczklfzio8jakr4zswt837328l3jjjz1g26kgv3nzbsq6c3bedoc6ha7wewkssx6pjpl1lfk9hvqfgzn9z3j',
                receiverInterfaceNamespace: 'ckkuucps231xls16blbok17shrdctp7holovr1hd8krhyzw0093e8eoet4aej475j2hynat67116dwgioumqf70n7ee6h0shoxxtxs0x3is7z21v7ms81dq421yqrgxrtz2xhg0tj27qlhifip5uhcito97qrrnb',
                retries: 7656524998,
                size: 6673655023,
                timesFailed: 3112857715,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '317uwmxfmctfxfithqui',
                scenario: '0m3c0kcmuopgioi5qreksp7a2dyrd5mahetmrbj9buvdm7av9plgvnmpe9pu',
                executionId: 'ecyg8yeq6at9dej9pq9d42v2gzj8jqppdtcpz',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 12:33:52',
                executionMonitoringStartAt: '2020-07-16 17:58:22',
                executionMonitoringEndAt: '2020-07-17 02:48:03',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'wzpqjwfzkbicorhrlqdg9xz3jown692gw1tojs224hfqfmky70k37mpnmpxlv0gr8q0vsk23bb0wsi3ysh8rhz93mxjlbt5kwtteh1588ezj7fur6cmal1obf96h9i8ej9spuq9mmz4swbppu6cdb7iayefkkble',
                flowComponent: '3jm8wif9654p81fsn27sf9ezr80iljpgmlpuh337bkm2evhaijocjdpp40hq1vr6eimfeykonf43doc96g3nqn1fm5gowloxj0n7zlcoozld4a1zb9e07qua9asa0o8twnd5bhhf4g7jhsgkfw4xr12y9e7daruz',
                flowInterfaceName: 'v2iyb5sia7bk0zj6jey16y9yqhct3tsfowwdnhyuu2k3ri4kouxcj41sgt48pel8fl00r1rf7zt8bhn0u2quq9il13fwmynqy37rxlf6h3ouyu0dbhpt3a0m17tu88l0c08cue3r9qh566p5eot1zz7gi5ab8lh8',
                flowInterfaceNamespace: 'rwii3lf4mcligl5bjymuvtaacrc24waoltkajt4f5o5377lv48nvth9tcvk2zdjhhsti78wr13q21uvupjrtt4jkt0xjko3rurwzuyg2kr06sqy7fji668qishqfuu20mgzjmwgv530r9bgvmmgsecb96prs57da',
                status: 'WAITING',
                detail: 'Rerum velit quos sint enim quia enim. Eum in velit voluptate. Voluptatem saepe numquam dolores quia. Eveniet quibusdam suscipit inventore necessitatibus sequi eos facilis ut.',
                example: 'k9gd5cjt6hxryu5v2le314wikonqcm87e45igpvfbysmftkng2rvigu0k7eoknxbz6f1kqpup60ps26j5kjgyibpg3o15gsfh2mkpl7lyhid4k7i7nbuq4zqid9z1mwuzoah8bpdj3gaa0wlmybhoaep7dwgw3t9',
                startTimeAt: '2020-07-17 09:41:46',
                direction: 'hklt6bm057vd4po3731e',
                errorCategory: '3jbjjwqow3fzwlvq79it3fqdonql6fk191z03cinsa2rues3apx66ftygs4jdel7q9lzju306vgex4n5dpwykr87zzueb1jtt2bj8d9ldzrkfmnhigr1paz894ten8xv10885bkcejf2t9mc1ovciq566wv0qgel',
                errorCode: 'eauuac86wb2ema3jdhfj',
                errorLabel: 'k3uandg69fm77f36xigwwp6fk1v6i7y9v057xh0t24st0w8l4y0mgtanepl68jb0rueilwgckkhu0oyoccpvgvep0wb509d5p3jf078yvpy0o75f4bl10ogt5khlnnrxjr4kqmiogw32pc30727he5h1il5q85sq',
                node: 4625121282,
                protocol: 'nkk8rzbk6i7s1k2bux2g',
                qualityOfService: 'pr31es1dlw1w4ccl1ig5',
                receiverParty: 'oow74eupaekom9x7kpeh9yur66bolkh9ckiyh03twunbdsbfvewtin1snco6c9bqorcp8g2qajxk7z5ys66u8omsc7t4zwaw5bgnt9u6ysia7ed18tcl5s44eas0wu69ijm0qadj53bs6sx04u4umhj698ohwg1k',
                receiverComponent: '48eclcae3lcozsdagrfolvqtf0w83qnt8imb5e3r4tfu8fxpzfg3hzim0454px6di4cv0c2cv1gbm7c5z91rrajq3t7ipo4t62mmu8kt6d8j3ecngqqhiuj6p0kg1hmz25hotubgp5zhblrbugobs148lgbzbn7j',
                receiverInterface: 'tnsumhl68rmacfo59ywrfddb368xfkgcuahhxh8d0l8pa5ixhis0eghm5bla2uj2ldhcuynd9af9kb7x77nfdl0xnxrkewb216n4vf0az0j43jb9gk5tlefr1zjp0q0uhveqkwgj6yro17vtt4tzj6048x1wh5ep',
                receiverInterfaceNamespace: 'cy4wjsee53o0lv5oiidcgeeg7nlxhrbyjt1f1s7z8lok90i48i2xh62br6smfroiey3slddpwx20fdu9ugwghmlur5pnn7o35907ftdbamd53x9sqh6et5xkewbldokz6ra80iso1yi772zi35bnsvyte0tbhinx',
                retries: 6568320084,
                size: 8249494069,
                timesFailed: 9071724699,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'ev3py3km9epuzc0xutaw',
                scenario: '49rx4xk9ozx1m215pjwyapxhzoqefk5dyud1ci90crhaiultu4jr8n8zuqcc',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:25:56',
                executionMonitoringStartAt: '2020-07-16 23:46:26',
                executionMonitoringEndAt: '2020-07-17 14:00:23',
                flowId: 'uj0h2q9wij2cjxxn9mlo6dnj4g3kafjmhuebl',
                flowParty: 'siypqzyv86zxtsgyxe2alrz8m3783dj4eue0wo7ukuk5h6by27uc5qu2fwkea19cmhtdb2hwqbo73jxt26pzvud0g1y6qkq1hm8cxjsj3d36fay9i7t0ede7ita4hcyzw10xcop2zzcbdnmw7n74uxtxa2j56r4g',
                flowComponent: 'hwly1tif53p83ixpltlol03bc4pw7qh20evruulrn85ai5ib4ubw67cibdxe5ki9m9thfllfx7uzjmrbwjen9gewcpvsx4j3siladljlhf4inbzggfh4t4c89d4hxmn18xaquaolhf9r8osmqi1e2fv1nwflv0x9',
                flowInterfaceName: 'jnxp15zkqi6nz92q14cc8dvtux35180yfryinxtk4cobrp2w1itzigczr83ivo3xh6m63ayjht7r0nhzo382cx3es4fcikx01jzd4jadsylxxu81a7q4fqfdtzej0f13rvyw0u5pb0rp9pabg76xb4gsv1svasuw',
                flowInterfaceNamespace: 'rqauyvn3vej7zqouyniwfw3bwjotenh4z3vbtp14cqjye17hbpcjyqf8ga5ztbaetwtpl0m21d4cuxwe8iuobjfqbyoskt9mpli8jg96o1cy9vhlkjgrzok70e6cixvarnlcxhxfg4lrda85mnkpb2s9cr1hmeh0',
                status: 'SUCCESS',
                detail: 'Dolores rerum autem. Nemo unde eos enim necessitatibus dicta qui et voluptatum sint. Porro consequuntur id earum reprehenderit repudiandae quos dignissimos amet.',
                example: 'fg8xfchncu6s43p535axq8lgver8vxqlgdk11imyv2lonrfky2pkf82i9gg739gqqe2t8mxp5v85dtiim8v1w0k2i2ql7jpuz9qupqajuhpwg395h5oxiuzyvik4bp2ldntjq3o4zi8t772kiw79frd4h4ree7gq',
                startTimeAt: '2020-07-16 22:41:59',
                direction: 'mhlvbixy8dkteplw7msm',
                errorCategory: '19wqueeeg8w64rlqw13pegy2gqexlgp7gzu9nj78tnwa1crlwiomz240eui559g1p091475ed133iqeo62rp8tbgbskye8zwf00tuffum2vdyekaze8gf3dche4n33rf2xk2m9ilcvcfmyhaf5vownkyj3sk2bdf',
                errorCode: 'cisv2tmckpkpdzfehr9q',
                errorLabel: 'eup7w8mu1j22su8x61rh9o3qdi2rzwi1q26qmg31dt8m6cvotswk14cjt73nvo6y7bn0i1amvymfc2e1cnpsjdpnlyimelzx8togyg2dkiynul824b9bhh7mbug1tupimfvi5xa1m3io8a5krgcirupvph9zigkm',
                node: 2183413154,
                protocol: 'omzifoiswwcojjvtiovz',
                qualityOfService: 'hpquc87q6g5e9cnrpuqd',
                receiverParty: 'ewjswr9qcdzuyx96m7bfswpaoth923wsyjygimm80xwporwx3rarprt82ebvklh1i058wxcqm4025kcakhprwi815wnaidh8swc0x92y2p3tk9517niyd67le8ompy8s0i1zr4ksxn2f7pvnnzr6f0vpleewgybu',
                receiverComponent: 'xjxxdr8ke4aifzgraxw87279bv0ovnl4xhqs5sfmw3zsit8jn8piu7q0whm4bsbzmnsrr4a391miyw1ge0zf695ewy080uaq0q7t96riwf9h4kr3ogvansbpgc65lcy0uvmrjxrulsp03z4jpin75xzn9vixsqxi',
                receiverInterface: '7tquio7uq87wmnb6vm636j9rlwgxs614h6hv29c0ghbrnrqqfr00grpanfi3099d1xyxqn444regifenmy44sfgyclugej5s3aoccfxgy64qg2pi2amggzkfhrenev1rbtkgj1d9t6eccvha7ak1fqlo4b1tibo2',
                receiverInterfaceNamespace: 'qtoues3o36u6dlwmewuw4xjsrdk644zkalxfpnz7cxr4l59wgo3z6mfxucr78seyrsolmjj25lwuty37y7094fx1qgg1r51tpvmwwaycp7epjb6itbtn8di3e4w4usafdysk0nw58jk5aaujmq34nvgc6lb0esi5',
                retries: 3541414635,
                size: 3474395951,
                timesFailed: 2092919779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'tu1ed5ol8ndzxjlo66by2',
                scenario: 'cjzm71gqshi4vpm82321x8bl1f4vw67gxbzq0w2cme7xeyrx7nabaw7def7y',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:08:13',
                executionMonitoringStartAt: '2020-07-17 10:28:45',
                executionMonitoringEndAt: '2020-07-16 18:03:32',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '04r3zmj6nfzyjwflpusq2agt5x5qftprxq0l3ljotoddf3m00onjkiw1s5btdxq9q1m9pmf33jm48vsarlln9uoz5g5yep61ddt14dkdwxn3mmzouiysjfl02outasz04mbbdhg9tolth3kkkadqcol53xg2afkf',
                flowComponent: '1gnqxwdpxgrdzvqnlridvsr57ptf6bjp57zdjiaxiymnw3wzh5x070vwg6zgx444p2ikhtpvnuwnz6ka2loc3dopwqx6fo7us260v7j7gfxgxn63fg09jfnnvlfsaerm470pryvc33hcnmnbd6f22fufpi0lj1gq',
                flowInterfaceName: 'bifdls6zd1qtyyjb5lkir1nohskbywa49z1s5bh0zw1e3pkscagsm7gq4a26d80lc0xryonidxv2zncaj9qpgks2uvlb8t6s61elwkq3qs0tzq2tjt2uk3g6y3r2xdx5k1cgnj0tdcemjprp8bst0ijwcwt4zt8f',
                flowInterfaceNamespace: 'j2fgn5wywtzvyf8s922zbqrk1vfxf8cpqz0li9hmanfc41acw98v6dhsthevygf089prhrqbx7mst84cqpdsn546bphsssh3oqvpmxmmlvx2mkps31irh9z6a28yq4f6bgc3561sspftor9qv66b4lzeqdkl09dy',
                status: 'WAITING',
                detail: 'Molestias nam est ab suscipit quia alias dolorum et. Laboriosam ratione dolore consequatur dignissimos voluptate voluptatem voluptas impedit facere. Ipsam et qui et fugiat non ad sit dignissimos. Est eius nesciunt esse. Numquam exercitationem quod.',
                example: '0y8l9256a4tqklmhn2fnojcjf1xwfaz77xfc920mbr2nonoifpajj2zj4ca6a8z1gxv6g2ciy8uk92zz1z0nr8knsj9eyit9z6cmi7l0bmh7pxqcli01xqtbyutzrk4t7nnc2u0rujmlz0m4ioypc6ff6wwhr6p8',
                startTimeAt: '2020-07-16 19:22:58',
                direction: '8thy3w4i9tuvdkg2d2z1',
                errorCategory: 'x6jy084nelqb0mqx1etvtu7zbs4aaebkqfufbnn3xdol6fxn5sexz95m8zzxnoncw8vt84hk4v6yrpi75g3kmiqfqz11osijng40se3xkjlrsinv1xssxpl62il77cdpfv9k7i91q3hc0p5olnoqf1a8o67pc481',
                errorCode: 'h6t5nmfiypqoqwd0oeu4',
                errorLabel: '2kda3wia7i6jufz0nphe5176qwu11vldm185kctvbbkk4htekqv4qon81ymbxdzkznsjpgriiicitx6k1gilgt0hwqh6vsd5wne9ktork37t6w2z21vaopsn77oyywr5xfkqwkmzpbt3ur6xq3i7p4v87shenz1m',
                node: 8094923580,
                protocol: 'mpsks0n7pahjm2kx9v8o',
                qualityOfService: 'oi21w9t66a16lhmvpqkj',
                receiverParty: 'w7d8fl3zre7yidwtjij6d17fetd9xbbro0v1f9v1hvdcms7w9ptth8f75gw1whwzrsobmzf17bsdn3phpreonw28n0kr1f94uaakca8gf2uk9jmzatag6sov1qqui6bgbpg4dhsoejenwrv344unqfvn87cr408z',
                receiverComponent: 'j9h4zrozgdi089b4wvi71blru07bw6jsmcg4yxrsuam1hra93hrnn8sr4t950n3b4ntkn1gfrdwlk82h5plz4lyu57wtaqv2tctgnspk1344uer1vwbo0ohw28tv45wi9cl48ngf700j564qamnzihzaio24qzz7',
                receiverInterface: '1153wsh1ci9dqlfkvcpf0k3g05kjbnn2c3mrzc4nhnxkwjmmtmf99g40hxvu59koe6ix6jfalrg53td98xce7pi8qzc7w7vu3gk72dpj2wpietdhbvp3jdrtyxlbu0y8g3zfpvwuz9fwqpj6ppg9wf0gsk7wc8tp',
                receiverInterfaceNamespace: '0h8gkbtcdtxjgt2b59wjmlmzbd4b2ukyi4krpcbjxg4sbc8fnvubivosu50sjllltjzx2gs62hhmkfvnksbwt4bqmxbwf36hoxgflbzh5p4r28rrlq578qtaxudo016ddlgf06fkswwxa7aeyvnnwnmwshxux1u8',
                retries: 4421780121,
                size: 8225832885,
                timesFailed: 5586169915,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'l8r85041c145syntaa10',
                scenario: 'gn258x7uqpn3rxjp3k96qzhahijodu6gfdwmpl1nxy6twmhv39s6r2fmxaf9i',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:10:21',
                executionMonitoringStartAt: '2020-07-17 00:36:36',
                executionMonitoringEndAt: '2020-07-17 03:12:36',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '3250l8uyj057rwnvlpx3c1ifwceiof8gh5ett76u82r39n3zd9evssn2iv5o975hwpxx9d9ic2zambqor20syc5nhcwbmjbcmrma69toho3ydo3x57bizyy2drwkbhe54ci8xnaf6osqvngs8bl4ttrjgrgoasy3',
                flowComponent: 'k4ql5ux3qa3i4nqeghlg0setefogr9ih2bgecepm3gk1ffnl0zfhwv6bd3yghfqz1xn2zp97lo0aahnn4rgzs2j3hllr975ckkrhkep9yp9if4xch1x7h8hj0iz3gkzlw8rhu842ziifdnuejrtc66o5qbrhjwgf',
                flowInterfaceName: '0cgukwzuao69pntjk36n8phuxr79mp6zmqnoen6s8ixuoijlfbyornciwu873fksn0fz7pacjfdx2ltyfb8d1rf6m489l5dkjkr611021m2f94ht4rbnj0yant57igdouxjq979nb9wuh4nw6h0zy3gabrjlc7ki',
                flowInterfaceNamespace: 't58na88an68b87xmb8eu1b7l7axtodbz08w9t302fcpat6jn6bluwwfntgydeom2994ef0hxjftvxfj7f53u0ob7qp3p3pf54c5l8rxme3t4j4acri2vnus361p5w1yt0qofk7b971ax2ec0dehcwd99ltmvqa4p',
                status: 'ERROR',
                detail: 'Quo tenetur molestias et consequatur. Numquam iste non excepturi. Quia perferendis nobis ipsa. Maxime non cum quis tempore. Ut sunt asperiores vero tenetur voluptatem et natus in. Suscipit accusamus doloremque dolor quo error suscipit.',
                example: '8pyixg38tsj08akg1xp9ufzdu4tqz7oatlir4d43clq0o7y6boyrnpeeq6tms58equ64mfgwwina08d0uasrvv0tx57ow4tq2i2go7sugj4a5pmobeasvk47xj0xk7zj3l0kdcpo067ml0t04fggjrgjfck1pihl',
                startTimeAt: '2020-07-16 18:29:23',
                direction: '36ppm9owy5z2dixgj2ns',
                errorCategory: 'xovgx9hcwxgutuygl2or9nmckb3wi56zbvlyaf2616kuc19yehyghiaw5ll1wfudeqc5jensa121euat6vd0ec2epbpwnw1uq0nv98i5rxi2j4ns1qyghlx99a91n9jvpvy2jx5xo37amdyjkl2p68k2ddabdv61',
                errorCode: '43jlj83a3qank8sfzqa6',
                errorLabel: '30pbysa496luk923famptgnpff8pjn5uq98pabexpopwqncxwr04zdmzdmvlsh9jv5w9g4snk06e7q3kqivr0j9qltfh5vr3jhd5rga6t4qmzcakqdifsbotj56amk1kjoc7wx08i5k7kzqirow65copbwrls8xm',
                node: 6097923497,
                protocol: 'oowr3uydnxp2sj0qvmle',
                qualityOfService: 'tu0srzavy1zm50u0qlgo',
                receiverParty: 'y9vmsmf4ff2ijpcl50v2k0dn6t4i2jttjdp3umfib74ike67wzhiztpmwgnz3980gzs2q9e9s0sxww01quetfncbxwruf4n67wyx6offt9is75asit42lshkpsjwxwp6472y6kxiqvxwt7dm0bylf5i6jog9kjsn',
                receiverComponent: 'ra69rh2qvt3sfu4nfxbhn1wv3a2fwur0hnzjt8zsnfwht2cgvpn5xa2nwklscpw0y5flsnw21k4xwicjnyipttm96r5jxym3c6lj4rutdaoxj59lfxnybve9pbw7m1bvysl2gsl4ydcze3bh5bjnphbaw69sqhdj',
                receiverInterface: 'zxcm8pg0kwyjluiphlxbmmep6d2dhwy8ijrgeib9sgw9b8y8dc4r0ltg2i5szjt3my6qesnijwg1wn6nswfdx7ygrz8xwv9k1nome4vmr6m6i55fhvo51te9vhxs6bjdu5jgyxx6995q0xs2b3ry3e0mn3t1ygfv',
                receiverInterfaceNamespace: 'd5k9kcbehan6hmdfto6w7elvvdcm33m36gemg465zo8uhs3b7qvsf0b5cqffupgezwwyodr7pgavgmij543ga82j99zzrqlapzy640j1sfoebxlfv0n6rbww2xzk1jcydtfhfrocpnhufx43kd31uu8dgzpu3wie',
                retries: 4140254378,
                size: 9851600028,
                timesFailed: 8482606191,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'bp4jgywe3ch82j5d8bh6',
                scenario: 't5zb8ealq9az1nai288dj5eci12bc20u37c7e0mvp4aquywey5kduslvp2m8',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 05:57:16',
                executionMonitoringStartAt: '2020-07-17 07:15:49',
                executionMonitoringEndAt: '2020-07-16 23:19:52',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'my1316m1aocxhmpased28yhv1pc1beem5icy9ck90d9i5c6ld0suawf5dlq4q2yw8ih02frlnhhj3twh496d91vlm7bxr1qjsosc1hnh3j6lwx1j0zc2g4hgvtkoylb89tf75r4e3c0708avnreqgdllxen76cnet',
                flowComponent: 'ryurq2c6vzt1y3cmh9tot04p2f0yqkt5jsgu8dklfrqe4rk5aq0o78qpbfsnrbpai0qvr8umf0zbejssplqsml89vhsdsisi6bu0wrfe5cv3bxm4vjzbplfn71uc2gnwp6392ph9u6it4oamo832ttc3iwge2toh',
                flowInterfaceName: 'ngppmb9rt9n8gdvfd1k127rmj2v0jm8kx08gyij11528fpeq6vxk1e3ftf7s7s28sqthii564ut5t8jj7m82xkg5l81548dk4ylbzertn13xe26iydxb3f9ia730wfzl1l46hbftjzlqen20nqb6bgputkgc36ul',
                flowInterfaceNamespace: 'wr5ul8vxowxwvzbtgjsarf9lko2mwkhot0dwxqiheogeiqr4r4vu5p9b6yyikbc0aez4g7cq76npi8gwhn37e160cy4ntbh92urubzuyb3cdg908xf7e6lndm9o93xvwjltajhzme0n8iit1o77zd7wddk9fc9gr',
                status: 'SUCCESS',
                detail: 'Optio facilis in occaecati voluptatem aperiam consectetur. Aut veritatis quaerat est accusantium nihil. Voluptas aut eos tenetur perferendis.',
                example: 'run67f2j2l8qofm4fg9xdltozf0h3fiahqqgfc1d2kvnh10mux02s4z88ei1b9zswnbg4jig6s7qbiy5wvalwu983yl1nideuvidc4ezejdnt6pas7sfjfqm3fvdmrjx6r00eblc0fwwkz3cssbe253gbpvxme25',
                startTimeAt: '2020-07-17 15:50:40',
                direction: 'n8c1msxbz3m3d73e1y76',
                errorCategory: '3g9kuxxah05u3xqc1vs5zynnle2u5sqs3w0y89752z2favadyjyiolrhhuxvnpmpu69qt6c27fshleu0szfydg9nb9qp0sr2c1bjtv8vmux664kocq0lzpzvuhr0m95w775fydm0l8u18pt74twxewuz0s7aoxob',
                errorCode: 'kjh9kmtxbtgp1m0zc7i7',
                errorLabel: 'cp953jyez62czysssuewnx3zymq31hmyt5pilvsbhoh371okrfdjmcqzmkjbgaav3air63g78oajsw4ljjwm7rbjfl98ms1egb8n0w0bu7knwd9jx8hp8u6jnu63rdbwda7j4iigugiy1b4qtiv84xo9vjr82z7s',
                node: 2740659814,
                protocol: 'og5unlh4ve7s9ff6a36s',
                qualityOfService: 'bynfxg7lppkhncbp39ft',
                receiverParty: 'pn9m05czayqi38arhfa63yz5fjaar7b7t9co82jdont8psnkoiu0bxr5b85ajz34gw0udj4th6bjj7saasuon4idyy7s21lfl499ilhd1i33u2a9yv4jpp0lh5dfubqxij6cyftb3shw917ty2drk5zovpjrztne',
                receiverComponent: 'xzzpdk8o0sbn00rp8sq2xl4i7463ebd82zoxirzz0hducyu5pt20bati7129bt9w9yg4qz621qt0nxxu3a64rdfaf5ht20q0obwp3s2t56sf2mmk8lncb4ibigs6mhicalyzby9j1ptwcjinlsociiedhyx3nfyq',
                receiverInterface: '09rgjp6phr6gqre4eslyxi1wuzj11k9z3fi7n3wvd17i8ymaevkvqyhcohjp3xzru2g9k199jehsmz3qpnvy0yw27qevjgajkirxqweabzsk9dodvmjrysse53zsyysphujzyupmff3vqcksuos45w7iigcyp4y3',
                receiverInterfaceNamespace: 'nmbcamlbsl2qlt1qll6q0s8nb19ls62vakuqx145nlcppa0m28kp2enc64xo31sp0q6522w43n1o6n8pgbpw6uh48nibo5nmfmcpsygemrmlekfivs9gbfclox9b134795nho25ext00et12x5i85v5j75ih48xv',
                retries: 9013278104,
                size: 3421743547,
                timesFailed: 6345989372,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'b1c6ga7qur8fjv3tju7d',
                scenario: '7g6xsh4o6wvnvt8yqwrrp7ngdw6q3hgidjq0qgn7xjtczmrjq7lklwzdss8c',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 02:02:08',
                executionMonitoringStartAt: '2020-07-17 09:13:06',
                executionMonitoringEndAt: '2020-07-16 21:50:42',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'vo215obsebua4kdikafzhx2pp2tnokxcw1os3qfgsmfcwf2a4if6a5oqp7cng99mnrfy1xkv8w2983a8s2aisbk0h7ex3sdm4w9xmp6sx02hkk1gfag8qqt1h8zl67gx3vhj5ckn7b74xttb75dfb6qowv3f8zny',
                flowComponent: 'exvm6ze4wtpqs429rsh8ig9f9f2phs933ocbqpoiears0t5otoweq2ul0ud74o55q3g0z2zwrx7w7hgw9xyxhzb4vxqx75mpa3qtwhpmupd64gvfdjk59xohg7n6oi1e61zi9eiqsh0zfnqym4jar2wg2bl5vokir',
                flowInterfaceName: 'l4ehi0t8v5j3dslmlirzyyle2oi9e6v953sg6x8r3htjjmojvbv2qk47ts1uxjtiy9grt2e1jmc4hcs0p3c887mzlk1ask5l3fxmt720o0v6jx9q3rnqse4vo1df5k7jodaxc8d1zbpihq4km0gcfpdocufogczf',
                flowInterfaceNamespace: 'vafnrva3qe1i0ejdcfgwkkz59xsgpo96xuxqw0d3qqy6xsjp3rd97czbx41wra0bu1dspgqp110l2b5yxutmkc9a5zhivwcxabpevrxkwxommwovqbutnb0din1sxyit4jlog1w7u3rg19tgojr1r8fjhkjmfzfx',
                status: 'CANCELLED',
                detail: 'Et praesentium corporis neque asperiores voluptas et delectus omnis. Fuga velit harum perferendis culpa doloribus. Unde aut quas consequatur. Ullam voluptates eos sequi sint nulla eligendi.',
                example: 'ygcd16f5nkzx1a9vj68ezl35cbrc6nbfdyhdmpew6jgm968b4pk5f5b37mdmktt8b1n4wz64kcxbtwzqvuo9tqjk2nhrkmqae7sogulk9rl7f43tb9xb5wb11fryohtsm4qyzachsibkhhuic9bxapi8lx580zix',
                startTimeAt: '2020-07-17 11:44:14',
                direction: 'ef2pt7u15jg53wy50vzv',
                errorCategory: 'ewvzaw8wg3frjypbxt1i3y8hyhl7uv3nx65lqrgaqcj2oad8ha9goanou9kkir9xy25t053z4p19gwo30c2gciqm9ohvac1rotteay0w368j4qnihkddqnzz5awifne7vdanqgeeta5srm22by2zzqrwt6i27iyf',
                errorCode: 'c79mfyoedm3vdyjwfws8',
                errorLabel: 'rnhscl1c5akglfafntdf6wcs2v7blls5ypzddxriqrfu06zkqlxogm5l6n355ft547jxlhmpiobmalj0b58ikl5cywc0jrn6ns9aezzleloxghhztfrq5lpjlqw71qrxc67e9ts54i3hkc5mk6b87d9yszjvrkr9',
                node: 8852915068,
                protocol: 'udjai5xfi5qilhooki0h',
                qualityOfService: 'xu0c27z5re0q1azhiueq',
                receiverParty: 's00lo7ndkdam8mipfhui6gtnnu0e9itb4mhyttbo3qysi0myml65j7q525pj4a4w35ahatadt2mzg3kav5qpamyxzg95mjytsupwia8kdevv9l78gspubflz0imo714regzp3ey4e68qkeb3dyf3sbhqqwf7c8q6',
                receiverComponent: '2427j74eh3p7hhud4cqr5va9x10283jno8xn9j38934ejjblxobmgueofywyx4gwxdkk1kz5uxouhy2e7zk28vj63a9ahw9ofxmthov9j3k9ekwqlfotn1h2zv4pa8h4a3igtq13ta4sb2f2qxbkw5y282i7ztzj',
                receiverInterface: 'v57s57clggjmg81os25ahi4ydtw3cptdmx2xwz8cf9s7bzvmq3pv5apwx68wmydppqoq8eiztwh9fefde39hq0wj7fhrfpemysfiphs839ok4zo0283ku2ovrvwgo5vz981oh8mu23t9ptwk6twjm3xg6v8wuah5',
                receiverInterfaceNamespace: '4xvnvc3sc7dg71vik2kdga2o7n36wljvetc5a0cog2hxfc67ywt1d0wzzoghvfurqt5rytyb44auj2k0bmtjwgxemdxs8al3e744zem11548o7d9phbuhac1jalkuvh3ljq5z95cdrh03t8nz3ex7sfvncnklky1',
                retries: 4002695819,
                size: 9312437605,
                timesFailed: 9364486335,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'ue9w6c7jct6sjrlgy0jp',
                scenario: '87pa50wykb2ujmfb6x62cltt3zqa0terttl1vdno03ey30i3jjop86xfx05y',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:37:10',
                executionMonitoringStartAt: '2020-07-16 18:06:23',
                executionMonitoringEndAt: '2020-07-17 08:57:37',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '3clxuy2jwdymbafivkit0ie8jqhrj8hqok39fapffznaa1elzd9km0bdpz552iwckczkpv0uthmi997ngqmignrto99wt4av7fm6mrwnb8lxbre4bsk5a3lznpr3wurbuajmodx7hd7wzej9xwadoz996e7vrmpv',
                flowComponent: 'sn7y04dryn81g2lamjct75jld4n6i0ygc2f2oscrmtuoez7srrwzzwx9569isrkveb7gipmcwtp0hlabaemhfakuvcrk8g5czomrv4jvdxityqrwmpqv2xzw6wp273c70t7rd073cxv4pn8x5nfennu0jotvo686',
                flowInterfaceName: 'wxul94bggym7eacekg44cbjvf5v3fx06swz3fjan6838cxp7nixtij7101hay9fuznrlkc5560oksapim6z4gdz704cnvclegi3o348ute0b6cgq79166svvm95sfafmumfed1rtmiid3qsxpugn62zdetguzd583',
                flowInterfaceNamespace: 'ewgykl12n7ss474kslxlc7bz6fjoz8xayagmw1wkfpsc1mut9h5sefxc7xcmcjkcp0l4lq3ana6jzblhfuqocqqfik59ewycsqaqvd23do8f71p4s1np0a2svq8175uxnfgdx3wnaxgq9dcbwk1i5cw50vhvrgit',
                status: 'ERROR',
                detail: 'Excepturi aliquid est ratione voluptates amet reprehenderit dolor voluptatem. Totam non dolorem. Suscipit quam quam doloremque ut velit corrupti voluptatem magnam. Odio vel eum rerum voluptas voluptatibus non. Ad magnam occaecati.',
                example: 'jpoge8zeaunh4iokuuhvgy7kkyxh4eyf90guz6k5wef4dxxryg2mvr7gk4sjspriyh3qiacenflln7yd1lavb20e57x6yx936jewj0le062snlc02gefwqzr4mnit55jvcnqpaoj7xsbyf7chw95456bp0lyreh3',
                startTimeAt: '2020-07-16 16:45:17',
                direction: 'dnoaynziki6v1hkmlzam',
                errorCategory: 'of4re0thrmcdp5nk7mosmtq107661j67wp3p1pa4jfb8c9c0j6bfus5duss1jngzuv45usrp6yqj0ua4j3cb7kwg2lbb91izo96gkl4fmu36g62ga1ognumt74d48pa3uj2182riz8vdm34is6bno0c7wjjkm17p',
                errorCode: 'vrndztkk1cw1ddxyhecz',
                errorLabel: 'l673dh4z4qqk6gob83eme583t4d0rm0x7m25czluqigeaorwa5sqts8movenlguvbqvzs7z2cvbqu4wc28gxa64p5aqmp0d1j8z69icdyc05esz2vjljpb9pivqn4qrhgqfmt7x3jwebfi79y0qf43bep3zfdecx',
                node: 2234383988,
                protocol: 'uefxpy8idip7ejg8jq91',
                qualityOfService: 'lp6k912ozw6pxyj0fp8z',
                receiverParty: '8e4why5dtwso81uknqd7wlbdjheius29w7lfxtre7l0a0qxbjdu94697n98mxfn8hxhjmo5rfoqr1bv6oa48gyjn2sl2rucuujytgwiuq8rvw1zo42v9pc7t34hiuh7ghic1c532h9nby7a9miz73mm89h4z3f55',
                receiverComponent: '977nbgz8ynmz53x8n53q49dfz88dbc6xkz4akrnhhmbx2msfq1ffflgcih6wv7j7wvvgf8sep3d0wiz4v3ozlo7oqh8cw7r2m6kfptqx4us7ffklvnrwba657i1syr5xyqzsb0y2da4b30teqb2x6jy81tgjbskm',
                receiverInterface: 'b0xtel0km1c9zo0glvmf2omeixw0baky6jx6yfcmczu2fjfep5wgmh6h0wzwjxw7f35k64vwmx1frvrnslwc48v8u8vmiymyd6bhd0rfmqdiw0wm022ya6eyercsop3lm68o5b9emtz9uk07l2e6twcfbjkdise9',
                receiverInterfaceNamespace: 'c3die8uc7irdk4h1uhkaoi1q18dr71383hnekqdaufzvjqh5bjudbvv7teygx3zrc9ua3oxe38y1r0uixdpaffc8asmpon1idsgsfcvd52d7o5s2kokiq7msf1o5jm8b03r087knyrl5sjj886wibhs0m2viqx04',
                retries: 4166225408,
                size: 9408118639,
                timesFailed: 9033835395,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'ynajhjkc6smugdi12xkh',
                scenario: 'x1v00r5w3xfwo5t2jimab5166bkqw4ztly775msp7pjnq518qh9ceotvmf8q',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:18:16',
                executionMonitoringStartAt: '2020-07-17 00:52:37',
                executionMonitoringEndAt: '2020-07-17 15:42:41',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '36x13gjypb1byqwmycqpvrqm3igcwrvrb65zierchsmoax2l11mehd7acj791s82haam2wwmzknglgppp998gvtruas94adq0kdfhkkc9l1w56zusq7fgsy6ogeahwk7ujfyixj8u0wwxka154ndwbaehd5sflbc',
                flowComponent: 'kfmv8pkw8kfm0zcnx00yfnlh0q6ku0n092rjkdo9sm7guil2022tkkhsckbe72xu75z91a3he9g75ogj3ffyanxsgsssim9kkowbpnz8fpmaiiubbn2dpzn3or7qtka164hb0rwxkv4i6o9akxcqnwi7e2hyvwdu',
                flowInterfaceName: 'hstydfvifk6fbwy2wtnmx783fldh537mj79a3jbn7c7bm4f6kj1qr72o13x63ewmylto65w7rue24l2xj3p9k8gqc2pq84n7a0g3xns0ud4yh9ewumc07sxms9mi99kho4oa5hkezn6y5n8gw0r4f1m0ndbrp5lj',
                flowInterfaceNamespace: 'lzg00v0bn6894e4i05hu7anl7lglbbti89cd2f8vzfc7vtczejczmur8ppt2slfgng4jes7kq3pkitxqymnwqfgkrzklyp7dw303ufrf1f57zvb9ah76gwhjlhec2v6adhavjryfcwu8ndy9vh58pvkbd3d1libhj',
                status: 'ERROR',
                detail: 'Veritatis in in sint dolor. Asperiores harum quae est excepturi. Sed est enim nisi aspernatur earum consequatur. Vel qui et dolores. Quod quos quos est nihil.',
                example: 'dg1knzmcar4s0yxt27b7lle4yplorey9t70ezwgg050cgx6zq6jroqp7omrrbxgl8p3dfzuys0gvinkkvxu1r68rxoj1e3oywclen9e4f49zu7st1urhra3sfpd83nfukwseadfjb3xf7n1dszzc4fhzhx4jpf18',
                startTimeAt: '2020-07-17 02:55:49',
                direction: 'o7pr53j8psjf57t13nte',
                errorCategory: 'i4yl6qkyv9v0ei5rt4lr6d7zjlxi2rnrxpwo3xl6dy3spbk8tw88uw9a3m6slkdu05vetigrrez1aibsdev4j7ab92xnadjiwlihw5z0xe1ftkquc9kcmv5ja3s0rg4n7tm6232qjhqzu31ffb5yqfozeihf8eie',
                errorCode: 'mx59xv2ryxzoucaw2q5f',
                errorLabel: 'avzr99o190elt41l75huq3v6vykhr791l3rbbbz1mrjl4j0o1ur571ducd7evjo2tuy228tyr4gpieck4vi7y9thwcztx8reetg35xqig5o5fyx4vflndk426usz5hsgc5fzzsn4l87kc5eyyg2n8y77bhaj1s5m',
                node: 6805699977,
                protocol: 'qg6vgsjv0m2jlfbw1mv4',
                qualityOfService: 'trnjo2x5bo8oybqrtug8',
                receiverParty: 'g9b1hqu6p4fgl9g2z2jogjsp34u0jtn7c9ptt0kdv0u0bu5kp39rcrwqlj1q7rwbb4boddp1dplkwhs6krkfifqkdlay4i5iol38t9dv8mkeirpikpgitriwbuk2n6qr88mf9zkvet4ekikn6wnsro92m254lqkp',
                receiverComponent: '5t3dp8hixxqduvano5fwa8g5ui33mr44k8m2kpeal97k4px0ysa07gzju703m5oinqtnx6lfk65mazjd24pbo08mi3cd93uuxotftoaix28qql9tx2sp1ncltq1z74za6x0d78q08pzf0yfi84xzvaio0chbtrkx',
                receiverInterface: 'b8736tbmwej0nr543dmej95xmlz8xy3m01d7fxbqjek87fc40qw8zzpx709516h6tedd3rgx2okprv7ylut6dpxzffki3hbmjk9a0ecmzg8q6xugm2znf9fmljwcu1abqppelsf0ldg72tetpjg15c0x57330xv8',
                receiverInterfaceNamespace: 'vymrf1tkeh81jjes4ib18fv5jz8phasugq73wfrdheo9g87bg44e2z6t67kbe8ajws4rm4qbm88i1h432714gehmc7ergds7qvumofi8usqso43sssbnchliqwjvmfz8v66d2bhmvuvuyftdaxy75ls91kea04m8',
                retries: 6740402646,
                size: 5544877141,
                timesFailed: 6921946867,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'b70z18umw0cqyem6bod2',
                scenario: 'qvmmhxvwspyrshra84nim06kgr8ppgiytukq3dk6ekk1jujw51mkchc2sh5b',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:54:09',
                executionMonitoringStartAt: '2020-07-17 10:50:42',
                executionMonitoringEndAt: '2020-07-17 02:39:45',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'gir0p7qeqxbqc7jge13262jho5flbscmcejmnmvvnovs4a1atiywbg2cyrt4ochukw3z1zkbff85jzatxh4yn3bg60b6bq2y4668o7zeu8sm62m3h82fust2njl4llxkzbf7fir3x7gxt9ypjgrebwm0a830v7tl',
                flowComponent: '7trqhrb6g4lbmifkrk57ps3vrqu57ozfziwwpwmqlegs3wx7ao2zysy74sd7dmkfty8xu1ncuqrcygbsvrd3es2hh0z7g0not0349oors0spz76a66de6nveur2t21f6lqzs2j8ikl6t8l6ctk8p641p7if7g5vs',
                flowInterfaceName: 'bm7b46qi72xkyeisp4znw4pc97t8bi9fjxxlhdae112828l1hm6xqk76ne6irqihv7vgpzu1xmvr6ve033akp4n4r7kfn9656ug9jkxv06o0ykbcwx1xb0o2c0r9l2c5t6mqevc65w0sy6b7y7tof4h1f5nelhw0',
                flowInterfaceNamespace: 'ia8ycsxsyzuktf6weyvh1rwmtakm040pkdu4mlh4gta91a3qokpjmy1ktk3uwr6xplzprtutohd7xk6hbq2fhx4chiz55rlt7kvopfptw6b5ay9xa3e3prp2gx0nbciy11g3fm3zmvpbh9xxrpdbquypsqmyw0lr',
                status: 'SUCCESS',
                detail: 'Minima fugit sit nam fuga voluptas aut sint pariatur ipsum. Ut unde voluptatem ipsum quo amet aut eum nam possimus. Dolorum est delectus libero ut maxime. Non eaque accusamus aperiam quod. Sequi voluptatum in sed.',
                example: '2xm1ocywgm31nvu2tjpzr25wltlfdl1aaxjgnjj4sl81z6oireztrkhsuqloiqgor89c16z1p8qzwu18gi6khbkcc70xiywpby98yx7a2eamj5eo8twa9msehygufm8gxdye0js39e29wr0qkivtgdongs25dsolq',
                startTimeAt: '2020-07-17 08:44:33',
                direction: 'r2ckpbpj9xp4to2h8k5z',
                errorCategory: 'k1nzpe19n45bag2nm482gru3p5wk3i0v6z8xqivafyfkc5ti0jxnz4b12d6lubh2ri98vd1eszz23zi4ekhi6u4etf5vukwpgtlepvwj852eks3uyc5dtige7kb726ohvi1twb673xjo3rm2v93gs9drs2ql26tb',
                errorCode: 'omks41da3hmcxp0ea87z',
                errorLabel: '5jswujoieny4eq8uxl23y6vqdefgw9abjjqw6ob3rfldmsc4sv83h4oc5nagdqg3qqe6ac6pkd9dvkrc2e7vw3pnaqea9kazagd6q5ledu4h9n4a79u4ajpykdg4mzl9kch3yh47qhhhcxowukswp3o66n2g4jq5',
                node: 7528816114,
                protocol: 'ae8mepckrqqq4dchafk7',
                qualityOfService: 'ot5dqmdunkoyvqckast4',
                receiverParty: 'ym2n04ehbqnqwmpf0buri9eeq86ulvscfcfhmoctd4mh0u745cpdzvmharg0buixsgkoukkg93raemkhfsyrcw2byisck00tfyhephywzbmgaaqncbotttuoi2ve650bqucdbxro45uburpkwq8fx7vgqrhh6gkv',
                receiverComponent: '13edg3vuh137xzdfj5whjbjsn8r8yji1fqqmod1sezrvur6xe5oktks6p5ks4m6qjmqgisl0ja57f4i9jbjd0nvsi212v8i6gi3fevq6k98fndi3y5dzwm4yf4m045qo6eauzy5jo8kpb7itjhvwtjw35eh5zlqn',
                receiverInterface: 'ij7je3su2a6x3rhgfyyiq5rbpkwd6hmx0fc0x0yrdmnok4sydcj2n51p3hz1t24wp1t0zp4fsk78gj5gln6dbpkbvaclc5hg57v73ua5oar8aq5iy4ovqjwfst9j3okaz3aa8hwd66vx0e0jtno3hf1v5jrgttb0',
                receiverInterfaceNamespace: 'iignr1kydl7mtawws3viqrdb3svlhlk07npwbpbzfgrc0ybbmpwemyzbcj77a2goyl89kxjkhyf0xzguck0trb6xmnrmsmfqc3fdofmvxrjhs3mjam9mturl9aboip8fqtaato7vlzd7d54rdvikrvhyeleg4jzr',
                retries: 4800990508,
                size: 4986504649,
                timesFailed: 9184097723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'd25u69tpev8sl83glweb',
                scenario: 'dc7mutng9rkb6yt16ajbn8g7ehc5bcphnp1llvce4xc9zwoypky89ghs1knl',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:13:47',
                executionMonitoringStartAt: '2020-07-17 12:08:52',
                executionMonitoringEndAt: '2020-07-16 18:10:19',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'gshb853byzdx41q3by9metw62epzxoabouzw3scd3o0wad9ngvo1lna3me253z5z5gjyoc3u5lgtg9pn4ogwkyx9nqebc8zp4i1zh16xeyr0wa1n2h802xf4ojj24l3u4c0g9pa4hxpeur0u8c0klu6nbl30iill',
                flowComponent: 'jdm1eio26s05oipwd5a9d22hbp7ge73fouqd5an7r9711lyqwye1laklqejh95uvnfw3l2v1v47udwe0jc710rhksgh3a03dre5zlohv71kcf9z9syym40ukk4ein82jymszdrn2r589rocl99n1e9xtuq5d7o4v',
                flowInterfaceName: 'kvo5l4na2qlrinyqvko0lbc6lbviuhxmhstnfs1nnmfa6b5h4sb83qal0a0urfjq4e1hdbvdejwghb64kdnv500s8w58xmjd9sd1b0was0n87nxko876ir5uidoob06h4ve61xygpvmtc1g24r8hnza0whmzxc4f',
                flowInterfaceNamespace: '2nch55fmxbmatklkv9bfb5jusd3osmtrgsqgkrh6y1dohk1sa9ocelbf340tr5jnxi7wm1g9ots4xoj2scewie9s9zhepg1il6ku1aueq7ranb7zsbd9gc8k8bwmzwx555b64k7vazvjdwe7xmgqt77xr3cxc2g6',
                status: 'WAITING',
                detail: 'Beatae id eligendi et consectetur labore fugit exercitationem. Incidunt praesentium doloremque sunt ut voluptatibus et est culpa. Vero culpa dignissimos doloribus maxime ex corrupti quia pariatur. Voluptatem nisi et eius. Et vel soluta ipsam repellendus rerum veritatis cumque. Enim provident rerum eum.',
                example: 'mi1rxwylfds5obkfa39pamr0xoy1bbfl5de2p6stipss60wk6s6iley22w7yh2hxzh2c398ri7dymlvtpvovrq3ueii2l7s543x3233tvkspr4l7kr0uhaukfeol2qo8apr5pjzdwnpnjlmh5bsdinccmnoxyhfr',
                startTimeAt: '2020-07-16 18:25:17',
                direction: '44p79dgoaipgaswlkph7h',
                errorCategory: 'fj9ksvgw465p5pxmyvizozvmuoeg9crpn8rl8jqk0ro49erszu1ahkn5dlu4qrzq978ykwo5yhkdswgoia7nfae7nbbwosg6u1b4qflj9uu6ieb7ehjm94lu8wyhyruc0morzn1rplldww0k6gw56pc1qj6jbptv',
                errorCode: '1hmxgnvyosa3y4381hdo',
                errorLabel: '2cpfpg71th9cpx1me70hkvd4i4iu9ak1f63m1lq19gc8j947kz7ybi6lzliel4tcsxt68kmifx1mkqnkih7z5crh5gucptl31x6933ok22djbmwfaum1s1gotr7papg67d3va2s65951dogy2snyixlhs0lr5may',
                node: 3314706967,
                protocol: '6i4zd5lw2hjdwcj14cke',
                qualityOfService: 'bpcu3zz3thcxs9q7vzfp',
                receiverParty: '6j7voi29kxvz0dop8qsvnvdo5kro7pnek6wvsk0knk3nywp2o6jvp0go2s7xu33cjnrkk0n92doxgd09npq52kntej9dx1ar67z827regok84r239og1gbmu81uqz2p6tp7h1ziwu08c2zgnc21w6icwxb5ism8s',
                receiverComponent: 't5n1266dgovwf0yxin5w2p7ype0jgj4wbj0m7hz2lqz1diz8vyavuq7og9z153kslo628v3iksrpyauujz7wwe1aabe4a8x7a3jp5c2lrxgbyjo2qx27p768kgpveey07ms6dan63bw3bny38iaa7zocd88w8vqp',
                receiverInterface: 'r9kbhpnfyq04q9fl5toa79sd8mfof24niwfd6xglf705il5u5638zyl7aqy5yyv060b3mszii86pyd81mzuibc1hb7odvcgyc90bsgt17z8gcck0m3tu19li52gpopgtc307h30piadq3u68woo0t8u8jhsv4lqk',
                receiverInterfaceNamespace: 'bqjs1oyrlb4u6cn7hdcjwuy5mm0axfbrkwzr05c3xytela0xh1ivuyshtiut2jsh6u7jcw8vmlwbna0u7bc4klj7afekv14i43yqwyxhjoq6ph1jbmfulggt8rvtm0ghyfxmygf6mlli9ejsaej1dq02vghrly2e',
                retries: 7759868352,
                size: 8959541501,
                timesFailed: 3656461324,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'numkj0i9rtqayqyoqtdw',
                scenario: 'n2kwziwck7c207n64yo96lq47nzn258g2tm8dnqw0j5ccutsjbwjjrcjpp6t',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:13:59',
                executionMonitoringStartAt: '2020-07-17 07:51:01',
                executionMonitoringEndAt: '2020-07-17 11:00:12',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'wn5t0n7tv1bl5wlsuxggaw8mdsxqckjoh388tbmaelsj7ylrxs8bu5fp35tfpq278ntnw51pnt7g2hhuisr6ixwc78u7w0b6dhzjwgpnntkf44he8nvracsh35ds3azt7a3v1rhbact6r60ucjs4bb4ogaroyryy',
                flowComponent: '233qbxf6qtnwdzhsuv2s0ib9kq1hiipvxed8szep2yw0j3wxnbngltnc71t6q63qwtyup4lexqps1ss0uedckv3usd9cmxpzccth0t9pxl7gnubpvr5xcs2hw3jhmdzh5jum6t1u16g6vgv8n1hn9gulonku4jxe',
                flowInterfaceName: 'ekm8gyop3cqedt7dabzjn1jvw9e3nkbfgbdo9t375ycq3zrqz7yvkxf62dr319tc8f68h0dtatkfnoov82jvqs4xlammtcihw2kjpdbhlygni4ceagv5d7sewp99ab9embd0c27ajulg9dfyoq87uf0awz0xs0z4',
                flowInterfaceNamespace: 'uns4dvj5a5wziugdr15dw2qgh9csw0q4w2hl1q8txiinqhxm2kg6su1ubdj9x9vx4uumdaskahgz0wd3tb1vvpvbmi1cfhs7c5nbnqqcea8xubzpkf1pfy4vks1g0pwf37t29tx923dwiwhduekp56nyo89jysxk',
                status: 'CANCELLED',
                detail: 'Dolor eaque fuga. Est laudantium neque ipsam et. Eius ipsum ipsam sit et rerum cum eum.',
                example: '9ok881zp4rrgi8b5k4fln7eovwme5yom8chwxpqchs5kuww7nyn6cd545ohklx934gb40gb1gg2gyphljdaafiiizgmrkxvykds9batyosog4bmhi2guzq15rvfaum8ny4l5udzjoi1xuyvv7q21b52rs0c3vpl0',
                startTimeAt: '2020-07-17 06:00:41',
                direction: 'motm8vfdqoiuz2aoq6ja',
                errorCategory: 'bha0r70jrq5nfw9rcd04x3b9qqmaohfyx0vmsych0lphgnrjyuhe6q0bh7ts6k6zasx5wlu2wld7ucwrdm7pj1gkmjeywglfgzhx3fspj0hlr0erhchv1ckwaqvffxuvk5zk7rpfcezikw34rw3x6x0vorbcb0kri',
                errorCode: '26c28x579h6x6f0lpf2v',
                errorLabel: '1fqcxh3q7a0cuzcbryn14nkzr2nu7q793umdyz9luyy06vw7gpxf56a02a4eabi1fsvc495qx6vm99fusbx127w0bvfavjxqxuuz244q5uorpgoq2cnu6w1nm6fhkw0k1ey13ofr6gkvi9pznyit5b742g6gbdx0',
                node: 4486605242,
                protocol: 'omwltrx061vsznpbcfg5',
                qualityOfService: 'vpzqtbybesq51np325g0',
                receiverParty: 'kvd1w8xbsohg9mtsvp5nnsqiac01kgn0tydl8fcuuaxnj74x48m5p3vd8oncek9lfv4aylntmhgxuwwjisogawh5rus1hgohicr2r8h6ejhvup4x8xu8ghcq0j6ummwpn5s45s4qao25m11etjjavqufwsv47iba',
                receiverComponent: '3hdoqpx6kuhqvmglwb29x4k1i3z3i7jw1ygpcgl6zdnqk1b5soal09hzl73aojulxfq9qlh3wxm4bpyg2isrn9r513gxzuc3n171mvvl0oifdyylsqko0dg02qdax4dt5d9ioaiunc8bgmlitrx7ha4j63gawf6d',
                receiverInterface: '86j6o1kji4qv1r9apuvhfnwdo63ls65crag4j7vu72bftafk0kry869hupk355x191dx5t12dv1yb23tpycnlz5bc4i6p7i16f80y3ih5zgrumzjtea3nl3fk6kgxbghuiijw9o55cpv5xxv90kcwyblrbxof0qj',
                receiverInterfaceNamespace: '2umq37y62at10wix2iodou27o28zaqf5zmixpqm915h6n9fm9hkji249j8772pvoj21wdhu9e7ca8ik3s7xske8nu5u5rz708mb7zpjz0jgqv3790j0hq3zv6mu0ebgq1ibvl5rw97hu9fka1oxhs0mshtx4skse',
                retries: 9966230894,
                size: 9262108706,
                timesFailed: 3151465469,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'flj81o8l4llxh7n9immt',
                scenario: '0oos62mimjb0t0nuzede4kffe2cp2pw2h05khvuo7x56ela74va94m0poi5f',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:33:34',
                executionMonitoringStartAt: '2020-07-17 10:05:10',
                executionMonitoringEndAt: '2020-07-17 04:37:11',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'vnzbqt35wxtkqr87g9wpcie1wdwid0ds2dcakl2eq2kiievbpoxlorvaz3ita5jr9okacsh76vba39s00yxqlu92iha4yn4pp6mdrbgnua0tkx0dpzid11khgynz0zqqaad2x35747832h35f1gjzolm1ajnftva',
                flowComponent: '1kei5y21ysr7w0jaatqjgss28n6c7cinvremwp5g33btcbk677agla4vq37swudvuk2qnky8yrni6gcxg9dx1ipcq0e71fyh78pmaaqua77wg7ggb270bdt0kd9ou422ov3dypt10guibt4vwhfuo4jo8sm4780o',
                flowInterfaceName: 'vvh1tglcyihc1jfubcexsqk85mvo2vel6jeg6kl5ov030o727q44yp4znl7tkrmq7eh837d8yeofpn1fnhjggm25gpy5y5izqkyva078l802g7c6f7mz2dyv5efvudov6sskap7h3f0dzejcdoav7td7exong8ql',
                flowInterfaceNamespace: 'pb7nxj3b9hqi05afh81301ctep21j093rep70p6rni384v509lm9mzf8poswmnx76mj8zt9ji7a3g4wcgbn4muokahhsbdeoxuxuh7fe89glwqogpiifrp05922gupe8klw9vhfzzl95coekga1aa2zja34tvvau',
                status: 'WAITING',
                detail: 'Error minus rerum voluptas consequatur rerum facere voluptas sapiente earum. Et et velit nisi tempora. Magni quisquam temporibus et doloremque voluptatum optio nostrum culpa praesentium.',
                example: 'o3nwiyw33cwa1lzyaj827kd6m9ohcxwtvz0xk5epyrtluj65ei7dl2fqk2xp8ur92s9gp8xdkr5gyugtprmqbotlh48meqzhkwvsxrb77dh38yvdazt86226wfw637bwb4178r56deoa30cxdz375elzm2x3c41y',
                startTimeAt: '2020-07-16 18:17:53',
                direction: 'fd2gh5r22av2hkud8ww5',
                errorCategory: '2cx5g7nws4raf2lfmrwn6ldtcktrdwlo3hgblxbiu8unodk4xvf3qz9vjsjn54hs9ka53b89sfz3jd1w5r1576rhred0cf8htgi98rmsfovtu86fqdqhwq1r0lmrzyj2we2iksq1qvu2divv9dvfr9bowgblblzn',
                errorCode: 'p23soej1c6721zrmwwe3z',
                errorLabel: 'me4g0f4uv6bmrvbbqtx6a2fhdp3jfp85g0rr3xxzpffnrb6mhobqgpp1tinssapg5kol2bg6bl777nohwcca7pbgvd5vqvuou1ikoggg9lm0ytb4mzoyj1fka8ic8drasnpud833ycyex9ije1vri4zvm1ciro6s',
                node: 3607463967,
                protocol: '4v742q2e63eq0ailqxj8',
                qualityOfService: 'jeb3qxydab2b65dclmhr',
                receiverParty: '7mav5t0f69hxexhm6sl2dnq3e7m5bzwc3ifmrsit5s3q1ov4918v2cywftqao7y80azqvnkjzdd870ldrecbjzior3535z30ghcd21ty5xliayvsnbpjw6wyblcex8i7jj40v67ydvu1rxnnuh6zb5274wqiudgl',
                receiverComponent: '85rx8jn0v45s53qkvz04ne889bvlfjpclp72reqjy3m04l5pw1731sqode7r1e8rlhbjaqwr9bwfw4qgvcn118mt9qkns3osob1zh96us1a3hxepxi5v3z2cj8e4v845mbwql5h2cdf5mnsn8e0jwges76ntd8m2',
                receiverInterface: 'g0wtrf80bh2rdfgkhotcccpywuy0eiycp78noxpl5m7yofhie2cm99v2pnthzppi5daqldrv76birnu2szmygr6e0iqknuo9f5fupv4b736x9d1zd46h87b5rffhcfjdhki3c4sorp05mfx4itv0jlig8mn2e9lw',
                receiverInterfaceNamespace: 'zy1qm7q6lbvyhzkknht68yfyktuh38txfw3zajrwmpsadzn2s2g9b95eodvivlxyxo7sbij9tzy3zjtk4zup6ognf9zsovtvymuoprxvllrknyk5adg2z0kitst4r68vg3e3dv0xxmjq720uu5facuikcajh72q4',
                retries: 9178420497,
                size: 6786705042,
                timesFailed: 1966077335,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'namfndkuc7go2le2wcsl',
                scenario: 'mkoy63j0hh906eh6phi9q8atyopodi3w6rnw4a4efiogb6w9h46ywln502mk',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:57:21',
                executionMonitoringStartAt: '2020-07-17 11:23:52',
                executionMonitoringEndAt: '2020-07-17 06:08:22',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'bgghke4a2i5c1yw2ce0pibgnsbwfnx5gc9z958nl4qs8c5n24digg8safh8pppj3mwpplveiusr8urs3y2eh1ku2xy4tsxc40pzmrlsur3flaoix5j2zfza0kohtkg9k7r7sk2x879ip3jj2c3kdpm56knw0w5eb',
                flowComponent: 't58z6iufoecsdakps9qz0xwaw991rslszic8e8rfgqnl3mc9ljjktl1r4vamn8g20bhail4l9sn70md8nrw5x3em52aib1jv1iciw6vjuf2vlqyqhq24fixmkrovwpdbhjwnr65zyu7wlxwc62mo954yy0zorakg',
                flowInterfaceName: 'zfncc5fn89j834l2uxfzu14twc513yezkjkr8dmoedr2nl4jxprhya0rsfdz4dq9radyqas4mv3le52297grlz7bfo2rbzftsyf0epzw9gad88frmkjf6u5gv15gxedn9hb0fd7kaqcx1erxf8getewih2c3y4e7',
                flowInterfaceNamespace: 'ehbd5tk83g014usk10si3ejkriso7b3ca1p9wkx8psnewnvehd7ka86qk21xq3zep4i1vcv13dcfct4caciyw74u7ly1ojoacs7l3dby3tqotztkk3fmvpbfwnh3y8k757jtkdgjzayhziiemcn0zr26j7esinvq',
                status: 'TO_BE_DELIVERED',
                detail: 'Explicabo voluptatem sit suscipit debitis. Ea officia sint ea est laudantium. Asperiores atque aspernatur.',
                example: 'mnynu5nqnlyemhcb1l8s703ef2j5iuzxhlf3cqmtjx1dufuyuujsxjkc0ibtguuihuves4ailswhe1qt8dudb3d06ch3ffzrki42rukf33nxwg3qcp239tvew8rnf0mmx1uhopk39o1kiu3zaq2o2g0nqb3lvvvy',
                startTimeAt: '2020-07-16 20:05:16',
                direction: 'c1f249e5z3damjz4p0u0',
                errorCategory: 'l4zofboo0wwiyxwq79gdzcj9ltpj7ugcxv046ykigb73yybcre25jsr5wxyhw39mgjp7by04uwidh1gjn7ecwmw8cuup147qb62ox9iobwnn7vpdvcgq5gv5ctq55u9r5btmxio58jedvxp8cm3iw493g9asz4p1',
                errorCode: 'chjvwjcf9cpdlsrz9e5f',
                errorLabel: '8srefrpc75p6onldkkrf9r34dixn6i9k36ajj8fe3x6a9vpybk2dc250xodwk4x2ah7w0p630umigp9oa5miec6vw7q6goj0201xql2lq9t20u0t7q050rlji9aa3cy7vok1ht5sa1wgc9u1wqwtsnb33niscjb01',
                node: 9075767811,
                protocol: 'xrpj7jdqhn8o3x7iufaa',
                qualityOfService: 'nvcj7qucj9remj2ydaat',
                receiverParty: 't36ycfjlv8rwmeg5ybglod94patfvgplsdtrrpzyhucsdhqyq55zfbnrildidge2qf6cufh62no39gewjrosv7xtu5sju772ir02nte1p3hal9xf63p8bhc2u9hbnjhshm7x2odgk9kkoyge3vc1ug9hqzodxesu',
                receiverComponent: 'vxb9qmz47s5rlna3k5t11z6fn5xgbm6gh8ywuqpae5atmrepd4dlu6ku2e2sd2x3l8rm337rc9blkcv2b45893z3ljq2703yqcxkppfr8b5f7wkff3975st6fjsm7xyxvlgfvn8zhdry0avoiuxpu9ir3n0ddehc',
                receiverInterface: 'cipdvq746tsterz6vmvsnzhkrhuu6sa2tp5brg9ahknmcekxhk295pz1w34ev6tjyq0talb6tn4p09wh46cv6ubeeq0j7jy67x1263kw7uoxfpvoszd51nskqxx2t1ij5glps3vfrpsndz6nrsct8bi2nenxaube',
                receiverInterfaceNamespace: 'xiwxe724x70nsvk9udc23lb1xmukflgrdpemjuj1q4duzh9ygb40fluia1jywnbtfvh2h1uxqevnoltyaps7om5ay7ok8r58hygelzvwx5yavdm9aybej486ui37v0u34pnjx2scv0k474qyyi9hkmkjq1kmdqto',
                retries: 6647536322,
                size: 8262069690,
                timesFailed: 1210288857,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'o5r76wnpu0hxwno6vmli',
                scenario: 'px8xoe2cktgacjr1deffxlkaxwwmg1k7qkbp16325txzmvtz8sv0zk0ke8ji',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 14:51:20',
                executionMonitoringStartAt: '2020-07-16 20:44:30',
                executionMonitoringEndAt: '2020-07-17 02:44:38',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '6cuove1kteijrbwmdr7s8s6rx9eiwm7w0jlegngh0uoajdt5qfdlmhmathwtgznyzu2k9vvjvqkxvpmo4peagukhkj6vrwtlfs5huu9n90anau0n6z5v2w3frx7dzxawnq5ixn8cuhnlkks4u0b8nnsvfz3l0z5s',
                flowComponent: 'lopcyn1duoub2xuof3fwvudvagximpjdduulvadvlcijy3sq9k9bxrp6lphhesau1de00ah3utn66tfwdm60bh5ejxr8uymjer9h4f3pm5u98b88fzt39bthkeaqf1ebi2llrtjy2ik9w624e6g9gl60y66ikx6w',
                flowInterfaceName: 'gacxcs91lydjgis8zk52xg6l9p2pctckr48f7r7esh1jdk116fgmjhrth6p5xqijcyecsmik1jq8l1xnxjaeuy6qm5gvlugnqfu1v2e1h139nr881vd2k7q9isgwnx3ffjurn4aboqn0sg8gte49q7m6g3r5vk7j',
                flowInterfaceNamespace: 'psfm8amy69en27lja6zo1836drc18cdpidvrvgeijrshof45du5e5jqy2u253sa43a8xo0rkshd365g5cosusdtes79ihoziahtg0p8aqs9ns3hneqlih0thaobal7aq8o12rovzxhf88y759496rxflz634wu2u',
                status: 'DELIVERING',
                detail: 'Corporis vitae sed esse cumque. Est accusantium dicta autem facilis. Iste dolores natus numquam quisquam aut enim laboriosam qui error. Voluptas deserunt fugit eaque omnis repudiandae quos atque non.',
                example: '09p8rusgzi2kahmqeuwdygbzlyesdayyadf8kf49507tb4vjl3kpp91wmy4eg9gzmn0bwsu8zqm1oq76ufyydyyezn9yxrjrhj1rj14dorxpl4f5tqj270gprmyw3wspq3vvbldyrtgeb5kfepgqywr53pibrnj0',
                startTimeAt: '2020-07-17 04:03:15',
                direction: 'vfw4hat4fohua85mrley',
                errorCategory: 'res3bqzc81b0bab7mc3u8f1mr2zaq20o4rlv1uz9p2aiqz38mbjqze72mymkv9qeryyp589gprhfjxsvgzc7naw0cl2x1yy57h3yf5chqvj8mibldio9kdg8ca4d2ck48u9ocd62ywbjirhqtrrf5qjlcyjl1th0',
                errorCode: 'fywljuv8f663qmm0zrr4',
                errorLabel: 'fpci500fb08n6ew1cb1lbyufmjwmcuvihd954oj93f28c67qqe433i1xt7s0p9vgznv4hn5v53vgolxw1ndzjknqbd2yr4l3dz4jnik9bl1rceaw16vs45vsxin3f0tc4csi9zobmo1zjxfqt4n1mbddfl4bh6l4',
                node: 93649528427,
                protocol: 'fjzgqio1zsyl2p7r8mx3',
                qualityOfService: '1r51573468yxqhtngede',
                receiverParty: '99ztlac13dmid07j9ggrb66goachhd7zu809874l7j8xluwh7zjtrqam7ewqps9o6t0vl06zlpjle8h395uxj22t1obc00h85959r219chi2mdwv8b087a1gkktgwa97cg91hgtp6cu1f7lr6l3515nywfmt8vli',
                receiverComponent: '64ad6dl0qohieojk69u3olpqohw8wxp9i8susd75m84l3mdhoxyh00foed6g2sudi0z2qndp5ikwhidlqkoiyy61ak6hb55g6wgsgx3gdt0kp9xbtkoubi37ndhldimwue6a59y3fn88dh1aqqmhk7bzokgcz7l0',
                receiverInterface: 'ruamrqyi1mcfayo5nlpsgxfwdlhsq1j008uh7uf11qnfjzcedmas4cfg734sf7el04h39lgpc9ryu6bmu0i80mmvk9k3hva4x4jrnltufp7yqqkp21mp62eqwgdpkaudmffibeo74mkth2wur13r6kv1k0gr5ndh',
                receiverInterfaceNamespace: '0dl3le56ie1zc68at3cit09zcmgax69ftdbfpp1npb959gze1m0kzr0k541vo373l49edkcn8gmep3kss5g695b4ajtn9d76xlyqge7wtmxid17vjbprkiyyyhlv757s67uu0naqn8qta99wpyfnzlblsm4derlp',
                retries: 3548829196,
                size: 2648322094,
                timesFailed: 2997024098,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '0j96bh885xnbkz6zy0du',
                scenario: 'khgo1yym7hr5angru4hqbiub7phuv5c61dl2rorrjfmetdux84fjicjz7aos',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:21:40',
                executionMonitoringStartAt: '2020-07-17 02:09:49',
                executionMonitoringEndAt: '2020-07-16 22:24:48',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'ua2vwvdtl06teqlifgudynekog7swufsn3a3a50eo0sa0541ostsn3z2vvk76f5b9pyp63axz9bljhrwftbi2qwwty8b5wylj5xtbg620iuk984i0b418oymlasdu0juxxbqi4vxdab5m2d5brv3xj0s3c019o0n',
                flowComponent: 'psfy2rh897r5qth05wx8gyk5bweru55kpd4a5jftt3rgcw4br0uq55mz5a8silccmikrniezwwswnp7tb6lu9tq3ugjb2ot7oksq9c5ak8wynlxcdgpi6nrkna8ia2mc84edef0smvzdrwqrz6vc0303ka59rj5l',
                flowInterfaceName: '8ao4ive6dfhxksrk7jql78skvs68y355ropsemo9r78uvoukswvd3lu76zj97pmcr83j3jonf1ckq69zwlh5lfvsc4uy0trl9nezx5uw508b7vetgqlsoxbbwmc4tlo6je22npo6g2v0w9q74dusavquo9rs0e32',
                flowInterfaceNamespace: 'q9y69z6nj6q7fkobdaaafo03fcft87qobtfldh6uhlsckwzx4k7iupomzvx310ffm96m1y5k06ufxvk2dluv7imped57dsxya4qmibchi5dqxkz2zmg77iwznb21m92kfc3br0orl40a92z8hgq93seumxlmq5vw',
                status: 'WAITING',
                detail: 'Quia optio laudantium. Magni perferendis accusantium. Dolorum corporis aut sunt nihil ut.',
                example: 'zoa8psxq0vt2vqthgrjmc85gs5nxk965x3ewlrzxbw3w73a43k8hpvrlat7e7xguoim6r50zuv8jlef2kvkoec0sdpbbcou12095had9e0o5alo19mswgoepu9k9u8mx7zw32ol1ujsrrap9ixs6q1a30yimzybj',
                startTimeAt: '2020-07-17 03:46:11',
                direction: 'ulx55qxyj61buuln2rbk',
                errorCategory: '7040wmpmlc3mr5e70mo0g5mwjcwjn4lzzd02l8wjn9na64gpynlft5y5u7ep1vto4lzxzskgdt7d3fobflv54f4olzhfe8uldgx0qo9celk9rxa4h201vmbdsygnyf45rndmefuo1vw9t5qqw4kgeuc5n09wxsau',
                errorCode: 'l52iaxie19x708jl94d4',
                errorLabel: 'eohqrgpl4ubqokauyfrcl0t3nym36adnltc6kbx43xiebvrsidmwy3g0hg5hwf2weglws9q4kh56e2l4fkb741v15cj97ogcoka845hlokjz5ivnn7p22dl3q3rf99m11rs7u5n7x1aeozipmegbch6pu76kbwab',
                node: 2855708831,
                protocol: '1wyudbujpry6yxw4u3gpd',
                qualityOfService: 'z6cv1wbfxuciuj9v78d1',
                receiverParty: 'rmvmy6c94ds1mk6i4nt7pws2ypciovxdwduj8qrxkdnp1lr3qbuai5g9k4m843v7nk7plmg0czyqkskok0e40wx2xj1f4r72zexxsb6ploihw5qvk1bd9fr1uqa44el5592017h3yg73ptv0jcexut7aeek8roi2',
                receiverComponent: 'mphithua1p823z6vh1hkdhyn0uusyj10ptosi9b8iqmcy3j3684x79oky4dw6obnq285s83ry1wtu6ox0na4dvv229srflzbf107nip7h56ywh7eilx1lx6tgddv6p1uquetbkloui4g0m3bn6jodq3dc7j1e1u6',
                receiverInterface: 'ovvcioaidjv14jkylxzee1m99nkp05cdpz7ehlbzsq25iqdgz060pdbfe12vhhmick4ty0c23cpvd6pikkvjgkdr547u0nnla23m5nw2u73vpsi934e07otlse3hkivkfrnpub7o9m90lz7wig0lofas2savltjv',
                receiverInterfaceNamespace: 'mjdqfwzs97uot58tfoz13pth2cgq6xo3b4ud3sz6ukjouhu4jlwnze7yqza1whepz6r62xhc4w11bzz0ifo5fbbs9otvse6zxdx8igneximssczlql5rvt7zzzk3yv6mwnk3ldq5g6xstpkvbdygmtct6smoprh2',
                retries: 1071093331,
                size: 8199425553,
                timesFailed: 2064473072,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'kcmbdzrhzozh3ixa8fdf',
                scenario: 'esu6hhij8zpilv773squfizh0qe42cios08swsp70mdawthx4apwwmca40fv',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:56:39',
                executionMonitoringStartAt: '2020-07-16 18:21:47',
                executionMonitoringEndAt: '2020-07-16 22:22:13',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'toko91t23pd5v96bir88e87h9cin5f5ram0f7gn3vxc5nr8v6wgx5z3jsta3kg6lkk03r0vlwfg0y3z03ax40153byjgdh3mkmmolrgd4mu8rki8pfpng2pdxc8bcsokv79mk8bxcly0l105omqvog2z1478mor4',
                flowComponent: 'rblmlu3hug2aniii185wrmu7bdz142blp2bv7dx1t8mywb8hbedw8lihouaxv1jdna7bbxx6fuplfvjigc40a9txpcmi2eocjg9o7o7wb1f32z7nkgxcvrze7yxpgh8t2lbqiy2amn7wiedqlkjcffuadzu2niav',
                flowInterfaceName: 'mu8pna2uzklr9ff1ns33wvgbld1dwla3jblctjgzodkpt4iwnj4alsz0glu1iicudr33bu1doapd99tgo721tlz04d6dhkne4g32d7520uh7vupa5b36rcovl5rycc6c9wgwrptd6nfvg8kvibvo4mjdzrxt6una',
                flowInterfaceNamespace: 'hymxy2vkxh1uurjgr796mjkaod97nay3v00ol5vhs3p8undjhp4a7c3y5ojnx58x3moaa1ba48lnaz3vxia748v7efbxqfrbg666lgcynr87wcm9x4ng887ydz2r6cd5uq5xktlerkm4y6w7dx1rcab6qhqnq1sv',
                status: 'ERROR',
                detail: 'Et commodi odio consequatur consequatur. Velit molestiae dolor eos. A vitae nulla quos fugit voluptas.',
                example: 'ojt21qz6bctur3ny18r252krru331prbc1ut1hcn3tc2507vnnmyuf39riri0mn1xrxsj1qveqqkdt7nniujpyhqru26zd2avc7ou32gdwxng2syru5itod6kkm6w6vggx70xipwqufbwghq531owbi8lm5vzgou',
                startTimeAt: '2020-07-17 04:58:55',
                direction: 'v90a2ho9tsfbmjuhlb9w',
                errorCategory: 'xu205kwcqljgmc2u4px8pcxzk8zwml880ctrrt9mrb1pe25g3lahk5bk2tzgdh7nq6422bgyd44chb29qj90po1y6myvecjtn3dmdq6xx6fhfvok1kw6six10hwo2kms66nqu4is1rxbmiib8vlv0k50eugt8fa7',
                errorCode: 'hgrn767itun5ipml3xiw',
                errorLabel: '9n31pvwjq58ud5gpgoifpz88bq989edno3ek9d9dexw6xo7ez74ciawjdatrf8o6kkz5c9wgvrykxdoqrmabmvn61l5qdivvn48jsprqgiytanztmmyhblyuo3617bepimlmqfkzhlmjjq39kgg8ckxyimaskylq',
                node: 3783624509,
                protocol: 'dodsoudf9brzjf7n467f',
                qualityOfService: 'fdk8wefx6cjgu3tdb8a2e',
                receiverParty: '0nv6n6nc7a7bgl92q8c8ipy6cojq14zd9f5gdd8gteyu42u0h7e6tc7yzub5s3hdfpasyn6nw1za0k28orrb7g2h7v94tpfvq4vxxqaac5zqpjkum1py8ubllkdkvrnxmvjsla67ytcvfgzotknaweykjdwfpqff',
                receiverComponent: 'm20lie3384sorli4eufozs7ybzqqszmre5gnru4sjgk7ptas2nljocfn76zskzif41c3ppr0dxoqozdk2cgvr4a49c0t5gisbcatuacgvf4etdd81whwxy0sqb2ob4tyct1l5b9hl68qx2yhxv23l94zvbnjzf56',
                receiverInterface: 'hmdouq5nehjdxu5oxkjkvj4z7i993wng0skshbeb6i5yyr96kin8jximvsrnx6aw0r7675847tfpw5nmzbtiuwg6g38pyq9dxcg2en256q5f5xaxx5qsyvevk96dllwo82i6u8dzeijh89lk8hu9osy8y2wpt0tz',
                receiverInterfaceNamespace: 'p4gww9apyflld76ini422ckeswiyuzx4zbbc1u0p2vs1sd1a6d88z1fnoa9niguz07sg4vl9dmo9bs8v34vrm0he59xtu048e2aq9gs3satjnrx9wxopmkqsqxrue4ib4miwxy5kf4ve7o3ufbr03en7orz4fi7a',
                retries: 7274515674,
                size: 5248394333,
                timesFailed: 4581725020,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'cl8is4ifzbj3l436yo1e',
                scenario: 'rutridcn1c9yubenk3mk2t345bbthdx7rlnkn5uu83ozixso6kipj5rjit9j',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 21:31:52',
                executionMonitoringStartAt: '2020-07-17 00:17:17',
                executionMonitoringEndAt: '2020-07-16 17:40:42',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '3uuj6k07pqknni1mk15r6bvk97k7rv4w9ns38g23q3m0pmezijbrv3xxd4415m3wjucihhwptrxuaicqxo8psr5poocqqd26frqsmppv142o3c39rgqdqxh26h187bszhdzqu0gtqusnkd0fl4b6q2c4vu3dur6w',
                flowComponent: '6pqhffws32n7w6j31wug7hct5vlmkqeq24wbvjmgeliswt75blb7pse1fhkrngmsf5s74x6n0zd6t3ad3o34hwgtfnb8sfeiy5wumj0uq6zjcknyzhiz5dykk5xhaselxyfxnmskzi63mloy21h0wf5km86569xi',
                flowInterfaceName: 'nwz1y9fpg2hu5qxfhv6wj42sbskccl4lj0jb371bjk3q1ze09bumb8lrmnj6vweiiwxs70vybezh0fh255po1lwdxjfq4fvz16qx65p2vdgsl02vbgzl9ofyuau9nwqnk20mudmsx8h0rwtinp45qpuhmsi4z8xj',
                flowInterfaceNamespace: 'vrk594d35n4lnqgokto4zzkpphexltrwt3mctlu3pbweb7uxyk2m0es1dlw9vsrr6izwzooc5agoliyea3mlnbpe2pwuthphtz5ha4cglus681m60d5lnbyr3gq25muh3ksijzub0owbu27kog5ldbq4u34sep0q',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut rerum est et hic id aut vitae. Reprehenderit ipsam voluptatibus aut nisi. Qui ut aliquam similique maxime autem. Nihil nihil nesciunt pariatur et qui sint atque aperiam aut. Aliquam minus sit est ex.',
                example: 'a01jfmnv7ub26fl2yykn253nw68rfgds7dfwhfi0pc9llrbrnlgi1g1fgdar4lgo82kdooxgvj5q4kwvzpcgi2bovch167wbhjk2h207jpoa3vcdqdx6c1uifgpnzmacrksp5jadb1pzx2advcns3w07dv7pf4kv',
                startTimeAt: '2020-07-17 10:23:43',
                direction: 'iz14zy05t9rs6u2ne110',
                errorCategory: 'qq4y06o8sdbvqs7a7pgrpsac0hhppo3fmos2c7158dxpnmmm8mhqd3khev8vh3jc96whvy0nwcja42cips4fp5gi96gle9qewb9ih54jaazxbvi43s915ojzrkruszkqsralldn69tqx4g7aoe079owyu40293a5',
                errorCode: 'qmp74axijyju38ulgyqr',
                errorLabel: 'hvlo2teefwydoey7s073915fe96429fpm55zfm3bmvojszq0wivnzz4tsiok2ll1rdsr84mdn6zq9faifp4t6b2l8rj33i42jy3f2t9xmku24g15ulms6whsmzrof8mnw1pmlyzs9et8braon1ksg90vvv8ny34w',
                node: 7161808041,
                protocol: '0i1rbkyp4oc0jyyf02xj',
                qualityOfService: 'ruqqv2qhndh61o1eg505',
                receiverParty: 'op1yqp2nxzzhuz1xf17kb3nik4sprl2k7hxqb4k2bzbpfch6f4dhjkxjl0onmmumicxxe1xy1ynf2fhwxpqskwzvij1fqo2tg0z91xa8ccunuz623sq9p9101zrr57ly4u4ohe8fil583y2az0mlgylawdbslqssy',
                receiverComponent: 'adoyl3f9t2mx3z2midr9dq01uyhj6h4m5acfgfj6beddqjh6psxnx86n24jcots5wvosi9nyb23l4zake2bvh8xogphdft7g4ctgn2lufgd3fbdq32858sov0s4fp98zf0ed9dz18969vgvu0ieq0mupot1bm52e',
                receiverInterface: 'ryu6kapcjillr8ylfyix69zbsgfslev050uv69cpyv94q96zybe5aix7tjhg6b42c3b4p2wmcgxxc96yooo6k775p6rrpie4nxoa2nubcf72udk6ytbuszc98q95u2o9sqc9ilajd6sdpjth8z6pui30mwtoi55y',
                receiverInterfaceNamespace: 'af6lu7i0meysochuuaq1k9g4fqo4s6rzvlirwgx30x166t66w3kvhx44wjgxm48zo8p176d9bx1yswp2vwkgdxdfqwq61jnk24mzdrtc6dncf2ce0xjykal1fqmwdngq7wqqtvlcgfzldsxtfd73cdvsqbdo1ewt',
                retries: 4943823350,
                size: 4446804601,
                timesFailed: 8982583033,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 's8hu83kk90au3qptl1uy',
                scenario: '2xrc3q9aohrf1wap7oxe5zoj0nuvcuo5efu0a49aagghfu7sxjvya4v3bsd3',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:33:45',
                executionMonitoringStartAt: '2020-07-17 09:13:53',
                executionMonitoringEndAt: '2020-07-17 00:34:40',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'rz9pl6o8xz5xcn7n2ok7rft2937tatbw3zknly6mob3nvhfahd5bxkqqym1aowbpo6okckab7ynrblpx7k213p7vuojh8pkze5p2389tq0radudii9kb9e17kt41a29cak0dwxfao0lxzfnaf2oy2y9oguzdwdqg',
                flowComponent: '70uz2oay0jh2c1yhyir18o6z9es1vt50ieu9ulie9b36k6kzsprkq48400pb3i3ygyzcrxcjpgy1gwfzr49bqq2hx227elii2vrls91vls5my0qs4ncawobgube78tt3z8vv253kikza41mvj1t7waoogtmsp3vm',
                flowInterfaceName: 'a6xuqz404ndkh5kc33credoiha2suvzbhcbxmanjw80vyv4fhsn6o9yxfeqradud3qohkgm1igl3ft3d53phdqkdfyguk3symhhjvtcaj1lr3iwuhy5xevtda5crul6jb4nw2ekd34n0a6fyt4mcddp5hel5a96k',
                flowInterfaceNamespace: 'g4783t4p675xdjvy2z5h9d38kuji7hl1utifij3hgfrxd2anobs538brzstr54rkupwwbqurenc982avpww4f59bjo9e6yfk0dpeap7gos2f9aamj7b4c97qo5m2wzz2fh963i3i13r9u1aanf61pn9vo332i8qe',
                status: 'WAITING',
                detail: 'Quaerat alias et necessitatibus voluptatem. Consequatur excepturi id quidem est officiis qui aspernatur autem. Et sit nam vel pariatur qui et. Et consequatur tenetur aperiam dolorem et quae. Modi earum sapiente quaerat impedit ipsam accusamus veniam.',
                example: '6x44a9znm3vhfoowaginmutrwxa0n7muh84tq11mcl81rx90ga28pebwjru7fe6b6yjj9xqjsesa27999u03gzdjgfrcm7bc1vshfwe3yg6h19xahvz9uoqaj6rx162aqr3jtkgs0c5n1erbwaskiqqazwv5apqz',
                startTimeAt: '2020-07-16 22:37:27',
                direction: '2edx4lhzr7056d2q1h65',
                errorCategory: 'jk9g45m8uafm7oqkh0p5zj5m1o9zrvy776k7nil7nq8kmw2a5sagw5toxpgb8nbj02qzcp448z3yc51atlaqpenjulwcd79iul31yx84j6ls7vsnxtlq7yji7ffuysiefsupd0jwjpv5c7ugnqg20n0j8xlp2qou',
                errorCode: 'cj7qjp2764wsxtlxj436',
                errorLabel: 'l32hqr7zew0poru2b04sposhvzc9dzhur0ogo7gvgm3ek835nr04ctckhzh8qdj32fnmpgfsj6221kyqz2xnwnl4g6zd8hunxmaudjyt3nh30m1to2795yj9gk8t2o8x5m3p0mxfply8we9n1qzsamp6ys8irbch',
                node: 9501720523,
                protocol: 'j73wva0xvjlfnty99dr9',
                qualityOfService: 'bmbv8b2ssgxbrb8hs8iq',
                receiverParty: 'ys453q5na6fgw4iq1ls09gf26tws4fzog3rulm5kdlrn01c52x3komw6i3iahykd0ue89uchon5hak3zlutfd1t5anuxlhs2fbpnsiatvgfrd13fiq62zxi4v9ht6dnl2s2sdnl5q6u5069yh9mzdnvm28gomtd0',
                receiverComponent: 'an53qs1gme4uakopcrfyy0jhh33zksxi36sozzsiwfkoamz5lwuzr7obug6g1x3f7flqjg9pp5apoy160dj9zfs2p603gi997bscqxzkdfntojwqfd8wdqe0j1aor8009i7frmvguccgpexof0kod69iurygr3rf4',
                receiverInterface: '3n7r42jsjccuxt4ucit9w112qcawe26q704tswl95mnc46zu76jqrpvt5ze6j75ci4rea9lp6135v6al3zkkks89dnmrrlomqs0pgbrvezh4jhkwc7gfxbhxavh9x93445wepvnkt1u2pvn080mn465z7j4fov61',
                receiverInterfaceNamespace: 'prjt2muwrywcesawxunpm4cc36vosf1dykqzdfof0l6wc4ka6jez9aiz1ml7wtgptb5ej0a3ed3jaxcd1f6zr9csv5esjht68io7y8vsbwlx5ro16w6aqc64h2c1s0npovblsws9ieb0q9frjphw4u1njw8ansla',
                retries: 1242496220,
                size: 7655517889,
                timesFailed: 3717106662,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '3co5f34yuaavt86u9o4t',
                scenario: 'y104lfokjrjxrupub263jpw5j1t4btnprca145gfw9y07t9f01ft3lbnlrzl',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:59:13',
                executionMonitoringStartAt: '2020-07-16 18:51:16',
                executionMonitoringEndAt: '2020-07-17 00:01:24',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'f1qnti7yuufxlxalzuqpb5qo9fx0ejv5jdhkunkf0vfssx9xb0r8uekk2ps76bz4kadvknctshyy2eczsvhx0benp137rc1awscsk1vk5zfwqfxffnbnnfm7ys2sfshjce8s2lbiqjwi77ulgpgxp46049rdurza',
                flowComponent: 'n10rx7pr3yjbu168ynny0tvgs2q3r6jquw796snxm505jx5kukxpw9wdp4q9kozg5jzfe5x14uy1t5aoe0opcqjpg9horhvikt6q6ihu5lxf9d58hirdf9aabdcid7gfg28br9kkmy4j1w8zqcrjfp7e9cvgpu76',
                flowInterfaceName: 'soyvnpb4kgwzv4p8d8c7qee4eqoa73hotq78sdzvcyrl9rbu5jm2fq314htex8an5skbc1ii1usigmou2auwvhi7641jhn9no4duq4sefdofls4hp936nhvoyu9udeod3m4rzbfcx3v7604nszrv44dqn1fe7i0o',
                flowInterfaceNamespace: '2a2csq6nec0z3c8aumtidbyhzn80fyu6rostf5smj8277vis2sg91nq2k4xx9n7e0o2n912pb5p8zutah0h7je5mhu4rd3kqksd8c4j38w10oqruki8zaqaltywwrw9mco7jzgspkrhghw2zeqk0ngw1rvhpbor0',
                status: 'HOLDING',
                detail: 'Voluptas omnis illum non. Ab et quia et dolorum libero impedit. Tenetur sit est quis mollitia autem.',
                example: 'x11h8oyyws0gho98761x26w58moha1qee29xwmeafo1fj05mpexl5b6qbhoodvzywf53nl7x12vvzvy73ljjv0qav10tmad20yhjrvo0rthl9q2dsf8v3re79rt82kr3uliowarxgvgt76cjq7odjdc0tsikumku',
                startTimeAt: '2020-07-16 22:31:02',
                direction: '9rns6cakiq5u5gtimku8',
                errorCategory: 'jakifcunzn9uhfp0o5pw3pzb120qbiy1o2wp5ti7wezsp2k5eyzkc7et3c07urgovkru6undaltugtnio5fv7kxvu1ef9od0v8iuy8gf7kx5g1yb639yg926xpdqxuja2s34nuljr60qrugz4iweciw9p1hrs7xt',
                errorCode: 'iyqlubtn90cvlewert1j',
                errorLabel: '8gckxrfr0jipwwckgbv8z0wtk0kccl9gdztn0du1c4c6awnccrhr4ewwxx79oy1hvohrxnot0of2wag7wss8n1bv7d5ejog03ds4rw3x8qiu48cspd5jgm1jr0pnxyle2v90i6zj8odivnaauzys4eljr1g123pq',
                node: 1399719542,
                protocol: 'k2pyij4yekhqxcdbbc2j',
                qualityOfService: '3obl6exluzmnw5fb09oa',
                receiverParty: '0oms11a1ah52ldfvi6dvuyzymmr4je12yldtojkdrfkumfdpxdbtv5aohjnw7q2owkrjdkpha5kt8jkhebvuyia53pe4meggiuriy3iyx30mz5kuw42euokv4xhmm7htbz3xp6b7gwrz16w56jwemczkcpzk3qcp',
                receiverComponent: 'v5jt3nmo0lw09569g0zo1qtj20yoo7wavlej4nenb2ca2qpcwlys0y0g5yc9kbai143iooxx49gaspx2kwagfb6xbzqk8dg11jj5erb48sekoz4l1o1jrov1u9afcdp1nohs5lurkfdss5za72ut32tkzodke4eq',
                receiverInterface: 'c58dzfmo6tmlpianviah7gk3x8aiy7e2rkkl2sexzmiba74339ei3q135ah6n7p4ha7v1xpwc9f9c8hk2ti2pty2txkdch6li1o0857mb83cqu67rqpynti8w8t0qo74egk0kvt854libw04njp6r2fyj9bl52x3a',
                receiverInterfaceNamespace: 'w5xvm03u2d71v568djc28hedozgoisdtijzuedu11zjroo8sqx8560xy3kge36whv8759v2vhivs6nugjs35p460hev101g4ftks283v7xu8sxlogn9pvbrubft1wzrre2vm1b0v9t8z7pu9seruc0zduasnkmoo',
                retries: 7726928802,
                size: 9043447356,
                timesFailed: 7941441724,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'zie7hod0yi89xfls3r6d',
                scenario: 'i3rl3uao5iiuoa4ntx09jb2d1n63m60brrvbhlfj0fd7knbh8t66f6g2adpe',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 00:16:31',
                executionMonitoringStartAt: '2020-07-17 09:10:51',
                executionMonitoringEndAt: '2020-07-17 10:38:38',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '7245dlxeopt1uukwojde9tz8xtjnp7o0fcoitob2329tocie3ci5fd41bcw1zqhvhx1s9og6wpewvdhlnhio032np4w8qzg2i64nb6efgkwptuc8jd0916kf22r3or077jp6tbykb7zw0xcintjqbh2yy4dabbk8',
                flowComponent: 'y7tmem60h6yfewg79mejwqnsiknjtn272m6ck8hiv2mwxqzqqahiza73ukzc7ypjoznvsvlwmrpln7wtj1lrpkrh3ysqxf2b54kkv9jsobgo2pjjozjkm3uzhh9irvb0jwg1gjuz9qhrrclerdtspq1jxgrtcuyu',
                flowInterfaceName: 's28gy269ahmj7npcmr50le9on6ngobn4xohhl1y9fmhqk1d06rp31fp4dw24kioghppwyqwp4p0g7k4dk9bqi91r19cgh9765ddn9wtagx7tro9vd9p2fh62ru8nnyvityyser8xa47wi56fva7nywp5742i6zsl',
                flowInterfaceNamespace: 'l12zfkh2bpenn9unxfwavzzjprmyggbu717r50vdf2go0a0849znrg5o06ni3xycl9p0broed01t4bq99k8h4usy9nmaa1ocbg77bz18890ly3ovwvcieh3nz24r11dggj7tl9jbpj2gpvg6083dupd0ga7j1rpv',
                status: 'ERROR',
                detail: 'Nihil officiis quasi suscipit voluptatem et explicabo ex et. Perferendis illo nulla quos omnis est nihil. A reprehenderit et velit voluptas enim voluptate. Possimus ut et laudantium et.',
                example: '5a3cve7rc2yt50nlikwlx2kxh0l1xawrndbhohh0atmqwm3u6kiyr2r69bwyb421ee2uvwcpyaa25axogfjoviski0fshpi2diu55w45ejt3t0bmkqawht011xtxogpr7f6y0hs3otnmm9xrqesillu67kb9016k',
                startTimeAt: '2020-07-17 14:36:17',
                direction: '6yhvzazjkohse89vozow',
                errorCategory: 'ujzwtegyau6hg1eu5gmm9kxgkylrube8170bstptncsx8e11r83qmoovvbi91ufmwkcosv038c8035jnmyh0ejdlvxy7chooqtg21i1nk268tvsuxt98fdibsakmf7zm5jvga73fxxhoywjs4i10q7md3zkt1bvg',
                errorCode: 'j8ogrqi1emqk94kopku4',
                errorLabel: 't4e6j62jlcfkb3vvpz78qvl9bcrncnvlfqf1aflhpflx4juoc1840y757uhy0bf0p6zhodqemfyxpzjn9o9dahaahrl4g1y8g9axjjhxwqvsupy6hj41wwlsviykvq8fb6yxhpdqul8wtdjxp3codfo35m9tqzfl',
                node: 6679784349,
                protocol: 'iy72i9ftfo99mc9fo2zb',
                qualityOfService: 'budb7k0yv41w0wlypzud',
                receiverParty: 'nmyq2ui4vi6xc09zkph1iwr3g49j0d6h6uh2o9v2zmfc6dow3e6n2u0jabby0sxoj3ant2n57scg650llsu6nisg39t6h79jzwgxd4w03mhgiaftkoxiy5apvn8plwzk8jt7999gvznahr7orxn54ihgarw35uy2',
                receiverComponent: 'jpoktmy4a5pb62q7lwvylp9idptccghgzdvk08o1nfv4bk6rq58kln6b21usm9al69uyxcz7c3gp3crld2dncva8v69wt3drikldkqdjz6fgzqt8bo7xoxy6dyw4eagszyxvvz00qsz19nf9sggltaj96ssh2awj',
                receiverInterface: 'aojwm4zz5rt8vwxaxnxn3x6siaswuvp4cvn5h5qxe198bnqzrto32fs3dc4wjfunqru61cwvkunis9yt8458qk00l00nx3un6vob4jwkk3okc35txt5w63d3in3va3iodwrdt6f1rahr36hkjmy6vm4umohfubrh',
                receiverInterfaceNamespace: 'etws2k74muu5loni0t8eiutvyzgssw34svs2vfvxztav3a2w2y1uo72yj4xgma7j3rx4f8qqndgn6vh8n56w0xhslfvpml19awf4utw8nyryxz7eo9c9wc509pglty9s1g1x989tztnoxkx3kjxdc6dhp1nuqgfy2',
                retries: 8343037192,
                size: 9179967810,
                timesFailed: 2687510764,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'rs60ksc14cbmov7wbvmg',
                scenario: 'o636etzq17oqc7kevu51r7xrhxfsdun0s0m2unfrtp6tekk67tlg3wlcq4hh',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 14:57:57',
                executionMonitoringStartAt: '2020-07-16 22:23:44',
                executionMonitoringEndAt: '2020-07-16 22:40:20',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'ev7xbaiicywee276a4m745ix1f6bao49cpcf8z291eaavyw1aztxf7h3m6fm1qxli8c6tatnk68koym4miixbfjfg785bum37jxwzfqbdg3g82qgrz0dvbsygnetvhqr934gey4v0vq302gv9hcdxgou1p5ufxo0',
                flowComponent: 'a6xwzwigestvwuad80ape9bnxl3541t9w8i726n1aep9wxjwzn89hnqg87urpq6keq2hucbyz9zu3nqdtf9ex7qkovjl7l6u5fz4m8ypvbpa1ypfy5oso8yalpqicmhaiv0rh6ar0zanajt6cbhkdq6z11qblu2j',
                flowInterfaceName: 'oxh48gwyuq4cir9jkq4s5ejh5v7k04rqrkr5cgnqib5kbxwpg1g3pn22pu6w3wm3i13esd8k2fqksamx7v6lyhiox6upxyn7f70atjswyrwl9om4rq3vg2yh7yyv1t463nnfoy8mu4clre6ng74svnwvyhnkkn03',
                flowInterfaceNamespace: 'g11qngyrmb6sf2jtetd10oxg3ezzmdgk7dwmald36rw4ewzbsf8yzbty8ny0w14qm1dgg7btn5nbf96sua610z1ofz2jc5akc56j0dmh9pvnliyobmonfbjs27co7z4haql2falb7v8nqztnzpid9fsoiuf5q2g6',
                status: 'WAITING',
                detail: 'Nulla labore optio quisquam. Ut reiciendis aut occaecati fugiat totam id voluptate distinctio. Ea recusandae quia consectetur repellendus architecto et. Voluptate nam natus voluptatem suscipit qui rerum.',
                example: 'gybyu2v95ocs2tsd812vxdqt36m1bz1ov0fkohmqeb0984k5d0bpzjx666q52xl0nk4yo4cpnnmcfftjq5qy40cursnx2b4p5mu0d8953grrig2fb0lz9m6yq669n5chxkpmhtji2sxiepvide5gpv9cowzqlcbe',
                startTimeAt: '2020-07-16 23:12:53',
                direction: 'xw2k2j3927u848ggq7ib',
                errorCategory: 'fg3jui23dw9xh9k9isuv25ux1l70ffxef8qqqwqhd05ts5r1fu5quyu14pt0hisib0qfe6pq761xmg2lro2f8g1603ewox91umzmkgcnr76efgj1yrje4b7rlhkb8cs8rckb1a86pbmsr8dyn5ym6roanxlf1ctm',
                errorCode: '0gyvxadfkqio2wexwfsa',
                errorLabel: '8d29538ghatl0y2aryu8xyn3p98jyp6qonjvi79toz0l9g1ghdqzx91bobl1zdkehwyloln7q1gvr4wy8xrr01nkhgswaiyz5srz0dh4zmscwzcc097pt9cuzcv52fae7ky3qpn8e5b6pevzjiayxl8kbgtwcr1l',
                node: 1924604794,
                protocol: 'onx4ztcw0ldr5zt5824g',
                qualityOfService: 'p2r7578fduzorzt25nyj',
                receiverParty: 'oxopbl168ozxu9cil3uj3kcj35vtr47fyoe1s7u9g25jqzpzdu1zl8yu77ezc08xm4iu3iaztf5itfzdv6e1gylc2975o55kdkrnjkej0abaj7cl6x2xcmh8bfalnlrpmxn6zb9nniu6v970ewdoph6kbcf4z4m9',
                receiverComponent: 'li3wkraz47t9spwi5146cv64e30ko2371br1mm7ws4nwoiodp0pskjjg8sqey8usv3tnvwhpwhw75rhprk62ac2y11sacx1lqm797e4quxv0m28l1jn9mpbz2kreuydz8ih9aioyy2j4h5unxn49iw6tj46hz9q7',
                receiverInterface: 'qna0vyry7gwq33ghp3q9k4akkdbibjrq201t11536clicv2fs3q3xxusbrqz5wves7ziqzyge6wgvr7g88fdgoirhc5n6o7u9k2fiuwwsxg60e25t25236btiogoe1t8k77ynf7av8tuxhjosju2w9fofx5co8mi',
                receiverInterfaceNamespace: '35xipu5iafgyrt21rvenekcjtfyvn1udpijb2glu3kl03hj5ht3cb2vol69zlnok9e3w8qh3vcloz0u9i4gwidg2jp7ex6290945q9jnxken0lhsdn4za9qst9dc129n0hath5swd2x8ocutlehcnvuo7uijzkre',
                retries: 42007397982,
                size: 9752482238,
                timesFailed: 5562432313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'z4ou32yryjxnmevuzz7p',
                scenario: '936sbq14jo3836p8w95t7qeb6pnsg0t0fd9dgkh1663telumh0cqj90nd4kj',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:48:54',
                executionMonitoringStartAt: '2020-07-17 05:00:36',
                executionMonitoringEndAt: '2020-07-17 16:06:45',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '6p2426auxb1wm235ay3l7c5c17o33nuvj3jetv9vh1ekta1i1570qj1m06jij2qlkljsgwgzfacoemkjflnsjfsv5xykh98y0qnpnaq5hdjipjwqpw5cv47akuwkdwy9pu7hqiznqlmm14trryw053z64wk94ocm',
                flowComponent: 'ff3hf16nodeyuizjchv4edo7z7jhx4gevt0vi506vtsmsjp7v36x6yagfxsgu3c061mtyuu3ag5iibxa7jt60of87szb9wcny77h4dej8d0ycbjb22d6ohjvilukvxtvvvlhiqed5w6fguyy0mhopfbtd9xef6nr',
                flowInterfaceName: '9nf3r1sfir1e4su25v3vr70qagrjl73fmas6oe7iw7dpv5syjcc5o23s5uo8lb1f4q021mlq92q78q5f5rc6er2ptkesjnz6hoahvl538zai3vdbecthxacmfvuzldmy1klhy37uv4ueug8jwz3zuabrffzleycw',
                flowInterfaceNamespace: 'rabwne9qtsn23x85j8z4yt0lrjddez7hi64a2j508hnu7er01gowznymwjos3gecjpp3uj3ku9y1e12664oy0ud0vpvnmfr3ie6jqd3236yf78uobnc2jx3pobwzc12y2gunc8u7aoxarrrllu5dekjlahg5rmf8',
                status: 'HOLDING',
                detail: 'Magni ullam quis nobis ex ab. Qui non saepe minus eos. Eius asperiores voluptatem quam praesentium consequuntur sapiente adipisci. Non nostrum quae.',
                example: '5kxn4ldvb3l8xoa213y68gitv9ch4on8pgibgbocl4qykuc8b6hm3tdwn1t28ko12wqw7r1oqq4xzp5tsx3xpppj4jmqhwoz89vnn8m5h18fotprn16moedo5of65c5y04z77cdjulnbjkyye82te0uzqltvibb6',
                startTimeAt: '2020-07-17 08:45:13',
                direction: 'v6xqmf1bh9dhjce08iic',
                errorCategory: '23mfg89eg6yatrxwggszmzz5khti47koxg0513hlygxefc2wvvpp5gq5w5wx8s3v3h02diy43qqjkscec72up715zgmn88ciygz79uixjopyiyagt85gk7gvmcdgts35mxlvzxziqqbf8aaa7hc3d05sg1zp1mdk',
                errorCode: '3eq3c8uibvqrvjlqozhk',
                errorLabel: '9lpmuuzwdn8cd00rabuflqt4sok1a41tfsv0fbl49xw9t41guvtxf3p0fegd9yibgu92foyr097umkyspng176igv8404ufuscdll0rmkc7h87kc5954m1r1lwsvou0yspnlojn8yaglfjdx53ezkoz0gqa6g1m3',
                node: 2830182518,
                protocol: 'yvf7bx6tq1sxxswmk9xe',
                qualityOfService: 'e4pafh3332vwbzgwmrw6',
                receiverParty: 'bgyo4n8cgugjhkgpfpvca9zvc0pxb9alf03q0lkcfv40ltyeo1su0hho5xdi0homoyitx98k5zgx7a901d66ibbbfdteym1jbx6d5fd2twxkkguh74n06fricevmmcznpf1o1isqnfx9jt4kklawul6cx5s2gzf7',
                receiverComponent: 'hn278vl65unsaki25a77zz7n5sxaxpt9rlkjlpblimbt6djvgcbf6wg9p80st93g86kk80vyp5w39hdn9vwtzc6ythhe13qlddlw0rrdf7l2lqqoxypigv0fu3wnvn68d906ehbmenwzodhai8le1lj9tmpj11jn',
                receiverInterface: 'e46ehpum1eyw6h1egx32o3sbiu3lg16hlapbu5vmh6ihpxxz866dj57118ukav2itqxi4nzrgca0eekaacgdijc8xtrmdlpgp10tph4sv4sg7dmckpr3fhwjc71t1t4xd1xzim8f320t9dqp72cz9cn8q6gub9gu',
                receiverInterfaceNamespace: '8hsymk6c7hbvudfkhfukolqxr36g86eprt5gy8f458c8zjqujom1tfdbwpcsahx71cfjpezz02lof5zvsnsvrmzjvrhu0y694a76qlnj8h598fxn5rioisedaz4027w2qhvr1sgsqet40wy7hlzpeyqxxwu99jzr',
                retries: 1139120651,
                size: 25957992689,
                timesFailed: 6870562807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'tjs5qg6uofvnxv4hfdxw',
                scenario: '6clc14tg9qmlqjb2s696uplg0vxkj17a5ir9wc31sgtlgxkcm1pjpi5f0aur',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:11:04',
                executionMonitoringStartAt: '2020-07-17 00:57:19',
                executionMonitoringEndAt: '2020-07-17 11:04:38',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'awbvreyxfs2fspdu9z2kotlk20tcywzqrlz8wg2qzbru6senaaen2vfxjydc3o7g8l65vk35fdu06s70vcqz2wwfqjuc5myhjhpxa8vpuwyhbzghlrgs7gxej19dwqubs5ji5tazya906a175e3xnuo76q7vwsbk',
                flowComponent: '8ifa70bo9gds1j8hk2cmpt3lnk2eebn4u2uamg8zqrhkpnzhanpgycscj90jnmqy256sh3bii9j0c0jqmzne87y7ipn4ysz4ahlv45n2a20dnat7a4vqx5dt3durw4m8lez3bqfe1bymxddjwpscr667rfqqielb',
                flowInterfaceName: '3j4pz94ectubp3ebh7g15uvbe5mtzv5h3plseyk5q6daqow7w49frunlfc80j5uolb02gb1f4czpg5eq4fk275ancfacempdntln56ktnfajqv65f62pm56t8i8gj6dmq0afaoiz0ncvz62muiwb87v5hf2qjv27',
                flowInterfaceNamespace: 'hpoje49cajizn0in21j4y1dbl25cwdatq87ew3rg4h3ni5ss0hglp6713nlvit4blg8tdwi0g2e92492z1awalxxg06o7qvio9uuwdijit5n3ddq5fnwhibp7ctq5ri7xu18lv3mxjdwwnchezo45t1n1paeq5em',
                status: 'DELIVERING',
                detail: 'Ea sunt accusantium et aut eaque. Quibusdam amet sint. Rerum dolorum magnam nihil velit. Veniam magnam repudiandae nihil voluptatem odio corrupti earum eaque. Consequatur repellendus aut ipsum labore qui id dolores harum. Praesentium sunt laborum.',
                example: '6iv8svncfdpcokb0mjyoncu03wt3nrh6auya0q2kqnr9mkxy2vyvmymgnaw2zy92rzcfh6bvfr9xy5vpcssjvrpcox9pspuau6d8xxbll85i580ddvnzf2qmnl2f1xsixp5agm1dalnlxgt6h22uvp2rk8x51rlc',
                startTimeAt: '2020-07-17 01:06:15',
                direction: '9gz4ezhrkvqeijq9mtd7',
                errorCategory: 'abs3xxcnagbdb1l0e631935hkaskv34surj7eppyj7j0w1rar1aslkdxs7kext581fhhlggay64ld8dctcllha77ve3vag4xvdybl5ow3j9h5zr5tzpoob4p1qusmo4khvpuphy5kvicb38y71hba3zze52j87ls',
                errorCode: 'at9ptamv0sg4qdl48052',
                errorLabel: 'hwfrj4qb84szt0f1igop1nagczysh1zweb07s4ctctw18iq5xp5hfaqy2618p7vo4o7egx8r1grnyjqgfm8rglfbud3goizn3hn6cy03p8jjq7vojxbhyxp41m13q4qe4dfu4bo9doyk46dbge5g387ndtt1d5i4',
                node: 8870385345,
                protocol: 'bodyj338ztp58n1l6bc2',
                qualityOfService: 'x06igtxbnk00wwxttxy6',
                receiverParty: 'fxpgfvxducq9esl7frq5gj6d42k2d2kqd35e9os26x2m4ddv6epg0thy5wgoc45pkcwbzmtn2kbrru0ya5apz64k0u6g1088hm9szbcfygsemkgubhjqkw3in2fbofo5pef5e043rb26u5gbi6viix4johyggr18',
                receiverComponent: 'iyewt6obtkvygc4zf99zulj4usc5e4f5jiul2xvgujowd6btf55fcutjz27n8yu7l0yz4lv2mexjak1jha59nkescy0vbgn6t4zjjmhtf32diinwm4cl0katne7pfwegkktjtx85d2xw7yn6qxxfwmghrbioy1gf',
                receiverInterface: '65xzjuz0wlh2l98h0cjt54agumqq1y1ar9fgq4gjmvrd93rm6ou1h1iuasznumgs244ztd0yrbsvc4dnxauwwjzeemo240vmjqqva5roibcdbmqpzkd9f81aaedayvs7upicm0aznwec2m8czh7kkobbuh13zc6v',
                receiverInterfaceNamespace: 'on663v0oiot3luuju4pl4k5d6wtmoevev0xwm63ujv5c6ov3qh1lk73sjgsy7whn6ij82lz33mgikpmkrbtasj6i1qrmo2vs8c6dkcbwg989dieh8p6ec108amyzxv2gt6lj6e4yepgk01wivvkpdzy8q7hfcwbz',
                retries: 8095011668,
                size: 5299066520,
                timesFailed: 76385671541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'iyyh9bg38jm5l2g30jzq',
                scenario: 'jjxof1id8454tq8jujvnmxjytpfmsunrysgvgbslgzj715e4ihqc3htxfw65',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:36:06',
                executionMonitoringStartAt: '2020-07-17 15:09:42',
                executionMonitoringEndAt: '2020-07-16 19:33:58',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'd8nrexpmfrg30i4v66ix6cigef7dxkjo7llmhvf287bcw0j87ql99ga7zfkiugigvk6p9w4kiajevbfxnj8npxfwtt1ltd7sntd2e1qw77rqx84jp1qat0wojqfagwmw2fu5eq8d4lma24v6njvxis3h1b2xnz4y',
                flowComponent: '257ackzz4cecpnv81rssf7xedu4aw000icpufsyiltd40q1bnbxn1qxd39geeuqjwcekwjik1xy6pc9cfav9dcamw58vjd0qg3iakpku3c2dbsybbtk0oodqvh7tpkf596cmc90g2rmrf5xry9z56j5am53kg7oj',
                flowInterfaceName: 'ier3u86rz8r4ovod1sfmv7i5ydd4mewhcy0n0f02oozxui16pcug34za3k4abv8kldzphbytcsq5az179msgj9w28djxc8xgtz0z1fgsuestswhk175m2ybamtt0clhuvkrqjcbk1evvofhv6z9hjhvwub02gtac',
                flowInterfaceNamespace: 'oiide9ofl8eoowz21lxkksumcysyao0ftcx5buylg46c18jdlglx0i1kbgs47t01zgrxbeth58w5lavsgpgzk2691rf8987dqwsn0b81juwez70gk9ozkjlgb7fx13duamjehjq2r1wxo0k6q6tv0mjguxmw1fw8',
                status: 'DELIVERING',
                detail: 'Omnis quaerat aliquam rerum tenetur deleniti et. Unde voluptatem rerum eum quis et numquam qui. Expedita autem nihil id deserunt tempora amet possimus qui aut. Magnam voluptatem quia labore excepturi et nemo et sit. Et consectetur et consequatur ex ratione recusandae qui aut.',
                example: 'ot6d7nd041rzzlemu6oqj9e0zo3zy6m9ixb4ylpdzc6vesg03sgjecqxfp67v18mibh7tvvrudyyeypt8hm43pb24whpeuogtv9husklogg3tgnde5cm7a57g1kudfzblehhr219ymmazzyv3qox6i6hy60tt8xy',
                startTimeAt: '2020-07-17 01:35:48',
                direction: 'p9apaid5txqkre1jkigy',
                errorCategory: 'm10nv9arhylbx3q0vfk0mnrszsd8drpz6nyr3ff1827si9c3sz2lppdq83tl62f5fjva8io4yeco0lka2jf0lwx7mezx0qg921rrjoov2qg7v3hqreisygotpbck50y9z2hntnguh8j9dw7tn8n5zreiccpzyuan',
                errorCode: 'dyomkcgkm7q8kcf9qypm',
                errorLabel: 'u86qto4cdavhclvzjr4nktszlotxgq8lpd5rh5ftg53e3vxscywo6j8uujvbr2eva8o1h3x7fsmz1w8ezzi4s0y3tolschcrtw7gogmhtdhzfx1shl716ysovwzr5qzn4uwhol3mtc1e5e94t1g9kw8jjz3axmrf',
                node: -9,
                protocol: 'y238me5k88ecy2qbufps',
                qualityOfService: '6sluo7c9td696ywl4qnp',
                receiverParty: 'ljzu6uds9wawi3g7kjsx8mj3n0c6fd35saibb4efpwr6hbumc7nzi8y9gz150hds9q9fz6chygq6fkkief2wowci8fmmcg6mkvmfkwbpaiudtnnd3q8cllr8rwpb05fwuwo8nhy2a5e0jd73y1ca7powousk9rok',
                receiverComponent: '8jfw5x14zi3olw6qx9c6mtvc1z14q1tpq2jtp65azin59wvl9qv88a6pcblyzl9uh62c4dhtk0clzs307mw7ppcxainr26ajwvvy6uijoj0rdow4guszyy19w7z60frizxzb6www717blzvpz4s1roo6kx2bjpvt',
                receiverInterface: 'dqi9nw54c94s1vcr1e21vqz54nkwb9jmwdpzefw3k58p2m0bgizhd24oy2rgh8s8fqawhe1enki0xpjmqvzgdhgp3h3akusqkdtdf5xexquaa5v1zfeji6cdf9efohp3hkpu13ctn7hug7dkut41tpmqdieafbvy',
                receiverInterfaceNamespace: 'be82073hul5gqzk17u3pockok9xxzr200v9xtk5xm5w8l3dmhl0snn9ty3qhukns4eb6eyexea5yo0gexq3ycc3nflj5sxl1yza6c2swur4ed90i7wmbx2iqwzksb2vg5avpt3raogwo1iadzj2yi1s0qxkqfo4d',
                retries: 6727741116,
                size: 7613906286,
                timesFailed: 4467807099,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 's73l92pl134vtd40jn9z',
                scenario: 'vjbmp3o6mgc806cwcmv68wcp9dgs9r871s10i58u9k3ciniht97ptlked739',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 03:46:50',
                executionMonitoringStartAt: '2020-07-17 03:26:57',
                executionMonitoringEndAt: '2020-07-17 03:36:05',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'i0j7cu8cwprijgwytkt4k7fgefuzffvpsx5wnqmrm2h0fgwa6brb2qtlk3dr03hbfjsvilq09khpzk2ugofsp8xtpdmit060mzzktg13tq8ncf6k8i9bkqh9t1qz1wlstk3tbjjqrw13ckifbk739ptkucg6co4r',
                flowComponent: 'jp6mj0l2i4pc7nb28ktfxb4e5why9onrpql5mpc54c2etq5wgozxvhmx5ajqj6si8h3md8wxo30g3fr5mexh6buh5zyj242zxo8nujb81se1nga11ig6apzpj8we1t07dqfcyt4jnywqmvzzwlnhr2j6asj1jyb7',
                flowInterfaceName: 'kvz0g65uk86bxqmet6tzi2j503thrgliemq092vtiykbz8b2xafhlfi5e1wwera71uvkv69ss85avze2e3ix6buaq0594tdeg2rmcj7yppdhceti52sfrrg4swq0ei970lxjmahcc58hsttozkxy0uis38q4p52h',
                flowInterfaceNamespace: '49dp0sqqtu2o0wlc8gwvr22gigkdirwi8lrmqbzw0met4t7gx16d4f4nked5up90drdfdoke6evaoyij36p4jfdv2lzhz64anvnqianecnqnpr4nd1mk8k8rf3gz0w7g4q5cby9gov07cw90p6us22vjh5dsjn4c',
                status: 'HOLDING',
                detail: 'Incidunt velit sit fugit beatae. Animi beatae aut. Magnam sequi laboriosam labore sequi est. Sed sint dolores.',
                example: 'vfhijevl76r3er8fdzg980lze5frsqy6jmhty8lcjr0geikpyme5rgcu3y4xvdce90t8wup7h69a03535hmioayjxzq8tkgtk5bpx75p129yv9jk7b9axbxgjp8o8gdzp45wxoulb7j2bly95f6pw3kqdsze9nle',
                startTimeAt: '2020-07-17 02:32:40',
                direction: 'ze22rglq78a43smyqnjc',
                errorCategory: '0jguhp0gybz92plgo0p0osuh7o0i3wz87th1qxj5xzjlc9r920fla4fkwfb8asnxloo7usxf6vc3fz92tn470e7cld36n929ff6xe47ke8n6pbeh4eltwurqqm3gsrf4fecqgchxlv59bagvlt0oadqdu2dsxo68',
                errorCode: 'cb18uoq63yuasjp2udge',
                errorLabel: 'a3heslrili7chv2wuqgpzihza0vis5ekyol11a0nfsyebhdg8y367cs543e7ris3qtvm7s01y35y0fapv8ru1oh4ba3btw9i17wswp22z52i2hg8trynfrmbi1ati6wodbzdylxcexd5ra4bi2xedg47o6mqldqq',
                node: 7516906864,
                protocol: 'yedy8pna1bvfg4fk4mv2',
                qualityOfService: 'p441jn5u1tpyovlrrw9f',
                receiverParty: '1agl52julm7w8gnkhhgqayz6f8hydbeiemlaizypwg0f2d47vt5ksdbpwpdmiictbre84h2fv7ynreg77d6fvnp5fe3xdkg3xqbd17f6ijpwsid1ee94o8isg8u3cfd8csuizhhxk7sigmty9qwroc7uh7e3syw7',
                receiverComponent: 'b3dni91ksd4wzym3dgyga43qz3wvtwj3b6nwsx3wyv2or97kwc4hq37bbp59rbn496898gpx88s7drw2blllc487s5xfnfwnvel6hrq3lhmyxrszlvp05jhrjhkoyaynngr36vnxwk497pz2y1nbb1h9hjbtfzkv',
                receiverInterface: 'jf018zc7aesu9uwji6ja7r73a7efl54a0ewuo6ad435i7y6yvcow4qu4vmrxibt5kvwqbaolotjn7e4npw9x5z0sbsm54xtq7oemcdxurmlozxos84cilm5oqmr76qdj7d8axj3i7r8gpidfebvqv9jwxqm4929i',
                receiverInterfaceNamespace: 'dmr1lcsfhah46140wszd4sm6arr0d7i5zg9p9ghdgdv3oiclp51f814fdyytbyko8erbbhoipc4md7379vpnzxqhq0agvcc5go73z8lgp7kcwbo5rn3qh1eby7hwckhjihxo30prknmpoifjpyyiv9wwdlgcuc28',
                retries: -9,
                size: 7728041004,
                timesFailed: 6246074219,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'ym0vpyg1mnrzrc1cbwst',
                scenario: 'tysisn4w0ytycepnjvbgotmpr6du01bjn1gws6zjcdvr2lzk4abhbw8ujq5r',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:20:55',
                executionMonitoringStartAt: '2020-07-17 15:53:25',
                executionMonitoringEndAt: '2020-07-17 14:39:14',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'a8zndlnjdt23cqbpflsa2r4gzylo3h4rm0wz3nh181t5lh4u5058kqqvlp41gv0smwralph2ipaj706kxb0v5enwd7pop6zsfl61v1a3r8b1l8z11xcxrm3axwfxkc15775uai1kyv2unk6e3r4xuvjcytfy1tjw',
                flowComponent: 'cvhtftdydnmhi1fi4mugyvodrz3xy9608xjboki0bsyoo79vauqqaip9007kczc6py9vpgrgmn1cvnp18w9p8bd4q6qxdm80gbuvfisl90victnz1w6yjto20g8bj75ubm38nzsaxk544i85et1d8a03jjogwja9',
                flowInterfaceName: 'iffcjdw4vfdh151hp3y0u18iy7tyobz3kkeg57h17rmctushrfou0pkpc1svprsii0mypx1w7b9bcp2a6luc6qoj3slnhjj12fc4xjd9os9sdty8aasq785lmu3xaewwiul2gs9e4stjkl7pgo9vg3hsusb3drev',
                flowInterfaceNamespace: '6zc6em79p0v3m1wp1bnbt4903wj3fvq9qgkc0ug9vrkalxf6bg6nan8yaumctawsx17gblqrxz1gmnf9rv3o1rif6ydnxejyoor78d78jxzj9qbjx2svoemofh5lce0k5tqk6ph131nqqcrf2yis9x29qh7l2h3n',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptatibus iste quidem. Enim alias laudantium aliquam. Ex laudantium accusamus. Eligendi esse molestiae sed qui nesciunt eum ipsam.',
                example: 'mz1ix99jsae2xwiflkwxhodzdcygnjbwm95hhzt8gewopaonbxfvm46kj0pyr829x2ganieb5ifnpf8d7g2szqtj11poswg25t6fav1hrl23sqmz2yydtvp6vxngh7l3xn4jz9zpoqp1zjd5hcmrdz42ut7vz412',
                startTimeAt: '2020-07-17 03:16:03',
                direction: 'tdk4zkm42d8tqhcojfmw',
                errorCategory: '3g4asj1rgoo5p5q1gyxd4zdi9jfvyy0ojqtex8ca2dinxetvvlfobb5uzi72b18ndr26lniralicvvrrwawdi8m2jc1izyoc9m5txean2fsljwrp67j7ylsw0b7ohgpgjgpci879jxpb6mqpzrkaoqwmtex3au5g',
                errorCode: '984yogizu2n4rtt01fmr',
                errorLabel: '91jfek21w5cp22e41hh9tjizad5ki6wxxo6czxce5xc57kw6rjrxo2rnhwknlqorr5gfugfn01yg2kdqseowo2fadc2wyljq8lxrel6fj5w5mtg5xtc7jemyw2i0akzwrjcv2sk11r3ug9a7g18a97mftadit1bo',
                node: 7939141062,
                protocol: '8gdorzz75ky0sbk7jdxd',
                qualityOfService: 'v3sfrj5ztgw7k0pl3yzn',
                receiverParty: '19jwjl74byw7889vzwnp7wohrr9pcjigq27ligz873vkkkbh05dkazvg41rapjghu09djvnbpiqu759e2v6qw04ubl9yck1rbarhhq4r6arskyk6cv84kjw4qk0bz0ukjfqh0cgzrfdh7947r9oyunnfmfa6f7a9',
                receiverComponent: 'f0e6ugklccd9h3vbcih0n3ui3w3b27ouzkm2lw6a2lbi5o76l27sgqxu4y73ieq11vakm7b7yzd4nd30mjcx4hcfgngofvqal2s4pmgc703htcedbfcsv2gpolc15v6mbfxucxv3jmjxniquv0xqp4vuiv2m4x51',
                receiverInterface: 'we79n3kav214e63i95r5zpsmwnxymimedn6kg1r4hxlldgcnomwit24qkl07pdr5yyvs2e31mf21p45wuemab4gf6yacby0po9idmjnem97e2a1nfuc8sd6rle29pz18qrf6vz0wobpp4xi614ow62rrmhfjm4qt',
                receiverInterfaceNamespace: 'a9d92hzyvq626p9uigmp8fdbgsydm6l48ullklzua6zawylog50c8tpkkbhrvwt8o8f9loheh1z8ok76bkd3pcqegq07necusbunc2x9nx5emmpkyeqnvczaslae3m99g7yw9zkjgq4xgzr9t305dbifcav9zac4',
                retries: 6213255454,
                size: -9,
                timesFailed: 2044793688,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'x90v8r1ih91fnwhzx494',
                scenario: 'norb5shwn673alam9m66db9xzay4bim1123vdmkcwfqt5ubjs1n4fx2mbll0',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:58:16',
                executionMonitoringStartAt: '2020-07-17 05:35:17',
                executionMonitoringEndAt: '2020-07-17 15:50:05',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'h9hounewy2m7p9kycwfd0x042udq802s66iusumbawuqiyl1edzq75mfnxxvx0ms4h0iw5rhz73n4akgdu96aqh7bkhm8eece2lij3tkpwku0wgo48n6av8duem7vexuzojautwk6a68q82ck8mg9n8ura0q0j2v',
                flowComponent: '3mvjt5hs3vq4dh293f49awdhpk8izecsehyw69eh1cvcxi7h0tatfokhm407q9b3z6sh7wtf67ftobvmd3tque8d7zodnty3eckp0bj9pau2bynoi5fy4h3p9sigbix2k2lfildebshpwaxndgw17fhjs2c0rzg6',
                flowInterfaceName: '0xnhorv7l418z7u8niat2hyehhjcm84ae8xmpeij9dvbjfzc5aloged3xvv1bk8164ik66marhhip11j8ewekxqz2gy1qmg84rp5kq2clbig3bayqc6m4p7z0r3gdwlggi237qjq8kw0cv6abs7sx7xf9bew0gt9',
                flowInterfaceNamespace: 'rqns9h2j43peqghxgbd1txkmvglfqinh5ke2t204tzergwnr7oifsc3hq31t2resm4mlmwokg6js1o24tx932tvd6uwzoviyuozzs0upxnap6ufmkm6yy4miucvsx5ch12176ocd8gzt9rej9577loqv0zp5ec8e',
                status: 'HOLDING',
                detail: 'Eligendi omnis sit molestiae architecto consequatur perspiciatis et consequatur similique. Rerum impedit assumenda qui dolor voluptatem et. Similique consequatur repellat eum accusantium ut omnis.',
                example: '9jwktc1di9wlme86hiabflcf8v1see4t7qvwqmpphc56mmvo9sbhsha4z3fkyj4sh6pvqxf8aginr4anruxkhkd5oafpuyio1u3vrdm7jg8pkhmtw2946jg0qxazre2ct76ppn8pi6yot3u14vzp8ppogj4bgzej',
                startTimeAt: '2020-07-17 12:26:35',
                direction: '1z3lzjza04rimpnhur9i',
                errorCategory: 'w1laxlnf1o30rf49merd4kjs5bn8ars1evg4jxw9sv14tvsk0tlx33k0egat325w527nacfegczl81m1t8yh1g70zthci67soivbbi411t3sl7bn3yjgiiu5k3yn84beojcgxqetiq3wgb8suqz33jfen2vwruc6',
                errorCode: '26yll62ii3a0pkoplb6v',
                errorLabel: 'l67o4qsr0mk6rqc0kwl7j19peihy2f4edq8ajxxlu6w3c6254ohrxhmn386fgevdvrrjdbgyg68orn6390w2nojw4u5u2v57fey5116o2as5vzh03ksj300cql615mq79u4y12cl2zq9na3kzgtj988jh685bahe',
                node: 4699807393,
                protocol: 'nywvse066ccypwbjrrpz',
                qualityOfService: 'jxzqqkelvzej02o1bd2l',
                receiverParty: '7nedv7mfp2le5r8lzv80uzw3jg4581anonoacttesd2edqsekvyarrkv098tjnvybt7u9daigtsum5e9cnpyxtd6i7xftee3ujmg91gkcp9lwbeh24phpzulu55nhvgw5h925cc2f539162fv01bz6r7idyhz1dy',
                receiverComponent: 'vfytp7lhcblqzhaf2h0vvlrzqx66cho46g557zadrf95ynv7tra8lfqviympnhu2fiqe4ssdadfwvokmxmaw8rmj4ibjxv0xk3dgyk3g09z4f8myo03g8haq680816jfgcufgqo0wci8jsfw13sbw56zm63zr38n',
                receiverInterface: 'aamglo3soshtkrelhns6ehq4daryy0emhfjojgzzggzeyc3e6ilqcerucendoxtw4v4myadsrxxm4zrlqbi7n4p2eacimtiu1evix1fwm6jh4fcjv4utcf3z565w0kfc9wnuupahg24hybjgxp8uvnmcgnoxmfi8',
                receiverInterfaceNamespace: 'bwacp2d2917g937yb78yayz5e5ch15nh6rj7ff7yokfefoma8hdb775srxzv0aq19osguqb00mghvqdj6qkdqkp4ir7pvb3fmkrpq645m3c0cq66zyflgw4qhf9q3j1jkdaxqo11ddnnypxkgw3hpyc2287co7jo',
                retries: 1323119061,
                size: 3496185108,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '1h911jq52xyof2rvmymo',
                scenario: '15tpdmyw9ey7fj9tte1fgcbdrt4zhk3iq6y971as3ucbbsqp7vs9syaaxyzm',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 05:47:35',
                executionMonitoringStartAt: '2020-07-17 13:29:26',
                executionMonitoringEndAt: '2020-07-16 19:53:36',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'utjsixtmx612kmlowirk0wwhxaqgxc85a2olh0taib80qm48dupym5hvpmz5gievo92jcm51q6lxu4fmbtd7nqor26aryu5p524z3nzsoo3yxmn3bphda3fa5hiqwg208rqbu7gbr3bf3tt8py4ama6z1f1vb9jz',
                flowComponent: '8d4hw7k8rhrwex5glovg2qorv0n7ikma4n4lmjalobv0g3zf39bqjuy23qfgjfmzzfydznojr2c5l8cnpnzh6jbnd8czpi2nggag9r5hgw4rhqxhjch4iomkwykr9ptohs7z0qvs0mu62z75l18zk3j1my7l205z',
                flowInterfaceName: 'rkyn80qgy7luctioo7b24hrx8s91q613e4z6g0vuc4eqgi8yl81dcizk3xl14v5ksfysyfi9r2hw52haepg9sdfetovyhn4qwi4ixpvp46ewhrh292h8umiuioblxwrt4fhuuhn9xemf09ma19k8dplk656xcktb',
                flowInterfaceNamespace: 'elxi935ecuxhgybxfykm31p61q28l9eisu70a7vx3431e0juymtqc1ytoplujr6yizq8cxsrg8u44llwd0i4e4zkjupfb23vtzgfb4m445llx507pvwzrnfzlze14le4ktt5ckxftfvph2zq0pg8h8v51vy8w2ll',
                status: 'SUCCESS',
                detail: 'Nesciunt voluptatem officiis molestiae. Earum repellat corporis nemo praesentium. Amet fuga animi voluptates. Et expedita pariatur aspernatur quibusdam. Veniam et possimus. Autem quae vel.',
                example: 'glmy3o7pu56qer0j9d74hs7m45bl6tkjx1ro3vbo2y4vxveea3psvzwrm0fujioxe7anzen0c6j36by6pgw56m0xma5eijz4vicbogx8qc9aci20sh146ug634y7hps8y8kmxf5pqvwzjx1ds9qf5ls51zirx0ly',
                startTimeAt: '2020-07-17 02:11:23',
                direction: 'c52wdlbmut2kzrhhmi57',
                errorCategory: '66m4rsmpubna55b0y8yjq40txbq5ehmoagfvld9kgnpybwovjjje4m350hnc3t7l4ufwij56gg72ljs7giwtbrupltodanl1cfy6m1zqrp0onxv17samdjat5h5y9pf2wd5j2r35zznkc6k6s2c8kypl0yetg02f',
                errorCode: 'qxo8pc6h2fvs59g81n5v',
                errorLabel: 'a7429hgu7xu1if008am2z6n4liqcyozyov5r06p8boz175p2q92wgoha0ywdsiwel5oe5mm4uhok2gaps92x99s8vhrp628czg3inkjwin9k54aut4565p3xd15wj751k7uj0gv20w3anvwqqnyxnh76lztex0m7',
                node: 4395968488,
                protocol: 'c41accotu5srsu3rhjlq',
                qualityOfService: '3ue1wnjq16y5z7ik2ata',
                receiverParty: '5lp99b7y2mltumi7cebr9sjo1xq88q1m1niozvcu5uglnja6rs67cqezlnz3bk201w6jglbhknj81kmmmguccqsbvl101ttrlmsnn7wa3d986bo0b7k9ph5ywd6lfjb8px3xjj707ffv1h3g152x2ylue6mszupt',
                receiverComponent: 'rm0v3u3rg9qo65dnp3ykfvg9sf0jc7u3lath9y6g9uzyu5sh9d2tafygh331ws0p2b4nq4sq1usadp8bxtoc9eowrzgji0if3kbkmzpdeyxh3774vqh3doqhs7ivdkn3y8cjb0iep1nabdyv24jzu6hc0r6cgqo1',
                receiverInterface: 'j07jk6nr5mom8txv1ksibv2fsv6f7paquvz9sipt5k743iubwfskh6rn1fisqxxdtnv3xokykb2l06x2augy00encuyf1kis1on2sy9kccroykweo737jnwo9w1hskkf229lginscvzpeot1k17n4ixdigqmbf3c',
                receiverInterfaceNamespace: 'bcxroxz5g2ujzhgxu5am0gm5nhnr0ynj6c495v55ukgjk95pef4mfvyuamc5kzxfvqi4e9pbdglgl2hq1sakml8mjd1q3ssfzdw34drdl4325ilv9sx39j76pk06br7ieah7iu2ryn3exx2whwml9pabonrk1oge',
                retries: 2898437896,
                size: 9305262513,
                timesFailed: 3248970994,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'cy36yxqeip9ckwxqyjaz',
                scenario: '6ec0iwdzlmky3a4zm0di4n1dz3hxqtkeui1bjkcqxz0x1kfmz3u4emwf7sx1',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 12:58:34',
                executionMonitoringStartAt: '2020-07-17 13:46:12',
                executionMonitoringEndAt: '2020-07-17 00:17:32',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'f7m9ge9h3jk69ircrmovl5kbycnzsbg1pkt5f091zwjuh70fpx6hpongn7c79wwd0fycq0coculh875n2qcvih2up3r8d0gnqvgmb0u3wqfg001uhsu6zl9pplldmuouuzbri98kxafsr2gp3jwst2edcupr1ro6',
                flowComponent: 'uwugspcxcs4pmrnsnbqznwkcvjtunjlvckzi4ase2lorgoclsj54ftebrk9ukrgcpr0bbyhu7qfaohdqwyo1vwl0jic80q7af3jt68bogy4atewbxsmlhn1x50u30mu81k39ay9by5z8gllyf6fbo7a9r0qzh183',
                flowInterfaceName: 'k6ffw48e6h15rb9i6yzg1r15gmw8m971osdva1ptuj0pp01xnxskgvimiph84z0g2frkjah3c1h4ga89nl426d39le2u5llz0blaltfx5y1gyuh6c96nxfuw9djhfqw0xov06ztq069m7ouzgcmmo31qregktw1l',
                flowInterfaceNamespace: 'ydcrjeu0ntu1k33q2m4g7x2cpk69b2vq7e7lplfwet6o3x3pw9kj1b34soleuki6e0d0didu5bm2pouxh5zpnylbyo15547v9v7dazykttowgwjmbrymd9x9kahobhuuah6q6mrzjlen8kttzln8plweivioc0s6',
                status: 'XXXX',
                detail: 'Qui odio est repellat qui quis. Nesciunt placeat esse earum iste sunt et. Error officiis aperiam facere aut est velit ut consectetur.',
                example: 'isvy25bgdvtyoap9xkcpff6quglxmfa11nq4r6d1myrp9oh2wt9bzzjbwy2b4j34tm14qsuxfs5xsq30tu703179dvs7sgcd0573am1kspk68xu4hwgxpo77arsd23afopinypyqpqa92djph6go54nz3619q5mk',
                startTimeAt: '2020-07-17 02:48:15',
                direction: 'u0d83n74w29bxy29qkwb',
                errorCategory: '35mx6d1u2a1r8w6pb3goqvdz7dcce0zv2ueq4d07n8fm43nt7dwfrnjfy9j5lpaipk92g64r7g4tuu6jbv1p3egr85yj6tm08qveqmrrkfrz25kmzts7qqi11t4mbxb6bvfhh4o8h2sxmmuk609odv02vi8wdasb',
                errorCode: 'ql5topmsc2lkfuwnguz1',
                errorLabel: 'wfk4o4qb6ts910bapch2enj3xv61layq2bytt2kl79rp0c7wptb09uy530lqtehwriwjmdvagy1nypxd9ctyew004no9xwphixowt11gdmj8db1b61c7ua5c8lyr6jw1jcbt9eaar05hw63u7fb64pru26vx09sy',
                node: 7846812487,
                protocol: 'hq1gxqui69235qlkj1nj',
                qualityOfService: 'xku5vy82rub7qqe217u2',
                receiverParty: 'vlg1o6zwq6wrt9iddp21jdt1apm7r9dlbf13501kl3y1th33uk421p4r0n6vtl2we0ycz0idkouybipwga1z7kkhz4sis10u3uozk2sho3h4hu6gh9wkqmf6fof5jkl4gv0wsxzg7799oo6gkzpqhghs40wbl1vk',
                receiverComponent: '9ax4pdzbc7e42ryub6y2fdjga9n5pq15heoiumyze70870c2zmax9rx6i1lf0qzb5z2f2ycx290ky8ae5y8eflq0d43sm8pa4euoc66swqx6e0ucd6sch6or6bkt6vtquc4w471wg405wb4b3gxdo65do29wlbn2',
                receiverInterface: 'zdjvptys39x9h2rljddjzcqb6sjg72yi1j15ofsz74myccnjcrbmbct1orl7obl505h9ntwh5gkfmrorc3aegrr89xfsrito7ikwo02asfsk9jfantns4eu2td0cz3gxjuuxb8rsxaq42u60g1x6gb8g9bt6uyje',
                receiverInterfaceNamespace: 'h6tngkvwzfzq3zq3kir6m5sotgrvp8419rfkhce820aefpk9ra13ezke3s6yfhvyqx8ef6azvr3f8alirzpag2h1tlj7wq2nfqmh19rjubxtkzbp0l5nlv7imkeu1uvuo8y7wldn4wuk5r2dmkm76s94qwbo8thm',
                retries: 3741639591,
                size: 8672729610,
                timesFailed: 7995136005,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'w50syxc0wh4e0ildutkw',
                scenario: '30ej8u8e2vz50l7tacoh4np1jmsnct0ttjb089vwddtsz5iv9tzqaeq9isbq',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-17 15:05:33',
                executionMonitoringEndAt: '2020-07-16 18:21:47',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '64t4x6lpywptcj0luk6i1w0b2miivg8zxvoc2ubsynwnqiiw8owcuptlu8dzai742581rbz8aec552601hj19xog0s8th3ew7c4nre03linkhd3pnsktd0mcac2r3y46dbs0u6jo4fyqc4uyiy7dct9z1z7ujsfj',
                flowComponent: 't27zt0s1m3e3eyvgi96kw3zbbt6emy435cb56lzipuw3fuqifvevj82387xkvw0qjv6xpwsvpitlofpurort40yibt85xp4024uhxpowtuslj1wjvgolqmpkaweewrit9mki02wki7dx2b9swvdtrjk96alxa303',
                flowInterfaceName: 'vymdxklcvy12ledzzlodwvphr2ginwploaffftf192tu01vmh8svt6zrbnebi3esyrgb9cnxy7aq35equ012eprow0jl7o79t3o4zts6yrdp447ve22hwsjneul69ugfentbo00nennxazr4ifntvi1yjhcrxh8p',
                flowInterfaceNamespace: 'oq8utkjigqcinyzkofq0syak0xn6x2ltfous18keli0bet7ttdccfopftj4kt0jrjv6e08xnu7bcu2jc6jy0g9dcqffha5qyxijmtshaz7z81didoq6vlyuepnsnyvx3tdr7khl8fccytgo012170e98kmdi6aar',
                status: 'HOLDING',
                detail: 'Quia et doloribus cupiditate deleniti ea aut nesciunt deleniti. Fugit et mollitia ut asperiores distinctio velit autem quia. Amet soluta suscipit magnam deleniti.',
                example: 'frioeynp0pu5oiy9rx0k90wxdt2be47lw8ix9wn7i63ivh1ml1chbx5a3nm1uj1vbogvb3jpsgzlbnhlja17g1w1f42aco5zekkel8h9g6gls594n7xxwtyp5fz1ve9ke6ojvnl3o1yn9n3hqib1fh858d4wpa32',
                startTimeAt: '2020-07-17 05:01:47',
                direction: 'o2x073yygceogt3ru5s1',
                errorCategory: '9vptwfgeh8dkes7p1g3au8ipuxjymbakvvogs6g6fn1qycjvz4599vgl5qqbqxoydz0ro3sk08avmfsyreraczkcm1lxtiicxvn1airj1k2bhnd21ouvsp9fhg77lgmlg9sgcvfqbjnfp0w68q00tvspt68oj77u',
                errorCode: 'mxskgwubsp7tpwa4ohpf',
                errorLabel: 'jrxe1ifdehbk4pfwuvs0fihj5xgtb90cpw8t2wljcdd5m6w9garww1y6bnc0zutwefmpjfhusvn96q0v8qt941moz26mvqqbmvxkmnz8kwsmhjm9e5eg3w736yslbnxmcdq2rjltdy5fq7ybmelloge4p1ap7azp',
                node: 9121598676,
                protocol: 'pzkkru5hg9onmvwudo8v',
                qualityOfService: 'lhnkdor8dmarz80bi93m',
                receiverParty: 'js0hbn8qii4wq6dy3irraaubgik35bk2wtic06xcru5d54ebn0h5hu1hn4k044yp0vosx4chped52h2or8nuzpbstt5np7dubh5dfmgwdm05q0fnqcsfrx6y6rr9vesoy1ap7d8u1gq3zz72nos7kndfhb4nhwa7',
                receiverComponent: 'mgfd38usu3dk1mf67yjj7ipi6swscdk9ed9ehc2vgazuk5nqea8x8goqfnid3card1gg0lnu1gunedxldgepxfg2448enlqorxn6bklnhx7wiljdn0g52gc71th527pjua1p2pdn9psk2qo8ti40451eqgleeac2',
                receiverInterface: 'mjuqsnqud8ad2hffzbimnngzy3yah50x9mbkl8r9co00cvup30q8qgfw4deufjpzg5q6wspane9bgu6fvoqzjrrqmekmaggusxjiu2yckgc4jr9wvz5y8ci9bg4wnvg1e83duc2gh9s6nme7v0l2pfsdo4tmkdan',
                receiverInterfaceNamespace: '15psgryr77x8rllfng13vygo4go6n50kobzjl5ksypznuix8fz7zw95ww5f0ls42x8hzle9dzqtrl5o0qb7j3r48f1ivz4g7pp3thwm77opouhgssrnw9qnne6jivhui8oxqgf8qbapz3i1usr9e2kk5oafcmsxt',
                retries: 6314751643,
                size: 9638432347,
                timesFailed: 5658414374,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 't7o4ydi9bekopm3ypnpr',
                scenario: '8f6a9husnf1bq7jo647rrjn0qobswbbivzwvz01pf8tb4yfyjqsx45su4xmd',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:00:26',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 05:29:11',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'czx283zfo1j02ovc37wf1y42knzjnam4tlgsceowlubl0uxt90q0mskrbpg8nvju4cx2phwj8hlw0utbepmo6x408qf1ld1jh8yp8bs5i02k5rigrg2riczkoy6hxhc9zgt6xf2gndsep2pju2a8iuzg1k0sbm5k',
                flowComponent: 't1b5wfknc4klsg805xu82037wm8sb2e4e0p53magqg06ja1not6vmrcww9mnr53y5x6iu0get9yeg91hkef2wu9p1c9vcuyvs7wt3fgpk8i3xe074doinnzh90lf12vxxvylrhn4f6d7x1hki7b0r8k50gguw9is',
                flowInterfaceName: 'xreft7o2tozwq6kmetpj1niewf2n1vk1cz8te74x21ib8v23k06pgaqhigbdsszvrim881916o8yfhmgpd7m5sjc088rumu9l8erbrqfp3z5kt54tgk4u9jm1frq3dzc99j4sil25ie5k2xlueoq4zg7si25c3fl',
                flowInterfaceNamespace: 'nihfry06avi8dzxcjqe6h4qvuq9q6y33yp8288vh8ru6kidg87c4kcwrpnv69f64o2yitknhuh0auix3m265mcyq9ouorm75unog66btilwr8aphzz3buvpxtxesibrmmql30kolkdez7pp15672qqrusuwruh6h',
                status: 'SUCCESS',
                detail: 'Et fugit sunt repellat dolorum sint dicta placeat et maxime. Et ratione neque nulla vel. Iusto iusto et eaque sunt aliquid cupiditate at ut ex. Ut amet quod non nisi omnis.',
                example: 'qme6ubly14zic0yidatexsd40qk4dvajd5imd3omqzu7ig4hs0kqr2xpixy3cwb84g2fk7at3mdxrpgkka2xn1scttrof8mrtexqfselyv2m8v0fad8i8b8l4d60xfnffhequchwinb2vxh8b7993nn848veabpn',
                startTimeAt: '2020-07-17 00:38:49',
                direction: 'flbmc7dqrp64jdjs0uov',
                errorCategory: '8fzr4j015iw3hl2u26x9vld0jp98ye6x4cp30ci8ge6i2a67dnzeh5hhb9kdqkcj5pyeu6dxq1laxig16fem4xfpfkwr7b9wmh7ihp8vv6z1x03s2jy7wuocaboo7hz626fwef2zdn448s6cr1sm2xh62zdujzyj',
                errorCode: 'fmg7qi7y0pxtx4q6xrfo',
                errorLabel: 've1jobwf5kkvo40vls9hc42ef0sithmkfwvknmvzm1begps2ls7e5zqsppagbyxgwwo9w63edije7flfixg1y5cgdyoc8gywtp7jnt8rhh51z1jwke36i4haan4u2g7dvr9jz00mpaxj4jy49m946e8flw9deb4g',
                node: 2976589525,
                protocol: 'l64bit53p78kfk79ec3s',
                qualityOfService: 'w4yvgo904d1wblz4gr9m',
                receiverParty: 'h1w4tz7sokqq0ppc4bg0twed6859wz8qex10h2in7ea0okfxz4or15q7p7jpcvidakwquethbtsg0jnw22jk66564ob8yy3k16z80knxmm5po7naqqp9x5ua3rypun9lxc5znlwx6z7ofefrev5qwqinkd7vayik',
                receiverComponent: '4fbldxkf7y6wdmabilfsivmp4xlnf2yod45uukgkyehoexnvh52rk6q7wgzu5dot2cxvhozxwiy4ppxzovaa23455fakdy8jlv5112hhv0rikl1q0soqtmrzbrf4j17lgvp7puk6jdvtvjkqlvwooflfi62g172x',
                receiverInterface: 'sb3bsrbja3bmiauvkjnpjtc5d7se5fb7nyjknkxe6sl5s3mikp27dx4p758nq9cxbsiibju4m76jedst78cix8skz6bl4u2g5tiwk51e49jmhpyugod3nz7750wc5jr128v8w0pl5995as9j8gjr4c67vs54axs1',
                receiverInterfaceNamespace: '9lzuw79w7d8kvnul51jvwq1t2mv8jm9mdloi5ccuh971d8i1o5q0w67yljmahvsl21tb6vgqoxp55vy46v5sn5jml6whw61tzw34ttu6pxh68g1uo0ugqia499jp0ctnpddobxn44zaeu1rfvnwtgxjzxzmgr6il',
                retries: 4113317407,
                size: 3898113106,
                timesFailed: 5194243719,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'nujreg2lt7a70kz2rhb5',
                scenario: 'jwwirdc7s41vc45c6jg0hc27buvtmfj87mt9tg977jjqs0krcgm48wr0sq9z',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 11:26:01',
                executionMonitoringStartAt: '2020-07-17 10:32:05',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'yqcuklc4zsznoiv92d9boly7894xk9krncnsxx6t30q86ugukatelczwqxffhih9q8gqk54dquybswzcxl46t9a76f4f4lcm1cvfducpk6bkucqt791xpg69upnz4a97c60vsj8phip4fpmmm75ey0oq6icbd17n',
                flowComponent: 'x23b8iczsiq8pum9yk8xbxo1xbywjfen56ujljo90l3us8np9g3c6d3xirkmxgqsx3ca9fh2bkob9j30rrki5pnp0xw9xofmagy1esamdigo27buk503luyeknq5wog70syrew24p6sf5tnu6ffsmfktw7o6goui',
                flowInterfaceName: '5h4po505dmxjg5sfool96hd79gr3wy7ukdmrw98p7zo7dsbzqj7dp1lmef4ev9l72tiyvovnbf5dts5jj4m198kvf7avu0jjmkwfl7bh0md29c8i52dphwyda6ckw6gpl04qim3s71cb4bkqbchg9vvvjcohb93j',
                flowInterfaceNamespace: '89vfuqgc6nz0hf7xxy91o4ck9twe49lsn97xfpnslgt0shy5lsttm5vndsaezld0cfym9fmm6q8mm7bokftbder8yoq4396j5sv4ezjj8ivrfj3jef2j2wsvq00gi99lpm0bt8y6dzqxl4yht7zmfzhb76wx6awz',
                status: 'HOLDING',
                detail: 'Error veritatis aut consequatur rerum animi odio repellat ullam at. Eveniet nam et modi. Animi numquam omnis dignissimos natus molestiae dolorem.',
                example: 't4a6sup673g1gzpnysqh73kor7ceqr9cftnavjdjn9f45go6lq77wa2nty1z534vdz3fg3cfqdbaocwbs3sq3eh0co9tz9s0toka4bntpd76i7kqo1gczlpg5nd5lpq4qvkk2qpsgwmn06yqni0d19whife8qrt0',
                startTimeAt: '2020-07-17 14:31:20',
                direction: 'lzfufeqoytudv7l6jmt2',
                errorCategory: 'mq7g4flvi81bx83xtzb0qkbn0tafhtj13qbnzuq7dcp4h89i6suppwyqklf8y8h990mna8hz947vfrq8l8ac41nszyo285uvnlxywczlge9nq110t6063frioyqlleon5sv4zqy4b4se4qglxf58ccuhgf77758n',
                errorCode: 'rz0bofzucv2xg2r3s6as',
                errorLabel: 'mmcx5us5invcdywtcakaox2mvzedyyd7z5cbw9zvohvmmseb8qcybcaxmgwk4l7k91ufdzkixq1psct6ezw6rtw44lli91nesd4brel444gjqeltn2bg1adhriyf7xgiziuyqufq6ml4q88yisx550ymnikh9tgi',
                node: 4817830546,
                protocol: 't5opmr2wtvkby4sl5c6z',
                qualityOfService: 'cta13qt4hh7wv1x9vd62',
                receiverParty: '6y0nie83tfdpean2ynsnkp0kcyqu70s3nulz9z2d7q8m52fftnanquudmbzwlu1p11h7h9s7mmfw56uth155o6b8rsjkvzr87711lu54yhqtxj22ltir6at2r5rwppsxpwzp7slaj9b9kkhohsgreynw3ufxk80s',
                receiverComponent: '8cvu7gvrbcs5ke050bmxplja903lkaxyw7jyjs79xhx0tryvtxgqfwlk3t4cb2y0igxr6yiyiaegf5hh80cb8avg9qc5krrgq3ov46wyui0s57irbbnqna2q9lqs555qxzvp9hysizki4qv5wtfqxwcb8fwe67vv',
                receiverInterface: '9llvqc2us8477qc45b0q9x3dn2x3q8d1nvx2bazxkcaeayae1wi6wv7m7t7qgrwac4f5t4j7j40unxxrkhc5h35geta6fos8djfefz6jzhyspoyssmbf9wnphnlm6aar0n8pedtene6gj5bj1uvl3z92j6rgxgof',
                receiverInterfaceNamespace: 'tk5d42cs8se4iq1r7mf61cdls8eig0g3g3mz9jckrayfhi2jrucq4zcf0t410lpv1exammhzofvdnbj2lxqe7ln4pzpfdee2y4tps3e6z7yqxwjaf7rj3hs29cibcineyv0sq0z17n2uwlrb3sigp67xrnoy8ga2',
                retries: 4954888668,
                size: 9097461320,
                timesFailed: 4488232090,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'zrvngqin85td3276y3i1',
                scenario: '75ntt54nw046srwqonb0l9dha75nggsz7cb7keowk9un0rvtc8wrgtw59p7m',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:33:11',
                executionMonitoringStartAt: '2020-07-17 04:09:53',
                executionMonitoringEndAt: '2020-07-17 01:00:03',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'xf8kld1v26krgoh0x6pn504hzte7tbhjus99b7adnb2effrtjyicx3c1yfqwbf53kin4erjgggimapv5szkb0ao4ejsr0poyvm8jyxmx0mxpqta7qy4w5xogkery6cqgpmdmbtbit882m2tw88ykxg3bo461it1z',
                flowComponent: 'po2omsqnvaeoh5l1ezc0pivz5knw17ujle1v50vaokg3masewuyyeuizt8fsmfo78fe65m5ahtpxws5kxmagfsyczco6741mx0oj8cbc7sckc83k7nauq0tqk40zv9udtt31gel5bpi3evj6o7qo1mvn5b5xqykv',
                flowInterfaceName: '40lbtypjb3jxfrmk9cdwwepx5t298gi6rx80ggfzb3itucg4xgaf5gpwkemw0855rc0et2rhx0lsi82xbz33ap4z5ejcpq6uze3hxhg8fbhpcpetkd4kkxhnx2c3gd69ak0nlhu83zw7lh99i6qstvgefoshu0p4',
                flowInterfaceNamespace: 'au3v89aatpouvydispy2ld98cl1d9tawokbd6si9rk7uopf64cxuaxrrsx68lcpqj0h6hiz6fz37j96uv3q2kwyw7yl9a52giy9jrlhn5yiwrordeak1zk93fal1z1qpztn1jolymmycr729294ptgll350jdsny',
                status: 'SUCCESS',
                detail: 'Quia eaque laudantium corporis atque est ea illo eum. Est nostrum in. Cum ut deleniti velit delectus. Animi est porro reprehenderit labore aperiam rerum commodi commodi soluta. Voluptas minus soluta ut dolorem aut rem consequuntur assumenda.',
                example: 'zw9w5a1fcdoziq9yahg1a43ja20thrl7plhaqnl7xmgr9qu5t16rndg21tdkdo7ih26v27wcjebfflzmgc4u9jl22zj11llfb4vbls19yntsnh232tuetchka6jozjqwskb7xtwtkg680mc03o68lv6ilhsqwsnf',
                startTimeAt: 'XXXXXXXX',
                direction: '5fyicg8v5vm7d4gporkb',
                errorCategory: 'qu3zlpmt6ghhia03s989lypqp44h2yiipq9is2cjipzl4z7ct3ifiqy917z83v8ogf9c27ik26kztyl6te3qown0100plnq2iiakppl4wlrspmd2cxpsmgb2kttqr9r2fqd2hxmf0y7hbj0pb209t57l4rigspol',
                errorCode: 'ttmofi2nbjkqufzdek8m',
                errorLabel: 'ijmcylprev4bwu1xlav72kjtfn6gkx021avnxaxyrtf8xn7jimm1a1xd6uslsda8li6qiib5ezyegg4cvhpvrvo4so4b2nlwfcjh3c7a85ime0hf0q1wv85piqzniwgws0r2dl18374k1yhigdrc36lbnhp3szg9',
                node: 3925736929,
                protocol: 'q2ykk1dzamvqj0ghldrt',
                qualityOfService: '5n1u2scs04ulciymk5os',
                receiverParty: 'hi5hffo43fhn6l4b2pa2f3alc2axbjxqr8yyeiuf5pdh4dnu710sr1kpiuwcc03x6m4vglwv8caf9legthaul7xe5rfcawbd2kdsk0klaq1uqxtpknjts8f2mv5agq343s8bhkk0cy1hpf8xq1qvxfe9mi9atw0q',
                receiverComponent: 'v4tzxk1j2s94iyhoutml3vq5g1fvucsuapjt8sygifkd51jdzvd8hw4a2br3ju3907dz6ih0iv325186hbm636vs2fybp4yeuons924a5g5o3yozalrkpan3wcvgsyqia5u6bgs0y63e8oy1x7qbrprc7zkl8ujo',
                receiverInterface: '31ugq6uz80a970hqcb0vxodn1q793otr3wd7aucibyk7zimj60oy3apu8nvc8rw422yko54ppynyxnol6ui480apzeuq8yweclcufzwk5jvg6s4n376ofpeg8syj34j3l1qfjrkq7e2hipsyrph74jbpqvpnz110',
                receiverInterfaceNamespace: 'qz239pbvvjkfe5wqqit5242fxqryytjoti5q79nwowfr7jchow120juyddk8dqny0j6ixvam7ta2lc9k3j4e5qhvnlbhk1jo20egid1500r5xa05vvplldk8g6k3h1pi8gs1my2i24r4cjfjnfvly9nt43vo1ln7',
                retries: 9940521586,
                size: 9725785255,
                timesFailed: 3484563741,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: '6jhohajxzpa5vrjdcdrk',
                scenario: 'r42c659jt2icchsp5kpujxbafynwcbvudxa985tjchqggrk4kdwxngztbh84',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:31:47',
                executionMonitoringStartAt: '2020-07-16 18:01:45',
                executionMonitoringEndAt: '2020-07-17 08:50:02',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: 'b78igos40docdhyxfw352g2ffpkdk8j1a92f7cqwvpp0ujpf3x89dzjyycm4mrbuucd4zrzsy9m8dl0cd3rbvyhhp3stbd7ymxjjq3ca9f2hdr8g04ddlmqgynrlqlztml3e5xf52r3sv2y7s7wze00gvpogcrkj',
                flowComponent: 'gmwtfjxm95ztl58esdxz2sc2dteewis27hob44j15pinr9aka1y4iwmxm15vutmyo09jnizegj3qfhxpp23ud8ngz2hv4d8ttonr9wmtm2nsc24qhhdn0seasave0jzvv1802h5qvt0m8w1sb8xdntzjkebf0qa2',
                flowInterfaceName: '81y5arp77nbg1bvvaja8jtz4n9nyzs89ajp7mbmf3l2anpzclk6j2ui4bz9vl3ddbb7323six7nzaxkcb5rrzjyuluknb3tcay3usyboluqcqtsieedk0yqpkmef9wsj9afj8z5xr52vug6m57m6kbgmsdpbkxz3',
                flowInterfaceNamespace: 'jctpcab9wsik08uxtw5on5r0qjkjt1qej0r7r9rii0op9aikylv9lbowlnlu87muwm60y6d7upye57lf1kc7vb5r78trbeygjt4f6ovwcsy1u6e0n3lbz7a7kqivzi1gthgd9omgqvmtxcr8ona07no6ainkgv64',
                status: 'WAITING',
                detail: 'Aut temporibus ut exercitationem qui in iusto possimus omnis ipsum. Temporibus aliquam ex qui voluptatem. Perferendis doloremque repellendus vero neque. Consequatur doloribus enim. Pariatur at ea voluptates sed.',
                example: '4m763xqa2scr04dtjkqzi3mje74pa73mbdnf40pdtyaecwmbpoogb1uu5227aj2zb4vkgceih7kwkfp79erhl44pwmhwslzownk7ngovakw33ln8vpkxyzli4owpguff9ul9o27lai8anmleygjt1jmjywrlfaw5',
                startTimeAt: '2020-07-17 05:05:46',
                direction: 'leqcqwerlhqe9r5ausx5',
                errorCategory: '5xtmpft8bpdwi11lnql2654q4qwxh71yhwbz9s6r1xjkt7pzestubsxti553ckef9wd3523hqk4e0iw7zmj3gzs8eeld6d2qhz7qshidwgu0yc10s7sgdcsberonnvio5s228zj4hl6mwah4pq6obmri92t3ug5d',
                errorCode: '51d6tkx7a42qeyf3sxt9',
                errorLabel: 'a6jpiwccn8xlwpfwrqnyufzajfqlvdv3sx3n3l9ozzzf6mjaslog2bh47728esfmwov1hhsptk8shyc88oiurk5lxe9o1nqmgmrios6eeufvhi757ylrz0ijttcfyz3rviiasm66uiznr3456bv6emnm75w7t7m0',
                node: 2675582274,
                protocol: '8ddmbvmie9usm83vcez8',
                qualityOfService: 'vm1t6l1rrdxav16nmnvx',
                receiverParty: 'y0m2k7se8j32xq11vefz53s090gyda441x32oc364374mrjl772vj4wjbkq2woayjxw0j22knp9ylxu703e2nzhwy37rhku502mfj8sjsjr76dmpx1jlxk7utm5h8xgdwe5sfosk3xa6yv3sp2sj5r2v5c5aqwls',
                receiverComponent: 'fdca412187mp161flvwyy4zequtpdxhn81gdkiya500zmoscoqwkgs3gos1fz12iiw4q4987vdwnktoq21sa79k49yc4edd90vdd33f3k7h8wz4v0tb1c7yx5rp2kzdp61renzl1wwhg55wcuda7stw92uwtxq35',
                receiverInterface: '1r18jjdy6or8m52kakkxur7k40iyboi398zhubzeip6h0ff1lwqsiauw3p83fpu5p93kw5ymqwh7szu12zf31s26xd69gffkfr54uqtite3rqi9naipr7o840bgzz9u8sjmx8jsu929c5agj26gmdgts73obkfxl',
                receiverInterfaceNamespace: 'fjo47yh8qu8j8qj81rg3946me0lchrk2bbi7nb5f0gqdlk8cx1nnnxdomv1i8vrmdu6ig4de1uscpl5gopcemisepmvdisp7b0ct1u75p0pxzk0jpfz27vgv6grmoozwwu5j9hzu3by7zj465k73au3ypbkwj9qv',
                retries: 4056112634,
                size: 5464076670,
                timesFailed: 6912810147,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-detail`, () => 
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
                        value   : '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8761b63d-3ae5-41d3-95be-958ca51dfc1c'));
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/8761b63d-3ae5-41d3-95be-958ca51dfc1c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8761b63d-3ae5-41d3-95be-958ca51dfc1c'));
    });

    it(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b67acbbf-6800-4890-a619-da4f8d21ecd6',
                tenantId: '1998a7a4-2743-4ca4-8600-d3edd615c72a',
                systemId: '5bd4de1d-7131-4325-b138-4ef502401cbb',
                systemName: 'hhowped9s4j5ypa93f2y',
                scenario: 'qcufk2etusw29g80wfm2uv9u3qe1o3iu61m30ciyuahnpet7yi63bquxjyn9',
                executionId: 'b9ba8a1d-79e0-44c9-9a41-0c1369e7688e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 13:58:10',
                executionMonitoringStartAt: '2020-07-16 17:36:16',
                executionMonitoringEndAt: '2020-07-16 23:15:46',
                flowId: '86fa5cd9-67cf-447e-bae5-971f4ce70c00',
                flowParty: '8mtoyo6ufkijtdr0lmcnkrzfje5h3oyan9roxi6ws5watibyz3ylzcui0m04yuryry7ngnc5e71k6s57aoown0btt4fq5tyyv8qx13qbuhu49ce4pxwfkvg250ndk5isfpksprh40xgj3zlp23l1krgkt8a8vsd6',
                flowComponent: 'f5847ua5aqqijmhbgrn3tkrlx5az9x5to22ifvdvt4mk5e4s7v85dxmce60c5whg1p2c75r89i3t44zfkvvwci2gfq8ezcc3psanwyhp3mdxzap0vadcr0uqn0gcgdry0ls66kla0855hcgwkbmg7gp40z6okp9e',
                flowInterfaceName: 'ei7shsc11u4xepfvi81m32g92lmi1kn1pcp0qh80rraome971zracf69uyaibbtgtz7i9vwqskshzr6l8iztu706r8wf52bpbsc9quh3gxpspysl82b1b3x73l9hemtbyab4rqbejkvzjjnqrrxc5zuo68mazcd1',
                flowInterfaceNamespace: 'm2oeoja8mxwy549i5hzuv1kohfhvw5cabkyk1et3ngjqzb421jw8yk7vn013zjusi3mz2p3venfy8l2gwsebn6h91z7jotk47ex90r7oborv75d71odt6ijk114pdl27pc1p61lcd7rfa11xycbw4fcpgixem2ye',
                status: 'TO_BE_DELIVERED',
                detail: 'Sunt quae autem est. Autem in minima vel qui nemo sed iste sunt quia. Saepe autem omnis qui vel perspiciatis. Est laboriosam in qui eius nobis occaecati nobis optio sed. Assumenda ab eos. Odio consequuntur non numquam.',
                example: 'qejgzsml8bxpfd7cn9l29ijnw6mp0xagheghu3a8994nrb50ummamkxq1tix5euucekbly6y60q4lchok9hakduxo1bu5iccxk1s1nsysmp1d3o4qal4tb6avwgs4cbm8glpikzs4k1kbi4dgrgxjetlltg6eqwq',
                startTimeAt: '2020-07-17 03:19:23',
                direction: 'eo6rr8104xfxcxxww0jh',
                errorCategory: 'bel69fopsqi2pm18pqk653sch95wv3zpahfr4j5bhj6252csawtdipm2xy79xil0f8evjxul13xc7qzpw3u4pcbtk57ocftpl48d3t5qq323on62rrrcpu6njsm7zlocnw39hh9tyow6k1svtqtkeneqxxmz0vpn',
                errorCode: 'k3i3zasm7ivzat329qox',
                errorLabel: '1un8aem0zibtea3gqmba1l3it006u14vc3brorh9okpqhnp8cex3f3abjhde9i2r1f9eqd0zi3jxnjuam42w9edhbhwndcm34avxzwqa4jc6whs413rgf6xus4l47pmcbaiu8nhgzgn2y0ib9u8wxd07pn32zayh',
                node: 8095066354,
                protocol: 'c3cap2pqy3agfimyzxba',
                qualityOfService: 'flceihelv0ua6z7fmndm',
                receiverParty: '0mp5dbxnwqqvbwcsmys8y5nml5a6lp489ov1if24a0w6mk27mqc0wsmsp47x8dpuedj4lwv8cabro6avrwutf493ctprdr320767j2ri3qyqesmiv6cmge1i0ujzsb5u5j00g70q7nkup0g21urmtffp6fm6725m',
                receiverComponent: 'ks3qol3ml8glk36eciv9ro7hk9qtbclppox92wat4i9bdpi62eits4tihnp7fpjuj07lrmolravyl7ap4rmkg4rekxwjhte94sf0vyicldfnhjsje6qlk27np8rz37eidqsfyk7v6213m84dtm7tyxk0od5r2qyo',
                receiverInterface: '5t6fnb1saoxwfzp7wacp9zl4xd5mjyh11yga7d0ljur3om0oh70vgxkw04ipm3lin76xliwdpx4zp28s7nnvs3aaz6xxfyy1e5ludh1lekb4vi6lokfufpa9qax0wlszeszdm35ul5jnneg2v704grww6r2hzndj',
                receiverInterfaceNamespace: 'wv7g6azgv7c4l7meoami56zu6lfenqm2h5iuvrt603rk4g3qz7zwn4ka2v312w6bbfh6xzyq0hz7f1xkwxl2hme6slro81r5h56t9cfzfjlltrck5h9by2pviuxlw8kjnuhnwsvlwesthccblufg891wlxijqlwm',
                retries: 7503990987,
                size: 4591899610,
                timesFailed: 7337782475,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                systemName: 'mgvrvr1xbk6qgiwgrabk',
                scenario: '38ejukz113xdy9iadvrk7eye1qgcwe7weqj6k9yzq82c7odpmyqte7anpzs0',
                executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:37:01',
                executionMonitoringStartAt: '2020-07-17 16:28:41',
                executionMonitoringEndAt: '2020-07-16 21:36:06',
                flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                flowParty: '1rx8dv65208dx67pq3diaqhlqyrsbkz2az89yv090mfdximj6tx67mm5u4tqedhvn5uwn9dvia8n3n0cv0itiwgqloga9b2n8mr383rjd4n70n598aanlx59vzhg7h4bjcpcsosknzp3aoi989odtfmif7ahic5w',
                flowComponent: 'rfhkafyowtcrpfk6v55zhvfj0p8620jmbisydn69dn8cp8gcrxs8ns13dn9687a70jmvxlkxyoyy8p4wojkcn1sifgx8wmvs8jpku9fl3ii24n2fpjw0iuy418l8n1616r5nopi9yuftyqattkg3jf84kgay26a0',
                flowInterfaceName: 'xtatuw5h4d7yubmh9fq3tnb5adh71m4fipkrfg8bkrqbdumnx47meqp8rhkfrcobsaibxm5u2lgr3j3w4kbtsu9gfdbrbwezgtnfwwo73y0jyrm9mfzv8p5hxtntyp3jeov8p37qrjwhscueijo74jqtzi3nqt67',
                flowInterfaceNamespace: '6v6ity8ke1gwahsoy8t81qrzbw5dqaqhaypwnrqp23l5bdb30vpxv4staoih2by3bjxa9qwuo0tn2ay7c3818xrgfn1jxact02phlzlu62wxn013ojukilfxoo88hsfarpc73nslk524eh4ye5y82s44oqiv0l9y',
                status: 'WAITING',
                detail: 'Rerum quia necessitatibus. Cupiditate inventore provident rerum iure optio. Atque qui illum. Sapiente ut eveniet. Odio quia quibusdam nihil eaque quia et sit tenetur quos. Quas ea corrupti qui ea.',
                example: '30wpsk66buzletii1tndmwkj91jnyg87rsa58lusoekozt1tdvhlt0coi2mbocdpdhocjukdxcpb9lghw4ozvg7qbyee05kiozyx857pbff26ywlimqs84m6vdg6frkahijhd9tyw9gn3xdqgss9t10t8hetpr57',
                startTimeAt: '2020-07-17 10:02:02',
                direction: '6pog5ayprb4xsbcnus44',
                errorCategory: '8xkqqg151jsdho0gf4j13e4e1qjtyh9f9o1cu4mwckmy9i2xgxyuwou3ardeg27tqr7fyijguspf20jwoumt6gfjw3axm66leggvm1zabgk4qslnfj54qzcv3q5qez10cppo9hdfvbvvh66hs9iif5pqzpao3fsu',
                errorCode: 'wyj875c6118coscspulq',
                errorLabel: 'cpi8e5497zfklnuxi43kkqqfsj5bf9ehileeffijrziq1rn7gs8gwzmzc4juczcwovnb7h2rsm3j3vsl6wj3x6c88ngzpkfgib3l9yg34siriytffca3vfp6yqfvzjzwug1y53ax5nhhsijo4e2zrz8sephzvz3e',
                node: 4386834644,
                protocol: 'hwhzqhtmssw63uuoopdx',
                qualityOfService: 'mwdynkcsvw52fy40ju1x',
                receiverParty: '93esr9o4a56msa6pj3ku9fgl8v60dcqobz7ox8umutwc3u5qxdf1xr2lz8ixahslp1pfm3oh3aix3swdrdzfkrqcl7aivzynjgn54yeu8fpmxdxjemq40qwye1wipgsjxu8rw6qijshou4xz790b7jkloe4y1uen',
                receiverComponent: 'm8dq8p5janktdoito173rvxcl5jyrqyrvx0kg5j8h2kq7ng19y4b487zmbrh3xv9hjlzzo0a7mft8pcdq9xzmyl456f1xgxragfbr4g251kawujez6lr853fxwkkzpm87bz3g1azxkvz40ti3ln7w7v6shlusoid',
                receiverInterface: 'nma2ef0oy61actssgrnxvuamxh9e7zuax6mv4dbfb8ltntux9dg27b21z03amispu6mgntbe54ytyp268foy2wk5y30mfb01awop7zom02qmioeoaf8dokm0j7ho08dwd1balp0mq5kugqyrcmeev5gl6bt9ig2m',
                receiverInterfaceNamespace: 'mkxl5hygr7ndhdhbnzmvlnoyrtflteh335jmsb3ji8kjl179dzn2hn3b8ov46bwan30ovzkz9ikch06t4h8y1fhl3dbhxbjfzis31dxr58qwywond57jo7fnftcwx32h5ob7dy5eb3li6adbby37z2ipq6dx3tdf',
                retries: 6044458102,
                size: 9013572627,
                timesFailed: 6018994445,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8761b63d-3ae5-41d3-95be-958ca51dfc1c'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/8761b63d-3ae5-41d3-95be-958ca51dfc1c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
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
                        id: '5eb3da79-6d76-4767-8afb-ba93de6d5d03',
                        tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                        systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                        systemName: '1h3untbyzkrmq449kckc',
                        scenario: '3qmt2oaqckanmueqcrvs8ayhcuhairy12silo958wrmpfv080ath3r1cjsu7',
                        executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 07:26:13',
                        executionMonitoringStartAt: '2020-07-17 03:22:01',
                        executionMonitoringEndAt: '2020-07-17 04:27:45',
                        flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                        flowParty: 'deusfgssmgc1jk8e83m8cdgrk3woxor1uwu9wyjj7p2gnm0vl3kbk2jwhbllwcvqeb3rwqzql2cnl4oa0a1sqfufbmv6kdl3hc6kaphfv7gig6e67fafe728shu1fl2v5vjuzwh88baxqn25f7ee6fvdbvr3xyub',
                        flowComponent: '4ra2d4lu5vhvz45j5ba1zfiacszbt67lu3ffw38fkikebfjv8iqw8dxvokbgpk8q4xwcpuevh78tm75kjf58b98u2cpz434xdi04u317ywly9n9l2wvntw39f8mxsfkky110mncszvh1guyitc5717zzs890e6ww',
                        flowInterfaceName: '5pxg51abl5l9jk96bc8t52aa3csj9uoltigrg1q0faocr1ity4scyhw6pu4zisxvved21x4cvg7fo8dixc108xvqucjgo1yhn3bm89mklsv1oz6sv5ygoitkvo5zkclr673od8p10zp8wk7qlttjrfe65ep0m46d',
                        flowInterfaceNamespace: '9porgndowdpiu6hheyvkyjq5g554xftyxxqbp6xbrfum3vygop0v44enjgaxlgv1c6m8yc66zzd3vnde3nrwdsoirkju9f5t3ttbfdia1krv39b5cp1h1id924l0rplucrdyv942zwqwwpwf19v38dwl5g6pvxh5',
                        status: 'DELIVERING',
                        detail: 'Nulla et beatae voluptatem. Voluptatem distinctio est cupiditate incidunt voluptate debitis dicta quaerat. Nihil quidem esse ut rerum dolorum est illum sit quae. Libero repudiandae nisi.',
                        example: 'xydxaqf6v6utpbpzlm6e27i4h88iv8ukbc1gl228h6qbg00wr1ofevk10fkvt5tnplzxn5go47n66ijoc84xup41ycfy55v3o4t8wmfm2frbg7qetcsrnjt2tgjduv9br87q2wyptc9cglocsgd0c03o679dp0wp',
                        startTimeAt: '2020-07-17 00:44:16',
                        direction: 'gzpmptes04phwwce6fal',
                        errorCategory: 'lqsssyllsgj9rb2i42pbm0my5pbdpk0dzrf1x6158oujtbcpv6606oru6bntdyh8nhqoeoi3f66hxadpish01ep5gjl5q7jssq20vtoekwf00nqeuqytbcjin71hyjrteniip6x4444oyehhrqutldrexhp8wix2',
                        errorCode: 'k4rxom1vp2pat8d0swch',
                        errorLabel: 'ovcvg5tb9n4ox3inv7kiji3ju7tzo5soom5i1qsncvs4g12lqcgwj10d8nro4a7u4zlmi4sff3yw5braxlny4axhc498kf9bkmek9b6nocjmxjgl49oq5mt46t5lfsku9lp96wk7rv94354s3m77mj8brhx6usa1',
                        node: 1921930929,
                        protocol: 'dh1l3zn6vdthea4mlww6',
                        qualityOfService: 'aiec4qat69w63623y1fb',
                        receiverParty: 'srea0uzimyw0doawbuwd2z314utkn1ev1rpazimzr125v7fc8ll49xzg2yxpr0b5msvo2krtvbka81d74kjru81huddwd8k039zxqbhccc8alxg87605bkpio4gbrc5tp638s5zma6162wmzwnn1hsyg7f8ma6vj',
                        receiverComponent: 'tpiw8k54v5psra5s6gm8dm7blu3t4gxmcs3a7v0wom6qu9856rpzikpfh6g6grmughjrc5qj9l06fyssqfb74fcmcd8c5rr7oiz1q4j535sepc1cwwk1y1vuwntetrvzyumb7o3xjvb6tq4y00lsbpxnar0tuu5m',
                        receiverInterface: 'hlje51y6n0r5td6nwq3eicsl10q4wvt7vlxno9onc7m8jp4ba594hrr4ksh27zfig5ra42xoyciwi2ji95459dbdbbuc4w7z3yms4n0jyns3910jnhfndk5lc8lprhs8nqrbjip574mqkikostzc09trkm5oy10i',
                        receiverInterfaceNamespace: 'b0ok9oqdyz65qmllfnnhjvdc5eixdbzf1v0ayp4cgyg7rnhh9cwpkgiav5p1qtroe6u9jqis9dx50vo7epm3hpmwq5sjtl8pjs0m6rmzvse6p1mfl3buzzhd1y9vmagomivemx71j8e7h4yav2u0zr0he6utvni5',
                        retries: 7833525975,
                        size: 7106808918,
                        timesFailed: 1072047813,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '5eb3da79-6d76-4767-8afb-ba93de6d5d03');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetail`, () => 
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
                            value   : '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('8761b63d-3ae5-41d3-95be-958ca51dfc1c');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
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
                    id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('8761b63d-3ae5-41d3-95be-958ca51dfc1c');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
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

    it(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
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
                        
                        id: '7a0c6514-26a9-48fa-a4bf-c4c3d922eeb3',
                        tenantId: 'e8943bb5-c850-4f23-881d-46fa159b6b9e',
                        systemId: '42487f8c-8383-4a41-a623-db92f3f2f04a',
                        systemName: '444extgzj2qmrixb4fpf',
                        scenario: '27ds1cyp6jwz5tbn4ulgldq17o2za0m0pbrknm4rapr42t81rp149hyloy8x',
                        executionId: '7a2f347a-32c5-4a73-ba5f-13406d0c2a75',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 19:22:46',
                        executionMonitoringStartAt: '2020-07-16 17:07:24',
                        executionMonitoringEndAt: '2020-07-17 15:59:16',
                        flowId: '357bc80e-0df1-424b-a596-03c62d9d8ac1',
                        flowParty: '7mb3eukono0o9q6tc4yo09bc1i2zr8izcmgnvt4fhrum3zps65g33765fklq94zs1c03odk7sbf46y773koqgcivh0145bn89jckskrb6wlk9lr9vt9zyi1k007vjumptvojaetj4f87818gqcnyo8vkjvpebqxt',
                        flowComponent: 'wft5mxrksduzd88idveuk1h0mp9x110hv19cigsq4h32eswgu9sryyird3xsfh69fz9sits7ox30wuk0kd63370ncdy69kibqbpt21a2v5d7l3alkik8yl54kyno8koro6d7j60wr2c8c1q1dyam1w8o6z0ynrtv',
                        flowInterfaceName: 'e4h14ze9s7fob7f5wv1m4urx5224hozxyiyj6rh2fdviko1pdnk9srwfk9uun1lji064zkgt3j9mtsa5kxwx386j9890wpkbpqefp5ealiumo03ogzsddfkb3l0uuzsqu6ncwjrk2s3w9s3eo82aieixt1esvtcv',
                        flowInterfaceNamespace: '4s7s0nbiidya0pxlehvdhbs6tp8566f3kf2dk2rdm84ex0fncguyqznetccrcghgw47k99k49byxb0fusdmj7of5xzmyumuax5newr6fg8gc0nt8cb44b4tlssekuzc90f2djdzt6yxwme3ow9im6p7fs5e0i89p',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Ipsa ab aut. Voluptatem temporibus sed animi corrupti neque ut laudantium quod. Impedit qui veritatis ut molestiae. Porro quia sint accusamus et sed illum et.',
                        example: 'ixv1bdwa7ju8myaduhd6xj6c2b9vismh6td4d3s47mhj74lj4dvzktidz2finau5u9v10dsldvqee4xcof7nr90rpxepu58uf0jme108ckx8u24u7mt34vug9g2qoy4n4o1pl12lat95n3abilt4yr04vs0vlvwh',
                        startTimeAt: '2020-07-17 08:59:15',
                        direction: 'qwndsr340fv6f24r8es9',
                        errorCategory: 'e9rgr4zmv6k3yw2q99yvvwh8i7dkoevo4kn8rpxhgv6dg4b3dgnizr0ho0w5rpzmubf2pfbphi2g80tytcct6ow92uk299lqolw75clysmlgivy4hxleahe8ozkhpoxch9tnoh6yy7abeeezo0sk9mvcz6ir1434',
                        errorCode: 'blcmbdovyl6wwuxof4ct',
                        errorLabel: 'fzhm8jqu1lmm31l8145dp82sjvpnbgy6hry2i99qkw4l7b01ykm0bruc2djlldr5c6nglj8rdr5tefzx0iv19ginm487pagz76xmi7nb28izgllx6lv6padsndss0rdkptqkt07mgnhfh869ut621om0e6fsaphb',
                        node: 6671262442,
                        protocol: '1hbgrfsmp0qprjfxi0iq',
                        qualityOfService: 'its1k0mjxtrdu3y5r86q',
                        receiverParty: 'xlqu4zqclcaoxy1q4jis6fjhueba0c8uq30eu1poucvv0hc5g7uznwqcoiw6g7qzt9uyy8ct5or6212vn6qaae9qlp2g381hg0dyzpsvto5dk2gk42121wvsypjglykfj9aythh4xbm7hfex4pkcq2r84m0ps8du',
                        receiverComponent: '9kz7jm7qq3f3bo61goylrzy26pgriqx39w5xuhsyz2a62wftgkwdyzn5xh6t3wy3aek4e1uuekf5xygh1uufiezcv6yg50csa4ioaxf20tzhu4kq9odvfdsdqky3hr4x9po2s9k3ac9bodenkyqd9tjeoal1xe3a',
                        receiverInterface: 'kxkf2gnvgwuwf4krnb21qjd8s4ijjkw1r59xzvrze4gfz8bd450zajn3ctjq3a7wff0lletdcwqz1jmbrxue0pzxvem1k88uiu4pm6trrptm8pg1kvdcue2u82anywvb4bru1yo2spi13114hniry7093zuzfiyv',
                        receiverInterfaceNamespace: 'k21rahc71r3xvfbnp52szi2bxuu52e7mmbhr9lj4oppt33sofjf2dxpdx8rrddoo841868esn4cngphvr5b28qwj61plg489dchr1y7uwyywf8qwtdnzezv1srpi7aqjqjvzp7mhp1qirwlvqwm96784qoqfze8d',
                        retries: 3464043656,
                        size: 9701500247,
                        timesFailed: 3946483726,
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

    it(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
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
                        
                        id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c',
                        tenantId: 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def',
                        systemId: 'bcafefb7-cf68-4f3b-a844-1bb60c649712',
                        systemName: 'rrsiorq2wtcxwou395a2',
                        scenario: 'snr0mb9tcdpa2ri38usa8s0qa9v8yhgwsyu4eqe6tk7qptm1bkseav8iyctk',
                        executionId: '10ab02f3-b600-44cb-a7c2-63978290326e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 04:01:07',
                        executionMonitoringStartAt: '2020-07-16 21:47:51',
                        executionMonitoringEndAt: '2020-07-16 16:32:46',
                        flowId: '7111a4f6-d53a-49a9-ae2f-c337b4c299d6',
                        flowParty: '9n4k6i4e07ttal91uv55csgt0krlcwrnom2h6tixwv0rrfdgz6biorpp43yjuv0wk35b9hchprtkwzutdfn5gf3drv3i6w5htux1aatr4iu8ab8ar5mvp1xjydpa6fq1clqnifhexg3r0zljdfvsj37yfm9o3nch',
                        flowComponent: 'xkbf1k460ues8oh5o7ngg7pf5nykhiu5j5pifkjye0ssii0pada5hqylm43yoo47t23teau43yt47z58id9q4n3v2eys62va0kn5e0prieah9u7w8fmkpfvpsa33o4ze8jlbhj6e38nylk7hih1w2rqao69is6ag',
                        flowInterfaceName: 'cluwcsego75uh15mjlt1iftb5txw8m4b9n2bwz3911pxm7fut7pcy8l7kctftb5rkk23b2h5m30yh8lc89rjanft0r3pip6n7klb04ebcbvjjjsh9hbq19hwxp6dat7bqtrjkh8j089rl567kzng8gw2g2lqsd01',
                        flowInterfaceNamespace: 'lnyw84grkuv9h0dpdoujnokdafxed8waky0v30mz1w5tfohfsckjffdkn5bmgvic1v88j3sf0xeifncuaop56nfi3iso46mu8jkhnddm291c046a0hkrmcyz41it4q0934hfqu66tebrdh72iltzial7u2m3hbh7',
                        status: 'SUCCESS',
                        detail: 'Quos error dolorum nihil porro modi necessitatibus dolorem. Officiis non molestiae non. Enim voluptatem voluptatibus eos ipsa. Voluptatem molestiae accusantium vel quia voluptas assumenda voluptatem.',
                        example: '9usq2yr4stx94a9oh16gjhce421epqi7rzbrub1jmu9v1y02j2dvaln5dfhfke3yc0nojxdzenok66stuovjimwsz8bzy77li57xfe826ufqr6ha6ugi8a9kadxd89xna2yi513qcauy4jrr5ux6vyjchcwzg68e',
                        startTimeAt: '2020-07-16 22:24:00',
                        direction: 'pkoluautdqf0fol9q0mk',
                        errorCategory: 'crq5z7hthemx39l6h75vjuccubj85jpjj61we0o40fscbgx3peb4esl5dtheuq2t93itx7n08c6z2bbxye1s0gyftoo1yg4swnhwohgf6ykyvdnywede5zl16ds85s9uztop2bf54pus5tj94wv0h5fle9p8ixl6',
                        errorCode: 't5g2758qd8gt6k1zpcwc',
                        errorLabel: 'd4onfza566204rtb8b1w6hp1f3uv815fd3qjsofafpr9ctksu1nmvcdo0tawxfsc8jcagb95n26oa39wok6438b6wcuytktyz5ue93pfmc8cyxk6h3jpg84dbuyqfzaq9wg9flral24mqowbwlbbbsqx72cktn1m',
                        node: 3061736900,
                        protocol: 'fsgqvc3hzpmchngp15d2',
                        qualityOfService: 'am6nrq92bs56kmql4pny',
                        receiverParty: 'ytifspfispc3k4btfhg4g5xtvqx2wo23d3ue7xbgfgvjr5nuc3d5cbipgh3c53fkf5s7ybx6l1dqeuf6v51rlhl8q6x3n2ov3ovypy8ieamqk23w99aznde8l23mhoerjfsypwlrvq3fwiotogn62wbzlxkhgpx3',
                        receiverComponent: 'q3nvvgpym514vysk4or9jkbdkv6d76s0of6g9l2064ucvep7atz9o954tb5tww0bf61aslpxuu9y8fzxuc8mdpajgz3ya2b69286x6pkxkfunyrtd3iut34361opoatp08ybbe54c5odseixkm4b02xmqvi44n69',
                        receiverInterface: 'wa0woq3arzcbv61bop3es23k23htj8gel4t4tvr96mjzl1einxfkjt76ep73mp1z6mpw5rp3t2ixuvbacjvfkis4939yla7acqxoikaxm6n6ktszagotszjtepuicgzpjyack441sfeu4c87gu5v96xmwge2l7uw',
                        receiverInterfaceNamespace: '523wumz4s5h21itet3ed5boj23uimwjmiugrd5qp2ur4ft074rjdgzjyguk4eyl589vuy3ifeay5kkddyoaz2hcgxho0s9oqbkm9ks1cklwrbrg31kxtit7mtlqpngs4f36xdsnyeyeluuih221btd58ncsrnqei',
                        retries: 5117354237,
                        size: 4938525943,
                        timesFailed: 9992237665,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('8761b63d-3ae5-41d3-95be-958ca51dfc1c');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
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
                    id: '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('8761b63d-3ae5-41d3-95be-958ca51dfc1c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});