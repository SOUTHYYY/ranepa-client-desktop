import axios from 'axios-jsonp-pro'
const access_token = 'b506acc09b3fe3edd8975568fd8e94e69da4237fe0881b44ba1468f9aaf02fcdc1c44cdb734f9133087fe';

const methods = ['groups.getById'];

export async function getVKGroupsInfo(id) {
    let payload = await axios.jsonp(`https://api.vk.com/method/${methods[0]}`, {
            params: {
                group_id: id,
                v: '5.52',
                access_token: access_token,
                fields: 'members_count,counters'
            }
        });
    return payload;
}

export async function fetchVKChecker(id) {
    let payload = await axios.jsonp(`https://api.vk.com/method/${methods[0]}`, {
        params: {
            group_id: id,
            v: '5.52',
            access_token: access_token,
            fields: 'links'
        }
    });
    if(payload.hasOwnProperty('error')) {
        return false
    }
    let similarity_protect = payload.response[0].links.map((el) => {
        if(el.url === "https://vk.com/activniu" || el.url === "https://vk.com/ranepaspo" || el.url === "https://vk.com/niuranepa") {
            return true;
        }
    });
    if(similarity_protect.includes(true)) {
        return payload;
    } else {
        return 'similarity_err'
    }
}