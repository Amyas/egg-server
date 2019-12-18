'use strict';

const https = require('https');

class PubgApi {
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.apiURL = 'api.pubg.com';
  }
  requestAPI(route, params) {
    return new Promise((resolve, reject) => {
      let queryParams = '';
      if (params) {
        Object.keys(params).forEach(key => {
          queryParams += queryParams.length ? `&${key}=${params[key]}` : `?${key}=${params[key]}`;
        });
      }
      const headers = {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${this.apiKey}`,
      };
      let rawData = '';
      const req = https.get({
        hostname: this.apiURL,
        path: `/shards/steam/${route}${queryParams}`,
        headers,
      }, res => {
        res.setEncoding('utf8');
        res.on('data', data => {
          rawData += data;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            if (res.statusCode >= 400) {
              return reject(parsedData);
            }
            return resolve(parsedData);
          } catch (err) {
            return reject(err);
          }
        });
      });
      req.on('error', e => reject(e));
    });
  }
  async searchPlayers(playerName) {
    let data = await this.requestAPI('players', {
      'filter[playerNames]': playerName,
    });
    data = data.data[0];
    data = Object.assign({}, {
      id: data.id,
      name: data.attributes.name,
      matches: data.relationships.matches.data,
    });
    return data;
  }
  async loadMatches(matchIds, playerId, max) {
    matchIds = matchIds.slice(0, max);
    let data = await Promise.all(matchIds.map(v => this.requestAPI(`matches/${v.id}`)));
    data = data.map(v => {
      const {
        data: {
          id,
          attributes: {
            duration, // 游戏时长
            gameMode, // 游戏模式
            mapName, // 地图
          },
        },
        included,
      } = v;

      // 队伍信息
      const roster = included.filter(v => v.type === 'roster');
      // 队员信息
      const participant = included.filter(v => v.type === 'participant');
      // 实时数据
      const telemetry = included.find(v => v.type === 'asset');
      // 查询本人信息
      let playerInfo = included.find(v => v.type === 'participant' && v.attributes.stats.playerId === playerId);
      playerInfo = Object.assign({},{
        id: playerInfo.id,
        ...playerInfo.attributes.stats
      })
      return {
        id,
        duration,
        gameMode,
        mapName,
        roster,
        participant,
        telemetry,
        playerInfo,
      };
    });
    return data;
  }
  // 获取赛季列表
  async getSeasons(){
    const data = await this.requestAPI('seasons')
    return data
  }
  // 获取玩家赛季列表
  async getPlayerSeasonInfo({playerId,seasonId}){
    const data = await this.requestAPI(`players/${playerId}/seasons/${seasonId}`)
    return data
  }
}

module.exports = PubgApi;

