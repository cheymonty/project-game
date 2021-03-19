import {CLIENT_ID, CLIENT_SECRET} from './config'

export default async function getAccessToken() {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`
    const access_token = await fetch(url, {
      method:"POST"   
    }).then(response => response.json()).then(data => data.access_token)
    return access_token
}

