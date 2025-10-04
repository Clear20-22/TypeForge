# 3D Hand Model Setup for TypeForge

## Overview
TypeForge now includes a 3D animated hand that responds to your typing in real-time! The hand shows proper finger positioning and animates when you press the mapped keys.

## Quick Setup

### 1. Install Dependencies
Run the following command to install the required Three.js libraries:

```bash
npm install @react-three/fiber @react-three/drei three
```

### 2. Add Your Hand Model
1. Find or create a rigged 3D hand model in GLTF/GLB format
2. Name it `hand.glb`
3. Place it in the `/public` folder of your project

## Supported Key Mappings

The 3D hand responds to these home row keys:

| Key | Finger |
|-----|---------|
| A | Left Pinky |
| S | Left Ring |
| D | Left Middle |
| F | Left Index |
| J | Right Index |
| K | Right Middle |
| L | Right Ring |
| ; | Right Pinky |

## Bone Naming Conventions

The system supports multiple bone naming conventions. Your hand model should include bones named with one of these patterns:

### Left Hand Bones:
- **Pinky**: `left_pinky`, `pinky_01_L`, `pinky.01.L`, `LeftPinky`, `L_Pinky`, `pinky_l`
- **Ring**: `left_ring`, `ring_01_L`, `ring.01.L`, `LeftRing`, `L_Ring`, `ring_l`
- **Middle**: `left_middle`, `middle_01_L`, `middle.01.L`, `LeftMiddle`, `L_Middle`, `middle_l`
- **Index**: `left_index`, `index_01_L`, `index.01.L`, `LeftIndex`, `L_Index`, `index_l`

### Right Hand Bones:
- **Index**: `right_index`, `index_01_R`, `index.01.R`, `RightIndex`, `R_Index`, `index_r`
- **Middle**: `right_middle`, `middle_01_R`, `middle.01.R`, `RightMiddle`, `R_Middle`, `middle_r`
- **Ring**: `right_ring`, `ring_01_R`, `ring.01.R`, `RightRing`, `R_Ring`, `ring_r`
- **Pinky**: `right_pinky`, `pinky_01_R`, `pinky.01.R`, `RightPinky`, `R_Pinky`, `pinky_r`

## Creating Your Own Hand Model

### Option 1: Use Blender
1. Download a rigged hand model or create one in Blender
2. Ensure the armature has properly named finger bones
3. Export as GLTF/GLB format
4. Test bone names match the supported conventions

### Option 2: Use Ready-Made Assets
You can find hand models on:
- [Sketchfab](https://sketchfab.com) (search for "rigged hand")
- [Mixamo](https://mixamo.com) (Adobe's free character service)
- [OpenGameArt](https://opengameart.org)
- [Free3D](https://free3d.com)

### Model Requirements:
- ✅ GLTF/GLB format
- ✅ Rigged with finger bones
- ✅ Reasonable polygon count (< 10k triangles recommended)
- ✅ Proper bone naming convention
- ✅ Clean topology

## Troubleshooting

### Model Not Loading?
1. Check console for error messages
2. Verify the file is named `hand.glb` exactly
3. Ensure the file is in the `/public` folder
4. Check file size (keep under 10MB for performance)

### Fingers Not Animating?
1. Open browser console and look for bone mapping messages
2. Check if your model's bone names match supported conventions
3. Use Blender to inspect bone names in your model
4. Rename bones to match the supported patterns

### Performance Issues?
1. Reduce model polygon count
2. Optimize textures (use compressed formats)
3. Consider using lower quality settings on older devices

## Features

- **Real-time Animation**: Fingers move as you type
- **Multiple Bone Naming Support**: Works with various rigging conventions
- **Smooth Transitions**: Fluid finger movements with proper easing
- **Visual Feedback**: Clear indication of which finger to use
- **Interactive Controls**: Orbit camera to view from different angles
- **Performance Optimized**: Efficient rendering with proper LOD

## Technical Details

- Built with **@react-three/fiber** and **@react-three/drei**
- Uses Three.js for 3D rendering
- Supports GLTF/GLB model format
- Real-time bone manipulation
- Automatic model optimization
- Responsive design with Tailwind CSS

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your model meets the requirements
3. Test with a simple rigged hand model first
4. Ensure all dependencies are properly installed

Happy typing! 🚀