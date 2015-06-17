//varying vec2 vTexCoord;

void main(void) 
{
    gl_TexCoord[0] = gl_MultiTexCoord0;
    gl_Position = ftransform();
}
