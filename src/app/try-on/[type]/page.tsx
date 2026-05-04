import { INDUSTRIES } from "@/lib/industries";
import TryOnPage from "@/components/TryOnPage";
import fs from "fs";
import path from "path";

interface TryOnParams {
  type: string;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    type: industry.title.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TryOnParams>;
}) {
  const resolvedParams = await params;
  const industry = INDUSTRIES.find(
    (ind) => ind.title.toLowerCase() === resolvedParams.type?.toLowerCase(),
  );

  return {
    title: industry ? `${industry.title} - Try On - Vizhi` : "Try On - Vizhi",
    description: industry
      ? `Experience ${industry.title} in immersive AR mode`
      : "Immersive AR experience",
  };
}

export default async function TryOnRoute({
  params,
}: {
  params: Promise<TryOnParams>;
}) {
  const resolvedParams = await params;
  const type = decodeURIComponent(resolvedParams.type || "");

  // Find industry by type
  const industry = INDUSTRIES.find(
    (ind) => ind.title.toLowerCase() === type.toLowerCase(),
  );

  if (!industry) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Experience not found
          </h1>
          <p className="text-gray-400">
            The try-on experience you are looking for does not exist: {type}
          </p>
        </div>
      </div>
    );
  }

  // Map industry titles to image files
  const imageMap: Record<string, string> = {
    healthcare: "healthcare.png",
    manufacturing: "manufacturing.png",
    "enterprise operations": "enterprise operation.png",
    education: "education.png",
    "field services": "field service.png",
    defence: "defence.png",
  };

  const imageName =
    imageMap[industry.title.toLowerCase()] ||
    `${industry.title.toLowerCase()}.png`;

  // Resolve public file path and embed mtime into a cache path segment
  // We rewrite /__cache/:mtime/:path* -> /:path* in next.config.ts so the file
  // is served from public without using query strings (avoids Next image localPatterns issues).
  let imageSrc = `/${encodeURIComponent(imageName)}`;
  try {
    const publicPath = path.join(process.cwd(), "public", imageName);
    if (fs.existsSync(publicPath)) {
      const stat = fs.statSync(publicPath);
      const mtime = Math.floor(stat.mtimeMs / 1000);
      imageSrc = `/__cache/${mtime}/${encodeURIComponent(imageName)}`;
    }
  } catch (err) {
    imageSrc = `/${encodeURIComponent(imageName)}`;
  }

  return (
    <TryOnPage
      type={industry.title.toLowerCase()}
      title={industry.title}
      imageSrc={imageSrc}
      hudContent={industry.hud}
    />
  );
}
