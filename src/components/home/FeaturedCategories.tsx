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
    <section className="w-full py-12 border-t border-neutral-100 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
            Explore Popular Subjects
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
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
              className="group block p-6 rounded-xl border border-neutral-200 bg-white hover:border-neutral-950 hover:shadow-sm transition-all duration-200"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h3 className="text-base font-semibold text-neutral-950 group-hover:text-neutral-950">
                {category.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
