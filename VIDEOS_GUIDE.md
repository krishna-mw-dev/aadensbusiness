# Video Background Optimization Guide

To maintain a fast, professional, and accessible website while using video backgrounds, follow these best practices.

## 1. Technical Specifications
- **Format**: Always provide `.mp4` (H.264) for maximum compatibility.
- **Modern Format**: Also provide `.webm` (VP9) for smaller file sizes in modern browsers.
- **Resolution**: 1920x1080 (1080p) is standard, but you can often get away with 1280x720 (720p) for backgrounds to save bandwidth.
- **Frame Rate**: 24fps or 30fps is sufficient. Avoid 60fps as it increases file size significantly.

## 2. Compression (Crucial)
Background videos should be as small as possible. Aim for **under 3MB** per video.
- **Handbrake (Free)**: Use the "Web Optimized" checkbox.
- **FFmpeg (CLI)**: Use `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -an output.mp4` (CRF 28-32 is good for backgrounds).
- **Online Tools**: Sites like TinyVideo or Cloudinary can also help.

## 3. Visual Quality
- **Brightness**: Since the website uses dark text in some areas and light in others, ensure your video has enough contrast or use the `overlayOpacity` prop in the `VideoBackground` component.
- **Motion**: Use slow-motion or subtle movement. Fast, jerky camera work is distracting and can cause motion sickness.
- **Looping**: Ensure the start and end of the video blend smoothly to avoid a "jump" when the video restarts.

## 4. Directory Structure
Place your videos in the following location:
```text
public/
  videos/
    hero-bg.mp4
    civil-solutions.mp4
    it-electrical.mp4
    coworking.mp4
    reviews-bg.mp4
```

## 5. Implementation Example
Using the reusable component I created:
```tsx
<VideoBackground 
  src={[
    { src: "/videos/hero.webm", type: "video/webm" },
    { src: "/videos/hero.mp4", type: "video/mp4" }
  ]}
  poster="/images/hero-fallback.jpg"
  opacity={0.3}
  showControls={true} 
/>
```

## 6. Accessibility
The website now includes a **Global Motion Toggle** in the header. This allows users with motion sensitivity to pause all background videos with one click. Always keep this feature enabled.
