
#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect tex0;
uniform float farThreshold;
uniform float motionData[600];


void main(void)
{
    vec2 pos = gl_TexCoord[0].st;
    vec4 col = texture2DRect(tex0, pos);
    
    col.r = 0.0;
    col.b = 0.0;
    col.g = 0.0;
    
    //vec4
    for (int i = 0; i < 3; i+=3)
    {
        col.r += motionData[i];
        col.g += motionData[i+1];
        col.b += motionData[i+2];
    }
    
//    col.r = motionData[int(pos.y)];
//    col.g = motionData[int(pos.y)];
//    col.b = motionData[int(pos.y)];

    
    
    //col /= 1.0;
    
    col.a = 1.0;
    
    //col = vec4(0.0, 0.0, 1.0, 1.0);
    gl_FragColor = col;
}
