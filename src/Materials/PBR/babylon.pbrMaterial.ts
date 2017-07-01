﻿module BABYLON {
    /**
     * The Physically based material of BJS.
     * 
     * This offers the main features of a standard PBR material.
     * For more information, please refer to the documentation : 
     * http://doc.babylonjs.com/extensions/Physically_Based_Rendering
     */
    export class PBRMaterial extends PBRBaseMaterial {
        private static _PBRMATERIAL_OPAQUE = 0;
        /**
         * PBRMaterialTransparencyMode: No transparency mode, Alpha channel is not use.
         */
        public static get PBRMATERIAL_OPAQUE(): number {
            return this._PBRMATERIAL_OPAQUE;
        }

        private static _PBRMATERIAL_ALPHATEST = 1;
        /**
         * PBRMaterialTransparencyMode: Alpha Test mode, pixel are discarded below a certain threshold defined by the alpha cutoff value.
         */
        public static get PBRMATERIAL_ALPHATEST(): number {
            return this._PBRMATERIAL_ALPHATEST;
        }

        private static _PBRMATERIAL_ALPHABLEND = 2;
        /**
         * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
         */
        public static get PBRMATERIAL_ALPHABLEND(): number {
            return this._PBRMATERIAL_ALPHABLEND;
        }

        private static _PBRMATERIAL_ALPHATESTANDBLEND = 3;
        /**
         * PBRMaterialTransparencyMode: Pixels are blended (according to the alpha mode) with the already drawn pixels in the current frame buffer.
         * They are also discarded below the alpha cutoff threshold to improve performances.
         */
        public static get PBRMATERIAL_ALPHATESTANDBLEND(): number {
            return this._PBRMATERIAL_ALPHATESTANDBLEND;
        }

        /**
         * Intensity of the direct lights e.g. the four lights available in your scene.
         * This impacts both the direct diffuse and specular highlights.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public directIntensity: number = 1.0;
        
        /**
         * Intensity of the emissive part of the material.
         * This helps controlling the emissive effect without modifying the emissive color.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public emissiveIntensity: number = 1.0;
        
        /**
         * Intensity of the environment e.g. how much the environment will light the object
         * either through harmonics for rough material or through the refelction for shiny ones.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public environmentIntensity: number = 1.0;
        
        /**
         * This is a special control allowing the reduction of the specular highlights coming from the 
         * four lights of the scene. Those highlights may not be needed in full environment lighting.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public specularIntensity: number = 1.0;

        /**
         * Debug Control allowing disabling the bump map on this material.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public disableBumpMap: boolean = false;

        /**
         * AKA Diffuse Texture in standard nomenclature.
         */
        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public albedoTexture: BaseTexture;
        
        /**
         * AKA Occlusion Texture in other nomenclature.
         */
        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public ambientTexture: BaseTexture;

        /**
         * AKA Occlusion Texture Intensity in other nomenclature.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public ambientTextureStrength: number = 1.0;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public opacityTexture: BaseTexture;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public reflectionTexture: BaseTexture;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public emissiveTexture: BaseTexture;
        
        /**
         * AKA Specular texture in other nomenclature.
         */
        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public reflectivityTexture: BaseTexture;

        /**
         * Used to switch from specular/glossiness to metallic/roughness workflow.
         */
        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public metallicTexture: BaseTexture;

        /**
         * Specifies the metallic scalar of the metallic/roughness workflow.
         * Can also be used to scale the metalness values of the metallic texture.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public metallic: number;

        /**
         * Specifies the roughness scalar of the metallic/roughness workflow.
         * Can also be used to scale the roughness values of the metallic texture.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public roughness: number;

        /**
         * Used to enable roughness/glossiness fetch from a separate chanel depending on the current mode.
         * Gray Scale represents roughness in metallic mode and glossiness in specular mode.
         */
        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public microSurfaceTexture: BaseTexture;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public bumpTexture: BaseTexture;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty", null)
        public lightmapTexture: BaseTexture;

        @serializeAsTexture()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public refractionTexture: BaseTexture;

        @serializeAsColor3("ambient")
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public ambientColor = new Color3(0, 0, 0);

        /**
         * AKA Diffuse Color in other nomenclature.
         */
        @serializeAsColor3("albedo")
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public albedoColor = new Color3(1, 1, 1);
        
        /**
         * AKA Specular Color in other nomenclature.
         */
        @serializeAsColor3("reflectivity")
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public reflectivityColor = new Color3(1, 1, 1);

        @serializeAsColor3("reflection")
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public reflectionColor = new Color3(0.0, 0.0, 0.0);

        @serializeAsColor3("emissive")
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public emissiveColor = new Color3(0, 0, 0);
        
        /**
         * AKA Glossiness in other nomenclature.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public microSurface = 0.9;

        /**
         * source material index of refraction (IOR)' / 'destination material IOR.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public indexOfRefraction = 0.66;
        
        /**
         * Controls if refraction needs to be inverted on Y. This could be usefull for procedural texture.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public invertRefractionY = false;

        /**
         * This parameters will make the material used its opacity to control how much it is refracting aginst not.
         * Materials half opaque for instance using refraction could benefit from this control.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public linkRefractionWithTransparency = false;

        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useLightmapAsShadowmap = false;
        
        /**
         * Secifies that the alpha is coming form the albedo channel alpha channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useAlphaFromAlbedoTexture = false;
        
        /**
         * Specifies that the material will keeps the specular highlights over a transparent surface (only the most limunous ones).
         * A car glass is a good exemple of that. When sun reflects on it you can not see what is behind.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useSpecularOverAlpha = true;
        
        /**
         * Specifies if the reflectivity texture contains the glossiness information in its alpha channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useMicroSurfaceFromReflectivityMapAlpha = false;

        /**
         * Specifies if the metallic texture contains the roughness information in its alpha channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useRoughnessFromMetallicTextureAlpha = true;

        /**
         * Specifies if the metallic texture contains the roughness information in its green channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useRoughnessFromMetallicTextureGreen = false;

        /**
         * Specifies if the metallic texture contains the metallness information in its blue channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useMetallnessFromMetallicTextureBlue = false;

        /**
         * Specifies if the metallic texture contains the ambient occlusion information in its red channel.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useAmbientOcclusionFromMetallicTextureRed = false;

        /**
         * Specifies if the ambient texture contains the ambient occlusion information in its red channel only.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useAmbientInGrayScale = false;
        
        /**
         * In case the reflectivity map does not contain the microsurface information in its alpha channel,
         * The material will try to infer what glossiness each pixel should be.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useAutoMicroSurfaceFromReflectivityMap = false;
        
        /**
         * BJS is using an harcoded light falloff based on a manually sets up range.
         * In PBR, one way to represents the fallof is to use the inverse squared root algorythm.
         * This parameter can help you switch back to the BJS mode in order to create scenes using both materials.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public usePhysicalLightFalloff = true;
        
        /**
         * Specifies that the material will keeps the reflection highlights over a transparent surface (only the most limunous ones).
         * A car glass is a good exemple of that. When the street lights reflects on it you can not see what is behind.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useRadianceOverAlpha = true;
        
        /**
         * Allows using the bump map in parallax mode.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useParallax = false;

        /**
         * Allows using the bump map in parallax occlusion mode.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useParallaxOcclusion = false;

        /**
         * Controls the scale bias of the parallax mode.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public parallaxScaleBias = 0.05;
        
        /**
         * If sets to true, disables all the lights affecting the material.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsLightsDirty")
        public disableLighting = false;

        /**
         * Number of Simultaneous lights allowed on the material.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsLightsDirty")
        public maxSimultaneousLights = 4;  

        /**
         * If sets to true, x component of normal map value will invert (x = 1.0 - x).
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public invertNormalMapX = false;

        /**
         * If sets to true, y component of normal map value will invert (y = 1.0 - y).
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public invertNormalMapY = false;

        /**
         * If sets to true and backfaceCulling is false, normals will be flipped on the backside.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public twoSidedLighting = false;

        /**
         * Secifies that the alpha is premultiplied before output (this enables alpha premultiplied blending).
         * in your scene composition.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public premultiplyAlpha = false;

        /**
         * A fresnel is applied to the alpha of the model to ensure grazing angles edges are not alpha tested.
         * And/Or ocllude the blended part.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public useAlphaFresnel = false;

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
         * The camera exposure used on this material.
         * This property is here and not in the camera to allow controlling exposure without full screen post process.
         * This corresponds to a photographic exposure.
         */
        public get cameraExposure(): number {
            return this._imageProcessingConfiguration.cameraExposure;
        };
        /**
         * The camera exposure used on this material.
         * This property is here and not in the camera to allow controlling exposure without full screen post process.
         * This corresponds to a photographic exposure.
         */
        public set cameraExposure(value: number) {
            this._imageProcessingConfiguration.cameraExposure = value;
        };
        
        /**
         * Gets The camera contrast used on this material.
         */
        public get cameraContrast(): number {
            return this._imageProcessingConfiguration.cameraContrast;
        }

        /**
         * Sets The camera contrast used on this material.
         */
        public set cameraContrast(value: number) {
            this._imageProcessingConfiguration.cameraContrast = value;
        }
        
        /**
         * Gets the Color Grading 2D Lookup Texture.
         */
        public get cameraColorGradingTexture(): BaseTexture {
            return this._imageProcessingConfiguration.colorGradingTexture;
        }
        /**
         * Sets the Color Grading 2D Lookup Texture.
         */
        public set cameraColorGradingTexture(value: BaseTexture) {
            this._imageProcessingConfiguration.colorGradingTexture = value;
        }

        /**
         * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT). 
         * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
         * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image; 
         * corresponding to low luminance, medium luminance, and high luminance areas respectively.
         */
        public get cameraColorCurves(): ColorCurves {
            return this._imageProcessingConfiguration.colorCurves;
        }
        /**
         * The color grading curves provide additional color adjustmnent that is applied after any color grading transform (3D LUT). 
         * They allow basic adjustment of saturation and small exposure adjustments, along with color filter tinting to provide white balance adjustment or more stylistic effects.
         * These are similar to controls found in many professional imaging or colorist software. The global controls are applied to the entire image. For advanced tuning, extra controls are provided to adjust the shadow, midtone and highlight areas of the image; 
         * corresponding to low luminance, medium luminance, and high luminance areas respectively.
         */
        public set cameraColorCurves(value: ColorCurves) {
            this._imageProcessingConfiguration.colorCurves = value;
        }

        /**
         * If true, it allows the output of the shader to be in hdr space (e.g. more than one) which is useful
         * in combination of post process in float or half float mode.
         * 
         * This also disable the image procesing that require to be applied separately.
         */
        @serialize()
        @expandToProperty("_markAllSubMeshesAsTexturesDirty")
        public hdrLinearOutput = false;

        /**
         * Instantiates a new PBRMaterial instance.
         * 
         * @param name The material name
         * @param scene The scene the material will be use in.
         */
        constructor(name: string, scene: Scene) {
            super(name, scene);
        }

        public getClassName(): string {
            return "PBRMaterial";
        }

        public clone(name: string): PBRMaterial {
            return SerializationHelper.Clone(() => new PBRMaterial(name, this.getScene()), this);
        }

        public serialize(): any {
            var serializationObject = SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.PBRMaterial";
            return serializationObject;
        }

        // Statics
        public static Parse(source: any, scene: Scene, rootUrl: string): PBRMaterial {
            return SerializationHelper.Parse(() => new PBRMaterial(source.name, scene), source, scene, rootUrl);
        }
    }
}