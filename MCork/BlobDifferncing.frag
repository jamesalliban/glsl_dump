
//#extension GL_ARB_texture_rectangle : enable


uniform sampler2DRect tex0;


int getDistanceFromColour(vec3 vec)
{
    return int(255.0 * (vec.r * 255.0) + (vec.g * 255.0));
}

vec3 convertDistanceToColor(int dist)
{
    
    return vec3((float(dist / 255)) / 255.0,
                mod(float(dist), 255.0) / 255.0,
                0.0);
}

void main(void) 
{
    vec4 pix = texture2DRect(tex0, gl_TexCoord[0].st);
    
    
    // if pixel is red, add one to the current difference count. This number is encoded into the first pixel
    if (pix.r == 1.0 && pix.g == 0.0 && pix.b == 0.0)
    {
        vec4 motionCount = getDistanceFromColour(texture2DRect(tex0, vec2(0, 0)).rgb);
        ++motionCount;
        //motionCount +=
    }
    
    
//    float pixAverage = (pix.r + pix.g + pix.b) / 3.0;
//    
//    vec4 col = vec4(0.1, 0.1, 0.1, 1.0);
//    
//    if (pixAverage > float(minThreshold) / 255.0 && pixAverage < float(maxThreshold) / 255.0)
//        col = vec4(1.0, 1.0, 1.0, 1.0);
    
    gl_FragColor = col;
}

