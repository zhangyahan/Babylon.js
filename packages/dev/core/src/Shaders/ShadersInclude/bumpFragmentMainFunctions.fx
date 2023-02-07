﻿#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
	#if defined(TANGENT) && defined(NORMAL) 
		varying mat3 vTBN;
	#endif

	#ifdef OBJECTSPACE_NORMALMAP
		uniform mat4 normalMatrix;

		mat4 toNormalMatrix(mat4 wMatrix)
		{
			mat4 ret = inverse(wMatrix);
			ret = transpose(ret);
			ret[0][3] = 0.;
			ret[1][3] = 0.;
			ret[2][3] = 0.;
			ret[3] = vec4(0., 0., 0., 1.);
			return ret;
		}
	#endif

	vec3 perturbNormalBase(mat3 cotangentFrame, vec3 normal, float scale)
	{
		#ifdef NORMALXYSCALE
			normal = normalize(normal * vec3(scale, scale, 1.0));
		#endif

		return normalize(cotangentFrame * normal);
	}

	vec3 perturbNormal(mat3 cotangentFrame, vec3 textureSample, float scale)
	{
		return perturbNormalBase(cotangentFrame, textureSample * 2.0 - 1.0, scale);
	}

	// Thanks to http://www.thetenthplanet.de/archives/1180
	mat3 cotangent_frame(vec3 normal, vec3 p, vec2 uv, vec2 tangentSpaceParams)
	{
		// get edge vectors of the pixel triangle
		vec3 dp1 = dFdx(p);
		vec3 dp2 = dFdy(p);
		vec2 duv1 = dFdx(uv);
		vec2 duv2 = dFdy(uv);

		// solve the linear system
		vec3 dp2perp = cross(dp2, normal);
		vec3 dp1perp = cross(normal, dp1);
		vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
		vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;

		// invert the tangent/bitangent if requested
		tangent *= tangentSpaceParams.x;
		bitangent *= tangentSpaceParams.y;

		// construct a scale-invariant frame
		float det = max(dot(tangent, tangent), dot(bitangent, bitangent));
		float invmax = det == 0.0 ? 0.0 : inversesqrt(det);
		return mat3(tangent * invmax, bitangent * invmax, normal);
	}
#endif
