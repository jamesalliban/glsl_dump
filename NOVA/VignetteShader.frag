
//#extension GL_ARB_texture_rectangle : enable

uniform sampler2D baseMap;

uniform float ratio;
uniform float startRadius;
uniform float endRadius;
uniform float randomNoiseScale;


float map(float value, float inputMin, float inputMax, float outputMin, float outputMax, bool clamp)
{
	if (abs(inputMin - inputMax) < 0.000000001){
		return outputMin;
	} else {
		float outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
        
		if(clamp){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}


float rand(vec2 n)
{
    return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}


void main(void) 
{	
    vec2 m = vec2(0.5, 0.5);
    vec2 scaledTexCoord = gl_TexCoord[0].st;
    if (scaledTexCoord.y <= 0.5)
        scaledTexCoord.y = map(scaledTexCoord.y, 0.5, 0.0, 0.5, 0.5 - 0.5 * ratio, true);
    else
        scaledTexCoord.y = map(scaledTexCoord.y, 0.5, 1.0, 0.5, 0.5 + 0.5 * ratio, true);
    
    float randOffset = rand(vec2(gl_TexCoord[0].st)) * randomNoiseScale;
    
	float d = distance(m, scaledTexCoord);
	vec3 c = texture2D(baseMap, gl_TexCoord[0].st).rgb;
    float colourScale = map(d, startRadius, endRadius, 1.0, 0.0, true) + randOffset;
	gl_FragColor = vec4(c.rgb * colourScale, 1.0);
}