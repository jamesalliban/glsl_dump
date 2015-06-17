
uniform sampler2DRect tex0;
uniform sampler2DRect maskTex;

void main (void)
{
	vec2 pos = gl_TexCoord[0].st;
	vec3 src = texture2DRect(tex0, pos).rgb;
	vec4 maskSrc = texture2DRect(maskTex, pos);
	float maskAlpha = texture2DRect(maskTex, pos).a;
	gl_FragColor = vec4(src, maskAlpha);
    
//    gl_FragColor = vec4(src, 1.0);
//    gl_FragColor = maskSrc;
}
