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
