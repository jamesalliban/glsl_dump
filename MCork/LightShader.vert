
varying vec3 v_light_dir;
varying vec3 v_normal;
varying vec4 v_colour;
//varying	vec3 v_view;


void main(void) 
{
    gl_Position = ftransform();

    // Set the front color to the color passed through with glColor*f
    //gl_FrontColor = gl_Color;
    v_colour = gl_Color;
    //v_colour = gl_FrontColor;
    
    vec3 vVertex = vec3(gl_ModelViewMatrix * gl_Vertex);
    
    
    // Transform vertices and pass on texture coordinates
    gl_Position = ftransform();
    
    //get view space position.
    vec4 position = gl_ModelViewMatrix * gl_Vertex;
    
    
    
	 
    // Calculate the light position for this vertex
    v_light_dir = normalize(gl_LightSource[0].position.xyz);
    
    
    //get normal in eye coordinates.
    v_normal = gl_NormalMatrix * gl_Normal;
    
    gl_TexCoord[0] = gl_MultiTexCoord0;
}
