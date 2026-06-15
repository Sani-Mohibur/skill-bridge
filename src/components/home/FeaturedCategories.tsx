import Link from "next/link";

interface CategoryCard {
  title: string;
  description: string;
  slug: string;
  icon: string;
}

const POPULAR_CATEGORIES: CategoryCard[] = [
  {
    title: "Frontend Development",
    description:
      "Master interactive interfaces with React, Next.js, and modern CSS.",
    slug: "frontend",
    icon: "💻",
  },
  {
    title: "Backend Engineering",
    description:
      "Build scalable APIs, server systems, and robust database models.",
    slug: "backend",
    icon: "⚙️",
  },
  {
    title: "Real-Time Systems",
    description:
      "Explore instant communication via WebSockets, sockets, and streaming architectures.",
    slug: "real-time",
    icon: "⚡",
  },
  {
    title: "System Design",
    description:
      "Learn scalable architecture patterns, load balancing, and performance tuning.",
    slug: "system-design",
    icon: "🏗️",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full py-16 md:py-20 border-y border-card-border bg-muted-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Explore Popular Subjects
          </h2>
          <p className="mt-2 text-sm text-muted-text">
            Select a specialized technical vertical to find matching engineering
            mentors.
          </p>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/tutors?category=${category.slug}`}
              className="group block p-6 rounded-xl border border-card-border bg-card hover:border-brand-accent/50 hover:shadow-md hover:shadow-brand-accent/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top accent bar that lights up on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="text-3xl mb-4 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">
                {category.icon}
              </div>
              <h3 className="text-base font-bold text-foreground transition-colors">
                {category.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-text">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
