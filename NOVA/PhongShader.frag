
uniform sampler2D tex0;
uniform sampler2D texDepthMap;

varying vec3 v;
varying vec3 N;

uniform int texW;
uniform int texH;
uniform vec4 ambient;
uniform vec4 diffuse;
uniform vec4 specular;
uniform float shinyness;
uniform float shadowIntensity;
uniform float texCoordToVertSizeRatio;
uniform float alphaDecayExponent;
uniform float backFacingDarkness;
uniform int areEdgesFeathered;

varying vec4 v_col;

void main()
{	
	vec3 L = normalize(gl_LightSource[0].position.xyz - v);
	vec3 E = normalize(-v); 
	vec3 R = normalize(-reflect(L,N));
    
//    if (gl_FrontFacing)  // the mesh seems to be facing the worng way.
//        L *= -1.0;
    
    // bump map
    vec3 bumpNormal = normalize(texture2D(tex0, gl_TexCoord[0].st + vec2(0.5, 0.0)).rgb);
    
	// ambient term 
	vec4 Iamb = ambient;

	// diffuse term
	vec4 Idiff = texture2D( tex0, gl_TexCoord[0].st) * diffuse;
	//Idiff *= max(dot(N + bumpNormal,L), shadowIntensity);     // if bumpmap used
	Idiff *= max(dot(N,L), shadowIntensity);
	Idiff = clamp(Idiff, 0.0, diffuse.a);

	// specular term
	vec4 Ispec = specular; 
	Ispec *= pow(max(dot(R,E),0.0), shinyness);
	Ispec = clamp(Ispec, 0.0, 1.0);

	// final color
    vec4 finalCol = Iamb + Idiff + Ispec;
//    finalCol.rgb += depthmapPix.rgb * 0.2;
    
    float alpha;
    if (gl_TexCoord[0].x < 0.5) // main body of mesh
    {
        alpha = pow(((gl_TexCoord[0].x * 2.0) - 1.0) * -1.0, alphaDecayExponent);
        if (gl_FrontFacing) finalCol.rgb *= backFacingDarkness;
        if (areEdgesFeathered == 1) alpha *= v_col.a;
    }
    else
    {
//        //set alpha from colour - sort of a screen blend mode
//        vec3 pixRgb = texture2D( tex0, gl_TexCoord[0].st).rgb;
//        float average = (pixRgb.r + pixRgb.g + pixRgb.b) / 3.0;
//        alpha = average;
        
        alpha = texture2D(tex0, gl_TexCoord[0].st).a;
        alpha *= v_col.a;
    }
    
    
    finalCol.rgb *= v_col.rgb;
    
    
	gl_FragColor = vec4(finalCol.rgb, alpha);
}
