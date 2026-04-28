import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { BookDemoDialog } from "./BookDemoDialog";

export function CtaSection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 cta-radial" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel className="mx-auto inline-block">Get started</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-semibold leading-tight tracking-tight">
            Your first AI pipeline ships in 4 minutes.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted">
            No credit card. No setup call. Just build.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="#" variant="primary" size="lg">
              Start Building Free
            </Button>
            <BookDemoDialog>
              <Button variant="secondary" size="lg">
                Book a Demo
              </Button>
            </BookDemoDialog>
          </div>
        </div>
      </div>
    </section>
  );
}
