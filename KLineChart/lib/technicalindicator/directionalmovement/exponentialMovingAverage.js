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
 * EMA 指数移动平均
 */
var _default = {
  name: 'EMA',
  series: 'price',
  calcParams: [6, 12, 20],
  precision: 2,
  shouldCheckParamCount: false,
  shouldOhlc: true,
  plots: [{
    key: 'ema6',
    title: 'EMA6: ',
    type: 'line'
  }, {
    key: 'ema12',
    title: 'EMA12: ',
    type: 'line'
  }, {
    key: 'ema20',
    title: 'EMA20: ',
    type: 'line'
  }],
  regeneratePlots: function regeneratePlots(params) {
    return params.map(function (p) {
      return {
        key: "ema".concat(p),
        title: "EMA".concat(p, ": "),
        type: 'line'
      };
    });
  },
  calcTechnicalIndicator: function calcTechnicalIndicator(dataList, calcParams, plots) {
    var closeSum = 0;
    var emaValues = [];
    return dataList.map(function (kLineData, i) {
      var ema = {};
      var close = kLineData.close;
      closeSum += close;
      calcParams.forEach(function (param, j) {
        if (i >= param - 1) {
          if (i > param - 1) {
            emaValues[j] = (2 * close + (param - 1) * emaValues[j]) / (param + 1);
          } else {
            emaValues[j] = closeSum / param;
          }

          ema[plots[j].key] = emaValues[j];
        }
      });
      return ema;
    });
  }
};
exports.default = _default;