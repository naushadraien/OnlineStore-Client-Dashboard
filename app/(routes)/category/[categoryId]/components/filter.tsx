"use client";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);
  const onClick = (id: string) => {
    // id is the id of the item we're clicking on (e.g. 1) so we can use it to filter the products on the page
    const currentUrl = qs.parse(searchParams.toString());
    const query = {
      // create a new query object to update the url with the new query params (e.g. sizeId: 1)
      ...currentUrl, // spread the current query params into the new object we're creating below so we don't lose them when we stringify the url
      [valueKey]: id, // set the value of the key to the id of the item we're clicking on (e.g. sizeId: 1) so we can use it to filter the products on the page
    };

    if (currentUrl[valueKey] === id) {
      // if the current value is the same as the one we're clicking on, remove the query param
      query[valueKey] = null; // set the value of the key to null so we can remove it from the url
    }
    const newUrl = qs.stringifyUrl(
      {
        // stringify the query object and update the url with the new query params
        url: window.location.href,
        query,
      },
      { skipNull: true }
    ); // skipNull removes the query param from the url if the value is null
    router.push(newUrl); // push the new url to the router so we can update the page with the new query params
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
