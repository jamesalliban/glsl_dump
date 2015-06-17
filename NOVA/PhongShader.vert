

varying vec3 v;
varying vec3 N;
varying vec4 v_col;

void main()
{
    v_col = gl_Color;
	v = vec3(gl_ModelViewMatrix * gl_Vertex);       
	N = normalize(gl_NormalMatrix * gl_Normal);
    
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_Position = ftransform();
}
