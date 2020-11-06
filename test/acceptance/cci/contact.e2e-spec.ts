import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST cci/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'qlc8nv70msp3gr7i4vtb0irek6au38oezaxvtfkdriwxv3sxiw',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'n2mewm3jehjzl7sqjhto',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'ikns9w708nsnowihbboymjiq0qxfxqm00kvjiwnygz6if53mwf5txszx0njuany5kylecmtc1auu6xov3izfbsw6lexk6b0g5e4mr4f902x9858duprk1idkaez373wljrhzk4ehf2o1bfzz96ewntpjagt864qktezjjjzyficd166hs13v5w0kfu9fehwo0njpeecjbe6ee3zykk6u5wegsvm14z624vmmdvftctpwus8xzy6bq726llk8v0d',
                name: '7hx3tbd291wj5zo8q073zjw5qy05gatd7waxq9dhd621aac86v1ndube9dwz897x5l14u9etiag4df7qpmas4bhaexb95h62s590p8euv8lveetb7fyclckyfm4ehbd39l10d2f48n4q1gj31bez1odrsyvzdv54mif5jalvh4pjatlka0uvn0pw5mjx4jkc82yz3nj8pouobgcr8d3ak0oxfao7483r8wxp22e0gx388ek4exbhs43f0alk4au',
                surname: 'dhlqkru96as2j519pw3anb6wz9127rdc8l6sd5otq537m1wfrmu8ezjztywa66x1csezrojjueftsfvfx99tnrcxxkr5t6rolt169hitcldjuare006ba5v0epfcoz4i1xxasof5miy961kc2akyhtj0auby94xxv6p7hhvg6zro9chntrgkv7tgnql809ofn16h4fxind83m3ph9pxjr11u0dsghi81h9134s4382dv9yi76istzu762al8gb4',
                email: '7lofw66f9lliinclx1cl8iq8oc8uxfbivv0e1m4j3zju0engmqm8gmarwu87a3laxh644r8rrstdhaohc83wkbmi4pz9tz9gz54uvvdhjernwfhewubd6vcr',
                mobile: 'jus2i1rchpt3d4yzz5w3ildk495nh4n55jy68nb22rb0ot2oi6a1imkjnihp',
                area: '4p6q6ct0zeoy1mj97lxver51kzcblvjxw4656yassekejc5sh78cmsi8jwqpxqcv4lm9xm41iis9m4jtjvv2vay6z0ldj373s6vmkaw3zdf4wyfvg4n1wffn3djxh6ofmou5w4ljgqk4ylu66i5vqse9ojf85aj37v9t2532l690g4s0tmxbobxckjv932wifpxt42mgh92wjyydtxirn4p29tzmkh1jba9wwuz4o56k9dxvv4vw26atc09lq5c',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'x92lnj8kc0iy5x5t9yyeptvv2sljzf6tab6arxe43x1h1l1pdc',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'yuc2p4kjwiwbml1nznfa',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'qsemq1wx408jknbsg0pi2znxxazg71hzjjyy3yf9rhl4b8zo3kcxvx504inm4wpgm8dyv9zo7b2sueaihjugu2si0tcdgkqhkf5cnu7ph1doulywf6v8se4qn1lb8vzuvx0esl0t33w232kxx9mgoad8v3dom9bo8w4xfev0gbdh7axhh4sd4wkchwj1u5n7ifko9hjrf9mff53fl89c87zrn2pxl6jhspxgzfgitzm1h2nsz7ry7hj8k84exr4',
                name: 'jdsu58gi61b6ll55yn2wv1f963fpeuyb83z4zo511ljgrsxf11nzbru0d0688hmnlz74le5ic0sv8stn9b8kc7xcx96b3el7wu346ddhcb3l1jxab4v023oxerc8371mxuhs1tmnn636mkow8y9f52n5xgmbbiun4cr50qbtzd2jdph444f3cpeovw2qf2k0t4nlxohyyjiuujh3psaz9ympp2s9j4xdws9ffsakdsopok2kbp0xt5yay3tobeq',
                surname: 'k73vnhqfmg3x293t986gns6gg0zeaka0hylxcoeroha9klirwonkjlenk46yzkpk7t7ii7l2p5kjhia528v6fgfp1oyxblvj2ymvtit80bv8qppv2a2rdotam0t3tj4w3gg2atnv8nquibbt4ud7aufevjy8ylszlveshwgvf1kaj2tzmm9jffd2q01p8vqlld4hdp4cmm2odzj08caul2nlqfohxzznbxal2r9ofw0zf2xsuibqfkbwvknl5v6',
                email: '9qtnms3iq1nid7lor27rnbjbuzs5k4q8akitou1z1soiwjty508whdlvptwpskco48664d0877mn5xwwmwkgh5xd3u0kk5288jxsuprpuaqu2ga1ltrnfgck',
                mobile: 'lsftok732zlfqpnk6yesxvtcka93wma0cj2q1oh4igj2ig8ulg2i0qtl4ep0',
                area: 'n76spox2e7y7mtjbo2h41pon5k9ok64zgwqkgvokspjxcvhgh7qq9re7izybnozsamgjfgzh0ers6u02wrt99q9h5b4e65uuawfrbadt7kf2fif0mkyv1r18oxj3s464uzthayfjrh5lbq4nfo69ycqtke3ovlvodqe8kd1ul3bxkkwx6powh78czo8x8uxgkwab62l1fihsskkh4j24fuw5fblazybjxryz9628p1v75aymvtz5r5y1mw0qc1p',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: null,
                tenantCode: 'txs6pz2b2p0cbhnwzg551ua87rzyrr6ijnx1r37331eyrcqcas',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '4slqg8efb7tz2gmdd3kc',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'mo061fnn9kw3lu3e2lqm8tfc9r6otwkbyp90220rsil6hrzx0qlyqqxtl2ws0tanjn0wmpcfq13lekh92qzndm0amgfkqdpzt3x28z1i0oygcfwzx1rg5q23g7gs2us4oqwhwyij9ezdupwcxxtfswwwak8swc1fuqiem8cdlbim7caj1u62xxg8yuz10uraf8p9ohwztchyzeolbkq20isp3degeuvekfqc994l2biwzb7oe6z9nwsj69ucqt9',
                name: 'pi53k1d4kwh1kpzkkwex9eh14rw5xyvmupowae1l2waeorommxce7zl7jcbr0e8nti3cbzuhma7vcwb4hdyzebaqudcdqywwn8z1urvcasecwl82lxtqn55k47fjq6lnt0gtfb4k1s7ygkrmphweqmsf54kw1w47mcfkwi75vzosyvsn23o5seiipe2pnhnumxjl880q4iszpcaiuni3sw781srjvdaww3bgta5jouw2ud8xygc0g290jziixv7',
                surname: '2c0vah7e8rk93uvcqe8qhovf9t6wimbyjjb4lfw259qhj2506se3zp6iza9xh32vbxezft54qcd8oo6llfzlvxvfujjiowpgp57uh0qhmn1yj44r7xlzko79fn65udicbmuw6qid0xzr9lf02w5tzqlci0hbg2ojgaju0r5jreo3xftlpie5jofnat2q262m4g50q0dh4st9fyjtkfbs2rsa3jd3og2ad2vf3iknh1eoddd2gtgd9mluyy7rwcp',
                email: 'mlvoj85t73x2ame23ab3d20x6cdwyvuqopeamog3i5majdkj6s465v23r924ul9d1b7etpz9nsx9pkdhrwg4maam6k8zfmokpailhsq7biyg9s410vj6s72h',
                mobile: 'jnsium6yfthj04syz3492wzy4b1qjlraodxsgbiz2njgamu5wuqdxanl6m08',
                area: 'tyo8qysylmf30fha12yw6fcg66hdamc79o803ggfc61g2w9skug51d8mi0svhlgoaf5v277v6ag2fvji2bqbixuhq3doe5xhfkhhe1nwzikg4k88o2roolntaq5a53405g6ayvylxqf5sg0ae01gcikike5950o60ebzh9yijlg0t7zcg83dfk4plvhqkzlb2i4swvwuci5cz5vpr1t592rj52mo754gfrzuri03pibs4xzgh6dz3bg0855qttf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                
                tenantCode: 'h1ds5mawbxvjd21yxoowblyj0xarg386crmcvrhdiegrv2flpk',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'a8ndzca36lnfmp8trwub',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '9jy3rw22zghnmztbt8toya9saqn2ldonirzshn62gqohblg53urip07stn6kakjcvolg2e1aayvulh00hs6hlb5f2v1tj2ea1te9ndtn8k3a6uirjg5lsjl9w5ptxb3yhswumoksuirkbrk8d85lru9egqotp17uzd6rhlaz1m017m2xgaec0mxwe7kgwmjppw4tt6eablydzafyq5bruq56d3gkivdfwhygbs8n2xphiu0k2wes6mx0bahk8d2',
                name: '85nktdk5uqdviluh302zv858xiew7zgat5cqlfiqll3m0zbddluqdhofg1sfseaifaahxlyalty08hgatjkqnkmxppjkt1dxuif3rog9wns6m73ftkse0y6wwnp3ecwz9fgfijcwcs1gb10yb0b5smgsy7mfhr5odj53pliegsjkotl1asim4hbdnyo9bjbpvrgbm1i1jgllbxdpzyc1vlwivzd7gj19wydoc79h7wt4zw6grgs9ocjcs3v4tqc',
                surname: 'qbo17e4p0s2sf2l5jrcgowp4evexi5b109r7cvua4xumculv1bl0k618uoihxjszgbu10jgjf3u162chwbuqr1zf1u9k28o97g57g88nzwro1zf7sp853hhz8uw8f60mlbd1iq4u0i5ez71ykmygslfyzbhvmipaov7y01d8oa0yw8n66fb9zaxr7d6m14kwszqt9e5fcx9y3vx6qdcxwpllxc0mi42ebb5bng1tg6tpbtavda8uyzyhxo2c3yd',
                email: 'sma9nc5p036mowkps56tgc8ah68rn7543tapf8cvgkvuqgjuvd4kqd1lxhhw643mv9m1p2e55300coapba5wd9mihfik6xr5hojzgafxk2wr84tyxb8ek1pq',
                mobile: '7jezklvcsnoxj9ys2vt8a7ozyoxxpxy4psummzb69pzbcp0q15m12ykdqz77',
                area: 'vrxti69mhjpacvy4ary4emgw35jd1il18lmsvvx472jgfec19u63e3l90staj02wrq0qcabixz35ofi6jq1oix20thv396ggipi8p020vyb5t5e7j3215b7jthuo4etlt6ejce92ya4058igg5v5uw0diq7z4ajwlao92ntonwhmypucxyzebmlghwr03e3jb97ini7lgpcybv72whegwh27lja3snv3qgvn8rv9wigm13udlvcki4g1afs6tcp',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: null,
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'l1y5w8gj7bmifteaqkec',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'udkxf5m8t6i4m7khr8srenel3uie3w5munp0crmvzokk00j5j9g4c2khrkrk7rwh1lqqe3r2cye9cp02hzrjakjyc2djfqxflsfsme146yuer2zvzo45qng78et92bgkub0u3hsz7rio6k5vsylsodizfikecaltj45ntvhq09f6eiwd7wi328el0jihn8ng3sw9ma23arrseqawrl641ebx15nk02lqhsfkolyv42xe6buox5kkt33330h50x1',
                name: 'b7fs8vxcdemgy42jrygbvruhdjxapzxk5ogymidnb3rhz0tm2umdrh9aefyb6drwjqd5zn4y0sj6e1svnalxh9scoy4b5oxmgrli67z34qt0mlqz7nnz9y4cggvmhbn5j1ac697lpj7x0997j77tzlmy7h4g62c2wbv7hlhfkjunie20iq3423szmkkjckzsmi683kfwvnyp2k36kh1qukgehit3q0vbh3uhfzj0jd478c4s421wvl2o6mw2q70',
                surname: 'faf9kv8vhtrr7oeai4m09z11u1q5r62ipp2rq7erzztn6umki0pgd7f7t3u7j7t15trxx9sf0eoaq9xotqlqih4ai98s7zb66fyj8hoibp0xgmokh0elg0oqb58wa0kee8c2q4vu7cfg1zp5mpezu1y19yxzjfaxcs70rvng5lewjoqdix4acnikuqlkohbg0eehbwqmlepjvrljr71f5uopv4sbe6y43qzanh2x80jeqkq4l62t9f0znl5uhq4',
                email: 'jsa0skftw05fvjn01usexwq0zsueosbvpq2xdqennv2vb2v8gxheaa4s5s9u3a1d2ockh1ns8apouzxj4agroyfkb8scfwsnhijxmn4er1ho8bl4x8t6x1rj',
                mobile: 'm2e3rgejooqyl9o5nhghrd2cl9fvbx0maony86xz7n8rm5o9tyhwmzthooh9',
                area: 'pm7d26yzdtcn892v8grt4d9vvix4c8ocplnkmevutvcgyaumtuk0kvwgpf8zlu0fgcq3ow967l2htwkq7oan9qutqg64kvtgiq7e5njyppxzph2u49swdza0dqi75dmi0z43hq4j7f3a2v9282ofn4a6lemgbrsixq7g9t968ve5cet9e6uhlspg37i37e2novewb007jeji1u23zc63pywf0qoesuy9c15a5jxs79b5rauk9lw9i3i60nt26pa',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'k1qjmp8xqec0tgyy2q9f',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '8np6voqza76fv4g5t8jr84jvsnf80osf6bgpkp1asr90v2b4tkhkc29pjtw69dv32vrut9hdxuldnip7940gsrv6yb8rxw9nhq4s9a380dsoxtnhs0r3nxmouxgk5etf9pedwweyio4kvw92uglhsyqihwhjwvs6peoo8gi7iyqox2f50tcycm09wjevtzdj5x23xnnat1hlthnlzuh7sst3x8lxnqp33kb4lu7zjvatx1vl5akrqdflqiq5pzj',
                name: '83ck0ens48zf18yy93z5145p6rwnsb8o4li4s3wjt2ayxicbb74ae5isbzvz4dxw2psc5iwbu33qsg4mg7jjeuyvho82rs6ilwrfngsdjghsfmrbaywm6lcku92c90rc94ysu2t1c17i98s9a1x23rf7c9ehrvqx4lfkh3xvlw1i0hr2ljjwejyhg664p3jald10da20dnhgc97o4k2mdupq0m6q6bbtnv2fdwvyefkw8xsll31jkqywhr78ir1',
                surname: 's7moefj4u7ec9b4cy500qnlnaz45lzwtczsf7rs9nz3ht86m6m3ttjj3m7nfke2xmc0aamci6ie1v2r0b1s1okb31tb171zscc1nyee133lt87l9s75gzkh5d7dosiyjl0kxcio9es1jdwad9n1td47ui09ej6r8kj4i5zfb08j429to43tsvnwxi1x8gulghabg5wgha5kms63t9sjqsoz2rtahbkee94xzwhv8ptk5yrnkxooj5lbitfzdvai',
                email: '7pfe39zn88ma3psjmuo2me0c659hxxi0mclt4v4o1dqmubkgzb4j7pr3ih26r7gzg5impraufvrxc6ys6nuky78iysdonxm2qvyuvkvehc3xdqpo2kcxa2eo',
                mobile: 'fslnvptemn3rg13ts3z513m90agdfagh101afej2z3qcnikbbjv8jr3aaffv',
                area: 'syxz3edskz26u115db4yrh7c94cimcrx7mndimr95jov37j99nfd7fzbabhfejvadjedsig4ephnz5eywcjpnrcvowg98o5kk6olkq19s5pk637y11i3eg6ziq8jf73vnvy10hmpfmkevble9uwwptq5qacrmvnv3umhmbwxavbol31cbet3u1l5lquleliam046ck3rfbo2exrj2tlfqt2zlvzm6hq9c8ntvl3q3j10eamhlx46lt61uzbdhbe',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '1kjz9jem2stu4lbbmx6by4r4ip2vonrnjmju6pgj9grflofj9z',
                systemId: null,
                systemName: 'o6a58ecc76pxralvxfck',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'nwoi6buekp50rojfrm1fxe2n5b4dmkx7ejnb3s1jpub65me6je036keh5w3np2ciyq1bs6l8st0021l3qcex8tfgp2frvghq14p2zn05wqxhbqh7b6x79esh9609ltheqbp8t8mckfefyfnlg6sh2nbpr7u0vzm6as7g4by6rku5d9wmjmiwj8na4aa6omplpjrqxqbdsfxu15axl04tu4a2dukvdze6nidzxb0cxp4cmogj22bv7dnou6asja8',
                name: 'v2rg17o3ovwqi8ec9uiuka8du9a1jhkzk7r4uec8iva0la8af8vowlxrqibjqmarlkdqxwlq65mydi903jc8z9qneul4nip2gigfoyajbt4i318aswcqh79mc8qbcnbd03bawp7dpz7cg98u6eiv7l7rdoltnc3mda8mr1fl5m1owsg0g1ts0cm3mqjoss4pl7lrvbr4dqo6ukca2lb3kc18uhstt0rxpwveeokzdt7hk7563vqcqap9j548r6d',
                surname: 'z4qfsmus37vk7fyqarh0xr16wg8eccvd4cgwja231pju752dw4el6fzl6s4lgouvm3v4leci0eewnf0wybc8vjdvxk6fac8efvw3f20760nceisald1zv2hthje00i7ilhq2m7a7bvyny7w0dy7628j4bd8gga8sy7hsz0g4e4wc4ktmfw3w8rl0ml038rfygkdg2jh2szjxzxp3alezplnd0cdc8mvkd61ngcezuw3o8jzlsrmvwhdveiynrfa',
                email: 'ebkkff5ongel4f2tdp61j6shq1eqsvnl5wq35lyqnovn9wsshyf4igrhbqsh407nlfobthjp6kowkpdqgsb3h8ka69nhjhxuuhu7rd1hweif16jcaduraoyc',
                mobile: 'p9gjwdl4thkms34sx5lejtn5o1gbcnqcr1o3u7z2wr68ai7rmylwkjfqk6by',
                area: '49so3kc02t0xdz1h8xwhb8gzceqorcin3r25hucthbuzy2q4ups995exlh20sj8b5ysz22h15g8myaadkbwdo9f9eamqxaq5y2duteqjfjyy3sghnhhlxricpo7f1wysd2zu023g1d8b9el39l2rftfqxtgejmqbyvb54i0pre83c8nx9bvg7qc41q3ysqpdpzvv6n37wi6ry9pcgieqe2j5st3iv7zkghyci3bry4c771aj8f87ivb5zxmx6ug',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'n99gityymux8i9kbwm6t3bvk92uvkshnozq7ievo6wzuvcfz44',
                
                systemName: 'ulzm8d946lifhz6xryfn',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'g9e2hk2vvv2rudq6t1373vjkwg5vpir5yxssiswgcou1ayyooxw0enifx31x1bjuu73g0x2f8vubsyd1x1ywk9kbxru1sasb44tqxroh4tvr74kr1lg8whz2x69lfdlektupa5xavgsfb9dcqlc6ixe1tuc7j3jmsx9194dtd29qh40jpdu84yq0jq5jseucxb6hnwqrdl75l4k2sjzeus6uts9dspgt50pypl5cafet3oyrmqgjwnju2k8ebjq',
                name: 'c7y8v3c3fyv6dr72xxpgl5sz57vftwrnfx95gee0p9bq12eyoq6yy5ahul48eteig6qygvran7ke38khux9t692eacg4ayb93cby4fzxf2k08nv9fjl32oqwhdyad5hl922f9sw9yxsx233g0p3yckekuppgslum2eki24houdfdyk5e666fn39ekz536arh4ufpjeu49j352p5zrigi777jzr6j7tw0y8dt1iyev7zy82pxz09zv0rcsv388bu',
                surname: '287bdbuyuvzx0m3aah8agot5rwhrg8s9jpo5io6u9ut98uc2ssz3bo8eb5al037wz86fzzazqie1tcd3eihkowk3yf8fpz96e6bb0d02gmwmikjn64u4b4vrh26yb7ybv6rl72nhivb8xgqbwh9bpt4vbcy7k1xom7kh0w49tw7fzj63lnicehilxfqcxgro6brszkpw6a60b7hmx49zn3y4y3yzkyhu892yz1jmy9wv8pr9r3ujf9suxv9s27v',
                email: 's70epub147ud7stw2xmwxpipvl9gv0nwem2kg9qp438af0aeaqo88ybsvz2lxtuq6784lm00evcquhfr9sgwhh3utizeiqgidobx3zl5ufu6eoj9cpqp3l8n',
                mobile: 'nxwephyj1r2hblay98z8ylsbristaziuv4hf85fellr6abrmd4kc5ssxkdcg',
                area: 'c3g3mc48ztmhvocjhzqlw0nivo5g4pzlv18xrlssp5hm8qc5a6odst2i58ns9rtet1i9sfs0kzs7s5x5k5qe0d34y65wp7ofxpsakuzieciholi23sfazl2ic34rhtaozhy8g9mson11237vyvtrl1qm5ddm7gzjzm28j05620hw7utgmx6h5exh2s3xuie3p144w7acgdeem626ee5n1rquw3vjbyv87ucduqwi8q0jogd9xk3wiwq8gbbz23r',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'em2ggvvzc5lcyd5im2z5ounekj139rrgynyk1h0mpxto8l1si4',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: null,
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '893kisw3agiz69tf82fkvo5r560gp2462etozx2sh313vbrslnqc6kydmjg938buhy1s7opfjmszgwo4o0c8js7pagaelxdpg9msg6f38qf62b5hjfceypum386zo20umikn6swsmuobxs3z8p79t1mzb9x7origopfna76z4ikj2j7tqn38fhrzy6ipxc1lwn9a8a2d1okho0lznomlk1uaunxbz4qpsckh4f2da6e077qx56eq19jqzw5gmuz',
                name: 'ezq8gi8ndlvlg7g9fouciwy9a4ucdvjzherr2hsb11bmexhxqqwpahlzh1ux75xrboki0neerdj7lcg45zwqvmdde5c5k7bzvxbswzeopt6964s5k0jw7ovww289eka5owkym9sbrt0a8co6kc4vyf8mfr5qlv5wm362duww8wf2pf1c35qg4n3d6slfiluyyp7cses74fk8d9i2imskgwyqi2v41dri5pwmpfbq7saaskw8w9cjonc7f40oo1m',
                surname: 'iqo4aaun4igb4kbz8869x3c69nmub4zqi9w95wjdpcbehijm4j74ayqqd9q0woqf78ouh6cpieak7j3iqd20fku0hgu6cxvvn44356qvyzseizlhe4lrgv4nia9ryz6uwawwqfjezlszrgd54g813y5fmv3g4fxysozjjrlgl3odo2oi5fhpa4oa0vtdbndx0zn5cs27rthlad18rgnsobbj80jmszkjtaj0fvilou6fekxpl3e6yfxyfd39dhr',
                email: '0rmly90cb9w208xoe96hy7e7hgb4co5x4kamgzty378wiybrlsfda0ht8hwofhu1b75nleuugdjzbnv97np7ufm32czuuvfcp36jg9d77kuwwwbo3srxjphm',
                mobile: '5hqp8n75ly26v4vlc5g3ctc3s2c9kn02hl9jcfxdg1obigx19fugwpo25h9e',
                area: '32hdd63vq4gd9i6ewww0aftjkqk41hhept5k3rp000uvh1mf4z4v1yed4ogsmmk9walvm1xidyfsuyemsenqnym1r38rbmq7v3ldjve4vdlhtrwnfdlyra97oj0ybym1tv1mkumerlzzc9finj9cuongnginme726tswhhrikgpp7p4l4lxgwqe0cqha1urqdtxt8cbrb7jp9t5sot8yzopxdxvvuhama0janshgjon98fv32ms3fs8nf6ms8pj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'sqctj0wpsmojgxb9osh4omo95vs2g56is2mjim1m1mnhxu89b3',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'sue33of4gl3222v74vq1sgmyekthz0kwv9d7mnj2nrk81uh5nu6h0ey5hzkl9szbnf2fh0uxt4zkxgi12ny8iiulrxc5xzbnq250xmkiv0ztpkt6gyvtsl3mq6qvy5pk0i1nap2c3ekx5gkw0t587feis1b8demusqm1qjlnzcc2kiep4myefg9qwano5s671fnmg5l95a2ullp0rhmivcypoya7hnsxbas7quv6thil09om5u621sax8jkpolq',
                name: 'nuah1ppvj18qsl81p5i62giixyyjauf3esgp4x3ncvh9i2njtgyk42fd0njmiic3c4gsr2g1z7wo8kgohn2bx64dljgf3ae8cwyidfbyxh8xixzt09cl01uh68vmep50fvdia7fy5y15uou6zvoz76ebnl1fzm7bitxt1m11dcwhw4fkd1f19o1bmu1fxkywbh6y1iea28dxjpd1n18q1emm1jjl57108wi52ium2dcpx28149oe2m5tgtglqv3',
                surname: '6zf2haex7y7hta06tcvyfoktp6bldt94bi4dkh4iikr4g3ytc1c3dtjjzz8928iribcar10yr80c56fyk4b3ump8npvyarr38kp7025vcpgq9lodpp4d56x533apmke8saqspyrk9x0ars03sj78g83s9frei2ksgp5vy8ig3jlkcn31sbi1vdt6956qnjopptlwhemsc5bvm398s3l6j26jc7qx3w2ff3jeum1z4mekn10ofyeszvjls2vbqjd',
                email: 'x4f0gn5d1ez1h2qj63jig9lxzepr8r7z1j63ouboh0rbl1mtcuxo3r8fle352afcwebgh7g4qc6joqydjgi4gjadit7ei0lbr69j2khsit8r0g4wpw6eaopw',
                mobile: 'jb7mbzxr9r14q8xtmm3v09ozl8mzb9q7i21rieyf0meus5b54qwzbmene5qb',
                area: 'uj2r5hna0122w10imtawd3l6irkulw6o3g2acczks4um52nmppxshkzpbwptsr7ha5ltj0hpxfqhyann6pe6p5nrwfmfqmb9qxxrwhvpwes27mjhyqxxwuubipkow8i1kslbodlc425ep7vcqj5pvwywwq88jhpsivi1vplx4iinx9d9dyxlkxnmy2aede3mnilfraezcy8y43fctjs70f7zecabi1xxbmxs68r2zjrb2f922nbs3hwmpfwxabz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '1lm56padflo12xe3tud4rp5kubxzot1m4obtgh8ez86vnn8yg1',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '0ahrkedew9hjlmwop52p',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'jgww6xhg8zll9id48bs8yt83po7jnq0xu6a7u4yyljc6y1tyvhdwlctmg4anbsftvlyvxjl9dq7rh8usqt4ejork5obkmaf0s3vkasilpaejn1z6nzzt0x550bb4wqyqxjii1z1pw261pprie1wwx8gsh16gd4yk8aldqvr8jdz1o79jzec5n2ci5xux3r6xfjjfkd3ylzo69ttx4rns0f71z1vwz2ne3txhhqcimfpjkrkg28tuv94f6m70qpq',
                name: null,
                surname: 'bv5g09cy9ec8voh6rzxneywcf8fnd35lqczcrvwv4t30121r8j7kl51mt5vzimo9cxpc4yo3zfybhpbkms55sadgbataye0yoxt505lu8nhta8fvbi81rmnzx2qgoreelbbpnagtx4jkm3k8vlbuy95srhid5a96k1b4s69ukhzeu56quh2ut6sr2yengxn22mxtgxxhredu0qbwpvjsxeucfjnn4ncxcy021anks3ie25uqwkvabyr40s33q0l',
                email: '4mgyo4snefw1pydnn3fnkbvgme01djdgoii552d1yj5yj9hq55bbzd41qo36egdqnsj67qrb3z45hpwx9yauiiceixsauqaxz29ag2ppf7z3x6nafwdl063f',
                mobile: '466w1xmltnlb63s0xj07cdt0pkaupdysq5hivh9ct5asc4ijkzaadhxr6un3',
                area: '425w8fd31y7if819wr9kwn0v6ax8hkb7obwbb09yig6ss70gdy119vpdggevwog92y52i238zjygj2xwztu23uchaefu858bwehaesv7l8b84ubop9fzpdl35ed7x4uz79mcjgp3bs6up5ckiidpbd5ixmiitfkxia5blgcij2ls6bv5fjratkm7yoc7hf5tc0wr90hwrl1q1cjpohmnketouq3y8xbq65nuuee1hsjj5yu2xrdxybakchynjyj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'qd7k8u478oy1v2brp7t2cwo2k89up4xwfd868pr1y793j4imr2',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '5ll5iq1b8fb65ieg97be',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '6bxrvv6ul9rrxz7joefakp3icr4mc76hx67k8swp5pkgqpwfwzcl286ah10ffum8cfrzxrjvqfa947aj5m3ub3nvymduatx2fxaiin2nfy7v9vole1h1e2o81joetec7s07kb490j3dvbq9wxxum0jt8t98ogqvk75xz8p1dyytwqjhuqw3llqh8mk8azzg4dfdfyks0dmo7fps9ghnxgfd2176xclnz50ak5zbr8gg7zoienz47v7rt1i2ylpb',
                
                surname: 'm18d3aba26ax24aut34gq75aavxchkxe0peapq6cw19j7wec6egooe78lmz9nlnda6hvpgjpx8cgwyjosbwuxl7y6knszlk4x2ehqeja8vtjtfpp1nldfrwgdcofpfkh6uak219su2ho3ak32yju59epsohtfmsip88dws5mswhkw9zvwugg8uqwhc6bbz09i7gmtdyge58ddos7k73d2872wb7i6vokz8qgac0767thlob6xl78iqi2ome7u3h',
                email: 'c1ixmdi48xhpgi3ynr20go8zc4lzrqld5zzo8p95sigq1wpogou3y2w3z9fg0qy9tvhv1cwiohuht5a8ofq2oqdz0teznryl0nshid1qaxapek0avmujmlv4',
                mobile: 'ncbua84p2bdzk9klqpgtrf36je8xtx7ybzgnqrjdjegi5pxgqczd8e9516oz',
                area: 'oyg5a78r2tgf7ag9w2j4440xtrw5o59j8mnko1mkeaax2eiz2zc7nci5uky15tp7tic15oghc2q9vwn9s21vlwetnug9qnx3klv2wef39hxwgew7ompyuc5pwaxz9ejrbl5qg7u492j0skt5vbwgfptcj9mvgw9ingnebgpp49aipd445d7kqfy8jkozo507azk52c7pszj3yy7i8zz2ky6u3j9srnzjqu28sztiilur1m2w0dsk3lsllnas1nk',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '81ei7ase2hanyvsfzokrucd388zn2etrch7zk15cpm8nwtng9i',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '8bnrfof6wnqcvtozu8e9',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'sduqghiwcl8mvyrazcdep6eh3ay3ameicfti2p78vxryj3nx2lx2cxxoyba1hg6z5ybb1tyx4adners9majywwbyn98d28u5e2e78bqt04crai62o8rz3ow4g379qez0chd8kkubsk5stxvvlj2lr7xx62d4qqj1kewwjygdk0hczfk1ypj870g3qa4inn93x9j80gflskt2t2r9s68euz9zi511xcrt5rf8fkjnmi4qni7xq5eu5vjzu6k7rap',
                name: '8vteeeloe2ub3v983181z00tfqwd6ygu6gvip3lfcovm3zg9bjdj9exleylhyqacxyiqpjxs4a9jpdaqzacjh0mhhx23iee42d1nqrn5saq1lobltwv5mdu8bjk3436db5lpwhjotk4lvhikqoowmbto8gnydnd5mqiar9swrrp8jbho0jm4kt1q234p4s3tovxj7jbpv57aui8tjtj2xzxisv1aer60p5lxef68kma3g6cfapsrso3ggqg7g46',
                surname: 'x1tp5fp6i2949a2k624a9s74rxko2axy25x8c0x6ld0xrvah1cm5jq1vw4ly6shtg8q04zojvrc537mh12qg4vh4jl1lvo2vkbzb4wf76rh3aoob63oy4gqdsk6js6zf7eqjpo9fut0lo8xgmw44m5wxol4ans4ejpqjuegz69dvcs0vulcx0eh68cvdv8jut9nli1mre4s3yq1ehk8o54o5g016wtktun0fntwrpa2v9y876jzjs3t3loz2my5',
                email: null,
                mobile: 'wuu6pei253ee5p7o26gnnsmuc4e3uj5a4r6ie1ovcp6rlu1n2fgl0kj9yf75',
                area: 'c180teqgswmo42s6sh0kecm92h5u9tvvmyv1t036hnryccuyvr3fdisn9xgmfzpfk7xvjcqn89neu78xzsc9xf69hwj05csrogo4uxl8ldc1r2nlijv1y75h8zjhuz0nxm3ujxenbit5gbtczdrsu0t5o7kdnnh8qmv3ascce5mof8d1nez3ztmi9vqg9eec3xy7apnaqeq4n49vg7jxohxde3bstvmj9lce06n8mj3mgui6o6vl9ukvqngonao',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'r43izwfjc3ghqdx1mzi0kqk8j24yk2dzmiehjk44fnfhqtax2d',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'qljo1off1jyy31okdu9r',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'sj4pt98s5fh9c4fvp4q5t3ovsdbzlk7kopmqse8wyz71f5o49o8k9v0r1nu4jfpdm8zqqtxh51kqh2cysdbs47etvd11ti3dswjd9cfdksx0d3kl03f68bz8mz47i7njbdrnlmt6oe5ly77xqzwutwssro4q9izakhmktcs82giohlij3oqdac6fbai8qqx2x4ktpg79t6syrrtbs03rqb1poa230emay6yurtof2r1qyixb50vak4tyihz17fy',
                name: '9cqh9xh4dpuo8rjh9xfiqrlcla2n0gp677o0evil8iirxvmru3fichfbzezzj3lehsnmdac1fm2kyft4d1qslfvoliqezopo80gmyc6p4rtpe4arxyt4ruc1gwo9niiv76tfzftl1l3232ffnt8l4a6oj159qxrx1i3tw5xma2x3rzocwobcde0v2wa24m3780s4cumtfhdt3i0fqrfzr8r2enu3shd7lwghkllxnv13j6jqjz91nn6lopk1efr',
                surname: 'etd8c7nxrnn8kjdjoy7x6n8xc58xba76ze87j8y3lrjcksutnyoe0u9xw4uy2vju8tim0n670gbx9yp61h0u9buqquh5b0bpcxcqtojgzmbvtkzyktrta6owjb6r05dfl65psr2d16d69uu8gxps8apbwnujx76d44i8p1rnkm5ls5n2csdm4mmjyuom97zwgzbi1fc9j06tmbuci1o1ryjryppxv7wgptcqzqf9ijfwui8i81v88ifx4jdikan',
                
                mobile: 'xmuc58aetcdmkdol232w18zm4ldk51u3hkaxnvh34n3dyykwpleo1f4yooko',
                area: 'ibql7zxe3xk7tw8ag7a5a460bgbtm2c3dbwlxascylvqtrgwkf555qdxqiav4wa4f752ew013c12kgcrzagvlnymjnx7dmduplbid3wipzj9dtnisl6lil1fe3vhfhxhbbuynmqboexlksq6u79890cuju4j6azqxyhjesnwfds6tervxpgu4l29p3vz8i1d0w9d2djpucld59or73hh0m8a3d3g7e7jnfqth0w1h18z1bis8bo2yq41zak131f',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'bpzawrk7v8cqoc8pdxoufh2bithhkjzzwuwr7yj1pkaaarq6tb',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'dt0qvh01gr5g1qsuwmm0',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'r92shkv88xvxkf0uxoz3grh467xi2uxvsu3zya5pqo4g8sl4ppskna24ys971kjr65n260foy0v2c7vzvab9hy26tnig3qhml7e4eg43zxuit7iyqwai10y1nhan63bw11mvkr5yg4luzvge8rs2cub09mqtcvrbz3qga4ntk3miphnj6f8gkuj2y600rbog9juxf8orfi8ql8dmv7v18m87csxvyh526hurbwwuv4ark2bw50ab4h97dztidra',
                name: 'p5ai6zan1lhtonn6vp872ws8rkgozeofdc153ur2zmd2lhsgntl55nmk5hsxzs2xf2i89589mg9jaiy3e0i1f1cuspmbkulva3a9n0wapmyu0f54utq5or15zmm15fmqk7qbj3z89fqa8oo7y3zl6lqzqcx97jkv7bwc0z0vj21gnumsvom7inn46xvdjode4ucl6j25f926vvc8i18lndi73qljig73ozixjczfslkgrik5ofdpiuzntgs8rz9',
                surname: '6gmbi7pbdxt3jqzdmhgg1e0e4n6c66zf4bh5m0g4y5178iug3g8xf1oxrb3bwzx5y0vkmsusvyh2xh8jl30x2kgejv2wmbg05b3q2u36zg4is0i3vi5uaqtxono9nurv7uxfpcxjwqotzidbybv3lu8t854joyxwqt506ab8fd3rh41rkecnf2chsl05g9zj3sx4a1pan8qoasggpcmk8zlpl3trux6iw6mrrefcbvl80to1iy96y2h4u67wgeo',
                email: '44h8apszysi94sorvr8zfizcehef48ollu5cplb0cvy2rxqeqo6y0kdlgzb05s1krqffsw5d1jhp7czy5b7lodt8vkro6mqk6kzblbicy68jspi3v3zlfcsr',
                mobile: '1ov2h1init5of9nszna0q47y7dj9296n7j1waflbzddhlj5paly2svq3uods',
                area: 'kkflsrb57evpimp58qizgdl9rmjxld9eymop9ueli94nsyzk7nbq8ypc4qwx9840zbl2y8rw9spp8wwox05o7ca1d23ioi200ncmss866ksa7fatijgm4i7c0nycz9e33xjyf7t1fdv7jp42df8jfqb4rzhzox4zv7csg1rxzlll7w25nw95jcd0x9zw5s0z69q9nuog3m1wu4i73fzak4v2ipjte226y9q8xo38njj8rmx24czjgjt7gkc3h4c',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'a4k7jtxme4dq7ord50t3uyy898brk7wt4x9d1rhzpsatoez5vj',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '6kf74eld9o6r6l3y1qkf',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '11c1uaqyhfckmram2hahp3k73mulnuol0b9nha9fsoisqldo3w9ugaxpq3mrww3i5gvyghndksa3ms9q0of1nf489t6jbjm2gcxzklv14ue663ghm54wnt5b1utiarfppl3diywtfjwqckxiua7yj4oqgtvg4sd9mei6oxssgcebc10h6qz0qdqhafh9adw918pcwd7kb8tsnjx5345iygzb4bide0f09rpzxrrr2r73sqdxvcfv9d90ozhn89l',
                name: 'pvdek79hqi2xq1v8umutf8jvkyy8xmd4pkbm7aa00ho3npwiq8cjsgq21a21dkagt2lr7nferhccg1gpokk71l8bqranet2o1hlov6f02w78j5gszf17i4zsjey3icah5hx79nyd7835cya7omss1zoj5eizwbmu5p05qmp2wkvjwlpf215zxacvqbequnw7c2g1o4r4spjjezacudt1oso7de04whytuvxgqifobhbaty9o0tb7dhlegh2scaw',
                surname: 'xs0tsw6g55uzg8ybdnugh1wmo7wxuzke9npnc536hmlovmjqwexetnflgvkheh4kdumrsd3ua2z4ymwq2mhf24abd0m7zx5s3bnqgw35ww5a4lgw4j0bwnzxbm08mnteqpl89zk3ab2wrcutfhe9tmjn555dujeh5zbml2kwant90wmq5ob3x1ligftl615o4vkjgp3w8f55p2th16d7umte4iy5tv9bgw4m8v7hm0zkv5ha7z161oyr2yca4ro',
                email: 'pkg5rg1c5c0za5493btdhvhey3ye4vvpoqmtiszr1dqxj2qzn6swun61sf0i72znsye61fjcl7uthz7b8sw57o1qkexvg86a4x11uu2apzh8zct0q26pf4w4',
                mobile: 'gmwbquj0xolqv425i1hhnq546n6f8q8m0pj4pg3g4xe7icvwm1maada6cghx',
                area: 'fnait5bgv8ajpfrsrplf05c9vt8nkgxasrbagqa7hkp3qvxy7fy8zsznhxvnaiabmp7hagdijpvwnu41u154ybrp3g5ope4qmwan61hv1gvyrauqbov14509c6or8ouoen9jdju2v3dbd3ckr8meml45ut4zrf3kbup5exzalrrqskma288vvqmmilfaczxpznpicbo4gfmjczxhnizzd2gx0cs6bo9a47n1k23sdpqgpog1xmx24ya7rvpybl9',
                
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '29un9qqj9b1jyilfmf92uk8qgd3wjet94eh7ruzlfa10z6dv3q',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'e8opyhvwvyw62cxoilq5',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '62jpcwx3ahdg6kbcj9ohg1v4asle8ruyquuv70x89zhnoqgi14wcok18o4fms8117n9faxrpp5e2k9ewqgn0x7dazpx62wsixs27v1z72qla5a7z7f83zzszzgtv48mo5gcrozzg34qt7htcqsfm9gypo4go1gaoxcv1i1fogw7dkj5n7faxw90gfpzq76e1ivltzvwyl8sm78g33ukogzwjjaw84evphpdzcbzv9xh00smlfke5lmifjzobpk4',
                name: 'db07cqm3zllbmjnqg8ejnxl62mktkuzqnajpaj3eyvclzcz9vwshh8axvdzpusgkw0504ik4ufeotdmejo177qbzvdvqnig2tudb64j2vuvi2z316wum2sjoh3t6xy6i78avp7ipm9c9l7rbxdu4sl2xcm6yqlaii0zaroizm3llldwxu4fawi5qvka2hxge5yh0xkoz0yhmf8h6gih01g9h4r8vxt7v6bdx97dwub48zub81m387efo6wa89w5',
                surname: 'vm7maar60z995hupln4shher8azrj3za5idtonoy2h7zj4pe6nhkz8pxe995l1xc5p4emro5anfm0ztbyt90ntbj25fvoaidseyldkq0orwjmim71sqiqz9qhk3za3sepf60pvcb3qhxetgkzk4o69ks5m0o1vvnwrog55616uiy1upgx0vr9pa4dc85gx32756p20hbgbaav5s6v4kwa9maqzvnjsx374ohez2ac1miajib4tvesbfwsluy601',
                email: '0tgaaqfmsd5a222k0708v49e28cw69x7n8u2kdkp95ys0eq5lp0r677b1e314um9hfmnyutq1z5bqru9w1yipxfxgj5jmtabe736bsv4r4kc3z4qfgg0996c',
                mobile: 'nqpxmtliinh91h1jzpenz4iiqrvay0o6ym7v15bkswd2di03si4pyb26563r',
                area: 'iejhoipnn1n4wk2c0mchnscn8bwi7jng7egltod1i1al9htlhklpocknrvs2lx1hr9j2hv80foo5bgstb40iqonbngblev1fmmdaxl8j7vm4d5hsay4zersg09ym53c2xy4r65nz179dhqpgqeojdcku6o2jh70d76kdiu0fjmq3pn7zu7e3xxlmjzwg2wxqlq6f2uot3vyurb8ovme9wbb2df7jzrlc86dakxps5epxwwzxo5kj3njkg491jqj',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'unhv7bjgzcxn60nd1nitkupbra8kkpvzagl8l4d4bws1h0aj4c',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'opszkp92teixfx1alnrj',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'if751dl0a1tfjyov6sxm3n8333bjjxzxsaqbist0gt6shv06rguxddoezkdmsje1w20e0pvafuhepihubz9r6zvbvlup5vpqvm7ray56a85sqlkh8sgnu64okci8lhgv0u6lg0mh61d3qqwru4rbyc0jvt8sv0nlog92vzh9clnslln92tb7mk72lce6nq9s4j0api85la7a5bs6ueiv6ke6k64ck6x02opprmsy9kwvyw6j4tcemygtlfxixkb',
                name: 'j36k6t519zkq6hjhsjhklior2eux7ddeacsf8517hpp8vtrb5v8ag34hul4hysrv2ikp3pmr28w70u3cztpu1m9hz518ptstxbltsiwtw5ouloyuav9a2ttqpzk2x5jy06rd8ajlntny45snw9nshg8vwsj5ddoh8volk157w4fbjsowfqdoglfu9qys02fv1bisqc4hgkvzqs4h9h2tc07seeltnfhrvmc386sbsq67dnjsd3fn1ysxzos7cj2',
                surname: 'vbzn7k5ivn0c8737fkqmli9ytlcyss8uxa75vf1fpeue0otl7p6bou9dmdd1dc467sjlrenirwkmh0nrj5b1qz8jvs7lahbpg6ro334y5xshieirsjuwl67j4zle3bovayihxya3rggubh07dmzgkeruiwhh11kqw3tkse2v3fm3mhxvxxd3bjn5krsh6wfe7krsmy8hxen827qr44jklubpgs9zlv6qlcutcgmch1aovjy4qjyr2pb89xeco52',
                email: 'xzffvvg5omlgf4wpyis8ryhuh1oow9cdr6pbb0p2uykto1pi93nvlt97cdlx7pj04x4f4tr1gh26lr5iytibvz40d6y1okcduc6v8ng9jc8ldppm3hj9tq9q',
                mobile: 'nvrc0oi14eeatizbwnmkpy1gwcsl41l29jfx9v9w16y6c509r149czqgh3s0',
                area: 'ie8wqcm1je2jcgm88a5ze0l67eb4goeo2xtnwfm9c41evemz7m2163q8lmko4plm72tbdpaygzxnkp5f2a1t1nzggel8bs85rpnrv69jk1qiwvo8g4djfdzbi1up3hxsdjaq47gwwiraxyvluk20gpb6pdsulux8j3qwyjfmw2e8437g71iybmkttnscvzdqlelgu439btihy9xu6gqd4f4uey1dhq0egqon6z46hdgs5co3jk4ip30w0g9nath',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'n4dbpilihbwr85sa02oic0i2ihnyac1zc2h3c4xmjkl1jvcxgz',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'i9us76welvkjdh86ujy8',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'yrsag2hsn37lhvvtt1dmoti64y3114qacudhyjvyk49z0eis9ha8xpe8pb8p8nrj2qr8sezm4j3xy2x8wvbd1pkl9sxkp93a9g8uuwdv3gs7gzqn4we78y775mcrk24jonomyvvjw4faw36c5c7788qh6vv8n9awo45kohatn61zydjzm1mtj6hbkp71cxz5kicpx0nwfcjva96npslll14x74wpbevyzjbaldgfcfkfgmeor9rjcn6jxbsvd03',
                name: 'vwcvxl6386p0qlndq580yoncgcm7x28cbzstq005152ks5q7bu7ihhioykzk9le2bh0ry91zhnt8lgbejk4jeshm533qsgivmrzr4oyanwz21ih9gbt1wy838zfxh0sehpj83ei1p8mc7eb0i6hmkw27elvh2lbl5vyt6inadvnluz1vm3593mp8i5wyxo0k1oj10hrqtlnkxvhuhag4d3ve42r27xotw7bwrtwthl4d5xo06iui4dodzo0u19n',
                surname: 't9aucmzr6q0tocrr8heqn8x9diaqbhwbt2kkrrtjyz4g4bnk6ufn06hsorr2ybpu6rfx90sv7xublm4eckmviyhto32hz35j4eiabc6gfs46aw7vmso80mnmf0frmy3h1iu8lzmlztn80x35vtd2ret5zbvj5k5gclznaf67n1eeku3iiis8h066avy8y58pj4bng8qjtdkeac4wek63jg9gny45szgnaa1l0klu5xc8z5tkfli4ydcdbbmqtw5',
                email: 'go8yhbwkc5ljuy5wfm441m7tv3dzyrsm0evugdg68nbjge1zvsd1y0shy32c3l48v9m38o3stwx3u0hl1rus3i3b63naxawpjsr04t9996at7x57h88qtaf9',
                mobile: 'hr1js0n0xbr0csueq0r0jcr42noqhw0hno20uqu70qvam8cmqvuqse83j150',
                area: '4kt49qqto0mjcscbegyp5hty3a15hzg7fpc3uyj32mtenv7v3gfff61bmnp9c89nv2jq6q5j66igjska30g948f04w152u5vsqawq0g223dni4pv6yj8s5v7im0xig1r040p7qdob04za34al4y9ac1sm317l8gddw1qzfu0i31lj7dd9y9fgvrzo30iuu3m0tg1a7afkoeb0nkn8qlde6e7kraqno396e708xjr9csjjbr0e1h3cfjfmhbhsi1',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'fda0s4i0n9l9ibpcgy44g4fa3r2c8s3klr3f5ntcr8on0iqi14',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'cn1d2cfs81bpxz7b0kw3',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'g3plrsndfve36ibu1ps6ao54p6g425ant372i93p9he8nohhwqvuz0tnesik3b0q2fhj40zc8o4hmszaver53kp9ws8hrxaqbuggerav585uj4dkz6l2boug8gvyefiv2j467lmvw3rasxocqcdjeqaes907i6sh99v35omlfl9ujtpi9qhdsohnkza2lk63dvp7v9ubxen69zjtytgkue1gc9aw4x05wm7wexy3t9lmvfty1djd7zt7nyhw4ld',
                name: 'f5bp8ar45h9oforc7p96772v559vetsq48ez9nk1d488x9x81bp7t16f4cgi3wwekozgo2yi32bq99osv4pizkobqikwdekm0w7q57k0gbn0stfktv6vtenohy6s61q2qkxd9aq848n9qwrs6e51f1ledsjqcqegzaqddyfi2xl47xhw3k2g9yp7emngfnq99cc02nbis0pob8moy8l8xrf6ygi0cfukwykxjpl6ls29qqa3pip1yhnegc9d2ok',
                surname: 'pyfyy3j1wdoij1x2evaj8m82ye2khkox10rlvjdzdnilhkwy7m7cr55bdkhzl5hk4axdlyqsfqcnri14unr0mofu4apmjly8im7y2psbry2lj0zk5ap2k64s2kx0xvoppexx1ofl81wcq9p2q6cofzq7lgtrf11qao3d7pkepubmwhnf5wdxu35w362ja8rdrhok6df0f5trho6xfpukc1y5pte1t6incyx7evbgjln91eziz18z2ee6wkkvjdd',
                email: 's0qpa7prp3fzzmfze23w8eur7u9sr0t2hwsjny2znlfxs067gybhck5drt2g1xfombpmbas0k95gchy0y0wcb6k02aisfvrdjtcdttmjsfn6uht3ndwypr0m',
                mobile: 'gucr26ihfk96s64osj722am5bm4dqsrg44uxbxazdbuh7lk0nt1q5bkervlk',
                area: '9mgurae2awgr76aiz4u3b5c3sfob4l7cc96mfvxjymoqcv33uwkdzyl530dicr3u6yp5pixdxe03x4h51oswf6ynodslxkq100vnr2vlkeb4208ma88z0d3camtthkdzw2p6xswlkupapbzme911kne2dgo7czqcgvuruk2uty6npqu1uk7mwsm42acag4t9km4oe42cxumpfi8b81lkmvqjxrep7brwrll8l6z33wg57iwphw70cjzr4l16p0k',
                hasConsentEmail: true,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '18vanpbd2l3gfhtrfftn8ajgrvluub1zgf1ey',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'q5f2b401bwi269kp236q0sqcg8n8bh58921b6uxoxygpxggw1r',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'ov01xd3xlve6qet1m42c',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'kkpt12h29si8xro09ybyukmcyi7jxiv1hnliu32zuuhqkuz8n4x3nwp1vtmv9neu0d7law0q9205mn24z9fw3xvxzloxv3u81y2q74oslp7cq7lfa38p9gf8eg73jlh09vnuz5m98mnduxgwx43qn41kovv9bdebjaztmkdvwo66dwxs8n8v7yhfhjjhn1b4p958bxxozdj8mzffqryfxkwrg7priypomp4mmkj61rbj8ci9ckg6cmehc28g8d0',
                name: 'qn8uimocdo4r3pm3pxckoz4096hsgongp4p6iaboy14syxkzt7huvvgz4aggol4pwp9uxagzv0pvb5k9r8le3xkqdrfqyghm1z7ro70mly1et89oakgnj3jr798ibacwc18l73t6wax4rxatb23y2397jkeo3p2tr8x615lam05cb18v6r7g56qc366ghba73mkk27na69dh7t499a7egt8xe2vtbjdpr8r1yyprzvipiqzqd5eqrmd1rilubyl',
                surname: 'l9sfsnz0lptziwut4s893zlkv0zpdi1dbvaab70d8nmvk4ej8v3is2j7cdp4ci2rx0qh5trlvwru8a57r5m9rwe9lspk566mn0f2lzwhnwa89x617pn9tt4sx4grej2b7ulyri00xpjwag82nr5zrg4ejzk99s0y2k1ge2ye7b2h4odwbifj5qa37e0ja8d9ywfm1ruwj3lhaguqbhoj54rydnuj7t9jw65xc8w8whkywiazz1f1h5n2z7alv92',
                email: 'km4e8ipq9hhpmgrj8bkjsp92vdoxhr5x6did9qpck2gdocf4s7i6z3orad2k8wu8smj3u589f904537hgjt7u67nrzwgldr63yjt6wdfvc6ig6qdtbjclzm2',
                mobile: '873nh6bczfwoda2cot8j13zo394raf00nlbn7cq9q0r8w5uyn7eqkolk56hb',
                area: 'w7e7xycgeskc842pcf483rqvab6huhx71anmcvjmj2tj70cvforpu1nmebze4dq771sb71yerxacx5vye0ct240rvqfq3m0doaztfnna5hk4kxzidfr6dg2luqnbiv5jrbck1rkky3zi7vr6rmiljg505ysolamgagnnzbvhkn1eaiv7f5xjjayndwiu5ytzfovuo0ympx945tfv9rgos661cdgtlhmr2ec0dq9kzibbz4gfhc3qnd25y2101qc',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: 'sp0y792gx6i24t7c556b8h2cthybkbgeep9lz',
                tenantCode: 'atlzrv87njnr1qnf5ztatrns7ml2m9yb3ttdhih24qhltk6hc7',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'w3iyjphrigl3cgg8ges7',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '1oau0ri20l1vxprvw2cja5m3dpyo8hxiflfgjnyhq6kzgsoyxi273m4q1u6u9d50q7nflgjvvz8twbp3u4mb6h71ytyk2irl6z6b5e5xf43oz5joa5c3fbxpa96zhf0vrgw0k3xgefth1ullwk8zisc3he8keap77gpbiv7vz12k6h77wye7ueuw034ixq3wo0exsyjr7tpsk6m2n4usdotq2cplo5xy4piwpr8jl901cd5dowqt5avbcwyub81',
                name: 'r0yov0wtuymcksfez0xbqgb15r3k186ue2cms739f4fkmudcs421xsiw6ijqib8wu48qrfjjss1aqz33mbl3u8i9d0u31s9meo0udh6mr5w373it326wr0ij18a8p8i7jd730wcrd4lixtap4aiq3jrz4zuxnd5ewnn6p3hz6po0nmz0sqiv1rv8d7zvakmn3cnbc6h5jzg0t0f30s8pwmg2s1atqpjuvuul35c7zcjbcyegm069dva5kscp2lc',
                surname: 'fj33zpetksaanntlc6a9n33stv3073lyaypa1ufvb0rhh7vqez2ix4p25bfnl1e71ctcsnyzokmdi6kwp93n56pfd2cmgr29aaba97bmd8xyeztztels97bzh3qhytvumxw1sp1dwkpfeyzdi6r4c8df3ag4xsz0ezyh5rq33uh8jv1yn6cre5kxwrzp1f1ngtqo7vd8qs5wn1qd8b929xq35p785g5mbh3wuwcackb40savl8udfpjkxa4c4es',
                email: 'x16t8ts2o7tw1vzg4ejwffc0xpa903b2iisgy8coidx1s0dcm9b4v91czig9osjsiap1k7zf6m1ybsqogzhcz0deel4ygib4yuadb815fn8fec82tlf59ah0',
                mobile: 'eqklnbr9bj5vwbgalt7d8sgsvx98orrsg8b0bizla68wc3xhkidlgcxeefgs',
                area: 'p17qy10rkxrwuvgd691s92oeksix4qq1knon4ekwdf7l6co3ytik7sn7o9srwwax8mn6154v9tvykrod2u2ket3td844cr9jdbki79utp4ym6go9hj4rl8vcfs5h3ssx2jw7r3dy8lomqqbvjzdd3f0e899jv8ob1izz0z7ph255h71zdt4u99hrgda84q8xfna3vzgokmbutipbqte1hci7pyy365qwtv31z8pjvnva73jwla8621ytp2sb23c',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'f1asalvurqh1qhf145tfxq3p8cyha7lvgvd46jnake0j1zczw0',
                systemId: 'fioe3usazubczy53sm8gco4q3vy1smwe1fqgf',
                systemName: 'v8wy28bpowwf59wk2r1a',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'crh5xrra87hfbs8gz61eaqbw1eypf3fezns89pdubv3x5kvuzzzfv42g3y1elb0b186fofg0cb9mpycojfxocj7894s8vmqtl2u4urz0j9yix64cm8cmgutkylgpq8mznokvna4lapi7jar6srb6rbzpns1pljx7jed3i6iszk3ny0tai6rpyoon53rr0qlegf034sopka9a489w6z1ip61wzkysmb68mjeja3cobxiywvpp8911kmvrrytu14s',
                name: 'ny9f5bv8dax6t203pht6d3bty6mltduyyvqkci29wjqfj166qblm5q3pezty8hqegbiebfxyoa7csscj4kzvsbbvm4hk3pw1w4hz6x4kx1x635gq35l2rkwdsaw90cw96yuam02zikf4qu24flgs5pqa5nx6dxii4txoeq89mli7sud6mi54ea36qabyhhwjxv2a49n14sqyccbysvr4ra94egohecxjfusssmasgh99ykqowguil56krn1vldk',
                surname: '8errlw0hmkeohigs699kbzidn98hu55fljtgz8pcf0h77nsnwqe9mewex3tzqlwqabme60mx3mw9u1lemfghhvihvrbv9fgp729w0cus8dgw11xqivjopjr9obu6jc8b8sqasmtveg12pbrdaw73b2addvx9fkna99c65yp0gktw7v94w7fdbjnylhwng253zfrp43be1dob5vredh9s8rpl2o5ztpce9eak35p9t8mqj86cg4x1r6cmfb3m346',
                email: 'zl4crztkcibkc590fgjhhmvdzi8mwvqk3q5bzygiv3yhfll95o1c24e2ei661kqkq5ndzbf2jnuamsknzbc4kdj3agap6mlspngamvd42e0h3qpd6ur94x6q',
                mobile: 'c3bt6gy854ijdj8anopgnkxq42edcbadqkhyvlpalb0ots5uzhh3zjypiuwy',
                area: '4ory6gaq4ke5y8g8cszjo51oeef7pw7t05xadp0sxkuh1uo20lx25dhe1ffaqfr5m7t91poz02ugm5gj6thzolqbacnz4c1b1c7fbbdyjubmfdzbc0fpevxz048tnmjv1wtb6mefs4nz6kebbhvrxsne06t3legw84xwm82zqnckzvyvazxjt0fatyujca1afqmtuypnl4frjcpvszc9ycckwz7fnk1g81glf3jfgy9coy9upxa6zsx7d0efpck',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '6bhrw3suit0oeu33jn25mzkihzkqogdratsg0ol4ulnjplefaj',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '8197d4hparmkxiyvb32i',
                roleId: 'wgax0auok4mbcd19by4xi5azzjdol1j268s7e',
                roleName: '0d9igrshxfp7g201j5pxmr03553m9qjq5pbh6r2u4cot63512lcawl9kbht9966z1ykc2pkrilbbdy3ymwxip6iql8gy5o48693nsuarsy3kh7a0g7iu86jww6ycqpt4gru7oomfnjo3sbgnrw8rqc5igy3k6nmt1ioftb4y15hwnqf5e2twg76t2fonykmezu8kjklk81yeatjcfn9f1eytqo7yhn19b6ji8go0z8x8yv8t309q3iiqoxftxuj',
                name: 'cxiseuob36mzz8nykl6o7xb4rw3ushbm1c01qbdz1enkxv0d3fuq0lnrim5vzebgi98jhz3axritp4ib0r0mu9yvbfc85a8d496hv4mve6ev8h5obk30unqa50s8jcc3bu8mktuo1uigsg2wo75auj3zjwevq2tezoc4ss9mrkh3pj5tjk4n7gsrhy82hpdtljl1fjh2mdwt58lpmixclsfs7h6b7pze3fqdwfq0pxzgpq142jfhuafpml5lfgo',
                surname: 'dpwkdcbsiocklfi2em4n2mpsyyva5vr7jqki9pob01ukstoiwep016vqw8m7ynco9jhmvf047t5ehui5qxd9wnhtdytid8okpkifvs3gs3780w3xfjnqd5rezm8cx1qf128hocq96jiiqyzedqwdjb1lezyfctayd70ta68tb27mmu7ehw5j41b83e2uxwwf8agnuwizaqper0x09mrdhenspzcjr1v9sm5whazxhm8p6p5y0m0mzjz2l7vnjss',
                email: 'ka3y3fnq11up2ignsn7ity6nqdcqhjbn5jvq2ax8efv8cg9t60eiv6059nih54dni8mw7adrujvlmrjilc8xbty5ldo2da7yxtvfgo3ppvo5u9j45747bg9d',
                mobile: 'cqvu7xxwmlvdhf3p9mfxlsxgu81dwn2b1x33oe9j1g0jgo9uadvgcie1eufd',
                area: 'pylfwj432y0cmu5szesdeawbhddafd99qw7mmx4jmos5vpn8kekp2vmo51e8k9cb4donrgsu8kykovj931lwb9k9temy6e5nbc0s1u2mbs94co8rhlbblxdk3paqrdxcdwiiq5hrsda48srn2qmjausw3zl6merfszbe6skp2itb47wcx9o0o60hwljtldvq2uhfqga280tab7giwpw8lrjrzbg9js6ug318i64iuqo20tfo3vifmvl0csqyuti',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'liv3ajxehcby8d8uunnnfbhdd19qhrotfe690tjmva8uml21z58',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'bs9ahwbk6tcynzxs0v6d',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '5uu7cowmhh5z0vevbvyupxppft2iim1vtycmv460vz1u2jimjaz6c2vxgbeuk69290b6eccv7so4n6xcnd9gzd17nda9nyxkrba5ylktdct3guuzkazodgl1ajr8oey61yfao31y5s677c8xigskee0tjxmmg2bhmzrtdy15fwh6z3thsf6n808ysdcaf5u586ah2joa8471vuytexwftafxg2ke12txb13i1lxhonen8fn86jfyy26pvgj14fp',
                name: 'bx2kee7huj93yy3kc16q9v5hzd19rx9i7xcrzgy11vrpt2ob96rfxnda33psj21sy6c6s0igz2om6b7zq3f4rmfnduph0eg0oc5633gcf02xzlsqydyycruvjh7f2ivzjbtunz8js87w15iwgqt2p71o2h4htnojfvjecieo02u4ohg2liy7qh4419f15h4u6a4pkcqm65hmgkl0dx9te295cm2hig73jxjrlrv4xj1odkkg4b52n19fov8k2rm',
                surname: 'sawyyz66g29ww7hmk3d47qz462m4vljqq6ytf2fyc023z5kin5l6c48pcoafn5ulc74bwgc12mf5kyl4bxrft3dszgfjbcnfdm1oef95krhymehv98inm7rqa97g4u5v1wriphyd7b0n87tdfahr4fk9f2uodydw10wzhc69oojupyorgsgxn2ep3nbj1scg50dhmhhe3splhy0ypz3s4c8rf7ggf46b9k0fa56mxbvlwgg3o7e7rzheu3kvzcl',
                email: '6tjhz9aqyo90kz78gjmqn1lugn163smkpw3veznu9gja5lqio98boxaohcmmc59wlihurc7ek5345bpf3gukxbjll34dudpmgezld9alrk1k3pm5pb2gnb8o',
                mobile: '7v51ec3zm8u61pu9tjxuxouw37ljp2iymlc0xcw6legtpohfws69uzsls5ct',
                area: '0slcx20t45bkwxu9l8e12ltximi2ey1ze5pgo15a4vjpqnqo2s7bvj5d25inorl0zz798zqlx1k24ea943gxsnb2q9ikfkrdjzs6yyxgn21xkgs1mtt90nfgru31wqkfb7hoqy5gyx5afebyr4omootvuz3mmw80v0ocnz5if2zfxwqyele5tovhbck5v0kibozinq37n0rclbon5xqeivq8m919zhwwagixueia37mbtomfwm5sglvf6hsq1aa',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'x70vx46tkjqp6dv1gtqacoglhf17j0ibifvjc2vs4qudizd3dj',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'skn3i28naydc15w38zps3',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '7cj02nprmw2sdkssj6yesnrit7eb99a5xn6ffyiaun8bnx2qzo3yrp26allrs4xshk7oqz1ntbx6kw3peqtt79tld6lxf6jp2yz604uwql8ulf0r48k6e1ax8xacfcmmuvdo7v89k6nxvuq0rkqlc56pw885rgnlshjitpzhqfgd5v041iu79otovtgd18qke9obfwhe7t9i9oo10arngbvhn8fi5sb06u7crkr09zpnedljwe5v09eivp546oe',
                name: 'efa5pzz9kzy16mydxdg6fbzf2uumkjrzwlo0zaiqxxlwvuiyckwhreiwn6ftv5ggfryui1p3j1ho6r0ugqm1wwammv2mdbp1b3afc0ncctu79u3zepguke8hw7d2mpx7i4hkd4dh6epn51oewebxx7yelhv44cgraxt57opzdaqcj5wtjw0o4whlt0r2ftu0n37flgzvqm9vn3rv5j6nioaj8l6e1msnf6n3u7slibzihzvi6sswd0yik8dnzjc',
                surname: '00rnk34rpy3cn6e00n0mmffruwci7olnfv2z18mow5raflcoi3hqa0i6sqaywgicaz4b9b7qtokp96fe2r4fq3nqee9275vq9sbqyrtc6ax1fit9l17y70rws4xq7bgh8ff1ckmjf5cqqf0xjbh9q91gul4nr1mzgwdhzkpeaffvtuu9gjmyef0ypvbhft50rwodbyvjvhkt9g3m1oxcq822hu4u0bk4pkvlzusp97zjsdmt4osgrepato4l4op',
                email: '3ovjcbofh16cylvmlhn5k2bp1abxead82qmu7mw5e6omlf3xaljq5ia61s8eop28il2vus88m98jsc96rmftg3qp33gk4wsn9cbg30ltsfuvvesvd1pbgicy',
                mobile: '3o0xlikgibbd9p4ghttwst3p43y51ftara7p5lin3rv8fz971ielhi356vzz',
                area: 'ye09mw0txfg34g5nhdzk8b0k47xel9g9nt8teeaampbnui3i3wzzat4nwbfrl8lihawzi0mav34vdt1voe74tyaori0cfqbvwasmwwe60txvq6f5597hhvtizuye9s27kuwphezhieq44d3g1o4ejuja07mosdwea0pbmf63c62ue07np8njluauehcou0hx6utq19zqy8c6ehwzm398o11gtbytori1i7d9uodqoo5nnnizfq34j4lvygfb0yi',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'ljeeo2o6qlkfbztnajldrdqcznpjahhm6vz45hoecpdth9lys4',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'usl0jelwacjyze3ia258',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'zav9osq2aojwxrxsup78wj8ztd7dquvq9ztigrmuuw82movg0895i3y1l9snxsmyl4tcacih62efht0vr83isi1hes6sv7a9hox1wpa5jwjw747srw7nnk0niokg9kkuhrh9z2zwhgs9xc97lilmwj6ya530z4kxukrte9i7hf99rsc2m8b8fp4k7ppp1d5kkvhjibd7e3qxj29qd724kd5g692p70wvmzglkvui2thpal5y622eaxt5vjvh205x',
                name: 'h70s0yrl7ym233u83crt4ykis4y047t9ojgo0fz3s8nrcwpkx0pk7codjciv6y5aailmrehfq1o3xvcafspkxmd1qiomsgpmlqrgf4euomfo3cs5qb5xx163tcg5mxw38u8c3fbca4d78ychdlibxozw2eobtg95y5f63vr7rkjkzn6csm827z93zp2g7rlagrk0jsg54bz8hjnevnoyi2ms4d6f2gxpt4x8xsz0l1aj55df25ou682v6j81jhw',
                surname: '8m5h182u5e1bpipo97ay7e3nq0evdpr97ejzyj22piqh5knd95l1g6qo8cd45rg7sa7lhste760xzmjhkvhatmj1l2fuxcdpddvp1p0fkubjfye71c1h1xsb8a5e7rdv3ls9g04schwfj2hnn7ytm6zwn7hchctjv644xh0bfj2l9qx8qnn5b6oy53egsbmnfbn4emum81zqjgxgkziwe50ngoyus3gvog2j2uftp2op2ll0vulv327vtofjfxr',
                email: '6cjqvssrgj8t7i6pno1d8euy0zuz100043rgynif31gdpk0ygh8pjujbvxud56ieexr5p141m679hdju8cn3akt1dbiuiicz389y3fig7er7xyn2gmt7eht2',
                mobile: '6xvhsjxfwfputfaut0avz5785cb50p4jgkcxu9kt6r4f30e3di1ln7g63oer',
                area: 'jtvqkrc5po1q9ow8q4hzxks39bc48hs2bpuu9ven4q7run3sdg9imbdxqsfs1a47cm83ppl77f1x3lk04bj82xxapyq5sxx28rm8e86yy4totybxnj6hoy3qarvl8vhhj2bkodb60k4d2qe0nl1xrf0rp7uxoo3yonvjmrwwjwuzyt5lophowoieazyuj34nhw3eqp7y17bd7zcjntzt5v10d4s705s007gmdizbe1tm33d7t09nfwf7dwohp9t',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '1632n0zbcrujdibnv8p6nelof352tntj7oq0sw80vpyb4kshup',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '6smbk2a08bkeqs5hjbvi',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '7fkojfyle656xih8t1zfmj3jm0lz9jz7q6icruia90zr55h0tw4pclq7v0qon32wgfmwo2brh1e8t267yzgsyojrb52nemynn9qe24r76vetv56s6f7rl5pg4jjkn3h4v92w9itxe41nvlkkq2fwzbfwe6clinqkvsjujujkuc9xd9zl5mc8s7kasurml1boeo3xba0akkncwr07h88qngq2aohs7krn7fsa7r6an2e94wwmibk6qhnitdgs3o9',
                name: 'cx5j0fwqgb65ngw71dklutt3f80dvvmlo7d81n4zbiv3kmmt6r7x6rj01kp1uupkz1nqomfbqi5cx88zdxmibxi3gitcb8i2ngf5ip1rgqxmlj9znpzkwrigq0r5ku942ftsnfssha8qcpgw2xc22a9scyine0acuqs9koncqzg489hdu3bet28enq8g99vhzir2036sfgg3biszzsqm819wid4rbr2chdhkuqypv2j6n55qhehh6hg6csdpa2zm',
                surname: 'lwwltwtzjb3azss5qx3rge5ctfrvthb0lejiyi29urweuccppss8niaxim2k144yqqgydcy89ce2aqg8i4ghn7c26xnfwneeedfc2ubrez42mnz3qsgxxn5g9ulp6a4gex3ta6a7fy2tez5fb6tthfq0u0tb1q44swchnqp1eo7b8jyo7p6yhzfpmyl82rds3sh1ydhef77gp1jlt8owmd8olgfz72s8ky11ysquskz5han0uupg5idp9jyozml',
                email: '9lurm2jvuk1bi5q3vbxgzxclymisegx0wl1l5yogtk7pu70lydwzma7zd6a59395rm6gv1tvx00ql4axmfyknef8fjs1h4hov1xro3jjj2obmf5kh6chzywp',
                mobile: 'gqdq81o5zmhlabfm3ilqz1slwk0tj8r8m2890q50o6odm9javia63g8bx4vm',
                area: '8brwk6sdhcg471u519yzy7un73l7xixo2boano9igbjqilwiynorpv716ggn39pf4ttzztmcgys8dlt1bhtormi0kingfow4lg94aknv5nq9j1zbd05akpnhcpbh79m8jx5ac6gojmfo76vqifdnqgsqoaompits68kvdjjhq0m09h84q0pixvu7fxc0ipy8vzcx90rh0gqzrf1y6tqbgz4euyjvm72v4jjpoew7brond492f407j7mtflzxp89',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'lzpvr22tbyw78ap4meglprvas6ah5g5kr86cyinns7sk01t44n',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'dqhgnmz88iwtoy52tv0z',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'xc5yuj9xqss302ab0ctf8hgyvxuwatlwjlkrupeev41gyuen0oocja0v3x4y3jaj1plcp501jyzsm3s6nc6vxenw97a7ijiljv44o5eplgdmdxr09g9f4l5i8qagr284v2fboezkdunrgr349xo6nivxnncjen6gmcy5l3irrwxzykaieszpl8nldcy1pr39795msjmyypz774rnt3g49jtfd84q2spgdq42srdjugs3pstywcv7yjgwevvak8t',
                name: 'sc81z7xsxv9ln67933vyj5uii3kxgr5t1l964j115ao1vhclm0au3nl77a60psmk94i4h33om1ahdmwqj1lq6nc1gqnsh2utdevknupa5u72dk6v96fosc875emwaly32oywfc0s3tybxjdgxs1ss4rr7s5acro5qhhttx9qaa76pw96r967irf3s62c4hjf44tevaomn648u23x3u02bnwhkpkfng9detos6gfdp992d4hs07104tfi8a4r0x4',
                surname: 'fwp38msa6yxwa4jy7bceazhr5osq7u3yhrj4pan9c1jf1nuergw23lroq8b0vhyl11r67jb7sso1o2zvg8idp1ppujutld3bpjlsino48p3t77mf8rrreyx3caa8nt4ld0wnlzhpu51n6c5gbwydhqni1f57sd2w5gwm7scw8q1zj06yy9f5gk4h98nuw7209i595luij097wunyjd0sijen0o1yf92436fgv1xgt8epirs4ffln7z1ivnhr13dr',
                email: 'pjvybbq7os0x31o3ep7z6mxeb2d8yg9zkrg5bv1eg8zbtiypbokydzma4um011ifvyu6q2jy9sn8lrzsbwvegropkvxjbwqcwughizchfwzbiucs6br1c2fq',
                mobile: 'zof167yktcr63gj1lmxm382tyv201zpmqv8v7dgaj91fqy9najryiiew1hko',
                area: 'v3dqvsh4k39ep6fq01anvagksm957m7kc3424ubrrxvrbkebq3kkrgiuakko0jbz3bsr6qu6w4wz2cao42l2pwcv0md55yiinxoqcox2mtitj7crghtnqc1k57lztqlw73edbx79324qie3venai5u7mszdn3sjm7cmp5b2vp5enl5rrm72pr2n9xbr6t3gn2ps3x8h7qnojzb8ecgxv1j5jv88yk90pdq94hgh0hp0qa6nfhs0s79uv1xr13jt',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'r8kq59mhgv15wo4idoaq3kmbvtbumk8awi7et51si3x7zvxdwu',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '4yfd8urqivfpi0tyr2hj',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'u1bn9kgw5jzn56q94dfnmuxaj07tlp57mltbeq6anh0fg15xxf5706n6lsay1l7018ddwnss8aqw3uhlrivyjt29einvjks0n8jq0fuhfbjgq8j7dy7aasonci0gfphfoqqmyx2r6aruzd2smnqb603oikois58uytpq4m35x4bi5aricj2jy1zphlzv6zhn4thoavw421mndrr6z6ebmjvhwjw1wyqcscz1bxh23cmxrxi7k6bij2dw5ti9cwe',
                name: '5z4fjmqkx6jfhtdrfp4cudgc062ynq8ftw9o9o4nupl186x1sdm3gbwp780lboy3pjwxsmzl6zdq1y3058ce2zpvtaysrtp8vvhx6j86dkhwg2xsdoinzy949h0fpykrgeo1zr96c46ddvycntrroh0ccio5wizqft6w3e4twxm8a4ebv5949hr7k69l1y970up8wbntqrlh9nme2ery89j43828k0a8x83oqzz3n54xvhd1gvdj61bkx4zo95a',
                surname: 'q5uua1yggokiarvy8spxqeywek8l8xbg8i6ycui5cd1vh4eckgaefec6zj7bm2cy48s0yr9fkbvg9ipxx934iieh7nozjq3pflfxkf5e5wdnqxjxo5trlh1glasnam7lqnwepantx2xo4u2gs8w3c3hjoj4ztaw87sgpjj8xviuhxfax0tkffbscqx187ezu55fmwt3bctzg80rkeurx2ah5e7atnqmq9g7aev0mr9pdobg4on1i3xx48hboea2',
                email: '9qymwhcwv8e9phseuzxn8ainor8te06hqtbcng35ojpq4hnqjrd3csg3xd5ej1cus5pepurugwf00883r5qcw7zxp9ntff36n3nlc6cttwmzdj3b5gqp9mhlw',
                mobile: '1zjvc44xh9y8ogqz4hs3ygn161g40ero6jp0w5e4taj8fijqt2m8bqzbr8r3',
                area: '75zdcpic9q29eeemh31fblm36jr0tn4p8hug3cuzaohnf6zu9y0ex0f8u1sg6yfg0xlf8w0u9hvn7up1wksbo5cm24wnvdgrkgjwumnvg1vusyuyajwigem3vcvy1ax9nddsdczlxrnippo6gbnjflx5uz0odpx8gzhtmymcdjhr2j1h199kxi9vt69ocnus0uh609tipi8q8izs2r5kn9jbij6hbutaa4011jsfnep5gweou52uq2vioh49ly1',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'efckbwx8am3hhwpbajfejdk8a7fi5jpzjsn2mrcb2nz4geg7yy',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'r8bk2u06ftj55idl4d2n',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'dklke907732mq2df68qqxfr63dq8or8wph2lxev58u7nyxs3mi3337xzicgx5h107e83fhfq6jk40lqsinmgwaannkd2ra8h6uo5i5h0a6osrcdx8v9xkffb154rysab7resb9sd7z72mzaxffjcud1tq1wh4jzmc4vy481txl6f3x37dlnuqs9z7u8lig4vdq1s9ygyecxh7lqe14yjoih3t0tbqabanzro439suanawcsdywhpennd12x28jy',
                name: 'xft7lglgb3f526bejnfz1avkztwikwjgzp633luzqgt8gibcnxo1ypv11r94sxcyw8oxey5bdf739yhohus6botniokysa8ym8f6w6vxydl31aa3r8qaa9ucr027lvugfgaemqlknvps7k599q4uy22dg0sh10hdj51u6y3rups6ra6u6qgs3jtpywdjexvy3cip4ci0rxpkrblv3ao735lwjm62rradsj0xm3li269hjzuuu8t58gu1mf9mjoh',
                surname: 'aglyh8iq3eyo9dz580tpoj9baqf1j07s0eznqr4avgj89oxxhojgvvneinirk73t875kgrpwwp7vr2in43hemzej31x2cu5r7gmui6okkdj9glmmdx2p1cfkjv61jhddohyc18dzx05didmfayf2vomrbpvpxsyglwndty11tyh1phu3mqx59o4yyryrp51zrgfm56fs6dfiwgf63uf30nwng0om95suglpinl9p1s4dsx397r7mwujjtxduqac',
                email: 'qejzaivmfquvvllegp6v4l3cxh4t1drdfh1k3f730b0ck9gf45i0ezsuhsyiyotm0w1h297i94v0a6og96b22rmv1putwe0u01ev789mi864nrqzkngd4w1u',
                mobile: '6cxpbjno5g05an62rfocgyrf2mslx028yizphredgetr4cfdg97h888px5fnq',
                area: 'o0pr8a5mt0ai1o9vu08fe6ruo0u6yymncrxos4ab7gbirzy2ih5g6t3lw9iao34rnj4d7yytjupgm9gwszqtubf5l2cmz0xtdy32tidoikhpc94xgtci6adnzwk7b2cejm229227af1id7mjuf9r7wc8rv6ft47tjwvgz5l9e7tajira48ts3qjnd7zdwr9yvcr1mtewt2qhkc4od8qfp23xc7pmwtanxg6qlw279xm3pasyd3cynowv2qv0k5o',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'b97r4yokquyafagciyi71imuna8ikvd0p2ggb7k9p9dj416vag',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'b3r2evbvoiijt3er8azl',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '3927w7jdlaqc3wofx4glj9jq01yqhez8o3q4036ovnsspla4csgs6m0t3zp6oceja3ntiy94z27eqvwwjws9mmfrliouj92er0tgu4d9sjp7uuz5hsxe9ldfcy321cj2vbige5l20mp7b1skv1lupbjpptetr6jf3jf97jye4bvuex0b5g5cbk4rl66k166lhgm0roavdmd3xn0d2kragpad4tcyo1gq6hqmfknsowzwlgm7kri0ogrndnoiwwa',
                name: 'ydint76q1xmrhv1sm7gh8d18vv5fhyaqf94io0ni5e3mrqd5ke7muel0co5kjprnxihqivndv37mvkihbbrn76d3xzsiekw0p8oj82xug9xjsic1ms21d0ri7hngmwbzgaympd8vy2f0qzoprbhmwysa4wtxld5v0btl69bb5305rb06m6k4wfz8pckoflnglzihy3vxhinx1vwoghb81jwlwdox6nyyh4jym08ntny2o20e1hokzv6v0mqe5zs',
                surname: '8vphh3if8im9vn37f4lbk8mhdfhsitke7fyi77wxofahgs3o7rh5epnfwjcy2ezh1jat2jig1lac6isl3l76pvgjdnh88isk7rbe69pcixv6vv4x2o4s2prwvzbz1rrw5y32xzw115045p0zkbg7q9t5piow38hh7d2rolbngpwwxwfodl0ecv1olq4nzj8xmjz75nrrzqd13wvuinme8ydmhfsk2f413kygn5b03m2kej7039x19gpnws46zi9',
                email: '5n15n8d2nj6twubd4bl8t0fyldbfx4cfh759gpycpzt2vmldsmdpi4c04k14j70ul3682zqa9b9qesqpdi4j1ml686t3twy496qflbf4vr5heh5q2jdrqpd8',
                mobile: 'tvo09c76yggminavad85twuepuj8p9t1dfbztp1fswpv7bev1wbhs00fethf',
                area: 'nvakenu3ie3kb70h0innlwto0ypw20x2i4vde4i9zmxrh155iusj88fyudc15seqn0lro6mymhlpbf6k6xarwqirfb2qb2dv3mrj49sq5oczm62eagcwpg5vh2gkcpbb3210ra8kl6m9vll08xllku2k9was5g10o1y7gzrn4ranlr3j6rj7hutrhi2xko3vbe0r8hta4m011rfz3nbrayibgne0hs96msp9ejsqmpys2gzgcz9spx535gvse1mv',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'bc3x8x1uxwbh821ujw1645f4by16rluefj4fugcksesavzvzvf',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'wxoozbf4szrba6w52xc2',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'pvxsodi8xr9n7hrtr206rox3k01e80oatul9yhsg2jgw607hvyv68qqql7zmihgx374x2jx1902d8rc81gcitpxb7hqhoexjrj29kf6i6b7uis6q9659i9kq7w1xls5w23fcoy5y53n4jnczkzp56qlnwvgrosphmu2fnuw1xjqfz1f3n9s1c6yinilmanpjdfp0j2k24fnfky9rig9jm7hna5ft3cktnuc0nst1mbtq9zscdaup80tt3vtt7ap',
                name: '8rbz2e1fts8emkirvow8k33ruyxqyyc0qexp2x5wx630o4unhaa3h65ehhjig6dkx8p2bgx8sg2tbcfjppp7xmps72sqnsasejnfew3eg6x8dbi43p7hshi39e7ltid8tajreyycx06vryazn4teibfxkh3wd086nc4wlmsl44yb4ickf77if2qui8rev0qwjf1l2ymviv7fkm98mqrtcu7pagrvl9u4uc927u0lyvgfzobnvvsmgz3guwi4ytx',
                surname: '84i44bfg3jr7n3o6zmzrdq8fz58x6dt2x1kfm3t9ts8yxcg5xkwr94rvyhvyf4kw9etb1a592llp53iaa8mepuxv9jxxfnknjb4huq01zyaf1fcmpyit6sx3oeps80081lx7ka5k1876wa8eqdttxz4t8lsxmtiq8yjqt1n9ih3lnzz5ix7mlfvxsqyi6bvsjzmcqjnxctetxqw4vwms29f00p9s4745atf396lrceg8o8b3f9bdsuawuheaowb',
                email: 'alk8c4jznuqq8m0e3fqsbkko2mzp9rfstjr9uu0b9k59szw3dnvajq7auxnt5ffk8l9smqurhxpillhg2sbgpi8bvx56segg7vl8njakt70h5h6y86uh1vem',
                mobile: 'kx770kpk052kztenmi1kvtit04ye7ypnzbzzfy0o0dnhm2sr4o97kc2ary2a',
                area: 'gs57nwvlouuy7g2rcu74jimicrfdo91boatm9huo9ngjotb5cy1d1sykudkh0joee0hxak0dfrzoj8yzkefvv74903liz9xablm47kz29nwqe6jfw3xyhkolfty32n4gaepxa2ed3oc89f6a735rymox9x7dxer938iz169xc8jls6dait09bha35uom38hfvxoa8v2mk87k9yiak39ul189p7rw4clk3kgjmlrvndehjs1u2kpi549yqa58nd4',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: '7gjdr0hb2dtma5bzgrgrd3aed46a8npymviij2uqnhkydbgc50',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 'lydqk18g6pjrj767c6z9',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'x9g187t92f75n3p94lpwfh0y4mwrtwuxp6da84fgulxw0rj32xzruv1oh8lwnhohma3tu3rwb34xyezdntvuxsmrtwtr2f8rglumt7btjzdu5ec9e96rwdqemt7bmkzmbc8kjf9t90qpu2alcczys8iwnwpydovvifhx33o37cr2f6a05s5zmcj5sondr8p0bhbapi02nkxhk9dzu229ay22zdikjnvde1lgf5vd7or514jikz78r4c07farj7z',
                name: 'v0mc3jto90unfj65ew167lr9c5wqwijjzghg3s6wmk6emln8753dshqq1wz5r4tmy91yxoybob7vsmwpoz4ysltb76trbjlplg36cxgcsf16tqhl8g569s5drdgvr0v0fmuqy3eaho2g1oy37m8ifa152vw8dan0vckiiix3opy5smo61xt8s2f1q1asnodq8hxk7l905ffhglm124o90dacinwd1dk318jdcln5w0crrk4fpxbw8m7dva2gdbx',
                surname: 'mr7cqau450pkvixej4vdf8cfcijcg827146k2ozqo3aujjdof9f0uedpgf71b71kkbfskieigquey480vi3t8slzusocakx75yy2d45in56nxjg57fdrnph0rp9tdnbynggt3d3h944hlbjsghx054r00hj8xm3fkoxfexn8r9bcmcbjgq360000b5urwyii3q2abc64utah3j3kfyewjqfddz41w81kdzgvdaomt00ekockz9yc91m9yg3avyk',
                email: 'p6dk8wnpfjp27pu7xyweij0xpgr95sexwh9by6u81yjly51o9i4nbhlnmoy3z5d2bxn0v1tyimzetf6q4zifrsntn2bmyug9lziaxfuzjaww3bhh9w03hhm4',
                mobile: 'yvf0p66rqz9kktlz1hmv8qb9o7l5ghrstfy516r7g8iepuq0kd41qjyb4tb4',
                area: 'pm85y7voi7bpacpg78ky7i7m5fvvz0zbfeyfand7x3ef2sdn6dpy2536snakeyni0hmr37sdd0dd9j56n3na5hhz6vn345jrnazc13scc4dtmzsi3tupwvv8szrdzsvvia9ej9aau0sh0ocgtjamavqtd93uci961beweve7lx1965rvnexevcjpl4n71hu3p3m7qiuj3s6ozr2pk4jkusf8wulxoz49txb6dlv5kfeagseuzbz3b1qlrya36al',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'op0d5n7zzy0k5zp62ix9kn6be0zwi06nhi64x5kkky3omvbspd',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: 's6rt9ngaemrm0trqv06s',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'rloakaq64s7gvdmzlu4i2hugzlddo6ptvetuxqqo8xgqkgviyk5101zd3446tx3h7gs4mvphtbby3tuey3i00j3i1w7v8uydg2bhf23inenqzn6wkwk8l9scicn4eb2uxbhuvsc69p6lvwmmsbjlqga3nllzw4jnyjk88lcyxvys43upu8nkzwdm1uov3ef3tshwv8505yziixtjhfabdxdf8f6mnnsafmj2hz1t0w00koe45kfcm8gb4r0ouaa',
                name: 'wmim4eq6p5wi3awbirxtnzbrgkiofngpb95t5dkekz3ew1uuglaloarp9s0eyx3woz0bc7dzci2nswu1sn58jrekwxmysfhl7kxrzxq0ck3svtat69fnxfleb90je73sjuvbkhhmhekpmkf1idfimzshjqb63f47b7fd0uhtdjbh9mxssyvhwryb1wvjgw1h0azs5wp9h6gcwfeu03ue4seeakwwsgjvwes9aom1oevb6l1h2y6p1uo7zbzoaoj',
                surname: 'xvmpxzgyjkooeca92kij8znact6vt7dfb1gb11l9ihamc991nnz0tob5u7y80s2a2hdlvoy0qtxqxof63jsrvjks3y7jhmmdskdi2ysbgd1vde366e2434qb0fws14u8fo74rkjj1cqfzpkd8d0gyhjct444os405hxpkx7ytad1c49oy3czfek8jrf2mxx1jblkl2ccxl6jizlhmdohqzztbkguyn0zwiisv1js57qhomrhuj8hig68ds777qr',
                email: 'x85cty56z5flw2p5isozkwrepivvi7ofthfbmguff88j9k3aq2sx9ld1cy313afvourr6jvvgemtalu1os4bkgdzjibokh5bq8ptrmt6yzpr3vtvfgxfw4n1',
                mobile: 'fnraskhyn02scxdt46mqncvka91zrft560c13lxrdfllef7oldsd8zl107fi',
                area: '97yucicmh1fsc09owjot292zr5jwb0cnpt8uqdapvba85i3agqnclfslp7p07dft5asvw6ss2kka1pxfxkua2vqrjrfvuotbzunl0sxqh51d8zmd8p8hjcb5dyurmmrszy8nitt89ihdbtn9jvom4me2jktghdhawgry2ym3john40l1lw6vd5lairt9pm3f8hxftv6se01t1m7jrvoqop2gkyzsdbl6ktz687upjwwhznfbc856dtaup0b93t6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'kokeaqvtp7r33o1i4zhoh6g2hyd2t07a9lyd4bi6vda5vw60mh',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '4sgvscfc39wkeplo5jot',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: 'ha5gmp99tyn8gt5vnamr72aspuqdv4j8a9ef6cegacj9qr3rpnajdfte1wrs2327g43bsbkk8jf8dv0tavl43290clmyooeejgcaa072catsdlz8u91omea9916nabc9ux840ktu5u2zei5jxjgykkk4vy09woiuzejanbm0zt1py603scnf3funce8tm20d2t8ykklim2e1whvc2f0fpxwc1l2vdacw5o27xxsnjnp67ula95hva4ca17sahlq',
                name: 'opeu192gphrouxk50obp7fly3v2ezqr29kmcy2b145p2nfae0vxo48bcpdqxzdix12umlt0khmjsvzx5pnkwu2dw0y6a4ud8xu9b2ldr6fyvzqcazh33i91i2ev0m1fv5fj5lst7ul8vxw0c7a8bgvhlqu3uw1u53fpqkih6ofacliiz4kni5jrlf0s56xnr6wfly3p3jhl2gcaf7k998f2kfrnp4ig280r8b52plc68raqt63w4q9i21xmy8su',
                surname: '9a6bizadbnuoh2heh3jswfyr43y16d6gtd3z740m127mno81n5h0netgu7z87jz1wbzw0x1e8ebxnh4m79ezldj91gzf1gg5gvhe1cz4mfiz4ccgtt1y9b5hdtv508et9eztz7n6t1opsgrb1i0k5crc317tem559x5eqw3zrnietsegcghb849eolghg5p1xgkdq3o1mjbegw5qrr74dbei88pxbcp330lqhx3658e3yxg6uu8lbr7391bzken',
                email: 'aalqtx8zys4tokjmmoc2fuenby5wga2omq8ajch9nacbm4ulhl7d437x9studvd0lvgkfjj8lxfl3iq0ogoou82kc60pd02adp9cw6c4lu784x5kzlyrsyhy',
                mobile: '6pfm3y3xh9g0cwnfvwjugwlz5nzthg5aolbv4io06oennto4o6k3gl61cwxi',
                area: 'hsvesklwv9wq7iosm71g133qab7h51ss6fq1lpiqj7c8yudu7i14vty7amxz39okgxas7ooklvhnt9o30ks1yx432k6ugdguzbdn0fi22wg39re46hakee3fvvju8g5jn8gflf3n29kh8jcv1caq7v76vaifblify9xp3usyazjkz7vfy1r4mfx2ipgglmdipeckvpwb2oag5d6ndo8d73vrnkr5xf9camo4b36uopsbafa4wzpqnev6imyvngf',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET cci/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts/paginate')
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

    test(`/REST:GET cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5d406909-3f50-481a-95a1-f848dc4cdda6'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'));
    });

    test(`/REST:GET cci/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/2015ded1-a9a2-41df-bddf-32dec266f1ff')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'));
    });

    test(`/REST:GET cci/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a216e7b9-ab5b-4d7b-9e88-654f40deb1a6',
                tenantId: '9da2479f-644f-490a-bb7f-d90614902194',
                tenantCode: '0ueksps3dim59y45f2l8145x0jnpx46rbncvxhvify09zfzmac',
                systemId: '640d1a4c-9571-4249-852a-a115d8833801',
                systemName: 'ouegywcozzvwnkvzinom',
                roleId: '92e7a976-f22a-4c59-8b82-0e28af5cabf4',
                roleName: 'xuc2iyy36k3b3m65cftzu0w30qrdgdop923p42jy7uzp1ra3ddgp7aep7iibfoe3xsbz58nrgfkdemohubv4yidi3a2i34fp4ouawlaa1w63wprhe12y528owrv6t78c5hlqinswh7sy1leh86vi4r5ez5ngzcyrnzys538hdui06m5axdxt5w1vjk05h2jx4nf554sng6eaqb79wemokv81ni8b22cdk13e5puy7vu0puuqvb8qxjxhtit0tws',
                name: 'k915rq4dc07pcj16nxpvza2td5cftl5s14246uw303ziyrfk0d3ds29amkysoeddglgci4m0nqkdku0266zh6z44qh1hz063xa71n3757jwdcipazlsr6wjucuzchadkuwpwulyv355txd9cxff2a3y23c67okxmloqmac92ygrf7hjj994cyd7k0k4a8fxe9hoajb7d4nh5w28sbtzw7bhdijzrp2ywdd6ydlyup92drfw7sxfl5kn6cd0s0kr',
                surname: 'pfrhnvv9orqec6m9fpjih209x43u4uopn8q3j1qq2j3hk6j7gnbp5jhq6ddjb7ty07p88r3g55hmldsnfq2n46mcwyollaylmqzh59zfsj8cxqrjp6lhni7xqz574nh0tgp1gmf1v9izita3574g2e47va63e3d8mz1rukqk4egxnxp1vxxyka0u0kkavr347h9e9rj90bh0vxepkxows9q1wt6r3lic6mp8lw6ara4w3oaz95xli8n4xz36i0e',
                email: '5bg2k5l60ntv00wacuzfe1y8h9q2823epvgmda084dvxxqttlz8td3qnmf4r287wunkdvj1s6lenef3bpczjqc9kh5aib60pgiefkyuskzlphsg2umaujxyk',
                mobile: 'mti6uh4iqp9ofdyq4dgwuxch1iuog0r0idz320zxg1dj01hgg9urwbuvgptc',
                area: 'c3cqrg6rndqiu8msmbi5m7l0sf3swbpybxygo9q6j23pcnzmbnzrr0ggwe2w61c0e8049jvb93vals97t39sjjx3sg6wzw53k2nbjmjcgm9towliwhtvwfy47bb7mz2lri56gg53qd4bxw1mez0yt0t5ojv7gk0m2ckcq2drds7kvwib2pbn5mgj6l59038nwbnjwq90j518hl74t5mluw507fqry8o80d1wdvm3sw6ay4zzwdfdpw0gahsm81h',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                tenantCode: 'j2qfxovt8d8555ah4cod7qkmri7l01k1wr1kqcl4mvi069c6dy',
                systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                systemName: '6b259cwo67ztnecv4pz2',
                roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                roleName: '43d2zp68x93rcfl98j1oxialjp7ccqxe3bkx1j8pd4aw2164v0kfd62leggwrvqfd6gcgyedh2vzy310iydh5i7ifc72rtwvu5cpwzu0os2aardnwqtxteppvwrevotelzhg29af4up7157sb913bioemfei39hhrsbrao8y5c1ifkanqp6b9pwok5zng7y8pktq8w0h98t2xqa0g2vteb24saqip8i13vmpoy2fw7xdxhzfeopnlnc3ta9de8e',
                name: '25vctuvrk3ybepskdfmf8v4akq0typ7h60bnr1yvizsnx2tye6w8vmwemxed08apyvxbvnua8e8tlseibremi690sm4be3l4se5oz2fe7npbuqo3obac7xnkdoupaodcqx8a384qh44ulq1u9topuqhox7ihl3ftavyrizg2e5u8mdrtb5ijlt1vld5dk77lq7t38uw254fmmjj7orix6w5nj3r2i7tf5zgdi266nq6ltf7rs9lhqgvxjh3e8a7',
                surname: '7kky0qqza8p8y83kxf6ppepwyrbxhy7juwn9jnncigq7m0ym05kfwc7ah6iez4tyuggunn2evh21kjo5rxn51n292sqhfkgv93q1wl4c3jz22v5ziao8fpwqf22e53nn78cue0nc77wt1w60u6xzo16tfc2stzs9h1c2k1f2bj34o8d6wr8j986gpmczyzsyqvkthup6wiqa60vo1da3vsmcyapgz5g2cpc60o2esfhhhfe8jv89ccp33zdyyhv',
                email: '62mfmm2b6clxvi73aytuglf54oq09ia28lxdgtjl2zacfmmsn40lhudu2qzornff4mcpqa8ribjbmkltpbu8y37s2045ofxh85ia49lawft0et9qzml5q9mw',
                mobile: 't21mcd00ia4a2g1h5vvy270hkftf32uhgln0j0nf06bgtzzeiyhsx7izibym',
                area: '0gb4raso8zhekai2xcgso5ks11p8l2zlm7h1j7fvepvkvog1j9g80yya2vjy6r95mbpt4e7vptg31llpib5eo3jwocwqdvdgx2nibttb7z1jijekh84w3v75s3t6t8jnd6ws6vp0eksxwd70fjo1k1pa14d27cg16g3oxzhnfawzz1drg7wrrkmo83iq0bj8d8gk8ewn9g1763ytmaeszyi5s4647ph0thz8fdd8nlp96ha3992iiyleed5jrpl',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'));
    });

    test(`/REST:DELETE cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/16f9d82f-022e-4d92-bb1a-d04ad501435e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '26a0e766-bd64-4ea2-abc7-856964292ffb',
                        tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                        tenantCode: '4irsmq8fghmpnr5dcyulton05k0vj6766dlahnvfk07mcqh405',
                        systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                        systemName: 'zeq7vez8jo3eqfck5vw6',
                        roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                        roleName: 'sbmdcww354s6qe803ouqv1g7akadxrwxy1fav7tmmugljtsaprus9ixps29vfeiwglivccx5t1lusvg9adbbfh1pqoybmavkjiwrw9hdc2o5vc7ah315ubmgii4k2deejg4vtdyhnl0hu6dyny7r8abzu9tgj653rn9dq97d7w8ugcsjye2gk93rj22un2lzoaxabl30jtlkg1wgju17xvweylw4oc978ijyj4zggjkgn41bc53miofirjsh3as',
                        name: 'gj2xtdf9g4edw5oq28wgafqwx346hj997hi6sguhzkzq0c3m2hhgbgxkx5wyy1kfhahr4ruf9o9dvwdq136p4c7y88npc95ozn6ubikobvrselc66aaa2rnqjgneucg4oezcbpc6rcmd138wmky7bhuohs1aujihsg9ggef58iw3z63fjaftxnuh8cq376mz20dm0ulzmd3d2roybwr3ya4s3kj4pc19bz7dvuyungao4ic8b3qo3092m6lmxjr',
                        surname: 'grdeug39v3fjdi519l3i4scm5h6600exv91rhhs6zk8y68riclt585t96sdzlayvwvtuxcei0d7ehsopdnlpoje7i3iq2i3ksvy3xesgm6jvxg238kbaiy2rgnss5zysvqcshnrldy3sez9rjb82nin6b530c9jexpxppriutge9r6kdwdy7vtleb32m9lb8p2ch11gla93k8agkwvwnn8ct6togwvkqo7r0b2illdwknxcbqmvknykyvox8ieo',
                        email: 'l8rcc5k38r886j6bza4tocxam4650wcn6r14k3xphtr6mk6543xc3mwyqtvokrt7q8lefzq79ez6j2vb95ko5s2993m0b9lvzq7k991m9ic03j6w5h1zdokn',
                        mobile: 'wnvs206g15zdpwar4qu11e70y1zljkc9pjleu5v4scb00knspkstt5xyc2a2',
                        area: '7ye9ltparbxd6adnawvbiouu7jy27aas5x8y50pdnxem8ymmpszregtqsy6op2hp6dweagp4gj5ff2fett9he260byf2i6o31bzcy39wm4zreb1k01cbv25vj7jzm751ruo9l9buy5mihhkpcahwildyrqlawi9si24dek1hcmwisdv3aq7lhvs9gv30k1uf237exltzb8ve1b6or756b2xk4f4cqfytq9vc52rhgf0zgqw3catfhbn1ukxtsp8',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateContact).toHaveProperty('id', '26a0e766-bd64-4ea2-abc7-856964292ffb');
            });
    });

    test(`/GraphQL cciPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '9d2e1893-89c3-4885-9479-b02843ab3504'
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

    test(`/GraphQL cciFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContact.id).toStrictEqual('aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c');
            });
    });

    test(`/GraphQL cciFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '09cc1c1c-2ea9-45b8-af97-d2a2475dd2cd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContactById.id).toStrictEqual('aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c');
            });
    });

    test(`/GraphQL cciGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetContacts (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'f296a39d-09bc-4d4d-9e1b-3c0d8077cbc5',
                        tenantId: '72b9b9e7-7724-4332-ad3a-c43d2639f4e8',
                        tenantCode: 'eazja1wqjba05cjssxthgoj7tpzczeb7uatxk1b8tr4rmtup4m',
                        systemId: 'd8f48e5c-477c-4b32-9f01-ce63063b21b8',
                        systemName: 's9957wxza08o7j7ptnxd',
                        roleId: '7208398b-7cd6-4b05-9547-00663b2ea603',
                        roleName: 'wpxk5wdlcaovqmzqgh4oh2dcirynz29ad24k8x9k1gowhn7y4kkc0i4sf6w25rj2eqya311grnqpcqkjspsgt11gblt4ls3vqtqza6htyixugwmt7e0dgfhp2p06f5iao2kxlts5k6itrvkptt976dup2ui5tmwirykis8rmd3hhqfb1qcnmrfh5jf9uv7eb27xj33tj251nxy6ancuj3w7ydy03kh4uc9u4w3mfi6r7rd5fzf6fmal3c0bai72',
                        name: 'cefi1cp4x7u4e6lykjxyraxerr7pp959u4y6dxzde4d1jnnhjcihchv5h8sjdbagpl0rrq9fnr65binswep8qbuze5d3qdxrbafglmt0lttysvo87m89nxkzt9ehchirzplzjoip25v7jdlll7xeftwi8n476yp9c9k14snvwhecp7b1xd3ekffo1n7f45thegilwhap2jehm3md089htr1bk7xwry2bwcjz5i6j0yw51keu2mj2hjwv9jt5xlw',
                        surname: 'j08cpcs45p33uclkojwox1o0nhrx23fx67m0jby6x73zlo6t0fkqnfg3i9yeix9u5mxlusq8m11l16sws1w6f6cox2n21noscb1uv982x7iuwaberp6117ac2y591962zkk4ajertswtniouqkpnzvusdkylntm3zfglm8k5zrm818kiyov86q1sok2texda83crvrbolgwnt0lx50ehb8m7bml9q2iofpz40svsy9ilex8vmnobsntu3e07kvh',
                        email: 'xtvcpc38k8m2npvmphnolxrnenv1loqw4nqe0y4kxihksqm2f0fh86bmiuml5nicw5sn3umw6xqd51tlbdkqbijly48ingldmywsdxw5qv2entkkuuijv42n',
                        mobile: '1leiwecxixt421m3f9qgm3a5g0kdnsk12qdynh3f2wvjtlqfksphklbcx4p6',
                        area: 'u2by3q0qimn5spmr7m4qibo9y46q9i7zkvrodxl9koh4eg7b0qiweul9cy3yph47fgqk7e6lcddchdzi62qj9vk7hrpz1ddc16l0gobrkd6swjqolvb4hau03q3r2cb6g1g14vfaz9ezvo1ir62am2mib12bmgjv0d6cyyneqsnjj4qojy2bqoqfw00ui13v4nm28oph8c2k9y1c8zq9nm9yni81d150sgkhefx3228dqfc9pzo24f3mn69c8eo',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
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

    test(`/GraphQL cciUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c',
                        tenantId: '607caacc-193f-4d5e-a68c-ca6faf46817c',
                        tenantCode: 'kzcxo9nwkcuwk49q7ysznodyxl52qhz956pujr6lnniq2ugrj6',
                        systemId: '8e633d8c-758d-4486-8e67-7e08429bea1c',
                        systemName: '9qhfcfzwj1g8ashxrhu8',
                        roleId: '22cb7e22-3b18-47c9-9ece-7ffb79b3bef2',
                        roleName: '03gpmac0tvu8r81t6jrr77fk8l8olxe6b8zpbn6d0xnuhnyteci9ndzwuuhratne7u2htujgp82krcmwu8mldpy0913g3g2jdx548q5banw8e85s1g6j7glmi0ay887w8uc43tigxbicvsfcafylp112nhe35ylhl6yyvoib6znhqcmqkupi5372v0u4kgeoklfuqks094ufxqxhdoxueuk3nd31z85ysu7cuhqm6bxr8y669txy62j3nnd6j5d',
                        name: 'dlgc7pvajbwgbou6cua362d8gsv8rqavw1rn708ppenp6ialywpcafkhxn2ebpm75o8mv45qhdxp0i4mva1vn2jx873zt1rbibz4vu7mgkcrcyhxfwofs1dsp331fmh5qos45etxefo152lluoex4m15lbm8z603vgngo46q18e0s4k3ezscrg9o4ago0cb4322l0g6dtfvxxzonsftn7qmrd5kfim85yl1pj7ioer37a4o4gcguqozib7u83bv',
                        surname: 'zx0qcrvx5ijy7i3jwp54s9xlo48ei5t4o14b1y0nesivocuzb1u0jaj2lwdrn1o10zphu2c0a1chsrynjzryumbwq7lnvjzrvna3utipjkubcfhetxw8zue4ekp74ysz0uxtbi02hvdsd69kdb98o2vpir8rnath6hizkacfi2svrdqxikpcjliwhbowckg9jm746h35zhpx2c5vh1q9vy55at7lb88hu9nufb51amzyb7mcum0egqgva6xr1lo',
                        email: 'gib0l69qzgc3pgmkzuf9lfz2jznveuqp2f702c7cujwt40sq9ahqzl314tnzktsx000pwwtq7766e5j3ajyc5qdz1ky4qll9lmfd8l9h4pi3qbnc3ck8bkr0',
                        mobile: 'qf0n7ls9fgfqyvx1ogqljrwz4qwzw0zn0eijn0qm8bx1pgvhqb8t9xdkfexr',
                        area: '1tbtl7stqzb37mz0uwsirmhxi600j3dif8y2rv2fu2dxt38m5f50bhlqelet3u6cn5pdbq3dy5w6p1pv1yxuvgjxq1vkelxkr0r9rx734yosvvpm4m70svi5jrbxynxljp52hk2f6f7vugvis6ab4lklap4985naatbha1tlk417om20tu7ot5io38cmzptd9sx2rdtkhe27e938km8i06za2mwdtdielgxx4vgrzzunv9vy851fdxt30ka2yez',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateContact.id).toStrictEqual('aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c');
            });
    });

    test(`/GraphQL cciDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '3e8fa935-4b1e-4766-9d9c-2bc88eb1e7bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteContactById.id).toStrictEqual('aaa374d0-fb7a-4e0a-82b6-72fd04a60a4c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});