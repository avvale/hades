import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () => 
{
    let app: INestApplication;
    let repository: MockUserRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'zlg66qrttd5pvscp7fggvgfjyrboxnadj2scjc1ecnf1s0wnhmug8dqc9o8cb5wwzcg2hjpvvwm3dhbfhrxu5hdln3xh7kcn07tbt2ymnw6h1k8k4mfavqkma37mjsshjp8dtpwmdv1r3bwx18wqtw6eh5zy97uck5g3f8mrbk3017zol0l6e7dlpo9oq9qxst9fhydrr6ykvdq018zlkpou2lcdl3hp2dhd60bd4n060yo2etlcacfzqdjz9yd',
                surname: 'w2684zclb2dptvlvsh4uahhdozndxnm8zq558wzto9rqzmfgufinuqs4lnb6hblze5n4pozh3wdlwqo32tww2ydszadk53oq5lvjv2zv7yh4f80yrpwo6tp8g5wht7n6fyyxt2b7qhdpq20gwdhoyq51v7nq3rge09awf8n7tufi545fom1xum4vio3jtnk8joapvamdo1tzoanqdalk2u35eajbw5tqzvtf9gxzojc2prn43s0458t7qga7j63',
                avatar: 'pgszmidkr3eablp778qzwzpsv7pqz2wl4loa0zxb0gze6rf04bzh87uvuk03xqhutwlykmrmiiv55mmbe3z2sarldn20wa4g4c3xsx24cqbdx4taky7lg25omwcprbwqr2xqaa4zdmm4lrf2thhuq02er87ciqoyh57gybjbxrxsxz3uz7wif1v7q99q91d4zk2ofs0ntuxl5sc4h5bliyityya5ney16u1lvm1w5xxd51zw4f3bnngfc7127h5',
                mobile: 'xsohwafuii8hvhk96bm85trsd719m7zrathpdhtuj4kujzbxykq29qfh1rlb',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '5g7kb22tc6knnj1la9lfvg55qkcmrwhx1zytw6hnilliuan39qkyazo6enjzev559bokslgbvwgk74aixgzgf39qhok44hr103zcqrq0q4qgt08b85yxq17s',
                password: '874l3n4bq0cm3ipq8d3r620acjb3tz084j6uelziqkdpuawrio4fix3l9oyjn2gtdec9afmcjhi5o5u7s08zbts9zbgnm4c9b2cbag28ddilymm0tcx2c7qmwd79ke4xgki4si05nbue5vdanzj8x4kk17cqzvu395ac03byw0kcfcarm0al2zvndlxbawrt8f5e3ewbxxa4r17ajz98bml01ii4asm5muzzditeipbgf1nudfvgpg9exkfhedo',
                rememberToken: 'r7pc6ftm6ifl32vvdvq5wooh54kuesrejp65jjwsm0ex4tzelbaqhi64m60wyb9udsgu9c4s4m7i3fx1i0oyrk4su6rbqdbcz56920hozwr88kt4hkxloqjrr1xal6gg779beoxosol34sfhdgx7dutgezk2pgjql9p18upqbv2vp2ejzcdvo9q7xqsmaa23b1doe0h6fijpj7vpc74o409spetvj4hf3oylpm3gslm5lcjq5pyqwzw1609wxo0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'xgfvtm5l81hezakk5l22dtm1aylvlmv2hfvifcqj7seyh4shm5eeccgxia14e191fk9rczmnwczmwz0w4kgr9smaw7uqstsy08kxmgbozn4c0i1xae05xoio4k9yax1zjgaixzaw744etqidnftxmxyw9wm0m0glnlrhgp39ezioug6krb6xdw2hy9nht0w8dh1upo11nu6szf7o42ht60wdpw242q9i54mp2czucw1s45kabtxjbvyeyghv5ok',
                surname: 'jz67i5ivu2gb7rk1z0farlrzbzdwjnjhm96c108tjh0t7xcwe60a2h15ggdjdjaqo86bobne93mt8zumpsd0shhb2k2e4mn06tzmc0rqhkwnnsg67sg62wuqnre0p26h7amehjohhwx6bar7phnum9ra5xbcaqu4gnp7nj3l0a07ldz2zwm5f4ilfq25gvgmdqd5nkrn6ihxh28vtixg8l836dr27ysqfyq35ia9am4t1fpx3qdbhx9653niii0',
                avatar: 'wfctr7sku0awyis7d5p9682lwl57f53pa0fesapsekvzjsjkljgsgrpfz5adzmbvqu514ywc72qya0qz11veu0bd0hb1pm4ft7hec58q1ai728lz9sv4fgcipoydbndw16jfek3ugmq877culpkuhz2ymdfph33hit1foe3bc42epg2rzg01rpahruq9o07o0x5s5vtdq8cxq5u3996leozmvp0j5oir6r8phduiq3scpvnud257i22re6mrp71',
                mobile: 'o12ja4tdkdotuppcha8yzqq2ymgqlpexa0bss3w29qzoa0z6ib7pmr6scgjz',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'm1ymq3dtkmlyxi22bqu4rbo40ut5x5owkrx4igyi4pytdvseh4pss4m9dt5rhx4s69k1n6bxv58kenvlem1dmsuq3zc8b4wdalhytaprxv4c1kge9yj7quuw',
                password: 'k788j0bzpujksdgorxk2n0u2kmm7v9jrvnrix5xlsq6yjr9mn9s4p4wc04oogu276lu6nbgiq5as7rayizfkbfgxb1f8pu3yqo2bsc41o349gnrg761ojqhg8cotaybxt9k6x600mr4gft33lch9z4tnt49bggsefd5lfhx0dc1dauezqja9bme0rtoqf3eyiq560pd5j08giegc54k8hvd12noprgrsyib8tdujr0l0merlf3an6kfl4i8yohy',
                rememberToken: 'cn3gqlhhxsde7jiw54i6jiapcjcam9piyqynyr24381pzolzh0k8ejkth717hu2774577iuekrsl7hgjhbs2r5en0zfd0721vowa7sclttalajzzjcmpujezavuixuryqmh7mqtxgwit4rc34t3bdu3cogbxjm3pip8ewrpi34btaugxn4dkv011v1qyb6k7sichgk9ddjpctejn74cggsy5ixmmq4m8iebg8b84gr2ahih6ljfnk7iyua5037r',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: null,
                name: '2yz3tzalqk5ewufzqvjln89xjwzp4r9ngxqxdxzy11b6406okuap5uk7uvjn3s637ynjbmjbnr5by1lh73iscsbcjvisgbxdzadz8rzumg4egy6ooi5dp3r0v5r5jkbitm5zpg4nqycyvydjro96ngvqewii03ax5qyyfnyvjwtgaozigq8516ut72nt97qiq5c1pghpt78urq36a01e0m7brw2ox4jtys45e4f4g8pice39rwifpb61lu0s13s',
                surname: '85psr281rl41yttcoej50tu1ecizx8gtk486mtl1f8tn7evnhvnxy1p0qar5ukomu7fyuuqi3sa1f6mhb1asfzu8ikelu9ygwbf5mkmts6ymht94jg21y50klg2ysn36dq0c2hnactp19aasoqa991fr19hkpdl4rpx9y1fgix5n18e4ugb70ho1gl1l7jsnq476mzc8w7t2082860sx6ehbypguxoqsr4yo41hdf84guttdr1vyzn5oa39c0q1',
                avatar: 'glcdyyllbl9hv0flts6r6ps22l7wiw5n8m7c10lrwvsdeb803mxcvqqdnnp5gp26hb2u7t4xq10r7e8aphikjf6pa7mtaugu7q5fwcz7byvu56ecmw3pum2sdllnjwxismut7hvjxndkzf2hoxum3vzdpwdcnbtnt9ug29rb1cwdkg10lslpvfdsenlxqffker4mkgenwmbvszegy14g3vhozjfnorgozagqtm318kwg7ujcqpkbvuoc50gxecb',
                mobile: 'f13w3utck4j2ohgoxwh08f76q10m6ws5o05iucfug4gb5r4kg3ngptnnv38p',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'yne9ab22g16oqs0v5b8g1bdd3nsp4w2212xrq8w3ylyzrfoz1xv3apuu3ljcw89g4z5dtwbx3k3m794j3g3jw1x8nz4vr4pmfbv87zd8nr95nhz1i8qeds16',
                password: 'k7h7tqto1kz8d4ujn8vxgp0mf4um4kv4qyfgtmqojd6a42t8imq3fr9mvqhvno56as48rq722j51010egc7rge4h17tc8qfxhyq88m7hwiatrpf9wbfdt5f5qtlqu71aq5dg0nkbx6vkaci8kte31kbnbkbrhgc19nsjdyjg09wob2vmlbnw3pfblouy1hc8rfsb0c4r1v86u55ufeyiee2rq55jrqjket2xw7key5255nuoh8e2npb9nee1s5k',
                rememberToken: 'cq0qjthd36qgklz52flsu2vlwybsl2w0jgm8vulwo40ti6okec9ewjf1iob96z2cpr1lioqj4faro7986kzo1nreg2vazsla90uopmxg80d4uew1nxqdbdjb6j1y0dlcm1rvpkppo2um61unrj9qdy4qzqziv7xma26xitsssoxjx41r6roudqnxqq7kjllypa9omw7cgdwbzswk5p7fb9ywlkvib9ykjdf8q6o7ggoif0ap1qemdt2xxml1b0i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                
                name: 'dzgucr7geo19vp1xw5g2ul6ym0qe1vgubyj90unxdcvg62untn3qlnf6umczx8s9qqnl426pt5uc60qg0kvm8rwdwdtl6jmga5vpvnyy6r7j3zujkykvtnqxek8bob4q61wc67hvmie9hqdvzn11nsfa6dlwokqlkeswaaoiyx7vye3259x3afh47mgbrglkggjcs27e88lbtthz7mmlbwuzr2koieldolbzvddur0ha7of1b89clvf9mhn9767',
                surname: '1jsn1uzlhz3mnbx3hg0c7c7xs6gazzzo2zg2abqbae4dtiixvuw6ltufpzmfqzzrmbsxpuyz0w0nwcq7glrnh8wva20g2mngz8jqehdtmc5tds74tdqifz5i5zovgtx0bqlejstdpdt1kapfp41fbbk07mu5gliy5zprqnhogwa7t2sleylck3nzeeqzbtytn62f1wefmcbhgrtsh6hp3571potauc6g7z38xqb2ikbv5j3bojf35jx42q4oxtr',
                avatar: 'u36mw8pvtmfxsbvw8bh3sfu3ntlz4fnr5cpl9gqclt7mvz34v9gnyoo052yeg34n5f54jyue8s6twtmd46uqv6oxr6eyk7lwfrs6k1g1qd7du2h8zkvrj33o2bioss8itkxcwn34577abokiq0skw7ytxgu5n8fsmyqttdz72chysagw5p48pdzvsbp9e3a75hyum8r1s28ozcopab619vakwe2hk9wox06gsa8mmwsyitt8yhq7j6h1kwso2to',
                mobile: 'sfunrjmz2pf6g1te5blc475lr0wdd3zf3p98w81v3o2d3owr2lojrczng4fh',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '7kh1xty5a1y8o25uwejr082foc8lwryotm2as6o4n7gg0jtsjwrsiq5k5skyh8fpnb1tl54j46jt5ebuetpj1lec3j5fd9besti46c5bmz60ri03o7rc199g',
                password: 'oq8q9c7gybhlswroo3j7624dmu2hexkp9jjba9uaa54u606enrgqh15jlngc0pka12wdgam8j65wl393tiyomr6m0xhdt38ccv3q7mf9xg55tf7cjv3bss7ufjiuosx4rkuzd428x08efcm76gehu3oj895rce6d4891xt56396ngoy8remncfmqvrvtxnthwzl12o4supqpt45ndx0iw7vyuafsa9hyffclb9u0avjgmhe7jxsig7qvf2uxy6t',
                rememberToken: 'm3xfw5umzxqzj2kup50lb6drnvd970w6duebnrf8tewhtgrki4dp7cze6uawq1uqck0qn6bj2jupk7ytkb2ks32pgfsoceuhw4jv1xqxdumf42hfsoah0a42cckk15mttj8dyqcww4775hlwyx2ibmxpac7opeyzlcvmjnpruu3vgj2m0rx16h7yra6uj92wtmsxkb71ctjdyzc3uvieqxxkgksy8hfwk86xd3kcoj9a609gqsyiwgyannmt11s',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: null,
                surname: 'zk586aya8j14ac6k25ndftz9lx511l83mopwqltdrf6ddnr5d8zlrz8ccem5nt864mj8kqzrq1rgjmtvujrcqi7cq8o4ycqu7gt9gd6hktwg0hf4y8klxhwoe2yr1wgmsnp0ifiwyqwmhcksfu066mhe0hr25w7hrybj7y01cuxp22tgaijvzq39oflpza891zv6d93a26155fso7wowe3jipav0o51d0bzlho3jvcdiy5v2gonxgwsfjbqoq6d',
                avatar: 'z0d9eje9nxvugx1z4mpyhazrrcr25tifqed1zw7k5pgdv3tcxdrkby7h1nqkt4pelk6ugl1tqvavbodombkz7gc3e4no1mshwtylow1t9bw2k2uqmxly28uh93iia4z4pftw0zxfq9obsmk64exdrj2nxelsq3tsb40adou6cg4t4pyhn1pjyg4kr6b9ypwkbwz5ldz68lx8suha7n2ar1g9oa421n21u7do9xbirzhac4eqqgljrdhc93kpq4j',
                mobile: '2zsv051cou8llvp7csu2r8z45zd7ax9qdep5g36y2ugdyc3ypfzk599z4inu',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'c2ssxca8zctgapgyejzuof1da5zrfqw587np67a98lly9nic8vg5nzdceg2cqfzenvso07ol8dxgkbupgeejys8szzwdandocpqpvmbf8vvbfi6kyv69iqut',
                password: 'zllhgkgfhknfg0lgd383ipiloye8nnqdjeenyjwrdnvgw1zvzzlfoeusi5tc0y78dd9uzqfbvapnqcv1o7alv8yf2k5f7x4apuwz29riverm0jq3r8m4bd3wzbih0ku8kwkdc9i9tla9zwpohq8hx3cxah3aq6bp31x0bfmcw899oh30vx18m8t2i4h1wxn7ntqewecguyjnrbdehsbrtz56htuqiv8jean4idh60il723gb24g2b7ym7biatnz',
                rememberToken: '6johzxeoraozynb9rldykf5aqlgdqh5gppziij5su10ve28jr392juhc5xt072si92lmuuar3b6gwfaae2cet6ce47x01aymvkgiyyzc8y0ioi33powiui2fk5x2hgo6gm9wlmd7xbitbtd94zpsj3j68fclcdgmrtadezcvjaqkwlqzc6jsco9ux35d3g7buehcf8pqpz8tebuvisl7exidsjhha6wmqcbhcuq01k8mwvcuvbw1w22ynppciky',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                
                surname: '9r3d89va3zsuddwigdja0hy2xv6w1le068dwf7hsl1cy9mbpiuiux4490m1a9slrcukfeza8cqd7su7evnwb90ikpzgeq6m8h2ioawv4bebnjfbgyxe4mac8fo78j9gbcoplld2dmis0zc3igbqihq0jgxlcvne7p3lvs6xrnyd2r8jevl4zevbslb6l5mijbqk4suzekvb46e3ded6fksv8v9fivdsvowjqmy556jgwa7uq02wqr27bseda14j',
                avatar: 'kmhwpv9tib0n13w4sd6we33hntbyzrinj4ofhu3yuzg0hauearghnjhs01toysi1tozya401kt768pd0wn0zwn6ygwu7nr3vuelp1fcxf9z1tpmxpldohkdso8dewauenn0zwfh6aekfy9jmqk7xlasbhfbvv7g7f8dfujqz7pu70alqj2mq672koeghmvg14y0hg5trjz3hv7voih122eclcru1xddihxeq24wkcr1jn6t2vlo4vrsya92rknp',
                mobile: 'o4l05bcvh7pwy1suynpxgubbmsxkg7sr4zz5do6fz9gmuntwu6lkxxhuk63d',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '1d2bkfpsc1d9z64j922jzgxeccl2x1d1pn2xj7ylyomkynzdug6m5x53r9gkmn2rs426122m1nwb9ov6we02b5xktbyex7hv2kpa54aetybutdbfq1wkk74m',
                password: 'fxjw6ghfk7osxxp4j57kwbxbx3d7urwf52he5y1zjt23otxgkh2qecluulzhp0zmb0b75l38xpjq5hvr6ozti9cglpvzp72udymxh5ys47jvyblgrdadp3vtoyyo8ccp9sdq2dsoffa5bw4hrq70ln0dwisl851vht469ic6hsx0wg0ogyouyudeuge1utoz8ljp9nrk32zlhbe26z38at9wnwwgq4441hj38ctzakixp85q917xeucsqgwpri7',
                rememberToken: 'n19rk0y2x5a9wkul5o6at7n7ao2x029pojnilcdckpindtqxm37y9z4wn9sf1kdch20b79bg889vv95g8fmwlufb4yxl6zs5b3eiyokkoos4odcm4j9lo9pt4y327nqjepjf5qbvm923og98rmlqrrxcvjmcm8rk7pkxjp8ztd1byjjv9dmenz994fzeqqaoh5eqdpidyh3oosr7lw2c58wf82g2029juugldslr44gqft2yneqttsun2t0b7ch',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: '4vthblpa3s659wmcqbs3uuzpvs92m4vdkkn5pt1ezlsndlgta0jweab4snwvwpnhl2l22gnomtqbo11ti4a1ct7xlb3h2folfmstjngoty98efjr7fpl9byfh5x5g7bek9uze895cud6gfcq0ey0lp6bre271zwi63p8op4tpr17qtiwvrd5vyc5k7gqb0a5in5b2pxzhju5r9ae6uv6undv68krv9ekhx9tsjl6niiqfs45kesxo80hxzjk9h1',
                surname: '99w7juhmpzw54r8t0aloaiduuu3qk09ym4ywfm6xxgdprh1w3geljo11e8p6hgpv8cfmyyifvi3o3b1xquoztvaso51ieljasvy8dfuijak2kfxk0mq902b7wdivne6pg7fpjn4t4nddpqwun4zr9z8ah9veur7pazynlti43dkvvs1p3we3t2qtif280qa041or5lvnd4q58uujhs7buj9f03en1zzm80d8r4yr1ru3i6msh1etejfaynav242',
                avatar: 'i0ufdrr50vjmmuhl7v3xzdabymp6awcuupfxaxycw0eld5cfwgrkvvvrskee0qrm50dyn9dvsbbny00u90xkxexh6qimqgjznucn6jrelnecm8m6y25l1js2ktqqxt6thq10dfcbhazik8ikzul9lwft6xrghml8h960xl47vfhn9itm97lnyobyyhmdxqnfi79rnatpoiu973c7ltphrahmkc29201udf6hot1d1cd5adh4gb0dk83hdm6y3dl',
                mobile: 'cgmjbexq6qolcgqtybl4pky5jj7iyft9vw97hg49bmckax4uza7xrch8wmf3',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: null,
                password: 'a1jqyds50zpoidfpr2627cy9ed86cqq5ktwhab6jcfhawfbwhs15hsi4gis609xtqdqm5bxfdx5k660poh94250e1i18uuvagwqyib4zir9fbriw6unit7o58too6c5sg5jciyxfihhijx6gs87g96bz0r6atgijuui0ngba4jz0q8swapqy699ci1nlatq1j5h2oy7of621lcgjbvy44e2icfq5bwt11a1tepg7mzvul7f1f94aq4i220vnfzo',
                rememberToken: 'px75mmy3xmbo0drp7lkmjzwoutshqzqh4cec5gt1fp7akmyd3qtmz8yp4xjjgq8svgh9jmw8ezw3s2wuch6ltyjeo4xtrdt3oz6m1og6d17bfc2jci2ux07d89n553lcknlov3n75a9okszvjaz8b00zki7r8saoaj9oyke77n2n5b1hx2mwrqze41cdyn425h8ba8l2goz0k8rj9k69vfd5ml8mzgpce1l0obsdylfhcm2trjj6cp38d0xhib4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: '0oxojzsf5g6n85nyigp5j80t5gyiw84z75gl288oa6x8cqbtwehrm6y8r95u75tsna6e0uowbnvbyyvvv2g9ucv81b7dxzddeugqzhix79dc3lj2apfka6f0rh8tx18caygrl2w5r35yolws85b3q3u733736prfwseujatstgfbx7v6k2fke92w8vz9qhnlnzhtj0vwydf1isrfu6pn49zm9xixfhiuczau9e6870scy5cb0rs3xj6u8fp7m0o',
                surname: '9a699vk8wdrp89l3xcxulst104uhr3sr95c5jizl6fx8p22ospkquqxqr1wlj3eus1s3neq3v7wmgzid6oawuja7xqvaj36k164zgda9zt9qp5r8eovhxq0neqljqig4318mbdwjpj6ddi7k7qr53qfl981sr7hnfhfyivnpeh4ef2flf2avyuhvrr47ao5p1z2zcex0m9c662toxisn68ju1fe61yffb9wcq9p1tvh4830o8fqyrselkw9l0s0',
                avatar: 'pdk2h7yu5ws5r901j0e5jxkh0f8pyv06xohd3tfc1p3tq3xflr7bzhjgjvkxu8emg5378oh905axhrdukl18a6hlbgdyh26kbmgh7gphkwrk1bfy2mb28gk5p912r48wdrhej51v0fj8acspe6v2cj4xux7p7abny5uewafbye6n8vn1j65myda976cvufqmhz7crv3n7yhejmkpe3nqieniklrtokdd9dooay0fkl0kjkuna0qvrvxjew0bjc7',
                mobile: '33rvsybkj7bnw5h41gzzg173za5u62a8oxtz7n2r91mluvd57cdg2gee2sky',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                
                password: 's8oq368wu582i9oufyqz7ekmyuwuswfdo7e93wvsb826ukk3a9gmble174522j6japbn7emp36a6xo3vzfel6aknktpqq96gsng0c59pblkwja64qzg4asynnribhgi2i0m611pcza0iw6abm7l17slsx6d06nf1gkxty8xhxhcjyw4gag9669rf80vqvlvcj38g0udu782rgw8p0sdghx42vkhh2wnktsikidnxchpr56j0sphh7ndyldqdys8',
                rememberToken: 'tv1ad15ib4yi66gpo79bt8v2wgc3lgn1r8105ukei013c4z8hfget6yeluzamzdmntlpo9n20shlzwvbphslizprdnu4n4zdbi5q52cx7uriocwdzwdg3jog8sxnk99rvtkxa7jc2t4ghvisizj2t6vwig7vbfcql4359nqdqvxbcuyempi4x6hds7pjh70dk5j4naz28a4xfj1t895iwfrxcj1brk9e3drexl908y4j4jjitp4o7rm0oac3zjh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'bc5jjof5qpac6rsfavn939y2rfg1odvgzgfrvpzbyq7v6ue1xhjfp1z794evzi2ayij5i8hbt0fsrkp6mhj8zfq0wffqd77wua4048ru0fhh1cohli47k6n5qid2hv1b9n4e0bbddtjqsj2syh8b72ir1a388sr3zzye5lwb3bjzsuqgc100y1a2tm8lx4vh3kw137el5pfo3y7vm6iqrik615gj0ul5sopivqmyppbsfc3xjdsg8wlbzc3hi8b',
                surname: 'w6k0xvdvy8g1xv3o63lvuumpznuj0ulhrbrlgg6vjo20h2shyu2yoq7xiopng3qdvh2izxapbxnfrgm2xo6kzz8eopqnzadec7jjb0av0pt02zez4n9mo9mo1r2tnejgw2rtgu0o0wfi5j71qbz0jxl0ze98td3p0gwvu385ofirzj5e3f60tm5j337zs0r2g0brb5an6mqk09qhwhb8rnip6t4m26092njh58bumwctclqupil017fb9tcqndq',
                avatar: 'mb6vcemmd0akqzpz0z2ofc5yndvohgkuxqr608xlckgetwufyi0v09e9hjco3gv593ynw6d4diypw17uxqraunyaoub7u9c8i3430f8j3phg9h38srpk7yix70ykw10g6silsx88bmzhat10ecy900lv9l9q489pc7n73k623ko6zzmh8fikpskxup4uaxrl2mkgb8iymrm4u092m3hucxcy1kyso9quigko0l0gpe1lm50ptewc2w97pecg6ej',
                mobile: 'iy6mdpz4m0zvzp0vjgcqtq191bihemtdxmeuezb8jxq9knolfu0o9iw5pps6',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 's97b8g3me245sx07149g9vpz0choeynxly385pkyylgkfauhfmegasubx5btatibekw2d68kvmt7etylc12q5fuogn5tk7tn8z4v1sjxaaedwm55aghj40pk',
                password: null,
                rememberToken: '1pr7tnzq54weeg7wrx3lrovtwbwkvk3voekindc57ioaml0ejafrrnqtuwu4fs41anqym0yc6d1napbqznej469zmcyyzaeq656ze97i2lvsz7intcyvnhfwir5z47xifc45w19srlabyjorfso6b7xbpun5lfgbgmv5x6f1h11tzhgjv0g6d8ax904jr1sgojfxptvpx9yalf84c4j9tksdgpajxrv05al2bw82nlgc8liz6o2l9i0rthc2d3v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: '2c2jtl34ocjsm9wcxumx4yz0u4mwgspet6xj1j6uhzm2we1nqk5dxme617zm0panea6fy1vmd627k3vi5pofflaywaqfkaeqli630fpk9pr7o9dj4jtnm2wrhw4ibizuidwd58lxz9ej3dvl6lxqlswmq821icglx87dzm193a1wqk6vgy319l0if0wflamc9776ekp7zvxubfl26a2vqetksbsuzsgygft3cgmg9hiqg37if84s0pjta7sgvee',
                surname: 'ucos005ljaw7byrlih5hojcg2u78odrja8ma1hqutyvtub0cp8j9xcdj2qxlnipg8hp6ia7wev0aegw5iy80020zsg703aidgeepj58o410ct34mlomll62qfpezlsfv81q1j7jvh48u5uvir95c200ia9kwv9byck6f1z0by89o9wlg0vvk75xwzminpwwi2zhcw4kfg4i3g3thyh5dtee5zy193sgzm1nbqbds68ud5z0a7h3na0nirodd41j',
                avatar: 'q5tfe3vlaq3gmyda9681usn7finlmeg7f1ilk8u6ecksttvze9341klq2sm3g30snd4h6hexf5pbmc1spxrcv6rx0ya9mnv5mac5rqf1eoo0ihk547e0o5jnx7yosiuj32tfxyg0nus2938dwjcn72uvw5rre9blb6b8r2r1e79m80pi12g4o46x6guzue83xspapnhcb4qxw9uxi7gqad8d84c3hoh6w9a4yq7f3q4lliv6iofyyh12rro8lts',
                mobile: '3rhokycfie0cwjpjzctf84of1znd9x4fr1tv0q8pr7okqkwosai4vjxepxlt',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'qkq4rlcd1pabca3wnkacwgngb57i72c7i1br6x2pkdvrw8iu67d8wxkt95cbei4ub2yc2c2o6fd7qat895usbf1aftjvcyxt66u2olcd5ltky6zrdmc9uu4k',
                
                rememberToken: 'd808o48bi0n2wb58uvvrtsltgd73l6ie644eys778c0y45xs0qirak3m5ivg4o04hftdaphog5qy1ovmoeitddo6q74t2on77qoz3xax25xdfxyhwe9u2tivxwqkid2ef7nj4ri58uqpywalkb1bneyiv3sxu8b878w6pcerlp6o8ugm8fh0jti8betl95kptrv2l6xh185bty8r5rn2fbwi7q5yq3yzmwm4sxtnjlvpjyir5t36a3u354j86lz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'qn52nh7nycfac8kb4kl1omo6tbayga0xxdlad',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'papm0nyemilh1ls232defsztkw5z57dozq3j8yh2yq2rfqe884tdzxgejjd50ij8m1au2fwjk6oxrcihfmvy3c81yuxw27uy0kui9q2vhq7pmxkcz9wbkh4xch3dnex5fld9flk3apud7ohxx0d4lvl55vh3dmmuhhmakv7pzzxv8ttxftxw572c7fso60gtt68opnt0u3uazdjqw9fzfk1k8rj2vt8eeouia3gi8ycx9cm4rxujwvmv1wqun2d',
                surname: 'lkzx2t7ngmua31dbdfyjm5sz7g8xgyajl82c3812y3r5f3f4nhf31njsxhkqm6b4cznckq7fae7q8rbi3zu52697kor9dhx9aeitllshhxdao2z2rb18k5sn5r038pexwyym1m05520dr4ng4kgp16fj4jc1hh8cqdjzsds6wmtgx9e1f3aojcnpkcbfgn2e48gqkqdphhu2ssnw65sfti0g59js0xlcycuyn5i1p995cjda4zexk2yha12xgrs',
                avatar: '3mmygw8kelwc6u7792qfk71uw677qeh024h0m3iyrv55pbqb99esjlv1v5axb501wt6b88rmcfo8x455wydesklk94xx9bvgxgl3nsrreli3qz0vg5x58db5hsonnnw04uf8hk7evalehtij4z8t2ibg00mcn7f6cp580543h89c1thvi78cc5t6tkb7y2535svbyek5jm8428ya1r0nb0lmvoaiuhmigqoo7s0vbylgc1bacv5cnm66h85cyea',
                mobile: 'yyreerulll1pho3jfomjgie3f6m4lnswjun570eui0qjvbg0k1xozrrwyw7j',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'vkjdb2o1x193kuybw05o22msse2rznjnjlr1axowgxsj5ru1tbwlgw6ujjsqpkrfxfddmr27ojp8rig9re4liqq7xlpxr4wahmo2if6ikcmyf4smrcywsbg6',
                password: 'c8tx25tsaf0ck2il2ku7cyuwcvl4kx0z0dttuwrq5rm2frkqske685ee8w8vmje9jpwcrfca1gsdbhua1hemcjwcb62nwk3buew3sd9h6mpxsj7r14jdwju8emnfuw7y8t0d1z05321ioe934edrdy8ipvamsh9lpuka91ucr8zmootyd98hstu28oesw65nyroby9l2yuwe1yy4nermzz9omy8bv1gpya2cuj2tsgscx32xy3vstlct1l39d10',
                rememberToken: '1157fmao8vyhc1qhhw52ddtf3q65gl4qazj08xm6uxb7ap90i6l8k2b2693iz0drilwb95e1fioaxgw1rzp3ad6a9mrnbmj8j5k0gspgbcd4ymrqrbccupztj7p0vewetvbe4fv32n6dp5pju81gifmj3qq4xq164x7qp96cnv72v606pzf91vzikg4b7knr4940yytnyd2rqdg7m4dqlthc09yoj5e40jajtgz7skwsoceyzrb0jgfp2wr0t2j',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'bce0pjoljilbgwx5g3mhs7xoziwlydxd6eqtr',
                name: 'uoz65ixus815jmj0ihxnfoj30xhrywhew87ncrkp18gfdmn2vmhd6k2d9dy8yu11afvji1cc8k1uhokrb5hpg1llpd7rm0x00ayn007gijranf9eg5vvos0ibjk9k55aajykvayyierle38dn520mm3o9jjdbgdfatqlv58pjnxtexzyxdrhki6ouj379kk4ny95pzqdryy2tnsstmxycsit3lg74q2f3phxj0r2qplt7z5y0ngmqbmsij4kntq',
                surname: '5n6t6frxgvtimblbpw7166ivva1drwosarqbenjxu5yngjfjvaer9u9d80hylizenptpyq35mtky390sb2j8p6cztqcgmny2lv2ohvoh3l3zys8ibxsgs1z5bwgu61ge6yho646audr0qr5ao1d9kbmmf7bfwfzzrb6qetakl7ufvg747uuxxyrz32xosair68dhmt2kdwvumj1er0txfd13ccfcgtok3d5n3zvrri534xb5d1ax9fwdyilceja',
                avatar: 'oj5nbusnrh8fow9bzt0iyx000ungwk4s4puptmh57rf0qumvn7h1rqbsl7tnsqo9kxwmc0sraznws4dfn5193apwjws53naczdu0s9cyzwoco0nrlmvgeogdwfbmtx918jp1ccrcwcbdr4gt8ux1tc2r7mg0b6q43968drs0gelef0wisp0zmdb4itu08kvciqq11l76g7j1m6x3170ixb6vzlijh8d9hu2om3gtcefpkax2ph1qtcy82cv29jl',
                mobile: 'x8dsv2orc75b8o4n3c5fhxe9b2ga5pf7lfgjnzowa553je08kcatgg8e7ki9',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '555j6ron7hyze0jsm3stqtvou29llfpwcgqaofq4semtua4vq8sstpaz7oz1v1kejynx255f3gq7gx5ikxp2ituq7qv5d0jjpm2cor1z8ps803o15gtjndrh',
                password: 'ed0galv7t0dszd5vzznqf2f17la8xlvlzk12qaf6lv6gvcxrt9owp3uw24cv5ksqajxn4iooy7uv2uyhoxiguw5zknajentdxukwtdq5wdi132iqme0o9jctbmd57r403ibu3ktywdbzyg5qcet6p1kdfj5miz1pd1clkvih78ycs0iofdn0senk2fpe54foa4cvzgrscwukg9j5oa5m2wf6s4uq4e57jp11u9pqbba8ipl8zrtfcysj6lrr0yl',
                rememberToken: 'n3n9z8dejppl09egq0i6am2gz227hlmaih0kc206v19jh9w640anhcd7gf19f4qw5q09tlp3l06238e8nb3ixnb6iexjycs6neyf85lgtn7q9r4ozoy9898j4wrp21lsf3uyvws68jgfiyuqd7pf0o1noj3l59qobqigz2f4pmrfa6cpi9h86nmgl3w13oyqbfn7l5e4ea5v04p7af06ypltwrqf24zr7jjnvxav9cirlxxzaj9mkcdtlffnorn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: '4f2plzgzgtx60ffx78wzrt7dgh844uxt7skxhcbjkgn2dvshubasu2im26r9jifxhljbt9ou2r2ig5sadxz3dwqz4u3w97bnfbsr0ll08damwvagv94sjp86wlkml0z5ymdanxihtptnlnvu8t9i17w8zkwjek0ukx3w9u1cnqhundlxsmpxf19wqk9ybb77987v6j7z5xpwolzj1avn3qskalqtnc3tw3ywigmv3fuekgleveasb792dvuuzen',
                surname: 'h5ov3wmdeoi1k2ik0ra8zj6fhin6gm7ayj742vq4oe8ksdt7hw4jfjzb5v7vro9ulrv71cvpvf83xd1k2ww2is0yu72vmf6gk7nouvougy40h0177izjq1pzfkd8u6hb6t02tt9f9vpiktp9ncisne9nwg23688equf62yhrka7m0yd5c1s023q69l165isfby90so9a36cleiw4nlj0ir03xinw73e39qywus3dx51i9cdes367igkw8z65q95',
                avatar: '33otmkswc1ffwandl3ww83i5mcxzni5488zkoqt15jjoif84uw1bv5i9lvu59aczmwd7a34oupt54mp8u8f5hwhyz85ew9akt3idzbzx8nuwo2pzqnlu47p26z6zyaxubgx07taz1h3xu44qppnv4q9dmkqdicn4mpai64r1anepndmpk2g0zjlsk18ls8cb1ulwggov4l2qe6bscgc3e67339gltma2wcahndvquizvuntlubakdhjx1gvcins',
                mobile: 'naby6fh5qqjnqxosie98ad0cv0i8c5fatd0g2ixcxzgjxtlwawnu66oen4mv',
                langId: '5lybtq4uwk679dfo3e997vcr27r179fuwg6st',
                username: 'pu173dhh17xvcnpoktacovn32emasvh4k0afc9ugyrhb4xlisj45pv0cna7hqkul6pus72fx12x35uzc2qrjajpw8ozbztturz5ubeeczk1b1g39v9tbv8kc',
                password: 'jhud3ruozk48vhlm55gje6jw2f7prg8vwuhkyw8uuzbs4q9iij0h1q2lemdb7fhqbucds0zs1f8pnqyo2ipb5pewdh2kr5n9op3tuw6tswjd2e051kw7iu4j7etdbtc8g1xespxajv37e6u33nmqsmcp2q03vyhlpwywoz6o6vrbpc4997jtkc3rbggd3yluedb4po3xnrj5aitnsv237akno1771kap7pzrbw67a79jhm2bktwmlcfukjl9sqn',
                rememberToken: 'kihfkybumu36z3tnqhvq2ylws7rpx14tq7fq4evo2g8icwq0bj6h5qzjdiwf5iqztoywf9kxph1u26quoxae5pavbmi72pmmvd8gl5eob04nuooihn3syp74ubkkcseucpra2y5bcvhe4b49c1g943hn671tq4vqj5f3tryibxt8gs2a2fh8eo4hpvkudtddsq11ze67boryb68sbv7ngdk5q83ptcn59iulsu3mvb16b52yy3a3mzutikgjsie',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'gr5g390ih8bllyveqt7tqod0bqgwduy1p2s5anjjdujn0i22fdnay25d26ou2iip05sm3pkplvvc8zl46gkrfpa4h9s9zre7ohyl3brnc406blnn89h3esfqsht4zxoiv1y36ftfia8pe9tjavskdqsjzhfbz4yr4gch8p6scfplsq3mvmz6ef1ar1p5mx2udslnyaf4rlkzhhl8t85pjk9a71iwtswx1j33exz3re5xq0abxqwp71yuou8r092u',
                surname: 'cy2l20f9pxzq87lxzvba3cq03qrx6no507jqbh1oru2mj11rb9nvghvpryhafii8oxuezn0i1kes45vcohpijf2j49f6p9giiiy6vg31h3n8wy1fbxxlryxitztgghfu5d7owuwona4040w8lo9d7hqao4pqw5eoy560ya0y9u5wii5zl70sq9tbzew4zfs65wb6uo58is6ybo3lubsd2u8qiqsgx5iyahlmiopmsiorekr0xn7eipjzr8j2ury',
                avatar: 'r59998dn6c5swxkbq8kqnw5z6t22z5s80cmtfkeunghsv1oldmu7v6btam8uddk8jq94maz85oeakwiwxdfrfc6ks3rkspz9reih8ceu0me81sjwetjb4piu1vgof84d0dhi72pmo4mlnf7850yetnepsejlyez9lfqbgxn41rpmegv2pqbeba0gsd5lkwpxkco1bczy3bw20rbagj8djxp77jij00qhgm96b8cpk7pnvm16edam45flhodwx0h',
                mobile: 'pxjg0mvxixptmw83fefaixt7w6gx2yydm9gjr67pa5mbr0p5ct718x1c8jki',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 't49wnllfn5efo6o7gfcp18ozapnc9eun29p6qf0yz3s30p0ypvcb0t63dw4kkrfm5w2llbh1xefkttx26vy7hb9htyh5f99pryeess2w63ai2d5ed7fetp1a',
                password: '08f1d2nen57hr3acxmcodb3ycwgh0tkbpt65aprwmdvb6r1i36bdm5tbgxceeqz4ec423qay09kxqwmb6n3ce87wxazbhikg1b0h4rjhv5vk5judznnqcqywzgjrkyx5tow4k3wqeoeogwfz933guo651893f5fkb2x6wurgwhz2yw9lhbd99k4ft5vn5u97xojsiwxn9udwrie90qog92r4714ytrds98gu9s8hv0whybj0d63pkjnc4ykdjhi',
                rememberToken: 's7f8l9plx4lwibnslj2l3av5q5u9ocpr4ppp95ivg0e2ozu2eatjxjw7oxt49d13k555yhbzov2hxursd6ow2pyvt0eein5vqiwlg80yjuseh957n5pvpibzlgym84e5ozl74gqzmu8ar13sy6rlirmbxyhzb8ctl02l5wunbawh5u2jyo24iue92e2s4yr6jy4cb4yi4diykue2kjd0262ae7fom0z7tkhi068aebmbrafdelcbpp1vs2xqyh0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 's4grx7uybz6zxeqwy68ydy2rgckhd2i0xnznpii2kkcsvifa1r2bqmetw1wfifsiea3z8mr1koi6wvbvpf8bmsm7w96afac32chgguu5p1ib8c53qr015xpb3fyb2ryc1u7h2mf6a4gu5ljq136djy13c0qlzhm9anojtdimu1dczisc3ujr3w19x020lk23wzipxkl0x3kddcm2a4y9uo662l1dvpec7ak153ult8kxrtgfogqinvnvfdkd04j',
                surname: '4bwf8vslepsi7lyhtjeoshojkrs73essqmzup4v0hkfo9pr21olycq2aom3ikzcb41numdnn7m3plzo475dids0pjcv5ea4vxbzro4r47wg4z6hhvlc702v4ju44ju47y5akpxd98nyjq3sw4a3d1s3bgzemr8vutjksop2v4h9358lxb2urwjbxmm9o252db5lrmu3q3cf3weytww3ybd5q09s1j3706h1dpbvgsypsiiju282dy9a5ir1dzf2j',
                avatar: 'fzn1neq7medpzngzhep0amnyo93fd6uub3u7a5ba6idhl6mja8zg1grrpnxfb7ve2cxfs3i46wag4czzshpghvxf676c67xr2sfac7f65j8gvyv8ouwrqbragrc4xdnlbue3oe1qsgta1wytfc6yx6lcsrqab6dym36l51corklotgxbbq9y5ofwq75jdj9km7a3rtz2omgv0ojs9pwe7fgfv4oth4bfe2cyfkoudjcxkdgje30sb8cqviyehr1',
                mobile: 'ud2iduntj7vtlctwti2mn25s3sbq4qdyc6akpf6ehz9pcb97ar9c90pyyrqx',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'olxg3kumlfm1i5txur4rgzi573q5xti433nier5l266gyja0qf99725ggpe6dz3y5q6ocowv5muf2132hm6rw6omjks23s4h4yropgouayhfs2bu405x5obs',
                password: 'cglvy2mtetto7xp823px6r7yisilja47oz5kmbxl6f6xg23dmj7sotmnog483pb43f9ruhgjs5mwfkx18983cnja60alxfluom5tmk0ndnjv9hghv4fcj221jdrzakuw08pnwe96mq1u2hw6se5vzt39b6d2xe9plnb7eb665jhfrfl3703m8rao8dzln989k2hqznhtyioiqzzhh58ftrtwwhgr5o6mwwqjqugf3uno1yk1yyx7pqiafnozs2o',
                rememberToken: 'iyleeong0e78mlcm77g12hmpbufyzilsxjrnjth7v7c8zyr0dt7s4b62jbku2i5f6099ap6rgcpnko852cmh2v37sfvn1454vv1s5wsyj4r3j6mf8hvo3khfitsw3gwexx4uz6j8mmee8paf8x5jp008wowol08f3dhv9wqx0t0k72is51og86h99m8fbcslpbnbtbp7meztspusivg1yeghtb84g6heze2bmsp9sa0kjshvdkx89o1d94zqklh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'xff452ys1qtwbs1ro9dhpn64c1qdwaozp77psfo05nhak30beq0bf68jqouzx8le3xlaan5w1wyirgvtsrsband4kcr7i7vmqj49fu2g4pyea9nv4h11by3btgmph66ut0rkbsopehbh4s4imfce4fslfeib3vlwe8ab3ood26focx5pypp3yawadisdygdmtzbm4r97ua06fj2phfx84985pg7phqo58b4uwjeauamujpz3sf4lmpmex4nu4ja',
                surname: '3q0t4aa1y5yv4penkc84bm1ye5nv8g6dbi0tnnno8a7ltlkgs6o085nyt9ajb9ykuq04fnoobmxia3czcunrfr1swao88y7br3q3tkms5qbgerm033r6aghw2mvwyf0m1wr1c986vkbzvgvs2ugg97pox7573ludvpxw53l2ypzv5xer2par17ito68eslcbty5vgrtvzdnnr3g9kqpnpn64tg3fvaoiak2prn6akhzuvvvugmf5e68zes9il0a',
                avatar: 'jjuk5babgjw8ui72b1jmecjug70m6lq91mgjckfp2qffggke9gq3ijav3sb97gbf6oumreociciwd7l8qnb39q1ynjns88xzwaq4pbq0wntbi8pw4pasiges0kf3l39xs5hwe6bshmaj05ab0sijm94142k00ydrin4pmrvoty5f9tlsnwqo3hl6phgov8gnvx2vk6orichqjz2h58a7e9zo445b8ma38zbm4i2o7c2v4o41rv0dhvam9vfq8t60',
                mobile: 'z63v9kuv324l5tatjulodo76la0xzsfpqn6xqxrsuu3wd8qbl4h8rz760lkq',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '038afbl2lfpl42slh75lvnjg5gqzj0gky25oc88formsg6o9ooqs7owkdoi4kp4ofrmw9jzvjm0u31v52rb5bij92c1nedfbw6inw84ivwinfgpt2cypofkn',
                password: 'plp532onohj1ye4q5fp65fbevf7htk2ywlf0591cm5bez33h5qb3bfae9xgt680emdar4l2bfcn2etllt62n8wcm6fly80rcvrknbts2ovm29vwktgxrufsb4f10aol5yaaekqe182g7ihjnpbvn4sgj2ds27m8x6skdezcb1lphefwtj49lka5w3ciemadz36dq1ugth0g1m7r6cjki6shbgtzg5mglxjk4dll3ho8po1fv4xu09k8qpv5afnk',
                rememberToken: 'ngzrzq813nflev1ooamboiprmg4sbd4v89zygvlmnkaaoce1p39xjbpvzg2e0xxhbgpg7ytlppiknvv2nywin65ngued8wsva4c56d9vg6s0pa0htsk92khpxa1nlbzl4a2dvfxgnpdceakfopaxkfpturmgpedb09a924qqqq2n3wbygz9c3fny6bdmn4hl66wv3s9irzkciyqye64rojkx4v30ud5fbou4cqupwqf0glneo4ch0lpjnpinldz',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'lnsyo2r5td2qxv585ezlf9b18u2dguciqu741b45kq19944u69oomsumo6k81rotwgzt0ghpwn1jjxd7pc82e0uqdsi6a400gz2pystjj3iodvl8e90jmo2wfnbuirxirn7xttk36hpow4d7mentr40qbzumc3jg48m9vgebkf73nw96oqcnu53p87y15q3esksnrfjwufcbz22dqmcnqm37igi44lsr8kybp4yaisoggno9ddnnq79g7a5gx1i',
                surname: 'wk413vlpxetve93ndskb2cijki3i0uhcquz5647jxxj5ns8ff6nmuwu67kgxdv6tc948e645tnmleoy0diaovf87c4wop95gykleehqy54xpeppaz0i1ryr4yns7n8twh84inkkoh9kf5ua99wsk20jojz4rf55fc3gihqd7f3kcwoulh9uuvew8oh4s0l8iyrpgizxspzffafwfbzbazpvm1nh0a8omd9ieu86fxve1njojjpp9lpmfa4goxtf',
                avatar: 'nurwt8g6beyg4vfi8cmar7bjr820sig8rald5z18pvuj4zddmo4vttbd8msaqasd2k4bcv9qjpwfwyp6l9mhlziqoqgudzwb38n7py0p9a6kow47yseik438ucpd2og12hihddneq1lszx4jyzia3aut4wiq14uqberzkptv4fcpzgryd2dzhb6xjhd2jtvcnfpu38lggptasszu5gkj1n0icnmf5pawlrsr05kz6ra4cqasj34rmzxayrz3u7v',
                mobile: 'pebacxjofsg7fvu7zqu5fjn1476en3dqxzbolcuyj2e4rl3dj9aor6m7ynn6t',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '9nqcs5huiaesadr3yscdrpgc1gvh5xbu57uoztpah3i15si7t1ee0ndhy0lt5p9wu8ah3cgn9yoq3yg1nrn91djaj6kfn98048dqlkyjsyzbcps48wmt1wf4',
                password: 'mc60dsxmuuh5r8i40gizookrpzs98tg4s0in5ovwh7fxw3hshgu24qlkqstyozccq4exrft1tk50jbabsvd2qehmvi50w1ephyp84zxsjlf1ho1xuim4pnx4l9t11b5pubgdfdhscx0tzcmblnp3qp7tglv65zvrs4z5fiiulj4cvcb40fl1rr8pk1kx67pzd6cjmb4ybhlcrjfwid581rc4l7gd71ksewsgm3kbsks2c7oph69thlfgihatjso',
                rememberToken: '8tohzx5qvmtynslt9rfa4s8n9aj2zvxrl5gp0w9hnfe2rmqvjscmfseh13tgxg3te3klkz9i86kodj5xnsssnp2mtj11pai6wrg1usoq4y906qqubr1z8ioctouvrld46y9xmoww15li7d55trr2nbuhiptqk9s20bsdqdytlujet5gvbjj3ouylyoref6jssj76fp93r75urcnhfipuj3dzsedg6g8x6whxayap8nngukgdxd7v087e9v9sxxc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'nkc892hiiaybxsmkvw3ha4e5mdnilrfazv5n3wsm8kpr8pxlnmmik6ke5cv314mfihq5pycm73vwyrblp09can3r8oi98bumn5tzo7yutq3jxnglacqx4hsy760xpowaetl1eo6zrz4ti0hxl5ebxha1bj0t4rck1tgcwzilhp8bmtap4o2u6tzpn1h17n4zx1xfu1bilf3ci1rsg8e9yuyd6y81yo3txfemn1w8nta8ifn5y259fhh4ocgr3xz',
                surname: 'ww5szy04nu8qzzkgplyy8hnv7vt9k5kwe25kx9iad0l1a6h37xlwc4vggc6ys1rs374iizc6ztsyf38ut2yufijxl96uy5bk1wg5kwpnwm2lsybpqfuuipyfu81uqe9c4ijb6e8k6ftf9mbualapm7uscz01zqtredouuyyij42qxevtstfdk0v05q08kfuamdrxz1bexfsva3m94bgc8l72j2ede69ymt0ma7lbsrrfimlmz27nbtibixxe9kh',
                avatar: 'r6p9b227w4cgom0p6x8up2ra8mx31way8l1x8mmafgef250tifmfnjelr58z7pvrfa5j0yg2bvj74hcr92ux6f7boy57ive5dwtv0g0c6cdjd3acierw2wasrak7mj16txt62tdjmp5ofapx8t36za0193ek6ira3c94kduaxehggyrywpky2gl49x5uik3wkxos2gtd76nzxbcqvlo2d3dhiwcd2g91dd8g03cx8rcyxbdeoezexex48iza9op',
                mobile: 'oc5778yrv6l260gi4h9joxr7equru49qbuf9m4j2pi2h8zl7qauwbttkl6ye',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: '2kv1qd38si99pwgqdodpstpnk9sq6ok1u0d6vt1ittig7ortz1i7wh6xwj2pvsvw3rfrz8pazbinwadyrjpno8ymtu8jyw388xbmzbupta9z9yi7j45055rpg',
                password: 'ctp5kpv10058r8jy4tadtd5r6m4pfu057yhortanfhq1cbnonmqd67jwpvgd386n949e9qp7av07ehccwgqyczueyhm75lymitun6cxwyon2qass7qwgv0u87k2xwvsmet6jb0ulc1xmgo7m7e70wcj1q4f70qbwh0ewfqz0nhqnevrm31l5u36gzshvlsgko8tuy1d9tfssje05jp276vascl5fdzgg7a9k18wxmfkpx160a2g5xn4l39jxlgn',
                rememberToken: 'iescpm7irlmm5feh67r2miqb3m1dkthgry95xfs9h954cdo6c9kyyeawc48etnbgtcd8xon3rhsvgz12rlr59r68kjtqljg9a51e6phhuszun5n034ix98eyoffxp2ay0idvnidxy55xfjl0p0h3i1qbecefb09lo2haal0oh4zp7xvhd5pky2kvw1berzoofgxv1vo9nw415xz0n9726luy45419oxq94jfs2kgm02y9fzpwdejb53d1mwajqe',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'm0auy6uos9biwvpvh2qjvp4vve2msq1m7xpozxyrbsydr6v0ofxhbcghutee4y6tqzl7sfoqvn3r4i47qco3w5wvjilvz4wy5a6kvqjdjxs275whc5cl1o7c53nmrjn546ttgh41n4u4fxk35m9x35vz26vep6bsiopfuhxgqelp0iunj8ij2houseoxqoz6rkmp42thwgltk12qjhmp686sjdo1mkx36ysy1occ4zz61lahsbg1n7ilai5n9du',
                surname: 'uwfy6mp5vdl4n96ojm3jtmdbcg0a9dj10xfzf1kgf615ui27kjlnx3n2n0wr1nk50edxuvw617kizjytuyzr0ttjfkgs6u5a7nux15uyrl5xl9kh0ftgxx2l137s90yyig5g0xotunl163hduw677o1ph0e8y7p2x411czddlri35djef8kgoev2nd44zh5g9jhqm0lobhvrydjy5wbjtex3j7yryskheu2ll0e6wpoa85f9qstosafylqweddu',
                avatar: 'q3w1okw7mp7d4eorpwmokoewonan40q8izjxim1iyvc6l200jtvqmgkfduf88t62vjqwd87qjq3uzr8vrzpnrq9y8781sqb7muv0xnp49yabtmrr9jmgusxyffbone3okhc18dp4puuktbu9h7mjkz3k4hkt2djslsv9y7sq937zso02ck5cvc4dogicddcfyti2fad0fj4zwmi6k3uhxccl072769mq6nf2ncguin6qr2lo2pgfvh3bz0f66ob',
                mobile: 'jei9f9pjdbi30vo9co2w4d5osb9gm0k4ohd3q1iiv0h0zfczcmri3xyo4mrj',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'wh4mtzd2mmjdkbeacx65u2b5pmvv90sx68nrfc7qps6a9q3oqc3cttfeeb1k5zswybkmj11fbl9j6tlwur5zciu9qyjallz76f9kx75fmyuhllj5z2cy946v',
                password: 'r794kg5k1q67301hvd888w1z61k54jb6s6tg9upooyivekf06aue4wounny3g9ashwso2wu6dz77xgfsuycb3aadq2s4spy1o66f67n3wutl5jx5i8p0v7ot0pgowid18hgk1qatrnuxfcl3nl6kn7itg9qwoj8o8ct7jrjfre6w6lieax4feftctzv56cb1h39qm4oum05sgrw9bsnkzcfz1y4t7v4prkpnml020iiwcnfhxeb43ndsf6nkalhw',
                rememberToken: '9fnojto32psgpuzofusywfcogfyp62rdpx2jizyu0iqhxhef6pvzib67m7d5axht8eg3frhkgfs34awlx9mkd5p9lqu0iarqpbn8jlyta6rbsc1m9hf0jq2h6mbuk5tyb60w8ijwvn4o7bs9j4gwm2shemsdzgd40vneohuvu7lbcrd3r1qat7ustrj012x6xxj1e0wynzcmwpe374m4kttvmaenxnz9f1ng5f5jis83ctbdjtbilwrrg72srcd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'z4c62lhy9s0jr6ppmwcl1rjb7l4aapp86ovrijujmgml27g6cg37wn4mlpq553hzurfwsx26o48v7xo2i5xnqrmh63j1rcz8nxkv0axi3uutyhi74asn7tvv17pdi6rhqjwysv8vsur9452twrnofu9vb4otzioicu2uv1mnbebpi48jg5twm5hzmci52g962tlue7425lu88c6rlbbif3vyghau3q0969vdmtbbpwkrcjuban8ilnqvfwxiwnj',
                surname: 'wpdwmrv5oke04mzzvyosara960l6v46wxk4m39z6bkg6vxf23nr8wyx6jyf6u84avlq0pswizj8gbbnc1zmy8qk6whguxg75hkibkyjbljzu4rysvwiiyht2q2m3kv8ncx7b4mq6drs63awjcq4psunw64f7gkvx0tald6slwm25ezd9bxeul2hbn9lro7ckb0t1dfggv7untmywfnvqvmzom6iyx5n0mozh9ondl3ysyipierxyi6msl2z92ii',
                avatar: 'i3sujfrkynm1jj27oyzps63n49r9il9c14217sxtj8hozg5ttc9thhd7p6xlxetlhv48vilsca274ny4avg96pyhvdww7tttkrj1omq5pvse543scl97y22qe090icbqqhzz1bwslie4qor579g0ktjybyii28uyg1vjwbltn78tx3bj6v9v6g857p0j8fz37bdwg8jcc58xa9n9l3q9w8fqwjbph83jfe6qu7k77v4f0psvr7y93qwec7z38g5',
                mobile: 'hifix5okox0hyahfw77r0s9fipym1n4o0axm489itutcw20w3byhszv5hcca',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'gdfac8gbdt4bnihxux9fnm7xutlob22nth8eatd33jy8e8z3suu2q2nepmya3y42yemi6tdvynx6j78h3crbiptunoeo3onm6s8z8u1e5bjcoc16wg3j05nl',
                password: 'cljppuvjm5qhkc9mr2somy71ijj971etsnzayxoi2jbejzcqpmjakp58qabp4u83939fu32sdvgagsmc9qczepvj8k0hj69odtrekrh6bqjzjx0bekbzaafkb5tpes3ql3y3kz3llg1fx66yboq41rxmm7nfm0m928opyf5albwj5h3w1gbnkqwe4raxqf6yhkxwhhshb5zkvky3pweghcal9o3s9z3agvj5wwnwsbbso4omnenwms2ah4xlrru',
                rememberToken: 'ql9q1q0stj7dgsb54d9i0m94d3gmav5vvu9kiijkxer0qrxthoghnimqd0ujsqm7oyo93mzbyd7dwi1z4jtuc3uhmzc4tl7a6cx93ly15j5sjcvqbwbbmz3fcflonr4bhxztrglq7xvs6vok5ba8puuijx4k9pnza8wick2sqarwa60m1ndo4yj9zdx9g6sur75skq19nynltzu1pw8ui0tsiarhkz3d7897ds11p72tjo2qr917sk0npdq9fghb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST iam/user`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'zl9qftcsfdyvjjh12yslcealjfmowxp0v4kj0qcrg4o2fme5t51e6q4l07gbk4uzni5wxxr88lklwiuzmynkts6wr60ywd9u3pw7tb4wv0jtr1txk3stbt5xss6yecgpczfw2wcwil0l8dmgm6x7h9j4zzx3aws1mqzxf7f7a8l6eu1vl4wor4l0txpdi21diqpyvjlv3ljgi1ntj1yrz5p7xthtqnqbtr84oc6elsiwlcs2wo8qwmbds28eeep',
                surname: 'xu6pea8oq7txcbhla4wf24gfxfnkevm42j8ut8n0ky2fu9jqy7j8s5izzilu6ztu53r0h3cbt3o6h7yk04kw14i4m6ufdf7mqsywa2b8svm55ak2vbx3xmu1ndjwb7ildi3m9sixz0vbw1n4yidh5doqul5019vjnr90kwe6i885390szs8zs1yhtbpllskk8cb9abl3tb1nke5ece2codjz6hczia1anjyllo9t4ooqd2zh0kvtd9wpoqh74dc',
                avatar: 'h7mz3qbdm82qeyfm2htkdw25xuygtpkw0eeze2caqrm083ebvfp7jibg4h1xga4pdhbstn7setanpd51nb1hsrx2be8ceta17bilctodz2rb0vxf9x9do9glec1o8oxy9rjugr6aqr1f695gbqyn8yj0k5k3pbwh8snmbjaldweuey29xpqnxpmslcxondoz7k4s7lo2tgt9muy5l2o2md44j9vvq42ns0rpoom1yxmsq5zsrlfi0ah3fpdtmfq',
                mobile: 'kgghl0az22d3u7oz82uerilf9reu2581h1clxx7ofkl168lrpi7rjxw7y1vo',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'vkoa4hojhdxtebfz25gtf4eve402pl4dod0wuhneszvy6bxmpwssylj3u1bv37nw7cw6efzt8uda2q77wdmd031um1v4rkq2l81fz3nf3xh6g2l7dnz8az5x',
                password: '5nkscitr7qjt1qo1edokobc4o8ok9ng1nijx8rmdt2cxmwqqyy7iftqdfp8x6hoxb2tbqpa9suec0z1dsxa0o2oij974beb77p6wdovtxwqs0mu2h5hdnpgl3squ8m94czznesb04xj9cyo6k7n11aet50iix9buig5h7q49hdkzpc4t0i08syf69rvjwobw32spoimg2u62c0le8vs88ddrq5vt0bbwhbxlh5x7ym8or4d18gcbjdlp9cu9b29',
                rememberToken: 'bdz0prr35tekctvvs860syobsnk688eet7k2pfluiq90htxwxids76cdluyo78yc58t4issfmyydg6wldfnrdviciud6cx9znbu74lqld4h6urcxsv23zk1brdus4rq6s9457xxj87p2npbxhhq1b6m8stydtsjes8524di5h7j5wcdllukojzbbm609y4go6vpq16jx3cw6rcvw1iv3k843l2lb1ggp6dpvjaxkz3li9b1bll3cqd4ivo5fjia',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b0e35a56-d710-4583-9cd0-e2a341fb7a3a'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5109fd03-621e-4c9b-bfcf-b240394770f9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5109fd03-621e-4c9b-bfcf-b240394770f9'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/1bbbafa8-b4e5-486d-b55f-c540db36edfb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/5109fd03-621e-4c9b-bfcf-b240394770f9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5109fd03-621e-4c9b-bfcf-b240394770f9'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '0f070a2f-73a0-4a79-a72a-116459655cd8',
                accountId: 'db695628-2bde-48ff-b5e4-72c37ecdeeb8',
                name: 'nws2ufum65x8vsohiylg1k1jm4qdjb8uvonvknov16npahyvwvq83nw6gmvksj9lnhq8a0ywbeejiiiqr306bgtxyrt3pom6d6rxh7jj606cbtmtdrobtvy8cfg4v5il4vorpagmy5m60roeqt40efr48echpf18zhtwq6aaxl5mnfh4g6ab1xfafr6t3i04muaagmgcno5hbkzzdoxkh03qw9j7lnwe374kksx97z0v7q89llp34j5gfsj27y1',
                surname: 'dhh2tb5mhf1xjw5ydaya50tufznax4s2ql3z2bf7y802ahj2f10697ikjsva6ne6bc5nnt0au46db7yanxwyzto8qaxyu7g7s6pgesqxzwtbe03cj6o7sw1f14xalnfklrqqdae2npui4khmza04rms5o6xirrg96x1g71y25l1cwe6thwyxf2dx1c0zdis1a09bjodwjf57v3uf863v0km3lhobzuid4faaoqgrmssdcypea0mf5iqp6ckjtte',
                avatar: 'tmr9iutce71kd7sq5f5hm43mmijytijrg8612xozhxfweam3xuqdr2vvlp70x3eak3hc8kjl83xnycl6d5fvdy65or847l9772d1s364hentq7u1gk68y707kyo075jyiqcpcalwub2drik3hc9jx91c96vg9ak5z2vzn9if5itsmmz5nq0e9vcagzcu2km12jza8ravjifmdkfnpzfv7cf1zuoza66jmc01keodxpjthnu4nl793y5uhkojxhx',
                mobile: 'cfam7phwngf4ks4g23q4v32rpdbs7isjl0x9tsb96t5ngsboid3l9yxvh2m4',
                langId: 'b283a252-0872-4ea3-ba90-91409309d3d9',
                username: 'sljntva2ae4wunms3up7iitgmb5es841pdcxe3eiqha9vfyrzbqnadkzzl2ihfteuhk4144my72k5e0ocs5rgr087w9mseiqvwe4sxejieo5h33fen2yqzky',
                password: 'hrfss58dsve93u0x7q6472iipd93sgagj59rldp1np8lxgpjfbs1pl94a6dbehskc07xy5aorn3jyhijhwhl1oq6n00i40yu3zel2g41vzmxodsth92avwpdvi99pdv8ujf3dvimx7bky2l960hkwqsqxxb94zo5bmasqgt8p6s8xowggf7kjfkgixpl4exv6nl3rn19n20i8gw405daum4xi8w44oqyf1hcqwczm9drtkptjzfaumziqbsu24l',
                rememberToken: '3qhonwmw7mbqbgno52hgsr2oq3jeeiirs0ne3dg0nuerjgr9ygydebkzcoiwznfeilnw2e5c6cgr3cbgxpg30w1iwmni41mlkwa1e4ndobum4qilpvs2ai89po3dd35offzle6o32ueuzzaiycvoues0735zn0epk69yrstvx22a9d8adfemmpk91e3q8jm3gauo8r6p3u1b6oa6clav64e217j4xca18d6lmfdjrq92m8e3y2mekk0dysj4g02',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                name: 'oes9hekvfx15yubxeh4r351y8eginmhcuil48yload30qbqx8fv8u72sdrx5j2zle002mlvql50bbxd3xkvr97ekh1i3ku47gycxwszor4454qgqjwb5jl4tl5muny31v534c2rce20yz63dngjh80ox3shejak77mnw500wpi13gr1jad424r0vbyotl983ml3avkui39awr64zt1hiwdbyw7c9664htixwdghienh21d4eggoeqgk33khec73',
                surname: 'hkwoxkih1mvql91cvxrco8p61we3mj2uo44f68u99lsmsehqgc88qvlwmn59c337riast0h3qr8dxzqpjjftrosx8dwwutfxjksdnn52gwob2j21f1xnuph5sx30qta4wz8cr89sxzjd3q0twpl3ez54nat4uptoxncwenqs6t7z0ith310hdw8s1fa7aa6305btsfh8owp8bjzao2j69ohudikggv4al6066gi3y5shnwy299g6sxp4mfbljqc',
                avatar: 'u2xryuz0lmlbcljjso5nx0d7i94f8gqae367jsxyjh2zvavamm5uznbjalsw1514k08deyms5uf67u1ckvzekz3gcuhrky7lkl9f5vtgmb1qisabp8dfa4amruwrtwh7i1hit8jccb35a9x5bfc0tr7sha8defcux5jl9qmwyk9kdjy3x606iwmo510c9fm75rvufwfc5ajzbjjkk5lzdismzabhi939ehiep2fes7eawmc5su96ilztr10fleq',
                mobile: '7v0wl86nhjdmrphe5hvx147vg8d7jzfbrx9322oxkjh5dw0azjwr6nx6sy42',
                langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                username: 'x8uwt3xsa0bc3jw02grp0jm3qy75m4813yn0iul5dy883kt2gewtvi8lozvp26oq667zvfqb5161tcjy85pdirfumc49podhs66vptvc9g0dljlhgjst2pey',
                password: 'qpol14xn3wu0pjdswpdqn3bcut9v9qda5mtun1tqhgxgwb5343rc772yug286byxq94olilcg0zo13j3pfnpzzl3ss6x9elq292e6dfphubhba8dwyvom2sonmhyqjf4wke18fqwynx1vtc5s7rvsc31adxfvnv8ww258t0mgxjeamriunx08vtm03vqjc63zeoki5swnxn9de8iu7mc86q6mwmgw7ixzva3vvkv9pjc8nfa0v6323ynn3kymbj',
                rememberToken: 'l50g4hslszznda72bedr88vlau0lew2tfq4jxq1e80qvvreglxtm0460kwtdv5dh0q97rgubtwamf06ft2gz7e18j70jqckxevy1duz8hl28vnq7idqgj7prvom50mv0kcwwjbutaph2tcfha3lyhjvfbm4ezzc75jxjook00f3ifc7e1ql3d9ol557fmlyama9h1oq8sbjk3qgj3xazeziys3rxfvq0kvl3pq1yutoc55uxxmlfvgtnvvd31b4',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5109fd03-621e-4c9b-bfcf-b240394770f9'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/03b542c3-ffaf-4a93-b7e4-e61f727afe25')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/5109fd03-621e-4c9b-bfcf-b240394770f9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '75e2e347-1cf7-4c51-8c1c-bff16a867f45',
                        accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                        name: 'c16bpjnogeiec7gey4ioyy3g5uqzuflckdk7hpzcr4zfnqnkbzz7t6ahab0opm6uctky508br5mpjq98v8bqabpfu55o8c76jqf2s844iz301m0koicv4ytbzxsu7gut5hzzm3136oik3abugtyor6a3dy96btnmnbfwhw5bws3se2chyrkn9m8av5xpy21gmt09tgrifrvrwjp5jdna0kovxvkbx3c9qd3dx1wf0jn1zoc85k9llnskyeenme0',
                        surname: 'is1t9i322su6zlf906a7muefmx6z8ep1pxgvx15v81qgkps563lhbrdzvnuos6g50hkmq3oscjmslwla8brfemk4tjcf1dxzo0i3x4dx59oksz12kzhzahwgo060va1q9vvzosqnx664el5olu06oxap99mrc3uk5spoualuxwsd8m12b0hote7cgyn8s1zewg75bnn6omxc024y2k3pl5f512yqnx124tp8yo27rlctxou2iqw5b59bnyrv0e6',
                        avatar: 'pti3670qh1i81v3v4lwpdxorvccha0lacg0801kvty1qpcb7kscge8f94i8m60itjl3soqpaqjtzx4d74e59p1trnnjh4x7ivjs6gg9tvfcb1rwmd1nfbuhspmrl3wytbclj4f1ck08q5o31ogeeshwibh8hrgfcop2uyrf3nnuz91qdvn8s9sdcha3e4dbygysylr6gkn0v9y4u1r3u21mq5cg26812ap16oavnn6agfwxcot5f461xzniqcmf',
                        mobile: '3cmdtb9mcp8uecspr6wjj8lfviox7vagp164tvtxmez5g8akbi9lwuz4y9s6',
                        langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                        username: 'bp4wnxymn2k781c0fv2018s1jmmyjgyqk91p87nyl9d86z2moib625ucilpfvaq3zxws6tyv9qgat4s990fpe3v0ws9swtstehqo9xie69b2ryvfw0lt1dt1',
                        password: '81e634m2yk96poo5085a5au4wsujksg6m1mq089imqa3jtgj9vlbzuwyanmmdu5hvgn7brh2zx9x9gl6ho9cxwpfh54o7bydnaz7jh4ikn797osg1ya89sigelv79gqge71xf1zpy00zq4nfj9pfo2euamhi8414290z4ytweezpyvr4wrawtkze94soidos8vm5upf9aldyv5t0qz2fbhybh1mm1s59r8rrc1vv2zrdm6b17x38kejqfh2vzvg',
                        rememberToken: '3y1rth1km2hvmw3j1edyvejcl5m41a863qvuoor46cjzsjgkwa7cll6dwfcyhxlvu9q16nblx0efn9l6861vwpnx3w1a3oqygkl0qmwmnugzhjnka77khhb91ycqdke6swubmtmkh2xey4sxqxrz3lyswrbs3pfl3kt729870xf7hk59ntxe7vs41lruhy3ffwtt2i1ct7xccqp4spwsniuafrh0ou8moqpzv21pt60hkwgkqvxgylnk4sr2rjd',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '75e2e347-1cf7-4c51-8c1c-bff16a867f45');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: 'c742616d-49dd-4e53-bfda-b4394d4bfcad'
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

    test(`/GraphQL iamFindUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: '5109fd03-621e-4c9b-bfcf-b240394770f9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('5109fd03-621e-4c9b-bfcf-b240394770f9');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8575b7e7-dada-483c-8e93-5b7b3f6e60db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5109fd03-621e-4c9b-bfcf-b240394770f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('5109fd03-621e-4c9b-bfcf-b240394770f9');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '753f0c24-d0cd-4b08-a1ef-055ef75c5df3',
                        accountId: '31167b3c-a526-4a02-a529-91830753dfb0',
                        name: '8njgncrk1lso115wuamed7k4jufrj1r1apbptecnzpd0byouevlsapfn79m3t45gnqnsc2pe1ml9rjtwz660ycx5wo1liaizwigmnjrtnm9jya739hsxa2ey4nvsanyb32uwfz0xbwcqvg07awg4vx9owtjy72u64ntw8avp44qmbxefukg8nltmwbf4juphde9yu9ub483omt13stdy9ytmmv7akuuqzpw7zcxk8q5npna0gf5y9w5ayfhex9g',
                        surname: 'bjvuyjdp76722kznzbnu25snrd8pvw58uthw6mkjivavqxiktyf3smy5ewebksj14zzsog3kehxiopfpuesxr9majy4cd0y7uwehza50bq5g13of4mhhs90ijoysbqtyp8nrr0r4mcwrg23w540pldsczmnqbk64tgxlsg2muiz3t6owotah74m6ym1tr4hgbfdf8n6et5fw3rr6o1l9h6ky0qkbioizwakiv5d6od11v2biels7jsnf07x7kbl',
                        avatar: '95uvs1pfbd8by0njsq7yt8iw8aab42b4x5pmzmylemnw5nshmygu5b2gf4arscho4ihyiac5vugiyqhs4hsn6bloctpmsw3fzt448zcw2bb7uazbt2zmidvn1ssh4ir3nbtvumtva7tf18jszdae8l9ytq4319w3lrkpzkvqohevbve2088jw3qenu13nu0jfuj50v0qybhm9aqmeanefxg4zylv8wk0sox5zsry5yqpzssumydnkxer1l8dtrj',
                        mobile: 'i8671a5idk1zq4q63d2rrv84f8mio7ro30vqlx0odjvhe3jdrkd11kyghy5i',
                        langId: '7a6656c6-6de3-463d-b460-f0ebfdfb6c57',
                        username: 'gnshdo3l3lwzjur4hs3p6xqzdxasxgnvkmsweyh572w6t9tdammjtov2j38aprb3d3yg8nlu663s6ewfy4e5smgavirrcc9vllf7wyu7pl6oqfthp515pg9m',
                        password: 'svjovadpc5rih5gvou1yd3bh744jgfvdjfxx9j2u9okm9nrrd9yct1pos782lq8vvgbcp5jgx5r4v5al5j6ya0um0xhygxw6sjjmnvrlwijlkbp2j4lgzsrlpjqpzp4brnv9i36lwus1ezh5ij7qziavrlp9hjup6dfpioy476nlbqa6wxj9n9ysjvm8f22xay1bnelpj5vvrnpngeq6xj8agkz2949ieodvi5ldvu8haw4ay2pzyv1cl8epwux',
                        rememberToken: 'xgzfjs57aftz3hlyjm9cklli8niaqvmo9nm57swvct9sl6q1oynt1j1466x56l0e10gqb396vkw5xjharnjf2l5cnc93jolho95668b5hgpbwvu1qsavulfgrtkt990est7vupxggzeq26dpgzg2y2l4w94mvufkred4psa9coim187cgm6252229lcx5dcolu3bpjst82yiokyod17iim93a6xk0yjtb8x5608t0eykjts6ik1l3clwnpmsgwo',
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

    test(`/GraphQL iamUpdateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5109fd03-621e-4c9b-bfcf-b240394770f9',
                        accountId: 'a8ac502f-deeb-4168-934f-3d5a038e830a',
                        name: 'afx1w9x85mzbfync00n9qct19x9bubpsiwd5n3ocausdcdbipsz4rus44rydoqzqxlsfxczup591ii1uascnac4sna80iow1rkdl675u67tklvaro53b3j6h7pxalkaz24kb54jdodfva3v1b8kq2szdjvhs7jggyenggsurd3bhe4460p4cax338rpuwr83b4lmnt02pkwjb8vf7f36v0ryax0qlsy2u638vx8364ulwrvdk5p79p7dafeldmf',
                        surname: '1qgm716j3dabbw5puwgbn243q9c792runmtip9iul0166in8zp357l5o6h5sc8vf5v1yj2w1mpb41gz7f5a4cjnuk6kpncyqji6b4xdfg1xe989cwervo5ho9j5rb94nggtmerczoa2gijrejeb49iyurpzs1rmahvf99dfw7ujlj71ymgobt9s2it9dgh8tijbvmk3ygxa6n5n974wm3e42dfu8p6op1w4e1498d8l1pw74ibm02umwdrrkr43',
                        avatar: 'yrkdo69j3qdjcem5kxbaz7eul1ijf395asy8yenht0a4gcv7sr8mid5fvig0zi4dkk0mm8frtm9qlcu2km68fu5j9rokcno73sz83cqt0ld1x4t2d9urn532m0vl3kheyrm1i20nib85i7j3r0ybif5ys6oqmgtvhf21cbpl8zjpw9p98v5pa26is4xbrrjgtkhymgwgd8p16kmtenildz5274bw9lgrqohu055s1oyds4eht22o8l6ne0u4xlj',
                        mobile: 'eud008ddwdb1z4x4g9unpiu0sgbctf0mfn5l05p7yd222uhzh5vu0ftif39x',
                        langId: '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924',
                        username: '93figrc9j9al5pgueymvlokrpa3kw2cja2ryj3f954jg0vz9a75wo4ydq8bm9b7wsiue36xfar342ag8kmri8r5xk3pc3n6zxrfl9ocup4dx3xtpx9u7gehl',
                        password: '9eo29df09gd7ws8sps2g8c5qy2mqmjqb4s86lgomoz6tjotlq0hy8edzrzimaibz28u0zvlv10x4cg0gd2me9qx4dgfhv704u1x0bjgass41xvb72rjx6vxwn2eazrw2e158de61kq2f5manh3h9vhvbgx622yhlu3vxg8omw0eh1grduqeptube3kxdln16q4zpm8silryr5ccuzdhksmf0oqmgjjn10flz1sl8i1u8sk0b91fmyyicd8t4g53',
                        rememberToken: '0tumetr3elhzwq2ydfotujtzbis2a0ero67xp74s120kxdtufc2ft1sjxeclhtrzx52d4qwmxm5vbn496rnp9gg4wfb0b9h4xkgr7ecnresioiyx9mphnz0i03wmaqxgrsxhj1jepzuw31nlbkodvbb0b9gpldtt7t0howmqf4ma1d91b7s9beqqaqwgncxqjb6p0wxtgedji6nwztpelx0ge4ghsq8c1yz0z5uga9asu9ckvb3ose45mbfuo88',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('5109fd03-621e-4c9b-bfcf-b240394770f9');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07bfbd92-12f7-45a5-8884-c062ccc866c5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5109fd03-621e-4c9b-bfcf-b240394770f9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('5109fd03-621e-4c9b-bfcf-b240394770f9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});