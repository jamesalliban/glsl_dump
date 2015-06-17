
uniform sampler2D tex0_blend;
uniform sampler2D tex1_blend;
uniform float overlaySize;

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

void main()
{
    vec2 st = gl_TexCoord[0].st;
    vec4 pix = vec4(1.0, 0.0, 0.0, 1.0);

    
    float overlaySizeHalf = overlaySize * 0.5;
    
    
    
    if (st.y < 0.5 - overlaySizeHalf) // top image area
    {
        vec2 pos = vec2(st.x, map(st.y, 0.0, 0.5 + overlaySizeHalf, 0.0, 1.0, true));
        pix = texture2D(tex0_blend, pos);
    }
    else if (st.y >= 0.5 - overlaySizeHalf && st.y <= 0.5 + overlaySizeHalf) // if in the blend zone
    {
        vec2 pos0 = vec2(st.x, map(st.y, 0.0, 0.5 + overlaySizeHalf, 0.0, 1.0, true));
        vec4 pix0 = texture2D(tex0_blend, pos0);
        vec2 pos1 = vec2(st.x, map(st.y, 0.5 - overlaySizeHalf, 1.0, 0.0, 1.0, true));
        vec4 pix1 = texture2D(tex1_blend, pos1);
        
        float blendProgress0 = map(st.y, 0.5 - overlaySizeHalf, 0.5 + overlaySizeHalf, 1.0, 0.0, true);
        
        float blendProgress1 = map(st.y, 0.5 - overlaySizeHalf, 0.5 + overlaySizeHalf, 0.0, 1.0, true);
        
        pix0.rgb *= blendProgress0;
        pix1.rgb *= blendProgress1;
        
        pix.rgb = (pix0.rgb + pix1.rgb);
    }
    else // bottom image area
    {
        vec2 pos = vec2(st.x, map(st.y, 0.5 - overlaySizeHalf, 1.0, 0.0, 1.0, true));
        pix = texture2D(tex1_blend, pos);
    }
    
    gl_FragColor = pix;
}