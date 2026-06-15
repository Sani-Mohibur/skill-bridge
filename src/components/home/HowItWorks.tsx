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
      className="w-full py-12 md:py-20 border-t border-neutral-100 bg-white scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
            How Skill Bridge Works
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            A minimalist, seamless workflow designed to bridge your technical
            knowledge gaps without the friction.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-3"
            >
              {/* Step Number Badge */}
              <div className="text-4xl font-extrabold text-neutral-200 select-none tracking-tight">
                {step.number}
              </div>

              {/* Step Content */}
              <h3 className="text-base font-semibold text-neutral-950">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-xs md:max-w-none">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
