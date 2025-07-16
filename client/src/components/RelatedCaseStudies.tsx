import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { caseStudies } from "@/lib/data";

interface RelatedCaseStudiesProps {
  currentSlug: string;
  relatedSlugs: string[];
}

const RelatedCaseStudies = ({ currentSlug, relatedSlugs }: RelatedCaseStudiesProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const relatedStudies = caseStudies.filter(study => 
   study.slug !== currentSlug
  );

  if (relatedStudies.length === 0) return null;

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-neutral-800">Related Case Studies</h2>
        
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white shadow-lg rounded-full"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {relatedStudies.map((study) => (
              <div 
                key={study.slug}
                className="flex-none w-[350px] snap-start"
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${study.imageSrc}')` }}
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-800 line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {study.summary}
                    </p>
                    <Button asChild className="w-full">
                      <Link href={`/case-studies/${study.slug}`}>
                        Read Case Study
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white shadow-lg rounded-full"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedCaseStudies; 