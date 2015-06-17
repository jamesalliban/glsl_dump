
//#extension GL_ARB_texture_rectangle : enable

uniform sampler2D tex0;

uniform vec2 resolution;
uniform float holeSize;
uniform vec3 maskCol;
uniform float antialiasRange;


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
    vec2 pos = gl_TexCoord[0].st;
    vec4 src = texture2D(tex0, pos);
    vec2 centre = vec2(0.5, 0.5);
    
    vec4 result = vec4(maskCol, 1.0);
    
    float ratio = resolution.x / resolution.y;
    
    pos.x = map(pos.x, 0.0, 1.0, -((ratio - 1.0) * 0.5), 1.0 + ((ratio - 1.0) * 0.5), true);
    
    float distToCentre = distance(centre, pos);
    
    if (distToCentre <= 0.5 * holeSize)
    {
        result = src;
    }
    else if (distToCentre > 0.5 * holeSize && distToCentre < 0.5 * (holeSize * (1.0 + antialiasRange)))
    {
        float aaBegin= 0.5 * (holeSize * (1.0 + antialiasRange));
        float aaEnd = 0.5 * holeSize;
        float red = map(distToCentre, aaBegin, aaEnd, maskCol.r, src.r, true);
        float green = map(distToCentre, aaBegin, aaEnd, maskCol.g, src.g, true);
        float blue = map(distToCentre, aaBegin, aaEnd, maskCol.b, src.b, true);
        result = vec4(red, green, blue, 1.0);
    }
    else
    {
        result = vec4(maskCol, 1.0);
    }
    
    gl_FragColor = result;
}






//void main(void)
//{
//    vec2 pos = gl_TexCoord[0].st;
//    vec4 src = texture2D(tex0, pos);
//    vec2 centre = vec2(0.5, 0.5);
//    
//    float ratio = resolution.x / resolution.y;
//    
//    pos.x = map(pos.x, 0.0, 1.0, -((ratio - 1.0) * 0.5), 1.0 + ((ratio - 1.0) * 0.5), true);
//    
//    float distToCentre = distance(centre, pos);
//    
//    if (distToCentre <= 0.5 * holeSize)
//    {
//        src = src;
//    }
//    else if (distToCentre > 0.5 * holeSize && distToCentre < 0.5 * (holeSize * (1.0 + antialiasRange)))
//    {
//        float aaBegin= 0.5 * (holeSize * (1.0 + antialiasRange));
//        float aaEnd = 0.5 * holeSize;
//        src.a = map(distToCentre, aaBegin, aaEnd, 0.0, 1.0, true);
//    }
//    else
//    {
//        src.a = 0.0;
//    }
//    
//    gl_FragColor = src;
//}