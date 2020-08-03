import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'udgq2hgc05wi7t7bezewku9hcn07py9y7y6xathnd42dfvyvgs',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'icnh693oh6x9tnfuswfu',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '6og8baz1swkhzuvyoimgmo7th7wnd7c5n4f5jh5hu79s7i6l98vm8gy98gznwfz6ba2gi9byahpp6kgwegtd5xjaf3pymf33taywy6qnbqsssw2m3mgij19b9k9ty6d45avkj72jiailwitfjcvrr1tnoqykvyey1gsfwpqdd2od0ekiiyszp9pp74422wawv6beo3kvrukt8qpke05a3fh02106ejitu9ixss4fxvcnjsrpracb7ygyopa520c',
                name: 'zf8847pa19aa20k3t1x3mr3hlj99jvxg06dcta6e66vd9lqguroeue2zqr4gpxyyab387agaqvcghzdkwm8zz4n9w0v4qhfsqc9lwd3k3xx3ozrd5vkcwk1draw2qrz7yfjq93xfesd14a41l32hlqty9cuwe8auerk1a0p1u9digkivv7262q0j9miuorcdf7bmbxxgtuujusx9seivqkwq1q9fmxxrko118so5pe2soruejklw8sj80zqpfbg',
                surname: 'a98nug7rzslounlu78tc0bxahkhpn14h7dcccym3fo1vg3ftz4cw7c6d57cdq5855bjtq1195vufs9znmte1h3ls9ppxs4q1agugmhf43hyo8gh3tik3y65k37psvufyxshp87xnw598l8ytpidhj6pve8ku6t2kfmk268onu6a6fm7uwuwjv8ax7boagv7cfdu8znnlpd7lstm06ygfd0vcgvi8w4wzig7atigl919ct681heslqec7vp6yzx1',
                email: '17uzh3bh0k9g75p07olhvulr2o6y3i9y4hluu6w8o5bb6uff25nk9zm2p1y68ywz4rc9xovih0y3ddyhukp1feg1coye55my62yd9x8pwz9lcya3fvhvvrzv',
                mobile: 'e5v308rm8o3bl12jx1w23vvmfbgiw7r78tsi9jus61r0kxdspgqs6ypmj8qw',
                area: 'fl9kzqmu44zdk86aspfzzf2614ai9nifzb4sbrwt98aaji6cv1m1y8gffh772louibtzjnznfz2q3zxxl6nou3ema19zjgozt0mkbvbazkykylx0ohqetwyzgb575uc3g0edfoa4uh16p2s71ez13mo6gm2ohdf9ttnr5674ld431z1m547hpradkol7rt6dg364zrl8o18zsfivrzwllhf98q1y8q4wifb6heqi5s1bj4j7593w6oqk9dgrw8i',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'r3mbd18dsyjhz9tm7l3xzh8tg4q3lwkma56nomsw0sp3vanyq1',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'eqcos5voan0rbxp4qvyo',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'phmqqxmtlczw0qoywtfv292hv2qojd2isr0zgk6mbb52drg7dqzxjms3rmb5oc6a0pla8q5zxz2bmv82bww6kx7y1vgb72jwkm7ph5edyygdtq8y3osia0pkjhd5ew1bjw773ke9fgvco1dhbaiyx7l7uo8stzh21340ghup52i6dscrr67fqt39odfgdzttjq22ctk6qsuoli1x9puznhbh90cuxgxds24207dgiw0vp57cxbrjk29vsafj3e2',
                name: '38g8gypw83x1ldq2759eqrrf1evnbi11s5t6qjx0d92bjs88f3ef59xjz8y87u74feqifu07m781xoz1ecg3bj1hcs6jd5vh30z1ozrr6hspyl5bj7lx0fvgcnoy3w6loc7ij71n0o6tfcsv40g19gf7h1a6ix6fn6rvthke0b8d2sjim29xri0h9xd0cblcbrf5h0d7m2a19oc3wc0pg65mmustizvgd9s2g1s50co2irq7xhf3klfxpz8immc',
                surname: 'tj166i9li621vqv9lw6y27c70rsmbx93t9gbdwrdnwqusn7lbqiqdlq7efuqbt4rfmn8f8xbl8uusx9vwo8in2cj2mxyifkmglwjrfe9cxulsvbijxocvtjjvvs2pcol9osferz1il7ly1fvk6rhj13xltoj29qeig8256y4z9ao81rfty6h46cq9ukrc04j04n0mn7quz8mjh59qkpe82t0vs50vthmf06sokdqt9899rf84xcb7up13m2q918',
                email: '5z4e79rj5u19qrxw5fvjlxaslbmucknsayqw3ct7ahx7niheyndx7lu2bejlg0fcw44f0h6ntxc2waxc3zdr2omnb0y0r70noj51g1ahyoq1j03x2nos3jfy',
                mobile: '91xbbnrhbdc2ga3ldhldzffgux4dkrtm1axfbu4dyl382mti1sl5dcrvc9qd',
                area: 'n5v6439c3sd3fy4wfazinwubljq031yxb34sceo40i7boyli7r1l0jxhs1sjv42qfqkmtfh8ptm0wldqkqbv70nwsoetn6884av7krfvwv4bjmhl8yvqkc207sjisrx4l5phi3oi194ktz9zgxtror8sgu948fvsdzi3x8oxt2zeddet9bx669btbm8u8amwoc6dap9t5jaj81rfma8bsqsdd28lzzaimmgo4egoz0hekgus624mz3vgej01ssk',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: null,
                tenantCode: '0zmqomdj5g18q6oko88k6fm2hl4gc534tul376xuvtxtbfna2d',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '0nyuflb27peq6ih9pzpl',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'leippiktv946po91b517b2v98zvyrblev8ymuth3v27wbpfl7ihropbty0v4lapntfowvpolf88tvg0hjn4h74ugxw6yryc0493t2ry3ajywmzi0cgz5mdvi02gossqw9p713e82p4i2x0x9faefedl7gsk7beziq97b6nsgeswltbnsy32jtpnxqqvaac9w6pqxkl534dqr9fdpnhyytm27i5nv58xwc2aq2xwynsnvehohpojppwewqp4kj6h',
                name: 'pba05wakd7ylb2wm5f0wn7fjxv7yqai8ueui6nvci3c5jsdk1hxudy87gv2cd2pxvhmez0n24roxwt46k7engoffl11s0ru1v7n7m3niblugve37eer3tvnlfrcy5okrxheo2cttg33k5ytnojv4cilija3q13urtp87ejxrxraijrqcnqbhcv2b6o0esslun6q8w98rc5w567iawr685lnzv18glovsxplozu91o4zo4ztl4ksu8i4b3ykae6w',
                surname: 'zes3qbyvyrz9y7y7j8cm1a33t4o76q5tj72fyipsl7qv3rwf5fxz0e8f3smbwesn3gx2fcaan002dwe8aozgoietmkrel7mh36dd7vha2mtznznaj093em4vpkyfhpj1jhvmgv9h9er3tqsb4ewmy0mqr5ghsk29mm56loxjx0ipsf1yfcw94dzsopq6x0x9dto6oeawzef0bc79qgky2yleow3apeywswd1q7m7aqwfue9d86a1gnmoq3j9x86',
                email: '8nnnjcr09byk8ql7j4r6mltpm338m0y2f70o0by56nvmpt217qurlw1bwlsz546znja0riti8d8bje6rr3pd2wnppuvaqotclz99fr27106q9gzjqv7cr7jk',
                mobile: 'qde6re49idgkdhkqwax6s11blba5frolpo0t4zl1uysbuf6ddiod7tnwfkad',
                area: 'uf7gmxfcb64iki557lo21j1gqh3uqodnjbp1z50qjadkc8x76um59aeeukmqczmv2xmz8au2p7et6xzkg5amt651jt6bjve0epcb4842hvo9la8hjjd1rr2hbsid7kanni1bt23u98qkgef9zj1qg32mr7l1jw741xlnl3uk9sc9nxvx39ilx4se8q1xca71qw0wr8je0si9h2jst9tv0brw1liu18pcd50w3b1r98eakphmr14czftbzxdqxky',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                
                tenantCode: 'mzw4a7ntsox4ugffjrkg0rjklx0clo3g5rd75lt8iy1h093sog',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '1yfkc5867ghhlyymquc1',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'zi0fhorkmzekz60lswj71c7de703bbrvrtaouf0zhm4xgk5s7750qmqe6qtf7borynkwlumoc0pazuy6r5ho5m8ph2jjvfhbx5r1sfnao422u57oim7a0upqgadjh04ns5qyetmg07p23cop7q8fselvd5kkdxwdkdalx24osj3lravfu4ur00ch0njd18m0in1k2js5b0okbbqncu83ekxfhxbt0rsl0zel38kgaqeayd5bzbtmfcj6lga150n',
                name: '7i0xtdz00dybsv39yischpbji2e4n2vqhgp2ctomhoabq6r73ae6s5wybr22kvgad9bus21vnd5hsai1hy2qb88s434oi4ng9ismt7dbo1gskvdku4fgk3va1bnnnlr12q98pkjlqmrq2oi1uyvybwwmb1sz5avowzer91yspvnrny2egus9xhvheea2t92ax6a8re81ef92q5jwh8c11xzxt8g1ytqhavj5qhvytn0iaqev51dc2nnwe7wddns',
                surname: 'q3lwzmqh9snrp27ga2iwl26z4ws9nfdl7wcyqik9i1fno0ywsy9b1fug1e9gvb5ysb3ibwh9oixdbh88uddfjmm76wp6o8s4pevpv59jcyv4o25iru3eo9dpjet1t7ig97lymj81sxkor7bopgwz2cnkl563jqwfprj42fjh78tbsj3i1bckag5se6lb6rb47afemaqigfqpx7i0ii91obi8b1xt7opn5y5l6y0houpcw9qubfdu9h3ru61lloq',
                email: 'nh7osgb2py4katitf7mulawjxr3ekpfaprk9mbxfrindiwrj8ne7wvivalripleqenxbgszquc6zy70hi4adyxqz8al9z3c7ts16hsxtdn9uunjwndiqk46v',
                mobile: '0m0mpn8ktfnaxtss8y7888ngzicka8ahhslb7vgg8pg70nhee6inbri800ls',
                area: '65is2yht3w4xxfb4c9el1hunl5olexi49bt9c7ldatqm1qff0g3zyx19qp4el22hrhi1sepxi1krps65koywll282nte9fqy2l2u64c8guvyvbzp842sa8ddxgruounnqyh6glg2c0s1hqbuxoudy3od8ha1lhskw58s5nbzuc9gbohnwlx0t1t8affbojjgkkk45au4ifi9v68jsbuyzecakx6b1jbs7zkl16dg65dqgxc4olcfkw2lgs4wkhu',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: null,
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'pqro7eh9su8ba4dbc9d8',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'wy1dwmzhkvu88ycewq1ayadc541qzfg51xtjk2o356fntm4qmneumqo6zrdicil1g0rbhffhrx7er2yl4gaiebv55ucc1uemoc7mrqdvxkakoxaqwxrln7ywinrgmtar381tu5uvwb9mcmq9u3g3omfplzgvbkzhvyksq5jm5fdj1ss94w28slm6ngrgtcq0hcm5t18cer27zrc47e8gz1llm3dn4fee6aykdkhgv5ymhi4pyhrna7i5xkqivbb',
                name: '2cdvtavmshiecuiq9shr6j56291ldes0e14q4hjzg3cax41i92dspjxc81jwys52wldu3uhm24xs8co7xpl0p0fu9ru0z432tjcc58xkbw4xx1sgqguwc8p58vntfp3qcihadohlslnw40v73ll6b4hefibp1y0chxkh4f0k7othbx6b966fslx6n8e65w5xp6up0iwa8sjlxdent6xwi20wniavjnhe7pmikqr6dbcow5ljfutuckvjqb39eot',
                surname: 'zr4lk0kectwaa7qqea9vey3pwzouomhd78drwqt0sphnfquzw99u7cdj75e1iq3p8m8i9jc3x1twhzxdcop398tyxmkfmpbq9hkdsjygt43rdh2ugyxtz6lmusdp381laaz8o7jxoqvhnnpfmpqc8v55lsvuqjg8b2qecrpk5e7y93v7xo7ho8ujdqv25qtvgd75t4rub99lf3exsn8d0el846ppw914tq9mc9wg6xd9r9emuzbsdil1z1opoxr',
                email: 'y5ak8l6n9y2z0lbhkun8bti7ertv4t8zjdq4vzj0b7camu3i74vtryv5yo80kfa6hu5ps67m3jvj50msi17gntgsmsgbdehql3h8859dlnjc80tb0szyt4ob',
                mobile: 'uq1ngka697r0s7o7vncwjbcrgaof4j2eorj0uoi01m5xdzf14w85ihr0w7s2',
                area: 'al1835adszlp3b2wtawgibde61l5fuiepel9kxp709az79y14u4ykcybflsmju9sa1ze6y9gsr5nwv0d163lablwkde3n288is4pqbn2cj9u2e03iwdz0lesaxbtu4li23v0crnqa7ej51tllsc0zw65tkkpeya16hedg0wsx8mutdqtihdnoz64uwm2oh2e4z880hovj2w1f44io9z9ziq9n51ad5ar56nt67ywnwwtl72q1yz7ukqa0gob64z',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'k3koy8gpgmoz8wcx8uth',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'wmavs6lxpd0ad3w716w7vi8mgyvfzifeswnwjaxmfipzuha2434knee357nvuujan91apeyxsqucng10kya7av9no5l9a8cg9ghb4ip7fc6efkafierdil5hwximehpyl8s648ch5eil5n0mf47vsvkq45bm95ivobmws8fkvs792ndshmak8iz8kkzgfse2046xtt6g3dlq7hz09od248fk2swal06ifl9xfxlie8smudxcvumdcxsc864vocr',
                name: 'llt5nxx1ycutat8i1w6zuwdhpxparowdlexdv9g1q1cen83kwg74oilnuhoph3elq7wcqfd08r1gtwzlba95g2j49qvudxa2l57jrv11pa8yh9a932069gvucxxivf9j6w70ioogrpqpbjw96y01dvinka2sayc6khyp8il2lsue522p7zmfoghxbhxtfmsjt4081dl34f25of5psf5tta8y74pc1urad85t1zv2gwckijp2qel1xz3lh1z4xbe',
                surname: 'q5cuplo6v7uyllr6r2rpave21zi98bu4cxnsyfwkyxeydkm5pt294xjts39f029vkr2cyk7345gyh59mptkbcsdcj5r5mu5eipuek6t0gzzj8exfvmbkz9xz18xotre3m7wlra7uptvmvk864fd7uyfu192zapejaywd2ek4qxntc2q654xjxi8wk5x54ix7opmvo7xl4u0fczuhpqi4kxkegdczzskwf8lnv8zz3uiof3xoq3h09ph6pjc6dag',
                email: '6ji5yar6msxrd875a4t0zq0uqq5jus3u1grz5lovdff0yxm36j4m6gaqn49cwvr34ihtatx6nbf4auca2j4j8k0bw8k0oawlq6vtf4hwzjli5k5g0y5qd8z3',
                mobile: '6yforg7xipp2depj6n6uzory2vjm08jnt3gz19p9d1oe5d3h5xfvraeu06kf',
                area: 'ugftdi7lk56agfri3kx6hdmmffr3g7rkqo0f7onmw6740au7nrhsg31cwac906u1p5jjxbvwqb7e89xdzg1dcvr3eh5jq8m82rsh1gvncaxxiylbix5np3sdrxib4442ahavkkpi5ttxxojpmb7oasj66cn4y9d2dsbiksj7mo8x1suqf2bcf1pydj5yscene2xcqbymtq5awy4d87h279ahk2ovbhxgt2ggtkxzf8s5csbn68vbnpyv7rd1z0v',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'ckoxj1d4vhlb188lxk1oamcziw9c07xwpww2o5b6tf0b54xe0p',
                systemId: null,
                systemName: 'eogwyzcyib1dx2rx23c8',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'pxkh979b1w3pkweyoga7eqpd9zmbw3it86zjwfcrnil63mpoaqhkgodxhp3tnc3a01rg3gau6e9vtw3157701q7vuvko5cwy0t9lq5w0yxucnbljhoejxawae8ofjyff8lld4homi71e4svgxtdu8zggduoxe1m05vtl1jhuyh9fahqvhdxvpd20znf5po16bt8iqkooodrs0hxnjcduzjbgcufefb1hjc46cn4a3ceym90xdnd9jsfl72ivypu',
                name: 'k056akptxg7xu0rcqibqyapo5jwnmlc2l23pi7xdxz8liq5ve72ud8yqb83qkff7px5xsq43eb2ixzs1wwl810evm4w6lbesebzogiayb5a7awsw8w4mms2b9idd0ng5e25ryl88sola3bugefmrcd7zcu9bhptjljm8q4l0thzz9z8uuunrv2c8lflrrv4tor1pazpeu6hcf6plumabhzts5fjqhldmf1jp7oxpsa0tjzjhuxhwzfvbp5yiir8',
                surname: '85e4zp52jx8asacbub5yii9ugry6g79srcwtjfo7ch51wspxykmx2m5vo5tl5aquh8qqg3injy5pvauf8sa24ck434jo6wofzk0ger4xs1iknl72s5vdqhumgnh31mqqd0t436igxex5ry1gxuctg0cqpupuz9j14c7v5vm0xhxcel6un7kwulb5qo7qi1eleyk9oobvzei9rcg1r19pu8wd0rg469cwz70s8cof7uggs24lg87kyep9covar5c',
                email: 'dzz0lrj695l3mony80g5xnaaa8yhvj4ug8fv3n2xcskzvnofazqcmfzxujctafx089p9l5mjde2o2sviz7tq14on94yt6ab3ua02a98nzyhvlbycw4pevevx',
                mobile: 'rohakqbqtr834t64pi14qsv8p00vvdc7gartwp28hfht1uxs7bnygiigungc',
                area: 'rixn7bs012f3ntoxj1b4nfsh2en001p94sojnatfnbuvxwrcl88cwqnk5taf5dpsuyv2yx2pqftmb4rb5m08om5wb0k2ngzw1lt4qs0r3kyuybtk1l8ac7rv51ft05djc1am788e2a6ty8gyxlsvsk1o7grnea684w8hnoyct5n9dya60sqgas7qs3y1sfeqyzsgur3mkukekhxrhtdkjjt97jgqd4fgrwcg9yzr3s7w4tc6qjyfe8spdmhd3nb',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '4n9lxsbw66lq94vxmmaqcki1in1h09a1cdyvfwli8j30rz2c91',
                
                systemName: 'xnrsjt07bkl5bipfxkzr',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'cw8r5mxtftaa6cuac44byyn7qbq8k2vqgjdkpqaur5eykn2xtn29v4swoitf5rfwd28gjxr2wgxhrbmosk3rmwcwqnekqtjxqmu9okvlps0a55zkix8kq7bs58ba6d6tug9c0pnc2v24rwbl79p3sxs4kvdpx63jy8jy4c7we54loet4q2uxknaufzdo5vlij6tfth0fv6c9q2llr3e77hiqwx28yi4iqlvkb2bowwt9bmkis87q1eg2rm4ylz4',
                name: 'c50tal78s1ynwbr61n4r5epj6nmxt24kgym58tsbraefvegqtn6tr1wc6j9ltag32apkoapaw25yoverudatidshrkhh3ordxhlyw423vfkg4w462h4tg565zcigc9o5dynevu96z87oenau6crbirsufcp5ws1l2hah2xfk9dmibliz71uqrmi2ec9oiy43ggcdz4lf0a3n5hvp0r59ihuj86v49pbxs1abvqg8k8t4doxgj3t8p2pqkr0950q',
                surname: 'n2ddd9miwj8lwhx1g02d3o0un9h5bokrbwtj0gjzunsg2uoan11i8enwem6b1l3xddjue7y0h3suyoct2m23ty2brosff8kpc486n89o6p2kb78moh4dc3lgt2o2kgqx30pzwkqgt3vka3ojbtihgk6e2pguaejgdjrhfb5xwuo0jhpwn5lyrfvdlgwrt4hl0wc9naejlf8eq6lkwsngdkpxiz2kkcn53bj13z9fhh6ao0ryhvutf2ojsmz4fj8',
                email: '8tv2r0uotnry0nwzejuckj4s9k9t8fiih6bsz79p2lfafteb6a21ande25t2qvounh04emjc3tdsgpddwa4nr4syxiglg7u7ya9mol7cg6vhim2h5gm5xtn9',
                mobile: '7d9s608mvpzczbzk06g1vb74xlaa50q88r49p4uzebsn6qpe9jxzj20179y7',
                area: 'tdb28p65lws68qqoy5778uk2my53alyy366aw54w1ixazeyggnk4hlqrrx7p59ibwdm0wupbmpt0s49xsswnquv24tmcnkchmmr9s9wzeykspnk8xct66xd5tf9vfmviaj8thhte0edwcyi5g9t3qsbe8tqadjrun4d3peeihczb7g2629hfu97i6ad4ripflxv059bv6wkpk60xuzvjlr15u1536fs37qdychnf3jyvgblfcwtxbo2uox1k6gb',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'ifwxqj7hr2ogtlpg8mr7itrroobd5az6emh4htm2fp9rsacnoi',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: null,
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'gvk83aetveh9zv9ny7kexfbcbtkbcwngmh7acwyg7vm1tsmoizzcnyf7sao28b4la9ck610ihd4wjdwynghayo7y1kncsqfp5v5x3072nhictzzhylfh4awavci0n4qxpsns4masz6h70w8e4m4ii22b77p2mw3jvjpaqxv95ni3pfdnl95zmvv1qzl7nlyszwi64ccdy94m5ticebab63imi06gmbalulviykkiw27accvzfy9h4ylad7tossi',
                name: '4xoc0oio329kgxthf82u8xthlpmkf3kmkp14d8h4oy179ir4xgq46rjtq586l62vvfyyovuf0iwtpygddqulsagq30mj9zizgtk13elf6cbcy7q247h6kt6jxasohcnogpfbanregqcm7zqrcijw95ubkuo7djcgndkqktr8j3rr2zcufwgxc9fk1ejrfiiz00ug7rr8nc0uu86rea5ziv3bnjtjo4ot31t0qr9wn22rejfwvp04n4p4hcnpsxm',
                surname: 'whqzml74khwdnyc0fvjggtf4yw83zv7crm4qjsr2nqnetjqv6iqp79mrng2ofno5nf1hds63pgam407jk4dhsu3w3su2i0ggt16m2h73x0dhq9utiwfwmhg8splqx1m55tuccrlc3uhitu6ocq7e5hc3rfn4gk71uyqbg7xh66wv4u7sop0nsawoz0c8y2ohzmg28uav5raepe9yq2frz7g8406bbe3u8cvcyecjkrh8qw958bb5g7q8md6jam4',
                email: '04dq6jho9hbpu6mdkwd880sg9v3aatpgfg55nvopd6hgpt57uxpmcpyo4qn5wuwd15878lsu77uk5d36gqd9wz1fwl23kv43jqq905i1xcbiphrsofg8rflz',
                mobile: 'jjjbj9y5m486smiklvv0s6smfxo45ty5xqbuww5zicl72zefg3vsetkvkcek',
                area: 'wghca1u448v64eu02qyqxxdefwecp0ifwbhoi0ed3g8e87e2smxmrz4rk1g7hizw9jajlo2pi5r2912g795ijjnflujsfowe8dorvhq53q5q9mrur4fvqb492to96o7kxaiejd73rt0jd9f4axjikhss832jnyqbgp3xuq01499z8ylwgj415n7de4wx9conoz23gql72vcctynfv1j268naljyuspzoh06ioq7ed78eql80uou3uunqmiuunr2',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'g3twlbzrzi2giftay0bvmnwbbfl651abn9rcj31yrn4epr88ws',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'qeokm0sgjtpxjyifvkmyiqhwggeg8uwewsi1xgijqwp2ok72h6h62v1ncw9n8asrogxcqop23g5f1zvicl2jpb4n548mt5jdpehs9czboduyse8qxoeb07itlaup56bcbvel3i40p1o1diwukyqjo6kbhi1y6g9m2cre1w73bzwhi70q9js53ojcj4m54ou29zed806brnbe77rb8wbtbfe3jfe3lehn9ia07x8p0icjevmi5y1yan25e8vr5e3',
                name: 'i8ecrslzpfsyzj5ae81zefpu83bwe73vxp66dj445ek7x2f0rf7o159xy1y1vdf06ixcl9ft9r04bb76wi4ic9lltal9r0eszuwza4p5zob64jv4igieucy413f2hfjdwbb1c6oo3gmagz06v2xpb8eqo22n2yj62fpcsimtz451ka3x50mktm935xygqxw05v9nggwtsy934d2li73ydz3tk9nss505k46zh10ar3eswbdfkp6nlzuuw8bdsc9',
                surname: 'rq7n7gz1zzogdaugmwxh4d39mwgh40e0klig4r9z98cfuk3b4r6y0klcncukq27wsp16x9ystb1tsdeculrgevrr902u0bqlv4fpzcyv79eh88t8r7o5pw28vfh27ak3lafu2bw5mmyk7zkadmb9s4m1e8dfr29qcsbb0avprfemp65zv0vs1n0ic4lampmdyfdrsqinan23i3riqqileol83tqrhncwyr1129e7no4r1fy93vetssguxbt7m9j',
                email: 'vwh0fxrws9itxrrxh6ef8ja5z85u49kwr7yb856cjpqxqagc8s46szt4lx8rln4xr6fj8ny1t27dfo4hvqz4c34pvnzmz8rjk5dralx51ynshr1g4evi2br9',
                mobile: 'mjn8mup1gvp9ro7wibdid0c40dzg70oghrl6nvlu9ptxwa3g1a79z5w4jjzw',
                area: 'f0bfy7dgmyt56qnf4nqgefdnb9sbtkni52xe9oprhw5iv37mzhu59rlzl8kvkkqrpkobu6ei91whydteckgoif3oxaszb9017vuzxc305lo7m0ds2evbnoiint7b7ysb34zgpt8d7mbz24cebm36b7at9zotvkcuzy8br55rh55mk5mibxt76tzf6d44pdxj4nvqprmdto7v5h3qu602w99aw1ppfc0wm5feqljrnyhn13it6lai7p4evd7hhk2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'kchmuhra09mdzdcxg6uxtd29cwh88blcf56b4s2ggd8hu9yjru',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'sjv1fi6ednbxh9elply9',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '8zm133plvj032lt143hspl5gn2kvq50ti1n4c1v85ow38mn97hhb4i0jykw7fnyszj2krb3t50qfy2314rf7faryzip09g0tds7bfaf25bmih99153rx58ywq074twserk4oidutievtnriklc4sno508qvfdoymme3e6x3znw2pedmx4xcfql1rmythyh43ku7haq2ymde7s4896gzfcigycuow75dlpojql2jdakfmae0q8txenaaxqvvjal0',
                name: null,
                surname: 'g58ncta874zmectpuhejlw0jkp34y4tfqhobbgrzkv9b4yq7txq9i8oqedlna61h284yzzfkse56k8qzahf7z4sj03v1fb9q74011ah9vp83tchzol2t83qgfddlkyp9cza3qilo9ft2uqf27e4ke6rqr7mylxzwtzskzq25ri2e1tz852kt464w7fb3z5pnejkr7avs3qp579i76vhhk8a7liguxssxxahn8y7jmsoeylia6wtkxaj6bbujas6',
                email: '9jr5cirj3ouvcj9a8804bsk4dv5o98to0qauv3t68bc6e3ljlq19jt6326bcz5xt4pun6wapeklxgkk2iwa9e0pz5au59be2cle5lfqvmcaq6xsqtvhwtkxe',
                mobile: 'kpi2mafv9nnszdejep7nuk85ehutdyp15qikqagv1ow8rp2jbi9b7jmiojon',
                area: 'xbgem187j2m65uancbwwpzd31fh76ivqtocushl8e7m80w40sk8mzotxe59yd0a1w1tzr7m82z5p5fpvicl1e70ubil2hk0pfh6aiblz04pjx4egnipn4n67jnewa26k3vn2yrxieowwviqw34snj4l7c1pu4etp5zdwcacowfkp2syebkmr5vpyph5x1hxco7msdqtvql2wuz2wyn8abl43ahd0658ns3aw7cv1pqi4ujk0b23cam8csp4xxjf',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'yq4waaw6rcw7sco4141bebx347otrwkay300pfl7lt863rd0x6',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'ccgw7h4ha77axxizilzd',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'm2e6yvhtttlbdwl79lh9t5p36iu6k7zeuxdxc9ojscr8himv03g3282r48lbtkvyrw7ig68tbvc6w2r1gtkjsyu2y9xiyid1dx83onnehdxstuobe67jrue5pr9bg1wsnh1enb6cjfgnjnyy5j91dbuej0aqjfg5vya5zc3c0fdfn2jei6u12mgks2nyhrh5b58xciu6132x71xpo0bzv2b454gbevlkq099bz0nheg5k3u03yvwwspyiudj7s5',
                
                surname: 'ps45590gx8as8xqe06kso9bzk1gmnvoozd8nz8rouvgezbpyj9wxfw09d18g3ujbiytjggxvgm8ho2r54kqjbdxk4omp8qrrzz05ncrswnett0p9xielprl7h7pkz1g9hpwxuuycr3f772uwnnqzd15q0ksy9vzrw8yxpcf0tb3uej6hi692bzvd5uzkxun8m7xt2m0ss0ge5nkxsfwi70p2jmiql3o2u8ikzr4t800gdswi84zx4pqw0x6cndz',
                email: 'wxb7qsrgybwjwx21st9zpsah3puaehoxa1hgk9i4w0oghy77opo3nno3f89t3ycdy8lwap6z5wqf06wf09j2z1vzkg24jg0myd5e4twxrzlc19mdj95kglo2',
                mobile: 'pq684rv0ufkinsem8ygjkuoyqrt7k2ivyqfxfbh2moiaskv5v0gh25d8op1z',
                area: 'g8jcd3av3sgbvsg02pgdd07tb1qquxzqfohp5ncknv1gs7zsyc6n6y443vpnffgm0eigrp9414cff8kdfo3qrluty6erdstex5bgxz4ync4gl15n5ud3mjr0sqzs0c6fdbjt52tyvgkjw1pup8ekg0kcthftafvi9np9zy9yw4v2q32z3uq3moqgagvbobn0k9eyr921t12akktm2zve3zkgkmcevud7uytqq5mj8yyifg6hul9mavor1yk0i0y',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '95c24ykfax4lexpomky03sbcrgujhcxzjiv3y5bxfqgzm8tqbs',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'ujfn9fdb823r279038bu',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '4qf9dabgr1e5va27v3hmmrxqnt11vuzjqaz035v31bo52ml6nj7tba1i0qgtpm0762o1fyc21bz2vkhoa3tafjwk8eozngdfqcniger4i61t5vm0xkn10tin1z6ahrpeyjstwhnkepyynqi99h8bmpk4jd9sjo2onc8zplw9t6qzgy4uguo69lufnydmi6hladd6322swrnr9wkeir9rognmnqzevuf406fucgkiu1dzjh5imjc5laugl81wuv8',
                name: 'bfx4o7n6igwva2nrkbiu9jo5gj996arwa9tmvdjn11zmjhrj6ry3fts779yddfxrv9mkunz7hmtspkhtt6n8ejd6wtamgb3l4uupuad72axr5d7q7uzz7us98los34h0qjupi40c57bmpp4thoo39g4rgivrypgglcbgbgna4t9cgv5h19jrktl9jmehxx5wrmybxk4hi917madq6qxb1lo6jtdhkn5ne4uc8io0k0401cz27oplc8mb69jwgta',
                surname: 'gp5dcbe8yoo3su44kxlgeim96ovxmwhc5q0bu93g6d2n6jochf86xc5gna4sg2zx9r1o7bcfnudu560v5jl2w0b9wz5ghengqemdu2im47v9w6fiseavjgfv3f8lnwuz3mer9kurtted71li97pfm662mbs169besf3ibdvb5d223dm3n78mqsxse10n82kosoq4ezrb6bmhde80l4jljqk17umh1p8hi62v03amg6agavmmz4fwiuvn3hdb7tu',
                email: null,
                mobile: '6p1e3xlhp35vvlogefuh0cxe4b3es1o3ncwlnn711p4k0ba2luz13lmrgyp7',
                area: 'u7jl6xrmr2g9ry1dwn0rfi3epzsizzww4xqqnwh7ie7s9tz6jxip8eakm0ct4vhbbz0uuyk3fhqhdiz5sdwqbaq851nv8p28wzvc274nurjuo49xscca69ljiea7gof5cb49mqmlrmui0wfsp8yxx8p0fw6avidx2q7mkyotsa5x0o66rwiw5y97o104w52uxktwwyr2fmljow27z47ysvd7vp68gipx19mpkobrcoey8w838n6ldkafoikrm67',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 't63iw002j63fvipretjxq4pq0ziyo566dsyyvorwdb32x2rp6m',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'fd9hd41auzvkmfxl60lp',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'fnn1i9ffbuzn4mkkh3sjjzwzfkqkax8h7n5h128m97tz4jkj9w7ea1zdw8a7b30hrj5ex8hw56m85vshifdtxlblmd8uvklrnj0epa88whiv8vqe4ll7wxqjkj62dj5ri4dw0nxrppd73y6nk2t8m5q7y3af0b35xnatsmn23o4fri78xgqbwchs57ivybtfa97wiqr0rpayi9qle3yh20vfhr97zso8o4mtcx9u9ze3dqnlqervc796cziihs3',
                name: 'cftcb3grrf0m3stjwlsh6cbjapdsojh43mmyqbcpx9dkt7gkws2ug3507y5amfncapy6nuyxtll8kfq5gwojsd7819l0r73ancqlpugyn4zbnpj1cpwnpihp7sou4pjsej1ugx1bmmwhq65msubgj7umy6pdjh50unkd6e76gvpx9lh9ztw6n2w54devhvgdcz7mfrdu8v6vov161tgjqor324ghj6yz21fuuzwvm29xz7pdh4m46fmv21qflu5',
                surname: 'ij3rl106lscvh74dejynqlpv8gl9q43n3yh5z4b8eirt6ly71wdcj5j0xr5dxteqjr3vdgx88yrx3lsna9n70jzmwz0fp76jc6y5lzzmn6ejgi9a15gogabho7vpw26uuio385ztpbf4zy0wvwtnzb80ecn1eupoc6qfxyg8pj4ww0wnnl66tptxnbnuja9v1ok2gl5eo89c074d7ausatshv7e9ahfu9p49j4m2go80nsxg6eu1qnisyzdij5i',
                
                mobile: 'y548lr3109jk2n4x65bdc9xivzev0od6sy60qau2v2qc2ko9kxn5rwfqcf90',
                area: 'ecgsp34iv3yiperm44qx7s94jt63gd8ekt3fk2efa89yi2qq5loa8w4pr4a842uxfej04mui39732k4xtt3uyc5k4yqzihnm70ll1qzjkk3i8gac1lyobdk14ff0wr4q37v5xu65xlwsvizxuiles9t48dddpxunhy58znb6pp4wjaheoreu20jql4b1lbl4rz3581b6mrilx1022g9ruwam1koeswvj6xbzsu92b38s8eix58q669t4h2dvgtf',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'qdjh4oj4onanh9plb9krvfqvqiv4gfexhk2ykbclyjiyvf33rw',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'zze6jcea2akolvun9iq2',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'w5pbo40iqc6q13t88cvlbj3yw7hmj1ceeyc3pokscka0wutbt6st0tfwvo8omunjcqx2osgbckls8kal9vkzx0gabatkbbzn8pjecyaya8jzbpp1nv1gyt55xzunovt0rqbfy356y1r29w6whxrkpfvtm1fq58fk707d28smpy8kd6ijk21ydkx9vxyq1p1awwzk9677scslmqxxqh6v4nbedzk6rc0cixsfvpz5vb8hi858b1popq34m3iz3yb',
                name: 'jo42zqcm7o8ztqftbsvve3cbuy00d67gj0xlguk6dw7vm72847x3vdshj214dq0nxvibv9wet6670q9hkxe2bl66f2q45qmdpgcii7hqatidjkkilh8mdhdenyh5budwzraqr7wq2qdo4uwgectxgjmwzglblcf8l9db1vm5lmoocqdwj4508h8vfxkjgvyhpt9jg27qvumdrskhj5d8htkuldqn4138i6w6l0fm3o877bv2xhy2vpclaw5612w',
                surname: '5o37enwniij44whmx2i7eof6ksm6zyfukcdyleuzrszngv1c4gt38ge1v9ncknn0jjrm14cf1rpep81hpot6v101lqpj0ebda00mwbgivwr4d2eh5kpwkhtjraaq9p9yvwzy7updkqfdl5d17qqlj7yq59srl7j7u9a7kgwq24d1wlpci3l7vi2s74rijyg53dg215ecqrzo265511n4wckdsy9ovydjlwu7darwkao8ag25orh393cnumdmzmx',
                email: 'iuyiktf2ix5qmdviqj5skmwy8cnieoh5k9o33yfpdlflb2e1mdfcq5zndxapbgffcf1edz72nh28huu3jhc9htryeg2n9how8r5dbqm5hoqex51v26i0ne1z',
                mobile: 'voxeiqpaaz9dgwkwaw7tevw34nwvm7devr1shxosw6yl5bc8v402p6jgxiu7',
                area: 'oubqq158ejhvc93zmgvjzfyb2337tdnx27chgmnlq7cvhboa7s5asbrts1haoqzjd8h0jhs3jie5uohmvzbkd58h4zuh6l6q16b2j174szzjc49ca8cay6evce8ueukrhpodehifj2a802guvnq654frja8nxdsg84rfkhq82lryk0go3olsgpnoqj764toqssi0j3t8rts8aqep8g7qztjbt3nqw6cttzylqfnmrkn7daa4pkz7lrqxkrvua17',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'whqun6u6xn59c6sxrrpislhy8qt7j1rd74g5whyknyca7zobmc',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'rfn8fdvei1ypthxy520s',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '6d68y8vxf52qx21rv4kjn7focxp3vmy2nzkaaiad7i814nrokb8h7fofm28jhqjwjwl6oh9hjp1snn69igkyn85yfz460fm3t0x4tu9ky0s48iv2r85ji1q4h0aojbzcocb49358cdi24fsnncyfg39yli5fxw6y68ru4qu8sky9abmt53szgm2od6mmvorwxoo8ojhcw8qu300x83mse24qgsi61m4ivhpgreilwkleqfqn3llktexu0k5kdu7',
                name: 'v2whodfy0vbx4b3y1odsrs91v3qclasqzlrcmh0mw68314db9ohcssux0tlv2xg65k03k4413gea2aacd9nwv80tdirnt1bs3kidlx88dn8xgf7bm84vqmznnpv5x88k79r9wupwr0rb92ru895xl3ce1sitkuia7dsbcpsfwekpzx9gnkaav4re6eajtl869oresj4zduh26johxwzz8yhy0u762lsd78zt52pup10pfozr7wfokl48q0d6kxe',
                surname: 'r2c1xhfzxmpy9v8kk7h9l316vgk86ujd8bree5royd271lwt33dtpkq6tpt03saofkuhu9qeuf73xkf9w53ml9zo6rantu6ixdfpqgonhpfl6pn1477aftz2rndfqqcpshtrcyj39aynrl6qukau1mswbcwyn3bkcrtkfcl8x54g63yom7jqlj9ieybv3vgrp3kliul6makg18miup0u3evglynq10o55eu577qk9b11sfw7rhg01r261t8bs70',
                email: 'cjxbf98i5wyzzamr4ggszjdmh7hdyczviyhhgiq1tvokoe21q2e6v4b7em52zix5jadjbdta5zpqjtot6k0n6nb0n67mi05w0140xnn8s2h4g3wxc7wgf6cp',
                mobile: 'x9dbv79xwxozsxo6jxqywzv2gqe1aw4rrldoaqn6mdojfq1j21a0w0hw70dr',
                area: 'x3ss99hkra2d3ftzd9uc999cz880kk323egx2y1cwb2mkxmpi87o8onwih76efiw14ebwafc8sq4qsuofx5quojdvblm4ey3pz1z5vhtotn3l2f4vvpuq1dv4fuj7x4qlimti0w150ebaomi4vys7b6eshy9yccalash8izx24w4nd4xqjocucpnbu0iqpyofg8qskyfb7eis0y52ogro1r1uinqkboczuxb4d7uwaqj1w68s2936pi1qke9qs8',
                
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'rg39nf46cqj2ptce4173o5mr3qjeq9mt06j34txbqig98o4hr3',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'wjp7dcivhw63w12dhjwo',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'fgg7cau95tw6q7mjqc0he3k01fn90key6c5v5rqn97fd8qsgcbndb5f7jhz5mxrah5ifxmghq6vspfg4mwnhdaom294n5rlnvy1femsxvvbr9racvk3is91yev9cz9zs6dm9o6dizaivxzrnnpacnkys29h756po4ewxemdyb8x10jkgh655umzz1ls7inb050khq686nh9me42ce6efe93qn8otpvp0ul6wq0ivnl3ud5duf9bqshst0im4rhk',
                name: 'kegy2sqmxadc2esahl1e2fz7am8zg6sf9sthrsj7k0yaez05n07b4zoai8tib0jvbxz9npkxk9f394cmaocipilw67ww1gz46hezqnxg9oy27j95xwbzm9et0r2rwg8so3x01ulkv2oq06h9gsyh5sqlo7e16zzqliwu4wwgszjv915wh8mcor1invyuuyoczbblmd6uwy5g7bq88mkw1zraxg84gz8njed5cn7bjt6lc8lp9mrq56dps6celu5',
                surname: 'm7aedwgh28caxcuqb1n5uy70y6op1f9tc8cepb99b4bow1o6nu0245csqvrwog8cm679mswr625t9waaoilmftcl11x8uorfghsqvg1yty6fi6rcuamqibpi4b28488ci9r2ys1yzz6si4g2bo18f44pitmuc1hunwfj2azlk2u85odtzfg39famzqk2giprp53ron53bco0a9m9ffom7f9i1kvsyvr7tbjjrfjlvmftelusg7zfrxt8gzhef66',
                email: '4jbnunmgz5j195jp8lad2i2sdnlr8vg81m0jlj9eho0yboce08pxkju4otyfwdi3tf6u13hsjr316s1orw1dws615gpbmus6sweylz17bay287swsowkbglm',
                mobile: 'ngzrc6vvyju7rrc6hi3hkgrwbzf3mu0zvkcvne2bn7so613evxojsoh95zrw',
                area: '8l4ztndomoia2qv005czrwhhtsj5qat43yb8hrj96s2b1u9hfykgpgupdojp4ulqkkyidqbsjllbmph7yb889j579lpjvz5j48u3yzu6gvoc0n4qd1p176pq7btomrvdt7scmcclzwcc6ju0fx9cfkdhqykxiaypw997it2f19aqy0idechd6ua81550mhk5o7l5svfewwobb0qdieja967e2b0itqf1smapma7vgdgh5fiyaatrlzpv8in0dck',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'mew1f570jm9f5oncf6vjpsn26bm9lo0jbjzvvd2gb1bc2mhjed',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'ovzb7dy8n48syyc2q3ym',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'ghxtysl4qnumb5vna649aux0koyaediqfnz0dfg6kaxdn7sa1iv9j4l33v8igh8jtip0kjaeixv19g91jc7kqab7xl7uufsz1twoo6k78d2jveypaek6iftrfmdkkcut4ajale269ecdfen6rb93nji1fbwi82q0fdzrykc1tztrazr5hg8b3zhqbd0jax9cbfxsusoi4vsd4a12iu5jkkkoekoval7nlc1zxlftybelqeqk2lq57khlpvd8441',
                name: 'uxj54hyq6eyrb6m3xz33jt1sfaclvcy4u9e59cog5md2vb85vy88iaekbx817vv553z4h2cdcyqx6sqh0hli24xk2whckk4oh3bcoyypr80fhd6ysmxmx5d7pz35q0w3j7u36oqgustxbjp08y1v7uk93wsuhl42dfzh9rzutfhlwe5y51ucrwcm00iwie0i5gleqnh80p719l20rk39lzab9n7nixufmiupzpz8b2npsq31z1v9kagiowpeugs',
                surname: 'zojladf5fg3lbmccazw1g4n6hsl4g2hk96s4pj8t6j0vf9ipok9o3e18m0la2h9iy41awprq2b9buhp6hmopmpkt6qmlwrg4tzazzmbac3bwm2t99uzd9arclsej5l89fm7vbg964328whjdsaql768r4yqpthyeokq5sw08inxvy1323hjk1luvnw8s6u0e5nr2o7x942s0ipzga00pebnhqyel11gko8ac7sykircemhfxycu84yots4tl7u0',
                email: '0d05etidd0zylqkqd3bp2cst8srbjglrydcilptaz2xivsl9wuo1y3w8pvkpk0jupgkjfxrj01qkeg89nvikbdrp04gsv7v85f0vm3pnsurvni87pu6iw8bn',
                mobile: 'y9engfyhdxafj34mmty1kql5duxul1jzzd93v5k2zz8c4oyn9gymxz1jua20',
                area: 's0jjb09touu3zcjgshuvoc3rixk1oi6bl9hugwr1a3u361iljopbgsokdlq8zcive8jszggixhrmk6ftm1dovpf1aybbqh2u8my55m7blv9v8f50f14j7d708hdl9bded8mn5mob80ns64uahnj3zfo8xsxik9n9wnmva296174314ced8rrh4s9po72muzw4mjtct5i3u3nqpl2bvtke3wjbuh15xxurmpvucyv0e4xxi8e02zlrnbndxlgie0',
                hasConsentEmail: true,
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'smaezyqbyt3zrv8zxpimqftrzw2f6s26mzfo1uf1nhbd5pqqxj',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '646m5ae0s4zjrj1w9bb4',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'x0fui1crsy460r0bibbae32oawobv73xgy2fiybii7h688z9nvtj3m6ax0jyvaun90b31yhyn8ldk3ai0ec11bp05ewwb6rwqw3htcoa5onk1n1bhrgtbrixn8yqh18ogbtiaohxjhnsgpb95z1b9xighg4ujhhtfmn1bqtdyqbiitjvouivnllrshbou2xj7ms5xnzgwpy2q4zc111iq8j4d7fxzz4fb4hrl85sl3chlenccpo3e36d6gnt40t',
                name: 'pe3yigem8iume7avggkmsjej25tmd3bqyokcusz72uzbnekq2hz8mcocv14vsfmmr9zi8sm74kvtc8ngg0l2gdbv8yor3rwrv076aukybfo2rsgukxklsqvgum652w5bagy6fe0u83tp1fyufclkgugen9lqge5v09mxvy4yo9f5tyw404e5eai1d2pg8zvlxqvrgme3t5jpp92cbhzv9j9pv4wl3utbhh92gg49llvbhd96ljdzj95nwtwtsir',
                surname: 'wxgg307owt9d6l87utfjygpvgp3eczjh8b3ixywkwvd7rd9hqxzeqxvdy8racfp2w3biqwzc84se6pcjzetpjqoiuvaja87nv1fgg6f7ab88cr3lgodis6etm2fy91fkcrlwqybmip0ijoaplnfzccmj9knlg2ktcu0jyt1k9kji20jx5azhzzc9fg7zrg1b8nzwe7hij1fj3q6p0csntijcrtam57p2tr3ffr43cgrw6u5tzca7lhv9bpp2ayk',
                email: 'phrirdu5zmz6v7sqvyeh91vcfzxg06lajafmb7c4k09q1pyd2oqv11fadyitvst0thn978gg6iqz077ote6172qtkz8l7kh6thap9ri5wtyi7zmv7u0cepfl',
                mobile: 'adb5kucytrhqt0rydh6yzcus1g8gfofgmvjo93dz2t7olkxuh6cmh4wdck7q',
                area: 'bdf8chwcz7q92dc3u2lzpmsavou6a5mmfabx9o86d9rse7tk22ris3tx0t1t6vcpek3igqn868p28ctnzkyncpqy9c2tz5boggb0cxpcs8v7wah5ld7m5sjkzuuakbwl80linj0pstfq1xl2lq6v36abujqvxrevxdr2gg1758hxgwm3q8do71l151uns2llzd8hnrkvispld8qq8y0c4lxoi4clux1vytms8x8kjwuur4bj8smfxgc3kmzu9ua',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '015uy2ef959713drrp6pxia4cxuznc8z0ng87e2qisj945hvf9',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'i1slk1cghvsp63gsvjg8',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '06chz9srab1gse4ukrs3cvqj2q945u13h45lagpga4fsfyoebrx08uywa2jeemv8h30edgtlrjyj86810h2hbh50va222im3d3h0qtxfoogrhmqdwhirteoaq9xm144ix9lb06he97r5laua8di5ugunxcty89pevg91vxpeg0w0u7nxjxwtucuu12ipniiireg6328t206shbsh0jkjbsk8qoahok46c9ee505g4ecmp8ttlrvyn2y78yfghts',
                name: '6qlfou3y5g8tfix22op0011kgvrel29crdei2cf3uo5qotxhlfnot23u2ncghl86wz7qvdmt7kyd23zc9fvx5ace1cyqilkb4g3hrkuxc9ivw74v90qazc6syjbdnukawwwmz94renne24ulv2qnt43c4ybbsb7a1i3c9zp0j739136htniguw5a0erpimka05w7d8djyjhijll37f9c4hsh3g0sev9imxiopmx4dy8dyzhdaw2mv1czsxfuo6m',
                surname: 'f1022wzbp958wo3fcp173acj8bhytb37ywy774edf1bss22hr4o0503dpfukj7nzsmbhk6clrfc0ttuals5it8fq06iptqannob3ten2mecxkd2k71esxmkdapkofe2nneob9n9ea408t6aboef0s9gd3qc7vyg6qvquqxmkx06obera53icvhrhg8mhw4dn9adgry0xeytd5hoip19qd6byb58an24wfzfeqpjmjexd05fml6xo1rhmea71f4q',
                email: 'nwdq6cei68m84tdumowrltlkfa8p9ujqo8aueuqsbenfw1jqa4rswma3wzta1b4eiew3i8tjrmujlqvms8ziva4pn149yycscu4klhvzo2xx58u89x753tc2',
                mobile: 'l86yxa4v2zud9ywe5o9r9qdhlps69i4id23joea3f0zt7l36iv4urmdjosrt',
                area: 'biiz9fmc4cetvgqvdf3e15wzeagklxiri9sozy76kc3ir4o4jszbthh1kd24f1truzut1hlooeowj5lmhunq3oauqzewgpo408r0ni6jy9ep4i23be24ffzd0q0tae3armdv2rs33cywxv35r83joe8o3aoinrrnmnopjcqonqhsnor11g9lk2jjl2b0ptqm1jztk5fl8q47dgfgb0q235hgl8ta3uuyxn2di5soomatvbr1di4wd0lrvg5gh64',
                hasConsentEmail: true,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '9dy3073khmvqxt1vbpwdvr9z2qt5uwjudfdu1',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'dlru8it8b4prnyp44dln80wffyltmfrrxp1fiu1m6tycvqmhxc',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'sbx6nouag9hwluzdbiy2',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '6r1p4lfvr469q3rom9oy1dvkxdjg20jjq8zu0bo4diadctgq28sdq26pq42ve81cujstydfr9dxew6s0iae3pslccoj1wx65pd7tt0y4argrlu6debtkspmj367rgi9bmh3nt2i2v9ig3e8mi0pir70gfu8jw4fo7mn2m3aidacq47oy7efgh9ksnbhwpuqpqbjbdzrxfvslkliucl3gi4r4lltzjlgdfcm85gsgmfe1ubwpdvrhhb0a5we104m',
                name: 'c9o6vmu7rfy9gc7iidqi9sug5to59qyydza67al1h72a6ym50agbgpirm2a9e7pjyrxdwnlgtid9tyttcqangwn2wcby3zqig2efs8830rsxgtefxcziht2wubqi397gzpj5sovd4hq8rff41op4hsyjokl46oeqfzwz87db06l0utaqqzpc592ynhqaonxebz4fvnfoflua2dvfpvnz8oiks29r1tcjatv1ux9pfpjptkfewcflbx5s20vrnqo',
                surname: 'urfk98hvimaknjjgag0okav1rk0kvrghjg6jyn9arnsx1rir3366651n23r0uxfx78b6r9vbjf0j45rh02hmavg0u7i9qobrctsr72b1pptcfsjstsys80kgvhj9d7xbz1p9p771kry9fonvjwk3ah60tc2l75x7l0y79o6lqb0tgaptc0le5qn2ue3puhj5da9scj0h5fqkhqoh7lg2kul4gw7c9dwtr4x3k8lqpodgvoactsdjdduov33pn8r',
                email: 'ug8ysfe9p6bz36v208fzj9u4in5t4p26ch8xyowjhfn3zepzo9zn5li8c94ihv8kknm0bx7sy92vz7qy290vpbp6imvllseffot7mzwbou59nqtylr15rele',
                mobile: '8ls1w1eavcerq2cvyu9ug88l63o4ehb63a5jso3jm0cxlsivug1okixkv0d0',
                area: 'r4xe00dze7gt6ogamrsv98tdpv3wqyfo0cjwdkkxfmd18pfqlj9s39xxyp02m84a1ripxzh8f4uy385gn0fq5v546de7dj8mayjakdn485kfd5zooacvezwwwuf324q1eqkpot2etfit6d4x2em61gy6q08rb854dymik1bottni6yncql2xqn36nj7kgb5txrhlgaoydnwvwm0m894lfplsq86t4nqm4lmv8qwe45g202i1blxn3hv5cbji9se',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: 'qrdxjqbutlzby2qy77bavjv8x35yxieevmp9f',
                tenantCode: 'syp3g8q0g3q3y07ur95h35r59a28jffe2ddhpp9z07gy8rx47b',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'z9pftpb767ufepulvcbd',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'df8bea62clnhthhuk8p04xqcqsd5pksjfuxk8gaso91xvmb8vt4i7rhrdzzh2rxrd36zqfer9s49jjff0gmrbc9ln43xaunszfmf4537gnaoqxxe4995y035v12q720wnzahbm5izzwhub0jpwuin0fwf8zf5krk4ylhpjiiicffstzksv463x89vohgeoyjehkomp4le3j4jlovfos50rp9zvdr05t84txkkom7gh0dxcv0isjstkumc9v4sr1',
                name: '0k1ho5z92u69wvcjjwcpfpjmssyzvn9eiz01rmzd8onpropk2bcvnakj5qhkex3mqd5xqyo1d8ygxfsezbg09vgcpiu5ch3agyu3mcyzk72ri7fmr2ckoa9fawtezmy7ybcuf2awbrmsxyomkal0mnsmofcpjppd6qz7qpwx92jn3bzunlx3ru9fs21e8nmmw69py6snh79qs6pe68c6clzhdyvg8yszohvpqq5ylso8atxcmlflpbywqin7ub1',
                surname: 'hbjy8zsqrbecd5oq3nfybshgqm0l6c9kt2a2q8e1scha8kebez472fw3e25whlqysy4t82jt03jsvu18rk897n5b5tkuvw3apuj6v3xd11jeafyoumwbeuwksm8kt4x4juydn8oxqjigj3crk8kj2hsstdb0z7784o30aqsh7103trbodir8dolfq2fwjgf0liheq3ounjc5vy97g622uhfl2cy13gnkkd7a00dm3uzcpl24dfeozvfz7f6rvkm',
                email: 'vmr8b1no2e4kipz8re6ga2e5en0d0o3zli312p6h0x5kv2uzs4o2rmraddbks9ce0rxfl7yuisbz5xp22c035slzgnpiyajuxsns6k3swtiqy9wuqfbixdt9',
                mobile: '4ubr8f5qagx7cz7tp3os4aryfz62mardvpuqg1cc6buy644f2e76eeesd9qc',
                area: 'o8rwxgalsb1hf7ij6m7p7fp2upzw8figlwp80fwx3ssd4aasxw54furee2xv2005j6uf5t6d7vl3pkcjxy30mcpeculxjr5lu4a53bctw1x5oeclfu8o51z7o30aky66dha0khj2fhss1tvb4ynush2extzay7adfpcgk0ud7nuu2w2hc9tb98gcfchx20khlrfu5zrcanlmjrdruw50348ex95qosyyk93s4sziit0ck9kvctzs8n7ls2mie7u',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '21d0c77bpg944540nr5xmccpwtbpux5rg0bhc3utvgwclu4afv',
                systemId: '4h4j9zp7mwo35xli56eqf54uookul97x3sncd',
                systemName: 'vwtobs0p04qp86hnvcqr',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '68p4kj7ks49nxp49ys6jrkgsvztesaloltvs9kumn0ecridvpx83bwxyqdj8iza1qmnqrzpeyj6cg09cz8sx303wns7mg5zmurrt6d7ei2rh941v0uzn3xttm2ge13y6zc0yb8osumycqty8ll6m418t9u2rln55k7937nhi8in6o7v4wjfmus95uya20rsk0xwzljnlginkh6sqdrcibrm1gzhc6cqzeatmt2p5vfns12s0ze1nbvlrusuz7le',
                name: 'w1gth757yai8dkwv3my369wpkuc6n5tyducmbjhv0eix4lvjwt2qce8op06odh86pepyls6fo31lvdvdtjpdc35fmjyt331upyxd0m202q05yq9ammfs06vicyxs603tov76jveplx6r8kibmtwhp8ihn86825e3wesq03by8rvkxlurl0dkxkuu493fslspllab9c3er0hyvfepvh98ir7aizjy70ngp9vww5l63c2vjs1uv1r54ohfo2o2z1q',
                surname: '0f81zs4letcsk88djbrbdjsyql1rv7ugc87hnb0h1ds0h5qouh1jowrjo7hzq53diikcoc828ktfjj9p299y6rmor5iv3jv7lq6yela28vvsbb87grtjdl8wkiqasvbcsfwr4a1vgw20kin0odb52cyf35vl82zczn5a7lvt4ivl0fv3w45ijiwvoagfunpoxnnlpmkmuhh4lv2ypwew6lusxjvtvzrgp3chlwukf9pbl0fsvgsm45yd3e4ps2q',
                email: 'f9p2ele1mwu81gb8ytw5dxokusb7bdlp4gd58ck212w5g7opk8nb9ji2hronl7tlo4fnd66ouw6bemb63ipiaglwkqha88yn72r9motjuc0ergwxercc4f29',
                mobile: 'td0zgr2ic8uf7qs8djrlxkuytximdqb6dlaid2py6pqm6td7exg75pf4tklt',
                area: 'cv7glb433w7swrunz3g0hdicxfb2k8jthe8tge91woabb79bffhsuz04r4fr03izcumwk4m3ugtp7l88qf4oyjsti39m5lkaj0wfsex5mei28hghyleomcoh3xpcyxp4y6ghwvx9n20qoq2iqb5h5ujaa2ohb027ydrqhooib24pdrl8kermudlnclt31xuo3zb514lmb2ow7cxyswc434mbio3ht0w346jyecxsgnj96jeuu24t8ogtce25x7p',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '02w7ynuv0pvypfu1eomk7eb858g44tab2voeb2maszpa4j5qwq',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '2kjze1f3akmfgmpt7yo3',
                roleId: 'cqlcttvxlf11nur8wgc7j81dgfykl0o5m00dv',
                roleName: 'qla3nd2csclmi2jykqnasjuvwjnq5ah2ffkoia32qzqmvuq6a50drf6wub4ieaivmrcam0aj7ikk5pwp7fc1bq6o2ufbbq36lstz7oivakmn6w5x0m68p4dkhj55e6iy7tkjtfmus2ldao1694a08xemmfnh4vwcjpynrzmqzvurz27z9l1pgv4vfkw2v1elb2upfnbftmz2kjjxrtfv1y0asofgfm4hl1n3t70z9pa0p7xho6yxvc6wfmpsazj',
                name: 'tnxv8j60rqguqppc6kyq22rj93r9buui37nkkehjgtqyx6q4b4u3f5jkfaeur3u535ehi0u99z7tuzadfnhioqovdijt9t7xs1j4c0v83gmeztboj5r55oxrau5liksa3ecbztb4127m2zw48qp318nihwi3naidfq4w17a5n07ihrw7iactcdkfoh80euwmb1m2g1e1oyy3pth5jj7xgwewmg1z1tm4v2spon1iu113pz4l0nvor749ruccou7',
                surname: 'ndm1fr3zq95vvsinax2mdris724j4ks8uj0hp97au2dp0bcfu8wdri8b55h4vxfcpjmzehrxe3kgsnubse99wwraw3kdfa6owm1toxox90csz7fklynjog7qzs382l1bskv56l6si5wxi5d9hwzwk09qwcajxnlqda7kimf1qeje1wiyrhi3vsdn9fn2h12bsc9prbnw09o1hvctdszwjklbpm1x6wc3w70n698qy3ovx9thwlbsalcjsyxyuut',
                email: 'vbzxvlq7vunoow0cnva6oddapjodb6o6kb1fn0jotatro63dydob2lvpe6j78opp11c7k03w2rzkc7rt59ynrzybzns7ovv97q5tyae0y30289ybvuw5sn5m',
                mobile: 'f2v1pvcqrg0ubn6k6535cwm5ew7mppeeb7dn0z72uuwvcpvl3hafxo7c9me8',
                area: 'z2y66phln9k2th0bg7as2w9mk51kz5voebs8l47k0mmclfqrd1zf4903rrzvr8vcqs9sup023z8es7bnm2qv24b4ps0wpflbetoiv7hxbfcgkdqhlkjavrc5jwll44q87q30v8rumobxkmhbspt936x6utyf2rn4trl39gr6u0a63sbgkvmhd4mr76eud979zr694tno3hajj04i3o5ovp0v63cojgof5u6q3r4xbwchhub2mjz9u1jmpdjo9tg',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'leyz2ucsc2nbsod3jepoj4gax1cwxvjv1j367dt6i53npjrvjzi',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'aljd8bj909z9qs8r17po',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'me1o6m5c4043r7vk3u0phgbw5pb6wemki57ki30zwpe3o4inigilw703sgxmadayjzl5f9jaofcp5xj1j7qs6i7lxy431qkmoxvvtx1hjz1knabam2mgix4krvgxwu9tje2hpw6ffsb75lywq86t7u8v54bcyb6zoxa52rek2ugo208aedrgzgigppkbyk2hxzhdy7bjgu4jwx2ojhqmtii7zdqb8d15y3klqti3ls71swdsvzx372vi4001kdo',
                name: 'dye3zlmcia8nph0git0qkthkbj9yo95amg5rod6w1b8puobmbsy84otu32mgv5h4pm9kgs6xlgizpcza818potovrgtzebtw3u0ed1dd8rs8rat6pg8ekb46e6l4u01k8p28pz29s21l0q0gk5mqi4profl66dewcjnsl9h17fq7qddh4o95dkg7vpqf2uqc797hod5q95siu21efcxl0vl96xderndrbqkm92qsjcoqtwgb09bphy7mljo4izx',
                surname: 'fh1ekllyn1q35vsm4xx3zdpcmjfttqtjmvdpog0l77jmyr18flukcwbtqzc1um0vshou9asr8da7tp58rwvzuj0reuy3jp4mswmd0p1odsh0fbsema2zsddem7dubj2ws8bztqqvm9ptgewpdmgj2oxbhog6pfx7odiseevgiqq39jd45wqzju02il1b33lxn2w5wikzghff16xpbg95g6rzr5eru67rvkrehuldpk8o7cmnfwrr0gimfvgrhxi',
                email: 'ed7b0bc5cuu2pi39c6p85q3j6vpvzw0104x2d5l4uqzef2emfxi3zsv8hze2ktq802l8zo1vy1do5hmllonsg4g2lpb81as4it7m24x97wnpn8gj70htsc37',
                mobile: '9vddr11i74dqhrmqji5ffhjow08p77dt6g3dudqlborebcqzm6pd08djipvh',
                area: 'r1gyz9in6kpuryuo2gw61wfvw6cx7eah4iami5xg48xjkmx2madlgsh7t6e1xkajb80feryrwqxhddxz9snn8mq29qvb4wvkqov7tyelirjwyacah50yhc5zzxll9wvzjjwc7ewsv4xsfh9jl6ujzoxuu1nlwekc3mv7r1ch82qw9tptma5i80qvx9gy0z5nsughhi939f2f708b7be8b5zi7yi473tws06x665wcfux6w7een29csejs4x8yck',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'dkgb0oru1sbbb0jhkyp8pzhgb32mcso6kfm4259rw6zzm3h2go',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'jyj2n6t1n9odlcrxmh79i',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '4xbyft8f9ubw1wl4qrpyv9z2rvnmzerqv0oumk1o0xq0v4wdo1dycbc6j42oyuraq6iuc7wpyk74lub5si4rs9eyzdj8t2qepxiyihsn8w4nhjs19vrqq8tvvquplymoedt2xt1zl7sxvdyynmqqdfxpwdnbeahc1a35cojspjw48wvnrlp94cv1tnjxz4ck3tdskk13xf18ys1gkvvgcxpkeudtlgc7k38wfe8dtgdb8deildtqpxmgk8mgbeb',
                name: 'flxuvz9z47pxxubw1huv61jwf546fmoq2a0wqbxwjcw0yqmqizd2ppqxm97iz3diop8c8ubup94ibe19mrhpft7be26drbpw9uxeo69eo2pfx04gfz15cbaeuflouruxh928y2xutgrv6lguuqbtf0wuhzm6h3n9mnyfl1w7jexnl5phsi3rz58g1xmxsdrhp5bhmfdij9jdacdl3vrpa4em9mb9l6n76fsz289j7i921uwkqe7oi8zlo6q5ai7',
                surname: 'g297g05pec59iuj51rj994suy1k6jg7xjszn7i6w52k3rdgk5kasv4qkxqiny7406erazzj6td2tkqlul4w1x1nn0juyedlr0ntf1lklvyuxp9ff9wrwjaf7d9trd12x79y8n71j5h9uoq7gw6wc7xz1032hol9ak77yq6avhupbfia992vck6nra4g5ih8n6iui1cq3ubvt1lng5g5tqv7dhctztfshvouz9ukyqdyf1um1n1xmje87nt8xn0p',
                email: 'jj8500hlv5yt0wiiqlk3aa1ly6kuidp5e8cl13b2si8v2yowobz5ih969jsvs0ei0j8qth3fpghe938j5z9qzu3jdnpf6b7koxncumv9tkiwzl3qius909uy',
                mobile: 'lr3evydr4m8teq29442try0vbgvmh8bhpc7fno6tvv4iue4evsa4efjhwe2f',
                area: 'fmroxzc37dhjz8kozl56n1yjktppooz2l3453sejsgnzw79k13ldolog3j8rih3h0mew1fhyqfy9xbav1xakpyc4y3v21ugf1cfuy3qyy26ktpsekxb50qbdys5f5p9tlvlusaask2m7av5wb84495r5crhdzhjl3i64aankdzt37nhzl3u5psoi1en9fygr1ndzycrb2vli5st0objgv45wzbdfnp0y7bojvz57aty7zuqk4m7ii9u0vydewzg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'iwp2yzfoyza5w2926nulpu0soy9vimlwxm4xaltt1lfa6szjt1',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '56a2o2cofwc6uczrpxq1',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'w70bamjafln4lnja36wz3cuq4n9qlhzpmoxygay1lvr797jz7lsu9c44cicdrvgl6ubrlqt7rx9hqywnfzwf6wwxm9r5keh1ip0wsqydrmoog2zmtuwx5vxfhd99eua1l8ga4nf9tj42bjewuxzw7kb3c7hmzkdm3dyu2yoziu7swrvelor3o9pkfy3u7a9uvfndzp4jbi9qv08iywayaxoo4ypgd1l9p2p9s0ebf3r4i2y3ypupsc28zcvhcles',
                name: 'vwt6yt928qrg6vn67zzsfnp6cow7xqffrxysm2i9f4fgy7tc6x3s7f7fgeqwbsdkw2fsew9sssra5ymhsltbr531dkbf9i6ns5iragvs45xt8zzlfl1b8cu34jh5100jmetwbx76z5bxf89dq1v6t2wold4e5m2kpekrwwjcwcptub3dji83ndpx04yh1t3vxvsqkstj7be1c9uvahanyhnbubnh8m1ndh6gosyjbzv8hmsvg05xkdn3movasuz',
                surname: '44c7io04ccwgg5f845cxcjjnkiiq0m3ybrbqs7uhnbpiupgvsaf1ixr1m02dgyjutbcllzfbzov3yau6yg9ie12mp4xnoxzpb9ystrpwitfuf4nrykpaf2mlxvqzojtd83y40q6x8eafz7ivprr3m0g7t1xhbj8tonglp6t313r8he917dol9e5myvxf3zi30v25sug7pqubdcw42947pd1q8wkra9bxqeinbmvule98p7zvg62wei4pqvn2t9b',
                email: 'a178dvzbz3d5m1ufzlw9dllrhp6wen3rrn8hnizt4kqkwyc9r3w7ygvubyjc30h9wrqw4xp3kddgjvdaxmgh8brnxngtic7y8fq8u3omj5stfjf5df1am181',
                mobile: 'r8etgxsj5k5togoo5xe6ej800wvc0yyl67k0n1769w18pjscszde2d8dx8jo',
                area: 'pf55gooehu1x65pugwk1ajh5vx2pca26ibf6cocbogfm69bblc1lvpjk83368tvvjc44r3nxdt2t1e820w9z6btrpapomlffmy2scendmeiynhcqwvtyqpqbctzr6xkm84t13rwubk7bp72k9vek2boq7ia8wkiyp43dm9m2rfdnwas520z0hnsub4gjs3h2el1kt4stk5cl7utkjnhp9yk8v5adm0pnh5vquyz82fsvncinotygfs8i2w910m3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '8j71zmqen90fjwwjmk4gmfr8hbh49rii8fsg80dqq026up1959',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '70bvzmsxhacqqn5xl7vb',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '45b3y202j1g66i11e15mc1l1fca9kk4e5bp4qb5188qjc3etmsv6x7y1wxwt3dqd3ehfkq25ofux3stji9xg4wktebjaaztmwz7pkwfiy34ayap6m5jx7f1d48rkm1csf7s2fblkwac64s6l5sm9grhd7nyvb9m1jehn2hmehgrcyzkntjz4477g5f44s1rebywryn6c57hjebgoeq8mdgfdqqx47afw87rd3bix2tgwtio0v2mh9k7nn7tihpx',
                name: 'xzydkaivwq2serwd376250dv427jv94bxazw6lrd5oreve5rs551q3y8efknikwsbpsklkb82azxkxs3suvcpdwl2r5hgtqc6h0uzhoztkiazpawspurr71k5k1ruiynnxdgl27dtex32x6kxmysvys4immorrjtojwm6jrazrc85jgv46buxrsyxbot441f04pfmfwyuoekrkxi9ih3924xhig1njvjq262d6c6mmcqnjrxltcevcxlfneiuyqe',
                surname: 'lyo6e91eqwc4vkz00e02j6pxqstpkf456dvh8dpayrd7uqaqj9u2ev9e7hnwfhhd7d3ov2cz0jfr35yk1b1ty2iihvv6etjh2ftbtszjdw0uctpnbnhyc50aef9vthuov0mynxthrnvpiie8dcy7gsrn935w3c9yo20l1zw9054t1sxe9psllz6v8uooebdebb6nrrxsl1q7amy8w5wzy20bzcszzf2kcv7hltw97nwi46yv73bzy8kks4rgot3',
                email: 'rxf4ejc3omq2u4qe4dd3spufumii5vo16tauuapeaiko6vatwre3reu7028hytknoaqdzg6pzz93akyyurzsqazj4r5mdv4o110wy1iaahe0e1u4fbbdaek9',
                mobile: 'c9glkkl2ou3ep2ptvw47aaz9nstx5iudd26uz3fdvlgcw92obsdh8rggw9ie',
                area: 'p9aalufblyy953aoehf4w33l0d66ba3e4fjsixu4t0aocgcu5g6hn1gt6leh445ubqpjudckr6bpy8izhxtthnpyxlncecsziaelvygpyjojh4cdzdhq7xxvve82ix5gr0461uybmbs2wi1mk8b5r7sen2annpiaiwr87g5qgam7ivp9oxbt7xyedl2w9b9w1xmr6ak8bx8ayroorijkahyvtpwhlb5u64c40fuemon48dv5oans3n3u2y0sgoj',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'ipglp1g13mmxa90ttjxvor2qgac3dj88pch1tvbn8jm0rudx8j',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'wrf12xg813ju3t432aep',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 't5kz2vita9z5xgyuv08nzmb243cgpnuu5utm05yvsce9kzsfg2koozxbxkwf28emxli4bj6sa5top6ojd1xx9nzddxjjud4ljee9iy6o1gonyaldw2t5ijh7uuzsd5asej65x8t92lwbznelx5rvrv18dul070hc71srusfp7jw172yg7neze9qab3qvkwpmz0akhtqgm3dy51p6up9cmd45z7v9sxdt3hybnl27vsa22vyfxtcfn1bfucug4wq',
                name: 'e9gpyxrolmixiswgywhk0hx6h95z1ucn9aq6cxnfia3zdwv1crqbgqa4hwirspu6rabtvnfry0sybg3qc1ro4zgz7fzitkmrs2b0lg3jylgutwmlalbs1o1ce9pt37tlph0csw8hh38y3k53g5f187nxvgzjlhlqsgeean5lppo3vkavgfaqn6vogyvxoghe5w2ln6t1z448h2acbdzpfk4l4umuwbcdi6d76pp10vjgv1j2h3m0an6ujn0i9s2',
                surname: '2uacc4cflcmadldj0s5r8splwo5jd3f628yjzyg1s3ygitarc729zqglh1vsf449zpba3qwi0oqc73pl6vmxymr2llqrt0h75vtq7xajmpdlnd9776x6b4lh5y8lancbjrxqk74rkbq28tcj1oehkncbtl3mr2p9dx3p6kdoz7yae1dn6ubzyzinnhouj2g47j359l0shk2468civ33dnvuql627uvks8l35m1meyaxvrthqu9qnrtqlqp7mq9eb',
                email: '2glzyigdbref991njoz42sghjv1pba931kt7e86zco9hisyes5hegvk30u0xitqt0pd5mpb91k6h2zedbw0h4gz5v8ee6xofrrpxdt0j8o3en9336rly1dyl',
                mobile: 'acfkrg4q8cz5cunrn631h57yo15avl9coi5rzgmb0vidq68c3vgp6bvoakn1',
                area: '3vj427t9cgdxfb0a9wu2e60v36drh65tt2tgvlymntfjuokbr4yim85u3yl5lyuu59yi29jln0zud6dp0y7svjr6yepcfn4j9ap0gblcms98w70rcm9dassgtbwupa9kriii7fvy3fx1l93muzo0nox61gsf1gkn8xe5ydje44134vro6qgurwn9dq7umuus52xtb9x7td6n7pyubdzck7hc1aec97s5omgmlozpf102ea48ybmr2dixvjetybb',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'vefnw7quf9xftlj5e0ekh6s118onp49vrtd9kufoglcohw02q6',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: '5kcpzk2j8qsczoe6gx8g',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'yhgu6z5ihy1qzsps8opq92bkod15tqef3k4o7kles47gt1b9wi2g7v5qbtreqp6pp5ekgjyr1vos2lowt75fgzn9pbs61989jia8n2nz9fu48vmg8o03rtpaqnduduj17091d82mcja3j93ot4zym8rn502drfdr03nd369v67i9t1g5vwd3kkxccpi0yyvixxpu3mw640aw99j2fazs6q843y2plefmhocci7953wgfc0d13mx644ezz53qy0o',
                name: '9fptpx4oza2ytsyvpgwewldzun8ntzzrribpv0exxv8ebmz1s22l7rsed200m81kerhhnh9bnfefi64unxhw8938l3s33exatn7aj084vou0nxa4d7jgchiv1uj4v5m1fioljw7s7w0k45nrcordbrh718z58drje4viwwcqa51dv5c40105a0ytcxnfxllp5hbtes6rzc59s5zjdkvgbt6zr7rue9ad3lminupo7sgd2p81kf7hhv9yo4zkspa',
                surname: 's13wbi74y20ocn6mcr8yq31wxclfy9nn2t2c2px8f4nl1rsphxm2rbugchxpxmzf4yccubmd9ocyvgolr6vfgpu0i4r20bmjyw6pduuh6ppikozxoc0n6mp4ydrbmqknj1wzmvcruwqgoytynnujo3gopa6sgcie6n3epnndri6pidzx9tonh35ubqm852gg52q2rxj7736mbkaixpbyolesd49bfj302dgcmi06eu38yg700v6o0qfzxuqwzqk',
                email: 'ecsvhvt906rozh9v4pfhvsgur85b62yy1dtf85aekdn85tcc4exgui0qlte86irqemllnou0v4nlshjm0b9rbnb2256l9mpr3tcv7ag3ywe6pquggvkwlemvq',
                mobile: 'b0qkmb4iehrccbap6rrk7imlbfubf5g2wkx6bt3ssw4587vhd240xthj8ei8',
                area: 'wsw681e3ewk0orrbj2w63s37lmv7oz4zn1mbon7kcmtr6k5ezzfkjkpys72612slprnmj6f5kd0fbw3iqw6m69nobnu2jqiqfew6gx6m7gvz69927v8opax4gjzbachtlwevl5fpcwbm71e0cwu9s3ob2waubprolikl8v3j80uoac33z619re8slt3yeye3yyg2wuuhxrzsxugsngi0q4dawwp3au93fomkw6gf4kwkpza9j654ye0aygml2ue',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'l5rv90rpeqvoj6hl8zc6ha9n70hzlji005cgdfa9m193ccaywd',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'cylkr3196zezt5s578m8',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '38l66rwct52jg83rjb2cz7p157ryf6vfdrpderme5csn7nj02ljrcktsobuoh8w3om6kvths474c4nkvub0dldbty0vzuztd4u04frrz0jfh635z8ys8ybcusj8z6acjitdn6vx7whhevhoc9ugr2praimtz67yg1rop2pyp04hl5pea4dltn4oepibwicjj3qb8lo508mgx9ce6q98ejw9el15mf8dvy1d1f8y9s2ns5840frmc0nad1smjnfk',
                name: '1rhc7ol88jskvaml0fgsupupebqr3v1erezgm1bfzcab6k2irdscoatldjfh7lxlpys2scernml43n5ypregbxjrcuw6ar580wp3yji4cup2m9ffbeq7vhumdawlnssnr6ac6zl9119ikqnb89i8rob5yez42z8dtbhu7qt5loes442yt0lh4l10mxtu4ke1m7slrxrdz0bwj0iue3w4mzt0h7thjobi3c5cppy7hw7hf0syt2qfnrirseazfox',
                surname: 'h8jj29jqwzn67r9q9szymnz041m19x75xr88m35gx59ijy1wcd0x92hlrf7ntb6b882s7m4nqcijg4h4o56l814l2aiglby0vffjslavw1gmgplb250myigb4dvnn0pjjkokxhro4fqyip0gvmiy88ic1r8gqh7vsz2m0vtfh2iujp6ookx34px8fxn3ypcpifv8994ozvvu44yk7lamplx54b50pn52mf95juetzrr5m5cwr5zb0wwb9mj2og2',
                email: 'zikpeehkwzq287tz57iwjl0jyp772litixk68qodm7xr80iav51oms46zha41mrvyvafdsdjykfsvbot514yhogvv6tvcosr66bpmoe7yc9l8m17x3i43ogq',
                mobile: '1b0fkk3haf9bhkn7odnc4ko3d8h5zo60g7zfk2eeevy2o6lmz6tem97j8nw9b',
                area: 'bcm2ux1djyosp35uj2u1igxsdofgzhspwnjmjyjeuyeskmzd2vjfx5jlht2xvgsh6t7ty4vct9upgndmn3oakb99reo2i3vcacpp0xkuvrf8gaesr7sxwibarijirdn1326lxrkev7ux3lqi3vxn0o3mykrwkurfb0qdqstu0io113xq3oa7btuwdjpuk5ktce3nmt0d6x3tmedhk9c1tdppnkfy7i3aft13cukz55rk1hlf0dxi34epvgochxo',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'mz026r25122dtflhvlgytyex3v536otf1a8i6cdq3arwd4ztxs',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'j9uxoojs182hzn65lwts',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'fq5pmnklfx9fl022zp72pmal5acnx8jvreu1ogiyqlxpnu8ro4fe9d7es1tscb4kse9wrlt8qr9w70x5v1rwebceorpjw1h5c53792efzqb1s4p6xwlzqdvdd7mjrsn6pvnhbwzs6hlz6nkx5c4qd1xy21nxjuaelt9f57txz0ebvms706dkmuc3a8zccffppnzhwsicf87pr1lbitg0d0bki5ntoq64zdkf1nxef4bdpfpfabz89nr1ijvu7ok',
                name: 'smohdfmfrnu1kgt5bh05w3w6angsp10wc2tpc6rrvc8dqciwnmhipsr6y6q5oo5zo2us57h18jcdazwdbf8aq5cardw4r59azs4mlg1vttj9egmjkpj7zs08hmnx7tbmlmqap3u0lqftynkxl0wabz6qiezfrphkoq0ukn5ud6cjdgoc68u5oyb6xb78dbsfvdus5qmluh5zgsozouji42c9qvvr7uqjxy9muabpi9jeqmrqtt2j5rakkd5yb2v',
                surname: 'y3npjkq4wixmcdhhtdkbb38jdq22r78mpw6brjhdft03xr4k6cx4phqyqzr8xx67n22ze9rbl8viteng7hlhtjyd9w5kkkus0pzdbm7pe3fae8mkotsspz5omx6arucuy9p7a5qq1n8mxnnu4e697o0nuxbky43pe2f8jg3wym4pht0h7ztz54o87vbryl4dave679pxmfkyplq9epfalpb77zy27fldj3yxjfygz4hw6qm3mgg82qhjzncru6i',
                email: '2qq1nz84q6zyfbridlqusa35cirj2sg453fe2b49hgmtqr8wxx5e0a7vj1zpbumtob1weg131ty0q9vzefe7qh7b6xua8y9r0ya9o7xhhizoqnjdduelxtne',
                mobile: 'fpnm2ge72azzpt0rn6clhabhm0ny32brnmaayoebwruvlc2w02ztgibjvxmi',
                area: 'wh1vxqb0ob7fkvlgy91io2aeszhp5wudndwywr5w9iffsks3xt6c7pdrrp56bnvyklw41lx9inmh5s1bbhol2vg6qijzsj5n2sld72pgc5f5xr0uhuid7y5j5psvhfbtxtl289v4yox044sl4tgcctn4z27zb3cq6yzlfxtj89lai5pnylvo9k0ntl96vxxvfmo58j82ny09vz1ug3mncetxwrsc45ygryigrhuq9co45q3zxklfqkq12jqcj0t5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'ub1psyyvx5cnnrcn1d1gxd0hib2b3arzi1zcj4p6m9sj9n5dio',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'yjmyjw0lkagmvzwa9qqz',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '543l72hufgxmco6cu32g8q00ybkfrnp7tpcjyu8033s680j3m93gvpfundxltdqi94sst1yc8hfu85miarzb5blseytbjjkes591qrgzw7qldlypzytnlzfcyua9lxix1c1bpzaoi4ecf0okj29h43ndylo069dfnf1yqq8rtthjnixi5gqnqx6ddy2rbg6v3iyzris7f3yf9ziizdkioi2bbb8q4hhug61kblnqu1tnw3f3mo3yackep0fgz3y',
                name: 'ugk1u9j64y8vr73xlbzcx0wnw397kapzwlw8oiudy2de3wyq5aq9au4w87jjjp896ybrmhkaiksrrbqpanf2jq4nir3z9pndkn5fz5xackv6fezkt5jcwqb1jy1a0s344pq3pl0xi33vd5kpnlvyprjga2vlead1srv9mbnhh6jg2b71no47ysl3y3z91tqj812ypawdvq07t6hdqgy6x90nhn7k1fj4qq5dqtkrtf7vr9r8vsravhudks65w0s',
                surname: 'uv0s39i87f4j35c6b58yf9mixovxz21jd00od5cc79afwbxspqtgo5sjbs2m37h22too4p368yo3z2kuuo57gcn6bbdppj6afs1dt9xxhhyz381k994xrxq1q2bj75oia19oa6ph4efokrm8qyf6equ0raz5athcste6hsqod2d5d5pth2asjyo4jz2251qkw8wclt6j6ibv2tbeot7fzqfbyrrdcp1kmjacb09ftm0u0y7r5i50zlyz6qe8f2d',
                email: 'epkc17tuowifh7k5513ngu1q0v4qu83k660i4pdumbkus6p8vlnxgty8vutmmrlgnbw3xtkympzhngox3jq1qh80b8o3wqunui2rdytrrdbsdpk7k50gtszx',
                mobile: 'wf3h2vr9oymh63muz14cwi98wuzjuhzc0zl54amos0uhrbx57z15sxd44eoh',
                area: '6nucd9optcrynig3rrhpx5sltludm7y8k6ypcg8kl22nejc2tz0cnqvohj17ueajlw01rb2gjat5hyisj9b2a3od1hvxti05wychght772v3b88f8gdnjjderow81iao4mykaqcc9thjs5bplp843vof1zcqgg5314359ocshx90h6nm0mwc29q2auh8znwf0rg5bmegk5z95cqu7lxrd6jfwde4wku4z6hkefn9ux7kbyl7dcx0cumaffebjel',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: '39e2e00lxrmv5vexprcbsr3iilcj17h7gjtegwczty0o8amlmr',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'jg8qvt62ygtq7xh18fhq',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'xxzti1mk3qggjp2vh0v58f63cld4bvlv7wfzetglq4psy3u5y7jq3p4jtpbnadsyswawos20t9kntnfb0ua2xwlz21fj46d3s3z76vxor9qqojyz27w7jyl14gh0jx3e63iuesr2adi9axpthy4u3osneapyrgrl8pfaow60urwh6y6u9x7j6bw2wzqdcb3ecimll0ckoxm3i1csaxtjvm0cdbex0x3p8qeby500dgoesouv94m737eek8zj0gc',
                name: 'eca0hioa6cvqomn71d1nam3sqiskr9do5gupcu8kdhx4qyauigv5bis1f0itkmnw4j1zibcc4yjrtmp6b8vkryc29fwbmt7ptnecjaz08440u81wmjs7j8h7ck0v5v7l85l14rat65ocaigh1mo41fl2gxkhp3jnay72znh56lph641m9kmqsob9171x8q7j5dawio7b0syu8mg0p7vjs0g3yhlh5feo59ceenj2r8v2oh72f12vrvziv3a0w65',
                surname: '6gvy8fuyzlwzrx3968c9alt3e3zup91whfihhtjs88e5lchebk4t4mfliesu9yp90xbt29bmaljfjdkjfi07qnse6rnmmktl4hhxgif4k8y0grpl2evhxtrwcbf453mwu10fzssrtyjihu4s4p58asbs6bjakeamcc9uwhq2y9qu96ya8r591xzf9m21aj6yrcnx98yqgx6datodefnv1gqz85bdljxzig2zkto2nkqodb6zx3abgba1pvi9fhl',
                email: 'n7n1gikolze7ywihd4v3vrtwjam65n21ue9okwefyrlr8o09q2ta7g1r4mx5t7tefk6d3h5u3gg6dp2pjwlq0mz9t95jjzxa38v2fkfobq4c72s04w7kizv1',
                mobile: 'ghhx82kmocc3d9h7osungvypivz7ld6yyikncrowoeigm2tyjx77q9zfv683',
                area: 'nghqdk0zm53k6ged29md9bo4nsvisuhhgizwctvolw7ymjij5h5v0ehinxyj2vyn630ytj1527ivbz8gsb6agafz5enmt2vabarlhy7xvn934qtyf60u1m36oniworkhtrnem98wiylwx06b5b6y4rekfb0lgkcjj00k5qjb8yrgydr41xiyyh2gbxsy4x17gja2aw7wuz1uyxlqdshdc4a88n2zscl42axe6j6fy6mhb24r2cc5s9j1majm118',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'kx0ndn5bf278yciqe8fpoejr5xzqaclk302ntuc1445bradyvb',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'hcdzjut5ntf0bg2hf3a0',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: 'adktsjmcy0637q25mv2d2x7dc3os09zoupmyd6isyafdzmab5dgtfjejjqf6tkt4p4vipis2laww50zuga95cdj7xt3aympsfctt7g9ufw19mmd688mf9u6eiym25kd10p63oyeq7iztwtim0pjrr3oxjim2q24nlt3i36a436vpmw0c3tgmvvseh9jrtjrmw0inglv12c2vsq3do0xw8z1jkowhejut1nzva0j5t9g244n8ijttp4jo0n04yrf',
                name: '3ha7wacue48uqajc1ekpscgym4bxyo3l3clk3yipfjbowpvnfwso5mnmfy6a26ke3iobmk41ti68d50r76qj64oitip7ur5ff3hoq78mof750nqhmdip57jri8b2atlup6z63zrt2bjii33caxnx57ijd7tqkibr9bva1jdw61hec4l3me96d6tcfctn9yidpilzigdtukibjyiy3zq3ebou1efcg2rym6dxdgi40znedix2lss74x4ugykk8as',
                surname: '4uy7fndsdo22k313sdbzlmpo2wha2lu24h89d15ts43v9988670qhsp34tca4boylgviwddmrpq8h2jhqefsnq0hxso76iuvoead2oqmegi5oiiy0kxu6danwiisxlbbvfape0m1h28rxh290uzzncoukh2rud9vj4hqlvswbkyo9ofh9ahirpzjaodvfyerm9wcgqes21o07adm6wadffoptlk7xta1i0cazvj2n67kkmksw353dfpnx3pm0gc',
                email: 'ojpo4a85qn1qbnq1w6yxafqbspst6na4izltbugrwwlr48ssbuhfmjyfulclts4otl4nahvpzkkgpubktzgil6kwrjkim30976ll609oh384bhyssuapdiuj',
                mobile: 'do7lhfkjpcbirevn92ps6n328dn8iwatnzpd36gatj7wgrpxo7a5xzw9ukvp',
                area: 'dwxpqwby1302ixj5c6r7ulhclwzvj7qxwpkosrj3yce3cux2xqs055tl4dnnvvw78wkdsfei3c6w63kzhy9oy1hmlsitnkug32q8wuaypzfzo7reqt2c3km5vk3x00hsx44w4z0q6nbaqp6p0md7wgga9314lrhsv54c75wbxubscvfkxiszkfl5tj3n1z6tml7p7aef1nid0bq6mrtokaifmcm1i808v5w7c1b5xglhqd4xjyliblm1orach5c',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'aesze8zuspgjsfttu4u96huglsdzlcf0690p873vjo1e22o5rs',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'o4y8926uuj8r5eok7tk6',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '99m28jbakczdnyq599s6ruqcv6jzivdivgodnvzajne96x3fx3fa7cp88d3i11xiwo8ido80kija4jol02nzbw0pfuc0npojgr161wsx6vcyfckigqwdb1o4tnjt0sisl3r2ud86ylsvdrevxpk24k4mfwjhggg0x53lpnkx01oq7rw9koeckrevb3qsbgt5zv8umv4wzg1wbx20rgvn8a7q4zn2mozms2wxpzwob4421r4laysvb9f3er4xls6',
                name: '4sw43qel6molmnh80cq7l9ibd8bukotplqx4un70ysrtfkgxf32ktaey3pg9ljnzz0n8wtmm86v3qjo70qwu669sct0raemkozdaswzd67grvfn9v04hj4d4zeseldmzp6eh5r35y6m9fscby8kdaymvasnm3drex5384bfplik7c493xmht47st3gqi7m2ihwgsgyc3xzp4ewphau7phin2i9rjwk14gla2pg95kvz10dac64gs93f3juuh7vz',
                surname: '3ddjswdgcl6wwf1h7jp6fllvc0mur4vtn3y7h0ud06qjryntoctkdk9jb6bcv1g11zn1xj64rjynrsdg7m9uy3w9jv5jjlw4918arzktpgh6s80uyyhcr5hko83kugcuyotn6gu53yoloyp62d27opfmcz3ux8t2byapeui7rq12600u7itj9vvo7se39uksssh4vxiv80m4j2hub9njcfy7buqqqcgobq9kk9z0nk198yqr74wmhrs3yt9v81n',
                email: '5v6fxammwkljiaioivkr7mnkjw007i1jsvwqvc80wsx7bzq4emvhw2lygza2buc0etagr3jp2p7pu6m5d3j0pwrmsf7afvo7uk43ql02essn3gzik1gut2cm',
                mobile: 't4rmg68o5xcjxgq0kuo8y90rmq4rdbdmk5om0rfxipccnmh717pbwh7v9k19',
                area: 'ylloq9p9pa9fuwx31q2kcactgvjhxcxyjr6al14i8ta3whb4ujypdqpl05srt41dvgsdl47py7x7d169961cuofc5bkn45odobl0wadss1osfljjccg201149c3hqewentmskwh6thc576y1d0jqcphwn6s75uptvu3147f9i4nngm9xvg8p695tsjolhm1ib4i68sae1zaje30vh2nwq8doautb5444r297hqkwmslm01pa3f5qd6y2vby5wii',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '0ed8d7c5-6c4b-44fe-ad93-b9ab30e8499e'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/f72641c5-d770-4517-95a5-7d58c82b2bf1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/ed0b6194-8ada-4a64-aa77-7a2951b4e174')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '3e356b72-7a81-42f9-b5a4-8224ca9f447a',
                tenantId: '29a98109-9f4c-4c4f-8889-51904bcb23d5',
                tenantCode: 'fd824t39x0kdov6byan6ocu5kjavu69xu9mvk3umtsc9dte0nv',
                systemId: 'b2d9c8a2-210f-4f11-9846-e33b18f5a247',
                systemName: 'vru7pospbn2q4s57mwdy',
                roleId: 'fdbd0388-9602-4df5-940a-4c8264dfb197',
                roleName: '97xs0uzy5zdmi3mwtf7da7frnaipw9oaz6l91mpgt4xfsiwfit0z6tbdusgmuqutfp16nropnsr95188ptz2mwc27720t5h680t7kb0yd5t54qp2fra8ef3iedumo591i34p3qdaxm06sey2w6ptiuz49kvsfodv73ema6gscn2bpmnd2uh24lrel4pfu6lf9mak8g4ucsky7fthm8z73twwv7841t7egvcfk8xx8uw80yphvsztwclfja7uw6u',
                name: 'ap5f7h0b7a1kbnsdf1rxaklazkoj2k5sy0du77qmjkcp6mubwkebgjteehqqq747t5irseoxfpx4m70ff25lwo03mm7j9b3mkki1pd1rcqoj9r0ptwa6cp3k7hss36ymmd2327d8sn7jewsxg597clorzgghxgnta87qwci5heat946ffbdvjs3l8kan0glohv8d7tn86oqn4c054gpmroiplygcr13d50h7lcu79x8z8se5l6qi576bvuj0ub4',
                surname: '7ltgzgfnefamz222gq9pqy0j3wt2lhrcbgraaezapwz6nf7pa6n6lve67dibi9omgqapqn1bkqewi0ortsc0hk6s7wimr8keyrd1txxdlu180rxa5kvy2ajoh21qst92p1c8kvsvlvrfgiqyn3zw23lmikxdgggjhkdt7upjire4aqhc8irlu3t6ngi8vvujkpu5xbbq3u7x84c0rt5fso0zpxdc4xx4uy51f8qc7eknwgbm2mq2m1j1ycnf8f3',
                email: 'k2s8ta0zjx3ok5t69hjrzgukux0lhxjgtkjyg5pdnw7o0wcg82n9uedc3lbt9jw80rtrx8a5h4dj59i5ermubsywq86woj0stnvcb4c4g6gbbqkk9k4omazr',
                mobile: 'tl685ol5wcj6wz8ja2qhvg9olt5pbk9r3qp5od6ef7ckdcs724n2b6jae170',
                area: 'jb2r93zwuee8a4kn0wg0ir4752j2tjoeizaq3aiz4b0u3qjuzyowlchx4ql3wi5r3u4glxi8o4e273r7yiqdcmtcutnpfvqjdliyon0fajnwa5lo0qvg69c27sq8cq2uzwzhz0k9wwxoxskolix8eext2bcdljzy5836vshjkfd9386awh5xatepgs8op0ks4002lvwm9fcfx026byrkgxqlthhq6yzvcpyxmh6x2r7o618nbxoyliikqhc60z0',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                tenantCode: 'yp90wdc9dcm7lx003sl0m4qulxpyicvvpeusojw6dtiql10nag',
                systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                systemName: 'icvvcfvxvh8zgwq47v7z',
                roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                roleName: '0jlvvfcymhcfbiwl8r7sa57gwfocs8zcjfyyse30mif0mfb8329jaaxksdfwe2y5vqocai08qdcoji7t6rocdogz2jainr3zqxmduab381j6hx4afgjti5oayu1uylkumj956hn6t5vd3kfkwi5jvf9k0tb1ndyxbjum45946buncvyhlrozhjyz8aryeo5xtof76j7os5u1vx13bzvu34s6rhqzzz74i7xhfkkexpfbfjq6pqu3piiyckh7kf9',
                name: 'ppqcpgt2b8enwh6vvurgmzy172us4i9dyw7brtde70neubx07hwvubbbebmcfazn08kutgac5cexnrnzkac9q923de0pnvzf4el1e9kjteqpebzo4nrojc6s6chsc5qzxrsyq8d2fpozayauqovqfcuwrjfl8mgl6a01t0ifdy1d5g30ncgaejpbuqogcq2x8hw976xi62sdhkoxj4b538vci51j48sa43gaesp8na8nd1ko503mao88h1y6fgh',
                surname: 'ptklg3tokjrzqe2x5drzskf0xwlom5r8kbd0qy13n5lyobttza0rdk37qa0851ztmc1dustz8g88ctj7bioj4y0o5zf65md3f9l8q4dfq8f9sr31dj6gmhe98of845k4fpwwrmqi42kkqg9a9vvjaqlzxw5hd3dxkk7mklq1h7b5fuc2h4qr1ubjbab7ibcgxsntwak4m1ixn030iki6sjmptgw8oqxjfhnu7ny1yuyduf2yyblp3h9j9lhqbpd',
                email: 'a78rl6nnkgje6gx7rlhdhc6apvfrrxjcj2rmdxwqloa1fr1epueq4hosk94xg0e6xfxq4obp0y33fzj84javco1u0f9ys95hrfnoizew1hi6gubfzgn7fn3i',
                mobile: 'haho6wgch0o38ltvodyppx9k0e2w0kipbrlgb76tad2m8fhiprwayi6uob6d',
                area: '1qvv2h2p7r4r8yfxppcck10auru9j1x5ehv5cw7hi2p6lh0a3ev2zrag0r0haketd3mbflaeon8rlrktqc7a69x2vtmr2n1tht4lqpba1k82u1dayb6s4y5oorsnauotzmgciavfr3jgtcvgwkg54om16qlplaofk8dkx3pachymxz71xhe7hfhshnd04vft01l7tzn50tgmr4d7vckn4jdc58xbj71sni9gic10ucrsxyef44m9zytyhn4qiw0',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/1ff7249f-2e48-471b-95ee-28a29678d7c0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/ed0b6194-8ada-4a64-aa77-7a2951b4e174')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '07680d2c-3542-4be4-9c5c-923bee550e09',
                        tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                        tenantCode: 'x2u4h4p9mlhkxaza94rb8wz3yql6hoerujt7ouqulxil2qboev',
                        systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                        systemName: 'p2znwbzltfx74wvsmz1w',
                        roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                        roleName: 'jp4nbz50fk3pt28py50kbvf1xqg2h234gkp5junj0wk3pboh0phecpy1s5vsa48gixvvdxl099q1obs94unmj7b815qwmkoha1f6eh6xi0a213oij321yzei5bf0q0qhf12vuuw0vxkz6n0blm1a79lguk2tttxa3seofpqlim3p5dk2imobsrduiupuuktjnjrw5ty69g53skm1ibhp5d5nxxjy83bfp0hp8ghv5xw15f08t4yj46lwx3iib5k',
                        name: 'u5b6tqou9ownr90fz4ekvmgowz7vmnt04ljpahwug59aom52b5jfcutuelpk58g7ok1xqc76fzr8mvngjvki6ibbro782d8r99urt1fzdid3jql7uizgu4pk27dtprstrmzxvfymqz41n06iumrzw4tjpiwdl1m4xc6xkfxbpp9qucp10qfrwm1dqinqygh0apwgw46nm893gan2uvvpzah1xgzrb7j1piq51sg0kc323beasnizdtephtahnmw',
                        surname: 'kx2aa02f8xilpazt408rskqo3pjeqxmwczq1znqp3ubdt7ksup8u8udwmb2e3icacbgq3dybsqmv65fv7izvveunzbbk0c3366bq72m4swuo7nrn5esuzxj6veam5gwrr6nqxr94g6iui1qezl8virpxznlj2e5476jsxx68pjl5q8n3qws5dydioop2qs22dolm1g3cxem3ga5u47dzig2x5esod2fsr987naznqjan7yiblz3yxcxioo919hi',
                        email: 'pewkpmwx4lbujddxfb4spgn8abwsm88dynpctl2o5ooo1d9qktu5fsc8fo4zbuqtlv6rmlf0050y06qpl9jz5hprkyahlx7eip8e5vej9ytduj5znlgcyjdx',
                        mobile: 'vjlfaktay8pyepnn9dlg8xgbqbhohmqz05r0qhuj5nbz07q5zpb973xfmy0z',
                        area: '0hi948gs6zsm3a7mlxc84bmf99o0piz38xu3yv3gk7bnwduarxqzq5oup9ac9ogfe5ynspcgs3tkvi0w4atn5crikfuc2xw1ij89kj3ptddnnklpqe79vd1j2ae1284lui6ta5ogiwv0fn8mtp93d5rhxt7w26pzv5kb8bbamlhmeiov2nxow81b8fvrrpe216v0jbyelp8xetsko4ivzyrb60afmyno3pcrbcgwd9xiqjcn8adktps8ncbjx2i',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '07680d2c-3542-4be4-9c5c-923bee550e09');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '0ee6904b-42e1-4ff1-874e-3a80065b809c'
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('ed0b6194-8ada-4a64-aa77-7a2951b4e174');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aa95e0fe-413f-47aa-9eb5-39b46e4d54e7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('ed0b6194-8ada-4a64-aa77-7a2951b4e174');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3aade86a-4c0d-4c64-93b7-ecd868b5d115',
                        tenantId: '2b0d2c62-d220-4bb5-9898-2e78b74a33fb',
                        tenantCode: 'dnqnwucex0ekap05goz4vtg82phm6ijceqm7vojd3ve6gi3wqo',
                        systemId: '8ac591fd-3ac7-4461-9faa-2c4fc14f6499',
                        systemName: 'u3mf98axzt0m9uie0d7q',
                        roleId: 'd2347c0a-cf04-4f35-afb9-368fe7901077',
                        roleName: 'vz40qp3axfkok8rru0gebdqz1hkjobui6nn41ra126w8bdyd766xyboxp83azgi6c8p7qtv9585uwudjdj5lkncs3cnzmhmp5q20ckn7nl5aaey2r4kmt6q3tw2vr7zrl3denpx3zjqh4lm7decd5bv3czv5o26xf6c1hchfisrgtn03yyn4cd23ezzebqa2b9cug22etj9em77i5g1bb9bb6bxkfn0laca88qb5a0k832c6s42c4c5cxrwnepb',
                        name: 'hcfotrxsrl0blny0oujm0an7qahh8f9ipmtyrvgkfca93x3a7ug093bk124jdscjwbyga5kf1ayoejnm3ez7w7et0yq37ab3ooatnu6mfvsp18jdwj02wesmnnnga7udoeqs2ekjpd71xs3dmajne95csfrv93cqs6qiivs5j15jqpyay7if6unic4t8wk47xq76bxpxii9dtbdmnf8gfaecqjtpkft3qho3zlekifd92htesitkbokir0620se',
                        surname: 'g6kmsamfxr25yheuf0lfxj48l0j964dw5ufxtd3sfw3iqmru7yl2f63b75gmxco94htcpd7xgacrnkzm7saovkudjgar8ko2gqnhouuht3653dykcucg4i1k1ttk8d0hqz7k45mymtum8sv5apv2aseym7np5cyik1d6pyghffxwb9787ua0u2chxewj94ul4d52onrnonels8h9naygsy8friitjpbpj1gey2aovrknwn7fwelk975ypftyib7',
                        email: 'lfz6s4sertlmo6qqo7wux3manjg02gnajoheamdi2vcsfu8hf5fl2pi3ubsf7csz0jayecr3g9rftj5z6jdmkp4zoun8i6bida6nuxxfji5vrcblfrsc6th4',
                        mobile: 'digkfr8woijav450dn6is74k5bcqlz4khxl75h5gu0q7sjz4ga1zwb1aqizt',
                        area: '8wuryzqoaa7c3dldm6oir3bddow69jxkz8l55uxz0zrr8n8ydrrf6fle3em8hre35kufun656mfhsfl6315swzcxlxkt9i2508ba558hl5jvacj1rblh94dtice9xbtgq4ug482jdbl9mpg5e5fb4j41zb6umryrv5g2lbp0rgy0ozhx6bb3r0gl7ptbz2533wl3quwq8daat4eqycljzv7w11t5z3x3indvjdszbschry4um9cidkumlxy566x',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174',
                        tenantId: '2f26bc04-02e8-4828-9249-803020406307',
                        tenantCode: 'k9jtkmb3u70jbxjw2efxjrn1ay3bei7f8hh433ytonac4vmc9s',
                        systemId: 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f',
                        systemName: '8ckp87b1xpexowa91973',
                        roleId: '1fcf82cf-5ceb-46fb-a227-3bcf0790a984',
                        roleName: 'tancwckxrhoh1sd1xaf8r6je1s3qlz1mf2mdgn4ysydlkkaw9hhvg4l763crybywesy1mpi97nu50mmtpa9mxpnucajysyjzdih18esjccavp7ff95oai4jimshzrofeda2ihp16sxhhb1l58psdjq0odmznqts1nhwmm2pa1wh2dh05zb3vyt78hv8ckt9ga8zuxxdv1n0wlfrxkjwjlriktxbl3vbgvb9093v0y34crp4th939xwrl6c2hprs',
                        name: '7mqdxzcllgwmhyig1ya5f4jp29cqgllv5xi4hpkhq3ifivy76rufyepxw6my6qfuzusqaz7hblwrt794nrvvoraw76w0slqiszmr1ndwmvwqyez8mube24o0rl6tfsjnersn34bda66cab0zu4fvoa92dc7b7b9y445s0nrc62h7argpp4d176ez47k19pfc3y30w0k1vl29sv8lo8gwv4w66nd6oiy9m8an6ln8z4g7o9j8umlxxca3jlf5l0e',
                        surname: 'xr8elht6b2dex7ldb1l9h738m8u5govzpv77tts6uog4h8hzoyjjjamf2u0e4xarnnps1wqrx7tu8rqmrfrbo7ge3r1wv0huvz4qlljvszt0mfrnzj0wlhgl8fw1tfte4mlmrol7frmccywaesahj6ckltfvaiykgxxfcqy6pbpz3ob1mms1g4sr7ke902wdv1vi4r19128v9vfnjlowl7u0ogf5bm1nu4t948ux6wfd0fopjzrb77lza37bns2',
                        email: 'bwnrzug7bqlzmk0rw09iww6h0v8uhrnxq7h8va997slon32h3fcdqkggjs705hqqiwwet0zgmss40rjaigzb554kz7zok6g4k1zzyu6tnds5nmgxkmdnvvbw',
                        mobile: 'fon1k8grnboz3zyru2367vgymzwkgxp5di46rpnzn2jq4h0kjqmk3tulndn7',
                        area: 'agwmml6m7mb8dfkkrl37j9bzove2gga0b3g7razct1jfdvvktbazx3ti2bpyotjzjy5l46e761ultd44e1oroq63ywn5axv09t92iph7b5y2dfjucsl8xwlcq59l2xdyyo4ilo728lcxjfqld20fdcpxud6oibyzy6ahawhdx2zbbvbxf627dumgyw0ne01xr72439b7rogk0qzsnfojkdeec4dxs55ollylbrj0wb3h51tkmfkjw8dr27wbm4y',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('ed0b6194-8ada-4a64-aa77-7a2951b4e174');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '34793ab1-ecdc-40b6-adb6-5416d9735ee6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('ed0b6194-8ada-4a64-aa77-7a2951b4e174');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});