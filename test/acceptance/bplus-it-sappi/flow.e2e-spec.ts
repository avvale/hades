import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '60k0uambl74is93sumgd',
                scenario: '7xcju14shjhe9qxbwirq2dzk95x19acqgt1zduy4kqc1sodc7adcsrwihxnb',
                party: 'xijpxifi1vm48d8nxt8rizs17ikie7ucl3pk6asbfal71jcntpzj4r4qakhbq4rsqjvaq1ld2ioiy5g9c69a3dey0nebktmslq92yfb3kpuoohdiuhmbkr37jyl59plmkcdtw4t39ffexw7ha5j0muabglgna1d3',
                component: 'tfrctfiejpf5twgyy5i6cuhjuvjfq4tsrql89vgtssaeskqoa6s381qwe00cp2zn5zwzin529s1g25elojyfedtjdssb8bipxd9oetwfxvcg9zhejt08hvadx2wkj6cy9wn0siexxhyztswkpvlozdts9faqgz2n',
                interfaceName: 'ns6geq0ojb0x5rf37epqio3tpuvacs961d9uof42a5zx0flk8s3c4kf7zjf6klnmyj8jwme2ytrt7dst3eddfv3bg84byhtltyp2p4btoi31oyqn5o6kzy7k866dba1imefizpji13edhuqem0ba1sgkfujwgdlu',
                interfaceNamespace: 'ruy3nfnbm5746lcc8j6sjprcpia8xvl3ug2isponapq0qwvnlcfo71351gzm19jsmpnggjunytviak39teh910d0h0hzj5didt4ky3rzp808ods8j2rbckh48cii2z3m9u0je5hkkxf6n6rpdjf3t3qop1i0mie5',
                iflowName: 'h75oupwmq7wkdc6tsf01y0ekiq6cai5mx6u2ucotuifn95u89wctgwm5o6b25hhfxilyiyy7kjhs8w8gh7sr4i5m5tz4g1lp3kp24vryg9m6chxclm522y1uue8qlbyu0rmsw6x55a3ugfly88dy1enchp0ww4i1',
                responsibleUserAccount: 'mpdg1r36ftuu8vkpb05j',
                lastChangeUserAccount: 'i1c1upqtjs9c48ekyej1',
                lastChangedAt: '2020-07-17 12:44:42',
                folderPath: 'x2aj6gwi70xw0ykksnnoizz29d108lvngg26v2jfwtfpxh9b7ej6x0qlm5rvxpsptb78qtevq10k5sxpx1yraqaj5bbeqrlywgt8nwl7jaa6gapyhb5e648mel9wc1wfqzlfpynvou3h731i1uhqgr85uz4jd8l318z1hlo3zx7ouklqpajav9b7vu37wxhikw4ov4inb084ebyi5c3zmfo7mxw2441vm0gmhg95msxdnxxyh7ndg2bogynv8k4',
                description: 'g6lnoum3bxpxhs2jdpp3vae60v8h5r7t87l2do582f5z3vqcjjvluplu1owtvni1vvvcyxvxl2040erpfcvo9wi2bdozminggdrzwbutcujxnaon1nn0n39v63nbhukjaq8lj5auqe8hi4e47zkpdf50wt9wu8mnufa11e0pjkbn7rsm96i3z3ov8fdmnlqp28fnlwvfgjhf3sgcz1zz7rheod2ilb03kae9q1yj08329rn2lbltq93hr7g9n93',
                application: 'rfqfugj71ykvnbrx9xtsuudzwj2ta4lgu5a5wic8tblhrc9n83oaowo2ahwa',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'dvfas7qfbp40n8c9xf0a',
                scenario: 'ii7zxs1zr6258wu1z6tyql6zs6id10trvrer8pmzrcya6crb3n0edlll4xj4',
                party: 'ethplwzqdh6mbxel8egnd598ho24lp0zdiuozl88n13vzl6pt5xkimr9fk97k6649oeevkc7vzz8562fqb0gffdzep99q9gd6ygza583qmo879lv85wp8csqvt593nb99bvc8gpvfj6beqdsj2eyykg9bva0j6eu',
                component: 'mn7mbzfloh94nmo5aop910o22t8pnusgurs42i8y09lg13mfbczs76lvjwbanp26mpqp0xbqo90szs7c724xvmrht88f4pwnhejvfhdkqpxrcdz1s4mi3d0v7hzr1ove406n4af8gtogyf5ir9enb7a6dbsxwo83',
                interfaceName: 'trhfoweiktwq9pqi1il239fm6jkvqno7iqiay5sdy1psy3zrzbd8e0i2zx4rb4ztd6cuk1t391accpyek7a57feh468gethuuood1kwpi673wvrgsyh94o8bap5lefa1cije0yktjl4kf5zds2ms7oe8r9f3azfj',
                interfaceNamespace: 'ozimbbb2dezrlp6b14w7q1fsfcy8u3v3p7wrh3976d4bc9emv0z6qonf9zce8nosb7o3j81ojofkjv3jo8suvi0pxgr0188nj5u3k1hx44u10c2tou0khepq1m72da4hm8d4qvd24ilr47fdjwui8hn6wpiao4ja',
                iflowName: 'nbcl4se2hsfirehdiwllb4gufuukvj847o7vw1cs8ba2qbdfh4klvq9lmcc0377cbvsb1bpwuct75icdhwuid88rm8ylcxed7y20icy8ezpdiybfj2qgdqlg52kdgvqx0fl3dpdh0fc3wbsxynuygkfzgb7ld6z7',
                responsibleUserAccount: 'wv65ew94b78b5fq5ka08',
                lastChangeUserAccount: 'pgx6rjdv820powo7b9b9',
                lastChangedAt: '2020-07-17 04:57:05',
                folderPath: '0yt5px9rz4rfrkdeac4e51k7zdpuiyoddaetcj0z6gmb8pydgxrwgbwipjqmu3fkpt2u08zapih3ye1ujy94fotyf6ld3twabg2aq6ylmzjpfqqpn1nqfhlpylgenk1x6cbxndpotv6omr5qf50req63k7z59qkodyoa37y7psbo7ggxuzya7cr9w37g26lhn577r811eryiv3yrs2wvl2r63xhtwkmo9xa87kc2eqenozj7n63vv9isu7czxw4',
                description: 'jbp3711i9jgetg55k2ipmnr3l5jv27loo69h0crg8aknwbcntez6y06clp00jl8heips038i216arp5elmssr8qpudd77e91193dcl23v331yy14qhc67dn1supog4q2n2w17w58uri67wyurjsusjcsan3o3fb2yi6eqgfuyzua41o62n85dwkm7biqilqhl1dyc3q26lfjtik8x6uyb9vujmzww05sa3fpjwnjoudhluntf38xuu3usqw2ilr',
                application: 'ksiiwod48cz0gskodwmapiesv3uewcmeqi3jd6p1f6vrcvak0meej1lra3tc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: null,
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'beempq1hqwaey6kslpb8',
                scenario: '5ad9doe5q9jv8bmxq6naqtfctkdfnk21ruatki76b57r0onxfbrlhb2zq2o9',
                party: '7btb70ad69nn18tch4o0844602szewzpo1an1dw91g52pmi6zgitgmtn4eczicmf8x8b8jdtyzsj0zs4l1t1rkdelgx4hfkq9yfjhtawnxg2x1feiwxz10pycn7ze493a7xfqzwm0z6phl6jv9ujs6wya06jchcm',
                component: '2i323nrz6kk9au6nc9jlg63sb4hb9p1gixbevqegftz8g2zmoncf7taz07gmusxdltjdqln8t6j4508qyor21ca20wokwbqw7o6ythd068s8u9twp6y0m4ol5rj6l4sya48wx4a0brmmuq4uj5e0e9gt574g643l',
                interfaceName: 'pdvxrdt8nq2wi35lg296ciw0dd72zm9ho7w6kmjr39lzcevqlzokrn2t46rkgpp7h8oejb7tx3avkryp33z440owhbrgprnmjntrp7kuqyqsvoawj7bjq80v2b32aabroaunx05zoxfepf1ybmpzlmgmhs5bpll2',
                interfaceNamespace: 'z21mrxdy0lo1d2hpbw94vfo11y77jwku7v6sio4dpotmtog952i949nz36sv208396d14jnruwws4qvmryj6sfhjijta20v62r6teck7ky74f16hjfinwloaluk6knzj777pillkrirfdu0q9k2vufbt4xmy4ysc',
                iflowName: '2uh8s3mzoqz56arlm8nrlyirla2wy1ckmkpx7iqw6vh9w3d03b39aovht12b4tg6lvw43yfrpj0qunyof6e5dm2vm429ql38goj7nno9zampwnsmi80f17vhdl78jdfc0u12bi5zg3n8gewniov70wq77pn8ssfl',
                responsibleUserAccount: 'ew5bxfvh9p8ugt3p43n7',
                lastChangeUserAccount: '6tyoopncmgfo6z3gpsqm',
                lastChangedAt: '2020-07-17 01:08:53',
                folderPath: 'vmy7wusggec0gu9qkx37wjn2mhdsxcwuij1u6zua78ns2gbh68ahqjxl7c514yb6bg1xnn5zu13qst38skr55vt76zqeh0fv2itcq0u02j3f210q5418q63qt3x9pj82rqxhu26hfl4ovdhqks8fi9oy3l1l415rvbvfzc55adai3uv25vqnilq18wzrsn13ksjzl0mq1yn1n713vad4g5izzasipc0khb0vwurd0wmggc570ayaq5q3v12g70g',
                description: 'regjlkdooz42kcdkbx9n5fph3dru2jjtxn8upy51ujvm62neoh35zo3ydsr51uvvfelstp4rd4kdi0326mgh1pj07rt82svfcre5wfx5h696wjkpfcz7dc6syv6uhlel1v4j0xnegw4namx9c9d1c97l0v5c2mu8xz5y88ko7la3zx9qja91bjj5bl8oxiaz7yon66851zbqkc8ze7875amvoimp5q3spd4fcol5ublmif8uwf8bsh4pkphq788',
                application: 'owur4757a4sdje2jmkq4k8c3f6klj879tr1w2ivfa19b3r1r2yzxlf1hfkwy',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'bazf53rdmidivdhgrd2u',
                scenario: 'qpsgaj2dw77czxjie30l3q5z0llrln54l7mwxah75101i4qfixtrl0mgzuqu',
                party: 'dli2f5392f9cby1m3m21n7koyqnvyeo63zs4z17m13tejn0ycpdwquzyodsa2eyhiy12bdbds0p1j8a8ow1r4zf43gryxsz47bb9drrgayhvb9on2w6s3pitrjvgtlz62toxcc65agd8a2pvmtl5wbmph92pu3n1',
                component: 'efqvnpfvl16rg4011xf19pdj2lz5gtf37xaesq2upr6luipwdkii3c67klnr73vc32jjurm65qq3himkr7uuxdrxds7mslb3274nl4bwemfh7bnrvzkhn5a17jvwm19cnl3hl0dj17di4z4gxl8a9ezxvlldn0uy',
                interfaceName: 'b9160nxzjilm3ht8mm9qwll55i0vk4d36u9fmxftj57aewctyqin3i3nd0zlw4w1mdjtlj9zmhx9vycum9wnk0otb0chxx22i6r18cxqqvcg76015o4l7li126mrydyopfbd13z3jjn551q0v6g4kub5ebu9bypq',
                interfaceNamespace: 'zlkv2nnhggrxhujq6qdsiurjl3b2vkq9zwet1dtamesp6zakdudaitch51zatoshwnp4n1fxkl7cuehh6u5d5jelpot5f90s2suyaqcncyyvd0zgkb3giybnwt5xqu28cnqidhqwfkzouxbnrieg86u5l2a7z0q9',
                iflowName: 'p1iase2earl23vdt048ho9eu5g3bqm66ct3trsbbih49bpwlykz7wr67jzuay0fmhxew60bgi5x0xvxgj7cfx7qm5fmyd2hozg0jzqc9bq71ny9qazt09t6zfiz7245qelnrl2ktiqjv8h0yw8460csycf3p0rwn',
                responsibleUserAccount: 'q4s5v4avm3ozbgkqek5d',
                lastChangeUserAccount: 'v2duvy8tvzokyjkou8ez',
                lastChangedAt: '2020-07-17 11:27:16',
                folderPath: 'vlarykv3jxu0pcqupyrtej6hska24o504xmjvyxn0tf6a4ojqxac1kw62fi39o5gtycr6heshdd45riihc34jl3v71noyafh8x20pk7syvcopc1zercaion5noi53pw83rnzgxc45ytfe7jfh5arnwe8mtu55qrev71ciezitc1glxad4cjtx1phetpsbr6zv8w9u79qtohilvm8jxwjva4ktlk6m0xnkup5z50qpugp54jxra5tj7ehssn3g3k',
                description: 'p14qr90qtt2nd9os0rirorefoxuw1enc4v2kco843apq2hbaq99ol0w9tjc2792mlpxq5dt91mh08xi70dov81h93gbymaaq9bfv5vvwd1ofxeoqxrplwgxrq1n9lbw2f9oubjx28kgz2u6v08750a4emj9ypq8mrcf2jilnbf59phxzv9pomnr94cmiin9qpgk0skgk3y3s1fymwq6ebet5jy2cto8fzlt6vievcsy4h5wg9q3i7kjzb2p4lb3',
                application: 'gcf9offcw1n9dtto0fdtpksmyp0vcdujp44t67tb2dohxg93q7q538woqeaz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: null,
                systemName: 'k0qin05cru7p748nd0df',
                scenario: 'n0lip2ll8j4ncxk2luovtwjd1iv2jgy72wn1ilym4pn0ekrd6ai65vv0xm4n',
                party: 'r4a0zheltxjh2brzcor0b7ahu2knrjkjmv8mzbgxjneyaqdtej2xomfzl4nzoaf9ad0dbogdaf9zft6izksfu9a8aeny89ffr9xj13l9w1xjva46oveheikq26kh81k5ziepk05gv2togl1ucx4wwtnppyh6d8m8',
                component: 'dejm11nq8ifr45f5h88k54c49bgyclulu7gne6sprcsmn6rwa6bwrmw663hg45f4d6j90kyiw19xq35gg0avqxjqoge17l5lofdbdru930bs69kqf9fxfrajx0tzdeqvkhrulaznnk42gruxfe6tfbta9iaf958d',
                interfaceName: 'rbee9t65z9iqmavvu6452wwfkkblqy0588xmbbnrehl8kmkndffmkzj8foq92tyssw8x6j94biwntgdjgc3v8lf905h95bzunq2b6ievd310r0z9506b2287vchokjg3yd0sa1l101q9j7jeyxhxc05z4sxx8fcb',
                interfaceNamespace: 'tzqj3v6nov1lcfvtuzvdn4r1yaaj28o5a9cxnpt20kujy3uxo3yxt3ceefcv769y27rmogarwfqudrpui69a95hzlds3gzonru381wrn34qlg4eprwigxsk04wzb0x7sdw46qpenagfe6ty6elp9r52fq5kc81zn',
                iflowName: 'c2gou66r959n19rkrthn4dq6wdz0ugsnu273n0so1ryzz71wk72bz3jza065jw6mobl9xnjvf9mtksjmhoq6r39ggoqdh8ts2e7kp8vohpzc844ghm6j5yijjlvzo8ka2vej8xzv3muam5xzue064tu0fma2im03',
                responsibleUserAccount: 'zh5sy02c1d3l3ap8vyow',
                lastChangeUserAccount: '8sq8z066dga43w4h2vee',
                lastChangedAt: '2020-07-16 23:33:59',
                folderPath: '86zyknkszd40f1767dprz0h54gi9yvixo6h0g6qi8e8dc9w9ueo1pvkpmamf6hzkkxg2fczg7e4p2tms6zkxhyw9cjej51hbes6qghqf93emqcx04lmt9irec7s2za4c6pul7atncfkdq8dx1c6601fujwgljq4gwx8oup0en7xjycx8oxw502dueymbgwko68c5njqtqdub3czdtxwqe0abmzb188o8ayfr5i6u3rc02dyfpd6t3gqpwwnhd0m',
                description: '2wc6r91u6t5bvvxkud7tkus59az6bnh288vb334hhf05a8vfhkz0ykwx3462mouryimf6rtzgfc97pvb9gf3ojw2t6cbj1wrt94w793qmdjdynehywcsbz490fkxp81uri82a3sux3jtdcemh2ajeaybaoi4242vobi10vbdlcmq8ta2hp0eifezqhw4nnbwq99s83cftlxmcimddt37kq2y85betx25pccgaz22ocg0b4j18cp8vs2df5oy3hf',
                application: 'lccvq0ezt636mmvl4q3t82amzb5mzike1mw8gol5z5dv0pft1n94isqu7wzy',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                
                systemName: 'kucj39pkvo5y1dityrc4',
                scenario: '6bwhrxq4bn40f0w1w0gsxxwure4kyb874wa2a6ajn1nk42zk9lx1hupch80l',
                party: '6v75y7ehxjlek9kxedunpk4ru37atz5usdkrb849pntbwkvy38tibfbuetdoe5o8a6khyk36ro90ovafod8ui29x0n1gyswmtha1ols4s6udf775ylsj8j55qztn1jnb9j9l9zguvfh09i9i8ziyrrssj5eetins',
                component: 'wvvawmec0z5tr1s1xfgavpntk53dpi87vy6c7mha895siawizbm9hyr2obao94qzjfd2llaz9ysab2iiggamfj5a2ieldyt0qyi71j1j3h43ozbwxv6g5gl8f803eym9hq2jmhdfx8e6ygy8pjzkc4iwb2m0soh0',
                interfaceName: 'qho5qb3nnj8nw4d4m0xtg2upgov34yeaskgq4m2xwvjdsbmfoji6lmtkvhom3pptgl7tpzwtmo3wrr7b9zd0mt9kp71zq15cg5ga5b8nwo37fad37ojr4kf18a9pcmteez86on6vldlm032hklq0lcernr63myd8',
                interfaceNamespace: 'bis10zalkebh7tadyq5keqs5wat8lp53rm4m724oxafpz9w1xk3s4vosg4s9zyxpxq5ryujvytbcqimj83vl2gl2vpodybcqs0e6khgy32vvnpwl9xdr1t37pkz7pjbr6c1vww5afy9cmst30qc88nwdsz5te68z',
                iflowName: 'juic1rdb7sfqfgbix80c164labuyyipo9bfp0cezrln3phst5iljblvdv9fzqa12pgkshcnqfbkv6hucwuk3mvtwv0kjxqe3c3dgkvnqelh4q6jwfey1p53t1m6e1ilve3jrgtn1a1bhrpf1vzwomliz21aoaie1',
                responsibleUserAccount: 'gytych45dcy3386r6iyj',
                lastChangeUserAccount: 'ptzwzozyhn3we8ej280h',
                lastChangedAt: '2020-07-17 05:31:32',
                folderPath: 'xs4pbetyi4i28e91vardnrhpwlj1q0txuuo2omf0wwhn4m6maagne5vpeklcn2bup00yfquh41bwee5lrzcpmxg58rtos09an9yr3gxk92767orgciahysbsudyq0mekqukj5ds32dtx7rs4h3f9fdfnb6y8qjskeo4avwp5o8ivlsz9742y2kee3qj8ouq1irzi884y35aug7g17nu0oi62y923o8uwrsx98lpyil93qkg8zxpajqqstbghar9',
                description: '77qm7uvodxyezfd7uoi3dwqkmebjdm07nvde1bvpczr25iocrbdht9uycw4dimybqrwqwi127l4a41e30873oakgllsrxjhct94yr55baxmjgtd7hk2zmkiw4aj14xzratwnxax8dojlc3tchzqay1ln7c4hxw7p3zvw5v7ayjb26ei2nzw7tav83ras9yc3kyx7e8973t11tsqhito7kl5t9cjkrlebairdjqs5839d963jqzxeszhc6cm543p',
                application: '17kn4zf1jjzp09kbsvzb6lqb1t2lxcgialbyqpitz68dhzlwiigz23f1dp7t',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: null,
                scenario: 'k03lrhe1r1zfbepdbin2buoq0b1eu7c8mvjbjx3138sov4ry4y58aoonohfw',
                party: '3mlq2qo74ht38bfrnuzyr0707zbyre8opruiqjhuy5qy1653o17drhzitbf5qvxjdbpovhmd7hm97wputoyiq0nz4imsz3ac6ugapj3ipelihkbp0xxf31c0omkxdnm2p0y3u1em337aq7cnw0ag96fwhn0h9nmj',
                component: 'qawqj5vmm8ylkij765wkt94t0ulhds5knky9woagyeodh5cuf6c7i45l5ryvhokqzkbj914iwkrf2joryyydb8dkirmjr82oogb26it13n2ba7oa3v290uz0a6xnqajcaf05964qztlq3l254lbvfvseat2njtzp',
                interfaceName: 'y36xv22ivibaegsn18g7l9ia1hi4njodkl5esyflhbjfhqx5pgobprj7u5n10uk3olofbmnblp6coorjv4asyebpd3rmni3c9q7ap5ipxqgr4a6dk2e1ke1383v2upk6qsub5xsw76gg1tzin2zxnocx7d1dftw2',
                interfaceNamespace: 'biz9el9fq1jgk8an3sxkx36mtxsmtb7mb9lqa1235xpxoptwkqnkeubhqefzvu6wklbwg14xlokczqd4t7caukfxip4d0l2vjc83goyfu8zyxtzs9ss33joqvwncw5eu47kz4228qfn3wf5l1gku4dpu8p1bh0en',
                iflowName: 'x0589l0dmovpmnxq92fmiq3eu4zzhjqpezzz70g0inbxu7uwu6vz8adcofkiuxyldrx76w27nrbuj86jnx3opny9apkkyycgcra584way8xf7ox0ct9gb0mj222mmhylls3iyn46x4yf6qvps3q1weryo2lwjy5t',
                responsibleUserAccount: 'j3nr1sxnw5g9ez4f4cli',
                lastChangeUserAccount: 'kmmjpm6ob47uf9j8i4g7',
                lastChangedAt: '2020-07-16 20:34:28',
                folderPath: 'dbf4sewwrktnz4zjrbmx78jghuqfvmojzd5rza2xieaho9g8clxkgze6aheg4lw6x2qr2zf0kn60gm28byh24mr0kektvi6z92nh1j9w0wm56w40guzi638bh9d3vha5h6jozajr4jqo0yccd6vdh3b5ar119wmcux1kpw88n38ql9twa8a9dcrxxahbvombsgpz6rq5e28r5hnquwi098ct1mm5jpabanncj08bc3cl8us9t0d4ewb0k76tzg8',
                description: 'tne55nc2gnpdj0itfzop1icawkrvkzyf2mum3wn78pp2zb3hox14r8vswyg7po6tplhxxbwtmb2ni5jn9le4zr16k288y8627pxyfgtfrb07bn1kchvp06vn3cyuej2gh3k21tgj5evcu9osb9jps96kkca3ivrmim2bspap0ccx2dxshq9kl0oylkveejow5097ps1640yzc5a1ccs5ak5i170zxrou6i23q7a5hykcgyaq8xybkes1povuuai',
                application: '5nsvu3scximcyuv0m191t4uubiugp3sk6omj1eqp7jntqb60ccc4oy14sheh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                
                scenario: '0bffrwksbkm6ugxaw1f0mliqqokoyiq5h1lcs7u9wz0t2626ldrqeffkrvsd',
                party: 'w6d0gcfpjx74nyz1q6ri9ips8wscfbmuam9iduoew0ql3rewp6jt9wckt3efxt0yjgpmm4sefxkdrhumz3dl15bavd1fn0y591b6k4jxgpaxgui6kawumum5hmiv5ou6vpipho7vjdj9u37zm5og2fzvbqnjz89u',
                component: 'c3qmptopd6chln589y1zcq0abo0nawg3359dci4096dr6zf146h9dbnx0dko83621r8gjl69xcb863h6mn0br7qskztt6jt20hg8lg76axzzirhmw5etqduugmagzrvky6ayksjkw5c5c6ryawrufh70ty5r75xu',
                interfaceName: 'y1pm67p8cbyhali6u0oeh8b71x49iik3p93n5kxb32judbwf374y8iejr69clwesnsqdj530u3hl0ce93utaoterwvm9huo8fb24wvsdh3s946e96z6n8oat6p8ubqke0whntul5dcusawda078o9sa6a4agj53v',
                interfaceNamespace: 'vozjni2gyw120i4lhno59r46ms5aff7hmutme58z9rlwnouw4zvmbsd393ro35rh68aqjr3wunh4s89shemybw97psbv9txadv1ik3mlii4birrziapeflwvf3vrxt2fkott06hpne2ytkqna61drmd2wvkc8yjb',
                iflowName: 'tuqd49cx3j01xqf5bhlb8gofm7cap4o1vwhp63zpzfzpe47ie2t52s90qzo9gczi2mk78muee8mpwrve9s7bk7cht2nqld4ffecr4h6vgy8bkt8yiswr1t1j1rqf5oppbr73q7ocfvcdlzu0407u0l1q7rkxul4a',
                responsibleUserAccount: '7amapv5lcehiubneakgq',
                lastChangeUserAccount: 'cijs9dhqb9r8uh0q0inj',
                lastChangedAt: '2020-07-17 02:10:15',
                folderPath: 'gza4bx0jh4r3l3ay8g39bo0itdo55cip13ub1fvdeyimt16npb0ntyvxug9d9pqhok8im25f60i7rlzwamv7zy65ubei9ur740bdxkiplo57l7k29w77lpb3ugwknliac4bhwzylwap3baeniubhr461octlevubed7ffcm36uwrr4xkrplbs72kcl5j4io1r16q60wspr5xrhlvil6289xau00s9ctnu0wwlpzhwouqjrcw3v2yj1vpyz1jb72',
                description: 'xnhtv1phz2gh94fy75ym3wurbpldndojp9x8mpdgl12ccv6ry4ga9wb9gknajxu3pvk38nyrfejsj4vi1h24nej8tzn3we7vz22spjtio6qhyxblbcp0sazgq4x7t75hnphhvo7n5efhxmipd5qlli48uc086h66mxghrsa48r4ofj4cxvmt2bgal6hdix3i4t1mgb4472toyo0h2sp8mrtl73uiwa54lsoprswy6l1mrwt9vzu7ldh8vzg6808',
                application: 'o8bgisnwnr3a0kkv4ikc8jxcgpzdbfy5dddrg7k1ryb06fj1a9jrela9ojtf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '0at3y1j5iqrprowa3ssq',
                scenario: null,
                party: '2bh8lfpznjazkc22y837nk22tyi4389u8an9n14zi0xcx4uej5odizsbba2bx3fbj8u08k4a8nmms2qrswte3yxkslwfriahf4sra9lrog1sklbcad51y41q0hgp0u2zfs0hwbuey98qm418ue9dlsztrorvrbf5',
                component: 'wsg051flxkhes8pzb3d19mahizv1vy8dnijv892twg2ht7twubkn3kqndhiaki7nddxow93vnx2udozja800gldmikk2d75vohb70muc4vqnb9bbsw0l8mun7580wg46cbg35toyie1psa7myszraod3cq8tygzy',
                interfaceName: '1g8xq0gkfr0llwwrb1kg9i2j2a7z5a8xv634wr14zrd2flkmg33if6pk4jbido7c6e2ogc7um01lyn0c4a8acqh6cpzutdprklutmfiqilso360cmtz5ibg0owspxm4i61grcaainep3k2ow76o8toguv17bcmo5',
                interfaceNamespace: 'sg5wfnlv2eljexg8mhhj0sxpf248cwe6u1143c970mrrrmv9c0s3dhuqtegfbapygc4p6oztno4cmiwm1frs2vt4bu3ga556itx2h3suuvpc6drr10nptdyjgfzu7kt2dgptdsrcpq6tz3k6etupo9nngtduu64e',
                iflowName: 'txskxpyzs6pn35zws947ru1r2p1nfs1zmkc44wfexjciejgkjkog8dj33hrv6qoivcl8x7w16tv24hc6ogc9n2ben7fcf8kg91ppie7jlm2j50uvvnbtvau43hbdz6x3ca7vgkzxac3tbahdolahcfa4udfe8fvi',
                responsibleUserAccount: '4w9ns24pp7l4kd6l7ppo',
                lastChangeUserAccount: 'xuu8xnzg9f779j824mdm',
                lastChangedAt: '2020-07-17 09:47:31',
                folderPath: '8cx9fsim3ljpnf3wykr9usv8a35w6fwtfgrj3kzglg3hg6y4vty9a9r5xc5d2mythlj93di0hik1rork6qgevygkc3wzh031wg5zuzforgucypszk8tlzd423jsmgdrnyjop87ipmf4kcqywclqkvpgjbb721ns4zsy4jdbtk010eixdko47nc4ojk9fl9fh6a8345mciyi03j2wzx602lac4bv9zr0kzfdwj1cm6jjo34lfukkb394jak55nlu',
                description: '2tkk5p1alv7e9z55khgzy6cu8p7ue648ii8bjmmklobksra2qlwgivlkx8zm85mzm3d8inron59lkrp95o0ataxkd3jmu1tw4pbbd3lggum3bdi1jxmpwn9ig7oosc7fphlz5h0u480qco2tf5ux5bcq23h139f7whlb4w6rfiawa7jmtoxv0wkeyo2p8rvfbi0bkt9wn6mexfjy6ru6oaziynhz2oyvmmybfbvnupmt241n0jpbj9mthgi4l62',
                application: 'ueal1supxtvb17lkj4xku9tsj43so7z5va11zsho7bmh2eavtxdwgf6m5eql',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'bzn5nufuhcoeb7t67ndm',
                
                party: 'q0yf2oi9zi529bx15a14kzo56fn7iflwba0yc6cvfkdcijjy4p9ef350cx14ul2k9ggw72bfwdm5smollll7rqkijizc7isch7lmstfjs6alc69eg2hvh7i8xdzvpu2f9hddiqqh0g1kv7q57lmx9252sd81940q',
                component: '8x2k1w2286yzx0i4l7mt72b7c72xaooadhiicrxc0iuiepipp228dmu3hfgornol4tmlghqqy30q6pde3juknczwhuk0n0bhse68rhw05r37bc2d9zb2fy3lf067ty05c9kmeyllpmeh4829j4ldlp33yshh618m',
                interfaceName: 'g0l9in6qb0dr9iw1xxyef8aj31gunlbtm0u24z74w5bppplwzhmkj9ee0ghnrpr3alfiuro4zn3t2a4hpzhzkcdi3vvx3k5idck1bj4pju6xax7x1k0mfuxf9eq2orhx2zyz392qx2woklu0rd8djod7k1jf4bc7',
                interfaceNamespace: 'wdic638i6s60mevfrtsgs2rbs3tpkzssfgfearkp8uw4nnejax6rzcwg7h95847pyix5w552lxt48w8rpcwv3769asp5bbydphjlx1tn6txw4c2z0mi4r2menrdrwievtcwpw7tw7rpf48252kzq9elaqx5w5f34',
                iflowName: 'ptep48rvxlrx1e3qdfryssygl8n1fq1zhlaj22q4jjwh55mom1d63962owr6vgf9z5sb1xjgsobbx2rruezbr5ugsuwu0k7p7vpayoneo5w883ifnejc6tit49y2tt9oxync7xg018cmgmo7e1a1r1gnpptigwz4',
                responsibleUserAccount: 'wjkht2huvszqd6zmc1df',
                lastChangeUserAccount: 'q22qv4f2pt67wzktdggz',
                lastChangedAt: '2020-07-17 03:20:00',
                folderPath: 'xew49ml9s4iaiubcqz3985w1zf13b4qgquak5tm9t1ogjja8o911d70tuepabqklx8bbcpam93xsza60hmcj0llkdne8hwa6klbaqa3ufrnqfpy9o205z062loc857hbk7txbhwc1n7ryc460y0eop86jo3j4en749khltn6r5g7jk0ma27n57kgtel86nrlaz4c297s8zmj8w79ersqc89guxq7eqyfe013re3zi13c8s098eg80j88k7pnimf',
                description: 'ozywsb6noztvjmi0z7un5jz0bq1g2fg02lnp4j4rkoe7cm3r7lzrngrh9mx6677kwgjl7gteqxjy3jisa0t1pozvtc30wxai4plui6wd8nzqg6kk93eiy442yknkzyring30o1c5jno7bq19cy71xpyh9lhnlnntdr1svct6q2ptqpmnvuf9uknxnuuwgx3j3mmg5lxcnd7x8u9dpsknrcy02pjdd08yru7c3mk2k4tbvnudzni1rypr655d4mw',
                application: 'lyrtoa8fugtvo3hbew26plewquo354uo6jsgjac49oqkadmn94r02r5yhd97',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'kz379xfkjpa6716mxlr4',
                scenario: '0bjtzxojpn58tp3ryynddeua1u3h8tilqe02hrhc8c5itybxrljqanhg0alq',
                party: 'frb1ksxg2e0ufb42dh3oqb45kpv1qstzleqaajaoeuw2h6fag55k16mhnpkm2qllv544rh4xxbymfmo3d3c98qkx3ghzn4swwjuy5lw7ghe5c58bhe252p7ppwoqjfd9omqyaezl0cmajdtvzf1jq6mjd6ku396r',
                component: null,
                interfaceName: '6yce7zyo5ek4rs31t8gf9wa2ifepy94zgnqwnh1bzpsn67e0vcamggg6g5jilkzvf4aq89vdg6ai81ko0vxi0wnjoeapb10eb1z7kcnccfjvrs1jgv2dxp3vgsd2bnw6c01c0gkls620mh6652ac3f1bm265wwor',
                interfaceNamespace: 'iz17sae6hs6yut4qtgpd5c0l5dqlo2erxnnwprib855qma4guihn96yyurls1j5z5hso11ddwuw2te53ue0k0m8nisao2nr5fnxif2cqc84qb4iz7vgddu3yx4p5um5v9i7pi1zxwtf7yq0uhdqmem5b0eqhb1qo',
                iflowName: 'qj2or85uyxuqvm3u25gwmcv1mbsqkyp9h3fdi7s6baftxwql1cm8f5ntwlaklo9r9t5rkvbjudwdjnjbyt2q0ck0mxo625qa2sltex8923x5433jd2bq88ywal8s9gzrvj7mpnutonyja6envammr97f07gbtxq7',
                responsibleUserAccount: '1wif8dn2ridx3xwmzmpb',
                lastChangeUserAccount: 'xwjawxtk6hsa4885i6bv',
                lastChangedAt: '2020-07-16 19:31:23',
                folderPath: 'jfvq17nw17rzeklakmt4f7acz1iwkaimi784vfbnzuxowtqgzn83s42um17mzt7cf26vi3uuktg7xrz25e4zcj9pmdavdb673ykl2gh2ei0xslgbbs617kwku9n5zxngnl8ns8gc159x0vvpoui6824hf5x57vptwchlz1lcyr5as0mv9cposfku4rryzmfrpvbn3jpn7mxjj13r0fhuug0c183t9xx1mobe10xyqsgk2zy6uyip7zfnx4sjf6r',
                description: 'g6japn5eo5sf0k5pcet2hlxafb48qvi37m6hpouocgn7knstjutwy8lt937xn1aycrp5nakvp6kahcsat2jiokj1rsj0hn0p6xrf5983xy6c93ic8xwlchxa04egku7v9neovfeawe80ql7z6wmh897khxcl3ahtd6046krqxggzltkmznr8qrrrndqm8fm37ke4a8db3y19qjkjgdwvz492ujtshri14bfvvcmqdumywq68w84753qdnfly2c1',
                application: '33l0nzf91dph9jhfc5mk40b3105ekkbsvjoq7dv5t879psv2ec1ljlp1ragu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'qd5jm163mp8gcaadm9yz',
                scenario: '6uiyvvscw6l7qw761mx0sv69zv1mtmuepo6rukf2pj1clxijd1t7yvi4s9fw',
                party: 'bpn8ssfn99wj93ouuvpfnjn19lsapt9eis24i8pd4zgvn0mb4e2tkg62zknvewwlmlptkfwv8x2ra6074alaa2p4r3hpc83qiugr9ph55cxowsc9l1detnr2un7ztb7een5mxnfgdi7a0x3587qudw7d36kk7nte',
                
                interfaceName: '5phoekra8ye3ilpcoblmn45ux62kecj7kh40fhchi4wkyuqfb5o1ztu284kdwj1wgi5oohxejvwjokcfiy7141tyf6aedf7ky0t7i68ne1zx881j7ofjp8srf2fs9bmvlg18t5nzi3vqvrwb2chczvqxhtdfb30a',
                interfaceNamespace: '8akg2saovq45nvcb76b6qa51u7hzokieerf0opk85giwpi1vw5xxjzes8mgehjcf9lqbjf3ywpkhgy3h7rnx6lewgj7b17sxm4qkb8uc9ioocagt1d27w39dulnf8ufwd527echzl35998uke572q0r2w3zfwh6s',
                iflowName: '3x3stlm7x4epb18vi4657uwum8kj3lv5oqygcpf29h13m8zrcbhkstv25ytewi0xdnrlnspn62nlw99wddx4bf27n3wevh8vmy38cboqawe0ndl9t7v27tm7yaap3vrtr87cr8r1w1dc5catluu5df955u1bf8aa',
                responsibleUserAccount: 'vv1sumqp0tixmbmtcdvk',
                lastChangeUserAccount: 'xddhazs0yiif2leriao2',
                lastChangedAt: '2020-07-17 05:15:20',
                folderPath: 'ixcw5wg5yqynhsd299v53yvds4577rkgkthfk4atji4aj1j6mp1asin026s40svb6k6gcmaxnpg4sv01sq8ww2kpg66gf46o43uroxanqfl66nti5xqcib2qxal9l0a84x4fddnjoqp1grl9mibbr60k4osmuurnw96gzmqx8palmeddztjg7t9eoy0o0c4znbj4bju1a2b1ccti7htj30q4wwcmw4saqkveewg51a07b7otkky5t5sx63q0d0j',
                description: 'en4fbp20i401mzugxy696zx88opnjx4egy9hnpyjvqxjts0ngjd0kv7rcj3hap7dwlv38ee4szyhhsqmmxxhng1lfflzen9j5xarnigfd9uci07u1triupo2p1x0bb0v4lbq49hlp8ld8bo4tfbnkpdu7sxomy141rpducp8xxz8euf32ixtg4a9wccydvkli2pckjtw2by6dik7f78al2tfhp89vtj6malwgrvyzxgmd2fmsojko9p02d0f3ze',
                application: '0jieinjuu63k2tb6gtl4g6jw5zjmx8swtaku3vw8qqomr3o4hnf34vsinvoz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'mt1bic8o6f9iygd606xy',
                scenario: 'mnf9wd4abw3328fnzvn8yzl5vf7biel5f5nxy6cdm02vho7skai3j0dcog6e',
                party: 'u1jn7e7d4a8hmwazb61t35hnh92eocc7aakb52ufezlhnr9uyc8o8da7eq6aop71cgw2get9yc1h7jcvfd4tjamhprqrc543r0tftwkclxo5od6eqwrhezagfklpuw7u51jsg8rs23qw3w7m7vch9x5e0tfe173k',
                component: '86sq0k1f2dgttug6ak6r3nuqokof4gwq21dk5puigl6o69dgu3qbxfiemk40jmy4szlp54pltlql8s2n78wd39ki4pf1qit3lxvtwkf9n5p0aee9n3fkyi4bl8exk7u3yywsd8gstzl5chmt9miuhcvfy45kf2ym',
                interfaceName: null,
                interfaceNamespace: 'oyhvssnpx266rotnt4v70zh8b6cy7ngpx0su0nhu6o0l712xbiv9zz9rsvopkw5n77qlrgxg025fyyusrc2ouka2whqxuo0ci3ryhbpadf38vjiyc747klvu42efljtwin3vzhyif06z67o7i3euwazpay75py9e',
                iflowName: '6xyum9u5uyzzuxx5mns4x68wc2xsf5bdht6916sh6bv79cqrmz9eco1ptpgh2limfybq6gjtr0cqc19g2yzntauq19hk1w231c7wh3j7d0ra6ypjce3mn3kaubho0dvoav6orvg3fntuytfqwrg6j0an55tbe5fn',
                responsibleUserAccount: '6e1ss6zwq1q8t9aqeimk',
                lastChangeUserAccount: 'f5v9vx76iixmc6j21b9w',
                lastChangedAt: '2020-07-16 20:08:53',
                folderPath: '8ndjs7lb94mik0lmaano7sk25rbvy64zc9gyb5p9qqr64rc40c3z1jd6vpv0mkt60kvnpawf8towoicf50x0g47govghf5h804pzz0uk3ao3h7cp7pijhbcm62c47isp0e32tpsxlapkfufvxp2mnr5druzu7nuod6uau7mmk43abm52adynhdauj9xl7li09cobgwbkyx58xggbz3r8xrywpaiqn0bckjg7n7y8h1pxbwwe1s065ymngnlxwc9',
                description: 'zi07yxu2tzegyu7zu8jye8tgmk8hew8yaevoqa6y3zurm77890cc29waixtf30mvde2gltvumt5vpkgcb0casbk68f5tuzrj6ejh846t8b4ivfgieln3uzlfnhidit2lstxu82qwte74r5u7kwiemdfr4auif2y3splivvlkyzotc5gsewrmcs72o1jxcyr53iek2jwcrtgc4s6juphuqn0thqzy5gilyvqivxtwsm9z1w3bcffyezwx2vhygga',
                application: 'ukveaus16cq3hv2f78e4ls6h6j09hqs92qb4p1l77lxg9pfgr1y6z156te4a',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '68xvptv4s48gzm96fgcg',
                scenario: '9irnjrklpgjh3zmlsbimel7gjwn2yl3fiofn3dxbt4jh2u36e7axdg1g9iv6',
                party: 'eqjldqrkjwnxw32ir7jhwtl8orzheoona3smir0bitkxmi0aonu1y9wn8xyhxjgzd8pav26aa38ycwi8l6v4weiohoxgygzg2fox1vfku9r8ziauh00d1477nx11r75o8lhc8f5y14kbsxaicl6jo7dibbd1c4o4',
                component: 't6buhrls4xoqn25saevd0l5pffwe03iagyomng0ikmv24nixepm2sob20w9uvug9yavlpkkj1e6hkdi3e1kys1gcc6lsh2lap9u8x3q282olsa3ispjc2drq63hufcv6i2euta9bra0eetx1twm1fmfim2dxmk90',
                
                interfaceNamespace: 'gsty501bq1jafygy9rk96koy67pwo1uoahjt6lxpfjcxa01284dget4qouumnkmc8t4lwm3f77ucdxezk6th8o9jjy5e4hd7qvqy3xotgk5hjiob1zgbbcw0e9swoaguq6swcfia8j5nzssuab5q3gnsgekl26sq',
                iflowName: '2jhsk39dbprupi9kxck39rgnmvzsd1pduby1gp7vdlqc0x573si1xrj96lapmfhdnpidzrx8l9sc64osb6xg4c9h2cmkdp5ufdseio4jkzgd4jbp7s7jd8bq7v5oovx6behxu9ew5i6x140f9sjoj9laly0umrum',
                responsibleUserAccount: 'w2hs89c6iudvp8sqikpw',
                lastChangeUserAccount: '1ur2p4ur96e5zfjgq5qs',
                lastChangedAt: '2020-07-17 06:21:06',
                folderPath: 'rj6znlji8ie6x2gxzf8brdnik467dajixkisi41qbnmssodwy86opxork43sxzhy2kn6anr1i4fwmdrb0ws79dq6od54v5kfrmaqe7yuz5926c5tqp8asy4248d2ikor1ukinxyi9vddc7sqbcjj01plzzm3vdwb97pmien16lxqcv60o3jvsg5bt3m46ewvhqrp8eyqpyfcxp1v6przsmceem1eyao7r1dommncpab7d8vgixvlkffc8jru811',
                description: 'jdo16tdjrw9rc03nlayf79005t1ttyqwmf1jkue2xyu8owe4tz3j2bgx597c0a8bmpf4v2q29pu7h6j7xk3b4n18x0y10hvvn6kidooqqdtp1mvpmvx3oz3gz9tepaguhme7tudmu6e0hxqr5kozqo9uzhbzp5ijo2jjwbq8zynmpu4rp8ab1y4lw0gvf0sxnsgjapcne0hvvklt0uk0chhydavlbffuoxktdlziexf24rtsqqtlh25i3jfoirr',
                application: 'kk6ttz5e7uru10j5g8d0b25f2ucrtifmyv4fhcs7b7sfkvlcigi8s5wptiwl',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'f0fwlrhbjxwqr8rg39ok',
                scenario: 'msfgaftuvtmga5kvtwcp5axzpn8g1miua5530flgc0xk3z55zwr2x5lucw5t',
                party: '43qck8iu3n3h3tx0ulvji4hic3vk6rzalukb20bzwci09ce9chbgtxbvd10blfi3j0infimp75tl1b9zp3ggkqsfmvps047obypdhzojxegkm95otjqd3x51kanq381sb5pxq0bkbwp6iumia5bzwa19nkq9rx75',
                component: 'bey3w9cgz9iddk2sbuqdgz95lsqhyn5m9vsmoljxe90psstfmbuerywfoeouaj34fp6p29sl09n9cojpird47wjlrs7epyijzjyg7wqklpbra26y99xoxvoq7yhjeimupcejbq0gsdc2aebkbg33uaz0my6b6h97',
                interfaceName: 'jdjjj248ta5f4jpy54pql7teczcaffe0utjycmuxsljbl7ep6c7kid1ea30zzlvy1ijtmrjhtnsksvnb0aw1sr3njpzsb3tufunh9t0fv6kci4157tk8u3jz27avdcdsdhdfkhm9dcsxfugygyqnu9wzmin5xzvo',
                interfaceNamespace: null,
                iflowName: 'tvjeot5g8nkgpn0qym4watex3s0urzitjkid0f85cnq93q1l94igu8bi5i6jk1xqd42jsq23m3ww417qb4g11zaz5lf2nopukesdokm6bn11q13wfqhfa3i1nzqduuho405b5xt8yivpy266qw71gn11zez7ukps',
                responsibleUserAccount: '5soiv11ri60pn4p3qfo9',
                lastChangeUserAccount: 'frtvz391mlgfph1uyo2n',
                lastChangedAt: '2020-07-17 09:28:24',
                folderPath: '7jcqqc5nmh7la6dfvckho2o9ba5q5lga1vgv538gkwawd13viharxxtw8pakr7tiq3c7ofadcx3u6s7k2infmig47luixfgtfzv9z732nankuvuz3csloozmpla19leuw90zrytq5tl71wwnn8d3e04fmwiz7h48kkdn44t3o1mzs7ktjuvzj7gy888vlxnxnnp7pxv1anm19n9jd6ifbqlj03xnd4cpevpius3veoq1azw6b5x2kpr2ivorkag',
                description: '4gl6ov9g8r4yfv2m0qvlpo3k711wox6tm8swy1aipuesnhgdkdv8wvc2yx8fo0j57zyqra4y246m9cgtcpks8498osm33du67j75lhgspakj0my7nqo99n6c9a3fft9krmgvbme4vlmor6gtjr1ghuhwnl012trl57bonlohrtfotmvcdbkf04haptjq3kvy8fyxgtgiy1q7zgr9tsvq1urwk1xtyf18o157i84x2gcetr4hd1a02ix08jkktwu',
                application: 'ldr1by8hwjinfjnrap0wrfd65ml3gmkujrqv6ckjmlrcg02m7hioc90cdqjq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'i0i5ypg4m23xxtavdwfy',
                scenario: '79kz6kadwb3zy8vmtvoqw8m3x9bpscbldgixvsubqsxdwui5u8khwyocgxvk',
                party: '3t9a6rn2l2ghzrwc7tcv9l5b8zjte1tejpysf3om1cht2ldmhq4xwi8fsmbsrsa4wo4tfzfnldam57aj36fold63aeq9oajcr2f77nlgx5xmlntrgi506i03itfv4djb3ip5c1beu3ju6gm1ahawzyfgov24t16c',
                component: '93p6mx1tqroqe1awdifrp53fvluqmm4hppkkvgpo9d73x1aw98dr261tnbmugk7x5uuhs0xqaz2jna1915o8u3x398q20w49e0k61pugki80u04vmtue8hty7eqtrufsxni0ktektsjfxdtkrgxm3bjh2hnpsd7r',
                interfaceName: 'e9vxtvjrji9orrcice41oofi7lq0gvj4u5u25z33dytrr2lgl0jad85dgznyuix0kdap5bxp2pjgz40tk1vpywmrctmapc3rlxxe04ggolhhfxhzox7cuai0a62nkg32s26bh3gcaf8v6ne576r9ii7mdmt6rde8',
                
                iflowName: 'camg7bo870np6y2jh53d5hcjqxpohc3uek5um06o3p1dc6e913sv1vv01uccilmigwjudgx52p588r14lje9kfjrvlfvqrowya9s7e6zx8u27ahfmzz3207z163ylemgmasr1a38sn8964n8x82z22g0d5biln24',
                responsibleUserAccount: '9n8d7gob1dqo87hqco1v',
                lastChangeUserAccount: 'gnfwh61hezvksr8nz9me',
                lastChangedAt: '2020-07-17 03:57:33',
                folderPath: 'l5c2gkjfg7twlvgh0atoevdcs24w95tk241lbp09tq3dstkfeobhtcgu209bto4an9e9w0ba64dc6bxxicxdqx4k7tl5gri8hrvkp58bnvd5xe2hzxa1cubn9s5yroeoumr3j3w4i0qkuz41upo8xzxb7h23o7b8lf2rwo9a46ef8zlasgrbejsxlgw8a8sqq1dg1p7fj6sk1qpkf3vt2vjd0yly28r2s2gb8obk5r55tbf1oz6ey8p80s4m0sl',
                description: 'y5lr53rdbmrzep0dzdt0qk6x6zab4ed0spz6mema73nucvgxmiln4raqziebu6e99bhi3chx2zm3kojpgcba654ipxm05h57tocp2qr7gw9evqjq543jo6n7pt15u8trgag7dkd71o3mdaj1bz41qm9i0j2y3epzfw6jcqvspnxl37w9jbeevp14003gzzsnwrcly4bfgsj41fbhappb3b716uqrxugdqm67bqa9ci95dpqsxpk3zcdo7fe0n1l',
                application: 'ev1bul92f6cugb66nrins4d1q9wls5ntznksblcv9f01cl20fthnyspe3ik4',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'r0tq3j4e079jie9n9xit',
                scenario: 'anmckfvqc165kg8o7kjwkcqgtzlk1xpm5lwdf1gfzmsft61mandx02n6rbzr',
                party: 'sc4okkz2t67mi7nyvlxvglj9vpu2lz8vh8bj804vozu82njwx7jhqxekocbq1pdfmpp53irqb349tgcx3ovw5f49tc911z1l2mbyssydvnghvqpo36bpioefa1zp5yyk335fy62hpep21pp088uqmtifedvou05g',
                component: 'yaem2738eo8vlbmgc1xb1oos6qvqwnxiv1p7959sc2595vdv4woca525qi22g1d9146zlne2jc5zv69ehvv77gh4ed0q6ozqy9vmug4zojavmivh41cj1wuhgb75goj9fi37wq2opepc67fl1ficbxz9o56p1047',
                interfaceName: 'opqxijpbstpq73sayrdszzd2s9vf5mrcua5c8pa2fa48793kk854dvj9eg9hqz88dp3icncngiej92qqu6ib736f5entsw3z5c6xjq9t3pn9h7uymirj6ajrr9kdu5ira0r1rmtubtabepgh9dp8rte623vnrvtp',
                interfaceNamespace: 'szy3qrt0xxi6rs82f3im7k8m2ecihnbtnwvzprmgbfydar2bsdws0nj42tektab590zhh8awkv16chvi3bfbq8nsb8a5x69ckm98ori7p2icdsjq3uygnj24hx7qmgetqo0ga494yylwpne6aljuijxujhl3tv1m',
                iflowName: 'srbkogpc44znlhg6zn2dd2ffj0lsm4bietbnfy4p6u7989jdodcdwlj7xv1kz27zuydk6aepk2n5xdo8yl2y1cxhxa8l0ibidax5hf9uzxjgvnk6heitewmkhrjxrlfjqcaps2zugtuiiv68vk8j7d3fbufu1sk2',
                responsibleUserAccount: 'zxygb8f68i66ykqzatfj',
                lastChangeUserAccount: 'xh454widfvaa624ouqpi',
                lastChangedAt: '2020-07-17 13:53:51',
                folderPath: 'p31cr3cz8vgjwy49xo2amea8g318p61rnwevn12eh4s5nzl76wjlaizvuykje892kjqnzaft7dn9yt4wenhre4k9eyqo64u6ry9udq3ptlfj8wwjnffsev016lfak4u6og3rz6frzj4oajmsofz86ecqe7v68uiq86orqcy9ynamc0sowri4ii4f9l7cxw0sqys5tk7mr8ayp2c9wi7zy99nk4qd5h5x7y4etjhm4l7hdepckzlwu7n7ih7t89v',
                description: 'qiaf90qgqvmqck48bq8fiqa16q967jnub44ouigcglndjogfnglqh1m6fcza6x9utivafjh5meaw1abh5zeb2dpdkscx1xfso11bp2ep122z32bgjn7s3nelxknqbgyhi0s6499ztmr9dv3js7a6lja4bbipbqqiear583zp2kgo97dgx8t514aa3e85qj10umi457tykotkbr3fymouzpbldinjmjl0g09kt4gdaz1gksk9by8hxmu2e0ox5q4',
                application: 'kxh8dri8gfzkkblj2gpb1njyindokxp1gjch78w9otyan1wv0xrc7iav4xxp',
                isCritical: null,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'wki3qxka0iyeo1otqru2',
                scenario: 'm612a5k5j18cm4ajygddo48k3aov3ymcnpz2htqljajwdpjk7kyony1agqer',
                party: 'z3xg9ir841mydja35dc9wtirchrgph794vo0ro8rmxahafupvmii7l3bmiqs1v0x89740aoxqpqcxod58pw8ian81e7ln6d9quhmazyl7g6hbteq89ak8a1xb54tqv33wsadib8yj9gdkffan0ywq5ofjnfhug5h',
                component: 'eo2iwjtrocui6pwseeu1pvl0m5ojog6jlfz8p33de9uj9mg3wzmryiqx4wn5ax41h8dvnvs0wp355x6d651jvvf77806oan4wtw6fznf6m8goyofcrntsyyjhthjit39tr657n8zwybjermx01ru1dir11ot7fni',
                interfaceName: 'x3wgrvetjsrkke0ytihzlfwruetitwy3ijid4em15ttsipt29b4wqlkzbr8n18nbftkg13cn0ujpir4tylb1f8uzfugafntbrioqp19rx69o9fjyq1wq70xfewpf0wt2swo7lelyizz5t25tymk857xnqf9rshel',
                interfaceNamespace: 'u9ho8div7qmsiqdfg62xd8ke8uhrbbf3o718cl5fzvh4f3lj29wfn7ks3kzv0s5dts5el6x0wz5g8pl61wxjdz2v6c7bxplpx5ersb2m8f75iop8zs87s8ux4v8nxnwv69r0ghagzt16k3thslzrcn5t66ejbb97',
                iflowName: 'll8n41c4ukwsij8emcgfrmtkknui1a3g0v2rq4bilpnmyg30zjp4266rt8w1ioav2gl9bnnl10bl1gikrt6nzh3lcgbe8t492yhsdf20t3yw36t8rbnscqulb7gra5u1wah6uoyuexjbhxty3mfizi8cqr5zqclb',
                responsibleUserAccount: '6vuwfx3fveeeas0ox7kx',
                lastChangeUserAccount: 'gvn9ag2c5oq74ooxqk6n',
                lastChangedAt: '2020-07-17 03:21:18',
                folderPath: '57n7su988qfxw9stpc6ozg6je6p0zc481jtg0bk7filgjdzn64hnvuvkyli7tofyozy8dv2vue128vzkfwhoygjkrfrfayal1myau0p2o2s3oxqwbdgn66jbo1rtpkuyef7w1w4tqb23x0pvojhhtfynvrzexqfe63huc0yn1cndbfrlbvcj1hkdkzetsjj13xo3gjlx9vwjg8obu3ps6ui4ex3aht7xamau92mx58fqkd8k7cdqim1l2mja05q',
                description: 'uew8a17pvsklwtyrngx6vv2tmap2yss5npb18e344q7j1yr3bht7dsua2t3gczxkmgpjezknoiyegkiponqash9pim8jnpjh98jiefxzxbwol30bh96t41x4revoowkvni4jbyrde8oxdy37lfrb8nl8joall59tx3fjilgxr0j1wfl52h3rqln5f6tqv3j2lmovg6f8w04dwk8mbbf6vf47ktcskeq44if8gt5v32g4zjciffea2c5bknld5js',
                application: 'hf8qwfinpi5qm3e9lf7pqzojg85jnsrfcuz9o6v9kkpzc1tbcre7slqd4tdz',
                
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'koe40t6n81oz94jup1mg',
                scenario: 'bh30vh2zs91xouvlgugri3yeqtijlrk3qep6qfmxfgbygig5z994a276f074',
                party: 'hpsi7kbzf4gbbb8dykbagspdzeuundud8zbeccknvo254jtum6rnw04vms4w8ujglgp80e5zba79epydm8ehtcgo5m4uvyov22zjtgouzqywznjs0x6k76pi3la3fro57izzqoiyg1apejtq5ip8sj8lhqkh0vu0',
                component: 'tcch1dpxm8qi7r8yy0zratpr493cm6crg8sl40dgk6hx70nh8vim78wokqdok7vho28f1tzb347qvpebhfndgan19a8ii9oc7wbpjxihktdsj4uf2myv083itxulizdf8km1l6gp5p4dgxup86ut7a8wnnhndhjz',
                interfaceName: 'wf8ax6fd8qb95ye2ug2dr86nlgy4zqxikqjxqzq0o7t2toclxckiss6strqekdtxoumm4yrr97sf1blyucdx4q2pfgwwaaozxg8lj90fcidxf5nzljqo8n6o3r09imct00ky19g327urdkzt0a3sy6486sy5wzg5',
                interfaceNamespace: 'keqskgtazx0lxb2nvjl3ivqthh1l15cwuhlqaofoy0lo9y36t87w98lnrjvv7961ut8pn9qn0tvujs7a1etfk908upmi0hyaa8gcn8ofc0r4xf5zuska7pkl4chklqydgeddq5pnr5yfxh2qcsa96rzlmn0feb0u',
                iflowName: '3to7et3q0nmr091xvgbva0w09uirf5gqbcgr7xyjuwxzjhr7u09p3l0yzn2lytoypwh3qqtqerkor2b19ylf963505h79de3mtkx3xbgcn7p7tcilz84ohcok19gtlkbv23fy5aiw9iyniiproinl5o514ivi0gy',
                responsibleUserAccount: 'kokdyawbov1d5yx4a81i',
                lastChangeUserAccount: 'rd29aryereu531tk21lz',
                lastChangedAt: '2020-07-17 14:01:33',
                folderPath: 'nj7z3l2g3s9tncrp24ofvgymvqhbtckcmtoligvcvh1baeukkxwzpc2ec6uhewk95muhdwg8156juujmtmkth6yabnwzllwohecg2f14h3hu0tz8tva8bmyqh08j37e3ki9x89pbqih9gsmt5p5lkijy38o48hb31yo19k11fw5yz3f9251gpsd8ig548q2hxvn7knez8uxds410t1ascyb6bpb4f8xy4wweaja67qcpaxzd07gqd43hooa28q7',
                description: 'mhatb3oy4j2z52lnnr1ikb8t05vek46ofswtb49ugxonpaafu3xeqd7rk4ns5hnpacrzkofv6zar9xk9f8saxbh9xhc2x6msclnsbdgasxxqwnpv1yhjl77n57ub4kqfsu84hv278d1ss48wentu4a4vidnes8zj42daxldrsnwjvzbvteemay75r1cphnolyjdsbd8l6l15wq98evdx4boybein87ql1m9u4olcqkwac9ib1mk271if9g897lr',
                application: 'un5i02vxlhh3y9p9i3b9lyg7j3cxfq5xq49ofq57jby73xsoo7xmieynjmh3',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'kbekz7qr6o3wcg9t1vww',
                scenario: 'k4mrr7vkcxpo65h75iu1i67txtrm4vhpeohipgxmmnaurt72vho28w3bb3e3',
                party: '9xdxv8rzd8uejneolkrnwy24s57eyv837m69l2eddu3hw05g5g3iwwolxwnrb8rnlcndfdp0zb7p73ou5x0fe6dcpt7obdntbzdq907srm2kho0mh1zz41ee225ys4hjyy8yuubrtxjm332bqj03r1nvk2b2avr0',
                component: 'rxal253q8q9pkxvcuotrfwffv07nw6g0vo1v8l4px0fn88aldzgfq8u0eop2tywem7g349gim50j5rv87fgu9tj5d5893nt71iud2ibyx2borceeizpf2k8bc5n1u2353jbsz9krqkr4szk4zu6ix04oiw5sup6q',
                interfaceName: '045t083rrhrpua6pndnco8mq5qeo65j09jagnehhj55k41urj680qnp6ttfmybxalthz0xxdu3pcjezisfzd1qxb7osrzl9c0dqcnd3amqrif8dgsnru71vt6shh4um785nrtlzhjkc2jmcfwgcxhy599ndso5w2',
                interfaceNamespace: '6w7bgt0rpwbs52lk22dmxhihfwisaii2odsitzbyk78yippvpg345vzgqm85m5rgudioabpigvnor377t05lasgmloyhenmazvvvn3dbcc1zuxykfqhpr89c8nnf1koslwd1knsqt3gb1sv9g266yzs7pztnddrb',
                iflowName: 'bth19f2ub0zrszcvae5irwbkd8z4clu0h8kuwxtdzpnemoe99xg4dxhfeuwtzg2s1mnffdcxszmfog3ufjsarup8l1cexsrtafo51hmzk10vu5xklqrvsmf1gtef99qnirjssc3874hr1yar2btpvqblau941yyb',
                responsibleUserAccount: '835lcqagh87mm482edng',
                lastChangeUserAccount: 's4oyo1rr0uzuebx35zxm',
                lastChangedAt: '2020-07-17 03:52:34',
                folderPath: '3pskm3w2cce8qtuofb034rupkhkbxk23qitfqcxlsmd7n7nl3q209jyophm09ohkxo4tnrk39aybfo3xq0f9w9880l8rn5jd4b5fgbir6rdro7pc7taw74km1w8o0kyqykn46k0wq0d4c51dkx34o5gljj6cue2nx845lrepwn8m7bxnxql9ovefjbzo5dbe154vq96ezkzpkuiw1ahqwwcrwe3gqieby44knbzy4t1k42idusgxml5y68ee71k',
                description: 'mgczgby5gdb80qhhcfaqe4hq82w80c10i1sdy7dnp4jil3sghhix4radrmenfnh0s9gqa95rcoikcvsiw0mj2njdjmbypjdpbbxg0mtgotvjkfc5k9f37na87wrmet0hz5lipzli4y7h0jgye1u6w0czx97g3gzkpvbno8qy51glk36bggxkvo3fa3k1ppqx4kkyygads7s60avfqwvbnnrhbh39bt5vdhe3525z8zei1dfvhv4ph9o0o85h49x',
                application: 'uljvcwqr2ovnjxweybk8qaadz7c4lvg2bhjm5uef4kctveq4nh8glkvkuycl',
                isCritical: false,
                
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'ksagmbt3kcay75hzch9za6zmywa57mjxgji12',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '5krj36iy8xm8s73y8blf',
                scenario: 'sugj4xma7joddqnycmbtog4g26x9snaiqlsmp2ek7kuel18zeluexpsk8p4m',
                party: 'wmprlyammtz2y9nlit7hmqwh7t02jbz1f7lhx2wt6qxjclroae46my7mpxk1c7w5m2g5r1y9ew51nzpfqcq9z3j9ymt2n7dfedb9yybpcyskz9175lgwzlnnxqhh046gdahpg4sfo9xsy1rdk6y4znbi22eigpya',
                component: 'k11pcrl313tgcunqy28lrjp1mia70hpyhrpnnt4i5nymonb5ee8t7yz55hi294xgnb1boinmzr8wh1rgdmcxclzltp8nyooe47vw7sk2eor6r7see6dey0m9r216kdyi2wxpu1rh2hbx8gbu2mjwpc13bpcuj6yh',
                interfaceName: '735r8z7x7gir92pmrbatp0oud10ph2i92l90iop6egpp7jjzp2vok7q9in2uk33umz1xe49bf6oegvmv2q1yoen6yp4ykke1cn62bq5a0hpv9bdpea19a3nbzf78hx583ews5wz8iibotzncaiajnk39hfmmpaat',
                interfaceNamespace: '0d9adw176ixsjrhr0lerdh7ev624cyovdyyeo0irh9pues6ae3sppfzry87rkfqgn7xfil79avh01neuiz0n32m19b2xlatv1q9ecwavpn1tef8ymz4rhah70ghggtbo8k0amsbz3i6ebesvp6avgarcwtf45qu7',
                iflowName: '5r9cb8ko6z4ouc0bzb215uj3r534nsfctpykhq3xsblrjq4tw7ytr4aug7gx705xbyyr52chc92v4vaxwwq7zj692t5ay862932s137ukmmadyj7b8m6zjcql82i60p9z0axsvab3lnen1fxof3dn263ko36w2yo',
                responsibleUserAccount: 'zb9tty6stwzob5jx3rl0',
                lastChangeUserAccount: 'pjti06fi3dw98epgsbep',
                lastChangedAt: '2020-07-17 13:23:45',
                folderPath: 'cdnlu0mj75y1t24hc9srq6xfel08t5h18he6tp21nkq9utffc23xqmc0f5pwaspqzqwbe19bw9wf7gcwhy8rkwhywunbkuzujd3luftyc1cb8614to6n2zpubohpasjzty69s71hd77gaal1qbkesi14egz096mp2m32byn8y3232kbysojhqom24v1czoiis8ito7qqdomwvgf2k16gdlvt1fu173w9tocwg5chjy1wrzz9gfh93e3krmfzg7x',
                description: 'jx7cmmaxkjrj9enzc8w4o4o98uf6bjv62esk7qvbrjtlix6xbg0tyt6cbreux9vbwy8lx16nd4kmnhq1vnuhwvhvtgg8sm51z3zxg8zf2ptfawb3nsbw16djr9pzbvtnyc5twzr1xzstlaikpww89eni36j8pk53gze1v7z0voxzvj5e4hkyd62uyyhl4wvjhh7wtiripnxvq104fsl384gc10w8arz7x5ehkd53yavtdtvmk0swtyi68z6di9s',
                application: 'nsyx8b5jfjyrtv9g60qq2ujnfcvxqvl2m51h86ha0r4wnslswztj4z48cqe7',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: 'mw7nevwakulaswuo6qskif32huje5lqv7rges',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'w1f49vjxyliccsu1gdjx',
                scenario: '7n025hylqqxcibzpr2bpucn0xucwhwgxzvea84g37ocopak00yxfgzkio4f3',
                party: 'vlo1i3u3bev2wr97cri7x7ra811izjpaazbj1i7fxy6ocoh1ao9vycfdhjos08loq9vlr9kdrs1jtaja5polyrypdyed5vi3ajqun0ncn60868xqcysc0uk8s8yxlemc4cclmwiuf57lpo7i5kx8ipwhvxscoy1t',
                component: 'gbxkrxedwmk11nk5brzpl6iks3pl07gi7no7vrlgm7rb2k4i6in8gc84271xc9et10g8e6etaclw4yepnb7mdxxbcc42y5dseln7hw37wybdel8dlcrakla34r2bhwnx0wgrsbr6ifdhk6oa2fy0shx9qf8zygyn',
                interfaceName: 'd4yozu154fdutil73xkl5cikg3gzgp04blh2cgy7mzerse376wdfyanlb47tkt8d0jvhc7crpybakmvzue0grw0bp6azixeke71m0fwjde0f2nepshx0ln81ov2vpvbhy2ub0owbycwzkqvs5b5yuq6p61h4v8ex',
                interfaceNamespace: 'brul1kcy0z5xl0wgiew9mjrien17fvmkrpj13b5ft42any2ltk4lye5fr7mzixb06gti8ggnjm592i2yrqqnypf9e9eu56o0zal67srxdb5e6wpb1gnrqloyu891rl83pmqvgf6xcy8kv9vfj21ypkspuuqvmn22',
                iflowName: 'a5vr7m9qu8w6pu5u4lz2cs9undzf70qa1ov2kjpditj0oufxw2mccmazrdgtryh9y4v269rbyksywoh26lim3g2qau2nt85a0mdk2qowqtnz7x881yfwworkqeipazme3sc5e42qdqfd6j31wujvva0qln8n9e03',
                responsibleUserAccount: '6pl45yhkhbg30fvhmcze',
                lastChangeUserAccount: 'ww1bcjmkkb24m8pr86xb',
                lastChangedAt: '2020-07-17 11:56:20',
                folderPath: 'us0xxfmrk0makk5hevj2oaea543pwrx1caynhwaz1reytw95rus8zf1ll94151ssd628yhlrod3zhw12s2qabl23f0w4l6j8glu9dxvxpfzpr961nn1nmco8u3zyxhw5un6n7co0n6b65241jdwcfwhh8333sta5k3bdcldhc85hg79y00zk1dl6bmjhyl4ka38336zunaeu81es96c7ca4kr7rbtonk0eg69n49shrh439o6owp92bpcti6xwg',
                description: '9z393gdw5aflznn601990fo9lvjx6pj6r3z1bun0b1qyoabjeqmnknf598knxyi68ig5fpyc5nc9bstb6ozj0nyxa6hfawkjh4zib55hvlxr09dijk3msf54x23f9ihkwu4slnbnvwog9k2xy2mp7hfbhtmd37wcha9k722qu0yty1x9wborzzb6ib5zy8ni4rr93jry8nrjwo53pad095g91siig4v5zjqlriyhtdq5f3b7atmvjdm5k4i6axs',
                application: '0vs720x0xakv644j6i3rjzwswvgbsubgkvy1dylcxkrg3qa5u5ld1bjkbqgj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: 'bbum2w8v3391s2qc7qb8jbkqm3j0x9g43spwk',
                systemName: '6htc5b2zlxxolmuw9jso',
                scenario: 'nr00yghdojyzrv52kl3s1f1bqf8p3n9szz4wloididh4jtm1lyu0qpunzlpt',
                party: '8czje37zlvh7od6bbig1hl9y7vqm25ebwgv5u87i4jdaafh9zzn9dd31uzwk6mm45g8rmdp6u8eal2yln7ch0z7azo13qq3ifiizb92z81092bed1dvzrnzc3qqx7c4anccmsjjd9dozw54gnl6intfxt7aayzif',
                component: 'i7oi70lzohd9hcqvci5g1uzyod8sg27j7rhjtivatv96zb0vb7ftc1fynvsk1bqyif6qav7biid0mqifb239civifuxy6cxv927qv8iszgtps3fwjm0t5zztx1ex3jqenff0mg7ubb0u00bf4kxllqs3n9154wpf',
                interfaceName: 'as5l1cu61nfh21vcthyxsdy0is4c4b0zq1dwc6q5ygunw06val12jn4jc7ep0h33btvywsrchesegrlxmad21m58ykwiqhxuygqwme4wbvok52sy0ah5yoedadamgb2486cjzeaopkk6hq11is7yio3abagtcs6l',
                interfaceNamespace: '6o9ukc8rtfjmjzelvr0ghdb6esr91hnkqj1hxg1pwwa4i5m97jn4puligklymsmh1ysoinr5upaov53day2fm8bmogctmc2i4di5t7lqpbiuzx50obwiw7f46dvb5xxp679gd7tf2qj12cc9ry3eqx6jvnpbby1g',
                iflowName: 'kp58r2uusr051bcosf5oto642ovybvgetxczb0tfvsbo43kei2e2dnvtjoexpx6dx7yud5xs47w5no5edp7s09yq1awzdczayqloncyot98k45npbc2jlcecqmxofoxafjqyyxsssv7yetyj2dv3hlnd6alldxgx',
                responsibleUserAccount: 'pxc1l35aqxor5c737xm9',
                lastChangeUserAccount: 'vchwxnrmoxkksxh6lsdp',
                lastChangedAt: '2020-07-17 10:35:12',
                folderPath: 'qtxm8besgsqym0mc49s9fmiqyjv5b9eu59c8xpjem0neb82vlsjym4rwjc88xnoqnlfurctqfw7s15k3l389f2wr7walyoegfc0p3kndbrnjh76v4z0o67kzndvtwspsmedidfwm8oewdtspsgkum7kny504lt062ssqst9lupondd2pivsf5whhafiuryvzensofx044bhct5s6z1v5y9o2xkpxkcamwh9u4cdhuftb2qil66ksj5dzhgx6qxz',
                description: 'cjfgalwuqcwisbqpxpgw5m2kjlcyn28e9pxiikbpqjd9574teyojt6nh58dus4frgkqpl66egj86pc7p3u8i831m3svoxiiaa96aroi879ppxfe8vjy8q8fd4amj9knau7gti4asaku4x5mavdqv9iau28nkom1lwwjhunsax9x8imi4ajhoexrrqme3hbfckdg8tl61itlvunl3kkx5m2jdstb08zknj9flegbjeruegsu25y65nq67u8oed01',
                application: 'r41f4m78e8q8e505k6hnnoihfy8bgbmpcefj8bg5r6xn4mcdkj7tjejeh488',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'czqm33lwj0q1rtecfn87',
                scenario: 'omm51wl326li1mu3qx38ans63bp9ajvtlt6q2ahhqbqu973n29bkgk6nxple',
                party: 'fhm3sdoqblhwxukmnmql9bp8msmjiac6gl8o2l94dkzqkpoctnn256xdrk6dqg6eatsh8rzvt3ukp701bbgy7ebsyl318s50gcb0p94slz42lyvg3bt96bl2elnjuypxghmq858ev77sk69tqxrfjd3lh4u2ha4v',
                component: 'nrenautnj9g4an0i7aetefefjnrf70dpeh94a5zhggb7zj2x74f4hozaduolodm30ozxjsse70mm8rqjmp0v1iyng5aivp0g5jz7c4196nq885vabsdvlw5eh32m9k0wp2rwgpe5ymyeb6hfb4ozfwlwd0pg0efi',
                interfaceName: 'n1brultvos6c1pfpofwwig7jwhetz6k6o1d5pnogtyqzq7hoy4znekzrz7fbez2wethdbbbaw5ofua2ukmksh2cr8b3440y24nldue77xn7n7l67tptmi3rqut0j1272xl05zm3ix69k6tqvhd2gloi21frtppr1',
                interfaceNamespace: 'vdlrtesplc5ooxwul3m8oe3c032cdpq4a2f5r4ewgd538dciox1qaqf6wvnfmht5yy02taqrhp10fqik2gb9sncqfzo88b12z7aix9fnx3l8xacg8vn003lopxo7xeieuexit7skvabm03w2nkpxy78ff0lgbcq9',
                iflowName: '2dzh6vk4vvktoqmk031vxq70q8f5rq9tn4eqt2h77cx4di8z69sst3wlb78cdkrmwn9snsce75z5gldfzhxkbwcdryby1lzp3koqcs8cacv6mowrtqis4nlqs21q8ogfljdlyft38up49r01srpihbwy3gaq9ta7',
                responsibleUserAccount: '1v36t6oj0u69ceebvfim',
                lastChangeUserAccount: 'dgs7hd0bvnkdq3dw0itv',
                lastChangedAt: '2020-07-17 11:49:27',
                folderPath: 'klh2jmlbnavtgtzb01899orc4z0jsuycztryt7blv3qeveav149e5ks1sh2jronmompgqfbjfbb1jhwofpw8cg5tfk3btof1gwrzcjzfus3d0psnn8jh341da822cmu1xm8dtsyknr5qnf3dgsarkfc8rptlwaowrmjyzg6zmzwg0acrhzqg6e88g53jkizf70dy6znxqhdsy6o6s9jfvc84090bcglxk3lgbpoisj0qdncxy2tu7xqr6bcrf1u',
                description: 'j7q4js5ah1av5wuq1fee9jd81q3ugd64r8amndh56eoepavnfb1x3zqr4xu1x9dmjytkgiyqmma0y0ctoxoajzqpxa6iqazeifkl61w09fc9yi9nygl03i8qd6vxlxfsf7isxxg3ms3lfjqk0pyu1s7qk0r7lyahawzj8u4epu3vmeh54h0h910gmgmtmhishwjwiv4h7as2q3sggz4sx88i6jlupwpxcaws161qa9jcq6c8118lbhlzu9tl8sv',
                application: '57aotf6y3o8wcqsloqk2lze2i266n89a8yv9fytikv46os72ykcon8d352pa',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'yetvn4t728cv9m3b6e7x9p68wi54u26yk7lqt',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '4454hyhddo142yd3tr7v7',
                scenario: 'y6rllefi45ivn8f3kqzflho8tzz6yxt0zhg7yjgi2fvygwy4dn5ho95i4aek',
                party: '5knrf52o6l1iviy0mgn3tkxc9y74476949xw2qs8ucod1ajw4lal3t9ekylbi02nwuuytsygxoo21ba2yn7e2488bz2qq9xxm8lafxia6qkkrc4gi6fljzgxauuvw7jozrwz0j059kq2d3um5l736hv6vwvu55pl',
                component: 'pu7ax3um4hsxdj1t8hls6ystv9znlnjw7nagofwx4crdtgz5z25wl2lhg6ccbiu9qp6wjy4h2aifw5eh9g8gu1rsbeice37wf2p2w1z6pa573xtavfymmrg6lq8qn45rl6hvacqmgb4jrojsdncyny1gmvu59mb9',
                interfaceName: '78a85jnirsnmkiwlvhz1a52m63dyb3hon5pjqukxsvxdiwhqg13twdy71rlz4fx9bep0em7gv7yiiu63txb04pt26y8iyngxhkmct5rneio1xo0a3wby13q3qyhfj0oddg72wkc36kmixwyg3v62f72vzscjq745',
                interfaceNamespace: 'k46phh0imkdw5p3gbmk2y5tb01dttlgdugv7icmhl3rlgdzh7gghkmwxu0zprheys2x65zbdh50oby7to6uudv63dpaa5k61aor24ynx5uof1ydrewbjsom4tr57k474vgh8xt4afk4181zrknyfxi4xozar9052',
                iflowName: 'q9322b2wa8ze8325v2wq91gzdzf4zfdolu6g7h1tfu5o7kj36a27kgwo0npycq6d6dg2c2hu0gwwl8l8rl0yurioeicdhknabzns86zcu61sks8uifiuz4mgtdcgtwywlduhotpdleand0qohml7dfx16syigdqz',
                responsibleUserAccount: 'wadj4p2vwto30uqudwrz',
                lastChangeUserAccount: 'vb4y16mnnqttsmsjqewn',
                lastChangedAt: '2020-07-17 02:47:08',
                folderPath: 'w7umr7uwd50jc64my5gorofnpzl4ctf0kgrow1i5yfrolgksod31o5gyaifgyedv6rfq7xgmy7e150kxw2vs6xcu1au069xnnrcduge6mhpxmvva5id80vqjksspolxcxiukzstzguz33wbev3j2dqcp447r9v7gn9muzahc4gw2da4sd2x2jsk138m49lmul50egqnqzlb01r1huorxwqr3qqs3cc2qq0tsdv5gzw9ius5ge2pccnyfk2opdul',
                description: 'pcbxmmjigq0r2smejv4qp8eaxtaogsub26umc1xo1z5we20z14srskt8h9pman9jbfwhsyry03kzuiklym18zqxpov21t3l06ajv9d9ep7y5nr5ah82a1c6125vqin4fuswqdcpqt71dmtgc5lkql5jspiqf9uq1sadj1oeg3f1npqkccdnhb6qyam9jbed5mkbxm0pezv6cnpxlkpcm96joaz167hnoh2aycmgsiwdq3lb9mv2wusvik4hti98',
                application: 'z4xndnhkvtz9pmdyai4bfjo174usllz93193sqk151hm6f2t0l9sc59bnhe3',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'whrwc7mao3mowy2f6tn1',
                scenario: 'zv9bc5azbtphtbdr3ywn17asmfih5i6mcsiaqtp9isn1ds5sv8hcl02hi8lzn',
                party: '8n9h4ok2urumjjj3x152l97edyyzi3yo1ycdrbvhc82qf3wuvnlua19q47fxqoko5s7r35kg2f5sg8csi8kv4z8g9ew1udlsa2opj3ak80b84tsix4zrqdtxh2y0kdybdu18io48yl31hprvwoxb1svpmxt92bm9',
                component: 's6yjw4mnk7b6r1z7ai9ip3wlf5jdajbzaiiyo31t4g8cpeuakqmldt1f9e8t3jk8buox35hzv7j0uq57h63wzr8cmnj5caw8tswvtl6c0js95nu76rhx1c64mauyw32tcsr0v57s0ha8cidt54xbmea1b1bbtmlw',
                interfaceName: 'rpmrqzy1g5jq8f6on1jz6fels5vlho83oz2nmjjklyyme8vwethq0o66zdk96bck8siwaau3tk6i4ywrh2blsc4vnoptq36bd6870de0ln7lktyjrgnpbgthur4alvsoahue6uce18bjrt6a5hcpyqcgax2jb28o',
                interfaceNamespace: '9rm4ipxmsjh3wf0k6s4pt79ghr42j4mvn2d4irl1cvwsbzvft10bsw43w3uyco9fxtxw8h2mmvilq74xcam1f8kmna8us4d8rw5o0q3dah5hxhfckopy0eqzo3ujwss7wy93f2x2penwxuhj4ymqxfigtwfapulq',
                iflowName: '2arkd1bigymqt1u45uwckrq9qa19un61ar0w2if4jabahoqo8jf42mf7br5zx1gu4zxpglvyddkcjfh132hsz4dmv3j9td20c77tuczt83w4m0z94os91lo82xsthwnrd9xyqpy9qovs93lern0j054fqq9mdy8x',
                responsibleUserAccount: 'dpr7jww6rvz8l0gvlbcl',
                lastChangeUserAccount: 'pjme7nonrl1bwxgjpvq3',
                lastChangedAt: '2020-07-17 04:37:32',
                folderPath: 'kbye5a70cvk2pv7rgzbq38bl77w0v3wpnvpffathqk37kzq1ko26u2lbb1ggmhmuj4q71sezk2uob7dcuze284ldi83l4r88ft7lyqnd1f0xm3p763pe47agn0fospg6gkf4oba8emuqq2latulw41oyjkni2hy16xugeo1jtv5eplcpihggvrcitnarubdo4l8frle6nuojjl6eqbjiocxmpnu2moqmmwf7a1q9kb3r5u5wnylfo58mk1n3wmm',
                description: '9f0jq71x27gljgxv8qjarqzxh6ktvgp1ufp789woqo1685au4qm2qxs96ye60e2lwu4u6qyemjhhf9dzq5jb8ohg7lp5zkeio7p1axnonj8xea9mm6sgcgbf13aznd74dpf6cauitaudr2g1z13rpil9vdqfh3e161jpv64ikrpnox3lybad0cwk8gdj2k75qtckzt50pufg8waoxtwpdczr8n1zio7u7r6insr8rnhz0auilwrfkpdjqibtawg',
                application: '7vpd2av20r7e192tagt42gw1vja9l92fd45spup9rvrhf4q0webp6u4vt6f5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'ftpb2b3c5wnzi0la7q4s',
                scenario: 'c8hrauurg2hn29ib7mf5p2l0prd8ogpjp99capsxl7jfmnhkkwo48q758nos',
                party: '6stm7wr6qb5v92z36dkyus5djq96zuw1bq2rmpe1co5ks01rruo7cdvf7kznd196us7az737gg3xc7jh43m8j8ab8gu6z2ln9kykcl6iedruykcpiwocs79bjipkt82vtkya9wxnoyn50udrn9cft3pkaox2klkbk',
                component: 'uc8imhzh409ujtvazijerq274bjzxxbbkhio40d9wrcbocszn0hw5okh29do9c7wlmsssgqgvdw7btlz5xc29mqxr2skirumtetxrcnhoi8ojd756gjf4jiloiq7q2jd45ikuykk4ysnssu37mvxytveetpovtap',
                interfaceName: 'f20bdyz91axh0b5skpq3v3ptqtaqk957ft4rbuh06uwjuowhhmb6p73olxyo7r58h4thfuv7kqn6u4ptu194w791nr4nss9kwqtim9iu76f2f4vgapdqdg7svrxzzr1smbw3inq0qa5w0dl0c4tgajhp2cflfbh0',
                interfaceNamespace: 'vdyl7ie0p7ck0i1pv3st3zonw399ije6e1nf2sa8dagncce1ywjpzkjvzafzzgs18r9kmeq6rf39ftd1s4z7kfnmzbrn1r421nn8xccry2utdiqk8okml8dyds9hvt3h2bqa0nrtgw5uksotj1n9x2dl49hdryi9',
                iflowName: 'duxec29ed4fgmic2agqtbrf6gv4whxlcalard68qey7lxpgqx4o3cbmdsds17z4pn8zfvh12466akmjoyzrsku1ccyqxgfq95re4y5v9q70m27isaxfuu0zsm2tro1xdquva32hu6uewni5ocfmvvtcaobdmyhbh',
                responsibleUserAccount: 'twkac13mzcelt3zxcib9',
                lastChangeUserAccount: 'spxkdkk5dgh0ndljvnwm',
                lastChangedAt: '2020-07-16 23:16:52',
                folderPath: 'xxgm9dd8elae66dpjkmyl01qaarph7s8iy6hfvwqal4mk1ou4fqw4rlx7dm1d9lqdg78mwdezijoazmpnhf44ip2ddksehpz8n4l040zvopobyeuxze61o5j544kcp6869aej7g22cwzh6w09xlivq21zpe0y598sq8f087bgrkn0jo0rlv8nenscfexj0drv00k1sb258dx7ycu4cjgj3acgthjp4uvojm576cz9zvaaou27k7bxqhbjykdrv1',
                description: 's1yyum8694dmps4fb0pt33b7e4s85vfqg7npx30j2xn8sxt618l7h917f15dig4wuoct50pwgr4cgp7bzmflaea28yjz3gdk6y78qchws3vjaju1rjl88zy4i7eppdldkjkql121vegq2oynd3hbp1fjegqv43nkd4zhjvcls0r8ktcpc8pxcff5bvzpo529n4fdrx1lj8aq2q883l255xyja0n6eaa3niu3hb7vhe3e7x4y8lqa50gpucz8gs4',
                application: 'hi6t6evm6r5u0ekz0g2kvn5ngr8f31ahzp6tch6350nmuxfny2a843re1z2c',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '782crik3ir1f4i9lvw7m',
                scenario: 'djko4i01eg1znr6eupw4uagffxh6n7ins651xzm69n5jr9f62l0w7s6re4u3',
                party: 'a88iv1rxmjh8fiyyr997bacam3ime0gougy9l1alpr3hqhbn8b439phou3kf3fjkrz4gcfr4zq28k4dik2fisl51w16aavjko1333o1odsen5ms97ha8izmrued75nz88pn9zl5bh9b4ecviu6jnbfqpuqn7p3yh',
                component: 'u8m3j05xbuwps37mzizbnceuk6kgkxx124rz3553w5a2qny00sxw1d3dzwzo2a0pdp0iw6mwtbtk408954pexers4d0wkjf9yo1fpj256yohtv76fiv3gbku449tjpf7wpfnp7xfu99cskq4tg7ad446urwoi122k',
                interfaceName: 'o8lcklc5ijcaswvlvti104fw4343730akltb9fzuwobcutis4gzq1nkq8lyradfmvbfnsz2wn3lc7lu6eva6rpv9lgdd9p84yavbkbgwqmreby8nkyostnq2mxbk9e8r2r10z2f6zaf5999u54o7iirc9gxt969j',
                interfaceNamespace: 'x8vfkp08hm4adx8pm5g65bvo4iwmrommljr2lawmta24qtr711o45zsypi7s2g8abb1o6uan13nfoarrq67kbb6mai58ywa7yae9vyv7ddi5eanhgpwpvyczda6w15iek94al1j47dap8t3t2it20ropshm769e2',
                iflowName: '0nugu7ia8nsg7dyqjqdmdqcgpcz4kf9b9iy2a00mjh0u18d30s5d0ro9t9cywnrknskgp8uit8ultzf5frlkoeq0b1ezrd2ry3gka3vf1mzap2wjea2febxk0td626kq9da193rs3chrkp0j8p0zyxh43rnah49j',
                responsibleUserAccount: '1jo10ay1c6ju677qici6',
                lastChangeUserAccount: 'ler0h2v39rwtn3n48kho',
                lastChangedAt: '2020-07-17 09:51:47',
                folderPath: 'vzfgek06ngtjdmic03duted776l5yx0jyqzf2hfv0vjtxw7d7b1189q3vyyuom2fnexybuihtudca8uxld9b2txbsi9g3jf0j6mu2lklerwb1unf55enx5xu9k5az4tybe4z31ggxwfjr0r62y1b4ikm97rpswypbvz93vkalxeu0uy38spmpi1c1ipn3hd7j4aggxo1bwyk3cr85zy5xkysbb001cca20jshbph3jukv8cm802hlucy1ami2qk',
                description: '261zo4c2uwuv2dutrt5fhnymte1gwn2sppzcqzo1olodv4chig4ugkscdrw85s46e82cylyfld3049uwbcsbrz96rpghm2w7utxx5sqtetghna83hhpahqxn427hlyi3sdabdvis5b4n5bcfmt4q15n96bknwh7b5mn992rs7987knv3xc1cvpd9glbtdp6iqpgbyoua4e0ipud0xetr8c10nk8dvi5mxzujpzm9otug29gvv0ff6eu4h4sa7zt',
                application: 'xavn3mkfm4qq72ea5ww5k5xg288mw0zrrbcy6zz0zrsr9rmsqvfcby1efesa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'dmt4devf3wfyz6vdzx4o',
                scenario: 'jsckbw6rdy5bcema7s8wiq1uo7ikqjp6b6ib5i2e8lv7m7exjaruda8gm9m9',
                party: 'bautwdcckb09y6k6iq1gmd7yosswbz1k9r2slbemd3php6zuaw6qns2c8m0ziiu5jciasiip07cfzxh1z7s7yoi874bmmlj9sl3oeef1u6w48awp49xzfgf0r2zxvlijp2hv03maltlp3tsshlhijanl46ihukg1',
                component: '4bz7e5mj0nzh23l3btvughtz6rovhwtywtcivssy2tqabng8c9m4orunw33uls3efrkycx9e8s197svc3vvjdf69pyss4rvnvdjmhj3pqn7htcrdfx9jfyn89cgx0xnhbi95m5n1xvleo90nzai33usvxzp03dik',
                interfaceName: 'miyc415zc9k3n8oyyjyboqg117zh8mmla7hn1c09n15yrdgdxwnqq9oxe9mt879yb3tylcgzj8ofdap0vz3cej1ulztmv4gp0orvvpdc3d1ld6s2qtpwcsoro6d1s12nwa0p2j6m448h1pnyjdd97e4p7vyhwpf46',
                interfaceNamespace: '1u0fv84sicmt8iufhn8r0wtpqdrfu7eeg6bx0alzbd5xsub52o8o566f6wdzioxmh1ogzcokmusgxb6wu3o22k0xt4m4bmcvy6x6xv4dmfo7ovierdhjl1rxcaebho2zqv1jzapfqozlgr1hi4rghv0wb91484qt',
                iflowName: 'afk9s54dfeq3rpdc8m2l0yhrh90mw5b6o18eq1sstq09uxg0h7sfy6t5nhy7mcigkg0pn9nwlzjqv5lb7nb5jh7nzetd9d4td2jmu86j936jzl31rx9tf9j7f3oamrawc095iasjr6q45q62ltmzj0bz5s5ql6ws',
                responsibleUserAccount: '8gfgwsgeutmrw4w9p7pb',
                lastChangeUserAccount: '23woybknbpha5su94tpj',
                lastChangedAt: '2020-07-17 09:41:29',
                folderPath: 'mnahpjehw0cupwfbevezjwo3hfokg7hvg1x4icv4jxjlgbfd4z3cbdmolg06rmpcygsteb0h0l60vu8wg8hvdatbjbi2osfz8nyx4c4f1lsui8h5nt7cpvnhlxtgl4xt2arjfqkdzlr38ui0a05zi7y1wcy9dmma2xxtvs353ue5mklzkqqyhwk9ad4zsf22io07ytsb3oh3d42r3w206vbvqhots4weo4otizp807pto7lrh71yjhacvo84c90',
                description: 'zhek63xtikyvwzol432w9b1vdjwe5n3ue7dp1vds62i5wbzr3eac556k4cgughsu6cr7973rwvg52apu8w6bj6klslz6vevqys2nb7aa628luavrvtb4kshk2rs71occu094qdgtup9w93nrnefiqaewpylbzkbl2g2ov581itmpypnel780rrknnqzcydehdmi5b987un7o2aduwwae8xee9twgdib2oxnrhpryol3p93hubf2lr12le5bgwxx',
                application: 'fbgo9663ev5mjm1cto55jbum538x5bp2cwxjzeeyjoig62zu2pzus1mnm2ts',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'u1sg9ijcds23tv88grhk',
                scenario: '299cfu2udbywfhpa5r01t5x92regf1g73pxhh68rugsc4d99pski6laficlk',
                party: 'hbw88pqkeyv9m2zx6yzs4335e8c063bm04ctqqkvlxbrpjppev1gsdg89sbpvrtr3urp5h1qnf17plmokb89b5bbaonmiirmjjxv5uv173wbvxfpjwq0tf0f3ephsgf2stdwbglhamclmmdxwjhg6qpizzhk4fzp',
                component: 'ip12rr3203ch0z384j2rj74u82utxtwicqgyamb4w53mgat9wpvinhu203h84kkfew5xygvca3ecrfq2qvydxckb7vuaqqou4aa46mugbg4kedxp3bg7y3fnxdbuyj9bnwdpn2vyssqft7fq1aimhu30epsnkxly',
                interfaceName: 'cua7ryknizp44m33934t0rusref1063tc41hujncc6vna3bmmphje9rca57vr1bbef0we0yhy2xudbd3rkrruultqas646gy0eg6sc995iaf0fpbiqw61d33i66m1utzp1ladcqauzb40juj1cb25sut3fdzg88b',
                interfaceNamespace: 'tsc359sgbtvw3yjty8s6n8gojt6jsgbwmdp6yon8dli3d1ogkjd4vwtq9yn0zdxfwg2xfycrvtmldu4edfm8b2f9k8xntofzs4148ilwelrtkg37wdyp9dx3mawuv5dautsslssf9oxyyjti87l5fm6obdt3ortcg',
                iflowName: '3qj4fbld7bmzbrjyyzqg0gow8ryh8aanhztluhpykubnent4xb7czq69dzfkvxbw6522ahtz4gm0ia4itf7vdxo0geozspwu9h2z6oq2mra5qpbeiguvly1s4g9529dotkwnkceqfhay0po52ngr96lwpjg9odtj',
                responsibleUserAccount: 'n7feiw0viq8e1l2caksq',
                lastChangeUserAccount: 'hnlx844851s19fdfl01r',
                lastChangedAt: '2020-07-17 07:09:03',
                folderPath: 'j4em62ehyp5hoel4zytrlc0r07zxji3vjx7ki2y2c2s8ka0qsb8ohyt3why102uauzypg7zxgmog61y420dy6phhcqnizr6auq2a0cxhxvh5atoq359xqtjih7oow740nikdnpd4icrvaixmshie6x5ww64xnvcjgo8domxbmuywl0nk5pkicqn8ahdsqb14rofrtjajh7n5aspw3ilhlgv5q0mb12chaxsfmwccjxd5gj24u4iabp782zgdp9f',
                description: 'xcbjntgbmh9fhpsvrv3l4ofj05qnkk89b6tdgjvpnkh3zccqf5zmd8znovaqpepnyrpof5idlh7h76bsmtarn5l6o0weaozgzvqq0sthab3c37csy2e9a1mudcxs5ecv56kvpvo6nq3waygia9d5l0mfq5eikj3e4ihvwc6z4azgs7t7lxs7v48oo3ig7yp25uh9vky8zgsgbrvpk7l606n1j28ugdk58c8umggldnxm897g140lq92rx6k6ozj',
                application: '5svhsa1bgjdd4ajthdeswz0qvzuuqgf602qhv7323z7j1doi14r6xt7kqsgi',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '8obcvprk4kkkrbgitm37',
                scenario: 'j3sa3cl1zafm7m2pcdsg9f0niza7m5qf3ihn88hdo0dbmzh8qqpo33uglm7j',
                party: 'bbkt62x5ebgiw21gi67inji6tvqaeiomswxx92cemoiyes99j63c9j41uv1y7xbgd6s32myr2kzgp0rsvp8atgilllzy2utru6to8k13vrj5vrfgxwy24r243q5qsicdmit3yxaqidi992mxbe6gqphvjy9bbo0j',
                component: 'sa1tf59khtm5teb5sszefg04jdviokl1nv9oew1pfon6qe3njhpsg03j8ffhs0thrsj7nso84by0bj20qyxz8uh2d076sdbtwvrf5sm9ixmlzx5umek5fm4mu0h0afi8q5tdozwnop849yyfranxjui3b325p8tk',
                interfaceName: 'vzfvz2q6b8hyha0780d8ic8jty0mv5x7htkqzs1sndy6qgysoj1o00qwrb5zc9xfghusckkpqyg6r7gp61df60jautrae4gkqus3brmeq2z669w7ud9h8ti6wsecs79s3ejcuhe2xj4l5a4y9cvz7nuta2shpmxj',
                interfaceNamespace: 'erq7hgo75wpg5zw8x0iqic67czpt87scf009porrktlxh1iktplq43s878x6s07ocafsl0v5g96fafih0rp2fljxvl0ykhbf2hnb90kk05gap2atebz18g35utzfqk4nvxn59tpktf88kd2ocscbrv5h9ku7mfg6',
                iflowName: '35gywgkfzu1ik1rmrbdsqsfjeo3041d7ea0g7tamv524f2urjlz0cu4fclg2k4ew9o553lfhf5fjle15f9inqbcpnufushq9hphizxpcye8saag8oe9aodoyif6lhwe06fhcija2hghz1z6l46c5s91nhd8p84duw',
                responsibleUserAccount: 'pm0mijz8fs1zbb46znd4',
                lastChangeUserAccount: 'sub7rkjiov38xndu8z6n',
                lastChangedAt: '2020-07-17 15:02:27',
                folderPath: 'fkgf1b9tjqv5gjgwnasgdl27u9q1daol0rlij45rzepp536j40wbu5qisybsgy5rctczik4l6rdstxgbop722lrbjc89s18nmt01e9586blfdz4cjaninsec5f672eny1aqoqiu0jkbiet86qaj4293fuyl4qt0kasj35y0kyiep46xdu1s0sburjjc9bkr2z28znfwlgf4hfwnr0588dnljc8m5bf5ut9zo1t5bihbgaqx57480joza9zotvi1',
                description: 'x589oxive4a9o470n3yaiwol7hvacurij4wr7637l0jssb7ouunc5bi5k0sia3yswajea6pg1e80r0srwej2sc8q206dho2o524qibj7524yr65op556k3djxibd4k0w2ve7y8osq09awvd25s1jer2fi3fsdpv3woafr19vxqqnxojaub93iv63u6qythlj2rtowrghmm26agcpioidmvez4n23qzr4vyb87y2stt9s1jh39uiaqmd9gytdr0x',
                application: 'h6hyxh1gh214hej2xfx7j26tj7a4bro8zqxyp9xvzavpkyu8dj6b65ett3sd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'hfil4s1ev7ar69jqiulc',
                scenario: '9y8hquic0iffaelmgy8u2sua6lfmmfx94fjsc4unpf78z6qfg1o639f9afoa',
                party: 'jljonoul7rtu6198lreq4jdoac7oq58dnplefaeycq80s0i4rt867crwn1s5w5zbkk0cfj1pjwlfm44rcqrdgcm39uuffme014ywkppr7eq4fqqgwbc5ug4cb2h97ka1861tekpqx2jkjqlmuxfixyuy7gsk8uq3',
                component: '7agicccf0fxvu1hqvj5ez7blv0nopzf2y69wfwjbqc7rhkii4wpfeyt052smx3tiehlw93ejpxzhucldo3lvjwi612fhru1uqf46xcj3szn9bw6p65z9n58pfot77sxqdbi4iqw9spg89sbfn9mlp9962myg0j6i',
                interfaceName: 'hjxi4u711hfu0ycp03nba9bt4p7u3fm4h5uj0p2jlramel3ci67i0tlyao6sz6hjzmnm3ekr9j8tv5gbemyfcz93g2xljrpa0y23ey6nmtbtgnbvuum2otkfxkj3ah3fsfx3ql0ijsjccgvyqlphpe6ap1htr9wl',
                interfaceNamespace: '7cwlw3px0egkcomxs2my3ycvxhplnm5ii9evqdfra9lf9i42nr94yewxanv139o4x99tpijnm2gbjzdfx7o5r9jtur5ob7ow8702i0lm1hhevrgavnmhcjauutaf0sumuo3y9pagtsbi4s71hh6bkzeaha4e7n09',
                iflowName: 'hfm616djy7fhrfwouti8zhdztu2i8q8hrdgh131zkefo062ygpjdcpsshqay8vdufi94v1j0v0p7x7vod6krzoybe56tjrdhyi1mstku7mofhwwho62med8q5esgwv7bj27oq851clevc9t5ybb0fa75be5vwwzz',
                responsibleUserAccount: 'bewlkjvstb814tw5l63an',
                lastChangeUserAccount: 'njkam19trewdomaqw87z',
                lastChangedAt: '2020-07-17 03:07:32',
                folderPath: 'c68oaccwqkd0ozqffkwibbxl6cddbevh38vdk1v0ughsusqum8jxeotpfv2u4cxmroiaih4ee8fxzthnaqfwcibjcwx4cycfebmcofin8k6coztg0lsy27wf2bwmlji2jexcisokot6rmikrv4u0wgimlihcfayd2r4aa04ch9qudz9m21kilc5w1381jzcal54z4y8v2igyz3ybixedwr6zb6nqtagqi7ci5w2tmh2fv5dgh0gp0okyv5qr2xy',
                description: 'dvojlczocnetxdqwwikthi3v3s2sdwj3iibxd7mkq1299vmp3ll7rcw6ycc57wukc88o29snwmi1grpzpswasuaf84w2mqiqsa336weff44m5kr9gdn9ff5m7ar5jkuvtwwtnhvz89pc3lvo6nomlqd0qzyvdkb3t3q6369yk99gog45i4ibo5710d7kttnxl5jy5h476xepd49fw5a3ei3yy5eszerfev3lki5w6hhi8jeuhjf496z5ed43lgq',
                application: '1czbffryvop3fciehu1fyr613annogyukjlhzhc7dywwlnndkabph3zyf2sd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '1whqfiajlzpolpt41o21',
                scenario: '7jsuwew6g055hyt14xa9pz5l9zw1i8bt0ah00e9lx3y6mvs99bbal1ybg2rp',
                party: 'zyznup7hhxgcdlxbrxgbs2rlsrbl3jd2jdlqnuzwbd2zmgzk9aveee4z62pw522045nsk36hi2kcj9eqttmv6ri15v6r8mrvu8f4ul6lauotgycqdk4f9m89vn1cdez9a41uqr4ib4jqxp8lgyq8msavmiyxj563',
                component: 'b21pav3ctetv7z97bjupwjwy8309a1i6z0i7ora31yy9b9k87skpnvw0liy6act4andeo53y6xjrzvns6zcjmgjlwmsvcfkkz1f5zq4g07sr80uagyugo89z0mycwsvwyy5117oi96hl6zlmn2ckgbtg8yeatqlb',
                interfaceName: 'hi6titlsryip12cp14ukif0iuo6j4aklw1buit6tzsrmsnlmllay6sm149iaq4a0oe0khrmi8j9elmn8czv578hz06xaobi0l1gbhp4yz1t8rrpp0ws4gfagyfqdvs60x41ghb7ngr45r6nq66613v959ah97n0y',
                interfaceNamespace: 'lss68fw0y0wx2rjmgjz9c0bfuw024g00xjta5c3tag3pad3swt0r3h732dp8h6ae5rv9s161wy5chhbvpmckf9pyy4041b36g5kesgejgaxxfqsbo1913rol8mvck71639wbc9kcf23rw5nfgx5kmzhie19u1dqx',
                iflowName: 'jlajvdc7ly13ayt2c6moxqu4qaez2yi5p3920ve98q9xk43ktdbxfvzapa5fb7qa0krvcgkp3twqb7co9raxkl071j7i3ebe7c1prq718o5nufx3q9ohb3t7jj2muhikvlmwk8w3nzp8ps1rz2x860spnpawd8g2',
                responsibleUserAccount: '97tifh27cuzkqz8xcaac',
                lastChangeUserAccount: '819f2ho20ovsqlp6stpiq',
                lastChangedAt: '2020-07-16 20:57:17',
                folderPath: 'taq0g7kjnfnqnq00ai7wl3nreidtp4pqxxa5c520s4uq1nzxgh4xs59u00zc1b1z84h3fczjmjvha9rhysis2jl6yjd14wmhz0d4zs3m9fq6wnlpd7lv5cou9w9d3wi23fbcd9uhxvftes5y36tybjajcgzdb2scx652dq241kf41stikilymd4bf9oqrc3mvch0ufqi4a8f6ecpfs2y3p8uhc3fekw1k3kvabfy1yydrtgt6nm01pfa3nfaqxx',
                description: 'jha7kcipfr2p8h56unicotj1vldb45mmfd980ug77k9hutf3x1z9z29s2elh3qqsrlbou4fysp5u35ts8os4r1yp9o311rt9cut5gboikd3a3zw55qtifqbh5o4md3ex1hp27zqn1nq069wyc1w0andfl8txydgo4zi0c2veu0ncanz81fkrw230k6btxblqv1e7unv9fgg22qjiur3grcdkci7vz6d3o7augsrxd7dzrnzh6liqm06g83nuure',
                application: '5m44jdnozzz8oa5ge7dxkksc29q2uns7ga8nid9na4n4p2v89hetwe00nz7j',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'fc9lq7nzzbu1ksfz74os',
                scenario: 'xncw2ntvll23nds15a9e61p6idb3uxe17zzizs1ywj5a4povzqxssne2bqjg',
                party: 'ekphgdnl4btbma41dl9nqc6np9xxhx67j602ho9drnz8ximtyclcjc7opy82134bym3m1ppsfsib06ooq8yseo5i2x87divgixfoyazcr6ch95mhfkhspv1xdo4x7rypb48ffbkgj3j5zjneo24ylqfjvuu608qq',
                component: '3ujuzjmlac7w2em102ylb5zpv648414n6yi12z7vt2yyco8n8grppim4ztmaur67n261hxsvu8v6e4uv2m78p2hx0k207u9bwxgvusy1m4a3odhgbfc4s9oena3sbmk1hfzim1igd27feaqq5x6q5jbz0jzhdg2s',
                interfaceName: 'ox0jadae2tjvhozvhp8siyhqs2klhet58ie2tjfxcue3i9gj764n57wdbk3n4z3gnurko0l5sl1fec12ez2o3whb2d01qa08efv02hhx3e8bhwylwx2bjwr1nv44njt3i40u7h3aikhk1upt6y4zgtg30i3zi7c8',
                interfaceNamespace: 'mmwfecsmhdlo4ct7sdvpo0b3mfurpvtwq6bslayef45ukn9y20zp3mb8o8yqafzjf2aqnyfeqvxdg4fd6knp3996bchg5ke5qtoe23s76oqc644thecycyljus2dwig5c9j0yaouj3x0h57r1fzfdbyhlhy8q2dc',
                iflowName: 'nnmqfzyumqkmk7weiig1hdyochx9qo8u0sn7vc10bt0wrbfvorz6gc1x44uzotcwrrehhl6q4jp7frtczhro7wxx6xxdl47rad3v8crhbmk19p5i0wmdqdgpqzggl78a7xtj1mlg0gi1dh5b13hrbygxwgi66ja8',
                responsibleUserAccount: 'nty39na51p1t1om4jq7e',
                lastChangeUserAccount: 'azmjy3w58de3bg3ymw18',
                lastChangedAt: '2020-07-17 05:36:07',
                folderPath: 'ryodlruqd10i53bov3piaksfs6ofrji8grzz6lu1b0m4fa0yqkcoli2m087wu5k4w772lzwsin12ffcxj6z0p1pn9bbch4bvylge30arkkehreemyu7yxo8ca4i7mboud9wv8nrgj0kjw0ofrg6xdhfqrb9n0l7flrtmjkqkqwj948o8ejxskcl7sbvnqto58t8g2yuprm0w7zwn3mbt0p80nz67vdetzblu9ekhkawef7cqaiqq6vl735e2izuy',
                description: 're0yhy88dyv5q06x37tjxufzi89bda5baz5i7vjivqrsyjz018drp17k97mminvi860hicum88x0u13jb15tzsgewsfa6b6itmei1ohb0puewzzxtnnlantomwcsqs3a29l52hvjbhrb99g7kbluhcv0moh31y3inenlqmwx8z0v8kq8jjsee3lx4ed5hz1936n1r9488bdhm10jcsrtcip91chjlmu4v18hf5xsoy75msz18tuvgrrqtpiplht',
                application: 'udwj014mssk10b04xetiy5uldfpf5ntodppjf159k98m46yc9ebkmqymcor4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'wwqpp3z98r13hkd9ru0h',
                scenario: 'k8n0fqyynxzhbwvbz4gdm9oz56y8zfl4s6jyss1k0o4u9ajig2wayjhprrus',
                party: 'fx7xnxxq26elqpelmpzy3oqhl10mmof7e2y5hq0keclemx57nmeg9gph6a4odxz4ucfx3yjthoqzt9o3gfus2sl0szkz5qoxuyuw7a974gmkw75zk77gu9ou621e4gcc45w8cge61m2l31xf9bnl7u2t2ivx5y9b',
                component: '9yc8d6rkmyqevjcrd6ze8xc01efqieb5jc61y28p7j7fx3ve28jcj21rd2mlfq5k4dkx7mucpnjeto0un4r01agvtcnwh8jftsmr3k9r7y86iaw7wevrxi50fd37a3ifss8kyuyuawt7mw25nx10cijwyfq1xg8b',
                interfaceName: 'ilpkeufmo38m52cdngplzlze02s4i1tj7p6z47m0oxtze5ueoxn7czn7cja6z01ae5ar9pn4sdmz8vvzmligo5rhr9uhlxvh7v2o4he67l6urxiih5gjxkazhlwva37ahsvbmr98kmbtajcwe92fb4q6m3x7apt5',
                interfaceNamespace: 'cy96a9c92770xtlh161584x55cbvtrg8lpk8yg2s3k619we91e15ktdzr1q96ccmxx19jmlko6rpb1wlbus478dnapx8u9l1pbnm3btykc9006r69d1l676rrb5ly85fkpetmdtfl36eysqimci099i295ksyg54',
                iflowName: 'buimody4v98h62l9bke9vk4tuvz7yj9zgnvpi7c8rr0l8uf3gcgbycqifbe3w12bakshysjp6pf66nly496rrqav7dvd0ljkc2jbofrl1y55ddnfd97barv26ag7jleve53cxj7iicop3hdro4qonbtyefhdnn8p',
                responsibleUserAccount: 'aor1l578e1k9clvy4ybg',
                lastChangeUserAccount: '0hh7bjlfxxf4rsiml871',
                lastChangedAt: '2020-07-16 18:32:11',
                folderPath: 'ihto67d3z5l1a1hnxkom0jy4huik361we9jurycp1zubgyqjnklvr8njmk7053hxzmtx0hejbyhqfddg99dtwib0jyukff12cs5xu1acztf9tuoq9ha3nhad5avfoch1jcnh9c82ktu1rrrhrki72lovcr4d8ole3dxaglz0ovz4wfd2iobado735k0694hr3rfy4q00am6qg6hmau0j4ytd0demy21jriwo8fdosbhs7ohza09bb11405jso7p',
                description: 'pb3wualj91lfx11sfee009jofuzm43gtbu84qflr4l56l4h1lsfu244gjfvwf422dsfrl1tpqsv7rkrn49won6reckrex4o1dan669j8oxwxx8i9l9ufgkno0fjcg19tt7d5m9z4lhzt7epusfw32hznbatakghtsz3luhtsiqdfpjajbmfg6hud66fko9xyqir6d1wq84hqx54e1yvbh4jazxnlecj5fbuigtk2jikxms0qgjg5xdfvoblgbxyq',
                application: '2uvs10iopm4qiwge9vjh4fnfsqnpkhz40sc0s8vmd2buvohppt4m4xhgl604',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '1r4hf18zsk6nadi8lnn9',
                scenario: 'xabyyhdk4oorwoa4wya5t05153aosc47eml8ri0efz6f0atr9w8t2134xdgi',
                party: 'axy08kycp56wn9tf6q2q72hp5b0hntvy5lay57bx5fu1kkh0oej9tpp210en0g3fjuw1mtnd9g322qjyos3w0kufs6z93howcn8xqpp6s2ef3extd2ssdgbjjajg8tbcoinokpt2r0p0f3ok6lg3ho0lfcbx1nlv',
                component: 'h1o4e43sg9osb7mqycaipbu9dxm9cda28b69y4ksbq52a6zeq44cd8zpdmlxziet5krg917yilrufwfmm9v3i7wdxn69ncuh95hxhnwlg7gtnrzcocf4xjv32oggxfr6df8lftol47o3496u8obmpxpxiiagg2se',
                interfaceName: 'nmnyz6l2ruj80j6we6v0aote0ofmkhslewfz9p7u9vvosxqhzcxpv9e14ayy3abc4abe14vxq1k0h63zye6zrcwpvtxsvfkgef7684qh7deq5kak8ep4s5uta2xvg2c0u6cyo8pnu6b1vg8g0basguei9w3mkq2r',
                interfaceNamespace: 'g55pk2t4kglqio37yif2b6dmurhy9ao3brug4ucg0i654enccxapzr73rk2r42eo73cz2ozjui20euy903ujx3v5139w0e88avqs49cvavjwlqyscagx1ozijj2wmpmpp73uznsengv7nbgycogs8ms8vovq92pt',
                iflowName: 'zm7v3y36hwopcz26hntov26pj4a7ihzxypct0gsc08ggnxwwqxpg0xm3cm09a8ogsomzttr6i9siqvmncqelcz5f2diudur5t4a3w6c5ib2nqdk6nc717ysp9l9hdbivvjdq7v0zagjfopi3dho9dmupfy4tfkcq',
                responsibleUserAccount: '2topnmovxdyb97r3iidr',
                lastChangeUserAccount: 'z7hug9r15t4xsmpjhbco',
                lastChangedAt: '2020-07-16 23:32:42',
                folderPath: 'h4c3tee48d5zamqk0efzifzdg16b6mr22a660yfcif39n5hkau6qlcx97t1nxhs8oc8x2qvoosmxup75ufprh7ep39nfboxht6jdbwusrirmd039fle67m4oq6nu0oam3g46y46jqiffnz3c22u5flzk7xrgy3hu2fd1ok11hcyh7iyd5b6mb2qg3linynwo7p9xd95wtbnmpkh414db9ic0zx3i3vdvbhw0x4ubm1yz0bkcquo3p5mu1jgbzoc',
                description: 'ti44nzmljyte1en1a3xsvgctsw3djifm133p4lofnfwv2rig1u3271tcrwf8ouh0u54sh46xktpuk30ak5hc2a3c3cwu83ai7s8dr41h90j2owwek9mhtg1uacu7mpiycqqd3567win5nnahappy92ebzfi7xtsd1yx0aummbsquoiruzyhu584uhiyl2yupoyt1zfuzrzjfdvzougtsd2gktamlkkedgc3ppm3pial4cga7u7560i3j3a77hxz',
                application: 'cg9dtyla7gspv35ogthlyq65se81f98dsiag0adg4l93rbwceaq4g1v0izm91',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'we2hquxvbhdrujgl56w5',
                scenario: '8h4vdfk4hdv5zjo9sdi4lm17a310mstwkmg5z1k8ya8t6fibodfb5cgqb761',
                party: '3qdap3uoyttp8cu81hqighuvgyoomu03vfjyj2bd9k62akhis09326ouaqrbaow7ds6gs38ax5zszt8y9l81kezgfdvytexmjda7dr5mstchpiz2o8vqgr8uc1olbnlva92anzjhkpadgexg11f9vlghxlcj2kbc',
                component: 'thwv10czyj0kvrvz2m9ww8d59e7xhqwh9n5jw63yl6wwhsnfzkbvwu1eqajitc194nxdptej2ent3rl3mcc8wgu1xh07wxl3zf598th25igq3oyf9h5owsexs125l7xqo33tx7byyiuacu05lsl6q1huffaxusgn',
                interfaceName: 'sril8b21dsv7ty11zom8lzoem09etwoshin2lbyxuzbxyewv1tie395oxj4yzegbv2bpc2edm2ajlnl8tyi6ow0jfnmouj6dvzitvx73xhf2ojj8kiw505v2f52bfueki2ahhl46fk9idxwl5dokvm9vqk6uy3rk',
                interfaceNamespace: 'p13gg1q0oxxm3qf9u0ggajb5zpdfilhp9uq7nyru60tknj89tc42ino3qkyo09py3501aqs5r2h4i2do3btdqodz9lprmm6kuh9d4n9sqw0f87z3zxo39hxn1n92l1w4a34puiox87g3ac14zp1z0z3cbxuqr6wy',
                iflowName: '0c8yfamrqrmenyy1ap29pdyhzs3vuhcsbfn1tmtjmuve81ipr9c9k0sisi1ahio8prr9vv4e0fwcdb3lcye7l397dzp8uzvf0de0ec80vpd88yd45t2mmk7hun12vn453expygnhgh3kzxli370daaoy9wbaxy5t',
                responsibleUserAccount: 'wwp8pj7buf4jrdhbwjsh',
                lastChangeUserAccount: 'wh9vyi2yjhzuiz0oq6oj',
                lastChangedAt: '2020-07-17 07:07:16',
                folderPath: 'soz74u7s8nube6c0mhfe6b6yrx8tztxhuew0b9mrt1d50cxv5pm802qhq6t3lh0957gvpkdrytdmkffjrhc45a93wy672zf9gs52mi341po9bccmqprh9gpiseakwz0138t2uwn7uxzj1waj4os9vrbjuu9sg0vn83e5eo15vid95rb7oez0o1810j5flvic6tueypecmpq9mxtaxr83qir6eh5cn9agtklr6o6uwwmpa5m7n832sd58t1uedm1',
                description: 'xxalqcft0esjnph7wgbpu69ezf94dsa28aav4f4evgqx9vs112yjhu0xv57gfqit1np3n6a0htpth8oagngxid1jc4volb6louqh3q7gixhb865i5m7j8sznv4e5iv4gsaonpwq3rw01mk7gygz4thvcowjktsxgcataif6r9yhurtshslwiyjzjzi1anc2lks1np3grxk64s256hp7a8t2olq1ge0gj31yydhld5dwth0g53ffwozsspdpqehs',
                application: 'h60yaq0196gdegt8rjmuixx8cmpgfum7qyi6xd57rfhqgx6qlusgbk8ke5ml',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'x0rz1k60l6xzd9myl38o',
                scenario: 'o95z9idqj3r4ldc61g0a1qi90vjl2o4zwlcswrqr80rnmk48irhcigft3843',
                party: 'cjjlpazjz3uckm27c9zln6s61kkjwbax7zl46c1pkcr97567chkuhhn3xufx23qpvm6uou1lop58bawdwztw83y339ch23g6enb8wcqkot2w5ziq331obtswrm4eis74s9weh2863duxqvbngzpkzrgxfhu1fnxc',
                component: 'v3816df2rd9y39e7csqwnm6nyacvp1ji6yrbrxe7g73yztkk706m3qujq2nnrmy1xomkivsbxruxvo98993ay58de9wd5vwfyna242gpoxo7pkpo5hxhnlarlbuy05xf0ivmfmd6wk3tszs12tigppe2u6gklrif',
                interfaceName: 'vkof5nfs7yu0en1ouvvaxa4oo28u8zdkumhgcaotatr5drjhqusu1gmmm31l83f1kn0kwm289l334pca58qn4eyp14jvz4fqnab84d88zqdeu1ein4g6fpiz8arhl6k15h15hgaeef1f0v55rg6xkv1wmcq0225h',
                interfaceNamespace: 'ijgtg2urd160ie1qg5u61l8uwjd6dp3m4mlazhzj1kl16kr5rp6xoy26ax5zvs6niyzsyfucw6jddtj9x7al10kzs3wymqyq4tld68ixndxb9b7ccnnvhwlwdvpqjrc5g5lenz50ynjvfb2dxda7u4yxqxlc6vbg',
                iflowName: 'olcxqknhsx5w77k18x11z69ch8dhcso6jl7h41bf919z35ddnd8hbqbcb7a79xnwczjpicz6lvpkxrxtgi6tryo26yh3c7cyjpeawzo75e0rnuuzgafbnrekff1bxrjqu3ctes6ijbm2qkaamlkp7buz0yzb4sgq',
                responsibleUserAccount: 'vlcazmqe9dbl49xd13n9',
                lastChangeUserAccount: '1clfmywaye0uo4ctxeqe',
                lastChangedAt: '2020-07-16 23:00:53',
                folderPath: '21j7896s6orecsnv4qfgi27m577tnn5td2vwlp8wo3f96jxshxafprevr4c5obddcrzu0nzaya4gsmy8ndwt3mlc80febs7czx5l4guni8ju503hdzpywawgqw6fiblpc1barphe0v19d8ofzlywzvquhdd5qrwkq98ia34jr4ic3du5byl125wkn1yrie5lrcfwip4ezol3otixd75vtoc193pmznekq54px5ke5rs450du2d3729tu5nw88g5',
                description: '7gm8t0kpaidkr2o4ojblqtr92s2ogcasi0mdl6qc3t5r7r42xin38ypuroi5kmssjatxh4s4ake4niy33zfjwynplti90zd83vcqjzocynshjo8a473ehuy998tskuieihbhmdgyv2air8mk3xnzzbh5idww31mni2uuf67hd3mcxi9ubczkkq388m1l3cbafp3vzhn1nw9islrlsoac0uuipg3z58wxk99qbudbf00adzbv0wle3mdvjr5vbop',
                application: 'tvpkhvwtfr6yycl1dxwz6k17bzs067sqk8zguq979lrw4phsxisuov7yyivw',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: '30ovo16xcv69wqayma5o',
                scenario: 'm84smpukgaz4surhk4nenb8xoono4330lps1pnglk4616nh4v0rsd7b3xopu',
                party: 'kmayflrly5ogcn07a05n6ghao35owmrm32f04go6jay8ncvh3nampt8yds7423sg9dkk4cxep2yyr6hmh82xs02988sgezl7qsi19hm6jn7xcgn00nueppk1bhrpe8bvyyxafd1tnh1227f9k5tw1g7c14jxeqvn',
                component: 'me9ehp75kx8marul9fp9dahe2ixwwxh4i0ecaxdnspinwxtbc891bhmoybtw0doupubc6tt8tpd1guda0dq4w0txp0zjyyigu7f6s7oksttqnpyhsdma74trgjb2z86yptcjcm9ue4mwz1mhq8lo7l4o3f8d3ldn',
                interfaceName: '5n1yqge3so8w253i6wm6yyqhac0o4z772htj5ptpec35vvql60mb9nv2y6i18s6rsht8yzfbup8njzjiirvorpfbkf06ye6nvdtejc1s5wsufhdrjrav7v2phsygmi2dfkuebw8o1w3cdbgr0nutm136lipvc84q',
                interfaceNamespace: '2gribxedkly2j0tid2l9eec6n7kgovmcd5cqa9fbosajdhrwnguw6xcrwuvm0nxdia464xqtptt59d5z9o0crhycjwsbds9jnryr0p6qh26fm0q0ob2fn4txnhccspmupcjzmyo36q1cxyh6wxrmri58vptmbrja',
                iflowName: 'etf68goxpwy2v55ozoak478dcl4kge2abzwfmoyh7qquw7zy0zax1gx0qj416uyjn6m0h0r16n3hry7fqdss5m34pkp8jtq87ux67jma6rv0fkykyw3ys608610bb61qri4i44iuxi7hckj4ed3u4wt2uwe5d0i7',
                responsibleUserAccount: '4ytoo7bpsw7fxu2k0w9i',
                lastChangeUserAccount: 'yn1htyfhzz1kgsc65aqy',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'x2xjhfjhtkuoaea07d3kkbpq3totciqkiuv68g4eyb9x9jo666iz3ndz9f6yaobdrhko3xpmgd81lf3opm0r9wayl53pzot9c7ik7dh3c1u63hv4hwhb00dn5w3famaq2edtnvp9sygmofeztw62pg1l6iyvdi5p57khf9riv4lio4jlfjepf5bdn29we0oy2vhquuryd1whc97kbd7jdhcn567leeh429ofoa8fzt6778ad2an8694wcgo1q6o',
                description: 'rswiz1bzyi1gxb4eh3qg52ps59ipqsxobd35qxahr33rwgl9vuc0lgj0piz0j07olp5w7ot94ww8g6kck8h44stk5einykqfnr8u4nj50c11q8hjob6u1p6a3ax2gqe42yqmnbdfl6rldbx52ugbzejz0pu4tu02wi3kyec1rn4mna24zcc30s8juaw7lsgzayrcocip7s3v4ndq16qwkfxbob8q764l4o0242qy1a6nlo5byt2001gxg2vvlre',
                application: '7p6oo6b41vhsmdv3y9gfx3bdc5yxt4zrub65zogewfl87wznrilojazk1rwk',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'cidim2oh90r12izhff6m',
                scenario: 'vts2uzi3gqt6y0fnpoj4dat2s61t3amzyaldw9c3whvucee8s3boos4h0rg7',
                party: 'ikbxb5lzd9m9k1gcsn55d36ngk6zhz5ssxbr2y8mmn70rgjht5v4nvwkei0obm14p9k9vsds1b5ou9jdr7f5peqcliwvapn1vo45oyt1x1ij8yffyzfpoohuyov54az7go369rnkbvs7apobamg4vj3h87qwt2qv',
                component: 'nki0j3tsigvff6vhuoo0koxs9frcuqdqp48qclmy60jkiw36k8n2mfa0ml9czsst59pi8eqwxfalq55gzjpabowo04cvxd8ibisyex02q6mcobwciys4jda276bw1m27ey036uc62r0omcsirtq0dcdpp9vqd40s',
                interfaceName: '6p3804ri3lafw6t82lyq1ec6ntn0utyxyuh2a7izkez0ts6hqoqspraj9bw3aaopwakzlc40lo8g7qyseiu1oaeaym4wjsyairwu9u2gnfvwow0gb5mil2hf2advxorrcxnllm35cfs8kccnywjtnno1spuzkslm',
                interfaceNamespace: '36u3rn6w8lvv3qrgv4jtvzrkx1ytqsd5mfeu6mowg74uofu6h7nekxnxox7hntpo3snfhnjhw33q4n1ac3pcxy625pu3kpagrhqyq6uasym2aeozxkhvb642kd9lgspvolnkgwp1msmkzkn2o4ndlu4imuya6jj6',
                iflowName: 'umqphg0kt1s4tawdeyr6oa9p3zh4y0id6fzspp98bl77bimdnitato5nwnqf9y2vppnrj0pqwj9d894q19vdgad7a040vbr5b3pzg2mft3f8nquoohzjwlrmys0o5iifnlmldnu2r9h6u9aa295hr5scdezwvow8',
                responsibleUserAccount: 'zyjczd3ckvkz6uvokohq',
                lastChangeUserAccount: 'l2yicymmmbeouow3rpdd',
                lastChangedAt: '2020-07-17 08:49:41',
                folderPath: 'iqwsnl5rojxdk6zrod9yyjga9kqs3620y2wrrxcubr3l3vrt09ip1efumlifprkj6en078bqf4o44nr4pit07ti0zuqhi29di3yj2udqm4h5pq35b999a4xd551pnehs3fid8zwckxed6r2rlp1t5f4mge0mcleqdzlr3oyg5xzrq6wu14wzvg4yamyl5w0or6dkhhsihbl3kazxbhjb337c6qzcv2llnt0faj76dguh4lr9gw7eaav6h3bu7cm',
                description: 'vbi9cmpizgfpfrsia4l3gfq0i06vx5z7htb4o02o7kjd6vy645xzu9vquvmj0szdrk77c4ijc85ejh76gqlniycmua0hxphphl9guw3o168hc7omi0g96g1lcdc9hqbfil09tq7iaxifla4br2gw85an52cgctlu04jj2spx64mphabutm1rz8b4y0ygk6lx0k2bdcisfc3sp0anzjdwerezmnzlfx011kd0pa7kbkp82zh1esay3fvz452o4dn',
                application: '8zezu547sedi6w5yjlfr9mxrhkyhjscouopcvd73geog7ke2twzgivsc983n',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    it(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    it(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'));
    });

    it(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/e10d268b-bd1e-45f2-9ded-8357f70b1b20')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'));
    });

    it(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '43c62780-d117-4778-9801-97a235271ca5',
                tenantId: 'ac86ccac-8730-4628-88c0-b1801c2fb299',
                systemId: 'a7111751-3aaa-4a87-97ba-7b3db5594e44',
                systemName: 'fv7ywryihl5norcs8alo',
                scenario: 'd9n8bter5r4pv5v9z8x3cfjkpogtbkv5ao2092s2hs78md89vykrlt4n0vqe',
                party: 'rzk7m0j47b80swt4o47jiqkwlbfsp1ciy40dippsgaoxoico4k6isktkaxv19eqoa8h0o0ej6rx1avlflrkista7k29dqbeim392z5wfknhieam9yecx8d0mqtuahb5wnl9w5uzfeq10w0pc3881euxo0bjgbmg9',
                component: 'pucvbnoqgtoudejk6vy4su5o3yv05mmk1hmonpcc0y7xca0zz7501y0co4gtq4406lp3xdyumf2oeayt6to1vojue4gobtllda0hovujbrqcqqs90s52zebhysnkxenuuo8gyqkpmi6xillrmlwei7gh2hvu0znf',
                interfaceName: 'pnccg33aomvfp2adjcd2136rp7p4qe4gubfkq1a8f0a2o6qqvajumymeki47801y6r38lpr59hmjwgdj5t38ekcmh0br2vnrupqq0iwesr3gsxwdohop72iegyrufwria3coatmhvtm7ilqkl11hq3tyspumhrz6',
                interfaceNamespace: 'k3b0ixgbhxypseotuj1wmoa36dtfjy349u63batbliup1idpnsmw2f03la09yearixnsb2ih2a6oe4vp1rb136d8ncehk8sdfw3gfyosf74yigiwtlvazonh5imcbl2id1cuxtxqcdzcarj9bd3xsmjug8kbxgo9',
                iflowName: 'jzspu730qdfnm1qucih83c5jcusj8a9tv8tbfyk3l106y3y4b6fj91gz4uk7gnw594nt3fvkg2x2cdcd4u83b7107j7qtr2p6m3xd86eockfg0pdi9fn43egcjsklynxgpoxb01e3z94zftna81vfmd6u41eeq3z',
                responsibleUserAccount: '5ragcwk74k0dz2uws03e',
                lastChangeUserAccount: 'r4fxaq4jy27ah3ojpol3',
                lastChangedAt: '2020-07-16 23:05:43',
                folderPath: 'hm758s3icnhvbywg8tc8uvkqxz7n7vbtniq99fos9e2khe6ne9duwsr83po0db7o2rep67hc7yu8if2x4j95tkoml5nlryhjlonv6otu09v2uq49x6nsg4s4wtvur26oez2zz5rou8xkzoc07hdlohzbz7w2sj2eo91j9jod34hdhy1uk74m5rhr3qmk7mewmtc4ga5l2gy7f61nqcw9a29veete5fpd0q0vuqfgxg87h6d1ry1iiydfuh1sm5o',
                description: 'hivzrk8mu5hbfpf6pm0v955lqxi9610py41m22hez3m6vk3nble8vazzq09czigeh18qpsnhg7a909c27ayabn7oxa1a8yrmw5ivcnkfx597o5nv1pyv2i62cyxbt7jdofea3edtrkc3crzdqsaqed0wdk4wkg7whsbn87eb2lcxxgmv3jgcnnleugqyt5jnxk6j1l5mf91gkr7nayf9ruutmt7cg807iixmp5eo3bd38pe27h7jlr7qf70vsew',
                application: 'rhntqynmm8vy1c1zwak8v0ii2a0k9dbexp3dkbp1denuav96s1ndx4ad0v12',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'bbc12cbd-2ccf-4927-a4b3-9e22d3ae1b85',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                systemName: 'oxzefl3suvb7y73xfxq3',
                scenario: 'eqnoaowji05ca8zh4zh8zfj3knzr69py56cudnkan8txs6ar08qayta9dscw',
                party: '120sjdwk91vedkl82kpvwyemwahk55g8vtbpg8yf40l2vq8jruw8bu5ydasf9pbgb9si2kaqgswxwj0exe0e8kqv4rifjd905v976rr6xm90m7rnjgj7au4hhfv80u0gl9wh3hinrfa0sxpjtyvnxe4njhaccf81',
                component: '0nropqnwpeh7jvcpty6qya6qa5npfmwsa6bbflndv0wbov5g68q8q2m7z0ttet4osx8jd691fly2ex8nnualcjyeyllf6v7hxawvpgz2tcyfra18kwkbq48np6d8781huuaapqnda8ejz2jcp4jfnytdocbmgvc9',
                interfaceName: 'rupx2w54xnporshfpuqqzpex7ayv2f9hwvltdzv8mjhx99wdv8uc17zsj7fme48lbe9sj15lox5q1kygwu1zi0vvvthasw054n73lsf81elhkynerxlwz7j4x06rlcr0z3s875ypvleyjgy7h9o00fqryunu1e0q',
                interfaceNamespace: 'xgudrjmslekp8x6vzyk32iq8qwwae2ea05xdhl00l3fi5bboxyiqr8eect3i9kos8p0ckn6xfkeekwzr1ub6nqk6260wswx17515yayjm7j3bgnfwlhfuoekkwhxzidtegen8mfoolcjn9825eip7q803pv5t19i',
                iflowName: 'sjcy0aj9y9dl2u7rgwv42aq7yrpp27nf7pnvb6dbu39b9hqnjvn1jxr7vpwualfvh9ocw3a4yl6qbrjmqhne027bji5wrpkyi00pgof7nbd8w6ylqpg1mkf2oo1jv217q3kgfzv28h4yt0nmop5ggixpx29eh3jh',
                responsibleUserAccount: 'gxtqghnwuf8mi00yvzfd',
                lastChangeUserAccount: 'miuzc60djn835wv9mpib',
                lastChangedAt: '2020-07-17 00:21:20',
                folderPath: 'xsxdund97wjhf6rwkwl1k3xtsmz27ol2qyrmpvugt4254a74pks4r65p4ngi14xip6vc143ranhnap7z4g5ff1oqfwtt8y51f8y9ryt0b0xzlmkbb6g9rimu8038qx1jialg968quzkhugryrahoxxcj3n6wm565osfas9ej26l00fzkeawscs24d1f1mk0dsqud70safijdho7ri3tap8f9lpgzw6j7bob8zb9fuq0hmd0d982pnxds5n8ipn4',
                description: 'mrkv1tcxh8b557ekyj6okdhnuwf1wondufs76ijnrzdepbehtlg5mnj7uq95d7z172bcb0fqgkn0739v7a11nf5uoglywjqxb2rjvwb5gqmfogvefaasllmhepyymtr16n2td5df3749vdyy1svplir5mw0ymtw12pwulccpgqeo1jrnaih8m8nt4muy3r1pawgeq50hl52e71b21nnbwdojoun80jm6q2ocwww7irf1kz3vx3yctlsgbp64su8',
                application: 'o4ot0m516bcncoav3yv0o3e4tcm5exl79ky3rch3f4zjwpjis2ljfepl31cn',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'));
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/e10d268b-bd1e-45f2-9ded-8357f70b1b20')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '60fb0ecf-3d26-4e3d-9547-88faa1de954e',
                        tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                        systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                        systemName: 'c85uxat4klkuumhylx6z',
                        scenario: '3z3t35fcpeawrysdsv0weq78pz9pnb5qh5dhr5u1iov15zqeeoj5p5jdx7ci',
                        party: '9m0zs36mxuu6ivf6rwyyrc0r2gnfwf8znrnjjkff48re4qamvz1528z7ehe3u4i40p66zuuyencqbdlg9tug0iycega9t15sm9dvianpnrrktpntj3fw6ipate896qfbwsnmz0ufx9ljxb1xbrgz6bsknsma021k',
                        component: 't8km261o9iit4m1kfvi3vg4vt6a7h8g31tzi0e9abudzhgiesnzgoyc5cbxxy6kasz6umppybew0fkm35uuekaozvuy7kyg2dj6bacb9b1gsta00qppzctpaop79agkl4oocc471vca72l8a41lynvxwz3mvi46z',
                        interfaceName: 'h0yipuxpxt160gen2v9fk89180vkuvq3b3ksz4bhqaxz4zc0l03hcu3c0m977pvi0i98cb97jztmadqu3hwip2m4us9ua5zzamm2dtimiqwwtypcpvi9wxlhzl1dk0nyj55tflif9c6c4fbbgbarjrun51wq53io',
                        interfaceNamespace: 'nffe7sc8xbukntgaw5u4bhjso6cdvlflaw2zl5mf0ng6665gij4xy0karn6whatoxh87wcod50lva2g1uqa2o7epxj4iqpox4cfoypxzcvjp0sim60cjz6cyesr6ooz2d2lrcfltlwilbgugvk7m1tqtzo6uizd4',
                        iflowName: 'an54acjxlf1vw407h76pmw1xqd1ljoqo91nysomikserxsfpr7zq1v23lsvqjm9k0yke6808h949ui8txpw89yvt4zijute4g0nkeau7k7bdmj0dlrf7p9ynw9txc61wuts7fcar1fnaipab144f2yc4mpll93vc',
                        responsibleUserAccount: 'dlvxwyachpydf6r7jmpm',
                        lastChangeUserAccount: '4nw73f9xes9esy1qp70y',
                        lastChangedAt: '2020-07-16 21:46:12',
                        folderPath: 'i2clkptovc8tisiq8aapznueq837xmemmr21ysw6pxyuczxiwckkmv6bxqnhitmsfvtw1w7ayi3pi6aybb0n90ksrf8puo35fsonlc62qzurpdn7nie9sx9xpb6nh7pslr5ehvfefaeqsqwdurd444creb107n8yskp8l10vf11g27cnilkix07lp46sum2fygxtbsj1pe8gu7x00vvilzknhaoaqo5uwzce3w20hg9rdg9xpat9ptpiu1jog3i',
                        description: '31lmemfahug7xxjhab2163gh220bndppa2oicblisv2fissn8u80398ttgydq0r66d41fpl8zrh7iums09m6r2ip4pm5fol85zzdnfd2qvghmjqsgnz2xx0tqszqobr8af8v49unsagw2ctd5u965k3bvmu74x9w8vc0mon16x5quawa83yecfbyo4k7cj2iix4270okb9yv9ne7ts26l784jp011dwep00wylzec8gpe5546jbmizxr9woqtj0',
                        application: 'jqfhddvhoewpi81dihy7kyegq5qadlspu1l461avilikr24gxae6cucakhcj',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '60fb0ecf-3d26-4e3d-9547-88faa1de954e');
            });
    });

    it(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('e10d268b-bd1e-45f2-9ded-8357f70b1b20');
            });
    });

    it(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('e10d268b-bd1e-45f2-9ded-8357f70b1b20');
            });
    });

    it(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '02a259ab-e3b7-46d9-981d-3130507c3a06',
                        tenantId: '8262f59f-72e7-4c9a-b125-7768300569ab',
                        systemId: '9fa9e444-e9b2-4a27-91fd-e645cdc03afa',
                        systemName: 'pvzvzxt1dtnbbkcfx7yh',
                        scenario: 'mx53lxi7i1glntr5art34ghju9ol69thkx4uss8zeuztie1fc9vwntl48882',
                        party: 'dd9krkiel0fdpatduksp0cfadprps3e67g3kx6j6co5k8bo64esj2hwd8pwv45q4f04kfss6mcsz00phpwgwmzhw8zwuhmsjxfcwwfja4dyxyzd46xpxfgvpissjqaslqt3c6n70zqqaardyjq4tdw1gvwjvumk0',
                        component: 'gjgc6kir7em3qtcicelspm8jlkcz3yp6hvfvvo1o3q1thx5tq4kkxcroe4v69w87k1crij9k5mo9x90pvdmnezy8wgqh311qik4xjf8mum8g78slfjamv73u3tg90ca3q6r5ljdsct7xmu348roypmu4wj5p7z1i',
                        interfaceName: 'wpwan6no55kxtf30zon5xjbrlzszdgchiw4zeuw37erp6o457n8e3eutuvp6c6nfon18vz10wv71b8qcrcry0mlfqm9ealg6ot2k8zlvfi3qjqgi6xd6oahst80vcqsxlxfucjptthyykn88kc0dxgsl8qa1hgxl',
                        interfaceNamespace: 'sk79v0i8w18khkl7njei3at69349eyidyo6dfe06tqv3hra77uflex7c752bh6naq80go1ay7tmmr75sibycrkro6nyjhqm7ja7uf2wwlegi0dq654hkz6rdg823bledaeh0bixdqugz4pr0vsg6bigbu19yyotm',
                        iflowName: '6lcgjoisb7lbslx4pt7dx5nlzfijgn45rbohrv9d6crv5eeimdteqxap3e35pmj6g4bxaxd27nbv3fauet2cnbv0tzg29u8dj1m6ljwy81xyrp1hp9gers0g7silci6xa2ccottn1ov8exyogiu3jdb8n4j84z85',
                        responsibleUserAccount: 'fn7jevrmxpjl3g2z5vyh',
                        lastChangeUserAccount: 'n5x1ipsl4il4v7h0q1rv',
                        lastChangedAt: '2020-07-17 07:07:53',
                        folderPath: 'b9zi21aee3yu5iuf0zra72bm25ofeajrz6es90ogws9i09unz9xmjvu2jze69llmxu97bxwl60tlz3s4htq37b8yk9z32fpjjs6pdqulp4xdp0ka2zd42cwsyrrnuvey25t48axsefd2xkihi62tzz0v5ocsf95dblecq7903ab86v2vf16lia5ymhs1oy7ih0muysw16sl81lvpxqt31j91bmnz69l7uck9j20jwsysnmfi3t3i7clzb9plstz',
                        description: 'lhhsuy6yr68drwkp37du8h60wkn34qlxslb4cxbrhh6ql94tt5ux5hb8bxn9ry9iclvtl9sro4tlykwe1vr2v458ajxiizqqyhzxkyd0iptlzeqm4hkrxvcggtpp76ghdangh5l1ltaezmst8aag43g2gbyehn702m3sf2wo7kpqw15n9yr6ziouy6df3ttiw8i1b6tnr6ylmeq67v7nhln87fo2zc36vt4627gdwtxtju844v91qafbwo6smvj',
                        application: '67590lc4b36d0vgsisygwh4672a51ynbnqbaw979p5w08as96wtsg9k938eg',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'c3e76680-13ee-4ff6-a6d9-c009a3759726',
                        data: { "foo" : "bar" },
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

    it(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20',
                        tenantId: '2ffdcc30-f31a-4219-b72f-7bbfd220a38b',
                        systemId: '51a15258-4069-4429-b84f-ad11c9664dd7',
                        systemName: 'jukhidapkvn5a4njkdor',
                        scenario: '3kkilo6hzrc92omeu8b24wa0sof1qjbdz3yc1bo492qw8stpev4vas8h26zd',
                        party: 'qx1p3jqy6h3k7onziawsk9g5m80yz19o4rle47ycj654n8uefx27uw5hoxoehd0a5o1d6vcbsnzdn6h19psyjgxfegwbmv216i6hdlk9ftikt4q0iqrhu513lcevisy7nylbdxvpf2263ppjicefmt85m196xztr',
                        component: 'uegmdby3s49o8m8hpwl75foust8ark9gqlgzh24jd0w0nthlk8wo1s5fysiuc74hqq7avzx8dlx2w1win8hud2f20pepoqtgq22gmynzunouf7vd4qkp6zhqvvzqqrpo78ygid2acigmkwwcy5t614gm3v2ujimm',
                        interfaceName: '2b9mcyo90zhk7t24dljrr4ltecua3gozr8zsumzukdz8k1a6eofir6tt2r4r5urw1jusv6y777lq78wj03jcdeibowgjiw8n4qct6fgnrcu1rnip8zwg065xvzazqrn0y1a87zod7mycjhfhq82j902g38kjxehm',
                        interfaceNamespace: 'v3621wg09ay473qk54191lo41moe0ykfxx5fpwwipazwtb8ic3yt51bjcapclh59e5362a5hso6ppc1drzyw3s34qz486c0gpw1ik9t61b97tjv0jco4dhcb5dhwluohqyxivmqh4qopyy7ueu6oadplb3zwjhx2',
                        iflowName: 'doa5x7q098hukj9l9b9ehy4l0xvrfj5e50c4ix17713r2gbpxkcqt1t1il7ve71oq1e1cltw2s5jm860kqo3ji3bx4om2aefsm8p2ablv8pchoyx6u4hzirf2epz2u3rbo8itwqqf2jf2fhnbylep9paazgdxqay',
                        responsibleUserAccount: 'cslejwq9zwphyo4gt0ak',
                        lastChangeUserAccount: 'ymzc2cj2em9f15zti9z1',
                        lastChangedAt: '2020-07-16 17:13:58',
                        folderPath: 'it0sionc201qq6wz8lu8qu2nirvcflc4ohoaiu63fm1cpaf9t8c7j3xkyemgjlw3le91q4usqsjh048dt99eal4n4zlydj5y5k8m2gtkaxc61lvi0wq2drmm8q29q2tmuqptucl8cz5iors7bszi8h1prb46ptmckuavt78pw14ll5k38j626rawkyouju0n9b1uevetbeo09f0qnssz4zkm894fgdzxhylf1m8w5xkubrnve9zidztdjcdgaf7',
                        description: 'zwv7pxh9wi2xba5yfz2pbys6fbyb6tkuqgqb20el8w1o1t32bq4ny2e7uyigwfvl6oa63n1mv7a5x2lcxiw282jxj7yufqenl1ved47sfhpw4a8lpamtfhj3lw20asgwvfft01xiqd2w39kaaldjfnsuwa3c14lyf4j80wrftjrdwy3pf26wwdlmqjujjtx46pqhqhimrol29q946cy0ak7h0p4txet8catudsyk8q3lbqfd9pysvaepibzpkld',
                        application: '50a0d7io32masuqwvcdhk2z27duuvdpbvg7isbj7irrisgkc0p3rciyd1jw0',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '53822b83-7ad8-44cb-ac0c-b809c8ffb81d',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('e10d268b-bd1e-45f2-9ded-8357f70b1b20');
            });
    });

    it(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('e10d268b-bd1e-45f2-9ded-8357f70b1b20');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});