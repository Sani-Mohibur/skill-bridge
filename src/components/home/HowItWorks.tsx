interface StepCard {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepCard[] = [
  {
    number: "01",
    title: "Find Your Subject",
    description:
      "Filter through highly skilled engineering instructors by their explicit tech stack and expertise.",
  },
  {
    number: "02",
    title: "Pick an Available Slot",
    description:
      "Browse the real-time availability calendar published directly by the instructors.",
  },
  {
    number: "03",
    title: "Join Group Sessions",
    description:
      "Confirm your booking instantly and jump right into interactive, structured technical classes.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-16 md:py-24 border-t border-card-border bg-background scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            How Skill Bridge Works
          </h2>
          <p className="mt-3 text-sm text-muted-text">
            A minimalist, seamless workflow designed to bridge your technical
            knowledge gaps without the friction.
          </p>
        </div>

        {/* Steps Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-4 group"
            >
              {/* Premium Subtle Horizontal Desktop Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(2rem+24px)] w-[calc(100%-2rem-32px)] h-[1px] bg-gradient-to-r from-card-border via-card-border/50 to-transparent z-0" />
              )}

              {/* Step Number Badge */}
              <div className="w-12 h-12 rounded-xl border border-card-border bg-card flex items-center justify-center text-sm font-extrabold text-brand-accent shadow-xs group-hover:border-brand-accent/30 group-hover:shadow-sm transition-all duration-300 z-10">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-text max-w-xs md:max-w-none">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
