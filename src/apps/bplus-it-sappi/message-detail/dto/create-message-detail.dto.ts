import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '45700825-9f4d-403d-9d36-a21fbf331a93'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '136c296a-11a8-436a-aab6-0a9f7e4c22ee'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'f0aafb29-c406-4ece-9787-2e632eec3833'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'ltszbue24rt46sw4yhor'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'zbvktggdj0vdk0d0u1kbi77zyuf9t6qayn3a6c98t6j0jl4rd5cm42prymlv'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '784d23da-a6b7-4fd1-b66d-b546b3825386'
        })
        executionId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionType [input here api field description]',
            example     : 'SUMMARY',
            enum        : ['SUMMARY','DETAIL']
        })
        executionType: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'executionExecutedAt [input here api field description]',
            example     : '2020-07-21 01:59:11'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 04:08:38'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 12:00:24'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowId [input here api field description]',
            example     : '90a21551-3c36-445a-ac70-43eabce33ab8'
        })
        flowId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : '46r19p99g2spyt3zgr2mwx59fvtew00dxmdvjkg76b7odg2xlzc8hbk9ic6wo37d9vrabiyghu4ovm4b4alnn61fkthpt155qbj4pnq8qp7rmi3o1n0yoqzfe2w3lv4d5vg1x9ztxsxdhz5knsbj58z2p3xfq7s1'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : '56z5yg0fwpeo3dumpnaudzii36lnxrf0cfcg1m424g0nx52ddcbaj50hogzr2v71q7rqknicwaui0neiq9zaxn4a4voz4xdiex67d4jdf4g6jp4eikkat3si2uc36cdhv9oib99kjnjre6pf85ez4yo648l6opvq'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'nb8ppizexxf4p0wj1tjzsxtmni1d81ipqg6rad6qdbrwk7li28tan9u2s0tsaahxwswppdvz9x5qg44d3axk2mrhvcxtftj1pqwplw7fiky6nv5wix1mx1rl73q8pp6ro4ili6vna15xno4kcvw0sc6illch56hv'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : '04om8wv79plddz6kz1iftrovijnaf3lwjov4kxa2x9amh2r0zvfgc24f2atg5gveqcs4chaytkc24ji44fdc429lwlkz2bk8w5gomtd24hurz5tc7azb62mf8k4nvu6j0w4yx5f8870cu6ho009s8utck0cwybit'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'TO_BE_DELIVERED',
            enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Delectus quidem reiciendis est ea placeat ratione. Nostrum ratione sit corporis repellat temporibus ut. Quia necessitatibus voluptatibus. Maxime autem perferendis.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : 'chkf6a2qzwxjrqyy2rexr6c5riamu6t0i37fm5ofcfvva1ratmux4ak2a39n04qz40jiiiok0uf8niy2ze632cr59ivsb95rixbwpg7qcpwx64lem655zc9qa7slcfk2hbgvrkd8r1x6fhreb1m88ia2xlul584y'
        })
        example: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'startTimeAt [input here api field description]',
            example     : '2020-07-21 03:44:00'
        })
        startTimeAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'direction [input here api field description]',
            example     : '1pypqhuvy00ktmhtbxw6'
        })
        direction: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCategory [input here api field description]',
            example     : 'jya2fy6osw3xhqxuz01z1xqtcyx5x95ja2d06svdzl433isuxdputf70og37bmn8s4vm3nktlug5g37t6o7lzananvkorrz7waft0p03sqvs48dw59bllw3i3l0r2ot92cd9e5v49uxx4i1r5kq4tu7fthk1wxpc'
        })
        errorCategory: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorCode [input here api field description]',
            example     : 'dxlrwzw8x6lldkdf6arj'
        })
        errorCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'errorLabel [input here api field description]',
            example     : '1v2l62ophvn2xv52mgkhkfr90wam10crexl9naktmbugmfnx47v65cfespldz0ovu5lvhjcvvxh0o8q101n96t2qyd5dg2hdsu0hr16rnm0dp0m5s0468le25jxkcy9sshbcc68nu9izofqnhwom2exwpo8saqsr'
        })
        errorLabel: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'node [input here api field description]',
            example     : 9253198931
        })
        node: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'protocol [input here api field description]',
            example     : '1l51npkgnhifsdf0dj5f'
        })
        protocol: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'qualityOfService [input here api field description]',
            example     : 'sobsbmmyu8p3tsso0t18'
        })
        qualityOfService: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverParty [input here api field description]',
            example     : 'zi0i9eexn9b1evg6nh0ladxfufiy20n3ls2owc4d88flke7pzvh3ayqt3dqdyx5j8di6ju5m31kj70h08dg36ld8n3cijd0rlomkl34b5mvjnyt2ezegb24lu8jftf1l5uouxbwnr8uyjh0s0vvj0ytyspl1ad6x'
        })
        receiverParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverComponent [input here api field description]',
            example     : 'nzf2a3hfdwl355uw6r0yajj6raqk5fdt9gcew311ej1rikc54sui0r98irmo9c7k1tf764ain5ue63fid746pp0pfr9ojkzh4b4k7byvwgx7mnpxl8atn4bjwj36dv8rpnnvwf297ospm63j4r053heptjaho14l'
        })
        receiverComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterface [input here api field description]',
            example     : 'wrnlbbxdos2az46jm7ys9i6oszmowe7bu2m024rvneymo8ee9njgzerzhatzmj3kj26uf84uhpsr0qr75habezpokq3flo2sqk5x50b1mqbtub2el76gxbmcws3dmaqook4ixxc7unl4o0thf2jomiw6pxcfxm9v'
        })
        receiverInterface: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'receiverInterfaceNamespace [input here api field description]',
            example     : 'yv40vby76vayecy9sv08cmaoiocrv7fl1lwc2z8xrnis0eolay7xgw2e54dbne2vnct9w2mmh5x2xkibivc7hncjubds0am4cku2aswhysmjldjl8ztjbm6k8vqsfvxwo2adg4r8sfkdfbh8e1ffjpkbblgakkdz'
        })
        receiverInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'retries [input here api field description]',
            example     : 5076781483
        })
        retries: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'size [input here api field description]',
            example     : 7012665243
        })
        size: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'timesFailed [input here api field description]',
            example     : 9216746894
        })
        timesFailed: number;
    
    
}
