import { TestCategory } from "@/data/labTests";
import { 
  Droplets, 
  Activity, 
  Heart, 
  Scan, 
  FileHeart, 
  Zap, 
  Shield, 
  TestTube, 
  Battery 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  categories: TestCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Activity,
  Heart,
  Scan,
  FileHeart,
  Zap,
  Shield,
  TestTube,
  Battery,
};

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }: CategorySelectorProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-display font-semibold text-foreground">Select Test Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || TestTube;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                "hover:shadow-card-hover hover:border-primary/50",
                isSelected
                  ? "bg-accent border-primary shadow-card"
                  : "bg-card border-transparent shadow-card"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {category.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
