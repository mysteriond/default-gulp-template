{
  // Default options
  'functions': true,
  'variableNameTransforms': ['dasherize']
}

{{#block "sprites"}}
{{#each sprites}}
${{strings.name_width}}: {{px.width}};
${{strings.name_height}}: {{px.height}};
${{strings.name}}: ({{px.x}}, {{px.y}}, {{px.offset_x}}, {{px.offset_y}}, {{px.width}}, {{px.height}}, {{px.total_width}}, {{px.total_height}}, '{{{escaped_image}}}', '{{name}}', );
{{/each}}
{{/block}}
{{#block "spritesheet"}}
${{spritesheet_info.strings.name_sprites}}: ({{#each sprites}}${{strings.name}}, {{/each}});
${{spritesheet_info.strings.name}}: ({{spritesheet.px.width}}, {{spritesheet.px.height}}, '{{{spritesheet.escaped_image}}}', ${{spritesheet_info.strings.name_sprites}}, );
{{/block}}
{{#block "sprite-functions"}}
{{#if options.functions}}
@mixin sprite-width($sprite) {
  width: nth($sprite, 5);
}
@mixin sprite-height($sprite) {
  height: nth($sprite, 6);
}
@mixin sprite-position($sprite) {
  $sprite-offset-x: nth($sprite, 3);
  $sprite-offset-y: nth($sprite, 4);
  background-position: $sprite-offset-x  $sprite-offset-y;
}  
@mixin sprite-image($sprite) {
  $sprite-image: nth($sprite, 9);
  background-image: url(#{$sprite-image});
}
@mixin sprite($sprite) {
  @include sprite-image($sprite);
  @include sprite-position($sprite);
  @include sprite-width($sprite);
  @include sprite-height($sprite);
}  
{{/if}}
{{/block}}
{{#block "spritesheet-functions"}}
{{#if options.functions}}
@mixin sprites($sprites) {
  @each $sprite in $sprites {
    $sprite-name: nth($sprite, 10);
    .#{$sprite-name} {
      @include sprite($sprite);
    }
  }    
}
{{/if}}
{{/block}}