"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphicHelper = require("./graphicHelper");

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
var _default = {
  name: 'priceLine',
  totalStep: 2,
  checkMousePointOn: function checkMousePointOn(key, type, coordinates, mouseCoordinate) {
    return (0, _graphicHelper.checkPointOnRayLine)(coordinates[0], coordinates[1], mouseCoordinate);
  },
  createGraphicDataSource: function createGraphicDataSource(step, points, coordinates, viewport, precision, xAxis, yAxis) {
    return [{
      type: 'line',
      isDraw: true,
      isCheck: true,
      dataSource: [[coordinates[0], {
        x: viewport.width,
        y: coordinates[0].y
      }]]
    }, {
      type: 'text',
      isDraw: true,
      isCheck: false,
      dataSource: [{
        x: coordinates[0].x,
        y: coordinates[0].y,
        text: yAxis.convertFromPixel(coordinates[0].y).toFixed(precision.price)
      }]
    }];
  }
};
exports.default = _default;