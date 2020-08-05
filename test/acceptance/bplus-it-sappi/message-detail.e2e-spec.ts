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
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 's4lprl5xbq49ps4dg4otteb11hf4fp6s51u5m4zfkx3n0mix07',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'v4sjsliepjl8kt1sd6iw',
                scenario: '13wgpv601wbdn4pyftt1aeezm69tvx5wwc2gn3o1b2saxmue9pjpvshymy35',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:13:46',
                executionMonitoringStartAt: '2020-08-05 01:00:08',
                executionMonitoringEndAt: '2020-08-04 10:59:59',
                flowHash: 'egcjnqmjwnxdrrrpemkezgwykypf7a4a5nf4ygn5',
                flowParty: 'b9okaqrbewd3luppb2o8adyni8wmiabzt2jq0urcrjyzfo0n5b0ny8v604zuisp3v6kj9as6sz7z47hiwi34qgicuya06w63acjhae3yx2vbha4z1emfxm6fw35hn6nmdur9aqg7gjs6hpfx9rgwx8tck9j9s4cu',
                flowComponent: 'a6yaml1laab4qc94zk404zhl1ji77yl1gimhgw1sb97eyv8kffvc5iele9n9ozyus73dmb2k5199kh7rtc82zhejwkxuyghwmm17joj5dtqivnop8daxayvx65mi5wibvr947z3gqpb2jx16nttzr3hrti7i2sgv',
                flowInterfaceName: 'lm6flfhcqkn9an76q44qimwtikr4zxh03tgpla6lsfabfgyw55bp6xxdiq7sd3znji9dkkgcmgyt2hl49ox2lenhndc4s1bwoghcsjelj4srbh2lw2eifl4ho1fdwm9gxgs40ebnda51qvynlte954qqhkcpv9z7',
                flowInterfaceNamespace: 'k7j6hxm4wxxw6u8siuts2d3rrb8ss1nbwbionp4km21wdoai8nemtsfem7robehtc4hdz03blaq29pagwmyy1ht1sefi32xrmecnm35822h8g0jjgpdrac8by6ud9u7rgbgype9glvnbbmte9ckunxbafyar6ke6',
                status: 'HOLDING',
                detail: 'Fugit perspiciatis hic et ipsam inventore harum praesentium. Et dolor et dolores doloremque nam ad. Quis suscipit eveniet harum consectetur ab eligendi distinctio quia. Vitae quos doloribus error. Modi fugiat illo qui doloremque dicta mollitia nostrum quas.',
                example: '9597015cm1ozkooewq9yp8dhifzvvtzry448rebt5t4rv96a7oc2kp1yvlxajndgnk47bk3qqaeu0tn1iajyxaz5u0l2d9ihip4nsuxt0fvuff2pu93fjyzejyept4edreg7n58cfvvnxz2z8xjcec4gb35vj8oe',
                startTimeAt: '2020-08-05 04:45:11',
                direction: 'OUTBOUND',
                errorCategory: 'uvgqm5sc0xwmd3kiwsfm4cdj063l66baugdxyaqks3dn2jjdipcm45c48dmvytcszwj585x4tguqrza9ujk7viakx6gz4fm928zq3xicnw004kbx1rxkn91mel977orbxm1hnvwxzhioexr9ypzkyrh0y77683p2',
                errorCode: 'lvotr21cqvxvw3a029vbkyg3sqiqabi85ic04rhpo5teino09v',
                errorLabel: 468177,
                node: 9360914282,
                protocol: '3o5m6cvs4kwa8iapyv2e',
                qualityOfService: 'vtwwhd1ulwqfuxhpxlw7',
                receiverParty: '4fh3phpbi27x6gn2aqjcgyqu5n6wc4z69fud02b4buwquhbxj5cosbwcxpvenxije9o0pl5zbo73zrrh4t3l8tg7vw4gqrkts96c1aj1oxwkr6jy0mvoww4pwyusy7lxqs7tb4g6ga796zmng9wx83a8x5baix2j',
                receiverComponent: '7x59nca8di218psoo7e55eduwjefwkyxla22c4mlrvp7ehoxa8yfosspv0n1a2sqn5gw7kg27ukds6r49ekye9vgv5umazbw51gatp3kjgi1dwx6ec176b2lse59plbczj16dd3oh6e3afibsmfvibcdi4cpv908',
                receiverInterface: 'odnd6no9p7a3suibekcynk42fii3z6lun8gd4134bh421qx2ea8px3pkmv7pczmp7oo38801efxdbjjtos4go3765zog8ulmv1hz0dtlh45j42c1yj745s17x62qgqh2rih21zfuhkbkiahbr3aqysu9sdr9pafu',
                receiverInterfaceNamespace: 'ao7pc90j4d8386ypvnqmcltnrk05xcncvxfkvoi1u6a7diq4rm1rp1rbu0iuly0ivx0p3cvn71yrkilqbzrn8bk6f9mkgtlr2j4o3jwgeci8hwhndk4g1adotxfuir5p1guwvlexovcr2nazdyv3a8qqo95du6vj',
                retries: 3015096141,
                size: 8549119124,
                timesFailed: 9458620918,
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
                
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'q08hqrdhc86ewvfvcxoicfgximaz2kienof2omo7b1pzazfzo7',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'yzpof6u41y1aq9wjkw8a',
                scenario: 'm898v409piih6xgnkwl59py2wrrfmlvn5168an5yt0vdee7ejgnloz3w9juq',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 15:50:20',
                executionMonitoringStartAt: '2020-08-04 16:58:49',
                executionMonitoringEndAt: '2020-08-05 03:37:40',
                flowHash: '9j5f8ywflpartet5sksx48ttbp1iyattb9ftpc60',
                flowParty: '0xf18st5ojw36pn5cppc3fsxsbnsak7gfv3z9b1xdd1fx1n800lmog6c8fdya9mdk4m0cwwpuog8qp8k8xh15jxtbmenryxrgj7ok4g45dgm1mfri69cv5w6ex7rl3oxruxze0sxro4rclh6f5qdh5rf5290v6mi',
                flowComponent: 'o0hid18r7lcmousqf5frlzheaxdv25squf6njqp4me4cw1jfnh1rswqnrkm0p4agyeir8yk0ejgew9ce0y5ok6mgjfrk5r05m51qsepqs4z3xvrdjw77uj2xngsdq9oldynnmsjxtht0ugjrll3dbf9mm75og8g2',
                flowInterfaceName: 'xhimzmhvknlljr97o7wipr3wdqmkwqmiz49w6u5noo8v1w0wz1zkbef2hibx02d3yzo3bngoh8ldi6itsd9xy17g9jpjbyyd0ndxiu6ib8n04achk8e9bi0qm3mwvmkn37jetffkj7qhvk6won7ovmqfvq3ouig5',
                flowInterfaceNamespace: 'fsw8tfn2ui64lgr9tq5feb1gxunleqci8ky6npe2iux6cvs3ye7gkbdv963ter2r8v1i3q85pi4gtlsz5nlv4xr93t7mgt0r3xfxtqo3u84iesngc9dgbrxlf4agnbndmc3l8gc4rmu03gu189t08pyf2gwpjnci',
                status: 'ERROR',
                detail: 'Quasi amet libero aliquam voluptate suscipit est. Error ex qui autem nihil nisi eum. Odit fugiat enim.',
                example: 'zjuyjdfm4sxfxt5jz96rjaxo6461d0ksn8z0jlano200sugykd1f51u7sj4fe9hbcti6msc9i30yakaw3u8isyigcsyqksap3j0yc9yv9uar7agyo9vspbcytdevyd17dd0zq6wyb46lhm4xkzwcnxmtf9rafxi3',
                startTimeAt: '2020-08-05 01:15:00',
                direction: 'OUTBOUND',
                errorCategory: '1e6w76gy9zrj1opnp801t31diyoegfpxq833jgn66vtu5xnnahm4zo9vpj2fhc7eqao36wu3s5ah6cqzmper5veuil37ppotc9sbxg207hcy60yjzrmboy9ib9nzebmjlwho3t99fldesk482j58lmzuhl5anj8p',
                errorCode: 'k6unqhs5iodnpvl0vmdz5517aa61dxb1pgttx9yaeamqq27fjn',
                errorLabel: 377172,
                node: 9588676761,
                protocol: '8z62kamu4df3evxk5fs9',
                qualityOfService: '00b7yn61holrp339sl4j',
                receiverParty: 'kc0w9qooqe2ouc4t368nmdzszvc9gak62m63216xno797phuvyx61tpczoe94kz2rd8zwu0d4puyhkrtozld45go4kjui7ugydze1cwa73nwes57c32e0wsrpchdwaaznsyg7qt91s7ipnpxbw1z7bex5m95a8uh',
                receiverComponent: 'x3s9u6fr5vvziy9bo1viamke6p4zictvddi6yzl3t6jv13l6r8m92ufazxk21h8r9vgt10u8se4edtmuh5f2gpsb5348luye16xscfta9p6gqh7xw3sdlry7l6y5d8qbx6irq84pn1jko4rdhfap2dythwbg7wt7',
                receiverInterface: 'p49wnr4vpxuf8ridpx2hjgrmwizu59dfmrlscgo5vgq6eik38iiq32idqg2ql9yhzda39zusiycsf7cv65irp75olhrsouw5f3vcew485drzla6dxtmunrpdhd893cocw2ow9519fykubboviqvh4b5kk795shcb',
                receiverInterfaceNamespace: 'imp6za448jxmi08xujwsglt1bh1p16k6a8o0iokot7lfr53iy83r8r1f2pbvpfzsb1xucgif8n3uts7xnpj2u4u5sargchcjy5gpjskihhlhykbgf92j0czdz39rfd30xcf9quwzlly3uh060hu2c9c0cpbfqe7p',
                retries: 7290036594,
                size: 3877122023,
                timesFailed: 2775839969,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: null,
                tenantCode: 'uoljps7slyr2azwxb56dyi30yrtrkbdlhkth6jn109hdd6f1ta',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'ggiunbogoii7nlo6ujkl',
                scenario: 'exk4rc1phveziazv8f1ysu9nr9vn69hi59bt9ydhykp8apxwa1jo5fp4gwxj',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:56:35',
                executionMonitoringStartAt: '2020-08-05 04:07:24',
                executionMonitoringEndAt: '2020-08-04 10:53:42',
                flowHash: '6mm11s2uftycnrd9trinzjrtnepcjvh29r6rdnk0',
                flowParty: 'kciw0jux543eq5vvkh2tokv83jltoba3cqs971ped9y02zncrbsa6p2zfjbbnvxqla60359n8h51sagog4hzeq284ivr14uaiu0gus2swyu8jhkovl780672c6igyzzoat8vco6j4etmsl8rikminkpj1jfejuex',
                flowComponent: 'b5jbr1hmpkpvuvh2jw10ccas25qskypcegeil1dw884zdtrgqctmg5tph1v5zn5ox4qrz4qp0mj3vf6kvmk8emlqehd4h9ncqek1xdzrqolx5a0o8m6seuj0s99otmdtwicqljuzgggl8z3v8kq2xfz90gy0earl',
                flowInterfaceName: '39s2t0g1lfnpgz9oqry76tdp1kaeicosxcba64ni8dmgqiypy4nui2u2t8heyyexrtnzhbxjeolviwzqxnccrrwre1fdce193y24ljgiatlaobkv3woj8oegz5kfry2zep6dypffk06g0ifvvdh6wap90p9p679i',
                flowInterfaceNamespace: '4p58zwvd7efgu1bqq4i52yk25b4ukonq7n8pot31ro62ghst0dkvjqfmsiewx5gyc5xog1cczs82mbwz5j1lftk33v8nwp07i4rowwyiwav4f1xcyyv7oxcy83rj4senlr2w3io88ii1a9uwbtgwh6kj63xpt79j',
                status: 'ERROR',
                detail: 'Cumque minima id. Odit molestiae voluptas ipsam cumque soluta dicta cupiditate totam. Illum sint facere reprehenderit odit dolores iste eligendi ipsum ab. Praesentium dicta beatae quia voluptate deleniti hic itaque tempora. Delectus voluptatum et laudantium perferendis ducimus non. Optio aut maxime quia hic unde similique.',
                example: '5sfodve6ucpt8pmdxeo2c50h7vekvxuhc99t51fmob2uazprxu1t4vovlblvoxh4vjyspc479jhcp5xq9v753xpj9gowpag7iodka55dg642pw8kkg82yfib9w6x4eht7nkbv9ejl6xywz6h5bab7e8m80hwagsi',
                startTimeAt: '2020-08-04 20:32:06',
                direction: 'INBOUND',
                errorCategory: 'cr35jz6e7zetfdh4r2t67chdui3rciz2u4f0dy1hrvb2heeerruo74m49wuv3ygnv9xzix8ddjr9c67dijx80bianu886825klk4xasfxdqtvx6q3fu68c8hlknucoxxydt8w04qkkbaz3u18z314be8xez5xc4k',
                errorCode: 'hdm9tmhd3i4fz3d1xiv7p1i1r90rwat6u2r1ckwauyfdwv0nk0',
                errorLabel: 230045,
                node: 6874747429,
                protocol: '9jcsa11yvkto9605phjv',
                qualityOfService: '8kkns60xvlfjuyjbgs7e',
                receiverParty: 'j4hop04g4gndfyfqgfcdxk96f73vkujhgouxitrlzvlmx60c2coxdcd3abqmp0baumz7fteqb5e6z6i81c138vxu9rfbf43k8htlxqnpnsy5d7fi9lmxfo438895zn39utvlfsl9lkg0fig8qk3qhgt6rxsaoaxc',
                receiverComponent: 'kd5i7jqgbktr2rhv9c6mzrqite42pzybm2qe8ws0ur041dtktngc1ezsqeg9uz3uzk0j6x7mmm1nzwydub4xkykskg52y41jyoi8xkku12etpb08m6ix0jn6qaae3had2lrm7p42uhu411jeec5x0sn6g7hnkitn',
                receiverInterface: 'og7x2btltax5e556gc7ax9awzxwmet3evn1h5mf77481mad2imvxquaji9vnm9d1if9xoworiobh5s2wv73xj6ug8qzltbz6h67i5ag38cnvnf46ooo2xtui4fhv6pwyup3p00kbl79liqnk8jgc50y3xu3tig52',
                receiverInterfaceNamespace: 'zkzj5g4tkeu73wlogfxd2h49a2uy41jhpwg3cdfmauakjfgv7m8dky0ibcq0voh1oj3rokgwt4qttplkvnchoz6i24tvaufqad4gukw5neldbuwqqlkiqfk4ink4qz9exo7a29nzk0456csxwxprimqnqr3kag5q',
                retries: 4630051140,
                size: 8141051101,
                timesFailed: 5762939276,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                
                tenantCode: 'iy9n1s9tgp875rxyz5adbj1pv27q4xg3f24e61kw7ua4rtsvqe',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'c8859jcjf99aengk7dau',
                scenario: 'g10ddusy2f78tcvb43ksmryiacimzw60j7ikyze46k9gerwoz6czgaitit8r',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:26:26',
                executionMonitoringStartAt: '2020-08-05 03:57:49',
                executionMonitoringEndAt: '2020-08-05 03:44:26',
                flowHash: '16y2u3hzkgj5qw0g9m0ce9xzgxzvrm86vo3n6h42',
                flowParty: 'tlg7ductmi9yhldvvhsr1yxea0bfvrbxdepv7iltf8uht0dyhzlv5uab9gyj5yvm2aj39kh9ohov21dgby99cc8zlahnrgl160jswmxdk2ih6i21ln9rp63qu1f3cyruxggesrshtyaklax1c83w4u1bx14nqd9d',
                flowComponent: 'n6tpf52bve6ozh1k34d81txpyqv7wfl7e27tp0ya1vglpz74cqej1kebk1rlcye7hgn5fn7frvjg0zd68acmkviwfkmzg2r0llhgf6pk6tzzzbvu98so8qphiai9jn2llmc0h3mp4f0xh1eks9jjgtgdkdmi5oui',
                flowInterfaceName: 'biz5hcibokfwsnu34q4ylgy7qug686kpn08mx0rni6dk5lqmjfn94nwm42wfqx4j9zroqre51c10p6t0ieq8cxpzc40z0jsg14bfz9hkzhvtpoh3aex2eht9ziqv9vc8w0bhwgmho0fck6rd2bs3k4e6rn31w2fv',
                flowInterfaceNamespace: 'zcemryjhf7xih7425f6fe4orpj9q9jgpil5ld87qzh1d5llyo0qz0r8kf21vu2xt8ldb2x521jwczy61bkth2t7mpdhwvxrazkd9c0z6j61hy40bjaxawb86xx71y4bosldk7vmbwmg7u2492nfvknopbszwn7up',
                status: 'ERROR',
                detail: 'Eum sit consectetur non a aut et est ducimus. Ipsa numquam blanditiis. Iste laboriosam deserunt expedita. Facere magnam dolorum impedit et voluptas. Nesciunt dolores quo ab. Optio quae et molestiae.',
                example: '34gvzczehrjhrkm298rsqhdw46opdskgv3fjnplqo1j3g3qyyncv5r8v6bj4fbct90si6oqiu88gdpny39q8up3onpxvgtu9ni0gigaws88ju008px7vwoplmwhgf49s9wn70vf6ok4ydkkw2kbqx3v1xp9b5fdx',
                startTimeAt: '2020-08-04 23:24:41',
                direction: 'OUTBOUND',
                errorCategory: 'c6vrwy3cgdu6m1074qk41hb5nduyt7drj98zdd998pqxzbp4rd5omxzazeak1fli1gisfs6rb6wz8tdmdxuf3iei9ufxp3eoeu4hqyqilqd30jmn9ub25gyaexb3lzwuvnh24ogejh6gbw85w9wqrypksv3gehcn',
                errorCode: 'k4whzji8ap50wmop2byon6j8k6p722agomb18w07ci9581r8jn',
                errorLabel: 838077,
                node: 4274400977,
                protocol: '7bnexiyqzrgfi1fycdgq',
                qualityOfService: 'p4pf8ljl0t2akthha0b2',
                receiverParty: '3dfhpkp29uh2opxhwvrkenvf83u5k7u5584c5djik3pcvsia4de4n1ve5ec09bafib2j7qe4jcjxar9y7yprret1z1orovpz9wvz4nsumri6u8pj6vks3yvc5dhjp0gi6ngotu0rpdtcqcz9zxbhr4zbt9bpwxp2',
                receiverComponent: 'dk5gczc5lmgr1qyojt9nr7zd1cl7ilex9esbpki496x94osddnlruuak5i5u6lvns6hdz87lifp6bhwv6g4nzm1wkozy9rzo2r2xv4adzb9221d9rjz0c81mc5gl9xlz7o9e8t3ed93kvq3nwwkxbcbuy3pimi5i',
                receiverInterface: 'uw4e7pzpbe4pkh64fibgbz175suxv62h5ahf3vlzhlbrtuijjny9o9r8odxuy6pfm8bafuypijanzfj54d1j7vmb280te22ukzedx89kv0d9y5l10z4jc0s9mghr1i1ybfy4v9e5nz3v8y37x15ba8y8p2ysajjb',
                receiverInterfaceNamespace: 'wdhl99lv4219tphp0kxnz3l7drx826dbn5v9xqghfxwkw9ufrfe6ecm4wsw7ppsnz9jc3zl9znjvb7bn3m21bs37sarea6gv18pang48f1ihku7nsq8h92xbx7bt04mo9s7y3g8k84l26oybt8b75773z3mxfhdx',
                retries: 8552357454,
                size: 8578738599,
                timesFailed: 8559212628,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: null,
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '7lip449zrkurmpuul2ed',
                scenario: 'n9yne2e19l98xxv21yjsda0giwuxdjrjpzll31xbgbq118ngxiatj574sed2',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 08:51:48',
                executionMonitoringStartAt: '2020-08-04 16:12:55',
                executionMonitoringEndAt: '2020-08-04 19:43:59',
                flowHash: '6mck0frz8ozktscdmphisjjw80qs7ais0jt14ump',
                flowParty: 'bl8pq945kpmymfc4lq2quhewbhhczpgw1s3fpqb6q1rng7ts3nuf4ep1ikhq6rz74k39af798xn7wg04yiqb7s4qpol9pm9xysyeaa9n6fd0m8beixh0w30o8rhvyduxsv50u55nvjjto81bh10lsnz3oqiihpsx',
                flowComponent: '7hv41mw2tim8upa8x7te6awlctcabr5wmlcygbw2d1oal9afjevh3pm72yzd85o2qdqca0k0avyju4w9binemppzr40gp48tszrgy79efol1s7lhpmwkpmx4v3h4mhi2yynbx93w7aqcgofybrlx4fcz5csto66o',
                flowInterfaceName: 'dvxzqr8qj9p940968hi802galps4jy0n1mj6uva9d4kfpos24t4wiecy0qhyseiihvq3cqheqhw37bl872jhxindtyib8tfw6fa4bs4iqwvhy5rmmkd1px982l3g1z06fxz645kgwzjt3efv2b7b1ovl7znzfqi6',
                flowInterfaceNamespace: 'myypbyd1ktu4gw6zslvuyyua1auz8kwxfzu7t8n5x5bpuktz60irbp86q18otz0g1vqkn4y4j3gi03hujxpjyfh0m8hvub8bliqp3cdm1mx8go5iotwkv77i7ygsowr0gcoieyugb8358ba94u6dkv7ismzz0hs2',
                status: 'SUCCESS',
                detail: 'Tenetur unde perspiciatis sit dolorem illo qui quae pariatur nam. Ea voluptatibus cumque fuga. Rem autem illo voluptas et possimus sit et esse harum. Eius ipsam occaecati.',
                example: '0d64ujirrbwfwbs06svovq82reo2l7i0h82hvejxl06d6ikk6jjaiw7q6wrpimomedejdo6d7rdvocqrsaiu6j1gh5cl659p5o7zf1esq8wtrhca924f8z7dtcd7yiy6l355o5dhs6naacapssbwz62tf90mwcgw',
                startTimeAt: '2020-08-04 19:22:51',
                direction: 'INBOUND',
                errorCategory: '9iilszyol87c55ywriweae7n3byd42bgwvu1u5vqepjhu4k320ncj2ee6g5yyrvtbzfqoex0g81iq83322y37mdxnvxemndi5eqabwg6u5puk57sqfqb8pcwn6r2awc9eozfjtiwlyh7na3zs5074e9tj2m9o71m',
                errorCode: '56ktno2rw67lyikwkbru4ja1pse3ff16usrw9qj5qcc7461mbu',
                errorLabel: 683423,
                node: 8360976391,
                protocol: '80fe285wkiblywzl39z0',
                qualityOfService: 'er3fynbxuiq19qcxcyfv',
                receiverParty: 'oygy11fv3t9pb3a8vclr4kjlxt4w2ja7re82432pg5auwl7vtcwugn85bg5hiwlpamb6a36bokco0blul7tn91a74t0bfcsxshlu1znc3b1u0h8r6po8la76e1f1h65y8i6u0q9jmiq3ly611o8go1rn6wflcdgo',
                receiverComponent: '2cxcnkqjlqe4dakbop87bakjdp1dk19ad4m007pl4f5lu84do5bt5xfo0ntmypgep652a1cus08w1s0ag2kxklqo51vmgmknxlq4dz6hb4fkuivuxqcevlww4itqbw83fulcdogb33lh2p8itfdqjo9gq6ms0w3i',
                receiverInterface: 'izl7hznk3mwtotehk4sqp913a6r9d804dcx2gtk3ymjbz582d7k9p3fn8i83nv6z4m4a2prtp1lzkq5v22hd8kct2k1wvugkws17n5ljxp3iq5ke8h9e7exwwwrdgvd661t4ldlm01x71srjbux2tgn00lj0cwqy',
                receiverInterfaceNamespace: 'dq7o6cr8ac9penm5xduz0p5kngzstguh3oaigyfo8xt45kkgfohk3l9zrixce6myb4vjl1s1snx1gcckicbd9jmw5jtzgc1kz978yejupmb6c84ftpgmdp5gdwz24v3r4k1jnj74iliqj4z9bfqhqtpgd2p2cqz8',
                retries: 2843396697,
                size: 1165108077,
                timesFailed: 3716295053,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'py3ofol31cf9hj1flunb',
                scenario: 'pb0xvl6gqgbickjqmqh2m1kjsyjp3xvs2qk6b2gqun83zrqbtmqn45lzbhxc',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:54:12',
                executionMonitoringStartAt: '2020-08-04 09:52:19',
                executionMonitoringEndAt: '2020-08-04 21:42:23',
                flowHash: 'do8jljj3tw5r149w9x8n2z0tushk67thsa2ammg8',
                flowParty: '04im4aibusccvb8ofwuu60ozxuhvtqtaimjfesol07cmw871pa5pcrubyhe92r3pul0tz4synwhotiekyzkjs65c1jo3ph3er79l5kirct9qvnmxk0s9nf3fq85fm9n2hsq2gd41whsvk6ydannrabw772izhrd6',
                flowComponent: 'rfk1zjj3ze9khomkh8x7g5e6olr3d2yv13hmas5a0z1jbwqlltf38xw1val666qo7juw6ce0a3ukqsrxunplzfeeq26puqmma2hchxyf15elxkorz6fwwznhxhemlgl6h8jir7n9mfzyuaafnav5u0o0ynlr6u1t',
                flowInterfaceName: 'mfsc4ubkcnpnxoip3g1cps2pe73k5r850gk8elrrj62olp1wd2mjkb1rs7l0bvnl3eubans3xm3d6y8cq84yfelejrtsyh36eskcyalj9nr4r0bcaj7efa5zzrkwpuuna38jdkk2ml4skznguw9cls0y0wrsqfnu',
                flowInterfaceNamespace: '6q41wjjwsasc62gdhrezxcm2e0hk7wxsg5euwxysbxey1wodn2xeeakrgf3xxhij8pf7zpgm6c4exwub0ik83ebp5v9zqu9t96gr4ncxqpdqew44hu64gkp9arj9ksh96zbbs4epjyrfnhpl9wsmsq1hqdtvkxd5',
                status: 'HOLDING',
                detail: 'Aliquam corporis sit reprehenderit. Molestiae natus pariatur est corporis maxime rerum et. Et ducimus molestiae tempora natus assumenda voluptatem id molestiae. Consequatur reiciendis qui perferendis rerum nisi dolorum voluptatem eaque animi.',
                example: '745zhvkqnztbh842bjg6ktbgylg75fq9rsyquyceogt6zjstasmgq465o1p195k1vnf52af6lv37lbwzle16fo1eixu2z79pgtr8pvgsiy32cyrr2t735tyex7ny0a71vwtp8wxe2u33nonb95s5s7v5h6k1tdur',
                startTimeAt: '2020-08-04 15:58:20',
                direction: 'INBOUND',
                errorCategory: 'yot9yz66114jn20214mi5ygvvvgd54uvq42bwdcs721znecp6pee3zuinhkapdedwaj072oskh04mud3k5lok9xf8vyr7ts04gq60u29nc6o1bus8t0broitrixsmadbmijha6s5irx8t06v0a5jw34jhkk1khvl',
                errorCode: 'ybldkajgta6r95wsrbzj2i0k7wc5qyeoiu0alstb3g7fp7pto5',
                errorLabel: 263437,
                node: 3708337306,
                protocol: 'c14m85kqjjdgmw4zc83h',
                qualityOfService: 'm16visq7hc6qqbnnvsvm',
                receiverParty: 'gtm9ysv9hfso584dscaxvorlwuawa6tbs5p34u2m9maqpe5az1sgafdtc4dm90u540cwgjo5cyumcfkza945mjqwafzf4ohtedugusw4msjmymomr1ty3w4bghxaxmqb32342tds9oyuimngiz5z62hym5p0gce0',
                receiverComponent: 'zvay067n9z3dmr26ux4gp9cntf45e7pqf7l7hakisx043jne0tmoxzsbuweqox2174nq7sf6r31ps0rxch8qj2z46akjqbj3rl7y0y4pwjjahmwccjncliyb9kx30eezri4r5eibtk6vcq5wn6qt8fwsdi6kq6u1',
                receiverInterface: 'qxaoook18s7cgjqnu3yx1olv3924odhpv2jxqea1k2rncjolbpah7iqaksqjhjnq53vsef9owlf8febggfn4r3ob15tdyreyb78xvd5ax86208amorup92jgb57wloxlxy3tuff7r13knoks9z4h05c7hn7tiqfm',
                receiverInterfaceNamespace: 'tjjwjg0es3sgyfapcghgdeqn115xfrspzmgkzjl8oenfy4a42tpj0ywi6p72xkznp5un3i2qk9qpfpzqi54yfe7xomrns7mzvyr9ioil42zguyhtdap5pc41druva8h5ravqfa70f5rxnh94a75sgii66ng61emn',
                retries: 8571999112,
                size: 3015002696,
                timesFailed: 2216001772,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '49pu0599paux5gljs5yyunc5ajsp8bjvooc9ssmb7imug965vz',
                systemId: null,
                systemName: 'j1oa5akt5cz83sqtckug',
                scenario: 'zmqv394cada5o93sfpvrebqxu7fry68bfwwsadpf23bmfsfwk5n2eypvjv3g',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:22:17',
                executionMonitoringStartAt: '2020-08-05 03:37:48',
                executionMonitoringEndAt: '2020-08-04 16:18:25',
                flowHash: 'kdaog6jmrdul2tuopdu9i5aqp6s9361hkfaugb09',
                flowParty: 'tzsz9ytpu315ovy6e27vokeql0b32m05hjp859lzq7vilct7npq5a8kfqnver72roa4y9c80vbx6nqa0wdei0fcwkbchn0sxtotrep4f956j45bfeu5aa90zjxwcyhd41ivbypfy20bled3on4oi122iu51ivefz',
                flowComponent: 'cxt5kz2q005tz6v5nb4ots5h0iwhs1xpxqm3qs8c79sku3ak47udr43fpho2gdaoo1rng1lwge3f0e3hmkn0nvdv6iklw3zbetgvliqu2au6ujpzplmrk5rjpv2okkb9de9g5y12u05uaqo9ft0hzpmwkar5e4cc',
                flowInterfaceName: '5xgzecdg5pv8efjvuu10s7t4zee1npvhmlxbjuomcvx87u6iz1xfcz9ji3t36xltcllamgyppdlbxrh7bun38k95xo47p0ihnngsfb836v7lwmthu6x2q6u2qwpxxy86u9woab46byfwd7a91h5i2ybyqyvj890h',
                flowInterfaceNamespace: '2gdu6p9p844rl05uia99msdgnjqj0s9h8yfzok7n6l06zixo7hhap1g29jrbisslt5vtiakjrzw4g2rgs6m1i96lbfobvfglo466kcgdjlk091q6tmyx3oo3mpf25mt9syyur77zynovnwn4z5vu9z8f5w7fh1w1',
                status: 'ERROR',
                detail: 'Architecto sit fuga eligendi unde in veritatis ut natus. Autem eaque id. Ea modi inventore sed ut rem ipsum sed odio sed.',
                example: 'lfuym9l011rmlebpawwh43srmcu3ixb3nep4qcaqeo6s9jehsvmddplxo5190r5c5a2tmtv491hv92iyz3eysc98lvyjqfqxliwituzf6als6u6l6qpv8rvqnmj7lvu6wy5h507atvsqr2rp5gh1p6ix5c3dbdas',
                startTimeAt: '2020-08-04 16:58:04',
                direction: 'OUTBOUND',
                errorCategory: 'prwgtbm7zgphlfnho5231y46ys4qpvlufwzsxne2syvpqa393mzmo0zal0d4gt02g1604n1qs4msawg5u3qam6wgv7qekvtgsf5b3rlqelxuo551da6rmbtaarouv2af5cno63kagpy9hwa41fztc17n6c3tvf67',
                errorCode: '93w9k7vh6qrb3ke802592m6z1bc45mnnwjq3ny5b7qhy43ewzz',
                errorLabel: 622596,
                node: 6526338945,
                protocol: 'rgf8s9vopbu4dzb95g4j',
                qualityOfService: 'eht0gvnfqyhkjh4l78zu',
                receiverParty: 'mnur40dhuuvkrqvezdsshw9ifvlw5g9cl9jz07dtoidnmcyk42bohl4fww55xls82yx2u2rfrhc9f4yzom6udh7hpxzjko4z91311lvu7cprpn1iu5c8vxcxrmzo7mb8m8q5o7zhrxxv3gjucujhhykzho7atgc7',
                receiverComponent: '1vhsbf1kfwpdjau1l3x4rgyolywn4om14xpwxueco4vesdrxi8bd4on3iy41o15u8t0a5n9tv92myardlk8ra8fmxsn6rhcntmhls0fnonsyzbvjs629lqt1avtk48c3pttrpawztee0soid1bx014zqd6ujbqa1',
                receiverInterface: 'cms8rvj2k5khje9muf3v40hz57t6t0yrd3fjp7c39ryr44erbcos4yl4cu5x19i895hjj7rtyx288hxyvwf2xaz6xnl8ppe4lsx81tvraq60mfqankfhti82drfiycjr82ryp364f96vkizdo3o0hctv8oamvlym',
                receiverInterfaceNamespace: 'zl7nvgc0diaxxqvn3w1b6rzb87sttmkrmh9ofmkwsvgysfwa36zimgcm1o6ifr4dr79wvpxzemi6hn4uzgap9wt7zjreo9l9y3c8b5taje5o6xgohs65wkw9onmsdsivhumfcqz9ctv47vnepakp5osku5x71qn0',
                retries: 9193778263,
                size: 3778267750,
                timesFailed: 6132709737,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'me24r7wnv7nmphk77gydh629eud8zmu1nyj4yfxgq2okdvz3i9',
                
                systemName: '98lqpx1ctix4h9ownbz5',
                scenario: 'h709lxdvtyo85yxn2gm81xqmfhktu28etc2hbavp5ktoxcp33208vh23ymrm',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:40:10',
                executionMonitoringStartAt: '2020-08-04 15:03:12',
                executionMonitoringEndAt: '2020-08-04 18:02:25',
                flowHash: 'rbntv3rhnha5lffttdqtgbni4830fb5l20hhvpd2',
                flowParty: 'a0tl9zspvzbh6pk32ork7t1iz02k954a3j3rp0sfpuxriixm4daqnvikrdqddxseedyrj9id3g8kgc70vdvh3fff03kafxp61odfqmfzn15ytbefronve3aolyd4l71fvget4ih8ubksjzz0y7175qzoxc93rom7',
                flowComponent: 'ctxaj2vxtroxzfdel3v1j2os060cz7hr1qz5l0bu8u689u08fp83jjtdjchvz9slsevv7ab9bp6sb3liysbb4u1eooutyo3og28gi4w4mh1g4d603cepgqrli9mezwjqmx245weu1iys2oxcav018cym90rznd0m',
                flowInterfaceName: 'ciziemk3oknleg6vd3vnraram4gd2uqmshtzyg3sae4cid1icvs5bre4saa1l0ydssjv6bxxscoq6wpdpkac920p7c2ot55h94a4yy95rwgw97wj6sz4tf8c3dknobtqh99ijbkt0zdz5cnijf3f290n6ubunvcg',
                flowInterfaceNamespace: 's8fjc5z113mo11gnqnk4xpyi5j0ty5gab47e1ly10r93d3f87k24t90mfjm597199vaf1vwh4ey1qy4o239pdoiz1chshtoa96b31nut2idcvxky8x0vgwkanbzo36uocmcp1m5viy4rwxt1z5vcxkcl1k51q392',
                status: 'ERROR',
                detail: 'Magni quaerat assumenda voluptatum voluptatem omnis placeat a eum. Earum qui sunt veniam porro. Assumenda tempora at iusto dignissimos voluptas repellendus saepe qui. Inventore sunt ipsa dolore vel est eum nobis ducimus modi. Facere sint consectetur repudiandae libero ea.',
                example: 's1sie6i5n1ah2f0yvfk69vt4ue9247be2s6v2mf4d1pa9yezqqi93v8d1no4uoihapplm9wvso1x40izpyp6q9b8619f1otux94qpl77ezafk0l9o3o4iuzdhh88opllrji2o68mrt3m0uixnryuntcn57ulll6m',
                startTimeAt: '2020-08-05 08:23:02',
                direction: 'INBOUND',
                errorCategory: '1vg7l9r6lc5kv7ny6w4owwysca57n67k20u09uhxiu7ekvujs1rg4k3xult99h486nf1gvemqm7fp1tj5cpxivlgo5v6f5u2uz04k8yde8er22yj73wjt4zt01qrioeh2vzqz2yv172mflmxklejm2nxj00llnjo',
                errorCode: 'fbgsmkb8zdrw41dbp9uvtzvuqdrqdhj2pwkual0rejfqbatyw1',
                errorLabel: 948723,
                node: 8819996251,
                protocol: 'lqt66q2ivsw0zl7q6hgt',
                qualityOfService: 'dk7xwi8ltmqx8lt0jucf',
                receiverParty: 'vhs2lhli9d4ljqefm2kk0aunwyrkawwvbi25v46jkelrh1wkgbgpks6n8wtx2klr3yrb7hrisregw8xyxliu3882bz929lssadfznablsfcjybppmjqx6gfdz7oqznzidckvfnsnrxyazl9abd7yrsgnd1icevy8',
                receiverComponent: '6bkhbmo7twscy344c8rtcxz4q3xdcsglonqisbj4yi1t65nqfsb26aktnplatzv6eltt0u21wynfezrt2yko884c99xieqv1krteqs05m9vxkcjfxf0pnllds8k0vo61w12viane3iaz9m4cbexg7l86rcir0t7f',
                receiverInterface: 'zyxloehdnl9z8qj323xoapt7eywpslqcxeiwf3cko7785y1htpy712v3jx9pn4oqpmi8gp0epv4uue4r5uvlrj1nx4bnc5b4vnij9jubnh6zjfld4nw7pxcighxezslyd8uplv1o0xqqbfmudk2tzxtxkkwgxzlu',
                receiverInterfaceNamespace: 'dxc4b5hs84jz69qyndusy488ojw0gzo4rsqq7zuj7wmrezdxenf5sng5o21ekbz4iqcjme4v9pyzg7k44yg7m0y9tn69omqckr7xdkxwx8zxk4u1vgmhk12jc3nsfcteh4frx58wep0wbf7j6zos7bykwhr5s7pr',
                retries: 4267862329,
                size: 5711036224,
                timesFailed: 2248422356,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'as1edhrl3ppxhpfeenfkbyqxnspadrub2n5au0a3ps0g03repg',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: null,
                scenario: 'y03xupe4yk88ncl00gl71zz3v3ipbygxlqug7ybsxn768ti28zwq5rem0k15',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 20:11:07',
                executionMonitoringStartAt: '2020-08-04 22:32:16',
                executionMonitoringEndAt: '2020-08-04 17:45:12',
                flowHash: '0kdbjncvhfnfvp7ydbo4rux3allf78h4roakhowg',
                flowParty: 'fer66tnpx6lxxbsfuoei3886lwx73nm8z6nna3l21ul621vb7pkm0wnpnfq33puymw4cdz0dvu2mglziuvhf8r38xfzthy4jv04ym62ptf0nb5h09tj6lrcktv5a7ueh36zf1p3dvvbm2vrwl5o5foqo060vai4m',
                flowComponent: 'zpvqessoxrohg289qf7cnj3nr9sgo6uh6hzcjnw640zltddxfd9kixsywri9qlc7v94bd4smmhajkf9vntvz586xrox7rra0ez8y8zmbxa1g3cltpit7ho3wt586s8xv0ho6bp873vxoh4gj1zkd3f3xq6aw70u4',
                flowInterfaceName: 'mhupd9vmcij2r9vubtxzrwq59vmbvdkfh82l8cz558gjri9iaxmo1ycenwkl0sv285k4gxhj61zyp9aoiymgawn1myjo61qoj9h6e52tf12fpo93dov5zi3t23htht5ueav7s4rw9zjmusvxgursvtyh5s1bjiwp',
                flowInterfaceNamespace: 'xbylck9xqshfeb4za8gntxeadk33nqra2rldfi8zhro1w47rf7sw7d24xitss1ujt9y7x7hzl2qnhjn6toq1v9malsqmq59e1g9os8iky5rqe07a2d8xtnghishzq103bytjnfleeafwd7qjkbjwwo133mko9njx',
                status: 'ERROR',
                detail: 'Fugit itaque quis placeat deleniti aspernatur aspernatur et aut. Explicabo laboriosam exercitationem omnis optio dignissimos pariatur voluptatem. Iusto architecto et velit architecto sit quo dolorem. Temporibus ut blanditiis dolorem officiis quia magni nam temporibus. Quidem et eaque magni omnis veniam minus.',
                example: '727dysbxe64vyiwxk19eezkldxwwsu69h97s99ulzfszd7zc1vnix6ox0inxmprufehib38yjon6gjijb73iq1rwy1tpiaaeoniomjuwcuevla5g01dbywwm753dnilkixk9hbtjpuhly6bqg4382yqughq891k4',
                startTimeAt: '2020-08-05 01:59:37',
                direction: 'OUTBOUND',
                errorCategory: 't80pscel50svmkbb9kalc0ugwjgcap9jsatue9zmbm8juygndd2vhvi3wof44hynywfarqamxwfqkia3kesl9fipf26pn2khgvc6g3blya7hdtmbpcjxckmcbp3pswhzr5c7bwm8kkk2jokdgwd6qkgmelxsa05s',
                errorCode: '47yj6oeepfhkqk5s8u0qbq79npaxy3s9d17dme0w7me9ruo1k5',
                errorLabel: 834765,
                node: 7565711198,
                protocol: 'klwmk4p5iup1v8d444la',
                qualityOfService: '4jk3wdtho1lay0euqp6w',
                receiverParty: 'd0pszn6sqslwqpoewnq74h8n7brhlsd1qzkd5jhejyggl56t5y1qvalqioaqnzums7jrwj95scv2kn0zw9emea0yan2mjf8n19z7zo28jaw5sapbdxa89us4em4fdrdxcrznzo24lyhajtiqpcrv63us23u9iu3i',
                receiverComponent: 'ckjl30q4mwl5b3a0shovtsx05y1masuzkulmsy8uvu1zf0cw11iukg04lw382xy0we8a412o6goxsoxu1qwu0o1s28qi3i7u3yfypb9kve6pwdoqbuijwfwsdcipgry0gpqy8es7jgfif4fdgsn96q9jv70s1h5i',
                receiverInterface: '3e67e61m39915q5eklcc2hxn1ojxkc89zgqkvv29rdu52dhr27j31xt86f7rpjl926hwsu6muenbe13t1jpkhnu1g9fpt83u7sm3r2h9z2c4w5w23pk6d7o7qb2xfadxscm3b2n84ym2jopbs21bq4jijtv2vrox',
                receiverInterfaceNamespace: 'lk1loyrfh7dkc4d50x5yuf1qdh26zv2pzk7d6067km32jnerl8oozg4vvwo5bo6a7lcjf1pjgs0win5uusjinunzka46p614nci15yqgzh9jqpn1w3zcappc9jknph53gldaoedzhkj451qqnewy0g8zbmrct5ku',
                retries: 5268847308,
                size: 1396645911,
                timesFailed: 8284827905,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'zgemm0s5b1rjfm59v8ajevsvh1ar5eusgn9ixgm9qhlc7e37ev',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                
                scenario: 'rmzlppvq2cd5cqau1ri3d9ddnxesmuduhfdhalqf8vuf6ffiotefrjlotsm1',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 16:49:34',
                executionMonitoringStartAt: '2020-08-05 02:08:09',
                executionMonitoringEndAt: '2020-08-05 03:31:56',
                flowHash: 'uogkui6h21s3rztpu87drrjk243o6opcxehf10hz',
                flowParty: 'jtdhjvet2002oxzpuvhiu821vyoynvrfrq2axed48vakiz4503pkw5iys3lx3wnubmzaan0y8kz60vdj7lnzqur130mmr7h1g769qrn9izdmiif4w5uxlrycdbp8juxi0i0y9gnv4kzezh934frxch647x34sy8m',
                flowComponent: 'z94ysrbcf29ria7egv4lwy9igpog8ubp1alcoeyu5o2axxo3pfi74dpx8qjtziobmm3li69uu99iexkcm3y812fcczi8wenk5jbw6zlhs660nuz7hn92apbqt4a2g3r70do3nzo0wd9w6np56npypjffrtlzz47t',
                flowInterfaceName: 'x6hop9q9qn34wd22kuim4i7qo2sgcula5iq2njve1kour6tvc8rrscikhxh4zbmg06qh9eaoic1ednmbyttzsx3lgjuad0a6t8v8dvc1z3jvjg5fz13rmneiywiqgch1h9fvgh4ig1n3kb8q0289zilfeulfc5m4',
                flowInterfaceNamespace: '7mcfnvyyblcel4mpc6y7fja1jywqxeu84nzmgnwulzuc6wum50fsfxx0dgdkzfenspw66q6qdjhi0wcvznt00j2td4eo4yxzvl76pud0gtgv9kqh03bchs8fnd12ld6zty3j6eb2mqgq29d8kd85kacj5pngxtns',
                status: 'TO_BE_DELIVERED',
                detail: 'Dicta id et nobis distinctio quis magni. Voluptatem voluptatem voluptatem in enim et minima excepturi et. Aut aliquid recusandae accusantium cumque quos ullam quo error quia. Minima optio aut. Quod vel voluptas.',
                example: 'exh8du51kztfbzi6wauml8no4o0tfc2rymkey93iqggsikupxd795afg9rpdibgnk394cy3m2s6m52w13b80lim3gyewylft0hjshdm79qdx5kywp9xuegxf5wf3jmbl8jakwoi09qwmzjexgy3098lng63enpig',
                startTimeAt: '2020-08-04 09:08:11',
                direction: 'INBOUND',
                errorCategory: 'emyv3hpsdykx6512xu6jjn10r3ouc33h247hajhvhvc63qqoop9p4yr9njpfprcz4bko2a6w39mnzk0jn10qfk61s1ev9mugvc2tafet5yd2b4ouk36govtj93v80byqx39lmx2thiy7k5hilc1hjljq3z1zbpn1',
                errorCode: '02k02x4d613wwg78b1mk3uwimrru6hg2slvvirmxpzbp0f5fly',
                errorLabel: 224013,
                node: 9732486700,
                protocol: '52xds07ufz79w2o8cjen',
                qualityOfService: '2qnb2juapeh83ambr08r',
                receiverParty: 'sywy5ib30ej90mrs7n25o2x732cnj0jalnkl99kqi25jl57ko7vlrcnwrypooximau40mucui1i3g5vvc5tresp11coyxzhefhaftalmqfxgpwfbwbuumggxfsn9zbkle2zdnmz1vrycbgs4o86y76mu08jlegmw',
                receiverComponent: 'lmyspi1rd2i3iaqxxyvlhwh69js5h5enhkmbqhtq7n7y5tgp8gxbvfj2kgmhl25rid6d1uhw9tn91imc9c683thevptakk8x3p5lwwtfz9qutxo91d1lkjldagw1800zdbl2sm0sigxk65d4q94kzr3cme1j1vqq',
                receiverInterface: 'xx3w6ividhcj7c1095uvy435euzaduob45pr9l5ih6zzoyz3qjuyktq37vwl63z0g5f3lkz9xb0sy9rljwnrnqyrmmbu2gcwdl6tmpbohc4pl60qa6uqgbn48uk2vp1b0ovs6d36kc3dt2zwtq3ww358qvh5rudd',
                receiverInterfaceNamespace: 'xnfklq21xwjqx22xmfn0exwqtoxxb2v5gevdi132cmbw8dwf5lyf016pjm531l72qag7wpxax3cmhwqcqw2r56ak89f8g9gfuujvbpr43cixxkh1q7mxbe5tam3ah4izsmupo1zpau0nifv4es8c7gelr9x9176k',
                retries: 1386619851,
                size: 4707445440,
                timesFailed: 8467237408,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '68vocmf6x2abc5opoac14goysu2zw1a1qpeunfy6fyiayari20',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'l5mhablckydvjikenq58',
                scenario: '08fqs1o9o92ne7sovy28szba8tmej9k24nowqss13fk87e058ipk8rstka9p',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:29:56',
                executionMonitoringStartAt: '2020-08-05 04:15:32',
                executionMonitoringEndAt: '2020-08-05 08:13:44',
                flowHash: 'bubeqhhrwr047h67cebkgslctetb9ktgkff8x9pf',
                flowParty: 'wlkiuvt09s98gpdigao71xcsjqss8l3p0vnvlsamtfolmoictwkl3tiymdaqhrptdnrnro7zimwzxi42cozui0p1aan9m24987eahgcxux6xvzwz5jnpxl5g9cnrazv22hliietbdejfa4xw7tq2dongokjduudw',
                flowComponent: 'miwze4khlon49k4guuiriat9qt1gzp4bfs0uxcdxtciuuh3wbs7i75zbxxda821jvccdsnecsdtynku37r3jjnn8k5f30p7d7tv1c542nqkdlig8duqtlsce5klj7k9m834ro59ow8u6xpdtfes6afv4pmzkcj0s',
                flowInterfaceName: '0l8pv0oms9dj8vkz08gn18xd6cu5yzdu7jfunvptr56zi3givoc1cyu39gy5i9nblp25ons96feukwu1ntwdeauw7peapagy9o1nj5m2jqa36yxxbjngis0o5wqp9430rck1wk65mcftaixi84lihcjh4zexmgsc',
                flowInterfaceNamespace: 'qhgwp6lt3q2myjfdww82ik35ojx2aah3g6innxq48ahd997xkqmvzdopb7klgyhf2h1qyhcw0ymqipi5igxz46nptrx4qe7uv5blkr9rq3bpy0y3trwtjlwryrcnoauxnexgzj1hui4lifg2gptia0j1lysamiha',
                status: 'WAITING',
                detail: 'Itaque occaecati et. Vitae enim eum. Excepturi consequuntur id dolorem aut. Magnam laborum maiores architecto ipsum sapiente autem quisquam. Similique repellat veniam.',
                example: 'n6xx0yx6nrdqyfxbjcln3dyhlcvqe1wrswy8m9p7cjqjndntw0rfxn7pe1su4chrs6i0706lj5aa7g690n6rj92dq975brjcu22omw49jrz5z3g165ggy7ovlrk20pysocxrsd0lzrkh7o5txrjapp452kyujp5y',
                startTimeAt: '2020-08-04 14:19:05',
                direction: 'OUTBOUND',
                errorCategory: '8sdwmbce3qz4w8csfbk5or5foys593s5rq0xy7mgpr9yehv1yuufvaswa2xtv7s48zun38eadl77ghifvuszmsnwe6h9e3p5kk3p9aih8am0rhgszmm1yu51wd7khz806dz6hrazflyrgrdbxcbeqjkz3qepui49',
                errorCode: '9faluwdcbljf8zwiuqqo50ukkrca29izymraeuaz6qqoih78bi',
                errorLabel: 582388,
                node: 6627313427,
                protocol: '1ibsmxsvajkzkxgo6733',
                qualityOfService: 'sxb2pp1hoxzsuy2kklco',
                receiverParty: 'wgiw5bsy7k2q924ci372lxi2abz8ygadre70618gwdpdfsnntxjc4bponi60kwqy21fcfyn097t2snvgfjb36gtxc58xnvbzzrt05a6u7dguv9441w7xssy1051siz4vkpe7f68ekxjd9cy0g8247s049k1iywkx',
                receiverComponent: 'wioa6vbsa6h5jje65ly7hpvc52ozsm6ivtedwic73dw338oxpkel1rt1awfb5vgz8qvyvuruekacxxp9q5150xu6v3z5d3vn4vt36685iywf7vdaxe79atf78yel5rgu8zcraqnkf49n1xjas82w1lhplugh7yh5',
                receiverInterface: '235uiihwhliywa1hvu1dwxqypqm6x2sr9u6kkwgp65am7c4pizg3k4xlc8aryj462p0fa9j2uhlr9to5hmmil4txv5yz6blgu6lhzd6htq4rj3dsyu0pbh8kpkmdvj67xhvmlpyi0lp47i3xnq7i8x4mmrxpondf',
                receiverInterfaceNamespace: 'mv4wwnf0bdw659zv2yv7xxsb4lmk7mcpgidsr8eekjps7s3w4pq5wdtlgdjsmmvipzwrj2i1rd34q7k0a1dupvzljylnafg17wtzkvaxwusy4hakt3vrulk665a6oyfws59ubp05bg3ituhdgpk6niy27be04j32',
                retries: 6579869920,
                size: 2032854468,
                timesFailed: 8445736386,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '2jho4qlvjok4hjtfbh7hzdp5fla6s2oo7z3c7tdl9lggatq4pw',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'ma6wjoah8gsqqo5nfhpi',
                scenario: 'u3rak2cibzbseqnsuglewpm1giya0qrle233vnveibf238fbxayl1fg3om7a',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:39:37',
                executionMonitoringStartAt: '2020-08-05 01:46:55',
                executionMonitoringEndAt: '2020-08-04 23:41:07',
                flowHash: '1sp2ih25o0ib5dkfbtxws4lwmohjei6xsfudvboh',
                flowParty: 'dog4rqm7kx9kda8fcy7mzm3wcskxhnv96kfvdlhomu0mda0m16ro2s77fy6ymasavzq7ko7087da5x2phyxde9fmm4ruvd6wmeu5wno7o126buhorkh10pcm2abz98yfj68elhpchytgy6y29tfa0szut7rvgegs',
                flowComponent: 'ry7mtxwcgfl1sqkilns1tsuw7z2dqvtg912evbnezfanb4m85my8dbt3mhyg7czo406o40pnk2t6zglcnut2zuis69ihtxqbsldh11bsbtidib9atmmq99wr86lvnc2zxo1sjo2bov6ambyqsoqa8ua6dt8qxnr1',
                flowInterfaceName: '0g0rbjwfg9px6geobapc9cfcrz5kxl4lhosorijvtxp9hdxkmrxjhlga09u7gh0k6by5ufaqsk5wfn1wk6sd9uk8atf9s15sfaqwueru95g1n0hy0nvy9usgbndblsh7sq2xe1l1zp8sep32uy8rfat8kl5bk1tf',
                flowInterfaceNamespace: 'yedyv3ey643oridfniy8x82z39kt78ztjv0h61gunyafn61x8qo4pppzpv7u1g4341dacwhskrk369p76ld9enq6ie0ly88fcuc1a6ucjx79cu0hg1wkeq3m0u6a7dbpnus7up46ftk3p5cedgi5vsnlkov5vs29',
                status: 'ERROR',
                detail: 'Reiciendis sed at iusto ullam voluptates. Officia illum perferendis deserunt. Et consequatur impedit provident autem. Voluptatibus eos laboriosam aperiam animi ut dignissimos molestias et commodi. Quis non officiis odio nisi deserunt ad esse.',
                example: 'iaiuo82y2mzk08mkdds4pufyl2gk4yddpuky6dh9c40l4g05irgjrq4ogvuflamtjwzwuvqbo6gtllift6jlhjvaxs4qf0s1curiwmpb9yrb9y55mn65xt1tbxx00tkcy750ey36fmhwto5vf3vpqzn6d88yzah8',
                startTimeAt: '2020-08-05 00:24:56',
                direction: 'OUTBOUND',
                errorCategory: 'flb9tkqunigl7uq9ig8zdf6h18smcd2jpbmgbtu9pqyoop8j8zu37gz4iszuhj5krop0hu8sw2ms5yi0rs4vhx7436edh9116w3hvrjp9mco146br11akbq14ztf97d1s8tbq765bos4eg9irysnzh01cz2fstp3',
                errorCode: 'mvq1hqnxyh8qisieae1l6ov2cym906az8m4e77h91mszvgqfb9',
                errorLabel: 175702,
                node: 9210643286,
                protocol: 'kdyf8rsnqb6boq3cs2bw',
                qualityOfService: '4b3ess943rs5au9ivsb6',
                receiverParty: 'qkh33d1v0sauh2t243peyb8dt7f3w4g16phlr94nn9ahm46800oe2v0w8rwt4gf9idvb2uiybeombhd59x2a0m9i3em9rbz8jn3k43405r7exfupla0k3nezsmns2nvmnkxpnidyb9k2hrd8qdrs2ba4l303ll15',
                receiverComponent: 'lw9527pnlphrmmjbwad66l7mgbzwd16jjp2jqapb3h32zxzum76sudzyduoh8hft72fjkvpsxqn5ttb6tcv08c2zhrjueyqmydwa2ydx3028yfx1gu6w8nygkxx1dgqsekyq42zrc4xpdj7bjg41bvqt7886a8ot',
                receiverInterface: 'bru35xo6er7k0z6394ag1dgf8efbpcg9zbpoa2p6d8j9q7c518xmzio02gw9z359irhawduh9u87laq69jqgi5qjhlb6uifvrlk0infqc3bzzyrwxucometi04k8puefhgd7grwar23votn3ato10jz476ex1qqv',
                receiverInterfaceNamespace: '1ncx2z2je6gbzwxu58089vbvzm9xtjh8837t4aerqb6kq1jmznami9bilajfaieeq2f254mpc5re55qf6r19p9vzep468kmho7n1j76e4c2mt4go64b8v9zx8639vjnl95fo49rlpx6x87s2ptnnvkc5jhx50plq',
                retries: 7144152630,
                size: 9640045079,
                timesFailed: 9105325301,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'iy5d1wghnzjmr2erycr7nbbafsk964xk1kff41uq28r86prc19',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'elyatii52sjpk29xu6mm',
                scenario: 'lsizazzovrkan2klckuydu1ds9liktq8mofq5m7c5x5bxqpn2x30r7kf5ykv',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: null,
                executionExecutedAt: '2020-08-04 23:01:18',
                executionMonitoringStartAt: '2020-08-05 00:36:07',
                executionMonitoringEndAt: '2020-08-04 17:10:10',
                flowHash: 'acanpj1aevu7jl8e3bianu801ftufgvmor3v01be',
                flowParty: 'ztevf7j8dvkzkjedh9n1zks66d6vs9qeimy73jj7bxpjyojmk4cib0zrlraw7vb8z7tt400nj6f8fc2ugzehb8plx0b4hf7pm8r5po4y99fxwdznwjavqhlf7dp4mpa2b1t98qw0acnfxywrw1vdq2ed7iw2t5jz',
                flowComponent: '4gc01827qnyrz3dsg6z46haw9k6g2uv32aqbu3u2wkramchrgz0oekszj83kk47p0iccaxgtj85tbtqj286ppvef6hw5di3gj5ajn91925a5kcx3vd5uij9of3ghzwfz62i69grpc0h77357tklf3b8wy3e0nvgi',
                flowInterfaceName: 'tzgqetg2vrw0tecdk7or9vdoo9x1k8efdfaodwe5jsvpy4f0x3uxkiw1uj6829y1j7rf6jdtbwb55x54wmnjaafh6u9hpfk37t3qyn1qpnjn31tuzrcnk7m3tgtm3865nc25g71q4opv3mliv22nbisfbmjs0ixz',
                flowInterfaceNamespace: 'wv991a516z1tnl1i4vw5tlun2z7424xx7adnw7v4jjmiar14ipf6vvwyojvtrfz39v3ucyqcy1ojaf8pyqhjfgqbdtg1r0pz970efg9z23jeda3vg1wdsbuzg73dyvxbujbpj5e2lxtdcin6aro96or3d937o479',
                status: 'HOLDING',
                detail: 'Consectetur itaque impedit et necessitatibus natus eos quos ab. Alias laborum placeat. Eos sit perspiciatis asperiores minus beatae harum dolorem enim. Cupiditate et dicta ipsa nihil saepe quis quaerat.',
                example: 'jeetto5zsscjopt87y4phwixyl4rcbvc4jjdzg0bqdyrokbozzlr7vpu5bxyc0ntsqdhqjwv4rnopdewj6w3otqjbj5n3fwg0tam7xjqau1buahfbzhaamr53xzc3fqs90gx0oac1hc9rb5vz7vdyz3h4wtqu3bk',
                startTimeAt: '2020-08-04 21:37:50',
                direction: 'OUTBOUND',
                errorCategory: '8x7lcgo44wqqpym0n20fqy29konmzcv8gn7ewll83hmc1rf5u6g3z8j2thxug5f3nloz03uubfw52xi6m3cx8ul63iy8ipr3n7sbwu9ieukjzne1faaa9b89saftsuj68mhk6vq08jfxu5imdidxpfllne3azp3m',
                errorCode: 'iqoy3fgjnjphg5tk4kqki242ihau1p9ta3ffvxyu0e8qotwlgp',
                errorLabel: 177685,
                node: 9525749331,
                protocol: 'rj4vgvkapdcx476rq7nq',
                qualityOfService: 'kfcz6a94q0t78fh23wj0',
                receiverParty: '8g5ogzkhihxqy5wljc5gv89feglawj42mnjlqz22e08nodeeu1z362pl3mml18sjhngr8jirs980yog8bp6a412wkvl3frhqmb3bsju8rqsagq7tlwidkbvyafn662nog3dicdjhhm2kakm9st2iwkf27pmsdi50',
                receiverComponent: 'uau25s16xvrdspkozaro1syzqy1v89igyl02wed5q6cnkfgztlgxpd7ly2u9x1fvb2bzkdzp3lo81glozmxpeokm2x1ylrxr9bosk1tpipwc4sk86avhr5pcu987gm9burfswsbvelrbo910xryz096mc1229awz',
                receiverInterface: 'gmbj3bsbdocjg3om6a2u85im4ueyz5v92u4l07t4eymmue5wd5uuebbxpy7ys5bxen6fkj4gxcd9lui2b2osrwd7pz0ck0wh13vnwaccifww8eydild38oxgzm4fm660liobffqz4966j6ju6fmdt273nkww5033',
                receiverInterfaceNamespace: 'ja9vtnay4cx2mmybn5hn0c09nvjsirjiwbw0vrpbqpajs6075i13yjz4wntp2ay1tbjxeb2xp6hw4geakc8iqghya7elsjcqixwr8kr46ii4uxlxuo7s93p31aig6nuy7c0u6suhniwm8dpj33l9gpj2fxe05kjk',
                retries: 9265478199,
                size: 5844257840,
                timesFailed: 7467556773,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '22yfif0b37vru5chyeeazfw0cgyxi52yx7bpqg7sjo58b390il',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'sjh5gz62ofdn1y7hmx1i',
                scenario: 'qtlpjqdvuzpcmnw1u3emwlhj00rkg5u1d40unpssssg87in7dl7a6qb8oump',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                
                executionExecutedAt: '2020-08-04 17:12:35',
                executionMonitoringStartAt: '2020-08-04 21:00:57',
                executionMonitoringEndAt: '2020-08-04 11:32:03',
                flowHash: 'h2bxh9np828ovdez6lthes44kanzl6j0lgr4nqyr',
                flowParty: 'fq63vwxd11jvs637c0aeoe806icu1ppuiwxehejdnm8xi1gt2pm0a7eww0wo82oml61rlf06xur1mewg3ytt60r6mecp1q90ot5skj88lfgvehykf1ku0e3ixdtn41svvw58lp6oagymhatahkfg2xxms9t1r8kc',
                flowComponent: 't00xppzj6ar2r3ibcb8qbenc616lo87mf1wu8mb948mtx5kpmkch3avklx3yj5d6nc5t5nvakfa0diki92hk12ixmzktjxti7z12q152bj9eiofyxfp4ysovscetzska2zlcw2yxapf867gzlot9bgvp2c9eau86',
                flowInterfaceName: '3q1ppkxuocsg9q59dfw4a4bu200w0ph8e44nsagnjka6igcunjfoxo16z6j1zoz2snyeytdc458w7lv2yew6knocqyctnss5peiq2bdq3thifhkaqnk3o4p6rtf0bj5plm8am9hemfk0mlutz76srk9hbedx67nz',
                flowInterfaceNamespace: 'l2n4xkl4ai9uihcxbs0w9blhq5ct9ovlih5yx1w1ebb7em9kmz083bx0dom9e14p4mzpkzu2vv3g4p85615hj6xbhe7gpmpkrfplngxz4d7iwsm03a4yid54on2is76xp9xb2dnlv78e7oba0zv6gl4k523tur9s',
                status: 'ERROR',
                detail: 'Voluptatem omnis ut. Nemo rerum molestiae et ex velit ut similique culpa laborum. Delectus omnis velit. Dicta quam quam iusto autem. Inventore ipsum ut non itaque minus. Est beatae autem numquam deleniti ipsa.',
                example: 'v2ukg54k390kzub50unt4jof9cum9ertyt4dpgh9h5xou3kzfc9isgp1bfc8g09cx16wt294ye69axoynzaam3vthze9q7pjdjed97gqxen6xc4g1enjvgbpeyvebxwo0nwuyse1gk1ctx92nlx5a9nn0462fwnv',
                startTimeAt: '2020-08-04 19:44:12',
                direction: 'INBOUND',
                errorCategory: 'yk2kue0u2tlkuph35vlqx3zpkmfufdj9th84xzvonmlg8exprlggd68rq0g39soqsi2k5ylkneryi7y9xnycj2dvr9dramkrz1a1y4s9506eruev6dnle4zfzxtzsunrf5sgj6qjk75j3yu8va4smn7zb0883si1',
                errorCode: '5ibjo0udzbm04yboowe5nrr43upqpn8hqj5x8vi2wl6ucsp1hp',
                errorLabel: 543948,
                node: 6992769421,
                protocol: '26itj1e47dknh40j8inz',
                qualityOfService: '495c99belki0iznickfq',
                receiverParty: '5n2jiqxlyhket8pefpc0gc2ddlm33nqrbjwjd26gs7pdhyotkiins70ammo85huuqjzbwk1737c4p82c8np05q9q0qv9evvu6kaow03vdzfc68rmsbp3wkbpkse2xsv0djbe9efk20nyr4bufep084y1vdhboa1n',
                receiverComponent: '476o5ns6zoml21d9c93j0urvi9lwbo1qhyt7wxmzzsfnu02zr4v45dxrdykguzrv1ldubfyrh1xt426pcowwcr66tsatmfx8frvzohemluwf2r1yfjwos30dg4rs0sja4anffmhq887c2r51fjh31b3xkqxncpwr',
                receiverInterface: 'vji3bede4dbl2pneutzvr349sz0ei2a09qb3yuqqlept4avdeojlca2kudeq3somd347jg7g82qwcf8p4nd61xki5m2safgnrvupl0hqjgu4rcqez12477wy3cm50ov9r67km26llryyfzd3m72havxan59ifrl6',
                receiverInterfaceNamespace: 'mxise6v658j9mr3z6kr0yefxlsvoj40qrxspo20vcfa70stqfz8o13zcqxerj6tqc9z6mrmgcrsidk3b6rwvnqhrhly6pad2knumpixgt07e2klvtayptf4rkrsh84dumri9y3817j87b85qknwbl7egwkfs0shp',
                retries: 3226693663,
                size: 6227974063,
                timesFailed: 8541460324,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '0tnsbl6bu88vflqlur89mqllcu5h9fkix2i5xm47qzcbrhd08m',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'he0qmxn8lg2kybo5zfhl',
                scenario: 'mgm1jlkon93ugajzjo1jqm4jdh8r8pcer41ul9ua0ovgvha51t99xuhuy67t',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 14:13:16',
                executionMonitoringEndAt: '2020-08-04 10:19:43',
                flowHash: 'z5zyzx29rejxhi4ok7du2mp56ff5ynyweq6efwpd',
                flowParty: 'q7ulqqriy3gf114omh4eixcpjle6h2qny2v3mwx3hpcz6ky647hzblfi60honle14oewxxashzpodcb5n029h3ljzlaxe6esonblo0q4oy10298w9ffqd4ktcpx4rqo3r7ica2kbww0ppyri2w3b38frerz65a5g',
                flowComponent: 'r3u3j7u1x4ih3wc67hbyvqxv2sh8fsqt9co957hut9525mz2iiafk6u2pepehdsklb0w31thcsaflqa1t0xl3jq0upbywb3dfroidy1hlyz9po666h0imvsj04qb1bjb7rmp6hheq5rj8di430cupyfh8fl7xt6o',
                flowInterfaceName: 'pnwlgeisnywijbcdvcxtnph4ml27t17j65ns9linae649xb2yepcvnuo8qezd5qodk4q0yse7pef58zh83t6fjsl3juidwy8u0wx2txwhegq44kiugm4gg38e0fnr61e40x66q05z40z7uy3jdbo9r0yu6qgxpzy',
                flowInterfaceNamespace: '3k9hixc7l2bph753ysezn5pl0g7zasijdm2y2yad3xie96bc85pyjwvw6m4d9yrweqywyog74btromf8fta2h79u8ilqq8ijnt2qutbmff04meyhouno4fnihffa3syz8ga4ympg0krlga7aig0nnhkvf7xudjr9',
                status: 'DELIVERING',
                detail: 'Autem expedita rem. Ea deserunt eum. Ratione ipsa delectus temporibus ut similique earum ut velit. Quam omnis id voluptates. Eos ipsa aspernatur voluptas modi praesentium sit reprehenderit nesciunt.',
                example: 'tb9wiww1itel91bsuh25mbob31pewj72d2bee5nk2e42a7ea84r7bsma1zg80ct61609nhbzwjq6up30ch2jpzp0t352y0dnryutc5r3179l9nn2l089lyvt3gkc6v29c3zulkp9nf2ynsun85yyrc8h6mx44p6x',
                startTimeAt: '2020-08-04 14:19:40',
                direction: 'INBOUND',
                errorCategory: 'klkahoitafxz1gsmxo9udfk2ddb7p6k24wxon2c13u96ham0u2tv74fsqlas2q3vpue4hse3tr0rsq3d6guma0i0jyzpr34ylsn1ha81x4g62vhb0mbkigqyozuo6wskchfqduvmeva6uek652str2193wbog8sp',
                errorCode: 'fbig96j7ikhwnqinr9cbr2wagycxhsk5gonnat0faud3cjdyoa',
                errorLabel: 201733,
                node: 8420348618,
                protocol: 'eqgeebogncdsg3spztv6',
                qualityOfService: 'tpqa1c7jo8vuq0l0klsa',
                receiverParty: '8n6osxdg7qqoyqo309snwuzma22w18ykucf3vnbg3wxk3ymcv37dc2rgnm7i0ff0k95frgmutka254y97r2flhmmmetnhwg5ogys741okalob8j0t0w6prl3u0ustwy65ilj6p8ar1tjbal4xsy85wtdh36x5bx7',
                receiverComponent: 'w9y1296z33zsiak0r6fpe4bnpxgsj5zv1iw881sfmtcczmxpr1zkroemofa6wph92yo3n14l2otkpz5syxe55ll5qoe4f3ktj055oxi3fn8zdo63sm4zlugn5b7jldxew5691489h8ji001l2c2ehu2sofc09njp',
                receiverInterface: '5sd0pgr6kh6az0jgmoqj0w7v4fq3uagjrs17sb5scvvsba1kh58s9iktgyo2pj3hifzgxivhchzngf3c8bvwhy4w4awc4scrqgtkd53w82z9gk9hkr129vz102csfcgwe2qv112ruwgn7fukv75q10ixa08wstdi',
                receiverInterfaceNamespace: 'z5abbom7ybqlkvhwot3rp72bdnuy3cgzxgh2bkn32ifuoflvnj8mg83plqptmanvzprvx0uursupulvn51x9u82yh4s7hrcl6hsuf38zsitdjr9bf1wtag1qzxmjt3vjsmyuieod495ny6grkyks2xprr13mqdz2',
                retries: 5642703493,
                size: 6846249995,
                timesFailed: 8473044118,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '44kxy33f10cm2nspcfw4u1wdct53mtf9zttqpbk0uvplrio6ih',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'se9cyqj1ve473nhwwusn',
                scenario: '4pkikfhmyfeiudry15wdd733xhlpkyseuoe9jbbl98driirb6upgz5cai9cx',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-05 08:50:54',
                executionMonitoringEndAt: '2020-08-04 11:24:58',
                flowHash: '6jy9ed29bevg25eijwjcf8a8nwfl4bu5840i7yn2',
                flowParty: '09qc57b61l6135lew9te94uh5c4j1liutmn6a61vzlzgbct62sxfwmi9tszl3w4vp61lbszdp3etlxgk6buxg9e0e4dvvh59rvbklagxgeergkd0ja1prejoer3jbg4mse2zdews1a207l7byvli104njhgyav5x',
                flowComponent: '8umk8nxeucacp5xqdy0yt812ir5qd7zjrwajh80a5nw6mjnkquqnubpdzr3okzds14qu7ic53qsk2i50pfo4454k3y7ts3pdt5a6crniw71278o7odum5a735gyjqqc5ninvwc7p3h42pq3n0l8i6yg4h555awg2',
                flowInterfaceName: '3dqqfc0464geki8vpcqxddixl448snkpo2gn1t8bj9bxf1sdn58iop6mmhykd1rygj9xusqpfjd2ok2ihi47v97luajwt2biefr8zo3vczul387b63f587ghrq4lblkul0ga1tuoo7wkoszgzekhzt7brpzz5jal',
                flowInterfaceNamespace: 's0ixs5yetd1w931a78t14ft1819fv39xu4jw7sps82k0cpdcknn06kmau9q73wzmwxcmgki3ylnglraiedyla2862bg9gd54ow7l8c1q0oyovlchysqr7izwtgxyte7abxx97wg2gmv5jd1q9mplvr26r6otlbqt',
                status: 'SUCCESS',
                detail: 'Distinctio ratione aliquam debitis natus quo quidem distinctio iusto omnis. Eius totam voluptatem numquam assumenda optio. Occaecati similique voluptatem voluptas et veritatis. Enim et veritatis odit quasi quas atque natus ea. Velit enim sed.',
                example: 'qvm0jpq4ueviaszm8qhtuv6nr5552koob8ftv83jhcjzgit9worh9vsi88bpwy1ima3m8x6ogcvbu59sfhfdt7yxxckxpnqd84brhzy0h26o6n1layidrigq82lsv6uscmg0px3g2mgv743zictrfn6d77aihzdf',
                startTimeAt: '2020-08-04 19:36:51',
                direction: 'INBOUND',
                errorCategory: 'mq4nrsx5h3f0au3so2l4q18jgkkprce2tko8m6iycmyx3zz792w2o5i1p3k818adi4n3luycgnkge9yl9l7ni1wfpwvufkpz6z35kcm8zscdaf2lur7uslpqugnxd3244t8uo20279cvgo0g30mce16drfo7gx92',
                errorCode: 'auyezo3a9szoz6yzlldn18lswopccxz9hwbadelqj3q6faxe1n',
                errorLabel: 678235,
                node: 3440185123,
                protocol: '1xk70fn9xke5shj4ifbc',
                qualityOfService: '9hg5k0w6589jjj4wgsva',
                receiverParty: 'jk45zm3fnapvhx6lwrxh2txwwjc4a2czbgvyzw5zcd8sv81uqctazd1cd3pjh71jy7soqjgm2dw0nuajng2k4imlvl1gtebkealuolur21sm4zum77ocbay6n50qz6553o9t2dcj3l8e4t6ghj5p0y75rphu28gp',
                receiverComponent: 'r9g6kk0k35emf1545rxxbnvmlaiw38al4bcotvg3awwm0a1ihpgev2vlx61ct6z67k7m70fe1b2zrereujvscu95nh0uk424efusmmem1gr42cdkgmlt7ax7yo2s80y2pgkx161cu27ezeq3wes1ykk9v8a27lut',
                receiverInterface: 'y0pmtj2rh28ddds78odiqgbui7eju0soqkku68lzqlb0zjchf1t8uzdy5x00eercudxyuva1zjw1g6c1v7uf2ixs9k5m5k7guauprqgfhru2i3eovtnetum5rd401h2w9r1fb5h9bveh6j8htvyh2ydtfmwb90jg',
                receiverInterfaceNamespace: 'm1w1288nz4dpd9bvgcv09ak4nlahuctliw8tw3popsvb103egdgrgo0np3mijkghp766yctnvwojjpkxs337alokh0fo317pqkc23eh05cw3xb4boov1tp2l7kqpk63lou5kwb6h9mym7bm48zwri6sfj03jic0n',
                retries: 6568736372,
                size: 9365517250,
                timesFailed: 1746455980,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'zticicnmot0pddtger5wxushlhopq8wkea29eqq0758bdodjnp',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '4fnweg2fb5mzy9dyvtgk',
                scenario: 'qn0yefbcigfeh1udxed119hxs6dmfxlzzo4h7odjxptuzlb1t250ro55ngm5',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:50:26',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-05 08:27:30',
                flowHash: 'jq5ohd7362q7auhijwrsgq6ow71xuji70h5e8ioo',
                flowParty: 'inakneycwloe0ho6omrsnxuhyj2747n845znwvhxqeztns802jin1o7ca0pps8tn08xx9oq9m5fa3c2b7p9dbdd49rc52f0kgk2vlehzyso1p1easb72wz2z84alj4852ww0xy2m5q3koayfptibv28xewl12uf0',
                flowComponent: 'xswttph70ijw4r50cmchv38ckyuz8hdg40dg3j6kpai9wgiorr8knq9d4k1dyzgeixzjw0hlwpt8bwrgu2n64jfce5ab79txb30pmv2gj0xumfcnld94wbkja162tm0iuqldy0ncft9ty4q33a5h4jip4z54mdzn',
                flowInterfaceName: '4cmrj1crqolqu406h4i9tp20ugglstoo5t7aq0ilnubefg1h6plnv1d5texsq6wwu5afum4jff23ej6am4yapl46pjz66zdglvazlheh1un6nrrmw9eodacohs9ohr5fzk0l5gapy6a3d7leowydzyzlwj9vbel7',
                flowInterfaceNamespace: 'uyuly9v7vn0xs6c3mivugd99nvf5rt8ou4re15g77rfr1qubo670uwsqizr8nklig58rmus6m692twclbx126r1s9exgh6wjld0u4lc1i2dc9xlq9im1idc9pcxk993zguf66z16cvtc21qguqidd9tqf34bpf26',
                status: 'HOLDING',
                detail: 'Quibusdam debitis fugit repudiandae magnam modi libero beatae fuga. Eos voluptatum dolor quia aut aut consequuntur eveniet eos repellendus. Voluptatem ut porro voluptatem dicta iusto ut qui. Nesciunt dolor officiis corrupti. Ducimus blanditiis voluptate omnis.',
                example: 'oe1tz3w84tp2veyfwlgbp8cakucagta7vqqmwlq9fwns4rfoum7m5oep1wpo0vtc2yrfiuxxmbpxu9z98s6pnuu7isyltmvmrro3fj3z8ivum62yra69ohh2v45b6vktq96ggeabg2ypq6vplk28zeejx1batt65',
                startTimeAt: '2020-08-05 04:09:41',
                direction: 'INBOUND',
                errorCategory: 'qtyr1ealdews4oj83jfcrlzkhedzp30ctyg555pq1orzsswi7mhzuirtz8leyxormggw2vzh1uy9gsru41t5vb768koe1yhrtrui0ic5y1n5viwo1esk4zsv8hcbqip3r57ik0dde877pgzoihhad42w39fr6s7v',
                errorCode: '129qii700w0j4m9lxvu2gu3cpn6b37s547zvt85ir6b6g0zw1d',
                errorLabel: 532097,
                node: 1554486484,
                protocol: '45ityna8r056tyiysi24',
                qualityOfService: '0dwa0mk42qj0xe1s7jch',
                receiverParty: 'n3owd65cch4tnpp4xvcepikdof6pwlzlygjof9svhpi820zgj3ykqghbdfu6kxmfvci2fod8mqxoenejr5jiu3zgck38q7el5e7m3wy6bq0d7rfd6j3gbbbh4vff8l9rxwlmhhnv3vl2c8vxrf4nuhqh30r8hvo2',
                receiverComponent: 'k562ehc04wk9htvie4fxxfvwocaq1u9o87dgex3qon06qveau3z0v8b84bym7yom8k0mjkellni3e047vkg4xxdh3403b6snxewgte9dyyuu3b6yx4gled2rsbqa0xm8nsdcha1sirbo4nro97oqfzia0oydok8y',
                receiverInterface: '2ixhwp5ltug13i9ued6hk0a12ustsqhacrey3khrfwb67cr7uilzalt7uiryxa9amabweoahf6yfmkho2u1rjexuoikdmya662s84t2s0qivima46mx1jkhkt6xatv96pm4c2dn646s5ykafjhgs1xth18i5vdfg',
                receiverInterfaceNamespace: '70zps3gcrebgfxets8v65lm1v4qirk84dvfi97v4zrokj5crf8g3szypwirwfeoco1suc9vo8qukqxf5vjjubj88jmdmeh3ob05ef40t8y0rgz9tlu06ae9a7dk1y2ghx2pa96f1fwuu8817w5e7fk2vvttthx9a',
                retries: 5825101955,
                size: 1353544706,
                timesFailed: 3697810685,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '7wjk46c5ukdycpz9jpdtmau2ic8ci9a8frfu2oxwm1ry5zn64l',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '1gr354ab1csqvosew5u4',
                scenario: 'm9jm6da54m7tl4mrpk8z1ry61tu0o6g3i2d4ehh2whdmn4yv2j7ftum10hxk',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:54:43',
                
                executionMonitoringEndAt: '2020-08-04 20:13:42',
                flowHash: 'svfdvw2faoky8xbfjn0jdijb70z6rtxc05pxuy1w',
                flowParty: 'wbzbpt4gsqag5e75cglvxcg8yn470baloopunmnv7rddat41ibx4ffkzgltbl2jt7sqvth7cajn848z2mrz3axhz2lgwxi3t7dbt5ukbkh010pdf922gapezfmg8kwlw1fjfguao7zozisztzd8t0pvsbjuz6wz3',
                flowComponent: 'eg3zu194ml7go536sghl2gqdm68yqh5d3hh9upa3s46jjhu78h321zbs5ep4293l6vdyd63vp1s4z6zlpwumczot8q0pjrh3bjirbklaklakwtt59iur3mnim6bit9x1rtsl7j86twlyc959uvlttkwxezl5f9zs',
                flowInterfaceName: 'mwbh3rrtnm2ixkfmat8s0tw6g052v059mtndbs1gc8q6rtgnykuboqgv59jq6cu97y3cxsdzbm5iuw3lq7z04b08spksvv7ndh3vmd5ha9vwreco716do9cpxswexjk44y1w6zd5va8rueg7w3wzf2sn87t6qzhc',
                flowInterfaceNamespace: 'ruj2b2sucxakqivdkso5brx9n2xdvnuptotsge3sz3o0q72z6lqu633n6vqymwgdky0ktlplw2tofi195g11erl54bn5dmabfid3mz5056mhbfm8uch3a1n6fuuno1qofwd1uloxlkzu329sxn14wtdbjfstnwvi',
                status: 'TO_BE_DELIVERED',
                detail: 'Provident nostrum dignissimos totam autem harum. Dolor maxime tenetur eos et. Animi voluptatibus velit nobis. In aut error. Sunt dolores vel molestias in ratione ut quo.',
                example: 'thnqeybmm1j2tnb1b0524f27sdt9aplk4pw92z70rv80uxwtjt28vl9ortrv8vd1oeu45745igchorpe6j4wlcxgb3v3g734wj9lbktjhjph0ekuevi8s9xrnwq9ilgap9toz0jbigdq7xuk5jy9lo3wkwcmv99b',
                startTimeAt: '2020-08-04 14:43:35',
                direction: 'INBOUND',
                errorCategory: 'm9uip4iepqgv4skuqhw8h9boxbdlcoyurjadugi56ggz771h2fzv2f9a6shq80idg0crz7wcwx1k0mc6xz0qpj3ev1mf9ehk9dzcltnsrlfdtm7aldbrh5iawygnsir5ohg3jqe1z7eq2c3wqfnawmvekayzclkk',
                errorCode: '5algk0d2pzf5ajulz7ij2dnh6qzy4911x1eedkgidu27osrnrg',
                errorLabel: 109854,
                node: 5055136747,
                protocol: 'pmaxjusy9qahhyghmvp2',
                qualityOfService: 'hj31tn8ktmludbc3d10f',
                receiverParty: 'cocxsajosimp3fjlhldcibhoytw8qbqr024e4mpgwf25db0lug7xg1u69tsyhgrjvexlplrhbsuhjvf6azsck6kylrmgbi5bf0isep9rw177omvr10xkp94kzwtm90rsebk61mvqz7mxsg8ouuz7up5buiuecpp7',
                receiverComponent: 'ox96jxzp4x37odetvz9izymvqg6yt2c4wg0bnvsxlk4qycle0en04xhuj3jlxxam6109hnxutfbr3vxfnnlw21b5tiwautx26bpuehd4upqlebgy5lbqwqo1kc6i9ovi4k6ojivqw1xrr9dtdrq57v9chkqr3vv6',
                receiverInterface: '3lum68tvw8h93h6b72d6b748hqzdali05c1acnwjos8mgz0focjh0up0yqykhak8a4nsgs8ih8jm5h1m06cy9mm8iu2b019xybyaaibaia372qjhbkasc9a6cbhk87htrbqu2x456cvqj4phlxrd8ld3p9levbql',
                receiverInterfaceNamespace: 'w4ivdo17d46x7eu53ryzqrk3z3k4gcylupt8je8n57wbgpqgs68lublma0vc2ys4z1q5o4lkypzh0r0iaysypa5xngryvkv59k8hn4z4uurvggnnsb7dbcbia3i2quxs11s79thxpsg0t52td1wxjtdkqqcwlpmp',
                retries: 3908087639,
                size: 9404801520,
                timesFailed: 1986486039,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'f71bmik22n22beo7u6quarlhfrge5hmqr3rwc37e4j6qxtfjl6',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'uuihcfamtfm9wu6oj7fe',
                scenario: '6uvon3lnx2vbgxohsd1qaritwlth6z42roaq9wvpdxkt6bg6c718uutjy9it',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:25:01',
                executionMonitoringStartAt: '2020-08-04 17:05:21',
                executionMonitoringEndAt: null,
                flowHash: 'cz9m6ah4g2e54iri9wyxqi8ymg51g8o9696g9m05',
                flowParty: '4e2avcxkovt0np7mjplipanxf8zh37z7oc3c0fbvfhpg530ikplm5kzd4a9yt9ibfbix323dv319oqhlyomfoozvvx7kmsxv6w0gqxqmmx8f2ckpc5ubzl1jghgp910pxbed5z9vef0e622jjiivayj0wuxvoees',
                flowComponent: 't67m8vgf6lp3ma7fyki3hq5ojvhfr5l620rvukjguyhg7ntgmxsx2jpsyl9u4qq595tzoih7busta1svbmvm60zgmdgoz3zz5gl5h4dcjf6m9lz7r356p6ks6y51nezwtm89oe0h8dqp6shmfoot8qn0oxruiwap',
                flowInterfaceName: 'ejqna1wtfvmr8x81bwp6wn2bdhgcxtwul5gregit2iyajs5rwocw1np7mcgx1e9t9ts4yrj8ha5wfpk7q60rppxdaffatip9dalgp3wy3zty0ak5zroigmx59fnzvu5aaw6okts6yg232odmazfl4zxtvu54t9oi',
                flowInterfaceNamespace: 'di2jr5j08x2467vas6rz8xd1zsnhq8mkuswn3mz7tuqp10m7qh5i77ujcvya3mg7unfjjkvtv6phivuhumapi6d5b37vg7p2vn7975w27y4bfc9hxk3zkzm2vai1dgnwsno473vn5cw7tvg3w3b4p9nhbjpb954o',
                status: 'HOLDING',
                detail: 'Dolorem quos perferendis fugit odit odio. Soluta placeat saepe mollitia iure rerum ut. Dolor voluptas sed eius beatae eaque illum.',
                example: 'm0mw8tpu30439e23mo3w2y5up0r6utejnhgumwno3k7p6u30jc7kx8kn06b2wkklw0t0tdwctivjdlv40ddwis35iugv31bq8c4vnqasgdgv9t9o9wabxdwh0w6o0zh2m3wkp1yitwczkhpf5vhpxsp397s7druc',
                startTimeAt: '2020-08-04 18:12:16',
                direction: 'OUTBOUND',
                errorCategory: '7oz9vsfwxaj611kd84rwwqoh0k0s7ze33tat8tgroq8qyttd37org0jo6gxq7w216kedut7vuu57mzy5l1awz3jtupwxvo4nku3so0q1i4rwrqo20ol3iybkuhajzrjvdz32k6zih5n7l6h4wtutntaga4cjnuq5',
                errorCode: 'mk5jf52hcabenuqogvh50m0qml3wgcpmdze28e9zfk6z5c2dy7',
                errorLabel: 323498,
                node: 4349138639,
                protocol: 'lx9d7q7insj7deu1hloa',
                qualityOfService: '29ondm66d2n0gksfjhzr',
                receiverParty: '4gjdjhibh0ndt27ljeyaynxo0r3pt5yi3i600kuumwsax6f2j3a1ohyphpgudiy9h6ziooppt36y3gvcxnoalvl6xj9zvobymqy6e7skyw0doj4r6h09oyodxz19e69c259hn9xs1jw3xjhv1j628nb35zs3omnh',
                receiverComponent: 'y31eyk99qg0nxhi5lvwpkf4hw6n7xlkt6gl6jko6oo3j66sy08qn2zhgja0ue9bafsmb2z3ihaiou51um48mw7o712hmrbgo28rzkpksfk2by5bkv903wdumcjty02z24hxhwkjsqyz2ch636t5fz8a03sy7q6bj',
                receiverInterface: 'p8r3wj6gla35z5uirlepz8c3kdcbzawlcpce1uys0v0gcdx7pwhnk2mw0luabnwj5cv35hep1dffcm2pafpo8vu7w0n0pkwetnpf3s06jo5gv3z3f8vv6qihi55y7269ybj4pmkd7u15aou1yvecw7drolc6aw5d',
                receiverInterfaceNamespace: '1q5kfl12y5ydw7n8vbrnczrm3498dt5lcivum2zcimu5oqgmssh5vzm7hskkz014807m7yq48bz1h8yakggdv5r50dx4lkv70xui0zg3v3npb61idskmn33uzx25uf70ntvs1haxbs5s3feeu4hd7bks28qjxjht',
                retries: 5572575088,
                size: 5511297854,
                timesFailed: 4753697237,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'rtjgf9iidd0o25yza5xykzx2rg8hypp4wjxn96cnuf51deg8x8',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '3h7inq95bmzdhm21hyi9',
                scenario: 'cwsi18ao87tq4jyh4asd4n977pxix57wroar51wtwnvpwmgxbk3zw2njviph',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:42:49',
                executionMonitoringStartAt: '2020-08-05 07:48:45',
                
                flowHash: 'loun5zar4767k8ij4wixde2oyutchpcbfsptgp2p',
                flowParty: 'ae8zwsum1qvgnb3365xry0tmvhrzwr98d7m0qfqxsgub8fr8e1fu5simx7ufi4emsf4jbychhg6luqlslck2noxrw7f1rxwm1567fr47u81rop51cuswytu31c62z0ww7wljdn5hc9dp10jxx4dx3l8mqkx4in7y',
                flowComponent: 'jhhwesxxaikrwjp34igrvcbvi5noqdtac2j94flkdcn87v3lfc3s03fevecwmh3x322pczv6z949urtgchiiu0llk7i66cfaja3yvsh7gpglzrnk41af0jyut3qoxixvdrgr61fnk6625kyzy2bo7a4ca3ny178b',
                flowInterfaceName: '0lffwmimi330kfn91pz6i8q36t4q1isbqkl9dusvwldomy9850zbtu5801xm20elwe6r6417q9d145t8pbfjjpb95bfylpvkidaxquvp4mfqp33pcf1zablaua73gynb0rj8mgk1l8xpcy2p7qlfhbo4q2g7nsh7',
                flowInterfaceNamespace: 'q6q4ksf52g14ko8eqkwbkpxarc47yulw7671gf9z0bjxfdrtkc1bkv9yymu31qp66auw4cbwjru5xrmqytgixiiak52xq0ts11oas4h3b08ik96rq2oc1z27lv4kghkecish1548helaegmczomigehax5w8jmnk',
                status: 'TO_BE_DELIVERED',
                detail: 'Id libero ullam tenetur unde quis. Occaecati commodi delectus ut quia. Et quos dolorem tempora qui voluptas. Unde ullam aut necessitatibus est qui velit veritatis. Aut et assumenda in autem ut aut.',
                example: 'ya489k8s0d33l6kf3gra4ialcutu678plbjsww8klzj4p3t50k8wgvkblkbin9yifu7vcnvkw7p1hfg7vwcieyof0ym8nfaieqgo01vlq7uakzp4n8fmlyzr74xn38ctwhem7wpc8c7815gid44irkrhnhwxdx9b',
                startTimeAt: '2020-08-04 11:04:03',
                direction: 'INBOUND',
                errorCategory: 'rxhkfnv1karclzux009nr4zzic1hbkguvos0zib72p95ts2gua39dkj7z05jot4bzxbkckyuz7i5pg0qxjrk6bo1drwvsgsg9ae1y74lowygvsei4zu3cl0paqu0heevt16pifhcbawdk3r7uwntncm0mh9ian02',
                errorCode: 'caxscgw9oslewktjdslox6s4dleb1e05dnklmirex022v6jxx8',
                errorLabel: 809270,
                node: 7984263982,
                protocol: 'vyor01v192x7rv4t655u',
                qualityOfService: 'n97tdmjjp51y95ag7xce',
                receiverParty: 'awv3tz1ytcidccb6rklbedkd60yh9qurr5sm7bw1iiivl309yosb9b8helneixf6fq77nr01cr1campv38eoqc94zhfsqddlgzi4a1n9wt9f2o49zxq3w2a2i7wsx9b1b4a3wujni83wogjii0o0n6uvw3xy3q3b',
                receiverComponent: 'dmfmnpqn8vbs54ig5neydxg9ck4cvxkfiyox5kmkpvmj0t7zdxysg254a4mry3sm6q2vz7t7evom937kzdvvfj8j9wkv40lddl3vyqtp4rp9ss13djs8msfw2c6db36wmns172jomvzfg08u30epnzv2sl6gfh3h',
                receiverInterface: '3zavd8rozg13qos1ewwx66p5u6sx6538hqmbegx8us4wdpo6h8be2dyi1chxjzian9jmg0mcxh0miiobgt240c1uommjzqherditf21slxupbydchsgkshkpmmp7qerehe5f7zs8z2igg9e1ityctk8dytabk5k7',
                receiverInterfaceNamespace: 'qg2s3p53wq8fz5lriwcf9v3ukwn31lwwqr493nxpx6xit9r93xdov6k3xpdzepqiunqhypbwx7pgbvrp6igqqfiqfyk2s4ommo4er6lv4inafzw3lzco68c7h9eghgk6h2oy5ael9bkcssmyn37lv4xvrwys1h7f',
                retries: 2366318520,
                size: 4150434438,
                timesFailed: 5706401325,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'har2am197n1ullclp1lbomf8inshg07tbaz9ak1ze5lit8vyc4',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'c0ko2m05h39mra8sl30o',
                scenario: 'xjt1kce9lxavvb38a9gv51euew8aha9ummkfvhj6nssfxgrn07vwqc21s14k',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 18:55:47',
                executionMonitoringStartAt: '2020-08-04 20:40:57',
                executionMonitoringEndAt: '2020-08-04 17:47:57',
                flowHash: null,
                flowParty: '45r9lyb7vm3iufeh9ryqb56og8tu9mg670ki2s3q62s2e5d1ea1tlhnsjw4fbkfnn0p0h62i36efvn0e0twjon8hsnw6bc9p407l569x8h2cldiqedkf53uv3yiffdh75qludqtfdhz9fav5d2p8tdxw4yry2o2y',
                flowComponent: 'akakxzb0x9a2j866tw3gyn31blux8383g79rowws6upbc2iwi3v6qi0ciqapd27ylvcc9phm7h682yp5q4vxrm88yt2g9b02qtmhk7gow08egl42i3egy1isbegjxf05340do1tfago0r4yh6joq2bw9bk9s60s3',
                flowInterfaceName: 'i6juq1kmwa0lii05pwtwiweoevr99py9k03b4ooonjquzi5974xz4neeij18qq0or2mwddb36eyjxdion0ogx5yyr0k1b1r54rh37jgujrxdpzhua5y16o6056zn8ilhd8izihctivfzhq809fl7y2xn6f7pfk9p',
                flowInterfaceNamespace: 'cezn89t6zokdlkf46e5ycdq4rpukha80rxpa24ynvkuw3wyy1v6stk2j8id4tcj6ngo39ovarlnxhvyx9uy49mllx70oipeooy4up1kmkenbksrvgwgk2gja1r315luionkkl75n57b9zfunydtirkd4ziczl0f3',
                status: 'CANCELLED',
                detail: 'Quia qui rerum. Et rerum dicta. Est ratione magni aliquam.',
                example: '47uwmd741lo991d0ndtgwml8mqs37ok1t2sd3f3jlkh6mxjb99p61zblc34xikvgkuvoj0ge2tby589djy0s1bprscbs2tpb7zeoct20yvw2g5z6rcuc9h501oyh1j3eegh4m7sbok97a90c60lf8ytizvmhosya',
                startTimeAt: '2020-08-04 13:40:09',
                direction: 'OUTBOUND',
                errorCategory: 'ua1esmnvhy6vtlu5kphgpu0jxxkqwlql4ieajagl3hq1qasj8vh5no4v0fu0nta4640r9rd4dfsxa9wnz5k8ydn83nkwzv7hsjflz72bme0r720bs5engj3y3uhwgi4hjlmmxdrdiaot7qqzhtn6tnrqda9ldgr6',
                errorCode: 'qsh0adp40aa0h7bkev9s3ledoo8bdqslpmdmm4bvgmdnywjsfx',
                errorLabel: 132221,
                node: 8247211861,
                protocol: 'jmgbzqbut3bekduh3q8o',
                qualityOfService: 'i4p5mihnh9eyoa9zokiv',
                receiverParty: 'ee3qihjrbfh19khtq5k7vbhw62icitl3nmsq4k5ejol1yf21rrw0bx0tj73qmz9mhdzxa61knqv03fw5j74u1cv0f6avros03th1h06w9696mkwpzjrfdjut6mpgtz769o58mpkf11z2iz0w7dvl9rlzdmjxik65',
                receiverComponent: 'mq1b42yj05wzshd9un548s6hbeq9n9ng7ogv4pia6kwmjs3e5x666rhb4m9d46tpx7l0x7ekvpub93i8850dso9vujpdkobxhh60ciavok3sjyhfauv5k6rkfzj193p1zxi764yucsjvm6us3w7hz2frmlntpuhg',
                receiverInterface: 'b8g251ok31s318lhb5wdep9bpohoy0ludrned5p1t7s6pkmr01te1szx2ayq6krrwz1yad9u6byatdljahu8bi47k3vwdb0yl7gbu9305wgl6276xi050jv7w2rraqaq9o9sk2ckebo87l1ahibmi920a9sz4qjy',
                receiverInterfaceNamespace: 'nm2bs3z3u8ra3ry4z5hio744evkodb4pb7c4pyshxppg7u4h8v71t38xj1h9nmv0ofkvjtn7xs16nvyqr4v3pg3e21uscemgqhvfnxm95wnsp0hvcbmxliybli0hn3olwakqmes8pochjdkrthwxpfhh9mt6zzh2',
                retries: 9825719965,
                size: 1347520129,
                timesFailed: 1782937769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'hcs5737kq6hktgewditewf3p6l8i9wdewqs5hsg81rmasf5n84',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'fw9k0e9rb56wguu5gb8l',
                scenario: '2r8lzlam4yjnex0wpu65j8loarsvl4eiqdj9xunzgjxqaphojbdg60x7vv05',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:46:49',
                executionMonitoringStartAt: '2020-08-04 19:59:54',
                executionMonitoringEndAt: '2020-08-04 10:18:31',
                
                flowParty: 'y7pm656ig45hvvjhhigrluzefu4odmnnmngbnjooocd0s9d5gex3q3o8a9hn9hm142fubgfoxh7u6lesqxk0a67noybk6qlib8k3t70fau3ni9f37x2ch5oejkrjysyhd3sit4p4xjxhujvnz3s5q301i5mjg0uy',
                flowComponent: 'ev5pklzxqndchcnvl3tt0jzv2vydmsb9b5sjhnxtwl5ndw0me2igqkw3ckqzw2fcndm51pa8264t35g7sadu7l9ibjykhc1d9d3f0js2lxtjeuxmnbr72agc23l9sjbgs02se9qw518atllvpn4pbvk9oc38lk9d',
                flowInterfaceName: 'xg1cc5as39je99iw7pxetht2eolau5bl5wgyzudxa30qdkxpdfbshwpo1d1ky3bp4cb5qjikqmxt6vd9comds9u3hlz5zvo44jt54u60uhctwcc0b8rg2di2n1nuik0ivhaqh0rz5vnikl3g46091pbxis55kd3g',
                flowInterfaceNamespace: '341xhuu8wvxwcjjc6ttxiapt5b0hcuqs1gr665ebwdeznel8bggsb8lhrev4i8bh16enkza3sn69xk2gwgrzptz3i01e4fpojrac8sj4iyufpjecpl489gzgo28eaxzdnw74bfax1c6913n87greb54ki1afhfl5',
                status: 'DELIVERING',
                detail: 'Laborum est dolore. Voluptas similique maiores illum saepe deleniti ipsum sit vel. Praesentium labore repudiandae dolore soluta doloremque numquam hic quibusdam. Odio fugiat eius laudantium. Et ad sapiente qui possimus repudiandae et est.',
                example: 'kufqt8pr9w0q688ecnkdwxxtkia2mydgn9lbf5fg6defyplbi8qqpjowucltzn535k9h4xcge4enupbj17lzrinffhu9b9tvjxyb10xlc6bga4rfyz4t0xn5ca6ph902mak60s5y4xkrdy4868v7hrwv5z6tf2j0',
                startTimeAt: '2020-08-04 17:31:42',
                direction: 'INBOUND',
                errorCategory: '477hkmnoc844valr0l1x4p66v18cmoqatuzhfmya3g1glyb7xygpc7hf7x8sa9dx08f40pan1aw03ivezf67a0mps308z5qobxgyrvjrxt5wrr1vh7udpcbgk9cvhe0g21sszb6pmm44nwxs0nnha2gpvvdtrbb7',
                errorCode: '64ubct458e4vw4e509p9c2f64jf461u6sn2w22xii9prkdggyt',
                errorLabel: 529343,
                node: 8559195610,
                protocol: 'sqa6c8wvsnpu7lby6i5y',
                qualityOfService: 'e3yh1dos9q6g4vbnqad1',
                receiverParty: 'g73rzabf664vgtbls1qgut9qytv8psr0gy27w86zmy0dmzuj7m9dzr5qaxximao6hbn69m961ghnjscco3ebn0bvr66n4wttvlnum8ayvg1inayi85phnnqpp4t4zhnokg49ati03u95lxrx6fic8nt3wo4esba1',
                receiverComponent: '55s5yd40tt8sxhdrk96w8qazw5ehlg6ix6wte7lcs3caxdfa1l14fygwrr4fy2g64fxfq592nhstor7kzgk6rapaqaojltpm4lf1exdfr3rivqxy2z1rmnxam48z2aq8shoe3f4jfce49q5a4c9gy2m6jbdx6n22',
                receiverInterface: '5dkidgq5yjxhowijopdbr6zhachisttakhtw6m29yq1x6hmj7udiqbvtbk3zoni3d68egnmtpkrvq23e2vlvwozot667ozcsd1fs9dpcrwecfx21g4q3gtgtd5pfccomgt606mtjelfdlst5hbcq60to820b8hi8',
                receiverInterfaceNamespace: 'wyps3lr2ri5iwlnven4dxuu3demjv66btv0f4kpe657xyf82zounkbia1ltnzxhdjefvsk5w8mfcmce509hvwb27n8cn6fy0ash2f51mvvt0ddrvfpv8fiqdwnvkqs3p2gvs8ki5590szih1rro408zbawq8l76i',
                retries: 9362690243,
                size: 5135483836,
                timesFailed: 2168864549,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'cza29gwprjl6dfoi2xe0f23vt7laoizcukyl9ngkajag4kgbce',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'cwx6ud0wzail16i6depz',
                scenario: '5q352fg36ltgsz9nhz9c3bqsrat3gzt65pnwppon8qq6ynsucw9mfkkzpry3',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:27:49',
                executionMonitoringStartAt: '2020-08-04 10:09:46',
                executionMonitoringEndAt: '2020-08-04 11:46:53',
                flowHash: 'q0bbfq2btfmy0anxrswovylb76ywqme0ksh3h48s',
                flowParty: 'ootnpx9ne0qrjfbrmo8mp5of0nchz82gu6rmh5kfsikfnr8lssp6ermtmuiqlwcr8ymlwdm7btqf8opr01pt6hv0vkkmob0csbxjwprw75joq9i2tqaps7c8mx6c8b2qtrmvlt46a8x084qe15to58lrl2xbxhih',
                flowComponent: null,
                flowInterfaceName: 'qhxq3okhe58a1wdw4i65c90y9zfgzemc8woa79a576eahenses9iq1gu05aaanrics8qx4btpj10kfrbz6uh0vi679am99j2say7adouwuj5hbwdntktjooj2d1ndej4g5zyrr3m4r21k9vs8jgdhy3bwmqmarl1',
                flowInterfaceNamespace: 'crmsao33evl52hin22psji9qr8jghsxukk9h88iupncyc57lqhn1sfvsbzmwkfg5a86suiuaf5gq0ahdliy86ae5bcn7xf3l64a3ra4zz0yg2ue72ioukutlnn8u5ntpaggs44jx1mckl0wft6mnwmoe64tl61il',
                status: 'TO_BE_DELIVERED',
                detail: 'Non non aut nihil qui consequatur voluptatem eveniet beatae unde. Consequatur accusantium laborum modi in eius iste aliquid maiores dolorum. Eos debitis necessitatibus expedita beatae ex quidem vel. Sunt non dicta quae eius animi modi et eaque sit.',
                example: 'll9hf2cjmcar0locbtmt8cnb0guwt8vc2fxs9pfjr41emmoaofsjrqkovj8r44hpjpdtmxdwugta3h5lkj2qrvsvfvl0tzr0qu669q5uklemyv3xbs8dwaa9qfcmemt52rcw7y1s2ie1tln5wq4iwhtlu3p0o52k',
                startTimeAt: '2020-08-05 01:40:22',
                direction: 'OUTBOUND',
                errorCategory: 's3p5ekrj91lzt533apfu9h8f5dz3tgby3tiocvrx3hyma5oq9m4qkrzezboekywh8chwlq1blpxbnzdz1vc06u48eewuufex3w6mv5tr0bedi06k5uvoibqdu56zx6ljejqm281vus4tgrb92qvvl1f7s2wraziv',
                errorCode: '7835btrti82jwqgwnjqjethym53h3luuyqxrmfs0gkzcnm07hv',
                errorLabel: 541112,
                node: 8911504889,
                protocol: 'bxos18a58tsphaxu5kwf',
                qualityOfService: 'bogieeg3bnhn2j2cf4q2',
                receiverParty: '31onk9m68kiyn2fokuucg5fo2cqa9itusoogiqc1hquhi96izapbi7vce6gved6l439ah98fhi0fs37x5sup3szuxngcc4tu5ovm5icworbym3rx56clcgg1cbgvzbskw7l037lq24hx3jzrinpurw1jsxb9eaps',
                receiverComponent: 'qvw385lw9g8m2uxdak3qeg8knpi7t1vdcgiqnsv67b692hhn9lji9de2hkczpgcls7ax6xumsntupzp0n6fp8526l8pnsirz56kiib8eh7woz08pz4u7ydlrusi2ldze9pli11b18byd6gp1veaujhv6gsd0g4yx',
                receiverInterface: 'swssu4ppbg8ayb7ouly7r34tgnkoui0hk1vd4urzauu8k1p83k0mqob0d7t82amcevdm2a480uuozwzkgkhmtjgvhasq42nawmen1pck8egpavwzfjux6oph4yt19y9zhvii5wxuwe09hl4lsj76054m2gfxm6gb',
                receiverInterfaceNamespace: 'a8dyfa0i8gygc6brmqmmluefr6lmzbp12x4jxyes8s0g70558sd1xnygy2ide5frbxe1fa4h6fksvze0hiw26vj58417v36jnh1ii7p9j8i6q3479eloam798m67pu5jtodsb7rpsapnyva405frlrqslg3rtecd',
                retries: 5985468104,
                size: 5474883876,
                timesFailed: 5725727690,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'lk0mseb0igx68vrv1cbu4wy8ni4g1qxcoa05xgufpbaepoxuof',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '6oxzhwsfgfbimn040rgo',
                scenario: 'bxp3x8yldpchbkoyfrjp0f8f36z2vweam4iydp8bluwjtc5xpot9loamaslg',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:11:14',
                executionMonitoringStartAt: '2020-08-04 21:40:37',
                executionMonitoringEndAt: '2020-08-04 16:53:38',
                flowHash: 'q380fminihdfwgw5sao8uy71k24wyyfehs095pjz',
                flowParty: 'vfjup7ahook76jzabhtr23zhel5h928yfvffeukzs1tv8frz0jjuw7solospezscuhbe3emausmockl50rhwzkk9v9o4uzcn2jh3vbjrreurd7fjzi99xi8ny5rzg3mz4qm6ic5equsgo4guaqpu3eqouzq8cou5',
                
                flowInterfaceName: 'x04ekkm4ltt3m1kd3ol6422dj2ls6wkrml5t8jk34nycctw59gfq4g2k0099l1dl283mjlbh7iylppx08nwibi8ey9399si31p3hxrrt0r228tp3uztwcf8w0p5sq8uyrhd6hnslpm3bygvlgk15v43ytqn84ckm',
                flowInterfaceNamespace: 'dj39ex1795em3kojqoawn4ratf4v54lgx4424btigmchq1cd5i1wkzk3jzwjuekxaiziink1jesyxyj0tv8dcpa8a2phld060bkkc0ka74ip0h8byel6rmns7030jaytupnx0hir5tdlblnszqpo1yzlt3ceznta',
                status: 'DELIVERING',
                detail: 'Tempora eveniet dignissimos pariatur odio sit ipsum omnis. Non sint id ab. Eos ut voluptatibus odio est blanditiis sunt voluptatibus ipsam.',
                example: 'ji8cqgehq9p9kuf062iqzuup0m8n7p1bpg26jp9anmv7paj9fl2a3dup3jbmxoya0urhoeba6kmmlc3pq50b53l93fpyyhe4tctcot7tejb56xollbjva24hk364mfpdglg08dzszimykspwgprnww630n8xm5zn',
                startTimeAt: '2020-08-05 02:42:45',
                direction: 'INBOUND',
                errorCategory: 'ugeiwt8xygvvd5pmpifk222hk14cxql8xlopdq0gta9m3kukz2o2leq6a2aflx0sr7ffpka513wzk4z216fg99s1gsbcfykygx5d43kost78i79sgmwso3pwszx402grj853uxs8kojfwo1pw7lcriyfaazdedsu',
                errorCode: 'yytgwv38tcgy80q9ub6s0p6ecjlwvauwg154gwc0ebxty9atwm',
                errorLabel: 701437,
                node: 4754978095,
                protocol: 'srkp5t3fatd8uqohavxk',
                qualityOfService: '47p6tzkd5zpsrxhyxwau',
                receiverParty: 'lwop81n0eh9hmvd0yvstsjmn1m17lqetdos4svfmgithddx8xvgxg5hbet0t9ek5dpq1ptkgedhwc4jl44x8bvzccd1g41fuv1f66zzdpji40u0c71i2lfq6d4yia0ppdrcuu0ek17l28qqb1ubmiizlx336t666',
                receiverComponent: 'hfplg5iybpvadkk0waz03bge8si2mo79cuhw7c69hyeinl1kh7h6u39jojp5u5p2n868p3thr7nc17nooz2z8375e8cr32qkox0uwi5yijs19zr5iw1si3izf5skpeatoi0jzmig916hjpmwg9cn5juj0fyyg27u',
                receiverInterface: '2iwfnrtmn28x3xh1ry1s80afubfk5mzlv6g978izhji7mgacdlzl3vn1fy3iuyk6x6l6nobi61evdfkw92ejbod1143xb7lu79756e1nclqckpzn8r3ietkkmf2rjqdjgibvsesgad183xlxtbh64xyccqus9rnb',
                receiverInterfaceNamespace: 'zmf1bzgwirz2faj6po14k19314sbgubt2ixhltgwt86ogpny13muy2f5ekpky7jy2y8u3q6l3ea3xdrsfjvictpy7vkj14op2tsxot0zfn411gwgitt5fb5hu18y6ef8n353jigagj69kbx4rz9acge3fg4znze9',
                retries: 9890174526,
                size: 9593860323,
                timesFailed: 7465888349,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'xel7noogbt2t0usw4e1dhezo9t87ls4r4qe1d3r0q28fml1a73',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '1sv8r40ffcstj8vz6cvq',
                scenario: 'r7rd7apw5f5aocawbcpurqx3cjlb0wml8kpupcgsjzht99edsj6lt94prutc',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:22:22',
                executionMonitoringStartAt: '2020-08-05 06:53:05',
                executionMonitoringEndAt: '2020-08-05 04:52:49',
                flowHash: 'ojlmau7l2201mo9d82urfmxa0elncfa6mql2pdu2',
                flowParty: 'rdk7hrak9ufl4cluboskiyjaq1066n6grkujcas6u2ler0pnw8qiyr3dxoc7a4yivrjki85id6vsq4w4078d1elweo19yd4imabjn7ma0mo9c19al6nz3k4otnfkyclo9l86g08dbi7sz1iktbcqfb64pk46ohwq',
                flowComponent: 'ktbkyk9fv7ed4vbs9d4jr1e1x317tdz3ebbasvzfnnnxxd255f5ddjgseutygdysvkwqdm1uc5ps076lo7vfbflmvpt6teun2oe3zcbs766vmlqcbl7lucu1khejntgd1bl9ff0w7jlx1e0t6qou4wk5kwh2qrfq',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'iwt94kcw14bd7xus84q8h9np0mzf0bz5lb3djdc2h5kskt49490z99h192p2ag14c778lfzwn7f0g4fjynxtub6k5i7ha1g8xh4sx7nm7gwr5xetjvibm0v1cwrvpwk8zqr5phh5m8xyuotw6uff75dnvupr86qg',
                status: 'DELIVERING',
                detail: 'Dolore culpa doloribus consequatur. Corrupti et et ducimus quibusdam dignissimos est et voluptatum excepturi. Est quibusdam eaque tenetur ipsam ad voluptatem asperiores soluta. Sit repellat fugit dolor omnis possimus nisi. Impedit ipsum et. Quidem voluptatum qui recusandae et debitis vel.',
                example: 'ny59ybilp7fixetwl0yv67rr2yic95kspdavd1vuaqcdsbg5o9thk1o13myl7gwfijq3e5uiwl0n87i9im8ecy1ranxiev8w2b4zz101mku37fm93f1inmnjjt6uz8drqf0cle7y6ufa3q6ac8ykg73r5lf4tnip',
                startTimeAt: '2020-08-04 10:44:41',
                direction: 'OUTBOUND',
                errorCategory: 'ruyrdfu65hrb3nb5bniyjnqommx1f9a2cnz50dwogmllgib4qy9cajta9jx204n14murkibdadzl7bz18omy5pd2kgtvppzkjrd91ruld3sfz5qmogup77dbiuwtmr6mpknzeg0fcbzwsjwc2kphaxbw6s5054jb',
                errorCode: 'fndszt1ix0vzt3mru4c9pag9qtnr43kcv3se8u7i2px03qxziv',
                errorLabel: 358482,
                node: 5918697117,
                protocol: 'r03nt1vnytlc3nac5vxe',
                qualityOfService: '0xpjsiyrpgbs9shkzxdd',
                receiverParty: 'bv5jo090p1n7t1yrg5oddlqvqjl68khp3wn1i611zu4inqkchzjvejj7kvqlpf1aqjlqcclwoa5j5s77ppaq910q9rk4e78twe7vg7ecf99sbairju30tdllmpndhx5aacox3yigo9kvbt2qrl6fthlkmqdcrwni',
                receiverComponent: 'z6s8py8ajwzmb2yi17c37csxzhoa5nzix052dj3mgonflqv7wrg2wv8im2c4sgezr5mcim1x9yj7z5ihnx1gixmrrhgeae9zf5uzy4e3j2nwxq0s0zo9r40y1t6yvsf10cmzkki548j32bm7nz7xkzcwy7jdjqbs',
                receiverInterface: '7h3vtlnmigncizorgncdfbe2kbxexsbse7uv09wr481ctbv6o1gbaxvle87n4fn1eijobweuh0wdlj189j6dijtyezr4jshree8adigvbqh720y0qvzpm28f0vviawy0rmfu97xu3e82zap7kgvaruw43nzjzn4t',
                receiverInterfaceNamespace: 'ga5odoxxjcb0skvkjrqygn2g9afsm2f4czqrgd7fbc9yf218btca0i1dxdu76kuazw2bn8rzhewa3659q2mcosi8s447v61upsxsya0whj587f9vfolbqtblelul7dklx5020i40akp7lh8gcs08grnmmacl2x2k',
                retries: 1782600815,
                size: 9354114882,
                timesFailed: 4484837100,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'syyolygblubqrtvboxnj5uwxg2l5jkwwe3zeprz7a8750vwk8r',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'vpvzraqyvrnk94mrhi03',
                scenario: '6q70rrekckdz2jndph7207myc1i72onljggvk2az6srutbge9q8eo6678w5d',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:43:31',
                executionMonitoringStartAt: '2020-08-05 00:21:24',
                executionMonitoringEndAt: '2020-08-05 05:51:05',
                flowHash: 'rr6kxszr356wfk0eeuabynjeuesg8qur1fht4dk6',
                flowParty: 'x7cbxk35k3avn6zn5lo2uluarauym3v2libqvrkqisrj0y5b7ip89y3nvegwztvqgowkozpy19hw6dwoc3nvtq82kp0ftlprhsxpanqxz9h38xil5fqv3ra7aluhpnh120iuhw6hvrvtjpm44i9rfldrf9mpao4i',
                flowComponent: '9kg9tv4cc7wfdm1cfl1aeypyjkkaviym1zhveoj3zrwn9x8nlar5b8kpcckcoxg8irjff920ymzylqkud56py3l6i2xl7ep32atetd0cjyhaw0s8ni9qftamlobjpxc85tgqu3l83kc2lk8l7x520yh5fprjfb4a',
                
                flowInterfaceNamespace: 'gvdwrm2fmqgelc74jd3vk33lfa69uhenozwdbhfxvb2qz9k9g5v8ypujxe21gm0pvr1unjnpv2bunws0mstmbv3dzq31qu6p3oqopr35f11g20vs05m9ur4wnkthvgsc0xt3lbpwjxlniikhzbip28myssyjzl3y',
                status: 'DELIVERING',
                detail: 'Minus voluptas voluptatem dolorem voluptas consequuntur. Doloremque enim dolorem eaque. Id vitae eum omnis quis ut dicta impedit molestiae maxime.',
                example: 'otmarx6fll75xrfv99xggszv15y851aiwc1cpxm408qax2gx3bm616rwnjm6iqf1ujeycxqam47m1sy7mpw5od7q9fbs7yd7yx99tlxw1dgwj3cnuub2jepgqwmhyl0yjwvivohz7ur0m7k4y7y3bu179nf0cpja',
                startTimeAt: '2020-08-05 08:28:54',
                direction: 'INBOUND',
                errorCategory: '0il9ovhl5s1rhny208dgzfpv1tikaewp9zkgtwuzji1tyckkoq3xbtwci1iu3j2mesxaiicxeiam5bjqqs3bn10mqmxdhcz40j8vsmrqvve939u7c7tze6cwlwdbsd351eyj6s8cqvbhkf9j3n1vu0dw8liqrued',
                errorCode: 'tfj1trkk8ddrtnm5ngeszd76hfnwod7qycpcgbhcxo0gwgd2ju',
                errorLabel: 256332,
                node: 1904741743,
                protocol: 'kg26okh42ljj3reac2yc',
                qualityOfService: '0hd0us5v4fwbez4h160f',
                receiverParty: 'jzg0i6rurk4jbv1d7nzw5ksp0zs67wskh3mzgc8d7fyabqrsnartg9xgdl4cgwejzv5cj24gzls35lhttnra0elo475jjra2j6dtna83fl9wr3wl24wctpwc8pxdg8cipilmxvkpvwfrp2o36x6k4omuqz58vpib',
                receiverComponent: 'x5j38ktu1tkmyll9qdkd6rbbqab6dve9fom4uqoih4fk8gbmfsh75r7q2nhnefg78ryvdfe0l3d52j49900kuzkjn6ytf7oakpf0qlnvjof26esq0e4t7pe8xuer7vaofz2lo8oa1qe1p2iod3mvzo6jtxuwapv5',
                receiverInterface: 'bvu29fkojvvpr28mozl5vitwjdoz2c49zci1kicc83nz8mfadpnku5199yna1r7hjwgnxf73g9xqj9zh8rx9ga6fibsv4oybm8fptsom7bv9c4s405f3vn735kleef7o72jkr1huoqxp85wtws1sgi2sbg77aatk',
                receiverInterfaceNamespace: 's47zj16wv2xe347bld1n4tyvn1lmbup69i59sof49mxu7e3336nuo6f64r1qclsv3nh97cjr7vsocdd7e6o8ydd1cf0dh75pnfmloc681tu16oopgi0ggsvw8mcm5wdet9yawy49hlu21lzbxkse6tv1d5g9cj3j',
                retries: 3474268563,
                size: 8894171086,
                timesFailed: 7367255294,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '1pqpti5w0boud05unnm6mg6m6kqqf41lw0f46hffxgnfiz64jn',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'wcfjl84fd3ks2e4pl6bs',
                scenario: 'q0jsc2bij87de4ucosd12m54hspbu9cp0hj0ts8kpzmps4zmwlx19h7q7ilr',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:32:16',
                executionMonitoringStartAt: '2020-08-05 04:34:27',
                executionMonitoringEndAt: '2020-08-05 04:44:50',
                flowHash: '66qeb3g25k5fslv0i937947gq8sav55xpz6am2k8',
                flowParty: 'pbba9uuazdz990w794arp3xws6lghh2wa72h1w404vw3588r48nfhxem7qc5ur09x6d1daugbnydnvv57gi50dve1lgpanf8gctdmsna1qdnjskw4aeqy3pt7610jvakrsvtgq500kluixo0itl2deryj45am374',
                flowComponent: 'bhtaqp8ohej2jbxcg5c9u42xxd28ojw18zz7c74a1h8nchn8y8dfs3exqaig5k0azy20zn0fuyk06l37bdo42yrppvb44r1bk5kih1ncdxsyqy2ha63rjteff8r5h4h0dl1jqo50qu9dk3cegf6ycp97c2id9kto',
                flowInterfaceName: 'p19ga025x6js35cmrny1tncn4wilv49x17hr7zhc20o4wy84wbsgji3ayw27rqa1mcyqgfev7ou6bkmnt2nqtw3brbne9suyrc0bg79k1yu0qbn1hicsygktbgks7otif9dhizcxuesa5tiylmuptnfas034uakw',
                flowInterfaceNamespace: null,
                status: 'CANCELLED',
                detail: 'Dicta vitae veritatis ut perspiciatis. Qui deleniti quod suscipit labore. Culpa temporibus et molestiae illo molestiae similique quia. Similique quaerat dolor non. Optio culpa odio ab culpa error exercitationem.',
                example: 'ptb30qshltj3n6v6q8zf723vkm7dcx81y0nr96pk8rl5u8esc5qojla9qoru2cj3n89wmf9d00q67ninholrfn2tlizqi906858v8f4u6qf8nk5zb2mvv4hgkah046izfg08tytrjvpf58ch3ep8eqza18pcvt2n',
                startTimeAt: '2020-08-04 22:52:24',
                direction: 'OUTBOUND',
                errorCategory: '8ip37w5tvrkn5799cl6djkyd3sj9i9nuov8x2ueezbber717snpnb632ydtdwg5e5p2bhu57eplybbi9sunq18fopjdurkb3zbc0hgsdto00vaf7hqn5x4i51vb2i00tif5pnbk6s9g7p2bv4ga35rynf91w678b',
                errorCode: '3q51a4ebwi9mzal4ir5woeqsicao1fnfvajygdz91c6lg3kbzk',
                errorLabel: 616638,
                node: 4326019801,
                protocol: 'rfq2263nwoae6p6of1pa',
                qualityOfService: 'fs0zw1l7oyuqjq17ddk1',
                receiverParty: 'bxupbd5aie5jfyqhfmozjroy1fh2v0d1t5whnlqcyxnn2v2lj1ch4o8tfvcf4s4vfa7y27clzt0mps79v9ikmrinyh2mc4gyo867wgnxw7cqgfkbqva7117evu9zmc3gjafe8nheswrldbatylfy9jh5pzoucscf',
                receiverComponent: 'zza9betdxth6az110pclfigkfjufzcpvyirh7v4vlam16gdoe700ylcrn16wzrtbxj3hslt0ehjzuhpywadpgzgsdbnc8ximo9druvaihbw5sizxk1e66rur6di6t6afsc7besn8qqt4pjjoezug4l0qf7ctdcn7',
                receiverInterface: 'riybn2fvieu1u4fc2dsolfvu0p8vv5gldf7qvw02nexgc3afhif2w82j495qdmazayv2vfhvvjeaaab5w3wny5ekydne7gxklnbnpcfe34vxnu8bpsvdxuz7r45hr0h8ud6fh9xpcq1rkhlqxyn4t3xm23hf8a3v',
                receiverInterfaceNamespace: 'mlmd0tmle5wppkwmu2k8mfr4rawlwemukqbaz80nmkrnv5y1oo8utywpxxp0cg18jmm8a6v03nq1i91yd809xtamdrq5x5jmpzrcgti5cdre0n0xkbxlnlswllpvv3oaghqvtzixht3z0xs89tzbi0cm642gm4ee',
                retries: 9788882480,
                size: 2408535843,
                timesFailed: 6599990339,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'wu76h6w3onz0ljs56i0kwpu3wz06poj9wjt84gxmuhky6owub5',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '4pns7r1jzh0d8lakavdv',
                scenario: 'ababpbx7866ca38edpqbchq26lsa22kjz8loby2atfvzhs89ftpj7x8ogz7h',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:06:17',
                executionMonitoringStartAt: '2020-08-04 22:34:55',
                executionMonitoringEndAt: '2020-08-05 07:07:11',
                flowHash: 'fkqm4ax1n4fvg8mnyzf437889g76m8n1kgkbf80g',
                flowParty: '4iskp6g2fibmt4ox6trqz340h0l30tmjkhicn3owtov1i7livgjpb639tng6ldirc4f2a7zm0zc6o5fr21hnq5l76rux472arx6kg76ar3m3g1mvkfr3knxrsni9ul2ia7o06pn3ab1uytry3uqhc19yg4kudy16',
                flowComponent: 'u9l0sypcgv88wohtfxtgl47ogw0n0sryy5zyiroqb9hu7wh1uqpkgmhtsobytjcy2u2xefqm4gyocgzqj8pts430vv4ip5c8il0q25rx0ugtcjndehair4duzn6su3vkmi473qiyh55xbssqbmbwpggb5s4o70fv',
                flowInterfaceName: 'rvrnu1t4wkz75ausrgti757lox90abqahfbqobvx4fpzjkghf5rhzj0iqfbd8qyxauwhbprib4py8bpojp6bc53qwdkb4zrhnj5qjxgrgfm6gw4svpf379qa4wyqi2herl5oprmxi0volaqcw9btk4036ujmchbp',
                
                status: 'ERROR',
                detail: 'Nobis vero ipsa ut beatae voluptas. Officia tenetur modi saepe distinctio corporis voluptas illo voluptate. Voluptatibus qui est quae at tempora atque voluptate. Perferendis doloremque quaerat voluptas inventore maiores maxime. Labore dolores possimus atque dolor ut. Vero omnis aperiam earum consequatur rem at dignissimos non.',
                example: 'u3r95gvfw01fzqos3hfncea2oe79agavlchl3zej0h8rellvin2nkiqo4md37riehk61cw62ccafhfr2mv1gshib48r9585ou5qxs97dqjeuyf2g0qi8m995bwtte5b7yphej6fau99qx9pbndzdfalz1mu122ge',
                startTimeAt: '2020-08-05 05:56:32',
                direction: 'INBOUND',
                errorCategory: 'kzofa4w4rqbuz8fxywwfn7wrgp3s7gekve9pn658kpw8wmjc3y1tb0f11hdr3vew338qrv1574tmqw7km2p0e1hix9wj8j4qmoqs9j9rl2jxqafzugdy6cbwj2eb00mpwk1ddmjubxm4g5fz3hkwxnym96ck8cm7',
                errorCode: 'contdg6gf789zbwxbjztwf1hwf8woz69n14rrp2d9cfejzp6bs',
                errorLabel: 837857,
                node: 4191534006,
                protocol: '88hvjlx4hi9c1a2a9cyl',
                qualityOfService: 'x7dmln9tqizdwvuij6e4',
                receiverParty: '25guqyb8zzmaysabplv0tvc8gq6pc6ep9sg2gmx3cy1xn93ybtwx06lre3kx8ao5ecsg4fvwnkw3m7gwk14yf4219kw20gxjrcesvpnlnfctj0h6yrdr475rsrrvab2cdo2890sqrcp18aj87jm7lesp5udqm6lq',
                receiverComponent: '0hdejywso27551br4j0cj30z8u9vyx1563e9v2dwad1w7781wxhqawp86qicvmydg6rdoshwfxg0mo3fbf1zber5ng39l48x18psuhs6a03iit6n4ljopq8ieny7lh30e3jxvpcnul1b2plhtabjiw57510op980',
                receiverInterface: 's9l6b9neze7lbacqus65rdrfisgxuc3o27f9oan4u22jufz76q6lr93plx5mrer36aj9ffv71wj43hn8c5c1jrdqgafi6pkuwzplm5v6zzgzh07bthu0an9r633s6wpfovu369f8v7s10gyptymeppw7frsw33tr',
                receiverInterfaceNamespace: 'yxj0umci3kel3ayyalmgze1kw10eyii27xn1on8jxyzqtjk9r3hkv5c95n8bx5iomgsuya1gu76ou2jm6huerezlgbmbi30x1fr1fmmfzzbdyx20pu37mqrfzpbsp2g7gvnyq4wyufwe321llf1ccqzy0u64de43',
                retries: 9298545912,
                size: 7168822277,
                timesFailed: 1040288130,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'sp4rq0sybh3n7dj2bt8ogd2s2viiyapqmege9o82caebg3pz72',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '4duj0pafmfw47o675mvf',
                scenario: 'stkucidchrcev7zg57ixnjreaq9x02g35bopt9n0arzxpd3or3bvuz95latn',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:53:25',
                executionMonitoringStartAt: '2020-08-04 21:59:32',
                executionMonitoringEndAt: '2020-08-04 20:47:02',
                flowHash: 'b4afg6akdvany07coi0zqb1pvwvv3jqq0uy9fb1h',
                flowParty: 'xh2h1yfn2xh2kd8lfroaz4wnyyl0o2n3m7k8fnqki7ucseljijsxxi3ebipf59bcbpmntebf3d8zc9ez3lphu6gy2zmkmvt771c35vlityg6yz0w07g8t9i3q717vlzysby8foo3deyznplp156lufjyvj4flcpy',
                flowComponent: 'jrk05o144jlhwhnai5qsrmv96l8srqzh07jwmlzmsw9okdu1zu07av9vjxtdkvnweqlpep9mpi207d119ntczkjtrc4ib1vdh2kghi019dz4ekm5u12v39fffmnsuik0ppe56pym186tz9pxu0l4s9kbgiawax2s',
                flowInterfaceName: 'i9act0n2tf0et74kpgvqttgse48hrw7hcg45kn337ru18rej39xz5kdnumjs9h2wiixpeiy0rs4kl2zxbh1as4fq0sfmehz66f0puerdkzafq5s61ek6gx04lmpcpy3dr31xwwov1nfx7smqfmfp16stb0dsbw2f',
                flowInterfaceNamespace: 'ypigrstt2o67a1v69kb1s1jrt7cvubey73r373gj6nvkgmw02d4og8nt3d2bdeuxbdnk70oo03p97b6omj9dokdcm6y9hmkqdka5prs59u5n0umnk8ac5av5po1ybjruyfj5xrgmpi3tpnnhecs7qf77kkdkbt12',
                status: null,
                detail: 'Ut provident et sit sed aliquid facere. Consequuntur qui molestiae eum harum sapiente nihil nam consectetur et. Corrupti dolores ab suscipit ab.',
                example: 'p8xnj0ef4lxycb64c7uv5kkvxaitqpmp542aw9fr75rjtt1xfjgil8fxmukfotwjp705g5p4yy4nsuvhs0lfmpsnrbl9sz6bxfd5zetht5lhhyyvebx5rgquraqnjr6mwrl7f88hsd0ju02d4h2pbjt9fx6yiapi',
                startTimeAt: '2020-08-04 21:40:17',
                direction: 'INBOUND',
                errorCategory: 'dhj2ma7iqcounrfi1zc7civ9b5ehq9bobzl09be9s9000pdo2jvy3upngn77pnvy9sw9fm8f89oa9t8hiubby3peext7yqb0ytyw86rzbhx0ct8prmwk7n5idiqbvgsvwsyh5p43d6ymjkn5ax55thzt1u3pqc90',
                errorCode: 'fb9q96i69r4f6eimu3zbu2o5bgjwmg31zk2jri7v5q759yjggn',
                errorLabel: 439181,
                node: 8056656065,
                protocol: 'gdhb7oy62bwdxc2owrmq',
                qualityOfService: 'vjpo6tjd1vuqwoyke0x2',
                receiverParty: '4aii0i9is3wn4qwoopatgmhntlenybvqq7qyaz5yb3aeo7uay9ph61xqvh5bvh8ungu5jkw3a4pcqmjgq2fnmmg2k0i63fswg89c9qlalg6n6l57jx9zzj40z5muatljvk977otchzvakjxafmsch126cjagm50r',
                receiverComponent: 'uho0cl0z7ssa21c7c53b53isbupc3lw1p088b9ss3qco9jetsijwgicqpu139fzeosq9i737gi6vb4y53458vyiczg7kao0moen5ir6b9kre48l4mw9hqt2gbyjw8pn5cshgbfdnxpl94fju5f0ve4lqknx3min6',
                receiverInterface: 'tpsitltk1rafars1zlw1i9ft90c9072flebswrec1k6aixn9vu7n6dr1hppu1yikyukswkbswvqhrepwajq73l2e6yef5ejhsb0fbckdm90uj7o8s9ti1g115vuv4e5pgujcqayhvcts634dhn352nyrwcvr9ip6',
                receiverInterfaceNamespace: 'oa3lbznbzl4xi4e1vrhia3peg2rnqjw20f5g2fp8rbwvsg55ya8ntqzsa0krqz0uple1q8gha2dwubphpvo73nqpyzidzfqwnakvadl6nrvan5y6vriiqijcxedm8d7r89bogwk52d7k0vcux3md8q1eut9cjplj',
                retries: 1349994619,
                size: 6748957094,
                timesFailed: 7773241252,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '0t0wzxfxudbfvh5ll9c2pzkcijnc8oy0pvssf82oayfxteaqgq',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'vjuf0gkg1a9vmvzik6f7',
                scenario: '8eaxtvtaeofxm6hafpu1br02aedev74bsrhlvsiqmsqisjgg5bdmr6navvlt',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:21:27',
                executionMonitoringStartAt: '2020-08-05 03:32:39',
                executionMonitoringEndAt: '2020-08-05 06:36:22',
                flowHash: 'plerkxs1e6cz2rgglw9uhysszqpyt8kw7x9kufso',
                flowParty: 'suc196ed003yqef9vb4c0ow9bhh207hi0gp0wjgvmd7kdc6t7vloqi3h4xpn19peu8bvcu60bj36zbuqht8w0awo56qbmkpbhqzss7foh6xr99e2bk4zyc8s0jbvn49ssl2sgchysg0pyoel76v9k3sja9ytf4p3',
                flowComponent: 'gqeb501h3beanomzq8mapwax3bbg5bbzf1mhk6oftlhzjug3xyc6alfy944iy4qhxsd67vdwufx3gtljn4iabtje6xsrdykbak1m0bgkox8mvfeg1mlf1y7y7myqleah3dm796mlhcxqhe968s7jxp22ojubpks3',
                flowInterfaceName: 'tqlasxs9thlbnxmi7m5pyt1izraajpuxr3aa0dirrd3446dgws3im92htsg3v69kksymh89ubeom9f81ex5h4zcg7qp80m8pdksnzabhzjzcjhsefx5rim1stw09fezhjf5cewvcdqwn8q3uvyk2jivqapdwsl7d',
                flowInterfaceNamespace: 'os65bt3slwwc4yuajczkzhez79lxbqozsmk16nfc96e4sov54m32bprpzfeltl0e88b817dhuzduirntkgp64celoyjeu8928ju26lhjjdkszfy3gm03hkcw8258iqzl1l75bmihoo04q0dkh4t5r8ll1pdkjcct',
                
                detail: 'In mollitia dolorem maxime et blanditiis velit distinctio facilis. Deleniti quia enim qui harum eos et quidem est. Fuga impedit amet dignissimos laudantium voluptates est.',
                example: '1jkn7ig8ugik4tb8d6kb80d9fqrckhg1zgt1xi3b2y23txf1s60uok9d6ji6lkkikd4f4akxtrg7sehdlb46yzf1wm4jfnbltiez2elx8fmnp665tqgdaaluqjo1r5rou52ssg9zftk2vnlchq891os5h9rvxcwf',
                startTimeAt: '2020-08-05 03:52:27',
                direction: 'OUTBOUND',
                errorCategory: '5j410usn05noyxb7zxlzos8yqrxrh8yulq5bof43l5nxpbjeqec2na8bjckp5t6mtaf0omunrkvhh4nljntmgr8t30hwzwbuhscybwivkjwl4jefjh7szqzd66a8ekcl4asjyowthe1vmluont2a52yjfenw7upt',
                errorCode: 'w8q30ulp6knjfekd4esxvud1l6md2btko53ihmnfjirmyrmofw',
                errorLabel: 288209,
                node: 4798918672,
                protocol: 'dimc6q1sre0s0ilnnq5r',
                qualityOfService: 'rrd44sehni5lzq1jlpk8',
                receiverParty: 'bkfrwmag077vyhp2mxj0770g3om9cigrsk66ytam71ejoakitdwuxqrk8ehltnlsf42136uiivc4er2j9xiit76j3s7gy3sf93ysdmvg5zui9mgvw8wpqny588gd2gzy5qpsnepb6ge9gbabvyrqpid6r6svof06',
                receiverComponent: 'qhtol086n1ykhf9p6kvpuwvu3pfkaum1fwp55th4ct4v0u5fams7m48cavmpmejkm51abqh1tkw5dyjsle550okqyal0dmz873hmwql5z4w7nhlexqa50uqigqxem59iblbfalpk6mqyw9qq02slirjr55z9v6g7',
                receiverInterface: '6cbyeeq59im5fss7guno5cq5r69xdxgtvbnof3zzpq4lnhiousocgrt9gut5qwie9bsnrqcxqh0m09z4lsngj9gjcisiytvsspe429ny33igy5zj7kynrv1m76zlcaz0pv9gud8k710r82n8gop2z135vpwpvy7o',
                receiverInterfaceNamespace: 'izy4wzbw375pz7coyb71lh0s060wqt0a1ngsmi6aian0ptgq8jv5lpsd2mtzkh4cpuhveuhiuyuu4lqfk13ho9iq5h4t6zey97frpe8lurcsm2yltdcj3z0h6mkeje1whqgd7nxsvc8gx4w64d5yafpfxujo45up',
                retries: 2079408109,
                size: 4038665091,
                timesFailed: 5340186693,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '4oofrmpdq6sh3tz4e07tziz6q74mb2c8g7s1l0nbgtb19os0sc',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '5hn15yt0690jb8pajkjk',
                scenario: 'nced3zn3bm5v3nuzajcf6df5o744ojvlknkkfsps5ide2qydhv7yuwhuqdat',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:15:30',
                executionMonitoringStartAt: '2020-08-04 20:28:16',
                executionMonitoringEndAt: '2020-08-05 08:06:36',
                flowHash: 'gg7fiizqzdf20mj6y1faj57nvxhh6qfxspz2oglg',
                flowParty: 'r7ptzbym73clwuhd694v2n2a4zjuflkrczrpnh25l4yzin81cn6s1uxqecugk5zp8we59af9mf6dzd8gnhplqg9y0dmeprk6pp678fqysz2zuryux9ynuca3i2h66iuwyctuvl7eawldz8kb0r6l9ixls80wqbap',
                flowComponent: '0tw4kvsgenkulgpscbhzecb9399qdd2esgex5yo00utbj8jrgkh3blznmnp5gng0xg7ylpytavzdtgzb7vp5qcfi723q4c4vf02i2fyld6kbtebg6fi6mqy5hyn0s835l7w6heszacljv1u4js38cn47eya7b5vt',
                flowInterfaceName: '6i60ch73fzhpvvvwstcqq8a32cvxvmxehfxh7nuajxmrau02a0uju7ir0lgtoq070i585b86wkhvulhi9vp22k4g3ecu55b7142l59fm38781m2egvzpvi33bsqs5wky96xaguy3af28b20y4xpq1p7jq3q40t8u',
                flowInterfaceNamespace: '25ud4rugef9w7ftsl3pij51uprg8mq2przva6lbsaflwxdtufribyjsz6u29kdfhg8kztog5nukg6pzj53owidbekt6thju6ayi76vxjl3fksuz0pjb7c506ex0qt9z3d7nwvdhrix8f5g3fxaunofsx5o9gcx94',
                status: 'WAITING',
                detail: 'Dolore omnis nesciunt est consequuntur esse pariatur qui consequatur. Beatae suscipit atque aliquam sint sequi. Recusandae ratione et itaque doloremque quibusdam iste ut. Sed perspiciatis nihil amet sit. Odio aliquid qui.',
                example: 'qbohce9cwqxjvcj18ul5qs8gfcvu90awo0415py692l1ki5uxd68cu2vdtdhlc8owsxehljqtb9mc952hykdt2gaudzveo9jqph5tsjmw7y6y6odd8w02n24j2vqk5cqbg96z3bblps6jol71uy4w6h5t63jplpf',
                startTimeAt: '2020-08-04 10:45:31',
                direction: null,
                errorCategory: 'x5hgme0emjirrbkpijy4ycod4bz1jmp08ln8vdebdb3kvu3go1pvw254ouvfugkrnixvwx5tf4drpu7pgfi7ktaar56drj0ct3z2j5k6m6mjv26q7rnaptsh3iruq6lle262l849diikb6x7ytr6poybnicb2417',
                errorCode: 'gnabnz6p12xzw123kuuuq28sj17b2a70sy4t6fxdkao54jf3ef',
                errorLabel: 270703,
                node: 2294804819,
                protocol: 'l0dm9m9dwazbxor4ycsy',
                qualityOfService: 'uh2qe8hzvvt8h2c1dxb2',
                receiverParty: 'rqb1ke04ie0saj59n17k9amgf3p58eg6ca27edpl0jmc9yao4pj1e90tijl8olwh514t6lbnp2y4avt1gdsn9qknrylk87bhvo9zyu9gb0sa8q53bdq2tva171i5mg8jazhp0p9kfh81jku617vdbel5dmysu1uu',
                receiverComponent: 'f2et8gab0twqrjae2ysxleiwiqr7mo9cmdlrwo22zmqfhjw1dg8raholzs44hq91fhjkm6yra7oq4g1l3bjl0460us1qjifpu9sq5qcazaha1yquewdudu3yxo2jlvvjllgmx849dljck3ppgnu0rb1ey89rirdf',
                receiverInterface: 'jbd8i5hcst7ck2lrcgauq10ft5mf2j4zk3java1ax40x3psf07euuuwr5pe1d5micw188zpgziq6g7n7gg26cfl5ed75ji7x6fp2im0ugydnlqo1oy7ltid13x9mggyjy51geaj3muc2y34mytyjl4ojph8s0r3p',
                receiverInterfaceNamespace: 'g9vxzwjktyla0tey04hckpz3okomf8y8bqpkklyw685x6v9hfd79s3vb81l9g054w2lbkcx7zllb3wksvwwiu2h7vdwxzy33rcna7alkitiu4gt9lc3yr5w09jm563cyytgeo1jtfpcycdm35ax1gar4zzwbl1f2',
                retries: 6126965844,
                size: 8647917129,
                timesFailed: 4659554616,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'ax0xnbok55vvar21jrtnwp30en24es96ur03eutdo6yxvok096',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'ecece8sdyp6ckp4xwuzo',
                scenario: 'ej8nr36m67y6r11ut51bfka2zzj7uvjh7f5pcjatrvq3omiozy35wtwyflty',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:28:57',
                executionMonitoringStartAt: '2020-08-04 22:39:24',
                executionMonitoringEndAt: '2020-08-05 06:44:59',
                flowHash: 'ndh87c3hve3v8j97c3momcqnv01jnksvd1jw4zac',
                flowParty: '8klj9ujcxqj4sh9s21ys5bcb9pvdaye5ed49v5seaptlvatsx60qqba21dl3pd6hutor8apntcpfju3g4jid2kuzuo341pc71sr42xkpnhzknmvwr9g2pptfyybbdgz9tsdguxfhobtqlo5enn37h1hhldqpoa0a',
                flowComponent: 'skc6unnvu0pc23ysg0diplkvmvyy60utxpe7i7v32ev9o8hrmbb5f6litysvse4pql92smt4j2lta67r8z12nfox1i6icy9k6yyyd17dk49pkaqbfm0xwjxgey1gk2p86z1wykbn3kty0qx4dpqs3iz42u5191d4',
                flowInterfaceName: 'e6apmhl4edjqv6ztcohvb2svx692h8uh54583dbjpikjsbzvi5u3u8xyhntdt302bgs3fqssphnscyyhyylkc51roe6ekdfy9erkhv4zigz10bvinqdbjnv0ebs5qz2f1hdsr62ul4hcq71ucnugq3t9b5v4sxvq',
                flowInterfaceNamespace: 'v2e3lkh1d5ulq04vms2apks2xt55xwnlked32pf6je9j4lugmwpih3qlik6e8zkztlh338ont1moz3aqj2blg4s23lbj6d6rf8mt9slqhywy51asfyyzo4othb4et6f7fo057iljxuxttwcagqlbptln1m27eiyk',
                status: 'WAITING',
                detail: 'Non nihil perferendis quaerat blanditiis. Consectetur tempora vel ut. Exercitationem accusamus facilis doloribus dolores nihil eligendi ullam. Quas quia eos sint dolores sapiente molestias et asperiores.',
                example: 'fneiu9auom1xdi0t7f1033fckk4xa5db2g2sfbu7mhe88be845gqsr0t0wina152eugec6y2gnkl5adc2hqyqfl7epyl68i58jkjui94ry3kykvhjkhnuy0bpb2rr6pjp6ujr1h0giehrfl1dnsbo7ufjb7cacyd',
                startTimeAt: '2020-08-04 12:34:50',
                
                errorCategory: '20wdslz0xbm2r0szmnhcxjrphxnq3h78279az622y6vwb98ets9kav1da2lfxhg22yf9m1eqilu5ckbi0hm4xsml9aj8comll0fincnar49aaoufhw5au2s08wl4mmr08e4h8iary9f0ju74eub6e8uzftvbmxrj',
                errorCode: 'rtk81t2e32zvxovtjmsqngg0zu30212p6srdlx5ml0ieyavq6j',
                errorLabel: 824545,
                node: 1967759276,
                protocol: 'tb51vhjgmu2ozxh48087',
                qualityOfService: 'pww7ai8xlimqtz2kbr2w',
                receiverParty: 'qs66mdtsv6cgey13eotnlhd5ng51m3nm3b4fnmttve7nlfixq5enfhc542d3dyahekud7f9ai4ch92h486zagsybspot4akoo66cvwrzt50zoypd9dcnle1i93xqfju78rcm0n8ccxseob42qum1k8lvedbij5nf',
                receiverComponent: '6wgpy7ihn63uckoqqfx7hvfm3xxbz929zeibjdhrbo5ttixtgfq4q0dcszs8x58keubgmcakn5mm4kuxz53ds6nbw6s1qcvkk0uyly463kuvzvf896qoqskvdqgnrinxp2jnv2az0f83wgj05r3arwttpp8ireq3',
                receiverInterface: 'zu4zbzeky4b845px8tsbg5ktmezbfvvnkjknrof3bcjzmt3650nfx08ld142j2npmnphxgrokf3oyfoeapl3n33ud2mhsmlm939nl11s2rjjrh6nhy1gdktnf8jtuwvmqdbn7baabr422bu9ioqg8i2532kjaqgm',
                receiverInterfaceNamespace: '7r54z6d2mqw2kz4r7yook07yt852rwjqhm8hk3rm1jzwupb14232p5xiap1fcu6ayj1e9l57dekylt6yvs0mol8xiyvfco6hagm361mcv7ja2bx78b7zeg74iyke97fmqavil67bo6slsqi2j1hwxht3ryk6tlyc',
                retries: 1778073177,
                size: 9402053951,
                timesFailed: 8605441349,
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
                id: 'hwrq4f35ismykyhgr7nauup4m7dyancucfymx',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'rp9bmq6t1tlh1uacrhderkpszfkayxc4866ujd90su2xbifkr3',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'xzpbseyv7tky8wshycc9',
                scenario: 'cmqiv6u65ke02xbon2ks95a9vfilr2cvxz2uo6ykps8ods0abr4dczom0ag2',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 15:45:15',
                executionMonitoringStartAt: '2020-08-05 03:15:01',
                executionMonitoringEndAt: '2020-08-04 10:53:22',
                flowHash: '5jsma9ce5acdgcoi92npqxm9sjm4jpjzdeagt3ym',
                flowParty: 'cd251ta2fn8oocnqagbj2yulperxgqe7gow0lwptw6hx4hv8vwu3uhzom86kp9e49qjdhgo2v8sptrdc8avp6c7b828fi2ru1ybjrqdnovzuot8q0125r02cexbjdv19tburqixo6160gmrtow9mt2tmifkmbh9t',
                flowComponent: 'l7ow7fbanbk0krjl8u9lqbwx82l2gtyvcvrgqj0ehv0v7h7hhop0k1f5qq0gyaojtnskddquyooykndilre5bd3cart3nhh16oj9xsaavhuhu2yk3kr3f2tjmkhmr3nqm5gac4mq3q5h3731gep9tr7b0kqm87gk',
                flowInterfaceName: 'dkeremqzcohlrsf4i40y4jbzdj03yoz4opxm5vaw32vwjotc3sm26njjkxzuw5ojjkp1c4dktdx2wo9hnlxclb5e06kumblor95wpm3vqzyaa2b15il6wa4v5exadmmv2pyondj297fpk6crh5knh431ddwoflxk',
                flowInterfaceNamespace: '9qm6kdalo8in00nymn34xnuabd8gjk62hvy8qbq5mmhmbdr81gjwxbumyimt2kf8mqk6glhjjpjifeycof2bzshbb624jblsf4db6tr2o4vaczktgkb2a1zgt92jmkt1s2ayzvbxbe26dn8z03jyqs6lpmv9ixqg',
                status: 'SUCCESS',
                detail: 'Eveniet veniam quis et voluptates accusantium quia inventore quia voluptates. Sequi esse laboriosam doloribus et nobis omnis quisquam recusandae amet. Dolores eum voluptatibus quos eos similique laudantium.',
                example: 'xilu21k02p3q1q4rg24p1e5hjqludc132sp68ctbr1ee60siv0bx1zpwxbh6s9hkuhoyu2qk1vd2of77fume0ewov7i4wlmi8a12l8s7ohhscxrmqdkr7sm94l7gp18fgoqy1hl2ks0rrlv4o2n4sg6n3ax3pylg',
                startTimeAt: '2020-08-04 18:58:47',
                direction: 'OUTBOUND',
                errorCategory: 'v0eugfjvu9pnsmbm0urvfl805c0rhvaeq43c1iv4j5sxazrd33s79wpelhrwnadiac9ecr476esqm5pywsy0jmlt2ibtxekkg8id36j64oczpk6e2wmlsjxhie6soij0m7wy1snn5xeyo36yrzpx06sdx5e7gfz7',
                errorCode: 'gdtcedjkp01xbvrt9f43k0q5og2g1v2c8ets1jcaezocdvnx4d',
                errorLabel: 398224,
                node: 2068810564,
                protocol: '76zchs26qk4euy7gaz1y',
                qualityOfService: '332ydr9k3pt8tyaiod5p',
                receiverParty: 'sn0a6ckmrr1g8o93d43z6cb4lvsepbj5pioggp7kmgiawc3yyvzeginyuljil3gp9fiy2gmdnn6tcngnw3iwkvyh68siqhjd8b481e55fbp1fpwhxmfue9h71vqtqd7ku4kqgpd1vhcp50jx2txndjl8pierenmx',
                receiverComponent: 'cyvi83551xrva5u75la33rnzmcvdfenqikzxebyg3tuokf8iqg8nbbhdl1jxp6rsi7ikk82q6awft49w2zbj7bpvigvx5pjeasxgwv2y1pugbfw2toezmny7q1ubjlfc3pzzlkgvmrq0ci96x6qw36zjlb6qf3z8',
                receiverInterface: 'cch387pqqx4z96go0ksdvo2lyjy7xtfcz9yjto03vg1gohnkl8ybxxrqxbnd9iflll9kfn44ah8rlete4rcxyc6tm0epiyxuhwagssgxnrvx7cjf7qbao5mkj139jd7qcmmm0c33p1p5e80g7v2bqmtmp6d58f0t',
                receiverInterfaceNamespace: 'g83bbgjmg8vdyqmyh1pwjjlhjfd6qsn87qbxbev8063x04ig1znim9httazmb3xr3dhm8tyh3w15mizfashzutccco72vyqm06qghtiph7g6auoftavgseupoweg5vqde0jhen84xq26cu0i3zp45lkhvibgq653',
                retries: 5060042861,
                size: 8868784461,
                timesFailed: 5110579562,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: 'fx8up12py3zgicejrloa7a6q5wcs7a1jlv48r',
                tenantCode: 'bhd26zcyk0cvtwyjgbu5fboxoqo6t443c90jrvspqnaptjrq50',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'fj2zch97otcizf1s9t22',
                scenario: '77mf20evcqe23a91ve89hwwkh20dan0w2x6t9yi3izxh7hp5a6jzrnbutyrr',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:23:24',
                executionMonitoringStartAt: '2020-08-05 05:46:46',
                executionMonitoringEndAt: '2020-08-05 07:22:01',
                flowHash: 'dtww0mrurc40znxr5e8p8bczpolcqkksbcmgpdw4',
                flowParty: 'butxwc427pqwa6at52vss3gqrik198gvqusz9p9ypzort9bdwlcbshq6m5h4qqvklqlf2vri94y4ijp3422xtin3y4bgp151ujak5p8696eb3jpm3rgtl7i3auumy97b8id7iidj1cvwd47r5k5nz4cd4c5c8gxh',
                flowComponent: '834kjpsgdf6nhfzuxjhuew51ja2pt6qpokqqz2bzm4a12xyzgn6jmuprao57tsnxg0fy9uf4jpk4l1yereec1fyku9yj92d1vaak2qyh0r45djx4vur5npu5imkgmm4py06q82uv3ha13n9ryi6wmdde1rlhljqi',
                flowInterfaceName: 'dru57n1v5v1x6jc2rwhlcfagqvdgtde0floypcg5guh13755g8y3hamkvqy7piej8d83w8bvwq5v7anufk5z9wtui4isirz02fp4t3mmbz3q1f2psgue3odmlui4y10e381oxhdc2sej32ukvrxiybclznjtbepc',
                flowInterfaceNamespace: 'rxkwh6josjgfx1yz1ydripc237cv01hzq7gahnv0ek24uv2635ant6tnj2rs5ua2vgejxrr20oo24w58gefrnp958m3j1zg3xosmwec7k5tfzypmuvuw5ab40exsz7wv23onyzis0664e1xnhynabnjy5kcmgzs0',
                status: 'WAITING',
                detail: 'Nostrum corporis rerum tenetur sunt. A accusamus assumenda nemo iusto provident sequi eligendi cum. Consequuntur accusantium et. Eaque quis iusto ad modi explicabo ea sunt non saepe.',
                example: 'jfv9n0ygxc26zye5bnicbs5qjuwlx2p21slloas4sk3duztfj593k27hrblkyoypq7hv499pdpbpbzodwvddq6iol512b83qa8n7dbmp98aeq9h4bphtjktbw43ytu3tsopigbhoi8cjm89b9rmgoqdn5xzvc5k6',
                startTimeAt: '2020-08-05 02:40:01',
                direction: 'OUTBOUND',
                errorCategory: 'swobsuadsuyz4yeyakvxyobvxxlqb847gszosfb0gg2tiralygefnwzrhq8ckqpl74tj7vtzkilbpesfgfau06ovsi7c2nj5bbpfaz9gfvzu1n8efdd5b9lo5tmx9bhz6qrfitwm0m0uj9ofp6v5uq8n4ysvg30l',
                errorCode: '0e5r1txxsexrt5ija7nakoj8dt0g11xgqzqlt18eui7a63hqnw',
                errorLabel: 745975,
                node: 8457822694,
                protocol: '1pdfg999f6iol8wso73a',
                qualityOfService: 'zqxd9bll231u0wj2gh4v',
                receiverParty: 'agocdb8n56w690pmyi7phrcrplmctxbwap6duz33camfhftey24ytjjbz7gsptdx96wyyn6g3yrm3fx4zolekow0xrzm8e5os0fecc6ieakzucpcpdne85pjh5ansorb47uc0507a3f0u1l3omh1pn223l9zbi1x',
                receiverComponent: '5p4a43bg36vbo54vt6wxvjjv58oi3s4n3alefz4vllbvux6idsw5znhin0y1szrv6wlaxxvb9mv4rhyltmppf1kopfgubapd8pnxnffpyvf83aypsbk7pvaoc0dz20mvcdwl02cjrool5hdmezqm7wbun2lyhrbi',
                receiverInterface: '37qd5u3e1olgdbenxhuztvbu3vvftpo3458rum1bm1if1mddxxmj3cx0oxgk86wt1cxvp3v533qakdcjepah0bonj8u7nlntym5kbjjfvkyt9q0mbtwoxoskzvx8hice56wa7pcb1crdipw9png5xtcsp1t1ppnr',
                receiverInterfaceNamespace: 'gnvr45iok4fxd9if7627p22hjkiiti3x0qdurai7egg3nhqeguiz9xeb893abihpje4f94n1oknudy2eq8d5qllfp69qjy3090xuafnesm8whljexic4c9prv2hrfc09c4ab3pmflyp6h640g8p3eoxh37x9d6fb',
                retries: 3321411273,
                size: 5665105063,
                timesFailed: 5570334245,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'rthyjpkoebt0y5hklhn0u6agndhwvmo6uaoybjpo6cnyyqoe29',
                systemId: 'xf79led3k7hvxys3yxdzamln75bzdqz58gn98',
                systemName: '1oxrhylq5mbop9kgkmiq',
                scenario: 'lxn0q0gz2jpebeq5famhpusiii219i9pzcphnea6v5331xuh5q6sy3l0ykvb',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:44:49',
                executionMonitoringStartAt: '2020-08-05 05:13:12',
                executionMonitoringEndAt: '2020-08-04 21:19:58',
                flowHash: '9gem7spriipl8so09tzsz5b1j64i9nlw91erya3i',
                flowParty: 'ffexylfth5amfosdofixhd4ugn2pmyj0e912akqfqlxawz2jps5o3zjhh4itkegw9luhyu9kgvt2lp4cua2ichpmx6b0u5qg4ypcv0g9pjos8k7w5x9qlgu23qpx81u03mv8xss122iiuzlk6749t2sbh2kgo3lg',
                flowComponent: '5i33ug7j91nyo19bx8nyncrebjipayicgyow89fsnkekehjmdhf9fwl7bfuam945bjm3noemgn1b0kxrjhsjk3yu28dfog12val1im92yy3ec6l81iqcwmuy4zp60hqu07mj4fmz7bfn2c8eskip2c7hbefvemxz',
                flowInterfaceName: '8qhrem5hi5iabsgr7qwl3crbt35mv3sxyus4hh4zqauizmr46z0vccwgd3sg46e35un290fagjszl1f4871xpu1gg0c9qzw34zup5qluynu8r1d3l6iozg73nplznr5g0szuma0pt76ta23mdo2y3a8nqo9yjwm1',
                flowInterfaceNamespace: '20t9dw9eh5wyr74lqlqgs4vgdfml298894rhpwd57f7h2epfcjiubk4hgefvgtgzdgcen1b3y4yqjmabx9prh9642osvq5viojk9q6sigtbd2uyrqqnp55s1dzfuc5srzyrjbc03nsa2l5r7tv4tkthc9t5si0lk',
                status: 'ERROR',
                detail: 'Vero ipsa aut ipsam reprehenderit quo ab et necessitatibus. Earum neque excepturi illo architecto. Qui maxime ea eum optio neque alias officia non. Iure unde autem exercitationem ea porro. Beatae sit est dolorum nihil eos illum.',
                example: 'x538gpvmdfqh89j9exwqpc0knfozsbi7m086wtm05r8fyt1w22rm7esr30n9u14ugy8jhg404rjx63qaut4f22uo58568jrkn6gupof0x7694zhnl6ungqt7h9t8082a6kythinpttn4osxo1sk0gb832xj8jhlw',
                startTimeAt: '2020-08-04 14:14:51',
                direction: 'INBOUND',
                errorCategory: '9fv2pd3gzvoayqjejc9o8r6tscxr6wxqokyvhpbtjsnq38fqanxwaj3izg5omqv72inob55goabaml3z7pzyllea03wu6yqakmpnyb0lhykrrl14mwnx8zj7wts7avl7mal28byuiahjc3tofkbqn2olwyysrfuk',
                errorCode: '02n6kaadz1jn6bb31nlg00fqqm22woc5m7si54i23g7gc70eq3',
                errorLabel: 621386,
                node: 1072352714,
                protocol: 'wx3nf0duxz6tj9xa7jvl',
                qualityOfService: '8dzx5gk5wmmzjqs6hm0g',
                receiverParty: '8ee68t49c42jkxix79dc2uev4dxsm1977y63e7g82974b3u8qodoot5voj3s6bbj45z6ox4j6f2u60f8ohsd2rn91by42aqf385ba0kjjiydqgkkcrwdwvpwpucpuwi50u1nsypjcy8cyh87rx2wq6cn72b3mpq8',
                receiverComponent: '61kgeof7ixn7f45ztm2f6e0rsnmz9u35xaul05pys5u123oy0ojj3kq5hzj6kud3tidp2d2263o6vis0xnciixs2cuup9skeqgl8gz2ofhylfjius3qpprz4zzvjj4qg2qk7cr2ejrcg8qdh7sa03e1ejy8fhnxq',
                receiverInterface: 'uynu2158oo1jpyvhrr6qaqyot8osnpd40uiw1inump9inv40fwk6ilwqhhm7qk5h2db9dzm573fm28so60yaofxlnjj0m8qv35hf89qfzdzsx7ailf34yljcbazeqhlh1udq9vruea5xyuabgi3lgb0zvebugvtr',
                receiverInterfaceNamespace: '8ij6jx0lmk4i2rko7lgdjguiozrm9cjfkoixm68ww5dro9395i58na8arahoe0e5mvlgtbltai07b0xazi0v42ql1gpdc434n7qkjbo4gyrzwhaxcvqo1b1cq7yp266udf09ngowotgfg8gz7nn9vpbe81xdfslo',
                retries: 1344352317,
                size: 7606909178,
                timesFailed: 6524513918,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '09jz5bcl5u1lxdmer98wisa0xvb40i9f952slj2qkspoo5ts0z',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'ymtoxtc58g1bitpvgykf',
                scenario: 'ec9kdvvhqv0um0necquikq9n77oor552xzjfzgsm1yl12anhul2sx0fysqq1',
                executionId: 'prt4g4r3cgb7qs85xf7uty9a5cy0736imzkth',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 07:46:34',
                executionMonitoringStartAt: '2020-08-04 11:15:35',
                executionMonitoringEndAt: '2020-08-04 09:45:29',
                flowHash: 'mm6cacryhgx49q7qy2o6a3z2kqiclr4hclojhe66',
                flowParty: 'd92mk633hcntmxa385hcstyzfwb6cthvp9gb6xbv6tbnvbzgbet6qw1zrzrrwgkwzjt7x5v3cg3lvafjvrjpfe9tafpzgr3wn5r45f62r5cjc3rfdsc9tmylzjp67j1m0mgp7hsj72c862p52o5u6zxi0dxaj1u5',
                flowComponent: 'g30kz7app4sti2nhfrjss7xlaf15spvqrwh7s9wpaj1leqnfbm7vwx0k0p3jm044u3tnggzwhgmobntttajwab72c5wxxs0xhirlwi1c3bhjyfu39ehylh3vx7g0j36uhdet7ze1jrzmoxgihs15t10gizjphbf1',
                flowInterfaceName: '9m63u2f1b0r14qtmrfs3rzv0y2bfvjubq2zjzdcg0k3t5jfibj4jmkx5il71u19p7hxdee91zdctfk0n4dzcrkun6mh31ul05d2tl5vcmyzlcrik1m71iinjjsvb73lzf79jjoj5oaume808c1vkyhlr27t4kivw',
                flowInterfaceNamespace: '9j8s0uasif8hvl4olz7e3jcc6zrfqkz9dvnh2xayqwhu8jwooc1dlxjfmpguac5w2es28649gh7sbtajc5mi71y4qnqkpy57bbi2o7x5mowhggcr1ycfccmlf9n2u4c65fidrwwok85uyrrwwuur0rqpsruj612b',
                status: 'CANCELLED',
                detail: 'Perferendis quis id consectetur quia sequi cupiditate incidunt distinctio corrupti. Corrupti dolores est fugit eaque perferendis eum. Sit mollitia quo et vitae accusamus sit sequi. Explicabo optio in. Commodi sit ducimus libero est alias amet.',
                example: 'n8w3gwjgpg140fo7l4pztch5ullwrke4ph6r8uf7qnyziwkskclcdawcbba1r9hchsqjzkouu58d6xpo3yd7j99m5y6grccevzboges5lnlu4z1vjjwr2n1n6pg68akji3kn24czgb1m0yaehmp39bkcqb5bq4s4',
                startTimeAt: '2020-08-04 13:17:54',
                direction: 'OUTBOUND',
                errorCategory: 'mgbyzj51qgwa9y05vfaxjolpnoh2b4l7qggxdfx7wviq5qwjndr1dtum16gc803a62fg1m4o8fvlc2dzs85eru2yc3rot48codygkcpopcktmw1cx9rrnoqgblsmhjecyqj7bov8hpb5ib3k3lyc2bzcvvx5tqyx',
                errorCode: 'pg8y927nw172odsdtiftxjlmr4f1t3o1k4km3bhs88ijjwdlt6',
                errorLabel: 261524,
                node: 4530666928,
                protocol: '9ui1j3qc40dpo3js7qpy',
                qualityOfService: 'ntyeq12l6tkluqrx84ou',
                receiverParty: 'jxwu2lyydgt7qa2s44d010ufwdz4p2rroebm2ay4cxktn51ca45dlokbdbdqztzno53grjfnsyno20n219dhhm7657fhdpngkm6i43bgjstwbgtroncl6d85y6f1v9895yymb6t3bb3qablfl2k9mxduzs0t5tv4',
                receiverComponent: '785vt29j90gcg4xmin9cf3c22y08qla9adq2mbdy3xtxth33apdp80dwcx92ytmhkf2bimvl5whsmtqq2zhm11m4ept7idyq3oxljw532ryozl863hf6z3cupx1hz40abwaqmah6ggtjv7yhc2loutti6qgfykcr',
                receiverInterface: '361z1lb756nseq1hq11hq0u11cal5q1kmc3o8a7knx3r18eyfm0bclxogu8pkjxx09eiw7h81vf52xbisavo7vv0vdl6cjkkplmgy77loagcl60s1u2stni97l7tq1owx5ni7hfn7lxpw11lk8gtvqnkctawnust',
                receiverInterfaceNamespace: 'nhq6lw7sqttjv6bl24mge9k51mwn41gtzzqfd1unkdlm8efj9tzafheuaoowpvx94msa92z4ie5ngmz28sj832wpx7hn80llixbaj6pklgvgleq7byibj6tdnewjmvh4cu7w6ogn78i06ijt0rg47gvaxxawb1pc',
                retries: 1992406965,
                size: 8868548380,
                timesFailed: 4486507612,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'foebg34pdytqwbrhvba10p74v8q0t10tqunu316cykmce2twz2',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '60kx9gy0v2wqxqh0eatg',
                scenario: '5kdxl3vthz2c83a2omuf8b9lfzh0vfr8gqlxzxuabuzizbhxl9i1oo5gvav9',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 00:00:41',
                executionMonitoringStartAt: '2020-08-04 19:25:32',
                executionMonitoringEndAt: '2020-08-04 16:57:16',
                flowHash: 'b6ckodflgo9bz7nafp6vgz8qhw2zvdzej1o9lztul',
                flowParty: '7o9acrnoo2ihyvzxuto34equyt2yv5f6sky7w13nxreacfxyodi48xn9wu3fwftvnip7ucrurkehe0ieh0dcj32yywa31609gzrvy0taki8s08sm021qawf7jqztbgd77s7wln5gev9h1d0bpkznajezusrdfqvl',
                flowComponent: 'wkhct0khdwdsa7igbbppmuxk0jh1w13ma72quu3rjiwaeohmvjqdg33jjuj87j7mmclqxb4eb1csgjfccdrk8iokcmd3i4dq1nknb4eqizt46koakw8gm9aekkzqdi83swabcg34pzdl0pe8ff25ujd3mdn79hu0',
                flowInterfaceName: 'vinh7d84cklxjf4lk4g5yxlqomcw3y9bk5nukff58981imny20cyczkokaypktt5vycqm40j5tmo7brkxxqx4a6pd75pbp1cmfytyvzll3shefghmpgwkl138xu5fd6fbzag604o8hsdo0ngfe0ln18jlu3dmamu',
                flowInterfaceNamespace: 'm095el03xwjknoi3z9oqxbg7yphhg45beyhlf89qysvay2q44nk01py73rs4av17x17qh9j79jnhht8az58wlsb7lrckemdbftftb6bxkry2t03ftq4f7mpibiftc2xl5yutk0c3s14t7od0sa95x54nfi0nv4lc',
                status: 'SUCCESS',
                detail: 'Aut facere rem est sint sit. Et eveniet et quas et deleniti optio. Qui voluptate modi dolores. Magni consectetur sed rerum iusto vel qui sint veritatis. Fugit molestias rerum et voluptatem laborum numquam cumque et.',
                example: '95gxcw5rmlgl77k6zh7a4k9uyfhlvzt4xczww0nfrwcp6f980xj6d6y1aha3l1km8dydi8xgcw4viys47lc4ga4f6vvxzxdj6xc5v4ica0z2w6ic39ebw3338zr42n7i15oc9ra5gtykkxa4lgiz5ecgvlhxn62b',
                startTimeAt: '2020-08-05 06:35:48',
                direction: 'OUTBOUND',
                errorCategory: 'tdy86sqvomnsij22a9edrvzi2sd6u8g31m8vmoiwzlb9umjbdkl3bdqxxoatnsxd87p1i7z8loxkgcdhbkqmtcdr5962t5znoz7asjvrd162x4yopj0fjyihh8s5aq1ada7nrzqk2vayl0qnpc32ulgeikyfaipb',
                errorCode: '37r40lx0d4hnftjw2lugxv72u03lamcbw91wd8iz6mi43rqid0',
                errorLabel: 163345,
                node: 1316133440,
                protocol: '16t6i7bgi1ef1uw2ysat',
                qualityOfService: '0ebm20g97mghwbgjdunw',
                receiverParty: 'e9h62o77dbci7n7aon1m9l4wosughlx7lum7ngpswtnfocm9slttd89mcvg3hymvx70yr6gcasc1c9vqzlo3c80aos5pe6me7hz9d02cx66o5ymcqexww1vk1mrkgcpokjaoqq0i6ep4m61bebhcrwgdsv9aprag',
                receiverComponent: '89ie2ho7i8yrnw2dv48pqs5o2dx2y3ph04u5rgokhzs1kjwggqfi69o01hjiyp66yuvbzuc3660l6ka4ahm8cvc7lga4ppw7onifkjcksxz8kkkj7k9e6d3tuet5dft4gc5r5hd35kmcuxhcbqxklshfn44z3m6x',
                receiverInterface: 'bj5mtl0jnzhobyhkaqtxrcm9xjkrh0jbs7v6s7cjn9kr8ezkm4iks1wc20ms28fcvmzwm7anl1jzlzmjyqnsqkp5vjz0eov7v1dsq6vicx8voregv4mj92vttye4zcynp4dkng9nkx25o4pnbs5f0ajhfjocvcfx',
                receiverInterfaceNamespace: 't9hbk41q9s7l0rxzbstjexysk6vbwo90nb76bymhdhgrl83qznbu391u3tyasxmc8jn2s171ylvgy0m6mp8i4yy6rs08bsosh11l3nafjvertcnz8wd4fftu5xb6p3o5501gqzl17wajn4zssljwwsxlxby2xu0j',
                retries: 9333055820,
                size: 9679423531,
                timesFailed: 3827416617,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'vd4k8z55ctzme5vfhzf7yzi5zkc5a5epy7kf19qohdhoisskm52',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '4eaziid7z3qsc157bjnt',
                scenario: '6b7at0vcfhxh9th3iyi8id42b3brnenhv0ukc0hj6f709iv9a6syvo0ikmkx',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:30:26',
                executionMonitoringStartAt: '2020-08-04 09:27:42',
                executionMonitoringEndAt: '2020-08-05 02:26:11',
                flowHash: 'wni34ztadiudm852q1t1j4nkcjn0871uji2q18hk',
                flowParty: 'lnac8w2tg24hknnwu74ji2dagr27rqcc1xmo05pyqf8cd87hzdr670mvgl47ztaqww6n2b0qfcj8xoetbf7dlfzrw3byjwse7p3qjf97r7gma0ulc7s5jpuqxk32i0f4ybr07zn53c14c3j6rrbsnggx4n9ju96u',
                flowComponent: 'puw7lia29f4anqdozk32m2z3smwwoz7xttbuzuceyt06zjmruix0n4nfe6j3sz67hi7d1e4cw8o9y2quycj38sw5sraysxjq98shj8kaybg4pec1w90kx4e651iqf1y8jf1jb8nly1fmcwix42dsnqgdc44agd4v',
                flowInterfaceName: 'n7lk2plzd9h2432ocfc2bm66psledo03u6kav8uiec82yw6umrl3fqbdujsncpg3juasjiuqnykwidil8ofyl0yujl68ucgo4fvvfh7y2dacjlugo4zhb9jromnrelaf2m94xal9svjofgu4aug43ma1z94fqahd',
                flowInterfaceNamespace: 'pbiptfpptylfhombom6w7yjasfg4xj0pks4zpswdl19f42pnc57wcjmclvtk7zsxnzkee25ka0w5mh0dzbojvzao4jhrdja6zbaln04mxfuq72x5rxwqb2qexgr9tbulcwdafjwksvuemdtljuz36b1kpzod7b6x',
                status: 'ERROR',
                detail: 'Expedita omnis delectus numquam rem esse aspernatur odit omnis accusamus. Maxime quos non nulla ullam sit quae beatae et itaque. Occaecati impedit distinctio blanditiis. Impedit expedita sapiente fugit quia. Quo est quo impedit modi non odio. Velit qui officiis explicabo magnam blanditiis alias sit.',
                example: 'tw0jlk4hfwcuce5ghg62xesn9vy5w6ae5trvsfroccuirywpyg7pcpkbv8a320lxhljcyq755f3xt1pfnf7ameoju6cbsgo17otvzhzkh0oszf4sme0qbt0i8svjik7xpcejgaa5cxgk3akz1tkglm4qqtxfw88d',
                startTimeAt: '2020-08-04 20:19:40',
                direction: 'INBOUND',
                errorCategory: '1h27yzeghh31m28m421agbndxt7j9q4ncyodf3hy02fgvdjjcrqnderd828hoslayqteizfpsp9pd9lveeqju0ekv9fatv5kpfaqt2sgy6a7fdeonidvk1cgh5kng815t8aa8zs3i86alihejjk3myddk1pq4eex',
                errorCode: 'cxdpljdbrb9uqrik9plg9hbes84irwek4ylldd0f2s6ie4cvze',
                errorLabel: 611609,
                node: 9220934919,
                protocol: '1o6a3na6202ze33oyeor',
                qualityOfService: '9w2d15rkkefdj17junz3',
                receiverParty: 'zpdwrb1b1dcw9sjih3jr84pu0xwc7zb0cctevmx1mk9d0ige8zw0kvnpo2rcmujtxkdxv56o42nje6mtb8eq11lghy5s5flouchpajwcrclcw2bqh1wi6tkhw82bfkn7lkv8a60qsk45uuyvij41twumdeedacr9',
                receiverComponent: 'vgql32xdi3zfppkcdx1tpxqk5a1qiwp18c2led029zl64rb2r8fdn6x7gqca0bpuxt7y2u8jxwqjrkb8xegwahtjiwokincuoa1hm1ld1i1216ffb53438nxp1klxbs0rt8646fo386g02awkr9xetsg74bkw6fh',
                receiverInterface: 'p6wc3c414td2ze9943c20vqt7qxxqinla67aylasag874sibulhrxpra3990q6plcbr8jn66epurog5szzun5kp9yw6m7akhwe5p5vl7f318bgsw53hp61iuxsm5s06543vz34z5j0qe3vb99ryt0te2mpfc3jup',
                receiverInterfaceNamespace: 'ep31331ke98lk0xx1q4g6uzo6jj1m0atu6nhv917fzfcwtqn67khzjajoo2l9isbkgsd9csf7jt684pm91zwiaid1t5qr8sixvvhxap5nisqp7yv59qheinf55rfwb8bkdov4qbgesdnb54ox14zk38sgr5wllnc',
                retries: 3078959032,
                size: 1917433269,
                timesFailed: 7539878542,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'hwr3p1ie2ij477hiknuwmqcmzboapi190zpbbx3hmsm2pfhmfj',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '8aq3bdh5ubrgezx6qy322',
                scenario: 'csiw8ilozvutqdqcqe1as2pe1p3og5w93wsjw0ptar64yguba2ivsfsv4z96',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:30:22',
                executionMonitoringStartAt: '2020-08-05 04:06:28',
                executionMonitoringEndAt: '2020-08-04 23:40:51',
                flowHash: 'n65qu84hmaao4shwvdsteku8586aykcaw735n6zg',
                flowParty: 'y7sdd73811rf9bshrhgegyprpbbkljelthba6onnug8g6s6bb1z2acxla7ljmswd27cm9cf80fhbr41oe1s6kqennt3n98ze6mjsf5c7fxdycr43va6dln39xvm82sclvlt4dpj6q5z2br0g4giq64h3481k0jkq',
                flowComponent: '7jr5gt6m28811brw8zzgj9uumjhj9md6jq3evcffc0u6k5itauacu94yaxplei00stiub4zloli0r4c0euv8475z5mru0hhx3tcr7uvtvufyq1buty1h2w4oeid5iaapf0wm6h7h10hvh6ryvdq0ztd2nzbfprv8',
                flowInterfaceName: 'ckhr6ylakyhez4glnic5pi0vb3jd5kcwj7w5g4vicowpu84rf93o8loau9stkwg7y9ljhncaaedz98vgd2tfas8faqu0mugqnsmlcduutikef3no9hm00ceoxapoloib5ahh8musuuanhcfjl3okodyokihk706z',
                flowInterfaceNamespace: 'jdr25ou1ac195626linhypihc3dpbluib7fnxcpod7gw6gbx9ebugwsb1exf14dyt9hd1lendlcv2vkh6mjoiaz4o3w9ddfwo6491puf69zxdjesx5zpyf8qeq21o9x6x6ae5nms2tba8ef6g05kxhu7iube0alt',
                status: 'SUCCESS',
                detail: 'Inventore commodi labore explicabo eos deleniti et. Sapiente neque possimus officiis laudantium non facilis. Tempore dolores aut quos. Soluta dolorum asperiores facere provident impedit. Consectetur similique voluptatem et. Est libero dolor.',
                example: 'otk4mixhrswbnqlzbjbjdm20jk4vq6b02dbvlf2sq7p464cu3qog6llhrqogn3eflu914vp17wpe8rykqm5lsjcshhar0l9lbgkmqtzvz6libs2eli4s00jcdajisxm5iez2xu0hewjaoeu8c6mcizh07gn3ajoc',
                startTimeAt: '2020-08-04 15:28:12',
                direction: 'INBOUND',
                errorCategory: '7sz0k2xhyxrf2r0c6tb6fk2ehscyzfhcgrcnikl1fo9a4mraqmruu6m0fuywvpzw03ja7sy2mrfsf8ve4lrezwc3rzzyid3kd48xb0iqxs8s6owetiojjtfyl9rp1lj9cpt6m98wc70i2g1l8g4j72u1vq0p6uo7',
                errorCode: 'ib51hti2m5yng3jozp2m3wxegwvwzj3kyvi9v1ou0vi19bbsec',
                errorLabel: 280028,
                node: 7892608974,
                protocol: 'atmgcarpr11h9ogs3hmg',
                qualityOfService: 'otyyp32bcudyw0tt8auc',
                receiverParty: '7w9fk4fgjudbg1plplqu4pz1rxmybo7f6fk0x7buf40i7adxtkb69msyiruv7beg1rohoq5r8sly36ndp8ey3kq5ypg1jzuns6ftzilavg3qo4oljap1hpr4o4cg3nnilp3i5flnlqln74065obfqeqff3tbv1q6',
                receiverComponent: 'ulq50kiwhsrcyhqrnrmvx3767tygikawphxj8vzgi2rxqraautb4tn3pwwf5clvf8dbmckwj0zgpish9gnm0ahg1oe099rpt0c7v9p1a466iwyh3c4rd4xknvp7sq46y59a6dcksuqtx96k3xcmz93sl3rooti1c',
                receiverInterface: 'w187tdo2oklqaqkijbr49crvsbcjqjlfkf7bkkddmaead49b8n3f7fcv06hi44c27repde1v7gxj7kzj5wq8x5pwul5q0309ai8lpuvy5ln2qg5hamgolo6g5uz222mnq68nkmcvht7t4isyvqk7t5o3psmk3bss',
                receiverInterfaceNamespace: 'dxsn4zxpmq5nljw36mkz5hnldcazfksy2ebk5mu21026uyjjjh6uk5jbgvf3aplq25jemroas9kny8x8d2tkcgt9uh3i5fdfw94pnp0wrka19d7q87vjw1q4z00sa8y8w6m0f3xupg5x1nocn2hhsnrb9o94xq3v',
                retries: 7808401574,
                size: 6762935977,
                timesFailed: 4593527097,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '9yxx0hlw3uj05m7m8tngp0mx9ohxyil7w5rxve8mk0mr2tipj6',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'nzoxjjocsls01cods42u',
                scenario: 'n9rpel1kbkpzrk6gqyjhtj8gepwxvc2mx69f34c1cmx9dp3fdbrv89afo2n3o',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:21:00',
                executionMonitoringStartAt: '2020-08-05 01:41:04',
                executionMonitoringEndAt: '2020-08-05 09:02:07',
                flowHash: 'c2t6i7jj4i06td5okzx455gbvjdjdj8uthvyxrq9',
                flowParty: 'af8o3tb0jq5kzxt7wb1l5cinbj322up555629c77vh1324x65ss47r3o6yhxpajefaikp9q9xv41cjes7ytlv7kbj1zltumabh5bp0kkocv5kw6l5shxw0yj29cx2i0iumw8jk61lvq26x58neqnbii2jyo8df3z',
                flowComponent: '8a5m907xue7797g6grg74wfru75irjp177o2ou569i28xznnqms8e5fy2j747hafw8tlmtax4vuul11cxsjxl9xmj4a2utvyoif85xnao999nxlh9bsb56itk7maamjvn31jgbq98drvxj9m6e1nleovb0era3xd',
                flowInterfaceName: 'f5kcl3sg6tirwj9zhtbmmzdl49p9nynr7bbxuzm17k9ptkq5lgb5kze58j12zdus0dlgxlz9b54exjgbuzt1ji7tx93qi6hpsdckn66gcj4w2qk179l88iq0ephp26e0ju6agxjg7ue7tnvy386ssolwuxe02ej0',
                flowInterfaceNamespace: 'td67r488qg1klknxhxhwafl4vnwuo3d0sj6zn3dgj8dpfj9iqesu2goqfd6ec2l034ab6oq82da10dize9vgnetmb4m6cm94akigse1sk7l7t7qvvzxsnuu0r9hzxfqrukq13bux80zv72bjlcdyf3s6w9qckqwb',
                status: 'DELIVERING',
                detail: 'Repudiandae et eum cum tenetur pariatur praesentium optio quis. Laboriosam aut et modi temporibus molestias possimus veniam adipisci quam. Quam dolor voluptas magni similique iste nam perspiciatis velit debitis. Rerum sed voluptatem. Aspernatur fuga at hic est enim officia. Et sit similique ut autem dicta.',
                example: 'orvk89bh4c7aa83wpr8wh470chqlf1x6rfltit7fu5tbfxtvas39naa294go3avta2vw810iq2z2rnf55oavo44ygsvmthr134x3d5ldlsgmrfvw2cu8xfe9q7odwiem32wdgph6d5u37fcx9ef3n9vmgi5ou02k',
                startTimeAt: '2020-08-04 19:16:11',
                direction: 'OUTBOUND',
                errorCategory: 'ft7l8mx03m1oqmiw3omxl0a0pk3muyqiyx5b86za51y4ub8a3qotrzqp9uafb05pkxvsh2bzg51oguykw52wx3pw0lhr5udsx590jhhsu6w7e6j6jukjpfl6acyarblbglfyzcr1motyup76yavwnildnddeftui',
                errorCode: '2imdl2koj8lhh2vcf40bivsqci0h89cm5x1x2o4s3qshyli19f',
                errorLabel: 596822,
                node: 5335027381,
                protocol: 'rzdoabg4bmn4bb2bp44l',
                qualityOfService: 'ugfuo0djyzhpt1tj2xda',
                receiverParty: 'g93xt37ki5copmqgcxtdg4wbxpzcn7jgdokd2rc0lhprq0m8k2bxaqntjf022se3yt4dktdc9iiw7vm1ff3s406zsejaxst12531178lewihdjkr0de0j8eekely0ykhht3gcqyahbznrw8dz4iggfs87krq1pk1',
                receiverComponent: '59npwyeunv23zi2dk4v97frmlhi67uh7973owhnkvfrlf6zbyvsl9utry2b8848etc87axzgi7kgxluei7afranva56o5em375rctkln3ioz2ryvxvgr5yx1xgc0kbiiq2ljv48t58umusuu94xriv19ruv6fgg8',
                receiverInterface: 'mtc02ob8snp8u5y8ek97fojx8mn6mspvijxrncvyb1qmswnz54m3lpy5cacxbkap7srksywykly5ols05dq3qrwrn8b660hrb5xu0lmoz7khivgvgq7ztdfola4hp18o0ahjbtahbk071fik9vxyc70n0ypqryb6',
                receiverInterfaceNamespace: 'gs873819o3jsdel1mgjgjw6fbh1w1qoahxyi4d4bs90tyz95gbf31lkulybap60hedb4skv1106p2ksylbdk5ueddnbp81s434v4lcqmvtbfbsqxjjys8u8v5t7xl4u4dl8kv7kvoai07l4w8ys8v3tsfkqjamxq',
                retries: 2007733732,
                size: 4834546135,
                timesFailed: 6272087696,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'uxing5h2lpn5tv6l0hbscw16poro76n1va73qxmn53bnwe6b16',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'fi6cyh5jt4w5nffgxqaj',
                scenario: 'uk5vm4d6vvk3ofqqzavhnt48d28dibstc3cihgqig0quw6wzn5l5m654tnnf',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:11:56',
                executionMonitoringStartAt: '2020-08-05 08:29:01',
                executionMonitoringEndAt: '2020-08-05 02:47:32',
                flowHash: 'k34od1eopd4wid9lqy42n1n1b63p40om4m99crz1',
                flowParty: 'mki55zrzax3ujdrlshal1y5lcc7mu334h542mau7iazrv5yc6bcuxcx70d5yn4g4gitli8n2ey5dgrufmolamp7mruodq46rgmbxmfb33ov34drq52jwpkoc4022l1xghzfg53jihplmywh1fvl74m2olxlql3ffw',
                flowComponent: '8kydkz7l7vz86u3d4jfh9bevuyxvzeevemyy60l9kb86eh6dvk6y0puhm4xk07jwvy2s576fx4wb9kq1ylvzhlkjoim2xavgem6m2spgwejxyroug7ycs6qerrfj2f26xaguox4opz8kn9n0b7wjn3dlo6frqd6r',
                flowInterfaceName: 'd8sm954hlaow6r4yqnzny8mac79xvh05so8aonv58p081taliw8qtseuuhhtlildcvfgs3ozirmfb7uf4fonntqb83wadlluskqmwuvv20m4sqg80hw4pjrvziffbduh01v1mwqjksc0yobs9xpe912rbbu4x0pq',
                flowInterfaceNamespace: '18ybnyzcs6lhclvjfsyf9zd6sdbp1y4pl3dd16y6fwr6ttj3ip63gi3o3km7z7axibywnb8eb1zfd0hzg988ndmccsesnntjo399ska8x4uk016chh6x5tz48jyxfujich0qdmi9rznr91kljlrrsgn0xa8jdjim',
                status: 'HOLDING',
                detail: 'Ipsam facilis laboriosam commodi eum ut. Possimus officia sint ut molestiae exercitationem fuga. Labore officia vitae libero aspernatur et qui non ut. Et adipisci quis in architecto. Sint dolor soluta tempore et. Aspernatur eius qui.',
                example: 'x1ghj82u19sv6bsp8qozepn9j8bnp3ovurc2ssd3ph5dex4jnpof2lmammifpg48fwjvyppkeg2f498y1kvyoh3s5mpj7t1lzsws2o20d588l7f4d9c17tb6hv84e72djkomrrmq1f01u3t66h5ybooj5p3177mw',
                startTimeAt: '2020-08-05 07:05:37',
                direction: 'OUTBOUND',
                errorCategory: '0napcqfrp5watpv34yh1byb3yzcdlqh8rzfuqnr8axp88ggrjh38dvk2bixd0efotrvguvijcymy9xcbnz9ym4ofuhec2n33m4yi1gh7y8up6s2jujsasg25k5g01ac8t5ekhcw4djo7sy4htrv36diid53jtmwb',
                errorCode: '1soniwmmummpma40p2ign4bgpl7tyhy4ul0o2hpgd1sa2ii956',
                errorLabel: 934894,
                node: 2457016344,
                protocol: 'tu9r4np50uead7b28le3',
                qualityOfService: 'f440lzf123g8fwinnf5i',
                receiverParty: 'lf2zpsxvnldglcl4fhsztxmk21n9htaexyuoyo9n1kxqfesuy3tujqhtdvkkxkcoc0scla8g1o3prtkq9xsmhi50h8wpt8gh88s4rpc9v7sxv3sly2afioz2utoolticfn6947mirr6lwcube46wpb5xquwdx9ms',
                receiverComponent: '7ah68ys7kh6fd9vpgh3w7d6fnc0apreww8wv4673vlq2iyzel51n51l3yq8ci7cjgaoal0c2exb3i2bg7f38huy9h7m7qh5c6p4s4lamlkgxuv9fbtil9thxbsf98vkyif2wozgbqpwb3mmr5sz380h4a3yk45cx',
                receiverInterface: 'abo5ma5lcnseeo46b38kuqsznnp5b698l3o0gal3kle36p3ph2mkgt7m3k52hxgzqa07um2ibm9qm9tei9bpfjwqn51c2pljcagelvvf78jdyn7scpt6w9g41r87pasxwd55vx08mlyuieap3rao4x9jjn6o4qop',
                receiverInterfaceNamespace: 'r6uicgnxudvwr08639j38urzl2h32h3rtv1m91t5p7fart71ip4783x4586tifu9pu1ars18by94xjya54w59winqjuy8498714w7jouqof29ogpst0s3qn4mlb79x9fvpu89ak1k8tp1fx1x3jqce6qwco8okym',
                retries: 3513450339,
                size: 4013384830,
                timesFailed: 2532661678,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'mc7elx0mrjvprf5puz1k3c27mmgov84yb4qa32mpzrvbbjk40x',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'qjjdfn37apjlt71d7r4q',
                scenario: 'y3bfp4fwet05saf61jfy3igvjrdg9qok9qnuv99v1xh6hlqo0kbgiqk51amc',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 08:30:58',
                executionMonitoringStartAt: '2020-08-04 15:27:26',
                executionMonitoringEndAt: '2020-08-05 02:28:47',
                flowHash: 'h5atdl2ho5wasthdoc5fb9kazgf81xryl342t3k1',
                flowParty: 'p9x1wlb5qvnu54jtv9ak8ejy80hwbx5y7tepuuvfv6mjo5vxhq5xxx1mpeze65pw3tiihb5six61arso74z5pvyo48rtu3iz2qfbydz4bvnu8vtsmigmvca2db74x7nsos1h6i2t37vuf2sktnmreepga71t7xwc',
                flowComponent: '9yv964b5twp7ufwfrfexir3s71tx2416jh1w4ybl8q5qvfck7dpk5an5l9ntw85cojfcfiabyxli8bfa54p4j7n5xqv5xoywfpds4nj84jfveywh3rfd4j4j6v1fwdkcxv3sbq7y9z8tbzg5959cop9tytuah9mxm',
                flowInterfaceName: 'ptieoxrzywj14b4wtldzpjr1mf0w78lze6bww1ecljmlnjnlx8vapp70j21h3df2d03hcyxkoygm9ryia7zybfun3tbows8mvqg448zdhoe32gs3wi7q2758uim2uu3byan9y78uctwobbhwev07zlqhqp0dnrjn',
                flowInterfaceNamespace: 'gb3yh6g5kywh1g19xn4ir8skxd8aiqfjquoof428qu6wddhoo94xriqv72gh2ezzyuzx2awj03wd5dpy57rueq7hci957lce14og70zyjjvqlpqdw2hb6qganadhmpe74dvgd5dp8w27wlgr9ztz1utfhsbmz7d8',
                status: 'SUCCESS',
                detail: 'Ut voluptatem et officiis at atque quo voluptates officiis ipsam. Doloribus cupiditate placeat rerum quas. Minima impedit aut delectus suscipit. Et perferendis illum voluptatum voluptates et officiis.',
                example: '64ef8ry2zkfa59oi6r72llm67a5959hnjoalr26mcvb3iurgpb0ppn6tivly3n9v3a1araup6js5u4mxg7pj557ccvum2up87jbjp3qklq2604esuhe09f9z0tqwrxongth52xk3gqa5yaa8h96yve9b56ehvemu',
                startTimeAt: '2020-08-04 10:12:15',
                direction: 'OUTBOUND',
                errorCategory: '279xmvnjsr65qf7c3z72zl9uupae8bzhlsj1vvz3p74un27wq7vnmiog000sfrrxhw9cs01y0w5ldjsufdyhsfplg3wb753j14tuj57ynzlqe2i4sguzzrgy9nzaekgzqc5vvt0u3x0ftzqebomvlr0yhi3rj190',
                errorCode: 'rmk9am0q8rcsjywy7g0tt3qom4qgo3bytv9pc47nla8tar1iv4',
                errorLabel: 202879,
                node: 7913162233,
                protocol: '8dtgl3na8jt7871zmozj',
                qualityOfService: '3e7stnawgzk8g82a43kx',
                receiverParty: 'n71lsl5tn2kcvxlyfnbdauem2cotl96vtyefm2q4a9wikofosw7khoueu32x1bnmulglfws86u6bd0laidr92cdslga0go80bzljzcvx8t1dyl51noofizwe89tb68blniea2gvbpwq6hxoe23wntadib237hrfx',
                receiverComponent: 'g7k4ndb3ji3o3uphe4orf705fel923r8qp8f0lah3nxhyvlb8h1c3iw6eesu5tvv33076ex62dezby7azswqjodvcw5qo2nzy103ywmlnjdw23naskquiabwwlzxb4yq4tb6lr30pzcemjpcw28ykk0o2casl4ka',
                receiverInterface: '7mwgciiuglir0diydg02af5xtwzuq6b605kpavmh5b8meru9nnc4vtjplh2ozomtj1lorxyotm6x8swerik9qww1uak4ssrioqqk7gjo3dvkyot5xvncm9ahkr7fik0ju0u7ap8nu3q8aong0io4m0s0kjwwo0k5',
                receiverInterfaceNamespace: 'wr0fvxg9pqbo0qsbjld98jdail08rxwxhtsblctke48rqjm8mbai4amobjevr2dg297atb2vf6n616qr0ogvnkspgfx9rs6584l6v0eh6pygc4zelc6o9h8l3qt4n9ac1t0aajyfj5yezmv84nzecn9m9miheh5o',
                retries: 9325728281,
                size: 6251114803,
                timesFailed: 3300631762,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'abke36gbxsxru64bh4gpdw00c583vw0ju2jzd37qpdm8gqtomv',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'atv0jl7g5fs8gfbz9814',
                scenario: 'khdtyjhez1ps0emotowsiet3twq2j6lgttfhl0h3bey60frjqlwisco8nmsl',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:01:10',
                executionMonitoringStartAt: '2020-08-05 03:46:26',
                executionMonitoringEndAt: '2020-08-05 06:54:27',
                flowHash: 'qktfuj1jehow8ls795o8ep993e2mmjiu85gi24l5',
                flowParty: 'iesma9gvxrkvc99tu7mhgmpqrr4cj0x1rx8xuyu072ke2qju2bi0fryvb5wz9khod3yc7q2um8nk1okbtpxrsraka2frg2kj82uy2pjjvdwlb15n2nvsi7arq8zhow14b30jy3l69ip9w185dqv9cvnb8jhayy0i',
                flowComponent: '1f2aega7cmosz8ze22b45o6kqk0rlmrxj3kgnrtgrlt0p57upo31uga9g6y9kgvk9la2krgpx2vgaa1d5feqnquw40kqr4biic8dqjol9pezrhvc7tvs7jkfvmvr2f67eeoqu8vq4oqhrblzfci405og8cyncu92',
                flowInterfaceName: 'xvqshhldbq3p47yltcywi63wooxh7mcgg2rukwqmkhfvnvayrw4vxbweq5alcyyuy02zpftipz3ei1ay1fii6rim1n7n7zh40veq7iwsyxzz6hzyq4mmcz8i9a6h1bltk502dcyuueb0xj1msdlbzfr36wzfd4ffb',
                flowInterfaceNamespace: 'z24sca4os7q6754x0p88x9myncyyufz1taa4443z65ajrhosugqzessu4ku9n82lxop04hpb5gptjyoirki4l0bouptox9bgpdwbdth33nq8jx6w3etg1ylicwpajotjg9v3lyezqvsuhks1dgv1f784uuu1v9gd',
                status: 'CANCELLED',
                detail: 'Beatae in ea. Aliquid et beatae accusantium cum quia libero neque perferendis. Fugit sit fuga in est qui corrupti natus perferendis ut. Corrupti eius harum omnis dicta ullam sunt maiores eveniet ut.',
                example: 'ryclyoqpzo2762t4aza7xumnwkenegy9h29urx0cqdzmj5c1db7vt0ymvo72l9b5iv9iqeb9wntcatxnbayiyo9fevvffvzswhp032pqalplxlkha6mh5d96q198qla8h69dt6xypb2yj89an96bqb8gx6ms6xbb',
                startTimeAt: '2020-08-04 16:32:33',
                direction: 'INBOUND',
                errorCategory: 'e8e4rr6q6665b6pccfdn7v6ma39kboteryk6kh8ygi6gyt8wyqesv8bsoubouixkxxgjvr7prml2j7nqs80rtgwqv1g018682pevghu9n7x4trriql5x7h1mvpfu79qlhxdd7dm4tvus43ixe1jdpl2ycka66ss1',
                errorCode: 'oxjtwb1u3gjiz4lvo0q2tnuql12x6vjjwnqla7veclfepzjkca',
                errorLabel: 575213,
                node: 3853260668,
                protocol: 'w7q4b3lu9ikqzi77fz69',
                qualityOfService: 'js1vem147tfjsdw3s82k',
                receiverParty: 'e7mld5q45t7uqoe39fximqdg7pvyp3widfl6zf34x87yw6kl1javunrsy3d1fk2f0y8hyzz8wtplp0ow0up17tabj0yno25kulz70wrbwwr9f63iqtt88mel27c9v5zl9x054rdn0rcf19kr530qzwwo98mghz5a',
                receiverComponent: 'e16h5mryytml75jhuihqf0opswpi1u2m9mnrbwazxg917chjpkdc78jdgaxfmy69iv6h1pgrk2e9jf3oxdo2sho970hcx78qa4snkq64ochgag3cjg5hmpvoz18uh7741ctdp59u3v0qfiq9cokqhf8g9t292t1a',
                receiverInterface: 'lt28lg3lyb60x1p1mb2sc4iooi2lzl83z1x6jfbjllq158q0vaksdnlr5unuvcnwzkbgy6apk4anqr9km7o1apfn4li2i7yaq33mv1k3m9mfsgxpsh4lgajuuzajoxloof4524aqnfrvt3q0xl62eggjzx2qxcf0',
                receiverInterfaceNamespace: 'i5ha8pczyvwkwkmlxomkcky35llins00qggpj3ig78eigxsei9dw2z9gzj9hs77utre9417jjsv1x2u8t535iybazze3bqc0b14kuz5g7m7z815tsv50qj7m9qna83wu1azr0r0on6k9i1o8pjk1pxhjirx74kya',
                retries: 2637056200,
                size: 4934568950,
                timesFailed: 4570473110,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '0f9995zcuq71i5357gzsxzqly5sfir0suj08fbz0mh06ayjv1g',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'bd5cqf1abp2agai0a4yr',
                scenario: 'a0c8zfmqffghhkrm1ba0ui8vvozyh4v36fap0vyt3dz3s8df8lnf5abrnekc',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 01:32:31',
                executionMonitoringStartAt: '2020-08-04 22:47:05',
                executionMonitoringEndAt: '2020-08-04 21:21:43',
                flowHash: 'k1meey0x9s6vxy0sfc7ht9z6ioiug4x1k80gczp2',
                flowParty: '8xjjw970r07i449kn9gytkv0aj6097tkl4ll7b897hgtvx2rulxz1ss00s7xmyct5ve5d5qq3qhwdfgvv98m2e6qh8zjxn96wkgdj0haiswskk8jxealu9uzdgsmqfcou9f1wqopgsls0w1adctyfozb3nc7i2ar',
                flowComponent: 'jkrynvsdswxdlf16v7ldlb6cv1974utch9166rdjl7sea8t6u3fnkd5s4gdcqe48c06okol18e8ajcnmlakrmxm6m52vs6ro792ujit4ycx37li49lhaqzie5iwhh6ythrpsbxqrhprlhhgvzpfv9m4r7p27fa4f',
                flowInterfaceName: 'vzkfmxbpjr258pv7srfydu9mpt80qqvuajirfh8bpgqlg6iym2uzot91abrh5ok7q2k71t4z75zhapczkcrbcfxjsnhobwa0eookcy0g1tznbywhsc9rcrhz7bd5junjy1m6odr9pwp3ahxgkh7znfxhn6f9zbdz',
                flowInterfaceNamespace: 'is5v4dd97lh5n9higaejk7wyt70x4q059ig2yb091eqxwazsmtl6x7bb68ycn8semfvzd5s3vra0vhyamm7uk39l0ypjorveua0fnk44bo5udm3vg0fdre896gy7x3mzbmm8huch7cu37ll1ceqxp68332nvk5o24',
                status: 'SUCCESS',
                detail: 'In eaque quas esse vero sapiente. Repudiandae rem provident repellat. Commodi tempore sed laborum sed officiis labore impedit sit qui.',
                example: '8499c4n1odo2xzkozxxagx4ljh0l1zaezl7mu844mpkium8l6m0lg6aigdymlm88bybab0hnei9dynj6qgajduk835tcqi4z2jig8fpketejbjc5m7l09o1ssnntj4ja2xw3uq6ziwff0fjg4rjxhomqhepirbp5',
                startTimeAt: '2020-08-04 14:19:23',
                direction: 'OUTBOUND',
                errorCategory: '5sj1eiwgsjbiyk07ah0r6gs0vachwhfijrh48xrtaglwdyv01jbozlwh70ql3220y4n3r5cylyzawq9il1v3rv4lmpc263vi6jxh9b6fo4xa5j33j7a5ud0ee6a0t6k5mqmatzs82u2s1s280daskkvh7rvvikf7',
                errorCode: 'dy7delelullcluvllelzj47gk94qvo5y6tmezpmylqqxyn9yhf',
                errorLabel: 339247,
                node: 3122625804,
                protocol: 'tq9bztl8ty7cury5fubm',
                qualityOfService: '6nfsqii9mf9mknl0ighf',
                receiverParty: 'x0ollwzy3u0xl47b6xkibd07vvtgt11zb0ghx5h97rabt7n39jl5qlf38wb2hv86s7nmy9bjjp1xw0oxtf9wfntjpbzr1lkjeacxdj9dbmhaf2nfqv1h7qj1muilyj3e9u3a316bcwfn333ojcc3nsoiyitnun1m',
                receiverComponent: 'tbtj3dnox08lis97phb5h8liutpodjwwr3d1f7cfc7tr9nw73aqtv3ksp03z66im4th7rtv1bcwpmkj0ujpez3ijwaqhw1becnrf31ym7x9hhemf8d99h3c9py0lim887qz3qjfmtiqqp4842o85l9gndl76mmll',
                receiverInterface: 'hsmsqo502znwwtxnrqmo1cgtklaiazghv8fmyaf4cw7k3del41q4yjia0so9wl5092imrdlhdjly8kx4trjer1qong5bsp22z8v3gv3av1uyvl4l1fpq92lyolbokyp3oo1mvtir9veb9uaptmy36y4ok7poyit9',
                receiverInterfaceNamespace: 'ar3y67nswhazeyxg4lflrbwq0cvb377wr815gk4sdx8w9k0jovf4wm3lnxc34ikvmzqcu102nmsdosawzoqgiiqkh2y418v2to8mp19wn62nde5s8fgjjbbtkkkwggx26666trei1p5vyvjbfn6vh2jfm4jitwz3',
                retries: 6470572234,
                size: 4003635231,
                timesFailed: 1872062150,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '1cvopfw7y9jcsj2g21b0hurtrp3hek6jybwozus4frrk5nqerj',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '1yw0a8khcvyq037xjphd',
                scenario: 'vb8kagg2oodgrgs4zaotqd8ofmpf968i3k8q91hzu0ez7fk2yfk3h0y8ox3o',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 15:21:29',
                executionMonitoringStartAt: '2020-08-04 16:03:16',
                executionMonitoringEndAt: '2020-08-05 03:45:30',
                flowHash: 'j5c6bld9kmdzmlyqg8xgpgiawx5140ucady70ffb',
                flowParty: '9z4fh87o3zh7vzpziv6kv4ir5w0c0sr1um69e871hief6v3vpr6ofrjbgxurugziar4v3v4l6knxsxhx3jcpbx885qs9m9z9zijpeba2d5646dv9be23mjf4y7jgxas6857wq7u5v23hufzqrrfa4jq37mnebfbl',
                flowComponent: '5cf0l96cae9l5993evnswz5o55hjrakjh1hu3w1v160hjgq3lmz0t48b0sjdjzk0tqf829otz9is4ur1cixz0p9apqsortzvke1q4n21g9ov9k92psakwkvnf0lx5cznd3sl8i9n19uke28tpzwqgk3vm2zyt0ts',
                flowInterfaceName: '22pdocv48rt6xdntq0x4z128nz6envfa0ixlzneqkz5dxw8qhd09wpkjm50vksg9x8bma0wvr1wak08c4q2sqg0q1nr6iultm12h49xp7zzx6lm7nf7je764bi7t35zakj7h1wosgvcwqt6qf0fo5tet26ycuqik',
                flowInterfaceNamespace: '44ydqf9sqfh3c2g0b81jaj7468qwqis9r8jywa6hl7hqcdmfe1236pbppenfwmmogfs6tenx8gudf5ww1213i7ugq7juqgsy0j7e6rsniwcfut3qp3amgx3x7badzplsc4l7uswwv0sz4h2vywkmste4mxianu6n',
                status: 'CANCELLED',
                detail: 'Totam cupiditate quis est non esse dolor inventore dolorem. Ipsum necessitatibus libero in officia ducimus nulla soluta est illum. Deserunt expedita esse voluptate est commodi earum.',
                example: 'bwuazdnl1ty7gfmzttyz8z6ylly0p2ktwwgxbhpjkce9yzlqnr9yfm6roihcwf11rjlir9shhvx691oetp51h1hex4anhoumoal0t696s852w8mz03jydez5oa07zeoq5nrbrfyplgsljb256w7dsuutlqgv11ajv',
                startTimeAt: '2020-08-04 23:47:25',
                direction: 'INBOUND',
                errorCategory: '2rwxh24asmbtg1szl2cgyzi5igw7jap4zty1sm66lcx6kaqgtf6v4x9d2pfqz34aivkscam9a75iyr3smrga13jn04ait2qhz0pcuelc8zstu1cj7ze8wkoq7lex3o8go3vwwogr4agoldt7vo39ind7ecmt44iq',
                errorCode: '3lx9na5tok9pql0o46xw4bkls50snsgix3burqwjz4o9xlgte0',
                errorLabel: 783607,
                node: 5646064177,
                protocol: 'hswi68x6qtzid1ljtxqv',
                qualityOfService: 'zid6xd50ka9taf5b7bni',
                receiverParty: 'ahwthisnqs6s0s9w38ioezoqfmm0xa4slmkq53stmjbv811fdi8x45z3lki9tn4zk5l4bqtwwmfs0gnag5fjpzxeblrunk0tqpirba3hawtttuzq9phu7xt2kirv0vkt5m1yx4qpuy0vmf5d2z1p4zg97wf25eup',
                receiverComponent: '6bu1uom8vbkzzioy9prqp6si6jfzowdi26p7py1zt4cyzira5wfd2oh0cwq7ac7m6gmeccaewu172ywsc096jr3u4lgvp7vvjgab1cea69isctosi8582e699jhl8bvevzugrze0nmv2s18p9ak40bteuuq5wk3s',
                receiverInterface: '7ijxgq94qxy6mu8cdhxlbt4yei20dwj2wlw3a0jsfuh68q9nxjlidzn3rfqpw1b5c35zkqx61961z85nlcl9fpq3o5ebzlcblhnhki6v628c0ohsdqegqnf4r9pk0g7pyq8x101g0b119o7arf8eatbzv05rcl97',
                receiverInterfaceNamespace: 'n9c0gvfcax4jwapklwipj1jb9qwizifcekhokpa2n6ancbkhnq5g632xdhl821n9mcckswzfuivf9dovwbm7orh1swsql47o1p37wjky2k7imf5ruxlw0paw6ux6frcwt6fzltqh1ergqk5w95aix08lmf036spp',
                retries: 4142634999,
                size: 3565316827,
                timesFailed: 7456668954,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'qto0wune5kmuwxcpidptckmuoswra5or5sumqxyq868w8jo8ql',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'qgadb48xvkru6bkzzmor',
                scenario: 'nhno779yxv73i5p5ury95wv0a46wwy4701i0rqe47fejd3om0uktod4rhvxv',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:54:14',
                executionMonitoringStartAt: '2020-08-04 11:32:03',
                executionMonitoringEndAt: '2020-08-04 11:36:16',
                flowHash: '8wqzblos52wqv3n550ld7ei6p5ga25yxvhglkywa',
                flowParty: 'w93d6s4kkpoeibtqv7o6hfttlp7ey5st9xsdz86gwrrmz0x1391lo7ff3exu2qrbn4lx4pk6x7k9s9tefccaybe1wg4ej8g85q6i1onr0ju67tlkjx6axrvybsn4dxvu37n60526jyk2f2vdknep3loecn9uczsp',
                flowComponent: 'u4zxjwriz5nzqxnexfhnqrk51l7b6o749k4z6t7ddsw4gy8t6ktyegb3sxh3pt4dz0iijx8991b9dmcthxxepoqfx9jxcc77urtwb25re7u8zojwqh6q6j5jkz5wkb3f6pwt4ek7tofuhuhlzj754rmbeh7zvuyt',
                flowInterfaceName: 'kh6ohz905iuct6v8uxt1m53zthbvxd5oi74u9keec8cf9kaxilfpgtso6yl7k6qtmaky3i8jjfb2krj4n9db616l4cfsrc8ym2ha3xsp3232dnespmb2gm3pg8dab06q3hk8wjh8c1ha37snsuosh2n3scndv2gi',
                flowInterfaceNamespace: '6ejhnp0vge25znu0gy2yibw9kkopolobiigl2zbs252amutkwgs9nkpi42x2kncpxiklxemfdawi8iogzw9gmjp2nhsihkzkyomxzu95k3kt3g942z2n6k1iybicpvs2ytgm6e9vz7ezxtbmf47rfklxoiki8qm6',
                status: 'HOLDING',
                detail: 'Ut consequatur unde provident. Est facere eos esse quia. Iste iste pariatur aut aut quo sapiente ut quia est.',
                example: 'tehtdc0w50rjy1fdwknmjpsm9k6iebroem4zl1wepovosjbilgxskgdbe5o8l3jikawux2as8d7ewbtygor1auyg956vookreuyka88uhusmzh25p8w8h6zn4ujgeyid1lqqfak6b8j562diflsyx5nxkrzndvv2',
                startTimeAt: '2020-08-05 08:11:50',
                direction: 'OUTBOUND',
                errorCategory: '1ea4mjpu9yyommpnrqnfjbtli6ax4qrj3xm70lhsfx3fdd0gt7erwrklh3682z31t6qu6l4rl939dl4czp25bdqldooo7w6iyy6139qs3i73d1r986x4uxni4tdz1doskuvk8cgin6sd5f6tw9retm75d8m6p95dq',
                errorCode: '105prhmsdtsqt1oyj9my3u2gaqsx6ilrv3fwzhdfxgdp85vk4p',
                errorLabel: 788201,
                node: 1868142293,
                protocol: 'ugikwi8m5aw2m9f2gtwz',
                qualityOfService: 'c9m3rqum5nhh3mfxnig9',
                receiverParty: 'oguf3woand193i51y0ptvvt7gkg7692x6529y9wpvpf9wm3uaafayata0ghyn5z1879foqkd5zlfb9f5vu9mn5sfl0he0z3lpeq06dwdninqt4mhwe2al7bxu433wf7yyvsimjtygwajnwlhsknog5vrr6f6d23p',
                receiverComponent: 'vsidqyshqv6ewzpbpe4g8plke8roncuw3ghrv48plce4gn2ew7z0aob02mut2txn1neasahbai2grnspk3hv3r76ht66x2qdcpu50q1cezzj9keu3vjjw0g0cu0ccyzmn3yjjpvnp011arenslhojkdvssznq21k',
                receiverInterface: '67z3ll3r31wz4jkb2uy93xnwu1lo2h1aix85x807p2rtqq6ha4cn4yhfh4esxkpxbvce99599nx0jd5nkdz1fp3zjdmbmr35cd8emlhat4atynrf00g3npg9d6ivo32opop074w5ecjiqvtlnza44vt1o5scjgpm',
                receiverInterfaceNamespace: 'a78nr9vxxazwle6gyjxkkxu4dxgaj6m09lzk8opgys4qxtwwhndkrzmqfkh5eptlzjexsg8i4e5b0a9qw0721mw9chxu0yqpic84l7l4zlv3q3w58c4fbnmem57b5vvnxxwme8e0h48bohrnwfsrwsqev0sr1xw9',
                retries: 9305227630,
                size: 9864118254,
                timesFailed: 2718435664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '5m6bwtgeubhrpvdu41biha4iubvglb97mrlfwtmm5xpw7rxbe5',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '3evtig1uwzsw402cxh3n',
                scenario: 'dzgalgpwfwfvfzn9eanh9x8yg8qx592tfsm2162apuj2i9nqkituzwuwunoi',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:08:52',
                executionMonitoringStartAt: '2020-08-04 22:56:20',
                executionMonitoringEndAt: '2020-08-04 13:37:42',
                flowHash: '7vb9epe071sftw5psxke7qeepefldk9jhdhr7irb',
                flowParty: 'dhlqgniuabzmdegtmpqq8fh0jnjxgwrzn70ybd4z1mt4vukoq2qhfmi98nl8lm2j8jzy9mv96ku83xhrnu5o0bso90aot5n5gz346tuknk5q4kf6vogwszd1erjrwr5h8iq6g6kswk895qb0hyaymj8b1rl8gmj3',
                flowComponent: 'sqm9236wm8yfm8lmu1xamxqf5ob477iiojvh80btdxe56q6tv8vt3ljzzy0vw23isk6uxyzcv69jq3taxge0pliff6vfmyf5k38isftdsxqg9plkvv2587kisu9am1iwwb2wumjexac5jweik8zljjyvtkjjvtou',
                flowInterfaceName: 'diwqzc0ybbj0qar9fwpj6yuaua1fwha9fo1mv2k67k6whsqljb0l73uja4yes0nnhls202ymabhtm5sel9nk8b9w1aa7w5ktipkdfi066tcowp9ksarm7mz6hsagr2ztg83u9czqoo53vajnqwy2jkj4xlc4bxcv',
                flowInterfaceNamespace: 's2k5jwyhvba4ogtbzobahesw3ocudym2k6j526bp5b97gzwqs0ku8fmxp111qubhboy9cla7eydzdjcyr2m45xoh9z8giefl3x0ufuin74qkv4y6v29c024zhrv6x91b9uw0q8ninvty371wb2ze8spk9r9z1sbn',
                status: 'WAITING',
                detail: 'Sit laboriosam autem adipisci suscipit quae hic esse nihil. Occaecati quos reiciendis quia cupiditate laborum dolores eum. Eius velit deserunt tempore eos dolores quisquam quasi vel.',
                example: 'oc0ixjfa7xcdb6z87t31itm8qy1ti7kf17oppki9nv8qcaqvu7bacizpi3y6jhxm13dckzbxct1j9xxyln2tu1ia5mwsl1wqf8n6qx57n43k8a6l6cqqt2a5k6goezdwj12lsk9qfpd2m4r0yhn2cow4fg1aos22',
                startTimeAt: '2020-08-05 07:42:14',
                direction: 'INBOUND',
                errorCategory: 'xh1fxmragc8lx1dmlge5l90blhr6kh2n81q6jvvqz68qk2iq1uts7m90ces502sk45n1r68soot7hgc3b6mougdostz847txnfy3a7pdebjdszr20s7vechddvaab2t6506j69c1ahinnvbpobaz0ha7v7a3r82z',
                errorCode: 'cn2b41yaj9utgyrsj7ro14rytjuvz3inzdqn9choxpkeei29eoo',
                errorLabel: 867997,
                node: 7904019804,
                protocol: 'iib2cgog5c4pcvv927gr',
                qualityOfService: 'fcx1q9ab4chfubh29tnq',
                receiverParty: 'avjqej7muz6pza01umcfdi633mgz79osw1ycgioq2he3swp8arxdqn14tldk605vkqj2fohe6ro07h6651y1o4lhemg00jeuljl4otaxi0p4ioqgguiryoamvzk07emomjz8zkesr9e8ywz6ogmljk1snyrff46z',
                receiverComponent: '6esjdk2plzbolal4v6o67zt32dbxgj8wdwhcv4zck4krb28q22c5psqc05zwhloszbt01kyqkqkcmvc8ri46g69ribouvt5z4eyy2dw2u65nxzjjk1zumase9mc3w8oq5cbsef9yu1iwsd17a9bnbd9dn71sukov',
                receiverInterface: 'pyjjpxcy7nwhczqgdt4n1tna5wcf1vwdq9ygm3ik37hqfdlr01ryz7qgl9kbdzke883mu1rn6zoevmd2kcbxw84bv1vsiu1wr8mr3dm82afo6fni15gzceq06seb4a62vq5h0a2eb342xej6ydh0g7wpv0eiqu1k',
                receiverInterfaceNamespace: 'bn9jmc3crnde85r5gi3e4i0blcrnwa5fqqjumzww6led2cbjg2au0ehvnxr28w6kmr2fhho2kytj3k5lexl6gb4qsa0dchcdl1u6l7fpoa26kl5o0gwdj3xeloldn2ffqqc7de9tx9hhtsjgy8bths88sx0o7hfx',
                retries: 5444727586,
                size: 7072860336,
                timesFailed: 1476076942,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'bh6opydzmkm06z0zpgzxhlttp8528b7klmfgeesmb5h7bzpdcz',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'dyc87iulhqebilr5yiym',
                scenario: 'tougoghbxxlp2rc8m1sibe3w9a51o9mg59xaay3yn5bm0jbtodaro5428iz6',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:45:16',
                executionMonitoringStartAt: '2020-08-05 07:20:01',
                executionMonitoringEndAt: '2020-08-04 23:52:03',
                flowHash: 'is8709g8peu6mzf92dou0k9zhv3fefu9xu9c67dc',
                flowParty: 'kqr60n5wdgddy7hojswpbhri4dlns39ovfihl4yjmkh14m7bdxfk05ivmxroiew09kycnvcosxc5to0i8fvmadhq1c74lyctt36xapaw3e4vzr4mi22zy5z7oeuxv651aohgb7t4pl2oov5v5cwb14aap13fmt1r',
                flowComponent: '616xwvql0qtdi72f5ejkh2mnqvo0817hhdwx890bhsct1pp1cfb4p6zef2ihjofwl1f3mnbk41elb3ad87tx5u4ia9u0kkamwo27ndjwld3jx1sgjqrco3d4qgbnd530prt52v3p6ylzqlavi2w6slzloyqrlyqp',
                flowInterfaceName: 'g1j11e45d8ptagib5fcetyrndvgkgw6m5hq4o58xqxd0jm12syihg2yya6tuaiyd2i3x5u27fikkhefd14yygto2k3pqh5uvvps6lza3jfwb5mysfsd12mn2ad6mve6mhiyp3l89bmtb5nmhz63z10doi4yv6rlf',
                flowInterfaceNamespace: 'ad2mctqqpgg2p6a833gi9tjwf63yyys54nz6bhhzpr435l8x2vld2k6bwp5jgvyzvbx6rnk7ol8flva4ab7pes0slebkl2ap593nqm6232npjsx97ojujerzj24em7sk8q831n28fpxpic62iy2jbjef9sy5oeah',
                status: 'CANCELLED',
                detail: 'Eum quia porro et dicta cumque tenetur adipisci delectus. Cumque ullam quia eveniet porro et aut eum neque autem. Inventore corporis ea qui.',
                example: 'fzkpw0i4o8c7j7dms35rji4a0t8jdzze64wtjlh44u4vpubzn5ijt7ckaf4gprjdcaxbw13g7pl4rkesnef88vtcvab2i71zs0fujn512l6zlu1m7tqqqk6tjgs6epphwqq3biig2ldiqwjjop3y6lvao7f57fxv',
                startTimeAt: '2020-08-04 15:30:18',
                direction: 'INBOUND',
                errorCategory: 's5ao7we0b9nw4opv42q0562h0agpm020o3mihrdt1v3f0jf0e4v7ul5gmgkgaz8bal49v85fzhueg91q416kr9yaqumrjv28c2zzx3ij8juqcdwz645dw5n7oyh7erjem3lp5rxvsowahkhxkkh3p3ibb37nni6w',
                errorCode: 'th5nv7a0hq36a2gbr75gpcuisxn63qrvfemhywxthxh0gcaecf',
                errorLabel: 8304491,
                node: 5890079193,
                protocol: 'cwi47l619nbu9s03qqz7',
                qualityOfService: 'qaboeemg3o456voli4wn',
                receiverParty: 'e1xjlkpim37187295mby6f46djjevvjb96bo16pbn59pmrclw75gpalcox5uiq1vl01df3vjfjjrvomw5ndzkhgd7hv0ptz490llv11kwcjzhgf6gwsgf9onlxr9og9kcdj9aunvo9mym5vukn4gh7grf4c8k32h',
                receiverComponent: 'jph2xivlutfnoqaxoyugzkupzksnfy5l22vuy4ifgiwy0vf9brumunfx4l6f6yaegiku49jgbo6p6idoruczpbh39887582mqlj2d1ews7opn2pihwbkqlbgapc8dz7ird1f608kzbs9hrb3qjnpaaiaqu04hrc4',
                receiverInterface: 'wdiqf99bultzmequosyhr06litzy9pg8pl42kjh8diemt1uq9wbltfbu93f7zzksxpvlbctgt5m3nbgottpv6nkw6y9ewjf4pf81rnsy8lmpapmrdhpzklz3546q5vima1d19a1i8c4e5zymboztr0prf3asn0po',
                receiverInterfaceNamespace: 'jp6h90cr0upbj6r6m1jjzzms92wrsnhvp1c03s1nbu9udi8eqazb95vbrl3n144i9yk0wv8yyj48hckox9nu96075g3umlv8m5l9pale5d9cmvcucr4ibqtfncsz5dbjj7o3h05d4ya7ptvxh2ospencoo919mws',
                retries: 5303067112,
                size: 7757747499,
                timesFailed: 5108285696,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '2wu9xi170p1u6wunx7l7732ujltsry9uuaa2ec5ojlo57547pt',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '4fdhmjj1pfidlmqq04ka',
                scenario: 'obc0vq6k7f96v9lim9kfjk29aizn7n97xzvzzn6q98ptecp7ygjb085jyngj',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:21:19',
                executionMonitoringStartAt: '2020-08-04 09:49:57',
                executionMonitoringEndAt: '2020-08-04 15:06:07',
                flowHash: 'mp2bcqy81elxr0p6gqt1ei1wcxbsw2iyzs3y2o3z',
                flowParty: 'qr8iq31sq7mi4sbt2y30cxtx2p93gbz4yuzi1yxb9dtma1ueph6fofygh5mlz9nlfhyv00epnz521zs9y3fr6tsmj8glzzl5iawcky0mgvnqyez29ksc5pip3no6jpi1f1jqb5l8vwtuk8fcem3sap0823uwk40m',
                flowComponent: '4o5kf2rbg6qvj7ugjrefl420hjumoohsr5o6d0lm2x0kdrrkgu0ijs7dr2rb8xaob4jc4v8qist2y5vqdfnmymya8qjhviuncx9ezt8dqwr7uytcuvr0cy0oehdpoe6f65g08as2e3mo3rqf2v8b0qhdh1ut47x6',
                flowInterfaceName: 'jt2vyfiej7cy6x5e5zsimbt4br1hxx2gerj532k98ry0y1547gbembfdxdfnlqcg8commu9z9jic7ez9tcrxm76alv94d4hcal4jueodr0eb0gjvnlce23v0hmrw8b1aspeqyj8sflhdnh5c0bse08k29hged2l4',
                flowInterfaceNamespace: 'miqjy7g1sqlmbkvo3btprteva0tzkgn0bm26nrw5y5kgzruw7yk96tnqmibgj24e1doog4krafas12mi8mc54etaxw83b7wtg84phgmklx3q4krjyrrzmzdf9e4vkwer6tamyszdue8fi6ycszrvyjwfp558nv9s',
                status: 'TO_BE_DELIVERED',
                detail: 'Possimus veritatis adipisci fuga. Nesciunt praesentium repellendus. Magnam sit harum eius. Tempora amet aspernatur ut tempora. Et libero repellendus sit id est quidem aut.',
                example: '6d31b0z81gv7oof3rgh91apkh3be3idqq4xfmkcgggoqbjiws280nfn2b5p2hlu3m46iolqkut7g0rkbaqirswducz8j6bjbfir0p4vepz2o8sa59p5qgeveygfi2loj4m73hs45ceh7bi9i8oezziy0sjbu94dc',
                startTimeAt: '2020-08-04 22:32:51',
                direction: 'INBOUND',
                errorCategory: 'gmk9qurql4ybtxvyoawpfclvugan5swxmjoa8q8giz93i1vn1ljvyzp15nni7uwz3qxdmp0bfl1wyi6xsvyap3wevb53yojst2qvgktkx0sbhsz8vcr9e17upw0nuuvaizthupxlkghfythm1un46hzj7s210xfw',
                errorCode: '0n439irsoc6n9fibz5h10pcmi9s33fpa57m7238z9pwbwetpkz',
                errorLabel: 393858,
                node: 91290447708,
                protocol: '4dvb974b69b5gozqr4vk',
                qualityOfService: 'sdia4c1406ixnyubtuzw',
                receiverParty: '2k59wqirm6uyl6ijr7qd0jk4a3uuykss19a4ukkl04ctti5fft985higttxkjxp51kc8x0z9ynneusinoqg4rfrrt0ac8ejj5wbydg7metrqnajbc96cc6u6oo9yjc0qrg1nf8iryx091bmuwaqe6djy7yg5l6r1',
                receiverComponent: '37d1615rwyc3aldbht8a7mlv4s2u2mkabjyqk47lgn7833zxsd64nr5h141590n4584m87u1j0x68lctpxffnp1qe7ld08cky7zjhu9jorr3huyoddq50grgmukpiipwnpuav9t9iv3zsadqo43vvtla1qya1uk8',
                receiverInterface: '7d98brb966x55y72je9j0ttagkc1g6tws8pdibs87928zpgoj1lp3hxkqfjlwwggij0f5r88tcurrmv2rjvyay26996ufge22gbvu1m8igb0wfdt0gc0z316gn52plhkzjm8yrhj3aorjxdjf59r5h10ffu73t1u',
                receiverInterfaceNamespace: 'd79tivxfe6ixrtreki80v9u60rkqz3ct6vaigzve518zg9nd5a2n9u9oh0ipqcokhnel2m3d1km2kewib2kn5ynup7mgy0i6uq82poj7oozavhrytfxzqq1n83umq8rahtm3c9as335mrbpo49627pz9uzwemddx',
                retries: 7887646102,
                size: 8963058826,
                timesFailed: 4716936893,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'aycfbxm7ckvj481j0fu75xngdnlazg9n9sbk868tdr189iuvbt',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'h54444mbhvju6p8j3qs7',
                scenario: 'yln7n4kgczn4ailw2832ii60o0x76trb2ujditp9ic2tqodjbhy6yoaipj1w',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 20:37:02',
                executionMonitoringStartAt: '2020-08-05 00:28:02',
                executionMonitoringEndAt: '2020-08-04 20:43:34',
                flowHash: 'inv5v2ik529gwigqyjvjb02z5klkld8jpfngxbge',
                flowParty: 'rlpfmyae02psilvxy0fwu0gffemym25ogpk1jo8ey8okuct5yagowwfqxgw4gl533btzge7ofgxz9kky1ix9pckoir9nny2lhh4258u2zujp9cfwj5udlg6t1v3zhn3hfzu4wssgz04r6v5jy1f0aaj8y2iqsanv',
                flowComponent: 'wbu1k2jz3e4gxxtyyfxnmat6iytewr4kezk1ma293lpydaapunhcfyiic278byo4o20r7308kt7gkyur8k15ti8kbg4mf6w25vn6j25nejc2fmx9ik0d1wz71e2gkxdq1onn292pryv5iypecmsc5vlinpl964s7',
                flowInterfaceName: 'ywe3w252a3kz1tcsz65yjxt0fsm5u3gvj2lce6qivbo47lgq7kghfy0pkdmrrlgw3hfvtjqewqv8nyukhe24jy2ou66wemaz5c9n3yceynzhx5lv9cpk85bxitbknff8hhgtk24ur2wxuhmuqyz8kjn6d6a6dx93',
                flowInterfaceNamespace: '530wfdsyhgpv2k2z8aaz9bfvk08zsyymrr2dro5r2px7s99ju34ry8n1pzcp9a880o9bvt6n1ugh47vats7hmb0q4pfapcgrt1qxnz4p4tmxegk2is60uqtqzr37pwyx0a6vp78xirok7b0auftr6bruaiqempga',
                status: 'WAITING',
                detail: 'Facere aut deserunt. Nobis repellendus et voluptatem praesentium ullam est. Dolorem facere numquam impedit architecto illo. Sunt ut et dignissimos eligendi inventore. Sunt error quas earum voluptate quibusdam.',
                example: 'flqixj3v992wxwfhx7yadbh82yziicusneb5gilzlkm9hmr7vpaltahrf5pelj9teaxb10guivsemqak5dwt4v6tkzlddxp5acwv8v3laro5vinc1f8r13rp3n149klscud4k362jd3f8rtce3gxe0u9tm89320w',
                startTimeAt: '2020-08-04 10:15:31',
                direction: 'INBOUND',
                errorCategory: 'bgodim4pc8jm3suecf0nfidqs6a87z3pj3i0geij1f60ou9z09i7hfm2yqkv4xh3rzu0j837b120wgobof0b8r097mgo3aqd8v02reccixzpiamo44vo3junmsia1ohorrvbhaezvvfmea2op11g60i1gtjsizwl',
                errorCode: 'j70gujuko8t3t0rsk130r3slq38k265dopuxipn7ltbjmgeqyy',
                errorLabel: 987643,
                node: 5951942663,
                protocol: 'vd7x3n33s4omkkjmtl5p6',
                qualityOfService: 'b3toyp8yhczvkw252dja',
                receiverParty: '2u5e0t7vzw9eifxv59kb0q34e6kpntwhr8vovljydgkssboz0ggi8fzhp4bdfajx7tg9iocnxktgu8lcjbf8lhpmizs0csbgl1vddkmfetgm16ucmm6i2kq714376bpq9tzb3z3bxlksi6u33l0938qun9mg62nj',
                receiverComponent: 'y1f2naqxa03dew10yfvgphw2mgo4osvyaszymj045w43v2n1jxdmlxsqiepdvl7rjrgrc4kwndh6jxmxhmxw4rfmk6zss3oxkpxqohc8aj5rf3bu1ekthdxg4qtk60codo612pqfsxwfsspzdzkhq8sizoveurap',
                receiverInterface: 'h6p36v7kovhkei1phurqsipy60wsw41uoo00z01qfe70uojjidkryb6ea0cvdn3qkw09fyh9ln1xadci3moehhrm79b9eq9eexs0bjddu4bfi1kacih9cnu6sr268hamqsifmimurile85xkm9hify1ughae2hf1',
                receiverInterfaceNamespace: 'm4w65x6i1kuj1627f65x0f6oravlbbqoqesm5wrxwss3dk9ajweqb6e2imh6rprb22nbsbl9biclpcy4gw01q5ccae05w7jtscu4jhdg50uwr2vltq3rmfr6mzuf1zeqyfd43dxylh58lt2r7641mmdqprxtkfsx',
                retries: 9393971630,
                size: 5718221190,
                timesFailed: 7955752979,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'xv8lc5p52fe5mzhgye2woxi6e3jfwes0rquu57zkxrqtmqvael',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'o6cielmhzefuplvuqlch',
                scenario: 'o1xhr5yoe98b9nq7utjdocvf3v7g6h92a5g1eu93zd7lkjdlg5hbyko16m4p',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:06:47',
                executionMonitoringStartAt: '2020-08-04 14:07:42',
                executionMonitoringEndAt: '2020-08-04 23:42:55',
                flowHash: 'ycb2nh75k45dluqtlq62k1tdqffbs0el7fqo2dmc',
                flowParty: '3c8bcqvy99rk6t39p2cableefuhiumad8hmod4kijsjz4ez6w9w2mmbomfodfdmrg99mbzcpxeycd4ovdi7a3j0boemgow03hf8bvrbc2yc5a3p4kwem2brzq2xj9jb6frcwsq3s23do2cr6rnkvi2lhvb7r8xmd',
                flowComponent: 'qjxqbway4fryl9yir8g9umyeckyw1xr04qsmumwqizztporln5303wmrmr83ly67cxc44rpokvdd0az4x92c9tj9p60ehtfxk2jjn4dizzvm5st63vu6akxcg0xwji7yebcma17skctt6cqqhsc965tqvtpzlff6',
                flowInterfaceName: 'jqbw9jnvu2tjzli95w0gfcd3r0rn55wetegudsyqgr2ok2lcgy08d7steubxkeulkj6j0e0htvm6zvgh44yom9frs3ssn2ax79yjbcg1p1cibr81liedmrjrio8z21oyq10eg5gq9d57n7xf1i9r1bskafwlsfl8',
                flowInterfaceNamespace: 'rzx9prdyubszavk6z7tv5be5bdwxadwrkpvh8mbm65i1cm44baj96spjs2dqxyq9swrhbj9q12cftc9u0woqi04opm8fhtwpmmgr3txw1uspkfp3nfwgeljuppjbsha9f6ojr7c4w7wrpnwbb40sma6jaf4ep1hk',
                status: 'TO_BE_DELIVERED',
                detail: 'Delectus sint molestias iure aperiam ut aut aliquid consequuntur illo. Maiores sapiente suscipit numquam esse cupiditate libero recusandae aut. Ullam ipsum eos sit error hic aut aliquam deleniti dolores.',
                example: 'x7o278ccdosn23g9nydcfc9ebjynv964867yrnw3v9tla5d495zaf870fxzwz4s55rv5bfikz0ltxwaw9ie3jvjwygd3xt7xeypgk2vo4iz3mbbu143xjjcmxz1usdgbqot0liwchn3nev98q4uyxl6b1n0pb5sv',
                startTimeAt: '2020-08-05 03:25:20',
                direction: 'OUTBOUND',
                errorCategory: 'sctg2e8htf9ul9p6j0t2w5o9vh4qagn06ncwj6qr5cvxjxz2521a7mwmh23unqqtka68ghejoepyv2g0bsy6lqmg7cxbog56mixx7z9ess9s4fgf6w4tunfxxzx5olb03ofqbesrqg9y58wqtbesyilimiibyanw',
                errorCode: 'y4dmsfvw5s2jqdgywj78qzcu3kb4253m1npxsmp51m8fx4d1ea',
                errorLabel: 676456,
                node: 5016724996,
                protocol: 'fyaces3p7qlyxhjz9k3u',
                qualityOfService: 'ut7a967hvk2aq82b6y4mj',
                receiverParty: 'hv7unegsrvjrzmyupq8kpwzqj8fhpb8svyhspvowhl1qsmrvne5iev32k1ksycx9r464wv5f6c5n4748xe92s3tjqjqrgrtobony4b7qpo7xsqzdrwvsvasvppqi7qt6ktyp8s44y363ytbl859hjfhaw96i768w',
                receiverComponent: 'v0qw2o6vwsoujmcg66cnwdw9yts9bp2e75ykfoq2bkmhx8b1awyefxqeyymxbbzs25k79j8cy5c2nuyti9wd51mp0515c6kt498gilsas5tf4l624f3nuiodpfrbntpbbcrtvvepfmb9khmv8lme9g1jqkcdwp9z',
                receiverInterface: '1dd9c5n5zee3emfv5w3r8sr9dx08dduorxhsp0yoxjtgjc5gyiy7p6gxs1vq9xkefnc5skt2d3dzhroeqcht0l7rsp9rlqqy2s1bee9q16yu6fya7t8w0tb4ot7y1eyvhtr7rhksqxx7clb204xw2ihqfm4bua56',
                receiverInterfaceNamespace: 'm56akeeao1oco63o4wzacxywgyaxbpca7ar37zb8qb09yfj0iccc8wf3cagqua56rw8x2v2bym1ogaklf1jesknmke2moyekff2ori7nns864m3arw29m7fgihzm6vcvic1h26akrxz5gewk6160d65k2n66uw5f',
                retries: 7366389815,
                size: 8637293108,
                timesFailed: 6351401756,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'b3u7l09md73f9cud3117kq64xnpistev090w481erkr1uiftvm',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'sv00pkg85wqfdgzrpt1r',
                scenario: '5zg8bsip9r07puwtpj4m0qes27huviz8tzdglspmnan6wlo5wqcl483zb0ya',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:44:46',
                executionMonitoringStartAt: '2020-08-04 18:02:40',
                executionMonitoringEndAt: '2020-08-04 15:13:06',
                flowHash: 'jxnsuhp8zfdl61z3j6p0jx2xq9c857ymupxvf0rg',
                flowParty: 'ohy2nsjc4q4f7a3r3bcipva341y2c0d3x5kbelyckjidfs1wcjy6yo4u693gq7t97sy1br3hpfiaiki02gr4id0r42u3g1i18op48ey7ec14rggvbpp7zknv5wkf56q5xqgpsrk3zaw0mva3gp15rtxolj31k8dy',
                flowComponent: '3n6jfodmyix8huqj8zdt5bp1g5fgqwqsm5cwc2bjzmylb143l946vwv6ikuqm362mx05tuxug65l6umdfubqwc1ulvzwychioj6p1g2c4ymmjsz90yadwjl5ox3ti0b6r8w1utvme8nq5r2vhrj3ajbio7am9wmn',
                flowInterfaceName: '3ghhaeqkz12mlcxonqoco1s7hstxw0kbj6awmmfso38s4k8uch8d290rkb15pmlctyx39l7eoyjpvelh12ncxsay9gcf9ku5flazixk8msd1odpt8u869mz7aqzmc6blamva8kssg9palanxhqeo7gc18tbx30mb',
                flowInterfaceNamespace: 'x6gznf8bte4ywuji3ki270he1e3yzlvr5y6gpl7wjjetfq4zhgve8zuaw42qlhi520k7xd9zz9g0akhvxt9kb4y20lgw4b7zramuhreis0bq4nd6bxtyfzf9vnbrtq5q82kprnfbdq237rsgcfl51djhf0egbie4',
                status: 'ERROR',
                detail: 'Assumenda alias nulla quia. Corporis incidunt repellendus mollitia. Illum mollitia numquam atque error. Vitae soluta aperiam provident et voluptas eius molestiae modi.',
                example: '6kh8n423oc2p5e6wp0wnx1metpbo5m5fh1cvnzy7iwdcd9uny3rb7tf7vvnlks5qv0n9qvwu0enrwqvg2uj9ww2l37mtpsqjclhz52d3u4om789cis0puhbbls7km9233fxj4yktt9wfl06hl9k2qcmfz0qjgunp',
                startTimeAt: '2020-08-04 17:28:13',
                direction: 'INBOUND',
                errorCategory: '19e8jp3qvq6z3m9zsr0nlddhg0wakqun5mnvjjxli52nk98wlhdqhl7p9xs3nwjpdmlgm6juu7n0eqcq4xp1vv7w9qev5qfak9ptugrxlrl23ptnjomg7041s0dl81wrwnbx4o5fzvp51f26r0rh5jzeutz7htk1',
                errorCode: '6kc1dreh5s8gwdulqilmfqmg1amwcd9bg4iefzn6h7ij6swerw',
                errorLabel: 646642,
                node: 1039383378,
                protocol: 'gske7njiaku6xm52pfrk',
                qualityOfService: 'y6ezf68ed64ogu0a2kk7',
                receiverParty: 'w28fin3x3mskmsjnd44mhxmagfcam8lvnj7767zqjj5flahd06hnuzn9c0xy456g6vpwilofw5z8760z817pfqbsk6n8lre59eckxfl0pktppstrwd4191kqi9gpv5aggdx7caz73fkx0g5c8okf65x8sf054d1pa',
                receiverComponent: '3k7tjd2r4sew4x9m5nk6ffpelh2b1g8fqgkkrw4arzpab2fi36m1hwhjd5w6akqtncr254alj6nhin2n7z1vr7m8ab5mzed97aqz8n2i3jutfya1whstfmz0ewvv5mdstza71dkdp2a9zekcfbzecuaapt0k3wup',
                receiverInterface: 'bximp6kv0ojhy3thke5kgfdlnyv9somd3zktaljv5u3hmx4ieahg2b02nui9gy9miwr19748w6k0deagfdcozo40cjt6gxhdhy8thuo5nkqisx0t85ph7lr68wne01hvfm2kmao87qkg1xg79fcebtlbqhufwvu3',
                receiverInterfaceNamespace: 'kd50wqwz71ne2xpngvi1ztsem2xtoxs7vioxgqwz7j8gnmwojb9j1qmu744qo4mes923kuh7pzg3vd5k08gdupkwet1pdsgseioplusbk5lk4d9lxn1l2iw7pjyyjn0o2h0j6w1c9sp7ou2xrk2t58vfvzcxqyar',
                retries: 5306186661,
                size: 8560720927,
                timesFailed: 7806609014,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'b0sgdslrusyksmn92odpw7igt3179u4h4tlsr67ui3c8i8bw3d',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'wysa9e0y95lx9vwr6zd3',
                scenario: 'w6v4xsgbfym8e4bcii83c1e6wfork310oxkv3xveg2725fd0x77ut00b9wez',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:28:19',
                executionMonitoringStartAt: '2020-08-04 21:41:25',
                executionMonitoringEndAt: '2020-08-04 16:53:45',
                flowHash: 'h7v6k1s790qdhrqnzxwlom072wzv7eyj5b6svy70',
                flowParty: 'tmk7causm91yehqgzl3mwso3zwas3663dyyxs7or8xrd14cdkdx9h74uxkh9hu13ggajk8irq515vwd01ik2qlp3qviiee75z09getjjo2yuuwt80eqzl2jkeebskrby000g33wx1s0o2nxk00fl7iv1tl9s7eyy',
                flowComponent: 'dxr9q689hky817pva4u4sozw6ckn6mpjq1zuccqagretgkrabb5n3t19bq74ad8gs79st8tjibtbdp6vp2m5xli2rrjosq2lsn6mtmi8p74zei90z92uvo4y8v9ali4u5qlampsyai3vt82msyyp1w8u0rm62kp1',
                flowInterfaceName: 'dm6tt3oth7xzgzubybhqsmep5ohcirpujw5uugi51ex5h3peslkkgwzq9muyw9i8iytoy1xjn0vctvkuhf4n1dtu16ug68cjxhlwmlfq8tsaropafmv60dhbjwawxg68q117ct2slzjmmylmh0jmauozi8eusx26',
                flowInterfaceNamespace: 'zxnj1w45mtjnj7rcd46tgu8fsd8ozzn52cpjh31ksfk09kwxcngta6ujzwvlscwgq6yw3hpbdnnppe04pgrgo9z6vjfj2l2mhx4iqn5ajeflz0pgvvjpkzeaunsb4mb052ekmxzivik7ec32w7to1ad5ih9n2g0e',
                status: 'CANCELLED',
                detail: 'Esse accusamus pariatur quia unde et consequatur laboriosam odio ullam. Quas quis eius et dolore amet. Blanditiis ut ipsa voluptatem. Saepe in odit aspernatur non.',
                example: 'b6xqociwmy6qkf9q1658hw1oyclsfktcyl08fh6g1lwncyuc9ofhj1f7lhk1uflv80juul70s71wc8wp51wf80o0qw2u6osb12apxebssqxmxu3gh7undidb2ftmovbw35ivgtci3vg4uqs25jhddtvx6np86o1t',
                startTimeAt: '2020-08-04 20:21:03',
                direction: 'OUTBOUND',
                errorCategory: 'is17zjrcla4dulf32gboefrpqi9o8iilu8k20cntix7xpvq0s8egbos2g09hfqwtzjq85h8xm9gu2tf33sadxqcf82udxxx01usqtxn1o56cjy1kkgdttkltrav17oyvjnfpso7jo2peri8iyf4l2ynoxdts7ua3',
                errorCode: 'rlr012sys35hkq18xv10l2rro1s4igowuwk7gnpmodwjlda4kx',
                errorLabel: 373942,
                node: 8351275732,
                protocol: 'oxms07ujd4dpzkveyoqp',
                qualityOfService: '66o2jw0ezy29wjaw1za3',
                receiverParty: '4b1yyaqmwz39nfd3vx11b0n68zhhbz15rydztamr5t7h7gtcvlccltp0s7hhwevmgwtt8vyvkxm5eq4j1m4bq6yeu4ca40fxpwn95osicqpoor8hebvpg7jtbfv09rcl8e8qse2sdnhwvnk77n89zdbpnvwhqmpf',
                receiverComponent: 'axbn2rpfh7vtx7gy0t5x8e99yj1673b13ha5w96g7ewludq2gwo6mjvhmvk70857nc6tsiszm2ew0xvph66kotino9jwv7iw12d46iv1d82r8iwgivnpx2bpqqmc6230av5s6c2z9lxz3ib0eyfp6ga8qkolei4au',
                receiverInterface: '1svn9d6e9lsxorvpvlvr77hpj1vzvm3h5rsflims04zpyv9n66jf8lk3uxpxxmeyw1rhkhzannjhqmsimgds25gfl928fgbtjza3f3o1ej1ng17z7hcsx2pvyrsacuemu8j9805k4vyr6wth6i73cbfvb668i7xt',
                receiverInterfaceNamespace: 'iym1obvpt816mbetpfy5yrd4tgy8jmgpkk3fxr4ul5ufxap2e38osn3t43ljinz4yxfdymp7hudezkwdfvy7pifq5q9gf4ognhivfn2evi0y039jn18309u6l73i60zce48mzgkqvcc3z3yu30tgwhky9sl6igi0',
                retries: 7819673451,
                size: 8286126240,
                timesFailed: 5837223977,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'tiptzdopm9ljgar662koy53rj13vryb2irhk605uzlg1bmaxnc',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'wh6up9fckj8snt96dyew',
                scenario: '0napwzqqwcpogxxa6zz0ptv9th832dv7j9n2puwy8fz29dieygsuonmkxp5l',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 08:03:43',
                executionMonitoringStartAt: '2020-08-04 23:16:05',
                executionMonitoringEndAt: '2020-08-04 11:39:50',
                flowHash: 'amiocbeida1bo8c4ti9sl2uqkmi95ant6we4qqij',
                flowParty: 'y68vg7w7gj4embzf7ild053dl69cpvq09hetfnb2dtqe1llbfta9aetfuzg4uubwqtywn9qy9cuf80c8pxp57z09ih3q0yuzw8iksi7vx1njdz7ysnnf6dps8xm0svutud9nn7uki2mkjpqmpjic3j5hgdiwlcr5',
                flowComponent: 'dneptx5yryoojjtuf89mdbrip100kwlgdyp6gv5vzzc7z8zugj3yjt267ymo1b9zspizf0furrgbdw2mogdfjpo9jo7xk37qbeuy8nv36plbc9n9wyuym746994511986v1aui7mo0qwk6iu9swbg7j23bmrcak1',
                flowInterfaceName: '84b7wuw98l9ytjt54tolk9e0330cxg3ykc4tjh275uhpb9frasmqt2x8z6z4pspder5he0kopy837lgsikadzaiybgs8evkfdh5yx3yz7psjml9cdt2we7m7ithg08nl0lnrsmkw3l92zta36h5anr8d2o44tdr3',
                flowInterfaceNamespace: 'env2cvh55uh2ej8cpn2m0a0jhb8zsph1k3wd2k0jt4a2z63om2gwo2rba8vk6x0t4zbhlnls5tecuk1ryd742s8npdb72es9v7y69bcdgsibob073kqotxsb0cxgzbjl67einojvauv11ls5ic3zdecxgm478lrh',
                status: 'WAITING',
                detail: 'Et qui alias incidunt repudiandae labore explicabo. Ipsam suscipit totam iusto. A facere assumenda eveniet numquam. Similique voluptate ducimus fugit ab velit. Repudiandae eum est aut omnis consequatur ut reprehenderit. Ut quasi rerum eveniet debitis beatae expedita ut.',
                example: 'fqpgqzrke714uhzdsce7u9ir4val5nw33k8qkun956scedpscdymzk2bipd3fbzuoorkazflnv9jjdtwb4f5u2irja2ngx4frelz0f7ppgsvs2caogdny0po937xvcp7ov5n4qadhu0mpj7wte0oor6zkaq6n7l9',
                startTimeAt: '2020-08-04 20:47:22',
                direction: 'OUTBOUND',
                errorCategory: 'gix0wjihnbw0q4g1nvdegpfq3uoiwuli6k47g87axcz1ixtk3r2wjbu2o98xr7fp2mbwmqvjsv06n1hgf0xmsbc4lgjo25kotzts8uw2rknalf56xq21e41ohoryxe9ngbh35rg99wstoifkgsy1frfx3abs9y0w',
                errorCode: 'u84ndad5762cgybnpzkptnv9yxgdmwunw78f1uyq8rgqh1ircl',
                errorLabel: 668898,
                node: 3194498422,
                protocol: 'fx5h1mjihy8xaajs7xwo',
                qualityOfService: 'oihwmjiosssly1bsbra2',
                receiverParty: 'rizxsq3ufzfld70lcqugx60xlx5738ona3j38qte3i92watcrrqtcl27jh5z70ijtd4092vy3v0arvzxfbztuew34guyf88bn1d7yo6iywgzqj9jog9ptewvldto38c2e9t24grl4a66620ytljq2g2yjmawwkie',
                receiverComponent: '49c1gi6n97qaf35iflucjub4zlf1j0u31w4vfq5g9oxgdtro6r9770u00upt15dpbpermqtz0fvw6te9hrv8al5nc62aa4kkcd4cvqh8z13c5gbmf9inubhbe75hfz3hlubx35iwrdl2g3vzh98vq6i7g0o5amrl',
                receiverInterface: '0xrff6bkk69kaz1uv04eazajyoypnzuniug6lbtg50rhjt4ndqjumfhcrvwdm6gvlohsz1e8e6lrwvckbl4r2wjvndv0tkhy2tmycx0hldj6fczwgag7ai52qgxegamtc7fs1hxn1r9mttlraam7iqvu7p77ybach',
                receiverInterfaceNamespace: 'rs6smora22sdmvpgt0qvno0my87sz5r4bx6piend0vrb93pq87iionhv2je8hmhrjowlr3qwocdwngz25dpqpb8sxmtxhdvq89psknmd3ru9hnlfz0fjvrljux1el2ran20h1w1keljadfk4wtlyjm423flqtttx',
                retries: 4983500886,
                size: 8179823471,
                timesFailed: 3861256039,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'zvti1188wufnxrhrkxjinh2w8yc96cdepc0i3mzmk8lkrnv16r',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'rt4boroyqamqfm1xp0ie',
                scenario: 'pbslv7ktgnbrq7fk7xcx114ykv882846ofeb89nn5mh33h7ssipaajzseg0a',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:45:58',
                executionMonitoringStartAt: '2020-08-04 10:52:52',
                executionMonitoringEndAt: '2020-08-04 15:06:45',
                flowHash: 't2r4o0qipl5aatovzz6xs7mye1lhvp6w8rud2tmp',
                flowParty: 'exraszmy6a01m8awr9nwen9dbpq7uj9lyjtn2wthqdkz5ckkpduse7rw8tg09e1ktqn5p2ij949uwn1zvjz25hsa01wptd1j401hipouliq2hxkbbri52mp8fpwwnmtp1qe598z6qvfzn5hfcjhztjextj2ha97m',
                flowComponent: 't6afx3ymku0ayv83ahxtxyuauk3ouwg1z7hi78s6u7hwv72ooh378pq53us1roa3lhce0pcr44euzmk4oig0svxfc5hbl2hybiafnfyac70emz825almt6qfe1pb3b2fqz3tofu1vny8lf54k5brgf84bzivdver',
                flowInterfaceName: '31mvqthb6z26cvu79g5geocuhiyypqveiztekqgowg27366f1yv8i08bpw4k382ow57drbd7h2xxpg9cp4jeaztvr29vwokequ635s2nj5a4k1tbb0tfbs222ftxyrynem4pnw5n0oamnwb9trigb9jqttifrxj0',
                flowInterfaceNamespace: 'x5p43tvaf3g98j0ie6tb2jkkloltv27oouis0u8ip22sxr8qarwkpvb8jwfpoiw2c1uy7zfc1zkqe7y3zdjwzkm48j643c6xkg8novf9ivk82k23fs9o39z8l2gcrtba1g2w72vgxf4q4zwbbwmc1qxtlwbpjc0q',
                status: 'CANCELLED',
                detail: 'Aspernatur esse laudantium quis sint. Et qui porro expedita et ut illum dolor. Expedita recusandae ut a. Sed fugit qui blanditiis accusamus. Corrupti quibusdam quaerat at et labore nulla. Impedit exercitationem vel sit deleniti animi aut tenetur corrupti.',
                example: 'uby5y63frbkcksnj9e3zy427dx4sr6ri2jpksnp60gmitpgzuku7g2rw9zllfu80arc29bcjw05vw1p8mdmwtkclckau5i2gquaj4qva7jhfdehjkre8tybyazp68lvuopo8hf3xvnh9ss782rgvv36ygqirctui',
                startTimeAt: '2020-08-04 15:36:41',
                direction: 'OUTBOUND',
                errorCategory: '052g66rdqxxxkeix7wofwh6n0mq2sl28rt0efe1hki778jmf7ievxit9ofs9rpf4db6ege4idzfif3roycb0cvgtvmwpyfe2wpnz86iaglxr6hd94hw0jfvrdxr1kwyeyd8mqzzu7u9zlgttsjarkaas97z2rmqr',
                errorCode: '4cobqufnpzxsbmvkqzilc2pg9najnmchbzsqmpg70msqf9n93x',
                errorLabel: 648520,
                node: 6422707436,
                protocol: '819jm3s8j1j134fye60b',
                qualityOfService: 'bxvqyzt906nym6gjm4cw',
                receiverParty: 'cj5w4reuzx4rbhkc5qbgybu43juml4nalxrdr2pgewu5diwf3k8odq5e50carx5oqvquhi5o0jei7envhr5ta56cchdfs6sul6m0hxo7y0rjjlqk8h6ydql1nck8eupp6f1jb0detj3qyjvzwymo0brbh43lxgl2',
                receiverComponent: 'msir55yu2u089uvrdhl7xhmngjcjihkubr4fjsqt98l8qabcpk4ohtlel2q8aryn554hqbyzbpyoj8ycapfr0hqfxf8p7bw3yxxbo5ojlx9agb4464bf8kq9z7ed4redyh2yoth9qqndhwu48l3vf1hwnfydsk78',
                receiverInterface: '8oifds7rvlti7bjimu6ajgas983n90g5y3sidhps54jhsvn77yal8vymqj9pjk5w51bpp4pjmum1on14niugf2xqaimkfh0a5ifoj3qhb5f3hcn106bgnf4j8427dhvenewrjd97ut6p9vo7tmtl9me09f73jbcj',
                receiverInterfaceNamespace: '0e7dslc502lmup782z0ehtjfqdx6bq204tkdkc6i5sucntp4di6i0a98yenzu6jlwm8bz27tasks6f7po274quyerizpgrducgmtbof8x4pla5694xbyt0a38wfzw5zd479o2lxwte2bvkjia32swjw3qrphzbk71',
                retries: 9017659062,
                size: 9795250373,
                timesFailed: 2314840565,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '3swq5emp3cqvc862hmdwjg6czx8htqjd8wy0mjx9rlpg6qd6gi',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '0t45llxuwqttcppwhiep',
                scenario: 'ppg71akbik35c11uc1jidr5knol7dc7lrd833vule46n0f6xkwttt23hyxmc',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:47:09',
                executionMonitoringStartAt: '2020-08-04 18:05:21',
                executionMonitoringEndAt: '2020-08-04 16:26:02',
                flowHash: 'l89cpsqgu0ua7e753vq8gyxzjzdoje2d65nqv468',
                flowParty: 'l181157lrhdhat5v1s7ojge6trhi4sqp7ynneleupabn2tfjle8bcr79ug6wb75xzynnvsh3i6ms4sf9y935n87zzkp6esjsa5y41a8otikf9s2cg0mbqxlv633ork5wrkmry41bcwv961dg9a7p4kwb8d6eo21b',
                flowComponent: 'kkauoo4e39mr9y38rbmlgnsp1zvterl5pldsk15adqnnpztbxx21mc8tao46uhwex5opllgg2locnhfxtgtq75qhflwan1cx73ihu8urnx0h12syjuua6ppiybftv7v0isxjivhdyps8acozalbqj3jfd03q4xrj',
                flowInterfaceName: 'c0d514vswg6e82wcji78wy8m353ad3xh88d5o77vih0br9khgi2l2gf0cyzf0ggtmyw30487wdqnlgopa3ffvydd1z3yv34fbmhq6cwr46wxezxaiudw61x70emug3o6dkoo954sj6c18f2nd4x2ldg3fhpx921t',
                flowInterfaceNamespace: '8gwaaskz6ogcknckvz3hhmeye9gai0be8m77nm9p8busmjy0jju6h3c5v25uoou0q4ohlj22u0sswz80wh9op5d4id2tjvq2yfc9yicp4rarj9d8aaarismokst2300r4j93cy8bhphpcngrq6au3m2w095yz4qz',
                status: 'ERROR',
                detail: 'Perferendis cumque voluptatibus qui ipsum sunt labore nobis. Magnam dolore asperiores ut eligendi cupiditate ab. Non autem quas eaque delectus neque cum beatae nesciunt sequi. Commodi pariatur earum quibusdam eos debitis quas eaque officiis nostrum.',
                example: 'viemyvl2sww4d0n0vvfyqnfsz61oy89sik2tb3hpzu9k3mj21hivhl1v6tmnej2bta1ea4nxkknb5dp4bavp343kn3t2j50l9qe99ew3696e6kyt6b6dp3sevrd8kybzq03u32w4eextxmi3wsz5h9npg3r45kkn',
                startTimeAt: '2020-08-05 07:26:10',
                direction: 'OUTBOUND',
                errorCategory: '8n8kbgurn2w3d4ocvgkyi1v2gu883ysxrmu23bbj89foy3qm78trhm7o0o9f28a3am2b7c2ykc5o6ytee47vtqi77c0toxszh7ge5hxg3h9o9otgc4vhdbz0qy7uxtvanq8laonshssb0197jp4m15avywerbspb',
                errorCode: 'o29z8t1u2uyumgpj2jlu6u1rzk9t0y30qggrhzeoxn8t8g3fz7',
                errorLabel: 800110,
                node: 7057809116,
                protocol: 'u50xb0moid2wd4sig1hr',
                qualityOfService: '1yzfazjspi74j1vrrra2',
                receiverParty: 'bf955ywgebyuu0ktzj6ke9zdt94vb6t7jcb6u24xdz2s8zkqi3lgb9dj79m8k3vycs5p92688vu5mymoi7zb0qhdsnta7llywa44e5te3uee4vaphr7l0udu71ddig8q2o24gbl1i75et4wy12qq7w0lzwihiu3c',
                receiverComponent: 'arcnitmin6vzdd5xclifuiojetbiz5j4btl80ghd6h0phuu5n1mun5o8o9653mtnej6zl5akw3gglyau3q9l6gxgui2kx3pr61hslwy8d9p8za53l8f8ppvzmhymbaya70lb2ikj111l6ancntngq935reeme1po',
                receiverInterface: 'v93tklcorxqx72bujsgbc3y3y21fqm8o8i6sck1xe198k5yharez0vpyu08jz8yyvfs46fol4d4wdybnmrlwhwjbc21sme1tlwj4l0llakvsn598xktybvg3xc7qh3ayx28xgm2cn477n7wwfyux2c60zmratc3k',
                receiverInterfaceNamespace: '1fs3s8ngf3kslso33ev4ibpmogrkm6am9ju5ie8d9zys8vhf0yoxq0ja6tszxmv9g3g4v3e198yl1hdj4kjgxqgxpzwhxvfabvr9if0neumnbthbascyxctsyeb7tu3jh1h7yy7vq85jtzv8b6z6yg4at9o1y4l7',
                retries: 21237784742,
                size: 4262532760,
                timesFailed: 7841856546,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '78culagymb83ng9zmr5jp8ju7zdo52yvbqifudtnwrom301omq',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'zp6jwfk4a6nn11r09vix',
                scenario: '9j2403lyyenshspketu6n7vaa8u228wirk34d5gl5jiot1n2uycoy91jlxln',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:33:05',
                executionMonitoringStartAt: '2020-08-05 07:42:58',
                executionMonitoringEndAt: '2020-08-05 05:50:16',
                flowHash: '67lfll7339zq5d0yg5zta0po33rcosgku5cnh29v',
                flowParty: '2h40b1zjfelocfn9212ycditcg08wtjw8uzxjurwisljxm092eukyvlaechfmzfcgauw0po8tsdhbqwy5e5wvcnzza6lglj9svbb0vc8b3kjnazhhztwrs6nuafyzqddflabxl69g1m44id8b0701elutqmxhmgu',
                flowComponent: 'ej4x9i52fc346acswei0j93fay7wyjd0wrlcvi7lfxm1ffyzbi25lvyvtd8iuryjr95wll6xt0cj9pts2vnrwugnvf2j5bg2kz3lvhshhl1losaw7a6eihywq9f0bpgb2l4osr454qkq89po6oewqxbnxctj1crn',
                flowInterfaceName: 'm3e9cglfwzh28dq54sapju7vhy12fffd0rkurbdplxm5s9yaesod818kwqu75lxvg9h3p3jzzm8j3n7skoqw3a7z46s67llwa6js83el8nlkewpiubi1px93oyq3kqv3g5jtdhtwp92pwxijamlqvcb0pcbccamf',
                flowInterfaceNamespace: '75ybl3wz3pjjzg3igkyx9ow1vss4db0thqvgehxaapey2qgeg7f0x86ihlu5l9s8ses7cy6ccuy05qns5581v8dcladqxqh5k3h4kfl3ieu35dwicchnr90mwoio8kmdqbbfddzb3q3kqdz40ye9w017jb5b4lth',
                status: 'SUCCESS',
                detail: 'Ducimus minima nihil repudiandae. Repellendus temporibus et quod explicabo et cupiditate ut et. Et ea expedita in. Minima similique quae dolorem maxime nisi voluptatem maiores odio voluptatem. Et quae voluptatibus.',
                example: 'rlulztivt5ubm7clac6k94m7187vk1si6oyxrqqvrz943k310mkr5yxbjuwkk62jvd1nnj7tvbgts4qge2mkabku1y21veu3box4zc3qt6v997ezumlpj8mw2qmwul82ib8k8woh3hbt2ypdsjwox5msnm187sl4',
                startTimeAt: '2020-08-04 14:26:39',
                direction: 'OUTBOUND',
                errorCategory: '3u1lcp0qlpk6492e5ew5e6koclpjrpe5b7d1stqs83yj83kzehwnvnfai5ancnyz14aiersg0qwtmwsrwy8apbr6wxfqo47ndebaq3nbujmvrubu1r2gae9c48gx0cncvd0wlqpjym01g994lnu6taj0xfjgvy6u',
                errorCode: '9r72i1l0qrfdy1r69lxitbb3ui75vfagijkh9v6ffxq5iaz254',
                errorLabel: 122681,
                node: 5652009065,
                protocol: 'vvka23dofgtlgvmqhge9',
                qualityOfService: 'a59c86x6rbs2y0q5v5bm',
                receiverParty: 't7tycc9j1f45n7bsl11ls8ki30q3owfoc4h9lde3k9n8zss3zdtji5bmqvdzpurp4aj9xf6cirnto2l9xbfwjeonyorminmw0ra1t8u2gmqty3fb1fgqpvn78tgq6qbns7xmdvowun37eggy1zv25rkuzsrqdx9b',
                receiverComponent: 'fwx52ypc4323818poc35k7w66ufvo85oaczb3cmaczr4lp3guf0s0sr6vsyzrky9fgzi6m162akj5a0mg7azv7uw05trpukyddwwhx83zkih7uipg3r4cw5wc552tzngsn500glmzh24dmcz1du15shrb40fyrcw',
                receiverInterface: '92hk0q2o2sh148o52kkr2rut931y0c4mns00pcdy94ooscf3wykfw783sqrqnwktcth2ilivrhqmek7yslcgpc8x8cvuw4ezget0lok648fhgkpgaw6qedhi7snqrodxyhwxxrvko891qad8ile2uua3zbxyqfc1',
                receiverInterfaceNamespace: 'hxhf8fr30r45mh1pjmrjs1og1oi4wctiy9m0eti6e6zagfanjmf60kspz12qaahh8tkzbc0cdcvksqmap9d6fkj5x1kg01lc9qrgld2e8llefa4y6s0c3ukbn0xb0gpqpqfrbjmd8d4pw2azvlwaq8299vlgdzx5',
                retries: 9597346207,
                size: 15898063635,
                timesFailed: 3619449275,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'm3fjeo0mspf1ibz9dh3pgb8uixxxy0wc9ug7ly27orhc0sns7o',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '1sf4jzxmny9znu1tca1h',
                scenario: 'iq5q2e9ehx7oaa2h8dp5hclpkodiy6mmfjrgi8fyx23lx2czfxa0xsyu00hs',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:41:25',
                executionMonitoringStartAt: '2020-08-04 17:37:30',
                executionMonitoringEndAt: '2020-08-05 00:55:53',
                flowHash: 'ehmduqrs9l8ig8bij16mkvdjrrc27yymwdumx621',
                flowParty: '2gji7txpewxu0l7q8v86ne4ox1edj9w84dc8cyxn6n8lwuhya24z99lh5y827gft7jisfg186lm87gapmjhwtuz15mpvurqn7mnolz5tcp3xp31y0d3hl898xx482dudo2xcr1dd3j0hrp9ulta6pzzje1rdwe1n',
                flowComponent: 'k0tywzk4rjeos259rwy4r6y26towwtdlszooui2omevbqwfcddz6iimr7p5o03i1cwadv38s0no4r8p0vgx3xay9oq7v13tdex0pq39nqzfc17sjksuidfi3tqc0kjogwsdaacdcnc830p5lojoi6sd8y78klvpu',
                flowInterfaceName: 'g0fl495bkt6yab57o0geaflcsdbd2lbeup4g1ukmfb0p6zp43i22oy8y7yag3x0q5rb1p5k71damw66kso8lt4ji10d20m63b6mb1momb82un4r24i79shu5t4iyljie5f13gb5198e90akzy24z9piuqt3n4lae',
                flowInterfaceNamespace: 'wh7w34dz3uzg595knvtzjn89hnixtjw3sjmc2y1ddo1kkvsqpl2cljn13fwk02vcgkfgg59u16nftoihf52323xwzzxdrjal65s1zysd5dit7exkjarzzeeav25qp27ymalpkx0odoh5j91recrdz8a5c5378ahu',
                status: 'SUCCESS',
                detail: 'Quas eum dolor ut voluptatem aspernatur blanditiis sint vitae. Et quisquam qui alias quasi nam nihil animi consequatur. Et dolore earum harum aut et distinctio fuga fuga reiciendis. Blanditiis enim sapiente enim et ex assumenda.',
                example: '8dzf61cizrlcjybfm6locay5bg7wfxu8io04hvppsrtn1w3j4lf8vfvgtnvu97uwjofbfzokzvyurlbwwheuly0r52yy1odvlbx6c5yf990ij6oagui9c8g7xhvwp24a0sqr103ebim5ktg7a9zlijedifftv2gz',
                startTimeAt: '2020-08-04 17:50:52',
                direction: 'INBOUND',
                errorCategory: 'vbfmxbpm6rhdtz0vlkau049747xgchgoxb9q526raie4qruose4fhvtixdmiktrj650wsvxrehovr2nmr2o20mexfwn6ksrjv9m8ae70mqdaafhegx89nzmmz8at70y32soij51bc88hy6dwof8kq37e3biamsk8',
                errorCode: 'ddse1glhvlkjmqc6pgqtkv5ak5hxx8sfynumf3i2qt718dc702',
                errorLabel: 308042,
                node: 9425407870,
                protocol: 't93bpmuntlpglhvga4jz',
                qualityOfService: 'rixuub4rxqtwvjjpyfzo',
                receiverParty: 'cirteyp7p2sae7lokhwvuy1ii7vsqch5dp278v5qstt051mztonxvprohv8r0wbzv1c522l0ed1du5u0mepiwx4d9q0qyqejayz9othdtry18zdn6fgtklnrox0twlzq5t8tc1hfpa1dgtqbff4iyjir1m02rjr9',
                receiverComponent: 'lg754d0nzs2znnj1gvto9xzodlqlbph3c3cwm7hsxlie0musca8rl1chxd85b1ht8l2m2kc0lhblo2ollsnri2ued19bpnwmk5d8ln083pou2ysyxryn41clj1gtyomhd98ru3w0i7kmpfca90m72rmua1e7fsuy',
                receiverInterface: '21wb8rk44c3kj5qaj04eqwbrb2pgo8dl391s5oywimzrto40wobqzafqo4v4q2evwgprnzt6qvfkbuykkk49sm8a2upr0fpe5lfmhch2go5g8j9qrorljhbgs0yu9ylb9bmvzv1s6907a9296h6tj2bk8lvwt5zk',
                receiverInterfaceNamespace: '1cgbye92rp8lbkukb92myygc026bqv6fxulm4uzpbbtqr6qadz20rbh6excl163qh3js8i8b2xpgiiko5ero1lw9xbs6cf7guwix9uufaji0goihvx166oubu8u6q0g3t2ptblrmxpr9el7iozyr6h4yjytsmopo',
                retries: 7142461931,
                size: 4467528850,
                timesFailed: 73385077989,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'mufasyiufn4h387w1uygne0crhi8gn67el1fv5cl1iv4gly4o9',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'ar09sml3smrf4fdh7qqc',
                scenario: 'h77rshvqa2vni8dg4vr8sgys3nsxow3etw0rpmnjrv1vbden0apyc0y5guzl',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:41:47',
                executionMonitoringStartAt: '2020-08-04 22:14:27',
                executionMonitoringEndAt: '2020-08-05 06:02:46',
                flowHash: 'rmzm3uuimd9vj3ainr12vxq4fup63q81g8e7hr3e',
                flowParty: '6z2c5q17xjoyt23yj6bfpcncergwuquhoud458p7rmyooxf62rcezv02hjpszrfxz9e3uq2vlz14p2y1hmhm89n1odd6blwu3ch7gx7mt77vtemxpzsbxe1178z24pppi54pa777hgms0gd65irwqq5226erex1w',
                flowComponent: 'zsczjdykop7tv5822n5r3t31qcda4ctujr90xx0p38fcs120i1izvyumtd8jud6yllzfrgz4wuyqsufvuo0h8ujccxxd96webp1n3dgzoseooppn1o420x8okique3dn5gl8s14fk62vtctrq0dstf1ywyldzy7l',
                flowInterfaceName: 'cvx4xb2sv90e9koskq6avjcnmmm87tgaizbbtlbchsauq0l1q7m2hhgz9iuw9ur2xum6lhd8z11heei6rpwgsazhn6fox8053giy4w3umkipf2m9asfjwe9c5b7l78f20mdk2ltoyof2dnb92ybavhrpp87b4cfh',
                flowInterfaceNamespace: 'vxjntspks1kdkkiq3tddpjyma59zj0nbe57rf0zww21xnqs6hmr8w4gxedc56ygp6fzaa8trnoy79p662fob13tenxvcjewo9o0d60kagwbx8twog3jdh7iazlcfhypge4qkoomdmty9j1q46a1feisohkohp4td',
                status: 'HOLDING',
                detail: 'Quasi sit expedita soluta sit mollitia officiis. Sint voluptates dolorem. Nihil repellat perferendis quis rerum. Nihil vel quis quidem dignissimos quia debitis quidem dolor. Harum pariatur a eos voluptatem esse aliquam sint nihil. Qui numquam commodi sit voluptatem non aperiam eaque ut.',
                example: 'cfuj7pcs41wch7hag5kvrkp2faoqmbe95c0s9ky9msqbs60gbdjz0v0i80wdpp8sy8jas3utetequ9kqppkgekhw48v4vczzrml7bs9xwpwax3huflxbbmtxoo256iz7dccjy02q1kludtjdkgq0fkakr743ssjp',
                startTimeAt: '2020-08-04 11:18:35',
                direction: 'OUTBOUND',
                errorCategory: 'idgstd016hehgmkknbbqa7457ibawp7bihsihw82ojwt5biowmthceehi8oy3w52f3b1hdcxw0b8rcwi83e6ysordqa27t3y9mwc46xe64s2aqo8545deb4b40yzqjrg4udcwosnzw8c96z4989wp1o5cn1t5oww',
                errorCode: 'yaqe5ecm2qxsndoo781dzrvyumeizvvptyz9v348jfpi6ajrce',
                errorLabel: 696502,
                node: -9,
                protocol: 'xihf5myziu1641xmlaoy',
                qualityOfService: 'ik83i6n87bdienoyzm00',
                receiverParty: 'iorzbn91bsd9lxt1oxiesote1v6waa9xcmzdg96dl3s4r9tpao8ejak9ccm8nije98k4bg8pqa7kiomnp60zudgmhpsppecv43fl8m93qukqw8datl2gki3fzsjy7lrdd8mly13natj8yzh3hs2pj79bxuvsj5rc',
                receiverComponent: 'u6vveon69acvy0urcjmegola1bk94oi238ctode357jkmzxdfd1neud792nab6weks9v8z6v745lby2btspuhpf93g4p7m62ca2wijsu8lzykxt9m34c20hlnag79on1dr99pmi6d8r88dgp7jy56470oic3zocn',
                receiverInterface: '7hjawsaxyrktkd2ghvyk2z0x517mhrre9v3q4186iedruwx7tjahyrxnx2vk73tnbun8xl8mcik2iqh35ctr3gfj72h3vu7eef19oa36xsu1561xkdrrzldvppgmo3pj6x1ukksumick82sebrhvoz2wb4xnmm6v',
                receiverInterfaceNamespace: 'g12vwi3vx3wbjhsylv3843xf0uvazn0xyblz2ug6dfmgn3lb0xtihekt0st4w0ix4tafvfcwnqqpfx82d8j86djx8z66xvkq42o1gvm5wutddf4c9sk05vo0zgr9mdwvhmt12l1v60y7wyvc4wdtwym4ss528ozu',
                retries: 1201477959,
                size: 4931577430,
                timesFailed: 6290371878,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'cu5xoo9cn3boa4pu3nl00f8vxr60wvxtnq0myg3jgqbv9idjno',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '3nc48n38kl0o4btzl1yk',
                scenario: 'yay0thwj3et7g74ndylqrpkfrltozs49tzgvflr69qo12tkgd6i8hrr5sg3m',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:02:28',
                executionMonitoringStartAt: '2020-08-04 11:11:08',
                executionMonitoringEndAt: '2020-08-04 11:30:53',
                flowHash: 'xvulq2gczpqjzf7lcf9lm3oehsr7oru2kqn8onqm',
                flowParty: 'o7a9fkyugs9y7v0x4xp3b326wdjs2pwshd1pu32q1gxzuco9w3802ailt0xdxd69vio40eo6at6xco70mhwerwr9ijhcqgoujj6rin2hl1cbpsc18w6945a39jkjp9s7mf263r1y1jhpzj4rmn92y7wwl5b57v01',
                flowComponent: '121jv5ix0nelkahz16uzghip9e68spgb1sjq6c5gps3sfy8stj77jif3nk8zpz9x0fem14shdh7lg4in5gnif49c78bqqpxvqk5r4t9um0x6x6bchnjwm9ti60gw7hg7tcqqudsu07fusdn9rk5zexlrotqoaldr',
                flowInterfaceName: 'ery9bbtcka2t0bvc5cx5hyjois563xyydetfqlwb6rott97ve4226kv28du8a9oe7iwtei21ogdocukjubua9iunodmzzeh4lhwlurm7abivwqi5hw768vdhoswwki27r0ld763jfi5nczmyr622155ru9npwnoj',
                flowInterfaceNamespace: '02xmbt0x12qfwsdw1t3568af10hc1os9ab1a061s50cgcewyoljviv79xrjmtwr8y89dsijeilo7xh3olvxkblol0jn11slq2itkng6zktqbq78v71bz3k6w12nehy02ba3tvfhp2ifsks05o2m8v7xsg2vqulf4',
                status: 'HOLDING',
                detail: 'Eveniet consectetur accusamus occaecati et ad. Maxime autem laboriosam deserunt ullam non nam ut. Recusandae expedita quaerat sed.',
                example: 'bfa76nab00uqj0tnhfyn1js8fmvtkkml663taiysms4nskrjb3ermz3tjt3xrf0seqkvclxxj06jfs4tugy2jpqvroq0omc2f62qhzracvx6bpqb7yzi2y4t8kzlwmrx3uuo5w6pjcb621krnsej4ufkqyloi4tw',
                startTimeAt: '2020-08-04 17:41:59',
                direction: 'INBOUND',
                errorCategory: '0s4g8mph2cgqiqpemt1n3dvc3t77cx4ycwwh5po3v9wlh5qwrhfp9tn0jnis8q1e34boryg52odlv3m4whwb4wo2zs5ok2y78e7e19i4ykito4yglubru1b463lk3308smyxrnrgnzzzn7a2fr2moqifd8v23d7m',
                errorCode: 'uahhrc29g407rn5kk9w9xjnzlp1p1y7nexmkx5a4rb2xzewfrd',
                errorLabel: 670199,
                node: 5359885091,
                protocol: 'kiy1gqr7ztaxnygsukzr',
                qualityOfService: 'rqewtwku0vnuaxgl37ba',
                receiverParty: '4hzvhl09zlwxincglcop7gdteiku5xky0s1ba74quemcz95iqi2gv92mjnny8e8p5i4i1bm0y3piy22aw7pbxvbdt6kunyv6i11aglcww54jnu9qwd7zswdxztdsdl0oaollto45fsgw4msro5nl05rlbg3k23js',
                receiverComponent: '753jb50c81s9czrj8exidmm8ccpujlz24l1vv9p1mdgon4vrpcydgxf0weqg3fgy1nxa3oxxml6rpv4ezpuho3yc98btbpw6nflc18fd4wzvpddyls8pk1glmz8hb5wkcjo8j1v7akqb3a2wzso4osiy8ibx9msj',
                receiverInterface: '2wwi2yj4ez9eaj09ou7vm96p6hvja7e0nls344a4z18veb5sg2c1dfc7rf35lko8ug1tberu4oj40d41pd4xbb5jdnmkowq0yj6jg6lqz1ld7j4djpsr19mhif40wwhr2wz4ctt6qjrh4h1jds2cfxxuysg4j2am',
                receiverInterfaceNamespace: '59jfstv4zm7tdz7l9yqxxut57lo94xuz7t5yx5yv3b346or9qjdqv65meww4ngexty7joxk1yex96h2vohmtpp5snqwpay1iha2ncw6rxhsw85hxxoejws0h1bg0z0d0m0v2viegx6b65s1x9141yfh6lxuf39e1',
                retries: -9,
                size: 3304509593,
                timesFailed: 7240965595,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'vtw72hq6628ox5g38zzrof5tzeajplha9s8vbd26tk0g31uu34',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '7phzcaqqbrubj58kii4s',
                scenario: 'dbmrpaz9nv9t6viydpwwz7th1g14gtujvi39wjpnd9o7pdind6qfr2bdnj2p',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 22:59:10',
                executionMonitoringStartAt: '2020-08-04 12:53:21',
                executionMonitoringEndAt: '2020-08-05 06:36:18',
                flowHash: 'wngb5zqmqud57tcp5ctdj1qtpenp3xaargnrwipv',
                flowParty: '00c4yrwtifmu5zbcamnixova8vlo1iyg0pj6a6dubo4758i0w1j22kyn299qfnr1nfzjm7xtvjw2nkrm9htwezibf51mtl633hqb2rehkuugzgic1k52l14qs6sgmbo3wa0meet3krsppugctkum8b3g3yhr4r4y',
                flowComponent: '49ayl4kxatgtbzb2ie2xdz38a8ucip67e8bat4ghvy9znbcne2ixin9zcgf7mssvnoze79hk8vb3e4sp73st6hwcdupyljqjhu69g3r40poev2xla0dzo6ot835hm7fprn6kwhxz7w92jq0xd2w95z5w28zx7lam',
                flowInterfaceName: 'de18zqu4kcxlirpnj090cinzl9f079tygi5y9dyer4k5zalpwmp0grloqfjoe4wlcu4jea5483updup5gw1yp7xzdo54h6uu9rkswlccfsuvjznr77yyl0wrbhgj0qgzz90e4zdh9xare03aurpiekrn11f7ygru',
                flowInterfaceNamespace: 'u6o9keaicgz7f036uueh2igrlz73p1li3y8t81m8d5vxjipvyzwu4k77uol9zoong8jmntinn6lfw4i35xy82na3v6m8rbonsbmk97i0mjw7s14shk528t2zu0fnt7ld5je688b3z9plj199tbhrgmw4txt90iva',
                status: 'WAITING',
                detail: 'Est sed optio at recusandae cumque. Esse magnam rerum deleniti eum officiis laudantium asperiores et. Molestiae qui dolorem repellendus id quo amet sit voluptatem. Modi consequuntur quibusdam aut ea quam non debitis ut.',
                example: 'o25sn1k5dtpddiekxdbx5r2gdalbkz1i3z9e2oz320i1pl5gkn73oyignr08o04tpditj3eu8fs8u0gqiydow4ubjvpeh8wlmrorj7yg1okaz8ucc2evd56two7vug7k2wg9y1ecr0u4cpohah3s7p6az5rnt5pd',
                startTimeAt: '2020-08-04 10:46:08',
                direction: 'INBOUND',
                errorCategory: '9g6r5fpqc9qh6iz9dyxonr6hm8zlkdpkwgb9qop3yml0gs9ec05a4mwnyms0a1cwl0dyyexg2gasc9mnmo8y5n9ezl9baeywb4yfny1kywiratquvp0tza4141a92whw010d2n5n4t397k7qgtz68fm5oooc6j0j',
                errorCode: 'ztrafymi4guxcywqrdo3n8k2vgei4mulexepv49x7jnov6kxcc',
                errorLabel: 442340,
                node: 8122123901,
                protocol: 'sz0ee4969ac3cbv6p3e4',
                qualityOfService: '8e5laasgjo6npr6zr0pc',
                receiverParty: '5u3wf0qrt3zneifpsr67ldsm300kwdnbewg2xdiaz66kp02zb6o9b3lw0i979h46ik2dlacnos13jjdk7q7iso9gbpcn5kkezdlhsqv0bxzuzrtkl3z7ykuso6sr8krzvnqtjdkt1x4h72gbnl8fc6z2pylq842a',
                receiverComponent: 'kokpf07sp141gmybkzrw5gd8oc4rn8fjjwz63mr0y9nf9vh58j1r8p4omcutojskvripnb99h8sh19hkw6z52431g95xt1r08je9ccquwrmly0r1tj89cdvuvo0lvwldlglwgva77jtzxwcvqj53ksilj2ys6bqk',
                receiverInterface: 'sfscu66rt32700t9eyox11n1an2v8nxr21h2d3m78826ymzk47yxathfuqhh7q0xa3r2j0m5wcw1hg81zg7dstfhpv7av2p8e8ow95utqjdeie7bqz6hqz20kwxk2f7xf4c83dd6ye6tp02su76408nluw5rnbau',
                receiverInterfaceNamespace: '02c1zck7uzzadzew5zzxreozo9ncm8t606q999u3mo2fiz9hnlhcs5oi2ca9kzp8ymcmfjq9quorc1dvdn52si0ucqkn9uhnuz5tig0rhma910guy7ebbodajwsmyn4xl5tumzdtht6uyteof7ie3bnqy1hv44sl',
                retries: 4458742628,
                size: -9,
                timesFailed: 1355437365,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'hfcs2x9b08gipxcexfwdqpisym1moy3y61pr24u3kzl8hveoom',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'f9tcb7lvklbtnxryf1i3',
                scenario: 'pb4utnndcghu86240aiajuxyqn9vmlzg58t2m4crr87hd1nseejcsbxbsm1s',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:31:17',
                executionMonitoringStartAt: '2020-08-04 16:37:16',
                executionMonitoringEndAt: '2020-08-05 06:35:50',
                flowHash: 'r2uf3s0gq15fw6gm884qihzm4qyqu70vxdncko82',
                flowParty: 'azfdvlq50culsfymuxkl94id4dtffrzgblvunveksurzjpiby4m5vwii5tww57jdb1gmvb7ep97k2h9dsivio0tsoeastz8xtrtf69yni0nnr95t8u8afrt0tvp5ge7ul9p9addh48kw3zv18j99j7wisrbrivt1',
                flowComponent: 'vmf12obidxdo3cy7eahqw6dvxaod4aozgatd6nxg9uxkwq6teo39d4iohyifnh5004bs1yhqo7qb48z4v7dpci78o4w91bb54skf10w6b2mzj3vzbdde8xubxvkscbc90shfg52mpuxfstr9mfpol1672prvaj5t',
                flowInterfaceName: 'a0xdyjenkgob7opgtfut3oald3x86uzzvly1ejom2i9ipd9sh27krhqy5p7fw8puofol2knsodn3x8d4px7uy3np0nf9z58n95yi7ih6wqr1euf3k3j4m1i3ck988ksdwzi43d01qgb006drks4wa9emrwjrvjpa',
                flowInterfaceNamespace: 'xr9200ioc4kos0y3skj117qxa1jqhdjddargwtaw8uvggffkp7sa0ytw1u9vmhkartt1n1drm268za6960e2l974hmll397oq2md92qrifp94xcpav3ck6trv856w3mi8ebk0xyzjlrcqn1cpslmn12fp48zjjsk',
                status: 'TO_BE_DELIVERED',
                detail: 'At officiis sit. Officia aut aperiam. Modi voluptas et natus.',
                example: 'ilaz3pz82umm1r5c7o3p6s4f277s07icu2kpobgelh7opiwohtikigk57iecm3va7ehkhvl113jtgv5tce93eokk0rm52x6pm1fedn7ouqv0cu3y7jf0oxlj4kzpo9i6k7hpqma2t9ni39ofmgjw0qqg7u1pc77s',
                startTimeAt: '2020-08-04 11:06:06',
                direction: 'OUTBOUND',
                errorCategory: '2a2d9nxpilomivyhepy8vf01ah8imkhtttocesa82xvtyqo3diblpd7302bu290z0fkd6rikud3uv1sejk9c9966p2xlkfxor45umj0fr2kf41nnj15p21bqo8o1gjel0yoarybourdyho6a1cqw8rjwugfxulfj',
                errorCode: 'y3nrdwxyviityzyd2esgrk0e34vpjiblytqagv53zidoi5a2ev',
                errorLabel: 243650,
                node: 2482609739,
                protocol: '5vlzpz5t38qebwds9r11',
                qualityOfService: 'br305ri2vlifcka9vjre',
                receiverParty: 'tsyzjr8egool7l34uq3mftgk55obrdmav39orkqjf51583sikgimsmnw93fobkmr1n3i9zruxovkrrlshibzivf5vgkmntxbu8mcfi4mo60xwu6zxwndhcux62plxxdpokde0oxwmx1ungxj2daglfvujny14lve',
                receiverComponent: 'sj65kqj3kwrc5bt3gevnrogd7ghdy06i6hs2wxrxy2q5izfb53r8g398qygoi8spltv2ys5igk75vvs00e7in07f8lnslf40z2f3qij94oqbworg82wdxcck2qylloehji18pfm7khshajj9ioaswanay0xua0nk',
                receiverInterface: '6dq6lxy3ozu72a95j84dh27pp4jp56so7me03wy4hprz8lh4nj1gp2yol4bj448e2l1j743jnbltpswup5o6qfwzzoaoslk13cpdczd6s8mhof9piz5ccay7828pltw121robkmvcd1est84k3rocasw6qn1dlp4',
                receiverInterfaceNamespace: 'utyol2twrqhaco8mp6yeeh443myp1tcji8jqaa203tyv1nuluowwqu327zmnlxfkqaddbh05fo6gth7ia1cnwpn4g36mpkbexxyr7hovfw0fm94x6y287alqpkejnkavdf9w35vgfsfqdw16vwjteaf88aootc60',
                retries: 4978726038,
                size: 7943971582,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '9tfbcd1nxvu4o8owb3ffg6w9jowj8mmuvlz4supw3srw2cxif9',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'kafchckune9r10o0can5',
                scenario: 'kuoxvixy2sucsofaalt2dey26c0s7z48u8bp0jq6ye9zlzr9gphp6lkwowfe',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 09:37:14',
                executionMonitoringStartAt: '2020-08-05 07:35:01',
                executionMonitoringEndAt: '2020-08-05 02:49:26',
                flowHash: 'c1clu90ntj8gbvoo6xdwcafhw99jvg9pc6c4nnme',
                flowParty: 'if29cbgfuipz0ftt7f0074hqu0r6m8ihou7fxgnfwhsoa9renhtecckg5t8qwnr5qkywq94sjiuwv2jhn2dpov4im8kf9oqkeywa2ifj6862r0ny1r9ry0aw5bpoxqjmnve5htuh0okzcmjw8nzzuzruw6d15f41',
                flowComponent: '88sz8dkkoh58pff8g8j83829u7pbqw6eui2k24pnv7awxliylenkn894viea5jlxfjg093ab9lx7ocpzs6lgem5ac4s2keurrk0cbo1r1yf50kebxejlsqtjbae6fv62nlkdf5vnkfnn289q8wf9vdqsk88862sr',
                flowInterfaceName: 'cf6t5ctdb2ga6jjeuxyq9lqf1i3cd54eik42qglv4b6406692wn9owngla9i9bvyosmg2uyhdbuvpcfiymeulzr1ffcxeiefizhp3wu1l1sd2xwwcvybwnw0w0123x9wrwqlpqlnh5vkiw6fn2zk8ltd2d6k97jq',
                flowInterfaceNamespace: '8bhjimlf0vn4s2jnewlq1bvzsac822kltmtyu97zpx31n1xw4fpknjkfv5enyrlmk5man2qzawkciskmv3xl280d0l9y5n1ose8aodpoe0ifk6jvmcp8d9zf34is1gmzb6vi5zwncjpoi06bn4xm9mfrozvqkzw5',
                status: 'HOLDING',
                detail: 'Ut esse itaque ipsam rerum. Ut vero deleniti exercitationem non. Quo et voluptatem repellendus fugiat aut ullam. Animi deleniti sapiente quaerat necessitatibus.',
                example: 'cnfsyzvmbq0f3e9s1j8itkbk09h2kpuwf04heow4ad6xmolxwrkmr76hv7b9kl9o3lggwhqsold3q4nft73zi930pzzni8ekkrlgpy835fmw37ceib2oxb0o78m9tdicwm3qotibkaccq89400x5yf5m63p9zzxm',
                startTimeAt: '2020-08-05 03:31:56',
                direction: 'INBOUND',
                errorCategory: 'affbtrzsrnpx5ig8ibsif2iszrpulnzp87wib1n4vojhn3vrxvo9k91kcbjwpel2dfv3mfpifu1zjq7t9anxb5f5qp99vq5zerwohc1xvjywnubwaykunmf87689sadrm9pomealorvz418h9twxyqlhktkv0002',
                errorCode: 'eexcsc8et5f9hftq2ram25rceu4q85ml93vseizz8lvo5fsig2',
                errorLabel: 484327,
                node: 4228040601,
                protocol: 'jtfbergny4uxloy3dwfg',
                qualityOfService: '7wj6foowb9rd03g06iyc',
                receiverParty: '2anvbci9o9lgxsmzolymel8b9nq569d9hr11lmeade7wb7jugjoe7fzzge4sjoatxflgexvwp52s7piig2dp8yebkheim54cleatrwasxy2362auza3jb8yhohijzt0wcr8mow8izk1qtgrrvepz9ipcuhqeqzfd',
                receiverComponent: '74why5kg02qixa7lhxepgqkd9akpjnlsxes7menhaooow1r94ruhx85wvxaabe2xgm3gn7ew3cs8qnduyr09b2ulm91ey4v8wbh0bips5hrux2veom1k35fus1ohv9qnz5h76q890w4e5vubkoocer2x8vh86pui',
                receiverInterface: 'mihs83t2qmbshamohs34vzxtgjrrf6k9zw6zm2qo7ll33en1auwvscfe4s3z21ph1ga79ee5readkhhmz7zmybfj4vbkmk45hu630qn80oly7iuqq0zegwve82k8r40bqh8ao5wcwnoh8qquk63wc4lwf9cjp0x0',
                receiverInterfaceNamespace: '5rhtibimbok7u1bb26vgs6lj5c6zsin7jy8dj6ywsqbyyflnsmf9e9dflzfwi7qbpoc7q2ci9qdoqsuk82uv3z2fbto31rfw7eomdl6q2izg7g3sqftjy2pgyzk9eyz70napptw76twvyn1vr5b9bnpfvbmcqp07',
                retries: 1355431572,
                size: 9978413666,
                timesFailed: 5056900106,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'u2em2duiutub2pm5dno2bmtkp05yaic8tfehimvjp1d2zeccvo',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '5pexlbcdp6uej0x4xc7g',
                scenario: '61p7wqaptqpvdn6w7d29nggm7acc1pt07x7s8u2pua3md2a2e38m2x555w15',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:56:50',
                executionMonitoringStartAt: '2020-08-04 17:08:08',
                executionMonitoringEndAt: '2020-08-04 15:26:52',
                flowHash: '4lclbcwhi4ojjv8d9ygyecfskmj33hq8tuljvxz1',
                flowParty: 'ertyjxdj83bmcw222z6oswaomqmgegh1hz7l3dch0xl4cfj43mdax27l0jv6qelkaiv60jt9b3jcs9govzk19cw1wvebi1qu39el6zis4xmwf0231znwaj0ewkmkjn535yzvv0u4w8uvwe8hwj3ua63llvn8m7mj',
                flowComponent: '376cse1ax1gmvfkydtdzqkqxymb07lp3bt8q9qhmvwzf0fby5pkf6tis7sakz2lcbeeubbo8qxiqoddrd3shd903ryehu3nx0vmqveudhyu1jmnm51v40pdzj7bfapsec5vh2e9yabr72hssoite5rlsm3eel6u0',
                flowInterfaceName: 'cviwawiif8453hbaujvb9qfeir14p0rf4pammsyam0ae75lujerllz559iyk7lymkfn7fmi2o50c6z6gk47yloaplrvuyppkz2fecx8zjzwiis5ohly4r5eekgvxdd9q2pi59ex0csrr5d396dm2bunp9y2gabol',
                flowInterfaceNamespace: 'jbg76q2x91txdm6xdgttcd8qeanuanehtleiilgh1wl97ze4xyivvuf5i5hq2gi71gi5siaofq61pk0en7okaxddofh547y7oz6msbeonujao0rlutefxxw7r6bltfg12wwae004w06al301a7scwuocv3p79v74',
                status: 'XXXX',
                detail: 'Quo consequatur quaerat accusantium eveniet quibusdam illum. Sint deserunt autem est qui labore molestiae dolor iure ullam. Non quidem cumque cum.',
                example: 'kkddu68rbsdexl4op8il71kh9ynvjrldh0o12lzviq5ugzc2sdb4ni70ra8mywzv954dtdbbeavggbutzjxdsebl28rl74yk0777vvg9eu9segh7792hpr9reasfkmsvz5pojznewu77swn1ivcfcwcjkme4he83',
                startTimeAt: '2020-08-04 23:23:06',
                direction: 'INBOUND',
                errorCategory: '79rxl28ejf54imf1ihgpte7ahw5v42opaja6aes4dc2g8dsncd5griargr4c0m773esysja7pd2w43tzd61bnw2ek33hj4r8ifg5uxqea57vmbeqkzzgimyv0uvntbvym3lypvhr64w0ml43wletiggnnzk0me2i',
                errorCode: 'bs545iqwxtlfe1qfo1otbitnl5gx6lenad3pccbztwhzrfrz02',
                errorLabel: 873653,
                node: 3575791036,
                protocol: 'vq75ac417p9iz5ui99aq',
                qualityOfService: 'u1mj8yckoo4bms41bo61',
                receiverParty: 'qu9jhsfljg1qdrcea7wj86ytfbm0lvfcngjkjqj1wu41pircdnihvt40hvw4ssbf913ucecvcsw73z59imjzwbjb54k6tikj3nef0lfpe8e1j54zbu7420odiyepziamfhwzzdh07dwcjri2s7evk7fdazhtfri2',
                receiverComponent: 'dqym8nxja1k5w3xbqa6n6medwplqa0w3sm2lwi3zhnb6ht81efkedef88nd2ontvx8s75h77sprregj3dy3jmuqkhincknz7l8o2y9k4xktw921qls4d88nhchru9ebkt6zvb0nbg0m667cg0nbydrbudhb32o52',
                receiverInterface: 'k1e7yiavwexy5h6qoyq8zeg1i35eg2hn9wok2tq3te55ui18h1zjmahkiau4rg6qwr8x6o4pcjyn4yosdn4jvdnolgrykswuur17ndvh2ktffq84auatsgfbwcaz64jp5cjkzlnazgn5uwrv2zq5gzqp976d93gk',
                receiverInterfaceNamespace: 'mwcnivgzxiwkd72l8fmwu75ygpany1wf2du3tv7l9k7ig3byebyj8lqk4xerxusy6d5fnefyc9uaxfoaxueegqmnsyt8twe2pzl0rzlx5vxkh2auvnc0z0srwmxttak3edn9wgq37x7u1q0jbbfumutw08542mwa',
                retries: 9543106507,
                size: 7472622046,
                timesFailed: 3387133874,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'gjd0oepu0of1qvsd9f3a18f7ok6x23k7lvc51m8ymu3eq5ir07',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'biw63hp2q152rye3qbnw',
                scenario: 'ijxbngtsqsgxsailgmlvzctz97nnvpcyhyvld54a0nuoucq23qhs9b1gnodd',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:31:28',
                executionMonitoringStartAt: '2020-08-04 09:23:11',
                executionMonitoringEndAt: '2020-08-04 23:45:43',
                flowHash: 'korv822eid5qnwrf2zu2e61koudxah3ht3j319md',
                flowParty: '6em46xkmmplui3bqkkdig8lw4vlgf7u7mc6udlh1wte55lfonm4lmcv3b1zlrnyuskp4ewkt0yevec45smvzueq60pej2quclamrffg8vyb4vn6lg8td7s988lmumtzs2yojmmagxgt7xgpwa41cpkmft1m64c4t',
                flowComponent: 'cwm24hjbt14sla4ujqai2ephk0kv2tbpemko3kckbp2s0v32lr6surontkwcvi799zv1e01rnpd2cyvr61gvo52ltyzbd79r6txpiev0e8thvfm02cny0b675bnufr34x3e8ye4c02flt8j8uiul5aifetile59v',
                flowInterfaceName: '4jb8wn2rwti5m3ohcta1lnzz0te7m8baxs01n96zcirs6wfkv6ghooxhmqs7tczysdqyg1dt5m417ixk1vcfl44c7efemcxcyemri2gh4gp5d27hqg9vwo6lcv7b26wv3wmwqljkvhoj6p57f375ox7vf0l55xca',
                flowInterfaceNamespace: 'dfnssaqyzidv7vwpfy2fgscx3rlhp5r2qyz050s8pr436oyvfbnooti4vboifxj0njg6p5o1c385u3c6kmlz7g4t3kedlggp2ab5wc5za2ko9l3ptkhk7wusdy1eo9uf3hh9o0m5kngr8jo763aje7u7wnow9j3v',
                status: 'SUCCESS',
                detail: 'Ratione provident asperiores non. Non placeat commodi occaecati nihil neque. Qui esse et aut. Velit rerum aliquid et nisi et iste nisi. Et maxime est sint explicabo aut.',
                example: 'uufehkw76filxc264bjeov9aguozvuc5kxotcgl04815blcnwnuceolvpc1l0wimhg9o06hyxw8xmrfsz294lg05bdur7yes417rn9lnqrvx0f8qib424h3ujtzo6qek2mbpt6huyfqvaiyxrb4fw44uh3ai0mvq',
                startTimeAt: '2020-08-05 02:46:36',
                direction: 'XXXX',
                errorCategory: 'y8sq7rl2jscjusng4g3y2bmwehwiut25tcnrk2limcrqi8mnaa724v2giudyta7b6g94x6r9qbop54dd00fleoa95p7dsryq8j6j1gcat7u8oooyg5omzerv6ucberynx5vjq4u8fhwxo37d1b2scgpj2alp6grw',
                errorCode: 'f1pfpouezkkvet1qz7cx7xi0ep4xwxz6k9oab8yxfboty13z93',
                errorLabel: 889522,
                node: 5048297875,
                protocol: '4g0j2vm2syljdh8c5cyb',
                qualityOfService: '9dan70qe3ovzce42i2w4',
                receiverParty: '18om9d2kycr0fjc5ueviddfzbcly4s7azstwenpxa7fqja4xno7b1twux2f7tycmn5ni05s26e0y8ay3srkqminhptkll6jsmm0c2yi8a3onkncjhb5iroh0tfpldxex41by9o349ew9bvu316fzknog1h884214',
                receiverComponent: 'dqnaxib4zhbtmgzoa05qukinwo0rh6t5rxmlia8h8gmmu96iai8xhprz9n7l0b7ql0qtpuo414igh55uox7394jargn7hko7ry2slnwoc4j4xaoruocvao65tdzernx7althzg7i1854dhb0scdavu0lzer0ocq3',
                receiverInterface: 'aw4f5zejdxwgc88qp09nv4zh3b3e6lt0qb5iehotkjrfjye70ghmikjh54osghwhxqpjfbb7m9y0e6kxksqoglhju4s2nlezjslwzk0wrt2632rdtmd788jts1yejgvws6yvc0d34911frtx6dwav4woj3t0aws2',
                receiverInterfaceNamespace: '11usmtz1ppbsnr3nimkp8fv1wi4w5f3iyzuvtyvjpa9ekpthb8cq55xdup596h5llhkir9nywbev22xty4tnsi8yygfvhq5t7igmo823nia8zfldufrm0r9pbig9oo4xruh6k2o35nlt5j0akxlngu8rn3g52623',
                retries: 2229898719,
                size: 3975776814,
                timesFailed: 3890154395,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'q1onnctssplconehokl8rg9rjpprh5x3515ygv6u42ja4kf6p2',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'sm80t9ozld4llzjjpi3k',
                scenario: 't6d3ne6verkskaf9sfa0v182d2pv0ux62ai0ldhzki66btprifrkn9dz0ony',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-05 06:06:31',
                executionMonitoringEndAt: '2020-08-04 13:55:36',
                flowHash: 'wk8j76fx46pyipke5yeaeimqe4zkh76ntnnbstw9',
                flowParty: 'r1scucoz3mn7o8mlolta9iro7b1swodhiogc4dk0fyluewx87hg6rbjyn8r6w5wo74rzga4rgqk65vzpjnabe3hw7ds5zoyhl0j6zu6vow3kb2blff7u9kmzxwtxcqjjpd8nmba0zb08q9kkp1px0fffxmccngnn',
                flowComponent: 'l31jdkao7yiv93om631qxpvqv6ytxiguo0w0x5ljyi73mfiaccxzwoks9doixrz0hs8ohvh170hg979y24tmcwikf8ip8fr03zw11x8r0t0yna0bf5llj7d71z8dnr2uvs0u7m6ntjrv1sfgiz3654en1xpvmdem',
                flowInterfaceName: 'mlir94huy83p8tetx7e6w0t25754uknz96x4o9z7y3ivnq4bv1j3h7o57ai5p954df5donutczlqqwryp3w20wdhd7aamic1mc9ydb8iihvdfk4dttjs8ha2usqnp3byd6oqu3bjnuigqjxsb5pht7u0rxr5pm59',
                flowInterfaceNamespace: '2iem7ux128dsuxm2mhiqsgm0nz0ytij9nrjfpoe2n3fr272vo07kwjbb1qdijprevu8dcarj447mandnvxb5lgo2aeu61lovdf5obasuzntj3ocaaqzpw9m38je5ltsf94ddfufnjwzrtugwt350gp9r27qnuj61',
                status: 'CANCELLED',
                detail: 'Assumenda quasi sit officiis omnis rerum et deserunt. In eos officia. Soluta nihil culpa recusandae ea mollitia et quod ea iusto.',
                example: 'rdbpwctq9dna95ep0on2f1e9w6x4kutaoy3b900hf4x4r74uovag7txonkyv0o0l8yxo3mm0y81qyjo5pk1hhhqavv5ala46h0zl62ypdwzfbwvgg44ifpdlbt7t5p1148pnz3rtzs9u2zastm6we3i510l6p5tv',
                startTimeAt: '2020-08-04 19:11:55',
                direction: 'INBOUND',
                errorCategory: '18f2x0yv6qrhh16vc2gwxi6tmgbfmp09z1nwm9btn0k4o2kofx8921uzp9ps0l49my6jp9zpgdi3wwqhg0a5j24tojsxxnyrbztkdkrr8ur7q2xpabi11p8cyphkbg7hcs62tqktq6ab16zh78tl41zmmkba6moj',
                errorCode: 'uvged6v4c0l3i3o7x99abh6ui5ge1s9bovvy88c4eyhwnddy8z',
                errorLabel: 510225,
                node: 1884035149,
                protocol: 'gwtjzqv4knr7p88ja1lw',
                qualityOfService: 'xfwkm47zzqbbbsvhh3x2',
                receiverParty: 'fapyimquwo6tvxr68xr1138chonxes4movtqs2txda8caw4e02fcgdqfe3w1lewmsrltrs66zt5a31wmx2gzs9j7tj3df73ytpn6qe3pvr7d134nefzwsuhntzr5ftkoh73n5g7e3ue7cwgc1hf7z3whbi48u0nt',
                receiverComponent: 'bkov78x5cjjepxegxa383tj4vhkydcquib7rwoizjmx5otaia53bw18bjku8tz4x3cw0cmkxjyqk6ip2elchlmwfscqh4zcq12ftr9lffxft079x32p7hknbk9fn501n6wncm7epnb8gjzf0hn3wvqy3hnqsvuzf',
                receiverInterface: 'k1y0tptjs4fu5i1on8agn57a9iijj6g6at0mersqm7viu2k9qybveprqeac971v01ohp0ur3oyhg7dm2q6klhljpjsecvbvhnvkljttusqnuef2gvlsp6zkld33die437t66d3vip25kr1g3lr64oln46ewkgp98',
                receiverInterfaceNamespace: 'dnwovtt8zhyr12ds8auxugpjatqfrl2ag6u4yv9q8z6l8mtxkguz897tf0q81m9kxk8iqlhcin9pyb9rzfp1q6f9jy7s4fiff395qzsy2hxamrgh81avawzihi9ct1y1dof5b3tbdosfdcrdo86ej9jhto8yl5gd',
                retries: 8042172649,
                size: 2774242518,
                timesFailed: 5384033647,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: '4mhybmsh7ey8l5ap2hhkktzfz1zh0ag5ndyfyxivmjcdbwggln',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'af2k1haeh3yowu4pq012',
                scenario: 'uq8h7twhxybsvib0ro39yk1h8ryk7hox0vf1k515uacdspa6rg0e2f5ms8se',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:27:41',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-05 03:33:41',
                flowHash: 'ezv8dawd7hs2i0ee82eg39zxznnv04q8l3wz6raj',
                flowParty: 'uo4rzkaunjg8mhwzucoqkytuh7c83w0gpi9z2nnln1e02vzdo7xd0i6zlr88brh99yxq65fdyxr70jdza213bvt1z1trs61r372j9u9ma4auj45sbm7vixk5aef2vrk4df4zz92w9iwr8iafmtbrejkx2ou0m7mx',
                flowComponent: '3cquwyqi2f63hwqb2d3ynw5d8q4jp5ghyaa06x148dt5ecvrd80wlgnh8jyb2tlco4p3k4s3ompylwwr5n1fj8upb0ev1wpbntl0dgyirpjfngshs7tk7b9gt6s236ftdvp9r1f7n3zhdj13f1e42r3czx8j20ph',
                flowInterfaceName: 'rlaa6nncnz2jq16vybrk4u49fd34n698yl6j8fcfzhab8t7jdlm75x2xvkb8eigk27sqx4vbh2hllvkziba3uotj02omekg4spqxheemvrcldb19t7rfz4y2gie5inpa63mp5u3l30wgdaudxehhbu5jbfi3kqce',
                flowInterfaceNamespace: 'ng20192k4iqf7uw227vumzq15qv0wvudlba2hnmzgbl844y00r6gwfo7xn8z1cjsc6bh1r2fs3oor4maeogswd8gtkob3xs38ch2b2lrxncmvmtiq39r6wspeo4ep82gm2jsyfzmbi9sj5lok341pggd2v2cj1ln',
                status: 'CANCELLED',
                detail: 'Ab ipsum ut enim et qui quia. Esse nihil iste eligendi quod qui delectus. Alias officiis magnam. Molestiae ut iusto illum. Enim molestiae fugiat rerum possimus aut rerum omnis. Ut ex possimus dolor labore pariatur debitis totam voluptatibus vel.',
                example: '3t0i31db06h5a373qucqbmd7nbx7gfl5s6jdwkssjmtcbr40gxzp6km0i0auuks656cyturygyn3owtpx28t1nzx1kugl5jpaj69miqenr0oz4h7fc0oxm3v00ma1fuy28tcu8cd0e2cdrsgc3bqj06o62cfrkls',
                startTimeAt: '2020-08-04 14:23:44',
                direction: 'INBOUND',
                errorCategory: 'dwhxovb7nfdtexr124nk7ge2zk0plung80i9zrvpl0qce112s50o364qpiz79mnnfanr6cpdan18dtslohb4jcip1lzquvukrvaf9d2xjy7r9rlegic0xn1bbfi1jr9zgln2ex75zzyc0o63yckoxanp7unk07dj',
                errorCode: 'sgmmogyjwg115lk1u34t449p78eyloatfww7ocb0tu7o51q0u4',
                errorLabel: 155382,
                node: 6400054400,
                protocol: '4q0xctre4uyyfyikdcty',
                qualityOfService: '4exsyd0stn9gr4o4juj2',
                receiverParty: '282g0fb7xgxguqnzxhnsh8v95ljzu96lcvhgeo0cd3b4hzi6cls6gshd8aoia4i1aba3997u9r33vm45k5w6rrveyjgtkmwnhoxkc9838fozd1czax2kvwmxd1ov5udxufcl7z12k62fihzrbb7ont9ao3c7py5m',
                receiverComponent: 'i1w9k421aaiq730juos8b0wpyuzvvuei40vxnevvueuk5dthbpck2v6ou8skt1ezxh31fsnmnwiooxrm0073sa4nbw6u93zmi45b64qn05nsxy2e46zynxdovpehwnmgm2hcjrndzujfs8rio9mgzkghm87qzf4w',
                receiverInterface: '55xiscezn2lqbk7aqnhpwnfijve17yftytsqukmqsvzlcfrs56971mpj9z5hel25ccd7uscq31ipnof3sf6dfe1g6baipslbxq5os83p3hvujbr0hfwuy7u25lp1nqtjrd6ri6znsl2w2ojxymyr9v9u7y3j0n3v',
                receiverInterfaceNamespace: 's4seizgniw8kt0qvwy86242he113zzoog68ywx4qt0l566ihr6umoyktzj2hyy455wydlif4lm8m75arrfl44yrnhmlhx4ffs9ko2rij9ygqg6mo8ek17vrulw8of3h2bh2cua813lgro1ped6xsqq3aeiywu1hd',
                retries: 3083873282,
                size: 6871710682,
                timesFailed: 9855952935,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'n9qommcr2zgtfxeh1uvs4ytl3w51mpuqy3fftb0p087y4vqkb5',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'zow47n7gnyj8vb4xzi2g',
                scenario: 'usnf1a2grjcdir0fepf7ypxhski24616sdv0ytv7kpjlhycvwv8626zdqknr',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:36:05',
                executionMonitoringStartAt: '2020-08-04 23:47:30',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'r4l29ythde6pqo3ezmztffr5g37284w1s8vk375k',
                flowParty: 'cqqcib98c8xltr5viye31re80ip0bib7ehy7zse4m8zcw8bkl0usfdvnlmuah1mzqas1it680i1kqrcm6wrnn96crgj1a53qw8vs1pbou2vqaam3dxez1z7t2ap5zhgom5v7qg9lxf4aqljwectsxwh0zq6epxpz',
                flowComponent: 'bdnbjxjq577cg5w829x8h3oq0e3fv9u5ptrdf3web6a0zkk3vhmsz72pxx8ndnjylixga2d4tfsuyfkto9l7992bx1zbdz6ss6552euyhgdu6c5c0uxr59ptw8fk9rpk4ndsnepqjouyp9zl35p7oerue0yl2rpm',
                flowInterfaceName: 'i4aqkdkufhdylv36yawrytx2e1euwwxjiv1z9bm452vdso6sf9kn3hwg8pzjxdm8m2u252nxuzr6l7zc6th8ps7c8rzvsk4k5sfrxc0w33cl4lsh551a35moouofazg7qil8hizrp5jn162a420kkemix1p8ybg0',
                flowInterfaceNamespace: 'yfk76l4e964jp3kiwg092w1ruf2akri5p5huvjv5clzhsuymp2np4kewxlcnmem4xn64d7wmjy5zcrmt60keqi4vi4c96dvbtasasqgr8o7kactmc0ntq9ywjpes4yrbxj15uj0i6lqi3mewu2nrf4arvzknnctd',
                status: 'CANCELLED',
                detail: 'Occaecati consequatur repudiandae consequatur possimus id vero nihil architecto. Eveniet sit nobis suscipit nulla ea id similique itaque odit. Aut eligendi itaque aliquam dolores. Quae distinctio repudiandae incidunt repellat voluptas dolorum consequuntur aperiam placeat.',
                example: 'tqprqn8tob7ryzpeb1xm58jroi2wouqrp6shfpl23e5vzf7bjioiczf4u3dzrv6yqitgry7r3gfb20xvq2wt2mhihvhkpjohjow9e9pd7ljm9d7fgbcl1ciurlp8ai96yhy65mlr17rkh4aa78wbjwud5yf9u7ez',
                startTimeAt: '2020-08-04 21:37:51',
                direction: 'OUTBOUND',
                errorCategory: 'sih84cp82sl3xqr6c7memo86qyd9ighdpht1u6kj146p2y1z52j9skwsti0fstt8i6uaw4b7b8fuaod9qxfb8wl8zg2szcroz28ua9gma1hez79d09bzkmyzssuh72ljzdfqdzopn88axwykx3dhit2nqxp79m7f',
                errorCode: 'l1mon87rpnq3ko4lydsnup1dyxw4e883355qr63zek41wkf3o1',
                errorLabel: 165533,
                node: 3876863576,
                protocol: 'hyjfjia72r14595hiv1d',
                qualityOfService: '2yb3cqss44aewp2twif2',
                receiverParty: 'iqmeg60kei79wkr9041u6zcj7tw0vvnf649bhk34eahfnow3tb67hj4dc557aqwu474dm4a5ncn2try9cbyf0eqrde4nd84wnf21ciiok9a9jp7ya6h997ywwfd2jxowdck7mg24aam4h62pje5ljdzdgisob5ce',
                receiverComponent: 'pwhik0xska90v8o942brmllocc9ygw92t8onk8rv7pzdhy4gosogv8c5amlrarltanunzdrsbjqfohjg9xpcd9thagtn9dc5333nyzil916xq7rvws3986yuat9jesangbdkqhzcuuz9e7bsriqvrwpz1yhpk97m',
                receiverInterface: 'lp9x2pe5emc21j22s9jd91cs5gv7jhk5iy3i85wbkxfjo46saltek76w39q48lycwv01dm9t2grswbt095e9do6l89k37ioyrrocmznlaeeb3ayf52m0se19p501275q53nuoz641d6l1bjja25clbix3z7y1rya',
                receiverInterfaceNamespace: 'cpot0mcruwfafsl45qgn6xoagzwtcdrhv53pmj3hn3mudn0e2outuvaflyaxjgwwsnb9oqz02mr5s77c8c102ehdjjjq1dd81g35sxpk8z4oiou4n5i906k91qoog1edjkgv4o5i055s1vc2lx3kl9u0no9pe1n7',
                retries: 3253629579,
                size: 8767369176,
                timesFailed: 2643219622,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'jocpmtrh18wgihj22qokmybj69ivpzqgz2qa9enzurkzmqoy3x',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'tt9svunzffl57qvqbxn1',
                scenario: 'w9h5c5gljo8eipblojbc2tanwtzfklwktrwr4xp3zzgupmawousfd201lj3a',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 07:44:11',
                executionMonitoringStartAt: '2020-08-04 19:17:49',
                executionMonitoringEndAt: '2020-08-04 22:45:16',
                flowHash: '64uzvgx0ah5uu9awubiehbj6rlwyzm5teg3h2bw8',
                flowParty: 'pl89snwdzc50hd0dyepqfpql49ytc0pr89c7845h5vl2q7sq33ma8b70kbra1x4q9r6u92y620g8zaymtnrozkfy1loeqicsvdl51pk2uu6f4hfqlkun2bdxodgdo6q83tos3869v1di0rcmude19dhe5ro3xybk',
                flowComponent: 'n99fd7hgw3juq0s1lblwee0jagjys93vyiep3q1drsy25zk3xlqtcwyadrx7yhck1gqjpta3zaoshd6vnd2p4rh2evoygxm9ycez4d8u3b3qczw4er4kqimd4tufi70snmrrndm3ap5t5rj58j8sinsh2oko46wr',
                flowInterfaceName: 'k8ueh9a918empdejaf24ma7b4u1xrvsw061agr2ii44occzta1ozzj7g5ecl336blmm59gy926tvvr5zv2240ztpdephybgbrsh9s93qui2eocz51kri436ym6holdkd5gnqxbix5ir89zouel16hq5cvf3afwj1',
                flowInterfaceNamespace: '4wuuqa64lyoyguc1zerwnzq4by3eiqa6l0d1d6pcq2hw2og21bcekb8n0e81mx4qlc2zlbrf51al6avof03cnpkoy0954mnb1plhlmr8otydtnhqjqqv53xq8irgt4g2nnaoh27d21dme718ecxjz2nwv2l9gt7v',
                status: 'CANCELLED',
                detail: 'Omnis enim impedit placeat qui voluptatem incidunt. Illo rerum sed. Sequi consequatur numquam sed. Officiis consectetur id soluta sequi voluptas. Consequatur minus earum debitis velit numquam possimus ipsum. Dolorem esse tempora veniam similique non a voluptatem laborum quasi.',
                example: 'z5mbvv3asfrcr29brnal71gxr4nlwtncixug73on5g29c4kp8oyy5dt877m5u3sgrokb7swpw1xr3xvrochpl0sazcwvsv9752ob9e981rehw6vn3otg5rkjjquhsaxe8yti1d36p985h240nesbvogkr4doh99s',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'gf8l11kkr3ju6ygzz733qsqb5awudibp69t1xzyrw2rgdjndkoxrporn13degh6ouxswzfy9xnudc98meiwqo8re32zvczasmr8pu5v7hcrd5tjxph6g17treuofrbd3p8iwfcsxkhbp61aqxft547ytwkpjqmnl',
                errorCode: 'ppcf0bd90ji9p1wf5cx4n7d516gcv2dmwkq34s0eknm3chigi0',
                errorLabel: 319931,
                node: 8787627498,
                protocol: 'hm47as4j9df6c8ykfhc7',
                qualityOfService: '182ap4ti8irzlua0rzsx',
                receiverParty: 'q4ia5y03l40amqda33v4e6cs7o9s53lmvzkr81i43toi6g6vty1tsoe0kmlmom6bpceog9mo75fr0l1p13d45a3ynxyhp3vqo6iopq8yy4xxykmq8v9xvsqyghrovulmjadkto91khv180cxd64aax0y0g5htqas',
                receiverComponent: 'f79krj6kemlnuqqdcv3i1z08ac1k45z2kxxea5ew7xj37bhx62w5d2mg15ywry4ncn9z34n756p3apn5vfoq0i3jl88evsibovl2jxsrafmmmx4wwdd3887muxy3yoy4p8fjn1onoocnkb8hxtwi04q5q6icwg5s',
                receiverInterface: 'xl15irfat1k53bfbj844xbzon5tamm0yky5uyj22yrht3ye7ji0m5rnvatekbmu2bn7st15qu7fxa5c7a6crslua0qf5t6z3f9tdzhvatg151l41kf88tslhd6cpqrj3sit4jxu4xs9g6yse511xeb2sai5fxuj0',
                receiverInterfaceNamespace: '5r8el7m67vpf8p846v30nt1k5rcl545cyfh0sh8uekr3isk9nkd1vy1f4t5p594xh4zgsyjv9eemcigojzukndbcbpdkosjymwph8ad5bhthwxcr4vhmr0e05c7t1lpbsbbzucq8xxzvi6wq0d30qgkq3kk6awif',
                retries: 7546813385,
                size: 1078187891,
                timesFailed: 1589407555,
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
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'irltmqt3vf6oj9lua1vc9n4p0exm3z13tojxo1g5fo0s2xtm1a',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: '6c0uhrdk2h7kravc9ld1',
                scenario: 'f7panatoex80p50bogp7rwkjk4y14kaxjvk2umiu4v66je0ew4dbpyelntoe',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:52:33',
                executionMonitoringStartAt: '2020-08-04 23:50:50',
                executionMonitoringEndAt: '2020-08-04 13:01:48',
                flowHash: 't11qbc0hmkylgz9bf01tn0ave2ic2sge2gnumqx7',
                flowParty: 'ukokdj306qg7rbcmsy1wzynlex52ixg2w4zep5fevyov0fc23seaaxag3er48gc4ymcamoojinbx4ydf3k93xt9q97men9ugj674pscut9ikwwfxflrr4lak9z5c4zynd21s0qbfwfyj50nsogr1mop887f7v4ob',
                flowComponent: 'nb03o06oxsfhdszeof9tw919sepcw6j0qb26pyd8h5s6fkq2rzeenwl7etwg0x6ibugwbkacgndnqyvcca0agnudm5qgj4hvo9j98xpvr06rlt0qil4qfzqzzgnke3vkmbojlo3libyi51bb099xzzqudcgdoif2',
                flowInterfaceName: '1n1mk937rym41g6a4bs6935hnfgvksqni10ma3ov4mayovqgu1vt4tn97yki4achb7omj0f26gwldfl8d03ceipdr21h5ti2n2waxdh6x0ftl2n0kq7ya0sjq8ethzqw2cyqy3ht95sbaikf0fbuvxdxbi5gj56q',
                flowInterfaceNamespace: 'pv5g1fnn83qq7f2b7xlad7f0733c9qu0mo6jx8re4eembyschezblkmkeg3q8u98jrz3m1xjd87x36683eicbmhyvebohbggpcbz1d0xjsk8tmd04c4hafrob0rpt1t1yye16kl0mxnib752kcd4xyvs00tv40ie',
                status: 'DELIVERING',
                detail: 'Pariatur nam natus nesciunt quod et ipsum dolorem autem atque. Architecto atque aut aperiam. Et eos soluta delectus cum perferendis.',
                example: '7t4y7g76oem4qrbuqn2lsejsfb5foklqh689fe04f6p1jttdjy2zt24r4qhua5eh8mcjl7moj7u60hfgzbgh1fsn14svq1ztnalcr2h4jcfi3fti4g9k35uwrjn1aocp7inqqgbrw3vhh0k0f0k04kj0ij2dwsc1',
                startTimeAt: '2020-08-04 15:42:33',
                direction: 'INBOUND',
                errorCategory: '8oyc3bh6ghb175hez6pxz7e570jxbhwp3267h3jduhopnai1hozblagj2fdaw8rv290dehhqeb972opr38nnwz11bpztwmbn2sgkax1jc7fskg27dau9f4gh72wnodh5flwt04bbqayfcrgwxsmqgrr7mg72zyt3',
                errorCode: 'fp7j8iglgxfem1x1204m8xnxr93jhcsgzur50e1xwyo711ujis',
                errorLabel: 824977,
                node: 7712640063,
                protocol: '2jci4ihrym3ow1ohibtk',
                qualityOfService: '7ayqbwwoo2f5bc3f4puv',
                receiverParty: 'qp5f1fnpzxv4gd64wzvlpjljyyblswn3ibr1mqy6t5ozdyo423owj13q17gcb784tg9hhjgeiihycnyzmxf6eg4ewg7fsd2ch42n4qu05pbfvbycjy53qiyb9lj912y1unmb07iisjnpx2xbi3451hp3rdnvpk5o',
                receiverComponent: 'off4tt6darmrymco82o0n2smfrtt31kx4pyh9e5kkzfrot912b5tj8zfapt194hgto2q1v3ac9iiov6c0hlv59yepky42evduljeicsvsioeztdw55w018i587xsw240n39n2uqgyh5jqvlxnc3bx4vxc8ghao1g',
                receiverInterface: 'e9hwpjahaatpby434z7u79at0meulwn10mlfxaf6p8ctp9iu6gl3f7yrglzpdfjxria7517bxa89eg9n96ds89c01tutlauxdukadxviobqydpc6elhfx6yj2db63lpk0849lme6r8y8fpht0a6h2v0tqjebjybk',
                receiverInterfaceNamespace: 'emxc1c5me7nv9tcjvschiai1m9sz54zsaaesxlaco4t1ts2bzix34v602hwbk3crz6jooccpuhpy5be6xgzym5vp5q9xcsmwyys6q0t5gyozxwatk93o1ssy8pyg2a7000lp7vnd0pol03276c0hgwcmpw5tmnko',
                retries: 8947395582,
                size: 4579983235,
                timesFailed: 3280799031,
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
                        value   : '2c5c8231-f608-406b-8304-b7c75c8e5da2'
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
                        value   : 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e57c96ab-d835-46a5-8e04-ec1206e434bd'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/ea210136-ddc1-410c-9486-8a6b32573563')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/e57c96ab-d835-46a5-8e04-ec1206e434bd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e57c96ab-d835-46a5-8e04-ec1206e434bd'));
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
                
                id: 'a6c48403-ad7c-499c-adb8-f367ce3c7ee7',
                tenantId: 'c30820a3-611a-418d-992c-12dfaafc152a',
                tenantCode: 'ng3zrhoeoko64pa871qp7mau9ufron9vvec6uj1st0ft8l3suu',
                systemId: '5d2bb0d6-768e-4e7d-aa37-b5d5b1535fa1',
                systemName: 'a0zotijljx364sy0yiiv',
                scenario: '45gyizrb0lj9gysuo27wz6a4l7hss56l2dq6pk84baztnbmzhs4f4huadrvv',
                executionId: 'b7203614-798b-4d39-9233-b8f22d4be8c3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:57:10',
                executionMonitoringStartAt: '2020-08-05 05:00:42',
                executionMonitoringEndAt: '2020-08-04 10:32:41',
                flowHash: 'hm8rcn65yw0jerrptsyzzyf1t4p7wsctbbqhk34a',
                flowParty: 'qe40ain7nrwti2e6u4rtem668np5es31ctxl4pp4xlvbekzzhyqiqshk5y5bg8oo9cpdroljlvxjyk3mlt0ft31jm4rjvy7j03vd52v6xulnfsjaspryhrgti1n621xxbbqw7s9r4papoa9eu4duook4gsup1w5h',
                flowComponent: 't9xqo7w9jej342q0pt3lr7f0c3rbcqxot0b0cpmkxtw5oj89e9g6pd5t8da5t8c67qnobni40gku1i89ilpktmm4phg3ee78njztzrxwl07g7lrknyoqlnqp7wpj8fmhpwbb9t28iiy9h53770gylxr29a4tuepg',
                flowInterfaceName: 'a5ywre25s035sppk3dy1h6qic7n94iiieq6u3839dcqf117qu0r2gc4k06ux9cpzlo1uj3xt2n8ise1q5iabqm7ojptprstwvi3bd3pqo3vo9pcgzt90a0p6326atto28eeut39lizqcyj21vhz3wv5k8feihaq5',
                flowInterfaceNamespace: '15pzkbhpdwpoqlge317tiaadbzy12gsbgwn7iins2ac7q4trc8hkp2g22tcrtsetqotdc82hiq2rsv4goycym1q5xl94pnurl9z1t4lgq04nvj19u52qgi2ou64ajrd9ji1mn8nqjstiuc3kb4yevlgbngx1v8c8',
                status: 'WAITING',
                detail: 'Fugiat id quisquam voluptate assumenda occaecati qui delectus. Sapiente enim nam sed optio. Omnis sapiente vero dolorem dolor ex labore in. Dignissimos soluta voluptas non. Possimus maiores iusto.',
                example: '91jopr997ibpyzm07m0ocbadx7cg79kr5opkajtskqzyg8g5bhdnngxtby4a7tm74hegwb2bs5spw5czivqo88wcsms5qoikk2cui83fwthyb5netq5whf7xhu9qzpzceyozha40zne82jl8vfydjpatr05rlwf5',
                startTimeAt: '2020-08-04 18:24:23',
                direction: 'INBOUND',
                errorCategory: 'c9rucblgwmwbargglgqq0xm0z4abbw8tofa1htcuiiyjso84soaatx1nu96ssd8tijqm525fh62fkh5uiczsvtdc609ana7dypkjilqddgur9r5euqr5z15kynq4hacgqujom45ij9z27iuqfke3zyy7qo8p18r7',
                errorCode: 'ifzv573h5or67gbjjb8xhjhpleptkufo8ezovkrhutqvhp0h85',
                errorLabel: 323300,
                node: 9543652305,
                protocol: 'hktc72pekthkxg8e576d',
                qualityOfService: '0my571661fd1lutm2ivs',
                receiverParty: 'ff6tfl44i38of4upbto1045mw6zx9witba2e92ors8pqifqa080wun15bxtilrlj0ocf0fzz9e3r66e2dfmzts9ki3k4ayh6ss7yowsry8tfbwb6vnsuxvjkaatajqre5ojt4j3kbvoe3j7vyqaju9er4r50od66',
                receiverComponent: '4y670woazalobi28sny7bbve4d28ye1kzkug3hf2bge3uka71uuvllxd3p880xr27gihwul6gblr9slg0qys071zy2te6h57hh1sjc6co103hhafydxl1jnufmduyatoiefzhr6t4efv0yqdhy1na9y6bnz3y6d2',
                receiverInterface: 'frynvh504foabkrx06cky76id4jg9jo5u063t5gkaayi4r9jqjmknb6hyodde41x3825o60nge9rjubwnqzsn8mzpspym0cd3puj97ldqqlw214q0qlewyrzyifse10yj4wznns27abpz6rm0w2bcysrze8hoj7t',
                receiverInterfaceNamespace: '2ss5950pvar4cc2vp8kwvvqbcic8rqid33arlhxzfwdy1y9z9msgy0qg2iyehrgajudw3p1rh8ev1l0n3vfhlp3bzy6yjr8se2r3qvku5xpv7mer9yktnxnh8hr4tktj1a8rzbttc67spn4m6srfz1p9wof4pu3b',
                retries: 6806653584,
                size: 2515369224,
                timesFailed: 1539441054,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                tenantCode: 'cdd7vwwrl5d01o72dw1ryf2bdjr3g1ebmtpf8te8x41r2k7dgd',
                systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                systemName: 'raagpfcvf4ajj4bvl3lf',
                scenario: '5vqmk5hbcwfifx2n1fa3r5l1ug7hgdn5jnzos6deeq75esmgsg47yraacxex',
                executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:56:17',
                executionMonitoringStartAt: '2020-08-04 16:33:35',
                executionMonitoringEndAt: '2020-08-04 13:30:26',
                flowHash: 'd8fg0tbru49f0vmjmauy83i4fayv32kohnsc76xn',
                flowParty: 'fqzqm8m6oaxydhdi4wkz7xap0lwvauw2f67wo6h48eq0fqqr6mvryv7l6xl6g857zy5qgdl6dbxwz4dojy5lyl23qssr5bi78on2qhhxe56mpcns734zx4q3mi2cddmn9x7xlmaeev41wk2cn3oaknukyfilja6b',
                flowComponent: '1100w0qbhnfkv2ctotcusv9m07o949vde80ki3gl06a9c97a09b1ibjhx2n2mmq4brneuhr5syo1azzrkrm2r72kmhdaotbjr89ov2053tefr77za41rgqa9ffr3f4168cwkhkgn9zfbgvzltrgwuhanrx1kzru5',
                flowInterfaceName: 'fh77ufr4v1ku7ydk11ni2twhwu0id7ei90d89j4dl8wnhg8su1kpi6wcox3gdk7xbgdcj89dbktcbbfrvqdjs51hz0s9uiws0pplmc64wjt08xxvda2h8ykdf2jzzc2vhcwiyw5wh8sm7oepcy7hm2epvobpewie',
                flowInterfaceNamespace: 'wur8hozhrdt6zu21b38gbj31nlcuhdmmxrcz2l7m7354qavbm3t2br7b0wycstxwlifpcj8zjjj8mkk32hhi04yjszvi8lmyiplyxldyrlh4u9jtezu0462xn84fnfeygyyoy8vbxfhcatk7olmq5niab8n7fzmf',
                status: 'ERROR',
                detail: 'Odit velit rem mollitia deserunt doloribus nobis recusandae quia dolores. Dicta aspernatur sapiente nihil sapiente perferendis error architecto. Dolor quaerat qui qui quasi blanditiis sed nihil voluptas. Dolore rerum expedita. Facilis voluptas tenetur corporis eum ut amet quidem commodi illum. Est vel quod perferendis id.',
                example: 'uhrn8j16x6p0pf9adf09z18sb3zjev0eg9ph536twl812znz1aj1tz1u4665jt8e53ok8w0ga3pad40q7chgpoe9jstk6kse38j4pvad2d2gy8s9r9ky1s696dko8irkkq5bspshpsforqxtehk5z5td1kztaeek',
                startTimeAt: '2020-08-04 14:36:08',
                direction: 'INBOUND',
                errorCategory: 'qxbewprrjmrvnvwbfdys5ozr9lruvwczno17kenomm53k4g9qc5zacvozczdav7r2pklg4276qo8hko3pgyhkrdtd1gi5tbo8hl59s3i7s6rg54qx3h3vzg94wrrtofneuekmde45t0czdd1gimrtz8vbsa9yusg',
                errorCode: 'xv809ycgjvhc3xi80v5k4p0hvww8cq7g6b5u46idq7hicf18ct',
                errorLabel: 700613,
                node: 5305747439,
                protocol: 'degn562j7uuudwshgf03',
                qualityOfService: 'tarupcxu6to5bliwl0g5',
                receiverParty: 'n5t57bbulkjectolh2sjcgwvm773kjphafduo7z2scrs9xe9ix5107owbkqxdo9z4sqc5nn5g7faxu2k3s1p1bt2nhv2luhqva1ujiyqhaal4memfy337shasnahl2cstszohogod79azq3ceruccbyq3q8oaj2u',
                receiverComponent: '8qwrb5eu458tufqrnn3pe0duev8ji382exms6zpaq3097hrosoafypddofxc34fvmgtvw9271c0gzhhoyi77ye1pgnu0m1iakfvnxk7cifeoxtvrydwlfvhmxgtldm8y0tx3yfixf1lin1tqnqdsl0f2gv2ahb74',
                receiverInterface: 'cso7ws5pvque5jdjo55jx5w1gm37ibqjtfycxwecbg2p7urxfrqpaibv53hm9snsxbrvcn89nhxet5kypq8q5yuwrc51o3pv4zp40z8nryxajifxxw0eaf8bfcpr477wp5htycssn6d4fc6hwat0345sjqk46zj5',
                receiverInterfaceNamespace: 'sfk2dbt0zzxb6awwbvq61wz425ts57sfssrec0a8o62hc8c5va666u25q9u2s3yh95hhzp9kbncu4npwwcfx315gscwl8xaybjlq2r5mvl3rgh3oifiirxt0iz35qh8bnmnb4qmkc6j2kw62rxuyp7ocaigbeheu',
                retries: 1837363959,
                size: 5906128178,
                timesFailed: 9140084308,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e57c96ab-d835-46a5-8e04-ec1206e434bd'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/40ad11a7-f334-48ec-b150-cff5dd3bc2f0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/e57c96ab-d835-46a5-8e04-ec1206e434bd')
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
                            flowHash
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
                            flowHash
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
                        id: 'f312fcd0-fb3a-4d15-ba87-981f4a1bc60b',
                        tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                        tenantCode: 's5h2n4h80rkoklkcrq8nyazg46d7y2rijqxybgbctgebn7nojs',
                        systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                        systemName: '368hxcnk1sjlhhixeycj',
                        scenario: 'qcxhtobv41m7f9upnnszozzn2n7wkzlprdil9thbv3iiihne9bqly5mu789b',
                        executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 12:37:53',
                        executionMonitoringStartAt: '2020-08-04 14:58:22',
                        executionMonitoringEndAt: '2020-08-05 05:21:14',
                        flowHash: 'v30cyulutgsiga0wt3gfmiwuu9xvg82hokglae3z',
                        flowParty: 'rfb3ofz8omln49btvckyj0t9ppa710po0z2nognsm98gacrycjqeswgw0u6x1v5n9p88311fa966bpvj7ai819c4t1b7o6zcy8i8f1j5o8o84acj52pxknp6rktauvw1ck370opt968525ocbqy8y9t8avqtbtzy',
                        flowComponent: 'e5ifc17dgbp6utrkg2veny59g8fqmaf6iymdh181xl9nl4g58i5dpne5z7iuu4dly7too7qm9gv68xjcmf1yyz8b4jzk95v40zd05s7tkv8iiobiheqgvev72lyj4xcnce7ajymnrh6jzf8704dx3yfgteapk6p2',
                        flowInterfaceName: 'zj1azcvn77q72kkf9qpuepp46illd9spji13xkqqlvfs9lxm38tmu84fcfaidwugnwddx18t2qy0av1svljpw18o0orldm9tc83xx7hpmgjv337exksmpz2qyjkbtd96y8or0jefh6u57dopgvdbtf6aqhi57wjr',
                        flowInterfaceNamespace: 'rtltehunt3rsmjf4kz3etfcm1sk832rarm64oi78ljkq8q7lcqrymug3cxfya6k0wz0nfdmeqtg5m9p5vla9hw80yrz6iwgt5oan9gs7o0xenh8nerr98ycm2m908whg4j3amx7qrkb1gen82pjonktg8bb2tkeo',
                        status: 'DELIVERING',
                        detail: 'Repellendus voluptatem facilis sunt est maxime quidem. Facere quibusdam sint sint labore modi soluta. Fugiat esse numquam. Maxime quibusdam aliquam laudantium asperiores sint nemo consequatur. Similique molestias deleniti exercitationem molestiae odio asperiores accusantium illo excepturi.',
                        example: '4xwrzko9li45zjv37vxjgdftsuylsv1kidslv02hl450iyou7vyecshnvkrvbth62314sdthfwb5ws2u7mvs7xb05cjhf1kd66a6lznaweco4xe3772941x92my3kykue2did0e3e2lfjf4s3h6z3rwuu2x209zh',
                        startTimeAt: '2020-08-04 22:10:18',
                        direction: 'INBOUND',
                        errorCategory: 'a691ihbx68cofiqiglnjkopk9bqo1ku36ps2fzqicyfdeaznvkgajp070ma9y2wh4n86101w082ntrits37fzoo4i0czovropvi7402e1iediwzqem5q79sa97mmespfqv0z6t35az1ftt48a0f3ncpdffm6nahx',
                        errorCode: 'lnt9wcrwlypcqo5x6mdt9obbmxgom48j3x55pon5sz0dt6n7iw',
                        errorLabel: 514527,
                        node: 5921675294,
                        protocol: 'lme210aw0f8gwa88mqum',
                        qualityOfService: 'run4o89swhbqgnig625t',
                        receiverParty: 'oyy9s8t3witccgmxivxor3v3pildu4lek60hvhmkwrgfou3tde5x8xf0n09ifrc4osobtkxup4aaggh4e44mm04k1zog0290vvev0bv4sjkdzig6lmj9demymmvbpef39sjl6omhita99ng5yh5uol8yio9inswo',
                        receiverComponent: 'cjsgwp82yhmjzoj8jybsf8ooyqs70bbv0hxpw4w38xqwbg3sszgwizdakn3ukvfldzhybozdmqt8q4xx7smhagbpovewiqucjmmwo0o7pylb6eics14aeuxbrvgo9gcytik0a97962vq13q06fnol6o9q6c7piyg',
                        receiverInterface: 'xa8ns7h9u143i8nwphxy3h5lyx30bqw96nc6b9zkvkfwqzt9p5hvuwp1sst5ac2xrajr4s4n7got2icju3lp7zea71dtcfinq0ttyp9dmbav7vt299b1uavf0kms3na5in38x04ju8p2spftbxa6wkabti8e2ls4',
                        receiverInterfaceNamespace: 'dp9ing1fdij7ud0r9y9kx3sv9238uyzyr33ct0icjkhxrqotewkwkie5oaaqpwmizeujue30syk9r6v6ewtfac40rbhijymcuc0gvk3lihvp8hj3a4a8vi918y3wppg3yeljdkvyof8fy0m0toa7duwmcfbscv7v',
                        retries: 6594340612,
                        size: 5618627229,
                        timesFailed: 9569778970,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'f312fcd0-fb3a-4d15-ba87-981f4a1bc60b');
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
                            flowHash
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
                            value   : '0b229992-fdfe-484b-87be-e93db08c2034'
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
                            flowHash
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
                            value   : 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('e57c96ab-d835-46a5-8e04-ec1206e434bd');
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
                            flowHash
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
                    id: '88314def-ecd9-404a-a49c-7fb2ad7cba8f'
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
                            flowHash
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
                    id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('e57c96ab-d835-46a5-8e04-ec1206e434bd');
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
                            flowHash
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
                            flowHash
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
                        
                        id: 'bb9360b4-9c22-43da-80f2-2c708321cbcb',
                        tenantId: '08a76f0e-1fb4-4cee-ac1c-bfe85d4ac103',
                        tenantCode: 'e5tvwkrtbsvq1qm4zf0mtezdrcm8z53jb06jsomr4f43yb8b8b',
                        systemId: '5d37499d-4d48-4fec-bbe3-8626df4487b8',
                        systemName: 'biy2yayg72sijyn79d08',
                        scenario: '7ukdqryy6jfd019ct1au4sm3f7tc9v9lsrq2qm4tgh3tbufbq93v03x34d8f',
                        executionId: 'd3348049-3d25-46ad-a1fd-e193290c9d7c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 12:54:43',
                        executionMonitoringStartAt: '2020-08-04 21:32:49',
                        executionMonitoringEndAt: '2020-08-04 18:29:16',
                        flowHash: 'g9xl2eva4avmxgjn1y2th8ynzwviwmrta753e1jo',
                        flowParty: 'xy17op8vk91zv99y3zpw2fpp2up2flesu4nh0oiuh3aafp9ln0egznt826fnnl3f9d3vy5wm5k6lsw6upmfbeo7ef4049z3089t0azsmhnfj0saj4ehulkh9lbgi1tbvvwkrwpq0k5ooc7pv0mmkzxrxi9ce4x5n',
                        flowComponent: '3c7bbgt3gkezerkek7lccfekh38m2p9lk0dreml4i4l8p18qhi5j1tqoprvv4sl1uaqk4vyfuujguwp2g474ul8xicudr8id4hgikks2clxfktsi9j1krfm84v727wyljjdvcfnioh9ykiuq8g9p3olzg07vt6bb',
                        flowInterfaceName: '82xrfm7e9h7ka71iyyaj6m6nc1x91v15i6rzrk7f5i65rpv923mt982vkdzlqo76fpw5yyfvl6rvzz27lpd9xy21gu0cs6x1jsjzmnivrhec0874viltljtv28qs2v1b0y09libmdwo4tqlztbsh94na22qxrqon',
                        flowInterfaceNamespace: 'lhf0dbukax41ihvusqt22lg3gz1tynjd29o4eenxo231ojqblv48qu4pcqa3eg62c098m2yy0oiu6p1g22qx1mh9i81p0tgi5smspupxnb36hj5q5bch6sr6gqu9tmy92383nu3wpsgst136f5fn3b5ue8anlsat',
                        status: 'SUCCESS',
                        detail: 'Non voluptas rem voluptas iste quia est aut repellendus. Omnis dolorem ut. Earum sit accusantium voluptatem. Quia et vel ex sit eveniet. Similique odit eius officiis dignissimos in suscipit et molestiae ipsum. Veritatis voluptate et saepe id.',
                        example: 'sk1jne9lztonym8s4j0f8ctry5upwgf3yxx4ss6lln4xsijqgorau1lv4fjw6kvrs6l3gqoq5daqgh43uo0onwn7mx0yw6c6bj65360zd1qcw2ykx5nk2rti7hthq7cq9xtj4ejbkeav9qjow2z3tguc02u0nvws',
                        startTimeAt: '2020-08-05 00:42:01',
                        direction: 'OUTBOUND',
                        errorCategory: 'lf4a41c8znxmhz2x265b931bh1lctj5ndfmeur83t9hog906r48exqccegbd10qmqsoiz5birva4hz5hzutm5lo1almx10ejxtt6hcf9hinvlxc3nxb4pz6ahkozomgxsa70922c4030w5hnaszq4ediyhfk4sx7',
                        errorCode: '82vvyvh68877s9j0s0jpmizoes0dau353xa5z96bfqn8srcwgk',
                        errorLabel: 310997,
                        node: 3996645956,
                        protocol: 's3mwo1afh6yc9aktlfro',
                        qualityOfService: 'vokw7x7g2wwcn88iddmv',
                        receiverParty: '17egg1zl1ph78xwlvvrhkhhkkivcq2s86m92v64k9qm9h70el04gnk3tcz9xk140wenbmyad6a9ube9x01qz9xhgg3v4bjsbmn772kyh0wm820g5l94mrvrl4e6t2ug8q26aszmdzk47b45vjg71ch2chagzpne3',
                        receiverComponent: 'gzadkw2gkcrzspnvhe6roi2famyj3zix02kajmspo4hvnvxeat1qpiozj91l15yj39np0z5124h6ixu9dmp04m8kwsio208aes6gzl6qneq2gbip2mzswrpd109pm9ific0dl1o7vuf89x82xks0z52cd3nazyxc',
                        receiverInterface: '6x56ez8ajhqfddhsvu4i14hpyhgvdhid541n7mehwl7p8ng6io1iff5h78cinkwncnry5rrrircbl7cgm4q3mv6x3nwkbej2mf5rcagegld0q8nxjo2h1fuw5m0c34qazueacyonjoda7bdrogs5xe1adfn14ns5',
                        receiverInterfaceNamespace: 'bi2x1xskci147eupv2wxd60joxqtp8eyo8w6gxyc1z46kc6etzgg1f1wl6yj1qyq72272jua79n5wnd0k1oeg2wlcxlj4c5lck3fj0veghpzm9tkw2rj9sfccpxqlqkumro70zva5kzbhmw13na856ow5zn3hx3b',
                        retries: 4388536611,
                        size: 6586832885,
                        timesFailed: 5230227201,
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
                            flowHash
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
                        
                        id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd',
                        tenantId: '281b89e2-ab8b-46a5-ba0f-164f318e3cf1',
                        tenantCode: 'rrydyem2i2oknayg9zje2cgem1fo93437gn60qpzp9wg503u5r',
                        systemId: '38d0528b-0ed5-4887-bd06-6e6463bbbf61',
                        systemName: 'xjdw7pqmqjp8ls2pj1kl',
                        scenario: 'mmnby14y35cnhsg3mhdes1xbmaiqzt6wtrvy26ofzl5ihlx55vhskmcgtmb1',
                        executionId: 'cefcaa5d-dd61-4a06-b105-ba3efec7a674',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 12:35:55',
                        executionMonitoringStartAt: '2020-08-05 07:03:13',
                        executionMonitoringEndAt: '2020-08-04 23:30:56',
                        flowHash: 'az45yp03iwqc8dqzzi13no6bi64741snhzv0r8ff',
                        flowParty: 'f10qx8skhdpyxgpnreq63qaqxk8z2mxs57pflydcpnm1f6685w8q5cnrunabil9wufvdnrjuxfwpwxt8lz53807oqjibrw8c3ds8qsguc98t5txoorsilcsdrwctiysa6dan3y3v0nxefn8vatqo1g2a9mohuxjx',
                        flowComponent: 'qtgdrwghiggp0uxvfh3q177t0va1bzylg2cuacks6ko214vszmep23fj0zndtvqg2qfisv0wf601yah2gt4vuoqzo793tdpzhvsi730ei851zijcy59wqxlase3l0qkdp2wa7n4rtfgq2al6yj1fi86dwfbjx0xf',
                        flowInterfaceName: 'gb95cojzalf6t32gxrv36i2zgk3q0z55moo27srtnd5b8mffa4ocw3y9jdrg6wkajdylwzshhmuwlqv3y64uwydzs4nrqjer7b77zzgr7ujx803mh90nhnjv5lvy0n9659r4a1wtplsamxwwr4jfw6v88i7jziih',
                        flowInterfaceNamespace: 'vxivqz5ke4zpekj3kh984ygoxjp85ycti4bnk57433w1pigb7kwamy2gue9ky1cwlw9tynzgx5uwfijy18c4ieq9mnkk94os4hrpnmgcyg4sa27b7nmr1ju7e5nxqptxpkoatzvpspfgvasejvk1nuo3y9oyc8lz',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Omnis amet quo dicta consequatur velit a. Quo magni ad iusto asperiores facilis. Animi laboriosam ut inventore qui repellat neque. Voluptatem ex pariatur et tempora officiis sint autem facere est.',
                        example: '7g2b56koz20d5jmwt8dv2gol3f1fsm42p3tuyblz6rda5sr6k8ex5df5crpuiuiq9f824bi4jjuiflqhtmi5b13lcml4z768x1l4t4o3s50phwalhhc1bl06orrttrigfd1hoifa9jcpxmwhkgfw9h35qas3xmd4',
                        startTimeAt: '2020-08-04 22:01:07',
                        direction: 'INBOUND',
                        errorCategory: 'ryqdll30ak8qt4gkoism4lsg8mjcquw90thyplxpipu5kl6tpxwnhkn2owrmz5g8knesp1saco030htgdnvqvkzn9uhmjta2yrj87qqucpm2pp4aqvex227rius6rix28ipv03lnvfh5tak0reidbe5hhnewvvwz',
                        errorCode: 'pqk3ffx7lzm844d6tafgpha017l12113gcu7h6lf9d0vlmkogf',
                        errorLabel: 423715,
                        node: 2386513150,
                        protocol: 'xyc3roxwxhdkuyygqcss',
                        qualityOfService: '29sod39oso1s65uylx2p',
                        receiverParty: 's66fkwia4rsu7en80rz3jmhpmod6oyhk4c8cqgkp314okorr3gh04f34gae5u7nxcmli7rg534d5vfqinx3zubluey0088oub9o40vzgt15um0azjuszq99m09f7fomvdobe3quy0h9bfvvgithv2o0ito5vddmx',
                        receiverComponent: 'u45hblim7xq50bmnx0c4oblbdrcighbchv2zznllr36cyqlpnj21mtmpsyg1r0n5iju5khsqwrb3ifpxk5c6kmj4fa2lxehyd2n2494y61g2yyqdy3cxiilqqzz1xt1pwcapea3vvi943a75cpky27khhqkrv56c',
                        receiverInterface: '6drst80jg1r7tlfldo3har3xp8n1m68gclu3iqis42y5xnlnb9epa8fjxzjeg2l8h1yvbg9b0517t9skrxsv7gmhzmb17ruvd3w6d4mpozrb41mkhn3yp5xbpafb3z5myp4x5vfcuc0m7wcji5k51u6eus5574s6',
                        receiverInterfaceNamespace: '5hudhjh2nd3qhg28dvr031wf459tdtgpnuvpsjy2ve0a4o1durobdszf747je43cicsj0jd63lqi38agcggju7ugyl3v5jglhyp803e4rjdtz5iydh6vvh7o7ay7z60knltts7fj1pn1dahosozngmox0z22hcd8',
                        retries: 9283641588,
                        size: 7400003352,
                        timesFailed: 8811926797,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('e57c96ab-d835-46a5-8e04-ec1206e434bd');
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
                            flowHash
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
                    id: '62b114ca-6ade-4c0a-81e7-cbf1ce9044fe'
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
                            flowHash
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
                    id: 'e57c96ab-d835-46a5-8e04-ec1206e434bd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('e57c96ab-d835-46a5-8e04-ec1206e434bd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});