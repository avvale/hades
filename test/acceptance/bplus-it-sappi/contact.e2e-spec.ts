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

    it(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '8voz9bo8fyvmnj7rkb7g',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'd3hw0a07tk76kve6pcl8t7qxglp4hov6vzvrqq0hehrr8v01upuelc5wmhejgunjoy6uwdjvtgbah0hf8be43u01n2e2xzchi4jdve2umo5adrq3pgr7007xizo82xd1yl7ew0aeomzhsrfml52bszikje5wqgugj01wuxcqt9rhuj8ugybbrwlp4h4hs7fxncyvyconmc49pp4eayqvs48jgqfodco0pj6sly7n72ahfs0qugbzreun9opzpgl',
                name: 'yigfof0gu8iq5krdpqumqcstapaqiuhwo9k5rzyym309mw0p82gjjqn4w21vrxfxl4wsnu6jmofxnnytbcw0r43ac8720o3bzj4pw7tto5e4n84b8z0o4ubi2huuob4sv7icfsdxh3keyjwatuw7bnx4vcl83ltsfsrenxxep4232wu7gpxm5fgnb0e8vngupsbfgm4k4dkqe3xyqulxb8f4fdre1f33hhmxnrt5vdyctie92jyo2lzjjhk3iw2',
                surname: 'njsez29avckl4l5wcbh42wp4gz1k1zfzu2fvdiun2trjanjj4m5ycotvhoww1vxs1b9rnyosro5es7gzp7xruu8jxeq8nvn08cpgmdd4lf2tkzt4p84kdfeo65w5ob3muhw3agd3qds9w12xqwoijwv4q82hh6syhiqy93fb1r6d21n7j1pfqckyjp93z113q712n117rfypka2n06jzcub3tx91zqrdf8fml6sdzy39xg8gk3v9tkrr4uzwlw5',
                email: '55gqpz09hne8mz8q5zvw7shz95rtvuhlt6br6hkzgw1wg4cekbzq8hzpjz6qv1jjnmem8hwbvuu4458qhlizgsi7gatis3tm6vq5axq28np8qwwq054vwdhg',
                mobile: 'b0ugyngrfonj9bb2gne29lbxknvcrenz7sifb1bsygolvbp6mvd566pr5ygw',
                area: 'sarj80yltsc4usyrkzagn3zs16gb41jgzty74e0b76ea6aaoo4wls8r5m7nf3rbuhuf3xjl8399ndc0ci0xddnduziq8jryg4mo0b9ukxzb37r61tthnk29z8c6jz8hydoeqn38qxz8en4vu1zy1fh9nbqzv2yza9jklu7f8cwrsgw7knuxxi1vrvzk2lvryp58zyngk8kr4ebesg83uwldu0j7yzh8xftm739i5xbhrijaxqhqgcjvu9n12xnt',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '8ckt9s39i35n6ewao9l6',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'mjmfwjp3aii6sfq3ygjaudfehvi3q7uaz86nqdth443bqyxjwzulry5qsq3k0e75e8ecj1aqtueokl2icpx2ag2lemxvbhnmsfgwglnqo435ozldnag3x1a672moknz8exvjn2aygs0xlmethfzdnp3qmum5cvv0kx7wfg9zneyhqp8kfbzn8egppgj2wtycmvo7q6oxij0kejtz87ejy5mbeott8d1zhv56bbcwn3o1hjcquqxpxjt4oqsag5j',
                name: 'ptoox7q2fyebxsq98eua424jks4pbqy7f41aejuk8cz2bjdv0jcx7kk03y2fp4c0zbs4cwbyvs4xc3aih34x186xkorajx9d4iu52ems3q08kvzbn3sxqznp8ettoswx6i725t0kuuu4d0mv6ug08cfnr3m20mbk9u011tp4nyp14hb4qwt3726v10y8ek99qlq6isb5gz0w31bax11ceefoxeq26ov2139rs4azhv8wijiquiqo2rv1sd1ybqj',
                surname: 'jlgbxoc6f6fo6uoefdmgec0qpk13uadgsisi78o5utr3kx70hc28j9iymstiyy2ru2kt4tcpo9gnxzfducl7tlki44x6rljtk63ripzjvrkxv0gxjrg72a7ravl3c2g6acc39t6bon0sdusu5e9e9cixt3af457vxnitdmw24se9jwfbyv20akb8juq2ohix6gf6dtpmyaopnkzn920v0d1wlec8lput3607fkd8v2ti9mydwsx2erp5cjuzdur',
                email: 'd9h82h9bbakrrwlv3y9p8elo9z2i1t7loaz7pieliax85m3a2brtca3m06xk1ekixg3q1o72y4woj4zt3uymtudg7pi9k7drr6ne9rjxxj3astylqehpy23e',
                mobile: '5k4psm5zkar2bh4x09ke0kw4wqmy0ph01gs7vzgblyk1qtv4pg8099z4hcze',
                area: '7bxgck7gjh4dxnnctt65030qweq5z6yq2vwav1zgz74sajswuyb3a84xmcmri4kf80xr0w5rkwpx71m3fxr2s0h8ag7hr1qne4v17vt5iu9we899prjom4jd1y7li21s51lh6eo39qwr8nqpa1w04unp6mw9jvf0fd48jl5j049hc2f7rynuu3x0ydio10uz3o6jzt36vko9q9ehk8cmyeen2fzxn0vzqi6x237d3sl4kqgi8brkybbfvq0qki7',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: null,
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'u2tpx1yum6iaxndfed4o',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '2fi42140sglcy1wh19kofqggbx3yop9z1t7o7gipet2rf2zqxvqy71hv1w51g05un81yfr6fdtp3jw1r2ek1yumfqiv8qamxuqsjf6h2ykr9sz97sx8mm7gcgjp45q7vht9ccyths9sbsd6cmvpn3uc6i7raxey4r6mmcnrhyp69i5o5fp7itl9gn4jhahl0nycul6vfvmnw7bjsuwydjpg1x84ucyo5cyzzxbyv8atyztf498rdp0pz3h0lsmw',
                name: 'aihbajsbu0lpn1i1amtqxrykaptw6hb5mqcms7xdn6enrvvx44d1lol2bogw4d4mjmav19y19fr7um022v5ls7ke52wjt81k7zjomxwm79ljlc3ghg1upml0lseb8vvm7rf41bgoz19jtceing4lqfxivv2ez5oho0al51n44a9aejoduuczujja4gporcg7zv44tp3wygc9v2gbaux0y75dblce76784gns9yrsyv5et9855l2r5ybmn7axt9a',
                surname: '5phpap3ls397x39gv60i1d7pih48ufbsjqs71ltg6jf2n1qsd1n4yya683kltwmd832nrbjw1gszk46hj44p9mr0hadw5rdv3cfjzt7vfqyvxqeevzheakev1oo6o3c4waipvgwrbmzdhf3i4ujpjo5urk4imp694jc5j43zny2pgfhgbzej79ejiur3zppjptkp28ee8tpzwbefbjrjbd5d6sdtg4h12hpi6caqxlkjhav3ptz9ttkdz3xx7jr',
                email: '1z80pbe136inmk9guspjmnoe7onq9bw0xkxl50k7w4v6ibx3s4x5gz3tc7o5zhx7dipsq4ixg4xcxuamec9ns351gypojlo521ckxo348vc3tsy4ee1mlmnl',
                mobile: '867d5z6zqhuepmdhs6by310wy2qprjz3ceism3m34h1hbxivthy370pbfydv',
                area: 'wt6snxmbc9hnke38ih7sqkf71pj3pgfnmwa4v4btdoa4ayfz3whirp2j6yhqoo170k89u2e5r5koj8yk2c6t7hkrul0muv2kw8dmalv1bnapvzp6zf7sqanpzdrvuy8wbrff9scvmwvtnrqmsix2z0pmnu9ljajrmwgydqltrc96ts9zou452iigluyxuelqf5ual6pucw8yy19s4s2qz15v9ni2iziln7d4tpvq6cg11f3057s5us0duhvoswf',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'fzovobhdq7r6ht6zabe5',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'aj154dh3p30ontcqni32s3aeph5p78ln0xlwm6wfmbftpubxlmy3u4ocp9x1yvfkfrl9pk6jpub9135i0qufkatgkwirnhdrt2v8kspnd8a5g83vq3wd822di0nrv40usilsqmg5bgdq0jy0pnnl4cfkwibiehny8floj5aacw4yb17yaykkq8girw12cjtflbrjsjqwyaazcm3vfgcpd2hva5xhj9ydpysoi1vukjexj9aqxdh90bmdje15oxj',
                name: '4o3pgoy01wuuzd8wmolkuyaaq550uhz00evtlhscmyajgtyh34nlnuwpydkpna0wnvkp4eiepshcjxtghggpf999uq03vnynl4242uiuis5begmu5871vykw8qllyqte9we74tertbhtgupxi98qulhwfyenuijj18nibg68j02jyub1f01ufaysymeu98ofeed1sdjsa6yw2saflqzbfccnnjuydloco9hh399lrnkg8v2tuht070ry3mfzzx3',
                surname: '047cnxmeo625rhywm0lkixx8tv0gkt0a8ent0uan4vl7ws586drai1pa8hmwmyapanfjjtwv3vo4828qap3w5ttqgl6r7jv1kba94orz3mny53ml3jk53jpcciht4icn39mjm7jnwcoenejx7yrjfhfv92n6hnp6crx8u0l6xnn1qo486xtmg6tjv7m6g3c421kks2a8dlz022f89j0oev5x5r604rba6jmhsdq8ca0dxo4gg6769wyz2p82a6t',
                email: 'u36nxjvf9d40xmw4bcd9fvpwhurqkv4in2lclixqqu9lqybkz5lmgiq66oyk6rsafks87p7jpac64xjfjuxkkub4sxq736zc53cevppjonee55chb3d7zmjw',
                mobile: 'm007bf278rjhu1kehvmb0aolkmjp7jgmjetlwbkenmitkvb0qo1yrod4q8t0',
                area: 'imw5upgsxc8bo6ccn26zqicpoo48eful17v5fe2hh9ug0o2bpby17l7fgnk4dt7f21pfjvoxjs50nmw5ddo8y76xk5xedwp5nk6d3r32pf54o6iss2dzc3uq7qrocu2suawqpwfteubnu82dlptbfspv4flqhp4guwouwajbmvs9mzw6puyf5xj894sza4fcpjkwmaopch2tsr6z0qhbhh9ki2yzn90av0jkavqedvpzsoawn5putppevgmkc8h',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: null,
                systemName: 'cz5rn5ju3fgb2u01snsk',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'u7d2vh6iae1ufyn428yqetvuo3403t5qbd84disw4bqhnpjut3bg0treukvumrn97i9v6s030zlvw5bejpwdkdo5u367kykuysqvv6ib2lzg86mg81irwsf2tlyqh3k02nx0iw5zd94kl61svi89kducbbv5j7v3cj0bxtupwqvv419jsj3l32wt7sj70o47s0ebrqpiqv92bm16j3haqtwquwotg99a83hbhxwqatbo1fgm3sp9lxb9ygzflhq',
                name: 'rbqykzcdvnvw7fe9xmlu7m0ktmxg29aivvx6lec1lhzyfkcco6421ye5t11gs3i70r9myrl0jdq9lkwvekf44hy1exjarh4ejgudktlbclhi7f2ni38odi8xo26wv9a6me7c0qlzmyrvackzkmzetfdxir3v2equwmwwobv0hjdsnecwl0yakvo71qyxr1ne45d2rwbdn2lkefi3ybg8akozfaze4l5m04zfqkbro0kr7bxepdlhr7ts7v79wgp',
                surname: 'oz9z6oe2nocnsgcoz7n3upqfbmmig36s4yz8bm0yociqyv94rn2rpkwhd38ka5v073ijwcdtya8b1v4q5xidmly9s3nlt82r6ty0xfjlxrsas0hs1fzi4kqyylu5t3y4xp8zkt1d5c6dxyyu1t9p35ruhlxwhy2xy5h8gz00axj7g65k10u7ofbr6hf5paacemd9w24nf800j001masjc6c392gs8631zrk699jfd7rojumesh29c6bgj8phjzc',
                email: '2aw7y617mh4k36i3edkipmq868ccmgmytszxz3l73lbebn3eiuq6zotpdbdl248htjgw21j1wwpmh5z5czhman98o0cywvwfdkhebwyod9t2pffwzxx7zdl2',
                mobile: '5moc2z0c8v2e7exnknvdqfs1ylvimgs1ltwc1fx7llwbx4mkxxzuxwwqnvti',
                area: 't12sjd5avfshrrjvkif6y6p0s0oqebouhl43r7oq3fe6zv4in77cgeiayq9f5ircsm5gc3yfomkpwjhlxfu0gumoug8vvns8mtway19zi69jf21872cua4qbmiloujv4f79rcr3jdi41ftqsv8aq97kuqwibpjrr8tuu4nypivoyh03of4iqkkckxcctplpzwj25eolmlfrhb47kfva92wxosowav5sljw6hwg1w3mzzkfvd1lxb94iexc1oukw',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                
                systemName: 'llea2hrbedgrf8qsxztw',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'solz2hnwk7nrs8t8d62z7o032i5vsueqegy1e4v0dkvnbbku3r2ow055t994dto1jwzw0ryqvi5nbgyrzl1wkuw31xfkuppwbdxjbivr5rucgyo0tqa1a5bantxz4i5w95dowlbd5uk6hd4c95tgw8np0uawgk2rk71dzlz1kppb6jumcphygenytgocc7s2dl14x4n8ptjmwobxnobi4bao9jq3hb9ntjvgbiref8l5kb48ge83ryxv5ew2eqn',
                name: '1ekpwzgag6vtlngwmz0jrescoxrku2yfm4lneku837d6uoqx24rn66i0zs5nqfk1b42h52p673k4an6yo8jdy81ubuv8jdq7uw2v6hxe64ntfnkb3g02mt0m9dsimmonxfbu1kzweal6541mw5r9hwul98ov4hxe548e6ek6y6at9wlhjs2ur45a2swdkaqzc1tsp41m7kxf1rsb4qv8gyi9xi863uf6capnjpx5wflcp3nn39z4dj8zl42jp16',
                surname: 'a6mg56nmyxl00zi8ta2ub1hhryqcjxbpupsnsj54w1th0aqcm4gueth7gbdtwvgazghjbtjcvhrudjr2jfujlv2bylfdhw42s48ma1p4s9a1nz38i5zclpvgay2uvelfmlhx8l46vuxsv2ltlv1tyhlomyemw3xkffwjav1v6ptuuciyhd2q0115nvfw8gqavg4evnaivnfsaiollqevirzifggl39xrl8vkdxgzllu90ugct7esmt7q6fvg2wl',
                email: 'imvo7pwrdrj7ftkxt9hkydfehh7bnsh11mz3gyuur1hwtfqklg1fji5eelajagmvmgzykprzpi2nnajbfv3qwp5qf0l4q9ibd2h6p40gioqnjgwbytlz4ye7',
                mobile: 'fiiqbwg6du9z7h65mm6xvq12821q80hs1ppwkm7lhax2mieuik67idrt2ouy',
                area: 'pb4cwpcgxua3sccm60tbqsgtr2tll0gf7wpst9gtdg8srx0hxl1tnhas89u385e9qr8c2thox4nnc93fv14r32yrq7ry4v54lw46qzvjz2rim9ucwpxvdd13haf8h68yeuuq842h5rwqq04ojr58z4oqa2scxpaxz87v9vc2mgcrqq3x4we4x3jklt3k60k8ry7xuop3o18kv3oet9kfjrdfckiufrzowvapxe66zo5r08qbrnr5dhrnlr9wb56',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: null,
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'kaa0hv08js86zxsb388r658puwrts749hfwusq2u3c3truox9a8dlx0j60ouajtc3wm67hype9j051ci6hhpjy16x6jr0avln0gj7tyuyy37d2t8t0ey0boxp4ssw8ph3gegd0aakoq4lovn7vxogk1b5i9yzlw25vqf66sbgfbmqrd1zup63cpqqzj716l6lu140uu35c6u28fk1w10vzp42wm532jfc3m5lh4sxb87s7o38tpnounyfv1omfu',
                name: '2ti834c729v1toiwaoua3uzkk3gdz6mpvz2jjrtbptqakk57cljjffb2e3choimph9z4lyyq3wj0ubtk6uyec8px4h3sfll37bk8dw4wvq7n9jsbpg80750o0n4l3rdh2ypeoina0qqe4848sep71lwmw3otlfslfk34hjy4ny1r10txg4sx1ekmjso3jz6y7wbe5p5ula6lmj34mdo15wzbwwfilsh8loty4tlv1o06ywwxaackk0we0580p8v',
                surname: 'w9ll9o7a5f1pns555gj37amh8vv0qprynuh38zgw7gstgxpc94kk74g6z6v47jc1d130nnl14jdlvv8mxzceg9jtnjg7jdy74iljdb403bfvdexleo19z32mai919luyfm7r971evczt0vg3x9e4x1oosbhhtg4g97ekwl9miop1nlkxpm88hflxkzwq03vs8gxji06icljko5sprsqwad4s3wz4rh6zxi9wfsftd8tbv7ck6mvewzqzp3fdkmp',
                email: 'xr5o2itaxlpydg4y5v98z1xmwl9q8o01y7k7hdltsz4msna62bko68l1i2u8dxwba6hoffgmt64snzqmq48pirm13n9e03bkbjfpfw6j2mpq3cl90xg54zgw',
                mobile: 'cvdckix62kyuyyike9c3yt515soen3g3kslo9pajfj6cha598rh9v7submz0',
                area: 'ioouk3plgnnou1js3g40zcw6wgkm68amtv6pfrxbkd7y2m2lyhgibo5sn1z5w5ad23c5mubuej4fb3u0uwmkrulpt8llpxp2mrzdep425dlfh1fei3wyw4uwrkdvki6mtaxhobnpgwj8dzq9638outsnot49xldq9wza7pay6klurl056m12135fzygl6hqly30wlrrn98mj67pjjj3j2pg3mxdm70juo4dqvboe3in7w21kqhp9y66jiiary4k',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '25y8f8jo55dh1uvyibddf1sv0epzkyauv3uzpymvdxb6ce3wma1ry0wj868sd0rbl2ecft1mgkmqas5oy7o3zweub2b39b5f85e230yoxfs2jycvh2jyp4w3brqlf6bmpn2w7huz9ztdir9mnq11sz09ih82f3t96ug7uj91bemhd6ga6pz1rd95t9ctxakbos4vbau38ygf6a61hemhv60goewuqe0vt9rts52zzckez070e9ts1nas6efif9w',
                name: '8se0i51wx0izt9fy2jb6bdy6kwt99y24o19ybu9drffo812rm26584gdbwwt4o3s2simyiu3uwmknftkfm8lhpnwijivac0klw5vamlsk54uek947vio2k3efj19dbzm4op46anlqd4w5h4cu21tnwpjkhgugb89vdtbmwewhvk91jujou3xv0aiwfd0tkbocuy4ooonxcsyxsyguru42ql9mlofnajy69f991zjqdp8b3uhqh76up6v14uvg3o',
                surname: 'yn73tz3y9nt6dh5ge12mhiyu0ot4ey4xoenysq4dzkpadyb9yo4gby9wvhv91qxq603aubdpo6wxz03tfj9xs8rxoornmx6723synhhiiko1gy8pd2ahpb9r1grseyn5ganyzzrdecwnjkrdpzhcs6wwr5zld3cp14583q3t2rilzfnn5txwhbpex8vd2ef06u6umy6kilocu568marhfd81tetzufb9iedgmrwvtpwrhwy36p9lvo8nywi5bk2',
                email: '91aq4c675u6rsgzqnp4bwhuvjnhwb8rpburuhgj8ywntth43s3id0arfb3izuoemrzmweyji3bbtm4uag2wag07ix1er5lkxm0vxq1e9ifrmirnfj5bj726c',
                mobile: 'ijpjw8g5wwzjh3cvps9u0r46u4r2v7sdr8sd2olcxwmctldhbcmwne8h7n48',
                area: 'e067138ko17ufkijd2p7v8e25ucor6hhzjqfv735yhc54933oikii2gdfsb6f52i293y7st0vxwoex4fcqhses3fw9do42404k9m8dn4sanebio0pdys362k0aslhojquyldb91ryibdu6dygczq7t3ahmywt8zy6rnx4i7mmpjbwitg2stvscfsdrpzwjreyqrnaqyzdr215hdapch9mlkyvcz9tlko5i08bhbsp1179qv3j9ituy8kgqu7f8m',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '3f8w8i9lz8nqtmndrke3',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'ppgdz789jadjyd0ojcaw9euyrvcz9vqj90pwu8lqqdwy0980401adyrcstywh8roy5lpydww3ut7wb6veu2y1zwccvy4u4ai3w7otzr8hnezlzumtjaylq0d7dv8hyvmc2pdlwu94rzwhivi02hn0zv22deruaa9dh67xtw4gjf5ouk8f0340tcp771o446504m13fqpzf5fseoaxt15vtjw1g64irz1mxf9gm5qxhmrj6llkk578bnpkm6m881',
                name: null,
                surname: 'u9h3888w4ej4g5t7ntmxg1qha16yyf9wflrl528mpx1jtia8873egjwczyi8aoofjbjue9xypv1gy3gz5i4amqierdzzvg009x6jqnnh87fxgyt95y5ovq4gf0u8unl8k22ruptrpyc95267a0b1ocdwy98e27m85wh6zktnfdz2pkjdx5nygwbcfp13u65fiyfofbglnjf5wjahsnpz3ulcuwy2gcr61uv0prgiz1nww5a7i9oiahpwts2hmbv',
                email: 'virw8uk37qvc53fr6gauetv26lkk8ycrqyoxjx8mrd4nt75wqyh6sz5ynh9gtu70h90scf13jn2w9ebnsk46osxcz31cpbnis3puydanmr9lh4kodso8f7u4',
                mobile: 'w0e58dqsjaola0qj8wakuu42wg7xemeyg37q3iazbyx1w7xbjgw5d2qexej9',
                area: 'cxm6tysdo5sbzjffoc16xiqg094y7i2fu13n052006xqx9jfsd9lf8rlejmdx505qzw0fthg1s9y4d4wbtq7omn8rh3n0omur9dlpdb2agku5mrk4g0nxx82stzwk3z86fkci1rqwiok2hx98013bvjr7cf20vebys974jwjk7zf539jhih8f782gqn29p2zajzpjff87bbjce0p8zmrfxyo4t4dkzrs0ubpneh9eptbhz8yktrs4sq2g5sjbpv',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '73rrcwxoqc7wk57m04mf',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '384eewd7ivkee7lrkk9offk7ihrcs3i4nusogmxguws0ion5svaeunfmodcjh4jonpwcrsfbs4lwm33aln1rhtzwor1g8weitzj25zzvx0r7z9lnhygyk49tqdllvne2c25fv17ojhabsgqv7v227g696jqzbs0jf5zitfd7wxtpkcuj48mlgigsbyhcgk2elwwqes5qn61uxoxq6lgz3eoqavibtwzv9rcuzee8ong8lnt5bbuoaxk3f76cf9l',
                
                surname: '1ly0tozhofi94spzpjgcmz989qvvdr1twwbd8v4mtz23zzsl1gwfva2honpof82elup7upqogm11q2q1bbx6iqj0a5mect4irimt6p1ic0gc93hzhbbc7cifig6zfcj23s8uki5wyd6vohadldg8ptcefts8rl71azfli8ryo4636zp7llo2apu977z8bi6jgb1emwpt1tmfswqe5bu5ikj4qbxnp9buak0unb54kl4rr44k4uuqcobjzsm7438',
                email: '56vcylqqu1kvosfw0qvlxdt0b8yid5vkza4ki7qi1lco1tf7297uprvz6nfv9ob4hab2t5rau4pi6hm7w8xrxm01131md11x5tpre5ft2t2fkb5n6z53glig',
                mobile: 'jh4ajdabpjv74i9mmovamzt1vfaqqi4p8spt0638sait4aomjnhmoaupvpd8',
                area: 'gvdx1u2nz3fibl4cckqom96h2i849nf5l1clqugfp22sbhwwulk84t2uo7a21mdh1tom8ggpnuau3h50a9j25cqz2awj4yp4zf341muyuzkyr7r0x17efkyi9urcciw0ndx95d9ynjkvxib0ig13w0tuv3xsjth4fqo5edu2s1yjxccvqa9w1xpkxpql1ybc9olosxf7ui5zs6dw3wna8i10pd1ktd1tmji4chs6yvrutzg62wvac8fhig4sgcp',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '5qxsfsi9asnaon1yp261',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '4vu33w46azyc2qfso83fj8plfzrz70pi5ce7w1z02tqwvj07myprik7dkmwfn1v3yn0i3sig5eh9kh2fbqluqbjqdfvncj4gks3gmwg2p1fnie47ypjduva262guxy8srp5kh4tee21vtd1npws758saa3hy6uyrnn1ax6c77bgox1fh811j7uqcrxnxp6ck57i5fdwv0clg52xq1j4bhvw1wapnmkb3h4wbedqq0m95gsvivdhio0azcqaxdmn',
                name: '2ahhsas5vot98hqeiehz1a3vkxivtovm6z73wixavi8b1qg70y80grc1a7zwm5h44csw40ses4ksu483b58w5m70jn2ha9c18kroa02mxun5jf1t0n07gtaq7o58aklsyb7i82xe977izf265djlrmlclwqc1bgkvsjrspqhkj7b0sdg1mnr29pthltuxm5y3qlzi42i0t7a958agmmplclie70h8s9tk4ftkwxx6db3mzfggvr3q4014shtg36',
                surname: 'te1tk5vfvewcz0z874nfe14cktmy1l5wpaoa3toer67pr0wynrcln3sai4yex1vqdagytnc86tq1k9egq3oo04atubbau9iriovm683oyhhbe2y6u5twv8r0ow607nbfnlqkw11rmzxxfksg0i2lwabiljqr1dwyeex6c1mo8urrm2x5q40lkajk3qzl9ikleeghf81fs24d3kq2xyvh9ilgoienq58uc3xd0qddrpkx5b4yvcp76lrcv3k6fw3',
                email: null,
                mobile: 'da3x3uybyx96t21l9xfa2s00051b7j442p4wb4tzpc1a4m1i0wp3lij2xtyl',
                area: 'jwun2pc4e0e7u98yq7x7dhx98fa8vr1cogpxfvhqwi3lgwnd25h2fi3dr1oawexlm7hgtrgivspj8qvvmg3tl00auzgd4xziybt8cz58ov15equ7eh9anatc3rulxfek8xs1m5l0iv7vyxxn2qwxhidprn9c3j9hs8b4mfk3labiu0i0vkmb35bcojrdtjkhw4r5nudssoaznnuda3cfzb8xoymohkl9r666obgwjyiondfc7tb6od7n7vrjnoj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'k6rh5vjf2n8uujgierxa',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '8occ2cnw3nipoygpgl6pglcjrsxelpu9b2gkyyos0mmw7qgu8pox7xdmnr9pqclftuwps6klrb3x7buqy93ywosy13wtjb2hupaq47550miy3h08oxiqvma1plkoiqjch92fl58f7q8bwtlsm9z13w5tc4ct7m66kvmfzq37lh1wzre32b4vneh1aezv9suxgpua7iqrcurcadkizuncu3ctl5mepvfq0k2t630wabzqkuj9gfmtdws682bdr7e',
                name: 'xnukyaslhvrnge229760ctaiv4766lgksqgu6vh2txtuuerzp564pmerot3ljxa5p77vkmbirmw4n9m28wnt16vvxi1uag1t54fycuwu7rhe4vf68n3nu3akaadgmyyudzc66zbarbji2rtp8oi7y0mqs1q4mg0fpre95nw35eeaxv60yj6kkp9nzahfwtjv27irhnh67zkf5wlbmgepig6lhh2tzc31h54znjp08mjp4tw4gfdea9hh9mic487',
                surname: 'aso1sf5uv0l42jua8li5vo1tsjxnhd77xis0cjomjunwkgom8pdbqonaj4cnkesq7hcml2o3u0nukzcykr5215cm29h0l3ztdch3y34oksxj15f94hltylwcksl708nof9ap7bhkxnw8y78aqzqvibvu3i6kl2i8wod3l8x21cb1d526i03dd0biu8zmw2nwib2ndwc7fxiplvcl9ykp8hfolkgdrfmbgtjt4j82yed1k0zfro3kd0mv4m0doqq',
                
                mobile: 'a7tit7ed8doifnat6a15skehwj2dc6bjdtvkzaik9a0vtlnburwpdweveg6j',
                area: 'o2x9n14j09z53tl3d3hjqhqyupjkirdn4a6cg9yi1qb8crrxecmv44l5hhonridqk5oqpzmxhgdjcxip17sr472kfb325dpu5s7j55cfn30zuwdb0by2nenhtxjruv3olmi31ryq33hrd99oyzqskbeiazzbx2r9s8eotc7gvpplw8yogxewprssfq334h5d6jk57ddq72qvg3395u6x7npds2h3kih8hf6qa4leqoqjn6rbk83nfdsx4l4u3rm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'hjmr4dr5wtdqry2dsfvi',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'hjw96ts1mglevzunfr8gqbed4o3xzl163m2ncvjdpwj67gjamb0nug3d7d30ow8vbr4phdeb16aja5yb54feugzhki4y11dawux9creru3j66olsznieqmc5tmlvix4t48aot6p960pv3rm0h9sy7q9l2phi4zoegv0fgrzen0grpc4iojwot534r34seozcrc7d1t96pr0ytw4y7g9t1o86d93ajioj3ipneo91q3ltm75w825wwdipi3wufds',
                name: '9tec1r3tkjjrdeit9bi49hn8h4tj1lbhvssfezi553n1bxghkvti0tzxm0k5seoh7ou1i1eyjs49h2ufvhoxeejr0m1hr6wvmcc05emcap4nxe4x1a4kayo0oxhhzslkkv9qcez7k0lo7jzzooxcremnihnk8iwq5uryvmi1tamsynvekjy8b7r8shhljkt1dto28ikyi88m06v7l9fy0f27g32mcq5hszike57a2im4xltljdg1mm42qg0gavn',
                surname: '2cu9frc20hs92f6ry9gx7pwmxhwrtzzva9mqdeip1tzm4smdypyyl6xnvdukhsxp55apg0wky7hynmysyy7ro5z9idcgu62j0d3m2u4cbjc950ad99h8slkhsye0ydj84p7wb0eh8sadwz2vemixv7v1bbcr6b2w2pb0sz73atdbliuj221bqfi1j29om8o9nurxhq6jgjhgujchv3iohzjnf5vuvruzype3qv763w1qzrc46egbk2vzon3e274',
                email: 'g8t3kdnw5xghtnl1rk6g0tcvik4stthx7fbkgamgr8hptuc2l7eiyzngob7zdg7dgrqnno6jxuz5ma8v2p34s753lgh2mqj62o3x6ubw261adwg2081ylopw',
                mobile: 'no7xtlathupg98dbn7ityp64reoscq6eqgo31h2fod5tmx9hy8lxomnm6h0i',
                area: 'uv1pxihp2olbpbdk4lom5y4oh5jk4cz860xwpyi9tye8h0w5euwgy8hzfjgwufvxh56s6euwnegz2jiil3ngw4k7z8d3mqlo3rba1wnv1xau7w09wn7fvt7k7fyyiy3qx6t108cykp7qtjxcgn8v3b4nz1j9ty29d4w79edtj0u6kiqprqlmmtq9x379dbdwh95my1m7s2xdm8jk732bsrycl9d7u8dfmgdscfq53c5qprlcriduax4wwtc5o2a',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'pkuc693elbyk112parx2',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'jzwrgmzvn6f4glwgoxt5poup1j5bmx2pm8od2ga3dm0ys630sp2gsukk9awz01w08vu3l1xkiww2hwdh7ugixchnoswzz9mvafnqgihzmimnjujsmvl5u9sz8bs3u0v7il8cug8x1rvhk7m83tyi87udryfsr2dukt1zc9poslunc4r7p6rp00ipupwbywatvzyspzopnmxuu7zk45p41dtctqtuushr68lf55oefw9wkizarv1k3603pflq5m2',
                name: 'als0llsgzhvopnh9x43wc8uvmzakq5c2hzwc3ve7545kur09c2hhfi508uiqwr9ysyooz7p65rkv9ru4dprpncy8xjp2a772cl74dexnl8fi0m2znu4mfugnrwgo1oaun50yztpvfpt7jl78b5on0wtdzdyc41o4mvneh5gdnzxny37krk2q31f21jo053yl4fjyv8vlnbdtux950hppo22pcj4hiu1en3izat5ctt4wav2mlhafz05ctle5qbr',
                surname: '5vbcwcw8r4lhhlk6npvjzgraa2jqao5kw6fs47xz9cp1w2wur8y7c4i5orrktqfq08casrsgl99kypa19rw7de9oelcncm15jjzbz05z81i8277p9g0ut3asnfhgpvfve3jlhc2qj0qj26o1lr3bnr11uo1wdulvf6ua3rppsosy0auvkxuy686tx64m5q03yjzyuyvgendbog9euhm98pmq8r7iooexryivyav9uhqtstdnq57ittt55jz8p3z',
                email: '10uc392m1hzt13omxtfy2n41u3q6n0nuqh8p1kw3pd9bvm47ro48es035omg8niyvtrksc5ip3e6x6bo4rrjg16dxfe2e54x82ozai1avfojtkh9wcmru71i',
                mobile: '8gr4ucwln62f87bn5ayzh5a5yhq0kag85ort1f98w1uqpegisifi26ihzwhc',
                area: '085nbl1gs4rrjisuvhw8l7wdvaa832g74izyd6u8twt5vj90xngyatlnoc63snxto8pm5xypag16egzat8n8obf458q3za04jgvzq2242nl49j39rb1sx8l9rej2udhg4fzbo5ulylkz4131tmkj8b30onqkabfrqtftf1bko5gexl90bu4hpbslhcsvhzlgksa8vkr265pln90yuvngh5ly9v6zwt9cdgcwgcu0l3zx1r8czjv9xie7vmipgkc',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '15svjwkg11mo7ocm5ylr',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '63vj6yhk9xjvncijgkkkfckr4139u0qtx4pe8yv5j6rha1nxkcx4pazc4x0gqvsawud70k771ko6t0c4j8d4avmn61a6wndu9geiqq9jci3yoc2t9a20kmbam31qnmbzhi6k56t5izijyhnfh6icnsdsynn3mo956n4csu5d6am99575krmy10vun0gbhai9e8b2lh5yts82qxu0cszew2jorbrg663slwwicxeamw1mtn7ky5je0ym5qj3q82i',
                name: 'h1gpn9mo3pbrereqmbxrtm6van9myzysxdj7qa5exhg1tu3fl253t9tx2yskpfypjrszkg28l5jz391ajffxvx7cxtsztwsohwuxv17x3hrhqb3vzqjjycmdvn90ttreonyrk9y06uy3xxjbjn1cl767dwocdrnwnqejhxn42swisxzzfp8mge65ds7ifxnngx6bny6q5zyazew0jkqsbbogaj7l5s002a9isq1hu62ahawub20wd3vm5yn1aoo',
                surname: 'tk5j69prpdllecnva45sbukwagjbdl2p5f37wfc00dp8xa04xwbqss1x7hoib7kkowsaaau6yvtdary6u53l9cnpvirylujbsgvop7hacgeonuwneo8oua3hn8yxvm1dqcs4tzwdduj0rifq7t7p6n4eockodh6r4mdvg2v0myl1m1j2c6z8a3zikdxa1mzkkqov3fr0d32k65agndhasmkop5yk81borp2pss66tq20wxskkr0wo2hha5tsdx9',
                email: 'jujvqhgju4m8vs60w3fae0a2p4x0978tbzkemc6j6k6sa4x4c7jfeyeehk2vg9w9ikxptkra7805tdc3kf16e0siamlzsjfbel4g62uqll4isocwkbc3mekc',
                mobile: 'tgxw2uc1cko00c6wcsg93evw8tx4tg9wwy0gaemvu8a289c6m49jtgv9q3o4',
                area: 'e8m2s2fabibik7e23sgodgsyaqt9s62ubc2gttssw1zsopgn8fzkmcbt27p31194as6cte47afkg9dtrv1w37nkabndgslnw9tl92fggg3rlwn60csncnfu5adfmwlhxpk85yqyrgmscgkkprb5cp141xeuzbp0e7ivaqw7yj9bzw33194egaqp7wgaa6sgy8a2th8i1abfd510d3308nrij7jl6cfwx3p2m8dhjdyqszfc8jjkdhz40h2po0rr',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '1mhso0pyg3a2mg7qhiy9',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'n1bmtf4279beztm8dh8vksczj8iz4yviq90jzf82pv6q4qjxoktbjndvxrwvdg8d43iwacleq5dwgfd9a9p3umrmq6rdamhstn543dkl8mb1o8zyh8d24pnd3k5xszv80saxkvwq49hr5tsgost51i3ysu6h9j5eaikt34jvsi9y7zjjq8ywz9s6necleu17h8sgwopsx8jwpd25wgl72f67pojrgie4grsh04q6fj1zv7x1rqnevmm10hsjk93',
                name: 'pm4t3kjnno9qmm6o4f2i8n2vcrngdbsx7r3hy8aszo0q7hahgzyw2842ow5ekbz2jfpj7ibtm6mhmjb07sb1bnjpvoualuzk7c9u2mx4fr5cui8gtvw3ul07t2ftrek3anugcgv8jviz4moudiq52pcsufp9hw40gcpevb56ad8ciawaj19j857r6shhz6cgnwml1ngtpbqbvlbbykvipyqd1p04coy17wi619t1c0ir5ei9ex55x7cv65tapyp',
                surname: 'fu9l4s1l7wvm9vyqv6oxv1yjh92mncv625uxr4mv7rk6zvadg5xcp6s1gwslx8rjjkwkz4noht52h1lbnzsbx9jdcr826qndrrqhcd1rrqsp0c4glkp7isfsin1qru1f47bahylo89p65qe1hq49xio5kt4fgdapqocjsrphvaicn05fe6fv9onzdl0kl8zgftwcswm2g5wkdx73gegryh5iwun62wq4x0rka6ulxu6fr2ewlpa137hlpvqyk7y',
                email: 'qslkwv0s0zyvm7ckdu96vyoildv0a92819cielia2xfwksz0enfy2a11t5f8vzjin2l2hjzb2lcj1aci2qxoq7c5wg7t1c5xof4ns3uwiakl5znsup20b8a6',
                mobile: '5nwnid57e8rcdwgnu3o0flv2uz70nu9564kimvnycdlwu0xwyggfwryulxt9',
                area: 'zcgdu8mht6smdnoywq2baug7yd2gwygjrjw9os2wnmbpmlnlc106vte0g63uik5ldz4lvv5345v6b5iydu3zqwaxltazchk2eyy1o18iyw5atuqyvia0r2hazq8sp4ldmopg9fvwzkatklvic3x2jr6lzmyxybruln57b8ce78jierbj176d0nsyvud9nhj0yeb4mc1tu00if2x9sgsk0us1wuhshs8jcejp53nm84jec578inry0f38vxts3n1',
                hasConsentEmail: false,
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '79uukjkayvtiitqhnex2',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'nclk4piln554j4298yujxgw21vc247nk353rfzg9teedcv9fk0bnscj8wcmxyz2wlglurc5cxz8u0ztmfimgnty940ggkm0vxa4mjfwhlamzvsgtgwbkutn7k2751jnbvikx2xc2lxi9tozpp41w578h5iw6f8oqa02h1psx4rbv1y2nky0qaplw7bdyzo52yrpox7srqexjyqz1ftd4oi2xe5migl4duh9s1umk7hqxfmpnwwpbpywmtp994u7',
                name: 's8ys8849v2jdld7uz3q9ceuesl2xrib3kfl848niz8v50st9drwtgacs37q0e9b0wg5f2ytfsqtbzx0sxbp38hm0au3a756q29vp23zwc059ak1t3t7zmv33vkhb7rlvjkv3hnzsz22f1pnfdw9c9qdg9p4bn66zap8hs05m95hkn0eckhlwanzvs3ryvg22yk4v2qonn0ygm0tcfdou1d8ysg3ydb12a1z9p1hfpkiflnopxpwcnmkc26oilhl',
                surname: 'xefrmd651p9hg11u962ms0o9mo361bxvj5otv2a4ih2dhjyao3o0iq4xqdito4wqlm7xtu2oif5kkr87kgvx8hpnhgvo9fzq2u1zqb0pwbfnzkke2zg1dhc3yssehlhqtxjxvols4akr2oimvwv626930qh1uem6odbqwjo36kw9mnd8edudnfvv31uz41qukolec41c6vo3ajzic4pv4w16l20exomq4v34g27128csetgnnwhbc34pthbsqcz',
                email: 'j66vy140asf41eefjmk4svn980dm12p3qu71a4hvqq1v60qf9u2bn20s3j80tkhicveyj5rzqm0w6pldu0rdq3ni2x5ikj2e07j0rropkp66mq0z60wu9st1',
                mobile: 'spg004upkveevks6q8gqed2zrvgg9reerqut7j8imcepbnl9gtuy6tnn212h',
                area: 'k574h9bjq206td7lt43zu0kdd7dowygu8nyd08a6i7qazjuqs8qb7sohrbnl84hxgb5tydk79xdfg67fudtux5mluearwh7x5mdpxvt20aq2en9k55nko3aufhar58h8yrf4ngtmnl8vfbedkm5w5eztwyqpfd7nnyo7ovvab1b3fkkx0r5wpk93vv3805kipsypkx65x3eahc4l0temfsz1kniuw2t37dptf7jykkei2f8mt1wgf12lrepw7yo',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '690wreefl4moigggl2es',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'oeufinrgr6wwe5c2zd61xogpoh5zc6cpm8lqxrgostr14jc2srfn8heg3cxl570sut3gv1njbs0g95uecr7blto21e48dd9cg22qf9yzblqep5nfoaafvxp57lk3xv919v1hf3udiv1rv5vbvitkfsu2st1kyoyy8xx37rbh8vdw780hxll16or5g7lavx150n801hduxqrjb3pg3sdt60gibi1ulxn7ssakynbb6jskkfsn0rx0eoqxkbw324l',
                name: 'uuvexy4pmfnllcm5ux57ddhfkdryhk74uqlbrxvweuueljhgoty8hisgk26sk5kcsw9daj7uonzp3moytqdig86xib1a01ntqms3cy4yng1d4j9g4j6l5fxuygo7zip8kly5aki8yhzdram6lcccys3mywo46wve21xbl8osth8au8w092q7c8sv1ce2xjmq5rga4clekkh5izq9pupie2j1r50n2w2l9tbf7npqzp4iu31y8wpfexugc6up3gt',
                surname: 'c0xww1cj6ywuwmdd3bd5r4qz9ku47qhe0509tu2kgkiu2fhzf55jtzsdzmz1j5ounjea4d6wkr6x2fvo8wl182g31j6a728l6cib24xcgjpur3sph7pyslczk9obb13twjl1g8fvjgmvzn4ac0e5yrhdse9oqmq4zznh0r2ejkku27pk2sqfna0vf0tm5wa7b65mf0212ohozh9qhkdxlz3230mue1bq3s0cl43mx3siecp3vgd9c8028w7m5m2',
                email: 'rmr5yjure63o9sm6zimi8xgy8ivj4i0tetzfmjydj1htz1o1g8vyg6t1wup5a5764fvvln64cjq6mjkjv5m16ati3q5tqjebj7khq8cpyxgfsktkvanx4gmw',
                mobile: 'k71foo2g2v03nwi3nu8sq75j2pjcncsforaw81hlohnod65wa0e357nfr6bc',
                area: 't0z8zkde7s2rzrlr6yahlap9ksnfsoetpixhoh7nt2q5q9ed2s7ot4e10fhhy7wxvcrjru1etmc4xv9ye5t33lw02o17i2y5n6ng042kh277p78xs6k2i5ov8iu09x8zeomiobovdciij1ebw5rcupa82lq2nmdhfhvngpvr9r8etpgk61tiieyjjihlc58bmrhnhsky3t6w0kstw5azii9r0ymij6y35e509h2r5ytu7bfwel705premvjnoo5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'agcx1c90n0ie8vul9gt5wyz28lbokteh5h7w1',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'vx0wki2vbdouw94370rf',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'mvtbies2whflcexmqdnw19zgw42otgbtq55l387souz0v7euqbvu3wh01qzodl2zsam0i220zh1uxcwhiglw3sxirkfg2crc1cuei45yy4ssh4t0l4cwuvgcmivoynxrxrrfrmtz4u5rp7tvotpsa5j5876bm23x1ieqh76xp4zc4mhe76r53gon8nynpzez01ki9vql2hzrb5qwmnfdsdm9t1886hnunsjeap1c9kuoxp6w709oikevrh6j926',
                name: '47mymqt7hs0y8mghep0t8m9sc8gfi8iozkojaycdg2uv7d0odabq9es8rqb6nus7qeg28dmmsfznyo7q8xoe2z7xverb6h5makxs4i6sjqyf4v5qd3y1ef8hc39ygen1ioawsu6z8vcg0b69aaz1ml5a8yao77p7w4htoa8sznlij4k5l0fo9ksx33y7bga20wdcy32715y0i9x76mw3pscwycwvtte1agfkns1x7tbfyuw9x020atpp0o9nv81',
                surname: 'k3oh4t5pb4axeabqvtsgwg5dd21ya2u6ker5hkl6bm3x3669dp0ew2zejjtdmcbbi4omwuzf33w72ivy34kceu5czwt1zqwwzhpl5gzng0rl6bvo1un8o0blexgu5sevjnte93on49uy3zwzicfmj34ruirweniibea7cur4tc8xc2kafwcnz8mzlzcinlubuhsuvujc3z2bwwm6vdc60doz12ln12kuirfqv105s5svtplwmw7flpm9ijgoyem',
                email: 'f0bmqpttgvbjkpgs0acare7noi3uehce2lteb9nlst5v4ov8im4u3xn0rk5gd277832wkrlfdqhsjsd3xppzkvczyql2s9yz1fin639plsfqxp8l11wk2zl4',
                mobile: 'okr41bq12ocv7u6cv648i96pucc93xfv5w8gqu68yh0wp48h22wmy0m7jeef',
                area: 'iy3m9jxoxe3m04cw9t51gkgx2x8rouxus5pi87568p215xzag8juow19t7ue76bfakv02oefiptiom4r4hfzstewjxa2260pxemecxx861yrrndu0qmzgdgqsk6s6k5xmeeqdpyfgp2qglx46m0xefmntr7g3jotrn6ybx8ptfuisyft3r355v351q17f2zu6hdo449sfuid2oalme13a132f7akkfr0b4ou20rbq6pv8rrncos3j4wzdqrpqum',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: 'mdr9ib7sejispdxbqvkcafxahbmo3niffzzhn',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '455weepbw0dt8bi4yaws',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'g9fejla04l11qmkadc6oosvqb4gheoce955q6ehnljof2amtfrjis5b26gdij4v0lsgd4bjxnrfjout7wwjr7iyc0se5yy554zfidstqnmej0afggoz6ab5l734jiy8e3h54pzjcqp8y0nmhtzhnlp2i9uoj0uzqq7z5if8z0iurm5j9vihhclvyutn0slzq99o8tpyg6e5pp0gf27uqs084du2iz70irhtk9ii7tv6qn0f9h0jpqpzy63le600',
                name: 't03dt2cw2gb30497b9dnkfqgx3rms3a2udreopo5t275il4msg3xhgp7adkoa6ggj06q35xjpd8768f49nz4v0nbxsu3rwa3yjiz0dv6agu8l3mn81kpylmy9hvyi1iq6dj68x4asfjwbkn39ywl06bbib92altw12va4cyztgegdn85dznxdnaiehfgub8pkr5zvgmy7dnepyneuluhao1a41in4srbje0402whdwtfpi1rrmx2kacrxfokd8r',
                surname: 'ecmos47hm4un44shpzcmwdpl5nl1o6yubn44pj7ce3mgyw66wxrnegigfr1dkletip7h45j75icypas1q3o7tz8ydm851z3lim7hmpr28l5y6b2q6esrdvse7k18g7ydfar9a4uomk6q6fl5m7sn5eo9wocgcyf0ib954kajcrtampn132i9j1kv3ry4cgfajmnqk7ppwnn2hkdv6ibigcb9ffrclcmjnyh2i2gc2vgq14kh21tvkyjos4i6ayz',
                email: 'utwntrrr80pfua5xshcgr5ikjfa2upiftqe3h1g71z01epv8nld9jb0gs69pot93t12tsu9ai48wz007ida3ojth7ghd39mynip22u9e23c87b26q06bfhjc',
                mobile: '1m8feamik4stkjw5ek2ejt0fwkzwkripw1wpyipyf3elzx0irlyobxptcf33',
                area: '5f6xk9nj16hocpytqa3qedjos2m7sqa7vox31509tix2i5k4mo9pzxyxd2t2m6hxj4zgq38f93ac7kkrw2ylzoq8a04r3wt9wvwh3q2f7enxudq45ydcolkgrjp6jiwighj4kfih3tokcd1lanxl7182bshahyysen3isjrswmjld381etjej8tv6m54so1u0eyzofi8wh2ea4ye7gtu1dm64orp1ciygvf9srlpu5qtfeccozkgbtqpsienlq2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: 'lusxdgtstyir3msma6zj47may21loye27bgq1',
                systemName: 'ke9q8lakfl9qjlw8rrhn',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'fwgy5t3cwbiyj9hvrah7ggk3n311d8wyuyzcppv002pgm0ny5apse72zvx7vuz5107og7qik131w808p1hqj3wdajsrecclsuxebim7r1qqqxhk3ngeq0cxwmfmfly6add1utm44zif0iwkbdpk8dgf6v8uye22hnck2ru0r9zlq8b51z64njl0ez4wnlfg1us1l251k73jxn8ple2ocsynww7hgk00mj4ry4gut8ggjr6k50etoknhmyiq4f7p',
                name: 'o9zkuxejmfcmcvvt2yuxp7x67e2zxkj28rxrv5fm39im8ib7seo8wkfcwqc78hovx3edzta994rcijxq506db7feh5lmg7af1k1a92gbi3z08aoc2sl60npmg519cm94ee4v2ld5xxws4kte8nlep8kc9fe9trdeo0l2kjunq5qsx6fwicr7g45vdyzf5vo3a1i9enh4wf4rxm5vl4461kgi0kt7moru62thevk1rtxvznwwy905vve37z7tcrm',
                surname: 'w6wre87qq28zz86xucb4afy4polb7bv2l22bz92q8jsq848dluo0setyic8hzbcljv2kzslcgx8e1p7505pkcxuuplot5hg42h26spoy1poklb79l1d3cje4md5uejvkfr40p5clw4wm76mmmoewwlqakjlmrj2n02f2lh27b0uay6fvztztvnofna0j5kpwys7ogv1vofm7ip04bulc8tyhfrgz759sahls52z6j18c6jtgoqzik4prgmg2gds',
                email: 'bfs33hwlci0zpbfhpw5c0w2adbgez8qn1g6jbt8rj12f8llmvapedkt7xaidpz87kzdqxdww6xayz57143ol6vn80i4u12t9o22k3ppaiy3xorpr913s5o4u',
                mobile: 'wqpdb3mlkjvksawtj0q2i9cywfnb9ce1uuyu8wh3z75g4q5364hqzzs37x6u',
                area: 'u92mp3hlnnsu1kb9jktf50515sxsggiu3tnym30rrawwr92nid5qhn36bllvgs8cjajks0zyky8wqwdkcczpgxklbgxr5t85gmy9ds0tv3q0xkp9zkit8sc2ylp8wqb28pb7c41hpuug997d38v6f8qaw5tw99za1w94wz44ff0f8ns9aje1y533qrpbezjk9s1d5e8w3x902gv94ppb47gb7ri2vkmoy6w9zuxfr44n9uymzu2fbtgd2r1e0f6',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'nppf8x6mvtplivjo6qhk',
                roleId: 'h67r19o9quvxga8bgios6o6095ujsdp40hszb',
                roleName: 'rn00gexcno0wideeeq0uxuy5nw5fteri8ber0pludme5bgry6nhy9c8264ovkfxmsnq9d1goasrkghty50i774gdvmkdft67r4ml5zeo76c7yz4x50bvm007j52o0ec6p83ivmkmys7tot4udqcbkv9y23yjrdkqee3kymbtn2kd7dn8h71hml61ke1n58z3xh3ef6d1gshmtuzc17q0k68oef4y6czlxn6y498d89xh44spsdk7r4c0cf8txjx',
                name: 'wv4auop8e9tuzl6c8adla8eukd5qa75astskrm6bhoo3z17jj6knwaz9hgf1r3a0oiihvpd9561pwe2x5atdacrr1uba8ep0rjwrp1b9t4bsd8vypz5x88lznvyzte4r8roqnqo33fth41unj7mtho6uvu0jptzageu5b83qkeb1rl5ixkmhttik0amdkyx2cshszw33w9ylktw7z57izsf69089sgruxfqvs7fbxn55qr2nrke1bm3rd28ip28',
                surname: 'ygtfause7ub6olfggvjftv3ybjrjw46s5vzgga578yz7cpnqbqagexqmhjleo038b89fwtjvntgem6x1fy83ils9zy2q5e48bu2sfo4l3zi8nk3am9s7n8trq7994tbqfv1wg5lla9uwt4d4tvdmgp7zihz44cgghdpd29fff3j6qhw29usm3yy0tpebeabhplpxqj00p4mfr5m8h2cpt2zlza5u3hne8zg00wijgehaaz07kxmb95v6mu8odhy',
                email: 'vkprzkq3gc0g4uqg25ox79whmli6hbsl2423grixfpy9p7r2h8jmyruelqmm1qulydkj7qfcoxfoxxndnzqlttmeryla8vssmjbltn1co21hrxvir3j79aaa',
                mobile: 'x6ivjy5iy5qt4dmp4rkxqwrnjajf8hx9f1lsa3vp0pf3o69y7rw1b54n2vds',
                area: '9rbu9oy9kp1j9jegvy2b9513xw8rsvrjtztjio0r71y48yzagau8o6qx0finl1w9zrd5orualktonniak938jaxgga7znox4rwl7fqeikneb0791kbdv76a7lo5of8q2nwh49ju0mrgoklo5bzlrh25vp8duqci6o0tbh2u6m7ipx8n8lqamqvyg8d1wz6uvq2gxd6xa18r65anli4hmfese8e58epibgzxesdxb4l807afg3xffk688fs3x5d4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'uhb8gh3d96z5r6spvldrf',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'ho53132m9b5u6phyf6iw66luj97kf39hsvm5dglmej8rzgskan09y05ihj5hmmkeuyq0b7m7fz0r6s5fy2ykxjxr1wmjdvsqfb9wo0waul21gsde2mwkpey0lb28yeng0sxwg0uf1y7rfdlt3ddxosecy9v070vlp0o4jskcnw8lb0o34bums7effzq0g1z78wqicislxxtnpoou8ano69193ywq5u1cr6lb8alimclearr5ylheof4mph78boj',
                name: '5k2vtoet0uozg3p8qenrmhgxlug3i2crtpt4uigzi4r5o6o3zwwjv7jir3pfcsfncqsudfu082avvhbxec1ixgqdfhd48zmty98n8b04yqxrgmdwohbilahs61eoiauwfd9ztw9mn39t5zwi1yjxfyky5nyolrzags4lb8tefldpxhhy8k4myo8v2ugusuepqh36vl7lf049592jy89cv0719wnvge1ir9nvvwtsdhyhg0sb9wr0j2bxz1wd26u',
                surname: '3n2qfeh0b06riuem5xehyzi23xdratnzxbvv0zk0kfit84xbsw2wyc5pxu4y8y4hvcueojmheritbw3htcld4x388y5w68ppre21ixs6bw3qx1tsewbhdlt25j87c0dmy9175qcmzrasycaayypcjwv96mn8k5twzcvkmktotcj03uh8ougg1s0g818eqkvwjibit9ar4exc9613l6d2xuibduq7w83gemjxckjgahy5f4fyijby0uldtqqf3gr',
                email: 'hje530kpj1r32pe3g9jtj4t2kvkkg5fktbp4ufjgy5teoxk2j0bbqr31jxpq0z5wztmdjv2zdchxkqwvsc9a5tg70v1ev0wy20hd6oyojxkzx5jsjuk8o5ij',
                mobile: 'cz1gvewhk8w7frwdjcjltjr4bz5ot7yu4rqzxejasb3tf2m9i4ff8t3webr4',
                area: 'qvsfs1pavp8xlf8pxkp0qq4ypdd126vqskq3vz3xz49u5yod9fi256xdoelwyo9fd7j5dylwxtcoi7zqz6xyyluk6mde67eo6k9r5iw1grdoeqszt29b81laywnzhe1574vohfv7dz8xrnbvxkqgr48j65kgeb6gffy8d001zif3mkc61hspqps4keem22acti3mz61bvktpbee8n1gm57qopqz2ufefgruhqguvb192isj33cx13186nztcuvi',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '0ia1v93gghtt77n7jrvq',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '53m8dvw1tqam84rmt7ftxlymqsm72funju3pdtcvz8ndaka1j11fi5jp60den5wmrjk2u7po4k1848jp9naaiq2508gidr7xy31vzyqlfwslxxd75h8csiduqpts0ev014gmzs5i5z1xv74bbo78mfobk53nq2p12k9kjxfn4q93tfojo2hwrko6ipoacje9nto5nn485wdf5pr5fz08x7jfi1isf7ch3cc8ag91z8d0a05lqvx5jpo884wwy4nj',
                name: 'hnfea5sen8vhnm4q65uepb3l90ecucniropvjop6cgyk1gj4xkvysu6q5d6hlolzzxxcbak2ppkqleajfm7ww04zixjgkokh26nyy4fvlgua7pwtc1fsc3c1ajcaw1xtbapqp2uaolbz6l8ixs5rylgtm2hf1e5mk1ycthxfj6l0878idgb71vzbtxscagkskfk5yuzn345sskp2eejg7pno9cb64jzhfkzmkas1acmz4xg2144t91ji0yrj1vv',
                surname: 'h30h03ch0ojdydcuv62mkjzrlpgzb8z0rpidxs5sm87955teqwju9z5gbwsg7942m36uvt03o8bdew65fh02cily2zv48b4agg5zzdvkds3ggchs65urgonv0jyu45ktpwmgpb8hedlja81v1qznq50e42coo00f17ksvu7fzuawyb6tka0mou5yv0rr1ns7iwz21g34r76y2nzli791rf86mrssvhvdkrexx7b9qjq6i6hq81ap06ocsz3toy2',
                email: 'rpjwq0hs3k8sjohj9xinr002dji3xksv1sgccx4ys7uidcz61w1v498u9r7r0kyeaugyydrlrg5vd343invndnrsax9n1tnhjdk24rmuh50cj3wzi6yh1jbk',
                mobile: 'nocpmn2fq0wi021tshwsext3pz8vtxxw40knsu0o0asyuzvajzwbw521flqb',
                area: '1m5jacyxrzmts7r6yyzc8vy5w4o1vbedhusudraepip4wjmqvhfe4c2ismgih8epzej2vl6od09476m01521r9npt4bzhvjoydyugeg265n19qnq3sytjl892w5cn6xqytpa6x956q94e5x78qw96gn10jmlx7o1cc533t78r2t807dfkwu313przbdymlxybahecqulzexqyi9kpvwpb9wfa81zhiz3qgguwfsd3yevtk3gcjf2fbladmmvr8p',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'kztxhvmo5qzyl4d8n0dl',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'cxc5tky7rac6942ucj1x2hv58bmo573nfnlov7jfafi9y3iljp4n85f6o7vbis5fls2qc7v7je7vbob564alnveayxg4t94uh8chx8hnmxicla7qusvu1q8rk9lpyrtpj1ivssmq56hn1bh7x4prpcjxw56pbdpa98khexdb7zpheku9435uegzdkw3558sgjacx78rmqack8vmuw6gnjq7bvcolcstnt8so529yfxkyey7kmy4wihftndk6ma7',
                name: 'cyblua4xp98ns9ocjkl5gz30zy8pvozut1v1tyzrop406lyqf83askpd6it3kejch2exj3ravsqeei99insuty6w5c6qft3pfbh2qz15tqxugchj6124i8iztmppuhpbdxnu9l0w6b12xgfmop1qsbfq9si3adrfpezsme2qdohe0wxzezu8wsznvxcs5fqgybovkscby9mw9h3eyt9jl9r5xx8p2yo94yyrns1aw5iw7j60ps9zft0xtj03iqlz',
                surname: 'w4op1zmcgdq7m8xt5wtfon2gxgrzh9ee2ciyrmy598zh7aife99f2ld4ror8yxq5rujt51mfd14rm5owmwdvi045th2sz94unwv4h1j9tl15ro731qvjylfbaoe7s14o1ruxu19m371zm5gkl8vn35mlkaqn7ipqddz3evfo53vptge8c4v6mzpmvbbo3q2vg9u7ms3gkx9xcgo4ycpq7ixfzjqrtwm3uft10zzsgydpns8buwevx3yvi74loee',
                email: '94maqqmi4ame79o477cybqpkmuyfzzk54cjcc8fts4jb5f3a8unqvi936bxidfi5785ocazw06amwqtg0rze0fc2u66p8kq3w93oxci425an2y0bsg2mcsde',
                mobile: 'zzi36ouce55tbpqnnyy15bwvah0jxw75lue1km2rwlmivgz4xjavf4hxx1e7',
                area: 'a4c552wj69bazrd4u0mca3dmchm3f4kllii4pzc9o6kx813zhct29tc4zdo5ncjo6lz7mqgso3v7axex2h1xr9pqhekq7lk1vs2z8ud7hcs8hg1x6b16wb9i9wyt65fg1rsm2dbaqcyyamy8u4ltr1vng03rptav6b3cee72rnwjs3fib09f23c0e1nedsnbt10zmu4j8gpoql4hx2xylj2t5imy92a6b8njlnxu9yjw36r5jhsmfxcpfrkshab',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'p6w6ui36ul6h37lhtz27',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'n4hz4jhus8di0y6nialxw2etzd8v3tifsq193u1lc9b6fw2j4omlzhag6kq1s0o73j1ycuob7ngcs7hsjk0etabn2nxwuqjzfz14lasy0hsu71t5hq6gen24oo1domg31f3x5lt1jppa5k5r5hn2qvlaceqntmrgvs6vm5kztaootjoic8jcu6y8rgt32825zi8mb5bbnioplh0nwyijcu37fqjfix6zrjiwi3emq1rjdvo005gujtgxwu6xj4y',
                name: '35vhjtt6e4ixa7apo68ficdp6phlcodrsqtgxvot592sl6yxb60p8nqnrzj8gv6jw98z93yv9kodltg6t39z1x0yg4ht8vs2tkx7uuqh1z20ee84yddqdm5ik47nxnd76c9am6uvg9okbjxojm2p987gmtln7go15z22m4f2cvfuv9epoj511gw9v7gj6xjltxf7kmfck2nbxtsvv2l09drghsof6dj7xrxso3v8jffcswo7eenz0zmetbmm4qr',
                surname: 'ozegadk839g1kw83yl9vk1c1riy4cae15a27avnrfr5pci256ztcqpk6pgehg4p7dad9bbs8g5n6vew7fh8d16gh866b7u0enn4ge5xyct6ygwj54rkuhlc1haksti5ccdcn4lnktpfaj7sgfm9vql20kug8128upza0q1djkuj6lj9pw3x5wgk0k74ervtvngjxw3h6a94rlixyd24p2jzmlqntqrysjnxppjq5j1syyytynotvvw6bsh3xqjao',
                email: 'gaj2tdq2w9puhzvaa1eyg8gtlw14b1owclpl0ku5vu2stxnm4m605z3vchuvd7asujy0b33f6nzg4nilw2j1e25p7qkjtazhuipg3kegyou9cqg0hpsyry98',
                mobile: 'qgypm4b1pw0erqbx21awru8toe1xxaxyptj2fbi7gcw3on3bacdjim5ayx6o',
                area: '48bz2qz5lry04f10bsooo4gfkdmq5howh1a03tiaf8kqu7rfs3r4yetmrjixf5hqk1yfovveksac4q5ssulkjspd4fyisyjfgttphdoif2fhnfs0f4ejl6k4un9by3bhxz25d9ovtuzo65z5yh0oaw7d8sth8gj4q7cxeuoiq28fgsu9shehof62gfel3mwuc67h06zr7o3ayvrkc7vahj5toao5ssffc0njr67s9ea0770kojjc0xko354qwbx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'pzm40gm1b9tp3g3aaz0l',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'vw2dftnt8ixnoo2wn3ej04b2aacy4xe9ut2d8s851devjidylv1rbk70bou0elvfowl01rqrijn87sgs17ikn487gq05np0uwwzu4wbmkhkn7l978jp7gq93ub1x4eivfddwqqxco2gbdxsqm869ms1ztzitrb16jqzbkskvs37dwciml8j0xsagaxem9g7f0nye9vkpcgh2z2qvrx7si922f6p9y7mp1cshd3jp8fq03cq2te2ica1fz50siid',
                name: 'mnrto8eitpj9owrldvqjynw3w7up2v76sj8cqbgovuzec8y6uidjrs50l3zzb6ont0u2dfoa4nl61qvbe7myzvosfpiko2vlh3kbtmz2x3j30ipih8l9wt47nwxspk3l7cbifp6873zbjr5p7enauiewmshsjgk24oe7nhwntgk2jj9qrtt6u8y9s922pn0waz0dbztqk8diwfrq3slr24ld4qsoz9u41oa7o9ypxh3lhz8oq537jgoy6h2j6db',
                surname: '9vqx1w5xa16cz9h67vqpjw3xub3c7dnhzmnzoqzqxfjuvq33f38qtflw2yhspjzww065qkqcmd9x3xshh9qm0605w01094swc7jql1naorazszfn35fjj1mtwcrfbubgvemuornn1izovcbx158ny7bvdygxpz7rkq5zz7dvx83g916i82lie47k9xyr6bsraue4wjhxdbduyq2ggg7tu8p5eixtzdy835bnw20tfuemjz0clnrsryl910p10u2',
                email: 'ijkhckkpvrtp1z1uuk41l0qktax5p7xk3wc8khzsebll1eim8779fzine0rqr7csh2gps2gjx3xu547plnceb1b7j9ez5mwao8e2vs8wccjrvls06qd8uiiha',
                mobile: 'omh6gb9qodlb5laqfv597jja8pp9bud61fjd686swgofp0hsdiil1yn5ehj5',
                area: '8z7skwvp6ns3onlh3wc4azmamr126q17f5ghhs8x6cu3d4iddm965d83xpabdgxkj7zxw7brw1do0f23uj8bx852h7qxcatzkq8jxwds27j5txkmplu7y76uycfune1yi6mt9fbqv1twc4uy0kcsl61b4pi53o9aci5tgb26emswzb8jzmwummooa8zxh21rl1hua59dmjke26p2vcg6pzf6uqt6fqgmttm98sa60xhdnt7ou0b8ww8zbjajmv4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'pbz490m34d2un0xrwdyk',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '2xuzrqfkwbmbgzmt7o9cg6sh8yeaa07yg1m2g0uo1yuj4ydsslavzht8moi991ockc2ridft6ej01t88zrempfz0thscvly2qkcwyh2tua6mucouvtfc76jof7ud5j9km7z5tslz2n4jt3s2np7uz14erpaqoupndxg7mnlkyo9fd2v84xh9399ofqb23uo1a1hbgzve7munf8ackdfi5ts1s04ppvesmu5jbqu9k1zft167zsng9l6zflpbi17',
                name: '6aut4tfmhyrw7luc2c622irb557s99av3oc6cq564qtwhq89rkgk9g803pjwggndu7lwy9zqrowffkxwmq2hrvnprxbxdpm0sor60g9dfvdlpcxok10uwle3w57q8myesp8amkgl7bu105ha3jfmuri7r3ejsr6bm2p2exzz06wqox8oa4nzmerxiolpbci0xqrnw12hwbr9sbgzmu37zpkal3wxmweje3ixcl8bgqnrns8pc4d8nlelfdqsu8j',
                surname: 'oqor3ooipyz2m7w7z68sevu2uqlgj99ip3xqfirelae4uu1wnqxypc0gigo8ka4k7zuqvz925qi9uj4u9xjdh1eqqsavhd0vjdd2igalli973uf0l785zpfx5voc9u1ac48mgjvkhx6548ulejem8o4qal697bb5w1p2tmv3o1edyf69u3p70t0yuhoxxyunpi6f0xuud4vayghh2p1nywt3pykmpdf6o8iktb9kmshnmlcypvw49zkiojh3zsh',
                email: 'g1z6o89596nmtf7i55oc7oqn5jmq4zuyksdztdwc9dw7eexdpnbfc47ttj4samx46m60wxw4uj4rh44bh1bfz7yovl57vfelbtykdl50bf5uuyauqh40xnk9',
                mobile: 'uj5mkvnhtmrf89016ygdhevnnfgyfxxxwy0fiqml8oqtp9ek6crgk7jpgioyt',
                area: 'npymzjy7f6lb0jwx2hl2u1dirw8eu6k0vbwkhw2itcy3x5pu6hhu0siljfafruhu94ko99s3l63r87538n2vwmzrp1r9jlwikaptyt1fl2u3mdqha6o8fx0dtnefr4a4b69ngnjm3d5vmhzesn6705gd1k1rl707f6m02si4tm6cx9jb2af7s62uqhpygyvlnbf651je6fhvnups6mfoo4veitt90vj7xnmxgpzp1ywwpebr32u3bl4fglsgtrl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'xywjubtetpuysfwbr4kr',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '54ernwu13txbbr5yvqrbd6g8dtz2xrghknr244nptqsarecmrlqgajrl587743xneegipuaumcd5adcanuq87s9idqtnaokcntqdk0stpzn028qpky1x0cdbjucoj1vk0w2epw297a3ph3ncackn6x0qa0zog3loopmx5059x26es2f6c5ttqj6pmaegxwn17g0kdhkk10mesjc72v73dapi25ucuujprzr1g0rw0pxl6r1e3bsm9rl8ez62pd0',
                name: 'rjdporxmxoewzvgmzx5d56vmd1oag6so7vedx9wfl88t4lrm0y3kijite5nhyoikn80l1hl6f3aod9tsev2kyt8txhocrzzefuz9jecp8dmpc14ex98g9fs5a3sifooomurupx6kxaopkvvqvbhdbc1rueafiose9k1k2n9ivr9o2xzreny3p469znmx63dcr0xm83wi6q1yq2w8eq62wcjp8luoqdp6hd2829gp2n3ie7i89k2qw1p1652xbrn',
                surname: 'hhlvlm2pm49o8jkdz8jhyubdr4j3mth9yi11g9r256j7nlbtg4ldbdie2yakqahp941roe8nmv9v2fpxt6o6e0kfsbj962gkvv4wjsaeh15tinz9va2ppdlnzucxqem13ktsc11422eozzk1qefmvpc5mc4jsdlhqr2u0va2ahdn2modlg48z5s3xok4d9p4ryoht2skveuni2ecnnm3lsi6syuxd1jypca3q77i1kvpahytzvypxzxjxbhzo45',
                email: 'y9hx6lfnvfwv2gy83jglvg3uqgu36u0bgzak4tlj94rd26v7ez1m7wsqdbec6u9wketyivzsakx5ny7ekfdipkl0qcxaoml9s9b4lx91um878t6p1ym9ppyo',
                mobile: '8rlj0wt6cy4k10wxo4alefh3lgwuqzies6xpf02wcxzg9dl2rdc9zsrqq982',
                area: 'ao7zgomx6auomheg4wyv3sm6dbmzaliujbuxp5vc83ki9v1av73r15bpk2ncsa0858i7u502f3utgb3mlr9jdng1hglh85enk9p1di2rsp6gp7sdt49xdivugdqi0cafosshs48ndyltfwsc9uv0qljqcdqh3vaej0smc3wp4p9rs2v4e7hrjtgng7oi6pxxdm1ks5cvll8luhdpwwstd1ewroxq9xhxyc7vdxhdiroy1df5gbkwkjbkbp9nyufe',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'h3a6323k4b9p83085i6n',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '3e0re56sbkky34e5ux0vtt7h8pmouj4onpelut2nf8mw2xzije46ngmcrdr34xg3drkhr3rj4130magxtlbhh2dc42ij0xke82jcul9wtfvrhzw4mewed5gln9xqtqym1tkyqian7agxtujdwuwxov4f1jnffovsi275rz3kcd7f17t0iyl9mmjiiyq4vpzs7k7c896byybasp8josac1vs9vqf65loth4hm74wqzabm6wmiqsj18lkrwu4gvss',
                name: 'amnryf2e13v2d37dos9bqp435rf3clcbuglcsf0oycbuav8dwtuompwa79ys22u2vq0rh2n4mhw2k76vpbz6c4qgmwq76v4j9gd8qet9n8i31zs8u9y3v0ggn09mc1y1ovort9lw48wie1n5fux3asorhcq6ar1jg607ngg0pe11qja3qkaevy4zrm69qu260xadzcwk8xrmunk5cqjd1nw8kna3g9567a9v8422pi27uqigv05cq16q1okcj9q',
                surname: 'yeockhw8neocznodnaxzxqsos2uocgpxoo47p73hulv8kb3y1u9n6del58qne3qfeqenvy3hc84l2aoi7zksg2i7uasqgn0hxqd3wwc06431dcvn9yjq0sgijbgr4ed20ae0k7zgsd98l0vvf4ubsddlhb5xmafvs8kpf85nf7wjsbgivivmg78acji68sgzukmp6q6m8hbnk0na77dh0hwxhejqodl90txicu19sjqsrk26d5aall6pdijf06f',
                email: 'gorhntvzthnoz7kem3p2l0nk9k02q2nmsh98ew8oxi52iw0pgcjcrs2dkvwba24uvhn782xcyemv2z6x5s7t39tjnawhw46uhlulhj9fy9od5xbr5tc7tio9',
                mobile: 'ewwdreu8cyyldy21wyemoxlo1vqjf7w97lf45piq4wtog6yaxxl2w947rlwa',
                area: '9brfrcmwzb6pdj4a0qgjn5inksha9ua40nzb7jni0z8ywskcnvjes5nuchzpgzot7ue98hcmw13z2p5sesiu8nle0kehqsvfrroaiv8hntowhho59zjmd2fyu5kka9168afltx7rtmye2qebut500rww6phe14dxg3l9xuqmu4binftosrotefx7ssy5y39t0p0pkp7tgbd5v2m722jyhygt9hy8ngq4j0joewen5yhu9o2glbd1l61ant6bsx1',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: '3ymz3cn29y3m1iwsb5d2',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'cv0ssucjk013z6p7pip78bb36z4lw34f842tu62d7lph7kkpbsqou17pgtauztvwus4rcji3xa03dfcpgsz8tvckimde0r5gj5km827u8i290181sljyq7za9cltkuzzc8lvolh80y23n6e3ovx8zbdl3c8y16mfkv0i6u1cra5o3nsgvrrcb981b8y7w9b4dkx9uig1ws2zc0unhvihnw6d4zijjgw38zbm75yjuxyunidqnfnialstmjar3pe',
                name: '3saqlusyce1fmuhuou8hugapzjppp9zb3eucqaytx0a4yo5lgpbvtc1kl83h4up382dietgmw86ccv4j59hatxlvy01ext9aag09m2rnlqxw7ljlub4kugwlupjkayyuh1rcq5wihyjngi1z9yicrtv4y9idoxxx4dyj6f9fn32hn88bbnup1h6xqikxyizkui7hig9setc9qu1n5ucpxko8qukl5khox37omcigz59ehscbnfjnj8pt7k3edme',
                surname: 'nx1nmq26u07us4mfrpj2tasnnaeu261yfdjdzjzl93s3u4pi95607cpvla5go3b3dw7x926j78uf4d81k2usumfse56edsedo432uggi66xdw8r0qt6irg9b4fxp9j1rc79y8fbveutqgxxvbn6j5zz7im9qxnw4dxci3eicpto0cjiloyumjyexkhvowsiyvdarr18bc4ugf1q3gedsc63jnal2ost8pmhpfy6l387pq7icu6zan543gdy12rh',
                email: 'oqdy9er8le1xdzs8t6bgrpy7wl2nxad0ua45ka3i1fz11cffqxg0uol1jieq2dvjop0i3zdq5ufgub5qdpz5qbu9lhhbrx59x3ljfokd54qol5t0eonflepo',
                mobile: 'qoxehfo2xgmvizwjd44v6f30i4f3vcexq2pnetr7984s9p50bv1yaeicfv4o',
                area: 'fyhpa6tlctk0g5cwipdzfl1zd9kebg3l4hbirsg1rb907yb5lxmq0zq1dz5whgi4ivig41yezkqbxl4gvqr40aubwnnlqy5v1qfheixe5r8hn5y6998m8r4mzdx7p2r87tnn62o2i9jq69t6bssxoyinx73gj56wyrtmnkm6mndsju0aopupb6lldnid43es6tknyzmgcoqoda1h5dtuisxzntlmbkqtdgnza59xuep3orrronpa3c301nspj7o',
                hasConsentEmail: true,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'cpr1k3dfni6nr2gg49c3',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '8ne6fyjpo6kz1tvnv7cweamddx48c8luu7xjn7ioqdjz2g8sqk2tkzhnrw1r3mwmplxiwp7qu6q0adi99tt8lq3mc819uu433kz0dfuqu9wg40t9bzhb22bxdtz7pz09i0lob0lz43oz0rvzgz6wljcro2q4tu3c9hh97wmj7mpdtsofiziwx3fnuf4dx3lplfbos6i1fn2nvkcpvink410xp1y74ir3m1b9q3cuc8ijk061whsz35pzdkgpi9f',
                name: 'krzyeg4roto51k6brkt7szdib0o6b0ga7sy6j7t9m5wxq1vswagdxfyxhvomi2iwo3fpwp5f8aenj1on1c6iuxl7sxij6k7c1dnlp8awu3f9docgbvih0q3kahjspxnv32cps2h3vao8xc248ycl0r92urkdmr6a51jj0yr9qik7kcdvsuuimmrw02skwzwkuzdqww9eqwpf37etel39zaqw4xfjclzowg970ikpvm95e9rutrvvi6zsk2xq8en',
                surname: 'i5jzofrq0zumepq26xykkwqvlhg53us7idaxjb9dcga5so7aqghtqr4l6mpiiga6eouqlkk9xo7x2ww4lbekw9i53qye3a7g34d5e9dag325vvnt9kmgat9xnp1bemf5ckeqzchjbev6wl0pxuc7tb4j980ju8suhwnwq03vj8l67xpc0z67wxceuqcsxoo3tx8dkrz9llo6fetx1m9btlnqhwsbho7x1zv44xdzjs80uu8s4jcm740uozzdjlr',
                email: 'dqjq4nydklttch8kz1d3r3n7pvry8c6eo4o93qrkz0rsr17yrlbkdbicze1pyy2pvkxeyyy84uz5vgrz70k41dllooihorp4sizwwiwo70zg75d7aownw2ib',
                mobile: 'h0dcrrribe7li23o7uadpzd50hlokbhapznjgep6tljzucl3xkgfb0mkf2wc',
                area: '6suh14knhxou96vrzg82gc5yt6av9el5n0ne74lqvbqcavrjkac8fehasxojl9dl3ki8pgf9chbrx7j6koeta0ext6v08itcn2p7zcnt6h5kdvc18tp37udc1b4uw50booy3xo5gau0za0b4nw8owf243i8h0ksf2ountvsvpto8p4twhxux9p4iifqkk5nl93obkssyr6hsw008y536jmbfbsrtnvslzwweyrclc4k6ig4jslx7adhlpcrar2m',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'uwd85xvg5ce71hgi2bx2',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: '25zdfa7r1iey63rjsj4ynnkex86u0zy3kpogx94deune0eeydhwey6avojljcjw0xmji596uu65lx4nus33urp6b53mln2txfvgleuisfi3dnyu2cxvs6tth5y57hr7ujwxb41kv4w8vogoh7dljiigbk7hn5ld6o1hc3xjf91hyyfhnz9hwfofevz9erifkzyxkmt82qurtn0kscazp70zsanbeach2bz8278bxow1438mxjrnxq0qj3s8xe65',
                name: 'adkx061hrtkfbne2rzpfv3m8zl5ho8mytph19byl6si2ydl3qkv0yu1mtduqbi1327mwnapglzxsubo282w5x3h4bhb5r234g4nmg6ul9uuh83dbr3welnmqm6f4cqb3qk2ugmmk70dr4getnfrr59b0ihm53fsdkmo1i2jlwq34vluwqk5a19819djoowa97o3urr8kkc9b3k73n07ecyqn1h4rp4gx3hslluby1fxpkbhdzfrj4a7pgssp2cb',
                surname: 'ntn980tf066a3jwi372b0kbaj8eea1is3ip8umm72rhk9omfm29qqe44p621gjisnw0aph6eezarc8z2mpl8blocj4uwul2dobh64zuraa68cgw0rv2j7nfd3p81aa52b0gumndd7r3bmjetxhj0uttzwnnwiwth0qmnj0aorkp6dr1a1pvred04u3nqru46t46oidu5f2vpde604rscw5ip4pqqj68f3515ihy2mld7vkcgl7a0fqccruiphf5',
                email: '75mejvvxk7u7e63nwy3dyax00w30cqgos5661dlvieudlu5rzgddanyjrsep7rvyfyqxayxfyoek4y8us88jzlh41p9lm36rlucw04pja1wsug0mbedvczek',
                mobile: 'hrazouqmacvxos6hoiscm9wzvatxpa17jv9e5c2ff1r3s4jaocoj0bvkxklo',
                area: 'bhwygh1p77x9foaw7qxgof8fophl185s0fr77sifnkyn5kucwpf7z8if8i64z0ks7hnk0gh9jsn8cwvz96u5yoosqahj5lr4ieo0o5283zlvhlv5xe165sil51t4q9n7jah4thhz9ja4vbwx4ptmsjx0wrfkld1g3ez5rjkqcxnv82tnaofssausztn7f49n8gfnbb6kfy02ykn3qukgjs0xj4p22xat7i4u2bi7xhxmmcoahptyjoztllejmhk',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact`, () => 
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
                        value   : 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a143a40d-d134-466f-9c31-4b59b9b1c36e'));
    });

    it(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/a143a40d-d134-466f-9c31-4b59b9b1c36e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a143a40d-d134-466f-9c31-4b59b9b1c36e'));
    });

    it(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '3b13bb00-e84f-48f8-b0e7-5b0db9e89353',
                tenantId: '2ac4b703-ac4c-4b3f-9cc1-72cb381dd95e',
                systemId: 'e962defc-cb53-4d81-89cb-0d75dd2ad7e7',
                systemName: '0t6f4iy9jnxgwdjgib2s',
                roleId: '9e2bdf7c-7b98-4268-846f-d0cde50737e6',
                roleName: 'e7ymafziedcj5jdj2i3mp2pso5thom5oe3uj3ysd692sn0vrl49t5ks5ajnm43p06xs3ckvtarybwrqs1wqyy7qdrhizejbxke8as8oqxbi5opeidsnktvxmv335ca0d770y863xstdruj2l69m2l8y11w7v1o00bi4490b957gj9lud9wd29gfllz2mpya7nemxo29iyqmgeoovgsx35m6xstzhgdjk15fdwz0q8ckq8a3b42uzogk7gugrrx3',
                name: 'wbcyvemnfhxpft890caf6pxy7ja1w4uyy6zjls5y8uvmctiepr8pvgzk3o6duiqk9hoblzkcrvzcssrorfd0abcr31vnzo9wszk5bkqmydmi0ao57b1bjjow284nomin03x5lgkcscz0jk978yluczzdacgqql40zyez01mdptm6u4z4cain0ti64ny3auqj3m7hmo536dk47rq07wdbel2a9m1u8y9wwuirlcnf4t175kg9a9248h5h5yxs784',
                surname: 'wwgdwzjlta3dw4800dq7bujob5sm54plzwkaa6r973n3rk70i2gokb4l3dz0mjrjngzxrnernndx8wwvurvjrocm21v7c9cpqghdnj3jegzby5idvqw52k1joqpszzzaoyeuas9b8iltsmkzrk1h3bhjw4gjope5b3iq0mutoheswx4rpytqskuxnfd3fqmd9wx2v72m033mvacv7hl7wc53mane3kjbhyjcphp1hjd5nqbqz920ttb60pwxjjw',
                email: 'zr7m4hl9q3cahsckrmf034904fd7eiw9wh5ymq6dz80wgrfbzciyiqnn24we59rhgaz29tzv6dlo24m9dgfcdci2tajaargsrvf5lajbqebc7fbj4cujicrz',
                mobile: 'by3k3z4ohd3ls6gzalyibto22ue3xugb2hmfsl0cfqpx6ha6u8rr5p7zo8um',
                area: 'aqbsavu3dlne5mhb3trhlnh3f0uazvy1wg85c57thuwnepuyyks3bc6v164m86od3tobx0c6lnq0720iq17x3rowf142zc8081c55le0scxmkrormljn4rme717a6za98rgm8tfqo90yzk94zdwlh7mbm2lgkic8rayk84acnuiznadwxuvayqulzjh3ea5x1su2awt38cxdg5f38l6f57xnr19tivt3h29bay6e4l8ccai08w7htr60ano6opy',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                systemId: '56504540-1964-434b-871f-afa892eb0e69',
                systemName: 'z65de7t0yzs5x9st6lfo',
                roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                roleName: 'lnoq32cq03pjl4750xnzmh3bgdeq5tbmrfk8a92ju2jo2kcbgbu40xm98ygtqo2xejhwzzdwn87dwi9dv46rl7vie55gacakoxvx284k4joxs9ppzf86ddwypy2fxtscgih6zkgykboqdf32hwu5dzqpduc0cjwv09si0h0fwtco77m3r4zcuv7yv0cx68lqop2q23masx0tdtr7ibnfv9stlp4fbpq6pcy2tfr4rby8vdx2k6e8v3hpyrijrap',
                name: '1w3ski2sxgjbifk2z6zzrujf7ylbdndyxykrbptygbof2kvk94wfcyy2yhnvjxc4h7rq12r8rr0repj4ovi3cp68f4v0tdnuez0vmpvsoyo9g430gnasx1z1cjx54qkfn10ici5r3tybdusrz0fur5db60jj79ckdym8t97rjwzqlxnyawikw1cg0c2cniruat1v1l3py2ezpzzyh7zprqj1g1spg1v8sxtoqkaz2hdzm3k76v93l32qymoh8p9',
                surname: 'ukdjelc15ye3qy222e51ar3jttvgs4brltvaofrvld458ipkcyfttmf6h7xr49dkd0awmjgyxgp7c9dt8h91qxcvlvkzcatsvl15l7bt8gwiswuu5hsq7crnyhb69al0d4zlnkgd3ljds9dwggw7lgzqei9cns4kadb40jqym48j4zx9b5vl27ux90uli6fwwkddim89di430ukyb9ncy4ujzs79k9jl07pkq6gelm44uoc31qaxc1vcqpk3bvd',
                email: 'hvak2sxbkvviy3mb8cjfoefjld5e3xp28d1e9egrs8kvlzdblk7aphauwivk8dm4mee628wzqkmvlgnc9gv3vml351gkgr54knwhzn9sn7o0d3w7p3n98pd3',
                mobile: 'yfs0g46y3670cd6yubedsrtdwu0ssps43iru1jbab84znwhf0t83hia8glxr',
                area: '4uif7t595t7luuscf0yqi5ngpfn1kv0e8s23l2ga0fbtywypn3607ksmb6fjo19bjlurb26hsjqcxrk5j448x0ifsf2qhvy00q0fnj6sur4fwse0bwwk24cn7hwvb4wqiqzd1polyj9gtrp9mwiee6u7sucjhnpm9t2m27wql8dzqg1rl0nirqhxm2otdbzu8zm6tcrytzc15ac1ziaobapa2b6t7e85yco7hr5peqq3ufsfaawi1s1xnzvgxfq',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a143a40d-d134-466f-9c31-4b59b9b1c36e'));
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/a143a40d-d134-466f-9c31-4b59b9b1c36e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateContact`, () => 
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
                        id: '177beaa8-c69f-4e91-8bf4-520d868f0713',
                        tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                        systemId: '56504540-1964-434b-871f-afa892eb0e69',
                        systemName: 'caqjsml81ha3b6l6umca',
                        roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                        roleName: '9hq4lcdoxj9x09det06ox5v00q0ev8dcpmzynebwkq299dm9azkxvpkz2lhuikjpxu3o6updj3m85dvenwrg1vvi103iilchzievzv962v8djhpvnl2eis82s755vy0vm7p2p96irx551ewqbftobkf3v13cso0dc82cy22egyua7y7q40rmcfpc0hm22azd5axukiilfe3489gsb743a1obm7mcfy2s6stagxs2oiwjrn5txq4xc69mnmmks46',
                        name: '3fl0513agb24scrs97oje9m5ixvriria67qimcya75luuzbj17o2tbsj9hzg637gg81cje8e95kqzvanq6bhyo93pshn75aqsmt9w54qagw4ewwxqd05spz1ladlie93pqb07uzc394ljkhm8wpvarqk2x05ot6phz5i3t33gm9dwuhir0psvm8xh5uhh27pfbdi00e3x6m1b7vu0jfzaz0sgd135yofluc4up8qob8y62kghnbst7mv4cer7c5',
                        surname: 'seye9s0dh709iwdjw0p051dusdydxydzkbsql7qxnvht6zbxw29tmnd8d3qtikm0qc8wb75bt5r04ws0a88tbph9k7uo6505ko8c8ujfqrsv6o1uoqh1jj134k3qqkzw5dvfz3eugmlmvf0eyxrkkx6jfbsfwosu8qe7cgm5q3zwvpxsgqsdb6oqeqbnoxi8j5nrrummq69gg6g5d7lt5aoj6gqkjutmvv4e320uaz3rvrh4jehi7ikfuekoc7u',
                        email: '0zn88nlyea1qt1ulpevav7kkhn461gcileueis4afs85hdefza1oxgfzq1nwai8n24a0y0rqiee0yzdkb7vtrnhlasg6d03frctvptw5ff9vhf8ew5vvgrls',
                        mobile: '407dgygcpglsw5obwnoyx99jdocnekvdka73gmhuozz934xxl5awdaekl5xc',
                        area: 'x5ge9zbojfktw3aixufuu3pf4o542ebt7ym7xmp8ydy1mwtius4bxkn2ircie4a5t28pbfx3l9ysw7lacbms5uydw11a678ggom9gnh6rlp1q3q0ldomuxs2b9d812zw7ii6m2l4tcx0fl7wezqa3lhn3bl4a7p1016oyxurjk95x4389kpk0z8w2w63ct1tk6gtit9fl3dwql2u9y7oyfhmx5aadj65dct7cz7461ib5o98tqp20s35hbk66h4',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '177beaa8-c69f-4e91-8bf4-520d868f0713');
            });
    });

    it(`/GraphQL bplusItSappiPaginateContacts`, () => 
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

    it(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindContact`, () => 
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
                            value   : 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('a143a40d-d134-466f-9c31-4b59b9b1c36e');
            });
    });

    it(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindContactById`, () => 
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
                    id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('a143a40d-d134-466f-9c31-4b59b9b1c36e');
            });
    });

    it(`/GraphQL bplusItSappiGetContacts`, () => 
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

    it(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
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
                        
                        id: '8670817a-911b-4f0c-9e87-4526a70d3ceb',
                        tenantId: '089af0bc-2d33-4113-ab48-2d8360923631',
                        systemId: 'd105b33d-ba83-410f-8333-32e9915f3bad',
                        systemName: 'ipqzjsbzdqs0py4160m9',
                        roleId: '4dc0386d-b089-4da1-8086-81cc64443a68',
                        roleName: '2zeilyg4z6ko8nsv3h41wn8gj9tfzv5qin0k3aidssuhvov84iusf8azl61qgqqstbuq6mer4jiwfztum4511hkkfobsql96s6x7hk5zmpvnrx2x5ia1opji3b9o81bhit1xdqu1vkw6iiaqg60xwecbs5twsao1hf74rtwbe52nanmg9821vx36cl2p878bup1qnb2buq4jff8urro0pwdlbwft57ej5wsdmdd4mxznhtm3036k4tlgnchqtq0',
                        name: '6smfdsnkwc6m3be21ayfq727dcomr8gk1rtoyr5jw0zrv6k2zsg58ftoc5uc0zvdw1p3a50u7vfke2dx75vskw2l870vq656qcqpep2xgftvuu2g7hgm5bktsa7z3cyvz7w8utwj7ab5bgmp30p6ouw254xq93ep6kzaellc5t823n6pdniew8bos2dirsisai5tagv51l9lmnvszsqc1b6uc3xyol1tb9a323pysv94kqhwdmu8xcb6ynun88e',
                        surname: '6dnoup37gb32zs29g7l5igmrawalf081cxdyon0fvkf4npx3zh4sr502dxu0dv2svh7o90olyz7zmaj4x60xymqap8ny3xcgzjdppcxf73dn39l2pfxzk2hx9rcgbjo2c6myis6wjxchf8g3pg746zcix56fobya6yoardx1n2lzblgoald0rfr9ilshu6fc5zqssjs382wso12gvhoqsfoaox26dhmng2doog0qk4h731wnk04tz35fab7te26',
                        email: 'p0sjpu9iy6700lyvwd2fkdmgqg1osxcd270wvj64yf26dxjm35vqii00u4b6cdga0v1i0exhf9ebisxguz9vzvmzd09ies9wgijaa7s1mcy0ey9rjkb5wg0v',
                        mobile: 'giyukl116wjn1jhpxh54xhyuymocvs51ekv9erm474uj2bs5j16rqdipou3z',
                        area: 'vj4t9ri24uycemfc0vpm7juhng1rcox69k2grfcd3if9hayf9p5xfhqgcjc46pm1og3rn7d9op2h9aaxiqq51kks60bvin1cl34mkjl8jnk5kj0lujlvpane4ha7qihl1zejjdu1ajznz4wz7e24k9vf0fjjdnhnllikvjxzj1rfme6sql8zfqpuucyyydbc0wvmgr17b9lbnm8i328bxmlh6lopsesvgo5a2r8fipbn3lkgvlkftj9f8futfjz',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
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

    it(`/GraphQL bplusItSappiUpdateContact`, () => 
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
                        
                        id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e',
                        tenantId: '7c448cfa-3408-4102-9d45-ce46cbfc8ab1',
                        systemId: '56504540-1964-434b-871f-afa892eb0e69',
                        systemName: 'nckuz1eknhlfeexdyqrr',
                        roleId: 'a14dd912-d135-49fe-b50d-0cfeea373155',
                        roleName: 'ne4y8n50wrmflppn6rg98p2pzr8kvqk7w4c8hv53at538kq54a9i86gpgk2alklrwlnjkytvhfaxfxa42p9ehz9tifd4km2e4yjxorztex92gkmbl976jy9g38cfm5dlrhpitocljwls7kjx7oskihzjiotwubfhq83el11e19pmpg1q4k8bv8sis827cejjk87n306nk6qxmgrolympmpr47p3noc8m0zfg2be7nqerqtca4qdt2w3j42ujuj2',
                        name: '6re54n123q2mos15r2qea06qwov9q1v88ifs37y3zhw0gwh73cpvctzzm550ld6bx8opfgz3t1oz4l7ubuvf19unn88czqrtrmew60pna131ts9z1f57rut2kpla6930qirkao2gt4f4jfqjn4jzs44v9fhhcn5dmti7z030vn1dg5mf7zsjmw16hoaf8rrq98zkjqfqpqvmk64jsv8hldqxxrpr04713lvo07ijz1uwwa6qlyn6d9jdr9wh2qa',
                        surname: 'gh7sgtqni22wtnu3lv02i3c9n7cjg9rw8je29kacaupxf71bkib4ikmrokp9fk0onh623f0skus66ik9v2gg5cka5hqr9htyo5n3ovemnalf7v52pmwgg2gkr3gt5y6jdsvz1j5bxe4olqp1may20t3v1okipvpce5l78uarqwclfhn9znfsjeo6nogk9hiegbuqzlu0hgwoywox70bmyzfvxm5787xrgozb7ltdx72t59qw2yejxswx69cwrxy',
                        email: 'ob9xi4maphvb903m5rtfdjygc6lahqswvedmg4i58df02666d4zc1t75eiwn9qqe84vnmoj8cbl1lwpmbhfv615fbhaww3kwrjvbdmwnhxa3g2nbqlthcj78',
                        mobile: 'b2qaussv8cy3n73kknf9j4ac2fvmqu002pbfaeiux0zt2pv89dkjvxn851nd',
                        area: 'lh8df88pwbbxznulfck3j85jb2v8m3wi0l6gqxttoexeznua5z65rd2wbtgr6npudvwamlime0t85srctvpkmzrcn2xhmdf170fdl1ypqi3qil9ejnurnrb73ckdn3ah9fu925z41qkjct5ysqg4c51z5v7uygw3vtlqzpvbx0d8edvecaq239rt3v8lkrun8tjv1wojt6pwtw1r67f8lei51v8ei2ryl6iig2rtlnng0e941ya5r86ib84oper',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('a143a40d-d134-466f-9c31-4b59b9b1c36e');
            });
    });

    it(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteContactById`, () => 
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
                    id: 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('a143a40d-d134-466f-9c31-4b59b9b1c36e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});