uniform sampler2D tex0;
uniform sampler2D slit1px;

uniform float texWidth;
uniform float texHeight;
uniform float slitWidth;
uniform float alpha;

vec4 lerpCol(vec4 start, vec4 stop, float amt)
{
	return start + (stop - start) * amt;
}

void main(void)
{
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;
    float normX = x / texWidth;
    float normY = y / texHeight;
    
    // weird things happen when slitWidth is passed in as an int so I had to do this.
    int slitWidth = int(slitWidth);
    
    if (int(x) < slitWidth)
    {
        float lerpAmount = x / float(slitWidth);
        
        vec4 nextSlit0Col = texture2D(tex0, vec2(0.0, normY));
        vec4 pixelSlit1px = texture2D(slit1px, vec2(0.0, normY));
        
        vec4 result = lerpCol(pixelSlit1px, nextSlit0Col, lerpAmount);
        result.a = alpha;
        
        gl_FragColor = result;
//        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    }
    else
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);
    }
}