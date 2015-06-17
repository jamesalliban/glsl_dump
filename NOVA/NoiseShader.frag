uniform sampler2D tex0;

uniform float noiseAmount;

//float rand(vec2 co){
//    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
//}

float rand(vec2 n)
{
    return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);
}


void main(void)
{
    vec4 col = texture2D(tex0, gl_TexCoord[0].st);
    
    float offsetR = rand(vec2(gl_TexCoord[0].x * 12.0, gl_TexCoord[0].y * 43.0));
    float offsetG = rand(vec2(gl_TexCoord[0].y * 4.0, gl_TexCoord[0].x * 34.0));
    float offsetB = rand(vec2(gl_TexCoord[0].x * gl_TexCoord[0].y, gl_TexCoord[0].x * 89.0));
    
    col.r += offsetR * noiseAmount;
    col.g += offsetG * noiseAmount;
    col.b += offsetB * noiseAmount;
    
    col.r = clamp(col.r, 0.0, 1.0);
    col.g = clamp(col.g, 0.0, 1.0);
    col.b = clamp(col.b, 0.0, 1.0);
    
    gl_FragColor = col;
}