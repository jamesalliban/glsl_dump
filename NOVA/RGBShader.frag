
//#extension GL_ARB_texture_rectangle : enable

uniform sampler2D baseMap;

uniform float brightness;
uniform float contrast;
uniform float saturation;
uniform float alpha;
uniform float red;
uniform float green;
uniform float blue;
uniform float shadowIntensity;

void main(void) 
{
	// Extract colors from baseMap 
	vec4 baseColor = texture2D( baseMap, gl_TexCoord[0].st );
	
    vec3 baseColor3 = baseColor.rgb;

    // Brightness, contrast and saturation
	const float AvgLumR = 0.5;
	const float AvgLumG = 0.5;
	const float AvgLumB = 0.5;
	const vec3 LumCoeff = vec3(0.2125, 0.7154, 0.0721);
	vec3 AvgLumin = vec3(AvgLumR, AvgLumG, AvgLumB);
	vec3 brtColor = baseColor3 * brightness;
    vec3 intensity = vec3(dot(brtColor, LumCoeff));
	vec3 satColor = mix(intensity, brtColor, saturation);
	vec3 conColor = mix(AvgLumin, satColor, contrast);

    baseColor.rgb = conColor;
    vec3 colourVec      = vec3(red, green, blue);
	baseColor.rgb       *= colourVec;
	
    vec4 result = clamp(baseColor, 0.0, 1.0);
    
	gl_FragColor	    =	result;
	
}