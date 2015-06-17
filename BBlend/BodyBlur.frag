
uniform sampler2DRect tex0;
uniform sampler2DRect maskTex;
uniform ivec2 texSize;
uniform int blurSampleSize;
uniform int blurSampleStep;

uniform float colorRingSize;
uniform float red;
uniform float green;
uniform float blue;

uniform float blackHoleSize;

void main (void)
{
	vec2 pos = gl_TexCoord[0].st;
	vec4 src = texture2DRect(tex0, pos);
	vec4 maskSrc = texture2DRect(maskTex, pos);
    vec4 result;
    
    vec2 centre = vec2(float(texSize.x) * 0.5, float(texSize.y) * 0.5);
    float distToCentre = distance(centre, pos);
    
    if (distToCentre > blackHoleSize - 1.0)
    {
    
        vec4 averageCol = src;
        int averageCount = 1;
        if (maskSrc.a > 0.1)
        {
            for (int i = 0; i < blurSampleSize; i++)
            {
                for (int j = 0; j < blurSampleSize; j++)
                {
                    vec2 offset0 = vec2(pos.x + float(i * blurSampleStep) - (float(blurSampleSize * blurSampleStep) * 0.5),
                                        pos.y + float(j * blurSampleStep) - (float(blurSampleSize * blurSampleStep) * 0.5));
                    vec4 offsetPix0 = texture2DRect(tex0, offset0);
                    if (texture2DRect(maskTex, offset0) == maskSrc && src.a > 0.1)
                    {
                        averageCol += texture2DRect(tex0, offset0);
                        ++averageCount;
                    }
                }
            }
            
            averageCol /= float(averageCount);
            result = averageCol;
        }
        else
        {
            result = src;
        }
    
    
        if (distToCentre < colorRingSize)
        {
            vec3 colourVec = vec3(red, green, blue);
            result.rgb *= colourVec;
        }
    }
    
    gl_FragColor = result;
}
