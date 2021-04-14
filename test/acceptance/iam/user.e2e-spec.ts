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
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'zdvab6i3n67ba9qlxrgmrldld1094q0xmxfkw6m6xalewcaaqp06h5knnpm7ydyu463fr6txvap9veyuiibch40vx9t4ccxljn1zufsvuyd5ip7tztbbbo0hcz8hcmb2l5fn3ufl9sfsnyyoza2bvgtjlvmibxbkw0give2fiyc6ec8425wdehzbj50y427vk2z3vl2l6sgbarq82s7sahf4f4el34lhysjdfde2r9fjbwr4vaewnz7a4air4kp',
                surname: 'qtl7gaxbfcd17ejd22ma05iay59leue7m2iks78uonyalqmw4j7a0gazxlaa0noql0teel3yj5occxrjq1iwdghrdciozfp2vuxj0sjin9etvjege3gx9ggpob1hgyuontwbzf11o666wyxyz228lwz71aqrlvgbjvk44rwf6mvxzi8j5abzsfhsna4amc8ghcf6c03mjjqwxwj0c6t5uuey6pvgnt0fpwmfz1agjhutliza4r2ct5kss36d85v',
                avatar: '7qjwboippt9ppx58aba1c77bf0hcb86tdhwn3208k65trejm0fgm35d784hprjti76vd1pjyudaco8qte8b78r3h1ezcdzp6if9dpb8d6bx2yjrsx629ekbre18rjw7csoc4drl85illz1a3aqmpid34oncst414iuby0apanpduikcgk5e5ti0l8wmh4arb3ta9a068l3yg6z72wyyh6w5yebxogm9dqjnhte8neyfzoirftquekwj294bj5m6',
                mobile: 'rxp3t3nr5vpch68x0a0fk1s0i9v0htivjpufwzyiqy80yrwam670ixrm7078',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: '1kpglku0csr1mpwvvmvws5aemfmhsvb4dvavdr7gh2gcljzokx19zjvzkn7omwzpastqfaj7kux4v0m2rekgfiudldqcrwie57vnppj1dpdyskpysyyz95l1',
                password: '8b8waaaq7cd3rdu23z78ausvxhwiezo3i2kuchi0dgiktsen1lwbxvt8y8lqwbe2phlp0ejhbomzdt63kxzxdf8f76kbin7s7n7c0ekmxq85dugm4yjisg5mcwuoetfs4eh1b9vqlyzjy9984wb4q3jwc5vm3pg2trwdg6ytrjmm089otpqmryud45fqhzogoca1a0gjdehvkf2fdcntj7yp60rthhnr9hihmpvief3969rfqev24yctp0rr4lw',
                rememberToken: 'prxq12nyvkgsmaxaekg23vcd3g3gdtlvlvn2y2jbnhlrv7fv52zcrslv02xqs1ipp84qqmex7h5ii9js17f6tec814kselx5gs9gkvrkx6pi5cyv83le0557rpyu8a8f6nr9x6cc6mnkqipokyooavsqrg71l7ecw87ke4w46drw966yvkgkh7powe1rd1y23cgu3efx43scr25if7dc91c9266kk8e32kx14lz0fv1rpbbx9w771rbn6r39q9c',
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
                
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '6bx8kikebgs78swox3st4h5ttvnmnk51hduv5ui6yv3ricrix4cawg89nidkzxsy6z5psnyy93xd1ycka0zp31eek3oxeb1rw5dv21lqiqwszcb9sz0u4rt83y5tcg260ugu3edg8mgvatrensuxhe33m5oj4v53woiivj5uky8z6aievygdjzaw44oiwpcewnw8fxgetuv48vz2nbguet05yn5gk2t6lck99el2rlqsqiq0p060d3j29lp23he',
                surname: 'crpn2whzycx01gpr1gw21kkbruz5p8x9i22zh552fg22o2b3bgrvunmvyn95l7jyxa6z7ige1iv7e0qak6gc1xatge4ivg1c0j51vpv8b84uwpqq5ot1kpa6ph7i94qu51fnzm0lnqm7a9huqhcxsz8yk2z3d6xqxdw5ueljpqlwr3b2k1alz92r9c5gy7ih5ghn52o4rvboj68479pwh4f0p9xq31qpmnzbo7ckzt5095crg6o71px172vetgb',
                avatar: 'eq8ioou6hwn41qw9fh19wztut7f4qza48wfcgniplb5n164yn6tywoa2eqspziku0f229v375it9ysv7r5t11zoepxndrtm6tf9bvnpl3ot6u20ugja4ms99ix3tfjxto55bxuynyo6d7898zl9ksvavdpur1fqa1fba9mtybfcaf3oh5xpwo8fsp4wts12xrb9nqb7c1s3bh7g8lqqre472jhm2996m245tc0lt06uwg31z8rwc51pop37higf',
                mobile: 'vdbou1nh5p948k74k795g78tjbqf34caqvquk6vs5pm9etfdd5w3mh0sjjhj',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'dq4zvhw3oe9qhnz5oofi90pwcrjxxhkflttfsppl90vkr1vjp7mpjdr9vnww6udgijmdydj54kzbh6pmmah63umjmc1pjn1grbv8lwgbbbabs9yg88k8c01q',
                password: 'vxa95yznvszr8uxx3a0e1qyzpenpskb08rmh5k8fcdsuipzv02z17dwh36zhn78qhedb4i38nrnj3j4a4e8j3fysu44d7l6ymf5eydz5uqm45qd4hdyafu7h3w3i2ndttbrbnvz13kw5psl96fgjrrg84ti2vnraywij70wb435ow8qu5fbmg7j3zf6vtm967gtmqbt6jq1v94zizvzdoujf7fi1ywccq7zjuohc6zbor4f799v90d39drn09eq',
                rememberToken: 'ho91h0li2txnwzk1l5rykialko16ipz22ovdhg0bo2vquc0srn4jcucapsmf5l1fx8hozle8i77pm1h7ad7eczxoy521s2uyt48g0a09k0sh5nnohykaq6v8aukolz9qzch09xtgs2agvq6drlqopdmkqyj6dik1ex65qfx8emccnq73iu1tflen3684857sokrh8mhfp2o34hh0cg52hdtes5ocfnm8djlryfz4j5mt1k28jzh2ra8lwmd2nt3',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: null,
                name: 'v8o7vp0ch1l0g261yw3rsrkgrqw3oahgwy7r8jfnmtvbxypq0kzxfmo0kxqkkigm3lky32c630w6qaknw5v2q8skl091yphbnw5bfjbthncufzuvma3uuadndua3a8vrlqvlcziumkpa7jqq1rflo9ucuvkzjuocew6he00f6gur1da1t1ug2n6150f4hz1z5dzvn4wbdj4se3dre3f2nfaqmnad35a40g5nw892t74bznbz3so9rv86dsc9um1',
                surname: 'k9k9iseekzz8fc9789p91xu9b0vcwdzf6z5dwou59y3i2gxan4rvkn0bm9oz6d0a8cbhc90r9v4ysv5cm9ky3xfdagt7v7s1yn5cyvrsisndq7xha0vy3p0nrf26om4aal4tpqd2bp4n5axxuskr392poso7fg9pd8oiz4e6ycpk3z097d41re4axxmkaxbp5qmarfnpbdhn07iy8i36k4g7bu9cdy5k7u15sh7jz07fvwo5omrzgrbu4pcnb8l',
                avatar: 'nsrlg3qvcm8q75ypnarpcn2e2hge7yvgmctx89umu53by6vbydjzfcewrcyihnuuxzdt2smxxm5mj61qfdf8xs6i0vbkn6yyzuvcl575a1w4p5fjvunsx09wmbzcfzwsk1tujwtp8foqx3gs169yvhzh1d2inz3razfmi24r51vvuqjresnhaonyksyhqmsma8a2l9q6d03ulclo32uq09fvt612yeh9gv5wsv4ovjrfx81cku8n0fmfncad1lb',
                mobile: 'luhuvpj5yt1vmbhzqjcjy9cykir83ri35nywqowwj46o63hk2gyz9mwj9k65',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'xldva6hs5jwgzut24j9smafhwmshou05xpbwoqo377tpmy7rpjez2ykgigjllz78c8fyh828e02s722tdo226dggpq40tibvur2duup5kpckhr9bnn0x101m',
                password: 'bgzyilevqo5v95d3ale0wqe0z7a4tyxk1czqudddzev5al5usyb2orlnxhxya4kdtiok0vuhb89qmjdparapisochf4jlgwfp41i0khafabukp5msm1m3ork1b2n1gspbci5h5w1pwfi9h3tm83j0oy8hugh0kyqgdwymzr8nqnhr6ldv934r6ieb1r12n9btlin2e176494jkg7s8juthdmn2mm9uficljovwxl07g8k89xhl9cis88ruovghs',
                rememberToken: 'bmufptbzarv42emehh3tu6kcohkxeo4dkper7pi57vp1k6wkaj8eayagxsp52hwqjmmwdk44gk4047r4nz0kzyxotsyz6uxt28vyvzk1gs3yrom8d7n5o9o7cbjabvionel5iyso6us3n93sqblpf5hrcn8vbs1poec93r5p6d3rj27uoiti5bfocey1vlapa53wjo4zwrvgkmpnwxvfkjib2zdovn84cyvhguv1w0stzl8vmjzhzip4dsmfjc6',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                
                name: '7zwqnumrii1qdzqkr8a73ajxck3aes131zrw1gt6vf82zo149uail49f5jihu8nzhwvscya8sjze62ykrkio0d23bzr2asvd5mdbfojroli57mfrp6gmgrf5r3uzlb3c4i3mpb2uphw8n6w6ya16wddj76u3t46zr8fn48d64oulljh1fu33v1n5rla0bgbyicjqizpt1c6x6kx9mc6gwscaqpewagm0tecv25wqg29chfv0pyaxebo33g117nr',
                surname: 'nywjsuwjebh4ffrd85rubkpju761a3ly3qx21ellv81jw7uvcmsgi60ykh38je7l7l0futx0p1a7ucpy2lg7mevdqfbokt98t1aihmqc8r7evu1v9zbgqjee8w5hk464i0b2pq648awpjapuuomkjthsxyfsnuepg3byhli14ez7g2ktulyfr9glzjuwpassu70exvgiluwfee8ynzprgstfcic229xrxstsbfypshlgb43kz3ibinbz3c8recg',
                avatar: 'lazjpd1abt62r8u4umkevczwia6pe2bhsn0wdg94d6h2yhkqg6vzwsgiy2z2key74kunfhjjiebugno4ja5wpuqxspxzwp0zqhlpka6h7w07p9op9y4ql10u0zq4xwir2s1knwqot6j13stgp6flhjhv2n3hn3bqll0aath21gz82vm4epk47p6etbi8ube56yfcnizmum3di0sss4dhpl28keotciuue206ocnexee00etnjhbbczs7usu3pg9',
                mobile: 'fxzwldtou2f9twmvz4hhlynhv9tfly07hdbwdzhjls9gfu8omxqvmlx8v2hp',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'v4lg51jtbnzh9ouipr3o0panp11k2l6dmwulo3euxci1ws769zy58ascske3zzbdat0uabsptmngdfxj6gq8m3y7saom1l5ax305k0lbpa6ufiarqboi5gr2',
                password: 'mdgzt2hpcbk4qjkmocho5n5dsq5phsxrs2ezxr812lfhcg9v07tao3dyr8chpdlqvi4blufwe20fpc3cieluq8x3fm3nvs734tfdotvgjbr218v0ninjj6t8holfh10kcqwc6amswlj3okhl4lgch5zztaw7sjr7usjiy1x8zbad0kpd131hlhallc1uf8cl2p7n6mkoxxedik8xxnv52b30b3vn09swrsbm4utsvpjvnon8g22ohkublx90rn5',
                rememberToken: '6p4shhz59qsrda7mx3azt10jf6o5fr7mu9qrt7f1w4e0yuzt9mrc1zdyt0rdmxtaa8ny08q6g55c0pyvmj94zzbxv2a1tgk4w9s1y65r3xnkoubdveyt79om4rolrub66dagtgbe8hqlxd6vvcanf09sozdes2c1yiu4givzp96c9ypr31vjlvlr5dotfl9hcg3mxjvcb0glf2ea7adopteoq9nnrwncz7jxg3n3tqugbk3d9p3a6ui1glk6u2e',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: null,
                surname: 'b979uxf3ww86wcd4q4d5c6eizqfn691h1ac5us1or8dhyu53hzy828mfmenb3vjbp2dnxx69my5ymcqo8v22kwsou8qphzstsgehjd9tqjnhc3q03w2ubvn1yaphm62mn4hygjok7rjpo3v4efqheo6tfw1swuj8zj8ndujqo9vz88cd0w6j73d79tjbjbcon1rad08z6asicvn75r0vlh0j51urb28hp46h374tyowoznx6oib3z8ox2rg8yaz',
                avatar: 'swn2tu2c1n7axun3cfzrnxaf64trfr3hot3q2qayylw1a1hrqeyt9gakuu2c2cimf2nqvdvh0uhpdn9j3t4jyw3sf8wbzq0l03onc0x1rox1fwgjq6na5jnhhiuxhcwdwen04r75usftodo6wlrrzuz2rqf1o7ayi7b6nuorg9vlg80f1f3y5egg8k3wv2x45f5opfyjbxjq6tyd9czrg3phvj1awveemuxxlwig15usi39l15ljfrw2tn1f73g',
                mobile: 'kfs1wozjj6lde1rr3l9mbisn9why5qsd0p4p95eyvg639nq9oadmvrmadj3s',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: '0ossyhcasv4h101hbg2e27ttfsfrbdb4fo12twvdfsyli7uixhcy35zgr3xw083xmz5lvunijfb0u6um009rccgk4dgf9kwzlkqw1z2w2p6xndedojf26a0z',
                password: 'en476c99ow3rgxu4h6xkbtuktbdb8u5ndlxo7cg2q3lg0fc6u06lg707ltegm2q7fssjjmzic2dmezjt9pw1ws2jueob5gsvdxzjogtnw1b605rrkno30xkv1avf9dlt8nw4i8kd6zwirv1bl2klqe0qxjm3k3z5qh1lu2r1br35dzxtonvdgw6qpg1w41es466ewrizer1c1joln0box55u23dnnng0zoc2qsbadcv56jrrqxrzsthpkgilb99',
                rememberToken: '1ytuk3ktlpwvzer0dtuibndhcoqj79bm3hmb02m96b3ys7ov96urpvmjxskmvqtc10wkfbhscj0c9i8owc0gafzlzaiuov9f0kdzjx71lu0a51fm5idhargtorcxuivzga1qye1d0ui1jgny2pt7zj05ddnj37oa1m4b2t5eklcsms68qvszvg4wg2xf00g4hyac3gu81kb0y1t388uuyxh0yff15ywmyb5bdu65ncfwjays9km71zsg1i7l7sb',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                
                surname: 'rkj6xu5rm34jv5bndg0zgw6yh5prx1jypxsythyxlxrvif1wdce2e4zyk7xd9403bhce5zptu3atm4kvav1zvx3u2fqxnak89op0ao13cy8srrkyuks2hrd3yodatdbxfmc1r57ptpoq0uw7wf2vdccwyv3xy0xsjj3vb0oppku2th01a911kmmvwsnkymdmqysscoiarsys3nqazhbf9s13f92j8ces6ayc2dx0nukgd6ixxmnyg33es0zk88u',
                avatar: 'szhx6us5yqa2wgslig2m2lfcbx9q01k95nnz8uluwwcw6m5wlorbp6b1dbhh1wrb3w3g6dtu2aaqov44ld87l2od8pdqblogbq7dafgogghfyjim6sbdts01ec76p5lyamg2rfj3mdf1xzs7hfgo31zebt56328ztxrsyumg3cjr8gbty9czkw52e2eoq7pb3bisaevblay1qwr9j87iuz3p41n0vrrtlob3oaamjg5o1801rhe2w0090oyvchl',
                mobile: '8x2lfk6yy716g87eh43wlrzvr9603oomurfci9nxih5wken0zx04ezq76rfx',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'jg3cdt4ys3iq9g5y08wprccbtn7rjhvoflm5nvl30amci0ffu27jn1sueqyrznwg8pofayo7idxtkxf5dly0uymxsc1malnt8q9mws4oe17886357q0nt3n9',
                password: 'ri43vnwxve4ppm205xjs8nwohf5lilio39o5r8bmsh27a3q9fkhxfxqbqsx127lllos02n8fkrezetvwtma6jb9hz2e2f1u55xb9gt5z6ttfpg8z5p6vz9hxs9dqmcwsy2ehklwku65gq4kdeq5c8anrlw6a3934osh8jnq8pzd6n0kd08d7k60lz080uoj19bd50c3ve7zxhp0nq6n29b8k74sd2v2b1wipcwajnux432h7tgseuzx6icahwsx',
                rememberToken: 'smd1k8cp4fnz1qfw8b4arx68mxledo4a0e5xjyeq4u96vmdnm0p5h8wq4v6owca5bdtn1e5jq8zdv9e35hsegd4ggpuhonthkykg4eh0gv29wl2wnf99rpxdli8lcy7zglv7q5xxjspz3qfdoelvvok06xw3zl99kekxipmmga419oc91vysyniuxl5mbjrwndthtaw6p5cz6p8dqidqwwgonozv8tdt1333u7vdrvbpftr2xqikqv6r0bd1xiw',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'lvqxtpis43ox1y5dc98ruba3xtfwtl4ymxsisb5udhmrsulskci887udxi02nk5q39j35ul7w08nqhvqxvtvi60lg2plvsifrytvvrs7gzm93zexg673l26b869blowu80irjai4gr8ynzmusybiyc2e76wmp9cyg9cq4lmctdkzbpysqcj1f6fwt6w5nhyo2qglh10cinw1zfqsv4zco0z6dbg2tcdmvp4qj49039rm36ak72nrpvxsibe1pt4',
                surname: 'c79c8syiz7c4skgd1910myihoosyozqne4ysd5mjdvkuq7360yc0br44e00jgw926ot87wlb3w43en11x0x8plc35u3tjcgc1nmz6mq4wi7m73rg2y428sqgb0f1htb16gqhlt3hjvut92efaus031h8jk5lxy0j8dbdrhgdv34q95rc4c0vvjcd4fbyiqvp1lt2obp8bhfnacawsydxbgjfhvz9hkm77hbeiwmybu11rsmoparhk6pp21lnp8x',
                avatar: 'sft1gq1wbz368w74fq8eyfjlk5uzktpqmhcxr6f6ufq595sgwplx106xphceeki9jhvf97oh0xgwgbfqumcb4cos16h8j9ad4c59ug026vp9m25p5v5ebh9iilgrej1ong5wphx5go3m7y6qk8mmi4r48vhepda3ndgcb2x6amy1chp01xu1cpqbs8sgip60qg78lmzxg6kb1l9efjili836596wohuw7wg2rk1at7801ch7r2t6d16pczaiy01',
                mobile: 'adsc19o2ljerfc2oj2uxj56i8oh7fz895b583l4eypzujmtvdpvsz616955z',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: null,
                password: 'fr7fwth2568jssjxa8ry5sqbv3ubigktrd42625xf02k1s3kna6kt2a5mm2ii0ij4rkkmgwvuvg0tb9xlw09mckayonxf2pjdnfcw50ehzglmvm1iddib1r8x4pf2ezapllu60lhj00q1gy3dq4oglu3wpz99rq72isswjzahnohfxtr7r4guvot4p5mp2ukx7mfhw9o0nwl27345l72x6diya69o2txh7qxrmcvckg26rgthmhvg9etmfs1n2k',
                rememberToken: 'ybbisvi88fwjyni2zww4k63zf5sigud9dzcrd03dbuv90fev3va3t9psg7hev76cbj12d9h4cqhibwku2twrhzo37vv7bfwlhxhf83ybvw4bfwpu4nvrv9gng3kmlzqds8n3i08c9tztwf8ybgxr7rxi0tgak9axxqx276c5iwz75tenmzhmid4dmpv0h3qzzar82h7ryac205wpujp4or12rov46x7cytrw37mcsyxd10v728d36ekiq2tri2s',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'pmhyauw52subswfwrl5530zb01vzwh5t77prl9imeybmrbmdnoxurfgard5z8i7pa62a3wvrw6t2s8w85x7faumxoujdetv4pik9p4bky4mgnk41xhvu769d9tl84fz6yd0p09x478dkdnw0di55d5mmuzwmrn3uvfl5xjarn20sr9ehz4z5883516el9oh9q6npdodlgdgqdluaf750ovaz2udsypw9364m5zoqz0zkcyqpx2851mwc7d1g0lr',
                surname: 'cbd1z1n6k8rlw9wtxyp4nssut1s2lwa3snb121gctn8eb4ypwik9tpvb64he6gyrpdyksxsw86chih7878mn40du6prpay3j4erm5ihsrqtgvcmtgruhtvtoec7qjpy758rizrnburv95grcbuq2mx1n8uqxhpywykrcmv4xrgh5rtfzq7hfqtxu88zladu4deodi56oqi9qatjk8hj0kdt26rs9l7swnuvmzo1sm4j5c30cttp3crwrh8jt7ig',
                avatar: '6tjsha2094ywoohr03v0g0stsbmombwkq1k87e9jsn2zrezo1whiser42nygtbqtgfeg4oqaa2ve3z09oukx0rgdd0lznenu9u4uoc49yefatog19fijrzjbp5jj1r8gd5zpvnlhwutp4r4mimbtp4525ucp3tfr7f2hyqrcmrcaqghywcu4pkztad7p9rcvymtku8pbvfk2t9okauuv7sj93m8f19rvkd0ye28xhn20twkmstmcmod50hglsru',
                mobile: 'ch0luovn5vhsf5msjhqwggrz2b33awezpzp3iwozlrwdnd9rk3tbw7i93q1t',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                
                password: 'gv0ve2h3lie9sjjbo9e4jwa0oa5sl48rg4yf4vj14jytk8d1cyu8zcvgha659dzrkfki70y9xxg1q3pco638bazkk1g85oh4eienrgjd5ato7uhwl7u84kplzryt9kmgj2g8haxh8zw7xww1hxumdiqfuw11pnonxohe0c87aq31p3gzuo1xpqg7ryynjafff7qctrxy5ouaj13w5nf93fcf0mkek0nv57k62u3cmf6nkzlncf0i4va7wikgu6l',
                rememberToken: 'wol639hg9y8rm0bi5jtqjfbdkbyd5u3uza92uapz0mnynlj1vxtqaxrumqvq70adwqacb5cxcslr1ucd8y4s8rf5wy5am1drm0agbvthk9mq9gjy4eiumqo9doq2r1cyk52005h2c1xxmbynyfde6pwr2mq7ona3wbqo6xn3j96wyifwwm86u3316ue78m2qk5dd2gks4r2e92ys0oxd14xjdkbjekvdl7ao74uypcrgcs21jtgfosh4gojh4m2',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '21yerbweqa4uerhbkjsx653uwtvollrqbh0jjsf0pmyrduf64eshx1q1bqsocem3cglket0bur1bu29z41ybpiwg9a7pp25zbcuzpks7ymxwvz95j9mb3gde605h3eg9uh8nfh73f3k4bk8tdnczid0revkb54ys68i1v8lbk304xunth7yj4y4enugg1w8xb2azb5n28d5fqvq8dpkkl7oggixh6pyy0huy99n3ld31ar1qj7vmu7ogeyhiozi',
                surname: 'bi2mr6b6uny13npo7zdoooadl6j0qoo4t0yqke06w8ee57vnn8uv9fcsg493iyospcxt0mhm4ht6c5b6738l3enjwpzuxy4amudwlhuwo7huccot5ggok0s84dzfjgxyyjc32uejh3we8xzqaz9pgtdjkbslcd3zgzekpwhseixff84fh7g46ld3qo34f4xodqsl2febhlzolnxha99cv12geuy0633z21qziapccmeaigi19j6p6mve3gunx37',
                avatar: 'vwsmlx5sind6xqp4jp3bitq5i2kxabr987xzololrya8l1gj6nt3nanvhycr0bomtsdv1h278gttug1zzbfghw17j2ryxsnzpnv0z59yrezeehzo9sk5gf3lp4yjcw8mgotvlwg0wxdukr973l2gbtzvlbkb3cio9ijqt1lpfec3ojri4z05hz92mpj0cczzhlexxz7ymuq30aprsb4vawvnetsz0nxhc1lih092uapeyjn3aaczwu2wo4lvoeb',
                mobile: 'ynwhv763sxqql93ht6zref9koap1x5806rxsgjfxeo7qyfqs9rl2c9zb1gss',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'hqta3wlewk6xc9z8di3nk7hqbnch4yrmlmxyl67rf43r0v9ekdj7otbecn2qfkkqf7gjk7h2d4mtnshmlp7qvrznjrehtxdpd7d1fxtfpt75y39yy5utrz17',
                password: null,
                rememberToken: '7wj238ui8n2yza38h6rxp31ncxshai4fgmmbrg772go11yq63gmv5olofaul19cfmdc9217c0020fixgdbd44usug5ahq0nnih2sk4lps63ivwacxypot6jkm4p815ffi3qp1ciebak538dfkfe08jbhp1wmq6czozdotkonufkpptktkk0ws9y8z3mui0dsp1trlxvb7l68nrtmot8e8ot5s3r3kb704vkor0klz2uhoie9h7g0e12ic47ci9p',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'p9tgwe9fn6g4zu2e3ocrv6f9v7jfra2fdc2pjat80fpzme8xxzh6pc5393r9zzr2y2z0mk3b4qqhlj8t80j8gq9bo0cd79unc8xv2o5ryq255d7lxw5rgww0dmppjtj7wiflpve29cf3qc0pr5efxs0ctqd4zhdv0bb12nd21yyga00odygms0d5x3ujmbs9xggt2pmv2zlcsdb5gnb7cq8kkytwn5b43clk3uiz44beutvause7ovi9li7z9j5',
                surname: 'uemkzjz63gh8cfw5vw6h6wm3c18wzufm01z9n2clruzddkv0q11lf4vkmfu5xihbu126j82jnj7zq9jrzoihkbc1549qi2vzklnrwip13s1lv1pzwaiuafrse0ttiw152a4dfl6ac47qxke9pemi4gkrr1w9b24a3rqdi3gq4kbvpp6ylzq310xtj3kuenu5uy4sogt5ib91ns4j1u3vl6lpvjar3fqn8r7ii23vc9o0kcy94v8nbgun43gharc',
                avatar: 'sf63drdyzipuck0al2uzuufrhjjvapjer36z1l06qvshabkqulkft5qmfugw4kh0bomalu6mziipj4tdfchmrim5c1g4qmypa5hb1hbebd2l4uionyi2ugxqf2t1w7tfho9i373kj6vqoc9t0eno979bdy67sq79nbg5rq3fadl983kvfscr1bwknlnowdxummia00xffa7dl6puyy8ih01n6ztd7lqym6i0fbfh7r58tozet5hrv4gxa17wqg1',
                mobile: 'pkkudpzvnba1hnwkljumagh2slgz9l8v0fovtdclg2y183na63ja12c0xkn6',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'g8m8jrd8uh84a6txdi88nyuxrzf08647b7osxrr46zmn9m4d5ar71cw3pnz16mdrg9n6peao7dssp988fl2rrfd76esf09yu29behc3ooq2fakx4196tn5zy',
                
                rememberToken: '5a9z7biijonhi5as2es3ygcjwh39xns2j7krvuqv9a5xd4vyjmugw0o4p84f5422mbzxxqa62q6y2ctiv8q0wwkkjk6t1p8wripzgrz1ill9gpyjc5689rc7eyft6lf4k2oa28ty8xnku4g799z5e3nwhtumkucdstfgo4okx7kux3o5tf1n4sjpl3isd72z4zj6fce14qowlt8m44jfdhk7xp88b5dakbnhv0eirdvetbf6ybsxfyjn1gzet4p',
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
                id: 'ks19je0wanvoznqkmssp68nrs3wvhpn62m5la',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'rcttplifykvllhdxmyirsl4eewpwee9pk2b7dhw7l51bidu2p1w7twwx9eqnbd7b341unzbld4v67l4pp1121rkqpfxjfwc6lqwdnwbl1xsat65oatx69qtkfibg3jnsyubeh71c1gxti98yczk63s9lzg3z8d9acmwb1ypj3qit7esxg8uk79ocfsq4kzc64d1o01wakhzg0u18vrm73uu7rbr0ul9sniexmlg1450cdftbun0v9jfyudjgobb',
                surname: 'wpyj1a5ejdf9p1nmi6gbjs2s2298ovraxldpamnlk4mm0w1lzu49iktudd9d6kp31z5swug9qoj568q5rkfpafv9weusr5773zna3s0xe7wj69uwkbx36djz284jit9oaee9m4fhj25ihq7k0sg8gctv7jnpwdaygz9xfjfgbj84za0zea798fejjcei5vycjv37yk47ksanu0qnmnorofax7wf5ghtzctke0neohn20dc4g92ti93uhuyxacza',
                avatar: 'fyhqakhpv4qm5pdv14uxogw6c6f7qfjw7r2rv5048pbs8uk3ez5cq934iedj5nx788b0lhswxt8uq2yq6pjc2ueughq6pca60eds6knoxy485ik3vi597bfg6a81gf9ywqz6wb51vpet3kbxnjsoye807i1lt9os0fjwejo30tqddcarxeborulug8e69n8fu253vvkw62g2qohxq9mkfx29g9g9kz51i5lklu55gwvnudcvkq3q1y10bwct240',
                mobile: '47i69qeeij7ux253vhw5e4zo3rew2focbjhefe9w05a2kw5r01pxg290kodq',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'jaou9syzel4k33q106xrranxya0bmmp4h6jawk1d068m77nskbp2mvlp1iuwnn09g6fr5hh6qce07xtztwv5clclqin9v8jquz9ywu5qmd3qszy1zp1267vw',
                password: '4y3bb2bagw2v6zip0hcscxgofjgbnczjhesz3q9wb4rp3rfjghhf9ay0vas9u4679e4hevkesfc1ts6zlr5zmccveutpoksbvmzy5qgvw46gmicumb7h14rq5non7zy0nbgo60rbben5u25m1hw5ect86q2c31at6efe91ki1t13ji2hu2awavt2sioj68g2toa304tzy0c9dbuh0drwh55zaf90wdh7bvc48lu3d2tsccx3lhv0umatb477vp9',
                rememberToken: 'lptgdofw7yaqanx3whj02cdhcg5mzoc1jo4e8722ct3iew3b2su6qnb1ylz31kmjcgw1w6popi8c3srz1f6u9y3umf93gtyt9nbdorehw9e8pnq2iy641g76oorn6r886c1nr8dk58lm15bzr3tdf2vq4j7mp4prcknmkfm3xb7jlirxb0r4n0s3haxx2jv0ap3wsnfdj3wfvknxafpnsalvvtri4vuicwm6hce2v30hxw7cv3bicwo9r2qsbmn',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '3cuq6b5yvq4rtvabjzlq4g3ppkjmjrzeehe03',
                name: 'eg8u1px87k2v6of6w7f2ssxoti45mgfprrp49cpnp6r4ff7exfvb41l20m4ks83jh4jmxqkl57avcbkt3vdstp10mtvmjqnurlg1ubkx6886yx24hui0gwp2atuxybjalsmdhmit0yy6vu8qxgap9fa5ajv6yix3qgga9cci3t5k1cq1a7zseedhxuekwn1m5csqeuurgdjd4x5e3cv7bx68xlnqq1saor2wjy8a4dqabektc46tt9nxu8py6po',
                surname: 'a9rt1ipek7ek74ob9jni8g85wo5hb0stcpdui2znetv8dk0gz6vqgni3q1dg5lep6435u7rj12sguukndb1ca8vialjizc27zz1uehz3nu5wzw1fnxg7wlfo1oe9py7r8u5cnl0y748s6ulvoj71x6t0potr18783is1urmlplg4dorx4nx4d0khwg37j9rcwy0q4cdprcpmnpr55qf3c85nc9eqv534qlpwn4w55brsjg2esktmmgsm5hotqf1',
                avatar: '4t9c22cua461h8xr2fbhddftze0dchuv87yix9xe90kfzbcx8udfkv47mztts2oh70pap2wxmkbxzoi6vpj4ph0x3u3n4bpjxu24uy5dkj89ga3dmk1hm9iswhijbs6hshk7k1ky5l6y8wqdnu3mrpz31r5g8b8740e9ae1fu0jphqn7alr0poq82sq3u2yq7b04q5acho08ffqo6w3kzcx8e2vm1a04xj3iti4y0tkjn9ml1zgjtrqo3fdrdnf',
                mobile: 'zjcx3gbmkvt5285mmh4w6l8wnmxb2dwvv3gz2sn5bgqo3ooe24o0905enpi8',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'wgemjyo496oxmwkqlmyyq91b9eppirhyi2hu004fxkjv2vt7ats0m4d9ji7c47bbhj6ofdmuq081zb6h5xl3hd9ai2iypad52j87x8ph2etp7xn1kx9yqe29',
                password: 'cpb5eae5045b7qqod246oey8kfv3992o90zzj7vtrmu66mjx4hiyemt3cib571fviw663rvr11nbcbup07wkohj43ofxesx2pv27mt6jka147jnixs61yiwqykoepeoow0q38vanr2tkxos44bv8mafydebjpdkkg9uxx9y23qy44jsjqoq3pfd8w4sqymdmc2ny2bs72oqxu2t813l4tvojss7ah3asrgffbdy6if6h1wsjpeo6ytfevcccn8y',
                rememberToken: 'rg07wkd4br4ecozs1c4kr823bndg6x7jyf9n4dxt945xhb8l3uwydpy3ajv17mz7ka8tr3v5vfsgkjguf40fyfselq8u4en5p7hxf4708ah2lngf2x6tj8bq497t3pvd192tev1a0sisrbk08o1lbvlhpcz6rodbdde1u4a9lxo1utyhkyosvds92l87ulqiydwsp6v39irpqsm1ody9o7z186etsw00qp42jixwilemcgprhhrggpeea4xw2a7',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'bpsturza05msr0sesm5cg78bc6b1tf2gsmnslz7vcrm1kkd8kqj7p63fxcs1aucizygv26gpl21iduwcdn6a49vghsbct8kwy07iqjd6wckc98o0p2jzw4384d2auqgb9bkslxbkzqt4lk1vxsga0lzyewg55x7e244yyyzeld16r98n7we3jwyz0s2wepa7e2oxopd5950w0vngsz7psdprgrnct879r8kelk1ek0m4pe2t7wg48lwenra97pc',
                surname: 'nf7aftwf3gbo1xnbeoj1d49mbw275akftuaq41f4hled98ei8pmxsdyb7jhucp92p2sdgnec0kvyf7pqe1ith28p4y693lbktgzp8es2whpibfbwm7g5iu2nrhbtr9fsev81l35jq2gbrzh1pg65bu7d73kdmhtvfpmvaahfxkvmewzyamkvp5u7a9xiwa6q0pu7y0wsj1isz7ermcpmh6xkiq5akgjrwzpgv2ex5ja0a2n8lca7xl1ugsfy3uq',
                avatar: '1wp3p5rzqa0cc0cujtwy4e8ly5qf2uoq7o1x515awxlx64drwwfzzf7dr8hajfl3i2hygkxnhvg1a7xmibsnkj1cotdkcks5don9mo930jkosdsfu86ce8jn7mmgbw1h24h121b43ydmiez3lunxni13kpv54zt7911ki37snih8w9i6cmvg1wa7x79jj0loydig415pxnm5cnju2vw3jz0ssmuhnbkq90aokswynhuav2pd02x7a6hnuhug5yr',
                mobile: '9c6ymq8l0b758xa4ciysdsz0cui9ybrmbdszvhkvxw00ihopylj2o4jp9n9a',
                langId: 'y7tb9am1f4thivyklheet0zb99rfh5dpgle4p',
                username: 'mz3kanvxua0x1y7uramg9f9rqr5hgv0rymcq1i91eov4oro1rqk9fvyh7a7oek6ldn162zl1t53pm5y3gfwzewrubrwxyb21g2x3y56h669u2gjvxdmwsesg',
                password: '0qbi40xn6yxgvqbkp6ha2i7obcosm2w9ry050pusikweltv0mpygol7dqtcole9sohu7eae5davtfbv6ofidjxusi208uvnvqtcyj3j0ogq6272yjcsie0fyto8cyy5q53bryqmdkter2fgvajmwr9wpuv9ed46f7vbr838yi2vb3145qg35mxry6gxoefage02j471qeemimbg10uejia9kitqf9a3ygzn6tallf24nxh0u42jxbqv8qjwj3va',
                rememberToken: 'nzg8c4uydpt7k6jjwq31q3f0nf30avw39zi8h2wrb2cxkbkozae97gv0aisiaqek3lre0wyo3asv2pa43kexp2hyfa7rw7ipfz5jyybtlshf3asu5fc4gb1xrhjp4ib1jp458j43lyhj2hz5uzh5251elyk98wwyoh2br4cugwqc3rhq4bk47kpg8lfir6pm1wd9sieakbswwz8e2jyzv4qgtctb51fnz4bc19ojdggoqklpf8hpc644kec4zxr',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '1gi8iuwgwvmz1rywft307x14etc5hrq3tz6t0nv8mt7nvj5ffgn4obu1av1dhoi6esg8tyuo3kdt2n15cbnu7u23goyavh107mibkkwcbb2lr4lxja9fjf6ux5u34fcbv256oietjx0bzzqda7e5oe8zu2uicoitrjxsyotrrddesq57wsdw87id1k9jcr3fqkspyvpkpurr3fx5b0ejvi0geh69wxyasgc2r2qqakn1iu4silooq6o0ctmcd8q3',
                surname: 'nicyw12d8hwppo42t113gb4pzlxf2m79uepwuhsdktspya0nh5j1o5ko5yn1lj8gi33p7c0q34pe9entlzqm3y6a3qg53srfbookujz781mi8ag1o3f9tguz1xn575zet0hc2m05h36pud70c8w6a1yd2ti9tpuq4yvdht4k035869ovyv6usyeun6a91digfyjbtbp0q4f9bgrs38f8q6xzdq59t2y30m7r9k7wgz2lmyyh82t69w2mulfwsyw',
                avatar: 'bx2dk2a4iz78t73o1qhf7i4qldlngr04ilycooq6nnyy4bq2lz4hvgwv3pyr0u368tkqwc1a8a3tdct81jvrz4cq0ih8b3jejcc7vjm27en1yp12q9mlodew9o31w4pmzziqd7q69vklir73kt3mlk8jlf9tpckiuf0w5pfig3oaom35wkz1mjn53zda6wluzirtn7drsy31hqxbprdt882uhht0xcb9jmnap7i470e8yiht1s45jhd4zfmm9j2',
                mobile: '177fcexsfi5o88n93hup5nvgna0umovkshbyc8h7uar78qmws4krpgt4dn9w',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'dykawb61ke60xavj50x40b70tfjy3eznl505tyd0ix924it62rg2lj1k2bvv50pea4mvcl36a06qvwemqvirnuxgzob9svk1n625pty672ghgp3ofu8x5z69',
                password: 'oi2ef0m1o45ao0bltotzldtp3n5ynfzihmuk006cdu9hskqdjtv5aa4ko1mqk48d727ehflllhif70knvofys2zplbl752s2rlzntxdgde2kco4kpil17klhdeen5gt20deo4xgxy5at4s8hc2cx538uhxdzrtcmgiog08m6ld2exbxb8l2ryekzhb7dpy25i4zazdyx8f5wumb5305v1tc3lo9sn5dsrnzlauodtdok3vcg3iowivezarsws3z',
                rememberToken: 'l418x3a4izpqicgqe5graigibdx04x53f2crh5uz2vkll6it4xbcuai8i0l3qo62dtz68wdce8hv8myk7ktv0hj1fmwqj9sji79ct6o50xbxx1g12nma6jwym1zxw3mmzf96a2rh52pk8p7tbj08acf6nbxb4u1129zsefnrrsnuxfqxpby7hy7321g2uj3lrfwu4i7ep8ltbtryqzqkr4dsm0fx693hc2c15mabix1qkvhukqixbxl66gavvf8',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '9d5fvr9625zo3rdpwd1topudznbw966ndmd0guzqz4drpw6dxuir0lewuamaga62uqgjzxyjef6yn1c50cv35ro3af3aw3qbpntz8pnhsk3q5g3x3glkg52ssy3zwgj8cms4p1144ngwfknwerl2pdttrzfgdzkpugk46r7vc7mmzzlxs3gneivqm3ef7iwob0hbmzxri0e6tcohkfpg45zzzp15pgli73aq47sosqqyn2px17hu5kwpx4ao8w8',
                surname: 'qq96wdh2292supqj0r73tr1mm1e055il82cf4rpjhutm3hjffv951zesmgtcxjbk8g8u4hdbwlayg0vzcztruocbxzs3f2t680z5pvpeevq0inhg9optcjmya6mwd91fabtbt95z9p55iaasqhwn5nw8n7sgq2hp9tq7iia120fc7lpa85oh2hba31u93pbg4sotf90avj9td1tk5vbehdtafc06yda94ntzs5uv4apdj9iw3u8y21o72vhtri8z',
                avatar: 'fqmtwlrtstyq70u4pslpykt2m3qtza344un7kia00g2u95c05mwpz5ypu5ta5vige9x20551q66apq9kk2ekpb0xouodq01xlm01kb2610398qon5qqhjew8qjc58q1w5w6n1xk5rqpwlr97mtcj4j1qog0kqh2up1q5nowuncemai8ll8v9rp7p7il399ki199dppbg8zom4vnleq2h4gavn6g49gcc8alh0xm145mtumgkn53we9gnewino8b',
                mobile: '7hpowd4tyeukguitokn7o6912n2fn4vyaike5jqqxcloz9hew3uyaudemyl2',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'ww4mtmvo130mgxrghuiyxwqd0kgdk1zp1r20pfmmozbjmchw494oovu2f9hvyw38v6c0lj11m4m5pjqqi5p3yjvpru9uqh93x1z265y9fw4luulex6hbhegy',
                password: 'wl7dof2chpa42oka7ottghtyp3wwgr6s5pdstx5rsbjeqbgbbt5nd0wjm5u4s9kkrmqp2spwkiiml58hxtejzgkowehs7i7kfmgake60hwmo3hmbjljqsa9tdiyy38gwzog6o542xq2pejbfdxczv4p3qhk5gtwxtprz7731cj0n8liitowvvs3fqrwkerttmg3zfrorj0masrtaiiy9jkjxvbd6xep6fhv3spb7d1j1qu7j98ji4em47ij39ma',
                rememberToken: 'vr5ulvb6qu48uzsx7raamufx66st1h6sb74yme94aauexbfd4dpmmbvp9x4b3rsoea49fnnqeuv2qwb4526gc93hiewcldd55zuc0f99a1jwdoxuvhl21q32jdxzlzoeb6xwzcxwa50et8bfrj3ht3pe3u3cgnnuzkl86szig2chvwlu866lfak2gwp9ddgn8v987ol73ulqalafte9dbvu1xqspgw9o3992hjbg8l9tcdekd2u1jb91gs9kt4q',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '4qkhjgnagz8mgou2mi3nnt526zko2ltxuuf03a46f83xx2l2mhjy98fg8rppd6ueekznunw9a70vczw7es9g6iwhyt7q0yzsp1ts48bzy60twac3a3783a7xgqzkxhl1qmvq0ccvubtnsgkzlknl5a924n7jrbqgvmui86esy15yudg0y8y7v0oy6mvcz3lwoyt9mwne5g40hsarpiysru9gfnkqfjzs8s8ezu5qzyirq8e3deinzkkdu6njqn2',
                surname: 'cwysy0l95caecur040o6yc635fco2a7h0nfyzfbjwwfj2zv7p9w11guhjyg1wxg9graqupeo6wax6jpqqqlpbt7hq3qiapj6nzebudi711pfrv0bs0zd5127759qkidvhjb3smb9g2flo992mcksjm7kvvj3xmu4bl3ru6qi6chb13s6w1bzwzv1pacd1v75hx3a1fvfp1z5z9zw2d0lczxu4cxebgy9k9m2xr2f343tct7gqv328p42h33hm8q',
                avatar: '98ap29zf33hnsieygj6tdfbwri019yb395w35612gu94i9a6w4txcda4dx321p98vbihkzh45ofrwqd1lctf0tbekzsd9m8ohzqfmzs0oboen2losjuxbbybkxw4r1fpzw2p8aovc61dnx2e722kkmarrnudlu6w5m2o4pxd3de7eurv898unc7w5mptuhdlv5top8xlp2ebplimy323lx8qak271oryusg4506wye0v1es5tcjyv7u6bl6u35xt',
                mobile: 'fa6reo8jhr82xthdlfotx59s9nsyo6f70mgcn5nwnxvn2ytrl3o761dsrbjo',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: '3xwnliz5brp12mvq1izilvtxnprvk5vatg2zh0tog29imjz45i7r18zaznz0n7e1c76im3xjctqg7rlhbrbat2mnhwm2d6da0bbnvxna4ospx5kejudirwew',
                password: 'u60rue418k96dbd2d6yy6xg7k0a0zou4ayzkzw4r8aaekeka1ltvjkmnw3vlxx2mse76e2smfv6gtqz356s8gtckoix9cmrdahaw58pghpdr6lf3q2jz79d2r0bvl4bmowb1bbcfzuaxhm5dihah0bog12l1l36zbxcyf0lm4gpsqqtsoadb6vo44ocikkjxv1v8uuu2gxqlh403fmfn1kqxjidu2wkraiic5v502a3ap7o7c22iaf4618am5hn',
                rememberToken: '0u89fbioft8pluth9k15z8nistgft1ch92z408wnugtbzoc17zuz76k93kry8mxcblgcpqz4dceh35we8b68qvtmzs31hp5qg6c27x24it2x7h66dm1tvrdgvcabrdrp8zwc9vk2vtp5n7nfmlaln12agkt5h1wc89ey07ctqnctcd4bsdhwkyuafrr5oblcmgno10ouqz9c9m60hwt648fkchnqgvp99a8fba08ab1dv2smdbe26vmz5c8kvln',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '7u08ogjqg2icshn4ckt97nk8vgqdthuhtvk7r0yocrvvtzk5mk4tcu0n6u2f6jer82nxtyz1razbcefzdjls4ihjwb0g9ots67e1x97sn054mbdj0qvzerssktzjepc2egfe2ar2bt1sv94hew8txed9osho7sgcvw9aar4790z6vth21bpddsubj3kxxs9omp6t9tgazit2wcdic2kn4c2r8whz4w9kphmknopdp8mcx2q0hulpy7khd370twj',
                surname: '6v19a310c24m79nc589xml0nehc8yvbei2w8f8t957orpc1fnoorvh76hrwln27dw6c7owaxcrcskaifjwjrga3taufqfv25bu26oc5d2a4spjy09gzeefjlrg6be57hc9dq0pfl106d2z2i6u2r1zptzjutj6qqbtdi6doftxs2vglvy30tkl9wgcq5jjndfy0idbdykns4i87yjfni3ay03y465cuhrkryn7mb2lgyof82x1byb60jm7axrdq',
                avatar: 'd1ymejsb0gnmpgjmm547f1p13524omu2v9p2f5gqt4594qvrrtksfsiybifhy7odo8b71tg5gfmeizjowpjcla93wkpcjrinnf4d36nfinq30cyihgmp6hapvj0626r9royh8lq0pgcyx5u1do8bh8knrwnmvl7kalkznr6o4h8nsqng5tzks4feusb9qohnggllk02u16gow7qbtaj9n97bfqycrnt0olp5j8kuq2rfoppbun1k9hu0sbzhg3t',
                mobile: 'hdewhckoxgwqh63c21a0qreefnv7w2s3q9iyq9vb00dv3fkpva1su9pnccasf',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'm29j50r55pfrt52lrdpqzhzsard8tc445fl0b6qb7h9l1iudp5fthjjj2bkn4dun6axwcme6bhfddesb34l874lzc3aq7dxd67rwrdn2rbaqpxm84kqhjye1',
                password: 'b0mhc90ei44qf64jvgatjabmauu9dn49zclb49hltrfo94phsw3h3ku4pqc7wz37gac5h825730hyi4o4ram3x1cy5bfv9h2s87t8ofofiwyu969drzbnv7op4ga5gwvhugjuxwkxvb2e6001kzlrvytqv1fpx0dacpglfbyijyjfavn0xpjeirqj1zanjlsa1f3yrfs7urktke1selqi0tn5bcefexybs3azhw94imogh88jqj2aisotmdmydn',
                rememberToken: 'lgtnpv5p5ml41hkbtdwesij2jzb3xtpcqit0u1lva35xrqy6w1tuieci9h4vjhg92yszi9vfe06afd29k4ycmbz4rp7bl1bx4f6jwvr2s8893tqpy50gwh32xxb7x4f4v9pi3sfv5jntcwuyrut4scybhxk856cajrwswr61wagv644r33kxz5a9n90tm38w6zuzgyu0jdf0xo0mujtu485698zfxdzxucnuhtg0q7r9wiqurzpmq9sr0oehdw1',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '2td7fw5oy1oq3xeutzsq97eq7bgdelagp1wgdslx1lklojntbvcet7az708a4svjtgzcpfiznojd33cdwp8i4o45s3b7b1sj4rh7belymf37slt6wtnhzjplzwcju2ks6x1ui598ebknbl1wnsltva8fxj6f7cvqtbz3r8dl5mhxl69pr8vo1gu7j3ukjdu1c9iiuyzmz0qsfnid6gnvs0m37dqg9ueeze5k7325wwo93ahc9vqfzdpsvo9hqe7',
                surname: 'thxupn81nis55dm68w9evknzk3kmpwv1bfushgjavf9yaplnx1vrwlud8p3bb8a6htmkgusr5eq6da2gccgpwmkre9o3i1bfj6qgqgc953fqq95oxnc8j2a5t3vnk72d2pcsivjaogwg7j4equ2w776je6fy3vo5b7jtce97622m1nvokf3n1ajqxp693mlgctgnzfunyzyn8znuij8vadctgu85q6a6xey27ijvd69hvce68y30lauwig49wf1',
                avatar: 's84h18sd7le3zpwyzex7cen7sfi6pc7t5j1lxdcmq67gska9umty9wgcd0ipor2brxwen1xpstna6q78472s775z9a77qbbp4vfqve12v8jz4gw990qof8wvxvrxyrpm67g44dkzo4hhyaua80q4iveiogiw73nfv7yckitzdijfeei48nzzblrm5qfnvir0rr087r1fvxnwefo9uezcei7094fuxwsv9wg7cq63mff2o07en8ywo26s0nx86go',
                mobile: 'ftphau4ulhfgayofqbsi8dvkscnwtbogjxzsos5f5hmn2z522iz69zro3qp6',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'ctginoib85j8tcv8via7eqmsvou7fdib7i3y7xs3r8ykaegrh2t0qsdx4r11gzy76uxa2kd2kfa4o6r3hmsy6r6u6edg5cduiotp389shb992bpbdmep5wzum',
                password: 'xa0lqj0cavf7eb88vlfkg4q7ufzd0qvr6q8pgsvqebhs2bnwnbwdrlniezgrecg066agneuhmptrsk003gs3bm8vkti7om0sht456ufozvdanuu41quvj8gb55uqxjie2rnicttpqmm77pq4tby56vrbkoc89zue2nmbt940oq6w7dbj7vcik8pa1vzygvreqzdvkz6teora5rb98o36cz6gf55vrpkcdwi44oefjya79ewljik7ocyj58xrjo3',
                rememberToken: 'nhew4qt98qfxi059u0q63c6lw8323pt5b0oa76fai320a7y25hmugg3huab5m5efv5ml7me3rwaabyhl4csb11ii35qybxyqntqr29zi9bav1i9f4nrchauz6tka4nmriribljlyvjdnnm0ziheiojsgbcgoslarl7b66slz84cyi0hdsrr4t4wsanmjxm4hpf8prl7gfzws6sjjwgueg0im3u60fu96ul3gonf2amu111euziuy03e9dyun9km',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'bvenpdapbts5f8130yg1a7j7kx5p598bagjvex03giawiru1ij4mpn560fwx9n14cyi6hadchbtfwu7ze6pi9gv4zfid2kdejf2ocr0f8f605t5ltej5r8eob7vk9q9ne5j5o0yehhta844w1usxvsei2bgy77htw1umba3ss1jjsimiie3qhp4ikhzvhqrmfgy8o1k3kix72dxpyel6rk6puvlcjio52letwhmmsosvgn3rib9prq3f24vk5k3',
                surname: 'othlq3jorpz4nbjqdli48kq8dstkkrmejq0bnil5dvza7lel5mqonx2rjlumurta8pavkbmtebrcank6ecigp40rhjvwf05lyu2ymcliwhw08njllvbim6bi4a94p0pz28h4licv761ed15uan3ahdu7rd0gcjc1kqfu6z3mo25xhstc68j7swtx674dtyem9ws0lsfgdsyohca5h6mqlrk6g73fvsae6asmdx2cpif3qm19s1apitv46aqee8b',
                avatar: 'norlt7jgu8fmvchr96twaxa3wdemlwlvumeu1464wb7ycvlhd8yv1r5abhtp06pxvzyrzf010x8j0m2tzat7rkh9mggth4og4feva0k5xbriejhtp526jdnuliw1w2ebp5aytoza0dwvilv5jzc9wchrz6cg5yzsm1zmzw0dcrsde9o5pnito8i9y0fo76emqetmdm9uv48w93ddf85sqtkyqsrfgwurv0we2rlt6ycit9m9rcwwxdx7av2eo96',
                mobile: '0hxdsuo9l978xsx37vcw2uc1cahhk1g79hgonq757z4gki9uedgpvb5alkdz',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'n0ahjlm1m1925yvyz5i6eho63l1wxko2a0yt3x8gqakjlt1pkqez9hgzzmk75z06b0122pxzbz388j11kun5ear6qzgi81lzox3r3s07l4drpc895266n9ec',
                password: 'mkxndf2ipfac23lhtfp9m6a9mh7fbtzhhx2axn7er7m2yk6q3og0jyoje8zgcr5wak9om6jifwbcyn9zxsu5iar6efrpkabgwtub89tllzadjcfoz2j8glxlbf5ybkf1lsap011lmsmrtl5dcek9rd9vpepi9k8neaq3w4zyo9apfszv124mn7mazxakmov2nm7mwx0cdntqwlr5j61cp1b1n7sblx143rs73gz7irdqs3velxk4ntk2imhdrsuo',
                rememberToken: 'e6o19b7y0dc3lhg0lqr6woimc59svpnw8x7p0qfrlfqwb1hdt91kbib48791w4j4ymp2y0ey0rmvl1ekh37y5zbydfmnhl8ijsea7itvn7xseq8d6f2sheqdx1wxzdxk6hgrbm460ki28uq0yfyrr06s4vrgler43j8k1i342hcwg5py0b2gsfkfrt4symxohdnke1pb4etwy2qnxxof88xippd72weyi5ufwm3yxg67ndqfzm76f4nrvn3rwfc',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'pr5s282x69pwubk3vewmd8nnzg35zyldn64fe5hij9pnvaqs8px6xv7gmovo2eg3l7x4z5qkhlbfgqwsxuqs9yq5aegbtfcydgmtdqoyasb9kkta1muk5pomb29qnjy5vmpr0rg6jcl5q8sp15ljlkrduwebgxbhaemyzqy1bnzm9eosvu082logbhwbl0guw6q6cf4rp0u4fetlndceq68zxos9pgknvxm2z43o8hnig6h8lqnum6zcomjpxv6',
                surname: 'te0yxh4w6eril45oojfp5vp27agq0s0sv88p2ofidzfkdem221m69pajbhchm3no9c0va1q85f06oidm8oai14bjjb1rf7kcnzw31i5f67pa3zveq8gpjl74wwv623wtx77fbmzt8m60rwqy565j72phtmxu2y7aw6kfb2nexqvz7d6q5u3h9ag3k4qxppv9b5w3uc9gtytstpkwn4xz6iezqh89yte4iexkzy49131opw497crem5esxbdwbjf',
                avatar: 'u96e8jiaigsmp2954uma4goxzyjpqfwuunn0fqehwu70cornaho1420wpcp7h4hcyesrbhumb0eab8fk1ke0l7rs96yiebvnaqzsbqnmsln8y0iwxa5zox9g239fh3czp62j57mizqhn1w9uypfhg3t06v03i3dshsyanr0ysvzswba1kl405pgxnmltpqs6mzk5zbalr1650qhvutjxsyogo8b9hw711b7amlmcg3mef9ke3ei9v7boa63zga5',
                mobile: 'n7ct7ilztez0ictdihob4bg64e72wl8jlqurmd1001j59mvc9r2ao68lk709',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: '1197c0ozb2pbzmi55kwhgpdpprxih2dljv70f5a6pql290va2mpnbk0x1m81fl1t502yqfuu7937uvjva7q9s3mq4oexxeve7i768xmd2827x3m8x96qh2ko',
                password: 'an15grovgip2gxcrvm816heu42zhfpo73o3i2jlj477prqs031eul7wtpnaknm4m75akxg7vkdyv34ajtjvi4sdbxeevyd184tz8ao5cijihzadi4rvlf6ojnaonyc0j05pezlb7zmxr2qgelarupyyltqoajb95cf65u3o08bnrf8vk1gowykb2sbfr9g2v2vasjdqwa52flrynjv7yac5x9ujwqukn2o6xaihcjewl2yrgd2wgfjvhpl39umx',
                rememberToken: '1ny901xtej466synwpoysgsety7rahvulixwb4e7az6sqg0f7iax7pbymmyp0349w0savjj9v8yyffxp1oek6qr3l9dq31bvqeqn8d2rfb5j87wje3thnt8qm9plf338nql3ux1vu059vl2w08m6e5xtumvhl1wlmojm8w9a2cc8k11nwlgncyps0qom085vbk6u36mhoxrrvw9dkajbqjal7booxng91j7p2k3ek23jqo0012q6w2eqtu37cu9l',
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
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: '7dmod89g5he31bkce2ix78hpjmok213rr7ak3ph9iugp33r3mtzw2d4nnumhyg2vhe4868jccmk4zvi7zuq8mgxbdtkugi16vckn078r3ge4t7w4l0cu02oud6xq1rigo8y4nx1oyx78dug8wml6n00rlsqxn9qlzb4y8m4gq005n3aj88szj8e8yma87214ro00pf00f8dl03l39g78e25n6gil8sktdayrenh6d55r6y3htqoawobmh40q5wl',
                surname: 'lrhj7xxqpah1w23uf1xcidjj1epva88rhuk0bfopccp8gxw8ympwrm713j0kirqdodwi86stdcuyl00ift6ef8z19hmopbnkosv78vbnv978da4kur3mex5q5alhr40id2uh5gadrafre8kltxyxo0rlog19nmw7s99fqlc8pfu9xopsjzbfiq244ak9v4xjgtnue9yiggav2yjjh4dyl4r5wrnp7id8mcpj1qe02jnot4v4moz4mw82652qy88',
                avatar: 'b74200u11kppc7zqppo74q3c7mxntwnicwv4d1utjhgxkfjh70yibilngz8yyfh5ap8rr0f7arqbkzlhpaf99a84wdjvme3yf30pzk5l5f1zd67tizrytlykp8vpvd8mntvluoyrgcyvp91qr3he2drxlderhlgcjkxy7qbppryt1r67wejbfzuvirq5bxzcschakoes2nht2dqa6dypi4c51y3fimblvqg7lbgeexpvj0gbnp6krge4wk3mjkl',
                mobile: 'irea1g8hte7uk3ktfy9k3huxymjjr3k06n2o38s08erlewazx94dhs4rbv0v',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: 'au58x79uu3lx8qqfjfwo6too0itrk8i7ubo284l8jouxs2lrafttxtc38yfsobqmpqs0tehms8wmsdrmwvhwi96gzcyz9s1rrqz9c0uyearwh3a4f0cv3ioh',
                password: 'wr1npr97zmhh02n39m2jgz21xrvdw7n46whu765yp29mihytrbgbhyi95smdgmfze2l5smjdhslgad8ok04mx9i8algjslt1t6caonw40rji198i1qikq3z0k24hpkavv16fd2wow8xxkj1p1kmbxu8c8nzhg0f5kbwwcxoxhtuuaysua4531pqitlyv4jya68otjvvw3875mb0jmb6ip7df3c5vr18fa55ns9gfwo97b3hskzum76vy9ayp1rl',
                rememberToken: 'b8gpde2sg5ef1i35wr2nani3ck4h8tijyjj8xbl7ffdj5g76cmn0ht1mvv5p8xaper3n9kyai9p41nvx2tnlqgdokx5s4fwjllvxnrnwu3bf4pi9dg6e2tnh0udq3ovn2h99sf3cohof39zqkikc5sejwrwe35xpdh95bmchu0cza5fpdjjwdrz435diq9hjhuky74wsch3p5mtx1jdv3iz9o2eqmx2kjtts8g220qo2qnic7x62mnm45fnllzo',
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
                        id: '6f493225-b049-4e46-9d86-c6c6d9a544c3'
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
                        id: '1472e358-5192-4117-b9ae-6960c1cdb8d6'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1472e358-5192-4117-b9ae-6960c1cdb8d6'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/b53e4382-7369-4cc2-93d9-c598323c81d5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/1472e358-5192-4117-b9ae-6960c1cdb8d6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1472e358-5192-4117-b9ae-6960c1cdb8d6'));
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
                
                id: 'bd67d4a2-3fd3-47c6-8d5e-1ed06b1a500d',
                accountId: 'fa6905a7-2415-4fe3-be37-4f860702ed12',
                name: '9s1ncqdxokxk5dwuxn496ompcbpw4ugynmyqbynrowmx3dugf88062r6htb0funaulueoczp8itct93wf11dkyl3wurdv9nnsp590931flce9of6ob4ua1betwoh8zzmg4prru2mxyd5yd84x44lgqo4t6m2epk8m56br06clxlxq9nyj4n3lwr0w2gs74s4mpsm4s16b7ojjnpfjeo83r58rasa6fvq2fiqzkydrbespv7kneuz7f8aztcik42',
                surname: 'nf6xd5svbb6tjvun7b8gd242xwygzocuqoyogb1f8vzgaptvi3uqbpncbekcf53kaf0ymj8alatzzhf1e4hc0r7f6v0l2ljr2lfuzcfia1ma52nn9j15ni21n9j7gsf6u1o3r95s2t0ygcmnwwot4mq95vbe4bwnipk2p073lw8pizq5am0rd0393vxol02y70wlm83aosl6ueykkoh2or4yv4om3sx6x4fn5eukrcxbqpyisyal7u6kikgi46k',
                avatar: 'nedhgbu7r2n0nh55k1juy76wfu59lps92sme3379syv85qihdf37r3tc82zaccmddx7w0ng1ki56zgpigfj3pgtalirxiwz7ynkdtqed84mryrbs5ax3oytdeukojacp5pjbklzy4e4tqgbf13exmtypekeemc4wlw5n0a021c77p4be8qnibzcuohy8o06dm83bxl8yw90zxrom5lvw95owila1ho5ke295u8yg7gwmu6vzbie7c2aykhsavhh',
                mobile: '2vtof440u2k425y947fsapdhb56rmsxqf2x7fgu3hefb7oovy46k5psmul13',
                langId: '4d45c9ea-c0b8-4843-9250-04f4b9710915',
                username: '2grinjgdy2c2k5ukreajw4p3ajn7f4cwcdgma7gsq6i1i498fnj7dwl5h6d7i8da63a328m0irqdpnf0gvo155w8g48szjvcldp09f1c5n1ijgwtv0h63gf1',
                password: '8opp4p1adekxy6auf0pk3jh3jbiwyu6gp62hobkvgm5iml98e166tbuxfpbxtogz2b5727m75p50nbo3se5j3x67k3xbe7xcr5sq351kngt5u1ykuusv45p9su4zk0qscim2rfnh67qogji8tdjwh87vxvjkkqfyffxr3cwmim8lnwa891x6nvvwmq1beymubeqzlfax1slv718v0ngli2gn0kzzd550a253qpyh9ngk5vc8m3j5kw2d6cir4g6',
                rememberToken: '2qsud0900t2rdsrtqh8lgagitlb6ntqe9lahjv3ci7bc322l12k8g6pva4uyjmera2w8i023bn7t56jmlan38q33a7gxyo5xxa2k0fnx18avpsdlrw9txjncavo9k1d6y1ayyiik915d2hdvo9dvb7zcecjgistg3t2renaqa1whaghu0gumiid0scpm2yzlpcbguhiid0l14vfpgcujjtek4ns4z44h9vjibl5w8dk9miaab0njq2nbw9b7nnk',
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
                
                id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                name: 'mmwflr5oix3jio3w0o4dvhj21z1nzlfikhm65i0aoj2xik80q6ppye1v2grjw9lsjbqjs6meagjus90mt24t6b8uhjna65o6plwl85g4frwc98usfp8j9bdx2b1azmdsvggjnp42wjkep39hdxl0j69epxmy5wyft1ol5rinp8hv3vle6v2ml6p21at45qx33hcc3fk4cl9q67v2l9esc8fb577wzl7kidfnpytfdn2v2r25nw2w40qay6bip84',
                surname: 'a1y1n4o16mbdi2435zhglmj4ivs36g7tu3dk8htsij3vvvuahch7ruh29bkk41p7k7p3o6pz91ljag2dys961fgrpa6bvsvuhyz6zdtk1emy0s2ail3kjlabvt5coi586xt6bkgwl816wdhjcl2m4g5vfty8u0d1b9v5rq4xpk8ll0di3kcy8bngmjixv2x2bqhzark0vjjvmhj3wgxee4bsn9xdwtwb7x4vohgz89pw04m3p62ldowobyb6nvh',
                avatar: '13zp5xp8n6mta25qrmmk5m0c666g263kr3liyka8ssksoudpuh59xhpt6ppye3myvbinypqm3klxmjkh3ub86v6dkwbpeptaazmmqn4fu8ul0wh4tlcntbooxu91yitm6jh3226tdoxie127lv7d77kdmkkjp4d9p1curwm2etq0t9dkbo0m742f0knglq1j8mh6dnvqff6khy1b3bknbu9pwd28cx39y7c5nuuuml53erc2yrnadeq2996w5lk',
                mobile: '61e4w47hqnnylmvw7dybpixqglvr4ho8o5undknjtzc37ee11384kin0umg2',
                langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                username: '9tigxgmeaovihbl0nm604pe8671ltr2rxeqwq8xiwbpuvclrhrf8d8grto1szln6z9h30b0xjzvcmpuu69gzfpnuk1xtjgahcl1upmbxezmag1ljfmwh51b1',
                password: 'e3gi5tfpdzjo1v40c8g5w4h8jjhuwrkg4z9zsk73md3oh4cfgnxp3bualsecmygbrzaoyjw9jpqbwr74ajg9svva0gbzya67qywtjbk0b8lewzfnqsu7cng6u85f838wporjtv0isunp0syjiib0qrudwgbw9bi0cp1caar7nybvo45p1uxfmdsp6ujz6w9tzmqqod9zn1yjeslvmttwvuxx3dyfvx8pyjgkcy96i3u1owaizhg8vn6b7sw99k6',
                rememberToken: '1ayuc8yume9lh0uv818u46ttgsdflbwcon57qjjxqfc2mhjaw4o4mzocpph9pzd5hb8fac1u00epmi1zfvp4fwrov15bjfcsn8c8enfw5bi7yvmsg1zheudmcpi89yol8zgn0jdz4cip4iunhovxu58mu3wni7euxkmqjhrhrgb2bvdwc8ckqo4rbzniw1qjwdyg8ddn8s78dqi09v4qniqfzyl21ejsbtd1ueauakvf7z70f9n1vm6w17l7cc4',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1472e358-5192-4117-b9ae-6960c1cdb8d6'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/103478f9-e049-49ff-9386-a2948906f741')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/1472e358-5192-4117-b9ae-6960c1cdb8d6')
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
                        id: '5575a377-c136-485f-b0c7-ba50dc5c1618',
                        accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                        name: 'uhzvn8p5cg9lgh6hdvv5s4xjsszotqad3xu2hvwprmi3ykgwkr0ik9vwkjxbgo0ogx07ifwbpbghfo9s5z7ja3sgnyh2b8ku22kdxzlrzov1pxfqjsb11ephaftqtsc1hezqbnstxta39q8lyl4jogbtmzxputwib5mvgdaklugdb5hmo1auvblc3a214dffmoucy326som9qdje48t5y1fh2ajemlotd4q5iyc67fp5ieia8ajgzc4751h6mks',
                        surname: 'ern6aayf0ip9nqaktme3wj8o0a0t08wz3e6jck1sur2wbp2q0804af75nyy3rgvvk6aksa6jj4puy79pr1qsfs6xtezx6uct7yuvmyua5etqe0ee59mnnsomfh5991xqwfcwm9ujjucmo6cavd798t1neopz41ve2kk4vrzu74devtoqdcce9sesaal6cae4edw48fn6gck9p5vsknc6ot8f85l2j5n6y6d77qrfpe08h3rm90gf8gu9ty06zhp',
                        avatar: 'gq05mbpxv85ra72p058zyag2pzlby8pkry2e1et8af69tp6nzzgap1bwvauu0c3lt5p3ci1bih08tudxc2kgbek5ajkoinvegcw9biebignrk3rkehbc4wrlnft5a8xt7wsjfyp1cxs1vyer5o046k14rki4vlpc0si1gvbau3psc98t2zperalrx8ebmzavutle8n7m5nt3noy20ljb9575sxhrm2xzmcnmcmjdj9x8qw7q5ge8ms1k5hqs2nf',
                        mobile: 'eqms75pnlf33qvzvzk70st48klbx76xuhpdlk96d5qfcpa5c8arfot4k9zv5',
                        langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                        username: '137c3wwafc0e4lhrlqr9tjjw9z4kzax3wiecus2sd44e9x7uocua33tlzrprmnqycatge47549o6n6m1porzfu6zm81fuakwpoh7wqofs46n15kws3jxpagw',
                        password: 'hwdmpseqzjcylhixmw5djekmgo1ggiuxzdryjsfjdef35d46s6cnc1q2q1x251ki5efyt650o7wfc8ym8d9zha76z1bh81l5ug0abo1qufkdsmf9vyrs5u56v3p49mu7f7usstq6lbtccoktmy3etouyl511fl8itg2ovb3d2f7wdllra24utqx9iri665ncmwjqxrc9tq659et2djnxvkc0xbid0p5vqzpx1w2s7xtwjp1yw8oogv7hxkeyrtt',
                        rememberToken: 'rfiszv3k5farzbv0lt75ruvthpuznb99l66tbk2ov4yakwkdlvs5g6l638xhgmmjuo4f17nrk2iyn0htcnnf8ogfos895e57be4yh9mioo0eiq2btxfcterr1jzcxz5a17n5bd5gpsnshntroyrwq21hza3brkcqyaj8rrrpnpkld2e5a220klya7x91q5em1lnb3xq0b9e3vohte685f5ypv5kzf06ag2rvzw67838aiwo7cy7y5zseof7j7vs',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '5575a377-c136-485f-b0c7-ba50dc5c1618');
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
                            id: '97325acd-3b8e-4cd0-808f-c0cc0ea0e8e2'
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
                            id: '1472e358-5192-4117-b9ae-6960c1cdb8d6'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('1472e358-5192-4117-b9ae-6960c1cdb8d6');
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
                    id: '91a75410-c751-4cf0-84cf-799a25e65eab'
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
                    id: '1472e358-5192-4117-b9ae-6960c1cdb8d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('1472e358-5192-4117-b9ae-6960c1cdb8d6');
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
                        
                        id: '0fa2b178-b97d-4d15-ae0f-df154fda6bb3',
                        accountId: '27989713-5a0f-4c26-b89f-932659cadc3c',
                        name: 'yc21006fk0z6ssmrxb1irkolur6791jo0uy1cwssmk0p9hs5nei6ayk4v7x6lux3p9xa8lfz0tx4238gp3ti7wlhkv8lnjp5un54iq8c3tc24sxqug09fnpn783ner7qxdbmr5qx96j7keaxcp7xuid8d0cw2lmsq8oc0rlot5821aeg3upbhtmdo7s47dxsk60u674p50g02vbgz80s7lyexk1bgnojy1wm8bpi427usu1jyur2axlmcm7cjeu',
                        surname: 'so3wbafh631phuuksfak6g56yzm9j7j80wojx4z50albtwfnnyf77w5bumab45rnc0hwhggo2pw5pxyrhdwj4fqu5ayf13889tr6niqmblmxlfyrgl2fmwonkl2k5oq9r3bfhgk639lq0w8vfp89mmla5yidbxt0s6swyl0vuoskfq3rvi708qourstk9j8lpxlznm2wtcm1dzg53y9m4qp4p1h78pumjicwepgq4i6am0bd1j1ldfk8rsq4duz',
                        avatar: '7wnjvn87ydphxav3fr1x2y8b0zbxwqirfmf2k6q1z8kfd5vbfwv8ss81qn6rvlmn4zhwxalyik1hwdukrca8xwi090uczix5hfejxh1b27x9pi549e2evqq9gwi9ktl4xo53fr56dfdukyhewa3qgj4a86rb6gtzgqvh52648r6869yjig64v38oekgjfixlx9zza7toyt90rmt11w600b7xz9wi3f2qnpmvp3z2sryq0gj8s8x6o3rn3x1gw0b',
                        mobile: '9highg6wgod61uou3efimvmr2pbcm3l236d7n1eb2usb0zui20kj1dirgqyh',
                        langId: 'da8a6524-3313-480a-b5cc-5f6d73e0a191',
                        username: 't34yqfzpb36jqawquocr54g7mer2k4b6z3vb42iyrq5g8yhmgwwq52x2giqovdrrgu7f61wxfjw11f33ypi5o62qgq1xgm1ouqy3popaxvjqlcvonfhqpp6z',
                        password: 'ong4skmfun7gbe3l5tvp08vbpvg176yoe0dyzxuc8di73bk7j4idc0h68kvdtbuqd2sjfbdiy778etku6x6rf1wpjj7y3l7a64mz0jo8lvx5ak7m2vn5xxifvurctbjlqgjfavhem80nhu2d63t3t6jtjg21jo1xu2nc1wwpbvra34zetmpdscauhajsmmhv4fznaqb7cliks0x6tjy0kfj6u119q9ie8jsyikaivo0e0pj1os542guid7w65aq',
                        rememberToken: 'xvzceaep98cfcfg71oiiik1h38a909azf70iheofekop0ah24njy224tv5zcewku9a9zs1e0tk5b6kg86ptg013907opkcm6675thr1d179zdrruwna91ghuv6415h8gnuotv7wajxqxv31te6qt41qokxq27n77sfhli4cnvrbmce1sziceg8i7tkygmpbf2zjbohid5loqr3xgft4fu8n2iqtnhuhimwd218xx2tg3fjee6pd3cf5ewe9n8l3',
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
                        
                        id: '1472e358-5192-4117-b9ae-6960c1cdb8d6',
                        accountId: '9df90b73-8811-4099-a4bf-7e9e66657d26',
                        name: 'yjgxi1zx63tpoyx04u363be1cikkfyz4uqso90k6p0jk59iqf8j0qhj2a8fnrup1t1egpes2x2wos62n1w4ys55cddtanutis8srm7a6kq5d3nb5dcpbmnvfedcl3vur9kbmdbrnhjjdgara6whej5joig1vyhk7cpkg08qjv149ru22l0d8z92r18du9hijjqnl7sw3uq1ul0ofqo91tjekokszdlp2555jbol3ohkf989bmtsub3ubn4dnnnc',
                        surname: 'abovf70fect9b1bnlyzqt6k310hf7knzjvkja1juhsv8t1u7hil4cn9b5ixtg3i88bqnf12cnxotco3hnmuuv05dlvuui5dmhh1jzxh26tpeca21b0wyylikqif8ensyeanrplqbboc1b9rgz1xcietpgkonmljlh0l0h36zrqpufyg2dkk18q4wmktcv9vyginrt0gqi9lnrchp1xv1cif29c10bmb1cc4vhulxz3fbwc6m0q475julahnlz9n',
                        avatar: 'eq968i59rtr8tykaum4o6fc7kgw8857vmeiy5msvta1ho05w56n3apg3rjijiq8li5uqat45ya8myr3qw1p268f3rp758te5ffmqw4lqsp38ilwhe095d3z6k3bqyoy8ar5gl92aw6ookeag9n3h6ib560d7o3bv56yzr076o1pz7ezkly32etwyavh9ndj3w4thtm0ei1y65dw515bhuovk0rgr2lhupmd5h40ivxn5p892h7npyhn8cx0ft0o',
                        mobile: '9pfye61t13iylh6wbkuyv7znhf3acx16zk51tmq33n04ovgj2gj24krbxmgq',
                        langId: 'a8c54312-203e-4233-9f17-ef677ef8eb2c',
                        username: 'xchvuurrvqv22g45qq3e86gi02jzona9vnugfj0i5yjnz1f18jsdamlszyg0nn2o2f1936rjk8mxkqqt1k0fhygirqp0adaipxjjuov74sb6askn0ctf6hja',
                        password: 'bia9gc0dzetqj0itv8jn3aj187xzdlzmmk0woj9sbsokizjl3ly5vrn25gn2h842lsiuz29g3j15nr4z3ewlkt131tg9yibkx7j4zf23k53cgqm4h4ufz7wnqogdyw1dzh3e1qo9h5jdoa9con0aluwm7ca9nyf8y4r8epkx1kr4mvn0no2c3cygt5ve1yjpciobcym0en2p1zw0uq8e0uhdd641vpq8wtz4n4p9yfr5cjq968ijczpc7o3joik',
                        rememberToken: 'zou8tsym5isykfkjbh4vvm7g1g4e0fd6mncrg8qgsm18k9f7qmz4dv8godntzat4lwn7mipwrkm77pq1rchztweq2483efc1cw8g695wh1eyo89qz13x19x1gqy0vw3zx5nllhr1tld7tdd7zl6dzlhddwhmm9p6of1jnd2blhwwbt5djclmp369q27fh4hq2tcr6vam2zsgu1rx0n5fsiy0ixc341shfxxg8wq7u6jgmu9fxe95nvdmth2au2q',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('1472e358-5192-4117-b9ae-6960c1cdb8d6');
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
                    id: '4ae99db4-763a-4ea7-a46a-c2a8295c640a'
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
                    id: '1472e358-5192-4117-b9ae-6960c1cdb8d6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('1472e358-5192-4117-b9ae-6960c1cdb8d6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});