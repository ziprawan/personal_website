"use client";

type Props = {
  title: string;
  description: string;
  slug: string;
};

export default function ToolCard({ title, description, slug }: Props) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-1 hover:shadow-md transition">
      <a className="flex" href={`/tools/${slug}`}>
        <div className="p-6 items-baseline flex flex-col">
          <h3 className="text-lg font-semibold leading-none tracking-tight mb-3">{title}</h3>
          <p className="mb-5 flex-1 text-base font-light text-muted-foreground">{description}</p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2">
            Try it
          </button>
        </div>
      </a>
    </div>
  );
}
