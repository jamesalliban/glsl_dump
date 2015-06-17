//#version 120

uniform sampler2DRect tex0;
uniform float sampleArea;
uniform float maxDarkNeighboursPercent;

void main(void) 
{
    vec4 pix = texture2DRect(tex0, gl_TexCoord[0].st);
	int darkNeighbours = 0;
	for (int i = 0; i < int(sampleArea); i++)
	{
		float index =  float(i);
		vec4 u = texture2DRect(tex0, gl_TexCoord[0].st + vec2(0.0, -index));
		vec4 d = texture2DRect(tex0, gl_TexCoord[0].st + vec2(0.0, index));
		vec4 l = texture2DRect(tex0, gl_TexCoord[0].st + vec2(-index, 0.0));
		vec4 r = texture2DRect(tex0, gl_TexCoord[0].st + vec2(index, 0.0));

		if (u.r == 0.0 && u.g == 0.0 && u.b == 0.0)
			++darkNeighbours;
		if (d.r == 0.0 && d.g == 0.0 && d.b == 0.0)
			++darkNeighbours;
		if (l.r == 0.0 && l.g == 0.0 && l.b == 0.0)
			++darkNeighbours;
		if (r.r == 0.0 && r.g == 0.0 && r.b == 0.0)
			++darkNeighbours;
	}
	vec4 newCol = vec4(1.0, 1.0, 1.0, 1.0);

	if (darkNeighbours > int(maxDarkNeighboursPercent * (sampleArea * 4.0)))
		newCol = vec4(0.0, 0.0, 0.0, 1.0);

    gl_FragColor = newCol;

}


