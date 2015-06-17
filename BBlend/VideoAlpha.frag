
uniform sampler2DRect tex0;
uniform float alpha;

void main (void)
{
	vec2 pos = gl_TexCoord[0].st;
	vec3 src = texture2DRect(tex0, pos).rgb;
    
    float colTotal = src.r + src.g + src.b;
    float alphaFromCol = colTotal / 3.0;
	gl_FragColor = vec4(src, alphaFromCol * alpha);
    
//    gl_FragColor = vec4(src, 1.0);
//    gl_FragColor = maskSrc;
}
