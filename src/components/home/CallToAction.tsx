import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-16 border-t border-neutral-100 bg-neutral-950 text-white rounded-2xl my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Level Up Your Technical Skills?
        </h2>

        <p className="max-w-xl text-sm md:text-base text-neutral-400 leading-relaxed">
          Join a community of scale-up engineers, core developers, and eager
          learners. Book structured mentoring slots or create an instructor
          profile to share your expertise today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-neutral-950 hover:bg-neutral-100 transition-colors w-full sm:w-auto"
          >
            Get Started as Student
          </Link>
          <Link
            href="/register?role=tutor"
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-700 bg-transparent px-6 text-sm font-medium text-white hover:bg-neutral-900 hover:border-neutral-500 transition-colors w-full sm:w-auto"
          >
            Apply to Teach
          </Link>
        </div>
      </div>
    </section>
  );
}
