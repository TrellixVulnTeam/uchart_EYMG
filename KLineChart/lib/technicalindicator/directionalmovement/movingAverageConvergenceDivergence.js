"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * MACD：参数快线移动平均、慢线移动平均、移动平均，
 * 默认参数值12、26、9。
 * 公式：⒈首先分别计算出收盘价12日指数平滑移动平均线与26日指数平滑移动平均线，分别记为EMA(12）与EMA(26）。
 * ⒉求这两条指数平滑移动平均线的差，即：DIFF=EMA（SHORT）－EMA（LONG）。
 * ⒊再计算DIFF的M日的平均的指数平滑移动平均线，记为DEA。
 * ⒋最后用DIFF减DEA，得MACD。MACD通常绘制成围绕零轴线波动的柱形图。MACD柱状大于0涨颜色，小于0跌颜色。
 */
var _default = {
  name: 'MACD',
  calcParams: [12, 26, 9],
  baseValue: 0,
  plots: [{
    key: 'dif',
    title: 'DIF: ',
    type: 'line'
  }, {
    key: 'dea',
    title: 'DEA: ',
    type: 'line'
  }, {
    key: 'macd',
    title: 'MACD: ',
    type: 'bar',
    color: function color(data, options) {
      var currentData = data.currentData;
      var macd = (currentData.technicalIndicatorData || {}).macd;

      if (macd > 0) {
        return options.bar.upColor;
      } else if (macd < 0) {
        return options.bar.downColor;
      } else {
        return options.bar.noChangeColor;
      }
    },
    isStroke: function isStroke(data) {
      var preData = data.preData,
          currentData = data.currentData;
      var macd = (currentData.technicalIndicatorData || {}).macd;
      var preMacd = (preData.technicalIndicatorData || {}).macd;
      return preMacd < macd;
    }
  }],
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, calcParams) {
    var closeSum = 0;
    var emaShort;
    var emaLong;
    var dif = 0;
    var difSum = 0;
    var dea = 0;
    var maxPeriod = Math.max(calcParams[0], calcParams[1]);
    return dataList.map(function (kLineData, i) {
      var macd = {};
      var close = kLineData.close;
      closeSum += close;

      if (i >= calcParams[0] - 1) {
        if (i > calcParams[0] - 1) {
          emaShort = (2 * close + (calcParams[0] - 1) * emaShort) / (calcParams[0] + 1);
        } else {
          emaShort = closeSum / calcParams[0];
        }
      }

      if (i >= calcParams[1] - 1) {
        if (i > calcParams[1] - 1) {
          emaLong = (2 * close + (calcParams[1] - 1) * emaLong) / (calcParams[1] + 1);
        } else {
          emaLong = closeSum / calcParams[1];
        }
      }

      if (i >= maxPeriod - 1) {
        dif = emaShort - emaLong;
        macd.dif = dif;
        difSum += dif;

        if (i >= maxPeriod + calcParams[2] - 2) {
          if (i > maxPeriod + calcParams[2] - 2) {
            dea = (dif * 2 + dea * (calcParams[2] - 1)) / (calcParams[2] + 1);
          } else {
            dea = difSum / calcParams[2];
          }

          macd.macd = (dif - dea) * 2;
          macd.dea = dea;
        }
      }

      return macd;
    });
  }
};
exports.default = _default;