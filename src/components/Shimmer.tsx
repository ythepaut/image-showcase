interface Props {
  width: number;
  height: number;
}

export default function Shimmer({ width, height }: Readonly<Props>) {
  const bgColour = "#EBF2FA";
  const waveColour = "#E4ECF7";

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      role="img"
      aria-label="Loading image"
    >
      <defs>
        <linearGradient id="g">
          <stop stopColor={bgColour} offset="30%" />
          <stop stopColor={waveColour} offset="50%" />
          <stop stopColor={bgColour} offset="70%" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={bgColour} />
      <rect id="r" width={width} height={height} fill="url(#g)" />
      <animate
        xlinkHref="#r"
        attributeName="x"
        from={-width}
        to={width}
        dur="1s"
        repeatCount="indefinite"
      />
    </svg>
  );
}
