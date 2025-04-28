import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // shadcn accordion
import { Link } from "react-router-dom";

const CategorySidebar = ({ categories }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Danh mục</h3>

      <Accordion type="single" collapsible>
        <AccordionItem value="all">
          <div className="flex items-center justify-between">
            <AccordionTrigger className="text-primary hover:underline font-medium">
              <Link to={`/category/all`}>
                Tất cả sản phẩm
              </Link>
            </AccordionTrigger>
          </div>
        </AccordionItem>
        {categories?.map((category) => (
          <AccordionItem key={category.id} value={category.id.toString()}>
            <div className="flex items-center justify-between">
              <AccordionTrigger className="text-primary hover:underline font-medium">
                <Link to={`/category/${category.id}`}>
                  {category.name}
                </Link>
              </AccordionTrigger>
            </div>
            <AccordionContent className="text-sm text-gray-600 mt-2">
              {category.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CategorySidebar;
