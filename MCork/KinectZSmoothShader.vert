//varying vec2 vTexCoord;

void main(void) 
{
    gl_TexCoord[0] = gl_MultiTexCoord0;
    gl_Position = ftransform();
    
//    vec2 pos;
//    pos = sign(gl_Vertex.xy);
//    
//    gl_Position = vec4(pos, 0.0, 1.0);
//    vTexCoord = pos * 0.5 + 0.5;
}
