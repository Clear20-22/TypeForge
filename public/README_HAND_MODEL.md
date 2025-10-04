# Instructions for Adding a 3D Hand Model

## Quick Start

1. **Get a 3D Hand Model**
   - Download from [Sketchfab](https://sketchfab.com/3d-models?features=rigged&q=hand&type=downloadable)
   - Use [Mixamo](https://mixamo.com) characters (hands included)
   - Create your own in Blender

2. **Format Requirements**
   - File format: `.glb` or `.gltf`
   - Must be rigged with finger bones
   - File name: `hand.glb`

3. **Placement**
   ```
   TypeForge/
   ├── public/
   │   └── hand.glb  ← Place your model here
   ├── src/
   └── ...
   ```

4. **Test the Model**
   - Go to Practice page
   - Press A, S, D, F, J, K, L, ; keys
   - Fingers should animate

## Bone Naming

Your hand model should have bones named like:
- `left_pinky`, `left_ring`, `left_middle`, `left_index`
- `right_index`, `right_middle`, `right_ring`, `right_pinky`

Or variations like:
- `pinky_01_L`, `ring_01_L`, etc.
- `LeftPinky`, `LeftRing`, etc.

## Troubleshooting

- **Model not loading?** Check browser console for errors
- **No animation?** Verify bone names in your 3D software
- **Performance issues?** Reduce polygon count or texture size

## Free Hand Models

Some sources for free rigged hand models:
- [Ready Player Me](https://readyplayer.me) - Generate avatars
- [VRoid Hub](https://hub.vroid.com) - Anime-style models  
- [OpenGameArt](https://opengameart.org) - Free game assets
- [Free3D](https://free3d.com) - Various 3D models

**Note:** Make sure you have the right to use any model you download!