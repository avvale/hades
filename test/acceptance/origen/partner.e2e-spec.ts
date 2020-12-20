import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OrigenModule } from './../../../src/apps/origen/origen.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('partner', () =>
{
    let app: INestApplication;
    let repository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OrigenModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IPartnerRepository)
            .useClass(MockPartnerRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);

        await app.init();
    });

    test(`/REST:POST origen/partner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'auidq1ieta3im9y6pnccec5pv6gb27x21edlkepzs8fempvlp08gc41u0d88ap3x3e7gpoo22qzd0433hlxxlvpftwqsziylm9wsu7a8cxnamfux3597ooj4iuwp6ns7jb0d945nb4lzy244a73sfme3snn9fuu218ewuqx7uej8zfeutg88v3sgnz67umi7ms494mwdvhgkgxq8zniypzbmyh7s643ljb0rv4iwriar8xhhycw7xippbr17yi9',
                socialNetworks: { "foo" : "bar" },
                description: 'Ut in quis suscipit nihil autem eum natus. Officiis et officia vero et. Dolorem et et.',
                excerpt: 'Soluta saepe consectetur nesciunt odit. Rerum iste vitae quis. Ut voluptatem et officiis. A doloremque et aut suscipit voluptatem. Ut atque at eos eum pariatur velit neque pariatur non. Ullam exercitationem labore ut ad.',
                email: 'fgiivbk1vlczf0mne929c6nbg3b6ov1lvzgjqddos5ut4gtec8xge7ou5uq3lx6wrcu2w6bnhaz52ggtkpwqjxsfdkxnx67cgvnmpjftkxwz1n2pmonol4dq',
                phone: 'xb9hestt1hoi69e5e5ukn578nyoms4ed80f6qurfc9ag9tj0qww4h5kabb7pungvybesmpwlrhrgtr3tly63nrwjunh4mpml4y8htxa5068w2hrlicnb8p8g',
                fax: 'hz0d3lmuhh58ttbz3u24orcxekfw8djuttlvbso0ctmww0dlsigv6o9tb1sbzirbu0ci50k44npp96lkkszb105ejaauefpi26t61ei6j6f98rrug9la5pp2',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: '3ecq8gkrg6',
                locality: 'zyn564ztclu8x9hj7egdz5z7yntisui42809w7nor94how4yp3l190yluvz5bfiwsovs1uf869pxn4zg2tsreec69lpmq574k2a74dbfdv758m8we250n2n61g373',
                address: '0yjfvoqstywj320nu0apbpq9hkf8nhynkcqxsug7gl1qks9gnvmhmz89y7581apmu2n03zmw7hxll4tjnq9v734hl5ve8msi22w6dac6npks2yjrl9f9iqu9ezs6tnhozke1nw73tq39ickgwi9fvy32e720jvu9pn8xfey9n6tata58hmrhgpdt796sk6gh00qks50zonlpt26f2u1e15n6nzt4saf86cl29mr384cz4b67fp3wfr31lbvrhk0',
                latitude: 180.00,
                longitude: 355.38,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                name: 'xyxni85nk0m4h2c2ve77q8loenlgl28chqqbkdrkpgxj8b4nt29csjz2n7z5jsysql0v2kvtpj74ekw3tcf9f2wgwgx3hhx0oha5rg4rhiouy8l3rhy1frcyne3rfjt4m5q5wklry33ldx4og72wcuprlhvcv5zbj83vtp2vsmyebadhsjn6eozkwziekf8sc7b826ca46fl1qhj9i2j48ps9xw4syiw4m4ut3we626zqilutwqbwfcqdxrycd2',
                socialNetworks: { "foo" : "bar" },
                description: 'Nam officiis sapiente qui eos debitis incidunt eos reprehenderit. Similique aut molestiae suscipit sunt et nam ducimus. Est quos eum similique quis natus architecto qui provident. Et voluptate expedita repellendus. Dignissimos dignissimos aut non optio dicta non repellat voluptatum sit.',
                excerpt: 'Est et et doloremque laudantium nihil ipsam autem aut. Sed qui dolorem autem maxime quia ad molestiae sit. Commodi id beatae tempore qui blanditiis officiis.',
                email: 't4mpzrmtmyvd4z7oec9euyxdix82ooix6ot1xl19etats4o6lnc8po25qjb3mozxqfq0er6jfiryfgboygygetxwk60pwo1afyk9tvpy5vbxqumfb48cv1hg',
                phone: 'b8sv1w2tjwd5de2m4a0pmmfrnfda4m40tndxpkra2ahi95cniwyy20cswga2a2y9y5hqc07n2imaohv9wu7lru8jiw5x9d834wrreykw1w977rhtqkspu3km',
                fax: 'y4zgmwlxblbuaye8w1lmfy071sotmlb6l43eeoafto7l2nxxntdjmiu76x8givif6nexr672ala5efh6ka3fm9tf5oan9jatmb824cvlvmmkfo3sxza5d8kp',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'fbzpwpp0mb',
                locality: 'tkqz60u66uv0evqujve29gmk40cloz6xq15i13g0q69el94ajkytwzn8a2dfmj19g6gf05uepjj7t3sk8iiyhqjkc9fx4l3x5vsx6uxgdq9oimjy4besydanfoco5',
                address: '9qx7exdq0j7ydod9gxddjce1wsskhtitwt04qo8v9je8w6t2j2q6viyzqjxrm6aycejx7mpyg27xbmw31w9e2nklk5ftfanhxj0w3dmemej6wwpssw9bhpwn1fbneyh2jpgowhuwxtcdsvmu93jsucdpow4d256mhlnlvaw2l4z0kbpqe73zfttco37kl6ogyeusxmvsg8lgzr5j1sh9fui5xu5qectlw28018m311yi8x2hu7v715p3oivw2df',
                latitude: 846.46,
                longitude: 667.49,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: null,
                socialNetworks: { "foo" : "bar" },
                description: 'Nam in quibusdam iusto aliquid exercitationem et tempore quam. Veritatis ea ratione ipsum qui molestiae. Nulla quo aut soluta qui. Debitis enim fugiat.',
                excerpt: 'Aspernatur non consequatur voluptatem vero voluptas fugiat magni et nihil. Sit sed eum temporibus rem aut. Blanditiis deleniti est atque nam dolorem omnis veniam a. Est et qui illum perspiciatis qui fuga.',
                email: 'iua81rieaqj1jkiez1t84cnm3ypf8h1jotkfojbtodbpyszmjbf6uhc6e3mcbhrt2p2ezjty1lvyh3ws2znvtjs0yauc6wiy2rin1xgtghqa5queucz1y04u',
                phone: '2b8hodq8jxmultym5k2yalw12zbgop1jcbfrys39rg2btwryr1jufcx67lakqu0l706imxq00hry0kznwcjuuiqsqqhptbls6zfwneb937dmzj69uttc2bhs',
                fax: 'dkqns4amkobr6o06nrsxn6orehwyl14ouuauf3efus9352zxz5owgswzblzbeqf6voijghi5yn3ibqay68pncp6oc3ga1zv4e7ceu2xh5czyco3j832iabmu',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: '3ndll18ljd',
                locality: '25golf2qdaz0wes1c5h7u434b9z6tz2dlc5frmxz2if78hcz88j41stbwqpwu5u7sh8ew20p815f3ck8dxp75h9k42o4ozukwpwcvbx7r2skqdsw7oqnvvke3m3p0',
                address: 'c7qxmtbclixm6xcm90u0swnknaj872ita1vfvfj8875dxbjqzh7k5wfr0apzplyuglf2j36zasial1orralmxdq1pz1bglio4t3pr68oi0n0x5wge7tiflplxdb0td9jpc8c1qsaovk5ka3t2i1xaioob2xper9rhvf089rhg7d3oom1krrdbgu9ao0hz3opzoggbt568e79t0sk8ddhs99l8k5ovm6t6ssxzblb32xp51b1byrhasje38dp5u2',
                latitude: 541.59,
                longitude: 894.82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                
                socialNetworks: { "foo" : "bar" },
                description: 'Sint fugit tempore quidem. Assumenda occaecati quia. Dolorem eaque esse. Aut molestiae veniam.',
                excerpt: 'Et et iste consequatur itaque assumenda repellat. Dignissimos sunt quisquam omnis accusantium occaecati asperiores cupiditate ipsam. Itaque et quos possimus quam soluta quis.',
                email: 'ckjxvrd4uy5ad9hmov63hnlu3gdu35ocp938vmij94sxgaep5e9dtubeji3wdwixsc5hlid1odfvjumw1aslo5gkolrrzr5wq27tu97xn2rtpma5tjq80z1f',
                phone: '5i8r7vx3ykc4i9rc1uautua2nt81r8o2ymdp0wyb8hsot3xj8989u7bypi7fliavhewnp4ip85gavrhx0syasmxm6kzhnj8tb46vxho2l6ogpslk56ai5pdh',
                fax: 'tl2bycako61gkctepo2dc1n9esyah35ktmflnklmf1nocuaxbbs1yopq5qgtxncd03blfcqecp79q2jbbeuau7elvb7v6uilly88muyb54arv7d733oadjci',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'a8ettozupq',
                locality: '0fe0v16erlprz6fbk4scz9riab5mv8q5037emlula7774r0tla5ufwf4zllgyp6p1c9682m67kd41doy95kw664a6js8wpl6zjshua3tuz4og5kifo7cs2dxvsgwd',
                address: 'iq5f5f98jxle7jny2bj8kj5z7cn40h5u90gkzhnxszxtll3szh7vsj6vmwo4uu56wvevpo0ll09mbnccjzz48kdlts0e237jfl5vj1exwlnjducw0ab7ea39o1k27waspdh1td596v67gogp5aiugxa5ek5n5woajepubxyveu9wciitz087pz9dsupuq8jmqd21faq1i7jdpcnp9p1bs65etxemh07fhkl794iv3or8kl3kc9x2alhjfpg4vt7',
                latitude: 665.68,
                longitude: 468.33,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'rtzrmqe53ngtlenwrdkdpue5ymrk0bhm37z0a63tcqbbokpww3hmpmurjdqmayal2zr4ob5jt0m0ax6id4gdmhnsvyvmg3hefh94kisj44pah3hrkaz8uvn8dxks6n71514so8cnwxyrrsojy49ybemc3ey1iw0csa1q75athuvvutvmxxo36r36i2wzhjg3co02duc8foc3gzk6ksn9ffcemfm44743kapdc9vsr4ntvgi2pf9grc1y4tqh1gf',
                socialNetworks: { "foo" : "bar" },
                description: 'Natus dolores non iusto inventore quod laborum. Qui sit ut quia non. Consequuntur quasi cum ipsa. Accusantium sit hic molestias ut veniam. Libero vel voluptates doloremque ex occaecati et dolor est aut. Cum accusamus perspiciatis nihil voluptatem rerum porro quia.',
                excerpt: 'Commodi repellendus ut maiores voluptatum adipisci. Non doloribus labore. Eaque culpa voluptas nihil culpa quis voluptate. Ut non neque illum sunt est consectetur praesentium ratione excepturi. Magnam natus quia hic ullam.',
                email: 'x9ayuqp8o2drcaqsq5lsn9agyh5s2q0lebsprya5jnrh2hfjj9d4jfhsjugzj19h67bp4af3wcc8z19rezk43crzb6ariat7eh00irlmkj8xvhc7uq4qvyp2',
                phone: 'ses59ug4q02cqfq99d7z8ivvb51xwljuju38077qv2f634db0kfs6ezrz1irjuol3jba5r2xoz831xx7ty2fvtpqdpa9pj5cifkzmfnr1pk17am631lmgx42',
                fax: 'ftw6xapv9ffxy5y2wwqkn68yvq1b1hi24xmroaahi1844n53fieb62o45oiyy8twy4pppbavgzrtrizc9dvqs5m1lx7q6xz1kc8ie29j8bq0vlejxp3tqw79',
                countryCommonId: null,
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: '9cks9qqcqb',
                locality: 'ntpzmcf2p4lb96gg6a3atr9shv8520cq4mvxk16kgd75xbko279wjiwy6tlj1hvddg2jh3634z1i6nacz5ohkwzurgozi4zzeabxm5zbrsq4e6j9nnw3y3zjjpwex',
                address: '9y5eb5stbpegfd0kvaxwt15s7hfgyqwh2u03ztkmewgzlakl57u5kznq15j14d5br819p32drqfzdresus9iou4vmtsur307xjxb9xhq54w0s6qnpajlc5v5hwkwjmc7z0w30em55bdrsmveqshj044w1fv6g5t910gc4q9qua0b5nesegznht78tzulex03rjkoz09ldyui68i2miarcrmg9ek15r11pnz27xyl838vwn36684dcgt4oz0b39g',
                latitude: 390.62,
                longitude: 222.58,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'zs3x0k6jnowyng3xczcqnmdydw74lqv6l2muhuuuhfq79f83e5k03h2lyt9oski278j3e1g82tusrblltkpsba3vjk2w9pyxlani8e66q8x986xocv8ntsz1di62124co70w2vpozpsjulgpebum2reurrv0s6vj2jkmgj21wgujfj69zsm8u1wzm089gs3pvyv3dh3eeg7bkhky5wudqgzxxw1c0rq2hu84jnf1itz4nl89nk8hj79rfeg4f3w',
                socialNetworks: { "foo" : "bar" },
                description: 'Soluta quo nihil tenetur itaque temporibus non. Numquam nam fugiat nulla. Vitae ullam numquam ea sint qui dicta. Aut architecto sit et modi occaecati praesentium officia.',
                excerpt: 'Voluptate ipsam earum animi ut dolores est maxime eaque. Molestiae praesentium occaecati aut. Asperiores cum quia. Voluptas veniam beatae doloribus occaecati asperiores sit. Sint molestiae et aut in voluptatem quia odio.',
                email: 'x25sbyg0nqs2hd0sjvjaf4375lbid4ftgijm3o1o6plrxntmft6oiy4oyapatdvtgvxkrbmbfekgfoomzpfmqjmog7evx7kinkn9tqo9g5hpxswysnaw45p2',
                phone: '698mt6bww2bhj8stgxfj65llti0mzqjl02er9xw1rqchaj3rh6022f4eg6cu9835p4j21by1pxs5e3o9tf4p0bwvh6o3gtu75goshewlxet8f0lwxoabufbi',
                fax: '3paa2zx4wdx12eriyqs0yo91y7gkecp1q66kivh1xkq220ww3xo3jwl9dnzl0hqwwr4ymdq9yql0u3a0peoxcsp2m7wiohqe0fkuyc7iqwova3bs3ixnvqkk',
                
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'r14s0uua91',
                locality: '8ylfe2jszewfvonqgejaar6f5vvueu6rqm65zc33ucm5jvns7w7pllnhg85o7nbidqkp9f9mmrcx8x5v9h5vajv6zbck7nvixu418k7kthahthdm5e4psrjf2qgu6',
                address: 'rd9v0x8o8lpaewcrs4zlz0xbgldhlidqk29vatdqrippbey6ce2tywgim35cuachn7js9eu2lxzuh1bv0qcmgra27kjjesw99toopnqjd9hp384n7foq07yckqi2t8zn1pgzxcb8t1yx6m3k4of5wx3n6mxag31o3i7oc49f1u3jos2j1ltdi5rlxvoo9au76tfdy8fh0v0xcdyo75ssp83fg1g6dvgk1wphrx1tstdidv1uhpdr3hmcbfx1knq',
                latitude: 896.02,
                longitude: 964.80,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'm36m4tmbo74dhr80ydscuoeij0ru5m7cjjfk2',
                name: 'fx0agllllx5cz2xm9t28v36cmsy9tgmotb8748gquiozcjuwqz3nu2c9uanvro3pq4iaz8lq5xl6blsckq9ks7tisuarp0cprshfyuzqcwpu7qccb6pxlr8t6jhrsq5jqky386j6ebif3a7soyw0ojv3ntkkupecmh5ktdnql2w6qp2jad6b763hgblu9q4f06d3e4pkamso0oby10v0vdztgkyehil59anw9f4g9b47l97t46ppm3rbbqpv6sq',
                socialNetworks: { "foo" : "bar" },
                description: 'Nostrum laborum velit aut ut velit possimus voluptatum aut. Non molestiae dolore ut iure corporis error. Nemo quae ut illo rerum et aut quo. Quis eum blanditiis omnis pariatur perferendis eveniet. Est hic placeat dolorum laudantium ab sit.',
                excerpt: 'Non fugiat iusto cum a. Non beatae voluptates ut autem. Voluptas sed voluptatem omnis libero et hic vel est quae.',
                email: 'v3z3yoijrumwu2x2edo3csptl5bydj1nigvba9amjdwju6y02nibie8hmstxqzwrzddmswssf6314x9rf1igia3tcg37v17bavmccursgybbssxc5hrii1f9',
                phone: '5lq79m1y3q1xk85cn3xjvqm7e0bnrjo24trb1fkuvmz9jdkcn7l45op0yq5qsxo8m9httwsrva9c4evom67pknbxwfrut61q2gt2flns822lcll357swz88r',
                fax: '8b19lxn51q5ohiq5whsva7bfzo8gf3hrgadjmaom3rfono81z8e4md2715i133be1l5efswgjtqz8e4ap3th8nmdgdwl6we7njx3uzcgr6h74qc9fs7eop6f',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'upojzu1xzt',
                locality: 'pmvokg7hpbggzwqtvc2b7z1zoxehn63n2rwbt3gbu3xvg52mt2mat9akbmgsmv2dnxvwq25et5stfvt0oh0c5724wvgzb28bifxcojra7ii6zd9rgw5n9spddqa0i',
                address: 'e70wskvdvxnnqb1bztixgyw9axdum34gake7pdq07kdaadjym9ozu5z0ij5c39eggagtg39efk4dtwd8rn45zhplw4s418fjtv70dlbcgsrs6p3xd0ioorklzwefb6trkiyrf5v6h11t6diy3zt2w04ftcmwq3hkd5fkb90nlzozppcntugrowyme8nb0kx9nw96rbdmubf22r48r3qbaqcdhjqj14836ndfaydsjopztr8g6vo6r319kx2a6hw',
                latitude: 424.31,
                longitude: 731.65,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'fpvtpmoripdp7zba2lmc7r048jzo1838cbv9cmnzr0fqr0ihgafy8q7odjkdf6qjmmp5pe5jrxv46fw94lke42qu8wgif7tez5h85uftdp953p9kh86o9ilz8fq281o33xxbltsrrktwvfbzg37tdgw9lwhy5v8ewhh07d645bak27id7b94cfm3sthf2gioydvouvvq4x35npgi1et66lgp0352mnzmgrdv4607n22bvmwa7g4ozcw80evrjy6',
                socialNetworks: { "foo" : "bar" },
                description: 'Provident vel cupiditate porro aliquam magnam. Ut voluptatibus consequuntur voluptatum ut tempora numquam expedita. Fugit officia rerum ipsa laborum voluptas et quasi. Culpa hic officia a ipsa ut hic.',
                excerpt: 'Ut debitis rerum sit ducimus tenetur velit iusto quidem. Ratione et ut amet. Repellendus quo est est ducimus facilis in itaque distinctio. Non dolores odio natus vero quia accusantium.',
                email: '8cw0d0tup4ih6nox9sfwt50qmydjbni0hcro3acdke9yv1qw0zcazh1oitpthb78u5d48m7w9nf8c2tjhhygfzwcy86fvmra1npr3h2568j4lc5yq8531tue',
                phone: '1tq7otrqtwkbo9hgd19t3aeqfw8jwgiafh88dtzviuki37b5kl9af8923k8gl4xyn246d6bp33lxgvrnmz1pd9vx8zquofepunrvx5ec27kkrrc8bx689mvu',
                fax: 'x2fbcwwawsae1183qr324xpoyueg4h92vgm9jghq12qew4l6hver1qpid8p3dpc1s1l1nno4yob0r606vr4ryfbx4bjp33att1m7tka0kgj0s70ixdw45m1l',
                countryCommonId: 'anpoypgz3z4v8wwknw6so4zbvuuvnvflxpsx7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'aznz5e9xgd',
                locality: 'eoazlp6ewzjxf0pg1lyuvdl0eui0ev9w1f6shpxumht6cqxgvmqttakvt1z1sf10s8l96eii2cw654oyuxkua8mc7fr7twiar08y6nuhkpw1kbszswodh4yoso404',
                address: '9yldxj8qo3eczmmanbs96jgb1jivpocnnvye3znq58ys3ghlwpd0agq9fhs2z8dxmoibn6w59e7iwqujw8hu1ft4js6fgfapp5fes2zprcb9zz7kvpboyyokbjywgdgy0004d4zhdzcoesmqtqx1fkiccdavt1i6qxx93upj060tpfeghugacseb0wrzmiyrkes49c2c17hryrxwz1zb55tf9g8tm7nn7knf02rlo7n225cf31a4x4ans2kik3i',
                latitude: 198.95,
                longitude: 755.27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'ddx7u743e09iievf64bund9v88kwmk8gn0xn8cpsl1473jj4au0wwg2bqhtgs703hcteltbwd5akzn9tldt3gppyp3vz9rk6pf8jingry32nkfgraike4cvphx8ffyzd1gt0687t6otqbi7yrdsvsqoqhu3j4z5ntjbpbff75r7za8ab5t4edlrfrusxq78cjtt33ib4y1wx0b9lfpwnhxvgjwpct2qpd6acvd8wdx6si8c3pd6b8goy6tkjlus',
                socialNetworks: { "foo" : "bar" },
                description: 'Rerum quaerat repellat quas molestiae exercitationem laboriosam et excepturi aut. Molestias et at est vitae. At voluptatem debitis porro minus esse et officia ut.',
                excerpt: 'Aut assumenda voluptates quas vitae repellendus sequi aspernatur doloremque. Omnis omnis et architecto ducimus non labore ex doloribus. Ut vel sit dolorem a sapiente facilis provident quibusdam. Qui sapiente natus adipisci aut est voluptates ad illum.',
                email: 't4ef30y4j787qowx856hqfjbxv1m6iz0q7avq08uzgwazs6p0yp93u1udy1zfl74av3xhaolu32b7ghmknholx6jvpe9omxrk7p6gvtnjcrv6sxuo1s9bjo8',
                phone: '4kvpirx2t3xg82ythtk4ngp3j7t13e51sooh1vtfhnnl1wb9j5x2x1g9rluaj8pjve3wpvn7gpx1fsplrnb5n07li7l88h5vc7mem4i8e4xzw5e0jd2i2or2',
                fax: 'tq1t9m14hxmxg5ivu73vvbkslg0urhkpaqmpanus4p2fmr8k1tzb6sph38ghfs25ph8vvmqamuun2bs7v1j510whi4diwvy3znqh53qjpb2b0zwffeq1vxmp',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '80h77ud5axw8dju5zuwg5hg2k71yvo1koyq4q',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: '4fb3ipqqli',
                locality: 'qd5h08smka1vewk7gwnbb77eg7b1eriudt2ls3r2efpsn2e17xq8rno7p2ari1nwqjnwj1vexes64cfo2adogtx4fk3ld9sy1qdj0cfjbb1pzgjy3r2xwz0uvhbq7',
                address: '6q36q02j5gx3obgtw6tqc8oamfr7neyxigwec6igrfpy1s81xsoy6q9wx007iqis56s4hptbmjccvgl85md2yj7iar1kumwsjmpz8obkc425elm2yxwlq9qwwt4dkcj8koi647nxn00xw1qrqoyewboxv84uslhjqlcvfzvk9fwe55tojxcqhcx2mpnucmmyc7mae24832me3nf63acekf5leljxgir9lrh7ske9eyw1lc2dh0sx3mxyxpwlir4',
                latitude: 243.15,
                longitude: 608.63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'ae4i9pqz2jwl0f7bdtld93zn7zwptsdwrqzhesv2a8xp8am1fq4kdrurhvdy15qu6s5ehxix2c0742jk13exxhfe6slsp77hf0snp578jugg3xhv9so5xgrxlnmmiynnjiyg63jqomkhyz5g8pn5degjykbz8jzcpiuf5y2erinq1m1q58s7jiwumkh8bgnnjv37nkeirsps4i8cg4o38w5jso0k51cn5qhltpsn7n8xlgvf8mkvqt8p1r2hyb2',
                socialNetworks: { "foo" : "bar" },
                description: 'Iste sed vero qui. Et repellendus doloribus eum animi est. Blanditiis unde nam fugit voluptas voluptas ut molestias sit nesciunt. Aut quis sequi praesentium aut. Autem et tenetur ipsum.',
                excerpt: 'Dicta deserunt et facere consequuntur dolorem repudiandae ab. Nisi odit aut omnis. Maiores rerum perferendis tempore illum eaque vitae quo. Ea adipisci sed id dolore debitis. Quo architecto repellendus molestiae ab voluptatibus.',
                email: 'qnk531w46et1ucpbs4vn4b45023rs02qc9e05u7qbwo2y3fkyaf1802rtwirir70gc3enfb2kgs29vr0defwddgcoputro8kz5eoqptfti4k1hr1lxkmecnq',
                phone: 'eoyk0i2defh81e8lmy1iiyjme42x8wa57rx46pjki5vvcj7e8x2diyccokkfdh1qqnqj8wcv38tu5cs96y5tqiiq77lw8zm78q9nc8n3ptilnl2yw36qdjw7',
                fax: 'lw25ozgacqsqpfmus8dupghnrdasi3eimesaqxzy0h1kian6r28c2i7rqvu0t4luz9bh7ufms8qkw3r51sbd34ro4mpgyab8b3hsbcrwgsbvioxq4v5hmcrr',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: 'qliysfqspflqvyc0puent1tck58nc4gpgug27',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'yjzk67pchd',
                locality: 'vvpq3u5b30ph4lvlbllz9mldroy0mmdxalrplvzl4saafd5fql8lobuqi9rwz8ihc2sub4nu7aepgg5yrybpvf9vawhhlzhd72bedrxd22xasrx35xp7xxa1mw4e5',
                address: 'w5wtpxzxsmu08muxykrhsvz1qic7n7jblf8rmehfh734y1wnqdmkcp990sr5yfaza3vnwg9bwnzy2sl40tik7hfiebihnmtdtw0n5f7imqg7yczd87inyc1xddu8obpbhw5uclyvgpkabi5wx9aegmc249qrmzp8pmfx66bok3s59i0z5kuniitnea1catezdmf4hrqbulajty7rdjezxtvjap92j1rc1as9wxdhmpnmdv4u9any45zfe3jp6c0',
                latitude: 670.07,
                longitude: 637.24,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'ktsfee6zo5qnvn7uglyjs45b06rlk57mvhkle6rz2zrilipfj7lbv55csiyjjmg9lgofesg99acm4fqgfw1tptax5t365kwy8ayns2qdfd3ts0n16vy2jfara7p8w806muzw8pd2i9fiobytf72u9zqznvaf17kug9w3gxpanah9wwfczpm22pot3b2oufc6ff2t7femnz07lveza6zly4eyvute3nol5fbd0v8x1sj0h5i449ym4m5f3hypd1b',
                socialNetworks: { "foo" : "bar" },
                description: 'Et recusandae similique quam fugit error cupiditate reiciendis aut. Cupiditate vitae eligendi eum aliquam quae et quo architecto. Possimus sunt quis quis fugit hic et est temporibus sint. Ipsa asperiores sed. In iusto non saepe voluptatem deleniti et alias eos asperiores.',
                excerpt: 'Porro doloribus rerum consequatur facilis impedit animi ex. Fugiat exercitationem repellat qui excepturi repellendus ad eligendi. Debitis aliquid omnis quibusdam et in eum iusto accusamus. Dolores nisi voluptatem non tempore et at quia doloremque minus. Magni deleniti quae aut consequuntur odit eos.',
                email: 'nngb2f9d6o1xrr6gelc71h9h0xyryeuyd0yb2vktrwuiodkf3xqzbbegnayb9rhzyv8qc8azrt93pd9j39tj971zmz94bpjp3deaf3zlbvxta7f82ss474jh',
                phone: '44mfaxj563oos83luxy0oeln6zd25otp0h8839tremmapns6ozq1zld4qhjicgv8co15tndo619vdsdgqarzunlms2ufwarahuhjnlgfhigxur7x6bv9h7p7',
                fax: 'mvt65w2a1xf0hvb6ffartw2kav5lr3o795mrtd07h4ggzh9g5red7fqqpc5tyzg0ti92vfuy9qyjozi109994tlmubryvinm4u8hr4wevrr2z9olhvs3f2lr',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: 'yakh045e5o2ly12dtcpmayr2kou5rq2lpcgp1',
                zip: '768sjajdca',
                locality: 'y01bl9khjotns65gh9ydte0qzva0zu7nkktfk51cfyv7hibyf75aefda1pfbaz5coe65houqzm4y3c7h99xit5cc0530nv935ctvu1r7sbg7e01765qxqpkhnmwxu',
                address: 'yej4by28naymas12prb1ih7j0tm3qkp825qi62nm0nc5dbjj5jk5gtxqo2ilkb4jf9hvjcakax7bkxivhkh7mgzarym30y73d80zimjimkangvf8vbhwy595savyh69yv8g12qdb90rrbe8t59aup1yqv6hniqk04oqts0oiz38skjzzf7ozfxt8ft0f9mtnlznz523bvfcxdm0ase2po96k3gzgszst45uhe988qyizscmegdq0z63qptq0lye',
                latitude: 847.40,
                longitude: 303.63,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: '3g2qaqlqfslmfa2q78vvaaukw4rn16equ2m5fz1mc3g1893893rnls511nmjj73e96v39dm4ohopvqbv1dlfwihaut3g929oxzrtbbolab5ri5mopnc9v6iu1wfth5hcczzznxe4ndh09nz9extgwxi3884iwqb1llv7pz1gtxqj3ok2m1713qmezjtw5j82hnjcwtwqy5e3z9vz2dp0k2bq81jfe7hc99vbv6e4i9755g34td6kks0k4iia3lvh',
                socialNetworks: { "foo" : "bar" },
                description: 'Vel placeat nesciunt necessitatibus. Aut sed dolores deleniti. Quod aut recusandae. Natus optio sit ut molestias necessitatibus cumque optio saepe. Nam rerum architecto adipisci quia nihil. Odit ut sint quo autem laudantium praesentium.',
                excerpt: 'Voluptates veniam fugiat qui. Blanditiis quod est. Ut nobis repellendus quos harum qui natus. Eos neque placeat qui optio. Sit odio suscipit necessitatibus nobis eos qui et qui accusantium. Corrupti reprehenderit odit eos voluptas.',
                email: 'vbg9bpw8prsa87hldt29n6tfeq3165rl7ako46ahqn3f6bg75mb9zfjr0h8jmgti61df3azzhzcjm8a01k7lfsqkivxgf4ezd6hqoduflxcmepqspwgijrbo',
                phone: 'pql05mahh0k4qujgy55nrcywn475g1v3rb220sxzfmt379zo7qvpc7338ifh5s68pb20lu38x1hgsw9jj94l64w5639yrfjpllby8cl1ffmy44nj69iaslrl',
                fax: 'n8pp6r7wh1dskt1qlc6qmtczt9z8cphi2qpmvh2ys8krp9wcal8m9q96y7ksk52miwdflofu6q3egdijib85264j2l5cnf1tp1mzycjnpv9a0e6b5j0hs7no',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 't5ko8a3yw7',
                locality: 'o8lojgy3130nv6a0vqzcy75ea8acsr60zcb145leai5qnnn6qxwsjgmwwp81fm6lxni5tmmkpmtwl3z232ve6preljy2r8jgsssq4xh73pa9ujlqqm467lglpr4wk',
                address: 'sdzhld8nywifzhwv6gnmaeenmcgqi5snvcs7n31wfpitjs5d9h49a30lx14efvbp8avlctusnmfmielf0cedwd3g6t7q57q59bh0d8t1y3lmlbdw1e4coabqn0q2x9fjhwq0m80cy9hfl7drculv4iwmhhpwrje2v5yxof6tmxqubcxzjmrzdvh2ysws5ovyuznpn4g3p9hvpiibt2nige2c1axpqljy3ha31ku5w3a92trb8p1vr0ndqqlwo56',
                latitude: 235.18,
                longitude: 670.12,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 't9osppmm1h3w3q0mgks0c03d81e5mtmizgqbpr8kkdlelgnuznrrbk62j8eaz7we00s6zvsf3sjte3gkbin5lnho1ou18tqdkdork3s020fvoqspf6qmwggy1qa98jr8cbo363blfulqk744fb4pwmbo9bks45e2vnt7zqcbags2g8f4kfdemv448viyt9b52g8nysrb3q17pehtpy01qh6i01pxdjrctf7fw4j57a888wjftjpg9twgrjibare',
                socialNetworks: { "foo" : "bar" },
                description: 'Ut quia consequatur nulla sint necessitatibus. Iusto quia impedit nesciunt. Vel qui eveniet suscipit deserunt consequuntur. Est illo quidem iusto veniam quia eos. Ratione enim qui deleniti inventore tempore non.',
                excerpt: 'Soluta perferendis aut numquam voluptatibus id ab aspernatur in. Magnam voluptas accusantium non qui vitae. Tempora incidunt exercitationem quia amet culpa. Dolorum voluptatem non repellat perferendis laudantium sapiente saepe. Excepturi qui tempore dolore ratione rerum eum eligendi qui.',
                email: 'wfsvre0ph40eda3eu0mv336un87o2cortn3u3bivhb6x5ondogjo8vrvfvnjuflj4td822vevxve5llrekn9u5a9699wa52462udo3hqsp0d08vb6nzwa7h5y',
                phone: 'oeqlkmu6s9tfq40p2rncrocutp91kz1dnztpo420jh04kvlt20zokrfjemb8om2jv93qufc9do5bjgu065s6lto1mdo5v6ty49y39wvak2f91wusptxx8gs3',
                fax: 'hpdo38iwtnknsyxrjpmyhag1c9mtiqjey67frcs0vq9r4eteld0jc07u3dsov7n082mwki0onklv7c1vd4kgwooz8m3iyzhd0pgl5vyu48phebv8luxgo88q',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'epl3lv4316',
                locality: 'tsh5t8ae2e9tb63afw8a1yef62a53obpfalbl31wmp89i6cyz2iqxxyv3qeko7z26zzrlurf7rfijd1orzi189jv7jvj3yw4yklxz0a6ja3m9ybjbia1zweqt8kbh',
                address: 'unua2o9inmf2qw44ej9lt0vy06g5aeevxae42litw0yyfdbl4puehswborgyqtpudw8il2v20j68qbfj7hny1te3l060mzbytsrdne5uuij18j8wvjz4qfppl7e8lq3rcamawrhulpddexj9bhqo4g56ufq8sv8v2uig7z8i2y5nlhs3d0kuhyahayn6walljxd0mar6hr0w95iou5uq79gtnaa4mgt7o8qj5yz1e2wpehxvrb3uuw70xyjhela',
                latitude: 194.84,
                longitude: 236.41,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerPhone is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'uqjk607cum5skr98gbvkrmgx6eprkpfxcyxhyflzal366djzzdjb9o8b0yx14v2z21pmf7iyci44bakdaoc4go79a9pokfhbwhgf2q7szd2qb2lbjwteihjyxym4yo7na99yhc3qku6ws60ii09c4mfcnmrko6autyp6tgdhjchafzwb2amslw486ovvvm2jraxrp9dsl62x41rkhbmec718m3b0bptx1nuemlsj689g4g2ypyhq4f2q0ul1wne',
                socialNetworks: { "foo" : "bar" },
                description: 'Saepe ipsam odit quidem excepturi. Voluptatem et qui repudiandae voluptatem commodi. Ut placeat quia vel et labore cum maxime. Voluptatem pariatur quibusdam.',
                excerpt: 'Ea laboriosam molestias. Reiciendis sapiente perspiciatis et voluptas perspiciatis et. Assumenda voluptatibus impedit quia iusto temporibus id eius optio modi.',
                email: 'sw3xp9lkcsqnungfxbaoi39v1op8ypyqrsjewx47lembtg4ho2a1zynf7b1fpbht633t28n5atgfss7uupenevyt0oaxrvop3xverdxokx5kq1vmupjxgv73',
                phone: '0750vqbz88kjld3ow7toxwy1f3czkftrrbxf1mgeqn8nfiuptwu3vm81uioucs0fvou5nb4uexlut6ohj5lksbao7wfkq54r1lty45fnjq3urve82h8hm10zt',
                fax: 'vga60h4zypz56s2sh5ztw428kt8iep3al1te6y1o2tgbbaixcyd2sljf6x2595hzbf3ja74reto8ttmi30hdyrsxwlhovm8e4s41ir8uo9otczbice8n1pz9',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'u605ahfrnh',
                locality: '90xpgasagbcwmy0n9siqzuo89xki0tidcze43gt77tqhj38mlk6l5rg59hhz61a4v9kvw0cwofajo39ww39drz062q5tmcrkne4g0998x1i1nwj34kp8awpal5yib',
                address: '0jlgfgetzqphfbt6847olf1bvm4nl06tlqc2elvutbu64awt5dfgb30bdn5qjdzw559kb95ul98obwz3ia55bp8mfqs5ps1smvbtl81z25rl8ac6ogi2t6uvcqtsqqcktnqpk897samlljn3rivrk267dyickbj6m0y5mruha2i1xd6ybq69u5qf0jf0h6qi1cv2pb9z5jv5uecb1cjpsq4e08zw09c74sl5r5jqic9mmzg54dy0iieftysuk87',
                latitude: 185.68,
                longitude: 546.88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerPhone is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerFax is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'ym77iypsfctoylsfwsv4f48vfq0s7two543hsv7wtdthdl6prx1qaltrb8rkg3al7ja7lwxpj82egtmeslxxrul5gsvwfyrnp6n3swexyu0qnc030xzrahci3n2um69b7b8yd9ico944yxgcn79eu0pk1rnszmwj8tpwz5sqp80qj3upqqdtf76ph6utrq19f3bw0l206asir2k0yr2gptfa25ijd5m1scx1nw7qnvbcy5u602rer94kqs91382',
                socialNetworks: { "foo" : "bar" },
                description: 'Aut asperiores natus. Sed repellendus ducimus magni tempora enim aut doloribus atque. Aliquid quia recusandae officiis dolorem.',
                excerpt: 'Quis tempore perspiciatis voluptatem rerum vel non. Tempora et odio similique quasi. Ad accusamus ut qui ipsum. Quae esse consectetur quidem suscipit et dolore aut officia. Laborum aut similique distinctio aut.',
                email: '3ngs7pz3juaxwewl69ggsjs9o04v0yj61lc6w8bcou77hi68d227o9b918n3pmpyx7mbene7hmx6zsxahu72gsyrd89jbgegb74roud1nhrjyrjnsrmebwyk',
                phone: 'ew9uw13f4zwqh6pm7an5j40t7dn6unn60b08vlj2iv4e45pz81fbjec9vw7r5jazf2q8vd1knzndmdisa698rgq1e7id2urxpodx1r609yv2glkvxzwdtyc9',
                fax: 'eqbjxgbdyaftrnpytk98xngldplo7zv1aoqh1gpuqlh7308y9kw1ng1jn0sgjf97qperjo3a4rq8gfs77tcwg6a2qmi6lzojdf8ijcklg3uth1rscmvmdjs98',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'b56tefox4u',
                locality: 'kvw1swge8xqxjqd4765jqi4aaobsi2estqwx9o7oz4iekg4326obauz7jiigovmfdk7i0xsowohmtcqltlk6a44afx7hwvmfpevvn73j8owl7v9gcnhdo2rygg0ai',
                address: 'y845qs0nsdgyc9c995gdhl2vp07rg71egb6xdbdxquade1fidv3ugbpheuiorzooj9legohmlbgqmu5owfk3w0ekpa087qnai0wrco2w2ocuhnevf4ajjxufsxwzpi7wlqcqgsrtefjze39f2jh5g9do1wigmfc2igmx8zq56y5w85h8y3okkaq7kdlovfo8obx366do5k772av7da6acd6nw642ac3yikakyovqyncx1yzx0k31okmz1vgztxw',
                latitude: 317.76,
                longitude: 149.39,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerFax is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerZip is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'y8wzt36ojwifatyz7wl747btvpwp5hgczwbclr02amghcp5l10pdou2ao5829cygv4cgddlw50xrfhicz8rbofph7k7u8b8zxmc2x4ehxjv8ilvk5kuqya8rqpvw4bagu2f3v1mukgid4s9lge57obvfqg2se34ysacfoxyraxem4cf6r0ihjvqrb0gfvf8jk592dndp8lnbcuo66n9dor7b7ugp59646lsgwuxh1cohz38hotzskyv6jw7fqi6',
                socialNetworks: { "foo" : "bar" },
                description: 'Harum voluptate non eveniet. Est numquam officia cumque earum facere sint qui non quam. Odio possimus aperiam at non suscipit quisquam blanditiis possimus nihil. Consectetur eos reprehenderit in saepe. Consequatur a excepturi dolores hic deleniti voluptas rem et. Doloribus sit est rerum dolorum delectus blanditiis modi.',
                excerpt: 'Reprehenderit tenetur et nihil et nulla accusantium aut. Error perferendis nam aliquam architecto in unde sed quaerat natus. Aut alias illum molestias qui tempore unde dolore qui. Aut mollitia earum est expedita dignissimos. Voluptatem sunt aut nihil vero amet ipsa tempore. Rerum quia voluptatum.',
                email: 'tu228f880m2fqqlb7c96xx3s549ue0rxmsydtvi82h0rz3xfkytptjs63wosjblnk5uwwfzjt0svyg1uy6g13yecaulcfcffyw8g7fa5k0liggnzw8hsm4mv',
                phone: 'ryjpe7lq7qqv3u42pvpuyt6257scf40n2hwyc4urwyder8lwhiwwc7v4g1rgy0v1g2ywzo8h2fpft07z427owfkocd9tgji5ycwgsr0kwsm2l9zmagjoggdb',
                fax: '8gnoqnvgb8cnpo2k1ofa2y2u69pxxfudqsfyg15gl3ujrw8kjkupc0tgwv59ybgyxk91f17lyi80zue6mzu7spp4ocdo1e5wgcp2ycj6d4dqk0d3l4c34j7z',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'eyjyzbddte5',
                locality: 'st6fudroojn287gzr8ga0gvxawbzujyy8iqm0kiv0gg6obb6ulkwibd0h9mxdxlbmrhi6rswudu95rt0bd2lo6v8wkerkw9ogmp1g4cs2d2mi01epuxq5nw4uu5ee',
                address: 'qtn8bgpfoz4jk7guxdxax0as1lryc1b8p7le8slw5isd365opwg3vnky6aq0qd3qogla0owt50w1x1f3ivvai28sgc4gmv94mxtq46i833ia3m2qz8ego3h27g579ev28b92im6s0lola45cnv6z6rcicvhpdxm4xpcpf6ta08p84uq6mnqf7w1d0yfv5heh899qjj0k4kcl0h8meem22q0eddohhzl7uv3mh7ldm68kge8zmyjehwfd6tnu5fp',
                latitude: 350.74,
                longitude: 393.79,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerZip is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLocality is too large, has a maximum length of 125`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'n20egkt71e6igu5xrnoxwwbjvzyrmsfodvqc0zenavh97jf8t53c9ykgaz2uqp7b28o40uvb1fy6wwfrxkl1wsi44qte2pv8w8vwarlh8t099ykdgsgx8g0e2xad14g3urpph55ia6iyeq8cy99xm5kyjbdz8jptnh4yyde764lbzwm0orzifjpkuu3exabqac3fsscq2x8san5i3vse8j2a5qrsn0b6fy4yjpxvo5e9v7xf31loct3hv39hgov',
                socialNetworks: { "foo" : "bar" },
                description: 'Id porro cumque vero et non architecto atque velit. In non aut molestiae ut sequi tempora et laborum explicabo. Repudiandae natus rem eos vel sunt earum.',
                excerpt: 'Voluptatum possimus quidem recusandae laudantium vero nobis. Omnis repudiandae voluptates fugiat eligendi accusamus nihil similique. Deserunt odit qui excepturi in a aut odio omnis praesentium. Aliquid illum iure neque est odio fugiat. Qui ab et libero rerum pariatur quo amet aut aut.',
                email: 'eamua36v9kbmj12hctfjuu5si2ib0tyexwn7zt337j0ovb5izgfdaq7mywkiks8ipdoztbvx2bczh1o2dk8uj8ehvhmm5r0mxrln2yn6bc1tk1g5u0fnkqjd',
                phone: 'v259bz8w8rv2pn6jxlh5mk07x33ftsswt2xgqgjqzuo8cokwnfbs8kl9u20a1re2ln8l8dfg9b9f6bg26omrgygayhiekvz1borqon2tkzxifsdi26zpd7sa',
                fax: 'ixj3utg0gsj9jgb5vw4f4g4sq2adb8mkuwogbze8xwypf1j1nhnewewabck2hxi89swihgbmkc0qy1es8dsr5englcly1qbnyrz7e8ka6qm016ul2t07se94',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'j07xw874pf',
                locality: 'kkdbk841pa9i99sqr2ci6h6ufjmuh727kqvg01b5645a84y2rwg9nav4cac32nik9dpt8vldjgjad8s41hq0t7lr0ksmxz5yydl3dqxkou53dx8zu0wa0eineadupa',
                address: 'zi4sc3cx3ar9m4fktc1vpi5wbj64znppb7xsn9n08iy3gydpdf2pudnkfwts4sem3ln7y8jwzdse2ljb109qsr9r488orh4tkob4ua14x4glpf85gr3u4n16n6grmq67akqexmh8uhqmrs0qagsm5co1s5cau9istlgu8yam7099jqghscxdfw9pdyfsg0jd96bw6s6smhzmg7en1e3pmimdzmtmy1gnwka0vj5pqrmwpbp1jq8hb8roeen45xt',
                latitude: 447.50,
                longitude: 619.11,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLocality is too large, has a maximum length of 125');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAddress is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'hk89wtx8orn6bv8dh69mm20bmw89qjxkxe7a1wndu9rphtu19qael8ts1oswae5y1m8jgyq5qw60i9tao12ayahnybggye4xqom5s053nvksswio9kuhvkeg9gt75mqkwzrfvbt8znztlstef5l653v49pl996vv4gg8xyf3z3i89m4rkmcinytjwm1fahdngt82tysdxfi0xpxnonhg8brn6xgds8lmp2kc38gw512txeu7lcecpn635gefkef',
                socialNetworks: { "foo" : "bar" },
                description: 'Aut sed quia eveniet quia corrupti sit voluptatum. Laboriosam qui quasi. Corporis magnam similique. Dolorem quo quibusdam nulla nihil nisi dolore. Et inventore deleniti quis temporibus. Rerum quia suscipit molestiae ipsum debitis.',
                excerpt: 'Distinctio perferendis aut. Asperiores sunt vel. Ut nihil facilis autem nulla enim sed sapiente qui animi.',
                email: 'jy4rbjr0gjlqsy3vwd4tmcfd6lrusocpqvlebn4ywwbntfx0hg2r7e3laleg24l8duhg1nr9ope0z2974nk2paqll8tb7clq4r3qqfsl0t57zs7n76j6qcfm',
                phone: 'i6bajlr7jfbp5levgktl7pcv7xdhhyisi5z7rwcbh6rp31qdtruvk8ymzgr8h12tokqrxxqp9k5mhy5xxnqu2wvh1sb412swizme457buh0i6czpvlroct1p',
                fax: '2f1fep7q7dktqr87ubav1bzfb7r4t5npwffc2bzk2zxfmhec6x3k407zmoshab0hkbbwq5kapfdqqvijj19rtl88qx03dswq96mumconl0g5aswh1t030o7x',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'h62y8cgao4',
                locality: 'f8z9eodl07mydfo974os0d6isdadqwl4l0lwidmqwjn29ivg70n7g7fkg04pldsgqrrk681rt9im4eoubrahokhh1it4etk172qv7vgnseqwir5u21ntag50tef1c',
                address: 'sfgdrnkj5w0qhxx9hyp8spz8s2vokm1yma0r861ckbwk17ofu3cqdhkm5kwb7yc0uy8vm0jn8h0o71khmeycx5ricmplh8u6ae58w88zqydwsv9ci7yq5n01echc9z0qpctxd6lecglj9f2ygjel8g0y70c10dhqjpqlrtz3goz0ws0shqblb3ra8zj2wlrl9wpbfwwfmfovl82jow0qgnk3izee8yk8ndisycywij8j3nspim17p2rl2mz7c8uu',
                latitude: 707.73,
                longitude: 264.86,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAddress is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'fc3w6omel8kzwp0knzercld1aedm9r7aq00ilh1ll0bf7n8hbslj2veruygeqz7z3k9k0bo1e01zxtxzntyxkk39k7w46w5qh8xg4v56278rxmrdb3mcjvqno5gvkgbby2pe8mywgzyley4ooaeaq2k27rhq964waskwje9pgjhzcrcwgn91c8znlalpodcy6mk7xkpdq229fpbo6i8e2oeuczwdwd3ys96c7mny8svo6h7g893stghwsu9dw19',
                socialNetworks: { "foo" : "bar" },
                description: 'Aut tenetur iste fuga et quia dolorum. Nam non praesentium omnis et assumenda. Architecto ex qui voluptate id quis odit repellendus nihil. Eaque reiciendis omnis sit ad ut. Quo molestias consequuntur alias.',
                excerpt: 'Vero cumque magni nesciunt rerum repudiandae. Dicta facere esse iusto delectus pariatur. Illum necessitatibus assumenda quia necessitatibus accusamus facilis.',
                email: 'db3gtepqwcqt6td4zncvi5m5r16q8p13cwya9464tz0p811oksic911348hgvkfwe3trqkdrh7uyarfo7ynurzgvyt6jz48bt604t9ci7cj4doaljieu3zd3',
                phone: '3woczdgxtisvykwwiaibfssol3jxnmcynf0sxhena21vradzhdz7jpqsrk2a07prk7r2crr889j3v08iqtucfv2fno0lv7impb97vo3i7gpk0c35ufrpm8ee',
                fax: 'vazhw8iydfduoaz56aoody44n47vklwjwb2apcsbml08lq2hoe2edk9ieopqpsa5oj9jgc90r8qhx8iu8gz9cs0l3pgh50f1s223zgdgg0hyqakz3sxthv2b',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'n6jc5v2ozk',
                locality: 'b179ubdltq095gef8mf70z8divm4poqux4oik9957paxhz0ji7exxemchaavlna7m0tis53uvg3winv5fk6t3xwck7sddye875dhn9ea0lsveonz14ogkfoaaq8ve',
                address: 'u43m9mel9c7bt8fz4kdfrwbq8e9n4h1noiqpwpcsi2wh107ukwwpmbc6zmee0uc9veps3n5xctkny46f5hbfdba5hxskhxg7huqipk1canteb8t96c6x2gsnu3bwt81w7hjo51nh093kcbo1cmv68821yrb4k20b0qgka0j8b4rgsyxizom5udqobukpwud8552o7jf8ywtjjshjnf8docp0sitcvnsccyp5ime3azo2h3tg3b93gj6z7v25f9a',
                latitude: 220.47,
                longitude: 446.66,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'ae3wol7byllnxljihozr2ovlts27s10s3c5w7zej8zolfrekvq54vntujsm0yl9ml6i6la6n2i021e1pisc1r0na2r5mlu8ke6ztzvnfr1q0qph4wiuci171kd8knemxl22jvx80h23bo8p0tswl32e77uh3adxwkdvu8qjymahtxunl5evu5pjjih9xhridohueynky0e948jpjx7o8dghro3y8dwvl0whiulo07gv4aejicwlzj6qd2ona6pa',
                socialNetworks: { "foo" : "bar" },
                description: 'Perferendis quia libero sint eligendi quo aut. Necessitatibus similique placeat quibusdam. Eos tempora totam maxime. Doloribus aspernatur voluptate voluptatem molestiae qui sunt possimus voluptas.',
                excerpt: 'Sed voluptas voluptas ut et tempora quibusdam ipsum quia. Ducimus facilis doloremque ut pariatur sed velit enim repellendus. Dolor est non impedit optio voluptatem.',
                email: 'job8qcld7te7zp0j52ooaaknzz8v6lf5pdbnnqdbn67lr0us6mp9le1l2m95nloeile12a0qb7ykz9mmxx32p4db6t4mb1cbbuqpcdsp1jsl2dbg9yvo30fm',
                phone: 'tmoejpfkugh5sslo6jy4bwmu7sgvubyabz4njd7y3dfpskxz824vy8eg9dkcptevc3319l8mjekm1li5e4oaognwlk9i82200tayht8d5hfdmymo4g5cp33y',
                fax: 'xckbs6v6cd8xfd7yqwv7xfxqoflz1ag0od8s2kyvh1ophzsm5fer5jpu0gy8l8r4feo1tj1lc1ua1xmd4391wnc369cpukzpcqwdgwoc2s9jmcbm6tu43msp',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'squwfgw3i5',
                locality: 'ljn0xw9zvskbuo2k3fhypa7hptlcq9rd7sp3tgbw78ke5imsbibfcjj4fe7ce9829hxseam4o2g7dj1j31h6gi28urk8yh50li5hb4ubx7314wp7quufkutf993w0',
                address: 'mao004duurfftc50abslwfwstp0iye656l1b8vzz5btqg6krk8bv3xvp2cehvjrwtx9ygly5ee20pe7dfaxq7poqiswz37jo0sbq678g7ydms8g77vbv6obbxzb8otl97b0a5i4egdrbkrvdxrem3dwkhpeh9evkdibkwl3295tfngtv906djhbgr7givkbqmnhm09pdi2yeekgw3t7hsg3mw6f6ue2xewhdk8bn236m4njv663o8aytvn1sncg',
                latitude: 683.03,
                longitude: 610.46,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLongitude is too large, has a maximum length of 17');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: 'e9nkzpjjib529olgpxlj00v1rlir7m4sbqkwx3mjzfni1rojt2z2abk3z1bmzavoc62717kl2gkww6hsbzc74g36xyun146391o9v4nqjtgq6p24hh85dvyrn6w7jjzrfaftjnvq4v3o5e8n8nh95t4dnqate38i4v5t8q31ajz203le8hk5py6twslrq3iysfm4ztrmx7xkvszdu0tg1fzai11f6fqy95ii3yydsw7g3r2brgh4yl5pf86pcm1',
                socialNetworks: { "foo" : "bar" },
                description: 'Eligendi ut laudantium accusamus dolorem. Nulla fuga ducimus tempora excepturi. Adipisci sint fugiat quos eum aut quas. Officia non magni. Quisquam cum ex iure sint laborum non. Sed laudantium veniam.',
                excerpt: 'Sint ut ut dignissimos quaerat ea. Consequatur ex odit saepe. Officia dicta officia assumenda qui qui quae et voluptatum est. Perspiciatis vitae sed.',
                email: '05x5caygtqgacx53ytut4ul2zohfi5j8gf2ljz4gm4uuhe0p6hcfkcseyxbeyztk83qusnoh5r40k7nw2r460xw90lz3s0gbvawi5s7yxbetwvrtrkhl1xw8',
                phone: 'umhtxw0dg4nr3wl4a4zdcpc11qh2692sghq1alp5vtucgupkf3ptbdoc6hirzkzo3ap5875kfvxdus4fp9kp2p7n9ac8fp9xj0uwjz9m6n9emgwi2yq9ct0b',
                fax: '3264b1ev70mk64wistr0oo6yqunngb1gpv1abyqaezxmhxsusv16x6zpzvf9agzhvm2ighufa30f322ty33kkoud6l2x9ydkd1oj77svo28tp25xn4yae219',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: 'eus7qzdg9r',
                locality: 'ndrb6eombz91ycv00cgxfxz83dkj7gvu03feiutynuzxy9k2dzpbddw4gh6tfqk6ebxvw5qd2uzdv6vyh73h5u52gsge90xevdgyykm6420vg2rf64zo89fec45oc',
                address: 'y97k4sz438s1aaidwblkh9coekf2bsfpepb3zhxgjf61rndeqnfm08sf3n8afk3bf7iko4a3wlbksvqy0gwewwctui066xtdjzhik9fysbgjrw44gt2h643ubxtr2ko70162e4bac6aosnjjazchay6r3jdqqpe72nfa8ppvadtmiad9g2ki4mtpq2zqclwgqfl8z2wdgoo8ye167vi6v0tnihakj150gohw522t6a91v9q66mrtqqbb4kkzgh5',
                latitude: 585.57,
                longitude: 645.47,
            })
            .expect(201);
    });

    test(`/REST:GET origen/partners/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners/paginate')
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

    test(`/REST:GET origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '915fa864-2144-4632-be90-fdf947ba92bd'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c3358001-fd7f-4dce-b2bf-4255acc38d31'));
    });

    test(`/REST:GET origen/partner/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/f20c72f2-85cf-4e38-8b81-15c605d8f20f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET origen/partner/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/c3358001-fd7f-4dce-b2bf-4255acc38d31')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c3358001-fd7f-4dce-b2bf-4255acc38d31'));
    });

    test(`/REST:GET origen/partners`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c54b0fa0-9b46-4edb-b440-43b04de27c57',
                name: 'egt79f3y5io3cgihcqalqaukuah4inq163noxyzuz10tl00qnlac7hiot9arlnrylq9rc1v866azouu220j77pap451kjchh47lsi61ysw2fzjv46jtrk8wvqkhkvf8uh83snkvdawfcb2yb7jb0ueb4mnoxah8le197n0cgzaf8jvd08cnq3zjrffdb2oca5wcrozr0p274yz04at31a5ymq0jn2jgin7q1qplrogpys56qwxddpozxfskqc7p',
                socialNetworks: { "foo" : "bar" },
                description: 'Id est esse consequatur laudantium explicabo quam excepturi corrupti. Et quas consequatur dolor asperiores iste aut assumenda. Ea voluptatum nobis debitis labore nam quasi.',
                excerpt: 'Et quidem rerum aut ut hic. Sed molestias aliquid voluptatum ut impedit molestiae quos dolorem vel. Et quo deleniti animi est explicabo. Totam molestiae aut repellat eos odit quam.',
                email: 'khczbwj7mi8bpatprtjze1efnjio1lv7uetf06pvhc7y3vqmcvlhwbaexipfzien0alx88vkdnnn17ghc4iybd54ozb0c5z9x3xd7pjwnub4y6xtvzx10p8i',
                phone: 'xh7fsdbw1zjontc3keqyoxheep5yy82beeg8peskauj5yax6mkzk82pe1ivrvs4kpgch4kuf4g6cmhslqay6kit9v2jg3hqt59p97c4irife396xdz64b5r2',
                fax: '98hvouivkfb3buoawurf6tvatxoyppo07864wryk8lm7jkyh8fs2n1tnnmxhogwvxq86jilx8awvmxbrl4tkylnweqedgjpqvffefy52cdtphsy9j2q72en8',
                countryCommonId: '3d6ba96c-9869-4620-af45-2582c4f176aa',
                administrativeAreaLevel1Id: 'c9bb9196-a3e9-4baa-a80e-17b5143ebf73',
                administrativeAreaLevel2Id: 'f92478c1-3504-4b80-a518-52d8719a62c0',
                administrativeAreaLevel3Id: '08a2c1d1-f435-4123-b183-30f2676c9218',
                zip: 'gt9g0ezf2s',
                locality: '5gbjo06uzzveg9iqem0si4owfw4un22ufx9mya448lsg8bh0ugs84vf3ed5ag6ecipm5i4b33o5d9nhvhw8l8znehlhfz2qxwz6id7a99ewswkridl3uja0w0thbo',
                address: 'zpa0vnafagyv6fs3ljpnupe6aoyn8v8t2bvs47ka4ww2skvqygosdxkqzfqumz7b3r54ljzrcdc21nvnlc6j8swi2ck3mbwh7441hts29wut6l6ier59c5izw5plbyx70fabj2thges2zazvq0pvsv1rvgzm2lxamrexff6oqeso8mds3y1lzf5180x31oqms5duki8e1yrkkh8vjgtqeuu1m24kuz2hasntknlko6ffnjlknfrx20o4yoqu783',
                latitude: 22.67,
                longitude: 181.16,
            })
            .expect(404);
    });

    test(`/REST:PUT origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                name: '5fx9xpw2v0974a67xx7nz27pp95qstp20n60fxng7kqpnqean6hyxsesvv94x7ew5ch6m3j83jb2pq34z7d8laofq88b45x3lxbi2e61cwgpwqjd2zi8nnml9xpf8ax88hbmhwb05acp7x2t49h78fh80eqd5n90p8cdpu7qtiljtmruhxtqq93inlx32p9kf3q28thhs0fabydvq0xk98prfvqx46b9qfq1cwvngu5f0n2f8wri60bfk9z3oej',
                socialNetworks: { "foo" : "bar" },
                description: 'Eos provident voluptatem maiores maiores velit blanditiis. Sapiente sit nostrum et aliquid est est maxime quibusdam. Quos neque eum illum aut in. Autem modi sequi tempore ipsum consequatur molestiae alias et. Ut natus nostrum quis sint soluta quia ut voluptatem eos.',
                excerpt: 'Voluptatibus modi incidunt ut laudantium non voluptatum. Aliquid iste suscipit qui qui distinctio. Eligendi ut sint assumenda fuga labore sit sunt. Deleniti saepe rerum qui deserunt voluptatem voluptas dolorem quod error. Qui aperiam eveniet harum qui iusto natus in nisi et.',
                email: 'q59pnlicesq07xr3rot8cwac106t8dfwzxl3jrxritrs9fghk7z63ipuadv80e2ifg3yuf9o72btem8oio9722nu7m9zm5x1q4sisjezwt2almsnp3vdzong',
                phone: 'jt6netqhc0jz59a20wbhgher98fey8tayevcqkcc3p08vlmj7t3bwa552hebj009rcrro2dwf4tyi7r6i9m6xfjrbp7zt200wi8o9xn6f1beeet1lto5gx19',
                fax: 'ok96am16txh4if5v51j1nbj0plieo7rktut0hyqyltzwry8rbznqf5oyxaajy12rknarqi9e0vjg9d753rarzqxct7irlb2nnwe4hgs8h3hmvm5nbgsirhc2',
                countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                zip: '7wrcu6kxp1',
                locality: 'e9e67zl0uze1iyf9ku60xx35scksv2a5afv0o7xh3sbta1zx8m7zbsa37yrcsk74sftdgbrpp7fzm8xof0jxpmebf46je2ntwo23bp82k59gwbxvivo3pz9rohz5e',
                address: 'dg973jz2p05zgx3wq8jn35gj81qnij56smyw31s6n1978rxsg775t71l8va4lfftz5xgbc93ybur8tybhhc6ovcg7nvl13f8xz57eqpxabtas4ccxdt2dp9mbla85mtovm9yeggr9i7nvku87x97qki5eztpe8s0qxqun5e7tgd7bxvehwcif9kdow9jp2i66g4lvac8puhee2cw3z5zwly8zcraai7np2e0724gcbhe2clex8d95w1u8ppi33j',
                latitude: 717.88,
                longitude: 885.81,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c3358001-fd7f-4dce-b2bf-4255acc38d31'));
    });

    test(`/REST:DELETE origen/partner/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/069d93f1-9e74-4513-ad7c-98832e596956')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE origen/partner/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/c3358001-fd7f-4dce-b2bf-4255acc38d31')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL origenCreatePartner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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

    test(`/GraphQL origenCreatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '55f4b018-7586-4d81-9c4a-61d5e08fcf36',
                        name: 'bbinfgjnr2jktfv38q8viatn6z8xgtcqlqpd6i3zmjubfvfkjxs571wjkdpk0c7w7pko4o9cqyao2lnjnvbp7w7btjn7w3qn6fiv65dqgxr19d1jq3zp3rophf98hnikzd6oreymg1cy49fopvdogohpw994boubbpxr0lsgbypz6tj2c3cb9mmbqq57hkzfvke3lgp5g94wjin4nns2mvv64gedpurvf7fpsjib3b7mmpfehz2lqmftb8dm5tk',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Possimus voluptatem consequatur repellat numquam officiis excepturi. Sunt eos voluptatem possimus sint et impedit hic sed officia. Debitis molestias praesentium consequatur alias repudiandae quo omnis et.',
                        excerpt: 'Molestias dolorum animi rem. Animi voluptatem eum repudiandae voluptatem omnis qui id. Voluptas amet laborum facere. Iste adipisci dolore sapiente neque.',
                        email: 'u0mrf6tma0zra0xq2korv4mqlpb9v7fhd47yyb7x7hln7agj6ttbwqcr63pxp8dd8mvg4eagoe091v2muazpae7n3n242utzoddiepa4ajtjpke9vjy2l072',
                        phone: 'dii7ikgqh20wtlglczskztjpzulvkl3mdy3g0p9wbv9jjeedtbk7ej2z052qnabmufe2jf4i8svzl9m6rbdwhpmde40m6l1vt05v6vp2knd4oew2gdqneief',
                        fax: 'oi52fuva73j4nspo3l02wo9d8lhtzyhdpgdfobqfskj9g9n2kz3082mn0rra8zcii49s5w62wkc0kh6ljvlign0vq14odnt32tnv61amzhqhnknahz40clmu',
                        countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                        administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                        administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                        administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                        zip: '98uk7bqlrp',
                        locality: 'nvh1ny785x72s4yls5ujor4fm5kl87ix5msvw3ta13m76esy2yvwno9drhjwrrqveggvk466v8uax8exkujexpo53bqzup38elyqqsi6kl9x6tj82j6qp9c2w6vah',
                        address: 'avamqzcqwqc3uv6cs5ir1xlhhm3ofmq95zlqxhtuaq03285qvnay35b51k4xqtvmty896nd3dh9emdx3933vh4uqavpbgn49q8uld30hrfzfi8w421j3ei0kokyukp29o6lfg7owsyuvfl5kixrotpve9yec029fgczpsl75z6gr1y70msueyufv97gl04bdf0lelpmd05p92o9uzpjvikfv8xi3bwnznaimrt0zopsajzsptoa4bup9u4pndtu',
                        latitude: 193.35,
                        longitude: 146.37,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenCreatePartner).toHaveProperty('id', '55f4b018-7586-4d81-9c4a-61d5e08fcf36');
            });
    });

    test(`/GraphQL origenPaginatePartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        origenPaginatePartners (query:$query constraint:$constraint)
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
                expect(res.body.data.origenPaginatePartners.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL origenFindPartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: '84a6cc55-793c-495e-91c6-895c2f0aeca8'
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

    test(`/GraphQL origenFindPartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartner.id).toStrictEqual('c3358001-fd7f-4dce-b2bf-4255acc38d31');
            });
    });

    test(`/GraphQL origenFindPartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dda45fae-c681-4e1a-baa8-e77a5c015119'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenFindPartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartnerById.id).toStrictEqual('c3358001-fd7f-4dce-b2bf-4255acc38d31');
            });
    });

    test(`/GraphQL origenGetPartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenGetPartners (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.origenGetPartners.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL origenUpdatePartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd00f01f6-3bdc-4221-acd5-974d431931d4',
                        name: 's9l4vks39y2m6bb3pgpgo1m0x6gaz1tnihzf5t0ajj8wqd0kv9njvuvn85sxhdyfou6yby9967e5abkjf8rsddu1gsa5fo6qbtm80fbrt102ja6epu00cxz9p76of4kyue7fbsalnbqb3neezedfantt8pcyrxdoe25p8eetvwuhil7ppcr19vnqzqctbjp1mi1tp745iqhnu834pzu7tkq0q9ya4o0y7rofgotdzs6v5durqck5xxnuaqhfnpr',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Eligendi est fugit modi sit temporibus sit ut natus quia. Commodi eligendi cum corporis. Autem sed velit. Quia repellendus fuga.',
                        excerpt: 'Aliquid sapiente recusandae a. Dolor eos enim dolores in ut recusandae aut aut. Molestiae consequatur quas nam fugiat odit. Quaerat quia quos consequuntur.',
                        email: '9hn2b857cf4ibryue4gedifgfu0c0tlqcaw5tz3xypfov0x43eh38qu5zim8uk730ssgtizk10q4bejd6x49v3igviepexyl2rkaw8zhzz91ofpyjk1e8592',
                        phone: 'g3kvrqgb4s8709ydfe8wyuqkegmpdhz8zto8crukdbbba08yi8afr8odakluondx4tznxlxk03yvbmupq3vz8tisoxpqqley2vvuji4p7u6ka5051193uqj6',
                        fax: 'jxm4u02op3w81wtqhaolz33yastjgz63qq1mf7sd4379qj9ok8ue4nvfp7mv4wpvq1p84dmb6pl1kwt81pa8q53h2iwnqz5tm2lui9wd7pyxz9dlvyna7eo9',
                        countryCommonId: 'e12e38de-42df-4a4d-a61e-e35394c5f2c1',
                        administrativeAreaLevel1Id: 'f108db26-eef5-4244-b8b0-c97df7ea553b',
                        administrativeAreaLevel2Id: 'f6ae9332-1b1e-4dcc-9653-723cd614fc77',
                        administrativeAreaLevel3Id: 'd72939ed-adb0-499d-8ca9-704e14178351',
                        zip: 'jd76nshlx5',
                        locality: '7ov6bkx8mg7z4c2zan4jongooxzfo1zyz1l6apymlhl2ekycv4ef7lhgiene3ki946iv4264kt4vcfbq7fq9z2nkuy8zigctqmarvl154oz1eka7xq0yk97g629bx',
                        address: 'nvdtiwtehb29574cw2qv1acvmffk8nqwkc61ptrevw0a0yb3d9r7eux9qi3j2pznyexo28qirgp0kybn76iyuu8i2736sh7zawtychw3s76na2oyawqpd3nojbx7s8j3qeayt5kj5a74ikgxrhedwzshjxmkz7k0wil4z66uky5qd687zft4yq27leb0bo76257f0ijwunjk8wapjd36lk1k83zrve3ontikyae9nglayx9mfuf3s9kfas3q5mm',
                        latitude: 133.55,
                        longitude: 456.74,
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

    test(`/GraphQL origenUpdatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31',
                        name: 'f6bf4za37iejzz8443ujxr8wb9almmcu2fuis6haxwsn6hwxhpiemq15ttoowhcv2l5izuhtn6535kem0zphk01a46mm4yruig6jrzt8sokxkg7yhinzkc5lk7gb2tuinelloorso2b9hrpfqon5f45db0xl6mrsp2w1f1d64dy6e5oimzs6r4zqn8j1wnfj5ux8hcx2xo5payplahjb0fin9swtm2n37xcddjgfnqqrlukij5baw29n367eksw',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Fugiat voluptatem possimus praesentium eius. Omnis similique est delectus sequi. Molestiae molestiae eum qui incidunt ipsam saepe. Quia sequi doloribus et nesciunt ea.',
                        excerpt: 'Dolorem dolorem incidunt. Doloremque iure optio aut velit vero ullam perspiciatis repellat aut. Minus dolor eum illo dolores. Non tempora quis ea esse. Dolores consequatur aspernatur non sed reprehenderit. Aut quia eligendi aut.',
                        email: 'xz4vm852zipitjv3kttzp93mm45k6kbgj0ehk2elcwh38rmzgbud06gqxqfu9ygi2xelb6cvt87zxhimqo1lax8tnt2omxxztm9t78746bw6yyfkgz57m5ka',
                        phone: '8x1cu46clbsqej0k5zo8fvnj99juif60twc36g4mw97nw7xclle2eq6hpmk3j90u54kwgvmht41m8k6ztks3x3t0v61fppw7h88pc6680vc04o6f3or5jo58',
                        fax: 't4sf04g3d8xacs1j7ywhvzztmusmz9rnskoylfvytvvbzauc0f7bdbelq2nhfcm0dlsizqwcweh88gwn1nj0by6p3bkce8czjbux0zovm2iq9k4bci201stp',
                        countryCommonId: 'c76dc079-9853-4635-9dab-ccecfb7d04c7',
                        administrativeAreaLevel1Id: '5880d44e-1d54-45bf-899d-a83b2caa8178',
                        administrativeAreaLevel2Id: '95f6828e-f354-4949-8fba-33b78c615176',
                        administrativeAreaLevel3Id: '001d78c6-ce76-4749-b763-5cd9cd318c25',
                        zip: 'mz8spaf2to',
                        locality: 'cc2unbuj1zi1ccrl6w69b0jx47c2g0dygn47wgz9w0cd9nd8zj4kol8m45nnurfvagzxz55v3t3d025ofuf8czubbff89hb7bc6jvcrm5v2t9li6sujcfye4q76co',
                        address: 's6s242y10lt9i0ye9s86k74hkro834xbiec35po1zaghi83uvro1z2ff8dhrm28q524o92kenglz227tpze12riinq183gw0hiwlo0z8o15gwqkbynjpyn4exqan7ti94gatog6ulowys26rkg9px0w9njzosdztzzu85q00rkcwyf23y55yn3fn2ppyjkqdcbls8hzexm9tbn8fewjwkjoi5qzl8jcgs62s5fyo227jtu7elbnklhn8kq0mjul',
                        latitude: 247.31,
                        longitude: 831.34,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenUpdatePartner.id).toStrictEqual('c3358001-fd7f-4dce-b2bf-4255acc38d31');
            });
    });

    test(`/GraphQL origenDeletePartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1d6cb0e5-8dff-4c07-94be-033be64a1f6b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenDeletePartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c3358001-fd7f-4dce-b2bf-4255acc38d31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenDeletePartnerById.id).toStrictEqual('c3358001-fd7f-4dce-b2bf-4255acc38d31');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});