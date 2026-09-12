export default function BackgroundLayers({ webgl = false, variant = 'dark' }) {
  return (
    <>
      {webgl && <div id="webgl" />}
      <div className="grain" />
      <div className={`vignette ${variant}`} />
    </>
  );
}
