import { projects } from '@/app/data/projects';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id, locale } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'featuredWork' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tDetails = await getTranslations({ locale, namespace: 'projectDetails' });

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <main className="min-h-screen bg-(--bg-secondary) pb-24 pt-32 px-6 md:px-12 lg:px-24">
      <div className="  mx-auto">
        {/* Navigation Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between">
            {/* Previous Project */}
            <div className="flex-1">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}?dir=prev`}
                  className="group flex items-center gap-4 text-left transition-all duration-300"
                  
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white dark:bg-(--bg-card) card-shadow transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110 group-hover:shadow-lg border border-white/20">
                    <svg 
                      className="h-5 w-5 text-(--text-secondary) transition-colors duration-300 group-hover:text-(--primary-color) rtl:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="hidden flex-col sm:flex">
                    <span className="text-xs w-fit font-medium uppercase tracking-wider text-(--text-secondary)/60 mb-0.5">
                      {tDetails('prev')}
                    </span>
                    <span className="text-sm font-bold text-(--bg-dark) dark:text-white transition-colors duration-300 group-hover:text-(--primary-color) line-clamp-1 max-w-[150px] lg:max-w-[200px]">
                      {t(`${prevProject.id}.title`)}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="w-12" /> /* Spacer */
              )}
            </div>

            {/* All Projects Link */}
            <div className="flex-none px-4">
              <Link
                href="/#work"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-(--bg-card) card-shadow transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20"
                title={tNav('work')}
              >
                <svg 
                  className="h-5 w-5 text-(--text-secondary) transition-colors duration-300 group-hover:text-(--primary-color)" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Link>
            </div>

            {/* Next Project */}
            <div className="flex-1 flex justify-end">
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.id}?dir=next`}
                  className="group flex items-center justify-end gap-4 text-right transition-all duration-300"
                >
                  <div className="hidden flex-col sm:flex items-end">
                    <span className="text-xs font-medium uppercase tracking-wider text-(--text-secondary)/60 mb-0.5">
                      {tDetails('next') || 'Next'} 
                    </span>
                    <span className="text-sm font-bold text-(--bg-dark) dark:text-white transition-colors duration-300 group-hover:text-(--primary-color) line-clamp-1 max-w-[150px] lg:max-w-[200px]">
                      {t(`${nextProject.id}.title`)}
                    </span>
                  </div>
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white dark:bg-(--bg-card) card-shadow transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:shadow-lg border border-white/20">
                    <svg 
                      className="h-5 w-5 text-(--text-secondary) transition-colors duration-300 group-hover:text-(--primary-color) rtl:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ) : (
                <div className="w-12" /> /* Spacer */
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden card-shadow group">
              <Image
                src={project.image}
                alt={t(`${project.id}.title`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--bg-dark)/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Project Description */}
            <section className="prose prose-lg max-w-none">
              <h1 className="text-4xl md:text-5xl font-bold text-(--bg-dark)  mb-6 leading-tight ">
                {t(`${project.id}.title`)}
              </h1>
              <p className="text-xl text-(--text-secondary) leading-relaxed">
                {t(`${project.id}.desc`)}
              </p>
            </section>

            {/* Features Section */}
            <section className="bg-white dark:bg-(--bg-card) p-8 rounded-3xl card-shadow border border-white/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-(--primary-color)">
                <span className="w-2 h-8 rounded-full bg-gradient-primary"></span>
                {tDetails('keyHighlights')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 ">
                {[
                  tDetails('features.responsive'),
                  tDetails('features.performance'),
                  tDetails('features.userCentric'),
                  tDetails('features.modernArch')
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-(--secondary-color) shrink-0" />
                    <span className="text-(--text-secondary) font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8 ">
            {/* Project Details Card */}
            <div className="bg-white dark:bg-(--bg-card) p-8 rounded-3xl card-shadow sticky top-32 border border-white/20">
              <div className="mb-8">
                <h3 className="font-semibold text-(--text-secondary) mb-4 uppercase tracking-wider text-sm">
                  {tDetails('technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(t.raw(`${project.id}.tech`) as string[]).map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-(--bg-secondary) text-(--text-secondary) rounded-xl text-sm font-semibold border border-transparent hover:border-(--primary-color) hover:text-(--primary-color) transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 ">
                <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />
                
                <button className="w-full py-4 px-6 submitBtn-bg text-white rounded-xl font-bold text-lg btn-shadow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>{tDetails('viewLive')}</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform rtl:rotate-180" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
