
// based on code from Unity Shaders and Effects Cookbook

//uniform sampler2DRecttex0;
uniform sampler2D tex0;
uniform float inWhite;
uniform float inBlack;
uniform float outWhite;
uniform float outBlack;
uniform float inGamma;

float getPixelLevel(float pixelColour)
{
    float pixelResult;
    pixelResult = pixelColour * 255.0;
    pixelResult = max(0.0, pixelResult - inBlack);
    pixelResult = pow(pixelResult / (inWhite - inBlack), inGamma);
    pixelResult = (pixelResult * (outWhite - outBlack) + outBlack) / 255.0;
    return pixelResult;
}


void main(void) 
{
//    vec4 result = texture2DRect(tex0, gl_TexCoord[0].st);
    vec4 result = texture2D(tex0, gl_TexCoord[0].st);
    
    result.r = getPixelLevel(result.r);
    result.g = getPixelLevel(result.g);
    result.b = getPixelLevel(result.b);
    
    gl_FragColor = result;
}