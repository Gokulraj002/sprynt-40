import Button from '@/components/ui/Button';
import Kicker from '@/components/ui/Kicker';

export default function HeroHome() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <Kicker>● Independent growth systems &nbsp;/&nbsp; 2026</Kicker>
        <h1>
          Make your<br />business<br /><em>impossible</em><br />to ignore.
        </h1>
        <p className="lead">
          Sprynt40 designs custom growth systems for businesses that are ready
          to be seen, chosen and remembered.
        </p>
        <div className="actions">
          <Button to="/contact" variant="primary">Build my system</Button>
          <Button href="#approach" variant="ghost">Explore the approach</Button>
        </div>
      </div>
      <div className="scroll">Scroll to explore ↓</div>
    </section>
  );
}
