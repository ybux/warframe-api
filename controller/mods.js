const { response, request } = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const  modsGet = async (req = request, res = response) =>{
    await fetch("https://api.warframestat.us/mods").then((mods)=>{
        console.log(mods.status)
        return mods.json()
    }).then((mods_res) =>{
        const mods = [];
        for(const {name,drops,fusionLimit,levelStats,wikiaThumbnail,uniqueName,type,compatName} of mods_res){
            if(drops != undefined){
                const image = (wikiaThumbnail != undefined ? wikiaThumbnail.split('.png')[0] + '.png' : '-');

                mods.push({ name,drops,fusionLimit,levelStats,wikiaThumbnail:image,uniqueName,type,compatName}) 
            }
        }
        res.json({
            mods
        })
    });

}

const  modsWarframeGet = async (req = request, res = response) =>{
    await fetch("https://api.warframestat.us/mods").then((mods)=>{
        console.log(mods.status)
        return mods.json()
    }).then((mods_res) =>{
        const mods = [];
        mods_res.filter(m => m.type == 'Warframe Mod' && ((m.compatName+'').toLocaleLowerCase() == req.params.name.toLocaleLowerCase() || m.compatName == 'WARFRAME'))
        .forEach(({name,fusionLimit,levelStats,wikiaThumbnail,uniqueName,type,compatName})=>{
            if(wikiaThumbnail != undefined){
                const image = (wikiaThumbnail != undefined ? wikiaThumbnail.split('.png')[0] + '.png' : '-');
                mods.push({ name,fusionLimit,levelStats,wikiaThumbnail:image,uniqueName,type,compatName}) 
            }
        })
        const unique = [...new Map(mods.map((m) => [m.name, m])).values()];
        unique.sort((a, b) => b.compatName.localeCompare(a.compatName));

        res.json({
            mods:unique
        })
    });

}

const modsPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - modsPatch'
    });
}
module.exports = {
    modsGet,
    modsWarframeGet,
    modsPatch
};