interface IShader {

    getVertexShaderString(): string
    getFragmentShaderString(): string
    encode($context: WebGLRenderingContext): void
    binLocation($context: WebGLRenderingContext): void
}

module Pan3d {
    export class Shader3D extends ResCount implements IShader {
        public vertex: string
        public fragment: string
        public name: string;
        public program: WebGLProgram;
        public vShader: WebGLShader;
        public fShader: WebGLShader;
        public paramAry: Array<any>;
        public localDic: Object;
        constructor() {
            super();
            this.fragment = this.getFragmentShaderString()
        }
        public encode(): boolean {
            this.vertex = this.getVertexShaderString();
            ////console.log(this.vertex);

            var $context: WebGLRenderingContext = Scene_data.context3D.renderContext;

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


            var info: string = $context.getProgramInfoLog(this.program);
            var vInfo: string = $context.getShaderInfoLog(this.vShader);
            var fInfo: string = $context.getShaderInfoLog(this.fShader);

            if (info != "") {
                if (vInfo == "" && fInfo == "") {
                    return true;
                }
                //console.log("shader error: " + info + "," + vInfo + "," + fInfo);
                return false;
            } else {
                return true;
            }

        }

        public getWebGLUniformLocation($name: string): WebGLUniformLocation {
            var local: WebGLUniformLocation = this.localDic[$name];
            if (local) {
                return local;
            } else {
                this.localDic[$name] = Scene_data.context3D.getLocation(this.program, $name);
                return this.localDic[$name];
            }
        }

        binLocation($context: WebGLRenderingContext): void {

        }
        getVertexShaderString(): string {
            return ""
        }
        getFragmentShaderString(): string {
            return ""
        }
        public destory(): void {
            this.vertex = null;
            this.fragment = null;
            this.name = null;
            this.localDic = null;
            Scene_data.context3D.deleteShader(this);
        }
    }


    export class Display3DAlphaShader extends Pan3d.Shader3D {
        static Display3DAlphaShader: string = "Display3DAlphaShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Position;" +
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
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =

                " precision mediump float;\n" +
                "uniform sampler2D alphatexture;\n" +
                "uniform vec4 alphadata;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                  "vec4 infoUv = texture2D(alphatexture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv*alphadata;\n" +
                "}"
            return $str

        }

    }
}