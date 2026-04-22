import { categories } from "../data/mockData";

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterBar({ selectedCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
