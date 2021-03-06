#version 300 es
precision highp float;

in vec4 v_color;
in vec2 v_texcoord;
in vec3 v_view;

out vec4 color;

uniform sampler2D terrain_texture_sampler;
uniform sampler2D bottom_texture_sampler;
uniform sampler2D top_texture_sampler;
uniform vec2 tiling_factor;
uniform vec2 mixing_heights;

uniform vec4 tint;
uniform vec4 fog_color;
uniform float fog_distance;

float fogAmount(float dist){
    return 1.0 - exp( -dist / fog_distance );
}

void main(){
    float height = texture(terrain_texture_sampler, v_texcoord).r; 
    vec4 bottom_color = texture(bottom_texture_sampler, v_texcoord*tiling_factor);
    vec4 top_color = texture(top_texture_sampler, v_texcoord*tiling_factor);
    
    color = mix(bottom_color, top_color, smoothstep(mixing_heights.x, mixing_heights.y, height)) * v_color * tint; // Send our interpolated color

    color = mix(color, fog_color, fogAmount(length(v_view)));

}