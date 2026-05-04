# Vizhi XR Website

Marketing and interactive product website for Vizhi XR, built with Next.js App Router.

The site includes immersive hero animations, hardware and architecture storytelling, and industry-specific try-on experiences.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js + React Three Fiber + Drei
- OGL (shader-based effects)
- MediaPipe Face Mesh (AR face tracking)

## Main Pages and Routes

- `/` : Full landing page experience
- `/try-on/[type]` : Industry try-on pages (healthcare, manufacturing, education, etc.)
- `/ar-tryon/[id]` : AR overlay flow by industry index
- `/contact` : Contact page
- `/privacy`, `/terms`, `/cookies` : Policy pages

## Homepage Sections

The homepage is assembled in `src/app/page.tsx` and currently renders:

1. Parallax hero
2. Introducing Vizhi hero scene
3. Device section (3D model)
4. Battery section
5. Interaction section
6. Applications section
7. Architecture section
8. Vision section
9. Footer

## Try-On Image Behavior

Try-on backgrounds are selected in `src/app/try-on/[type]/page.tsx`.

- Images are served from `public/`.
- A cache-busting path is generated using file `mtime`.
- Path format: `/__cache/:mtime/:file`
- `next.config.ts` rewrites this to `/:file` to avoid query-string restrictions with `next/image` local patterns.

If you replace an image in `public/`, the try-on page should pick up the new version without stale caching.

## Project Structure

```text
src/
	app/
		page.tsx
		try-on/[type]/page.tsx
		ar-tryon/[id]/page.tsx
	components/
		HeroSection.tsx
		DeviceSection.tsx
		InteractionSection.tsx
		ApplicationsSection.tsx
		ArchitectureSection.tsx
		VisionSection.tsx
		TryOnPage.tsx
		ARTryOnOverlay.tsx
	lib/
		industries.tsx
public/
	*.png
	videos/
```

## Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Troubleshooting

### 1. Next dev lock error

If you see:

`Unable to acquire lock at .next/dev/lock`

another `next dev` process is already running. Stop the existing process and restart.

### 2. WebGL context errors

If your browser/device blocks GPU/WebGL, 3D sections (`ModelViewer`, interaction canvases) may log WebGL context creation errors.

- Check browser hardware acceleration
- Try another browser/device
- Confirm GPU/WebGL is enabled

### 3. Try-on shows old images

- Ensure the file in `public/` was replaced with the same expected name
- Hard refresh the browser
- Confirm route mapping in `src/app/try-on/[type]/page.tsx`

## Notes for Content Updates

- Industry labels, descriptions, HUD content: `src/lib/industries.tsx`
- Landing section order/content: `src/app/page.tsx`
- Footer text and links: `src/components/Footer.tsx`

## License

Private project. All rights reserved.
