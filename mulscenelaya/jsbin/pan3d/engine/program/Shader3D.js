var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var Shader3D = /** @class */ (function (_super) {
        __extends(Shader3D, _super);
        function Shader3D() {
            var _this = _super.call(this) || this;
            _this.fragment = _this.getFragmentShaderString();
            return _this;
        }
        Shader3D.prototype.encode = function () {
            this.vertex = this.getVertexShaderString();
            ////console.log(this.vertex);
            var $context = Pan3d.Scene_data.context3D.renderContext;
            this.program = $context.createProgram();
            this.vShader = $context.createShader($context.VERTEX_SHADER);
            this.fShader = $context.createShader($context.FRAGMENT_SHADER);
            $context.shaderSource(this.vShader, this.vertex);
            $context.shaderSource(this.fShader, this.fragment);
            $context.compileShader(this.vShader);
            $context.compileShader(this.fShader);
            $context.attachShader(this.program, this.vShader);
            $context.attachShader(this.program, this.fShader);
            this.binLocation($context);
            $context.linkProgram(this.program);
            //Scene_data.context3D.addProgram(this.program);
            this.localDic = new Object();
            var info = $context.getProgramInfoLog(this.program);
            var vInfo = $context.getShaderInfoLog(this.vShader);
            var fInfo = $context.getShaderInfoLog(this.fShader);
            if (info != "") {
                if (vInfo == "" && fInfo == "") {
                    return true;
                }
                //console.log("shader error: " + info + "," + vInfo + "," + fInfo);
                return false;
            }
            else {
                return true;
            }
        };
        Shader3D.prototype.getWebGLUniformLocation = function ($name) {
            var local = this.localDic[$name];
            if (local) {
                return local;
            }
            else {
                this.localDic[$name] = Pan3d.Scene_data.context3D.getLocation(this.program, $name);
                return this.localDic[$name];
            }
        };
        Shader3D.prototype.binLocation = function ($context) {
        };
        Shader3D.prototype.getVertexShaderString = function () {
            return "";
        };
        Shader3D.prototype.getFragmentShaderString = function () {
            return "";
        };
        Shader3D.prototype.destory = function () {
            this.vertex = null;
            this.fragment = null;
            this.name = null;
            this.localDic = null;
            Pan3d.Scene_data.context3D.deleteShader(this);
        };
        return Shader3D;
    }(Pan3d.ResCount));
    Pan3d.Shader3D = Shader3D;
    var Display3DAlphaShader = /** @class */ (function (_super) {
        __extends(Display3DAlphaShader, _super);
        function Display3DAlphaShader() {
            return _super.call(this) || this;
        }
        Display3DAlphaShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
        };
        Display3DAlphaShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 v2CubeTexST;" +
                "uniform mat4 vpMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2CubeTexST.x, v2CubeTexST.y);" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = vpMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        Display3DAlphaShader.prototype.getFragmentShaderString = function () {
            var $str = " precision mediump float;\n" +
                "uniform sampler2D alphatexture;\n" +
                "uniform vec4 alphadata;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(alphatexture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv*alphadata;\n" +
                "}";
            return $str;
        };
        Display3DAlphaShader.Display3DAlphaShader = "Display3DAlphaShader";
        return Display3DAlphaShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DAlphaShader = Display3DAlphaShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Shader3D.js.map