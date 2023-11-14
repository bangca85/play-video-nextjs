

## Usage

This example project helps you:
- load list file .mp4 and play it
- beside display subtitles vi/en (require you have subtitle _vi/_en) on this folder

I used:
- NextJS 13.
- TailwindCSS
- ReactPlayer
- Typescript


Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run on docker

```bash
docker build -t play-video-nextjs .
docker run -p 3000:3000 play-video-nextjs
```