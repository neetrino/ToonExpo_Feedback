import Image from 'next/image';

const BRAND_LOGO_WIDTH = 952;
const BRAND_LOGO_HEIGHT = 1024;
const BRAND_LOGO_PILL_SRC = '/brand/toon-expo-logo-pill.png';
const BRAND_LOGO_OVER_HERO_SRC = '/brand/toon-expo-logo-over-hero.png';

type ToonExpoLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
  inverted?: boolean;
  alt?: string;
};

/**
 * Official TOON REAL ESTATE EXPO lockup from Registration brand assets.
 */
export function ToonExpoLogo({
  className,
  size = 40,
  priority = false,
  inverted = false,
  alt = '',
}: ToonExpoLogoProps) {
  return (
    <Image
      src={inverted ? BRAND_LOGO_OVER_HERO_SRC : BRAND_LOGO_PILL_SRC}
      alt={alt}
      width={size}
      height={Math.round(size * (BRAND_LOGO_HEIGHT / BRAND_LOGO_WIDTH))}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
