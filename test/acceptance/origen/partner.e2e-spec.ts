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
                name: '8n28qwxg8jw6alaihfvg6yb222un9cd6q6wjtnp1aee6h7g7uis26dh9m76ljsy3no66zh590vxdwqius5sy160mdo0u1iei1z4thosup3d8hzco1mx12pkiljkix5psqyafvaxa84tlf5ym7j64izx8vwak5vobqlv54rbgztexcvbuc414aao8yhsw2ospey2152kh44abrpvemhwgvw2d3qz9egeasavzsnzbxbzdf8e1mwjtjo8qqf87ew6',
                socialNetworks: { "foo" : "bar" },
                description: 'Nostrum dolores corporis. Aut enim assumenda voluptas aliquam. Non dolorum occaecati vel odio.',
                excerpt: 'Earum soluta ut eligendi quam. Cum et qui eaque ea consectetur nostrum optio et aliquid. Ea velit nulla. Voluptatem rem maiores soluta nulla.',
                email: 'd8n6jzgyyhyqq4b2kgy8jalp87gtrnkhlzphkx08eduk351rhkfisj8x4jkklq5fyeurwiqsxuu3wvnxww268m49rtb43t7tufl8daytdbl6e6l9yh7trzz3',
                phone: 'sdsayj05m69grvrc93vuj12ft5393jtb4i00rdulv44tffr1knn0ex0ljc76ff2x1gbi7yoyat4sftudt9l4sfhj3u3hnsiex1qgraw74oodtiz330gjj9nl',
                fax: 'pnvakvarw83w64rypszqrlz43ksu5nghbkccdjilzca1y0ujl6fgf61eug76jlqh5zrwfvwxpcvxzox9f5nplweeksdadtaet55dzrby25m67u1oyo8w7ozw',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'zrh3966eok',
                locality: 'e092xvtk9dc6xz6vrutiwsdtno7vc9awzepx1tz2sq7py0s7qwl1rf165j9djoeav3d7djp1626du6nm2as4srwk3gosuh833iev76zmqs1ehlin7vbfpdqjpez9u',
                address: 'yc6dysngi5n3e800h8i1trvpp1ozvl3z6xa7xoilxqtw50j51ygeq6vu6zwc6pci7aop1nqi1tmcipx0gr45sw9cq5cc60ztbiu6slnmkgbn25sb2w3hw1pivtq0cakphe39nq3lqm8afvo5m236vdsab36rnmlzxnpfj8g32uglctz1kf7e4wl07m467jkuof5e2x6ftu80rl0b0rtd7tp5wjtptkz3nhtymsldsap9yj3uggx48xf3o7f37on',
                latitude: 442.23,
                longitude: 885.62,
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
                
                name: 'kjsyylbhx75kqcxfgvm4ywrq0rswy9xw296odpufyurn25xw21gurgx7vbd1wurad9t95bat4yjcyshnxo7ij6jelr691z7jbo9blz3u29hjqo5dt4k4nxpup9d7c8f4gp8a21fq554pgyf96vr33lje6ru3x7ed40qxw6bivstdagv4ycupfxhg6n6uc0aqpk30gb6pbyejxyqualol8t1dhm34jv3alc1e5f7amswla6u1wxwot07ejd7np98',
                socialNetworks: { "foo" : "bar" },
                description: 'Maiores cum architecto cumque ut sed ut ad. Quidem iure alias necessitatibus laudantium eos nostrum. Modi qui aspernatur et possimus enim. Quod quia recusandae. Minus iure quae soluta totam aspernatur sint consectetur. Accusantium tenetur laborum et harum atque sint accusamus explicabo voluptatem.',
                excerpt: 'Omnis molestiae qui aliquid consequatur voluptas blanditiis deserunt voluptatem. Mollitia mollitia consequatur molestiae quis debitis et et pariatur. Sit harum ut officia non laudantium quaerat impedit sunt consequatur.',
                email: '637u7pou5qvm6eemleqzyjkndk3a3dnwehqm6cnva4adw5orf03biz03s4fl74vxiedd9ii6am15bbohv4ls7kjd0364tx15aqzkpjsrtj2tbslnyx04kge8',
                phone: 'vhi4s7n0o1gyp2mv00rw9tq2jb5936308269gtbcp0pc2fic3z15on716q7uct306opdui82gla4epftq7uo6r0dn3elkobtlu84biu2sav94yktda4dgpw3',
                fax: 'm2qq68sdugvbmaghk2sq8ooo2wy37d2fnjttkcv5p4z1r0l02sz3v1dkhe7v1ns17rhw698sgi0kqehgs07g04vd6eq3hu4uexb7rsc9wn2kubt61fqkk4xy',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'x2b9af5w98',
                locality: 'q5t1ojy9z9gaoev1o31k9ss23kc6t177c47ed46gbyo42h6v0c0f3ngwrptwvnol06mlfi5tervcu5ameglgwyke2q91vbamrky9hgokcvkvt0qigp5ryhlbc5wcv',
                address: 'yz8h7gk4qigqprle9i5y4y6gyzzwge6mcrk3xt7pqncbwje5h1dhd0kz8pf5uqrmeboycq8y63wc24gquuszw264s8sxoxltxfzu9tox8x2r4jwg6sdhoqs1ktvz1oz0kpw0r3eiqfy1k6j7cqy7wzwyd0jnh93edtkcgdpg0xew2qw8kudnazmpvt4jzkc8str624k7aqy4mp8kr11a0azhvun1smmco2vsbxl4w2pqs5q92u1um6femx2sff4',
                latitude: 786.02,
                longitude: 42.69,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: null,
                socialNetworks: { "foo" : "bar" },
                description: 'Aut facilis culpa voluptas quibusdam ea dolorem ut id. Voluptatem similique recusandae molestiae doloremque nobis autem est enim. Sapiente eveniet eius et recusandae. Rerum aut quo quia nam.',
                excerpt: 'Sed totam vel eum minus et provident. Quos laboriosam pariatur laboriosam amet doloremque odit aspernatur aliquam. Maiores voluptates vel est in libero quis ut minima.',
                email: '4f0plbcir8u90084290u0yuqyeehypkhmv70m59zkcxsyd1i4hyq4bgrzzhqe0skv1cbk3o4hxum9o9j7gzjit8ui53z77l6qmtgzs7r06doanwthalkjbm2',
                phone: 'gvb0tr06xnkakgyg3uaf6qg2z78077zurx7t33ui9gk0esbs6eo0idmi1l27hvfc68qcrzjuacwx1ydho1bju60a57wulybd6xv69v0m8skzltzmroo7jumd',
                fax: 'hjmioywdj7tlomax8qjnyvfui8c5sr3efs24cpffum8ajixr2ys3vt5rzw19rfxgu3rvbziyvr5wc0ewi19iesvemd1kk1mqrgekgod9mu4wx76olkm7qinc',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'xd0h7ethfq',
                locality: 'n5g8gpf2o51plqjxpzxwkyt6t9uhfmixbvehjv4rdwchqgujptln3blnjdu41n2adjjbnzcx0peb3otqa2fln58ponn465h0qrwsc9t0juxa72wgcwwkgi7a5x8xk',
                address: 'yhnqdz9xac1s3ag8bnuedygkhr5qaqqwh7yf3g38rpvg2bz1i1ihg76yqlwd8ucipq5shn8woblauyih9vshj9dybv5jtssggotc3t8ewvqt45erxchrg03bf1iocg15n77m5vn8mwnb1ei2zmo1wpyeueln5yx8m22nwgelxt4z21aqvdkrhnbowadwikkb3weeo5ny6lksj8mzpmwwz4qishpcccohyx8gf2fqcy20banlaxvzg7b6cl01v7e',
                latitude: 721.88,
                longitude: 773.52,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                
                socialNetworks: { "foo" : "bar" },
                description: 'Quod voluptatem quia consequatur voluptates molestiae ipsam consequatur ratione officia. Recusandae veritatis explicabo voluptatum et accusamus hic. Iusto rerum non. Ut voluptas doloremque et totam labore consectetur.',
                excerpt: 'Eos omnis placeat asperiores quae eum. Officia odit reprehenderit quo eius eum sint. Non atque et et quia ut labore. At cupiditate veniam quam repellendus suscipit deleniti. Molestiae voluptatem ad tempora eligendi officia velit.',
                email: '781wdje661hsj590eyvcxr363vo24nt5x5p9x99c36zezegwbmxl7c93id58tq8ak7xgmabfm3hg2ux4hii5hsghz0ll54xgw8pw22u6nltbeydfub2zrhk3',
                phone: '880hzn4o54ez2rouhd1xwf3ho3y6qrb5y4n6vt77j3dbz995f62sfa5a0mnzznqqc7apyqoc8i8z6sbekc4o3v4s43rlmo6kkhh4dr6luxjrqelhh5nxmqlx',
                fax: '77n4j8olpmf3tqqa1cf4hn2awq8px1sr9kb8j68pnv34ake3sqak9gx2u3m4304zs9hy1zf4p4yejgmsx8517m6gc6l3rvp2rlvt1v4kin9hc12wfpmhldru',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'bs3pox4l5i',
                locality: 'lvjgip5l2dr7g2g5ricsrum82fpgrnfyfv0dtaownvhvwuuhjjcvyo73p3effzkmpxaictz93qh91csere6qfb3cqbxn2hdt2isijcpu6jtyt1jkdcduz4qclsudi',
                address: 'nnm02fd0mfqztaejragj9xuyj68iwvx3ajfxdoxp9zccc7ywgnftq5b9pq6ffjnu43hvduwo07ga0y0797e5ixbdcjr32hi1w7r7alaudjvn9o3tvka5nro5aqunuv0czel1x55lra8f7e5qycxdvrx21xhz7thapwt9ckg7kknzznu2wkipk4kf9oowu676zadob8bu5oetr86l6gpc3qhil7e5jm1bfbj7s19cd5l2tnq1f5wo2qdwowsyzk3',
                latitude: 785.76,
                longitude: 96.73,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'bw04a9d1r28g5ixxy9drb05tjsz81twxxvkv3rmgfutzj22xyv7jzby17unl198djul569rc8he2ae0n72sao42maoqqmw57yuuzwtqjur0yhehpsjqt8u28w5u0x6rllrv2y8mn73agzv5un7x0tdufh90p7oqszxy3044lh6z25kt2vmc8owqtaqaeypga9b3zc0gnsv4zd8p94oqwrwj9kayolef60te2m2of6p4k6vqrsl614qbry2t5g8l',
                socialNetworks: { "foo" : "bar" },
                description: 'Totam velit ut dolor consequatur necessitatibus temporibus animi necessitatibus odio. Est rerum minus a sunt veritatis. Sit harum sequi.',
                excerpt: 'Et vel iure eos eligendi voluptatem ut. Est ullam cupiditate. Sunt excepturi veritatis ad cum rerum incidunt dolor. Vero sint nostrum voluptatem laborum illo ipsa. Qui distinctio quibusdam ea ex commodi assumenda quis unde.',
                email: 'ext81rsxpdj9dt1146r8kwbqrsyi3ly7mqwf37hgphew1du8u106azit5rwlwgwomr9oy0p9s5tmsc4zwb7ien09b3kypjelol9d90d4043vu8w48kqyzsjd',
                phone: 'vr50e66is5ql8tqy2v8tuqczrghkg7sg9tdlzd5bp9wuusmhor89wgs1rjtw3nqes7o08jnsc393scdnhlby68hc5l7co3f5bwl3lqrdtcgqumamclz7jqhm',
                fax: 'hxkqhpepyx66tpalhen74vbwy9x2y1r2fwc8t12lzjsvvr94f6bs2zfhi3nn61svefh4n8x0wnvvcbvbf86jamktvbtlmvcso319n86i2pcuf9lyi2pgbmlx',
                countryCommonId: null,
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'cgqgr0e6o0',
                locality: '0imzs0dwdtzq40a806c128wdc6p0zginaq44w8q32y4id5cvmr1izmxb2edw65kh4nuw4nilox1mjz5r9plnqugiptwxem5bnxih56tef13ubavddbcbz5v5u8qye',
                address: '7lajr4h2r6qbmzrwte3sv5ya4zuvlb551p8bqxhgypiipmncq85xd5mqwmazxbzf3t56vr4qym2304e9o5ec00bu8lfhfxh2s0br580hdircn5pox9gwju3zfn7fole4zrtsyo4lnxdxlvqtidhpdfp7or3nrg9wnukl6ihbf5k2xn8armf5qla9agp65qdcte22fb4j7im9wofycskklif213uvv7l2174qsjuz5e5a847rf3irgkupsdb61so',
                latitude: 599.41,
                longitude: 534.19,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'frlzbginkbcigupxpmh63oop0tb2tma4ie3zpcs5ad5xp4g37rf729wlaxxtjwyh57swwis577xbpokhoqu627vktvylvibrel9s0lvio1fa0wfi9ivad8qgs91ffjltddr2r4oyev2bfmxj8is5k5pvrksk2vnn1yxlvq4e09cqc57qa1srfcbakk4197cpmo3le6c1kijhivjswr59cdb3mro5h2iadjju9cbpyz7yi5w8memj9ux6oipbsu2',
                socialNetworks: { "foo" : "bar" },
                description: 'Voluptatem qui vero eos tempora ut excepturi iusto cupiditate laboriosam. Quis asperiores aperiam nisi explicabo. Qui voluptatem quaerat et veritatis.',
                excerpt: 'Et eum reiciendis accusamus. Dolores cupiditate laboriosam architecto eum culpa. Qui consequatur est nihil et sit error cupiditate velit ex.',
                email: '5qn6jw7a1h5xngje1zohjzs3150sfnzw0bxg4d9rgspeafuviv6uwzfdbn2nqd518s8js1gthhg2v2by9jojtgbwnpfxyqo9yjwpbvy8dzyqxh8tbbbn0151',
                phone: '4ndwlr21w1h8v30vl9f2ykm2n9ke9s2hkelgkdhal3rwhfakr5ddj3pkcnvm02yh4xqx1jkwd9wgbqrua63ex2acsjhgxr02595jj4dxwurgr32il6tm7k7b',
                fax: 'jgb9wr2waq2q7envjo0ihxakzdvdt4b0s7umip5ibog69otdwk2w462969w919lingqx4lq1m6j8ay9dmzefqlknyko5pwfz8a9tdpqbt66xrax7y6to9zg2',
                
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'wqn4t7ttue',
                locality: 'rsgtu9cbgnjmjpjvgtvs48wtt3g7ufshouw7s6gyio7qw0ms8kp0r65h70ibi7994dxnd201j3bzt3oy6heip6xfcmkkzwd9trzb0ymv2uhaoyysvpm4c3ncvlrxq',
                address: 'n164jamdllrv0oiszwuutqrt8j7yq5g3w6b7v7nd0g9rcwo28w77eqmwi7xkgculs96y4bt84j6f987p6g8jgoxa9ienjcx2937g861ez859tlfgpuklz6azyiuuhz01fs19alrtud3ba1ci4jmcq9zocg4no02kas5w4z79by8ot6wukslnjfdwe2pqu8ozm0tsshvreku6f4cezz1fpiwitzlf1jopuvn8m8h23yk62zi1vchgvh3t5wbqzhg',
                latitude: 584.88,
                longitude: 322.13,
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
                id: 'htwevrsvqoe143whal408cvwcx21tw7jgkva6',
                name: 'xvmahz913b7t1wz1qtk87jc80bpzh9v3dnwx2p0630eza1vvui5r02fonoc33xd77jp4sw7mq24xa0o33gjvr2qzxccci8yze33ei20o3dh1p6l822qgq0obqudfyosmp58hm0wb5vs9bkpjpqi22e6ocsda5zb4eb3dq5izrpity00sw29v7oxfbd82nxg0alm3g7m55mdgki0gucz1x2m746hdtp3s0pknc4o2d50chymizx8dsapsenf3zv7',
                socialNetworks: { "foo" : "bar" },
                description: 'Neque in eaque illo. Nesciunt tempora maxime vel vel asperiores nihil. Provident rerum distinctio et harum ipsa voluptatem aspernatur ipsum. Voluptatum quis totam in voluptas officiis officiis asperiores error. Magnam et quo voluptas vero itaque numquam quia ipsa. Sunt magni ipsa commodi excepturi harum.',
                excerpt: 'Doloribus enim laboriosam labore dolorem necessitatibus blanditiis. Voluptatem voluptatem cum nemo non ullam quia. Praesentium praesentium voluptatibus. Animi aliquid illo aut tempore. Voluptatem laboriosam esse ut nostrum odit quam nam quia cumque.',
                email: 'v1dwnmnxg8xov4mf560rwmxnakkwan3klpvwjdv8chr6zgbh5w8h8wlrmnzlmolw1eb08ftzzfge1kalz36sw0gcg7h7yogcs3a0l96iq2e25j6qe5x5d0mo',
                phone: '8qq4wrdt2n071nfhazwqwtnd5401uiscuz0rp3dfp7hxexwfqgehqk7cqm1o8qv4uwgz3fhp3hlly5bi673xbimfcpqvdrmgc8dabul5ecy2po64p4wak45n',
                fax: 'fyx21j9a5jl2fpddgdf8hh8c9l6qo67u566oc6f85str8x6jrub5ixw41qt6r99t6871feaycydj8cayvrjt2o13au3apagplpuw8xaq35rybakai0xp8g6n',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'wgi4htu7eh',
                locality: 'nyqp86f0v240u9za45om08dbu5y38ed3pr6fvgwo039kfnehskqd9cy86eadmgqswoiqb7g9pavomh35038tdgdhnie2xp74tdvui5d0zr0abgyl68x0jww1zevd7',
                address: 'qylr33g62781891aqln38w4inryciz7d3rzw2d64vru45xwaej5xmqy46860zhq5q7k0w4x0uuff7joml7p64ybvuydwwi0wdzsms1d9eypjg8iz67aoj7r5qie2u4yixc50zmxeb7cu5nim2znslzh19pcchf50yyho8fy5p7z16n3owdr04xbrlcx3wdmlmbay772kxcgqou2sfkzr590tt034nhl2oa5z7n90mbrtk7yfvwtktuqy2u6wf71',
                latitude: 255.05,
                longitude: 108.45,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'e7q6n3zlwawqn1u0zagp9oips9y83g5v1aoc5t5bavkl52tvkkqrsoenq99ubo6z7mxa4o33cblkfjiz6hklxm6fm9eevedvpu6s6ynvfz98oj60ky98fvqoboamn1qbhobkmrxx51bfc6hje7ah5f8lxymbqq94mnr1nf71na3187j5mnhtf0ywexa1p2d4p2dc4zpn40rvsnyhv31bqvo3x72b21wxk4tncz18oz4lwq8lycch309og8phd6m',
                socialNetworks: { "foo" : "bar" },
                description: 'Sed molestiae magnam quis. Autem est necessitatibus ducimus. Voluptate sed dolorem ab quo. Voluptas iure quidem qui et amet suscipit doloremque atque.',
                excerpt: 'Aut asperiores sequi repellendus ut voluptatem. At et autem sint voluptate ex magni rerum et facere. Ut sit dolores aut nostrum aut est inventore.',
                email: '5vugizli1pxjod92s15v0i89x05jgmug9ljqcvkf1asna9ddhaffbonye8qbtd8brkce9axjz73fus6jpchcyaad8hwhf8ivtb1yv43ckw8dpd2iv95cxmll',
                phone: 'kj23n2dc80cxgad8wtfm12y9y8vzf8p37nnbybu0rix375nzunu58a24jcrezfg2xqt352beaazspdss5ke7das3zygx3ze535e4co9ndri5kowkd8rwas37',
                fax: 'nzlfrnyzcojzthbqbbipl50pqfs3uo6oayk3x6h74sttxcl6w31lo4vrkjs6x38wa78y0makbaj6co8npikkagvdoul14v5ec91g35t5m5w3qqbrr450kl6p',
                countryCommonId: '99xat9498gzonv6ar4d3y0nxvdwl8kou399u5',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: '31g4jji8yq',
                locality: 'okzl96fivzhbopjmgpev6wyi54tq2w6p2rj7e2nwbovmp4y79sm8o9zpc731mh1dj89wbmssjoy63ckmu4uw00e4bjnmra180x50cnnwyl7swagq8to08o7i6628m',
                address: '3r9iyujqznzs4bnkzlgv8d1ouzl63duyrstrjy09kxnnm62kh68xlp1oof1dltbr22c89szmc11hiryy5lfrgo6i4mfiv88df45mznkvqhskh575mkhbe3o76b6pbtqszhuczsqprm05tjx0ludp59x3o7n98q1dqw1lwfxyfoeq66pquo635ckqzu76t4yb7d31uf7ww3b4ao84yc741mcpdlag84o2pz7dsexd4t0at435fmvgkk5cq2igx7b',
                latitude: 867.51,
                longitude: 631.57,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'u66eoc1o1282q2vkf5z9gpiiwbq5awel6sgy3h4b30mu4c886uhh3vrz3qp3hddo2gwdva3oieb9615g00fyieb4m6lb2pn8yq4vdpn24h64ds7uxe7jqloislq9xmf52labympkq8wwdpfobvgu3m3i1rh6ol5di887fhv4y5z0s36k16emkz1ui895a4sc7i91c7md8k00brtqkmkfu37cmlxh5u7lp5g0ifj8kofl40farla59c5wnovw6xm',
                socialNetworks: { "foo" : "bar" },
                description: 'Eum in odio cupiditate neque maxime possimus cum quibusdam nesciunt. Nulla libero aliquid suscipit tempore odio aut autem aut distinctio. Voluptatem et quod et fugit non impedit voluptatem nam. Laboriosam nihil nesciunt officia occaecati fuga magni. Voluptas iure ad sunt voluptatem dolor. Repudiandae quia in dignissimos ratione voluptates necessitatibus.',
                excerpt: 'Totam impedit enim. Reprehenderit delectus iure sit animi labore aut aspernatur dolorum earum. Et officiis architecto. Ea saepe repudiandae nemo. Ea et et sapiente sed sunt sed ullam in. Dolorem nesciunt ex eum consequatur quod.',
                email: '76icbmg9kedmp2lsxvkmui2dtsxqwadylh6i8cvf0u5lo8pos9b7ls5r96leu3vsitwdpt4qbcnk33cr2fk4oa8ar1vvcztkd393iw89jfass1zpl1c18p5s',
                phone: 'issdxojv7xmluhfnsvowja8tditdpbbdkhj3ez70r0a8ru7conrp0tnc125o0fig04rhldlbeenxs23m8x3tseosh4ddqq4uvk6stsmyfnb9i2sh7mhy1qrz',
                fax: 'eizocux9dtohtr2airig8lvaqvtqptavk2nb8hu4qyu583qx9yn82e7yt05ajlqcgpme095u16iufak7zvu2yc25a6lux3ep5f8q836ecd3p6svq77eeo0d7',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: 'tbfr2rm6tn1w73swnw9ye8efu6l9w37i7ja16',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'x8pzz3qtfl',
                locality: 'rote0cw99bojz7iycvyawajoez0mm6lage6ot9t8cvk1uo0a4yzw06jxhxjpq2l11ftu2i0k8w2n69ntmcfh7kf094nbw2f2o9k9z7yul0j0d4u4xbhq8ydw7rc0j',
                address: '3w27m4yjfqu7vq3jbrj3ya4x03tiyq1676gvoqyk3bjind4qsf1h11t3ysbghrr75d6gcjzn585c0f63pzc5cnc2cmwv5r2z6lf9zpvudjxzwx7xc8r85rjg2vsez3lp3bt1fan7z0v3gk6xu8j7s903vwcw9oqgj6iu3fvzm30oi7it9cdsbgu050jxa6wbt5jxoo3lnhmcxxy0jx8rb4vaofmag63rtwsxvn3h1iaorc6hssvxg8k01zh3liv',
                latitude: 350.83,
                longitude: 865.09,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'ov0nxi7n4racbtku0dpi1zwo6p8o0tij4aguckcehow0zkx3e4tasylbrkppfnca2pbo3q8eyx1jha4pp15ygmc6aq22n5p33es5s73my1smgsllks1xvhile31q4v4lsznhwa8il331iwfhhnb3ivovq07m527aqba0gyi6023noqes8qkqp1e8s5u0kpcvt1po86lc7agogb5a0bk5s214ajsw6gvsnj0fdaowu5b8gj4r3txxb93dg3k8h7d',
                socialNetworks: { "foo" : "bar" },
                description: 'Ullam hic alias sint facilis dolores magni. Soluta eligendi sed optio nostrum est dolorum. Reiciendis commodi asperiores dolor minus ut non veniam in ea.',
                excerpt: 'Eum a aut aliquid. Enim tenetur enim non sint est et eligendi dicta. Eveniet nisi consequuntur suscipit nulla molestiae architecto.',
                email: 'x5gjkg27p5c09tpyidu9xsqzcbtrga4rnio4ysbelbeowvfwryv3f2b9ymd09ecd0hmh68acy4ksrknmgq164zf0ct3q0pb75ry58t42svq3bqgr9ebrqvgw',
                phone: 'cub54bfccef5n455lhdsz3fwx10yquf2nof1hmiqwg3ke9qov1mwcj86lxf4pehch30d1042mfduz5r08ek7z21jzcbdcje7dgnm78nrbvc777mjjrcrkb8l',
                fax: 'xz5u89fwf1jhgjtyvg97i3yn7ehuj6k8yw5gt1f0s3nhcmkcckaoggvq4rrk3adzjc14icf3lffkvmawh7qdj5ullo4z7612qf68igrcty7nrw96picq64yd',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: 'sadckjcw7uod2ky05td31f6cpl0pt73yy255z',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: '3wfkp7qqdy',
                locality: 'askith4ab7rnpa56wkixjt4ty3slbk8gzc8wymwsc76h8fwd7y7aycmf29ro99llrr5fp7rps89f69dwsqjnri7hoshx9cipct0mqk0ppjgkv16jqze4nlhan9czs',
                address: 'kxvu5betdiriuvzunmorupc4jqh853viqwxtvh4ynmn7drfle2wxywojfbgozedy3a9s0uy1adlxvoyiqttsfgatzbg9zvbmhezlfxqqup8dkrcyzsnffvttb3q3m15mfskj9sjscjrxsdpm5fgzyj1jgkkcsojcld8cjzzn3px5u4meqp2t7uezlxcrkuky7t1orxr3mjf8yglsfv783gch90p0jerwo39j5x2sojlya9qsb5hax36e5t3k2mh',
                latitude: 925.46,
                longitude: 953.06,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'j4yzk3n8z0v7yvmzq99axq580m3mud6c7ae9w1644ec3uz8b884amzt6cxy1l20zhikr701kdgp2c9bf4p8o4mydh6j43nsndqmi3btr4pe09wq9bv5g6r083cmlipjny0cfd1ufnwygkmbyfez1ipjznsfbxf67zwb9emqsb23e8xq9nrrt9fjij366oa77i73d91hetgkl9t94g8rtrl9ozs03es8i7zg57eqbxjcs0r9ctw2f3kg6iok2ujw',
                socialNetworks: { "foo" : "bar" },
                description: 'Ratione vero accusantium explicabo sint voluptatem atque asperiores perspiciatis nisi. Cumque rerum necessitatibus ad nemo dignissimos quia voluptatem mollitia. Ut iusto cumque. Vitae beatae vel ea suscipit nobis non eius. Occaecati repellendus consequatur velit culpa odit omnis aut quaerat. Perferendis molestias repellat corrupti ad dolor unde omnis sint enim.',
                excerpt: 'Ipsum fuga occaecati. Suscipit voluptatibus nisi est molestiae libero saepe. Corrupti quis animi omnis quis autem minus quo quis similique. Quam enim aspernatur sit sunt. Architecto exercitationem sed sed molestias eos voluptatem.',
                email: '69scagy8d0zdyfo3woxd2yhytj5vk8noukyz2br85wtd2cbervq386o80o65klp5vk0skquvzlxghbpyc718kjgvym3gjeotpuq3laibm8ib0tktbv0z8l7w',
                phone: 'j6jnj3gsj58hoclq1tl37ugqgk4qlqsinsccyafkzhyz8h3rx3zesxqnj9ljopn3izk86lvxaa89gvh4ka8onpcf4h9uir9oio1jl8ouxovhdgmfhesik84s',
                fax: 'lwv89v63heka74r91gjboes1h9p1wpxe4fexuo469bqhchn169yicty9jcp4golbw7n3m6aoueb9seaa8kp7lvndzqmvx2iepsioaljc0ftpjkqx3kcj54cm',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '5p2t2r51769dw8mwexmqdca00eqke0tgd41d7',
                zip: '6jniem86pf',
                locality: 'lvvkrocoejftn0hr24zw9zfhelolv3wvww2tptshu1287q9f5wkr96suotwbwizmc59l660961ykr7jsay0ca599d0mkycl8mhhtv52nefoofltjx6tqhur7n3hrj',
                address: 'mw0h8j4wdpkoid3rhm445mmqhxj647k295xk0k80t56cf3wd4ckc6kkdyxxgyzszsvzp7t8sst5u33kjgb7664tnocjj3g1atclfh4sfjhbwlasqpib6z8stinshi7qw0zwi5w15637c4sj2kckwhh0ti7iza1usntwnbii34r5s3k58ps98lg8kjlc7le31dv2ad2c5avxw43cmw2y04w9er7vgh18ihlov0c97mcjux0fpei1ter6rlchwbas',
                latitude: 279.54,
                longitude: 18.41,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'bsc0dw2jl3sn00mnc6vy1wcrmiicjjlyxro6fosu0tnewpolsk8csv7co7ju1l0f1p42rcqd7pu89s4jnkvigq79szgumxwijsix7raymiioqxhy165znsdvrwz9vwkrjsnodmujjn9iiqims1v8dmyyw9v0mc5mu4b8gynhljzubgv10ucojhbzdly0frjnbruew6uk80qgy1o0dqbr7gm7qnpkpzp04anb1h00t3cwd88uenxo83e8ee3gycc2',
                socialNetworks: { "foo" : "bar" },
                description: 'Rerum quisquam et facilis ea repellendus. Exercitationem et tempora consequatur id veritatis praesentium enim ut enim. Libero repellat maxime iure. Nisi et molestiae eligendi excepturi.',
                excerpt: 'Delectus ipsum magnam modi consectetur sapiente accusantium. Provident quae consequatur atque quisquam. Ratione earum dolores nemo laboriosam ratione repellat optio. Vel occaecati itaque non ab omnis. Et tenetur nihil distinctio eveniet. Maxime molestias expedita.',
                email: 'xp6mv3bi3uadi4qb73sx74z7mluz8n2kkjojs8m8isp6edgybw161j4ftrjmgc58i91m4wbs90hxlbmnqo3dbjyf9geqyrxkfh235ud84ade1t22vh0na2b9',
                phone: 'obc1p5v5xoj99irstbuxlqyhqytyqdoirgu7geis9s3s74q5xgea7cm2s4a3be6f38salgv37bul6ja1tpb1h55mc8qnqhfyp6qcy2vmxihnwbsw7vbnxgme',
                fax: '4mseqzxll64hj4riv4a8kwpkb2xjw5gs2f0719xr3r727oq46e2jhaghdqs5im41r3392jrmdkf1uiwxkcwwi8h24ov4abkhzj8mtosho3yqqaed80lynu7v',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'y1aeu8bpch',
                locality: '5opztffztubqnno72il1bku8gllwckp0d1pug06i8p0k11zsk85en2660irx8vm87w979yz4lus14ds4xy66igo24mxwt3k73jk6shze5649823u6gxd79p84sgq8',
                address: 'vd658s8o8uiqmsbyccbvyw7shpc29wusvezue2xcy9ib6z59zdwlhp1ygftcmkduxikchrujusm9p7hawlb8liuhajt9aldmv0a3vashowk43mmfrulv23ha5dmajt49td81x00s5p4c2504yp9u3ul19t0pwp36gt9n91h7mb9lx3ibmel8yyr0edba9x449yuswwclldpo3o3mghpuv786rtvuivsixfp2ls3k54qasb9l0ezo332h9xb7t4p',
                latitude: 801.57,
                longitude: 727.00,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: '69err3yj9s7cjncrpwfq6z3f3uuhbouxh6kzkmc9gmfx9mtm3yig75cmeuhy7r41dn80fdunjd6c9ty47r069lmjxe7lkjw3hx8xfjftcf038ggevozesma9atjiuutvczo2a0wyf133589y5apgkcnxtves9vt3ma27516uvl3axoujwq4ry8olxfewkzx1rrt9885xbh4xmo1581zij2sm31mywp80w675xhex1mk0szf0qisk3ixrhdth1qx',
                socialNetworks: { "foo" : "bar" },
                description: 'Ut nihil quos accusantium illo eligendi nam est. Eos recusandae consequatur. Autem dolorem magnam velit.',
                excerpt: 'Nemo assumenda cum iure. Nemo porro quia hic quia. Autem similique reprehenderit accusantium illum est voluptatem. Eius sunt adipisci nostrum aut voluptatibus aliquam. Ut eos expedita.',
                email: 'g181iqlndf5b56cqcc2imr5qdm6ie5m2olyumzaqy6l6fg23yhre1xldlmk9j4jfgwj57s0wk22zbwapgfa94ezw1t0ozvpag3sybh2fkdbl07u1kdtdw9cxc',
                phone: 'pga02xyj9ocwupx6yd7ujgbvkhh1q172qur2ww18mojl6jb19dgxsh98t8obba8qcey7k6j25r822yfzvuya00pzexl567kvtn2wyyflzdrgidxcov73muhe',
                fax: '1sv8jga2q9y3uahk6kur8i2fl4ueqx23lj92g76zs88db34ev53v1df98if3bzecdoxc0y90erhil1h5igopn67z3dx84lbdv1fh8d9jitkywikpew41kc2j',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'am4vwxfk6s',
                locality: '9kjuzqyr8qax1c6p76gyl8i4ltyvvt0wudiehuj0pvrellc3rayg5khsl326umbj2wf79tca87oj6e8wagwvizeo56u73zlcg4ertnp6jhr5m00bon4q7c9y8nxt1',
                address: '3vn01n9glf1eha0nzpniddtr8j8cdqvb4uuiaqoln2i727j294lv3xlhy8j0u2jrdee93entsgdql4z8qj431b08wnz29zx82vh4xpq4chjmqseu02tq4g1nbnnn12ixxjwnadqnamf2tvs1l2frzxu8ne1vbfps1a480326fmd7aqaqauhzv79dx1pgy5rf2t3lw2vbd391ts8y6wswel8s1qncdqsxnja0qcyyezcv3qbjtnry4146a6n600t',
                latitude: 538.10,
                longitude: 267.61,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'jbp7so6a8mg65n1myh4gcp1i40h88qyz984qm177fst8bpivj7od5e4kl9gmjp7fb88x48jgp9v13aiqgjm6x1wopobxow4g07fhvrru7xp6q55o64sv9wpry9das1dh5bdmdaxzsmrimsz8sk3fq55sfsxzjuvu0yxntcejhb9j6ookk9qdykn9u2x7oe1svrgjch51sb7k2eqvzc6xl9t7txmcehtqwc7482g27j29v8cj1m5tuqey5tulr05',
                socialNetworks: { "foo" : "bar" },
                description: 'Sit laboriosam est ab quo expedita modi possimus quos laboriosam. Provident neque sint quia sunt ad deleniti accusantium similique omnis. Sit consequuntur qui qui est fuga architecto accusamus.',
                excerpt: 'Et et non voluptates vitae nobis. Labore quis impedit ullam sit. Id eligendi unde. Enim consequatur perspiciatis nisi soluta qui. Error eos sed aut sit nemo consequatur mollitia.',
                email: 'v6yud1hg2w30jgjb0t0trnea93e0skt62wuisz32esbnd4oa6vgwzxmou1s0m6f37zf01t7srgtta3hkphzds6t8qvag4d5myj0u4ocmbgif6gzrwaz8sppt',
                phone: '93w378mg7b4w606pitzvlgx79mqsntdvzra7frjex2ddpa5uujy8awttbcxeuhqm6s3emczvgjohg0sn7gek9imxbkwcuonybyymtzjqtiq17gswa1xtqpyyh',
                fax: 'qbkm9yoek9emb5rqta0dzjmvndvcvz32b3r39rjewdfxtwp1mn7g4orymkhus5vqbyjgm9ntqk0rbol50pu69ys5o39gdv52pvjlxistypg598ii310mkrlc',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'rkm8hjnraj',
                locality: 'uaxzgel17slyoeybx16p85z6oauu80a0g2kzfkdx4oqtlrpc7jeh6lcutksow30yg587lc4vonf2csa4kemhfx1dbd9emxqin61ekipfnbwxerei9s3rt836fuy17',
                address: 'tf1id83kqprhsyt69dlk2g17hnmrh00k1ukr8smz0824z6j8xmyhbbo82otdxav5x3e32i4yrh65lsyzdso9zuthqun8wbqy11ahhicmffe8kp7d3bz4nzmqkkcmuae7sdjpomni2nablphy4bpdt1puf4c341uoh7nw0e6fel8ffu50gppa7i54u00xkjbn9ducm4gjjcsstp0vqcfytdln4e0ve5r5g2akavb37f7hyzf59yfm4k4opyzs06w',
                latitude: 231.64,
                longitude: 313.55,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'k494u0h5qo1myjklvmcxdjzixg41zo6kv87kf63jvnvrbb8ch0aneswfgba9fmonakrkf134uapewx9ty38pd8fdsuikoczrzz9cpbz508cegnwcr5hnb0m9cpgyrdw17g2emfk8c7r41nx3chswau4ehsgedz669pzy721qgtz6fe7uyilvz4gso9zeb4ded6vwjxm5af62ibmyp8h2z3v1v76gk4qcvo145mi19uol3od7wwiq1ppgn4yy41z',
                socialNetworks: { "foo" : "bar" },
                description: 'Tempore qui distinctio asperiores. Quasi cum nesciunt omnis dolor magnam itaque. Vitae porro sed suscipit tempore porro quibusdam maiores. Omnis eaque incidunt et harum laudantium dolorem. Incidunt soluta occaecati doloribus laboriosam qui recusandae occaecati natus beatae. Minima omnis expedita rerum natus quod omnis non pariatur.',
                excerpt: 'Eos est nostrum vitae aut qui ipsa sunt. Voluptates non dolor reiciendis quod nihil blanditiis cumque. Maxime architecto aut quasi itaque. Fugit autem fugit earum nisi ea officia aliquid. Aliquam quia est in accusamus. Qui accusamus incidunt et repellendus iste temporibus.',
                email: 'en2tq6a3skgqw4rwwdl7ewniaqpz8dyfobhwf47el3gim8b0cqurohgnbbrh45e92av7vlf3lfas65xt7wqs0gs54mzl5dtwazg6cn8azctw26oyw94bycfg',
                phone: 'cxma0xkwgdbrt6u1fx1ccb3wv7xuxdsyugwzdpxzrtibkyz9rzwb46fhdfidj8w8x1u5g4dzf3jhfnvx0ddboox0mes4lsceu08wiqpkel4eyqxa3sznyv3q',
                fax: 'elfsa5fp0chuo7c823mva0ictli7xk97kv00hw4or1a2lkgw600s8l0xttapyqhj69ad2s13wywg462ajzxyzreh7u4md0mk8gwkbunmuvr6eniii1rjjl12y',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'uwi2na86p4',
                locality: '7n1c5lcpv2m2c0t7ku2cylbneed0mauda232zmx17z1y7ajmihd072cjra16udkfsqni4wh8zfu8mejx3jfjjrv5r1ge3qy7y5ivgix36x00luouv3yncg5vck221',
                address: 'nnp3wavm5t0b35vo7l89we59iqmyo0uh0fdtyklz0zhiz1xtpiipvd40e4itq1i0cdo379pkz1pkrcbeu18vhljglh647o994ema8zvdmsmlflmvb9hqptegf3qpauuwylrc2u751pu695d6lxilu7s4fm7az7n5nv8rbko0nfg5y8khcx1d6bmylx2q1zyl3yzspxisgbvlq31nuept9sqbvgqz3lotf8ji9aag17vfq19o5map0nff8q493li',
                latitude: 705.80,
                longitude: 284.58,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'fk7vezhpxysr9tdwnk43y4fegm20p11oriwhqjtxi846qjsm8dpdvqkp4rpf8oz0u269adnpvonblbrkuugzhxwr82ok5vyjob8knbr8pbabz4czvu7e03qfv4szk5chry0c3z9t91z4ak3bps4uxhha463n0m71thv0dew5jc1i4g7en5y9i5qh4e2oxuzmpr8mqjt7auqo8cpopvd2fbg7or4678uzdeurq1gay3xdo4tq5d4aiij5s7ecrnx',
                socialNetworks: { "foo" : "bar" },
                description: 'Dolores dolor facilis temporibus aut aut est unde. Adipisci a quia alias inventore voluptatem neque consectetur. Fugiat eveniet voluptate et illum sint quaerat.',
                excerpt: 'Alias recusandae est ipsum numquam velit cupiditate. Quibusdam tempora corporis ut facere harum numquam. Accusantium sunt cumque facilis sapiente. Rem ut saepe molestiae aut voluptatem consequatur dolorum impedit.',
                email: 'zdbxzzooynmhev75y5034cmpt7d0go5nsl09xp12qkqj63x5mhik3y1l31bnznnxuuxahttgoh1bvku45jt6e7w5z0mtfyltynxxnmlcu32r2rnm45oxt6f4',
                phone: 'gtrqatfgjlaqg6stb8h67vik9dr0amakutomz90n6jsi0krafmmvpxfuzuqkqysqvjiak99bijz5xuu4dwkxmnm1b0xqz9doghuy9j8jdznzj95pq6yg8krw',
                fax: 'sjnm5vdlw1v6lvxg28vw4yim2xnnccked24z59fk7c6kfh5bue1h3t97el8of7s2zrmhwm1ev4ovfpwyw33um9pus5bpnudn0hcj81v9exj4hhzwlaqh4452',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'n30omrf8fny',
                locality: 'jgbmy0uscnuscamr336lwsellhbt06it0sqr7mhh46gbhwvq90yk4tlm9ux9eoqqby2o4dleyf0a3aqz0ubqlw0fcuz9h3n33wphbdhifcsf43a2vp9xsjsfwuwcu',
                address: '74aa602998z16znmyng8a0d10ijo1vl1g881nfkq3unqntko2sjovpexxvoher2f2yww1dfrfm0o317q76ebeeq4869cvdixpc5xv76s4272dijlapm72yyrt9vbmgmtoj43eq7nt50rxjkjgnd91blhfp72q8ltj5zujbgu9j1bpg439ic616qjqj1u9xnfhcjnn8apqa387mp4rqykt60ni414t3o6vvp1j26zh7co45q6pb9wdrctopdhw9v',
                latitude: 120.82,
                longitude: 389.64,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'bvzksejsi8lzas7z1sneo2n6h8t6y204qhh9y29xtblk5exetb55nan9kybciyv0ltbezzoznmmcsnn32d867r9pwl36hcgwaozp40v7fl5ss9mf4m1ehart4jt1uce9otkrcdahijebg294n8054ujgsyxf374m1zvku5x2cm1rbv19fcxgtzk4df03tqook7lr4mwsqh2qtajz9ufupugmyate852rsa2tzscf76lxca817g8uuwfgzfsmvs3',
                socialNetworks: { "foo" : "bar" },
                description: 'Dolores aut alias a similique dolore adipisci. Repellendus sunt odit atque dignissimos. Sed omnis est eum. Repellat rerum ut dicta. Quidem neque rerum. Qui id minus.',
                excerpt: 'Aliquid fugiat suscipit voluptatem quo aperiam nostrum deserunt tenetur magnam. Velit aliquid voluptas et quidem earum id. Sequi velit maxime laboriosam ratione aut. Vero ut aut repellendus laudantium id repellendus velit.',
                email: 'kim732k8ii43t6te16tdmcvcr8p3k5qe3m7a78bsc78zcuyag40z4jgw4pj6nkfoadiyvetvhf4y2cemddztf53swv631a3j1yj6am7w93zs5waeq5winisx',
                phone: 'we03ac0b7rge0zgohf8idyj411cv0krmghwpc7kecrmz8kwnzng7xb9cfn70ssu3qu4v3xyy70u376gapppti9nr3a7ofa38l6maqkhmko8izko1o23nx65i',
                fax: '9ryxh5bltjjl7341tbj1u56oftsyufayjv77hv3qzu02xuw0vbijxf56efhdfs5sfoc3caxkkxsd3wmpr7wrbv2632qr4h73rgct7yqjgtarpejgrrm4p789',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'bw9hxumtqh',
                locality: '1kf8avwaofimn1z0i4ljrvgn5ycb77uvta1f1al482xvht587ok478jl07h9mewyqgjtjogtb15xiojm03iy2c4zgn1x6s201aan975jvw66dw3swy6a86q8awdudg',
                address: 'ea4wx5vct6b9p6b0cxzhh8cfni7in4r43gpimz165453iedtwpasupssiqd381znu64o0ke9qirkzzvj7mdrtauuiavz0s2ruslpw9ll3gww7uo6auyi6q5154ezz5ittlvb7fxtlwqba081ehmks3grceoff378jnpcfyogmpm9y2f47rat1mlvsbhk2msuvl4re95w2p4qk3mnizfmwixdsbdhayao01pijc6suxz6y7ny6la3m3oii572u35',
                latitude: 533.90,
                longitude: 105.39,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'g6w8914d74vcwih9693ccc3shi2p5yxn3q5yth3swvppew7ph7kox16ardpmzsdbna3r7abzlmmgzmd8a2hckw2voq7wdesk56n319w7vcquwmvb1eigsu31mc1gnl75u6wsync64lwcvuv89pmv7cta5yuuj3w152ddjq5f75pl3mnyavg6ngtyk91aebch0r8s5j40ka1y7gbkae8oy0yfo3807n6auxsp0xskri2p4co67xi4ptl4rue5gvx',
                socialNetworks: { "foo" : "bar" },
                description: 'Numquam cum eum quaerat aperiam hic qui deleniti exercitationem. Et perspiciatis quas. Perferendis et maxime earum voluptas est laudantium dolore sint. Amet facilis et et. Omnis unde nostrum voluptates harum esse eligendi voluptas quod soluta. In nulla quas omnis at reprehenderit.',
                excerpt: 'Et quisquam saepe. Ullam sint unde id error veritatis. Possimus suscipit vitae qui dolore. Facilis praesentium quas dolorum quo eos assumenda perferendis. Voluptas doloremque magni eum et voluptatem alias impedit reiciendis.',
                email: 'ar6ywlj0gc37l6vvk9azi3buyyvhy2lflcfzxztg3yf1c7v9b2ejywjcohitcfuzobva40aktxpaqwnksgp52licc8luyx9erpb25brf50i6rp4ksr3n5eoq',
                phone: 'fjjol3k562b0vesmx72u9o7lj80d9vyqyzxor3jg59eyz3cx4vh0fb5rvxjn1ny6nt73iiqehckzgzvphxmclh4ulrchnwoduy591fiphtxo4gb5yyq6ozdu',
                fax: 'rdfskr31ojmz1gp8oxp95xalb6aokvidih6aalx7clkw4fzu6h9upig2uixj4cg9q7rygzcq4z1g5d4jqv4ji26nli0npe50l0r93yswdc9ayhhh3xuafkg1',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: '12z7jzn9ka',
                locality: '0d90b5j009o4itetduu37hvxtofxoy7ob2jx5nhp7nfxfd6mtph6fo22udmmyzca7iuovxtc43m8o2y3eee1f28qxlp3ew8bnnqi5ilonqshyimwjwf4c0wan2b5g',
                address: 'haahyr9djntimu3ty79v2moobnrykjtvcakea4xqllepxnswfvvjkb7emjle5g56msxrewd3vzoum5tqdake90rh8y46l3mcyst48eztfxfwk9obgazdck7gt3h5lop78ifeus0mun08e7i6kgr1zb4p7504srprdxm9rltchtmywkl1ss42h2vmedkt9elwb7gbrs91u8gps6ggci0t89a3hi1kl01yx5wafk7879hlffvv8vvtu5zoowiu46ow',
                latitude: 274.52,
                longitude: 747.58,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: '09k2jo3jm2gcj0bue5fzvcsgpeslo9khh1jmqr95pxordcelxl2jucgg3nlre81n3twvhmyyuj234g0jrjxsfye38h37c8mrcr492lpis818rsqr964p6vjnprw3e823ynondn5fgiv6o4iij7zdrtll13vemcnm7gogftau41pkvd39exutsjac8w22owzgdj6b3ywgajij5da1nc1j1j6o4gatbg7vbfx8pep7py1dudlmyi0umy296a30hge',
                socialNetworks: { "foo" : "bar" },
                description: 'Sit aut quia optio. Amet et doloribus et cumque dolor consectetur et aut aut. Dolore sit vitae doloribus eveniet nobis accusamus dignissimos ex ipsa.',
                excerpt: 'Minus incidunt totam culpa quia quaerat. Non quod non voluptas porro et eos suscipit adipisci. Et enim a exercitationem quo alias quaerat. Quaerat vitae consequatur temporibus et aut ea at qui. Eius laboriosam eius earum enim eos eos. Et nobis qui.',
                email: 'fqv63als2xfn7p32qdvjqtnbrhmky94h4wq5v5nr0io91q6d5lothla9a25dr4iod1wn059i1e7u032nbns20qbo8w18ydtqsidur67881kh9bxjp386ugai',
                phone: 'byy76p5svh7g1iondbja0stfyt1iuvkyhk5hsr38zjgvmffkdksjgtd0yky81vy1h6we25dntjxe2i9cdm52uzb1fewimuvq24ndagfpehv5xy807h4i9r1c',
                fax: '1qgwopomuhpps327dk4ghn509i596q5ba1nocxjertiotv07q2x4oq4o2pl4feylmayos3az8v7i1bwapfl1l3mh2hsj8adruv248845t5eni6k02lzie8rg',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 't0nc7dlod0',
                locality: 'drg5k4ssce8lvzzf1cahowrs4u2ervl31et6hrlbjtowqk97ft3nkqpfpcrmm4arael8y9kqwbz9g1urhcqd1kw4v1r8ezi8i39bljb1ols8j0n1bqsmm736vj8hr',
                address: 'b04gt9hn1qk64v9yr7yajxh2h02kz7mioiihkqjftvalhwiadzchyvznw0c8a156cigmejasftj6uk1f9qzyznz3k0uvzhw7ngui6ojneshdw9isajy9q8zcilkupv1gyjt25i2gzic1kaav05lq9f33wipbjmm0xgtarz2mi6w90n3poxwl2iv6ffu90h0tx2thwccrlbpulfwe1om1jzagv5c5472uahtbvjkf2lts5embg0t77vp4s8me6pl',
                latitude: 761.59,
                longitude: 608.71,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'ryeib6kr2ot6ka0xqditgo2n4u4j7pmu4mcb0v775xjbu6ssvnmfh9da5zicfe3v4verd4cq5tvifw7mlt24vk2pm2sbrbgdj2vpcmxrrdty6h2h91brf2tg6ogvo010etvefrvnkcgl757lwod0jqu7rf5u5d5rdrf4qmm4kqangqrkaoc7jh24kqk29ktb3k377b1bq3ympsbh3jskq7d8atl0a6idyh7gezah5xd1932etzcpse3nxpp2vm2',
                socialNetworks: { "foo" : "bar" },
                description: 'Omnis nisi quaerat. Vitae repellat voluptatum. Dolore aut suscipit.',
                excerpt: 'Esse sed sed ullam possimus ea est provident voluptatem. Magnam qui enim cumque. Non aliquam laborum beatae autem.',
                email: 'kv8n6z6sf9ml07s172xvt493l9z5lahbeeu45arxqaif66vh24zakur6rkkttmzh4cm98dws1pjogumxvgj6lrt8889s8thd3h1v0o6dzvcun11qx4n5fmjc',
                phone: 'pa27b3qid1nqpsgtv6a3i7rjumevpens0qoz3t7nwzexrh5l82dwnedbd34a73hdsqvo3hlu5wh0fxtzzvu8oup2e38ozpe9xsi3kackolwi5j0uvhgr0jrk',
                fax: 'wbcr0wmlihqnxssr67rxvvfyili3zl172ign8l64gcy6e0fwrka5fliqdqvr63nkcj2pduy4ypx3yf1h0kvsrb1yi5nr625f6hyv3kq9y2git84zo3ag9r3v',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'djzbeornc3',
                locality: 'rzgj9befx56uo527i531ekc7fpuub9yxj980zakrr8d0lom0tq7b4ppmv1gy0u6z6v7yqr3vpvvwau66ixll3sxkzkdp17e01lc1odshazlvoicpbuxyxt1ys9eh7',
                address: 'gw72pw2rvwt7nli74rp7tl5uwsprlop5adkkjwo9woauw1i2ldmbxszydz4dhtj66sesvxxloxiygcavmgczujy1lhfcmr534uzjq53vw8qv7f7y8inafdw8m3ujumsn2vyfxmd9sjrklqem2cer7ons1823ugx8artsjx4i1jl107ckhma524s6xu11kfbw7ydd32jq0sqdvngitm4h8c7y77prht3419ypzmye5iycqsl00tunn8li93slbuc',
                latitude: 946.24,
                longitude: 109.60,
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
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'qc8bl6aqto1oxxfa6zlq8thsn3g0128due2euyycd87xa1baozxulqz1elolrxtmt4blyka5j16gxzzazuiw4jlkbr1ygl7delhxnfitr2u2nms2wv6cegfy46le9fkl3xvxo1o8ayfxpnj665z44qegqrso4y0v17mxhwh1so2hixqp0yd45k0n7dadt6qwojs14avp5sw10n6awpgo1r69uv0yezjm0cizbtix1strsidotvsfbq8no2hu6u9',
                socialNetworks: { "foo" : "bar" },
                description: 'Molestias rerum quidem quae voluptas numquam eos sint corrupti nihil. Ad ipsam hic quo eos debitis perferendis aut consectetur voluptatibus. Dolorem ut corporis deserunt. Error autem cupiditate magni amet quidem vel aut quaerat quod. Architecto rem quo omnis deserunt blanditiis quo quas quae.',
                excerpt: 'Ipsam optio repellendus harum est exercitationem quod. Sint numquam adipisci non aut fuga. Est adipisci odit blanditiis aliquid quasi pariatur. Error voluptas perspiciatis itaque modi itaque. Ipsum ut reprehenderit consequatur et impedit minus. Dolorem omnis aut quasi quasi et sint consequuntur ratione.',
                email: 'fgr3yr0bfs3ww8l2hu4fn3r0rd7lhlqj8jcsus8chgotcdyovolnz8jh66ez36oqywqwnegzmg0sem13rdel7jz69ha0zp2e511amc13gskwh4rar4bx6hwp',
                phone: 'rsh1weemb2pihml5jaydvd62nvbry20rxtirkuaau2uxxvy07xcy4mx9dzjqicercfe6ustx5nl9haz4701nbtqa6aewh7uch4gebh827tqv6kwdpr4m05sj',
                fax: 'b9lqdi92csizkvb95ul6bzkx4uo1lzlcdw2t8wrri34ds501bs8r0uborfj8efyigwv27jxvtabgeoeyx55wyjh8vhjys79p0njn7i94h0z3bbi86cghrnus',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: 'wnlwbvs281',
                locality: 'f2hfeystptxmv0nvybkdyn4nnpxu3b62ii89swq28xy5s8dzjrerhn8oa9xorgvrwtd755r8rv5pl6f9cllrgsddp7kixw2xe4qepyrjj6zid0qnkwu1p05dogmer',
                address: 'fg6qitqhpgtcyughjqu3hr5uigd06b0q0x4m14ncptruvvabj2uj5xh2cwdy7prylq20owqysypyt1n6rwmuwpp224uf0ug197vajzhr2iyrex82vjggftm09op0o43ij7cbfblc4773gmuoibw4ncyd81uq08nb47mqllnuwll4fdusmz1b0g1isxx71t6u3vlm81jo79hlwgvvbrjkxs63kbtk0grayfjkrn4vffcwgaazbwwv3cnfzx7pakn',
                latitude: 990.96,
                longitude: 209.25,
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
                        id: 'a63ca5a1-fb4a-4159-af5d-888ea10d6b72'
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
                        id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'));
    });

    test(`/REST:GET origen/partner/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/c39a4b51-8b9d-49f3-8987-15702b3a1b71')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET origen/partner/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/f2c647ea-2bdf-4252-b870-d4e7cc5b26ee')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'));
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
                
                id: '37b7d09e-00b8-4c31-81be-c80086f490b7',
                name: 'es669lkvz734qj6vutc8gyb6dk5mu4k5sj5sgrwb29faz1xcxm82rh32hbx3khrrqh4wzgb3iir9u0pnuiffkyvkvkkshpv1132ttuig2bu1pknc5gh5f3662u0rqsxkgseyzrbkipfig6dugl3td60yg15uhbvav074bx6cecoi6baqbblncq28ghbw9u6jap0ud2wf82m8plgpu4ysk3pea45n80nk1ots546anw0p90eeaaxhvhitphmqefs',
                socialNetworks: { "foo" : "bar" },
                description: 'Odit maxime et doloribus rerum et laborum cum sint. Dicta suscipit esse optio est ea impedit tenetur asperiores. Ut quisquam deserunt. Mollitia aut numquam. Qui quos alias voluptatem praesentium. Fugiat autem sed.',
                excerpt: 'Qui eos error. Veniam omnis voluptatem commodi officia est qui corrupti voluptatum. Minima facere repellat suscipit est eveniet cum ad fuga.',
                email: '1asl07n0rotjurxz8q4uxirey9t7oq7s0ekba7m58buhor6h3vrefkqaic3bz5ixvyauvmuctl4jpjgoqy6y1r0250nurjs185f2qlqhgkgg0vfou0e50aq4',
                phone: 'ttzm33hite4k5r8duhv0s8abhv8vzwi0f2hq50x4gge2gvjbxvryo0b2kneydo3m3s2wm7ve8dzljga83mbos9fz9w0qzj40q2jhb86u5wif6sfiezmd5kho',
                fax: 'dpom5vjcc6j6yxlzu52idqfz4oavvcwp05v05eogy72i2dr6270wbiko4xjm518n3wimk1yb8jgzehssfxeu4kt14pv6vhyrk07rqp6o6nc8jr8v7skl8r2o',
                countryCommonId: '81e02fae-5c6d-4035-8d7c-1843a59209dc',
                administrativeAreaLevel1Id: 'dff4bd8d-7715-455d-bc61-ad91c865af2b',
                administrativeAreaLevel2Id: '792f9bae-b148-4d79-a75e-49687979b957',
                administrativeAreaLevel3Id: 'e76576d2-b85a-43d5-8c11-da57d8586e59',
                zip: 'bf590bkkax',
                locality: 'yb5ebo7t09mqpml8samxd78krf5gb65gi6dcbeojkmrqs7sfniks7i3mf2oo0ez0zx8262xos1cw3gx9a0y52c98jq5pyna7pxv64gqs4hp8p0d9mt3rzwapumtav',
                address: 'bl5qqux4jx08k3u34aa7vzh87zyx6t0pkuq3adruamg3sgvp2ptu0u8a62y17whh6mdfjrm07l7a99960ho6gm0ywtlcxt1mlb4js1fz6b4p72tuegpbywtn93jvwrapb5024tg36sw8jib4uiws7lyct2w7swze06bc2d071obd8v1z8vwfq0rbthgt1v2siu6eit479pn6ybvonqevnygbsa6hhuvegzcgxgjse6mtocztffpsdlidn08nx2q',
                latitude: 474.37,
                longitude: 120.22,
            })
            .expect(404);
    });

    test(`/REST:PUT origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                name: 'n874t956kww7ozo0c85jgxq2zb04yy5or8368lftwi04xjb4pcenu8c9lh4e61q1ehqzm4m41mno953nbnwe1c3xbgxrswwmkmme2g6eqvjbkajzo9jlxic2anllfyds0t3tb3cp0aciymuwqtb4scp8udbugpbl1sbljrjdm6unpm01lxdz1fs1pqh8vug58crbjloi2p82vupt2zx7p7shbj0t53az989v2ghjjm9p6hnnehruldnlm8lhis0',
                socialNetworks: { "foo" : "bar" },
                description: 'Quia velit beatae repellendus ab. Vel aut rem et est omnis repellendus eius voluptate. Maxime nam eum. Maxime tempora dignissimos iure error maiores sint placeat aut. Recusandae quia itaque minus.',
                excerpt: 'Ipsam provident dolores est quia. Placeat illo sunt consectetur omnis saepe vel vel eveniet rem. Rerum et tenetur mollitia quasi officiis beatae et omnis. Quae dignissimos quas id perferendis nesciunt eum ea.',
                email: 'f3y32xf4tc6bns1curvbputwinwhea2014xj0zl694qy4jmzv5ki2i6b2g12xw4ew5bdrijjl8pfb64kukqgyn2nnv071qvorixgkp61mkf8y0xcc3j3movh',
                phone: '42eeri31oaj45do3viloa9nlj6wgk1m0y4egxd6j92e65osrl66fho4c108pha0l29luye3je60ib242posbzk38oo8xsttun51j7f9xv5r9xrduymmpwf4s',
                fax: '5jp5s8fftem4hwyu4ut52pi2ysiklcb3xaviino1iyu0ml69lswgn54bbfrsmud736k26g12zhjbgy43jd28vp7ptkt0vj5vj8psj4bwpcnomsq4190k3rlt',
                countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                zip: '96b0xiuuae',
                locality: '6p7rdlq5sjm0nii84ms6ot2fumhru9tuntc5a6hhull60wjhbqbevd9tphpjt53tigiwwdssxbc98d2gxf3onqvvcr9ytla45y5ati4g1ysz8v72vytj60sa35phn',
                address: '2krvr2ge3o6dxq86poedplmxen2w12gxrwtnmaj1h7114fajm6hkx3iewgmzma1gzlmli1h1qxlqeidnusp3ag53hk9uhmowl6nxqgphdzl0988b8159mw0m3ia7xvzfu0sa12fszfj7gddi73z56kgrapgqmd3recw8i9l5zhrzvw8s6cgvvyaxskg6ofdm1npiy4ddyvg1a5vuvfgxb8yvx3da4xknaddpd476et99wta2z30zaydrp2uiq5p',
                latitude: 825.03,
                longitude: 261.19,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'));
    });

    test(`/REST:DELETE origen/partner/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/ed2ce7fe-ecc6-43b1-be9e-5d26a471698b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE origen/partner/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/f2c647ea-2bdf-4252-b870-d4e7cc5b26ee')
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
                        id: 'c1bb7cad-6ba6-4405-b828-7057f95a08ed',
                        name: 'y58cu370k1wjy856zboetnwbsrz9isliwgzw6iovm4ut5y7s0h23gkq1ta2qqfb5bn9icizugzmbp4xrrmcijcookmcmct7ay9zfdg39duol29cwtdbcjdzqsa4wr006yt4tx5ven02e97d47oopa5hz2j56swcp9uv3nzlc8488rzlvjtwo921362zq86lyaf7fk8ka644tq6djnyy1s9c6uiw9tuutcgi8cmar34hwb107h1xfg0rrcrqrk5k',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Voluptate dolorem autem sunt autem. Culpa voluptatem sit enim debitis ut et doloremque asperiores. Magni vitae debitis minus porro aut. Mollitia tempora ex dolores ipsa architecto omnis reiciendis.',
                        excerpt: 'Possimus eum maxime consequuntur nulla provident et esse saepe praesentium. Quos sed eaque rerum voluptas optio ut maxime. Voluptatem corporis voluptas qui expedita quo.',
                        email: 'x1dy3u2wm9ksvxvr8pguc7s51il2hlx1btu08t2c7ymx6ebf02ygngjtk51ppviuhj15eqdgdhualfaxgwy4ht4krmsyxb88qi8i9rwh9ochr41c0y5y10fy',
                        phone: 'mz342989zv34pc0k3jepzhagabu60ypxqqaj2cy0wjhdemzwz9jljsfauliv4lutu1ln546n206m0nu3xj0s19hcppxcv1cbzhmrsd9tdxa3ztm8z40c7lhc',
                        fax: 'sqoxhqj1ulk3yz46cgzcnbk81mbg89q5yc6tpxos8sm46bon55cj7mukyndiwrwq39vdpjeko2vvdeljcjnqettatlt0xolhtwg15wenrvc0ez0p66oo92im',
                        countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                        administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                        administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                        administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                        zip: '6bggf9v6rr',
                        locality: '0rwz6ky1oiarjfx454zfk5u4jt9wyd6dfutaznciee7p3n7jjcvl2g0aq1dtogm2un8mpppbuz6z2x657ksvo9spj8oupehfuy91l8n9qaz0aiz0b6caszucue09z',
                        address: '1rhrf0hmdu80e2g2jjuglw3q4jpktp9xgu48st205dxhltnyijyhmswnzrnk22f4oa985x8adqzvx2fmaq7can6b0w0g7ruujv68v6hx64gu9kjldlguwjth9wij2gj7dmatn69g68awvuww9vhj5yerw69ld7grwrk6fcqf9pn8te09iijcz2246caimuchzlafs51lgh2fbusafz7oikbv3dyq84e8dmghh6zd4qlxac8dq2brywjvvjqfy3s',
                        latitude: 627.13,
                        longitude: 230.07,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenCreatePartner).toHaveProperty('id', 'c1bb7cad-6ba6-4405-b828-7057f95a08ed');
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
                            id: '68d62001-093d-443d-912a-34b6894691b2'
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
                            id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartner.id).toStrictEqual('f2c647ea-2bdf-4252-b870-d4e7cc5b26ee');
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
                    id: '07469956-f2f0-4465-b2da-df493ec20e7e'
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
                    id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartnerById.id).toStrictEqual('f2c647ea-2bdf-4252-b870-d4e7cc5b26ee');
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
                        
                        id: '9b8f6a05-9219-4af6-a81d-6da5cd9cb2b6',
                        name: 'k9b21oxs98b95bm0i44jg3mqwuu7pru42p23fhomg1wfqnv3qi1xxu7fiawk43w5cg4vb5fathwh3i7igi859ctdrhjdlv76zsb81f5wy6uc3cwm9q5y1jpvg9luwhdh7a9ib54wvszh0zlyy9pzpha5p1q4wex0bqc25ipxq053gyy42dpgcbkofhqtt4t50by0fwqw38ysmjgat7p1yxmddzh8evnvpgro8i96fg8h2s5f36axqvtord8t4f8',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Officia magnam et mollitia dolorem. Placeat ex laudantium illo voluptatem perferendis aliquam exercitationem omnis nemo. Nihil ducimus necessitatibus dolores sint magni dolorem atque voluptatibus. Perferendis facilis autem error sit id consequatur sed ullam.',
                        excerpt: 'Magni mollitia et quaerat. Qui commodi dolorem dicta totam. Suscipit quis ea. Beatae inventore eaque iure provident illum quidem voluptatem.',
                        email: '855giyjl8e7vxyb1sv304hp9l5my5u246u6ovr8ga7ahplkkb5qbavuxy1q0kw2jjmirlgz8zsqv1lif65mlqd1y1rf5laciyn0uxwmgqirf2qh5sgqhdz6e',
                        phone: 'tcfpkk4h1hnjpizxr1gl2qrckyjh2qro0kfmfil49r59qbdwnfylt75yrjrngykwokty3m885p2znqtkljmtjzi7zv7py6bsdq5ek5hxe5m8nw9xqklqav6t',
                        fax: 'qbdtuehud87ukhkwrrbqrak9deowy781gm6lmd0vwdqz1kapiwtmw6vyh46p1val4yflvqjh0veu0gut8o601yyhomc783z9mqw8a8sep5q9hups9ppe99js',
                        countryCommonId: '694762c7-8379-4602-8154-38bd5a21ffea',
                        administrativeAreaLevel1Id: 'c41b47d3-cfd9-47ba-ac05-1535f537356b',
                        administrativeAreaLevel2Id: 'd5782a50-c04f-4a1c-98b9-5fe511825278',
                        administrativeAreaLevel3Id: '77ab2b4c-c7dd-4319-a26f-97d50bd7de23',
                        zip: '1nyq5aq0bi',
                        locality: 'ty7yfwd0gxu22ecbk49gs9ayjmmro09dvnsfdnkqr6lloxuj0isa8gssogo6g8g3e7rqxfu8ct3onjyftqc2byt8mxcdfgnu39oluu64bl2cd7dvcpx7ahevlvkd4',
                        address: 'lfbv6ybanh5d9e8qteq3vrusarebt1p4egtnokcys81y67luwtwjr3620z7g4lirjt5t23fgctjju6kyr0akp7e9zdawrhh2xvcc418rw568x47bq6ejwzm0adco3fi0vjiwpn8mkvva0nygua15ogjiya34d3u2v5rmiz8uzuqx28kdm2wiraqzd9f3rjizn1l3y8o7vtar72idwb2g2hr8m80x7qlid93n2cnhyjy5idevxg6mxdsnfims1ht',
                        latitude: 18.33,
                        longitude: 109.70,
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
                        
                        id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee',
                        name: 'gehyosa3zdagldildaulbdw2o4rln9o5i1bvnk59ayix0lerrsnl9uvishd8oii41k97kn11fwj6mwezceefyd6npro2yza6feivrs57k2ypgynmyddjagiamdwiwjmm0zka3wvevy5odzdb95ffgw14a688btpd6kuaf4kmhmtyth7eo5hpdd4483j23m5mgx4cdjbgzs9cpjfnk2jr4srrjf9q7ayfuyp8oq4hqvjou5em6nlf8u9wln1g8g6',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Quas laboriosam cumque sit sint ratione blanditiis fugiat quis. Et magni eveniet. Magni voluptates non adipisci sapiente. Excepturi minus quos id repellendus doloribus.',
                        excerpt: 'Dicta commodi ut et aliquam nemo tempora omnis. Id voluptatem consequuntur ex ipsa quia unde ratione. Qui iure voluptatem rerum eum blanditiis. Ipsum quo dolore recusandae rerum alias ipsum.',
                        email: '6dpu9ku6bwqkeucdyd6sks4e4tbqe4nkeqqo2f9p72zszz4o8fpjefgafjisw55tijsat48tsolk300ff3nrfo7hyx1fjc0kj09z819998f8lenxogxwxytd',
                        phone: 'kk60pvgqj8l8vcb4afma24gj2i55upogigblm6sts6hr4tcxd88089i7z156e8oinn4gsxw44bk9qnxu88a2ygmzngz7o8hrra6kau92xmb96tfmmkvos52i',
                        fax: 'cw5bv8gw96nlprbvx22rizl8ca2okbizuqed471k09ngej9xwtyezss7xqod5s7606ylbygb1jdl98hw6nw6kcgkuclhk2dmsimu56f391pztvamqjvlu1mr',
                        countryCommonId: '25bffa52-ed80-4714-8c29-b2fd299aec3c',
                        administrativeAreaLevel1Id: '42f95f20-926a-42de-bf6f-87ed7b32314e',
                        administrativeAreaLevel2Id: '443a5dbe-14a6-4db5-868d-8f62da8dd1d1',
                        administrativeAreaLevel3Id: '002098bc-2eb2-4937-8285-334bac731a29',
                        zip: 'iemm2tdhmc',
                        locality: 'deymb4vpuqzyc6w7fomimna6y9w4zxgtf8excu1qx3dteqk3aaih72yjtfs52ngcptsa4y8rckopdhqobqk7fpj1f9kg0jaqvuxyrswspyej0kdbk96kdseohgoji',
                        address: 'zqesypr3eq5tdyljtgoc53mb3ofl7ujgpco5fprt3af8f3667g6u0hqdkcgqh0gqeq42zgypehly24yogb3ifcdylgdrjam7zkx1z32zr7lmf61zcpxp02851ab0jzqaau590b3bsoa690emp3ljcp3sphr86n409ix433ixb3p7w4d8wx1b87hpttecea6tntcs9v0sylkxrjmzz91pzvnhaq9nqx9rogao99dz0sdgo343ywverb66oif57rn',
                        latitude: 338.19,
                        longitude: 856.31,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenUpdatePartner.id).toStrictEqual('f2c647ea-2bdf-4252-b870-d4e7cc5b26ee');
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
                    id: '42431f46-e9d7-4c0f-a45e-a933862f999c'
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
                    id: 'f2c647ea-2bdf-4252-b870-d4e7cc5b26ee'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenDeletePartnerById.id).toStrictEqual('f2c647ea-2bdf-4252-b870-d4e7cc5b26ee');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});