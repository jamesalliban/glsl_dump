
#extension GL_ARB_texture_rectangle : enable

uniform sampler2DRect tex0;
uniform float farThreshold;
uniform float minDistForFilling;

float getPositionFromColour(vec4 vec)
{
    float plusMinusMultiplier = 1.0;
    if (vec.b == 0.0) plusMinusMultiplier = -1.0;
    
    return ((vec.r * 255.0 * 255.0) + (vec.g * 255.0)) * plusMinusMultiplier;
}


vec3 convertDistanceToColor(int dist)
{
    return vec3((float(dist / 255)) / 255.0,
                mod(float(dist), 255.0) / 255.0,
                0.0);
}

vec3 getVertex(vec2 posX, vec2 posY, vec2 posZ, vec2 offset)
{
    return vec3(getPositionFromColour(texture2DRect(tex0, posX + offset)),
                getPositionFromColour(texture2DRect(tex0, posY + offset)), 
                getPositionFromColour(texture2DRect(tex0, posZ + offset)));
}


bool isPixelBlank(vec4 col)
{
    if (col.r == 0.0 && col.g == 0.0 && col.b == 0.0)
        return true;
    else
        return false;
}


void main(void)
{
    vec2 pos = gl_TexCoord[0].st;
    vec4 col = texture2DRect(tex0, pos);
    int maxPixelCheck = 10;
    int pixelSkip = 1;
    
    float texWidth = 320.0;
    float texHeight = 240.0;
    
    vec2 posX = gl_TexCoord[0].st + vec2(0.0, texHeight);
    vec2 posY = gl_TexCoord[0].st + vec2(0.0, texHeight * 2.0);
    vec2 posZ = gl_TexCoord[0].st;

    float NORMAL_OFF = 1.0;
    vec3 off = vec3(-NORMAL_OFF, 0, NORMAL_OFF);
    
    vec3 vertexInQuestion = getVertex(posX, posY, posZ, off.yy);

    if (isPixelBlank(col))
    {
        bool isLeft = false;
        bool isRight = false;
        
        vec2 offset;
        vec3 vertexLeft;
        vec3 vertexRight;
        for (int i = 0; i < maxPixelCheck; i++)
        {
            //abs(float(distRT - theDepthInQuestion)) < minDistForAveraging
            
            offset = vec2(i * -1, 0);
            vertexLeft = getVertex(posX, posY, posZ, offset);
            
            if (vertexLeft.z != 0.0)
            {
                isLeft = true;
            }

            offset = vec2(i, 0);
            vertexRight = getVertex(posX, posY, posZ, offset);

            if (vertexRight.z != 0.0)
            {
                isRight = true;
            }
        }
        
        if (isLeft && isRight)
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }

    }
    else
    {
        gl_FragColor = col;
    }
}
