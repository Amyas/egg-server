'use strict';
const Pubgapi = require('../extend/pubg-api');
const apiInstance = new Pubgapi({
  apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyYzBmMDM3MC01ZmZkLTAxMzYtMDhhZi0wYTk3YTY1ODViMzkiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMwNTE4OTcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6IjcwNzgwNDA1Mi1xcS1jb20tcy1hcHAifQ.xkMJJ66SXMXUt4E9VD9_LMoby79LcGa1SVZ3YLcvRLw',
});
// const id = 'account.790e845b7db343bca47c10ecbb55fb58';
module.exports = app => {
  class PubgController extends app.Controller {
    // 赛季列表
    async seasons() {
      const { ctx } = this;
      const data = await apiInstance.getSeasons();
      ctx.body = data;
    }
    // 玩家ID
    async player() {
      const { ctx } = this;
      const query = ctx.request.query;

      let data;
      try {
        // data = await ctx.http.get(`${url}/players`, {
        //   'filter[playerNames]': query.playerName,
        // });
        data = await apiInstance
          .searchPlayers(query.playerName);
        // .then(async playerInfo => {
        //   playerInfo.matches = await apiInstance.loadMatches(playerInfo.matches, playerInfo.id, 10);
        //   return playerInfo;
        // });
      } catch (error) {
        data = {
          code: -1,
          error,
        };
      }

      ctx.body = {
        data,
      };
    }
    // 获取玩家赛季信息
    async getPlayerSeasonInfo() {
      const { ctx } = this;
      const query = ctx.request.query;
      const data = await apiInstance.getPlayerSeasonInfo({
        playerId: query.playerId,
        seasonId: query.seasonId,
      });
      ctx.body = {
        data,
      };
    }
    async matches() {
      const { ctx } = this;
      const { id } = ctx.params;
      let data;
      try {
        data = await ctx.http.get(`${url}/matches/${id}`);
      } catch (error) {
        data = {
          code: -1,
          error,
        };
      }
      ctx.body = {
        data,
      };
    }
  }

  return PubgController;
};

