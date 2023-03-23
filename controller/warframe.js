const { response, request } = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const  warframeGet = async (req = request, res = response) =>{
    await fetch("https://api.warframestat.us/warframes").then((warfra)=>{
        console.log(warfra.status)
        return warfra.json()
    }).then((warfra_res) =>{
        const warframes = [];       
        warfra_res.filter(w => w.category == 'Warframes').forEach(({name,uniqueName,wikiaThumbnail})=>{
            if(wikiaThumbnail != undefined )
            {
                const image =wikiaThumbnail.split('.png')[0] + '.png'
                warframes.push({name,uniqueName,image})
            }           
        } )
        res.json({
            warframes
        })
    });

}
const  warframeGetName = async (req = request, res = response) =>{
    await fetch("https://api.warframestat.us/warframes").then((warfra)=>{
        console.log(warfra.status)
        return warfra.json()
    }).then((warfra_res) =>{
        const warframes = [];       
        warfra_res.filter(w => w.category == 'Warframes').forEach(({name,uniqueName,wikiaThumbnail})=>{
            if(wikiaThumbnail != undefined )
            {
                warframes.push({name,uniqueName})
            }           
        } )
        res.json({
            warframes
        })
    });

}
const warframePatch = (req, res = response) => {
    res.json({
        msg: 'patch API - warframePatch'
    });
}
module.exports = {
    warframeGet,
    warframePatch,
    warframeGetName
};