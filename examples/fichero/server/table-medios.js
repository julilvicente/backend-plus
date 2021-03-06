"use strict";

module.exports = function(context){
    var allow = function(roles){
        return {
            select:!!roles[context.user.rol],
            insert:!!roles[context.user.rol],
            update:!!roles[context.user.rol],
            delete:!!roles[context.user.rol],
        };
    }
    var A=allow({admin: true});
    var U=allow({admin: true, user:true});
    var W={select:true, udpate:false, delete:false, insert:false};
    var RO={select:true, udpate:false, delete:false, insert:false};
    return context.be.tableDefAdapt({
        name:'medios',
        editable:context.user.rol==='admin',
        fields:[
            {name:'medionro'    ,typeName:'integer' , allow:A},
            {name:'tipo_medio'  ,typeName:'text'    , allow:A},
            {name:'nombre'      ,typeName:'text'    , allow:U},
            {name:'periodo'     ,typeName:'text'    , label:'año/mes/fecha/período', allow:U},
            {name:'link'        ,typeName:'text'    , allow:U},
        ],
        primaryKey:['medionro'],
        foreignKeys:[
            {references: 'tipos_medios', fields:['tipo_medio']}
        ], 
        detailTables:[
            {table: 'apariciones-fichas', fields:['medionro'], abr:'F', label:'fichas'}
        ],
    });
}


