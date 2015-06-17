
uniform sampler2D tex0;
uniform float blurAmount;
uniform int numSamples;
uniform vec2 resolution;

void main()
{
    vec2 st = gl_TexCoord[0].st;
    vec4 color;
    
    float divideBy = 0.0;
    for (int i = 1; i < numSamples; i++)
    {
        float increase = float(i);
        divideBy += increase;
        float decrease = abs(float(i - numSamples));
        divideBy += decrease;
        vec4 col0 = texture2D(tex0, st + vec2((blurAmount * (decrease * -1.0)) / (resolution.x), 0.0));
        color += increase * col0;
        vec4 col1 = texture2D(tex0, st + vec2((blurAmount * increase) / (resolution.x), 0.0));
        color += decrease * col1;
    }
    
    color += float(numSamples) * texture2D(tex0, st + vec2(0, 0));
    divideBy += float(numSamples);
    color /= divideBy;
    
    gl_FragColor = color;
}