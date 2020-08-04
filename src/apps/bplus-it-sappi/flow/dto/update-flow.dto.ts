import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be3941e3-5c2f-4d8a-a17d-5f5c55c2d5b0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '6wr1xd8eow8sb1hai1v9h0c5z1e4oswjmhwewvfp'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7d1f2f5b-6953-4b64-a3c4-1efe8420b250'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8pq5ojtk1oms1esxnqzdw1hp1hnp1qpyz2v98m9ta4lxxuty4o'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '55e451c6-b6d8-4fc4-bee2-b7453d913dc7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kg91km33jspqthpzxdrx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'nsgo6fsyn4oligtbmypg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'iu6294x8u5ooh77zpy0jh9q2obthv25bsi5vy0twgw0e0kmkrrxsaj3sb2y7'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'je07bjageyy4xxz3bkhpo31oub5pesyl3kruhwhv9kpcgfzyrrzanxc2tckut8u9k22zrgl5p4gkc1vcnq1lxsd1sf5lt7uredwohplqhfhyvubfkl18g6vr5sq6mbvd6w288zn3h5tvdtcvmq4cacmelqajf2d3'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'pcq8i54entvtj0owu37eqxyhxff27e2hqoo0o4i0us1kojgxgvg0n3kr8c6w1nod6ar5o836o1d2qeoegjxfa62iwrzjvzm4nwevyh0g2xc3w3a25gf619802o6rg19f9lclil8az1p871qv67o7jdpq8vzr0clv'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'yia8o4h0786jhvf9clk02c7bwablsqcukgtwn9je32m3cpw34y26ehi4udglaxkhkoijxnqsgzbud95trixjoo2ozcbb9qo5mowyjldu7l7p32de1zxsjiaelqi24u9itp6o3fov7ine96quiwl21pbr35cq56z5'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'haa66wir25gjua8hca7vit518fba9p85046pbuf25xozupoikr3vzi5cxdi68533ldxn0270w5nu8w9i3lm6jtfh6ahbliapm1i263vn20jemnavu2mjy9ye0p2ftp8dwjyx0vnj6bxoaduutgk14jjrmv61gb51'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'uy6ufvsfuwmw9sd79jtfp1t7xjqp61nkxghbqyg5v6swbyvhp9fg1zytbfp3b23axq2klteu39zl9ri8jga68xp22f4rjcqreutukez3iq5jqcpjbe92ub1fvp5y8dcr20mc7tyqf9pqgm7uhidp8xyct454j99b'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'jb5eg4fk9n4mgm8db9z3'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'nwcqfq7d7k2b1ji2had9'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 12:29:51'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '09ra8t31y3qnauf69ykokc2sigzt6jtzaktq8gk363p4qu5yd35m7fe4as3jno56tflt3sua0bcdlg9c7maohwxjfleer8v64nggw0xv853yol6itz9wk13ape49cg19meul2i1udbemypghysaya0837yep1itymgs1sqeqq1to1ovwhy1vzx0ch2es3rebedj2f479eta67rfmha6nuyt6s6ngal2mboj0jfn17ec7eskng8ethhgllsol68o'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'av0m0xgzfxsg7w1j8iswi3rtsava2a9w823dpd2xblz8xsm7jzshez5r1595yp6yl4kirdwsr3npdfvddjtio9wegxuuw00a1essr13ee9khboszwn8qjubcu9fvel3qexety341r5bpoczymkw8xa8om0qn0w1348ey00c1kfctmcbt4372m86zwalu7o0icsxt6bz8m8mpk70gsxd09ejwsnnqf97kzdyfz1oladz0qxa15w3baaiqkz5a787'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ei9du2z7ggt9xw7t8oiocd45tu9glq08vqvdbyxls3wu9pawchmb2fshuuw8'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '5027767b-a6fe-4195-8385-616d62c8cd97'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
