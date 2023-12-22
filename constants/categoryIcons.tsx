import Image from "next/image";

export const CATEGORY_ICON = {
  XboxStore: (
    <Image src="/assets/icons/xbox.svg" alt="xbox" height={23} width={23} />
  ),
  Steam: (
    <Image src="/assets/icons/steam.svg" alt="xbox" height={23} width={23} />
  ),
  GOG: <Image src="/assets/icons/gog.svg" alt="xbox" height={23} width={23} />,
  NintendoStore: (
    <Image src="/assets/icons/nintendo.svg" alt="xbox" height={23} width={23} />
  ),
  AppleStore: (
    <Image src="/assets/icons/apple.svg" alt="xbox" height={23} width={23} />
  ),
  GooglePlay: (
    <Image
      src="/assets/icons/playstore.svg"
      alt="xbox"
      height={23}
      width={23}
    />
  ),
  playstationStore: (
    <Image
      src="/assets/icons/playstation.svg"
      alt="xbox"
      height={23}
      width={23}
    />
  ),
};
