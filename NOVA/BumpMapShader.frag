
// based on code from Unity Shaders and Effects Cookbook

//uniform sampler2DRecttex0;
uniform sampler2D tex0;
uniform float texWidth;
uniform float texHeight;

float getBrightnessValue(vec4 pix)
{
    return (pix.r + pix.g + pix.b) / 3.0;
}

void main(void)
{
//    vec4 result = texture2DRect(tex0, gl_TexCoord[0].st);
    vec4 result = texture2D(tex0, gl_TexCoord[0].st);
    
    if (gl_TexCoord[0].x > 0.5)
    {
        vec4 srcPixel = texture2D(tex0, gl_TexCoord[0].st + vec2(-0.5, 0.0));
        
        vec4 upPixel = texture2D(tex0, gl_TexCoord[0].st + vec2(-0.5, -(1.0 / texHeight)));
        vec4 downPixel = texture2D(tex0, gl_TexCoord[0].st + vec2(-0.5, (1.0 / texHeight)));
        vec4 leftPixel = texture2D(tex0, gl_TexCoord[0].st + vec2(-0.5 - (1.0 / texWidth), 0.0));
        vec4 rightPixel = texture2D(tex0, gl_TexCoord[0].st + vec2(-0.5 + (1.0 / texWidth), 0.0));
        
        float srcLevel = getBrightnessValue(srcPixel);
        float upLevel = getBrightnessValue(upPixel);
        float downLevel = getBrightnessValue(downPixel);
        float leftLevel = getBrightnessValue(leftPixel);
        float rightLevel = getBrightnessValue(rightPixel);
        
        result.r = 0.5 + srcLevel - upLevel;
        result.g = 0.5 + srcLevel - leftLevel;
        result.b = 0.5;
        result.a = 1.0;
        
        
        //result = srcPixel;
    }
    gl_FragColor = result;
}