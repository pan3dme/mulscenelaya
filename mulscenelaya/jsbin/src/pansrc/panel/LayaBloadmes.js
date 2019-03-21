var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var layapan;
(function (layapan) {
    var LayaBloodManager = /** @class */ (function (_super) {
        __extends(LayaBloodManager, _super);
        function LayaBloodManager() {
            var _this = _super.call(this) || this;
            _this._jumpText256_256 = new Pan3d.AlphaUiContianer(scene3d.ExpTextJumpUiDrawAndRefreash256, new Pan3d.Rectangle(0, 0, 256, 256), 2);
            _this.uiContianerItem.push(_this._jumpText256_256);
            return _this;
        }
        LayaBloodManager.prototype.setExpJump256_256Num = function ($textJumpUiVo) {
            this._jumpText256_256.showTemp($textJumpUiVo);
            console.log($textJumpUiVo);
        };
        return LayaBloodManager;
    }(Pan3d.BloodManager));
    layapan.LayaBloodManager = LayaBloodManager;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaBloadmes.js.map