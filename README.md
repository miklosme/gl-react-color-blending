# gl-react-blend-modes

Blend mode shaders for [gl-react-native](https://github.com/ProjectSeptemberInc/gl-react-native).

Shaders from here: [glsl-blend](https://github.com/jamieowen/glsl-blend).

Check out the example React Native app in the `example` folder.

## Install

`npm install --save gl-react-color-blending`

## Usage

```
import ColorBlending from 'gl-react-color-blending';
```

```
<ColorBlending
  color={color}
  blendMode={blendMode}
>
    <Image ... />
</ColorBlending>
```

Color: must be a `array` with the length of 4 (RGBA format). Values must be [0..1].
Color example: [0.1, 0.9, 0.1, 1] // greenish

Blend mode is a string.

Supported blend modes:
1. `blendAdd`
2. `blendAverage`
3. `blendColorBurn`
4. `blendColorDodge`
5. `blendDarken`
6. `blendDifference`
7. `blendExclusion`
8. `blendHardLight`
9. `blendHardMix`
10. `blendLighten`
11. `blendLinearBurn`
12. `blendLinearDodge`
13. `blendLinearLight`
14. `blendMultiply`
15. `blendNegation`
16. `blendNormal`
17. `blendOverlay`
18. `blendPhoenix`
19. `blendPinLight`
20. `blendReflect`
21. `blendScreen`
22. `blendSoftLight`
23. `blendSubstract`
24. `blendSubtract`
25. `blendVividLight`

## Other API

`import ColorBlending, {getAllBlendNames, blendModeCodes} from 'gl-react-color-blending';`

`getAllBlendNames`: Every support blend mode name in an array.

`blendModeCodes`: Shader codes in text. You can inject it to your own GLSL code with ES2015 template strings.

## Licence

MIT
