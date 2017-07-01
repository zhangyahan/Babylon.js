﻿module BABYLON {
    export class ImageProcessingPostProcess extends PostProcess {

        /**
         * Default configuration related to image processing available in the PBR Material.
         */
        protected _imageProcessingConfiguration: ImageProcessing;

        /**
         * Gets the image processing configuration used either in this material.
         */
        public get imageProcessingConfiguration(): ImageProcessing {
            return this._imageProcessingConfiguration;
        }

        /**
         * Sets the Default image processing configuration used either in the this material.
         * 
         * If sets to null, the scene one is in use.
         */
        public set imageProcessingConfiguration(value: ImageProcessing) {
            this._attachImageProcessingConfiguration(value);
        }

        /**
         * Keep track of the image processing observer to allow dispose and replace.
         */
        private _imageProcessingObserver: Observer<ImageProcessing>;

        /**
         * Attaches a new image processing configuration to the PBR Material.
         * @param configuration 
         */
        protected _attachImageProcessingConfiguration(configuration: ImageProcessing): void {
            if (configuration === this._imageProcessingConfiguration) {
                return;
            }

            // Detaches observer.
            if (this._imageProcessingConfiguration && this._imageProcessingObserver) {
                this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver);
            }

            // Pick the scene configuration if needed.
            if (!configuration) {
                var camera = this.getCamera();
                var scene = camera ? camera.getScene() : BABYLON.Engine.LastCreatedScene;
                this._imageProcessingConfiguration = scene.imageProcessingConfiguration;
            }
            else {
                this._imageProcessingConfiguration = configuration;
            }

            // Attaches observer.
            this._imageProcessingObserver = this._imageProcessingConfiguration.onUpdateParameters.add(conf => {
                this._updateParameters();
            });

            // Ensure the effect will be rebuilt.
            this._updateParameters();
        }

        /**
         * Gets Color curves setup used in the effect if colorCurvesEnabled is set to true .
         */
        public get colorCurves(): ColorCurves {
            return this.imageProcessingConfiguration.colorCurves;
        }
        /**
         * Sets Color curves setup used in the effect if colorCurvesEnabled is set to true .
         */
        public set colorCurves(value: ColorCurves) {
            this.imageProcessingConfiguration.colorCurves = value;
        }

        /**
         * Gets wether the color curves effect is enabled.
         */
        public get colorCurvesEnabled(): boolean {
            return this.imageProcessingConfiguration.colorCurvesEnabled;
        }
        /**
         * Sets wether the color curves effect is enabled.
         */
        public set colorCurvesEnabled(value: boolean) {
            this.imageProcessingConfiguration.colorCurvesEnabled = value;
        }

        /**
         * Gets Color grading LUT texture used in the effect if colorGradingEnabled is set to true.
         */
        public get colorGradingTexture(): BaseTexture {
            return this.imageProcessingConfiguration.colorGradingTexture;
        }
        /**
         * Sets Color grading LUT texture used in the effect if colorGradingEnabled is set to true.
         */
        public set colorGradingTexture(value: BaseTexture) {
            this.imageProcessingConfiguration.colorGradingTexture = value;
        }

        /**
         * Gets wether the color grading effect is enabled.
         */
        public get colorGradingEnabled(): boolean {
            return this.imageProcessingConfiguration.colorGradingEnabled;
        }
        /**
         * Gets wether the color grading effect is enabled.
         */
        public set colorGradingEnabled(value: boolean) {
            this.imageProcessingConfiguration.colorGradingEnabled = value;
        }

        /**
         * Gets Camera exposure used in the effect.
         */
        public get cameraExposure(): number {
            return this.imageProcessingConfiguration.cameraExposure;
        }
        /**
         * Sets Camera exposure used in the effect.
         */
        public set cameraExposure(value: number) {
            this.imageProcessingConfiguration.cameraExposure = value;
        }

        /**
         * Gets Camera contrast used in the effect.
         */
        public get cameraContrast(): number {
            return this.imageProcessingConfiguration.cameraContrast;
        }
        /**
         * Sets Camera contrast used in the effect.
         */
        public set cameraContrast(value: number) {
            this.imageProcessingConfiguration.cameraContrast = value;
        }

        /**
         * Gets Vignette stretch size.
         */
        public get vignetteStretch(): number {
            return this.imageProcessingConfiguration.vignetteStretch;
        }
        /**
         * Sets Vignette stretch size.
         */
        public set vignetteStretch(value: number) {
            this.imageProcessingConfiguration.vignetteStretch = value;
        }

        /**
         * Gets Vignette centre X Offset.
         */
        public get vignetteCentreX(): number {
            return this.imageProcessingConfiguration.vignetteCentreX;
        }
        /**
         * Sets Vignette centre X Offset.
         */
        public set vignetteCentreX(value: number) {
            this.imageProcessingConfiguration.vignetteCentreX = value;
        }

        /**
         * Gets Vignette centre Y Offset.
         */
        public get vignetteCentreY(): number {
            return this.imageProcessingConfiguration.vignetteCentreY;
        }
        /**
         * Sets Vignette centre Y Offset.
         */
        public set vignetteCentreY(value: number) {
            this.imageProcessingConfiguration.vignetteCentreY = value;
        }

        /**
         * Gets Vignette weight or intensity of the vignette effect.
         */
        public get vignetteWeight(): number {
            return this.imageProcessingConfiguration.vignetteWeight;
        }
        /**
         * Sets Vignette weight or intensity of the vignette effect.
         */
        public set vignetteWeight(value: number) {
            this.imageProcessingConfiguration.vignetteWeight = value;
        }

        /**
         * Gets Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode)
         * if vignetteEnabled is set to true.
         */
        public get vignetteColor(): Color4 {
            return this.imageProcessingConfiguration.vignetteColor;
        }
        /**
         * Sets Color of the vignette applied on the screen through the chosen blend mode (vignetteBlendMode)
         * if vignetteEnabled is set to true.
         */
        public set vignetteColor(value: Color4) {
            this.imageProcessingConfiguration.vignetteColor = value;
        }

        /**
         * Gets Camera field of view used by the Vignette effect.
         */
        public get cameraFov(): number {
            return this.imageProcessingConfiguration.cameraFov;
        }
        /**
         * Sets Camera field of view used by the Vignette effect.
         */
        public set cameraFov(value: number) {
            this.imageProcessingConfiguration.cameraFov = value;
        }

        /**
         * Gets the vignette blend mode allowing different kind of effect.
         */
        public get vignetteBlendMode(): number {
            return this.imageProcessingConfiguration.vignetteBlendMode;
        }
        /**
         * Sets the vignette blend mode allowing different kind of effect.
         */
        public set vignetteBlendMode(value: number) {
            this.imageProcessingConfiguration.vignetteBlendMode = value;
        }

        /**
         * Gets wether the vignette effect is enabled.
         */
        public get vignetteEnabled(): boolean {
            return this.imageProcessingConfiguration.vignetteEnabled;
        }
        /**
         * Sets wether the vignette effect is enabled.
         */
        public set vignetteEnabled(value: boolean) {
            this.imageProcessingConfiguration.vignetteEnabled = value;
        }

        @serialize()
        private _fromLinearSpace = false;
        /**
         * Gets wether the input of the processing is in Gamma or Linear Space.
         */
        public get fromLinearSpace(): boolean {
            return this._fromLinearSpace;
        }
        /**
         * Sets wether the input of the processing is in Gamma or Linear Space.
         */
        public set fromLinearSpace(value: boolean) {
            if (this._fromLinearSpace === value) {
                return;
            }

            this._fromLinearSpace = value;
            this._updateParameters();
        }

        /**
         * Defines cache preventing GC.
         */
        private _defines: IImageProcessingDefines & { FROMLINEARSPACE: boolean } = {
            VIGNETTE: false,
            VIGNETTEBLENDMODEMULTIPLY: false,
            VIGNETTEBLENDMODEOPAQUE: false,
            TONEMAPPING: false,
            CONTRAST: false,
            COLORCURVES: false,
            COLORGRADING: false,
            FROMLINEARSPACE: false,
        }

        constructor(name: string, options: number | PostProcessOptions, camera?: Camera, samplingMode?: number, engine?: Engine, reusable?: boolean, textureType: number = Engine.TEXTURETYPE_UNSIGNED_INT) {
            super(name, "imageProcessing", [], [], options, camera, samplingMode, engine, reusable,
                                            null, textureType, "postprocess", null, true);

            // Setup the default processing configuration to the scene.
            this._attachImageProcessingConfiguration(null);

            this._updateParameters();

            this.onApply = (effect: Effect) => {
                this.imageProcessingConfiguration.bind(effect, this.aspectRatio);
            };
        }

        protected _updateParameters(): void {
            this._defines.FROMLINEARSPACE = this._fromLinearSpace;
            this.imageProcessingConfiguration.prepareDefines(this._defines);
            var defines = "";
            for (const define in this._defines) {
                if (this._defines[define]) {
                    defines += `#define ${define};\r\n`;
                }
            }

            var samplers = ["textureSampler"];
            ImageProcessing.PrepareSamplers(samplers, this._defines);

            var uniforms = [];
            ImageProcessing.PrepareUniforms(uniforms, this._defines);

            this.updateEffect(defines, uniforms, samplers);
        }
    }
}