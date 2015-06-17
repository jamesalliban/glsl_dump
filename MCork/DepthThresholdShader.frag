
//#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect tex0;
uniform int minThreshold;
uniform int maxThreshold;

void main(void) 
{
    vec4 pix = texture2DRect(tex0, gl_TexCoord[0].st);
    float pixAverage = (pix.r + pix.g + pix.b) / 3.0;
    
    vec4 col = vec4(0.0, 0.0, 0.0, 1.0);
    
    if (pixAverage > float(minThreshold) / 255.0 && pixAverage < float(maxThreshold) / 255.0)
        col = vec4(1.0, 1.0, 1.0, 1.0);
    
    gl_FragColor = col;
}
